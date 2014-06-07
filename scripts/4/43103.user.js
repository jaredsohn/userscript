// ==UserScript==
// @name           4chan to dopechan
// @namespace      http://userscripts.org/users/81883
// @description    Upload image from 4chan directly to dopechan
// @include        http://img.4chan.org/*/*.html
// ==/UserScript==

var images = document.getElementsByTagName('img');
var forms = document.getElementsByClassName('filesize');
var difference = images.length - forms.length;

for (i = 0; i <= images.length; i++) {
    if (images[i].parentNode.innerHTML.indexOf('http://img.4chan') != -1) {
        dopemuncher = document.createElement('font');
        dopemuncher.innerHTML = "</a><a href=\"http://dopemuncher.com/index.php?action=4chan&info=" + images[i].parentNode + "\" target=\"_blank\">Upload this to Dopemuncher!</a><br>";
        forms[(i-(difference))].parentNode.insertBefore(dopemuncher, forms[(i-(difference))]);
    }
}