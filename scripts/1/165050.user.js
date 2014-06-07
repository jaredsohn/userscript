// ==UserScript==
// @author      blablubbb
// @namespace	T4
// @name		Travian T4 Auction bid
// @description	The Script bids predefinded prices
// @source 		http://userscripts.org/scripts/show/153401
// @identifier 	http://userscripts.org/scripts/source/153401.user.js
// @include 	http://*.travian.*/hero_auction.php*
// @include 	https://*.travian.*/hero_auction.php*
// @version     2.6.1
// @require http://usocheckup.redirectme.net/153401.js
// ...
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// ...
// ==/UserScript==


const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
/***************** Functions adopted from "Travian: Antifarm\Troop saver" script  and  "autotask gotgs" script"...**************************/
/**
 * XPath wrapper - simplifies searching for items in the document.
 */
function getVersion (){
if(document.getElementById("villageList")){;
return "T4";
}
else{//T4.2 fix
return "T4.2";
}}
var version = getVersion ();
//GM_log("version"+version);

function find(xpath, xpres, startnode)
{
	if (!startnode) {startnode = document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (ret == null) return null;
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

function getLoginButton(doc) {
	var loginButton = find(".//input[ @value='login' and @id='btn_login' ]", XPFirst, doc); // login button // travian version 3.6
	if ( loginButton == null ) { // travian version 4.0
		var xpathLoginButtonT4 = ".//button[ @id='s1' and @name='s1' and @type='submit' and contains(@onclick,'screen.width') and contains(@onclick,'screen.height') ]";
		loginButton = find(xpathLoginButtonT4, XPFirst, doc); // login button
	}
	if ( loginButton != null )
		return loginButton;
	else
		return null;
}

var aTravianVersion = "";
var var_get_uid = null;
function getuid() {
	var loginButton = getLoginButton(document);
	if ( loginButton != null ) // when login page return null
		return null;
	if ( var_get_uid == "" || var_get_uid == null || var_get_uid == undefined ) {
		var tag = document.evaluate('.//div[@id="side_navi"]//a[contains(@href,"spieler.php")]', document, null, XPFirst, null).singleNodeValue;
		if ( tag != null ) {
			aTravianVersion = "3.6";
			var_get_uid = tag.href.match(/\buid=\d{1,}\b/)[0].split("=")[1];
		}
		else {
			tag = document.evaluate('.//div[@id="side_info"]//a[contains(@href,"spieler.php")]', document, null, XPFirst, null).singleNodeValue;
			if ( tag != null ) {
				var_get_uid = tag.href.match(/\buid=\d{1,}\b/)[0].split("=")[1];
				aTravianVersion = "4.0";
			}
			else {
				var_get_uid = null;
			}
		}
	}
	return var_get_uid;
}

function currentServer() {
	var serverr = window.location.hostname.replace(/\.travian\./, "");
	return serverr;
}

function myacc() {
	return currentServer() + "_" + getuid();
}

function promptLangBid() {
	var curentSetup = GM_getValue ( myacc() + "_lang_bid", "" );
	var newSetup = prompt("Put in the name of the button to bid in your travian version (language dependent... e.g. bid):\n\n",curentSetup);
	if ( newSetup != null ){ 
		GM_setValue ( myacc() + "_lang_bid", newSetup );}
}
GM_registerMenuCommand("Language setting", promptLangBid );

function promptFriends() {
	var curentSetup = GM_getValue ( myacc() + "_friends", "" );
	var newSetup = prompt("List friends you do not wish to overbid, seperate names by coma (make sure to not use additional spaces except the ones which are really in a player-name):\n\n",curentSetup);
	if ( newSetup != null ){ 
		GM_setValue ( myacc() + "_friends", newSetup );}
}
GM_registerMenuCommand("Friends", promptFriends );

function deleteFriedsBids(){
GM_setValue ( myacc() + "_friends_bids",  "");
}

function addFriendsBid(id){
var newVal ="";
var oldVal = GM_getValue ( myacc() + "_friends_bids",  "");
if (oldVal == ""){newVal = id.toString();}
else{newVal = oldVal+"["+id.toString();}
GM_setValue ( myacc() + "_friends_bids",  newVal);
//GM_log("addFriendBid "+id+" neue Liste"+newVal);
}

function getFriendsBids(){
var friendsBids=[];
var oldVal = GM_getValue ( myacc() + "_friends_bids",  "");
friendsBids = oldVal.split("[");
return friendsBids;
}

function promptPrice_bandage25() {
	var curentSetup = GM_getValue ( myacc() + "_bandage25", "0" );
	var newSetup = prompt("Put in price for "+"_bandage25"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_bandage25", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_bandage25').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_bandage25", promptPrice_bandage25 );

function promptPrice_bandage33() {
	var curentSetup = GM_getValue ( myacc() + "_bandage33", "0" );
	var newSetup = prompt("Put in price for "+"_bandage33"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_bandage33", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_bandage33').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_bandage33", promptPrice_bandage33 );

function promptPrice_cage() {
	var curentSetup = GM_getValue ( myacc() + "_cage", "0" );
	var newSetup = prompt("Put in price for "+"_cage"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_cage", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_cage').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_cage", promptPrice_cage );

function promptPrice_scroll() {
	var curentSetup = GM_getValue ( myacc() + "_scroll", "0" );
	var newSetup = prompt("Put in price for "+"_scroll"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_scroll", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_scroll').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_scroll", promptPrice_scroll );

function promptPrice_ointment() {
	var curentSetup = GM_getValue ( myacc() + "_ointment", "0" );
	var newSetup = prompt("Put in price for "+"_ointment"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_ointment", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_ointment').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_ointment", promptPrice_ointment );

function promptPrice_lawTables() {
	var curentSetup = GM_getValue ( myacc() + "_lawTables", "0" );
	var newSetup = prompt("Put in price for "+"_lawTables"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_lawTables", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_lawTables').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_lawTables", promptPrice_lawTables );

function promptPrice_artWork() {
	var curentSetup = GM_getValue ( myacc() + "_artWork", "0" );
	var newSetup = prompt("Put in price for "+"_artWork"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_artWork", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_artWork').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_artWork", promptPrice_artWork );

function promptPrice_bookOfWisdom() {
	var curentSetup = GM_getValue ( myacc() + "_bookOfWisdom", "0" );
	var newSetup = prompt("Put in price for "+"_bookOfWisdom"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_bookOfWisdom", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_bookOfWisdom').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_bookOfWisdom", promptPrice_bookOfWisdom );

function promptPrice_bucketOfWater() {
	var curentSetup = GM_getValue ( myacc() + "_bucketOfWater", "0" );
	var newSetup = prompt("Put in price for "+"_bucketOfWater"+"  (e.g. 2.3). If you do not wish to bit, set it to 0 :\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_bucketOfWater", newSetup.replace(/\s/g,"") );
		document.getElementById('myPriceFor_bucketOfWater').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Price of "+"_bucketOfWater", promptPrice_bucketOfWater );

function promptPrice_otherItems() {
	var curentSetup = GM_getValue ( myacc() + "_otherItems", "" );
	var newSetup = prompt("Put in price for "+"_otherItems"+". The syntax must be 'item,price;next item,price;...;last item,price'  (e.g. 'Hatchet of the Axeman,200;Spear of the Spearman,150;Small shield,500'). Put it in without quotation marks. This feature is experimental:\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_otherItems", newSetup );
		makeOtherItemHTLM();
		}
}
GM_registerMenuCommand("Price of "+"_otherItems", promptPrice_otherItems );

function prompt_MySilverMin() {
	var curentSetup = GM_getValue ( myacc() + "_MySilverMin", "1000000" );
	var newSetup = prompt("Set value for Silverreserve to remain:\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_MySilverMin", newSetup.replace(/\s/g,"") );
		document.getElementById('mySilverMin').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("Silvermin", prompt_MySilverMin );

function prompt_MyInstantSwitch() {
	var curentSetup = GM_getValue ( myacc() + "_MyInstantSwitch", "0" );
	var newSetup = prompt("Set value value to the number of pages the bot bids in advance (default is 0 and that means all pages):\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_MyInstantSwitch", newSetup.replace(/\s/g,"") );
		document.getElementById('MyInstantSwitch').textContent = newSetup.replace(/\s/g,"");}
}
GM_registerMenuCommand("First page only?", prompt_MyInstantSwitch );
/**************************************************************End of stolen code... more or less...*********************************************************************************/
//Arry-Funktionen:
function include(arr, obj) {for(var i=0; i<arr.length; i++) {if (arr[i] == obj) return true;}}
/**************************************************************Start Wartefunktionen*********************************************************************************/
//Startet nach warte-Zeit neu mit Gebote einlesen...
function startNewCycle(warten, time){
	deleteFriedsBids();
	window.setTimeout ( function() { 
			window.location.href = "http://"+window.location.hostname+"/hero_auction.php?action=buy";		
		},
			warten );
	var wartenStd = Math.floor(warten/3600000);
	var wartenMin = Math.floor((warten/60000)-wartenStd*60);
	var wartenSec = Math.floor((warten/1000)-wartenStd*3600-wartenMin*60);
	document.getElementById('warten').innerHTML = "sleep <span class=\"my_counter\">" + wartenStd + ":"+wartenMin+":"+wartenSec+"</span>";
}

function loadNextPage(warten){ // gehe eine Seite weiter...
var nextpage = document.getElementsByClassName('next')[0].href;
if (nextpage == undefined ){return false;}
else{
	window.setTimeout ( function() { 
			window.location.href = nextpage;		
		},
			warten );
	var wartenTxt = Math.round(warten/1000);
	document.getElementById('warten').innerHTML = "next page in <span class=\"my_counter\"> 00:00:0"+wartenTxt+"</span>";
	return true;
}}

function loadThisPage(warten){ // neu laden ohne resend
var search = [];
var pagenr =0;
var nextpage = document.getElementsByClassName('next')[0].href;
if (nextpage == undefined )
{
	var previouspage = document.getElementsByClassName('previous')[0].href;
	if (previouspage == undefined )
	{nextpage = window.location.href;}
	else
	{search = previouspage.split("page=");
	pagenr = parseInt(search[1])+1;
	nextpage = search[0]+"page="+pagenr;}
}
else{
search = nextpage.split("page=");
pagenr = parseInt(search[1])-1;
nextpage = search[0]+"page="+pagenr;
}
window.setTimeout ( function() { 
		window.location.href = nextpage;		
	},
		warten );
var wartenTxt = Math.round(warten/1000);
document.getElementById('warten').textContent = "next page in " + wartenTxt + " s";
return true;}

function getPageNumber(){
var search = [];
var pagenr =0;
var nextpage = document.getElementsByClassName('next')[0].href;
if (nextpage == undefined )
{
	var previouspage = document.getElementsByClassName('previous')[0].href;
	if (previouspage != undefined )
	{search = previouspage.split("page=");
	pagenr = parseInt(search[1])+1;
	}
}
else{
search = nextpage.split("page=");
pagenr = parseInt(search[1])-1;
}
return pagenr;
}

// function makeOtherItemHTLM(){//creates innerHTML of otherItems table
// var otherItems = GM_getValue ( myacc() + "_otherItems", "" ).split(";");
// var innerHTLMtxt = "";
// var item = "";
// var price = "";
 // for(i = 0; i<otherItems.length; i++){
 // item = otherItems[i].split(",")[0];
 // price = otherItems[i].split(",")[1];
// innerHTLMtxt += "<tr><td>"+item+"</td><td id='"+item.replace(/\s/g,"")+"'>"+price+"</td></tr>"
 // }
// document.getElementById("otherItemsTable").innerHTML = innerHTLMtxt;
// }
function makeOtherItemForm(){
var otherItems = GM_getValue ( myacc() + "_otherItems", "" ).split(";");
var innerHTLMtxt = "";
var item = "";
var price = "";
if (otherItems[0]!=""){
 for(i = 0; i<otherItems.length; i++){
 item = otherItems[i].split(",")[0];
 price = otherItems[i].split(",")[1];
innerHTLMtxt += "<tr><td>"+item+"</td><td><a id='"+item.replace(/\s/g,"")+"' href='javaScript:void(0)' >"+price+"</a></td><td><a id='del_"+item.replace(/\s/g,"")+"' href='javaScript:void(0)' >X</a></td></tr>";
 }}
 
document.getElementById("otherItemForm").innerHTML = innerHTLMtxt;
}
function makeOtherItemEventListen(){
var otherItems = GM_getValue ( myacc() + "_otherItems", "" ).split(";");
var innerHTLMtxt = "";
var item = "";
var price = "";
if (otherItems[0]!=""){
 for(i = 0; i<otherItems.length; i++){
 item = otherItems[i].split(",")[0];
 price = otherItems[i].split(",")[1];
document.getElementById(item.replace(/\s/g,"")).addEventListener("click", function(){changePrice(this.id)}, true);
document.getElementById("del_"+item.replace(/\s/g,"")).addEventListener("click", function(){changePrice(this.id)}, true);
 }}
}
function changePrice(DoItem){
var otherItems = GM_getValue ( myacc() + "_otherItems", "" ).split(";");
var innerHTLMtxt = "";
var item = [];
var price = [];
var replaceList = "";
if(DoItem.split("_")[0] == "del"){//delete item
DoItem = DoItem.split("_")[1];
if (otherItems[0]!=""){
 for(i = 0; i<otherItems.length; i++){
 item[i] = otherItems[i].split(",")[0].replace(/\s/g,"");
if(item[i]==DoItem){//delete last semicolon if last item is deleted.
if(i+1==otherItems.length){replaceList = replaceList.substr(0,replaceList.length -1);}
}
else{
if(i+1==otherItems.length){replaceList += otherItems[i];}
else{replaceList += otherItems[i]+';';}
}
 }}}
else{//change Price
if (otherItems[0]!=""){
 for(i = 0; i<otherItems.length; i++){
 item[i] = otherItems[i].split(",")[0];
price[i] = otherItems[i].split(",")[1];
if(item[i].replace(/\s/g,"")==DoItem){//change price
var newPrice = prompt("Put in price for "+item[i]+"  (e.g. 100). If you do not wish to bit, set it to 0. You can also delete object from list by pressing the X next to the price:\n\n",price[i]);
if(i+1==otherItems.length){
if ( newPrice != null ){replaceList += item[i]+","+newPrice;}
else{replaceList += item[i]+","+price[i];}
}
else{if ( newPrice != null ){replaceList += item[i]+","+newPrice+';';}else{replaceList += item[i]+","+price[i]+';';}}
}
else{
if(i+1==otherItems.length){replaceList += otherItems[i];}
else{replaceList += otherItems[i]+';';}
}
 }}
}
GM_setValue ( myacc() + "_otherItems", replaceList );
makeOtherItemForm();
makeOtherItemEventListen();
}

function AddItemToList(){
var otherItems = GM_getValue ( myacc() + "_otherItems", "" );
var Item  = prompt("Put in the name of the item (e.g.\"Hatchet of the Axeman\") without quotation marks and without additional spaces:\n\n","Hatchet of the Axeman");
var price = prompt("Put in the price you want to pay for "+Item+"  (e.g. 100):\n\n","100");
if ((Item != null)&&(price != null)&&(Item!= "")){
if ( otherItems != "" ){
otherItems+=";"+Item+","+price;
}
else{
otherItems=Item+","+price;
}
GM_setValue ( myacc() + "_otherItems", otherItems );
makeOtherItemForm();
makeOtherItemEventListen();
}
}

function makePricesTable(version){
itemlist = [
	"_bandage25",
	"_bandage33",	
	"_cage",
	"_scroll",	
	"_ointment",
	"_lawTables",	
	"_artWork",
	"_bucketOfWater",
	"_bookOfWisdom",
/*	"_helmet",	
	"_body",
	"_leftHand",	
	"_rightHand",
	"_shoes",	
	"_horse" */
	];
var	price=[]; 
var silbermin = GM_getValue ( myacc() + "_MySilverMin", "1000000" );
var MyInstantSwitch =  GM_getValue ( myacc() + "_MyInstantSwitch", "0" );
var startStop = GM_getValue ( myacc() + "_startStop" , "Stop" );
if(version=="T4"){
var pricelisthtmltxt = "<table><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody id=\"mySellTable\" >";
for (i = 0; i<itemlist.length; i++){
price[i] = GM_getValue ( myacc() + itemlist[i] , "0" );
pricelisthtmltxt += '<tr><td><img src="img/x.gif" class="itemCategory itemCategory'+itemlist[i] +'" alt="itemCategory itemCategory'+itemlist[i] +'"></td><td><a id="myPriceFor'+itemlist[i]+'" href="javaScript:void(0)"> '+price[i] +'</a></td></tr>';
}
pricelisthtmltxt +='<tr><td></td><td></td></tr>'+'<tr><td>Silvermin</td><td><a id="mySilverMin" href="javaScript:void(0)"> '+silbermin+'</a></td></tr>'+'<tr><td>PagesToScan</td><td><a id="MyInstantSwitch" href="javaScript:void(0)"> '+MyInstantSwitch+'</a></td></tr>';
pricelisthtmltxt +='</tbody></table><p style="text-align: center;" ><a id="pause_markt" href="javaScript:void(0)">'+startStop+'</a></p><p style="text-align: center;"><a id="freunde" href="javaScript:void(0)">exclude Friends</a></p><table><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody id="otherItemForm" ></tbody></table><p><a id="AddItemToList" href="javaScript:void(0)">Add Item to List</a></p>';
var myhtmltxt = '<div class="listing" id="preise"><div class="head"><a id="lang_bid" href="javaScript:void(0)" >Settings of Auto-Bid:</a></div><div class="no list">'+pricelisthtmltxt+'<span id="warten" style="text-align: center;" >waiting...</span><div class="list"></div> </div></div><div class="foot"></div>';
var villageList = document.getElementById("villageList");
}
else{//T4.2 fix
var pricelisthtmltxt = "";
for (i = 0; i<itemlist.length; i++){
price[i] = GM_getValue ( myacc() + itemlist[i] , "0" );
pricelisthtmltxt += '<tr><td><img src="img/x.gif" class="itemCategory itemCategory'+itemlist[i] +'" alt="itemCategory itemCategory'+itemlist[i] +'"></td><td><a id="myPriceFor'+itemlist[i]+'" href="javaScript:void(0)"> '+price[i] +'</a></td></tr>';
}
var myhtmltxt = '<div id="sidebarBoxQuestmaster2" class="sidebarBox   "><div class="sidebarBoxBaseBox"><div class="baseBox baseBoxTop"><div class="baseBox baseBoxBottom"><div class="baseBox baseBoxCenter"></div></div></div></div><div class="sidebarBoxInnerBox"><div class="innerBox header "><div class="clear"></div><div class="boxTitle">Auto-Bid Script:</div><div></div></div><div class="innerBox content"><ul id="mentorTaskList2" class=""><table><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody id=\"mySellTable\" >'+pricelisthtmltxt+'</tbody><tfoot><tr><td>Silvermin</td><td><a id="mySilverMin" href="javaScript:void(0)"> '+silbermin+'</a></td></tr>'+'<tr><td>PagesToScan</td><td><a id="MyInstantSwitch" href="javaScript:void(0)"> '+MyInstantSwitch+'</a></td></tr></tfoot></table></ul><p><a id="pause_markt" href="javaScript:void(0)">'+startStop+'</a></p><p><span>Status:</span><span id="warten" style="text-align: center;" >waiting...</span></p><p><a id="lang_bid" href="javaScript:void(0)" >Language Setting</a></p><p><a id="freunde" href="javaScript:void(0)">Friends Setting</a></p><p></p><table><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody id="otherItemForm" ></tbody></table><a id="AddItemToList" href="javaScript:void(0)">Add Item to List</a></div><div class="innerBox footer"></div></div></div><div class="clear"></div>';
var villageList = document.getElementById("sidebarAfterContent");
}
villageList.innerHTML += myhtmltxt;
makeOtherItemForm();
makeOtherItemEventListen();

document.getElementById('myPriceFor_bandage25').addEventListener("click", function(){promptPrice_bandage25()}, true);
document.getElementById('myPriceFor_bandage33').addEventListener("click", function(){promptPrice_bandage33()}, true);
document.getElementById('myPriceFor_cage').addEventListener("click", function(){promptPrice_cage()}, true);
document.getElementById('myPriceFor_scroll').addEventListener("click", function(){promptPrice_scroll()}, true);
document.getElementById('myPriceFor_ointment').addEventListener("click", function(){promptPrice_ointment()}, true);
document.getElementById('myPriceFor_lawTables').addEventListener("click", function(){promptPrice_lawTables()}, true);
document.getElementById('myPriceFor_artWork').addEventListener("click", function(){promptPrice_artWork()}, true);
document.getElementById('myPriceFor_bucketOfWater').addEventListener("click", function(){promptPrice_bucketOfWater()}, true);
document.getElementById('myPriceFor_bookOfWisdom').addEventListener("click", function(){promptPrice_bookOfWisdom()}, true);
//document.getElementById('myPriceFor_otherItems').addEventListener("click", function(){promptPrice_otherItems()}, true);
document.getElementById('mySilverMin').addEventListener("click", function(){prompt_MySilverMin()}, true);
document.getElementById('MyInstantSwitch').addEventListener("click", function(){prompt_MyInstantSwitch()}, true);
document.getElementById('pause_markt').addEventListener("click", function(){pauseMarkt()}, true);
document.getElementById('freunde').addEventListener("click", function(){promptFriends()}, true);
document.getElementById('lang_bid').addEventListener("click", function(){promptLangBid()}, true);
document.getElementById('AddItemToList').addEventListener("click", function(){AddItemToList()}, true);
}

function pauseMarkt(){
var startStop = GM_getValue ( myacc() + "_startStop" , "Start" );
if (startStop=="Stop"){
GM_setValue ( myacc() + "_startStop" , "Start" );
document.getElementById('pause_markt').textContent = "Start";
}
else{
GM_setValue ( myacc() + "_startStop" , "Stop" );
document.getElementById('pause_markt').textContent = "Stop";
loadThisPage(1);
}
}

function isMarketPaused(){var startStop = GM_getValue ( myacc() + "_startStop" , "Stop" ); if (startStop=="Stop"){return false;}else{return true;}}

function replaceTimer(){ // stolen from my own Script hehehe...
var j = 1;
while (document.getElementById('timer'+j))
{
document.getElementById('timer'+j).setAttribute('class','my_counter');
document.getElementById('timer'+j).removeAttribute('id');
j++;
}
}

function myTimer() {
var timers = [];
var timer = [];
var timeleft = 0;
var newtxt = "";
var h = 0;
var m = 0;
var s = 0;
function kl10(number){if(number<10){return "0"+number;}else{return number}};
timers = document.getElementsByClassName('my_counter');
for (var i = 0;i<timers.length;i++){
	timer = timers[i].textContent.split(":");
	timeleft = parseInt(timer[0],10) * 3600;
	timeleft += parseInt(timer[1],10) * 60;
	timeleft += parseInt(timer[2],10);
if(timeleft<1){
}else{
timeleft--;
s = timeleft%60;
m= ((timeleft-s)/60)%60;
h= ((timeleft-s)/60-m)/60;
newtxt = kl10(h)+":"+kl10(m)+":"+kl10(s);
timers[i].textContent = newtxt;
}}
window.setTimeout ( function() { 
			myTimer();	
		},
			1000 );
}
replaceTimer();
myTimer();

function timeToSeconds(time){
var timePos1 = time.search(/\:/);
var t1 = parseInt(time.substr(0, timePos1 ));
var t2 = parseInt(time.substr(timePos1+1 , 2 ));
var t3 = parseInt(time.substr(timePos1+4 , 2 ));
var t = 3600*t1+60*t2+t3;
return t;
}

function getPageLocation(){
var pageLocation="";
try{ pageLocation = document.getElementsByClassName('contentNavi tabNavi')[0].getElementsByClassName('container active')[0].getElementsByTagName('a')[0].getAttribute('href').substr(24 , 4);}
catch(err){pageLocation = "buy";}
return pageLocation;}

//Display functions for average prices inspired by mrreza and his code was used as template...
function mrreza(ThingCol,SilvCol,HeadCols,BodyCols,tableNr){// the exampel numbers are for bids page. mrreza(2,4,5,7,0)
//there are 5 header colums, so insertCell(5) will create the 6th header. the last number "TableNr" stands for: how many tables are before that table.
firsttab = document.getElementsByTagName("table")[tableNr].getElementsByTagName("tr")[0].insertCell(HeadCols)
firsttab.innerHTML="&#216; Cost per Unit";

t_loop = document.getElementsByTagName("tbody")[tableNr].getElementsByTagName("tr").length;

for(i=0 ; i<t_loop ; i++){

base = document.getElementsByTagName("tbody")[tableNr].getElementsByTagName("tr")[i]
//There are 7 colums with informations originally, so it checks whether we are in the correct table and in a valid row
if(base.childElementCount==BodyCols){
//[2] means in the 3rd coumn is the number of things mentioned 
nam2 = base.getElementsByTagName("td")[ThingCol].textContent;

number = nam2.split("x");
//[4] is the silver in the 5th column
silv2 = base.getElementsByTagName("td")[SilvCol].textContent;

cost = (Math.round((silv2 / number[0])*100))/100;
//There are 7 colums with informations originally, so insertCell(7) will create the 8th column.
final = base.insertCell(BodyCols).innerHTML=cost;
}
else
{
//changed it to make it work in last column...
selected = base.insertCell(base.childElementCount).innerHTML="";
}

}
}

//End of mrreza inspired code...
var warten = Math.ceil ( Math.random() * 5000 + 3000 ); // random ( 5 sec ) + 3 sec
makePricesTable(version);
switch(getPageLocation())
	{
	case "acco": //Accounting
{//Display average row mrraza
firsttab = document.getElementsByTagName("tr")[0].insertCell(4)
firsttab.innerHTML="&#216; Cost per Unit";
/************************************************************** START Collecting Infos 
distinguish product groups by the picture
distinguish buy and sell by + or -
Calculate average buying and selling price of this table
Other= No picture.
*********************************************************************************/
itemlist2 = [
	"_bandage25",
	"_bandage33",	
	"_cage",
	"_scroll",	
	"_ointment",
	"_lawTables",	
	"_artWork",
	"_bucketOfWater",
	"_bookOfWisdom",
	"_helmet",	
	"_body",
	"_leftHand",	
	"_rightHand",
	"_shoes",	
	"_horse",
	"_other"
	];
var causeClassRep = 0;
var accouClassrep = 0;
var AccountingAmount = 0;
var AccStatsPos = [];
var AccStatsNeg = [];
var AccountingAmountPos = [];
var AccountingAmountNeg = [];
var AccountingImg = [];
for(var i=0;i<itemlist2.length;i++){
AccStatsPos[i]=0;
AccStatsNeg[i]=0;
AccountingAmountPos[i]=0;
AccountingAmountNeg[i]=0;
}
var causesTable = document.getElementsByClassName("date");
for(var i=1;i<causesTable.length;i++)
{
try
{
causeClassRep = itemlist2.indexOf(causesTable[i].parentNode.getElementsByClassName("cause")[0].getElementsByTagName("img")[0].getAttribute('class').replace(/itemCategory itemCategory/,""));
AccountingAmount = parseInt(causesTable[i].parentNode.getElementsByClassName("cause")[0].innerHTML.split('">')[1], 10);
AccountingImg[causeClassRep] = causesTable[i].parentNode.getElementsByClassName("cause")[0].getElementsByTagName("img")[0].cloneNode(true);
}
catch(err)
{
causeClassRep = itemlist2.indexOf("_other");
AccountingAmount = 1;
AccountingImg[causeClassRep] = document.getElementsByClassName("silver")[1].cloneNode(true);
}
accouClassrep= parseInt(causesTable[i].parentNode.getElementsByClassName("accounting")[0].innerHTML.replace(/\s/g,""),10);
causesTable[i].parentNode.insertCell(4).innerHTML=Math.round(accouClassrep/AccountingAmount*100)/100;
if(accouClassrep>0){
AccStatsPos[causeClassRep] += accouClassrep;
AccountingAmountPos[causeClassRep] += AccountingAmount;
}
else{
AccStatsNeg[causeClassRep] += accouClassrep;
AccountingAmountNeg[causeClassRep] += AccountingAmount;
}
}
/************************************************************** ENDE Collecting Infos *********************************************************************************/
var AccountingTableIncome = document.createElement("table");
//var AccountingTableIncomeHeaderRow = document.createElement("tr");
AccountingTableIncome.innerHTML="<tr><th></th><th colspan='3'>Income (Yield)</th><th colspan='3'>Expense</th><th colspan='3'>Profit</th></tr><tr><td>Object</td><td>Units Sold</td><td>Summe Price</td><td>&#216;  Revenue/Unit</td><td>Units Bought</td><td>Summe Price</td><td>&#216; Expense/Unit</td><td>&#216; Profit/Unit</td><td>Cash Flow</td><td>Units Stocked</td><td>Silver Stocked</td></tr>";
//AccountingTableIncome.appendChild(AccountingTableIncomeHeaderRow);
var TotalIncome =0;
var TotalSpending =0;
var TotalSilverStock =0;
for(var i=0;i+1<itemlist2.length;i++){
if(AccountingAmountPos[i]!=0 || AccountingAmountNeg[i]!= 0){
var AccountingTableIncomeRow = document.createElement("tr");
var AccountingTableIncomeCol1 = document.createElement("td");
var AccountingTableIncomeCol2 = document.createElement("td");
var AccountingTableIncomeCol3 = document.createElement("td");
var AccountingTableIncomeCol4 = document.createElement("td");
var AccountingTableIncomeCol5 = document.createElement("td");
var AccountingTableIncomeCol6 = document.createElement("td");
var AccountingTableIncomeCol7 = document.createElement("td");
var AccountingTableIncomeCol8 = document.createElement("td");
var AccountingTableIncomeCol9 = document.createElement("td");
var AccountingTableIncomeCol10 = document.createElement("td");
var AccountingTableIncomeCol11 = document.createElement("td");
//AccountingTableIncomeCol1.innerHTML = itemlist2[i];
AccountingTableIncomeCol1.appendChild(AccountingImg[i]);
AccountingTableIncomeCol2.innerHTML = AccountingAmountPos[i];
AccountingTableIncomeCol3.innerHTML = AccStatsPos[i];
AccountingTableIncomeCol4.innerHTML = Math.round(100*AccStatsPos[i]/AccountingAmountPos[i])/100;
AccountingTableIncomeCol5.innerHTML = AccountingAmountNeg[i];
AccountingTableIncomeCol6.innerHTML = AccStatsNeg[i];
AccountingTableIncomeCol7.innerHTML = Math.round(100*AccStatsNeg[i]/AccountingAmountNeg[i])/100;
AccountingTableIncomeCol9.innerHTML = AccStatsPos[i] + AccStatsNeg[i];
AccountingTableIncomeCol8.innerHTML = Math.round(100*(AccStatsPos[i]/AccountingAmountPos[i])+100*(AccStatsNeg[i]/AccountingAmountNeg[i]))/100;
AccountingTableIncomeCol10.innerHTML = AccountingAmountNeg[i]-AccountingAmountPos[i];
AccountingTableIncomeCol11.innerHTML = Math.round(100*(AccountingAmountNeg[i]-AccountingAmountPos[i])*((AccStatsPos[i]/AccountingAmountPos[i])+(AccStatsNeg[i]/AccountingAmountNeg[i])))/100;
TotalSilverStock += AccountingTableIncomeCol11.innerHTML;
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol1);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol2);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol3);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol4);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol5);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol6);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol7);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol8);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol9);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol10);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol11);
AccountingTableIncome.appendChild(AccountingTableIncomeRow);
TotalIncome += AccStatsPos[i];
TotalSpending += AccStatsNeg[i];
}
}
var AccountingTableIncomeTotalTrade = document.createElement("tr");
AccountingTableIncomeTotalTrade.innerHTML = "<td colspan='2'> Total Trade Income</td><td>"+TotalIncome+"</td><td colspan='2'>Total Trade Expenses</td><td>"+TotalSpending+"</td><td colspan='2'>Total Trade Cash Flow</td><td>"+(TotalIncome+TotalSpending)+"</td><td>Total Silver Stocked</td><td></td>";
AccountingTableIncome.appendChild(AccountingTableIncomeTotalTrade);
//other Income/Expenses
for(var i=itemlist2.indexOf("_other");i<itemlist2.length;i++){
if(AccountingAmountPos[i]!=0 || AccountingAmountNeg[i]!= 0){
var AccountingTableIncomeRow = document.createElement("tr");
var AccountingTableIncomeCol1 = document.createElement("td");
var AccountingTableIncomeCol2 = document.createElement("td");
var AccountingTableIncomeCol3 = document.createElement("td");
var AccountingTableIncomeCol4 = document.createElement("td");
var AccountingTableIncomeCol5 = document.createElement("td");
var AccountingTableIncomeCol6 = document.createElement("td");
var AccountingTableIncomeCol7 = document.createElement("td");
var AccountingTableIncomeCol8 = document.createElement("td");
var AccountingTableIncomeCol9 = document.createElement("td");
var AccountingTableIncomeCol10 = document.createElement("td");
var AccountingTableIncomeCol11 = document.createElement("td");
//AccountingTableIncomeCol1.innerHTML = itemlist2[i];
AccountingTableIncomeCol1.appendChild(AccountingImg[i]);
AccountingTableIncomeCol2.innerHTML = AccountingAmountPos[i];
AccountingTableIncomeCol3.innerHTML = AccStatsPos[i];
AccountingTableIncomeCol4.innerHTML = "";
AccountingTableIncomeCol5.innerHTML = AccountingAmountNeg[i];
AccountingTableIncomeCol6.innerHTML = AccStatsNeg[i];
AccountingTableIncomeCol7.innerHTML = "";
AccountingTableIncomeCol9.innerHTML = AccStatsPos[i] + AccStatsNeg[i];
AccountingTableIncomeCol8.innerHTML = "";
AccountingTableIncomeCol10.innerHTML = "";
AccountingTableIncomeCol11.innerHTML = "";
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol1);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol2);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol3);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol4);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol5);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol6);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol7);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol8);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol9);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol10);
AccountingTableIncomeRow.appendChild(AccountingTableIncomeCol11);
AccountingTableIncome.appendChild(AccountingTableIncomeRow);
}
}
var AccountingTableIncomeTotal = document.createElement("tr");
AccountingTableIncomeTotal.innerHTML = "<td colspan='2'> Total Income</td><td>"+(TotalIncome+AccStatsPos[itemlist2.indexOf("_other")])+"</td><td colspan='2'>Total Expenses</td><td>"+(TotalSpending+AccStatsNeg[itemlist2.indexOf("_other")])+"</td><td colspan='2'>Total Cash Flow</td><td>"+((TotalIncome+AccStatsPos[itemlist2.indexOf("_other")])+(TotalSpending+AccStatsNeg[itemlist2.indexOf("_other")]))+"</td><td></td><td></td>";
AccountingTableIncome.appendChild(AccountingTableIncomeTotal);
document.getElementById("auction").appendChild(AccountingTableIncome);
//mrreza(1,2,4,4);// does not work because more stupid things in same td...
}	 
	break;
	case "bids": //Gebote-Seite: Anzeige
{/************************************************************** Sende Gebote auf Server *********************************************************************************/
//mrreza1();
mrreza(2,4,5,7,0);
mrreza(2,4,5,7,1);
/************************************************************** ENDE von Sende Gebote auf Server *********************************************************************************/
}	 
	break;
	case "sell": //Verkaufs-Seite: Anzeige
{/************************************************************** Verkaus-Seite- Aktuelle Verkaefe *********************************************************************************/
mrreza(2,4,4,6,0);
mrreza(1,3,4,5,1);
}
	break;
	  default: // Kauf-Seite: Anzeige
{/************************************************************** *********************************************************************************/
mrreza(1,3,5,6,0);// brakes bidding
}
}

