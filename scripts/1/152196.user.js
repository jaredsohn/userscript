// ==UserScript==
// @name       Futmondo: Show ratio points/price
// @namespace  http://futmondo.com/market
// @version    0.11
// @description  Displays the ratio between points and price for each player, next to the points.
// @include      http://www.futmondo.com/market*
// @copyright  2012+, daviz1982
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @history    0.11 Minor bug fixed: on filtering by position, ratio dissapeared.
// @history    0.1 Initial release.
// ==/UserScript==
setTimeout( calcRatio, 2000);
$(document).on("click", ".tabs .tabsMarket li", function(){calcRatio();});
$(document).on("click", ".tmTitles li", function(){calcRatio();});
function calcRatio(){
    var $points,$values,points,values,i,ratio,v,p,s1,s2;
    $points = $("#marketPlayers .tmPlayer .points");
    $values = $("#marketPlayers .tmPlayer .cost");
    
    points = [];
    values = [];
    
    $points.each(function(){
        points.push($(this).text());
    });
    $values.each(function(){
        values.push($(this).text());
    });
    
    ratio = [];
    
    for(i in points) {
        v = parseFloat(values[i]);
        p = (points[i]>=0)?(parseInt(points[i])):(0);
        ratio.push(p/v);
    }
    
    i = 0;
    $points.each(function(){
        s1 = ratio[i];
        s2 = ratio[i].toString();
        s2 = (s1<10)?(s2.slice(0,4)):(s2.slice(0,5));
        $(this).html($(this).text()+"/<span class=\"grisd\">" + s2 + "</span>");
        i++;
    });
    
}
GM_addStyle("#marketPlayers .tmPlayer .points {"+
            "font-weight: 400;"+
            "text-shadow: none;"+
            "font-size: 11px;"+
            "}");
GM_addStyle(".grisd{color:#999;}");
