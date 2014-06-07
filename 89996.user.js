// JavaScript Document
// ==UserScript==
// @name          Universal Gregorian2Jalali Date Converter
// @namespace     http://www.ece.ut.ac.ir/dbrg
// @description	  Finding all gregorian date in all webpages (including sharepoint 2003 and 2007 portals) and convert them to jalali date !
// @author        Rahman AliMohammadzadeh- r.mohammadzadeh@ece.ut.ac.ir
// @homepage      http://ece.ut.ac.ir/dbrg/fa/dmining/xmldm.htm
// @include       *  
// ==/UserScript==



var $;
var JQdefined = false;
// Add jQuery
(function () {
       
	if (typeof unsafeWindow.jQuery == 'undefined') {
    
		CreateScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
	} else JQdefined = true;

	
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {

    if (!JQdefined && typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 500);
	} else {
		if (!JQdefined) $ = unsafeWindow.jQuery.noConflict(true); else $ = unsafeWindow.jQuery;
		//InitDatePickerScript();
	
        DoConvertProcess();
	}
}

function CreateScript(src) {
	var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
	
	GM_JQ = document.createElement('script');

	GM_JQ.src = src;
	GM_JQ.type = 'text/javascript';
	GM_JQ.async = true;

	GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}


 function addStyle( css ) {
	  var style = document.createElement( 'style' );
	  style.type = 'text/css';
	  var head = document.getElementsByTagName('head')[0] || document.documentElement;
	  head.appendChild( style );
	  if( style.styleSheet )  // IE
		 style.styleSheet.cssText = css;
	  else  // other browsers
		 style.appendChild( document.createTextNode(css) );
	  return style;
   }


function SetDatePickerToInputs(){
   // $("input").calendarsPicker();
//	$("input").calendarsPicker({calendar: $.calendars.instance('Thai')});
}

function InitDatePickerScript() {
//	CreateScript('http://keith-wood.name/js/jquery.calendars.js');
//	CreateScript('http://keith-wood.name/js/jquery.calendars.plus.js');
//	addStyle('@import "http://keith-wood.name/css/jquery.calendars.picker.css";');
//	CreateScript('http://keith-wood.name/js/jquery.calendars.picker.js');
//	CreateScript('http://keith-wood.name/js/jquery.calendars-fa.js');
//	CreateScript('http://keith-wood.name/js/jquery.calendars.picker-fa.js');
//	CreateScript('http://keith-wood.name/js/jquery.calendars.persian.js');
}

function validateUSDate(strValue) {
	var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/

	//check to see if in correct format
	if (!objRegExp.test(strValue))
		return false; //doesn't match pattern, bad date
	else {
		var strSeparator = strValue.substring(2, 3)
		var arrayDate = strValue.split(strSeparator);
		//create a lookup for months not equal to Feb.
		var arrayLookup = { '01': 31, '03': 31,
			'04': 30, '05': 31,
			'06': 30, '07': 31,
			'08': 31, '09': 30,
			'10': 31, '11': 30, '12': 31
		}
		var intDay = parseInt(arrayDate[1], 10);

		//check if month value and day value agree
		if (arrayLookup[arrayDate[0]] != null) {
			if (intDay <= arrayLookup[arrayDate[0]] && intDay != 0)
				return true; //found in lookup table, good date
		}

		//check for February (bugfix 20050322)
		//bugfix  for parseInt kevin
		//bugfix  biss year  O.Jp Voutat
		var intMonth = parseInt(arrayDate[0], 10);
		if (intMonth == 2) {
			var intYear = parseInt(arrayDate[2]);
			if (intDay > 0 && intDay < 29) {
				return true;
			}
			else if (intDay == 29) {
				if ((intYear % 4 == 0) && (intYear % 100 != 0) ||
			 (intYear % 400 == 0)) {
					// year div by 4 and ((not div by 100) or div by 400) ->ok
					return true;
				}
			}
		}
	}
	return false; //any other values, bad date
}



function ConvertJDateObjToG(aDateStr) {
	var parts = aDateStr.split("/");
	if (parts[0].length != 4 || parts[1].length != 2 || parts[2].length != 2) return aDateStr;
	if (parseInt(parts[0]*1) > 1900) return aDateStr;
	return JTG(parts[0],parts[1],parts[2], 'a');
}



function ConvertGDateObjToJalali(aDateStr) {		
	var ocd = new Date(aDateStr);		
	if (!ocd.getFullYear()) return aDateStr;
	//alert(ocd.getMonth());
	var jd = GTJ(ocd.getFullYear(), (ocd.getMonth() + 1), ocd.getDate(), 'a');	
	return jd;
}

//void jalali_to_gregorian(
function JTG(
	j_y,
	j_m,
	j_d,
	choice) {
	var g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
	var j_month_name = new Array("", "Farvardin", "Ordibehesht", "Khordad", "Tir",
						  "Mordad", "Shahrivar", "Mehr", "Aban", "Azar",
						  "Dey", "Bahman", "Esfand");

	var gy, gm, gd;
	var jy, jm, jd;
	var g_day_no, j_day_no;
	var leap;

	var i;

	jy = j_y - 979;
	jm = j_m - 1;
	jd = j_d - 1;

	j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);
	for (i = 0; i < jm; ++i)
		j_day_no += j_days_in_month[i];

	j_day_no += jd;

	g_day_no = j_day_no + 79;

	gy = 1600 + 400 * Math.floor((g_day_no) / (146097)); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
	g_day_no = g_day_no % 146097;

	leap = 1;
	if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
	{
		g_day_no--;
		gy += 100 * Math.floor((g_day_no) / (36524)); /* 36524 = 365*100 + 100/4 - 100/100 */
		g_day_no = g_day_no % 36524;

		if (g_day_no >= 365)
			g_day_no++;
		else
			leap = 0;
	}

	gy += 4 * Math.floor((g_day_no) / (1461)); /* 1461 = 365*4 + 4/4 */
	g_day_no %= 1461;

	if (g_day_no >= 366) {
		leap = 0;

		g_day_no--;
		gy += Math.floor((g_day_no) / (365));
		g_day_no = g_day_no % 365;
	}

	for (i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap); i++)
		g_day_no -= g_days_in_month[i] + (i == 1 && leap);
	gm = i + 1;
	gd = g_day_no + 1;

	var strgm = new String(gm);
	var strgd = new String(gd);

	if (gm < 10)
		strgm = "0" + gm;
	if (gd < 10)
		strgd = "0" + gd;

	if (choice == 'y' || choice == 'Y')
		return String(gy);
	else if (choice == 'm' || choice == 'M')
		return strgm;
	else if (choice == 'd' || choice == 'D')
		return strgd;
	else
		return String(gy) + '/' + strgm + '/' + strgd;

}


