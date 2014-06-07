// Drinksmixer.com - Canadian Style!
// version 0.9 BETA
// 2006-07-28
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DrinksmixerToLCBO", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DrinksmixerToLCBO
// @namespace     http://www.redcardgroup.com/binks
// @description	  Links the website Drinksmixer.com to LCBO.ca by adding links that do searches for every ingredient on a drink's page
// @include       http://www.drinksmixer.com/*
// @include	  http://drinksmixer.com/*
// ==/UserScript==
// I would like to thank Mark Pilgrim for his excellent primer for Greasemonkey, located at http://diveintogreasemonkey.org/



var ings, thisIng, altTextme, ingredients;

var ingPick, firstIng;





var cutStart, cutStartLag, cutEnd, cutEndLag, insertPoint, cnt, pos, ingredient, link, line, complete;
pos=0;
cnt = 0;
cutStart = new Array();
cutEnd = new Array();
ingredient = new Array();
link = new Array();
line = new Array();

cutStart[0]=0;
cutEnd[0] = 0;



complete = document.createElement('HTML1');


	var tempIng = new Array();
	var alphabet = "abcdefghijklmnopqrstuvwxyz";

//finds the ingredient container
ings = document.evaluate(
    "//p[@id='cl']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


    thisIng = ings.snapshotItem(0);





//Determins how many ingredients there are to the drink
while(thisIng.innerHTML.indexOf('<br>', pos) !=-1){
pos = thisIng.innerHTML.indexOf('<br>', pos)+1;
cnt = cnt+1;
//alert(cnt);
}

//this loop runs once for each ingredient
for (var i = 1; i < cnt+1; i++) {

//cutStartLag is equal to the cutStart before the current cutstart; it's used to stop searches from finding the same text constantly (makes them find the next one)
//It could probably be eliminated without too much grief
//cutStart indicates the position on which the individual ingredient starts (allowing us to seperate it from the HTML tags)
	cutStartLag = cutStart[i-1];
	cutStart[i] = thisIng.innerHTML.indexOf("html",cutStart[i-1]+4);
	cutStart[i] = cutStart[i] + 6;


//cutEndLag is equal to the cutEnd before the current cutEnd; it's used to stop searches from finding the same text constantly (makes them find the next one)
//It could probably be eliminated without too much grief
//cutEnd indicates the position on which the individual ingredient ends (allowing us to seperate it from the HTML tags)
	cutEndLag = cutEnd[i-1];
	cutEnd[i] = thisIng.innerHTML.indexOf("<br>",cutEnd[i-1]+8);
	cutEnd[i] = cutEnd[i] - 4;

//alert(cutEnd[i]);


//alert ('waaa');


//Fills ingredient with a single ingredient
	ingredient[i] = thisIng.innerHTML.substring(cutStart[i], cutEnd[i]);
//alert (ingredient[i]);
 
//splits the ingredient into multiple words
	tempIng = ingredient[i].split(' ');




//We need to get rid of those stupid R symbols (for trademarks) since the LCBO hates them
for (var k = 0; k < tempIng.length; k++){

//If we can't find the letter in the alphabet, then we know it's a special character we need to remove
	if(alphabet.indexOf(tempIng[k].charAt(tempIng[k].length-1)) == -1){
		tempIng[k] = tempIng[k].substr(0, tempIng[k].length-1);
	}

}






//alert (tempIng.length);

//if the number of words is not one, put the first word back into ingredient, and then put in all the other words seperated by +
if(tempIng.length != 1){
	ingredient[i]=tempIng[0];



	for (var j = 1; j < tempIng.length; j++) {
		ingredient[i]= ingredient[i] + "+" + tempIng[j];
//alert (ingredient[i]);
	}
}
//Or, if it IS equal to one, make ingredient equal to that one word
else{
	ingredient[i] = tempIng[0];
}


//take our ingredient, put it into the right place in the LCBO search URL
link[i] = '  <a href="http://www.lcbo.ca/lcbo-ear/ProductResultsController?ITEM_NAME=' + ingredient[i] + '&ITEM_NUMBER=">LCBO Link</a>';



//	insertPoint = thisIng.innerHTML.indexOf("<br>");


//Create a new place to hold entire lines
	line[i]=document.createElement('HTML');

//This puts in everything from the previous cut end to the current cut end (which is everything between the last ingredient and the end of the current ingredient)
//We need the if statement so we don't loose the first four characters on the first line
if (i == 1){
	line[i].innerHTML = thisIng.innerHTML.substring(0, cutEnd[i]+4);
}else{
	line[i].innerHTML = thisIng.innerHTML.substring(cutEndLag+4, cutEnd[i]+4);
}

//we then put our link right after this chunk of text; putting our links just behind the ingredients in the page.  
	line[i].innerHTML = line[i].innerHTML + link[i];
//alert(line[i].innerHTML);


//then we drop all that we've done into a complete file that grows with each line.  
complete.innerHTML = complete.innerHTML + line[i].innerHTML;
    


}


//we then add in the P information and the end of P, so that the page formatting remains consistant
complete.innerHTML = '<p class="l1a" id="cl">' + complete.innerHTML + '</p>';
//alert(complete.innerHTML);

//then we drop it into the website!
   thisIng.parentNode.replaceChild(complete, thisIng);
