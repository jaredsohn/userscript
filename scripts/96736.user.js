// ==UserScript==
// @name           What.CD Wiki search bar adder
// @namespace      http://userscripts.org/users/52197
// @author         darkip
// @version        1.0
// @description    Adds a Wiki search bar on each page
// @include        http*://*what.cd*
// ==/UserScript==

li = document.createElement('li');

li.innerHTML = '<span class="hidden">Wiki: </span><form action="wiki.php" method="get"><input type="hidden" name="action" value="search"><input onfocus="if (this.value == \'Wiki\') this.value=\'\';" onblur="if (this.value == \'\') this.value=\'Wiki\';" value="Wiki" type="text" name="search" size="20" /></form>';

document.getElementById('searchbars').firstChild.nextSibling.appendChild(li);