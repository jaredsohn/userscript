// ==UserScript==
// @name           fs-saatchi
// @namespace      http://userscripts.org/users/133663
// @include        http://www.formspring.me/*
// ==/UserScript==

var a = /formspring\.me\/([^\/\?]+)/.exec(window.location.href)[1];
if (!/formspring\.me\/.+\/.+/.test(window.location.href)) {
	var b = document.getElementById('main');
	var c = document.createElement('li');
	c.innerHTML = '<a href="'+a+'?q=search">Search</a>';
	if (/\?q=search/.test(window.location.href)) {
		c.innerHTML = '<a href="'+a+'?q=search" class="selected">Search</a>';
	}
	b.appendChild(c);
}
if (/\?q=search/.test(window.location.href)) {
	var b = document.getElementById('questions_answered');
	var c = document.createElement('li');
	var d = document.getElementById('tab_menu');
	c.id = 'questions_answered';
	var e = document.createElement('h1');
	e.innerHTML = '<span>Search Responses</span>';
	c.appendChild(e); delete e;
	var e = document.createElement('form');
	e.autocomplete = 'off';
	var f = document.createElement('textarea');
	f.rows = '1';
	f.cols = '15';
	f.id = 'saatchi_question';
	f.placeholder = 'Search in question';
	e.appendChild(f); delete f;
	var f = document.createElement('span');
	f.innerHTML = '&nbsp;';
	e.appendChild(f); delete f;
	var f = document.createElement('textarea');
	f.rows = '1';
	f.cols = '15';
	f.id = 'saatchi_response';
	f.placeholder = 'Search in response';
	e.appendChild(f); delete f;
	var f = document.createElement('div');
	f.className = 'fright';
	var g = document.createElement('a');
	g.addEventListener('click', saatchi, false);
	g.innerHTML = '<input type="button" value="Search &raquo;" class="button_grey_sm">';
	f.appendChild(g); delete g;
	e.appendChild(f); delete f;
	var f = document.createElement('span');
	f.className = 'loading na';
	f.style = 'display:none;';
	f.id = 'moreIndicator';
	var g = document.createElement('img');
	g.alt = 'Loading...';
	g.src = 'images/indicator.gif';
	f.appendChild(g); delete g;
	e.appendChild(f); delete f;
	c.appendChild(e); delete e;
	var e = document.createElement('div');
	e.id = 'resultsArea';
	c.appendChild(e); delete e;
	b.parentNode.appendChild(c);
	b.parentNode.removeChild(b);
	d.parentNode.removeChild(d);
}

function saatchi () {
	var b = document.getElementById('saatchi_question').value;
	var c = document.getElementById('saatchi_response').value;
	var d = document.getElementById('moreIndicator');
	var e = document.getElementById('resultsArea');
	var f = document.createElement('div');
	f.id = 'resultsArea';
	var g = e.parentNode;
	g.appendChild(f);
	g.removeChild(e);
	d.style = 'display:block';
	safetch(b,c,'0');
}

function safetch (b,c,h) {
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.formspring.me/profile/moreQuestions/'+a+'?ajax=1&start='+h,
		onload: function(response) {
			var i = document.createElement('div');
			i.innerHTML = /"questions":"(.*?)[^\\]"/.exec(response.responseText)[1].replace(/\\[nt]/g,'').replace(/\\\//g,'/').replace(/\\"/g,'"').replace(/\\u(....)/g,'&#x$1;');
			var l = new Array;
			for (var k in i.childNodes) { if (i.childNodes[k].tagName) { l.push(i.childNodes[k]); } }
			var d = new Array;
			var j = /\/q\/(.*?)"/.exec(l[l.length-1].innerHTML)[1];
			if (b&&!c) { d = safilter (b,'question',l); }
			if (c&&!b) { d = safilter (c,'response-text',l); }
			if (b&&c) { d = safilter (b,'question',safilter (c,'response-text',l)); }
			if (!b&&!c) { d = l; }
			var e = document.getElementById('resultsArea');
			for (f in d) { e.appendChild(d[f]); }
			if (h!=j) { safetch (b,c,j); }
			else {
				var g = document.getElementById('moreIndicator');
				g.style = 'display:none;';
			}
		}
	});
}

function safilter (b,c,d) {
	var e = new Array;
	var g = new RegExp('<(p|h2) rel="'+c+'.*?'+b+'.*?(p|h2)>', 'i');
	for (var f in d) {
			if (g.test(d[f].innerHTML)) { e.push(d[f]); }
	}
	return e;
}