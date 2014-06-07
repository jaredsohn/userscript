// ==UserScript==
// @name LinkedIn Comment Expander
// @namespace mailto:andrew.livesay@gmail.com
// @description Automatically expand all LinkedIn discussion comments. :D
// @include http://linkedin.com/*
// @include http://*.linkedin.com/*
// ==/UserScript==

function reformat_innerHTML(val)
{
    var reg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    val = val.replace(/\n/g, '<br />');
    val = val.replace(reg,'<a href=\"$1\">$1</a>');
    return val;
}

var popular_items = document.getElementsByClassName ('popular-item comment');

for (var i in popular_items) {
  var entity_text = popular_items[i].getElementsByClassName('popular-entity')[0].getElementsByTagName('img')[0].getAttributeNode ('data-li-comment-text').nodeValue;
   
  if (null != entity_text) {
    var text_node = popular_items[i].getElementsByClassName ('popular-content')[0].getElementsByClassName ('comment-body')[0];

    // XPCNativeWrappers
    if (null != text_node) {
      var spans = text_node.getElementsByTagName("span");
      for (var s in spans) {
        if (spans[s].className == "text") {
          var span = spans[s];
          span.innerHTML = reformat_innerHTML(entity_text);    
        }
      }
    }
  }
}

