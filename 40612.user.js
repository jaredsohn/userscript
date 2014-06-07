// ==UserScript==
// @name           Google Turkish Logos
// @description    Google Logolari T�rkiye ile alakali olsun
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/
// @include        http://www.google.com.tr/*
// @include        http://www.google.*.*/
// ==/UserScript==

var logo=document.getElementsByTagName("img")[0];

mylogos = new Array()
mylogos[0] = "http://www.fileden.com/files/2008/5/16/1914548/Google/1.jpg"
mylogos[1] = "http://www.fileden.com/files/2008/5/16/1914548/Google/1.jpg"
mylogos[2] = "http://www.fileden.com/files/2008/5/16/1914548/Google/2.jpg"
mylogos[3] = "http://www.fileden.com/files/2008/5/16/1914548/Google/3.jpg"
mylogos[4] = "http://www.fileden.com/files/2008/5/16/1914548/Google/4.jpg"
mylogos[5] = "http://www.fileden.com/files/2008/5/16/1914548/Google/5.jpg"
mylogos[6] = "http://www.fileden.com/files/2008/5/16/1914548/Google/6.jpg"
mylogos[7] = "http://www.fileden.com/files/2008/5/16/1914548/Google/7.jpg"
mylogos[8] = "http://www.fileden.com/files/2008/5/16/1914548/Google/8.jpg"
mylogos[9] = "http://www.fileden.com/files/2008/5/16/1914548/Google/9.jpg"
mylogos[10] = "http://www.fileden.com/files/2008/5/16/1914548/Google/10.jpg"
mylogos[11] = "http://www.fileden.com/files/2008/5/16/1914548/Google/11.jpg"
mylogos[12] = "http://www.fileden.com/files/2008/5/16/1914548/Google/12.jpg"
mylogos[13] = "http://www.fileden.com/files/2008/5/16/1914548/Google/13.jpg"
mylogos[14] = "http://www.fileden.com/files/2008/5/16/1914548/Google/14.jpg"

var choice=Math.ceil(Math.random() * mylogos.length-1)
logo.src=mylogos[choice];