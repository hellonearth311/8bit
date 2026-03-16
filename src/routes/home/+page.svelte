<script lang="ts">
    import { resolve } from '$app/paths';
    import { onMount } from 'svelte';

    onMount(() => {
        if (window.location.search) {
            window.history.replaceState(window.history.state, '', resolve('/home'));
        }
    });
</script>