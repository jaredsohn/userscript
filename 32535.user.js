// ==UserScript==
// @name           dummy_free_fm4_notes
// @namespace      http://zero.greynine.at/greasemonkey
// @author         greasefury  --  http://my.orf.at/greasefury
// @description    hide posts by certain users at fm4.orf.at user-forums (like fm4.orf.at/notes)
// @version        0.7.5 (2009-07-23)
// @include        http://fm4.orf.at/*
// @include        http://fm4v2.orf.at/*
// @include        http://my.orf.at/*
// ==/UserScript==

var SUC_script_num = 32535; // for function updateCheck()

var scriptVersion = "0.7.5";
var dummies = new Array(); // always lowercase!
var zombies = new Array(); // always lowercase!
var modifiedPage = false;
var idCounter = 0;
var hiddenCounter = 0;
var killedCounter = 0;

// menu 
var posters = new Array(); // always lowercase!
var dummyFreeMenue;

var hiderTemplate;
var replacerTemplate;

function _dummy_free_fm4_notes() {
	if (!GM_xmlhttpRequest) {
		alert('Please upgrade to the latest version of Greasemonkey.');
		return;
	}
	loadDummiesAndZombies();
	walkThroughUserComments();
	injectPage();
}
window.addEventListener("load", function() { _dummy_free_fm4_notes(); }, false);
GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);});

function addCommentMenue( comment, options ) {

	if (isComment(comment)) {
		var vkLink = getCommentVkLinkElement(comment);
		if (vkLink) {

			var menueID = getNextID();
			var commentMenue =  document.createElement("span");
			commentMenue.className = "dummyFreeCommentMenu";
			commentMenue.id = "dfcm" + menueID;
			commentMenue.appendChild( document.createTextNode( "°" ) );

			var cmPopup =  document.createElement("div");
			cmPopup.id = "dfcmPopUp" + menueID;
			cmPopup.style.visibility = "hidden";
			cmPopup.className = "dummyFreeCommentMenuPopUp";
			cmPopup.style.width = "11em";
			cmPopup.style.height =  ( 14 + (options.length * 12 ) ) + "px";
			cmPopup.style.top = "0px"; //commentMenue.style.height.toString();
			cmPopup.style.left = "0px";

			cmPopup.appendChild( document.createTextNode( "dummy free FM4" ) );
			for (var i=0 ; i<options.length ; i++ ) {
				cmPopup.appendChild( document.createElement("br") );
				cmPopup.appendChild( document.createTextNode( "> " ) );
				cmPopup.appendChild( options[i] );
			}

			commentMenue.appendChild( cmPopup );

			commentMenue.setAttribute( "onmouseover", "document.getElementById('dfcmPopUp" + menueID +"').style.visibility='visible';" );
			commentMenue.setAttribute( "onmouseout", "document.getElementById('dfcmPopUp" + menueID +"').style.visibility='hidden';" );
		
			vkLink.parentNode.insertBefore(commentMenue,vkLink.nextSibling);
			vkLink.parentNode.insertBefore(document.createTextNode( " " ),commentMenue);
		}
	}
}

function addNicknameToList(nickName) {
	return addToList( nickName, posters );
}

function addToDummies(name) {
	removeFromZombies( name );
	return addToList( name, dummies );
}

function addToList( name, list ) {
  name = name.toLowerCase();
	for (var i=0 ; i<list.length ; i++) {
		if (name == list[i]) {
			return false;
		}
	}
	list.push(name);
	return true;
}

function addToZombies(name) {
	removeFromDummies( name );
	return addToList( name, zombies );
}

function changeDummyState( idKey ) {
	var nickName;
	var dummyState;
	if (idKey.indexOf('_')>0) {
		nickName = idKey.substr(0,idKey.indexOf('_'));
		idKey = idKey.substr(idKey.indexOf('_')+1,idKey.length);
	} else {
		return null;
	}
	if (idKey.indexOf('_')>0) {
		dummyState = idKey.substr(idKey.indexOf('_')+1,idKey.length);
	}
	if (dummyState == "zombie") {
		removeFromZombies(nickName);
	} else if (dummyState == "dummy") {
		removeFromDummies(nickName);
	} else {
		addToDummies(nickName);
	}
	saveDummies();
	location.reload();
}

