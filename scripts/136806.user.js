// ==UserScript==
// @name           FB
// @namespace      RnVjayBmYWNlYm9vaw==
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com
// @exclude 
// ==/UserScript==

var 
author='http://senekis.net',
c0='#000000',
c1='#666';

GM_addStyle('body.hasLeftCol,div#contentArea,div#pagelet_timeline_nav,div#blueBar,div#content'+
'div#globalContainer,div#leftCol,div#contentCol,div#footerContainer,input#q,div.name,body.timelineLayout,'+
'div.uiCommentContainer,a.item,li.open,li.selectedItem,div#mainContainer,'+
'div.uiImageBlockContent,div#contentCurve,div.UIImageBlock_Content,'+
'li.ufiItem,div.uiTypeahead,div.uiMetaComposerMessageBoxShelf,'+
'span.uiMorePagerLoader,div.fbTimelineSummarySection,div.detail,div.frame,div.mat,'+
'div.actions,div.clearfix,ul.uiList,ul.uiListHorizontal,div.tlTxFe,div.timelineUnitContainer,'+
'div.externalShareText,div.externalShareContent,div.ext,div.back,h6.timelineReportHeader,'+
'li.pls,span.uiButtonGroupItem,div.loggedout_menubar_container,div.gradient,'+
'body,ul#userNavigation,div.aboveUnitContent,div.ogProfileTitle,a.externalShareContent,'+
'div.fbTimelineSection,div.fbTimelineCompactSection,div.fbTimelineSectionTransparent,'+
'i.img{background-color:'+c0+'!important;}'+

'div a,span a,a,a link,button.stat_elem as_link,button.cmnt_like_link,button.like_link,'+
'button.comment_link,input,textarea.enter_submit,div.mts,span.default_message,'+
'span.text,li.selectedItem,li.open,a.item,span.messageBody,span.messageBody a,span.messageBody a:link,'+
'a.pam,a.pam.link,div.uiAttachmentTitle,div.uiAttachmentTitle a,div.uiAttachmentTitle a:link,'+
'div.UIImageBlock_Content,div.UIImageBlock_Content a,div.UIImageBlock_Content a:link,'+
'div.UIImageBlock_Content span,div.text_exposed_root,div.uiMetaComposerMessageBoxShelf,'+
'div.bookmarksNavSeeAll,div.tlTxFe,div.externalShareText,div.externalShareText a,'+
'div.externalShareText a:link,h6.timelineReportHeader,h6.timelineReportHeader a,'+
'h6.timelineReportHeader a:link,div.titleWithSubtitle,div.titleWithSubtitle a,'+
'div.titleWithSubtitle a:link,div.title,a div.title,div.fsl,div.fwn,span.uiButtonGroupItem{color:'+c1+'!important;}'+

'#pageLogo *{background-image:none;}'+

'div.innerWrap textarea.input{background-color:'+c1+';color:'+c0+';}'+

'div#rightCol,div#fbDockChatBuddylistNub,button.hideToggler,input#u1c96p_78{display:none;}'+

'#facebook *{border:0px!important;}');