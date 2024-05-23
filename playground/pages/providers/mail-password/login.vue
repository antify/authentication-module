<template>
  <AuthenticationModuleMailPasswordLoginPage
    :forgot-password-route="{ name: 'providers-mail-password-forgot-password' }"
    @login="() => $router.push({ name: 'success' })"
  />
</template>
