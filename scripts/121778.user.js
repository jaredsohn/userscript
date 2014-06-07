// ==UserScript==
// @name          Neograph
// @namespace     by_Eduardo_Mattiello
// @description   Plot your Neobux rented referrals clicks
// @include       http*://www.neobux.com/c/rl/?*ss3=2*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version       1.1
// @icon          http://i41.tinypic.com/j6tvo9.png
// @resource      neograph_icon     http://i41.tinypic.com/j6tvo9.png
// @resource      options_button	http://i42.tinypic.com/2dkzk7o.png
// @resource      export_button		http://i42.tinypic.com/15dmlch.png
// @resource      import_button		http://i39.tinypic.com/2rna0qb.png
// @resource      delete_button		http://i42.tinypic.com/35avkt4.png
// @resource      settings_button	http://i39.tinypic.com/2edsfv5.png
// @resource      show_button		http://i40.tinypic.com/15odqw2.png
// @resource      hide_button		http://i40.tinypic.com/v4w3cz.png
// @resource      chart_button		http://i42.tinypic.com/a26ge1.png
// @resource      loading_img		http://i41.tinypic.com/k1v1a1.gif
// ==/UserScript==

var date = new Date();
var dates = new Array();

dates['Hoje'] = new Date()
dates['Hoje'].setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
dates['Ontem'] = new Date()
dates['Ontem'].setFullYear(date.getFullYear(), date.getMonth(), date.getDate()-1);
dates['Sem cliques'] = false;
// 			  ENGLISH  POLISH      GERMAN   FRENCH		   SPANISH GREEK   								  FINISH   				   SWEDISH
dates_hoje = ['Today', 'Hari ini', 'Heute', "Aujourd'hui", 'Hoy', '\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1', 'T\u00E4n\u00E4\u00E4n', 'Idag'];
dates_ontem = ['Yesterday', 'Kemarin', 'Gestern', 'Hier', 'Ayer', '\u03A7\u03B8\u03B5\u03C2', 'Eilen', 'Ig\u00E5r'];
dates_sem = ['No clicks yet', 'Belum ada klik', 'Keine Klicks', 'Pas de clics', 'Sin clics a\u00FAn', '\u03A7\u03C9\u03C1\u03AF\u03C2 \u03BA\u03BB\u03B9\u03BA', 'Ei klikkej\u00E4', 'Inga klick'];

for (dt in dates_hoje) {
	dates[dates_hoje[dt]] = dates['Hoje'];
}
for (dt in dates_ontem) {
	dates[dates_ontem[dt]] = dates['Ontem'];
}
for (dt in dates_sem) {
	dates[dates_sem[dt]] = dates['Sem cliques'];
}

var graph;
var x_padding = 30;
var y_padding = 40;
var y_data = [0, 1, 2, 3, 4, 5, 6, 7, 8];

$(document).ready(function () {
	if (checkRequirements()) {
		updateReferrals();
		loadChartButtons();
		loadOptions();
	}
});

function checkRequirements () {
	test = $('form#jj div.f_r:nth-child(1) span:nth-child(4)').attr('onclick');
	if (test.indexOf('shrd_lc=0', 0) != -1) {
		change = window.confirm('Last click must be a Real date\nWould you like to change it now?');
		if (change) {
			url = test.replace("document.location.href='", '').replace("'", '');
			window.location = url;
		}
		return false;
	}
	
	plot_clicks = GM_getValue('plot_clicks');
	if (plot_clicks == null) {
		GM_setValue('plot_clicks', 15)
	}
	
	return true;
}

