// ==UserScript==
// @name           FixOpacity (eRepublik)
// @namespace      www.erepublik.com
// @description    Removes blur when battle ends battle
// @author         Erepb1991
// @version        1.0
// @include http://www.erepublik.com/*

// ==/UserScript==

window.addEventListener('load', waitForCountDown, false);



function waitForCountDown(){
    var countDown = document.getElementById("battle_countdown").innerHTML;
    var q = new Date();
    if(countDown != ""){
        q.setHours(countDown.substr(0, 2), countDown.substr(3, 2), countDown.substr(6, 2));
        if((q.getHours() !=0) || (q.getMinutes() != 0) || (q.getSeconds() != 0)){
            var wait = (((q.getHours()*60) + q.getMinutes())*60 + q.getSeconds()) * 1000;
			if(wait > 10000){
				setInterval(waitForCountDown, wait/2);
			}else{
				setInterval(fixOpacity, wait);
			}
        }
    }else{
        fixOpacity();
    }
}


function fixOpacity() {
	var blur = document.getElementsByClassName("blockOverlay")[0];
    blur.style.opacity = 0;
}
