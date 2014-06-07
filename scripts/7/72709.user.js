// ==UserScript==
// @name           AICN Power Mod
// @namespace      http://scripts.corehook.com/
// @include        http://www.aintitcool.com/node/*
// @include        http://www.aintitcool.com/talkback_display/*
// @description    Tricks out Ain't It Cool News with all sorts of fixes and new features.
// @copyright      2010+, Maltheus (http://scripts.corehook.com/aicnpowermod.js)
// @author         Maltheus
// @version        1.1.2
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var version = "v1.1.2";

// Version History:
//	v1.1.2	- Fixes summary links in node/summary display.
//	v1.1.1  - Fixes problem if the last word on a paragraph is long and AICN screws up the br tag for the newline.
//			- Allows the use of an http image link for a background color.
//			- Hidden post background/foreground color is now configurable.
//			- Added the control panel to the node/summary display.
//			- Added settings comment, with links to HTML color pickers and the regular expressions wiki.
//	v1.1.0  - Replaced status bar with control panel, show talkback title in title bar, favorites highlight, post summary, talkback history, referenced post count, bug fixes.
//	v1.0.2	- Fixed banned words in node display.
//	v1.0.1	- Made user search case insensitive and prevented banning own posts.
//	v1.0	- Inital - Introduced in http://www.aintitcool.com/talkback_display/44447#comment_3240340

////////////////////////
// Begin Settings Init
////////////////////////
var userName = GM_getValue( "userName" );
var bannedUsersCSV = GM_getValue( "bannedUsers" );
var hiddenWordsCSV = GM_getValue( "hiddenWords" );
var favoritePostersCSV = GM_getValue( "favoritePosters" );
var hideFirstPosters = GM_getValue( "hideFirstPosters" );
var userHilightColor = GM_getValue( "userHilightColor" );
var userHilightBackground = GM_getValue( "userHilightBackground" );
var favHilightColor = GM_getValue( "favHilightColor" );
var favHilightBackground = GM_getValue( "favHilightBackground" );
var hiddenForeground = GM_getValue( "hiddenForeground" );
var hiddenBackground = GM_getValue( "hiddenBackground" );
var commentAreaColumns = GM_getValue( "commentAreaColumns" );
var commentAreaRows = GM_getValue( "commentAreaRows" );
var subjectColumns = GM_getValue( "subjectColumns" );
var showStatistics = GM_getValue( "showStatistics" );
var showTalkbackHistory = GM_getValue( "showTalkbackHistory" );
var showSettings = GM_getValue( "showSettings" );
var showMyPostSummary = GM_getValue( "showMyPostSummary" );
var postHistoryCount = GM_getValue( "postHistoryCount" );

if (userName == undefined) {
	userName = "EnterYourUserName";
}

if (bannedUsersCSV == undefined) {
	bannedUsersCSV = "";
}

if (hiddenWordsCSV == undefined) {
	hiddenWordsCSV = "";
}

if (favoritePostersCSV == undefined) {
	favoritePostersCSV = "";
}

if (hideFirstPosters == undefined) {
	hideFirstPosters = 5;
}

if (userHilightColor == undefined) {
	userHilightColor = 'yellow';
}

if (userHilightBackground == undefined) {
	userHilightBackground = '#000077';
}

if (favHilightColor == undefined) {
	favHilightColor = 'black';
}

if (favHilightBackground == undefined) {
	favHilightBackground = '#A4DEAA';
}

if (hiddenForeground == undefined) {
	hiddenForeground = 'black';
}

if (hiddenBackground == undefined) {
	hiddenBackground = 'gray';
}

if (commentAreaColumns == undefined) {
	commentAreaColumns = 64;
}

if (commentAreaRows == undefined) {
	commentAreaRows = 15;
}

if (subjectColumns == undefined) {
	subjectColumns = 56;
}

if (showStatistics == undefined) {
	showStatistics = true;
}

if (showTalkbackHistory == undefined) {
	showTalkbackHistory = true;
}

if (showSettings == undefined) {
	showSettings = true;
}

if (showMyPostSummary == undefined) {
	showMyPostSummary = true;
}

