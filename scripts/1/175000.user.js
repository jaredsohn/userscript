// ==UserScript==
// @name        自用评价
// @namespace   360buy
// @description 修改自http://userscripts.org/scripts/show/138742
// @include     http://club.jd.com/mycomments.aspx*
// @include     http://club.jd.com/JdVote/TradeComment.aspx*
// @version     21
// @help        使用说明：打开我的订单左侧-商品评价/晒单之后会批量评价未评价商品，我的订单中选中单品也可评价
// ==/UserScript==

$().ready(function () {
     var cmt = [
        "我们不是神，即使是，也无法做到万无一失。喜欢京东购物的加2698069群。分享优惠信息"
        , "货物还算可以，样式不错 ，只是一些细节上还很一般，没有想像中那么好。喜欢京东购物的加2698069群。分享优惠信息"
        , "长江后浪推前浪，一浪更比一浪高,来形容京东商城是再合适不过了，近几年京东商城发展迅猛啊。喜欢京东购物的加2698069群"
        , "这个质量对得起这个价格，京东值得赞扬！喜欢京东购物的加2698069群。分享优惠信息"
        , "我是过来拿分的，拿完就走，毛都不留！京东买，放心的哇，喜欢京东购物的加2698069群。分享优惠信息"
    ];//按照

    function getCmt() {
        return cmt[parseInt(Math.random() * cmt.length)];
    }

    var times = $("input[value='1']").size();

    var iii = 0;
    $(".area").livequery("keyup", function () {
    });
    function judge(i) {
        $("input[value='1']").eq(i).attr("checked", "checked");
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

            $(".mc dl").each(function () {
                $(this).find("input").eq(0).click();
            });
            $(".btn-6").eq(0).click();


            if ($("#tip-num").text() == "(全部已评价)") {
                setTimeout(function () {
                    location.href ="http://click.union.jd.com/JdClick/?unionId=36378&siteId=150&euid=002beecc2d55c46d3a99&to=http://www.jd.com";
                }, 1000);
            } else {
                setTimeout(function () {
                    location.reload();
                }, 1000);                
            }

        } else {
            iii++;
        }
    }

    var setInter = setInterval(inter, 1000);
});