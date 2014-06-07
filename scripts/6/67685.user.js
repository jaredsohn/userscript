// ==UserScript==
// @name           Hauptplanetv2
// @namespace      Hauptplanetv2
// @description    Zeigt Hauptplanet des Users an
// @include        http://*/game/index.php?page=*
// ==/UserScript==

if (document.location.href.indexOf('writemessage') == -1)
{
urls=new Array();

function get_from_to(strLine, begin, end) {
return strLine.substring(strLine.indexOf(begin) + begin.length , strLine.indexOf(end));
}

function insertAfter(newElement,targetElement) {
var parent = targetElement.parentNode;
if (parent.lastChild == targetElement){
parent.appendChild(newElement);
}
else{
parent.insertBefore(newElement,targetElement.nextSibling);
}
}


unsafeWindow.checkHomePlanet = function (xurl){
window.setTimeout(function() {
GM_xmlhttpRequest({
method: 'GET',
url: urls[xurl],
onload: function(responseDetails) {
txt=responseDetails.responseText;
txt=get_from_to(txt,'<input type="text" name="to" size="40" value="',']" /></th>');
txt=txt.substr(txt.indexOf('[')+1);
txt1=txt.match(/([0-9]+):([0-9]+):([0-9]+)/);
txt = '<a href="'+document.location.href.replace(/(statistics|galaxy|messages)/,'galaxy&galaxy='+txt1[1]+'&system='+txt1[2]+'&position='+txt1[3])+'">'+txt+'</a>';
document.getElementById('homeimg'+xurl).innerHTML='&nbsp;' + txt + ' ';
}
});
}, 0);
};

var pagina = document.getElementsByTagName ('a');
cnt=0;
for (var i = 0; i < pagina.length; i++) {
if (pagina[i].href.search("page=writemessages") != -1){
var xspan = document.createElement("span");
urls[cnt]=pagina[i].href;
xspan.innerHTML='<span id="homeimg' + cnt + '"><a href="#" onclick="javascript:checkHomePlanet(' + cnt + ');this.blur();" style="text-decoration:none;"> <img src="http://img80.imageshack.us/img80/601/maison.gif" title="Hauptplanet anzeigen" border="0"></a></span>';
insertAfter(xspan,pagina[i]);
cnt++;
}
}

}