// ==UserScript==
// @name          Bei-uns.de BerichteBox
// @description   Fuegt eine Box mit den neusten Berichten ein
// @include       *bei-uns.de*
// ==/UserScript==

//
// By Madboy 2008
//

function showhidelfg(){
  ebenenX = document.getElementsByTagName('div')
  if(document.getElementById('galerieanzeigen27476').style.visibility=='hidden'){
    document.getElementById('galerieanzeigen27476').style.visibility='visible';
  }
  else{
    document.getElementById('galerieanzeigen27476').style.visibility='hidden';
  }
}

function BerichteListe(){
	if(f_uck1fd==0){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.bei-uns.de/berichte/",
			onload: function(xhr25324) {
				xhr25324.responseText;		
				var galw54734 = xhr25324.responseText;
				var anline4353245 = '<div class="seitenNav">';
				var ppx1tgfd = galw54734.indexOf(anline4353245, ppx1tgfd);
				ppx1tgfd += anline4353245.length;
				var ppx256gdh = galw54734.indexOf('<div id="fusszeile">', ppx1tgfd);
				neuneu345345 = galw54734.substring(ppx1tgfd, ppx256gdh);
				var elm = document.getElementById("sa");
				var elm_parent = elm.parentNode;
				var div = document.createElement("div");
				elm_parent.insertBefore(div, elm);
        div.innerHTML = '<div id="galerieanzeigen27476" style="position: absolute; width: 400px; height: 20px; z-index: 156; left:510px; top:65px"><div align="left"><table border="0" width="400" cellpadding="0" align="left" bgcolor="#FFFFFF" style="border-collapse: collapse"><tr><td bgcolor="#000000" width="4"></td><td width="396">' + neuneu345345 + '</td></tr></table></div></div>';
    			}
		});
	f_uck1fd = 1;
  	}
  	else{
  		showhidelfg();
  	}

}

var f_uck1fd = 0;

var elm = document.getElementById("sa");
var elm_parent = elm.parentNode;
var div22dsfg = document.createElement("div");
elm_parent.insertBefore(div22dsfg, elm);
div22dsfg.innerHTML = '<div id="berichtsymbol" style="position: absolute; width: 20px; height: 20px; z-index: 155; left:510px; top:40px"><img border="0" onclick="BerichteListe()" src="http://home.arcor.de/fh-ingolstadt/bei-uns/berichte.png" alt="Neusten Berichte anzeigen...">';
div22dsfg.addEventListener("click", BerichteListe, false);

