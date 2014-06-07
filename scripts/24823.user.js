// ==UserScript==
// @name           Neopets AdsRemover 1.3
// @namespace      Neofriends.net
// @description    This script will delete all the ads from Neopets.com!
// @include        http://*.neopets.com/*
// @include        http://neopets.com/*
// ==/UserScript==

document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
};

var hrDeleted = false;

var nickelodeon_bar = document.getElementsByClassName('brand-mamabar');
nickelodeon_bar[0].parentNode.removeChild(nickelodeon_bar[0]);

var ban = document.getElementById('ban');
ban.parentNode.removeChild(ban);

loc_path = new RegExp('index\.phtml');

var adboxes = document.getElementsByClassName('adBox.?');
for (var i = 0; i < adboxes.length; i++)
{
	adboxes[i].style.display = 'none';
	if (!loc_path.test(location.href))
	{
		if (adboxes[i].parentNode.tagName == 'TD')
		{
			adboxes[i].parentNode.parentNode.removeChild(adboxes[i].parentNode);
		}
	}
	adboxes[i].parentNode.removeChild(adboxes[i]);
}

var adwrappers_fixed = document.getElementsByClassName('ad_wrapper_fixed');
for (var i = 0; i < adwrappers_fixed.length; i++)
{
	adwrappers_fixed[i].style.display = 'none';
	adwrappers_fixed[i].parentNode.removeChild(adwrappers_fixed[i]);
}

var adwrappers = document.getElementsByClassName('ad_wrapper');
for (var i = 0; i < adwrappers.length; i++)
{
	adwrappers[i].style.display = 'none';
	adwrappers[i].parentNode.removeChild(adwrappers[i]);
}

var overlays = document.getElementsByClassName('footOverlay');
for (var i = 0; i < overlays.length; i++)
{
	overlays[i].style.display = 'none';
}

var hrs = document.getElementsByClassName('content')[0].getElementsByTagName('hr');
hrs[hrs.length - 1].style.display = 'none';