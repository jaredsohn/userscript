/*
Better GWT (c) les-newsgroup 2011

Find support for 'Better GWT' on our forum : http://forum.les-newsgroup.fr


********* LICENSE*********

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


********* METADATA *********
// ==UserScript==
// @name           Better GWT
// @namespace      www.les-newsgroup.fr
// @description    Add features to Google Webmaster Tools for a better visibility of your best keyword positions
// @include	http://www.google.*webmasters/tools/top-search-queries*
// @include	https://www.google.*webmasters/tools/top-search-queries*
// @version		1.0
// ==/UserScript==

*********CHANGELOG*********
*/

var DEBUG=false;



//Main
if(document.styleSheets.length!=0)
	var sty = document.styleSheets[document.styleSheets.length - 1];
else
	var sty = null;
	
var colorBestPos='#B3D6A4';
// var colorFirstPagePos='#FECC86';
var colorFirstPagePos='#FBF2A5';
var colorOtherPagesPos='#D4C689';	
var colorUp='#5AB334';
var colorDown='#F46262';

var numberMaxBestPos=3;
var numberMaxFirstPagePos=10;
var numberEvolAlertLevel=10.0;
// var numberDownAlertLevel=10.0;

	
// var resultsTable=document.getElementById('grid');
	
sty.insertRule("table#grid tr:hover { background-color: #D4D3D3 ! important; }", 0);


highlightPositions();




function highlightPositions() {

	var TR = document.evaluate( '//table[@id="grid"]//tr[@class="odd" or @class="even"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for(i=0;i<TR.snapshotLength;i++) {
	
		thePos=parseInt(TR.snapshotItem(i).getElementsByClassName('number position')[0].textContent);
		if(thePos <= numberMaxBestPos)
			colorize(TR.snapshotItem(i), colorBestPos);
		else if(thePos <= numberMaxFirstPagePos)
			colorize(TR.snapshotItem(i), colorFirstPagePos);
			
		posEvolution=parseInt(TR.snapshotItem(i).getElementsByClassName('rightmost delta')[0].textContent);
		if(Math.abs(posEvolution)>=numberEvolAlertLevel){
			colorize(TR.snapshotItem(i).getElementsByClassName('rightmost delta')[0], (posEvolution>0?colorUp:colorDown));
			TR.snapshotItem(i).getElementsByClassName('rightmost delta')[0].firstElementChild.setAttribute('style', 'color:#000;');
		}

	}
}


function colorize(node, color, other) {

	node.setAttribute('style', 'background-color:' + color + ';');

}



