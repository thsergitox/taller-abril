import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/members',
        },
        {
            path: '/members',
            name: 'members',
            component: () => import('../features/members/index.vue'),
        },
        {
            path: '/workshops',
            name: 'workshops',
            component: () => import('../features/workshops/index.vue'),
        },
        {
            path: '/posts',
            name: 'posts',
            component: () => import('../features/posts/index.vue'),
        },
        {
            path: '/posts/:id',
            name: 'post-detail',
            component: () => import('../features/posts/PostDetail.vue'),
        },
    ],
})

export default router
