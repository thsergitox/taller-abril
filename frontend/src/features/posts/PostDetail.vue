<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { usePostDetail } from './composables/usePosts'

const route = useRoute()
const router = useRouter()
const postId = route.params.id as string

const { post, comments, isLoading, isError, addComment, isSubmitting } = usePostDetail(postId)

const newComment = ref({
    author: '',
    content: '',
})

const handleSubmit = () => {
    if (!newComment.value.author || !newComment.value.content) return
    addComment(newComment.value, {
        onSuccess: () => {
            newComment.value = { author: '', content: '' }
        },
    })
}

const renderMarkdown = (text: string = '') => {
    return text
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mt-10 mb-6">$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n/gim, '<br />')
}
</script>

<template>
    <div class="mx-auto max-w-3xl space-y-12">
        <button @click="router.back()" class="btn btn-ghost btn-sm gap-2">
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
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver
        </button>

        <div v-if="isLoading" class="flex justify-center py-20">
            <span class="loading loading-dots loading-lg text-primary"></span>
        </div>

        <div v-else-if="isError" class="alert alert-error">
            <span>Error al cargar el post</span>
        </div>

        <article v-else-if="post" class="space-y-8">
            <header class="space-y-6">
                <h1 class="text-4xl leading-tight font-black tracking-tight md:text-5xl">
                    {{ post.title }}
                </h1>

                <div class="border-base-content/5 flex items-center gap-4 border-y py-4">
                    <div class="avatar">
                        <div
                            class="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2"
                        >
                            <img :src="post.author.avatar" :alt="post.author.name" />
                        </div>
                    </div>
                    <div>
                        <p class="text-lg font-bold">{{ post.author.name }}</p>
                        <p class="text-sm opacity-50">
                            {{ new Date(post.createdAt).toLocaleDateString() }}
                        </p>
                    </div>
                </div>
            </header>

            <div
                class="prose prose-lg text-base-content/80 max-w-none leading-relaxed"
                v-html="renderMarkdown(post.body)"
            ></div>

            <div class="divider"></div>

            <!-- Comments Section -->
            <section class="space-y-8">
                <h3 class="flex items-center gap-3 text-2xl font-bold">
                    Comentarios
                    <div class="badge badge-neutral badge-lg">{{ comments?.length || 0 }}</div>
                </h3>

                <!-- Form -->
                <div class="card bg-base-100 border border-white/5 shadow-sm">
                    <div class="card-body">
                        <h4 class="text-primary mb-4 font-bold">Deja tu comentario</h4>
                        <div class="space-y-4">
                            <div class="form-control">
                                <input
                                    v-model="newComment.author"
                                    type="text"
                                    placeholder="Tu nombre"
                                    class="input input-bordered w-full"
                                />
                            </div>
                            <div class="form-control">
                                <textarea
                                    v-model="newComment.content"
                                    class="textarea textarea-bordered h-24"
                                    placeholder="Escribe lo que piensas..."
                                ></textarea>
                            </div>
                            <button
                                @click="handleSubmit"
                                :disabled="isSubmitting"
                                class="btn btn-primary w-full sm:w-auto"
                            >
                                <span v-if="isSubmitting" class="loading loading-spinner"></span>
                                Publicar comentario
                            </button>
                        </div>
                    </div>
                </div>

                <!-- List -->
                <div class="space-y-6">
                    <div
                        v-for="comment in comments"
                        :key="comment.id"
                        class="bg-base-100/50 flex gap-4 rounded-2xl border border-white/5 p-6"
                    >
                        <div class="avatar placeholder">
                            <div class="bg-neutral text-neutral-content w-10 rounded-full">
                                <span class="text-xs uppercase">{{
                                    comment.author.charAt(0)
                                }}</span>
                            </div>
                        </div>
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="font-bold">{{ comment.author }}</span>
                                <span class="text-xs opacity-40">{{
                                    new Date(comment.createdAt).toLocaleDateString()
                                }}</span>
                            </div>
                            <p class="text-base-content/70">{{ comment.content }}</p>
                        </div>
                    </div>
                    <div v-if="!comments?.length" class="py-10 text-center italic opacity-40">
                        No hay comentarios aún. ¡Sé el primero en comentar!
                    </div>
                </div>
            </section>
        </article>
    </div>
</template>
