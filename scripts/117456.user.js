// ==UserScript==
// @name           sarvendra
// @version                1.9
// ==/UserScript==
var today=new Date();
var date1 = new Date();
date1.setDate(today.getDate()+7);
var date2 = new Date();
date2.setDate(today.getDate()+14);

months_name = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");   

function navModuleChange(navModuleName) {
	setProperty('air_text', 'textDecoration', 'none');
	setProperty('hotel_text', 'textDecoration', 'none');
	setProperty('car_text', 'textDecoration', 'none');
	setProperty('air_div', 'display', 'none');
	setProperty('hotel_div', 'display', 'none');
	setProperty('car_div', 'display', 'none');
	setProperty(navModuleName+'_text', 'textDecoration', 'underline');
	setProperty(navModuleName+'_div', 'display', 'block');
	return true;
}

function setProperty(id, prop, val) {
	if(!id) return false;
	var elem	= document.getElementById(id);
	if(!elem) return false;
	elem.style[prop] = val;
	return true;
}

function populate_select_days(mydate){
	myday = mydate.getDate();
	for (var i=1;i<32;i++){
		if (i == myday){
			document.write('<option selected="selected">'+i+'</option>');
		} else {
			document.write('<option>'+i+'</option>');
		}
	}
}
  
function populate_select_months(mydate){
	mymonth = mydate.getMonth()+1;
	for (var i=1;i<13;i++){
		if (i == mymonth){
			document.write('<option selected="selected" value="'+i+'">' + months_name[i-1] + '</option>');
		} else {
			document.write('<option value="'+i+'">'+months_name[i-1]+'</option>');
		}
	}
}
  
function populate_select_years(mydate){
	/*	myyear = mydate.getYear()+1900;	*/
	now = new Date();
	thisYear = now.getFullYear();
	for (var i=thisYear;i<thisYear+5;i++){
		if (i == thisYear){
			document.write('<option selected="selected" value="'+i+'">' + i + '</option>');
		} else {
			document.write('<option value="'+i+'">' + i + '</option>');
		}
	}
}
if (typeof(window['search_type'])=="undefined"){
	search_type=0;
}

stype='';
if (search_type==1){
	stype='<input type="hidden" name="forceClassicSearch" value="1" />';
} else if (search_type==0){
	stype='<input type="hidden" name="forceMetaSearch" value="1" />';
} else {
	stype='';
}

document.write('<style type="text/css">'+
		'div#tgrove_div_search #search22{border:none;background:none}'+
		'.tgrove_div_search {'+
			'top: 0px;'+
			'left: 0px;'+
			'font-family:"Helvetica Neue Light", Helvetica, Arial, sans-serif;'+
			'font-size:12px; font-size-adjust:none; font-stretch:normal;'+
			'font-style:normal; font-variant:normal; font-weight:normal; line-height:normal;'+
		'}'+
		'.tgrove_search_title { font: 16px "Helvetica Neue Light", Helvetica, Arial, sans-serif;color:#3C3C3C;line-height:normal;font-weight: bold;}'+
		'.tgrove_searchbox { padding: 3px 0px 3px 10px; FONT-SIZE: 12px; COLOR: #000000; FONT-FAMILY: verdana,arial,sans-serif; FONT-WEIGHT: 500;}'+
		'.tgrove_content-fxd-sm {FONT-SIZE: 10px; COLOR: #000000; FONT-FAMILY: arial,helvetica}'+
		'.tgrove_content-sm {FONT-SIZE: xx-small; COLOR: #000000; FONT-FAMILY: arial,helvetica}'+
		'.tgrove_div_search table {margin: 0px; border-collapse:separate;}'+
		'.tgrove_div_search table.w350 {width:350px}'+
		'.tgrove_div_search table.w353 {width:353px}'+
		'.tgrove_div_search table td,th{padding: 0px 2px;}'+
	'</style>');
