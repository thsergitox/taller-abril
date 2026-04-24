<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <!-- Desktop Navbar (Top) -->
    <div
        class="pointer-events-none fixed top-6 right-0 left-0 z-50 hidden justify-center px-4 lg:flex"
    >
        <div
            class="navbar bg-base-100/70 hover:bg-base-100/90 pointer-events-auto w-fit max-w-2xl rounded-full border border-white/10 px-2 py-1 shadow-2xl backdrop-blur-md transition-all"
        >
            <ul class="menu menu-horizontal gap-2 px-1">
                <li>
                    <RouterLink
                        to="/members"
                        class="hover:bg-base-content/5 rounded-full px-6 py-2 transition-all"
                        active-class="bg-primary text-primary-content hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                        Miembros
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/workshops"
                        class="hover:bg-base-content/5 rounded-full px-6 py-2 transition-all"
                        active-class="bg-primary text-primary-content hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                        Talleres
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/posts"
                        class="hover:bg-base-content/5 rounded-full px-6 py-2 transition-all"
                        active-class="bg-primary text-primary-content hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                        Posts
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>

    <!-- Mobile Navigation (Bottom Dock) -->
    <div
        class="pointer-events-none fixed right-0 bottom-8 left-0 z-50 flex justify-center px-6 lg:hidden"
    >
        <div
            class="bg-base-100/80 pointer-events-auto flex w-full max-w-sm items-center justify-around gap-1 rounded-3xl border border-white/10 p-3 shadow-2xl backdrop-blur-lg"
        >
            <RouterLink
                to="/members"
                class="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-all"
                active-class="text-primary bg-primary/10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span class="text-[10px] font-bold tracking-wider uppercase">Miembros</span>
            </RouterLink>

            <RouterLink
                to="/workshops"
                class="flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all"
                active-class="text-primary bg-primary/10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span class="text-[10px] font-bold tracking-wider uppercase">Talleres</span>
            </RouterLink>

            <RouterLink
                to="/posts"
                class="flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all"
                active-class="text-primary bg-primary/10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    ></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span class="text-[10px] font-bold tracking-wider uppercase">Posts</span>
            </RouterLink>
        </div>
    </div>
</template>
