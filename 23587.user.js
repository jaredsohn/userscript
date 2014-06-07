// ==UserScript==
// @name          Craigslist-car-listing-filter
// @namespace     http://userscripts.org/scripts/show/23587
// @description   Filters craigslist CAR listing by price, year, model. Makes it easier and faster to browse listing.
// @include       http://*.craigslist.org/car/
// @include       http://vancouver.craigslist.org/car/index*.html
// @include       http://*.craigslist.org/search/car*
// @include       http://*.craigslist.ca/car/
// @include       http://vancouver.craigslist.ca/car/index*.html
// @include       http://*.craigslist.ca/search/car*
// @include       http://*.craigslist.*/cta/
// @include       http://*.craigslist.*/ctd/
// @include       http://*.craigslist.*/cto/
// @include       http://*.craigslist.*/cta/index*.html
// @include       http://*.craigslist.*/ctd/index*.html
// @include       http://*.craigslist.*/cto/index*.html
// @include       http://*.craigslist.*/*/cta/
// @include       http://*.craigslist.*/*/ctd/
// @include       http://*.craigslist.*/*/cto/
// @include       http://*.craigslist.*/*/cta/index*.html
// @include       http://*.craigslist.*/*/ctd/index*.html
// @include       http://*.craigslist.*/*/cto/index*.html
// @include       http://*.craigslist.*/search/cta/*
// @include       http://*.craigslist.*/search/ctd/*
// @include       http://*.craigslist.*/search/cto/*
// @exclude       http://localhost/*
// @exclude       http://127.0.0.1/*
// ==/UserScript==

/**
* Copyrights (c) 2007 - 2009 : @author tech4computer
* Released under the conditional GPLv3 license with
* additional conditions that over rules conflicting
* portion of GPLv3 are:
*  * Cannot commercially redistribute without author's permission.
*  * Cannot list on software directory listings without authors permission.
*  * Software news, blogs sites can publish articles about it. The article,
*    should contain links back pointing to the page where author hosted
*    the software.
*  * The bottom 'Home of this utility ( feedback  )' portion cannot be
*    removed. And its content cannot be changed. It should appear as it is
*    when the script is run.
*  * No derivative works - You may not alter, transform, or build upon this work.
*  * Attribution - You must attribute the work in the manner specified by the
*    author or licensor (but not in any way that suggests that they endorse
*    you or your use of the work)
*  * Cannot copy, modify and re-list as separate Userscript on userscripts.org
*    or on Google Chrome Extensions listing.
*  * Cannot copy, modify and re-list as separate Firefox Addon on addons.mozilla.org
*  * Cannot copy, modify and re-list as separate Google Chrome Extension on
*    Google Chrome Extensions listing sites
*
* If anyone wants a feature added to it then make a suggestion
* to author and he will try his best to add it.
*
* Author blog: http://tech4computer.wordpress.com
**/




if(!slamdunkDbg) var slamdunkDbg = {
};
if(!slamdunkStrgUtls) var slamdunkStrgUtls = {
};
if(!slamdunkCkieUtls) var slamdunkCkieUtls = {
};
if(!slamdunkinG) var slamdunkinG = {
v:0.306, // VERSION. NOTE: UPDATE
ignoreWordFormStr: " ",
w : 0
};

if(!slamdunkinCLCarYr) var slamdunkinCLCarYr = {};

slamdunkDbg.dbgDiv=function(){
try {
var newSettingsContainerG = document.createElement("div");
newSettingsContainerG.setAttribute("id", "divCookieSettingsContainerG");
newSettingsContainerG.setAttribute("style",
"margin: 10px; " +
"padding: 5px; " +
"border: thin #FFCC66 dashed;" +
"background-color: #FFFFCC;"
);
var varSettingsHeadingDivG = document.createElement("div");
varSettingsHeadingDivG.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
'padding:3px;padding-bottom:1px;padding-top:2px;padding-left:10px;' +
'font-family: Georgia, sans-serif, arial;' +
'font-size: large;' +
'">' +
"Settings" +
'</div>';
newSettingsContainerG.appendChild(varSettingsHeadingDivG);
document.body.insertBefore(newSettingsContainerG,document.body.firstChild);
} catch (e){
}
}
//slamdunkDbg.dbgDiv(); // COMMENT FOR RELEASE

