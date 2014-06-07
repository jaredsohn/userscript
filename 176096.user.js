// ==UserScript==
// @name          自动去除feedly后缀 （Remove feedly marks）
// @author        AlexBlair（http://www.AlexBlair.org/）
// @description   自动去除feedly后缀,避免后缀导致的URL读取失败
// @include       http://*?utm_source=feedly
// @include       https://*?utm_source=feedly
// @version       0.0.2
// @history       0.0.1 2013-08-19
// ==/UserScript==

var blhost=location.href.toLowerCase(); 
if (blhost.indexOf("?utm_source=feedly")>=0){
			location.href=blhost.replace(/(.*)\?utm_source=feedly/,'$1');
};
