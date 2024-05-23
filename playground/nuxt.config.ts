export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@antify/ui-module',
    '@antify/database-module',
  ],
  ssr: false,
  devtools: {enabled: true},
	imports: {
		autoImport: false
	},
  authenticationModule: {
		passwordSalt: '#a!SaveSalt123',
		dataAdapterPath: './server/datasources/db/core/data-adapter',
	}
});