slamdunkDbg.prtToDbg = function( displayString ){
if(displayString == null) return;
var cookieSettingsContainer = document.getElementById("divCookieSettingsContainerG");
if (null != cookieSettingsContainer){
var varDiv = document.createElement("div");
varDiv.innerHTML = '<div style="margin: 0 auto 0 auto; padding: 3px; padding-bottom: 1px; padding-top: 1px; padding-left: 10px;"> ' +
displayString +
'</div>';
cookieSettingsContainer.appendChild(varDiv);
} else {
}
}
slamdunkDbg // newline to fool python build script.
.lg = function(val){
if(!GM_log){
}else{
		slamdunkDbg.prtToDbg(val); // un/comment //slamdunkDbg.dbgDiv() too if blocking
return;
}
}


slamdunkStrgUtls.isBlank = function(val){
if(val==null){
return true;
}
for(var i=0;i<val.length;i++) {
if ((val.charAt(i)!=' ')&&(val.charAt(i)!="\t")&&(val.charAt(i)!="\n")&&(val.charAt(i)!="\r")){
return false;
}
}
return true;
}
slamdunkStrgUtls.LTrim = function( value ) {
var re = /\s*((\S+\s*)*)/;
return value.replace(re, "$1");
}

slamdunkStrgUtls.RTrim = function( value ) {
var re = /((\s*\S+)*)\s*/;
return value.replace(re, "$1");
}

slamdunkStrgUtls.trim = function( value ) {
return slamdunkStrgUtls.LTrim(slamdunkStrgUtls.RTrim(value));
}



slamdunkCkieUtls.getSuperDomain = function() {
var domain=document.domain;
var superDomain=domain;
if(domain.search("craigslist")!=-1){
var i=domain.indexOf('.craigslist.');
if(i!=-1){
superDomain=domain.substring(i+1,domain.length);
}else{
return "none";
}
}else{ return "none";}
return superDomain;
}
slamdunkCkieUtls.setCookie = function(name, value, nDays) {
var today = new Date();
var expire = new Date();
if (nDays==null || nDays==0) nDays=1;
expire.setTime(today.getTime() + 3600000*24*nDays);
var domain=this.getSuperDomain();
if(domain.indexOf("none")!=-1){
document.cookie = name + "=" + escape(value) + "; path=/" + ((expire == null) ? "" : "; expires=" + expire.toGMTString());
}else{
document.cookie = name + "=" + escape(value) + "; path=/" + ((expire == null) ? "" : "; expires=" + expire.toGMTString())+( ( domain ) ? ";domain=" + domain : "" );
}
}
slamdunkCkieUtls.cookieExpiryDate = function(days){
if (days == null) days = 30;
var exp = new Date();     //set new date object
return exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * days));     //set it 30 days ahead
}
slamdunkCkieUtls.getCookie = function(name) {
var dc = document.cookie;
var arrCookie = dc.split(";");
for ( var arrIndex in arrCookie ) {
var arrConfigWords = slamdunkStrgUtls.trim(arrCookie[arrIndex]).split("=");
if ( arrConfigWords.length > 0  ){
if(arrConfigWords[0] == name){
return unescape(arrConfigWords[1]);
break; //break for loop
}
}
}

return null;
}
slamdunkCkieUtls.delCookie = function(name) {
document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/";
}



/**
* Checks and creates SettingsContainer div if it doesn't exists.
*
* @return reference to SettinsContainer div
*/
slamdunkinCLCarYr.getSettingsContainer = function(){
var cookieSettingsContainer = document.getElementById("divCookieSettingsContainer");
if (null != cookieSettingsContainer){
return cookieSettingsContainer;
} else {
try {
var newSettingsContainer = document.createElement("div");
newSettingsContainer.setAttribute("id", "divCookieSettingsContainer");
newSettingsContainer.setAttribute("style",
"margin: 10px; " +
"padding: 5px; " +
"border: thin #FFCC66 dashed;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #FFFFCC;"
);
var varSettingsHeadingDiv = document.createElement("div");
varSettingsHeadingDiv.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
'padding:3px;padding-bottom:1px;padding-top:2px;padding-left:10px;' +
'font-family: Georgia, sans-serif, arial;' +
'font-size: large;' +
'">' +
"Settings" +
'</div>';
newSettingsContainer.appendChild(varSettingsHeadingDiv);
document.body.insertBefore(newSettingsContainer,document.body.firstChild);
return newSettingsContainer;
} catch (e){
}
}
}

