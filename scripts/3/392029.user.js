// ==UserScript==
// @name       Dotabuff W/L Diff.
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @include  http://dotabuff.com/*
// @include  http://*.dotabuff.com/*
// @require  http://code.jquery.com/jquery-latest.min.js
// @copyright  2012+, You
// ==/UserScript==

function getWinsLossDiff()
{
	var elements = document.getElementById("content-header-secondary").childNodes[1].childNodes[1].childNodes[0].childNodes;
    var won = parseInt(elements[0].innerText.replace(",", ""));
    var loss = parseInt(elements[2].innerText.replace(",", ""));
    
    var diff = won - loss;
    
    var output = "";
    if (diff > 0)
    {
        output = "+";
    }
    else
    {
     	output = "";   
    }
    output += diff;
    
    return output;   
}

function run()
{
   
}

var button = document.createElement('btn');
button.id = "id_btn";
button.href = "#";
button.onclick = function() {run(); return false; };
button.innerHTML = 'Test';
var url = window.location.pathname;

var winsLossDiff = getWinsLossDiff();
var clas = "null";
if (winsLossDiff.indexOf("+") != -1)
{
    clas = "won";
}
else if (winsLossDiff.indexOf("-") != -1)
{
    clas = "lost";  
}
    
var element = document.getElementById("content-header-secondary");

var newNode = document.createElement('div');
newNode.innerHTML = "<dl><dt>W/L Diff.</dt><dd><span class=\"" + clas + "\">" + winsLossDiff + "</span></dd>";
element.insertBefore(newNode.firstChild, element.lastChild);
