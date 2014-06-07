//
//    Meta and Link Tags / Doctype / Referrer Presenter
//
//    Shows the content of meta and link tags from the header, doctype info, 
//    and referrer info at the bottom of the browser window.
//    For geeks and paranoids (like me), who like to know what web site autors 
//    wrote in unrendered parts of their web pages, which specification of HTML 
//    the author used, and what referrer info your browser is sending to the host.
//    Also yet another alternative for people who miss the Site Navigation Bar 
//    found in early Mozillas.  Enjoy!
//
//
// ==UserScript==
// @name          Meta and Link Tags / Doctype / Referrer Presenter
// @description   Presents meta and link tag contents, doctype info, and referrer info at the bottom of every page.
// @include       *
// @exclude       *.jsp*
// ==/UserScript==


(function() {

//////////  Begin Customizations  ////////
var fontname = "'Lucida Sans Unicode' 'Lucida Grande' sans-serif";    // text font name
var fontsize = 11;        // text font size, in pixels
var tcolor =   '#aaa';    // title text color
var color =    '#ffd';    // content text color
var bkgnd =    '#066';    // text background color
var opacity =  0.85;      // background opacity
var pad =      1;         // amount of padding space, in pixels
var bottom =   true; // place info at the bottom of every page? (setting to false places them at the top)
//////////  End Customizations  ////////


// Main Function Call //
showMeta(document);


// The Guts //
function showMeta(d) {
	var name = 'This DIV Inserted by [Meta and Link Tags / Doctype / Referrer Presenter] User Script';
	if ((d.contentType && d.contentType != 'text/html' && d.contentType != 'text/xhtml') || d.getElementsByTagName('body').length == 0 || !d.body || !d.body.hasChildNodes()) {
		// don't run in pages w/o BODY tags.  Exit.
		return;
	} else if (!isMainWindowOrFrame(window)) {
		// don't run in small FRAMEs.  Exit.
		return;
	} else if ((bottom ? d.body.lastChild : d.body.firstChild).name == name) {
		// we've run on this page already.  Shouldn't run multiple times.  Exit.
		return;
	}
	
	var e = d.body.appendChild(d.createElement('div'));
	e.setAttribute('name', name);
	var f = e.cloneNode(false);
	e.setAttribute('style', 'margin:0; padding:' + (pad * 2) + 'px; position:fixed; ' + (bottom ? 'bottom' : 'top') + ':0; left:0; right:0; background-color:' + bkgnd + '; color:' + tcolor + '; font:' + fontsize + 'px/' + (fontsize + pad) + 'px ' + fontname + '; text-align:left; z-index:255; opacity:' + opacity + ';');
	e.innerHTML = getMetaData(d);
	
	f.setAttribute('style', 'height:' + e.clientHeight + 'px');
	if (bottom) {
		d.body.appendChild(f);
	} else {
		d.body.insertBefore(f, d.body.firstChild);
	}
}

function getMetaData(d) {
	var ret = new Array();
	pushInfo2(ret, d, 'doctype', ['systemId', 'publicId']);
	pushInfo1(ret, d, 'referrer');
	pushInfo1(ret, d, 'lastModified');
	pushInfo3(ret, d, 'meta', 'name', function(e) {
		return e.name + '="' + makeSpan(e.value ? e.value : e.content) + '"';
	});
	pushInfo3(ret, d, 'link', 'href', function(e) {
		var s = (e.rel ? e.rel : (e.rev ? e.rev : ''));
		return makeLink(e, e.title ? ((s.length > 0 && e.title != s) ? (s + '(' + e.title + ')') : e.title) : s);
	});
	
	return '[' + ret.join(']<br />[')+ ']';
}

function pushInfo1(ret, d, info) {
	if (d[info]) {
		ret.push(info + ': ' + makeSpan(d[info]));
	}
}

function pushInfo2(ret, d, info, data) {
	if (d = d[info]) {
		for (var msg = new Array(), n; n = data.pop(); ) {
			if (d[n]) {
				msg.push(makeSpan(d[n]));
			}
		}
		ret.push(msg.length > 0 ? ('"' + msg.join('" "') + '"') : ('no ' + info));
	} else {
		ret.push('no ' + info);
	}
}

function pushInfo3(ret, d, info, cond, f) {
	for (var a = d.getElementsByTagName(info), msg = new Array(), i = 0; a[i]; ++i) {
		if (a[i][cond]) {
			msg.push(f(a[i]));
		}
	}
	if (msg.length > 0) {
		ret.push(info + ': ' + msg.join(', '));
	}
}

function makeSpan(m) {
	return '<span style="background-color:transparent; color:' + color + '; font:inherit; border:none;">' + m + '</span>';
}

function makeLink(e, s) {
	return '<a style="background-color:transparent; color:' + color + '; font:inherit; border:none; text-decoration:underline;" href="' + e.href + '">' + (s.length > 0 ? s : 'link') + '</a>';
}

function isMainWindowOrFrame(w) {
	return w.innerHeight / w.parent.innerHeight >= 0.5 && w.innerWidth / w.parent.innerWidth >= 0.5
}
})();