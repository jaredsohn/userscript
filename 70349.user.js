// ==UserScript==
// @name           Yahoo Updates Enhancements
// @namespace      http://twitter.com/ziru
// @include        http://profiles.yahoo.com/updates/*
// @include        http://profiles.yahoo.com/
// @include        http://profiles.yahoo.com/u/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// =================  MAIN ================= 
var URL_REGEX = /(^|^.*[^>"])((http|ftp|https):\/\/[^\s]*)(\s|$)/;
function linkifyText(text) {
  while (true) {
    var m=URL_REGEX.exec(text);
    if (!m) break;
    text = text.replace(URL_REGEX, '$1<a href="$2">$2</a>');
  }
  return text;
}

function handleTweetEntry(entry) {
  if ($(entry).attr('processed') == 'true') return;    // already processed
  var tweetItem = $('.item', entry);
  var tweetContent = $(tweetItem).text();
  var tweetUrl = $(tweetItem).attr('href');
  $(tweetItem).replaceWith('<span class="tweet">' + linkifyText(tweetContent) + '</span>');
  $('.ycw-updated span', entry).replaceWith('<a href="' + tweetUrl + '">' + $('.ycw-updated', entry).html() + '</a>');
  $(entry).attr('processed', 'true');
}

function main() {
  $('.hentry[id^=ycw-agg_twitter_]').each(function(idx) { handleTweetEntry($(this)); });
}

function onNodeInserted(evt) {
  // GM_log('DOM Node Inserted: tagName = ' + evt.target.tagName);
  if (evt.target.tagName == 'UL')
    main();
}

$(document).ready(function() { main(); });
$('body').bind('DOMNodeInserted', onNodeInserted);