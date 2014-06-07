// ==UserScript==
// @name        Weibo Lite
// @namespace   http://yujiande.appspot.com
// @description Clear the webpage of weibo.com
// @include     *://weibo.com/*
// @version     1.0.2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
window.addEventListener("load", function() {
    // Hide left and right columns and bottom bar.
    var left = $('div.W_main_l');
    var right = $('div.W_main_r#Box_right');
    var bottom = $('div.global_footer');
    left.hide();
    right.hide();
    bottom.hide();
    // Add toggle buttons for hiden objects.
    function toggle(o) { o.is(':visible') ? o.hide() : o.show(); }
    var toggle_left = $('<button></button>').text('Left');
    var toggle_right = $('<button></button>').text('Right');
    var toggle_bottom = $('<button></button>').text('Bottom');
    toggle_left.click(function(){toggle(left);});
    toggle_right.click(function(){toggle(right);});
    toggle_bottom.click(function(){toggle(bottom);});
    var center = $('div.W_main_c#Box_center');
    center.before(toggle_left);
    center.before(toggle_right);
    center.before(toggle_bottom);
    // Hide ads.
    function hide_ads() {
        // Header ads
        $('div.pl_content_biztips').hide();
        $('div.tips_wrapper').hide();
        $('div.tips_player').hide();
        // Side ads
        $('div.W_rightModule').hide();
        $('div.M_activities').hide();
        $('div.M_abverArea').hide();
        $('div.adver_contB').hide();
        $('div.lbs_map').hide();
        $('div.pl_rightmod_ads36').hide();
        $('div.trustPagelet_recom_memberv5').hide();
        // Footer ads
        $('div.footer_adv').hide();
        $('div.footer_advbg').hide();
        $('div.adv_w980').hide();
        $('div.layer_tips').hide();
        $('div.layer_tips_version').hide();
        $('div.layer_tips_intro').hide();
        $('div.layer_tips_bg').hide();
        $('div.layer_tips_cont').hide();
        // Mid ads
        $('fieldset.up_line_ad').parent().hide();
        $('div.W_no_border').hide();
        // Bottom ads
        $('div.W_tips').hide();
        $('div.tips_error').hide();
    }
    // Try 10 times in 10 seconds.
    for (var i=0; i<10; ++i) {
        setTimeout(function(){hide_ads()}, 1000 * i);
    }
    // Try once per minute.
    //  setInterval(function(){hide_ads()}, 60000);
}, false);
