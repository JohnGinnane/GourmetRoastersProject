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
            var letter = {};
            //letter.char = String.fromCharCode(65 + Math.round(Math.random() * 25));
            letter.life = maxlife;
            //letter.colour = tinycolor("hsl(27, 100%, " + Math.round(20 + Math.random() * 15) + "%)").toHexString();
            letter.colour = Math.round(20 + Math.random() * 15);
            letter.x = e.pageX - 32;
            letter.y = e.pageY - 100;
            letter.velY = Math.random() * -1;
            letter.velX = (((Math.random() * 2) - 1) * 0.5);
            letter.angle = Math.random() * 360;
            let scale = Math.random() * 8;
            letter.width = 24 + scale;
            letter.height = 24 + scale;
            
            letter.html = function() {
                //return "<span style='overflow: hidden; position:absolute; font-size: " + (letter.life / 10) + "px; color:" + letter.colour + "; top:" + letter.y + "px; left:" + letter.x + "px;'>" + letter.char + "</span>";
                let clonedBean = document.querySelector("svg.svg-bean").cloneNode(true);
                clonedBean.style.position = "absolute"
                clonedBean.style.top = letter.y + "px";
                clonedBean.style.left = letter.x + "px";
                clonedBean.style.display = "block";
                clonedBean.setAttribute("width", letter.width);
                clonedBean.setAttribute("height", letter.height);
                clonedBean.setAttribute("transform", "rotate(" + letter.angle + ")");
                //clonedBean.querySelector("g>path").style.fill = "rgba(255, 0, 0, " + (letter.life / maxlife) + ")"
                //clonedBean.querySelector("g>path").style.fill = letter.colour;
                clonedBean.querySelector("g>path").style.fill = tinycolor("hsla(27, 100%, " + letter.colour + "%, " + (letter.life / maxlife) + ")").toHexString();

                return clonedBean.outerHTML;
            }
            
            beans.push(letter);
        }

        if (x >= 255) { x = 0; }
        
        out = '';
        
    });
    
    setInterval(update);
});

function update(){
    let delta = new Date() - lastTime;
    lastTime = new Date();

    let out = '';
    
    for(i = 0; i < beans.length; i++)
    {               
        beans[i].life = beans[i].life - (0.2 * delta);
        
        if (beans[i].life <= 0){
            beans.splice(i, 1);            
            out = '';            
            continue;
        }
        
        //beans[i].y = beans[i].y + (delta * 0.1 + (0.01 * (beans[i].life * 0.5)));
        beans[i].velY += delta * 0.004;
        beans[i].y += beans[i].velY;
        beans[i].x += beans[i].velX;
        
        out += beans[i].html();
    }
    
    $("#background").html(out);
}
