<script>
    export let editUser;
    export let dni;

    let userForm = {
        dni,
        nombre: "",
        apellido: "",
        celular: "",
        turno: "",
        sueldo: "",
    };

    // LIMPIAR INPUTS
    const cleanForm = () => {
        userForm = {
            nombre: "",
            apellido: "",
            dni: "",
            celular: "",
            turno: "",
            sueldo: "",
        };
    };

    // CALC TOTAL SUELDO
    let totalSueldoPagar = 0;
    const getTotalSueldoPagar = () => {
      totalSueldoPagar = 0;
      if (editUser.length) {
        editUser.forEach((empleado) => {
          totalSueldoPagar = totalSueldoPagar + Number(empleado.sueldo);
        })
      }
    }

    const sendUpdate = () => {
        editUser(dni, userForm);
        cleanForm();
        getTotalSueldoPagar();
    };
</script>

<form on:submit|preventDefault={sendUpdate}>
    <div>
        <label for="">Nombre:</label>
        <input type="text" placeholder="Nombre" bind:value={userForm.nombre} />
    </div>
    <div>
        <label for="">Apellido:</label>
        <input
            type="text"
            placeholder="Apellido"
            bind:value={userForm.apellido}
        />
    </div>
    <div>
        <label for="">Celular:</label>
        <input
            type="tel"
            placeholder="999******"
            bind:value={userForm.celular}
        />
    </div>
    <div>
        <label for="">Turno a trabajar:</label>
        <select bind:value={userForm.turno}>
            <option selected disabled value="">--Seleciona un turno--</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
        </select>
    </div>
    <div>
        <label for="">Sueldo: </label>
        <input type="number" placeholder="S/.1035.00" bind:value={userForm.sueldo}>
    </div>
    <div class="flex-derecha">
        <button type="submit">Guardar Cambios</button>
    </div>
</form>


<style>

/* SMALL */
    @media (max-width: 767px) {
        .flex-derecha button {
            width: 70%;
        }
    }

/* BIG */

    @media (min-width: 768px) {

        div:nth-child(6) {
            grid-column: 2 / 3;
            padding-top: 15px;
        }
    }
</style>