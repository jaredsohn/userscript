// ==UserScript==
// @name          ABN-AMRO Mutations download
// @namespace     http://www.pitr.net/
// @description   Enables you to download ABN AMRO mutations in a machine-readable format.
// @include       https://www.abnamro.nl/nl/paymentsreporting/viewmutations/*/*.html
// ==/UserScript==

// start url: https://www.abnamro.nl/nl/paymentsreporting/viewmutations/customer<internalid>/page<index#>.html

// Note: This script is dirty, and does not represent any javascript coding skills.
//       It was based on http://userscripts.org/scripts/show/3420

function genSummary()
{
	// Get the account number first
	var rekObj = document.evaluate( "/html/body/div[@id='dbody']/table[@id='tbody']/tbody/tr/td[@id='tcontent']/div[@id='dcontent']/form[@id='mutationsOverviewForm']/table[1]/tbody/tr[2]/td/select[@id='accountNumberFromList']/option", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var rek = rekObj.value;
	var allDivs = document.evaluate( "//tr[@class='pb11']", document, 
			null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


	var g = "";
	var csvOut = "";
	for (i = 0; i< allDivs.snapshotLength ;i++)
	{
		var row = allDivs.snapshotItem(i);
		
		var renteStr 		= row.childNodes[0].textContent;
		var rentedatum 		= renteStr.substring(renteStr.length - 10);
		var omschrijving 	= row.childNodes[1].textContent;
		var bedrag		= row.childNodes[3].textContent;
		if(bedrag.length == 1) {
			bedrag 		= row.childNodes[2].textContent;
		}
		csvOut = csvOut + 
			rek+"       EUR     "+rentedatum+"    ??   ??    "
			+rentedatum+"    "+bedrag+",    "+omschrijving
			+"\n";
	}
	// Enable this for loading in a seperate tab
	//GM_openInTab("data:text/csv;charset=UTF-8,"+  encodeURI(csvOut));
	writeCSV(csvOut);
}
function writeCSV(textToWrite)
{
	openWindow=window.open("#foo", "newwin2", "height=700, width=700,toolbar=no,menubar=yes");
	openWindow.document.open("text/csv", "replace");
	openWindow.document.write(textToWrite)
	openWindow.document.close();
}


function createButton1(target, func, title, width, height, src) {
    var img, button;
    img = document.createElement('img');
    img.width = width;
    img.height = height;

    img.src = src;
    button = document.createElement('a');
    button._target = target;
    button.title = title;
    button.href = '';
   
    button.appendChild(img);
	
	button.addEventListener('click',
                           function(e) { genSummary(); return},
                           false);
    return button;
}


// Add a button for CSV export
var headerObj = document.evaluate("/html/body/div[@id='dbody']/table[@id='tbody']/tbody/tr/td[@id='tcontent']/div[@id='dcontent']/form[@id='mutationsOverviewForm']/table[3]/caption", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

headerObj.appendChild(createButton1("foo", "bar","blah",25,13, 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABkAAAANCAIAAADTzFK5AAAAY0lEQVR42t1TQQ7AIAhrjX/1Tby2' +
'O5AQFZclC7uMkym0BUVKQlF0ABgsUDI11MWnWiaYDkiAc3at7DvN7y4f3s8Y/MG9U0dONu3uURZy' +
'8J93InuGYUjMLXhZmp2S/r5fLPyPF4IiMQ2m8tc+AAAAAElFTkSuQmCC'
));
