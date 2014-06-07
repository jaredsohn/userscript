// ==UserScript==
// @name           Zooomr Buddy Plus
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Adds a shortcut menu to a user avatar/buddy icon. Works on photo pages, comments, group threads, contacts, and fanmail.
// @include        http://*.zooomr.com/photos/*/*/
// @include        http://*.zooomr.com/photos/*/
// @include        http://*.zooomr.com/groups/*
// @include        http://*.zooomr.com/fanmail/*
// @include        http://*.zooomr.com/people/*/contacts/
// ==/UserScript==
(function() {

	/******* Function to add Styles *******/
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	// Styling
	addGlobalStyle(' a.block { display:block; text-align:left; margin:2px 4px; padding:1px 4px; font-size: 11px; text-decoration:none !important;  } '
		+ ' div.buddy_dropdown { position:absolute; z-index:99; overflow:hidden; background-color:white;} '
		);
		
	function hideBuddyMenu(e) {
		if (e.target.id != 'personmenu_photos_link'
			&& e.target.id != 'personmenu_sets_link'
			&& e.target.id != 'personmenu_favs_link'
			&& e.target.id != 'personmenu_zipline_link'
			&& e.target.id != 'personmenu_profile_link'
			&& e.target.id != 'personmenu_contacts_link'
			&& e.target.id != 'personmenu_mail_link'
			&& e.target.id != 'personmenu_relationship_link'
			) {
			
			unsafeWindow.Element.hide(buddyDiv);
		}
	}
	
	function showBuddyMenu(e) {
		if (e.target.tagName == 'IMG') {
			userURLName = e.target.getAttribute('userURLName');
						
			buddyDiv.getElementsByTagName('a')[0].href = '/photos/' + userURLName + '/';
			buddyDiv.getElementsByTagName('a')[1].href = '/photos/' + userURLName + '/sets/';
			buddyDiv.getElementsByTagName('a')[2].href = '/photos/' + userURLName + '/favorites/';
			buddyDiv.getElementsByTagName('a')[3].href = '/zipline/' + userURLName + '/';
			buddyDiv.getElementsByTagName('a')[4].href = '/people/' + userURLName + '/';
			buddyDiv.getElementsByTagName('a')[5].href = '/people/' + userURLName + '/contacts/';
			buddyDiv.getElementsByTagName('a')[6].href = '/fanmail/compose/to-' + userURLName + '/';
			buddyDiv.getElementsByTagName('a')[7].href = '/people/' + userURLName + '/relationship/';
			
			// Hook on grandparent if the parent node is an alink
			if (e.target.parentNode.tagName == 'A') {
				eleHook = e.target.parentNode.parentNode;
				e.target.parentNode.setAttribute('onClick','javascript: return false;');
			} else {
				eleHook = e.target.parentNode;
			}
			eleHook.appendChild(buddyDiv);
			unsafeWindow.Element.show(buddyDiv);
		}
	}
	
	// Init Menu Div
	var buddyDiv= document.createElement("div");
	buddyDiv.id = "buddy_dropdown";
	buddyDiv.setAttribute("class","buddy_dropdown");
	buddyDiv.innerHTML = ''
		+ '<a class="block" id="personmenu_photos_link">Photos</a>'
		+ '<a class="block" id="personmenu_sets_link">Sets</a>'
		+ '<a class="block" id="personmenu_favs_link">Favorites</a>'
		+ '<a class="block" id="personmenu_zipline_link">Zipline</a>'
		+ '<a class="block" id="personmenu_profile_link">Profile</a>'
		+ '<a class="block" id="personmenu_contacts_link">Contacts</a>'
		+ '<a class="block" id="personmenu_mail_link">Send FanMail</a>'
		+ '<a class="block" id="personmenu_relationship_link">Relationship</a>'
		+ '';
	
	var displayHint = document.createElement("div");
	displayHint.setAttribute('id','buddy_dropdown_hint');
	displayHint.setAttribute('class','buddy_dropdown_hint');
	displayHint.innerHTML = '<img src="/images/silk/bullet_toggle_plus.png">';
	
	document.addEventListener('mousedown', hideBuddyMenu, false);
	
	// **************** PAGE AVATARS HOOKS ****************
	var customAvatarLinks = document.evaluate(
		"//a[contains(@href,'/photos/')]/img[contains(@src,'/avatar')]"
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
		
	bindAvatars(customAvatarLinks);
	
	function bindAvatars(allAvatarLinks) {
		if (allAvatarLinks && allAvatarLinks.snapshotLength > 0) {
			//GM_log('FOUND ' + allAvatarLinks.snapshotLength + ' avatars');
			for (var i = 0; i < allAvatarLinks.snapshotLength; i++) {
				elementRef = allAvatarLinks.snapshotItem(i);
				
				userPhotoURL = elementRef.parentNode.href;	// alink
				userURLName = userPhotoURL.substr(0,userPhotoURL.length-1);
				userURLName = userURLName.substr(userURLName.lastIndexOf('/')+1);
				
				// ignore the really tiny ones e.g. in the youcell
				if (elementRef.width >= 25 || elementRef.width == '') {	// default avatars have no set width
					
					//if (userPhotoURL.indexOf(unsafeWindow.photos_url) < 0) {
						elementRef.setAttribute('userURLName',userURLName);
						elementRef.addEventListener('click', showBuddyMenu, false);
						
						displayHintClone = displayHint.cloneNode(true);
						displayHintClone.firstChild.setAttribute('userURLName',userURLName);
						displayHintClone.firstChild.addEventListener('click', showBuddyMenu, false);
						
						if (elementRef.width == 25) {
							displayHintClone.setAttribute('style','text-align: left; float: left; ');
						} else {
							displayHintClone.setAttribute('style','text-align: center; width: 50px; ');
						}
						
						elementRef.parentNode.parentNode.insertBefore(displayHintClone, elementRef.parentNode.nextSibling);
					//}
				}
			}
		} else {
			//GM_log('0 avatars found');
		}
	}
	
})()