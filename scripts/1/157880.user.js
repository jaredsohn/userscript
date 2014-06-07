// ==UserScript==
// @name sp_manga
// @namespace http://userscripts.org/
// @description Manga full chapter viewer
// @version 0.3.4
// @include *.mangahere.com/manga/*/*/*
// @include *.mangafox.me/manga/*/*/*
// @include http://mangafox.me/manga/*/*/*
// @include http://*.unixmanga.net/onlinereading/*image=*
// @include http://www.mangareader.net/*/*
// @exclude /www\.mangareader\.net\/[0-9]+\/.+/
// @include http://www.mangapanda.com/*/*/*
// @include http://mangastream.com/read/*/*/*
// @include http://www.anymanga.com/*/*/*
// @include http://anymanga.com/*/*/*
// @include http://manga.animea.net/*chapter*.html
// @include http://www.scan-manga.com/lecture-en-ligne/*
// @include http://www.batoto.net/read/*/*
// @include http://mangapirate.net/*/*
// @include http://www.mangainn.com/manga/chapter/*
// ==/UserScript==
var debug = null;
/* data contents:
 * name [selector]
 * img		image url
 * stop		exclude page url
 * page		special pager function
 * next		next chapter
 * prev		prev chapter
 * proc		special processing function
 * limit	page limit
 * */
