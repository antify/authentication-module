import {
	defineNuxtModule,
	createResolver,
	addComponentsDir,
	addServerHandler,
	addTypeTemplate
} from '@nuxt/kit';
import {join, relative} from 'pathe';
import {
	useValidator,
	notBlankRule
} from '@antify/validate';

// TODO:: give option to write a custom encrypter
// TODO:: implement option to use a private key file as salt
type ModuleOptions = {
	/**
	 * Salt to hash passwords. With this salt, all passwords get hashed.
	 */
	passwordSalt: string;

	/**
	 * Integration between the module and the project's user logic.
	 * Must return a defineDataAdapter();
	 */
	dataAdapterPath: string
};

const optionsValidator = useValidator<ModuleOptions>({
	passwordSalt: {
		rules: [notBlankRule]
	},

	dataAdapterPath: {
		rules: [notBlankRule]
	}
});

const moduleKey = 'authenticationModule';

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'authentication-module',
		configKey: moduleKey,
	},
	async setup(options, nuxt) {
		if (JSON.stringify(options) === '{}') {
			// nuxt-module-build build --stub call this setup without any options. This would break the code.
			return;
		}

		const _options = optionsValidator.validate(options);

		if (optionsValidator.hasErrors()) {
			throw new Error(`Invalid options for app-context-module:\n${optionsValidator.getErrorsAsString()}`);
		}

		const {resolve} = createResolver(import.meta.url);
		const runtimeDir = resolve('runtime');
		const typesBuildDir = join(nuxt.options.buildDir, 'types');

		nuxt.options.runtimeConfig[moduleKey] = _options;
		// nuxt.options.alias['#authentication-module'] = resolve(runtimeDir, 'types');

		const dataAdapterPath = resolve(nuxt.options.rootDir, _options.dataAdapterPath);

		// Make the data adapter available in runtime
		nuxt.hook('nitro:config', (nitroConfig) => {
			nitroConfig.alias = nitroConfig.alias || {};

			nitroConfig.alias['#authentication-module-data-adapter'] = dataAdapterPath;
			nitroConfig.alias['#authentication-module'] = resolve(runtimeDir, 'server');
		})

		const dataAdapterTemplate = addTypeTemplate({
			filename: 'types/authentication-module-data-adapter.d.ts',
			getContents: () => [
				'declare module \'#authentication-module-data-adapter\' {',
				`  const default: typeof import("${relative(typesBuildDir, dataAdapterPath)}")['default']`,
				'}',
			].join('\n')
		});
		const template = addTypeTemplate({
			filename: 'types/authentication-module.d.ts',
			getContents: () => [
				'declare module \'#authentication-module\' {',
				`  export * from '${relative(typesBuildDir, join(runtimeDir, 'types'))}'`,
				'}',
				// TODO:: add this to the runtime types
				// "declare module '@nuxt/schema' {",
				// "	export interface RuntimeNuxtHooks {",
				// "		'authModule:register-permissions': () => void | Promise<void>",
				// "	}",
				// "}",
				'export {}'
			].join('\n'),
		});

		nuxt.hook('prepare:types', (options) => {
			options.references.push({path: dataAdapterTemplate.dst})
			options.references.push({path: template.dst})
		});

		// Mail-password provider things
		await addComponentsDir({
			path: resolve('./runtime/providers/mail-password/components'),
			prefix: 'AuthenticationModuleMailPassword',
		});

		addServerHandler({
			route: '/api/authentication-module/providers/mail-password/login',
			method: 'post',
			handler: resolve(runtimeDir, 'providers', 'mail-password', 'server', 'api', 'login.post')
		});
	},
});