if (postHistoryCount == undefined) {
	postHistoryCount = 6;
}

function saveSettings() {
	userName = document.getElementById( "aicnpmSettingsUser" ).value;
	GM_setValue( "userName", userName );

	hiddenWordsCSV = document.getElementById( "aicnpmSettingsHiddenWords" ).value;
	GM_setValue( "hiddenWords", hiddenWordsCSV );

	bannedUsersCSV = document.getElementById( "aicnpmSettingsHiddenUsers" ).value;
	GM_setValue( "bannedUsers", bannedUsersCSV );

	favoritePostersCSV = document.getElementById( "aicnpmSettingsFavoritePosters" ).value;
	GM_setValue( "favoritePosters", favoritePostersCSV );

	hideFirstPosters = document.getElementById( "aicnpmSettingsHideFirstPosters" ).value;
	GM_setValue( "hideFirstPosters", hideFirstPosters );

	userHilightColor = document.getElementById( "aicnpmSettingsUserHilightColor" ).value;
	GM_setValue( "userHilightColor", userHilightColor );

	userHilightBackground = document.getElementById( "aicnpmSettingsUserBackgroundColor" ).value;
	GM_setValue( "userHilightBackground", userHilightBackground );

	favHilightColor = document.getElementById( "aicnpmSettingsFavHilightColor" ).value;
	GM_setValue( "favHilightColor", favHilightColor );

	favHilightBackground = document.getElementById( "aicnpmSettingsFavBackgroundColor" ).value;
	GM_setValue( "favHilightBackground", favHilightBackground );

	hiddenForeground = document.getElementById( "aicnpmSettingsHiddenForegroundColor" ).value;
	GM_setValue( "hiddenForeground", hiddenForeground );

	hiddenBackground = document.getElementById( "aicnpmSettingsHiddenBackgroundColor" ).value;
	GM_setValue( "hiddenBackground", hiddenBackground );

	commentAreaColumns = document.getElementById( "aicnpmSettingsCommentAreaColumns" ).value;
	GM_setValue( "commentAreaColumns", commentAreaColumns );

	commentAreaRows = document.getElementById( "aicnpmSettingsCommentAreaRows" ).value;
	GM_setValue( "commentAreaRows", commentAreaRows );

	subjectColumns = document.getElementById( "aicnpmSettingsSubjectColumns" ).value;
	GM_setValue( "subjectColumns", subjectColumns );

	postHistoryCount = document.getElementById( "aicnpmSettingsTalkbackHistoryCount" ).value;
	GM_setValue( "postHistoryCount", postHistoryCount );

	alert( 'Settings saved! Reload page to apply changes.' );
	return false;
}
//////////////////////
// End Settings Init
//////////////////////



//////////////////////
// Utility Functions
//////////////////////

String.prototype.startsWith = function( str ) {
	return (this.indexOf( str ) === 0);
}

function trim( stringToTrim ) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function csvToRegExArray( csvLine ) {
	var regExArray = new Array();
	
	var parsed = csvLine.split( ',' );
	
	for (var i=0; i<parsed.length; i++) {
		var oneValue = trim( parsed[i] );
		
		if (oneValue.length > 0) {
			regExArray.push( new RegExp( oneValue, 'i' ) );
		}
	}
	
	return regExArray;
}

// Replaces new lines with br tags.
function nl2br( text ) {
	var converted = text;
	var escapedText = escape( text );
	var newLineChar = null;
	
	if(escapedText.indexOf( '%0D%0A' ) > -1) {
		newLineChar = /%0D%0A/g ;
	}
	else if(escapedText.indexOf( '%0A' ) > -1) {
		newLineChar = /%0A/g ;
	}
	else if(escapedText.indexOf( '%0D' ) > -1) {
		newLineChar = /%0D/g ;
	}
	
	if (newLineChar != null) {
		converted = unescape( escapedText.replace( newLineChar,'<br />%0A' ) );
	}
	
	return converted;
}

