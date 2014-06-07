// ==UserScript==
// @name           heise telepolis Anpassung
// @namespace      tp
// @description    Anpassung des heise-telepolis-Designs (nach dem 15.4.2011)
// @include        http*://*heise.de/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if ( document.location.href.indexOf("/tp")>-1 )
addGlobalStyle(
// --- Übersicht
'body { background-color: #ccc !important; font-family: serif !important; font-size: large !important; line-height:140% !important;}'
+' .spalte,.max344,.tp-z,.top-ad,.ad-high,.bottom-ad-fr, .tp-footer, .amazon {display: none !important;}'
+' .main { background: #ddd !important; top: 40px !important; border-bottom: 0 !important; min-width: 860px !important; }'
+' .men-1 {top: 5px !important; min-width: 860px !important; }'
+' .null-gif { margin-top: -0.2em !important; margin-bottom: -0.2em !important; float: right !important;}' // Bilder
+' table.main-table { width: auto !important; margin-left: auto !important; margin-right: auto !important;} '
+' .main-table {padding-top: 0.5em !important;}'
+' .datum-leiste { background: #ccc !important; border: 0 !important; margin-bottom: 1em !important; font-weight: bold !important; }'
+' .flow { padding-left: 0 !important;}'
+' .news-s {background: transparent !important; padding-left: 0 !important; }'
+' .vcard {font-style: italic !important;}'
+' a.author:hover {background: transparent !important; text-decoration: underline !important;}'
//+' h2 a:hover {background: #eee !important; }'
+' .leftspace.blog ul li { font-size: smaller !important; line-height: 120% !important; margin-bottom: 0.5em !important; }'
+' .leftspace.blog ul { margin-top: -0.2em !important; margin-bottom: 0.2em !important;}'
+' h2 { margin-top: -0.5em !important; }'
+' .leftspace.home, .leftspace.next { width: 600px !important; background: #eee !important; padding-top: 0 !important;}'
+' .trenn-leiste { margin-bottom: 0.5em !important; padding-top: 0.2em !important; border-bottom: 2px solid #bbb !important; }'
+' .dtext { line-height: 120% !important; }'
+' #ietop { display: none !important; }'
+' .leftbox { margin-top: 8px !important;  min-width: 680px !important; width: 800px !important; margin-left: auto !important; margin-right: auto !important; background-color: #eee !important; }'

// --- Nachricht
+' .mar0 { margin-bottom: 0.5em !important; }'
+' .version-div { text-align: right !important; padding: 0 !important; }'
+' .leftspace.artext, .leftspace.blog { width: 600px !important; text-align: justify !important; background: #eee !important; }'
+' .social { width: 360px !important; float: right !important; margin-top: 0 !important; padding-right: 0 !important; }'
+' .rz-autor { background: #eee !important; padding: 0 0 0 8px !important; margin-left: 1px !important;}'
+' .rz-endtext { font-style: italic !important; background: #eee !important; margin-bottom: 0 !important; padding: 2px 8px 2px 2px !important;}'
+' .rz-div { background: #eee !important; }'
+' .tp-url, div#breadcrumb, div#breadcrumb a { color: #222 !important; }'
+' div#breadcrumb { margin: 0 !important; }'
+' div#breadcrumb a:hover, a.tp-url:hover { color: #666!important; background: transparent !important; }'
+' .forum { background: #ddd !important; border-top: 1px solid #444 !important; padding-left: 1.5em !important; }'
+' h1, .zu { color: brown !important; }'
+' .link { font-size: larger !important; font-weight: normal !important; line-height: 120% !important; }'
+' .li-for { font-weight: normal !important; line-height: 110% !important; }'
+' .size80 { padding-top: 0.5em !important; font-size: smaller !important; }'
//+' .size80 b { margin-bottom: 1em !important; }'
+' .blog-sub { color: #444 !important; text-transform: none !important; font-size: medium !important; }'
+ ' strong { background: #ddd !important; }'
// --- Kommentar-Baum
+' .maintable { width:600px !important; margin: 0 !important; float: none !important; margin-left: auto !important; margin-right: auto !important; }'
+' .f-content { width:720px !important; border-bottom:0 !important; !important; background: #ddd !important;}'
+' .thread_tree { width:300px !important; }'
+' .forum_navi {  width:760px !important;  }'
+' .forum_navi li { margin-right: 0.2em !important; }'
+' .forum_aktion li { margin-right: 0.5em !important; }'
+' .hover_line,.hover,.last { background: #ddd !important; }'

// --- Kommentar
+' .feedback_link { width:720px !important; padding-bottom: 2px !important; }'
+' .posting_text { width:720px !important; font-size: large !important; font-family: monospace !important; line-height: 125% !important; padding-bottom: 2px !important; }'
+' .quote { border-left: 2px solid #777 !important; color: #444 !important; padding-left: 2px !important; padding-top: 1px !important; }'

// --- unterstrichene Links
+' a:hover { text-decoration: underline !important;}'

// --- Navi
+' .navi_top { background: red important!; text-size: smaller !important; }'

);
else 
addGlobalStyle(
// --- heise
' #container_content { margin-top: -100px !important; }'
);