function changeToZombie( idKey ) {
	var nickName;
	var dummyState;
	if (idKey.indexOf('_')>0) {
		nickName = idKey.substr(0,idKey.indexOf('_'));
		idKey = idKey.substr(idKey.indexOf('_')+1,idKey.length);

	} else {
		return null;
	}
	if (idKey.indexOf('_')>0) {
		dummyState = idKey.substr(idKey.indexOf('_')+1,idKey.length);
	}
	if (dummyState == "toZombie") {
		addToZombies(nickName);
	}
	saveDummies();
	location.reload();
}

function changeVisibleState( idKey, postDisplay, replacerDisplay ) {
	if (idKey.indexOf('_')>0) {
		idKey = idKey.substr(idKey.indexOf('_')+1,idKey.length);
	}
	var post = document.getElementById("post_" + idKey);
	if (post) {
		post.style.display = postDisplay;
		var replace = document.getElementById("replace_" + idKey);
		if (replace) {
			replace.style.display = replacerDisplay;
		}
	}
}

function createLink( href, title, tipText ) {
	var link = document.createElement("a");
	link.className = "dummyFree";
	if (href.length > 0) { 
		link.href = href; 
	}
	if (tipText.length > 0) { 
		link.title = tipText; 
	}
	if (title.length > 0) { 
		link.appendChild(document.createTextNode( title ));
	}
	return link;
}

function createDummyFreeMenue() {
	dummyFreeMenue = document.createElement('div');
	dummyFreeMenue.style.position = "absolute";
	dummyFreeMenue.style.width = "250px";
	dummyFreeMenue.style.padding = "3px";	
	dummyFreeMenue.style.border = "1px solid #ffcc33";
	dummyFreeMenue.style.backgroundColor = "#000000";
	dummyFreeMenue.style.color = "#ffffff";
	dummyFreeMenue.style.visibility = "hidden";
	dummyFreeMenue.style.fontSize = "11px";
	dummyFreeMenue.style.lineHeight = "13px";

	var title = document.createElement('b');
	title.appendChild(document.createTextNode("dummy free FM4"));
	dummyFreeMenue.appendChild(title);
	dummyFreeMenue.appendChild(document.createTextNode(" - list of posters"));

	var table = document.createElement('table');
	posters.sort();
	for (var i=0 ; i<posters.length ; i++) {
		var user = posters[i];
		var tableRow = document.createElement('tr');
		//tablerow.appendChild(document.createTextNode("dummy free fm4 notes"));
		var cell = document.createElement('td');
		cell.className="myMenu";
		cell.appendChild(document.createTextNode("- "+ user));
		tableRow.appendChild(cell);

		var killMenue = null;
		var menuLink = createLink( "", "", "?" );
		menuLink.id = user + "_state";
		if (isZombie(user)) {
			menuLink.id += "_zombie";
			menuLink.appendChild(document.createTextNode( "\n[ revoke ] " ));
			menuLink.title = "revoke this user from 'killed' state. show his posts again.";
			menuLink.addEventListener("click", function() { changeDummyState(this.id); return false; }, false);
		} else if (isDummy(user)) {
			menuLink.id += "_dummy";
			menuLink.appendChild(document.createTextNode( "\n[ release ] " ));
			menuLink.title = "release this user from 'dummy' state. show his posts.";
			menuLink.addEventListener("click", function() { changeDummyState(this.id); return false; }, false);
		} else {
			menuLink.id += "_smartie";
			menuLink.appendChild(document.createTextNode( "\n[ ban ] " ));
			menuLink.title = "declare this user 'dummy'. hide his posts.";
			menuLink.addEventListener("click", function() { changeDummyState(this.id); return false; }, false);
			{
				killMenue = createLink( "", "", "?" );
				killMenue.id = user + "_state" + "_toZombie";
				killMenue.appendChild(document.createTextNode( " [ kill ] " ));
				killMenue.title = "declare this user 'zombie'. remove his posts.";
				killMenue.addEventListener("click", function() { changeToZombie(this.id); return false; }, false);
			}
		}

		cell = document.createElement('td');
		cell.className="myMenu";
		cell.appendChild(menuLink);
		if (killMenue) {
			cell.appendChild(killMenue);
		}
		tableRow.appendChild(cell);
		table.appendChild(tableRow);
	}

	dummyFreeMenue.style.height = (25+ (14* posters.length )).toString() + "px";
	dummyFreeMenue.appendChild(table);

}

