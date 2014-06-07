// ==UserScript==
// @name           احداثيات من الخريطة
// @namespace      حرب القبائل
// @description	   Version 2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==


$("#map_wrap").each(function(){
    var url = $("#mp_info").attr("href"); 
    
    $.ajax({
        url:url,
        datatype:"html",
        success :function(data){
            
            var coor = $(data).find(".vis").find("tbody").find("tr:eq(1)").find("td:eq(1)").prepend("[coord]").append("[/coord]\r\n").text();
            
            $("#message").val(coor);
            
        }
        
    });
    
});