// ==UserScript==
// @name           تدريب النبلاء
// @namespace      حرب القبائل
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php?*&mode=combined*
// ==/UserScript==

$("#combined_table").find(".nowrap").find("td:eq(1)").each(function(){
    var $this = $(this);
    var t = $this.html();
    $this.html(t.replace(/screen=overview/g,'screen=snob'));
});

$("#combined_table").find(".nowrap").each(function(){
    var td = $(this).find("td:eq(0)"); 
    var url = $(this).find("td:eq(1)").find("a:eq(0)").attr("href");
    
    $.ajax({
        url:url,
        datatype:"html",
        success :function(data){    
            
            var snob = $(data).find('.vis:eq(1)').find('td:last').find("a").attr("target","_blank");

            $(td).append(snob);           
        }
    });
});