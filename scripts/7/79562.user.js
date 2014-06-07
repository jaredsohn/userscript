// ==UserScript==
// @name           WKW-Einlader
// @author         Schlumpf
// @version        1.3.2
// @description    Läd alle die du kennst in zu einer Gruppe ein (v1.3.2)

// @namespace      http://userscripts.org/users/schlumpf
// @include        http://www.wer-kennt-wen.de/club/invite/*
// ==/UserScript==



// Variablen
var id = String(String(document.URL.match(/invit\w+\/\w+/)).match(/\/\w+/)).substr(1);
var modus = 0;			// [0=seiten_lesen / 1=einladen]

var personen = "sent=1";
var pers_array = new Array();
var anz_pers = 0;

var seiten = 0;
var seite = 0; 			// Aktuelle Seite

var anz_einladung = 0;	// Anzahl der Einladungen
var akt_einladung = 0;	// Aktuelle Einladung

var icon_ok = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM/SURBVDiNZZNtSJ1lHMZ/9/3c5+w5x47spGdTZr7kCxtNNs80OuwFKhvUJqyW2If2YTsGldEnFxEjaBEtahFFMEJzRF8KLDZkyKj5ob1Y5CmZW4J63Gy6Sj2m5/E8ep6Xuy9NhF2fr+v34f+/LqG1Zr3iSRUDWoRgj2GovaA9z/Mua81l4Hyq282s94v1gHhSPRfbWNJz+Il285GqxmBdWQMBI8jYzDAj6V9Wv+7/1F5YmjuS6nb77gPsalc9ie1PtbXtfzk0PH2J9Nxv3FkcxZCSiqLt1MQa2bnlSXrOn7YHb/xwdqjLfXUNEE+qtkR9c8++pv2hvuEz/OtMozYIjIBACIH2NZ6jKTLLeT7+Bhev9a7ezAx81v+WdVw0HDM2RQtj4+2HOiO9Q59g63kCIUnAlKgNAmmA74G7qnFWfB576Fme2drBuz8e1Nn5lXoJHEnUN5s/j/eztDKHkAJpCAwFKigIhgxUUCAVNG97kc4DX7IpUkltNIE0xPtSCPZFC4sD6b9vwL17athd1UpppBatNQJB284TvPb4GQyhAGgqOSSCZuBRZQbDTb52WbTmCYYlQkuOJk7RsqODWWuK9y4doLXpbXZXtgKQz+dxHIfCwGYWJqSrpJCmlVtCe+C7msPxTlp2dAAQe6Ccjw4OoWRw7dW2bXPx+lcs2H/heHlT2s7ysOPkUcLEczTfXDnNT398vxZYH7asLF0DJ+j99WOy1iIr+dyQUdogqqLRB/e6jiutlUW09rgydo7NkXLKi7cB4DgOmcU5Tp07ysDItxSFy8jbvnN3duqsUdIgZ5dzVnJrdX1g+p8pfO3j+z6DYxcIGxuJhSuZmb3Fye9e4Prtq0gvSF1JIzcnUvnVvP260Fqz66XAO9UVdccLIqHQaHoEIX2kAiklT9cnuTbRR8a6i/ANakobyFpLuck7oyeHutwP7jVRKWX8XlVRXVVcXBSenB5nIZNBCx8AKQ0iZpTKLbXMZ2Zzt2fSo57rNaW6XX9tC/GkCklDfFgQihx7uKYiFDIL8Pw8WoPCJGdbpCdv5Zbt7Bfa12+mut3V+9b4P2iPERCvCCETSgTL0OCS/1Nr/6rn6M9T3e7gev9/yxRxCufCng4AAAAASUVORK5CYII=";

