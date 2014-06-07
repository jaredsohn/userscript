// ==UserScript==
// @name         MyFatih-ConcurrentSession
// @version	 1.0
// @namespace    MyFatih
// @description  Allows you to login 'myfatih' in more than one computer/browser
// @match	 http://my.fatih.edu.tr/*
// @match	 https://my.fatih.edu.tr
// @match	 https://my.fatih.edu.tr/*
// @grant	 none
// @run-at       document-start
// @copyright    2013, Bir Fatihli
// ==/UserScript==

user_pref("capability.policy.killfunction.sites", "https://my.fatih.edu.tr/pages/p9999.php");
tokenId=1;