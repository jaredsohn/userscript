// ==UserScript==
// @name           Karachan Name Changer
// @description    kupa
// @version        1.0
// @namespace      http://userscripts.org/users/324269
// @include        http://www.karachan.org/*
// @include        http://karachan.org/*
// ==/UserScript==

/////////////////////////
function checkBoard(){
    var l = new String(document.location.href); 
    return l.split("/")[3];
}

function init(){
	if(checkBoard() == "b"){
		var link = document.createElement("span");
		link.innerHTML = "<br />zmień nazwę<br />";
		link.style.fontSize = "10px";
		link.style.color = "#fff";
		link.style.textDecoration = "underline";
		link.style.cursor = "pointer";
		link.addEventListener("click", renameBoard, false);
		document.getElementsByClassName("logo")[0].appendChild(link);
		main();
	}
}

function getCookie(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for(i=0;i<ARRcookies.length;i++){
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name){
        return unescape(y);
        }
    }
}

function renameBoard(){
	var name = prompt("Wpisz nową nazwę boarda: ");
    document.cookie = "rb_name="+name;
	if(name != null) main();
}

function main(){
	if(getCookie("rb_name") == undefined){
        document.cookie = "rb_name=Kliknij aby ustawic nazwe";
	}
	else{	
	   if(checkBoard() == "b"){   
	       var n = getCookie("rb_name");
	       document.title = n;
	       document.getElementsByClassName("logo")[0].childNodes[5].textContent = n;
	   }
	}
}

window.addEventListener("load", init, false);
