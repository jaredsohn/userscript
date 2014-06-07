// ==UserScript==
// @name          panoramio_wide_upload_file_names
// @namespace     https:www.tranzoa.net/~alex
// @description	  Make Panoramio upload page file names' fields wide
// @include       http://www.panoramio.com/upload*
// ==/UserScript==
//
//      July 17, 2011           bar
//
//

(function()
{
    var els = document.getElementsByTagName('INPUT');

    for (var i = 0; i < els.length; ++i)
    {
        var el  = els[i];
        var a   = el.getAttribute('type');
        if (a === 'file')
        {
            a   = el.getAttribute('id');
            if (a.substr(0, 3) === 'img')
            {
                el.setAttribute("size", '80');
            }
        }
    }
})()



/* eof */

