// Copyright (c) 2011, Marc Knobler (m.knobler@gmail.com)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------


// ==UserScript==
// @name          BYE BYE Silly Volusion Product Page Tabs
// @author        Marc Knobler
// @version       v1 / 2011.09.18
// @description   Removes default Volusion tabs on Volusion V11 and returns the W09 style
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       */admin/AdminDetails_Generic.asp?table=Products_Joined*
// ==/UserScript==

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
// Cookie plugin Copyright (c) 2006 Klaus Hartl (stilbuero.de)

GM_addStyle(".a65chromeheader_advanced {background: url(\"/a/a/65/i/chrome_header.gif\") repeat-x scroll 0 0 transparent; cursor: pointer; height: 39px; }");
GM_addStyle(".active_ {background: url(\"/a/a/65/i/shadow_down_arrow.png\") no-repeat scroll 22px 13px transparent; }");
GM_addStyle(".AdvancedGroupPanel { padding: 0px 20px 0px 20px; }");

//remove Volusion styling
jQuery('.AdvancedTabPanel').remove();
jQuery('[id^="AdvancedTabGroup"]').removeClass('AdvancedTabGroup');
jQuery('[id^="AdvancedTabGroup"]').css('display','none');
jQuery('[id^="AdvancedTabGroup"]').each(function(){
var currentId = $(this).attr('id');
jQuery(this).attr('id', currentId + '_');
});

//add clickable headers to each section
jQuery('#AdvancedTabGroup_SEO_').before('<div class="a65chromepanel"><div id="tab_Seo" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Search Engine Optimization</span><span id="arrow_Seo" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Pricing_').before('<div class="a65chromepanel"><div id="tab_Pricing" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Pricing</span><span id="arrow_Pricing" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Shipping_').before('<div class="a65chromepanel"><div id="tab_Shipping" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Shipping</span><span id="arrow_Shipping" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Descriptions_').before('<div class="a65chromepanel"><div id="tab_Descriptions" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Product Descriptions</span><span id="arrow_Descriptions" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Display_').before('<div class="a65chromepanel"><div id="tab_Display" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Product Display</span><span id="arrow_Display" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Misc_').before('<div class="a65chromepanel"><div id="tab_Misc" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Misc</span><span id="arrow_Misc" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_ThirdParty_').before('<div class="a65chromepanel"><div id="tab_ThirdParty" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">3rd Party Integrations</span><span id="arrow_ThirdParty" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_CustomFields_').before('<div class="a65chromepanel"><div id="tab_CustomFields" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Custom Fields</span><span id="arrow_CustomFields" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Recurring_').before('<div class="a65chromepanel"><div id="tab_Recurring" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Recurring Pricing</span><span id="arrow_Recurring" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_PricingLevels_').before('<div class="a65chromepanel"><div id="tab_PricingLevels" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Pricing Levels</span><span id="arrow_PricingLevels" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Stock_').before('<div class="a65chromepanel"><div id="tab_Stock" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Stock</span><span id="arrow_Stock" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
jQuery('#AdvancedTabGroup_Vendor_').before('<div class="a65chromepanel"><div id="tab_Vendor" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Vendors</span><span id="arrow_vendors" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');
//add clickable headers to each section

//check cookie and preset tabs
var tab_selected= jQuery.cookie('tab_selected');
if (tab_selected == null) {tab_selected=''}

if (tab_selected.indexOf('1') !=-1)
{
jQuery('#AdvancedTabGroup_SEO_').toggle("fast");
jQuery('#tab_Seo').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('2') !=-1)
{
jQuery('#AdvancedTabGroup_Pricing_').toggle("fast");
jQuery('#tab_Pricing').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('3') !=-1)
{
jQuery('#AdvancedTabGroup_Shipping_').toggle("fast");
jQuery('#tab_Shipping').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('4') !=-1)
{
jQuery('#AdvancedTabGroup_Descriptions_').toggle("fast");
jQuery('#tab_Descriptions').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('5') !=-1)
{
jQuery('#AdvancedTabGroup_Display_').toggle("fast");
jQuery('#tab_Display').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('6') !=-1)
{
jQuery('#AdvancedTabGroup_Misc_').toggle("fast");
jQuery('#tab_Misc').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('7') !=-1)
{
jQuery('#AdvancedTabGroup_ThirdParty_').toggle("fast");
jQuery('#tab_ThirdParty').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('8') !=-1)
{
jQuery('#AdvancedTabGroup_CustomFields_').toggle("fast");
jQuery('#tab_CustomFields').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('9') !=-1)
{
jQuery('#AdvancedTabGroup_Recurring_').toggle("fast");
jQuery('#tab_Recurring').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('a') !=-1)
{
jQuery('#AdvancedTabGroup_PricingLevels_').toggle("fast");
jQuery('#tab_PricingLevels').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('b') !=-1)
{
jQuery('#AdvancedTabGroup_Stock_').toggle("fast");
jQuery('#tab_Stock').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('c') !=-1)
{
jQuery('#AdvancedTabGroup_Vendor_').toggle("fast");
jQuery('#tab_Vendor').find(".arrow_link").toggleClass("active_");
}
//check cookie and preset tabs

//toggle tabs per user click
//jQuery('#tab_Seo').find(".arrow_link").toggleClass("active_");
//jQuery('[id^="AdvancedTabGroup_SEO_"]').toggle();
		
jQuery('#tab_Seo').click(function() {
jQuery('#AdvancedTabGroup_SEO_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Seo").hasClass ("active_")) {
		tab_selected+= '1';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/1/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_Pricing').click(function() {
jQuery('#AdvancedTabGroup_Pricing_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Pricing").hasClass ("active_")) {
		tab_selected+= '2';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/2/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_Shipping').click(function() {
jQuery('#AdvancedTabGroup_Shipping_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Shipping").hasClass ("active_")) {
		tab_selected+= '3';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/3/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_Descriptions').click(function() {
jQuery('#AdvancedTabGroup_Descriptions_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Descriptions").hasClass ("active_")) {
		tab_selected+= '4';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/4/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_Display').click(function() {
jQuery('#AdvancedTabGroup_Display_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Display").hasClass ("active_")) {
		tab_selected+= '5';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/5/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_Misc').click(function() {
jQuery('#AdvancedTabGroup_Misc_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Misc").hasClass ("active_")) {
		tab_selected+= '6';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/6/,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_ThirdParty').click(function() {
jQuery('#AdvancedTabGroup_ThirdParty_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_ThirdParty").hasClass ("active_")) {
		tab_selected+= '7';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/7/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_CustomFields').click(function() {
jQuery('#AdvancedTabGroup_CustomFields_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_CustomFields").hasClass ("active_")) {
		tab_selected+= '8';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/8/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_Recurring').click(function() {
jQuery('#AdvancedTabGroup_Recurring_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Recurring").hasClass ("active_")) {
		tab_selected+= '9';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/9/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_PricingLevels').click(function() {
jQuery('#AdvancedTabGroup_PricingLevels_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_PricingLevels").hasClass ("active_")) {
		tab_selected+= 'a';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/a/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}	
});

jQuery('#tab_Stock').click(function() {
jQuery('#AdvancedTabGroup_Stock_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Stock").hasClass ("active_")) {
		tab_selected+= 'b';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/b/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}	
});

jQuery('#tab_Vendor').click(function() {
jQuery('#AdvancedTabGroup_Vendor_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");

		if (jQuery("#arrow_vendors").hasClass ("active_")) {
		tab_selected+= 'c';
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/c/g,'');
		$.cookie('tab_selected', tab_selected, { expires: 3650, path: '/' });
		}	

});
//toggle tabs per user click






