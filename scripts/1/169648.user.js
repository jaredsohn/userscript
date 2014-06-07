// ==UserScript==
// @name       E.hentai Auto Scroll Down
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://g.e-hentai.org/*
// @require			http://code.jquery.com/jquery-latest.min.js
// @copyright  2012+, You
// ==/UserScript==

var button = document.createElement("button");
button.style.position = "fixed";
button.style.top = "0";
button.style.left = "-20px";
button.style.zIndex = 999;
button.onclick = _load;
button.innerHTML = "load";
document.body.appendChild(button);

function _load(){
    button.max = parseInt(document.getElementsByTagName("span")[1].innerHTML);
    if(button.autoload == undefined && button.max){
        button.autoload = setInterval(function(){
            if($("div[id^='i'] > a > img").last()[0].complete)
            	window.scrollTo(0,document.body.scrollHeight);
            if(document.getElementById("autopager_" + button.max) != null){
				_finish();             
			}
        },100);
    }
    else{
		_finish();
    }
}

function _finish(){
    clearInterval(button.autoload);
    button.autoload = undefined;
    window.scrollTo(0,0);
}