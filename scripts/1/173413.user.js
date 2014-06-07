// ==UserScript==
// @name       AnimeUltima Chat Ripper
// @namespace  http://use.i.E.your.homepage/
// @version    0.9
// @description  Adds a button to make the chat at animeultima.tv "float" above the page in a fixed position.
// @match      http://www.animeultima.tv/*
// @copyright  2013+, Woop65
// ==/UserScript==
var chatdiv = document.getElementsByClassName('side-box')[0];
chatdiv.style.backgroundColor = 'white';
var r=false;
window.addEventListener("load", function(e) {
    addButton();
}, false);

function addButton(){
    chatdiv.innerHTML = chatdiv.innerHTML + '<input id="ripbutton" type="button" value="Rip Chat" />';
    addButtonListener();
}

function addButtonListener(){
    var button = document.getElementById("ripbutton");
    button.addEventListener('click',rip,true);
}
function rip()
{
    if (!r)
    {
        chatdiv.style.position = 'fixed';
        r=true;
        document.getElementById("ripbutton").value = "Put It Back";
    }
    else
    {
        chatdiv.style.position = '';
        r=false;
        document.getElementById("ripbutton").value = "Rip Chat";
    }
}

