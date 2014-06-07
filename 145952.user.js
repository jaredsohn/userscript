// ==UserScript==
// @name MarvinCorp TF2B Backpack Loader
// @description Creates 2 new buttons on the tf2b website that allow you to view backpacks or change the backpack id that you are going to view
// @include http://tf2b.com/*
// @grant none
// ==/UserScript==

/*
Acknowledgement(s):
-w3schools for providing me the set and get cookie functions
-MarvinCorp for coding the code below (except for the set and get cookie functions... that's w3schools :D)
*/

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

/*
Property of MarvinCorp
======================
MarvinCorp TF2B Backpack loader w/ input!
feel free to modify the code below!
*/

function drawBtn(){
var spacer = document.createElement("br");

var btnElement = document.createElement("input");
btnElement.id = "btn";
btnElement.name = "btn";
btnElement.type = "Button";
btnElement.value = "View Backpack";
btnElement.style.width = "200px";

btnElement.onclick = inventoryLink;

var changeId = document.createElement("input");
changeId.id = "changeId";
changeId.name = "changeId";
changeId.type = "Button";
changeId.value = "Change ID";
changeId.style.width = "200px";

changeId.onclick = newID;

var location = document.getElementById("btnDocks");
location.appendChild(spacer);
location.appendChild(btnElement);
location.appendChild(spacer);
location.appendChild(changeId);

}

function newID(){
var changeId = document.getElementById("changeId");
var getId = getCookie("steamID");
var steamID = prompt("New Steam Id:", getId);

setCookie("steamID", steamID, 365);
alert("Cookie has been written!\nNew Content: " + steamID);
}

function inventoryLink(){
var getId = getCookie("steamID");
location.replace("http://tf2b.com/tf2/" + getId);
}

function createDiv(){
var motd = document.getElementById("motd");
motd.style.height = "100px";

var newDiv = document.createElement("div");
newDiv.name = "btnDocks";
newDiv.id = "btnDocks";

var location = document.getElementById("motd");
location.appendChild(newDiv);
}

function init(){
createDiv();
drawBtn();

var getId = getCookie("steamID");

if (getId != null && steamID != ""){}
else
{
alert("Welcome new user! Please take a moment to fill in your own Steam ID in the dialog!\nPress OK to cotinue");
newID();
}
}

init();