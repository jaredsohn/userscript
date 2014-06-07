// ==UserScript==
// @name          	PhpBB Self Thanking AKA Goodlife Self Thanking
// @namespace     	http://codexian.com/projects/greasemonkey/
// @description   	Due to a bug in Thank module in PhpBB (I'm not sure what's it name ;D) , you can thanks your own posts!, this script make it easy to use that bug!
// @include       	http://www.good-life.ir/*
// @include       	http://good-life.ir/*
// ==/UserScript==


var allMyPost, thisPost;
allMyPost = document.evaluate(
	"//img[@alt='ويرايش پست']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < allMyPost.snapshotLength; i++) {
	thisPost = allMyPost.snapshotItem(i);
	var editHref = thisPost.parentNode.href;
	var mydiv = thisPost.parentNode.parentNode;
	var postID = editHref.substr( editHref.indexOf('p=') + 2 ); 
	var img = document.createElement('img');
	img.src="http://www.good-life.ir/styles/GLblue/imageset/thankposts.gif";
	img.alt="آدم از خود متشکری باشید :)";
	var link = document.createElement('a');
	link.href="./thanks.php?mode=thanks&p=" + postID;
	link.appendChild(img);
	mydiv.appendChild(link);
}