//function gregorian_to_jalali
function GTJ(
	g_y,
	g_m,
	g_d,
	choice
	) {
	var g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
	var j_month_name = new Array("", "Farvardin", "Ordibehesht", "Khordad", "Tir",
						  "Mordad", "Shahrivar", "Mehr", "Aban", "Azar",
						  "Dey", "Bahman", "Esfand");

	var gy, gm, gd;
	var jy, jm, jd;
	var g_day_no, j_day_no;
	var j_np;

	var i;
	gy = g_y - 1600;
	gm = g_m - 1;
	gd = g_d - 1;

	g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
	for (i = 0; i < gm; ++i)
		g_day_no += g_days_in_month[i];
	if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
	/* leap and after Feb */
		++g_day_no;
	g_day_no += gd;

	j_day_no = g_day_no - 79;

	j_np = Math.floor(j_day_no / 12053);
	j_day_no %= 12053;

	jy = 979 + 33 * j_np + 4 * Math.floor((j_day_no / 1461));
	j_day_no %= 1461;

	if (j_day_no >= 366) {
		jy += Math.floor((j_day_no - 1) / 365);
		j_day_no = (j_day_no - 1) % 365;
	}

	for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
		j_day_no -= j_days_in_month[i];
	}
	jm = i + 1;
	jd = j_day_no + 1;

	var strjm = new String(jm);
	var strjd = new String(jd);

	if (jm < 10)
		strjm = "0" + jm;
	if (jd < 10)
		strjd = "0" + jd;

	if (choice == 'y' || choice == 'Y')
		return String(jy);
	else if (choice == 'm' || choice == 'M')
		return strjm;
	else if (choice == 'd' || choice == 'D')
		return strjd;
	else
		return  String(jy) + '/' + strjm + '/' +  strjd;
	
}



