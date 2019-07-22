<script>
	import { onMount } from "svelte";
	import { CURRENCY, pollState } from "./globals.js";
	
	let name;
	let amount;
    let currency;

    onMount(() => {
        name = $pollState.poll.name || "";
        amount = $pollState.poll.amount || 0;
        currency = $pollState.poll.currency || "default";
        
    })

	let changed = false;

	$: is_filled = ( name !== "" ) && ( amount > 0 ) && (currency !== undefined) && changed;

	function save() {
		$pollState.poll.name = name;
		$pollState.poll.amount = amount;
		$pollState.poll.currency = currency;
	}

</script>
<fieldset>
	<legend>Poll Start</legend>
	<p>Please provide basic data about poll</p>
	<label for="pollName">Poll Name: </label>
	<input type="text" id="pollName" bind:value={name} required>
	<label for="pollAmount">Poll Name: </label>
	<input type="number" id="pollAmount" bind:value={amount} required>
	<select bind:value={currency} on:change={ ev => { changed = !changed; }  }>
		<option value="default" disabled selected>Select Currency</option>
		{#each Object.entries(CURRENCY) as entry }
		<option value={entry[0]}>{ entry[1].name }</option>
		{/each} 
	</select>
	{#if is_filled }
	<button type="button" on:click={save}>Save</button>
	{/if}
</fieldset>