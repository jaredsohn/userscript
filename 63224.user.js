// Domains By Volume
// Version 0.2.3 BETA!
// 2010-02-15
// Copyright (c) 2010, DomainsByVolume.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Domains By Volume", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Domains By Volume
// @namespace      http://www.domainsbyvolume.com/domain_suggestion
// @description    Find available domain names based on keyword search volume from Google's Adwords External Keyword Tool
// @include        https://adwords.google.com/select/*
// @version        0.2.3
// @copyright      Domains By Volume
// @license        http://www.gnu.org/licenses/gpl-3.0.txt
// @require        http://sizzlemctwizzle.com/updater.php?id=63224
// @require        http://www.domainsbyvolume.com/domain_suggestion/misc/punycode.js
// ==/UserScript==

var _ns = 'http://www.domainsbyvolume.com/domain_suggestion';
//Add jQuery
var DS_JQ = document.createElement('script');
DS_JQ.src = _ns + '/static/js/jquery-1.3.2.min.js';
DS_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(DS_JQ);

//Affiliate links
var DS_AFF = document.createElement('script');
DS_AFF.src = _ns + '/misc/affiliate.js?0.2.1';
DS_AFF.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(DS_AFF);

//Add Styles
var DS_CSS = document.createElement('link');
DS_CSS.href = _ns + '/static/css/gm_domain_suggestion/domain_suggestion.css?0.2.1';
DS_CSS.type = 'text/css';
DS_CSS.rel = 'stylesheet';
document.getElementsByTagName('head')[0].appendChild(DS_CSS);

var ds_vals = {};
ds_vals['kwl_length'] = GM_getValue('kwl_length', 20);
ds_vals['kwl_gmv'] = GM_getValue('kwl_gmv', 1000);
ds_vals['kwl_lsv'] = GM_getValue('kwl_gmv', 1000);
ds_vals['kwl_akc'] = GM_getValue('kwl_akc', 0);
ds_vals['kwl_tlds'] = GM_getValue('kwl_tlds', 'com,net');

var ds_tlds = {};
_tldx = ds_vals['kwl_tlds'].split(',');

for (i=0; i<_tldx.length; i++) {
	ds_tlds[_tldx[i]] = 1;
}
ds_tlds['len'] = _tldx.length;

var ds_lookup_queue = {};

var _dm_kw_search_img = [_ns + '/static/img/check_button_d.png', _ns + '/static/img/check_button.png'];

