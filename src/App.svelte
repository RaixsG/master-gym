<script>

  import { Router, Route, Link } from "svelte-routing";

  //? COMPONENTS IMPORT
  import {
    Navbar,
  } from './lib/components/index'

  //? VIEWS IMPORT
  import {
    Login,
    Home,
    Empleados,
    Miembros,
    Diarios,
    Productos,
  } from './lib/views/index'

  import { ROUTES } from "./constants/routes";

  let url = '/';

  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { user } from './stores/user';

  onMount(() => {
    if (!$user) {
      navigate(ROUTES.LOGIN, {replace: true});
    }
  })

</script>

<main>
  <Router {url}>
    <h1>Master GYM - Admin</h1>

    {#if $user}
      <Navbar />
    {/if}

    <Route path={ROUTES.LOGIN}>
      <Login />
    </Route>
    <Route path={ROUTES.HOME}>
      <Home />
    </Route>
    <Route path={ROUTES.EMPLOYERS}>
      <Empleados />
    </Route>
    <Route path={ROUTES.MEMBERS}>
      <Miembros />
    </Route>
    <Route path={ROUTES.DAILYS}>
      <Diarios />
    </Route>
    <Route path={ROUTES.PRODUCTS}>
      <Productos />
    </Route>
  </Router>
</main>

<style>
  main {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 30px;
    border: 2px solid #C0C0C0;
    border-radius: 15px;
    height: 80vh;
    align-self: center;
    overflow: auto;
    width: 80vw;
    max-width: 1280px;
    text-align: center;
  }

  h1 {
    color: #ffffff;
  }
</style>
