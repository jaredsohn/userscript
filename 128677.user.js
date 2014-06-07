// ==UserScript==
// @name           TeamLiquid Popout
// @description    Add link to poped out streams
// @include        http://www.teamliquid.net/*
// ==/UserScript==


function refreshCalLinks() {
    refreshCalendar();
    addpoplinks();
}

function refreshStreamsLinks() {
    refreshStreams();
    addpoplinks();
}

function addpoplinks() {
    a = document.getElementById('calendar_mdiv');
    a.innerHTML = a.innerHTML.replace(/<a.*? href="(\/video\/streams\/.+?)" title.*?<\/a>/g, '$&<a style="margin-left:10px" href="$1/popout" target="_blank">[▒]</a>');
    a = document.getElementById('streams_content');
    a.innerHTML = a.innerHTML.replace(/<a.*? href="(\/video\/streams\/.+?)".*?<\/a>/g, '$&<a style="margin-left:10px" href="$1/popout" target="_blank">[▒]</a>');
}

a = document.getElementById('calendar_mdiv');
a.innerHTML = a.innerHTML.replace(/return refreshCalendar\(\)/, 'return refreshCalLinks()');
a = document.getElementById('streams_content');
a.innerHTML = a.innerHTML.replace(/return refreshStreams\(\)/, 'return refreshStreamsLinks()');
addpoplinks();
