// ==UserScript==
// @name          Online Radio URL Extractor
// @version       0.1
// @description   Shows the five most recent comments
// @include	  http://radio.media.hinet.net/player/cat_player.asp*

// This is a open source script. You are welcome to modify, redistribute, and put on any place for download.
// ==/UserScript=

(function() {

var player_document = parent.player.document;
var input_tags = player_document.getElementsByTagName('input');

for(var i=0; i<input_tags.length; i++) {
    if(input_tags[i].name == 'media_url') {
	var text = input_tags[i].value;
	var re = /(mms:\/\/live.media.hinet.net\/radio.*\?.*)$/;
	var url = re.exec(text)[1];
	break;
    }
}

var s = document.createElement('div');
s.style.margin = '20px';
s.style.fontFamily = 'Verdana, Arial, sans-serif';
s.style.fontSize = '12px';
s.appendChild(document.createTextNode('The following link is for Firefox users. Click the mms link will launch Windows Media Player.'));
s.appendChild(document.createElement('br'));
s.appendChild(document.createElement('br'));
s.appendChild(document.createTextNode('mms URL: '));
var link = document.createElement('a');
link.href = url;
link.innerHTML = url;
s.appendChild(link);
player_document.body.appendChild(s);

})();

