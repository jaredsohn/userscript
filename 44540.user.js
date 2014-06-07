// ==UserScript==
// @name          Rotten Tomatoes and IMDB ad removal
// @author         zeppelin One
// @namespace      None
// @description    Removes ads on both sites
// @include        http://www.rottentomatoes.com/*
// @include        http://rottentomatoes.com/*
// @include        http://www.imdb.com/title/*
// @include        http://imdb.com/title/*
// ==/UserScript==


if(/rottentomatoes/.test(document.location.href)  ) //If its on Rotten Tomatoes
{
	//top ad container
	removeContent('header_leaderboard_ad_container');

	//sponsored links
		removeContent('sponsored_links')
		removeContent('ad_sponsored_links_box')
		
		
		
		
		removeContent('promos_sidebar');
		removeContent('ad-wrap');
		removeContent('halfpage_ad');
	//right column ad
	removeContent('billboard_ad');

	//anyone who uses greasemonkey is going to download, not rent
	removeContent('sell_thru_main');

	//footer ads
	removeContent('text_ad');
	removeContent('sleaderboard_ad');
}	
else //obtain IMDB page elements
{
	//top ad banner
	removeContent('top_ad_wrapper');
	
	//sponersed links in the middle of the page
	removeContent('sponsored_links_afc_div_MIDDLE_CENTER');
	
}



function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}
