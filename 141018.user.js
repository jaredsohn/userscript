// ==UserScript==
// @name           Youtube Largener
// @namespace      http://www.matthewauld.net
// @version        3.5
// @description    Make Youtube Videos Larger
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
// @source         http://userscripts.org/scripts/show/141018
// @copyright      2012+, Lycrios
// @downloadURL    http://userscripts.org/scripts/source/141018.user.js
// @require        http://code.jquery.com/jquery-latest.js
// @grant          GM_getValue
// ==/UserScript==
$(document).ready(function(){
    $_GET = new Array
	_get_set = function(_data)
	{
		if(_data.match(/(.+?[^=])=(.*)/i)){
			eval("$_GET['" + RegExp.$1 + "'] = '" + RegExp.$2 + "';");
		}
	}
	
    _SearchIn  = location.href.replace(location.href.split('?')[0] + '?', '');
	_Variables = _SearchIn.split('&');

	if(_Variables.length < 2){
		_get_set(_SearchIn)
	}else{
		for(_s = 0; _s < _Variables.length; _s++){
			_get_set(_Variables[_s])
		}
	}

    $(document.head).append("<script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.js\"></script>");
    
    if(location.href.match(/[(http)(https)]+:\/\/www.youtube.com\/watch/)){
        var css = "";
        css += "<style type=\"text/css\" rel=\"stylesheet\">";
        css += "#light_button{";
        css += "position:fixed;";
        css += "bottom:10px;";
        css += "left:10px;";
        css += "border:1px #CCCCCC solid;";
        css += "background:white;";
        css += "padding:5px;";
        css += "z-index:1001;";
        css += "cursor:pointer;";
        css += "border-radius:5px;";
        css += "}";
        css += "</style>";
        
        $(document.head).append(css);
        
        $('#watch7-video-container,#player-legacy,#player-api-legacy').css('width','100%').css('padding-left','0px').css({'z-index':'100000','position':'relative'}).css('height','720px');
        
        $('#watch7-video').css('width','100%');
        $('#watch7-player').css('width','100%').css('height','720px');
        
        $('#player').css('width','100%').css('height','720px').css('padding-left','0px');
        $('#player-api').css('width','100%').css('height','720px').css('position','absolute').css('left','0px').css('z-index','100000');
        $('#guide').remove();
        
        $(document.body).append("<div id=\"lightsOut\" style=\"z-index:1000;position:fixed;background:rgba(0,0,0,0.9);top:0px;left:0px;width:100%;height:100%;display:none;\"></div>");    
        $(document.body).append('<button id="light_button">Lights Off</button>');
        
        var isVisible = false;
        
        $('#light_button').click(function(e){
            if(isVisible){
                $('#lightsOut').fadeOut(750);
                $('#light_button').html('Lights On');
            }else{
                $('#lightsOut').fadeIn(750);
                $('#light_button').html('Lights Off');
            }
            isVisible = !isVisible;
        });
        
        $('#watch7-main-container').css('width','960px').css('margin','auto').css('padding','0px');
        $('#watch7-main').css('width','960px').css('margin','0px');
        $('#watch7-creator-bar').css('width','100%').css('padding-left','0px');
        $('#watch7-content').css('width','640px');
        $('#watch7-container').attr('class','watch-wide');
        if($_GET['list']){
            $('#light_button').css('bottom','50px');
            /*
            $('.watch7-playlist-bar').css('width','100%');
            $('#watch7-playlist-container').css({'z-index':'100000','position':'fixed','bottom':'0px','width':'100%'});
            $('#watch7-playlist-data').css({'padding':'0px','width':'100%','position':'absolute','bottom':'0px'});
            $('#watch7-sidebar').delay(1500).css('margin-top:10px;');
            */
            $('.watch7-playlist-bar-left').css({'width':'75%'});
            $('.watch7-playlist-bar-right').css('width','25%');
            $('#playlist').css({'position':'fixed','bottom':'0px','width':'100%','z-index':'1000'});
            $('#watch7-playlist-tray-mask').remove();
        }
      	$('#comments-textarea').removeAttr('disabled');
    }else if(location.href == 'http://www.youtube.com/' || location.href.match(/http:\/\/www.youtube.com\/feed/)){
    	$('#header').css('width','960px').css('margin','auto');
        $('#page-container').css('width','960px').css('margin','auto');
    }
})();