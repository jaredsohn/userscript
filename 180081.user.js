// ==UserScript==
// @name           Attack Player from his profile Ay
// @namespace      Tribalwars
// @version        1.0
// @author         Aywac
// @description    Gives you the choice to attack a player from his profile
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });

$(".vis:eq(0)").append('<tr><td colspan="2"><a href="#" id="pop">» قراك الخاصة</a>');

function replace(){ 
    $("#village_table").find("tr").each(function(){
        var villageID = $("#villages_list").find("tr").find(":checked + span").find("a:eq(0)").attr("href").match(/\d+/g)[1];
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/screen=overview/g,'target='+villageID+'&screen=place'));    
    });
}

$("#villages_list").find("tr").find("td:eq(0)").prepend('<input name="rdo" type="radio" onclick="replace()">');

$("#content_value").append('<div id="overlay" class="ui-draggable" style="border-top: 2px solid #804000; border-left: 2px solid #804000; border-right: 2px solid #603000; border-bottom: 2px solid #402000; background-image:url(http://cdn2.tribalwars.net/graphic/index/main_bg.jpg?1b7f4); z-index: 99999; display:none; left: 365px; top: 100px; width: auto;"><div id="inline_popup_menu" style="background-color: #c1a264;background-image: url(http://cdn2.tribalwars.net/graphic/screen/tableheader_bg3.png?2cef7);background-repeat: repeat-x;width: auto;padding: 2px 5px;text-align: right;"><a href="#" id="close">غلق</a></div><div id="inline_popup_main" style="height: auto; width:auto; max-height: 950px;overflow: auto;background-image: url(http://cdn2.tribalwars.net/graphic/index/main_bg.jpg?1b7f4);padding: 3px;"><div style="height: auto; width:auto;"><div id="inline_popup_content" style="height: 700px; width:auto; overflow: auto;"><div class="inner-border main content-border" style="border: none; font-weight: normal; height: auto; padding: 0;margin: 0;direction: ltr;background: #e3d5b3 url(http://cdn2.tribalwars.net/graphic/index/main_bg.jpg?1b7f4) scroll right top repeat;border-collapse: separate !important;border-spacing: 0!important;-webkit-box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);"><center><h2>القرى الخاصة بك</h2></center><table id="village_table" class="vis village" style="float: left;width: auto;"></table></div></div></div></div></div>');

$("#village_table").append('<tbody> </tbody>').each(function(){
    var overview_villages = $("#village_table").find("tbody");
    var url = "/game.php?screen=overview_villages&mode=prod"; 
    
    $.ajax({
        url:url,
        datatype:"html",
        success :function(data){    
            
            var vlg = $(data).find("#production_table").find("td:nth-child(2)");        
            
            $(overview_villages).append(vlg);
            $(overview_villages).find("td").wrap("<tr> </tr>");
            
            if(null!==vlg){
                
                $("#village_table").each(function(){
                    
                    $(this).find("a").attr("target","_blank");
                    
                    $(this).find("tr").find("td:eq(0)").prepend('<input name="clk" type="radio" onclick=\'for (var i=0; i<10000; i++){$("#village_table").find("tr").find(":checked + span").find("a:eq(0)")[i].click();}\'>');
                    
                    $("#village_table").after('<br><br><table class="vis bbcodetable" align="center"><tbody><tr><th>المصمم :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
                    
                });  
            } 
        }
    });
});

$(document).ready(function(){
    
    $("#pop").click(function(){
        $("#overlay").fadeIn(1000);
        positionPopup();
    });
    
    $("#close").click(function(){
        $("#overlay").fadeOut(500);
    });
});

function positionPopup(){
    if(!$("#overlay").is(':visible')){
        return;
    }
    $("#overlay").css({
        position:'absolute'
    });
}

$(window).bind('resize',positionPopup);

(function($) {
    $.fn.drags = function(opt) {
        
        opt = $.extend({handle:"",pointer:"move"}, opt);
        
        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }
        
        return $el.css('cursor', opt.cursor).bind("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().bind("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).bind("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault();
        }).bind("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
        
    }
})(jQuery);

$('#overlay').drags();