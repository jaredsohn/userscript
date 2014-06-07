// ==UserScript==
// @name           Noble Train Ay
// @namespace      tribalwars 
// @version        1.0
// @author         Aywac
// @description    Sending Trains from player profile
// @include        http://ae*.tribalwars.ae/game.php*&screen=info_player
// @include        http://ae*.tribalwars.ae/game.php*&screen=place
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });

if(document.URL.indexOf("info_player") >= 0){
    $(".vis:eq(2)").remove();
    $(".vis:eq(2)").remove();
    $(".vis:eq(2)").remove();
    $(".vis:eq(2)").remove();
    $("#content_value").find("td:first + td").find("br").remove();
}

$(function(){
    if(document.URL.indexOf("axe") >= 0){
        var axe_c = document.URL.match(/\d+/g)[3];
        $("#unit_input_axe").val(axe_c);
    }if(document.URL.indexOf("spy") >= 0){
        var spy_c = document.URL.match(/\d+/g)[4];
        $("#unit_input_spy").val(spy_c);
    }if(document.URL.indexOf("light") >= 0){
        var light_c = document.URL.match(/\d+/g)[5];
        $("#unit_input_light").val(light_c);
    }if(document.URL.indexOf("ram") >= 0){
        var ram_c = document.URL.match(/\d+/g)[6];
        $("#unit_input_ram").val(ram_c);
    }if(document.URL.indexOf("snob") >= 0){
        var snob_c = document.URL.match(/\d+/g)[7];
        $("#unit_input_snob").val(snob_c);
    }
});

if (game_data.player.premium == false) {
    var lnk = "/game.php?screen=overview_villages";
}else if (game_data.player.premium == true) { 
    var lnk = "/game.php?screen=overview_villages&mode=prod";
}
    
    if (!document.URL.match('screen=info_player')){
        if (!document.URL.match('screen=place')){
            UI.InfoMessage('السكربت يشتغل من بروفيل اللاعبين',3000,true);
        }
    }else if (!document.URL.match('screen=place')){
        if (!document.URL.match('screen=info_player')){
            UI.InfoMessage('السكربت يشتغل من بروفيل اللاعبين',3000,true);
        }
    }
        
        function replace(){
            $("#production_table").find("tr").each(function(){
                var villageID = $("#villages_list").find("tr").find(":checked + span").find("a:eq(0)").attr("href").match(/\d+/g)[1];
                var villagID = $("#production_table").find("tr:last").find("td:eq(0)").find("a:eq(0)").attr("link").match(/\d+/g)[1];
                var $this = $(this);
                var t = $this.html();
                $this.html(t.replace(""+villagID+"",""+villageID+""));
            });
        }

function troops(){
    $("#production_table").find("tr").find(":checked").parent("td").parent("tr").each(function(){
        var axe = $(this).find(".axea").val();
        var $this = $(this).find("td:eq(0)").find("span:first");
        var t = $this.html();
        $this.html(t.replace(/axe=\d+/,"axe="+axe+""));
    });
    $("#production_table").find("tr").find(":checked").parent("td").parent("tr").each(function(){
        var spy = $(this).find(".spya").val();
        var $this = $(this).find("td:eq(0)").find("span:first");
        var t = $this.html();
        $this.html(t.replace(/spy=\d+/,"spy="+spy+""));
    });
    $("#production_table").find("tr").find(":checked").parent("td").parent("tr").each(function(){
        var light = $(this).find(".lighta").val();
        var $this = $(this).find("td:eq(0)").find("span:first");
        var t = $this.html();
        $this.html(t.replace(/light=\d+/,"light="+light+""));
    });
    $("#production_table").find("tr").find(":checked").parent("td").parent("tr").each(function(){
        var ram = $(this).find(".rama").val();
        var $this = $(this).find("td:eq(0)").find("span:first");
        var t = $this.html();
        $this.html(t.replace(/ram=\d+/,"ram="+ram+""));
    });
    $("#production_table").find("tr").find(":checked").parent("td").parent("tr").each(function(){
        var snob = $(this).find(".snoba").val();
        var $this = $(this).find("td:eq(0)").find("span:first");
        var t = $this.html();
        $this.html(t.replace(/snob=\d+/,"snob="+snob+""));
    });
}

