// ==UserScript==
// @name		Konachan/yande.re: ID Navigation
// @namespace	Zolxys
// @description	Adds a "Mode" link to the paginator which switches between normal navigation and ID navigation.  ID navigation prevents skipping over images as a result of images on previous pages being deleted and prevents showing images twice or loosing your place.
// @include	http://konachan.com/post
// @include	http://konachan.com/post?*
// @include	http://konachan.net/post
// @include	http://konachan.net/post?*
// @include	https://yande.re/post
// @include	https://yande.re/post?*
// @version	2.2
// ==/UserScript==
var c = 21;
if (location.host == 'yande.re')
	c = 16;
var o = document.getElementById('paginator');
var n = o.firstChild;
while (n != null) {
	if(n.nodeName == 'DIV')
		break;
	n = n.nextSibling;
}
if (n == null) {
	n = document.createElement('div');
	n.className = 'pagination';
	o.appendChild(n);
}
var d = n.cloneNode(false);
n.id = 'zolnav_norm';
d.id = 'zolnav_id';
((location.hash == '#idnav')? n : d).style.display = 'none';
n.parentNode.insertBefore(d,n.nextSibling);
var x = -1, xa = -1, m = 1, s = '', t = '', bi = false, order = 'id_desc';
var sa = location.search.substr(1).split('&');
for (var i = 0; i < sa.length; ++i) {
	var r;
	if ((r = /^page=(\d+)$/.exec(sa[i])) != null)
		m = parseInt(r[1]);
	else if (/^tags=./.test(sa[i])) {
		var ta = sa[i].substr(5).split('+');
		for (var j = 0; j < ta.length; ++j) {
			if ((r = /^id:([<>])(=?)(\d+)$/.exec(unescape(ta[j]))) != null) {
				x = parseInt(r[3]);
				xa = ((r[1] == '>')? 1 : -1);
				if (r[2] == '=')
					x -= xa;
			}
			else if (ta[j].substr(0,8) == 'order%3A') {
				if (ta[j].substr(8,2) != 'id') 
					return;
				order = ta[j].substr(8);
			}
			else t += '+' + ta[j];
		}
	}
	else {
		s += '&' + sa[i];
		if ((r = /^limit=(\d+)$/.exec(sa[i])) != null)
			c = parseInt(r[1]);
	}
}
var b = (x != -1), z = 0;
if (b) {
	x += c * (m - 1) * xa;
	z = x + (c+1) * xa;
	if (x < 0) x = 0;
	if (z < 0) z = 0;
	if (xa == 1 && z == 0) z = c + 1;
	if (xa == -1 && x == 0) x = c + 1;
	o = document.createElement('a');
	o.textContent = 'Drop ID';
	o.href = '/post?' + (s + '&tags=order%3A' + order + t).substr(1);
	n.insertBefore(o, n.firstChild);
	if ((xa == 1) != (order == 'id'))
		b = false;
}
if (!b) {
	xa = ((order == 'id')? 1 : -1);
	o = document.getElementById('post-list-posts').firstChild;
	while (o != null && o.nodeName != 'LI')
		o = o.nextSibling;
	if (o == null)
		return;
	x = parseInt(o.id.substr(1)) - xa;
}
if ((o = document.getElementById('post-list-posts')) != null) {
	o = o.lastChild;
	while (o != null) {
		if (o.nodeName == 'LI')
			break;
		o = o.previousSibling;
	}
	if (o != null) {
		var y = parseInt(o.id.substr(1)) + xa;
		if (!b || (xa == 1 && y > z) || (xa == -1 && y < z))
			z = y;
	}
}
o = document.createElement('a');
o.textContent = 'Mode';
o.href = ((b)? '#idnav' : '#');
o.setAttribute('onclick',"document.getElementById('zolnav_norm').style.display='none';document.getElementById('zolnav_id').style.display='';arguments[0].preventDefault();arguments[0].stopPropagation();");
n.insertBefore(o, n.firstChild);
o = document.createElement('a');
o.textContent = 'Mode';
o.href = '#';
o.setAttribute('onclick',"document.getElementById('zolnav_id').style.display='none';document.getElementById('zolnav_norm').style.display='';arguments[0].preventDefault();arguments[0].stopPropagation();");
d.appendChild(o);
var ord = (order == 'id')? '%3E' : '%3C';
if (!b) {
	o = document.createElement('a');
	o.textContent = 'Load';
	o.href = '/post?' + (s + '&tags=order%3A' + order + '+id%3A' + ord + x + t).substr(1) +'#idnav';
	d.appendChild(o);
}
o = document.createElement('a');
o.textContent = 'Reverse';
o.href = '/post?' + (s + '&tags=order%3A' + ((xa == 1)? 'id_desc' : 'id') + '+id%3A' + ((xa == 1)? '%3C' : '%3E') + z + t).substr(1) +'#idnav';
d.appendChild(o);
if (xa == 1 && x == 0) {
	o = document.createElement('span');
	o.textContent = 'Back \u2190';
	o.className = 'previous_page disabled';
	d.appendChild(o);
}
else {
	var y = x - c * xa;
	if (y < 0)
		y = 0;
	o = document.createElement('a');
	o.textContent = 'Back \u2190';
	o.href = '/post?' + (s + '&tags=order%3A' + order + '+id%3A' + ord + y + t).substr(1) +'#idnav';
	o.className = 'previous_page';
	d.appendChild(o);
}
var a = n.getElementsByTagName('a');
var nx = false;
if (a.length >= 2)
	if (a[a.length - 1].rel == 'next')
		nx = true;
if (b && nx) {
	o = document.createElement('span');
	o.textContent = '...'+ a[a.length - 2].textContent;
	o.className = 'gap';
	d.appendChild(o);
}
if (nx && z - xa > 0) {
	o = document.createElement('a');
	o.textContent = ((xa == 1)? 'A' : 'De') +'scending \u2192';
	o.href = '/post?' + (s + '&tags=order%3A' + order + '+id%3A' + ord + (z - xa) + t).substr(1) +'#idnav';
	o.className = 'previous_page';
	d.appendChild(o);
}
else {
	o = document.createElement('span');
	o.textContent = ((xa == 1)? 'A' : 'De') +'scending \u2192';
	o.className = 'next_page disabled';
	d.appendChild(o);
}
