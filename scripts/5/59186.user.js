// ==UserScript==
// @name          Toggle Chess.com alerts
// @description   Allows you to toggle the displaying of the Chess.com alerts
// @namespace	 By AlphaMarkOmega - marklarah@gmail.com
// @include http://www.chess.com/*
// ==/UserScript==

// Version 1


function makeSpan(old, ele, type){
    var messagesDiv = document.getElementById(old);
    var newEle = document.createElement("span");
    newEle.id = ele;
    var curState = GM_getValue(ele,true);
    messagesDiv.style.display = (curState==true) ? "" : "none";
    var nodes = messagesDiv.firstChild.children;
    newEle.innerHTML = "<a href=\"#\" onclick=\"return false;\">Toggle " + type +" (<b>" + nodes.length + "</b>)</a>";
    messagesDiv.parentNode.insertBefore(newEle, messagesDiv);
    newEle.addEventListener("click", showHideElement, false);
}

makeSpan("c3", "messages", "Messages");
makeSpan("c5", "games", "Chess Games");
makeSpan("c11", "activity", "Group Activity");

function showHideElement(){
    if (this.nextSibling.style.display=="none"){
        this.nextSibling.style.display="";
        GM_setValue(this.id,true)
    }else{
        this.nextSibling.style.display="none";
        GM_setValue(this.id,false)
    }
}