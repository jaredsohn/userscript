// ==UserScript==
// @name        Job Ticket 3
// @namespace   http://printing.arc.losrios.edu/DSF/Admin/*
// @description CSS
// @include        http://printing.arc.losrios.edu/DSF/Admin/*
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/ProductionView.aspx
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/AdminHome.aspx
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx
// @version        1.0.06
// ==/UserScript==

//Assigning id # to Job Ticket Cells

(function cells() {
var sttc=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_TableRowProductNameAndBWImpressions").innerHTML;
var pattc=/Quick Copy | Black & White/g;
var resultc=pattc.test(sttc);
if ((resultc ==true))
	{
	//File(s) cell
	file1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FilesImage");
	file2 = file1.parentNode;
	file3 = file2.parentNode;
	file4 = file3.parentNode;
	file5 = file4.parentNode;
	file6 = file5.parentNode;
	file7 = file6.parentNode;
	file8 = file7.parentNode;
	file9 = file8.parentNode;
	file10 = file9.parentNode;
	file11 = file10.parentNode;
	file12 = file11.parentNode;
	file12.setAttribute("id","File_s_"); 
	//Atributes_Header
	head1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_sectionHeader");
	head2 = head1.parentNode;
	head3 = head2.parentNode;
	head4 = head3.parentNode;
	head5 = head4.parentNode;
	head6 = head5.parentNode;
	head7 = head6.parentNode;
	head8 = head7.parentNode;
	head8.setAttribute("id","Atributes_Header"); 
	//cells1-7
	cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData_ctl00_FeatureImage");
	cell2 = cell1.parentNode;
	cell3 = cell2.parentNode;
	cell4 = cell3.parentNode;
	cell5 = cell4.parentNode;
	cell6 = cell5.parentNode;
	cell7 = cell6.parentNode;
	cell7.setAttribute("id","CellOne"); 
	cell8 = cell7.nextSibling;
	cell8.setAttribute("id","CellTwo"); 
	cell9 = cell8.nextSibling;
	cell9.setAttribute("id","CellThre"); 
	cell10 = cell9.nextSibling;
	cell10.setAttribute("id","CellFour"); 
	cell11 = cell10.nextSibling;
	cell11.setAttribute("id","CellFive"); 
	cell12 = cell11.nextSibling;
	cell12.setAttribute("id","CellSix"); 
	cell13 = cell12.nextSibling;
	cell13.setAttribute("id","CellSeven"); 
	//special & operator instruction cells
	cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_sectionHeader");
	cell2 = cell1.parentNode;
	cell3 = cell2.parentNode;
	cell4 = cell3.parentNode;
	cell5 = cell4.parentNode;
	cell6 = cell5.parentNode;
	cell7 = cell6.parentNode;
	cell8 = cell7.parentNode;
	cell8.setAttribute("id","Special_Instructions"); 
	cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_sectionHeader");
	cell2 = cell1.parentNode;
	cell3 = cell2.parentNode;
	cell4 = cell3.parentNode;
	cell5 = cell4.parentNode;
	cell6 = cell5.parentNode;
	cell7 = cell6.parentNode;
	cell8 = cell7.parentNode;
	cell8.setAttribute("id","Operator_Notes"); 
	}
if ((resultc !==true))
	{
	var pattc=/Full Service Copy job/g;
	var resultc=pattc.test(sttc);
	if ((resultc ==true))
		{
		//File(s) cell
		file1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FilesImage");
		file2 = file1.parentNode;
		file3 = file2.parentNode;
		file4 = file3.parentNode;
		file5 = file4.parentNode;
		file6 = file5.parentNode;
		file7 = file6.parentNode;
		file8 = file7.parentNode;
		file9 = file8.parentNode;
		file10 = file9.parentNode;
		file11 = file10.parentNode;
		file12 = file11.parentNode;
		file12.setAttribute("id","File_s_"); 
		//Atributes_Header
		head1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_sectionHeader");
		head2 = head1.parentNode;
		head3 = head2.parentNode;
		head4 = head3.parentNode;
		head5 = head4.parentNode;
		head6 = head5.parentNode;
		head7 = head6.parentNode;
		head8 = head7.parentNode;
		head8.setAttribute("id","Atributes_Header"); 
		//cells1-13
		cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData_ctl00_FeatureImage");
		cell2 = cell1.parentNode;
		cell3 = cell2.parentNode;
		cell4 = cell3.parentNode;
		cell5 = cell4.parentNode;
		cell6 = cell5.parentNode;
		cell7 = cell6.parentNode;
		cell7.setAttribute("id","CellOne"); 
		cell8 = cell7.nextSibling;
		cell8.setAttribute("id","CellTwo"); 
		cell9 = cell8.nextSibling;
		cell9.setAttribute("id","CellThre"); 
		cell10 = cell9.nextSibling;
		cell10.setAttribute("id","CellFour"); 
		cell11 = cell10.nextSibling;
		cell11.setAttribute("id","CellFive"); 
		cell12 = cell11.nextSibling;
		cell12.setAttribute("id","CellSix"); 
		cell13 = cell12.nextSibling;
		cell13.setAttribute("id","CellSeven"); 
		cell14 = cell13.nextSibling;
		cell14.setAttribute("id","CellEight"); 
		cell15 = cell14.nextSibling;
		cell15.setAttribute("id","CellNine"); 
		cell16 = cell15.nextSibling;
		cell16.setAttribute("id","CellTen"); 
		cell17 = cell16.nextSibling;
		cell17.setAttribute("id","CellEleven"); 
		cell18 = cell17.nextSibling;
		cell18.setAttribute("id","CellTwelve"); 
		cell19 = cell18.nextSibling;
		cell19.setAttribute("id","CellThirteen"); 
		//special & operator instruction cells
		cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_sectionHeader");
		cell2 = cell1.parentNode;
		cell3 = cell2.parentNode;
		cell4 = cell3.parentNode;
		cell5 = cell4.parentNode;
		cell6 = cell5.parentNode;
		cell7 = cell6.parentNode;
		cell8 = cell7.parentNode;
		cell8.setAttribute("id","DelletExtraCell"); 
		str=document.getElementById("DelletExtraCell").innerHTML;
		patt=/Special Instructions/g;
		result=patt.test(str);
		if (result==true)
			{
//			alert("Special Instructions in the first cell"); 
			cell8.setAttribute("id","Special_Instructions"); 
			//Operator Notes
			cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_sectionHeader");
			cell2 = cell1.parentNode;
			cell3 = cell2.parentNode;
			cell4 = cell3.parentNode;
			cell5 = cell4.parentNode;
			cell6 = cell5.parentNode;	
			cell7 = cell6.parentNode;
			cell8 = cell7.parentNode;
			cell8.setAttribute("id","Operator_Notes"); 
			}
		if (result!==true)
			{
//			alert("Special Instructions empty. Press ok to dellete."); 
			//Dellete contents of empty cell
			cell8.innerHTML="";
			//Special Instructions
			cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_sectionHeader");
			cell2 = cell1.parentNode;
			cell3 = cell2.parentNode;
			cell4 = cell3.parentNode;
			cell5 = cell4.parentNode;
			cell6 = cell5.parentNode;
			cell7 = cell6.parentNode;
			cell8 = cell7.parentNode;
			cell8.setAttribute("id","Special_Instructions"); 
			//Operator Notes
			cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl03_JobSummaryParts_sectionHeader");
			cell2 = cell1.parentNode;
			cell3 = cell2.parentNode;
			cell4 = cell3.parentNode;
			cell5 = cell4.parentNode;
			cell6 = cell5.parentNode;	
			cell7 = cell6.parentNode;
			cell8 = cell7.parentNode;
			cell8.setAttribute("id","Operator_Notes"); 
			}
		}
	if ((resultc !==true))
		{
		var pattc=/Full Service Press job/g;
		var resultc=pattc.test(sttc);
		if ((resultc ==true))
			{
			//File(s) cell
			file1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FilesImage");
			file2 = file1.parentNode;
			file3 = file2.parentNode;
			file4 = file3.parentNode;
			file5 = file4.parentNode;
			file6 = file5.parentNode;
			file7 = file6.parentNode;
			file8 = file7.parentNode;
			file9 = file8.parentNode;
			file10 = file9.parentNode;
			file11 = file10.parentNode;
			file12 = file11.parentNode;
			file12.setAttribute("id","File_s_"); 
			//Atributes_Header
			head1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_sectionHeader");
			head2 = head1.parentNode;
			head3 = head2.parentNode;
			head4 = head3.parentNode;
			head5 = head4.parentNode;
			head6 = head5.parentNode;
			head7 = head6.parentNode;
			head8 = head7.parentNode;
			head8.setAttribute("id","Atributes_Header"); 
			//cells1-13
			cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData_ctl00_FeatureImage");
			cell2 = cell1.parentNode;
			cell3 = cell2.parentNode;
			cell4 = cell3.parentNode;
			cell5 = cell4.parentNode;
			cell6 = cell5.parentNode;
			cell7 = cell6.parentNode;
			cell7.setAttribute("id","CellOne"); 
			cell8 = cell7.nextSibling;
			cell8.setAttribute("id","CellTwo"); 
			cell9 = cell8.nextSibling;
			cell9.setAttribute("id","CellThre"); 
			cell10 = cell9.nextSibling;
			cell10.setAttribute("id","CellFour"); 
			cell11 = cell10.nextSibling;
			cell11.setAttribute("id","CellFive"); 
			cell12 = cell11.nextSibling;
			cell12.setAttribute("id","CellSix"); 
			cell13 = cell12.nextSibling;
			cell13.setAttribute("id","CellSeven"); 
			cell14 = cell13.nextSibling;
			cell14.setAttribute("id","CellEight"); 
			cell15 = cell14.nextSibling;
			cell15.setAttribute("id","CellNine"); 
			cell16 = cell15.nextSibling;
			cell16.setAttribute("id","CellTen"); 
			cell17 = cell16.nextSibling;
			cell17.setAttribute("id","CellEleven"); 
			cell18 = cell17.nextSibling;
			cell18.setAttribute("id","CellTwelve"); 
			cell19 = cell18.nextSibling;
			cell19.setAttribute("id","CellThirteen"); 
			//special & operator instruction cells
			cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_sectionHeader");
			cell2 = cell1.parentNode;
			cell3 = cell2.parentNode;
			cell4 = cell3.parentNode;
			cell5 = cell4.parentNode;
			cell6 = cell5.parentNode;
			cell7 = cell6.parentNode;
			cell8 = cell7.parentNode;
			cell8.setAttribute("id","DelletExtraCell"); 
//			cell8.innerHTML="";
			cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_sectionHeader");
			cell2 = cell1.parentNode;
			cell3 = cell2.parentNode;
			cell4 = cell3.parentNode;
			cell5 = cell4.parentNode;
			cell6 = cell5.parentNode;
			cell7 = cell6.parentNode;
			cell8 = cell7.parentNode;
			cell8.setAttribute("id","Special_Instructions"); 
			cell1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_sectionHeader");
			cell2 = cell1.parentNode;
			cell3 = cell2.parentNode;
			cell4 = cell3.parentNode;
			cell5 = cell4.parentNode;
			cell6 = cell5.parentNode;	
			cell7 = cell6.parentNode;
			cell8 = cell7.parentNode;
			cell8.setAttribute("id","Operator_Notes"); 
			}
		if ((resultc !==true))
			{
			alert("There is no code for this type of job!"); 
			}
		}
	}
})();

