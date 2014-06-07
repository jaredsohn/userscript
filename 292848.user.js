// ==UserScript==
// @name            [TS] TESNexus Redirect
// @namespace       TimidScript
// @description     Redirects TESNexus to Oblivion nexusmods
// @include         http://www.tesnexus.com/*
// @include         http://tesnexus.com/*
// @run-at          document-start
// @version         1.0.1
// @icon             data:image/gif;base64,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
// @grant           none
// ==/UserScript==


/*
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/292848

------------------------------------
 Version History
------------------------------------
1.0.1 (2013/01/22)
 - Initial Release
********************************************************************************************/

//http://wwww.tesnexus.com/mods/
//http://www.tesnexus.com/downloads/file.php?id=*
var id = document.URL.replace(/http:\/\/(www\.)?tesnexus\.com\/mods\/(\d+)($|\/.+)/, "$2");
if (isNaN(id))
    id = document.URL.replace(/http:\/\/(www\.)?tesnexus\.com\/downloads\/file\.php\?id=(\d+)[^\d]+/, "$2");

if (!isNaN(id)) document.location.assign( "http://www.nexusmods.com/oblivion/mods/" + id);

