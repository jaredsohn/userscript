// ==UserScript==
// @name          Bei-uns.de GalerieBox
// @description   Fuegt eine Box mit den neusten Bildergalerien ein
// @include       *bei-uns.de*
// ==/UserScript==

//
// By Madboy 2008
//

function showhidel(){
  ebenenX = document.getElementsByTagName('div')
  if(document.getElementById('galerieanzeigen2').style.visibility=='hidden'){
    document.getElementById('galerieanzeigen2').style.visibility='visible';
  }
  else{
    document.getElementById('galerieanzeigen2').style.visibility='hidden';
  }
}

function GalerieListe(){
	if(fuck1==0){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.bei-uns.de/gruppe/events-szene/galerien/",
			onload: function(xhr2) {
				xhr2.responseText;		
				var gal = xhr2.responseText;
				var anline = '<div id="galerien">';
				var ppx1 = gal.indexOf(anline, ppx1);
				ppx1 += anline.length;
				var ppx2 = gal.indexOf('<div class="seitenNav">', ppx1);
				neuneu = gal.substring(ppx1, ppx2);
				var elm = document.getElementById("sa");
				var elm_parent = elm.parentNode;
				var div = document.createElement("div");
				elm_parent.insertBefore(div, elm);
				div.innerHTML = '<div id="galerieanzeigen2" style="position: absolute; width: 400px; height: 20px; z-index: 156; left:450px; top:65px"><div align="left"><table border="0" width="400" cellpadding="0" align="left" bgcolor="#FFFFFF" style="border-collapse: collapse"><tr><td bgcolor="#000000" width="4"></td><td width="396">' + neuneu + '</td></tr></table></div></div>';
    			}
		});
	fuck1 = 1;
  	}
  	else{
  		showhidel();
  	}

}

var fuck1 = 0;

var elm = document.getElementById("sa");
var elm_parent = elm.parentNode;
var div22 = document.createElement("div");
elm_parent.insertBefore(div22, elm);
div22.innerHTML = '<div id="eventsymbol" style="position: absolute; width: 20px; height: 20px; z-index: 155; left:450px; top:40px"><img border="0" onclick="GalerieListe()" src="http://thepartyside.th.funpic.de/pics/cam.png" alt="Neuste Eventgalerien zeigen...">';
div22.addEventListener("click", GalerieListe, false);

