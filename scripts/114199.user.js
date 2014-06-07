// ==UserScript==
// @name          Travian Quick Building List
// @description   Creates a list that enables user to quickly jump to the selected building.
// @version       1.0
// @include       *.travian.*php*
// @exclude       http://forum.travian.*
// @exclude       http://www.travian.*
// ==/UserScript==

//This script creates a list of all the buildings and places it below the villages list for easy access
//Since using GIDs, it doesn't matter where you built your buildings in each village
//It offers GIDs for resource fields also, but I don't know how to differentiate between individual resource fields
//so I guess this doesn't work

//TODO:
//Detect which buildings exist in the active village and display only those
//Display building levels
//Display bulding names in different colours depending if at max level, upgradeable or unupgradeable
//Try to fix the problem with the resource fields (if possible)

var loc=window.location.href; // the current page href
var lang;
var blgName = new Array();

lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ );
if(!lang) {
	lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/ ).pop(); } 
else {
	lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop();
  }
blgName[lang] = new Array();

//To add your language simply add a case statement. Don't forget to add a "break;" at the end
//The first item in blgName is the title of the section. I guess it should state "Buildings" :)
//To change the order of buildings simply change the order of push statements
//To delete a certain building, delete the appropriate push statement
//Data that is added to blgName array is GID and the building name
//To get the GIDs visit Buildings section on help.travian.com
switch(lang){
  case ".us":
  case ".uk":
  case ".com":
  default: //default is English
    blgName[lang].push([0,"Buildings"]);
    blgName[lang].push([1,"Woodcutter"]);
    blgName[lang].push([2,"Clay Pit"]);
    blgName[lang].push([3,"Iron Mine"]);
    blgName[lang].push([4,"Cropland"]);
    blgName[lang].push([5,"Sawmill"]);
    blgName[lang].push([6,"Brickyard"]);
    blgName[lang].push([7,"Iron Foundry"]);
    blgName[lang].push([8,"Grain Mill"]);
    blgName[lang].push([9,"Bakery"]);
    blgName[lang].push([10,"Warehouse"]);
    blgName[lang].push([11,"Granary"]);
    blgName[lang].push([12,"Blacksmith"]);
    blgName[lang].push([13,"Armoury"]);
    blgName[lang].push([14,"Tournament Square"]);
    blgName[lang].push([15,"Main Building"]);
    blgName[lang].push([16,"Rally point"]);
    blgName[lang].push([17,"Marketplace"]);
    blgName[lang].push([18,"Embassy"]);
    blgName[lang].push([19,"Barracks"]);
    blgName[lang].push([20,"Stable"]);
    blgName[lang].push([21,"Workshop"]);
    blgName[lang].push([22,"Academy"]);
    blgName[lang].push([23, "Cranny"]);
    blgName[lang].push([24,"Townhall"]);
    blgName[lang].push([25,"Residence"]);
    blgName[lang].push([26,"Palace"]);
    blgName[lang].push([27,"Treasury"]);
    blgName[lang].push([28,"Trade Office"]);
    blgName[lang].push([29,"Great Barracks"]);
    blgName[lang].push([30,"Great Stable"]);
    blgName[lang].push([31,"City Wall"]);
    blgName[lang].push([32,"Earth Wall"]);
    blgName[lang].push([33,"Palisade"]);
    blgName[lang].push([34,"Stonemason"]);
    blgName[lang].push([35,"Brewery"]);
    blgName[lang].push([36,"Trapper"]);
    blgName[lang].push([37,"Hero's Mansion"]);
    blgName[lang].push([38,"Great Warehouse"]);
    blgName[lang].push([39,"Great Granary"]);
    blgName[lang].push([40,"WW"]);
}

var element = document.getElementById("lright1"); //get the appropriate div node
var form = document.createElement("div"); //create element
element.appendChild(form); //insert the element

htmltxt = '<br><span class="f10 c0 s7 b">';
htmltxt += blgName[lang][0][1];
htmltxt += ':</span>';
for(var i=1; i<blgName[lang].length; i++){
  htmltxt += '<li><a href="build.php?gid='+blgName[lang][i][0]+'">'+blgName[lang][i][1]+'</a></li>';
}
htmltxt += '';

form.innerHTML = htmltxt;
 