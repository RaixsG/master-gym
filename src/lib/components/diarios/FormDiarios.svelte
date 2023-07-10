<script>
    // CLIENT DIARIOS DATA
    let diarios = [];

    // FORM LOGIC
    let diariosForm = {
        nombre: "",
        celular: "",
        turno: "",
        precio: "",
        fechaIngresada: "",
    };

    // SUMA PRECIOS
    let sumaTotalPrecios = 0;
    const getTotalPrecios = () => {
        sumaTotalPrecios = 0;
        if (diarios.length) {
            diarios.forEach((diario) => {
                sumaTotalPrecios = sumaTotalPrecios + Number(diario.precio);
            });
        }
    };

    // LIMPIAR INPUTS
    const cleanForm = () => {
        diariosForm = {
            nombre: "",
            celular: "",
            turno: "",
            precio: "",
            fechaIngresada: "",
        };
    };

    const addDiarios = () => {
        diarios = diarios.concat({ ...diariosForm });
        cleanForm();
        getTotalPrecios();
        return;
    };
</script>

<form on:submit|preventDefault={addDiarios}>
    <div>
        <label for="">Nombre:</label>
        <input
            type="text"
            placeholder="Nombre"
            bind:value={diariosForm.nombre}
        />
    </div>
    <div>
        <label for="">Celular:</label>
        <input
            type="tel"
            placeholder="999******"
            bind:value={diariosForm.celular}
        />
    </div>
    <div>
        <label for="">Turno Elegido:</label>
        <select bind:value={diariosForm.turno}>
            <option selected disabled value="">--Seleciona un turno--</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
        </select>
    </div>
    <div>
        <label for="">Fecha Ingresada:</label>
        <input type="date" bind:value={diariosForm.fechaIngresada} />
    </div>
    <div>
        <label for="">Precio: </label>
        <input
            type="number"
            placeholder="S/. 00.00"
            bind:value={diariosForm.precio}
        />
    </div>
    <div class="flex-derecha">
        <button type="submit">Agregar Cliente</button>
    </div>
</form>
{#if diarios.length}
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Celular</th>
                <th>Turno</th>
                <th>Precio</th>
                <th>Fecha Ingresada</th>
            </tr>
        </thead>
        <tbody>
            {#each diarios as diario}
                <tr>
                    <td>{diario.nombre}</td>
                    <td>{diario.celular}</td>
                    <td>{diario.turno}</td>
                    <td>{diario.precio}</td>
                    <td>{diario.fechaIngresada}</td>
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td>***</td>
                <td>***</td>
                <td>***</td>
                {#if diarios.length}
                    <td>Total: {sumaTotalPrecios}</td>
                {:else}
                    <td>Total: 0</td>
                {/if}
                <td>***</td>
            </tr>
        </tfoot>
    </table>
{/if}

<style>
    @media (max-width: 767px) {
        .flex-derecha button {
            width: 70%;
        }
    }

    @media (min-width: 768px) {
        div:nth-child(6) {
            grid-column: 2 / 3;
            padding-top: 15px;
        }
    }
</style>
