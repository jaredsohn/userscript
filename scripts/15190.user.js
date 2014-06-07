// ==UserScript==
// @name           Favoritestar is shining
// @namespace      http://d.hatena.ne.jp/Uchimata/
// @description    Stars on your favorites regain shine of those days
// @include        http*://*twitter.com/favorites*
// @version        0.0.3
// ==/UserScript==
//
// last modified: 2007/12/06 02:17:17
// history: http://twitter.g.hatena.ne.jp/Uchimata/20071201/1196476266
//



(function() {

  if (typeof unsafeWindow == 'undefined') return

  var i = 4
  var w = unsafeWindow
  var FavoriteStarIsShine = []

  var shine = function() {
    var img = document.getElementsByTagName("img")

    for (var i=0;i < img.length;i++) {
      if (img[i].id.match(/^status_star_/) && !FavoriteStarIsShine[i]) {
        var a = img[i].parentNode.wrappedJSObject
        a.onclick = w.eval("("+uneval(a.onclick).replace(/create/,"destroy")+")")
        img[i].src = img[i].src.replace(/empty/,"full")
        FavoriteStarIsShine[i] = true
      }
    }
  }

  var addF = function() {
    if (window.AutoPagerize && window.AutoPagerize.addFilter) {
      window.AutoPagerize.addFilter(shine)
    } else if (i-- > 0) {
      setTimeout(arguments.callee,1000)
    }
  }

  shine()
  addF()

})()
