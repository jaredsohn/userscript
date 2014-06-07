// ==UserScript==
// @name           Add Link To Userbar
// @namespace      TC
// @description    Add Link To Userbar
// @include        http*://*tehconnection.eu*
// ==/UserScript==

var li = document.createElement('li');
li.innerHTML = '<a href="https://tehconnection.eu/log.php">Log</a>';
var ul = document.getElementById('user_menu');
ul.insertBefore(li, ul.children[6])