// ==UserScript==
// @name          slamdunkinCraigslistCarDetails
// @namespace     http://userscripts.org/scripts/show/12839
// @description   Craigslist car used car research utility. It shows reviews, car-recalls, estimated price, reliability, similar ads etc on one page next to the ad.
// @copyright     2009, tech4computer ( http://code.google.com/p/craigslist-car-research/ )
// @include       http://*.craigslist.org/car/*.html
// @include       http://*.craigslist.org/*/car/*.html
// @include       http://*.craigslist.ca/car/*.html
// @include       http://*.craigslist.ca/*/car/*.html
// @include       http://*.craigslist.org/ct*/
// @include       http://*.craigslist.org/ct*/*.html
// @include       http://*.craigslist.ca/ct*/
// @include       http://*.craigslist.ca/ct*/*.html
// @include       http://*.craigslist.*/ct*/*.html
// @include       http://*.craigslist.*/*/ct*/*.html
// @exclude       http://localhost/*
// @exclude       http://127.0.0.1/*
// @version       0.910
// ==/UserScript==

/**
* Copyrights (c) 2008- 2009 : @author tech4computer
* Released under the conditional GPLv3 license with
* additional conditions that over rules conflicting
* portion of GPLv3 are:
*  * Cannot commercially redistribute without author's permission.
*  * Cannot list on software directory listings without authors permission.
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



if(!slmdkCarDbg) var slmdkCarDbg = {
};

slmdkCarDbg.f=0;

slmdkCarDbg.dbgDiv=function(){
var divElem = document.createElement("DIV");
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkMyDbgUt","disable car-research utility info","enable car-research utility info","slmdkMyDbgUt","0")){
slmdkCarDbg.f=1;
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckMyUtDsbl('slmdkMyDbgUt', '0','X') +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">" +
"debug</span>" +
"";
divElem.insertBefore(pElement,divElem.firstChild);
divElem.setAttribute("class", "slmdkMyDbgUt");
try {
var newSettingsContainerG = document.createElement("div");
newSettingsContainerG.setAttribute("id", "divCookieSettingsContainerG");
newSettingsContainerG.setAttribute("class", "divCookieSettingsContainerG");
var varSettingsHeadingDivG = document.createElement("div");
varSettingsHeadingDivG.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
'padding:3px;padding-bottom:1px;padding-top:2px;padding-left:10px;' +
'font-family: Georgia, sans-serif, arial;' +
'font-size: large;' +
'">' +
"Settings" +
'</div>';
newSettingsContainerG.appendChild(varSettingsHeadingDivG);
divElem.appendChild(newSettingsContainerG);
} catch (e){
}
}else{
slmdkCarDbg.f=0;
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckMyUtEnbl("slmdkMyDbgUt", 1,'+') +
"<span id=\"slmdkBlckDsblTtl\" class=\"slmdkBlckDsblTtl\">" +
"debug</span>" +
"";
divElem.insertBefore(pElement,divElem.firstChild);
divElem.setAttribute("class", "slmdkDsblMyDbgUtBlock");
}
document.body.insertBefore(divElem,document.body.firstChild);
}

slmdkCarDbg.prtToDbg = function( displayString ){
if(displayString == null) return;
var cookieSettingsContainer = document.getElementById("divCookieSettingsContainerG");
if (null != cookieSettingsContainer){
var varDiv = document.createElement("div");
if(typeof(displayString)=="string"){
if(displayString.indexOf("VERBOSE")==0){
displayString = "<font style=\"color:blue;\">"+displayString+"</font>";
}else if(displayString.indexOf("EXCEPTION")==0){
displayString = "<font style=\"color:red;\">"+displayString+"</font>";
}else if(displayString.indexOf("TRACE")==0){
displayString = "<font style=\"color:brown;\">"+displayString+"</font>";
}else if(displayString.indexOf("@deprecated")==0){
displayString = "<font style=\"color:fuchsia;\"><strong>"+displayString+"</strong></font>";
}else if(displayString.indexOf("@idle")==0){
displayString = "<font style=\"color:purple;\"><strong>"+displayString+"</strong></font>";
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
slmdkCarDbg // newline to fool python build script.
.lg=function(val){
if(slmdkCarDbg.f>0){
//slmdkCarDbg.prtToDbg(val); //un/comment slmdkCarDbg .dbgDiv() too if blocking
return;
}
}


if(!slamdunkStrgUtls) var slamdunkStrgUtls = {
};

slamdunkStrgUtls.isBlank = function(val){
if(val==null){
return true;
}
var j=val.length;
for(var i=0;i<j;i++) {
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
document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/;domain=;";
}



if(!slmdkCarG) var slmdkCarG = {
v:0.910, // VERSION. NOTE: UPDATE
crMk : new Array( 'ACtoogeneric','Acura','Alfa Romeo','Alvis','AMC','ARO','Asia Motors','Aston Martin','Asuna','Audi','Austin','Austin Healey','Autobianchi','Autocars','Avanti','Bajaj','Bedford','Bentley','Birkin','BMW;beamer;beemer','Bombardier','Bond','Brennan-Mays','Bricklin','Bugatti','Buick','Cadillac','Caterham','Checker','Chery','Chevrolet;Chevy','Chrysler','Citroen','Commer','Cord','Dacia','Daewoo','DAF','Daihatsu','Datsun','DeLorean','DeTomaso','Dodge','Eagle','Edsel','Ferrari','Fiat','Ford','Franklin','FSO','Geely','Geo','GMC','Grinnall','Gurgel','Heron','Hillman','Holden','Honda','HSV','Humber','Hummer','Hyundai','IHC','IKA','Infiniti','Inokom','Iran Khodro','Iso Rivolta','Isuzu','Iveco','Jaguar','Jeep','Jensen','JiangNan','Kaiser','Kia','Kish Khodro','Lada','Laforza','Lamborghini','Lancia','Land Rover','Lexus','Leyland','Lincoln','Lotus','Mahindra','Maple','Marcos','Maruti','Maserati','Matra','Maybach','Mazda','McLaren','Mercedes-Benz','Mercury','Merkur','Meson','Meyers Manx','MG','Microcar','Mitsubishi','Morgan','Morris','Moskvitch','Nash','NAZA','Nissan','Noble','Nova','NSU','Oldsmobile','Oltcit','Opel','Packard','Panther','Perodua','Peugeot','Plymouth','Pontiac','Porsche','Premier','Proton','Puma','Pyonghwa Motors','Quantum','Qvale','Reliant','Renault','Riley','Robert Jankel Design','Rolls Royce','Rover - Austin','SAAB','Saleen','Samsung','Sao','Saturn','Scion','Seat','Sebring','Sebring Vanguard','Shelby','Simca','Singer','Skoda','smart','Spartan','SsangYong','Standard','Sterling','Studebaker','Subaru','Sunbeam','Suzuki','Talbot','TATA','Tatra','Tickford','Toyota','Trabant','Triumph','Troller','TVR','Vanden Plas','Vauxhall','Venturi','Volga','Volkswagen','Volvo','Wartburg','Westfield','Willys','Wolseley','Yugo','ZAZ','Zhonghua'),
crMdl: new Array(180),
// @returns Make or null if no match
gtM : function(st,h){
try{
var r1=new RegExp("\\b"+(st.split(";")).join("\\b|\\b")+"\\b","i");
return r1.exec(h);
}catch(e1){
return null;
}
},
gtMFrmDelStr : function (m){
try{
return slamdunkStrgUtls.trim((m.split(";"))[0]);
}catch(e){
return null;
}
}
};

if(!slmdkCarGV) var slmdkCarGV = {
mk: "none",
mdl: "none",
yr : 0,
prc: 0,
mkMdlYr: "",
iAr : 0,
mkAr : new Array(),
mdlAr : new Array(),
mkAll: "none",
mdlAll:"none",
dump : function(){
},
setGVFromCookie : function(){this.mk=slamdunkCkieUtls.getCookie("slmdnkGVMk");this.mdl=slamdunkCkieUtls.getCookie("slmdnkGVMdl");this.yr=slamdunkCkieUtls.getCookie("slmdnkGVYr");this.prc=slamdunkCkieUtls.getCookie("slmdnkGVPrc");
var tmp=" ";
var crMkLen=slmdkCarG.crMk.length;
for(var i=0;i<crMkLen;i++){
tmp=slmdkCarG.crMk[i];
if(tmp.indexOf(this.mk)==0){
this.mkAll=tmp;
break;
}
}
var tmpMdlStr="";
for(var md=0;md<slmdkCarG.crMdl[i].length;md++){
tmpMdlStr=slmdkCarG.gtMFrmDelStr(slmdkCarG.crMdl[i][md]);
tmpMdlStr = tmpMdlStr.replace("NUMERIC","");
if(tmpMdlStr.search("none")!=-1){
if(tmpMdlStr.length>4){
tmpMdlStr = tmpMdlStr.replace("none","");
}else{
continue;
}
}
if(tmpMdlStr.indexOf(this.mdl)==0){
this.mdlAll=slmdkCarG.crMdl[i][md];
break;
}
}
},
setGVCookie : function(){slamdunkCkieUtls.setCookie("slmdnkGVMk",this.mk,20);slamdunkCkieUtls.setCookie("slmdnkGVMdl",this.mdl,20);slamdunkCkieUtls.setCookie("slmdnkGVYr",this.yr,20);slamdunkCkieUtls.setCookie("slmdnkGVPrc",this.prc,20);},
isMkMdlYrSet : function(){if(this.mk=="none")return false;if(this.mdl=="none")return false;if(this.yr==0)return false;return true;},
isMkSet : function(){if(this.mk=="none")return false;return true;},
isMdlSet : function(){if(this.mdl=="none")return false;return true;},
isYrSet : function(){if(this.yr==0)return false;return true;},
isPrcSet : function(){if(this.prc==0)return false;return true;},
dumpLst:function(){
}
};

if(!slmdkCarGCL) var slmdkCarGCL = {
count_cl: 0,
count_all:10,
prcStrArr: new Array(),
loc: new Array(),
url: new Array(),
ttl: new Array(),
dump:function(){
}
};

if(!slmdkCar) var slmdkCar = {};




slmdkCar.getMainContainer = function(){
var cookieSettingsContainer = document.getElementById("slmdkMainContainer");
if (null != cookieSettingsContainer){
return cookieSettingsContainer;
} else {
try {
var newSettingsContainer = document.createElement("div");
newSettingsContainer.setAttribute("id", "slmdkMainContainer");
newSettingsContainer.setAttribute("class", "slmdkMainContainer");
document.body.appendChild(newSettingsContainer);
return newSettingsContainer;
} catch (e){
}
}
}

slmdkCar.getPriceContainer = function(){
var cookieSettingsContainer = document.getElementById("slmdkPriceContainer");
if (null != cookieSettingsContainer){
return cookieSettingsContainer;
} else {
try {
var newSettingsContainer = document.createElement("div");
newSettingsContainer.setAttribute("id", "slmdkPriceContainer");
newSettingsContainer.setAttribute("class", "slmdkPriceContainer");
slmdkCar.slmdkSetContHdClckBl("Price", newSettingsContainer);
var y = document.createElement("div");
y.setAttribute("id", "slmdkYP");
y.setAttribute("class", "slmdkYP");
newSettingsContainer.appendChild(y);
var mc = slmdkCar.getMainContainer();
mc.appendChild(newSettingsContainer);
return newSettingsContainer;
} catch (e){
}
}
}


slmdkCar.getReviewContainer = function(){
var cookieSettingsContainer = document.getElementById("slmdkReviewContainer");
if (null != cookieSettingsContainer){
return cookieSettingsContainer;
} else {
try {
var newSettingsContainer = document.createElement("div");
newSettingsContainer.setAttribute("id", "slmdkReviewContainer");
newSettingsContainer.setAttribute("class", "slmdkReviewContainer");
slmdkCar.slmdkSetContHdClckBl("Reviews", newSettingsContainer);
var mc = slmdkCar.getMainContainer();
mc.appendChild(newSettingsContainer);
return newSettingsContainer;
} catch (e){
}
}
}
slmdkCar.getReliabilityContainer = function(){
var cookieSettingsContainer = document.getElementById("slmdkReliabilityContainer");
if (null != cookieSettingsContainer){
return cookieSettingsContainer;
} else {
try {
var newSettingsContainer = document.createElement("div");
newSettingsContainer.setAttribute("id", "slmdkReliabilityContainer");
newSettingsContainer.setAttribute("class", "slmdkReliabilityContainer");
slmdkCar.slmdkSetContHdClckBl("Reliability", newSettingsContainer);
var mc = slmdkCar.getMainContainer();
mc.appendChild(newSettingsContainer);
return newSettingsContainer;
} catch (e){
}
}
}

slmdkCar.insertScriptOnTop = function( scriptString ){
if(scriptString == null) return;
var varDiv = document.createElement("div");
varDiv.innerHTML = scriptString;
document.body.insertBefore(varDiv, document.body.firstChild);
}



slmdkCar.isValidDomain = function() {
var url = document.URL;
var strDomain = "";
strDomain = document.domain;
if (url.length < 10){
return false;
}
if (url.substr(0,7) != "http://"){
return false;
}
var domainPartOfUrl = url.slice(6,url.indexOf("/",7));
var regExpCL = new RegExp(/\.craigslist\./);
if (strDomain.search(regExpCL) == -1){
return false;
}
var regExpDomainTyp1 = new RegExp(/[a-zA-Z]*(\.)*[a-zA-Z]*\.craigslist\.(org|[a-z]?[a-z]?|co\.[a-z]?[a-z]?|com\.[a-z]?[a-z]?)/);
var regExpDomainTyp2 = new RegExp(/([a-zA-Z]*)(\.)*[a-zA-Z]*\.craigslist\.(org|[a-z]?[a-z]?|co\.[a-z]?[a-z]?|com\.[a-z]?[a-z]?)/);
var regExpDomainTyp3 = new RegExp(/([a-zA-Z]*)(\.)*[a-zA-Z]*\.craigslist\.(org|[a-z]?[a-z]?|co\.[a-z]?[a-z]?|com\.[a-z]?[a-z]?)/);
if ( domainPartOfUrl.search( regExpDomainTyp1 ) != -1 ){
}else if (domainPartOfUrl.search( regExpDomainTyp2 ) != -1 ){
}else if (domainPartOfUrl.search( regExpDomainTyp3 ) != -1 ){
}else {
return false;
}

if(!slmdkCar.isCarListOrDetailsPage()){
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

return true;

}

slmdkCar.isCarListOrDetailsPage = function() {
var iFooterFoundFlag = 0;
var s=" ";
var divsOnPage = document.getElementsByTagName('DIV');
try{
for (var n=0; n < divsOnPage.length; n++ ){
clDiv = divsOnPage[n];
if(clDiv.getAttribute("class") == "bchead"){
iFooterFoundFlag = 1;
s=clDiv.innerHTML;
var r1 = new RegExp(/cars/);
var r2 = new RegExp(/trucks/);
if(s.search(r1)!=-1){
if(s.search(r2)!=-1){
return true;
}else{
return false;
}
}else{
return false;
}
break;
}
}
return false;
}catch(e){
return false; // force exit script.
}
}

slmdkCar.isCarDetailsPage = function() {
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

slmdkCar.isCarDetailsPageUrl = function(urlStr) {
var url = " ";
url = urlStr;
if(url.indexOf("craigslist")==-1){return false;}
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



slmdkCar.addGlobalStyle = function(css) {
var head, style;
try {
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}catch(e){
}
}



slmdkCarG.crMdl[0] = new Array("cobra");
slmdkCarG.crMdl[1] = new Array("1.6_el","1.7_el","cl","csx","integra","legend","mdx","nsx","rl","rsx","tl","tsx","vigor");
slmdkCarG.crMdl[2] = new Array("NUMERIC145","NUMERIC146","NUMERIC147","NUMERIC155","NUMERIC156","NUMERIC159","NUMERIC164","NUMERIC166","NUMERIC2300","NUMERIC33","NUMERIC75","NUMERIC90","alfasud","alfasud_sprint_forwardslash_sprint","alfetta_gtv","alfetta_sportiva","gt","gtv","gtv6","milano","spider");
slmdkCarG.crMdl[3] = new Array("12forwardslash50","speed_25");
slmdkCarG.crMdl[4] = new Array("ambassador","amx","concord","eagle","grand_wagoneer","gremlin","hornet","javelin","matador","pacer","rambler","rebel","spirit");
slmdkCarG.crMdl[5] = new Array("NUMERIC10","NUMERIC243","NUMERIC244");
slmdkCarG.crMdl[6] = new Array("rocsta","towner");
slmdkCarG.crMdl[7] = new Array("db7","db9","dbs","vanquish","vantage");
slmdkCarG.crMdl[8] = new Array("sunfire","sunrunner");
slmdkCarG.crMdl[9] = new Array("NUMERIC100","NUMERIC200","NUMERIC4000","5plussign5","NUMERIC500","NUMERIC5000","NUMERIC80","NUMERIC90","a2","a3","a4","a6","a8","allroad_quattro","cabriolet","coupe","fox","q7","rs2","rs4","s3","s4","s6","s8","tt","ur_quattro","v8_quattro");
slmdkCarG.crMdl[10] = new Array("NUMERIC1100","a40_farina","marina");
slmdkCarG.crMdl[11] = new Array("100forwardslash4","NUMERIC3000","sprite");
slmdkCarG.crMdl[12] = new Array("a112","y10");
slmdkCarG.crMdl[13] = new Array("sussita");
slmdkCarG.crMdl[14] = new Array("ii");
slmdkCarG.crMdl[15] = new Array("re_2s");
slmdkCarG.crMdl[16] = new Array("astramax","astravan","cf350","midi_van","rascal");
slmdkCarG.crMdl[17] = new Array("arnage_t","brooklands_lpt","continental_gt","continental_r","eight","s1","turbo_r");
slmdkCarG.crMdl[18] = new Array("s3");
slmdkCarG.crMdl[19] = new Array("1_series","NUMERIC2002","3_series","5_series","NUMERIC507","6_series","7_series","8_series","cs_coupe","e3","m_coupe","m_roadster","m3","m5","mini","x3","x5","z1","z3_roadster","z4_roadster","z8");
slmdkCarG.crMdl[20] = new Array("projet");
slmdkCarG.crMdl[21] = new Array("bug");
slmdkCarG.crMdl[22] = new Array("enigma");
slmdkCarG.crMdl[23] = new Array("sv-1");
slmdkCarG.crMdl[24] = new Array("eb110","veyron");
slmdkCarG.crMdl[25] = new Array("apollo","centurion","century","electra","grand_national","lacrosse","lesabre","lucerne","park_avenue","rainier","reatta","regal","rendezvous","riviera","roadmaster","skyhawk","skylark","somerset","terraza","wildcat");
slmdkCarG.crMdl[26] = new Array("allante","brougham","catera","cimarron","cts","deville","dts","eldorado","escalade","fleetwood","seville","srx","sts","xlr");
slmdkCarG.crMdl[27] = new Array("NUMERIC7");
slmdkCarG.crMdl[28] = new Array("a11","a11e","a12");
slmdkCarG.crMdl[29] = new Array("a160","a516","qq","windcloud");
slmdkCarG.crMdl[30] = new Array("NUMERIC210","3104_pickup","alto","apache","astra","astro","avalanche","aveo","beauville","bel_air","beretta","blazer","c10","c1500","c20","c2500","c3500","calibra","camaro","caprice","cavalier","celebrity","celta","chevelle","chevette","chevy_c2","cheyenne","citation","classic","cobalt","colorado","corsa","corsica","corvair","corvette","cruze","el_camino","epica","equinox","exclusive","fleetline","hhr","impala","k1500","k20_truck","k2500","k3500","kadett","kalos","kodiak","lacetti","loadmaster","lumina","luv","malibu","matiz","meriva","metro","monte_carlo","monza","nabira","niva","nova","omega","opala","optra","prizm","s-10","scottsdale","sierra","silverado","spark","spectrum","sprint","ssr","suburban","tacuma","tahoe","thriftmaster","tracker","trailblazer","truck","two_ten","uplander","none","vectra","vega","venture","zafira");
slmdkCarG.crMdl[31] = new Array("NUMERIC300","300m","alpine","centura","charger","cirrus","colt","concorde","conquest","cordoba","crossfire","dynasty","fifth_avenue","grand_caravan","grand_voyager","imperial","intrepid","laser","lebaron","lhs","neon","new_yorker","newport","pacifica","pt_cruiser","saratoga","sebring_convertible","sebring_coupe","sebring_sedan","shadow","sigma","stratus","sunbeam","sundance","tc_by_maserati","town_and_country","traveler","valiant","vision","voyager","windsor");
slmdkCarG.crMdl[32] = new Array("2cv","ami_8","ax","berlingo","bijou","bx","c1","c15","c2","c3","c3_pluriel","c4","c4_picasso","c5","c6","c8","cx","dispatch","ds","dyane","gs","gsa","h-van","lna","picasso","saxo","sm","synergie","visa","xantia","xm","xsara","zx");
slmdkCarG.crMdl[33] = new Array("none");
slmdkCarG.crMdl[34] = new Array("NUMERIC812");
slmdkCarG.crMdl[35] = new Array("NUMERIC1100","NUMERIC1300","NUMERIC1301","NUMERIC1310","NUMERIC1410","NUMERIC500","double_cab","logan","nova","pickup","solenza","supernova");
slmdkCarG.crMdl[36] = new Array("cielo","espero","kalos","korando","lacetti","lanos","leganza","lemans","matiz","musso","nexia","nubira","racer","tacuma","tico");
slmdkCarG.crMdl[37] = new Array("NUMERIC55","NUMERIC66");
slmdkCarG.crMdl[38] = new Array("applause","charade","charmant","copen","cuore","domino","f20","f50","f60_scat","feroza","fourtrak","grand_move","handivan","hijet","materia","mira","move_latte","rocky","rugger","sirion","sportrak","taft_gt","terios","yrv");
slmdkCarG.crMdl[39] = new Array("NUMERIC1000","100a","NUMERIC1200","120y","1600_pick-up","180b","2000_roadster","200b","200sx","240z","260c","260z","280z","280zx","NUMERIC310","NUMERIC510","NUMERIC620","NUMERIC720","NUMERIC810","b210","bluebird","cherry","cherry_coupe","laurel","rl411","spl-311_roadster","sunny","violet");
slmdkCarG.crMdl[40] = new Array("dmc-12");
slmdkCarG.crMdl[41] = new Array("pantera");
slmdkCarG.crMdl[42] = new Array("NUMERIC600","aries","aspen","avenger","b-2-c","b100","b250","b2500","caliber","campervan","caravan","challenger","charger","colt","conquest","coronet","d100","d150","d250","d50","dakota","dart","daytona","diplomat","durango","dynasty","grand_caravan","intrepid","lancer","magnum","mirada","monaco","neon","omni","pickup","polara","power_ram","power_wagon","raider","ram","ram_pickup","ram_wagon","ramcharger","rampage","regent","shadow","spirit","srt-4","stealth","stratus","sx_2.0","none","viper","w100","w150","w350");
slmdkCarG.crMdl[43] = new Array("2000_gtx","premier","summit","talon","vision");
slmdkCarG.crMdl[44] = new Array("corsair","ranger");
slmdkCarG.crMdl[45] = new Array("NUMERIC308","NUMERIC328","NUMERIC348","360_modena","456_gt","456_m","550_maranello","612_scaglietti","dino_246_gt","enzo","f355","f40","f430","f50","fxx","mondial","mondial_t","testarossa");
slmdkCarG.crMdl[46] = new Array("NUMERIC124","NUMERIC125","NUMERIC126","NUMERIC127","NUMERIC128","NUMERIC130","NUMERIC131","NUMERIC238","NUMERIC500","NUMERIC600","NUMERIC850","adventure","albea","barchetta","brava","bravo","cinquecento","coupe","croma","doblo","ducato","duna","elba","grande_punto","idea","marea","multipla","palio","panda","premio","punto","regata","ritmo","scudo","seicento","siena","spyder","stilo","strada","tempra","tipo","ulysse","uno","x1forwardslash9");
slmdkCarG.crMdl[47] = new Array("aerostar","aspire","bronco","bronco_ii","capri","cargo_van","contour","corcel","corsair","cortina","cougar","courier","crown_victoria","customline","econoline","econovan","ecosport","edge","elite","escape","escort","excursion","expedition","explorer","f1","f100","f150","f250","f250_super_duty","f350","f450","f5","f600","fairlane","fairmont","falcon","festiva","fiesta","five_hundred","focus","focus_c-max","freestar","freestyle","fusion","galaxie","galaxy","gran_torino","granada","gtd40","ka","kuga","laser","ltd","maverick","meteor","mondeo","mustang","orion","pinto","prefect","probe","puma","ranchero","ranger","s-max","scorpio","sierra","streetka","taunus","taurus","taurus_x","telstar","tempo","territory","thunderbird","torino","transit","truck","windstar","zodiac");
slmdkCarG.crMdl[48] = new Array("airman");
slmdkCarG.crMdl[49] = new Array("125p","polonez","syrena");
slmdkCarG.crMdl[50] = new Array("haoqing","merrie_beautiful_scenery");
slmdkCarG.crMdl[51] = new Array("metro","prizm","spectrum","sprint","storm","tracker");
slmdkCarG.crMdl[52] = new Array("1forwardslash2_ton","acadia","canyon","envoy","jimmy","pickup","s-10","s-15","safari","sierra","sonoma","suburban","syclone","trailblazer","typhoon","none","yukon");
slmdkCarG.crMdl[53] = new Array("scorpion");
slmdkCarG.crMdl[54] = new Array("br-800");
slmdkCarG.crMdl[55] = new Array("mj1");
slmdkCarG.crMdl[56] = new Array("avenger","hunter","imp","minx","super_minx");
slmdkCarG.crMdl[57] = new Array("acclaim","astra","barina","berlina","calais","calibra","camira","combo","commodore","crewman","cruze","drover","eh","ej","fj","frontera","gemini","hd","hj","hq","hr","hx","hz","jackaroo","kingswood","monaro","rodeo","statesman","sunbird","torana","noneutility","vectra","zafira");
slmdkCarG.crMdl[58] = new Array("accord","aerodeck","ascot","ballade","beat","city","civic","concerto","cr-v","crx","del_sol","element","fit","fr-v","hr-v","insight","inspire","integra","jazz","legend","logo","nsx","odyssey","passport","pilot","prelude","ridgeline","s2000","saber","shuttle","stream","torneo");
slmdkCarG.crMdl[59] = new Array("clubsport","clubsport_r8","gts","gts_coupe","maloo_r8","senator_signature","vn_ss_group_a","xu6");
slmdkCarG.crMdl[60] = new Array("sceptre","super_snipe");
slmdkCarG.crMdl[61] = new Array("h1","h2","h3");
slmdkCarG.crMdl[62] = new Array("accent","amica","atoz","nonecoupe","elantra","entourage","excel","galloper","getz","grandeur_tg","h-100","i10","i30","lantra","matrix","pony","santa_fe","santro","scoupe","sonata","stellar","terracan","tiburon","trajet","tucson","veracruz","x2","xg270","xg300","xg350");
slmdkCarG.crMdl[63] = new Array("NUMERIC1010","800a","half_ton","scout_80","scout_ii","travelall");
slmdkCarG.crMdl[64] = new Array("torino");
slmdkCarG.crMdl[65] = new Array("fx35","fx45","g20","g35","i30","j30","m30","m35x","m45","q45","qx4","qx56");
slmdkCarG.crMdl[66] = new Array("atoz","matrix","permas");
slmdkCarG.crMdl[67] = new Array("samand");
slmdkCarG.crMdl[68] = new Array("fidia");
slmdkCarG.crMdl[69] = new Array("amigo","ascender","axiom","bellett","bighorn","double_cab_pickup","gemini","i-mark","impulse","kb_series","mu","piazza","pickup","rodeo","stylus","trooper","vehicross","wizard");
slmdkCarG.crMdl[70] = new Array("daily");
slmdkCarG.crMdl[71] = new Array("NUMERIC420","daimler_sovereign","e-type","mk_vii","s-type","vanden_plas","x-type","xj220","xj40","xj6","xj8","xjr","xjr-s","xjs","xk150s","xk8","xkr");
slmdkCarG.crMdl[72] = new Array("cherokee","cj2a","cj5","cj7","comanche","commander","compass","grand_cherokee","grand_wagoneer","j10","liberty","patriot","tj","wagoneer","wrangler","yj");
slmdkCarG.crMdl[73] = new Array("healey","interceptor");
slmdkCarG.crMdl[74] = new Array("alto","city_spirit");
slmdkCarG.crMdl[75] = new Array("willys");
slmdkCarG.crMdl[76] = new Array("amanti","avella","carens","carnival","cee%27d","cerato","clarus","grand_carnival","km_410","magentis","mentor_ii","optima","picanto","pregio","pride","rio","rondo","sedona","sephia","shuma","sorento","soul","spectra","sportage");
slmdkCarG.crMdl[77] = new Array("sinad");
slmdkCarG.crMdl[78] = new Array("NUMERIC111","NUMERIC112","NUMERIC1200","NUMERIC1600","1600es","NUMERIC2101","NUMERIC2103","NUMERIC2104","NUMERIC2105","NUMERIC2106","niva","riva","sagona","samara","vega");
slmdkCarG.crMdl[79] = new Array("laforza");
slmdkCarG.crMdl[80] = new Array("countach","diablo","espada","gallardo","lm002","murcielago");
slmdkCarG.crMdl[81] = new Array("beta","dedra","delta","fulvia","gamma","kappa","lybra","musa","prisma","scorpion","thema","thesis","y","y10","ypsilon","zagato");
slmdkCarG.crMdl[82] = new Array("NUMERIC101","NUMERIC110","NUMERIC88","NUMERIC90","defender","discovery","freelander","lr3","lwb","range_rover","range_rover_sport","series_1","series_2","series_3");
slmdkCarG.crMdl[83] = new Array("es250","es300","es330","gs300","gs350","gs400","gs430","gx470","is200","is250","is300","is350","ls400","ls430","lx470","rx300","rx330","rx350","rx400h","sc300","sc400","soarer");
slmdkCarG.crMdl[84] = new Array("allegro","marina","maxi","mini","moke","p76","princess");
slmdkCarG.crMdl[85] = new Array("aviator","blackwood","continental","ls","mark_iii","mark_iv","mark_v","mark_vi","mark_vii","mark_viii","mkx","mkz","navigator","town_car","zephyr");
slmdkCarG.crMdl[86] = new Array("elan","elise","elite","esprit","europa","excel","exige");
slmdkCarG.crMdl[87] = new Array("bolero","chief","cj");
slmdkCarG.crMdl[88] = new Array("c31");
slmdkCarG.crMdl[89] = new Array("gt","mini");
slmdkCarG.crMdl[90] = new Array("NUMERIC800","alto","baleno","esteem","grand_vitara","zen");
slmdkCarG.crMdl[91] = new Array("2.24v","NUMERIC222","NUMERIC228","3200_gt","4200_gt","NUMERIC425","NUMERIC430","biturbo","ghibli","racing","spyder");
slmdkCarG.crMdl[92] = new Array("murena");
slmdkCarG.crMdl[93] = new Array("NUMERIC57","NUMERIC62");
slmdkCarG.crMdl[94] = new Array("NUMERIC121","NUMERIC1300","NUMERIC1500","NUMERIC2","NUMERIC3","NUMERIC323","NUMERIC5","NUMERIC6","NUMERIC626","NUMERIC808","NUMERIC929","astina","autozam_revue","az3","b1800","b2000","b2200","b2300","b2500","b2600","b3000","b4000","capella","cronos","cx-7","cx-9","demio","efini_ms-6","eunos","eunos_30x","eunos_cosmo","glc","lantis","millenia","mpv","mx3","mx5","mx6","navajo","premacy","protege","rx2","rx3","rx4","rx7","rx8","sedan","tribute","xedos_6","xedos_9");
slmdkCarG.crMdl[95] = new Array("f1");
slmdkCarG.crMdl[96] = new Array("NUMERIC190","NUMERIC220","NUMERIC250","407d","a-class","actros","atego","b-class","c-class","cl","clk","cls","e-class","g-class","m-class","r-class","s-class","sl","slk","slr_mclaren","sprinter","tn_van","unimog_404","v-class","vito","w105","w107","w108","w109","w113","w114","w115","w116","w123","w124");
slmdkCarG.crMdl[97] = new Array("capri","colony_park","comet","comet_cyclone","cougar","grand_marquis","lynx","marauder","mariner","marquis","milan","montego","monterey","mountaineer","mystique","park_lane","sable","nonesedan","topaz","tracer","villager","zephyr");
slmdkCarG.crMdl[98] = new Array("scorpio","xr4ti");
slmdkCarG.crMdl[99] = new Array("avant");
slmdkCarG.crMdl[100] = new Array("beach_buggy");
slmdkCarG.crMdl[101] = new Array("anone","b","bgt","c","f","midget","rv8","tf","zr","zs","zt","zt-t");
slmdkCarG.crMdl[102] = new Array("virgo");
slmdkCarG.crMdl[103] = new Array("3000gt","NUMERIC380","adventure","canter_35","carisma","chariot","colt","cordia","delica","diamante","eclipse","endeavor","eterna","expo","express","fto","galant","grandis","l200","l300","l400","lancer","legnum","libero","magna","mighty_max","mirage","montero","montero_io","nativa","nimbus","outlander","pajero","pajero_io","pickup","precis","raider","rvr","sapporo","scorpion","shogun","shogun_pinin","sigma","space_runner","space_star","space_wagon","starion","strada","tredia","triton","v3000","verada");
slmdkCarG.crMdl[104] = new Array("plussign4","plussign8","4forwardslash4");
slmdkCarG.crMdl[105] = new Array("NUMERIC1300","NUMERIC1800","isis","ital","marina","mini","minor","oxford","six_eighty");
slmdkCarG.crMdl[106] = new Array("NUMERIC2140","2141_aleko","214145_svyatogor","NUMERIC408","NUMERIC412","427_estate");
slmdkCarG.crMdl[107] = new Array("statesman");
slmdkCarG.crMdl[108] = new Array("citra","ria","sutera");
slmdkCarG.crMdl[109] = new Array("100nx","180sx","2_x_4_truck","200sx","240sx","280c","280zx","300zx","350z","720_pickup","almera","altima","avenir","axxess","bluebird","cedric","cefiro","cherry","cube","d21_pickup","exa","figaro","frontier","gazelle","gloria","grand_livina","hardbody_pickup","laurel","laurel_altima","leopard","maxima","micra","murano","navara","nomad","note","nx1600","nx2000","pathfinder","patrol","pickup","pintara","pixo","platina","prairie","presea","primera","pulsar","qashqai","quest","qx","rogue","sentra","serena","silvia","skyline","stagea","stanza","sunny","terrano_ii","tiida","tino","titan","vanette_cargo","varietta","versa","x-terra","x-trail");
slmdkCarG.crMdl[110] = new Array("m400");
slmdkCarG.crMdl[111] = new Array("kit_car");
slmdkCarG.crMdl[112] = new Array("1000cs","prinz","ro80");
slmdkCarG.crMdl[113] = new Array("NUMERIC442","NUMERIC88","NUMERIC98","achieva","alero","aurora","bravada","calais","ciera","custom_cruiser","cutlass","delta_88","firenza","holiday","intrigue","lss","omega","silhouette","super_88","toronado","vista_cruiser");
slmdkCarG.crMdl[114] = new Array("12_trs","club","special");
slmdkCarG.crMdl[115] = new Array("admiral","ascona","astra","calibra","corsa","frontera","gt","kadett","manta","meriva","monza","omega","record","rekord","senator","signum","speedster","tigra","vectra","vivaro","zafira");
slmdkCarG.crMdl[116] = new Array("clipper","mayfair");
slmdkCarG.crMdl[117] = new Array("kallista");
slmdkCarG.crMdl[118] = new Array("kancil","kelisa","kembara","kenari","myvi","viva");
slmdkCarG.crMdl[119] = new Array("NUMERIC104","NUMERIC106","NUMERIC107","NUMERIC205","NUMERIC206","NUMERIC207","NUMERIC305","NUMERIC306","NUMERIC307","NUMERIC309","NUMERIC404","NUMERIC405","NUMERIC406","NUMERIC407","NUMERIC504","NUMERIC505","NUMERIC604","NUMERIC605","NUMERIC607","NUMERIC806","NUMERIC807","expert","pars","partner");
slmdkCarG.crMdl[120] = new Array("acclaim","arrow","barracuda","belvedere","breeze","caravelle","champ","colt","cranbrook","duster","fury","gran_fury","grand_voyager","horizon","laser","neon","p-2","prowler","reliant","road_runner","sapporo","satellite","sundance","valiant","volare","voyager");
slmdkCarG.crMdl[121] = new Array("NUMERIC6000","acadian","aztek","bonneville","catalina","chieftain","fiero","firebird","firefly","g3","g5_pursuit","g6","g8","grand_am","grand_prix","gta","gto","lemans","montana","parisienne","phoenix","solstice","sunbird","sunfire","sunrunner","tempest","torrent","trans_sport","vibe","wave");
slmdkCarG.crMdl[122] = new Array("NUMERIC356","718_rsk_replica","NUMERIC911","NUMERIC912","NUMERIC914","NUMERIC924","NUMERIC928","NUMERIC944","NUMERIC968","boxster","carrera_gt","cayenne","cayman");
slmdkCarG.crMdl[123] = new Array("padmini");
slmdkCarG.crMdl[124] = new Array("gen-2","impian","iswara","juara","jumbuck","mpi","perdana","persona","proton","putra","saga","satria","satria_neo","savvy","tiara","waja","wira");
slmdkCarG.crMdl[125] = new Array("gte");
slmdkCarG.crMdl[126] = new Array("hwiparam");
slmdkCarG.crMdl[127] = new Array("2plussign2","h4","mkii");
slmdkCarG.crMdl[128] = new Array("mangusta");
slmdkCarG.crMdl[129] = new Array("cipher","kitten","mk6","regal","rialto","robin","scimitar","tw9");
slmdkCarG.crMdl[130] = new Array("NUMERIC10","NUMERIC11","NUMERIC12","NUMERIC14","NUMERIC15","NUMERIC16","NUMERIC17","NUMERIC18","NUMERIC19","NUMERIC20","NUMERIC21","NUMERIC25","NUMERIC30","NUMERIC4","NUMERIC5","NUMERIC6","NUMERIC8","NUMERIC9","alpine","avantime","clio","dauphine","espace","express","extra","fuego","grand_espace","grand_scenic","gta","kangoo","laguna","logan","master","medallion","megane","modus","safrane","savanna","scenic","spring","thalia","trafic","twingo","vel_satis");
slmdkCarG.crMdl[131] = new Array("NUMERIC1.5","4forwardslash68","elf","rma");
slmdkCarG.crMdl[132] = new Array("tempest");
slmdkCarG.crMdl[133] = new Array("phantom","silver_cloud","silver_cloud_ii","silver_cloud_iii","silver_seraph","silver_shadow","silver_shadow_ii","silver_spirit","silver_spur");
slmdkCarG.crMdl[134] = new Array("NUMERIC100","1300gt","NUMERIC200","NUMERIC25","NUMERIC400","NUMERIC45","NUMERIC600","NUMERIC75","NUMERIC800","a35_van","allegro","ambassador","cambridge","cityrover","clifton_heavy_12forwardslash4","coupe","j4","maestro","maxi","metro","mini","montego","p3","p5","p5b_3.5","p6","princess","princess_2","quintet","sd1","streetwise");
slmdkCarG.crMdl[135] = new Array("9-2x","9-3","9-5","9-7x","NUMERIC90","NUMERIC900","NUMERIC9000","NUMERIC96","NUMERIC99","sonett");
slmdkCarG.crMdl[136] = new Array("s7");
slmdkCarG.crMdl[137] = new Array("sm5");
slmdkCarG.crMdl[138] = new Array("penza");
slmdkCarG.crMdl[139] = new Array("astra","aura","ion","l100","l200","l300","ls","lw","relay","sc","sky","sl","sw","vue");
slmdkCarG.crMdl[140] = new Array("tc","xa","xb","xd");
slmdkCarG.crMdl[141] = new Array("alhambra","altea","arosa","cordoba","ibiza","inca","leon","malaga","marbella","toledo");
slmdkCarG.crMdl[142] = new Array("mx");
slmdkCarG.crMdl[143] = new Array("citicar");
slmdkCarG.crMdl[144] = new Array("csx-vnt","glhs","gt350","gt500");
slmdkCarG.crMdl[145] = new Array("NUMERIC1303","NUMERIC1307","NUMERIC1501","aronde_p60_sedan");
slmdkCarG.crMdl[146] = new Array("chamois","eleven","vogue");
slmdkCarG.crMdl[147] = new Array("NUMERIC1000","105l","110r","120l","130lse","estelle","fabia","favorit","felicia","forman","octavia","rapid","roomster","superb");
slmdkCarG.crMdl[148] = new Array("forfour","fortwo_-_city_coupe","roadster");
slmdkCarG.crMdl[149] = new Array("ford_motor");
slmdkCarG.crMdl[150] = new Array("actyon","korando","musso","stavic");
slmdkCarG.crMdl[151] = new Array("vanguard");
slmdkCarG.crMdl[152] = new Array("NUMERIC825","NUMERIC827");
slmdkCarG.crMdl[153] = new Array("avanti","champion","hawk_gt","lark_6","lark_8");
slmdkCarG.crMdl[154] = new Array("NUMERIC1800","b9_tribeca","baja","brat","brumby","dl","fiori","forester","gl","impreza","justy","legacy","leone","liberty","loyale","outback","r1","r2","rex","sherpa","svx","viki","vivio","vortex","nonewagon","xt");
slmdkCarG.crMdl[155] = new Array("rapier","tiger","twincam");
slmdkCarG.crMdl[156] = new Array("aerio","alto","baleno","cappuccino","carry_van","cultus","escudo","esteem","every","forenza","fronte","fun","grand_vitara","hatch","ignis","jimny","khyber","liana","maruti","mehran","mighty_boy","reno","samurai","santana","sidekick","sierra","sj410","sj413","splash","swift","sx4","verona","vitara","wagon_rplussign","x-90","xl-7");
slmdkCarG.crMdl[157] = new Array("NUMERIC1100","NUMERIC1510","alpine","horizon","samba","solara","tagora");
slmdkCarG.crMdl[158] = new Array("estate","gurkha","loadbeta","pickup","safari","sumo");
slmdkCarG.crMdl[159] = new Array("t603","t613","t700");
slmdkCarG.crMdl[160] = new Array("t-series");
slmdkCarG.crMdl[161] = new Array("4runner","none4x4","altezza","altis","aurion","auris","avalon","avanza","avensis","avensis_verso","aygo","bandeirante","bundera","caldina","camry","carina","cavalier","celica","corolla","corona","cressida","cresta","crown","curren","echo","estima_emina","estima_lucida","fj_cruiser","fortuner","granvia","harrier","hi-lux","hiace","highlander","innova","iq","kijang","kluger","landcruiser","levin","lexcen","liteace","long_bed_pick-up","mark_ii","masterace","matrix","mr2","noah","paseo","nonepickup","picnic","prado","previa","prius","rav4","revo","runx","sequoia","sera","sienna","soarer","solara","soluna","space_cruiser","sprinter","starlet","supra","t100","t18","tacoma","tarago","tercel","townace","troop_carrier","truck","tundra","none","venza","vienta","vios","will_vs","yaris");
slmdkCarG.crMdl[162] = new Array("NUMERIC601","p50forwardslashii");
slmdkCarG.crMdl[163] = new Array("NUMERIC1500","NUMERIC2000","2500_pi","2500s","2500tc","acclaim","dolomite","gt6","gt6plussign","herald","mk1_pi_saloon","spitfire","sprint","stag","tr3a","tr6","tr7","tr8","vitesse");
slmdkCarG.crMdl[164] = new Array("t4");
slmdkCarG.crMdl[165] = new Array("3000s","cerbera","chimaera","griffith","s2","t350","tasmin","tuscan","vixen");
slmdkCarG.crMdl[166] = new Array("NUMERIC1500","princess");
slmdkCarG.crMdl[167] = new Array("agila","astra","belmont","calibra","carlton","cavalier","chevette","combo_van","corsa","frontera","meriva","midi","monterey","movano","nova","omega","rascal","senator","signum","sintra","tigra","vectra","velox","victor","viva","vivaro","vx220","zafira");
slmdkCarG.crMdl[168] = new Array("atlantique");
slmdkCarG.crMdl[169] = new Array("gaz-21","gaz-24","gaz-3110");
slmdkCarG.crMdl[170] = new Array("beetle","bora","brasilia","cabrio","caddy","caravelle","corrado","corsar","dasher","derby","eos","eurovan","fox","gol","golf","gti","jetta","karmann_ghia","lt_35","lupo","passat","pickup","pointer","polo","quantum","rabbit","santana","scirocco","sharan","thing","touareg","touran","transporter","type_i","type_ii","type_iii","vanagon","variant","vento");
slmdkCarG.crMdl[171] = new Array("NUMERIC121","NUMERIC122","NUMERIC140","NUMERIC145","NUMERIC164","NUMERIC240","NUMERIC242","NUMERIC244","NUMERIC245","NUMERIC264","NUMERIC265","NUMERIC340","NUMERIC360","NUMERIC440","NUMERIC460","NUMERIC480","NUMERIC66","NUMERIC740","NUMERIC760","NUMERIC780","NUMERIC850","NUMERIC940","NUMERIC960","c30","c70","dl","dl_wagon","duett","p1800es","s40","s60","s70","s80","s90","v40","v50","v70","xc70","xc90");
slmdkCarG.crMdl[172] = new Array("knight","tourist");
slmdkCarG.crMdl[173] = new Array("all_models","lotus_11");
slmdkCarG.crMdl[174] = new Array("cj-2a","cj-3a","jeep_pickup","jeep_station_wagon","m38");
slmdkCarG.crMdl[175] = new Array("16forwardslash60","18forwardslash85","4forwardslash44","6forwardslash110");
slmdkCarG.crMdl[176] = new Array("NUMERIC101","NUMERIC311","NUMERIC45","NUMERIC511","NUMERIC513","NUMERIC55","NUMERIC65","cabriolet","gv","gvx","koral","sana","skala","zastava_128","zastava_750");
slmdkCarG.crMdl[177] = new Array("NUMERIC968","tavria");
slmdkCarG.crMdl[178] = new Array("none");



slmdkCar.setEnableDisableScriptCookie = function(){
var usrInputStr;
usrInputStr = "1";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarDetailsEnable"))) {
usrInputStr = "1";
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarDetailsEnable"))){
usrInputStr = slamdunkCkieUtls.getCookie("CraigslistCarDetailsEnable");
}
}
if ( usrInputStr == null ){
return;
}
if ( slamdunkStrgUtls.isBlank( usrInputStr ) ){
return;
}

slamdunkCkieUtls.setCookie("CraigslistCarDetailsEnable", usrInputStr, 20);
}

slmdkCar.setPageUrlCookie = function(){
slamdunkCkieUtls.setCookie("CraigslistCarDtlsUrl", document.URL, 20);
}

slmdkCar.setPageUrlCookieToBlank = function(){
slamdunkCkieUtls.setCookie("CraigslistCarDtlsUrl", " ", 20);
}

slmdkCar.isRloadedPage = function(){
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie("CraigslistCarDtlsUrl"))) {
if(slamdunkCkieUtls.getCookie("CraigslistCarDtlsUrl")==document.URL.toString()){
return true;
}else{
return false;
}
}else{
return false;
}
}

if(!slmdkGTContCar) var slmdkGTContCar = {
t:function(){
var divt = document.createElement("div");
divt.setAttribute("id","slmdkt");
divt.setAttribute("class","slmdkt");
var c = document.createElement("table");
c.setAttribute("id","slmdktc");
c.setAttribute("class","slmdktc");
c.setAttribute("style","" +
"margin: 2px;" +
"padding: 2px; " +
"border: 0px;" +
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
u.setAttribute("id", "slmdkGULContCar");
u.setAttribute("style", "" +
"list-style: none;" +
"display: table;" +
"margin-left: 0;" +
"padding-left: 1em;" +
"");
d.appendChild(u);
td1.appendChild(d);
divt.appendChild(c);
var mc = slmdkCar.getMainContainer();
if(null != mc){
mc.parentNode.insertBefore(divt,mc);
}else{
document.body.insertBefore(divt, document.body.firstChild);
}
}catch(e){
}
}
};

slmdkCar.getCarYear = function(theListTitle){
var arrTheHeadingWords = slamdunkStrgUtls.trim(theListTitle).split(" ");
var yrLength = arrTheHeadingWords[0].length;
var returnValue = parseInt(arrTheHeadingWords[0]);
if(isNaN(returnValue)){
returnValue = 0;
}
return returnValue;
}

slmdkCar.getCarYearInYYYY = function(theHeading) {
var MIN_CAR_MODEL_YEAR_4 = 1930;
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
returnValue=parseInt(firstWord);
}else if (firstWord.toLowerCase().indexOf("fs")==0){ // FS: 1999 ; fs 1999
firstWord = arrTheHeadingWords[1];
returnValue=parseInt(firstWord);
}
if(isNaN(returnValue)){
returnValue = 0;
}
} else if (yrLength != 2 && yrLength != 4){ // 2, 3 , 4,..
returnValue = 0;
} else if (yrLength == 2 && returnValue < 15){ // 01, 02,...07,..15
returnValue = 2000+returnValue;
} else if (yrLength == 2 && returnValue >= 15){ // 80, 91, 92,..96
returnValue = 1900+returnValue;
}
return returnValue;
}

slmdkCar.checkCarYear = function(theHeading) {
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
returnValue = 0;
} else if (yrLength != 2 && yrLength != 4){ // 2, 3 , 4,..
returnValue = 0;
} else if (yrLength == 2 && returnValue < 15 && MIN_CAR_MODEL_YEAR_4 < 2000){ // 01, 02,...07,..15
returnValue = 2000+returnValue;
} else if (yrLength == 2 && returnValue < MIN_CAR_MODEL_YEAR_2 && MIN_CAR_MODEL_YEAR_4 < 2000){ // 80, 91, 92,..96
returnValue = 0;
} else if (yrLength == 2 && returnValue < (MIN_CAR_MODEL_YEAR_2+100) && MIN_CAR_MODEL_YEAR_4 >= 2000){ // 80, 91, 92,..96
returnValue = 0;
} else if (yrLength == 4 && returnValue < MIN_CAR_MODEL_YEAR_4){ // 1980, 1991, 1992,..1996
returnValue = 0;
}else {
returnValue = 0;
}
return returnValue;
}

slmdkCar.checkCarPriceLimit = function(theHeading) {
var MAX_CAR_PRICE = 15000; // ADD THIS TO Cookie
var tempPrice = Number(slamdunkCkieUtls.getCookie("CraigslistCarMaxPrice"));
MAX_CAR_PRICE = tempPrice;
var tmpRemoveCity=theHeading.substring(0,theHeading.lastIndexOf("(")-1);
var arrHeadWords = slamdunkStrgUtls.trim(tmpRemoveCity).split(" ");
var lastWord = arrHeadWords[arrHeadWords.length - 1];
var returnValue = parseInt( lastWord.slice(1) );
if(isNaN(returnValue)){
returnValue = 0;
} else if (returnValue > MAX_CAR_PRICE){ // > $10000,..
returnValue = 0;
}
return returnValue;
}

slmdkCar.getCarPrice = function(theHeading) {
var tmpRemoveCity=theHeading.substring(0,theHeading.lastIndexOf("(")-1);
var arrHeadWords = slamdunkStrgUtls.trim(tmpRemoveCity).split(" ");
var lastWord = arrHeadWords[arrHeadWords.length - 1];
var returnValue = 0;
if(isNaN(parseInt(lastWord.slice(1)))){
var tmpPrcStr=lastWord.slice(1);
var pos=tmpPrcStr.search(/[1-9]/);
if(pos!=-1){
returnValue=parseInt(tmpPrcStr.substring(pos,tmpPrcStr.length));
}else{
returnValue=0;
}
}else{
returnValue = parseInt( lastWord.slice(1) );
}
if(isNaN(returnValue)){
returnValue = 0;
}
return returnValue;
}

slmdkCar.getCarPriceWCrcy = function(theHeading) {
var tmpRemoveCity=theHeading.substring(0,theHeading.lastIndexOf("(")-1);
var arrHeadWords = slamdunkStrgUtls.trim(tmpRemoveCity).split(" ");
var lastWord = arrHeadWords[arrHeadWords.length - 1];
var returnValue = lastWord;
return returnValue;
}

slmdkCar.getCLStat = function(theHeading, urlStr) {
var tmpRemoveCity=theHeading.substring(0,theHeading.lastIndexOf("(")-1);
var arrHeadWords = slamdunkStrgUtls.trim(tmpRemoveCity).split(" ");
var lastWord = arrHeadWords[arrHeadWords.length - 1];
var returnValue = slmdkCar.getCarPrice(theHeading);
if(isNaN(returnValue)){
returnValue = 0;
}else if (returnValue<100){ // OMIT 100 OR LESS (e.g. $1) PRICE.
returnValue=0;
}else{
if(theHeading.indexOf(slmdkCarGV.mk)==-1){
if(theHeading.indexOf(slmdkCarGV.mdl)==-1){
return 0;
}
}
slmdkCarGCL.count_cl=slmdkCarGCL.count_cl+1;
slmdkCarGCL.prcStrArr[slmdkCarGCL.count_cl]=slmdkCar.getCarPriceWCrcy(theHeading);
slmdkCarGCL.loc[slmdkCarGCL.count_cl]=theHeading.substring(theHeading.lastIndexOf("(")+1,theHeading.lastIndexOf(")"));
slmdkCarGCL.url[slmdkCarGCL.count_cl]=urlStr;
slmdkCarGCL.ttl[slmdkCarGCL.count_cl]=theHeading;
}
return returnValue;
}


slmdkCar.initSlamdunkinGV = function(){
try{
if(!slmdkCar.isRloadedPage()){
slmdkCar.setPageUrlCookie();
if(Number(slamdunkCkieUtls.getCookie("slmdnkGVFlg"))!=1){
var h2elems = document.getElementsByTagName("H2");
var h2elem = h2elems[0];
var ttlStr=" ";
if(typeof(h2elem)=="object"){
try{
ttlStr=" "+h2elem.innerHTML;
slmdkCarGV.mkMdlYr = slmdkCar.getCarModelFromHeading2(ttlStr);
slmdkCarGV.prc = slmdkCar.getCarPrice(ttlStr);
slmdkCarGV.setGVCookie();
}catch(e){
}
}else{
}
}else{
slmdkCar.setYCLFlg0();
slmdkCarGV.setGVFromCookie();
}
}else{
slmdkCar.setYCLFlg0();
slmdkCarGV.setGVFromCookie();
}
}catch(e){
}
slmdkCarGV.dump();
}


slmdkCar.setYCLFlg0 = function(){
slamdunkCkieUtls.setCookie("slmdnkGVFlg","0",20);
}
slmdkCar.setYCLFlg1 = function(){
slamdunkCkieUtls.setCookie("slmdnkGVFlg","1",20);
}
slmdkCar.getCarModelFromHeading2 = function(theHeading){
var l = 0;
var modelsString = "none";
var carModel = "none";
var carMakeModel = "none";
var yr = 0;
yr = slmdkCar.getCarYearInYYYY(theHeading);
slmdkCarGV.yr = yr;
slmdkCarGV.iAr=0;
var crMkLen=slmdkCarG.crMk.length;
for (var k = 0; k < crMkLen; k++){
l=0;
slmdkCar.fndModlInTtl(theHeading,slmdkCarG.crMdl[k],k);
}
if(slmdkCarGV.iAr<1){ // no match found.
slmdkCarGV.dumpLst();
return "none";
}else if(slmdkCarGV.iAr>1){ // multiple match
slmdkCarGV.dumpLst();
var iFlg=0;
var iFlg2=0;
var tmp1=" ";
for(var mk=0;mk<crMkLen;mk++){
tmp1=slmdkCarG.crMk[mk];
if(slmdkCarG.gtM(tmp1," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
break;
} else if(slmdkCarG.gtM(tmp1.replace(/_/g," ")," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
break;
} else if(slmdkCarG.gtM(tmp1.replace(/-/g," ")," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
break;
}
}
if (iFlg>0){
for(var j=0;j<slmdkCarGV.iAr;j++){
if(slmdkCarGV.mk.search(new RegExp(slmdkCarGV.mkAr[j],"i")) != -1){
slmdkCarGV.mdl = slmdkCarGV.mdlAr[j];
slmdkCarGV.setGVCookie();
iFlg2=0;
break;
}
iFlg2=1;
}
}
if(iFlg2>0) {
slmdkCar.showMakeNModelsOnTop();
return "3";
}
return "2";
}else if(slmdkCarGV.iAr>0){ // one match. show details
if(slmdkCarGV.mdlAr[slmdkCarGV.iAr-1]){
slmdkCarGV.mdl = slmdkCarGV.mdlAr[slmdkCarGV.iAr-1];
}
if(slmdkCarGV.mkAr[slmdkCarGV.iAr-1]){
slmdkCarGV.mk = slmdkCarGV.mkAr[slmdkCarGV.iAr-1];
}
slmdkCarGV.dumpLst();
return "1";
}
return "none";
}


slmdkCar.fndModlInTtl = function(ttl, arrModel,iMk) {
ttl=ttl.replace(/,/g," ");
ttl=" "+ttl+" "; // guarantees whitespace boundary \s
try{
if(arrModel.length>0){
var tmp=" ";
var tmp2=" ";
for(var i=0;i<arrModel.length;i++){
tmp=arrModel[i];
if(slmdkCarG.gtM(tmp,ttl) != null){
slmdkCarGV.mdlAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(tmp);
slmdkCarGV.mkAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(slmdkCarG.crMk[iMk]);
slmdkCarGV.mdlAll = tmp;
slmdkCarGV.mkAll = slmdkCarG.crMk[iMk];
slmdkCarGV.iAr++;
}else if(tmp.indexOf("_")!=-1){
if(slmdkCarG.gtM(tmp.replace(/_/g," "),ttl) != null){
slmdkCarGV.mdlAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(tmp);
slmdkCarGV.mkAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(slmdkCarG.crMk[iMk]);
slmdkCarGV.mdlAll = tmp;
slmdkCarGV.mkAll = slmdkCarG.crMk[iMk];
slmdkCarGV.iAr++;
}else if(slmdkCarG.gtM(tmp.replace(/_/g,""),ttl) != null){
slmdkCarGV.mdlAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(tmp);
slmdkCarGV.mkAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(slmdkCarG.crMk[iMk]);
slmdkCarGV.mdlAll = tmp;
slmdkCarGV.mkAll = slmdkCarG.crMk[iMk];
slmdkCarGV.iAr++;
}
}else if(tmp.indexOf("-")!=-1){
if(slmdkCarG.gtM(tmp.replace(/-/g," "),ttl) != null){
slmdkCarGV.mdlAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(tmp);
slmdkCarGV.mkAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(slmdkCarG.crMk[iMk]);
slmdkCarGV.mdlAll = tmp;
slmdkCarGV.mkAll = slmdkCarG.crMk[iMk];
slmdkCarGV.iAr++;
}else if(slmdkCarG.gtM(tmp.replace(/-/g,""),ttl) != null){
slmdkCarGV.mdlAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(tmp);
slmdkCarGV.mkAr[slmdkCarGV.iAr]=slmdkCarG.gtMFrmDelStr(slmdkCarG.crMk[iMk]);
slmdkCarGV.mdlAll = tmp;
slmdkCarGV.mkAll = slmdkCarG.crMk[iMk];
slmdkCarGV.iAr++;
}
}
}
}
return "none";
}catch(e){
return "none";
}
}

slmdkCar.showModelsOnTop = function(theHeading){
try{
var yr = 0;
yr = slmdkCarGV.yr;
var hd=slamdunkStrgUtls.trim(theHeading);
var hd2=";";
if(hd.indexOf("-")!=-1){
hd2=hd.substring(hd.indexOf(" "),hd.lastIndexOf("-"));
}
var tmp1="";
var iFlg=0;
var crMkLen=slmdkCarG.crMk.length;
for(var mk=0;mk<crMkLen;mk++){
tmp1=slmdkCarG.crMk[mk];
if(slmdkCarG.gtM(tmp1," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
} else if(slmdkCarG.gtM(tmp1.replace(/_/g," ")," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
} else if(slmdkCarG.gtM(tmp1.replace(/_/g,"")," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
} else if(slmdkCarG.gtM(tmp1.replace(/-/g," ")," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
} else if(slmdkCarG.gtM(tmp1.replace(/-/g,"")," "+theHeading.replace(/,/g," ")+" ") != null){
slmdkCarGV.mk = slmdkCarG.gtMFrmDelStr(tmp1);
slmdkCarGV.mkAll = slmdkCarG.crMk[mk];
iFlg=1;
}

if(iFlg>0){
slmdkCarGV.setGVCookie();
var h2elem = document.getElementsByTagName("H2");
var divSelectModel = document.createElement('div');
divSelectModel.setAttribute("class","slmdnkDivSelectMdl");
divSelectModel.setAttribute("id","slmdnkDivSelectMdl");
divSelectModel.setAttribute('style',
"margin: 2px;" +
"background-color: #f7fafc;" +
"padding: 5px; " +
"border: 1px solid #eef1f3;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"");
var strDivSelectModel = " ";
var strTmpDivSelectModel = " ";
var strMcyMdlUrl = " ";
var tmpMdlStr="";
for(var md=0;md<slmdkCarG.crMdl[mk].length;md++){
tmpMdlStr=slmdkCarG.gtMFrmDelStr(slmdkCarG.crMdl[mk][md]);
tmpMdlStr = tmpMdlStr.replace("NUMERIC","");
if(tmpMdlStr.search("none")!=-1){
if(tmpMdlStr.length>4){
tmpMdlStr = tmpMdlStr.replace("none","");
}else{
continue;
}
}
strTmpDivSelectModel = "<A HREF=\"#\" onClick=\"javascript:slmdkSetCookie('slmdnkGVMdl', '"+tmpMdlStr+"', 20);"
+ "window.location.reload();return false;\">"
+ tmpMdlStr
+ "</A>"
;
strDivSelectModel = strDivSelectModel + " &nbsp;&nbsp; " + strTmpDivSelectModel;
}
strDivSelectModel = "<H3 class=\"slmdkSelMdl\" id=\"slmdkSelMdl\">Reviews of "+slmdkCarGV.mk+" : </H3>"+strDivSelectModel;
divSelectModel.innerHTML = strDivSelectModel;
h2elem[0].parentNode.insertBefore(divSelectModel, h2elem[0]);
return "found";
}
}
}catch(e){
return "none";
}
return "none";
}

slmdkCar.showMakeNModelsOnTop = function(theHeading){
for(var mk=0;mk<slmdkCarGV.iAr;mk++){
var h2elem = document.getElementsByTagName("H2");
var divSelectModel = document.createElement('div');
divSelectModel.setAttribute("class","slmdnkDivSelectMdl");
divSelectModel.setAttribute("id","slmdnkDivSelectMdl");
var strDivSelectModel = " ";
var strTmpDivSelectModel = " ";
var strMcyMdlUrl = " ";
strTmpDivSelectModel = "<A HREF=\"#\" onClick=\"javascript:slmdkSetCookie('slmdnkGVMdl', '"+slmdkCarGV.mdlAr[mk]+"', 20);"
+ "javascript:slmdkSetCookie('slmdnkGVMk', '"+slmdkCarGV.mkAr[mk]+"', 20);"
+ "window.location.reload();return false;\">"
+ slmdkCarGV.mkAr[mk]
+ " : "
+ slmdkCarGV.mdlAr[mk]
+ "</A>"
+ "<BR>"
;
strDivSelectModel = strDivSelectModel + " " + strTmpDivSelectModel;
}
divSelectModel.innerHTML = strDivSelectModel;
h2elem[0].parentNode.insertBefore(divSelectModel, h2elem[0]);
return "found";
}

slmdkCar.insertDivNodeAfterFooter = function(theContentNode){

var newImportedNode2 = document.importNode(theContentNode,true);
document.body.appendChild(newImportedNode2);
}

slmdkCar.insertDivNodeBeforeFooterWithWrapper = function(theContentNode,block){
var iFooterFoundFlag = 0;
var serializer = new XMLSerializer();
var xmlStr = serializer.serializeToString(theContentNode);
var emptDiv = document.createElement("div");
emptDiv.innerHTML = xmlStr;
var mc;
if(null != block){
if(block==1){
emptDiv.setAttribute("style",
"margin: 10px; " +
"padding: 5px; " +
"");
mc = slmdkCar.getMainContainer();
}else if(block == 2){
mc = slmdkCar.getPriceContainer();
}else if(block == 3){
mc = slmdkCar.getReviewContainer();
}else if(block == 4){
mc = slmdkCar.getReliabilityContainer();
}else {
mc = slmdkCar.getMainContainer();
}

}else{
mc = slmdkCar.getMainContainer();
}
if(null != mc){
mc.appendChild(emptDiv);
}else {
var divsOnPage = document.getElementsByTagName('ul');
for (var n=0; n < divsOnPage.length; n++ ){
clDiv = divsOnPage[n];
if(clDiv.getAttribute("class") == "clfooter"){
iFooterFoundFlag = 1;
clDiv.parentNode.insertBefore(emptDiv,clDiv);
break;
}
}
if (iFooterFoundFlag < 1) {
document.body.appendChild(emptDiv);
}
}
}

slmdkCar.insertImportNodeBeforeFooterWithWrapper = function(theContentNode,block){
var iFooterFoundFlag = 0;
var mc;
if(null != block){
if(block==1){
mc = slmdkCar.getMainContainer();
}else if(block == 2){
mc = slmdkCar.getPriceContainer();
}else if(block == 3){
mc = slmdkCar.getReviewContainer();
}else {
mc = slmdkCar.getMainContainer();
}

}else{
mc = slmdkCar.getMainContainer();
}
if(null != mc){
try{
var newImportedNode2 = document.importNode(theContentNode,true);
mc.appendChild(newImportedNode2);
iFooterFoundFlag = 1;
}catch(e){
}
}else{
var divsOnPage = document.getElementsByTagName('ul');
try{
for (var n=0; n < divsOnPage.length; n++ ){
clDiv = divsOnPage[n];
if(clDiv.getAttribute("class") == "clfooter"){
iFooterFoundFlag = 1;
var newImportedNode = document.importNode(theContentNode,true);
clDiv.parentNode.insertBefore(newImportedNode, clDiv);
break;
}
}
}catch(e){
}
}
if (iFooterFoundFlag < 1) {
document.body.appendChild(theContentNode);
}
}

slmdkCar.insertCarSurveyDiv = function(){
var carMakeModel = slmdkCarGV.mk + "/" + slmdkCarGV.mdl + "/" + slmdkCarGV.yr;
carMakeModel = "reviews/"+carMakeModel + "/";
var newCarSurveyUrl = "http://www.carsurvey.org/" + carMakeModel;
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkSur","disable reviews","enable reviews","slmdkSur")){
var tmp = new slmdkCar.ldAjx ( slmdkCar.rplcSpcUndScr(newCarSurveyUrl), 1);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkSur","slmdkSur","CarSurvey",3);
}
}catch(e){
}
}


slmdkCar.processTheFetchPageAndExtractDetail = function(xmlDoc, iFeature,strArg) {


if ( iFeature == 1 ){
slmdkCar.handleCarSurveyContent(xmlDoc);
} else if ( iFeature == 2 ){
slmdkCar.handleStumbleUponContent(xmlDoc);
} else if ( iFeature == 3 ){
} else if ( iFeature == 8 ){
slmdkCar.handleYSrchCL(xmlDoc,strArg);
} else {
}
}


slmdkCar.handleGglSrchCL = function(xmlDoc){
try{
var x = document.createElement("div");
x.innerHTML = xmlDoc;
var a = x.getElementsByTagName('a');
var tmpArr= new Array();
var j=0;
var al=a.length;
for(var i=0;i<al;i++){
aE = a[i];
if("l"==aE.getAttribute("class")){
tmpArr[j] = aE.getAttribute("href");
j++;
}
}
slmdkCarGCL.count_all=tmpArr.length;
for(var k=0;k<tmpArr.length;k++){
slmdkCar.ldAjx(tmpArr[k], 10);
}
}catch(e){
}

}


slmdkCar.handleYSrchCL = function(xmlDoc,strArg){
try{
var yUrl = xmlDoc.getElementsByTagName('Url');
var tmpArr= new Array();
var j=0;
for(var i=0;i<yUrl.length;i++){
yUrlElem = yUrl[i];
if(slmdkCar.isCarDetailsPageUrl(yUrlElem.textContent)){
tmpArr[j] = yUrlElem.textContent;
j++;
}
}
slmdkCarGCL.count_all=tmpArr.length;
for(var k=0;k<tmpArr.length;k++){
slmdkCar.ldAjx(tmpArr[k], 10);
}
}catch(e){
}
}

slmdkCar.handleYSrchJsonCL = function(jsonData){
try{
var jObj;
if(typeof( JSON ) != "undefined"){
try{
jObj = JSON.parse(jsonData);
}catch(ne){
}
}
if(typeof( slmdkCar.json_parse ) !== "undefined"){
try{
jObj = slmdkCar.json_parse(jsonData);
}catch(je){
}
}
for(var i = 0; i < jObj.ResultSet.Result.length; i++){
var li = document.createElement('li');
var a = document.createElement('a');
a.href = jObj.ResultSet.Result[i].Url;
a.innerHTML = jObj.ResultSet.Result[i].Title;
li.appendChild(a);
if(slmdkCar.isCarDetailsPageUrl(jObj.ResultSet.Result[i].Url)){
slmdkCar.ldAjx(jObj.ResultSet.Result[i].Url, 10);
}
}
}catch(e){
}
}

slmdkCar.handleGenerateCLStats = function(txtDoc,urlStr){
try {
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var h2s = xhrdoc.getElementsByTagName('H2');
if(h2s.length == 0){
h2s = xhrdoc.getElementsByTagName('h2');
}
for(var i=0;i<h2s.length;i++){
h2Elem = h2s[i];
slmdkCar.getCLStat(h2Elem.textContent, urlStr);
}
if(slmdkCarGCL.count_all<1){
slmdkCarGCL.dump();
slmdkCar.tblCLList();
}
}catch(e){
}
}



slmdkCar.handleCarSurveyContent = function(xmlDoc){
try{
var happy = "data:image/gif;base64,R0lGODlhDwAPALMOAP/qAEVFRQAAAP/OAP/JAP+0AP6dAP/+k//9E///////xzMzM///6//lAAAAAAAAACH5BAEAAA4ALAAAAAAPAA8AAARb0EkZap3YVabOGRcWcAgCnIMRTEEnCCfwpqt2mHEOagoOnz+CKnADxoKFyiHHBBCSAdOiCVg8KwPZa7sVrgJZQWI8FhB2msGgwTXTWGqCXP4WBQr4wjDDstQmEQA7";
var sad = "data:image/gif;base64,R0lGODlhEQARALMAABy+AQAzACHLAiTTAijeAhWtARawAR7EARq7ASXWAiDIARi1ASngAgBmAAAAAP///yH5BAEAAA8ALAAAAAARABEAAARt8MlJq5Uu5zuzWaCxWU6BHEp6IIVTlYAwJPQgAC3lIEJG/BkBwoUxHAYZhjIzOIgwC0WCoKwSEooF0RGdVpXX7Lbb0GQaWG3xUDafncTHLtD4MhqBoa4QG1RtOHEYJigqLIIdDh8hIxxuHJAWEQA7";
var angry = "data:image/gif;base64,R0lGODlhEQARANUAAB7JARq6ASDIASrgAinfACXVBgEAAiPUASHHAxa2AB/EABm8Af7//yrgAP/+/yrfBB7EAifhARevAv///////RSuAivfAiTXARatABe0ARWtABSuACjgAxq0BBy6ARe7AijdBBq2AxivABi1AifVAibYAPv//he2AiHJAiDLASPLAh/DAB/DBCLTAB3EBBawBCndAiLUBhq/AR69ASbXBBi8AxSxAhawABawAhazAP3//hm0AAEAAAABAAAAAMzM/yH5BAEAAD8ALAAAAAARABEAAAawwJ9wSCwahT5Db3kcKiWZTudm4B19mBpEIABAAhpD0beZ8XyRC+Es0/SIvYXq0eCBfBxOKiBGSiAHPTwDBBEGPgcuElY/PSEoJD1oAxY+PiUCCW8/PCMIMQ0WdA8DHC0IIZsGJwg0MEuWBgQ0ADk+QgY2Chc+FAwOvj4FKyJ9jQs+DCYOOhMTDgYBm7gYkj48PUpVFbdwFR4KAFwsHxuMRTw8OCcZOy8+00fW2E31RkEAOw==";
var neutral = "data:image/gif;base64,R0lGODlhDwAPALMMAP/qAEVFRQAAAP/OAP/JAP6dAP+0AP/+k//9E///x//lAP//6wAAAAAAAAAAAAAAACH5BAEAAAwALAAAAAAPAA8AAARYkEkZap2Y1ZXOGRcWcAgCnEMRTEEnnKcgpKt2vHAOaokJ4L8TQRU4+IA4gqFyyDkByorvKVwGBtSTYri6/mRgAWGnGQwUuS2NZSa43WtRwEA3EDMsS20SAQA7";

var theDivContent = "";
var divsOnPage = xmlDoc.getElementsByTagName('div');
for(var i =0; i < divsOnPage.length; i++) {
thisDiv = divsOnPage[i];
if (thisDiv.getAttribute("class") == "maincontent"){
theDivContent = thisDiv.cloneNode(true);
var sFc = "";
var imgTags = theDivContent.getElementsByTagName('img');
for (var k =0; k < imgTags.length; k++){
img = imgTags[k];
src = img.getAttribute("src");
sFc = img.getAttribute("alt");
if(sFc.indexOf("Face")!=-1){
if(sFc == "Happy Face"){
img.setAttribute ("src", happy);
} else if(sFc == "Sad Face"){
img.setAttribute ("src", sad);
} else if(sFc == "Neutral Face"){
img.setAttribute ("src", neutral);
}
} else if(sFc.indexOf("Flag")!=-1){
if(sFc == "USA"){
} else if(sFc == "Canada"){
}
}
}
var aTags = theDivContent.getElementsByTagName('a');
for (var m =0; m < aTags.length; m++){
aElement = aTags[m];
hrefSrc = aElement.getAttribute("href");
aElement.setAttribute ("href", "http://www.carsurvey.org/" + hrefSrc);
}
var pTags = theDivContent.getElementsByTagName('p');
for (var p =0; p < pTags.length; p++){
pElement = pTags[p];
pElement.setAttribute ("style", "font-size: small;");
}
var divElem = document.createElement("DIV");
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkSur', '0','X', "CarSurvey") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">CarSurvey </span>" +
"<p></p>";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem, "slmdkSur");
divElem.appendChild(theDivContent);
slmdkCar.insertImportNodeBeforeFooterWithWrapper(divElem,3);
break;
}
}
}catch(e){
}
}

slmdkCar.handleMtrTrend = function(txtDoc, strArg) {
try {
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var divElements = xhrdoc.getElementsByTagName('DIV');
var dvLen=divElements.length;
for (var ii=0; ii < dvLen; ii++){
divElem = divElements[ii];
var idAttr = divElem.getAttribute("id");
if(null != idAttr){
if (idAttr.search("TABLE_GRID") != -1) {
var aTags = divElem.getElementsByTagName('A');
for (var m =0; m < aTags.length; m++){
anchorElement = aTags[m];
hrefSrc = anchorElement.getAttribute("href");
anchorElement.setAttribute ("href", "http://www.motortrend.com" + hrefSrc);
}
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkMT', '0','X',"MotorTrend") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">MotorTrend </span>" +
"<p>" +
"Usually the Private party price is slightly less or more than the Trade - in value. " +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Visit <a href=\"http://www.motortrend.com/cars/"+slmdkCarGV.yr+"/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/pricing/index.html\">Motor Trend</a></SPAN></p>";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem, "slmdkMTrd");
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, 2);
}
}
}
}catch(e){
}
}


slmdkCar.handleVer = function(txtDoc){
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
if(gV>slmdkCarG.v){
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
dv.innerHTML="<p><h3>New version available :</h3>You are using version : "+slmdkCarG.v+" , New Version : "+gV+"<br>" +
"<font style=\"font-size: x-large;color:green;\">Download</font>" +
" : <a href=\"http://userscripts.org/scripts/show/12839\">userscripts.org</a><br>";
dv.innerHTML=dv.innerHTML+"</p>";
document.body.insertBefore(dv,document.body.firstChild);
}else{
}
}catch(e){
}
}


slmdkCar.addEdmdCss = function(){
try{
var s=" ";
s = "div.cr{border-bottom:1px solid #ccc;overflow:hidden;margin:0 0 24px;padding:0 0 28px;}" +
".cr p.title{font-size:16px;font-weight:bold;line-height:.9;margin:0 0 5px;}" +
".cr p.byline{color:#666;font-size:12px;margin:0 0 11px;}" +
".cr p.subheader{font-size:14px;font-weight:bold;margin:13px 0 2px;}" +
".cr p{line-height:1.3;}" +
".cr p.info{color:#999;font-size:11px;margin:6px 0 4px;}" +
".cr form.review-rating{padding:2px 0 9px;}" +
".cr input.radio{margin:0 0 0 12px;}" +
".cr input.image{margin:0 0 0 12px;vertical-align:bottom;}" +
"div.pagenav-footer{margin:12px 0 30px;text-align:center;}.pagenav-footer .navcontainer{margin:0 auto;}.pagenav-footer ul{display:inline;}" +
".pagenav-footer li{display:inline;font-family:Verdana;font-size:12px;}.pagenav-footer li.prev{margin:0 10px 0 0;}.pagenav-footer li.next{margin:0 0 0 10px;}" +
".pagenav-footer li a{border:1px solid #ccc;padding:0 4px;*padding-bottom:1px;text-decoration:none;}.pagenav-footer li a:hover{color:#fff !important;background:#36c;}" +
".pagenav-footer li.selected{border:1px solid #fff;color:#c00;padding:0 4px;*padding-bottom:1px;text-decoration:none;}" +
".pagenav-footer li.disabled{border:1px solid #fff;color:#dbdbdb;padding:0 4px;*padding-bottom:1px;}.pagenav-footer p.info{color:#ccc;font-size:10px;margin:8px 0 0;}" +
"";
slmdkCar.addGlobalStyle(s);
}catch(e){
return"";
}
}
slmdkCar.addEdmdCssD = function(){
try{
var s=" ";
s = "" +
"div.discussions-header{height:21px;}.discussions-header p{float:left;font-size:14px;font-weight:bold;line-height:.9;}" +
"p.no-discussions {padding-bottom:20px;}div.discussion{border-top:1px solid #ccc;padding:19px 0 0;}" +
".discussion p{line-height:1.3;}p.topic{color:#36c;font-size:20px;font-weight:bold;line-height:1;}" +
"p.topic a{text-decoration:none;}p.topic a:hover{text-decoration:underline;}p.question-title{font-size:14px;font-weight:bold;margin:10px 0 3px;}" +
"p.byline{color:#666;font-size:12px;margin:0 0 0;}p.question{padding:0 0 18px;}" +
"div.pagenav-footer{margin:12px 0 30px;text-align:center;}.pagenav-footer .navcontainer{margin:0 auto;}.pagenav-footer ul{display:inline;}" +
".pagenav-footer li{display:inline;font-family:Verdana;font-size:12px;}.pagenav-footer li.prev{margin:0 10px 0 0;}.pagenav-footer li.next{margin:0 0 0 10px;}" +
".pagenav-footer li a{border:1px solid #ccc;padding:0 4px;*padding-bottom:1px;text-decoration:none;}.pagenav-footer li a:hover{color:#fff !important;background:#36c;}" +
".pagenav-footer li.selected{border:1px solid #fff;color:#c00;padding:0 4px;*padding-bottom:1px;text-decoration:none;}" +
".pagenav-footer li.disabled{border:1px solid #fff;color:#dbdbdb;padding:0 4px;*padding-bottom:1px;}.pagenav-footer p.info{color:#ccc;font-size:10px;margin:8px 0 0;}" +
"";
slmdkCar.addGlobalStyle(s);
}catch(e){
return"";
}
}

slmdkCar.handleEdmd = function(txtDoc, strArg) {
try {
txtDoc = txtDoc.replace(/widget6js/g,"none");
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var divElements = xhrdoc.getElementsByTagName('DIV');
var dvLen=divElements.length;
for (var ii=0; ii < dvLen; ii++){
divElem = divElements[ii];
var idAttr = divElem.getAttribute("id");
if(null != idAttr){
if (idAttr.search("gl-content-article") != -1) {
slmdkCar.addEdmdCss();
var aTags = divElem.getElementsByTagName('A');
for (var m =0; m < aTags.length; m++){
var anchorElement = aTags[m];
hrefSrc = anchorElement.getAttribute("href");
if((slamdunkStrgUtls.trim(hrefSrc)).indexOf("/")==0){
anchorElement.setAttribute ("href", "http://www.edmunds.com" + hrefSrc);
}
}
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkEdmds', '0','X',"Consumer reviews from: Edmunds") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Consumer reviews from: Edmunds </span>" +
"<p>" +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <a href=\""+slmdkCar.rplcSpcUndScr("http://www.edmunds.com/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/"+slmdkCarGV.yr+"/consumerreview.html?").toLowerCase()+"\">Edmunds</a></SPAN> for more.</p>";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem,"slmdkEdmdRev");
var rf = divElem.getElementsByTagName('DIV');
var subE;
for(var j=0;j<rf.length;j++){
subE = rf[j];
var a=subE.getAttribute("class");
if(a!=null){
if(a.search("ratings-filter")!=-1){
subE.parentNode.removeChild(subE);
}else if(a.search("infobox")!=-1){
subE.parentNode.removeChild(subE);
}
}
}
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, 3);
break;
}
}
}
}catch(e){
}
}
slmdkCar.handleEdmdD = function(txtDoc, strArg) {
try {
txtDoc = txtDoc.replace(/widget6js/g,"none");
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var divElements = xhrdoc.getElementsByTagName('DIV');
var dvLen=divElements.length;
for (var ii=0; ii < dvLen; ii++){
divElem = divElements[ii];
var idAttr = divElem.getAttribute("id");
if(null != idAttr){
if (idAttr.search("gl-content-article") != -1) {
slmdkCar.addEdmdCssD();
var aTags = divElem.getElementsByTagName('A');
for (var m =0; m < aTags.length; m++){
var anchorElement = aTags[m];
hrefSrc = anchorElement.getAttribute("href");
if((slamdunkStrgUtls.trim(hrefSrc)).indexOf("/")==0){
anchorElement.setAttribute ("href", "http://www.edmunds.com" + hrefSrc);
}
}
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkEdmdsD', '0','X',"Discussion at Edmunds") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Discussion at Edmunds </span>" +
"<p>" +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <a href=\""+slmdkCar.rplcSpcUndScr("http://www.edmunds.com/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/"+slmdkCarGV.yr+"/consumerreview.html?").toLowerCase()+"\">Edmunds</a></SPAN> for more.</p>";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem, "slmdkEdmdRev");
var rf = divElem.getElementsByTagName('DIV');
var subE;
for(var j=0;j<rf.length;j++){
subE = rf[j];
var a=subE.getAttribute("class");
if(a!=null){
if(a.search("ratings-filter")!=-1){
subE.parentNode.removeChild(subE);
}else if(a.search("infobox")!=-1){
subE.parentNode.removeChild(subE);
}
}
}
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, 3);
break;
}
}
}
}catch(e){
}
}

/**
* ---------- json.org : json_parse.js -------------
* compressed http://www.json.org/json_parse.js
* used http://crockford.com/javascript/jsmin to compress
*/
slmdkCar.json_parse=(function(){var at,ch,escapee={'"':'"','\\':'\\','/':'/',b:'\b',f:'\f',n:'\n',r:'\r',t:'\t'},text,error=function(m){throw{name:'SyntaxError',message:m,at:at,text:text};},next=function(c){if(c&&c!==ch){error("Expected '"+c+"' instead of '"+ch+"'");} ch=text.charAt(at);at+=1;return ch;},number=function(){var number,string='';if(ch==='-'){string='-';next('-');} while(ch>='0'&&ch<='9'){string+=ch;next();} if(ch==='.'){string+='.';while(next()&&ch>='0'&&ch<='9'){string+=ch;}} if(ch==='e'||ch==='E'){string+=ch;next();if(ch==='-'||ch==='+'){string+=ch;next();} while(ch>='0'&&ch<='9'){string+=ch;next();}} number=+string;if(isNaN(number)){error("Bad number");}else{return number;}},string=function(){var hex,i,string='',uffff;if(ch==='"'){while(next()){if(ch==='"'){next();return string;}else if(ch==='\\'){next();if(ch==='u'){uffff=0;for(i=0;i<4;i+=1){hex=parseInt(next(),16);if(!isFinite(hex)){break;} uffff=uffff*16+hex;} string+=String.fromCharCode(uffff);}else if(typeof escapee[ch]==='string'){string+=escapee[ch];}else{break;}}else{string+=ch;}}} error("Bad string");},white=function(){while(ch&&ch<=' '){next();}},word=function(){switch(ch){case't':next('t');next('r');next('u');next('e');return true;case'f':next('f');next('a');next('l');next('s');next('e');return false;case'n':next('n');next('u');next('l');next('l');return null;} error("Unexpected '"+ch+"'");},value,array=function(){var array=[];if(ch==='['){next('[');white();if(ch===']'){next(']');return array;} while(ch){array.push(value());white();if(ch===']'){next(']');return array;} next(',');white();}} error("Bad array");},object=function(){var key,object={};if(ch==='{'){next('{');white();if(ch==='}'){next('}');return object;} while(ch){key=string();white();next(':');if(Object.hasOwnProperty.call(object,key)){error('Duplicate key "'+key+'"');} object[key]=value();white();if(ch==='}'){next('}');return object;} next(',');white();}} error("Bad object");};value=function(){white();switch(ch){case'{':return object();case'[':return array();case'"':return string();case'-':return number();default:return ch>='0'&&ch<='9'?number():word();}};return function(source,reviver){var result;text=source;at=0;ch=' ';result=value();white();if(ch){error("Syntax error");} return typeof reviver==='function'?(function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}} return reviver.call(holder,key,value);}({'':result},'')):result;};}());
/* ----------end json_parse.js ------------- */

