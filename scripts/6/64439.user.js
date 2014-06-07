// ==UserScript==
// @name           Neopets : Theme (beta)
// @namespace      http://userscripts.org/users/35554
// @description    Change the way Neo looks!
// @include        http://www.neopets.com/*
// @include        http://www.neopets.com/*
// @copyright      EXPL0SION
// Version 0.1
// ==/UserScript==



/*
  * Global Stylesheet
  * TAKE THAT, IE5!
  *
  * Colours, images, and any other theme-specific styles are stored in
  * theme-specific CSS files that are called by template.
  * How brilliantly clever, eh?
*/


/********************************************************************/
/* HTML Tag Styles **************************************************/
/********************************************************************/

	BODY {
		margin: 0px;
		padding: 0px;

		text-align: center;
	}

	BODY, TD, SELECT, INPUT {
		font-family: Arial, Arial, Helvetica, sans-serif;
		font-size: 8pt;
	}

	A:Link, A:Visited, A:Hover {
		text-decoration: none;
/* 
This shouldn't be bold until approved
		font-weight: bold;
*/
	}

	FORM {
		margin: 0px;
		padding: 0px;
	}

	#newfeatures LI {
		margin-left: -20px;
	}

	IMG {
		behavior: url("/pngbehavior.htc");
	}

/********************************************************************/
/* Foundation IDs ***************************************************/
/********************************************************************/

/* The outer div for centering and such */
	#main {
		background-color: #eeeeee;
		width: 996px;
		height: 100%;

		text-align: left;
		vertical-align: top;

		margin: 0 auto;
	}

/* Totally for the header bar at the top */
	#header {
		text-align: left;
		width: 996px;
		height: 77px;
	}

/* Your mom... I mean, page content */
	#content {
		width: 996px;
		vertical-align: top;
		clear: left;
	}

/* Footer, now with 33% more feet */
	#footer {
		width: 996px;
		height: 150px;
		position: relative;
	}


/********************************************************************/
/* Header Stuff *****************************************************/
/********************************************************************/

/* Username, NP, etc. */
	#userinfo {
		height: 28px;
		text-align: left;
	}

/* Navigation.  Duh.  */
	#navigation {
		text-align: left;
		width: 100%;
		height: 32px;
	}

	#template_nav {
		height: 35px;
		list-style: none;
		padding: 0;
		margin: 0px 0px 0px 0px;
	}

	ul.dropdown {
		width: auto;

		list-style: none;
		white-space: nowrap;

		position: absolute;
		top: 30px;
		left: 10px;

		padding: 4px 7px 4px 4px;
		margin: 0px;
	}

	li.nav_image {
		float: left;
		position: relative;
		list-style: none;
		z-index: 9000;
		margin-left: 10px;
	}

	li ul.dropdown {
		display: none;
		text-align: left;
		list-style: none;
		z-index: 5;
		font-size: 7pt;
		line-height: 12px;
		text-decoration: none;
		font-weight: bold;
	}

	li>ul {
		top: auto;
		left: auto;
	}

	LI:hover UL.dropdown, LI.over UL.dropdown {
		display: block;
	}

/* Events mean you're loved */
	.eventIcon {
		height: 36px;
		text-align: center;
		vertical-align: middle;
	}

/* The rest of the space is devoted to the user info */
	.user {
		height: 36px;

		font-weight: none;

		text-align: right;
		vertical-align: middle;

		padding-right: 7px;
	}

/* Time is relative */
	#nst {
		text-align: center;
		font-size: 6pt;
		font-weight: bold;
		font-family: Small Font, Arial, Helvetica, sans-serif;
	}


/********************************************************************/
/* Sidebar Classes **************************************************/
/********************************************************************/

/* Sidebar with the Neopet, etc. */
	.sidebar {
		background-color: #dddddd;

		height: auto;

		text-align: center;
		vertical-align: top;

		padding-top: 6px;
		padding-bottom: 6px;
	}

/* We need a few styles to make a side module work */
	.sidebarModule {
		display: table;
		margin-left: auto;
		margin-right: auto;
	}

/* Styles for our nice header */
	.sidebarHeader {
		height: 20px;

		font-weight: bold;
		text-align: left;

		padding-left: 2px;
	}

	.sidebarHeader A:Link, .sidebarHeader A:Hover, .sidebarHeader A:Visited {
		text-decoration: none;
	}

/* Neopet module */
	.activePet {
		background-color: #dddddd;
		border-bottom: 1px solid #dddddd;
	}

	.neopetPhrase {
		border-bottom: 1px solid #dddddd ;
	}

	.activePetInfo, .activePetInfo TD {
		background-color: #dddddd ;
		color: #000000;
		font-size: 7pt;
	}

/* Neofriends Module */
	.neofriend, .neofriendSearch INPUT {
		font-size: 7pt;
		background-color: #dddddd ;
		color: #000000;
	}

	.neofriendUsername {
		background-color: #dddddd;

		font-size: 7pt;
		text-align: right;

		height: 14px;
	}

	.neofriendUsername A:Link, .neofriendUsername A:Hover, .neofriendUsername A:Visited {
		color: #000000;
	}

	.neofriendInfo {
		width: 100%;
		font-size: 7pt;
		text-align: left;
		color: #000000;
	}

	.neofriendAvatar {
		padding-right: 3px;
	}


