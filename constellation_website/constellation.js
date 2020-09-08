let sketch = (a) => {
    const aBut = document.getElementById('aButton');
    const cBut = document.getElementById('cButton');
    const dBut = document.getElementById('dButton');

    const modalObj = document.querySelector('.modal'); 

    let elements = document.querySelectorAll('.concept button');
    let selNode;
    let nodes = [];
    let col, col2;
    a.setup = () =>{
        nodes.length = 0;
        selNode = null;
        let canvas =  a.createCanvas(window.innerWidth, window.innerHeight);
        canvas.position(0,0);
        canvas.style('z-index', '-1');

        let r = a.random(50,200);
        let g = a.random(50,200);
        let b = a.random(50,200);
        
        col = a.color(r,g,b);
        col2 = a.color(255-r, 255-g, 255-b);

        for(let i=0; i<elements.length; i++){
            let n = new Node(a.random(window.innerWidth*0.25,window.innerWidth*0.75), a.random(200,window.innerHeight*0.85),elements[i]);
            nodes.push(n);
            elements[i].style.background = col2;
        }
        a.strokeWeight(7);
        
    }
    a.windowResized = () => {
        a.setup();
    }

    aBut.addEventListener('click', ()=>{
        if(selNode!=null)nodes[selNode].element.style.display = 'none';
        elements = document.querySelectorAll('.audio button');
        a.setup();
    });
    cBut.addEventListener('click', ()=>{
        if(selNode!=null)nodes[selNode].element.style.display = 'none';
        elements = document.querySelectorAll('.concept button');
        a.setup();
    });
    dBut.addEventListener('click', ()=>{
        if(selNode!=null)nodes[selNode].element.style.display = 'none';
        elements = document.querySelectorAll('.design button');
        a.setup();
    });

    a.draw = () =>{
        a.clear();
        document.body.style.cursor = "default";
        a.stroke(col);
        for(let i=0; i<nodes.length; i++){
            if(i<nodes.length-1){
                a.line(nodes[i].x, nodes[i].y, nodes[i+1].x, nodes[i+1].y);
            } else {
                a.line(nodes[i].x, nodes[i].y, nodes[0].x, nodes[0].y);
            }          
        }
        for(let i=0; i<nodes.length; i++){
            if(!modalObj.classList.contains('open')){
                checkMouse(i);
            }
            nodes[i].draw();
        }
    }

    checkMouse = (i) => {
        let x = a.mouseX;
        let y = a.mouseY;
        let offset = 20;
        let check = a.dist(x,y,nodes[i].x,nodes[i].y);
        if(check<offset){
            if(selNode!=null) nodes[selNode].show = false;
            nodes[i].show = true;
            selNode = i;
        } else if(selNode!=null){
            nodes[selNode].show = false;
        } else {
            selNode = null;
        }
    }

    a.mousePressed=()=>{
        if(selNode==null)return;
        let x = a.mouseX;
        let y = a.mouseY;
        let offset = 10;
        let check = a.dist(x,y,nodes[selNode].x,nodes[selNode].y);
        if(check<offset){
            nodes[selNode].element.click();
        }
    }

    class Node {
        constructor(x,y,element){
            this.x = x;
            this.y = y;
            this.sz = 25;
            this.show = false;
            
            this.element = element;
            this.element.style.left = `${this.x+18}px`;
            this.element.style.top = `${this.y-12}px`;
            this.element.style.display = "none";
        }
        draw(){
            if(this.show&&!modalObj.classList.contains('open')){
                a.stroke(col2)
                a.fill(col2)
                a.ellipse(this.x, this.y, this.sz*1.7, this.sz*1.7);
                this.element.style.display = "block";
                document.body.style.cursor = "pointer";
            }
            else {
                this.element.style.display = "none"
            }
            a.stroke(col);
            a.fill(col);
            a.ellipse(this.x, this.y, this.sz, this.sz);
            this.hov = false;
        }
    }
}

let s = new p5(sketch);