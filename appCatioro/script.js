
const RACAS_URL = 'https://dog.ceo/api/breeds/list/all';
const seletor = document.querySelector('.racas');


//const div = document.querySelector('.div-img');

const pata = document.querySelector('.giro');
//imagem que já começa lá
const img = document.querySelector('.img-catioros');

function buscarRacas() {

    fetch(RACAS_URL)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            const objetoRacas = dados.message;
            const arrayRacas = Object.keys(objetoRacas);

            for (let i = 0; i < arrayRacas.length; i++) {
                const opcao = document.createElement('option');
                opcao.innerText = arrayRacas[i];
                opcao.value = arrayRacas[i];
                seletor.appendChild(opcao);
            }
        })

};


buscarRacas();

seletor.addEventListener('change', function (evento) {

    //mais sobre esse lance de ${}, dentro das chaves pode ir tudo que pode estar do lado direito quando declaramos variával const x = (ou seja, muita coisa, funções ja do js como Math.random() por ex)
    const url = `https://dog.ceo/api/breed/${evento.target.value}/images/random`;
    buscarImagem(url);
});

function buscarImagem(url) {
    pata.classList.add('mostrar');
    img.classList.remove('mostrar');
    fetch(url)
        .then(function(resposta){
            return resposta.json();
        })
        .then(function(dados){
            //como já existe uma imagem na página, é só substituir a fonte pela message (url) que veio do api =D
            img.src = dados.message;

        })
};

//colocando um evento para saber quando imagem foi carragada
img.addEventListener("load", function() {
    pata.classList.remove('mostrar');
    img.classList.add('mostrar');
});