var jMonth=new Array(12);
jMonth["Jan"]="دی";
jMonth["Feb"]="بهمن";
jMonth["Mar"]="اسفند";
jMonth["Apr"]="فروردین";
jMonth["May"]="اردیبهشت";
jMonth["Jun"]="خرداد";
jMonth["Jul"]="تیر";
jMonth["Aug"]="مرداد";
jMonth["Sep"]="شهریور";
jMonth["Oct"]="مهر";
jMonth["Nov"]="آبان";
jMonth["Dec"]="آذر";

function ConvertSharePoint2010Date() {
	
		
}

function ConvertSharePointDate(){
        alert('test');
	var firstcd=true;
	$("a").filter(function () {
		if (this.getAttribute("href") && this.getAttribute("href").indexOf("javascript:MoveToViewDate('") > -1
			&& this.getAttribute("href").indexOf(",'Day'") > -1
			) {

			var oc = this.getAttribute("href");
			oc = oc.substring(27, oc.indexOf(",'Day'") - 1);

			var ocd = new Date(oc.replace("\\u002f", "/").replace("\\u002f", "/"));
			jd = GTJ(ocd.getFullYear(), (ocd.getMonth() + 1), ocd.getDate(), 'a');			
			this.title = jd;

			if (firstcd || (jd[8] == "0" && jd[9] == "1")) {
				this.innerHTML = "<nobr>" + jd + "</nobr><br>";
				firstcd = false;
			} else {
				this.innerHTML = "<nobr>" + jd[8] + jd[9] + "</nobr>";
			}
		} else if (this.getAttribute("href") &&
			this.getAttribute("href").indexOf("javascript:ClickDay") > -1) {			 	
			var jmv = jMonth[this.innerHTML];			
			//alert(this.innerHTML);
			//var jmv = jMonth["Jan"];			
			if (jmv != null)
				this.innerHTML = jmv;
			else if (this.getAttribute("href").indexOf("u002f") > -1) {
				var hr = new String(this.getAttribute("href"));
				hr = hr.replace("javascript:ClickDay('", "");
				hr = hr.replace("\\u002f", "/");
				hr = hr.replace("\\u002f", "/");
				hr = hr.replace("')", "");
				var ocd = new Date(hr);
				jd = GTJ(ocd.getFullYear(), (ocd.getMonth() + 1), ocd.getDate(), 'a');
				this.title = jd;				
			}
		}
	});

$("div[class=ms-picker-body] a").filter(function () {
	var gd = this.href.replace("javascript:MoveToViewDate('", "").replace("',%20null);", "").replace("\\u002f", "/").replace("\\u002f", "/").replace("javascript:MoveToDate('","").replace("');","");
	this.title = ConvertGDateObjToJalali(gd);
});

$("div[class=ms-picker-header]").filter(function () {

    var JalaliMonthName = $("table[class=ms-picker-table] td[class=ms-picker-monthcenter] a").html();
    var JalaliYear = $("table[class=ms-picker-table] td[class=ms-picker-footer] div a").html();
    JalaliYear = ConvertGDateObjToJalali(JalaliYear).substr(0, 4).substr(2, 2);
    SearchAndReplaceGDates(this);	
    //if (JalaliMonthName)
	 $(this).html($(this).html() + " " + JalaliMonthName + " " + JalaliYear);	
});


$("nobr").filter(function () {
    SearchAndReplaceGDates(this);   
});


}




