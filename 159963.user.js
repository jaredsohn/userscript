// ==UserScript==
// @author          Paranoya and Bubo
// @name            DSW
// @namespace       DSW
// @description     Dark Side Wolves
// @version         1.0.1 
// @match           http://www.erepublik.com/en
// @match           https://www.erepublik.com/en
// @match           http://www.erepublik.com/mk
// @match           https://www.erepublik.com/mk
// @include         http://www.erepublik.com/en
// @include         https://www.erepublik.com/en
// @include         http://www.erepublik.com/mk
// @include         https://www.erepublik.com/mk
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require         http://erep-udar.info/stats/macedonian-language.js
// @downloadURL     http://userscripts.org/scripts/source/154935.user.js
// @updateURL       http://userscripts.org/scripts/source/154935.meta.js
// ==/UserScript==

var announce_config        = { };
var announce_images        = {
    'heading_bgr'                               : 'data:image/png;base64,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',
    'header_bgr_diag'                           : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAAGXy9/eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAERJREFUeNpiuHfvXgNAADH8//+fASCAwASIBxBAjCAGEwMQAAQQXAhEAwQQWBgGmBiQAAoHIMBQ9CBjFA6yAgZ0lTAFAC+XUWZV8Fx2AAAAAElFTkSuQmCC'
}

function announce_loading() {
    //console.log('Checking for jQuery ...');
    if (typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(announce_loading, 100); 
        return false;
    } else {
        announce_init();
    }
    return true;
}
announce_loading();

function announce_init() {
    //console.log('Loading script ...');
    if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }
    announce_init_styles();
    announce_init_blocks();
}

function announce_init_blocks() {
    if ($('#orderContainer').length > 0) {
        //console.log('Loading blocks ...');
        announce_blocks();  
        
        GM_xmlhttpRequest({
            method  : 'Get',
            url     : 'http://erep-udar.info/stats/announce.php',
            onload:function(data) {
                if (data.responseText) {
                    try {
                        var responce = jQuery.parseJSON(data.responseText);
                        
                        if (responce.messages && responce.messages.message && responce.messages.status) {
                            $('.announce-blocks-marquee').html(responce.messages.message);
                        } else {
                            $('.announce-blocks-marquee').html('-');
                        }
                    } catch (error) {
                        
                    }
                }
            }
        });
    }
}

function announce_blocks() {
    $('#content').prepend('<div id="announce-blocks-panel"></div><div style="clear:both;"></div>');
    $('#announce-blocks-panel').append('<div class="announce-blocks-announces"></div>');
        $('#announce-blocks-panel').find('div.announce-blocks-announces').append('<div class="announce-blocks-separator"></div>');
        $('#announce-blocks-panel').find('div.announce-blocks-announces').append('<div class="announce-annouces-content"></div>');
            $('#announce-blocks-panel').find('div.announce-annouces-content').append('<h1>DSW HQ:</h1>');
            $('#announce-blocks-panel').find('div.announce-annouces-content').append('<div class="announce-blocks-marquee">-</div>');
            $('#announce-blocks-panel').find('div.announce-annouces-content').append('<div class="clear"></div>');
        $('#announce-blocks-panel').find('div.announce-blocks-announces').append('<div class="announce-blocks-separator"></div>');
        
    $('.forge-blocks-announces').hide();
}

function announce_init_styles() {
    //console.log('Loading styles ...');
    //Common 
    GM_addStyle(".force-left { float:left !important; }");
    GM_addStyle(".force-right { float:right !important; }");
        
    // Forge blocks panel\
    GM_addStyle("#announce-blocks-panel { margin:0px 0px 10px 0px; } ");
    GM_addStyle(".announce-blocks-heading { background: url(" + announce_images['heading_bgr'] + ") left top repeat-x; }");
    GM_addStyle(".announce-blocks-heading h1 { display: inline; background: white; margin: 0; padding-right: 10px; } ");
    GM_addStyle(".announce-blocks-separator { display: block; height:8px; background: url(" + announce_images['heading_bgr'] + ") left bottom repeat-x; } ");
    GM_addStyle('.announce-blocks-panels { width:760px; max-height:180px; overflow:hidden; }');
    GM_addStyle(".announce-annouces-content h1 { float:left; margin:0px 0px 6px 0px; line-height:20px; display:inline-block; font-weight:normal; } ");
    GM_addStyle(".announce-annouces-content .announce-blocks-marquee {font-weight:bold; margin:4px 0px 0px 10px; display:inline-block; width:658px; float:left; line-height:normal; overflow:hidden; } ");    
}


// Helper functions ...
function translate(s) {
    var string = lang_strings[s];    
    if (typeof string !== 'undefined') {
        return string;
    }
    return s;    
}