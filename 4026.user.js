// ==UserScript==
// @name           Ruby on Rails API/wiki integration
// @namespace      http://henrik.nyh.se
// @description    Provides links (that open iframes) in the Rails API, to suitably named pages of the Rails wiki. The idea is to integrate the two better, somewhat like the PHP.net manual. Obviously, this script becomes a lot more useful if it (or at least its wiki page naming convention) is widely adopted.
// @include        http://api.rubyonrails.tld/*
// @include        http://wiki.rubyonrails.tld/*
// ==/UserScript==

// TODO: Integrate into API better, rather than using an iframe. Show # of revisions? HEAD request to see if page exists? How to get 301 status what with GM's redirect?
// TODO: Not only wiki pages for methods, but also "sectiontitles"? And one per class/module?
// TODO: Link to open in new window, link to enlarge iframe

function xp(query) { return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }

// API config

var title = /(?:Module|Class): (.+)/;
var methods = xp("//div[@class='title']//b");
var wikibase = "http://wiki.rubyonrails.com/rails/pages/";
var wiki_link_show_text = "show wiki page";
var wiki_link_hide_text = "hide wiki page";


// Someone set us up the gatekeeper

if (location.href.indexOf("http://api.") == 0)
	api();
else
	wiki();


// API pages

function api() {
	
	var lookupTable = {};

	var m = title.exec(document.title);
	if (m == null) return;  // There is no class/module here, so bail
	
	var klass = m[1];
	var methods_count = methods.snapshotLength;
	if (!methods_count) return;  // There are no methods here, so bail
	
	for (var i = 0; i < methods_count; i++) {
		var method = methods.snapshotItem(i);
		var method_uri = method.innerHTML.replace('?', '_');
		var fq_method = klass + '.' + method_uri;
		
		var method_id = /name="([M\d]+)"/.exec(method.parentNode.innerHTML)[1];
		
		var source_link = document.getElementById("l_" + method_id + "_source");
		if (!source_link) continue;  // Method aliases will not have a source link - so skip ahead
		
		var delim = document.createTextNode(" | ");
		var a = document.createElement("a");
		a.innerHTML = wiki_link_show_text;
		a.href = wikibase + fq_method;
		lookupTable[a.href] = method_id;
		
		a.addEventListener('click', show_wiki_page, false);
	
		// Juggle into place
		source_link.parentNode.insertBefore(delim, source_link);
		source_link.parentNode.insertBefore(source_link, delim);
		source_link.parentNode.insertBefore(a, delim);
		source_link.parentNode.insertBefore(delim, a);
		
	}
	
	function show_wiki_page(event) {
			event.preventDefault();  // Don't follow the link
			var url = this.href, id = lookupTable[this.href];  // There must be a nicer solution?
			var iframe_id = id + "_iframe";
			var iframe = document.getElementById(iframe_id);
			
			if (!iframe) {
				// Create iframe
				iframe = document.createElement("iframe");
				iframe.id = iframe_id;
				iframe.src = url; // + '#pageName';
				iframe.style.width = '100%';
				iframe.style.height = '350px';	
				this.parentNode.parentNode.appendChild(iframe);
				this.innerHTML = wiki_link_hide_text;
			} else if (iframe.style.display == 'none') {
				// Show iframe
				iframe.style.display = 'block';
				this.innerHTML = wiki_link_hide_text;
			} else {
				// Hide iframe
				iframe.style.display = 'none';
				this.innerHTML = wiki_link_show_text;
			}
	
	}

}


// Wiki pages

function wiki() {

	h = document.getElementById('pageName');
	h.innerHTML = h.innerHTML.replace(/(::|\.)/g, '$1<span style="font-size:0"> </span>');  // Allow long titles to wrap

	if (window.top == self) return;  // Don't bother if we're not in an (i)frame
	
	c = document.getElementById('Container');
	c.style.margin = '5px';
	
}
