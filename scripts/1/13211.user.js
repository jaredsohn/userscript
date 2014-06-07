



// ==UserScript==
// @name           MySpace Photobucket quick-grab
// @namespace      http://myspace.com/wolfreak_99
// @description    Adds a small Photobucket box to myspace pages that include writing something.
// @include        http://*myspace.com*profile.interests*
// @include        http://*myspace.com*blog.create*
// @include        http://*myspace.com*blog.comment*
// @include        http://*myspace.com*bulletin.edit*hash*
// @include        http://*myspace.com*bulletin.edit*
// @include        http://*myspace.com*mail.reply*
// @include        http://*myspace.com*mail.message*
// ==/UserScript==

var forumMenu = document.createElement("div");
forumMenu.setAttribute('id','forumMenu')

forumMenu.innerHTML = '<table><tr><td style="background:transparent; border:0px;"><div id="quicknav"><iframe src="http://photobucket.com/svc/jwidget.php?width=200&height=600&largeThumb=true&bg=%23FFFFFF&linkType=tag&border=true&dividers=true&textcolor=%23000000&linkcolor=%230000FF&logo=light&media=both&pbaffsite=131" bgcolor=222222 width=210 height=610 frameborder=0 scrolling=no allowtransparency=true></iframe></td></tr><tr><td><a onclick="document.getElementById(\'quicknav\').style.display = ( document.getElementById(\'quicknav\').style.display == \'none\' ? \'block\':\'none\')" title="Open/Close Photobucket Browser" style="border:1px solid; border-color:000000; background-color:FFFFFF;">&nbsp;<strong>Open/Close<br>&nbsp;Photo<font color="Blue">B</font>ucket</strong>&nbsp;</a></td></tr></table></div>';

document.body.insertBefore(forumMenu, document.body.firstChild);
document.getElementById('quicknav').style.display = 'none';

var s=
  '#forumMenu {display:table!important; position: fixed; width: auto; height: 15px; z-index: 1; center; top:0;background-color:transparent;-moz-border-radius:0px 10px 10px 0px;}'
+ '#forumMenu a {display: block; text-decoration: none!important;color:131313!important;font-family:Verdana!important;font-size:10px!important;font-weight:bold!important;font-style:normal!important;}'
;

GM_addStyle (s);









