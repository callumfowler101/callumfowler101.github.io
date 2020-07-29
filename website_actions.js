const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const carouselText = document.querySelectorAll('carousel-slide p');

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 1;
const size = 400; 

// when i have all images the same size i need to do: const size = carouselImages[0].clientWidth

carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';

for(let i=0; i<carouselText.length; i++){
    carouselText[i].style.left = i*size;
}

carouselSlide.addEventListener('transitionend', ()=>{
    if(carouselImages[counter].id === 'lastClone'){
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';
    }
    if(carouselImages[counter].id === 'firstClone'){
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';
    }
});

let hover;
carouselSlide.addEventListener('mouseenter', ()=>{hover = true;});
carouselSlide.addEventListener('mouseleave', ()=>{hover = false;});

setInterval(()=>{
    if(hover) return;
    if(counter>=carouselImages.length-1) return;
    carouselSlide.style.transition = 'transform 1.25s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size*counter) + 'px)';
}, 5000);
 
