// ==UserScript==
// @name           Pigskin Empire: Practice Scout
// @version        0.2
// @include        http://pigskinempire.com/practiceresult.aspx?*
// @include        http://*.pigskinempire.com/practiceresult.aspx?*
// @description    Add links for watching practices 
// ==/UserScript==
 
window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	
	var menu = document.getElementById("PracticeResultNav");
	var list = menu.getElementsByTagName("ul")[0];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = window.location.toString().replace("practiceresult.aspx?s=","game.aspx?gnum=0&level=College&gslot=");
	a.innerHTML = "WATCH";
	li.appendChild(a);
	list.appendChild(li);
}
 
 