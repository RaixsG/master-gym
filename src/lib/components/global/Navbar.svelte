<script>
    import { Link, navigate } from "svelte-routing";
    import { ROUTES } from "../../../constants/routes";
    import { user } from "../../../stores/user";

    const cerrarSesion = () => {
        user.setUser(null);
        console.log('sesión cerrada')
        navigate(ROUTES.LOGIN, { replace: true });
    };
</script>

<nav>
    <Link to={ROUTES.HOME}>
        <span>INICIO</span>
    </Link>
    <Link to={ROUTES.EMPLOYERS}>
        <span>EMPLEADOS</span>
    </Link>
    <Link to={ROUTES.MEMBERS}>
        <span>MIEMBROS</span>
    </Link>
    <Link to={ROUTES.DAILYS}>
        <span>DIARIOS</span>
    </Link>
    <Link to={ROUTES.PRODUCTS}>
        <span>PRODUCTOS</span>
    </Link>
    <span on:click={cerrarSesion} on:keypress={cerrarSesion} role="menuitem" tabindex={ 0 }>CERRAR SESIÓN</span>
</nav>

<style>
    nav {
        background-color: #2E2E2E80;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 10px 20px;
        margin: 20px 0;
        width: 80%;
        transition: background-color .2s;
    }

    nav:hover {
        background-color: #2E2E2E90;
    }

    span {
        font-weight: bold;
        transition: color .2s;
        color: #C0C0C0;
    }
    span:hover {
        color: #ffffff;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        nav {
            display: flex;
            flex-direction: column;
        }
    }

</style>
