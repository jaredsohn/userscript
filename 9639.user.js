// ==UserScript==
// @name           Fusetalk Hide smilies
// @namespace      Fusetalk
// @description    Fusetalk Hide smilies
// @include        *.anandtech.com/*
// ==/UserScript==

//get all divs
anchors=document.evaluate('//div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var newdiv = '';
for (var i = 0; anchor=anchors.snapshotItem(i++);) 
{
	if(anchor.className=='MessageText_Container') 
	{
		// rebuild the html in this div
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-smile.gif" border="0">',':)');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-wink.gif" border="0">',';)');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-sad.gif" border="0">',':(');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-blush.gif" border="0">',':o');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-disgusted.gif" border="0">',':disgust;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-happy.gif" border="0">',':D');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-mad.gif" border="0">',':|');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-shocked.gif" border="0">',':Q');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-tongue.gif" border="0">',':P');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-cool.gif" border="0">',':cool;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-frown.gif" border="0">',':frown;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/face-icon-small-confused.gif" border="0">',':confused;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/heart.gif" border="0">',':heart;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/brokenheart.gif" border="0">',':brokenheart;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/beer.gif" border="0">',':beer;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/musicnote.gif" border="0">',':music;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/wine.gif" border="0">',':wine;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/lips.gif" border="0">',':lips;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/camera.gif" border="0">',':camera;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/present.gif" border="0">',':gift;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/rose.gif" border="0">',':rose;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/devil.gif" border="0">',':evil;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/clock.gif" border="0">',':clock;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/light.gif" border="0">',':light;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/sun.gif" border="0">',':sun;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/moon.gif" border="0">',':moon;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/anim_roller.gif" border="0">',':roll;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/anim_laugh.gif" border="0">',':laugh;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/anim_shocked.gif" border="0">',':shocked;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/ratingicons/thumbsup.gif" border="0">',':thumbsup;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/ratingicons/thumbsdown.gif" border="0">',':thumbsdown;');
		anchor.innerHTML=anchor.innerHTML.replace('<img src="i/expressions/cookie.gif" border="0">',':cookie;');
	}
}