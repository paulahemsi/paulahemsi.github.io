//estudando o código feito por Chris Born no https://code.sololearn.com/WeKRgDG08m1p/#js

//boleana pra não começar a gritchar antes de carregar a imagem
let isLoaded = false;
let glitch;
//boleana para mouse congelar a imagem
let pausa = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //carregando imagem e inicializando objeto
  loadImage("../imagens/logo.svg", function(img) {
    glitch = new Glitch(img);
    isLoaded = true;
  });
}

//congelar e descongelar imagem
function mousePressed(){
  if (! pausa){
  noLoop();
    pausa = true;
  } else if (pausa){
    loop();
    pausa = false;
  }
}

function draw() {
  clear();
  background(0);

  //pra não bugar, só começar os efeitos quando a imagem tiver carregada
  if (isLoaded) {
    glitch.show();
  }
}

class Glitch {
  
  //declarando variáveis e arrays que irão replicar logo
  constructor(img) {
    this.channelLen = 4;
    this.imgOrigin = img;
    this.imgOrigin.loadPixels();
    this.copyData = [];
    this.flowLineImgs = [];
    this.shiftLineImgs = [];
    this.shiftRGBs = [];
    this.scatImgs = [];
    this.throughFlag = true;
    this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

    // flow line
    for (let i = 0; i < 1; i++) {
      let o = {
        pixels: null,
        t1: floor(random(0, 1000)),
        speed: floor(random(4, 24)),
        randX: floor(random(0, 20))
      };
      this.flowLineImgs.push(o);
    }

    // shift line
    for (let i = 0; i < 6; i++) {
      let o = null;
      this.shiftLineImgs.push(o);
    }

    // shift RGB
    for (let i = 0; i < 1; i++) {
      let o = null;
      this.shiftRGBs.push(o);
    }

    // scat imgs
    for (let i = 0; i < 3; i++) {
      let scatImg = {
        img: null,
        x: 0,
        y: 0
      };
      this.scatImgs.push(scatImg);
    }
  }

  replaceData(destImg, srcPixels) {
    for (let y = 0; y < destImg.height; y++) {
      for (let x = 0; x < destImg.width; x++) {
        let r, g, b, a;
        let index;
        index = (y * destImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        destImg.pixels[r] = srcPixels[r];
        destImg.pixels[g] = srcPixels[g];
        destImg.pixels[b] = srcPixels[b];
        destImg.pixels[a] = srcPixels[a];
      }
    }
    destImg.updatePixels();
  }

  flowLine(srcImg, obj) {

    let destPixels, tempY;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    obj.t1 %= srcImg.height;
    obj.t1 += obj.speed;
    //tempY = floor(noise(obj.t1) * srcImg.height);
    tempY = floor(obj.t1);
    for (let y = 0; y < srcImg.height; y++) {
      if (tempY === y) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let index;
          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          destPixels[r] = srcImg.pixels[r] + obj.randX;
          destPixels[g] = srcImg.pixels[g] + obj.randX;
          destPixels[b] = srcImg.pixels[b] + obj.randX;
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  //redesenha o logo com buracos nos pixels, partes pretas
  shiftLine(srcImg) {

    let offsetX;
    let rangeMin, rangeMax;
    let destPixels;
    let rangeH;

    destPixels = new Uint8ClampedArray(srcImg.pixels);
    rangeH = srcImg.height;
    rangeMin = floor(random(0, rangeH));
    rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
    offsetX = this.channelLen * floor(random(-40, 40));

    for (let y = 0; y < srcImg.height; y++) {
      if (y > rangeMin && y < rangeMax) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let r2, g2, b2, a2;
          let index;

          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          r2 = r + offsetX;
          g2 = g + offsetX;
          b2 = b + offsetX;
          destPixels[r] = srcImg.pixels[r2];
          destPixels[g] = srcImg.pixels[g2];
          destPixels[b] = srcImg.pixels[b2];
          destPixels[a] = srcImg.pixels[a];
        }
      }
    }
    return destPixels;
  }

  //mudança na cor do logo
  shiftRGB(srcImg) {

    let randR, randG, randB;
    let destPixels;
    let range;

    range = 160;
    destPixels = new Uint8ClampedArray(srcImg.pixels);
    randR = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
    randG = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
    randB = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;

    for (let y = 0; y < srcImg.height; y++) {
      for (let x = 0; x < srcImg.width; x++) {
        let r, g, b, a;
        let r2, g2, b2, a2;
        let index;

        index = (y * srcImg.width + x) * this.channelLen;
        r = index;
        g = index + 1;
        b = index + 2;
        a = index + 3;
        r2 = (r + randR) % srcImg.pixels.length;
        g2 = (g + randG) % srcImg.pixels.length;
        b2 = (b + randB) % srcImg.pixels.length;
        destPixels[r] = srcImg.pixels[r2];
        destPixels[g] = srcImg.pixels[g2];
        destPixels[b] = srcImg.pixels[b2];
        destPixels[a] = srcImg.pixels[a];
      }
    }

    return destPixels;
  }

  //é o que vai fazer logo se deslocar no espaço
  getRandomRectImg(srcImg) {
    let startX;
    let startY;
    let rectW;
    let rectH;
    let destImg;
    startX = floor(random(0, srcImg.width - 30));
    startY = floor(random(0, srcImg.height - 50));
    rectW = floor(random(30, srcImg.width - startX));
    rectH = floor(random(1, 50));
    destImg = srcImg.get(startX, startY, rectW, rectH);
    destImg.loadPixels();
    return destImg;
  }

  show() {

    //importante para não ir perdendo a imagem inicial
    this.replaceData(this.imgOrigin, this.copyData);

    //mouse X determina velocidade em que glitch é barrado
    let n = floor(random(100));
   let v = map(mouseX, 0, width, 15, 125);
    if (n > v && this.throughFlag) {
      this.throughFlag = false;
      setTimeout(() => {
        this.throughFlag = true;
      }, floor(random(40, 400)));
    }
    if (!this.throughFlag) {
      push();
      translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
      image(this.imgOrigin, 0, 0);
      pop();
      return;
    }

    // flow line
    this.flowLineImgs.forEach((v, i, arr) => {
      arr[i].pixels = this.flowLine(this.imgOrigin, v);
      if (arr[i].pixels) {
        this.replaceData(this.imgOrigin, arr[i].pixels);
      }
    });

    // shift line
    this.shiftLineImgs.forEach((v, i, arr) => {
      if (floor(random(100)) > 50) {
        arr[i] = this.shiftLine(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      } else {
        if (arr[i]) {
          this.replaceData(this.imgOrigin, arr[i]);
        }
      }
    });

    // shift rgb
    this.shiftRGBs.forEach((v, i, arr) => {
      if (floor(random(100)) > 65) {
        arr[i] = this.shiftRGB(this.imgOrigin);
        this.replaceData(this.imgOrigin, arr[i]);
      }
    });

    push();
    translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
    image(this.imgOrigin, 0, 0);
    pop();

    // joga as imagens pros diferentes locais do espaço
    this.scatImgs.forEach(obj => {
      push();
      translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
      if (floor(random(100)) > 80) {
        obj.x = floor(random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7));
        obj.y = floor(random(-this.imgOrigin.height * 0.1, this.imgOrigin.height));
        obj.img = this.getRandomRectImg(this.imgOrigin);
      }
      if (obj.img) {
        image(obj.img, obj.x, obj.y);
      }
      pop();
    });
  }

}