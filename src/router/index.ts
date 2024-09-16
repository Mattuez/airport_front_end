import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView.vue";
import LocationPage from "../views/LocationPage.vue";
import AirportPage from "../views/FlightsPage.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/locations', component: LocationPage },
    { path: '/airports', component: AirportPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
