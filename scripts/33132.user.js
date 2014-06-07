// ==UserScript==
// @name           fm4_enhancer
// @namespace      http://zero.greynine.at/greasemonkey
// @description    adds some user comfort to fm4 notes
// @version        0.6.2 (2010-03-11)
// @include        http://fm4.orf.at/*
// @include        http://fm4v2.orf.at/*
// @include        http://my.orf.at/*/postings*
// @exclude        http://fm4v2.orf.at/notes?action=newentry
// ==/UserScript==

var SUC_script_num = 33132; // for function updateCheck()

var scriptVersion = "0.6.2";
var modifiedPage = false;

var faves = new Array();

var faveMenueCaption = "favourites";
var pageMenueClass = "pageMenueByGreasefury";
var pageMenueCaption = "***";
var pagePopupMenueClass = "pagePopupMenueByGreasefury";
var pagePopupMenueId = "pagePopupMenueByGreasefury";
var storyMenueClass = "storyMenueByGreasefury";
var storyMenueCaption = "|:::Story";
var storyMenueId = "storyMenueByGreasefury";

function _fm4_enhancer() {
	enhancePage();
	injectPage();
}
window.addEventListener("load", function() { _fm4_enhancer(); }, false);
if (GM_xmlhttpRequest) {
	GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);});
}

function addLeadingZero( value ) {
	return ((value < 10) ? "0" : "") + value;
}

// add 'permalinks' to user postings
function addPermaLinks() {
	addPermaLinksToList( getForumPostingList(), "" );
	return;
}

function addPermaLinksToList(postingList,parentPostingID) {
	if (postingList) {
		var listItems = postingList.getElementsByTagName("li");
		if (listItems) {
			for ( var i=0 ; i<listItems.length ; i++ ) {
				var posting = listItems[i];
				if (posting.parentNode == postingList) {
					var postingID = addPermaLinkToPosting( posting, parentPostingID );
					if (postingID) {
						var replies = getFirstElementWithClass( posting.getElementsByTagName("ul"), "posting_reply");
						addPermaLinksToList( replies, postingID );
					}
				}
			}
		}
	}
	return;
}

function addPermaLinkToPosting(posting,parentPostID) {
	var postId;
	if (posting) {
		postId = getPostingID( posting );
		if (postId) {
			var paragraphs = posting.getElementsByTagName("div");
			for ( var i=0 ; i<paragraphs.length ; i++ ) {
				var myPara = paragraphs[i];
				if (myPara.className == "forumtext") {
					if (parentPostID) {
						if (parentPostID.length=0) {
							parentPostID = postId;
						}
					} else {
						parentPostID = postId;
					}
					var linkHref = getForumBaseLink() + parentPostID +"#posting_"+ postId;
					var permaLink = createLinkWithArrow( linkHref, 
										"permalink", 
										"direkter link auf diesen beitrag");
					permaLink.style.marginLeft = "5px";
					permaLink.style.fontSize = "smaller";
					myPara.appendChild( permaLink );
					modifiedPage = true;
					break;
				}
			}
		}
	}
	return postId;
}

// adds a preview-option to the posting form
function addPostingPreview() {
	var postForm = getPostingForm();
	if (postForm) {
		createPreviewSpace(postForm);

		// --- add preview button ---
		var inputs = postForm.getElementsByTagName("input");
		if (inputs) {
			var count = inputs.length;
			if ( count > 0) {
				var btnSpace = document.createElement("span");
				var pvButton = document.createElement("input");
				pvButton.className = "button";
				pvButton.type = "button";
				pvButton.value = "Voransicht";
				pvButton.name = "fm4EnhancerPreviewButton";
				pvButton.title = "posting preview (powered by fm4 enhancer)";
				//pvButton.style.marginLeft = "5.2em";
				pvButton.addEventListener("click", function() { updatePreview(); return false; }, false);
				//inputs[count-1].parentNode.appendChild( pvButton );
				//inputs[count-1].parentNode.insertBefore( pvButton, inputs[count-2] );
				btnSpace.appendChild( pvButton );
				btnSpace.appendChild( document.createTextNode(" ") );
				inputs[count-1].parentNode.insertBefore( btnSpace, inputs[count-2] );
			}
		}
	}
}