function five(){
    $("#production_table").find("tr").find("td:eq(0)").find("a").attr("onclick","tran();clcks();");
}

function tran(){
   var color = $("#production_table").find("tr").find(":checked").nextAll("span:first").find("a:first").css("color");
   var opera = navigator.appName;
   if(opera == "Opera"){
      if(color == "rgb(96, 48, 0)"){
         var axec = $("#units").find("tr").find(".axeb").val();
         var spyc = $("#units").find("tr").find(".spyb").val();
         var lightc = $("#units").find("tr").find(".lightb").val();
         var ramc = $("#units").find("tr").find(".ramb").val();
         var snobc = $("#units").find("tr").find(".snobb").val();

         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".axea").val(axec);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".spya").val(spyc);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".lighta").val(lightc);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".rama").val(ramc);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".snoba").val(snobc);
         troops();
         $("#production_table").find("tr").find(":checked").nextAll("span:first").find("a:first").attr("style", "color:red");
      }else if(color == "rgb(255, 0, 0)"){
         var a1 = $(".axea:last").val();
         var a2 = $(".spya:last").val();
         var a3 = $(".lighta:last").val();
         var a4 = $(".rama:last").val();
         var a5 = $(".snoba:last").val();

         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".axea").val(a1);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".spya").val(a2);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".lighta").val(a3);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".rama").val(a4);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".snoba").val(a5);
         troops();
         $("#production_table").find("tr").find(":checked").nextAll("span:first").find("a:first").attr("style", "color:black");
      }
   }else if(opera !== "Opera"){
      if(color == "rgb(96, 48, 0)"){
         $("#production_table").find("tr").find(":checked").nextAll("span:first").find("a:first").attr("style", "color:red");
      }else if(color == "rgb(255, 0, 0)"){
         var axec = $("#units").find("tr").find(".axeb").val();
         var spyc = $("#units").find("tr").find(".spyb").val();
         var lightc = $("#units").find("tr").find(".lightb").val();
         var ramc = $("#units").find("tr").find(".ramb").val();
         var snobc = $("#units").find("tr").find(".snobb").val();

         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".axea").val(axec);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".spya").val(spyc);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".lighta").val(lightc);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".rama").val(ramc);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find(".snoba").val(snobc);
         troops();
         $("#production_table").find("tr").find(":checked").nextAll("span:first").find("a:first").attr("style", "color:black");
      }
   }
}

function clck(){
   var URL = $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find("a:eq(0)").attr("link");
   var color = $("#production_table").find("tr").find(":checked").nextAll("span:first").find("a:first").css("color");
   var opera = navigator.appName;
   if(opera == "Opera"){
      if(color == "rgb(255, 0, 0)"){
         window.open(URL);
      }else if(color == "rgb(0, 0, 0)"){
         for(i = 0; i < 3; i ++ ){
            window.open(URL);
         }
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").remove();
      }
   }else if(opera !== "Opera"){
      if(color == "rgb(255, 0, 0)"){
         for(i = 0; i < 3; i ++ ){
            window.open(URL);
         }
      }else if(color == "rgb(0, 0, 0)"){
         window.open(URL);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").remove();
      }
   }
}

function clcks(){
   var URL = $("#production_table").find("tr").find(":checked").parent("td").parent("tr").find("a:eq(0)").attr("link");
   var color = $("#production_table").find("tr").find(":checked").nextAll("span:first").find("a:first").css("color");
   var opera = navigator.appName;
   if(opera == "Opera"){
      if(color == "rgb(255, 0, 0)"){
         window.open(URL);
      }else if(color == "rgb(0, 0, 0)"){
         for(i = 0; i < 4; i ++ ){
            window.open(URL);
         }
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").remove();
      }
   }else if(opera !== "Opera"){
      if(color == "rgb(255, 0, 0)"){
         for(i = 0; i < 4; i ++ ){
            window.open(URL);
         }
      }else if(color == "rgb(0, 0, 0)"){
         window.open(URL);
         $("#production_table").find("tr").find(":checked").parent("td").parent("tr").remove();
      }
   }
}