function getTalkbackHistoryHTML() {
	var history = '';
	
	for (var i=0; i<postHistoryCount; i++) {
		var oneNode = GM_getValue( 'histNode' + i );
		var oneTitle = GM_getValue( 'histTitle' + i );
		
		if (oneNode == undefined) {
			break;
		}
		
		if (i > 0) {
			history += '<hr style="width: 100px" / >';
		}
		
		history += ('<a href="http://www.aintitcool.com/talkback_display/' + oneNode + '" class="aicnpmTBHL">' + oneTitle + '</a><br />');
	}
	
	return history;
}


var userSearchRegEx = new RegExp( userName, 'i' );
var bannedUsers = csvToRegExArray( bannedUsersCSV );
var hidePostsWithWords = csvToRegExArray( hiddenWordsCSV );
var favoritePosters = csvToRegExArray( favoritePostersCSV );
var postHistory = getTalkbackHistoryHTML();

// Replaces any comment newlines with br tags.
function addNewLines() {
	allElements = document.evaluate(
		'//textarea',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem( i );
		
		if (thisElement.name == 'comment') {
			thisElement.value = nl2br( thisElement.value );
			break;
		}
	}
	
	return true;
}

function setElementBackground( element, color ) {
	if (color.startsWith( "http" )) {
		element.style.backgroundImage = ('url("' + color + '")');
	}
	else {
		element.style.backgroundImage = 'none';
		element.style.background = color;
	}
}

// Restores a collapsed post.
function showPost( collapseID ) {
	var collapsedRow = document.getElementById( collapseID );
	var nextRow = collapsedRow.nextSibling;
	
	nextRow.style.display = '';
	
	if (fullDisplay == true) {
		nextRow = nextRow.nextSibling;
		
		while ((nextRow != null) && (nextRow.tagName != 'TR')) {
			nextRow = nextRow.nextSibling;
		}
	
		nextRow.style.display = '';
	}
	
	collapsedRow.style.display = 'none';
}

var collapseIndex = 1;

function collapsePost( headerCell, message ) {
	var titleRow = headerCell;
	
	while (titleRow.tagName != "TR") {
		titleRow = titleRow.parentNode;
	}
	
	titleRow.style.display = 'none';
	
	if (fullDisplay == true) {
		var commentBodyRow = titleRow.nextSibling;
		
		while ((commentBodyRow != null) && (commentBodyRow.tagName != 'TR')) {
			commentBodyRow = commentBodyRow.nextSibling;
		}
		
		commentBodyRow.style.display = 'none';
	}
	
	var newRow = document.createElement( "TR" );
	var newCell = document.createElement( "TD" )
	var uncollapseAnchor = document.createElement( "A" )
	
	newRow.id = ("collapsed" + collapseIndex);
	newCell.colSpan = 2;
	newCell.className = "talkback";
	newCell.style.padding = '10px';
	newCell.style.color = hiddenForeground;
	setElementBackground( newCell, hiddenBackground );

	newCell.appendChild( document.createTextNode( message ) );
	newCell.setAttribute( "onclick", "return false;" );

	if (hiddenBackground.startsWith( "http" )) {
		newCell.setAttribute( "onmouseover", "this.style.backgroundImage = 'none';this.style.background = 'blue';this.style.color = 'yellow';" );
		newCell.setAttribute( "onmouseout", "this.style.backgroundImage = 'url(\"" + hiddenBackground + "\")';this.style.color = '" + hiddenForeground + "';" );
	}
	else {
		newCell.setAttribute( "onmouseover", "this.style.background = 'blue';this.style.color = 'yellow';" );
		newCell.setAttribute( "onmouseout", "this.style.background = '" + hiddenBackground + "';this.style.color = '" + hiddenForeground + "';" );
	}

	newCell.addEventListener( "click", function() { showPost( newRow.id );}, true );
	
	titleRow.parentNode.insertBefore( newRow, titleRow );
	newRow.appendChild( newCell );
	
	collapseIndex = collapseIndex + 1;
}

// Go through cells and change the styles.

