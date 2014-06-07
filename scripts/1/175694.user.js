// ==UserScript==
// @name       Moje zgłoszenia
// @include     http://www.wykop.pl/*
// @include     http://wykop.pl/*
// ==/UserScript==
// Chamsko zerżnąłem kod @pandas ze starego dodatku, ale chyba działa.

if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	
	var mz='<div class="fleft">' +
				'<a href="http://www.wykop.pl/naruszenia/moje/" title="Moje zgłoszenia"'+
				'class="tip fleft cfff tab fbold  ">Moje zgłoszenia</a>'+
			'</div>';	
			

$('nav.main.medium.rel').append(mz);
	

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}