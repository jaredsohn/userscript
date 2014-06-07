
// Neogen.rs Chat enhancer
// version 0.1 BETA!
// 2011-04-07
// Copyright (c) 2011, Zeljko


// ==UserScript==
// @name          Neogen chat enhancer by unhappy Zheljko :)
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Dodaje novu funkcionalnost u neogen chat
// @include       http://chatn.neogen.urbae.com/*
// @include       http://chatnc.neogen.urbae.com/*

// ==/UserScript==
<style type="text/css">
<!--
#over {
	 position: absolute; 
	 left: 0;
	 top: 0;
	 z-index: 100;
	 width: 100%; 
	 height: 100%;
	 margin: 0;
	 filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80);
	 -moz-opacity:0.80;
	 -khtml-opacity:0.80;
	 }
#box, #box2 { 
	height: 350px;
	overflow: none;
	border: 5px ridge #ccc;
	z-index: 150;	
	background: #fff;	
	position: relative;
	padding: 10px; 
	top: -5px; 
	left: -5px;
	  }
.sh	{position: absolute;
	top:100px;	
	 z-index: 1000;	 
	width: 450px; 
	 right: 30%;
	
	  }
.bar {background: #ddd;
	  text-align: right;
	  margin: -5px;
	  padding: 5px } 
  h1 { color: #006;
	
	  text-align: right;
	  margin: -5px;
	  padding: 5px } 
.bar a {border: 1px solid #777; 
	color: #777; 
	text-decoration: none; 
	font-size: 10px; 
	padding: 0 5px; }


-->

</style>

// Misc Funkcije 
var browser = new Browser();

// Global object to hold drag information.

var dragObj = new Object();
dragObj.zIndex = 1000;

