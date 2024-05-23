<script setup lang="ts">
import {faHome, faShieldHalved} from '@fortawesome/free-solid-svg-icons';

const navbarItems = [
  {
    label: 'Home',
    icon: faHome,
    to: '/'
  },
	{
		label: 'E-Mail and Password',
		icon: faShieldHalved,
		to: '/providers/mail-password/login',
		children: [
			{
				label: 'Login',
				to: '/providers/mail-password/login'
			}
		]
	},
	{
		label: 'Pin',
		icon: faShieldHalved,
		to: '/providers/pin/login'
	},
]
</script>

<template>
  <AntNavLeftLayout
    :navbar-items="navbarItems"
    logo-route="/"
  >
    <template #logo-image>
      <img
        src="~/assets/logo.svg"
        class="w-full"
      >
    </template>

    <NuxtPage />

    <AntToaster />
  </AntNavLeftLayout>
</template>
