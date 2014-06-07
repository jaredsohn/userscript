// ==UserScript==
// @name                        verycd_filter
// @namespace              		verycd_filter
// @version                     1.0
// @author                      mescodasun[AT]gmail.com
// @description              	Help filtering items on verycd.com before downloading
// @include                     http://www.verycd.com/topics/*
// @require                     http://mescoda.com/jquerygm/jquery.1.42.for.gm.js
// ==/UserScript==

$(document).ready(function() {
	$checkbox_all = $('#iptcomED2K .emulemain table tr td input');
	$checkbox_all.attr("checked",false);
	$('<div style="position:fixed;top:20px;left:20px;width:100px;height:170px;border:3px solid #aaa;text-align:center;"><p style="margin-bottom:5px;"><strong>Verycd Filter</strong><br /><a href="http://mescoda.com/2011/10/verycd-filter/#howto">How to use</a></p><input type="button" id="fromto" value="FromTo" /><br /><input type="button" id="every2" value="Every2" /><br /><input type="button" id="every3" value="Every3" /><br/ ><input type="button" id="reverse" value="Reverse" /><br/ ><input type="button" id="none" value="None" /><br/ ></div>')
	.insertBefore('#iptcomED2K');
	$('#fromto').click(function() {
		$checkedbox = $('#iptcomED2K .emulemain table tr td input:checked');
		$checkedbox_first = $checkedbox.first();
		$checkedbox.last().parent('td').parent('tr').prevAll('tr').children('td').children(':checkbox').attr("checked",true);
		$checkedbox_first.parent('td').parent('tr').prevAll('tr').children('td').children(':checkbox').attr("checked",false);
	});
	$('#every2').toggle(function() {
		$checkbox_all.attr("checked",false);
		$('#iptcomED2K .emulemain table tr:odd td input').attr("checked",true);
		$checkbox_all.last().attr("checked",false);
	},function() {
		$checkbox_all.attr("checked",false);
		$('#iptcomED2K .emulemain table tr:even td input').attr("checked",true);
		$checkbox_all.last().attr("checked",false);
	});
	$('#every3').toggle(function() {
		$checkbox_all.attr("checked",false);
		$('#iptcomED2K .emulemain table tr:nth-child(3n+2) td input').attr("checked",true);
	},function() {
		$checkbox_all.attr("checked",false);
		$('#iptcomED2K .emulemain table tr:nth-child(3n) td input').attr("checked",true);
	},function() {
		$checkbox_all.attr("checked",false);
		$('#iptcomED2K .emulemain table tr:nth-child(3n+1) td input').attr("checked",true);
	});
	$('#none').click(function() {
		$checkbox_all.attr("checked",false);
	});
	$('#reverse').click(function() {
		$checkedbox = $('#iptcomED2K .emulemain table tr td input:checked');
		$uncheckedbox = $('#iptcomED2K .emulemain table tr td input:not(:checked)');
		$checkedbox.attr("checked",false);
		$uncheckedbox.attr("checked",true);
	});
});