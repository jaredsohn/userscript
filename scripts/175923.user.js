// ==UserScript==
// @name           ID Attack
// @namespace      حرب القبائل
// @description	   Version 3.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*screen=place
// @include        http://ae*.tribalwars.ae/*screen=place&mode=command
// @exclude        http://ae*.tribalwars.ae/*try=confirm&screen=place
// ==/UserScript==  

$(function(){
    var th = $(".vis:last").find("th:eq(1)").html();
    var title = "الوصول";
    
    if(title == th){
        $(".vis:last").each(function(){
            $(this).find("th:nth-child(3)").remove();
            $(this).find("td:nth-child(4)").remove();
            $(this).find(".no_ignored_command").prepend('<input class="chk" type="checkbox">');
            $(this).prepend('<td><input id="att" type="button" value="ID"></td>');
            $(this).find("tr:eq(0)").prepend('<td style="background-color:#c1a264;"><input id="all" type="checkbox"></td>');
            $(this).find("tr:eq(0)").find("th:last").after("<th>ID Attack</th>");
            $(this).find("tr:eq(0)").find("th:eq(2)").after("<th>نوع الهجمة</th>");
            $(this).find(".no_ignored_command").find("td:eq(2)").after('<td class="woc"></td>');
            $(this).find(".no_ignored_command").find("td:eq(3)").after('<td class="trp"></td>');
            $(this).find("tr:last").find("td").attr("colspan","6");
            $(this).find(".no_ignored_command").each(function(){
                var woc = $(this).find("td:eq(3)");
                var ID_Attack = $(this).find("a:eq(0)").attr("href").match(/\d+/g)[1];
                $(woc).append(ID_Attack);
            });            
        });
    }
});

$(function(){
    var th = $(".vis:last").find("th:eq(1)").html();
    var title = "الوصول";
    
    if(title == th){
        $("#all").click(function(){
            $(".vis:last").find(".no_ignored_command").find(".chk").click();
        });
        $("#att").click(function(){
            $(".vis:last").find(".no_ignored_command").find(":checked").each(function(){
                var td = $(this).nextAll(".trp");
                var url = $(this).nextAll("td:eq(0)").find("a:eq(0)").attr("href"); 
                
                $.ajax({
                    url:url,
                    datatype:"html",
                    cache:true,
                    success :function(data){    
                        
                        var local_village = (typeof unsafeWindow != 'undefined' ? unsafeWindow : window).game_data.village.coord.split('|');
                        var remote_village = $(data).find(".vis:first").find("tr:eq(2)").find("td:eq(1)").find("a:eq(0)").html().match(/\d+\|\d+/);
                        remote_village = (''+remote_village).split('|');
                        
                        var distance = Math.sqrt(Math.pow(local_village[0] - remote_village[0], 2) + Math.pow(local_village[1] - remote_village[1], 2)).toFixed(2);
                        
                        var n = $(".vis:last").find(".no_ignored_command").find(":checked").nextAll("td").find(".timer").html().split(":");
                        var unit = (((n[0]*3600)+(n[1]*60)+(n[2]*1)+(prompt('أدخل عدد الساعات')*3600))/(distance*60)).toFixed(2);
                        $(".vis:eq(0)").after('<td id="hk" style="display:block;">'+unit+'</td>');
                        
                        var c = $("#content_value").find("#hk").html().split(".");
                        if(100 >= c[0] && 30 <= c[0]){
                            $(td).html("<center>نبيل</center>");
                        }else if(29 >= c[0] && 22 <= c[0]){             
                            $(td).html("<center>محطمة<center>");
                        }else if(21 >= c[0] && 18 <= c[0]){             
                            $(td).html("<center>سيف</center>");
                        }else if(17 >= c[0] && 11 <= c[0]){             
                            $(td).html("<center>فأس</center>");
                        }else if(10 >= c[0] && 10 <= c[0]){             
                            $(td).html("<center>ثقيل</center>");
                        }else if(9 >= c[0] && 9 <= c[0]){             
                            $(td).html("<center>خفيف</center>");
                        }else if(8 >= c[0] && 0 <= c[0]){             
                            $(td).html("<center>كشافة</center>");
                        }
                            }
                });
            });
        });
    }
});