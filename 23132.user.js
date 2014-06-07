// Tflickr v0.1
//
// Copyright 2007 Bob Lee 
// Released under the Apache license 
// http://www.apache.org/licenses/LICENSE-2.0
//
// Modified by Phosy to be able to tweet directly from twitter. (no more from reader)
// original script: http://userscripts.org/scripts/show/12198
//
// ==UserScript==
// @name          Tflickr
// @namespace     http://www.nova-foto.net/ 
// @description   Twitter  from Flickr. From any photo or user-page hit Shift+T.
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
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

  // Get the tinyURL
  // http://tinyurl.com/api-create.php?url=

 var longurl='http://tinyurl.com/api-create.php?url='+window.location.href;
 

 GM_log('test 1');
GM_xmlhttpRequest({
    method: 'GET',
    url: longurl ,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html,text/xml',
    },
    onload: function(responseDetails) {

		var twitter = prompt("Twitter:", getLabel(titleLink) + ": " );
		var msg = twitter + ' -> ' + responseDetails.responseText;
	postTwitter(msg);


    }
});

}

function tinyurlCallback(url) {
  alert('URL converted to: ' + url);
}


// Finds the current title link.
function findCurrentTitleLink() {
  var entry = document.getElementById('photoswftd');
  if (entry) {
    var anchors = entry.getElementsByTagName('h1');
	return anchors[0];
//    for (var i = 0; i < anchors.length; i++) {
//      if ("entry-title-link" == anchors[i].className) {
//        return anchors[i];
//      }    
//    }
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

}, false);

