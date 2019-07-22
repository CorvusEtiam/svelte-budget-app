<script>
	import MultiForm from "./MultiForm.svelte";
	import FormPanel from "./FormPanel.svelte";
	import PollHeader from "./PollHeader.svelte";
	import PollContent from "./PollContent.svelte";
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Budget App</h1>
<div>
<MultiForm first={0} last={2} current={0}>
	<FormPanel index={0}>
		<PollHeader />
	</FormPanel>
	<FormPanel index={1}>
		<PollContent />
	</FormPanel>
	<FormPanel index={2}>
		<div>C</div>
	</FormPanel>
</MultiForm>
</div>
<div>
<p></p>
</div>