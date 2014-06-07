// ==UserScript==
// @name           Plug DJ Test 3
// @namespace      http://www.plug.dj/
// @description    Test for plug.dj
// @include        http://www.plug.dj/
// @include        http://www.plug.dj/friendshipismagic/
// @include        http://www.plug.dj/video-game-music-1/
// @include        http://www.plug.dj/the-edm-basement/
// @include        http://www.plug.dj/drum-bass/
// @include        http://www.plug.dj/tugapie-dddd/

// ==/UserScript==

function addGlobalStyle(css){
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head){
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

//addGlobalStyle('#audience-canvas, #audience-canvas {background-image: max-height:0px;max-width:0px;}');

if (location.pathname.match('the-edm-basement')) {
addGlobalStyle('html{background: url("http://i.imgur.com/9kPye.jpg");');

} else if (location.pathname.match('friendshipismagic')) {
addGlobalStyle('html{background: url("http://fc08.deviantart.net/fs70/f/2012/149/4/9/plug_dj_skin_2_by_liamgoodyear-d51j3xs.jpg");');


addGlobalStyle('#logo, #logo {background-image: url("http://i.imgur.com/NJaZw.png");min-height:33px;min-width:131px;}'); //change the logo

addGlobalStyle('#create-room-button, #create-room-button {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); //change create room button

addGlobalStyle('#room-wheel, #room-wheel {background-image: max-height:0px;max-width:0px;}'); //hide the upper bg image (clashes with main bg)

addGlobalStyle('#user-points, #user-points {background-image: url("http://th09.deviantart.net/fs70/PRE/i/2012/115/f/c/shining_armor_cutie_mark_by_noxwyll-d4xjdre.png");maxheight:25px;background-size: 100% 100%;max-width:25px;}'); //cutie mark

addGlobalStyle('#user-fans, #user-fans {background-image: url("http://i.imgur.com/2trwR.png");maxheight:25px;max-width:25px;}'); //Yay

//addGlobalStyle('html{background: url("http://i.minus.com/i8d3ntlkKcBbp.png") no-repeat scroll center top #424242;'); //main background

addGlobalStyle('#button-dj-play.button-dj, #button-dj-play.button-dj {background-image: url("http://i.imgur.com/25rO8.png")!important;}');//join DJ button

addGlobalStyle('#button-dj-quit.button-dj, #button-dj-quit.button-dj {background-image: url("http://i.imgur.com/u9vac.png")!important;}');//quit DJ button

//if you want to change the font, uncomment this part and edit with the font you want, google "font css" or something like that for the codes.
//addGlobalStyle("* {" + "font-family:Cambria,'Times New Roman','Nimbus Roman No9 L','Freeserif',Times,serif; !important;" + "}"); //for font changing

//to change the DJ console, uncomment this and add your own custom URL. I've got no good ideas atm, but feel free to try stuff out :)
//addGlobalStyle('#dj-console, #dj-console {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); //change create room button

//join waitlist button, haven't made an image yet
//addGlobalStyle('#button-dj-waitlist-join.button-dj, #button-dj-waitlist-join.button-dj {background-image: url("http://i.imgur.com/25rO8.png")!important;}');

//user avatar in room, not sticking yet.
//addGlobalStyle('#button-user-avatar, #button-user-avatar {background-image: url("http://i.imgur.com/25rO8.png")!important;}');

//THE WORD REPLACEMENT CODE BELOW IS NOT MINE, IT BELONGS TO JOE SIMMONS

var words = {
// Syntax: 'Search word' : 'Replace word',
"points" : "BITS",
"USERS" : "PONIES",
"WOOT!" : "BROHOOF!",
"Now Playing" : "DJ-Pon3's listening to",
"":""};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}

} else if (location.pathname.match('video-game')) {
addGlobalStyle('html{background: url("http://img221.imageshack.us/img221/3297/wallpaper575034.jpg");');
} else if (location.pathname.match('drum-bass')) {
addGlobalStyle('html{background: url("http://fc04.deviantart.net/fs70/f/2011/187/7/7/space_v2_by_robinfroland-d3l7j25.png");');
} else if (location.pathname.match('tugapie-dddd')) {
addGlobalStyle('html{background: url("http://static.zerochan.net/full/31/49/1034981.jpg");');
} else if (location.pathname.match('partoftheroomname')) { //edit in a part of the room's name here
addGlobalStyle('html{background: url("url of the image here");'); //and the URL of the wallpaper you want here
} else { //this background's used for all other rooms not listed elsewhere
addGlobalStyle('html{background: url("http://fc08.deviantart.net/fs70/f/2012/149/4/9/plug_dj_skin_2_by_liamgoodyear-d51j3xs.jpg");');
}
