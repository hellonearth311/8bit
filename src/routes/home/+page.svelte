<script lang="ts">
    import { resolve } from '$app/paths';
    import { onMount } from 'svelte';
    import CartridgeRail from '$lib/CartridgeRail.svelte';

    const activeId = 'info';

    onMount(() => {
        if (window.location.search) {
            window.history.replaceState(window.history.state, '', resolve('/home'));
        }
    });
</script>
<style>@import './page.css'; </style>

<main class="home-page text">
    <header class="hero">
        <h1 id="title">8-BIT</h1>
        <p id="subtitle">BUILD SOFTWARE FOR MACHINES OLDER THAN YOU</p>
    </header>

    <article class="content-card">
        <h2>What Is 8-Bit?</h2>
        <p>8-Bit is a Hack Club YSWS where you build software for older machines.</p>
        <p>Select any cartridge to jump between the four pages: Info, Rules, FAQ, and RSVP.</p>
    </article>
</main>

<CartridgeRail {activeId} />


