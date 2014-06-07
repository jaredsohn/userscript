// ==UserScript==
// @name Google Apps MX Records - DNSMadeEasy
// @description Install google apps mail mx records into DNSMadeEasy
// @namespace http://www.danguer.com/userscripts/gapps-dnsmadeeasy
// @include https://www.dnsmadeeasy.com/servlet/domainlist
// @include https://www.dnsmadeeasy.com/servlet/genrecmod
// @include https://www.dnsmadeeasy.com/servlet/genreclist

// for chrome
// @match https://www.dnsmadeeasy.com/servlet/domainlist
// @match https://www.dnsmadeeasy.com/servlet/genrecmod
// @match https://www.dnsmadeeasy.com/servlet/genreclist

// @version 0.1
// ==/UserScript==

var domain_index = 0;
var ttl = 3600;
var gdomains = [
	{p: 10, h: "aspmx.l.google.com"},
	{p: 50, h: "alt1.aspmx.l.google.com"},
	{p: 50, h: "alt2.aspmx.l.google.com"},
	{p: 100, h: "aspmx2.googlemail.com"},
	{p: 100, h: "aspmx3.googlemail.com"},
	{p: 100, h: "aspmx4.googlemail.com"},
	{p: 100, h: "aspmx5.googlemail.com"}
];


function get_identity_token(html) {
	if (html) {
		var regex = new RegExp('input name="pageidentity".*value="([^"]*)"', "gim");
		var m = regex.exec(html);
		if (m)
			return m[1];
			
		return null;
	} else {
		var ids = document.getElementsByName('pageidentity');
		return ids[0].value;
	}
}


function get_parent(el, tag) {
	while (el && el.parentNode) {
		if (el.nodeName == tag) {
			return el;
		}
		el = el.parentNode;
	}
}



function show_button() {
	var el_tds = document.getElementsByTagName('td'); //could be very expensive so check later other options
	for (var i=0; i<el_tds.length; i++) {
		var el = el_tds[i];
		if (el.innerHTML.indexOf('td') == -1 && el.innerHTML.indexOf('MX Record') > -1) {
			var parent = get_parent(el, "TBODY");
				
			if (parent) {
				var newel_tr = document.createElement('tr');
				var newel_td = document.createElement('td');
				var newel_a = document.createElement('a');
				
				newel_tr.align = 'center';
				newel_tr.className = 'boxTitleSmaller';
				newel_a.href = 'javascript:void(0);';
				newel_a.addEventListener("click", install_gapps_mail_init, true);
				newel_a.innerHTML = 'Add GApps MX Records';
								
				newel_td.appendChild(newel_a);								
				parent.appendChild(newel_tr);
				newel_tr.appendChild(newel_td);
				return; //nothing more to do
			}
		}
	}
}

function install_gapps_mail_init() {
	domain_index = 0;
	install_gapps_mail_do();
}

function install_gapps_post1(item_domain, token) {
	if (!token)
		token = get_identity_token();
		
	GM_xmlhttpRequest({
		method: 'POST',
		url: '/servlet/genreclist',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: 'action=add&page_index=4&pageidentity='+token,
		onload: function(response) {
			install_gapps_post2(item_domain, response.responseText);
		},
		onerror: function() {
			alert('failed to perform action on record: '+item_domain.h);
		}
	});
}
function install_gapps_post2(item_domain, response) {
	var token = get_identity_token(response);
	GM_xmlhttpRequest({
		method: 'POST',
		url: '/servlet/genrecmod',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: 'name=&value='+item_domain.h+'.&n_att_a='+item_domain.p+'&ttl='+ttl+'&review1=%3Cuser_name%3E%40example.com.&review2='+item_domain.h+'.&review4='+item_domain.p+'&review3='+ttl+'&action_continue=Continue&pageidentity='+token,
		onload: function(response) {
			install_gapps_post3(item_domain, response.responseText);
		},
		onerror: function() {
			install_gapps_mail_do(); //maybe repeated
		}
	});
}
function install_gapps_post3(item_domain, response) {
	var token = get_identity_token(response);
	GM_xmlhttpRequest({
		method: 'POST',
		url: '/servlet/genrecmod',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: 'action_continue=Yes&pageidentity='+token,
		onload: function() {
			install_gapps_mail_do(token); //continue
		},
		onerror: function() {
			alert('failed to create the record: '+item_domain.h);
		}
	});
}


//		data: "domain="+host+"&type=mx&host=&ttl="+ttl+"&target="+item.h+"&priority="+item.p+"&add_record=Create",


function install_gapps_mail_do(token) {
	if (domain_index >= gdomains.length) {
		
		//create a dummy form an post
		var form = document.createElement('form');
		form.method = 'POST';
		form.action = '/servlet/domainlist';
		form.innerHTML = '<input type="hidden" name="action" value="records" /><input type="hidden" name="index" value="5" /><input type="hidden" name="pageidentity" value="'+token+'" />';
		document.body.appendChild(form);
		form.submit();
		return; //nothing to do
	}

	var item = gdomains[domain_index];
	domain_index++;
	install_gapps_post1(item, token);
}

show_button();