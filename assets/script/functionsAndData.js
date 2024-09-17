export const urlBase = "https://swapi.dev/api/people/";

export let template;
if ("content" in document.createElement("template")) {
  //Revisa si el navegador soporta la etiqueta template
  template = document.querySelector("#characterCard");
} else {
  //el 96,4% de los navegadores actuales lo soportan, no aplicare retrocompatibilidad.
}

export let sections = {
  "first-group": {
    firstId: 1,
    lastId: 5,
  },
  "second-group": {
    firstId: 6,
    lastId: 10,
  },
  "third-group": {
    firstId: 11,
    lastId: 15,
  },
  "fourth-group": {
    firstId: 16,
    lastId: 20,
  },
};

export function* counter(from, until) {
  let i = from;
  for (i; i <= until; i++) {
    yield i;
  }
  return "end"
}

for (let section in sections) {
  sections[section].counter = counter(
    sections[section].firstId,
    sections[section].lastId
  );
}

export function ready(aFunction) {
  if (document.readyState !== "loading") {
    aFunction();
  } else {
    document.addEventListener("DOMContentLoaded", aFunction);
  }
}