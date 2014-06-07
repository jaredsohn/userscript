
// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Alipay KillIE
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Kill IE for Alipay
// @include       https://www.alipay.com/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

var f=document.getElementById("login");

if (f != null)
{
var p = f.parentNode;
p.removeChild(f);

f = document.createElement("DIV");

f.innerHTML = "<form name=\"login\" action=\"https://www.alipay.com/user/login.htm\" method=\"post\"><input type=\"hidden\" name=\"support\" value =\" 000000\" />E-mail:<br /><input type=\"text\" name=\"_fmu.l._0.e\" value=\"\" tabindex=\"1\" /><br />密码:<br /><input type=\"password\" name=\"_fmu.l._0.p\"  value=\"\"  tabindex=\"2\" /><br />验证码:<br /><input type=\"text\" name=\"_fmu.l._0.c\" value=\"\" maxlength=\"4\" tabindex=\"3\" /><img src=\"https://www.alipay.com/user/checkcode\" border=\"0\" /><br /><input name=\"submit\" type=\"submit\" value=\"登录\" /><input type=\"hidden\" name=\"action\" value=\"login_action\" /><input type=\"hidden\" name=\"goto\" value=\"\" /><input type=\"hidden\" name=\"event_submit_do_login\" value=\"anything\" /></form>";

p.insertBefore(f, p.firstChild);
}
else
{
f=document.getElementById("rightlogin");
if (f != null){
f.innerHTML = "<form name=\"login\" action=\"https://www.alipay.com/user/login.htm\" method=\"post\"><input type=\"hidden\" name=\"support\" value =\" 000000\" />E-mail:<br /><input type=\"text\" name=\"_fmu.l._0.e\" value=\"\" tabindex=\"1\" /><br />密码:<br /><input type=\"password\" name=\"_fmu.l._0.p\"  value=\"\"  tabindex=\"2\" /><br />验证码:<br /><input type=\"text\" name=\"_fmu.l._0.c\" value=\"\" maxlength=\"4\" tabindex=\"3\" /><img src=\"https://www.alipay.com/user/checkcode\" border=\"0\" /><br /><input name=\"submit\" type=\"submit\" value=\"登录\" /><input type=\"hidden\" name=\"action\" value=\"login_action\" /><input type=\"hidden\" name=\"goto\" value=\"\" /><input type=\"hidden\" name=\"event_submit_do_login\" value=\"anything\" /></form>";
}
}
