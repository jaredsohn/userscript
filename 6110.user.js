// ==UserScript==
// @name	Close Websites
// @description	Auto close tabs of unwanted sites. Simple one line script takes advantage of GM to automatically detect your given sites and close them. Just change the included pages to whatever you want to close. Every time I connect to the internet, I am redirected to a login page (https://wireless-gw.engin.umich.edu/login.pl) where Firefox fills in the password for me and AutoLogin (http://userscripts.org/scripts/show/750) press the login button, and then an unwanted page (http://www.bluesocket.com/) appears which is immediately closed by this script. Thanks to http://www.interwebby.com/blog/2006/02/04/3/ and 'zenith'.
// @include	http://www.bluesocket.com/
// @include	callto:
// ==/UserScript==

window.open('javascript:window.close();','_self','');window.open('javascript:window.close();','_self','');