// ==UserScript==
// @name		twitter futbol takip enstrumani
// @version		1.1
// @namespace		http://www.acikfutbol.com
// @author      	@ziegfiroyt
// @description		acik futbol iftiharla sunar.
// @include		https://twitter.com/*
// @include		http://twitter.com/*
// ==/UserScript==

(function() {
function add_custom_module(){
	var nick = document.getElementsByClassName('js-mini-current-user')[0].getAttribute('data-screen-name');
	var dashboard  = document.getElementsByClassName('dashboard')[0];	
	var div=document.createElement("div");
	div.className = 'component';   
	div.innerHTML = '<div class=\"module acik\"><iframe src=\"http://www.acikfutbol.com/twitter/'+nick+'/version/1.1\" width=\"100%\" height=\"250\" scrolling=\"no\" frameborder=\"0\" id=\"tfrm\" class=\"twfrm\"></iframe></div>';
	dashboard.appendChild(div);
}
document.addEventListener('DOMNodeInserted', function (e) {
//unsafeWindow.console.log(e.target.className);
if (e.target.className == "module mini-profile component"){
add_custom_module();
}
});
})();