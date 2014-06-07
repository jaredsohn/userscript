// ==UserScript==
// @name          Purpled Out [Facebook Purple/Pink Theme]
// @namespace     http://userstyles.org
// @description	  This style turns your Facebook purple with pink hearts in the background.
// @author        MistahDarcy
// @homepage      http://userstyles.org/styles/58935
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "/*\nAWW HEEEEEL YEAAAAAAAAH DAWG lol\n*/\n\nbody {\nbackground-color:#FFFFFF !important;\nbackground-image:url('http://s2.postimg.org/mbsnxicm1/Bg6bv_KCCMAAHBm.jpg') !important;\nbackground-repeat:repeat !important;\nbackground-attachment:fixed !important;\nbackground-position:center !important;\n}\n\n.topNavLink a, .blueName:hover {\ncolor: #FFFFFF !important;\n}\n\n#rightCol {\npadding-top: 0px !important;\n}\n\n.fbCurrentThickline {\ndisplay: none !important;\n}\n\n.navSubmenu a:hover {\ncolor: #660066 !important;\n}\n\n.navigation a, .blueName {\ncolor: #660066 !important;\n}\n\n#profile_stream_container, #left_column, #contentArea , #leftCol, #info_tab{\nbackground-color:none !important;\nborder:#B856A1 solid 2px;\nbackground-image:url('http://i.imgur.com/4pBX2.png') !important;\n}\n\n#rightCol, #right_column {\nbackground-color:none !important;\nbackground-image:url('http://i.imgur.com/4pBX2.png') !important;\n}\n\n#contentCol {\nbackground:none !important;\npadding-top: 0px !important;\n}\n\n.presenceIndicator, .online, .mobile {\nbackground-image: url(\"http://i.imgur.com/FUIQg.png\") !important;\n}\n\n#pageLogo a {\nbackground-color: transparent !important;\n}\n    \n#pageLogo a:hover {\nbackground-color: #cc00cc !important;\n}\n\na, h1, h2, h3, h4, h5 {\ncolor: #660066 !important;\n}\n    \na:hover {\ncolor: #cc00cc !important;\n}\n\n.jewelHighlight li a:hover {\nbackground-color: #cc00cc !important;\n}\n\n.fbNubButton {\nbackground: -moz-linear-gradient(center top , #660066, #111111) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FFFFFF !important;\n}\n    \n.fbNubButton:hover {\nbackground: #cc00cc !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FFFFFF !important;\n}\n\n.item:hover {\nbackground: #cc00cc !important;\ncolor: #FFFFFF !important;\n}\n\n.selectedItem a {\nbackground: #660066 !important;\ncolor: #FFFFFF !important;\n}\n\na.jewelButton {\nbackground-image: url(\"http://i.imgur.com/5n3xX.png\") !important;\n}   \n\na.jewelButton:hover {\nbackground-color: #FFFFFF !important;\n}  \n\n.profile-picture img {\nmax-width: 174px !important;\n}\n \n#blueBar {\nborder-color: #660066 !important;\n}\n\n.fbNubFlyoutTitlebar {\nbackground: -moz-linear-gradient(center top , #660066, #111111) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FFFFFF !important;\n}\n    \n.fbNubFlyoutTitlebar:hover {\nbackground: #cc00cc !important;\n}\n\n.uiSideNavCount {\nbackground-color: #660066 !important;\ncolor: #FFFFFF !important;\n}\n\n.textInput {\ncolor: #660066 !important;\nfont-family:Lucida Console !important;\n}\n\n.uiSideNavCount:hover {\nbackground-color: #FFFFFF !important;\ncolor: #660066 !important;\n}\n\n.count strong {\ncolor: #FFFFFF !important;\n}\n\n.fbCurrent, .fbCurrentStory, .fbCurrentTitle {\ncolor: #660066 !important;\n}\n\n.uiHeaderSection, .uiSideHeader {\nbackground-color: #FFFFFF !important;\nborder: 1px solid #660066 !important;\ncolor: #000000 !important;\n}      \n\n.submitBtn, .uiButtonConfirm {\nbackground-color: #660066 !important;\nbackground-image: none !important;\n}\n\n.uiBoxLightblue {\nbackground-color: #660066 !important;\nborder: 1px solid #cc00cc !important;\ncolor: #FFFFFF !important;\n}\n\n.uiBoxLightblue:hover {\nbackground-color: #cc00cc !important;\nborder: 1px solid #660066 !important;\ncolor: #FFFFFF !important;\n}\n    \n.uiUfi, .ufiItem {\nbackground-color: #FFFFFF !important;\n}\n\n#pageNav a:hover {\ncolor: #FFFFFF !important;\nbackground-color: #cc00cc !important;\n}\n	\n#blueBar {\nbackground: -moz-linear-gradient(center top , #660066, #111111) repeat scroll 0 0 transparent !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\n}\n\n.uiLinkButton input, .like_link {\ncolor: #660066 !important;\n}\n\n.uiLinkButton input:hover, .like_link:hover {\ncolor: #cc00cc !important;\n}\n\nbody:not(.fixedBody) \n\n#content {\nwidth: 1000px !important;\nmargin-top: 20px !important;\n}\n\n.stat_elem, .as_link, .cmnt_like_link {\ncolor: #660066 !important;\n}\n\n.stat_elem:hover, .as_link:hover, .cmnt_like_link:hover {\ncolor: #cc00cc !important;\n}\n\n#blueBarHolder {\nbackground: -moz-linear-gradient(center top , #660066, #111111) repeat scroll 0 0 transparent !important;\n}\n\n.loggedout_menubar_container{\nheight:900px !important;\n}\n\n.loggedout_menubar{\npadding-top: 100px !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();