document.write(
	'<div style="width:360px; height: 250px; background-image: url(\'http://www.travelgrove.com/images/search_background.jpg\')" class="tgrove_div_search" id="tgrove_div_search">'+
		'<div style="padding-top: 10px; padding-left: 10px">'+
			'<label for="air" style="padding-right: 5px">'+
				'<input name="rdo_prod" id="air" onclick="navModuleChange(this.value);" value="air" checked="checked" type="radio">'+
				'<span id="air_text" class="tgrove_search_title" style="text-decoration: underline;">Air</span>'+
			'</label>'+
			'<label for="hotel" style="padding-right: 5px">'+
				'<input name="rdo_prod" id="hotel" value="hotel" onclick="navModuleChange(this.value);" type="radio">'+
				'<span id="hotel_text" class="tgrove_search_title">Hotel</span>'+
			'</label>'+
			'<label for="car" style="padding-right: 5px">'+
				'<input name="rdo_prod" id="car" value="car" onclick="navModuleChange(this.value);" type="radio">'+
				'<span id="car_text" class="tgrove_search_title">Car</span>'+
			'</label>'+
			'<img src="http://www.travelgrove.com/images/frame/separator.gif" width="340" height="3" alt="airfares" style="padding:20px 0px 0px;background:none;border:none;margin:0"/>'+
		'</div>'+
		'<div id="air_div" style="display:block;padding-top: 10px; padding-left: 10px" class="tgrove_div_search">'+
			'<form action="http://www.travelgrove.com/cgi-bin/flightsearch.cgi?" method="get" name="ExpressBkFltonly" target="_blank" id="ExpressBkFltonly" style="margin:0px 0px;">'+
				'<input type="hidden" name="idReferral" value="'+idReferral+'" />'+
				stype+
				'<table class="w350" width="350" height="120" border="0" align="center" cellpadding="0" cellspacing="0">'+
					'<tr>'+
						'<td width="175" class="tgrove_searchbox"><input type="hidden" name="phpscript" value="flight" />From:</td>'+
						'<td width="175" class="tgrove_searchbox">To:</td>'+
					'</tr>'+
					'<tr>'+
						'<td width="175" class="tgrove_searchbox"><input type="text" name="inp_dep_arp_cd_1" class=tgrove_content-fxd-sm maxlength=30 size=23></td>'+
						'<td width="175" class="tgrove_searchbox"><input type="text" name="inp_arr_arp_cd_1" class=tgrove_content-fxd-sm maxlength=30 size=23></td>'+
					'</tr>'+
					'<tr>'+
						'<td width="175" class="tgrove_searchbox"> Depart: </td>'+
						'<td width="175" class="tgrove_searchbox"> Return: </td>'+
					'</tr>'+
					'<tr>'+
						'<td width="175" class="tgrove_searchbox">'+
							'<select id="select1" name="leave_day" class=tgrove_content-sm>');
								populate_select_days(date1);
document.write('			</select>'+
							'<select id="select2" name="leave_month" class=tgrove_content-sm>');
								populate_select_months(date1);
document.write('			</select>'+
							'<select id="select3" name="leave_year" class=tgrove_content-sm>');
								populate_select_years(date1);
document.write('			</select>'+
						'</td>'+
						'<td width="175" class="tgrove_searchbox">'+
							'<select id="select4" name="return_day" class=tgrove_content-sm>');
								populate_select_days(date2);
document.write('			</select>'+
							'<select id="select5" name="return_month" class=tgrove_content-sm>');
								populate_select_months(date2);
document.write('			</select>'+
							'<select id="select6" name="return_year" class=tgrove_content-sm>');
								populate_select_years(date2);
document.write('			</select>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="2"  class="tgrove_searchbox">'+
							'<table class="w350" width="350" border="0" cellspacing="0" cellpadding="0" width="100%">'+
								'<tr>'+
									'<td class="tgrove_searchbox"> Adults: </td>'+
									'<td class="tgrove_searchbox"> Children: </td>'+
									'<td class="tgrove_searchbox"> Seniors: </td>'+
									'<td class="tgrove_searchbox"> One Way </td>'+
									'<td class="tgrove_searchbox">&nbsp;</td>'+
								'</tr>'+
								'<tr>'+
									'<td>'+
										'<select name="inp_adult_pax_cnt" id="select9" class="tgrove_content-sm">'+
											'<option>0</option>'+
											'<option selected="selected">1</option>'+
											'<option>2</option>'+
											'<option>3</option>'+
											'<option>4</option>'+
											'<option>5</option>'+
											'<option>6</option>'+
										'</select>'+
									'</td>'+
									'<td>'+
										'<select name="inp_child_pax_cnt" id="select" class="tgrove_content-sm">'+
											'<option selected="selected">0</option>'+
											'<option>1</option>'+
											'<option>2</option>'+
											'<option>3</option>'+
											'<option>4</option>'+
											'<option>5</option>'+
										'</select>'+
									'</td>'+
									'<td>'+
										'<select name="inp_senior_pax_cnt" id="select2" class="tgrove_content-sm">'+
											'<option selected="selected">0</option>'+
											'<option>1</option>'+
											'<option>2</option>'+
											'<option>3</option>'+
											'<option>4</option>'+
											'<option>5</option>'+
											'<option>6</option>'+
										'</select>'+
									'</td>'+
									'<td><input type="checkbox" name="oneway" value="on" /></td>'+
									'<td><input name="search22" id="search22" type="image" src="http://www.travelgrove.com/images/global/travel_search.gif" /></td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
					'</tr>'+
				'</table>'+
				'<table class="w350" width="350" height="38" border="0"  cellpadding="0" cellspacing="0">'+
					'<tr>'+
						'<td>'+
						'<img src="http://www.travelgrove.com/images/frame/separator.gif" width="340" height="3" alt="airline tickets"   style="padding:20px 0px 0px;background:none;border:none;margin:0"/>'+
						'</td>'+
				  	'</tr>'+
				'</table>'+
			'</form>'+
    	'</div>');

