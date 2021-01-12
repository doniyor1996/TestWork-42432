<template>
	<div id="app">
		<layout/>
	</div>
</template>

<script>
	import Layout from "./layout";

	export default {
		name: 'app',
		components: {
			Layout,
		},
		computed: {
		},

		created() {
			this.$store.dispatch('UPDATE_ROUTES').then();
		}
	}
</script>

<style>
</style>
