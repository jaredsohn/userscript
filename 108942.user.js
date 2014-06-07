// #########################      A Greasemonkey script that restores
// # Google Cleanup Script #    Google's "classic" user interface to
// #########################    its former glory.
// 
// --------------------------------------------------------------------
// 
//  This is a Greasemonkey user script. To install this script, you
//  need Greasemonkey (developed on 0.9.7 but may work on earlier versions).
//  To get Greasemonkey, or for more information go to
//  http://www.greasespot.net/
//  Greasemonkey is a Mozilla Firefox add-on.
//  It can make changes to HTML web page content on the fly through
//  using JavaScript.
//  From the Greasepot.net site:
//  "Greasemonkey is a Firefox extension that allows you to customize
//  the way webpages look and function."
// 
// --------------------------------------------------------------------
// ==UserScript==
// @name		Altium Live Forum reformatter
// @namespace	http://considered.com.au/
// @description	Reformat Altium Live fora
// @include 	http://forum.live.altium.com/*
// @match 		http://forum.live.altium.com/*
// @version		1.0
// @history		1.0: Initial release
// ==/UserScript==

function container() {
    // less typing
    var $ = jQuery_lightbox;

    // (partial) ids of all the elements of the document (see picture for explanation of each one)
    var THREAD_LIST_ID = 'xfrmRecentPosts',
        SIDEBAR = 'Index_subAds',
        SIDEBAR_SEPARATOR = 'Index_Container12',
        CENTRED_BOX = 'Index_Detail', // div that keeps all the content centred
        
        ID_PREFIX_PREFIX = 'frmRecentPosts_', // prefix of all the following ones
        THREAD_ID = 'Detail', 
        THREAD_TITLE = 'lblThreadName', 
        THREAD_DETAIL = 'lblPostDetail', 
        THREAD_NAV = 'lblThreadNavigation', 
        PROFILE_PIC = 'ProfilePic',
        REPLIES_BOX = 'Container1',
        RBOX_BACKGROUND = REPLIES_BOX + 'Background',
        RBOX_BOUNTY_IMG = 'imgBounty',
        SEE_NEW = 'lblFirstUnread';
        
    // layout constants
    var MAIN_WIDTH = '990px',
        THREAD_HEIGHT = '60px',
        THREAD_LEFT = '70px',
        TITLE_TOP = '8px',
        DETAILS_TOP = '35px',
        RBOX_LEFT = '0px',
        RBOX_TOP = '10px',
        RBOX_HEIGHT ='30px',
        RBOX_COUNT_TOP = '1px',
        RBOX_COUNT_HEIGHT = '22px'
        RBOX_IMG_TOP = '2px'
        RBOX_IMG_SIZE = '25px',
        RBOX_IMG_OPACITY = 0.8;
        
    // Returns a jQuery selector that matches anything with an id starting
    // with ID_PREFIX_PREFIX + specifier (e.g. frmRecentPosts_Detail...)
    function id_prefix(specifier){ 
        var joined = ID_PREFIX_PREFIX + specifier;
        return '[id^=' + joined + ']'; 
    } 
 
    function adjust(){ 
        // get the thread lists that haven't been adjusted yet
        var threadList = $('#'+THREAD_LIST_ID+':not(.already-adjusted)',document),
        // get the children of those threads
            threads = $(id_prefix(THREAD_ID), threadList);
        
        if (threadList.length == 0 || threads.length == 0){
            // Nothing to do, so quit
            return false;
        }
        
        // Make sure everything up to the box that centres the content has
        // the correct width, so nothing is cut off
        threadList.parentsUntil('#'+CENTRED_BOX).width(MAIN_WIDTH);
        
        // Size the box for each thread
        threads.height(THREAD_HEIGHT).width(MAIN_WIDTH);
        
        // Delete the profile pictures
        threads.find('[id*='+PROFILE_PIC+']').remove();
        
        // Position and stretch the title, the "Started by ..." details, and the page links
        threads.find(id_prefix(THREAD_TITLE)).css({'left':THREAD_LEFT,'width':(parseInt(MAIN_WIDTH) - parseInt(THREAD_LEFT)) + 'px','top':TITLE_TOP});
        threads.find(id_prefix(THREAD_DETAIL)).css({'left':THREAD_LEFT,'top':DETAILS_TOP});
        threads.find(id_prefix(THREAD_NAV)).css('top',DETAILS_TOP);
        
        // Get the replies box (dark background with a number and "Replies" in it)
        var rbox = threads.find(id_prefix(REPLIES_BOX)+':not('+id_prefix(RBOX_BACKGROUND)+')');
        
        // Size and position it correctly
        rbox.height(RBOX_HEIGHT).css({'left':RBOX_LEFT,'top':RBOX_TOP});
        
        // Size the background
        rbox.children(id_prefix(RBOX_BACKGROUND)).height(RBOX_HEIGHT);
        
        // Get the children of the replies box that don't have an
        // id, which are the "Replies" text and the big number
        var unid = rbox.children(':not([id])');
        
        // Do stuff to them
        unid.map(function(i,d){
                var jd = $(d);
                if (d.innerHTML.match(/Repl(ies|y)/)){
                    // delete the "Replies" text
                    jd.remove();
                }
                else { // Squeeze the number
                    jd.css({'margin-top':RBOX_COUNT_TOP,
                            'height':RBOX_COUNT_HEIGHT,
                            'z-index':3
                          });
                }
           });
        
        // Size and position the tick image
        rbox.find(id_prefix(RBOX_BOUNTY_IMG)).css({'top':RBOX_IMG_TOP,'height':RBOX_IMG_SIZE,'width':RBOX_IMG_SIZE,'z-index':2,'opacity':RBOX_IMG_OPACITY});
        
        // Put the 'See new' link in the correct place
        $(id_prefix(SEE_NEW)).css({'top':(parseInt(RBOX_HEIGHT)+parseInt(RBOX_TOP))+'px','left':RBOX_LEFT});
        
        // stretch the dotted line across the whole thing
        threads.children(':last-child').width('98%');
        
        // Record that we've adjusted these lists of threads
        threadList.addClass('already-adjusted');
        return false;
    }

    // waits until there is a thread list on the page, and then
    // does the adjustment every 100ms    
    function wait_adjust() {
        if ($('#' + THREAD_LIST_ID).length){
            // A thread list is there, so start adjusting
            setInterval(adjust,100);
        }
        else{
            // Try again
            setTimeout(wait_adjust,100);
        }
    }
    wait_adjust();
    
    // waits until the side bar is inserted into the page, and
    // then deletes it
    function wait_sidebar() {
        var sb = $('#' + SIDEBAR),
            sbs = $('#' + SIDEBAR_SEPARATOR);
        if (sb.length && sbs.length){
            // Delete the side bar and the separator
            sb.remove(); sbs.remove();
        }        
        else {
            // Try again
            setTimeout(wait_sidebar,100);
        }
    }
    wait_sidebar();
}


// Insert the code into the document
var scr = document.createElement("script");
scr.type = 'text/javascript';
scr.textContent = '(' + container.toString() + ')();';
document.body.appendChild(scr);
