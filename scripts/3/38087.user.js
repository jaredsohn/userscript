// ==UserScript==
// @name           CLP_Lookup
// @namespace      http://www.carnegielibrary.org
// @description    While viewing a book on Amazon, this script will search the CLP catalog. If not found there, it will search WorldCat. Based on Sean Leblanc's Denver Lookup.  It also tries to detect when looking at a CD, DVD or VHS, and inserts a search link into CLP for the title text.
// @include        http://*.amazon.*
// @include        http://amazon.*
// ==/UserScript==

var dbg = false;
var carnegieLibraryName = 'Carnegie Library of Pittsburgh';
var shortLibName = "CLP";
//var prospectorLibraryName = 'Prospector';
var accessName = "Access PA";
var worldcatLibraryName = 'WorldCat';

var titleXPath1 = "//div[@class='buying']/b[@class='sans']";
var titleXPath2 = "//div[@class='content']//b[@class='sans']";

function slog(logthis) {
	if (dbg) GM_log(logthis);
}

// Common functions:
function parseTitle(title) {
	var firstParens = title.indexOf("(");
	var firstBracket = title.indexOf("[");

	if (firstParens>0 || firstBracket>0) {
		var cutOff = 0;
		if (firstParens>0 && firstBracket>0) {
			cutOff = firstParens;
			if (firstBracket<firstParens) {
				cutOff = firstBracket;
			}
		}
		else if (firstParens>0) {
			cutOff = firstParens;
		}
		else if (firstBracket>0) {
			cutOff = firstBracket;
		}
		title = title.substring(0, cutOff);
	}

	var wordArray = title.split(' ');
	var newTitle = "";
	for (i=0;i<wordArray.length;i++) {
		//slog("i= " + i + ", val: '" + wordArray[i] + "'");
		var match = wordArray[i].match(/([a-zA-Z0-9]+)/);
		if (match) {
			if (newTitle.length>0) {
				newTitle += " ";
			}
			newTitle += wordArray[i];
		}
	}
	return newTitle;
}

function isCD() {
	var liarray = document.getElementsByTagName('b');
	if (liarray.length) {
		//slog("bold found - " + liarray.length);
		for (i=0;i<liarray.length;i++) {
			if (liarray[i].textContent=="Audio CD") {
				slog("Bold found. [" + i + "] Text: '" + liarray[i].textContent + "'");
				return true;
			}
		}
	}
	return;
}

function isDVD() {
	//var match = "amazon.com/images/G/01/detail/dvd-gray-medium.gif";
	var match = "amazon.com/images/G/01/detail/dvd-gray-medium.";
	var query = "//img[contains(@src, '" + match + "')]";
	slog("query = '" + query + "'");
	var dvdImg = xpathFirst(query);
	if (dvdImg) {
		return true;
	}
	else {
		return;
	}
}

function isVHS() {
	//var match = "amazon.com/images/G/01/x-locale/common/icons/vhs-medium.gif";
	var match = "amazon.com/images/G/01/x-locale/common/icons/vhs-medium.";
	var query = "//img[contains(@src, '" + match + "')]";
	slog("query = '" + query + "'");
	var vhsImg = xpathFirst(query);
	if (vhsImg) {
		slog("is vhs.");
		return true;
	}
	else {
		slog("is not vhs.");
		return;
	}
}

function insertItemSearchText(stubDiv, libName, libUrl, itemType) {
	clearText(stubDiv);
	insertText(stubDiv,
		   '<a href="' + libUrl + '" title="'+libName+' information for this item">Search for this ' + itemType + ' in ' + libName + ' </a>',
		   'libraryAvailable');
}

function worldcatSearch(isbn, newDiv) {

    // Add another div at this point:
	var secondDiv = document.createElement('div');
	secondDiv.setAttribute('class', 'stub');
	newDiv.parentNode.insertBefore(secondDiv, newDiv.nextSibling);
       //GM_log(xmlUrl);
    insertText(secondDiv, '<img src="' + getSpinnerSrc() + '" alt="Spinner" /> Searching for this edition at ' + worldcatLibraryName + '.');


	var xmlUrl = "http://worldcatlibraries.org/wcpa/isbn/" + isbn;
	GM_xmlhttpRequest({
      headers: [{'User-Agent': 'worldcatgreasemonkey'}],
	  method:"GET",
	  url:xmlUrl,
	  onload:function(res3) {
	    var test = res3.responseText.indexOf("We're Sorry");
          //GM_log(test);

          if (test <= 0) {
          	getDisplayItemInfoFunction(secondDiv, worldcatLibraryName, xmlUrl);
          }
          else {
          	getDisplayItemInfoFunction(secondDiv, worldcatLibraryName, null);
          }
	  }
	});
};

function accessPA(isbn, newDiv){
	var secondDiv = document.createElement('div');
	secondDiv.setAttribute('class', 'stub');
	newDiv.parentNode.insertBefore(secondDiv, newDiv.nextSibling);
	 insertText(secondDiv, '<img src="' + getSpinnerSrc() + '" alt="Spinner" /> Searching for this edition at ' + accessName + '.');
	 var xmlUrl = "http://205.247.101.11/search/i?SEARCH=" + isbn;
	GM_xmlhttpRequest({
      headers: [{'User-Agent': 'dpgm'}],
	  method:"GET",
	  url:xmlUrl,
	  onload:function(res4) {
	    var test = res4.responseText.indexOf("We're Sorry");
          //GM_log(test);

          if (test <= 0) {
          	getDisplayItemInfoFunction(secondDiv, accessName, xmlUrl);
          }
          else {
          	getDisplayItemInfoFunction(secondDiv, accessName, null);
          }
	  }
	});
};
/*
function prospectorSearch(isbn, newDiv) {
	var xmlUrlProspector = "http://prospector.coalliance.org/search/i" + isbn + "&searchtype=i";
	// Add another div at this point:
	var secondDiv = document.createElement('div');
	secondDiv.setAttribute('class', 'stub');
	newDiv.parentNode.insertBefore(secondDiv, newDiv.nextSibling);

	// Notify that we are searching, then start search:
    insertText(secondDiv, '<img src="' + getSpinnerSrc() + '" alt="Spinner" /> Searching for this edition at ' + prospectorLibraryName + '.');
	GM_xmlhttpRequest({
      headers: [{'User-Agent': 'dpgm'}],
	  method:"GET",
	  url:xmlUrlProspector,
	  onload:function(res) {
		var test = res.responseText.indexOf('Request');

	  	if (test > 0){
        	getDisplayItemInfoFunction(secondDiv, prospectorLibraryName, xmlUrlProspector);
        }
        else {
        	//getDisplayItemInfoFunction(secondDiv, prospectorLibraryName, null);
        	getDisplayItemInfoFunction(secondDiv, prospectorLibraryName, null);
        	worldcatSearch(isbn, secondDiv);
        }
	  }
	});
}*/
//No editing needed up to this point


//
// Search the library for the specified isbn
// if we find it, call fn with the resulting library url
// otherwise call fn with null												edited, pending test

function libSearch(isbn, newDiv) {
	
	var xmlUrlCarnegie = "http://catalog.einetwork.net/search/i?SEARCH=" + isbn;         //may need to add +"&searchscope= ";  or different search/x?  for different mediums
	var successText='>Title</td>';
	var searchpic =	'<img src="' + searchpic + '" alt="Spinner" />';																				

	// Search CLP, get redirect info:
	GM_xmlhttpRequest({
     headers: [{'User-Agent': 'dpgm'}],
     method:"GET",
     url:xmlUrlCarnegie,
     onload:function(res) {

	  	var successStart = res.responseText.indexOf(successText);
		
	  	if (successStart >= 0) {
			
			//Found, put link in to page:
	  		getDisplayItemInfoFunction(newDiv, carnegieLibraryName, xmlUrlCarnegie);
	  	   	}
	        else {
				//Not found, say not found:
	        		getDisplayItemInfoFunction(newDiv, carnegieLibraryName, null);
			}
			}
			});
		}

