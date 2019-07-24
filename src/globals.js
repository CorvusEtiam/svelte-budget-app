import { writable } from "svelte/store";

export const controllerState = writable({
    current: 0,
    next: false,
    prev: false 
})

export function format_currency(name, value) {
    let rounded = Math.round(value * 100) / 100;

    return CURRENCY[name].format.replace("{}", rounded);
}

export const CURRENCY = {
    "PLN" : { name: "złoty", format: "{} zł" },
    "USD" : { name: "dollar", format: "${}" }
}

export const pollState = writable({
    people: [

    ],
    poll: {
        name: null,
        currency: null,
        amount: 0
    },
    selected_items: 0
})

export function create_person(name, amount) {
    return {
        selected: false,
        name,
        amount,
        timestamp : new Date().getTime()
    }
}
