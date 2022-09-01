export function ajax(props) {
    let {url, callBackSuccess} = props;

    fetch(url)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => callBackSuccess(json))
        .catch(err => {
            let message =  err.statusText || "Ocurrió un Error al acceso a la API";

            document.getElementById('root').innerHTML = `
                <div class = "error">
                    <p> Error ${err.status} : ${message}
                </div>
                `
        });
}