function dragStart(event, id) {

  var el;
  var x, y;

  // If an element id was given, find it. Otherwise use the element being
  // clicked on.

  if (id)
    dragObj.elNode = document.getElementById(id);
  else {
    if (browser.isIE)
      dragObj.elNode = window.event.srcElement;
    if (browser.isNS)
      dragObj.elNode = event.target;

    // If this is a text node, use its parent element.

    if (dragObj.elNode.nodeType == 3)
      dragObj.elNode = dragObj.elNode.parentNode;
  }

  // Get cursor position with respect to the page.

  if (browser.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  if (browser.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Save starting positions of cursor and element.

  dragObj.cursorStartX = x;
  dragObj.cursorStartY = y;
  dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
  dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);

  if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
  if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;

  // Update element's z-index.

  dragObj.elNode.style.zIndex = ++dragObj.zIndex;

  // Capture mousemove and mouseup events on the page.

  if (browser.isIE) {
    document.attachEvent("onmousemove", dragGo);
    document.attachEvent("onmouseup",   dragStop);
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (browser.isNS) {
    document.addEventListener("mousemove", dragGo,   true);
    document.addEventListener("mouseup",   dragStop, true);
    event.preventDefault();
  }
}

function dragGo(event) {

  var x, y;

  // Get cursor position with respect to the page.

  if (browser.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  if (browser.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Move drag element by the same amount the cursor has moved.

  dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
  dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";

  if (browser.isIE) {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (browser.isNS)
    event.preventDefault();
}

function dragStop(event) {

  // Stop capturing mousemove and mouseup events.

  if (browser.isIE) {
    document.detachEvent("onmousemove", dragGo);
    document.detachEvent("onmouseup",   dragStop);
  }
  if (browser.isNS) {
    document.removeEventListener("mousemove", dragGo,   true);
    document.removeEventListener("mouseup",   dragStop, true);
  }
}


	 function expandCollapse() {
	for (var i=0; i<expandCollapse.arguments.length; i++) {
		var element = document.getElementById(expandCollapse.arguments[i]);
		element.style.display = (element.style.display == "none") ? "block" : "none";
	}
}



function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = (exec ? "(" : "") + func.toString() + (exec ? ")();" : "");
  document.body.appendChild(script);
}


function Browser() {

  var ua, s, i;

  this.isIE    = false;
  this.isNS    = false;
  this.version = null;

  ua = navigator.userAgent;

  s = "MSIE";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isIE = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  s = "Netscape6/";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  // Treat any other "Gecko" browser as NS 6.1.

  s = "Gecko";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = 6.1;
    return;
  }
}
function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

addFunction(contains,false);
function removeRegex(m) {
   m = m.replace(/\%\%\*\*/g,'<');
   m = m.replace(/\#\#\@\@/g,'>');
   m = m.replace(/<i>/gi,'');
   m = m.replace(/<\/i>/gi,'');
   m = m.replace(/\^\^\~\~/g,'');
   //alert ('kraj' + m);
   return m;
}


function putRegex(m) {
  m = m.replace(/\</gi,'%%**');
  m = m.replace(/\>/gi,'##@@');
  //alert ('kraj' + m);
  return m;

}
addFunction( putRegex, false);
addFunction( removeRegex, false);


function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

function getMimeType(){
var mimeType = "application/x-mplayer2"; //default
var agt=navigator.userAgent.toLowerCase();
if (navigator.mimeTypes && agt.indexOf("windows")==-1) {
//non-IE, no-Windows
  var plugin=navigator.mimeTypes["audio/mpeg"].enabledPlugin;
  if (plugin) mimeType="audio/mpeg" //Mac/Safari & Linux/FFox
}//end no-Windows
return mimeType
}
	
		


function DHTMLSound(surl) {
  document.getElementById("dummyspan").innerHTML=
  '<embed src="'+ surl + '" autostart=true loop=false height="245" width="200" type="'+getMimeType()+'"></embed>';

}


function removeByIndex(arr, index) {
    arr.splice(index, 1);
}
addFunction(removeByValue,false);

function getColor(){
 var radio = document.getElementById('tabelaboja');
 var r = radio.getElementsByTagName("input");
 return getCheckedValue(r);

}
function getCheckedValue(radioObj) {

	if(!radioObj)

		return "";

	var radioLength = radioObj.length;

	if(radioLength == undefined)

		if(radioObj.checked)

			return radioObj.value;

		else

			return "";

	for(var i = 0; i < radioLength; i++) {

		if(radioObj[i].checked) {

			return radioObj[i].value;

		}

	}

	return "";

}

unsafeWindow.myArrayGroup = new Array();
var blokirani = new Array();

window.resizeTo(screen.width,screen.height);
function getEmoticons(){
emoticons.push(':please:');
emoticons.push(':wall:');
emoticons.push(':hi:');
emoticons.push(':yikes:');
emoticons.push(':bounce:');
emoticons.push(':bow:');
emoimg[':please:'] = '<img src="http://img.ineogen.ro/neogen/emotions/icon_please.gif" style="vertical-align:bottom;border:0px; padding-top:11px;"/>';
emoimg[':hi:'] = '<img src="http://img.ineogen.ro/neogen/emotions/icon_hi.gif" style="vertical-align:bottom;border:0px; padding-top:11px;"/>';
emoimg[':wall:'] = '<img src="http://img.ineogen.ro/neogen/emotions/icon_wall.gif" style="vertical-align:bottom;border:0px; padding-top:11px;"/>';
emoimg[':yikes:'] = '<img src="http://img.ineogen.ro/neogen/emotions/icon_yikes.gif" style="vertical-align:bottom;border:0px; padding-top:11px;"/>';
emoimg[':bounce:'] = '<img src="http://img.ineogen.ro/neogen/emotions/icon_bounce.gif" style="vertical-align:bottom;border:0px; padding-top:11px;"/>';
emoimg[':bow:'] = '<img src="http://img.ineogen.ro/neogen/emotions/icon_bow.gif" style="vertical-align:bottom;border:0px; padding-top:11px;"/>';


}
addFunction(getEmoticons, true);

var dd = document.getElementById('emoticons');
dd.style.height = 40;


function bojalink(){

expandCollapse('open','over');
document.getElementById('messagerow').focus();

}
function smajlilink(){

expandCollapse('smajli','over');

} 
function zvuklink(){

expandCollapse('zvuk','over');

} 

function getNickFromIdp(idpl) {
   for(idp in unsafeWindow.NChat.profile) {
		m = unsafeWindow.NChat.profile[idp];
			if(m.idp == idpl)
		return m.nick;
	}
return "Unknown";
} 



function getProfileIdp(idpl) {
   for(idp in unsafeWindow.NChat.profile) {
		m = unsafeWindow.NChat.profile[idp];
			if(m.idp == idpl)
		return m;
	}
return null;
}



function getImgFromIdp(idpl) {
   for(idp in unsafeWindow.NChat.profile) {
		m = unsafeWindow.NChat.profile[idp];
			if(m.idp == idpl)
		return m.img;
	}
return "";
}



addFunction(getNickFromIdp,false);
addFunction(getImgFromIdp,false);

function grupnichat(){
var d = document.getElementById('grupa');
var div = document.getElementById('dinamickigrupa');
if(d.style.display == 'none') {
 var con = '<table width="100%"><tr><td valign="top"><h4>Klikni na nick koji želiš dodati u grupu</h4></td><td valign="top"><h4>Klikni na nick koji želiš izbaciti iz grupe</h4></td></tr><tr><td valign="top"><table>';
	for(idp in unsafeWindow.NChat.profile) {
		m = unsafeWindow.NChat.profile[idp];
			if(m.idp != null && m.idp != '') {
	  			con+='<tr><td><div style="cursor:pointer;cursor:hand;" id="id_' + m.idp + '" onclick="dodajgrupa(this.id);"><img src="' + m.img + '" width="28" height="32" border="0"/>&nbsp;' + m.nick + '</div></td></tr>';

			}

	}

con+='</table></td><td valign="top"><table>';
for(i=0;i<unsafeWindow.myArrayGroup.length;i++) {
	con+='<tr><td><div style="cursor:pointer;cursor:hand;" id="idd_' + unsafeWindow.myArrayGroup[i] + '" onclick="obrisigrupa(this.id);">';
			if(getImgFromIdp(unsafeWindow.myArrayGroup[i]) != '')
				con+= '<img src="' + getImgFromIdp(unsafeWindow.myArrayGroup[i]) + '" width="28" height="32" border="0"/>&nbsp;';
		con+= getNickFromIdp(unsafeWindow.myArrayGroup[i]) + '</div></td></tr>';


	}
	con+='</table></td></tr></table>';
	div.innerHTML = con;

} else
document.getElementById('messagerow').focus();



expandCollapse('grupa','over');

}


function pozovichat() {

var d = document.getElementById('pozovi');



expandCollapse('pozovi','over');
if(d.style.display == 'block') {
  document.getElementById('pozovitxt').focus();

} else {
document.getElementById('messagerow').focus();
}

}

function pozoviuchat() {
var d = document.getElementById('pozovi');
expandCollapse('pozovi','over');
if(d.style.display == 'block') {
  document.getElementById('pozovitxt').focus();

} else {
document.getElementById('messagerow').focus();
}
ime = document.getElementById('pozovitxt').value;
document.getElementById('pozovitxt').value = '';
//alert(ime);
if(ime == '')
return;

getUserIdFromName(ime,1);



}

function blokiraja() {

var d = document.getElementById('blokiraj');



expandCollapse('blokiraj','over');
if(d.style.display == 'block') {
  document.getElementById('blokirajtxt').focus();

} else {
document.getElementById('messagerow').focus();
}

}

function blokirajb() {
var d = document.getElementById('blokiraj');
expandCollapse('blokiraj','over');
if(d.style.display == 'block') {
  document.getElementById('blokirajtxt').focus();

} else {
document.getElementById('messagerow').focus();
}
ime = document.getElementById('blokirajtxt').value;
document.getElementById('blokirajtxt').value = '';
//alert(ime);
if(ime == '')
return;

getUserIdFromName(ime,2);



}


function dodajgrupa(id) {


expandCollapse('grupa','over');

z = id.indexOf('_');
z++;
id = id.substring(z);
//alert(id + ' '+ myArrayGroup.length);

if(!contains(myArrayGroup,id))
myArrayGroup.push(id);

//alert(id + ' '+ myArrayGroup.length);
document.getElementById("btxgrupa").click();
}
function obrisigrupa(id) {


expandCollapse('grupa','over');
z = id.indexOf('_');
z++;
id = id.substring(z);

removeByValue(myArrayGroup,id);
//alert(myArrayGroup.length);
document.getElementById("btxgrupa").click();
}
addFunction(dodajgrupa,false);
addFunction(obrisigrupa,false);

function getalink() {
//alert('usao');
var linkovi = document.getElementById("send_button");
//alert(linkovi.innerHTML);
linkovi.innerHTML='<div class="button_blue"><a id="noviSend">Pošalji<span></span></a></div>';

}

 var textareaKeydown = function(e) {
  if (e.keyCode == 13) 
	document.getElementById('noviSend').click();
}


var textareaKeydownslika = function(e) {
  if (e.keyCode == 13) 
	document.getElementById('greasemonkeyButtonSlika').click();
}
var textareaKeydownurl = function(e) {
  if (e.keyCode == 13) 
	document.getElementById('greasemonkeyButtonYouTube').click();
}
var textareaKeydownpozovi = function(e) {

  if (e.keyCode == 13) 
	document.getElementById('btxpozovi2').click();
}
var textareaKeydownblokiraj = function(e) {

  if (e.keyCode == 13) 
	document.getElementById('btxblokiraj2').click();
}


var t;




var vanjskismajli = new Array();

 
function LoadSmajli(){

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://dl.dropbox.com/u/6004688/smajli.txt',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        /*alert('Request for Atom feed returned ' + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Feed data:\n' + responseDetails.responseText);*/
 	var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "application/xml");
        var entries = dom.getElementsByTagName('smile');
        var title;
        for (var i = 0; i < entries.length; i++) {
            title = entries[i].textContent;
            vanjskismajli.push(title);
        }

	 entries = dom.getElementsByTagName('zvuk');
        var title;
        for (var i = 0; i < entries.length; i++) {
            title = entries[i].textContent;
            vanjskizvuk.push(title);
	    
        }
//alert('iz xmla ' +  vanjskismajli.length);
popuniSmajli();
popuniZvuk(); 
    }
});

}
var vanjskizvuk = new Array();
window.addEventListener("load", function(e) {
  addButton();

LoadSmajli();

alert('Neogen chat enhancer by unhappy chater :)');
document.getElementsByTagName('title')[0].title = 'Enhanced Neogen chat';
document.getElementsByTagName('title')[0].innerHTML = 'Enhanced Neogen chat';
GM_setValue(document.URL,'Enhanced Neogen chat');
 unsafeWindow.NLang[unsafeWindow.NConfig.lang].def_title = 'Enhanced Neogen chat';



}, false);