document.write(	
		'<!-- Hotels  -->'+
		'<div id="hotel_div" style="display:none;padding-top: 10px; padding-left: 10px" class="tgrove_div_search">'+
			'<form action="http://www.travelgrove.com/cgi-bin/hotels/hotelsearch.cgi?" method="post" name="cbHotelNavFormUs" target="_blank" id="cbHotelNavFormUs" style="margin: 0px 0px;">'+
				'<input type="hidden" name="idReferral" value="'+idReferral+'" />'+
				stype+
				'<table class="content_search" border="0" cellpadding="0" cellspacing="0" height="120">'+
					'<tr>'+
						'<td width="180" class="tgrove_searchbox" valign="middle">'+
							'City <font size="1">(i.e: Los Angeles, CA)</font>:<br />'+
						'</td>'+
						'<td class="tgrove_searchbox" width="180">'+
							'State/Province:<br />'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td width="180" class="tgrove_searchbox" valign="middle">'+
							'<input type="text" name="airport" maxlength=30 size=23 class="tgrove_content-sm" id="ho_airport" />'+
						'</td>'+
						'<td class="tgrove_searchbox" width="180">'+
							'<select name=state id="state" size=1 class="tgrove_content-sm">'+
								'<option value=""></option>'+
								'<option value="AK">AK - Alaska </option>'+
								'<option value="AL">AL - Alabama </option>'+
								'<option value="AR">AR - Arkansas </option>'+
								'<option value="AZ">AZ - Arizona </option>'+
								'<option value="CA">CA - California</option>'+
								'<option value="CO">CO - Colorado</option>'+
								'<option value="CT">CT - Connecticut</option>'+
								'<option value="DC">DC - District of Columbia</option>'+
								'<option value="DE">DE - Delaware</option>'+
								'<option value="FL">FL - Florida</option>'+
								'<option value="GA">GA - Georgia</option>'+
								'<option value="HI">HI - Hawaii</option>'+
								'<option value="IA">IA - Iowa</option>'+
								'<option value="ID">ID - Idaho</option>'+
								'<option value="IL">IL - Illinois</option>'+
								'<option value="IN">IN - Indiana</option>'+
								'<option value="KS">KS - Kansas</option>'+
								'<option value="KY">KY - Kentucky</option>'+
								'<option value="LA">LA - Louisiana</option>'+
								'<option value="MA">MA - Massachusetts</option>'+
								'<option value="MD">MD - Maryland</option>'+
								'<option value="ME">ME - Maine</option>'+
								'<option value="MI">MI - Michigan</option>'+
								'<option value="MN">MN - Minnesota</option>'+
								'<option value="MO">MO - Missouri</option>'+
								'<option value="MS">MS - Mississippi</option>'+
								'<option value="MT">MT - Montana</option>'+
								'<option value="NC">NC - North Carolina</option>'+
								'<option value="ND">ND - North Dakota</option>'+
								'<option value="NE">NE - Nebraska</option>'+
								'<option value="NH">NH - New Hampshire</option>'+
								'<option value="NJ">NJ - New Jersey</option>'+
								'<option value="NM">NM - New Mexico</option>'+
								'<option value="NV">NV - Nevada</option>'+
								'<option value="NY">NY - New York</option>'+
								'<option value="OH">OH - Ohio</option>'+
								'<option value="OK">OK - Oklahoma</option>'+
								'<option value="OR">OR - Oregon</option>'+
								'<option value="PA">PA - Pennsylvania</option>'+
								'<option value="RI">RI - Rhode Island</option>'+
								'<option value="SC">SC - South Carolina</option>'+
								'<option value="SD">SD - South Dakota</option>'+
								'<option value="TN">TN - Tennessee</option>'+
								'<option value="TX">TX - Texas</option>'+
								'<option value="UT">UT - Utah</option>'+
								'<option value="VA">VA - Virginia</option>'+
								'<option value="VT">VT - Vermont</option>'+
								'<option value="WA">WA - Washington</option>'+
								'<option value="WI">WI - Wisconsin</option>'+
								'<option value="WV">WV - West Virginia</option>'+
								'<option value="WY">WY - Wyoming</option>'+
								'<option value=" ">-------------</option>'+
								'<option value="AB">AB - Alberta</option>'+
								'<option value="BC">BC - British Columbia</option>'+
								'<option value="MB">MB - Manitoba</option>'+
								'<option value="NB">NB - New Brunswick</option>'+
								'<option value="NF">NF - Newfoundland</option>'+
								'<option value="NS">NS - Nova Scotia</option>'+
								'<option value="NT">NT - North West Territories</option>'+
								'<option value="ON">ON - Ontario</option>'+
								'<option value="PE">PE - Prince Edward Island</option>'+
								'<option value="QC">QC - Quebec</option>'+
								'<option value="SK">SK - Saskatchewan</option>'+
								'<option value="YT">YT - Yukon</option>'+
							'</select>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td class="tgrove_searchbox">Check-In:</td>'+
						'<td class="tgrove_searchbox">Check-Out:</td>'+
					'</tr>'+
						'<td class="tgrove_searchbox">'+
							'<select class=tgrove_content-fxd-sm name="ckin_month" size=1>');
								populate_select_months(date1);
