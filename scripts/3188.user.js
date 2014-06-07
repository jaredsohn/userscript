// Rojo Del.icio.us
// version 0.1 Alpha
// 2006-02-02
// Copyright (c) 2006, Mark Hanson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name          rojo_del.icio.us
// @version       0.1
// @description   Post tags applied in Rojo as bookmarks in del.icio.us
// @namespace     http://markerichanson.com/greasemonkey/rojo
// @include       http://www.rojo.com/*
// @include       http://rojo.com/*
// @exclude       http://www.rojo.com/javascript/dojo/iframe_history.html
// @exclude       http://rojo.com/javascript/dojo/iframe_history.html

// Whats New
// =========
// v 0.1    First cut
//
// Description
// ===========
// Tag an arcticle of feed in rojo, and it's tagged in del.icio.us.  Delete a tag  
// in rojo and it's deleted in del.icio.us.  Why?  Because.  Plus, it gave me an 
// excuse to play with DOM mutation events.
//
// To-Do:
// Handle tags on feed management page.  Started, not working.  See the to-be-renamed
//   getPostItem2...
// Abstract the del.icio.us portion to allow plug in of other targets.
// Reflect changes made at del.icio.us to tags into rojo.
// Contact
// =======
// Mark Hanson ( http://markerichanson.com/ )

// ==/UserScript==