function getCommentVkLinkElement(comment) {
	if (comment) {
		var anchors = comment.getElementsByTagName("a");
		if (anchors) {
			if (anchors.length > 0) {
				// link to vk must be one of the first two anchor-elements within a comment
				for ( var i=0 ; i<=1 ; i++ ) {	
					var myAnchor = anchors[i];
					if (myAnchor) {
						var name = getUsernameFromHref(myAnchor);
						if (name) {
							if (name.toLowerCase() == myAnchor.text.toLowerCase() ) {
								return myAnchor;
							}
						}
					}
				}
			}
		}
	}
	return null;
}

function getFirstElementWithClass( listOfElems, className ) {
	var element;
	if ( listOfElems ) {
		for ( var i=0 ; i<listOfElems.length ; i++ ) {
			var test = listOfElems[i];
			if (test.className) {
				if (test.className == className) {
					element = test;
					break;
				}
			}
		}
	}
	return element;
}

function getMrHide( id ) {
	if (!hiderTemplate) {
		var hideLink = createLink("", " [ away! ]", "ah! my brains! take it away! take it away!");
		hiderTemplate = hideLink;
	}
	var newClone = hiderTemplate.cloneNode(true);
	//clone.href = "javascript:hideDummyPost('" + id +"')";
	return newClone;
}

function getNameOfFirstNamedElement( listOfElems ) {
	var elemName;
	if ( listOfElems ) {
		for ( var i=0 ; i<listOfElems.length ; i++ ) {
			var anchor = listOfElems[i];
			if (anchor.name) {
				if (anchor.name.length > 0) {
					elemName = anchor.name;
					break;
				}
			}
		}
	}
	return elemName;
}

function getNextElement( element ) {
	if (element) {
		var parent = element.parentNode;
		if (parent) {
			if (parent.childNodes) {
				for ( var i=0 ; i<parent.childNodes.length ; i++ ) {
					if (parent.childNodes[i] == element) {
						return parent.childNodes[i++];
					}
				}
			}
		}
	}
	return null;
}

function getNextID() {
	return ++idCounter;
}

function getNextUserComment( lastPost ) {
	// posts are organized in tables.
	var tables = document.getElementsByTagName("table");
	var i = 0;
	if (lastPost) {
		// find last post
		while (tables[i] != lastPost) {
			i++;
			if (i>tables.length) {
				return null;
			}
		}
	}
	for ( ++i ; i<tables.length ; i++ ) {
		if (isComment( tables[i] )) {
			return tables[i];
		}
	}
	return null;
}

function getNextVkUserComment( currentComment ) {
	// posts are organized in tables.
	var divs = document.getElementsByTagName("div");
	var i = 0;
	if (currentComment) {
		// find last post
		while (divs[i] != currentComment) {
			i++;
			if (i>divs.length) {
				return null;
			}
		}
	}
	for ( ++i; i<divs.length ; i++ ) {
		if (isComment( divs[i] )) {
			return divs[i];
		}
	}
	return null;
}

function getParentNodeByType(node,tagName) {
	node = node.parentNode;
	if (!node) return null;
	if (node.tagName.toLowerCase() == tagName.toLowerCase()) {
		return node;
	} else {
		return getParentNodeByType(node,tagName);
	}
}

function getReplacer( id, nickName ) {
	if (!replacerTemplate) {
		var replacer = document.createElement("p");
		replacer.className = "dummyFreeReplacer";
		var repText = document.createTextNode("<a post has been hidden for the sake of your sanity> ");
		replacer.appendChild(repText);
		var repLink = createLink("","[ show ]","show hidden post (at your own risk!)");;
		replacer.appendChild(repLink);
		replacerTemplate = replacer;
	}
	var clone = replacerTemplate.cloneNode(true);
	clone.id = "replace_" + id ;
	if (nickName) {
		clone.childNodes[0].nodeValue = "<a post by " + nickName + " has been hidden for the sake of your sanity> ";
	}
	//clone.getElementsByTagName('a')[0].href = "javascript:showDummyPost('" + id +"')";
	return clone;
}

