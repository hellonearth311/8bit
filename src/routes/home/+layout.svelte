<script lang="ts">
    import './page.css';
</script>

<svelte:body />

<slot />

<style>
:global(body) {
    background: #000 !important;
}
</style>
