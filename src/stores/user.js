import { writable } from "svelte/store";

//USUARIO CREADO
const createUser = () => {
    const { subscribe, set } = writable(null)

    return {
        subscribe,
        setUser: (user) => {
            set(user);
        }
    }
}

export const user = createUser();