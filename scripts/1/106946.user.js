// ==UserScript==
// @name           ICHC Block Text
// @namespace      no u
// @include        http://www.icanhazchat.com/*
// @include        http://icanhazchat.com/*
// @version        1.0
// ==/UserScript==
LoadMeTender();
var blocktextarea;
var blocktextbutton;
function LoadMeTender(){


blocktextbutton = document.createElement("span");
blocktextbutton.setAttribute("style", "cursor:pointer;margin-left:10px;text-decoration:underline;font-weight:bold;color:navy");
blocktextarea = document.createElement("textarea")
blocktextarea.setAttribute("cols", "50")
blocktextarea.setAttribute("rows", "3")


blocktextbutton.innerHTML = "Send";
document.getElementById("lblDynamicFootLink").appendChild(blocktextarea);
document.getElementById("lblDynamicFootLink").appendChild(blocktextbutton);
blocktextbutton.addEventListener("click", SendBlock,true); 
menu =  document.getElementById("menutable");
}
var lines;
var i;
var timer777;
function SendBlock(){
i =0;
var text = blocktextarea.value;
lines = text.split("\n");
timer777 = setInterval(SendNext , 1080);
}

function SendNext(){
document.getElementById("txtMsg").value = lines[i];
document.getElementById("btn").click();
i++;
if (i >= lines.length) {clearInterval(timer777);}
}
