import { writable } from "svelte/store";

export const controllerState = writable({
    current: 0,
    next: false,
    prev: false 
})