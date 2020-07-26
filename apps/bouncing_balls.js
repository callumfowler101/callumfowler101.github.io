let sketch2 = (e) => {
    e.web_style = document.getElementById('sketch2');
    e.docSz;

    e.balls;

    e.setup = () => {
        e.balls = [];
        e.docSz = e.web_style.clientWidth-5;

        let canvas = e.createCanvas(e.docSz,e.docSz);
        canvas.position(e.web_style.offsetLeft+2.5, e.web_style.offsetTop);

        e.noStroke();
    }

    e.windowResized = () => {
        e.setup();
    }

    e.draw = () => {
        e.background(0);
        for(let i=0; i<e.balls.length; i++){
            e.balls[i].update();
            e.balls[i].draw();
        }
    }

    e.mousePressed = () => {
        let b = new Ball(e.mouseX, e.mouseY);
        e.balls.push(b);
    }

    class Ball {
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.sz = e.random(20,40);
            this.speedX = e.random(-1,1)*3;
            this.speedY = e.random(-1,1)*3;
            this.alpha = 0;
            this.r = e.random(200,240); 
            this.g = e.random(100,120); 
            this.b = e.random(80,100);
        }

        update(){
            this.x+=this.speedX;
            this.y+=this.speedY;
            this.alpha -= this.sz*0.05;

            if(this.x>e.docSz-(this.sz*0.5)||this.x<this.sz*0.5){
                this.speedX*=-1;
                this.alpha = 255;
            } 
            if(this.y>e.docSz-(this.sz*0.5)||this.y<this.sz*0.5){
                this.speedY*=-1;
                this.alpha = 255;
            } 
        }

        draw(){
            e.fill(this.r, this.g, this.b, this.alpha);
            e.ellipse(this.x, this.y, this.sz, this.sz);
        }
    }
}

let balls = new p5(sketch2);