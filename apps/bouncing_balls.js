let sketch2 = (s) => {
    s.web_style = document.getElementById('sketch2');
    s.docSz;
    s.colChange = document.getElementById('colChangeBut');
    s.refresh = document.getElementById('refreshBallBut');

    s.balls;
    s.r;
    s.g;
    s.b;

    s.setup = () => {
        s.balls = [];
        s.docSz = s.web_style.clientWidth-5;

        let canvas = s.createCanvas(s.docSz,s.docSz);
        canvas.position(s.web_style.offsetLeft+2.5, s.web_style.offsetTop);

        s.noStroke();
        s.r = 200;
        s.g = 100;
        s.b = 80; 
    }

    s.windowResized = () => {
        s.setup();
    }

    s.colChange.addEventListener("click", ()=>{
        s.r=s.random(20,200);
        s.g=s.random(20,200);
        s.b=s.random(20,200);
    });

    s.refresh.addEventListener("click", ()=>{
        s.setup();
    });

    s.draw = () => {
        s.background(0);

        if(s.mouseX>-1 && s.mouseX<s.docSz+1 && s.mouseY>-1 && s.mouseY<s.docSz+1) s.disableScroll();
        else s.enableScroll();

        for(let i=0; i<s.balls.length; i++){
            s.balls[i].update();
            s.balls[i].draw();
        }
    }

    s.mousePressed = () => {
        if(s.mouseX>0&&s.mouseX<s.width&&s.mouseY>0&&s.mouseY<s.height){
            let b = new Ball(s.mouseX, s.mouseY);
            s.balls.push(b);
        }
        
    }

    class Ball {
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.sz = s.random(20,40);
            this.speedX = s.random(-1,1)*3;
            this.speedY = s.random(-1,1)*3;
            this.alpha = 0;
            this.r = s.random(-10,10);
            this.g = s.random(-10,10);
            this.b = s.random(-10,10);
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
            s.fill(this.r+s.r, this.g+s.g, this.b+s.b, this.alpha);
            s.ellipse(this.x, this.y, this.sz, this.sz);
        }
    }

    s.disableScroll = () => {
        document.body.addEventListener('touchmove', s.preventDefault, { passive: false });
    }

    s.enableScroll = () => {
        document.body.removeEventListener('touchmove', s.preventDefault, { passive: false });
    }

    s.preventDefault = (f) => {
        f.preventDefault();
    }
}

let balls = new p5(sketch2);