function loadOptions () {
	nhtml = '<div style="position: relative; float: right;"><table style="cursor: pointer;" id="neograph_options_button"><tr><td><img border="0" width="20" src="'+GM_getResourceURL('options_button')+'"></td><td style="font-size: 11px; font-weight: bold; padding-left: 2px;">Options</td></tr></table><div id="neograph_options" style="position: absolute; background: #FFF; border: 1px solid #333; padding: 5px; display: none;"><table style="cursor: pointer;"><tr id="neograph_settings_button"><td><img border="0" width="20" src="'+GM_getResourceURL('settings_button')+'"></td><td style="font-size: 10px; font-weight: bold;">Settings</td></tr><tr id="neograph_export_button"><td><img border="0" width="20" src="'+GM_getResourceURL('export_button')+'"></td><td style="font-size: 10px; font-weight: bold;">Export data</td></tr><tr id="neograph_import_button"><td><img border="0" width="20" src="'+GM_getResourceURL('import_button')+'"></td><td style="font-size: 10px; font-weight: bold;">Import data</td></tr><tr id="neograph_delete_button"><td><img border="0" width="20" src="'+GM_getResourceURL('delete_button')+'"></td><td style="font-size: 10px; font-weight: bold;">Delete data</td></tr></table></div><br clear="both" /></div>';
	$('select#rlpp').parent().parent().next().next().html(nhtml);
	
	$('body').append('<div style="position: fixed; top: 100px; text-align: center; width: 100%; display: none;" id="neograph_options_window"><div style="width: 500px; height: 300px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="neograph_export_window"><table><tr><td><img src="'+GM_getResourceURL('neograph_icon')+'" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="300">Export Neograph data</td><td id="neograph_export_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="170">Close</td></tr></table><textarea style="width: 495px; height: 265px;" id="neograph_export_field" onMouseOver="this.select();" onMouseUp="this.select();" onMouseDown="this.select();"></textarea></style></div>                                                                                                                                                                                              <div style="width: 500px; height: 300px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="neograph_import_window"><table><tr><td><img src="'+GM_getResourceURL('neograph_icon')+'" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="300">Import Neograph data</td><td id="neograph_import_submit" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="85">Import</td><td id="neograph_import_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="85">Close</td></tr></table><textarea style="width: 495px; height: 265px;" id="neograph_import_field"></textarea></style></div>                                                                                                                                                                                              <div style="width: 500px; height: 300px; margin: 0 auto; background: #FFF; border: 1px solid #333; padding: 10px; display: none;" id="neograph_settings_window"><table><tr><td><img src="'+GM_getResourceURL('neograph_icon')+'" width="26" border="0" /></td><td style="font-size: 14px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: left;" width="300">Neograph settings</td><td id="neograph_settings_submit" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="85">Save</td><td id="neograph_settings_close" style="font-size: 13px; font-weight: bold; padding-left: 5px; font-family: Arial; text-align: right; cursor: pointer;" width="85">Close</td></tr></table><table cellspacing="5" cellpadding="5" style="margin-top: 5px;"><tr><td>Plot clicks from last</td><td><input type="text" value="'+GM_getValue('plot_clicks')+'" style="width: 30px;" id="neograph_settings_plot_clicks" /> days</td></tr></table></style></div>            </div>');
	
	$('#c_dir').css('position', 'relative');
	$('#c_dir').append('<div style="position: fixed; top: 110px; left: '+(($('body').width() / 2) + 460)+'px; width: 70px;"><table class="mbx" style="background: #FFF; border: 1px solid #888;"><tr><td>                 <img id="neograph_show_button" src="'+GM_getResourceURL('show_button')+'" border="0" style="cursor: pointer; margin-top: 3px; margin-left: 3px;" title="Show all charts" />                 <img id="neograph_hide_button" src="'+GM_getResourceURL('hide_button')+'" border="0" style="cursor: pointer; margin-top: 3px; margin-left: 3px; clear: both;" title="Hide all charts" />                        <span id="neograph_loading" style="margin-top: 3px; margin-left: 3px; margin-right: 3px; display: none; font-family: Arial; font-size: 11px; font-weight: bold;">Loading...</span>              </td></tr></table></div>');
	
	$('#neograph_settings_close').click(function () {
		$('#neograph_settings_window, #neograph_options_window').css('display', 'none');
	});
	
	$('#neograph_settings_submit').click(function () {
		plot_clicks = $('#neograph_settings_plot_clicks').val();
		GM_setValue('plot_clicks', plot_clicks);
		$('#neograph_settings_window, #neograph_options_window').css('display', 'none');
		alert('Settings saved!\nRefresh page to load new settings');
	});
	
	$('#neograph_settings_button').click(function () {
		$('#neograph_import_field').val('');
		$('#neograph_settings_window, #neograph_options_window').show(0);
	});
	
	$('#neograph_show_button').click(function () {
		toggleSideButtons();
		setTimeout(function () {
			$('.neograph_chart').hide(0);
			referrals = getPageReferrals();
			for (var id in referrals) {
				toggleChart(id);
			}
			toggleSideButtons();
		}, 100);
	});
	
	$('#neograph_hide_button').click(function () {
		toggleSideButtons();
		setTimeout(function () {
			$('.neograph_chart').hide(0);
			toggleSideButtons();
		}, 100);
	});
	
	function toggleSideButtons () {
		$('#neograph_show_button, #neograph_hide_button, #neograph_loading').toggle(0);
	}
	
	$('#neograph_export_close').click(function () {
		$('#neograph_export_window, #neograph_options_window').css('display', 'none');
		$('#neograph_export_field').val('');
	});
	
	$('#neograph_import_close').click(function () {
		$('#neograph_import_window, #neograph_options_window').css('display', 'none');
		$('#neograph_import_field').val('');
	});
	
	$('#neograph_import_submit').click(function () {
		data = $('#neograph_import_field').val();
		importData(data);
		$('#neograph_import_window, #neograph_options_window').css('display', 'none');
		alert('Data import completed!');
	});
	
	$('#neograph_options_button').click(function () {
		$('#neograph_options').toggle(0);
	});
	
	$('#neograph_options').mouseleave(function () {
		$('#neograph_options').hide(0);
	});
	
	$('#neograph_export_button').click(function () {
		data = exportData();
		$('#neograph_export_field').val(data);
		$('#neograph_export_window, #neograph_options_window').show(0);
	});
	
	$('#neograph_import_button').click(function () {
		$('#neograph_import_field').val('');
		$('#neograph_import_window, #neograph_options_window').show(0);
	});
	
	$('#neograph_delete_button').click(function () {
		delete_data = window.confirm('Are you sure you want to delete ALL Neograph data?');
		if (delete_data) {
			deleteNeographData();
		}
	});
}

