// ==UserScript==
// @name           Remove All Facebook Ads
// @author         http://tech-spree.com
// @version        0.8.2
// @namespace      http://userscripts.org/scripts/show/77610
// @description    I'm looking into a better way to remove these url's. And am also researching more into the Facebook Social Plugins.
// ==/UserScript==


window.location.href = window.location.href.replace(/^http://www.facebook.com/plugins/like.php, 'http://google.com');
window.location.href = window.location.href.replace(/^http://connect.facebook.net/en_US/all.js, 'http://google.com');
window.location.href = window.location.href.replace(/^http://www.facebook.com/widgets/fan.php, 'http://google.com');
window.location.href = window.location.href.replace(/^http://static.ak.fbcdn.net/connect/xd_proxy.php, 'http://google.com');

http://static.ak.fbcdn.net/connect/xd_proxy.php
var adSidebar = document.getElementById('facebook');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('bootloader_iframe');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
function disableEvents()
{
document.onclick = FB.Event.subscribe;
document.onclick = FB.init;
document.onclick = FB.Connect.init;
}