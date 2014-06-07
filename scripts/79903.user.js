// 2010-06-23
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
//
// based on http://userscripts.org/scripts/show/74320 by NimRock
// 
// ==UserScript==
// @name           torrents.vtomske.ru cleaner
// @namespace      vtomske.ru
// @description    no advert, no unused shit
// @include        http://torrents.vtomske.ru/forum/*

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

var stuff_to_remove = [
  "//div[@style='padding-top: 5px;']",
  "//div[@style='width: 600px; height: 70px; position: relative; overflow: visible; padding: 0pt; margin: 0pt;']",
  "//div[@style='width: 468px; height: 60px; position: relative; overflow: visible; padding: 0pt; margin: 0pt;']",
  "//div[@style='width: 200px; height: 200px; position: relative; overflow: visible; padding: 0pt; margin: 0pt;']",
  "//div[@style='white-space: normal; height: 365px; overflow: hidden; margin-top: 54px;']",
  "//div[embed[@width='600']]",
  "//table[tbody[tr[td[@width='20']]]]",
  "//tr[@class='row1 tCenter']",
  "//font[@color='#999999']",
  "//a[@href='/forum/help.php']",
  "//div[@style='padding: 10px 0pt;']",
  ];

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
				item.style.display = 'none';
            }
        );
    }
);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var cleanstyle = 'div#page_header, div#advert, div#latest_news, div#page_footer, div#board_stats, div#trstats, div#faq, div#ks_description, div#ks_shop, div.vtomske-body, div.cat_footer, div.bottom_info, div.cat_separator, p.f_stat_inline, p.moderators, p.med, tr.row3, td.row7 { display: none ! important; } td.nav { font-size: 1.1em; } h3.cat_title { border-width: 0px; } div#forums_footer { height: 10px; line-height: 0; } a.genmed { font-size: 1.2em; }';

addGlobalStyle(cleanstyle);

// ==/UserScript==