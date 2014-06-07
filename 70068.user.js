// ==UserScript==
// @name           rutracker
// @namespace      *rutracker.org*
// ==/UserScript==

GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
  var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
  var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
  if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
  return sel;
}

//*** Add css
GM_addGlobalStyle(''
+' .forumline col.row1[width]{width: 85% !important;}'
+' .forumline col.row1[width="25%"]{width: 15% !important;}'
+' .forumline col.row4[width="75%"]{width: 85% !important;}'
+' #main-nav{height: 20px !important;}'
)

//*** Remove some stuff
	var stuff_to_remove = [
  "//td[@id='sidebar1']",
  "//td[div[@id='idx-sidebar2']]",
  "//div[@id='page_footer']",
  "//td[div[@id='adriver-240x120']]",
  "//div[@id='logo']",
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