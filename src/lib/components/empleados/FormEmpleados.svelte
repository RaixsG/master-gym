<script>
    import EditUserModal from "./EditEmpleadosForm.svelte";

    // EDIT USE MODAL STATES
    let selectedDni = null;

    // EMPLEADOS DATA
    let empleados = [];

    // FORM LOGIC
    let empleadosForm = {
        nombre: "",
        apellido: "",
        dni: "",
        celular: "",
        turno: "",
        sueldo: "",
    };

    // CALC TOTAL SUELDO
    let totalSueldoPagar = 0;
    const getTotalSueldoPagar = () => {
        totalSueldoPagar = 0;
        if (empleados.length) {
            empleados.forEach((empleado) => {
                totalSueldoPagar = totalSueldoPagar + Number(empleado.sueldo);
            });
        }
    };

    // LIMPIAR INPUTS
    const cleanForm = () => {
        empleadosForm = {
            nombre: "",
            apellido: "",
            dni: "",
            celular: "",
            turno: "",
            sueldo: "",
        };
    };

    // CRUD FORM
    const addEmpleado = () => {
        // verificar si ya esta registrado por medio del dni
        const userAlreadyRegistered = empleados.findIndex(
            (empleados) => empleados.dni === empleadosForm.dni
        );
        //si la funcion no encuentra ningun entrada igual  ala guardada devuelve -1
        if (userAlreadyRegistered === -1) {
            empleados = empleados.concat({ ...empleadosForm });
            cleanForm();
            getTotalSueldoPagar();
            return;
        }
        alert(
            `Error, el usuario con el dni ${empleadosForm.dni} ya se encuentra registrado`
        );
    };

    const openModal = (dni) => {
        selectedDni = dni;
    };

    const editUser = (dni, newData) => {
        const userIndex = empleados.findIndex(
            (empleados) => empleados.dni === dni
        );
        let tempEmpleados = empleados;
        tempEmpleados.splice(userIndex, 1, { ...newData });
        empleados = tempEmpleados;
        selectedDni = null;
        getTotalSueldoPagar();
    };

    const deleteUser = (dni) => {
        const userIndex = empleados.findIndex(
            (empleados) => empleados.dni === dni
        );
        // Si hay algo dentro del array, se borra y retorna la funcion
        if (empleados.length === 1) {
            empleados = [];
            return;
        }
        // temporalmente colocalmos los datos de empleados en tempEmpleados
        let tempEmpleados = empleados;
        //Se utiliza el método splice() para eliminar un elemento del array tempEmpleados en la posición userIndex, utilizando 1 como segundo parámetro para indicar que se eliminará solo un elemento. Finalmente, se asigna tempEmpleados nuevamente a empleados, lo que actualiza el array original con el elemento eliminado.
        tempEmpleados.splice(userIndex, 1);
        empleados = tempEmpleados;
        getTotalSueldoPagar();
    };
</script>

<!-- ESTRUCTURA -->
{#if !selectedDni}
    <form on:submit|preventDefault={addEmpleado}>
        <div>
            <label for="">Nombre:</label>
            <input
                type="text"
                placeholder="Nombre"
                bind:value={empleadosForm.nombre}
            />
        </div>
        <div>
            <label for="">Apellido:</label>
            <input
                type="text"
                placeholder="Apellido"
                bind:value={empleadosForm.apellido}
            />
        </div>
        <div>
            <label for="">DNI:</label>
            <input
                type="tel"
                placeholder="7895****"
                bind:value={empleadosForm.dni}
            />
        </div>
        <div>
            <label for="">Celular:</label>
            <input
                type="tel"
                placeholder="999******"
                bind:value={empleadosForm.celular}
            />
        </div>
        <div>
            <label for="">Turno a trabajar:</label>
            <select bind:value={empleadosForm.turno}>
                <option selected disabled value=""
                    >--Seleciona un turno--</option
                >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
            </select>
        </div>
        <div>
            <label for="">Sueldo: </label>
            <input
                type="number"
                placeholder="S/.1035.00"
                bind:value={empleadosForm.sueldo}
            />
        </div>
        <div class="flex-derecha">
            <button type="submit">ADD Nuevo Empleado</button>
        </div>
    </form>
{/if}

{#if selectedDni}
    <EditUserModal {editUser} dni={selectedDni} />
{/if}

{#if empleados.length}
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dni</th>
                <th>Celular</th>
                <th>Turno</th>
                <th>Sueldo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each empleados as empleado}
                <tr>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellido}</td>
                    <td>{empleado.dni}</td>
                    <td>{empleado.celular}</td>
                    <td>{empleado.turno}</td>
                    <td>{empleado.sueldo}</td>
                    <button
                        type="button"
                        on:click={() => openModal(empleado.dni)}>Editar</button
                    >
                    <button
                        type="button"
                        on:click={() => deleteUser(empleado.dni)}
                        >Eliminar</button
                    >
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td>***</td>
                <td>***</td>
                <td>***</td>
                <td>***</td>
                <td>***</td>
                {#if empleados.length}
                    <td>Sueldos Total a Pagar: {totalSueldoPagar}</td>
                {:else}
                    <td>Sueldos Total a Pagar: 0</td>
                {/if}
            </tr>
        </tfoot>
    </table>
{/if}

<style>
    @media (min-width: 768px) {
        div:nth-child(7) {
            grid-column: 2 / 3;
            padding-top: 15px;
        }
    }
</style>
