// Check Translated Option
// version 1.0
// 2007-11-25 (last updated 2007-11-25)
// Author: Aaron McBride (http://www.apejet.org/aaron/)
// License: public domain (attribution appreciated)
// Description: Check the "Translated" option for Area Forecasts.
//
// Changes:
// 1.0 Initial release.  Just the basic function.
//
// ==UserScript==
// @name           Check Translated Option
// @namespace      ajm
// @description    Checks the "Translated" option for Area Forecasts.
// @include        http://adds.aviationweather.gov/tafs/
// ==/UserScript==

(function() {

var els = document.getElementsByName('std_trans');
for(var i = 0; i < els.length; i++)
{
    if(els[i].value == 'translated')
    {
        els[i].checked = true;
        break;
    }
}

})();
