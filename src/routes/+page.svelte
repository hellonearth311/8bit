<script lang="ts">
    import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';
    import Boot from '$lib/Boot.svelte';

    let bootRef: { startOutro: () => void } | undefined;
    let outroRunning = false;

    function handleComplete() {
        outroRunning = true;
        bootRef?.startOutro();
    }

    function handleOutroComplete() {
        goto(resolve('/home/info'));
    }

    function handleSkipIntro(event: MouseEvent) {
        event.preventDefault();
        goto(resolve('/home/info'));
    }
</script>

<title>8bit YSWS</title>
<img src="assets/hack_club_flag.png" alt="orpheus" id="hcl">

<div class="intro-shell">
    <div class="intro-canvas">
        <Boot bind:this={bootRef} onComplete={handleComplete} onOutroComplete={handleOutroComplete} />
        <div class="intro-copy" style="transition: opacity 0.5s ease-in;" style:opacity={outroRunning ? 0 : 1}>
            <h1 class="intro-title">Hack Club <span class="eightbit">8-Bit</span></h1>
        </div>
    </div>
    <p id="loadingSkip" style="transition: opacity 0.5s ease-in;" style:opacity={outroRunning ? 0 : 1}><a href={resolve('/home/info')} on:click={handleSkipIntro}>skip intro</a></p>
</div>

