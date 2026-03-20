<script lang="ts">
    import CartridgeRail from '$lib/CartridgeRail.svelte';

    const activeId = 'rsvp';
</script>
<style>@import '../page.css'; </style>

<main class="home-page text">
    <header class="hero">
        <h1 id="title">RSVP</h1>
        <p id="subtitle">Want to be notified when this starts?</p>
    </header>

    <article class="content-card">
        <h2>RSVP Information</h2>
        <p1>Click <a href="https://hackclub.enterprise.slack.com/archives/C0ALJKV1CRK">here</a> to join our Slack channel and make sure to RVSP <a href="https://forms.fillout.com/t/tZ1xgGNhdGus">here</a>!</p1>
    </article>
</main>

<CartridgeRail {activeId} />
