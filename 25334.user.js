// ==UserScript==
// @name           Facebook - Cute Catz & Pet Pupz bot
// @namespace      http://userscripts.org/scripts/show/25334
// @description    Enter a cat or puppy to pet, and it will continue petting every pet after him.
// @include        http://apps.facebook.com/cutecatz/*
// @include        http://apps.facebook.com/petpupz/*
// @version        1.0
// ==/UserScript==
locate = location.href.split('=')[0]
checkurl = "http://apps.facebook.com/cutecatz/view.php?viewingid http://apps.facebook.com/petpupz/view1.php?viewingid http://apps.facebook.com/petpupz/view.php?viewingid"
if (locate == checkurl.split(' ')[0] || locate == checkurl.split(' ')[1] || locate == checkurl.split(' ')[2]) {
	id = parseInt(location.href.split('=')[1])
	x = document.getElementsByName('fussitem')
	if (x.length && !(x[0].hasAttribute('disabled'))) {
		g = Math.round(Math.random() * 4)
		x[g].click()
		y = document.getElementsByTagName('form')
		if (y.length == 2)
			y[1].childNodes[y[1].childNodes.length - 2].click()
	}
	else
		location.href = locate + '=' + (id + 1)
}