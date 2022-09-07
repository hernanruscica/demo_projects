import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";

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
                //console.log(posts);
                let html = "";
                posts.forEach((post) => (html += PostCard(post)));                
                $main.innerHTML = html;            
            }
        });
    }else if (hash.includes("#/search")){
        //$main.innerHTML = "<h2>Seccion del buscador</h2>"
        let query = localStorage.getItem("wpSearch");
        if (!query){
            $d.querySelector(".loader").style.display = "none";
            return false;
        } 

        await ajax({
            url: `${api.SEARCH}${query}`,
            callBackSuccess: (search) => {
                console.log(search);
                let html="";
                if (search.length === 0){
                    html = `<p class="error">No hubo resultados de busqueda para el termino <mark>${query}</mark></p>`;
                }else{                   
                    search.forEach((result) => {
                        html += SearchCard(result);
                    });
                }

                $main.innerHTML = html;
            }
        })
        
    }else if (hash === "#/contact"){
        $main.innerHTML = "<h2>Seccion del contacto</h2>"
    }else{
        
        //$main.innerHTML = "<h2>Aquí cargará el contenido por default</h2>"
        //console.log(`${api.POST}/${localStorage.getItem("wpPostId")}`);
        await ajax({
            url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
            callBackSuccess: (post) => {
                console.log(post);
                $main.innerHTML = Post(post);
            }
        })
    }
    $d.querySelector('.loader').style.display = "none";
}