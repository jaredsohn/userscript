// ==UserScript==
// @name           Ikariam Transport Resources Logger
// @namespace      Test
// @author         Martynius (http://userscripts.org/users/68307)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/users/68307
// @description    Logs the change in resources as you select them for transport (A test script for Iknietjij).
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://s*.ikariam.*/index.php?*view=transport*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

var goods = {wood:0, wine:0, marble:0, glass:0, sulfur:0};
function changeResource( resource, input ) {
	var value = parseInt( input );
	if ( !isNaN( value ) ) {
		goods[resource] = value;
		total = 0;
		for ( var i in goods ) total += goods[i];
		GM_log( "Resources: " + goods.toSource() + ": " + total );
	}
}

const resources = ["wood","wine","marble","glass","sulfur"];
var dragging = false;
for ( var i = 0; i < resources.length; i++ ) {
	$("li." + resources[i]).each( function() {
		var resource = resources[i];
		var input = $("input.textfield", this)[0];
		$("div.sliderinput", this).each( function() {
			$("div.sliderthumb", this)
				.mousedown(	function() { dragging = {r:resource, i:input}; });
			$(this)	.click( function() { changeResource( resource, input.value ); });
			$("a", this)
				.click( function() { changeResource( resource, input.value ); });
		});
		$("input.textfield", this)
			.keyup( function() { changeResource( resource, input.value ); });
	});
}
function delayDrag() {
	changeResource( dragging.r, dragging.i.value );
}
$("body").mousemove( function() {
		if (dragging !== false)
			setTimeout( delayDrag, 10 );
	})
	.mouseup   ( function() { dragging = false; });
