// ==UserScript==
// @name Google Search Results Style Revert
// @version     1.1.0
// @description Restore the styling of the google search links.
// @include     http://www.google.*/
// @include     http://www.google.*/?*
// @include     http://www.google.*/#*
// @include     http://www.google.*/search*
// @include     http://www.google.*/webhp*
// @include     https://www.google.*/
// @include     https://www.google.*/?*
// @include     https://www.google.*/#*
// @include     https://www.google.*/search*
// @include     https://www.google.*/webhp*
// @include     https://encrypted.google.*/
// @include     https://encrypted.google.*/?*
// @include     https://encrypted.google.*/#*
// @include     https://encrypted.google.*/search*
// @include     https://encrypted.google.*/webhp*

// @grant       GM_addStyle \

// ==/UserScript==
+function(){
    var s = document.createElement('style');
    s.textContent  = '\
    #res h3, \
    #res h3.r, \
    div.nrg-title, \
    div.nrg-title > a, \
    .normal-header div.rg-header, \
    ._Dn, \
    ._Dn a, \
    .spell \
    { \
        font-size: 16px!important; \
    } \
 \
    ._Yc \
    { \
        font-size: 14px!important; \
    } \
 \
    #newsbox span.tl > a.l \
    { \
        font-size: 13px!important; \
    } \
 \
    #newsbox span.tl > a em, \
    #res h3.r a em \
    { \
        color: inherit!important; \
    } \
 \
    .s \
    { \
        color: #000!important; \
    } \
 \
    ol#rso h3.r a, \
    #rso span.tl a, \
    div.nrg-title, \
    div.nrg-title > a, \
    #res h3 \
    { \
        text-decoration: underline!important; \
    } \
 \
    #res h3, \
    #newsbox span.tl > a.l, \
    #ires ._Um, \
    #rso .r \
    { \
        margin-bottom: 0!important; \
    } \
 \
    ._pz .scim, \
    ._pz .nscim, \
    #topstuff qb-bmqc \
    { \
        margin: 0!important; \
    } \
 \
    ._pz \
    { \
        margin-top: 5px!important; \
    } \
 \
    #topstuff hr.rgsep, \
    #taw hr.rgsep \
    { \
       margin: 10px 0 !important; \
    } \
\
    ol#rso h3.r a, \
    #rso span.tl a, \
    .nrg-title \
    { \
        padding-bottom: 0!important; \
    } \
 \
    li.g \
    { \
        margin-bottom: 16px!important; \
    } \
 \
    ol#rso h3.r a, \
    #rso span.tl a \
    { \
        line-height: 1!important; \
        border-bottom: none!important; \
    } \
\
    #qb-msic, \
    #qb-mstc \
    { \
        height: 90px!important; \
    }';

    document.head.appendChild(s);
}();