export function Main() {        
    const $main = document.createElement('section');
    $main.id = 'main';   
    if(!location.hash.includes("#/search")){
        $main.classList.add('grid-fluid'); 
    }
    
    return $main; 
}