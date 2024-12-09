import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";
import router from "@/router/index";

// Set Axios base URL globally
axios.defaults.baseURL = "http://127.0.0.1:8000";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null, // Store access token
    user: null, // Store user data
    error: null, // Store error message for failed actions
  }),

  actions: {
    // Load token from localStorage on app initialization
    loadTokenFromStorage() {
      const token = localStorage.getItem("accessToken");
      if (token) {
        this.accessToken = token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },

    // Login Action
    async login(email, password) {
      const toast = useToast();
      try {
        // Send POST request to login endpoint
        const response = await axios.post("/api/login/", {
          email: email,
          password: password,
        });

        // Save access token and user data
        this.accessToken = response.data.access;
        this.user = response.data.user;

        // Persist access token and user data to localStorage
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("user", JSON.stringify(this.user));

        // Set Authorization header for future requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.accessToken}`;

        toast.success("Login successful!");
        return true; // Indicate success
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        const errorMessage =
          error.response?.data?.detail || "Invalid login credentials.";
        toast.error(errorMessage);
        return false; // Indicate failure
      }
    },

    // Register Action
    async register(name, email, password, confirmPassword) {
      const toast = useToast();

      // Check if passwords match
      if (password !== confirmPassword) {
        this.error = "Passwords do not match";
        toast.error(this.error); // Show error toast
        return false;
      }

      try {
        // Send POST request to signup endpoint
        const response = await axios.post("/api/signup/", {
          name: name,
          email: email,
          password1: password,
          password2: confirmPassword,
        });

        // Handle successful registration
        if (response.data.message === "success") {
          this.user = response.data.user;
          toast.success("Registration successful!");
          return true;
        } else {
          // Flatten and display backend error messages
          this.error = response.data.errors || "An unknown error occurred.";
          const errorMessages = Object.values(this.error).flat().join(", ");
          toast.error(errorMessages);
          return false;
        }
      } catch (error) {
        // Extract backend errors or display a general network error
        this.error = error.response?.data || {
          detail: "Network error occurred.",
        };
        const errorMessages = Object.values(this.error).flat().join(", ");
        console.error("Registration error:", errorMessages);
        toast.error(errorMessages);
        return false;
      }
    },

    // Logout Action
    logout() {
      this.accessToken = null;
      this.user = null;
      this.error = null;

      // Clear local storage and reset headers
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];

      window.location.href = "/";
    },

    clearError() {
      this.error = null;
    },
  },
});
