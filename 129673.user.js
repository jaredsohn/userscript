// ==UserScript==
// @name Storm8Fix
// @namespace http://www.untouchablehacks.com
// @description Fixs some problems with running Storm8 games through firefox
// @include http://im.storm8.com/*
// @include http://wwar.storm8.com/*
// @include http://nl.storm8.com/*
// @include http://rl.storm8.com/*
// @include http://vl.storm8.com/*
// @include http://pl.storm8.com/*
// @include http://kl.storm8.com/*
// @include http://zl.storm8.com/*
// @include http://rol.storm8.com/*
// ==/UserScript==
document.body.style.background = "#000000";

//Remove Adds
var arr = document.getElementsByClassName("messageBoxSuccess");
for (i = 0; i < arr.length; i++)
{
if(arr[i].textContent.indexOf("More FREE Games:") != -1)
{
arr[i].style.display = 'none';
}
if(arr[i].textContent.indexOf("Play Pet Shop Story for FREE! Design and run your very own pet shop today!") != -1)
{
arr[i].style.display = 'none';
}
}
//End Remove Adds

//Menu Bar
var menu = '';
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('home.php');\" type=\"button\">Home</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('bank.php');\" type=\"button\">Bank</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('equipment.php?cat=1');\" type=\"button\">Weapons</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('equipment.php?cat=2');\" type=\"button\">Protection</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('equipment.php?cat=3');\" type=\"button\">Vehicles</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('fight.php');\" type=\"button\">Fight</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('missions.php');\" type=\"button\">Missions</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('investment.php');\" type=\"button\">Investment</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('hospital.php');\" type=\"button\">Hospital</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('profile.php?x=1&selectedTab=main');\" type=\"button\">Profile</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('profile.php?x=1&selectedTab=skill');\" type=\"button\">Skills</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('profile.php?x=1&selectedTab=loot');\" type=\"button\">Loot</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('profile.php?x=1&selectedTab=comment');\" type=\"button\">Comments</button>";
menu += "<button style=\"height: 25px; width: 100%\" onclick=\"javascript:window.location=('group.php');\" type=\"button\">Group</button>";

menuobj = document.createElement('ul');
menuobj.style.position = 'fixed';
menuobj.style.bottom = '0px';
menuobj.style.left = '0px';
menuobj.style.width = "100px";
menuobj.style.height = "100%";
menuobj.style.padding = "0";
menuobj.style.backgroundColor = '#2d2d2d';
menuobj.innerHTML = menu;
body = document.getElementsByTagName('body')[0];
body.appendChild(menuobj);
//End Menu Bar

//Equipment Fix
if(document.URL.indexOf("equipment.php") > 0){
createSellLink();
createTabLink();
}
//End Equipment Fix

//RealEstate Fix
if(document.URL.indexOf("investment.php") > 0){
createSellLinkInvest();
createTabLink();
}
//End RealEstate Fix


//Equipment Functions
unsafeWindow.loadme = function(cats){
loadXMLDoc(cats);
}

//javascript:new%20storm8.ajax.Request('ajax/getItemList.php?cat=2&url=%2Fequipment.php',%20{updateElement:%20'equipmentContent',%20onComplete:%20hideMessages}).send()
function loadXMLDoc(page)
{
var xmlhttp;
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange=function()
{
if (xmlhttp.readyState==4 && xmlhttp.status==200)
{
document.getElementById("equipmentContent").innerHTML=xmlhttp.responseText;
createSellLink();
}
}
xmlhttp.open("GET","ajax/getItemList.php?cat=" + page,true);
xmlhttp.send();
}
function createTabLink(){
var arLinks = document.links;
var cat = "";
for (var i = 0; i <= arLinks.length - 1; i++) {
var elmLink = arLinks[i];
if(elmLink.href.indexOf("getItemList.php") > 0){
//alert(elmLink.href.indexOf("cat="));
cat = elmLink.href.substring((elmLink.href.indexOf("cat=") + 4),elmLink.href.indexOf("&"));
elmLink.setAttribute("onclick","loadme(" + cat + ")");
elmLink.href = "#";
}
}
}
function createSellLink(){
var arLinks = document.links;
var theh = "";
var cat = "";
for (var i = 0; i <= arLinks.length - 1; i++) {
var elmLink = arLinks[i];


if(elmLink.href.indexOf("buy") > 0){
theh = elmLink.href.substring((elmLink.href.indexOf("&h=") + 3));
}

if(elmLink.href.indexOf("sellEquip") > 0){

var url = "", itemId = "", catId = "", itemName = "", itemNumber = "", nonce = "", sellText = "";
var temp = elmLink.href.replace("javascript:sellEquipmentDialog('","");
temp = temp.replace(/,%20/g,",");
temp = temp.replace(/'/g,"");

var values = temp.split(",");
url = values[0];
itemId = values[1];
catId = values[2];
itemName = values[3];
itemNumber = values[4];
nonce = values[5];
sellText = values[6];

if (url.indexOf('equipment') == -1)
{
	url = "/equipment.php";
}

var urlJoiner = "&";
if (url.indexOf('?') == -1 && url.indexOf('%3F') == -1) {
urlJoiner = "?";
}
url = escape(url) + urlJoiner + "action=sell&iid=" + itemId + "&cat=" + catId +
"&formNonce=" + nonce + "&h=" + theh;
elmLink.href="" + url +
"";

}
}
}
//End Equipment Functions

//Investment Functions
function createSellLinkInvest(){
var arLinks = document.links;
var theh = "";
var cat = "";
for (var i = 0; i <= arLinks.length - 1; i++) {
var elmLink = arLinks[i];


if(elmLink.href.indexOf("ion=buy") > 0){

theh = elmLink.href.substring((elmLink.href.indexOf("&h=") + 3));
}

if(elmLink.href.indexOf("sellInvest") > 0){

var url = "", itemId = "", catId = "", itemName = "", itemNumber = "", nonce = "", sellText = "";
var temp = elmLink.href.replace("javascript:sellInvestmentDialog('","");
temp = temp.replace(/,%20/g,",");
temp = temp.replace(/'/g,"");

var values = temp.split(",");
url = values[0];
itemId = values[1];
itemName = values[2];
itemNumber = values[3];
nonce = values[4];
action = values[5];

var urlJoiner = "&";
if (url.indexOf('?') == -1 && url.indexOf('%3F') == -1) {
urlJoiner = "?";
}
url = url + "?action=sell&inv_id=" + itemId + "&formNonce=" + nonce;
elmLink.href="" + url +
"";

}
}


}
//End Investment Functions

//Bank Functions
unsafeWindow.showKeypad = function(inputElement)
{

}
//End bank Functions