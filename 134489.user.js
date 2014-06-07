// ==UserScript==
// @name           Plug DJ Test
// @namespace      http://www.plug.dj/
// @description    Test for plug.dj
// @include        http://www.plug.dj/friendshipismagic/
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

addGlobalStyle('#logo, #logo {background-image: url("http://i.imgur.com/NJaZw.png");min-height:33px;min-width:131px;}'); //change the logo

addGlobalStyle('#create-room-button, #create-room-button {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); //change create room button

addGlobalStyle('#room-wheel, #room-wheel {background-image: max-height:0px;max-width:0px;}'); //hide the upper bg image (clashes with main bg)

addGlobalStyle('#user-points, #user-points {background-image: url("http://th09.deviantart.net/fs70/PRE/i/2012/115/f/c/shining_armor_cutie_mark_by_noxwyll-d4xjdre.png");maxheight:25px;background-size: 100% 100%;max-width:25px;}'); //cutie mark

addGlobalStyle('#user-fans, #user-fans {background-image: url("http://i.imgur.com/2trwR.png");maxheight:25px;max-width:25px;}'); //Yay

addGlobalStyle('html{background: url("http://fc08.deviantart.net/fs70/f/2012/149/4/9/plug_dj_skin_2_by_liamgoodyear-d51j3xs.jpg") no-repeat scroll center top #424242;'); //main background

addGlobalStyle('#button-dj-play.button-dj, #button-dj-play.button-dj {background-image: url("http://i.imgur.com/25rO8.png")!important;}');//join DJ button

addGlobalStyle('#button-dj-quit.button-dj, #button-dj-quit.button-dj {background-image: url("http://i.imgur.com/u9vac.png")!important;}');//quit DJ button

addGlobalStyle('#button-dj-waitlist-join.button-dj, #button-dj-waitlist-join.button-dj {background-image: url("http://i.imgur.com/tyDif.png")!important;}');//join waitlist button

addGlobalStyle('#button-dj-waitlist-leave.button-dj, #button-dj-waitlist-leave.button-dj {background-image: url("http://i.imgur.com/pYUJE.png")!important;}');//leave waitlist button

//if you want to change the font, uncomment this part and edit with the font you want, google "font css" or something like that for the codes.
//addGlobalStyle("* {" + "font-family:Cambria,'Times New Roman','Nimbus Roman No9 L','Freeserif',Times,serif; !important;" + "}"); //for font changing

//to change the DJ console, uncomment this and add your own custom URL. I've got no good ideas atm, but feel free to try stuff out :)
//addGlobalStyle('#dj-console, #dj-console {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); //change create room button

//trying to figure out how to change the avatar image, not working atm.
//addGlobalStyle('#user-image, #user-image {background-image: url("http://th09.deviantart.net/fs70/PRE/i/2012/115/f/c/shining_armor_cutie_mark_by_noxwyll-d4xjdre.png");min-height:33px;background-size: 100% 100%;min-width:131px;}');

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

