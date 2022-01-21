class Pais extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        const API_URL = 'https://restcountries.com/v3.1/all';
        const xhr = new XMLHttpRequest();
        function onRequestHanlder(){
            if(this.readyState === 4 && this.status === 200){
                const data = JSON.parse(this.response);
                var info = {}; 
                var datosArray = []; 
                for (let i = 0; i < 12; i++) {
                    info.pais = data[i].name.common;
                    info.capital = data[i].capital != undefined ? data[i].capital : 'No especificado'; 
                    info.poblation = data[i].population;
                    info.continente = data[i].continents;
                    datosArray.push({...info});
                }
                for(let j = 0; j < datosArray.length; j++){
                    const HTMLResponse = document.querySelector("#grid-container");
                    const pais =  ` Pais : ${datosArray[j].pais} `;
                    const capital = ` Capital : ${datosArray[j].capital} `;
                    const poblacion = ` Poblacion: ${datosArray[j].poblation}`;
                    const item = document.createElement('div');
                    item.setAttribute("class", "grid-item");
                    const etiquetaPais = document.createElement('a');
                    const etiquetaLi = document.createElement('li');
                    const etiquetaCapital = document.createElement('p');
                    const etiquetaPoblacion = document.createElement('p');
                    item.appendChild(etiquetaLi);
                    etiquetaPais.setAttribute('href','#openModal-about');
                    etiquetaLi.appendChild(etiquetaPais);
                    etiquetaLi.appendChild(etiquetaCapital);
                    etiquetaLi.appendChild(etiquetaPoblacion);
                    HTMLResponse.appendChild(item);
                    etiquetaCapital.textContent = capital;
                    etiquetaPoblacion.textContent = poblacion;
                    etiquetaPais.textContent = pais;
                    etiquetaPais.addEventListener("click", myFunction, false);

                    function myFunction() {
                        const valor = document.getElementById("valor");
                        const contenido =  ` Continente: ${datosArray[j].continente}`;
                        valor.innerText= contenido;   
                    }
                }
                var preload = document.querySelector('.lds-dual-ring');
                preload.setAttribute("style", "display:none");
            }   
        }
        xhr.addEventListener("load", onRequestHanlder);
        xhr.open('GET',`${API_URL}`);
        xhr.send();
    }
}
window.customElements.define("pais-content",Pais);