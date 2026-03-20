<script lang="ts">
    import { resolve } from '$app/paths';
    import { cartridgeRoutes, type CartridgeRoute } from '$lib/cartridgeNav';

    let { activeId }: { activeId: CartridgeRoute['id'] } = $props();
</script>

<nav class="cartridges" aria-label="Cartridge navigation">
    {#each cartridgeRoutes as cartridge (cartridge.id)}
        <a
            href={resolve(cartridge.href)}
            class="cartridgeButton {activeId === cartridge.id ? 'loaded' : ''}"
            aria-label={`Go to ${cartridge.label}`}
            aria-current={activeId === cartridge.id ? 'page' : undefined}
        >
            <img src="/assets/cartridge.png" alt="" class="cartridge" aria-hidden="true">
            <span class="cartridgeLabel">{cartridge.label}</span>
        </a>
    {/each}
</nav>

<style>
.cartridgeButton {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transform: translateX(0);
    transition: transform 260ms ease-out;
}

.cartridgeButton:hover,
.cartridgeButton:focus-visible {
    transform: translateX(100px);
}

.cartridge {
    width: min(280px, 100%);
    height: auto;
    transform: rotate(90deg);
    transform-origin: center;
}

.cartridgeLabel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 0.2em;
    font-size: 0.95rem;
    font-family: 'Pixeloid Mono', monospace;
    color: #358600;
    pointer-events: none;
}

.cartridges {
    position: fixed;
    left: -425px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    z-index: 6;
}

@media (max-width: 900px) {
    .cartridges {
        left: -335px;
    }
}
</style>
