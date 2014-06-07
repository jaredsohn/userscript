// ==UserScript==
// @name           Maxconsole Forum Troll Remover
// @namespace      Maxconsole
// @include        http://forums.maxconsole.net/showthread.php?t=*
// ==/UserScript==

var blockedUsers = new Array("majin","jerzmob");

var forumPosts = document.getElementById('posts');

if (forumPosts) {

	// Get the posts
	var posts = getDivs( forumPosts );

	GM_log( "Number of posts: " + posts.length );
	for (var i = 0; i < posts.length; i++) {
		
    		var post = posts[i];
		
		var posterName = getPosterName( post );

		if( userBlocked( posterName ) ) {
			GM_log( "Removing Poster: " + posterName );
			forumPosts.removeChild( post );
		}
	}

} else {
	GM_log("no posts found");
}

function userBlocked( userName ) {
	for( var j = 0; j < blockedUsers.length; j++ ) {
		var blockedUser = blockedUsers[j];
		if( blockedUser == userName ) {
			return true;		
		}
	}
	
	return false;
}
	

function getPosterName(postDiv) {

	var thisElementChild = getDiv(getDiv(getDiv(getDiv(getDiv(getDiv(getDiv(postDiv)))))));

	var tableElement = getTable( thisElementChild );

	var tableSection = getTableSection( tableElement );

	var tableRows = tableSection.childNodes;

	var tableCell = getTableCell(tableRows[2]);

	var innerTable = getTable( tableCell );

	var innerTableSelection = getTableSection( innerTable );

	var innerTableRows = innerTableSelection.childNodes;

	var innerTableCell = getTableCell(innerTableRows[0]);

	var innerDiv = getDiv(innerTableCell);

	// If they have an icon

	if( !innerDiv ) {

		var innerTableCells = innerTableRows[0].childNodes;

		innerTableCell = innerTableCells[3];

		innerDiv = getDiv(innerTableCell);

	}

	var spanElement = getSpanElement(innerDiv);

	var spanChild = spanElement.firstChild;

	var nameElement = spanChild.firstChild;

	return nameElement.data;
}

function getDivs(parent) {
	var list = new Array();
	
	var children = parent.childNodes;

	for (var i = 0; i < children.length; i++) {
    		var thisElement = children[i];
		var alignType = thisElement.align;
		if( alignType == 'center' ) {
			list.push( thisElement );
		}
	}

	return list;
}

function getDiv(parent) {
	var children = parent.childNodes;

	for (var i = 0; i < children.length; i++) {
    		var thisElement = children[i];
		var alignType = thisElement.align;
		if( alignType == 'center' || alignType == '' ) {
			return thisElement;
		}
	}

	return null;
}

function getTable(parent) {
	var children = parent.childNodes;

	for (var i = 0; i < children.length; i++) {
    		var thisElement = children[i];
		var padding = thisElement.cellPadding;
		if( padding == '5' || padding == '1' ) {
			return thisElement;
		}
	}

	return null;
}

function getTableSection(table) {
	var children = table.childNodes;

	return children[1];
}

function getTableCell(tableRow) {
	var children = tableRow.childNodes;

	return children[1];
}

function getSpanElement(parent) {
	var children = parent.childNodes;

	return children[1];
}

function inspectChildren(parent) {
	var children = parent.childNodes;

	for (var i = 0; i < children.length; i++) {
    		var thisElement = children[i];
		GM_log( "Child " + i + ": " + thisElement );
	}

	return;
}
