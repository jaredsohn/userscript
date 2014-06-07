// ==UserScript==
// @name           Facebook Pet Pupz PetIt
// @namespace      http://userscripts.org/users/64479
// @description    Autopets pupz.
// @version        0.1
// @date           2008-11-22
// @creator        Natalia Harrallo
// @include        http://apps.facebook.com/petpupz/view.php?viewingid=*
// ==/UserScript==

Timeout = setTimeout (function() {
	petbuttons = document.evaluate("//input[@value=' Go! ']", document, null,7, null); 
	petbutton = petbuttons.snapshotItem(0);
	if(petbutton!=null) {
		petbutton.click();
	}
	else {
		window.location = "http://apps.facebook.com/petpupz/view.php?viewingid=" + new String (Math.ceil(Math.random() * 2000000)).substring (2,11)
	}
},3000)();