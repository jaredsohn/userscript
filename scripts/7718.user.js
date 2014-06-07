// ==UserScript==
// @name          Bench Players on Yahoo Fantasy Basketball
// @namespace     http://pajamadesign.com
// @author        Jacob Singh
// @description   Will Bench Players who aren't playing on the day you're looking at.
// @include       http://basketball.fantasysports.yahoo.com/nba/*
// ==/UserScript==

var statTab = document.evaluate(
    "//table[@class='teamtable']/tbody/tr",
    document,
    null,
    XPathResult.ANY_TYPE,
    null);

//console.log(statTab)
thisPlayer = statTab.iterateNext();

while(thisPlayer) {

////console.log(thisPlayer);


var oppCell = document.evaluate(
    "td[@class='player']",
    thisPlayer,
    null,
    XPathResult.ANY_TYPE,
    null);
oppVal = oppCell.iterateNext();
////console.log(oppVal.innerHTML);

var oppCell = document.evaluate(
    "td[@class='opp']",
    thisPlayer,
    null,
    XPathResult.ANY_TYPE,
    null);
oppVal = oppCell.iterateNext();

if(oppVal.innerHTML == "&nbsp;") {
    var editCell = document.evaluate(
    "td[@class='edit']/select",
    thisPlayer,
    null,
    XPathResult.ANY_TYPE,
    null);
    posSelect = editCell.iterateNext();
    if(posSelect) {
        //console.log(posSelect);
        for (var i=0; i < posSelect.options.length; i++) {
                if (posSelect.options[i].value == "BN")  {
                    //console.log("hi")
                posSelect.options[i].selected = true;
            }
        }
     
    }
}
//console.log(oppVal.innerHTML);

thisPlayer = statTab.iterateNext();
}
