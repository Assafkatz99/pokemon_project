import data from "./pokedex.json" assert { type: "json" };

let pokemon_menu_div = document.getElementById("pokemon_menu_div");
let gray_screen_div = document.getElementById("grayscreen")
let pokemon_descreption_div = document.getElementById("pokemon_descreption")

let heart_unliked_src = "./images/heart-unliked.png"
let heart_liked_src = "./images/heart-liked.png"

let liked_pokemons_list = []


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

function generateLikedPokemons(){
liked_pokemons_list = JSON.parse(localStorage.getItem("Liked_pokemons"))
pokemon_menu_div.replaceChildren()

for (let i of liked_pokemons_list){
    let pokemon_card = document.createElement(`div`);
    pokemon_card.innerHTML =  `<p>${formatId(data[i]["id"])}</p><img src='${data[i]["image"]["thumbnail"]}'/><p>${data[i]["name"]["english"]}</p>`
    pokemon_card.addEventListener(`click`,() => {
        pokemonDescrption(data[i])
        gray_screen_div.style.display = "flex"
    })
    pokemon_menu_div.appendChild(pokemon_card);
}
}


function pokemonDescrption(pokemon){

    // ########## SETTING ELEMENTS  ##########

    let left_side_pokemon_description_div = document.createElement("div");
    let pokemon_id_p = document.createElement("p")
    let pokemon_pic_img = document.createElement("img")
    let left_side_pokemon_description_name_p = document.createElement("p")
    let type_lables_div = document.createElement("div");

    let right_side_pokemon_description_div = document.createElement("div");
    let section_right_side = document.createElement("section");
    let descrip_title_p = document.createElement("p")
    let descrip_p = document.createElement("p")
    let stat_title_p = document.createElement("p")
    let stats_section = document.createElement("section");

    let like_button_img = document.createElement("img")

    // ########## GIVING PROPERTIES TO ELEMENTS  ##########

    left_side_pokemon_description_div.id = "left_side_pokemon_description"
    pokemon_id_p.innerHTML = `${formatId(pokemon["id"])}`;
    pokemon_pic_img.setAttribute("src", `${pokemon["image"]["thumbnail"]}`)
    left_side_pokemon_description_name_p.id = "left_side_pokemon_description_name"
    left_side_pokemon_description_name_p.innerHTML = `${pokemon["name"]["english"]}`
    type_lables_div.id = "type_lables";

    right_side_pokemon_description_div.id = "right_side_pokemon_description"
    descrip_title_p.innerHTML = "Descrption" 
    descrip_title_p.classList.add("descrip_title")   
    descrip_p.innerHTML = pokemon["description"]
    stat_title_p.classList.add("descrip_title")
    stat_title_p.innerHTML = "Stats"
    stats_section.id = "stats_table"

    like_button_img.id = "like_button"
    like_button_img.setAttribute("src", `${heart_unliked_src}`)

    for (let i = 0 ; i<pokemon["type"].length;i++ ){
        let color = typeColors[pokemon["type"][i].toLowerCase()]
        let button = document.createElement("button")
        button.style.backgroundColor = color
        button.innerHTML = pokemon["type"][i]
        type_lables_div.appendChild(button)
    }

    let total_stats = 0;
    for (let i of ["HP","Attack","Defense","Sp. Attack","Sp. Defense","Speed"]){
        total_stats += pokemon["base"][i];
    }

    stats_section.innerHTML = `
    <section id="stats_table">
        <p>HP: ${pokemon["base"]["HP"]}<br>Attack: ${pokemon["base"]["Attack"]}<br>Defense: ${pokemon["base"]["Defense"]}</p>
        <p>Special Atk: ${pokemon["base"]["Sp. Attack"]}<br>Special Def: ${pokemon["base"]["Sp. Defense"]}<br>Speed: ${pokemon["base"]["Speed"]}</p>
        <p>Total: ${total_stats}</p>
    </section> `

     

    // ########## APPENDINGS  ##########

    left_side_pokemon_description_div.appendChild(pokemon_id_p)
    left_side_pokemon_description_div.appendChild(pokemon_pic_img)
    left_side_pokemon_description_div.appendChild(left_side_pokemon_description_name_p)
    left_side_pokemon_description_div.appendChild(type_lables_div)

    right_side_pokemon_description_div.appendChild(section_right_side)
    right_side_pokemon_description_div.appendChild(descrip_title_p)
    right_side_pokemon_description_div.appendChild(descrip_p)
    right_side_pokemon_description_div.appendChild(stat_title_p)
    right_side_pokemon_description_div.appendChild(stats_section)

    pokemon_descreption_div.appendChild(left_side_pokemon_description_div)
    pokemon_descreption_div.appendChild(right_side_pokemon_description_div)
    pokemon_descreption_div.appendChild(like_button_img)
    

    // ########## HEART BUTTON INITIAL LOAD  ##########

    let heart_button = document.getElementById("like_button")

    liked_pokemons_list = JSON.parse(localStorage.getItem("Liked_pokemons"))
    for (let i of liked_pokemons_list){
        if (i === data.indexOf(pokemon)){
            heart_button.setAttribute("src",heart_liked_src)
        }
    }

    // ########## HEART BUTTON FUNCTIONALITY  ##########
  
    heart_button.addEventListener("click", () => {
        liked_pokemons_list = JSON.parse(localStorage.getItem("Liked_pokemons"))

        if (heart_button.getAttribute("src") == heart_unliked_src){
            heart_button.setAttribute("src",heart_liked_src)
            liked_pokemons_list.push(data.indexOf(pokemon))
            localStorage.setItem("Liked_pokemons", JSON.stringify(liked_pokemons_list))
            generateLikedPokemons()
        }
        else{
            heart_button.setAttribute("src",heart_unliked_src)
            liked_pokemons_list.splice(liked_pokemons_list.indexOf(data.indexOf(pokemon)),1)
            localStorage.setItem("Liked_pokemons", JSON.stringify(liked_pokemons_list))
            generateLikedPokemons()
            gray_screen_div.style.display = "none"
            document.getElementById("pokemon_descreption").innerHTML = ""
        }
    })
    
}

generateLikedPokemons()