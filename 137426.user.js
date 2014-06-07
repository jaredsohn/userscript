// ==UserScript==
// @name           PonyDJ (alt shipping background)
// @namespace      http://www.plug.dj/
// @description    Ponifies plug.dj
// @include        *www.plug.dj/*
// @include        *plug-dj.appspot.com/*
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

//when a user joins. also not working.
//API.addEventListener(API.USER_JOIN, callback);
//function callback(user) 
//{ 
//API.sendChat("Hello, " + user.username + " , and welcome to plug.dj's room for all your //pony music!")
//}

//when a song is skipped by a mod. not working either.
//API.addEventListener(API.MOD_SKIP, callback);
//function callback(user) 
//{ 
//API.sendChat("CRUSH. KILL. DESTROY. SWAG.")
//}

//clears background elements. Maybe. Nope. Errors out.
//addGlobalStyle('RoomUser.audience.roomElements = []; RoomUser.redraw();');

//changes the room background (alternate, this keeps the original size, comment out to disable)
addGlobalStyle('html{background: url("http://i.imgur.com/vEm2u.png") no-repeat scroll center top #424242;');

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
"Now Playing" : "DJ-Pon3's playing:",
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