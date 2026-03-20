<script lang="ts">
    import CartridgeRail from '$lib/CartridgeRail.svelte';

    const activeId = 'info';
</script>
<style>@import '../page.css'; </style>

<title>Guides</title>

<main class="home-page text">
    <header class="hero">
        <h1 id="title">Guides</h1>
        <p id="subtitle">Need a little help?</p>
    </header>

    <article class="content-card">
        <p><a href="https://bumbershootsoft.wordpress.com/platform-guide-the-nintendo-entertainment-system">Guide for NES</a></p>
        <p><a href="https://bumbershootsoft.wordpress.com/platform-guide-nintendo-game-boy-and-color/">Guide for the Game Boy (Color / Regular)</a></p>
        <p><a href="https://bumbershootsoft.wordpress.com/platform-guide-the-super-nintendo-entertainment-system/">Guide for the SNES</a></p>
        <p><a href="https://n64.dev">Guide for the N64</a></p>
    </article>
</main>

<CartridgeRail {activeId} />    
