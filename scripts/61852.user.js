// ==UserScript==
// @name            FTLook for vBulletin
// @namespace       http://home.att.net/~k.brazier/programs/javascript/
// @description     Makes the Anandtech vBulletin board look almost like the FuseTalk version used to.
// @author          Ken Brazier
// @include         http://forums.anandtech.com/*
// ==/UserScript==
var colForumListBG = '#FEFEFE';
var colNewLink = '#588BBE';
var colBodyBorder = '#C1D1E2';
var colHeadText = '#000000';

// Colors in a post
var colPostHead = '#DDDDDD';
var colPostLines = '#CCCCCC';
var colPostUserBG = '#E1EDF8';
var colPostUserName = '#000000';
var colPostTextBG = '#FAFAFA';
var colPostFoot = '#DDDDDD';
var colPostSpacing = '#EEEEEE';

// Colors in a thread listing.
var colThreadBG = '#EEEEEE';
// Change this to alternate thread colors:
// (A change to the user style may also be necessary.)
var colThreadAltBG = '#EEEEEE';
var colThreadHeadBG = '#BCD6EF';
var colThreadLines = '#DDDDDD';

var headNode = document.getElementsByTagName('head')[0];
function addCss(cssString) {
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	headNode.appendChild(newCss);
}

function getOldIcon(thisUserCell) {
	var oldIcon = null;
	// Get the old icon's node.
	var objs = thisUserCell.getElementsByTagName('img');
	for(var i=0; i < objs.length; i++) {
		// Don't include AIM/ICQ/ETC. icons.
		if(objs[i].parentNode.nodeName == 'A' && objs[i].parentNode.href.indexOf('member.php?') > 0) {
			oldIcon = objs[i];
			break;
		}
	}
	return oldIcon;
}

// Fix the insides of a post, given its table.
function fixPostTable(tbl) {
	var td = tbl.rows[1].cells[0];
	if(td == undefined) return;
	// Rearrange image (if any) to be above user title.
	var avatar = getOldIcon(td);
	// Don't include AIM/ICQ/ETC. icons.
	if(avatar != null && avatar.src.indexOf('/images/misc') < 0) {
		// Find the icon's highest-level container.
		while(avatar.parentNode != td) avatar = avatar.parentNode;
		td.removeChild(avatar);
		td.insertBefore(avatar, td.childNodes[0]);
		while(avatar.childNodes[0].nodeName != 'A')
			avatar.removeChild(avatar.childNodes[0]);
	}
	// Center member info
	td.align = "center";
	//- Get rid of title section
	td = tbl.rows[1].cells[1];
	if(td == undefined) return;
	var hrPos = td.getElementsByTagName('hr');
	if(hrPos.length > 0) {
		td.removeChild(td.getElementsByTagName('div')[0]);
		td.removeChild(hrPos[0]);
	}
	// Fix the cell borders and fill.
	for(var y=0; y < 3; y++) {
		for(var x=0; x < 2; x++) {
			var cell = tbl.rows[y].cells[x];
			cell.style.borderColor = colPostLines;
			if(x == 0) cell.width = 140;
			if(y == 2) {
				cell.style.border= '1px solid '+colPostLines;
				cell.style.background = colPostFoot;
			}
			cell.style.borderLeftWidth = 0;
			cell.style.borderRightWidth = 0;
		}
	}
}
// First, fix the forums list.
var pageDiv = document.getElementById('collapseobj_leftsidebar_1');

if(pageDiv != null) {
	// Make padding smaller on the outside of the page if forums list shown.
	while(pageDiv.nodeName != "DIV") pageDiv = pageDiv.parentNode;
	pageDiv.style.padding = '0px 5px';
}

// Shrink body text (11px)
addCss ( "td, li { font: 11px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif ! important; } \
/* Change colors: link, border C1D1E2 */ \
a:link{color:"+colNewLink+";} \
.tborder { background: "+colBodyBorder+" ! important; border-width: 0px; } \
.alt1, .alt1Active { background: "+colPostTextBG+"; } \
.alt2, .alt2Active { background: "+colPostUserBG+"; } \
#collapseobj_leftsidebar_1 td { background: "+colForumListBG+"; } \
");