function deleteNeographData () {
	values = GM_listValues();
	for (i = 0; i < values.length; i ++) {
		param = values[i];
		GM_deleteValue(param);
	}
	alert('Neograph data deleted');
}

function loadChartButtons() {
	referrals = getPageReferrals();
	for (var id in referrals) {
		referral = referrals[id];
		object = referral['object'].find('td:nth-child(9)');
		div = object.find('td:nth-child(1)');
		div.prepend('<img height="16" width="16" id="neograph_chart_button_'+id+'" class="im neograph_chart_button" src="'+GM_getResourceURL('chart_button')+'">');
	}
	
	$('.neograph_chart_button').click(function () {
		id = $(this).attr('id').replace('neograph_chart_button_', '');
		toggleChart(id);
	});
}

function toggleChart(id) {
	plot = $('#neograph_chart_'+id).length;
	if (plot == 0) {
		plotted = plotChart(id);
		if (!plotted) {
			$('#neograph_chart_'+id).hide(0);
			alert('No data\nRefresh is nedeed');
		}
	} else {
		$('#neograph_chart_'+id).toggle(0);
	}
}

function plotChart(id) {
	object = $('#neograph_'+id);
	chart_place = object.next();
	chart_place.find('div').html('<div class="neograph_chart" id="neograph_chart_'+id+'" style="width: 700px; height: 170px; display: hidden; margin-top: 5px;"><canvas id="neograph_canvas_'+id+'" width="700" height="170"></canvas></div>');
	
	data = GM_getValue('Neograph_'+id);
	if (data == null) {
		return false;
	}

	clicks = getReferralClicks(id, GM_getValue('plot_clicks'));
	
	var data = {
		values: clicks
	};
	
	graph = $('#neograph_canvas_'+id);
	var c = graph[0].getContext('2d');
	
	drawAxes(c);
	drawXData(c, data);
	drawYData(c);
	drawGrid(c, data);
	drawDataLines(c, data);
	
	return true;
}

/*function loadChartPlaces () {
	referrals = getPageReferrals();
	for (var id in referrals) {
		referral = referrals[id];
		chart_place = referral['object'].next();
		chart_place.find('div').html('<div class="neograph_chart" id="neograph_chart_'+id+'" style="width: 700px; height: 160px; display: hidden; margin-top: 5px;"><canvas id="neograph_canvas_'+id+'" width="700" height="160"></canvas></div>');
		chart_place.find('div .neograph_chart').hide(0);
	}
}

function plotCharts() {
	$('.neograph_chart').each(function () {
		id = $(this).attr('id').replace('neograph_chart_', '');
		plotChart(id);
	});
	$('.neograph_referral').each(function () {
		$(this).click(function () {
			id = $(this).attr('id').replace('neograph_', '');
			$('#neograph_chart_'+id).toggle(0);
		});
	});
}

function plotChart(id) {
	data = GM_getValue('Neograph_'+id);
	
	clicks = getReferralClicks(id, 15);
	
	var data = {
		values: clicks
	};
	
	graph = $('#neograph_canvas_'+id);
    var c = graph[0].getContext('2d');
	
	drawAxes(c);
	drawXData(c, data);
	drawYData(c);
	drawGrid(c, data);
	drawDataLines(c, data);
	$('#neograph_chart_'+id).hide(0);
}*/

