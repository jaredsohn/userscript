// ==UserScript==
// @name iphone5s-iReservea-Checker
// @namespace  androidcn
// @version    1.0
// @description 检测香港官网的iPhone5s屌丝金和屌丝淫是否有货
// @match      http://ireservea.apple.com/HK/zh_HK/reserve/iPhone/checkAvailability*
// @copyright  2013, Twitter @Androidcn,Sina Weibo @能蟹仔
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
    var FWis_nodify = false;            //又一城屌丝金是否提醒过用户
    var IFCis_nodify = false;           //中环IFC屌丝金是否提醒过用户
    var CBis_nodify = false;            //铜锣湾屌丝金是否提醒过用户
    var SFWis_nodify = false;            //又一城屌丝淫是否提醒过用户
    var SIFCis_nodify = false;            //中环IFC屌丝淫是否提醒过用户
    var SCBis_nodify = false;            //铜锣湾屌丝淫是否提醒过用户
 
    var interval_time = 60000;         //检测的时间间隔
    var iphone_color = 'gold';       //设备颜色
    var iphone_size = '16gb';        //设备容量
    var iphone_ = '';
    var ajax_url = 'http://ireservea.apple.com/HK/zh_HK/reserve/iPhone/checkAvailability';
 
    //桌面提醒函数
    function RequestPermission (callback) {            //用户授权
        window.webkitNotifications.requestPermission(callback);
    }
 
    function showNotification(iPhonetype){
        if (window.webkitNotifications) {
            if (window.webkitNotifications.checkPermission() > 0) {         //未授权
                RequestPermission(showNotification);
            }
            else {                                                          //已授权
                if(iPhonetype==0)
                {
                     window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-gold?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s金色",
                    "Festival Walk 九龙塘").show();
                    FWis_nodify=true;
                }else if(iPhonetype==1)
                {
                      window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-gold?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s金色",
                    "IFC MALL 中环").show();
                    IFCis_nodify=true;
                }else if(iPhonetype==2)
                {
                     window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-gold?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s金色",
                    "Causeway Bay 铜锣湾").show();
                    CBis_nodify=true;
                }else if(iPhonetype==3)
                {
                     window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-silver?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s银色",
                    "Festival Walk 九龙塘").show();
                    SFWis_nodify=true;
                }else if(iPhonetype==4)
                {
                      window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-silver?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s银色",
                    "IFC MALL 中环").show();
                    SIFCis_nodify=true;
                }else if(iPhonetype==5)
                {
                     window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-silver?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s银色",
                    "Causeway Bay 铜锣湾").show();
                    SCBis_nodify=true;
                }
                /*
 
                swtich(iPhonetype)
                {
                    case 0:
                     window.webkitNotifications.createNotification(
                    "http://store.storeimages.cdn-apple.com/7364/as-images.apple.com/is/image/AppleInc/2013-iphone5s-silver?wid=110&hei=78&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,1.5,0,0&iccEmbed=0&layer=comp&.v=1378488415914",
                    "香港官网5s金色",
                    "Festival Walk 九龙塘").show();
                    break;
                    case 1:
 
                    break;
                    case 2:
 
                    break;
                }
               */
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
                             //   console.log('请求Success');
 
                var is_buy_able = feedback.reservationLandingPageResponse.skus;
                var dataObj=eval('('+is_buy_able+')');
                var R485=eval('dataObj.R485["iPhone 5s"].Unlocked["16GBHK$ 5,588"].Gold[0].enabled');
                var R428=eval('dataObj.R428["iPhone 5s"].Unlocked["16GBHK$ 5,588"].Gold[0].enabled');
                var R409=eval('dataObj.R409["iPhone 5s"].Unlocked["16GBHK$ 5,588"].Gold[0].enabled');
                var SR485=eval('dataObj.R485["iPhone 5s"].Unlocked["16GBHK$ 5,588"].Silver[0].enabled');
                var SR428=eval('dataObj.R428["iPhone 5s"].Unlocked["16GBHK$ 5,588"].Silver[0].enabled');
                var SR409=eval('dataObj.R409["iPhone 5s"].Unlocked["16GBHK$ 5,588"].Silver[0].enabled');
              //  console.log(R485);
                // console.log(R428);
                 //console.log(R409);
               /*
                $.each(is_buy_able, function(i, item) {
                     console.log(item['iPhone\s5s']);
                });
               */
               //如果现在有货和没有提醒过用户，则弹框提示
                if(R485&&!FWis_nodify)
                {
                    showNotification(0);
                }else
                {
                    //console.log("Festival Walk No Enable Products");
 
                }
                if(R428&&!IFCis_nodify){
                    showNotification(1);
                }else
                {
                    //console.log("IFC Mall No Enable Products");
 
                }
                if(R409&&!CBis_nodify){     
                    showNotification(2);
                }else
                {
                    //console.log("Causeway Bay No Enable Products");
 
                }
                 if(SR485&&!SFWis_nodify)
                {
                    showNotification(3);
                }else
                {
                    //console.log("Festival Walk No Enable Products");
 
                }
                if(SR428&&!SIFCis_nodify){
                    showNotification(4);
                }else
                {
                    //console.log("IFC Mall No Enable Products");
 
                }
                if(SR409&&!SCBis_nodify){     
                    showNotification(5);
                }else
                {
                    //console.log("Causeway Bay No Enable Products");
 
                }
 
            }
        });
    },interval_time);
}
 
addJQuery(main);