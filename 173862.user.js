// ==UserScript==
// @name       DH Forums Troll Filter
// @namespace  http://www.doublehelixgames.com/
// @version    0.2
// @description  Screens out posts from known trolls
// @match      http://www.doublehelixgames.com/*
// @copyright  waived 
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

function savesettings()
{
    if ( blocks == undefined )
        return;
    GM_setValue('savedblocks', blocks);
}

function filter(jNode) {
    
    var authorEl = jNode.find('.bbp-author-name');
    if ( authorEl.length == 0 )
        return;
    
    var author = authorEl[0].innerText.trim().toLowerCase();
    if ( censors.indexOf(author) == -1 ) {
        addUI( jNode, author );
        return;
    }

    if( !jNode.parent().hasClass('bbp-body') ) {
        return;
    }
    
    if( jNode.parents().hasClass("bbp-topic-freshness-author") ) {
        return;
    }
        
	//jNode.after( $("<div>TROLL FILTERED!</div>") );    
    if ( jNode.parents().hasClass("bbp-topics") ) {
	    jNode.remove();
    } else {        
	    jNode.prev().remove();
	    jNode.remove();
    }
    
    return;    
}

function addUI(jNode, author) {
    var header = jNode.prev();
    if ( header.find('.troll-button').length > 0 ) {
        return;
    }
    var admin = header.find('.bbp-admin-links');
    if ( admin.length == 0 ) {
        return;
    }
    admin = $(admin[0]);
    var but = $("<a href='' class='troll-button'>Hide Troll</a>");
    admin.append("| ");
    admin.append(but);
    but.click( function() {
        blocks += "," + author;
        savesettings();
    });
}

var blocks = GM_getValue('savedblocks', '');
var censorsSplit = blocks.split(",");
var censors = [];
if ( censorsSplit ) {
	for ( i=0; i<censorsSplit.length; ++i ) {   
        if ( censorsSplit[i] ) censors.push( censorsSplit[i] );
	}
}
//console.log( censors );
//console.log( "DH Troll Filter started" );

function addUnblocker() {
	var unblocker = $('<div/>');
    $('footer').append( unblocker );
    unblocker.append ('click on a troll to unhide it ' );
    for ( i=0; i<censors.length; ++i ) {
        var censor = censors[i];
     	var unb = $( "<a href=''> " + censor + "</a>" );
        unblocker.append( unb );
        function makeButton( censor ) {
	        unb.click( function() {
	           blocks = blocks.replace(censor,'');
               savesettings();
	        });
        };
        makeButton( censor );
    }
};
addUnblocker();

waitForKeyElements('.type-reply', filter);
waitForKeyElements('.type-topic', filter);