// ==UserScript==
// @name        wmrprof helper
// @namespace   http://com.wmrprof.ru
// @include     http://*wmrprof.ru/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author		Mixey
// @version     1.0
// ==/UserScript==

main = function() {
    $('<div/>', {
        id: 'foo',
        title: 'Become a Googler',
        rel: 'external',
        text: 'Go to Google!',
        click: function (){
            $.ajax({
                url:'http://www.wmrprof.ru/view.php?active_link=27926',
                type:'POST',
                data:{"getCode":"705", "sub":"Начать просмотр"},
                success:function (htmlData) {
                    console.log(htmlData);
                }
            });
        }
    }).appendTo('body');


    if (window.location.href.indexOf("tasks") != -1) {
        var cost = 0;
        $("tbody > tr > td:last-child", $("#searchform").next()).each(function () {
            if ($(this).attr("width") != null) return;

            cost += parseFloat(/\d+.+?\d+/.exec($(this).prev().text()));
        });

        $("tbody > tr:last-child", $("#searchform").next()).text(cost);
    }

    if (window.location.href.indexOf("active_link") == -1) return;

    var lid = $("input[name='id']").val();

    if (lid == null) return;

    $("iframe").each(function(){
        if ($(this).attr("name") == "success") {
            $(this).load(function() {
                if ($("input[name='clock']").val() != "Просмотр окончен") return;

                window.close();
            });
            return;
        }

        $(this).attr("src", "");
    });
}

main();