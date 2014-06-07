// ==UserScript==
// @name           wbs - trend tamago plus
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://www.tv-tokyo.co.jp/wbs/trend_tamago/*
// @version        0.0.2
// ==/UserScript==

// 取材報告ムービーを加える。
var tt = document.querySelector('div[id^=mov_all] > div');
var tts = tt.cloneNode(true);
var ttsMov = tts.querySelector('embed');
if(ttsMov) {
  ttsMov.setAttribute("flashvars", ttsMov.getAttribute("flashvars").replace(/_tt\./g, "_tts."));
  tts.id = tt.id + "s";
  tt.parentNode.appendChild(tts);
  addBlog();
}


// レポーターブログを加える。
function addBlog() {
  var data = /(\d{4})(\d{2})(\d{2})/(tt.id);

  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://www.tv-tokyo.co.jp/wbs/toretama_blog/' + data[1] + '/' + data[2] + '/writeThisMonth.js',
    headers: {"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
    onload: function(res) {
      var key = data[1] + '.' + data[2] + '.' + data[3];
      var re = RegExp('(http.+toretama_blog\/.+\.html).+' + key);
      var blogHref = re(res.responseText);

      if (blogHref) {
        GM_xmlhttpRequest({
          method: "GET",
          url: blogHref[1],
          headers: {"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
          onload: function(res) {
            var div = document.createElement('div');
            div.innerHTML = res.responseText;
            var title = div.querySelector('#cell_all > h3');
            title.style.margin = "70px 0 30px 20px";
            title.style.paddingLeft = "8px";
            var blogBody = div.querySelector('#mov_all + p');

            var box = document.createElement('div');
            box.appendChild(title);
            box.appendChild(blogBody);

            GM_addStyle("#cell_all2 {height: auto!important;}");

            var back_btn = document.querySelector('.back_btn');
            if (back_btn)
              back_btn.parentNode.insertBefore(box, back_btn);
            else
              tt.parentNode.parentNode.appendChild(box);
          }
        });
      }
      else {
        var title = document.createElement('h3');
        title.style.margin = "60px 0 30px 20px";
        title.style.paddingLeft = "8px";
        title.appendChild(document.createTextNode('ブログはお休み'))
        var back_btn = document.querySelector('.back_btn');
        if (back_btn)
          back_btn.parentNode.insertBefore(title, back_btn);
        else
          tt.parentNode.parentNode.appendChild(title);
      }
    }
  });
}