slamdunkinCLCarYr.insertStringInSettingsContainerOnTop = function( displayString ){
if(displayString == null) return;

var cookieSettingsContainer = slamdunkinCLCarYr.getSettingsContainer();
if (null != cookieSettingsContainer){
var varDiv = document.createElement("div");
varDiv.innerHTML = '<div style="margin: 0 auto 0 auto; padding: 3px; padding-bottom: 1px; padding-top: 1px; padding-left: 10px;"> ' +
displayString +
'</div>';
cookieSettingsContainer.appendChild(varDiv);
} else {
}
}

slamdunkinCLCarYr.insertFormOnTop = function( displayString ){
if(displayString == null) return;
slamdunkinCLCarYr.insertStringInSettingsContainerOnTop(displayString);
}

slamdunkinCLCarYr.insertScriptOnTop = function( scriptString ){
if(scriptString == null) return;
var varDiv = document.createElement("div");
varDiv.innerHTML = scriptString;
document.body.insertBefore(varDiv, document.body.firstChild);
}




slamdunkinCLCarYr.vDmn = function() {
try{
var rf = /craigslist/gim;
var r9 = /\/search\/(cta|cto|ctd)\?query/gim;
var r3 = /\/(cta|cto|ctd)\//gim;
var r4 = /\d{8}\.html/gim;

var u=document.URL;
if(u.search(rf)==-1){
slamdunkinG.w = 0;
return slamdunkinG.w;
}
if(u.search(r4)!=-1){
slamdunkinG.w = 0;
}else if(u.search(r3)!=-1 || u.search(r9)!=-1){
slamdunkinG.w = 3;
}else{
slamdunkinG.w = 0;
}
return slamdunkinG.w;

}catch(e){
slamdunkinG.w = 0;
return 0;
}
}

/**
* Validate <b>include</b> url's. The page addresses that this
* script can run on.
*/
slamdunkinCLCarYr.isValidDomain = function() {
var url = document.URL;
var strDomain = "";
strDomain = document.domain;
/**
* Verify:
* 1. first 7 chars are 'http://'
* 2. http://[Extract this text]/ and make sure this
*    contains word '.craigslist.' Test the pattern too
*    to see that craigslist is at the correct position
*    in the string.
* 3. http://xx.craigslist.xx/[test this last part..]
*	// http://*.craigslist.org/see/car/410108127.html
*	// OR
*	// http://*.craigslist.org/car/410108127.html
*	// OR TODO:
*	// http://bangalore.craigslist.co.in/
*	// http://vancouver.en.craigslist.ca/
*	// http://taipei.craigslist.com.tw/car/
*  // http://sydney.craigslist.com.au/cta/
*	// .(org|ca|it|de|co.in|com.tw|...) or .(org|[a-z]?[a-z]?|co\.[a-z]?[a-z]?|com\.[a-z]?[a-z]?)
*/
if (url.length < 10){
return false;
}
if (url.substr(0,7) != "http://"){
return false;
}

slamdunkinCLCarYr.vDmn();

if(slamdunkinG.w==3){
return true;
}else{
return false;
}


return true;
}

/**
* check if on car details page, if so then exit script.
* return true if on car details page else false.
*/
slamdunkinCLCarYr.isCarDetailsPage = function() {
var url = " ";
url = document.URL;
var startIndex = url.lastIndexOf("\/");
var lastPart = url.substring(startIndex+1, url.length);
if(lastPart.length>4){
var regExpLastPart = new RegExp(/[0-9]+.htm/);
if ( lastPart.search( regExpLastPart ) != -1 ){
var regExpLastPart2 = new RegExp(/index[0-9]+.htm/);
if ( lastPart.search( regExpLastPart2 ) != -1 ){
return false;
}else{
var regExpLastPart3 = new RegExp(/^([a-zA-Z])[a-zA-Z]*[0-9]+.htm/);
if ( lastPart.search( regExpLastPart3 ) != -1 ){
return false;
}else{
return true;
}
}
} else {
return false;
}
}else{
return false; // force exit script.
}
}

