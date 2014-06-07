// ==UserScript==
// @name          Spam Topics - HotWaterBoard
// @namespace     
// @description   Hide the spam on HWB
// @author        Mare
// @homepage      http://hotwaterboard.com/v-web/bulletin/bb/
// @include       http://hotwaterboard.com/v-web/bulletin/bb/viewforum.php*
// ==/UserScript==

var rowlist = document.getElementsByTagName("table").item(4);

for(i=0;i<rowlist.tBodies[0].rows.length;i++){
	if(
		rowlist.tBodies[0].rows[i].innerHTML.indexOf("Viagra") != -1 ||
		rowlist.tBodies[0].rows[i].innerHTML.indexOf("Pharma") != -1 ||
		rowlist.tBodies[0].rows[i].innerHTML.indexOf("Porn") != -1
	){
		rowlist.tBodies[0].rows[i].innerHTML = '<td colspan="6" style="color: #cc0000; font-size: 8pt; text-align: center;"><strong>Spam removed</strong></td>';
	}
}