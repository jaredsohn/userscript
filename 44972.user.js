// ==UserScript==
// @name           facebook newsfeed shamwow
// @namespace      http://www.coreyappleby.com/
// @description    Removes messages posted by external Facebook apps, including irregular apps such as last.fm and google reader.
// @include        http://*.facebook.com/home.php*
// @version        0.4 - 23nd March 2009
// ==/UserScript==


// uncomment lines for apps you want to see
var exclude = [
//	"http://photos-a.ak.fbcdn.net/photos-ak-sf2p/v43/0/21370137768/app_2_21370137768_5212.gif", // flickr
//	"http://photos-c.ak.fbcdn.net/photos-ak-sf2p/v43/158/10473351746/app_2_10473351746_6696.gif", // digg
//	"http://photos-f.ll.facebook.com/photos-ll-sf2p/v43/65/8032453949/app_2_8032453949_600.gif", // picasa
//	"http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/234/10538587062/app_2_10538587062_8363.gif", //del.icio.us
//	"http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/184/8584254940/app_2_8584254940_4465.gif", // yelp
//	"http://photos-b.ll.facebook.com/photos-ll-sf2p/v43/13/12156593665/app_2_12156593665_9425.gif", // google reader
//	"http://photos-f.ll.facebook.com/photos-ll-sf2p/v43/97/32061240133/app_2_32061240133_2659.gif", // youtube
//	"http://photos-c.ak.fbcdn.net/photos-ak-sf2p/v43/26/14550581834/app_2_14550581834_8982.gif", // stumbleupon
//	"http://photos-e.ak.fbcdn.net/photos-ak-sf2p/v43/112/12565253092/app_2_12565253092_8453.gif", // last.fm
//	"http://photos-d.ak.fbcdn.net/photos-ak-sf2p/v43/219/11435051091/app_2_11435051091_6752.gif", // pandora
//	"http://photos-a.ll.facebook.com/photos-ll-sf2p/v43/124/24894543616/app_2_24894543616_9013.gif", // photobucket
//	"http://photos-c.ak.fbcdn.net/photos-ak-sf2p/v43/58/13686103426/app_2_13686103426_2898.gif", // hulu
//	"http://photos-c.ak.fbcdn.net/photos-ak-sf2p/v43/42/17404430442/app_2_17404430442_6690.gif", // blog/rss
];

// comment out any you don't want
var include = [
	"sx_post", // posted links
	"sx_photo", // posted photos
	"sx_video", // posted video
];

Array.prototype.inArray = function (value) {
	for (var i=0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};

var nodes = document.getElementsByClassName('UIIntentionalStory_Icon');
for (i = 0; i < nodes.length; i++) {
    var temp = nodes[i].getElementsByTagName('img');
    var story = temp[0]; // we only want the first img
	var n = story.className.split(' '); // facebook imgs have 2 classes
	if ( (!story.className.match('spritemap_icons') && !exclude.inArray(story.src)) || !include.inArray(n[1]) ) {
		while (!story.id.match('div_story_')) {
			story = story.parentNode;
		}
		story.style.display = 'none';
	}
}
