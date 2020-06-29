let cells = [];
let numOfCells;
let cellSz, cellOffset;
let canvas, docSz;
let div_grid = document.getElementById('sketch1');
let noScroll;

function setup(){
    docSz = div_grid.clientWidth-5;
    canvas = createCanvas(docSz, docSz);
    canvas.position(div_grid.offsetLeft+2.5, div_grid.offsetTop);
    noScroll = false;
    
    
    numOfCells = floor(random(5,30));
    cellSz = docSz/numOfCells;
    cellOffset = cellSz*0.5;
   
    rectMode(CENTER);
    for(let i=-2; i<numOfCells+2; i++){
        for(let j=-2; j<numOfCells+2; j++){
            let c = new Cell(i*cellSz+cellOffset, j*cellSz+cellOffset, cellSz);
            cells.push(c);
        }
    }
}

function windowResized(){
    canvas.position(div_grid.offsetLeft+2.5, div_grid.offsetTop);
}

function draw(){
    background(0);
    // trigger mouseEvents and disable scrool
    if(mouseX>-1 && mouseX<docSz+1 && mouseY>-1 && mouseY<docSz+1){
        disableScroll();
        if(mouseIsPressed){
            if(!noScroll){
                noScroll = true;
                flip();
            } else {
                if(noScroll) noScroll = false;
            }
        }
    } else {
        enableScroll();
    }

    //draw cubes
    for(let i=0; i<cells.length; i++){
        cells[i].grow()
        cells[i].display();
    }
}

function flip(){
    let x = floor(map(mouseX, 0, docSz, 0, numOfCells))*cellSz+cellOffset;
    let y = floor(map(mouseY, 0, docSz, 0, numOfCells))*cellSz+cellOffset;
    let centreCell;
    for(let i=0; i<cells.length; i++){
        if(cells[i].x == x && cells[i].y == y){
            centreCell = i;
        } 
    }

    let rand = random(1);
    if(rand<0.3){
        cells[centreCell].growth = true;
        return;
    } else if (rand<0.7){
        cells[centreCell].growth = true;
        cells[centreCell+numOfCells+4].growth = true;
        cells[centreCell-numOfCells-4].growth = true;
        return;
    } else if (rand<0.9){
        cells[centreCell].growth = true;
        cells[centreCell+1].growth = true;
        cells[centreCell-1].growth = true;
        return;
    } else {
        cells[cells.length-centreCell].growth = true;
        return;
    }
}

class Cell {
    constructor(x,y,sz){
        this.x = x;
        this.y = y;
        this.sz = 0;
        this.maxSz = sz;
        this.col = color(x, y, 170) ;
        this.sin = -0.5;
        this.growth = false;
        this.speed = random(0.001,0.004)*numOfCells;
    }

    grow(){  // need to try and grow and shrink
        if(this.growth){
            let sinVal = (sin(this.sin)+1)*0.4;
            this.sz = sinVal*this.maxSz;
            this.sin+=this.speed;
            if(this.sz<1){
                this.sin = 0;
                this.growth = false;
            } 
        }
    }

    display(){
        fill(this.col);
        rect(this.x, this.y, this.sz, this.sz);
    }
}


function disableScroll(){
    // var x=window.scrollX;
    // var y=window.scrollY;
    // window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScroll(){
    // window.onscroll=function(){};
}