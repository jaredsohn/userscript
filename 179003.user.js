// ==UserScript==
// @name       Geocaching.com Bookmarks Helper
// @version    0.1
// @description  Fügt zwei Buttons zu Bookmark-Listen hinzu um archivierte Caches und gefundene Caches auszuwählen
// @match      http://www.geocaching.com/bookmarks/*
// @match      http://www.geocaching.com/my/watchlist.aspx
// @copyright  2013 DerWildeKaiser
// ==/UserScript==

(function($){
    var t = $("table.Table:first")
    
    if($(t).find("input[type=checkbox]").length > 0 && $("input[name*='btnDelete']").length > 0){
        var newRow = $("<tr/>");
        var newTd = $('<td colspan="10" style="background-color: #8CACFF; color:#FFF;"></td>');
        
        var infoDiv = $('<div style="display: inline-block; float: right;" />');
        var infoText = "";
        
        var button1 = $('<input type="button" value="Archivierte Caches auswählen">');
        button1.click(function(){
            console.log("button1");
            $(t).find(".OldWarning, .Warning").closest("tr").find("input").prop('checked', true);
        });
        newTd.append(button1);
        
        var archived = $(t).find(".OldWarning, .Warning").length;
        infoText += "<strong>" + archived + "</strong> archivierte";
        
        if($("img[src*='found']").length > 0){
            var button2 = $('<input type="button" value="Gefundene Caches auswählen" style="margin-left:20px;">');
            button2.click(function(){
                $(t).find("img[src*='found']").closest("tr").find("input").prop('checked', true);
            });
            newTd.append(button2);
            
            var found = $(t).find("img[src*='found']").closest("tr").find("input").length;
            infoText += " und <strong>" + found + "</strong> gefundene";
        }
        
        infoText += " Caches in der Liste";
        infoDiv.html(infoText);
        newTd.append(infoDiv);
        
        newRow.append(newTd);
        $(t).append(newRow);      
        }
})(jQuery);