// ==UserScript==
// @name           Job Ticket 2
// @namespace      http://printing.arc.losrios.edu/DSF/Admin/*
// @description    writes page #, alerts on bookstore jobs, Alert on Uncolated Jobs, 1 & 2 Resipients
// @include        http://printing.arc.losrios.edu/DSF/Admin/*
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/ProductionView.aspx
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/AdminHome.aspx
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx
// @version        1.0.13
// ==/UserScript==

function xp(exp, t, n) {
var r = document.evaluate((exp||"//body"),(n||document),null,(t||6),null);
if(t && t>-1 && t<10) switch(t) {
case 1: r=r.numberValue; break;
case 2: r=r.stringValue; break;
case 3: r=r.booleanValue; break;
case 8: case 9: r=r.singleNodeValue; break;
} return r;
}

//*****************************Numbers

var b = xp("//form/div[4]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[9]/td/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td[4]", 2);
//alert('Targeted text b: ' + b);
var a = xp("//form/div[4]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[9]/td/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]/td[4]", 2);
//alert('Targeted text a: ' + a);
var c = xp("//form/div[4]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[9]/td/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[5]/td[4]", 2);
//alert('Targeted text c: ' + c);
x=a/b//# of pages
//alert('a/b: ' + x);

//Alert if job is more than 10,000 impressinons
if((a>=10000)){
alert("This shold probably be a bookstore job, becouse it has more than 10,000 impressinons");
}

//Put number of pages on the Job Ticket
document.getElementById("ctl00_ctl00_C_M_LabelLocationFaxTitle").innerHTML="Pages:";
document.getElementById("ctl00_ctl00_C_M_LabelLocationFaxTitle").style.fontWeight="900";
document.getElementById("ctl00_ctl00_C_M_LabelLocationFax").innerHTML= ('	:	'+x);
document.getElementById("ctl00_ctl00_C_M_LabelLocationFax").style.fontWeight="900";

//alert on Copy Separators and Job Copies
(function o() {
var sttc=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData").innerHTML;
var pattc=/Do Not Collate/g;
var resultc=pattc.test(sttc);
 if ((resultc==true)){
//alert(pattc + " Is selected!"); 
	if((b>=2)){//# of copies
		if((x==2)){
			if((a==c)){
			//alert('The job has Two Pages and is Single Sided, so');
			stt=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData").innerHTML;
			patt=/3 Holes on left side/g;
			result=patt.test(stt);
				if (result==true){
				alert("Select Jog Copies");
				}
				if (result !==true){
				stt=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData").innerHTML;
				patt=/03 Bond Buff (letter)/g;
				result=patt.test(stt);
					if (result==true){
					alert("Select Jog Copies because the job is on Buff paper " + '\n' + "and seperator sheets are in Buff paper too");
					}
					if (result !==true){
					alert("Select Copy Separators");
					}
				}
			}
		}
		if((x>=3)){
		//alert('This job has more than 2 pages, so');
		sttu=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData").innerHTML;
		pattu=/3 Holes on left side/g;
		resultu=pattu.test(sttu);
			if (resultu==true){
			alert("Select Jog Copies");
			}
			if (resultu !==true){
			sttb=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData").innerHTML;
			pattb=/03 Bond Buff/g;
			resultb=pattb.test(sttb);
				if (resultb==true){
				alert("Select Jog Copies because the job is on Buff paper " + '\n' + "and seperator sheets are in Buff paper too");
				}
				if (resultb !==true){
				alert("Select Copy Separators");
				}
			}
		}
	}
}				

})();



