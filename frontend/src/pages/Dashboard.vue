<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2
          class="text-center my-4 bg-blue-grey-darken-4 text-white headers fonts arimo"
        >
          User Information Dashboard
        </h2>

        <!-- Loading Spinner -->
        <v-spinner
          v-if="loading"
          color="primary"
          class="d-flex justify-center"
        />

        <!-- Data Table -->
        <v-container v-else-if="!loading && users.length > 0">
          <v-data-table :items="users" item-value="name" class="elevation-1">
            <template v-slot:column.id><span>ID</span></template>
            <template v-slot:column.name><span>Name</span></template>
            <template v-slot:column.email><span>Email</span></template>

            <!-- Table Rows -->
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-container>

        <!-- No Users -->
        <v-alert
          v-else-if="!loading && users.length === 0"
          type="info"
          class="mt-4"
        >
          No users found.
        </v-alert>

        <!-- Error Message -->
        <v-alert v-if="error" type="error" class="mt-4">
          Error fetching users: {{ error }}
        </v-alert>
      </v-col>
    </v-row>

    <!-- Bottom Drawer -->
    <v-navigation-drawer v-model="drawer" bottom temporary>
      <v-row class="d-flex flex-column" style="height: 100%">
        <v-row justify="center" class="tops">
          <router-link to="/chat" class="text-decoration-none">
            <v-btn color="green" dark>Chat Page</v-btn>
          </router-link>
        </v-row>

        <v-row justify="center" class="downs">
          <v-btn @click="logout" color="red" dark>Logout</v-btn>
        </v-row>
      </v-row>
    </v-navigation-drawer>

    <!-- Hamburger Menu in Upper-Right -->
    <v-btn @click="drawer = !drawer" color="blue" icon class="menu-btn">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      loading: true,
      error: null,
      drawer: false, // State to toggle the drawer
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        this.users = response.data.data.users;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      } finally {
        this.loading = false;
      }
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
};
</script>

<style scoped>
.menu-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
.headers {
  position: relative;
  top: -35px;
  width: 110%;
  margin-left: -20px;
  padding: 20px;
}
.fonts {
  font-size: xx-large;
  font-weight: 900;
}
.arimo {
  font-family: "Arimo", serif;
  font-optical-sizing: auto;
  font-weight: 692;
  font-style: italic;
}
.tops {
  margin-top: 250px;
}
.downs {
  margin-top: -150px;
}
</style>
