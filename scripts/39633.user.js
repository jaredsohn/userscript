// ==UserScript==
// @name           MP Forum
// @description    Tweaks for the new Mike Portnoy forum.
// @include        http://www.mikeportnoy.com/forum/*
// @include        http://mikeportnoy.com/forum/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
$(".ForumLinkDivRow")
.append("<div style='float:left'><a href='javascript:openWindow(\"/login.aspx\");'><img src='/common/images/login.jpg'/></a></div>")
.append("<div style='float:left'><a href='javascript:openWindow(\"/logout.aspx\");'><img src='/common/images/logout.jpg'/></a></div>")
.children().css('float', 'left').css('margin-right', '0.5em').css('height', '1em');
//.end().append("<hr style='display:block;visibility:hidden;clear:left;margin:0px;height:0px;'/>");