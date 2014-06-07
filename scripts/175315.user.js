// ==UserScript==
// @name           Replace-1
// @namespace      حرب القبائل
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$("#village_table").find("tr").each(function(){
    var villageID = $("#villages_list").find("tr").find(":checked + span").find("a:eq(0)").attr("href").match(/\d+/g)[1];
    var $this = $(this);
    var t = $this.html();
    $this.html(t.replace(/screen=overview/g,'target='+villageID+'&screen=place'));    
});