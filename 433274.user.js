// ==UserScript==
// @name       Better MLG TV
// @namespace  http://tv.majorleaguegaming.com
// @version    0.4
// @description  Better MLG.TV experience
// @match http://tv.majorleaguegaming.com
// ==/UserScript==

$(document).ready(function() {
    var isExpanded = false;
    var cancelled = false;
    
    init();
    
    //Force player to reload so that it doesn't mess up
    video = $('#content-container');
    video.css('width', '100%').css('height', '100%');
    video.children('object').attr('width', '100%').attr('height', '100%');
    $('#container').children('#content-container').remove();
    $('#container').append(video);
    
    //Nasty hack to make sure that flash does what it's supposed to
    setInterval(function() {
        $('#content-container').css('width', '100%').css('height', '100%');
        $('#content-container').children('object').attr('width', '100%').attr('height', '100%');
        $('#video').children('iframe').attr('width', '100%').attr('height', '100%');
    }, 1000);
    
    function init() {
        setTimeout(function() {
            console.log("Better MLG TV starting");
            $('#expand_button').remove();
            if($('#container').css('width') == '1000px')
                $('#playerShareBar_gig_containerParent').children('iframe').after('<button id="expand_button" class="btn btn-sm" style="margin-left:4px"><span class="glyphicon glyphicon-new-window"></span><span id="expand-button-text">\xa0Larger</span></button>');
            else
                $('#playerShareBar_gig_containerParent').children('iframe').after('<button id="expand_button" class="btn btn-sm" style="margin-left:4px"><span class="glyphicon glyphicon-new-window"></span><span id="expand-button-text">\xa0Smaller</span></button>');
            $('#content-container').css('width', '100%').css('height', '100%');
            $('#content-container').children('object').attr('width', '100%').attr('height', '100%');
            $('#video').children('iframe').attr('width', '100%').attr('height', '100%');
            
            $(".channel").bind({
                click: function() {
                    init();
                }
            });
            
                
            $("#expand_button" ).bind({
                click: function() {
                    if(isExpanded) {
                        $('#container').css('width', '1000px');
                        $('#subcontainer').css('width', '1000px');
                        $('#video-sidebar').css('height', '451px');
                        $('#info-container').css('width', '672px');
                        $('#video').css('width', '672px').css('height', '378px');
                        $('#expand-button-text').text('\xa0Larger');
                    } else {
                        $('#container').css('width', '1608px');
                        $('#subcontainer').css('width', '1608px');
                        $('#video-sidebar').css('height', '720px');
                        $('#info-container').css('width', '1608px');
                        $('#video').css('width', '1280px').css('height', '720px');
                        $('#expand-button-text').text('\xa0Smaller');
                    }
                    
                    isExpanded = !isExpanded;
                }
            });
        }, 2000);
    }
});