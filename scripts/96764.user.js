// ==UserScript==
// @name           pulse mafa wars
// @namespace     http://userscript.org/users/291717
// @include       http://apps.yahoo.com/iframe/yNmsEV4q/YahooFullView/*
// @include       http://pulse.yahoo.com/y/apps/games/yNmsEV4q/*
// @include       http://games.yahoo.com/game/mafia-wars
// @include		   http://self.mud.apps.yahooapis.com/shindig/gadgets/*
// @include		   http://self.re3.apps.yahooapis.com/shindig/gadgets/*
// ==/UserScript==
if(document.getElementById('bootFrame')){
attributestring = document.getElementById('bootFrame').getAttribute('style');
document.getElementById('bootFrame').setAttribute('style',attributestring + 'overflow:auto; height:550px;');
document.getElementById('bootFrame').setAttribute('width', '774px');
} 
if(document.getElementById('yut-yap-frm')){
	document.getElementById('yut-yap-frm').setAttribute('width', '790px');
}
if(document.getElementById('yap-chrome-yNmsEV4q')) {
	document.getElementById('yap-chrome-yNmsEV4q').setAttribute('style',"width:auto;");
	document.getElementById('yap-chrome-yNmsEV4q').parentNode.setAttribute('style',"width:auto;");
	document.getElementById('yap-chrome-yNmsEV4q').childNodes[7].setAttribute('style',"width:auto; ");
	document.getElementById('yap-chrome-yNmsEV4q').childNodes[7].setAttribute('class','');
}