var firstRegEx = /\b(first|second|third)\b/i;
//var firstRegEx = /first/i;
var headerIndex = 0;
var myPostCount = 0;
var referencedPostCount = 0;
var foundWords;
var summaryHTML = '';
var fullDisplay = (location.href.indexOf( "talkback_display" ) != -1); 
var nodeID = location.href.replace(/.*\//,'').replace(/#.*/,'');

function filterComments() {
	var inUserTB = false;
//	var headerCell;
	
	allElements = document.evaluate(
		'//td',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem( i );
		
		if ((thisElement.className == "talkback") || (thisElement.className == "talkback_aicn")) {
			var commentHeaderHTML = thisElement.innerHTML.replace(/[\n\r\t]/g,' ');
			
			var commentUser =   commentHeaderHTML.replace(/.*<br>by /,'').replace(/<.*/,'');
			var commentTitle =  commentHeaderHTML.replace(/<\/a>.*/,'').replace(/.*>/,'');
//			var commentTitle =  commentHeaderHTML.replace(/[^>]*>/,"").replace(/<.*/,"");

//			headerCell = thisElement;

			if (headerIndex < hideFirstPosters) {
				// Hide the faggoty first posters.
				if (commentTitle.search( firstRegEx ) >= 0) {
					var titleRow = thisElement;
					
					while (titleRow.tagName != "TR") {
						titleRow = titleRow.parentNode;
					}
					
					titleRow.style.display = 'none';
					
					if (fullDisplay == true) {
						var commentBodyRow = titleRow.nextSibling;
						
						while ((commentBodyRow != null) && (commentBodyRow.tagName != 'TR')) {
							commentBodyRow = commentBodyRow.nextSibling;
						}
						
						commentBodyRow.style.display = 'none';
					}
				}
			}
			
			foundWords = new Array();
			
			// Comment header cell.
			if (commentHeaderHTML.search( userSearchRegEx ) >= 0) {
				// This is a post by this user or it references a user.
				inUserTB = true;
				
				setElementBackground( thisElement, userHilightBackground );
				thisElement.style.color = userHilightColor;
				
				anchorElements = thisElement.getElementsByTagName( 'a' );
				
				with (anchorElements[0].style) {
					color = userHilightColor;
				}
				
				if (commentUser.search( userSearchRegEx ) >= 0) {
					myPostCount++;

					if (fullDisplay == true) {
						summaryHTML += ('<a href="#' + anchorElements[0].name + '" class="aicnpmTBHL">' + commentTitle + '</a><br />');
					}
					else {
						summaryHTML += ('<a href="http://www.aintitcool.com/talkback_display/' + nodeID + '#' + anchorElements[0].href.replace(/.*#/,'') + '" class="aicnpmTBHL">' + commentTitle + '</a><br />');
					}
				}
				else {
					referencedPostCount++;
				}
			}
			else {
				var collapsed = false;
				
				inUserTB = false;
				
				// First look for banned users.
				for (var j=0; j<bannedUsers.length; j++) {
					if (commentUser.search( bannedUsers[j] ) >= 0) {
						collapsePost( thisElement, "Click to show banned user: " + bannedUsers[j].source );
						collapsed = true;
						break;
					}
				}
				
				if (collapsed == false) {
					// Now look for hidden words.
					for (var j=0; j<hidePostsWithWords.length; j++) {
						if (commentTitle.search( hidePostsWithWords[j] ) >= 0) {
							foundWords.push( hidePostsWithWords[j].source );
						}
					}
				}
				
				if ((fullDisplay == false) && (foundWords.length > 0)) {
					var wordList = "";
					
					for (var j=0; j<foundWords.length; j++) {
						if (j > 0) {
							wordList += ", ";
						}
						
						wordList += foundWords[j];
					}
					
					collapsePost( thisElement, "Click to show post with words: " + wordList );
					
					collapsed = true;
				}
				
				if (collapsed == false) {
					for (var j=0; j<favoritePosters.length; j++) {
						if (commentUser.search( favoritePosters[j] ) >= 0) {
							setElementBackground( thisElement, favHilightBackground );
							thisElement.style.color = favHilightColor;
							
							anchorElements = thisElement.getElementsByTagName( 'a' );
							
							with (anchorElements[0].style) {
								color = favHilightColor;
							}
							
							break;
						}
					}
				}
			}
			
			headerIndex++;
		}
		else if ((thisElement.className == "talkbackcomment") || (thisElement.className == "talkbackcomment_aicn")) {
			var commentHeaderHTML = thisElement.innerHTML;

			// Comment body cell.
			if (commentHeaderHTML.search( userSearchRegEx ) >= 0) {
				setElementBackground( thisElement, userHilightBackground );
				thisElement.style.color = userHilightColor;
				
				if (inUserTB == false) {
					referencedPostCount++;
				}
			}
			else if (inUserTB == false) {
				// Check for more hidden words.
				for (var j=0; j<hidePostsWithWords.length; j++) {
					if (commentHeaderHTML.search( hidePostsWithWords[j] ) >= 0) {
						if (foundWords.indexOf( hidePostsWithWords[j].source ) == -1) {
							foundWords.push( hidePostsWithWords[j].source );
						}
					}
				}
				
				if (foundWords.length > 0) {
					var wordList = "";
					
					for (var j=0; j<foundWords.length; j++) {
						if (j > 0) {
							wordList += ", ";
						}
						
						wordList += foundWords[j];
					}
					
					var titleRow = thisElement;
					
					while (titleRow.tagName != "TR") {
						titleRow = titleRow.parentNode;
					}
					
					titleRow = titleRow.previousSibling;
					
					while (titleRow.tagName != "TR") {
						titleRow = titleRow.previousSibling;
					}
					
					
//					collapsePost( headerCell, "Click to show post with words: " + wordList );
					collapsePost( titleRow, "Click to show post with words: " + wordList );
				}
			}
		}
	}
}

filterComments();

function getTBTitle() {
	var title;
	
	if (fullDisplay == true) {
		
		allElements = document.evaluate(
			'//div',
			document,                                       
			null,              
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		for (var i = 0; i < allElements.snapshotLength; i++) {
			thisElement = allElements.snapshotItem( i );
			
			if (thisElement.className == "headline") {
				title = trim( thisElement.innerHTML.replace(/<(?:.|\s)*?>/g, "").replace(/\r\n/g," ").replace(/\n/g," ") );
				break;
			}
		}
	}
	
	return title;
}

var tbTitle = getTBTitle();

//alert( tbTitle );

function fixTBTitle() {
	if (tbTitle != undefined) {
		document.getElementsByTagName( 'title' )[0].innerHTML = (tbTitle + " -- Ain't It Cool News");
	}
}

fixTBTitle();

function getTopTenNewsDiv() {
//	if (fullDisplay == true) {
		allElements = document.evaluate(
			'//div',
			document,                                       
			null,              
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		for (var i = 0; i < allElements.snapshotLength; i++) {
			thisElement = allElements.snapshotItem( i );
			
			if (thisElement.id == 'Talkbacks') {
				return thisElement;
			}
		}
//	}
	
	return null;
}

function getLinkIDForHeading( heading ) {
	return 'aicnpmLink' + heading.replace(/ /g,'');
}

function getCPHeadingHTML( heading ) {
	return '<b>' + heading + '</b> <font size="-3">(<a href="#" id="' + getLinkIDForHeading( heading ) + '" onclick="return false;" style="color: blue">Hide</a>)</font>';
}

function createControlPanel() {
	var topTenNewsDiv = getTopTenNewsDiv();    
	
	if (topTenNewsDiv != null) {
		var cpDiv = document.createElement( 'div' );
		cpDiv.id = 'aicnpmCpDiv';
		topTenNewsDiv.parentNode.insertBefore( cpDiv, topTenNewsDiv.nextSibling );
//		cpDiv.className = 'content';
		
		with(cpDiv.style){
			padding = '10px';
			width = '280px';
			backgroundColor = '#FFFFFF';
			backgroundImage = 'url(http://www.aintitcool.com/secretimages/coolcon_background.jpg)';
			backgroundRepeat = 'repeat-x';
			backgroundAlign = 'bottom';
			backgroundPosition = 'bottom';
			borderWidth = '2px';
			borderStyle = 'solid';
			borderColor = 'black';
			textDecoration = 'none';
			letterSpacing = '.02em';
			fontFamily =  'Verdana, Arial';
			fontSize = '12px';
			fontWeight = 'normal';
			lineHeight = '18px';
		}

		cpDiv.innerHTML = '<b><font size="+1">AICN Power Mod</font></b> <font size="-3">' + version + '</font><br/><font size="-3">by _Maltheus_</font><br/><hr/>' +
							'<div style="text-align: center;">' + getCPHeadingHTML( 'Statistics' ) + '<br /><table id="aicnpmStatsTable" style="margin-left:auto; margin-right:auto;">' +
								'<tr><td style="text-align: right;">Post Count:</td><td style="text-align: right">' + headerIndex + '</td></tr>' +
								'<tr><td style="text-align: right;">My Post Count:</td><td style="text-align: right">' + myPostCount + '</td></tr>' +
								'<tr><td style="text-align: right;">Referenced Post Count:</td><td style="text-align: right">' + referencedPostCount + '</td></tr>' +
								'<tr><td style="text-align: right;">Collapsed Post Count:</td><td style="text-align: right">' + (collapseIndex - 1) + '</td></tr>' +
							'</table></div>' +
							'<hr/>' +
							'<div style="text-align: center;">' + getCPHeadingHTML( 'Talkback History' ) + '<br /><div id="aicnpmTalkbackHistory" style="text-align: left"><style>a.aicnpmTBHL:hover {color: blue}</style>' + postHistory +
							'</div></div>' +
							'<hr/>' +
							'<div style="text-align: center">' + getCPHeadingHTML( 'Settings' ) + '<br /><form id="aicnpmSettingsForm" onSubmit="return false;"><table style="width="100%" id="aicnpmSettingsTable">' +
									'<tr><td colspan="2" style="text-align: left; font-size: 75%; font-style: italic;">Hilights all cells where your user name is referenced.</td></tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">My User Name:</td>' +
										'<td id="aicnpmSettingsUserCell"><input name="user" type="text" value="' + userName + '" id="aicnpmSettingsUser" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">BG Color:</td>' +
										'<td><input name="userHilightBackground" type="text" value="' + userHilightBackground + '" id="aicnpmSettingsUserBackgroundColor" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">FG Color:</td>' +
										'<td><input name="userHilightColor" type="text" value="' + userHilightColor + '" id="aicnpmSettingsUserHilightColor" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr><td colspan="2"><hr style="width: 100px" / ></td></tr>' +

									'<tr><td colspan="2" style="text-align: left; font-size: 75%; font-style: italic;">Collapses posts with these search criteria. Separate multiple search terms with commas.</td></tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Hide by User:</td>' +
										'<td><input name="hideUsers" type="text" value="' + bannedUsersCSV + '" id="aicnpmSettingsHiddenUsers" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Hide with Words:</td>' +
										'<td><input name="hideWords" type="text" value="' + hiddenWordsCSV + '" id="aicnpmSettingsHiddenWords" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Hidden BG Color:</td>' +
										'<td><input name="hiddenBackground" type="text" value="' + hiddenBackground + '" id="aicnpmSettingsHiddenBackgroundColor" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Hidden FG Color:</td>' +
										'<td><input name="hiddenForeground" type="text" value="' + hiddenForeground + '" id="aicnpmSettingsHiddenForegroundColor" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr><td colspan="2"><hr style="width: 100px" / ></td></tr>' +

									
									'<tr><td colspan="2" style="text-align: left; font-size: 75%; font-style: italic;">Hilight posts by your favorite posters. Separate multiple posters with commas.</td></tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Highlight Users:</td>' +
										'<td><input name="highlightPosters" type="text" value="' + favoritePostersCSV + '" id="aicnpmSettingsFavoritePosters" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">BG Color:</td>' +
										'<td><input name="favHilightBackground" type="text" value="' + favHilightBackground + '" id="aicnpmSettingsFavBackgroundColor" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">FG Color:</td>' +
										'<td><input name="favHilightColor" type="text" value="' + favHilightColor + '" id="aicnpmSettingsFavHilightColor" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr><td colspan="2"><hr style="width: 100px" / ></td></tr>' +



//var favoritePostersCSV = GM_getValue( "favoritePosters" );
//var favHilightColor = GM_getValue( "favHilightColor" );
//var favHilightBackground = GM_getValue( "favHilightBackground" );
									
									'<tr><td colspan="2" style="text-align: left; font-size: 75%; font-style: italic;">Resize the comment area.</td></tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Visible Subject Width:</td>' +
										'<td><input name="subjectColumns" type="text" value="' + subjectColumns + '" id="aicnpmSettingsSubjectColumns" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Comment Width:</td>' +
										'<td><input name="commentAreaColumns" type="text" value="' + commentAreaColumns + '" id="aicnpmSettingsCommentAreaColumns" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Comment Height:</td>' +
										'<td><input name="commentAreaRows" type="text" value="' + commentAreaRows + '" id="aicnpmSettingsCommentAreaRows" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr><td colspan="2"><hr style="width: 100px" / ></td></tr>' +
									
									'<tr><td colspan="2" style="text-align: left; font-size: 75%; font-style: italic;">Number of comments to check for first, second or third in the title.</td></tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">Delete First-Tards:</td>' +
										'<td><input name="hideFirstPosters" type="text" value="' + hideFirstPosters + '" id="aicnpmSettingsHideFirstPosters" style="width: 100px" /></td>' +
									'</tr>' +
									
									'<tr><td colspan="2"><hr style="width: 100px" / ></td></tr>' +
									
									'<tr><td colspan="2" style="text-align: left; font-size: 75%; font-style: italic;">Keep a history of the talkbacks you post to.</td></tr>' +
									
									'<tr>' +
										'<td style="text-align: right; white-space: nowrap;">History Count:</td>' +
										'<td><input name="postHistoryCount" type="text" value="' + postHistoryCount + '" id="aicnpmSettingsTalkbackHistoryCount" style="width: 100px" /></td>' +
									'</tr>' +

									'<tr><td colspan="2"><hr style="width: 100px" / ></td></tr>' +

									'<tr>' +
										'<td></td>' +
										'<td><input type="submit" value="Save" style="width: 100%" /></td>' +
									'</tr>' +

									'<tr><td colspan="2" style="text-align: left; font-size: 75%; font-style: italic;">Note: Any search terms entered above are in fact <a href="http://en.wikipedia.org/wiki/Regular_expression" style="color: blue" target="_blank">regular expressions</a>. Colors may be <a href="http://www.w3schools.com/html/html_colornames.asp" style="color: blue" target="_blank">english names</a> or <a href="http://html-color-codes.info/" style="color: blue" target="_blank">HTML color codes</a>. A URL to an image may also be used as a background color. Greasemonkey does not always commit the settings if firefox crashes before a proper exit.</td></tr>' +
									
							'</table></form>' +
							'<hr/>' +
							'<div style="text-align: center;">' + getCPHeadingHTML( 'Post Summary' ) + '<br /><div id="aicnpmMyPostSummary" style="text-align: left">' + summaryHTML +
							'</div></div>' +
							'<hr/>' +
							'<a href="http://userscripts.org/scripts/show/72709" style="color: blue" target="_blank">AICN Power Mod Home Page</a>' +
							'</div>';
							
		var settingsForm = document.getElementById( "aicnpmSettingsForm" );
		settingsForm.addEventListener( "submit", saveSettings, false );
	}
}

createControlPanel();


function expandSettingsInputs() {
	var cpDiv = document.getElementById( "aicnpmCpDiv" );
	var userCellWidth = document.getElementById( "aicnpmSettingsUserCell" ).offsetWidth;
	
	var allElements = document.evaluate(
		'//input',
		cpDiv,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem( i );
		
		if (thisElement.id.substring( 0, 5 ) == 'aicnpm') {
			thisElement.style.width = userCellWidth + 'px';
		}
	}
}

expandSettingsInputs();



function toggleCpSection( heading, tableID, toggleKey ) {
	var linkElement = document.getElementById( getLinkIDForHeading( heading ) );
	var sectionTable = document.getElementById( tableID );
	
	if (linkElement.innerHTML == 'Hide') {
		linkElement.innerHTML = 'Show';
		sectionTable.style.display = 'none';
		GM_setValue( toggleKey, false );
	}
	else {
		linkElement.innerHTML = 'Hide';
		sectionTable.style.display = '';
		GM_setValue( toggleKey, true );
	}
}

function toggleCpStatistics() {
	toggleCpSection( 'Statistics', 'aicnpmStatsTable', 'showStatistics' );
}

function toggleCpTalkbackHistory() {
	toggleCpSection( 'Talkback History', 'aicnpmTalkbackHistory', 'showTalkbackHistory' );
}

function toggleCpSettings() {
	toggleCpSection( 'Settings', 'aicnpmSettingsTable', 'showSettings' );
}

function toggleCpMyPostSummary() {
	toggleCpSection( 'Post Summary', 'aicnpmMyPostSummary', 'showMyPostSummary' );
}



function addCpSectionShowHideHandlers() {
	var statisticsLink = document.getElementById( getLinkIDForHeading( 'Statistics' ) );
	var showHistoryLink = document.getElementById( getLinkIDForHeading( 'Talkback History' ) );
	var settingsLink = document.getElementById( getLinkIDForHeading( 'Settings' ) );
	var myPostSummaryLink = document.getElementById( getLinkIDForHeading( 'Post Summary' ) );
	
	statisticsLink.addEventListener( "click", toggleCpStatistics, false );
	showHistoryLink.addEventListener( "click", toggleCpTalkbackHistory, false );
	settingsLink.addEventListener( "click", toggleCpSettings, false );
	myPostSummaryLink.addEventListener( "click", toggleCpMyPostSummary, false );
	
	if (showStatistics == false) {
		toggleCpStatistics();
	}
	
	if (showTalkbackHistory == false) {
		toggleCpTalkbackHistory();
	}
	
	if (showSettings == false) {
		toggleCpSettings();
	}
	
	if (showMyPostSummary == false) {
		toggleCpMyPostSummary();
	}
}

addCpSectionShowHideHandlers();


//blafoo();

function commentSubmitHandler() {
	addNewLines();
	
	var thisNode;
	var thisTitle;
	var lastNode;
	var lastTitle;
	var insertIndex = 1;
	
	for (var i=0; i<postHistoryCount; i++) {
		lastNode = thisNode;
		lastTitle = thisTitle;
		
		thisNode = GM_getValue( 'histNode' + i );
		thisTitle = GM_getValue( 'histTitle' + i );
		
		if (i > 0) {
			if (lastNode != nodeID) {
				GM_setValue( ('histNode' + insertIndex), lastNode );
				GM_setValue( ('histTitle' + insertIndex), lastTitle );
				insertIndex++;
			}
		}
		
		if (thisNode == undefined) {
			break;
		}
	}
	
	GM_setValue( 'histNode0', nodeID );
	GM_setValue( 'histTitle0', tbTitle );
}

// Fix max subject error.
function fixSubjectLengthError() {
	allElements = document.evaluate(
		'//input',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem( i );
		
		if (thisElement.getAttribute( 'maxlength' ) == 1024) {
			thisElement.setAttribute( 'maxlength', 64 );
			thisElement.setAttribute( 'size', subjectColumns );
		}
	}
}

fixSubjectLengthError();

// Add comment submit handler.
function addCommentSubmitHandler() {
	allElements = document.evaluate(
		'//form',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem( i );
		
		if (thisElement.id == 'quicktalkback-form') {
			thisElement.addEventListener( "submit", commentSubmitHandler, true );
			break;
		}
	}
}

addCommentSubmitHandler();

// Expand comment text area.
function expandCommentTextArea() {
	allElements = document.evaluate(
		'//textarea',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem( i );
		
		if (thisElement.name == 'comment') {
			thisElement.rows = commentAreaRows;
			thisElement.cols = commentAreaColumns;
			break;
		}
	}
}

expandCommentTextArea();

