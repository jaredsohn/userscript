// ==UserScript==
// @name           kiwibank
// @namespace      https://www.ib.kiwibank.co.nz
// @description    kiwibank
// @include        http://wiki.greasespot.net/Scripts_directory
// ==/UserScript==

var count = 0;

var st = document.getElementById("scheduled_transactions");
var sthead = st.childNodes[1];
var stbody = st.childNodes[3];

var newheadcol = document.createElement('th');

newheadcol.innerHTML = 'Reference';

sthead.childNodes[1].appendChild(newheadcol);

var contentrow = stbody.childNodes[count];

console.log("foo");

while(contentrow != null){

	if(contentrow.tagName == 'TR' && contentrow.id!=undefined){
		if(contentrow.id.substring(0,5) == 'trans') {
			var transnum = contentrow.id.substring(5,contentrow.id.length);
			var transnumzb = transnum - 1;
			var detail1 = document.getElementById("ctl00_c_upcomingPayments_listPayments_ctrl" + transnumzb + "_paymentSummary_statementDetails_statementDetails1TR")
			var detail2 = document.getElementById("ctl00_c_upcomingPayments_listPayments_ctrl" + transnumzb + "_paymentSummary_statementDetails_statementDetails2TR")
			var a = "";
			var b = "";
			var c = "";
			var a2 = "";
			var b2 = "";
			var c2 = "";

			if(detail1 != undefined) {
				a = detail1.childNodes[3].innerHTML;		
				b = detail1.childNodes[5].innerHTML;
				c = detail1.childNodes[7].innerHTML;
			}


			if(detail2 != undefined) {
				a2 = detail2.childNodes[3].innerHTML;		
				b2 = detail2.childNodes[5].innerHTML;
				c2 = detail2.childNodes[7].innerHTML;
			}

			if (a == "-") {
				a = "";
			}
			if (b == "-") {
				b = "";
			}	
			if (c == "-") {
				c = "";
			}
		
			if (a2 == "-") {
				a2 = "";
			}
			if (b2 == "-") {
				b2 = "";
			}	
			if (c2 == "-") {
				c2 = "";
			}

			var reference = a + " " + b + " " + c;
			var reference2 = a2 + " " + b2 + " " + c2;

			if(reference != reference2){
				reference = reference + " " + reference2;
			}

			var newtd = document.createElement("td");

			newtd.innerHTML = reference;
			contentrow.appendChild(newtd);
		}
	}

	count++;
	contentrow = stbody.childNodes[count];
}