document.write('			</select>'+
							'<select class=tgrove_content-fxd-sm name="ckin_day" size=1>');
							    populate_select_days(date1)
document.write('			</select>'+
							'<select class=tgrove_content-fxd-sm name="ckin_year" size=1>');
								populate_select_years(date1)
document.write('			</select>'+
						'</td>'+
						'<td class="tgrove_searchbox">'+
							'<select class=tgrove_content-fxd-sm name="ckout_month" size=1>');
								populate_select_months(date2);
document.write('			</select>'+
							'<select class=tgrove_content-fxd-sm name="ckout_day" size=1>');
								populate_select_days(date2);
document.write('			</select>'+
							'<select class=tgrove_content-fxd-sm name="ckout_year" size=1>');
								populate_select_years(date2);
document.write('			</select>'+
						'</td>'+
					'</tr>'+
					'<tr align="left">'+
						'<td colspan="2" valign="bottom">'+
							'<table class="w353" width="353" border="0" cellspacing="0" cellpadding="0">'+
								'<tr>'+
									'<td width="80" class="tgrove_searchbox">Adults:</td>'+
									'<td width="80" class="tgrove_searchbox">Rooms:</td>'+
									'<td width="90" class="tgrove_searchbox">Children:</td>'+
									'<td align="left" valign="bottom" class="tgrove_searchbox">&nbsp;</td>'+
								'</tr>'+
								'<tr>'+
									'<td width="80" class="tgrove_searchbox">'+
										'<select name="pax_cnt" size="1" class="tgrove_content-sm">'+
											'<option selected="selected">1</option>'+
											'<option>2</option>'+
											'<option>3</option>'+
											'<option>4</option>'+
										'</select>'+
									'</td>'+
									'<td width="80" class="tgrove_searchbox">'+
										'<select name="no_room" size="1" class="tgrove_content-sm">'+
											'<option selected="selected">1</option>'+
											'<option>2</option>'+
											'<option>3</option>'+
											'<option>4</option>'+
										'</select>'+
									'</td>'+
									'<td width="90" class="tgrove_searchbox">'+
										'<select name="no_child" size="1" class="tgrove_content-sm">'+
											'<option selected="selected">0</option>'+
											'<option>1</option>'+
											'<option>2</option>'+
											'<option>3</option>'+
											'<option>4</option>'+
										'</select>'+
									'</td>'+
									'<td width="110" align="left" valign="bottom" class="tgrove_searchbox">'+
										'<input name="search2" type="image" src="http://www.travelgrove.com/images/global/travel_search.gif"/>'+
									'</td>'+
								'</tr>'+
							'</table>'+
						'</td>'+
					'</tr>'+
				'</table>'+
				'<table class="w350" width="350" height="38" border="0"  cellpadding="0" cellspacing="0">'+
					'<tr>'+
						'<td>'+
						'<img src="http://www.travelgrove.com/images/frame/separator.gif" width="340" height="3" alt="airline tickets" style="padding:20px 0px 0px;background:none;border:none;margin:0" />'+
						'</td>'+
				  	'</tr>'+
				'</table>'+
			'</form>'+
		'</div>');

