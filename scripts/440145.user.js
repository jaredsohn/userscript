// ==UserScript==
// @name        Facebook Side Column Removal
// @namespace   http://userscripts.org/users/61228
// @description Remove the groups, trending, ads and all that crap.
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @version     5.2
// @require     https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// ==/UserScript==

	/* These are just global variables, don't bother with them. */
var imageIndex = 0; var setPage;
	/* End of global variables. */
//	Add the options menu to greasemonkey.
GM_registerMenuCommand("Facebook Layout Options", function(){GM_config.open();}, "O");
GM_registerMenuCommand("Facebook Layout Reset", function(){configReset();}, "r");

	/* Setting variables. Change these to your liking. */
var centerUserImages =	true;
//	You may set this to false if you would rather keep the images left aligned.
var widenContent =		true;
//	You may set this to false if you would rather keep the page thin.
var stupidWideContent =	false;
//	Make it even wider for what ever reason... *Must have widenContent enabled*
var noLeftMenu =		false;
//	Even remove the left column to further widen.
var noChatBar =			false;
//	Remove the chat bar (doesn't turn chat off, do that in the chat menu).

	/* End of Setting variables. */

var defSettings = {
	center: 	centerUserImages,
	widen: 		widenContent,
	xwide: 		stupidWideContent,
	left: 		noLeftMenu,
	chat:		noChatBar
};

//	If this is the main window... (Not a frame)
if (window.top === window.self) {
	//	Then initiate the script.
	init();
}
function init(){
	addHeader();
	configWindow();
	//	Run the column delete function.
	delFunction();
	//	Fix the page links, so this script will load up upon loading the page.
	fixLinks();
	
	//	If we are at the news feed...
	if(getPage() == "") { 
		//	Run the style scripts.
		stretchContentCol(widenContent);
		centerImages(centerUserImages);
	}
}

//	Script functions:
function fixLinks() {
	var browserName = navigator.userAgent;
	var browserExact = browserName.match(/(firefox|chrome|Trident)/i)
	if (/chrome/i.test(browserExact)){
		linkLoop();
	} else {
		//	Create a base element.
		var linkTarget = document.createElement("base");
		//	Set the target for page links to load the entire page.
			linkTarget.target = "_Top";
			linkTarget.id = "linkFix";
		//	Apply the element to the page.
		document.getElementsByTagName('HEAD')[0].insertBefore(linkTarget, document.getElementsByTagName('HEAD')[0].firstChild);
	}
	//alert(navigator.userAgent);
}

function linkLoop() {
	var links = document.getElementsByTagName("A");
	for (var i=0;i<links.length;i++){
		links[i].target = "_top";
	}
	setTimeout(linkLoop, 1000);
}

function configWindow(){
	var cssHeaderBg = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAqCAMAAABFoMFOAAAAWlBMVEVOaaJDYJxCX5xBXptIZJ9MZ6E/XJpFYZ1KZqA9W5lGYp5HY55MaKFJZZ9LZqBEYZ1NaaJNaKJNaKFAXZtAXZpLZ6E+XJo+W5lJZaA9Wpk8Wpk8Wpg8WZg7WZj2xcGWAAAANElEQVR42lWGSQoAIBDDHCjo0f8/UxBxQDQuFwlpqgBZBq6+P+unVY1GnDgwqbD2zGz5e1lBdwvGGPE6OgAAAABJRU5ErkJggg==')";
	var cfgCss = [
	'#FBConfig_Title { background-image:' + cssHeaderBg + '; background-repeat:repeat-x; }',
	'#FBLogo { background-image:url("/rsrc.php/v2/y8/r/IM-Sp7NIZ3y.png"); background-position: -31px -100px; background-size:auto auto; }',
	'#FBConfig_wrapper .config_var { margin-left:10%; margin-right:10%; display:inline-block; left:auto; right:auto; }',
	'#FBConfig_wrapper .section_header_holder { text-align:center; }',
	'#FBConfig_header { margin-bottom:10px !important; }'
	].join("\n");
	
	var cfgTitle = document.createElement('div');
	var fbIcon = document.createElement('div');
	var titleText = document.createElement("div");
	cfgTitle.id = "FBConfig_Title";
	cfgTitle.style.cssText = "margin:0 auto; height:41px;";
	fbIcon.id = "FBLogo";
	fbIcon.style.cssText = "float:left; position:relative; display:inline-block; height:41px; width:41px;";
	titleText.textContent = "Facebook Column Settings";
	titleText.style.cssText = "position:relative; display:inline-block; color:#FFFFFF;";
	
	cfgTitle.appendChild(fbIcon);
	cfgTitle.appendChild(titleText);
	
	GM_config.init(
	{
		'id': 'FBConfig',
		'title': cfgTitle,
		'fields':
		{
			'centerUserImages':
			{
				'label': 'Center Posted Images',
				'type': 'checkbox',
				'section': 'images',
				'default': defSettings.center
			},
			'widenContent':
			{
				'label': 'Stretch Content',
				'title': 'Fills some added space',
				'type': 'checkbox',
				'section': ['widen','You will need to enable both for fill to work.'],
				'default': defSettings.widen
			},
			'stupidWideContent':
			{
				'label': 'Stretch To Fill',
				'title': 'Fills all the left over space',
				'type': 'checkbox',
				'default': defSettings.xwide
			},
			'noLeftMenu':
			{
				'label': 'Remove Left Menu',
				'type': 'checkbox',
				'section': ['hide','Hiding does not disable chat.'],
				'default': defSettings.left
			},
			'noChatBar':
			{
				'label': 'Remove Chat Bar',
				'type': 'checkbox',
				'default': defSettings.chat
			}
		},
		'events':
		{
			'open': function() { onOpen(); },
			'init': function() { onInit(); },
			'save': function() { location.reload(true); }
		},
		'css': cfgCss
	});
}

