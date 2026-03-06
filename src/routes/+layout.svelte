<script lang="ts">
	import { goto } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';
	import { __Session__ } from '$lib/session-proc/index.svelte';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import '../global.settings.css';

	let { children } = $props();

	onMount(async () => {
		const session_id = await __Session__.Fetch();

		if (!session_id) {
			goto(resolve('/login'), {});
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
