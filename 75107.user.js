// ==UserScript==
// @name           TehConnection :: Requests Search Box
// @namespace      GLaDOSDan
// @include        http*://*tehconnection.eu/*
// ==/UserScript==


var li = document.createElement('li');
li.innerHTML = '<span class="hidden">IMDB: </span><form action="requests.php" method="get"><input value="search" type="hidden" name="action" /><input onfocus="if (this.value == \'Requests\') this.value=\'\';" onblur="if (this.value == \'\') this.value=\'Requests\';" value="Requests" type="text" name="name" size="17" /><input value="Search" type="submit" class="hidden" /></form>';

var ul = document.querySelector('#searchbars ul');
ul.insertBefore(li, ul.children[4])