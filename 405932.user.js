// ==UserScript==
// @name      kaichiba get infomation
// @namespace  http://iamued.com
// @version    0.1
// @description  获取开吃吧菜单页指定格式
// @include    http://kaichiba.com/shop/*
// @copyright  2014
// ==/UserScript==

$(function() {
    $("#left").append('<div class="getinfomation"><button>获取菜单信息 HOHO</button></div><div><textarea class="infoarea" rows="20" style="width:95%;"></textarea></div>');
    $("#left").append('<div>有问题反馈给我 liugang02@meituan.com</div>');
    $(".getinfomation").click(function() {
        $(".infoarea").val('');
        var infotext='';
        $.each($(".foodList"),function(){
                var ftypename=$.trim($(this).find(".foodList_title").text());
                infotext+="#"+ftypename+"\n";
                $.each($(this).parent().find(".foodListInfo"),function(){
                    var fname=$(this).find('.foodTitle').text();
                    var fprice=$(this).find('.foodPrice').text();
                    console.log(fname+ $.trim(fprice).replace('餐厅休息',''));
                    infotext+=$.trim(fname).replace(/\s+/g,"")+" "+$.trim(fprice).replace('餐厅休息','').replace('已售完','')+"\n";
                })


        })
        $(".infoarea").val(infotext);
        return false;
    })


});