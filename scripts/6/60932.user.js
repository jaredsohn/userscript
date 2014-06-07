// ==UserScript==
// @author         rikuo
// @name           changed to the Zombie
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    All icons of twitter are changed to the Zombie.
// @include        http://twitter.com/*
// @include        http://favotter.matope.com/*
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/following*
// @exclude        http://twitter.com/followers*
// @exclude        http://twitter.com/*/following*
// @exclude        http://twitter.com/*/followers*
// ==/UserScript==

var l = location.href;
var _doc = document;
var rep;
var enable = 1;
var orgnImg = [],query = [];

var changeZombie = function (doc){
	var users = xpath(doc, query[enable]);
	if(users.snapshotLength){
		for(var i=0,ul = users.snapshotLength; i < ul; ++i){
			var img = users.snapshotItem(i),num;
			var username = img.parentNode.href.replace(rep ,'');
			if(enable){
				if(username.length == 0){
					num=0;
				}else{
					var text = username.charAt(0).toLowerCase();
					num = ( text.charCodeAt() + username.length ) % 7 ;
				}
				if(!orgnImg[username])orgnImg[username] = img.src;
				img.src = 'http://static.twitter.com/images/special/new_default_avatar_'+num+'.png';
			}else{
				if(orgnImg[username])img.src = orgnImg[username];
			}
		}
	}
}

if(l.match(/^http:\/\/twitter.com\//i)){

	if(!e('timeline'))return;

	var section = e('timeline').parentNode;
	query[1] = 'descendant::span[contains(concat(" ",@class," ")," author ")]/a/img[not(contains(@src,"http://static.twitter.com/images/special/new_default_avatar_"))]';
	query[0] = 'descendant::span[contains(concat(" ",@class," ")," author ")]/a/img[contains(@src,"http://static.twitter.com/images/special/new_default_avatar_")]';
	rep = /^http:\/\/twitter.com\//i ;

	section.addEventListener('DOMNodeInserted',function(evt){
		var li = evt.target;
		if(enable && li.className && li.className.match(/(mine|hentry)/i)){
			changeZombie(li);
		}
	}, false);

	section.addEventListener('DOMNodeRemoved',function(evt){
		if(enable && evt.target.parentNode.id.match(/heading/i)){
			changeZombie(e('timeline'));
		}
	}, false);

	changeZombie(e('timeline'));

}else{

	query[1] = 'descendant::img[contains(concat(" ",@class," ")," user_icon ") or contains(concat(" ",@class," ")," fav_icon ") and not(contains(@src,"http://static.twitter.com/images/special/new_default_avatar_"))]';
	query[0] = 'descendant::img[contains(concat(" ",@class," ")," user_icon ") or contains(concat(" ",@class," ")," fav_icon ") and contains(@src,"http://static.twitter.com/images/special/new_default_avatar_")]';

	rep = /.+user.php\?user=/;

	changeZombie(e('timeline'));

	if(window.AutoPagerize) {
		changeZombieIcon();
	}else{
		window.addEventListener('GM_AutoPagerizeLoaded', changeZombieIcon ,false);
	}

}

_doc.body.addEventListener('dblclick',function(evt){
		(enable) ? enable = 0 : enable = 1;
	changeZombie(e('timeline'));
}, false);


function e(id){
	return _doc.getElementById(id);
}
function xpath(context, query){
	return _doc.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	)
}

function changeZombieIcon(){
	window.AutoPagerize.addFilter(function(docs){
		if(enable)docs.forEach(changeZombie);
	});
}
