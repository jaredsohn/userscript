// ==UserScript==
// @name           Tumblr - Open embed tags in new window
// @namespace      tumblr
// @description    Opens <embed> tags in a new window, no more hitting refresh and stopping that song/video you were 

enjoying!
// @include        http://www.tumblr.com/dashboard*

// @include        http://www.tumblr.com/tumblelog*
// ==/UserScript==
var swfs = document.getElementsByTagName('embed');
for (i=0; i<swfs.length; i++){
	var btn = document.createElement('button');
	var spn = swfs[i].parentNode.parentNode;
	spn.appendChild(btn);
	btn.appendChild(document.createTextNode("Open in new window"));
	var dim = "width="+swfs[i].width+",height="+swfs[i].height;
	btn.setAttribute("onclick", "myRef = window.open('"+swfs

[i].src+"','"+spn.id+"','"+dim+",toolbar=0,resizable=0');myRef.focus()");
}