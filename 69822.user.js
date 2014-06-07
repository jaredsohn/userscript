// ==UserScript==
// @name           TehConnection :: Search By IMDB #
// @namespace      GLaDOSDan
// @include        http*://*tehconnection.eu*
// ==/UserScript==

var httpsorno = location.href.substr(0, 5);

var li = document.createElement('li');
li.innerHTML = '<span class="hidden">IMDB: </span><form action="https://gladosdan.com/tc/imdb_tc_translate.php" method="get"><input type="hidden" value="' + httpsorno + '" name="https" /><input value="search" type="hidden" name="action" /><input onfocus="if (this.value == \'IMDB\') this.value=\'\';" onblur="if (this.value == \'\') this.value=\'IMDB\';" value="IMDB" type="text" name="input" size="17" /><input value="Search" type="submit" class="hidden" /></form>';

var ul = document.querySelector('#searchbars ul');
ul.insertBefore(li, ul.children[1])