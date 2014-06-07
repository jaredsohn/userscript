// ==UserScript==
// @name           Spy Report Pillage Link
// @namespace      
// @description    Adds a Pillage Town link from the Spy Report Page
// @include        http://*.ikariam.*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.0 (17/05/2009)

//
// Finds all city links on the Hideout page and saves them for use on SpyReport page
//


// Checks for 'Hideout' page 
var classLists
classLists = document.evaluate(
    "//li[@class='selected']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

if (classLists.snapshotItem(0) != null){
var check = classLists.snapshotItem(0).childNodes[0].textContent
}

if (document.body.id == "safehouse" && check == "Hideout")
{


//Gets all city links
var ResidenceLists
var thisLink
ResidenceLists = document.evaluate(
    '//li[@title="Residence"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


//Loops through each city
savedata=""
for (var i=0;i<ResidenceLists.snapshotLength;i++)
{ 
thisLink = ResidenceLists.snapshotItem(i).childNodes[1]

//Searches text string for IDnumber
var str=thisLink.href;
var Patt1 = new RegExp("id=([^&#]*)");
var idno = Patt1.exec(str);

//Get x and y coords of target town
var str=thisLink.textContent;
var split = str.split(",");

var str = split[0]; 
var patt1 = /\d/g;
var result = str.match(patt1);
var xcoord = result[0].concat(result[1])

var str = split[1]; 
var patt1 = /\d/g;
var result = str.match(patt1);
var ycoord = result[0].concat(result[1])

var coord = xcoord+","+ycoord

//Saves Town Name and corresonding IDnumber
savedata += thisLink.title+"_"+idno[1]+"_"+coord+"::"


}//End For


//Get current town
var backtothetownLinks
backtothetownLinks = document.evaluate(
    '//a[@title="Back to the town"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


var homecityname = backtothetownLinks.snapshotItem(0).textContent


GM_setValue(homecityname,savedata)

}//End If



//
// Matches City ID number from savedata with target town and adds pillage link 
//


//Checks correct SpyReport page
if (document.body.id == "safehouseReports")
{


//Get current town
var backtothetownLinks
backtothetownLinks = document.evaluate(
    '//a[@title="Back to the town"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


var homecityname = backtothetownLinks.snapshotItem(0).textContent


//Gets cityIDs array from savedata
var cityIDs = GM_getValue(homecityname,"Error").split("::")


//Find name of target town.
var thisRow
var tableRow
var tableData
tableRow = document.getElementsByTagName('tr')
targettown = tableRow[1].childNodes[3]


//Match cityName from savedata to target town and returns cityIdNo 
for (var i=0;i<cityIDs.length;i++)
{ 
var cityID = cityIDs[i].split("_")
cityName = cityID[0]
cityNo = cityID[1]
cityCoords = cityID[2]

if (cityName ==  targettown.textContent)
{
var cityIdNo = cityNo
var displayCoords = cityCoords 
}//End If

}//End For

var pillageAddress = "?view=plunder&destinationCityId="+cityIdNo
//var islandAddress = "?view=island&id="+cityIdNo

//Replaces name of target town with name+coords of town
if (targettown)
{
newText = targettown.childNodes[0].textContent
newText += " ("+displayCoords+")"

targettown.innerHTML=newText
}



//Creates new anchor element linking to pillage of target town page and adds it to target town text  
if (targettown) 
{
newLink = document.createElement('a');
newLink.innerHTML="--Pillage--"
newLink.href=pillageAddress
newLink.style.class="job"

targettown.parentNode.parentNode.insertBefore(newLink, targettown.parentNode.nextSibling)
}



var backToDiv
backToDiv = document.evaluate(
    '//div[@id="backTo"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

sidebarDiv = backToDiv.snapshotItem(0)

newList=document.createElement('tbody')


newdyDiv=document.createElement('div')
newdyDiv.setAttribute("class","dynamic")
newdyDiv.setAttribute("id","actioncontainer")

newh3=document.createElement('h3')
newh3.setAttribute("class","header")
newh3.innerHTML="Pillage"

newcontDiv=document.createElement('div')
newcontDiv.setAttribute("class","content")

newa=document.createElement('a')
newa.setAttribute("href",pillageAddress)
newa.setAttribute("title","Pillage")

newimg=document.createElement('img')
newimg.setAttribute("src","skin/actions/plunder.gif")
//newimg.setAttribute("width","120")
//newimg.setAttribute("height","75")

newspan=document.createElement('span')
newspan.setAttribute("class","job")
newspan.innerHTML="--Pillage--"

newfooterdiv=document.createElement('div')
newfooterdiv.setAttribute("class","footer")



newa.appendChild(newimg)
newa.appendChild(newspan)

newcontDiv.appendChild(newa)

newdyDiv.appendChild(newh3)
newdyDiv.appendChild(newcontDiv)
newdyDiv.appendChild(newfooterdiv)

sidebarDiv.parentNode.insertBefore(newdyDiv, sidebarDiv)



}//End If

