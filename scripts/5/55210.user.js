// ==UserScript==
// @name           Pennergame Radio By basti1012 version 2 mit video
// @namespace      pennergame Radio by basti1012  (http://pennerhack.foren-city.de).version 6 Ueberarbeitet von NewMan (http://ego-shooters.net)
// @description    fuegt euch ein kleines radio mit Live bild auf den pennergame sseiten ein.
// @include        http://*pennergame.de*
// @include        http://*berlin.pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*dossergame.co.uk*
// ==/UserScript==


var hoch = '0';
var breit= '0';


var link =''
+'<div style="width:167px;margin:0 auto;">'


+'<a href="http://www.pop-radio.de/videoplayer.php?stream=2" style="display: block; width: 320px; height: 240px;" id="player1">'
+'<object id="player1_api" data="http://www.pop-radio.de/scripts/videoplayer/flowplayer-3.1.1.swf?0.23200957169421188" type="application/x-shockwave-flash" width="100%" height="100%">'
+'<param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="quality" value="high"><param name="bgcolor" value="#000000">'
+'<param name="flashvars" value="config={&quot;playlist&quot;:[{&quot;url&quot;:&quot;http://www.pop-radio.de/images/modprofil/mrlion.jpg&quot;,&quot;scaling&quot;:&quot;orig&quot;},{&quot;url&quot;:&quot;http://w1.pop-stream.de/pop1.php&quot;,&quot;autoPlay&quot;:false,&quot;autoBuffering&quot;:true}],&quot;plugins&quot;:{&quot;controls&quot;:{&quot;play&quot;:true,&quot;volume&quot;:true,&quot;mute&quot;:true,&quot;time&quot;:false,&quot;stop&quot;:true,&quot;playlist&quot;:false,&quot;fullscreen&quot;:true,&quot;scrubber&quot;:false}},&quot;playerId&quot;:&quot;player1&quot;,&quot;clip&quot;:{&quot;url&quot;:&quot;#&quot;}}"></object></a>';




