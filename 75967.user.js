// ==UserScript==
// @name		Youtube: Disable pop-out video player
// @namespace		sabbour
// @description		Disables the pop-out video player
// @include		http://www.youtube.com/
// @creator		sabbour
// ==/UserScript==


var hrefs= document.getElementsByTagName('a');
for (i=0; i<hrefs.length; i++) {
	if (hrefs[i].hasAttribute('onclick')) {
		tmp = inputs[i].getAttribute('onclick');
alert(tmp);
		if(tmp.IndexOf('ip_showYoutubePreview')>=0){
			newLink = hrefs[i].cloneNode(false);
			newLink.removeAttribute('onclick');
			hrefs[i].parentNode.replaceChild(newLink, hrefs[i]);
		}
	}
}