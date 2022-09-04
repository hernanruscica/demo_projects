export function SearchForm(){
    const $searchForm = document.createElement('form');    
    const $searchInput = document.createElement('input');

    $searchForm.classList.add('search-form');
    $searchInput.name = "search";
    $searchInput.type = "search";
    $searchInput.placeholder = "Buscar ... ";
    $searchForm.appendChild($searchInput);
    
    return $searchForm;
}