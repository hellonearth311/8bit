<script lang="ts">
    import CartridgeRail from '$lib/CartridgeRail.svelte';

    const activeId = 'info';
</script>
<style>@import '../page.css'; </style>

<title>Info</title>

<main class="home-page text">
    <header class="hero">
        <h1 id="title">INFO</h1>
        <p id="subtitle">What Is 8-Bit?</p>
    </header>

    <article class="content-card">
        <h2>Hack Club 8-Bit</h2>
        <p>8-Bit is a YSWS where you build software for retro hardware, and get a custom console designed by a Hack Clubber to run your game!</p>
        <br>
        <p id="larger">Here's how it works!</p>
        <p>Step 1: Build your game for a retro platform using one of our  <a href="/home/guides">guides</a>!</p>
        <p>Step 2: Make sure your game aligns with the <a href="/home/rules">rules</a>!</p>
        <p>Step 3: Submit your game <a href="/home/rsvp">here</a>!</p>
        <p>Step 4: Get and build your hacker console and play your game on it!</p>
    </article>
</main>

<CartridgeRail {activeId} />    
