// ==UserScript==
// @name           Facebook Auto Ignore All Requests
// @author         Aaron S
// @description    Automatically ignore all requests on the facebook request page
// @include        http://*.facebook.com/reqs.php*
// ==/UserScript==

var a = document.getElementsByTagName('input');for (var i=0; i<a.length; i++){if (a[i].value.toLowerCase() == 'ignore') {try{a[i].click();} catch(e){}}}