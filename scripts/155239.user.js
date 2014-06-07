// ==UserScript==
// @name       LPIP fixes
// @namespace  http://pot.gm.nightbooster/
// @version    0.5
// @description  Layout fixes & video links on LPIP.de
// @include      http://letsplayimpot.de/?v=*
// @include      http://www.letsplayimpot.de/?v=*
// @include      https://letsplayimpot.de/?v=*
// @include      https://www.letsplayimpot.de/?v=*
// @copyright  2012+, NightBooster
// ==/UserScript==

var options = {
    html5button: true,
    alwaysHtml5: false,
    preload: true,
    downloadLinks: true,
    layoutFullscreen: false
};

// preload seems to be buggy

/*
 * Option overrides
 */
if(options.alwaysHtml5) {
    options.html5button = false;
}

var embed = $('#jwplayer')[0];
embed.w = $(embed).css('width');
embed.h = $(embed).css('height');

/*
 * Style fixes
 */ 
if(options.layoutFullscreen) {
    $('.container:first')
    .css('margin', 'none')
    .css('width', '100%')
    .css('minWidth', '1260px');
    $('.userleiste:first')
    .css('width', 'auto')
    .css('paddingRight', '202px');
}

/*
 * Find videos in params and reformat for ajax call
 */
var urlSplit = location.href.split('?')[1].split('&');
for(i in urlSplit) {
    if(urlSplit[i][0]=='v') {
        var videos = urlSplit[i].split('=')[1].replace(',', '_');
    }
}


var html5Player = function(){
    $.ajax({
        url: "playlist.xml.php?v=" + videos,
        dataType: 'XML'
    }).done(function( xml ) {
        var videoDiv = $('<div class="html5player"></div>'),
            xmlVideos = $(xml).find('video').each(function() {
                var url = $(this).children('url')[0].textContent,
                    poster = $(this).children('thumb')[0].textContent,
                    title = $(this).children('title')[0].textContent,
                    videoElem = $('<video></video>');
                videoElem.attr('poster', poster);
                videoElem.attr('controls','controls');
                videoElem.attr('preload', options.preload?'auto':'metadata');
                videoElem.css('width', embed.w);
                videoElem.append($('<source src="' + url + '" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />'));
                videoDiv.append(videoElem);
                videoDiv.append('<p><a href="' + url + '">Download "' + title + '"</a></p>');
            });
        videoDiv.css('width', embed.w);
        
        // Add new players
        $('.box_player_header').after(videoDiv);
        
        // Remove Flash Player
        $(embed).remove();
        $('#switchHtml5').remove();
        
    });
};

if(options.html5button){
    $(embed).before($('<button id="switchHtml5">Switch to HTML5 Player</button><br />'));
    $('#switchHtml5').click(function(){
        html5Player();	
    });
}
if(options.alwaysHtml5) {
    html5Player();
}