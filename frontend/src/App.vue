<script setup lang="ts">
import Navbar from './shared/components/Navbar.vue'
</script>

<template>
    <div
        class="bg-base-200 text-base-content selection:bg-primary selection:text-primary-content min-h-screen"
    >
        <Navbar />

        <main
            class="mx-auto flex h-dvh max-w-6xl flex-col justify-start px-4 pt-8 sm:justify-center sm:pt-0"
        >
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>

        <footer
            class="footer footer-center bg-base-100 text-base-content mt-auto rounded border-t border-white/5 p-10"
        >
            <aside>
                <p class="font-bold">Acecom<br />Explorando la creatividad desde 2024</p>
                <p>Copyright © 2026 - Todos los derechos reservados</p>
            </aside>
        </footer>
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
