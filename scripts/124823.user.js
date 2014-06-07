// ==UserScript==
// @name           GLB Flex Point History Summary W/ Chrome
// @namespace      Bogleg
// @version        7.7.7
// @include        http://goallineblitz.com/game/account.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        Google Chrome
// ==/UserScript==

var sum = {};
var keys = [];
var i = 0;

$('#flex_points table').find('tr:gt(0)').each(function() {
	var key = $('td:eq(1)', this).text();
	var val = parseInt($('td:eq(2)', this).text());
	if (!key.length && val == -25) key = 'friendly';
	if (sum[key] == undefined) {
		keys.push(key);
		sum[key] = 0;
	}
	sum[key] += val;
}).end().find('tr:eq(0)').each(function() {
	var tot = 0;
	var used = 0;
	var income = 0;
	$(this).before('<tr class="nonalternating_color"><td colspan="3">Summary</td></tr><tr class="nonalternating_color"><td>Type</td><td>Amount</td><td>&nbsp;</td></tr>' + $.map(keys.sort(), function(it) {
		if (i++ > 1) i = 1;
		tot += sum[it];
		if (sum[it] < 0) used += -sum[it];
		return '<tr class="alternating_color' + (i++ > 1 ? (i=1) : i) + '"><td>' + it + '</td><td>' + sum[it] + '</td><td>&nbsp;</td></tr>';
	}).join('')
	+ '<tr class="alternating_color' + (i++ > 1 ? (i=1) : i) + '"><td>Boglegmath says:</td><td>' + (income = parseInt(sum.signup) + parseInt(sum.purchase) + parseInt(sum.bonus) + sum.referral) + '</td><td>(signup+buy+bonus+referral)</td></tr>'
	+ '<tr class="alternating_color' + (i++ > 1 ? (i=1) : i) + '"><td>&nbsp;</td><td> - ' + used + '</td><td>(spent)</td></tr>'
	+ '<tr class="alternating_color' + (i++ > 1 ? (i=1) : i) + '"><td>&nbsp;</td><td> + ' + parseInt(sum.retirement) + '</td><td>(retirement)</td></tr>'
	+ '<tr class="alternating_color' + (i++ > 1 ? (i=1) : i) + '"><td>&nbsp;</td><td> = ' + (income - used + parseInt(sum.retirement)) + '</td><td>(should match below)</td></tr>'
	+ '<tr class="alternating_color' + (i++ > 1 ? (i=1) : i) + '"><td>Boglegmath says you have:</td><td>' + tot + '</td><td>&nbsp;</td></tr>'
	+ '<tr class="nonalternating_color"><td colspan="3">Timeline</td></tr>');
});
