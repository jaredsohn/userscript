// ==UserScript==
// @name           Teagames
// @namespace      Test
// @description    Play games directly at www.teagames.com
// @include        http://*teagames.com/games/*/*
// ==/UserScript==
longstring=location.href;
brokenstring=longstring.split('/');
if (brokenstring[5] == "play.php") {
redirection="http://www.teagames.com/games/" + brokenstring[4] + "/play.php?start=1";
location.replace(redirection);
}