// ==UserScript==
// @name           AutoScanning
// @author	   BPEDHbIE from Capella.Ru
// @include        http://*.ogame.*/game/index.php?page=galaxy
// @include        http://*.ogame.*/game/index.php?page=messages
// @include        http://*.ogame.*/game/index.php?page=showmessage
// ==/UserScript==

var document = unsafeWindow.document;
var $ = unsafeWindow.$;

var galaxy = $("#galaxy_input");
var system = $("#system_input");
var rank = $("#bar li:eq(2)").text();
$("#galaxytableHead").after('<table cellspacing="0" cellpadding="0" border="0" id="galaxytable"><tr class="info info_headertd" colspan="13" id="interface"></td></tr></table>');
$("#interface").html('<span>Сканить <select><option value="all" selected="selected">Луны</option><option value="i">Планки</option></select> начиная с <input type="text" id="min" size="3" /> заканчивая <input type="text" id="max" size="3" />&nbsp;<input type="button" id="scanner" value="Вперёд" /></span>');
$("#scanner").click((function() {
	var min = $("#min").val().split(':');
	var max = $("#max").val().split(':');
	galaxy.val(min[0]);
	system.val(min[1]);
	unsafeWindow.submitForm();
	setTimeout((function() {
		parse(max[0], max[1], $("#interface option:selected").val());
	}), randomNumber(3000, 5000));
}));

$("#interface option:eq(1)").click((function() {
	$("#all").css("display", "none");
}))
$("#interface option:eq(0)").click((function() {
	$("#all").css("display", "inline");
}))

function randomNumber(m, n) {
	m = parseInt(m);
	n = parseInt(n);
	return Math.floor(Math.random() * (n - m + 1)) + m;
}
var parse = function(max_galaxy, max_system, where) {
	var address = window.location;
	address += "";
	var count;
	var galaxy = $("#galaxy_input");
	var system = $("#system_input");
	if (where == "all") {
		var target = 3;
	}
	else{
		var target = 1;
	}	
	var i = 0;

	var interval = setInterval((function() {
		if (i < 15) {
			if (!($("#galaxytable .row:eq(" + i + ") span[class*='status_abbr_strong']").html()) && !($("#galaxytable .row:eq(" + i + ") span[class*='status_abbr_noob']").html()) && !($("#galaxytable .row:eq(" + i + ") span[class*='status_abbr_vacation']").html()) && !($("#galaxytable .row:eq(" + i + ") span[class*='status_abbr_banned']").html()) && (($("#galaxytable .row:eq(" + i + ") span[class*='status_abbr_honorableTarget']").html()) || ($("#galaxytable .row:eq(" + i + ") span[class*='status_abbr_active']").html()))) {
				if (where == "all") {
					var moon = document.getElementById("moon"+(i+1));
					if (moon) {
						var url = 'index.php?page=minifleet&ajax=1';
						params = new Object();
						params.mission = 6;
						params.galaxy = galaxy.val();
						params.system = system.val();
						params.position = parseInt(i + 1);
						params.type = target;
						params.shipCount = 11;
						$.post(url, params, unsafeWindow.displayMessage);
					}
				} else {
					var url = 'index.php?page=minifleet&ajax=1';
					params = new Object();
					params.mission = 6;
					params.galaxy = galaxy.val();
					params.system = system.val();
					params.position = parseInt(i + 1);
					params.type = target;
					params.shipCount = 11;
					$.post(url, params, unsafeWindow.displayMessage);
				}
			}
			i++;
			} else {
				clearInterval(interval);
				retry();
			}
	}), randomNumber(500, 1200));
	
	function retry() {
		if (system.val() != max_system) {
			if (system.val() < 499) {
				unsafeWindow.submitOnKey(39);
				setTimeout((function() {
					parse(max_galaxy, max_system, where);
				}), randomNumber(3000, 5000));
			} else {
				if (galaxy.val() != max_galaxy) {
					galaxy.val(galaxy.val() * 1 + 1);
					system.val(1);
					unsafeWindow.submitForm();
					setTimeout((function() {
						parse(max_galaxy, max_system, where);
					}), randomNumber(3000, 5000));
				}
			}
		} else {
			if (galaxy.val() != max_galaxy) {
				galaxy.val(galaxy.val() * 1 + 1);
				system.val(1);
				unsafeWindow.submitForm();
				setTimeout((function() {
					parse(max_galaxy, max_system, where);
				}), randomNumber(3000, 5000));
			}
		}
	}
}

/* Тут вставляем начальные данные для сканирования */
if (system.val() > 50)
	$("#min").val(galaxy.val() + ":" + parseInt(system.val() - 50));
else
	$("#min").val(galaxy.val() + ":" + 1);
if (system.val() < 449)
	$("#max").val(galaxy.val() + ":" + parseInt(system.val() * 1 + 50));
else
	$("#max").val(galaxy.val() + ":" + 499);