function getUserCommentMenuOptions( nickName ) {

	if ( nickName.length > 0 ) {
		var options = new Array();
		var dummyState =  createLink("","","?");
		dummyState.id =  nickName + "_state" + getNextID();
		if (isDummy(nickName)) {
			dummyState.id += "_dummy";
			dummyState.appendChild(document.createTextNode( "\n release user " ));
			dummyState.title = "release this user from 'dummy' state. show his posts.";
			dummyState.addEventListener("click", function() { changeDummyState(this.id); return false; }, false);
			options.push(dummyState);
		} else {
			dummyState.id += "_smartie";
			dummyState.appendChild(document.createTextNode( "\n ban user posts " ));
			dummyState.title = "declare this user 'dummy'. hide his posts.";
			dummyState.addEventListener("click", function() { changeDummyState(this.id); return false; }, false);
			options.push(dummyState);
		}
		{	// KillMenue
			dummyState = createLink( "", "", "?" );
			dummyState.id = nickName + "_state" + getNextID() + "_toZombie";
			dummyState.appendChild(document.createTextNode( "\n kill user post " ));
			dummyState.title = "declare this user 'zombie'. remove his posts.";
			dummyState.addEventListener("click", function() { changeToZombie(this.id); return false; }, false);
			options.push(dummyState);
		}
		return options;
	} else {
		return null;
	}
}

function getUserNameFromComment( comment) {
	return getUsernameFromHref( getCommentVkLinkElement(comment) );
}

function getUsernameFromHref( element ) {
	if (element) {
		var href = element.href;
		if (href.indexOf("http://my.orf.at/") == 0) {
			var name = href.substr("http://my.orf.at/".length, href.length);
			if (name) {
				if (name.indexOf("users/") == 0) {
					name = name.substr("users/".length, name.length);
				}
				if (name.indexOf("/") > 0) {
					name = name.substr(0,name.indexOf("/"));
				}
				return decodeURIComponent(name);  //before: unescape()
			}
		}
	}
	return null;
}

function hideDummyPost(idKey) {
	changeVisibleState( idKey, "none", "");
}

