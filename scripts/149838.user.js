// ==UserScript==
// @name           Twitter: move Favorites, Lists, and Media links to the top
// @version        3.0
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

    var sheet = document.createElement('style');
    sheet.innerHTML = ".profile-header-inner-overlay{display:none!important;}";
    document.body.appendChild(sheet);

    var screenname = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');

    var block = document.evaluate('//ul[@class="stats js-mini-profile-stats"]', document, null, 9, null).singleNodeValue;

    var litag1 = block.appendChild(document.createElement('li'));
    var litag2 = block.appendChild(document.createElement('li'));
    var litag3 = block.appendChild(document.createElement('li'));
    
    var favs = litag1.appendChild(document.createElement('a'));
    var lists = litag2.appendChild(document.createElement('a'));
    var recentimages = litag3.appendChild(document.createElement('a'));
	
	favs.setAttribute("class", "js-nav");
	favs.setAttribute("href", "https://twitter.com/" + screenname + "/favorites");
	favs.setAttribute('style', 'font-weight: bold;');
	favs.innerHTML = "Favs";
	favs.title = "Favorites";
  
	lists.setAttribute("class", "js-nav");
	lists.setAttribute("href", "https://twitter.com/" + screenname + "/lists");
	lists.setAttribute('style', 'font-weight: bold;');
	lists.innerHTML = "Lists";
	lists.title = "Lists";
	
	recentimages.setAttribute("class", "js-nav");
	recentimages.setAttribute("href", "https://twitter.com/" + screenname + "/media");
	recentimages.setAttribute('style', 'font-weight: bold;');
	recentimages.innerHTML = "Media";
	recentimages.title = "Recent Images";
