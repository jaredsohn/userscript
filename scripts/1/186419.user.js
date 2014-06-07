// ==UserScript==
// @name      okcoin 
// @namespace  http://qiangtoutou.weibo.com
// @version    2014-02-14 09:57:03
// @description  okcoin
// @match      https://www.okcoin.com/ltc.do*
// ==/UserScript==


!function($){
  var myPassword='',//交易密码
    store=(function(){
        var prefix='okcoin'
        return {
            save:function(name,val){
                localStorage.setItem(prefix+name,val);
            },
            get:function(val){
                return localStorage.getItem(prefix+name);
            }
        };
    })();
     
     var pw=store.get('pw')||myPassword;
    store.save('pw',pw);
    var amount=$('#tradeAmount').keyup(function(e){
        var c=e.keyCode;
        if(c==13){
            submitTradeBtcForm();
        }
    }),
        box=$('#coinBoxbuybtc'),
        bannerLtcLast=$('#bannerLtcLast'),
        stop=false,
        flag=$('<div>').addClass('red').html((stop?'停止自动拉取':'自动拉取中')+",按Esc切换"),
        init=function(){
            $('#tradePwd').val(pw);
            amount.focus();
            box.append(flag);
        }
    init();
    
    $('body').keyup(function(e){
        var c=e.keyCode;
        if(c==27){
            stop=!stop;
            flag.html((stop?'停止自动拉取':'自动拉取中')+",按Esc切换");
        }
    });
    
    
    //***********************************************************************************
    //打开行情
    showKLine(3,1);//打开莱特币行情,3是币种，1是5分钟线
    $("#handleChart").show().stop(true).animate({'margin-top':0,'opacity':1},100);
    //***********************************************************************************
    var tradeCnyPrice=$('#tradeCnyPrice');
    //0是买入,要取卖1,在表格的第5行
    //1是卖出，,要取买2,在表格的第6行
    var tradeType=$('#tradeType').val();
    var tradeIndex={0:5,1:6}
    
    var time=500;
    var go=function(){
        setTimeout(function(){
            var url='https://www.okcoin.com/handleEntrust.do?symbol=1&tradetype='+tradeType+'&random='+(Math.random()*100|0);
            !stop && $.get(url,function(html){
                box.html(html);
                var li=box.find('li');
                var price=li.eq(tradeIndex[tradeType]);
                price.css({
                    border:'solid 2px'
                });
                price=box.find('#sellPrice1').val();
                tradeCnyPrice.val(price);
                bannerLtcLast.html(price);
                tradeTurnoverValue();
                init();
            });
            go(); 
        },time);
    }
    go();
    //***********************************************************************************
}(jQuery);
