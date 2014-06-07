// ==UserScript==
// @name       Unreputed HF Theme Changer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*.hackforums.net/*
// @copyright  2013+, Unreputed
// @run-at		document-start
// ==/UserScript==


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://unrep.net/hf.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]

    if(img.src == "http://x.hackforums.net/images/blackreign/jump.png") {
         img.src = "http://i.minus.com/i2dZ2XL1Syyty.png";
    }

}


var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://x.hackforums.net/images/blackreign/logo.jpg")
{
images[x].src = "http://i.minus.com/i7VD0AisWpvf4.png";
}
x=x+1;
}




var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://unrep.net/hf.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);