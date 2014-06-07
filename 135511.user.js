// ==UserScript==
// @name           What.CD Add signature
// @author         dewey
// @namespace  dewey
// @include        http://what.cd/forums.php*
// @include        https://ssl.what.cd/forums.php*
// @description  Add signature to forum posts.
// @version        1.0.0
// ==/UserScript==

var quote = "Your own Britney Spears Quote!";
var textarea = document.getElementById('quickpost');
textarea.innerHTML = "\n[color=#ff00ff]--\n"
                    +"[i]" + quote
                    +"[/i][/color]";