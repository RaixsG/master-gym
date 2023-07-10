<script>
  let productos = [];

  let productForm = {
    tipo: "--Seleccione un tipo de producto--",
    marca: "--Seleccione una marca--",
    cantidad: "",
    precio: "",
    nombre: "",
    apellido: "",
    dni: "",
    celular: "",
    fechaVenta: "",
  };

  const cleanForm = () => {
    productForm = {
      tipo: "--Seleccione un tipo de producto--",
      marca: "--Seleccione una marca--",
      cantidad: "",
      precio: "",
      nombre: "",
      apellido: "",
      dni: "",
      celular: "",
      fechaVenta: "",
    };
  };

  // SUMA DE CANTIDAD
  let sumaCantidad = 0;
  const getTotal = () => {
    sumaCantidad = 0;
    if (productos.length) {
      productos.forEach((venta) => {
        sumaCantidad = sumaCantidad + Number(venta.cantidad);
      });
    }
  };

  // SUMA DE PRECIO TOTAL VENDIDO
  let sumaVentaTotal = 0;
  const getSumaPrecioTotalVendido = () => {
    sumaVentaTotal = 0;
    if (productos.length) {
      productos.forEach((venta) => {
        sumaVentaTotal =
          sumaVentaTotal + Number(venta.cantidad) * Number(venta.precio);
      });
    }
  };

  // FECHA DE VENTA
  let fechaActual = new Date();

  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() + 1;//los meses en JS empiezan desde 0
  let año = fechaActual.getFullYear();
  
  let fechaFormateada = año + "-" + mes + "-" + dia;

  //ADD USUARIO
  const productAdd = () => {
    const productAlreadyRegistered = productos.findIndex(
      (persona) => persona.dni === productForm.dni
    );
    if (productAlreadyRegistered === -1) {
      // Forma de concatenar con spread operator: productos = [ ...productos, { ...userForm } ];
      productos = productos.concat({ ...productForm });
      cleanForm();
      getTotal();
      getSumaPrecioTotalVendido();
      return;
    }
    alert(
      `Error, el usuario con el dni ${productForm.dni} ya se encuentra registrado`
    );
  };

  const deleteUser = (dni) => {
    const userIndex = productos.findIndex((venta) => venta.dni === dni);
    if (productos.length === 1) {
      productos = [];
      return;
    }
    let tempPersonas = productos;
    tempPersonas.splice(userIndex, 1);
    productos = tempPersonas;
    getTotal();
    getSumaPrecioTotalVendido();
  };
</script>

<form on:submit|preventDefault={productAdd}>
  <div>
    <label for="type-input">Tipo de Producto</label>
    <select id="type-input" bind:value={productForm.tipo}>
      <option selected disabled>--Seleccione un tipo de producto--</option>
      <option value="Proteínas">Proteínas</option>
      <option value="Vitaminas">Vitaminas</option>
    </select>
  </div>
  {#if productForm.tipo !== "--Seleccione un tipo de producto--"}
    <div>
      <label for="marca-input">{`Marca de ${productForm.tipo}`}</label>
      <select id="marca-input" bind:value={productForm.marca}>
        <option selected disabled>--Seleccione una marca--</option>
        {#if productForm.tipo === "Proteínas"}
          <option value="Proteína 1">Proteína 1</option>
          <option value="Proteína 2">Proteína 2</option>
        {/if}
        {#if productForm.tipo === "Vitaminas"}
          <option value="Vitamina 1">Vitamina 1</option>
          <option value="Vitamina 2">Vitamina 2</option>
        {/if}
      </select>
    </div>
  {/if}
  <div>
    <label for="">Cantidad de Productos</label>
    <input
      type="number"
      placeholder="*1*"
      min="0"
      bind:value={productForm.cantidad}
    />
  </div>
  <div>
    <label for="">Precio Proteinas S/.</label>
    <input
      type="number"
      placeholder="S/. 00.00"
      min="0"
      bind:value={productForm.precio}
    />
  </div>
  <div>
    <label for="">Nombre:</label>
    <input
      required
      type="text"
      placeholder="Nombre"
      bind:value={productForm.nombre}
    />
  </div>
  <div>
    <label for="">Apellido:</label>
    <input
      required
      type="text"
      placeholder="Apellido"
      bind:value={productForm.apellido}
    />
  </div>
  <div>
    <label for="">DNI</label>
    <input
      required
      type="tel"
      placeholder="7654****"
      bind:value={productForm.dni}
    />
  </div>
  <div>
    <label for="">Celular</label>
    <input
      required
      type="tel"
      placeholder="999******"
      bind:value={productForm.celular}
    />
  </div>
  <div>
    <button class="flex-derecha" type="submit">Vender Producto</button>
  </div>
</form>

{#if productos.length}
  <table>
    <thead>
      <tr>
        <th>Tipo</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>DNI</th>
        <th>Celular</th>
        <th>Total</th>
        <th>Fecha de Venta</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each productos as venta}
        <tr>
          <td>{venta.tipo}</td>
          <td>{venta.cantidad}</td>
          <td>{venta.precio}</td>
          <td>{venta.nombre}</td>
          <td>{venta.apellido}</td>
          <td>{venta.dni}</td>
          <td>{venta.celular}</td>
          <td>{venta.cantidad * venta.precio}</td>
          <td>{fechaFormateada}</td>

          <button type="button" on:click={() => deleteUser(venta.dni)}>
            Eliminar
          </button>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <td>***</td>
        <!-- CANTIDAD -->
        {#if productos.length}
          <td>Cantidad Total: {sumaCantidad}</td>
        {:else}
          <td>Cantidad Total: 0</td>
        {/if}
        <td>***</td>
        <td>***</td>
        <td>***</td>
        <td>***</td>
        <td>***</td>
        {#if productos.length}
          <td>Venta Total: {sumaVentaTotal}</td>
        {:else}
          <td>Venta Total: 0</td>
        {/if}
        <td>***</td>
      </tr>
    </tfoot>
  </table>
{/if}

<style>
  @media (min-width: 768px) {
    div:nth-child(8) {
      grid-column: 2 / 3;
      padding-top: 15px;
    }
    div:nth-child(9) {
      grid-column: 2 / 3;
      padding-top: 15px;
    }
  }
</style>
