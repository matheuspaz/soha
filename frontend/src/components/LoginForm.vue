<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';

const { cookies } = useCookies();
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  showPassword: false,
  isFormValid: false,
  isHandleLogin: false,
  invalidLogin: false,
});

const emailRules = [
  (v: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail inválido.'
];

const passwordRules = [
  (v: string) => v.length >= 4 && v.length <= 15 || 'A senha deve ter entre 4 e 15 caracteres.',
  (v: string) => /^[A-Za-z0-9]*$/.test(v) || 'Senha só pode conter caracteres alfanuméricos.'
];

const eyeType = computed(() => {
  if (form.password.length <= 0) {
    return '';
  }

  return form.showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
});

const changePasswordVision = () => {
  form.showPassword = !form.showPassword;
};

const handleLogin = async () => {
  form.isHandleLogin = true;

  const loginURL = import.meta.env.VITE_API_URL + '/auth/login';

  try {
    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    });

    if (response.status == 401) {
      setTimeout(() => {
        form.isHandleLogin = false;
        form.invalidLogin = true;
      }, 3000)

      return;
    }

    const jsonResponse = await response.json();

    cookies.set('token', jsonResponse.token);

    setTimeout(() => {
      form.isHandleLogin = false;
      router.push({ name: 'Dashboard' });
    }, 4000);

  } catch (error) {
    form.invalidLogin = true;

    setTimeout(() => {
      form.isHandleLogin = false;
    }, 3000)
  } finally {
    form.invalidLogin = false;
  }
}


</script>

<template>
  <v-row>

    <v-col cols="12">
      <h2 class="text-center">Seja bem vindo!</h2>
      <h3 class="text-center">Acesse o dashboard utilizando suas credenciais!</h3>
    </v-col>
    <v-col cols="12">
      <v-form @submit="handleLogin" validate-on="input" @submit.prevent v-model="form.isFormValid">

        <span v-if="form.email.length <= 0" class="text-caption ml-10 mb-2 d-block">* E-mail é de preenchimento
          obrigatório</span>
        <v-text-field class="pb-3" prepend-icon="mdi-email-outline" v-model="form.email" :rules="emailRules"
          placeholder="Digite seu e-mail" label="E-mail" variant="outlined" required />

        <span v-if="form.password.length <= 0" class="text-caption ml-10 mb-2 d-block">* Senha é de preenchimento
          obrigatório</span>
        <v-text-field prepend-icon="mdi-lock-outline" :append-inner-icon="eyeType"
          :on-click:append-inner="changePasswordVision" v-model="form.password" :rules="passwordRules"
          placeholder="Digite sua senha" label="Senha" variant="outlined" required
          :type="form.showPassword ? 'text' : 'password'" />

        <div class="d-flex justify-center">
          <v-btn :loading="form.isHandleLogin" type="submit" :disabled="!form.isFormValid" append-icon="mdi-send"
            color="blue" class="w-50" variant="flat">
            Acessar
          </v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>

  <v-snackbar v-model="form.invalidLogin" color="red" :timeout="4000" :location="'bottom left'">Usuário ou senha
    inválidos</v-snackbar>
</template>

