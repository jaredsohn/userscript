// ==UserScript==
// @name          Vimeo Fix
// @namespace     http://mat.umk.pl/~stasiu88
// @description	  Replace Vimeo videos embedded with IFRAME with videos embedded with OBJECT
// @include       *
// @exclude       http://*.vimeo.*/*
// ==/UserScript==

function selectNodes(doc, context, xpath) 
{
    var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var result = new Array( nodes.snapshotLength );

    for (var x=0; x<result.length; x++) 
    {
        result[x] = nodes.snapshotItem(x);
    }

    return result;
}
doc = window.document;

var videos = selectNodes(doc, doc.body, "//iframe[contains(@src,'http://player.vimeo.com/video')]");
var re = /http:\/\/player.vimeo.com\/video\/(\d+)\?title=(\d+)&(amp;)?byline=(\d+)&(amp;)?portrait=(\d+)/ ;
var re2 = /http:\/\/player.vimeo.com\/video\/(\d+)/ ;

for (var v=0; v<videos.length; v++) 
{
    var vv=videos[v];
    var s = vv.src;
    var m = re.exec(s);
    if(m===null){
	    m = re2.exec(s);
    }
    var parent = vv.parentNode;
    var alt = document.createElement("object");
    alt.width = vv.width;
    alt.height = vv.height;
    if(m.length<7) {
    	alt.innerHTML = '<param name="allowfullscreen" value="false" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id='+m[1]+'&amp;server=vimeo.com&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" /><embed src="http://vimeo.com/moogaloop.swf?clip_id='+m[1]+'&amp;server=vimeo.com&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="'+alt.width+'" height="'+alt.height+'"></embed>';
    }
    else{ 
    	alt.innerHTML = '<param name="allowfullscreen" value="false" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id='+m[1]+'&amp;server=vimeo.com&amp;show_title='+m[2]+'&amp;show_byline='+m[4]+'&amp;show_portrait='+m[6]+'&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" /><embed src="http://vimeo.com/moogaloop.swf?clip_id='+m[1]+'&amp;server=vimeo.com&amp;show_title='+m[2]+'&amp;show_byline='+m[4]+'&amp;show_portrait='+m[6]+'&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="'+alt.width+'" height="'+alt.height+'"></embed>';
    }
    parent.replaceChild(alt,vv);
    
}