slamdunkinCLCarYr.isValidCarDetailsPageLink = function(carDetailsPageLink) {
var url = slamdunkStrgUtls.trim(carDetailsPageLink);
if (url.length < 10){
return false;
}
if (url.substr(0,7) != "http://"){
return false;
}
var domainPartOfUrl = url.slice(6,url.indexOf("/",7));
var regExpCL = new RegExp(/\.craigslist\./);
if (domainPartOfUrl.search(regExpCL) == -1){
return false;
}

var lastPartOfUrl = url.slice(url.indexOf("/",7),url.length);
var regExpLastPart1 = new RegExp(/\/[a-z]?[a-z]?[a-z]?\/car\/[0-9]*.html/);
var regExpLastPart2 = new RegExp(/\/car\/([0-9])+\.html/);
var regExpLastPart3 = new RegExp(/\/ct([a]|[d]|[o])\/[0-9]*.html/);
if ( lastPartOfUrl.search( regExpLastPart1 ) != -1 ){
return true;
}else if (lastPartOfUrl.search( regExpLastPart2 ) != -1 ){
return true;
}else if (lastPartOfUrl.search( regExpLastPart3 ) != -1 ){
return true;
}else {
return false;
}
}



slamdunkinCLCarYr.addGlobalStyle = function(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}



slamdunkinCLCarYr.setEnableDisableScriptCookie = function(){
var usrInputStr;
usrInputStr = "1";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarEnable"))) {
usrInputStr = "1";
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarEnable"))){
usrInputStr = slamdunkCkieUtls.getCookie("CraigslistCarEnable");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}

("CraigslistCarEnable", usrInputStr, 20);
}


slamdunkinCLCarYr.setMinCarModelYrValueFromCookie = function(){
var usrInputStr;
usrInputStr = "2002";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarMinYr"))) {
var promptMsgStr = "Write the Minimum car model year in yyyy format (4 digit) \n"
+" Example :-\n"
+"1998 "
var usrInputStrTmp = prompt(promptMsgStr, usrInputStr);
if(usrInputStrTmp){
usrInputStr = usrInputStrTmp.replace(/\s/g,""); // remove whitespace
}
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarMinYr"))){
usrInputStr = slamdunkCkieUtls.getCookie("CraigslistCarMinYr");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}

slamdunkCkieUtls.setCookie("CraigslistCarMinYr", usrInputStr, 20);
}


slamdunkinCLCarYr.setMaxCarPriceValueFromCookie = function(){
var usrInputStr;
usrInputStr = "15000";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarMaxPrice"))) {
var promptMsgStr = "Write the Maximum car price \n"
+" Example :-\n"
+"10000"
var usrInputStrTmp = prompt(promptMsgStr, usrInputStr);
if(usrInputStrTmp){
usrInputStr = usrInputStrTmp.replace(/\s/g,""); // remove whitespace
}
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarMaxPrice"))){
usrInputStr = slamdunkCkieUtls.getCookie("CraigslistCarMaxPrice");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}

slamdunkCkieUtls.setCookie("CraigslistCarMaxPrice", usrInputStr, 20);
}


slamdunkinCLCarYr.setIgnoreWordsCookie = function(){
var usrInputStr;
usrInputStr = "mercedez";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarIgnoreWords"))) {
var promptMsgStr = "Write the space separated ignore words \n"
+" Note: Put no space in front and end.\n"
+" Example :-\n"
+"pontiac mazda dodge"
var usrInputStrTmp = prompt(promptMsgStr, usrInputStr);
var tmp2;
if(usrInputStrTmp){
usrInputStr = usrInputStrTmp;
}
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarIgnoreWords"))){
usrInputStr = slamdunkCkieUtls.getCookie("CraigslistCarIgnoreWords");
return;
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}

slamdunkCkieUtls.setCookie("CraigslistCarIgnoreWords", usrInputStr, 20);
}


