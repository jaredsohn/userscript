// ==UserScript==
// @name           HnH whats new
// @namespace      http://tud.hicknhack.org/
// @include        http://tud.hicknhack.org/forum/*
// ==/UserScript==

// Parameter
var color = "#9999FF";
var spam_words = new Array(
		"LOOOOO",
		"haut'se,",
		"Standhaftigkeit",
		".mybrute.com",
		"doofendoofendoofen",
		"Erikmitk: ",
		"ey hier fehlt doch was",
		"Dich mein Freund, du bist ein Zwerk"
		);
var MAXLENGTH = 2000

var oldTime = GM_getValue("lastvisit");


var now = Math.floor(Date.parse(new Date())/1000);

var dateField = document.createElement("span");
dateField.innerHTML = "Last Visit : "+(new Date(oldTime*1000)).toLocaleString();
dateField.setAttribute("style","margin-left:60px;background:"+color+";border: 1px solid #000;color:#FFF;padding: 0px 5px;");
dateField.addEventListener("click", function(){GM_setValue("lastvisit", now); this.innerHTML = "ok, dann hast du wohl alles gelesen";}, false);
document.getElementsByTagName("div")[1].appendChild(dateField);

var heute = now - Math.floor(now%86400) + (new Date()).getTimezoneOffset()*60;	// auf 00:00:00 runter, mit GMT-Anpassung

if(window.location.pathname.indexOf("message")==-1) {
	// in Subforen / ausserhalb von Threads
	var table = document.getElementsByTagName("table")[1];
	var zeilen = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	var tds;
	var tzeit;
	for(var i=0;i<zeilen.length;i++){
		tds = zeilen[i].getElementsByTagName("td");
		var feld;
		if(tds.length==3) feld = tds[2];
		else if(tds.length==4) feld = tds[3];
		if(feld.innerHTML.indexOf("Heute")==0 || feld.innerHTML.indexOf("Gestern")==0){
			var zeit = feld.innerHTML.split(", ")[1];
			zeit = zeit.split(":");
			zeit[2]=zeit[2].substr(0,2);
			// Heute
			if(feld.innerHTML.indexOf("Heute")!=-1) {
				tzeit= heute + zeit[0]*3600 + zeit[1]*60 + zeit[2]*1;
				if(tzeit>oldTime) zeilen[i].style.backgroundColor = color;
			}
			// Gestern
			else {
				tzeit= heute-86400 + zeit[0]*3600 + zeit[1]*60 + zeit[2]*1;
				if(tzeit>oldTime) zeilen[i].style.backgroundColor = color;
			}
		}
	}
} else {
	// innerhalb eines Threads
	var table = document.getElementsByTagName("table")[1];
	var zeilen = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	var tds;
	var ankerset = false;
	for(var i=0;i<zeilen.length;i++){
		tds = zeilen[i].getElementsByTagName("td");
		for(var s=0;s<spam_words.length;s++) {
			if(tds[1].innerHTML.indexOf(spam_words[s])>=0) {markAsSpam(tds, "[spam..... - "+spam_words[s]+"]"); break;}
		}
		if(countContains(tds[1].innerHTML,"<br/")>30) markAsSpam(tds,"[fullquote........]");
		else if(countPattern(tds[1].innerHTML,'[0-9]:[0-9]{2}:[0-9]')>6) markAsSpam(tds, "[compact fullquote........]");
		else if(tds[1].innerHTML.length>MAXLENGTH) markAsSpam(tds, "[tl;dr ........]");
		
		
		if(tds[0].innerHTML.indexOf("Heute")!=-1 || tds[0].innerHTML.indexOf("Gestern")!=-1){
			if(ankerset) tds[0].style.backgroundColor = color;
			else {
				var zeit = tds[0].innerHTML.split(", ")[1];
				zeit = zeit.split(":");
				if(zeit[2].length>13) continue;	//es wurde nur eine Name mit Uhrzeit erkannt
				zeit[2]=zeit[2].substr(0,2);
				// Heute
				if(tds[0].innerHTML.indexOf("Heute")!=-1) {
					tzeit= heute + 3600*zeit[0] + 60*zeit[1] + 1*zeit[2];
					if(tzeit>oldTime) { 
						tds[0].style.backgroundColor = color;
						if(!ankerset) {ankerset = true; tds[0].innerHTML += "<a name='down' href='#top'>top</a>";}//+tds[0].innerHTML;}
					}
				}
				// Gestern
				else {
					tzeit= heute-86400 + zeit[0]*3600 + zeit[1]*60 + zeit[2]*1;
					if(tzeit>oldTime) { 
						tds[0].style.backgroundColor = color;
						if(!ankerset) {ankerset = true; tds[0].innerHTML += "<a name='down' href='#top'>top</a>";}//+tds[0].innerHTML;}
					}
				}
			}
		}
		if(i==0) tds[0].innerHTML += "<a href='#down'>down</a>";
	}
}

function markAsSpam(t,s){
	t[1].innerHTML=s;
	t[1].style.color="#999";
}

function countContains(t,e){
	for(ce = 0; t.indexOf(e) != -1; ce++){
		t = t.substring(t.indexOf(e)+e.length,t.length)
	}
	return ce;
}
function countPattern(t,ps){
	p = new RegExp(ps,'');
	p.exec(t);
	for(ce = 0; p.test(t); ce++){
		t=RegExp.rightContext;
	}
	return ce;
}