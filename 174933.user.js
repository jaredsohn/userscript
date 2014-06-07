// ==UserScript==
// @name           Coords-2
// @namespace      حرب القبائل
// @description	   Version 2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$("#villages_list").after('<table class="vis bbcodetable"><tbody><tr><th>المصمم :</th><td><a href="http://forum.tribalwars.ae/member.php?32087-Aywac" target="_blank">Aywac</a> ©</td></tr></tbody></table>').after('<div style="clear: both;"><textarea id="message" cols="30" rows="50" onfocus="this.select();" placeholder="<< احداثيات قرى اللاعب >>" readonly></textarea></div>').after('<table class="tbl bbcodetable"><tbody><tr><td style="background:#f0e2be;"><input name="hal" type="radio" onclick=$.getScript("http://userscripts.org/scripts/source/174581.user.js");><span style="color:#603000"><b>حذف كود الإحداثيات</b></span></td></tr><tr><td style="background:#f0e2be;"><input name="cal" type="radio" onclick=\'$("#message").each(function(){var $this = $(this);var t = $this.val();$this.val(t.replace(/coord/g,"claim"));});\'><span style="color:#603000"><b>كود الحجز</b></span></td></tr></tbody></table>');

$(function(){var n = $("#content_value").find("h2").prepend("[player]").append("[/player]\r\r").text();$("#message").append(n);});

$(function(){var coor = $("#villages_list").find("tbody").find("tr").find("td:eq(1)").prepend("[coord]").append("[/coord]\r").text();$("#message").append(coor);});

$("#villages_list").find("td:nth-child(2)").each(function(){var $this = $(this);var t = $this.html();$this.html(t.replace(/coord/g,"").replace(/claim/g,"").replace(/]/g,"").replace(/\[/g,"").replace(/\//g,""));});

$("#content_value").find("h2").each(function(){var $this = $(this);var t = $this.html();$this.html(t.replace(/player/g,"").replace(/]/g,"").replace(/\[/g,"").replace(/\//g,""));});

$(".vis:eq(4)").after('<br><table class="vis bbcodetable" align="center"><tbody><tr><td><b>سكربت قبيلة <a href="http://ae17.tribalwars.ae/guest.php?screen=info_ally&id=368" target="_blank">طالبان</a> بالعالم 17</b></td></tr><tr><td><b>بإشراف <span style="color:red">حشيشة</span> و <span style="color:red">Aywac</span></b></td></tr></tbody></table>');