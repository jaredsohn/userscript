// ==UserScript==
// @name           gmxTryHttps
// @namespace      http://www.gmx.net
// @description    replace gmxs http with https
// @include        *.gmx.*
// ==/UserScript==
(function(){
if(location.href.search(/http\:/) != -1 && location.href.search(/logout\.gmx/) == -1)
	location.href=location.href.replace('http:', 'https:');
var links = document.getElementsByTagName('a');
for(var i=0; i<links.length;i++){
	if(links[i].href.search(/\.gmx\./) != -1){
		links[i].href = links[i].href.replace('http:', 'https:');
	}
}
var forms = document.getElementsByTagName('form');
for(var i=0; i<forms.length;i++){
	if(forms[i].action.search(/\.gmx\./) != -1){
		forms[i].action = forms[i].action.replace('http:', 'https:');
	}
}
})();
