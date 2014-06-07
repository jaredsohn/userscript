// ==UserScript==
// @name           WebCamsOnAir.com - Real Time Interface
// @namespace      test
// @include        http://www.webcamsonair.com/index.php?page=results&site=stickam&sort=mostviewers&gender=female&perpage=6&pageQ=3
// ==/UserScript==


var X = unsafeWindow.console.info;

function $(xp, ctx) {
	return document.evaluate(xp, ctx || document, null, XPathResult.ANY_TYPE, null); 
}
function $1(xp, ctx) {
	return $(xp, ctx).iterateNext();
}
function $id(id) {
	return document.getElementById(id);
}
function rmv() {
	for (var i=0; i<arguments.length; i++) {
		var a = arguments[i];
		if (typeof a == 'string')
			a = (a.charAt(0) == '#' ? $id(a.substr(1)) : $(a));
		if ((a+'').indexOf('XPathResult') != -1) {
			var ns = [];
			for (var n; n = a.iterateNext(); ns.push(n));
			for (var j=0; j<ns.length; j++)
				ns[j].parentNode.removeChild(ns[j]);
		} else if (a)
			a.parentNode.removeChild(a);
	}
}
unsafeWindow.$ = $;
unsafeWindow.$1 = $1;


// CSS
GM_addStyle(
	'body { background:#fff; }' +
	'#wrap { margin:0; width:auto; }' +
	'#maincontent { margin:0; padding:0; background:#fff; }' +
	'#left { float:none; margin:0; padding:0; width:auto; }' +
	'.fp6 { margin:0; }' +
'');
X('1');

// interface
rmv('#header_top', '#header_bottom', '#footer', '#right', '//DIV[@id="left"]/DIV[1]');
X('2');
setInterval(function(){
	var sep = $1('//DIV[@class="autoPagerS"][contains(.,"Page break by AutoPager")]');
	if (sep) { // means new page has been loaded
		var p, n;
		for (p = sep; (p = p.previousSibling) && p.nodeName != 'DIV'; );
		for (n = sep; (n = n.nextSibling) && n.nodeName != 'DIV'; );
		rmv($1('DIV[last()]', p), $1('DIV[1]', n), sep);
	}
}, 1500);
X('3');





