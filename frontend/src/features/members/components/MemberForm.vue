<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { useMembers } from '../composables/useMembers'

defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const { addMember, isCreating } = useMembers()

const schema = toTypedSchema(
    z.object({
        name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
        bio: z.string().min(10, 'La bio debe tener al menos 10 caracteres'),
        avatarUrl: z.string().url('La URL del avatar es obligatoria y debe ser válida'),
        instagramUrl: z.string().url('La URL de Instagram es obligatoria y debe ser válida'),
        linkedinUrl: z.string().url('La URL de LinkedIn es obligatoria y debe ser válida'),
        githubUrl: z.string().url('La URL de GitHub es obligatoria y debe ser válida'),
    }),
)

const { defineField, handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
        name: '',
        bio: '',
        avatarUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        githubUrl: '',
    },
})

const [name, nameProps] = defineField('name')
const [bio, bioProps] = defineField('bio')
const [avatarUrl, avatarUrlProps] = defineField('avatarUrl')
const [instagramUrl, instagramUrlProps] = defineField('instagramUrl')
const [linkedinUrl, linkedinUrlProps] = defineField('linkedinUrl')
const [githubUrl, githubUrlProps] = defineField('githubUrl')

const onSubmit = handleSubmit((values) => {
    addMember(values, {
        onSuccess: () => {
            resetForm()
            emit('close')
        },
    })
})
</script>

<template>
    <div
        class="modal bg-base-300/20 backdrop-blur-sm transition-all duration-300"
        :class="{ 'modal-open': open }"
    >
        <div class="modal-box bg-base-100 relative border border-white/10 shadow-2xl">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
                @click="emit('close')"
            >
                ✕
            </button>

            <h3 class="mb-6 flex items-center gap-2 text-2xl font-black">
                <span class="bg-primary h-8 w-2 rounded-full"></span>
                Únete a la Comunidad
            </h3>

            <form @submit.prevent="onSubmit" class="space-y-4">
                <div class="form-control">
                    <label class="label"
                        ><span class="label-text font-semibold">Nombre Completo</span></label
                    >
                    <input
                        v-model="name"
                        v-bind="nameProps"
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        class="input input-bordered w-full"
                        :class="{ 'input-error': errors.name }"
                    />
                    <span class="text-error mt-1 text-xs" v-if="errors.name">{{
                        errors.name
                    }}</span>
                </div>

                <div class="form-control flex flex-col gap-1">
                    <label class="label"
                        ><span class="label-text font-semibold">Biografía</span></label
                    >
                    <textarea
                        v-model="bio"
                        v-bind="bioProps"
                        class="textarea textarea-bordered h-24 w-full"
                        placeholder="Cuéntanos un poco sobre ti..."
                        :class="{ 'textarea-error': errors.bio }"
                    ></textarea>
                    <span class="text-error mt-1 text-xs" v-if="errors.bio">{{ errors.bio }}</span>
                </div>

                <div class="form-control">
                    <label class="label"
                        ><span class="label-text font-semibold">URL Avatar</span></label
                    >
                    <input
                        v-model="avatarUrl"
                        v-bind="avatarUrlProps"
                        type="url"
                        placeholder="https://..."
                        class="input input-bordered w-full"
                        :class="{ 'input-error': errors.avatarUrl }"
                    />
                    <span class="text-error mt-1 text-xs" v-if="errors.avatarUrl">{{
                        errors.avatarUrl
                    }}</span>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="form-control">
                        <label class="label"
                            ><span class="label-text font-semibold">Instagram</span></label
                        >
                        <input
                            v-model="instagramUrl"
                            v-bind="instagramUrlProps"
                            type="url"
                            placeholder="https://instagram.com/..."
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.instagramUrl }"
                        />
                        <span class="text-error mt-1 text-xs" v-if="errors.instagramUrl">{{
                            errors.instagramUrl
                        }}</span>
                    </div>
                    <div class="form-control">
                        <label class="label"
                            ><span class="label-text font-semibold">LinkedIn</span></label
                        >
                        <input
                            v-model="linkedinUrl"
                            v-bind="linkedinUrlProps"
                            type="url"
                            placeholder="https://linkedin.com/in/..."
                            class="input input-bordered w-full"
                            :class="{ 'input-error': errors.linkedinUrl }"
                        />
                        <span class="text-error mt-1 text-xs" v-if="errors.linkedinUrl">{{
                            errors.linkedinUrl
                        }}</span>
                    </div>
                </div>

                <div class="form-control">
                    <label class="label"
                        ><span class="label-text font-semibold">GitHub</span></label
                    >
                    <input
                        v-model="githubUrl"
                        v-bind="githubUrlProps"
                        type="url"
                        placeholder="https://github.com/..."
                        class="input input-bordered w-full"
                        :class="{ 'input-error': errors.githubUrl }"
                    />
                    <span class="text-error mt-1 text-xs" v-if="errors.githubUrl">{{
                        errors.githubUrl
                    }}</span>
                </div>

                <div class="modal-action gap-3">
                    <button type="button" class="btn btn-ghost" @click="emit('close')">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary px-8" :disabled="isCreating">
                        <span v-if="isCreating" class="loading loading-spinner"></span>
                        Registrarme
                    </button>
                </div>
            </form>
        </div>
        <div class="modal-backdrop bg-black/40" @click="emit('close')"></div>
    </div>
</template>