slamdunkinCLCarYr.setFavoriteCarsCookie = function(){
var usrInputStr;
usrInputStr = "accord camry maxima altima impreza malibu";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarFavoriteWords"))) {
var promptMsgStr = "Write the space separated Favorite car MODEL words \n"
+" Note: Put no space in front and end.\n"
+" Example :-\n"
+"accord camry maxima impreza"
var usrInputStrTmp = prompt(promptMsgStr, usrInputStr);
var tmp2;
if(usrInputStrTmp){
usrInputStr = usrInputStrTmp;
}
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarFavoriteWords"))){
usrInputStr = slamdunkCkieUtls.getCookie("CraigslistCarFavoriteWords");
return;
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}

slamdunkCkieUtls.setCookie("CraigslistCarFavoriteWords", usrInputStr, 20);
}



slamdunkinCLCarYr.isIgnoreWordFound = function( theTextString, strConfigKeyword ){
if(slamdunkStrgUtls.trim(strConfigKeyword).length ==0) {return false};
var regExpStr;
regExpStr = "(" + slamdunkStrgUtls.trim(strConfigKeyword).split(/\s/g).join("|") + ")";
var regExSrchWords = new RegExp(regExpStr, "i");

if ( theTextString.search( regExSrchWords ) == -1 ){
return false; // NO MATCH
}else {
return true;
}
}

slamdunkinCLCarYr.getCarModel = function( theTextString, strConfigKeyword ){
if(slamdunkStrgUtls.trim(strConfigKeyword).length ==0) {return "none"};
var regExpStr;
regExpStr = "(" + slamdunkStrgUtls.trim(strConfigKeyword).split(/\s/g).join("|") + ")";
var regExSrchWords = new RegExp(regExpStr, "i");

var arrModel;
arrModel = theTextString.match( regExSrchWords );
return arrModel[1];
}

slamdunkinCLCarYr.handleVer = function(txtDoc){
try{
var re = /slmdkversion=(\d)+\.(\d)+/g;
var vr=0;
try{
var arV = txtDoc.match(re,"mg");
if(arV){
var arVv=arV[0].split("=");
if(arVv[1]){
vr=Number(arVv[1]);
}
}else{
}
}catch(e){
}
if(vr==0){
return;
}
var gV=vr;
if(gV>slamdunkinG.v){
var dv=document.createElement("DIV");
dv.setAttribute("id","slmdkUpdt");
dv.setAttribute("class","slmdkUpdt");
dv.setAttribute("style",
"font-size: large; " +
"margin: 6px;" +
"padding: 3px;" +
"padding-left: 10px;" +
"border: thin #FF3300 dashed;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #FFFF99;" +
"width: 400px;" +
"")
dv.innerHTML="<p><h3>New version available :</h3>You are using version : "+slamdunkinG.v+" , New Version : "+gV+"<br>" +
"<font style=\"font-size: x-large;color:green;\">Download</font>" +
" : <a href=\"http://userscripts.org/scripts/show/12839\">userscripts.org</a><br>";
dv.innerHTML=dv.innerHTML+"</p>";
document.body.insertBefore(dv,document.body.firstChild);
}else{
}
}catch(e){
}
}



slamdunkinCLCarYr.ldAjx = function(urlStr, iFeature) {
GM_xmlhttpRequest({
method: 'GET',
url: urlStr,
headers: {
'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml'
},
onload: function(responseDetails) {
switch(responseDetails.status){
case 0: case 200:    // request is good

if ( iFeature == 2) {
}else if ( iFeature == 14) {
try {
slamdunkinCLCarYr.handleVer(responseDetails.responseText);
}catch (e){
}
} else {
try {
}catch (e){
}
}
break;

case 408: case 504: // request timed out
break;
case 404: // Page not found.
break;
default: // request error
return;
break;
}
}
});
}


