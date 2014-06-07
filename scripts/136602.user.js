// ==UserScript==
// @name		HF Theme
// @namespace	http://use.i.E.your.homepage/
// @version		1
// @description	HF Theme
// @copyright	2013+, chk
// @include		*hackforums.net/*
// @run-at		document-start
// ==/UserScript==


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://dl.dropboxusercontent.com/u/38902532/s/hf.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]

    if(img.src == "http://x.hackforums.net/images/blackreign/jump.png") {
         img.src = "http://dl.dropboxusercontent.com/u/38902532/s/arrow.png";
    }

}


var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://x.hackforums.net/images/blackreign/logo.jpg")
{
images[x].src = "http://dl.dropboxusercontent.com/u/38902532/s/hf2.png";
}
x=x+1;
}

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://x.hackforums.net/images/blackreign/logo.gif")
{
images[x].src = "http://dl.dropboxusercontent.com/u/38902532/s/hf2.png";
}
x=x+1;
}


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://dl.dropboxusercontent.com/u/38902532/s/hf.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);