// adds posibility to "remember" stories and "quick jump"
function addStoryMenue(){
	loadFaves();
	if (location.href.indexOf("http://fm4.orf.at/stories/") == 0 ) {
		var menue = getStoryMenue();
		if (!menue) return;
		var faver = document.createElement("div");
		faver.id = "faverMenue";
		faver.style.borderTop = "1px solid #6B6B6C";
		faver.appendChild(getFaveToggleLink());
		menue.appendChild(faver);
		modifiedPage = true;
	}
	updateFavouritesMenue();
}

function addTimeAndDate(tagName) {
	var elems = document.getElementsByTagName(tagName);
	for ( var i=0 ; i<elems.length ; i++ ) {
		var elem = elems[i];
		var child = elem.childNodes[0];
		if (child) {
			if (child.nodeName == "#text") {
				if (child.nodeValue.indexOf("vor ") == 0) {
					var datumText;
					if (child.nodeValue.indexOf("vor < 1") == 0) {
						datumText = "jetzt";
					} else {
						var tage = getPart( child.nodeValue, "Tag" );
						if ( tage == 0 ) {
							tage = getPart( child.nodeValue, "Tagen" );
						}
						var stunden = getPart( child.nodeValue, "Stunde" );
						if ( stunden == 0 ) {
							stunden = getPart( child.nodeValue, "Stunden" );
						}
						var minuten = getPart( child.nodeValue, "Minute" );
						if ( minuten == 0 ) {
							minuten = getPart( child.nodeValue, "Minuten" );
						}
						var datum = new Date();
						datum.setMilliseconds( datum.getMilliseconds() - (minuten * 60 * 1000) );
						datum.setMilliseconds( datum.getMilliseconds() - (stunden * 60 * 60 * 1000) );
						datum.setMilliseconds( datum.getMilliseconds() - (tage * 24 * 60 * 60 * 1000) );
						elem.title = datum.toLocaleString();

						datumText = addLeadingZero(datum.getDate()) +"."+ addLeadingZero(datum.getMonth()+1) +"."; //+ datum.getFullYear() ;
						datumText += " " + addLeadingZero(datum.getHours()) +":" + addLeadingZero(datum.getMinutes());
					}
					elem.innerHTML += " <span class=\"dt\">(" + datumText +")</span>";
					
					modifiedPage = true;
				}
			}
		}
	}
	return null;
}

//add a "to top" link to stories
function addToTop() {
	if (location.href.indexOf("http://fm4.orf.at/notes") == 0
	|| location.href.indexOf("http://fm4.orf.at/stories/notes") == 0
	|| location.href.indexOf("/forum/") > 0) {
		return; // add link only to "real" stories and only on their main-pages
	} else {
		var body = document.getElementsByTagName("body");
		if (body) {
			if (body[0]) {
				body = body[0]; // make it simpler
				var topAnchor = document.createElement("a");
				topAnchor.id = "fm4EnhancerTopAnchor";
				topAnchor.name = "fm4EnhancerTop";
				var topDiv = document.createElement("div"); // needed for xhtml-strict
				topDiv.appendChild(topAnchor); 
				if (body.hasChildNodes() ) {
					body.insertBefore(topDiv,body.firstChild)

					// ADD link at the end of the story.
					var story = document.getElementById("storywrapper");
					if (story) {
						var linkHolder = document.createElement("p");
						linkHolder.id = "fm4EnhancerToTopHolder";
						linkHolder.style.textAlign = "right";
						linkHolder.style.fontSize = "0.6em";
						linkHolder.style.lineHeight = "1.5em";
						var toTop = createLinkWithArrow( "#fm4EnhancerTop", "top",  "zum Seitenanfang (powered by fm4 enhancer)"); 
						linkHolder.appendChild(toTop);
						story.appendChild(linkHolder);
						modifiedPage = true;
					}
				}
			}
		}
	}
}