var icon_wt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKfSURBVDiNbZNPaFxVFMZ/5743773JmyaZRQORgWBAW2q1oCDR1kUkG1eKuChOCiI0dePKpTsX7bpu3LmQTlt0ExBxI7RCXYRsgjstpUhS/3QMncm89yZz5917XMwfptgL3+bynd/9zr3niqoyu1oideAdA2sBXACsg3sedoAfmqrFrF9mAS2R98I4/nqp0YjrSVJdqFTEDwZ0ul1t53neOTrKnOrFpurP/wPcFvmm1mi8/9KpU2ltfx/TbhPkOQYginBJwj/Ar51O7svy+kXVzwFQVW7A5o+rq/nBxoYeLC7q3yL6JEn0yd072q/XtRDRroj+G8f6x8KCfmtMdgM2VBXTEnkuStOvXjh7ds7u7KDdLgaQJEFfeZlwfp4ARkmsJSwKXoyi1MDNlsi8ATYb584l3L+PzzIUpgIoAQf4yV5ZsuA9J0QS4F0TwNsnTp4M7aNH+LHRjQsB7FgTkAOcc9SgZuC8kUrl1ShNGfZ6ONVpsX/zjVGCK1tTyHACUCUBEXjLqEgFVZwq5dg0BPz6+ijCpc1p8USl95OWIqPW7vWPj9FabQRQxapSXP8S9/AhkqaYa1cZTACqlMYwnqZfjIe72eGhl+Xlp07pHxzQfn2NwfY2ydZl5MJ5rOooQRCQQ+bhngFu/bm3NwjOnMFVqwxnLs46x+OtT2h/9DHFb7+PWgkCsiAgH03g96Kq3BT5rH769BfLS0tzxe4u0u+PZmGs6dOGIVqtsl8U2dC5y03V26KqtERERH5aXF1dW1pZmSsfPMAdHuLzHBHBxDESx9gw5PHRUTa0dvtD1UtP/YWWiACfVtL0Wn1lJYqjKKyI4K3luNejn2WDXqdjvfdXmqq3nvkbx6DngQ8E1sWY11R1iOquwh3gu6bqX7P+/wDva14U9cQh5QAAAABJRU5ErkJggg==";

var warten = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";



// Neue Elemente erstellen
var divNode = document.createElement('div');
	divNode.setAttribute('align','right');

var messageNode = document.createElement('div');
	messageNode.setAttribute('style','border: 1px solid rgb(221, 221, 221); padding: 5px; margin-top: 5px;');

var warteNode = document.createElement('div');
	warteNode.setAttribute('style','border: 1px solid rgb(221, 221, 221); padding: 5px; margin-top: 5px;background-color: #EFEFEF;');

var buttonNode = document.createElement('input');
	buttonNode.setAttribute('type','button');
	buttonNode.setAttribute('value','Alle die ich kenne einladen');
	buttonNode.addEventListener('click', alle_suchen2, false);

var button2Node = document.createElement('input');
	button2Node.setAttribute('type','button');
	button2Node.setAttribute('value','JA, einladen!');
	button2Node.addEventListener('click', einladungen_zaehlen, false);

var button4Node = document.createElement('input');
	button4Node.setAttribute('type','button');
	button4Node.setAttribute('value','weiter machen');
	button4Node.setAttribute('id','button4');
	button4Node.addEventListener("click",captcha_absenden,false);

divNode.appendChild(buttonNode);
document.getElementsByTagName('form')[4].appendChild(divNode);



//Alle Personen suchen
function alle_suchen2(){
	buttonNode.disabled =true;
	document.getElementsByTagName('form')[4].appendChild(warteNode);
	document.getElementsByTagName('form')[4].appendChild(messageNode);
	messageNode.innerHTML = "<h3><img src="+warten+" alt='' /> Bitte warten...</h3>";
	warteNode.innerHTML = "<h3>WKW-Einlader</h3>";
	warteNode.innerHTML += "- zähle Seiten... ";

	//Seiten zählen
	seiten = seiten_zaehlen();
	warteNode.innerHTML += seiten+" Seiten gefunden.<br />- lese Seiten: ";
	for(i = 0; i < seiten; i++){
		warteNode.innerHTML += "<img src="+icon_wt+" id='icon_"+i+"' alt='warteAufSeite"+i+" ' /> ";
	}

	//Seiten lesen
	seite_lesen();
}



