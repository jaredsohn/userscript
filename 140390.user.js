// ==UserScript==
// @name           Remove arabic from facebook
// @version        1.0
// @description    See name
// @author         Jo De Boeck
// @include        http*://www.facebook.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

console.log('It loads');
var filterTheseFFBS = [];
var i;
var arabic = "ضصثقفغعهخحشسيبلاتنمئءؤرﻻىة";
for (i = 0; i < arabic.length; i += 1) {
    filterTheseFFBS.push(arabic[i]);
}

var hasArabic = function (content) {
	var j;
	for (j = 0; j < filterTheseFFBS.length; j += 1) {
        if (content.text().indexOf(filterTheseFFBS[j]) >= 0) {
            console.log("Kicking story :)");
            return true;
        }
    }
    return false;
};

var validateClassess = function (story, classess) {
	$.each(classess, function (idx, klass) {
		var content = $(story).find(klass);
		if (hasArabic(content)){
			$(story).remove();
		}
	});
};

var dofilter = function () {
    var stories = $('.uiStreamStory');
    console.log('Stories', stories);
    $.each(stories, function(idx, story)
    {
		console.log('Story', story);
		validateClassess(story, ['.userContent', '.uiAttachmentTitle']);
	});
    setTimeout(dofilter, 2000);
};

$(document).ready(dofilter);