function configReset() {
	GM_config.set("centerUserImages",defSettings.center);
	GM_config.set("widenContent",defSettings.widen);
	GM_config.set("stupidWideContent",defSettings.xwide);
	GM_config.set("noLeftMenu",defSettings.left);
	GM_config.set("noChatBar",defSettings.chat);
	GM_config.save();
	location.reload(true);
}

function onInit() {
	var defCSS = GM_config.css.basic;
	var newFont = "#FBConfig * { font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; }";
	var oldfont = "#FBConfig * { font-family: arial,tahoma,myriad pro,sans-serif; }";
	var newCSS = defCSS.replace(oldfont,newFont);
	newCSS = defCSS.replace("#FFF","#E9EAED");
	GM_config.css.basic = newCSS;
	
	centerUserImages =	GM_config.get('centerUserImages');
	widenContent =		GM_config.get('widenContent');
	stupidWideContent =	GM_config.get('stupidWideContent');
	noLeftMenu =		GM_config.get('noLeftMenu');
	noChatBar =			GM_config.get('noChatBar');
}

function onOpen() {
	var cfgStyle = GM_config.frame.getAttribute('style');
	var style = [
		['width','500px'],['height','350px'],['box-shadow','6px 10px 5px #888888']
	];
	for (var i=0;i<style.length;i++) {
		var expression = new RegExp("[^-]"+style[i][0]+":\\s\\d+(px|%)?;");
		var tag = ' '+style[i][0]+': '+style[i][1]+';';
		if (expression.test(cfgStyle)){
			cfgStyle = cfgStyle.replace(expression, tag);
		} else {
			cfgStyle += tag;
		}
	}
	
	GM_config.frame.setAttribute('style', cfgStyle);
}

function addHeader() {
	var topBar = document.getElementById("blueBar");
	var header = document.createElement("div");
	var headerTop = document.createElement("div");
	var headerBot = document.createElement("div");
	
	header.className = "clearfix fixed_elem";
	header.style.cssText = "color:#648BF8; top:9px; left:20px; cursor:pointer;";
	header.title = "Click to open Settings menu";
	header.addEventListener("click", function(){ GM_config.open(); }, false);
	//header.onclick = function(){GM_config.open();}
	
	headerTop.style.cssText = "font-size:14px;";
	headerTop.innerHTML = "[Modified " + GM_info.script.version + "]";
	
	headerBot.style.cssText = "font-size:8px; text-align:center; color:#7C9EF9";
	headerBot.innerHTML = "Click to change settings";
	
	header.appendChild(headerTop);
	header.appendChild(headerBot);
	topBar.insertBefore(header, topBar.firstChild);
}

function getPage() {
	if (setPage != undefined) { return setPage; }
	var siteUrl = document.URL;
	var urlSplit = siteUrl.split("/");
	var pageUrl = urlSplit[urlSplit.length - 1];
	if (pageUrl.substring(0,1) == "?"){ pageUrl = ""; }
	setPage = pageUrl;
	
	return pageUrl;
}

