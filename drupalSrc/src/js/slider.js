const glideFirst = new Glide('.glideFirst', {
    type: 'carousel',
    startAt: 0,
    perView: 5,
    gap:40,
    animationDuration:1000,
    breakpoints: {
        1400: {
          perView: 4
        },
        1024: {
          perView: 3
        },
        768: {
            perView: 2
        },
        600: {
            perView: 1
        }
      }
})
glideFirst.mount()
const glideSecond = new Glide('.glideSecond', {
    type: 'carousel',
    startAt: 0,
    perView: 2,
    breakpoints:{
        500:{
            perView: 1
        }
    }
})
glideSecond.mount()

