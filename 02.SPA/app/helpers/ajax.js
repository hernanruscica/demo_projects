export async function ajax(props) {
    let {url, callBackSuccess} = props;

    await fetch(url)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => callBackSuccess(json))
        .catch(err => {
            let message =  err.statusText || "Ocurrió un Error al acceso a la API";

            document.getElementById('main').innerHTML = `
                <div class = "error">
                    <p> Error ${err.status} : ${message}
                </div>
                `
                //document.querySelector('.loader').style.display = "none";
        });
}