function letsJQuery() {
	$('#shoppingCart').prepend(
		'<b>Extensions:</b> <br/><br/>' +
		'Select extensions to lookup <br/><br/>'+
		'<table id="kwTldTable" class="limits">'+
		'<tbody>'+
		'<tr>'+
		'<td>'+
		unsafeWindow.gtk_ds_html._tld_form+
		'</td>'+
		'<td>'+
		'</td>'+
		'</tr>'+
		'</tbody>'+
		'</table><br/>'+
		'<b>Limit Domain Lookup:</b> <br/><br/>' +
		'Limit domain lookup to keywords matching following criteria <br/><br/>'+
		'<table id="kwLimitsTable" class="limits">'+
		'<tbody>'+
		'<tr>'+
		'<td><label for="kwl_length">Keyword length: &lt;</label></td>'+
		'<td>'+
		'<select id="kwl_length" name="kwl_length" >'+
		'<option value="1000">Any</option>'+
		'<option value="100">100</option>'+
		'<option value="50">50</option>'+
		'<option value="25">25</option>'+
		'<option value="20" selected="selected">20</option>'+
		'<option value="15">15</option>'+
		'<option value="10">10</option>'+
		'<option value="5">5</option>'+
		'</select>'+
		'</td>'+
		'</tr>'+
		'<tr>'+
		'<td><label for="kwl_gmv">Global Monthly Search Volume: &gt;</label></td>'+
		'<td>'+
		'<select id="kwl_gmv" name="kwl_gmv" >'+
		'<option value="1000000">1,000,000</option>'+
		'<option value="100000">100,000</option>'+
		'<option value="10000">10,000</option>'+
		'<option value="1000" selected="selected">1,000</option>'+
		'<option value="100">100</option>'+
		'<option value="0">Any</option>'+
		'</select>'+
		'</td>'+
		'</tr>'+
		'<tr>'+
		'<td><label for="kwl_lsv">Local Search Volume: &gt;</label></td>'+
		'<td>'+
		'<select id="kwl_lsv" name="kwl_lsv" >'+
		'<option value="1000000">1,000,000</option>'+
		'<option value="100000">100,000</option>'+
		'<option value="10000">10,000</option>'+
		'<option value="1000" selected="selected">1,000</option>'+
		'<option value="100">100</option>'+
		'<option value="0">Any</option>'+
		'</select>'+
		'</td>'+
		'</tr>'+
		'<tr>'+
		'<td><label for="kwl_akc">Additional keywords to consider: </label></td>'+
		'<td>'+
		'<input type="checkbox" id="kwl_akc" name="kwl_akc" value="1" />'+
		'</td>'+
		'</tr>'+
		'<tr>'+
		'<td>&nbsp;</td>'+
		'<td>'+
		'<input type="image" id="kw_search" name="kw_search" value="Lookup" disabled="true" src="'+_dm_kw_search_img[0]+'" />'+
		'</td>'+
		'</tr>'+
		'</tbody>'+
		'</table><br/>'+
	    	'<br/> <b>Selected Domains:</b> <br/><br/>' +
	    	'Add domains from the left to register ' +
		'with your choice of registrar. <br/><br/>'+
		'<div id="emptyList">No domains added yet</div>'+
		'<div id="gm_domain_suggestion_cart"></div>'+
		'<table id="removeAllDomains" class="selectedKeywordListItem">'+
		'<tbody>'+
		'<tr>'+
		'<td></td>'+
		'<td align="right">'+
		'<a href="#@" id="removeAllDomainsLink" style="color: rgb(119, 119, 119);" ><b>&#171; Remove All</b></a>'+
		'</td>'+
		'</tr>'+
		'</tbody>'+
		'</table><br/>'+
		'<table border="0" width="100%" cellspacing="0" cellpadding="0">'+
		'<tbody>'+
		'<tr>'+
		'<td align="right">'+
		'<input id="registerDomainsBtn" type="button" style="font-weight: bold;" value="Register" disabled="disabled" /> @ '+
		'<select name="registrar" disabled="disabled" id="registerDomainsSelect" >'+
		unsafeWindow.gtk_ds_html._registrar_options+
		'</select>'+
		'</td>'+
		'</tr>'+
		'</tbody>'+
		'</table>'+
		unsafeWindow.gtk_ds_html._registrar_forms+
		'<br/>');
	$('#kpResultsTableHead tr').append(
		"<th class='c10' valign='bottom' colspan='2'>Domains Available</th>");

	$('#removeAllDomainsLink').click(ds_remove_all_domains);
	$('#kw_search').click(function () {
		$('#kw_search').val('Processing...').attr('src', _dm_kw_search_img[0]).attr('disabled', true);
		window.setTimeout(DS_do_search, 1);
	});
	$('#kpKeywordPlanner-getKeywordsButton').click(function () {
		$('#kw_search').attr('src', _dm_kw_search_img[0]).attr('disabled', true);
	});
	$('#registerDomainsBtn').click(ds_checkout);
	$('#kwl_length').change(ds_limit_change);
	$('#kwl_gmv').change(ds_limit_change);
	$('#kwl_lsv').change(ds_limit_change);
	$('#kwl_akc').change(ds_akc_change);

	$('#kwl_length').val(ds_vals['kwl_length']);
	$('#kwl_gmv').val(ds_vals['kwl_gmv']);
	$('#kwl_lsv').val(ds_vals['kwl_lsv']);
	if (ds_vals['kwl_akc'] == 1) {
		$('#kwl_akc').attr('checked', true);
	}

	for (tld in ds_tlds) {
		tld_str = tld.replace(/\./, '_');
		$('#tld_'+tld_str).attr('checked', true);
	}

	$('#kwTldTable input[type=checkbox]').change(ds_extensions_change);

	for (domain in ds_domains) {
		unsafeWindow.ds_add_domain(ds_domains[domains]);
	}
}

