// ==UserScript==
// @name           Fix online-literature reading experience
// @namespace      henrik
// @include        http://www.online-literature.com
// ==/UserScript==

var cookieO = { path: window.location.pathname, expires:999 };

function loaded() {
	
	addCss(
	".breadcrumb		{ margin-top:20px; } " +
	".side-links a:visited			{ color:#AF9983; } " +
	".next, .prev		{ font-weight: bold; } .current { font-size: 130%; }" +
	"#chaptext 			{ line-height: 1.9em; position: relative; border: 1px solid #EFEFEF; padding: 25px 20px 20px 20px; } " +
	"#chaptext.dark 	{ background-color: #1F1F1F; color: #AF999E }" +
	"#chaptext h3		{ margin-top: 20px; color: #333 } " +
	"#chaptext.dark h3	{ color: #DFC3C9 } " +
	"#content-container.dark { background-color: #9F9F9F; } " +
	"#resize, #mini-nav { position: absolute; } " +
	"#resize 			{ top: 2px; width: 200px; right: 3px; } " +
	"#resize div	 	{ vertical-align: center; text-align: center; width: 25px; height: 25px; background-color: #824229; color: #EFEFEF; border:1px solid #000; cursor:pointer; float:right; margin-left:3px} " +
	"#mini-nav 			{ bottom: -15px; width: 70px; right: 100px; } " +
	"#mini-nav a 		{ background-color: #824229; border: 1px solid black; padding: 3px 5px; margin: 0 0 0 3px; color: #EFEFEF; }");

	if ($("#chaptext").size() == 0) return;
	
	// set line-height and add DOM
	var t = $("#chaptext")
		.prepend("<div id='resize'> "+
		"<div id='l' title='Toggle day/night-mode'>*</div>"+ 
		"<div id='plus' title='Increase reading-width'>+</div> "+
		"<div id='minus' title='Decrease reading-width'>-</div> "+
		"<div id='x' title='Toggle width:auto/prev'>x</div> "+
		"</div>")
		.append("<div id='mini-nav'><a href='#' id='to-top'>Top</a><a href='#' title='Previous chapter' class='prev'>Previous</a><a href='#unknown_dynamic' title='Next chapter' class='next'>Next</a></div>");
	
	// load prefs
	t.width( parseFloat( $.cookie('width') || t.width()) );
	if ( $.cookie('dark') == 'true' ) { dark(t); }
	var scrollY = $.cookie('window-scroll');
	$(window).scrollTo(scrollY || 0, ((scrollY || 0) > 500 ? 2000 : 500));
	
	// fix paragraphs and headings
	var h = t.html();
	replace(/<br><br>/i, '</p><p>', h, function(n) h = n);
	t.html(h);
	replace(/<br>/i, ' ', h, function(n) h = n);
	t.html(h)
		.contents().filter(function() {
			if (this.nodeType != 3) return false;
			var t = this.textContent;
			replace(/\s/, '', t, function(newT) t = newT);
			return (!!t) && t.length < 100;
		})
		.wrap("<h3 />");
	// replace centered headings
	$("p[align='center']", t).each(function() { $(this).replaceWith('<h3>' + $(this).text() + "</h3>"); });
	
	// add dynamics
	$("#resize div").click(function() {
		var w = t.width();
		switch (this.id) {
			case 'x':
				var prev = t.css("width");
				if (prev != 'auto') {
					t.get(0)['prevWidth'] = prev;
					t.css("width", "auto");
					$(this).text("!");
				} else {
					t.css("width", t.get(0)['prevWidth']);
					$(this).text("x");
				}
				w = t.width();
				break;
			case 'plus':
				t.width(w += 20);
				break;
			case 'minus':
				t.width(w -= 20);
				break;
			case 'l':
				dark(t);
				break;
		}
		$.cookie('width', w, {  }); 
	});
	var current = $(".side-links li ul li")
		.filter(function() window.location.href.indexOf($("> a", this).get(0).href) != -1)
		.addClass("current");
	var n = current.next().addClass("next");
	var p = current.prev().addClass("prev");
	$("a.next").attr("href", n.find("a").get(0).href);
	$("a.prev").attr("href", p.find("a").get(0).href);
	
	// remember last scroll position
	$(window).scroll(function(evtObj) {
		$.cookie('window-scroll', window.scrollY, cookieO);
	});
	
	$("#to-top").click(function() { $(window).scrollTo($("h3:first"), 800); return false; });
};