// add links for login, logout and nickPage to page-forum
function addUseFullLinks() {
	// does not longer work on the "old pages" (fm4v2)
	var target = document.getElementById("forum");
	if (target) {
		if (target.hasChildNodes) {
			var paragrahps = target.getElementsByTagName("p");
			for ( var i=0 ; i<paragrahps.length ; i++ ) {
				if (paragrahps[i].className == "writecomment") {
					target = paragrahps[i];
					break;
				}
			}
		}
	}
	if (target) {
		target.appendChild( createLinkWithArrow("http://login.orf.at/fm4/login", "login", "In der Community anmelden.") );
		target.appendChild( createLinkWithArrow("http://login.orf.at/fm4/logout", "logout", "Von der Community abmelden.") );
		target.appendChild( createLinkWithArrow("http://my.orf.at/sites/fm4/main", "nickPage", "Zur Nickpage.") );
		modifiedPage = true;
	}
	return;
}

// cleares unwanted whitespces from the given text for the preview option
function clearWhitespacesForPreview(text) {
	while (text.indexOf(" \n",1) > 0) {
		text = text.replace(/ \n/g,"\n");
	}
	while (text.indexOf("\n\n\n",1) > 0) {
		text = text.replace(/\n\n\n/g,"\n\n");
	}
	return text;
}

function createLink( href, title, tipText ) {
	var link = document.createElement("a");
	link.className = "enhancer";
	if (href.length > 0) { 
		link.href = href; 
	}
	if (tipText.length > 0) { 
		link.title = tipText; 
	}
	if (title.length > 0) { 
		link.appendChild( document.createTextNode( title ) );
	}
	return link;
}

function createLinkWithArrow( href, title, tipText ) {
	var link = createLink( href, title, tipText );
	var img = document.createElement("img");
	img.src = "http://fm4.orf.at/v2static/images/arrow_right_yellow.png";
	img.alt = "&gt;&gt;";
	if (tipText.length > 0) { 
		link.title = tipText; 
		link.alt = tipText; 
	}
	img.style.marginRight = "5px";
	link.insertBefore( img, link.childNodes[0] );
	link.style.marginLeft = "15px";
	return link;
}

// adds a preview-option to the posting form
function createPreviewSpace(postingForm) {
	var forum = document.getElementById("forum");
	if (!forum) {
		forum = document.createElement("div");
		forum.id = "forum";
		postingForm.parentNode.insertBefore(forum,postingForm);
	}
	var ulList = forum.getElementsByTagName("ul");
	var comment = getFirstElementWithClass(ulList, "posting");
	if (!comment) {
		comment = document.createElement("ul");
		comment.className = "posting";
		forum.appendChild(comment);
	}
	if (comment.childNodes.length == 0) {
		createPreviewSpaceLI(comment,"h2");
		return;  // created preview space for a new comment
	}
	var replyList = getFirstElementWithClass(ulList, "posting_reply");
	if (!replyList) {
		replyList = document.createElement("ul");
		replyList.className = "posting_reply";
		var commentList = comment.getElementsByTagName("il");
		if (commentList && commentList.length>0) {
			commentList[commentList.length-1].appendChild(replyList);
		} else {
			comment.appendChild(document.createElement("li"));
			comment.lastChild.appendChild(replyList);
		}
	}
	createPreviewSpaceLI(replyList,"h3");
	return;  // created preview space for a reply
}

// adds a preview-option to the posting form
function createPreviewSpaceLI(ul,subjectType) {
	if (ul) {
		commentLI = document.createElement("li");
		commentLI.id = "fm4EnhancerPreview";
		commentLI.style.marginLeft = "-5px";
		commentLI.style.paddingLeft = "5px";
		commentLI.style.background = "#242424";
		commentLI.style.display = "none";
		// -- author area
		var previewAuthor = document.createElement("p");
		previewAuthor.className = "author";
		var previewTitle = document.createElement("a");
		previewTitle.id = "fm4EnhancerPreviewName";
		previewTitle.appendChild(document.createTextNode("preview"));
		previewAuthor.appendChild(previewTitle);
		var span = document.createElement("span");
		span.className = "spacer";
		span.appendChild(document.createTextNode(" | "));
		previewAuthor.appendChild(span);
		var span = document.createElement("span");
		span.className = "date";
		span.appendChild(document.createTextNode("now"));
		previewAuthor.appendChild(span);
		commentLI.appendChild(previewAuthor);
		// -- subject area
		var previewSubject = document.createElement(subjectType);
		previewSubject.id = "fm4EnhancerPreviewSubject";
		commentLI.appendChild(previewSubject);
		// -- text area
		var previewText = document.createElement("div");
		previewText.id = "fm4EnhancerPreviewText";
		previewText.className = "forumtext";
		commentLI.appendChild(previewText);
		ul.appendChild(commentLI);
	}
}