//*********************Check  Resipient#1 info
(function (Resipient1) {
//select original NAME
var nam=document.getElementById("ctl00_ctl00_C_M_lblCustomerNameValue").innerHTML;

//select original DEPARTMENT
var rawdep1=document.getElementById("ctl00_ctl00_C_M_lblCompanyNameValue").innerHTML;
var patt1=/&amp;/g;
var result=patt1.test(rawdep1);
	if (result == true)
	{
	var dep=rawdep1.replace(patt1,"&"); 
//	alert('Original Department: ' + dep);
	}
	if (result !== true)
	{
	var dep=document.getElementById("ctl00_ctl00_C_M_lblCompanyNameValue").innerHTML;
//	alert('Original Department: ' + dep);
	}

//select original QUANTITY
var oq = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[9]/td/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td[4]", 2);
//alert('Original Quantity: ' + oq);

//select Recipient#1 Name
var x=document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelRecipientAddress");  
rnam1 = x.firstChild;
rnam2 = rnam1.nodeValue;
//alert(rnam2); 

//select Recipient#1 Department
var x=document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelRecipientAddress");  
rdep1 = x.firstChild;
rdep2 = rdep1.nextSibling;
rdep3 = rdep2.nextSibling;
rdep4 = rdep3.nodeValue;
//alert('Recipient Department: ' + rdep4); 

//select Recipient#1 Quantity
var ojnam = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[9]/td/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td[2]", 2);
var rq1 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]", 2);
var rq2 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[3]/td[2]", 2);
var rq3 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[4]/td[2]", 2);
var rq4 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td[2]", 2);
var rq5 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[6]/td[2]", 2);
var rq6 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[7]/td[2]", 2);
var rq7 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[8]/td[2]", 2);
var rq8 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[9]/td[2]", 2);
var rq9 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[10]/td[2]", 2);
var rq10 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[11]/td[2]", 2);
var rq11 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[12]/td[2]", 2);
var rq12 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[13]/td[2]", 2);
var rq13 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[14]/td[2]", 2);
var rq14 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[15]/td[2]", 2);
var rq15 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[16]/td[2]", 2);
var rq16 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[17]/td[2]", 2);
var rq17 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[18]/td[2]", 2);
var rq18 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[19]/td[2]", 2);
var rq19 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[20]/td[2]", 2);
var rq20 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[21]/td[2]", 2);
var rq21 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[22]/td[2]", 2);
var rq22 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[23]/td[2]", 2);
var rq23 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[24]/td[2]", 2);
var rq24 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[25]/td[2]", 2);
var rq25 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[26]/td[2]", 2);
var rq26 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[27]/td[2]", 2);
var rq27 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[28]/td[2]", 2);
var rq28 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[29]/td[2]", 2);
var rq29 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[30]/td[2]", 2);
var rq30 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[31]/td[2]", 2);


var rjnam1 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td", 2);
var rjnam2 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[3]/td", 2);
var rjnam3 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[4]/td", 2);
var rjnam4 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td", 2);
var rjnam5 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[6]/td", 2);
var rjnam6 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[7]/td", 2);
var rjnam7 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[8]/td", 2);
var rjnam8 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[9]/td", 2);
var rjnam9 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[10]/td", 2);
var rjnam10 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[11]/td", 2);
var rjnam11 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[12]/td", 2);
var rjnam12 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[13]/td", 2);
var rjnam13 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[14]/td", 2);
var rjnam14 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[15]/td", 2);
var rjnam15 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[16]/td", 2);
var rjnam16 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[17]/td", 2);
var rjnam17 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[18]/td", 2);
var rjnam18 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[19]/td", 2);
var rjnam19 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[20]/td", 2);
var rjnam20 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[21]/td", 2);
var rjnam21 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[22]/td", 2);
var rjnam22 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[23]/td", 2);
var rjnam23 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[24]/td", 2);
var rjnam24 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[25]/td", 2);
var rjnam25 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[26]/td", 2);
var rjnam26 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[27]/td", 2);
var rjnam27 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[28]/td", 2);
var rjnam28 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[29]/td", 2);
var rjnam29 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[30]/td", 2);
var rjnam30 = xp("//form/div[3]/div[2]/div[4]/div/div/table/tbody/tr[8]/td/div/table/tbody/tr[11]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]/td[2]/table/tbody/tr[31]/td", 2);

if (rjnam1 == ojnam)
	{
	rq = rq1
//	alert('Recipient#1 first cell: '+rq1); 
	}
if (rjnam1 !== ojnam)
	{
	if (rjnam2 == ojnam)
		{
		rq = rq2
//		alert('Recipient#1 second cell: '+rq2); 
		}
	if (rjnam2 !== ojnam)
		{
		if (rjnam3 == ojnam)
			{
			rq = rq3
//			alert('Recipient#1 third cell: '+rq3); 
			}
		if (rjnam3 !== ojnam)
			{
			if (rjnam4 == ojnam)
				{
				rq = rq4
//				alert('Recipient#1 fourth cell: '+rq4);  
				}
			if (rjnam4 !== ojnam)
				{
				if (rjnam5 == ojnam)
					{
					rq = rq5
//					alert('Recipient#1 fifth cell: '+rq5);  
					}
				if (rjnam5 !== ojnam)
					{
					if (rjnam6 == ojnam)
						{
						rq = rq6
//						alert('Recipient#1 cell6: '+rq6);  
						}
					if (rjnam6 !== ojnam)
						{
						if (rjnam7 == ojnam)
							{
							rq = rq7
//							alert('Recipient#1 cell7: '+rq7);  
							}
						if (rjnam7 !== ojnam)
							{
							if (rjnam8 == ojnam)
								{
								rq = rq8
//								alert('Recipient#1 cell8: '+rq8);  
								}
							if (rjnam8 !== ojnam)
								{
								if (rjnam9 == ojnam)
									{
									rq = rq9
//									alert('Recipient#1 cell9: '+rq9);  
									}
								if (rjnam9 !== ojnam)
									{
									if (rjnam10 == ojnam)
										{
										rq = rq10
//										alert('Recipient#1 cell10: '+rq10);  
										}
									if (rjnam10 !== ojnam)
										{
										if (rjnam11 == ojnam)
											{
											rq = rq11
//											alert('Recipient#1 cell11: '+rq11);  
											}
										if (rjnam11 !== ojnam)
											{
											if (rjnam12 == ojnam)
												{
												rq = rq12
//												alert('Recipient#1 cell12: '+rq12);  
												}
											if (rjnam12 !== ojnam)
												{
												if (rjnam13 == ojnam)
													{
													rq = rq13
//													alert('Recipient#1 cell13: '+rq13);  
													}
												if (rjnam13 !== ojnam)
													{
													if (rjnam14 == ojnam)
														{
														rq = rq14
//														alert('Recipient#1 cell14: '+rq14);  
														}
													if (rjnam14 !== ojnam)
														{
														if (rjnam15 == ojnam)
															{
															rq = rq15
//															alert('Recipient#1 cell15: '+rq15);  
															}
														if (rjnam15 !== ojnam)
															{
															if (rjnam16 == ojnam)
																{
																rq = rq16
//																alert('Recipient#1 cell16: '+rq16);  
																}
															if (rjnam16 !== ojnam)
																{
																if (rjnam17 == ojnam)
																	{
																	rq = rq17
//																	alert('Recipient#1 cell17: '+rq17);  
																	}
																if (rjnam17 !== ojnam)
																	{
																	if (rjnam18 == ojnam)
																		{
																		rq = rq18
//																		alert('Recipient#1 cell18: '+rq18);  
																		}
																	if (rjnam18 !== ojnam)
																		{
																		if (rjnam19 == ojnam)
																			{
																			rq = rq19
//																			alert('Recipient#1 cell19: '+rq19);  
																			}
																		if (rjnam19 !== ojnam)
																			{
																			if (rjnam20 == ojnam)
																				{
																				rq = rq20
//																				alert('Recipient#1 cell20: '+rq20);  
																				}
																			if (rjnam20 !== ojnam)
																				{
																				if (rjnam21 == ojnam)
																					{
																					rq = rq21
//																					alert('Recipient#1 cell21: '+rq21);  
																					}
																				if (rjnam21 !== ojnam)
																					{
																					if (rjnam22 == ojnam)
																						{
																						rq = rq22
//																						alert('Recipient#1 cell22: '+rq22);  
																						}
																					if (rjnam22 !== ojnam)
																						{
																						if (rjnam23 == ojnam)
																							{
																							rq = rq23
//																							alert('Recipient#1 cell23: '+rq23);  
																							}
																						if (rjnam23 !== ojnam)
																							{
																							if (rjnam24 == ojnam)
																								{
																								rq = rq24
//																								alert('Recipient#1 cell24: '+rq24);  
																								}
																							if (rjnam24 !== ojnam)
																								{
																								if (rjnam25 == ojnam)
																									{
																									rq = rq25
//																									alert('Recipient#1 cell25: '+rq25);  
																									}
																								if (rjnam25 !== ojnam)
																									{
																									if (rjnam26 == ojnam)
																										{
																										rq = rq26
//																										alert('Recipient#1 cell26: '+rq26);  
																										}
																									if (rjnam26 !== ojnam)
																										{
																										if (rjnam27 == ojnam)
																											{
																											rq = rq27
//																											alert('Recipient#1 cell27: '+rq27);  
																											}
																										if (rjnam27 !== ojnam)
																											{
																											if (rjnam28 == ojnam)
																												{
																												rq = rq28
//																												alert('Recipient#1 cell28: '+rq28);  
																												}
																											if (rjnam28 !== ojnam)
																												{
																												if (rjnam29 == ojnam)
																													{
																													rq = rq29
//																													alert('Recipient#1 cell29: '+rq29);  
																													}
																												if (rjnam29 !== ojnam)
																													{
																													if (rjnam30 == ojnam)
																														{
																														rq = rq30
//																														alert('Recipient#1 cell30: '+rq30);  
																														}
																													if (rjnam30 !== ojnam)
																														{
																														alert('Error: No more javascript code for other jobs'); 
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
//alert('Recipient#1 Quantity: '+rq); 

//Check for Name
if (rnam2 == nam)
	{
//	alert('Recipient#1 info is MATCHING Name info'); 
	}
	if (rnam2 !== nam)
	{
	alert('Recipient#1 name is NOT matching with Customer name!'+ '\n' + "Recipient#1 Name: "+rnam2+ '\n' + "Original Name: "+nam); 
	}
//Check for Department
	if (rdep4 == dep)
	{
//	alert('Recipient#1 info is MATCHING Department'); 
	}
	if (rdep4 !== dep)
	{
	alert('Recipient#1 department is NOT matching with Original department!'+ '\n' + "Recipient#1 Department: "+rdep4+ '\n' + "Original Department: "+dep); 
	}
//check for Quantity
	if (rq == oq)
	{
//	alert('Recipient#1 quantity is MATCHING Original quantity.'); 
	}
	if (rq !== oq)
	{
	alert('Recipient#1 quantity is NOT matching Original quantity!'+ '\n' + "Recipient#1 Quantity: "+rq+ '\n' + "Original Quantinty: "+oq); 
	}
})();


//Remove  Resipient#2
(function (Resipient2) {
var s=document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients").innerHTML;
var pattc=/Recipient #2/g;
var resultc=pattc.test(s);
if ((resultc==true))
	{
	//diplay resipient info 
	dis1 = document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl03_ProductionJobTicketSummaryItem_LabelRecipientHeader");
	dis2 = dis1.parentNode;
	dis3 = dis2.parentNode;
	dis4 = dis3.parentNode;
	dis5 = dis4.innerHTML;
	hid1 = document.getElementById("__VIEWSTATEPERSISTER");
	hid2 = hid1.parentNode;
	hid3 = hid2.innerHTML=dis5;
	document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl03_ProductionJobTicketSummaryItem_LabelRecipientHeader").innerHTML='';
	document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl03_ProductionJobTicketSummaryItem_LabelDeliveryMethodDescription").innerHTML='';
	var r=confirm("Press OK to remove Recipient #2 ");
	if (r==true)
  		{
		//Remove Recipient#2 Display
		dis1 = document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl03_ProductionJobTicketSummaryItem_LabelRecipientHeader");
		dis2 = dis1.parentNode;
		dis3 = dis2.parentNode;
		dis4 = dis2.innerHTML='';
		//Remove Recipient#2 Completly
		var x=document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl03_ProductionJobTicketSummaryItem_LabelRecipientHeader");  
		par1 = x.parentNode;
		par2 = par1.parentNode;
		par3 = par2 .parentNode;
		par4 = par3 .parentNode;
		par5 = par4 .parentNode;
		par6 = par5 .parentNode;
		par7 = par6 .parentNode;
		par8 = par7 .parentNode;
		par9 = par8 .parentNode;
		par10 = par9 .parentNode;
		par11 = par10 .parentNode;
//		pard = par11.innerHTML;
//		alert(pard); 
		par11.removeChild(par11.childNodes[1])
		
	//scan for recipient #3
		var pattc=/Recipient #3/g;
		var resultc=pattc.test(s);
		if ((resultc==true))
			{
			//display resipient info 
			dis1 = document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl04_ProductionJobTicketSummaryItem_LabelRecipientHeader");
			dis2 = dis1.parentNode;
			dis3 = dis2.parentNode;
			dis4 = dis3.parentNode;
			dis5 = dis4.innerHTML;
//			alert(dis5); 
			hid1 = document.getElementsByTagName("div")[0];
			hid2 = hid1.innerHTML=dis5;
			document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl04_ProductionJobTicketSummaryItem_LabelRecipientHeader").innerHTML='';
			document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl04_ProductionJobTicketSummaryItem_LabelDeliveryMethodDescription").innerHTML='';
			var r=confirm("Press OK to remove Recipient #3 ");
			if (r==true)
	 		 	{
				//Remove Recipient#2 Display
				remdis = hid1.innerHTML=" ";
				//Remove Recipient#2 Completly	
				var x=document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl04_ProductionJobTicketSummaryItem_LabelRecipientHeader");  
				par1 = x.parentNode;
				par2 = par1.parentNode;
				par3 = par2 .parentNode;
				par4 = par3 .parentNode;
				par5 = par4 .parentNode;
				par6 = par5 .parentNode;
				par7 = par6 .parentNode;
				par8 = par7 .parentNode;
				par9 = par8 .parentNode;
				par10 = par9 .parentNode;
				par11 = par10 .parentNode;
//				pard = par11.innerHTML;
//				alert(pard); 
				par11.removeChild(par11.childNodes[1])
				}
			}
		}
	}
})();









