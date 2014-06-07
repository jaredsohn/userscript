// ==UserScript==
// @name           What.CD Add signature to PM
// @author         dewey
// @namespace  dewey
// @include        http://what.cd/inbox.php*
// @include        https://ssl.what.cd/inbox.php*
// @description  Add signature to private messages.
// @version        1.0.0
// ==/UserScript==

var quote = "Your own Britney Spears Quote!";
var textarea = document.getElementById('body');
textarea.innerHTML = "\n[color=#ff00ff]--\n"
                    +"[i]" + quote
                    +"[/i][/color]";