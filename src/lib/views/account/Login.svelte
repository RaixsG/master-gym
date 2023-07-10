<script>
    import { navigate } from "svelte-routing";
    import { ROUTES } from "../../../constants/routes";
    import { user } from "../../../stores/user";

    export let email = "";
    export let password = "";

    const procesarFormulario = () => {
        //Si los campos estan vacios
        if (!email.trim() || !password.trim()) {
            alert("Campos Vacios");
            return;
        }

        if (email === "admin" || password === "admin") {
            user.setUser({
                email,
                password,
            });
            console.log("exito");
        } else {
            alert("Usuario o Contraseña Incorrectos");
            return;
        }

        //si existe el usuario, se va enviar a perfil
        navigate(ROUTES.HOME, { replace: true });
    };
</script>

<div>
    <h2>Login</h2>
    <form on:submit|preventDefault={procesarFormulario}>
        <label for="">Usuario:</label>
        <input type="text" placeholder="Ingrese Usuario" bind:value={email} />

        <label for="">Contraseña:</label>
        <input
            type="password"
            placeholder="Ingrese Contraseña"
            bind:value={password}
        />

        <button type="submit">Iniciar Sesión</button>
    </form>
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
        padding: 5px;
    }

    label {
        padding: 5px;
    }
</style>