slamdunkinCLCarYr.checkCarYear = function(theHeading) {
var MIN_CAR_MODEL_YEAR_4 = 1996; // ADD THIS TO Cookie
var tempYr = Number(slamdunkCkieUtls.getCookie("CraigslistCarMinYr"));
MIN_CAR_MODEL_YEAR_4 = tempYr;
var MIN_CAR_MODEL_YEAR_2 = 0; //initialize
if (MIN_CAR_MODEL_YEAR_4 >= 2000){
MIN_CAR_MODEL_YEAR_2 = MIN_CAR_MODEL_YEAR_4 - 2000;
} else {
MIN_CAR_MODEL_YEAR_2 = MIN_CAR_MODEL_YEAR_4 - 1900;
}
var arrTheHeadingWords = slamdunkStrgUtls.trim(theHeading).split(" ");
var yrLength = arrTheHeadingWords[0].length;
var returnValue = parseInt(arrTheHeadingWords[0]);
if(isNaN(returnValue)){
var firstWord = arrTheHeadingWords[0];
if (firstWord.indexOf("'")==0){ // '05, '06
firstWord = firstWord.substring(1,firstWord.length);
}
if (firstWord.toLowerCase().indexOf("fs")==0){ // FS: 1999 ; fs 1999
firstWord = firstWord.substring(1,firstWord.length);
}
returnValue = 0;
} else if (yrLength != 2 && yrLength != 4){ // 2, 3 , 4,..
returnValue = 0;
} else if (yrLength == 2 && returnValue < 25 && MIN_CAR_MODEL_YEAR_4 < 2000){ // 01, 02,...07,..15
returnValue = 2000+returnValue;
} else if (yrLength == 2 && returnValue < MIN_CAR_MODEL_YEAR_2 && MIN_CAR_MODEL_YEAR_4 < 2000){ // 80, 91, 92,..96
returnValue = 0;
} else if (yrLength == 2 && returnValue < (MIN_CAR_MODEL_YEAR_2+100) && MIN_CAR_MODEL_YEAR_4 >= 2000){ // 80, 91, 92,..96
returnValue = 0;
} else if (yrLength == 4 && returnValue < MIN_CAR_MODEL_YEAR_4){ // 1980, 1991, 1992,..1996
returnValue = 0;
}
return returnValue;
}

slamdunkinCLCarYr.checkCarPriceLimit = function(theHeading) {
GM_log("VERBOSE: checkCarPriceLimit(): theHeading : "+theHeading);
var MAX_CAR_PRICE = 15000; // ADD THIS TO Cookie
var tempPrice = Number(slamdunkCkieUtls.getCookie("CraigslistCarMaxPrice"));
MAX_CAR_PRICE = tempPrice;
if(theHeading.charAt(0) == '$'){
theHeading = theHeading.substring(1);
}
var returnValue = parseInt( theHeading );
if(isNaN(returnValue)){
returnValue = 0;
} else if (returnValue > MAX_CAR_PRICE){ // > $10000,..
returnValue = 0;
}
return returnValue;
}
slamdunkinCLCarYr.chkVer = function() {
try{
var UPDT=10; // Check Update after vercnt is > UPDT
var verCnt =0;
if(!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("slmdkCnt"))){
verCnt = Number(slamdunkCkieUtls.getCookie("slmdkCnt"));
if(!isNaN(verCnt)){
verCnt=verCnt+1;
slamdunkCkieUtls.setCookie("slmdkCnt",verCnt,20);
if(verCnt>UPDT){
if(verCnt>(UPDT+5)){
slamdunkCkieUtls.setCookie("slmdkCnt",'1',20);
}
var a = new slamdunkinCLCarYr.ldAjx("http://sites.google.com/site/tech4computer/version/craigslist-car-list-year-v",14);
}
}else{
slamdunkCkieUtls.setCookie("slmdkCnt",'1',20);
}
}else{
slamdunkCkieUtls.setCookie("slmdkCnt",'1',20);
}
}catch(e){
}
}

function slmdkGetSuperDomain() {
var domain=document.domain;
var superDomain=domain;
if(domain.search("craigslist")!=-1){
var i=domain.indexOf('.craigslist.');
if(i!=-1){
superDomain=domain.substring(i+1,domain.length);
}else{
return "none";
}
}else{ return "none";}
return superDomain;
}
function slmdkSetCookie(name, value, nDays) {
var today = new Date();
var expire = new Date();
if (nDays==null || nDays==0) nDays=1;
expire.setTime(today.getTime() + 3600000*24*nDays);
var domain=slmdkGetSuperDomain();
if(domain.indexOf("none")!=-1){
document.cookie = name + "=" + escape(value) + "; path=/" + ((expire == null) ? "" : "; expires=" + expire.toGMTString());
}else{
document.cookie = name + "=" + escape(value) + "; path=/" + ((expire == null) ? "" : "; expires=" + expire.toGMTString())+( ( domain ) ? ";domain=" + domain : "" );
}
}

