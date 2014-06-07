// ==UserScript==
// @name          Last Feedburner entry in Gmail signature
// @version       1.0
// @namespace     http://gmail.com
// @description   Fetches the last entry on a Feedburner feed and insert it to you Gmail signature with optional extra HTML you want. Github: https://github.com/lfilho/LastFeedburnerEntryInGmailSignature
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @author        lfilho@gmail.com
// ==/UserScript==

// Edit the ##YourFeed## with your feed name
var urlString = 'http://feeds.feedburner.com/##YourFeed##?format=sigpro'

var allBody = document.evaluate("//body[@class='editable  LW-avf']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (allBody.snapshotItem(0)) {
  var lastBlog = getFeedburnerLastBlog();
  var template = '<hr />Last blog: ' + lastBlog;

  allBody.snapshotItem(0).innerHTML = template + allBody.snapshotItem(0).innerHTML;
}

function getFeedburnerLastBlog() {
  var dynamic_part;
  GM_xmlhttpRequest({
    method: 'GET',
    url: urlString,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/plain'
    },
    onload: function(responseDetails) {
              tempText = responseDetails.responseText;
              tempText = replaceAll(tempText, /document.write\("(.+)"\);/g, "$1");
              tempText = replaceAll(tempText, /\\x/g, "%");
              tempText = unescape(tempText);

              var re = new RegExp('<span class="headline">(.+)<\/span>');
              var m = re.exec(tempText);
              tempText = m[1];

              GM_setValue("sig", tempText);
            }
  });

  return GM_getValue("sig", "Default")
};

function replaceAll(string, token, newtoken) {
  if (string.match(token)) {
    string = string.replace(token, newtoken);
  }
  return string;
}