function DoConvertProcess() {

    $(document).ready(function () {

      
        //SetDatePickerToInputs();
        //SearchAndReplaceGDates(document);

        //try to convet gregorian calendar to jalali calendar in sharepoint sites!

        var mt = $('meta[name=GENERATOR]');
        var grouped = false;
        var sharepoint = false;
        if (mt.length && mt.attr("content").toLowerCase().indexOf("sharepoint") > -1) {
            
            sharepoint = true;
            ConvertSharePointDate();
            ConvertSharePoint2010Date();
            if (document.getElementById("tbod1-1__")) grouped = true;
            MapInputEvents();
        } else {
            SearchAndReplaceGDates(document.body);
        }


        if (sharepoint && grouped) {
            document.addEventListener('DOMSubtreeModified', doc_modified, false);
        }






    });


	
}





String.prototype.trim = function () {
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
}


function AddToArray(marr,m,pattern){
  var m=s.match(pattern);
   if (m) 
		for(var mi=0;mi<m.length;mi++)
			marr.push(m[mi]);     
}


function SearchAndReplaceGDates(ObjectToSearch){

var DatePatterns=new Array(
				/\d+(\-|\/|\.)\d+(\-|\/|\.)\d+/g,
				/\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/,   /* validateUSDate  Ex. mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy */
				/\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/,
				/\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
				///^(([0-9])|([0-2][0-9])|([3][0-1]))\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}$/,
				///^((31(?!\ (Feb(ruary)?|Apr(il)?|June?|(Sep(?=\b|t)t?|Nov)(ember)?)))|((30|29)(?!\ Feb(ruary)?))|(29(?=\ Feb(ruary)?\ (((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))|(0?[1-9])|1\d|2[0-8])\ (Jan(uary)?|Feb(ruary)?|Ma(r(ch)?|y)|Apr(il)?|Ju((ly?)|(ne?))|Aug(ust)?|Oct(ober)?|(Sep(?=\b|t)t?|Nov|Dec)(ember)?)\ ((1[6-9]|[2-9]\d)\d{2})$/g,
				/\d{1,2}\s(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s(19|20)\d{2}/g,
				/(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s\d{1,2}\,\s?(19|20)\d{2}/g,
			   /(Sat|Thu|Wed|Tue|Mon|Sun|Fri)\,\s\d{1,2}\/\d{1,2}\/\d{2}/g,
			   /(Sat|Thu|Wed|Tue|Mon|Sun|Fri)\s\d{1,2}\/\d{1,2}\,/g    
			   );

DatePatterns.push();
textnodes = document.evaluate("//text()", ObjectToSearch, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var HasDayName=false;

for (var i = 0; i < textnodes.snapshotLength; i++)
{
	node = textnodes.snapshotItem(i);
    
	if (node.data.trim()){	
		s=node.data;
		var changed=false;
		var  marr=new Array();

		if (document.URL.indexOf("mail.yahoo")>-1){
			if (document.URL.indexOf("/dc/launch")>-1)  //yahoo new mail
				 AddToArray(marr,m,DatePatterns[7]);   
			else     {AddToArray(marr,m,DatePatterns[6]);    AddToArray(marr,m,DatePatterns[5]); 
			}
		} else  {

		AddToArray(marr,m,DatePatterns[0]);   
		AddToArray(marr,m,DatePatterns[4]);   
		AddToArray(marr,m,DatePatterns[5]);           
	  }

		for (var j = 0; j < marr.length; j++) 
			if (marr[j]) {
			 
				var sDate=marr[j];
				var pn=0;
				
				if (DatePatterns[1].test(sDate)) pn=1; //mm-dd-yyyy
				else if  (DatePatterns[2].test(sDate)) pn=2; // mm-yyyy-dd
				else if  (DatePatterns[3].test(sDate)) pn=3; // yyyy-mm-dd
				else if  (DatePatterns[4].test(sDate)) pn=4; // yyyy-mm-dd
				else if  (DatePatterns[5].test(sDate)) pn=5; // yyyy-mm-dd
				else if  (DatePatterns[6].test(sDate)) pn=6; // yyyy-mm-dd
				else if  (DatePatterns[7].test(sDate)) pn=7; // yyyy-mm-dd

			    //GM_log(sDate);
				
				if (pn!=0){
					if (RegExp.$1){
						var parts = sDate.split(RegExp.$1);
						if (pn<4 && parts.length!=3) continue;
					}
                    
					//if (pn==1) if (!validateUSDate(sDate)) continue;
					

					var m=0,d=0,y=0;
					switch (pn) {
						case 1:m=parts[0];d=parts[1];y=parts[2];break;
						case 2:m=parts[0];d=parts[2];y=parts[1];break;
						case 3:m=parts[1];d=parts[2];y=parts[0];break;
						case 4:case 5:
						 var gd=new Date(sDate); 
						if (gd.getFullYear()) {y=gd.getFullYear();m=gd.getMonth()+1;d=gd.getDate();} 
						break;
				   
					   case 6:HasDayName=true;var tmpDate=sDate.substr(5).split("/"); m=tmpDate[0];d=tmpDate[1];y=2000+parseInt(tmpDate[2]); break;

					   case 7: HasDayName=true; 
					   var tmpDate=sDate.substr(4).replace(",","").split("/");
					   y=2010;
					   m=tmpDate[0];
					   d=tmpDate[1];
						break;
					}

					if (y<1900) continue;
					
			  
					//alert(pn+" "+m+" "+d+" "+y);
					if (m!=0 && d!=0 && y!=0){
						s=s.replace(sDate,GTJ(y,m,d,'a'));
						changed=true;
					}
				}
			}
		if (changed){
			node.data = s;
            //GM_log(s);
        }
	}
	
}



}




 //msgPane_i0_1 mainTableView
function doc_modified(event) {
		
   
		var tagName = event.target.tagName.toLowerCase();
		//GM_log(tagName); 

//		if (tagName=="td" ) SearchAndReplaceGDates(event.target);
		if (tagName=="table" ) SearchAndReplaceGDates(event.target);

	  
//		if (tagName=="div" && event.target.id){ 
//			if (event.target.id=="rightContainer") SearchAndReplaceGDates(event.target); //yahoo classic mail.
//		}

	}


	function IsValidDate(aDateStr) {
	    var s = aDateStr.split('/');
	    //if (s.length != 3) return false;
	    //if (s[0].length != 4) return false;

	    if (parseInt(s[0]) == NaN || parseInt(s[1]) == NaN || parseInt(s[2]) == NaN) return false;

	    if (parseInt(s[0]*1) < 1900 || parseInt(s[0]*1) > 2049) return false;
	    if (parseInt(s[1]*1) < 1 || parseInt(s[1]*1) > 12) return false;

	    if (parseInt(s[2]*1) < 1 || parseInt(s[2]*1) > 31) return false;

	    return true;
	}


	function IsDateInputBox(inp) {
		var a = inp.getAttribute("AutoDateConversion");
		if (a) return (a == "1");
		if (inp.value) {
			if (IsValidDate(inp.value))
			{ inp.setAttribute("AutoDateConversion", "1"); return true; }
			else {
				inp.setAttribute("AutoDateConversion", "0");
				return false;
			}
		} else return false;
	}


	function fin(inp) {

if (IsDateInputBox(inp)) {
			inp.value = ConvertGDateObjToJalali(inp.value);
		}
	}

	function fout(inp) {
		if (IsDateInputBox(inp))  inp.value = ConvertJDateObjToG(inp.value);
	}

	function MapInputEvents() {
		$("input[type=text]").focusin(function () { fin(this); });
		$("input[type=text]").focusout(function () { fout(this); });
	}