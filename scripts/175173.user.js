// ==UserScript==
// @name        ETI Animated Avatars
// @namespace   pendevin
// @description animates gifs in avatars
// @include     http://endoftheinter.net/inboxthread.php?*
// @include     http://boards.endoftheinter.net/showmessages.php?*
// @include     https://endoftheinter.net/inboxthread.php?*
// @include     https://boards.endoftheinter.net/showmessages.php?*
// @version     1
// ==/UserScript==

//livelinks compatiblity
//calls the function on each message-container in a document, including ones added by livelinks
function livelinks(func,args){
	if(args==undefined)
		args=null;
	//run the function on the message-containers currently on the page
	var containers=document.getElementsByClassName('message-container');
	for(var i=0;i<containers.length;i++)
		func(containers[i],args);
	//work with livelinks
	document.addEventListener('DOMNodeInserted',function(e){
			if(e.target.firstChild&&e.target.firstChild.className=='message-container'){
				var containers=e.target.getElementsByClassName('message-container');
				for(var i=0;i<containers.length;i++)
					func(containers[i],args);
			}
		},false);
	//work with postmsg.php, if your script is looking for anything but the message, it won't find it here
	if(location.pathname=='/postmsg.php')
		func(document.getElementsByClassName('message')[0].parentNode,args);
}

//sends the avatar data off to extension land
function animate(e){
	var pic=e.target;
	if(pic.className!='avatar'&&pic.parentNode.className=='img-placeholder')
		pic.src=pic.src.replace(/\/t\//,'/n/').replace(/\.jpg$/,'.gif');
}

//wait for avatars to load
function avatarListener(place){
	var userpic=place.getElementsByClassName('userpic-holder')[0];
	if(userpic.firstChild&&userpic.firstChild.tagName=='A'&&userpic.firstChild.href.substr(-4)=='.gif')
		userpic.firstChild.firstChild.addEventListener('DOMNodeInserted',animate,false);
}

livelinks(avatarListener);