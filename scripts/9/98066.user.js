// ==UserScript==
// @name           GISD Site Bypass
// @description    Simply bruteforce.
// @author         Mr. Mister
// @version        1.0
// ==/UserScript==

if (document.title == "Untitled Document"){
        var url = document.getElementsByTagName("span")[0].innerHTML
	location.href = url;
}