setInterval(backgroundGrupa,500);


function backgroundGrupa() {
nasao=0;
  for(i=0; i < unsafeWindow.myArrayGroup.length;i++) {
			
		if(unsafeWindow.NChat.activIdp != unsafeWindow.myArrayGroup[i]) {
			m = getProfileIdp(unsafeWindow.myArrayGroup[i]);
				if(m != null) {
					
					z= m.message.lastIndexOf("^^~~");
						if(z > -1) {
									if(!strEndsWith(m.message,'^^~~')) {
									
									nasao=1;
									z += 4;
									mess = m.message;
									mess = mess.substring(z);
									//alert(m.message + '*******************' + mess + ' ' + z);
			 						m.message = m.message.replace(/\^\^\~\~/g,'');
									m.message +='^^~~';
									//alert(m.message + '*******************' + mess + ' ' + z);
									unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message += mess;
									

									}

						
						} else {
						  m.message += '^^~~'

						}


			}

		}



  }

if(nasao == 1) {

 var divdisplay = document.getElementById('display_container');
 divdisplay.innerHTML = unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message;
 divdisplay.scrollTop = divdisplay.scrollHeight;
}
}


function getUserIdFromName(name,akcija) {
myUrl = 'http://www.neogen.rs/' + name;
 id = '';
GM_xmlhttpRequest({
    method: 'GET',
    url: myUrl,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
    },
    onload: function(responseDetails) {
        /*alert('Request for Atom feed returned ' + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Feed data:\n' + responseDetails.responseText);*/
 	str = responseDetails.responseText.replace(/<script(.|\s)*?\/script>/g, '');
        
    	zz = str.indexOf("id='profile' data='");
         if(zz != -1){
             zz+= "id='profile' data='".length;
               str = str.substring(zz);
               zz = str.indexOf("'");
		//alert(str + '*******' + zz);
               id = str.substring(0,zz);
			if(id == '') {
				alert('Ne mogu da pronadjem nick: ' + name);
				return;
			

			}
		if(akcija == 1)
		 parseUserData(id);
		if(akcija == 2) {
		if(!contains(blokirani,id)){
		blokirani.push(id);
		//alert(id + ' ' + blokirani.length);
		}
		}
           }


   
    }
});



}


