// ==UserScript==
// @name           ControlPanel
// @namespace      RaceBot
// @description    Check if it's your turn in a race for the galaxy game and provide access to the rest of the site without opening another tab (only works if you have one game running)
// @include        http://genie.game-host.org/game.htm*
// ==/UserScript==

var body = document.getElementsByTagName('body');

body[0].innerHTML = body[0].innerHTML + "<h2>Control Panel</h2><iframe src='http://genie.game-host.org/activelist.htm' width='100%' height='200'>test</iframe>";