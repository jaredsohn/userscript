

// ==UserScript==
// @name           Dörfer kopieren
// @description    Zeigt auf der kombinierten Uebersicht einen Link an, mit dessen Hilfe man alle Doerfer inclusive BB-Codes kriegt
// @description    Außerdem gibt es Moeglichkeit nur Doerfer zu waehlen, welche gerade angegriffen werden.
// @include        http://*.tribalwars.ae/game.php?*screen=overview_villages*mode=combined*
// @include        http://*.staemme.ch/game.php?*screen=overview_villages*mode=combined*
// ==/UserScript==
 
win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
$ = win.$;
 
api = win.ScriptAPI;
api.register( 'Dörfer (mit BB-Codes) kopieren', 7.4, 'Nik Karbaum', 'picnik2@online.de' );
 
$(document).ready(function(){
    $("#edit_group_href").after('<br><a href="#" id="villages_show_link">&#187;&nbsp;&nbsp;نسخ الاحداثيات القرى (مع الاكواد)</a><br>');
    $("#villages_show_link").after('<br><a href="#" id="villages_show_attacked_link">&#187;&nbsp;&nbsp;نسخ القرى المحدده عليها (مع الاكواد)</a>');
    $("#villages_show_attacked_link").after('<span id="villages_show_span"><ol></ol></span>');
    $('#combined_table .nowrap td:nth-child(1)').each(function() {
        if($(this).parent().find("td:nth-child(2)").text().trim().match(/\((\d+\|\d+)\) (K\d+)$/)) {
            $(this).html("<input type='checkbox' name='villages_copy' value='" + RegExp.$1 + "' />");
        }
    });
});
 
var villages_raw = new Array();
 
$("#villages_show_link").live('click',function(){
 
    var villages="";
 
    $('#combined_table .nowrap td:nth-child(2) span a span').each(function(){
        if(this.textContent.match(/\((\d+\|\d+)\) (K\d+)$/))
        {
            if(villages_raw.indexOf(RegExp.$1) == -1) {
                var coords = RegExp.$1;
                villages += "<li cv='" + coords + "'>[coord]" + coords + "[/coord]</li>";
                villages_raw.push(coords);
            }
        }
    });
 
    $("#villages_show_span ol").append(villages);
    $("input[type='checkbox']").attr("checked",true);
 
});
 
$("input[type='checkbox']").live('change',function() {
    if(villages_raw.indexOf(this.value) == -1) {
        $("#villages_show_span ol").append("<li cv='" + this.value + "'>[coord]" + this.value + "[/coord]</li>");
        villages_raw.push(this.value);
    } else {
        var idx = villages_raw.indexOf(this.value);
        if(idx != -1) villages_raw.splice(idx,1);
        $("li[cv='"+ this.value + "']").remove();
    }
 
 
});
 
$("#villages_show_attacked_link").live('click',function(){
    $("img[src='graphic/command/attack.png?1']").each(function(){
        if(this.parentNode.textContent.trim().match(/\((\d+\|\d+)\) (K\d+)$/))
        {
            if(villages_raw.indexOf(RegExp.$1) == -1) {
                var coords = RegExp.$1;
                $("#villages_show_span ol").append("<li cv='" + coords + "'>[coord]" + coords + "[/coord]</li>");
                villages_raw.push(coords);
                $("input[value='" + coords + "']").attr('checked',true);
            }
        }
    });
});