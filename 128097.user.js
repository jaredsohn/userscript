// ==UserScript==
// @name           Pepperoni report
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace      manul
// @description    Creates a per-month time report in pepperoni
// @include        https://pepperoni.helmes.ee/taskedit.php*
// ==/UserScript==
$(document).ready(function() {
	if (getUrlVars()['alltimeframes'] == '1') {
		$('#timeframeTable').prev().before(report());
	}
});

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function report() {
	var items = new Array();
	var i = 0;
	$('.w410').each(function() {
		var item = new Object();
		item.name = $(this).val();
		if (item.name == '') return;
		item.duration = $(this).prev().prev().html();
		var arr1 = item.duration.split(':')[0];
		var arr2 = item.duration.split(':')[1];
		item.hours = parseInt(arr1, 10);
		item.minutes = parseInt(arr2, 10);
		var dt = $(this).prev().prev().prev().val().substring(3,10);
		item.dt = dt;
		var found = false;
		for (var j = 0; j < items.length; j++) {
			if (items[j].name == item.name && items[j].dt == item.dt) {
				items[j].hours += item.hours;
				items[j].minutes += item.minutes;
				found = true;
				break;
			}
		}
		if (!found) {
			items[i] = item;
			i++;
		}
	});
	var dt = '';
	var st = '<table cellspacing="0" cellpadding="0" border="0" class="formtable"><tbody>';
	var sm = 0;
	var sh = 0;
	var mm = 0;
	var mh = 0;
	
	for (i = 0; i < items.length; i++) {
		if (dt != items[i].dt) {
			if (st != '<table cellspacing="0" cellpadding="0" border="0" class="formtable"><tbody>') {
				mh += Math.floor(mm / 60);
				mm = mm % 60;
				st += '<tr><td colspan="2">&nbsp;</td></tr>';
				st += '<tr><td colspan="2"><b>Total this month: ' + mh + 'h ' + mm + 'm</b></td>';
				st += '<tr><td colspan="2">&nbsp;</td></tr>';
			}
			dt = items[i].dt;
			mh = 0;
			mm = 0;
			st += '<tr><td colspan="2" style="border-bottom: 1px solid black;"><b>Month: ' + items[i].dt + '</b></td>';
			st += '<tr><td colspan="2">&nbsp;</td></tr>';
		}
		var h = items[i].hours;
		var m = items[i].minutes;
		h += Math.floor(m / 60);
		m = m % 60;
		var color = (i % 2 == 0) ? 'background-color: #FFFEF1' : '';
		st += '<tr><td style="width: 500px; ' + color + '">' + items[i].name + '</td><td style="padding-left: 10px; ' + color + '">' + h + 'h ' + m + 'm' + '</td></tr>';
		sh += h;
		sm += m;
		mh += h;
		mm += m;
	}
	sh += Math.floor(sm / 60);
	sm = sm % 60;
	st += '<tr><td colspan="2">&nbsp;</td></tr>';
	st += '<tr><td colspan="2">&nbsp;</td></tr>';
	st += '<tr><td colspan="2"><b>Total: ' + sh + 'h ' + sm + 'm</b></td>';
	st += '<tr><td colspan="2">&nbsp;</td></tr>';
	st += '</tbody></table>';
	st = '<h2 class="line">Time Report</h2>' + st;
	return st;
}