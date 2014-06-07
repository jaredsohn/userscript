// ==UserScript==
// @name       Mthai Lyrics Grabber
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://lyrics.mthai.com/song/*/*.html
// @copyright  2012+, You
// ==/UserScript==

var _title = document.getElementById('content_wrap').getElementsByTagName('strong')[2].innerHTML;
var title = _title.substr(10,_title.length);
var artist = document.getElementById('content_wrap').getElementsByTagName('strong')[0].innerHTML;
var lyrics_node = document.getElementById('content_wrap').getElementsByTagName('p');
var lyrics = lyrics_node[3].innerHTML;

var p
    var p_amount =  lyrics_node.length;
var p_last = p_amount - 3;

for (p = 3; p <= p_last; p++)
{
    lyrics += lyrics_node[p].innerHTML + '<br>';
        }

lyrics = lyrics.replace(/<br[^>]*>/g, "\n");

alert(title);
alert(artist);    
alert(lyrics);
