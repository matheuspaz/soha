<template>
  <v-container fluid class="pa-0 h-100">
    <v-row no-gutters class="h-100">
      <v-col class="d-flex justify-center align-center" cols="12" xs="12" sm="12" md="5" lg="5" xl="5" xxl="5">
        <v-col cols="10" xs="10" sm="10" md="10" lg="8" xl="8" xxl="8">
          <LoginForm />
        </v-col>
      </v-col>
      <v-col cols="7" md="7" lg="7" xl="7" xxl="7" class="hidden-sm-and-down bg-col">
        <h1 class="text-bg">
          Tecnologia que nos move em frente. <br>
          Gestão e controle de riscos. <br>
          Eficiência para sua empresa ganhar mais gastando menos.
        </h1>
        <v-img class="" src="@/assets/bg-sat.jpg" height="100%" cover />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped>
.bg-col {
  position: relative;
}

.bg-col:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.text-bg {
  position: absolute;
  z-index: 1;
  color: white;
  top: 20%;
  left: 10%;
}
</style>
