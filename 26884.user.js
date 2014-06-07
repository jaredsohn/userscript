// ==UserScript==
// @name            HKGolden Images Improver
// @namespace       mt@live.hk
// @description     Improve HKGolden Draw Images Methods
// @include         http://forum*.hkgolden.com/view.asp?*
// ==/UserScript==

// Author:          FatTunG
// Contact:         mt@live.hk
// Version:         0.1
// Date:            2007-06-15

/* ---- MenuCommand ---- */
if (GM_getValue("isTrans", "null") == "null")
   GM_setValue("isTrans", false);

function toggleTrans()
{
    GM_setValue("isTrans", !GM_getValue("isTrans"));
    alert(GM_getValue("isTrans") ? "Quotation Transparency ON" : "Quotation Transparency OFF");
    window.location.reload();
}

GM_registerMenuCommand("Toggle Quot. Transparency", toggleTrans);


/* ---- Switch off quotation transparency ---- */
function addStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) return;
    
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

if (!GM_getValue("isTrans"))
   addStyle("blockquote { opacity: 1 ! IMPORTANT }");


/* ---- Don't resize images ---- */
var imgList = document.evaluate("//img[@onload='DrawImage(this)']",
   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < imgList.snapshotLength; i++)
{
   var image = imgList.snapshotItem(i);
   image.removeAttribute('width');
   image.removeAttribute('height');
   image.removeAttribute('onLoad');
   image.parentNode.removeAttribute('href');
   image.parentNode.removeAttribute('target');
}
