// ==UserScript==
// @name           Popmundo no readonly input
// @description    Popmundo: no readonly input in stagename change
// @include        http://www*.popmundo.com/Common/Artist.asp?action=SetStageName&ArtistID=*
// ==/UserScript==

var input = document.getElementByName('StageName');
if(input)
input.readonly = false;
else
alert('Cannot find input field.');