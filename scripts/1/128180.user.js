// ==UserScript==
// @name           Rozszerzanie belki, ekonomia
// @namespace      wytest
// @include        http://*.wykop.pl/*
// ==/UserScript==



if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	
	var grp='<div class="fleft">' +
				'<a href="http://grupa-ratowania-poziomu.wykop.pl/" title="Grupa Ratowania Poziomu"'+
				'class="tip fleft cfff tab fbold  ">GRP</a>'+
			'</div>';	
			
	var H='<div class="fleft">' +
				'<a href="http://historia.wykop.pl/" title="Historia"'+
				'class="tip fleft cfff tab fbold  ">H</a>'+
			'</div>';
	var F='<div class="fleft">' +
				'<a href="http://astronomia-fizyka-matematyka.wykop.pl/" title="Astronomia, fizyka i matematyka"'+
				'class="tip fleft cfff tab fbold  ">F</a>'+
			'</div>';
	var E='<div class="fleft">' +
				'<a href="http://ekonomia.wykop.pl/" title="Ekonomia"'+
				'class="tip fleft cfff tab fbold  ">E</a>'+
			'</div>';
	


	$('nav.main.medium.rel').append(grp);
	$('nav.main.medium.rel').append(H);
	$('nav.main.medium.rel').append(F);
	$('nav.main.medium.rel').append(E);
	
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}