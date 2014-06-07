// ==UserScript==
// @name		cn_admin_spammer_check
// @namespace		cloudynights
// @description		Audit new user registrations for spammers (on www.stopforumspam.com).
// @author		Olivier Biot
// @version		0.5 (28-Jul-2010)
// @include		http://www.cloudynights.com/ubbthreads/admin/approveuser.php*
// @include		http://cloudynights.com/ubbthreads/admin/approveuser.php*
// @include		http://www.cloudynights.com/ubbthreads/admin/approveunverifieduser.php*
// @include		http://cloudynights.com/ubbthreads/admin/approveunverifieduser.php*
// ==/UserScript==

// Location detection via ipinfodb.com added by Greg Kettell, 01-Apr-2011

function Scope(o) {
	var scope = this;
	for (a in o)
		this[a] = o[a];
	
	this.callback = function(r) {
		scope.func.call(scope, r);
	};
}


function action_on_match(responseDetails) {
	var label = this.my_label;
	if (responseDetails.status == 200) {
		if (responseDetails.responseText.search('<appears>yes</appears>') > 0) {
			var f = responseDetails.responseText.match(/\<frequency\>(\d+)\<\/frequency\>/);
			f = RegExp.$1;
			var fragment = document.createDocumentFragment();
			fragment.appendChild(document.createTextNode("[" + label + ": " + f + "x "));
			var img = document.createElement('img');
			img.setAttribute('src','http://www.cloudynights.com/ubbthreads/images/graemlins/noway.gif');
			img.setAttribute('border', "0");
			fragment.appendChild(img);
			fragment.appendChild(document.createTextNode("]"));
			elem = document.getElementById('cn-new-user-' + this.my_j);
			elem.appendChild(fragment);
			elem.style.background = '#ffaaaa';
			elem.style.color = '#000000';
			elem.getElementsByTagName('A')[0].style.color = "#000000";
			elem.style.color = '#000000';
			elem2 = elem.parentNode.getElementsByTagName('td')[4];
			elem2.style.background = '#ffaaaa';
			elem2.style.color = "#000000";
			elem2.getElementsByTagName('input')[0].checked = true;
			// document.getElementById('cn-new-user-' + this.my_j).parentNode.getElementsByTagName('td')[4].getElementsByTagName('input')[1].value += "(known spammer " + label + ")";
		} else if (responseDetails.responseText.search('<appears>no</appears>') > 0) {
			var fragment = document.createDocumentFragment();
			fragment.appendChild(document.createTextNode("[" + label + ": no match]"));
			document.getElementById('cn-new-user-' + this.my_j).appendChild(fragment);
		}
	} else {
		var fragment = document.createDocumentFragment();
		fragment.appendChild(document.createTextNode("[Error: " + label + " check returned status code " + responseDetails.status + "]"));
		document.getElementById('cn-new-user-' + this.my_j).appendChild(fragment);
	}
}

function action_on_hostip(responseDetails) {
	var label = this.my_label;
	if (responseDetails.status == 200) {
		var country = responseDetails.responseText.match(/\<countryName\>([\S ]+)\<\/countryName\>/);
		country = RegExp.$1;
		var countryCode = responseDetails.responseText.match(/\<countryCode\>([\S ]+)\<\/countryCode\>/);
		countryCode = RegExp.$1;
		var fragment = document.createDocumentFragment();
		fragment.appendChild(document.createTextNode("[" + label + ": " + country ));
		var img = document.createElement('img');
		img.setAttribute('src', 'http://www.cloudynights.com/ubbthreads/images/flags/' + countryCode.toLowerCase() + '.png');
		img.setAttribute('border', "0");
		fragment.appendChild(img);
		fragment.appendChild(document.createTextNode("]"));
		elem = document.getElementById('cn-new-user-' + this.my_j);
		elem.appendChild(fragment);
	} else {
		var fragment = document.createDocumentFragment();
		fragment.appendChild(document.createTextNode("[" + label + ": unknown"));
		fragment.appendChild(document.createTextNode("]"));
		elem = document.getElementById('cn-new-user-' + this.my_j);
		elem.appendChild(fragment);
	}
}

var tables = document.getElementsByTagName('table');
var k = 0;
for (var i = 0; (i < tables.length) && (k < 2); i++) {
	if (tables[i].className.search('tableborders') >= 0) {
		k++;
		if (k == 2) {
			var trs = tables[i].getElementsByTagName('tr');
			for (var j = 1; j < trs.length -1; j++) { // Skip header line
				var tds = trs[j].getElementsByTagName('td');
				tds[1].setAttribute('id', 'cn-new-user-' + j);
				var data = tds[1].childNodes;
				var out = 'NEW USER #' + j;
				var apiURI = 'http://www.stopforumspam.com/api?';
				out += "\n" + 'User name: ('+ (data[0].nodeValue).replace(/^\s*|\s*$/g, '') +')';
				var email = data[3].href.slice(7);
				out += "\n" + 'URL = (' + email + ')';
				var ip = (data[6].nodeValue).replace(/^\s*|\s*$/g, '');
				out += "\n" + 'User IP: ('+ ip +')';
				// alert (out);

				var br = document.createElement('br');
				tds[1].appendChild(br);

				var scope_email = new Scope( {my_i: i, my_j: j, my_label: 'Email', func : action_on_match} );

				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.stopforumspam.com/api?email=' + email,
					onload: scope_email.callback
				});
	
				var scope_ip = new Scope( {my_i: i, my_j: j, my_label: 'IP', func : action_on_match} );

				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.stopforumspam.com/api?ip=' + ip,
					onload: scope_ip.callback
				});

				//var scope_iploc = new Scope( {my_i: i, my_j: j, my_label: 'LOC', my_ip: ip, fun : action_on_hostip} );

				// So where's this dude from?
				//GM_xmlhttpRequest({
				//	method: 'GET',
				//	url: 'http://api.hostip.info/?ip=' + ip,
				//	onload: scope_iploc.callback
				//});

				var scope_iploc = new Scope( {my_i: i, my_j: j, my_label: 'LOC', my_ip: ip, func : action_on_hostip} );

				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://api.ipinfodb.com/v3/ip-country/?key=5890ae49f86b5a49f8016ace328b57ce26a0db5be9c944f707dd43a5d71bc413&format=xml&ip=' + ip,
					onload: scope_iploc.callback
				});
			}
		}
	}
}

