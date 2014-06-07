// ==UserScript==
// @name           Incoming Attacks Coords
// @namespace      
// @description    Adds Coords to the Incoming attack screen
// @include        http://*.ikariam.*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.0 (15/07/2009)

//
// Finds all city links on the Alliance page and saves them for use on IncomingAttacks page
//


// Checks for Embassy page 

if (document.body.id == "embassy")
{


//Gets all City Links
var CityLinks
var thisLink
CityLinks = document.evaluate(
    '//a[@class="city"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


//Loops through each city
savedata=""
for (var i=1;i<CityLinks.snapshotLength;i++)
{ 
thisLink = CityLinks.snapshotItem(i)



//Searches text string for IDnumber
var str=thisLink.href;
var Patt1 = new RegExp("selectCity=([^&#]*)");
var result = Patt1.exec(str);

//Saves Town Name and corresonding IDnumber
savedata += result[1]
savedata += "_"
savedata += thisLink.textContent
savedata += "::"


}//End For

GM_setValue("cityID",savedata)



}//End If



//
// Matches City ID number from savedata with incoming target and add coords
//


//Checks IncomingAttacks page
if (document.body.id == "embassyGeneralAttacksToAlly")
{


//Gets cityIDs array from savedate
var cityIDs = GM_getValue("cityID","Error").split("::")


//Gets all Attacks
var Attacktr
var thistd
Attacktr = document.evaluate(
    '//tr[@class="rowRanks"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


//Loops through each Attack Row

for (var i=0;i<Attacktr.snapshotLength;i++)
{ 
thistd = Attacktr.snapshotItem(i).childNodes[9].childNodes[0]

//Searches text string for IDnumber
var str=thistd.href;
var Patt1 = new RegExp("cityId=([^&#]*)");
var result = Patt1.exec(str);

//Match cityName from savedata to target town and returns cityIdNo 
for (var j=0;j<cityIDs.length;j++)
{ 
var cityID = cityIDs[j].split("_")
cityNo = cityID[0]
cityName = cityID[1]

if (cityNo ==  result[1])
{
var cityIdNo = cityNo 
var cityIdName = cityName
}//End If

}//End For

var cityCoords = "[" + cityIdName.split("[")[1]
var cityLink = "?view=island&cityId="+cityIdNo

newLink = document.createElement('a');
newLink.innerHTML= thistd.textContent + " " + cityCoords
newLink.href=cityLink

thistd.parentNode.replaceChild(newLink,thistd)


//addtd = document.createElement('td');
//addtd.innerHTML=cityCoords
//addtd.style.color="blue"
//addtd.style.fontWeight="bold"
//thistd.parentNode.insertBefore(addtd, thistd.nextSibling)



}//End For

//alert ("Done")


//
//Adds a link to Allaince message
//

//Gets ContentBox
var ContentBox
var thisBox
ContentBox = document.evaluate(
    '//div[@class="contentBox01h"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

thisBox = ContentBox.snapshotItem(0)

newDiv=document.createElement('div')
newDiv.setAttribute("class","centerButton")

newa=document.createElement('a')
newa.setAttribute("href","?view=sendIKMessage&msgType=51&allyId=8")
newa.setAttribute("class","Button")
newa.innerHTML= "Inform Allaince"

newDiv.appendChild(newa)

thisBox.insertBefore(newDiv,thisBox.childNodes[2])



}//End If


