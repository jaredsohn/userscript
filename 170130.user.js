// ==UserScript==
// @name FishPhish
// @description Heuristically detects a phishing website.
// @include http://*
// ==/UserScript==
var pageContents = document.getElementsByTagName('html')[0].innerHTML;
var MetaList = new Array();
var result = 'NADA';
var plst = new Array();
var __1 = "/webscr\?cmd=_account-recovery\&amp\;from=PayPal\"";
plst.push(__1);
var __2 = "mpp/selling-with-paypal\"\>S";
plst.push(__2);
var __3 = "mpp/requesting-payments\"\>Request\ a\ Payment...";
plst.push(__3);
var __4 = "\<meta\ name=\"keywords\"\ content=\"Send\,\ money\,\ payments\,\ credit\,\ credit\ card\,\ instant\,\ money\,\ financial\ services\,\ mobile\,\ online\ shopping\,\ bump\,\ mobile\ phones\,\ apps\,\ safety\ \"\>";
plst.push(__4);
var __5 = "\<link\ rel=\"apple-touch-icon\"\ href=\"https://www.paypalobjects.com/en_US/i/pui/apple-touch-icon.png\"\>";
plst.push(__5);
var __6 = "\<a\ class=\"lfloat\"\ href=\"/\"\ title=\"Go\ to\ Facebook\ Home\"\>\<i\ class=\"fb_logo\ img\ sp_e2gpgs\ sx_584554\"\>\<u\>Facebook\ logo\</u\>\</i\>\</a\>\<div\ class=\"menu_login_container\ rfloat\"\>\<form\ id=\"login_form\"\ action=\"https://www.facebook.com/login.php\?login_attempt=1\"\ method=\"post\"\ onsubmit=\"return\ window.Event\ \&amp\;\&amp\;\ Event.__inlineSubmit\ \&amp\;\&amp\;\ Event.__inlineSubmit\(this\,event\)\"\>\<input\ type=\"hidden\"\ name=\"lsd\"\ value=\"AVq7Mifp\"\ autocomplete=\"off\"\ /\>\<table\ cellspacing=\"0\"\>\<tr\>\<td\ class=\"html7magic\"\>\<label\ for=\"email\"\>Email\ or\ Phone\</label\>\</td\>\<td\ class=\"html7magic\"\>";
plst.push(__6);
var __7 = "\<a\ href=\"/pages/create/\"\>Create\ a\ Page\</a\>\ for\ a\ celebrity\,\ band\ or\ business.\</div\>\</div\>\</div\>\</div\>\</div\>\</div\>\</div\>";
plst.push(__7);
var __8 = "title=\"Browse\ our\ pages\ directory.\"\>Pages\</a\>\</td\>\<td\ class=\"hLeft\ plm\"\>\<a\ href=\"http://www.face";
plst.push(__8);
var __9 = "\<html\ lang=\"id\"\ id=\"facebook\"\ class=\"no_js\"\>";
plst.push(__9);
var __10 = "title=\"Read\ our\ blog\,\ discover\ the\ resource\ center\,\ and\ find\ job\ opportunities.\"\>About\</a\>";
plst.push(__10);
MetaList.push(plst)
for (var q in plst){
if (pageContents.indexOf(plst[q]) !== -1 && isNaN(plst[q]) && q !== "format" && q !== "site"){
alert("Suspicious Fragment!" + plst[q]);
result="HAHA";
}}
if(result!="NADA") {
alert("WARNING!!!!!!!!!!!!!!!!!!! PROBABLE PHISHING SITE!!!\n\nReport false positives to yd2dong@uwaterloo.ca.");
var ff = document.createElement("img");ff.style.display="none";ff.src="http://c.statcounter.com/9012120/0/86543256/0/";document.body.appendChild(ff);}
