// ==UserScript==
// @name            Pardus Fast Bot Use
// @namespace   http://*.pardus.at/
// @author          Yog
// @version         0.99
// @description  Adds fast links for using bots and more. 
// @include	http://*.pardus.at*
// @match	http://*.pardus.at*
// ==/UserScript==

var myarmor = 600;
var armorclass = 36; /* use values: 30 36 45 60  120 180  for one of the armor classes eg 30 for x6 or 180 for x1 armor class */

if (document.location.href.match('main.php') || document.location.href.match('combat.php')) {

var imgtag = document.getElementsByTagName('img');
for(var i = 0; i < imgtag.length; i++) 
{
 if(imgtag[i].getAttribute('alt') == 'Robots')
 {
  var divtag = document.createElement('div');
  imgtag[i].parentNode.appendChild(divtag);

  if (document.location.href.match('main.php')) {
   var armor = document.getElementsByName('cloaking')[0].parentNode.getElementsByTagName('table')[0];
   armordmg = armor.rows[1].getElementsByTagName('font')[1].textContent;
   armor = armor.rows[1].getElementsByTagName('font')[2].textContent.replace('/', '');
   var botsa = Math.floor((armor - armordmg) / armorclass);
   if (botsa != 0) {
    var nrbots = imgtag[i].parentNode.textContent.split(" ")[0].replace(':', '');
	var atag = document.createElement('a');
    divtag.setAttribute("style", "position:absolute;width:25px;"); 
    divtag.appendChild(atag);
    atag.setAttribute("style", "font-size:10px;white-space:nowrap");
	if (nrbots < botsa) {
	 botsa = nrbots;
	 atag.setAttribute("style", "font-size:10px; color:yellow !important");
	}
    atag.setAttribute("href", "main.php?amount=" + botsa + "&resid=8&useres=Use");
    atag.innerHTML = "Use " + botsa ;
   }
  }
   
  if (document.location.href.match('combat.php')) {
   divtag.setAttribute("style", "position:absolute; margin:5px auto 0px auto; left:0px; width:100%;");
   divtag.setAttribute("id", "bots-container");
   var armordmg = imgtag[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('table')[1].getElementsByTagName('font')[1].textContent.split(" ")[2];
   var botsa = Math.floor((myarmor - armordmg) / armorclass);
   if (botsa != 0) {
    var nrbots = imgtag[i].parentNode.nextSibling.textContent;
	var inputtag = imgtag[i].parentNode.nextSibling.nextSibling.getElementsByTagName('input')[1];
	if (nrbots < botsa) {
	 botsa = nrbots;
	 inputtag.setAttribute("style", "color:yellow !important");
	}
    inputtag.setAttribute("value", botsa);
	imgtag[i].parentNode.nextSibling.nextSibling.getElementsByTagName('input')[2].setAttribute("id", "dupa");
	imgtag[i].parentNode.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "dupa2");
	imgtag[i].parentNode.setAttribute("style", "border-bottom:16px solid transparent");
	imgtag[i].parentNode.nextSibling.setAttribute("style", "border-bottom:16px solid transparent");
	imgtag[i].parentNode.nextSibling.nextSibling.setAttribute("style", "border-bottom:16px solid transparent");
   for(var j = 1; j <= botsa; j++) {
    var atag = document.createElement('a');
    divtag.appendChild(atag);
    atag.setAttribute("style", "font-size:12px; padding:0px 5px; border:1px #2871C2 outset; border-right:4px solid #00001C; background:url(http://psgrafika.republika.pl/button2.png) center center #144A91;");
    atag.setAttribute("href", "javascript:document.getElementById('dupa2').value=" + j + ";document.getElementById('dupa').click();");
    atag.innerHTML = "Use " + j ;
	
    }
   }

  }
   
 }
}
}


if (document.location.href.match('combat.php')) {
// bots on pvp combat page
   var armordmg = document.getElementsByName('ok')[0].parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.getElementsByTagName('font')[1].textContent.split(" ")[2];
   var botsa = Math.floor((myarmor - armordmg) / armorclass);

   if (botsa != 0) {
    var atag = document.createElement('a');
    document.getElementsByName('ok')[0].parentNode.appendChild(atag);
    atag.setAttribute("href", "main.php?amount=" + botsa + "&resid=8&useres=Use");
    atag.innerHTML = "<br />Use " + botsa + " bots for full repair";
   }

// 1-20 combat rounds
 document.getElementsByName('rounds')[0].getElementsByTagName('option')[0].setAttribute("id", "roundval");
 
 var container = document.createElement('div');
 document.getElementsByName('ok')[0].parentNode.appendChild(container);
 container.setAttribute("style", "position:absolute; margin:-112px -234px 0px 0px !important; right:50%; width:470px; background:#00001C;");
 container.setAttribute("id", "rounds-container");

 for(var j = 1; j < 21; j++) {
  roundtext = document.getElementsByName('rounds')[0].getElementsByTagName('option')[j-1].textContent.split("(")[1];
  var ctag = document.createElement('a');
  container.appendChild(ctag);
  ctag.setAttribute("style", "display:block; float:left; font-size:13px; width:43px; height:30px; margin:1px; border:1px #2871C2 outset; background:url(http://psgrafika.republika.pl/button2.png) center center #144A91; overflow:hidden");
  ctag.setAttribute("href", "javascript:document.getElementById('roundval').value=" + j + ";document.getElementsByName('ok')[0].click()");
  ctag.innerHTML = j + " <span>(" + roundtext + "</span>" ;
  }
}