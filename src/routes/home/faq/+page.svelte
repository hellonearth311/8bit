<script lang="ts">
    import CartridgeRail from '$lib/CartridgeRail.svelte';

    const activeId = 'faq';
</script>
<style>
@import '../page.css';
h2 {
    font-size: small;
    color: #358600;
}
</style>

<title>FAQ</title>

<main class="home-page text">
    <header class="hero">
        <h1 id="title">FAQ</h1>
        <p id="subtitle">Answers here!</p>
    </header>

    <article class="content-card">
        <h2>Can I use AI?</h2>
        <p2>Yes, but not for assets and your projects must be under 30% AI. If you have questions, feel free to reach out to our staff!</p2>
        <br>
        <br>
        <h2>I need help, where do I go?</h2>
        <p2>Ask away in the <a href="https://hackclub.enterprise.slack.com/archives/C0ALJKV1CRK">Slack channel!</a></p2>
        <br>
        <br>
        <h2>Is this double dippable with any other YSWSs?</h2>
        <p2>Nope!</p2>
        <br>
        <br>
        <h2>Can I work in a team?</h2>
        <p2>Sorry, you can't work in a team!</p2>
        <br>
        <br>
        <h2>Is there a time requirement?</h2>
        <p2>Your project must be atleast 12 hours! (subject to change)</p2>
        <br>
        <br>
        <h2>When is the deadline?</h2>
        <p2>TBD, but probably sometime in late June!</p2>
        <br>
        <br>
        <h2>What's the prize?</h2>
        <p2>A custom console designed by a Hack Clubber than can play your game!</p2>
        <br>
        <br>
        <h2>Who can participate?</h2>
        <p2>Any teenager from 13-18 in <a href="https://hackclub.com/" target="_blank" rel="noopener noreferrer" data-sveltekit-reload>Hack Club</a>!</p2>
        
    </article>
</main>

<CartridgeRail {activeId} />
