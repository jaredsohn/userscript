/* 
TODO: atom support / better feed format handling
TODO: choose one naming style, lower_case or xUpperCase (as inherited from RSS_Panel)
*/
// ==UserScript==
// @name  keep_findory_current
// @namespace http://markerichanson.com/keep_findory_current
// @description  Displays any articles findory hasn't found yet as if it had.
// @include
// @exclude
// ==/UserScript==
(function() {
    // vars to handle data i need to store across async calls
	var source_name = ""; // findory-used source name
	var article_titles = [];
	var script_rendered = []; // link->title for articles rendered by this script
	
	// templates for HTML will insert later.  probably a better way to save static
	// strings in javascript.
	var UNREAD_TEMPLATE = "\
	<DIV class=\"article\">\
	<DIV id=\"headline\">\
	<A href=\"@link@\">@title@</A>\
	</DIV>\
	<DIV id=\"source\">\
	<SPAN class=\"newforyou\">\
	<A href=\"/source?source=@source_name@&ib=1\">@source_name@  </A>\
	<EM>@when@  </EM>\
	</SPAN>\
	</DIV>\
	<DIV id=\"blurb\" class=\"text\">@desc@\
	<NOBR>\
	<A href=\"@link@\"> (read more)  </A> \
	</NOBR> \
	</DIV> \
	</DIV>";
	
	var READ_TEMPLATE = "\
	<SPAN class=\"disabled\">\
	<DIV class=\"article\">\
	<DIV id=\"headline\">\
	<A href=\"@link@\">@title@</A>\
	</DIV>\
	<DIV id=\"source\">\
	<SPAN class=\"newforyou\">\
	<A href=\"/source?source=@source_name@&ib=1\">@source_name@  </A>\
	<EM>@when@  </EM>\
	</SPAN>\
	</DIV>\
	<DIV id=\"blurb\" class=\"text\">@desc@\
	<NOBR>\
	<A href=\"@link@\"> (read more)  </A> \
	</NOBR> \
	</DIV> \
	</DIV>\
	</SPAN>";
	
	// begin the process of getting the feed xml for source on the current page
	function rss_init() {
		GM_log("rss_init()");
		// get the rss url for the current source and pass it to get_and_handle_feed
		yield_rss_url(get_and_handle_feed);		
	}
	
	// get the rss url for the current source
	// pass that url to the function argument
	function yield_rss_url (rss_url_first_arg) {
		GM_log("yield_rss_url("+source_name+")");

		// have we stored the before?
		rssUrl = GM_getValue(source_name);
		if (rssUrl) {
			GM_log(source_name+" stored rssUrl: "+rssUrl);
			rss_url_first_arg (rssUrl);
		}
		else {
			// helper function to save the url and pass it along to 
			// the target function.
			function handle_url (url) {
				GM_setValue(source_name,url);
				rss_url_first_arg(url);
			}
			
			GM_log(source_name+" no stored rssUrl");
			
			yield_xmlUrl_to_arg (
   				function (rssUrl) {
					if (rssUrl == null) {
						// not subscribed, so subscribe, extract, unsubscribe.
						// oh what joy to do w/o a synchronous interface
						yield_xml_url_by_adding_sub(handle_url);
					}
					else {
						handle_url(rssUrl);
					}	
				}
			);
		}
	}
	
	// Issue a GET to the specified URL, then pass the response to the
	// function argument.  Utility method.
	// TODO: make this degrade gracefully?
	function yield_get_response (url, response_first_argument) {
		GM_log("yield_get_response("+url+",..)");
		
		GM_xmlhttpRequest ({
			method: 'GET',
			url: url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) keep_findory_current'
			},
			onload: response_first_argument
		});
	}
	
	// temporarily subscribe to the source in order to extract the xmlUrl 
	// from the resulting opml.
	function yield_xml_url_by_adding_sub (rss_url_first_arg) {
		GM_log("yield_xml_url_by_adding_sub("+source_name+",..)");

		//TODO: really ought to parse the "add" & "remove" URLs from the button on page
		// What the following does:
		// 0. GET the "add favorite" URL for the source in question
		// 1. call the function to retrieve the opml & extract the xmlUrl for 
		//    the source in question.
		// 2. pass the xmlUrl to an anonymous fuction that
		//    a. passes the xmlUrl to the original function argument 
		//    b. removes the favorite by GETting the remove favorite url
		// net net: added favorite, got xmlUrl, removed favorite.
		// no other way to get the xmlUrl from Findory given the available data
		// that I can see.
		yield_get_response (
		    "http://findory.com/source?source="+source_name+"&ib=1&add_b=1",
  			function () {
				yield_xmlUrl_to_arg(
					function (xmlUrl) {
						rss_url_first_arg(xmlUrl);
						yield_get_response (
							"http://findory.com/source?source="+source_name+"&ib=1&rem_b=1",
							function () {
								GM_log ("added, removed "+source_name+"as favorite.");
							}
						);
					}
				);
			}
		);
	}
	
	
	
	// get the feel url from the findory xml. 
	// pass the url to the function in the argument
	function yield_xmlUrl_to_arg (xmlUrl_first_argument) {
		GM_log("yield_xmlUrl_to_arg("+source_name+",..)");
		// get the opml, craft a function on the fly to parse the opml
		// and pass the results to argument xmlUrl_first_argument
		yield_get_response (
		    "http://findory.com/export/opml/",
			function (res) {
				xmlUrl_first_argument(extract_xml_url_from_opml(res));
			}
		);
	}
	
	// parse the xmlUrl from the opml for the feed inidcated
	function extract_xml_url_from_opml (res) {
		GM_log("extract_xml_url_from_opml("+source_name+",..)");
		query = '/opml/body/outline//outline[@title="'+source_name+'"]';
		
		var dp = new XPCNativeWrapper(window, "DOMParser()");
		var parser = new dp.DOMParser();
		var DOM = parser.parseFromString(res.responseText, "application/xhtml+xml");
		
		iter= document.evaluate(query,DOM, null, XPathResult.ANY_TYPE, null);
		GM_log(iter);
		i = iter.iterateNext();
		if (i != null) {
			rssUrl = null;
			for (j = 0; (j < i.attributes.length) && (rssUrl == null); j++) {
				if (i.attributes[j].nodeName == "xmlUrl") {
					rssUrl = i.attributes[j].nodeValue;
				}
			}
			//rssUrl = i ? (i.attributes["xmlUrl"]).nodeValue : null;
			GM_log("rssUrl from current opml: "+rssUrl);
		}
		return rssUrl;
	}
	
	// get the feed xml indicated by the url and pass it to the handler
	function get_and_handle_feed(src) {
		if (! src) return;
		/* TODO:intro caching for rss streams */
		yield_get_response(src, handle_feed_response)
	}

	function handle_feed_response(res) {
		// only if res is "loaded"
		if (res.readyState == 4) {
			// only if "OK"
			if (res.status == 200) {
				// handle result
				// if-then-else inherited from RSS_Panel.  
				if (res.responseXML && typeof(res.responseXML) != "string") {
					GM_log("0");
					rss_render(res.responseXML);
					// next try parsing the resultText with DOMParser;
					// first the safe route through XPCNativeWrapper
				} 
				else if (typeof(XPCNativeWrapper) == "function") {
					GM_log("1");
					var dp = new XPCNativeWrapper(window, "DOMParser()");
					// dbg('XPC Wrapped DOM Parser: '+typeof(dp));
					var parser = new dp.DOMParser();
					// dbg('DOM Parser: '+typeof(parser));
					var DOM = parser.parseFromString(res.responseText, "application/xhtml+xml");
					rss_render(DOM);
					// fallback to content window object; this would fail
					// in GM 0.6.4+ but the safe option has succeeded already.
				} 
				else if (typeof(window.DOMParser) == "object") {
					GM_log("2");
					// dbg("parsing DOMParser");
					var parser = new win.DOMParser();
					var DOM = parser.parseFromString(res.responseText, "application/xhtml+xml");
					rss_render(DOM);
				} 
			}
			else {
				dbg("GM_XHR response error: " + res.statusText);				
			}
		}
	}
	
	function dom_getElements(node, elt) {
		var list = node.getElementsByTagName(elt);
		return (list.length) ? list : node.getElementsByTagNameNS("*", elt);
	}
	function dom_getFirstNodeValue(node, elt) {
		try {
			var list = dom_getElements(node, elt);
			var chld = list[0].firstChild;
			return chld.nodeValue;
			} catch (e) {
			// dbg("missing element " + elt + "\nError: " + e.message);
			return "";
		}
	}
	
	function normalize_title (title) {
		var original_title = title;
		title = title.toLowerCase();
		title = title.replace(/'/g,'');
		title = title.replace(/"/g,'');
		// what was this for?  some findory quirk with trailing spaces, but the
		// semicolon may be a typo.  yes, yes, I should have regression tests
		// to catch this sort of thing, but this script started off as a quick
		// small and dirty thing that wouldn't be maintained and i've not gone
		// back to do tests. and, yes, minimally I should have commented the code.
		title = title.replace(/\$[a-z]*	;/g,'');
		// findory removes parenthesis from the title string as well
		title = title.replace(/\([^}]*\)/g,'');
		// pulled from http://www.aspdev.org/articles/javascript-trim/
		// through the glory that is google.  Surely repace(/\s*$/,'') or 
		// similar is better...  and /^\s+/
		while (title.substring(title.length-1, title.length) == ' ') {
			title = title.substring(0,title.length-1);
		}		
		while (title.substring(0,1) == ' ') {
			title = title.substring(1, title.length);
		}
		// GM_log ("normalize_title ("+original_title+") = "+title);
		return title;
	}
	function rss_render(DOM) {
		findory_known_string = article_titles.join();
		GM_log("known titles: "+findory_known_string);
		
		var inner = "";
		var items = [];
		try {
			items = dom_getElements(DOM, "item");
		} 
		catch (e) {
		}
		unknown = 0;
		for (var i=0; i<items.length; i++) {
			
			// screen for already present, should be common case
			var n = items[i];
			var title = dom_getFirstNodeValue(n, "title") || "Untitled item #" + i;
			var normalized_title = normalize_title(title);
			// GM_log("feed title: "+normalized_title);
			if (findory_known_string.indexOf(normalized_title) == -1) {
				unknown++;
				var desc = dom_getFirstNodeValue(n, "description");
				desc = desc.replace(/<[^>]*>/g,"");
				if (desc.length > 394) {
					desc = desc.substring(0,394);
					desc += "... ";
				}
				var link = (dom_getFirstNodeValue(n, "link") || "#RSS_MISSING_LINK");
				var date = (dom_getFirstNodeValue(n, "date") || "NO DATE PARSED");
				/* select template based on read/unread state saved */
				var article = GM_getValue(source_name+normalized_title) == "read" ? READ_TEMPLATE : UNREAD_TEMPLATE;
				article = article.replace(/@source_name@/g,source_name);
				article = article.replace(/@link@/g,link);
				article = article.replace(/@title@/g,title);
				article = article.replace(/@when@/g,date);
				article = article.replace(/@desc@/g,desc);
				inner+=article;
				script_rendered[link]=normalized_title;
				
				// TODO: better sorting needed. when dates are available, could intermingle.
				GM_log("article not known to findory:"+title+", "+desc.length);
			}
		}
		//GM_log("unknown: "+unknown);
		//GM_log(inner);
		// insert what remains in the front of the articles section
		
		query = '//TD[@id="slot_stripe_middle"]//div[@id="body"]';
		iter = document.evaluate(query,document, null, XPathResult.ANY_TYPE, null);
		// second id=body is the right one
		var j = iter.iterateNext();
		//var j = iter.iterateNext();
		//  var j = iter.iterateNext();
		inner += j.innerHTML;
		j.innerHTML = inner;
	}
	
	function onclick (event) {
		normalized_title = script_rendered[event.target];
		if (normalized_title != null) {
			GM_log("script rendered article \""+normalized_title+"\" clicked.");
			GM_setValue(source_name+normalized_title, "read");
		}
		else {
			GM_log("findory rendered article clicked.");
		}
		
		GM_log(event.type+": "+event.target);
		// if event.target is a link to one we rendered, save
		// it for later as "read" for submission to Findory's
		// history.
	}
 
	// pull all the interesting data off the page	
	function load_page_data () {
		// get the title with the Findory : removed.
		source_name = window.document.getElementsByTagName('title')[0].text.replace(/[^:]*: /,"");
			
		query = '//div[@id="headline"]/a';
		iter = document.evaluate(query,document, null, XPathResult.ANY_TYPE, null);
		var j = iter.iterateNext();
		while (j != null) {
			var normalized_title = normalize_title(j.firstChild.nodeValue);
			article_titles.push(normalized_title);

			// if this article was read when it had been rendered by this script
			// we need to tell findory it's read and change the display to mark
			// it as read.  Lastly, to prevent leaking into the GM storage, we 
			// need to remove the article's read flag.
			if (GM_getValue(source_name+normalized_title) != null) {
				// telling findory is easy.  just GET the link.
				yield_get_response(j.href, function () {});
				// changing the display isn't too bad either.  find the div containing
				// this A, wrap it in a span with class "disabled" and reinsert the
				// result as inner html
				var theDiv = j.parentNode;
				// have to call j's parent's parent's replaceChild 
				// method.  That means we have to construct a replacement node
				// it would be easier to change the innerHTML, but there's no node
				// that is appropriate to do that too.
				var newSpan = document.createElement("span");
				newSpan.className="disabled";
				newSpan.appendChild(theDiv);
				theDiv.parentNode.replaceChild(newSpan,theDiv);5
				// oddly, GM doesn't have a GM_removeValue.  Hopefully this is close
				// to the same net effect.
				GM_storeValue(source_name+normalized_title, null);
			}
			j = iter.iterateNext();
		}
	}

	// once the page loads, suck the data embedded on the page &
	// kick off downloading the feed xml
	function onload () {
		// parse source title, item titles from page for later use
		load_page_data();

		rss_init();
 	}
	function initialize () {
		GM_log("initialize()");
		// initialize
		document.addEventListener("click", onclick, true);

		window.addEventListener("load", onload, false);
	}

	initialize ();
})();
