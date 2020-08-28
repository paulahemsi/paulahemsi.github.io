let angulo;
let tamanho = 170;
let fator;
let xoff = 0;
let paleta = 1;

function setup() {
  createCanvas(800, 600);
  noCursor();
}

function draw() {
    
  switch (paleta) {
    case 1:
      background(51, 24, 50);
      break;
    case 2:
      background(49, 104, 121);
      break;
    case 3:
      background(194, 215, 233);
      break;
  }
      

  line(width/2, height, width/2, height - 40);

  //translate passa as coordenadas 0, 0 do plano cartesiano para os valores passados, precisa ser aqui pq precisa ser refeito a cada loop 
  translate(width/2, height - 40);
  angulo = noise(xoff) * (PI);
  xoff += 0.01;
  fator = 0.67;
  galho(tamanho);

}

function galho(tamanho) {

  let r = noise(xoff) * 255;
  let b = map(mouseY, 0, height, 0, 255);

  //definindo cor diferente de acordo com tamanho da linha e click do mouse
  if (tamanho > 4) {
        //stroke(218, 242, 220); 
    switch (paleta) {
      case 1:
        stroke(198, 216, 211);
        break
      case 2:
        stroke(127, 231, 220); 
        break;
      case 3:
        stroke(86, 37, 36);
        break;
    }
  } else {
    switch (paleta) {
      case 1:
        stroke(216, 30, 91);
        break
      case 2:
        stroke (244, 122, 96);
        break;
      case 3:
        stroke (224, 47, 144);
        break;
    }
    //stroke(245, 126, 126); 
  }

  //desenha linha de acordo com tamanho passado como argumento
  line(0, 0, 0, -tamanho);
  //definindo novo 0,0 a partir do fim de cada nova linha
  translate(0, -tamanho);

  if (tamanho > 1) {
    //guarda configuração que estava para mudar 0,0 com translate e poder avançar e retornar depois para ir pro outro lado
    push();
    rotate(angulo * noise(xoff));
    //chamando função novamente para cada novo galho girando para direita
    galho(tamanho * fator);
    pop();
    push();
    rotate(-angulo);
    //chamando função novamente para cada novo galho girando para esquerda
    galho(tamanho * fator);
    pop();


  }

}

function mousePressed() {
  paleta ++;
  if (paleta > 3){
    paleta = 1;
  }
}