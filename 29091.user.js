// ==UserScript==
// @name           Google Icons
// @include        http://www.google.com.my/
// ==/UserScript==


var FRAMEDELAY = 50,
	names = ['Gmail', 'Calendar', 'Toolbar', 'Desktop', 'Picasa', 'YouTube', 'Notebook'],
	urls = ['http://mail.google.com/', 'http://www.google.com/calendar', 'http://toolbar.google.com/', 'http://desktop.google.com/', 'http://picasa.google.com/', 'http://youtube.com/', 'http://www.google.com/notebook'];

var place = document.getElementsByTagName('center')[0].insertBefore(document.createElement('div'), document.forms[0].nextSibling);
place.innerHTML = '<table style="font-size:13px"><tr valign="bottom" align="center"></tr></table>';
place = place.firstChild.rows[0];

for (var i = 0; i < 7; i++) {
	new icon(names[i], urls[i], i);
}

GM_addStyle('.GM_stupidicon{width:52px;height:37px;background:#fff url(http://img519.imageshack.us/img519/6129/svcspriteallqf5.gif) no-repeat scroll 0 0}\
			.GM_blocklink{display:block;margin:0 6px 0 6px}');

function icon(name, url, index) {
	this.name = name;
	this.url = url;
	this.x = 0;
	this.y = 'px ' + index * -37 + 'px';
	this.moving = false;
	with (place.insertCell(-1)) {
		innerHTML = '<a href="' + url + '" class="GM_blocklink"><div class="GM_stupidicon"></div>' + name + '</a>';
		firstChild.addEventListener('mouseover', animstart(this), true);
		firstChild.addEventListener('mouseout', animend(this), true);
		this.obj = firstChild.firstChild;
	}
	this.obj.style.backgroundPosition = '0' + this.y;
}

function animstart(ico) {
	return function(e) {
		if (ico.moving) clearInterval(ico.moving);
		ico.moving = setInterval(movebg, FRAMEDELAY, ico, 1);
	}
}

function animend(ico) {
	return function(e) {
		if (ico.moving) clearInterval(ico.moving);
		ico.moving = setInterval(movebg, FRAMEDELAY, ico, -1);
	}
}

function movebg(ico, dir) {
	if ((dir == 1 && ico.x == 6) || (dir == -1 && ico.x == 0)) { clearTimeout(ico.moving); return; }
	ico.x += dir;
	ico.obj.style.backgroundPosition = -ico.x * 52 + ico.y;
}