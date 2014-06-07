// ==UserScript==
// @name          Facebook - Trololololol

Top Nav Bar & More Prettiness
// @namespace     

http://userstyles.org
// @description	  This is a 

tweak that fixes basic usage problems and adds a 

little prettiness to the new Facebook layout 

introduced in Feb 2010.
// @author        whcodered
// 

@homepage      http://userstyles.org/styles/25094
// 

@include       http://facebook.com/*
// @include      

 https://facebook.com/*
// @include       

http://*.facebook.com/*
// @include       

https://*.facebook.com/*
// ==/UserScript==
(function

() {
var css = "#globalContainer #pageHead, 

.loggedout_menubar  {\n  width: 981px !important;\n  

left: 50%;\n  margin-left: -490.5px !important;\n  

z-index: 15 !important;\n}\n#pageHead {\n  position: 

fixed !important;\n  width: 981px !important;\n  

margin: 0 auto !important;\n  top: 0px;\n  z-index: 
!important;\n  top: 0px;\n  width: 100%;\n  visibility: visible;\n  -webkit-box-shadow: 0px 2px 8px rgba(0,0,0,0.3);\n  -moz-box-shadow: 0px 2px 8px rgba(0,0,0,0.3);\n  z-index: 14 !important;\n}\n#blueBar.loggedOut {\n  height: 82px !important;\n}\n#content {\n  padding-top: 35px !important;\n}\nbody.UIPage_LoggedOut #content {\n  padding-top: 0 !important;\n}\n.loggedout_menubar {\n  position: fixed;\n}\n\n\n\n\nbody.ego_page #mainContainer #leftCol {\n  position: fixed;\n  top: 35px;\n}\n\n\n\n\na#navAccountName {\n  width: 122px;\n  white-space: normal !important;\n  word-wrap: break-word;\n  padding-bottom: 5px !important;\n}\nli#navAccount:not(.openToggler) > ul > li > form label {\n  position: absolute;\n  left: -241px;\n  top: -30px;\n  visibility: visible !important;  \n}\nli#navAccount:not(.openToggler) > ul > li > form input{\n  border: 0 !important;\n  color: #FFF !important;\n  font-weight: bold !important;\n  height: 30px !important;\n  padding-top: 4px !important;\n}\nli#navAccount:not(.openToggler) > ul > li > form input:hover{\n  background-color: #6D86B7 !important;\n  padding-bottom: 5px !important;\n}\nli#navAccount ul {\n  display: block !important;\n  visibility: hidden;\n}\nli#navAccount.openToggler ul {\n  visibility: visible;\n}\n\n\n\n\n.jewel { margin-right: 1px !important; }\ndiv:not(#fb_menu_unfriends) > .jewelNew {\n  background: url('data:image/gif;base64,R0lGODlhAQABAIAAAP///zpalCH/C05FVFNDQVBFMi4wAwEAAAAh+QQJeAABACwAAAAAAQABAAACAkQBACH5BAl4AAEALAAAAAABAAEAAAICTAEAOw==') !important;\n  -moz-border-radius: 6px;\n  \n  display: block;\n  height: 29px !important;\n}\n\n\n\n\n#headNav, .jewel, .jewelToggler, #pageLogo > a {\n  -webkit-border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  -moz-border-radius-topleft: 4px;\n  -moz-border-radius-topright: 4px;\n}\n#pageNav #navAccount > a, li.openToggler {\n  -webkit-border-top-left-radius: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -moz-border-radius-topright: 5px;\n}\n\n\n\n\n#navAccount > ul, .jewelBox, .uiOverlay, #navSearch .uiTypeaheadView,  .pop_container_advanced, .HovercardOverlay div.stage {\n  -webkit-box-shadow: 3px 3px 20px rgba(0,0,0,0.4);\n  -moz-box-shadow: 3px 3px 20px rgba(0,0,0,0.4);\n}\n#fbDockChat, .fbNubFlyout, .uiMenu {\n  -webkit-box-shadow: 0px 0px 12px rgba(0,0,0,0.3);\n  -moz-box-shadow: 0px 0px 12px rgba(0,0,0,0.3);\n}\nform .uiTypeaheadView {\n  z-index: -10 !important;\n  border-top: 0;\n}\n\n\n\n\n#ConfirmBannerOuterContainer {\n  position: relative !important;\n  top: 40px;\n}\n\n\n\n\n.fbPhotoTheater {\n  background: rgba(0,0,0,0.7);\n}\n.fbPhotoTheater .stageBackdrop, .fbPhotoTheater .stageActions a, .fbPhotoTheater .photoInfoWrapper table {\n  -webkit-box-shadow: 3px 3px 30px rgba(0,0,0,0.6);\n  -moz-box-shadow: 3px 3px 30px rgba(0,0,0,0.6);\n}\n.fbPhotoTheater .stage img {\n  -webkit-box-shadow: 0px 0px 15px rgba(0,0,0,0.8), 3px 3px 50px rgba(0,0,0,0.6);\n  -moz-box-shadow: 0px 0px 15px rgba(0,0,0,0.8), 3px 3px 50px rgba(0,0,0,0.6);\n}\n.fbPhotoTheater .stageBackdrop {\n  background: rgba(0,0,0,0.8) !important;\n  -webkit-border-top-right-radius: 7px;\n  -webkit-border-top-left-radius: 7px;\n  -moz-border-radius-topright: 7px;\n  -moz-border-radius-topleft: 7px;\n}\n\n\n\n\n@-webkit-keyframes fadein {\nfrom {\n  opacity: 0;\n}}\n@-moz-keyframes fadein {\nfrom {\n  opacity: 0;\n}}\n.fbPhotoTheater, .fbPhotoTheater .stage img, .photoInfoWrapper *, .text_exposed_show {\n  -webkit-animation: fadein 0.3s;\n  -moz-animation: fadein 0.3s;\n}\n\n\n@-webkit-keyframes slidefromtop {\nfrom {\n  opacity: 0;\n  -webkit-transform: translateY(-10px);\n}}\n@-moz-keyframes slidefromtop {\nfrom {\n  opacity: 0;\n  -moz-transform: translateY(-10px);\n}}\n.jewelBox, .uiSelectorMenuWrapper, .uiTypeaheadView {\n  -webkit-animation: slidefromtop 0.25s;\n  -moz-animation: slidefromtop 0.25s;\n}\n\n@-webkit-keyframes slidefrombottom {\nfrom {\n  opacity: 0;\n  -webkit-transform: translateY(10px);\n}}\n@-moz-keyframes slidefrombottom {\nfrom {\n  opacity: 0;\n  -moz-transform: translateY(10px);\n}}\n.fbNubFlyout, .hovercard, .uiTooltipWrap {\n  -webkit-animation: slidefrombottom 0.25s;\n  -moz-animation: slidefrombottom 0.25s;\n}\n\n@-webkit-keyframes slidefromtoplarge {\nfrom {\n  opacity: 0;\n  -webkit-transform: translateY(-200px);\n}}\n@-moz-keyframes slidefromtoplarge {\nfrom {\n  opacity: 0;\n  -moz-transform: translateY(-200px);\n}}\nbody:not(.fbQuestionPopupExpanded) .generic_dialog, body.fbQuestionPopupExpanded .pop_content {\n  -webkit-animation: slidefromtoplarge 0.6s;\n  -moz-animation: slidefromtoplarge 0.6s;\n}\n\nbody.fbQuestionPopupExpanded .pop_content {  \n  -webkit-box-shadow: 3px 3px 30px rgba(0,0,0,0.6);\n  -moz-box-shadow: 3px 3px 30px rgba(0,0,0,0.6);\n}\nbody.fbQuestionPopupExpanded {\n  margin-right: 0px; \n  overflow: auto;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

15 !important;\n}\n#blueBar {\n  position: fixed !