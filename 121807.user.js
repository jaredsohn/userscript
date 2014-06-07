// ==UserScript==
// @name           Top100 Music Auto Download
// @namespace      Top100 Music Auto Download
// @description    Top100 Music Auto Download
// @include        http://www.top100.cn/download/*
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script);
}
function main() {
    try {

        if ($('.Listen_downloadtop2').length > 0) {
            $('body').append('<button id="btn-dl" style="position:fixed;right:10px;top:10px">下载本页歌曲</button>');
            $('#btn-dl').click(function () {
                $(this).remove();
                $('body').append('<div id="pg-dl" style="position:fixed;right:10px;top:10px;width:550;height:250px;background-color:white;border:1px solid #96A7BA;border-radius:5px"><div style="position:relative"><iframe id="ifr-dl" scrolling="no" width="100%" height="100%" frameborder="0"></iframe><span style="position:absolute;z-index:2;right:50%;margin-right:-2.5em;top:0;padding:3px 5px;background-color:yellow;font-size:14px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;">间隔15秒...</span></div></div>');
                var flag;
                var arrSrc = new Array();
                var i = 0;
                function changeIframe() {
                    if (i >= arrSrc.length) {
                        clearInterval(flag);
                        alert('done');
                        $('#pg-dl').remove();
                    }
                    else {
                        $('#ifr-dl').attr('src', 'http://www.top100.cn' + arrSrc[i]);
                        i++;
                    }
                }
                $('.Listen_downloadtop2 .No6 a').each(function (index) {
                    arrSrc.push($(this).attr('href'));
                });
                flag = setInterval(changeIframe, 15000);
            })
        }
    }
    catch (e) { }
}
addJQuery(main);
