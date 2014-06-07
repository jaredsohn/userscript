// ==UserScript==
// @name           What.CD: Wiki Search Addition and Request Search Removal
// @namespace      http://userscripts.org/users/494177
// @author         Looped (w/ source from darkip)
// @version        1.2
// @description    Adds a Wiki search bar on each page and removes Requests search
// @include        http*://*what.cd*
// ==/UserScript==


li = document.createElement('li');

li.innerHTML = '<span class="hidden">Wiki: </span><form action="wiki.php" method="get"><input type="hidden" name="action" value="search"><input onfocus="if (this.value == \'Wiki\') this.value=\'\';" onblur="if (this.value == \'\') this.value=\'Wiki\';" value="Wiki" type="text" name="search" size="20" /></form>';

document.getElementById('searchbars').firstChild.nextSibling.appendChild(li);

GM_addStyle("#searchbar_requests { display: none!important; }");