/********************************************************************/
/* Content Classes **************************************************/
/********************************************************************/

/* Sidebar with the Neopet, etc. */
	.content {
		height: auto;

		text-align: left;
		vertical-align: top;

		padding: 7px;
	}

/* We need a few styles to make a module work */
	.contentModule {
		height: 100%;
		border: 1px solid #000000;
	}

	.contentModuleTable {
		width: 100%;
		height: 100%;
		border: 1px solid #000000;
	}

	.contentModuleHeader, .contentModuleHeaderAlt {
		height: 22px;

		font-size: 8pt;
		font-weight: bold;
		text-align: left;

		padding-left: 3px;
	}

	.contentModuleHeader A:Link, .contentModuleHeader A:Visited, .contentModuleHeader A:Hover,
	.contentModuleHeaderAlt A:Link, .contentModuleHeaderAlt A:Visited, .contentModuleHeaderAlt A:Hover {
		text-decoration: none;
	}

	.moreLink, .moreLinkAlt {
		font-size: 7pt;
		float: right;

		padding-left: 3px;
		padding-right: 3px;
		padding-bottom: 2px;
		line-height: 10px;
	}

	.contentModuleContent {
		width: 100%;
		height: 100%;

		position: relative;

		background-color: #dddddd;
	}

	.moreLinkBottom {
		height: 20px;
		border-top: 1px solid #E4E4E4;
	}

	.moreLinkBottom, .moreLinkBottom A:Link, .moreLinkBottom A:Visited {
		color: #747474;
		font-weight: bold;
	}

   /* default styles for the rounded corner modules */
	.rcModuleWrapper {
		position: relative; 
	}

	.rcModuleWrapper .moreLink, .rcModuleWrapper .moreLinkAlt {
		margin-top:6px;
		margin-right:11px;
		_position: absolute;
		_top: 0px;
		_right: 0px;
	}

	.rcModuleHeader { 
		height: 25px;
		line-height: 25px;
		font-size: 9pt;
		font-weight: bold;
		text-align: left;
		position:relative;
	}

	.rcModuleTopLeft {
		float:left;
		display:inline;
		position: absolute;
		top: 0;
		width:20px;
		height:25px;
		background: transparent url('http://images.neopets.com/games/arcade/top_left_corner.png') no-repeat top left;
		_background: none;
		_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://images.neopets.com/games/arcade/top_left_corner.png',sizingMethod='scale');
	}

	.rcModuleTopRight { 
		float:right;
		display:inline;
		position: absolute;
		top:0px;
		right:0px;
		width:10px;
		height:25px;
		background: transparent url('http://images.neopets.com/games/arcade/top_right_corner.png') no-repeat top right;
		_background: none;
		_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://images.neopets.com/games/arcade/top_right_corner.png',sizingMethod='scale');
	}

	.rcModuleBottom {
		position:absolute;
		margin-top:-25px;
		width:100%;
	}

	.rcModuleBottomLeft { 
		float:left;
		margin-left:0; 
		width:28px; 
		height:25px;
	}

	.rcModuleBottomRight { 
		float:right;
		margin-right:0; 
		width:28px; 
		height:25px;
	}
	
	.rcModuleHeaderBg {
		position:absolute;
		left: 20px;
		right: 10px;
		background: transparent url('http://images.neopets.com/games/arcade/top_stretcher.png') repeat-x top left; height: 25px;
		_position:relative;
		_background: none;
		_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader (src='http://images.neopets.com/games/arcade/top_stretcher.png',sizingMethod='scale');
		_width: 100%;
	}

	.rcModuleHeaderContent { 
		position:absolute;
		left: 20px;
		right: 10px;
		top:0px;
	}

	.rcModuleHeaderContent a {
		cursor:pointer;
		z-index:10;
		_position:relative;
	}

	.rcModuleContent {
		position: relative;
		border: 2px solid #000000; border-top: 0px;
		padding: 3px;
	}

	.rcModuleContentOuter {
		position: relative;
		border: 1px solid #000000; border-top: 0px;
	}

	.rcModuleContentInner {
		position: relative;
		z-index:1;
	}
	
	.rcModuleContentInner table {
		position:relative;
	}

	.rcModuleContent table {
		position:relative;
	}

/********************************************************************/
/* Footer Classes ***************************************************/
/********************************************************************/

/* The copyright need some space */
	.footer {
		position: relative;
		z-index: 10;
	}

	.copyright {
		padding: 7px 0px 0px 7px;
	}

/* The nifty rotation image.  Yes, it's nifty. */
	.footerNifty {
		position: absolute;
		top: -20px;
		left: 796px;
		float: right;
		z-index: 1;
	}

/********************************************************************/
/* Misc Classes of Doom *********************************************/
/********************************************************************/

