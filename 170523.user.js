/*

 ###########################################################
#                                                           #
#     #  #         #  #                                     #
#     # #    ###   # #   ###      ###   ###    ##   ###     #
#     ##    #   #  ##   #   #    #   # #   #  # #  #   #    # 
#     ##    #####  ##   #####       #  #   #    #  #   #    #
#     # #   #      # #  #          #   #   #    #  #   #    #
#     #  #   ###   #  #  ###  # # ####  ###    ###  ###     #
#                                                           #
 ###########################################################
________________________________________________________

// ==UserScript==
// @name           Tribal Wars (keke)
// @namespace      www.tribalwars.ae
// @description    Script comprehensive game Tribal Wars - سكربت لتطوير الحساب 
// @include        http*://*.tribalwars.ae/*
// @version        1
// Upload date     13.06.2013 - time: 03:18
// data            2013
// Programmer      fessal 
// Nickname        keke..2010
// url             http://forum.tribalwars.ae/member.php?u=24151
// url             www.tribalwars.ae
// skype           keke..2010 
// email           boob-77@hotmail.com
// ==/UserScript==
__________________________________________________

Copyright (C) 2013 (keke..2010), all rights reserved
version 1 , 19 April 2013
________________________________________

*/




var $ = unsafeWindow.jQuery;
var $unsafeWindow = $(unsafeWindow);



var combined = document.URL.match(/combined/);
if(combined == 'combined'){
    
    $("<h4>تم برمجة السكربت من قبل <a target='keke' href='http://forum.tribalwars.ae/member.php?u=24151'>keke..2010</a></h4></br></br>").prependTo(".vis:eq(2)");    
    $("<button id ='k'>تدريب النبلاء</button>").appendTo(".vis:eq(2)");
    
    $("#k").click(function(){
        
        var Nam = $("#combined_table th").length; // 9
        
        if(Nam == 19){
            
            $('#combined_table tr td:nth-child(17)').each(function(){ 
                var zz =  $(this).find("a").text(); 
                if(zz >= 5){ 
                    $(this).css("background-color","#FF6A6A"); 
                }else if(zz < 5){ 
                    $(this).css("background-color","#CAFFCA"); 
                } 
                    }); 
            $(function(){ 
                $('#combined_table tr').each(function(i){ 
                    var keke = $(this).find('td:nth-child(17)').find('a').attr("href"); 
                    var ke = $(this).find("td:eq(16)"); 
                    $.ajax({ 
                        url: keke, 
                        datatype: "html", 
                        success : function (data) { 
                            var k = $(data).find(".vis:eq(1)").find("tr td:eq(5)").find("a"); 
                            $(ke).append(" | ").append(k); 
                        } 
                    }); 
                }); 
            }); 
            
            
        }else if(Nam == 20){ // 10
            
            $('#combined_table tr td:nth-child(18)').each(function(){ 
                var zz =  $(this).find("a").text(); 
                if(zz >= 5){ 
                    $(this).css("background-color","#FF6A6A"); 
                }else if(zz < 5){ 
                    $(this).css("background-color","#CAFFCA"); 
                } 
                    }); 
            $(function(){ 
                $('#combined_table tr').each(function(i){ 
                    var keke = $(this).find('td:nth-child(18)').find('a').attr("href"); 
                    var ke = $(this).find("td:eq(17)"); 
                    $.ajax({ 
                        url: keke, 
                        datatype: "html", 
                        success : function (data) { 
                            var k = $(data).find(".vis:eq(1)").find("tr td:eq(5)").find("a"); 
                            $(ke).append(" | ").append(k); 
                        } 
                    }); 
                }); 
            }); 
            
            
        } else if (Nam == 21){ // 11
            
            $('#combined_table tr td:nth-child(19)').each(function(){ 
                var zz =  $(this).find("a").text(); 
                if(zz >= 5){ 
                    $(this).css("background-color","#FF6A6A"); 
                }else if(zz < 5){ 
                    $(this).css("background-color","#CAFFCA"); 
                } 
                    }); 
            $(function(){ 
                $('#combined_table tr').each(function(i){ 
                    var keke = $(this).find('td:nth-child(19)').find('a').attr("href"); 
                    var ke = $(this).find("td:eq(18)"); 
                    $.ajax({ 
                        url: keke, 
                        datatype: "html", 
                        success : function (data) { 
                            var k = $(data).find(".vis:eq(1)").find("tr td:eq(5)").find("a"); 
                            $(ke).append(" | ").append(k); 
                        } 
                    }); 
                }); 
            }); 
            
            
            
        }else if (Nam == 22){ // 12
            
            $('#combined_table tr td:nth-child(20)').each(function(){ 
                var zz =  $(this).find("a").text(); 
                if(zz >= 5){ 
                    $(this).css("background-color","#FF6A6A"); 
                }else if(zz < 5){ 
                    $(this).css("background-color","#CAFFCA"); 
                } 
                    }); 
            $(function(){ 
                $('#combined_table tr').each(function(i){ 
                    var keke = $(this).find('td:nth-child(20)').find('a').attr("href"); 
                    var ke = $(this).find("td:eq(19)"); 
                    $.ajax({ 
                        url: keke, 
                        datatype: "html", 
                        success : function (data) { 
                            var k = $(data).find(".vis:eq(1)").find("tr td:eq(5)").find("a"); 
                            $(ke).append(" | ").append(k); 
                        } 
                    }); 
                }); 
            }); 
        }
            });
}



var groups = document.URL.match(/groups/);
if(groups == 'groups'){
    
    $("<h4>تم برمجة السكربت من قبل <a target='keke' href='http://forum.tribalwars.ae/member.php?u=24151'>keke..2010</a></h4>").prependTo(".vis:eq(2)");
    $("<button id ='vi'>ترتيب المجموعات</button>").appendTo(".vis:eq(2)");
    
    $("#vi").click(function(){
        var keke = prompt("أدخل رقم القاره");
        $("#group_assign_table tr").each(function(){
            var nam = $(this).find("td:eq(0)").text().match(keke);
            if(nam == keke){
                $(this).find("input[type=checkbox]").click();
            }
        });
    });
}

