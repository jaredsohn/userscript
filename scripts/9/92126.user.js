(function () {

// ==UserScript==
// @name Clicks reductor for Facebook profiles
// @author v.Almeida (vitoralmeida.com.br)
// @version 0.11
// @namespace http://www.facebook.com
// @description make fewer clicks in the new facebook profile (by vitoralmeida.com.br)
// @match http://*.facebook.com/*
// @match http://www.facebook.com/*
// @run-at document-end
// ==/UserScript==

function triggerStream()
{

    var pagelet = document.getElementById('pagelet_composer');
    var profile_stream = document.getElementById('profile_stream');


    if ( pagelet )
    {
        pagelet.getElementsByTagName('span')[1]['onclick']();
    }

    if ( profile_stream )
    {
        profile_stream.getElementsByTagName('span')[1]['onclick']();
    }
}  
    function add_style(css) 
    {

        if (typeof GM_addStyle !== 'undefined') 
        {
            return GM_addStyle(css);
        }
        else if (heads = document.getElementsByTagName('head')) 
        {
            var style = document.createElement('style');
            try { style.innerHTML = css; }
            catch(x) { style.innerText = css; }
            style.type = 'text/css';
            style.id = 'clicks_reductor_ads';
            heads[0].appendChild(style);
        }
    }


    var css = "\
#sidebar_ads {padding:0;}\
#sidebar_ads .adcolumn .adcolumn_header, #rightCol{display:none;}\
#ssponsor{display:none;}\
#sidebar_ads .adcolumn .more_ads{display:none;}\
#sidebar_ads .adcolumn{display:none;}\
#home_sponsor_nile{display:none;}\
";


onloadRegister(function(){ add_style(css);});
var tX = window.setInterval('triggerStream()', 1500);
})();