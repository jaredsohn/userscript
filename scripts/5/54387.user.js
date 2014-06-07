// Ravelry usernames on Twitter
// version 1.01
// 2010-02-22
// by casey
//
// ----------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ravelry usernames on Twitter", and click Uninstall.
//
// ----------------------------------------------------------------------
//
// ==UserScript==
// @name           Ravelry usernames on Twitter
// @namespace      http://userscripts.org/scripts/show/
// @description    Show Ravelry usernames and profile links on Twitter profiles, and following/followers pages. You may remove the http://twitter.com/* include if you only want Ravelry names to appear on following and follower pages. 
//
// @include        http://twitter.com/*
// @include        http://twitter.com/following*
// @include        http://twitter.com/followers*
// ==/UserScript==
//
// ----------------------------------------------------------------------


var RavelryMonkey = {};

RavelryMonkey.twitterNames = function() {
  
  var API_BASE = "http://api.ravelry.com";
  var RAV_BASE = "http://www.ravelry.com";
  var RAV_BADGE = "http://style.ravelry.com/images/trav.gif";
  var USER_AGENT = "Mozilla/5.0 (RavelryMonkey.twitterNames 1.0)";
  
  var anchor = 'follow_grid';
  var screenNames = new Array();
  var users = new Object();
  
  return {
    
    // Lookup the collected names and apply a marking function to the results.
    // The marking function adds links and icons to the page
    mark: function() {
      RavelryMonkey.twitterNames.retrieveAndProcess(function(nameElement, ravelryName) {
        if (nameElement.id == 'rav_name') {
          // show the hidden container that was created for profile pages
          nameElement.parentNode.parentNode.style.display = '';
        }
        var container = nameElement.parentNode;
        var ravLink = " <span class='ravelry_screen_name'><img src='" + RAV_BADGE + "' style='vertical-align: middle;'/><a style='font-size: 12px;' href='" + RAV_BASE + "/people/";
        ravLink += ravelryName + "'> " + ravelryName + "</a><span> ";
        container.innerHTML += ravLink;
      });
    },
    
    // If this is a profile page, collect that username for later lookup.
    // Messy because it creates a special element to contain the Ravelry name
    // if one exists.
    collectProfileName: function() {
      if (document.body.id == 'profile') {
        if (!document.getElementById('rav_name')) {
          // kind of gross. Making a nice placeholder for the name to be inserted into when it arrives
          var bio = document.getElementById('side').getElementsByTagName('ul')[0];
          bio.innerHTML += "<li style='display:none;'><span class='fn'><span id='rav_name'></span></span></li>";
        }
        var marker = document.getElementById('rav_name');
        var username = window.location.href.split('/')[3];
        RavelryMonkey.twitterNames.collectName(username, marker);
      }
    },

    // Collect all of the names (links of a certain class or parent class) descending from a parent element
    collectNames: function(baseElementId) {
      var links = document.getElementById(baseElementId).getElementsByTagName('a');
      for (var i=0; i<=links.length; i++) {
        var link = links.item(i);
        
        var followName = link && link.parentNode.className && link.parentNode.className.indexOf('screenname') > -1;
        var timelineName = link && link.className && link.className.indexOf('screen-name') > -1;
        var profileLink = link && link.attributes['rel'] && link.attributes['rel'].indexOf('me') == 0;
        
        if (followName || timelineName || profileLink) {
          var name = link.innerHTML.replace(' ', '');
          RavelryMonkey.twitterNames.collectName(name, link);
        }
      }
    },
    
    // Add a single name/element pair to our collection
    collectName: function(name, element) {
      users[name] = element;
      screenNames.push(name);
    },
  
    // Call the Ravelry API with the names that we've collected.
    // markingFunction takes 2 arguments: the element that contains the twitter name and the ravelry name 
    retrieveAndProcess: function(markingFunction) {
      if (screenNames.length > 0) {
        GM_xmlhttpRequest({method: 'GET', url: API_BASE + '/people/lookup.json?service=twitter&names=' + screenNames.join(','),
          onload: function(response) { RavelryMonkey.twitterNames.processResponse(response, markingFunction); }, 
            headers: { "Accept":"text/json"}});
      }
    },

    // Retrieve the Ravelry names for each Twitter name and apply a marking function that modifies
    // the page for each matching name
    processResponse: function(response, markingFunction) {
      if ((response.status == 200 || response.status == 304)) {
        var json = eval("(" + response.responseText + ")");
        var results = json["results"];
        for (var name in users) {
          var ravelryName = results[name];
          if (ravelryName) {
            markingFunction(users[name], ravelryName);
          }
        }      
      }
    }
  }
}();

if (document.getElementById('follow_grid')) {
  RavelryMonkey.twitterNames.collectNames('follow_grid');
  RavelryMonkey.twitterNames.mark();
}

if (document.getElementById('timeline')) {
  /* Commented out putting in names in timelines. It works,
    but doesn't update when you use Twitter's "more..." */
    
  //RavelryMonkey.twitterNames.collectNames('timeline');
  
  RavelryMonkey.twitterNames.collectProfileName();
  RavelryMonkey.twitterNames.mark();
}
