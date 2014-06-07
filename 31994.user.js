// ==UserScript==
// @name           TibiaML Improved
// @author         Pnoexz (pnoexz@hotmail.com)
// @description    Allows you to have any theme and removes ads
// @include        http://*.tibiaml.com/*
// @version        1
// ==/UserScript==


/* Ads free */

var allths = document.getElementsByTagName('th');
for(var i=0;i < allths.length;i++) { if(allths[i].textContent == "Ads") { allths[i].parentNode.parentNode.parentNode.style.display = "none"; } }
var allifr = document.getElementsByTagName('iframe');
for(var i=0;i < allifr.length;i++) { if(allifr[i].name == "google_ads_frame") { allifr[i].style.display = "none"; } }


/* Free themes */

if (document.cookie.split("theme=")[1] != null) {
document.getElementsByTagName('link')[6].href = "http://beta.tibiaml.com/files/css/"+document.cookie.split("theme=")[1].split(';')[0]+".css";
}

if (window.location.href.match('account/theme')) {

function addJs(js) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('script');
  style.type = 'text/javascript';
  style.innerHTML = js;head.appendChild(style);
}

addJs("function changeImage(src) {"+
 "document.getElementById('pnoexzimg').src='http://beta.tibiaml.com/images/skin/all/'+src.value+'.png';"+
 "document.getElementById('pnoexzbutton').textContent='Use this theme';"+
 " }"+
 "function useTheme() {"+
 "var exdate=new Date();"+
 "exdate.setDate(exdate.getDate()+365);"+
 "document.cookie='theme'+'='+document.getElementById('select').value+'; expires='+exdate.toGMTString()+'; domain=tibiaml.com; path=/';"+
 "document.getElementById('pnoexzbutton').textContent='Using '+document.getElementById('select').value;"+
 "document.getElementsByTagName('link')[6].href = 'http://beta.tibiaml.com/files/css/'+document.cookie.split('theme=')[1].split(';')[0]+'.css'"+
 "}");

var configDiv = document.createElement('div');
configDiv.setAttribute('style','border:1px solid black;height:120px;width:600px;position:relative;left:100px;margin:0 auto;padding:0')
document.getElementById("main").parentNode.insertBefore(configDiv,document.getElementById("main"))

configDiv.innerHTML = '<table cellpadding="10"><tr><td valign="top" style="width:250px">&nbsp;<a onclick="return false" href="">Pnoexz\'s theme selector</a><br><br>'+
 '<select style="margin:0 auto;width:200px;" id="select" onchange="changeImage(this)">'+
 '<option value="jungle">Jungle</option><option value="night">Night</option><option value="universe">Universe</option><option value="pirate">Pirate</option><option value="nightmare">Nightmare</option><option value="blightwalker">Blightwalker</option><option value="desert">Desert</option><option value="fire">Fire</option><option value="ice">Ice</option><option value="underwater">Underwater</option><option value="plague">Plague</option></select>'+
 '<button id="pnoexzbutton" onclick="useTheme()" style="margin:10px 0px 0px 20px;width:160px;">Use this theme</button></td><td><img id="pnoexzimg" src="http://beta.tibiaml.com/images/skin/all/jungle.png"></td></tr></table>';
}