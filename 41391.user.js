// 
// Title:	Thumber
// Version: 	0.5
// Date:	08-March-2009
// Author:	Diado
// URL:	http://diado.deviantart.com/
// Note:	Please report any bugs or feature requests to Diado at the above URL.
// Disclaimer:	This script is provided 'as is', without any warranty or guarantee of any kind.
// Copyright:	© 2009 Diado
// 
// Version 0.5 changes:
//		Added support for deviations in the deviantWATCH area of the message centre
//		Added support for showing thumbcodes on Daily Deviation pages
//		Added support for showing shopcodes on shop and print pages
//		Added context menu supporting:
//			Direct link to deviation
//			Direct link to thumb owner's gallery
//			Direct link to thumb owner's prints
//			Direct link to thumb owner's profile
//			Direct noting of thumb owner
//			Getting thumb's thumb/shop code without enabling all thumbcode boxes
//			Direct editing of thumbnail if it's owned by you (excludes prints)
//		Added options dialog to select how the context menu is triggered and where the context links open(accessible by right-clicking the Thumber link)
//		Changed the way CSS styles are created and assigned
//		Stopped Thumber from being executed on SitBack pages 
//		Fixed a bug which affected uploading avatars on the settings page
//
// ==UserScript==
// @name          Thumber v0.5
// @namespace     Thumber
// @description   Allows easy access to 'thumb codes' for all deviations on a deviantArt page and more!
// @include       http://*.deviantart.com/*
// @exclude 	http://chat.deviantart.com/*
// @exclude 	http://www.deviantart.com/submit*
// @exclude 	http://justsitback.deviantart.com/*
// @exclude	http://my.deviantart.com/settings/*
// ==/UserScript==

var logoutElements, logoutElement, thumberSpan, thumberLink, textElement, divContextMenu, divScroll, divCollector, titleCollector, inputCollector, textCollector, style, styleElement;
var divSingleCollector, titleSingleCollector, inputSingleCollector, textSingleCollector, divOptions, divOptions_Heading, divOptions_Context_Heading, divOptions_Context_Container;
var qs_settings_contextAttachment, divSettings;
var thumber_version = 'v0.5'		//##Version

