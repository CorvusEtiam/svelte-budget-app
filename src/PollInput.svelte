<script>
    import { onMount, createEventDispatcher } from "svelte";

    import { CURRENCY, pollState } from "./globals.js";

    export let currency; 
    
    let dispatch = createEventDispatcher();
    
    let name;
    let amount;
    let timestamp = null;

    let is_update = false;

    function get_person_to_update() {
        for ( let i = 0; i < $pollState.people.length; i++ ) {
            if ( $pollState.people[i].selected ) {
                return $pollState.people[i];
            }
        }

        return null;
    }   

    onMount(() => {
        let updated = get_person_to_update();
        
        currency = $pollState.poll.currency;

        if ( updated !== null ) {
            timestamp = updated.timestamp;
            name = updated.name;
            amount = updated.amount;
        } else {
            name = "";
            amount = 0;
            timestamp = null;
        }
    });

    function dispatch_save() {
            dispatch('save', { name, amount, currency, timestamp: timestamp });
    }

</script>
<div>
    <div>
        <label for="name">Name: </label>
        <input id="name" bind:value={name}>
    </div>
    <div>
        <label for="amount">Name: </label>
        <input id="amount" bind:value={amount}>
        <span>{ CURRENCY[currency].name }</span>
    </div>
    <div>
        <button type="button" on:click={ ev => { dispatch_save() } }>Save</button>
    </div>
</div>
