// ==UserScript==
// @name	    Friends Bookmark (Removes Facebook Ads) v1.1
// @author      Vishwesh Shetty
// @description Remove Ads from facebook and replaces it with your friends bookmark
// @include     https://apps.facebook.com/*
// @include     http://apps.facebook.com/*
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @exclude     http://lite.facebook.com/*
// ==/UserScript==



function alertST() {

	var friends = ['727046514','4'];
        var friendsUsername = ['ChrisHughes','moskov'];
	var innerText = '<strong><p style="color:#3B5998">My Bookmarks </p></strong>'
		var ad =  document.getElementById("pagelet_ego_pane_w");
		if(ad != null)
		{
			for (l = 0; l < friends.length; l++){
				innerText = innerText + '<a data-hover="tooltip" target="_blank" title="" class="link" data-hovercard="/ajax/hovercard/user.php?id='+friends[l]+'"  href="https://www.facebook.com/profile.php?id='+friends[l]+'"><img class="uiProfilePhoto uiProfilePhotoMedium img" src="https://graph.facebook.com/'+friends[l]+'/picture" alt=""></a>'
			}

for (l = 0; l < friendsUsername.length; l++){
				innerText = innerText + '<a  target="_blank" href="https://www.facebook.com/'+friendsUsername[l]+'"><img class="uiProfilePhoto uiProfilePhotoMedium img" src="https://graph.facebook.com/'+friendsUsername[l]+'/picture" alt=""></a>'
			}
			ad.innerHTML = innerText;
		}
		var ad2 =  document.getElementById("pagelet_ego_pane");
		if(ad2 != null)
		{
			
			for (l = 0; l < friends.length; l++){
				innerText = innerText + '<a target="_blank" data-hover="tooltip" target="_blank" title="" class="link" data-hovercard="/ajax/hovercard/user.php?id='+friends[l]+'"  href="https://www.facebook.com/profile.php?id='+friends[l]+'"><img class="uiProfilePhoto uiProfilePhotoMedium img" src="https://graph.facebook.com/'+friends[l]+'/picture" alt=""></a>'
			}

for (l = 0; l < friendsUsername.length; l++){
				innerText = innerText + '<a  href="https://www.facebook.com/'+friendsUsername[l]+'"><img class="uiProfilePhoto uiProfilePhotoMedium img" src="https://graph.facebook.com/'+friendsUsername[l]+'/picture" alt=""></a>'
			}
			ad.innerHTML = innerText;
		}
		window.setTimeout(alertST,15000);
		
}

alertST();