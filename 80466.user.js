// ==UserScript==
// @name           DX-colors
// @namespace      ru.ryotsuke
// @description    Colors if DX order is still PayPal dispute applicable
// @include        http://www.dealextreme.com/accounts/summaries.dx
// @include        http://dealextreme.com/accounts/summaries.dx
// ==/UserScript==
	
if (document.getElementById("_ctl0_content_Orders")!=null) {
var lines = document.getElementById("_ctl0_content_Orders").getElementsByTagName("tr");

for (var i=0; i<lines.length; i++) {
	var td =	lines[i].getElementsByTagName("td")[0];
	var shipped = true;
	if (lines[i].getElementsByTagName("td").length==4) {
	var status =	lines[i].getElementsByTagName("td")[3].innerHTML;
	shipped = (status.indexOf('Shipped')>=0);
	}
	var dta = td.innerHTML.split('/');
	if(dta.length==3) {
		var day = dta[1];
		var month = dta[0];
		var year = dta[2];

		var date =new Date(year, month-1, day);		
		var today=new Date();
		var one_day=1000*60*60*24;
		
		var days_diff = (today-date)/one_day;
		
		if(days_diff<=14) {
			td.style.color = 'blue';
		}
		if((days_diff>14)&&(days_diff<=30)) {
			td.style.color = 'green';
		}
		if((days_diff>30)&&(days_diff<=42)) {
			td.style.color = '#FF8800';
		}
		
		if((days_diff>42)&&(days_diff<=45)) {
			td.style.color = 'red';
		}
		if(days_diff>45) {
			td.style.color = 'black';
		}
		if(!shipped) {
			td.style.fontWeight='bold';
			td.style.backgroundColor='#eeeeee';
		}
		
	}
	
}

}