//Seite ber Ajax laden und lesen
function seite_lesen(){
	//alert(seite); //DEBUG
	if(seite < seiten){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.wer-kennt-wen.de/club/invite/"+id+"/sort/friends/0/1/"+(seite*20),
			onload: function(response) {
				//alert("Seite "+seite+" geladen, lese..."); //DEBUG
				if(response.responseText.search(/Gleich geht es weiter/) > 0){
					warteNode.innerHTML += "<br />- auf Captcha gestoßen, bitte eingeben (siehe unten).";
					messageNode.innerHTML = '<h3>WKW Captcha gegen Bots</h3><div style="z-index:-100"><img src="http://wkw.ivwbox.de/cgi-bin/ivw/CP/ruk_captcha;" width="1" height="1" alt="szmtag" /></div><iframe src="http://api.recaptcha.net/noscript?k=6LclbQIAAAAAACO4sj4OQ4JrDVpsiDds7X6jt9LD" height="300" width="750" frameborder="0"></iframe><br />Bitte das Captcha da oben eingeben und mit "I\'m a human" bestätigen. Dann den erhaltenen Code hier unten einfügen und auf "Weiter machen" klicken."<br /><textarea id="recaptcha_challenge_field" rows="3" cols="40"></textarea><br />';
					messageNode.appendChild(button4Node);

				}else{
					Ergebnis = response.responseText.match(/<input type="checkbox" name="users\[\]" value="\w+" \/>/g);
					if(Ergebnis != null){
						for (var j = 0; j < Ergebnis.length; ++j){
							Ergebnis[j] = Ergebnis[j].match(/value="\w+"/);
							Ergebnis[j] = String(String(Ergebnis[j]).match(/"\w+"/)).match(/\w+/);
							personen += "&users[]="+Ergebnis[j];

							//Personen mitzählen
							anz_pers++;

							//Bis jetzt gesammelte Personen in Array speichern
							if(anz_pers % 250 == 0){
								pers_array.push(personen);
								personen = "sent=1";
							}
						}
					}
					
					//Uhr grün schalten
					var respoID = response.finalUrl.match(/\d+$/g);
					respoID = parseInt(String(respoID))/20;
					document.getElementById("icon_"+respoID).src = icon_ok;

					//seite inkrementieren
					seite++;

					//Rekursiver Aufruf
					seite_lesen();
				}
			}
		});
	}else{
		//alert("fertig!\n"+personen); //DEBUG
		warteNode.innerHTML += "<br />- "+anz_pers+" Personen gefunden.";
		messageNode.innerHTML = "<h3>Willst du wirklich alle einladen?</h3>";
		messageNode.appendChild(button2Node);
	}
}


// Captcha absenden
function captcha_absenden(){
	//alert("absenden. Seite: "+seite); //DEBUG
	warteNode.innerHTML += "<br />- Code wird übermittelt... ";
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.wer-kennt-wen.de/captcha/validate/",
		data: "recaptcha_challenge_field="+document.getElementById("recaptcha_challenge_field").value+"&recaptcha_response_field=manual_challenge",
		headers: {"Content-Type": "application/x-www-form-urlencoded"},
		onload: function(response) {
			//alert("abgesendet"); //DEBUG
			if(modus == 0){
				warteNode.innerHTML += " OK.<br />- lese weitere Seiten...";
			}else if(modus == 1){
				warteNode.innerHTML += " OK.<br />- lade weiter ein...";
			}
			messageNode.innerHTML = "<h3><h3><img src="+warten+" alt='' /> Bitte warten...</h3></h3>";
			
			if(modus == 0){
				seite_lesen();
			}else if(modus == 1){

				//Eingeladene Leute anzeigen
				var start = response.responseText.search(/<\/h2>/);
				var ende = response.responseText.search(/<a href="\/club\/\w+">Zur\&uuml\;ck zur Gruppe/);
				messageNode.innerHTML = "<h3><img src="+warten+" alt='' /> Bitte warten...</h3><br />";
				messageNode.innerHTML += "<h3>Du hast als "+(akt_einladung+1)+". folgende Personen eingeladen:</h3>";			
				messageNode.innerHTML += response.responseText.substring(start+5, ende-15);
				
				// Uhr Grün schalten
				document.getElementById("icon2_"+akt_einladung).src = icon_ok;

				//Einladungen inkrementieren
				akt_einladung++;

				//Rekursiver Aufruf
				einladung_abschicken();
			}
		}
	});
}




