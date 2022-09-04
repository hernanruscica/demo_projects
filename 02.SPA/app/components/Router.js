import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";

export async function Router(){   
    const $d = document;
    const w = window;    
    const $main = $d.getElementById('main');
    let { hash } = location;

    $main.innerHTML = null;
    console.log(hash);

    if (!hash || hash === "#/"){        
        await ajax({
            url: api.POSTS,
            callBackSuccess: (posts) => {
                console.log(posts);
                let html = "";
                posts.forEach((post) => (html += PostCard(post)));                
                $main.innerHTML = html;            
            }
        });
    }else if (hash.includes("#/search")){
        $main.innerHTML = "<h2>Seccion del buscador</h2>"
    }else if (hash === "#/contact"){
        $main.innerHTML = "<h2>Seccion del contacto</h2>"
    }else{
        $main.innerHTML = "<h2>Aquí cargará el contenido por default</h2>"
    }
    $d.querySelector('.loader').style.display = "none";
}