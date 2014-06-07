// del.icio.us depinked
// version 0.1  
// S Waters
// 2006-07-14

// ==UserScript==
// @name del.icio.us depinked
// @description Change the background of the "other people" link from shades of pink to shades of green. 
// @include http://del.icio.us/*
// @exclude http://del.icio.us/rss/*
// ==/UserScript==

(function(){

  function depink_link(link) {
    var rgb_vals = rgbRe.exec(link.style.backgroundColor); 
    
    // Make the gradient background green, not pink, by swapping the rgb values   
    link.style.backgroundColor = "rgb(" + rgb_vals[3] + ", " + rgb_vals[1] + ", " + rgb_vals[2] + ")"; 
  }
    
  var main_node, all_posts, this_post, post_links;
  var rgbRe = /^rgb\((\d+), (\d+), (\d+)\)$/;
  
  main_node = document.getElementById("main");
  pop_links = document.evaluate("//a[@class='pop']", main_node, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null);  
  
  for (var a = 0; a < pop_links.snapshotLength; a++) {      
    pop_a = pop_links.snapshotItem(a);
    depink_link(pop_a);
  }
  
})()

