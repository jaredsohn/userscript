// ==UserScript==
// @name           MirkoFM
// @namespace      silent_digger
// @include        http://*.wykop.pl/*
// ==/UserScript==



if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	
	var MirkoFM='<div class="fleft">' +
				'<a href="http://mirkofm.net" target="_blank" title="Tylko prawilna muzyka."'+
				'class="tip fleft cfff tab fbold  ">MirkoFM</a>'+
			'</div>';
	
	$('nav.main.medium.rel').append(MirkoFM);
	

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}