slmdkCar.arrtoobj = function(jtxt){
try {
jtxt = jtxt.replace(/(\s)+id:/gi," \"id\":");
jtxt = jtxt.replace(/(\s)+name:/gi," \"name\":");
jtxt = jtxt.replace(/(\s)+href:/gi," \"href\":");
jtxt = jtxt.replace(/(\s)+tid:/gi," \"tid\":");
jtxt = jtxt.replace(/(\s)+drivetrain:/gi," \"drivetrain\":");
jtxt = jtxt.replace(/(\s)+engine:/gi," \"engine\":");
jtxt = jtxt.replace(/(\s)+transmission:/gi," \"transmission\":");
jtxt = jtxt.replace(/(\s)+fueleconomy:/gi," \"fueleconomy\":");
jtxt = jtxt.replace(/(\s)+price:/gi," \"price\":");
jtxt = jtxt.replace(/(\s)+trim:/gi," \"trim\":");
jtxt = jtxt.replace(/(\s)+isSelected:/gi," \"isSelected\":");
jtxt = jtxt.replace(/'/gi,"\"");
}catch(err){
}
try {
if(typeof( JSON ) !== "undefined"){
try{
return JSON.parse(jtxt);
}catch(ne){
}
}
if(typeof( slmdkCar.json_parse ) !== "undefined"){
try{
return slmdkCar.json_parse(jtxt);
}catch(je){
}
}
}catch(e){
}
}
slmdkCar.handleEdmdTMV = function(txtDoc, strArg) {
try {
txtDoc = txtDoc.replace(/widget6js/g,"none");
var divElem = document.createElement("DIV");
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkEdmdsTMV', '0','X',"Edmunds TMV") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Edmunds TMV </span>" +
"<p> " +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <a href=\""+slmdkCar.rplcSpcUndScr("http://www.edmunds.com/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/"+slmdkCarGV.yr+"/index.html").toLowerCase()+"\">Edmunds</a></SPAN> for more (miles & area code price adjustment).</p>";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem, "slmdkEdmdTMV");
try{
var strEdmdPrcExtract = txtDoc.substring(txtDoc.indexOf('YAHOO.edmunds.myip.data = ')+25, txtDoc.indexOf('{}];', txtDoc.indexOf('YAHOO.namespace("edmunds.myip");'))+3 );
var jsonEdmdPrc = slmdkCar.arrtoobj( strEdmdPrcExtract );
if(jsonEdmdPrc.length>1){
var strEdmdPrcTbl;
strEdmdPrcTbl = "<DIV><TABLE  id=\"slmdkEdPrc\" class=\"slmdkEdPrc\">";
strEdmdPrcTbl = strEdmdPrcTbl + "<TBODY>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TH>Model</TH>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TH>Drivetrain</TH>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TH>Engine</TH>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TH>Trans.</TH>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TH>Fuel Econ.</TH>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TH>TMV</TH>";
for (var ji=0;ji<jsonEdmdPrc.length;ji++){
if(typeof(jsonEdmdPrc[ji].name)=="undefined")continue;
strEdmdPrcTbl = strEdmdPrcTbl + "<TR>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TD>"+jsonEdmdPrc[ji].name+"</TD>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TD STYLE=\"color: gray;\">"+jsonEdmdPrc[ji].drivetrain+"</TD>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TD STYLE=\"color: gray;\">"+jsonEdmdPrc[ji].engine+"</TD>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TD STYLE=\"color: gray;\">"+jsonEdmdPrc[ji].transmission+"</TD>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TD STYLE=\"color: gray;\">"+jsonEdmdPrc[ji].fueleconomy+"</TD>";
strEdmdPrcTbl = strEdmdPrcTbl + "<TD STYLE=\"font-weight: bold; font-family:courier;\">"+jsonEdmdPrc[ji].price+"</TD>";
strEdmdPrcTbl = strEdmdPrcTbl + "</TR>";
}
strEdmdPrcTbl = strEdmdPrcTbl + "</TBODY>";
strEdmdPrcTbl = strEdmdPrcTbl + "</TABLE></DIV>";
var emptydivTbl = document.createElement("DIV");
emptydivTbl.innerHTML = strEdmdPrcTbl;
divElem.appendChild(emptydivTbl);
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, 2);
}
}catch(ey){
}
}catch(e){
}
}

