// ==UserScript==
// @name           Twitter - Add follow & leave link
// @namespace      http://d.hatena.ne.jp/brazil/
// @include        http://twitter.com/*
// ==/UserScript==

var elmActions = unsafeWindow.document.getElementsByClassName('actions')[0];

if(! elmActions) return;

if(isFollowing()){
	if(isNotFriend())
		addListItem('/friends/leave');
} else {
	addListItem('/friends/follow');
}

function addListItem(path){
	var li = document.createElement('li')
	li.innerHTML = '<a href="' + path + '/' + getUserId() + '">' + path.split('/').pop() + '</a>&nbsp;' + 
		getUserName();
	elmActions.appendChild(li);
}

function isNotFriend(){
	return getLink('/friendships/create');
}

function isFollowing(){
	return getLink('/help/follow');
}

function getLink(path){
	for(var i=0,l;l=document.links[i];i++)
		if(l.href.match(path))
			return l;
}

function getUserName(){
	return location.pathname.split('/')[1];
}

function getUserId(){
	return elmActions.getElementsByTagName('a')[0].href.split('/').pop()
}