function parseUserData(id) {
myUrl = 'http://www.neogen.rs/uchat/chat/' + id;
 id = '';
GM_xmlhttpRequest({
    method: 'GET',
    url: myUrl,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
    },
    onload: function(responseDetails) {
        /*alert('Request for Atom feed returned ' + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Feed data:\n' + responseDetails.responseText);*/
 	str = responseDetails.responseText;
        zz = str.indexOf('(');
	if(zz > -1){
	 zz++;
	str = str.substring(zz);
	  zz = str.indexOf(')');
	str = str.substring(0,zz);
	arr = str.split(',');
	for(i = 0; i<arr.length;i++) {
	arr[i] = arr[i].replace(/"/g,'');
	//alert(arr[i]);

	}
	
	if(arr.length == 11) {
	unsafeWindow.NChat.loadUserData(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],0);

        }
	}

   
    }
});
}

function addButton(){
 var buttonElems = document.getElementById('left_part');
var c = buttonElems.innerHTML  + 
'<div id="zvuk" style="display:none;position: absolute;top:100px; z-index: 1000; width: 700px; right: 30%; overflow: none;" ><div style="height: 500px;overflow: auto;border: 5px ridge #ccc;z-index: 150; background: #fff;	position: relative;padding: 10px; top: -5px; left: -5px;"><div id="dinamickizvuk" style="overflow: auto;"></div><div class="button_blue"><a id="btxzvuk">Zatvori<span></span></a></div></div></div></div>' +
'<div id="smajli" style="display:none;position: absolute;top:100px; z-index: 1000; width: 500px; right: 30%; overflow: none;" ><div style="height: 500px;overflow: auto;border: 5px ridge #ccc;z-index: 150; background: #fff;	position: relative;padding: 10px; top: -5px; left: -5px;"><div id="dinamickismajli" style="overflow: auto;"></div><div class="button_blue"><a id="btxsmajli">Zatvori<span></span></a></div></div></div></div>' +
'<div id="pozovi" style="display:none;position: absolute;top:100px; z-index: 1000; width: 350px; right: 30%; overflow: none;" ><div style="height: 100px;overflow: none;border: 5px ridge #ccc;z-index: 150; background: #fff;	position: relative;padding: 10px; top: -5px; left: -5px;"><h3 style="color: #006; text-align: center;margin: -5px;padding: 5px">Upišite nick koji želite pozvati u chat</h3><table width="100%"><tr><td><input type="text" id="pozovitxt" size="20"/></td><td><div class="button_blue"><a id="btxpozovi2">Pozovi<span></span></a></div></td></tr><tr><td colspan="2"><div class="button_blue"><a id="btxpozovi">Zatvori<span></span></a></div></td></tr></table></div></div></div>' +
'<div id="blokiraj" style="display:none;position: absolute;top:100px; z-index: 1000; width: 350px; right: 30%; overflow: none;" ><div style="height: 100px;overflow: none;border: 5px ridge #ccc;z-index: 150; background: #fff;	position: relative;padding: 10px; top: -5px; left: -5px;"><h3 style="color: #006; text-align: center;margin: -5px;padding: 5px">Upišite nick koji želite blokirati</h3><table width="100%"><tr><td><input type="text" id="blokirajtxt" size="20"/></td><td><div class="button_blue"><a id="btxblokiraj2">Blokiraj<span></span></a></div></td></tr><tr><td colspan="2"><div class="button_blue"><a id="btxblokiraj">Zatvori<span></span></a></div></td></tr></table></div></div></div>' +

'<div id="grupa" style="display:none;position: absolute;top:50px; z-index: 1000; width: 700px; right: 30%; overflow: none;" ><div style="height: 550px;overflow: none;border: 5px ridge #ccc;z-index: 150; background: #fff;position: relative;padding: 10px; top: -5px; left: -5px;"><h3 style="color: #006; text-align: center;margin: -5px;padding: 5px">Grupni chat</h3><div id="dinamickigrupa" style="overflow: auto;"></div><div class="button_blue"><a id="btxgrupa">Zatvori<span></span></a></div></div></div></div>' +

'<div  id="open" style="display:none;position: absolute;top:100px; z-index: 1000; width: 270px; right: 30%;"><div id="box" style="height: 320px;overflow: none;border: 5px ridge #ccc;z-index: 150; background: #fff; position: relative;padding: 10px; top: -5px; left: -5px;"><h1 style="color: #006; text-align: center;margin: -5px;padding: 5px">Odaberite boju slova</h1>' +
'<table width="100%" id="tabelaboja"><tr><td style="background-color:#000000;"><input type="radio" value="#000000" name="boja" checked/></td><td style="background-color:#FF0000;"><input type="radio" value="#FF0000" name="boja"/></td><td style="background-color:#BA42FF;"><input type="radio" value="#BA42FF" name="boja"/></td></tr>' +
'<tr><td style="background-color:#0000FF;"><input type="radio" value="#0000FF" name="boja"/></td><td style="background-color:#14C0FF;"><input type="radio" value="#14C0FF" name="boja"/></td><td style="background-color:#546BFF;"><input type="radio" value="#546BFF" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#D5FF73;"><input type="radio" value="#D5FF73" name="boja"/></td><td style="background-color:#FF9D3B;"><input type="radio" value="#FF9D3B" name="boja"/></td><td style="background-color:#69FFBE;"><input type="radio" value="#69FFBE" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#2B0B9E;"><input type="radio" value="#2B0B9E" name="boja"/></td><td style="background-color:#0A5E4C;"><input type="radio" value="#0A5E4C" name="boja"/></td><td style="background-color:#AD490A;"><input type="radio" value="#AD490A" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#375380;"><input type="radio" value="#375380" name="boja"/></td><td style="background-color:#773780;"><input type="radio" value="#773780" name="boja"/></td><td style="background-color:#5C877D;"><input type="radio" value="#5C877D" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#F22C00;"><input type="radio" value="#F22C00" name="boja"/></td><td style="background-color:#AD1F00;"><input type="radio" value="#AD1F00" name="boja"/></td><td style="background-color:#6B0C00;"><input type="radio" value="#6B0C00" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#203300;"><input type="radio" value="#203300" name="boja"/></td><td style="background-color:#696B00;"><input type="radio" value="#696B00" name="boja"/></td><td style="background-color:#00540C;"><input type="radio" value="#00540C" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#008724;"><input type="radio" value="#008724" name="boja"/></td><td style="background-color:#004E51;"><input type="radio" value="#004E51" name="boja"/></td><td style="background-color:#00787C;"><input type="radio" value="#00787C" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#002F59;"><input type="radio" value="#002F59" name="boja"/></td><td style="background-color:#001A8E;"><input type="radio" value="#001A8E" name="boja"/></td><td style="background-color:#2F0059;"><input type="radio" value="#2F0059" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#7B027F;"><input type="radio" value="#7B027F" name="boja"/></td><td style="background-color:#A703AF;"><input type="radio" value="#A703AF" name="boja"/></td><td style="background-color:#BF032C;"><input type="radio" value="#BF032C" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#A87DCE;"><input type="radio" value="#A87DCE" name="boja"/></td><td style="background-color:#A07A61;"><input type="radio" value="#A07A61" name="boja"/></td><td style="background-color:#F78F85;"><input type="radio" value="#F78F85" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#F9EE86;"><input type="radio" value="#F9EE86" name="boja"/></td><td style="background-color:#98F484;"><input type="radio" value="#98F484" name="boja"/></td><td style="background-color:#84F4F1;"><input type="radio" value="#84F4F1" name="boja"/></td></tr>' + 
'<tr><td style="background-color:#868EF9;"><input type="radio" value="#868EF9" name="boja"/></td><td style="background-color:#DD88FC;"><input type="radio" value="#DD88FC" name="boja"/></td><td style="background-color:#FC88CC;"><input type="radio" value="#FC88CC" name="boja"/></td></tr>' + 
'</table><div class="button_blue"><a id="btxboja">Zatvori<span></span></a></div></div>	</div>' + 
'<div id="over" style="display:none; position: absolute; left: 0;top: 0;z-index: 100;width: 100%;  height: 100%;margin: 0;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80);-moz-opacity:0.80;-khtml-opacity:0.80;"></div>' + 
'<div style="vertical-align: bottom; display: block; position: relative; top: 50px; left: -740px;"><table style="width: 980px;">' + 
'<tr><td align="right">Url slike:</td><td align="left"><input type="text" id="messagerow2" autocomplete="OFF" size="50"/></td><td align="left"><div class="button_blue"><a id="greasemonkeyButtonSlika">Stavi sliku<span></span></a></div></td><td align="left"><table><tr><td>Enhancements: <input type="checkbox" name="checkgroup" checked id="chkcompatibility" /></td><td align="left">Private: <input type="checkbox" name="checkgroup2" id="chkcompatibility2" /></td></tr></table></td></tr>' + 
'<tr><td align="right">Url linka:</td><td align="left"><input type="text" id="messagerow3" autocomplete="OFF" size="50"/></td><td align="left"><div class="button_blue"><a id="greasemonkeyButtonYouTube">Stavi link<span></span></a></div></td><td align="left"><table width="100%"><tr><td><div class="button_blue"><p><a  id="relboja"> Boja<span></span> </a></p></div></td><td align="left"><div class="button_blue"><p><a  id="relsmajli">Smajli<span></span> </a></p></div></td><td align="left"><div class="button_blue"><p><a  id="relgrupa">Grupa<span></span> </a></p></div></td><td align ="left"><div class="button_blue"><p><a  id="relpozovi">Dodaj u chat<span></span> </a></p></div></td><td align ="left"><div class="button_blue"><p><a  id="relblokiraj">Blokiraj<span></span> </a></p></div></td><td align ="left"><div class="button_blue"><p><a  id="relzvuk">Zvuk<span></span> </a></p></div></td></tr></table></td></tr></table></div>';
//alert(c);
buttonElems.innerHTML = c;

document.getElementById('settings_container').innerHTML+='<span id=dummyspan></span>';
addButtonListener();
}