var commands = document.URL.match(/commands/);
if(commands == 'commands'){
    
    $("<h4>تم برمجة السكربت من قبل <a target='keke' href='http://forum.tribalwars.ae/member.php?u=24151'>keke..2010</a></h4>").prependTo(".vis:eq(2)");
    $("<button id ='k'>متابعة الموارد المنهوبه</button>").appendTo(".vis:eq(2)");
    
    $("#k").click(function(){
        
        $(function(){
            $('#commands_table tr').each(function(i) {
                var keke =$('#commands_table tr:eq(' + i + ') span').find('a').attr('href');
                var ke = $(this).find("td:eq(0)");
                
                $.ajax({
                    
                    url: keke,
                    datatype: "html",
                    success : function (data) {
                        
                        k = $(data).find(".vis:eq(2)");
                        
                        $(ke).append(k);                       
                    }                   
                });               
            });           
        });       
    });
    
    $(function() {
        $("<button id='e'>المجموع الكلي للموارد</button></br>").appendTo(".vis:eq(2)");
        
        $("<b class='HKE' style='display:none;'>مجموع الموارد التي تم نهبها </b><br /><br /><table class='HKE' id='HK' width='365px' style='display:none;'><tr><td align='center' style='background-color:#C1A264;font-family: Tahoma;font-size: 12px; padding: 5px;'><b>الخشب</b></td><td align='center' style='background-color:#C1A264;font-family: Tahoma;font-size: 12px; padding: 5px;'><b>الطمي</b></td><td align='center' style='background-color:#C1A264;font-family: Tahoma;font-size: 12px; padding: 5px;'><b>الحديد</b></td></tr><tr><td align='center' style='background-color: #F4E4BC; padding: 5px;' id='wood'>0</td><td align='center' style='background-color: #F4E4BC; padding: 5px;' id='stone'>0</td><td align='center' style='background-color:#F4E4BC; padding: 5px;' id='iron'>0</td></tr></table>").appendTo(".vis:eq(2)");
        
        $("#e").click(function(){
            $(".HKE").fadeToggle(1000);
            
            var XXX=[];
            var XXx=0;
            
            $('#commands_table tr .vis ').each(function(i){
                var numTxt = $('#commands_table tr .vis:eq('+i+') tr > td:eq(1)').text().replace(/\./,'').match(/[\d.]+/g)[0];
                var mm = numTxt.replace(/\./,'');
                
                var Xxx = parseFloat(mm);
                XXX.push(mm);
                XXx+=Xxx
                
            });
            
            $("#HK #wood").html('<img src=http://cdn2.tribalwars.net/graphic/holz.png?a3702 />' +XXx); 
            
            var lehm=[];
            var lehn=0;
            
            $('#commands_table tr .vis ').each(function(i){
                var numTxt = $('#commands_table tr .vis:eq('+i+') tr > td:eq(1)').text().replace(/\./,'').match(/[\d.]+/g)[1];
                var ss = numTxt.replace(/\./,'');
                var leht = parseFloat(ss);
                lehm.push(ss);
                lehn+=leht
                
            });
            
            $("#HK #stone").html('<img src=http://cdn2.tribalwars.net/graphic/lehm.png?6c9bd />'+lehn); 
            
            var iron=[];
            var irom=0;
            
            $('#commands_table tr .vis ').each(function(i){
                var numTxt = $('#commands_table tr .vis:eq('+i+') tr > td:eq(1)').text().replace(/\./,'').match(/[\d.]+/g)[2];
                var ii = numTxt.replace(/\./,'');
                
                var irot = parseFloat(ii);
                iron.push(ii);
                irom+=irot
            });
            
            $("#HK #iron").html('<img src=http://cdn2.tribalwars.net/graphic/eisen.png?0e9e5 />'+irom); 
            
        });
    });
}


var report = document.URL.match(/report/);
if(report == 'report'){
    
    $("h2").html("<b>تم برمجة السكربت من قبل&nbsp;<a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></b></br>");
    
    $("h2").append("</br><button id ='X'>قراءة التقارير</button>");
    $("h2").append("</br><button id ='A'>قرى فارغه</button>");
    $("h2").append("<button id ='B'>الخسائر</button>");
    $("h2").append("<button id ='C'>التجسس</button>");
    
    
    $("#B").click(function(){
        $("#report_list tr").each(function(){
            var checkbox = $(this).find("input[type=checkbox]");
            var style = $(this).find("td:eq(0)").attr("style");
            
            if(style == 'background-color: rgb(255, 111, 74);'){
                $(checkbox).click();
            }
        });
    });
    
    $("#X").click(function(){
        $("#report_list tr").each(function(){
            var report = $(this).find("td:eq(0)");
            var checkbox = $(this).find("input[type=checkbox]");
            var url = $(this).find("td:eq(0)").find("a").attr("href");
            
            $.ajax({
                url:url,
                datatype:'html',
                success :function(data){
                    var keke = $(data).find("#attack_info_def_units").html();
                    
                    var reporta = $(data).find("#attack_info_def_units tr:eq(1) td:eq(1)").html();
                    var reportb = $(data).find("#attack_info_def_units tr:eq(1) td:eq(2)").html();
                    var reportc = $(data).find("#attack_info_def_units tr:eq(1) td:eq(3)").html();
                    var reportd = $(data).find("#attack_info_def_units tr:eq(1) td:eq(4)").html();
                    var reporte = $(data).find("#attack_info_def_units tr:eq(1) td:eq(5)").html();
                    var reportf = $(data).find("#attack_info_def_units tr:eq(1) td:eq(6)").html();
                    var reportg = $(data).find("#attack_info_def_units tr:eq(1) td:eq(7)").html();
                    var reporth = $(data).find("#attack_info_def_units tr:eq(1) td:eq(8)").html();
                    var reporti = $(data).find("#attack_info_def_units tr:eq(1) td:eq(9)").html();
                    var reportu = $(data).find("#attack_info_def_units tr:eq(1) td:eq(10)").html();
                    var reportk = $(data).find("#attack_info_def_units tr:eq(1) td:eq(11)").html();
                    var reportl = $(data).find("#attack_info_def_units tr:eq(1) td:eq(12)").html();
                    var reportm = $(data).find("#attack_info_def_units tr:eq(1) td:eq(13)").html();
                    
                    if(keke == null){
                        
                        $(report).append("</br>لم نستطع جمع معلومات عن جيوش العدو");
                        $(report).css("background-color","#FF6F4A");
                        
                        
                    }else if(reporta == 0 && reportb == 0 && reportc == 0 && reportd == 0 && reporte == 0 && reportf == 0 && reportg == 0 && reporth == 0 && reporti == 0 && reportu == 0){
                        
                        $(report).append('</br>القريه فارغه');
                        $(report).css("background-color","#CAFFCA");
                        
                        $("#A").click(function(){
                            $(checkbox).click();
                            
                        });
                        
                        
                    }else{
                        
                        $(report).append(keke);
                        
                        $("#C").click(function(){
                            $(checkbox).click();
                            
                        });
                    }
                    
                }
            });
        });
    });
}

