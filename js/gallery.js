let beans = [];
const rate = 50;
const maxlife = 500;
let x = 0;
let lastTime = new Date();

document.addEventListener("DOMContentLoaded", function() {
    // Have little coffee beans fall down as the mouse moves
    $("#body").mousemove(function (e) {
        x++;
            
        if (x % rate == 0 && x != 0){
            var bean = {};
            //letter.char = String.fromCharCode(65 + Math.round(Math.random() * 25));
            bean.life = maxlife;
            //bean.colour = tinycolor("hsl(27, 100%, " + Math.round(20 + Math.random() * 15) + "%)").toHexString();
            bean.colour = Math.round(20 + Math.random() * 15);
            bean.x = e.pageX - 32;
            bean.y = e.pageY - 100;
            bean.velY = randomNumber(0, -0.5);
            bean.velX = randomNumber(-0.2, 0.2)
            bean.angle = randomNumber(0, 360);
            bean.angularVelocity = randomNumber(-0.5, 0.5);
            let scale = Math.random() * 8;
            bean.width = 24 + scale;
            bean.height = 24 + scale;

            // Clone node and set aesthetics ONCE
            bean.node = document.querySelector("svg.svg-bean").cloneNode(true);
            bean.node.style.position = "absolute";
            bean.node.querySelector("g>path").style.fill = tinycolor("hsl(27, 100%, " + bean.colour + "%)");
            bean.node.setAttribute("width", bean.width);
            bean.node.setAttribute("height", bean.height);
            bean.node.style.display = "block";
            bean.node.setAttribute("transform", "rotate(" + bean.angle + ")");

            bean.html = function() {
                // Each time we call the code we need to update position
                bean.node.style.top = bean.y + "px";
                bean.node.style.left = bean.x + "px";
                bean.node.setAttribute("transform", "rotate(" + bean.angle + ")");
                return bean.node.outerHTML;
            }
            
            beans.push(bean);
        }

        if (x >= 255) { x = 0; }
        
        out = '';
        
    });
    
    setInterval(update);
});

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function update(){
    let delta = new Date() - lastTime;
    lastTime = new Date();

    let out = '';
    
    for(i = 0; i < beans.length; i++) {               
        let bean = beans[i];

        bean.life = bean.life - (0.2 * delta);
        
        if (bean.life <= 0){
            beans.splice(i, 1);            
            out = '';            
            continue;
        }
        
        //bean.y = bean.y + (delta * 0.1 + (0.01 * (bean.life * 0.5)));
        bean.velY += delta * 0.002;
        bean.y += bean.velY * delta;
        bean.x += bean.velX * delta;
        bean.angle += bean.angularVelocity * delta;
    
        out += bean.html();
    }
    
    $("#background").html(out);
}
