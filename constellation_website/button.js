const navButtons = document.querySelectorAll('.navigation')
const constellationButtons = document.querySelectorAll('.constBut');
const modal = document.querySelector('.modal');

const bigBoxes = document.getElementsByClassName('bigbox');

let boxSel=null;

function selectBox(i){
    if(boxSel!=null) bigBoxes[boxSel].classList.remove('open');
    boxSel=i;
    bigBoxes[boxSel].classList.add('open');
    modal.classList.add('open');
}

function clearBox(){
    if(boxSel!=null){
        bigBoxes[boxSel].classList.remove('open');
        boxSel = null;
    }
}

constellationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        selectBox(button.id);
    });
});

navButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        clearBox();
    });
});

modal.addEventListener('click', (e)=>{
    if(e.target.classList.contains('modal')){
        modal.classList.remove('open');
        bigBoxes[boxSel].classList.remove('open');
    } 
});


