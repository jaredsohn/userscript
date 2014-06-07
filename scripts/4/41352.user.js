// ==UserScript==
// @name        ldr_keyhack_v
// @namespace   http://gomaxfire.dnsdojo.com/
// @include     http://reader.livedoor.com/reader/*
// @version     1.1
// ==/UserScript==

(function(){
  var w = unsafeWindow;
  var _onload = w.onload;


  var onload = function(){with(w){
      Keybind.remove("v");
      Keybind.add("v", function(){
          var item = get_active_item(true);
          if(item){
//             if(item.link.match(/^http:\/\/b\.hatena\.ne\.jp\/.+\#(bookmark.*)$/)){
//               var id = RegExp.$1;
//               GM_xmlhttpRequest({
//                   url:item.link,
//                     method:"GET",
//                     onload:function(xhr){
//                     var div = document.createElement("div");
//                     var noscriptHtml = xhr.responseText
//                       .replace(/\n/g, "")
//                       .replace(/\r/g, "")
//                       .replace(/<script[^>]*>[^<]*<\/script>/ig, "");
//                     if(!noscriptHtml.match(/<body[^>]*>(.*)<\/body>/i)){
//                       return;
//                     }
//                     var html = RegExp.$1;
//                     div.innerHTML = html;
//                     div.style.display = "none";
//                     document.body.appendChild(div);
//                     var target = document.getElementById(id);
//                     var as = target.getElementsByTagName("a");
//                     GM_openInTab(as[0].href);
//                     document.body.removeChild(div);
//                   }
//                 });
//             } else {
              GM_openInTab(item.link);
//            }
          }
        });

    }}
  w.onload = function(){
    _onload();
    onload();
  }
})();
