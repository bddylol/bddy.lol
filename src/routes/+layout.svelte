<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>bddy.lol</title>
	<meta name="description" content="Hey, i'm bddylol. An advanced developer" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://bddy.lol" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="bddy.lol" />
	<meta property="og:description" content="Hey, i'm bddylol. An advanced developer" />
	<meta property="og:image" content="https://bddy.lol/favicon.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="bddy.lol" />
	<meta property="twitter:url" content="https://bddy.lol" />
	<meta name="twitter:title" content="bddy.lol" />
	<meta name="twitter:description" content="Hey, i'm bddylol. An advanced developer" />
	<meta name="twitter:image" content="https://bddy.lol/favicon.png" />
</svelte:head>

<div class="w-screen h-screen font-light tracking-tight text-white bg-background-default">
	<slot />
</div>
