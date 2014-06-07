// ==UserScript==
// @name        paste2.org Download
// @namespace   c1b1.de
// @include     http://paste2.org/*
// @version     1
// @grant       none
// ==/UserScript==

function utf8_to_b64( str ) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding#Solution_.231_.E2.80.93_escaping_the_string_before_encoding_it
  return window.btoa(unescape(encodeURIComponent( str )));
}

if(document.getElementsByClassName('highlight code')) {
  var enc = document.characterSet?document.characterSet:'UTF-8';

  var pasteid = document.location.href.split('/').pop();

  var divs = document.getElementsByClassName('highlight code')[0].getElementsByTagName('div');
  var text = '';
  for(var i = 0; i < divs.length; ++i) {
    text += divs[i].firstChild.nodeValue + '\n';
  }
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.download = pasteid+'.txt';
  a.appendChild(document.createTextNode('Download'));
  li.appendChild(a);
  document.getElementById('secondary').getElementsByTagName('ul')[0].appendChild(li);
  a.href = 'data:text/plain;filename='+pasteid+'.txt;charset='+enc+';base64,'+utf8_to_b64(text);
}