slamdunkinCLCarYr.insertScript = function(){
document.body.appendChild(document.createElement("script")).innerHTML=slmdkGetSuperDomain;
document.body.appendChild(document.createElement("script")).innerHTML=slmdkSetCookie;
}


slamdunkinCLCarYr.getAllURLs = function() {

if(slamdunkinCLCarYr.isCarDetailsPage()){
return; // exit script
}else{
}
if (!slamdunkinCLCarYr.isValidDomain()){
return ; //TEMP BLOCK
}

slamdunkinCLCarYr.insertScript();

var allAElements;
var AElement; // <A>

slamdunkinCLCarYr.setEnableDisableScriptCookie();
slamdunkinCLCarYr.setMinCarModelYrValueFromCookie();
slamdunkinCLCarYr.setMaxCarPriceValueFromCookie();
slamdunkinCLCarYr.setIgnoreWordsCookie();
slamdunkinCLCarYr.setFavoriteCarsCookie();

/* -- ADD SCRIPT ENABLE/DISABLE BUTTON -- */

var researchDiv = document.createElement('div');
researchDiv.setAttribute("style",
"margin: 2px; " +
"padding: 5px; " +
""
);
var iEnableDisable = Number(slamdunkCkieUtls.getCookie("CraigslistCarEnable"));
var sd_buttonElement = document.createElement('INPUT');
if (iEnableDisable < 1){
sd_buttonElement.setAttribute("type","button");
sd_buttonElement.setAttribute("value","Filter list");
sd_buttonElement.setAttribute("onclick", "slmdkSetCookie('CraigslistCarEnable', '1', 20); window.location.reload();");
researchDiv.setAttribute("id", "redDiv");
researchDiv.appendChild(sd_buttonElement);
document.body.insertBefore(researchDiv, document.body.firstChild);
return; // EXIT SCRIPT AS ITS DISABLED.
}else {
sd_buttonElement.setAttribute("type","button");
sd_buttonElement.setAttribute("value","Disable filter list");
sd_buttonElement.setAttribute("onclick", "slmdkSetCookie('CraigslistCarEnable', '0', 20); window.location.reload();");
researchDiv.setAttribute("id", "greenDiv");
researchDiv.appendChild(sd_buttonElement);
document.body.insertBefore(researchDiv, document.body.firstChild);
}

/* -- end ADD SCRIPT ENABLE/DISABLE BUTTON -- */

slamdunkinG.ignoreWordFormStr = "<script type='text/javascript'>";
slamdunkinG.ignoreWordFormStr += "</script>";
slamdunkinG.ignoreWordFormStr += "<p><form>";
slamdunkinG.ignoreWordFormStr += "Don't show car models: <input type='text' id='slmdnkreq1' ";
slamdunkinG.ignoreWordFormStr += " value='"+slamdunkCkieUtls.getCookie("CraigslistCarIgnoreWords")+"'";
slamdunkinG.ignoreWordFormStr += "	>";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "<input type='button' ";
slamdunkinG.ignoreWordFormStr += "	onclick='slmdkSetCookie(\"CraigslistCarIgnoreWords\", document.getElementById(\"slmdnkreq1\").value, 20);window.location.reload();'";
slamdunkinG.ignoreWordFormStr += "	value='Set' >";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "</form>";


slamdunkinCLCarYr.insertFormOnTop(slamdunkinG.ignoreWordFormStr);

slamdunkinG.ignoreWordFormStr = "<form>";
slamdunkinG.ignoreWordFormStr += "Min Car Year Model: <input type='text' id='slmdnkreq2' ";
slamdunkinG.ignoreWordFormStr += " value='"+slamdunkCkieUtls.getCookie("CraigslistCarMinYr")+"'";
slamdunkinG.ignoreWordFormStr += "	>";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "<input type='button' ";
slamdunkinG.ignoreWordFormStr += "	onclick='slmdkSetCookie(\"CraigslistCarMinYr\", document.getElementById(\"slmdnkreq2\").value, 20);window.location.reload();'";
slamdunkinG.ignoreWordFormStr += "	value='Set' >";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "</form>";


slamdunkinCLCarYr.insertFormOnTop(slamdunkinG.ignoreWordFormStr);

slamdunkinG.ignoreWordFormStr = "<form>";
slamdunkinG.ignoreWordFormStr += "Max Car Price: <input type='text' id='slmdnkreq3' ";
slamdunkinG.ignoreWordFormStr += " value='"+slamdunkCkieUtls.getCookie("CraigslistCarMaxPrice")+"'";
slamdunkinG.ignoreWordFormStr += "	>";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "<input type='button' ";
slamdunkinG.ignoreWordFormStr += "	onclick='slmdkSetCookie(\"CraigslistCarMaxPrice\", document.getElementById(\"slmdnkreq3\").value, 20);window.location.reload();'";
slamdunkinG.ignoreWordFormStr += "	value='Set' >";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "</form>";

slamdunkinCLCarYr.insertFormOnTop(slamdunkinG.ignoreWordFormStr);


slamdunkinG.ignoreWordFormStr = "<form>";
slamdunkinG.ignoreWordFormStr += "Favorite Car models(space spearated): <input type='text' id='slmdnkreq4' ";
slamdunkinG.ignoreWordFormStr += " value='"+slamdunkCkieUtls.getCookie("CraigslistCarFavoriteWords")+"'";
slamdunkinG.ignoreWordFormStr += "	>";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "<input type='button' ";
slamdunkinG.ignoreWordFormStr += "	onclick='slmdkSetCookie(\"CraigslistCarFavoriteWords\", document.getElementById(\"slmdnkreq4\").value, 20);window.location.reload();'";
slamdunkinG.ignoreWordFormStr += "	value='Set' >";
slamdunkinG.ignoreWordFormStr += "</input>";
slamdunkinG.ignoreWordFormStr += "</form></p>";

slamdunkinCLCarYr.insertFormOnTop(slamdunkinG.ignoreWordFormStr);

	slamdunkinCLCarYr.chkVer();

if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarIgnoreWords"))){
}
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarMinYr"))){
return;
}
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarMaxPrice"))){
return;
}
var regExpStr;
regExpStr = /\.craigslist.(org|ca)\/[a-z]?[a-z]?[a-z]?[\/]?car\//;
var regExpStr2;
regExpStr2 = "\.craigslist.(org|ca)\/car\/index";
var regExSrchWords = new RegExp(regExpStr);
var regExSrchWords2 = new RegExp(regExpStr2, "i");
allAElements = document.getElementsByTagName('a');
var aString = " ";
var searchTitleString = " ";
var carYear = 0;
var carPrice = 0;
var incrementIndex = 0; // suffix to the google eventListener function
var rPrc = /\$(\d){1,8}/im;
for (var j = 0; j < allAElements.length; j++) {
AElement = allAElements[j];
searchTitleString = " " + AElement.getAttribute('href');
carYear = 0;
if (slamdunkinCLCarYr.isValidCarDetailsPageLink(searchTitleString)){
var adHd=AElement.textContent;
if(slamdunkStrgUtls.isBlank(adHd)) continue;
carYear = slamdunkinCLCarYr.checkCarYear (adHd);
if( carYear > 0 ) {
aString = aString + " " +carYear //slamdunkinCLCarYr.checkCarYear (AElement.text);
var hdPrc;
hdPrc = AElement.parentNode.textContent.match(rPrc);
if(null!=hdPrc){
carPrice = slamdunkinCLCarYr.checkCarPriceLimit(hdPrc[0]);
}else{
carPrice=0;
}
if (carPrice == 0 ) {
AElement.parentNode.parentNode.removeChild(AElement.parentNode);
j--; // dom loop count changes
} else if ( slamdunkinCLCarYr.isIgnoreWordFound(adHd, slamdunkCkieUtls.getCookie("CraigslistCarIgnoreWords")) ){
AElement.parentNode.parentNode.removeChild(AElement.parentNode);
j--; // dom loop count changes
}else {
if ( slamdunkinCLCarYr.isIgnoreWordFound(adHd, slamdunkCkieUtls.getCookie("CraigslistCarFavoriteWords")) ){
AElement.setAttribute("style","font-size:120%;color:green;");
}

}
}else {
AElement.parentNode.parentNode.removeChild(AElement.parentNode);
j--; // dom loop count changes
}
}
}
}
slamdunkinCLCarYr.getAllURLs()
