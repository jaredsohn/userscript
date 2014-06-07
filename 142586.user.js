// ==UserScript==
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @require       https://menshn.com/common/design/prototype.js
// @require       https://menshn.com/common/design/modalbox.js
// @name       menshn tweak chrome
// @version    0.107
// @description  Tweak to menshn input box so you can select characters/ranges, highlight your menshns a bit like v1, and do slightly dodgy menshn filtering by regex.
// @match      https://menshn.com/*
// @copyright  2012+, BlackAdder
// ==/UserScript==
var nick = jQuery('.topnavlink')[0].text.replace('//', '');
var regex = GM_getValue('regex', '');
var first_menshn_id = '';
jQuery('#chatbox').attr('onclick', '');
jQuery('#chatbox').die('click').live('click', function (e) { this.focus();if (this.value===this.defaultValue) {this.value='';}});


unsafeWindow.clip_buttons = function () {
    jQuery('a.tweakclip').remove();
    jQuery('.menshn').next().append("<a class='tweakclip' style='cursor:pointer'>clip</a>");
    jQuery('a.tweakclip').click( function () { jQuery(this).parents('.m').hide(); });
};

unsafeWindow.show_filter_dialog = function() {
    regex = GM_getValue('regex', '');
    unsafeWindow.Modalbox.show('<input type="text" name="tweakfilterregex" id="tweakfilterregex" value="' + regex + '"/><input type="button" id="tweakfilter" value="filter"/>', {title: "Filter out menshns:"});
};

unsafeWindow.tweak_ajax_complete = function() {
    var latest = jQuery('.m:first').attr('id');
    if (latest === first_menshn_id) {
        return;
    } else {
        first_menshn_id = latest;
    }

    jQuery('.m').each( function () {
        if (regex==='') {
            jQuery('.m').show();
            return false;
        }
        jQuery(this).show();
        var re = RegExp(regex);
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
    unsafeWindow.Modalbox.hide();
    GM_setValue('regex', regex);
    if (regex==='') {
        jQuery('.m').show();
        return;
    }
    var re = RegExp(regex);
    jQuery('.m').each( function () {
        jQuery(this).show();
        if (jQuery(this).text().search(re) !== -1) {
            jQuery(this).hide();
        }
    });
});

unsafeWindow.jQuery(document).ajaxComplete(function () {
    unsafeWindow.tweak_ajax_complete();
});


jQuery('a:first').after('<a href="#" onclick="show_filter_dialog()">Filter*</a>');
unsafeWindow.tweak_ajax_complete();