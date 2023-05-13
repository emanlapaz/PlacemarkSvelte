import {writable} from "svelte/store";

export const user = writable({
  firstName: "",
  lastName: "",
  email: "",
  token: "",
});

// added firstName and lastName. not working