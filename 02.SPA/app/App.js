import api from "./helpers/wp_api.js";
import { ajax } from "./helpers/ajax.js";
import { Title } from "./components/Title.js";
import { Header } from "./components/Header.js";
import { Loader } from "./components/Loader.js";
import { Menu } from "./components/Menu.js";
import { SearchForm } from "./components/SearchForm.js";
import { Posts } from "./components/Posts.js";

export function App(){
    
    //console.log(api.API_WP);
    const $d = document;
    const $root = $d.getElementById('root');
    $root.appendChild(Header());           
    $root.appendChild(Loader());
    
    //$root.appendChild(Posts({titulo: 'Primer post', id: 0})); funciona OK

    /*para ver el mensaje de error
    ajax('sdfsdf', ()=>{console.log('ola k ase')})
    */
}