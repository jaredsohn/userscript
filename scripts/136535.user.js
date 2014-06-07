// ==UserScript==
// @name           Plug DJ Test 2
// @namespace      http://www.plug.dj/
// @description    Test for plug.dj
// @include        http://www.plug.dj/
// @include        http://www.plug.dj/friendshipismagic/*
// @include        http://www.plug.dj/video-game-music-1/
// @include        http://www.plug.dj/the-edm-basement/
// @include        http://www.plug.dj/drum-bass/
// @include        http://www.plug.dj/tugapie-dddd/
// @include        http://www.plug.dj/bass-music-garage-dubstep-etc/
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

//===when adding a new room you must copy one of the "else if" scripts and past it above the "else" script. you can not put them below 
//the "else" script because that is the end of the code thread. replace the name of the 
//newly pasted room with the http name of the room not the name that is on the page.
//for example the Drum & Bass rooms name is d&b but on the http name its Drum-Bass. 
//second step is to go to the top and make a new // @include123456789<link here> 10 spaces after the //. have fun.

if (location.pathname.match('the-edm-basement')) {
addGlobalStyle('html{background: url("http://i.imgur.com/9kPye.jpg");');

//========================================================================================

} else if (location.pathname.match('drum-bass')) {
addGlobalStyle('html{background: url("http://art.ngfiles.com/images/148/r0bot_drum-and-bass.jpg");');

//========================================================================================

} else if (location.pathname.match('friendshipismagic')) {
addGlobalStyle('html{background: url("http://i.minus.com/ibmqCYYRKQgrV3.jpg");background-size: cover;background-repeat: no-repeat;min-height:100%;');

//=======================================================================================

} else if (location.pathname.match('video-game')) {
addGlobalStyle('html{background: url("http://img221.imageshack.us/img221/3297/wallpaper575034.jpg");');

//=======================================================================================

} else if (location.pathname.match('bass-music-garage-dubstep-etc')) {
addGlobalStyle('html{background: url("http://fc05.deviantart.net/fs71/f/2010/246/8/d/drum_and_bass_by_zkappa-d2xyqlr.png");');

//=======================================================================================

} else if (location.pathname.match('tugapie-dddd')) {
addGlobalStyle('html{background: url("http://static.zerochan.net/full/31/49/1034981.jpg");');

//=======================================================================================

} else if (location.pathname.match('partoftheroomname')) { //edit in a part of the room's name here
addGlobalStyle('html{background: url("http://fc08.deviantart.net/fs70/f/2012/149/4/9/plug_dj_skin_2_by_liamgoodyear-d51j3xs.jpg");background-size: cover;background-repeat: no-repeat;min-height:100%;');

//=====do not change this last one=======================================================

} else { //this background's used for all other rooms not listed elsewhere
addGlobalStyle('html{background: url("http://fc08.deviantart.net/fs70/f/2012/149/4/9/plug_dj_skin_2_by_liamgoodyear-d51j3xs.jpg");');
}


//change the logo
addGlobalStyle('#logo, #logo {background-image: url("http://i.imgur.com/NJaZw.png");min-height:33px;min-width:131px;}');

//change create room button
addGlobalStyle('#create-room-button, #create-room-button {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); 

//hide the upper bg image (clashes with main bg)
addGlobalStyle('#room-wheel, #room-wheel {background-image: max-height:0px;max-width:0px;}');

//changes the "points" icon
addGlobalStyle('#user-points, #user-points {background-image: url("http://th09.deviantart.net/fs70/PRE/i/2012/115/f/c/shining_armor_cutie_mark_by_noxwyll-d4xjdre.png");max-height:27px;background-size: 100% 100%;max-width:18px;}');

//changes the "fans" icon
addGlobalStyle('#user-fans, #user-fans {background-image: url("http://i.imgur.com/2trwR.png");max-height:25px;max-width:20px;}'); 

//join DJ button
addGlobalStyle('#button-dj-play.button-dj, #button-dj-play.button-dj {background-image: url("http://i.imgur.com/25rO8.png")!important;}');

//quit DJ button
addGlobalStyle('#button-dj-quit.button-dj, #button-dj-quit.button-dj {background-image: url("http://i.imgur.com/u9vac.png")!important;}');

//join waitlist button
addGlobalStyle('#button-dj-waitlist-join.button-dj, #button-dj-waitlist-join.button-dj {background-image: url("http://i.imgur.com/tyDif.png")!important;}');

//leave waitlist button
addGlobalStyle('#button-dj-waitlist-leave.button-dj, #button-dj-waitlist-leave.button-dj {background-image: url("http://i.imgur.com/pYUJE.png")!important;}');

//changes the avatar image in the plug.dj lobby
addGlobalStyle('#user-image, #user-image {background-image: url("http://www.bronyland.com/wp-content/uploads/2011/09/fluttershy_avatar_067.png")!important;background-size:50px 50px!important;}');

//changes the avatar image in the plug.dj rooms 
addGlobalStyle('#button-user-avatar, #button-user-avatar {background-image: url("http://www.bronyland.com/wp-content/uploads/2011/09/fluttershy_avatar_067.png")!important;background-size:50px 50px!important;}');

//if you want to change the font, uncomment this part and edit with the font you want, google "font css" or something like that for the codes.
//addGlobalStyle("* {" + "font-family:Cambria,'Times New Roman','Nimbus Roman No9 L','Freeserif',Times,serif; !important;" + "}"); //for font changing

//to change the DJ console, uncomment this and add your own custom URL. I've got no good ideas atm, but feel free to try stuff out :)
//addGlobalStyle('#dj-console, #dj-console {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); //change create room button

//changes the room background (stretches image to window, uncomment to enable)
//addGlobalStyle('html{background: url("http://dl.dropbox.com/u/61594284/plug.dj%20room_background%20mane%206%20dark.png");background-size: cover;background-repeat: no-repeat;min-height:100%;');

//THE WORD REPLACEMENT CODE BELOW IS NOT MINE, IT BELONGS TO JOE SIMMONS

var words = {
// Syntax: 'Search word' : 'Replace word',
"points" : "BITS",
"USERS" : "PONIES",
"WOOT!" : "BROHOOF!",
"Now Playing" : "DJ-Pon3's listening to",
"Time Remaining" : "Clock is ticking...",
"Volume" : "Too loud?",
"Current DJ" : "The pony everypony should listen to",
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
}