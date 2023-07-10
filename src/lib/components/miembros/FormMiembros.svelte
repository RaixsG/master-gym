<script>
  import EditUserModal from "./EditMiembrosForm.svelte";

  // EDIT USE MODAL STATES
  let selectedDni = null;

  // PERSONAS DATA
  let personas = [];

  //? FORM LOGIC
  let miembrosForm = {
    nombre: "",
    apellido: "",
    dni: "",
    celular: "",
    turno: "",
    mensualidad: "",
    fechaInicio: "",
    fechaFinal: "",
  };

  //Total mensualidad
  let total = 0;
  const getTotal = () => {
    total = 0;
    if (personas.length) {
      personas.forEach((persona) => {
        total = total + Number(persona.mensualidad);
      });
    }
  };

  //Clear Form
  const cleanForm = () => {
    miembrosForm = {
      nombre: "",
      apellido: "",
      dni: "",
      celular: "",
      turno: "",
      mensualidad: "",
      fechaInicio: "",
      fechaFinal: "",
    };
  };

  // PERSONAS CRUD FUNCTIONS
  const addUser = () => {
    const userAlreadyRegistered = personas.findIndex(
      (persona) => persona.dni === miembrosForm.dni
    );
    if (userAlreadyRegistered === -1) {
      // Forma de concatenar con spread operator: personas = [ ...personas, { ...miembrosForm } ];
      personas = personas.concat({ ...miembrosForm });
      cleanForm();
      getTotal();
      return;
    }
    alert(
      `Error, el usuario con el dni ${miembrosForm.dni} ya se encuentra registrado`
    );
  };

  const openModal = (dni) => {
    selectedDni = dni;
  };

  const editUser = (dni, newData) => {
    const userIndex = personas.findIndex((persona) => persona.dni === dni);
    let tempPersonas = personas;
    tempPersonas.splice(userIndex, 1, { ...newData });
    personas = tempPersonas;
    selectedDni = null;
    getTotal();
  };

  const deleteUser = (dni) => {
    const userIndex = personas.findIndex((persona) => persona.dni === dni);
    if (personas.length === 1) {
      personas = [];
      return;
    }
    let tempPersonas = personas;
    tempPersonas.splice(userIndex, 1);
    personas = tempPersonas;
    getTotal();
  };
</script>

<!-- ESTRUCTURA -->
{#if !selectedDni}
  <form on:submit|preventDefault={addUser}>
    <div>
      <label for="">Nombre:</label>
      <input
        required
        type="text"
        placeholder="Nombre"
        bind:value={miembrosForm.nombre}
      />
    </div>

    <div>
      <label for="">Apellido:</label>
      <input
        required
        type="text"
        placeholder="Apellido"
        bind:value={miembrosForm.apellido}
      />
    </div>

    <div>
      <label for="">DNI:</label>
      <input
        required
        type="tel"
        placeholder="7654****"
        bind:value={miembrosForm.dni}
      />
    </div>

    <div>
      <label for="">Celular:</label>
      <input
        required
        type="tel"
        placeholder="999******"
        bind:value={miembrosForm.celular}
      />
    </div>

    <div>
      <label for="">Turno</label>
      <select bind:value={miembrosForm.turno}>
        <option selected disabled value="">--Seleciona un horario--</option>
        <option value="Mañana">Mañana</option>
        <option value="Tarde">Tarde</option>
        <option value="Noche">Noche</option>
      </select>
    </div>

    <div>
      <label for="">Fecha de Inicio</label>
      <input type="date" bind:value={miembrosForm.fechaInicio} />
    </div>

    <div>
      <label for="">Fecha Final</label>
      <input type="date" bind:value={miembrosForm.fechaFinal} />
    </div>

    <div>
      <label for="">Mensualidad:</label>
      <input
        type="tel"
        placeholder="S/. 100.00"
        bind:value={miembrosForm.mensualidad}
      />
    </div>
    <div class="flex-derecha">
      <button type="submit">Agregar Cliente</button>
    </div>
  </form>
{/if}

{#if selectedDni}
  <EditUserModal {editUser} dni={selectedDni} />
{/if}

{#if personas.length}
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>DNI</th>
        <th>Celular</th>
        <th>Turno</th>
        <th>Fecha de Inicio</th>
        <th>Fecha Final</th>
        <th>Mensualidad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each personas as persona}
        <tr>
          <td>{persona.nombre}</td>
          <td>{persona.apellido}</td>
          <td>{persona.dni}</td>
          <td>{persona.celular}</td>
          <td>{persona.turno}</td>
          <td>{persona.fechaInicio}</td>
          <td>{persona.fechaFinal}</td>
          <td>{persona.mensualidad}</td>

          <button type="button" on:click={() => openModal(persona.dni)}>
            Editar
          </button>
          <button type="button" on:click={() => deleteUser(persona.dni)}>
            Eliminar
          </button>
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
        <td>***</td>
        <td>***</td>
        {#if personas.length}
          <td>Total: {total}</td>
        {:else}
          <td>Total: 0</td>
        {/if}
        <td>***</td>
      </tr>
    </tfoot>
  </table>
{/if}

<!-- ESTILOS -->
<style>
  @media (max-width: 767px) {
    .flex-derecha button {
      width: 70%;
    }
  }

  @media (min-width: 768px) {
    div:nth-child(9) {
      grid-column: 2 / 3;
      padding-top: 15px;
    }
  }
</style>
