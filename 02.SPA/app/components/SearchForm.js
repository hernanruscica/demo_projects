export function SearchForm(){
    const $d = document;
    const $searchForm = $d.createElement('form');    
    const $searchInput = $d.createElement('input');

    $searchForm.classList.add('search-form');
    $searchInput.name = "search";
    $searchInput.type = "search";
    $searchInput.placeholder = "Buscar ... ";
    $searchInput.autocomplete = "off";
    $searchForm.appendChild($searchInput);

    if (location.hash.includes("#/search")){
        $searchInput.value = localStorage.getItem("wpSearch");
    }

    $d.addEventListener('search', (e) => {
        if(!e.target.matches("input[type='search']")) return false;
        if (!e.target.value) localStorage.removeItem("wpSearch");
    });
    
    $d.addEventListener('submit', (e) => {
        if (!e.target.matches(".search-form")) return false;
        e.preventDefault();
        localStorage.setItem("wpSearch", e.target.search.value);
        location.hash = `#/search?search=${e.target.search.value}`;

    });

    return $searchForm;
}