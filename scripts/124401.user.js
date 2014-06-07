/*
Ver: 0.01
Day la script auto dien user & pass cua ban. Con capcha thi po tay.
Danh sach phim tat sau khi login:
`: trang account.
a: trang ads.
r: trang danh sach rent ref.
l: Logout.
Khi cần điền, tại trang login bạn ấn tổ hợp phím Crtl&Shift.
Lưu ý: user&pass phải để trong ngoặc kép đã có sẵn chỉ cần xóa chữ trong đó thôi.
Script nay hoat dong tot nhat tren FF. Chorme co mot vai loi!
Script nay khong nham muc dich mua ban, chi share ma thoi.
Script nay khong lay (khong the) cap duoc user & pass cua ban!
Tac gia anhbe58.
Email: cachuado736@yahoo.com.
Y!M: cachuado736
*/
// ==UserScript==
// @name           Auto Login
// @namespace      Hoang Anh (anhbe58)
// @include        *incrasebux.com*
// ==/UserScript==
user = 'username cua ban';
pass = 'pass';

window.addEventListener('keydown', function(e){
if (e.ctrlKey && e.shiftKey){
document.getElementById('login_username').value = user;
document.getElementById('pwd').value = pass;
}
}, false);
window.addEventListener('keypress', function(e){
if (e.charCode == 97 && document.location.href.search('login') < 0) document.location.href='http://incrasebux.com/ads.php';
if (e.charCode == 96 && document.location.href.search('login') < 0) document.location.href='http://incrasebux.com/acc.php';
if (e.charCode == 114 && document.location.href.search('login') < 0) document.location.href='http://incrasebux.com/rreferrals.php';
if (e.charCode == 108 && document.location.href.search('login') < 0) document.location.href='http://incrasebux.com/logout.php?s='+getCookie();

}, false);
function getCookie()
{
c_name='PHPSESSID';
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}
