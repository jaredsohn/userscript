// ==UserScript==
// @name           ketqua
// @namespace      http://www.xosothudo.com.vn/
// @include        http://ketqua.net/*
// @include	   http://www.ketqua.net/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.7.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); window.stop(); }
}
// sync
GM_wait();

function letsJQuery() {	
	for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
	
	giaihientai = "";			
	
	giaihientai += $("td.f2:eq(0)").html();	
	giaihientai += $("td.f2:eq(1)").html();
	giaihientai += $("td.f2:eq(2)").html();
	giaihientai += $("td.f2:eq(3)").html();
	giaihientai += $("td.f2:eq(4)").html();
	giaihientai += $("td.f2:eq(5)").html();
	giaihientai += $("td.f2:eq(6)").html();
	giaihientai += $("td.f2:eq(7)").html();
	giaihientai += $("td.f2:eq(8)").html();
	giaihientai += $("td.f2:eq(9)").html();
	giaihientai += $("td.f2:eq(10)").html();
	giaihientai += $("td.f2:eq(11)").html();
	giaihientai += $("td.f2:eq(12)").html();
	giaihientai += $("td.f2:eq(13)").html();
	giaihientai += $("td.f2:eq(14)").html();
	giaihientai += $("td.f2:eq(15)").html();
	giaihientai += $("td.f2:eq(16)").html();
	giaihientai += $("td.f2:eq(17)").html();
	giaihientai += $("td.f2:eq(18)").html();
	giaihientai += $("td.f2:eq(19)").html();
	giaihientai += $("td.f2:eq(20)").html();
	giaihientai += $("td.f2:eq(21)").html();
	giaihientai += $("td.f2:eq(22)").html();
	giaihientai += $("td.f2:eq(23)").html();
	giaihientai += $("td.f2:eq(24)").html();
	giaihientai += $("td.f2:eq(25)").html();
	giaihientai += $("td.f2:eq(26)").html();	
	
	aaa = new Array();	
	for (i = 0;i<10;i++) {
		aaa[i] = 0;
		for (j=0;j<giaihientai.length;j++) {
			if (giaihientai.charAt(j) == i) {
				aaa[i]++;
			}
		}
	}

	tr = "<tr>";
	for (i=0;i<=9;i++) {
		tr += "<td><b>"+i+"</b></td>";
	}
	tr += "</tr>";
	html = "";
	html += "<table id='tutao' cellspacing='0' cellpadding='0' border='0' class='bot' style='z-index:9999;'>" + tr + "<tr>";
	for (i=0;i<=9;i++) {
		html += "<td>"+aaa[i]+"</td>";
	}
	html += "</tr>";
	$("div#ketqua").before(html);
	$("table#tutao tbody tr td").css("border", "1px solid #000");
	$("table#tutao tbody tr:first-child").css("backgroundColor", "#fff");
	$(".bo9").css("border", "1px solid black");
	$("thead th").css("background", "#fff");
//	$("div#ketqua table tbody tr:last-child").remove();
	$(".db").css("color", "#000");	
}

