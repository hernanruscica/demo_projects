import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";

export function Router(){   
    const $d = document;
    const w = window;    
    const $posts = $d.getElementById('posts');
    let { hash } = location;

    $posts.innerHTML = null;
    console.log(hash);

    if (!hash || hash === "#/"){        
        ajax({
            url: api.POSTS,
            callBackSuccess: (posts) => {
                console.log(posts);
                let html = "";
                posts.forEach((post) => (html += PostCard(post)));
                $d.querySelector('.loader').style.display = "none";
                $posts.innerHTML = html;            
            }
        });
    }else if (hash.includes("#/search")){
        $posts.innerHTML = "<h2>Seccion del buscador</h2>"
    }else if (hash === "#/contact"){
        $posts.innerHTML = "<h2>Seccion del contacto</h2>"
    }else{
        $posts.innerHTML = "<h2>Aquí cargará el contenido por default</h2>"
    }
    /*
    
*/
}