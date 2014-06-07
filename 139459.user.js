// ==UserScript==
// @name       Ultimate Facebook Version  G.A.N
// @namespace  Gabriel Nieves
// @version    1.0 G.A.N. yeah!
// @description   A new fantastic facebook,by gabriel nieves
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
// ==/UserScript==

// ==UserScript==
// @name       Ultimate Facebook Version G.A.N
// @namespace  Gabriel Nieves
// @version    2.0 G.A.N. yeah!!!
// @description   A new fantastic facebook,by gabriel nieves
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
// ==/UserScript==

// Initiate custom CSS function
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

// Custom CSS interface styling
GM_addStyle(" \
.fbDockChatTabFlyout {height: 380px !important; }\
.fbMercuryChatTab .fbDockChatTabFlyout {height: 380px !important; }\
.fbMercuryChatTab .input {max-height: 177px; !important;}\
#jewelBoxNotif span.blueName, #jewelBoxMail div.author, a, .UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right, .feedback_toggle_link .feedback_show_link, .feedback_toggle_link .feedback_hide_link, .UIActionLinks .comment_link, .UIActionLinks .comment_link input, button.as_link, .GBThreadRow .line a.link, #navAccount ul a, .uiStream .shareRedesign .uiAttachmentTitle, #navAccount ul .logoutButton input {color: #1C1D1F !important;} \
#MessagingMainContent a, .fbChatMessageGroup a {font-weight: bold !important;}\
#blueBar {background: #1C1D1F !important;}\
.hasLeftCol #leftCol {position: fixed !important;}\
#rightCol {display: none !important;}\
.uiUfi, .uiStream .shareRedesign, .ogAggregationAnimSubstorySlideSingle .ogSingleStoryContent {width: 650px !important;}\
.hasLeftCol .homeWiderContent div#contentArea {width:780px !important;}\
body {background: #e9e9e9 !important;}\
#pageNav a {color: white !important;}\
.fbNubFlyoutTitlebar:hover {background-color: #222 !important;}\
.fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar:hover {background-color: #333 !important;}\
.uiSideNav .item, .uiSideNav .subitem {border-bottom-color: #e9e9e9 !important;}\
.fbMercuryChatTab .titlebar .titlebarText {color: white !important;}\
#pagelet_composer {padding-right: 70px !important;}\
.uiStreamStory .photoRedesign {zoom: 1.38; !important;}\
.uiStreamStory .photoRedesignCover {height: 203px !important; width: 550px !important;}\
.uiStreamStory .photoRedesignSquare .photoWrap {height: 398px !important; width: 398px !important;}\
#MessagingLoadingSpinner, .MessagingForwardedContent, .MessagingReadViewMainContent, #MessagingShelf {width: 750px !important;}\
.MessagingMessage .content {width: 650px !important;}\
#MessagingNetegoWrapper {display: none !important;}\
#MessagingInlineComposer .MessagingComposerForm {max-width: 685px !important;}\
#MessagingInlineComposer textarea {max-width: 682px !important;}\
.MessagingComposerBody {max-height: 580px !important;}\
#MessagingComposerOptions {max-width: 680px !important;}\
.fbTimelineUFI .fbUfi {width: 403px !important;}\
.fbFlyoutDialog .fbUfi {width: auto !important;}\
.fbPhotoSnowlift .fbPhotosSnowliftUfi .ufiItem {width: 310px !important;}\
.fbPhotoSnowlift .rhcScroller .uiScrollableAreaContent {padding: 0 10px 0 !important;}\
.photoDetailsContainer  {left: 280px !important; position: relative !important;}\
.permalinkBody .hasRightCol #contentArea {width:680px !important;}\
.permalinkBody .fbTimelineUFI .fbUfi {width: 680px !important;}\
.UIStandardFrame_SidebarAds {display: none !important;}\
.fbPhotoSnowlift .pinnedUfi .fbPhotosSnowliftUfi .uiUfiAddComment {padding-left: 15px !important;}\
#pageNav .navItem a::after {background: #1C1D1F !important;}\
.slim #blueBar {height: 32px !important;}\
#blueBarHolder.slim {height: 33px !important;}\
.fbx #pageHead, #blueBar #pageHead {padding-top: 1px !important;}\
.fbPhotosSnowboxFeedbackInput {margin: 0 10px !important;}\
#fbPhotoPageContainer {background-color: white !important; padding: 0 10px 10px !important;}\
.ego_page .UIStandardFrame_Content {width: 760px !important;}\
\ ");

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/pages/ProgramAngel/256208971160285\">Visit My Facebook Page :D</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+180px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#rgb(120, 233, 16)";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/gabriel.nieves.7\">Gabriel Nieves The Creator :D</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}


// ==Expand==chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/images/filesave.png
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.programangel.enjin.com/home\">Visit My Web-Site</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
