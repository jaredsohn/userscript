// ==UserScript==
// @name           Location Flags
// @namespace      http://www.frimble.net/userscripts
// @description    Annotate MetaFilter posts with clickable flag that displays users' location.
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// @version        0.2
// ==/UserScript==

var debug = 0;

var i;

var flag_image_gold = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA9AAAAPQBFLZpEgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACtSURBVCiRtc8xSgNhGITh59t/sVAwhZWNaBtIimyRw1gLVp7PI5hIEkgVLOIVJIWCiftZCWsQsYhTzszLMJGZFovoo1eK5XDodTp1WVUGGES4irDOdN80Oa8h0x2ut1sns5m3UhzrKJMIF7itOuYRgu/lfVW/hf8OvGONOXZfZt0pPEW4yXSGVdN4JluYTOK0FOf7wMdolA8/TY3HucHm4B8OA9TQth4jvPwF+ARKUDIb8DLUjQAAAABJRU5ErkJggg==";
var flag_image_blue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA9AAAAPQBFLZpEgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADBSURBVCiRrY+xasIAFEXPi+mQKt27FF0LWSoUv6J/4Gati36MTpFO+hP9BKUiWOjQDvkGicQUTbxOARsC7ZAz3ncPl2eSeBgE9zVT4xDXPz/m3f1j77V5MvmYfMlaMoUGb6ugv3YBTDaS7OXKS9TuT5MMrskxYYDgDhg4/Ma4LJdQFP6kUuEAhMAaSPPQvSh81WRPmWl3TLxoM+vG+aEzmtxkqXtbFH6W0+fvsqnFeBgBUeU/VCO4AI7pXSdn+x/hDLozQYQmgo6VAAAAAElFTkSuQmCC";

