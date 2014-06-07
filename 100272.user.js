// ==UserScript==
// @name          Simple Facebook
// @namespace     www.eskiciyeah.com
// @author 		  Cerem Beyazit
// @description   Simple Facebook GUI. Based on the sizzlemctwizzle's "Remove Facebook Ads" Script
// @version       1.0.0
// @run-at        document-start
// @unwrap
// @include       http://*.facebook.com/*
// ==/UserScript==
(function() {
  function appendStyle(h) {
    var head = h || document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
    if (!head || self.location != top.location) {return}
    style.type = 'text/css';
    style.textContent = '#rightCol {display:none;}' +
					'a {color:gray; font-weight:bold;}'+
					'button.as_link{color:gray; padding:0px; font-weight:bold;}'+
                    ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
                    ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
                    ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
                    '.PYMK_Reqs_Sidebar, .ego_header, .ego_unit, ' +
                    '.UIStandardFrame_SidebarAds { display:' +
                    ' none !important; } #wallpage { width: 700px !important; }' +
                    '.LSplitView_ContentWithNoLeftColumn, ' +
                    '.FN_feedbackview { width: 100% !important; }'+
					'.fbProfileByline {display:none;}'+
					'#pagelet_photo_bar {display:none;}'+
					'.feedback_toggle_link .feedback_show_link, .feedback_toggle_link .feedback_hide_link, .UIActionLinks .comment_link, .UIActionLinks .comment_link input {color:gray; font-weight:bold;}'+
					'.UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right {color:gray; font-weight:bold;}'+
					'.uiStreamMessage .messageBody {font-size:12px; line-height:14px;}'+
					'.profile-friends {display:none;}'+
					'#profile-friends-footer {display:none;}'+
					'#pagelet_relationships{display:none;}'+
					'#footerContainer a {color:#DEDEDE; font-size:9px;}'+
					'#blueBar{background-image:url("http://i52.tinypic.com/2czvyp1.jpg"); background-repeat:repeat x-y; height: 41px; left: 0; position: absolute; width: 100% z-index: -1; border-bottom:2px dotted #F2F2F2;}'+
					'#headNav{background:none; border:none; height:31px; margin-left:180px; border-bottom:2px dotted #F2F2F2;}'+
					'#headNav a{color:black; background-color:white;}'+
					'#pageLogo {background-color:white;}'+
					'#pageLogo a{ background-image: url("http://i56.tinypic.com/692l3a.png"); background-position: 0 -32px; background-repeat: no-repeat; color: black; display: block; height: 31px; width: 103px; background-color:white;}'+
					'.#pageNav a:hover {background-color:white; color:white;}'+
					'.uiUfi, .ufiItem {background-color: none; border-bottom: 1px solid #E5EAF1; margin-top: 2px; padding: 5px 5px 4px;}'+
					'#jewelMail:hover{background-color:white; background-position: 0 -127px; background-image: url("http://i56.tinypic.com/692l3a.png"); } '+
					'#jewelMail { background-image: url("http://i56.tinypic.com/692l3a.png"); background-repeat: no-repeat; background-color:none;}'+
					'#jewelRequest { background-image: url("http://i56.tinypic.com/692l3a.png"); background-repeat: no-repeat; background-color:none;}'+
					'#jewelNotif {background-position: -75px -63px; background-image: url("http://i56.tinypic.com/692l3a.png"); background-repeat: no-repeat; background-color:none}'+
					'#jewelNotif:hover {background-position: -25px -95px; background-image: url("http://i56.tinypic.com/692l3a.png"); background-repeat: no-repeat; background-color:white;}'+
					'.hasLeftCol #contentCurve {border:none; position: relative;}'+
					'#jewelRequest:hover{background-color:white; background-position: -50px -63px; background-image: url("http://i56.tinypic.com/692l3a.png"); } '+
					'.hasLeftCol .hasRightCol #contentArea {width:90%; border:none;}'+
					'.#contentCol {padding-top:5px;}'
					'.ginormousProfileName {font-size: 30px; color:gray;}'+
					'.uiComposerOpen .focus_target {padding:0px;}'+
					'.hasLeftCol #mainContainer {border:none;}'+
					'#leftCol{padding-top:5px; width: 179px; float:left; word-wrap: break-word;}'+
					'.uiBoxLightblue {border:none; background-color:white;}';
					'.inputtext DOMControl_placeholder{border:none;}';
	
    head.appendChild(style);
  }

  function nodeInserted(e) {
    if (e.relatedNode.tagName == "HEAD") {
      document.removeEventListener('DOMNodeInserted', nodeInserted, true);
      appendStyle(e.relatedNode);
    }
  }

  // Url matching for Opera
  if (window.opera && 
      !/http:\/\/.*\.facebook\.com\/.*/.test(window.location.href))
    return;

  // Early injection support
  if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);
  else
    appendStyle();
})();