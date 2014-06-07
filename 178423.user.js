// ==UserScript==
// @name       iphone5s-gold-detect
// @namespace  tysonpan
// @version    1.0
// @description  检测香港官网的iphone5s金色版是否有货
// @match      http://store.apple.com/hk-zh/buy-iphone/iphone5s*
// @copyright  2013, Tysonpan
// ==/UserScript==

//引入jquery
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


//实际逻辑
function main() {
    //要用户手工允许桌面通知才生效
    $('body').append('<input type="button" onclick="window.webkitNotifications.requestPermission();" style="position:absolute;top:15px;right:15px;padding:5px" value="启用桌面通知" />');

    //各种参数
    var is_nodify = false;            //是否提醒过用户
    var interval_time = 2000;         //检测的时间间隔
    var iphone_color = 'gold';       //设备颜色
    var iphone_size = '16gb';        //设备容量
    var iphone_ = '';
    var ajax_url = 'http://store.apple.com/hk-zh/buyFlowVariationUpdate/IPHONE5S?option.dimensionColor='+iphone_color+'&option.dimensionCapacity='+iphone_size+'&carrierPolicyType=UNLOCKED&node=home%2Fshop_iphone%2Ffamily%2Fiphone5s&step=select';

    //桌面提醒函数
    function RequestPermission (callback) {            //用户授权
        window.webkitNotifications.requestPermission(callback);
    }

    function showNotification(){
        if (window.webkitNotifications) {
            if (window.webkitNotifications.checkPermission() > 0) {         //未授权
                RequestPermission(showNotification);
            }
            else {                                                          //已授权
                window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-silver?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s金色可能有货了",
                    "赶紧去看看吧！").show();
                is_nodify = true;
            }
        }
        else{
            console.log('你的浏览器不支持桌面通知');
        }
    }

    //定时发起检测请求
    window.setInterval(function(){
        $.ajax({
            url:ajax_url,
            type:'GET',
            dataType:'json',
            error:function () {
                console.log('请求失败');
            },
            success:function(feedback){
                var is_buy_able = feedback.body.content.selected.purchaseOptions.isBuyable;
                if(is_buy_able && !is_nodify){     //如果现在有货和没有提醒过用户，则弹框提示
                    showNotification();
                }
            }
        });
    },interval_time);
}

addJQuery(main);