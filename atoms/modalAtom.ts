import { Movie } from '@/typings';
import { atom } from 'recoil';

export const movieState = atom<Movie | null>({
    key: 'movieState',
    default: null,
})

export const modalState = atom({
    key: 'modalState',
    default: false,
})