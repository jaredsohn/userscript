// ==UserScript==
// @name          Direct image links in PC Games Online's image browser
// @description   Makes direct image links in the image browser of PC Games Online (www.pcgames.de). - by Miklós "TnS" Végvári
// @namespace     http://greasemonkey.mozdev.com
// @include       http://www.pcgames.de/*
// ==/UserScript==

(function()
{
	var addresses = document.getElementsByTagName('a');
	for ( var i = 0; i < addresses.length; ++i )
	{
    var index = addresses[i].href.indexOf("?menu=browser&mode=fullscreen&pic=/screenshots/original/");
    if ( index != -1 )
    {
      var endIndex = addresses[i].href.indexOf("&", index + 57); // 57 is the length of "?menu=browser&mode=fullscreen&pic=/screenshots/original/"
      if ( endIndex != -1 )
        addresses[i].href = addresses[i].href.substring(index + 35 - 1, endIndex); // 35 is the length of "?menu=browser&mode=fullscreen&pic="
    }
  }
})();
