// ==UserScript==
// @name          craigslist-phone-search
// @namespace     http://code.google.com/p/craigslist-phone-search/
// @copyright     2009, tech4computer ( http://code.google.com/p/craigslist-phone-search/ )
// @description   Easy web search on given phone number or email in craigslist listing. Saves few clicks. Tells more about the seller.
// @include       http://*.craigslist.org/*.html
// @include       http://*.craigslist.ca/*.html
// @exclude       http://*.craigslist.org/*index*.html
// @exclude       http://*.craigslist.ca/*index*.html
// @exclude       http://localhost/*
// @exclude       http://127.0.0.1/*
// @version       0.511
// ==/UserScript==

/**
* Copyrights (c) 2009 : @author tech4computer
* Released under the GPLv3 license and
* additional conditions that over rules conflicting
* portion of GPLv3 are:
*  * Cannot commercially redistribute without author's permission.
*  * Cannot list on software directory listings without authors permission.
*
* Author blog: http://tech4computer.wordpress.com
**/


if(!slmdkPhEDbg) var slmdkPhEDbg = {

lg : function(val){
//GM_log(val);
}

};

if(!slmdkStrgUtl) var slmdkStrgUtl = {

LTrim : function( value ) {
var re = /\s*((\S+\s*)*)/;
return value.replace(re, "$1");
},

RTrim : function( value ) {
var re = /((\s*\S+)*)\s*/;
return value.replace(re, "$1");
},

trim : function( value ) {
return slmdkStrgUtl.LTrim(slmdkStrgUtl.RTrim(value));
}
};

