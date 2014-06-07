// ==UserScript==
// @name	    Hapus iklan di beranda FACEBOOK dan gantikan dgn DAFTAR TEMAN
// @author      Irwan D'bro
// @Hapus iklan di beranda FACEBOOK dan gantikan dgn DAFTAR TEMAN
// @include     https://apps.facebook.com/*
// @include     http://apps.facebook.com/*
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @exclude     http://lite.facebook.com/*
// ==/UserScript==



function alertST() {

	var friends = ['1228489695'];
	var innerText = '<strong><p style="color:#3B5998">DAFTAR TEMAN by Irwan D'bro </p></strong>'
		var ad =  document.getElementById("pagelet_ego_pane_w");
		if(ad != null)
		{
			for (l = 0; l < friends.length; l++){
				innerText = innerText + '<a data-hover="tooltip" target="_blank" title="" class="link" data-hovercard="/ajax/hovercard/user.php?id='+friends[l]+'"  href="https://www.facebook.com/profile.php?id='+friends[l]+'"><img class="uiProfilePhoto uiProfilePhotoMedium img" src="https://graph.facebook.com/'+friends[l]+'/picture" alt=""></a>'
			}
			ad.innerHTML = innerText;
		}
		var ad2 =  document.getElementById("pagelet_ego_pane");
		if(ad2 != null)
		{
			
			for (l = 0; l < friends.length; l++){
				innerText = innerText + '<a data-hover="tooltip" target="_blank" title="" class="link" data-hovercard="/ajax/hovercard/user.php?id='+friends[l]+'" href="https://www.facebook.com/profile.php?id='+friends[l]+'"><img class="uiProfilePhoto uiProfilePhotoMedium img" src="https://graph.facebook.com/'+friends[l]+'/picture" alt=""></a>'
			}
			ad2.innerHTML = innerText;
		}
		window.setTimeout(alertST,15000);
		
}

alertST();
 