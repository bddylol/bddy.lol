// place files you want to import through the `$lib` alias in this folder.

import { writable } from 'svelte/store';

const mobileMenuShownRoot = writable(false);

export { mobileMenuShownRoot };
