// ==UserScript==
// @name           MySpace for unsocial fascist bastards
// @namespace      http://pjf.id.au/
// @description    Removes almost everything from MySpace
// @include        http://*.myspace.com/*
// ==/UserScript==

// This script was used in a demonstration at linux.conf.au 2008
// It's almost certainly not as good as the other MySpace de-junking
// scripts out there, and exists mostly for educational purposes.

// Crap on front page.

	// These people are not cool.
removeContent('splash_coolNewPeople');

	// I don't wan to see your video.
removeContent('ctl00_Main_SplashDisplay_featuredVideos_CMS_videos');

	// I hate your crap music.
removeContent('splash_mainLeft');

	// I don't want you to compromise my other accounts.
removeContent('ctl00_Main_SplashDisplay_PromoMember_ABIContainer');

	// I don't like the footer.
removeContent('splash_getstarted');

	// The logo takes up needless space.
removeContent('logo');

// Crap my user page

	// Adverts everywhere!
removeContent('ad300x100');
removeContent('squareAd');
removeContent('ctl00_cpMain_MarketingBox_Skin_userHomeTabs_userHomeTabs');
removeContent('marketingcontent');

	// Anything MySpace calls a feature, I don't want to see.
removeContent('tkn_leaderboardDiv');
removeContent('featureWrap');

// MySpace on other pages

	// No cross-promotions.
removeContent('tkn_east');

//******************************************************************************
//Will remove the child of the element of the object you pass
//******************************************************************************
function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}