function getReferralClicks(id, amount) {
	var clicks = Array();
	data = GM_getValue('Neograph_' + id);
	data = data.split('\n');
	for (i = 0; i < amount; i ++) {
		date = new Date();
		today = dates['Hoje'];
		date.setFullYear(today.getFullYear());
		date.setMonth(today.getMonth());
		date.setDate(today.getDate()-i);
		str_date = dateToStringNoYear(date);
		clicks[amount-1-i] = {X: dateToStringNoYear(date), Y: getReferralClick(data, dateToString(date))};
	}
	return clicks;
}

function getReferralClick(data, date) {
	for (day in data) {
		day = data[day];
		day_data = day.split('|');
		if (day_data.length > 1) {
			if (date == day_data[0]) {
				return parseInt(day_data[1]);
			}
		}
	}
	return 0;
}

function getCategories(last_date) {
	categories = Array();
	for (i = 0; i < 15; i ++) {
		date = new Date();
		date.setFullYear(last_date.getFullYear());
		date.setMonth(last_date.getMonth());
		date.setDate(last_date.getDate()-i);
		str_date = dateToStringNoYear(date);
		categories[14-i] = str_date;
	}
	return categories;
}

function updateReferrals () {
	referrals = getPageReferrals();
	
	for (var id in referrals) {
		referral = referrals[id];
		
		data = GM_getValue('Neograph_'+id);
		newdata = data;
		
		if (data != null) {
			data = data.split('\n');
			clicks = parseInt(data[0]);
			
			if (referral['clicks'] > clicks) {
				if (data.length == 1) {
					newdata = referral['clicks'] + (referral['clicks'] > 0 ? '\n' + dateToString(referral['last_click']) + '|' + referral['clicks'] : '');
				} else {
					last = data[data.length-1].split('|');
					last_click = stringToDate(last[0]);
					last_clicks = parseInt(last[1]);
					
					if (sameDate(last_click, referral['last_click'])) {
						newdata = newdata.replace(clicks + '\n', referral['clicks'] + '\n');
						newdata = newdata.replace(dateToString(last_click) + '|' + last_clicks, dateToString(last_click) + '|' + (last_clicks + (referral['clicks'] - clicks)));
					} else {
						newdata = newdata.replace(clicks + '\n', referral['clicks'] + '\n');
						newdata += '\n' + dateToString(referral['last_click']) + '|' + (referral['clicks'] - clicks);
					}
				}
			}
		} else {
			newdata = referral['clicks'] + (referral['clicks'] > 0 ? '\n' + dateToString(referral['last_click']) + '|' + referral['clicks'] : '');
		}
		GM_setValue('Neograph_'+id, newdata);
	}
}

function sameDate(date1, date2) {
	if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
		return true;
	}
	return false;
}

function dateToString(date) {
	return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
}

function dateToStringNoYear(date) {
	return (date.getMonth()+1) + '/' + date.getDate();
}

function stringToDate(string) {
	date = new Date();
	string = string.split('/');
	year = parseInt(string[0]);
	month = parseInt(string[1])-1;
	day = parseInt(string[2]);
	date.setFullYear(year, month, day);
	return date;
}

function getPageReferrals () {
	referrals = Array();
	$('[id^=fgidu]').each(function () {
		referral = $(this).parent();
		
		referral_data = getReferralData(referral);
		
		referral.addClass('neograph_referral');
		referral.attr('id', 'neograph_'+id);
		
		referrals[referral_data['id']] = referral_data;
	});
	return referrals;
}

function getReferralData (referral) {
	id = referral.find('td:nth-child(3)').html().replace(/&nbsp;/g, '');
	last_click = getLastClick(referral.find('td:nth-child(6)').html().replace(/&nbsp;/g, ''));
	clicks = parseInt(referral.find('td:nth-child(7)').html().replace(/&nbsp;/g, ''));
	//average = parseFloat(referral.find('td:nth-child(8)').html().replace(/&nbsp;/g, ''));
	object = referral;
	referral = Array();
	referral['id'] = id;
	referral['last_click'] = last_click;
	referral['clicks'] = clicks;
	referral['object'] = object;
	//referral['average'] = average;
	return referral;
}

function getLastClick (last_click) {
	if (dates[last_click] == null) {
		last_click = stringToDate(last_click);
	} else {
		last_click = dates[last_click];
	}
	return last_click;
}


