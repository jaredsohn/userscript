// ==UserScript==
// @name        The ASP.NET Forums Beautifier
// @description Hides the Advertisements and Fluff on the ASP.NET Forums
// @author      Adam Kahtava
// @version     1.0
// @include     http://forums.asp.net/*
// @namespace   http://adam.kahtava.com/etcetera/GreaseMonkey/forums.asp.net.beautifier/
// ==/UserScript==

window.addEventListener('load', function(){

  var elementsToHide = '.CommonSmallAvatar, .header_top, .ForumPostUserAvatar, .FanRoundedArea, .logo, .nav_main, .footer_container, .ad_text_blocks, .ForumSubArea, #cb_main, .CommonSidebar, #footerLegalId, iframe'

  if(document.styleSheets.length > 0){

    var styleSheet = document.styleSheets[document.styleSheets.length-1];

    styleSheet.insertRule( elementsToHide + '{display: none;}', styleSheet.cssRules.length );
    
    //make things pretty
    styleSheet.insertRule( '.header_container {margin: 0px;}', styleSheet.cssRules.length );
    styleSheet.insertRule( '.header_content_right {height: 10px; min-height: 10px;}', styleSheet.cssRules.length );
	
    //Show the text editor iframe for replies
    styleSheet.insertRule( 'iframe#mce_editor_0 {display: block;}', styleSheet.cssRules.length );
    
  }

}, true);