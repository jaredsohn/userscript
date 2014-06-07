// ==UserScript==
// @name           Clean up ThaiVisa forum experience
// @namespace      JDietz
// @description    Remove Top menu, like/share buttons, Sent-by lines etc.
// @include        http://www.thaivisa.com/forum/* 
// @version		   2.1
// ==/UserScript==

var v = "2.1";

function removefb(){

	//common classes - this is enematic to a page
	var shareClasses = ['menu_container','clear clearfix left','google-plus-one','g-plus','badges_v','pin-it-button','g-plusone','cnn-social','stbutton','eswd','gig-button','gig-reaction','ymsb-','sociable','addthis_button','addthis_toolbox','addthis_counter','a2a_dd','connect_widget','db-wrapper','sharethis','st_digg','st_facebook','st_twitter','cnnfb','cnnsocial','cnnShareThisBox','fb-like','fb_like','twtr-widget'];
	for (var i=0;i<shareClasses.length;i++) 
	{
		var elementsWithIt = document.evaluate('//*[contains(@class, "'+shareClasses[i]+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < elementsWithIt.snapshotLength; j++) {
			elementsWithIt.snapshotItem(j).parentNode.removeChild(elementsWithIt.snapshotItem(j));
		}
	}
	
	//fbML/gplusone method
    var fbtags = ['g:plusone','fb:fan','fb:share-button','fb:activity','fb:add-profile-tab','fb:bookmark','fb:comments','fb:friendpile','fb:like','fb:like-box','fb:live-stream','fb:login-button','fb:pronoun','fb:recommendations','fb:serverFbml','fb:profile-pic','fb:user-status'];
	for (var j=0;j<fbtags.length;j++) 
	{
		var fbXML = document.getElementsByTagName(fbtags[j]);
		for (var i=0;i<fbXML.length;i++)
			fbXML[i].parentNode.removeChild(fbXML[i]);
	}
	
	//random divs
	var removeIDs = ['stframe','custom-tweet-button','persistent-share','fb-like-article','cnnStryRcmndBtnBtm'];
	for (var i = 0; i < removeIDs.length; i++) 
	{
		var fbDiv = document.getElementById(removeIDs[i]);
		if (fbDiv) 
			fbDiv.parentNode.removeChild(fbDiv);
	}

	//hrefs,javascripts,etc
	var shareLinks = ['plus.google.com/share','addthis_open(','NPR.socialMedia','stumbleupon.com/submit?url=','tumblr.com/share/','twitter.com/?status=','linkedin.com/shareArticle','reddit.com/submit?url','twitter.com/home?status','twitter.com/intent','google.com/buzz/post','topsy.com/','facebook.com/share','digg.com/submit','twitter.com/share'];
	for (var i=0;i<shareLinks.length;i++)
	{
		var elementsWithIt = document.evaluate('//a[contains(@href, "'+shareLinks[i]+'") or contains(@onmouseover, "'+shareLinks[i]+'") or contains(@onclick, "'+shareLinks[i]+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j = 0; j < elementsWithIt.snapshotLength; j++) {
			elementsWithIt.snapshotItem(j).parentNode.removeChild(elementsWithIt.snapshotItem(j));
		}
	}
}

var remove = ['pinit-cdn.pinterest.com','sharethis.com/','facebook.com/extern','facebook.com/widgets','facebook.com/plugins','facebook.com/connect/','platform0.twitter.com/','platform.twitter.com/','twitter.com/widgets/','tweetmeme.com','plusone.google.com/','yimg.com/b/social_buttons/','fbshare.me','api.flattr.com/button','addthis.com/static/','stumbleupon.com/badge/','widgets.backtype.com','widget.collecta.com/','reddit.com/static/button/'];

if(unsafeWindow.top == unsafeWindow.self) //no run on iframes
{
	document.addEventListener('DOMNodeInserted',function(e){
		window.setTimeout(function(){
			var findLink = document.evaluate('//*[contains(@class, "IN-widget")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //LinkedIn is dynamic
			for (var j = 0; j < findLink.snapshotLength; j++)
				findLink.snapshotItem(j).parentNode.removeChild(findLink.snapshotItem(j));
			
			var iFrames = document.querySelectorAll('iframe');
			if (iFrames.length > 0)	{
				for (var i = 0; i < iFrames.length; i++) {
					for (var j = 0; j < remove.length; j++)
					{
						if (iFrames[i].src.toLowerCase().match(remove[j].toLowerCase())== remove[j].toLowerCase())
							if (iFrames[i].parentNode) 
								iFrames[i].parentNode.removeChild(iFrames[i]);
					}
				}
			}
		}, 250);}
	, false);
	setTimeout(removefb,250);
}

// Get rid of 'Sent from my shoe using Shoetalk 1.0' and similar

var textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var searchRE = new RegExp('Sent from(.+)using(.+)','gi'); 
var replace = '---'; 
for (var i=0;i<textNodes.snapshotLength;i++) { 
	var node = textNodes.snapshotItem(i); 
	node.data = node.data.replace(searchRE, replace);
}

