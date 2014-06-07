// ==UserScript==
// @name           SimilarFav
// @namespace      www.madin.jp
// @description    同じ post を fav している twitter ユーザ、或いは自分を頻繁に fav しいるユーザを favotter から探し出す
// @include        http://favotter.matope.com/user.php?*user=*
// ==/UserScript==

var FAV_COUNT_THRESHOLD = 2; //共通 fav 数がこれ以上のユーザだけを表示
var FAV_PAGE_ONLY = false; //mode=fav のページのみで発動

var TwitterUser = function (id, imgSrc) {
	this.id = id;
	this.imgSrc = imgSrc;
	this.favCount = 0;
};
TwitterUser.prototype.increment = function () {
	this.favCount ++;
};
TwitterUser.prototype.getLinks = function () {
	var div = document.createElement('DIV');
	var icon = document.createElement('IMG');
	var label = document.createElement('SPAN');
	var linkTw = document.createElement('A');
	var linkFv = document.createElement('A');
	
	icon.style.width = '24px';
	icon.style.height = '24px';
	icon.src = this.imgSrc;

	label.innerHTML = this.id + '(' + this.favCount + ')';

	linkTw.innerHTML = ' Tw ';
	linkTw.href = 'http://twitter.com/' + this.id;
	linkFv.innerHTML = ' Fv ';
	linkFv.href = 'http://favotter.matope.com/user.php?user=' + this.id + '&mode=fav';

	div.appendChild(icon);
	div.appendChild(label);
	div.appendChild(linkTw);
	div.appendChild(linkFv);

	return div;
};

{
	if (FAV_PAGE_ONLY && !(new RegExp('mode=fav')).test(location.href)) return;
	var selfId = null;
	location.href.replace(new RegExp('user=[^&]+'),function(str){selfId = str.replace('user=','')});
	var imgs = document.getElementsByTagName('IMG');
	var userMap = new Array();
	for (var i=0, l=imgs.length; i<l; i++) {
		var img = imgs[i];
		if (!'fav_icon '==(img.className)) continue;
		if (!userMap[img.alt]) userMap[img.alt] = new TwitterUser(img.alt, img.src);
		userMap[img.alt].increment();
	}
	var userList = new Array();
	for (var key in userMap) {
		var user = userMap[key];
		if (user.favCount >= FAV_COUNT_THRESHOLD && user.id != selfId) 
			userList.push(user);
	}
	userList.sort(function (a,b) {return b.favCount - a.favCount});
	var area = document.createElement('DIV');
	for (var i=0, l=userList.length; i<l; i++) {
		area.appendChild(userList[i].getLinks());
	}
	area.style.position = 'absolute';
	area.style.left = '0px';
	area.style.top = '0px';
	area.style.backgroundColor = 'white';
	document.body.appendChild(area);

}