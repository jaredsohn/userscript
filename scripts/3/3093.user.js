/*
 * Title:
 * 	del.icio.us-otherpeoplefix
 * 
 * Author:
 *      John Morton
 * 
 * Last Updated:
 * 	  2006-02-02
 */

// ==UserScript==
// @name del.icio.us-otherpeoplefix
// @namespace http://angrymonkey.net.nz/
// @description A script to change the background gradient of the "other people" link to a font gradient. 
// @include http://del.icio.us/*
// @exclude http://del.icio.us/rss/*
// ==/UserScript==

(function(){

  function modify_other_people_link(link) {
    var rgb_vals = rgbRe.exec(link.style.backgroundColor);
    
    // Convert the background gradient to a font size gradient. The
    // font increases from 80% by jumps of 5%, and goes bold roughly
    // when the number crosses into the thousands.
    
    var scale, size, weight;
    scale = ((255 - rgb_vals[3])/255.0 * 100).toFixed();
    
    if (scale > 34) { weight = "bold"; } else { weight = "normal"; }
        
    size = ((scale/5).toFixed() * 5) + 80;
    
    link.style.backgroundColor = null;
    link.style.fontWeight = weight;
    link.style.fontSize = size + "%";
  }
    
  var main_node, all_posts, this_post, post_links;
  var rgbRe = /^rgb\((\d+), (\d+), (\d+)\)$/;
  
  main_node = document.getElementById("main");
  all_posts = document.evaluate("//li[@class='post']", main_node, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null);
  
  for (var p = 0; p < all_posts.snapshotLength; p++) {
    
    this_post = all_posts.snapshotItem(p);
    
    var post_links = this_post.getElementsByTagName("a");
    for (var a = 0; a < post_links.length; a++) { 
      if (post_links[a].style.backgroundColor) { 
        // The link with the explicit style setting the background is 
        // the "other people" link
        modify_other_people_link(post_links[a]);
        break;
      }
    }
  }
  
})()
