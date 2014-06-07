//
//    Anatomize Page User Script
//
//    Shows the content of 'meta', 'link', and 'script' tags from the header (linkified 
//    wherever possible), together with doctype info, referrer info, and access key
//    info in a semi-transparent layer at the bottom of the browser window.
//    You may collapse the whole info layer when it gets in your way.
//    For geeks and paranoids (like me), who like to know what web site autors 
//    wrote in unrendered parts of their web pages, which specification of HTML 
//    the author used, and what referrer info your browser is sending to the host.
//    Also yet another alternative for people who miss the Site Navigation Bar 
//    found in early Mozillas.  Enjoy!
//
//
// ==UserScript==
// @name          Anatomize Page
// @description   Presents a semi-transparent layer at the bottom of web pages containing invisible (normally unrendered) anatomy information; namely 'meta', 'link', and 'script' tag contents (linkified wherever possible), together with doctype info, referrer info, and access key info.  Comes with a close box to collapse the info layer when it gets in your way.  Highly configureable source code.
// @include       *
// ==/UserScript==

(function() {


//////////  Begin Customizations  ////////
//////////  Edit values only; don't rename keys and don't delete lines  ////////

var fontname =      "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";  // text font name
var closefont =     "monospace";  // close box text font;                     for Macs, try "Webdings"
var collapseChar =  '&minus;';    // close box character when info displayed; for Macs, try '0'
var displayChar =   'i';          // close box character when info collapsed; for Macs, try '1'
var fontsize =      '11px';       // text font size with units
var tcolor =        '#aaa';       // title text color
var color =         '#ffd';       // content text color
var bkgnd =         '#066';       // text background color
var opacity =       0.85;         // background opacity
var pad =           1;            // amount of padding space, in pixels
var disp =          true;         // true: load page with info displayed; false: load page with info collapsed
var bottom =        true;         // place info at the bottom of every page? (setting to false places them at the top)
var showReferrer =  true;         // display referrer info
var showLastMod =   true;         // display last modified date info
var showMeta =      true;         // display meta tag info
var showLink =      true;         // display link tag info
var showScript =    true;         // display script tag info
var showAccessKey = true;         // display accessKey property info
var eventName =     'mouseover';  // name of event used to toggle info display; change to 'click' if you prefer clicking on the close box rather than just hovering over it

//////////  End Customizations  ////////


// Main Function Call //
anatomizePage();


// The Guts //
function anatomizePage(w) {
	var id = 'This_DIV_Inserted_by__Anatomize_Page__User_Script', 
	    d = (w = (w || window)).document;
	if ((d.contentType && d.contentType.toLowerCase().indexOf('html') < 0) || d.getElementsByTagName('body').length == 0 || !d.body || !d.body.hasChildNodes()) {
		// don't run in pages w/o BODY tags.  Exit.
		return;
	} else if (d.getElementById(id)) {
		// we've run on this page already.  Shouldn't run multiple times.  Exit.
		return;
	}
	
	var e = d.body.appendChild(d.createElement('div')), 
	    f = e.appendChild(e.cloneNode(false)), 
	    g = e.appendChild(e.cloneNode(false)),
	    h = (bottom ? d.body.appendChild(e.cloneNode(false)) : d.body.insertBefore(e.cloneNode(false), d.body.firstChild));
	g.innerHTML = getMetaData(d);
	
	e.setAttribute('id', id);
	e.setAttribute('style', makeStyle('position:fixed; ' + (bottom ? 'bottom' : 'top') + ':0; left:0; right:0; text-align:left; z-index:255; opacity:' + opacity + ';', color, bkgnd, fontsize + '/115% ' + fontname, pad * 2 + 'px'));
	f.setAttribute('style', makeStyle('float:right; text-align:center; cursor:pointer; width:1em;', bkgnd, color, fontsize + '/115% ' + closefont));
	g.setAttribute('style', makeStyle('', tcolor));
	h.setAttribute('style', 'visibility:hidden; height:' + e.clientHeight + 'px; padding:0; margin:0;');
	f.addEventListener(eventName, function() { toggleView(this, h); }, false);
	
	g.style.display = disp && isMainWindowOrFrame(w) ? 'none' : 'block';
	var evt = d.createEvent('MouseEvents');
	evt.initEvent(eventName, false, false);
	f.dispatchEvent(evt);
}

function toggleView(f, h) {
	with (f) {
		var wasAtBottom = (self.innerHeight < ownerDocument.documentElement.offsetHeight && self.innerHeight + self.pageYOffset == ownerDocument.documentElement.offsetHeight), 
		    dat = [
		    	['block', null,               '0',  collapseChar], 
		    	['none',  clientWidth + 'px', null, displayChar ]
		    ][nextSibling.style.display == 'none' ? 0 : 1];
		parentNode.style.width =    dat[1];
		parentNode.style.left =     dat[2];
		innerHTML =                 dat[3];
		nextSibling.style.display = dat[0];
		h.style.display =           dat[0];
		if (wasAtBottom) {
			self.scrollTo(self.pageXOffset, ownerDocument.documentElement.offsetHeight - self.innerHeight);
		}
	}
}

function makeStyle(sp, c, bc, f, p, m, o) {
	return [
		'color:' +            (c  || 'inherit'), 
		'background-color:' + (bc || 'transparent'), 
		'font:' +             (f  || 'inherit'), 
		'padding:' +          (p  || '0'), 
		'margin:' +           (m  || '0'), 
		'outline:' +          (o  || 'none'), 
		'border:none', 'display:inline', (sp || '')
	].join('; ');
}

function makeTag(tag, content, sp, c, bc, f, p, m, o) {
	return '<' + tag + ' style="' + makeStyle(sp, c, bc, f, p, m, o) + '">' + content.replace(/(&(?!amp;))|(<)|(>)/g, function(str, p1, p2, p3, offset, s) {
		return p1 ? '&amp;' : (p2 ? '&lt;' : '&gt;');
	}) + '</' + tag + '>';
}

function makeSpan(m) {
	return makeTag('span', m, '', color);
}

function makeKbd(m) {
	return makeTag('kbd', m, 'text-transform:uppercase;', color, null, 'bold ' + fontsize + '/115% monospace', '0 1px 0 2px', '0 1px', '1px outset ' + tcolor);
}

function makeLink(e, s) {
	return makeTag('a', s.length > 0 ? s : 'link', 'text-decoration:underline;" href="' + e, color);
}

function getMetaData(d) {
	with (Array) {
		prototype.d = d;
		prototype.pushIf = conditionalPush;
		prototype.push1 = pushInfo1;
		prototype.push2 = pushInfo2;
		prototype.push3 = pushInfo3;
	}
	
	return '[' + new Array().
		push2(true,          'doctype', ['systemId', 'publicId']).
		push1(showReferrer,  'referrer').
		push1(showLastMod,   'lastModified').
		push3(showMeta,      'meta', 'name', function(e) {
			return e.name + '="' + makeSpan(e.value || e.content) + '"';
		}).
		push3(showLink,      'link', 'href', function(e) {
			var s = (e.rel || e.rev || '');
			return makeLink(e.href, e.title ? ((s.length > 0 && e.title != s) ? (s + '(' + e.title + ')') : e.title) : s);
		}).
		push3(showScript,    'script', 'src', function(e) {
			return makeLink(e.src, e.title || e.src.substr(e.src.lastIndexOf('/') + 1));
		}).
		push3(showAccessKey, 'a, area, button, input, label, legend, textarea', 'accessKey', function(e) {
			return (e.title || e.name || e.textContent || (e.firstChild ? e.firstChild.nodeValue : e.nodeName.toLowerCase())) + '..' + makeKbd(e.accessKey);
		}).
		join(']<br />[') + 
	']';
}

function pushInfo1(show, info) {
	return this.pushIf(show && this.d[info], function(d) {
		return info + ': ' + makeSpan(d);
	});
}

function pushInfo2(show, info, data) {
	if (!show) {
		return this;
	}
	var d = this.d[info];
	if (d) {
		for (var msg = new Array(), n; n = data.pop(); ) {
			msg.pushIf(d[n], function(d) {
				return makeSpan(d);
			});
		}
		this.push(msg.length > 0 ? ('"' + msg.join('" "') + '"') : ('no ' + info));
	} else {
		this.push('no ' + info);
	}
	return this;
}

function pushInfo3(show, tags, cond, f) {
	if (!show) {
		return this;
	}
	tags = tags.split(/,\s*/);
	for (var msg = new Array(), i = 0, tag; tag = tags[i]; ++i) {
		for (var a = this.d.getElementsByTagName(tag), j = 0, n; n = a[j]; ++j) {
			msg.pushIf(n[cond], f, n);
		}
	}
	return this.pushIf(msg.length > 0, function() {
		return (tags.length > 1 ? cond : tags) + ': ' + msg.join(', ');
	});
}

function conditionalPush(condition, f, data) {
	if (condition) {
		// separate content of Array#push() into function 'f()' and parameter 'data' in order to lazily evaluate 'f(data)' at this point, since f() could be quite expensive.
		this.push(f(data || condition));
	}
	return this;
}

function isMainWindowOrFrame(w) {
	return w.innerHeight / top.innerHeight >= 0.5 && w.innerWidth / top.innerWidth >= 0.5;
}
})();