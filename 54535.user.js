// ==UserScript==
// @name          YouTube Tunes
// @fullname      YouTube Tunes
// @author        Chris Sabanty
// @version       0.11
// @namespace     http://www.chrissabanty.com
// @description   Adds a "Tunes" button to YouTube that helps find songs by excluding covers, live songs, remixes, and more.
// @include       http://*.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==


/**
 * Tries to find the global search input box. This can depend on the page
 * @return {DomTextInput|False} the search input or false if none is found
 */
function getSearchInput()
{
    var search_input = document.getElementById("masthead-search-term"); // main page, most pages
    if (search_input)
        { return search_input; }

    var search_inputs = document.getElementsByName("search_query"); // most user pages
    if (search_inputs)
        { return search_inputs[0]; }

    // let's try to get the first text input if there is one
    var text_inputs = document.getElementsByTagName("input");
    for (var i=0; i<text_inputs.length; i++)
    {
        var cur_input = text_inputs[i];
        if (cur_input.type == "text")
            { return cur_input}
    }
    return false;
}

/**
 * Determines if the page is a secondary user page
 * that has different styles and ids
 * @return {boolean}
 */
function isSecondaryUserPage()
{
    return !Boolean(document.getElementById("masthead-search-term"));
}

var search_forms = document.getElementsByName("searchForm");
if (search_forms)
{
    var s_form = search_forms[0];
    var secondary_user_page = isSecondaryUserPage();
    if (!secondary_user_page)
        { s_form.style.marginRight = "75px"; } // change form style from 100px to accomodate button

    // create the tunes button
    tunes_button = document.createElement('a');
    tunes_button.id = "youtube_tunes_search";
    tunes_button.href = "#";
    tunes_button.innerHTML = "<span>Tunes</span>";
    tunes_button.className = "yt-button";
    if (!secondary_user_page) { tunes_button.className += " yt-button-primary"; }


    // create the event handler for when the tunes button is clicked
    var submit_with_tunes = function()
    {
        var search_input = getSearchInput();
        if (search_input) {
            search_input.value += ' -live -cover -remix -instrumental -acoustic -"guitar lesson" -"guitar hero" -"rock band" -chopped -screwed';
        }
        document.getElementsByName("searchForm")[0].submit();
        return false;
    }
    tunes_button.addEventListener("click", submit_with_tunes, true);

    // add the button to the page
    s_form.appendChild(tunes_button);
}