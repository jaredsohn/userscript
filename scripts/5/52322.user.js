// ==UserScript==
// @name           Jappy mit Bild V.2
// @namespace      Boxer Thunder | original von dexta
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
	//var formular = document.getElementById("Formular");
	if(GM_getValue(inhalt,inhalt.value) != "")
	{
		GM_setValue("gaesteBuchVorlagen",inhalt.value);		
	}else{	
    	alert("Bitte Feld ausfuellen!");
	}
}

function show() {	
	    if(document.getElementById("bilderVorlage").style.display=="none"){
                document.getElementById("bilderVorlage").style.display="inline";
        }else{
                document.getElementById("bilderVorlage").style.display="none";
        }
	    if(document.getElementById("bilderSpeichern").style.display=="none"){
                document.getElementById("bilderSpeichern").style.display="inline";
        }else{
                document.getElementById("bilderSpeichern").style.display="none";
        }
		if(document.getElementById("minus").style.display=="none"){
                document.getElementById("minus").style.display="inline";
        }else{
                document.getElementById("minus").style.display="none";
        }
		if(document.getElementById("plus").style.display=="inline"){
                document.getElementById("plus").style.display="none";
        }else{
                document.getElementById("plus").style.display="inline";
        }
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
		var code = '';
		code += '<form id="Formular"';
		code += '<input value="+" id="plus" type="button" class="inSc1 fs13 fwB rb5" style="display:inline;border:none;border:1px solid #cecdce;padding:3px 3px 3px 3px;line-height:15px; font-family: Verdana, Arial, Helvetica, sans-serif;font-size:10px;">';
		code += '<input value="-" id="minus" type="button" class="inSc1 fs13 fwB rb5" style="display:none;border:none;border:1px solid #cecdce;padding:3px 5px 3px 5px;line-height:15px; font-family: Verdana, Arial, Helvetica, sans-serif;font-size:10px;">';
		code += '&nbsp;<select name="select" style="border:none;border:1px solid #cecdce;padding:3px 2px;line-height:15px; font-family: Verdana, Arial, Helvetica, sans-serif;font-size:10px;">';
		code += '<option>';
		code += GM_getValue("gaesteBuchVorlagen","Vorlage");
		code += '</select>';
		code += '&nbsp;<input value="" id="bilderVorlage" type="text" style="display:none;border:none;border:1px solid #cecdce;padding:4px 3px;line-height:15px; font-family: Verdana, Arial, Helvetica, sans-serif;font-size:10px;" size="10"/>';
		code += '<br /><input type="submit" id="bilderSpeichern" value="Speichern" class="inSc1 fs13 fwB rb5" style="margin-top:3px;display:none;border:none;border:1px solid #cecdce;padding:3px 0px 3px 0px;line-height:15px; font-family: Verdana, Arial, Helvetica, sans-serif;font-size:10px;">';
		code += '</form>';		
        gaestebuchBilder.innerHTML = code;
        profilbesucher[0].appendChild(gaestebuchBilder);
		//document.getElementById("plus").style.display = 'none';
		document.getElementById("plus").addEventListener("click", function() { show()}, true);
		document.getElementById("minus").addEventListener("click", function() { show()}, true);
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
                //Text.innerHTML = 	linkz[b].firstChild.nodeValue;
				Text.innerHTML = '<img src="http://s2.jappy.tv/i/ge/gKb.gif" width="100"><br>';
            }
            linkz[b].appendChild(Text);
        }
    }
}
		
GM_log('----------------------------------------------');
GM_log('Stop Jappy DEBUGing');
GM_log('----------------------------------------------');