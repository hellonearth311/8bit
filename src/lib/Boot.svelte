<script lang="ts">
	import { onMount } from 'svelte';

	let { onComplete = undefined, onOutroComplete = undefined }: { onComplete?: () => void; onOutroComplete?: () => void } = $props();

	type CubeState = {
		startX: number;
		startY: number;
		targetX: number;
		targetY: number;
		delay: number;
		drift: number;
		tilt: number;
		depth: number;
		sizeScale: number;
	};

	const config = {
		durationMs: 4600,
		gridSize: 3,
		baseCubeSize: 18,
		cubeSpacing: 26,
		travelWindow: 0.68,
		holdWindow: 0.18,
		colors: {
			background: '#000000',
			top: '#ff6b6b',
			left: '#c53a3a',
			right: '#ff9a9a',
			accent: '#ff8080'
		}
	} as const;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D | null = null;
	let animationFrame = 0;
	let resizeObserver: ResizeObserver | null = null;
	let width = 0;
	let height = 0;
	let cubes: CubeState[] = [];
	let startedAt = 0;
	let finished = false;
	const outroDurationMs = 2000;
	let outroStartedAt = 0;

	const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
	const easeInOutCubic = (value: number) =>
		value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
	const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

	function createFormation(): CubeState[] {
		const centerX = width / 2;
		const centerY = height / 2;
		const formationScale = Math.max(0.7, Math.min(width, height) / 720);
		const spacing = config.cubeSpacing * formationScale;
		const size = config.gridSize;
		const states: CubeState[] = [];

		for (let z = 0; z < size; z += 1) {
			for (let y = 0; y < size; y += 1) {
				for (let x = 0; x < size; x += 1) {
					const offsetX = x - (size - 1) / 2;
					const offsetY = y - (size - 1) / 2;
					const offsetZ = z - (size - 1) / 2;
					const targetX = centerX + (offsetX - offsetY) * spacing * 0.92;
					const targetY = centerY + (offsetX + offsetY) * spacing * 0.52 - offsetZ * spacing * 0.88;

					const angle = Math.atan2(targetY - centerY, targetX - centerX) + (Math.random() - 0.5) * 0.8;
					const radius = Math.max(width, height) * (0.68 + Math.random() * 0.42);
					const startX = centerX + Math.cos(angle) * radius;
					const startY = centerY + Math.sin(angle) * radius;

					states.push({
						startX,
						startY,
						targetX,
						targetY,
						delay: Math.random() * 0.14 + z * 0.03,
						drift: (Math.random() * 2 - 1) * spacing * 0.55,
						tilt: Math.random() * Math.PI * 2,
						depth: x + y + z,
						sizeScale: 0.82 + Math.random() * 0.28
					});
				}
			}
		}

		return states.sort((left, right) => left.depth - right.depth);
	}

	function resizeCanvas() {
		if (!canvas) {
			return;
		}

		const rect = canvas.getBoundingClientRect();
		const nextWidth = Math.max(1, Math.floor(rect.width || window.innerWidth));
		const nextHeight = Math.max(1, Math.floor(rect.height || window.innerHeight));

		if (nextWidth === width && nextHeight === height && context) {
			return;
		}

		width = nextWidth;
		height = nextHeight;

		const dpr = window.devicePixelRatio || 1;
		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);
		context = canvas.getContext('2d');

		if (!context) {
			return;
		}

		context.setTransform(dpr, 0, 0, dpr, 0, 0);
		cubes = createFormation();
	}

	function clearFrame() {
		if (!context) {
			return;
		}

		context.fillStyle = config.colors.background;
		context.fillRect(0, 0, width, height);
	}

	function drawCube(x: number, y: number, size: number, opacity: number) {
		if (!context) {
			return;
		}

		const half = size / 2;
		const quarter = size / 4;

		context.save();
		context.globalAlpha = opacity;
		context.translate(x, y);

		context.beginPath();
		context.moveTo(0, -half);
		context.lineTo(half, -quarter);
		context.lineTo(0, 0);
		context.lineTo(-half, -quarter);
		context.closePath();
		context.fillStyle = config.colors.top;
		context.fill();

		context.beginPath();
		context.moveTo(-half, -quarter);
		context.lineTo(0, 0);
		context.lineTo(0, half);
		context.lineTo(-half, quarter);
		context.closePath();
		context.fillStyle = config.colors.left;
		context.fill();

		context.beginPath();
		context.moveTo(half, -quarter);
		context.lineTo(0, 0);
		context.lineTo(0, half);
		context.lineTo(half, quarter);
		context.closePath();
		context.fillStyle = config.colors.right;
		context.fill();

		context.restore();
	}

	function renderFrame(progress: number) {
		if (!context) {
			return;
		}

		clearFrame();

		const travelProgress = clamp(progress / config.travelWindow, 0, 1);
		const settleStart = config.travelWindow;
		const settleProgress = clamp((progress - settleStart) / config.holdWindow, 0, 1);
		const formationPulse = 1 + Math.sin(progress * Math.PI * 6) * 0.04 * (1 - progress);

		for (const cube of cubes) {
			const localProgress = clamp((travelProgress - cube.delay) / (1 - cube.delay), 0, 1);
			const easedTravel = easeOutCubic(localProgress);
			const arcOffset = Math.sin(localProgress * Math.PI) * cube.drift;
			const driftX = Math.cos(cube.tilt) * arcOffset * 0.35;
			const driftY = Math.sin(cube.tilt) * arcOffset * 0.18 - arcOffset * 0.1;
			const x = cube.startX + (cube.targetX - cube.startX) * easedTravel + driftX;
			const y = cube.startY + (cube.targetY - cube.startY) * easedTravel + driftY;
			const settle = easeInOutCubic(settleProgress);
			const snapY = y + (cube.targetY - y) * settle;
			const snapX = x + (cube.targetX - x) * settle;
			const size =
				config.baseCubeSize *
				cube.sizeScale *
				formationPulse *
				Math.max(0.72, Math.min(width, height) / 760);
			const opacity = 0.12 + localProgress * 0.88;

			drawCube(snapX, snapY, size, opacity);
		}
	}

	function stopAnimation() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
			animationFrame = 0;
		}
	}

	function animate(timestamp: number) {
		if (!startedAt) {
			startedAt = timestamp;
		}

		const elapsed = timestamp - startedAt;
		const progress = clamp(elapsed / config.durationMs, 0, 1);
		renderFrame(progress);

		if (progress >= 1) {
			stopAnimation();
			if (!finished) {
				finished = true;
				onComplete?.();
			}
			return;
		}

		animationFrame = requestAnimationFrame(animate);
	}

	export function startOutro() {
		stopAnimation();
		outroStartedAt = 0;
		animationFrame = requestAnimationFrame(animateOutro);
	}

	function animateOutro(timestamp: number) {
		if (!outroStartedAt) {
			outroStartedAt = timestamp;
		}
		const elapsed = timestamp - outroStartedAt;
		const outroProgress = clamp(elapsed / outroDurationMs, 0, 1);
		renderFrame(1 - outroProgress);

		if (outroProgress >= 1) {
			stopAnimation();
			onOutroComplete?.();
			return;
		}

		animationFrame = requestAnimationFrame(animateOutro);
	}

	onMount(() => {
		resizeCanvas();
		startedAt = 0;
		finished = false;
		animationFrame = requestAnimationFrame(animate);

		resizeObserver = new ResizeObserver(() => {
			resizeCanvas();
			renderFrame(startedAt ? clamp((performance.now() - startedAt) / config.durationMs, 0, 1) : 0);
		});

		resizeObserver.observe(canvas);
		window.addEventListener('resize', resizeCanvas);

		return () => {
			stopAnimation();
			resizeObserver?.disconnect();
			window.removeEventListener('resize', resizeCanvas);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		background: #000;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 0;
		background: #000;
	}
</style>