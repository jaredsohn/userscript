// ==UserScript==
// @name           Facebook - Cute Catz
// @description    View a cat to pet, and it will continue petting every pet after him.
// @include        http://apps.facebook.com/cutecatz/*
// @include       
// @version        1.0
// ==/UserScript==
locate = location.href.split('=')[0]
checkurl = "http://apps.facebook.com/cutecatz/view.php?viewingid"
if (locate == checkurl.split(' ')[0] || locate == checkurl.split(' ')[1] || locate == checkurl.split(' ')[2]) {
	id = parseInt(location.href.split('=')[1])
	x = document.getElementsByName('fusstypenum')
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