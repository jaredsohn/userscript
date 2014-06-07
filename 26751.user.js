// ==UserScript==
// @name BetterMuchoSucko
// @namespace      http://www.muchosucko.com/show/

// @description Removes adult ads, Adds scrollable field to comments, Makes content bigger and removes logo
// @include http://www.muchosucko.com/show/*

// ==/UserScript==

// CHANGELOG
// v0.1 created initial script
// v0.2 make video bigger, remove video logo

function removeAds() 
{
  //remove Dumb ad divs
  var adSidebar = document.getElementById('friendslist');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('recent_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('more_recent_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('popular_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('more_popular_searches');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('bottom_friends');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('bottom_menu');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}
  adSidebar = document.getElementById('comment-invite');
  if (adSidebar) {adSidebar.parentNode.removeChild(adSidebar);}

  //remove all iframes
  var alliFrames, thisiFrame;
  alliFrames = document.getElementsByTagName('iframe');
  for (var i = 0; i < alliFrames.length; i++) 
  {
    thisiFrame = alliFrames[i];
    // do something with iFrame
    thisiFrame.width = 0;
    thisiFrame.height = 0;
  }
}

function addScroll()
{
  //Comments area
  var adSidebar = document.getElementById('comments_0');
  adSidebar.style.width = '640px';
  adSidebar.style.height = '300px';
  adSidebar.style.overflow = 'scroll';

}

function improveVideo()
{
	var vidtag = document.getElementsByTagName('embed')[0];
	if(!vidtag) return;
	var flashvars = vidtag.getAttribute('flashvars');
	flashvars = flashvars.replace('&logo=http://www.muchosucko.com/images/muchosuckotag.png', '');
	flashvars = flashvars.replace('height=339&width=425','height=500&width=640');
	var newtag = document.createElement('embed');
	newtag.src = vidtag.src;
	newtag.setAttribute('width', '640');
	newtag.setAttribute('height', '500');
	newtag.setAttribute('allowscriptaccess', 'always');
	newtag.setAttribute('allowfullscreen', 'true');
	newtag.setAttribute('flashvars', flashvars);
	vidtag.parentNode.replaceChild(newtag, vidtag);
}

function improvePicture()
{
	var imgtag = document.evaluate("//div[@class='object']/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(!imgtag) return;
	var src = imgtag.src;
	src = src.replace('/450x1000/', '/');
	imgtag.src = src;
	imgtag.setAttribute('style', 'max-width:640px;max-height:640px;');
}

removeAds();
addScroll();

if(document.title.indexOf(' - Video - ') != -1) {
	improveVideo();
} else if(document.title.indexOf(' - Picture - ') != -1) {
	improvePicture();
}