//Duplicate Order # for barcode
document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelTelephoneNumber").innerHTML=document.getElementById("ctl00_ctl00_C_M_lblOrderNumberValue").innerHTML;

//Get rid of the footnote
dis1 = document.getElementById("ctl00_ctl00_copyRightLBL");
dis2 = dis1.parentNode;
dis3 = dis2.parentNode;
dis4 = dis3.parentNode;
dis4.setAttribute("id","FootNote"); 
dis4.setAttribute("class","FootNote"); 
dis4.innerHTML="";

//Order number
dis1 = document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl00_lblJob");
dis2 = dis1.parentNode;
dis3 = dis2.parentNode;
dis3.setAttribute("id","Jobofjunk"); 

GM_addStyle((<><![CDATA[
#Jobofjunk>td	{background-color:white !important;}
#Jobofjunk>td+td	{display:none;}
]]></>).toString());

GM_addStyle((<><![CDATA[

@media print
{

//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{margin-top:-8px;width:321px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{margin-top:-8px;width:321px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{margin-top:-3px;width:321px;}

//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{margin-top:-7px;width:321px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{margin-top:-6px;width:321px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr>td{margin-top:-2px;width:321px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr>td{margin-top:-5px;width:321px;}

//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr>td{margin-top:-4px;width:321px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr>td{margin-top:-1px;width:322px !important;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr>td{margin-top:0px;width:323px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr>td{margin-top:0px;width:322px !important;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr>td{margin-top:65px;min-width:338.5px}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_SpeciaPagesItems_sectionHeader{margin-top:500px; Display:inline !important; z-index:1 !important;}



//table+table{margin-top:-20px !important;}
//td[width="496"]{min-width:718.5px;Padding-bottom:28px;padding-top:0px !important;height:2px;z-index:100 !important;Overflow:visible  !important;}

//td[width="100"][valign="top"][class="left"][nowrap="nowrap"]{margin-top:4px !important; margin-left:10px !important;width:50px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_lblFilePosition {margin-top:1px !important; margin-left:0px !important; width:50px;}

//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_Label1{margin-top:5px !important; margin-left:10px !important; Height:15px !important;z-index:1 !important;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{margin-top:5px !important; margin-left:10px !important;}

.button-mouseover{display:none;}
.button-mouseout{display:none;}




#ctl00_ctl00_C_M_lblCustomerName{margin-top:-178px;margin-left:0px;}
#ctl00_ctl00_C_M_lblCustomerNameValue{margin-top:-178px;margin-left:0px;}
#ctl00_ctl00_C_M_lblCompanyName{margin-top:-178px;margin-left:0px;}
#ctl00_ctl00_C_M_lblCompanyNameValue{margin-top:-178px;margin-left:0px;}
#ctl00_ctl00_C_M_lblDepartmentName{margin-top:-178px;margin-left:0px;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{margin-top:-178px;margin-left:0px;}
#ctl00_ctl00_C_M_lblTelephone1{margin-top:-178px;margin-left:1px;}
#ctl00_ctl00_C_M_lblTelephone1Value {margin-top:-178px;margin-left:-1px;}
#ctl00_ctl00_C_M_lblTelephone2 {margin-top:-178px;margin-left:1px;}
#ctl00_ctl00_C_M_lblTelephone2Value {margin-top:-178px;margin-left:-1px;}
#ctl00_ctl00_C_M_lblEmail {margin-top:-178px;margin-left:0px;}
#ctl00_ctl00_C_M_lblEMailValue {margin-top:-178px;margin-left:-1px;}

#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelRecipientAddress  {margin-top:-178px;margin-left:-300px; background-color:white !important;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelDeliveryMethod{margin-top:-180px;margin-left:0px;width:425px !important;height:184px !important;font-size:16.5px !important;Padding-left:0px !important;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelDeliveryMethod:before {content:"****************DELIVERY**************** ^" !important;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_Row_DeliveryInstructions{margin-top:-178px;margin-left:0px; background-image:!important;}



#ctl00_ctl00_C_M_LabelLocationPhoneTitle {margin-top:-182px;margin-left:-1px;border:0px solid black;width:85px; height:12px; padding-right:20px;background-color:white !important;}
#ctl00_ctl00_C_M_LabelLocationPhone{margin-top:-182px;margin-left:-1px;border:0px solid black;width:85px; height:12px; padding-right:20px;background-color:white !important;}
#ctl00_ctl00_C_M_LabelLocationFaxTitle {margin-top:-181px;margin-left:-2px;}
#ctl00_ctl00_C_M_LabelLocationFax{margin-top:-181px;margin-left:-1px;border:0px solid black;width:85px; height:12px; padding-right:20px;background-color:white !important;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl00_lblJob{margin-top:-170px;margin-left:-2px;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelTelephoneNumber{margin-top:-170px;margin-left:-0px;}
#ctl00_ctl00_C_M_lblOrderNumberValue {background-color:white !important;z-index:101 !important;margin-top:-183px;margin-left:3px;}

#ctl00_ctl00_C_M_LblOrderStatusDesc{Display:none;}
#ctl00_ctl00_C_M_lblOrderStatus{Display:none;}

.displaydue{margin-top:-179px;margin-left:-2px;width:247px !important;Overflow:hidden !important;white-space:normal !important;}

.left{text-align:left;padding-left:0px;border:0px;}
.ctr-ticketingcontent{display:inline;width:400px;border:1px solid white;overflow:visible;}
.padding{padding:0px;}

#ctl00_ctl00_C_M_lblPrintCenterName, 
#ctl00_ctl00_C_M_LabelLocationAddress1, 
#ctl00_ctl00_C_M_LabelLocationCity  		{margin-left:-3px;}


#ctl00_ctl00_C_M_lblOrderNumber 			{ margin-left:-3px;}
#ctl00_ctl00_C_M_lblPriceValue,
#ctl00_ctl00_C_M_lblReceivedDateValue  		{margin-left:-1px;}

#ctl00_ctl00_C_M_lblReceivedDate,
#ctl00_ctl00_C_M_lblPrice,
#ctl00_ctl00_C_M_lblPayment				{margin-left:-3px; margin-top:-20px !important;}


#ctl00_ctl00_C_M_lblPaymentValue			{margin-left: -1px; margin-top:-165px !important;}



tr [id="ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow"]{margin-top:-176px;width:800px;Height:70px !important;}
tr .margintop10px{margin-top:44px !important;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList{margin-top:-77px !important; margin-left:-13px !important;}
table [width="100%"][ style="border:0px solid red;"][ cellpadding="8"][ cellspacing="0"][ class="bg-BuR-000100"]{Height:70px !important;}
html .ctr-page{Position:absolute; left:0% !important; margin-left:0px !important;}
table{height:0px}




#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table tr td table{min-width:255px !important;}



.gecko .ctr-adminfullpagelayout{width:100%;margin:0px;display:inline;text-align:left;}
.ctr-adminfullpagelayout{width:auto;margin:0px;display:inline-block;text-align:left;}
.ie7 .ctr-adminfullpagelayout{float:left;width:auto;margin-top:10px;margin-bottom:10px;margin-left:0px;display:inline;text-align:left;}
 body{font-family:Tahoma,Verdana,Arial,Helvetica,sans-serif;font-size:10px;color:#000000;margin-left:0px;}
.display{display:none;}
.ctr-ticketingoptions{width:788px;margin-bottom:20px;margin-top:-28px;margin-left:0px;text-align:center}
.ctr-ticketingcontent{display:inline;margin-left:-0px;width:400px;border:1px solid white;overflow:visible;}
.ctr-maincontent{margin:0px;margin-left:-1px;border:1px solid white;overflow:visible;}
.ie7 .ctr-maincontent{margin:0px;padding-left:2px;border:0px solid white;overflow:visible;float:left;width:auto;}
.bg-BuS-000001{background-color:#FFFFFF;border:0px solid #FFFFFF;}
.ctr-breadcrumb{display:none;margin-top:10px;margin-left:19px;margin-right:19px;margin-bottom:10px;display:inline;border:0px solid red; background-color: transparent;}
.ctr-bc-button{display:none;border:0px solid green;}
.right{text-align:right;}
.frm-button{font-family:Tahoma,Verdana,Arial,Helvetica,sans-serif;font-size:11px;font-weight:normal;color:#000000;text-align:center;padding-left:5px;padding-right:5px; height:20px;background:url(images/bg_button_mout.gif);border:1px solid #8e8e8e;}

.ie6 .ctr-ticketingcontent{display:inline;margin-left:0px;border:1px solid white;}
.right{text-align:right;border:0px;}

.bold{font-weight:bold;}
.Bg_white_gray2px{border:0px solid #DCDCDC;background-color:#FFFFFF;text-align:left;width:100%;}

.topmargin10px{margin-top:10px;}
.bg-BuR-000100{background-color: #e4ebf5;}
.ctr-ticketingoptions{width:800px;margin-bottom:20px;margin-top:-0px;display:inline;border:1px solid white;overflow:visible}

.ctr-headercentercontainer{width:700px;display:inline;margin-left:10px;margin-right:10px;margin-bottom:10px;border:0px solid green;}
.text-BuR-001110{font-size:13px;color:#003698;font-weight:bold;text-align:left;}
.bg-BuS-010111{height:28px;border-bottom:1px solid #CCCCCC;margin-right:2px;background-color:#FFFFFF;}
.text-BuS-001011{font-size:11px;font-weight:bold;color:#003799;}
.tblborderbottom{border-bottom:1px #999999 dashed;}
.text-BuS-001101{font-size:12px;color:#be302f;font-weight:bold;}
.text-BuS-001110{font-size:12px;font-weight:bold;text-align:left;}
.paddingleft10px{padding-left:10px;}
.ctr-column02{width:300px;margin-bottom:20px;margin-left:20px;display:inline;text-align:left;}
.ctr-column23{width:300px;display:inline;text-align:left;border:0px #FFFFFF solid;}
.ctr-tabs{display:none;}
.ctr-welcomemessage{display:none;}
.ctr-header{display:none;}
.ctr-page{margin-left:0px;}
.w628{width:300px;}
.w728{width:300px;}
.w750{width:300px;}
.w500{width:300px;}
.w790{width:300px;}
.w45{width:45px;}
.w42{width:42px;}
.w496{width:300px;}
.w745{width:300px;}
.w80{width:80px;}
.w448{width:300px;}
.w746{width:300px;}
.w745{width:400px;}
.w110{width:80px;padding-left:-20px;}
.w152{width:50px;}
.w125{width:50px;}
.ctr-ticketingbuttoncontainer{display:none;}
.ctr-footer{display:none;}

#preflightreportitem{display:block;}
}



#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList .text-BuR-001110{font-size:12px;color:#003698;font-weight:bold;text-align:left;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList .bg-BuS-010111{background-color:#FFFFFF;height:0px;border-bottom:1px solid black;margin-right:0px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList .bg-BuR-000011{border:1px solid black;line-height:12px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList .tblborderbottom{border-bottom:1px solid black;}
tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}



table[cellpadding="0"][cellspacing="4"][border="0"][class="w628"] tr+tr+tr{display:none;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList .bg-BuR-000100 tbody tr+tr>td+td{font-size:12px;line-height:0px;text-decoration:none;font-weight:lighter;margin-left:0px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList .bg-BuR-000100 tbody tr+tr td{font-size:14px;line-height:12px;font-weight:bold;margin-left:0px;}
.text-BuS-001110{font-size:15px;hieght:0px;font-weight:bold;}
.text-BuS-001101{font-size:15px;color:#be302f;font-weight:bold;}
form[action^="ProductionJobTicket"] .bg-BuS-000001{background-color:#FFFFFF;border:1px red;}

#ctl00_ctl00_C_M_lblReceivedDateValue{font-size:14px;line-height:13px;}

#Atributes_Header							{Position:absolute;top:250px;left:0px;border:1px solid black;height:15px;width:315px;Overflow:visible;white-space:normal !important;}

#Special_Instructions						{Position:absolute;top:250px;left:316px;border:1px solid black !important;height:15px;max-width:234px !important;min-width:234px !important;Overflow:visible;white-space:normal !important;}
#Special_Instructions .w728					{Position:absolute;top:12px;left:-1px;border:1px solid black !important;height:15px;max-width:236px !important;min-width:236px !important;Overflow:visible;white-space:normal !important;background-color:#CCDDF9;}
#Special_Instructions .tblborderbottom			{visibility:collapse;}  

#Operator_Notes							{Position:absolute;top:250px;left:551px;border:1px solid black !important;height:15px;max-width:235px !important;min-width:235px !important;Overflow:visible;white-space:normal !important;}
#Operator_Notes .w728 						{Position:absolute;top:12px;left:-1px;border:1px solid black !important;height:15px;max-width:237px !important;min-width:237px !important;Overflow:visible;white-space:normal !important;background-color:#CCDDF9;}
#Operator_Notes .tblborderbottom				{visibility:collapse;} 

.tblborderbottom							{border-bottom:0px;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData td table .w100	{display:none;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData td table .w628	{margin-left:-0px;margin-top:0px;line-height:14px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData td table .w100	{display:none;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData td table .w628	{margin-left:-0px;margin-top:0px;line-height:14px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl03_JobSummaryParts_JobSummaryPartData td table .w100	{display:none;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl03_JobSummaryParts_JobSummaryPartData td table .w628	{margin-left:-0px;margin-top:0px;line-height:14px;}


#CellThirteen>td			{Position:absolute;top:624px;left:-1px;border:1px solid black;height:55px;width:315px;background-color:#CCDDF9;Overflow:visible;white-space:normal !important;}
#CellTwelve	>td			{Position:absolute;top:573px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellEleven>td			{Position:absolute;top:522px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellTen>td				{Position:absolute;top:471px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellNine>td			{Position:absolute;top:420px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellEight>td			{Position:absolute;top:369px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellSeven>td			{Position:absolute;top:318px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellSix>td				{Position:absolute;top:267px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellFive>td			{Position:absolute;top:216px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellFour>td			{Position:absolute;top:165px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellThre				{Position:absolute;top:114px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellTwo				{Position:absolute;top:63px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#CellOne				{Position:absolute;top:12px;left:-1px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}

//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:679px;left:0px;border:1px solid black;height:55px;width:315px;background-color:#CCDDF9;Overflow:visible;white-space:normal !important;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr tr+tr+tr{display:none;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:623px;left:0px;border:1px solid black;height:55px;width:315px;background-color:#CCDDF9;Overflow:hidden;white-space:normal !important;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:368px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}

//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:572px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:521px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:470px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:419px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}

//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr>td{Position:absolute;top:317px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr>td{Position:absolute;top:266px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr>td{Position:absolute;top:215px;left:0px;border 1px solid black;height:50px;width:315px;background-color:#white;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
//#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr>td{Position:absolute;top:164px;left:0px;border:1px solid black;height:50px;width:315px;background-color:#CCDDF9;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr+tr>td .tblborderbottom{border-bottom:0px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr>td>div>div>div>table tr+tr+tr>td{white-space:nowrap !important;Overflow:hidden;max-width:315px !important;background-color:#CCDDF9;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData_ctl02_FeatureImage{padding-left:20px;}



table [width="100%"][style="border:0px solid red;"][cellpadding="8"][cellspacing="0"][class="bg-BuR-000100"] img {Position:absolute;top:19px;left:1px;}

table [width="100%"][style="border:0px solid red;"][cellpadding="8"][cellspacing="0"][class="bg-BuR-000100"] tr+tr  {Position:absolute;left:-35px;Top:17px;padding-left:100px;}

td[width="100"][valign="top"][class="left"][nowrap="nowrap"]{Position:absolute ;top:10px ;left:160px ;font-size:13px;width:5px !important;Padding-top:9px;Padding-bottom:0px;Padding-left:10px;Padding-right:0px;vertical-align:bottom;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_lblFilePosition  {Position:absolute;top:9px;left:41px;font-size:11px;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_Label1{Position:absolute;left:232px; top:16px;Font-Size:14px;white-space:nowrap;overflow:hidden;height:46px;Padding-top:4px;width:555px;background-color:#CCDDF9 !important;background-color:transparent;z-index:1;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{Position:absolute;left:237px; top:19px;Font-Size:14px;z-index:1;white-space:nowrap;overflow:hidden;height:15px;width:540px;z-index:100;}

table [width="100%"][style="border:0px solid red;"][cellpadding="8"][cellspacing="0"][class="bg-BuR-000100"] tr+tr+tr  {Position:absolute; right:350px;Top:45px;z-index:100;}

td[width="42"]    {display:none;}   

table [width="100%"][ style="border:0px solid red;"][ cellpadding="8"][ cellspacing="0"][ class="bg-BuR-000100"]{Height:51px !important;}

form[action^="ProductionJobTicket"] td [colspan="3"]{Display:none;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FilesImage{Position:absolute;Top:14px;}


#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData tr+tr+tr+tr+tr+tr td table[style="border:0px solid green;"][class="w728"][border="0"][cellspacing="0"][cellpadding="0"] tr table tr td[valign="top"][class="left w448"]:before{content:"  "}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData tr+tr+tr+tr+tr+tr+tr td table[style="border:0px solid green;"][class="w728"][border="0"][cellspacing="0"][cellpadding="0"] tr table tr td[valign="top"][class="left w448"]:before{content:"  "}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{font-size:17px;line-height:20px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{font-size:17px;line-height:20px;}



.w628 table tr>td{display:none;}
.w628 table tr>td+td{display:table-header-group;block;text-align:left;}



#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div>div>div>table tr img{height:50px;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div>div>div>table tr td table .w100{float:right;margin-right:-20px;}



#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table tr td table{max-width:231.4px !important;min-width:231.4px !important;}
tr [id="ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow"]{width:788px;Height:70px;}
div.ctr-ticketingoptions{position:reltive;margin-top:-250px;display:table-cell;}


form[action^="ProductionJobTicket"] tr+tr+tr+tr+tr+tr+tr+tr+tr table+table{position:absolute;width:0px}



form[action^="ProductionJobTicket"] .bold{position:static;font-size:15px;}
td[class="bold paddingleft10px"][style="width:150px;"]+td{Padding-left:8px !important;}
form[action^="ProductionJobTicket"] .bold+.bold{font-size:15px;border:0px solid red;overflow:hidden;white-space:nowrap;max-width:470px;Padding-left:0px;Padding-right:0px;}
.paddingleft10px:first-child{Padding-left:8px;Padding-right:10px;width:48px !important;}
.paddingleft10px:first-child+td{Padding-left:8px;Padding-right:0px;max-width:300px !important;}
.paddingleft10px:first-child+td+td{Padding-left:0px;Padding-right:0px;width:50px !important;}
.paddingleft10px:first-child+td+td+td{font-size:15px;line-height:15px;Padding-left:0px;Padding-right:0px;width:50px !important;}
#ctl00_ctl00_C_M_lblReceivedDateValue{font-size:14px;line-height:13px;}
.w750{margin-top:-10px; width:790px;}



#ctl00_ctl00_C_M_lblOrderNumber		{Position:relative;top:3px;left:-2px}

#ctl00_ctl00_C_M_lblReceivedDate,
#ctl00_ctl00_C_M_lblReceivedDateValue	{Position:relative;top:-0px;left:-2px}

#ctl00_ctl00_C_M_lblPrice,
#ctl00_ctl00_C_M_lblPriceValue		{Position:relative;top:-0px;left:-2px}

#ctl00_ctl00_C_M_lblPayment			{Position:relative;top:-0px;left:-2px}
#ctl00_ctl00_C_M_lblPaymentValue		{Position:absolute;top:353px;left:120px; border:0px solid black; width:248px; height:12px; line-height:7px; white-space:nowrap; Overflow:hidden;}




#ctl00_ctl00_C_M_lblCustomerName{Position:absolute;Top:268px;left:380px;height:23px;width:112px;background-color:white; z-index:2;}
#ctl00_ctl00_C_M_lblCustomerNameValue{Position:absolute;Top:268px;left:492px;height:23px;width:290px;background-color:white; z-index:2;}
#ctl00_ctl00_C_M_lblCompanyName{Position:absolute;Top:286px;left:380px;font-weight:bold;Font-size:15px;background-color:white; z-index:2;}
#ctl00_ctl00_C_M_lblCompanyNameValue{Position:absolute;Top:289px;left:492px;font-weight:bold;Font-size:12px;border:0px solid black;width:285px;white-space:nowrap;}
#ctl00_ctl00_C_M_lblDepartmentName{Position:absolute;Top:304px;left:380px;font-weight:bold;Font-size:15px;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{Position:absolute;Top:307px;left:492px;font-weight:bold;Font-size:12px;border:0px solid black;width:287px;white-space:nowrap;}
#ctl00_ctl00_C_M_lblTelephone1{Position:absolute;Top:321px;left:380px;font-size:14px;}
#ctl00_ctl00_C_M_lblTelephone1Value{Position:absolute;Top:323px;left:494px;font-size:14px;line-height:13px;}
#ctl00_ctl00_C_M_lblTelephone2{Position:absolute;Top:336px ;left:380px;font-size:14px;}
#ctl00_ctl00_C_M_lblTelephone2Value{Position:absolute;Top:338px ;left:494px;font-size:14px;line-height:13px;}
#ctl00_ctl00_C_M_lblTelephone2Value:before x {content:"-1111111111"}
#ctl00_ctl00_C_M_lblEmail{position:absolute;top:351px;left:380px;text-align:left;font-size:14px;}
#ctl00_ctl00_C_M_lblEMailValue{position:absolute;top:353px;left:494px;text-align:left;font-size:14px;line-height:13px;}

#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_HyperLinkEmail{display:none;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_DataGrid_OrderItems{display:none;}


#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelRecipientHeader{display:none;}
table table #ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients{position:absolute;top:0px;left:0px;border:hidden;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelDeliveryMethodDescription{display:none;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelRecipientAddress{Display:none;Position:absolute;left:792px;top:265px;border:0px solid black;width:294px;height:38px;background-color:white;font-weight:bold;Font-size:12px;line-height:20px;text-decoration:underline;white-space:nowrap;Overflow:hidden;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelDeliveryMethod{position:absolute;top:183px;left:372px;text-align:left;margin-right:260px;border:5px solid black;border-style:ridge; font-weight:bold;Font-size:15px;height:181px;width:402px;padding-left:4px;white-space:nowrap;overflow:hidden;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelDeliveryMethod:before {content:"****************DELIVERY**************** *";}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_Row_DeliveryInstructions{position:absolute;top:201px;left:381px;text-align:left;margin-right:250px;border:0px solid black;width:400px; height:120px; z-index:1;}

#ctl00_ctl00_C_M_PrintButton{Position:absolute; Top:153px;Left:755px;}
#ctl00_ctl00_C_M_CloseWindowButton {Position:absolute; Top:153px;Left:661px;}

form[action^="ProductionJobTicket"] #ctl00_ctl00_TabNavigatorSFAdministration_QuickMenuSearch{Position:absolute; Top:154.5px;Left:400px;}
form[action^="ProductionJobTicket"] #ctl00_ctl00_TabNavigatorSFAdministration_btnQuickNavGo{Position:absolute; Top:153px;Left:559px;}

#ctl00_ctl00_C_M_LabelLocationPhoneTitle 	{Position:absolute; top:237px;Left:5px;padding-bottom:20px;}
#ctl00_ctl00_C_M_LabelLocationPhone		{Position:absolute; top:237px;Left:40px;padding-bottom:20px;border:0px solid black;width:80px; height:12px;background-color:white;}
#ctl00_ctl00_C_M_LabelLocationFaxTitle 		{Position:absolute; top:253px;Left:3px;padding-left:3px;border:0px solid black;width:80px; height:12px;background-color:white;}
#ctl00_ctl00_C_M_LabelLocationFax			{Position:absolute; top:253px;Left:40px;border:0px solid black;width:80px; height:12px;background-color:white;}

#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelTelephoneNumber{Position:absolute;top:302px;left:122px;width:62px;border:0px solid black;font-weight:bold;Font-size:15px;color:red;white-space:nowrap;z-index:101;background-color:white;color:#be302f;text-align:left;}
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelTelephoneNumber:after {content:" -"}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl00_lblJob{Position:absolute;border:0px solid black;top:302px;left:155px;width:84px;font-weight:bold;Font-size:15px;color:red;text-align:right;white-space:nowrap;px;z-index:100;color:#be302f;text-align:left;}

#ctl00_ctl00_C_M_lblOrderNumberValue:before	{content:"*"}
#ctl00_ctl00_C_M_lblOrderNumberValue:after 	{content:"*"}
#ctl00_ctl00_C_M_lblOrderNumberValue 		{font-family: CCode39;font-size:100%;position:absolute;left:217px;top:237px;background-color:white;z-index:101;color:black;}

#ctl00_ctl00_C_M_LblOrderStatusDesc	{position:absolute;top:285px;left:5px;}
#ctl00_ctl00_C_M_lblOrderStatus		{position:absolute;top:285px;left:122px;}

tr .displaydue{position:absolute;top:268px;left:5px;text-align:left;border:0px solid red;width:365px;Overflow:hidden;white-space:nowrap;}

#ctl00_ctl00_C_M_lblPrintCenterName, 
#ctl00_ctl00_C_M_LabelLocationAddress1, 
#ctl00_ctl00_C_M_LabelLocationCity, 
#ctl00_ctl00_C_M_LabelLocationState, 
#ctl00_ctl00_C_M_LabelLocationZip 		{Position:relative; top:-18px;}


#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList{margin-top:-63px;margin-left:-10px;}
tr [id="ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow"]{Position:absolute;top:443px;left:0px;width:788px;}
form[action^="ProductionJobTicket"] .ctr-page{Position:absolute; left:50%; width:800px;margin-left:-400px; border:0px solid red;} 		

form[action^="ProductionJobTicket"] tr .margintop10px{margin-top:32px;}

form[action^="ProductionJobTicket"] #ctl00_ctl00_HLLanguage,
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_TableRowProductTypeAndTotalImpressions,
#ctl00_ctl00_C_M_lblFax,
#ctl00_ctl00_C_M_lblFaxValue,
#DelletExtraCell,
tr td[class="bg-BuR-000100 paddingleft10px"]+td		{display:none;}


#FootNote	{display:none important!;}



form[action^="ProductionJobTicket"] #ctl00_ctl00_copyRightLBL{position:absolute;top:600px;Display:none;border:1px solid black;Height:51px;width:0px;padding-left:100px;Overflow:hidden;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_SpeciaPagesItems_sectionHeader{position:absolute;top:200px;display:none;empty-cells:hide;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_SpeciaPagesItems_OptionsEditLink{position:absolute;top:200px;display:none;empty-cells:hide;}
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_SpeciaPagesItems_sectionHeader{position:absolute;top:200px;display:none;}


tr+tr+tr+tr+tr+tr+tr+tr+tr>.bg-BuR-000100,
#ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelTelephoneNumber#ctl00_ctl00_HLLanguage,
table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"]>tr>td[width="41%"][nowrap="nowrap"][class="text-BuR-001110 bg-BuS-010111"] #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_SpeciaPagesItems_sectionHeader,
table[cellpadding="0"][cellspacing="0"][border="0"][width="100%"]>tr>td[class="text-BuS-001011 bg-BuS-010111"][width="59%"] #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_SpeciaPagesItems_OptionsEditLink {display:none;}

table table table table table[width="100%"][cellpadding="0"][cellspacing="0"] tr>td>div[class="ctr-ticketingoptions bg-BuR-000011"][style="margin-left: 0px;"] {visibility:collapse;}
html table table table table table table[width="100%"][cellpadding="0"][cellspacing="0"] tr>td>div[class="ctr-ticketingoptions bg-BuR-000011"][style="margin-left: 0px;"]{visibility:visible;}


]]></>).toString());

(function o() {
var stt=document.getElementById("ctl00_ctl00_C_M_JobShipping1_DataGrid_Recipients_ctl02_ProductionJobTicketSummaryItem_LabelDeliveryMethod").innerHTML;
 if (stt =="Other") {

GM_addStyle((<><![CDATA[
#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}
]]></>).toString());

}
})();







