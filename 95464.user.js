// ==UserScript==
// @name           CPAN Syntax Highlight
// @namespace      http://blog.gslin.org/plugins/cpan-syntaxhighlight
// @include        http://search.cpan.org/dist/*
// @include        http://search.cpan.org/~*/*
// @version        2011.0320.1
// ==/UserScript==

(function(d){
    var stripHTML = function(data) {
	var t = d.createElement('div');
	t.innerHTML = data;
	return t.innerText || t.textContent;
    }

    var pods = d.getElementsByClassName('pod');
    if (0 == pods.length)
	return;
    var pod = pods[0];

    var pres = pod.getElementsByTagName('pre');
    var presLength = pres.length;
    if (0 == presLength)
	return;

    for (var i = 0; i < presLength; i++) {
	var pre = pres[i];
	pre.innerHTML = stripHTML(pre.innerHTML);
	pre.setAttribute('class', 'brush: perl');
    }

    var h = d.getElementsByTagName('head')[0];

    var c = d.createElement('link');
    c.rel = 'stylesheet';
    c.type = 'text/css';
    c.href = 'http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/styles/shCore.css';
    h.appendChild(c);

    c = d.createElement('link');
    c.rel = 'stylesheet';
    c.type = 'text/css';
    c.href = 'http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/styles/shThemeRDark.css';
    h.appendChild(c);

    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shCore.js';
    h.appendChild(s);

    s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushPerl.js';
    h.appendChild(s);

    s = d.createElement('script');
    s.type = 'text/javascript';
    s.textContent = '(SyntaxHighlighter.all())();';
    h.appendChild(s);
})(document);
