// ==UserScript==
// @name        OvertimeCounter4KintaiKacho
// @author      LWisteria (Luckey-Wisteria)
// @namespace   http://enmps.net
// @description Show overtime on Kintai Kacho system / 勤怠課長上で残業時間を表示するスクリプト
// @version     0.1
// @license     Creative Commons Attribution-ShareAlike 3.0 Unported / Creative Commons Attribution-Noncommercial 3.0 Unported / GNU General Public License v3.0 or later
// @include     https://arc-kkc.com/work/report/input.do*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       none
// ==/UserScript==
 
/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * This project is multi-licensed. You can select the license of your choice from as following:
 * *Creative Commons Attribution-ShareAlike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/
 * *Creative Commons Attribution-Noncommercial 3.0 Unported http://creativecommons.org/licenses/by-nc/3.0/
 * *GNU General Public License v3.0 or later http://www.gnu.org/licenses/gpl.html
*/
$.fn.extend({
	"oc4kk" : function() {
		var $tbody = $("h3:contains('集計') + table>tbody:first>tr:first>td:first> table.list:first>tbody:first");
		var $labels = $tbody.children("tr:eq(0)");
		var $data   = $tbody.children("tr:eq(2)");
		var $labelTemplate = $labels.children("td:last");
		var $dataTemplate  = $data  .children("td:last");

		var workDay = $data.children("td:eq(2)").text().replace("日", "");
		var overworkTime = $data.children("td:eq(3)").text().split(":");
		var overtimeNow = Number(overworkTime[0]) - Number(workDay)*8;
		var $overtimeNowLabel = $labelTemplate.clone();
		var $overtimeNowData  = $dataTemplate .clone();
		$overtimeNowLabel.children("center:first").html("現<br />在<br />の<br />残<br />業<br />時<br />間");
		$overtimeNowData .children("center:first").text(overtimeNow + ":" + overworkTime[1]);
		$labels.append($overtimeNowLabel);
		$data  .append($overtimeNowData);
	}
});

$().oc4kk();
