// ==UserScript==
// @name       Reddit dogecoin Comic Sans WTF 
// @namespace  http://manuel.luccalug.it
// @version    0.1
// @description  change reddit dogecoin font
// @match      http://www.reddit.com/r/dogecoin*
// @copyright  2014+, Manuel Mazzuola
// @grant      GM_addStyle
// ==/UserScript==

GM_addStyle ( "                                                    \
    a,p,div,input,button,h1,h2,h3,h4,h5,h6,h7,h8,h9,htothemooon {  \
        font-family:	Arial, sans-serif !important;              \
    }                                                              \
" );