if(!isMarketPaused()){
switch(getPageLocation()){
case "acco": //Accounting
{/************************************************************** START Collecting Infos 
just empty atm...
*********************************************************************************/}
	break;
	case "bids": //Gebote-Seite: Lade Inhalte auf Server und loesche danach Inhalte
{/************************************************************** Sende Gebote auf Server *********************************************************************************/

/************************************************************** ENDE von Sende Gebote auf Server *********************************************************************************/
}	 
	break;
	case "sell": //Verkaufs-Seite: Erstelle Angebote
{/************************************************************** Verkaus-Seite- Aktuelle Verkaefe *********************************************************************************/
}
	break;
	  default: // Kauf-Seite: Biete auf Schnaeppchen
{/************************************************************** Biete auf Schnaeppchen *********************************************************************************/
var lang_Bieten = GM_getValue ( myacc() + "_lang_bid", "bid" );;
function btype (item){ //a aendern, b bieten, c zu wenig Silber +o falls offen... vorsicht Sprachabhaengig!!!
	try
	{
		var buttontxt = item.getElementsByTagName('a')[0].textContent;
		if(buttontxt!= lang_Bieten){return "a";}
		else if (item.getElementsByTagName('a')[0].getAttribute('class') !="bidButton openedClosedSwitch switchOpened") {return "bc" ;}
		else{ return "bo" ;}
	}
	catch(err)
	{
	return "c";
	}
	};

//Multiplicator
var m = "";
//get bid
var btable = document.getElementsByTagName('tbody')[0].firstChild;
if(version=="T4"){
var silver = document.getElementById('plusLink').childNodes[1].childNodes[3].childNodes[1].textContent;
//GM_log("Silber"+silver);
}
else{
var silver = document.getElementsByClassName('ajaxReplaceableSilverAmount')[0].textContent;
}
var silbermin = GM_getValue ( myacc() + "_MySilverMin", "1000000" );
var silverval = parseInt(silver)-silbermin;
//GM_log("Silber zur verfuegung="+silverval);
var bitable = false;
var item=btable.nextSibling;
for (var i=0;i<21;i++){
try
 {  
 while(item.nodeType!=1)
   {
   item=item.nextSibling;
 }
var test = 1;
try{test = item.getElementsByTagName('a')[0].getAttribute('class');}catch(err){test=0;}
//try{GM_log("Node if exists: "+item.childNodes[1].innerHTML) + " test="+test;}catch(err){GM_log("log_Err");}
if (item.childNodes[1].childNodes[1] && test)//pruefe ob normale Reihe
	{//GM_log("Node exists... normal row and button is labeled: "+item.getElementsByTagName('a')[0].textContent);
	var Iclas = item.childNodes[1].childNodes[1].getAttribute('class');
//	GM_log("Iclas="+Iclas);
	var thingval = parseInt(item.childNodes[3].textContent);//how many items
	var thingName = item.childNodes[3].textContent.split(" x ")[1].replace(/\s/g,"");
//	GM_log("thing="+thingName);
	var betsval = parseInt(item.childNodes[5].textContent);//how many bets
//	GM_log("betsval"+betsval);
	var priceval = parseInt(item.childNodes[7].textContent);//whats the price
//	GM_log("priceval"+priceval);
	var time = item.childNodes[9].textContent;
//	GM_log("time="+time);
	var timeval = parseInt(time);
//	GM_log("timeval"+timeval);
	var aid_href = item.getElementsByTagName('a')[0].search;
//	GM_log("aid_href"+aid_href);
	var aidPos1 = aid_href.search(/\&a=/);
	var aidPos2 = aid_href.search(/\&z=/);
	var aid = aid_href.substr(aidPos1+3 , aidPos2-aidPos1-3 );
	var friendsBidsArr = [];
	friendsBidsArr = getFriendsBids();
//	GM_log(" aid="+aid);
	if (aid) {} //Stats an server
	else{//wir haben Anfang von offenem Kasten
	aid = document.getElementsByTagName("input")[4].value;
	}
//GM_log("time="+time+" aid="+aid);
var type = btype (item);
//GM_log("btype="+type);
function getBuyPrice(Iclas,thingName){
itemlist3 = [
	"_helmet",	
	"_body",
	"_leftHand",	
	"_rightHand",
	"_shoes",	
	"_horse",
	"_other"
	];
if(include(itemlist3,Iclas.replace(/itemCategory itemCategory/,""))){
try{
return document.getElementById(thingName).textContent;
}
catch(err){
return "0";
}
//return "1";
}else{
return GM_getValue ( myacc() + Iclas.replace(/itemCategory itemCategory/,""), "0" );
}}
m=getBuyPrice(Iclas,thingName);
	var bidval =Math.floor(parseFloat(m) * thingval);
//GM_log("thing="+thingName+"; Log...priceval:"+priceval+"; type:"+type+"; bidval:"+bidval + "; betsval:"+betsval+"; m="+m);
if(include(friendsBidsArr,aid)){GM_log("1.Angebot von Freund an aid("+aid+")erkannt...list of aid:"+friendsBidsArr);bitable = false;} else 
if (type=="a") //selber schon geboten
	{
//GM_log("Selber Hoechster Bieter");
	item.style.color='#AACCAA';
	bitable = false;
	} 
	else if ( priceval>bidval || (priceval==bidval && betsval!=0) )//teure Items...
	{
//GM_log("Teuer...priceval:"+priceval+"; price:"+priceval+"; bidval:"+bidval + "; betsval:"+betsval+" und aid:" + aid);
	item.style.color='#CCAAAA';
	bitable = false;
	}
	else if ((type=="c") ||(bidval>silverval)) // zu wenig Silber...
	{
//GM_log("log log zu wenig Silber und aid:" + aid);
	item.style.color='#AAAACC';
	bitable = false;
	// i=23;
	// var	warten=100*warten;
	// if(timeval>1){warten= 1800000*timeval-100*warten;}
	// window.setTimeout ( function() { 
			// window.location.href = "http://"+window.location.hostname+"/hero_auction.php?action=bids";		
		// },
			// warten );
	// var wartenStd = Math.floor(warten/3600000);
	// var wartenMin = Math.floor((warten/60000)-wartenStd*60);
	// var wartenSec = Math.floor((warten/1000)-wartenStd*3600-wartenMin*60);
	// document.getElementById('warten').textContent = "sleeping " + wartenStd + ":"+wartenMin+":"+wartenSec+" of "+time;
	// bitable = true;

	}
	else if (type=="bc") //zum bieten oeffen...
	{
	{
//GM_log("log log Switch closed von aid"+aid);
	window.hrefvar = item.getElementsByTagName('a')[0].href;
	i=23;
	window.setTimeout ( function() { 
			window.location.href = window.hrefvar;		
		},
			warten );
	var wartenTxt = Math.round(warten/1000);
	document.getElementById('warten').innerHTML = "prepare bidding in <span class=\"my_counter\"> 00:00:0"+wartenTxt+"</span>";
	bitable = true;
	}
	}
	else // type ist bo
	{
//GM_log("Bieten!");
 {bitable = true;}
	}
	}
else if (bitable)
	{// Knoten ist aktiver Knoten
	if (bidval>silverval)
		{
		bidval=silverval;
		item.style.color='#AAAACC';
		}
	//Ausgabe
var HighestBidder = item.getElementsByTagName('span')[1].textContent;
if (HighestBidder == ""){HighestBidder="Multihunter";}
//GM_log("Highest Bidder="+HighestBidder);
var friends = new Array;
friends = GM_getValue ( myacc() + "_friends", "" ).split(",");
if(include(friends,HighestBidder)){
//GM_log("Freund "+HighestBidder+" wird nicht ueberboten");
aid = document.getElementsByTagName("input")[4].value;
//GM_log("neue aid" + aid);
addFriendsBid(aid);
bitable = false;
}else{
//GM_log("jetzt bieten!!!" + aid);
	document.getElementsByClassName('maxBid')[0].value= bidval ;
	if(version=="T4"){
	setTimeout ( function() { 
		document.getElementsByTagName('button')[15].click();
			},
			warten );
	var wartenTxt = Math.round(warten/1000);
	}else{
	setTimeout ( function() { 
		document.getElementsByClassName("auctionDetails")[0].getElementsByTagName("button")[0].click();
			},
			warten );
	var wartenTxt = Math.round(warten/1000);
	}
	document.getElementById('warten').innerHTML = "make bid in <span class=\"my_counter\"> 00:00:0"+wartenTxt+"</span>";
	i=23;
	}}
if (i != 23){
item=item.nextSibling;
}
}
catch(err)
{
GM_log("Loop broke, i=22 and Error" + err);
i=22;
}}
/************************************************************** ENDE von Biete auf Schnaeppchen *********************************************************************************/
if ( !bitable && silverval){
//GM_log("NextPage...");
var MyInstantSwitch = GM_getValue ( myacc() + "_MyInstantSwitch", "0" );
if (MyInstantSwitch>0){
	var pagenr = getPageNumber();
	if( MyInstantSwitch > pagenr ){//go to next page as usual
		var nextPage = loadNextPage(warten);
		if (!nextPage){startNewCycle(8000*warten, time);}}
	else{//sleep for time then start new cycle
		warten = timeToSeconds(time)*1000-10000;
		startNewCycle(warten, time);
	}
	}
else{
	var nextPage = loadNextPage(warten);
	if (!nextPage){startNewCycle(8000*warten, time);}}}
else if (!bitable){
warten = 2*3600000- 150*warten;//starte so in knapp 2 Stunden erneut...
startNewCycle(warten, time);
}
}
	break;
}
}
//GM_log("Code zuende... was vergessen?");