slmdkCar.handleMsn = function(txtDoc,urlStr){
try{
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var contdiv = document.createElement('div');
var iFlag = 0;
var divElements = xhrdoc.getElementsByTagName('DIV');
for (var ii=0; ii < divElements.length; ii++){
divElem = divElements[ii];
var idAttr = divElem.getAttribute("id");
if(null != idAttr){
if (idAttr.search("VipPage") != -1) {
var rf = divElem.getElementsByTagName('DIV');
var subE;
for(var j=0;j<rf.length;j++){
subE = rf[j];
var a=subE.getAttribute("class");
if(a!=null){
if(a.search("buyfun atfun")!=-1){
subE.parentNode.removeChild(subE);
}else if(a.search("blurb")!=-1){
subE.parentNode.removeChild(subE);
}
}
}
contdiv.appendChild(divElem);
slmdkCar.insertDivNodeBeforeFooterWithWrapper(contdiv, 3);
break;
}
}
}

}catch(e){
}
}

slmdkCar.handleEpnn = function (txtDoc, lk){
try{
if(txtDoc.indexOf("Epinions.com - Search Results:")!=-1){
return;
}
if(txtDoc.indexOf("See other matches for")!=-1){
return;
}
if(txtDoc.indexOf("Auto Parts and Accessories")!=-1){
return;
}
if(txtDoc.indexOf("Overall Rating")!=-1){
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var contdiv = document.createElement('div');
var iFlag = 0;



var Elmts = xhrdoc.getElementsByTagName('P');
for (var i=0; i < Elmts.length; i++){
divElem = Elmts[i];
var clsAttr = divElem.getAttribute("class");
if(null !== clsAttr){
if((clsAttr.indexOf("author")!=-1)){
try{
if((clsAttr.indexOf("author_rating")==-1)){
var h = divElem.parentNode.parentNode.getElementsByTagName("H2");
if(null!==h && typeof(h) != "undefined"){
var h2=h[0];
var ha = h2.getElementsByTagName("A");
if(null!==ha && typeof(ha) != "undefined"){
for(var j=0;j<ha.length;j++){
var haElm = ha[j];
haElm.setAttribute("class","slmdkEpnnH2");
}
}
h2.setAttribute("class","slmdkEpnnH2");
h2.setAttribute("style","color: blueViolet; text-decoration:none;");
contdiv.appendChild(h2.cloneNode(true));
}
}
}catch(eh){
}
contdiv.appendChild(divElem.cloneNode(true));
iFlag = 1;
}else if((clsAttr.indexOf("rkr")!=-1)){
contdiv.appendChild(divElem.cloneNode(true));
iFlag = 1;
}else if((clsAttr.indexOf("rkb")!=-1)){
contdiv.appendChild(divElem.cloneNode(true));
iFlag = 1;
}
}
}
if(iFlag>0){
slmdkCar.fixLinks(contdiv,"http://www.epinions.com");
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkEpnn', '0','X',"Epinion") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Epinion </span>" +
"<p>" +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <a href=\""+lk+"\">Epinion</a></SPAN> for more.</p>";
contdiv.insertBefore(pElement,contdiv.firstChild);
slmdkCar.slmdkSetBlckClsNm(contdiv, "slmdkEpnn");
slmdkCar.insertDivNodeBeforeFooterWithWrapper(contdiv, 3);
}
}
}catch(e){
}
}

