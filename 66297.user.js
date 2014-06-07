// ==UserScript==
// @name          Mikseri.net Pikaviestin
// @description   Lisaa laatikon jonka avulla on helpompi lahettaa pikaviesteja.
// @version       1.0
// @author        Jaycob
// @include       http://www.mikseri.net*
// @exclude       http://www.mikseri.net/artists/*
// @exclude       http://www.mikseri.net/user/*
// ==/UserScript==

GM_setValue("startstate", 0);
// JS FUNKTIOT
var jsfunktio = document.createElement("script");
jsfunktio.setAttribute("type", "text/javascript");
jsfunktio.innerHTML = 'mstate = ' + GM_getValue("startstate") + '; function toggleMessager() { if(mstate == 1) { document.getElementById("commentform").style.display = "none"; mstate = 0; } else { document.getElementById("commentform").style.display = "block"; mstate = 1; } }';
jsfunktio.innerHTML = jsfunktio.innerHTML + "\nfunction getUserId() { $('#boksi_title').html('Lahetetaan...'); $('#commentform').hide(); $.get('http://www.mikseri.net/user/' + document.getElementById('kayttajanimi').value, function(data) { var username = data.split('target_id')[1].split('\"')[2]; document.getElementById('target_id').value = username; beforeSubmitComment(); submitComment(); $('#boksi_title').html('Lahetetty!'); $('#commentform').show(); setTimeout('palautus()', 2352); return false; } ); }";
jsfunktio.innerHTML = jsfunktio.innerHTML + "\nfunction palautus() { $('#boksi_title').html('Pikaviestin'); $('#commentform').hide(); }";
var sijainti = document.childNodes[1].childNodes[0];
sijainti.appendChild(jsfunktio);

// PIKAVIESTIN HTML
var boksi = document.createElement("li"); // containeri
	boksi.setAttribute("id", "boksi");
	boksi.style.width = "160px";
	boksi.style.position = "relative";
	boksi.style.padding = "6px";
	boksi.style.margin = "0px";
	boksi.style.overflow = "visible";
var title = document.createElement("a"); // otsikko
	title.innerHTML = "Pikaviestin";
	title.setAttribute("href", "javascript:toggleMessager();");
	title.style.margin = "0px";
	title.setAttribute("id", "boksi_title");
	title.setAttribute("class", "nav");
	boksi.style.paddingTop = "6px";
	boksi.style.top = "2px";
	boksi.appendChild(title);
var form = document.createElement("form"); // form
	form.setAttribute("method", "post");
	form.setAttribute("action", "/comment.php");
	form.setAttribute("name", "commentform");
	form.setAttribute("id", "commentform");
	form.setAttribute("class", "spot");
	form.style.backgroundColor = "#1E2328";
	form.style.padding = "7px";
	form.style.marginTop = "5px";
	form.style.border = "solid 1px #808080";
	form.style.position = "absolute";
		if(GM_getValue("startstate") == 0)
		form.style.display = "none";
var hidden1 = document.createElement("input"); // hidden (service_id)
	hidden1.setAttribute("type", "hidden");
	hidden1.setAttribute("value", "20");
	hidden1.setAttribute("name", "service_id");
	form.appendChild(hidden1);
var hidden2 = document.createElement("input"); // hidden (target_id)
	hidden2.setAttribute("type", "hidden");
	hidden2.setAttribute("value", "");
	hidden2.setAttribute("name", "target_id");
	hidden2.setAttribute("id", "target_id");
	form.appendChild(hidden2);
var hidden3 = document.createElement("input"); // hidden (action)
	hidden3.setAttribute("type", "hidden");
	hidden3.setAttribute("value", "comment");
	hidden3.setAttribute("name", "action");
	form.appendChild(hidden3);
var kayttaja = document.createElement("input");
	kayttaja.setAttribute("type", "text");
	kayttaja.setAttribute("id", "kayttajanimi");
	kayttaja.setAttribute("value", "Kayttajanimi");
	kayttaja.style.color = "#CCCCCC";
	kayttaja.setAttribute("onFocus", "if(this.value=='Kayttajanimi'){this.value='';this.style.color='#FFFFFF';}");
	kayttaja.setAttribute("onBlur", "if(this.value==''){this.value='Kayttajanimi';this.style.color='#CCCCCC';}");
	form.appendChild(kayttaja);
	form.appendChild(document.createElement("br"));
var kentta = document.createElement("input");
	kentta.setAttribute("id", "message");
	kentta.setAttribute("class", "field");
	kentta.setAttribute("type", "text");
	kentta.setAttribute("name", "message");
	kentta.setAttribute("value", "Viesti");
	kentta.style.color = "#CCCCCC";
	kentta.setAttribute("onFocus", "if(this.value=='Viesti'){this.value='';this.style.color='#FFFFFF';}");
	kentta.setAttribute("onBlur", "if(this.value==''){this.value='Viesti';this.style.color='#CCCCCC';}");
	form.appendChild(kentta);
	form.appendChild(document.createElement("br"));
var nappula = document.createElement("input");
	nappula.setAttribute("id", "comment_submit");
	nappula.setAttribute("class", "submit");
	nappula.setAttribute("onClick", "getUserId()");
	nappula.setAttribute("type", "button");
	nappula.setAttribute("value", "Laheta");
	nappula.setAttribute("name", "comment_submit");
	form.appendChild(nappula);
	
boksi.appendChild(form);
document.getElementById("body_container").childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[5].appendChild(boksi);