/**** wsinfo ****/
function info (self) {
	var site = self._infoinit ();
	var main = new Object ();
	/* wsinfo */
	site.name ("mangafox.me");
	site.img (/z\.mfcdn\.net/i);
	site.next (function (self,event){ next_chapter ()});
	site.prev (function (self,event) {
		if(current_page<=1&&current_chapter_index===0)
		{
			document.location=series_url+'/';
		} else {
			document.location=series_url+'/'
				+ (document.getElementById('top_chapter_list')
				.options[current_chapter_index-1].value)+'/1.html';
		}
	});
	/* wsinfo */
	site.name ("mangahere.com");
	site.img (/z\.mhcdn\.net/i);
	site.next (function (self,event){ next_chapter ()});
	site.prev (function (self,event){ 
		if (current_page <= 1 && current_chapter_index === 0) {
			document.location = series_url + '/'
		} else {
			document.location = (document.getElementById('top_chapter_list')
				.options[current_chapter_index - 1].value) + '/last.html'
		}
	}); 
	/* wsinfo */
	site.name ("unixmanga.net");
	site.img (/nas\.unix.*\/onlinereading\/.*\.(jpg|png|gif)/i);
	site.next (7);
	site.prev (-2);
	site.stop (/next\.html/i);
	/* wsinfo */
	site.name ("mangareader.net");
	site.img (/\.mangareader\.net\/.*\.(jpg|png|gif)/i);
	site.next (3);
	site.prev (4);
	site.proc (function (self) {
		var list = document.getElementById ('pageMenu');
		self.limit = list.options.length;
	});
	/* wsinfo */
	site.name ("mangapanda.com");
	site.img (/\.mangapanda\.com\/.*\.(jpg|png|gif)/i);
	site.next (3);
	site.prev (4);
	site.proc (function (self) {
		var list = document.getElementById ('pageMenu');
		self.limit = list.options.length;
	});
	/* wsinfo */
	site.name ("mangastream.com");
	site.img (/\.mangastream\.com\/m\/.*\/.*\.(jpg|png|gif)/i);
	/* wsinfo */
	site.name ("anymanga.com");
	site.img (/\/manga\/[^\/]*\/(?!covers\/).*\.(jpg|png|gif)/i);
	site.proc (function (self) {
		var regexp = /show_pagelist[^;]*;/i;
		var page = regexp.exec (body.innerHTML);
		var show_pagelist = function (arr, sel) {
			self.limit = arr.length;
		}
		eval (String(page));
	});
	/* wsinfo */
	site.name ("animea.net");
	site.img (/\.animea\.net\/.*\.(jpg|png|gif)/i);
	site.next (function (self,event){ next_chapter ()});
	site.prev (function (self,event){
		if(page<=1&&currentchapterix===0) {
			document.location=series_url+'.html';
		} else {
			document.location=series_url+''
				+(document.getElementById('chapterlistheader')
				.options[currentchapterix-1].value)+'.html';
		}
	});
	/* wsinfo */
	site.name ("scan-manga.com");
	site.proc (function (self) {
		/* data */
		var regexp = /var u =.*check = false;/i
		var str = regexp.exec (head.innerHTML);
		eval (str[0]);
		var start = parseInt (/[0-9]+/i.exec (str));
		/* path */
		var regexp2 = /http:\/\/leI\.scan-manga\.com:8080\/.*\/thumb/i;
		var path = regexp2.exec (head.innerHTML);
		path = String(path[0]);
		path = path.substr (0, path.length - 5);

		var i = start;
		while (u[i])
		{
			layout.new_page (path + u[i]);
			i++;
		}
	});
	/* wsinfo */
	site.name ("batoto.net");
	site.multi ();
	site.img (/\/comics\/.*read.*\.(png|jpg|gif)/i);
	site.page ([/images\/next\.png/i,  -1]);
	site.next ([/images\/nnext\.png/i, -1]);
	site.prev ([/images\/pprev\.png/i, -1]);
	/* wsinfo */
	site.name ("mangapirate.net");
	site.img (/files\/.*\/.*\/.*\.(jpg|png|gif)/i);
	site.proc (function (self) {
		var pg = document.getElementById ('pg');
		var ch = document.getElementById ('chapter');
		self.limit = pg.options.length;

		var js = /var manga_name_urlsafe[^;]*;/i.exec (body.innerHTML)[0];
		debug (js);
		eval (js);
		var path = '/' + manga_name_urlsafe + '/';

		var sl = ch.options [ch.selectedIndex];
		if (sl.nextSibling && sl.nextSibling.value !== undefined)
			layout.set_prev (path + sl.nextSibling.value);
		if (sl.previousSibling && sl.previousSibling.value != undefined)
			layout.set_next (path + sl.previousSibling.value);
	});
	/* wsinfo */
	site.name ("mangainn.com");
	site.img (/mangas\/.*\/.*\.(jpg|png|gif)/i);
	site.page (function (src, links, index) {
		if (main.init != true)
		{
			main.init = true;
			main.page = 1;
			main.limit = document.getElementById ('cmbpages')
				.options.length;
			var ch = document.getElementById ('chapters');
			var sl = ch.options [ch.selectedIndex];
			var path = '/manga/chapter/' + sl.value + '/';
			main.url = path;
		}
		main.page++;
		var page = main.page;
		var url = main.url;
		if (page > main.limit)
			return null;
		return url + 'page_' + page;
	});
	site.proc (function (self) {
		var ch = document.getElementById ('chapters');
		var sl = ch.options [ch.selectedIndex];
		var path = '/manga/chapter/';
		if (sl.nextSibling && sl.nextSibling.value !== undefined)
			layout.set_next (path + sl.nextSibling.value);
		if (sl.previousSibling && sl.previousSibling.value != undefined)
			layout.set_prev (path + sl.previousSibling.value);
	});
}

var head = document.getElementsByTagName ("head")[0];
var body = document.getElementsByTagName ("body")[0];
const page_limit = 128;

