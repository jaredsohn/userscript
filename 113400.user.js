// ==UserScript==
// @name          BYE BYE Silly Volusion Category Page Tabs
// @author        Marc Knobler
// @version       v1 / 2011.09.18
// @description   Removes default Volusion tabs on Volusion V11 and returns to W09 style on category pages
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       */admin/AdminDetails_Generic.asp?table=Categories*
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
// Cookie plugin Copyright (c) 2006 Klaus Hartl (stilbuero.de)
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
jQuery('#AdvancedTabGroup_CategoryDesc_').before('<div class="a65chromepanel"><div id="tab_CategoryDesc" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Category Descriptions</span><span id="arrow_CategoryDesc" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');

jQuery('#AdvancedTabGroup_SEO_').before('<div class="a65chromepanel"><div id="tab_SEO" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Search Engine Optimization</span><span id="arrow_SEO" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');

jQuery('#AdvancedTabGroup_CategoryDisplay_').before('<div class="a65chromepanel"><div id="tab_CategoryDisplay" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Category Display</span><span id="arrow_CategoryDisplay" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');

jQuery('#AdvancedTabGroup_SubcategoryDisplay_').before('<div class="a65chromepanel"><div id="tab_SubcategoryDisplay" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Subcategory Display</span><span id="arrow_SubcategoryDisplay" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');

jQuery('#AdvancedTabGroup_ProductDisplay_').before('<div class="a65chromepanel"><div id="tab_ProductDisplay" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Product Display</span><span id="arrow_ProductDisplay" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');

jQuery('#AdvancedTabGroup_Misc_').before('<div class="a65chromepanel"><div id="tab_Misc" class="a65chromeheader_advanced"><div class="a65chromeheader_right"><div class="a65chromeheader_left"><span class="a65chromeheadertext">Misc</span><span id="arrow_Misc" class="arrow_link"></span><span class="a65chromesubtext"></span></div></div></div></div>');

//add clickable headers to each section

//check cookie and preset tabs
var tab_selected= jQuery.cookie('ctab_selected');
if (tab_selected == null) {tab_selected=''}

if (tab_selected.indexOf('1') !=-1)
{
jQuery('#AdvancedTabGroup_CategoryDesc_').toggle("fast");
jQuery('#tab_CategoryDesc').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('2') !=-1)
{
jQuery('#AdvancedTabGroup_SEO_').toggle("fast");
jQuery('#tab_SEO').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('3') !=-1)
{
jQuery('#AdvancedTabGroup_CategoryDisplay_').toggle("fast");
jQuery('#tab_CategoryDisplay').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('4') !=-1)
{
jQuery('#AdvancedTabGroup_SubcategoryDisplay_').toggle("fast");
jQuery('#tab_SubcategoryDisplay').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('5') !=-1)
{
jQuery('#AdvancedTabGroup_ProductDisplay_').toggle("fast");
jQuery('#tab_ProductDisplay').find(".arrow_link").toggleClass("active_");
}
if (tab_selected.indexOf('6') !=-1)
{
jQuery('#AdvancedTabGroup_Misc_').toggle("fast");
jQuery('#tab_Misc').find(".arrow_link").toggleClass("active_");
}

//check cookie and preset tabs

//toggle tabs per user click
jQuery('#tab_CategoryDesc').click(function() {
jQuery('#AdvancedTabGroup_CategoryDesc_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_CategoryDesc").hasClass ("active_")) {
		tab_selected+= '1';
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/1/g,'');
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_SEO').click(function() {
jQuery('#AdvancedTabGroup_SEO_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_SEO").hasClass ("active_")) {
		tab_selected+= '2';
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/2/g,'');
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_CategoryDisplay').click(function() {
jQuery('#AdvancedTabGroup_CategoryDisplay_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_CategoryDisplay").hasClass ("active_")) {
		tab_selected+= '3';
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/3/g,'');
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_SubcategoryDisplay').click(function() {
jQuery('#AdvancedTabGroup_SubcategoryDisplay_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_SubcategoryDisplay").hasClass ("active_")) {
		tab_selected+= '4';
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/4/g,'');
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_ProductDisplay').click(function() {
jQuery('#AdvancedTabGroup_ProductDisplay_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_ProductDisplay").hasClass ("active_")) {
		tab_selected+= '5';
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/5/g,'');
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});

jQuery('#tab_Misc').click(function() {
jQuery('#AdvancedTabGroup_Misc_').toggle("fast");
jQuery(this).find(".arrow_link").toggleClass("active_");
		if (jQuery("#arrow_Misc").hasClass ("active_")) {
		tab_selected+= '6';
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
		else
		{
		tab_selected=tab_selected.replace(/6/,'');
		$.cookie('ctab_selected', tab_selected, { expires: 3650, path: '/' });
		}
});
//toggle tabs per user click