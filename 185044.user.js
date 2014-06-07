// ==UserScript==
// @name          TagPro tiles.png (and more) replacer
// @namespace     http://www.reddit.com/user/Watball
// @description   Provides an easy way to replace tiles.png, splats.png, flair.png, speedpad.png
// @include       http://tagpro-*.koalabeast.com*
// @license       WTFPL
// @author        Watball
// @version       2.0
// ==/UserScript==


// From http://www.quirksmode.org/js/cookies.html
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var stuff = ['tiles', 'splats', 'flair', 'speedpad'];

// Check for tiles, if it's there, replace errything.
if (document.getElementById('tiles')) {
    for (var i = 0; i < stuff.length; i++) {
        var url = readCookie(stuff[i] + 'url');
        if (url) {
            document.getElementById(stuff[i]).src = url;
        }
    }
}


// Check for presence of Play now button, if it's there, we're not in a game.
if (document.getElementById('play')) {
    // Because let isn't implemented yet. From http://stackoverflow.com/a/750506
    function createFunc(cookie) {
        return function(){document.cookie = cookie + '=' + this.value + '; expires=Fri, 06 Mar 2043 18:23:17 GMT'};
    }

    var urlDiv = document.createElement('div');
    urlDiv.style.margin = '8px';
    for (var i = 0; i < stuff.length; i++) {
        urlDiv.appendChild(document.createTextNode('URL to your ' + stuff[i] + '.png (blank for default):'));
        urlDiv.appendChild(document.createElement('br'));
        var urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.style.width = '80%';
        cookie = stuff[i] + 'url';
        urlInput.value = readCookie(cookie);
        cookieFunc = createFunc(cookie);
        urlInput.addEventListener('input', cookieFunc, false);
        urlDiv.appendChild(urlInput);
        urlDiv.appendChild(document.createElement('br'));
    }
    document.getElementsByClassName('section')[0].appendChild(urlDiv);