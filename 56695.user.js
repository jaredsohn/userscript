// 
// Format Amazon Wishlist Amazon.de
// 
// version 1
//  
// Copyright (c) 2007, Deathalicious
// Thanks to Gleb Kozyrev; I looked at his Google Cache script for tutorial/inspiration.
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
// select "Format Amazon Wishlist", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Format Amazon Wishlist Amazon.de
// @namespace     AmazonWishlist
// @description   Output 
// @include       http://www.amazon.de/*wishlist*
// ==/UserScript==



var allTitles, LibraryHolder, printableButton, exportableButton, buttonLocation, wishList, wishListName;

// Setting newline. Change if you have import/export issues
var lineBreak=String.fromCharCode(13)+String.fromCharCode(10);

LibraryHolder=new Array();

var buttonLocationString="//td[@class='wl-wish-list-title']";
var wishlistLocationString="//a[contains(@class,'list-link-active')]";

// PRINT BUTTON
printableButton=document.createElement('a');
printableButton.appendChild(document.createTextNode('Printable list'));

//Change the styles of the button here
printableButton.style.fontWeight='bold';
printableButton.style.fontSize='small';
printableButton.style.margin='1em';
printableButton.style.padding='.25em';
printableButton.style.border='1px solid black';
printableButton.style.background='#f90';
printableButton.style.color='black';
printableButton.style.cursor='pointer';
printableButton.addEventListener("click", StartPrintPage, true);

// EXPORT BUTTON
exportableButton=document.createElement('a');
exportableButton.appendChild(document.createTextNode('CSV Export List'));


//Change the styles of the button here
exportableButton.style.fontWeight='bold';
exportableButton.style.fontSize='small';
exportableButton.style.margin='1em';
exportableButton.style.padding='.25em';
exportableButton.style.border='1px solid black';
exportableButton.style.background='#3c6';
exportableButton.style.color='black';
exportableButton.style.cursor='pointer';
exportableButton.addEventListener("click", StartExportToCSV, true);

buttonLocation=document.evaluate(
		buttonLocationString,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);


if (buttonLocation.snapshotItem(0))
	buttonLocation.snapshotItem(0).appendChild(exportableButton);
if (buttonLocation.snapshotItem(0))
	buttonLocation.snapshotItem(0).appendChild(printableButton);


function StartPrintPage() {
	ParsePage(PrintPage);
}

function PrintPage(PrintHolder) {
	//alert("Printing page "+(typeof PrintHolder));
	var txt='';
	txt+='<h1>';
	txt+=wishListName;
	txt+='<'+'/h1>';
	txt+='<dl>';
	for (var k=0; k < PrintHolder.length; k++) {
		txt+='<dt>';
		txt+='<strong>'+PrintHolder[k].title+'</strong>';
		if (PrintHolder[k].price.length > 0) {
			txt+=' ('+PrintHolder[k].price+')';
		}
		txt+='<'+'/dt>';
		txt+='<dd>';
		txt+=PrintHolder[k].author;
		txt+='<'+'/dd>';
	}
	txt+='<'+'/dl>';
	document.write(txt);
	document.title="Click back to return to normal page.";
}


function StartExportToCSV() {
	ParsePage(ExportToCSV);
}

