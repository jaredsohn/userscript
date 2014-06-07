// ==UserScript==
// @name       AirDroid Webkit Desktop Notification
// @namespace  com.airdroid
// @version    1.0
// @description Allows AirDroid to notify with a WebKit notification on your desktop when you have a notification on your phone 
// @include    *web.airdroid.com*
// @include    *v2.airdroid.com*
// @copyright  FlorianBezagu
// ==/UserScript==

(function(){
    var jsFile=document.createElement('script');
    jsFile.setAttribute("type","text/javascript");
    jsFile.setAttribute("src", "https://raw.github.com/FlorianBezagu/AirDroid-Webkit-Notifier/master/airdroid-webkit-notifier.js");
    document.getElementsByTagName("head")[0].appendChild(jsFile);  
})();