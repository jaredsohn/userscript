// ==UserScript==
// @name		InGo NocNoc
// @namespace		http://ingo.bugs3.com/scripts
// @version		0.4.1
// @description		Naughty Scanner	
// @include        	https://apps.facebook.com/inthemafia/*
// @include        	http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        	https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          	http://apps.facebook.com/inthemafia/*
// @match          	https://apps.facebook.com/inthemafia/*
// @match          	http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          	https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require             http://code.jquery.com/ui/1.10.0/jquery-ui.js
// @grant		GM_info
// ==/UserScript==

function GM_main ($) {
    alert ('jQuery is installed with no conflicts! The version is: ' + $.fn.jquery);
    alert ('jQuery UI is installed with no conflicts! The version is: ' + $.fn.ui.version);
}

function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.9.0";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}



// -----------------------------------------------------------------


// Function inserIcon()
function insertIcon() {
    if(document.getElementById("quest_bar")) {
        console.log("quest_bar founded!");
        var $ingo_icon = $('<li id="ingo_quest_icon"></li>');
        $('#quest_bar ul').prepend($ingo_icon);
        var $ingo_icon_img = $('<div title="Ingo NocNoc" style="width:50px;" onclick="toggleIngo(></div>');
        var $ingo_a = $('<a class="quest_icon"></a>');
        $('#ingo_quest_icon').prepend($ingo_icon_img);
        $('#ingo_quest_icon div').prepend($ingo_a);
        $('#ingo_quest_icon div .quest_icon').css('background-image', 'url("http://ingo.bugs3.com/images/ingo_icon_36.png")');
        $('#ingo_quest_icon div .quest_icon').css('background-repeat', 'no-repeat');
        $('.quest_icon').append('<span></span>');
        if($('#demon_frame_quest_icon')){
            $('#demon_frame').css('display','none!important');
        }
    } 
}

// Function createIngoFrame()
function createIngoFrame() {
    if($('#VirtualCardFormPromos')) {
        var $ingo_frame = $("<div id='ingo_frame' class='empire_main_module' style='display:none;'></div>");
        $('#content_row').before($ingo_frame);
        var $clearfix = $("<div class='clearfix' style='width: 745px;'></div>");
        $('#ingo_frame').prepend($clearfix);
        $('.clearfix').append("<table style='border:0px;padding:0px;border-collapse:collapse;'>");
        $('.clearfix').append("<div></div>"); //.css('float','left';'background','url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/empire/shadow_lower_left.png") repeat scroll 0% 0% transparent';'height','8px';'width','8px');        
        var $clear_both = $("<div style='clear:both;'></div>");
        $('.clearfix').append($clear_both);
    }
}

// ############################################################################
//  MAIN
// ############################################################################
 
// load jQuery
if (typeof GM_info !== "undefined") {
    console.log ("Running with local copy of jQuery!");
    GM_main ($);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.9.0");
}

// insert IngoNocNoc icon in quest_bar
insertIcon();

// create InGo NocNoc frame
createIngoFrame();

