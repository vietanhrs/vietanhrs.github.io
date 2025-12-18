<script lang="ts">
	import '../app.css';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	let { children } = $props();

	let isSideBarVisible = $state(true);

    if (typeof window !== 'undefined') {
        isSideBarVisible = window.matchMedia('(min-width: 768px)').matches;
        window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
            isSideBarVisible = e.matches;
        });
    }
	const toggleSidebar = () => {
		isSideBarVisible = !isSideBarVisible;
	};
	const hideSiderbar = () => {
		isSideBarVisible = false;
	}
</script>

<AppShell slotSidebarLeft="">
	<svelte:fragment slot="sidebarLeft">
		<div
			class="transition-all duration-300 ease-in-out"
			class:w-40={isSideBarVisible}
			class:w-0={!isSideBarVisible}
		>
			{#if isSideBarVisible}
				<nav class="list-nav">
					<ul>
						<li><a href="/" onclick={() => hideSiderbar()}>Experiences</a></li>
						<li><a href="/cert" onclick={() => hideSiderbar()}>Certificate & Achievement</a></li>
						<li><a href="/iot" onclick={() => hideSiderbar()}>My IoT Stuff</a></li>
						<li><a href="/laptops" onclick={() => hideSiderbar()}>My Laptops</a></li>
						<li><a href="/keyboards" onclick={() => hideSiderbar()}>My Keyboards</a></li>
						<li><a href="/links" onclick={() => hideSiderbar()}>Links</a></li>
					</ul>
				</nav>
			{/if}
		</div>
	</svelte:fragment>

	<svelte:fragment>
		<div class="transition-all duration-300 ease-in-out">
			{@render children()}
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header">
		<AppBar class="border-b-2 border-[#928374] !bg-[#f2e5bc]">
			<div class="flex gap-3">
				<button onclick={toggleSidebar}>
					<Icon icon="material-symbols:menu-rounded" width="24" height="24" />
				</button>
				<h5>Tran Viet Anh - (+84) 988 582 914 - vietanhtran.uet@gmail.com</h5>
			</div>
		</AppBar>
	</svelte:fragment>
</AppShell>