//Check if jQuery's loaded
function DS_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined' || typeof unsafeWindow.gtk_ds_html == 'undefined') { window.setTimeout(DS_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
DS_wait();

var ds_domains = {};
var ds_domain_count = 0;

var DS_wait_load_handle = null;

function DS_prepare_domain(_domain) {
	return _domain.replace(/[\w-](?!)|_/gi, "");
}

function DS_prepare_kw(_domain) {
	return _domain.replace(/^[\-\"[]|[\]"]$/gi, "").replace(/[_\. '"]/gi, "_");
}

function DS_prepare_volume(_value) {
	_val = parseInt(_value.replace(/\W/gi, ""));
	if (isNaN(_val)) {
		return 0;
	}
	return _val;
}

function DS_submit_stats() {
	try {
		if (scores_arr.length > 0 && _rc == 0) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: _ns + '/search/domain_score_multi/' + scores_arr.join('_'),
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/json,application/x-json,text/json',
				}
			});
		} else {
			 window.setTimeout(DS_submit_stats, 100);
		}
	} catch (e) {
		GM_log('Error submitting stats: '+e);
	}
}

function DS_lookup_domains(kws, _x, scores, scores_arr) {
	if (_rc > 0) {
		ds_lookup_queue[_x] = window.setTimeout(function() {
			DS_lookup_domains(kws, _x, scores, scores_arr);
		}, 5000);
		return;
	}
	_rc++;
	GM_xmlhttpRequest({
		method: 'GET',
		url: _ns + '/search/domain_avail_tld_multi/'+ds_vals['kwl_tlds'].replace(/\./gi,'-').replace(/,/gi,'_')+'/' + kws.slice(_x, Math.min(_x+11, kws.length)).join('_'),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/json,application/x-json,text/json',
		},
		onload: function(responseDetails) {
			try {
				eval ('var _domains = '+responseDetails.responseText);
				for(_kw in _domains) {

					for (_domain in _domains[_kw].domains) {
						if (_domain == '_avail_count') { 
							continue;
						}
						if (_domain.match(/xn\-\-/gi)) {
							puny = _domain.replace(/xn\-\-([\w-]+).[\w]{2,4}/gi, "$1");
							dtl = punycode.decode(puny)+_domain.replace(/xn\-\-[\w-]+(.[\w]{2,4})/gi, "$1");
						} else {
							dtl = _domain;
						}

						tld = _domain.replace(_kw+'.', '');
						tlds = tld.replace(/\./, '_')
						$('td#'+_kw+'_'+tlds).removeClass('waiting').removeClass('ignore');
						if (_domains[_kw].domains[_domain] == 1) {							
							$('td#'+_kw+'_'+tlds).html('<a href="#@" class="active" title="'+dtl+'">.'+tld+'</a>');
							$('td#'+_kw+'_'+tlds+' a').click(function () {
								ds_add_domain($(this).attr('title'));
							});
							if (ds_domains[_domain]) {
								$('td#'+_kw+'_'+tlds+' a').addClass('disabled');
							}
						} else if (_domains[_kw].domains[_domain] == 0) {
							$('td#'+_kw+'_'+tlds).html('<span class="disabled">.'+tld+'</span>');
						} else {
							$('td#'+_kw+'_'+tlds).html('<span class="disabled error" title="Error looking up domain, please try again">.'+tld+'</span>');
						}
						$('td#'+_kw+'_'+tlds).addClass('done');
					}

					if (_domains[_kw].domains._avail_count > 0) {
						scores_arr[scores_arr.length] = scores[_kw]['kw']+':'+scores[_kw]['volume'];
					}
				}
			} catch (e) {
				$('td.waiting-'+_x).addClass('error').removeClass('waiting');
				GM_log('Error checking availability: '+e);
			}
			_rc--;
		},
		onerror: function(responseDetails) {
			$('td.waiting-'+_x).addClass('error').removeClass('waiting');
			_rc--;
		}
	});
}

