// ==UserScript==
// @name           oper-2.0
// @namespace      *oper.ru*
// @include        http://*oper.ru/*
// ==/UserScript==

GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
  var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
  var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
  if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
  return sel;
}

//*** Add css
GM_addGlobalStyle(''
+' #middle {padding: 0 0px;}'
// background_news color
+' #middle {background-color: #303030;}'
// yellow_quotes color
+' #middle blockquote {color: #C4BC5C;}'
// WIDTH=100%
//+' #container{padding:0px 0px 0px !important; max-width:100% !important;}'
//show/hide first topic on mouseover/mouseout
+' #middle>dl>:nth-child(2) {display: none;}'
+' #middle>dl>:first-child:hover + dd {display: block !important;}'
+' #middle>dl>:nth-child(2):hover {display: block !important;}'
)

var stuff_to_remove = [
  "//div[@id='topbanner']",
	"//td[div[@id='left']]",
	"//td[div[@id='right']]",
	"//tr[td/table/tbody/tr/td/p[@class='bottomh']]",
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