function popuniSmajli(){
 //alert('iz metoda ' +  vanjskismajli.length);
 if(vanjskismajli.length == 0)
     return;
   var div = document.getElementById("dinamickismajli");
    if(div == null)
       return;
 var con = '<table width="100%"><tr>';
 ii=1;
 for(i=0;i<vanjskismajli.length;i++) {
       con += '<td><div onclick=insertsmajli("' + vanjskismajli[i] + '"); style="display:run-in;float:left;padding-left:5px;" id="smajlici_' + i + '"><img style="vertical-align:bottom;border:0px; padding-top:11px;" src="' +vanjskismajli[i] + '"></div></td>';
       if(ii==5) {
             con += '</tr><tr>';
             ii=0;
         }
    ii++;
 }
 con += '</tr></table>';
 div.innerHTML = con;
}

function popuniZvuk(){
//alert('iz metoda ' +  vanjskizvuk.length);
 if(vanjskizvuk.length == 0)
     return;
   var div = document.getElementById("dinamickizvuk");
    if(div == null)
       return;
 var con = '<table width="100%"><tr>';
 ii=1;
 for(i=0;i<vanjskizvuk.length;i++) {
	cc = vanjskizvuk[i].split('=');
       con += '<td><div onclick=insertzvuk("' + cc[1] + '","' + cc[0] + '"); style="display:run-in;float:left;padding-left:5px;cursor: pointer;" id="zvuk_' + i + '"><h3>' + cc[0] + '</h3></div></td>';
       if(ii==5) {
             con += '</tr><tr>';
             ii=0;
         }
    ii++;
 }
 con += '</tr></table>';
 div.innerHTML = con;
}