var scores_arr = [];
var _rc = 0;

function DS_wait_load() {
	var tr = null;

	if ($) {		
		var kws = [];
		var scores = {};
		var _x=0; var _y=0;
		$('#kpResultsTableBody tr').each(function () {
			if ($(this).attr('id') == '') {
				$(this).find('td').attr('colspan', 11);
			} else {
				kw = DS_prepare_kw($(this).find('td.c0').text());
				gmv = DS_prepare_volume($(this).find('td.c5').text());
				lsv = DS_prepare_volume($(this).find('td.c4').text());

				if (/[^\u0000-\u00ff]/.test(kw)) {
					dom = DS_prepare_domain('xn--'+punycode.encode(kw));
				} else {
					dom = DS_prepare_domain(kw);
				}
				if (dom != '') {
					_c = 10;
					for (tld in ds_tlds) {
						if (tld == 'len') continue;
						tld_str = tld.replace(/\./, '_');
						tld_strd = tld.replace(/\./, '_');
						$(this).append('<td id="'+dom+'_'+tld_strd+'" class="dot-'+tld_strd+' info info-'+_x+' '+dom+'_'+tld_strd+' '+kw+' c'+_c+'" title="Click \'Lookup\' on the right column to start domain lookup">&nbsp;</td>');
						_c++;
					}

					kws[kws.length] = dom;
					scores[dom] = {'volume': DS_prepare_volume($(this).find('td.c5').text()+""), 'kw': DS_prepare_kw($(this).find('td.c0').text())};
				}
			}
			_y++;
			if ((_y%8) == 0) _x+=_y;
		});

		if (_x > 0 || _y > 0) {
			$('#kw_search').attr('src', _dm_kw_search_img[1]).removeAttr('disabled');
		} else {
			$('#kw_search').attr('src', _dm_kw_search_img[0]).attr('disabled', true);
		}

		for (_queue in ds_lookup_queue) {
			window.clearTimeout(ds_lookup_queue[_queue]);
			delete ds_lookup_queue[_queue];
		}
		kws = null;
	}

	if (DS_wait_load_handle != null) {
		DS_wait_load_handle = null;
	}
}

