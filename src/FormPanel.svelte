<script>
import { controllerState } from "./globals.js";
    
export let index;
</script>
<style>
.multiform-panel {
    display: block;
}

.multiform-panel.hidden {
    display: none;
}
</style>
{#if index === $controllerState.current }
<div class="multiform-panel">
    <slot></slot>
</div>
{/if}