slmdkCar.handleRc = function (txtDoc, lk){
try{
if(txtDoc.indexOf("No review items were found matching")!=-1){
return;
}
if(txtDoc.indexOf("clearfix rounded")==-1){
return;
}
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var contdiv = document.createElement('div');
var iFlag = 0;

var Elmts2 = xhrdoc.getElementsByTagName('SPAN');
for (var j2=0; j2 < Elmts2.length; j2++){
divElem2 = Elmts2[j2];
var clsAttr2 = divElem2.getAttribute("class");
if(null !== clsAttr2){
if((clsAttr2.indexOf("review-page-summary")!=-1)){
try{
var rdv = divElem2.parentNode.parentNode.parentNode;
contdiv.appendChild(rdv);
iFlag=1;
}catch(eh){
}
}
}
}
var clsAttr;
var id;
var divElem1;
var Elmts1 = xhrdoc.getElementsByTagName('DIV');
var lElmts1 = Elmts1.length;
for (var j=0; j < lElmts1; j++){
divElem1 = Elmts1[j];
try{
if(divElem1!=undefined){
clsAttr = divElem1.getAttribute("class");
id = divElem1.getAttribute("id");
}else{
continue;
}
}catch(ed){
}
if(null !== clsAttr){
if((clsAttr.indexOf("col-2-100")!=-1)){
try{
contdiv.appendChild(divElem1);
iFlag=1;
}catch(eh){
}
}else if((clsAttr.indexOf("clearfix rounded")!=-1)){
try{
contdiv.appendChild(divElem1);
iFlag=1;
}catch(eh){
}
}else if((clsAttr.indexOf("clearfix")!=-1)){
if(id){
if((id.indexOf("product-rating")!=-1)){
try{
contdiv.appendChild(divElem1);
iFlag=1;
}catch(eh){
}
}
}
}
}
}
var clsAttr2;
var Elmts = xhrdoc.getElementsByTagName('UL');
for (var i=0; i < Elmts.length; i++){
divElem = Elmts[i];
clsAttr2 = divElem.getAttribute("class");
if(null !== clsAttr2){
if((clsAttr2.indexOf("reviews")!=-1)){
try{
contdiv.appendChild(divElem);
iFlag=1;
}catch(eh){
}
}
}
}
if(iFlag>0){
slmdkCar.fixLinks(contdiv,"http://www.reviewcentre.com");
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkRc', '0','X',"Review Centre") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Review Centre</span>" +
"<p>" +
"<font style=\"color:brown;\"><i>Note: ReviewCentre reviews feature is experimental as it works properly only half " +
"the time. Sometimes the computer fails to pick the correct reviews in this section</i></font><br>" +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <a href=\""+lk+"\">Review Centre</a></SPAN> for more.</p>";
contdiv.insertBefore(pElement,contdiv.firstChild);
slmdkCar.slmdkSetBlckClsNm(contdiv, "slmdkRc");
slmdkCar.insertDivNodeBeforeFooterWithWrapper(contdiv, 3);
}
}catch(e){
}
}

