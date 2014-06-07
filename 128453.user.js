// ==UserScript==
// @name           Gửi Tin Nhắn Viettel
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @namespace      freesms.viettel
// @description    Gửi tin nhắn Viettel miễn phí
// @include        http://www.vietteltelecom.vn/gui-tin-nhan
// @include        http://vietteltelecom.vn/gui-tin-nhan
// @include        https://member.vietteltelecom.vn/passport/login?service=http%3A%2F%2Fwww.vietteltelecom.vn%2Fgui-tin-nhan%3Fforce%3Dtrue
// @include        http://www.vietteltelecom.vn/gui-tin-nhan/lich-su*
// ==/UserScript==

$(".header").remove();

$("#dm_area_135").remove();

$("#dm_area_137").remove();

$("#dm_area_138").remove();

$(".footer").remove();

$('div[style="float:right"]').remove();

$('A[href="?force=true"]').html('đăng nhập');