function injectCSS() {
	if (!modifiedPage) { return false };

	if (!document.getElementsByTagName("head")[0]) {
		var head = document.createElement("head");
		document.insertBefore(head, document.body);
	}

	var screenCss = document.createElement('style');
	screenCss.type = "text/css";

	var printCss = document.createElement('style');
	printCss.type = "text/css";
	printCss.media = "print";
	
	screenCss.innerHTML += "a.dummyFree {\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-style: normal;\n" +
		"  font-weight: normal;\n" +
		"  cursor: pointer;\n" +
		"  white-space: nowrap;\n" +
		"}\n";
	screenCss.innerHTML += ".dummyFreeSignature {\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-style: normal;\n" +
		"  font-size: 0.6em;\n" +
		"  line-height: 0.8em;\n" +
		"  margin-top: 0px;\n" +
		"  margin-bottom: 2px;\n" +
		"  padding: 1px;\n" +
		"}\n";
	printCss.innerHTML += ".dummyFreeSignature {\n" +
		"  display: none;\n}\n";
	screenCss.innerHTML += "div.vkComment {\n" +
		"}\n";
	screenCss.innerHTML += ".dummyFreeReplacer {\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-size: 7pt;\n" +
		"  font-style: italic;\n" +
		"  margin: 0px 0px 0px 90px;\n" +  // top right bottom left
		"}\n";
	screenCss.innerHTML += ".dummyFreeSsReplacer {\n" +
		"  font-size: smaller;\n" +
		"  font-style: italic;\n" +
		"  margin: 10px 0px 0px 0px;\n" +  // top right bottom left
		"}\n";
	screenCss.innerHTML += ".dummyFreeCommentMenu {\n" +
		"  margin: 0px 0px 0px 0px;\n" +  // top right bottom left
		"  padding: 1px 3px 0px 2px;\n" +  // top right bottom left
		"  position: relative;\n" +
		"  z-index: 1;\n" +
		"  background-color: #404040;\n" +
		"  color: #FFCC33;\n" +
		"  border: solid;\n" +
		"  border-color: #707070 #303030 #303030 #707070;\n" +
		"  border-width: 1px 1px 0px 1px;\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-size: 0.8em;\n" +
		"  font-style: normal;\n" +
		"}\n";
	printCss.innerHTML += ".dummyFreeCommentMenu {\n" +
		"  display: none;\n}\n";
	screenCss.innerHTML += ".dummyFreeCommentMenuPopUp {\n" +
		"  padding: 2px 2px 2px 2px;\n" +  // top right bottom left
		"  position: absolute;\n" +
		"  z-index: 2;\n" +
		"  background-color: #505050;\n" +
		"  color: #A0A0A0;\n" +
		"  border: solid black;\n" +
		"  border-width: 1px 2px 2px 1px;\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-style: normal;\n" +
		"  font-size: 1em;\n" +
		"  line-height: 1.2em;\n" +
		"}\n";
	printCss.innerHTML += ".dummyFreeCommentMenuPopUp {\n" +
		"  display: none;\n}\n";
	screenCss.innerHTML += "td.myMenu {\n" +
		"  margin: 0px;\n" +
		"  padding: 0px 2px 0px 2px;\n" +  // top right bottom left
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-style: normal;\n" +
		"  font-size: 11px;\n" +
		"  line-height: 13px;\n" +
		"  color: #999999;\n" +
		"}\n";
	screenCss.innerHTML += ".myMenu a {\n" +
		"  color: #FFDD00;\n" +
		"}\n";
	printCss.innerHTML += ".myMenu {\n" +
		"  display: none;\n}\n";
	document.getElementsByTagName("head")[0].appendChild( screenCss );
	document.getElementsByTagName("head")[0].appendChild( printCss );
}

function injectPage() {
	//embedFunction(changeVisibleState);
	//embedFunction(showDummyPost);
	//embedFunction(hideDummyPost);
	injectCSS();
	injectSignature();
}

function injectSignature() {
	if (!modifiedPage) { return false };

	var signature = document.createElement('p');
	signature.style.position="relative";
	signature.className = "dummyFreeSignature";
	signature.appendChild(document.createTextNode(" |::: this page has been enhanced by "));
	signature.appendChild(createLink("http://zero.greynine.at/greasemonkey/#DummyFreeFM4notes","Dummy Free FM4", ""));
	signature.appendChild(document.createTextNode(" (v"+ scriptVersion +")"));
	signature.appendChild(document.createTextNode(". a greasemonkey userscript powered by "));
	var vcLink = createLink("http://my.orf.at/greasefury","greasefury","VauKah von greasefury");
	if (location.href.indexOf("http://fm4v2.orf.at") == 0) {
		vcLink.setAttribute("onclick", "openVC('greasefury');return false;");
	} else if(location.href.indexOf("http://my.orf.at") == 0) {
		// donothing.
	} else {
		vcLink.setAttribute("rel","visitingcard");
		vcLink.setAttribute("onclick", "var href=$(this).attr(\"href\");globalPopup(href,440,490);return false;");
	}
	signature.appendChild( vcLink );
	signature.appendChild(document.createTextNode("."));
	signature.title = hiddenCounter + " comment(s) hidden / " + killedCounter + " removed / " + 
					"banned users: " + dummies.join() + " / " +
					"killed users: " + zombies.join();

	// add menue to signature
	createDummyFreeMenue();
	signature.position="relative";
	signature.style.zIndex="1";
	dummyFreeMenue.id="myMenu";
	dummyFreeMenue.style.zIndex="2";
	dummyFreeMenue.style.top="-"+ dummyFreeMenue.style.height.toString();
	dummyFreeMenue.style.left="10px";
	signature.appendChild( dummyFreeMenue );

	signature.setAttribute( "onmouseover", "document.getElementById('myMenu').style.visibility='visible';" );
	signature.setAttribute( "onmouseout", "document.getElementById('myMenu').style.visibility='hidden';" );

	document.body.appendChild( signature );
	return true;
}