function querySt(requestedKey) {
	var qs, values, key, i
	qs = window.location.search.substring(1);
	values = qs.split("&");
	for (i = 0; i < values.length; i++) {
		key = values[i].split("=");
		if (key[0] == requestedKey) {
			return key[1];
		}
	}
	return '';
}
//Add a Thumber link and initial HTML elements to the deviantArt page
logoutElements = document.evaluate("//span[@class='logout']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (logoutElements.snapshotLength > 0) {
	//styles
	GM_addStyle('#divThumberOptions {visibility:hidden;position:absolute;z-index:9999;background-color:#ccd9c7;width:500px;height:270px;left:' + ((screen.availWidth / 2) - 250) + 'px;top:' + ((screen.availHeight / 2) - 300) + 'px;opacity:.95;border:1px solid #40534a;}');
	GM_addStyle('#divThumberScrollLink {position:absolute;z-index:9999;visibility:hidden;background-color:#40534a;width:75px;text-align:center;vertical-align:middle;height:20px;padding-top:5px;left:' + (screen.availWidth - 125) + 'px;top:0px;opacity:.95;border:1px solid #000000;}');
	GM_addStyle('#thumber_contextMenu {position:absolute;z-index:9999;visibility:hidden;background-color:#ccd9c7;width:150px;height:200px;left:0px;top:0px;opacity:1;border:1px solid #546b5e;text-align:center;}');
	GM_addStyle('#divThumber {position:absolute;z-index:9999;visibility:hidden;background-color:#40534a;width:500px;height:100px;left:' + ((screen.availWidth / 2) - 250) + 'px;top:' + ((screen.availHeight / 2) - 50) + 'px;opacity:.95;border:2px solid #000000;}');
	GM_addStyle('#divThumber h3 {color:#FFFFFF;position:relative;left:25px;top:10px;}');
	GM_addStyle('#divThumber input {z-index:9999;position:relative;left:25px;top:15px;width:440px;font-size:10px;}');
	GM_addStyle('#divThumber_TextCollector {color:#FFFFFF;position:relative;left:25px;top:25px;font-size:10px;}');
	GM_addStyle('#divSingleThumber {position:absolute;z-index:9999;visibility:hidden;background-color:#40534a;width:250px;height:150px;left:' + ((screen.availWidth / 2) - 125) + 'px;top:' + ((screen.availHeight / 2) - 75) + 'px;opacity:.95;border:2px solid #000000;}');
	GM_addStyle('#divSingleThumber h3 {color:#FFFFFF;position:relative;left:25px;top:10px;}');
	GM_addStyle('#inputSingleCollector {z-index:9999;position:relative;left:25px;top:15px;width:190px;font-size:12px;text-align:center;}');
	GM_addStyle('#divThumber_TextSingleCollector {color:#FFFFFF;position:relative;left:25px;top:25px;font-size:10px;}');
	GM_addStyle('a.thumber_ContextLink:link, a.thumber_ContextLink:visited {display:block;color:#000000;height:19px;font-size:10px;background-color:transparent;border-bottom:1px solid #b2c6ae;text-decoration:none;padding:5px 0 0 10px;text-align:left;}\n');
	GM_addStyle('a.thumber_ContextLink:hover {display:block;color:#ffffff;height:19px;font-size:10px;background-color:#498091;border-bottom:1px solid #b2c6ae;text-decoration:none;padding:5px 0 0 10px;text-align:left;}\n');
	GM_addStyle('a.thumber_Link:link, a.thumberLink:visited {color:#FFFFFF;font-size:11px;text-decoration:none;}');
	GM_addStyle('div.thumber_DisabledMenuItem {display:block;color:#777777;height:19px;font-size:10px;background-color:transparent;border-bottom:1px solid #b2c6ae;text-decoration:none;padding:5px 0 0 10px;text-align:left;}\n');
	GM_addStyle('div.thumber_MenuTitle {display:block;color:#ffffff;height:21px;font-size:12px;background-color:#536a5d;border-bottom:0px;text-decoration:none;padding:3px 0 0 0;text-align:center;}\n');
	GM_addStyle('div.thumber_OptionsDialog_Heading {background-color:#498091;height:27px;text-align:center;color:#ffffff;}\n');
	GM_addStyle('div.thumber_OptionsDialog_GroupHeading {text-align:left;color:#000000;}\n');
	GM_addStyle('div.thumber_OptionsDialog_GroupHeading h4 {font-size:16px;padding:10px 0 0 10px;}\n');
	GM_addStyle('div.thumber_OptionsDialog_GroupContainer {text-align:left;color:#40534a;width:400px;border:1px dotted #40534a;margin:10px auto 0 auto;padding:15px;font-size:11px;}\n');
	GM_addStyle('div.thumber_OptionsDialog_GroupContainer hr {margin:20px auto 10px auto;opacity:.5;}\n');
	GM_addStyle('div.thumber_OptionsDialog_ButtonContainer {text-align:right;color:#40534a;width:430px;margin:10px auto 0 auto;padding:0px;font-size:11px;}\n');
	GM_addStyle('.thumber_ThumbCode {padding:3px 5px;margin:8px auto 0 auto;opacity: .50;border:1px solid #9EB1A2;-moz-border-radius:5px;display:block;text-align:center;}');
	GM_addStyle('img.thumber_ForumHeartLink {z-index:100;float:right;position:relative;top:-19px;left:-4px;opacity:.6;}');
	GM_addStyle('img.thumber_DDHeartLink {z-index:100;:right;position:relative;top:-19px;left:-28px;opacity:.6;}');
	GM_addStyle('img.thumber_GalleryHeartLink {z-index:100;float:right;position:relative;top:-19px;left:-28px;opacity:.6;}');
	//Thumber link
	logoutElement = logoutElements.snapshotItem(0);
	thumberSpan = document.createElement('span');
	thumberSpan.innerHTML = '<a href="javascript:thumber_runThumber();" class="thumber_Link" onContextMenu="return thumber_optionsShow();">Thumber</a>'
	logoutElement.parentNode.insertBefore(thumberSpan, logoutElement);
	textElement = document.createTextNode(' | ');
	thumberSpan.parentNode.insertBefore(textElement, thumberSpan.nextSibling);
	//Context menu
	divContextMenu = document.createElement('div');
	divContextMenu.setAttribute('id', 'thumber_contextMenu');
	divContextMenu.setAttribute('onMouseOut', 'thumber_closeContextMenuTimed();');
	divContextMenu.setAttribute('onMouseMove', 'thumber_contextCloseCancel();');
	document.body.appendChild(divContextMenu);
	//Scrolled link
	divScroll = document.createElement('div');
	divScroll.innerHTML = '<a href="javascript:thumber_runThumber();" class="thumber_Link"><img src="http://e.deviantart.com/emoticons/f/favheart.gif" style="vertical-align:middle;" /> Thumber</a>';
	divScroll.setAttribute('id', 'divThumberScrollLink');
	document.body.appendChild(divScroll);
	//Collector
	divCollector = document.createElement('div');
	divCollector.setAttribute('id', 'divThumber');
	divCollector.setAttribute('onClick','thumber_clearAndHide(\'divThumber\');'); 
	document.body.appendChild(divCollector);
	titleCollector = document.createElement('h3');
	titleCollector.innerHTML = 'Thumber ' + thumber_version;
	divCollector.appendChild(titleCollector);
	inputCollector = document.createElement('input');
	inputCollector.setAttribute('type', 'text');
	inputCollector.setAttribute('id', 'inputCollector');
	inputCollector.setAttribute('onClick','this.select()'); 
	inputCollector.setAttribute('onKeyDown','thumber_checkForCopy(event, \'divThumber\');');
	divCollector.appendChild(inputCollector);
	textCollector = document.createElement('div');
	textCollector.setAttribute('id', 'divThumber_TextCollector');
	textCollector.innerHTML = 'Press CTRL-C to copy the thumb/shop codes to your clipboard and hide this dialog.<br/><a href="http://diado.deviantart.com/art/Thumber-108476336" style="color:#FFFFFF;">Thumber</a> is written by =<a href="http://diado.deviantart.com" style="color:#FFFFFF;">Diado</a>';
	divCollector.appendChild(textCollector);
	//single thumb collector
	divSingleCollector = document.createElement('div');
	divSingleCollector.setAttribute('id', 'divSingleThumber');
	divSingleCollector.setAttribute('onClick','thumber_clearAndHide(\'divSingleThumber\');'); 
	document.body.appendChild(divSingleCollector);
	titleSingleCollector = document.createElement('h3');
	titleSingleCollector.innerHTML = 'Thumber ' + thumber_version;
	divSingleCollector.appendChild(titleSingleCollector);
	inputSingleCollector = document.createElement('input');
	inputSingleCollector.setAttribute('type', 'text');
	inputSingleCollector.setAttribute('id', 'inputSingleCollector');
	inputSingleCollector.setAttribute('onClick','this.select()'); 
	inputSingleCollector.setAttribute('onKeyDown','thumber_checkForCopy(event, \'divSingleThumber\');');
	divSingleCollector.appendChild(inputSingleCollector);
	textSingleCollector = document.createElement('div');
	textSingleCollector.setAttribute('id', 'divThumber_TextSingleCollector');
	textSingleCollector.innerHTML = 'Press CTRL-C to copy the thumb/shop<br />code to your clipboard and hide this<br />dialog.<br /><br /><a href="http://diado.deviantart.com/art/Thumber-108476336" style="color:#FFFFFF;">Thumber</a> is written by =<a href="http://diado.deviantart.com" style="color:#FFFFFF;">Diado</a>';
	divSingleCollector.appendChild(textSingleCollector);
	//options
	divOptions = document.createElement('div');
	divOptions.setAttribute('id', 'divThumberOptions');
	document.body.appendChild(divOptions);
	divOptions_Heading = document.createElement('div');
	divOptions_Heading.setAttribute('id', 'divThumberOptions_Heading');
	divOptions_Heading.setAttribute('class', 'thumber_OptionsDialog_Heading');
	divOptions_Heading.innerHTML = '<h3>Thumber ' + thumber_version + ' Options</h3>';
	divOptions.appendChild(divOptions_Heading);
	divOptions_Context_Heading = document.createElement('div');
	divOptions_Context_Heading.setAttribute('id', 'divThumberOptions_Context_Heading');
	divOptions_Context_Heading.setAttribute('class', 'thumber_OptionsDialog_GroupHeading');
	divOptions_Context_Heading.innerHTML = '<h4>Thumbnail Context Menu</h4>';
	divOptions.appendChild(divOptions_Context_Heading);
	divOptions_Context_Container = document.createElement('div');
	divOptions_Context_Container.setAttribute('id', 'divThumberOptions_Context_Container');
	divOptions_Context_Container.setAttribute('class', 'thumber_OptionsDialog_GroupContainer');
	divOptions_Context_Container.innerHTML = '<input type="radio" value="right" name="thumber_options_context_click" id="thumber_options_context_click_right" checked="checked"/>&nbsp;<label for="thumber_options_context_click_right">Thumber menu via right-click, browser menu via CTRL-right-click</label><br />';
	divOptions_Context_Container.innerHTML += '<input type="radio" value="ctrl_right" name="thumber_options_context_click" id="thumber_options_context_click_ctrl_right" />&nbsp;<label for="thumber_options_context_click_ctrl_right">Browser menu via right-click, Thumber menu via CTRL-right-click</label><br />';
	divOptions_Context_Container.innerHTML += '<hr />';
	divOptions_Context_Container.innerHTML += '<input type="radio" value="new_window" name="thumber_options_context_window" id="thumber_options_context_window_new_window" checked="checked"/>&nbsp;<label for="thumber_options_context_window_new_window">Open Thumber context menu links in a new window</label><br />';
	divOptions_Context_Container.innerHTML += '<input type="radio" value="same_window" name="thumber_options_context_window" id="thumber_options_context_window_same_window" />&nbsp;<label for="thumber_options_context_window_same_window">Open Thumber context menu links in the same window</label><br />';
	divOptions.appendChild(divOptions_Context_Container);
	divOptions_Buttons_Container = document.createElement('div');
	divOptions_Buttons_Container.setAttribute('id', 'divThumberOptions_Buttons_Container');
	divOptions_Buttons_Container.setAttribute('class', 'thumber_OptionsDialog_ButtonContainer');
	divOptions_Buttons_Container.innerHTML = '<input type="button" value="Cancel" onClick="thumber_optionsHide();" />&nbsp;<input type="button" value="Save" onClick="thumber_optionsSubmit();" />';
	divOptions.appendChild(divOptions_Buttons_Container);
	//settings
	divSettings = document.createElement('div');
	divSettings.setAttribute('style', 'visibility:hidden;');
	divSettings.setAttribute('id', 'thumber_settings');
	qs_settings_contextAttachment = querySt('thumber_settings_contextAttachment');
	qs_settings_contextWindow = querySt('thumber_settings_contextWindow');
	if (qs_settings_contextAttachment.length > 0) {
		divSettings.setAttribute('contextAttachment', qs_settings_contextAttachment);
		GM_setValue('thumber_settings_contextAttachment', qs_settings_contextAttachment);
	} else {
		divSettings.setAttribute('contextAttachment', GM_getValue('thumber_settings_contextAttachment', 'right'));
	}
	qs_settings_contextWindow = querySt('thumber_settings_contextWindow');
	if (qs_settings_contextWindow.length > 0) {
		divSettings.setAttribute('contextWindow', qs_settings_contextWindow);
		GM_setValue('thumber_settings_contextWindow', qs_settings_contextWindow);
	} else {
		divSettings.setAttribute('contextWindow', GM_getValue('thumber_settings_contextWindow', 'new_window'));
	}
	document.body.appendChild(divSettings);
}

