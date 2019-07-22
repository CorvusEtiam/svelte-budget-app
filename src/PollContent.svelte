<script>
    import { format_currency, pollState, create_person } from "./globals.js";
    import PollTable from "./PollTable.svelte";
    import PollInput from "./PollInput.svelte";

    let open = false;


    function create_or_update(obj) {
        let { name, amount, currency, timestamp } = obj;

        if ( timestamp == null ) {
            let people = $pollState.people;
            people.push(create_person(name, amount));

            $pollState.people = people;  
            open = false;
        } else {
            for ( let i = 0; i < $pollState.people.length; i++ ) {
                if ( $pollState.people[i].timestamp == timestamp ) {
                    $pollState.people[i].name = name;
                    $pollState.people[i].amount = amount;
                    $pollState.people[i].currency = currency;
                    $pollState.people[i].selected = false;
                }
            }
            open = false;
        }
        
    }

</script>
<style>
.error {
    border: 2px solid red;
}
</style>
<div>
<h2>Poll: {$pollState.poll.name}</h2>
<PollTable />
</div>
<div class="group horizontal">
    <button type="button" on:click={ev => { console.log(ev.target.innerText); open = true; }}>Add Entry</button>
    <button type="button" on:click={ev => { console.log(ev.target.innerText); }}>Remove Selected</button>
    <button type="button" on:click={ev => { console.log(ev.target.innerText); open = true; }}>Update Selected</button>
</div> 

{#if open }
<PollInput on:save={ ev => { console.log("%o", ev); create_or_update(ev.detail) }} currency={$pollState.poll.currency}/>
{/if}