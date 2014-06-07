// Treader v0.3
//
// Copyright 2007 Bob Lee
// Released under the Apache license 
// http://www.apache.org/licenses/LICENSE-2.0
//
// ==UserScript==
// @name          Treader
// @namespace     http://crazybob.org/ 
// @description   Twitter and post to del.icio.us from Google Reader. Select an entry and hit Shift+T.
// @include       http://www.google.com/reader/*
// ==/UserScript==

// Reports an error to the user.
function reportError(response) {
  GM_log('Error: ' + response.responseText);
  window.status = "Error posting to Twitter: " 
    + response.responseText;
}

// Posts status through Twitter API. 
function postTwitter(twitter) {
  GM_log('Posting twitter...');
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://twitter.com/statuses/update.json',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'X-Twitter-Client': 'Treader',
      'X-Twitter-Client-Version': 'v0.3',
      'X-Twitter-Client-URL': 'http://crazybob.org/treader.xml',
    },
    data: 'status=' + encodeURIComponent(twitter),
    onload: function(response) {
      if (response.status == 200) {
        GM_log('Success.');
        window.status = 'Twitter posted successfully.';
      } else {
        reportError(response);
      }
    },
    onerror: function(response) {
      reportError(response);
    }
  })
}

// Extracts the label from a title link.
function getLabel(titleLink) {
  return titleLink.firstChild.nodeValue;
}

// Prompts user for a Twitter.
function promptForTwitter(titleLink) {
  // Grab the label text minus the image.
  var twitter = prompt("Twitter:", getLabel(titleLink) 
    + ": " + titleLink.href);
  if (twitter) {
    postTwitter(twitter);
  }
}

// Opens the delicious popup.
function postToDelicious(titleLink) {
  // Cache user ID in the window object.
  var deliciousUser = window.deliciousUser;
  if (!deliciousUser) {
    deliciousUser = prompt('Enter your del.icio.us user name:', '');
    window.deliciousUser = deliciousUser;
  }

  var q = encodeURIComponent(titleLink.href);
  var p = encodeURIComponent(getLabel(titleLink));
  var url = 'http://del.icio.us/' + deliciousUser 
      + '?v=2&noui=yes&jump=close&url=' + q + '&title=' + p;  
  open(url, 'delicious', 'toolbar=no,width=700,height=250');
}

// Finds the current title link.
function findCurrentTitleLink() {
  var entry = document.getElementById('current-entry');
  if (entry) {
    var anchors = entry.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
      if ("entry-title-link" == anchors[i].className) {
        return anchors[i];
      }    
    }
  }
  return null;
}

// Twitter when the user hits Shift+T.
document.addEventListener('keypress', function(event) {
  // Everything is a shift combo. Ignore the search field.
  if (!event.shiftKey || event.metaKey || event.altKey 
      || event.target.type == "text") {
    return;
  }

  // Shift+T
  if (event.charCode == 84) {
    GM_log('Shift+T pressed...');
    var titleLink = findCurrentTitleLink();
    if (titleLink) {
      promptForTwitter(titleLink);
    }
  }

  // Shift+D
  if (event.charCode == 68) {
    GM_log('Shift+D pressed...');
    var titleLink = findCurrentTitleLink();
    if (titleLink) {
      postToDelicious(titleLink);
    }
  }
}, false);