// Alle einladen
function einladungen_zaehlen(){
	//Modus auf einladen stellen
	modus = 1;

	messageNode.innerHTML = "<h3><img src="+warten+" alt='' /> Bitte warten...</h3>";
	warteNode.innerHTML += "<br />- Lade ein:";
	
	//Letzte Personen ins Array holen
	pers_array.push(personen);

	//Einladungen zählen
	anz_einladung= pers_array.length;

	//Uhren anzeigen
	for(var i = 0; i < anz_einladung; i++){
		warteNode.innerHTML += "<img src="+icon_wt+" id='icon2_"+i+"' alt='warteAufEinladen"+i+" ' /> ";
	}
	
	//1. Einladung abschicken
	einladung_abschicken();
}


function einladung_abschicken(){
	if(akt_einladung < anz_einladung){
		GM_xmlhttpRequest({
				method: "POST",
				url: "http://www.wer-kennt-wen.de/club/invite/"+id,
				data: pers_array[akt_einladung],
				headers: {"Content-Type": "application/x-www-form-urlencoded"},
				onload: function(response) {
					if(response.responseText.search(/Gleich geht es weiter/) > 0){
						warteNode.innerHTML += "<br />- auf Captcha gestoßen, bitte eingeben (siehe unten).";
						messageNode.innerHTML = '<h3>WKW Captcha gegen Bots</h3><div style="z-index:-100"><img src="http://wkw.ivwbox.de/cgi-bin/ivw/CP/ruk_captcha;" width="1" height="1" alt="szmtag" /></div><iframe src="http://api.recaptcha.net/noscript?k=6LclbQIAAAAAACO4sj4OQ4JrDVpsiDds7X6jt9LD" height="300" width="750" frameborder="0"></iframe><br />Bitte das Captcha da oben eingeben und mit "I\'m a human" bestätigen. Dann den erhaltenen Code hier unten einfügen und auf "Weiter machen" klicken."<br /><textarea id="recaptcha_challenge_field" rows="3" cols="40"></textarea><br />';
						messageNode.appendChild(button4Node);


					}else{
						//alert(response.responseText); //DEBUG

						//Eingeladene Leute anzeigen
						var start = response.responseText.search(/<\/h2>/);
						var ende = response.responseText.search(/<a href="\/club\/\w+">Zur\&uuml\;ck zur Gruppe/);
						messageNode.innerHTML = "<h3><img src="+warten+" alt='' /> Bitte warten...</h3><br />";
						messageNode.innerHTML += "<h3>Du hast als "+(akt_einladung+1)+". folgende Personen eingeladen:</h3>";
						messageNode.innerHTML += response.responseText.substring(start+5, ende-15);
						
						// Uhr Grün schalten
						document.getElementById("icon2_"+akt_einladung).src = icon_ok;

						//Einladungen inkrementieren
						akt_einladung++;

						//Rekursiver Aufruf
						einladung_abschicken();
					}
				}
			});
	}else{
		warteNode.innerHTML += "<br /><img src="+icon_ok+" alt=':o)' /> Fertig!";
		messageNode.innerHTML = "";
	}
}




// Seiten zählen
function seiten_zaehlen(){
	var as = 0;
	for each(DV in document.getElementsByTagName('form')[4].getElementsByTagName("div")){
		if(DV.innerHTML.search(/weiter/) > 0){
			for each(A in DV.getElementsByTagName("a")){
				if(!isNaN(parseInt(A.innerHTML)) && parseInt(A.innerHTML) > as){
					as = A.innerHTML;
				}
			}
		}
	}
	return as;
}

