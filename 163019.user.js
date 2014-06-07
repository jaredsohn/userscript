// ==UserScript==
// @name       [btc-e.com] Nickname autocomplete for chat
// @namespace  http://btc-e.com/
// @version    0.4.1
// @description  Enter part of a nickname/username and press Tab, script will autocomplete the name by searching among nicknames in the chat
// @match      https://btc-e.com/*
// @copyright  2013, Xum (donate if you found it useful 1Fm4mHV77gpZLZ4AH46PpVjZQSLwz6ghH4)
// ==/UserScript==

var google = unsafeWindow.google;
var $ = unsafeWindow.$;
var nicknames = [];
var tooltip = null;//contains list of nicknames matching letters typed into chat's input field

$(document).ready(function() {
    populateNicknames();//find nicknames in loaded chat and put them to our search list
    
    $("#nChatInput").keydown(listenTabKey);
    $("#nChatInput").keyup(updateNickTooltip);
    
    tooltip = $('<div>').attr('id', 'ChatNickTooltip').css('position', 'absolute').css('background', 'white').width('150px').hide().appendTo($('#nChatCon'));

	//adding listener function for new chat messages    
    unsafeWindow.channel.bind("msg", function(msg) {
        msg = JSON.parse(msg);
        nicknames.unshift( msg.login );//add nickname from a new message
        nicknames = unique( nicknames );
        
        //play notification sound if message has your nickname in it
        1 == unsafeWindow.auth && (msg.msg.match(unsafeWindow.auth_login)) &&  $("#audioPM").get(0).play();
    });

});


// ************* FUNCTIONS *************

function listenTabKey( event ) {
    //selecting nickname from a dropdown tooltip
    if ( tooltip && tooltip.is(':visible') && ( event.which == 38 || event.which == 40 || event.which == 13 ) ) {
	    event.preventDefault();
        if ( event.which == 38 ) { //38 is code of UP key
            var next = tooltip.find('.greenbg').prev();
            if ( next.length == 0 ) next = tooltip.find(':last');
            tooltip.find('.greenbg').removeClass('greenbg');
            next.addClass('greenbg');
        } else if ( event.which == 40 ) { //40 is code of DOWN key
            var next = tooltip.find('.greenbg').next();
            if ( next.length == 0 ) next = tooltip.find(':first');
            tooltip.find('.greenbg').removeClass('greenbg');
            next.addClass('greenbg');
        } else if ( event.which == 13 && ( nick = tooltip.find('.greenbg') ).length == 1 ) {
            unsafeWindow.nInChat( nick.text() );
        }

    }
    //Tab's charCode is 9
	if ( event.which != 9 ) return true;

    event.preventDefault();
    
    var nicks = tooltip.children();
    if (nicks.length == 1) {
        unsafeWindow.nInChat( $(nicks[0]).text() );
    } else if ( ( nick = tooltip.find('.greenbg') ).length == 1 ) {
        unsafeWindow.nInChat( nick.text() );
    }
}

var prev_prefix = '';//previous prefix
function updateNickTooltip( event ) {
    
    //Only do lookup if chat input field contains no spaces/punctuation (no nickname inserted)
    var prefix = $("#nChatInput").val().match(/^\S+$/i);
    prefix = prefix && prefix[0] || null;
    
    if ( prefix && prefix != prev_prefix ) {
        var prefices = transliterate ( prefix );
        
        var nicks = [];
        for (i in prefices) nicks = nicks.concat( lookupNicknames( prefices[i] ) );
        nicks = unique( nicks );
        
        if ( nicks[0] ) {
            tooltip.empty();
            for (i in nicks) {
                $('<div>').css('padding', '2px').css('border', '1px solid #666').css('border-width', '0px 1px 1px 1px').text(nicks[i]).appendTo(tooltip);
            }
            tooltip.is(':visible') ? tooltip.show() : tooltip.delay(500).show();
        } else {
			tooltip.hide().empty();
        }
        prev_prefix = prefix;
    } else if ( !prefix ) {
        tooltip.hide().empty();
        prev_prefix = '';
    }
}

function unique(array){
    return $.grep(array,function(el,index){
        return index == $.inArray(el,array);
    });
}

function lookupNicknames( prefix ) {
    var matches = [];
    var re = new RegExp('^' + prefix.toLowerCase(), 'i' );

    for ( n in nicknames ) {
        if ( re.test( nicknames[n] ) ) {
            matches.push( nicknames[n] );
        }
    }
//    return unique(matches) || [];
    return matches || [];
}

function populateNicknames() {
    nicknames = ['support', 'admin', 'dev'];
    $('.chatmessage > a').each( function() {
        nicknames.push( $(this).text() );
    } );
    nicknames = unique( nicknames.sort() );
//    GM_log( 'Nicknames: ' + nicknames );//debug
}

//Letter Ё is moved to the end of the alphabet
var translit = ['a', 'b', ['v','w'], 'g', 'd', 'e', ['zh', 'j'], ['z', 's'],
                'i', ['y', 'j', 'i'], ['k', 'c', 'q', 'ck'], 'l', 'm', 'n', 'o', 'p', 'r', 's', 't',
                'u', 'f', ['h', 'x', 'kh'], ['c','ts'], 'ch', 'sh', 'sch', '', 'y', '', ['e', 'a'], ['yu', 'u', 'iu', 'ju'], ['ya', 'ia', 'ja'], '', 'yo' ];



function transliterate( str ) {
    str = str.toLowerCase();
//    GM_log('Transliterating string "' + str + '" (' + str.length + ')');//debug
    var out = [''];
    for (var i = 0; i < str.length; i++) {
        var c = (str[i] >= 'а' && str[i] <= 'я' || str[i] == 'ё') ? translit[( str.charCodeAt(i) - 'а'.charCodeAt(0) )] : [ str[i] ];
        if ( typeof c == 'string' ) c = [ c ];
//            GM_log('Found a Russian letter "' + str[i] + '". ordnum = ' + ( str.charCodeAt(i) - 'а'.charCodeAt(0) ) );
        var out2 = [];
        for ( var j = 0; j < c.length; j++ ) {
            for ( var k = 0; k < out.length; k++ ) {
                out2.push( out[k] + c[j] );
            }
        }
        out = out2;
        
    }
    return out;
}