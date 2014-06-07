// ==UserScript==
// @name           FilterFap
// @namespace      org.aliquam.gm
// @description    Filters out galleries that are not Huge and Numerous
// @require        http://userscripts.org/scripts/source/45988.user.js
// @run-at         document-start
// @include        http://www.imagefap.com/*
// ==/UserScript==


USP.theScriptName = 'FilterFap';


USP.init({theName:'minSize', theText:'Size to be displayed?', 
            theValues:['High Definition','Medium Quality', 'Low Quality'], theDefault:'High Definition'},
         {theName:'minPictures', theText:'Minimum pictures in gallery:', theDefault:60}
    	);

GM_registerMenuCommand('Preferences for '+USP.theScriptName, USP.invoke);

var filterSize = USP.getValue('minSize')
var filterNumber = USP.getValue('minPictures')

var galleryTableList = document.getElementsByClassName("gallerylist")

if ( galleryTableList.length > 0 )
{
	var galleryTable = galleryTableList[0]
	var rowList = galleryTable.getElementsByTagName("tr")
	
	var rowIdx = 0

	while ( rowIdx < rowList.length )
	{
		var currentRow = rowList[rowIdx]
		if ( currentRow.id != "" )
		{
			var rowCells = currentRow.getElementsByTagName("td")
			var sizeCell = rowCells[2]
			var sizeImages = sizeCell.getElementsByTagName("img")
			if ( sizeImages.length > 0 ) 
			{
				var sizeImageElement = sizeImages[0]
				if ( sizeImageElement.alt != filterSize )
				{
					currentRow.style.display = "none"
					rowIdx++
					currentRow = rowList[rowIdx]
					currentRow.style.display = "none"
				}
				else
				{	
					var numberCell = rowCells[1]
					var numberValue = parseInt(numberCell.getElementsByTagName("center")[0].innerHTML.replace(/&nbsp;/gi, ""))
					if ( numberValue < filterNumber )
					{
						currentRow.style.display = "none"
						rowIdx++
						currentRow = rowList[rowIdx]
						currentRow.style.display = "none"
					}
				}
			}
		}
		rowIdx++
	}
}


 



