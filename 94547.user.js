// ==UserScript==
// @name           WlW Copier
// @namespace      All
// @include        http://www.wlw.de/sse/MainServlet*
// @exclude        http://www.wlw.de/sse/MainServlet*firmaid*
// @exclude        http://www.wlw.de/sse/MainServlet*produkt*
// ==/UserScript==

/*=================
Name: WLW Copier
Autor: Sebastian Neef
Copyright (c) 2010. All rights reserved.
*/
var win,len,cur;
init()

function mainpage(){
	document.getElementById("scriptstatus").innerHTML="Kopiere"
	var as = document.getElementsByClassName("kundenlink")
	cur=0;
	len=0;
	for(var i =0; i < as.length;i++) {
		if(as[i].innerHTML=="Firmeninfos") {
			len=len+1;
			getDOC(as[i].href,function(doc) {  infopage(doc) })
		}
	}
	document.getElementById("max").innerHTML=len;
}

function infopage(doc) {
	cur=cur+1;
	var reg_strasse = /<\s*td[^>]*>Straße:<\s*\/\s*td><\s*td[^>]*>(.*?)<\s*\/\s*td>/
	var reg_plz = /<\s*td[^>]*>PLZ\/Ort:<\s*\/\s*td><\s*td[^>]*>(.*?)<\s*\/\s*td>/
	var reg_tel = /<\s*td[^>]*>Telefon:<\s*\/\s*td><\s*td[^>]*>(.*?)<\s*\/\s*td>/
	var name= doc.getElementById("firmierungsprung").innerHTML
	var box = doc.getElementById("firmendatenLinks").innerHTML
	reg_strasse.exec(box)
	var strasse= RegExp.$1
	reg_plz.exec(box)
	var plz= RegExp.$1
	reg_tel.exec(box)
	var tel= RegExp.$1
	win.document.write(name+"|"+strasse+"|"+plz+"|"+tel+"<br>")
	document.getElementById("done").innerHTML=cur;
	if(cur==len) {
		document.getElementById("scriptstatus").innerHTML="Bereit"
	}
}

function createWindow() {
	win = window.open("","WLW Copier","")
	win.document.title="WLW Copier"
}

function addButton() {
	var div=document.getElementById("suchmaskeobenEinfach")
	var Button = document.createElement("button")
	Button.setAttribute("style","position:absolute;z-index:1000;top:80px;rigth:0px;background-color:transparent;border:none;cursor:pointer;color:white;font-size:1em;font-weight:bold;")
	Button.innerHTML="Kopieren"
	Button.setAttribute("class","finden")
	Button.setAttribute("id","startButton")
	div.appendChild(Button)
	document.getElementById("startButton").addEventListener('click', function(){mainpage()}, false);
}

function addCounter() {
	div=document.getElementById("pfad").firstChild
	var Count = document.createElement("li")
	var liPfeil = document.createElement("li")
	var Pfeil = document.createElement("img")
	Count.setAttribute("id","scriptcount")
	Pfeil.src="/image/wlw_dach/xx/pfeil_pfad.png"
	Pfeil.setAttribute("style","width:36px;heiht:38px;")
	liPfeil.setAttribute("class","pfeil")
	Count.innerHTML="<span id='done'>0</span>/<span id='max'>0</span> Adressen => <span id='scriptstatus'>Bereit</span>"
	div.appendChild(liPfeil)
	liPfeil.appendChild(Pfeil)
	div.appendChild(Count)
}

function init() {
	createWindow()
	addButton()
	addCounter()
}

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}