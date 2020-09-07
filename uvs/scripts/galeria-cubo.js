new Swiper(".swiper-container", { 
  speed: 200,
  spaceBetween: 100,
  effect: "cube",
  slidesPerView: 1,
  navigation: {
      //a string é a classe, pode ser essa deles ou podemos criar e estilizar uma nossa
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
  },
  loop: true,
});
