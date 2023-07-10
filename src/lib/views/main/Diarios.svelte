<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { user } from "../../../stores/user";
    import { ROUTES } from "../../../constants/routes";
    import { FormDiarios } from "../../components/index";

    onMount(() => {
        if (!$user) {
            navigate(ROUTES.LOGIN, { replace: true });
        }
    });
</script>

<div>
    {#if $user}
        <h2>Clientes Diarios</h2>
        <FormDiarios />
    {/if}
</div>
