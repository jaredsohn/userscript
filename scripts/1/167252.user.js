// ==UserScript==
// @name         إحصائيات اللاعب والقبائل
// @version  1.0
// @include       http://ae*tribalwars.ae/*screen=info_player
// @author         Aywac تم التعديل من طرف
// ==/UserScript==

if(game_data.screen!="info_player"&&game_data.screen!="info_ally"){
    alert("يجب الذهاب إلى بروفايل لاعب أو قبيلة لعرض الإحصائيات");
    stop()
}
var id=$(location).attr("href").match(/id=([0-9]+)/)[1];
var mode=game_data.screen=="info_player"?"player":"tribe";
if($("#stats").length==0)$("h2").append("<table class=vis id=stats>\
<tr><th>النقاط</th><th>نقاط الهجوم</th><th>نقاط الدفاع</th></tr>\
<tr><td><img src=http://"+game_data.world+".tribalwarsmap.com/"+game_data.market+"/graph/hd_"+mode+"/"+id+"></td><td><img src=http://"+game_data.world+".tribalwarsmap.com/"+game_data.market+"/graph/oda_"+mode+"/"+id+"></td><td><img src=http://"+game_data.world+".tribalwarsmap.com/"+game_data.market+"/graph/odd_"+mode+"/"+id+"></td></tr>\
</table>");