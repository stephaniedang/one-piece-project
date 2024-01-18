import { writable } from "svelte/store";

export let tooltip = writable({
  visible: false,
  content: '',
  x: 0,
  y: 0,
})