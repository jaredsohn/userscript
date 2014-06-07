// ==UserScript==
// @name	Twitter Display Favorites
// @author	Sergii Kauk
// @namespace	twitterDisplayFavCount
// @include	http*://twitter.com/*
// @version	0.2
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2011-07-03
// @lastupdated	2011-07-03
// @description	This userscript adds favorites count to the home page of a logged in user.
// ==/UserScript==

if (!ev_twitXML) {
	var ev_twitXML = {};
	ev_twitXML.getXML=function(callback){
		var user=document.evaluate("//span[@id='screen-name']",document,null,9,null).singleNodeValue.innerHTML;
		if (!user) return;
		var url="https://twitter.com/users/" + user + ".xml";
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
  var userScreenName=document.evaluate(".//screen_name",ev_twitXML.xmlDiv,null,9,null).singleNodeValue.innerHTML;
	var newSpan=document.createElement('div');
	newSpan.className='component';
  newSpan.innerHTML='<h2><a href="/#!/'+userScreenName+'/favorites" class="title-link"><span class="dashboard-component-title">Favorites</span><span class="user-stat-link">' +favoriteCount+'</span></a></h2><hr class="component-spacer">';

  window.addEventListener("load", function(e) {
    var dashboard=document.evaluate("//div[@class='dashboard']",document,null,9,null).singleNodeValue;
    var dashboardComponents=document.evaluate("//div[@class='dashboard']//div[@class='component']",document,null,7,null).snapshotItem(3);
  	dashboard.insertBefore(newSpan,dashboardComponents);
  }, false);
}

twitterDisplayFavCount.run=function(){
	ev_twitXML.getXML(twitterDisplayFavCount.callback);
}

twitterDisplayFavCount.run();