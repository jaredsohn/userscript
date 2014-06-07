// ==UserScript==
// @name                迷の备注
// @description         显示基友的爱♂称
// @include             http://tieba.baidu.com/*
// @version             1.0
// ==/UserScript==
$(document).ready(function(){
    var dict = Array();
    dict["寂寞的丁字裤"] = "3cm";
    dict["我逋雪发"] = "俺通雷发";
    dict["lookdotrmrn"] = "撸客酱";
    dict["是孤魂不是野鬼"] = "大怪受";
    dict["吾乃老w"] = "捂奶老w";
    dict["金狼古十四"] = "段二叔";
    dict["MilkKRabbit"] = "学姐兔";
    dict["xw_y_am"] = "叶婶";
    dict["FBIWarnin"] = "FBI";
    dict["大地精"] = "精叔";
    dict["乃心喔喔"] = "大奶喔喔";
    dict["王忘杰"] = "汪汪姐";
    dict["mayadong7349"] = "大胖鸟";
    dict["木何"] = "木盒";
    dict["10086_Z"] = "臭羊头";
    dict["zhangyh26258"] = "张丽莎白";
    dict["realasking"] = "大狮兄";
    dict["荆棘的思念"] = "JJ的思念";
    dict["雾之魂魄"] = "?之魂魄";
    dict["Linux_x189"] = "坚果兄";
    dict["iSpeller"] = "真·学姐";
    var fun1 = function(){
        $("div.d_badge_title").each(function(){

            var node = $(this).parent().parent().parent().prev();
            if(node.attr("class") == "d_icons")
                node = node.prev();
            var uname = node.find("a").first().html();
            if(dict[uname] != null)
                $(this).html(dict[uname]);
            else
                $(this).html("迷の热干面");
        });
    };
    fun1();
    $(window).scroll(fun1);
});

