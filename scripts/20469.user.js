// ==UserScript==
// @name           Ajax Kicker 2
// @namespace      blablabla
// @description    Remove posts from /my/ without reloading the page
// @include        http://leprosorium.ru/my/
// @include        http://leprosorium.ru/my/favourites/
// @include        http://leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/my/
// @include        http://www.leprosorium.ru/my/favourites/
// @include        http://www.leprosorium.ru/comments/*
// ==/UserScript==

// functions
function ajaxkick()
{
	var id = this.getAttribute('kickid');
	this.style.display='none';
	var span = document.createElement('span');
	span.innerHTML='...';
	this.parentNode.insertBefore(span, this);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://leprosorium.ru/my/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey mcm69',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: 'run=1&wtf='+kick_wtf+'&kick='+id,
        onload: function(responseDetails){
        	if(responseDetails.status == 200)
        	{
        		removediv(id);
        	}
        	else // смотри балет, сука!!1
        	{
        		span.innerHTML = 'error';
				span.style.color = 'red';
        	}
        }
    });
}

function ajaxfavadd()
{
	var id = this.getAttribute('favid');
	this.style.display='none';
	var span = document.createElement('span');
	span.id = 'fav'+id;
	span.innerHTML='...';
	this.parentNode.insertBefore(span, this);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://leprosorium.ru/my/favourites/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey mcm69',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: 'run=1&wtf='+favadd_wtf+'&add='+id,
        onload: function(responseDetails){
        	if(responseDetails.status == 200)
        	{
        		span.innerHTML = 'added';
        	}
        	else // смотри балет, сука!!1
        	{
        		span.innerHTML = 'error';
				span.style.color = 'red';
        	}
        }
    });
}

function ajaxfavkill()
{
	var id = this.getAttribute('favkillid');
	this.style.display='none';
	var span = document.createElement('span');
	span.innerHTML='...';
	this.parentNode.insertBefore(span, this);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://leprosorium.ru/my/favourites/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey mcm69',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: 'srt=1&run=1&wtf='+favkill_wtf+'&kill='+id,
        onload: function(responseDetails){
        	if(responseDetails.status == 200)
        	{
        		removediv(id);
        	}
        	else // смотри балет, сука!!1
        	{
        		span.innerHTML = 'error';
				span.style.color = 'red';
        	}
        }
    });
}

function ajaxthingadd()
{
	var id = this.getAttribute('addid');
	this.style.display='none';
	var span = document.createElement('span');
	span.innerHTML='...';
	this.parentNode.insertBefore(span, this);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://leprosorium.ru/my/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey mcm69',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: 'run=1&wtf='+intrs_wtf+'&add='+id,
        onload: function(responseDetails){
        	if(responseDetails.status == 200)
        	{
        		span.innerHTML = 'added';
        	}
        	else // смотри балет, сука!!1
        	{
        		span.innerHTML = 'error';
				span.style.color = 'red';
        	}
        }
    });
}

function removediv(id)
{
	var mydiv = document.getElementById('p'+id.toString());
	mydiv.parentNode.removeChild(mydiv);
}

//init wtf


var form = document.forms.namedItem("kick");
var input = form.elements.namedItem("wtf");
kick_wtf = input.value;

var form = document.forms.namedItem("fav");
var input = form.elements.namedItem("wtf");
favadd_wtf = input.value;

var form = document.forms.namedItem("favform");
var input = form.elements.namedItem("wtf");
favkill_wtf = input.value;

var form = document.forms.namedItem("intrs");
var input = form.elements.namedItem("wtf");
intrs_wtf = input.value;


// attach


	var all = document.getElementsByTagName('a')
		for (var i = 0, o; o = all[i]; i++) {
			if(o.href.indexOf('javascript:kick(') != -1) {
				// kick from /my/
				var href=o.href;
				href = href.substr(href.indexOf('\'')+1);
				href = href.substr(0, href.indexOf('\''));
				o.setAttribute('kickid', href);
				o.addEventListener('click', ajaxkick, true);
				o.href='javascript:void(0);'
			}
			else if (o.href.indexOf('javascript:fav(') != -1) {
				// add to /my/fav
				var href=o.href;
				href = href.substr(href.indexOf('\'')+1);
				href = href.substr(0, href.indexOf('\''));
				o.setAttribute('favid', href);
				o.addEventListener('click', ajaxfavadd, true);
				o.href='javascript:void(0);';
			} 
			else if (o.href.indexOf('javascript:favctl(\'kill') != -1) {
				// kick from /my/fav
				var href=o.href;
				href = href.substr(href.indexOf('\'')+9);
				href = href.substr(0, href.indexOf('\''));
				o.setAttribute('favkillid', href);
				o.addEventListener('click', ajaxfavkill, true);
				o.href='javascript:void(0);';
			} 
			else if (o.href.indexOf('javascript:intrs(') != -1) {
				// add to /my/
				var href=o.href;
				href = href.substr(href.indexOf('\'')+1);
				href = href.substr(0, href.indexOf('\''));
				o.setAttribute('addid', href);
				o.addEventListener('click', ajaxthingadd, true);
				o.href='javascript:void(0);';
			} 
		}