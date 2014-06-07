// ==UserScript==
// @name           Re-Color Google News
// @namespace      http://userscripts.org/users/fredp42
// @description    Restore the colors to Google News.
// @include        http://news.google.*
// @include        https://news.google.*
// ==/UserScript==

var sections = [
    "w", "#ffcc00", // world
    "n", "#000088", // national
    "b", "#008000", // business
    "e", "#663399", // entertainment
    "t", "#cc0000", // tech
    "s", "#ff6600", // sport
    "m", "#669999", // health
];

function set_section_style(section, color)
{
    GM_addStyle('.' + section + ' {border-top:thick solid ' + color + ';}');
}

function set_colors(lang)
{
    for (i = 0; i < sections.length; i = i + 2)
    {
        set_section_style('section-' + lang + '-' + sections[i], sections[i+1]);
    }
}

set_section_style('top-stories-section', '#ff4542;');
set_colors("fr_fr");
set_colors("en_us");
