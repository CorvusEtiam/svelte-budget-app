<script>
    import { onMount } from "svelte";
    import { controllerState } from "./globals.js";
    
    export let first = 0;
    export let last;
    export let current = 0; 

    onMount(() => {
        $controllerState.current = current;
    })

    $: previous_active = ($controllerState.current > first) && !$controllerState.prev;
    $: next_active = ($controllerState.current < last) && !$controllerState.next;

    function prev_panel() { 
        $controllerState.current = $controllerState.current - 1;
    }

    function next_panel() { 
        $controllerState.current = $controllerState.current + 1;    
    }

</script>
<form>
    <slot></slot>
    <div class="controller">
    {#if previous_active }
        <button type="button" on:click={prev_panel}>Previous</button>
    {/if}
    {#if next_active }
        <button type="button" on:click={next_panel}>Next</button>
    {/if}
    </div>
</form>