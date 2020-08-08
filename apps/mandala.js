let sketch3 = (m) => {
    m.web_style = document.getElementById('sketch3');
    m.clearBut = document.getElementById('clearBut');
    m.saveBut = document.getElementById('saveBut');
    m.docSz;
    m.segments;

    m.setup = () => {
        m.docSz = m.web_style.clientWidth-5;
        let canvas = m.createCanvas(m.docSz, m.docSz);
        canvas.position(m.web_style.offsetLeft+2.5, m.web_style.offsetTop);


        m.segments = m.floor(m.random(4,20));
        m.background(0);
    }

    m.windowResized = () => {
        m.setup();
    }

    m.clearBut.addEventListener("click", ()=>{
        m.background(0);
        m.segments = m.floor(m.random(4,20));
    });

    m.saveBut.addEventListener("click", ()=>{
        m.save("mandala.jpg");
    });

    m.draw = () => {
        if(m.mouseX>-1 && m.mouseX<s.docSz+1 && m.mouseY>-1 && m.mouseY<s.docSz+1) m.disableScroll();
        else m.enableScroll();

        m.translate(m.width/2,m.height/2);
        let d = m.dist(m.mouseX,m.mouseY,m.pmouseX,m.pmouseY);
        let sW = m.map(d, 0, 20, 5, 0);
        let rotationDiv = 360/m.segments;
        m.strokeWeight(sW);
        m.stroke(255);
        
        if(m.mouseIsPressed){
            if(m.mouseX>0&&m.mouseX<m.width&&m.mouseY>0&&m.mouseY<m.height){
                for(let i=0; i<m.segments; i++){
                    m.push();
                    m.rotate(i*rotationDiv);
                    m.line(m.mouseX-m.width/2, m.mouseY-m.height/2, m.pmouseX-m.width/2, m.pmouseY-m.height/2);
                    m.pop();
                }
            }
        }
    }


    m.disableScroll = () => {
        document.body.addEventListener('touchmove', m.preventDefault, { passive: false });
    }

    m.enableScroll = () => {
        document.body.removeEventListener('touchmove', m.preventDefault, { passive: false });
    }

    m.preventDefault = (g) => {
        g.preventDefault();
    }
}

let mandala = new p5(sketch3);
