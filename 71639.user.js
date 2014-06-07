// ==UserScript==
// @name           QuickSearch
// @namespace      C:\GreaseMonkey\so.js
// @include        http://*darkwarez.pl/forum/*
// ==/UserScript==

var quicksearch = document.createElement("div");
quicksearch.setAttribute('style', 'position: fixed; top: -50px; left: 0pt; right: 0pt; width: 100%; margin: 0pt; z-index: 9999; background: url(http://www.opieka-nad-grobami.net.pl/SiteImage/IdeaBackground.gif); border-bottom: 1px solid rgb(43, 43, 43);');
quicksearch.setAttribute('id', "pasek");
quicksearch.innerHTML = '<table style="border-spacing:0"><tr><td width="50px"><div style="margin: 0 0 0 9px; width: 40px;height: 28px; background: url(http://i43.tinypic.com/2nshfa.png);background-position: 0px 29px;cursor:pointer;position:relative;top:-2px" onmouseover="this.style.backgroundPosition = \'40px 29px\'" onmouseout="this.style.backgroundPosition = \'0px 29px\'" onclick="document.getElementById(\'pasek\').style.top = -50"></div></td><td width="100%" style="padding: 6px;text-align:center;font-family: Verdana; font-size: 11px;"><form action="search.php?mode=results" method="post" style="margin:0" name="qs"><input type="hidden" value="topics" name="show_results"><input type="hidden" name="search_terms" value="all"/><input type="hidden" name="search_cat" value="1"/>Szukaj <input type="text" class="post" name="search_keywords" style="margin: 0pt; width: 194px;" maxlength="150"><input type="radio" value="posts" name="only_topics" onChange="document.forms[\'qs\'].show_results.value = \'posts\';">Posty<input type="radio" value="topics" name="only_topics" checked="checked" onChange="document.forms[\'qs\'].show_results.value = \'topics\';">Tematy <input type="image" style="position: relative; top: 3px;" src="http://i44.tinypic.com/28v6c6f.png" value="Szukaj" name="submit"></form></td></tr></table>';
document.body.appendChild(quicksearch);

var navi = document.createElement("div");
navi.setAttribute('style', 'position: fixed; top: 0;left: 0pt; margin: 0 0 0 10px;z-index: 9998; width: 40px;height: 28px; background: url(http://i43.tinypic.com/2nshfa.png);background-position: 0px 0px;cursor:pointer;');
navi.setAttribute('onmouseover', "this.style.backgroundPosition = '40px 0'");
navi.setAttribute('onmouseout', "this.style.backgroundPosition = '0px 0'");
navi.setAttribute('onclick', "document.getElementById('pasek').style.top = 0");
document.body.appendChild(navi);