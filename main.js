import data from "./pokedex.json" assert { type: "json" };

let pokemon_menu_div = document.getElementById("pokemon_menu_div");
let gray_screen_div = document.getElementById("grayscreen")

let loadMoreButton = document.getElementById("loadMore");
loadMoreButton.addEventListener('click', generateAnother12Pokemon)

gray_screen_div.addEventListener("click", function(event) {
    if (!event.target.closest("#pokemon_descreption")) {
      gray_screen_div.style.display = "none"
      document.getElementById("pokemon_descreption").innerHTML = ""
    }
  });


let amountOfPokemonOnScreen = 0;

let typeColors = {
    "normal":'#A8A77A',
    "fire":'#EE8130',
    "water":'#6390F0',
    "electric":'#F7D02C',
    "grass":'#7AC74C',
    "ice":'#96D9D6',
    "fighting":'#C22E28',
    "poison":'#A33EA1',
    "ground":'#E2BF65',
    "flying":'#A98FF3',
    "psychic":'#F95587',
    "bug":'#A6B91A',
    "rock":'#B6A136',
    "ghost":'#735797',
    "dragon":'#6F35FC',
    "dark":'#705746',
    "steel":'#B7B7CE',
    "fairy":'#D685AD'
}

function formatId(id){
id = id.toString()
if (id.length === 1){
    return `#00${id}`
}
else if (id.length === 2){
    return `#0${id}`
}
else{
    return `#${id}`
}
}

function generateAnother12Pokemon(){
for (let i = amountOfPokemonOnScreen ; i<(amountOfPokemonOnScreen+12) ; i++){
    let msg = document.createElement(`div`);
    msg.innerHTML =  `<p>${formatId(data[i]["id"])}</p><img src='${data[i]["image"]["thumbnail"]}'/><p>${data[i]["name"]["english"]}</p>`
    msg.addEventListener(`click`,() => {
        pokemonDescrption(data[i])
        gray_screen_div.style.display = "flex"
    })
    pokemon_menu_div.appendChild(msg);

    // let msg = `<div id="pokemon_${data[i]["id"]}"><p>${formatId(data[i]["id"])}</p><img src='${data[i]["image"]["thumbnail"]}'/><p>${data[i]["name"]["english"]}</p></div>` 
    // pokemon_menu_div.innerHTML += msg ;

}
amountOfPokemonOnScreen += 12;
}


function pokemonDescrption(pokemon){
    let msg = `
    <div id="left_side_pokemon_description">
    <p>${formatId(pokemon["id"])}</p>
    <img src=${pokemon["image"]["thumbnail"]}>
    <p id="left_side_pokemon_description_name">${pokemon["name"]["english"]}</p>
    <div id="type_lables">
    `;

    for (let i = 0 ; i<pokemon["type"].length;i++ ){
        let color = typeColors[pokemon["type"][i].toLowerCase()]
        msg += `<button style="background-color:${color};">${pokemon["type"][i]}</button>`
    }

    msg += `</div>
    </div>
    <div id="right_side_pokemon_description">
    <section>
    <p class="descrip_title">Descrption</p><br>
    <p>${pokemon["description"]}</p>
    </section>
    <div>
    <p class="descrip_title">Stats</p><br>`
    
    let total_stats = 0;
    for (let i of ["HP","Attack","Defense","Sp. Attack","Sp. Defense","Speed"]){
        total_stats += pokemon["base"][i];
    }

    msg+= `
    <section id="stats_table">
            <p>HP: ${pokemon["base"]["HP"]}<br>Attack: ${pokemon["base"]["Attack"]}<br>Defense: ${pokemon["base"]["Defense"]}</p>
            <p>Special Atk: ${pokemon["base"]["Sp. Attack"]}<br>Special Def: ${pokemon["base"]["Sp. Defense"]}<br>Speed: ${pokemon["base"]["Speed"]}</p>
            <p>Total: ${total_stats}</p>
        </section>
    </div>
    
    `

    document.getElementById("pokemon_descreption").innerHTML += msg
}

generateAnother12Pokemon()