function ExportToCSV(ExportHolder) {
	var txt='';
	txt+='"Author","Title","Price"';
	txt+=lineBreak;
	for (var k=0; k < ExportHolder.length; k++) {
		txt+='"';
		txt+=CSVFormat(ExportHolder[k].author);
		txt+='","';
		txt+=CSVFormat(ExportHolder[k].title);
		txt+='","';
		txt+=CSVFormat(ExportHolder[k].price);
		txt+='"';
		txt+=lineBreak;
	}
	document.write(txt);
	document.getElementsByTagName('body')[0].style.fontFamily='monospace';
	document.getElementsByTagName('body')[0].style.whiteSpace='pre';
	document.title="Save Format -> Text Files. Click back to return to normal page.";
	
	
	function CSVFormat(txtToFormat) {
		// This just removes commas and quotes. If you want to do fancier CSV escaping, be my guest
		return txtToFormat.replace(/[,"']/g,"");
	}
}


function ParsePage(EndFunction) {
	var pleaseWait=document.createElement('p');
	var pleaseWaitHolder=document.createElement('div');
	pleaseWaitHolder.style.position='fixed';
	pleaseWaitHolder.style.left=0;
	pleaseWaitHolder.style.right=0;
	pleaseWaitHolder.style.top=0;
	pleaseWaitHolder.style.bottom=0;
	pleaseWaitHolder.style.margin=0;
	pleaseWaitHolder.style.background='black';
	pleaseWaitHolder.style.opacity='0.8';
	pleaseWaitHolder.style.zIndex='600';
	pleaseWait.style.position='relative';
	pleaseWait.style.top='48%';
	pleaseWait.style.margin='auto';
	pleaseWait.style.width='22em';
	pleaseWait.style.maxHeight='4%';
	pleaseWait.style.background='#ccc';
	pleaseWait.style.border='3px solid white';
	pleaseWait.style.color='black';
	pleaseWait.style.padding='10px';
	pleaseWait.style.fontSize='13px';
	pleaseWait.style.fontFamily='sans-serif';
	pleaseWait.appendChild(document.createTextNode('Please wait...loading wishlist items...'));
	spinningCursor=document.createElement('img');
	spinningCursor.style.verticalAlign='middle';
	spinningCursor.style.marginLeft='2em';
	spinningCursor.src='chrome://global/skin/icons/loading_16.png';
	pleaseWait.appendChild(spinningCursor);
	pleaseWaitHolder.appendChild(pleaseWait);
	document.getElementsByTagName('body')[0].insertBefore(pleaseWaitHolder,document.getElementsByTagName('body')[0].firstChild);

	wishList = document.evaluate(
		wishlistLocationString,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	wishListName=clean(wishList.snapshotItem(0).innerHTML);


	function processObject(dObj) {
		if (!dObj) {
			dObj=document;
		}
		if (typeof dObj == 'object') {
			allTitles = document.evaluate(
				"//[contains(@class,'tiny')][strong]",
				dObj,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			//alert('looks like there are '+allTitles.snapshotLength+' titles');
			for (var titleIndex = 0; titleIndex < allTitles.snapshotLength; titleIndex++) 
			{
				var thisTitle = allTitles.snapshotItem(titleIndex);
				var thisAuthor=thisTitle.nextSibling;
				var thisTitleText=clean(thisTitle.innerHTML);
				var thisAuthorText= thisAuthor ? clean(cleanAuthor(thisAuthor.innerHTML)) : '';
				LibraryHolder[titleIndex]=new Object();
				LibraryHolder[titleIndex].title = thisTitleText;
				LibraryHolder[titleIndex].author = thisAuthorText;
			}
		} else if (typeof dObj == 'string') {
			// use string handling
			var pos=0;
			var titleStart='<td class="small"><strong>';
			var titleEnd='</strong></td>';
			var notAuthStart='<td class="small">';
			var authorStart='<td class="small">';
			var authorEnd='</td>';
			var priceStart='<span class="price"';
			var priceEnd='>';
			var end_counter=0;
			var titleStartPos=0;
			var itemEnd='</table>';
			while ( (titleStartPos=dObj.indexOf(titleStart,pos)) && titleStartPos >= 0 ) {
				end_counter++;
				if (end_counter > 1000) {
					break; // to prevent infinite loops
				}
				titleEndPos=dObj.indexOf(titleEnd,titleStartPos);
				itemEndPos = dObj.indexOf(itemEnd,titleEndPos);
				thisTitleText=clean(dObj.substring(titleStartPos+titleStart.length,titleEndPos));
				//if (!confirm(thisTitleText)) throw "No way";
				//alert("TItle is "+titleStartPos+" to "+titleEndPos+" : "+thisTitleText);
				notAuthPos=dObj.indexOf(notAuthStart,titleEndPos)+notAuthStart.length;
				authorStartPos=dObj.indexOf(authorStart,notAuthPos);
				//if (!confirm(authorStartPos)) throw "No way";
				if (authorStartPos) {
					//alert(authorStartPos);
					authorEndPos=dObj.indexOf(authorEnd,authorStartPos);
					thisAuthorText=cleanAuthor(dObj.substring(authorStartPos+authorStart.length,authorEndPos));
					//alert(thisAuthorText);
					//return false;
				} else {
					thisAuthorText='';
				}
				priceStartPos=dObj.indexOf(priceStart,titleEndPos);
				if (priceStartPos && priceStartPos < itemEndPos) {
					//alert(priceStartPos);
					priceEndPos=dObj.indexOf(priceEnd,priceStartPos);
					thisPriceText=cleanPrice(dObj.substring(priceStartPos+priceStart.length,priceEndPos));
					//alert(thisAuthorText);
					//return false;
				} else {
					thisPriceText='';
				}
				if (thisTitleText.length) {
					titleIndex=LibraryHolder.length;
					LibraryHolder[titleIndex]=new Object();
					LibraryHolder[titleIndex].title = thisTitleText;
					LibraryHolder[titleIndex].author = thisAuthorText;
					LibraryHolder[titleIndex].price = thisPriceText;
				}
				pos=titleEndPos;
			}
		}
	}

	GetNextPage();

	function GetNextPage(currentPage) {
		//alert("Running get next page");
		if (!currentPage) {
			currentPage=1;
		}
		if (typeof GM_xmlhttpRequest != 'function') {
			//alert("No such function");
			return false;
		}
	
		var currentPageLink=self.location.href;
		currentPageLink=currentPageLink.replace(/page=[0-9]+/,'');
		currentPageLink=currentPageLink.replace(/layout=[^&]+/,'');
		currentPageLink=currentPageLink + '&page='+currentPage + '&layout=compact';
		//alert(currentPageLink);
		GM_xmlhttpRequest({
			method: 'GET',
			url: currentPageLink,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': '*',
			},
			onload: function(responseDetails) {
				//alert('loaded');
				NextObject=responseDetails.responseText;
				processObject(NextObject);
				currentPage++;
				if (NextObject.indexOf('&page='+currentPage) > 0 ||NextObject.indexOf('&amp;page='+currentPage) > 0) {
					//there is a link to the next page, so get the next page
					GetNextPage(currentPage);
				} else {
					//alert("Calling end function");
					EndFunction(LibraryHolder);
				}
			}, onerror: function() { alert('soome kind of error'); NextObject="BADRESPONSE" }
		});
	}


	function clean(textToClean) {
		var result=textToClean;
		result=result.replace(/<\/?[^>]*>/g,"");
		result=result.replace(/\s+/g,' ');
		result=result.replace(/^\s+/g,'');
		result=result.replace(/\s+$/g,'');
		return result.replace(/^\s*(.*\S)\s*$/,"$1");		
	}
		
	function cleanAuthor(authorToClean) {
		authorToClean=authorToClean.replace(/<[^>]+>/gi,"");
		authorToClean=authorToClean.replace(/~?\s+/gi," ");
		authorToClean=authorToClean.replace(/\s(by|VHS|DVD|CD)\s*~?\s*/gi,"");
		authorToClean=authorToClean.replace(/\s*\((Author|Editor)\)/gi,"");
		return authorToClean.replace(/^\s*(.*\S)\s*$/,"$1");		
	}

		
	function cleanPrice(priceToClean) {
		priceToClean=priceToClean.replace(/.*price.*([A-Z][A-Z][A-Z]).([0-9.]+)[^0-9]*/,"$1:$2");
		//alert(priceToClean);
		if (priceToClean.indexOf(':') >= 0) {
			priceToClean=priceToClean.split(':');
			priceValue=priceToClean[1];
			priceCurrency=priceToClean[0];
			try {
				return currencyFormat(priceValue,priceCurrency);		
			} catch (e) {
				return 'n/a';		
			}
		} else return '';
	}

	function currencyFormat(val,currency) {
		//alert('value is '+val+ ' and currency is '+currency);
		if (val.indexOf('.')==-1)
			val=val + '' + '.00';
		else if ((val.length - val.indexOf('.'))==2) {
			val=val + '' + '0';
		}
		if (!currency) {
			currency='USD';
		}
		if (currency=='GBP') {
			return "\u00A3" + val;
		} else if (currency=='USD' || currency=='CAD') {
			return '$'+val;
		} else if (currency=='EUR') {
			return '\u20AC'+val;
		} else throw('Unknown currency '+currency);
	}

	//return LibraryHolder;

}
