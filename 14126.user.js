// ==UserScript==
// @name           hatena_tagcloud_search
// @namespace      perlnamehoge@gmail.com
// @include        http://b.hatena.ne.jp/t
// ==/UserScript==

new function () {
    for ( var r = document.evaluate("//ul[@class='tagcloud']//li//a[contains(@href, '/t/')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), i = 0, l = r.snapshotLength; i < l; r.snapshotItem(i).parentNode.title = r.snapshotItem(i).innerHTML, i++ );
    unsafeWindow.TagGrep.prototype.initialize=function(){};
    var tag_search = document.evaluate("//*[@id='tag_search']", document, null, 7, null).snapshotItem(0);
    tag_search.className = "bigarea";
    tag_search.addEventListener("keydown", function () {
        if ( this.tid ) {
           clearTimeout( this.tid );
           delete this.tid;
        }
        this.tid = setTimeout(function () {
           for ( var r = document.evaluate("//li[contains(@class,'_focus')]", document, null, 7, null), i = 0, l = r.snapshotLength; i < l; r.snapshotItem(i).className = "", i++ );
           tag_search.value && tag_search.value.replace(/　/g, " ").split(/\s+/).forEach(function (tag,idx) {
               tag && new function () {
                   var r = document.evaluate("//li[contains(@title, '" + tag + "')]", document, null, 7, null);
                   r.snapshotLength && new function () {
                     for ( var i = 0, l = r.snapshotLength; i < l; r.snapshotItem(i).className = '_focus' + idx, i++ );
                   }   
               }
           });    
        }, 500);
    }, false);
    GM_addStyle(["yellow", "silver", "orange", "lime", "#ddf", "#c98"].map(function (color, idx) {
         return "li._focus" + idx + " a { background : " + color + "; } ";
    }).join(""));
    tag_search.style.width = '50em';
}