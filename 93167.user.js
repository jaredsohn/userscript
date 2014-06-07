// ==UserScript==
// @name           Favstar - View user on Twitter Plus
// @namespace      http://userscripts.org/users/130678
// @description    Make Favstar more usable.
// @include        http://favstar.fm/*
// @include        http://de.favstar.fm/*
// @include        http://es.favstar.fm/*
// @include        http://ja.favstar.fm/*
// @require        https://gist.github.com/raw/3238/bc5f6bd5fb64b1baf6aa17423735a1816f36b358/dollarX.js
// ==/UserScript==

function appendLink(){
	this.parentNode.insertBefore(viewUserOnTwitter, this.nextSibling);
	this.nextSibling.href = 'http://twitter.com/' + this.title;
	this.nextSibling.title = 'View ' + this.title + ' on Twitter.com';
}

function removeLink(evt){
	if(evt.relatedTarget != viewUserOnTwitter){
		viewUserOnTwitter.parentNode.removeChild(viewUserOnTwitter);
	}
}

function addListener(node){
	node.addEventListener('mouseover', appendLink, false);
	node.addEventListener('mouseout', removeLink, false);
}

var viewUserOnTwitter = document.createElement('a');
viewUserOnTwitter.textContent = 'Twitter';
viewUserOnTwitter.className = 'view_user_on_twitter';
viewUserOnTwitter.style.margin = '29px 0 0 -20px';

$X('//div[@class="avatarList"]').forEach(function(node){
	node.addEventListener('DOMNodeInserted', function(evt){
		if (evt.target.className == 'avatar'){
			addListener(evt.target);
		}
	}, false);
});

$X('//a[@class="avatar"]').forEach(addListener);
