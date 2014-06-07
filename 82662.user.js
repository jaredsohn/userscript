// ==UserScript==
// @name           Google Music Auto Download
// @namespace      Google Music Auto Download
// @description    Google Music Auto Download
// @include        http://t.qq.com/k/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    //删除话题无图的推
    var pathName = window.location.pathname;
    if (pathName.substring(0, 3) == "/k/" || pathName.substring(0, 8) == "/search/"){
        //加载大图
        $('.btnOriginal').bind('mouseover', function () {
            var picBox = $(this).parent().parent();
            if (!picBox.hasClass('big')) {
                var src = $(this).attr('href');
                picBox.append('<a href="' + src + '" target="_blank"><img style="max-width:100%" class="large" src="' + src + '"></a>');
                $(this).parent().next().remove();
                $(this).parent().remove();
                picBox.addClass('big');
            }
        })
        $('.btnOriginal').mouseover();
        //键盘翻页
        var nextPage = "##";
        var prevPage = "##";
        $('.pageBtn').each(function (i) {
            if ($(this).text() == '下一页 >>')
                nextPage = $(this).attr('href');
            if ($(this).text() == '<< 上一页')
                prevPage = $(this).attr('href');
        })
        $(document).keydown(function (e) {
            if (e.keyCode == 39)
                window.location.href = nextPage;
        })
        $(document).keydown(function (e) {
            if (e.keyCode == 37)
                window.location.href = prevPage;
        })
    }
}
addJQuery(main);