document.write(		
		'<!-- Car Rental -->'+
		'<div id="car_div" style="display:none;padding-top: 10px; padding-left: 10px" class="tgrove_div_search">'+
			'<form action="http://www.travelgrove.com/cgi-bin/cars/carsearch.cgi" method="post" name="cbCarOnlyForm" target="_blank" id="cbCarOnlyForm" style="margin: 0px 0px;">'+
				'<input type="hidden" name="idReferral" value="'+idReferral+'" />'+
				stype+
				'<table class="content_search" border="0" align="center" cellpadding="0" cellspacing="0" title="car" height="120">'+
					'<tr>'+
						'<td class="tgrove_searchbox" width="175">Pick-up City or Airport:<br /></td>'+
						'<td class="tgrove_searchbox" width="175">Drop-off City or Airport:<br /></td>'+
					'</tr>'+
					'<tr>'+
						'<td class="tgrove_searchbox">'+
							'<input type="text" name="where" maxlength=36 size=23 class="tgrove_content-sm" />'+
						'</td>'+
						'<td class="tgrove_searchbox">'+
							'<input type="text" name="cr_drp_off_cty_name" maxlength=36 size=23 class="tgrove_content-sm" value="" />'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td class="tgrove_searchbox">Pick-up:</td>'+
						'<td class="tgrove_searchbox">Drop-Off:</td>'+
					'</tr>'+
					'<tr>'+
						'<td class="tgrove_searchbox">'+
							'<select class="tgrove_content-sm" name="month1" size="1" onchange="setFormElementValue(returnMonth,1,leaveMonth.selectedIndex);onChange=moveMonths(this);" >');
								populate_select_months(date1);
document.write('			</select>'+
							'<select class="tgrove_content-sm" name="day1" size="1" onchange="AdvanceToXDays(leaveMonth,returnMonth,inp_dep_dt_dy_1,inp_ret_dep_dt_dy,7);" >');
								populate_select_days(date1);
document.write('			</select>'+
							'<select class="tgrove_content-sm" name="year1" size="1" onchange="AdvanceToXDays(leaveMonth,returnMonth,inp_dep_dt_dy_1,inp_ret_dep_dt_dy,7);" >');
								populate_select_years(date1);
document.write('			</select>'+
						'</td>'+
						'<td class="tgrove_searchbox">'+
							'<select class="tgrove_content-sm" name="month2" size="1" onchange="setFormElementValue(returnMonth,1,leaveMonth.selectedIndex);onChange=moveMonths(this);" >');
								populate_select_months(date2);
document.write('			</select>'+
							'<select class="tgrove_content-sm" name="day2" size="1" onchange="AdvanceToXDays(leaveMonth,returnMonth,inp_dep_dt_dy_1,inp_ret_dep_dt_dy,7);" >');
								populate_select_days(date2);
document.write('			</select>'+
							'<select class="tgrove_content-sm" name="year2" size="1" onchange="AdvanceToXDays(leaveMonth,returnMonth,inp_dep_dt_dy_1,inp_ret_dep_dt_dy,7);" >');
								populate_select_years(date2);
document.write('			</select>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td class="tgrove_searchbox"></td>'+
						'<td align="left" class="searchbox" height="38" valign="bottom">'+
							'<div style="position:relative; left:59px; top: 0px;">'+
								'<input name="image4" type="image" src="http://www.travelgrove.com/images/global/travel_search.gif" alt="Search Now" border="0" />'+
							'</div>'+
						'</td>'+
					'</tr>'+
				'</table>'+
				'<table class="w350" width="350" height="38" border="0"  cellpadding="0" cellspacing="0">'+
					'<tr>'+
						'<td>'+
						'<img src="http://www.travelgrove.com/images/frame/separator.gif" width="340" height="3" alt="airline tickets" style="padding:20px 0px 0px;background:none;border:none;margin:0" />'+
						'</td>'+
				  	'</tr>'+
				'</table>'+
			'</form>'+
		'</div>'+
	'</div>');


