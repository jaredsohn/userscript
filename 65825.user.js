// ==UserScript==
// @name Turbofilm userjs v0.1
// @namespace Turbofilm 
// @description turbofilm
// @author Longer
// @include http://turbofilm.ru*
// ==/UserScript==

(function(){
window.addEventListener('load',
	function (e){
		main();
	}
, true);
})();


function main(){
	var list = document.body.getElementsByTagName('span');
	for(var i = 0; i < list.length; i++) {
		var elem = list[i];
		if (elem.id.indexOf("commtext") == 0 || elem.className == "blogpostotext"
				|| elem.className == "mymespostotext"){
			elem.innerHTML = pars(elem.innerHTML);
		}
	}	
}

function pars(t){
	return t.replace(
		/((https?|ftp|telnet):\/\/([\w.:?#@_=%\/+-]|(&amp;|&))+)|([\w_-]+(\.[\w_-]+)*@[\w_-]+(\.[\w_-]+)+)/gi,
		"<a href=\"$1\">$1</a>"
	);
}