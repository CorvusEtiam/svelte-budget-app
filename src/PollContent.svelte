<script>
    import { format_currency, pollState, create_person } from "./globals.js";
    import { ADD, UPDATE, NONE } from "./states.js";
    import PollTable from "./PollTable.svelte";
    import PollInput from "./PollInput.svelte";

    $: summary_paid = $pollState.people.reduce((prev, curr) => { return prev + curr.amount }, 0);



    /// possible stated: add, update, none
    $: state = NONE;

</script>
<style>
.error {
    border: 2px solid red;
}
.hidden {
    display: none;
}
</style>

<div>
<PollTable />
</div>
<div>
    <div>Full amount: { format_currency($pollState.poll.currency, $pollState.poll.amount) } </div>
    <div>Paid: {format_currency($pollState.poll.currency, summary_paid)} </div>
    <div>Left: {format_currency($pollState.poll.currency, $pollState.poll.amount - summary_paid)} </div>
</div>
<div class="group horizontal">
    <button type="button" class = "{ summary_paid >= $pollState.poll.amount ? 'hidden' : '' }" on:click={ev => { console.log(ev.target.innerText); state = ADD }}>Add Entry</button>
    <button type="button" class = "{ $pollState.people.length == 0 ? 'hidden' : '' }" on:click={ev => { console.log(ev.target.innerText); }}>Remove Selected</button>
    <button type="button" class = "{ $pollState.people.length == 0 ? 'hidden' : '' }" on:click={ev => { console.log(ev.target.innerText); state = UPDATE; }}>Update Selected</button>
</div> 
{#if state != NONE} 
<PollInput state={state} on:close={ev =>{ state = NONE; }}></PollInput> 
{/if}