// ==UserScript==
// @name        Mighty Morphin' Morphology
// @namespace   http://www.flightrising.com/
// @description 'Instant' Predictions & Eyecolour Option
// @include     http://flightrising.com/main.php?p=scrying&view=morphintime
// @version     1
// @grant       none
// ==/UserScript==

$('form').after('<script type="text/javascript"> \
	var theFlight = /(\\w+)\_banner.png/.exec($("img[src*=\'elemental_banners\']").attr("src"))[1]; \
	theFlight = theFlight.charAt(0).toUpperCase() + theFlight.substring(1); \
	function lolRedNinjaRanger() { \
		if($("#breed").val()&&$("#gender").val()&&$("#setage").val()&&$("#prigene").val()&&$("#bodycolor").val()&&$("#secgene").val()&&$("#wingcolor").val()&&$("#tertgene").val()&&$("#tertcolor").val()) { \
			lolRedRanger(); \
		} \
	} \
	function jeepersCreepers() { \
		var thePic = $("#newdragon img").attr("src"); \
		var oldElem = /elem=(\\d+)/; \
		var newElem = "elem\="+$("#element").val(); \
		console.log(thePic.replace(oldElem, newElem)); \
		var newPic = thePic.replace(/elem=\\d+/, newElem); \
		$("#newdragon img").attr("src", newPic);\
	}\
	function runAway() { \
		$("#makindragons")[0].reset(); \
	} \
	function cowsWithHats() { \
		$("select").each(function() { \
			var theOptions = $(this).find("option"), \
				random = ~~(Math.random() * theOptions.length-1)+1; \
			theOptions.eq(random).prop("selected", true); \
		});\
		lolRedRanger(); \
	} \
	</script>'
);

$('select').attr('onChange','lolRedNinjaRanger()');
$('#tertgene option:first-child').html('Tertiary Gene');
$('select[name*="gene"]').attr('style','position:relative; top: 1.5em;');
$('select[name*="color"]').attr('style','position:relative; top: -1.5em;');
$('#makindragons').attr('style','position: relative; top:15px;');
$('#makindragons .thingbutton').css('display','none').before('\
	<select id="element" name="element" onChange="jeepersCreepers()"> \
		<option value="">Element</option> \
		<option value="1">Earth</option> \
		<option value="2">Plague</option> \
		<option value="3">Wind</option> \
		<option value="4">Water</option> \
		<option value="5">Lightning</option> \
		<option value="6">Ice</option> \
		<option value="7">Shadow</option> \
		<option value="8">Light</option> \
		<option value="9">Arcane</option> \
		<option value="10">Nature</option> \
		<option value="11">Fire</option> \
	</select> \
	<br/>');
$('#element').after('<br/><input class="beigebutton thingbutton" type="button" onclick="runAway()" value="Reset" style="position: relative; top: .5em; padding: 0px 20px; width: 120px;">').after('<br/><input class="beigebutton thingbutton" type="button" onclick="cowsWithHats()" value="Random" style="position: relative; top: .3em; padding: 0px 20px; width: 120px;">');	
$('select[name="element"] > option:contains("' + theFlight + '")').attr('selected', 'selected');	
	
$(document).ajaxSuccess(function(e, xhr, options) {
		if (options.url.indexOf('scryer_getdragon') > -1) {
            jeepersCreepers();
        }
});