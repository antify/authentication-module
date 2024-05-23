<script setup lang="ts"></script>

<template>
  <AntContent class="flex flex-col gap-5 h-full">
    <div class="text-3xl">Login successful</div>

    <AntButton @click="() => $router.back()">Back</AntButton>
  </AntContent>
</template>
