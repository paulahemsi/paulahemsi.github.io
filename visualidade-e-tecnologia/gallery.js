
//criando variáveis para os dois botões
const btVoltar = document.querySelector('.prev');
const btIr= document.querySelector('.next');

//criando variável lista (node list, não array, se precisar podemos usar funções para mudar) para guardar todas as imagens (assim ficamos livres para adicionar ou retirar imagem, lista sempre terá as imagens que temos atualmente)
const listaDasImagens = document.querySelectorAll('.img-1927');

//criando variável para sabermos qual a imagem que está selecionada. Começamos com zero pois é a primeira, index 0 na node list
let imagemSelecionada = 0;

//colocando listeners nos dois botões para rodar função que vamos criar
btVoltar.addEventListener('click', function() {
    //estamos fazendo com imagens mas poderiamos fazer com qualquer elemento do DOM
    listaDasImagens[imagemSelecionada].classList.remove('active');
    imagemSelecionada --;
    listaDasImagens[imagemSelecionada].classList.add('active');

    btIr.disabled = false;

    if(imagemSelecionada === 0){
        btVoltar.disabled = true;
    }

});

btIr.addEventListener('click', function() {
    //removendo a imagem selecionada. como? acessando a lista de classes dela e removendo a que a torna ativa
    //por algum motivo aqui não precisa do ponto, talvez porque já estamos acessando a lista das classes então obviamente só podemos escrever nomes de classes
    listaDasImagens[imagemSelecionada].classList.remove('active');
    imagemSelecionada ++;
    listaDasImagens[imagemSelecionada].classList.add('active');

    //assim estamos desabilitando o disabled do botão =) (escrever o nome certo de acordo com o :disabled do css- na verdade só está assim no css pq é uma propriedade do html, então só olhar a propriedade do html
    btVoltar.disabled = false;
    //poderíamos ter feito uma condição para só fazer isso se estiver desabilitado, mas ele disse que nesse caso não faz mal nenhum deixar assim
    
    //desabilitando o botão -e consequentemente o listener nele- quando imagem selecionada foi a última da lita
    //três iguais três iguais três iguais não esqueceeer
    if(imagemSelecionada === listaDasImagens.length - 1){
        btIr.disabled = true;
    }

});