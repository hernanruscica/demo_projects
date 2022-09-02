
export function PostCard(props){
    let {date, slug, title, _embedded} = props;
    let dateFormatted = new Date(date).toLocaleString();
    let urlPoster = _embedded["wp:featuredmedia"] ? 
        _embedded["wp:featuredmedia"][0].source_url :
        "app/assets/favicon.png" ;
    return `
        <article class="post-card">
            <img src=${urlPoster} alt="imagen"/>
            <h2>${title.rendered} </h2>
            <p>
                <time datetime="${date}">${dateFormatted}</time>
                <a href="#/${slug}">Ver Publicación</a>                
            </p>
        </article>
    `;
}