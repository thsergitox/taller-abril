<script setup lang="ts">
import { useWorkshops } from './composables/useWorkshops'

const { workshops, isLoading, isError } = useWorkshops()
</script>

<template>
    <section
        class="space-y-12"
        :class="{ 'flex h-full flex-col justify-center': workshops?.length === 0 }"
    >
        <div class="space-y-4 text-center">
            <h1
                class="from-secondary to-accent h-20 bg-gradient-to-r bg-clip-text text-4xl font-black text-transparent md:text-6xl"
            >
                Próximos Talleres
            </h1>
            <p class="text-base-content/60 mx-auto max-w-2xl text-lg">
                Aprende de los mejores en nuestras sesiones intensivas de aprendizaje. Desde
                desarrollo web hasta diseño de producto.
            </p>
        </div>

        <div v-if="isLoading" class="flex justify-center py-20">
            <span class="loading loading-bars loading-lg text-secondary"></span>
        </div>

        <div v-else-if="isError" class="alert alert-error mx-auto max-w-md shadow-lg">
            <span>Error al cargar los talleres</span>
        </div>

        <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div
                v-for="workshop in workshops"
                :key="workshop.id"
                class="card lg:card-side bg-base-100 group overflow-hidden border border-white/5 shadow-xl"
            >
                <figure
                    class="bg-secondary/10 text-secondary flex flex-col items-center justify-center p-8 lg:w-1/3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mb-4 h-16 w-16 opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
                    <div class="text-xs font-bold tracking-widest uppercase">Workshop</div>
                </figure>
                <div class="card-body lg:w-2/3">
                    <h2
                        class="card-title group-hover:text-secondary text-2xl font-bold transition-colors"
                    >
                        {{ workshop.title }}
                    </h2>
                    <p class="text-base-content/70 my-4">{{ workshop.description }}</p>

                    <div class="divider opacity-50"></div>

                    <div class="flex flex-col gap-4">
                        <span class="text-base-content/40 text-xs font-semibold uppercase"
                            >Presentadores</span
                        >
                        <div class="flex -space-x-4 rtl:space-x-reverse">
                            <div
                                v-for="presenter in workshop.presenters"
                                :key="presenter.id"
                                class="avatar"
                                v-tooltip="presenter.name"
                            >
                                <div class="ring-base-100 w-10 rounded-full ring">
                                    <img :src="presenter.avatar" :alt="presenter.name" />
                                </div>
                            </div>
                            <div v-if="workshop.presenters.length > 3" class="avatar placeholder">
                                <div
                                    class="bg-neutral text-neutral-content ring-base-100 w-10 rounded-full ring"
                                >
                                    <span>+{{ workshop.presenters.length - 3 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-actions mt-6 justify-end">
                        <button class="btn btn-secondary btn-sm rounded-full">Reservar cupo</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
