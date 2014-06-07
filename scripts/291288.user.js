// ==UserScript==
// @name           Kryptowaluty
// @namespace      meh
// @include        http://*.wykop.pl/*
// ==/UserScript==



if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	
	var kpw='<div class="fleft">' +
				'<a href="http://www.wykop.pl/tag/wpisy/kryptowaluty/wszystkie/" title="tag #kryptowaluty"'+
				'class="tip fleft cfff tab fbold  selected tdnone">#Kryptowaluty</a>'+
			'</div>';
	




	$('nav.main.medium.rel').append(kpw);
	

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}