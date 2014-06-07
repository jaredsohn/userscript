// ==UserScript==
// @name           Delicious Links Cleaner
// @namespace      http://www.maisdisdonc.com
// @description    Delicious Links Cleaner remove all your bookmarks. IMPORTANT ! Uninstall this script after cleaning.
// @include        http://www.delicious.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @author         Merimac
// @version        1.0.0
// @date           14:43 28/12/2011
// @license        Creative Commons Attribution-NonCommercial-ShareAlike 2.0 France
// ==/UserScript==

(function () {
        jQuery(document).ready(function () {
                jQuery("#allCheck").attr("checked", true);
                jQuery(".controls input[type='checkbox']").attr('checked', true);
                jQuery("#bulkEditActions").children()[5].click();
                jQuery(".btn.green-txt")[1].click();
    });
})();
