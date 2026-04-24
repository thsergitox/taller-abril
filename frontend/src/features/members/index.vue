<script setup lang="ts">
import { ref } from 'vue'

import MemberForm from './components/MemberForm.vue'
import { useMembers } from './composables/useMembers'

const { members, isLoading, isError, error } = useMembers()
const showModal = ref(false)
</script>

<template>
    <section
        class="space-y-12"
        :class="{ 'flex h-full flex-col justify-center': members?.length === 0 }"
    >
        <div class="flex flex-col gap-6 text-center">
            <h1
                class="from-base-content to-base-content/50 h-20 bg-gradient-to-b bg-clip-text text-4xl font-black text-transparent md:text-6xl"
            >
                Nuestra Comunidad
            </h1>
            <p class="text-base-content/60 mx-auto max-w-2xl text-lg">
                Conoce a las mentes creativas que hacen posible Acecom. Un equipo diverso de
                desarrolladores, diseñadores y visionarios.
            </p>

            <button class="btn btn-primary btn-lg w-fit self-center" @click="showModal = true">
                ¡Únete!
            </button>
        </div>

        <MemberForm :open="showModal" @close="showModal = false" />

        <div v-if="isLoading" class="flex justify-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-else-if="isError" class="alert alert-error mx-auto max-w-md shadow-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>Error: {{ error?.message || 'No se pudieron cargar los miembros' }}</span>
        </div>

        <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div
                v-for="member in members"
                :key="member.id"
                class="card bg-base-100 group border border-white/5 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
                <figure class="pt-10 pb-4">
                    <div class="avatar online">
                        <div
                            class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2 transition-transform group-hover:scale-110"
                        >
                            <img :src="member.avatar" :alt="member.name" />
                        </div>
                    </div>
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title text-2xl font-bold">{{ member.name }}</h2>
                    <div class="badge badge-primary badge-outline mb-2">{{ member.role }}</div>
                    <p class="text-base-content/70 line-clamp-3">{{ member.bio }}</p>

                    <div class="card-actions mt-6 gap-3">
                        <a
                            v-if="member.socials.instagram"
                            :href="member.socials.instagram"
                            target="_blank"
                            class="btn btn-ghost btn-circle btn-sm"
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
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a
                            v-if="member.socials.github"
                            :href="member.socials.github"
                            target="_blank"
                            class="btn btn-ghost btn-circle btn-sm"
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
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                ></path>
                            </svg>
                        </a>
                        <a
                            v-if="member.socials.linkedin"
                            :href="member.socials.linkedin"
                            target="_blank"
                            class="btn btn-ghost btn-circle btn-sm"
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
                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                                ></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
