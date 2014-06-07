// ==UserScript==
// @run-at         document-start
// @name           Grooveshark HTML5 support for Firefox on Linux
// @namespace      http://develcuy.com
// @description    A user script for html5.grooveshark.com. Allows to fallback HTML player to the native player (OS dependant). Integrates well with VLC.
// @author         develCuy (Fernando Paredes Garcia)
// @version        1.0
// @grant          none
// @include        *://html5.grooveshark.com/*
// @license          GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function(xhr) {
  var div = document.createElement('div');
  div.setAttribute('id', 'player_wrapper');
  div.setAttribute('style', 'margin-left: 2em;');

  function play(stream_url) {
    div.innerHTML  = '<embed id="custom_player" src="'+stream_url+'" width="1" height="1" style="margin-left:20em;" autoplay="true" loop="false"></embed>';
    document.getElementsByTagName('body')[0].appendChild(div);
    console.log('Grooveshark HTML5 player patched by develCuy!');
  }

  var open = XMLHttpRequest.prototype.open;

  xhr.prototype.open = function() {
    if (arguments[0] == 'POST' && /^\/more\.php\?getStreamKeyFromSongIDEx/.test(arguments[1])) {
      var stream_url = '';
      var onreadystatechange = this.onreadystatechange;
      this.onreadystatechange = function () {
        if (this.readyState == 4 && this.status >= 200 && this.status < 300 && !/^\s*$/.test(this.responseText)) {
          try {
            var res = JSON.parse(this.responseText);
            stream_url = 'http://' + res.result.ip + '/stream.php?streamKey=' + res.result.streamKey;
            play(stream_url);
          }
          catch(n) {
            console.log('Invalid response!');
          }
        }
      }
    }
    open.apply(this, arguments);
  };
})(XMLHttpRequest);
