// ==UserScript==
// @name           Hideout Travel Times
// @namespace      
// @description    Add travel times to Hideout Page
// @include        http://*.ikariam*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// Version 1.2 (17/07/2009)

//Function for sorting numbers
function sortNumber(a,b)
{
return a - b;
}



//Checks for correct 'Hideout' page
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




//Get x and y coords of home town

var backtotheislandLinks
backtotheislandLinks = document.evaluate(
    '//a[@title="Back to the island"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


var str = backtotheislandLinks.snapshotItem(0).textContent
var split = str.split(":");

var str = split[0];
var patt1 = /\d/g;
var result = str.match(patt1);
var homexcoord = result[0].concat(result[1])

var str = split[1]; 
var patt1 = /\d/g;
var result = str.match(patt1);
var homeycoord = result[0].concat(result[1])


//Get all Lists relating to each Spy 
var ResidenceLists
var thisList
ResidenceLists = document.evaluate(
    '//li[@title="Residence"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var position = 0
var timeorder = new Array()
var divorder = new Array()

//Loop through all Spys
for (var i=0;i<ResidenceLists.snapshotLength;i++)
{ 
thisList = ResidenceLists.snapshotItem(i)


//Get x and y coords of target town
var str=thisList.textContent;
var a = str.split("\(")
var split = a[1].split(",");

var str = split[0]; 
var patt1 = /\d/g;
var result = str.match(patt1);
var xcoord = result[0].concat(result[1])

var str = split[1]; 
var patt1 = /\d/g;
var result = str.match(patt1);
var ycoord = result[0].concat(result[1])


//Calculate travel time
var traveltime = Math.round(1200*Math.sqrt(((homexcoord-xcoord)*(homexcoord-xcoord))+((homeycoord-ycoord)*(homeycoord-ycoord))))
if (traveltime == 0){traveltime = 600}

var hours = Math.floor(traveltime/3600)
var minutes = Math.floor((traveltime-(hours*3600))/60)
var seconds = traveltime - (minutes*60) - (hours*3600)

//Convert traveltime into a formatted string
var timestring=""
if (hours != 0){timestring += hours+"h "}
if (minutes != 0){timestring += minutes+"m "}
if (seconds != 0){timestring += seconds+"s"}

//Add a new line under target town showing travel time
addText = document.createElement('p');
addText.innerHTML="Travel time "+timestring
addText.style.color="blue"
addText.style.fontWeight="bold"
thisList.parentNode.insertBefore(addText, thisList.nextSibling)


//Populate arrays for later sorting
timeorder[position] = traveltime+(position/100)
divorder[position] = thisList.parentNode.parentNode.cloneNode(true)
position++

}//End for


//Sorts by traveltime 
timeorder.sort(sortNumber)

//Gets the div data will be added to and deleted from
var classDivs
var contentdiv
classDivs = document.evaluate(
    "//div[@class='spyinfo']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

contentdiv = classDivs.snapshotItem(0).parentNode

//loops for each spy, gets the reference posistion, adds relevant 'spyinfo' div to end, and deletes an existing one       
var refposition
for (var j=0;j<timeorder.length;j++)
{ 
refposition = Math.round((timeorder[j]-Math.floor(timeorder[j]))*100)

contentdiv.insertBefore(divorder[refposition], contentdiv[0])
contentdiv.removeChild(contentdiv.getElementsByTagName('div')[0])

}//End For

}//End If