function DS_do_search() {
	var tr = null;
	scores_arr = [];
	_rc = 0;

	var kws = [];
	var scores = {};
	var prompt = true;
	var _x=0; var _y=0;
	var _additional = false;

	$('#kw_search').val('Lookup').attr('src', _dm_kw_search_img[1]).removeAttr('disabled');

	$('td.c10').remove();
	$('td.c11').remove();
	$('#kpResultsTableBody tr').each(function () {
		if ($(this).attr('id') == '') {
			$(this).find('td').attr('colspan', 11);
			if ($(this).hasClass('groupHeader') && $(this).find('a:first').text() == 'Additional keywords to consider') {
				_additional=true;
			}
		} else {
			kw = DS_prepare_kw($(this).find('td.c0').text());
			gmv = DS_prepare_volume($(this).find('td.c5').text());
			lsv = DS_prepare_volume($(this).find('td.c4').text());

			if (/[^\u0000-\u00ff]/.test(kw)) {
				dom = DS_prepare_domain('xn--'+punycode.encode(kw));
			} else {
				dom = DS_prepare_domain(kw);
			}
			if (dom != '') {
				if ((ds_vals['kwl_akc'] == 1 || !_additional) && !ds_limit_ignore(kw, gmv, lsv)) {					
					_c=10;				
					for (tld in ds_tlds) {
						if (tld == 'len') continue;
						tld_str = tld.replace(/\./, '_');
						tld_strd = tld.replace(/\./, '_');
						$(this).append('<td id="'+dom+'_'+tld_strd+'" class="dot-'+tld_strd+' waiting waiting-'+_x+' '+dom+'_'+tld_strd+' '+kw+' c'+_c+'">&nbsp;</td>');
						_c++;
					}

					kws[kws.length] = dom;
					scores[dom] = {'volume': DS_prepare_volume($(this).find('td.c5').text()+""), 'kw': DS_prepare_kw($(this).find('td.c0').text())};
				} else if (_additional) {
					if (ds_tlds.len > 0) {
						$(this).append(
							'<td id="'+dom+'_com" class="dot-com ignore ignore-'+_x+' '+dom+'_'+tld_strd+' '+kw+' c10" title="Ignored, additional keyword">&nbsp;</td>');
					}
		
					if (ds_tlds.len > 1) {			
						$(this).append(
							'<td id="'+dom+'_net" class="dot-net ignore ignore-'+_x+' '+dom+'_'+tld_strd+' '+kw+' c11" title="Ignored, additional keyword">&nbsp;</td>');
					}
				} else {				
					if (ds_tlds.len > 0) {
						$(this).append(
							'<td id="'+dom+'_com" class="dot-com ignore ignore-'+_x+' '+dom+'_'+tld_strd+' '+kw+' c10" title="Ignored, change \'Limit domain lookup\' to enable domain look up for this keyword">&nbsp;</td>');
					}
					if (ds_tlds.len > 1) {
						$(this).append(
							'<td id="'+dom+'_net" class="dot-net ignore ignore-'+_x+' '+dom+'_'+tld_strd+' '+kw+' c11" title="Ignored, change \'Limit domain lookup\' to enable domain look up for this keyword">&nbsp;</td>');
					}
				}
			}
		}
		_y++;
		if ((_y%8) == 0) _x+=_y;
	});

	for (_queue in ds_lookup_queue) {
		window.clearTimeout(ds_lookup_queue[_queue]);
		delete ds_lookup_queue[_queue];
	}

	for (_x=0; _x<kws.length; _x+=11) {
		DS_lookup_domains(kws, _x, scores, scores_arr);
	}

	if ((new Date).getTime() > (parseInt(GM_getValue('ds_aff_cookie_created', 0))+3600*24*30*1000)) {
		for(reg in unsafeWindow.aff_links) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: unsafeWindow.aff_links[reg],
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/html',
				}
			});
		}			
		GM_setValue('ds_aff_cookie_created', (new Date).getTime()+'');
	}

	DS_submit_stats();
	kws = null;

	if (DS_wait_load_handle != null) {
		DS_wait_load_handle = null;
	}
}

ds_limit_ignore = function (keyword, global_monthly_volume, local_search_volume) {
	if (	keyword.length <= ds_vals['kwl_length'] && 
		global_monthly_volume >= ds_vals['kwl_gmv'] && 
		local_search_volume >= ds_vals['kwl_lsv']) {
		return false;
	}
	return true;
}

ds_set_value = function (key, val) {
	ds_vals[key] = val;
	window.setTimeout(function() {
		GM_setValue(key, val);
	}, 0);
}

ds_limit_change = function (obj) {
	val = DS_prepare_volume($(this).val());
	key = $(this).attr('id')
	if (val == 0 && key == 'kwl_length') {
		val = 1000;
	}
	ds_set_value(key, val);
}

ds_akc_change = function (obj) {
	val = $(this).val();
	key = $(this).attr('id')
	_tld = $('#'+$(this).attr('id')).val();
	if ($('#'+$(this).attr('id')+':checked').size() == 0) { // unchecked
		val = 0;
	}
	ds_set_value(key, val);
}

