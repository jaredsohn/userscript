// ==UserScript==
// @name            Youtube Improvements
// @namespace       http://collingrady.com/
// @include         http://www.youtube.com/results*
// @include         https://www.youtube.com/results*
// @version         1.0.1
// @grant           none
// ==/UserScript==

(function () {
    var i, part, button, match;
    if (location.href.match(/.com\/results/) && location.search)
    {
        var buttons = [
            ["Date",   "video_date_uploaded"],
            ["Rating", "video_avg_rating"],
            ["Views",  "video_view_count"]
        ];

        var filter_top = document.getElementsByClassName("filter-top")[0];
        var filter_crumbs = document.getElementsByClassName("filter-crumb-list")[0];
        if (filter_top && filter_crumbs)
        {
            for (i = 0; i < buttons.length; i++)
            {
                button = createButton(buttons[i][0], buttons[i][1]);
                filter_top.insertBefore(button, filter_crumbs);
            }
        }

        var filter_area = document.getElementById("filter-dropdown");
        if (match = location.search.match(/(search_sort=(\w+))/))
        {
            var filters = filter_area.getElementsByClassName("filter-text");
            for (i = 0; i < filters.length; i++)
            {
                filters[i].setAttribute("href", filters[i].getAttribute("href")+"&"+match[1]);
            }

            var search_form = document.getElementById("masthead-search");
            if (search_form)
            {
                var sort_input = document.createElement("input");
                sort_input.setAttribute("type", "hidden");
                sort_input.setAttribute("name", "search_sort");
                sort_input.setAttribute("value", match[2]);
                search_form.appendChild(sort_input);
            }
        }
    }
})();

function createButton(text, sort_type)
{
    var query = parseQueryString();

    var button = document.createElement("a");
    button.className = "yt-uix-button yt-uix-button-hh-default yt-uix-button-short";
    if (query.search_sort == sort_type)
    {
        button.className += " yt-uix-button-toggled";
    }
    query.search_sort = sort_type;
    query.lclk = text.toLowerCase();

    button.setAttribute("href", "/results?"+buildQueryString(query));
    button.setAttribute("role", "button");
    button.style.cssFloat = "left";
    button.style.marginLeft = "5px";

    var button_text = document.createElement("span");
    button_text.className = "yt-uix-button-content";
    button_text.appendChild(document.createTextNode(text));
    button.appendChild(button_text);
    return button;
}

function parseQueryString()
{
    var query = {}, qstr = location.search.substr(1, location.search.length).split("&");
    for (i = 0; i < qstr.length; i++)
    {
        part = qstr[i].split("=");
        query[part[0]] = part[1];
    }
    delete query.gs_l;
    delete query.oq;
    return query;
}

function buildQueryString(query)
{
    var i, qstr = [];
    for (i in query)
    {
        qstr.push(i+"="+query[i]);
    }
    return qstr.join("&");
}