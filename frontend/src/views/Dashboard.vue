<template>
  <v-container>
    <v-col>
      <v-row>
        <v-btn type="submit" @click="handleLogout" append-icon="mdi-logout" color="red" variant="flat">
          Deslogar
        </v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';

const { cookies } = useCookies();
const router = useRouter();

const handleLogout = () => {
  cookies.remove('token');
  router.push({ name: 'Login' });
}

</script>
