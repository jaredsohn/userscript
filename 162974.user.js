// ==UserScript==
// @name        yhfcinfo
// @namespace   com.liang.longshine.gongshi
// @include     http://www.yhfc.gov.cn/building.php?*
// @require       http://code.jquery.com/jquery-1.9.1.min.js
// @grant       none
// @version     1
// ==/UserScript==
var area = "";
var price = "";
var priceOff = "";
var isPriceOff = false;
var reg_area = /\d*\.?\d*\s平方米/;
var reg_area_2 = /\d*\.?\d*/;
var reg_price = /申报价格： \d{4,5}/;
var reg_price_d = /\d{4,5}/;
var h = 84;
var colors = ["#ff0000", "#00ff00", "#000ff", "#ffff00", "#ff00ff", "#00ffff"];
var color = "";
var area_html = "";

/*房屋价格面积分布图*/
$("td[title^=' 房号']").each(function() {
    //  房号： 1602    当前状态： 已售    房屋用途： 一般住宅    预测建筑面积： 83.52 平方米    
    // 房屋坐落： 杭州市余杭区钱江经济开发区启城4幢1单元1602室    申报时间： 2012-10-19    申报价格： 8490   
    var title = $(this).attr("title");
    area = reg_area_2.exec(reg_area.exec(title));
    price = reg_price_d.exec(reg_price.exec(title));

    // 君廷雅园0.922的折扣
    if(title.indexOf("君廷雅园") != -1) {
        isPriceOff = true;
        priceOff = Math.round(price * 0.922);
    } else {
        priceOff = price;
    }
    var total = Math.round(area * priceOff);
    if(total > 1000000) {
        color = colors[0]
    } else if(total > 900000) {
        color = colors[1]
    } else if(total > 800000) {
        color = colors[2]
    } else if(total > 700000) {
        color = colors[3]
    } else if(total > 600000) {
        color = colors[4]
    } else {
        color = colors[5]
    };

    if(area > 100) {
        area_html = "面积: <font color='#ff0000' style='font-weight: bold;'>" + area + " m<sup>2</sup></font>";
    } else {
        area_html = "面积: <font color='#99ff00' style='font-weight: bold;'>" + area + " m<sup>2</sup></font>";
    };

    if(isPriceOff) {
        priceOff += "<sub>" + price + "</sub>";
    };

    var html = "<div style=\"color: rgb(0, 0, 0); text-align: left;\"> " + area_html + "<br>价格: " + priceOff + "<br/><font color='" + color + "' style='font-weight: bold; '>总价: " + total + "</font></div>";
    $(this).append(html);
});

/*楼层序号*/
$("table[id^='table_']").each(function() {
    if(isPriceOff) {
        $(this).attr("height", h + 3);
    } else {
        $(this).attr("height", h);
    }
});