function annotate_f( user, span ){
    return (function (node, url, dom, xhr) {
	if( debug > 0 ){
	    console.log( url );
	    console.log( 'Node: ' + node +
			 '  DOM: ' + dom +
			 '  Span: ' + span );
	}
	if( dom ){
	    var location = dom.innerHTML.match( /Location:\s*(.*?)<br>/ );
	    var location_string = '&nbsp;'
	    if( location && location.length >= 1 ){
		location_string += location[1];
	    } else {
		location_string += 'No location given';
	    }
	    span.innerHTML = location_string;

	    var links = document.evaluate( "//span", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	    if( debug > 0 ){
		console.log( 'Span count:' + links.snapshotLength );
	    }
	    for( var j = 0; j < links.snapshotLength; j++ ){
		var link = links.snapshotItem( j );
		if( link.class == span.class ){
		    if( debug > 0 ){
			console.log( link.class );
		    }
		    link.innerHTML = location_string;
		}
	    }
	}
    });
}

function flag_clicked_for( user, span ){
    return (function () {
	if( debug > 0 ){
	    console.log( 'Click!' );
	}
	flag.style.cursor = 'wait';
	span.style.cursor = 'wait';

	wget$X( 'http://www.metafilter.com/user/' + user,
		annotate_f( user, span ),
		'//div[@class="usertext"]',
		false,
		true ); 

	span.style.cursor = 'auto';
    });
}

function get_style( el, styleProp) {
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle( el, null )[ styleProp ];
}

// Get a list of all "user links"
var user_links = document.evaluate("//span[contains(@class,'smallcopy')]/a[starts-with(@href,'http://www.metafilter.com/user/')]|//span[contains(@class,'smallcopy')]/a[starts-with(@href,'/user/')]|//div[contains(@class,'smallcopy')]/a[starts-with(@href,'http://www.metafilter.com/user/')]|//div[contains(@class,'smallcopy')]/a[starts-with(@href,'/user/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var uid_re = /[0-9]+/

var background_color = get_style( document.body, 'backgroundColor' );
var flag_image = flag_image_gold;
if( background_color.match( /255,\s*255,\s*255|[fF]{6}/i ) ){
    console.log( 'Profesional white' );
    flag_image = flag_image_blue;
}

for (i = 0; i < user_links.snapshotLength; i++) {
    var user_link = user_links.snapshotItem(i);
    var user_id = parseInt( user_link.href.match( uid_re ) );

    var parent = user_link.parentNode;
    var sister = user_link.nextSibling;

    if( sister.class == 'location' )
	return;
    
    var location_span = document.createElement( 'span' );
    location_span.class = 'location ' + user_id;
    location_span.innerHTML = '&nbsp;';
    
    var flag = document.createElement( 'img' );
    flag.src = flag_image;
    flag.style.cursor = 'pointer';
    flag.onclick = flag_clicked_for( user_id, location_span );
    
    location_span.appendChild( flag );
    
    if( sister ){
	parent.insertBefore( location_span, sister );
    } else {
	parent.appendChild( location_span );
    }
}

// Included directly in the file because I got fucked off with trying
// to load an external JS in Chrome.

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
	result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}


// Fetches url, $x slices it up, and then invokes cb(nodes, url, dom, xhr).
// If runGM is set to true and the url is on the same domain as location.href,
// the loaded document will first be processed by all GM scripts that apply. If
// div is set to true and runGM is not, the DOMization will be via a div instead
// of a frame (which munges the html, head and body tags), but saves resources.
// Note when using div: use xpath expressions starting in "./", not "/", as the
// root node is not connected. Also, the document passed to cb will be the div.
function wget$x( url, cb/*( [DOMNodes], url, dom, xhr )*/, xpath, runGM, div ) {
  wget(url, function(xml, url, xhr) {
    cb( $x( xpath, xml ), url, xml, xhr );
  }, runGM, div);
}

// Fetches url, $X slices it up, and then invokes cb(node, url, dom, xhr).
// If runGM is set to true and the url is on the same domain as location.href,
// the loaded document will first be processed by all GM scripts that apply.  If
// div is set to true and runGM is not, the DOMization will be via a div instead
// of a frame (which munges the html, head and body tags), but saves resources.
// Note when using div: use xpath expressions starting in "./", not "/", as the
// root node is not connected. Also, the document passed to cb will be the div.
function wget$X( url, cb/*( DOMNode, url, dom, xhr )*/, xpath, runGM, div ) {
  wget(url, function(xml, url, xhr) {
    cb( $X( xpath, xml ), url, xml, xhr );
  }, runGM, div);
}

// Fetches url, turns it into an HTML DOM, and then invokes cb(dom, url, xhr).
// If runGM is set to true and the url is on the same domain as location.href,
// the loaded document will first be processed by all GM scripts that apply.  If
// div is set to true and runGM is not, the DOMization will be via a div instead
// of a frame (which munges the html, head and body tags), but saves resources.
function wget( url, cb/*( dom, url, xhr )*/, runGM, div ) {
  //console.log("Loading %x", url);
  if (html2dom[url]) // cache hit?
    return html2dom(null, cb, url, null, runGM);
  var xhr = { method:'GET', url:url, onload:function( xhr ) {
    if (xhr.responseXML)
      cb( xhr.responseXML, url, xhr );
    else
      html2dom( xhr.responseText, cb, url, xhr, runGM, div );
  }};
  if (wget.xhr)
    wget.xhr(xhr);
  else
    GM_xmlhttpRequest(xhr);
}

function mayCommunicate(url1, url2) {
  function beforePath(url) {
    url = url.match(/^[^:]+:\/*[^\/]+/);
    return url && url[0].toLowerCase();
  }
  return beforePath(url1) == beforePath(url2);
}

// Well-behaved browers (Opera, maybe WebKit) could use this simple function:
// function html2dom( html, cb/*( xml, url, xhr )*/, url, xhr ) {
//   cb( (new DOMParser).parseFromString(html, "text/html"), url, xhr );
// }

// Firefox doesn't implement (new DOMParser).parseFromString(html, "text/html")
// (https://bugzilla.mozilla.org/show_bug.cgi?id=102699), so we need this hack:
function html2dom( html, cb/*( xml, url, xhr )*/, url, xhr, runGM, div ) {
  function loaded() {
    doc = cached.doc = iframe.contentDocument;
    iframe.removeEventListener("load", loaded, false);
    doc.removeEventListener("DOMContentLoaded", loaded, false);
    var callbacks = cached.onload;
    delete cached.onload;
    //console.log("DOMContentLoaded of %x: cb %x", url, callbacks);
    setTimeout(function() { // avoid racing with GM's DOMContentLoaded callback
      //console.log("Running %x callbacks", url);
      callbacks.forEach(function(cb,i) { cb( doc, url, xhr ); });
    }, 10);
  };
  function wipeJavascript(html) {
    return html.replace(/[\n\r]+/g, " "). // needed not freeze up(?!)
      replace(/<script.*?<\/script>/ig, ""). // no code execution on injection!
      replace(/<body(\s+[^="']*=("[^"]*"|'[^']*'|[^'"\s]\S*))*\s*onload=("[^"]*"|'[^']*'|[^"']\S*)/ig, "<body$1");
  };

  if (div && !runGM) {
    var parent = document.createElement("div");
    parent.innerHTML = wipeJavascript(html);
    return setTimeout(cb, 10, parent, url); // hopefully render it first
  }

  var cached = html2dom[url]; // cache of all already loaded and rendered DOM:s
  if (cached)
    if (cached.onload)
      return cached.onload.push(cb);
    else
      return cb(cached.doc, url, cached.xhr);

  var iframe = document.createElement("iframe");
  iframe.style.height = iframe.style.left = "0";
  iframe.style.width = (innerWidth - 32)+"px";
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  document.body.appendChild(iframe);

  iframe.addEventListener("load", loaded, false);
  html2dom[url] = cached = { onload:[cb], xhr:xhr };
  if (runGM && mayCommunicate(url, location.href))
    return iframe.src = url; // load through GM (should be cached due to xhr)

  //console.log("May not communicate / GM scripts unwanted! (%x)", runGM);
  html = wipeJavascript(html);
  iframe.contentWindow.location.href = location.href; // for cross domain issues
  var doc = iframe.contentDocument;
  doc.open("text/html");
  doc.addEventListener("DOMContentLoaded", loaded, false);
  doc.write(html); // this may throw weird errors we can't catch or silence :-|
  doc.close();
}

html2dom.destroy = function() {
  for (var url in html2dom)
    if (html2dom.hasOwnProperty(url)) {
      var cache = html2dom[url];
      cache.doc = cache.onload = cache.xhr = null;
      delete html2dom[url];
    }
};

// functionally belongs to html2dom above (see location.href line for details)
try { // don't run this script recursively on wget() documents on other urls
  if (window.frameElement &&
      window.parent.location.href.replace(/#.*/, "") == location.href)
    throw (new Error("wget.js: Avoiding double firing on " + location.href));
} catch(e) {
  //console.error("Double fire check error: %x", e);
}

window.addEventListener("unload", html2dom.destroy, false);