var tools = function () {
var self = new Object ();
/* tools **********/
function _links (str)
{
	var regexp = /(src|href) *= *"(\?!"|[^"])*"/gi;
	var arr = str.match (regexp);
	var rst = new Array ();

	for(var i = 0; i < arr.length; i++)
	{
		var c = arr[i].charAt (0);
		var str = arr[i];
		var index = str.indexOf ('"');
		str = str.substr (index+1, str.length - index - 2);
		str = c.toLowerCase () + str;
		rst.push (str);
	}

	return rst;
}

function _ajax (url,cfunc)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function ()
	{
		cfunc (xmlhttp);
	};

	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

/* tools ***************/
self.links	= _links;
self.ajax	= _ajax;
return self;
}();

var selector = function () {
var self = new Object ();
/* selector **********/
self.sites = new Array ();
var obj = null;
function _site (name) {
	obj = new Object ();
	self.sites.push (obj);
	obj.name	= new RegExp (name, "i");
	obj.imgs	= new Array ();
	obj.multi	= false;
	obj.page	= 0;
	obj.next	= null;
	obj.prev	= null;
	obj.proc	= null;
	obj.stop	= new Array ();
	obj.limit	= -1;
}
function _img  (value) { obj.imgs.push (value); }
function _page (value) { obj.page = value; }
function _next (value) { obj.next = value; }
function _prev (value) { obj.prev = value; }
function _proc (value) { obj.proc = value; }
function _stop (value) { obj.stop.push (value); }
function _multi () { obj.multi = true; }
function _finit () {
	var obj = new Object ();
	obj.name	= _site;
	obj.img		= _img;
	obj.page	= _page;
	obj.next	= _next;
	obj.prev	= _prev;
	obj.proc	= _proc;
	obj.stop	= _stop;
	obj.multi	= _multi;
	return obj;
}

function _select () {
	var sites = self.sites;
	var url = document.URL;
	for (var i = 0; i < sites.length; i++)
	{
		if (sites[i].name.test (url))
			return self.data = self.sites[i];
	}
	return self.data = null;
}

function _init () { info (self); }
/* selector **********/
self._infoinit	= _finit;
self.init		= _init;
self.select 	= _select;
self.data		= null;
return self;
} ();

var layout = function () {
var self = new Object ();
/* layout **********/
var panel	= null;
var console	= null;
var btn_next = null;
var btn_prev = null;
var btn_shhd = null;
var pnstate 	= 0;
var csstate 	= 0;
var svtop		= 0;
var svleft		= 0;
var count		= 0;
var cscount		= 0;
var last_href	= "";
var css		= "div#spmg-panel, div#spmg-console {"
	+   "display: none;"
	+   "background: #000; position: absolute;"
	+   "width: 100%; height: 100%; border: none;"
	+   "top: 0; left: 0;"
	+   "z-index: 10000;"
	+   "font-family: sans-serif;"
	+   "}"
	+ "img.spmg-img { max-width: 100%; }"
	+ "div#spmg-console {"
	+   "display: block; visibility: hidden;"
	+   "z-index: 10001;"
	+   "}"
	+ "div#spmg-console div.padding { height: 26pt; }"
	+ "div.spmg-msg {"
	+   "color: #aea; font-family: monospace; font-size: 10pt;"
	+   "padding: 2pt 50pt 2pt 60pt;"
	+   "text-align: left;"
	+   "border-bottom: none !important;"
	+   "}"
	+ "div.spmg-msg1 { color: #88f !important; }"
	+ "div.spmg-msg2 { color: #f88 !important; }"
	+ "div#spmg-console div.spmg-even { background: #080808; }"
	+ "div#spmg-console div.spmg-odd  { background: #000; }"
	+ "div.spmg-cont {"
	+   "color: #ccc; font-size: 10pt;"
	+   "padding: 0 0 25pt 0;"
	+   "text-align: center;"
	+   "}"
	+ "div.spmg-row {"
	+   "color: #333; font-size: 11pt;"
	+   "padding-top: 4pt;"
	+   "padding-bottom: 9pt;"
	+   "font-family: sans-serif;"
	+   "text-align: center;"
	+   "}"
	+ "div.spmg-odd, div.spmg-even {"
	+   "border-bottom: 1px solid #333;"
	+   "}"
	+ "div.spmg-odd  { background: #050505; }"
	+ "div.spmg-even { background: #111; }"
	+ "body[mode=viewer] { background: #000; }"
	+ "body, html { margin: 0; padding: 0; }"
	+ "a.spmg-btn, a.spmg-btn:hover { position: fixed;"
	+   "background: transparent;"
	+   "color: #fff;"
	+   "text-decoration: none;"
	+   "font-weight: normal; font-size: 12pt;"
	+   "font-family: sans-serif; font-style: normal;"
	+   "padding: 4pt 10pt; margin: 0;"
	+   "text-shadow: 0 0 7pt #000;" 
	+   "-moz-user-select: none;"
	+   "-webkit-user-select: none;"
	+   "-ms-user-select: none;"
	+   "user-select: none;"
	+   "cursor: pointer;"
	+   "z-index: 10002;"
	+   "}"
	+ "a.spmg-btn:hover {"
	+   "color: #fff;"
	+   "background: rgba(50,50,50,.75);"
	+   "box-shadow: 0 0 5px rgba(100,100,100,.25) inset;"
	+   "}"
	+ "a.spmg-btn:active, a.spmg-btn:visited, a.spmg-btn:focus {"
	+   "outline: none;"
	+   "}"
	+ "a.spmg-next { top: 0; right: 13pt; }"
	+ "a.spmg-prev { top: 0; left: 28pt; }"
	+ "a.spmg-shhd { top: 0; left: 2pt; }"
	+ "a.spmg-next, a.spmg-prev {"
	+   "border-radius: 0 0 4pt 4pt;"
	+   "visibility: hidden; display: none;"
	+   "}"
	+ "a.spmg-shhd { border-radius: 0 0 4pt 4pt; }";

/* show hide function */
function showhide () {
	pnstate = (pnstate + 1) % 2;
	var obj = body;
	if (body.parentNode.scrollTop > body.scrollTop)
		obj = body.parentNode;
	if (pnstate == 1)
	{
		var stop = obj.scrollTop;
		var left = obj.scrollLeft;
		panel.style.display = "block";
		console.style.display = "block";
		body.setAttribute ("mode", "viewer");
		btn_next.style.visibility = "visible";
		btn_prev.style.visibility = "visible";
		body.scrollTop	= svtop;
		body.scrollLeft	= svleft;
		body.parentNode.scrollTop	= svtop;
		body.parentNode.scrollLeft	= svleft;
		svtop	= stop;
		svleft	= left;
	}
	else {
		var stop = obj.scrollTop;
		var left = obj.scrollLeft;
		panel.style.display = "none";
		console.style.display = "none";
		body.setAttribute ("mode", "none");
		btn_next.style.visibility = "hidden";
		btn_prev.style.visibility = "hidden";
		body.scrollTop	= svtop;
		body.scrollLeft	= svleft;
		body.parentNode.scrollTop	= svtop;
		body.parentNode.scrollLeft	= svleft;
		svtop	= stop;
		svleft	= left;
	}
}

function csshowhide () {
	csstate = (csstate + 1) % 2;
	if (csstate == 1)
		console.style.visibility = "visible";
	else
		console.style.visibility = "hidden";
}

/* get key */
function getkey (event)
{
	var key = -1;
	if (event.which > 0)
		key = event.which;
	else if (event.keyCode > 0)
		key = event.keyCode;
	else if (event.charCode > 0)
		key = event.charCode;
	return key;
}

/* keyboard event */
function keyboard (event)
{
	var key = getkey (event);
	if (key == 96) 
		return showhide ();
	else if (key == 126) 
		return csshowhide ();
	else if (key == 37) {
		self.prev ();
		return disable (event);
	}
	else if (key == 39) {
		self.next ();
		return disable (event);
	}
}

/* event disabler */
function disable (event) {
	event.stopPropagation ();
	event.preventDefault ();
	return false;
}

/* keyboard control holder */
function keyboard_disable (event) {
	var key = getkey (event);
	if (key == 37 || key == 39)
		return disable (event);
}

/* initialize function */
function _init () {
	/* css */
	var obj = document.createElement ("style");
	obj.type = "text/css";
	obj.innerHTML = css;
	head.appendChild (obj);
	/* panel */
	panel = document.createElement ("div");
	panel.id = "spmg-panel";
	body.appendChild (panel);
	/* console */
	console = document.createElement ("div");
	console.id = "spmg-console";
	body.appendChild (console);
	var pad = self.debug ("");
	pad.className += " padding";
	/* buttons */
	btn_next = document.createElement ("a");
	btn_prev = document.createElement ("a");
	btn_shhd = document.createElement ("a");
	btn_next.className = "spmg-btn spmg-next";
	btn_prev.className = "spmg-btn spmg-prev";
	btn_shhd.className = "spmg-btn spmg-shhd";
	btn_next.innerHTML = "Next";
	btn_prev.innerHTML = "Previous";
	btn_shhd.innerHTML = "`";
	body.appendChild (btn_next);
	body.appendChild (btn_prev);
	body.appendChild (btn_shhd);
	btn_shhd.addEventListener ("click", showhide, false);
	document.addEventListener ("keydown", keyboard_disable, true);
	document.addEventListener ("keypress", keyboard, true);
	document.addEventListener ("keyup", keyboard_disable, true);
}
function _sbtn (self, value) {
	if (value == null || value == "")
		return;
	if (self.getAttribute ("set") != "true")
	{
		self.style.display = "block";
		self.setAttribute ("set", "true");
		if ((typeof value)[0] == 's') /* string */
			self.href = value;
		else if ((typeof value)[0] == 'f') /* function */
		{
			var js = "var fx = " + String (value) + "; fx (this, event);";
			self.setAttribute ("onclick", js);
		}
		return true;
	}
	return false;
}
function _snext (value) {
	_sbtn (btn_next, value);
	if ((typeof value)[0] == 's') /* string */
		self.next_href = value;
}
function _sprev (value) {
	_sbtn (btn_prev, value);
	if ((typeof value)[0] == 's') /* string */
		self.prev_href = value;
}
function _next () { btn_next.click (); }
function _prev () { btn_prev.click (); }
function img_click (event) {
	var obj = event.target.style;
	if (obj.maxWidth == "none")
		obj.maxWidth = "100%";
	else
		obj.maxWidth = "none";
}
function _npage (src) {
	if (src == last_href)
		return;
	else
		last_href = src;
	count++;
	var cont = document.createElement ("div");
	var row  = document.createElement ("div");
	var img  = document.createElement ("img");
	img.src = src;
	img.addEventListener ("click", img_click, false);
	row.innerHTML = count;
	img.className	= "spmg-img";
	row.className	= "spmg-row";
	cont.className	= "spmg-cont";
	if (count % 2 == 1)
		cont.className += " spmg-odd";
	else
		cont.className += " spmg-even";
	cont.appendChild (row);
	cont.appendChild (img);
	panel.appendChild (cont);
}

function _debug (msg, aclass) {
	if ((typeof msg)[0] == 'o' && msg.length > 0) /* object */
	{
		_debug ("Listing Array Object", 1);
		for (var i = 0; i < msg.length; i++)
			_debug (msg[i]);
		return null;
	}
	else
	{
		cscount++;
		var div = document.createElement ("div");
		div.className = "spmg-msg";
		if (cscount %2 == 1)
			div.className += " spmg-odd";
		else
			div.className += " spmg-even";
		if (aclass > 0)
			div.className += " spmg-msg" + aclass;
		div.innerHTML = String (msg);
		console.appendChild (div);
	}
	return div;
}

debug = _debug;
/* layout **********/
self.next_href	= null;
self.prev_href	= null;
self.set_next	= _snext;
self.set_prev	= _sprev;
self.new_page	= _npage;
self.next		= _next;
self.prev		= _prev;
self.init		= _init;
self.debug		= _debug;
self.showhide	= showhide;
return self;
} ();

var loader = function () {
var self = new Object ();
/* loader **********/
/* data contents:
 * name [selector]
 * imgs [check_imgs]
 * page [check_page]
 * next [run]
 * prev [run]
 * proc [run]
 * limit [process]
 * stop [process]
 * */
var data		= null;
var last_href	= null;
var count = 0;
function _init () {
	data = selector.data;
}

function check_arr (arr, str)
{
	for (var i = 0; i < arr.length; i++)
		if (arr[i].test (str))
			return true;
	return false;
}

function check_offset (src, links, obj) {
	if ((typeof data.next)[0] != 'o' || data.next.length != 2)
		return -1;
	var index = -1;
	for (var i = 0; i < links.length; i++)
	{
		if (obj[0].test (links[i]))
		{
			index = i + obj[1];
			break;
		}
	}
	if (index >= 0 && index < links.length)
		return index;
	return -1;
}

function check_imgs (src, links) {
	for (var i = 0; i < links.length; i++)
	{
		if (check_arr (data.imgs, links[i]))
			return i;
	}
	return -1;
}

function check_page (src, links, index) {
	if ((typeof data.page)[0] == 'n') /* number */
	{
		var i = index + data.page;
		i = i > links.length ? links.length : i;
		while (i > 0)
		{
			i--;
			if (links[i].charAt (0) == 'h')
				return links[i].substr (1);
		}
		return null;
	}
	else if ((typeof data.page)[0] == 'o' && data.page.length == 2)
	{
		var i = check_offset (src, links, data.page);
		if (i >= 0)
			return links[i].substr (1);
	}
	else if ((typeof data.page)[0] == 'f') /* function */
		return data.page (src, links, index);
	return null;
}

function process (src, links) {
	count++;
	if (count > page_limit)
	{
		debug ("Too many pages!!!", 2);
		if (last_href != null)
			layout.set_next (last_href);
		return;
	}
	else if (count > data.limit && data.limit > 0)
	{
		if (last_href != null)
			layout.set_next (last_href);
		return;
	}
	var index = check_imgs (src, links);
	if (index >= 0)
	{
		layout.new_page (links[index].substr (1));
		if (data.multi)
		{
			for (var i = index + 1; i < links.length; i++)
			{
				if (check_arr (data.imgs, links[i]))
					layout.new_page (links[i].substr (1));
			}
		}
	}
	var npage = check_page (src, links, index);
	if (npage != null && npage != ""
			&& npage != layout.prev_href
			&& npage != layout.next_href)
	{
		if (check_arr (data.stop, npage))
			return;
		debug ("AJAX: " + npage, 2);
		tools.ajax (npage, callback);
		last_href = npage;
	}
}

function callback (ajax) { 
	if (ajax.readyState == 4 && ajax.status == 200)
	{
		debug ("AJAX: callback.", 1);
		var str = ajax.responseText;
		var links = tools.links (str);
		process (str, links);
	}
}

function _run () {
	if (data.proc != null)
	{
		debug ("Runing custom process!", 1);
		data.proc (data);
	}
	data.links = tools.links (body.innerHTML);
	debug ("Links of current page", 1);
	/* next|prev */
	var index = check_imgs (body.innerHTML, data.links);
	if ((typeof data.next)[0] == 'n')
	{
		var i = data.next + index;
		if (i >= 0 && i < data.links.length)
			layout.set_next (data.links [i].substr(1));
	}
	else if ((typeof data.next)[0] == 'o' && data.next != null
			&& data.next.length == 2)
	{
		var i = check_offset (body.innerHTML, data.links, data.next);
		if (i >= 0)
			layout.set_next (data.links [i].substr(1));
	}
	else
		layout.set_next (data.next);
	/* previous */
	if ((typeof data.prev)[0] == 'n')
	{
		var i = data.prev + index;
		if (i >= 0 && i < data.links.length)
			layout.set_prev (data.links [i].substr(1));
	}
	else if ((typeof data.prev)[0] == 'o' && data.prev != null
			&& data.prev.length == 2)
	{
		var i = check_offset (body.innerHTML, data.links, data.prev);
		if (i >= 0)
			layout.set_prev (data.links [i].substr(1));
	}
	else
		layout.set_prev (data.prev);

	/* debug */
	for (var i = 0; i < data.links.length; i++)
	{
		if (i == index)
			debug (data.links[i], 2);
		else
			debug (data.links[i]);
	}

	/* processing data */
	process (body.innerHTML, data.links);
}
/* loader **********/
self.init	= _init;
self.run	= _run;
return self;
} ();

/**** Running Script ****/
selector.init ();
selector.select ();
if (!selector.data)
	debug ("ERROR: selector failed.", 1);
layout.init ();
layout.showhide ();
loader.init ();
loader.run ();

