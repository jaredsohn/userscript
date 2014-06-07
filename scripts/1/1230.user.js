// ==UserScript==
// @name          CommonTimes.org Bloglines Integration
// @namespace     http://www.commontimes.org
// @description	  Integrates Bloglines with CommonTimes.org -- ripped from Blogmarks

// Subscriptions page
// @include       http://bloglines.com/myblogs_subs*
// @include       http://www.bloglines.com/myblogs_subs*

// Items page
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*

// ==/UserScript==

(function() {
  
  function tweakItems() {
    var links = document.getElementsByTagName("a");
    
    for (var i=0; i < links.length; i++) {
      var l = links[i];
      if (l.innerHTML.indexOf("Clip/Blog This") != -1) {
        l.innerHTML = "Post to CommonTimes.org";
        
        // links is inside a list item which is inside an unordered list
        // whic is inside a div. this div is a sibling of the header that
        // serves as a title link
        var titleLink = l.parentNode.parentNode.parentNode;
        
        while (titleLink && titleLink.tagName.toLowerCase() != "h3") {
          titleLink = titleLink.previousSibling;
        }
        
        if (!titleLink) {
          fail("Could not find the title link.");
          return;
        }
        
        // the header has a link tag inside of it
        titleLink = titleLink.getElementsByTagName("a")[0];
        l.onclick = getServicePostClosure(titleLink.innerHTML,
                                            titleLink.getAttribute("href"));
        l.setAttribute("href", "http://www.commontimes.org/submit_times.php"); // symbolic
      }
    }
  }
  
  function getServicePostClosure(title, href) {
    return function() {
      postToService(title, href);
      return false;
    }
  }
  
  function postToService(title, href) {
  
    // Catch selected text (if any)
    var q='';
    if (window.getSelection) { q=window.getSelection(); } 
    else if (document.getSelection) { q=document.getSelection(); } 
    else if (document.selection) { q=document.selection.createRange().text; } 
    
    // No Via
    var r='';
    
    // Build bookmarklet url
    var url = 'http://www.commontimes.org/submit_times.php?gm=1' 
      +'&qtitle=' + encodeURIComponent( title )
      +'&qweburl=' + encodeURIComponent( href )
      +'&qsummary=' + encodeURIComponent( q );
      
    // Open popup
    open( url, 'commontimes','location=no,toolbar=no,scrollbars=yes,width=800,height=700,status=no' );
  }
    
  function fail(reason) {
    alert(reason + "\nPlease look for an updated version of this script");
  }

  var href = window.location.href;
  
  if (href.indexOf("myblogs_subs") != -1) {
    tweakSubscriptions();
  } else if (href.indexOf("myblogs_display") != -1) {
    tweakItems();
  } else {
    fail("Unknown URL: " + href);
  }
})();

