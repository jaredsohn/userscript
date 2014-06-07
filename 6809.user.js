// ==UserScript==
// @name			Youtube: Edit Button Into Link
// @namespace		mailto:ch_xxvi@yahoo.com.hk
// @description		Change the [Edit Video Info] button into link on "My Video" page.
// @include		http://www.youtube.com/my_videos
// @creator		XXVi
// ==/UserScript==


var inputs = document.getElementsByTagName('input');
for (i=0; i<inputs.length; i++) {
	if (inputs[i].type=='button' && inputs[i].name=='Edit Video') {
		tmp = inputs[i].getAttribute('onclick');
		vid = tmp.substr(22,tmp.length-22-3);
		newLink = document.createElement('a');
		newLink.href = "/my_videos_edit?video_id="+vid;
		newBtn = inputs[i].cloneNode(false);
		newBtn.removeAttribute('onclick');
		newLink.appendChild(newBtn);
		inputs[i].parentNode.replaceChild(newLink, inputs[i]);
	}
}
