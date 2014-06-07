// ==UserScript==
// @name           LDR Juno Images
// @version        0.1
// @namespace      http://twitter.com/juntatter
// @description    display jacket images for juno feeds
// @include        http://fastladder.com/reader/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

(function(){
  var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
  var done = {};
  w.register_hook("before_printfeed", function(feed){
    if (feed.channel.link.indexOf("www.juno.co.uk", 0) == -1){
      return;
    }
    var sid = feed.subscribe_id;
    if (done[sid] == true){
      return;
    }
    var reg = new RegExp("[^\/]*$");
    feed.items.forEach(function(item){
      var url = item.link;
      var page_id = url.match(reg)[0].split("\.")[0];
      var imgs = [];
      var sides = ["A","B"];
      sides.forEach(function(side){
        var img = ["<img src=\"http://cdn.images.juno.co.uk/150/CS",
        page_id,
        side,
        ".jpg\" />"].join("");
        imgs[imgs.length] = img;
      });
      item.body = [
        "<div style=\"margin-bottom: 10px;\">",
        imgs.join("\n"),
        "</div>",
        item.body,
      ].join("");
    });
    done[sid] = true;
  });
})();
