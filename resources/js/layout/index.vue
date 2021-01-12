<template>
	<div id="layout">
        <router-view :key="route" style="padding: 1rem;"/>
    </div>
</template>

<script>
	export default {
		name: "layout",
        computed: {
            route() {
                return this.$route.path;
            }
        }
	}
</script>

<style lang="scss" scoped>

</style>
