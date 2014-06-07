// ==UserScript==
// @name        Sound of Violence - Youtube
// @namespace   http://userscripts.org/users/delapouite
// @description Add Youtube search links in reviews
// @include     http://www.soundofviolence.net/articles/album/*
// @include     http://www.soundofviolence.net/articles/single/*
// @version     1
// ==/UserScript==

var createYoutubeLink = function(artist, album) {
	artist = artist.trim();
	album = album.trim();
	var youtubeLink = document.createElement('a');
	youtubeLink.href = 'http://www.youtube.com/results?search_query=' + artist + ' ' + album;
	youtubeLink.textContent = 'Youtube';
	youtubeLink.style.marginLeft = '1em';
	return youtubeLink;
};

// list page
var reviewsItems = document.getElementsByClassName('reviews-item');
Array.prototype.forEach.call(reviewsItems, function (reviewItem) {
	var infos = reviewItem.querySelector('a').textContent.split('-');
	reviewItem.appendChild(createYoutubeLink(infos[0], infos[1]));
});

// article page
var corpsInfos = document.getElementsByClassName('corps-infos')[0];
if (corpsInfos) {
	var artist = document.getElementsByClassName('corps-infos-groupe')[0].textContent;
	var album = document.getElementsByClassName('corps-infos-titre')[0].textContent;
	corpsInfos.appendChild(createYoutubeLink(artist, album));
}