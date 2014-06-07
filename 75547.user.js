// ==UserScript==
// @name	Sugar Stats - Add Printable Version Link
// @namespace   http://userscripts.org/scripts/show/75547   
// @description This script will allow a SugarStats user to enable a printable version of their sugar entries for a given date.
// @include https://manage.sugarstats.com/stats/* 
// ==/UserScript==

//CHECK IF THE PRINTABLE VERSION IS ALREADY LOADED AND IF SO, DO NOT RUN THE SCRIPT
window.addEventListener('load',function(e) { if (document.getElementById('GMprintMode')==null) { AddPrintLink(); } },true);

//ADD THE PRINT LINK TO THE SUGARSTATS PAGE
function AddPrintLink() {
	var detailEntries = document.getElementById('all-entries-section');
	var detailEntriesValues = detailEntries.innerHTML;

	detailEntries.innerHTML= "<div id=\"mpnPrintContainer\" style=\"text-align: right;\"><a  href=\"\" id=\"mpnPrint\">Printable Version - by MPN</a></div>" + detailEntriesValues;
	addLinkListener();
}

//MADE THE LINK CLICKABLE
function addLinkListener() {
	var myPrintLink = document.getElementById('mpnPrint');
	myPrintLink.addEventListener('click',printContent,true);
}

//WHAT TO DO WHEN THE LINK IS CLICKED
function printContent() {
	var detailEntries = document.getElementById('all-entries-section');
	var summaryTrends = document.getElementById('trends-section');
	var dateEntry = document.getElementById('main').getElementsByTagName('h1')[0].innerHTML;
        var graphTrends = document.getElementById('graphs-section');
	var WindowObject = window.open('', "TrackHistoryData", "width=740,height=500,top=200,left=250,toolbars=no,scrollbars=yes,status=no,resizable=no");
	WindowObject.document.writeln("<html><head><link type=\"text/css\" rel=\"stylesheet\" href=\"http://manage.sugarstats.com/stylesheets/base_packaged.css\"></head><body>");
                WindowObject.document.writeln("<div id=\"GMprintMode\" style=\"display: none;\"></div>");
                WindowObject.document.writeln("<div style=\"text-align: right;\"><h1>" + dateEntry + "</h1></div>");
		WindowObject.document.writeln("<h3>Comments:</h3><textarea cols=\"40\" rows=\"1\"></textarea>");
                WindowObject.document.writeln(graphTrends.innerHTML);
		WindowObject.document.writeln(summaryTrends.innerHTML);
		WindowObject.document.writeln(detailEntries.innerHTML);
                WindowObject.document.writeln("</body></html>");
                WindowObject.document.getElementById('mpnPrintContainer').style.visibility='hidden';
		WindowObject.document.close();
		WindowObject.focus();
}