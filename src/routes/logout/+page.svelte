<script lang="ts">
    import { goto } from "$app/navigation";
    import { contributionService } from "../../services/contribution-service";

    contributionService.logout();
    goto("/");
</script>
