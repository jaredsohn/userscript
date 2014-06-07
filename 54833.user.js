// ==UserScript==
// @name		UserScript.org Page Greasemonkey Menu Command
// @author		Erik Vold
// @datecreated	2009-07-30
// @lastupdated	2009-07-30
// @namespace	userscriptsOrgPageMenuCmd
// @include		http*://*userscripts.org/*
// @version		0.1
// @description	Allows you to switch pages easily on userscripts.org via Greasemonkey menu command.
// ==/UserScript==

var userscriptsOrgPageMenuCmd = function (  ) {
	var currentPageNum = document.evaluate("//div[@class='pagination']/span[@class='current']",document,null,9,null).singleNodeValue

	if ( !currentPageNum ) {
		return false;
	}

	var nextPage = document.evaluate("//div[@class='pagination']/a[@class='next_page']",document,null,9,null).singleNodeValue;
	var prevPage = document.evaluate("//div[@class='pagination']/a[@class='prev_page']",document,null,9,null).singleNodeValue;
	currentPageNum = currentPageNum.innerHTML;

	function trim(stringToTrim) {
		return stringToTrim.replace(/^\s+|\s+$/g,"");
	}
	function isNumeric( input ) {
		return (input - 0) == input && input.length > 0;
	}

	trim(currentPageNum);

	if ( nextPage || prevPage ) {
		switchPage = function ( str ) {
			if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
				var str = unsafeWindow.ubiquityGMInput;

				// reset for next execution
				unsafeWindow.ubiquityGMInput = "";
			}
			else if ( !str ) {
				var str = prompt( "Page:" );
			}

			str = trim( str );
			str.toLowerCase();

			if ( nextPage && ( str == 'nxt' || str == 'next' || str == '+' || str == '+1' || str == 'right' ) ) {
				window.location = nextPage.href;
				return true;
			}
	
			if ( prevPage && ( str == 'prv' || str == 'prev' || str == '-' || str == '-1' || str == 'left' ) ) {
				window.location = prevPage.href;
				return true;
			}
	
			if ( isNumeric( str ) ) {
				var pageLink = document.evaluate("//div[@class='pagination']/a[text()='" + str + "']",document,null,9,null).singleNodeValue;
				window.location = pageLink.href;
				return true;
			}

			return true;
		}

		GM_registerMenuCommand( "Page", switchPage, "", "", "p" );
	}
};

userscriptsOrgPageMenuCmd();