
 
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
 // @name           Incoming Renamer keke
 // @namespace      www.tribalwars.ae
 // @description    for naming incoming attacks
 // @include        http://ae*.tribalwars.ae/*&mode=incomings*
 // @version        2
 //  Upload date    09.08.2013 - time: 20:42
 // data            2013
 // Programmer      fessal
 // Nickname        keke..2010
 // url             http://forum.tribalwars.ae/member.php?u=24151
 // url             www.tribalwars.ae
 // skype           keke..2010
 // email           boob-77@hotmail.com
 // ==/UserScript==
 
__________________________________________________________________
Copyright (C) 2013 (keke..2010), all rights reserved
version 1 , 09 August 2013
________________________________________

*/

/*javascript:
 $.getScript("https://keke2010.googlecode.com/files/attackX.js");
 void(0);*/

$(function(){
    $("<h4>تم برمجة السكربت من قبل <a href=http://forum.tribalwars.ae/member.php?u=24151 target=keke >keke..2010</a></h4></br>").prependTo(".vis:eq(2)");
    $('<button id="clickFlter">فلترة هجمات (التمويه)</button>').appendTo(".vis:eq(2)");
    $("#clickFlter").click(function(){
        
        $('#incomings_table tr td:nth-child(1)').each(function(){
            var zz =  $(this).find('.attack-icon span').text();
            
            if(zz == 'كشـافه'){
                $(this).find("input[type=checkbox]").click();
                $(this).css("background-color","#CAFFCA");
                
            }else if(zz =='فارس خفيف'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }else if(zz =='قائد الفرسان'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }else if(zz =='فارس الثقيل'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }else if(zz =='رمـــح'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }else if(zz =='فـأس'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }else if(zz =='سيـف'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }else if(zz =='محطمه'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }else if(zz =='مقلاع'){
                $(this).css("background-color","#CAFFCA");
                $(this).find("input[type=checkbox]").click();
                
            }
                
                });
    });
    
    
    $('<button id="clickTgahl">تجاهل هجمات (التمويه)</button>').appendTo(".vis:eq(2)");
    $("#clickTgahl").click(function(){
        $("#incomings_table").find("input[type=submit]").click();
    });
    
    
    
    $('#incomings_table tr').each(function(i){
        var keke = $(this).find('td:nth-child(1)').find('a').attr("href");
        var kek = $(this);
        var text = $(this).find("td:eq(0)").find('.attack-icon span').text();
        var ke = $(this).find("td:eq(0)");
        
        $.ajax({
            url: keke,
            datatype: "html",
            success : function (data) {
                var TW9 = $(data).find(".vis:eq(1)").find("tr:eq(10) td:eq(0)").find("img").attr("alt");
                var TW12 = $(data).find(".vis:eq(1)").find("tr:eq(13) td:eq(0)").find("img").attr("alt");
                var TW10 = $(data).find(".vis:eq(1)").find("tr:eq(11) td:eq(0)").find("img").attr("alt");
                var TW11 = $(data).find(".vis:eq(1)").find("tr:eq(12) td:eq(0)").find("img").attr("alt");
                
                var timer = $(data).find(".vis:eq(0)").find(".timer").text();
                var ptimer = parseFloat(timer); 
                
                
                if(text == 'هجوم'){
                    
                    
                    if(TW9 == 'نبيل'){
                        $(data).find(".vis:eq(1)").each(function(){
                            
                            var spear = $(this).find("tr:eq(2)").find("td:eq(1)").text();
                            var pspear = parseFloat(spear );
                            
                            var sword = $(this).find("tr:eq(3)").find("td:eq(1)").text();
                            var psword  =  parseFloat(sword );
                            
                            var axe = $(this).find("tr:eq(4)").find("td:eq(1)").text();
                            var paxe  =  parseFloat(axe );
                            
                            var spy = $(this).find("tr:eq(5)").find("td:eq(1)").text();
                            var pspy  =  parseFloat(spy );
                            
                            var light = $(this).find("tr:eq(6)").find("td:eq(1)").text();
                            var plight  =  parseFloat(light );
                            
                            var heavy = $(this).find("tr:eq(7)").find("td:eq(1)").text();
                            var pheavy  =  parseFloat(heavy );
                            
                            var ram =$(this).find("tr:eq(8)").find("td:eq(1)").text();
                            var pram  =  parseFloat(ram );
                            
                            var catapult = $(this).find("tr:eq(9)").find("td:eq(1)").text();
                            var pcatapult  =  parseFloat(catapult );
                            
                            var snob = $(this).find("tr:eq(10)").find("td:eq(1)").text();
                            var psnob  =  parseFloat(snob );
                            
                            
                            if(ptimer <= pspy ) {
                                $(ke).find('input[value]').attr("value","كشـافه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= plight ) {
                                $(ke).find('input[value]').attr("value","فارس خفيف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pheavy ) {
                                $(ke).find('input[value]').attr("value","فارس الثقيل");
                                $(ke).find('input[type=button]').click();
                                
                            } else if (ptimer <= pspear ) {
                                $(ke).find('input[value]').attr("value","رمـــح");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= paxe ) {
                                $(ke).find('input[value]').attr("value","فـأس");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= psword ) {
                                $(ke).find('input[value]').attr("value","سيـف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pram ) {
                                $(ke).find('input[value]').attr("value","محطمه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer < pcatapult  ) {
                                $(ke).find('input[value]').attr("value","مقلاع");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= psnob  ) {
                                $(ke).find('input[value]').attr("value","نبيــل");
                                $(ke).find('input[type=button]').click();
                                $(ke).css("background-color","#FF3366");
                                
                            }
                                });
                        
                    }else if (TW12 == 'نبيل'){
                        
                        $(data).find(".vis:eq(1)").each(function(){
                            
                            var spear = $(this).find("tr:eq(2)").find("td:eq(1)").text();
                            var pspear = parseFloat(spear );
                            
                            var sword = $(this).find("tr:eq(3)").find("td:eq(1)").text();
                            var psword  =  parseFloat(sword );
                            
                            var axe = $(this).find("tr:eq(4)").find("td:eq(1)").text();
                            var paxe  =  parseFloat(axe );
                            
                            var archer = $(this).find("tr:eq(5)").find("td:eq(1)").text();
                            var parcher  =  parseFloat(archer );
                            
                            var spy = $(this).find("tr:eq(6)").find("td:eq(1)").text();
                            var pspy  =  parseFloat(spy );
                            
                            var light = $(this).find("tr:eq(7)").find("td:eq(1)").text();
                            var plight  =  parseFloat(light );
                            
                            var marcher = $(this).find("tr:eq(8)").find("td:eq(1)").text();
                            var pmarcher  =  parseFloat(marcher );
                            
                            var heavy = $(this).find("tr:eq(9)").find("td:eq(1)").text();
                            var pheavy  =  parseFloat(heavy );
                            
                            var ram =$(this).find("tr:eq(10)").find("td:eq(1)").text();
                            var pram  =  parseFloat(ram );
                            
                            var catapult = $(this).find("tr:eq(11)").find("td:eq(1)").text();
                            var pcatapult  =  parseFloat(catapult );
                            
                            var knight = $(this).find("tr:eq(12)").find("td:eq(1)").text();
                            var pknight  =  parseFloat(knight );
                            
                            var snob = $(this).find("tr:eq(13)").find("td:eq(1)").text();
                            var psnob  =  parseFloat(snob );
                            
                            
                            if(ptimer <= pspy ) {
                                $(ke).find('input[value]').attr("value","كشـافه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= plight ) {
                                $(ke).find('input[value]').attr("value","فارس خفيف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pmarcher ) {
                                $(ke).append("<font>فارس قوس</font>");
                                
                            } else if(ptimer <= pknight  ) {
                                $(ke).find('input[value]').attr("value","قائد الفرسان");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pheavy ) {
                                $(ke).find('input[value]').attr("value","فارس الثقيل");
                                $(ke).find('input[type=button]').click();
                                
                            } else if (ptimer <= pspear ) {
                                $(ke).find('input[value]').attr("value","رمـــح");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= paxe ) {
                                $(ke).find('input[value]').attr("value","فـأس");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= parcher ) {
                                $(ke).append("<font>رماة القوس</font>");
                                
                            } else if(ptimer <= psword ) {
                                $(ke).find('input[value]').attr("value","سيـف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pram ) {
                                $(ke).find('input[value]').attr("value","محطمه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer < pcatapult  ) {
                                $(ke).find('input[value]').attr("value","مقلاع");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= psnob  ) {
                                $(ke).find('input[value]').attr("value","نبيــل");
                                $(ke).find('input[type=button]').click();
                                $(ke).css("background-color","#FF3366");
                                
                            }
                                });
                        
                        
                        
                        
                        
                        
                        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                    } else if (TW10 == 'نبيل'){
                        
                        $(data).find(".vis:eq(1)").each(function(){
                            
                            var spear = $(this).find("tr:eq(2)").find("td:eq(1)").text();
                            var pspear = parseFloat(spear );
                            
                            var sword = $(this).find("tr:eq(3)").find("td:eq(1)").text();
                            var psword  =  parseFloat(sword );
                            
                            var axe = $(this).find("tr:eq(4)").find("td:eq(1)").text();
                            var paxe  =  parseFloat(axe );
                            
                            var spy = $(this).find("tr:eq(5)").find("td:eq(1)").text();
                            var pspy  =  parseFloat(spy );
                            
                            var light = $(this).find("tr:eq(6)").find("td:eq(1)").text();
                            var plight  =  parseFloat(light );
                            
                            var heavy = $(this).find("tr:eq(7)").find("td:eq(1)").text();
                            var pheavy  =  parseFloat(heavy );
                            
                            var ram =$(this).find("tr:eq(8)").find("td:eq(1)").text();
                            var pram  =  parseFloat(ram );
                            
                            var catapult = $(this).find("tr:eq(9)").find("td:eq(1)").text();
                            var pcatapult  =  parseFloat(catapult );
                            
                            var knight = $(this).find("tr:eq(10)").find("td:eq(1)").text();
                            var pknight  =  parseFloat(knight );
                            
                            var snob = $(this).find("tr:eq(11)").find("td:eq(1)").text();
                            var psnob  =  parseFloat(snob );
                            
                            
                            if(ptimer <= pspy ) {
                                $(ke).find('input[value]').attr("value","كشـافه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= plight ) {
                                $(ke).find('input[value]').attr("value","فارس خفيف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pknight  ) {
                                $(ke).find('input[value]').attr("value","قائد الفرسان");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pheavy ) {
                                $(ke).find('input[value]').attr("value","فارس الثقيل");
                                $(ke).find('input[type=button]').click();
                                
                            } else if (ptimer <= pspear ) {
                                $(ke).find('input[value]').attr("value","رمـــح");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= paxe ) {
                                $(ke).find('input[value]').attr("value","فـأس");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= psword ) {
                                $(ke).find('input[value]').attr("value","سيـف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pram ) {
                                $(ke).find('input[value]').attr("value","محطمه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer < pcatapult  ) {
                                $(ke).find('input[value]').attr("value","مقلاع");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= psnob  ) {
                                $(ke).find('input[value]').attr("value","نبيــل");
                                $(ke).find('input[type=button]').click();
                                $(ke).css("background-color","#FF3366");
                                
                            }
                                });
                        
                    } else if (TW11 == 'نبيل'){
                        
                        $(data).find(".vis:eq(1)").each(function(){
                            
                            var spear = $(this).find("tr:eq(2)").find("td:eq(1)").text();
                            var pspear = parseFloat(spear );
                            
                            var sword = $(this).find("tr:eq(3)").find("td:eq(1)").text();
                            var psword  =  parseFloat(sword );
                            
                            var axe = $(this).find("tr:eq(4)").find("td:eq(1)").text();
                            var paxe  =  parseFloat(axe );
                            
                            var archer = $(this).find("tr:eq(5)").find("td:eq(1)").text();
                            var parcher  =  parseFloat(archer );
                            
                            var spy = $(this).find("tr:eq(6)").find("td:eq(1)").text();
                            var pspy  =  parseFloat(spy );
                            
                            var light = $(this).find("tr:eq(7)").find("td:eq(1)").text();
                            var plight  =  parseFloat(light );
                            
                            var marcher = $(this).find("tr:eq(8)").find("td:eq(1)").text();
                            var pmarcher  =  parseFloat(marcher );
                            
                            var heavy = $(this).find("tr:eq(9)").find("td:eq(1)").text();
                            var pheavy  =  parseFloat(heavy );
                            
                            var ram =$(this).find("tr:eq(10)").find("td:eq(1)").text();
                            var pram  =  parseFloat(ram );
                            
                            var catapult = $(this).find("tr:eq(11)").find("td:eq(1)").text();
                            var pcatapult  =  parseFloat(catapult );
                            
                            var snob = $(this).find("tr:eq(12)").find("td:eq(1)").text();
                            var psnob  =  parseFloat(snob );
                            
                            
                            if(ptimer <= pspy ) {
                                $(ke).find('input[value]').attr("value","كشـافه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= plight ) {
                                $(ke).find('input[value]').attr("value","فارس خفيف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pmarcher ) {
                                $(ke).append("<font>فارس قوس</font>");
                                
                            } else if(ptimer <= pheavy ) {
                                $(ke).find('input[value]').attr("value","فارس الثقيل");
                                $(ke).find('input[type=button]').click();
                                
                            } else if (ptimer <= pspear ) {
                                $(ke).find('input[value]').attr("value","رمـــح");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= paxe ) {
                                $(ke).find('input[value]').attr("value","فـأس");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= parcher ) {
                                $(ke).append("<font>رماة القوس</font>");
                                
                            } else if(ptimer <= psword ) {
                                $(ke).find('input[value]').attr("value","سيـف");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= pram ) {
                                $(ke).find('input[value]').attr("value","محطمه");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer < pcatapult  ) {
                                $(ke).find('input[value]').attr("value","مقلاع");
                                $(ke).find('input[type=button]').click();
                                
                            } else if(ptimer <= psnob  ) {
                                $(ke).find('input[value]').attr("value","نبيــل");
                                $(ke).find('input[type=button]').click();
                                $(ke).css("background-color","#FF3366");
                                
                            }
                                });
                    }
                        }
            }
        });
        
    });
});

