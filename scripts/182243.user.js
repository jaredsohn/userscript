// ==UserScript==
// @id             videos.digg.com-76cae96f-9c4a-45aa-81da-b212d13418d7@meh
// @name           Forward Digg Video Links to their respective video site page
// @version        1.0
// @namespace      meh
// @author         Yansky
// @description    Forward Digg Video Links to their respective video site page
// @include        http://videos.digg.com/post/*
// @include        https://videos.digg.com/post/*
// @include       http://digg.com/video/*
// @include       https://digg.com/video/*
// @run-at         document-end
// @noframes         
// @updateURL    http://userscripts.org/scripts/source/182243.user.js
// ==/UserScript==


//window.location.href = 
//http://www.youtube.com/embed/gRABvxJABJw?wmode=transparent&autohide=1&egm=0&hd=1&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&showsearch=0
var embedSrc = document.querySelector('iframe').src;

if(embedSrc.indexOf('youtube.com')>-1){

    window.location.href = 'http://www.youtube.com/watch?v='+embedSrc.split('youtube.com/embed/')[1].split('?')[0];
    
}
else if(embedSrc.indexOf('vimeo.com')>-1){

     window.location.href = 'https://vimeo.com/'+embedSrc.split('vimeo.com/video/')[1];

}
/*else if(embedSrc.indexOf('liveleak.com')>-1){

	//window.location.href = 'http://www.liveleak.com/view?i='+embedSrc.split('embed?f=')[1];

}*/

