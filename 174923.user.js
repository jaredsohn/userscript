// ==UserScript==
// @name           Coords-1
// @namespace      حرب القبائل
// @description	   Version 2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$(function(){
    
    var n = $(":checked + a:eq(0)").prepend("\r[player]").append("[/player]\r\r").text();
    
    $("#message").append(n);
    
});

$(":checked + a:eq(0)").each(function(){
    var $this = $(this);
    var t = $this.html();
    $this.html(t.replace(/player/g,"").replace(/]/g,"").replace(/\[/g,"").replace(/\//g,""));
});

$(":checked").each(function(){
    var url = $(":checked + a:eq(0)").attr("href");
    
    $.ajax({
        url:url,
        datatype:"html",
        success :function(data){
            
            var coor = $(data).find("#villages_list").find("tbody").find("tr").find("td:eq(1)").prepend("[coord]").append("[/coord]\r").text();
            
            $("#message").append(coor);
            
        }
        
    });
    
});