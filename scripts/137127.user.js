// ==UserScript==
// @name       facebook black and wide
// @namespace  haluk ilhan
// @version    0.4.81
// @description  dark facebook skin for widescreens
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
// @run-at     document-start
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
//.sidebarMode .fbx #globalContainer {    padding-right: 0px !important;}\
GM_addStyle(" \
.hasLeftCol.hasSmurfbar #blueBarHolder #pageHead, .fbx #globalContainer {width: 825px;}\
.fbMercuryChatTab .input {max-height: 177px; !important;}\
#jewelBoxNotif span.blueName, #jewelBoxMail div.author, a, .UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right, .feedback_toggle_link .feedback_show_link, .feedback_toggle_link .feedback_hide_link, .UIActionLinks .comment_link, .UIActionLinks .comment_link input, button.as_link, .GBThreadRow .line a.link, #navAccount ul a, .uiStream .shareRedesign .uiAttachmentTitle, #navAccount ul .logoutButton input {color: #1C1D1F !important;} \
#MessagingMainContent a, .fbChatMessageGroup a, .messages a {font-weight: bold !important;}\
#blueBar {background: #1C1D1F !important;}\
#pagelet_bluebar{zoom:0.8 !important;}\
.uiStructuredInput .structuredText, .uiStructuredInput .structuredRich, .uiStructuredInput .structuredHint, .uiStructuredInput .structuredPlaceholder {outline:0px !important;}\
#rightCol {display: none !important;}\
.hasLeftCol .homeWiderContent div#contentArea {width:625px !important;}\
body {background: #e9e9e9 !important;}\
#pageNav a {color: white !important;}\
.fbNubFlyoutTitlebar:hover {background-color: #222 !important;}\
.fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar, .menuOpened .fbNubFlyoutTitlebar:hover {background-color: #333 !important;}\
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
.fbFlyoutDialog .fbUfi {width: auto !important;}\
.fbPhotoSnowlift .fbPhotosSnowliftUfi .ufiItem {width: 310px !important;}\
.fbPhotoSnowlift .rhcScroller .uiScrollableAreaContent {padding: 0 10px 0 !important;}\
.photoDetailsContainer  {left: 280px !important; position: relative !important;}\
.permalinkBody .hasRightCol #contentArea {width:680px !important;}\
.permalinkBody .fbTimelineUFI .fbUfi {width: 680px !important;}\
.UIStandardFrame_SidebarAds {display: none !important;}\
.fbPhotoSnowlift .pinnedUfi .fbPhotosSnowliftUfi .uiUfiAddComment {padding-left: 15px !important;}\
#pageNav .navItem a::after {background: #1C1D1F !important;}\
.fbPhotosSnowboxFeedbackInput {margin: 0 10px !important;}\
#fbPhotoPageContainer {background-color: white !important; padding: 0 10px 10px !important;}\
.ego_page .UIStandardFrame_Content {width: 760px !important;}\
\
.hasLeftCol #contentCol {   margin-right: 181px !important;    margin-left: 0 !important;    border-right: 0 !important;}\
#leftCol {    position: fixed !important;    left: 700px !important;    padding: 0 !important;    top: 0 !important;    z-index: 399 !important;}\
#pagelet_welcome_box {    zoom: 0.7 !important; padding-top: 9px !important; background-color: #1C1D1F !important;}\
.fbxWelcomeBoxBlock .fbxWelcomeBoxImg {height: 27px !important; width: 27px !important;}\
#navSearch {    margin: 4px 0 0 25px !important;}\
.hasLeftCol #mainContainer {    border-right: 0 !important;}\
#pagelet_navigation {    display: none;    background: white !important;    padding: 0 5px 10px !important; border: 1px solid #000 !important;}\
#leftCol:hover #pagelet_navigation {    display: block !important;}\
#pageNav {    margin-right: 163px !important;}\
.fbxWelcomeBoxName {    color: white !important;}\
.uiStreamStory .mainWrapper .UFIContainer {width: 650px !important;}\
.fbDockChatTabFlyout {height: 385px !important; }\
.fbMercuryChatTab .fbDockChatTabFlyout {height: 385px !important; }\
#fbDockChatTabs .-cx-PRIVATE-fbMercuryChatTab__root.opened {width: 320px !important;}\
.fbxPhoto .fbPhotosPhotoFeedback .UFIContainer {width: 745px !important;}\
#home_stream .shareRedesign {width: 650px !important;}\
.fbPagePostFooter .UFIContainer {width: 680px !important;}\
.shareRedesign .shareMediaLink, .shareRedesign .shareMediaVideo, .shareRedesign .shareMediaVideo .img, .shareRedesign .exploded iframe {display: block !important; zoom: 1.60 !important; max-height:224px !important;}\
.hasLeftCol #pageFooter, li.navItem.middleItem.tinyman, li#navHome.navItem.firstItem {display: none !important;}\
.-cx-PRIVATE-fbMercuryChatTab__root .titlebar .titlebarText, ._50mz .titlebar .titlebarText {color: #fff !important;}\
._5ys3 {zoom:1.33;}\
._5rwo {zoom:0.77;}\
._50kd ._kso, ._kso {margin: 2px 0px !important;}\
#globalContainer {    margin-left: 0px;}\
.sidebarMode #globalContainer {    margin-left: 145px;}\
.hasLeftCol.hasSmurfbar #blueBarHolder #pageHead {padding-left: 0px;}\
#pageHead {margin-left: 0px !important; zoom:1.1 !important;}\
.sidebarMode #pageHead {margin-left: 185px !important; zoom:1.1 !important;}\
._2nb, ._2nc .uiScrollableAreaBody, ._2nc {width: 513px !important;}\
\ ");

function LocalMain ()
{
var res = document.evaluate("//span[contains(text(),'Suggested Post')]", document, null, 7, null);

if (res.snapshotLength > 0) {

	for (i=0; i < res.snapshotLength; i++) {
		if (res.snapshotItem(i).className == "fwn fcg") {
			current = res.snapshotItem(i);
			while (current.tagName != "BODY") {
				current = current.parentNode;
				if (current.tagName == "LI") {
					current.parentNode.removeChild(current);
					break;
				}
			}
		}
	}
}}

LocalMain ();

var PostsChangedByAJAX_Timer    = '';

var PostContainerNode           = document.getElementById ('contentArea');

PostContainerNode.addEventListener ("DOMSubtreeModified", PageBitHasLoaded, false);


function PageBitHasLoaded (zEvent)
{
    /*--- Set and reset a timer so that we run our code (LocalMain() ) only
        AFTER the last post -- in a batch -- is added.  Adjust the time if needed, but
        half a second is a good all-round value.
    */
    if (typeof PostsChangedByAJAX_Timer == "number")
    {
        clearTimeout (PostsChangedByAJAX_Timer);
        PostsChangedByAJAX_Timer  = '';
    }
    PostsChangedByAJAX_Timer      = setTimeout (function() {LocalMain (); }, 555);
}