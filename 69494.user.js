// ==UserScript==
// @name           habrahabr
// @namespace      *habrahabr*
// @include        http://*habrahabr.ru/*
// ==/UserScript==
GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
  var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
  var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
  if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
  return sel;
}

//*** Add css
GM_addGlobalStyle(''
//--- Header & Footer
+' #main-content{width: 100%;}'
+' #viva-la-w3c{width: 100%;}'
+' #main-content #comments {visibility:hidden; height: 100px;}'
+' #wrapper {width: 98% !important; margin:0 0 10px !important;}'
+' .blog-title{display:none;}'
+' #comments>:first-child {visibility:visible  !important;}'
+' #comments:active {visibility:visible !important; height:auto !important;}'
+' #comments:hover {visibility:visible !important; height:auto !important;}'
+' .hidden {display: inherit !important;}'
+' .hidden + a {display: none !important;}'
+' #js-blog_info{display: none !important;}'
+' body,html{height: auto !important;}'
+' .profile-header {width: 98% !important;}'
+' .company-header {width: 98% !important;}'
+' #main-content>:first-child {width: 98% !important;}'
)

var stuff_to_remove = [
  "//div[@id='footer']",
  "//div[@id='y5_direct1']",
  "//div[@id='sidebar']",
  "//div[@class='header']",
  "//div[@class='yandex-direct']",
  ];

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);