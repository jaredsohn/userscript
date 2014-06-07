// ==UserScript==
// @name        Wmmail Helper
// @namespace   http://com.wwmail.org
// @include		http://*wmmail.ru/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author		Mixey
// @version     1.0
// ==/UserScript==

main = function (){
    if (window.location.href.indexOf("pmail-frm2") != -1
        && $("body").text().indexOf("╨Ф╨╡╨╜╤М╨│╨╕ ╨╖╨░╤З╨╕╤Б╨╗╨╡╨╜╤Л") != -1) {
        window.close();
    }

    if (window.location.href.indexOf("mail-viewpmail") == -1) return;

    $(".tbl tr td:first-child").each(function(){
        $(this).css({"cursor": "pointer", "text-decoration":"underline", "color": "#145C7D"});
        $(this).click(function(){
            $(this).css("color", "gray");
            var mid = $(this).text();
            $.ajax({
                url: 'index.php?cf=mail-readpmail&mid=' + mid,
                success: function(htmlData) {
                    var uid = /\d+/.exec($("img[width='67']").attr("alt"));
                    var js = /<script>(.+?)<\/script>/g.exec(htmlData);
                    var arr = /var (\w+)="(\w+)"/.exec(js);
                    var rnd = /rnd=(.+?)'/.exec(js)[1].replace(arr[1], arr[2]).replace(/[+"]/g, "");

                    popupWind = window.open('http://www.wmmail.ru/index.php?cf=pmail-readm&uid='+ uid +'&mid=' + mid + '&rnd=' + rnd, "_blank");
                    setTimeout(function(){
                        popupWind.document.location = 'index.php?cf=pmail-frm1&uid='+ uid +'&mid='+ mid +'&rnd=' + rnd;
                    }, 1500);
//                    window.location = 'http://www.wmmail.ru/index.php?cf=pmail-readm&uid='+ uid +'&mid=' + mid + '&rnd=' + rnd;
//                    $.ajax({
//                        url: 'index.php?cf=pmail-resite&mid=' + mid,
//                        success: function(htmlData) {
//                            window.open('index.php?cf=pmail-frm1&uid='+ uid +'&mid='+ mid +'&rnd=' + rnd, "_blank");
//                        }
//                    });
                }
            });
        });
    });
}

main();