(function() {
    var h = {};
    
    function initialize () {
        // GM_log("initialize("+unsafeWindow.location+")");
        // GM_log("initialize("+unsafeWindow.location.pathname+")");
        // initialize
		// initialize page specific handler array
        h["/doIRPCTagArticle.jsp"] = doPostItem;
        h["/doIRPCdeleteTagArticle.jsp"] = doPostItem;
        h["/doIRPCTagFeed.jsp"] = startTagFeed;
        h["/view-feed/"] = endTagFeed;
        h["/doIRPCdeleteTagFeed.jsp"] = startTagFeed;
        h["/manage-feeds/doIRPCTagFeed.jsp"] = asYetUnnamed;
        
        // defer activities until load event fires.
        window.addEventListener("load", onLoad, false);
    }

    initialize ();
    // looking for events to identify 

	// assuming some special processing will be required on the add/delete tag
	// pages for the /manage-feeds/ handling
    function asYetUnnamed () {
      
    }
    
    // managing tag feeds takes two steps.  First, here, note the GET to the
    // path that causes tags on feeds to be added or deleted (via "h[]" lookup
    // on load.  On this event, pull the records stored with GM_setValue and
    // load an ifrane with the info url for the feed in rojo.  Wait for the 
    // onload call of endTagFeed for that iframe.
	// btw, I'd have done this with a GM_xmlhttprequest and domparser, but rojo's
	// html wasn't well-formed when I was writing this so the domparser bonked.
    function startTagFeed () {
        // have to get the rojo feed description to get the real url before
        // posting.
        // parse out //div[@class='description']/A[1]
        GM_log("startTagFeed");
        var src = GM_getValue("postItem");

        var o = eval(src);
		// some of this iframe code came from:
		// http://youngpup.net/userscripts/htmlparserexample.user.js
		// but the approach didn't.  Using the greasemonkey hooks to do onload
		// processing for the page in the iframe isn't how the link does it.
		// doing it this way works b/c i'm passing data between instances of the
		// script with GM_setValue & GM_getValue which is, no doubt, an abuse of
		// some rule somewhere..
		
        // create an IFRAME to write the document into. the iframe must be added
	    // to the document and rendered (eg display != none) to be property 
        // initialized.
        var iframe = document.createElement("IFRAME");
        iframe.style.visibility = "hidden";
        iframe.style.position = "absolute";
        document.body.appendChild(iframe);
        // set the iframe to load the link from the PostItem.  This loads the
        // rojo feed info display from which I can parse (in endTagFeed) the 
        // sites URL which is otherwise not available on the page where the tag
        // was applied.
        iframe.contentWindow.location.href = o.url;
    }

	// called when the feed info page is loaded.  Parses the feed URL from that
	// page, updates the PostItem stored in GM_setValue ("postItem"...).  Calls
	// doPostItem so that the feed tag is reflected into del.icio.us.
    function endTagFeed () {
        GM_log("endTagFeed");
        var src = GM_getValue("postItem");

        var o = eval(src);
        var query = "//div[@class='description']/A[1]";
          var iter= document.evaluate(query,document, null, XPathResult.ANY_TYPE, null);
         
        var i = iter.iterateNext();
        GM_log (i+": "+i.href);
        o.url = i.href;    
        GM_setValue("postItem",o.toSource());
        doPostItem();
    }
    
    // parse tag text out of node.  trim.
    function getTag (node) {
//        GM_log("getTag: "+node);
        // text from the first <a> child is the tag
        var query = "./a[1]/text()";
        iter= document.evaluate(query,node,null, XPathResult.ANY_TYPE, null);
        i = iter.iterateNext();
        return i.textContent.replace(/\n/g,'').replace(/^\s+/g, '').replace(/\s+$/g, '');
    }
    
    // constructor for tuple that is a rojo tag / del.icio.us post 
    function PostItem (url, title, tags) {
      this.url = url;
      this.title = title;
      this.tags = tags;
    }

    // parse a post item off of the /manage-feed/ html.
    // partial implementation, untested xpath.  not working currently.
    function getPostItem2 (node) {
        var query = "..//li";
        var iter= document.evaluate(query,node,null, XPathResult.ANY_TYPE, null);
        li = iter.iterateNext();
        var tags = new Array();
        var url = "";
        var title = "";
        
        while (li != null) {
            tags.push(getTag(li));
            li = iter.iterateNext();
        }       
 	    GM_log("tags: "+tags.toSource());
		query="../../../TD[class='subscription-info']/A";	
        iter = document.evaluate(query,document,null, XPathResult.ANY_TYPE, null);
		url = iter.iterateNext().href;
		GM_log("url: "+url);
		query="../../../TD[class='subscription-title']/SPAN";	
        iter = document.evaluate(query,document,null, XPathResult.ANY_TYPE, null);
		title = iter.iterateNext().textContent;
		GM_log("title: "+title);
		// must be the manage feed page.
		// title 
		// link is the [i] image    
		return new PostItem(url,title, tags);
    }

	// parse post items out of html.  
	// a little ugly: try to parse as if it's part of an article tag first.  if 
	// that fails, then parse as a feed tag.
	// check at the outset if it's on /manage-feeds/ and send out to the other
	// method.  Doing it that way is better than forking a separate onDOMNodeInserted
	// listener and registration based on the current location.
    function getPostItem (node) {
        // ../../../span has the link if an article,
        // ../../../../../../H1 has the rojo link and title if feed
        // distinguish - if there's a span sibling to ../../.., then article, else
        // feed
        var path = unsafeWindow.location.pathname;
        if (path == "/manage-feeds/") {
			return getPostItem2(node);    
	    }
        // need to ignore LI without IDs.  looks like a rendering bug on
        // rojo's side that ghost tags are showing up without ids.
        var query = "..//li[@id]";
        var iter= document.evaluate(query,node,null, XPathResult.ANY_TYPE, null);
        li = iter.iterateNext();
        var tags = new Array();
        while (li != null) {
            tags.push(getTag(li));
            li = iter.iterateNext();
        }        

        query="../../../../span[1]";
        iter= document.evaluate(query,node,null, XPathResult.ANY_TYPE, null);
        i = iter.iterateNext();
        var title = "";
        var url = "";
        if (i != null) {
            // it's an article being tagged
            // 12 hours later, what the hell was the line below?  what i get for
            // coding between playing with a 6 year old and 3 year old...  
            // seems to work, oddly enough.  
            url = i.title.replace(/\n/g,'').replace(/^\s+/g, '').replace(/\s+$/g, '');
            query="./a/text()"
            iter = document.evaluate(query,i,null, XPathResult.ANY_TYPE, null);
            title = iter.iterateNext().textContent;
            title = title.replace(/\n/g,'').replace(/^\s+/g, '').replace(/\s+$/g, '');
        }
        else {
            // must be the feed itself
            query="//H1/text()";
            iter = document.evaluate(query,document,null, XPathResult.ANY_TYPE, null);
			var titleElement = iter.iterateNext();
			if (titleElement != null) {
              title = titleElement.textContent;

              query="//H1/SPAN/A[2]";
              iter = document.evaluate(query,document,null, XPathResult.ANY_TYPE, null);
              url = iter.iterateNext().href;
            }
        }
            
        return new PostItem(url,title, tags);      
    }

    // note that a tag is removed.  create and store a PostItem.
 	// posting will be done when the page rojo uses for back end communication 
 	// loads.
    function onDOMNodeRemoved (event) {
        GM_log("onDOMNodeRemoved: "+event.target);
        GM_log("event.target.className: "+ event.target.className);
        if (event.target.className == "tagLi") {
            // tags removed are not yet removed from the postItem
            // remove it here.
            var theTag = getTag(event.target);
            var postItem = getPostItem(event.target);
            var newTags = new Array();
            // remove tag from tags
            for (var i = 0; i < postItem.tags.length; i++) {
                if (postItem.tags[i] != theTag) {
                  newTags.push(postItem.tags[i]);
                }
            }
            postItem.tags = newTags;
            GM_log("postItem: "+postItem.toSource());
            GM_setValue("postItem",postItem.toSource());
        }
    }

    // note addition of a tag.  Create a post item and store via gm_setvalue.
    // if multiple tags are added, a PostItem will be created for each and 
    // only the final one left stored via gm_setvalue (all but last are overwritten)
    // actual post of postitem will happen when the page rojo uses for back end
    // communication is written.
    function onDOMNodeInserted (event) {
        GM_log("onDOMNodeInserted: "+event.target);
        GM_log("event.target.className: "+ event.target.className);
        if (event.target.className == "tagLi") {
            // var theTag = getTag(event.target);
            // tags added are already in the postItem.
            // no need to add it here.
            var postItem = getPostItem(event.target);
            GM_log("postItem: "+postItem.toSource());
            GM_setValue("postItem",postItem.toSource());
        }
    }

    // Post whatever post item is currently stored.  If the currently stored item
    // has 0 tags, treat it as a delete.
    // NOTE: this relies on you being logged into del.icio.us.  You will be 
    // prompted to login if you are not.  Not sure what happens when you log out
    // of del.icio.us.  Early testing indicated posting would somehow still work
    // but I'm not sure... 
    function doPostItem () {
        GM_log("doPostItem");
        var src = GM_getValue("postItem");
        GM_log("src: "+src);
        // if tags.length == 0, then delete
        var o = eval(src);
        if (o.tags.length == 0) {
            // delete
            var url = "http://del.icio.us/api/posts/delete?";
            url += "url="+o.url;

            yield_get_response(url, function (resp) {
                GM_log("response received: "+resp.toSource());
            });
        }        
        else {
	        var url = "http://del.icio.us/api/posts/add?";
	        url += "&tags="+o.tags.join(" ");
	        url += "&description="+o.title;
	        url += "&url="+o.url;
	
	        yield_get_response(url, function (resp) {
	            GM_log("response received: "+resp.toSource());
	        });
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
                'User-agent': 'Mozilla/4.0 (compatible) rojo_delicios.user.js'
            },
            onload: response_first_argument
        });
    }
    function onLoad () {
		// run the page-specific function, if any.
        var path = unsafeWindow.location.pathname;
        var f = h[path];
        if (f != null) f();

		// put the mutation event handlers in place if this is a window with
		// TagArticle available.
		// in the end, the tags might be captured more easily by 
		// intercepting specific page logs (doIRPCTagArticle etc) but the 
		// mutation events were fun to play with so I'm leaving them in until 
		// there's some compelling reason to rewrite their functionality.
		// later note: not so sure it would be doable without mutation events.
		// mutation events are in-place in the html and i can get to the rest of
		// the tags on an item.  at least some of the doIRPC... methods on pass
		// the changed tag & del.icio.us api doesn't allow passing only the 
		// changed tags.
		
		// only put mutation event listeners on pages that have access to the 
		// javascript object that makes the mutations happen.  this is an attempt
		// to avoid monkeying with all the iframe-based backend communication
		// rojo does.
        if (unsafeWindow.TagArticle != null) {
			//        document.addEventListener("click", onEvent, false);
			//        document.addEventListener("DOMAttrModified", onEvent, false);
			//          document.addEventListener("DOMCharacterDataModified", onEvent, false);
            document.addEventListener("DOMNodeInserted", onDOMNodeInserted, false);
			//          document.addEventListener("DOMNodeInsertedIntoDocument", onEvent, false);
            document.addEventListener("DOMNodeRemoved", onDOMNodeRemoved, false);        
			//          document.addEventListener("DOMNodeRemovedFromDocument", onEvent, false);
			//          document.addEventListener("DOMSubtreeModified", onEvent, false);        
        }
     }    
})();