slmdkCar.handleRcSrch = function (txtDoc, lk){
try{
if(txtDoc.indexOf("No review items were found matching")!=-1){
return;
}
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var contdiv = document.createElement('div');
var iFlag = 0;

var Elmts = xhrdoc.getElementsByTagName('DIV');
for (var i=0; i < Elmts.length; i++){
divElem = Elmts[i];
var clsAttr = divElem.getAttribute("id");
if(null !== clsAttr){
if((clsAttr.indexOf("content-search-results")!=-1)){
try{
var Elm1 = divElem.getElementsByTagName('DIV');
for (var j=0; j < Elm1.length; j++){
var el1 = Elm1[j];
var el1id = el1.getAttribute("id");
if(el1id){
if(el1id.indexOf("wrap-table")!=-1){
var as = el1.getElementsByTagName("A");
try{
var rea = /reviews([0-9])+\.html/;
for(var n=0; n<as.length;n++){
var ael = as[n];
var ahref = ael.getAttribute("href");
if(ahref.search(rea)!=-1){
slmdkCar.ldAjx("http://www.reviewcentre.com"+ahref,21);
break;
}
}
}catch(ea){

}
break;
}
}
}
}catch(eh){
}
}
}
}
}catch(e){
}
}

slmdkCar.handleAaTsb = function (txtDoc, lk){
try{
if(txtDoc.indexOf("tableTSB")==-1){
return;
}
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var contdiv = document.createElement('div');
var iFlag = 0;

var Elmts2 = xhrdoc.getElementsByTagName('TABLE');
for (var j2=0; j2 < Elmts2.length; j2++){
divElem2 = Elmts2[j2];
var clsAttr2 = divElem2.getAttribute("class");
if(null !== clsAttr2){
if((clsAttr2.indexOf("tableTSB")!=-1)){
try{
contdiv.appendChild(divElem2);
iFlag=1;
}catch(eh){
}
}
}
}
if(iFlag>0){
slmdkCar.fixLinks(contdiv,"http://www.aboutautomobile.com");
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkTsb', '0','X',"AboutAutomobile TSB") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">AboutAutomobile TSB</span>" +
"<p>" +
"<i>TSB: Technical Service Bulletin " +
"</i><br>" +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <a href=\""+lk+"\">AboutAutomobile</a></SPAN> for more.</p>";
contdiv.insertBefore(pElement,contdiv.firstChild);
slmdkCar.slmdkSetBlckClsNm(contdiv, "slmdkTsb");
slmdkCar.insertDivNodeBeforeFooterWithWrapper(contdiv, 4);
}
}catch(e){
}
}


slmdkCar.fixLinks = function (nd,pU){
try{
var Elm;
var href;
var Elmts = nd.getElementsByTagName('A');
if(null !== Elmts){
for (var i=0; i < Elmts.length; i++){
Elm = Elmts[i];
href = Elm.getAttribute("href");
if((slamdunkStrgUtls.trim(href)).indexOf("/")==0){
Elm.setAttribute("href",pU+href);
}
}
}
}catch(e){
}
}


