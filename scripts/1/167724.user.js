// ==UserScript==
// @name       Remove svd.se quota cookie
// @namespace  se.svd.rcookie
// @version    1
// @description  Removes the cookie controlling the layover on svd.se
// @match      http://www.svd.se/*
// @copyright  Creative Commons Zero
// @run-at document-start
// ==/UserScript==

domain="svd.se";
cookieName="svd-wp-quota";

document.cookie = cookieName + "=;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
document.cookie = cookieName + "=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
document.cookie = cookieName + "=;path=/;domain=" + domain  + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
document.cookie = cookieName + "=;path=/;domain=www." + domain  + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
