// ==UserScript==
// @name           Remove Offline Favorites
// @namespace      okcupid.com
// @include        http://*.okcupid.com/*
// ==/UserScript==


//Build a list of offline favorites
var offlineList = document.getElementById('lsFavoritesIMOffList');
     
allOfflineFriends = document.evaluate(
    "//li[@class='lsSavedIMoff']",
    offlineList,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//Go through each one and add the remove button  
for (var i = 0; i < allOfflineFriends.snapshotLength; i++) {
    thisDiv = allOfflineFriends.snapshotItem(i);    
     var userName = thisDiv.childNodes[0].innerHTML;
    link = document.createElement("a");
    link.class = 'remove ir';
    link.title= 'remove from favorites';
    link.href="javascript:removeFavorite('" + userName + "');";    
    link.style.display="inline";
    link.style.width="12px";
    link.style.height="12px";
    link.style.margin="3px 5px 0 10px";
    //We need to use an embedded image instead of a background because of the different style setup for the offline list
    link.innerHTML  = "<img src='http://cdn.okcimg.com/_img/layout2/icons/remove.png'/>";
    link.style.overflow="hidden";
    thisDiv.appendChild(link);     
  
}