slmdkCar.ldAjx = function(urlStr, iFeature) {
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
try {
slmdkCar.processTheFetchPageAndExtractDetailTEXT(responseDetails.responseText, iFeature);
}catch (e){
}
}else if ( iFeature == 3) {
if(responseDetails.responseText.search("TABLE_GRID") != -1){
try {
slmdkCar.processTheFetchPageAndExtractDetailTEXTautomotivePrice(responseDetails.responseText, iFeature);
}catch (e){
}
}
}else if ( iFeature == 4) {
slmdkCar.processTheFetchPageAndExtractDetailTEXTautomotivePrice(responseDetails.responseText, iFeature);

}else if ( iFeature == 5) {
var srch4 = responseDetails.responseText.match("id=\"content\"");
if (srch4 != null){
try {
processTheMsnPageAndExtractDetailTEXT(responseDetails.responseText, iFeature);
}catch (e){
}
}
}else if ( iFeature == 7) {
try {
slmdkCar.handleGglSrchCL(responseDetails.responseText);
}catch (e){
}
}else if ( iFeature == 9) {
try {
slmdkCar.handleYSrchJsonCL(responseDetails.responseText);
}catch (e){
}
}else if ( iFeature == 10) {
slmdkCarGCL.count_all--;
try {
slmdkCar.handleGenerateCLStats(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 11) {
try {
slmdkCar.handleMtrTrend(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 12) {
}else if ( iFeature == 14) {
try {
slmdkCar.handleVer(responseDetails.responseText);
}catch (e){
}
}else if ( iFeature == 15) {
try {
slmdkCar.handleEdmd(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 16) {
try {
slmdkCar.handleEdmdD(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 17) {
try {
slmdkCar.handleEdmdTMV(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 18) {
try {
slmdkCar.handleMsn(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 19) {
try {
slmdkCar.handleEpnn(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 20) {
try {
slmdkCar.handleRcSrch(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 21) {
try {
slmdkCar.handleRc(responseDetails.responseText,urlStr);
}catch (e){
}
}else if ( iFeature == 22) {
try {
slmdkCar.handleAaTsb(responseDetails.responseText,urlStr);
}catch (e){
}
} else {
try {
var xmlDoc = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");

slmdkCar.processTheFetchPageAndExtractDetail(xmlDoc, iFeature,urlStr);

}catch (e){
}
}
break;

case 408: case 504: // request timed out
break;
case 404: // Page not found.
if(iFeature==10){
slmdkCarGCL.count_all--;
if(slmdkCarGCL.count_all<1){
slmdkCarGCL.dump();
slmdkCar.tblCLList();
}
}
break;
default: // request error
return;
break;
}
}
});
}



slmdkCar.processTheFetchPageAndExtractDetailTEXT = function(xmlDoc, iFeature) {
slmdkCar.handleStumbleUponContentText(xmlDoc);
}

slmdkCar.insertStumbleUponDiv = function(){
var stumbleUponUrl = "http://www.stumbleupon.com/url/" + document.location;

try{
var tmp = new slmdkCar.ldAjx ( stumbleUponUrl, 2);
}catch (e){
}
}

slmdkCar.handleStumbleUponContentText = function(txtDoc){
try {
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var contdiv = document.createElement('div');
var iFlag = 0;
var divElements = xhrdoc.getElementsByTagName('UL');
for (var ii=0; ii < divElements.length; ii++){
divElem = divElements[ii];
var idAttr = divElem.getAttribute("class");
if(null != idAttr){
if (idAttr.search("listStumble listUrlReviews") != -1) {
iFlag =1;
contdiv.appendChild(document.importNode(divElem,true));
}
}
}
if(iFlag > 0){
contdiv.setAttribute("style", "font-size: small; margin: 0 auto 0 auto; background-color: #ffccff;")
slmdkCar.insertDivNodeBeforeFooterWithWrapper(contdiv,3);
}
}catch(e){
}
}


slmdkCar.processTheFetchPageAndExtractDetailTEXTautomotivePrice = function(txtDoc, iFeature) {


if ( iFeature == 3 ) {
slmdkCar.handleAutomotiveContentText(txtDoc);
} else if ( iFeature == 4 ) {
slmdkCar.handleAutomotiveRecallContentText(txtDoc);
}
}


slmdkCar.handleAutomotiveContentText = function(txtDoc){
try {
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var divElements = xhrdoc.getElementsByTagName('DIV');
for (var ii=0; ii < divElements.length; ii++){
divElem = divElements[ii];
var idAttr = divElem.getAttribute("id");
if(null != idAttr){
if (idAttr.search("TABLE_GRID") != -1) {
var aTags = divElem.getElementsByTagName('A');
for (var m =0; m < aTags.length; m++){
anchorElement = aTags[m];
hrefSrc = anchorElement.getAttribute("href");
anchorElement.setAttribute ("href", "http://www.automotive.com" + hrefSrc);
}
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkAtmo', '0','X',"Automotive") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Automotive </span>" +
"<p>Usually the Private party price is slightly less or more than the Trade - in value." +
" <SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <a href=\"http://www.automotive.com\">automotive</a></SPAN> for more.</p>";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem, "slmdkAtmoPrc");
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, 2);
}
}
}
}catch(e){
}
}

slmdkCar.handleAutomotiveRecallContentText = function(txtDoc){
try{
var iAutomotiveRecall = 0;
var strExtract = txtDoc.substring(txtDoc.indexOf('<body'), txtDoc.indexOf('</html>')-1 );
var serialize = new XMLSerializer();
var emptydiv = document.createElement('div');
emptydiv.innerHTML = strExtract;
var xhrdoc = emptydiv;
var divElements = xhrdoc.getElementsByTagName('DIV');
for (var ii=0; ii < divElements.length; ii++){
divElem = divElements[ii];
var idAttr = divElem.getAttribute("id");
if(null != idAttr){
if (idAttr.search("BUYERS_GUIDE_RECALLS") != -1) {
iAutomotiveRecall = 1;
var aTags = divElem.getElementsByTagName('A');
for (var m =0; m < aTags.length; m++){
anchorElement = aTags[m];
hrefSrc = anchorElement.getAttribute("href");
anchorElement.setAttribute ("href", "http://www.automotive.com" + hrefSrc);
}
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkAtmoRcll', '0','X',"Factory Recalls") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">&nbsp;</span>";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem, "slmdkAtmoRcll");
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, 4);
}
}
}
if (iAutomotiveRecall < 1){
}
}catch(e){
}
}


slmdkCar.insertGVdoFrame = function(strFrameURL){
try {
var myyp = document.createElement('div');
slmdkCar.slmdkSetBlckClsNm(myyp,"slmdkGVdo");
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkGVdo","disable videos","enable videos","slmdkGVdo", "0")){
myyp.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkGVdo', '0','X',"Google Videos") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Google Videos </span>" +
"<p>" +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <A href=\""+strFrameURL+"\">google videos</A></SPAN> for more.</p>" +
"<iframe src="+strFrameURL+"?"+ (new Date()).getTime()+"2"+" WIDTH=\"98%\" HEIGHT=\"500px\" frameborder=\"0\" />";
slmdkCar.insertDivNodeBeforeFooterWithWrapper(myyp, 3);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkGVdo","slmdkGVdo","Google Videos",3);
}
}catch(e){
}
}

slmdkCar.insertMsnFrame = function(strFrameURL){
try {
var myyp = document.createElement('div');
slmdkCar.slmdkSetBlckClsNm(myyp,"slmdkMsn");
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkMsn","disable msn autos","enable msn autos","slmdkMsn")){
myyp.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkMsn', '0','X',"MSN Autos") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">MSN Autos </span>" +
"<p>" +
"Check <strong>Reliability</strong>, Price ( <strong>KBB</strong> ) and user Review in below msn content." +
"<SPAN id=\"slmdkVSt\" class=\"slmdkVSt\">Goto <A href=\""+strFrameURL+"\">msn autos</A></SPAN> for more.</p>" +
"<iframe src="+strFrameURL+"?"+ (new Date()).getTime()+"1"+" WIDTH=\"98%\" HEIGHT=\"300px\" frameborder=\"0\" />";
slmdkCar.insertDivNodeBeforeFooterWithWrapper(myyp, 4);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkMsn","slmdkMsn","MSN Autos",4);
}
}catch(e){
}
}

slmdkCar.insertMsnDiv = function(strFrameURL){
try {
slmdkCar.ldAjx(strFrameURL,18);
}catch(e){
}
}

slmdkCar.insertCanadianBlackBookContent = function() {
var divElem = document.createElement("DIV");
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkPrcXtra","disable more resources","enable more resources","slmdkPrcXtra","0")){
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckDsbl('slmdkPrcXtra', '0','X',"Moar resources") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Moar resources </span>" +
"";
divElem.insertBefore(pElement,divElem.firstChild);
slmdkCar.slmdkSetBlckClsNm(divElem, "slmdkPrcXtra");
var cbbDiv = document.createElement('div');
var cbbInnerHtml = "" +
"<table class=\"CarEstimatedValueTbl\"><tbody><tr><td>Canada Car:</td><td> <a href=\"http://www.aaa.com/cgi/cbb_token.pl\">Canadian Black Book value</a> and " +
"<a href=\"http://www.vmrcanada.com/canada_makes.htm\">VMR Canada</a></td></tr>" +
"<tr><td>USA car:</td><td> <A href=\"http://www.kbb.com/kbb/UsedCars/default.aspx\">Kelly Blue Book</A> (kbb price is listed on MSN below), " +
"<A href=\"http://www.nadaguides.com/\">Nada Guides</A>, " +
"<A href=\"http://www.carquotes.com/UsedCarValuationSelectVehicle.aspx\">Black Book</A>" +
", <A href=\"http://www.nmvtis.gov/\">nmvtis.gov</A>" +
"</td></tr>" +
"</tbody></table>";
cbbDiv.innerHTML = cbbInnerHtml;
divElem.appendChild(cbbDiv);
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, 2);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkPrcXtra","slmdkPrcXtra","Moar resources",2);
}
}


slmdkCar.insertLinksContent = function() {
try{
var cbbDiv = document.createElement('div');
cbbDiv.setAttribute('style',
"margin: 2px;" +
"padding: 2px; " +
"");
var strLinks = " ";
strLinks = strLinks + "<a ";
strLinks = strLinks + "href=\"http://www.facebook.com/sharer.php?u="+document.URL+"\">";
strLinks = strLinks + "facebook";
strLinks = strLinks + "</a>";
strLinks = strLinks + "&nbsp;";

strLinks = strLinks + "<a ";
strLinks = strLinks + "href=\"http://www.stumbleupon.com/submit?url="+document.URL+"\">";
strLinks = strLinks + "StumbleUpon";
strLinks = strLinks + "</a>";
strLinks = strLinks + "&nbsp;";

strLinks = strLinks + "<a ";
strLinks = strLinks + "href=\"http://digg.com/submit?phase=2&amp;url="+document.URL+"\">";
strLinks = strLinks + "Digg";
strLinks = strLinks + "</a>";
strLinks = strLinks + "&nbsp;";

strLinks = strLinks + "<a ";
strLinks = strLinks + "href=\"http://del.icio.us/post?url="+document.URL+"\">";
strLinks = strLinks + "del.icio.us";
strLinks = strLinks + "</a>";
strLinks = strLinks + "&nbsp;";

strLinks = strLinks + "<a ";
strLinks = strLinks + "href=\"http://twitter.com/home?status=="+document.URL+"\">";
strLinks = strLinks + "twitter";
strLinks = strLinks + "</a>";
strLinks = strLinks + "&nbsp;";

cbbDiv.innerHTML = strLinks;

var li = document.createElement('LI');
li.setAttribute("style","display: table-row;");
li.appendChild(cbbDiv);
var t=document.getElementById("slmdkGULContCar");
if(t!=null){
t.appendChild(li);
}else{
document.body.insertBefore(li, document.body.firstChild);
}
}catch(e){
}
}



slmdkCar.insertMyScriptLinksDiv = function() {
var divElem = document.createElement("DIV");
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkMyCrUt","disable car-research utility info","enable car-research utility info","slmdkMyCrUt","0")){
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckMyUtDsbl('slmdkMyCrUt', '0','X') +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">" +
"<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAwZJREFUOE9dU11Ik2EYfS2SxBQLIRW98dYrwaiJPxN0Ttf8mTS3lciWzqlp/rC2qWia+JOlJv4kpJdiBIEXdWF4sWUKmZSWQWIXounK1nJTp87t9L7f9AP7br7vfR7Oec457/P5TX9A8tIKubBmJYE2Owl07JDzrn3if+gm5zxecvblpuzMeT+3m/j7u0lAwAEJDt4noaF7JDJyl8TEOMnTcUiMj6DQmFAsu4MqkQampJtoFuSj7ZocnXsCYRfi49uQnHwf6ekmyGR3odEUw2hUYHhYQhp6IFdTcFYpaoQFaEwpwOPnr2FZt2Lr6Ager8fjhdVqw8TEDDIyepCS0ojs7Bqo1cVoaJATXSPUueWoouAmVQ2GN37BBvp4vV72Ov3YbA7odKMQChuRm1tFv9VEVYtSkRomNnlzywe2b8PVMYyvPLq1dYmq2OXOdrsTUukTiEQmqFSlhE1nnsdf4e0J+OoNzFyOxxxPEB09j5iYaWxsOLna5OQ8kpKamQoi0UIvkKOdeWa9BwNYConD3MU4fOMJIiOXERLyHhUVH7na9vYOBIJ2SCR6Ii6CgU7sZIGxHk1+NigWC8GxWOcJwsPXERS0gKgoCw3HV87J6YNYbCDi2zBQ0EOPB1wnToaZS1fwuXUQ2zzByIgTYWFfEBFh5tPNy+unBEbeAg3wDwM8e4HvK6vY+y9/YG1tH729y1x9Z8flZRYyM+9xISaq0DwxhVnWYwoP3fAMjeEHT9LdvQ6X64iXbzYvIjGxhdqoJvTuy9LUqMsoQu+eCwcM9PM3dqta8YknqKxcwOqqgzu73R7I5QNIS6uDUllGSk4W6Raa6FKN/nXAd1XHak4tFJUOg2GMW2s6HVqthtT3IF9thDZLR1eZkkhL0PfmHeYdTvgW59gzLJZFOnmQA0ultSgs1MJkUhDq9bqhC0pGwvJgdlgmbDfouc+VpxyigXUgIaEFqan13OTCwhLo9Sr090uJeQ7JjIQpYXZYJoyILRi7Ypc4q56lTX+gaigU5Uw2m8zAmJoS/gPYXMQocevTNAAAAABJRU5ErkJggg==\" />" +
" Home of this utility ( <i>feedback</i> )</span>" +
"";
divElem.insertBefore(pElement,divElem.firstChild);
divElem.setAttribute("class", "slmdkMyCrUt");
var cbbDiv = document.createElement('div');
var cbbInnerHtml = "" +
"<p>" +
"<ul id=\"slmdkMy\" class=\"slmdkMy\" style=\"list-style-type: decimal; display: table;padding: 2px;margin: 1px;\">" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><strong>Firefox Addons:</strong></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"https://addons.mozilla.org/en-US/firefox/addon/6142?src=external-gm-sc\" title=\"Firefox Addon Craigslist-car-research\">Car research</a></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"https://addons.mozilla.org/en-US/firefox/addon/12184?src=external-gm-sc\" title=\"Firefox Addon Craigslist-motorcycle-research, for used motorcycle listing on Craigslist.\">Motorcycle reviews</a></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"https://addons.mozilla.org/en-US/firefox/addon/10545?src=external-gm-sc\">Craigslist Car listing filter</a></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"https://addons.mozilla.org/en-US/firefox/addon/12126?src=external-gm-sc\" title=\"on any page select car 'year make model' to research that car. Its stripped down version of craigslist-car-research.\">Car reviews (not specific to craigslist)</a></li>" +
"</ul>" +
"<ul id=\"slmdkMy\" class=\"slmdkMy\" style=\"list-style-type: decimal; display: table;padding: 2px;margin: 1px;\">" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><strong>Google Chrome Extension:</strong></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"http://code.google.com/p/craigslist-car-research/\">Car research</a></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"http://userscripts.org/scripts/show/23587\" title=\"Car listing filter : Greasemonkey script that installs on Google Chrome as it is.\">Craigslist Car listing filter</a></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"http://code.google.com/p/craigslist-phone-search/\">craigslist phone search</a></li>" +
"</ul>" +
"<ul id=\"slmdkMy\" class=\"slmdkMy\" style=\"list-style-type: decimal; display: table;padding: 2px;margin: 1px;\">" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><strong>Greasemonkey userscript:</strong></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"http://userscripts.org/users/20790\">Car research</a></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"http://userscripts.org/scripts/show/23587\" title=\"Car listing filter : Greasemonkey script\">Craigslist Car listing filter</a></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"http://userscripts.org/scripts/show/61800\">craigslist-phone-search</a></li>" +
"</ul>" +
"<ul id=\"slmdkMy\" class=\"slmdkMy\" style=\"list-style-type: decimal; display: table;padding: 2px;margin: 1px;\">" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><strong><a href=\"http://tech4computer.wordpress.com/2009/03/08/craigslist-car-buy-research-firefox-extension/\">tech4computer Blog</a></strong></li>" +
"<li id=\"slmdkMyLi\" style=\"display: inline;padding: 2px 6px;\"><a href=\"http://twitter.com/home?status=follow%20@tech4computer%20Buy%20or%20sell%20car%20on%20Craigslist%20News:+http://tinyurl.com/bg2yh3\">tweet @tech4computer</a></li>" +
"</ul>" +
"</p>";
cbbDiv.innerHTML = cbbInnerHtml;
divElem.appendChild(cbbDiv);
}else{
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckMyUtEnbl("slmdkMyCrUt", 1,'+') +
"<span id=\"slmdkBlckDsblTtl\" class=\"slmdkBlckDsblTtl\">" +
"<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAwZJREFUOE9dU11Ik2EYfS2SxBQLIRW98dYrwaiJPxN0Ttf8mTS3lciWzqlp/rC2qWia+JOlJv4kpJdiBIEXdWF4sWUKmZSWQWIXounK1nJTp87t9L7f9AP7br7vfR7Oec457/P5TX9A8tIKubBmJYE2Owl07JDzrn3if+gm5zxecvblpuzMeT+3m/j7u0lAwAEJDt4noaF7JDJyl8TEOMnTcUiMj6DQmFAsu4MqkQampJtoFuSj7ZocnXsCYRfi49uQnHwf6ekmyGR3odEUw2hUYHhYQhp6IFdTcFYpaoQFaEwpwOPnr2FZt2Lr6Ager8fjhdVqw8TEDDIyepCS0ojs7Bqo1cVoaJATXSPUueWoouAmVQ2GN37BBvp4vV72Ov3YbA7odKMQChuRm1tFv9VEVYtSkRomNnlzywe2b8PVMYyvPLq1dYmq2OXOdrsTUukTiEQmqFSlhE1nnsdf4e0J+OoNzFyOxxxPEB09j5iYaWxsOLna5OQ8kpKamQoi0UIvkKOdeWa9BwNYConD3MU4fOMJIiOXERLyHhUVH7na9vYOBIJ2SCR6Ii6CgU7sZIGxHk1+NigWC8GxWOcJwsPXERS0gKgoCw3HV87J6YNYbCDi2zBQ0EOPB1wnToaZS1fwuXUQ2zzByIgTYWFfEBFh5tPNy+unBEbeAg3wDwM8e4HvK6vY+y9/YG1tH729y1x9Z8flZRYyM+9xISaq0DwxhVnWYwoP3fAMjeEHT9LdvQ6X64iXbzYvIjGxhdqoJvTuy9LUqMsoQu+eCwcM9PM3dqta8YknqKxcwOqqgzu73R7I5QNIS6uDUllGSk4W6Raa6FKN/nXAd1XHak4tFJUOg2GMW2s6HVqthtT3IF9thDZLR1eZkkhL0PfmHeYdTvgW59gzLJZFOnmQA0ultSgs1MJkUhDq9bqhC0pGwvJgdlgmbDfouc+VpxyigXUgIaEFqan13OTCwhLo9Sr090uJeQ7JjIQpYXZYJoyILRi7Ypc4q56lTX+gaigU5Uw2m8zAmJoS/gPYXMQocevTNAAAAABJRU5ErkJggg==\" />" +
" Home of this utility ( <i>feedback</i> )</span>" +
"";
divElem.insertBefore(pElement,divElem.firstChild);
divElem.setAttribute("class", "slmdkDsblMyUtBlock");
}
var mc = slmdkCar.getMainContainer();
if(null != mc){
mc.parentNode.insertBefore(divElem,mc.nextSibling);
}else{
slmdkCar.insertDivNodeAfterFooter(divElem);
}
}


slmdkCar.suggMsgDvStl = function(d)
{
try{
d.setAttribute("class","slmdkMsgsTxDv");
}catch(e){
}
}

slmdkCar.formatMatchUtil = function(txt, rExp)
{
function formatIt(match)
{
return " -- " + match.toUpperCase() + " -- ";
}
return txt.replace(rExp, formatIt);
}

slmdkCar.doStuffWithTextInTextNodes = function() {
var bdr="margin:4px;";
var strCAUTIONcolor = '#ffbfbf';
var strADVICEcolor = '#ffffff';// '#ffcc99';
var strOKcolor = '#ccff99';
var strCAUTIONstyle = "<span style=\"background-color:" + strCAUTIONcolor + "; font-weight: bold; font-family:courier; padding: 3px;"+bdr+"\">";
var strADVICEstyle = "<span style=\"background-color:" + strADVICEcolor + "; font-weight: bold; font-family:courier; padding: 3px;"+bdr+"\">";
var strOKstyle = "<span style=\"background-color:" + strOKcolor + "; font-weight: bold; font-family:courier; padding: 3px;"+bdr+"\">";
var re = /rebuilt/gim;
var re4 = /(no|not|non) [a]?[ ]?rebuilt/gim;
var re2 = /accident/gim;
var re3 = /(no|any|not|never) (in)?[ ]?accidents?/gim;
var re8 = /never (been)?[ ]?in an accident?/gim;
var re10 = /never been in accident?/gim;
var re5 = /(no|any|not) (in)?[ ]?fender bender/gim;
var re6 = /fender bender/gim;
var re7 = /moving/gim;
var re9 = /one owner/gim;
textnodes = document.evaluate(
"//text()",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
var iFlag1 = 0;
var iMsgs = 0;
var arMsg = [];
var chkDup = function(ar,val){
var le = ar.length;
for(var j=0;j<le;j++){
if(ar[j]===val){
return true;
}
}
return false;
};
var dvWrap = document.createElement('div');
dvWrap.setAttribute('id', 'slmdkMsgs');
slmdkCar.slmdkSetBlckClsNm(dvWrap, 'slmdkMsgs');
var dvLgo = document.createElement('div');
dvLgo.setAttribute('id', 'slmdkMsgsLgo');
dvLgo.setAttribute('class', 'slmdkMsgsLgo');
dvLgo.innerHTML = "" +
"<a href=\"http://tech4computer.wordpress.com/2009/03/08/craigslist-car-buy-research-firefox-extension/\"" +
" title=\"car-research author's blog\"" +
" onClick=\"slmdkGglT({'a':'logo - tech4computer wp blog',v:1});\">" +
"<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAwZJREFUOE9dU11Ik2EYfS2SxBQLIRW98dYrwaiJPxN0Ttf8mTS3lciWzqlp/rC2qWia+JOlJv4kpJdiBIEXdWF4sWUKmZSWQWIXounK1nJTp87t9L7f9AP7br7vfR7Oec457/P5TX9A8tIKubBmJYE2Owl07JDzrn3if+gm5zxecvblpuzMeT+3m/j7u0lAwAEJDt4noaF7JDJyl8TEOMnTcUiMj6DQmFAsu4MqkQampJtoFuSj7ZocnXsCYRfi49uQnHwf6ekmyGR3odEUw2hUYHhYQhp6IFdTcFYpaoQFaEwpwOPnr2FZt2Lr6Ager8fjhdVqw8TEDDIyepCS0ojs7Bqo1cVoaJATXSPUueWoouAmVQ2GN37BBvp4vV72Ov3YbA7odKMQChuRm1tFv9VEVYtSkRomNnlzywe2b8PVMYyvPLq1dYmq2OXOdrsTUukTiEQmqFSlhE1nnsdf4e0J+OoNzFyOxxxPEB09j5iYaWxsOLna5OQ8kpKamQoi0UIvkKOdeWa9BwNYConD3MU4fOMJIiOXERLyHhUVH7na9vYOBIJ2SCR6Ii6CgU7sZIGxHk1+NigWC8GxWOcJwsPXERS0gKgoCw3HV87J6YNYbCDi2zBQ0EOPB1wnToaZS1fwuXUQ2zzByIgTYWFfEBFh5tPNy+unBEbeAg3wDwM8e4HvK6vY+y9/YG1tH729y1x9Z8flZRYyM+9xISaq0DwxhVnWYwoP3fAMjeEHT9LdvQ6X64iXbzYvIjGxhdqoJvTuy9LUqMsoQu+eCwcM9PM3dqta8YknqKxcwOqqgzu73R7I5QNIS6uDUllGSk4W6Raa6FKN/nXAd1XHak4tFJUOg2GMW2s6HVqthtT3IF9thDZLR1eZkkhL0PfmHeYdTvgW59gzLJZFOnmQA0ultSgs1MJkUhDq9bqhC0pGwvJgdlgmbDfouc+VpxyigXUgIaEFqan13OTCwhLo9Sr090uJeQ7JjIQpYXZYJoyILRi7Ypc4q56lTX+gaigU5Uw2m8zAmJoS/gPYXMQocevTNAAAAABJRU5ErkJggg==\" />" +
"</a>";
dvWrap.appendChild(dvLgo);
for (var i = 0; i < textnodes.snapshotLength; i++) {
txtNode = textnodes.snapshotItem(i);
s = txtNode.data;
if (s.match(re4, "mg")) {
s = slmdkCar.formatMatchUtil(s, re4);
if(!chkDup(arMsg,5)){
var divRebuilt = document.createElement('div');
slmdkCar.suggMsgDvStl(divRebuilt);
divRebuilt.innerHTML = strOKstyle + " Not rebuilt </span>";
dvWrap.appendChild(divRebuilt);
iMsg = 1;
arMsg.push(5);
}
}else{
if (s.match(re, "mg")) {
if(!chkDup(arMsg,4)){
var divRebuilt = document.createElement('div');
slmdkCar.suggMsgDvStl(divRebuilt);
divRebuilt.innerHTML = strCAUTIONstyle + " <i>Probably</i> rebuilt vehicle, read details carefully. </span>";
dvWrap.appendChild(divRebuilt);
iMsg = 1;
arMsg.push(4);
}
}
}
s = slmdkCar.formatMatchUtil(s, re);
if (s.match(re8, "mg")) {
s = slmdkCar.formatMatchUtil(s, re8);
if(!chkDup(arMsg,2)){
var divAccident = document.createElement('div');
slmdkCar.suggMsgDvStl(divAccident);
divAccident.innerHTML = strOKstyle + " No accident </span>";
dvWrap.appendChild(divAccident);
iMsg = 1;
iFlag1 = 1;
arMsg.push(2);
}
}else if (s.match(re10, "mg")) {
s = slmdkCar.formatMatchUtil(s, re10);
if(!chkDup(arMsg,2)){
var divAccident = document.createElement('div');
slmdkCar.suggMsgDvStl(divAccident);
divAccident.innerHTML = strOKstyle + " No accident </span>";
dvWrap.appendChild(divAccident);
iMsg = 1;
iFlag1 = 1;
arMsg.push(2);
}
}else if (s.match(re3, "mg")) {
s = slmdkCar.formatMatchUtil(s, re3);
if(!chkDup(arMsg,2)){
var divAccident = document.createElement('div');
slmdkCar.suggMsgDvStl(divAccident);
divAccident.innerHTML = strOKstyle + " No accident </span>";
dvWrap.appendChild(divAccident);
iMsg = 1;
iFlag1 = 1;
arMsg.push(2);
}
}else{
s = slmdkCar.formatMatchUtil(s, re2);
if (s.match(re2, "mg")) {
if(!chkDup(arMsg,3)){
var divAccident = document.createElement('div');
slmdkCar.suggMsgDvStl(divAccident);
divAccident.innerHTML = strCAUTIONstyle + " <i>Possibly</i> accident vehicle. Read details carefully. Do haggle. </span>";
dvWrap.appendChild(divAccident);
iMsg = 1;
iFlag1 = 1;
arMsg.push(3);
}
} else {
}
}
if (s.match(re5, "mg")) {
s = slmdkCar.formatMatchUtil(s, re5);
if(!chkDup(arMsg,6)){
var dvRblt = document.createElement('div');
slmdkCar.suggMsgDvStl(dvRblt);
dvRblt.innerHTML = strOKstyle + " No fender bender </span>";
dvWrap.appendChild(dvRblt);
iMsg = 1;
arMsg.push(6);
}
}else{
s = slmdkCar.formatMatchUtil(s, re6);
if (s.match(re6, "mg")) {
if(!chkDup(arMsg,7)){
var dvRblt = document.createElement('div');
slmdkCar.suggMsgDvStl(dvRblt);
dvRblt.innerHTML = strCAUTIONstyle + " Vehicle involved in fender bender </span>";
dvWrap.appendChild(dvRblt);
iMsg = 1;
arMsg.push(7);
}
}
}
if (s.match(re7, "mg")) {
s = slmdkCar.formatMatchUtil(s,re7);
if(!chkDup(arMsg,1)){
var dvMv = document.createElement('div');
slmdkCar.suggMsgDvStl(dvMv);
dvMv.innerHTML = strOKstyle + " Moving sale </span>";
dvWrap.appendChild(dvMv);
iMsg = 1;
arMsg.push(1);
}
}
if (s.match(re9, "mg")) {
s = slmdkCar.formatMatchUtil(s, re9);
if(!chkDup(arMsg,8)){
var dv1 = document.createElement('div');
slmdkCar.suggMsgDvStl(dv1);
dv1.innerHTML = strOKstyle + " One Owner </span>";
dvWrap.appendChild(dv1);
iMsg = 1;
arMsg.push(8);
}
}
txtNode.data = s;
}
if ( iFlag1 < 1){
var divAccidentAsk = document.createElement('div');
slmdkCar.suggMsgDvStl(divAccidentAsk);
divAccidentAsk.innerHTML = strADVICEstyle + " Ask seller : if vehicle was involved in any Accident </span>";
dvWrap.appendChild(divAccidentAsk);
iMsg = 1;
}
var ph=slmdkCar.fndPh();
if(ph.indexOf("none")!=0){
var dvPh = document.createElement('div');
slmdkCar.suggMsgDvStl(dvPh);
var ur = "<a href="+encodeURI("http://www.google.ca/search?q="+slamdunkStrgUtls.trim(ph)+" site:"+slamdunkCkieUtls.getSuperDomain()+" OR site:craigslist.org")+">"+ph+"</a>";
dvPh.innerHTML = strADVICEstyle + " Search craigslist for ph : "+ur+" </span>";
dvWrap.appendChild(dvPh);
iMsg = 1;
}
if(iMsg>0){
document.body.insertBefore(dvWrap,document.body.firstChild);
}
}


slmdkCar.gglSrchCL = function() {
if(slmdkCarGV.isMkMdlYrSet()){
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkYSCL","disable similar ad listing","enable similar ad listing","slmdkYSCL")){
var sMk=slmdkCarGV.mkAll;
if(sMk.indexOf("none")!=0 && sMk!=null){
sMk=(sMk.split(";")).join(" OR ");
}else{
sMk=slmdkCarGV.mk;
}
var sMdl=slmdkCarGV.mdlAll;
if(sMdl.indexOf("none")!=0 && sMdl!=null){
sMdl=(sMdl.split(";")).join(" OR ");
}else{
sMdl=slmdkCarGV.mdl;
}
var gglUrl = "http://www.google.ca/search?num=20&hl=en&q="+(slmdkCarGV.yr-1)+"%20OR%20"+slmdkCarGV.yr+"%20OR%20"+(1+Number(slmdkCarGV.yr))+"%20"+escape(sMk)+"%20"+escape(sMdl)+"%20site:"+slamdunkCkieUtls.getSuperDomain()+"%20OR%20site%3Acraigslist.org&btnG=Search";
slmdkCar.ldAjx(slmdkCar.rplcSpcUndScr(gglUrl), 7);
} else {
slmdkCar.slmdkDsbldBlckDiv("slmdkYSCL","slmdkYCL","Similar ads elsewhere on Craigslist ",2);
}
}
}

slmdkCar.yhooSrchCL = function() {
if(slmdkCarGV.isMkMdlYrSet()){
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkYSCL","disable similar ad listing","enable similar ad listing","slmdkYSCL")){
var sMk=slmdkCarGV.mkAll;
if(sMk.indexOf("none")!=0 && sMk!=null){
sMk=(sMk.split(";")).join(" OR ");
}else{
sMk=slmdkCarGV.mk;
}
var sMdl=slmdkCarGV.mdlAll;
if(sMdl.indexOf("none")!=0 && sMdl!=null){
sMdl=(sMdl.split(";")).join(" OR ");
}else{
sMdl=slmdkCarGV.mdl;
}
var gglUrl = "http://search.yahooapis.com/WebSearchService/V1/webSearch?appid=YahooDemo&output=xml&callback=slmdkCar.handleYSrchCL&type=all&results=30&site="+slamdunkCkieUtls.getSuperDomain()+"&site=craigslist.org&query="+(slmdkCarGV.yr-1)+"%20OR%20"+slmdkCarGV.yr+"%20OR%20"+(slmdkCarGV.yr+1)+"%20"+sMk+"%20"+sMdl;
slmdkCar.ldAjx(gglUrl, 8);
} else {
slmdkCar.slmdkDsbldBlckDiv("slmdkYSCL","slmdkYCL","Similar ads elsewhere on Craigslist ",2);
}
}
}
slmdkCar.yhooSrchJsonCL = function() {
var gglUrl = "http://search.yahooapis.com/WebSearchService/V1/webSearch?appid=YahooDemo&output=json&callback=slmdkCar.handleYSrchJsonCL&results=10&query=2003%20honda%20civic%20site:craigslist.org";
slmdkCar.ldAjx(slmdkCar.rplcSpcUndScr(gglUrl), 9);
}

slmdkCar.tblCLList = function() {
try{
var c = document.createElement("table");
c.setAttribute("id","slmdktbl");
c.setAttribute("class","slmdktbl");
var b=document.createElement("tbody");
var r1=document.createElement("tr");
var th1=document.createElement("th");
var th2=document.createElement("th");
th1.setAttribute("id","slmdkth1");
th1.setAttribute("class","slmdkth1");
th2.setAttribute("id","slmdkth2");
th2.setAttribute("class","slmdkth2");
var td1=document.createElement("td");
var td2=document.createElement("td");
td1.setAttribute("id","slmdktd1");
td1.setAttribute("class","slmdktd1");
td2.setAttribute("id","slmdktd2");
td2.setAttribute("class","slmdktd2");
r1.appendChild(td1);
r1.appendChild(td2);
b.appendChild(r1);
c.appendChild(th1);
c.appendChild(th2);
c.appendChild(b);
var li = document.createElement('LI');
li.setAttribute("style","display: table-row;");
li.appendChild(c);
if (null != td2){

var srtFlg = 0;
var arCL = new Array(slmdkCarGCL.count_cl);
if(slmdkCarGCL.count_cl>0){
var sp = slmdkCarGCL.prcStrArr[1];
if(sp.indexOf("$"==0)){
srtFlg=1;
for(var iAr=0;iAr<slmdkCarGCL.count_cl;iAr++){
arCL[iAr] = [slmdkCarGCL.prcStrArr[iAr+1],slmdkCarGCL.url[iAr+1],slmdkCarGCL.ttl[iAr+1]];
}
var tmp1;
var tmp2;
arCL.sort(function(aa,bb){
tmp1 = Number(aa[0].substring(1));
tmp2 = Number(bb[0].substring(1));
return ((tmp1 < tmp2) ? -1 : ((tmp1 > tmp2) ? 1 : 0));
});
}
}

for(var i=0;i<slmdkCarGCL.count_cl;i++){
var a = document.createElement('a');
a.setAttribute("onClick","javascript:slmdkSetCookie('slmdnkGVFlg', '1', 20);" +
"return true;"); // true: perform default action after js
a.setAttribute("class","slmdkCLLstA");
if(srtFlg<1){
a.setAttribute("href",slmdkCarGCL.url[i+1]);
a.innerHTML = slmdkCarGCL.ttl[i+1];
var pr = document.createTextNode(slmdkCarGCL.prcStrArr[i+1]);
}else{
a.setAttribute("href",arCL[i][1]);
a.innerHTML = arCL[i][2];
var pr = document.createTextNode(arCL[i][0]);
}
var nr = c.insertRow(i+1);
var c1 = nr.insertCell(0);
var c2 = nr.insertCell(1);
c1.appendChild(a);
c2.appendChild(pr);
}
if(slmdkCarGCL.count_cl>0){
var mc = document.getElementById("slmdkYP");
if(null != mc){
var cont = document.createElement("div");
slmdkCar.slmdkSetBlckClsNm(cont,"slmdkYCL");
var sCont = document.createElement("div");
sCont.innerHTML= "" +
slmdkCar.slmdkBlckDsbl('slmdkYSCL', '0','X',"Similar ads elsewhere on Craigslist") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Similar ads elsewhere on Craigslist </span>" +
"";
cont.appendChild(sCont);
cont.appendChild(li);
mc.appendChild(cont);
}else{
var t=document.getElementById("slmdkGULContCar");
if(t!=null){
t.appendChild(li);
}else{
document.body.insertBefore(li, document.body.firstChild);
}
}
} else {
var mc = document.getElementById("slmdkYP");
if(null != mc){
var cont = document.createElement("div");
slmdkCar.slmdkSetBlckClsNm(cont,"slmdkYCL");
var sCont = document.createElement("div");
sCont.innerHTML= "" +
slmdkCar.slmdkBlckDsbl('slmdkYSCL', '0','X',"Similar ads elsewhere on Craigslist") +
"<span id=\"slmdkBlckTtl\" class=\"slmdkBlckTtl\">Similar ads elsewhere on Craigslist </span>" +
"";
cont.appendChild(sCont);
cont.appendChild(li);
mc.appendChild(cont);
}
}
}
}catch(e){
}
}

slmdkCar.mtrTrendPrc = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkMT","disable motortrend price","enable motortrend price","slmdkMT","0")){
slmdkCar.ldAjx(slmdkCar.rplcSpcUndScr("http://www.motortrend.com/cars/"+slmdkCarGV.yr+"/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/pricing/index.html"),
11);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkMT","slmdkMTrd","MotorTrend",2);
}
}catch(e){
}
}

