<script>
	import { X } from 'lucide-svelte';
	import { mobileMenuShownRoot as mobileMenu } from '$lib';

	let pricingDropdown = false;
</script>

<div
	class="absolute top-0 left-0 z-20 flex flex-col w-screen h-screen gap-4 px-4 mx-auto py-7 bg-background-darker/95"
>
	<div class="flex flex-row items-center w-full">
		<span
			class="w-full text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text"
			>bddy.lol LLC</span
		>

		<div on:click={() => mobileMenu.set(false)}>
			<X />
		</div>
	</div>

	<a
		href="/vouches"
		class="z-30 w-full p-2 font-semibold text-transparent rounded-md hover:bg-background-lightest bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
		>Vouches</a
	>

	<span
		class="flex flex-col p-2 font-semibold rounded-md w-ful l gap-2z-30 hover:bg-background-lightest"
	>
		<span>Pricing</span>
		<div class="flex flex-col gap-3 px-4 mt-2 border-l border-white/50">
			<a href="/pricing/#bddyHub">bddyHub</a>
			<a href="/pricing/#bddyHub">bddyHub</a>
			<a href="/pricing/#bddyHub">bddyHub</a>
			<a href="/pricing/#bddyHub">bddyHub</a>
			<a href="/pricing/#bddyHub">bddyHub</a>
		</div>
	</span>

	<a
		href="https://discord.gg/bddylol"
		target="_blank"
		class="z-30 w-full p-2 font-semibold rounded-md hover:bg-background-lightest">Contact Us</a
	>

	<a href="/terms" class="z-30 w-full p-2 font-semibold rounded-md hover:bg-background-lightest"
		>Terms</a
	>
</div>
