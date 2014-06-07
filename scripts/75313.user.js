// ==UserScript==
// @name           Improved Google mediafire Search
// @namespace      www.google.com
// @include        http://www.google.*
// @include        *google*
// ==/UserScript==


// For more tricks visit - 

// rapidshare.com'da arama yapmak istiyorsanız değerini true yapınız.
// change value to true if you want to search rapidshare.com
rsCom = true;

// scriptin rapidshare.de'da arama yapmasını istiyorsanız değerini true yapınız.
// change value to true if you want to search rapidshare.de
rsDe  = true;

// aşağıdaki kodları değiştirmeyiniz
// do not change codes below
arama = "";
if(rsCom){arama+=" -megavideo site:mediafire.com";}
if(rsDe) {arama+=" OR site:megaupload.com/?d= OR site:rapidshare.com";}
sBtn = document.getElementsByName("btnI")[0]; sBtn.type = "button"; sBtn.value = "Search mediafire";
sBtn.setAttribute("onClick", "if(document.getElementsByName('q')[0].value!=''){document.getElementsByName('q')[0].value+='"+ arama +"';document.forms.f.submit();}");