// ==UserScript==
// @name           سكربت Filter Farm
// @namespace      حرب القبائل
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*&screen=am_farm*
// ==/UserScript==

function filters(){
    $("#am_widget_Farm").find("table").find("tr:eq(1)").nextAll("tr").each(function(){
        var tr = $(this);
        var res_wood = $(this).find("td:eq(5)").find("span:eq(0)").text().replace(".","")*1;
        var res_stone = $(this).find("td:eq(5)").find("span:eq(1)").text().replace(".","")*1;
        var res_iron = $(this).find("td:eq(5)").find("span:eq(2)").text().replace(".","")*1;
        var res_all = res_wood+res_stone+res_iron;
        var W = $("#wd").val();
        var S = $("#stn").val();
        var I = $("#irn").val();
        var A = $("#al").val();
        if(res_wood < W && res_stone < S && res_iron < I || res_all < A){
            tr.remove();
        }
    });
}
function filtwall(){
    $("#am_widget_Farm").find("table").find("tr:eq(1)").nextAll("tr").each(function(){
        var tr = $(this);
        var wall = $(this).find("td:eq(6)").text()*1;
        var W = $("#wl").val();
        if(wall >= W && W !== "0"){
            tr.remove();
        }
    });
}
$("#farm_units").parent("div").after('<div id="fltr" class="vis"><table class="vis" align="center" width="100%"><tbody><tr>\
<th><img src="/graphic/holz.png" title="خشب"> الخشب</th><th><img src="/graphic/lehm.png" title="طمي"> الطمي</th><th><img src="/graphic/eisen.png" title="حديد"> الحديد</th><th><img src="/graphic/res.png" title="المجموع"> المجموع</th></tr>\
<tr><td align="center"><input type="text" name="wood" id="wd" size="7" value="0"></td>\
<td align="center"><input type="text" name="stone" id="stn" size="7" value="0"></td>\
<td align="center"><input type="text" name="iron" id="irn" size="7" value="0"></td>\
<td align="center"><input type="text" name="all" id="al" size="7" value="0"></td></tr>\
</tbody></table></div>');
$("#fltr").after('<div id="flwl" class="vis" style="width:195px;"><table class="vis" width="100%"><tbody><tr>\
<th><img src="/graphic/buildings/wall.png" title="الحائط"> الحائط</th></tr>\
<tr><td align="center"><input type="text" name="wall" id="wl" size="7" value="0"></td>\
</tbody></table></div>');
$("#fltr").after('<table class="vis"><tbody><tr><td><button class="btn btn-confirm-yes" onclick="filters()">فلترة النهب</button></td></tr></tbody></table>');
$("#flwl").after('<table class="vis"><tbody><tr><td><button class="btn btn-confirm-yes" onclick="filtwall()">فلترة الحائط</button></td></tr></tbody></table>');
$("#farm_units").parent("div").after('<table class="vis bbcodetable" align="center"><tbody><tr><th>المبرمج :</th><td>\
<a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
$(document).on("change", "#wd", function(){
   var co_wd = $(this).val();
   if($("#wd").val() !== "0"){
      createCookie("co_wd", co_wd, 120);
   }else if($("#wd").val() == "0"){
      eraseCookie("co_wd");
   }
   return true;
});
var co_wd = readCookie("co_wd");
if(co_wd){
    $("#wd").val(co_wd);
}
$(document).on("change", "#stn", function(){
   var co_stn = $(this).val();
   if($("#stn").val() !== "0"){
      createCookie("co_stn", co_stn, 120);
   }else if($("#stn").val() == "0"){
      eraseCookie("co_stn");
   }
   return true;
});
var co_stn = readCookie("co_stn");
if(co_stn){
    $("#stn").val(co_stn);
}
$(document).on("change", "#irn", function(){
   var co_irn = $(this).val();
   if($("#irn").val() !== "0"){
      createCookie("co_irn", co_irn, 120);
   }else if($("#irn").val() == "0"){
      eraseCookie("co_irn");
   }
   return true;
});
var co_irn = readCookie("co_irn");
if(co_irn){
    $("#irn").val(co_irn);
}
$(document).on("change", "#al", function(){
   var co_al = $(this).val();
   if($("#al").val() !== "0"){
      createCookie("co_al", co_al, 120);
   }else if($("#al").val() == "0"){
      eraseCookie("co_al");
   }
   return true;
});
var co_al = readCookie("co_al");
if(co_al){
    $("#al").val(co_al);
}
$(document).on("change", "#wl", function(){
   var co_wl = $(this).val();
   if($("#wl").val() !== "0"){
      createCookie("co_wl", co_wl, 120);
   }else if($("#wl").val() == "0"){
      eraseCookie("co_wl");
   }
   return true;
});
var co_wl = readCookie("co_wl");
if(co_wl){
    $("#wl").val(co_wl);
}
function createCookie(name,value,days){
    if(days){
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++){
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name){
    createCookie(name,"",-1);
}
void(0);