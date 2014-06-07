// azad university sida system firefox fix
// version 1.2
// 2009-04-10
// Copyright (c) 2005, faraz akbarpour
// email: faraz218 gmail com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          sida system fix 
// @namespace     http://diveintogreasemonkey.org/download/
// @description   this script fix unscroll pages in firefox for morvarid samaneh
// @include       */Portal/Std/*
// @include       */Portal/Salary/*
// @include       */80.191.120.120/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { position:relative ! important; }');



document.getElementById('upp_login').innerHTML ="\n     <div id=\"div_login\" style=\"text-align: center;\">\n<table cellpadding=\"0\" cellspacing=\"0\">\n<tbody>\n<tr>\n<td id=\"tlc3_l\">\n<input id=\"ctrl_login_imgB_close\" style=\"border-width: 0px; float: left;\" src=\"images/Box_login/TLC.jpg\" name=\"ctrl_login$imgB_close\" ilo-full-src=\"http://80.191.120.120/images/Box_login/TLC.jpg\" type=\"image\">\n</td>\n<td id=\"t3_l\"> </td>\n<td id=\"trc3_l\"> </td>\n</tr>\n<tr>\n<td id=\"l3_l\"> </td>\n<td style=\"width: 870px; height: 222px; background-color: rgb(244, 244, 244);\">\n<div id=\"div2\" style=\"float: right; width: 330px; direction: ltr; font-size: 13px; text-align: right; background-color: rgb(244, 244, 244);\">\n<table width=\"325\">\n<tbody>\n<tr>\n<td colspan=\"2\" style=\"border-bottom: 1px solid rgb(225, 225, 225); text-align: right; direction: rtl;\">\n<img style=\"float: right;\" src=\"images/login/icon_login.jpg\" alt=\"\" ilo-full-src=\"http://80.191.120.120/images/login/icon_login.jpg\">\n<span id=\"ctrl_login_lb_login\" style=\"color: Gray; font-size: 11px; float: right;\">ورود به سیستم</span>\n</td>\n</tr>\n<tr>\n<td style=\"text-align: right; direction: rtl; margin-right: 40px;\">\n<table id=\"ctrl_login_rbl_type\" style=\"font-size: 12px; width: 178px; direction: rtl; text-align: right;\" onmouseup=\"javascript: ctrl_login_txt_username.focus(); return false;\" border=\"0\">\n<tbody>\n<tr>\n<td>\n<input id=\"ctrl_login_rbl_type_0\" value=\"teacher\" name=\"ctrl_login$rbl_type\" type=\"radio\">\n<label for=\"ctrl_login_rbl_type_0\">استاد</label>\n</td>\n<td>\n<input id=\"ctrl_login_rbl_type_1\" value=\"employee\" name=\"ctrl_login$rbl_type\" type=\"radio\">\n<label for=\"ctrl_login_rbl_type_1\">کارمند</label>\n</td>\n<td>\n<input id=\"ctrl_login_rbl_type_2\" checked=\"checked\" value=\"student\" name=\"ctrl_login$rbl_type\" type=\"radio\">\n<label for=\"ctrl_login_rbl_type_2\">دانشجو</label>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n<td style=\"padding: 3px; text-align: right;\">\n<span id=\"ctrl_login_lb_type\" style=\"font-size: 12px;\">: نوع کاربر </span>\n</td>\n</tr>\n<tr>\n<td style=\"text-align: right;\">\n<input id=\"ctrl_login_txt_username\" style=\"width: 180px;\" maxlength=\"30\" name=\"ctrl_login$txt_username\" type=\"text\">\n</td>\n<td style=\"text-align: right;\">\n<span id=\"ctrl_login_Label1\" style=\"font-size: 12px;\">: کد کاربری </span>\n</td>\n</tr>\n<tr>\n<td style=\"text-align: right;\">\n<input id=\"ctrl_login_txt_password\" style=\"width: 180px; text-align: left;\" maxlength=\"30\" name=\"ctrl_login$txt_password\" type=\"password\">\n</td>\n<td style=\"text-align: right;\">\n<span id=\"ctrl_login_Label2\" style=\"font-size: 12px;\"> : کلمه عبور</span>\n</td>\n</tr>\n<tr>\n<td style=\"text-align: right; padding-top: 5px; padding-right: 12px; direction: rtl;\">\n<input id=\"ctrl_login_btn_enter\" style=\"border: medium none ; background: transparent url(images/login/login.jpg) repeat scroll 0% 0%; height: 30px; width: 79px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\" onclick=\"javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(\" ctrl_login$btn_enter=\"\" true,=\"\" ,=\"\" false,=\"\" false))=\"\" value=\"\" name=\"ctrl_login$btn_enter\" type=\"submit\">\n<input id=\"ctrl_login_btn_cancel\" style=\"border: medium none ; background: transparent url(images/login/cancel.jpg) repeat scroll 0% 0%; height: 30px; width: 79px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\" onclick=\"javascript:__doPostBack('ctrl_login$btn_cancel','')\" value=\"\" name=\"ctrl_login$btn_cancel\" type=\"button\">\n</td>\n<td style=\"text-align: right;\"> </td>\n</tr>\n<tr>\n<td style=\"padding: 3px; text-align: right;\" colspan=\"2\">\n<span id=\"ctrl_login_RequiredFieldValidator2\" style=\"border-color: Red; padding: 3px; color: Red; font-size: 12px; visibility: hidden;\">کلمه عبور مشخص نیست</span>\n<span id=\"ctrl_login_RequiredFieldValidator1\" style=\"border-color: Red; padding: 3px; color: Red; font-size: 12px; visibility: hidden;\">کد کاربری مشخص نیست</span>\n</td>\n</tr>\n<tr>\n<td style=\"text-align: right;\" colspan=\"2\">\n<span id=\"ctrl_login_lb_WarnNote\" style=\"display: inline-block; color: rgb(204, 0, 0); font-size: 12px; width: 100%;\">\n</span></td>\n</tr>\n</tbody>\n</table>\n</div>\n<div style=\"font-size: 13px; float: right; width: 500px; direction: rtl; text-align: right; background-color: rgb(244, 244, 244);\">\n<br>\n<ul>\n<li style=\"padding: 3px 0px;\"> کاربر گرامی کلمه عبور خود را به طور دوره ای تغییر دهید </li>\n<li style=\"padding: 3px 0px;\"> بعد از اتمام کار حتما دکمه خروج از سیستم را فشار دهید </li>\n<li style=\"padding: 3px 0px;\"> به منظور امنیت بیشتر می توانید از سیستم کد امنیتی استفاده کنید </li>\n<li style=\"padding: 3px 0px;\"> به منظور امنیت بیشتر سعی کنید کلمه عبور خود را به صورت ترکیبی از اعداد و حروف و با طول حداقل 5 کارکتر بسازید </li>\n</ul>\n</div>\n</td>\n<td id=\"r3_l\"> </td>\n</tr>\n<tr>\n<td id=\"blc3_l\"> </td>\n<td id=\"b3_l\"> </td>\n<td id=\"brc3_l\"> </td>\n</tr>\n</tbody>\n</table>               \n     </div>"