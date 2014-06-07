// ==UserScript==
// @name			Twitter Display Favorites Count
// @author			Erik Vold
// @namespace		twitterDisplayFavCount
// @include			http*://twitter.com/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-04
// @lastupdated		2009-09-05
// @description		This userscript will add the favorites count to the home page for logged in users and to all profile pages.
// ==/UserScript==

if (!ev_twitXML) {
	var ev_twitXML = {};
	ev_twitXML.getXML=function(callback){
		// chk if the xml div has already been saved
		if(ev_twitXML.xmlDiv) return;
		// chk if the user xml is in the document
		var userNode=document.evaluate("//user",document,null,9,null).singleNodeValue;
		if(userNode){
			ev_twitXML.xmlDiv=userNode.parentNode;
			callback();
			return;
		}
		var user=document.evaluate("//head/meta[@name='page-user-screen_name']",document,null,9,null).singleNodeValue;
		if(!user && window.location.pathname=='/'){
			user=document.evaluate("//head/meta[@name='session-user-screen_name']",document,null,9,null).singleNodeValue;
			if(!user) return;
		}
		else if (!user) return;
		user=user.getAttribute("content");
		var url="http://twitter.com/users/"+user+".xml";
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {
				// create to xml div
				var newDiv = document.createElement('div');
				newDiv.setAttribute('style','display:none;');
				newDiv.id = 'userXMLDivID';
				newDiv.innerHTML = response.responseText;
				document.body.appendChild(newDiv);
				ev_twitXML.xmlDiv=newDiv;
				callback();
				return;
			}
		});
		return;
	}
}

var twitterDisplayFavCount={};
twitterDisplayFavCount.callback=function(){
	var favoriteCount=document.evaluate(".//favourites_count",ev_twitXML.xmlDiv,null,9,null).singleNodeValue.innerHTML;
	var newSpan=document.createElement('span');
	newSpan.id="favorite_count";
	newSpan.setAttribute('class','stat_count');
	newSpan.innerHTML=favoriteCount;
	twitterDisplayFavCount.favoritesEle.insertBefore(newSpan,twitterDisplayFavCount.favoritesEle.childNodes[0]);
}
twitterDisplayFavCount.run=function(){
	var favoritesEle=document.evaluate("//li[@id='profile_favorites_tab' or @id='favorites_tab']/a[@accesskey='f']",document,null,9,null).singleNodeValue;
	if(!favoritesEle) return;
	twitterDisplayFavCount.favoritesEle=favoritesEle;
	ev_twitXML.getXML( twitterDisplayFavCount.callback );
}
twitterDisplayFavCount.run();