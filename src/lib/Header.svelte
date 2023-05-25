<script lang="ts">
    import TitleBar from './TitleBar.svelte';
</script>

<div class="columns is-vcentered">
    <div class="column is-half">
        <TitleBar title={'PlaceMark Svelte'} subTitle={''} />
    </div>
    <div class="column">
        <slot />
    </div>
</div>
