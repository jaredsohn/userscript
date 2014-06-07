// ==UserScript==
// @name          Reddit: Floating Link
// @description   Adds a floating link to the Reddit comments page.
// @include       *reddit.com*comments*
// ==/UserScript==

(function()
{

    //Find the article URL.
    var anchors = document.getElementsByTagName( "a" );
    var articleUrl = "";
    for( var loop = 0; loop < anchors.length; loop++ ) {
        var anchor = anchors[ loop ];
        if (anchor.className.lastIndexOf("title")!=-1){
            articleUrl = anchor.href;
        }
    } 

    //Add the floating div.
    floatingDiv = window.document.createElement('div');
    floatingDiv.innerHTML = "<a style='background:#CEE3F8;color:#336699;font-weight:bold' href='"+articleUrl+"'>article</a>";
    floatingDiv.style.position = "fixed";
    floatingDiv.style.left = "135px";
    floatingDiv.style.top = "0";
    window.document.getElementsByTagName("body")[0].appendChild(floatingDiv);
})();
