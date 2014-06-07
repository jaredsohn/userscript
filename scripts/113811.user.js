// ==UserScript==
// @name          Rage Faces for ESPN Fantasy Football
// @description   This script allows rage faces on ESPN Fantasy Football chat pages.
// @include       http://games.espn.go.com/ffl/*
// ==/UserScript==

var gusta="http://www.evga.com/evgachat/CuteSoft_Client/CuteChat/images/emotions/me_gusta.jpg";
var challenge="http://images.memegenerator.net/images/50x50/277291.jpg";
var pokerface="http://www.w8baby.com/forums/images/smilies/Smilies_big/Pokerface.png";
var troll="http://www.extremegeneration.it/images/smilies/newemotion/trollface.png";
var kiddingme="http://www3.picturepush.com/photo/a/5159766/64c/ETS/Are-You-Fucking-Kidding-Me-HD-by-CrusierPL.png";
var lied="http://images.memegenerator.net/images/50x50/1140669.jpg";
var awwyea="http://209.85.62.26/15588/26/emo/Aww-Yeah-meme_normal.png";
var fuckyea="http://a1.twimg.com/profile_images/1496022580/Fuck-Yeah-meme_normal.jpg";
var close="http://profile.ak.fbcdn.net/hprofile-ak-snc4/277142_242120382465492_2613893_q.jpg";
var lol="http://a3.twimg.com/profile_images/1303342812/lol-face_normal.jpg";
var rageface="http://a1.twimg.com/profile_images/422607100/RageFace2_normal.png";
var yuno="http://r18.imgfast.net/users/1812/13/66/55/smiles/3888984197.png";

window.setInterval(function() {
var url = "";
var elements = document.getElementsByClassName("chatMessage");

for (i = 0; i < elements.length; i++)
{
	var rage = elements[i].innerHTML.split("[]");
	if (rage.length > 1)
	{
		switch(rage[1])
		{
			case "gusta":
				url = gusta;
				break;
			case "fuckyea":
				url = fuckyea;
				break;
			case "awwyeah":
				url = awwyea;
				break;
			case "challenge":
				url = challenge;
				break;
			case "pokerface":
				url = pokerface;
				break;
			case "troll":
				url = troll;
				break;
			case "close":
				url = close;
				break;
			case "lol":
				url = lol;
				break;
			case "lied":
				url = lied;
				break;
			case "kiddingme":
				url = kiddingme;
				break;
			case "rage":
				url = rageface;
				break;
			case "yuno":
				url = yuno;
				break;
			case "list":
				elements[i].innerHTML = 
					"{gusta, fuckyea, awwyeah, challenge, pokerface, troll, close, lol, lied, kiddingme, rage, yuno}";
				return;
		}
		elements[i].innerHTML = rage[0] + "<img src=\"" + url + "\"/>";
	}
}
}, 2000);