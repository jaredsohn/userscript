// ==UserScript==
// @name          mp3quran.net Mp3 Player
// @namespace     www.achland.com
// @description   Mp3 flash player for mp3quran.net
// @include       http://*mp3quran.net/media.php?file=*.mp3
// ==/UserScript==

flashPlayer="http://img360.imageshack.us/img360/2829/playergd1.swf";

mp3File=document.getElementsByName('URL')[0].value;
newp=document.createElement('p');

newp.innerHTML='<object type="application/x-shockwave-flash" data="'+flashPlayer+'" id="audioplayer1" height="24" width="290">'+
'<param name="movie" value="'+flashPlayer+'">'+
'<param name="FlashVars" value="playerID=1&amp;'+
'soundFile='+mp3File+'&amp;'+
'bg=0xf8f8f8&amp;'+
'leftbg=0xeeeeee&amp;'+
'lefticon=0x666666&amp;'+
'rightbg=0xcccccc&amp;'+
'rightbghover=0x999999&amp;'+
'righticon=0x666666&amp;'+
'righticonhover=0xffffff&amp;'+
'text=0x666666&amp;'+
'slider=0x666666&amp;'+
'track=0xFFFFFF&amp;'+
'border=0x666666&amp;'+
'loader=0x9FFFB8&amp;'+
'loop=no&amp;'+
'autostart=yes&amp;'+
'">'+
'<param name="quality" value="high">'+
'<param name="menu" value="false">'+
'<param name="wmode" value="transparent">'+
'</object>'

oldp=document.getElementsByTagName("p")[0];
oldp.appendChild(newp);
