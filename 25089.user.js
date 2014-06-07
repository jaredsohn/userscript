// ==UserScript==
// @name           SlideshareFix
// @author         Rolando Espinoza La fuente <rho@prosoftpeople.com>
// @namespace      slideshare.net
// @description    This script fixes a bug in slideshare swf player under certain circunstances when loading slide takes forever.
// @version        0.1
// @date           2008-04-12
// @include        *slideshare.net/*
// ==/UserScript==


regex_uri = /slideshare\.net\/.+doc\=(.+)$/
regex_id = /slideshare\.net\/.+presentationId=(\d+)/

//console.log('start');
objects = document.getElementsByTagName('OBJECT');
length = objects.length;

for (i=0; i < length; i++) {
    var childs_length = objects[i].childNodes.length;
    for (j=0; j < childs_length; j++) {
        var child = objects[i].childNodes[j];
        if (!child || child.name != 'movie') continue;
        url = child.value;
        replace_slide(child, url);
    }
   //console.log('using object tag');
}

if (length == 0) {
   length = document.embeds.length;
   if (length > 0) {
      for (i=0; i < length; i++) {
         replace_slide(document.embeds[i], document.embeds[i].src);
      }
   }
   //console.log('using embeds');
}

function replace_slide(el, url) {
        child = el
        console.log(url);
        slide_id = false; slide_uri = false;
        
        match = regex_id.exec(url);
        if (match && match.length == 2) slide_id = match[1];
        match = regex_uri.exec(url);
        //console.log(match);
        if (match && match.length == 2) slide_uri = match[1];

        if (slide_uri) {
            video_swf = 'https://s3.amazonaws.com:443/slideshare/ssplayer.swf?id=' + slide_id + '&#38;doc=' + slide_uri; 

            video_embed = '<object type="application/x-shockwave-flash" wmode="transparent" data="' + video_swf + '" width="425" height="348"><param name="movie" value="' + video_swf + '" /></object>';
his script fixes a bug in slideshare swf player under certain circunstances when loading slide takes forever.
            // hide old object
            el.style.display = 'none';
            // create new object
            dummydiv = document.createElement('div');
            dummydiv.innerHTML = video_embed;
            el.parentNode.insertBefore(dummydiv, el.nextSibling);
	}
}
