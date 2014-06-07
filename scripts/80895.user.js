// ==UserScript==
// @name		Castle Age Fill Army
// @description	Auto-fill Castle Age Army on Facebook.
// @license		GNU Lesser General Public License; http://www.gnu.org/licenses/lgpl.html
// @version		1.1
// @include		http://apps.facebook.com/castle_age/*
// @include		https://apps.facebook.com/castle_age/*
// ==/UserScript==


var list, max, last, state = -1, delay = 3000, text = {
	full:'Army Full',
	ready:'Fill Army?',
	filling:'Filling Army',
	players:'Add Players',
	army:'Remove Known'
};
// state = -2:army full, -1:ready, 0:idle, 1:loading friends, 2:loading army, 3:filling army
// delay = ms between requests (seconds * 1000)

var setText = function(el, txt) {
	el.replaceChild(document.createTextNode(txt), el.childNodes[0]);
};

var createTitle = function() {
	var el = document.createElement('a'), parent = document.getElementById('app46755028429_main_bntp').childNodes[5];
	el.id = 'fill_army';
	el.style.color = '#b09060';
	el.appendChild(document.createTextNode(text.ready));
	parent.insertBefore(document.createTextNode(' | '), parent.childNodes[parent.childNodes.length - 3]);
	parent.insertBefore(el, parent.childNodes[parent.childNodes.length - 3]);
	el.addEventListener('click', function(){
		if (state) {
			state = -1;
		} else {
			state = 1;
			list = [];
			doFriends();
		}
		doTitle();
		return false;
	}, true);
	return el;
};

var doTitle = function() {
	var el = document.getElementById('fill_army') || createTitle();
	switch(state) {
		case -2:
			setText(el, text.full);
			state = 0;
			break;
		case -1:
			setText(el, text.ready);
			state = 0;
			break;
		case 0:
			break;
		case 1:
			setText(el, text.filling + ' (' + text.players + ('....'.substr(0,(Date.now() / 1000) % 4)) + ')');
			break;
		case 2:
			setText(el, text.filling + ' (' + text.army + ('....'.substr(0,(Date.now() / 1000) % 4)) + ')');
			break;
		case 3:
			setText(el, text.filling + ' (' + (max - list.length + 1) + '/' + max + ')');
			break;
	}
};
window.setInterval(doTitle, 1000);

var doArmy = function() {
	var request = new XMLHttpRequest();
	request.open("GET", window.location.protocol + '//apps.facebook.com/castle_age/index.php?tp=cht&lka=' + list[0] + '&buf=1');
	request.onreadystatechange = function() {
		if (request.readyState !== 4) {
			return;
		}
		if (request.status === 200 && state > 0) {
			list.shift();
			if (!list.length) {
				state = -2;
			}
		}
		if (state > 0) {
			window.setTimeout(doArmy, Math.max(Date.now() - last, delay));
		}
		return;
	};
	request.send();
	last = Date.now();
};

var doFriends = function() {
	var request = new XMLHttpRequest();
	request.open("GET", window.location.protocol + '//apps.facebook.com/castle_age/' + (state === 1 ? 'gift.php?app_friends=c&giftSelection=1&' : 'army.php?') + Math.random());
	request.onreadystatechange = function() {
		if (request.readyState !== 4) {
			return;
		}
		if (request.status === 200 && state > 0) {
			try {
				var i, data = JSON.parse(request.responseText.match(/var items=({[^;]*});/i)[1]);
				if (typeof data !== 'object') {
					throw 1;// force failure
				}
				if (state === 1) {// Add all castle age players
					for (i in data) {
						list.push(i);
					}
				} else {// Only keep those not already in army...
					for (i=0; i<list.length; i++) {
						if (!(list[i] in data)) {
							list.splice(i--, 1);// Deleting one, so no ++ for the next...
						}
					}
				}
				state++;
			} catch(e) {}// Bad JSON
		}
		if (state === 1 || state === 2) {
			window.setTimeout(doFriends, Math.max(Date.now() - last, delay));
		} else if (state === 3) {
			if (list.length) {
				max = list.length;
				window.setTimeout(doArmy, Math.max(Date.now() - last, delay));
			} else {
				state = -2;
			}
		} else {
			state = -1;
		}
	}
	request.send();
	last = Date.now();
};

