// ==UserScript==
// @name        400gb
// @namespace   400gb
// @include     http://www.400gb.com/*
// @version     1
// @grant       none
// ==/UserScript==


function delA(){
    document.title = Math.floor(Math.random()*24);//0-23 
	for (var i = 0; i < document.links.length; i++) {
	var str=String(document.links[i].id);
	var okstr = str.substring(4,0)
	if(okstr == "a_z_"){
    	document.title = String(document.links[i].id);
		document.links[i].style.display = "none";        
		}
	}
    clearInterval(myVar);
}



var myVar = setInterval(delA,1000);

setTimeout(function(){document.body.innerHTML = "<br /><br /><br /><br /><a href='" + document.getElementsByClassName("thunder")[1].attributes[7].value +"'>=======Link Download========</a>";document.body.style.textAlign = "center";},1000);
document.user_form.onsubmit = null;