function isComment(comment) {
	if (comment) {
		var myAnchor = getCommentVkLinkElement(comment); 
		if (myAnchor) {
			return true; // getCommentVkLinkElement() validates already with link-text
		}
	}
	return false;
}

function isDummy(nickName) {
	return isInList( nickName, dummies );
}

function isInList( searched, list ) {
	if (!searched) {
		return false; 
	} else if (searched.length > 0 ) {
		searched = searched.toLowerCase();
		for ( var i=0 ; i<list.length ; ++i ) {
			if ( searched == list[i] ) {
				return true;
			}
		}
	}
	return false;
}

function isZombie(nickName) {
	return isInList( nickName, zombies );
}

function loadDummiesAndZombies() {
	var stored = GM_getValue("dummies", "");
	dummies = stored.split(',');
	stored = GM_getValue("zombies", "");
	zombies = stored.split(',');
}

function pimpUserComment( comment ) {
	var nickName = getUserNameFromComment( comment );
	if ( nickName.length == 0 ) { return null; }

	addNicknameToList( nickName );

	if (isZombie(nickName)) {
		comment.style.display="none";
		var next = getNextElement(comment);
		if (next) {
			next.style.display="none";
		}
		killedCounter++;
	} else {
		if (isDummy(nickName)) {
			replaceDummyPost(comment);
		}
		var tds = comment.getElementsByTagName("td");
		if (tds) {
			if (tds.length>1) {
				addCommentMenue( tds[1], getUserCommentMenuOptions( nickName ) );
			}
		}
	}
	modifiedPage = true;
}

function pimpVkUserComment( comment ) {
	var nickName = getUserNameFromComment( comment );
	if ( nickName.length == 0 ) { return null; }

	addNicknameToList( nickName );

	if (isZombie(nickName)) {
		comment.style.display="none";
		killedCounter++;
	} else {
		if (isDummy(nickName)) {
			replaceDummyVkComment(comment);
		}
		addCommentMenue( comment, getUserCommentMenuOptions( nickName ) );
	}
	modifiedPage = true;
}

function prepareVkUserComments( lastPost ) {
	// posts are NOT organized in tables -> pack in div-elements.
	var pageAnchors = document.getElementsByTagName("a");
	var parent; 
	var groupCollection = document.createElement('div');
	for ( var i=0 ; i<pageAnchors.length ; i++ ) {
		// each post starts with a hidden named anchor (fm4 internal postid)
		if ( !pageAnchors[i].href ) {
			if (pageAnchors[i].parentNode) {
				// use only anchors within a table cell. (prevent interference with fm4_enhancer toTop-anchor)
				if (pageAnchors[i].parentNode.nodeName.toLowerCase() == "td") {
					if (!parent) {
						parent = pageAnchors[i].parentNode;
					}
					var elem = pageAnchors[i];
					var group = document.createElement('div');
					group.className = "vkComment";
					groupCollection.appendChild(group);
					do {
						if (elem.nodeName=="A" && elem!=pageAnchors[i]) { 
							if (! elem.href) { break; }
						}
						group.appendChild(elem.cloneNode(true));
					} while ((elem=elem.nextSibling))
				}
			}
		}
	}
	parent.innerHTML = groupCollection.innerHTML;  // replace existing comments
	if (parent.nodeName.toLowerCase()=="td") {
		parent.removeAttributeNode(parent.getAttributeNode("height"));
		parent.removeAttributeNode(parent.getAttributeNode("width"));
	}
	modifiedPage = true;
	return null;
}

function removeElementFromList( item, list ) {
	var newList = new Array(); // always lowercase!
	//var removed = false;
	item = item.toLowerCase();
	for ( var i=0 ; i<list.length ; i++ ) {
		if (list[i] == item) {
			//removed = true;
		} else {
			newList.push(list[i])
		}
	}
	return newList;
}

function removeFromDummies(name) {
	var newDummies = removeElementFromList( name, dummies );
	var removed = dummies.length>newDummies.length;
	dummies = newDummies;
	return removed;
}

