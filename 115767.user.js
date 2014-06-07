// ==UserScript==
// @name          Old playlist editing page
// @author        TheGreshProject
// @description	  Takes you from the retarded new editing page to the old one.
// @include       http://youtube.com/
// @include       http://www.youtube.com/playlist?action_edit=1&list=
// @include       https://youtube.com/
// @include       https://www.youtube.com/playlist?action_edit=1&list=
// ==/UserScript==

function ()
    {
        location.href = location.href.replace(/http://www.youtube.com/playlist?action_edit=1&list=\:/, 'http://www.youtube.com/my_playlists?p=');
    }
function ()
    {
        location.href = location.href.replace(/https://www.youtube.com/playlist?action_edit=1&list=\:/, 'https://www.youtube.com/my_playlists?p=');
    }