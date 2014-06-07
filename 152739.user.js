// ==UserScript==
// @name        ETI Show Imagenames
// @namespace   pendevin
// @description Puts imagenames in a tooltip when you hover over images and thumbnails
// @include     http://endoftheinter.net/postmsg.php*
// @include     http://endoftheinter.net/inboxthread.php*
// @include     http://boards.endoftheinter.net/postmsg.php*
// @include     http://boards.endoftheinter.net/showmessages.php*
// @include     https://endoftheinter.net/postmsg.php*
// @include     https://endoftheinter.net/inboxthread.php*
// @include     https://boards.endoftheinter.net/postmsg.php*
// @include     https://boards.endoftheinter.net/showmessages.php*
// @version     1
// ==/UserScript==

//livelinks compatiblity
//calls the function on each message-container in a document, including ones added by livelinks
function livelinks(func){
	//run the function on the message-containers currently on the page
	var containers=document.getElementsByClassName('message-container');
	for(var i=0;i<containers.length;i++)
		func(containers[i]);
	//work with livelinks
	document.addEventListener(
		'DOMNodeInserted',
		function(e){
			if(e.target.firstChild&&e.target.firstChild.className=='message-container'){
				var containers=e.target.getElementsByClassName('message-container');
				for(var i=0;i<containers.length;i++)
					func(containers[i]);
			}
		},
		false
	);
	//work with postmsg.php, if your script is looking for anything but the message, it won't find it here
	if(location.pathname=='/postmsg.php')
		func(document.getElementsByClassName('message')[0].parentNode);
}

function titular(message){
	var imgDivs=message.getElementsByClassName('imgs');
	for(var i=0;i<imgDivs.length;i++){
		var imgs=imgDivs[i].getElementsByTagName('a');
		for(var j=0;j<imgs.length;j++){
			imgs[j].title=decodeURIComponent(imgs[j].href.substring(imgs[j].href.lastIndexOf('/')+1));
		}
	}
}

livelinks(titular);

//avatars need a special case apparently
document.addEventListener('DOMNodeInserted',function(e){
	if(e.target.tagName=='IMG'&&(e.target.parentNode.parentNode.className=='userpic-holder'||e.target.parentNode.parentNode.parentNode.className=='userpic-holder'))
		e.target.title=decodeURIComponent(e.target.src.substring(e.target.src.lastIndexOf('/')+1));
},false);