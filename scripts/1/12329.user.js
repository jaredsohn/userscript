// ==UserScript==
// @name           Zooomr Zipline Sidebar Plus
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Adds a couple of extra links in the Zipline sidebar
// @include        http://*.zooomr.com/zipline/
// @include        http://*.zooomr.com/zipline/*/
// @include        http://*.zooomr.com/
// @include        http://*.zooomr.com
// @include        http://*.zooomr.com/*
// @exclude        http://*.zooomr.com/zipline/public/
// ==/UserScript==
(function() {

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	// Add some styling
	addGlobalStyle(' li.Favs { background:transparent url(/images/silk/heart.png) no-repeat; } '
		+ ' li.Mail { background:transparent url(/images/silk/email_go.png) no-repeat; } '
		+ ' li.UserSets { background:transparent url(/images/silk/pictures.png) no-repeat; } '
		+ ' li.UserContacts { background:transparent url(/images/silk/group.png) no-repeat; } ');

	var yourURL = unsafeWindow.photos_url.replace('/photos/','/people/');
	var yourName = unsafeWindow.global_name;

	var divHello = document.evaluate(
		'//div[@class="hello"]'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
	if (divHello.snapshotLength > 0) {
		userURL = divHello.snapshotItem(0).getElementsByTagName('a')[0].href;
		userName = divHello.snapshotItem(0).getElementsByTagName('a')[0].title;
	} else {
		userURL = yourURL;
		userName = yourName;
	}
	
	var userTitle;
	if (userURL == yourURL) { // it's your zipline
		userTitle = 'Your';
	} else { 
		userTitle = userName + '\'s';
	}

	var divSideBar, eleList, listItem;
	// Get the sidebar
	divSideBar = document.evaluate(
		'//div[@id="sidebar"]'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
	// Get the ul in the sidebar
	if (divSideBar.snapshotLength > 0) {
		eleList = divSideBar.snapshotItem(0).getElementsByTagName('ul')[0];
	}
	
	if (eleList) {
		eleList.getElementsByTagName('li')[0].style.marginBottom = '0px';
		userPhotoURL = userURL.replace('/people/','/photos/');
		
		// *** Add SETS link ***
		listItem = eleList.insertBefore(
			document.createElement('li')
			, eleList.getElementsByTagName('li')[1] );
		listItem.setAttribute('class','UserSets');
		listItem.style.marginBottom = '5px';
		
		var aSets = listItem.appendChild(document.createElement('a'));
		aSets.innerHTML = userTitle + ' Sets'
		aSets.href = userPhotoURL + 'sets/'
		aSets.setAttribute('class','smalllink_dblue');
	
		// *** Add FAVOURITES link ***
		listItem = eleList.insertBefore(
			document.createElement('li')
			, eleList.getElementsByTagName('li')[2] );
		listItem.setAttribute('class','Favs');
		
		var aFavs = listItem.appendChild(document.createElement('a'));
		aFavs.innerHTML = userTitle + ' Favorites'
		aFavs.href = userPhotoURL + 'favorites/'
		aFavs.setAttribute('class','smalllink_dblue');
		
		// *** Add CONTACTS link ***
		console.log('userURL: ' + userURL);
		listItem = eleList.insertBefore(
			document.createElement('li')
			, eleList.getElementsByTagName('li')[3] );
		listItem.setAttribute('class','UserContacts');
		
		var aFavs = listItem.appendChild(document.createElement('a'));
		aFavs.innerHTML = userTitle + ' Contacts'
		aFavs.href = userURL + 'contacts/'
		aFavs.setAttribute('class','smalllink_dblue');
	
		if (userURL != yourURL) {
		
			// *** Add FANMAIL link ***
			var userURLName = userURL.substr(0,userURL.length-1);
			userURLName = userURLName.substr(userURLName.lastIndexOf('/')+1);
			
			listItem = eleList.insertBefore(
				document.createElement('li')
				, eleList.getElementsByTagName('li')[4] );
			listItem.setAttribute('class','Mail');
			listItem.style.marginBottom = '5px';
	
			var aFanMail = listItem.appendChild(document.createElement('a'));
			aFanMail.innerHTML = 'Send Fan Mail to ' + userTitle.replace('\'s','') ;
			aFanMail.href = '/fanmail/compose/to-' + userURLName + '/';
			aFanMail.setAttribute('class','smalllink_dblue');
		
		} else {
			listItem.style.marginBottom = '5px';
		}
	} 
	
})()