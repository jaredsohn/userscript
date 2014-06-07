// ==UserScript==
// @name TagRenameDelete
// @description Allows you to rename or delete the del.icio.us tags on front page.
// @include http://del.icio.us/*
// @exclude
// ==/UserScript==

// Version: 1.1

// TODO: 
// 1. After renaming the tag, the window location gets changed to users setting page
//    in order to bring back the old page time out is set after which the window location
//    is changed to orginal url. The time out value should be changed if orginal page is not
//    loaded in time.
// 2. Java Script Prompt is displayed to take the input, taking the input
//    via a css dialog box would be good

(function () {
	window.addEventListener("load",addLinks,false);

	/* HELPERS */
	function getElementsByName(parent,name) {		
		return parent.getElementsByTagName(name);
	}
	function createElement(tag) {
		return document.createElement(tag);
	}
	function getElementByClass(list,cname) {
		for(var index=0; index < list.length; ++index) {
			var listelem = list[index];		
			if(listelem.className == cname) return listelem;
		}		
		return null;
	}

	/* Style rules defined for the links */
	var renameStyleRule = 
			"color:#0000AA;text-decoration:underline;cursor:pointer;font-size:95%;";
	var deleteStyleRule = 
			"color:#0000AA;text-decoration:underline;cursor:pointer;font-size:90%;";

	/* Current user who has logged in */
	var loggedUserName = null;
	
	// Set the logged user name
	function setLoggedUserName() {
		// Get hold of link of inbox
		var bannerDiv = getElementByClass(getElementsByName(document,'div'),'banner');
		var navGroup  = getElementByClass(getElementsByName(bannerDiv,'ul'),'nav');
		var navList   = getElementsByName(navGroup,'li');
		for(var linkIndx=0; linkIndx < navList.length; ++linkIndx) {
			var anchor = getElementsByName(navList[linkIndx],'a')[0];
			if(anchor.href.indexOf("/inbox") != -1) {
				var anchorHrefSplit = anchor.href.split('/');
				loggedUserName = anchorHrefSplit[anchorHrefSplit.length-1];
				return;
			}
		} 		
	}

	/* Create rename link element to append  */	
	function createRenameLinkElement(itemDiv) {
		var element = createElement("span");
		element.innerHTML = "<b><i>&#171;</i></b>";

		var curtagurl = getElementsByName(itemDiv,'a')[0].href;	
		
		// Check if url is ending with escape("system:unfiled) == system%3Aunfiled 
		if(curtagurl.indexOf(escape("system:unfiled")) != -1) return null;

		var tagUserName = curtagurl.split("http://del.icio.us/")[1];
		tagUserName = tagUserName.split('/')[0];
		if(tagUserName != loggedUserName) return null;

		element.setAttribute("title","rename tag");
		element.onclick = function (event) {
			var tagurl = getElementsByName(itemDiv,'a')[0].href;
			var oldtag = getElementsByName(itemDiv,'a')[0].innerHTML;
			var newtag = prompt("Enter the new tag: ");
			if(newtag == null) return;
			currentURL = window.location.href;
			
			// tagurl is of the form: http://del.icio.us/username/tagname
			var username = tagurl.split("http://del.icio.us/")[1];
			username = username.split('/')[0];

			// If the you are in some other page then do not add link.

			// Change the tagname
			changeTag(username,oldtag,newtag);
		}	
		// Define CSS rules for rename link element.
		element.setAttribute("style",renameStyleRule);
		return element;
	}

	/* Create delete link element to append */
	function createDeleteLinkElement(itemDiv) {
		var element = createElement("span");
		element.setAttribute("title","delete tag");
		element.innerHTML = "<b><i>x</i></b>";

		var curtagurl = getElementsByName(itemDiv,'a')[0].href;		

		// Check if url is ending with escape("system:unfiled) == system%3Aunfiled 
		if(curtagurl.indexOf(escape("system:unfiled")) != -1) return null;
		
		var tagUserName = curtagurl.split("http://del.icio.us/")[1];
		tagUserName = tagUserName.split('/')[0];
		if(tagUserName != loggedUserName) return null;

		element.onclick = function (event) {
			var tagurl = getElementsByName(itemDiv,'a')[0].href;
			var oldtag = getElementsByName(itemDiv,'a')[0].innerHTML;		
			var confirmstr = "All instances will be deleted under: "+oldtag.substr(1);
			var confirmation = confirm(confirmstr);
			if(confirmation == false) return;
	
			currentURL = window.location.href;
			// tagurl is of the form: http://del.icio.us/username/tagname
			var username = tagurl.split("http://del.icio.us/")[1];
			username = username.split('/')[0];

			// Remove the tag
			removeTag(username,oldtag);
		}	
		// Define CSS rules for delete link element.
		element.setAttribute("style",deleteStyleRule);
		return element;
	}

	// Current window URL
	var currentURL = null;

	// CORE FUNCTION
	// Add edit and remove link element to each of the tag.
	function addLinks() {
		setLoggedUserName();

		if(loggedUserName == null) return;

		// Search for the div element in which tag are listed
		var rightDiv = 
				getElementByClass(getElementsByName(document,'div'),'right list');
		
		// For each tag item in the div add the edit link and delete link
		var itemBundles = getElementByClass(getElementsByName(rightDiv,'ul'),'bundles');
		var bundleFold  = getElementByClass(getElementsByName(itemBundles,'li'),'bundle fold');
		var itemsGroupUL= getElementsByName(bundleFold,'ul')[0];
		var itemsGroup  = getElementsByName(itemsGroupUL,'li');
		
		for(var index=0; index < itemsGroup.length; ++index) {
			var item = itemsGroup[index];
			var itemAnchor = getElementsByName(item,'a')[0];
			var editLinkElem = createRenameLinkElement(item);
			var delLinkElem = createDeleteLinkElement(item);
			if(editLinkElem != null) item.insertBefore(editLinkElem,itemAnchor);
			if(delLinkElem != null) item.insertBefore(delLinkElem,itemAnchor);			
		}
	}

	function changeTag(username,oldtag,newtag) { 
		window.location.href=
			"http://del.icio.us/settings/"+username+"/tags?oldtag="+oldtag+"&newtag="+newtag+"&submit=replace+tags";
		window.setTimeout(restorePage,500);
	}
	
	function removeTag(username,tagname) {
		window.location.href="http://del.icio.us/settings/"+username+"/tags?deltag="+tagname+"&submit=delete+tag";
		window.setTimeout(restorePage,500);
	}
	function restorePage() {	
		window.location.href=currentURL;
		window.clearTimeout();
		return;
	}
})();	