// Simplify making a FIRST_ORDERED_NODE_TYPE XPath call                 do not edit

function xpathFirst(query, node) {
    if (!node) {
	node = document;
    }

    var result = document.evaluate(query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

    if (!result) {
	return;
    }

    return result.singleNodeValue;
}

// Simplify making an UNORDERED_NODE_SNAPSHOT_TYPE XPath call
// Return a snapshot list														do not edit

function xpathAll(query, node) {
    if (!node) {
	node = document;
    }

    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Add global style to page								do not edit

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];

    if (!head) {
	throw new Error('Could not get head element.');
    }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// This tries a few different ways to get title location:										do not edit
function getTitleLocation() {
    var paths = new Array();
	paths[0] = "//div[@class='buying']/b[@class='sans']";
	paths[1] = "//div[@class='content']//b[@class='sans']";
	paths[2] = "//div[@class='buying']/b[@class='asinTitle']";
	paths[3] = "//div[@class='content']/b[@class='asinTitle']";
	paths[4] = "//div[@class='buying']/h1[@class='parseasinTitle']/span[@id='btAsinTitle']";

	var mainTitleSpan;
	for (i=0; i<paths.length; i++) {
		slog("Searching for main title span with: " + paths[i]);
		mainTitleSpan = xpathFirst(paths[i]);
		if (mainTitleSpan) {
			break;
		}
	}
	
    return mainTitleSpan;
}

// Insert a div into the document that will be used for displaying item availability.
// Return this div.																					do not edit

function getItemAvailabilityDiv() {
	var	mainTitleSpan = getTitleLocation();


	slog("Getting parent node of main title span.");
    var parent = mainTitleSpan.parentNode;


    itemAvailabilityDiv = document.createElement('div');
	slog("ItemAvailabilityDiv=" + itemAvailabilityDiv);

    // Amazon uses two different layouts for displaying items.
    // Handle both.
	slog("Nodename: " + parent.nodeName.toUpperCase());

	if (parent.nodeName.toUpperCase()=="H1") {
		parent = parent.parentNode;
	}

    switch (parent.nodeName.toUpperCase()) {

    case "FORM":
		var authorSpan = xpathFirst('span[starts-with(string(normalize-space()), "by")]', parent);

		if( !authorSpan ) {
		    throw new Error('Could not get author span.');
		}

		var nextBr = xpathFirst('following-sibling::br', authorSpan);

		if( !nextBr) {
		    throw new Error('Could not get next br after author span.');
		}
		parent.removeChild(nextBr);
		parent.insertBefore(itemAvailabilityDiv, authorSpan.nextSibling);
		return itemAvailabilityDiv;

		break;

    case "DIV":
		if(parent.lastChild.tagName == 'br') {
			slog("Removing last child.");
	    	parent.removeChild(parent.lastChild);
		}

		parent.appendChild(itemAvailabilityDiv);
		return itemAvailabilityDiv;

		break;

    default:
		throw new Error('Did not recognize the main title span\'s parent\'s nodetype');
    }
}

// Insert a new paragraph containing the specified text into the specified div node.
// If present, we set the class attribitue of this div to classAttr.						do not edit

function insertText(stubDiv, text, classAttr) {
    var p = document.createElement('p');

    if(classAttr) {
	p.setAttribute('class', classAttr);
    }

    p.innerHTML = text;

    stubDiv.appendChild(p);
}

// Clear contents of the specified div node

function clearText(stubDiv) {
    stubDiv.innerHTML = '';
}

// Get the isbn for the amazon item we are currently browsing.
// Return null if no isbn can be found.											do not edit, may need to change .match() attributes later

function getIsbn() {
    var match=window.location.href.match(/\/(\d{7,9}[\d|X])\//);	
    //var match = window.location.href.match(/\/(\d{7,9}[\d|X])(\/|$)/);
    if (!match) {GM_log('does not match');
	return;}
	GM_log (match);
    var isbn = match[1];
    return isbn;
}

// Return a function that displays a message within the specified div
// regarding availablility of the current book.
//
// The function returned expects a library url for this item and will
// display a message saying the item is available if passed such a url.
// It will display a message saying the item is unavailable if passed
// a null value.																do not edit

function getDisplayItemInfoFunction(stubDiv, libName, libUrl) {
	clearText(stubDiv);
	//insert if statement based on libName, which inserts image
	if(libName == 'Carnegie Library of Pittsburgh'){
		var searchpic = '<img src="' + getImgCLP() + '" alt="CLP" />';	
	}
	
	//to insert pic follow the template of above image for CLP
	if(libName =='WorldCat'){
		var searchpic = '';
	}
	if(libName =='Access PA'){
		var searchpic = '';
	}
	
	/*Displays Unavailable at... if item is not found within the search site
	if(!libUrl) {

	    insertText(stubDiv, '<h2 style="color:#FF0000">' + 'Unavailable at ' + libName + '.', 'libraryUnavailable'+ '</h2>');
	    return;
	}*/
	if(!libUrl) {
		
	    return;
	}

	insertText(stubDiv,
		   searchpic + '<a href="' + libUrl + '" title="'+libName+' information for this item">Available at ' + libName + ' </a>',
		   'libraryAvailable');
	
}

// Return spinner image source										do not edit

function getSpinnerSrc() {

    var spinnerImgSrc = "data:image/gif,GIF89a%10%00%10%00%E6%00%00%FF%FF%FF%FE%FE%FE%A3%A3%A3%FD%FD%FD%E9%E9%E9%B5%B5%B5%F9%F9%F9%FA%FA%FA%F5%F5%F5%FC%FC%FC%AB%AB%AB%ED%ED%ED%C0%C0%C0%B1%B1%B1%C7%C7%C7%E5%E5%E5%F4%F4%F4%B4%B4%B4%F7%F7%F7%C1%C1%C1%CF%CF%CF%E6%E6%E6%03%03%03%E4%E4%E4%DF%DF%DF%C4%C4%C4%EE%EE%EE%9A%9A%9A%C2%C2%C2%D4%D4%D4%E2%E2%E2%3C%3C%3C%A8%A8%A8%B0%B0%B0%F2%F2%F2%AD%AD%AD%B2%B2%B2%DB%DB%DB%AA%AA%AA%D9%D9%D9%D7%D7%D7%BB%BB%BB%26%26%26%CD%CD%CD%D8%D8%D8%B9%B9%B9%9E%9E%9E%CB%CB%CB%AE%AE%AE%FB%FB%FB%EC%EC%ECRRR%EA%EA%EA%85%85%85%F6%F6%F6JJJ%DC%DC%DC%0C%0C%0C%D1%D1%D1%A4%A4%A4)))%E7%E7%E7%5D%5D%5D%BD%BD%BD%A7%A7%A7%CC%CC%CC%B7%B7%B7%F1%F1%F1%D0%D0%D0YYYfff%CA%CA%CA%A6%A6%A6%F0%F0%F0%E0%E0%E0%B8%B8%B8%BF%BF%BF%E8%E8%E8%F3%F3%F3%C8%C8%C8zzz%A5%A5%A5%BE%BE%BENNN%C3%C3%C3%C6%C6%C6%C5%C5%C5%14%14%14jjj%DD%DD%DD%F8%F8%F8%D6%D6%D6%BA%BA%BA%BC%BC%BC%90%90%90nnn%1C%1C%1C%DE%DE%DE%96%96%96%82%82%82%8C%8C%8C%89%89%89aaatttTTT%87%87%87%93%93%93FFF%8E%8E%8EWWW%7F%7F%7F222www%DA%DA%DA%7C%7C%7C666qqqAAAlll%94%94%94xxx%A1%A1%A1%A2%A2%A2---%23%23%23%80%80%80%D2%D2%D2%AC%AC%AC!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%10%00%10%00%00%07%C8%80%00%82%00%03%82-h%09%83%8A%82%15_%1D%00%1BW%09%07-%25%8B%00Mo%3E%00j%60%00%14%02%3D%8A%15%04%00%11%3C%3Fe%7C%2B%3B%2F%00%07%04%01%03cE%3F%08%3E%5E%3A%05Q!6%15%11%20%12%00%1853p6Z%82%93O%02%05%17%8A%2FQ%85%8A%1D%2C%83)%3BQ%20%1E%97%10%0E%13%0CG%40l%5Eba%97%22-%24%0DR%83%17%3A%01%8B%18%CF%83%12%19%1B%7F1%8B%3F%02T%22%00%01%96%08%08%E2%AD%03%84!J%BA%20%60%01%C4%84%01%00%25*%00%20%20%E0%C4%8B%02%0F%04l%01%90%E4%C44%00%06HD%08%90a%04%00%2BQ4%5C%22%A0%E0%01%00%0E%0A%02%20%80%81%E2R%00a%00V%A4%88g%20%91%A0%40%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%0D%00%0B%00%00%07o%80%00%82%00%03%82%1Bt%85%83%82%17p8%00_s%03Z7L%832%3En%00g%1F%00w%16%0E%00%0F%1A%00%1Ch%1CP7'%16t%84bcA%12r.%3A%0C%20*2%15%00%15%02rb%12%07%82%07%22K%02%83%5B%5C%01%8A%00%1D%2CA%3FB%05%3D%CA%00%10%0E%13%0D%0D%05M%D3%22-%83%0Ba%C9%8A%18%17%00%06%14H!1%CA%3F%02%81%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%10%00%08%00%00%07d%80%00%82%00%03%82%0Ad%85%83%8A%00%3Db%0F%00ef%03N%3E%5D%8B%00Ic.%00lF%9C%3CT%8A%04N%00DP%1D%1BX(%3C5%00%06Y%01%03%11%20q%06%1B%5C%18A%0Dk2%1DE9%1A%00%1A%0C%02%11%061%82%09%10r%16o%05%01%83%17D%D0%8Aiw%83%2B%0C%13U%0B%97M%1BL%0CG%81%00!%F9%04%04%05%00%00%00%2C%03%00%00%00%0D%00%0A%00%00%07g%80%00%01%00%00R%40%03%84%89%002%05%04%00Hi%03%08cD%89%08%26%05%00%20e%00%02S%3A%8A%18z(%23d83.%00%10%18%018%07%5CT%17(Lv2VSu6%02B1%09%84%09%08n%3C3%3F%01%17D%83%8A%1B%40%89U%0B%8A%84%17idb0%05M%D0%008%1F%3C*S%0Ba%C9%89!%5D%89%81%00!%F9%04%04%05%00%00%00%2C%05%00%00%00%0B%00%0E%00%00%07y%80%00%00%3AL%01%82%87%00%0B%00%1C%26%01%12.%1D%87)%00%19%40%00-P8%87%02%1E%0Ey%17r%05%006%1E%01%5C%1428A%5EI%14_%3E61%09%82%03Zb3gA%01%86%88%23%A2%88%88Mc_Xd%C0%00%1EE7k_%BC%87%24%0E%871%88%017%7Cy%8A%0E%1D%10C%2CF%17wWmZ%02'%2F%05%0FzR%00%5B%1B%09%11%01%19%23%00VQ%8A%82%81%00!%F9%04%04%05%00%00%00%2C%08%00%01%00%08%00%0F%00%00%07b%80%0A%01%07-%25%00%87%23%00%14%02%15%87%00!2%3B%2F%00Z%17%01%0FY!Nqjc6%00%03%06%23Pb%2C%8E%00%1CO%A7%87%0B%1Be5.%8E%3DP_ve%8E%05V%AB%01f*gJ%00%17%26m%04%02oo6dK%16%05%00q%24%03%89%3E%7C%04%8E%82%17%60%CD%87)%01%00%22%09%8E%81%00!%F9%04%04%05%00%00%00%2C%06%00%02%00%0A%00%0E%00%00%07m%80%00%19%23%00%14%02%3D%00%89%1E%0E!2%3B%2F%00%07%04%01%142%0FY!6%15%11%20%12%09%89%03%07O%02!%18%89%A7%00G%90%A8%A7%1A%23H%3B%05%AC2%1B%5E%5EH%AC%1C%2B%AC%89%01c3d%0F%00%3BJqBf%04%05EfZ!_m%0E*.%00%1EG%03%03%3ES%00g%3C(%A8hS%01%15kR%A8Pp%03%00%9E%A7%81%00!%F9%04%04%05%00%00%00%2C%03%00%05%00%0D%00%0B%00%00%07r%80%02B1%09%00%00%03%07O%02%05%17%00%17D%01%86%92%1D%2C%92U%0B%92%92%10%0E%13%0CG%05M%99%86%1A%26%0A!R%0B%2C%91%99D(%92Hm%08%99%01zP%202%00-%1EFb%17%18%19n%1AG%7D5Z%00%13%60%11ch%2B3!%00%04D%03%1A%3Cp%03gu%00j3a%96%1F8%00_s%032FU%92%03%B2%00%5EX%85Z%85%86%81%00!%F9%04%04%05%00%00%00%2C%00%00%08%00%10%00%08%00%00%07e%80%13%0D%0D%40(%00%87%88%22-%24%0DR%88%14%02%03%88%87%18%17%93CP9%7B6%93%00)%02T%22%00%09%1F9%1B%04P%1B4%3D%1D%1B%22(%40%26%06%00KY%00G*%0A%1Bg'P%1C%00I'%92%87C7S%03%5Ef%00%23r%15%9D%00%1Ds%13%00d%3E%01Ie%2F%CF%01%10%87%3Bc%92Z%09%88%81%00!%F9%04%04%05%00%00%00%2C%00%00%06%00%0D%00%0A%00%00%07d%80%00%82V%1B%03%82%87%1D%2CP33fA%87%87%10%0E%7DEmE%19%90%82%22-%87%2C%24%86%90%18%17%00Cd%7Bu%12%99%3F%02%03F%7Ce%3Db%7F%0B2(%5D%08%2C%00G%98%1D3K!j%25y%5B%90%10_t%01%20e%00%3FQ%1A%87%17F%2B%00H5%01%220(%87%01%A9%00).%86%06%09%81%00!%F9%04%04%05%00%00%00%2C%00%00%03%00%0B%00%0D%00%00%07r%80%00O%18%00%3A%02%1E%0E!2%3B%03%3EW.%22X%192%0FY!%00Ml%7CsN1%00%00%03%07%9F%00%0Ed%03%A3%9F%5EX_p%1D%A8%9Fxk7hG%AF%A8%25%0C%A7%AF%10HmF%06%AF%03nS.%0B%0D%0CCCJ%5D%00%14%14%00%18P%0EL%05%0F%02%A36%5Ej%01%3F%23%00V%A3%0F5'%00%13%0A%01%08%A3%01%12%9F%2B)%01%00%81%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%08%00%0F%00%00%07a%80%00%82%00%09%82%3A%838o%87%1C%83C%7Cu%00%19%00(%1E%00U%16!%0D%033s%0A%08hP'%93X*h%08%07%83%00%1C%5E%03%82%3Bedj%25%83dXXg(%A9%82%17D%01%83%12)ne%A8%00%03%1BP%05I%19%1D%10%00~q%00%3D%02'%2F%83%06%24%11%01%92%82%04%0A%0F%AA%81%00%3B";

    return spinnerImgSrc;

}

function getImgCLP(){
	var CLPImgSrc = "data:image/jpeg,BM8%04%00%00%00%00%00%006%00%00%00(%00%00%00%10%00%00%00%10%00%00%00%01%00%20%00%00%00%00%00%00%00%00%00%12%0B%00%00%12%0B%00%00%00%00%00%00%00%00%00%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%B4%89%CB%00%86A%AC%00%818%A8%00%82-%A2%00%8D%93%DA%00%A2%D4%FB%00%83%BD%F5%00%5E%AA%F2%00f%AE%F3%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F4%EE%F7%00%84%3C%AB%00y%2B%A2%00z'%A0%00%B7%A6%DC%00%FF%FF%FF%00%FA%FC%FF%00%B1%D6%F9%00Y%A7%F2%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F4%EE%F8%00%84%3C%AB%00y%2C%A3%00y%2C%A2%00%BD%91%CE%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%8C%C2%F6%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F4%EE%F7%00%84%3C%AB%00y%2B%A3%00y%2B%A3%00%BC%95%D1%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%E8%F3%FD%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F4%EE%F7%00%84%3D%AB%00y%2B%A3%00y%2B%A3%00%BC%95%D0%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F4%EE%F7%00%84%3D%AB%00y%2B%A3%00y%2C%A3%00%BC%95%D1%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F4%EE%F7%00%84%3C%AB%00y%2C%A3%00y%2B%A3%00%BC%95%D0%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F4%EE%F8%00%84%3D%AB%00y%2B%A3%00y%2B%A2%00%BC%95%D1%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%EC%E0%F2%00%83%3C%AA%00y%2B%A3%00y%2B%A3%00%B7%8D%CE%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%C3%9C%D3%00%A9r%C1%00%A8n%BF%00%A5k%BD%00%B2%82%C8%00%E3%D2%EC%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FE%FE%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FE%FE%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%F8%FC%FE%00%A6%D2%F9%00%7D%C1%F8%00%88%C6%F9%00%DA%EB%FC%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%9E%CC%F8%00U%A6%F1%00U%A5%F2%00U%A5%F1%00a%AD%F3%00%EA%F5%FE%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00p%B3%F4%00U%A5%F1%00U%A5%F1%00U%A5%F1%00U%A5%F1%00%C2%DF%FA%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%8A%C2%F5%00U%A5%F1%00U%A5%F1%00U%A5%F1%00U%A5%F1%00%D8%EB%FC%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%E8%F3%FD%00%80%BC%F5%00%5E%AA%F2%00f%AE%F2%00%B8%DA%FA%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%FF%FF%FF%00%00%00";
return CLPImgSrc;																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																									}

function getImgAPA(){
	var APAImgSrc = "data:image/gif,GIF89a2%00%3F%00%F7%00%00%FF%FF%FF%F7%F7%F7%F7%F7%FF%EF%F7%F7%F7%EF%E7%EF%EF%EF%E7%EF%EF%E7%EF%F7%E7%E7%E7%E7%E7%EF%DE%E7%E7%DE%DE%DE%D6%DE%DE%D6%DE%E7%D6%D6%D6%CE%D6%E7%CE%D6%DE%CE%CE%CE%C6%CE%DE%BD%CE%DE%C6%C6%D6%C6%C6%C6%BD%C6%D6%BD%C6%CE%BD%BD%BD%BD%BD%C6%BD%BD%B5%AD%BD%D6%A5%BD%D6%9C%BD%D6%BD%B5%AD%B5%B5%B5%9C%B5%D6%9C%B5%CE%AD%AD%B5%A5%AD%C6%AD%AD%AD%9C%AD%BD%94%AD%C6%A5%A5%AD%94%A5%C6%9C%A5%AD%8C%A5%C6%94%A5%B5%8C%9C%BD%8C%9C%AD%84%9C%BD%8C%94%BD%8C%94%B5%8C%94%A5%84%94%AD%7B%94%AD%84%8C%B5s%8C%ADk%8C%A5s%84%B5k%7B%9Cc%7B%9CZ%7B%A5ss%ADks%ADcs%ADcs%A5ks%84cs%94Zs%9CZk%A5Rk%A5Jk%ADJk%9CZc%94ZcsJc%A5Jc%84RZ%9CJZ%ADJZ%8CBZ%9CBZ%8C1Z%94BR%94JRkBR%8C)R%8C1J%A51J%7B1J%849B%8C1B%94)B%9C1B%8C!B%9C1BZ%18B%84)9%94!9%9C)9%8C)9%7B!9%7B%189%84)1s!1%7B%181%84%101%84%18)%8C%18)%7B%18)s%18)c%10)k%00)%94%10)c%10)Z%08)%7B%00)%8C%10!%94%10!%8C%08!%8C%08!%94%10!%7B%10!k%10!c%00!%8C%08!s%00!%84%00!%7B%10!B%10%18%8C%10%18%84%08%18%94%18%18c%08%18%8C%08%18s%10%18Z%00%18%7B%00%18s%08%10%7B%00%10%84%00%10%7B%00%10s%00%08%7B%00%08s%00%101%00%00s%00%00c%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BXMP%20DataXMP%3C%3Fxpacket%20begin%3D%22%EF%BB%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%0A%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%204.1-c034%2046.272976%2C%20Sat%20Jan%2027%202007%2022%3A37%3A37%20%20%20%20%20%20%20%20%22%3E%0A%20%20%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%0A%20%20%20%20%20%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%0A%20%20%20%20%20%20%20%20%20%20%20%20xmlns%3Axap%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%3E%0A%20%20%20%20%20%20%20%20%20%3Cxap%3ACreatorTool%3EAdobe%20Fireworks%20CS3%3C%2Fxap%3ACreatorTool%3E%0A%20%20%20%20%20%20%20%20%20%3Cxap%3ACreateDate%3E2007-01-04T22%3A10%3A31Z%3C%2Fxap%3ACreateDate%3E%0A%20%20%20%20%20%20%20%20%20%3Cxap%3AModifyDate%3E2008-11-12T17%3A48%3A54Z%3C%2Fxap%3AModifyDate%3E%0A%20%20%20%20%20%20%3C%2Frdf%3ADescription%3E%0A%20%20%20%20%20%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%0A%20%20%20%20%20%20%20%20%20%20%20%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%3E%0A%20%20%20%20%20%20%20%20%20%3Cdc%3Aformat%3Eimage%2Fgif%3C%2Fdc%3Aformat%3E%0A%20%20%20%20%20%20%3C%2Frdf%3ADescription%3E%0A%20%20%20%3C%2Frdf%3ARDF%3E%0A%3C%2Fx%3Axmpmeta%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%3C%3Fxpacket%20end%3D%22w%22%3F%3E%01%FF%FE%FD%FC%FB%FA%F9%F8%F7%F6%F5%F4%F3%F2%F1%F0%EF%EE%ED%EC%EB%EA%E9%E8%E7%E6%E5%E4%E3%E2%E1%E0%DF%DE%DD%DC%DB%DA%D9%D8%D7%D6%D5%D4%D3%D2%D1%D0%CF%CE%CD%CC%CB%CA%C9%C8%C7%C6%C5%C4%C3%C2%C1%C0%BF%BE%BD%BC%BB%BA%B9%B8%B7%B6%B5%B4%B3%B2%B1%B0%AF%AE%AD%AC%AB%AA%A9%A8%A7%A6%A5%A4%A3%A2%A1%A0%9F%9E%9D%9C%9B%9A%99%98%97%96%95%94%93%92%91%90%8F%8E%8D%8C%8B%8A%89%88%87%86%85%84%83%82%81%80%7F~%7D%7C%7Bzyxwvutsrqponmlkjihgfedcba%60_%5E%5D%5C%5BZYXWVUTSRQPONMLKJIHGFEDCBA%40%3F%3E%3D%3C%00%3A9876543210%2F.-%2C%2B*)('%26%25%24%23%22!%20%1F%1E%1D%1C%1B%1A%19%18%17%16%15%14%13%12%11%10%0F%0E%0D%0C%0B%0A%09%08%07%06%05%04%03%02%01%00%00!%F9%04%00%07%00%FF%00%2C%00%00%00%002%00%3F%00%00%08%FF%00%01%08%1CH%B0%A0%C1%83%08%13*%5C%C8%B0%A1%C3%82%02X%84%F1%B2%E5%CB%97%25%26%18%3C%DC%88%D0%82%8F9q%E8%C0%C9C%87%0E%22-%168%AA%14X%40%8B%A3%3D%25%E9%D4%01DgO%220%13%02%AC%7C(%C0%05%22%92%25%81%C6%89%93%C7Q%0E%07%3Aw2%2C%A1gO%1B%3Ard%CE%91Y%87N%A2%26%11%0A(e%A8%83%91S%3Ft%E6L%1D%5BR%8F%0D%AD%5B%13%1E%40R%08%A8%CC%3DSKNM%A4%C6%40%DA%84%01%D2%C0%8C)6j%C9%90%88%EC%2C%B8%7B0%00%023%85%C2%CE%81YgNT8a%13%A5%C9J%D8%E0%01%22%88b%D6%EC%5B%12N%1DCj*%10%A8l%B0%07%23Ac%FD%C6%DD%C3g%0C%09%0C%09H%13%0C%60ALb9S%AB%FE%A5%B3H%C9k%B4%B2%01%20%88%10%E2Of%B2a%E9%08bt%83%04%E5%E0%C2%23%7C(r(%8F%EE%B0r%10)%B2%F2z0t%00%01%0AD%FF%D0%A0%C2K%A2%9A0%F9%A0%C1A%E2%F7%F7%81%C3%3F%90%A8b%08%91v%EE%ED%9D%03%FFn%B8%82%08%17%3D%E4'%60%05%08%BC7%10%03L%60AE%16Y%24!%20%06%11%20%90%D4w%0D%A0%D0C!%3F%B5%91%08!%18t%18%C1%02%FBAg%01%16%F6%B5QU%1B%7B%B8%11a%01!B%F7%80K%24%F9U%07%22w%3C%A7R%02%1A5%C4%80%14%8C%D0%11Gc%82%BC%C5%86h%3B%15aDC%03%00%C1%C8%1F%7C%95%84%A2%1B%B09%A4%00%05%3A%0D%10%82%1Di%3C%D0bA%09L%91%08nb%89%24%13%22k%60%B0%A5A%020AFJ4%D8%91H!7x%87%D0%004%ECa%DD%1C%8D%25%D7F!l%98%D9%10%0A%87%20%D2%84%10g%24RG%1Ef%8Cp%26%00%16%C0%81%C8%1E%7B%D4%01fn%7B%0C9%DAB%0F%A4%91G%1C%88%2C%92%99%1Cu0b%C5%A2%1C%142%07d2A5%15%8Ao%10%B8%90%00E%FC%FF%04W%93%88%C0%B1BB%1C%C0U%07Lg%F8%15)%22P.*%D0%0C%7C%D4%01YcU%E5%96G%1A%23%20%94%AB%1C%A8%CAU%D2%AExT%20%AC%04fX%07%93Xy%06%C5%08%0C%CEF%AAYHb%3D%E9*B%064%E1%A3%AAb%85%A9%5B%22LHhP%07%88%A8%B6%D7%B4%95%FAYX%0DL%1E%2BGT%8E%E16%E6%20%2CL8%D0%06%7B%85%E9%18dm%20%82%87%BE%06%B50%88T%AA6%99%5CIj%14X%10%07%7F%C0%05fL%3F%F2%11%ECA%1B%D8%81%C8%8Fd%85%14%13%AAU%3D%C2%83A%1Cd%A6%D8cN%A6x.A%09%9C%B1%C8u%F7j%A6jU%8A%EC%600%00%1C%40%16%AD_c%B6%1Ab%01C%3C%3A%D5%BD%1F%3B%26u%1D%7CT%81%81%9C%02q%E0s%985%ED%0A%A5%C6%02%19%00%84%22%5Bc%07VL%60%E6%81E%7B6%12%CDdr%5C%7B%06%2C%C4%00%84%60%C8yq%C5%95*_x%16%FF%F2G~m%E7%0A7%1Dg%BF%E5%06%91%03A!%B3f%02%E7%8D%E7b%8A%B0%E7%01%81%06w%20.rN%8A%8C%81%5D%03%D5%A7%98%5CR%E7%0D%D5%1E%86%04%D1%1E%81%02l%FC6vdyMw%18%89%20%A2wL%8D9%86%5E!H%B4w%F5A%1Co%EB%B3%DC%23%0F4A%10g%14%A2r%CF%3F%2BR%06%E0%5B%C6%8C%1D%1D%7F%E8%8D%E2%1A7%0B%14%C0%0Ae0%92%D9%19%3E%C3%95%C7%1D%F9Q%CE%7B%A4U%C1%A57%B5%88%CFf%01%0F%5D%24%2C%B5%9Ds%84%0F6%CC%DB%C2DsI%85%40%19%DBA%02L%F0%84%CC%F7BD%EEH%20%3Eg%09%02%0E%EF%2BITf%F4%06%BA%19%E4%01NHLI%22U%08%D3Uo%7Cu%D0%CD%1C%C0R%95%19%0Di~%05%C0%80%80Hp%035%90%84Iu(%84%11v%B7%90gMpv%9E%89%03%1C%3A%F6%07%1A%EE%E1%0F%87%80%03%A4%CE0%AB%80%25%C2%08%19%18%CD%0F%FF%A2%40D%06%1CA%20%3F%D0%88%E0%143%96%B8t%10%10~%20%09L%04!%88M%C9%84%24%92%0AK%0A%99%B09%81%5C%20%06%00%B8%40%23%20%80%80Fd%C0m%1E%CB%9B_%90%C67%056%F1)%BA%C9%C3!%5E%90%01%B4d%00%8C%19%E8C%0CR%D0%87%0B%10mq%84%9B%D6%C5%C448%AE%E5%A6*r%F8B!%AE%40%40%8D%7D%11%00%19%F8%C1%11%24%E9G%0E%E4A5%02c%1Dn%24%A5%C6%C6A%85%0E%8A%C0%90%22%5C%E3%1EH%82%F1%8B%5C%E0B%0C%CE%08%82%D8%D9%07%11%18%82e%2C_i%9FX%C6%D2%95%89%80C%19v%19%08%19%9C%C0%03%CF%B9%A3)%7F%F0%83%18%F8%B1%00%15%18%A12%97%C9LeN%0El%03(%D0%00%14%80%00jj%05%99%CD%CC%A66%DB%F3%01%05%0CmN%0E%A8%40%87%C4%89%01r%9As%9C%1D*'%3A%D5%99N%0Cd%C0%01%C2%9AM%01%10%40%80y%1A%80%00%08%60%11%3D%E7Y%19%CF%7D%F2%D3%9E%F8d%11%8B%EE%19O%03%19%F4%A0%08M%A8B%17%0A%80%80%00%00%3B";
	return APAImgSrc;
}


function getImgWC(){
	var WCImgSrc = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%02%00%00d%00d%00%00%FF%EC%00%11Ducky%00%01%00%04%00%00%00d%00%00%FF%EE%00%0EAdobe%00d%C0%00%00%00%01%FF%DB%00%84%00%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%02%02%02%03%03%03%03%03%03%03%03%03%03%01%01%01%01%01%01%01%02%01%01%02%02%02%01%02%02%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%03%FF%C0%00%11%08%005%004%03%01%11%00%02%11%01%03%11%01%FF%C4%00%98%00%00%01%04%03%01%01%00%00%00%00%00%00%00%00%00%00%07%03%06%08%0A%04%05%09%02%01%01%00%01%04%03%01%01%00%00%00%00%00%00%00%00%00%00%00%01%02%05%08%04%06%07%03%09%10%00%00%06%00%05%03%03%03%04%02%03%00%00%00%00%00%01%02%03%04%05%06%11%12%13%07%08%00%14%15!%16%091A%222%23%24%17a%0A%F0bC%11%00%01%02%05%03%02%05%02%05%04%03%01%00%00%00%00%01%02%03%00%11%04%05%06!1%12A%07Qaq%22%13%14%08%81%91%A12%23%B1%E1BR%F03%15%17%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%BF%7B%91%C0%13%FD8%19R%90s%07%D4%A6%01%03%14%07%D3%03%18%3E%FD%04M*%1EF%13P%A0%40%24%83%1Cs%DC%9F%93%0B%1Do%E4%5E%81%C2z.%DEC%5D%2B%8F%A4%AB%D0%17%FBQd%9E%0D%96%26v%C3%12%AC%B3%91%8Cf%89%3Cz%2C%2Bl%DD43%B3.%20d%C4T%FA%60%1Dw%0B%2Fhh%EA%FBOS%DC%1B%95R%E9%96%90KH%13%91%E3%3D%17%E2%5C%D3%87%13%E3%3E%91%C1n%FD%E2%ABg%BBt%BD%B9%A1%A5EE%1B%AB%09y%C9%EA%D9P%98Re%D12!s%1B%F1%97X%89%9C%EF%F9%90%DD%0A%C6%FCIqW%82%FB~%86%E2nT%2C%B3%9Au%96%DEh%07v%E7%0E.L%93%3F%7F%5B%A4%D6%D8%B8D%B2%06%82%1FG2%0ED%CD%08%B1%0EQ%00)s%1B%D7%08%EDE%03%F6Te%D9%93%AES%DA%14%82R%90%A0%94%A9%20%CC%15NG%91%D7Q%A7%19k%3D%05%8Cn%91%A1I%F5U%0A(%60%12%04%F7%D0%CB%88%1B%93%D7%D0%C4rB_%FD%91db%97%9FIkC%20%3EE%DBB%BA%AD%F1%D1%9C%99%D7UC%E5jh%95%EA%8E%16B%3FMR%89%C0%CE%13%5D0%20%86s%1B%D4fUK%D84!%C6%88.%2C%09%A5%5C%DE%13'%A4%81%91%96%C7%A1%F4%8Fd7k%E3%3F%96bS%99J%81%F4%94%A7%A7%EB%16%7D%D9u%F7%1D-%A4%DBd%F7%84%D1%CB%EE%90S%A0%89%B8%0E!%80%84%8A%1BRq%C8%F9%A5%1B%81Nd%D3L%CE%C0%D8%E5%11(%9CG%2F%A7%5C%06%E6%9BRn%2F%8B%2C%D1hK%87%E2%0A%24%9E%3F%8E%BB%CF%7Db!%D7%10%E2%8A%E8%C1%5BD%F8%81%FD%60%ACSg)M%80%86!%8E%03%F5%0F%F08c%EA%1DG%24%F2%13%1BA%EB%BCz%E9%60%8CW%7F%A0%A5%C3%12%98%D9M%8F%A0%01D%3F%23%88%87%A9%40%85%C4q%FBu%E4%F7%22%D1J%3Fq%20~%A2%7F%A4%09%E4%1C%0A%9C%90%01%9F%E4e%FA%C5K8p*%C9%7C%C2%F2%EEY%EA%8A%17t%23%CF%C9%F7%BB%5D%1C%F8Sn%A3%FB%92%CE%1EG6b%A1%D6P%E9%B63x%F5%CE%99J%26%10LR%02%971%0A%06%EA%EC%F7%01%1F%07%DB%E5%A1%AA%04%CE%CCj)%8B%AAI%98%90%06s%D0u%3Db%8F%F6%AC%A6%AB%EE2%E4%FD%D1A5%9F%13%E9%01%7B%82%A5%82%95%00w!!%40%0F%3D%E0%D5%F0%D3%C1%AD%FC%A2Kr%CFvw%CFom%7B%2F%BA%F6%A8%A7%B4%0D%B8%B1%DA%18%A0%13%B1%B2%B6%C5%EC37%DBTAVU%F9%5C%B4%3C%CA%91B%8B%D4%C7%13%14%AB%90%A2%19%CE%1Dr%3E%F0eV%FB%855%B2%D5b%AAm%DBc%09K%92B%A6%90%00H%0D)%3BNaJ%E4u%F7%09%01%C6f%FD%A2%E1D%9A%DA%1A%A7ZZ%D8%A7%7D%2Bu%A5h%1CH%E2%08%1B%CD*%02%7C%B5%FD%C4H%CAf%3D%D9%FE%149%A6%9B%C76%0B'5%E8O%AF%CFd%95Z%B8Y%AB%F6%E6F%C8Zf3%24%DD%80%83%F7%CD%11I9%B7%CED%3DREl%8B%1C%030%86%22%1C%82%BB2%C7%EDo%B2%CDR%E8%E9%D1P%FA%5BHp%84%958%E0%98B%01%D5d%8D%A45%DA.%85%AF%EEK%B7%95iU-%BF%1A%A86%D6%DA%E6%B55N%CA%D2%DC%88K%AAQ-%92%00V%B3%24Lk!8%91%3F%17%7C%F4%E4%15%0F%913%3F%1F%FC%D6%93%97%90%B9%B4z%FE%BDF%B0%DC%DE-!d%8C%B5E%B24%82t%F9%1B%12%E7%5C%B6(%7BDKeW%88puL%A1%F2%9100%E7%02%12B%EBIEYH.%94)%3F%19%9C%D2S%C3bS%B4%CC%84%C4%FD5%8Dk%BE%9D%AF%C5.xh%EE%AFot%A3Pm%D7%12%D2%40K%C8W%FD%EB%92d%1A%2C%A8%A4%14%84%90%A9%A8%92%08%8B4%A28%A4Q%C0C%F5b%06%C7%100%18%40%C1%F9%08%8E%00n%B5D%92R%09%12%F2%8At%40%06I%D8B%BD%3A%12%06%9B%C3%BAU-%94%DBk%86%EA%DE%DE8cQ%A3B%B8%9D%9Dt%D5%A2%8F%DC%24%C9%13%A4%87%ED4G%F7%16%13%AE%E0%84%C3%10(f%C4%C2%05%01%10%C3%B8W1k%A2r%E3S%CB%E0e%25FZ%99F%05%D6%E4%C5%A2%DC%F5%CE%A8%F1%A6e%05J2'A%E1%15%A0%E4%7F%1F%A1%B9%B1~%0En%FCo%5E%D4%8E%DE%F8%85%98%CC%EE%1E%D3%A9%26%8D%1Bs%E3%ED1m%D2M%AD%E6%B0Qp%91U%95%7F%1A%96%8B%B2k*%D5%FEP%C8%A6%A1%D4%01%B1%5D%8A%FB%85%C3nX%B2p%8C%B5%3FQ%8E)G%8F!%B0T%E6%1D%04%9D%13%FE%25%20%009r%E9%14%F7%3B%C3%91%9EW%9E%E3v%9E%B4'%24D%8B%94%E9PC%EB(%97%1F%80%C8%00%0F%B8%B9%CF%94%FD%B2%E3%AC%FA%A3%C3%FELo%A57%88%D3%FB%AD%F2%2F%0C%3B%3Da%A4%D8%DD%C0%A1%25f%84N%B7h%B9%D7P%8D%8A%EC%E6d%AB(%1C%ECOf%98%9C%3B%94QI%96%60p%9ADP%40Lc%08%F3%AE%F3%7F%F3%7CN%F1%F5%F8%7DJ%1E%B0%BE%D7%C8%B0%95r%0D%BAV%A0P6%3A%20%24%C8%ED%3D%E3%B7%E0Y%5E_K%85%BDw%EE%8B%2B%A1%B9R%B9%C1%24%F1%E6Z%08D%89%DD'%DD%CAd%0De%00%0Ej%DDh%3C%95%D9%0D%A2%E5%9E%CBZ%24_B%C4Z%9E%D2%9A%A8%FD%A3%98Gq2%E2%E1%D1%81s2t%9AN%5BI%C4%CAE%AC%92%BAc%81%CA%A9%14!%B2%90%07%AF%97%3Fz4-dX%95%97%B9V%0A%97%90%E5%15%CCQ%A1%3C%B8%25.%B8%14%EA%1F%00j%5CmM%94%82IO%13%A8%26%3E%91%7D%89w*%CD%90T%5D1%BA%60%8A%9B%3D%D2%98T)e%B4%95)%B6%16%18~%9C%92%08%E2%B2%A0d%04%E67%E9%10%97%9F%7Cm%E4F%FD%5C%B8U%CE%3E-%ED%B4%F5%BE%F9)Y%A6%B1%BC8%AB6%05_D%5C(%93%8D%DFU%AE%B3h%19b%1C%91%22%ABL%87T%40%C2B'%90%C7%02%89%80o%9Fb%F3%B4%E6%3D%A6%B5%DF%EE'%F9%ABh%1BQ*%9C%CA%D36%D6%AD%7F%D9hR%BF%18%DD1%5C%A3%11%ED%CD%C31%EDFeP%DAmt%B7%07SL%D2%F5O%C4%F2T%A7%1AOB%076%CC%80%9F%20I%8BR%C6%A8%E5V%0C%D4z%91Pxf%E9%0B%A4Hr(D%9Ce%00Y2%1D3%9C%86)%14%C4%00%40G%D3%A9%C5%F1%E6x%FE%D9%99zt%8A%1C%E2ZC%8AC%0A*d%12%12N%E5%23b%7C%C8%D4%C6oM%86CR%EBV%80%BBV%E4%EA%96%B8v6%0A%D4%EBU%98M%C1%C9%B6%2B%C8%D9f%2B%26%20vO%DA%9C%A6%22%CD%146%02%60%F4%10%C0%04%04%04%3Ac%94%EC%D56%AAj%84%85%B0%B1%25%03%B1%11%8DV%CD%1DU%3A%A8%EB%D2%17H%F0%E2%A4%910A%DEq%C0%FD%EA%F8p%B7%D3%ED%A3%B8%BC*%DC%E3Q%5E%20%B2%AEZS%ACv%09h7%91E%13fQ%AD~%F9%0AW%92.%A3%C7%1CA%BC%8Ajf0%17QL%000%E3w%9E%D9%5C%99%AF%FA%BC%5D%D54%CC%C9%E1%CC%81%3E%9A~%7Db%BE%DF%BB'UES%FF%00%A3%80%D6*%99%D12%12%93%25%02z%25%7D%07%8F%8C%04%E7~%3F%B9%AB%BA%8E%DB%DB9%B9%C8T%A0%F6%B6%8AS%BB%92%B1O%5C%89n%97%87%8E%22%22%93%85%2BP%91%CD%8B%04%12o%93T%13%05%95%03%AF%F7%0F%C8r%F5%AC_%F1%DB%95%25%AD%FB%CE%7FZ(1%9A%16%CB%AF%D4%12O%14%26%5B'%5ED%E8%26A%DEP%98%F7d%7B%C1%DCK%C5%3E%3Fwz%A2%A1%DA%87%03Ii%0E%17%5DX%1A%F2(%3E%DE%3B%82w%123%90%10%EF%93%06%3B%E4%B6%DE%F1%0F%8AU%17%90%7B-%40t%AA%B1%EB9%05Ww'%22%EC2L%EE%A5%CD%DA%86P%CD%D21%94%5CS(%9CTP%CB%9Cp%0C%D8%05(%CF%B2%EB%D7%DCvIo%EDWk%A9%5DF%11%F3rm%D5%A0%F1p%F1%92%EEN8%3D%C8%0C%A7%92%12%C1%D1D%CFx%FBI%D9%CE%D2a%DFh%7D%BB%7F%2F%CB%DD%A5%17%96%12%80Zi%CEJJ%8F%F2%22%99(%FF%00%25%3C%A9-%E5%01%EC%23%8E%C2%2C'%B6%DBy%0B%B7%94*u%26%24%0D%E3%EA%90Q%F1%0D%CCC%98%08%B9%9A%B7%C8%E1%D1%80%40%04%E6v%E4%C7XD%7DD%C7%C7%EB%D7%D3%FC3%1F%A3%C4%F1%3B~1n%98%A3%A0%A5C%09%DF%DC%5B%1CT%A3%3D%7D%EB%E4%AF%C6(%26W%7D%A9%CB2Z%FC%9A%BC%0F%AD%AF%7D%E7%17-4y%5C%B8%E9%FE%A0%25%20%F4%03%CE%08e)HP)%40%0AP%FA%00%06%01%FF%00%04z%D9%A2%0A%3DtA%08%A8%A2%25%11%03%9C%A0%24%0C%C2%02l%04%A1%87%EA%10%C40(%E3%F5%1FN%89%CB%FAB%82F%D0%91%3BA%1F%DB%C9%99O%D4%04%C4%07%1CM%F9%18%A5%FD%26%13c%F9%08b%23%F7%E9%B2%0A%DEzz%C3d%24GC%BC4oT%EA%1D%CE%AB%2FW%BFEE%C9%D4%E5%8A%82s%2C%A5%95%3BV.%CA%9A%C8%A8%DC%1D%3A*%ED%8F%88%2C%99%00%07P%04D%00%3F%C7P%D9%065d%CBm.X%B2*dVZ%1D%12%5B%2B%99B%87%82%80%22c%C8%E9%12%D6%0B%E5%DF%17%BA%B1%7C%C7%EA%1D%A5%BB%D3*m%3A%83%EFA%F2%26~'C%A7%946%F6%F7ivsh%CA%AC.%DET%ABt%E5'%14Y%FA%AC%A3%B1M%FC%98%A4d%05u%3F%92%E1g%CEP%40%C0L%C5%01%14%D3%C41%00%CD%EB%0D%87v%EF%09%ED%ED%23%B4%18%5D%B6%9E%DDH%EA%92%A5%A5%A0%A12%04%93%A9%24%80%07%40%40%F2%89%7C%BB9%CB%B3%CA%E4%5C%B2%FA%F7%EB%EB%1BmHJ%9C%22A%2B3P%E2%90%94%92OR%9E%5E%06%0A%89%AE%D4%00%C9%A4%AAB%08%18%C9%9C%A9%9C%A7%D11~%A48%14L)%981%FA%0E%03%D6%E8%7CcS%E8%07%40%25%F9G%C7%0F%99%B4%40%EE%9D%3AA%ABT%C8*(%E5%CA%A4A%BAi%97%0C%C7QuD%89%10%81%8F%D4D%03%A0j'%04%2F%A8%9E%9E%AErid%D4%D4%CC%194%F2%E6%CF%9B%1C%B92%FA%E3%F4%C3%A2%08%A9%C7%FB%10%D79%09%03%BE%BCiC%8FR%B6%86%0F%FEB6%BE%F7%F1%A3b%5E%1Eve%A4%7Dj%C5x%BB%D2%B7%22%81w%ECX%3AM%26%B2qM%E2%A5%D2%3B%C4%C1'%05hs%80%1CJ%02%1DeS%F0P(%5C%F4%3B%F8L%7Fm%3F%BC!%8EZ%F1%97%9B%9C%D2%DB%8D%ABq%C8%A9%CD%D9q%C6x%FD%E7%BF%D8x%B3r%E4~%E1S%1En%AC%1D%11o%8D%DE%26%166%85%40%8D%ABZ%5E%0Dv%22C%94%FB%ECg%8C%9C%BF0%15%E3%C5%11%14%11%13%3B%C0z%F4p!%7F%C6%810%09%DB%D7R%7C%7C%BC%8C%2FH%95%BC%91%E5%876ym%C6%5EP%D9%F9%1Dt%26%CD%ED%BE%C8%ED%CF%C4%5E%E2%DE%F8%EB%0D%B5%C9D%BD%85%B8r%22%5Bj%B7%13tl%D6%8D%C4r%E9K%84%1Dn%86%EA%1D%CB%FF%00%1Ct0l%8B%83%A6%EDM%24%7D%5C%DAZB%F6%DF%96%B3%F0%DA%08%1A%EF%8F3%F9%85%C9ne%EE4%FD%07u%90q%C9%8D%9C%DA%8F%98%AD%BC%E3%9F%16v%F7o%D6%83%BA%EC%84E%5Bo%A8%EDv%2Fq%CDmT%CA%3F%DC%FB%3F!)%CCB%C3%02s%A6%0DH%A2I%8B2%89L85(m%07m%08N%FBOI%CF%FEzA%05%0B%3F6%F8%A3%C3%3E%05%ED%13%DF%8B%9D%E8%5E%AD%C8%AD%E4%FE%BE%8F%E4%7D%DAQ9-%C4%99.%E8%C0%ECu%8E%E5%20%C7~%EC%FC%86%9CwT%DA%EB%F4%F5%AE5%D2.QM%A9%E5%25%9F%01%98%A0%89UQ%13%11%12%8F%91d%BB%FB%06%DE%90%0F8%92%FC%04%B9%5B%BEByQ%C8%8A%CF%2C%B9%15a%7FW%E4%DF%C7%8F%05%B7a%97%1A%A3%3B%8AevD%F6jb%D2%7B%8Fl%DA%02%BB%91U%ECDu%17p%23%95o%26x%F4%94%17%0E%A42%3D8%8Btzc%C9Hd(%0Df%7F.%90k%16%95%F6%0Ds%FA%EB%FA%BBI%E7%B4%7D%95%EC%1D%0F%20%EB%C8%7Bs%C1%FBwK%CA%EAw%BD%E7%8C%F4%EE3%EA%E7%FC%F1%CD%EB%D6%2C%10%E2%7D%E1%B5Zy%2F%19%AF%DD%13%B0%EF%BB%5D%5E%F7L%F9%3BN%E3%F3%EE%B4%B3a%93%F3%CB%8F%DB%1E%94O%A4%11%ABu%EC%CF%14n%FB%DB%1E%13%BE.n%EB%C5x%AF'%DD%0EL%DA%DF%C4%EF%BB%DCp%FF%00%D3W%FE%DD%1A%C1%0B%BE%F6%AE%9C%D7%92%F6%FE%97n_qw%DE%3BO%B5%D26O5%AF%F8%F6%FA%18%E1%AF%F8%E4%C7%ED%D1%AC%11%8C%CF%D9%3Ed%FD%87%B5%BD%C3%A0%D3%3Fg%E2%7C%CFm%D9%17%B1%CF%A3%FC%ED%0F%1F%86%96%3F%8E%8E%19%7F%1E%8De%E5%04i%1D%7FSvo%BB%DF%EB%BF%1F%E7%DBy.%EB%DB%5D%9F%BA5%CB%D9%F7%DA%BF%B3%E7%FB%9C%BAZ%9F%C8%CF%86_%5E%97%DD%E7%04o%18%7B%2F%BA%8C%F1%9E%D7%EF%BCA%BC%3Fa%E2%7B%AF%03%AC%19%FCgo%FB%DE%23%B8%C3%1D%2F%D9%CF%FEzMe%E5%04%3A%3AH%23%FF%D9";
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																	   return WCImgSrc;
}
//														do no edit

if (!GM_xmlhttpRequest || !GM_log) {
    alert('The CLP Lookup script requires Greasemonkey 0.5.3 or higher.  Please upgrade to the latest version of Greasemonkey.');
    return;
}

addGlobalStyle('.stub { height: 1em; margin: 1em; } .libraryAvailable { font-weight:bold; } .libraryUnavailable { color: rgb(153,0,0)} ');


// CD or DVD?															edit on cd, book, dvd, vhs->       title + "";
//																		may it's a book
if (isDVD() || isCD() || isVHS()) {
	//GM_log("This page is probably a DVD or CD.");
	var itemAvailabilityDiv = getItemAvailabilityDiv();

	if (!itemAvailabilityDiv) {
		throw new Error('Could not get item availability stub');
	}

	itemAvailabilityDiv.setAttribute('class', 'stub');
	// Get title:
	
	var titleLocation = getTitleLocation();

	if (titleLocation) {
		var title = titleLocation.textContent;
		slog("Title: '" + title + "'.");

    	// Remove junk from title as best we can:
    	title = parseTitle(title);
    	slog("Parsed title: '" + title + "'.");
    	var url = "http://catalog.einetwork.net/search~s1/X?SEARCH=(";
		var itemType = "";

		// Check to see if it's a DVD or CD:
    	if (isDVD()) {
    		//GM_log("Is DVD!");
			var mediumID="h";
    		url+= title + ")&m=" + mediumID;
    		itemType = "DVD";
    	}
		else if (isCD()) {
			//GM_log("Is CD!");
			var mediumID="n";
			url+= title + ")&m="+ mediumID;
			itemType = "CD";
		}
		else if (isVHS()) {
			slog("Is VHS!");
			var mediumID="g";
			url+= title + ")&m=" + mediumID;
			itemType = "VHS";
		}
		//GM_log("Inserting link...");
    	insertItemSearchText(itemAvailabilityDiv, "Carnegie Library", url, itemType);
    }
    else {
    	slog("Can't find title!");
    }

}
// Maybe it's a book?
else {
    var isbn = getIsbn();

	if(isbn) {
		slog("Could be a book. Likely ISBN: " + isbn);
	    var itemAvailabilityDiv = getItemAvailabilityDiv();

	    if (!itemAvailabilityDiv) {
			throw new Error('Could not get item availability stub');
	    }

	    itemAvailabilityDiv.setAttribute('class', 'stub');
   		slog("About to insert spinner...");
	    insertText(itemAvailabilityDiv, '<img src="' + getSpinnerSrc() + '" alt="Spinner" /> Searching for this edition at ' + carnegieLibraryName + '.');
	    libSearch(isbn, itemAvailabilityDiv);
		accessPA(isbn, itemAvailabilityDiv);
		worldcatSearch(isbn, itemAvailabilityDiv);
	}
}