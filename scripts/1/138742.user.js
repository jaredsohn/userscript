// ==UserScript==
// @name        京东满意度自动评价
// @namespace   360buy
// @description 京东满意度自动评价
// @include     http://club.jd.com/JdVote/TradeComment.aspx*
// @version     9
// ==/UserScript==

$().ready(function () {
    var cmt = [
        "汪汪汪，好评！必须好评！"
        , "汪汪汪，好评！很好评！"
        , "汪汪汪，好评！非常好评！"
        , "汪汪汪，好评！那是相当好评！"
        , "汪汪汪，好评！果然名不虚传！"
    ];//按照这个格式自定义随机评论字符串


    function getCmt() {
        return cmt[parseInt(Math.random() * cmt.length)];
    }

    var times = $("input[value='5']").size();

    var iii = 0;
    $(".area").livequery("keyup", function () {
    });
    function judge(i) {
        $("input[value='5']").eq(i).attr("checked", "checked");
        $(".tips-list").eq(i).find("li").eq(0).click();
        $(".title").eq(i).val(getCmt());
        $(".area").eq(i).val(getCmt());
        $(".btn-6").eq(i).click();
    }

    function inter() {
        if ($(".prompt01").eq(iii).css("display") == "block") {
            judge(iii);
        }
        if (iii >= times) {
            clearInterval(setInter);

            $(".dc_c dd").each(function () {
                $(this).find("input").eq(0).click();
            });
            $("#radioq10").focus().val(getCmt());
            $("#btnsubmit").click();

            if ($("#tip-num").text() == "(全部已评价)") {
                setTimeout(function () {
                    window.close();
                }, 5000);
            } else {
                setTimeout(function () {
                    location.reload();
                }, 5000);                
            }

        } else {
            iii++;
        }
    }

    var setInter = setInterval(inter, 5000);
});