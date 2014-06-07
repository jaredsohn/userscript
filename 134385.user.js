// ==UserScript==
// @name           Plug DJ Test
// @namespace      http://www.plug.dj/
// @description    Test for plug.dj
// @include        http://www.plug.dj/*
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

addGlobalStyle("* {" + "font-family:Cambria,'Times New Roman','Nimbus Roman No9 L','Freeserif',Times,serif; !important;" + "}"); //for font changing

addGlobalStyle('#logo, #logo {background-image: url("http://i.imgur.com/NJaZw.png");min-height:33px;min-width:131px;}'); //change the logo

addGlobalStyle('#button-dj-play.button-dj, #button-dj-play.button-dj {background-image: url("http://i.imgur.com/25rO8.png")}'); //change the play button, may not work atm

addGlobalStyle('#create-room-button, #create-room-button {background-image: url("http://i.imgur.com/oW6ir.png");min-height:33px;min-width:131px;}'); //change create room button

addGlobalStyle('#room-wheel, #room-wheel {background-image: url("http://www.pa.msu.edu/people/frenchj/duglogo/duglogobigtextwhite.png");min-height:33px;min-width:131px;}'); //hide the upper bg image (clashes with main bg)

addGlobalStyle('#user-points, #user-points {background-image: url("http://th09.deviantart.net/fs70/PRE/i/2012/115/f/c/shining_armor_cutie_mark_by_noxwyll-d4xjdre.png");maxheight:25px;background-size: 100% 100%;max-width:25px;}'); //cutie mark

addGlobalStyle('html{background: url("http://liamgoodyear.deviantart.com/art/Plug-dj-Skin-304880317") no-repeat scroll center top #424242;'); //main background

//addGlobalStyle('#user-image, #user-image {background-image: url("http://th09.deviantart.net/fs70/PRE/i/2012/115/f/c/shining_armor_cutie_mark_by_noxwyll-d4xjdre.png");min-height:33px;background-size: 100% 100%;min-width:131px;}'); //should change the avatar, but not working atm