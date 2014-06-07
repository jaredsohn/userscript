// ==UserScript==
// @name           Group Sorter
// @namespace      Group Sorter
// @description    As one might anticipate, this script makes milkshakes.
// @include        http://www.bungie.net/Account/Profile.aspx?page=Chapters
// @include        http://admin.bungie.net/Account/Profile.aspx?page=Chapters
// ==/UserScript==

var links = document.getElementsByClassName('arrow1').item(0), savedLength = localStorage.getItem("GroupsLength"), scripts = document.createElement('div'), unsortedHTML = document.getElementsByClassName("list-c").item(0), unsortedLength = document.getElementsByClassName("arrow4").length;

if (savedLength != unsortedLength)
{
localStorage.removeItem("GroupsHTML");
localStorage.removeItem("GroupsLength");
}
else
{
unsortedHTML.innerHTML = localStorage.getItem("GroupsHTML");
}

scripts.id = 'scripts';scripts.innerHTML = '<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js" type="text/javascript"></script><script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js" type="text/javascript"></script><script type="text/javascript">$(document).ready(function() { $(\".list-c\").eq(0).sortable(); $(\".save\").click(function() { var setHTML = $(\".list-c\").eq(0).html(),groupsLength = $(\".arrow4\").length;localStorage.setItem("\GroupsLength\", groupsLength);localStorage.setItem(\"GroupsHTML\", setHTML);$(this).text(\"Changes Saved\");$(this).addClass(\"depress\");});});</script>';
document.body.appendChild(scripts);
links.innerHTML += '<li style="background: none;"><a class="save" href="javascript:;">Save Changes</a></li>';
GM_addStyle(".save { background: -moz-linear-gradient(#093E60, #000); -moz-border-radius: 3px; color: #A3A3A4 !important; display: block; height: 25px; line-height: 25px; width: 98px; border: 1px solid #5C5D5F; font-weight: normal !important; } .save:hover { background: -moz-linear-gradient(#093E60, #0F5989); color: #DCE8EE !important; text-decoration: none; } .save.depress { color: #F00000 !important; } .save.depress:hover { background:  -moz-linear-gradient(#093E60, #000); cursor: default; } ul.arrow4 { cursor: move; }");