slmdkCar.automotive = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkAtmo","disable automotive","enable automotive","slmdkAtmo","0")){
var automotiveURL = slmdkCar.rplcSpcUndScr("http:\/\/www.automotive.com\/" + slmdkCarGV.yr + "\/12\/" + slmdkCarGV.mk + "\/" + slmdkCarGV.mdl + "\/pricing\/index.html");
var tmp1 = new slmdkCar.ldAjx ( automotiveURL, 3);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkAtmo","slmdkAtmoPrc","Automotive",2);
}
}catch(e){
}
}

slmdkCar.automotiveRcll = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkAtmoRcll","disable automotive recall","enable automotive recall","slmdkAtmoRcll")){
var automotiveRecallURL = slmdkCar.rplcSpcUndScr("http:\/\/www.automotive.com\/" + slmdkCarGV.yr + "\/12\/" + slmdkCarGV.mk + "\/" + slmdkCarGV.mdl + "\/recalls\/index.html");
var tmp2 = new slmdkCar.ldAjx ( automotiveRecallURL, 4);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkAtmoRcll","slmdkAtmoRcll","Factory Recalls",4);
}
}catch(e){
}
}

slmdkCar.edmnds = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkEdmds","disable edmonds review","enable edmonds review","slmdkEdmds")){
slmdkCar.ldAjx(slmdkCar.rplcSpcUndScr("http://www.edmunds.com/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/"+slmdkCarGV.yr+"/consumerreview.html?").toLowerCase(),
15);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkEdmds","slmdkEdmdRev","Consumer Reviews at Edmunds",3);
}
}catch(e){
}
}

slmdkCar.edmndsDsc = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkEdmdsD","disable edmonds discussion","enable edmonds discussion","slmdkEdmdsD")){
slmdkCar.ldAjx(slmdkCar.rplcSpcUndScr("http://www.edmunds.com/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/"+slmdkCarGV.yr+"/discussion.html").toLowerCase(),
16);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkEdmdsD","slmdkEdmdRev","Discussions at Edmunds",3);
}
}catch(e){
}
}

slmdkCar.edmndsTMV = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkEdmdsTMV","disable edmonds price","enable edmonds price","slmdkEdmdsTMV")){
slmdkCar.ldAjx(slmdkCar.rplcSpcUndScr("http://www.edmunds.com/"+slmdkCarGV.mk+"/"+slmdkCarGV.mdl+"/"+slmdkCarGV.yr+"/index.html").toLowerCase(),
17);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkEdmdsTMV","slmdkEdmdTMV","Edmunds TMV",2);
}
}catch(e){
}
}

slmdkCar.epnn = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkEpnn","disable epinion reviews","enable epinion reviews","slmdkEpnn")){
var mk;
mk = slmdkCar.rplcdashWPls(slmdkCarGV.mk);
var m;
var r = /[0-9]/g;
var arMdl = slmdkCar.rplcDsh2Und(slmdkCarGV.mdl).split("_");
for(var k=0;k<arMdl.length;k++){
var mdlE = arMdl[k];
if(mdlE.search(r)!=-1){
if(!m){
m = mdlE.toUpperCase();
}else{
m = m+"_"+slmdkCar.rplcDsh2Und(mdlE).toUpperCase();
}
}else{
if(mdlE.length>3){
if(!m){
m =mdlE.charAt(0).toUpperCase()+mdlE.substr(1,mdlE.length);
}else{
m =m+"_"+mdlE.charAt(0).toUpperCase()+mdlE.substr(1,mdlE.length);
}
}else{
if(!m){
m = mdlE.toUpperCase();
}else{
m = m+"_"+ mdlE.toUpperCase();
}

}
}
}
var u = slmdkCar.rplcSpcUndScr("http://www.epinions.com/reviews/auto_Make-"+slmdkCarGV.yr+"_"+slmdkCar.rplcDsh2Und(slmdkCarGV.mk)+"_"+m);
slmdkCar.ldAjx(u,
19);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkEpnn","slmdkEpnn","Epinion",3);
}
}catch(e){
}
}

slmdkCar.rc = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkRc","disable review center","enable review center","slmdkRc","0")){
var m;
m = slmdkCar.rplcUnd220(slmdkCarGV.mdl);
var u = "http://www.reviewcentre.com/search.html?searchstring="+slmdkCarGV.yr+"%20"+escape(slmdkCarGV.mk)+"%20"+m;
slmdkCar.ldAjx(u,
20);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkRc","slmdkRc","Review Centre",3);
}
}catch(e){
}
}

slmdkCar.aaTsb = function() {
try{
if(slmdkEnblBtnCar.enblDblBtnFact("slmdkTsb","disable AboutAutomobile","enable AboutAutomobile","slmdkTsb","0")){
var u = "http://www.aboutautomobile.com/TSB/"+slmdkCarGV.yr+"/"+slmdkCar.capitalizeMk()+"/"+slmdkCar.capitalizeMdl();
slmdkCar.ldAjx(u,
22);
}else{
slmdkCar.slmdkDsbldBlckDiv("slmdkTsb","slmdkTsb","AboutAutomobile TSB",4);
}
}catch(e){
}
}

slmdkCar.fndPh = function() {
try{
var bd=document.getElementById("userbody");
if(bd!=null){
var tx=bd.textContent;
var pRE = /(\(\d{3}\) \d{3}-\d{4})|(\(\d{3}\)\d{3}-\d{4})|(\d{3}-\d{3}-\d{4})|(\d{3} \d{3} \d{4})|(\d{3}\d{3}\d{4})/;
var ar=tx.match(pRE);
if(ar!=null){
return ar[0];
}else{
return "none";
}
}else{
return "none";
}
}catch(e){
return "none";
}
}

slmdkCar.capitalizeMk = function() {
try{
var m;
var r = /[0-9]/g;
var arMdl = slmdkCarGV.mk.split("-");
for(var k=0;k<arMdl.length;k++){
var mdlE = arMdl[k];
if(mdlE.length>2){
if(!m){
m =mdlE.charAt(0).toUpperCase()+mdlE.substr(1,mdlE.length).toLowerCase();
}else{
m =m+"+"+mdlE.charAt(0).toUpperCase()+mdlE.substr(1,mdlE.length).toLowerCase();
}
}else{
if(!m){
m = mdlE.toUpperCase();
}else{
m = m+"+"+ mdlE.toUpperCase();
}

}
}
return m;
}catch(e){
return str;
}
}

slmdkCar.capitalizeMdl = function() {
try{
var m;
var r = /[0-9]/g;
var arMdl = slmdkCarGV.mdl.split("_");
for(var k=0;k<arMdl.length;k++){
var mdlE = arMdl[k];
if(mdlE.search(r)!=-1){
if(!m){
m = mdlE.toUpperCase();
}else{
m = m+"+"+slmdkCar.rplcDsh2Und(mdlE).toUpperCase();
}
}else{
if(mdlE.length>2){
if(!m){
m =mdlE.charAt(0).toUpperCase()+mdlE.substr(1,mdlE.length).toLowerCase();
}else{
m =m+"+"+mdlE.charAt(0).toUpperCase()+mdlE.substr(1,mdlE.length).toLowerCase();
}
}else{
if(!m){
m = mdlE.toUpperCase();
}else{
m = m+"+"+ mdlE.toUpperCase();
}

}
}
}
return m;
}catch(e){
return str;
}
}


slmdkCar.rplcUnd220 = function(str) {
try{
return str.replace(/_/g,"%20");
}catch(e){
return str;
}
}

slmdkCar.rplcSpcUndScr = function(str) {
try{
return str.replace(/\s/g,"_");
}catch(e){
return str;
}
}

slmdkCar.rplcDsh2Und = function(str) {
try{
return str.replace(/-/g,"_");
}catch(e){
return str;
}
}

slmdkCar.chkVer = function() {
try{
var r = Math.floor(11*Math.random());
var U=5;
if(r == U){
var a = new slmdkCar.ldAjx("http://sites.google.com/site/tech4computer/version/craigslist-car-research-v",14);
}
}catch(e){
}
}

slmdkCar.rplcUndScrWPls = function(str) {
try{
return str.replace(/_/g,"+");
}catch(e){
return str;
}
}

