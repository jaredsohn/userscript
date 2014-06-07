// ==UserScript==
// @name           Stack Overflow Tag Icon Adder
// @namespace      http://blog.deliciousrobots.com
// @description    Adds icons to some popular open source related tags on stackoverflow to offset the Adobe branding effect - Also adds Stack Overflow Icon to your Interesting Tags
// @include        http://stackoverflow.com/*
// @author		   Stephen A. Goss / +interesting tags/some optimization by Corey Frang
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
      [ /python/ , "http://python.org/favicon.ico"],
      [ /ruby/ , "http://www.ruby-lang.org/favicon.ico"],
      [ /jquery/ , "http://jquery.com/favicon.ico"],
      [ /php/ , "http://php.net/favicon.ico"],
      [ /json/ , "http://json.org/favicon.gif"],
      [ /java(?!script)/ , "http://java.com/favicon.ico"],
      [ /ubuntu/ , "http://www.ubuntu.com/files/favicon-ubuntu.ico"],
      [ /debian/ , "http://www.debian.org/favicon.ico"],
      [ /greasemonkey/ , "http://wiki.greasespot.net/favicon.ico"],
      [ /mysql/ , "http://mysql.com/favicon.ico"],
      [ /django/ , "http://www.djangoproject.com/favicon.ico"],
      [ /perl/ , "http://www.perl.org/favicon.ico"],
      [ /eclipse/ , "http://eclipse.org/favicon.ico"],
      [ /firefox|mozilla/ , "http://www.mozilla.com/favicon.ico"],
      [ /apache/ , "http://apache.org/favicon.ico"],
      [ /^hibernate/ , "http://hibernate.org/favicon.ico" ],
      [ /nhibernate/ , "http://nhforge.org/favicon.ico" ],
      [ /linux/ , "http://www.managenergy.tv/metv/images/linux_icon.gif"],
      [ /postgres/ , "http://www.postgresql.org/favicon.ico" ],
      [ /^gnu/ , "http://www.gnu.org/favicon.ico" ],
      [ /subversion|svn/ , "http://subversion.tigris.org/favicon.ico" ],
      [ /^git/ , "http://git-scm.com/favicon.png" ],
      [ /^bsd$/ , "http://www.bsd.org/favicon.ico" ],
      [ /freebsd/ , "http://www.freebsd.org/favicon.ico" ]
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
