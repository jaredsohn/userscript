// ==UserScript==
// @name           مستخرج الإحداثيات
// @namespace      حرب القبائل
// @description	   Version 2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$(".vis").find("tr").find("td:eq(0)").prepend('<input name="wac" type="radio" onclick=$.getScript("http://userscripts.org/scripts/source/174580.user.js");>');

$("#content_value").append('<table class="vis bbcodetable"><tbody><tr><td style="background:#f0e2be;"><input name="hal" type="radio" onclick=$.getScript("http://userscripts.org/scripts/source/174581.user.js");><span style="color:#603000"><b>حذف كود الإحداثيات</b></span></td></tr><tr><td style="background:#f0e2be;"><input name="cal" type="radio" onclick=\'$("#message").each(function(){var $this = $(this);var t = $this.val();$this.val(t.replace(/coord/g,"claim"));});\'><span style="color:#603000"><b>كود الحجز</b></span></td></tr></tbody></table>').append('<div style="clear: both;"><textarea id="message" cols="25" rows="50" onfocus="this.select();"></textarea></div>').append('<table class="vis bbcodetable"><tbody><tr><th>المصمم :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>');