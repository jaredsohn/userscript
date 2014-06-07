// ==UserScript==
// @name			Google Reader 'New Folder..' Option On Top
// @author			Erik Vergobbi Vold
// @namespace		greaderNewFolderOnTop
// @include			http*.google.com/reader/*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-10
// @lastupdated		2010-04-24
// @description		Adds the 'New Folder..' option to the top of the folder list.
// ==/UserScript==

var needsInserting = true;

var main = function(e) {
	var folderMenu = document.getElementById("stream-prefs-menu-menu");
	if( !folderMenu ) return;

	var changeFolder = document.evaluate(".//div[contains(@class,'goog-menuitem')]/div[contains(text(),'Change folders...')]",folderMenu,null,9,null).singleNodeValue;
	if(!changeFolder) return;
	changeFolder = changeFolder.parentNode;

	var newFolder = document.evaluate(".//div[contains(@class,'goog-menuitem')]/div[contains(text(),'New folder...')]",folderMenu,null,9,null).singleNodeValue;
	if(!newFolder) return ;
	newFolder = newFolder.parentNode;

	if (changeFolder.nextSibling == newFolder) {
		needsInserting = false;
		return;
	}
	else{
		needsInserting = true;
	}

	if( !needsInserting ) return;

	needsInserting = false;
	folderMenu.insertBefore( newFolder, changeFolder.nextSibling );
};

document.body.addEventListener("DOMNodeInserted", main, false);
