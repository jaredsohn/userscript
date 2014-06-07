// ==UserScript==
// @name       BauDequoter
// @namespace  SalamandersScripts
// @match      http://broniesaustralia.com.au/showthread.php*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @version    2.0
// @description  Removes quoting stupidity
// ==/UserScript==


var jq = jQuery.noConflict(true);

//Hide all nested quotes
wrap_spoiler(jq("div[class='post_body'] > blockquote blockquote"), 'Quote');

//Hide all quoted videos
wrap_spoiler(jq("div[class='post_body'] > blockquote iframe"), 'Video');

//Put all quoted images in a spoiler-like block
wrap_spoiler(jq("div[class='post_body'] > blockquote img").filter(not_bau_smilie), 'Image');

function not_bau_smilie() {
    return /^\/?images\/smilies\//.test(jq(this).attr('src')) === false;
}

function wrap_spoiler(block, label) {
    var wrapped_elems = 
        block.wrap(
        function(index) {
            return '<div class="dequoter_spoiler">'
                +      '<div class="dequoter_spoiler_hide" style="display:none;" />'
                +  '</div>';
        });
    
    
    var top = wrapped_elems.closest('.dequoter_spoiler');
    
    top.prepend('<span>'
               +   '<strong>' + label + ' : </strong>'
               +   '<input type="button" value="Show" />'
               +'</span>');
    
    top.find('input').click(toggle_spoiler);
}

function toggle_spoiler() {
    var top = jq(this).closest('.dequoter_spoiler');
    
    var hide_block = top.find('> .dequoter_spoiler_hide');
    
    hide_block.toggle();
    
    if(hide_block.is(':hidden')) {
        jq(this).val('Show');
    }
    else {
        jq(this).val('Hide');
    }
}