if(document.URL.substr(28,15) == "showthread.php?" ||
		document.URL.substr(28,13) == "showpost.php?" ||
		document.URL.substr(28,21) == "private.php?do=showpm") {
	var postType = "";
	if(document.URL.substr(28,15) == "showthread.php?") postType = "#posts";
	else if(document.URL.substr(28,21) == "private.php?do=showpm") postType = "#post";
	// Thread fixing.
	// *** Begin CSS-only work ***

	// Change colors: left side light blue (#E1EDF8)
	addCss ( " /* Change colors: thread header gray */ \
"+postType+" .thead { background: "+colPostHead+" ! important; color: "+colHeadText+" ! important; }\
"+postType+" .thead a:link, "+postType+" .thead_alink { color: "+colHeadText+"; } \
"+postType+" .thead a:visited, "+postType+" .thead_avisited { color: "+colHeadText+"; } \
/* Make user names smaller, but bold. */ \
.bigusername { font: 11px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif ! important; font-weight: bold ! important; text-decoration: none; color:"+colPostUserName+" ! important; } \
.bigusername a:hover, .bigusername a:active, .bigusername_ahover { text-decoration:underline ! important; } \
#post { border: 2px solid "+colBodyBorder+"; border-top-width: 0px; } \
");

	// *** End CSS-only work ***
	// Anything below here is more likely to break.

	var postsTable = document.getElementById('posts');
	if(postsTable != null) {
		// Get rid of the (gray) "whitespace"
		var allDivs = postsTable.parentNode.getElementsByTagName('div');
		for (var i=0;i<allDivs.length;i++) {
			var thisDiv = allDivs[i];
			if(thisDiv.style.paddingLeft == '25px') {
				thisDiv.style.paddingLeft = '0px';
				thisDiv.style.paddingRight = '0px';
			}
		}

		// This loop works with all posts.
		var allPosts = document.evaluate('.//div[starts-with(@id,"edit")]',
				postsTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0;i<allPosts.snapshotLength;i++) {
			var thisPost = allPosts.snapshotItem(i);
			var tbl = thisPost.getElementsByTagName('table')[0];

			// Change colors between posts, and add the proper borders.
			if(i < allPosts.snapshotLength-1) {
				thisPost.style.background = colPostSpacing;
				thisPost.style.border = '2px solid '+colBodyBorder;
				thisPost.style.borderTopWidth = "0px";
				thisPost.style.borderBottomWidth = "0px";
				thisPost.style.padding = '0px 0px 9px 0px';
			} else {
				// Substitute for the last post's lack of a good edit div.
				thisPost.style.border = '2px solid '+colBodyBorder;
				thisPost.style.borderTopWidth = 0;
				thisPost.style.padding = '0px';
				thisPost.style.margin = '0px 0px 9px 0px';
			}

			fixPostTable(tbl);
		}
	} else {
		allPosts = document.evaluate('//table[starts-with(@id,"post")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0;i<allPosts.snapshotLength;i++) {
			fixPostTable(allPosts.snapshotItem(i));
		}
	}
} else
if(document.URL.substr(28,17) == "forumdisplay.php?" || 
		document.URL.substr(28,11) == "search.php?") {
	addCss ( "#threadslist .thead { color: "+colHeadText+"; background: "+colThreadHeadBG+"; } \
#threadslist .thead a:link, #threadslist .thead_alink, #threadslist .thead a:visited, #threadslist .thead_avisited, #threadslist .thead a:hover, #threadslist .thead a:active, #threadslist .thead_ahover { color: "+colHeadText+"; } \
#threadslist { border: 2px solid "+colBodyBorder+"; border-collapse: collapse; } \
#threadslist td { border-bottom: 1px solid "+colThreadLines+"; } \
#threadslist a:link, #threadslist_alink, #threadslist a:visited, #threadslist_avisited, #threadslist a:hover, #threadslist a:active, #threadslist_ahover { font-weight: bold; } \
#threadslist .alt1, #threadslist .alt1Active, #threadslist .alt2, #threadslist .alt2Active { background: "+colThreadBG+"; } \
span.smallfont a:link, span.smallfont_alink, span.smallfont a:visited, span.smallfont_avisited, span.smallfont a:hover, span.smallfont a:active, span.smallfont_ahover { font-weight: normal ! important; } \
" );

	if(document.URL.substr(28,17) == "forumdisplay.php?") {
		var threadslist = document.getElementById('threadslist').getElementsByTagName('tbody');
		// First, the top rows.
		var allRows = threadslist[0].rows;
		for (var i=0; i<allRows.length; i++) {
			if(allRows[i].cells[0].colSpan > 1) {
				allRows[i].cells[0].colSpan--;
				if(allRows[i].cells.length > 1) {
					// Find Thread Starter.
					var cellone = allRows[i].cells[1];
					var j=0;
					while(cellone.childNodes[j].nodeType != 1 || cellone.childNodes[j].nodeName != "A") j++;
					var topicLink = cellone.childNodes[j];
					j++;
					while(cellone.childNodes[j].nodeType != 1 || cellone.childNodes[j].nodeName != "A") j++;
					var origLink = cellone.childNodes[j];
					// Insert Originator
					var newcell = allRows[i].insertCell(-1);
					newcell.className = "thead";
					// Insert <a>Originator</a>.
					origLink.textContent = "Originator";
					newcell.insertBefore(origLink,null);
					// Fix cellone to include only the Topic.
					for(j=cellone.childNodes.length-1; ; j--) {
						if(cellone.childNodes[j] == topicLink) break;
						cellone.removeChild(cellone.childNodes[j]);
					}
					topicLink.textContent = "Topic";
					// Re-insert last posted.
					newcell = allRows[i].insertCell(-1);
					newcell.innerHTML = allRows[i].cells[2].innerHTML;
					newcell.className = "thead";
					allRows[i].deleteCell(2);
				}
			}
		}
		// Then the thread rows.
		allRows = threadslist[1].rows;
		for (var i=0; i<allRows.length; i++) {
			allRows[i].deleteCell(1);
			var cellDivs = allRows[i].cells[1].getElementsByTagName('div');
			var poster = null;
			for(var j=0; j < cellDivs.length; j++) {
				if(cellDivs[j].className == 'smallfont') {
					poster = cellDivs[j];
					// If there are any floating elements, move them right of the title.
					var posterSpans = poster.getElementsByTagName('span');
					for(var k=0; k < posterSpans.length-1; k++) {
						cellDivs[0].insertBefore(posterSpans[k],cellDivs[0].childNodes[0]);
					}
					break;
				}
			}

			// Insert Originator
			var newcell = allRows[i].insertCell(-1);
			newcell.insertBefore(poster,null);
			newcell.className = 'alt1';
			newcell.align='center';
			newcell.style.whiteSpace = 'nowrap';
			// Re-insert last posted.
			newcell = allRows[i].insertCell(-1);
			newcell.innerHTML = allRows[i].cells[2].innerHTML;
			newcell.className = 'alt1';
			allRows[i].deleteCell(2);
			// Alternating colors.
			if(i&1 == 1 && colThreadAltBG != colThreadBG) {
				for(j=0; j < allRows[i].cells.length; j++) {
					allRows[i].cells[j].style.background = colThreadAltBG;
				}
			}
		}
	}
}

