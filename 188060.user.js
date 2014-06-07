// ==UserScript==
// @name           AmazonToKobo
// @namespace      http://userscripts.org/scripts/show/188060/
// @version        1.0
// @include        http://www.amazon.co.jp/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function () {
    // 商品ページ判定
    if ($("#btAsinTitle").size() == 0) return;

    // 商品種別判定
    if (!isBook() && !isKindle()) return;

    // タイトル取得
    var titleString = $("#btAsinTitle").contents().filter(function () {
        return this.nodeType == 3;
    }).text();

    var keywords = parseTitle(titleString);
    var titleName = keywords[0]
    var author = $(".parseasinTitle").parent("div").find("a:first").text();

    request();

    function request() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: buildUrl(titleName, author),
            onload: function (response) {
                var d = JSON.parse(response.responseText);

                var html = '<div id="amazonToKobo">'
                if (d.Items != null && d.Items.length > 0) {
                    html += '<table class="twisterMediaMatrix" cellpadding="0" cellspacing="0" border="0">'
                        + '<tbody><tr><td style="border-top:none;">'
                        + '<div class="cBox dkBlueBox">'
                        + '<span class="cBoxTL"><!-- &nbsp; --></span>'
                        + '        <span class="cBoxTR"><!-- &nbsp; --></span>'
                        + '            <span class="cBoxR"><!-- &nbsp; --></span>'
                        + '            <span class="cBoxBL"><!-- &nbsp; --></span>'
                        + '            <span class="cBoxBR"><!-- &nbsp; --></span>'
                        + '            <span class="cBoxB"><!-- &nbsp; --></span>'
                        + '<div class="cBoxInner">'
                        + '<div id="kobo">'
                        + '<table cellpadding="1" cellspacing="0" border="0">'
                        + '<thead>'
                        +'<tr><th class=" "><h3 class="tmm_formatColumnHeader">タイトル(kobo)</h3></th>'
                        + '<th class=" " colspan="1">著者</th> '
                        + '<th class=" " colspan="1">価格</th> '
                        + '</tr></thead>'
                        + '<tbody id="kobo_winner">';

                    for (var i in d.Items) {
                        html += '<tr class="bucketBorderTop">'
                            + '<td class="tmm_bookTitle noLinkDecoration ">'
                            + '<a target=_blank href="' + d.Items[i].Item.affiliateUrl + '">'
                            + d.Items[i].Item.title + "</a></td>"
                            + '<td>' + replaceComma(d.Items[i].Item.author) + '</td>'
                            + '<td class=" price">￥' + d.Items[i].Item.itemPrice + '</td>'
                            + '</tr>';
                    }
                    html += '</tbody></table></div></div></div></td></tr></tbody></table>';
                } else {
                    html += '<div class="warning">';
                    if (d.error_description != null) {
                        html += d.error_description + "(AmazonToKobo)"
                    } else {
                        html += "Not Found(AmazonToKobo)"
                    }
                    html += '</div>';
                }
                html += "</div>"
                $(".parseasinTitle").parent("div").append(html);
                $("#amazonToKobo a").css("padding", "0 3px");
                $("#amazonToKobo .warning").css("color", "red");

            }
        });
    }

    function buildUrl(title, author) {
        BASE_URL = "https://app.rakuten.co.jp/services/api/Kobo/EbookSearch/20131010?format=json&applicationId=1056640420674708267";
        AFFILIATE_ID = "0582cf62.ecee32fc.0582cf63.b8ea5e67";

        url = BASE_URL;
        url += "&title=" + encodeURIComponent(title);
        if (author != null) {
            url += "&author=" + encodeURIComponent(author)
            // 楽天kobo のAPI からなぜか%E3%83%BCx2が返ってくるので削除
            url = url.replace(/%E3%83%BC%E3%83%BC/g, "%E3%83%BC")
        }
        if (AFFILIATE_ID != null) {
            url += "&affiliateId=" + AFFILIATE_ID;
        }
        return url
    }

    function isBook() {
        isbn10 = null;
        isbn13 = null;
        $("table .bucket .content li").each(function () {
            text = this.textContent;
            if (text.indexOf("ISBN-10:") >= 0) {
                isbn10 = text.match(/\d{10}/)[0];
                return false;
            }
            if (text.indexOf("ISBN-13:") >= 0) {
                isbn13 = text.match(/\d{3}-\d{10}/)[0].replace("-", "");
                return false;
            }
        });
        return (isbn10 !== null || isbn13 !== null);
    }

    function isKindle() {
        edition = $("#btAsinTitle span").text();
        return edition.indexOf("Kindle") >= 0;
    }

    function parseTitle(title) {
        // 記号
        pattern = /[―!！"”#＃$＄%％&＆(（)）=＝^＾~～\\￥|｜,，、.．。<>＜＞〈〉`｀\/／?？＼_＿[\]「」{}｛｝+＋;；*＊:：－]/g;
        // 連続した空白
        pattern2 = /[\s　]{2,}/g;
        // 前後の空白
        pattern3 = /(^[\s　]+)|([\s　]+$)/g;

        return title.replace(pattern, " ").replace(pattern2, " ").replace(pattern3, "").split(/[\s　]/);
    }

    function replaceComma(str) {
        return str.replace("^_#^", ",", "g");
    }
});

