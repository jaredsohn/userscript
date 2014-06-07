// Written by Lior Zur, January 2007

// ==UserScript==
// @name           Logic Auto-Checker
// @namespace      http://mywebsite.com/myscripts
// @description    Automatically checks whether students reported on time.
// @include        file://*logic*
// @include        http://www2.tau.ac.il/Logic/logic.asp*
// ==/UserScript==


//Correct deadlines for group 1: 2007
//                              0 1  2  3  4  5  6  7  8  9 10 11
var deadlineMonth   = new Array(0,0,10,11,11,11,11,12,12,12,12, 1);
var deadlineDay     = new Array(0,0,28, 4,11,18,25, 2, 9,16,30, 6);
//
var deadlineCorrect = new Array(0,11,16,14,12,14, 5,20,24,14, 7, 7); // That's 80% of total, rounded down.



/*
var deadlineMonth   = new Array(0,10,11,11,11,11,12,12,12,12, 1, 1);
var deadlineDay     = new Array(0,29, 5,12,19,26,10,10,17,24, 7,14);
//
var deadlineCorrect = new Array(0,11,16,14,12,14, 5,20,24,14, 7, 7); // That's 80% of total, rounded down.
*/

// Deadlines for (6) were extended by one week.
//var deadlineDay     = new Array(0,29, 5,12,19,26, 3,10,17,24, 7,14);

//Correct deadlines for group 2:
//                              0  1  2  3  4  5  6  7  8  9 10 11
//var deadlineMonth   = new Array(0,11,11,11,11,11,12,12,12, 1, 1, 1);
//var deadlineDay     = new Array(0, 1, 8,15,22,29,13,13,20, 3,10,17);
// Deadlines for (6) were extended by one week.
//var deadlineDay     = new Array(0, 1, 8,15,22,29, 6,13,20, 3,10,17);
//

var curColumn;
var curDay;
var curMonth;
var curCorrect;

//The 3rd row onwards is student records.
//In each row there are 14 TDs, from 14 to 1, in which there are records for each chapter.
//Inside each TD there are <A>s with the date and SPANs with the number of correct answers. (in text form).

var allElements, thisElement, anotherElement, newElement;
var f, g, h, i;
var allTR, thisTR;
var allTD, thisTD;
var allSpan, thisSpan;
var allA, thisA;
var outputText;
var cellPassed;
var results;

allElements = document.evaluate("//table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (allElements.snapshotLength > 0){
	thisElement = allElements.snapshotItem(0);
	GM_log("found table");
	allTR = thisElement.getElementsByTagName('tr'); //elements is a live NodeList of found elements in the order they appear in the tree.
	for (g = 2; g < allTR.length; g++) { //FOR Each ROW:
		thisTR = allTR[g];
		allTD = thisTR.getElementsByTagName('td'); 
		for (f = 0; (f < allTD.length)||(f < 14); f++) { //FOR Each TD ( "14 - f" would be current column)
			cellPassed = false;
			thisTD =  allTD[f];
			allA    = thisTD.getElementsByTagName('a'); 
			allSpan = thisTD.getElementsByTagName('span');
			if (allA.length != allSpan.length){GM_Log("Error, <a>'s and <span>'s don't match!");}
			if (allA.length > 0){
				for (i = 0; i < allA.length; i++){//for every submitted score:
					thisA    = allA[i];
					thisSpan = allSpan[i];
					results = /(\d\d)\/(\d\d)/.exec(thisA.text); //adding gi will cause bugs. (check if defining results anew each cycle solves this).
					//GM_log(thisA.text + " "+ thisSpan.textContent);
					//GM_log("checking the score:");
						if (results){
							//GM_log("RegEx works.");
							var curCol = 14 - f;
							//### Retrieve Dates and Scores, and compare if they're good.
							curMonth = parseInt(results[2],10); //Must use 10 or BUG will happen. http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256C85006A6604
							curDay   = parseInt(results[1],10);
							curCorrect = parseInt(thisSpan.textContent);
							//GM_log("\n" + curDay  + "/" + curMonth +"====>" + curCorrect+ "\n"+ deadlineDay[curCol] + "/" + deadlineMonth[curCol] +"---->" + deadlineCorrect[curCol]);
							var dateIsGood = false;
							var scoreIsGood = false;
							//if monthes are January / February, make them the 13th or the 14th (so as to allow for December[12] being prior to January[13])
							if (deadlineMonth[curCol] <=2) {deadlineMonth[curCol]+=12} 
							if (curMonth <=2) 			   {curMonth+=12}
							if (curMonth < deadlineMonth[curCol]) {dateIsGood = true; }
							if ((curMonth == deadlineMonth[curCol])&&(curDay<=deadlineDay[curCol])) {dateIsGood = true; }
							if (curCorrect >= deadlineCorrect[curCol]){scoreIsGood = true;}
							//DEBUGGING:
							//GM_log("\n" + curDay + "/" + curMonth + "<=== Processed date.\n" + thisA.text +"<====Original.");
							if ((curDay == 0)||(curMonth == 0)){
							GM_log("BUG. Row is: " + g + " col is: " + curCol + "*** Current: " +curDay + "/" + curMonth + " should be:" + thisA.text
							+ "\n results[1]+[2]:" + results[1] + " " + results[2]
							+ "\n NOTE: Results of this script are not to be trusted (there will be false positives!)." );
							}
							//if (g==10){GM_log("\n" + curDay  + "/" + curMonth +"====>" + curCorrect+ "\n"+ deadlineDay[curCol] + "/" + deadlineMonth[curCol] +"---->" + deadlineCorrect[curCol]);
							//}
							//### If dates/scores aren't good, color the problem:
							if (!dateIsGood){
								thisA.style.backgroundColor = "orange";
							}
							if (!scoreIsGood){
								thisSpan.style.backgroundColor = "orange";
							}						
							//### If all is good, toggle.	
							if ((dateIsGood)&&(scoreIsGood)) {
							 	cellPassed = true;  //At long last!!!
							 }
							
						}//no results for RegEx
					}//end for every submitted score.
				
			} else {//if no submitted score was found...
				cellPassed = false; //This is redundant.
			}
			
			
			if (cellPassed) {
				thisTD.bgColor = "yellow";
				//GM_log("passed");
			}else{
				//mark TD as bad. (probably not necessary)
			}
		}//end for each td
	}//end for each row
}//end if foundTable.

/*
To do list for further distribution:
1. Allow for different months. (check first and last months and stretch accordingly)
2. Allow for easy input of custom deadlines.
(probably an HTML form should be used for this... but it ain't gonna be pretty).
*/


/*
allSpan = document.getElementsByTagName('span');
s = allSpan[0];
*/


