// ==UserScript==
// @name       otherstuff
// @namespace  harry
// @version    0.5
// @include    http://*/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js

// ==/UserScript==

$(document).ready(function() {
	var links = $("a");
	var imgs = [];
        links.each(function() {
            var me = $(this),
                first = me.find(':first-child');
            if ( first.get(0) && first.get(0).nodeName.toLowerCase() == "img" ) {
	        var img = me.attr("href");
		var par = me.parent();
		//linky.remove();
		imgs.push('<img src="' + img + '" border="0"/>');
	    }
        });
	var bod = $("body");
	var zdiv = $('<div style="text-align:center;"></div>');
	for ( var i=0; i < imgs.length; i++ ) {
		zdiv.append(imgs[i]);
		zdiv.append("<br/>");
	}
	bod.append(zdiv);
});