if(!slmdkCkieUtl) var slmdkCkieUtl = {

getSuperDomain : function() {
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
,
};

if(!slmdkPhE) var slmdkPhE = {};

slmdkPhE.v = 0.511;
slmdkPhE.lgo = 0;


slmdkPhE.insLi = function(ul,id, stl, elmt) {
try{
if(ul!=null){
var li = document.createElement("li");
li.setAttribute('id', id);
li.setAttribute('class', id);
li.setAttribute('style', stl);
li.appendChild(elmt);
ul.appendChild(li);
}else{
}
}catch(e){
}
};


slmdkPhE.mdPg2 = function(txtDoc) {
var bdr="margin:4px;";
var iMsg = 0;
var phAr = [];
var eAr = [];
var reP2 = /(\(\d{3}\) \d{3}-\d{4})|(\(\d{3}\)\d{3}-\d{4})|(\d{3}-\d{3}-\d{4})|(\d{3} \d{3} \d{4})|(\d{3}\d{3}\d{4})|(\d{3}\.\d{3}\.\d{4})|(\(\d{3}\)-\d{3}-\d{4})(?!@craigslist)/gim;
var reIgPid = /PostingID:\s\d{10}/g;
var reIgPid2 = /pID = \d{10}/g;
var reIgClE = /\d{10}@craigslist/g;
var reE = /([A-Za-z0-9]{1,}([-_\.&'][A-Za-z0-9]{1,}){0,}){1,}@(([A-Za-z0-9]{1,}[-]{0,1})\.){1,}[A-Za-z]{2,6}/gim;
var chkDup = function(ar,val){
var le = ar.length;
for(var j=0;j<le;j++){
if(ar[j]===val){
return true;
}
}
return false;
};
var pushPh = function(val,key){
if (chkDup(phAr,val)!=true){
phAr.push(val);
}
};
var pushE = function(val,key){
if (chkDup(eAr,val)!=true){
eAr.push(val);
}
};
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;

try{
s = xhrdoc.textContent;
try{
s = s.replace(reIgPid,"none");
s = s.replace(reIgPid2,"none");
s = s.replace(reIgClE, "none");
if (s.match(reP2, "mg")) {
var tmpAr = s.match(reP2, "mg");
tmpAr.forEach(pushPh);
iMsg = 1;
}
}catch(rPh){
}
try{
var arS;
var tmpArE;
if (s.indexOf("@")!=-1) {



var reAt = /\b(\S)+@(\S)+\b/gim;
arS = s.match(reAt, "mg");
if(arS){
try{
if(arS.length>0){
for(var k=0;k<arS.length;k++){
eS=arS[k];
tmpArE = eS.match(reE, "mg");
if(tmpArE){
tmpArE.forEach(pushE);
iMsg = 1;
}
}
}
}catch(ear){
}
}
}
}catch(rE){
}
}catch(etx){
}




if(iMsg>0){
var dvWrap = document.createElement('DIV');
dvWrap.setAttribute('id', 'slmdkMsgs');
dvWrap.setAttribute('class', 'slmdkMsgs');
dvWrap.setAttribute('style',
"margin: 2px;" +
"background-color: #ffffff;" +
"padding: 5px; " +
"border: 1px solid #eef1f3;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"font-family: Georgia, sans-serif, arial;" +
"font-size: small;" +
"");
var dvWrap2 = document.createElement('UL');
dvWrap2.setAttribute('id', "slmdkMyUl");
dvWrap2.setAttribute('class', "slmdkMyUl");
dvWrap2.setAttribute('style',
"list-style-type: decimal;" +
"display: table;" +
"padding: 2px; " +
"margin: 1px;" +
"");
dvWrap.appendChild(dvWrap2);
var lgoA = document.createElement("A");
lgoA.setAttribute("href","http://tech4computer.wordpress.com");
var lgoImg = document.createElement("IMG");
lgoImg.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAwZJREFUOE9dU11Ik2EYfS2SxBQLIRW98dYrwaiJPxN0Ttf8mTS3lciWzqlp/rC2qWia+JOlJv4kpJdiBIEXdWF4sWUKmZSWQWIXounK1nJTp87t9L7f9AP7br7vfR7Oec457/P5TX9A8tIKubBmJYE2Owl07JDzrn3if+gm5zxecvblpuzMeT+3m/j7u0lAwAEJDt4noaF7JDJyl8TEOMnTcUiMj6DQmFAsu4MqkQampJtoFuSj7ZocnXsCYRfi49uQnHwf6ekmyGR3odEUw2hUYHhYQhp6IFdTcFYpaoQFaEwpwOPnr2FZt2Lr6Ager8fjhdVqw8TEDDIyepCS0ojs7Bqo1cVoaJATXSPUueWoouAmVQ2GN37BBvp4vV72Ov3YbA7odKMQChuRm1tFv9VEVYtSkRomNnlzywe2b8PVMYyvPLq1dYmq2OXOdrsTUukTiEQmqFSlhE1nnsdf4e0J+OoNzFyOxxxPEB09j5iYaWxsOLna5OQ8kpKamQoi0UIvkKOdeWa9BwNYConD3MU4fOMJIiOXERLyHhUVH7na9vYOBIJ2SCR6Ii6CgU7sZIGxHk1+NigWC8GxWOcJwsPXERS0gKgoCw3HV87J6YNYbCDi2zBQ0EOPB1wnToaZS1fwuXUQ2zzByIgTYWFfEBFh5tPNy+unBEbeAg3wDwM8e4HvK6vY+y9/YG1tH729y1x9Z8flZRYyM+9xISaq0DwxhVnWYwoP3fAMjeEHT9LdvQ6X64iXbzYvIjGxhdqoJvTuy9LUqMsoQu+eCwcM9PM3dqta8YknqKxcwOqqgzu73R7I5QNIS6uDUllGSk4W6Raa6FKN/nXAd1XHak4tFJUOg2GMW2s6HVqthtT3IF9thDZLR1eZkkhL0PfmHeYdTvgW59gzLJZFOnmQA0ultSgs1MJkUhDq9bqhC0pGwvJgdlgmbDfouc+VpxyigXUgIaEFqan13OTCwhLo9Sr090uJeQ7JjIQpYXZYJoyILRi7Ypc4q56lTX+gaigU5Uw2m8zAmJoS/gPYXMQocevTNAAAAABJRU5ErkJggg==");
lgoA.appendChild(lgoImg);
slmdkPhE.insLi(dvWrap2,"slmdkMyLi","display: inline;padding: 2px 6px;",lgoA);
var srch = document.createElement("SPAN");
srch.setAttribute("style","font-family:courier;");
srch.innerHTML = "Search : ";
slmdkPhE.insLi(dvWrap2,"slmdkMyLi","display: inline;padding: 2px 6px;",srch);
var prtPh = function(val,key){
try{
var phSp = document.createElement("SPAN");
var str1 = "<a href="+encodeURI("http://www.google.ca/search?q="+slmdkStrgUtl.trim(val)+" site:"+slmdkCkieUtl.getSuperDomain()+" OR site:craigslist.org")+
" title=\"Search "+val+" in craigslist only\">c</a>";
str1 =  str1 + " " + "<a href="+encodeURI("http://www.google.ca/search?q=\""+slmdkStrgUtl.trim(val)+"\"")+"" +
" title=\"Search "+val+" on whole web\">"+val+"</a>";
phSp.innerHTML = str1;
slmdkPhE.insLi(dvWrap2,"slmdkMyLi","display: inline;padding: 2px 6px;font-family:courier;",phSp);
}catch(eph){
}
};
var prtE = function(val,key){
try {
var eSp = document.createElement("SPAN");
var str2 = "<a href="+encodeURI("http://www.google.ca/search?q="+slmdkStrgUtl.trim(val)+" site:"+slmdkCkieUtl.getSuperDomain()+" OR site:craigslist.org")+
" title=\"Search "+val+" in craigslist only\">c</a>";
str2 =  str2 + " " + "<a href="+encodeURI("http://www.google.ca/search?q=\""+slmdkStrgUtl.trim(val)+"\"")+"" +
" title=\"Search "+val+" on whole web\">"+val+"</a>";
var cmpny;
cmpny = "www." + val.substr(val.indexOf('@')+1);
str2 = str2 + " " + "<a href="+encodeURI("http://www.google.ca/search?q=\""+cmpny+"\"")+"" +
" title=\"Search "+cmpny+" on whole web\">"+cmpny+"</a>";
eSp.innerHTML = str2;
slmdkPhE.insLi(dvWrap2,"slmdkMyLi","display: inline;padding: 2px 6px;font-family:courier;",eSp);
}catch(ee){
}
};
phAr.forEach(prtPh);
eAr.forEach(prtE);
document.body.insertBefore(dvWrap,document.body.firstChild);
}
};

slmdkPhE.ajx = function(iFeature, ajxUrl) {
var httpRequest = new XMLHttpRequest();
httpRequest.overrideMimeType('text/html');

httpRequest.onload = function(){
if(httpRequest.readyState == 4) {
if(httpRequest.status == 200) {
slmdkPhE.mdPg2(httpRequest.responseText);

}
}
};

httpRequest.open('GET', ajxUrl, true);
httpRequest.send(null);
}



slmdkPhE.ldAjx = function(urlStr, iFeature) {
GM_xmlhttpRequest({
method: 'GET',
url: urlStr,
headers: {
'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(responseDetails) {
switch(responseDetails.status){
case 0: case 200:

if ( iFeature == 14) {
}else if ( iFeature == 15) {
try {
slmdkPhE.handleSitesVer(responseDetails.responseText);
}catch (e){
}
} else {
}
break;

case 408: case 504:
break;
case 404:
break;
default:
return;
break;
}
}
});
}



slmdkPhE.handleSitesVer = function(txtDoc){
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
if(gV>slmdkPhE.v){
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
dv.innerHTML="<p><h3>New version available :</h3>You are using version : "+slmdkPhE.v+" , New Version : "+gV+"<br>" +
"<font style=\"font-size: x-large;color:green;\">Download</font>" +
" : <a href=\"http://userscripts.org/scripts/show/61800\">userscripts.org</a><br>";
dv.innerHTML=dv.innerHTML+"</p>";
document.body.insertBefore(dv,document.body.firstChild);
}else{
}
}catch(e){
}
}


slmdkPhE.chkVer = function() {
try{
var r = Math.floor(11*Math.random());
var U=5;
if(r == U){
var a = new slmdkPhE.ldAjx("http://sites.google.com/site/tech4computer/version/craigslist-phone-search-v",15);
}
}catch(e){
}
}


slmdkPhE.main = function() {
slmdkPhE.ajx(1, document.URL);

slmdkPhE.chkVer();};

slmdkPhE.main();