// walks through user postings and makes text-links clickable
function empowerLinks() {
	var forum = document.getElementById("forum");
	if (forum) {
		if (forum.hasChildNodes) {
			// empower posting-subject-line
			var subjects = forum.getElementsByTagName("h2");
			if (subjects) {
				for ( var i=0 ; i<subjects.length ; i++ ) {
					text2link( subjects[i] );
				}
			}
			// empower text of posting
			var divs = forum.getElementsByTagName("div");
			if (divs) {
				for ( var i=0 ; i<divs.length ; i++ ) {
					if ( divs[i].className == "forumtext" ) {
						var pargraphs = divs[i].getElementsByTagName("p");
						if (pargraphs) {
							for ( var pIdx=0 ; pIdx<pargraphs.length ; pIdx++) {
								text2link( pargraphs[pIdx] );
							}
						}
					}
				}
			}
		}
	}
}

function enhancePage() {
	addToTop();
	addUseFullLinks();
	addTimeAndDate("font");
	addTimeAndDate("small");
	addTimeAndDate("span");
	addPermaLinks();
	empowerLinks();
	addPostingPreview();
	addStoryMenue();
	return null;
}

// changes the favourite-state of the current page
function faveStory(fave,uri) {
	var href = uri;
	if (!href) {
		href = getCurrentPageHref();
	}
	if (fave) {
		if (!isFaved(href)) {
			var newFave = new Array(3);
			newFave[0] = document.title.replace(/- fm4.ORF.at/, " ");
			newFave[1] = new Date();
			newFave[2] = href;
			faves.push(newFave);
		}
	} else {
		faves = removeFave(href);
	}
	saveFaves();
	updateFaveToggleLink();
	updateFavouritesMenue();
}

function getCurrentPageHref() {
	var href=document.location.href;
	if (href.indexOf("?") >0) {
		href = href.substr(0,href.indexOf("?"));
	}
	return href;
}

