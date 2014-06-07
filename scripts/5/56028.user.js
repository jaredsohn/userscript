// ==UserScript==
// @name          Craigslist Car and motorcycle import cost to Canada
// @namespace     https://addons.mozilla.org/en-US/firefox/user/527582
// @description   Shows approximate cost of importing car from USA to Canada. Works on Craigslist car and motorcycle listing.
// @include       http://*.craigslist.org/car/
// @include       http://vancouver.craigslist.org/car/index*.html
// @include       http://*.craigslist.org/search/cta*
// @include       http://*.craigslist.org/search/ctd*
// @include       http://*.craigslist.org/search/cto*
// @include       http://*.craigslist.org/ct*/
// @include       http://*.craigslist.org/ct*/index*.html
// @include       http://*.craigslist.org/mca/
// @include       http://*.craigslist.org/mcd/
// @include       http://*.craigslist.org/mcy/
// @include       http://*.craigslist.org/mca/index*.html
// @include       http://*.craigslist.org/mcd/index*.html
// @include       http://*.craigslist.org/mcy/index*.html
// @include       http://*.craigslist.org/search/mca*
// @include       http://*.craigslist.org/search/mcd*
// @include       http://*.craigslist.org/search/mcy*
// @exclude       http://localhost/*
// @exclude       http://127.0.0.1/*
// @version       1.01
// ==/UserScript==
// Version 1.020
/* @author tech4computer */
/* copyrights © 2012 tech4computer */
if(!slmdkXchDbg) var slmdkXchDbg = {
};
slmdkXchDbg.dbgDiv=function(){
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
//slmdkXchDbg.dbgDiv();
slmdkXchDbg.prtToDbg = function( displayString ){
if(displayString == null) return;
var cookieSettingsContainer = document.getElementById("divCookieSettingsContainerG");
if (null != cookieSettingsContainer){
var varDiv = document.createElement("div");
if(typeof(displayString)=="string"){
if(displayString.indexOf("VERBOSE")==0){
displayString = "<font style=\"color:blue;\">"+displayString+"</font>";
}else if(displayString.indexOf("EXCEPTION")==0){
displayString = "<font style=\"color:red;\">"+displayString+"</font>";
}else{
}
}else{
}
varDiv.innerHTML = '<div style="margin: 0 auto 0 auto; padding: 3px; padding-bottom: 1px; padding-top: 1px; padding-left: 10px;"> ' +
displayString +
'</div>';
cookieSettingsContainer.appendChild(varDiv);
} else {
}
}
slmdkXchDbg //
.lg=function(val){
if(!GM_log){
}else{
//slmdkXchDbg.prtToDbg(val);
return;
}
}
if(!slamdunkStrgUtls) var slamdunkStrgUtls = {
};
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
if(!slamdunkCkieUtls) var slamdunkCkieUtls = {
};
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
var exp = new Date();
return exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * days));
}
slamdunkCkieUtls.getCookie = function(name) {
var dc = document.cookie;
var arrCookie = dc.split(";");
for ( var arrIndex in arrCookie ) {
var arrConfigWords = slamdunkStrgUtls.trim(arrCookie[arrIndex]).split("=");
if ( arrConfigWords.length > 0  ){
if(arrConfigWords[0] == name){
return unescape(arrConfigWords[1]);
break;
}
}
}
return null;
}
slamdunkCkieUtls.delCookie = function(name) {
document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/;domain=;";
}
if(!slmdkXch) var slmdkXch = {};
slmdkXch.getSettingsContainer = function(){
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
"background-color: #FFFFCC;" +
"");
var varSettingsHeadingDiv = document.createElement("div");
varSettingsHeadingDiv.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
'padding:3px;padding-bottom:1px;padding-top:2px;padding-left:10px;' +
'font-family: Georgia, sans-serif, arial;' +
'font-size: large;' +
'">' +
"<a href=\"http://tech4computer.wordpress.com/2009/03/08/craigslist-car-buy-research-firefox-extension/\">" +
"<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAwZJREFUOE9dU11Ik2EYfS2SxBQLIRW98dYrwaiJPxN0Ttf8mTS3lciWzqlp/rC2qWia+JOlJv4kpJdiBIEXdWF4sWUKmZSWQWIXounK1nJTp87t9L7f9AP7br7vfR7Oec457/P5TX9A8tIKubBmJYE2Owl07JDzrn3if+gm5zxecvblpuzMeT+3m/j7u0lAwAEJDt4noaF7JDJyl8TEOMnTcUiMj6DQmFAsu4MqkQampJtoFuSj7ZocnXsCYRfi49uQnHwf6ekmyGR3odEUw2hUYHhYQhp6IFdTcFYpaoQFaEwpwOPnr2FZt2Lr6Ager8fjhdVqw8TEDDIyepCS0ojs7Bqo1cVoaJATXSPUueWoouAmVQ2GN37BBvp4vV72Ov3YbA7odKMQChuRm1tFv9VEVYtSkRomNnlzywe2b8PVMYyvPLq1dYmq2OXOdrsTUukTiEQmqFSlhE1nnsdf4e0J+OoNzFyOxxxPEB09j5iYaWxsOLna5OQ8kpKamQoi0UIvkKOdeWa9BwNYConD3MU4fOMJIiOXERLyHhUVH7na9vYOBIJ2SCR6Ii6CgU7sZIGxHk1+NigWC8GxWOcJwsPXERS0gKgoCw3HV87J6YNYbCDi2zBQ0EOPB1wnToaZS1fwuXUQ2zzByIgTYWFfEBFh5tPNy+unBEbeAg3wDwM8e4HvK6vY+y9/YG1tH729y1x9Z8flZRYyM+9xISaq0DwxhVnWYwoP3fAMjeEHT9LdvQ6X64iXbzYvIjGxhdqoJvTuy9LUqMsoQu+eCwcM9PM3dqta8YknqKxcwOqqgzu73R7I5QNIS6uDUllGSk4W6Raa6FKN/nXAd1XHak4tFJUOg2GMW2s6HVqthtT3IF9thDZLR1eZkkhL0PfmHeYdTvgW59gzLJZFOnmQA0ultSgs1MJkUhDq9bqhC0pGwvJgdlgmbDfouc+VpxyigXUgIaEFqan13OTCwhLo9Sr090uJeQ7JjIQpYXZYJoyILRi7Ypc4q56lTX+gaigU5Uw2m8zAmJoS/gPYXMQocevTNAAAAABJRU5ErkJggg==\"  />" +
"</a>" +
"&nbsp;Settings" +
'</div>';
newSettingsContainer.appendChild(varSettingsHeadingDiv);
document.body.insertBefore(newSettingsContainer,document.body.firstChild);
return newSettingsContainer;
} catch (e){
}
}
}
slmdkXch.insertStringInSettingsContainerOnTop = function( displayString ){
if(displayString == null) return;
var cookieSettingsContainer = slmdkXch.getSettingsContainer();
if (null != cookieSettingsContainer){
var varDiv = document.createElement("div");
varDiv.innerHTML = '<div style="margin: 0 auto 0 auto; padding: 3px; padding-bottom: 1px; padding-top: 1px; padding-left: 10px;"> ' +
displayString +
'</div>';
cookieSettingsContainer.appendChild(varDiv);
} else {
}
}
slmdkXch.insertFormOnTop = function( displayString ){
if(displayString == null) return;
slmdkXch.insertStringInSettingsContainerOnTop(displayString);
}
slmdkXch.insertScriptOnTop = function( scriptString ){
if(scriptString == null) return;
var varDiv = document.createElement("div");
varDiv.innerHTML = scriptString;
document.body.insertBefore(varDiv, document.body.firstChild);
}
if(!slmdkGTContXch) var slmdkGTContXch = {
t:function(){
var c = document.createElement("table");
c.setAttribute("style","" +
"margin: 2px;" +
"background-color: #f7fafc;" +
"padding: 2px; " +
"border: 1px solid #eef1f3;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"");
var b=document.createElement("tbody");
var r1=document.createElement("tr");
var th1=document.createElement("th");
var td1=document.createElement("td");
try{
r1.appendChild(td1);
b.appendChild(r1);
c.appendChild(th1);
c.appendChild(b);
var d = document.createElement('DIV');
d.setAttribute("id", "slmdkGTCont");
d.setAttribute("style", "" +
"margin: 0px;" +
""
);
var u = document.createElement('UL');
u.setAttribute("id", "slmdkGULContXch");
u.setAttribute("style", "" +
"list-style: none;" +
"display: table;" +
"margin-left: 0;" +
"padding-left: 1em;" +
"");
d.appendChild(u);
td1.appendChild(d);
document.body.insertBefore(c, document.body.firstChild);
}catch(e){
}
},
};
slmdkXch.setEnableDisableScriptCookie = function() {
var usrInputStr;
usrInputStr = "1";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCurrXEnable"))) {
usrInputStr = "1";
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCurrXEnable"))){
usrInputStr = slamdunkCkieUtls.getCookie("CraigslistCurrXEnable");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}
slamdunkCkieUtls.setCookie("CraigslistCurrXEnable", usrInputStr, 20);
}
slmdkXch.setCrrXchFromCookie = function() {
var usrInputStr="200";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch1"))) {
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch1"))){
usrInputStr = slamdunkCkieUtls.getCookie("CLXch1");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}
slamdunkCkieUtls.setCookie("CLXch1", usrInputStr, 20);
var usrInputStr="1";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch1"))) {
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch1"))){
usrInputStr = slamdunkCkieUtls.getCookie("CLXch1");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}
slamdunkCkieUtls.setCookie("CLXch1", usrInputStr, 20);
usrInputStr="7";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch2"))) {
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch2"))){
usrInputStr = slamdunkCkieUtls.getCookie("CLXch2");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}
slamdunkCkieUtls.setCookie("CLXch2", usrInputStr, 20);
usrInputStr="5";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch3"))) {
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch3"))){
usrInputStr = slamdunkCkieUtls.getCookie("CLXch3");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}
slamdunkCkieUtls.setCookie("CLXch3", usrInputStr, 20);
usrInputStr="1.0820";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch4"))) {
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch4"))){
usrInputStr = slamdunkCkieUtls.getCookie("CLXch4");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}
slamdunkCkieUtls.setCookie("CLXch4", usrInputStr, 20);
}
slmdkXch.checkCarPriceLimit = function(theHeading) {
var hdng=theHeading.textContent;
var rgPrc=/(\s)+-(\s)+\$(\d){1,6}/gim;
var rgPrcM=/(\s)+-(\s)+\$(\d){1,6}/;
var rgNm=/(\d){1,6}/;
if(hdng.search(rgPrc)==-1){
return 0;
}
var arMtch=hdng.match(rgPrcM);
if(null==arMtch || arMtch==undefined || arMtch.length==0){
return 0;
}
var mtch=arMtch[0];
var arPrcNm=mtch.match(rgNm);
if(null==arPrcNm || arPrcNm==undefined || arPrcNm.length==0){
return 0;
}
var prcNm=arPrcNm[0];
returnValue=prcNm;
var MAX_CAR_PRICE = 15000;
if(isNaN(returnValue)){
returnValue = 0;
} else {
var xch1=0;
var xch2=0;
var xch3=0;
var xch4=0;
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch1"))){
xch1 = Number(slamdunkCkieUtls.getCookie("CLXch1"));
}
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch2"))){
xch2 = Number(slamdunkCkieUtls.getCookie("CLXch2"));
}
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch3"))){
xch3 = Number(slamdunkCkieUtls.getCookie("CLXch3"));
}
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CLXch4"))){
xch4 = Number(slamdunkCkieUtls.getCookie("CLXch4"));
}
var xchVal = 0;
xchVal = Math.round(xch4*returnValue*100)/100;
returnValue = xchVal+(xchVal*((xch2+xch3)/100))+xch1;
returnValue = Math.round(returnValue*100)/100;
}
return returnValue;
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
slmdkXch.insertScript = function(){
document.body.appendChild(document.createElement("script")).innerHTML=slmdkGetSuperDomain;
document.body.appendChild(document.createElement("script")).innerHTML=slmdkSetCookie;
}
slmdkXch.getAllURLs = function() {
slmdkXch.insertScript();
var allAElements;
var AElement;
slmdkXch.setEnableDisableScriptCookie();
slmdkXch.setCrrXchFromCookie();
slmdkGTContXch.t();
var li = document.createElement('LI');
li.setAttribute("style","display: table-row;");
var researchDiv = document.createElement('div');
researchDiv.setAttribute("style",
"margin: 2px; " +
"padding: 1px; " +
""
);
li.appendChild(researchDiv);
var t=document.getElementById("slmdkGULContXch");
if(t!=null){
t.appendChild(li);
}else{
document.body.insertBefore(li, document.body.firstChild);
}
var lgoA = document.createElement("A");
lgoA.setAttribute("href","http://tech4computer.wordpress.com/2009/03/08/craigslist-car-buy-research-firefox-extension/");
var lgoImg = document.createElement("IMG");
lgoImg.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAwZJREFUOE9dU11Ik2EYfS2SxBQLIRW98dYrwaiJPxN0Ttf8mTS3lciWzqlp/rC2qWia+JOlJv4kpJdiBIEXdWF4sWUKmZSWQWIXounK1nJTp87t9L7f9AP7br7vfR7Oec457/P5TX9A8tIKubBmJYE2Owl07JDzrn3if+gm5zxecvblpuzMeT+3m/j7u0lAwAEJDt4noaF7JDJyl8TEOMnTcUiMj6DQmFAsu4MqkQampJtoFuSj7ZocnXsCYRfi49uQnHwf6ekmyGR3odEUw2hUYHhYQhp6IFdTcFYpaoQFaEwpwOPnr2FZt2Lr6Ager8fjhdVqw8TEDDIyepCS0ojs7Bqo1cVoaJATXSPUueWoouAmVQ2GN37BBvp4vV72Ov3YbA7odKMQChuRm1tFv9VEVYtSkRomNnlzywe2b8PVMYyvPLq1dYmq2OXOdrsTUukTiEQmqFSlhE1nnsdf4e0J+OoNzFyOxxxPEB09j5iYaWxsOLna5OQ8kpKamQoi0UIvkKOdeWa9BwNYConD3MU4fOMJIiOXERLyHhUVH7na9vYOBIJ2SCR6Ii6CgU7sZIGxHk1+NigWC8GxWOcJwsPXERS0gKgoCw3HV87J6YNYbCDi2zBQ0EOPB1wnToaZS1fwuXUQ2zzByIgTYWFfEBFh5tPNy+unBEbeAg3wDwM8e4HvK6vY+y9/YG1tH729y1x9Z8flZRYyM+9xISaq0DwxhVnWYwoP3fAMjeEHT9LdvQ6X64iXbzYvIjGxhdqoJvTuy9LUqMsoQu+eCwcM9PM3dqta8YknqKxcwOqqgzu73R7I5QNIS6uDUllGSk4W6Raa6FKN/nXAd1XHak4tFJUOg2GMW2s6HVqthtT3IF9thDZLR1eZkkhL0PfmHeYdTvgW59gzLJZFOnmQA0ultSgs1MJkUhDq9bqhC0pGwvJgdlgmbDfouc+VpxyigXUgIaEFqan13OTCwhLo9Sr090uJeQ7JjIQpYXZYJoyILRi7Ypc4q56lTX+gaigU5Uw2m8zAmJoS/gPYXMQocevTNAAAAABJRU5ErkJggg==");
lgoImg.setAttribute("style","vertical-align: bottom; margin: 2px;margin-top: 5px; padding: 2px;");
lgoA.appendChild(lgoImg);
researchDiv.appendChild(lgoA);
var iEnableDisable = Number(slamdunkCkieUtls.getCookie("CraigslistCurrXEnable"));
var sd_btn = document.createElement('INPUT');
if (iEnableDisable < 1){
sd_btn.setAttribute("type","button");
sd_btn.setAttribute("value","Show cost of importing");
sd_btn.setAttribute("style","border-color:#3399ff;border: 1px dashed;");
sd_btn.setAttribute("onclick", "slmdkSetCookie('CraigslistCurrXEnable', '1', 20); window.location.reload();");
researchDiv.setAttribute("id", "slmdkEnblDiv");
researchDiv.appendChild(sd_btn);
return;
}else {
sd_btn.setAttribute("type","button");
sd_btn.setAttribute("value","Disable import cost");
sd_btn.setAttribute("style","border: 1px solid;");
sd_btn.setAttribute("onclick", "slmdkSetCookie('CraigslistCurrXEnable', '0', 20); window.location.reload();");
researchDiv.setAttribute("id", "slmdkEnblDiv");
researchDiv.appendChild(sd_btn);
}
xChFormStr = "<form>";
xChFormStr += "Import duty (RIV fee) etc: <input type='text' id='req5' maxlength='10' size='8' ";
xChFormStr += " value='"+slamdunkCkieUtls.getCookie("CLXch1")+"'";
xChFormStr += "	>";
xChFormStr += "</input>";
xChFormStr += " pst tax %: <input type='text' id='req6' maxlength='10' size='8' ";
xChFormStr += " value='"+slamdunkCkieUtls.getCookie("CLXch2")+"'";
xChFormStr += "	>";
xChFormStr += "</input>";
xChFormStr += " gst tax %: <input type='text' id='req7' maxlength='10' size='8' ";
xChFormStr += " value='"+slamdunkCkieUtls.getCookie("CLXch3")+"'";
xChFormStr += "	>";
xChFormStr += "</input>";
xChFormStr += " <a href=\"http://finance.yahoo.com/currency-converter#from=USD;to=CAD;amt=1\">currency exchange rate</a>: <input type='text' id='req8' maxlength='10' size='8' ";
xChFormStr += " value='"+slamdunkCkieUtls.getCookie("CLXch4")+"'";
xChFormStr += "	>";
xChFormStr += "</input>";
xChFormStr += "<input type='button' ";
xChFormStr += "	onclick='slmdkSetCookie(\"CLXch1\", document.getElementById(\"req5\").value, 20)";
xChFormStr += "	;slmdkSetCookie(\"CLXch2\", document.getElementById(\"req6\").value, 20)";
xChFormStr += "	;slmdkSetCookie(\"CLXch3\", document.getElementById(\"req7\").value, 20)";
xChFormStr += "	;slmdkSetCookie(\"CLXch4\", document.getElementById(\"req8\").value, 20);window.location.reload();'";
xChFormStr += "	value='Set' >";
xChFormStr += "</input>";
xChFormStr += "</form><br>";
xChFormStr += "Note: This is just an approximate cost. Vehicle manufactured outside North America duty (~6.1%) not included. Details at ";
xChFormStr += "<a href=\"http://www.riv.ca\">RIV</a>";
xChFormStr += "</p>";
var li2 = document.createElement('LI');
li2.setAttribute("style","display: table-row;");
var xchDiv = document.createElement('div');
xchDiv.setAttribute("style",
"margin: 2px; " +
"padding: 1px; " +
""
);
li2.appendChild(xchDiv);
xchDiv.innerHTML = xChFormStr;
if(t!=null){
t.appendChild(li2);
}else{
document.body.insertBefore(li2, document.body.firstChild);
}
allAElements = document.getElementsByTagName('p');
var aString = " ";
var searchTitleString = " ";
var carYear = 0;
var carPrice = 0;
var pCls;
for (var j = 0; j < allAElements.length; j++) {
AElement = allAElements[j];
pCls=AElement.getAttribute("class");
if(null==pCls || pCls==undefined || pCls.search("row")==-1){
continue;
}
var aElmt=AElement.getElementsByTagName('a');
if(null==aElmt || aElmt==undefined || aElmt.length==0){
continue;
}
carPrice = slmdkXch.checkCarPriceLimit(AElement);
if (carPrice == 0 ) {
} else if ( carPrice > 0 ){
var pr_pElement = document.createTextNode(" [ " +carPrice.toFixed(0)+" ] ");
aElmt[0].appendChild(pr_pElement);
}else {
}
}
}
slmdkXch.getAllURLs()
