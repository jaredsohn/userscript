// ==UserScript==
// @name           Better Facebook!
// @description    This is a very good Facebook version!
// @author         ProgramAngel
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @version        1.0
// ==/UserScript==



//Parent Element To Ads
grandparent = document.getElementById('globalContainer'); 
var removeAdz = function(){
//Ads
document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden'; 
document.getElementById('pagelet_reminders').style.visibility = 'hidden'; 
document.getElementById('pagelet_rhc_footer').style.visibility = 'hidden'; 
document.getElementById('rightCol').style.width = '0px'; 
document.getElementById('contentArea').style.width = '90%'; 

}

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+675px";
	div.style.left = "+44px";
	div.style.backgroundColor = "#87CEEB";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/pages/ProgramAngel/256208971160285?fref=ts\">Visit My Facebook Page</a>"
	
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


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.fbx #globalContainer { width: 100%; }');


// Custom CSS interface styling
GM_addStyle(" \
.fbDockChatTabFlyout {height: 2000px !important; }\
.fbMercuryChatTab .fbDockChatTabFlyout {height: 2000px !important; }\
.fbMercuryChatTab .input {max-height: 177px; !important;}\
#jewelBoxNotif span.blueName, #jewelBoxMail div.author, a, .UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right, .feedback_toggle_link .feedback_show_link, .feedback_toggle_link .feedback_hide_link, .UIActionLinks .comment_link, .UIActionLinks .comment_link input, button.as_link, .GBThreadRow .line a.link, #navAccount ul a, .uiStream .shareRedesign .uiAttachmentTitle, #navAccount ul .logoutButton input {color: #1C1D1F !important;} \
#MessagingMainContent a, .fbChatMessageGroup a {font-weight: bold !important;}\
#blueBar {background: #EB3737 !important;}\
.hasLeftCol #leftCol {position: fixed !important;}\
#rightCol {display: none !important;}\
.uiUfi, .uiStream .shareRedesign, .ogAggregationAnimSubstorySlideSingle .ogSingleStoryContent {width: 950px !important;}\
.hasLeftCol .homeWiderContent div#contentArea {width:780px !important;}\
body {background: #CCC !important;}\
#pageNav a {color: white !important;}\
.fbNubFlyoutTitlebar:hover {background-color: #EB3737 !important;}\
.fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar:hover {background-color: #EB3737 !important;}\
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


function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('div, span, h1,h2,h3,h4,h5,h6{font-family:"Comic Sans MS" !important;}');



// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+675px";
	div.style.left = "+0px";
	div.style.backgroundColor = "#87CEEB";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com\">Home</a>"
	
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


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    
    
    
    
    // ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+696px";
	div.style.left = "+22px";
	div.style.backgroundColor = "#87CEEB";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.programangel.wix.com/nieves\">My Website!</a>"
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
    
    
}

//amici-messaggi-notifiche
jewelContainer.style.position = "fixed";
	jewelContainer.style.bottom = "+696px";
	jewelContainer.style.left = "+97px";
	jewelContainer.style.padding = "2px";


//modulo di ricerca "fissato"
navSearch.style.position = "fixed";

//spostamento post 220px


