<template>
  <v-layout wrap>
    <v-flex xs12 md6 v-for="task in tasks" :key="task._id">
      <task-card :task="task"/>
    </v-flex>
    <v-flex>
      <v-alert :value="tasks.length == 0" type="warning" outline>Lista vacia</v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
    TaskCard: () => import('@/components/TaskCard.vue'),
  },
  computed: {
    ...mapState({
      tasks: state => state.Task.tasks,
    }),
  },
};
</script>

<style>
</style>
