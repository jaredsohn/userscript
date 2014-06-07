// ==UserScript==
// @name           Keyboard Shortcut For Twitter
// @namespace      http://www.nextword.net
// @description    Keyboard shortcut for twitter, not finish yet. Right now it is working for key 「Esc」、「h」、「j」、「k」、「n」、「o」. 「Esc」is jump in/out twitter's text input box. The other keys work only when input box lost its foucs.「j」:jump(go down) to next message. 「k」 kick(go up) to previous message. 「o」 Older message. 「n」 Newer message. 「h」 twitter home page.
// @include        http://twitter.com/*
// ==/UserScript==
/**
 * @author Brecht 
 */

keyNum = {
    "27": "Esc",
    "65": "a",
    "72": "h",
    "73": "i",
    "74": "j",
    "75": "k",
    "78": "n",
    "79": "o",
    "82": "r",
    "84": "t"
};

getKey = function(e){
    responseKey(keyNum[e.which]);
}
responseKey = function(k){
    switch (k) {
        case "a":   
         //add to favaorite
		 // addFav();
            break;
        case "Esc":
            insert();
            break;
        case "h":
            goHome();
            break;
        case "j":
            jump();
            break;
        case "k":
            kick();
            break;
        case "n":
            getPrePage();
            break;
        case "o":
            getNextPage();
            break;
        case "r":
            //reply();
            break;
        case "t":
           //retweet
            break;
    }
}
function getPageLink(tar){
    var newUrl = "";
    var elmSet = document.getElementsByTagName("a");
    for (var i = (elmSet.length - 1); i >= 0; i--) {
        if (elmSet[i].firstChild.nodeType == 3 && elmSet[i].firstChild.nodeValue.indexOf(tar) >= 0) {
            newUrl = elmSet[i].getAttribute("href");
        }
    }
    if (newUrl) {
        location.pathname = newUrl;
    }
}

getNextPage = function(){
    getPageLink("Older");
}
getPrePage = function(){
    getPageLink("Newer");
}
goHome = function(){
    location.pathname = "/home";
}
insert = function(){
    document.getElementById("status").focus();
}
escape = function(event){
    if (event.which == '27') {
        document.getElementById("status").blur();
    }
}

reply = function(){
 //var a = tdElm[1][2].getElementsByTagName("a");
 //eval("window."+a[1].getAttribute("onclick"));

}

stop = function(){
    document.removeEventListener('keydown', getKey, false);
    document.addEventListener('keydown', escape, false);
}
start = function(){
    document.addEventListener('keydown', getKey, false);
}

jump = function(){
    if (!isJump) {
        twitPos++;
        isJump = true;
    }
    if (twitPos < 20) {
        if (twitPos > 0) {
         tlElm[twitPos - 1].style.backgroundColor = "#FFFFFF";
		 //clearBg(twitPos - 1);
          document.getElementById("jb"+(twitPos-1)).value = "";
        }
        tlElm[twitPos].style.backgroundColor = "#FFFFCC";
  var jb = document.getElementById("jb"+twitPos);
  jb.focus();
        twitPos++;
    }
}
kick = function(){
    if (isJump) {
        twitPos--;
        isJump = false;
    }
    if (twitPos > 0) {
        tlElm[twitPos].style.backgroundColor = "#FFFFFF";
		//clearBg(twitPos);
        twitPos--;
        tlElm[twitPos].style.backgroundColor = "#FFFFCC";
  var jb = document.getElementById("jb"+twitPos);
  jb.focus();
        
    }
}


clearBg = function(id){
    document.getElementById(id).style.backgroundColor = "#ffffff";
}

var inputBox = document.getElementById("status");
inputBox.addEventListener('focus', stop, false);
inputBox.addEventListener('blur', start, false);
window.addEventListener('load', function(){
    document.getElementById("status").blur();
}, false);

var tl = document.getElementById("timeline");
var tlElm = tl.getElementsByTagName("tr");
var tdElm = [];

for(var i=0;i<tlElm.length;i++){
 tdElm[i] = tlElm[i].getElementsByTagName("td");
}

for(var i=0;i<tdElm.length;i++){
 var cnt = tdElm[i][2];
 var jumpBox = document.createElement("input");
 jumpBox.style.width ="5px";
 jumpBox.style.height = "5px";
 jumpBox.style.opacity = "0";
 jumpBox.setAttribute("id",("jb"+i))
 cnt.appendChild(jumpBox);
}

twitPos = 0;
isJump = false;