function replace(regex, repl, curr, cb) {
	var tmp = curr.replace(regex, repl);
	if (tmp == curr) return tmp;
	cb(tmp); replace(regex, repl, tmp, cb);
};

function dark(t) {
	t.toggleClass("dark"); 
	t.parents("#content-container").toggleClass("dark");
	$.cookie( "dark", t.hasClass("dark"), cookieO );
}

function addCss(cssCode) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssCode;
	} else {
		styleElement.appendChild(document.createTextNode(cssCode));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
}


(function s() {
	if (typeof console == 'undefined') {
		console = {
			log:function() {
				var msg = "";
				for ( var i = 0; i < arguments.length; i++) {
					msg += arguments[i] + "\n";
				}
				alert(msg);
			}
		};
	}
	
	function loadScrollPlugin() {
		/**
		 * jQuery.ScrollTo - Easy element scrolling using jQuery.
		 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
		 * Dual licensed under MIT and GPL.
		 * Date: 5/25/2009
		 * @author Ariel Flesler
		 * @version 1.4.2
		 *
		 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
		 */
		(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(unsafeWindow.jQuery);
	}
	
	function loadCookiePlugin() {
		/**
		 * Create a cookie with the given name and value and other optional parameters.
		 *
		 * @example $.cookie('the_cookie', 'the_value');
		 * @desc Set the value of a cookie.
		 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
		 * @desc Create a cookie with all available options.
		 * @example $.cookie('the_cookie', 'the_value');
		 * @desc Create a session cookie.
		 * @example $.cookie('the_cookie', null);
		 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
		 *       used when the cookie was set.
		 *
		 * @param String name The name of the cookie.
		 * @param String value The value of the cookie.
		 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
		 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
		 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
		 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
		 *                             when the the browser exits.
		 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
		 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
		 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
		 *                        require a secure protocol (like HTTPS).
		 * @type undefined
		 *
		 * @name $.cookie
		 * @cat Plugins/Cookie
		 * @author Klaus Hartl/klaus.hartl@stilbuero.de
		 */
		/**
		 * Get the value of a cookie with the given name.
		 *
		 * @example $.cookie('the_cookie');
		 * @desc Get the value of a cookie.
		 *
		 * @param String name The name of the cookie.
		 * @return The value of the cookie.
		 * @type String
		 *
		 * @name $.cookie
		 * @cat Plugins/Cookie
		 * @author Klaus Hartl/klaus.hartl@stilbuero.de
		 */
		$.cookie = function(name, value, options) {
			if (typeof value != 'undefined') { // name and value given, set cookie
				options = options || {};
				if (value === null) {
					value = '';
					options.expires = -1;
				}
				var expires = '';
				if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if (typeof options.expires == 'number') {
						date = new Date();
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					} else {
						date = options.expires;
					}
					expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
				}
				// CAUTION: Needed to parenthesize options.path and options.domain
				// in the following expressions, otherwise they evaluate to undefined
				// in the packed version for some reason...
				var path = options.path ? '; path=' + (options.path) : '';
				var domain = options.domain ? '; domain=' + (options.domain) : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
			} else { // only name given, get cookie
				var cookieValue = null;
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = jQuery.trim(cookies[i]);
						// Does this cookie string begin with the name we want?
						if (cookie.substring(0, name.length + 1) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}
		};
	}
	
	function addJs(src) {
		var GM_JQ = document.createElement('script');
		GM_JQ.src = src.replace('.txt', '');
		GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	};

	function waitFor(fTest, cb) {
		if (!fTest()) { window.setTimeout(function() { waitFor(fTest, cb); }, 100); }
		else { cb(); }
	}

	if (typeof unsafeWindow.jQuery == 'undefined') {
		$(['http://jquery.com/src/jquery-latest.js'])
		   .each(function() addJs(this));
	}

	waitFor(function(){ return typeof unsafeWindow.jQuery != 'undefined';},
		function() { $ = window.jQuery = unsafeWindow.jQuery; loadScrollPlugin(); loadCookiePlugin(); loaded(); });
})();