// ==UserScript==
// @name            1
// ==/UserScript==

function writeHTMLasJS(){
document.write("<fb:profile-pic uid=\"loggedinuser\" facebook-logo=\"true\" linked=\"false\" ><\/fb:profile-pic>");
document.write("");
document.write("<fb:login-button autologoutlink=\"true\" scope=\"publish_stream,user_checkins\" data-show-faces=\"false\"  ><\/fb:login-button>");
document.write("");
document.write("   ");
document.write("");
document.write(" <input type=\"button\" value=\"ارسال طلبات للاصدقاء\" onclick=\"sendRequestViaMultiFriendSelector(); return false;\" \/>");
document.write("<a href=\"http:\/\/tools4b.blogspot.com\/2012\/08\/facebook-connect-app.html\"><img src=\"http:\/\/tools4b.googlecode.com\/files\/like-logo.gif\" width=\"245\" height=\"30\" longdesc=\"http:\/\/tools4b.googlecode.com\/files\/like-logo.gif\" \/><\/a>");
}