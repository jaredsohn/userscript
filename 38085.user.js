// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Kaixin Tycoon Assistant
// @namespace       http://cuimingda.com
// @description     In the "Tycoon Game", view all company price.
// @include         http://tycoon.kaixin.com/buildEmpire.do*
// @include         http://tycoon.kaixin.com/myEmpire.do*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
// 0.1 @ 2008/12/04 # Initial Release
// 0.2 @ 2008/12/18 # 把价格范围修改为利润范围
// 0.3 @ 2008/12/19 # Added Greassmonkey meta require, need reinstall script.
// --------------------------------------------------------------------------------

;(function() {
    $(document).ready(function() {
        location.href.indexOf("buildEmpire.do") !== -1 ? buying() : selling();
    });
    
    var priceData={'1':[1,2],'2':[2,4],'3':[4,6],'4':[18,21],'5':[35,40],'6':[38,43],'7':[52,55],'8':[66,71],'9':[96,105],'10':[110,118],'11':[116,124],'12':[140,146],'13':[190,200],'14':[255,267],'15':[550,567],'16':[560,577],'17':[630,650],'18':[760,784],'19':[920,949],'20':[1200,1238],'21':[1,2],'22':[1,4],'23':[3,5],'24':[5,8],'25':[1,5],'26':[46,51],'27':[60,64],'28':[150,157],'29':[160,167],'30':[240,251],'31':[720,743],'32':[920,949],'33':[1100,1140],'34':[2600,2660],'35':[4300,4400],'36':[40000,40440],'37':[78000,78870],'38':[260000,262391],'39':[5,7],'40':[32,37],'41':[35,41],'42':[65,70],'43':[79,85],'44':[340,356],'45':[780,805],'46':[1240,1269],'47':[3000,3069],'48':[4000,4092],'49':[6500,6680],'50':[7000,7180],'51':[8,12],'52':[10,14],'53':[23,26],'54':[32,37],'55':[32,37],'56':[46,50],'57':[70,75],'58':[90,97],'59':[100,107],'60':[145,152],'61':[160,167],'62':[180,188],'63':[500,516],'64':[520,536],'65':[580,598],'66':[1100,1135],'67':[1100,1135],'68':[1400,1432],'69':[1600,1637],'70':[10,14],'71':[50,54],'72':[100,107],'73':[300,315],'74':[400,420],'75':[600,619],'76':[600,619],'77':[800,826],'78':[1000,1032],'79':[5,9],'80':[80,86],'81':[80,86],'82':[80,86],'83':[100,108],'84':[180,188],'85':[280,293],'86':[420,433],'87':[420,433],'88':[700,722],'89':[900,929],'90':[2000,2049],'91':[10,40],'92':[700,796],'93':[40,100],'94':[20,100],'95':[100,196],'96':[200,338],'97':[60,120],'98':[200,311],'99':[40000,40933]};
    
    var buying = function() {
        var cash = getMoneyValue($("#app-dh-banner-inf>dl>dd:eq(1)>span").text());
        
        $(":hidden[name=product_id]").each(function() {
            var id = $(this).attr('value');
            var price = parseInt($(this).next().attr("value"));
            var minProfit = getMoneyText(priceData[id][0] - price);
            var maxProfit = getMoneyText(priceData[id][1] - price);
            var countCanBuy = Math.floor(cash / price) > 5 ? 5 : Math.floor(cash / price);
            
            $(this).nextAll("dt").append("(" + countCanBuy + ")");
            if(countCanBuy > 0) {
                $(this).nextAll("dt").css({ color:'red' });
            }
            
            $(this).nextAll(".com-prc:first").append("<br/>" + minProfit + ' - ' + maxProfit);
            if(price === priceData[id][0]) {
                $(this).nextAll(".com-prc:first").css({ color:'red' });
            }
        });
    };
    
    var selling = function() {
        $("form[action*=sellProduct]>input[name=product_id]").each(function() {
            var id = $(this).attr('value');
            var price = getMoneyValue($(this).parent().parent().prev().prev().prev().find("span:first").text());
            
            var minProfit = getMoneyText(priceData[id][0] - price);
            var maxProfit = getMoneyText(priceData[id][1] - price);
            
            var appendText = '<dt>' + minProfit + ' - ' + maxProfit + '</dt>';

            $(this).parent().parent().before(appendText)
        });



    };
    
    var getMoneyPrefix = function(val) {
        var prefix = "";
        
        if(val > 0) { prefix = "赚"; }
        else if(val < 0) { prefix = "赔"; }
        else { prefix = "本"; }
        
        return prefix;
    };
    
    var getMoneyText = function(val) {
        var hundredMillion = Math.floor(Math.abs(val) / 100);
        var tenThousand = Math.abs(val) % 100;
        return getMoneyPrefix(val) + (hundredMillion === 0 ? '': hundredMillion + '亿') + (tenThousand === 0 ? '': tenThousand + '00万');
    };
    
    var getMoneyValue = function(str) {
        var money = str.match(/\uFFE5?(?:(\d+)\u4EBF)?(?:(\d+)\u4E07)?/);
        var moneyValue = 0;
        if(money) {
            moneyValue = (typeof(money[1]) === 'undefined' ? 0 : parseInt(money[1]) * 100) + 
                (typeof(money[2]) === 'undefined' ? 0 : Math.floor(parseInt(money[2]) / 100));
        }
        return moneyValue;
    };
})();