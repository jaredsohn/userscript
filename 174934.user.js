// ==UserScript==
// @name           سكربت طالبان لإستخراج الإحداثيات
// @namespace      حرب القبائل
// @description	   Version 4.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$(function(){

if(document.URL.indexOf("screen=info_member") >= 0){

$(".vis").find("tr").find("td:eq(0)").prepend('<input name="wac" type="radio" onclick=$.getScript("http://userscripts.org/scripts/source/174923.user.js");>');
$(".modemenu").find("input").remove();
$("#content_value").append('<table class="tbl bbcodetable"><tbody><tr><td style="background:#f0e2be;"><input name="hal" type="radio" onclick=$.getScript("http://userscripts.org/scripts/source/174581.user.js");><span style="color:#603000"><b>حذف كود الإحداثيات</b></span></td></tr><tr><td style="background:#f0e2be;"><input name="cal" type="radio" onclick=\'$("#message").each(function(){var $this = $(this);var t = $this.val();$this.val(t.replace(/coord/g,"claim"));});\'><span style="color:#603000"><b>كود الحجز</b></span></td></tr></tbody></table>').append('<div style="clear: both;"><textarea id="message" cols="30" rows="50" onfocus="this.select();" placeholder="<< حدد اللاعب أو اللاعبين لإستخراج إحداثيات القرى >>" readonly></textarea></div>').append('<table class="vis bbcodetable"><tbody><tr><th>المصمم :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
$(".tbl").before('<table class="vis bbcodetable" align="left"><tbody><tr><td><b>سكربت قبيلة <a href="http://ae17.tribalwars.ae/guest.php?screen=info_ally&id=368" target="_blank">طالبان</a> بالعالم 17</b></td></tr><tr><td><b>بإشراف <span style="color:red">حشيشة</span> و <span style="color:red">Aywac</span></b></td></tr></tbody></table>');

    }else if((document.URL.indexOf("mode=members&screen=ally") >= 0)){

$(".vis").find("tr").find("td:eq(0)").prepend('<input name="wac" type="radio" onclick=$.getScript("http://userscripts.org/scripts/source/174923.user.js");>');
$(".modemenu").find("input").remove();
$("#content_value").append('<table class="tbl bbcodetable"><tbody><tr><td style="background:#f0e2be;"><input name="hal" type="radio" onclick=$.getScript("http://userscripts.org/scripts/source/174581.user.js");><span style="color:#603000"><b>حذف كود الإحداثيات</b></span></td></tr><tr><td style="background:#f0e2be;"><input name="cal" type="radio" onclick=\'$("#message").each(function(){var $this = $(this);var t = $this.val();$this.val(t.replace(/coord/g,"claim"));});\'><span style="color:#603000"><b>كود الحجز</b></span></td></tr></tbody></table>').append('<div style="clear: both;"><textarea id="message" cols="30" rows="50" onfocus="this.select();" placeholder="<< حدد اللاعب أو اللاعبين لإستخراج إحداثيات القرى >>" readonly></textarea></div>').append('<table class="vis bbcodetable"><tbody><tr><th>المصمم :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');
$(".tbl").before('<table class="vis bbcodetable" align="left"><tbody><tr><td><b>سكربت قبيلة <a href="http://ae17.tribalwars.ae/guest.php?screen=info_ally&id=368" target="_blank">طالبان</a> بالعالم 17</b></td></tr><tr><td><b>بإشراف <span style="color:red">حشيشة</span> و <span style="color:red">Aywac</span></b></td></tr></tbody></table>');


    
    }else if((document.URL.indexOf("screen=info_player") >= 0)){

$("#villages_list").find("tr:last").find("a").click();

$.getScript("http://userscripts.org/scripts/source/174933.user.js");

}
        
        });