// creates the favourizing link
function getFaveToggleLink(){
	var toggleFave = createLink( "", "", "?" );
	toggleFave.id = "toggleStoryFaveState";
	if (isFaved(location.href)) {
// http://s.ipernity.com/T/1/L/tool_menu/fave_on.png
		toggleFave.appendChild(document.createTextNode( "> release" ));
		toggleFave.title = "remove this story from favourites list";
		toggleFave.addEventListener("click", function() { faveStory(false); return false; }, false);
	} else {
// http://s.ipernity.com/T/1/L/tool_menu/fave.png
		toggleFave.appendChild(document.createTextNode( "> remember" ));
		toggleFave.title = "add this story to the favourites list";
		toggleFave.addEventListener("click", function() { faveStory(true); return false; }, false);
	}
	return toggleFave;
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

function getForumPostingList() {
	// does not longer work on the "old pages" (fm4v2)
	var postingList;
	var forum = document.getElementById("forum");
	if (forum) {
		if (forum.hasChildNodes) {
			var postingListElements = forum.getElementsByTagName("ul");
			postingList = getFirstElementWithClass( postingListElements, "posting" );
		}
	}
	return postingList;
}

function getForumBaseLink() {
	var href=document.location.href;
	// cut off parameters...
	var posParams = href.indexOf("?");
	if ( posParams > 0) {
		href = href.substr(0, posParams);
	}
	// add "/forum/" if missing
	var posForum = href.indexOf("/forum");
	if ( posForum > 0) {
		var posIdx = href.indexOf("/", posForum+2);
		if (posIdx > 0 ) {
			href = href.substr(0, posIdx+1);
		} else {
			href += "/";
		} 
	} else {
		if (href.lastIndexOf("/") < href.length) {
			href += "/";
		} 
		href += "forum/";
	}
	return href;
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

// finds or creates the enhancerMenue for a(ll) page(s)
function getPagePopupMenue() {
	var pageMenuePopup = document.getElementById(pagePopupMenueId);
	if (!pageMenuePopup) {
		var pageMenue =  document.createElement("span");
		pageMenue.className = pageMenueClass;
		pageMenue.id = "pageMenueByGreasefuryAnchor";
		pageMenue.appendChild( document.createTextNode(pageMenueCaption) );

		var pageMenuePopup =  document.createElement("div");
		pageMenuePopup.id = pagePopupMenueId;
		pageMenuePopup.style.visibility = "hidden";
		pageMenuePopup.className = pagePopupMenueClass;
		pageMenuePopup.style.top = "0px";
		pageMenuePopup.style.left = "0px";

		pageMenue.appendChild( pageMenuePopup );

		pageMenue.setAttribute( "onmouseover", "document.getElementById('"+ pagePopupMenueId +"').style.visibility='visible';" );
		pageMenue.setAttribute( "onmouseout", "document.getElementById('"+ pagePopupMenueId +"').style.visibility='hidden';" );

		var head = document.getElementById("headerWrapper");
		if (head) {
			head.insertBefore(pageMenue,head.firstChild);
			modifiedPage = true;
		}
	}
	return pageMenuePopup;
}

function getPart( content, part ) {
  var value = 0;
	var pos = content.indexOf( " " + part );
	if ( pos > 0 ) {
		content = content.substr( 0, pos );
		pos = content.lastIndexOf( " " );
		if ( pos > -1 ) {
			value = parseInt( content.substr( pos, content.length ) );
		}
	}
	return value;
}

// finds the posting form within a page
function getPostingForm() {
	if (location.href.indexOf("/forum/") > 0 /*&& location.href.indexOf("/reply") > 0*/) {
		var forms = document.getElementsByTagName("form");
		if (forms) {
			for ( var i=0 ; i<forms.length ; i++ ) {
				if (forms[i]) {
					if (forms[i].getAttribute("method") == "post") {
						if (forms[i].getAttribute("action")) {
							if (location.href.indexOf(forms[i].getAttribute("action")) == 0 ) {
								return forms[i];
							}
						}
					}
				}
			}
		}
	}
}

function getPostingID( postingListItem ) {
	var postID;
	if ( postingListItem ) {
		var anchors = postingListItem.getElementsByTagName("a");
		var anchName = getNameOfFirstNamedElement(anchors);
		if ( anchName ) {
			if (anchName.indexOf('posting_') == 0 ) {
				postID = anchName.substr(anchName.indexOf('_')+1,anchName.length);
			}
		}
	}
	return postID;
}

// finds or creates the enhancerMenue for a story
function getStoryMenue(){
	var storyMenue = document.getElementById(storyMenueId);
	if (!storyMenue) {
		var story = document.getElementById("story");
		if (story) {
			storyMenue = document.createElement("div");
			storyMenue.id = storyMenueId;
			storyMenue.className = storyMenueClass;

			var p = document.createElement("p");
			p.appendChild(document.createTextNode(storyMenueCaption));
			storyMenue.appendChild(p);

			story.parentNode.insertBefore(storyMenue,story);
			modifiedPage = true;
		}
	}
	return storyMenue;
}

function injectCSS() {
	if (!modifiedPage) { return false };

	if (!document.getElementsByTagName("head")[0]) {
		var head = document.createElement("head");
		document.insertBefore(head, document.body);
	}

	var style = document.createElement('style');
	style.type = "text/css";
	style.innerHTML += "a.enhancer {\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-style: normal;\n" +
		"  font-weight: normal;\n" +
		"  cursor: pointer;\n" +
		"  white-space: nowrap;\n" +
		"}\n";
	style.innerHTML += ".enhancerSignature {\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-style: normal;\n" +
		"  font-size: 0.6em;\n" +
		"  line-height: 0.8em;\n" +
		"  margin-top: 0px;\n" +
		"  margin-bottom: 2px;\n" +
		"  padding: 1px;\n" +
		"}\n";
	style.innerHTML += "span.dt {\n" +
		"  color: #868686;\n" +
		"  font-size: smaller;\n" +
		"  background-color: #363839;\n" +
		"}\n";
	style.innerHTML += "." + storyMenueClass +" {\n" +
		"  float: left;\n" +
		"  margin-top: 5px;\n" +
		"  padding: 2px;\n" +
		"  min-width: 70px;\n" +
		"  max-width: 80px;\n" +
		"  overflow: hidden;\n" +
		"  border: solid #dfac13;\n" +
		"  border-width: 1px 0px 0px 1px;\n" +
		"  color: #f0f0f0;\n" +
		"  font-size: 9px;\n" +
		"  line-height: 10px;\n" +
		"}\n";
	style.innerHTML += "."+ pageMenueClass +" {\n" +
		"  margin: 0px 0px 0px 0px;\n" +  // top right bottom left
		"  padding: 1px 1px 2px 2px;\n" +  // top right bottom left
		"  position: relative;\n" +
		"  z-index: 1;\n" +
		"  background-color: #404040;\n" +
		"  border: solid;\n" +
		"  border-color: #707070 #303030 #303030 #707070;\n" +
		"  border-width: 1px 1px 1px 1px;\n" +
		"  font-size: 10px;\n" +
		"  line-height: 11px;\n" +
		"}\n";
	style.innerHTML += "."+ pagePopupMenueClass +" {\n" +
		"  margin: 0px 0px 0px 0px;\n" +  // top right bottom left
		"  position: absolute;\n" +
		"  z-index: 2;\n" +
		"  padding: 2px 3px 2px 2px;\n" +  // top right bottom left
		"  color: #f0f0f0;\n" +
		"  background-color: #505050;\n" +
		"  border: solid;\n" +
		"  border-color: #ffcc33 #404040 #404040 #ffcc33;\n" +
		"  border-width: 1px 1px 1px 1px;\n" +
		"  font-size: 10px;\n" +
		"  line-height: 11px;\n" +
		"}\n";
	document.getElementsByTagName("head")[0].appendChild( style );
}

function injectPage() {
	injectSignature();
	injectCSS();
}

function injectSignature() {
	if (!modifiedPage) { return false };

	var signature = document.createElement('p');
	signature.className = "enhancerSignature";
	signature.appendChild(document.createTextNode(" |::: this page has been enhanced by "));
	signature.appendChild(createLink("http://zero.greynine.at/greasemonkey/#FM4enhancer","fm4 enhancer", ""));
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
	document.body.appendChild( signature );
	return true;
}

// checks if the given uri is favorized.
function isFaved(findUri) {
	for ( var i=0 ; i<faves.length ; i++ ) {
		var fave = faves[i];
		if ( findUri == fave[2] ) {
			return true;
		}
	}
	return false;
}

// loads saved favorites
function loadFaves() {
	if (faves.length > 0) return;

	var favesSave = GM_getValue("faves");
	if (favesSave) {
		var posEnd = 0;
		var posBegin = favesSave.indexOf("{");
		if ( posBegin >= 0 ) {
			while ((posEnd = favesSave.indexOf("};", posBegin)) > posBegin) {
				var savedItem = favesSave.substring(posBegin+1,posEnd);
				var newFave = splitSavedFaveItem(savedItem);
				faves.push(newFave);
				posBegin = favesSave.indexOf("{", posEnd);
				if ( posBegin < 0 ) {
					break;
				}
			}
		}
	}
}

// empties a node from all its childs.
function removeAllChildNodes(element) {
	if (element) {
		while (element.childNodes.length>0) {
			element.removeChild(element.childNodes[element.childNodes.length-1]);
		}
	}
}

// removes a uri from the list of saved faves
function removeFave(findUri) {
	var newList = new Array(); 
	if (!findUri) {
		findUri = getCurrentPageHref();
	}
	for ( var i=0 ; i<faves.length ; i++ ) {
		var fave = faves[i];
		if ( findUri == fave[2] ) {
			//remove
		} else {
			newList.push(fave);
		}
	}
	return newList;
}

// replaces named entities with their respective characters (for posting preview)
function replaceNamedEntities(text) {
	text = text.replace(/&amp;/g,"&");
	text = text.replace(/&quot;/g,"\"");
	text = text.replace(/&lt;/g,"<");
	text = text.replace(/&gt;/g,">");
	return text;
}

// searchs for "http://" within the text of a posting and changes the text up to the following space (" ") into a clickable link.
function text2link( element ) {
	if (element) {
		if (element.hasChildNodes) {
			for ( var i=0 ; i<element.childNodes.length ; i++ ) {
				var child = element.childNodes[i];
				if (child.nodeName == "#text") {
					var text = child.nodeValue +" ";
					var protocol = "";
					var lnkPos = text.indexOf("http://");
					if (lnkPos == -1) {
						lnkPos = text.indexOf("https://");
						if (lnkPos == -1) {
							lnkPos = text.indexOf("www.");
							protocol = "http://";
						}
					}
					if (lnkPos >= 0) {
						var spcPos = text.indexOf(" ",lnkPos);
						if (spcPos>lnkPos) {
							var link = text.substring(lnkPos,spcPos);
							element.insertBefore(document.createTextNode(text.substring(0,lnkPos)),child);
							var ank = document.createElement("a");
							ank.href = protocol + link; 
							ank.title = "this clickable link is brought to you by fm4 enhancer. USE WITH CAUTION!"; 
							var clickLink = document.createElement("span");				// use span to change color
							clickLink.appendChild(document.createTextNode(link));
							clickLink.style.color = "#E4E1E1";
							ank.appendChild(clickLink);
							element.insertBefore(ank,child);
							// create preview-link for tinyurl-links
							var tiny = "http://tinyurl.com";
							if (link.indexOf(tiny) == 0) {
								link = "http://preview.tinyurl.com" + link.substring(tiny.length,link.length);
								var preview = document.createElement("sup");
								preview.style.fontSize = "smaller";
								preview.appendChild(createLink(link,"[pre]","tinyurl-preview" ));
								element.insertBefore(preview,child);
							}
							element.insertBefore(document.createTextNode(text.substring(spcPos,text.length)),child);
							element.removeChild(child);
						}
					}
				}
			}
		}
	}
}

// saves favorites
function saveFaves() {
	var favesSave = "";
	for ( var i=0 ; i<faves.length ; i++ ) {
		var fave = faves[i];
		favesSave += "{";
		favesSave += fave[0].replace(/;/g,",") +";";
		favesSave += fave[1].toGMTString() +";";
		favesSave += fave[2];
		favesSave += "};";
	}
	GM_setValue("faves", favesSave);
}

// splits the string for a saved favourit item.
function splitSavedFaveItem(savedItem) {
	var newFave = new Array(3);
	newFave[0] = "";
	newFave[1] = "";
	newFave[2] = "";
	var posBegin = 0;
	for ( var i=0 ; i<3 ; i++ ) {
		var posEnd = savedItem.indexOf(";", posBegin);
		if ( posEnd < posBegin ) {
			posEnd = savedItem.length;
		}
		if ( posEnd > posBegin ) {
			newFave[i] = savedItem.substring(posBegin,posEnd);
			posBegin = posEnd + 1;
		}
	}
	if (newFave[1].length > 0) {
		newFave[1] = new Date(newFave[1]);
	}
	return newFave;
}

// removes potential (html) tags from the given text (for posting preview)  (works as fm4.orf.at as far as known)
function textTagRemover(text) {
	var openPos=0;
	var lastOpenPos=openPos;
	while (true) {
		openPos = text.indexOf('<',lastOpenPos);
		if (openPos >= lastOpenPos ) {
			var closePos = text.indexOf('>',openPos);
			if (closePos < 0) {
				closePos = text.length;
			}
			// cut away potential tag
			text = text.substring(0,openPos) + text.substring(closePos+1);
			lastOpenPos = openPos;
		} else {
			break;
		}
	}
	return text;
}

// update posting preview
function updatePreview() {
	var preview = document.getElementById("fm4EnhancerPreview");
	preview.style.display = "";

	var subject = document.getElementById("fm4EnhancerPreviewSubject");
	if (subject) {
		removeAllChildNodes(subject);
		var formTitleList = document.getElementsByName("content_title");
		if (formTitleList) {
			if (formTitleList.length>0) {
				var inputText = formTitleList[0].value;
				if (inputText) {
					inputText = textTagRemover(inputText);
					subject.appendChild(document.createTextNode(inputText));
				}
			}
		}
	}

	var text = document.getElementById("fm4EnhancerPreviewText");
	if (text) {
		removeAllChildNodes(text);
		var formTextList = document.getElementsByName("content_text");
		if (formTextList) {
			if (formTextList.length>0) {
				var inputText = formTextList[0].value;
				if (inputText) {
					inputText = textTagRemover(inputText);
					inputText = replaceNamedEntities(inputText);
					inputText = clearWhitespacesForPreview(inputText);
					var paragraphs = inputText.split("\n\n");
					for ( var i=0 ; i < paragraphs.length ; i++ ) {
						var p = document.createElement("p");
						var lines = paragraphs[i].split("\n");
						for ( var j=0 ; j < lines.length ; j++ ) {
							p.appendChild(document.createTextNode(lines[j]));
							if (j+1 < lines.length) {
								p.appendChild(document.createElement("br"));
							}
						}
						text.appendChild(p);
					}
				}
			}
		}
	}
}

// adds/updates the menue for the favorized menue to the page menue
function updateFavouritesMenue() {
	var pageMenue = getPagePopupMenue();
	if (pageMenue) {
		loadFaves();
		var existingMenue = document.getElementById("favePopupMenue");
		var faveMenue = document.createElement("div");
		faveMenue.id = "favePopupMenue";
		faveMenue.style.borderTop = "1px solid #6B6B6C";
		faveMenue.style.padding = "1px 0px 2px 0px";  // top right bottom left
		faveMenue.appendChild( document.createTextNode(faveMenueCaption) );
		faveMenue.title = "powered by fm4_enhancer";
		if ( faves.length > 0 ) {
			for (var i=0 ; i<faves.length ; i++ ) {
				var d = faves[i][1];
				var tipText = "remembered at " + addLeadingZero(d.getHours()) 
											+ ":" + addLeadingZero(d.getMinutes());
				tipText += " on " + d.getFullYear() + "-" + addLeadingZero(d.getMonth()) 
													+ "-" + addLeadingZero(d.getDate());
				var fave = createLink( faves[i][2], faves[i][0], tipText ); // href, title, tipText
				faveMenue.appendChild( document.createElement("br") );
				faveMenue.appendChild( document.createTextNode("-") );
				faveMenue.innerHTML += "&nbsp;";
				faveMenue.appendChild( fave );

				/*var span = document.createElement("span");
				span.style.fontSize = "0.8em";
				var unFave = createLink( "", "(-)", "remove this story from favourites list" );
				unFave.addEventListener("click", function() { faveStory(false,this.parentNode.previousSibling.href); return false; }, false);
				span.appendChild( unFave );
				faveMenue.appendChild( span );*/
			}
		} else {
			faveMenue.appendChild( document.createElement("br") );
			faveMenue.appendChild( document.createElement("i") );
			faveMenue.lastChild.innerHTML += "-&nbsp;none&nbsp;selected";
		}
		if (existingMenue) {
			existingMenue.parentNode.insertBefore(faveMenue,existingMenue);
			existingMenue.parentNode.removeChild(existingMenue);
		} else {
			pageMenue.appendChild(faveMenue);
		}
	}
}

// updates the favorite link after a state change
function updateFaveToggleLink(){
	var link = document.getElementById("toggleStoryFaveState");
	if (link) {
		var newLink = getFaveToggleLink();
		link.parentNode.insertBefore(newLink,link);
		link.parentNode.removeChild(link);
	}
}

// ==== THIRD PARTY SOURCE CODE =====

/*
Script Update Checker, written by Jarett [04/29/09]
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