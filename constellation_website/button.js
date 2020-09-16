// This script handles all of the button events
const navButtons = document.querySelectorAll('.navigation')
const constellationButtons = document.querySelectorAll('.constBut');
const modal = document.querySelector('.modal');

const bigBoxes = document.getElementsByClassName('bigbox');

let boxSel=null;
// If a button is clicked on it displays the relavent bigbox
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
// If the modal is clicked the big box is hidden and it displays the main page.
modal.addEventListener('click', (e)=>{
    if(e.target.classList.contains('modal')){
        modal.classList.remove('open');
        bigBoxes[boxSel].classList.remove('open');
    } 
});


