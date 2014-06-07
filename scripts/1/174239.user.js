// ==UserScript==
// @name           القنص بدون عضوية خاصة
// @namespace      حرب القبائل
// @description	   Version 3.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*screen=overview_villages&mode=combined
// @include        http://ae*.tribalwars.ae/game.php?*screen=overview
// @exclude        http://ae*.tribalwars.ae/game.php?t=*
// ==/UserScript==

$(function(){
    
    var villageID = document.URL.match(/\d+/g)[1];
    
    $('#show_units tbody').append('<tr><td><a href="/game.php?village='+ villageID +'&screen=overview_villages&mode=combined">» الشكل العام</a></td></tr>');
    
});

$("#production_table").find("th:nth-child(2)").remove();
$("#production_table").find("th:nth-child(2)").remove();
$("#production_table").find("th:nth-child(2)").remove();
$("#production_table").find("th:nth-child(2)").remove();

$("#production_table").find("td:nth-child(2)").remove();
$("#production_table").find("td:nth-child(2)").remove();
$("#production_table").find("td:nth-child(2)").remove();
$("#production_table").find("td:nth-child(2)").remove();

$('#production_table').find('tr:eq(0)').prepend('<th><span class="note-icon"></span></th>');
$('#production_table').find('td:nth-child(1)').before('<td></td>');

$("#production_table").find("tr:eq(0)").append('<th width="20"><img src="/graphic/overview/main.png" title="المبنى الرئيسي"></th>');
$("#production_table").find("tr:eq(0)").append('<th width="20"><img src="/graphic/overview/barracks.png" title="الثكنات"></th>');
$("#production_table").find("tr:eq(0)").append('<th width="20"><img src="/graphic/overview/stable.png" title="الاسطبل"></th>');
$("#production_table").find("tr:eq(0)").append('<th width="20"><img src="/graphic/overview/garage.png" title="الورشه"></th>');
$("#production_table").find("tr:eq(0)").append('<th width="20"><img src="/graphic/overview/smith.png" title="الحداد"></th>');
$("#production_table").find("tr:eq(0)").append('<th width="20"><img src="/graphic/buildings/place.png" title="نقطة التجمع"></th>');

$("#production_table").find("tr").each(function(index) {
    if (index != 0) {
        
        var villageID = $(this).find("a").attr("href").match(/\d+/g)[0];
        
        $(this).append('<td><a href="/game.php?village=' + villageID + '&screen=main"><img src="/graphic//overview/prod_avail.png"></a></td>');
        $(this).append('<td><a href="/game.php?village=' + villageID + '&screen=barracks"><img src="/graphic//overview/prod_avail.png"></a></td>');
        $(this).append('<td><a href="/game.php?village=' + villageID + '&screen=stable"><img src="/graphic//overview/prod_avail.png"></a></td>');
        $(this).append('<td><a href="/game.php?village=' + villageID + '&screen=garage"><img src="/graphic//overview/prod_avail.png"></a></td>');
        $(this).append('<td><a href="/game.php?village=' + villageID + '&screen=smith"><img src="/graphic//overview/prod_avail.png"></a></td>');
        $(this).append('<td><a href="/game.php?village=' + villageID + '&screen=place"><img src="/graphic//overview/prod_avail.png"></a></td>');
    }
});

$(function(){

        var villageID = $(this).find("a").attr("href").match(/\d+/g)[0];

$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=spear&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_spear.png" alt="" title="مقاتل الرمح"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=sword&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_sword.png" alt="" title="مقاتل السيف"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=axe&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_axe.png" alt="" title="مقاتل الفأس"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=archer&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_archer.png" alt="" title="رماة القوس"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=spy&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_spy.png" alt="" title="كشافة"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=light&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_light.png" alt="" title="فارس خفيف"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=marcher&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_marcher.png" alt="" title="فارس قوس"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=heavy&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_heavy.png" alt="" title="فارس ثقيل"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=ram&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_ram.png" alt="" title="محطمة الحائط"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=catapult&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_catapult.png" alt="" title="مقلاع"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th style="text-align:center"><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=knight&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_knight.png" alt="" title="قائد الفرسان"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th><a href="/game.php?village=' + villageID + '&amp;page=-1&amp;order=snob&amp;dir=desc&amp;mode=combined&amp;group=0&amp;screen=overview_villages"><img src="/graphic/unit/unit_snob.png" alt="" title="نبيل"></a></th>');
$("#production_table").find("tr:eq(0)").append('<th><img src="/graphic/unit/unit_militia.png" alt="" title="ميليشيا"></th><th>');

});

$("#production_table").find("tr").each(function(index) {
    if (index != 0) {

$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td class="unit-item">1</td>');
$(this).append('<td></td>');
    }
});



$("#production_table").find("tr:eq(0)").find("th:last").append('<img src="/graphic/buildings/snob.png" title="الاكاديميه">');

$("#production_table").find("tr").each(function(index) {
    if (index != 0) {
        
        var villageID = $(this).find("a").attr("href").match(/\d+/g)[0];
        
        $(this).find("td:last").append('<td><a href="/game.php?village=' + villageID + '&screen=snob"><img src="/graphic//overview/prod_avail.png"></a></td>');
    }
});

document.getElementById("production_table").id="combined_table";