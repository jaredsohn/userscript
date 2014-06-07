// ==UserScript==
// @name Full Screen RuneScape
// @namespace http://userscripts.org/users/73089
// @description Removes all additional (unwanted) elements from the RuneScape game page.
// @include http://www.runescape.com/game.ws?m=1&j=1
// @include http://*.runescape.com/m1
// ==/UserScript==
if (document.location.href == 'http://www.runescape.com/game.ws?m=1&j=1')
{
        // Bust the frame (necessary).
        document.location = document.getElementsByTagName('frame')[0].getAttribute('src');
}
else
{
        // Get the actual game area.
        var gameArea = document.getElementById('gameframe');
        
        if (gameArea)
        {
                setTimeout('document.getElementsByTagName(\'body\')[0].insertBefore(document.getElementById(\'gameframe\'), document.getElementById(\'gametable\'))', 5000);
                setTimeout('document.getElementById(\'gametable\').parentNode.removeChild(document.getElementById(\'gametable\'))', 5000);
        }
}