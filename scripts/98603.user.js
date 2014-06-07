// ==UserScript==
// @name Google Apps MX Records - Peer1
// @description Install google apps mail mx records into peer1
// @namespace http://www.danguer.com/userscripts/gapps-peer1
// @include https://mypeer1.com/dedicated/services/zone-edit.php*
// @include https://mypeer1.com/managed/services/zone-edit.php*

// for chrome
// @match https://mypeer1.com/dedicated/services/zone-edit.php*
// @match https://mypeer1.com/managed/services/zone-edit.php*

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

function get_host() {    
	var domains = document.getElementsByName('domain');
	return domains[0].value;
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
	var el_domain = document.getElementsByName('new_record')[0];
	var parent = get_parent(el_domain, "TD");
		
	if (parent) {
		var el_separator = document.createElement('div');
		var button = document.createElement('input');
		
		button.type = 'button';
		
		if ((window.location+"").indexOf('managed/') > -1)
			button.className = 'btn-s blue';
		else
			button.className = 'btn-s red';
		
		button.value = "Add GApps MX";
		button.addEventListener("click", install_gapps_mail_init, true);
		el_separator.style.height = '4px';
		parent.appendChild(el_separator);
		parent.appendChild(button);
	}
}

function install_gapps_mail_init() {
	domain_index = 0;
	install_gapps_mail_do();
}

function install_gapps_mail_do() {
	if (domain_index >= gdomains.length) {
		window.location.reload();
		return; //nothing to do
	}

	var host = get_host();
	var item = gdomains[domain_index];
	domain_index++;
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: '/actions/zone-edit.php',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: "domain="+host+"&type=mx&host=&ttl="+ttl+"&target="+item.h+"&priority="+item.p+"&add_record=Create",
		onload: function() {
			install_gapps_mail_do();
		},
		onerror: function() {
			install_gapps_mail_do(); //maybe repeated option
		}
	});
}

show_button();