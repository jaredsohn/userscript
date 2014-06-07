// ==UserScript==
// @name          Google Instant Type
// @description   Adds Submit Buttons on google to search in images/maps/etc.
// @include       *google*/ig*
// @include       *.google.com/webhp?rls=ig
// @include       *google.com/
// @exclude       *maps.google.com*
// ==/UserScript==

myLoaded = false;
if(!myLoaded)
{
	gNode = document.forms[0].elements[0];
	gNodeP = gNode.parentNode;
	gNodeP.removeChild(gNodeP.lastChild);
	if(gNodeP.lastChild.name != 'btnG') gNodeP.removeChild(gNodeP.lastChild);

	s_ImgButton = '<input type="submit" name="btnG" id="btnG" value="Images" onclick="f.action = \'http://images.google.com/images\'">';
	s_MapButton = '<input type="submit" name="btnG" id="btnG" value="Maps" onclick="f.action = \'http://maps.google.com/maps\'">';
	s_NewsButton = '<input type="submit" name="btnG" id="btnG" value="News" onclick="f.action = \'http://news.google.com/news\'">';
	gNodeP.innerHTML += s_ImgButton;
	gNodeP.innerHTML += s_MapButton;
	gNodeP.innerHTML += s_NewsButton;
	myLoaded = true;
}