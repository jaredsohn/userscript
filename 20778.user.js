// ==UserScript==

// @name           YouTube RSS Feed

// @namespace      ytrssfeedscpt

// @description    a script to add rss feed links to the address bar for users and tag searches

// @include        http://www.youtube.com/profile?user=*

// @include        http://youtube.com/profile?user=*

// @include        http://www.youtube.com/user/*

// @include        http://youtube.com/user/*

// @include        http://www.youtube.com/results?search_query=*&*search=tag

// @include        http://youtube.com/results?search_query=*&*search=tag

// ==/UserScript==



function YT() {

	this.getType = getType;

	this.getUserName = getUserName;

	this.setUserFeed = setUserFeed;

	this.setTagFeed = setTagFeed;

	this.appendRSS = appendRSS;

	return true;

}



function getUserName () {

	title = this.title;

	title = title.substr(title.indexOf('-')+2);

	this.user = title.substr(0,title.indexOf('\''));

}



function getType () {

	this.type = 'user';

	this.title = document.title.toString();

	this.location = document.location.toString();

	this.location = this.location.substr(this.location.indexOf('?')+1);

	this.location = this.location.split('&');

	pt = Array();

	for (n in this.location) {

		pt.push(this.location[n].split('='));

		if (pt[n][0] == 'search' && pt[n][1] == 'tag') {

			this.type = 'tag';

			this.tag = pt[0][1];

			return true;

		}

	}

	return true;

}



function setUserFeed() {

	this.getUserName();

	url = 'feed://www.youtube.com/rss/user/'+this.user+'/videos.rss';

	title = this.user + '\'s videos at YouTube';

	this.appendRSS(url,title);

}



function appendRSS(url,title) {

	rss = document.createElement('link');

	rss.setAttribute('rel','alternate');

	rss.setAttribute('type','application/rss+xml');

	rss.setAttribute('title',title);

	rss.setAttribute('href',url);

	var head = document.getElementsByTagName('div');

	head[0].appendChild(rss);

}



function setTagFeed() {

	url = 'feed://www.youtube.com/rss/tag/'+this.tag+'.rss';

	title = 'videos tagged '+this.tag+' at YouTube';

	this.appendRSS(url,title);

}



var yt = new YT();

yt.getType();

if (yt.type == 'user') {

	yt.setUserFeed();

} else {

	yt.setTagFeed();

}
