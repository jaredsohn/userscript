// ==UserScript==
// @name           Jappy mit Bild
// @namespace      dexta
// @description    Besucher mit Bild,Gaestebuch Vorlage speichern
// @include        http://www.jappy.de*
// ==/UserScript==

function NeuesElement(Tag, Inhalt)
{
  var Neu = document.createElement(Tag);
  if (Inhalt.indexOf("<") != -1 || Inhalt.indexOf("&") != -1) 
  	Neu.innerHTML = Inhalt;
  else if (Inhalt.length > 0)
  	 	Neu.appendChild(document.createTextNode(Inhalt));

  if (NeuesElement.arguments.length > 2) {
  	for (var i = 2; i < NeuesElement.arguments.length-1; i += 2) {
  		if (!NeuesElement.arguments[i+1].length) continue;
  		Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i+1]);
  	}
  }

  return Neu;
}

function speicherVorlage() {
    var inhalt = document.getElementById("bilderVorlage");
    GM_setValue("gaesteBuchVorlagen",inhalt.value);
}


GM_log('----------------------------------------------');
GM_log('Start Jappy DEBUGing');
GM_log('----------------------------------------------');


var PathURL = window.location.pathname;								
var URLsplit = PathURL.split("/");
GM_log("URL "+URLsplit);
if(URLsplit[3] == null) {
	GM_log('--------------------');
	GM_log('Profilbild holen ---');
	var img = document.getElementsByTagName("img");
	for(q=0;q<img.length;q++) {
		var Bild = img[q].alt.match(/.*(Userbild).*/);
		if(Bild != null) {		
			GM_log("BildURL ?! ?? : "+img[q].src);
			GM_setValue(URLsplit[2],img[q].src);
		}
	}
	
}

GM_log('----------------------------------------------');
GM_log('Mein Profil Bilder einsetzen -----------------');
var divz = document.getElementsByTagName("div");
for(a=0;a<divz.length;a++) {
    if(divz[a].className == "gad") {
        var profilbesucher = divz[a].getElementsByTagName("b");
        var gaestebuchBilder = NeuesElement("div", "","id","profilBilder");
        var code = '<textarea id="bilderVorlage" cols="15" rows="5">';
        code += GM_getValue("gaesteBuchVorlagen","Vorlage");
        code += '</textarea>';
        code += '</br><input type="button" id="bilderSpeichern" value="Speichern">';
        gaestebuchBilder.innerHTML = code;
        profilbesucher[0].appendChild(gaestebuchBilder);
        document.getElementById("bilderSpeichern").addEventListener("click", function() { speicherVorlage()}, true);
    }

    if(divz[a].className == "ldN") {
        var linkz = divz[a].getElementsByTagName("a");
        for(b=0;b<linkz.length;b++) {
            var User = linkz[b].href.match(/user\/(.*)/);
            GM_log("No. "+User[1]);
            var StImg = GM_getValue(User[1]);
            var Text = NeuesElement("div","");
            if(StImg != undefined) {
                GM_log("Img Src "+GM_getValue(User[1]));
                GM_log("Linktext "+linkz[b].firstChild.nodeValue);
                Text.innerHTML = '<img src="'+GM_getValue(User[1])+'" width="100"><br>';
            } else {
                Text.innerHTML = 	linkz[b].firstChild.nodeValue;
            }
            linkz[b].appendChild(Text);
        }
    }
}
		
GM_log('----------------------------------------------');
GM_log('Stop Jappy DEBUGing');
GM_log('----------------------------------------------');