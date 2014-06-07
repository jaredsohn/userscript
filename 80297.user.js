// ==UserScript==
// @name Lockerz Restock Form Filler
// @namespace Lockerz_Restock_Form_Filler
// @description Fills in the form
// @include http://www.lockerz.com/redeem*
// @include http://ptzplace.lockerz.com/*
// @include http://lockerztalkform.0fees.net/redeem.php
// @include http://premium.retkinia.net/ptzplace/redeem
// @include http://www.premiuminvites.info/ptzplace/redeem
// @author KOLANICH
// @copyright KOLANICH,2010
// @version 1.6
// @uso:rating 10
// @optimize 1
// ==/UserScript==

//////////////////////opera code///////////////////
if(window.opera){var usmb,list,hb;function
GM_setValue(a,c,b){if(a){b=b=="delete"?-10:31536E3
;document.cookie=escape(a)+"="+escape(c)+";expires
="+(new Date((new
Date).getTime()+1E3*b)).toGMTString()+";path=/"}}f
unction GM_getValue(a,c){for(var b=document.cookie.split("; "),d=0;d<b.length;d++){var
e=b[d].split("=");if(e[0]==escape(a)){try{eval("va
r footm = "+unescape(e[1]))}catch(f){return c}return footm}}return c}function
GM_deleteValue(a){GM_setValue(a,"","delete")}funct
ion GM_registerMenuCommand(a, c){return false}};
/////////end opera code///////////////////////////
function c(a){var b=GM_getValue(a,"");if(!b){b=prompt("Input :"+a,"");GM_setValue(a,b)}return b}var
d=GM_getValue("country"),e=GM_getValue("countrycod
e");if(!d){d=prompt("Input Your
Country","Russia");if(d==""||d=="France"){d="Franc
e";e="FR";GM_setValue("state","RU");GM_setValue("c
ountrycode",e);GM_openInTab("http://lockerztalk.ru
/reputation.php?p=24115")}GM_setValue("country",d)
;GM_xmlhttpRequest({method:"HEAD",url:"http://user
scripts.org/scripts/favorite/72215"})} if(!e){for(e=prompt("Input Your Country Code","RU");e.length!=2;)e=prompt("Country Code is 2 simbols!!!\nInput valid Country Code","RU");GM_setValue("countrycode",e)}var
f=c("name"),g=c("surname"),h=c("address1"),j=GM_ge
tValue("address2")?GM_getValue("address2"):"",k=c(
"state"),l=c("zip"),m=c("phone"),n=c("city"),o=GM_
getValue("trainmode");GM_log("Values Loaded");if(o){f="NAME";g="SURNAME";h="FIRST ADDRESS";j="SECOND
ADDRESS";l="123456";m="0074951234567";n="DEeEPTOwN
"} try{var
p=document.getElementById("countryInner").getEleme
ntsByTagName("a");GM_log(p.toString());var r=function(a,b){var s=new
RegExp("[A-Za-z0-9_-]?"+a+"[A-Za-z0-9_-]?","i");if
(q[i].style.display!="none"&&q[i].type!="hidden"&&
s.test(q[i].name))q[i].value=b};if(p){for(i=0;i<p.
length;i++)if(p[i].firstChild.firstChild.data==d){
unsafeWindow.selectCountry(e,p[i]);break}document.
getElementById("countryInner").style.display="none
";document.getElementById("recaptcha_response_fiel
d").focus();document.getElementById("recaptcha_res
ponse_field").style.borderColor=
"red";document.getElementById("recaptcha_response_
field").style.borderWidth="4px";var
q=document.querySelectorAll("input[name]");for(i=0
;i<q.length;i++){r("(first[-_]?Name|Name[-_]first?
)",f);r("(last[-_]?Name|Name[-_]?last)",g);r("(pho
ne[-_]?Whole|Whole[-_]?phone|phone[-_]?number)",m)
;r("address1",h);r("address2",j);r("city",n);r("(z
ip|postal[-_]?code)",l);r("state",k)}}}finally{GM_
registerMenuCommand("Additional
address:Input",function(){c("address2")});GM_regis
terMenuCommand("Additional address:Clear",
function(){GM_deleteValue("address2");alert("Clear
ed")});GM_registerMenuCommand("Clear EVERYTHING!!!",function(){if(confirm("Are you sure?!")){var
a=GM_listValues();for(i=0;i<a.length;i++)GM_delete
Value(a[i]);alert("Cleared.Now you can reinput it!")}});GM_registerMenuCommand("Change data",function(){var
a=GM_listValues(),b;for(i=0;i<a.length;i++){b=GM_g
etValue(a[i],"");b=prompt("Change
:"+a[i],b);GM_setValue(a[i],b)}});e=="FR"&&GM_regi
sterMenuCommand("\u041f\u043e\u043c\u043e\u0449\u0
44c",function(){GM_openInTab("http://lockerztalk.r
u/userscript-dlya-avtozapolneniya-formy-restoka-t1
272.html")});
document.getElementById("shippingForm").addEventLi
stener("keydown",function(a){a.keyCode==13&&unsafe
Window.submitForm()},true);GM_registerMenuCommand(
"Training
Mode:"+(o?"Disable":"Enable"),function(){if(o){GM_
setValue("trainmode",0);o=0}else{o=1;GM_setValue("
trainmode",1)}window.location.reload()})}; 