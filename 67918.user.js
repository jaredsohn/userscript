// ==UserScript==
// @name	SFGate-NoComments
// @namespace	http://www.userscripts.org
// @description	Hide comments on SFGate.com articles
// @version 0.4
// @include	http://www.sfgate.com/*
// @copyright	2010+, Andrew Rich (http://www.project-insomnia.com)
// @license	(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

//	hide comments link in top page-tools bar
var allTDs = document.getElementsByTagName('td');
//GM_log ( 'allTDs.length:' + allTDs.length );
for ( var i = 0; i < allTDs.length; i++ ) {
	//GM_log ( 'allTDs[' + i + '].className.toLowerCase: ' + allTDs[i].className.toLowerCase() );
	if ( allTDs[i].className.toLowerCase().indexOf ( 'comments' ) > -1 ) {
		//GM_log ( '*** MATCH ***' );
		allTDs[i].style.display = 'none';
		//GM_log ( 'allTDs[' + i + '].style.display now: ' + allTDs[i].style.display );
	} // if
} // for

function pi_noComments() {

	//	hide all Ps with class 'comments' or 'pluck'
	var allPs = document.getElementsByTagName('p');
	//GM_log ( 'allPs.length: ' + allPs.length );
	for ( var j = 0; j < allPs.length; j++ ){
		thisP = allPs[j];
		thisPClass = thisP.className.toLowerCase();
		//GM_log ( 'j: ' + j + '; thisPClass: ' + thisPClass );
		if ( ( thisPClass.indexOf('comments') > -1 ) || ( thisPClass.indexOf('pluck') > -1 ) ) {
			//GM_log ( '*** MATCH ***' );
			thisP.style.display = 'none';
			//GM_log ( 'thisP.style.display now: ' + thisP.style.display );
		}	// if
	}	// for
	
	//	hide all DIVs with class 'comments' or 'pluck' or id 'comments'
	var allDIVs = document.getElementsByTagName('div');
	//GM_log ( 'allDIVs.length: ' + allDIVs.length );
	for ( var k = 0; k < allDIVs.length; k++ ) {
		thisDIV = allDIVs[k];
		thisDIVClass = thisDIV.className.toLowerCase();
		thisDIVId = thisDIV.id.toLowerCase();
		//GM_log ( 'k: ' + k + '; thisDIVClass: ' + thisDIVClass + '; thisDIVId: ' + thisDIVId );
		if ( ( thisDIVClass.indexOf('comments') > -1 ) || ( thisDIVClass.indexOf('pluck') > -1 ) || ( thisDIVId.indexOf('comments') > -1 ) ) {
			//GM_log ( '*** MATCH ***' );
			thisDIV.style.display = 'none';
			//GM_log ( 'thisDIV.style.display now: ' + thisDIV.style.display );
		}	// if
	}	// for
	
	runNoComments++;
	//GM_log ( 'runNoComments: ' + runNoComments );
	if ( runNoComments < 10 ) {
		window.setTimeout ( pi_noComments, 1000 );
	}	// if
}

var runNoComments = 0;
if ( window.addEventListener ) {
	window.addEventListener ( 'load', pi_noComments, false );
} else {
	window.attachEvent ( 'onclick', pi_noComments );
}	// if
