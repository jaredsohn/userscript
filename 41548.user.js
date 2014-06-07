// ==UserScript==
// @name           Wordpress Update Post Afterthought
// @namespace      wpafterthought@snakehole.net
// @description    A simple script that brings you back to the post your editing after a common cause of "Page not found" errors when the update button is clicked.
// @include        */wp-admin/post.php?action=edit&post=*&_wp_original_http_referer=*wp-admin%2Fedit.php&message=*
// @include */wp-admin/index.php*
// ==/UserScript==
var error404=GM_getValue("error404P", "Page not found");

if (document.title.match(error404) && document.location.href.match('&message=1')){
document.location.href = document.location.href.replace('&message=1','');
}
GM_registerMenuCommand("WP Update Post Afterthought set to page title.", function() {
GM_setValue("error404P", document.title);
});