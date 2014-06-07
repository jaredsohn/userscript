// ==UserScript==
// @name           Nordbayern Plus
// @version        0.0.2.0
// @namespace      http://www.rhofmann.eu
// @description    Center and beautify nordbayern.de
// @author         Robert Hofmann
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @history        0.0.1.0  16.08.2011  Initial release
// @history        0.0.2.0  23.02.2012  Bring back grey border
// @include        http://nordbayern.de/*
// @include        http://*.nordbayern.de/*
// ==/UserScript==


GM_addStyle(
    '@namespace url(http://www.w3.org/1999/xhtml);\n'
    + '@-moz-document domain("nordbayern.de") {\n'
    + 'body { background-color:#444; }\n'
    + '#nb-banner-top, .nbAdSky { display: none !important }\n'
    + '#nbMain, .nbMainLeftBorder, .nbMainRight { width: 985px !important; padding: 0;}\n'
    + '.nbBackTop, .nbBackBottom { background: none !important; background-color: #444 !important }\n'
    + '#nbContent, .nbMainRight { background: none !important; background-color: #F5F5F3 !important }\n'
    + '#nbFooterThemes, #nbFooterThemes ul li a, #nbFooterInfos a { background: none !important; '
    + 'background-color: #F5F5F3 !important; color: #555555 }\n'
    + '#nbMain { margin: auto; }\n'
    + '}'
)
