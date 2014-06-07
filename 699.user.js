// ==UserScript==
// @name           DeliciousGator
// @namespace      http://ejohn.org/
// @description    Replaces the 'Forward post via e-mail' option in favor of a del.icio.us submission link, on News Gator Online.
// @include        http://newsgator.com/ngs/subscriber/WebEd2.aspx
// ==/UserScript==

(function() {
  // del.icio.us username (CHANGE!)
  var user = 'phytar';
  // 0 = Full Page, 1 = Pop-Up, 2 = New Window
  var style = 1;
  
  var a = document.evaluate("//p[@class='entry-footer']/a[position()=last()]/img", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var l = document.evaluate("//h1/a/text()", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var elm, elml, i;

  for( elm = null, elml = null, i = 0; 
       (elm = a.snapshotItem(i), elml = l.snapshotItem(i)); i++) {
    elm.setAttribute( "title", "Post to Del.icio.us" );
    elm.setAttribute( "alt", "Post to Del.icio.us" );
    elm = elm.parentNode;
    
    var q = encodeURIComponent(elml.parentNode.getAttribute("href"));
    var p = encodeURIComponent(elml.data);
    
    if ( style == 1 ) {
      elm.setAttribute( "href", 
        "javascript:void(open('http://del.icio.us/" + user + 
        "?v=2&noui=yes&jump=close&url=" + q + "&title=" + p + 
        "','_blank', 'toolbar=no,width=700,height=250'));"
      );
    } else {
      if ( style == 2 )
        elm.setAttribute( "target", "_blank" );
      elm.setAttribute( "href", 
        "http://del.icio.us/" + user + "?v=2&url=" + q + "&title=" + p
      );
    }
  }
})();