//Insert the Thumber client-side scripts into the page
var thumberScript = document.createElement('script');
thumberScript.appendChild(document.createTextNode((<r><![CDATA[

	var thumber_version = '0.5';		//##Version
	var thumber_active = false;
	var thumber_contextRequired = false;
	var thumber_contextHooked = false;
	var thumber_only = false;
	var thumber_settings_contextAttachment, thumber_settings_contextWindow;
	if (document.getElementById('thumber_settings')) {
		thumber_settings_contextAttachment = document.getElementById('thumber_settings').getAttribute('contextAttachment');
		thumber_settings_contextWindow = document.getElementById('thumber_settings').getAttribute('contextWindow');
	} else {
		thumber_settings_contextAttachment = 'right';
		thumber_settings_contextWindow = 'new_window';
	}

	function thumber_runThumber() {
		var selectedThumbs = document.evaluate("//input[@thumber_selected='yes']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (selectedThumbs.snapshotLength > 0) {
			document.getElementById('inputCollector').value = thumber_getThumbs();
			document.getElementById('divThumber').style.top = ((screen.availHeight / 2) - 50 + window.scrollY -100) +'px';
			document.getElementById('divThumber').style.visibility = 'visible';
			document.getElementById('inputCollector').select();
			document.getElementById('inputCollector').focus();
		} else {
			thumber_setThumbs();
		}
	}
	function thumber_getSingleThumb(thumbID, isShop){
		if (isShop == true) {
			document.getElementById('inputSingleCollector').value = ':shop' + thumbID + ':';
		} else {
			document.getElementById('inputSingleCollector').value = ':thumb' + thumbID + ':';
		}
		document.getElementById('divSingleThumber').style.top = ((screen.availHeight / 2) - 75 + window.scrollY -100) +'px';
		document.getElementById('divSingleThumber').style.visibility = 'visible';
		document.getElementById('inputSingleCollector').select();
		document.getElementById('inputSingleCollector').focus();
	}
	function thumber_checkForScroll() {
		var scrollMenu = document.getElementById('divThumberScrollLink');
		if (thumber_active == true) {
			if (window.scrollY > 10){
				scrollMenu.style.top = (window.scrollY + 25) + 'px';
				scrollMenu.style.visibility = 'visible';
			} else {
				scrollMenu.style.visibility = 'hidden';
			}
		} else {
			scrollMenu.style.visibility = 'hidden';
		}
	}
	function thumber_clearAndHide(which) {
		var divThumber = document.getElementById(which);
		divThumber.getElementsByTagName('input')[0].value = '';
		divThumber.style.visibility = 'hidden';
	}
	function thumber_checkForCopy(e, which) {
		if ((e.which==99 && e.ctrlKey) || (e.which==67 && e.ctrlKey)) {
			setTimeout('thumber_clearAndHide(\'' + which + '\');', 200);
		}
	}
	function thumber_toggleSelect() {
		var thumbInput = this.parentNode.previousSibling;
		if (thumbInput.getAttribute('thumber_selected') == 'no') {
			thumbInput.setAttribute('thumber_selected', 'yes');
			thumbInput.style.color = '#FF0000';
		} else {
			thumbInput.setAttribute('thumber_selected', 'no');
			thumbInput.style.color = '#000000';
		}
		return false;
	}
	function thumber_getThumbs() {
		var i;
		var thumbString = '';
		var selectedThumbs = document.evaluate("//input[@thumber_selected='yes']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (selectedThumbs.snapshotLength > 0) {
			for (i = 0; i < selectedThumbs.snapshotLength; i++) {
				thumbString += selectedThumbs.snapshotItem(i).value + ' ';
				selectedThumbs.snapshotItem(i).setAttribute('thumber_selected', 'no');
				selectedThumbs.snapshotItem(i).style.color = '#000000';
			}
		}
		return thumbString;
	}
	function thumber_setThumbs() {
		var divStream, deviations, colonLoc, thumbID, i, thumbs, forumDeviations, spanThumb, linkThumb, ddThumbs, thumbID, shopDeviations, shopStreams;
		thumbs = document.evaluate("//*[@tagID='thumber']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (thumbs.snapshotLength > 0) {
			for (i = 0; i < thumbs.snapshotLength; i++) {
				thumbs.snapshotItem(i).parentNode.removeChild(thumbs.snapshotItem(i));
			}
			if (document.getElementById('divThumberScrollLink').style.visibility == 'visible') {
				document.getElementById('divThumberScrollLink').style.visibility = 'hidden';
			}
			shopStreams = document.evaluate("//div[@class='shop-frontpage-stream']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (i = 0; i < shopStreams.snapshotLength; i++) {
				shopStreams.snapshotItem(i).style.height = '160px';
			}
			thumber_active = false;
		} else {
			if (document.location.href.search('http://today.deviantart.com/dds') > -1) {
				ddThumbs = document.evaluate("//span[@class='tt-w']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				if (ddThumbs.snapshotLength > 0) {
					thumber_active = true;
				}
				for (i = 0; i < ddThumbs.snapshotLength; i++) {
					thumber_createDDThumb(ddThumbs.snapshotItem(i));
				}
			} else {
				if (thumber_isShopPage() == true) {
					shopDeviations = document.evaluate("//div[@class='tt-a']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					if (shopDeviations.snapshotLength > 0) {
						thumber_active = true;
					}
					for (i = 0; i < shopDeviations.snapshotLength; i++) {
						thumber_createShopThumb(shopDeviations.snapshotItem(i));
					}
					shopStreams = document.evaluate("//div[@class='shop-frontpage-stream']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					for (i = 0; i < shopStreams.snapshotLength; i++) {
						shopStreams.snapshotItem(i).style.height = '200px';
					}
					forumDeviations = document.evaluate("//span[@class='shadow-holder']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					if (forumDeviations.snapshotLength > 0) {
						thumber_active = true;
					}
					for (i = 0; i < forumDeviations.snapshotLength; i++) {
						thumber_createForumThumb(forumDeviations.snapshotItem(i));
					}
				} else {
					deviations = document.evaluate("//div[@class='tt-a' and @collect_rid]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					if (deviations.snapshotLength > 0) {
						thumber_active = true;
					}
					for (i = 0; i < deviations.snapshotLength; i++) {
						thumber_createGalleryThumb(deviations.snapshotItem(i));
					}
					forumDeviations = document.evaluate("//span[@class='shadow-holder']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
					if (forumDeviations.snapshotLength > 0) {
						thumber_active = true;
					}
					for (i = 0; i < forumDeviations.snapshotLength; i++) {
						thumber_createForumThumb(forumDeviations.snapshotItem(i));
					}
				}
			}
		}
	}
	function thumber_createForumThumb(divThumb) {
		var hyphenLoc, thumbID, thumbInput, heartLink, href, slashLoc, linkThumb;
		linkThumb = divThumb.childNodes[0].childNodes[0];
		if (linkThumb.tagName === 'A') {
			thumbID = thumber_getThumbID(divThumb, 2);
			thumbInput = document.createElement('input');
			if (linkThumb.getAttribute('href').search('/print/') > -1) {
				thumbInput.value = ':shop' + thumbID + ':';
			} else {
				thumbInput.value = ':thumb' + thumbID + ':';
			}
			thumbInput.type = 'text';
			thumbInput.setAttribute('class', 'thumber_ThumbCode');
			thumbInput.setAttribute('tagID', 'thumber');
			thumbInput.setAttribute('thumber_selected', 'no');
			thumbInput.setAttribute('onClick','this.select()'); 
			divThumb.insertBefore(thumbInput, linkThumb.parentNode.nextSibling);
			thumber_addHeartLink(thumbInput, 'thumber_ForumHeartLink');
		}
	}
	function thumber_createGalleryThumb(divThumb) {
		var thumbID, anchors, colonLoc, thumbInput, heartLink;
		if (divThumb.getAttribute('collect_rid') === null) {
		} else {
			thumbID = thumber_getThumbID(divThumb, 1);
			anchors = divThumb.getElementsByTagName('a');
			thumbInput = document.createElement('input');
			thumbInput.value = ':thumb' + thumbID + ':';
			thumbInput.type = 'text';
			thumbInput.setAttribute('class', 'thumber_ThumbCode');
			thumbInput.setAttribute('tagID', 'thumber');
			thumbInput.setAttribute('thumber_selected', 'no');
			thumbInput.setAttribute('onClick','this.select()'); 
			if (document.location.href.search('http://my.deviantart.com/messages') > -1) {
				anchors[0].parentNode.parentNode.parentNode.parentNode.insertBefore(thumbInput, anchors[0].parentNode.parentNode.parentNode.parentNode.nextSibling);
				thumbInput.style.marginTop = '-12px';
			} else {
				anchors[1].parentNode.insertBefore(thumbInput, anchors[1].nextSibling);
			}
			thumber_addHeartLink(thumbInput, 'thumber_GalleryHeartLink');
			return thumbID;
		}
	}
	function thumber_createDDThumb(divThumb) {
		var hyphenLoc, thumbID, thumbInput, heartLink, href, slashLoc;
		linkThumb = divThumb.childNodes[0].childNodes[0];
		if (linkThumb.tagName === 'A') {
			thumbID = thumber_getThumbID(divThumb, 2);
			thumbInput = document.createElement('input');
			if (linkThumb.getAttribute('href').search('/print/') > -1) {
				thumbInput.value = ':shop' + thumbID + ':';
			} else {
				thumbInput.value = ':thumb' + thumbID + ':';
			}
			thumbInput.type = 'text';
			thumbInput.setAttribute('class', 'thumber_ThumbCode');
			thumbInput.setAttribute('tagID', 'thumber');
			thumbInput.setAttribute('thumber_selected', 'no');
			thumbInput.setAttribute('onClick','this.select()'); 
			divThumb.insertBefore(thumbInput, divThumb.parentNode.nextSibling);
			thumber_addHeartLink(thumbInput, 'thumber_ForumHeartLink');
		}
	}
	function thumber_createShopThumb(divThumb) {
		var hyphenLoc, thumbID, thumbInput, heartLink, href, slashLoc, linkThumb;
		linkThumb = divThumb.childNodes[0].childNodes[0].childNodes[0];
		if (linkThumb.tagName === 'A') {
			thumbID = thumber_getThumbID(divThumb, 3);
			thumbInput = document.createElement('input');
			thumbInput.value = ':shop' + thumbID + ':';
			thumbInput.type = 'text';
			thumbInput.setAttribute('class', 'thumber_ThumbCode');
			thumbInput.setAttribute('tagID', 'thumber');
			thumbInput.setAttribute('thumber_selected', 'no');
			thumbInput.setAttribute('onClick','this.select()'); 
			divThumb.insertBefore(thumbInput, linkThumb.parentNode.parentNode.nextSibling);
			if (document.location.href.search('/store/') == -1 && document.location.href.search('/prints/') == -1) {
				divThumb.style.height = '200px';
				if (divThumb.parentNode.getAttribute('id') == 'shop-featured') {
					thumber_addHeartLink(thumbInput, 'thumber_GalleryHeartLink');
				} else {
					thumber_addHeartLink(thumbInput, 'thumber_ForumHeartLink');
				}
			} else {
				thumber_addHeartLink(thumbInput, 'thumber_GalleryHeartLink');
			}
		}
	}
	function thumber_addHeartLink(thumbInput, className) {
		var heartLink;
		heartLink = document.createElement('a');
		heartLink.setAttribute('href', 'javascript:void(0);');
		heartLink.setAttribute('tagID', 'thumber');
		heartLink.innerHTML = '<img src="http://e.deviantart.com/emoticons/f/favheart.gif" class="' + className + '" />';
		heartLink.childNodes[0].addEventListener('click', thumber_toggleSelect,false);
		thumbInput.parentNode.insertBefore(heartLink, thumbInput.nextSibling);
	}
	function thumber_createGalleryContextHook(divThumb, thumbID, deviant, isPrint) {
		var imgThumb = divThumb.childNodes[0].childNodes[0].childNodes[0].childNodes[1];	//img
		if (typeof imgThumb.tagName == 'undefined') {
			imgThumb = divThumb.childNodes[0].childNodes[0].childNodes[0];
		}
		imgThumb.setAttribute('onContextMenu','return thumber_showContextMenu(event, \'' + thumbID +'\', \'' + deviant +'\', ' + isPrint + ');');
	}
	function thumber_createDDContextHook(divThumb, thumbID, deviant, isPrint) {
		var imgThumb = divThumb.childNodes[0].childNodes[0].childNodes[1];	//img
		if (typeof imgThumb == 'undefined' || typeof imgThumb.tagName == 'undefined') {
			imgThumb = divThumb.childNodes[0].childNodes[0].childNodes[0];
		}
		imgThumb.setAttribute('onContextMenu','return thumber_showContextMenu(event, \'' + thumbID +'\', \'' + deviant +'\', ' + isPrint + ');');
	}
	function thumber_showContextMenu(e, thumbID, deviant, isShop) {
		var menu = document.getElementById('thumber_contextMenu');
		if (e.ctrlKey) {
			if (thumber_settings_contextAttachment == 'right') {
				thumber_closeContextMenu();
				return true;
			} else {
				thumber_setContextMenuContent(e, menu, thumbID, deviant, isShop);
				return false;
			}
		} else {
			if (thumber_settings_contextAttachment == 'ctrl_right') {
				thumber_closeContextMenu();
				return true;
			} else {
				thumber_setContextMenuContent(e, menu, thumbID, deviant, isShop);
				return false;
			}
		}
	}
	function thumber_setContextMenuContent(e, menu, thumbID, deviant, isShop) {
		var editHref = 'http://www.deviantart.com/submit/deviation?deviationId=';
		var linkEnd = ' class="thumber_ContextLink" onClick="thumber_closeContextMenuForced();"'
		var noteBody = window.encodeString('Enter your note text here...\n\n---\nSent via <a href=&quot;http://diado.deviantart.com/art/Thumber-108476336&quot;>Thumber</a>!').replace(/"/g, '%22');
		var menuWidth = (110 + ((deviant.length * 2) * 3))
		var menuLeft, menuTop;
		if (thumber_settings_contextWindow == 'new_window')	{
			linkEnd += ' target="_blank"';
		}
		thumber_contextCloseCancel()
		menu.innerHTML = ''
		menu.innerHTML += '<div class="thumber_MenuTitle">Thumber ' + thumber_version + '</div>';
		if (isShop == true) {
			menu.innerHTML += '<a href="http://www.deviantart.com/print/' + thumbID + '"' + linkEnd + '>View Print</a>';
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Visit Gallery</div>';
			} else {
				menu.innerHTML += '<a href="http://' + deviant + '.deviantart.com/gallery"' + linkEnd + '>Visit ' + deviant + '\'s Gallery</a>';
			}
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Visit Profile</div>';
			} else {
				menu.innerHTML += '<a href="http://' + deviant + '.deviantart.com/"' + linkEnd + '>Visit ' + deviant + '\'s Profile</a>';
			}
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Visit Prints</div>';
			} else {
				menu.innerHTML += '<a href="http://' + deviant + '.deviantart.com/store"' + linkEnd + '>Visit ' + deviant + '\'s Prints</a>';
			}
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Note Deviant</div>';
			} else {
				menu.innerHTML += '<a href="http://my.deviantart.com/notes/?to=' + deviant + '&subject=Note%20about%20your%20print...&body=' + noteBody + '"' + linkEnd + '>Note ' + deviant + '</a>';
			}
			menu.innerHTML += '<a href="javascript:thumber_getSingleThumb(' + thumbID + ', true);" onClick="thumber_closeContextMenuForced();" class="thumber_ContextLink">Get Shopcode</a>';
			menu.innerHTML += '<div class="thumber_DisabledMenuItem">Edit This Deviation</div>';
		} else {
			menu.innerHTML += '<a href="http://www.deviantart.com/deviation/' + thumbID + '"' + linkEnd + '>View Deviation</a>';
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Visit Gallery</div>';
			} else {
				menu.innerHTML += '<a href="http://' + deviant + '.deviantart.com/gallery"' + linkEnd + '>Visit ' + deviant + '\'s Gallery</a>';
			}
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Visit Profile</div>';
			} else {
				menu.innerHTML += '<a href="http://' + deviant + '.deviantart.com/"' + linkEnd + '>Visit ' + deviant + '\'s Profile</a>';
			}
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Visit Prints</div>';
			} else {
				menu.innerHTML += '<a href="http://' + deviant + '.deviantart.com/store"' + linkEnd + '>Visit ' + deviant + '\'s Prints</a>';
			}
			if (deviant == 'www') {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Note Deviant</div>';
			} else {
				menu.innerHTML += '<a href="http://my.deviantart.com/notes/?to=' + deviant + '&subject=Note%20about%20your%20deviation...&body=' + noteBody + '"' + linkEnd + '>Note ' + deviant + '</a>';
			}
			menu.innerHTML += '<a href="javascript:thumber_getSingleThumb(' + thumbID + ', false);" onClick="thumber_closeContextMenuForced();" class="thumber_ContextLink">Get Thumbcode</a>';
			if (window.deviantART.deviant.username == deviant) {
				menu.innerHTML += '<a href="' + editHref + thumbID + '"' + linkEnd + '>Edit This Deviation</a>';
			} else {
				menu.innerHTML += '<div class="thumber_DisabledMenuItem">Edit This Deviation</div>';
			}
		}
		if (window.scrollX > 0 || window.scrollY > 0) {
			menuLeft = e.clientX + window.scrollX;
			menuTop = e.clientY + window.scrollY;
		} else {
			menuLeft = e.clientX;
			menuTop = e.clientY;
		}
		menu.style.left = menuLeft + 'px';
		menu.style.top = menuTop + 'px';
		menu.style.width = menuWidth + 'px';
		menu.style.visibility = 'visible';
	}
	function thumber_closeContextMenuTimed() {
		thumber_contextRequired = false;
		setTimeout('thumber_closeContextMenu();', 500);
	}
	function thumber_closeContextMenu() {
		if (thumber_contextRequired == false) {
			document.getElementById('thumber_contextMenu').style.visibility = 'hidden';
		}
	}
	function thumber_closeContextMenuForced() {
		thumber_contextRequired = false;
		document.getElementById('thumber_contextMenu').style.visibility = 'hidden';
	}
	function thumber_contextCloseCancel() {
		thumber_contextRequired = true;
	}
	function thumber_getThumbID(divThumb, thumbType) {
		var thumbID, colonLoc, hyphenLoc, slashLoc, printLoc, linkThumb, href;
		if (thumbType == 1) {
			colonLoc = divThumb.getAttribute('collect_rid').indexOf(':',1) + 1;
			thumbID = divThumb.getAttribute('collect_rid').substring(colonLoc);
			return thumbID;
		}
		if (thumbType == 2 || thumbType == 3) {
			linkThumb = divThumb.childNodes[0].childNodes[0];
			if (linkThumb.tagName === 'A') {
				href = linkThumb.getAttribute('href');
				if (href.charAt(href.length - 1) == '/') {
					slashLoc = href.lastIndexOf('/', href.length - 2);
					thumbID = href.substring(slashLoc + 1, href.length - 1);
				} else {
					hyphenLoc = href.lastIndexOf('-') + 1;
					thumbID = href.substring(hyphenLoc);
				}
				return thumbID;
			}
		}
		if (thumbType == 3) {
			linkThumb = divThumb.childNodes[0].childNodes[0].childNodes[0];
			if (linkThumb.tagName === 'A') {
				href = linkThumb.getAttribute('href');
				if (href.search('/print/') > -1) {
					slashLoc = href.lastIndexOf('/');
					printLoc = href.lastIndexOf('/print/');
					printLoc += '/print/'.length;
					thumbID = href.substring(printLoc, slashLoc)
				} else {
					hyphenLoc = href.lastIndexOf('-') + 1;
					thumbID = href.substring(hyphenLoc);
				}
				return thumbID;
			}
		}
	}
	function thumber_getDeviantFromURL(link) {
		var deviant;
		var href = link.getAttribute('href');
		var title;
		var titleBuffer;
		deviant = href.slice('http://'.length, href.indexOf('.'));
		if (deviant == 'www') {
			if (link.getAttribute('title') != null) {
				title = link.getAttribute('title');
				titleBuffer = title.substring(title.lastIndexOf(' by ') + 4);
				deviant = titleBuffer.substring(1);
			}
		}
		return deviant;
	}
	function thumber_setContextHooks() {
		var deviations, divThumb, thumbID, i, forumDeviations, ddThumbs, deviant, scriptCheck;
		if (thumber_contextHooked == false) {
			thumber_contextHooked == true;
			deviations = document.evaluate("//div[@class='tt-a' and @collect_rid]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (i = 0; i < deviations.snapshotLength; i++) {
				divThumb = deviations.snapshotItem(i);
				thumbID = thumber_getThumbID(divThumb, 1);
				deviant = thumber_getDeviantFromURL(divThumb.childNodes[0].childNodes[0].childNodes[0]);
				thumber_createGalleryContextHook(divThumb, thumbID, deviant, thumber_isURLPrint(divThumb.childNodes[0].childNodes[0].childNodes[0]));
			}
			ddThumbs = document.evaluate("//span[@class='tt-w']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (i = 0; i < ddThumbs.snapshotLength; i++) {
				divThumb = ddThumbs.snapshotItem(i);
				thumbID = thumber_getThumbID(divThumb, 2);
				deviant = thumber_getDeviantFromURL(divThumb.childNodes[0].childNodes[0]);
				thumber_createDDContextHook(divThumb, thumbID, deviant, thumber_isURLPrint(divThumb.childNodes[0].childNodes[0]));
			}
			forumDeviations = document.evaluate("//span[@class='shadow-holder']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (i = 0; i < forumDeviations.snapshotLength; i++) {
				divThumb = forumDeviations.snapshotItem(i);
				if (typeof divThumb.childNodes[0].childNodes[0].innerHTML != 'undefined') {
					thumbID = thumber_getThumbID(divThumb, 2);
					deviant = thumber_getDeviantFromURL(divThumb.childNodes[0].childNodes[0]);
					thumber_createDDContextHook(divThumb, thumbID, deviant, thumber_isURLPrint(divThumb.childNodes[0].childNodes[0]));
				}
			}
		} else {
			deviations = document.evaluate("//div[@class='tt-a' and @collect_rid]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			if (deviations.snapshotLength > 0) {
				if (deviations.snapshotItem(0).getAttribute('oncontextmenu') == null) {
					for (i = 0; i < deviations.snapshotLength; i++) {
						divThumb = deviations.snapshotItem(i);
						thumbID = thumber_getThumbID(divThumb, 1);
						deviant = thumber_getDeviantFromURL(divThumb.childNodes[0].childNodes[0].childNodes[0]);
						thumber_createGalleryContextHook(divThumb, thumbID, deviant, thumber_isURLPrint(divThumb.childNodes[0].childNodes[0]));
					}
				}
			}
		}
		if (document.location.href.search('http://news.deviantart.com/') == -1 && document.location.href.search('http://forum.deviantart.com/') == -1 && thumber_isShopPage() == false) {
			setTimeout('thumber_setContextHooks();', 1000);
		}
	}
	function thumber_isURLPrint(link) {
		if (link.getAttribute('href') != null) {
			if (link.getAttribute('href').search('/print/') > -1) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	function thumber_optionsHide() {
		document.getElementById('divThumberOptions').style.visibility = 'hidden';
	}
	function thumber_optionsShow() {
		document.getElementById('thumber_options_context_click_right').checked = (thumber_settings_contextAttachment == 'right');
		document.getElementById('thumber_options_context_click_ctrl_right').checked = (thumber_settings_contextAttachment == 'ctrl_right');
		document.getElementById('thumber_options_context_window_same_window').checked = (thumber_settings_contextWindow == 'same_window');
		document.getElementById('thumber_options_context_window_new_window').checked = (thumber_settings_contextWindow == 'new_window');
		document.getElementById('divThumberOptions').style.visibility = 'visible';
		return false;
	}
	function thumber_optionsSubmit() {
		var newLocation = document.location.href;
		var optionRight = document.getElementById('thumber_options_context_click_right');
		var optionCtrlRight = document.getElementById('thumber_options_context_click_ctrl_right');
		var optionNewWindow = document.getElementById('thumber_options_context_window_new_window');
		var optionSameWindow = document.getElementById('thumber_options_context_window_same_window');
		var anchor = '';
		newLocation = newLocation.replace('?thumber_settings_contextAttachment=right', '');
		newLocation = newLocation.replace('?thumber_settings_contextAttachment=ctrl_right', '');
		newLocation = newLocation.replace('&thumber_settings_contextAttachment=right', '');
		newLocation = newLocation.replace('&thumber_settings_contextAttachment=ctrl_right', '');
		newLocation = newLocation.replace('&thumber_settings_contextWindow=new_window', '');
		newLocation = newLocation.replace('&thumber_settings_contextWindow=same_window', '');
		if (newLocation.search(/#/) > -1) {
			anchor = newLocation.substring(newLocation.search(/#/));
			newLocation = newLocation.slice(0,newLocation.search(/#/));
		}
		if (newLocation.search(/\?/) > -1) {
			newLocation += '&thumber_settings_contextAttachment=';
		} else {
			newLocation += '?thumber_settings_contextAttachment=';
		}
		if (optionRight.checked == true) {
			newLocation += 'right';
			document.location.href = newLocation;
		}
		if (optionCtrlRight.checked == true) {
			newLocation += 'ctrl_right';
			document.location.href = newLocation;
		}
		newLocation += '&thumber_settings_contextWindow='
		if (optionNewWindow.checked == true) {
			newLocation += 'new_window';
			newLocation += anchor;
			document.location.href = newLocation;
			return false;
		}
		if (optionSameWindow.checked == true) {
			newLocation += 'same_window';
			newLocation += anchor;
			document.location.href = newLocation;
			return false;
		}
		alert('Unable to save settings');
	}
	function thumber_isShopPage() {
		if (document.location.href.search('http://shop.deviantart.com/') > -1 || document.location.href.search('/store/') > -1 || document.location.href.search('http://prints.deviantart.com/') > -1 || document.location.href.search('/prints/') > -1 ) {
			return true;
		} else {
			return false;
		}
	}
	function thumber_selectNote() {
		var noteBody = document.getElementById('notebody');
		var inputs = document.evaluate("//input[@name='ref']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if (noteBody.value.search('Enter your note text here...') > -1) {
			noteBody.focus();
			noteBody.selectionStart = 0;
			noteBody.selectionEnd = 28;
			if (inputs.snapshotLength > 0) {
				inputs.snapshotItem(0).value = 'http://my.deviantart.com/notes/';
			}
		}
	}
	
	if (document.location.href.search('http://my.deviantart.com/notes/') > -1) {
		setTimeout('thumber_selectNote();', 500);
	}
	setTimeout('thumber_setContextHooks();', 1000);
	window.onscroll = thumber_checkForScroll;

]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(thumberScript)
GM_log('Thumber initialisation successful');
