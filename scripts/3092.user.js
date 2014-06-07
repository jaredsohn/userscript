/*
 * Title:
 * 	fav.icio.us.
 * 
 * Author:
 *      John Morton
 * 
 * Last Updated:
 * 	  2006-02-02
 */

// ==UserScript==
// @name fav.icio.us
// @namespace http://angrymonkey.net.nz/
// @description A script to add favicons next to posted links on del.icio.us 
// @include http://del.icio.us/*
// @exclude http://del.icio.us/rss/*
// ==/UserScript==

(function(){


  function add_favicon(link) {
    /* Adds an image that loads the favicon of the site referenced in
       link to the body of the link, just before any other elements.

       As it just tries http://host/favicon.ico, rather than grabbing 
       the front page of the site looking for <link rel="icon" ... />,
       it's fairly crude, but relatively cheap.
    */
    var favicon = document.createElement('img');
    favicon.src = "http://" + link.hostname + "/favicon.ico";
    favicon.height = 16;
    favicon.width = 16;
    favicon.border = 0;
    favicon.align = "bottom";
    favicon.style.marginRight = "1ex";
    /* it may be cleaner in a page rendering sense to provide a
       default stand in icon, rather than delete the image if
       it won't load. */
    favicon.onerror=function () {this.parentNode.removeChild(this)};
    favicon.onabort=function () {this.parentNode.removeChild(this)};
    link.insertBefore(favicon, link.firstChild);
  }

  var main_node, all_posts, this_post, post_links;
  var rgbRe = /^rgb\((\d+), (\d+), (\d+)\)$/;
  
  main_node = document.getElementById("main");
  all_posts = document.evaluate("//li[@class='post']", main_node, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null);
  
  for (var p = 0; p < all_posts.snapshotLength; p++) {    
    this_post = all_posts.snapshotItem(p);
    // The first anchor is the link for this post    
    add_favicon( this_post.getElementsByTagName("a")[0] );
  }
  
})()
