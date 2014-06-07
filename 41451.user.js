// ==UserScript==
// @name last.fm Numeric Compatibility
// @namespace http://z3c.info/
// @description Displays the numeric compatibility with a user
// @include http://www.last.fm/user/*
// @include http://www.lastfm*/user/*
// @exclude http://www.last.fm/user/*/*
// @exclude http://www.lastfm*/user/*/*
// ==/UserScript==
 
$ = unsafeWindow.$;
$$ = unsafeWindow.$$;
 
(function (tom) {
  if (!tom) return;
  tom.observe('DOMSubtreeModified', function() {
    tom.stopObserving('DOMSubtreeModified')
      .childElements()[0]
        .insert(
          "(" +
            $$('#tasteometer span.bar span')[0]
              .readAttribute("style")
              .match(/[0-9]+\.?[0-9]*%/) +
          ")");
  });
})($('tasteometer'));
