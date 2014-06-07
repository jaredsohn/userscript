// ==UserScript==
// @name           addLinksToSearchResults
// @namespace      Links
// @include        http://vkontakte.ru/people.php*
// @include        http://vkontakte.ru/gsearch.php*
// ==/UserScript==

(function(){
//  http://vkontakte.ru/id8717398
	
	
	var ulArr = document.getElementsByTagName("ul");
	for(var i = 0; i < ulArr.length; i++) {
        var element = ulArr[i];
		if (element.id=="nav"){
        var temp = element.getElementsByTagName("a")[0];
		var href = temp.href.replace("mail.php?act=write&to=", "photos.php?id=");
		var new_element = document.createElement('li'); 
		new_element.innerHTML = "<a href="+href+" target=_blank>Show photos</a>";
		element.insertBefore(new_element,null); 
		var href = temp.href.replace("vkontakte.ru/mail.php?act=write&to=", "durov.ru/#");
		var new_element = document.createElement('li'); 
		new_element.innerHTML = "<a href="+href+" target=_blank>Durov.ru URL</a>";
		element.insertBefore(new_element,null); 
		}
    }

	

})()