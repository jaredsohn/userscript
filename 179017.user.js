// ==UserScript==
// @name        CrazyCrunkCookieClicker
// @namespace   orteil.dashnet.org
// @description Destroys all the fun in cookie clicker by cheating. 
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @author      Runbow
// @grant       metadata
// ==/UserScript==

var clicker = document.createElement("input");
clicker.type = "checkbox";
clicker.checked = false;
var clickerLabel = document.createElement("span");
clickerLabel.innerHTML = "Cookie Clicker &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
var golden = document.createElement("input");
golden.type = "checkbox";
golden.checked = false;
var goldenLabel = document.createElement("span");
goldenLabel.innerHTML = "Golden Clicker";

document.getElementById("topBar").appendChild(clicker);
document.getElementById("topBar").appendChild(clickerLabel);
document.getElementById("topBar").appendChild(golden);
document.getElementById("topBar").appendChild(goldenLabel);
document.getElementById("topBar").style.height = "50px";
document.getElementById("game").style.top = "50px";

function getCheating(){
    if(clicker.checked == true){
        document.getElementById("bigCookie").click();
    }
    if(golden.checked == true){
        if(document.getElementById("goldenCookie")!=null){
            document.getElementById("goldenCookie").click();
        }
    }
}

window.setInterval(getCheating, 1);