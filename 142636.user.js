// ==UserScript==
// @require http://userscripts.org/scripts/source/68059.user.js
// @name       menshn tweak
// @version    0.106
// @description  Tweak to menshn input box so you can select characters/ranges, highlight your menshns a bit like v1, and do slightly dodgy menshn filtering by regex.
// @match      https://menshn.com/*
// @copyright  2012+, BlackAdder
// ==/UserScript==
var nick = jQuery('.topnavlink')[0].text.replace('//', '');
if (window.sessionStorage.getItem('tweakmenshn_regex') === null) { window.sessionStorage.setItem('tweakmenshn_regex', '')};
var regex = window.sessionStorage.getItem('tweakmenshn_regex');
var first_menshn_id = '';
jQuery('#chatbox').attr('onclick', '');
jQuery('#chatbox').die('click').live('click', function (e) { this.focus();if (this.value===this.defaultValue) {this.value='';}});
jQuery('div.menshn:contains(//' + nick + ')').css('background-color', '#FFDEA7');
jQuery('.alias:contains(' + nick + ')').next().css('background-color', '#EEB0B0');



window.clip_buttons = function () {
    jQuery('a.tweakclip').remove();
    jQuery('.menshn').next().append("<a class='tweakclip' style='cursor: pointer'>clip</a>");
    jQuery('a.tweakclip').click( function () { jQuery(this).parents('.m').hide(); });
};

window.show_filter_dialog = function() {
    regex = window.sessionStorage.getItem('tweakmenshn_regex');
    Modalbox.show('<input type="text" name="tweakfilterregex" id="tweakfilterregex" value="' + regex + '"/><input type="button" id="tweakfilter" value="filter"/>', {title: "Filter out menshns:"});
};

window.tweak_ajax_complete = function() {
    var latest = jQuery('.m:first').attr('id');
    if (latest === first_menshn_id) {
        return;
    } else {
        first_menshn_id = latest;
    }

    jQuery('div.menshn:contains(//' + nick + ')').css('background-color', '#FFDEA7');
    jQuery('.alias:contains(' + nick + ')').next().css('background-color', '#EEB0B0');
    jQuery('.m').each( function () {
        if (regex==='') {
            jQuery('.m').show();
            return false;
        }
        re = RegExp(regex);
        jQuery(this).show();
        if (jQuery(this).text().search(re) !== -1) {
            jQuery(this).hide();
    }
    });
};

// For temporary removal of menshn noise from the page without muting anyone.
// Refresh page to restore.
jQuery('a:first').after('<a href="#" onclick="clip_buttons();">Clip*</a>');

// For (crappy) temporary filtering of menshn noise from the page without muting/hiding.
jQuery("#tweakfilter").die('click').live('click', function () {
    regex = jQuery("#tweakfilterregex").val();
    Modalbox.hide();
    // GM_setValue('regex', regex);
    window.sessionStorage.setItem('tweakmenshn_regex', regex);
    if (regex==='') {
        jQuery('.m').show();
        return;
    }
    re = RegExp(regex);
    jQuery('.m').each( function () {
        jQuery(this).show();
        if (jQuery(this).text().search(re) !== -1) {
            jQuery(this).hide();
        }
    });
});

jQuery(document).ajaxComplete(function () {
    tweak_ajax_complete();
});


jQuery('a:first').after('<a href="#" onclick="show_filter_dialog()">Filter*</a>');
tweak_ajax_complete();