<template>
    <div id="mainView">
        <x-header></x-header>
		<div class="ms-main">
			<x-menu></x-menu>
        	<x-tabs></x-tabs>
		</div>
        
    </div>
</template>

<script>
	import xMenu from './menu'
	import xHeader from './Header'
	import xTabs from './tabs'

	export default {
		components: {
			XMenu: xMenu,
			XHeader: xHeader,
			XTabs: xTabs,
		}
	}
</script>

<style scoped>
	.ms-main{
		display: flex;
		justify-content: space-between;
		height: calc( 100vh - 60px);
	}
</style>