function removeFromZombies(name) {
	var newZombies = removeElementFromList( name, zombies );
	var removed = zombies.length>newZombies.length;
	zombies = newZombies;
	return removed;
}

function replaceDummyPost(postTable) {
	if (postTable) {
		var id = "dummyFree" + getNextID();
		var replacer = getReplacer( id, getUserNameFromComment(postTable) );
		replacer.addEventListener("click", function() { showDummyPost(this.id); return false; }, false);
		postTable.parentNode.insertBefore(replacer, postTable);

		postTable.id = "post_" + id ;
		var hideLink = getMrHide( id );
		hideLink.addEventListener("click", function() { hideDummyPost(this.parentNode.parentNode.parentNode.parentNode.id); return false; }, false);
		var td1 = postTable.getElementsByTagName('td').item(2);  // get 3rd column
		td1.appendChild(hideLink);
		hideDummyPost( id ); // hide it;
		hiddenCounter++;

		modifiedPage = true;
	}
}

function replaceDummyVkComment(comment) {
	if (comment) {
		var id = "dummyFree" + getNextID();
		var replacer = getReplacer( id, getUserNameFromComment(comment) );
		replacer.addEventListener("click", function() { showDummyPost(this.id); return false; }, false);
		replacer.style.marginLeft = "0px";
		replacer.appendChild( document.createElement("br") );
		replacer.appendChild( document.createElement("br") );
		comment.parentNode.insertBefore(replacer, comment);

		comment.id = "post_" + id ;
		var hideLink = getMrHide( id );
		hideLink.addEventListener("click", function() { hideDummyPost(this.parentNode.parentNode.id); return false; }, false);
		var content = comment.getElementsByTagName("small");
		content[1].appendChild(hideLink);
		hideDummyPost( id ); // hide it;
		hiddenCounter++;

		modifiedPage = true;
	}
}

function saveDummies() {
	removeElementFromList("",dummies);
	GM_setValue("dummies", dummies.join());
	removeElementFromList("",zombies);
	GM_setValue("zombies", zombies.join());
}

function showDummyPost(idKey) {
	changeVisibleState( idKey, "", "none");
}

/**
 * JavaScript-Object representing a pages StoryServer-Forum
 * @param  currentDoc The document of which the forum shall be retrieved.
 */
function SsForum( currentDoc ) {
	this.myDoc = null;
	this.htmlElement = null;
	this.postings = null;

	if ( currentDoc ) {
		this.myDoc = currentDoc;
	} else {
		this.myDoc = document;
	}

	// create array of postings
	this.postings = new Array();
	var forum = this.myDoc.getElementById("forum");
	if (forum) {
		if (forum.hasChildNodes) {
			var postingListElements = forum.getElementsByTagName("ul");
			this.htmlElement = getFirstElementWithClass( postingListElements, "posting" );
			var listItems = this.htmlElement.getElementsByTagName("li");
			for ( var i=0 ; i<listItems.length ; i++ ) {
				var post = new SsForumPost( listItems[i] );
				if ( post.isValidPost() ) {
					this.postings.push( post );
				}
			}
		}
	}

	/**
	 * pimps the postings within the forum.
	 */
	this.pimpPostings = function () {
		for ( var i=0 ; i<this.postings.length ; i++ ) {
			this.postings[i].pimp();
		}
	}

	//return;
}

/**
 * JavaScript-Object representing StoryServer-Forum-Postings
 * @param  postListItem HTML ListItem element (<li>) containing a StoryServer-Forum-Posting from the processed page. (may contain replies also.)
 */
