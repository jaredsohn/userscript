// ==UserScript==
// @id             demo_BlueshopPlus
// @name           BlueshopPlus
// @namespace      demoshop
// @description    針對藍色小舖做的小功能
// @author         demo http://demo.tc
// @include        http://www.blueshop.com.tw/*
// @version		   1.1
// @require        http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// ==/UserScript==

/*這裡是參數設定 
* 0=關閉
* 1=開啟
*/

//隱藏黑名單使用者的發文
var BlockedNameListHide = 0;
//隱藏底部條狀物
var BottombarHide = 1;
//關閉文章列表的分頁功能
var PagingDisable = 1;


(function () {
    letsJQuery();
})();


// All your GM code must be inside this function
function letsJQuery() {
    if (BlockedNameListHide)
        $("img[src='black_man.gif']").parent().parent().hide();
    if (BottombarHide)
        $("#bottombar").remove();

    if (PagingDisable) {
        $("table.list-bgcolor").find("tr").children().filter(':nth-child(6)').each(function (e) {
            var replyCount = parseInt($(this).text(), 10);
            if (!isNaN(replyCount) && replyCount > 15) {
                var target = $(this).parents("tr").children("td:nth-child(2)");
                var sourceLink = target.find('a:eq(0)').attr('href');
                for (i = 1; i <= (replyCount / 15); i++) {
                    var x = i + 1;
                    var link = '【<a href=' + sourceLink.replace('.html', '/' + x + '.html') + '>' + x + '</a>】';
                    target.append(link);
                }
            }
        });
    }
}