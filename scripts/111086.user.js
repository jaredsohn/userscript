// ==UserScript==
// @name           CloudRapido
// @namespace      http://userscripts.org/users/
// @include        apps.facebook.com/cloudcrowd*
// @include        *.cloudcrowd.com/*
// ==/UserScript==
function getElementByClass(theClass, tagName) {
	var allHTMLTags = new Array();
	var classthing = new Array();
	var allHTMLTags=document.getElementsByTagName(tagName);
	for (i=0; i<allHTMLTags.length; i++) {
		if (allHTMLTags[i].className==theClass) {
			classthing.push(allHTMLTags[i]);
		}
	}
	return classthing;
}

setInterval(function(){
	if (document.getElementById('photo_acceptable_yes').checked != true && document.getElementById('photo_acceptable_no').checked != true){
		document.getElementById('photo_acceptable_yes').checked = true;
		document.getElementById('about_experience_acceptable_yes').checked = true;
		var a=getElementByClass('list', 'ul');
		for (i=0;i<a.length;i++){
			a[i].style.display = 'none';
		}
		var a=getElementByClass('warning', 'p');
		for (i=0;i<a.length;i++){
			a[i].style.display = 'none';
		}
	}
}, 2000)