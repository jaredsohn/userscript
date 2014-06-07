// ==UserScript==
// @name Report Form Spam Catcher
// @description Eats spam reports automatically
// @version 1.0
// @include http://if.invisionfree.com/forum/60/
// ==/UserScript==

$(document).ready(function() {
$("td.c_cat-title:contains([IF]):contains(Leeching) a").each(function(index) {
var url = $(this).attr("href");
var slashes = 0;
var checkName = "_";
for (i = 0; i < url.length; i++) {
if (slashes == 4 && url.charAt(i) != '/')
checkName += url.charAt(i);
if (url.charAt(i) == '/')
slashes++;
}
$("input[name=" + checkName + "]").attr("checked", true);

});
$(".c_cat-title:contains('invisionfree.com') a").each(function(index) {
var url = $(this).attr("href");
var slashes = 0;
var checkName = "_";
for (i = 0; i < url.length; i++) {
if (slashes == 4 && url.charAt(i) != '/')
checkName += url.charAt(i);
if (url.charAt(i) == '/')
slashes++;
}
$("input[name=" + checkName + "]").attr("checked", false);
});
$("input[type=checkbox]").each(function(index) {
if ($(this).attr("checked")) {
$("select[name=amt_menu]").val(39);
$("button[name=btn_amt_menu]").click();
}
});
});