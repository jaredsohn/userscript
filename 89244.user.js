// ==UserScript==
// @name           galaxy checker
// @namespace      KamaZz
// @include        http://*.ogame.*/game/index.php?page=galaxy&session=*
// ==/UserScript==

var document = unsafeWindow.document;
var $ = unsafeWindow.$;
$("#extendedgalaxy")
		.html(
				'<input type="text" id="gn" size="1" />&nbsp;<input value="Check entered galaxy" type="button" onclick="check(document.getElementById(\'gn\').value);" />');
unsafeWindow.check = check;
function check(galaxy) {
	$("#galaxy_input").val($("#gn").val());
	$("#system_input").val('1');
	unsafeWindow.submitForm();
	check_sys();
}
function check_sys() {
	setTimeout((function() {
		var sum = 0;
		for ( var i = 0; i < 16; i++) {
			var debris = $('div#debris' + i);
			var metal = debris.find('li.debris-content:first');
			var crystal = debris.find('li.debris-content:last');
			var recycles = debris.find('li.debris-recyclers');
			// $.isArray('li.debris-recyclers');
			if (recycles.html() != null) {
				sum = recycles.html().replace(/\D/g, "");
				if (sum >= 5) {
					/*
					 * alert(sum + " < [" + $("#galaxy_input").val() + ":" +
					 * $("#system_input").val() + ":" + i + "]<br />" +
					 * metal.html() + "<br />" + crystal.html());
					 */
					$('#myPlanets').append(
							"<br />" + sum + " < [" + $("#galaxy_input").val()
									+ ":" + $("#system_input").val() + ":" + i
									+ "]<br />" + metal.html() + "<br />"
									+ crystal.html());
				}
			}
		}
		if ($("#system_input").val() != 499) {
			unsafeWindow.submitOnKey(39);
			check_sys();
		}
	}), 2000);
}
// setInterval((function()
// {alert(document.getElementsByClassName("debris")[0].innerHTML)}), 2000);
