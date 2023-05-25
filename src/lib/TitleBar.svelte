<script lang="ts">
    import { loggedInUser } from "../stores";
    export let title = "";
    export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
    <div class="column">
        <img src="/map.jpeg" width="80" alt="img" />
    </div>
    <div class="column">
        <div class="title is-10">{title}</div>
        <div class="subtitle is-5">{subTitle}</div>
    </div>
    <div class="column">
        <i class="fas fa-user fa-3x" style="color:orange" />
        {#if $loggedInUser?.email}
        <div class="is-size-7">{$loggedInUser.email}</div>
    {:else}
        <div class="is-size-7">Placemark-Svelte 0.2</div>
    {/if}
    </div>
</div>
