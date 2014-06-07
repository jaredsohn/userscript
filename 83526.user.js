// This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
// More info: http://greasemonkey.mozdev.org/
// ==UserScript==
// @name         GetYoukuVideoEmbedCodeAfterUpload
// @author       sfufoet
// @blog       	 http://blog.loland.net/
// @include      http://www.youku.com/v/upfinished/vid/*
// ==/UserScript==

GetYoukuVideoEmbedCode();

function GetYoukuVideoEmbedCode(){
	var enabling = document.createElement('div');
	enabling.innerHTML = '<textarea cols="100%" rows="6" onmouseover=\'this.focus()\' onfocus=\'this.select()\'><embed src="http://player.youku.com/player.php/sid/'+ window.location.href.replace('http://www.youku.com/v/upfinished/vid/', '') + '/v.swf" quality="high" width="480" height="400" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></embed></textarea>';

	var elements = document.getElementsByTagName("div");

	for ( var i = 0, len = elements.length; i < len; i ++ )
	{
	    if ( elements[i].className === "uploadComplete" )
	    {
			elements[i].parentNode.insertBefore(enabling, elements[i]);
	    }
	}
}