setInterval(timedCount, 10);


function timedCount() {
	var mt = new Array();
	var mt1 = new Array();
	var n='';
	//alert(unsafeWindow.NChat.profile.length );
	for(idp in unsafeWindow.NChat.profile) {
		m = unsafeWindow.NChat.profile[idp];
	if(m.idp != null && m.idp != '') {
	  	
		if(contains(blokirani,m.idp))
			mt1.push(m.idp);
	  n+= ' ' + m.idp +  ' ' + m.nick + ';';
	

	}

	}
	//alert(n + ' ');
	for(i=0; i < unsafeWindow.myArrayGroup.length;i++) {
			nasao=0;
		for(idp in unsafeWindow.NChat.profile) {	
		      m = unsafeWindow.NChat.profile[idp];
	                    if(m.idp != null && m.idp != '') {
	  			if(m.idp == unsafeWindow.myArrayGroup[i]){
					
					nick = getNickFromIdp(unsafeWindow.myArrayGroup[i]).toLowerCase();
						
								if(nick != 'unknown'){
									nasao=1;
                                        				break;

									}
						
                                      }
			
	         		}
			}
		if(nasao==0)	
                   mt.push(unsafeWindow.myArrayGroup[i]);			
            }

	for(i=0; i < mt.length;i++) {
		
		unsafeWindow.removeByValue(unsafeWindow.myArrayGroup,mt[i]);
		//alert('skinuo' + mt[i]);
	}
	for(i=0; i < mt1.length;i++) {
		
		unsafeWindow.NChat.removeFromList(mt1[i]);
		//alert('blokirao' + mt1[i]);
	}

	


}



