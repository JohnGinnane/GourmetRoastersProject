let beans = [];
const rate = 50;
const maxlife = 500;
// Use pooling to improve performance
const maxBeans = 50;
let x = 0;
let lastTime = new Date();
let delta = 0;

document.addEventListener("DOMContentLoaded", function() {
    // Have little coffee beans fall down as the mouse moves
    $("#body").mousemove(function (e) {
        x += delta;
            
        if (x >= rate){
            x = 0;
            createBean(e.pageX - 32, e.pageY - 100);
        }

        if (x >= 255) { x = 0; }
        
        out = '';
        
    });
    
    setInterval(update);
});

function createBean(x, y) {
    let foundBean = false;

    // Try to find an inactive bean
    for (let i = 0; i < beans.length; i++) {
        if (!beans[i]) { continue; }

        if (!beans[i].active) {
            foundBean = beans[i];
            break;
        }
    }

    // If we couldn't find an inactive bean then we need to create a new one
    if (!foundBean && beans.length < maxBeans) {
        // Create a new bean
        foundBean = {};
        // Clone node and set aesthetics ONCE
        foundBean.html = function() {
            // Each time we call the code we need to update position
            foundBean.node.style.top = foundBean.y + "px";
            foundBean.node.style.left = foundBean.x + "px";
            foundBean.node.setAttribute("transform", "rotate(" + foundBean.angle + ")");
            return foundBean.node.outerHTML;
        }

        foundBean.node = document.querySelector("svg.svg-bean").cloneNode(true);
        beans.push(foundBean);
    }
    
    // With our bean lets reset position, colour, etc.
    if (foundBean) {
        foundBean.active = true;
        foundBean.life = maxlife;
        foundBean.colour = Math.round(20 + Math.random() * 15);
        foundBean.x = x;
        foundBean.y = y;
        foundBean.velY = randomNumber(0, -0.5);
        foundBean.velX = randomNumber(-0.2, 0.2)
        foundBean.angle = randomNumber(0, 360);
        foundBean.angularVelocity = randomNumber(-0.5, 0.5);
        let scale = Math.random() * 8;
        foundBean.width = 24 + scale;
        foundBean.height = 24 + scale;

        foundBean.node.style.position = "absolute";
        foundBean.node.querySelector("g>path").style.fill = tinycolor("hsl(27, 100%, " + foundBean.colour + "%)");
        foundBean.node.setAttribute("width", foundBean.width);
        foundBean.node.setAttribute("height", foundBean.height);
        foundBean.node.style.display = "block";
        foundBean.node.setAttribute("transform", "rotate(" + foundBean.angle + ")");
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function update(){
    // Need to get the time since the last update
    // to make physics consistent across machines
    delta = new Date() - lastTime;
    lastTime = new Date();

    let out = '';
    
    // Iterate over all beans, and:
    // 1. Reduce life
    // 2. Make inactive if necessary
    // 3. Change position based on velocity
    // 4. Change velocity based on gravity
    for(i = 0; i < beans.length; i++) {
        let bean = beans[i];

        if (bean.life <= 0 && bean.active) {
            bean.active = false;
            continue;
        }
        
        if (bean.active) {
            bean.life = bean.life - (0.2 * delta);
            
            bean.velY += delta * 0.002;
            bean.y += bean.velY * delta;
            bean.x += bean.velX * delta;
            bean.angle += bean.angularVelocity * delta;
        
            out += bean.html();
        }
    }
    
    $("#background").html(out);
}
