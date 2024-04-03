<script>
	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { ChevronDown, Cpu } from 'lucide-svelte';
	import { loadFull } from 'tsparticles';
	import Navbar from '$lib/root/Navbar.svelte';
	import { onMount } from 'svelte';
	import TerminalAboutMe from '$lib/home/TerminalAboutMe.svelte';

	let ParticlesComponent;

	onMount(async () => {
		const module = await import('@tsparticles/svelte');

		ParticlesComponent = module.default;
	});

	let particlesContainer;
	let particlesConfig = {
		particles: {
			color: {
				value: '#fff'
			},
			move: {
				enable: true,
				speed: 2
			},
			number: {
				value: 100
			}
		}
	};

	let onParticlesLoaded = () => {
		console.log('Particles loaded');
	};

	void particlesInit(async (e) => {
		await loadFull(e);
	});
</script>

<title>bddy.lol | Home</title>

<div class="container flex flex-col w-screen h-screen gap-4 mx-auto">
	<Navbar />
	<main bind:this={particlesContainer} class="flex flex-row items-center w-full h-full gap-2 p-4">
		<section class="flex flex-col justify-center w-full h-full gap-4">
			<span class="text-5xl max-w-[500px] leading-tight"
				>Hey, i'm <span
					class="font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
					>bddylol</span
				>. An
				<span
					class="font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
					>advanced</span
				> developer</span
			>

			<div class="flex flex-row gap-2 flex-wrap max-w-[500px]">
				<a
					href="/vouches"
					class="px-4 py-2 rounded-md hover:outline hover:outline-1 hover:outline-blue-500 bg-gradient-to-r from-blue-400/50 to-purple-400/50"
					>Vouches</a
				><a
					href="https://discord.gg/bddylol"
					target="_blank"
					class="px-4 py-2 rounded-md hover:outline hover:outline-1 hover:outline-blue-500 bg-gradient-to-r from-zinc-400/50 to-slate-400/50"
					>Contact</a
				>
			</div>
		</section>

		<TerminalAboutMe />
	</main>

	<!-- <Particles id="tsparticles" options={particlesConfig} on:particlesLoaded={onParticlesLoaded} /> -->
</div>
