// ==UserScript==
// @name        TwitterFavIconReplaceToWassr
// @namespace   http://likk.jp
// @description Twitter Favorite Icon Replace to Wassr
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @version     1
// @require     http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

(function() { 
  function FavReplace () {
  　$("ul.js-actions").css('cssText','display: inline !important; visibility:visible !important');
　  $("i.sm-fav").css('cssText','display: none;');
    $("span.favorite").html('<img src="data:image/gif;base64,R0lGODlhQABAAIABAIAAgP///yH5BAEAAAEALAAAAABAAEAAAAJijI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNd2BuT6nkP8DwABeb6hTmjsPZJKDzO4ZN6m1Kr1is1qt9yu9wsOi7HPIawMPKOJrzV7DI/L5/S6/Y7P6/f8vv+vUAAAOw==" width=16 height=16 style="border:dashed 1px #ffffff; width:16px; height:16px; vertical-align:middle" alt="イイネ">');
    $("span.unfavorite").html('<img src="data:image/gif;base64,R0lGODlhQABAAIABAP8A/////yH5BAEAAAEALAAAAABAAEAAAAKzjI+py+0Po5y02ouz3rz7D4biSJbmiabqigAuAL7wJ8ev7eKzV9P32LMES0NKEfgTJolLY3Mji0p3jamV6rxGIVopprt9gI+S8VNhzvnUSjbTncUi4RNyyM49d/AXfluu4VchGKdjyIKYqLjISJI2hvIIFimpRVlpdQkYQQill0cn0on2ubYJejqXajB6V8r6+rYa0HroUKua2ZgwudvS5ftrGUxcbHyMnKy8zNzs/AwtUQAAOw==" width=16 height=16 style="border:dashed 1px #ffffff; width:16px; height:16px; vertical-align:middle" alt="イラネ">');
  }

  $("div.tweet").mouseover(function (){
    FavReplace();
 });

})();
