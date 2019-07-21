import { writable } from "svelte/store";

export const controllerState = writable({
    current: 0,
    next: false,
    prev: false 
})

export function format_currency(name, value) {
    return CURRENCY[name].format.replace("{}", value);
}

export const CURRENCY = {
    "PLN" : { name: "złoty", format: "{} zł" },
    "USD" : { name: "dollar", format: "${}" }
}