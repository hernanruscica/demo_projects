export function SearchForm(){
    const $searchForm = document.createElement('form');    
    const $searchInput = document.createElement('input');

    $searchForm.classList.add('form-search');
    $searchInput.name = "search";
    $searchInput.type = "search";
    $searchInput.placeholder = "Buscar ... ";
    $searchForm.appendChild($searchInput);
    
    return $searchForm;
}