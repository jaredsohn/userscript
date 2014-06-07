// ==UserScript==
// @name           ONBUX
// @namespace      http://speedtricks.co.cc
// @include        *onbux.com*

// ==/UserScript==

uri = document.URL;
if(uri.search('adid')>=0){
document.getElementById('iF').src=" ";
arr=document.getElementsByTagName('img');
len=(arr.length)-1;
arr[len].src="http://www.bux4real.com/images/banners/bux4real-468x60.gif";
ar=document.getElementsByTagName('a');
lens=(ar.length)-1;
ar[lens].href="http://www.bux4real.com/?ref=ptcearn";
}
else if(uri.search('viewads')>=0){
arr=document.getElementsByTagName('img');
len=(arr.length)-1;
arr[len].src="http://www.bux4real.com/images/banners/bux4real-468x60.gif";
ar=document.getElementsByTagName('a');
lens=(ar.length)-6;
ar[lens].href="http://www.bux4real.com/?ref=ptcearn";
}