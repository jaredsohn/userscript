// ==UserScript==
// @name           Hide Craigslist Fakes
// @namespace      http://parasyte.kodewerx.net/userscripts
// @include        http://*.craigslist.org/*stp*
// @include        http://*.craigslist.org/*w4w*
// @include        http://*.craigslist.org/*w4m*
// @include        http://*.craigslist.org/*m4w*
// @include        http://*.craigslist.org/*m4m*
// @include        http://*.craigslist.org/*msr*
// @include        http://*.craigslist.org/*cas*
// @include        http://*.craigslist.org/*mis*
// @include        http://*.craigslist.org/*ers*
// @exclude        *rnr*
// ==/UserScript==


// Do not process disclaimer pages
var h3 = document.getElementsByTagName('h3');
if (h3[0]) {
	if ((/disclaimer/i).test(h3[0].childNodes[1].nodeValue)) return;
}

// Get domain name
var domain = document.location.href;
domain = domain.substr(0, domain.indexOf('/', 8));


function in_array(obj, search) {
	for (var i in obj) {
		if (obj[i] == search) return true;
	}

	return false;
}

function split_loc(loc) {
	loc = loc.replace(/\*/g, '');
	var locs = loc.split(loc.match(/[^a-zA-Z ]+/));
	for (var i in locs) {
		locs[i] = locs[i].replace(/^\s+|\s+$/g, '');
		locs[i] = locs[i].substr(0, 1).toUpperCase() + locs[i].substr(1).toLowerCase(); // Uppercase first letter
	}
	return locs;
}

function has_caps(str) {
	var chr = str.substr(0, 1);
	return (chr == chr.toUpperCase());
}


// Get city name (location)
if (GM_getValue(domain)) {
	var loc = GM_getValue(domain);
	var locs = split_loc(loc);
}
else {
	var topban = document.getElementById('topban');
	if (topban) {
		var loc = topban.childNodes[1].childNodes[1].childNodes[0].nodeValue.replace(/\//g, '\\/').replace(/ /g, ' *');
		if ((/[^a-zA-Z ]/).test(loc)) {
			GM_setValue(domain, loc);
			var locs = split_loc(loc);
		}
		else loc = false;
	}
	else {
		var meta = document.getElementsByTagName('meta');
		for (var i in meta) {
			if (meta[i].getAttribute('name') == 'description') {
				var loc = meta[i].getAttribute('content').match(/classifieds for (.*)/i);
				if (loc) {
					loc = loc[1].replace(/\s+$/, '').replace(/\//g, '\\/').replace(/ /g, ' *');
					if ((/[^a-zA-Z ]/).test(loc)) {
						GM_setValue(domain, loc);
						var locs = split_loc(loc);
					}
					else loc = false;
				}
				break;
			}
		}
	}
}

var bq = document.getElementsByTagName('blockquote')[1];
if (bq) {
	var el = new Array();
	for (var i = 0; i < bq.childNodes.length; i++) {
		var cur = bq.childNodes[i];

		switch (cur.nodeName) {
			// H4 begins a new day list
			case 'H4':
				el.push(new Array());
				el[el.length - 1].push(cur);
				break;

			case 'P':
				// Skip non-post rows
				if (cur.getAttribute('align') == 'center') break;

				if (!el.length) {
					el.push(new Array());
					el[0].push(null);
				}

				el[el.length - 1].push(cur);
				break;
		}
	}

	for (var i in el) {
		var count = 0;
		for (var j = 1; j < el[i].length; j++) {
			var p = el[i][j];

			if (el[i][0] == null) {
				// Not separated by day
				var pid = p.childNodes[1].getAttribute('href').match(/\/(\d+)\./)[1];
				var subject = p.childNodes[1].childNodes[0].nodeValue;
				var location = (((p.childNodes[2]) && (p.childNodes[2].childNodes[0])) ? p.childNodes[2].childNodes[0].nodeValue : '');
				var pic = false;

				if ((p.childNodes[4]) && (p.childNodes[4].childNodes[0]) && (p.childNodes[4].childNodes[0].nodeValue == ' pic')) pic = true;
			}
			else {
				// Separated by day
				var pid = p.childNodes[0].getAttribute('href').match(/\/(\d+)\./)[1];
				var subject = p.childNodes[0].childNodes[0].nodeValue;
				var location = (((p.childNodes[1]) && (p.childNodes[1].childNodes[0])) ? p.childNodes[1].childNodes[0].nodeValue : '');
				var pic = false;

				if ((p.childNodes[3]) && (p.childNodes[3].childNodes[0]) && (p.childNodes[3].childNodes[0].nodeValue == ' pic')) pic = true;
			}

			var age = 0;
			if ((/- \d\d -/).test(subject.substr(-6))) age = Number(subject.substr(-4, 2));

			// Strip leading space and parentheses
			if (location != '') location = location.substring(2, (location.length - 1));

			p.id = 'p' + pid;

			if ((GM_getValue(p.id)) ||
				(age < 18) || // Must give a valid age!
				(subject.indexOf('  ') != -1) || // Spammers often send post subjects with two or more consecutive spaces
				(location == '') || // No location? I don't want to speak to you!
				((loc) && (eval('(/' + loc + '/i).test(\'' + location.replace('\'', '\\\'') + '\')'))) || // Spammers love to post bogus locations by copy-pasting
				((/"site"/i).test(location)) || // Some spammers even fuck up thier spam bot config files, and end up posting the location variable name insteasd of the actual location ... lol
				// New spammers split up multiple locations and choose one at random
				// We should only block the ones with a pic
				((loc) && (pic) && (in_array(locs, location))) ||
				// Some of the same types of spam attemps do not include a pic, but also write without capitals ... suspicious!
				((loc) && (in_array(locs, location)) && (!has_caps(subject)))
				) {

				// Automatically hide spam posts and mark as spam
				p.style.display = 'none'; // Hiding before blocking makes the script look more responsive
				if (!GM_getValue(p.id)) {
					GM_xmlhttpRequest({
						method: 'GET',
						url: domain + '/flag/?async=async&flagCode=15&postingID=' + pid,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						onload: function(responseDetails) {
							var pid = this.url.substr(this.url.lastIndexOf('=') + 1);
							GM_setValue('p' + pid, true);
						}
					});
				}
			}
			else {
				count++;

				// Create a quick "spam" link
				var space = document.createTextNode(' ');
				p.insertBefore(space, p.childNodes[0]);

				var flag = document.createElement('a');
				flag.href = domain + '/flag/?flagCode=15&postingID=' + pid;
				flag.innerHTML = '[spam]';
				flag.style.fontSize = '75%';
				flag.addEventListener('click', function(event) {
					event.stopPropagation();
					event.preventDefault();

					var postid = event.target.parentNode.id.substr(1);
					GM_xmlhttpRequest({
						method: 'GET',
						url: domain + '/flag/?async=async&flagCode=15&postingID=' + postid,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						onload: function(responseDetails) {
							document.getElementById('p' + postid).style.display = 'none';
							GM_setValue('p' + postid, true);
						}
					});
				}, true);
				p.insertBefore(flag, p.childNodes[0]);
			}
		}
		if ((!count) && (el[i][0] != null)) el[i][0].style.display = 'none';
	}
}
