<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { usePosts } from './composables/usePosts'

const { posts, isLoading, isError } = usePosts()
</script>

<template>
    <section
        class="space-y-12"
        :class="{ 'flex h-full flex-col justify-center': posts?.length === 0 }"
    >
        <div class="flex flex-col gap-4 text-center">
            <h1
                class="from-primary to-accent h-20 bg-gradient-to-r bg-clip-text text-4xl font-black text-transparent md:text-6xl"
            >
                Blog & Noticias
            </h1>
            <p class="text-base-content/60 mx-auto max-w-2xl text-lg">
                Historias, tutoriales y reflexiones sobre tecnología y diseño.
            </p>
        </div>

        <div v-if="isLoading" class="flex justify-center py-20">
            <span class="loading loading-ring loading-lg text-primary"></span>
        </div>

        <div v-else-if="isError" class="alert alert-error">
            <span>Error al cargar los posts</span>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RouterLink
                v-for="post in posts"
                :key="post.id"
                :to="{ name: 'post-detail', params: { id: post.id } }"
                class="card bg-base-100 group border border-white/5 shadow-sm transition-all hover:shadow-xl"
            >
                <div class="card-body">
                    <div class="mb-4 flex items-center gap-3">
                        <div class="avatar">
                            <div class="w-8 rounded-full">
                                <img :src="post.author.avatar" :alt="post.author.name" />
                            </div>
                        </div>
                        <span class="text-sm font-medium opacity-60">{{ post.author.name }}</span>
                    </div>

                    <h2
                        class="card-title group-hover:text-primary text-xl font-bold transition-colors"
                    >
                        {{ post.title }}
                    </h2>
                    <p class="text-base-content/60 my-2 line-clamp-3 text-sm">
                        {{ post.excerpt }}
                    </p>

                    <div class="card-actions mt-6 items-center justify-between">
                        <div class="flex items-center gap-2 text-xs opacity-40">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                ></path>
                            </svg>
                            <span>{{ post.commentsCount }} comentarios</span>
                        </div>
                        <span
                            class="text-primary flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1"
                        >
                            Leer más
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </div>
                </div>
            </RouterLink>
        </div>
    </section>
</template>
