// ==UserScript==
// @name           LDR widget FlickrBadge
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://reader.livedoor.com/reader/
// @require        http://coderepos.org/share/export/34607/lang/javascript/Base64/trunk/base64.js
// @version        0.0.1
// ==/UserScript==

//thanks dankogai(http://blog.livedoor.jp/dankogai/archives/51067688.html)


(function(){

GM_addStyle(<><![CDATA[
  .flickr_badge iframe{height:260px!important; opacity:0.3;}
  .flickr_badge iframe:hover{opacity:1;}
  .item_footer {height:270px!important;}
]]></>);


unsafeWindow.register_hook("AFTER_PRINTFEED", function(feed) {
  var tags = ["sunset","happy","paradise","puppy","beautiful",
              "nature","science","art","city","structure",
              "plants","space","make","fish","marine"];
  addBadge(tags);
});


function addBadge(tag) {
  var entries = document.evaluate('//div[@class="entry_widgets"][not(child::span[contains(@class,"flickr_badge")])]', document.body, null, 7, null);
  if(!entries.snapshotLength)
    return false;
  for(var i = 0; i < entries.snapshotLength; i++) {
    var span = document.createElement("span");
    span.className = "widget flickr_badge";

    var qTag = lot(tag);
    var dataURI = string2Base64(qTag);

    var iframe = document.createElement("iframe");
    iframe.src = 'data:text/html;charset=utf-8;base64,' + dataURI;
    iframe.setAttribute("frameborder", 0);
    span.appendChild(iframe);
    entries.snapshotItem(i).appendChild(span);
  }
  setTimeout(function() {
    addBadge(tag);
  }, 1000);
}

function lot(tag) {
  var num = Math.floor(Math.random() * tag.length);
  return tag[num];
}

function string2Base64(query) {
  var source = '<script type="text/javascript" src="http://www.flickr.com/badge_code_v2.gne?count=1&display=random&size=m&layout=x&source=all_tag&tag=' + query + '"></script>';
  return Base64.encode(source);
}

})();