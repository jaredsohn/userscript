// ==UserScript==
// @name           Naruszenia na belce
// @namespace      whatever
// @include        http://*.wykop.pl/*
// ==/UserScript==

function main(){

	var x = "<div class = 'fleft'><a href='http://www.wykop.pl/naruszenia/moje/' title = 'naruszenia' class='tip fleft cfff tab fbold  '>Naruszenia</a></div>";
	$('nav.main.medium.rel').append(x);

}
function addJQuery(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}
if(unsafeWindow.jQuery){
var $ = unsafeWindow.jQuery;
 main();
} else {
 addJQuery(main);
}