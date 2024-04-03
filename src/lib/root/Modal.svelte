<script lang="ts">
	import { X } from 'lucide-svelte';

	export let showModal: boolean;
	export let extraClasses: string = '';

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) {
		dialog.showModal();
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class={'p-4 text-white border rounded w-[400px] border-background-lightest bg-background-lighter ' +
		extraClasses}
>
	<div on:click|stopPropagation>
		<div class="flex flex-row items-center w-full mb-4">
			<div class="flex flex-row items-center w-full text-xl font-semibold">
				<slot name="header" />
			</div>
			<i
				class="cursor-pointer"
				on:click={() => {
					dialog.close();
					showModal = false;
				}}><X /></i
			>
		</div>

		<slot />
	</div>
</dialog>
