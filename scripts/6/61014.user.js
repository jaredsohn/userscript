// ==UserScript==
// @name          Songkick Image Tweets
// @author        Sabrina Leandro / @saleandro
// @namespace     http://www.songkick.com
// @description	  Displays images in Songkick tweets. For now, just from YFrog. Let me know if you'd like others :)
// @include       http://www.songkick.com/concerts/*
// ==/UserScript==

function TweetImagesInSongkick() {

  this.showYFrogImages = function() {
    var tweets = $("#tweets li div");
    tweets.each( function() {
      var url = $(this).html().match(/yfrog.com\/([a-z0-9A-Z]+)/);
      if (url && url[1]) {
        var image_source = '<img style="height:auto;width:auto;float:none;margin-top:3px;" alt="'+url[0]+'" src="http://yfrog.com/'+url[1]+'.th.jpg" />';
        $(this).append(image_source);
      }
    });
  };
}


function init(){
  sk = new TweetImagesInSongkick();
  sk.showYFrogImages();
}

function GM_wait() {
  if (typeof unsafeWindow.jQuery === 'undefined') { 
    window.setTimeout(GM_wait, 100); 
  } else { 
    $ = unsafeWindow.jQuery;
    init(); 
  }
}

var GM_start = new GM_wait();