/* Page Header */
	.page_header {
		font-weight: bold;
		margin-bottom: 4px;
		clear: both;
	}

/* OH NO!  Legacy code! */
	.sf, .smallfont {
		font-size: 7.5pt;
	}

/* Smaller than your average font */
	.medText {
		font-size: 8pt;
	}

	.indexTitle {
		font-size: 9pt;
	}

/* Ad banners.  No comment, except to say: why does centering in CSS
have to be such a pain in the rear? */
	#ban {
		width: 996px;
		height: 94px;

		display: block;
		margin-left: auto;
		margin-right: auto;

		text-align: center;
	}
	#ban_bottom table {
		margin: 0 auto;
	}

	.ad_wrapper
	{
		float: left;
		background-color: white;
	}
	.ad_wrapper_fixed
	{
	  display: table;
		margin: 0 auto;
	}
	.ad_wrapper p, .adBox p, .ad_wrapper_fixed p /* HOOK: should be child selector but we assume there are no <p> in ads */
	{
		background-color: black;
		color: white;
		font-size: 7.5pt;
		text-align: center;
		padding: 0;
		margin: 0;
	}

	.adBox {
		display: table;

		text-align: center;

		margin-left: auto;
		margin-right: auto;

		border: 1px solid #000000;
		background-color: #000000;
		color: #FFFFFF;
	}
/* yahoo content match */
.adBox2 {
  border:1px solid lightgrey;
  background-color:white;
  text-align:left;
  color:black;
  padding:3px;
}
.footOverlay {
  position: relative;
  text-align: center;
  float: left;
  top:-1em;
  left:375px;
  background:white;
  color: gray;
  padding:3px;
  width:100px;
  font-size:8pt;
  white-space:nowrap;
}
/* Item Styles */
	.neopointItem {
		border: 1px solid #F4A549;
	}

	.otherItem {
		border: 1px solid #7AB67A;
	}

/* Homepage Only styles */
	.newItemHeader {
		height: 16px;
		padding: 0px;
		font-weight: bold;
		background-color: #E4E4E4;
	}

	.newItems {
		height: 125px;
	}

	.newItemSpacer {
		width: 5px;
		border-left: 2px solid #C9C9C9;
		border-right: 2px solid #C9C9C9;
	}

	.marqueeSlot, .marqueeSlotOn {
		width: 150px;
		height: 50px;
	}

	.marqueeSlotOn {
		font-weight: bold;
	}

	.spotlightWinner {
		font-size: 8pt;
	}

	.spotlight img, .latestGamesImg {
		margin-left:5px;
		border: 1px solid #000;
		margin-right: 5px;
	}

	.latestGamesImg {
		margin-right: 7px;
	}

	.latestGamesLlnks {
		padding:3px 0 4px 0;
	}

	.latestGamesBox {
		padding:5px 0 0 0;
	}

	.bar {
		border-top:1px solid #E4E4E4
	}

/********************************************************************/
/* PHP GAMES PAGES ****************************************************/
/********************************************************************/

	.phpGamesNonPortalView {
		float:left;
		width:634px;
		}
	.phpGamesNonPortalView .frame, .phpGamesPortalView .frame {
		border: 2px solid #C9C9C9;
	}

	.phpGamesNonPortalView .contentModuleHeader, .phpGamesPortalView .contentModuleHeader {
		line-height:20px;
	}

	.phpGamesPortalView {
		width:804px;
	}

	.phpGamesTowerAd {
		float: right;
		align:center;
		width:160px;
		height:600px;
	}

/********************************************************************/
/* GAMESROOM PAGES **************************************************/
/********************************************************************/
/* this is here so it can easily be used in other sections of the site */
#gamesRoomContentWrap {
	position:relative; width:975px;
	padding:9px 0px 9px 9px;
	background: transparent url(http://images.neopets.com/games/arcade/stretch_outerframe.jpg) repeat-y;
}

#gamesRoomContentTopCorners {
	position:absolute;
	top:0px;
	left:0px;
	width:982px;
	height:12px;
	background: transparent url(http://images.neopets.com/games/arcade/top_outerframe.jpg) no-repeat top left;
}

#gamesRoomContentBotCorners {
	position:absolute;
	bottom:0px;
	left:0px;
	width:982px;
	height:12px;
	background: transparent url(http://images.neopets.com/games/arcade/bot_outerframe.jpg) no-repeat top left;
}

/********************************************************************/
/* User Info Box ****************************************************/
/********************************************************************/
	.info_fore{
		position: absolute;
		visibility: hidden;
		vertical-align: middle;
		text-align: center;
		background-repeat: no-repeat;
		height: 300px;
		width: 175px;
		z-index: 1001;
	}

	.info_shadow_ie, .info_shadow {
		position:absolute;
		/*float:left;*/
		height: 307px;
		width: 182px;
		visibility: hidden;
		filter: alpha(opacity=70);
		-moz-opacity: 0.70;
		opacity: 0.70;
		z-index: 1000;
	}

	.info_table {
		position: relative;
		border: 0px solid black;
		width: 175px;
		height: 95%;
		top: 3px;
	}
