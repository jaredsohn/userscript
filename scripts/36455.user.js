// ==UserScript==
// @author          Erick Smith
// @name            FR Youtube Embed
// @namespace       http://www.freerepublic.com/~smith288
// @include         http://www.freerepublic.com/focus/*/posts
// @description     Detects a youtube link in a Free Republic article source
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


console = unsafeWindow.console;

$(document).ready(function() {
    threadpageYoutubeCheck();
});

function threadpageYoutubeCheck(){

	articlelink = $('#top').siblings('small').children('b').children('a');
	if (articlelink.attr('href')) {
        body = $('#top').siblings('p:eq(2)');
        youtubeLink = articlelink.attr('href').replace('/^','');    
        if(youtubeLink.indexOf('youtube.com/watch')!=-1){
            body.prepend(turnToVideo(youtubeLink));
        }
    }

    $('a').each(function() {
    if (articlelink.attr('href')) {
            if (this.href.indexOf('youtube.com/watch') != -1 && $(this).attr('href') != articlelink.attr('href')) {
                youtubelink = this.href;
                $(this).append(turnToVideo(youtubelink));
            }
        }
    });
}

function turnToVideo(url){
    link = url.replace('watch?v=','v/');
    sEmbed = '<center><object width="425" height="344"><param value="'+link+'&hl=en&fs=1" name="movie"/><param value="true" name="allowFullScreen"/><embed width="425" height="344" allowfullscreen="true" type="application/x-shockwave-flash" src="'+link+'&hl=en&fs=1"/></object></center><br/>';    
    return sEmbed;
}