function SsForumPost( postListItem ) {
	this.postingLI = postListItem;
	this.postID = null;
	this.userName = null;

	/**
	 * Get ID of the forum posting
	 * @return  the ID of the posting (as specified by the server;
	 */
	this.getPostID = function () {
		if (!this.postID) {
			var postID;
			if (this.postingLI) {
				var anchors = this.postingLI.getElementsByTagName("a");
				if (anchors) {
					var anchName = getNameOfFirstNamedElement(anchors);
					if ( anchName ) {
						if (anchName.indexOf('posting_') == 0 ) {
							postID = anchName.substr(anchName.indexOf('_')+1,anchName.length);
						}
					}
				}
			}
			this.postID = postID;
		}
		return this.postID;
	}

	/**
	 * Get name of user of the forum posting
	 * @return  the name of the posting user.
	 */
	this.getUserName = function () {
		if (!this.userName) {
			/*var uName;			if (this.postingLI) {				var paragraphs = this.postingLI.getElementsByTagName("p");				if (paragraphs) {					var author = getFirstElementWithClass(paragraphs,"author");					if (author) {						var anchors = author.getElementsByTagName("a");						if (anchors) {							if (anchors.length > 0) {								uName = anchors[0].text;							}						}					}				}			}			this.userName = uName;*/
			this.userName = getUserNameFromComment(this.postingLI);
		}
		return this.userName;
	}

	/**
	 * Validates if the given htmlElement forum posting
	 * @return  true if the element is a valid storyserver forum posting, otherwise false.
	 */
	this.isValidPost = function () {
		if (this.postingLI.nodeName.toLowerCase() == "li") {
			if (this.getPostID()) {
				return true;
			}
		}
		return false;
	}

	/**
	 * changes the document code of this posting.
	 */
	this.pimp = function () {
		var name = this.getUserName();
		addNicknameToList( name );

		if (isZombie(name)) {
			this.postingLI.style.display = "none";
			killedCounter++;
			modifiedPage = true;
		} else {
			if (isDummy(name)) {
				this.replaceDummyPost(this.postingLI);
			}
			addCommentMenue( this.postingLI, getUserCommentMenuOptions( name ) );
			modifiedPage = true;
		}
	}

	this.replaceDummyPost = function () {
		if (this.postingLI) {
			var id = "dummyFree" + this.getPostID();
			var replacer = this.getReplacer( id );
			this.postingLI.parentNode.insertBefore(replacer, this.postingLI);

			this.postingLI.id = "post_" + id ;
			var hideLink = getMrHide( id );
			hideLink.addEventListener("click", function() { 
																hideDummyPost(this.parentNode.id); return false; }, false);
			this.postingLI.appendChild(hideLink);
			hideDummyPost( id ); // hide it;
			hiddenCounter++;

			modifiedPage = true;
		}
	}

	this.getReplacer = function ( id ) {
		var replacer = document.createElement("li");
		var repText = document.createElement("p");
		repText.className = "dummyFreeSsReplacer";
		var disText = document.createTextNode("<hid a post by " + this.getUserName()
														+ " for the sake of your sanity> ");
		repText.appendChild(disText);
		replacer.appendChild(repText);
		var repLink = createLink("","[ show ]","show hidden post (at your own risk!)");
		repText.appendChild(repLink);
		repLink.addEventListener("click", function() { showDummyPost(this.parentNode.parentNode.id); return false; }, false);
		replacer.id = "replace_" + id ;
		return replacer;
	}
}

function walkThroughUserComments() {
	var post;
	if (location.href.indexOf("http://fm4.orf.at/notes") == 0 
	|| location.href.indexOf(".orf.at/stories/") > 0
	|| location.href.indexOf(".orf.at/radio/stories/") > 0) {
		var forum = new SsForum( document );
		forum.pimpPostings();
	} else if (location.href.indexOf("http://fm4v2.orf.at") == 0) {
		while ((post = getNextUserComment(post))) {
			pimpUserComment(post);
		}
	} else if (location.href.indexOf("http://my.orf.at") == 0) {
		if (location.href.indexOf("/postings?")>0) {
			prepareVkUserComments();
			while ((post = getNextVkUserComment(post))) {
				pimpVkUserComment(post);
			}
		}
	}
}

// ==== THIRD PARTY SOURCE CODE =====

/*
Script Update Checker [04/29/09], written by Jarett
Code to add to any Greasemonkey script to let it check for updates.
http://userscripts.org/scripts/show/20145
// NOTES:
// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to a permanent place, preferably userscripts.org. The update checks will -not- increase the install count for the script there.
// Remember to change the version_timestamp every time the script is updated. Really.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this; I update my scripts much too often.
*/
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}