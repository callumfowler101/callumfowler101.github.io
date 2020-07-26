let sketch1 = function(o){
    o.web_style = document.getElementById('sketch1');
    o.docSz;

    o.cells;
    o.numOfCells;
    o.cellSz;
    o.cellOffset;

    o.setup = () => {
        o.cells = [];
        o.docSz = o.web_style.clientWidth-5;
        let canvas = o.createCanvas(o.docSz, o.docSz);
        canvas.position(o.web_style.offsetLeft+2.5, o.web_style.offsetTop);
        
        o.numOfCells = o.floor(o.random(5,30));
        o.cellSz = o.docSz/o.numOfCells;
        o.cellOffset = o.cellSz*0.5;

        o.rectMode(o.CENTER);
        for(let i=-2; i<o.numOfCells+2; i++){
            for(let j=-2; j<o.numOfCells+2; j++){
                let c = new Cell(i*o.cellSz+o.cellOffset, j*o.cellSz+o.cellOffset, o.cellSz);
                o.cells.push(c);
            }
        }
    }

    o.windowResized = () => {
        o.setup();
    }

    o.draw = () => {
        o.background(0);
        // trigger mouseEvents and disable scrool
        if(o.mouseX>-1 && o.mouseX<o.docSz+1 && o.mouseY>-1 && o.mouseY<o.docSz+1){
            o.disableScroll();
            if(o.mouseIsPressed){
                o.flip();
            }
        } else {
            o.enableScroll();
        }

        //draw cubes
        for(let i=0; i<o.cells.length; i++){
            o.cells[i].grow()
            o.cells[i].display();
        }
    }

    o.flip = () => {
        let x = o.floor(o.map(o.mouseX, 0, o.docSz, 0, o.numOfCells))*o.cellSz+o.cellOffset;
        let y = o.floor(o.map(o.mouseY, 0, o.docSz, 0, o.numOfCells))*o.cellSz+o.cellOffset;
        let centreCell;
        for(let i=0; i<o.cells.length; i++){
            if(o.cells[i].x == x && o.cells[i].y == y){
                centreCell = i;
            } 
        }

        let rand = o.random(1);
        if(rand<0.3){
            o.cells[centreCell].growth = true;
            return;
        } else if (rand<0.7){
            o.cells[centreCell].growth = true;
            o.cells[centreCell+o.numOfCells+4].growth = true;
            o.cells[centreCell-o.numOfCells-4].growth = true;
            return;
        } else if (rand<0.9){
            o.cells[centreCell].growth = true;
            o.cells[centreCell+1].growth = true;
            o.cells[centreCell-1].growth = true;
            return;
        } else {
            o.cells[o.cells.length-centreCell].growth = true;
            return;
        }
    }

    class Cell {
        constructor(x,y,sz){
            this.x = x;
            this.y = y;
            this.sz = 0;
            this.maxSz = sz;
            this.col = o.color(x, y, 170) ;
            this.sin = -0.5;
            this.growth = false;
            this.speed = o.random(0.001,0.004)*o.numOfCells;
        }

        grow(){ 
            if(this.growth){
                let sinVal = (o.sin(this.sin)+1)*0.4;
                this.sz = sinVal*this.maxSz;
                this.sin+=this.speed;
                if(this.sz<1){
                    this.sin = 0;
                    this.growth = false;
                } 
            }
        }

        display(){
            o.fill(this.col);
            o.rect(this.x, this.y, this.sz, this.sz);
        }
    }

    o.disableScroll = () => {
        document.body.addEventListener('touchmove', o.preventDefault, { passive: false });
    }

    o.enableScroll = () => {
        document.body.removeEventListener('touchmove', o.preventDefault, { passive: false });
    }

    o.preventDefault = (e) => {
        e.preventDefault();
    }
}

let grid = new p5(sketch1);
