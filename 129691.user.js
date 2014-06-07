// ==UserScript==
// @name           Google Reader Compact/Full Screen Mode
// @namespace      http://danielj.se
// @author         MaTachi
// @description    Removes the top bars in Google Reader to make more room for your feed reading.
// @include        /^https?://(www.)?google\.[a-z.]{2,10}/reader/.*$/
// @version        2.1
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
(function() {

// This CSS code was in version 1.0 of the script and makes the GUI compact.
var guiCss = " \
    #gb, #logo-section { \
        display: none; \
    } \
    #logo-section + #lhn-add-subscription-section #lhn-add-subscription { \
        top: 17px; \
    } \
    #logo-section + #lhn-add-subscription-section { \
        height: 30px; \
    } \
    #lhn-add-subscription { \
        height: 20px; \
        line-height: 20px; \
        background-color: #BBB; \
        background-image: -moz-linear-gradient(center top , #B0B0B0, #BBB); \
        margin-left: 5px; \
    } \
    #viewer-header { \
        height: 30px; \
    } \
    #viewer-top-controls { \
        padding: 3px 3px 0; \
    } \
    .jfk-button, .goog-flat-menu-button, .goog-button-base-inner-box { \
        height: 20px; \
        line-height: 20px; \
    } \
    .goog-button-base-content { \
        padding-top: 2px; \
    } \
";

// This CSS code was added in version 2.0 of the script and is dependent on
// guiCss. All this code is needed to make the Search button and the Search
// panel pretty.
var serachCss = " \
    #lhn-add-search { \
        height: 20px; \
        position: relative; \
        left: 100px; \
        line-height: 20px; \
        background-color: rgb(187, 187, 187); \
        background-image: -moz-linear-gradient(center top , #b0b0b0, #bbbbbb); \
        margin-left: 5px; \
    } \
    .jfk-button-primary:hover{ \
        -webkit-box-shadow:0 1px 1px rgba(0,0,0,0.2); \
        -moz-box-shadow:0 1px 1px rgba(0,0,0,0.2); \
        box-shadow:0 1px 1px rgba(0,0,0,0.2); \
        background-color:#c53727; \
        background-image:-webkit-linear-gradient(top,#dd4b39,#c53727); \
        background-image:-moz-linear-gradient(top,#dd4b39,#c53727); \
        background-image:-ms-linear-gradient(top,#dd4b39,#c53727); \
        background-image:-o-linear-gradient(top,#dd4b39,#c53727); \
        background-image:linear-gradient(top,#dd4b39,#c53727); \
        border:1px solid #b0281a; \
        border-bottom-color:#af301f \
    } \
    #search-panel { \
        position: absolute; \
        top: 26px; \
        left: 110px; \
        width: 600px; \
        padding: 20px; \
        background-color: #f7f7f7; \
        border: 1px solid #d0d0d0; \
    } \
    .display-none { \
        display: none; \
    } \
    #quick-add-close2 { \
        position: absolute; \
        top: 4px; \
        right: 4px; \
        cursor: pointer; \
        height: 9px; \
        width: 9px; \
        background: url('/reader/ui/939333013-close-box.gif') \
                    no-repeat scroll 0% 0% transparent; \
    } \
";

if (typeof GM_addStyle != "undefined") {
    // Adding guiCss is enough for making the GUI compact.
    GM_addStyle(guiCss);
    // Adding serachCss is necessary to make the Search button and panel look
    // pretty.
    GM_addStyle(serachCss);
}

// Create and add the search button to the right of the "SUBSCRIBE" button.
createSearchButton();

// Create the search panel, which appears when you click on the Search button.
// Also store a reference to the panel.
var searchPanel = createSearchPanel();

// Create the search button.
function createSearchButton() {
    let searchButton = $('<span tabindex="0" style="-moz-user-select: none; '
                       + 'left: 105px;" role="button" id="lhn-add-subscription"'
                       + ' class="jfk-button-primary jfk-button">Search'
                       + '</span>');
    searchButton.bind("click", showSearchPanel);
    $("#lhn-add-subscription-section").append(searchButton);
}

// Create the search panel. This panel contains the search form.
function createSearchPanel() {
    // Create the panel.
    searchPanel = $('<div id="search-panel" class="display-none"> </div>');
    searchPanel.appendTo("body");
    // Get the search field.
    let searchForm = $("#gbqf");
    searchPanel.append(searchForm);
    // Add a close button to the search form.
    let closeButton = $('<div id="quick-add-close2"> </div>')
                      .appendTo(searchForm);
    closeButton.bind("click", showSearchPanel);

    return searchPanel;
}

// Called when the search button is pressed.
function showSearchPanel() {
    // Toggle between hidden and not.
    if (searchPanel.hasClass("display-none")) {
        searchPanel.removeClass("display-none");
    } else {
        searchPanel.addClass("display-none");
    }
}
})();
