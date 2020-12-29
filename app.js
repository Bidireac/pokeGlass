const body = document.querySelector(".body");
const button = document.querySelector(".btn");

async function displayPokemons() {
  const pokemon = [];

  for (let i = 0; i < 2; i++) {
    if (i === 1) {
      let pokeCall = document.createElement("div");
      pokeCall.classList.add("pokeCall");
      pokeCall.append(button);
      button.innerHTML = `
        <img src="img/pokeExchange.svg" alt="">
      `;
      button.style.display = "flex";
      body.append(pokeCall);
    }
    let pokeCatch = Math.floor(Math.random() * 893) + 1;
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeCatch}/`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let pokeContainer = document.createElement("div");
        pokeContainer.classList.add("pokemon-container");
        let containerID = `containerID-${pokeCatch}`;
        pokeContainer.classList.add(`${containerID}`);
        pokemon.push(pokeContainer);
        let pokemonName = result.name.toUpperCase();
        pokemon[i].innerHTML = `
        <div class="pokemon-card pokemonID-${pokeCatch}">
          <div class="pokemon-image">
            <div class="pokemon-circle pokemon-circle${pokeCatch}"></div>
            <img class="pokeSprite${pokeCatch}" src="${result.sprites.other["official-artwork"].front_default}" alt="" />
          </div>
          <div class="pokemon-info">
            <h1 class="pokemon-name pokeName${pokeCatch}">${pokemonName}</h1>
            <div class="pokemon-stats pokemonStats${pokeCatch}">
              <div>
                <h1>Attack: </h1>
                <div class="div-attack">
                  <h3>${result.stats[1].base_stat}</h3>
                </div>
              </div>
              <div>
                <h1>Defense: </h1>
                <div class="div-defense">
                  <h3>${result.stats[2].base_stat}</h3>
                </div>
              </div>
              <div>
                <h1>Health Points: </h1>
                <div class="div-health">
                  <h3>${result.stats[0].base_stat}</h3>
                </div>
              </div>
              <div>
                <h1>Attack-Speed: </h1>
                <div class="div-speed">
                  <h3>${result.stats[5].base_stat}</h3>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        `;

        body.append(pokeContainer);

        // Pokemon Animation
        const pokemonContainer = document.querySelector(
          `.containerID-${pokeCatch}`
        );
        const pokeCard = document.querySelector(`.pokemonID-${pokeCatch}`);
        const pokeSprite = document.querySelector(`.pokeSprite${pokeCatch}`);
        const pokeName = document.querySelector(`.pokeName${pokeCatch}`);
        const pokeStats = document.querySelector(`.pokemonStats${pokeCatch}`);

        // Moving Animation Event
        pokemonContainer.addEventListener("mousemove", (e) => {
          if (i === 0) {
            let xAxis = (window.innerWidth / 3 - e.pageX) / 20;
            let yAxis = (window.innerHeight / 4 - e.pageY) / 20;
            pokeCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
          }
          if (i === 1) {
            let xAxis = (window.innerWidth / 1.5 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 4 - e.pageY) / 25;
            pokeCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
          }
        });
        // Animate In
        pokemonContainer.addEventListener("mouseenter", (e) => {
          pokeCard.style.transition = "none";
          // Popout
          pokeName.style.transform = "translateZ(9rem)";
          pokeSprite.style.transform = "translateZ(16rem) rotateZ(4deg)";
          pokeStats.style.transform = "translateZ(7rem)";
        });

        // Animate Out
        pokemonContainer.addEventListener("mouseleave", (e) => {
          pokeCard.style.transition = "all 0.5s ease";
          pokeCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
          //  Popback
          pokeName.style.transform = "translateZ(0rem)";
          pokeSprite.style.transform = "translateZ(0rem) rotateZ(0deg)";
          pokeStats.style.transform = "translateZ(0rem)";
        });
      });
  }
  // Comparing them
  pokemonComparison(pokemon);
}

function pokemonComparison(pokemon) {
  const pokemons = {};
  for (let i = 0; i < 2; i++) {
    pokemons["attack" + i] = pokemon[i].querySelector(
      ".div-attack h3"
    ).innerHTML;
    pokemons["defense" + i] = pokemon[i].querySelector(
      ".div-defense h3"
    ).innerHTML;
    pokemons["health" + i] = pokemon[i].querySelector(
      ".div-health h3"
    ).innerHTML;
    pokemons["speed" + i] = pokemon[i].querySelector(".div-speed h3").innerHTML;
  }

  // Changing the colors of the stats
  if (parseInt(pokemons["attack0"]) > parseInt(pokemons["attack1"])) {
    pokemon[0].querySelector(".div-attack h3").style.color = "rgb(15, 100, 50)";
    pokemon[1].querySelector(".div-attack h3").style.color = "rgb(255, 25, 25)";
  } else if (parseInt(pokemons["attack0"]) < parseInt(pokemons["attack1"])) {
    pokemon[0].querySelector(".div-attack h3").style.color = "rgb(255, 25, 25)";
    pokemon[1].querySelector(".div-attack h3").style.color = "rgb(15, 100, 50)";
  }
  if (parseInt(pokemons["defense0"]) > parseInt(pokemons["defense1"])) {
    pokemon[0].querySelector(".div-defense h3").style.color =
      "rgb(15, 100, 50)";
    pokemon[1].querySelector(".div-defense h3").style.color =
      "rgb(255, 25, 25)";
  } else if (parseInt(pokemons["defense0"]) < parseInt(pokemons["defense1"])) {
    pokemon[0].querySelector(".div-defense h3").style.color =
      "rgb(255, 25, 25)";
    pokemon[1].querySelector(".div-defense h3").style.color =
      "rgb(15, 100, 50)";
  }
  if (parseInt(pokemons["health0"]) > parseInt(pokemons["health1"])) {
    pokemon[0].querySelector(".div-health h3").style.color = "rgb(15, 100, 50)";
    pokemon[1].querySelector(".div-health h3").style.color = "rgb(255, 25, 25)";
  } else if (parseInt(pokemons["health0"]) < parseInt(pokemons["health1"])) {
    pokemon[0].querySelector(".div-health h3").style.color = "rgb(255, 25, 25)";
    pokemon[1].querySelector(".div-health h3").style.color = "rgb(15, 100, 50)";
  }
  if (parseInt(pokemons["speed0"]) > parseInt(pokemons["speed1"])) {
    pokemon[0].querySelector(".div-speed h3").style.color = "rgb(15, 100, 50)";
    pokemon[1].querySelector(".div-speed h3").style.color = "rgb(255, 25, 25)";
  } else if (parseInt(pokemons["speed0"]) < parseInt(pokemons["speed1"])) {
    pokemon[0].querySelector(".div-speed h3").style.color = "rgb(255, 25, 25)";
    pokemon[1].querySelector(".div-speed h3").style.color = "rgb(15, 100, 50)";
  }
}

displayPokemons();

button.addEventListener("click", () => {
  body.innerHTML = "";
  displayPokemons();
});