if(document.URL.indexOf("info_player") >= 0){
    $(".vis:first").after('<table class="vis bbcodetable" align="center"><tbody>\
<tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr>\
</tbody></table>');
}

$("#villages_list").find("tr").find("td:eq(0)").prepend('<input name="rdo" type="radio" onclick="replace()">');
if(document.URL.indexOf("info_player") >= 0){
    
    $("#content_value").find("td:first + td").each(function(){
        var overview_villages = $(this);
        var url = lnk;
        
        $.ajax({
            url:url,
            datatype:"html",
            success :function(data){
                
                var vlg = $(data).find("#production_table");
                
                $(overview_villages).append(vlg);
                
                if (game_data.player.premium == false) {
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                }else if (game_data.player.premium == true) {
                    $("#production_table").find("th:nth-child(1)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("th:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(1)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                    $("#production_table").find("td:nth-child(2)").remove();
                }
                    
                    $("#production_table").find("tr").find("th:first").after('<th><img src="/graphic/unit/unit_axe.png" onclick=\'$(".axea").val(prompt("أدخل عدد مقاتلي الفأس","100"));troops();\' title="مقاتل الفأس"></th>\
<th><img src="/graphic/unit/unit_spy.png" onclick=\'$(".spya").val(prompt("أدخل عدد الكشافة","0"));troops();\' title="كشافة"></th>\
<th><img src="/graphic/unit/unit_light.png" onclick=\'$(".lighta").val(prompt("أدخل عدد الفرسان الخفيفة","0"));troops();\' title="فارس خفيف"></th>\
<th><img src="/graphic/unit/unit_ram.png" onclick=\'$(".rama").val(prompt("أدخل عدد محطمات الحائط","0"));troops();\' title="محطمة الحائط"></th>\
<th><img src="/graphic/unit/unit_snob.png" onclick=\'$(".snoba").val(prompt("أدخل عدد النبلاء","1"));troops();\' title="نبيل"></th>');
                
                $(overview_villages).find("tr").find("td:first").after('<td><input type="text" style="width:40px" tabindex="6" value="100" class="axea" onchange="troops()"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="0" class="spya" onchange="troops()"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="0" class="lighta" onchange="troops()"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="0" class="rama" onchange="troops()"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="1" class="snoba" onchange="troops()"></td>');
                
                $("#production_table").find("tr").find("td:eq(0)").prepend('<input name="box" type="radio" onclick="troops()">');
                $("#production_table").before('<table class="vis bbcodetable"><tbody>\
<tr><td><input name="bx" onclick="five()" type="checkbox"> <b>قطار خماسي</b></td></tr>\
</tbody></table>');
                $("#production_table").before('<table id="units" class="vis" width="100%"><tbody><tr>\
<th><img src="/graphic/unit/unit_axe.png" title="مقاتل الفأس"></th>\
<th><img src="/graphic/unit/unit_spy.png" title="كشافة"></th>\
<th><img src="/graphic/unit/unit_light.png" title="فارس خفيف"></th>\
<th><img src="/graphic/unit/unit_ram.png" title="محطمة الحائط"></th>\
<th><img src="/graphic/unit/unit_snob.png" title="نبيل"></th>\
</tr><tr>\
<td><input type="text" style="width:40px" tabindex="6" value="6700" class="axeb"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="4" class="spyb"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="3000" class="lightb"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="200" class="ramb"></td>\
<td><input type="text" style="width:40px" tabindex="6" value="1" class="snobb"></td>\
</tr></tbody></table>');
                
                $("#production_table").find("tr").find("td:eq(0)").each(function(){
                    $(this).find("a").attr("target","_blank").attr("onclick","tran();clck();").attr("style","color:rgb(96, 48, 0)");
                });
                $("#production_table").find("tr").each(function(){
                    var $this = $(this);
                    var t = $this.html();
                    $this.html(t.replace(/screen=overview/g,'target=000&screen=place&axe=0&spy=0&light=0&ram=0&snob=0'));
                });
                $("#production_table").find("tr").each(function(){
                    var $this = $(this);
                    var t = $this.html();
                    $this.html(t.replace(/href/g,"link"));
                });
            }
        });
    });
}