function addButtonListener(){
  var button = document.getElementById("greasemonkeyButtonSlika");
  button.addEventListener('click',message_send_slika,true);
  var button2 = document.getElementById("greasemonkeyButtonYouTube");
  button2.addEventListener('click',message_send_youtube,true);
  getalink();
  var button3 = document.getElementById("noviSend");
  //button3.addEventListener('click',message_send_modified,true);

 
 button3.addEventListener('click',function (e) {
    var tt = document.getElementById('messagerow');
    var mess = tt.value;
    if (mess == "") return;
    
    if(isEnhanced() && mess.indexOf('%%**font color') ==-1) {

         mess = '%%**font color="' + getColor() + '"##@@' + mess + '%%**/font##@@';

     }
       if(isEnhanced()) {
              // alert(mess);
                  mess = putRegex(mess); 
                //alert(mess);
         
    }
   //alert(mess);


    tt.value="";
    unsafeWindow.NDebug.log(mess + unsafeWindow.NChat.activIdp,2);
     if(unsafeWindow.NChat.activIdp==null)return;
     if(!unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp])return;
     //NDebug.log(NChat.profile,2);
     //alert(unsafeWindow.NChat.activIdp);

	 messrav = mess;
	 messrav = unsafeWindow.unescape(messrav);
         messrav = unsafeWindow.NUtil.replaceIcon(messrav);
         messrav= '<div>[' +unsafeWindow.NUtil.getFormatedDate() + '] <strong>' +unsafeWindow.NLang[unsafeWindow.NConfig.lang].mynick + ':</strong> ' +          messrav + '</div>';
         messrav = removeRegex(messrav);

        var parameter = {
	    "class":"private",
	    "instance":unsafeWindow.NChat.activIdp,
	    "function":"send",
	    "parameter":mess
	};
	
	unsafeWindow.NConnectorSend.send("../online/send",parameter,null);

	//alert(mess);
	unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message += messrav;
		if(!isPrivate()){
		   for(i = 0;i<unsafeWindow.myArrayGroup.length;i++) {
			//alert('prije slanja2');
			if(unsafeWindow.myArrayGroup[i] != unsafeWindow.NChat.activIdp) {
				var parameter2 = {
		    			"class":"private",
		    			"instance":unsafeWindow.myArrayGroup[i],
		    			"function":"send",
		    			"parameter":mess
					};
				try
  					{
 						unsafeWindow.NConnectorSend.send("../online/send",parameter2,null);
				                unsafeWindow.NChat.profile[unsafeWindow.myArrayGroup[i]].message += messrav + '^^~~';
				
                                        }
                                        catch(err)
                                          {
                                    
                                          }
				//alert('poslao ' + unsafeWindow.myArrayGroup[i]);
	
			}
	
	
	
	
	
		}
	}
	
	





	if(!unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].active)return;
	
	//alert('aktivna');
	//alert(unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message);
	 var divdisplay = document.getElementById('display_container');
	 divdisplay.innerHTML = unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message;
         divdisplay.scrollTop = divdisplay.scrollHeight;
	 tt.focus();
         e.stopPropagation();

},true);

cc = 0;
var button4 = document.getElementById("relboja");
button4.addEventListener('click',bojalink,true);
var button5 = document.getElementById("btxboja");
button5.addEventListener('click',bojalink,true);
var button6 = document.getElementById("btxsmajli");
button6.addEventListener('click',smajlilink,true);
var button7 = document.getElementById("relsmajli");
button7.addEventListener('click',smajlilink,true);
var button8 = document.getElementById("btxgrupa");
button8.addEventListener('click',grupnichat,true);
var button9 = document.getElementById("relgrupa");
button9.addEventListener('click',grupnichat,true);

var button10 = document.getElementById("relpozovi");
button10.addEventListener('click',pozovichat,true);

var button11 = document.getElementById("btxpozovi");
button11.addEventListener('click',pozovichat,true);

var button12 = document.getElementById("btxpozovi2");
button12.addEventListener('click',pozoviuchat,true);


var button13 = document.getElementById("relblokiraj");
button13.addEventListener('click',blokiraja,true);

var button14 = document.getElementById("btxblokiraj");
button14.addEventListener('click',blokiraja,true);

var button15 = document.getElementById("btxblokiraj2");
button15.addEventListener('click',blokirajb,true);

var button16 = document.getElementById("btxzvuk");
button16.addEventListener('click',zvuklink,true);
var button17 = document.getElementById("relzvuk");
button17.addEventListener('click',zvuklink,true);

var tt = document.getElementById('messagerow');
tt.addEventListener("keydown", textareaKeydown, 0);

var ttslika = document.getElementById('messagerow2');
ttslika.addEventListener("keydown", textareaKeydownslika, 0);

var tturl = document.getElementById('messagerow3');
tturl.addEventListener("keydown", textareaKeydownurl, 0);

var ttp = document.getElementById('pozovitxt');
ttp.addEventListener("keydown", textareaKeydownpozovi, 0);

var ttb = document.getElementById('blokirajtxt');
ttb.addEventListener("keydown", textareaKeydownblokiraj, 0);



var divdisplay = document.getElementById('display_container');


