<script>
import { controllerState } from "./globals.js";
    
export let index;
</script>
{#if $controllerState.current == index}
<div class="multiform-panel">
    <slot></slot>
</div>
{/if}