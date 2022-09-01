export function Posts(props) {    
    let {titulo, id} = props;
    const $posts = document.createElement('section');
    $posts.id = 'posts';
    $posts.innerHTML = `${titulo} con el id: ${id}`;
    return $posts; 
}