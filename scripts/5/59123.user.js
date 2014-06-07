// ==UserScript==
// @name           Stack Overflow Interesting Tag Icon
// @namespace      http://momentumworkshop.com
// @description    Adds Stack Overflow Icon to your Interesting Tags
// @include        http://stackoverflow.com/*
// @author		     Corey Frang / based on work by Stephen A. Goss
// ==/UserScript==

// Check if jQuery's loaded
  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; GM_letsJQuery(); }
  }
  GM_wait();

// All your GM code must be inside this function
  function GM_letsJQuery() {
    var tags = [
    ];
    // add a blue star to my favorites.
    $("#interestingTags > a").each(function() {
      var re = new RegExp('^'+$(this).text()+'$')
      tags.push([re,"http://stackoverflow.com/favicon.ico"]);
    });
    
    var tagMatches = {}; // cache our results
    
    $(".post-tag").each(function(i) {
      var $tag = $(this);
      var totest = $tag.text().replace(/^\s+|\s+$/g,'');
      if (!tagMatches.hasOwnProperty(totest))
      {
        tagMatches[totest] = [];
        for(var iter in tags)
        {
          var re = tags[iter][0];
          var source = tags[iter][1];
          if(totest.match(re))
          {
            tagMatches[totest].push("<img class=\"tagimg\" src=\"" + 
              source + "\" width=\"16\" height=\"16\" />&nbsp;");
          }
        }
      }
      $.each(tagMatches[totest],function(i,img) {
        $tag.prepend(img);
      });
    });
    $(".tagimg").css({'vertical-align' : 'text-top'});
  }
