// ==UserScript==
// @name           MySpace - 100x100 Icon Killer
// @namespace      http://userscripts.org/people/774
// @description    Kills all those 100px icons on profiles. Author: InsaneNinja
// @include        http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&*
// ==/UserScript==

var icons = document.getElementsByTagName('img')

for (var i=0; i<icons.length; i++)
    if ( icons[i].width  > 90 && icons[i].width  < 106 ) // greater than 90 to avoid myspace photos.
    if ( icons[i].height > 90 && icons[i].height < 106 )
    if ( icons[i].src.indexOf('.myspace.') == -1 && icons[i].src.indexOf('.myspacecdn.') == -1 )
         icons[i].style.display = 'none';

// I doubt this will ever need upgrading. WooHoo!!