slmdkCar.slmdkCSS = function(){
try{
var s=" ";
s = "" +
"div.slmdkTCont{margin: 1px; margin-left: 0px;} " +
"div.slmdkULContCar{list-style-type:none;margin: 0;padding:0;}" +
"li.liEnblDblCont{display: table-row;}" +
"div.divCookieSettingsContainerG{" +
"margin: 10px; " +
"padding: 5px; " +
"border: thin #FFCC66 dashed;" +
"background-color: #FFFFCC;}" +
"div.slmdkOnOff {" +
"margin:  0 auto 0 auto;" +
"border: 0px;" +
"font-family: helvetica,arial,sans-serif;" +
"font-size: 100%;" +
"}" +
".slmdkOnOff a:link," +
".slmdkOnOff a:visited," +
".slmdkOnOff a:hover {" +
"color: forestgreen;" +
"}" +
".slmdkOnOff div.slmdkOnOffSp1 {" +
"float: left;" +
"width: 40px" +
"padding: 3px;" +
"background-color: #fff;" +
" color: #0c479d;" +
"}" +
".slmdkOnOff div.slmdkOnOffSp2 {" +
"float: left;" +
"padding: 3px;" +
"background-color: #fc6;" +
"}" +
"ul.slmdkOnOffUl {" +
"list-style-type: decimal;" +
" display: table;" +
"padding: 2px;" +
"margin: 1px;" +
"}" +
"li.slmdkOnOffLi {" +
"display: inline;" +
"padding: 2px 6px;" +
"}" +
"div.slmdkMsgs {" +
"margin: 2px;" +
"background-color: #ffffff;" +
"padding: 15px; " +
"border: 1px solid #eef1f3;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkMsgsLgo {" +
"float:right;" +
"margin-left: 10px;" +
"}" +
"div.slmdkMsgsTxDv {" +
"margin-top:4px;" +
"margin-bottom:4px;" +
"}" +
"div.slmdkMyCrUt {" +
"font-size: small; " +
"margin: 0 auto 0 auto;" +
"padding: 5px; " +
"border: thin silver solid;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #f7fafc;" +
"}" +
"div.slmdkDsblMyUtBlock {" +
"font-size: small; " +
"margin: 0 auto 0 auto;" +
"padding: 5px; " +
"border: thin #6666CC dashed;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #f7fafc;" +
"}" +
"div.slmdkMainContainer{" +
"margin: 0 auto 0 auto; " +
"padding-left: 32px; " +
"padding-right: 32px; " +
"border: 1px #FFCC66 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: silver;" +
"background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAADJJREFUGFdj+PfvX9D///9ZYDQDEIDYIBrMAEmis5ElQ2G64aqhusASYJU4jcJmPkgMAOyMVdj8STiZAAAAAElFTkSuQmCC'); " +
"}" +
"div.slmdkPriceContainer, div.slmdkReviewContainer, div.slmdkReliabilityContainer{" +
"font-family: verdana, sans-serif, arial, serif;" +
"margin: 30px auto; " +
"padding: 15px; " +
"max-width:900px;" +
"min-width:100px;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #FFFFFF;" +
"}" +
"div.slmdkYP{" +
"border:0px;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"table.slmdktbl {" +
"padding: 5px;" +
"}" +
"h2.slmdkH2{" +
"font-family: Georgia, \"Times New Roman\", Times, serif;" +
"font-size: x-large; " +
"font-weight: bold; " +
"color: #0066a4; " +
"text-indent: 15px;" +
"}" +
"a.slmdkH2{" +
"text-decoration: none;" +
"display:block;" +
"color:#0066a4;" +
"}" +
"div.slmdkt{" +
"margin: 2px;" +
"background-color: thistle;" + //
"padding: 2px; " +
"border: thin #6666CC dashed;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
".slmdkBlckGrdt {" +
"background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAFhJREFUGFdlyEELQEAQhuF3lZJyU5RSXJSf5SCRzcG/187YUU57mG/eHicbk8t5NFAgBAz0ZJSd2Rr19HLR6cFgnYJ4Gl2o5Ka1JgFdKVVx349HnDpC9sMLcXsxvKyEzskAAAAASUVORK5CYII='); " +
"background-repeat: repeat-x;" +
"position:relative;" + // test
"}" +
"div.slmdkEdmdRev{" +
"font-size: small; " +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkEdmdTMV{" +
"font-size: small; " +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: cornsilk;" +
"}" +
"div.slmdkSur{" +
"font-size: small; " +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkEpnn{" +
"font-size: small; " +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"a.slmdkEpnnH2 {" +
"color : MediumSeaGreen;" +
"}" +
"div.slmdkRc{" +
"font-size: small; " +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkTsb{" +
"font-size: small; " +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkMTrd{" +
"font-size: small; " +
"line-height:130%;" +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #FDEEF4;" +
"}" +
"div.slmdkAtmoRcll {" +
"font-size: small;" +
"line-height:130%;" +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #66CC99 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #ccffcc;" +
"}" +
"div.slmdkAtmoPrc {" +
"font-size: small; " +
"line-height:130%;" +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #FDEEF4;" +
"}" +
"div.slmdkYCL {" +
"font-size: small; " +
"line-height:130%;" +
"margin: 15px 10px;" +
"padding: 8px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: #FFFFC0;" +
"}" +
"div.slmdkCLLst {" +
"font-size: normal; " +
"}" +
"a.slmdkCLLstA:visited {" +
"text-decoration: underline; " +
"color : blue;" +
"}" +
"div.slmdkGVdo {" +
"font-size: small; " +
"margin: 15px 10px;" +
"background-color: powderblue;" +
"padding: 5px; " +
"border: thin #6666CC dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkMsn {" +
"font-size: small; " +
"margin: 15px 10px;" +
"background-color: #ccffcc;" +
"padding: 5px; " +
"border: thin #6666CC dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkPrcXtra {" +
"font-size: small; " +
"margin: 15px 10px;" +
"background-color: whiteSmoke;" +
"padding: 12px; " +
"border: thin #6666CC dotted;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"}" +
"div.slmdkDsblBlock{" +
"position:relative;" + // test
"font-size: small; " +
"margin: 2px 10px;" +
"padding: 3px;" +
"padding-left: 10px;" +
"border: thin #FF9999 dashed;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"background-color: beige;" +
"}" +
"div.slmdkBlckHd{" +
"position:absolute;" +
"right: 10px;" +
"width: 20px;" +
" margin: 0 0 10px 10px;" +
"padding: 2px;" +
"border: 1px dotted silver;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"font-family: arial,helvetica,clean,sans-serif;" +
"font-size: 13px;" +
"text-align: center;" +
"}" +
"a.slmdkBlckHd { " +
"text-decoration: none;" +
"display:block;" +
"}" +
"div.slmdkBlckMyUtHd{" +
"position:absolute;" +
"right: 14px;" +
"width: 20px;" +
" margin: 0 0 10px 10px;" +
"padding: 2px;" +
"border: 1px dotted silver;" +
"-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;" +
"font-family: arial,helvetica,clean,sans-serif;" +
"font-size: 13px;" +
"text-align: center;" +
"}" +
"span.slmdkBlckTtl {" +
"font-family:georgia; font-weight:bolder; font-size:125%;" +
"}" +
"span.slmdkBlckDsblTtl {" +
"font-family:georgia; font-weight:bolder; font-size:125%;color:gray;" +
"}" +
"";
slmdkCar.addGlobalStyle(s);
}catch(e){
return"";
}
}


slmdkCar.rplcdashWPls = function(str) {
try{
return str.replace(/-/g,"+");
}catch(e){
return str;
}
}


slmdkCar.slmdkBlckEnbl = function(ck, val, sgn,ttl){
try{
return "<div id=\"slmdkBlckHd\" class=\"slmdkBlckHd\">" +
"<a id=\"slmdkBlckHd\" class=\"slmdkBlckHd\" href=\""+document.URL+"\" onClick=\"slmdkSetCookie('"+ck+"', '1', 20);slmdkGglT({'a':'"+ttl+"',v:1}); window.location.reload(); return false;\"" +
" title=\"Open this feature\">+</a></div>";
}catch(e){
return"";
}
}

slmdkCar.slmdkBlckDsbl = function(ck, val, sgn,ttl){
try{
return "<div id=\"slmdkBlckHd\" class=\"slmdkBlckHd\">" +
"<a id=\"slmdkBlckHd\" class=\"slmdkBlckHd\" href=\""+document.URL+"\" onClick=\"slmdkSetCookie('"+ck+"', '0', 20);slmdkGglT({'a':'"+ttl+"',v:0}); window.location.reload(); return false;\"" +
" title=\"Close\">x</a></div>";
}catch(e){
return"";
}
}

slmdkCar.slmdkDsbldBlckDiv = function(ck, cls, ttl, blckNum){
try{
var divElem = document.createElement("DIV");
var pElement = document.createElement("DIV");
pElement.innerHTML = "" +
slmdkCar.slmdkBlckEnbl(ck, 1,'+',ttl) +
"<span id=\"slmdkBlckDsblTtl\" class=\"slmdkBlckDsblTtl\">"+ttl+" </span>";
divElem.insertBefore(pElement,divElem.firstChild);
divElem.setAttribute("class", "slmdkDsblBlock");
slmdkCar.insertDivNodeBeforeFooterWithWrapper(divElem, blckNum);
}catch(e){
}
}
slmdkCar.slmdkBlckMyUtEnbl = function(ck, val, sgn){
try{
return "<div id=\"slmdkBlckMyUtHd\" class=\"slmdkBlckMyUtHd\">" +
"<a id=\"slmdkBlckHd\" class=\"slmdkBlckHd\" href=\""+document.URL+"\" onClick=\"slmdkSetCookie('"+ck+"', '1', 20);slmdkGglT({'a':'Home of this utility',v:1}); window.location.reload(); return false;\"" +
" title=\"Open this feature\">+</a></div>";
}catch(e){
return"";
}
}

slmdkCar.slmdkBlckMyUtDsbl = function(ck, val, sgn){
try{
return "<div id=\"slmdkBlckMyUtHd\" class=\"slmdkBlckMyUtHd\">" +
"<a id=\"slmdkBlckHd\" class=\"slmdkBlckHd\" href=\""+document.URL+"\" onClick=\"slmdkSetCookie('"+ck+"', '0', 20);slmdkGglT({'a':'Home of this utility',v:0}); window.location.reload(); return false;\"" +
" title=\"Close\">x</a></div>";
}catch(e){
return"";
}
}

slmdkCar.slmdkSetBlckClsNm = function(dv, cls1){
try{
if(null != dv){
dv.setAttribute("class",cls1+" slmdkBlckGrdt");
}
}catch(e){
}
}

slmdkCar.slmdkSetContHdClckBl = function(ttl, dv){
try{
var s ="";
h2 = document.createElement("h2");
h2.setAttribute("id", "slmdkH2");
h2.setAttribute("class", "slmdkH2");
if(ttl.indexOf("Price") != -1){
var arCat = ["slmdkPrcXtra", "slmdkAtmo", "slmdkYSCL", "slmdkMT", "slmdkEdmdsTMV"];
var en = slmdkCar.slmdkGtCatTglStt(arCat);
s = "<a id=\"slmdkH2\" class=\"slmdkH2\" href=\""+document.URL+"\" onclick=\"" +
"(function(){";
for (var i=0;i<arCat.length;i++){
s = s +
"slmdkSetCookie('"+arCat[i]+"', '"+en+"', 20);" +
"";
}
s = s +
"slmdkGglT({'a':'price',v:"+en+"});" +
"})();" +
" window.location.reload(); return false;" +
"\"" +
" title=\"Toggle Price blocks\">Price</a>";
}else if(ttl.indexOf("Reviews") != -1){
var arCat = ["slmdkSur", "slmdkEdmds", "slmdkEdmdsD", "slmdkGVdo", "slmdkEpnn", "slmdkRc"];
var en = slmdkCar.slmdkGtCatTglStt(arCat);
s = "<a id=\"slmdkH2\" class=\"slmdkH2\" href=\""+document.URL+"\" onclick=\"" +
"(function(){";
for (var i=0;i<arCat.length;i++){
s = s +
"slmdkSetCookie('"+arCat[i]+"', '"+en+"', 20);" +
"";
}
s = s +
"slmdkGglT({'a':'reviews',v:"+en+"});" +
"})();" +
" window.location.reload(); return false;" +
"\"" +
" title=\"Toggle Reviews blocks\">Reviews</a>";
}else if(ttl.indexOf("Reliability") != -1){
var arCat = ["slmdkMsn", "slmdkAtmoRcll", "slmdkTsb"];
var en = slmdkCar.slmdkGtCatTglStt(arCat);
s = "<a id=\"slmdkH2\" class=\"slmdkH2\" href=\""+document.URL+"\" onclick=\"" +
"(function(){";
for (var i=0;i<arCat.length;i++){
s = s +
"slmdkSetCookie('"+arCat[i]+"', '"+en+"', 20);" +
"";
}
s = s +
"slmdkGglT({'a':'reliability',v:"+en+"});" +
"})();" +
" window.location.reload(); return false;" +
"\"" +
" title=\"Toggle Reliability blocks\">Reliability</a>";
} else {
}
h2.innerHTML = s;
dv.appendChild(h2);
}catch(e){
}
}
slmdkCar.slmdkGtCatTglStt = function(arCki){
try{
if(arCki.length>0){
for (var i=0;i<arCki.length;i++){
if(Number(slamdunkCkieUtls.getCookie(arCki[i]))>0){
return 0;
break;
}
}
return 1;
}
return 1;
}catch(e){
return 1;
}
}

if(!slmdkEnblBtnCar) var slmdkEnblBtnCar = {
enblDblCont : function() {
try{
var d = document.createElement('DIV');
d.setAttribute("id", "slmdkTCont");
d.setAttribute("class", "slmdkTCont");
var u = document.createElement('UL');
u.setAttribute("id", "slmdkULContCar");
u.setAttribute("class", "slmdkULContCar");
d.appendChild(u);
var li = document.createElement('LI');
li.setAttribute("class","liEnblDblCont");
li.appendChild(d);
var t=document.getElementById("slmdkGULContCar");
if(t!=null){
t.appendChild(li);
}else{
document.body.insertBefore(li, document.body.firstChild);
}
}catch(e){
}
},
enblDblBtnFact : function(cki,dblTxt,enblTxt,id,ckVal) {
try{
var usrInputStr;
usrInputStr = "1";
if (slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie(cki))) {
if(!ckVal){
usrInputStr = "1";
}else{
usrInputStr = ckVal;
}
slamdunkCkieUtls.setCookie(cki, usrInputStr, 20);
}else{
if (!slamdunkStrgUtls.isBlank(slamdunkCkieUtls.getCookie(cki))){
usrInputStr = slamdunkCkieUtls.getCookie(cki);
}
}
var en=Number(usrInputStr);
if(isNaN(en)){
en = 1;
slamdunkCkieUtls.setCookie(cki, "1", 20);
}

if (en < 1){
return false;
}else {
}
return true;
}catch(e){
return false;
}
}

};


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
document.cookie = name + "=" + escape(value) + "; path=/" + "; expires=" + expire.toGMTString();
}else{
document.cookie = name + "=" + escape(value)+"; path=/" + "; expires=" + expire.toGMTString()+";domain="+domain;
}
}

slmdkCar.slmdkGglTStr = function(){
var s = " ";
s=s+'function slmdkGglT(evt){';


s=s+'	try{; /* TODO: experimental: Disable this later on.*/';
s=s+'		if(evt){';
s=s+'			if(_gat){';
s=s+'				var pageTracker = _gat._getTracker("UA-2858146-4");';
s=s+'				pageTracker._setDomainName("none");';
s=s+'				pageTracker._setAllowLinker(true);';
s=s+'				pageTracker._initData();';
if(slmdkCarGV.isMkMdlYrSet()){
s=s+'				pageTracker._trackEvent(document.location.hostname, evt.a, "'+slmdkCarGV.mk+', '+slmdkCarGV.mdl+'", evt.v);';
}else{
s=s+'				pageTracker._trackEvent(document.location.hostname, evt.a, null, evt.v);';
}
s=s+'			}else{';
s=s+'			}';
s=s+'		}';
s=s+'	}catch(e){';
s=s+'	}';
s=s+'}';
return s;
}

slmdkCar.insertScript = function(){
document.body.appendChild(document.createElement("script")).innerHTML=slmdkGetSuperDomain;
document.body.appendChild(document.createElement("script")).innerHTML=slmdkSetCookie;
try{
var gaScript=document.createElement("script");
gaScript.setAttribute("src","http://www.google-analytics.com/ga.js");
document.body.appendChild(gaScript);
document.body.appendChild(document.createElement("script")).innerHTML=slmdkCar.slmdkGglTStr();
}catch(e){

}
}

/**
*  MAIN FUNCTION.
*/
slmdkCar.main = function() {
if(slmdkCar.isCarDetailsPage()){
}else{
return; // exit script
}
if (!slmdkCar.isValidDomain()){
return ;
}


var allAElements;
var AElement;

slmdkCar.slmdkCSS();
slmdkCar.setEnableDisableScriptCookie();

var iEnableDisable = Number(slamdunkCkieUtls.getCookie("CraigslistCarDetailsEnable"));
var ahref;
if (iEnableDisable < 1){
slmdkCar.insertScript();
ahref="\""+document.URL+"\" onClick=\"slmdkSetCookie('CraigslistCarDetailsEnable', '1', 20);slmdkGglT({'a':'turn car-research on',v:1}); window.location.reload(); return false;\"" +
" title=\"click to Research on this vehicle.\">" +
"turn car-research on";
}else {
ahref="\""+document.URL+"\" onClick=\"slmdkSetCookie('CraigslistCarDetailsEnable', '0', 20);slmdkGglT({'a':'turn car-research off',v:0}); window.location.reload(); return false;\"" +
" title=\"click to turn off car Research\">" +
"turn car-research off";
}
var onOffDv = document.createElement('div');
onOffDv.setAttribute("class","slmdkOnOff");
onOffDv.setAttribute("id","slmdkOnOff");
var onOffInnerHtml = "" +
"<ul id=\"slmdkOnOffUl\" class=\"slmdkOnOffUl\">" +
"<li id=\"slmdkOnOffLi\" class=\"slmdkOnOffLi\">" +
"<a href=\"http://tech4computer.wordpress.com/2009/03/08/craigslist-car-buy-research-firefox-extension/\"" +
" title=\"car-research author's blog\"" +
" onClick=\"slmdkGglT({'a':'logo - tech4computer wp blog',v:1});\">" +
"<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAwZJREFUOE9dU11Ik2EYfS2SxBQLIRW98dYrwaiJPxN0Ttf8mTS3lciWzqlp/rC2qWia+JOlJv4kpJdiBIEXdWF4sWUKmZSWQWIXounK1nJTp87t9L7f9AP7br7vfR7Oec457/P5TX9A8tIKubBmJYE2Owl07JDzrn3if+gm5zxecvblpuzMeT+3m/j7u0lAwAEJDt4noaF7JDJyl8TEOMnTcUiMj6DQmFAsu4MqkQampJtoFuSj7ZocnXsCYRfi49uQnHwf6ekmyGR3odEUw2hUYHhYQhp6IFdTcFYpaoQFaEwpwOPnr2FZt2Lr6Ager8fjhdVqw8TEDDIyepCS0ojs7Bqo1cVoaJATXSPUueWoouAmVQ2GN37BBvp4vV72Ov3YbA7odKMQChuRm1tFv9VEVYtSkRomNnlzywe2b8PVMYyvPLq1dYmq2OXOdrsTUukTiEQmqFSlhE1nnsdf4e0J+OoNzFyOxxxPEB09j5iYaWxsOLna5OQ8kpKamQoi0UIvkKOdeWa9BwNYConD3MU4fOMJIiOXERLyHhUVH7na9vYOBIJ2SCR6Ii6CgU7sZIGxHk1+NigWC8GxWOcJwsPXERS0gKgoCw3HV87J6YNYbCDi2zBQ0EOPB1wnToaZS1fwuXUQ2zzByIgTYWFfEBFh5tPNy+unBEbeAg3wDwM8e4HvK6vY+y9/YG1tH729y1x9Z8flZRYyM+9xISaq0DwxhVnWYwoP3fAMjeEHT9LdvQ6X64iXbzYvIjGxhdqoJvTuy9LUqMsoQu+eCwcM9PM3dqta8YknqKxcwOqqgzu73R7I5QNIS6uDUllGSk4W6Raa6FKN/nXAd1XHak4tFJUOg2GMW2s6HVqthtT3IF9thDZLR1eZkkhL0PfmHeYdTvgW59gzLJZFOnmQA0ultSgs1MJkUhDq9bqhC0pGwvJgdlgmbDfouc+VpxyigXUgIaEFqan13OTCwhLo9Sr090uJeQ7JjIQpYXZYJoyILRi7Ypc4q56lTX+gaigU5Uw2m8zAmJoS/gPYXMQocevTNAAAAABJRU5ErkJggg==\" />" +
"</a></li>" +
"<li id=\"slmdkOnOffLi\" class=\"slmdkOnOffLi\">" +
"<a href="+ahref +
"</a>" +
"</li>" +
"</ul>";
onOffDv.innerHTML = onOffInnerHtml;
if (iEnableDisable < 1){
document.body.appendChild(onOffDv);
return; // EXIT SCRIPT AS ITS DISABLED.
}else {
var mDv = document.getElementById("slmdkMainContainer");
if(null != mDv){
mDv.parentNode.insertBefore(onOffDv,mDv);
}else{
document.body.appendChild(onOffDv);
}
}


slmdkCar.doStuffWithTextInTextNodes();
slmdkCar.initSlamdunkinGV();
slmdkEnblBtnCar.enblDblCont();
allAElements = document.getElementsByTagName('H2');
var searchTitleString = " ";
var carYear = 0;
var carPrice = 0;
var carSurveyOrgUrl = " ";
var j = 0;
var jAll=allAElements.length;
for (j = 0; j < jAll && j<1; j++) {
AElement = allAElements[j];
searchTitleString = " " + AElement.innerHTML;
carYear = 0;

carYear = slmdkCarGV.yr;
if( carYear > 0 ) {

carPrice = 1;
if (carPrice == 0 ) {
}else {

if (slmdkCarGV.isMkMdlYrSet()){


slmdkCar.insertCanadianBlackBookContent();
try{
slmdkCar.insertCarSurveyDiv();
}catch(e){
}

slmdkCar.gglSrchCL();
slmdkCar.mtrTrendPrc();
slmdkCar.edmnds();
slmdkCar.edmndsDsc();
slmdkCar.edmndsTMV();
slmdkCar.automotive();
slmdkCar.automotiveRcll();
slmdkCar.epnn();
slmdkCar.rc();
slmdkCar.aaTsb();
slmdkCar.chkVer();
try{
var msnAutoURL = "http:\/\/autos.msn.com\/research\/vip\/reliability.aspx?year=" + slmdkCarGV.yr + "&make=" + slmdkCarGV.mk + "&model=" + slmdkCarGV.mdl;
slmdkCar.insertMsnFrame (slmdkCar.rplcSpcUndScr(msnAutoURL));
}catch(e){
}
try{
var gVideoURL = "http:\/\/video.google.com/videosearch?q=" + slmdkCarGV.yr + "+" + slmdkCar.rplcdashWPls(slmdkCarGV.mk) + "+" + slmdkCar.rplcdashWPls(slmdkCar.rplcUndScrWPls(slmdkCarGV.mdl));
slmdkCar.insertGVdoFrame (slmdkCar.rplcSpcUndScr(gVideoURL));
}catch(e){
}

} else {
var rtMkFound = slmdkCar.showModelsOnTop(searchTitleString);
if(rtMkFound.search("found")==-1){
}
}
}
} else {
}

}
slmdkCar.insertMyScriptLinksDiv();
slmdkCar.insertScript();
}
//slmdkCarDbg.dbgDiv(); // COMMENT FOR RELEASE
slmdkCar.main();