var info_player = document.URL.match(/info_player/);
if(info_player == 'info_player'){
    
    $(function(){
        $("#villages_list tbody tr").each(function(){
            $(this).append("<td></td>");
            $(this).append("<td></td>");
            $(this).append("<td></td>");
            $(this).append("<td></td>");
        });
    });
    $(function(){
        $("#villages_list thead").prepend("<button id='AT'>إرسال</button>");
        $("<h4>تم برمجة السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></h4>").prependTo("h2");
        $("#AT").click(function(){
            var aeAT = document.URL.match(/http:\/\/\w+/);
            var villageAT = document.URL.match(/village=\d+/);
            $("#villages_list tbody tr").each(function(){
                var village2AT = $(this).find("a").attr("href").match(/\d+/g)[1];
                var urlA = aeAT+'.tribalwars.ae/game.php?'+villageAT+'&target='+village2AT+'&screen=place';
                window.open(urlA);
            });
        });
    });
    
    
    $(function(){
        $("#villages_list thead").prepend("<button id='BH'>حجز</button>");
        $("#BH").click(function(){
            var aeBH = document.URL.match(/http:\/\/\w+/);
            var villageBH = document.URL.match(/village=\d+/);
            var village2BH = $("#villages_list tbody tr td:eq(0)").find("a").attr("href").match(/\d+/g)[1];
            var urlBH = '/game.php?'+villageBH+'&id='+village2BH+'&screen=info_village';
            $.ajax({
                url : urlBH,
                datatype: "xml",
                success : function (data){
                    var BHM = $(data).find(".vis:eq(0) tr:eq(8)").find("a").attr("href").match(/h=\S+/);
                    $("#villages_list tbody tr ").each(function(){
                        var keke = $(this).find("a").attr("href").match(/\d+/g)[1];
                        var urlBH1 = aeBH+'.tribalwars.ae/game.php?'+villageBH+'&id='+keke+'&action=reserve_village&'+BHM;
                        window.open(urlBH1);
                    });
                }
            });
        });
    });
    
    
    $("#villages_list thead").prepend("<img src='http://cdn2.tribalwars.net/graphic/dots/green.png' /> حجز تابع لك</br><img src='http://cdn2.tribalwars.net/graphic/dots/yellow.png' />ليس عليها حجز</br><img src='http://cdn2.tribalwars.net/graphic/dots/red.png' />حجز تابع لأعضاء القبيله</br><img src='http://cdn2.tribalwars.net/graphic/dots/blue.png' />حجز تابع للحلفاء</br>");
    
    
    $(function(){
        $("#villages_list thead tr").append("<th>K</th>");
        $("#villages_list thead tr").append("<th>عدد</th>");
        $("#villages_list tbody tr").each(function(){
            var url = $(this).find("a").attr("href");
            var keke = $(this).find("td:eq(4)");
            $.ajax({
                url: url,
                datatype: "xml",
                success : function(data){
                    var attack = $(data).find("div .vis th:eq(0)").text().match(/\d+/);
                    if(attack != null){
                        $(keke).text('('+attack+')');
                    }else{
                        $(keke).text('(0)');
                    }
                }
            });
        });
    });
    
    $(function(){
        $("<th>إرسال</th>").appendTo("#villages_list thead tr");
        $("<th>حجز</th>").appendTo("#villages_list thead tr");
        var na1 = $("#villages_list tbody tr td:eq(0)").find("a").attr("href");
        var ae = document.URL.match(/http:\/\/\w+/);
        var village = document.URL.match(/village=\d+/);
        var keke = $("#villages_list tbody tr td:eq(0)").find("a").attr("href").match(/\d+/g)[1];
        var url1 = '/game.php?'+village+'&id='+keke+'&screen=info_village';
        
        $.ajax({
            url : url1,
            datatype: "xml",
            success : function (data){
                
                var m = $(data).find(".vis:eq(0) tr:eq(8)").find("a").attr("href").match(/h=\S+/);
                
                $("#villages_list tbody tr ").each(function(){
                    var keke = $(this).find("a").attr("href").match(/\d+/g)[1];
                    var ae1 = document.URL.match(/http:\/\/\w+/);
                    var village1 = document.URL.match(/village=\d+/);
                    var urlA = ae+'.tribalwars.ae/game.php?'+village+'&target='+keke+'&screen=place';
                    var urlH = ae+'.tribalwars.ae/game.php?'+village+'&id='+keke+'&action=reserve_village&'+m;
                    $(this).find("td:eq(5)").append("<center><a id='A' target='keke'><img src='http://cdn2.tribalwars.net/graphic//buildings/barracks.png' title='إرسال الجيوش' /></a></center>");
                    $(this).find("#A").attr("href",urlA);
                    $(this).find("td:eq(6)").append("<a id='B' target='keke'><img src='http://cdn2.tribalwars.net/graphic/forum/thread_close.png?45399' title='حجز القريه' /></a>");
                    $(this).find("#B").attr("href",urlH);
                });
            }
        });
    });
    
    $(function(){
        
        var player = game_data.player.id;
        var ally = game_data.player.ally_id;
        var sitterId = game_data.player.sitter_id;
        
        $("#villages_list tbody tr ").each(function(){
            var THQ = $(this).find("a").attr("href");
            var keke = $(this).find("td:eq(0)");
            $.ajax({
                url : THQ,
                datatype: "xml",
                success : function (data){
                    
                    var allyId = $(data).find(".main .vis tr:eq(5) td:eq(1)").find("a:eq(1)").attr("href").match(/\d+/g)[1];
                    var id = $(data).find(".main .vis tr:eq(5) td:eq(1)").find("a").attr("href").match(/\d+/g)[1];
                    
                    if (sitterId != 0 ){
                        allyId = $(data).find(".main .vis tr:eq(5) td:eq(1)").find("a:eq(1)").attr("href").match(/\d+/g)[2];
                        id = $(data).find(".main .vis tr:eq(5) td:eq(1)").find("a").attr("href").match(/\d+/g)[2];
                    }
                    if(allyId != ally){
                        $(keke).append("<img src='http://cdn2.tribalwars.net/graphic/dots/blue.png' />");
                        
                    } else  if(id != player){
                        $(keke).append("<img src='http://cdn2.tribalwars.net/graphic/dots/red.png' />");
                        
                    } else  if(id == player){
                        $(keke).append("<img src='http://cdn2.tribalwars.net/graphic/dots/green.png' />");
                        
                    } 
                        
                        }
            });
        });
    });
    
    
    $(function(){
        $("#villages_list tbody tr ").each(function(){
            var THQ = $(this).find("a").attr("href");
            var keke = $(this).find("td:eq(0)");
            $.ajax({
                url : THQ,
                datatype: "xml",
                success : function (data){
                    
                    var map = $(data).find(".main .vis tr:eq(5) td:eq(1)").find("a").attr("href");
                    
                    if(map == undefined ){
                        $(keke).append("<img src='http://cdn2.tribalwars.net/graphic/dots/yellow.png' />");
                        
                    }        
                }
            });
        });
    });
    
    $(function(){
        var ae = document.URL.match(/http:\/\/\w+/);
        var village = document.URL.match(/village=\d+/);
        
        $("#villages_list tbody tr").each(function(){
            
            var x = $(this).find("td:nth-child(2)").html().match(/\d+/g)[0];
            var y = $(this).find("td:nth-child(2)").html().match(/\d+/g)[1];
            
            
            var keke = $(this).find("td:eq(3)");
            
            var map = ae+'.tribalwars.ae/game.php?'+village+'&x='+x+'&y='+y+'&screen=map#'+x+';'+y;
            
            $.ajax({
                
                url: map,
                datatype: "xml",
                success : function(data){
                    
                    var k = $(data).find("#continent_id").text();
                    $(keke).append(' <b>K'+k+'</b>');
                    
                }
            });
        });
    });
    
}