function delFunction () {
	//	We need the element of the right side column.
    var colRight = document.getElementById("rightCol");
	//	If it's not loaded/found yet...
    if (colRight !== undefined){ 
		//	Now we delete that element.
        colRight.parentNode.removeChild(colRight);

		//	Time to stretch the middle column by removing part of its
		//	class information.
		//	We grab the middle column as we did the right one.
        var colContent = document.getElementById("contentCol");
		//	Store the list of classes stored within it.
		var contentClassList = colContent.classList;
		
		//	If it indeed has the Right column class...
        if (contentClassList.contains("hasRightCol")){
			//	We shall remove that class tag.
            contentClassList.remove("hasRightCol");
        }
		//	Facebook will not make room for the right column any more,
		//	thus stretching out the middle column instead.
    }
	
	//	If you really don't want your left menu...
	if (noLeftMenu) {
		var bodyClassList = document.body.classList;
		
		//	If it has the Left column class...
		if (bodyClassList.contains("hasLeftCol")) {
			//	We shall remove that class tag.
            bodyClassList.remove("hasLeftCol");
		}
		//	Your left menu is gone, and content is expanded over it.
	}
	
	//	If you wish to hide the chat this way...
	if (noChatBar) {
		//	Find the sidebar node.
		var chatBar = document.getElementById("pagelet_sidebar");
		
		//	If the sidebar is on the page...
		if (chatBar !== undefined){
			//	Can that shit.
			chatBar.parentNode.removeChild(chatBar);
			
			//	Find the chat panel.
			var sideBar = document.getElementById("globalContainer").nextSibling;
			//	If what we suppose is the panel contains the right id tag...
			if (sideBar.id.substr(0,4) === "u_0_") {
				//	Remove the sidebar panel.
				sideBar.parentNode.removeChild(sideBar);
			}
		}
	}
}

function centerImages (run) {
	if(run == false){
		return;
	}
    //	Grab all the posted images in the content list.
	var colContent = document.getElementById("contentCol");
    var allImages = colContent.getElementsByTagName("IMG");
	for (var i=imageIndex;i < allImages.length;i++) {
		var curImage = allImages[i]; //	Current img [img]
		var curParent = curImage.parentNode; // Parent of img [div]
		//	Posted images are placed in a div inside the link node.
		if (curParent.tagName == "DIV") {
			var curGrand = curParent.parentNode; // Parent of div > img [a]
			var nextGrand = curGrand.nextSibling;
			//	Check if the image is not a single user image.
			if (curGrand.className.indexOf("_5wfx") > -1) {
				//	Image is an embedded video thumbnail.
				curGrand = curGrand.parentNode.parentNode;
			}else if (curParent.className == "uiScaledImageContainer") {
				//	Image is of a collection of images inside post.
				curGrand = curGrand.parentNode;
			}else if (curImage.className.indexOf("fbStoryAttachmentImage") > -1) {
				//	Image is a shared story item.
				curGrand = curImage;
			}else if (nextGrand !== null) {
				if (nextGrand.tagName == "A") {
					//	Multiple image post, no collection.
					curGrand = curGrand.parentNode;
				}
			}
			//	Make the Div nodes center the content.
			curGrand.style.marginLeft = "auto";
			curGrand.style.marginRight = "auto";
			//	Remember which image we left off at.
			imageIndex = i;
		}
	}
	//	Run this function every second to center new content.
    setTimeout(centerImages, 1000);
}

function stretchContentCol(run){
	if (run == false){
		return;
	}
	//	Get the nodes for the feed content.
    var contentCol = document.getElementById("contentCol");
    var contentArea = document.getElementById("contentArea");
	
	//	Stretch out the nodes to fill the open space.
    contentCol.style.cssText = "width:100%;padding-right:0px;";
    contentArea.style.cssText = "width:100%;padding-right:0px;";
	
	//	If you need an unnecessarily large display...
	if (stupidWideContent) {
		//	Grab the main node which holds the left and center columns.
		var contentContainer = document.getElementById("globalContainer");
		//	Push it to the left since it will be stretched out.
		contentContainer.style.cssFloat = "left";
		contentContainer.style.paddingRight = "0px";
		
		//	If you've hidden the left column...
		if (noLeftMenu) {
			//	If you've hidden the chat...
			if (noChatBar) {
				//	Let's fill this bitch.
				contentContainer.style.width = "100%";
			} else {
				//	Make it take up the page, leave room for chat.
				contentContainer.style.width = "calc(100% - 205px)";
			}
		} else {
			//	If you've hidden the chat...
			if (noChatBar) {
				//	Let's fill this bitch, but tastefully.
				contentContainer.style.width = "calc(100% - 190px)";
			} else {
				//	You've not hidden the left, leave room for that shit too.
				contentContainer.style.width = "calc(100% - 400px)";
			}
		}
	}
}

/* 
Entire script and it's most excellent comments brought to you
	by Joscpe.
            Last Edited: Apr 24th, 2014 
*/