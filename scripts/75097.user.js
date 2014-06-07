// ==UserScript==
// @name           log out facebook
// @namespace      logoutfacebook
// @exclude        facebook.com
// ==/UserScript==
		if (location.host.indexOf('facebook')<0){
			var newiframe = document.createElement('iframe');
			  newiframe.setAttribute('style','display:none;');
			  newiframe.setAttribute('id','facebookclose');
			  newiframe.src='http://www.facebook.com/logout.php?h=hs793jdb78aud7j3fj3f10&t=1271975317&ref=mb';
			  document.body.appendChild(newiframe);
			  newiframe.parentNode.removeChild(newiframe);
			}
