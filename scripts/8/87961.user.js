// ==UserScript==
// @name         Basecamp Long Links
// @namespace    basecamp.long.links
// @include      http://*.basecamphq.com/*
// @include      https://*.basecamphq.com/*
// @version      0.1
// @author       Piotr Petrus
// @description  Breaks down long URLs preventing layout wrap.
// ==/UserScript==

(function(d){
  
  var wrap_break = function(text, br) {
    var delimit = 35;
    var style = 0;
    var words = text.split(' ');
    var new_words = [];
    for (var i = 0; i < words.length; i++) {
      var word = words[i],
          length = word.length,
          times = parseInt(length / delimit, 10),
          rest = length % delimit,
          bits_array = [],
          last_bit = '';
      for (var j = 1; j < times + 1; j++) {
        var start = (j - 1) * delimit;
        var end = j * delimit;
        var pass = word.substring(start, end);
        if ((j == times) && (rest > 0)) {
          if (rest <= style) {
            pass += word.substring(end, length);
          } else {
            last_bit = word.substring(end, length);
          }
        }
        bits_array.push(pass);
        if (last_bit) {
          bits_array.push(last_bit);
        }
      }
      var new_word = bits_array.join(br);
      new_words.push(new_word);
    }
    var new_text = new_words.join(' ');
    return new_text;
  };

  var body = d.getElementById('screen_body');
  if (body) {
    var links = body.getElementsByTagName('a');
    for (var i=0; i < links.length; i++) {
      var link = links[i];
      if (link.firstChild && link.firstChild.nodeType === 3) {
        var node_value = link.firstChild.nodeValue;
        if ((!node_value.match(/\s+/)) && (node_value.length > 35)) {
          var new_node_value = wrap_break(node_value, '<wbr>');
          link.innerHTML = new_node_value;
        }
      }
    }
  }
})(document);