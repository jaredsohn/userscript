// ==UserScript==
// @name        Smiley Addon for SA-MP.DE
// @namespace   de.montero.samp.smileyaddon
// @description Mehr Smilies für sa-mp.de
// @include     http://forum.sa-mp.de/*
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var ponies = GM_getValue("ponys", "0") == "1";

var more_smilies = new Array(
    // Ponies smilies, können im Fußbereich getoogelt werden
    new Array("Off Topic", "http://forum.life-of-german.org/wcf/images/smilies/s_ot.png", ponies),
    new Array("Fail Post", "http://forum.life-of-german.org/wcf/images/smilies/s_falschesforum.png", ponies),
    new Array("Dumm", "http://forum.life-of-german.org/wcf/images/smilies/s_dummesposting.png", ponies),
    new Array("Spam", "http://forum.life-of-german.org/wcf/images/smilies/s_nospam.png", ponies),
    new Array("Werd Erwachsen", "http://forum.life-of-german.org/wcf/images/smilies/s_werderwachsen.png", ponies),
    
    new Array("Kopf Wand", "http://forum.life-of-german.org/wcf/images/smilies/dash.gif", true),
    new Array("Lachen", "http://forum.life-of-german.org/wcf/images/smilies/rofl.gif", true),
    new Array("Gott", "http://forum.life-of-german.org/wcf/images/smilies/hail.gif", true),
    new Array("Nein Nein!", "http://forum.life-of-german.org/wcf/images/smilies/nono.gif", true),
    new Array("Popcorn", "http://forum.life-of-german.org/wcf/images/smilies/popcorn.gif", true),
    new Array("Muskel", "http://forum.life-of-german.org/wcf/images/smilies/pump.gif", true),
    new Array("This!", "http://forum.life-of-german.org/wcf/images/smilies/this.gif", true),
	new Array("!idiot", "http://forum.life-of-german.org/wcf/images/smilies/modo.gif", true),
	new Array("alles mist!", "http://forum.life-of-german.org/wcf/images/smilies/topicclosed.gif", true),
	new Array("Fail-Face!", "http://forum.life-of-german.org/wcf/images/smilies/crazy.png", true),
	new Array("Chinese!", "http://forum.life-of-german.org/wcf/images/smilies/chinese.png", true),
	new Array("Zunge!", "http://forum.life-of-german.org/wcf/images/smilies/miffy.gif", true),
	new Array("Maul!", "http://forum.life-of-german.org/wcf/images/smilies/censored.png", true),
	new Array("Sexy Blick!", "http://forum.life-of-german.org/wcf/images/smilies/vain.gif", true),
	new Array("Neein!", "http://forum.life-of-german.org/wcf/images/smilies/fie.gif", true),
	new Array("Dance!", "http://forum.life-of-german.org/wcf/images/smilies/dance.gif", true),
	new Array("rawr!", "http://forum.life-of-german.org/wcf/images/smilies/spiteful.gif", true),
	new Array("Lupe!", "http://forum.life-of-german.org/wcf/images/smilies/search.gif", true),
	new Array("HGW!", "http://forum.life-of-german.org/wcf/images/smilies/bday.gif", true),
	new Array("Hi!", "http://forum.life-of-german.org/wcf/images/smilies/hi.png", true),
	new Array("Cookie!", "http://forum.life-of-german.org/wcf/images/smilies/cookie.png", true),
	new Array("Shit!", "http://forum.life-of-german.org/wcf/images/smilies/shit.png", true),
	new Array("Wayne!", "http://forum.life-of-german.org/wcf/images/smilies/wayne.png", true)
	
	
	
);

if($("#smileyCategory-0") != null) {
    for(var i = 0; i < more_smilies.length; i++) if(more_smilies[i][2]) $("#smileyCategory-0").append("<img onmouseover=\"this.style.cursor='pointer'\" onclick=\"WysiwygInsert('smiley', '"+ more_smilies[i][1] +"', '"+ more_smilies[i][1] +"[/img]', '[img]"+ more_smilies[i][1] +"[/img]');\" src=\""+ more_smilies[i][1] +"\" alt=\"\" title=\""+ more_smilies[i][0] +"\"> ");
}

$(".copyright").append("<br />Smilies+ by <a href='http://forum.sa-mp.de/index.php?page=User&userID=15648'>Tion</a> edited by <a href='http://forum.sa-mp.de/index.php?page=User&userID=15648'>Montero</a>. <a id='smilies_ponies'>Toogle Extras "+ (ponies ? "off" : "on") +"</a>");
$("#smilies_ponies").click(function() {
    ponies = !ponies;
    GM_setValue("ponys", (ponies ? "1" : "0"));
    $("#smilies_ponies").html("Toggle Extras "+ (ponies ? "off" : "on"));
});