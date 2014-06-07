// ==UserScript==
// @name           Google Patriotic Logo II
// @namespace      http://zombietime.com/
// @description    Replaces the google.com logo with a prefered logo
// @include        http://*.google.com/
// ==/UserScript==
// Notes:
//  Thanks to zombie, Bean, American Art Archives, GoatGuy, GregJ, Yair S., Royce K., Kristoff R, Joyce, 



var logo=document.getElementsByTagName("img")[0];

mylogos = new Array()
mylogos[0] = "http://www.zombietime.com/google_memorial_day_logo/google_logo01.jpg"
mylogos[1] = "http://www.zombietime.com/google_memorial_day_logo/googlelogo_mem_gregj.jpg"
mylogos[2] = "http://www.zombietime.com/google_memorial_day_logo/google_logo-goatguy.jpg"
mylogos[3] = "http://www.zombietime.com/google_memorial_day_logo/google_logo_bts_lc7.jpg"
mylogos[4] = "http://www.zombietime.com/google_memorial_day_logo/GoogleMemLogoYairS.jpg"
mylogos[5] = "http://www.zombietime.com/google_memorial_day_logo/google_americanartar.jpg"
mylogos[6] = "http://www.zombietime.com/google_memorial_day_logo/google_logo_Bean.jpg"
mylogos[7] = "http://www.zombietime.com/google_memorial_day_logo/Vietnam_Google2.jpg"
mylogos[8] = "http://www.zombietime.com/google_memorial_day_logo/Google-JR.jpg"



var choice=Math.ceil(Math.random() * mylogos.length-1)
logo.src=mylogos[choice];