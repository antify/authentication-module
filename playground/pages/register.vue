<script lang="ts" setup></script>

<template>
  <AntAuthRegisterPage
    context="core"
    :login-route="{ name: 'login' }"
    @register="() => $router.push({ name: 'protected-area' })"
  />
</template>
