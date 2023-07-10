<script>
    import { FormMiembros } from "../../components/index";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { user } from "../../../stores/user";
    import { ROUTES } from "../../../constants/routes";

    onMount(() => {
        if (!$user) {
            navigate(ROUTES.LOGIN, { replace: true });
        }
    });
</script>

<div>
    {#if $user}
        <h2>Miembros</h2>
        <FormMiembros />
    {/if}
</div>
