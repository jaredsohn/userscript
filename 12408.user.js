// ==UserScript==
// @name           nowa_change_to_hamashun_portal
// @namespace      perlnamehoge@gmail.com
// @include        http://nowa.jp/
// ==/UserScript==

new function () {
    var $ = function (id) { return document.getElementById(id) };
    [
        function () {
            $("main").innerHTML = '<param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="http://www.hamashun.com/common/swf1/deer" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed src="http://www.hamashun.com/common/swf1/deer" quality="high" bgcolor="#ffffff" width="420" height="150" name="main" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
        },
        function () {
            $("index-frashbox").childNodes[1].innerHTML = "What's hamashun?";
        },
        function () {
            var ir = $("index-recentbox").childNodes[1];
            ir.getElementsByTagName("h2")[0].innerHTML = "はましゅんはナニシテル？新着記事";
            ir.getElementsByTagName("a")[0].href       = "http://hamashun.nowa.jp/status/";
        },
        function () {
            $("index-infobox").style.display = "none";
        },
        function () {
            GM_xmlhttpRequest({
                method : "get",
                url    : "http://hamashun.nowa.jp/rss/?mode=rss20",
                onload : function (r) {
                       var res = r.responseText.replace(/\x0D\x0A|\x0D|\x0A/g, "");
                       $("index-recentblog").innerHTML
                               = res.match(/<item>(.*?)<\/item>/g).map(function (m) {
                                     var title = ( m.match(/<title>(.*?)<\/title>/) || ["", ""] )[1];
                                     var link  = ( m.match(/<link>(.*?)<\/link>/) || ["", ""] )[1];
                                     var desc = ( m.match(/<description>(.*?)<\/description>/) || ["", ""] )[1];
                                     var html  = ["<dl><dt>"];
                                     html.push("<a href='http://hamashun.nowa.jp/'><img src='http://image.nowa.jp/icon/0000002a8c819c233aafc4b62bd1dc06bc86d66880deefa-s.jpg' height='16' width='16'></a>");
                                     html.push("<a href='http://hamashun.nowa.jp/'>Shun ( hamashun )</a></dt>");
                                     if ( link.match(/\/status\//) ) {
                                        html.push("<dd><span class='body'>" + title + "</span></dd>");
                                     } else {
                                        html.push("<dd><strong class='title'><a href='" + link + "'>" + title + "</a></strong><span class='body'>" + desc + "</span></dd>");
                                     }
                                     html.push("</dl>");
                                     return html.join("");
                               }).join("");
                }
            });
        },
        function () {
            GM_xmlhttpRequest({
                method : "get",
                url    : "http://hamashun.nowa.jp/review/",
                onload : function (r) {
                       var res   = r.responseText.replace(/\x0D\x0A|\x0D|\x0A/g, "");
                       var items = ( res.match(/<div class="review-outer">(.*?)<\/div>/) || ["", ""] )[1];
                       $("reviewbox").innerHTML = 
                                   items.match(/<dl>(.*?)<\/dl>/g).map(function (item,idx) {
                                      var link = ( item.match(/<dd><a href="(.*?)">/) || ["",""] )[1];
                                      var title = ( item.match(/<dd>.*">(.*?)<\/a><\/dd>/) || ["",""] )[1];
                                      var image = ( item.match(/src="(.*?)"/) || ["",""] )[1];
                                      var html  = [];
                                      if ( idx < 5 ) {
                                         var type = ( image.match(/amazon/) ) ? "amazon" : "youtube";
                                         html.push("<li>");
                                         html.push("<a href='" +link+ "' title='" +title+ "'><img src='" +image+ "' class='" + type + "' height='60' width='80'></a>");
                                         html.push("<br><a href='" + link + "' title='" +title+ "' class='blue'>" + title.substring(0,15) + "</a></li>");
                                      }
                                      return html.join("");
                                   }).join("");
                }
            });
        },
        function () {
            var ir = $("index-reviewbox").childNodes[1];
            ir.getElementsByTagName("h2")[0].innerHTML = "はましゅんの新着レビュー";
            ir.getElementsByTagName("a")[0].href       = "http://hamashun.nowa.jp/review/";
        },
        function () {
            var img = $("rightbox-index").getElementsByTagName("img")[0];
            img.src       = "http://image.nowa.jp/icon/0000002a8c819c233aafc4b62bd1dc06bc86d66880deefa-o.jpg";
            $("rightbox-index").getElementsByTagName("div")[2].innerHTML = "<h3>hamashun</h3>Livedoorでマークアップエンジニアやってます。プロフ画像のメガネはイケメンの先輩から借りたやつ。普段はかけてないから注意だよ！";
        },
        function () {
            $("rightbox-index").getElementsByTagName("h2")[0].innerHTML = "はましゅんのプロフィール";
            var qs = [
                {
                        q : "年齢",
                        a : "27歳"
                },
                {
                        q : "住所",
                        a : "日本 東京都"
                },
                {
                        q : "性別",
                        a : "男性"
                },
                {
                        q : "名前",
                        a : "浜 俊太郎"
                },
                {
                        q : "カナ",
                        a : "ハマ シュンタロウ"
                }
            ];
            var question = qs[ parseInt( Math.random() * qs.length ) ];
            $("rightbox-index").getElementsByTagName("h3")[1].innerHTML = "Q. " + question.q;

            var dls = $("rightbox-index").getElementsByTagName("dl");
            for ( var i = 0; i < dls.length; i++ ) {
                var dl = dls[i];
                if ( i == 0 ) {
                  dl.innerHTML = '<a href="http://hamashun.nowa.jp/"><img src="http://image.nowa.jp/icon/0000002a8c819c233aafc4b62bd1dc06bc86d66880deefa-m.jpg" alt="" height="32" width="32"></a><a href="http://hamashun.nowa.jp/">Shun ( hamashun )</a><span>(27歳/<label for="sex_M">男性</label>)</span></dt><dd>' + question.a + '</dd>';
                } else {
                  dl.style.display = "none";
                }
            }
        },
        function () {
            $("index-channelbox").style.display = "none";
        },
        function () {
            GM_xmlhttpRequest({
                method : "get",
                url    : "http://hamashun.nowa.jp/",
                onload : function (r) {
                       var res   = r.responseText.replace(/\x0D\x0A|\x0D|\x0A/g, "");
                       var tags  = ( res.match(/<ol class="tagcloud">(.*?)<\/ol>/) || ["",""] )[1];
                       $("ch-index-list").innerHTML = tags;
                }
            });
        },
        function () {
            $("index-channelbox").style.display = "none";
            var h2s = $("rightbox-index").getElementsByTagName("h2");
            for ( var i = 0; i < h2s.length; i++ ) {
                var h2 = h2s[i];
                if (h2.innerHTML == "みんなのタグ") {
                   h2.innerHTML = "はましゅんのタグ";
                   break;
                }
            }
            var spans = $("rightbox-index").getElementsByTagName("span");
            for ( var i = 0,span; i < spans.length; i++) {
                span = spans[i];
            }
            span.childNodes[0].href = "http://hamashun.nowa.jp/";
        }
    ].forEach(function () {
        arguments[0].call(null);
    });
}