ds_extensions_change = function () {
	_tld = $('#'+$(this).attr('id')).val();
	if ($('#'+$(this).attr('id')+':checked').size() == 0) { // unchecked
		delete ds_tlds[_tld];
		ds_tlds.len--;
	} else { // checked
		if (ds_tlds.len > 1) {
			alert('You can only select 2 extensions at once. Unselect an extension before selecting this extension.');
			$('#'+$(this).attr('id')+':checked').removeAttr('checked');
			return false;
		}
		ds_tlds[_tld] = 1;
		ds_tlds.len++;
	}
	_tldx = [];
	for (_tld in ds_tlds) {
		if (_tld == 'len') continue;
		_tldx[_tldx.length] = _tld;
	}
	ds_set_value('kwl_tlds', _tldx.join(','));
}

ds_add_domain = function (domain) {	
	_dom_parts = domain.split('.', 1);

	if (/[^\u0000-\u00ff]/.test(domain)) {
		puny = 'xn--'+punycode.encode(_dom_parts[0]);
	} else {
		puny = _dom_parts[0];
	}

	_re = new RegExp(_dom_parts[0]+".");
	dom_id = puny+'_'+domain.replace(_re, "").replace(/\./, '_');
	domainx = puny+'.'+domain.replace(_re, "");
	if (!ds_domains[domainx]) {		
		ds_domains[domainx] = domain;	
		ds_domain_count++;

		$('#gm_domain_suggestion_cart').append(
			'<table id="keyword_'+dom_id+'" class="selectedKeywordListItem">'+
			'<tbody>'+
			'<tr>'+
			'<td title="'+domainx+'">'+domain+'</td>'+
			'<td align="right">'+
			'<a class="removeLink" href="#@" title="'+domain+'">&#171; Remove</a>'+
			'</td>'+
			'</tr>'+
			'</tbody>'+
			'</table>');

		$('#keyword_'+dom_id+' a.removeLink').click(function () {
			ds_remove_domain($(this).attr('title'));
		});

		if (ds_domain_count > 0) {
			$('#shoppingCart #emptyList').hide();
			$('#shoppingCart #removeAllDomains').show();
			$('#registerDomainsBtn').removeAttr('disabled');
			$('#registerDomainsSelect').removeAttr('disabled');
		}

		$('td.'+dom_id+' a').addClass('disabled');
	}
}

ds_remove_domain = function (domain) {
	_dom_parts = domain.split('.', 1);

	if (/[^\u0000-\u00ff]/.test(domain)) {
		puny = 'xn--'+punycode.encode(_dom_parts[0]);
	} else {
		puny = _dom_parts[0];
	}

	_re = new RegExp(_dom_parts[0]+".");
	dom_id = puny+'_'+domain.replace(_re, "").replace(/\./, '_');
	domainx = puny+'.'+domain.replace(_re, "");

	if (ds_domains[domainx]) {
		delete ds_domains[domainx];		
		ds_domain_count--;
		$('#keyword_'+dom_id).remove();

		if (0 >= ds_domain_count) {
			$('#shoppingCart #emptyList').show();
			$('#shoppingCart #removeAllDomains').hide();
			$('#registerDomainsBtn').attr('disabled', 'disabled');
			$('#registerDomainsSelect').attr('disabled', 'disabled');
		}

		$('td.'+dom_id+' a').removeClass('disabled');
	}
}

ds_remove_all_domains = function () {
	for (domain in ds_domains) {
		ds_remove_domain(ds_domains[domain]);
	}
}

ds_checkout = function () {
	$('#'+$('#registerDomainsSelect').val()+'-domains').val(_to_keys(ds_domains).join("\n"));
	$('#'+$('#registerDomainsSelect').val()+'-form').submit();
}

_to_keys = function (arr) {
	keys = [];
	for (key in arr) {
		keys[keys.length] = key;
	}
	return keys;
}

document.addEventListener('DOMNodeInserted', function(event) {
	if (event && event.target && event.target.id == 'kpResultsTableBody') {
		if (DS_wait_load_handle != null) {
			window.clearTimeout(DS_wait_load_handle);
		}
		DS_wait_load_handle = window.setTimeout(DS_wait_load, 100);
	}
}, true);


