// ==UserScript==
// @name       View Recent Quoted Thread.
// @namespace  http://leakforums.org/
// @version    1.2
// @description  View Recent Quoted Thread.
// @match      http://*leakforums.*/*
// @grant       GM_getValue
// @grant       GM_setValue
// @copyright  2013+, osc-rwar
// ==/UserScript==

var txt=document.getElementById('panel').innerHTML;
var p = new RegExp("((Welcome back, )(<[^>]+>)(<[^>]+>)((?:[a-z][a-z0-9_-]*)).*?(<[^>]+>)(<[^>]+>))",["i"]);
var m = p.exec(txt);
if (m != null){var var1=m[5];}
var find = "<a href=\"http://www.leakforums.org/search.php?action=getnewleaks\">View New Leaks</a> | <a href=\"http://www.leakforums.org/search.php?action=getdaily\">View Today's Posts</a>";
var replace = '<a href=\"http://www.leakforums.org/search.php?action=getnewleaks\">View New Leaks</a> | <form style="display: inline" method="post" action="search.php" id="quoted_search"><input type="hidden" name="action" value="do_search"><input type="hidden" name="postthread" value="1"><input type="hidden" name="forums[]" value="all"><input type="hidden" name="postdate" value="3"><input type="hidden" name="pddir" value="1"><input type="hidden" name="threadprefix" value="all"><input type="hidden" name="sortby" value="lastpost"><input type="hidden" name="sortordr" value="desc"><input type="hidden" name="showresults" value="posts"><input type="hidden" name="keywords" value="XXXXXXXXXXXXXXXXXXXX"></form><a onmousedown="if(event.button != 0) { document.getElementById(\'quoted_search\').setAttribute(\'target\', \'_blank\'); }" oncontextmenu="return;" onkeydown="document.getElementById(\'quoted_search\').setAttribute(\'target\', \'_blank\'); document.getElementById(\'quoted_search\').submit();" href="javascript:document.getElementById(\'quoted_search\').submit();">View Quoted Posts</a> | <a href=\"http://www.leakforums.org/search.php?action=getdaily\">View Today\'s Posts</a>';
replace = replace.replace("XXXXXXXXXXXXXXXXXXXX", "[quote="+var1+"]");
document.getElementById('panel').innerHTML = document.getElementById('panel').innerHTML.replace(find, replace);