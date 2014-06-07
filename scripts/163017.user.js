// ==UserScript==
// @name           ameblo-js-killer
// @namespace      http://userscripts.org/scripts/show/163017
// @include        http://ameblo.jp/*
// @include        http://*.ameblo.jp/*
// @description    ameblo-js-killer
// @version        0.0.0.1
// ==/UserScript==

//2013/3/25 とりあえず作って公開

( function() {
    var $x = function(xp, dc) {function c(f) {var g = ''; if (typeof f === 'string') {g = f;} var h = function(a) {var b = document.implementation.createHTMLDocument(''); var c = b.createRange(); c.selectNodeContents(b.documentElement); c.deleteContents(); b.documentElement.appendChild(c.createContextualFragment(a)); return b;}; if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd'); var c = document.implementation.createDocument(null, 'html', b); var d = document.createRange(); d.selectNodeContents(document.documentElement); var e = c.adoptNode(d.createContextualFragment(a)); c.documentElement.appendChild(e); return c;};} return h(g);} var m = [], r = null, n = null; var o = dc || document.documentElement; var p = o.ownerDocument; if (typeof dc === 'object' && typeof dc.nodeType === 'number') {if (dc.nodeType === 1 && dc.nodeName.toUpperCase() === 'HTML') {o = c(dc.innerHTML); p = o;} else if (dc.nodeType === 9) {o = dc.documentElement; p = dc;}} else if (typeof dc === 'string') {o = c(dc); p = o;} try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));} catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null); while (n = q.iterateNext()) m.push(n);} catch (e) {throw new Error(e.message);}} return m;};
    var $s = function(xp, dc) {return $x(xp, dc).shift();};
if (location.hostname.match(/.*ameblo.jp/) && location.pathname.match(/.+\/image-\d+-\d+/)){ nn();}
function nn(){
	var o = $s('id("originalImgUrl")');
	if(o && o.innerHTML && o.innerHTML.length){ is(o.innerHTML); return;}
	var sc = document.body.innerHTML;
	o = sc.match(/"current":.+"imgUrl":"(.+?)"/);
	if(RegExp.$1 ){ is("http://stat001.ameba.jp" + RegExp.$1); return;}
}
function is(o){	var m = $s('id("container")');	m.innerHTML='<img src="'+o+'" />';}
}) ();
