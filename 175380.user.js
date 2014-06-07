// ==UserScript==
// @name           سكربت جامع إحداثيات القرى الجديد
// @namespace      حرب القبائل
// @description	   Version 2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*screen=map*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });

$(".mp").remove();

$("#map_big").parent("tr").after('<tr><td>\
<div id="coors" style="border-top:2px solid black;border-left:2px solid black;border-right:2px solid black;border-bottom:2px solid black;"></div>\
</td></tr>');

$("#coors").append('<div style="clear: both;">\
<textarea id="message" cols="80" rows="20" onfocus="this.select();" placeholder="<< إضغط على القرى من الخريطة لإستخراج الإحداثيات >>"></textarea>\
</div><br><table class="vis bbcodetable"><tbody>\
<tr><th>المبرمج :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr>\
</tbody></table>');

$("#coors").css("background","transparent url(http://cdn2.tribalwars.net/8.16/18758/graphic/index/iconbar-mc.png) scroll left top repeat");

$("#coors").prepend('<table class="tbl bbcodetable"><tbody>\
<tr>\
<td style="background:#f0e2be;"><input id="lnk" align="center" name="rdd" type="radio"><span style="color:#603000"><b>وضع الأكواد</b></span></td>\
<td style="background:#f0e2be;"><input id="del" align="center" name="rdd" type="radio"><span style="color:#603000"><b>حذف الأكواد</b></span></td>\
</tr>\
</tbody></table>');

$("#lnk").click(function(){
	message.value = message.value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/c[a-z]{4,4}\])/g,"[coord]$1[/coord]");
	message.value = message.value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/c[a-z]{4,4}\])/g,"[coord]$1[/coord]");
});

$("#del").click(function(){
	$("#message").val($("#message").val().replace(/coord/g,""));
	$("#message").val($("#message").val().replace(/\//g,""));
	$("#message").val($("#message").val().replace(/\[\]/g,""));
});

function hell(tss){
	if($("#map_popup").is(":visible")){
		var a = $("#info_content").text().match(/\d+\|\d+/g);
		var b = $("#message").val();
		$("#message").val(""+b+" "+a+"");
		$(tss).attr("href","#");
	}
}

$("#map").attr("onclick","hell(this); return false;");