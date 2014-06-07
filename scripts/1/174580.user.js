// ==UserScript==
// @name           Coords
// @namespace      حرب القبائل
// @description	   Version 2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$(":checked").each(function(){
    var url = $(":checked + a:eq(0)").attr("href"); 
    
    $.ajax({
        url:url,
        datatype:"html",
        success :function(data){
            
            var coor = $(data).find("#villages_list").find("tbody").find("tr").find("td:eq(1)").prepend("[coord]").append("[/coord]\r\n").text();
            
            $("#message").val(coor);
            
        }
        
    });
    
});