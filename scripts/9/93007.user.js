// ==UserScript==
// @name           RightStuf-Search-Page-Search-Bar
// @include        http://www.rightstuf.com/*
// @namespace      http://userscripts.org/users/253805
// @description    Adds a search bar at the top of the store search results page on http://www.rightstuf.com/.
// ==/UserScript==

/*

This is a user-script for the online store Right Stuf: http://www.rightstuf.com/
It adds a search bar at the top of the store search results page.
This removes the need to go back to the main search form, or the main page, to search the store again.

*/

(function($)
{
    $(unsafeWindow.document).ready(function()
    {
        if (unsafeWindow.document.title == "Search Results")
        {
            var searchFormHtml = '<br />';
            searchFormHtml += '<div>';
            searchFormHtml += '<form name="searchStore" action="http://www.rightstuf.com/cgi-bin/catalogmgr/browse/link/t=search,c=right-stuf,v=right-stuf,w=submit,a=right-stuf-internati" method="post">';
            searchFormHtml += '<input type="text" height="10" value="" size="30" class="searchStoreField" name="input-title" id="storeSearch">';
            searchFormHtml += '<input type="hidden" value="enabled" name="use-title">';
            searchFormHtml += '<input type="hidden" value="1" name="select-title-1">';
            searchFormHtml += '<input type="submit" value="Search">';
            searchFormHtml += '</form>';
            searchFormHtml += '</div>';

            var searchHeaderContainer = $("h3.cathead").parent();
            searchHeaderContainer.prepend(searchFormHtml);
            searchHeaderContainer.prepend("<br />");
        }
    });
})(unsafeWindow.jQuery);