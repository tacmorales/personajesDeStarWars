import { urlBase, template, sections, ready } from "./functionsAndData.js";

ready(() => {
  const show1Character = async (e) => {
    const mainCard = e.target;
    //Selecciona la fila donde se coloca el personaje y se captura el id de este grupo
    const groupName = mainCard.parentNode.parentNode.id;
    //Se ocupa el nombre de este grupo como llave dentro del objeto sections
    const section = sections[groupName];
    //para ejecutar el contador anteriormente guardado en cada sección.
    const count = section.counter.next();
    //Verifica si ya termino el conteo. Si termino, devuelve la función para que no se ejecute nada más!
    if (count.done) {
      return;
    }
    mainCard.querySelector(".circle-inside").classList.add("loading");

    //Guarda el id del personaje a consultar.
    const characterId = count.value;

    //inicializacion de variable donde se guardará el personaje en Json
    let character;
    try {
      const answer = await fetch(`${urlBase}${characterId}`);
      if (!answer?.ok) {
        throw new Error(`Al consultar el Id ${characterId} la respuesta devolvió el estado ${answer.status}`);
      }
      //Se captura al personaje si no hay problema con la consulta fetch
      character = await answer.json();
    } catch (error) {
      //Se muestra el error que podria ocurrir
      console.log(`${error}`);
      //Declarativamente se indica que no hay personaje
      character = null;
    }

    //Selecciona la fila donde se coloca el personaje y se captura el id de este grupo
    const row = e.target.parentNode;
    //Se hace una copia del template de "character card" o tarjeta de personaje
    const clone = template.content.cloneNode(true);
    //Se coloca el Id en el circulo
    clone.querySelector(".circle-inside").textContent = characterId;

    //Si el personaje existe
    if (character) {
      let characterName = character.name;
      let characterMeasurements = `Altura: ${character.height}cm Peso: ${character.mass.replace(",", ".")}kg `;
      //En el titulo el nombre del personaje y en el parrafo las medidas del personaje.
      clone.querySelector("h3").textContent = characterName;
      clone.querySelector("p").textContent = characterMeasurements;
    } else {
      // Si el personaje es null, por algun error
      // En el titulo el nombre del personaje y en el parrafo las medidas del personaje.
      clone.querySelector("h3").textContent = "Error";
      clone.querySelector("p").textContent =
        "Ver la consola para averiguar el error.";
      //lo pinta distinto para resaltar que es un error
      clone.children[0].classList.add("error");
    }

    //Lo coloca en la fila.
    let newCard = clone.children[0]
    row.append(clone);
    newCard.animate(
      [
        { opacity: "0" , transform: "scale(0)"},
        { opacity: "1" , transform: "scale(1)"},
      ],
      {
        duration: 200,
      }
    );

    mainCard.querySelector(".circle-inside").classList.remove("loading");
    if (count.value === section.lastId) {
      mainCard.querySelector(".circle-inside").textContent = "✓";
      mainCard.querySelector("h2").textContent = "Todos...";
      mainCard.querySelector("p").textContent =
        "los personajes de esta sección ya han sido desplegados.";
    }
  };

  document
    .querySelectorAll(".main-card")
    .forEach((card) => card.addEventListener("mouseenter", show1Character));
});
