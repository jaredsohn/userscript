// ==UserScript==
// @name           TwiPopup
// @namespace      http://www.facebook.com/home.php?#!/profile.php?id=1475323696
// @include        http://twitter.com/
// @include        http://twitter.com/home
// ==/UserScript==

// ver 0.5.9 @ 2010-10-05
// reduce the code

(function(){

    var e = document.getElementsByClassName("entry-content");
    var url1 = "http://chart.apis.google.com/chart?chst=d_bubble_text_small&chld=bb|";
    var url2 = "|FFFFFF|000000";

    for(var i in e){
	var text = e[i].innerHTML;
	text = function(text){return text.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');}(text);

	text = function(text){
	    var r = 0;
	    for(var i = 0; i < text.length; i++){
		var c = text.charCodeAt(i);
		if((c >= 0x0 && c < 0x81) || (c == 0xf8f0) ||
		   (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4))
		    r += 1;
		else
		    r += 2;
		if(r > 90) return text.substring(0, i);
	    }
	    return text;
	}(text);

	text = text.replace(/\"/g, "\'");
	text = text.replace(/\|/g, "");
	e[i].innerHTML = "<img src=\"" + url1 + text + url2 + "\"\>";
    }
})();