/* CHART FUNCTIONS */
function drawAxes(c) {
	c.beginPath();
	c.moveTo(x_padding, 0);
	c.lineTo(x_padding, graph.height()-y_padding);
	c.lineTo(graph.width(), graph.height()-y_padding);
	c.stroke();
}

function getXPosition(i, data) {
	plot_area = graph.width() - x_padding;
	space = plot_area / data.values.length;
	return ((space * (i+1)) - (space / 2)) + x_padding;
}

function getYPosition(i) {
	space = (graph.height() - y_padding) / y_data.length;
	if (i > 8) {
		return graph.height() - y_padding - (space * 8);
	}
	return graph.height() - y_padding - (space * i);
}

function drawXData(c, data) {	
	c.font = 'normal 8pt sans-serif';
	c.textBaseline = 'middle';
	c.textAlign ='left';
	for (i = 0; i < data.values.length; i ++) {
		value = data.values[i].X;
		
		c.save();
		c.translate(getXPosition(i, data), graph.height() - (y_padding / 2));
		c.rotate(Math.PI/3);
		
		c.fillText(value, -14, -4/*getXPosition(i, data), graph.height() - (y_padding / 2)*/);
		
		c.restore();
	}
	c.textBaseline = 'top';
}

function drawYData(c) {
	c.font = 'normal 8pt sans-serif';
	c.textAlign = 'right';
	space = (graph.height() - y_padding) / y_data.length;
	for (i = 0; i < y_data.length; i ++) {
		value = y_data[i];
		c.fillText(value, (x_padding - 8), (graph.height() - y_padding) - (i * space) + 2);
	}
}

function drawGrid(c, data) {
	c.fillStyle = '#EEE';
	space = (graph.height() - y_padding) / y_data.length;
	for (i = 0; i < y_data.length; i ++) {
		if (i % 2 == 0) {
			c.fillRect(x_padding + 1, graph.height() - y_padding - (i * space) - 1, graph.width() - x_padding, -1 * space);
		}
	}
	
	c.lineWidth = 2;
	c.strokeStyle = '#DDD';
	c.beginPath();
	for (i = 0; i < y_data.length; i ++) {
		c.moveTo(x_padding + 1, graph.height() - y_padding - (space * (i + 1)));
		c.lineTo(graph.width(), graph.height() - y_padding - (space * (i + 1)));
	}
	
	c.lineWidth = 1;
	for (i = 0; i < data.values.length; i ++) {
		c.moveTo(getXPosition(i, data), 0);
		c.lineTo(getXPosition(i, data), graph.height() - y_padding - 1);
	}
	
	c.stroke();
}

function drawDataLines(c, data) {
	space = (graph.height() - y_padding) / y_data.length;
	c.strokeStyle = '#2dc637'; // F00
	c.fillStyle = '#333'; // 333
	c.lineWidth = 3;
	c.beginPath();
	c.moveTo(getXPosition(0, data), getYPosition(data.values[0].Y));
	for (i = 0; i < data.values.length; i ++) {
		value = data.values[i];
		c.lineTo(getXPosition(i, data), getYPosition(value.Y));
	}
	c.stroke();
	
	for (i = 0; i < data.values.length; i ++) {
		value = data.values[i];
		c.beginPath();
		if (value.Y > 8) {
			c.fillStyle = '#F00';
			c.arc(getXPosition(i, data), getYPosition(value.Y), 4, 0, Math.PI * 2, true);
		} else {
			c.arc(getXPosition(i, data), getYPosition(value.Y), 4, 0, Math.PI * 2, true);
			
		}
		c.fill();
		c.fillStyle = '#333'; //
	}
	
	c.font = 'normal 7pt sans-serif';
	c.textAlign = 'center';
	c.lineWidth = 3;
	c.strokeStyle = '#FFF';
	for (i = 0; i < data.values.length; i ++) {
		value = data.values[i];
		c.strokeText(value.Y, getXPosition(i, data), getYPosition(value.Y) - 14);
		c.fillText(value.Y, getXPosition(i, data), getYPosition(value.Y) - 14);
	}
}

function importData(data) {
	data = data.split('&');
	for (d in data) {
		d = data[d];
		if (d.length > 0) {
			d = d.split('@');
			param = d[0];
			value = d[1].replace(/,/g, '\n');
			GM_setValue(param, value);
		}
	}
}

function exportData() {
	output = '';
	values = GM_listValues();
	for (i = 0; i < values.length; i ++) {
		param = values[i];
		if (param.indexOf('Neograph_', 0) != -1) {
			value = GM_getValue(param);
			output += param + '@' + value.replace(/\n/g, ',') + '&';
		}
	}
	return output;
}