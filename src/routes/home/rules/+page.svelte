<script lang="ts">
    import CartridgeRail from '$lib/CartridgeRail.svelte';

    const activeId = 'rules';
</script>
<style>@import '../page.css'; </style>

<title>Rules</title>

<main class="home-page text">
    <header class="hero">
        <h1 id="title">RULES</h1>
        <p id="subtitle">Follow these or else...</p>
    </header>

    <article class="content-card">
        <h2>Rules</h2>
        <p>1. Don't use over 30% AI.</p>
        <p>2. Ensure your project is open-sourced on GitHub.</p>
        <p>3. Your project should be compatible with any of the following consoles <br> - Game Boy (Color/Advance/Regular) <br> - (S)NES <br> - N64 <br> For other consoles please ask in the Slack channel!</p>
        <p>4. Do not use assembly language for your project.</p>
        <p>5. Do not work in a team, work solo.</p>
        <p>6. Track your time with <a href="https://hackatime.hackclub.com">Hackatime!</a></p>
    </article>
</main>

<CartridgeRail {activeId} />
