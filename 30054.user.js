// ==UserScript==
// @name          Picture Rollover
// @namespace     
// @description      Shows images when rolling over a URL.
// @include       *
// ==/UserScript==

(function() {
var posx=0, posy=0;
var posScreenx=0, posScreeny=0;

function get_coords(event)
{
    posx = event.clientX + window.pageXOffset;
    posy = event.clientY + window.pageYOffset;
    
    posScreenx = event.pageX - window.pageXOffset;
    posScreeny = event.pageY - window.pageYOffset;
}

function createEvent(link)
{
    link.addEventListener("mouseover", function(event)
    {
        get_coords(event);
        var image = document.createElement("img");
        image.setAttribute("src", link.href);

        // if the popup image would exceed the window bounds,
        // scale the image to fit on the screen
        {
            var windowH = window.innerHeight;
            var windowW = window.innerWidth;
            
            var diffX = windowW - (posScreenx + 5 + image.width + 30); // +30 little bit padding
            var diffY = windowH - (posScreeny - 5 + image.height + 20); // +20 little bit padding
    
            var scaleFactorX = 1;
            if(diffX < 0) { // if image is to wide
                var scaleFactorX = 1 + diffX / (image.width); 
            }
    
            var scaleFactorY = 1;
            if(diffY < 0) { // if image is to high
                var scaleFactorY = 1 + diffY / (image.height); 
            }
    
            if(scaleFactorX < scaleFactorY) {
                image.width = image.width * scaleFactorX;
            } else {
                image.height = image.height * scaleFactorY;
            }
        }

        image.setAttribute("style", "position:absolute;z-index:1000;top:" + (posy - 5) + "px;left:" + (posx + 5) + "px;");
        image.setAttribute("id", "rolloverimage");
        document.body.appendChild(image);
    }, false);
    
     link.addEventListener("mouseout", function()
     {
         document.getElementById("rolloverimage").parentNode.removeChild(document.getElementById("rolloverimage"));
    }, false);
}

    for (i = 0; i < document.links.length; i++)
    {
        if (document.links[i].href.search(/\.(?:jp(?:e?g|e|2)|gif|png|tiff?|bmp|ico)$/i) != -1)
        {
            createEvent(document.links[i]);
        }
    }
})();