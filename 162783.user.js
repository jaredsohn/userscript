// ==UserScript==
// @name        ShowLinkOnKong
// @namespace   kongregate.com
// @include     http://www.kongregate.com/games/*
// @version     1
// ==/UserScript==

function getNode(xpath, doc) {
  if (doc == null) doc = document;
  return document.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
}

function showLinkOnKong() {
  var element = getNode('//*[@id="linkshare"]');
  if (element!==null) return;
  var form = getNode('//form[@id="new_game_post_feed_item"]');
  if (form !== null) {
    element = getNode('//form[@id="new_game_post_feed_item"]//div[contains(@class,"bd")]');
    if (element !== null) {
      var lines = element.innerHTML.split('\n');
      var output = getNode('//form[@id="new_game_post_feed_item"]//div[contains(@class,"bd")]/p');
      var result = '';
      var patId = /^.* id="shout_api_params_([^"]*)".*$/;
      var patVal = /^.* value="([^"]*)".*$/;
      for (i=0; i<lines.length; i++) {
        if (patId.test(lines[i])) {
          result += lines[i].replace(patId, "$1") + "=" + lines[i].replace(patVal, "$1") + '&';
        }
      }
      result = result.slice(0,-1);
      var url = window.location.href.split('?')[0]+"?"+result;
        output.innerHTML = '<p>Copy link from <a id=linkshare href="'+url+'">this</a> or this: <textarea>'+url+'</textarea>'
    }
  }
}

setInterval(showLinkOnKong, 1000);
