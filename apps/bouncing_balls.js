let sketch2 = (s) => {
    s.web_style = document.getElementById('sketch2');
    s.docSz;

    s.balls;

    s.setup = () => {
        s.balls = [];
        s.docSz = s.web_style.clientWidth-5;

        let canvas = s.createCanvas(s.docSz,s.docSz);
        canvas.position(s.web_style.offsetLeft+2.5, s.web_style.offsetTop);

        s.noStroke();
    }

    s.windowResized = () => {
        s.setup();
    }

    s.draw = () => {
        s.background(0);
        for(let i=0; i<s.balls.length; i++){
            s.balls[i].update();
            s.balls[i].draw();
        }
    }

    s.mousePressed = () => {
        let b = new Ball(s.mouseX, s.mouseY);
        s.balls.push(b);
    }

    class Ball {
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.sz = s.random(20,40);
            this.speedX = s.random(-1,1)*3;
            this.speedY = s.random(-1,1)*3;
            this.alpha = 0;
            this.r = s.random(200,240); 
            this.g = s.random(100,120); 
            this.b = s.random(80,100);
        }

        update(){
            this.x+=this.speedX;
            this.y+=this.speedY;
            this.alpha -= this.sz*0.05;

            if(this.x>s.docSz-(this.sz*0.5)||this.x<this.sz*0.5){
                this.speedX*=-1;
                this.alpha = 255;
            } 
            if(this.y>s.docSz-(this.sz*0.5)||this.y<this.sz*0.5){
                this.speedY*=-1;
                this.alpha = 255;
            } 
        }

        draw(){
            s.fill(this.r, this.g, this.b, this.alpha);
            s.ellipse(this.x, this.y, this.sz, this.sz);
        }
    }

    s.disableScroll = () => {
        document.body.addEventListener('touchmove', s.preventDefault, { passive: false });
    }

    s.enableScroll = () => {
        document.body.removeEventListener('touchmove', s.preventDefault, { passive: false });
    }

    s.preventDefault = (e) => {
        e.preventDefault();
    }
}

let balls = new p5(sketch2);