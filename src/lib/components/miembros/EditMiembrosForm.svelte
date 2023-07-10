<script>
  //? PROPS
  export let editUser;
  export let dni;

  //? FORM LOGIC
  let miembrosEditForm = {
    dni,
    nombre: "",
    apellido: "",
    celular: "",
    turno: "",
    mensualidad: "",
    fechaInicio: "",
    fechaFinal: "",
  };

  const cleanForm = () => {
    miembrosEditForm = {
      nombre: "",
      apellido: "",
      dni,
      celular: "",
      turno: "",
      mensualidad: "",
      fechaInicio: "",
      fechaFinal: "",
    };
  };

  const sendUpdate = () => {
    editUser(dni, miembrosEditForm);
    cleanForm();
  };
</script>

<form on:submit|preventDefault={sendUpdate}>
  <div>
    <label for="">Nombre</label>
    <input
      required
      type="text"
      placeholder="Nombre"
      bind:value={miembrosEditForm.nombre}
    />
  </div>

  <div>
    <label for="">Apellido</label>
    <input
      required
      type="text"
      placeholder="Apellido"
      bind:value={miembrosEditForm.apellido}
    />
  </div>

  <div>
    <label for="">Celular</label>
    <input
      required
      type="tel"
      placeholder="999******"
      bind:value={miembrosEditForm.celular}
    />
  </div>

  <div>
    <label for="">Turno</label>
    <select bind:value={miembrosEditForm.turno}>
      <option selected disabled value="">--Seleciona un horario--</option>
      <option value="Mañana">Mañana</option>
      <option value="Tarde">Tarde</option>
      <option value="Noche">Noche</option>
    </select>
  </div>

  <div>
    <label for="">Fecha de Inicio</label>
    <input type="date" bind:value={miembrosEditForm.fechaInicio} />
  </div>

  <div>
    <label for="">Fecha Final</label>
    <input type="date" bind:value={miembrosEditForm.fechaFinal} />
  </div>

  <div>
    <label for="">Mensualidad</label>
    <input
      type="tel"
      placeholder="S/. 100.00"
      bind:value={miembrosEditForm.mensualidad}
    />
  </div>

  <div>
    <button type="submit">Guardar cambios</button>
  </div>
</form>

<style>
  /* SMALL */
  @media (max-width: 767px) {
    form {
      display: flex;
      flex-direction: column;
    }
  }

  /* BIG */
  @media (min-width: 768px) {
    div:nth-child(8) {
      padding-top: 15px;
      justify-items: center;
    }
  }
</style>
