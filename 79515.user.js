// ==UserScript==
// @name           Pie Polls for What
// @namespace      http://google.com
// @description    Displays pie charts on What.CD forum polls
// @include        http*://*what.cd/forums.php?action=viewthread*
// ==/UserScript==

//Draws a pie slice to canvas context
function drawSlice(ctx, hue, r, start, width) {
    ctx.fillStyle = "hsl("+hue+",50%,50%)";
    ctx.beginPath();
    
    ctx.moveTo(r, r);
    ctx.lineTo(r+Math.cos(start)*r, r+Math.sin(start)*r);
    for (var a=start; a<start+width; a+=Math.PI/50) {
        ctx.lineTo(r+Math.cos(a)*r, r+Math.sin(a)*r);
    }
    ctx.lineTo(r+Math.cos(start+width)*r, r+Math.sin(start+width)*r);
    ctx.closePath();

    ctx.fill();
}

/**********************************************************************/

var chartR = GM_getValue("r", 150) * 1;
GM_registerMenuCommand("Change poll chart radius", function(){
    var new_r = prompt("Radius of chart?", GM_getValue("r", 150))
    if (new_r)
        GM_setValue("r", new_r);
});

var threadpoll = document.getElementById("threadpoll")

if (threadpoll && document.getElementById("threadpoll").getElementsByTagName(
"form").length==0) {
    //Get the title of the poll
    var title = threadpoll.getElementsByTagName("strong")[0].innerHTML;
    var hue = 0;

    //get list of the options
    var options = [ ];
    var optionsElem = threadpoll.getElementsByTagName("li");
    for (var i=0; i<optionsElem.length; i+=2) {
        var t = optionsElem[i].innerHTML;
        var match = /(.+) \((.+)%\)/.exec(t);
        var col = hue;
        hue += 35;
        options.push([match[1], match[2], col])
    }
    
    /**********************************************************************/
    // Create the graph
    threadpoll.innerHTML = '';
    var canvas = document.createElement("canvas");
    canvas.width = canvas.height = 2*chartR;
    threadpoll.appendChild(canvas);

    //create HTML legend
    var legend_div = document.createElement("div");
    var legend = document.createElement("ol");
    legend.style.backgroundColor = "white";
    legend_div.appendChild(legend);
    for (var i=0; i<options.length; i++) {
        var item = document.createElement("li")
        item.style.color = "hsl("+options[i][2]+",50%,50%)";
        item.innerHTML = options[i][0]+" ("+options[i][1]+"%)";
        //add a colour swatch
        var swatch = document.createElement("span");
        swatch.innerHTML = "####";
        swatch.style.backgroundColor = "hsl("+options[i][2]+",50%,50%)";
        item.appendChild(swatch);
        legend.appendChild(item);
    }
    //threadpoll.innerHTML += legendContent;
    threadpoll.appendChild(legend_div);
    //Draw the graph
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(200,200,200)";  
    ctx.beginPath();
    ctx.arc(chartR,chartR, chartR+1, 0,Math.PI*2, false);
    ctx.fill();

    //draw slices
    var angle = 0; //current angle
    for (var i=0; i<options.length; i++) {
        var sliceWidth = options[i][1]*1 / 100.0 * Math.PI*2
        drawSlice(ctx, options[i][2], chartR, angle, sliceWidth);
        angle += sliceWidth;
    }
}