var tech = document.URL.match(/tech/);
if(tech == 'tech'){
    
    var Ten = $("#techs_table tr th:eq(10)").find("img").attr("src");
    var Eight = $("#techs_table tr th:eq(12)").find("img").attr("src");
    var url = 'http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?5659c';
    
    if(Eight == url){
        
        $("<h4>تم برمجة السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></h4></br>").prependTo(".vis:eq(2)");
        $("#techs_table tr td a:nth-child(1)").click();
        
        $("<button>!! click me</buttion></br><p id='keke' style='display:none'><b>سكربت خاص للحداد</b></br></br><b>  وظيفة السكربت : </b></br></br>1- بالضغط على علامة ( + ) في أعلى اي خانه سيقوم برفعها</br>2- بالضغط على علامه  ( - )  في أعلى اي خانه سيقوم بخفض مستوى الخانه المحدده</br></br><b> وظيفة الأزرار الجانبيه : </b></br></br>1- الزر رفع المستوى الأخضر للحداد بالكامل</br>يقصد به أي سيقوم برفع جميع الخانات للحداد ذات (اللون الأخضر) بالكامل</br>2- الزر رفع المستوى (الأصفر) للحداد بالكامل</br>يقصد به أي سيقوم الحداد برفع جميع الخانات ذات (اللون الأصفر) بالكامل</br>3- الزر خفض مستويات الحداد بالكامل</br>يقصد به اي سيقوم بخفض جميع مستويات الحداد بالكامل</br></br><a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></p>").appendTo(".vis:eq(2)");
        $("button").click(function(){
            $("#keke").slideToggle();
        });
        
        $('</br><button id="ff">رفع المستوى (الأخضر) للحداد</br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#ff").click(function(){
            $(".research_tech_button.rtt.green").click();
        });
        
        $('<button id="ff">رفع المستوى (الأصفر) للحداد</br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#ff").click(function(){
            $(".research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="mm">خفض مستويات الحداد</br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#mm").click(function(){
            $(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="ke">إلغــــــاء </button></br>').prependTo("#techs_table tr th:eq(14)");
        $("#ke").click(function(){
            $("#techs_table tr td:nth-child(15)").find("img").click();
        });
        
        $('<button id="A"> + </button>').prependTo("#techs_table tr th:eq(3)");
        $("#A").click(function(){
            $("#techs_table tr td:nth-child(4)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="C"> - </button>').prependTo("#techs_table tr th:eq(3)");
        $("#C").click(function(){
            $("#techs_table tr td:nth-child(4)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="wg"> + </button>').prependTo("#techs_table tr th:eq(4)");
        $("#wg").click(function(){
            $("#techs_table tr td:nth-child(5)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="wd"> - </button>').prependTo("#techs_table tr th:eq(4)");
        $("#wd").click(function(){
            $("#techs_table tr td:nth-child(5)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="ag"> + </button>').prependTo("#techs_table tr th:eq(5)");
        $("#ag").click(function(){
            $("#techs_table tr td:nth-child(6)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="ad"> - </button>').prependTo("#techs_table tr th:eq(5)");
        $("#ad").click(function(){
            $("#techs_table tr td:nth-child(6)").find(".research_tech_button.rtt.down").click();
        });
        
        
        $('<button id="sg"> + </button>').prependTo("#techs_table tr th:eq(6)");
        $("#sg").click(function(){
            $("#techs_table tr td:nth-child(7)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="sd"> - </button>').prependTo("#techs_table tr th:eq(6)");
        $("#sd").click(function(){
            $("#techs_table tr td:nth-child(7)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="J"> + </button>').prependTo("#techs_table tr th:eq(7)");
        $("#J").click(function(){
            $("#techs_table tr td:nth-child(8)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="H"> - </button>').prependTo("#techs_table tr th:eq(7)");
        $("#H").click(function(){
            $("#techs_table tr td:nth-child(8)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="hg"> + </button>').prependTo("#techs_table tr th:eq(8)");
        $("#hg").click(function(){
            $("#techs_table tr td:nth-child(9)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="hd"> - </button>').prependTo("#techs_table tr th:eq(8)");
        $("#hd").click(function(){
            $("#techs_table tr td:nth-child(9)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="rg"> + </button>').prependTo("#techs_table tr th:eq(9)");
        $("#rg").click(function(){
            $("#techs_table tr td:nth-child(10)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="rd"> - </button>').prependTo("#techs_table tr th:eq(9)");
        $("#rd").click(function(){
            $("#techs_table tr td:nth-child(10)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="cg"> + </button>').prependTo("#techs_table tr th:eq(10)");
        $("#cg").click(function(){
            $("#techs_table tr td:nth-child(11)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="cd"> - </button>').prependTo("#techs_table tr th:eq(10)");
        $("#cd").click(function(){
            $("#techs_table tr td:nth-child(11)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="ZXD"> + </button>').prependTo("#techs_table tr th:eq(11)");
        $("#ZXD").click(function(){
            $("#techs_table tr td:nth-child(12)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="ZXC"> - </button>').prependTo("#techs_table tr th:eq(11)");
        $("#ZXC").click(function(){
            $("#techs_table tr td:nth-child(12)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="ASC"> + </button>').prependTo("#techs_table tr th:eq(12)");
        $("#ASC").click(function(){
            $("#techs_table tr td:nth-child(13)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="ASD"> - </button>').prependTo("#techs_table tr th:eq(12)");
        $("#ASD").click(function(){
            $("#techs_table tr td:nth-child(13)").find(".research_tech_button.rtt.down").click();
        });
        
        
    }else if (Ten == url){
        
        $("<h4>تم برمجة السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></h4></br>").prependTo(".vis:eq(2)");
        $("#techs_table tr td a:nth-child(1)").click();
        
        $("<button>!! click me</buttion></br><p id='keke' style='display:none'><b>سكربت خاص للحداد</b></br></br><b>  وظيفة السكربت : </b></br></br>1- بالضغط على علامة ( + ) في أعلى اي خانه سيقوم برفعها</br>2- بالضغط على علامه  ( - )  في أعلى اي خانه سيقوم بخفض مستوى الخانه المحدده</br></br><b> وظيفة الأزرار الجانبيه : </b></br></br>1- الزر رفع المستوى الأخضر للحداد بالكامل</br>يقصد به أي سيقوم برفع جميع الخانات للحداد ذات (اللون الأخضر) بالكامل</br>2- الزر رفع المستوى (الأصفر) للحداد بالكامل</br>يقصد به أي سيقوم الحداد برفع جميع الخانات ذات (اللون الأصفر) بالكامل</br>3- الزر خفض مستويات الحداد بالكامل</br>يقصد به اي سيقوم بخفض جميع مستويات الحداد بالكامل</br></br><a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></p>").appendTo(".vis:eq(2)");
        $("button").click(function(){
            $("#keke").slideToggle();
        });
        
        $('</br><button id="ff">رفع المستوى (الأخضر) للحداد</br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#ff").click(function(){
            $(".research_tech_button.rtt.green").click();
        });
        
        $('<button id="ff">رفع المستوى (الأصفر) للحداد</br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#ff").click(function(){
            $(".research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="mm">خفض مستويات الحداد</br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#mm").click(function(){
            $(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="ke">إلغــــــاء </button></br>').prependTo("#techs_table tr th:eq(12)");
        $("#ke").click(function(){
            $("#techs_table tr td:nth-child(13)").find("img").click();
        });
        
        $('<button id="A"> + </button>').prependTo("#techs_table tr th:eq(3)");
        $("#A").click(function(){
            $("#techs_table tr td:nth-child(4)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="C"> - </button>').prependTo("#techs_table tr th:eq(3)");
        $("#C").click(function(){
            $("#techs_table tr td:nth-child(4)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="wg"> + </button>').prependTo("#techs_table tr th:eq(4)");
        $("#wg").click(function(){
            $("#techs_table tr td:nth-child(5)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="wd"> - </button>').prependTo("#techs_table tr th:eq(4)");
        $("#wd").click(function(){
            $("#techs_table tr td:nth-child(5)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="ag"> + </button>').prependTo("#techs_table tr th:eq(5)");
        $("#ag").click(function(){
            $("#techs_table tr td:nth-child(6)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="ad"> - </button>').prependTo("#techs_table tr th:eq(5)");
        $("#ad").click(function(){
            $("#techs_table tr td:nth-child(6)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="sg"> + </button>').prependTo("#techs_table tr th:eq(6)");
        $("#sg").click(function(){
            $("#techs_table tr td:nth-child(7)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="sd"> - </button>').prependTo("#techs_table tr th:eq(6)");
        $("#sd").click(function(){
            $("#techs_table tr td:nth-child(7)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="J"> + </button>').prependTo("#techs_table tr th:eq(7)");
        $("#J").click(function(){
            $("#techs_table tr td:nth-child(8)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="H"> - </button>').prependTo("#techs_table tr th:eq(7)");
        $("#H").click(function(){
            $("#techs_table tr td:nth-child(8)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="hg"> + </button>').prependTo("#techs_table tr th:eq(8)");
        $("#hg").click(function(){
            $("#techs_table tr td:nth-child(9)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="hd"> - </button>').prependTo("#techs_table tr th:eq(8)");
        $("#hd").click(function(){
            $("#techs_table tr td:nth-child(9)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="rg"> + </button>').prependTo("#techs_table tr th:eq(9)");
        $("#rg").click(function(){
            $("#techs_table tr td:nth-child(10)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="rd"> - </button>').prependTo("#techs_table tr th:eq(9)");
        $("#rd").click(function(){
            $("#techs_table tr td:nth-child(10)").find(".research_tech_button.rtt.down").click();
        });
        
        $('<button id="cg"> + </button>').prependTo("#techs_table tr th:eq(10)");
        $("#cg").click(function(){
            $("#techs_table tr td:nth-child(11)").find(".research_tech_button.rtt.green,.research_tech_button.rtt.yellow").click();
        });
        
        $('<button id="cd"> - </button>').prependTo("#techs_table tr th:eq(10)");
        $("#cd").click(function(){
            $("#techs_table tr td:nth-child(11)").find(".research_tech_button.rtt.down").click();
        });
    } else{
        $("<h4>تم برمجة السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></h4></br>").prependTo(".vis:eq(2)");
        $("<button>!! click me</buttion></br><p id='keke' style='display:none'><b>سكربت خاص للحداد (البسيط)</b></br></br><b>  وظيفة السكربت : </b></br></br>1- بالضغط على علامة ( + ) في أعلى اي خانه سيقوم برفعها</br></br><b> وظيفة الأزرار الجانبيه : </b></br></br>1- الزر رفع مستويات الحداد بالكامل</br>يقصد به أي سيقوم برفع جميع الخانات على كافة الوحدات بالكامل</br></br>2- الزر إلغاء جميع الأوامر المنفذه</br>يقصد به اي سيقوم بإلغاء جميع الأوامر المنفذه على جميع الوحدات على الحداد بالكامل</br></br>3- <a href=http://forum.tribalwars.ae/showthread.php?t=63014 target=keke >تعليمات عن السكربت من المنتدى العام</a></br></br></br><a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></p>").appendTo(".vis:eq(2)");
        $("button").click(function(){
            $("#keke").slideToggle();
        });
        
        $('</br><button id="ff">رفع مستويات الحداد</br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#ff").click(function(){
            $(".rtt.brown").click();
        });
        
        
        $('<button id="mm">إلغاء جميع الأوامر المنفذه </br> بالكامل</button>').appendTo(".vis:eq(2)");
        $("#mm").click(function(){
            $("#techs_table tr td:nth-child(11)").find("img").click();
        });
        
        var Ten = $("#techs_table tr th:eq(11)").find("img").attr("src");
        var Eight = $("#techs_table tr th:eq(9)").find("img").attr("src");
        
        var url = 'http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?5659c';
        
        
        if(Ten == url){
            
            $('<button id="A"> + </button>').prependTo("#techs_table tr th:eq(2)");
            $("#A").click(function(){
                $("#techs_table tr td:nth-child(3)").find(".rtt.brown").click();
            });
            
            
            $('<button id="wg"> + </button>').prependTo("#techs_table tr th:eq(3)");
            $("#wg").click(function(){
                $("#techs_table tr td:nth-child(4)").find(".rtt.brown").click();
            });
            
            
            $('<button id="ag"> + </button>').prependTo("#techs_table tr th:eq(4)");
            $("#ag").click(function(){
                $("#techs_table tr td:nth-child(5)").find(".rtt.brown").click();
            });
            
            
            $('<button id="sg"> + </button>').prependTo("#techs_table tr th:eq(5)");
            $("#sg").click(function(){
                $("#techs_table tr td:nth-child(6)").find(".rtt.brown").click();
            });
            
            
            $('<button id="J"> + </button>').prependTo("#techs_table tr th:eq(6)");
            $("#J").click(function(){
                $("#techs_table tr td:nth-child(7)").find(".rtt.brown").click();
            });
            
            
            $('<button id="hg"> + </button>').prependTo("#techs_table tr th:eq(7)");
            $("#hg").click(function(){
                $("#techs_table tr td:nth-child(8)").find(".rtt.brown").click();
            });
            
            
            $('<button id="rg"> + </button>').prependTo("#techs_table tr th:eq(8)");
            $("#rg").click(function(){
                $("#techs_table tr td:nth-child(9)").find(".rtt.brown").click();
            });
            
            
            $('<button id="cg"> + </button>').prependTo("#techs_table tr th:eq(9)");
            $("#cg").click(function(){
                $("#techs_table tr td:nth-child(10)").find(".rtt.brown").click();
            });
            
            
            $('<button id="HH"> + </button>').prependTo("#techs_table tr th:eq(10)");
            $("#HH").click(function(){
                $("#techs_table tr td:nth-child(11)").find(".rtt.brown").click();
            });
            
            
            $('<button id="ASD"> + </button>').prependTo("#techs_table tr th:eq(11)");
            $("#ASD").click(function(){
                $("#techs_table tr td:nth-child(12)").find(".rtt.brown").click();
            });
            
            
        }else if (Eight == url){
            
            $('<button id="A"> + </button>').prependTo("#techs_table tr th:eq(2)");
            $("#A").click(function(){
                $("#techs_table tr td:nth-child(3)").find(".rtt.brown").click();
            });
            
            
            $('<button id="wg"> + </button>').prependTo("#techs_table tr th:eq(3)");
            $("#wg").click(function(){
                $("#techs_table tr td:nth-child(4)").find(".rtt.brown").click();
            });
            
            
            $('<button id="ag"> + </button>').prependTo("#techs_table tr th:eq(4)");
            $("#ag").click(function(){
                $("#techs_table tr td:nth-child(5)").find(".rtt.brown").click();
            });
            
            
            $('<button id="sg"> + </button>').prependTo("#techs_table tr th:eq(5)");
            $("#sg").click(function(){
                $("#techs_table tr td:nth-child(6)").find(".rtt.brown").click();
            });
            
            
            $('<button id="J"> + </button>').prependTo("#techs_table tr th:eq(6)");
            $("#J").click(function(){
                $("#techs_table tr td:nth-child(7)").find(".rtt.brown").click();
            });
            
            
            $('<button id="hg"> + </button>').prependTo("#techs_table tr th:eq(7)");
            $("#hg").click(function(){
                $("#techs_table tr td:nth-child(8)").find(".rtt.brown").click();
            });
            
            
            $('<button id="rg"> + </button>').prependTo("#techs_table tr th:eq(8)");
            $("#rg").click(function(){
                $("#techs_table tr td:nth-child(9)").find(".rtt.brown").click();
            });
            
            
            $('<button id="cg"> + </button>').prependTo("#techs_table tr th:eq(9)");
            $("#cg").click(function(){
                $("#techs_table tr td:nth-child(10)").find(".rtt.brown").click();
            });
            
        }
            }
}


var buildings = document.URL.match(/buildings/);

if(buildings == 'buildings'){
    
    var Nam = $(".vis.overview_table th").length;
    if(Nam == 20){
        
        $(function(){ 
            $("<button>!! click me</buttion></br><p id='keke' style='display:none'><b>سكربت المباني</b></br></br><b>  وظيفة السكربت : </b></br></br>1- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/build.png' />  ومن ثم على أي زر من الخانات المحدده  سيقوم برفع المبنى على جميع القرى المختاره بالكامل </br>2- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/down.png' />  ومن ثم أي زر من الخانات المحدده سيقوم بإنزال المبنى على القرى المختاره بالكامل</br>3- بالضغط على الزر إلغاء سيقوم بإلغاء الأوامر </br></br><b> وظيفة الزر الجانبي : </b></br></br>1- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/build.png' /> ومن ثم الزر الجانبي سيقوم برفع جميع الوحدات على كااافة القرى</br>2- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/down.png' /> ومن ثم الزر الجانبي سيقوم بإنزال جميع الوحدات على كافه القرى </br></br><a href=http://forum.tribalwars.ae/member.php?u=24151 target='keke'>keke..2010</a></p>").prependTo(".vis:eq(2)"); 
            $("button").click(function(){ 
                $("#keke").slideToggle(); 
            }); 
        }); 
        
        $(function(){ 
            $("<h4>تم برمجة السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151>keke..2010</a></h4></br>").prependTo(".vis:eq(2)");   
        }); 
        
        $(function(){                                                  
            $("<button id='ke'>رفع او إنزال جميع المستويات</br>بالكامل</button>").appendTo(".vis:eq(2)"); 
            $("#ke").click(function(){ 
                $(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });    
        }); 
        
        $(function(){   
            $("<button id='A'>+|-</button>").prependTo(".vis.overview_table th:eq(4)"); 
            $("#A").click(function(){ 
                $(".vis.overview_table tr td:nth-child(5)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            }); 
        }); 
        
        $(function(){                                                  
            $("<button id='B'>+|-</button>").prependTo(".vis.overview_table th:eq(5)"); 
            $("#B").click(function(){ 
                $(".vis.overview_table tr td:nth-child(6)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });     
        }); 
        
        $(function(){                                                  
            $("<button id='C'>+|-</button>").prependTo(".vis.overview_table th:eq(6)"); 
            $("#C").click(function(){ 
                $(".vis.overview_table tr td:nth-child(7)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            }); 
        }); 
        
        $(function(){                                                  
            $("<button id='D'>+|-</button>").prependTo(".vis.overview_table th:eq(7)"); 
            $("#D").click(function(){ 
                $(".vis.overview_table tr td:nth-child(8)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });    
        }); 
        
        $(function(){                                                  
            $("<button id='E'>+|-</button>").prependTo(".vis.overview_table th:eq(8)"); 
            $("#E").click(function(){ 
                $(".vis.overview_table tr td:nth-child(9)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });    
        }); 
        
        $(function(){                                                  
            $("<button id='F'>+|-</button>").prependTo(".vis.overview_table th:eq(9)"); 
            $("#F").click(function(){ 
                $(".vis.overview_table tr td:nth-child(10)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });    
        }); 
        
        $(function(){                                                  
            $("<button id='G'>+|-</button>").prependTo(".vis.overview_table th:eq(10)"); 
            $("#G").click(function(){ 
                $(".vis.overview_table tr td:nth-child(11)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });     
        }); 
        
        $(function(){                                                  
            $("<button id='H'>+|-</button>").prependTo(".vis.overview_table th:eq(11)"); 
            $("#H").click(function(){ 
                $(".vis.overview_table tr td:nth-child(12)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });     
        }); 
        
        $(function(){                                                  
            $("<button id='I'>+|-</button>").prependTo(".vis.overview_table th:eq(12)"); 
            $("#I").click(function(){ 
                $(".vis.overview_table tr td:nth-child(13)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });    
        }); 
        
        $(function(){                                                  
            $("<button id='J'>+|-</button>").prependTo(".vis.overview_table th:eq(13)"); 
            $("#J").click(function(){ 
                $(".vis.overview_table tr td:nth-child(14)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });     
        }); 
        
        $(function(){                                                  
            $("<button id='K'>+|-</button>").prependTo(".vis.overview_table th:eq(14)"); 
            $("#K").click(function(){ 
                $(".vis.overview_table tr td:nth-child(15)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });   
        }); 
        
        $(function(){                                                  
            $("<button id='L'>+|-</button>").prependTo(".vis.overview_table th:eq(15)"); 
            $("#L").click(function(){ 
                $(".vis.overview_table tr td:nth-child(16)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });   
        }); 
        
        
        $(function(){                                                  
            $("<button id='M'>+|-</button>").prependTo(".vis.overview_table th:eq(16)"); 
            $("#M").click(function(){ 
                $(".vis.overview_table tr td:nth-child(17)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });     
        }); 
        
        $(function(){                                                  
            $("<button id='N'>+|-</button>").prependTo(".vis.overview_table th:eq(17)"); 
            $("#N").click(function(){ 
                $(".vis.overview_table tr td:nth-child(18)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });    
        }); 
        
        $(function(){                                                  
            $("<button id='O'>+|-</button>").prependTo(".vis.overview_table th:eq(18)"); 
            $("#O").click(function(){ 
                $(".vis.overview_table tr td:nth-child(19)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();  
            });    
        }); 
        
        $(function(){                                                  
            $("<button id='W'>إلغاء</button>").prependTo(".vis.overview_table th:eq(19)"); 
            $("#W").click(function(){ 
                $(".vis.overview_table tr td:nth-child(20)").find("img").click();  
            });    
        });
        
    }else {
        
        $(function(){
            $("<button>!! click me</buttion></br><p id='keke' style='display:none'><b>سكربت المباني</b></br></br><b>  وظيفة السكربت : </b></br></br>1- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/build.png' />  ومن ثم على أي زر من الخانات المحدده  سيقوم برفع المبنى على جميع القرى المختاره بالكامل </br>2- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/down.png' />  ومن ثم أي زر من الخانات المحدده سيقوم بإنزال المبنى على القرى المختاره بالكامل</br>3- بالضغط على الزر إلغاء سيقوم بإلغاء الأوامر </br></br><b> وظيفة الزر الجانبي : </b></br></br>1- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/build.png' /> ومن ثم الزر الجانبي سيقوم برفع جميع الوحدات على كااافة القرى</br>2- بالضغط على الزر <img src='http://cdn2.tribalwars.net/graphic/overview/down.png' /> ومن ثم الزر الجانبي سيقوم بإنزال جميع الوحدات على كافه القرى </br></br><a href=http://forum.tribalwars.ae/member.php?u=24151>keke..2010</a></p>").prependTo(".vis:eq(2)");
            $("button").click(function(){
                $("#keke").slideToggle();
            });
        });
        
        $(function(){
            $("<h4>تم برمجة السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151 target='keke'>keke..2010</a></h4></br>").prependTo(".vis:eq(2)");
        });
        
        $(function(){                                                 
            $("<button id='ke'>رفع او إنزال جميع المستويات</br>بالكامل</button>").appendTo(".vis:eq(2)");
            $("#ke").click(function(){
                $(".building_tooltip.d_0,.building_tooltip.d_1").click();
            });
        });
        
        $(function(){  
            
            $("<button id='A'>+|-</button>").prependTo(".vis.overview_table th:eq(4)");
            $("#A").click(function(){
                $(".vis.overview_table tr td:nth-child(5)").find(".building_tooltip.d_0,.building_tooltip.d_1").click();
            });
        });
        
        $(function(){                                                 
            $("<button id='B'>+|-</button>").prependTo(".vis.overview_table th:eq(5)");
            $("#B").click(function(){
                $(".vis.overview_table tr td:nth-child(6)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='C'>+|-</button>").prependTo(".vis.overview_table th:eq(6)");
            $("#C").click(function(){
                $(".vis.overview_table tr td:nth-child(7)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='D'>+|-</button>").prependTo(".vis.overview_table th:eq(7)");
            $("#D").click(function(){
                $(".vis.overview_table tr td:nth-child(8)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='E'>+|-</button>").prependTo(".vis.overview_table th:eq(8)");
            $("#E").click(function(){
                $(".vis.overview_table tr td:nth-child(9)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='F'>+|-</button>").prependTo(".vis.overview_table th:eq(9)");
            $("#F").click(function(){
                $(".vis.overview_table tr td:nth-child(10)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='G'>+|-</button>").prependTo(".vis.overview_table th:eq(10)");
            $("#G").click(function(){
                $(".vis.overview_table tr td:nth-child(11)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='H'>+|-</button>").prependTo(".vis.overview_table th:eq(11)");
            $("#H").click(function(){
                $(".vis.overview_table tr td:nth-child(12)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='I'>+|-</button>").prependTo(".vis.overview_table th:eq(12)");
            $("#I").click(function(){
                $(".vis.overview_table tr td:nth-child(13)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='J'>+|-</button>").prependTo(".vis.overview_table th:eq(13)");
            $("#J").click(function(){
                $(".vis.overview_table tr td:nth-child(14)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='K'>+|-</button>").prependTo(".vis.overview_table th:eq(14)");
            $("#K").click(function(){
                $(".vis.overview_table tr td:nth-child(15)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='L'>+|-</button>").prependTo(".vis.overview_table th:eq(15)");
            $("#L").click(function(){
                $(".vis.overview_table tr td:nth-child(16)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='M'>+|-</button>").prependTo(".vis.overview_table th:eq(16)");
            $("#M").click(function(){
                $(".vis.overview_table tr td:nth-child(17)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='N'>+|-</button>").prependTo(".vis.overview_table th:eq(17)");
            $("#N").click(function(){
                $(".vis.overview_table tr td:nth-child(18)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='O'>+|-</button>").prependTo(".vis.overview_table th:eq(18)");
            $("#O").click(function(){
                $(".vis.overview_table tr td:nth-child(19)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='P'>+|-</button>").prependTo(".vis.overview_table th:eq(19)");
            $("#P").click(function(){
                $(".vis.overview_table tr td:nth-child(20)").find(".building_tooltip.d_0,.building_tooltip.d_1").click(); 
            });
        });
        
        $(function(){                                                 
            $("<button id='W'>إلغاء</button>").prependTo(".vis.overview_table th:eq(20)");
            $("#W").click(function(){
                $(".vis.overview_table tr td:nth-child(21)").find("img").click(); 
            });
        });
        
    }
}

$(function(){
    
    var url = document.URL.match(/market/);
    if(url == 'market'){
        
        
        
        $("<br /><table width='365px' ><tr><td colspan='5' align='center' style='background-color:#C1A264;font-family: Tahoma;font-size: 12px; padding: 5px;'><b>عدد الموارد المراد سحبها </b></td></tr><tr><td align='center' style='background-color: #F4E4BC;'><img src='http://cdn2.tribalwars.net/graphic/holz.png?a3702' /><input id ='W' size='7' type='text' value='1000'/></td><td align='center' style='background-color: #F4E4BC;'><img src='http://cdn2.tribalwars.net/graphic/lehm.png?6c9bd' /><input id ='S' size='7' type='text' value='1000'/></td><td align='center' style='background-color: #F4E4BC;'><img src='http://cdn2.tribalwars.net/graphic/eisen.png?0e9e5' /><input id ='I' size='7' type='text' value='1000'/></td><td align='center' style='background-color: #F4E4BC;'><input id='keke' type='submit' value='إختـــر'/></td></tr></table>").appendTo("h3:eq(0)");
        
        $("#keke").click(function(){
            
            var WO = $("#W").val();
            var SO = $("#S").val();
            var IR = $("#I").val();
            
            if(WO  == '' && SO == '' && IR == ''){
                
                alert("لم تختر أي نوع من الموارد");
                
            }else{
                
                $("#keke").attr("value","طلـب");
                $("#village_list").each(function(){
                    $(this).find(".call_button").click();
                    $(this).find("input[name=wood]").val(WO);
                    $(this).find("input[name=stone]").val(SO);
                    $(this).find("input[name=iron]").val(IR);
                });
            }
        });
    }
});

$("h3:eq(1)").append("<center><table style='border:1px solid #7d510f;' align='left' width='86%'><thead><tr style='background-color:#C1A264;'><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_spear.png?48b3b'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_sword.png?b389d'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_axe.png?51d94'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_archer.png?db2c3'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_spy.png?eb866'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_light.png?2d86d'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_marcher.png?ad3be'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png?a83c9'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_ram.png?2003e'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?5659c'></th><th style='text-align:center' width='35'><img src='http://cdn2.tribalwars.net/graphic/unit/unit_knight.png?58dd0'></th></tr></thead><tbody><tr style='background-color: #F4E4BC;'><td><input id='spear' type='text' size='3'/></td><td><input id='sword' type='text' size='3'/></td><td><input id='axe' type='text' size='3'/></td><td><input id='archer' type='text' size='3'/></td><td><input id='spy' type='text' size='3'/></td><td><input id='light' type='text' size='3'/></td><td><input id='marcher' type='text' size='3'/></td><td><input id='heavy' type='text' size='3'/></td><td><input id='ram' type='text' size='3'/></td><td><input id='catapult' type='text' size='3'/></td><td><input id='knight' type='text' size='3'/></td></tr></tbody><tr><td colspan='11'><center><input  align='left' id='A' type='submit' value='إختـــر' size='12' /></center></td></tr></table></center>");

$("#A").click(function(){
    
    var spear = $("#spear").val();
    var sword = $("#sword").val();
    var axe =  $("#axe").val();
    var archer = $("#archer").val();
    var spy =  $("#spy").val();
    var light = $("#light").val();
    var marcher = $("#marcher").val();
    var heavy =  $("#heavy").val();
    var ram =   $("#ram").val();
    var catapult = $("#catapult").val();
    var knight = $("#knight").val();
    
    if(spear == '' && sword == '' && axe == '' && archer == '' && spy == '' && light == '' && marcher == '' && heavy == '' && ram == '' && catapult == '' && knight == ''){
        
        alert("لم تختر أي نوع من الوحدات");
    }else{
        
        $("#village_troup_list").each(function(){
            $("#A").attr("value","طلـــب");
            $(".call_button").click();
            $(this).find("input[name=spear]").val(spear);
            $(this).find("input[name=sword]").val(sword);
            $(this).find("input[name=axe]").val(axe);
            $(this).find("input[name=archer]").val(archer);
            $(this).find("input[name=spy]").val(spy);
            $(this).find("input[name=light]").val(light);
            $(this).find("input[name=marcher]").val(marcher);
            $(this).find("input[name=heavy]").val(heavy);
            $(this).find("input[name=ram]").val(ram);
            $(this).find("input[name=catapult]").val(catapult);
            $(this).find("input[name=knight]").val(knight);
        });
    }
});