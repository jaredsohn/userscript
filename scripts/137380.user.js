// ==UserScript==
// @name        Google Books Fullscreen
// @namespace   SKashyap
// @include     http://books.google.*/books?*
// @version     1
// ==/UserScript==
//

var topBlock = document.getElementById("gb");
var sideBar = document.getElementById("menu_td");
var state = 0;

function GBFindButtonID(){
    possibleIds = [":1",":2",":3",":4",":5",":6",":7"];
    for (var i = 0; i < possibleIds.length; i++){
        var temp = document.getElementById(possibleIds[i]);
        if (temp.innerHTML.search("maximize.png")>=0){
            return possibleIds[i];
        }
    }
}
function GBHideElements(){
    topBlock.style.display="none";
    sideBar.style.display="none";
}

function GBShowElements(){
    topBlock.style.display="";
    sideBar.style.display="";
}

function GBToggle(){
    state=state^1;
    if (state) GBHideElements();
    else GBShowElements();
}

var button = document.getElementById(GBFindButtonID());
button.addEventListener("click", GBToggle, false);

if (document.URL.search("&f=true")>=0){
    GBHideElements();
    state=1;
}

var css = ".kd-appbar { padding: 5px 0px !important; }";
GM_addStyle(css);
