// ==UserScript==
// @name       ele.me get infomation
// @namespace  http://iamued.com
// @version    0.4
// @description  获取饿了么菜单页指定格式
// @include    http://r.ele.me/*
// @copyright  2014
// ==/UserScript==

$(function() {
    $("#rst_menus").append('<div class="getinfomation"><button>获取菜单信息 HOHO</button></div><div><textarea class="infoarea" rows="20"></textarea></div>');
    $("#rst_menus").append('<div>有问题反馈给我 liugang02@meituan.com</div>');
    $(".getinfomation").click(function() {
        $(".infoarea").val('');
        var infotext='';
        $.each($(".rst-menu-title"),function(){
            if($(this).text()!='美食分类'){
                var ftypename=$.trim($(this).text());
                infotext+="#"+ftypename+"\n";
                $.each($(this).parent("section").children("ul").children("li"),function(){
                    var fname=$(this).find('.food_name').attr('title');
                    var fprice=$(this).find('.symbol-rmb').text();
                    //console.log(fname+ $.trim(fprice).replace('餐厅休息',''));
                    infotext+=$.trim(fname).replace(/\s+/g,"")+" "+$.trim(fprice).replace('餐厅休息','').replace('已售完','')+"\n";
                })

            }
        })
        $(".infoarea").val(infotext);
    })


});