divdisplay.addEventListener('DOMNodeInserted',function (e) {
counter++;
var m = unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message;

f = m.indexOf('((!!');


biozvuk = false;
if(f>-1)
biozvuk=true;




if((m.indexOf('^^~~') == -1  && m.indexOf('<i>') == -1 && m.indexOf('</i>') == -1 && m.indexOf('%%**') == -1 && m.indexOf('##@@') == -1) && !biozvuk ){

//alert(m);
appended = true;
}
else{
appended = false;
//alert('nije ' + m);

}
if(appended)
	return;


 appended = true;
pom = ''
pom = m;
var arrSound = new Array();
while(f>-1) {

	ma = m.substring(0,f);
        mb = m.substring(f + 4);
	pom = m.substring(f + 4);
	f = pom.indexOf('))!!');
	if(f>-1) {
	s = pom.substring(0,f);
	ss = s.split("=");
       arrSound.push(ss[1]);
	//alert(ss[0] + ' ' + ss[1]);
	ma+=ss[0];
	
	//alert(pom.substring(0,f));
	mb = pom.substring(pom.substring(0,f).length + 4);


	}
m = ma + mb;
f = m.indexOf('((!!');
//alert( m);
biozvuk=true;
} 
if(biozvuk && arrSound.length > 0) {
DHTMLSound(arrSound[arrSound.length - 1]);


}

 //alert(divdisplay.innerHTML);
  //if(unsafeWindow.NChat.activIdp==null)return;
  //if(!unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp])return;
	
  //alert(NChat.activIdp);
  //alert(nc.activIdp);
  // var m = unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message;
   //alert(m);


   m = removeRegex(m);
  // alert(m);
   
   unsafeWindow.NChat.profile[unsafeWindow.NChat.activIdp].message = m;
   
  	for(idp in unsafeWindow.NChat.profile) {
		mm = unsafeWindow.NChat.profile[idp];
	if(mm.idp != null && m.idp != '' && mm.idp != unsafeWindow.NChat.activIdp) {
	  if(!strEndsWith(unsafeWindow.NChat.profile[mm.idp].message,'^^~~'))
		unsafeWindow.NChat.profile[mm.idp].message+= '^^~~';
	  
	
		}
	}
   
   divdisplay.innerHTML= m;
  divdisplay.scrollTop = divdisplay.scrollHeight;
   setTimeout(appendtimeout, 50);
    e.stopPropagation();

},false);



document.getElementsByTagName('title')[0].addEventListener('DOMAttrModified',function (e) {

	if(modtitle)
	   return;
	modtitle = true;
   var textNode = e.target;
	  if(e.attrName.toLowerCase() == 'title' || e.attrName == 'innerHTML') {
	
	c = removeRegex(e.newValue);
	c = stripHTML(c);
	
document.getElementsByTagName('title')[0].title = c;
document.getElementsByTagName('title')[0].innerHTML = c;
//alert(document.getElementsByTagName('title')[0].title);
 setTimeout(resetTimerTitle, 50);

}
          
    e.stopPropagation();

},false);


}
var modtitle=false;
function resetTimerTitle() {
modtitle = false;

}
function stripHTML(strInputCode) {
return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
}

function strEndsWith(str, suffix) {
  return  str.indexOf(suffix, str.length - suffix.length) !== -1;

}

var counter=0;
var appended = false;
function appendtimeout(){
appended = false;
}


function insertsmajli(id) {
expandCollapse('smajli','over');
//alert(tt1.value);
var tt = document.getElementById('messagerow');
  if(isEnhanced())
          tt.value += '%%**img alt="" src="' + id + '"/##@@';
  else
          tt.value += id;

tt.focus();
}

function insertzvuk(id,ime) {
expandCollapse('zvuk','over');
//alert(tt1.value);
var tt = document.getElementById('messagerow');
  if(isEnhanced())
          tt.value += '((!!'  + ime + '=' + id + '))!!';
  else
          tt.value += id;

tt.focus();
}
addFunction(insertzvuk,false);

function isEnhanced(){
var chk = document.getElementById("chkcompatibility");
return chk.checked;
}
function isPrivate(){
var chk = document.getElementById("chkcompatibility2");
return chk.checked;
}
// Inject the function and execute it:
addFunction(insertsmajli, false);
addFunction(expandCollapse, false);
addFunction(isEnhanced, false);


function message_send_slika() {
 var tt1 = document.getElementById('messagerow2');
    if(tt1 == null || tt1.value == '')
      return;
    //alert(tt1.value);
   var tt = document.getElementById('messagerow');
    if(isEnhanced())
          tt.value = '%%**img alt="" src="' + tt1.value + '"/##@@';
    else
         tt.value += tt1.value;
 tt1.value="";
 tt.focus();
}

function message_send_youtube() {
 var tt1 = document.getElementById('messagerow3'); 
       if(tt1 == null || tt1.value == '')
            return;
      //alert(tt1.value);
      var tt = document.getElementById('messagerow');
      if(isEnhanced())
          tt.value = '%%**a href="' + tt1.value + '" target="_blank"    ##@@' + tt1.value + '%%**/a##@@';
      else 
          tt.value += tt1.value;
  tt1.value="";
  tt.focus();
}

addFunction(getColor,false);

