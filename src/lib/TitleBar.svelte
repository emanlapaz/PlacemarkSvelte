<script>
    import { user } from "../stores.js";
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
        {#if $user.email}
            <div class="is-size-7">Welcome: {$user.email}</div>
        {:else}
            <div class="is-size-7">{$user.email}</div>
        {/if}
    </div>
</div>

<!-- 
    !!!! changed user.email to user.firstName
    remove email when logged out
    change icon and color. 
-->
