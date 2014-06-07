// ==UserScript==
// @name           OGStats Lookup
// @namespace      http://www.pigstye.net
// @description    Lookup a player on ogamestats.org from galaxy view
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

var loc = document.location;
var reg = /http:\/\/(.*?)\/game\/(.*?)/i;
var result = reg.exec( loc );
var server = result[1];
var country = server.split('.')[2];
var universe = server.split('.')[0].replace('uni','');

var th = document.getElementById("content").getElementsByTagName('a');
for(i=0;i<th.length;i++){
  oc=th[i].getAttribute('onclick')
	if(oc!=undefined && oc.indexOf('javascript:doit')!=-1){
		y = document.createElement('span');
		player = th[i].parentNode.previousSibling.previousSibling.previousSibling.previousSibling.childNodes[1].lastChild.innerHTML;
		y.innerHTML = '<a href="http://ogame.gamestats.org/'+country+'/'+universe+'/search/player/'+player+'" target="blank">S</a>';
		th[i].parentNode.appendChild(y);
	}
}

