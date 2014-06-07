// ==UserScript==
// @name           GLB Offer/Reneg Contract Enhancements
// @namespace      Bogleg
// @version        1.2.0
// @include        http://goallineblitz.com/game/make_offer.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function addOptions() {
	var salaryTimer;
	$('div.field_container').css('width', '302px'); // wtf, Bort?
	$('#min_max_salary').css('width', '350px'); // ..............
	// on with the program...
	var pickMorale = '<select id="pick_morale" style="float: right; margin-bottom: 4px;">'
		+ '<option id="pick_morale_current" value="' + $('#morale').text() + '">' + $('#morale').text() + '</option>'
		+ [0,1,2,3,4,5,6,7,8,9,10].map(function(i) { return '<option value="'+i+'">'+i+'</option>'; })
		+ '</select>';
	function updateSalary() {
		if (unsafeWindow.salaryTimer) unsafeWindow.clearTimeout(unsafeWindow.salaryTimer);
		if (salaryTimer) clearTimeout(salaryTimer);
		unsafeWindow.updateSalary();
		$('#pick_morale_current').attr('value', $('#morale').text()).text($('#morale').text());
	}
	$('#salary').keyup(function() {
		if (unsafeWindow.salaryTimer) unsafeWindow.clearTimeout(unsafeWindow.salaryTimer);
		if (salaryTimer) clearTimeout(salaryTimer);
		salaryTimer = setTimeout(updateSalary, 1500);
	});
	$('#salary').blur(function() {
		updateSalary();
	});
	$('#salary_container div.field_container').eq(0).prepend(
		'<div style="float: right;">' + pickMorale + '<br />'
		+ '<div style="float: right; color: #a03c19; font-weight: bold; text-align: right;">Morale Boost<br />Wanted</div></div>'
	);
	$('#pick_morale').change(function() {
		var wanted = parseInt($(this).val());
		var salaryCap = parseInt($('#salary_cap').text().replace(/\$|,/g, ''));
		var desired = parseInt($('#minimum_salary').text());
		var minSalary = salaryCap * .000125;
		var maxSalary = salaryCap * .00125;
		var salary = desired;
		var bonus = 0;
		if (wanted < 3) {
			salary = Math.floor(minSalary+(((desired-minSalary)/60)*((wanted*20)-1))+1);
		} else if (wanted > 3) {
			salary = Math.floor(desired+(((maxSalary-desired)/140)*(((wanted-3)*20)-1))+1);
		}
		if (salary < minSalary) salary = minSalary;
		else if (salary > maxSalary) salary = maxSalary;
		$('#salary').val(salary);
		updateSalary();
	});
}

function defaultToDay40() {
	$('#contract_type').val('season');
	$('#options_40_day').hide();
	$('#options_season').show().css('visibility', 'visible');
}

addOptions();
defaultToDay40();
