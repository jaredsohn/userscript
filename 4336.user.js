// ==UserScript==
// @name           365online login focus
// @namespace      http://www.skynet.ie/~mark/
// @description    Focus the user id entry of Bank Of Ireland's buggy 365online login page
// @include        https://www.365online.com/servlet/Dispatcher/login.htm

// ==/UserScript==

window.addEventListener('load',
                        function(event) { document.getElementById('txt_userid').focus(); },
                        false);
