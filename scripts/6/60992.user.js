// ==UserScript==
// @name           douban rss download service
// @namespace      http://www.douban.com/people/3928484/
// @include        http://www.douban.com/settings/
// @description    opml for douban
// ==/UserScript==
var s2 = ["http://www.douban.com/book/mine?status=do", "http://www.douban.com/book/mine?status=wish", "http://www.douban.com/book/mine?status=collect", "http://www.douban.com/movie/mine?status=do", "http://www.douban.com/movie/mine?status=wish", "http://www.douban.com/movie/mine?status=collect", "http://www.douban.com/music/mine/?status=do", "http://www.douban.com/music/mine/?status=wish", "http://www.douban.com/music/mine/?status=collect"];
var t2 = ["我在读", "我想读", "我读过", "我在看", "我想看", "我看过", "我在听", "我想听", "我听过"];



if (location.href == "http://www.douban.com/settings/") {
    $('body').append("<form id =\"opml\" method=\"post\" action = \"http://mattsystem2.appspot.com/genopml\"><input id=\"opmlcontent\" name =\"opml\" value =\"\" type=\"hidden\"/><input id=\"opmlcontent2\" name =\"opml2\" value =\"\" type=\"hidden\"/></form>")
    $('.aside').append("<p class=\"pl2\">&gt;<input id =\"opmlbtn\" value =\"Get OPML\" type=\"button\"/>")
    $('.aside').append("<p id = 'msg' class=\"pl2\"></p>")
    $('#opmlbtn').click(function(){
        $(this).attr('value', "  耐心等待...   ")
        $(this).attr('disabled', "true")
        get("", -1, s2, t2, [],[]);
    })
}

function showMessage(content){
  $('#msg').text(content)
}

function get(url, indx, urls, titles, str, str2){
    if (url == "") {
        if (indx > (urls.length - 2)) {
            $('#opmlcontent').attr("value", str.join(","));
            $('#opmlcontent2').attr("value", str2.join("<"));
            $('#opml').submit();
            showMessage("开始下载...")
        }
        else {
            str.push(titles[indx + 1]);
            str2.push(titles[indx + 1])
            get(urls[indx + 1], indx + 1, urls, titles, str, str2);
        }
    }
    else {
        showMessage("抓取页面 : "+url)
        $.ajax({
            url: url,
            success: function(h){

            showMessage("抓取数据成功.")
                $(h).find('h3 a').each(function(){
                    str.push($(this).attr('href').match(/\d{7}/)[0]);
                    str2.push($(this).text().replace(/\s/g,"").replace(/\./g,"").replace(/\&/g,""));
                })
                get(getNextPage($(h)), indx, urls, titles, str, str2)
            }
        })
    }
}

function getNextPage($h){
    var href = $h.find('.next a').attr("href")
    if (typeof href == "undefined") {
        href = "";
    }
    return href == "" ? "" : "http://www.douban.com" + href;
}
