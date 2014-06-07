// ==UserScript==
// @name           xoso
// @namespace      http://www.xosothudo.com.vn/
// @description    tinh xoso
// @include        http://www.xosothudo.com.vn/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); window.stop(); }
}
// sync
GM_wait();

function count(zz) {
	total = "";
	for(i=0;i<=9;i++) {
		count = 0;
		for (j=0;j<zz.length;j++) {
			if (parseInt(zz[j]) == i) {
				count++;
			}
		}		
		total = total + count + ",";
	}
	return total;
}

function letsJQuery() {	
	th = "";
	for (i=0;i<=9;i++) {
		th += "<th style='font-size:25px'>"+i+"</th>";
	}
	dcm = "";
	dcm += $("span.giaidb").html();
	$("span.giaithuong").each(function() {
		value = $(this).html();		
		values = value.split("&nbsp;");
		for(i=0;i<values.length;i++) {
			if(!isNaN(values[i])) dcm += values[i];
			else {
				sac = values[i].replace("<br>","");
				dcm += sac;
			}
		}
	});
	ec = count(dcm).split(",");
	$("span#ctl04_ctl07_lbNgaymothuong").css("color", "black");
	$(".tengiaithuong, .style2, .tengiaidb, .giaidb").css("color", "black");	
	$("table#ctl04_ctl07_tblKetQua").attr("bgcolor", "#ffffff");	
	$("table#ctl04_ctl07_tblView").append("<tr><td style='text-align:center;font-size:20px'><table id='vcl' width='100%' cellspacing='0' cellpadding='0' border='1' bgcolor='#ffffff'><tr>"+th+"</tr></table></td></tr>");
	$("table#vcl").append("<tr><td style='text-align:center;font-size:20px'>"+ec[0]+"</td><td style='text-align:center;font-size:20px'>"+ec[1]+"</td><td style='text-align:center;font-size:20px'>"+ec[2]+"</td><td style='text-align:center;font-size:20px'>"+ec[3]+"</td><td style='text-align:center;font-size:20px'>"+ec[4]+"</td><td style='text-align:center;font-size:20px'>"+ec[5]+"</td><td style='text-align:center;font-size:20px'>"+ec[6]+"</td><td style='text-align:center;font-size:20px'>"+ec[7]+"</td><td style='text-align:center;font-size:20px'>"+ec[8]+"</td><td style='text-align:center;font-size:20px'>"+ec[9]+"</td></tr>");	
}

