<script>
	import { CURRENCY } from "./globals.js";

	let name = "";
	let amount = 0;
	let currency;

	$: is_filled = ( name !== "" ) && ( amount > 0 ) && (currency !== undefined);
</script>
<fieldset>
	<legend>Poll Start</legend>
	<p>Please provide basic data about poll</p>
	<label for="pollName">Poll Name: </label>
	<input type="text" id="pollName" bind:value={name} required>
	<label for="pollAmount">Poll Name: </label>
	<input type="number" id="pollAmount" bind:value={amount} required>
	<select bind:value={currency}>
		<option value="default" disabled selected>Select Currency</option>
		{#each Object.entries(CURRENCY) as entry }
		<option value={entry[0]}>{ entry[1].name }</option>
		{/each} 
	</select>
	{#if is_filled }
	<button type="button">Save</button>
	{/if}
</fieldset>