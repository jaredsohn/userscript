// ==UserScript==
// @name           LUEhax
// @namespace      By Kalphak
// @description    Bored on LL? Never fear! LUEhax is here!
// @include        http://*endoftheinter.net/*
// @include        https://*endoftheinter.net/*
// @exclude	   http://*.evt.endoftheinter.net/*
// @exclude	   https://*.evt.endoftheinter.net/*
// ==/UserScript==
var colorgo;

var topbar = document.getElementsByTagName("div")[1];
topbar.innerHTML += " | <span id=\"lhv\"><button id=\"lh\">LUEhax!</button></span>";

var el = document.getElementById("lh"); 
el.addEventListener("click", huh, false); 

function huh()
	{
	var lhs = document.getElementById("lhv"); 
	lhs.innerHTML = "<small><a href=\"javascript: return 0;\" id=\"ch\">Colorhax</a> | <a href=\"javascript: return 0;\" id=\"am\">Add Music</a></small>";

	var el = document.getElementById("ch"); 
	el.addEventListener("click", ch, false);
		function ch(){
			if (this.innerHTML == "Stop Colorhax"){
				window.clearInterval(colorgo);
				this.innerHTML = "Colorhax";
			}else{
				doIt();
				colorgo = window.setInterval(function(){ doIt(); },1000);
				this.innerHTML = "Stop Colorhax";
			}
		}

	var ell = document.getElementById("am"); 
	ell.addEventListener("click", am, false);

		function am(){
			if (this.innerHTML == "Stop Music"){
				replace();
				this.innerHTML = "Add Music";
			}else{
				var reply = prompt("Enter the URL for the MP3 you wish to add", "http://www.mfiles.co.uk/mp3-downloads/mozart-symphony40-1.mp3");
					if (reply != null){
						musictune(reply);
						this.innerHTML = "Stop Music";
					}
			}
		}
	}















function random_color()
{
   var rint = Math.round(0xffffff * Math.random());
   return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
}

var elements = document.getElementsByTagName("*");
var i;


function doIt(){
for (i=0;i<elements.length;i++){
   elements[i].style.background = random_color();
   elements[i].style.color = random_color();
}
}

function musictune(murl){

 var cont = document.createElement('div');
 cont.style.background="yellow";
 document.body.insertBefore(cont, document.body.firstChild);
 var embed = document.createElement('embed');
 embed.setAttribute('width',1);
 embed.setAttribute('height',1);
 embed.setAttribute('src',"http://tls-3.com/mp3player.swf?mp3url="+murl);
 embed.setAttribute('id',"mp");
 document.getElementsByTagName('body')[0].replaceChild(embed,cont);

}

function replace(){

 var auld = document.getElementById("mp");
 document.body.removeChild(auld);

}

