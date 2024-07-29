<script setup lang="ts">
import {
  ref,
  reactive,
  useFetch,
  useRoute,
  showError,
  onBeforeUnmount,
  onMounted
} from '#imports';
import {type LocationAsRelativeRaw} from '#vue-router';
import {validator as _validator, type Input} from '../glue/login.post';
import {State} from '#ui-module';

defineProps<{
  forgotPasswordRoute: LocationAsRelativeRaw

  /**
   * Improves ux: If the user is already logged in, the user
   * get redirected without authentication process.
   */
  isAlreadyLoggedIn?: () => boolean
}>();
const emit = defineEmits(['login']);
const route = useRoute();
const formData = ref<Input>({
  email: '',
  password: '',
  // TODO:: rename inviteToken to something cryptic short in query
  inviteToken: route.query?.inviteToken as string,
});
const validator = reactive(_validator);
const loginError = ref<string | null>(null);
const {
  execute,
  status,
} = useFetch('/api/authentication-module/providers/mail-password/login', {
  method: 'post',
  body: formData,
  watch: false,
  immediate: false,
  onResponse({response}) {
    if (response.status === 500) {
      return showError(response._data);
    }

    if (response.status === 200) {
      if (response._data?.success) {
        return emit('login');
      }

      if (response._data?.invalidCredentials) {
        loginError.value = response._data?.invalidCredentials;
      }
    }
  }
});

async function onLogin() {
  loginError.value = null;

  validator.validate(formData.value, 'client');

  if (validator.hasErrors()) {
    return;
  }

  await execute();
}

onMounted(() => validator.reset());
onBeforeUnmount(() => {
  validator.reset();
});
</script>

<template>
  <div
    class="login-bg min-h-screen flex justify-center pt-32 px-4 sm:px-6 lg:px-8 "
  >
    <div class="max-w-md w-full space-y-10">
      <slot name="logo">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </slot>

      <slot name="loginHeader">
        <h2 class="text-2xl font-medium text-center text-for-white-bg-font">
          Sign in to your account
        </h2>
      </slot>

      <form class="mt-8 bg-neutral-50 p-10 rounded-md shadow-md">
        <AntFormGroup>
          <AntAlert
            v-if="loginError"
            :expanded="true"
            :state="State.danger"
            :icon="false"
            :dismiss-btn="false"
          >
            {{ loginError }}
          </AntAlert>


          <AntTextInput
            v-model="formData.email"
            label="E-Mail"
            name="email"
            type="email"
            :disabled="status === 'pending'"
            :errors="validator.fieldMap.email.validator.getErrors()"
            @validate="val => validator.fieldMap.email.validator.validate(val, formData.email, 'client')"
          />

          <AntPasswordInput
            v-model="formData.password"
            label="Password"
            name="password"
            :disabled="status === 'pending'"
            :errors="validator.fieldMap.password.validator.getErrors()"
            @validate="val => validator.fieldMap.password.validator.validate(val, formData.password, 'client')"
          />

          <div class="text-right">
            <NuxtLink
              class="text-sm text-neutral-50-font hover:text-black transition-colors"
              :to="forgotPasswordRoute"
            >
              Forgot password?
            </NuxtLink>
          </div>

          <AntButton
            :expanded="true"
            :filled="true"
            :state="State.primary"
            :disabled="status === 'pending'"
            @click="() => onLogin()"
          >
            Login
          </AntButton>
        </AntFormGroup>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-bg {
  background: radial-gradient(100% 100% at 50% 0%, #F1F5F9 37.5%, #7DD3FC 100%);
}
</style>
