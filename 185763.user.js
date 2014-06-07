// ==UserScript==
// @name        FIMFiction: Organized Emoticon Panel
// @namespace   https://www.fimfiction.net/user/iloveportalz0r
// @description Fixes emoticon alignment + organizes them
// @include     http*://fimfiction.net/*
// @include     http*://www.fimfiction.net/*
// @version     1
// @grant       none
// ==/UserScript==

var emoteDivNew =
'<table style="width:100%;height:100%;">\
	<tbody>\
		<tr>\
			<td><a href="javascript:smilie(\':ajbemused:\');"><img src="//www.fimfiction-static.net/images/emoticons/ajbemused.png"></a></td>\
			<td><a href="javascript:smilie(\':ajsleepy:\');"><img src="//www.fimfiction-static.net/images/emoticons/ajsleepy.png"></a></td>\
			<td><a href="javascript:smilie(\':ajsmug:\');"><img src="//www.fimfiction-static.net/images/emoticons/ajsmug.png"></a></td>\
			<td><a href="javascript:smilie(\':applejackconfused:\');"><img src="//www.fimfiction-static.net/images/emoticons/applejackconfused.png"></a></td>\
			<td><a href="javascript:smilie(\':applejackunsure:\');"><img src="//www.fimfiction-static.net/images/emoticons/applejackunsure.png"></a></td>\
			<td><a href="javascript:smilie(\':eeyup:\');"><img src="//www.fimfiction-static.net/images/emoticons/eeyup.png"></a></td>\
			<td><a href="javascript:smilie(\':trollestia:\');"><img src="//www.fimfiction-static.net/images/emoticons/trollestia.png"></a></td>\
			<td><a href="javascript:smilie(\':moustache:\');"><img src="//www.fimfiction-static.net/images/emoticons/moustache.png"></a></td>\
		</tr>\
		<tr>\
			<td><a href="javascript:smilie(\':raritycry:\');"><img src="//www.fimfiction-static.net/images/emoticons/raritycry.png"></a></td>\
			<td><a href="javascript:smilie(\':raritydespair:\');"><img src="//www.fimfiction-static.net/images/emoticons/raritydespair.png"></a></td>\
			<td><a href="javascript:smilie(\':raritystarry:\');"><img src="//www.fimfiction-static.net/images/emoticons/raritystarry.png"></a></td>\
			<td><a href="javascript:smilie(\':raritywink:\');"><img src="//www.fimfiction-static.net/images/emoticons/raritywink.png"></a></td>\
			<td><a href="javascript:smilie(\':duck:\');"><img src="//www.fimfiction-static.net/images/emoticons/duck.png"></a></td>\
			<td><a href="javascript:smilie(\':derpyderp1:\');"><img src="//www.fimfiction-static.net/images/emoticons/derpyderp1.png"></a></td>\
			<td><a href="javascript:smilie(\':derpyderp2:\');"><img src="//www.fimfiction-static.net/images/emoticons/derpyderp2.png"></a></td>\
			<td><a href="javascript:smilie(\':derpytongue2:\');"><img src="//www.fimfiction-static.net/images/emoticons/derpytongue2.png"></a></td>\
		</tr>\
		<tr>\
			<td><a href="javascript:smilie(\':fluttercry:\');"><img src="//www.fimfiction-static.net/images/emoticons/fluttercry.png"></a></td>\
			<td><a href="javascript:smilie(\':flutterrage:\');"><img src="//www.fimfiction-static.net/images/emoticons/flutterrage.png"></a></td>\
			<td><a href="javascript:smilie(\':fluttershbad:\');"><img src="//www.fimfiction-static.net/images/emoticons/fluttershbad.png"></a></td>\
			<td><a href="javascript:smilie(\':fluttershyouch:\');"><img src="//www.fimfiction-static.net/images/emoticons/fluttershyouch.png"></a></td>\
			<td><a href="javascript:smilie(\':fluttershysad:\');"><img src="//www.fimfiction-static.net/images/emoticons/fluttershysad.png"></a></td>\
			<td><a href="javascript:smilie(\':yay:\');"><img src="//www.fimfiction-static.net/images/emoticons/yay.png"></a></td>\
			<td><a href="javascript:smilie(\':coolphoto:\');"><img src="//www.fimfiction-static.net/images/emoticons/coolphoto.png"></a></td>\
			<td><a href="javascript:smilie(\':heart:\');"><img src="//www.fimfiction-static.net/images/emoticons/heart.png"></a></td>\
		</tr>\
		<tr>\
			<td><a href="javascript:smilie(\':pinkiecrazy:\');"><img src="//www.fimfiction-static.net/images/emoticons/pinkiecrazy.png"></a></td>\
			<td><a href="javascript:smilie(\':pinkiegasp:\');"><img src="//www.fimfiction-static.net/images/emoticons/pinkiegasp.png"></a></td>\
			<td><a href="javascript:smilie(\':pinkiehappy:\');"><img src="//www.fimfiction-static.net/images/emoticons/pinkiehappy.png"></a></td>\
			<td><a href="javascript:smilie(\':pinkiesad2:\');"><img src="//www.fimfiction-static.net/images/emoticons/pinkiesad2.png"></a></td>\
			<td><a href="javascript:smilie(\':pinkiesick:\');"><img src="//www.fimfiction-static.net/images/emoticons/pinkiesick.png"></a></td>\
			<td><a href="javascript:smilie(\':pinkiesmile:\');"><img src="//www.fimfiction-static.net/images/emoticons/pinkiesmile.png"></a></td>\
			<td><a href="javascript:smilie(\':unsuresweetie:\');"><img src="//www.fimfiction-static.net/images/emoticons/unsuresweetie.png"></a></td>\
			<td><a href="javascript:smilie(\':applecry:\');"><img src="//www.fimfiction-static.net/images/emoticons/applecry.png"></a></td>\
		</tr>\
		<tr>\
			<td><a href="javascript:smilie(\':rainbowderp:\');"><img src="//www.fimfiction-static.net/images/emoticons/rainbowderp.png"></a></td>\
			<td><a href="javascript:smilie(\':rainbowdetermined2:\');"><img src="//www.fimfiction-static.net/images/emoticons/rainbowdetermined2.png"></a></td>\
			<td><a href="javascript:smilie(\':rainbowhuh:\');"><img src="//www.fimfiction-static.net/images/emoticons/rainbowhuh.png"></a></td>\
			<td><a href="javascript:smilie(\':rainbowkiss:\');"><img src="//www.fimfiction-static.net/images/emoticons/rainbowkiss.png"></a></td>\
			<td><a href="javascript:smilie(\':rainbowlaugh:\');"><img src="//www.fimfiction-static.net/images/emoticons/rainbowlaugh.png"></a></td>\
			<td><a href="javascript:smilie(\':rainbowwild:\');"><img src="//www.fimfiction-static.net/images/emoticons/rainbowwild.png"></a></td>\
			<td><a href="javascript:smilie(\':scootangel:\');"><img src="//www.fimfiction-static.net/images/emoticons/scootangel.png"></a></td>\
			<td><a href="javascript:smilie(\':twistnerd:\');"><img src="//www.fimfiction-static.net/images/emoticons/twistnerd.png"></a></td>\
		</tr>\
		<tr>\
			<td><a href="javascript:smilie(\':twilightangry2:\');"><img src="//www.fimfiction-static.net/images/emoticons/twilightangry2.png"></a></td>\
			<td><a href="javascript:smilie(\':twilightblush:\');"><img src="//www.fimfiction-static.net/images/emoticons/twilightblush.png"></a></td>\
			<td><a href="javascript:smilie(\':twilightoops:\');"><img src="//www.fimfiction-static.net/images/emoticons/twilightoops.png"></a></td>\
			<td><a href="javascript:smilie(\':twilightsheepish:\');"><img src="//www.fimfiction-static.net/images/emoticons/twilightsheepish.png"></a></td>\
			<td><a href="javascript:smilie(\':twilightsmile:\');"><img src="//www.fimfiction-static.net/images/emoticons/twilightsmile.png"></a></td>\
			<td><a href="javascript:smilie(\':facehoof:\');"><img src="//www.fimfiction-static.net/images/emoticons/facehoof.png"></a></td>\
			<td><a href="javascript:smilie(\':trixieshiftleft:\');"><img src="//www.fimfiction-static.net/images/emoticons/trixieshiftleft.png"></a></td>\
			<td><a href="javascript:smilie(\':trixieshiftright:\');"><img src="//www.fimfiction-static.net/images/emoticons/trixieshiftright.png"></a></td>\
		</tr>\
	</tbody>\
</table>';

var emoteDivs = document.getElementsByClassName("emoticons_panel");
if(emoteDivs.length > 0)
{
	for(var i = 0; i < emoteDivs.length; ++i)
	{
		emoteDivs[i].innerHTML = emoteDivNew;
	}
}