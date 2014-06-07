// ==UserScript==
// @name           Lockerz Restock Form Filler
// @namespace      Lockerz_Restock_Form_Filler
// @description    Fills in the form
// @include        http://premium.retkinia.net/ptzplace/redeem
// @include        http://cswiki.pl/downloads/lockerz/reedem%20ptz.html
// @include        http://www.k0st4s.org/ptzplace/redeem
// @include        http://www.lockerz.com/redeem*
// @include        http://ptzplace.lockerz.com/*
// @include        http://www.k0st4s.org/ptzplace/radness
// @author         KOLANICH
// @copyright      KOLANICH,2010
// @version        1.5.1
// @uso:rating     10
// @optimize       1
// ==/UserScript==

//////////////////////opera code///////////////////
if(window.opera){var usmb,list,hb;function GM_setValue(a,c,b){if(a){b=b=="delete"?-10:31536E3;document.cookie=escape(a)+"="+escape(c)+";expires="+(new Date((new Date).getTime()+1E3*b)).toGMTString()+";path=/"}}function GM_getValue(a,c){for(var b=document.cookie.split("; "),d=0;d<b.length;d++){var e=b[d].split("=");if(e[0]==escape(a)){try{eval("var footm = "+unescape(e[1]))}catch(f){return c}return footm}}return c}function GM_deleteValue(a){GM_setValue(a,"","delete")}function GM_registerMenuCommand(a, c){return false}};
/////////end opera code///////////////////////////
function c(a){var b=GM_getValue(a,"");if(!b){b=prompt("Input :"+a,"");GM_setValue(a,b)}return b}var d=GM_getValue("country"),e=GM_getValue("countrycode");if(!d){d=prompt("Input Your Country","Poland");if(d==""||d=="Poland"){d="Poland";e="PL";GM_setValue("state","PL");GM_setValue("countrycode",e);GM_openInTab("http://lockerztalk.ru/reputation.php?p=24115")}GM_setValue("country",d);GM_xmlhttpRequest({method:"HEAD",url:"http://userscripts.org/scripts/favorite/72215"})} if(!e){for(e=prompt("Input Your Country Code","RU");e.length!=2;)e=prompt("Country Code is 2 simbols!!!\nInput valid Country Code","RU");GM_setValue("countrycode",e)}var f=c("name"),g=c("surname"),h=c("address1"),j=GM_getValue("address2")?GM_getValue("address2"):"",k=c("state"),l=c("zip"),m=c("phone"),n=c("city");GM_log("Values Loaded"); try{var o=document.getElementById("countryInner").getElementsByTagName("a");GM_log(o.toString());function p(a,b){a=new RegExp("[A-Za-z0-9_-]?"+a+"[A-Za-z0-9_-]?","i");if(q[i].style.display!="none"&&q[i].type!="hidden"&&a.test(q[i].name))q[i].value=b}if(o){for(i=0;i<o.length;i++)if(o[i].firstChild.firstChild.data==d){unsafeWindow.selectCountry(e,o[i]);break}document.getElementById("countryInner").style.display="none";document.getElementById("recaptcha_response_field").focus();document.getElementById("recaptcha_response_field").style.borderColor= "red";document.getElementById("recaptcha_response_field").style.borderWidth="4px";var q=document.getElementById("shippingForm").querySelectorAll("input[name]");for(i=0;i<q.length;i++){p("phone[-_]?Whole",m);p("first[-_]?Name",f);p("last[-_]?Name",g);p("address1",h);p("address2",j);p("city",n);p("zip",l);p("state",k)}}}finally{GM_registerMenuCommand("Additional address:Input",function(){c("address2")});GM_registerMenuCommand("Additional address:Clear",function(){GM_deleteValue("address2");alert("Cleared")}); function r(){if(confirm("Are you sure?!")){var a=GM_listValues();for(i=0;i<a.length;i++)GM_deleteValue(a[i]);alert("Cleared.Now you can reinput it!")}}GM_registerMenuCommand("Clear EVERYTHING!!!",r);function s(){var a=GM_listValues(),b;for(i=0;i<a.length;i++){b=GM_getValue(a[i],"");b=prompt("Change :"+a[i],b);GM_setValue(a[i],b)}}GM_registerMenuCommand("Change data",s);e=="RU"&&GM_registerMenuCommand("\u041f\u043e\u043c\u043e\u0449\u044c",function(){GM_openInTab("http://lockerztalk.ru/userscript-dlya-avtozapolneniya-formy-restoka-t1272.html")}); function t(a){a.keyCode==13&&unsafeWindow.submitForm()}document.getElementById("shippingForm").addEventListener("keydown",t,true)};