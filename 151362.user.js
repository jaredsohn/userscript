// ==UserScript==
// @name        Travian4 Market Arrival Monitoring
// @grant       none
// @namespace   T4M
// @description Zbriranje report trgovcev - uporabno pri gradnji WW
// @copyright   www.gigant.si 
// @version     1.0.0
// @include 	http://*.travian*.*/berichte.php*
// ==/UserScript==
// Add jQuery
var JQscript = document.createElement('script');
JQscript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(JQscript);
JQscript.addEventListener('load', function () {
	$ = unsafeWindow['jQuery'];
	$.noConflict();
	debug = true;
	pavzaRedirect = randomMinToMax(5, 15);
	var title = '<h3 id="isTitle" style="margin-top:0;">Kreiraj report trgovcev</h3>';
	var button = '<button id="createReport" type="button"><div class="button-container"><div class="button-position"><div class="btl"><div class="btr"><div class="btc"></div></div></div><div class="bml"><div class="bmr"><div class="bmc"></div></div></div><div class="bbl"><div class="bbr"><div class="bbc"></div></div></div></div><div class="button-contents">Vse strani</div></div></button>';
	var onepage = '<button id="onepage" type="button"><div class="button-container"><div class="button-position"><div class="btl"><div class="btr"><div class="btc"></div></div></div><div class="bml"><div class="bmr"><div class="bmc"></div></div></div><div class="bbl"><div class="bbr"><div class="bbc"></div></div></div></div><div class="button-contents">Samo ta stran</div></div></button>';
	var pavza = '<input type="text" readonly id="timer" value="' + seconds_to_time(pavzaRedirect) + '" style="float: right; display: block; text-align: center; font-size: 18px; height: 18px; border: medium none; padding: 0px; margin: 0px; outline: medium none; width: 150px;" />';
	var numpage = '<button id="numpage" type="button"><div class="button-container"><div class="button-position"><div class="btl"><div class="btr"><div class="btc"></div></div></div><div class="bml"><div class="bmr"><div class="bmc"></div></div></div><div class="bbl"><div class="bbr"><div class="bbc"></div></div></div></div><div class="button-contents">Določi št. strani&nbsp;&nbsp;&nbsp;<span id="pageCnt">0</span>/<span id="pageTotal">0</span></div></div></button>';
	var clearAll = '<button style="float: right; margin-top: -40px;" id="clearAll" type="button"><div class="button-container"><div class="button-position"><div class="btl"><div class="btr"><div class="btc"></div></div></div><div class="bml"><div class="bmr"><div class="bmc"></div></div></div><div class="bbl"><div class="bbr"><div class="bbc"></div></div></div></div><div class="button-contents">Pobriši vse Cookie-je</div></div></button>';
	$('table#overview').parent('form').prepend(pavza);
	$('table#overview').parent('form').prepend(onepage);
	$('table#overview').parent('form').prepend(button);
	$('#onepage').after(numpage);
	$('table#overview').parent('form').prepend(title);
	$('#isTitle').after(clearAll);
	$pageCnt = $('#pageCnt');
	$pageTotal = $('#pageTotal');
	$('#createReport').click(function () {
		cleanMarketReport(true)
	});
	$('#onepage').click(function () {
		cleanMarketReport(false)
	});
	$('#clearAll').click(function () {
		clearAllCookies()
	});
	$('#numpage').click(function () {
		eraseCookie('pageCnt');
		eraseCookie('pageTotal');
		pageCnt = prompt("Vpiši št. strani, ki jih želiš poskenirat (min: 2 strani):", "");
		if (pageCnt != null && pageCnt != "") {
			if (pageCnt == 1) {
				eraseCookie('pageCnt');
				eraseCookie('pageTotal');
				alert('Vspiši najmanj število 2!')
			} else {
				createCookie('pageCnt', '1', 1);
				createCookie('pageTotal', pageCnt, 1);
				$pageCnt.text('1');
				$pageTotal.text(pageCnt);
				cleanMarketReport(true)
			}
		} else {
			eraseCookie('pageCnt');
			eraseCookie('pageTotal');
			alert('Nisi vpisal števila strani, ki jih želiš poskenirati!')
		}
	});
	var checkCntPage = readCookie('pageCnt');
	if (checkCntPage) {
		$pageCnt.text(checkCntPage)
	}
	var checkTotalPage = readCookie('pageTotal');
	if (checkTotalPage) {
		$pageTotal.text(checkTotalPage)
	}
	var y = readCookie('gonextpage');
	if (y == 'ja') {
		$('#createReport').trigger('click')
	}
},
false);
function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString()
	} else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/"
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
	}
	return null
}
function eraseCookie(name) {
	createCookie(name, "", -1)
}
function cleanMarketReport(allPages) {
	$('#resultsTmp, #printReport').remove();
	MarketReport(allPages)
}
function clearAllCookies() {
	eraseCookie('pageCnt');
	eraseCookie('pageTotal');
	eraseCookie('pageReportValues');
	eraseCookie('gonextpage')
};
function seconds_to_time(secs) {
	var h = Math.floor(secs / 3600);
	var m = Math.floor((secs - (h * 3600)) / 60);
	var s = secs - (h * 3600) - (m * 60);
	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
	if (s < 10) s = "0" + s;
	if (h) h = "00";
	return h + ':' + m + ':' + s
}
String.prototype.replaceAll = function (str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi": "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2)
};
function randomMinToMax(min, max) {
	var range = max - min + 1;
	return Math.floor(Math.random() * range + min)
}
function MarketReport(allPages) {
	$('body').append('<div id="resultsTmp" style="display:none" />');
	var $table = $('table#overview');
	var $target_rows = $('.iReport11, .iReport12, .iReport13, .iReport14');
	$target_rows.each(function () {
		$(this).parent('td').css({
			'background': '#000'
		});
		$(this).parent('td').addClass('isReport')
	});
	var $report_link_target = $('.isReport div a');
	report_links = [];
	$report_link_target.each(function () {
		var link = $(this).attr('href');
		report_links.push(link)
	});
	var $results = $('#resultsTmp');
	$.ajax({
		async: false
	});
	var arr_lenght = report_links.length;
	$.each(report_links, function (index, value) {
		$results.append('<div id="tmp_' + index + '" />');
		$('#resultsTmp div:last').load(value + ' .report_content', function () {
			var isLast = (arr_lenght == (index + 1) ? true: false);
			cleanResult(index, isLast, allPages)
		})
	})
}
report_result = [];
function cleanResult(ID, last, allPages) {
	var $target_1 = $('#resultsTmp div#tmp_' + ID).children('.report_content');
	$target_1.children('img').remove();
	var username = $target_1.children('.support').children().find('td.s7:first').children().find('.boxes-contents').children('a:first').text();
	$target_1.children('.support').remove();
	$target_1.children('table#trade').children('thead').remove();
	var $target_2 = $target_1.children('table#trade').children('tbody');
	$target_2.children('tr:first').remove();
	$target_2.children('tr:first').children('th').remove();
	$target_2.children('tr:first').children('td').children('div').children('img').remove();
	$target_2.children('tr:last').remove();
	$target_2.children('tr:last').remove();
	ress = [];
	$target_2.children().find('.rArea').each(function (i) {
		var ress_value = $(this).text();
		ress_value = parseInt(ress_value);
		ress.push(ress_value)
	});
	var ress_sum = parseInt(ress[0]) + parseInt(ress[1]) + parseInt(ress[2]) + parseInt(ress[3]);
	var row_data = ID + '%' + username + '%' + ress_sum + ',';
	report_result.push(row_data);
	if (last) {
		$('#resultsTmp').empty();
		var pageData = report_result.toString();
		pageData = pageData.replaceAll(',,', ',');
		var x = readCookie('pageReportValues');
		if (x) {
			append_data = pageData + x;
			eraseCookie('pageReportValues');
			createCookie('pageReportValues', append_data, 1)
		} else {
			append_data = pageData;
			createCookie('pageReportValues', append_data, 1)
		}
		var c = readCookie('pageReportValues');
		if (c) {
			goNextPage(allPages)
		}
	}
}
function timer(time, update, complete) {
	var start = new Date().getTime();
	var interval = setInterval(function () {
		var now = time - (new Date().getTime() - start);
		if (now <= 0) {
			clearInterval(interval);
			complete()
		} else update(Math.floor(now / 1000))
	},
	100)
}
function goNextPage(allPages) {
	var $p_target = $('.paginator').children('a.next');
	var go;
	if (allPages) {
		var getTotalPage = readCookie('pageTotal');
		if (getTotalPage) {
			getTotalPage = parseInt(getTotalPage)
		} else {
			getTotalPage = false
		}
		var getCurrentPage = readCookie('pageCnt');
		if (getCurrentPage) {
			getCurrentPage = parseInt(getCurrentPage);
			var stevecCurrentPage = getCurrentPage + 1;
			stevecCurrentPage = stevecCurrentPage.toString();
			eraseCookie('pageCnt');
			createCookie('pageCnt', stevecCurrentPage, 1)
		} else {
			getCurrentPage = false
		}
		var pojdiNaprej = (getTotalPage - getCurrentPage != 0 ? true: false);
		if (pojdiNaprej) {
			if ($('.paginator').children('.next').hasClass('disabled')) {
				eraseCookie('gonextpage');
				var q = readCookie('pageReportValues');
				if (q) {
					var full_report_data = q;
					eraseCookie('pageReportValues')
				}
				tmp_1 = full_report_data.split(',');
				final_array = new Array();
				for (i = 0; i < tmp_1.length; i++) {
					tmp_2 = tmp_1[i].split('%');
					if (tmp_2.length == 3) {
						final_array.push([tmp_2[0], tmp_2[1], parseInt(tmp_2[2])])
					}
				}
				createMarketReport(final_array)
			} else {
				createCookie('gonextpage', 'ja', 1);
				go = $p_target.attr('href');
				timer(pavzaRedirect * 1000, function (timeleft) {
					$('#timer').val(seconds_to_time(timeleft))
				},
				function () {
					$('#timer').val('00:00:00');
					window.location.href = go
				})
			}
		} else {
			eraseCookie('gonextpage');
			var ss = readCookie('pageReportValues');
			if (ss) {
				var full_report_data = ss;
				eraseCookie('pageReportValues')
			}
			tmp_1 = full_report_data.split(',');
			final_array = new Array();
			for (i = 0; i < tmp_1.length; i++) {
				tmp_2 = tmp_1[i].split('%');
				if (tmp_2.length == 3) {
					final_array.push([tmp_2[0], tmp_2[1], parseInt(tmp_2[2])])
				}
			}
			createMarketReport(final_array)
		}
	} else {
		eraseCookie('gonextpage');
		var gg = readCookie('pageReportValues');
		if (gg) {
			var full_report_data = gg;
			eraseCookie('pageReportValues')
		}
		tmp_1 = full_report_data.split(',');
		final_array = new Array();
		for (i = 0; i < tmp_1.length; i++) {
			tmp_2 = tmp_1[i].split('%');
			if (tmp_2.length == 3) {
				final_array.push([tmp_2[0], tmp_2[1], parseInt(tmp_2[2])])
			}
		}
		createMarketReport(final_array)
	}
}
function createMarketReport(data) {
	$('#timer').val('00:00:00');
	$('#timer').after('<div id="printReport" style="display:block; height: 200px; width:547px;border:2px solid #000;margin:10px 0; overflow-y:scroll;" />');
	var $printTo = $('#printReport');
	res = new Array();
	counter = new Array();
	for (p in data) {
		if (res[data[p][1]] === undefined) {
			res[data[p][1]] = data[p][2];
			counter[data[p][1]] = 1
		} else {
			res[data[p][1]] = res[data[p][1]] + data[p][2];
			counter[data[p][1]]++
		}
	}
	$printTo.append('<table width="100%"><thead><tr><th>Account</th><th>&Scaron;t. po&scaron;iljk</th><th>Kol. surovin</th></thead><tbody></tbody></table>');
	for (var p in res) {
		$printTo.children('table').children('tbody').append('<tr><td style="text-align:left;">' + p + '</td><td style="text-align:center;">' + counter[p] + '</td><td style="text-align:center;">' + res[p] + '</td></tr>')
	}
	clearAllCookies()
}