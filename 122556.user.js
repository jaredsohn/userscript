// ==UserScript==
// @name        Prosta wikipedia - PL WIKI !
// @author      AAIIKK
// @version	0.1
// @description Simple style 4 wikipedia (only PL) - just knowledge!
// @include     http://pl.wikipedia.org*
// @include     http://en.wikipedia.org*
// ==/UserScript==

var overrideCSS = " \
body {font-family: helvetica;}\
h1, h2, h3, h4, h5 { border-bottom: 0px solid #AAA; } \
a { color: #000; padding: 0 2px 0 2px; background: #DDD; } \
a:visited { color: #555;} \
a.new { color: #000; } \
a.new:visited { color: #555;} \
#quickbar a.new { color: #000; } \
div.vectorTabs li a { color: #000; } \
div#content a.external { color: #000; } \
#toc a { background: 0;} \
li a { background: 0;} \
#mw-panel {display: none;} \
#top  {display: none;} \
#p-personal  {display: none;} \
#footer {display: none;} \
div#content {margin: 0} \
.editsection, .toctoggle {display: none;} \
#firstHeading {border-bottom: 0; background: #666; padding: 5px; color: #EEE; text-shadow: 0px 1px 0px #000;  } \
h2 {background: #DDD; padding: 2px 0 3px 2px; margin-top: 15px}\
.modifiedSectionTitle {background: #DDD; padding: 2px 0 3px 2px; margin-top: 15px}\
.mw-headline {padding: 5px 0 5px 3px;} \
table.ambox { margin: 0 0 15px 0; } \
table.ambox-content { border-left: 10px solid #AAA; } \
ol.references li:target, sup.reference:target, span.citation:target { background-color: #CCC; } \
.navbox-title, table.navbox th {background: #DDD; } \
.navbox-abovebelow, .navbox-group, .navbox-subgroup .navbox-title { background: #EEE; } \
.navbox-subgroup .navbox-group, .navbox-subgroup .navbox-abovebelow { background: #EEE; } \
ul { list-style-image: none; } \
";
GM_addStyle(overrideCSS);
