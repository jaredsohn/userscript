// ==UserScript==
// @name        [STYLE] Facebook New Style
// @namespace   Vinicius W Haas
// @include     http://www.facebook.com/*
// @version     1
// ==/UserScript==

function main(){

document.body.style.backgroundColor="#999999";

var newbodie = getFirstResult("//div[@id='blueBarHolder']/div[@id='blueBar']"); // The top bar , set to gradient 
if(newbodie){newbodie.setAttribute("style",
"background: rgb(125,126,125);"+
"background: -moz-linear-gradient(top,  rgba(125,126,125,1) 0%, rgba(14,14,14,1) 100%);"+
"background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(125,126,125,1)), color-stop(100%,rgba(14,14,14,1)));"+
"background: -webkit-linear-gradient(top,  rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%);"+
"background: -o-linear-gradient(top,  rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%);"+
"background: -ms-linear-gradient(top,  rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%);"+
"background: linear-gradient(to bottom,  rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%);"+
"filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7d7e7d', endColorstr='#0e0e0e',GradientType=0 );"
);
    var bla = newbodie.getElementsByTagName("a");
    for(var i = 0; i < bla.length; i++) {
       	bla[i].style.Color="#666666";
    }
}

newbodie = getFirstResult("//div[@class='coverImage coverNoImage']");
if(newbodie)newbodie.style.backgroundColor="#666666";

var bla = document.getElementsByTagName("a");
for(var i = 0; i < bla.length; i++) {
	bla[i].setAttribute("style","Color:gray");
}

newbodie = getFirstResult("//div[@id='leftCol']");
if(newbodie){
    var bla = newbodie.getElementsByTagName("a");
    for(var i = 0; i < bla.length; i++) {
       	bla[i].setAttribute("style","Color:white");
    }
}
}
setInterval(main,1000);

function getFirstResult(expr, node){
    if (!node) {node = document;}
	var result = document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
}