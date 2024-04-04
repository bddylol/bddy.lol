<script lang="ts">
	import Modal from '$lib/root/Modal.svelte';
	import Navbar from '$lib/root/Navbar.svelte';
	import { onMount } from 'svelte';

	export let data;

	let createVouchModalInputs = {
		show: false,
		review: '+rep',
		stars: 5
	};

	let vouchesList: {
		stars: number;
		review: string;
		user_id: string;
		username: string;
		avatar_url: string;
	}[] = [];

	async function getVouches() {
		const res = await fetch('/api/vouch');
		const json = await res.json();

		if (json.error) {
			alert(json.error);
			return;
		}

		vouchesList = json.data;
	}

	async function addVouch() {
		const res = await fetch('/api/vouch', {
			method: 'POST',
			body: JSON.stringify({
				review: createVouchModalInputs.review,
				stars: createVouchModalInputs.stars
			})
		});

		const json = await res.json();

		if (json.error) {
			alert(json.error);
			if (json.code == 'login_needed') {
				data.supabase.auth.signInWithOAuth({
					provider: 'discord'
				});
			}
			return;
		}

		vouchesList = json.data;
		getVouches();
	}

	onMount(() => {
		getVouches();
		console.log(vouchesList);
	});
</script>

<title>bddy.lol | Vouches</title>

<div class="container flex flex-col w-screen h-screen gap-4 mx-auto">
	<Navbar />

	<section class="flex flex-col w-full h-full gap-4 px-4">
		<span class="flex flex-row items-center gap-4 text-2xl font-semibold"
			>Vouches
			<button
				on:click={() => (createVouchModalInputs.show = true)}
				class="px-4 py-2 text-sm font-normal rounded-md hover:outline hover:outline-1 hover:outline-blue-500 bg-gradient-to-r from-blue-400/50 to-purple-400/50"
				>Add Vouch</button
			>
		</span>

		<div class="flex flex-row flex-wrap w-full gap-4">
			{#if vouchesList.length == 0}
				<span>Loading vouches...</span>
			{/if}
			{#each vouchesList as v}
				<div
					class="flex flex-col gap-2 w-[400px] rounded-lg border border-background-lightest p-2 bg-background-lighter"
				>
					<div class="flex flex-row items-center w-full gap-2">
						<img class="rounded-full w-7" alt="PFP" src={v.avatar_url} />
						<span>@{v.username}</span>
						<span>({v.user_id})</span>
					</div>
					<div class="flex flex-row items-center w-full gap-2">
						{#each Array(v.stars) as s}
							<span>⭐</span>
						{/each}
					</div>
					<div class="w-full">{v.review}</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<Modal extraClasses="w-[600px]" showModal={createVouchModalInputs.show}>
	<span slot="header">New Vouch</span>

	<div class="flex flex-col w-full gap-2 mb-4">
		<label for="review">Review</label>
		<textarea
			id="review"
			bind:value={createVouchModalInputs.review}
			class="w-full p-2 border rounded-md outline-none border-background-lightest bg-background-lighter"
		></textarea>
	</div>

	<div class="flex flex-col w-full gap-2 mb-4">
		<label for="stars">Stars</label>
		<input
			id="stars"
			type="number"
			max="5"
			min="1"
			bind:value={createVouchModalInputs.stars}
			class="w-full p-2 border rounded-md outline-none border-background-lightest bg-background-lighter"
		/>
	</div>

	<div class="flex flex-col w-full gap-2 mb-4">
		<label for="stars">Preview</label>
		<div
			class="flex flex-col w-full gap-2 p-2 border rounded-lg border-background-lightest bg-background-lighter"
		>
			<div class="flex flex-row items-center w-full gap-2">
				<img
					class="rounded-full w-7"
					alt="PFP"
					src={data?.session?.user?.user_metadata?.avatar_url ?? 'https://google.com/favicon.ico'}
				/>
				<span>@{data?.session?.user?.user_metadata?.full_name ?? 'You'}</span>
				<span>({data?.session?.user?.user_metadata?.provider_id ?? '0'})</span>
			</div>
			<div class="flex flex-row items-center w-full gap-2">
				{#each Array(createVouchModalInputs.stars) as s}
					<span>⭐</span>
				{/each}
			</div>
			<div class="w-full">{createVouchModalInputs.review}</div>
		</div>
	</div>

	<button
		on:click={addVouch}
		class="px-4 py-2 text-sm font-normal rounded-md hover:outline hover:outline-1 hover:outline-blue-500 bg-gradient-to-r from-blue-400/50 to-purple-400/50"
		>Publish</button
	>
</Modal>
