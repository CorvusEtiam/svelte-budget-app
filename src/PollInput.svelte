<script>
    import { onMount, createEventDispatcher } from "svelte";
    
    import { CURRENCY, pollState, create_person } from "./globals.js";
    import { UPDATE, ADD, NONE } from "./states.js";


    export let state = 'NONE';
    
    let dispatch = createEventDispatcher();

    $: error = false;

    let name;
    let amount;
    let timestamp = null;
    let currency = $pollState.poll.currency;
   
    function get_person_to_update() {
        for ( let i = 0; i < $pollState.people.length; i++ ) {
            if ( $pollState.people[i].selected ) {
                console.log("%o", $pollState.people[i]);
                return $pollState.people[i];
            }
        }

        return null;
    }   

    onMount(() => {
        if ( state === ADD ) {
            name = "";
            amount = 0;
        } else if ( state === UPDATE ) {
            let updated = get_person_to_update();
            if (updated === null) {
                error = true;
            } else {
                name = updated.name;
                amount = updated.amount;
                timestamp = updated.timestamp;
            }
        }
    });

    function dispatch_close() {
            dispatch('close', { });
    }

    function save() {
        if ( state === UPDATE ) {
            for ( let i = 0; i < $pollState.people.length; i++ ) {
                if ($pollState.people[i].timestamp == timestamp) {
                    $pollState.people[i].name = name;
                    $pollState.people[i].amount = parseInt(amount);
                    $pollState.people[i].selected = false;
                }
            }
        } else if ( state === ADD ) {
            let person = create_person(name, parseInt(amount));
            let people = $pollState.people;
            people.push(person);
            $pollState.people = people;
        }

        dispatch_close();
    }

</script>
<div>
    {#if !error}
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
        <button type="button" on:click={save}>Save</button>
    </div>
    {:else}
    <p>
        No person selected to update
    </p>
    <div>
        <button type="button" on:click={ ev => { dispatch_close() } }>Close</button>
    </div>    
    {/if}
</div>
