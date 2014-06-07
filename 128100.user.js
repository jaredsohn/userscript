// ==UserScript==
// @name           Rozszerzanie belki - WGZ
// @namespace      wykop_pandas
// @include        http://*.wykop.pl/*
// ==/UserScript==



if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}

function main(){
	
	var WGZ='<div class="fleft">' +
				'<a href="http://wgz.wykop.pl/" title="WGZ"'+
				'class="tip fleft cfff tab fbold  ">WGZ</a>'+
			'</div>';	
			
	
	$('nav.main.medium.rel').append(WGZ);

}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}