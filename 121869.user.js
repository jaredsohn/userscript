// ==UserScript==
// @name NeoBuxOx
// @description This scripts adds helpful information in referral listings. Designed to be fast, clean and light.
// @namespace http://userscripts.org/users/319715
// @author Proxen
// @include http://www.neobux.com/c/rl/*
// @include http://www.neobux.com/c/rs/*
// @include http://www.neobux.com/c/
// @license GNU General Public License v3.0
// @version 2.6
// ==/UserScript==

// Changelog
//version 0.0.1 (beta) released on the 2nd of August 2011
//version 0.0.2 (beta) released on the 3rd of Autust 2011
// - Reduced the length of the information of the last row (referrals page)
// - Removed ; that appear in the information of the last row (referrals page)
// - Modified the content of the cookie to add the amount of direct and rented referrals
// - Modified the path of the cookie to "/" so it works in statistics page
// - Added the statistics page to the valid pages
// - Added the column with information in the statistics page
// - Added the memberhip cost to the profit column
//version 0.0.3 (beta) released on the 3rd of August 2011
// - Fixed a problem with the profit column due to the membership cost.
//version 0.0.4 (beta) released on the 4th of August 2011
// - Fixed a problem with old/malformed cookie
//version 0.0.5 (beta) released on the 5th of August 2011
// - Added the script version in the statistics page
// - Added a link to the script home page at userscripts
// - Added a way to reset the script options
// - Added an experimental option to correct the number of referrals in the statistics page
// - Added an extra decimal to the information of the statistics page
//version 0.0.6 (beta) released on the 5th of August 2011
// - Fixed the end of line after the version of the script in the statistics page
//version 1 (stable) released on the 6th of August 2011
// - Fixed the order of the version of the script
// - Added the profit after deduct the cost of referrals and membership
// - Fixed the layout when possible
// - Reduced the width of columns in referrals pages
//version 1.5 (stable) released on the 13 of August 2011
// - Fixed the direct listing problem where only odd referrals were processed
// - Added an options panel
// - Added the global profit for each referral in the rented referrals listing
// - Renewing days can be changed from the options panel now
// - Show/Hide the global profit can be changed from the options panel now
// - Added to the bottom of the rented referrals listing the minimum average needed to earn money
//version 1.5.1 (stable) released on the 15th of November 2011
// - Fixed problems related to modifications in NeoBux's page.
//version 2.0 (stable) released on the 16th of November 2011
// - Fixed the direct referrals data in the statistics page
// - Added support for the account summary page
// - Added the time, with beautiful format, since the sign up
// - Added the total amount of referrals
// - Added the total amount of viewed advertisements
// - Added the daily average of advertisements viewed since the sign up
// - Added the amount of advertisements credited in the last 10 days
// - Added the daily average of advertisements credited in the last 10 days
// - Added the amount of advertisements credited by direct referrals in the last 10 days (if shown)
// - Added the amount of advertisements credited by rented referrals in the last 10 days (if shown)
//version 2.1 (stable) released on the 16th of November 2011
// - Fixed problems related to modifications in NeoBux's page.
//version 2.2 (stable) released on the 16th of November 2011
// - Fixed problems related to modifications in NeoBux's page.
// - Fixed bug in summary account page when then user doesn't have referrals.
//version 2.3 (stable) released on the 16th of November 2011
// - Fixed problems related to modifications in NeoBux's page.
//version 2.4 (stable) released on the 20th of November 2011
// - Fixed problems related to modifications in NeoBux's page.
// - Improved layout. Now, it has the same style as NeoBux.
//version 2.5 (stable) released on the 23rd of November 2011
// - Fixed problems related to modifications in NeoBux's page.
// - Added support for all languages supported by NeoBux.
//version 2.6 (stable) released on the 24th of November 2011
// - Fixed problems related to modifications in NeoBux's page.

var nbo_version = "2.6";
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////Functions///////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/**
 *  Return array(3) with days,hours and minutes since the referral is in the account
 *  Arguments:
 *  string data - Text obtained from NeoBux
 *  Date today
 */
function referralSinceDays(data,today)
{
    //si es una fecha relativa se trabaja de otra manera (bigpetroman)
	if(data.indexOf("/") == -1)
    {
		var referralSince = new Date();
		data = data.replace("&nbsp;","");
		data = data.replace(/[^0-9]/g, '');
		//Obtain date
		if(data.substring(0,data.length-4) == 0)
		{
			referralSince.setFullYear(today.getFullYear(),today.getMonth(),today.getDate());
		}
		else if(data.substring(0,data.length-4) == 1)
		{
			referralSince.setFullYear(today.getFullYear(),today.getMonth(),(today.getDate()-1));
		}
		else
		{
			var referralSince = new Date();
			var milisegundos = parseInt(data.substring(0,data.length-4)*24*60*60*1000);//pasando los dias a milisegundos
			milisegundos = milisegundos + parseInt(data.substring(data.length-4,data.length-2)*60*60*1000);//pasando las horas a milisegundos
			milisegundos = milisegundos + parseInt(data.substring(data.length-2)*60*1000);//pasando los minutos a milisegundos
			var tiempo = referralSince.getTime(); //obtenemos el valor en milisegundos de la fecha actual.
			//le restamos los días
			var total = referralSince.setTime(parseInt(tiempo - milisegundos)); //restamos el día a la fecha
		}
		
		//Obtain time
		//Substracting full dates
		diferencia = today.getTime() - referralSince.getTime();
			
		if(diferencia < 0) return new Array(0,0,0); //Avoid difference hour (neobux and pc)
			
		totalDays = Math.floor(diferencia / (1000 * 60 * 60 * 24));
		diferencia = diferencia % (1000 * 60 * 60 * 24);
		totalHours = Math.floor(diferencia / (1000 * 60 * 60));
		diferencia = diferencia % (1000 * 60 * 60);
		totalMinutes = Math.floor(diferencia / (1000 * 60));

		//Leading zeros
		if(totalHours < 10) totalHours = "0" + totalHours;
		if(totalMinutes < 10) totalMinutes = "0" + totalMinutes;

		return new Array(totalDays,totalHours,totalMinutes,-1);
    }
    else
    {
        //Split Date and time
		datatime = data.split(":");
		data = data.split(" ");
		
		var referralSince = new Date();
		
		//Obtain date
		if(data.indexOf(nbo_isToday) != -1)
		{
			referralSince.setFullYear(today.getFullYear(),today.getMonth(),today.getDate());
		}
		else if(data.indexOf(nbo_isYesterday) != -1)
		{
			referralSince.setFullYear(today.getFullYear(),today.getMonth(),(today.getDate()-1));
		}
		else
		{
			data_temp = data[0].split("/");
			
			referralSince.setFullYear(data_temp[0],(data_temp[1]-1),data_temp[2]);
		}
		
		
		//Obtain time
		data = data[1].split(":");
		referralSince.setHours(datatime[0].substring(datatime[0].length-2));
		referralSince.setMinutes(datatime[1].replace("&nbsp;",""));
		//alert(referralSince);
		//Substracting full dates
		diferencia = today.getTime() - referralSince.getTime();
		
		if(diferencia < 0) return new Array(0,0,0,1); //Avoid difference hour (neobux and pc)
		
		totalDays = Math.floor(diferencia / (1000 * 60 * 60 * 24));
		diferencia = diferencia % (1000 * 60 * 60 * 24);
		totalHours = Math.floor(diferencia / (1000 * 60 * 60));
		diferencia = diferencia % (1000 * 60 * 60);
		totalMinutes = Math.floor(diferencia / (1000 * 60));

		//Leading zeros
		if(totalHours < 10) totalHours = "0" + totalHours;
		if(totalMinutes < 10) totalMinutes = "0" + totalMinutes;

		return new Array(totalDays,totalHours,totalMinutes,1);
    }
}

/**
 *  Return days since the last click
 *  Returns -1 if no clicks
 *  Arguments:
 *  String data - Text obtained from NeoBux
 *  Date today
 */
function lastClickDays(data,today)
{
    //alert(data);
	//If no clicks stop processing and return -1
    if(data.indexOf(nbo_noClick) != -1) return new Array(-1,-1);    
    
	var lastClick = new Date();
	
	//Obtain date
	if(data.indexOf(nbo_isToday) != -1)
	{
		return new Array(0,1);
	}
	else if(data.indexOf(nbo_isYesterday) != -1)
	{
		return new Array(1,1);
	}
	else
	{
		if(data.indexOf("/") == -1)
		{
			data = data.replace("&nbsp;","");
			data = data.replace(/[^0-9]/g, '');
			//Obtain date
			var milisegundos = parseInt(data*24*60*60*1000);//pasando los dias a milisegundos
			var tiempo = lastClick.getTime(); //obtenemos el valor en milisegundos de la fecha actual.
			//le restamos los días
			var total = lastClick.setTime(parseInt(tiempo - milisegundos)); //restamos el día a la fecha
			
			//Set hours and minutes to zero
			lastClick.setHours(0);
			lastClick.setMinutes(0);

			diferencia = today.getTime() - lastClick.getTime();

			return new Array(Math.floor(diferencia / (1000 * 60 * 60 * 24)),-1);
	
		}else{
			data = data.split("/");
			lastClick.setFullYear(data[0],(data[1]-1),data[2].replace("&nbsp;",""));
			//Set hours and minutes to zero
			lastClick.setHours(0);
			lastClick.setMinutes(0);

			diferencia = today.getTime() - lastClick.getTime();

			return new Array(Math.floor(diferencia / (1000 * 60 * 60 * 24)),1);
		}
	}
}

/**
 * Return renewing cost
 * Arguments:
 * int referrals
 * int accountType
 */
function renewingCost(referrals,accountType)
{
    if(referrals <= 250)
    {
        return 0.20;
    }else if(referrals <= 500)
    {
        if(accountType < 5 || accountType == 6)
        {
            return 0.21;
        }else{
            return 0.20;
        }
    }else if(referrals <= 750)
    {
        if(accountType < 5 || accountType == 6)
        {
            return 0.22;
        }else if(accountType == 5)
        {
            return 0.21;
        }else{
            return 0.20;
        }
    }else if(referrals <= 1000)
    {
        if(accountType < 5 || accountType == 6)
        {
            return 0.23;
        }else if(accountType == 5)
        {
            return 0.22;
        } else if(accountType == 7)
        {
            return 0.21;
        } else {
            return 0.20;
        }
    }else if(referrals <= 1250)
    {
        if(accountType < 5 || accountType == 6)
        {
            return 0.24;
        }else if(accountType == 5)
        {
            return 0.23;
        } else if(accountType == 7)
        {
            return 0.22;
        } else {
            return 0.21;
        }
    }else if(referrals <= 1500)
    {
        if(accountType < 5 || accountType == 6)
        {
            return 0.25;
        }else if(accountType == 5)
        {
            return 0.24;
        } else if(accountType == 7)
        {
            return 0.23;
        } else {
            return 0.22;
        }
    }else if(referrals <= 1750)
    {
        if(accountType < 5 || accountType == 6)
        {
            return 0.26;
        }else if(accountType == 5)
        {
            return 0.25;
        } else if(accountType == 7)
        {
            return 0.24;
        } else {
            return 0.23;
        }
    }else if(referrals > 1750)
    {
        if(accountType < 5 || accountType == 6)
        {
            return 0.27;
        }else if(accountType == 5)
        {
            return 0.26;
        } else if(accountType == 7)
        {
            return 0.25;
        } else {
            return 0.24;
        }
    }
    //If error:
    return -1;
}

/**
 * Return discount when renewing.
 * Returns 0 if not found
 */
function discountObtained()
{
    switch(getCookie("nbo_data").split("-")[0])
    {
        case "1": //AutoPay
            return 15;
        break;
        case "15":
            return 0;
        break;
        case "30":
            return 5;
        break;
        case "60":
            return 10;
        break;
        case "90":
            return 18;
        break;
        case "150":
            return 25;
        break;
        case "240":
            return 30;
        break;
        default:
            return 0;
        break;
    }
}

/**
 * Return profit generated by a referral since it was obtained
 * Arguments:
 * int days - Days since the referral is in the account
 * int clicks - Clicks done
 * int rClick - Earned per click
 * float renewingCost - Cost per month of the referral
 */
function profitGenerated(days,clicks,rClick,renewingCost)
{
    var nbo_generated = clicks * rClick;
    var nbo_eachDayCosts = ( (100-discountObtained()) * renewingCost / 100 ) / 30;
    var nbo_expenses = nbo_eachDayCosts * days;
    return (nbo_generated - nbo_expenses);
}

/**
 * Create a cookie (Obtained from w3schools)
 * Arguments:
 * c_name
 * value
 * exdays
 * Cookie value: days-rentedReferrals-directReferrals
 */
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    c_value = c_value + "; path=/";
    document.cookie=c_name + "=" + c_value;
}

/**
 * Get cookie value (Obtained from w3schools)
 * Arguments:
 * c_name
 */
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
    
    return null;
}

/**
 * Check if a cookie exists and, if not, ask for data (from w3schools)
 * Return data entered
 */
function checkCookie(rented,direct)
{
    //cookie value: days-rentedReferrals-directReferrals
    var data=getCookie("nbo_data");
    
    if (data != null && data != "")
    {
        data = data.split("-");
        if(data.length == 4) //Check for malformed cookie
        {
            if(direct == -1)
            {
                setCookie("nbo_data",data[0]+"-"+rented+"-"+data[2]+"-"+data[3],365);
                return data[0];
            }else{
                setCookie("nbo_data",data[0]+"-"+data[1]+"-"+direct+"-"+data[3],365);
                return data[0];
            }
        }
    }
    
    //If arrives here no cookie o malformed cookie. Remove cookie
    var d = new Date();
    document.cookie = "nbo_data=0;expires=" + d.toGMTString() + ";" + ";";
    
    //Create a new one
    data = prompt("¿Por cuantos días renuevas generalmente?\nValores válidos:\n1 si tienes activado el AutoPago\n15, 30, 60, 90, 150 o 240","");
    if(data!=null && data!="")
    {
        if(direct == -1)
        {
            setCookie("nbo_data",data+"-"+rented+"-0-0",365);
            return data;
        }else{
            setCookie("nbo_data",data+"-0-"+direct+"-0",365);
            return data;
        }
    }else{
        if(direct == -1)
        {
            setCookie("nbo_data","15-"+rented+"-0-0",365);
            return -1;
        }else{
            setCookie("nbo_data","15-0-"+direct+"-0",365);
            return -1;
        }
    }
}

// Direct referrals chart id: ch_cd
// Rented referrals chart id: ch_cr
// Recycle chart id: ch_recycle
// Extensions chart id: ch_extensions
// AutoPay chart id: ch_autopay
/**
 * Return array with values of the chart
 */
function obtainChartValues(arg)
{
    var script = atob(arg);
    var chartId = script.split("'")[1];
    var temp = "";
    var values = new Array();
    values[0] = chartId;
    
    if(chartId == "ch_cr" || chartId == "ch_recycle" || chartId == "ch_extensions" || chartId == "ch_autopay" || chartId == "ch_cliques" || chartId == "ch_cdd")
    {
        temp = script.split("data:[")[1];
        temp = temp.substring(0,temp.indexOf(']')).split(',');
    }

    return values.concat(temp);
}

/**
 * Resize NeoBux page to fit new columns and changes
 */
function resizeEntirePage(pixels)
{
    try {
        //2 divs
        var nbo_divToResize = document.evaluate("//div[@style='width:902px;margin:0 auto;margin-left:auto;margin-right:auto;']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        nbo_divToResize.snapshotItem(0).setAttribute('style',nbo_divToResize.snapshotItem(0).getAttribute('style').replace("width:902px;","width:"+pixels+"px;"));
        nbo_divToResize.snapshotItem(1).setAttribute('style',nbo_divToResize.snapshotItem(1).getAttribute('style').replace("width:902px;","width:"+pixels+"px;"));
        
        //1 div (font-color is different)
        nbo_divToResize = document.evaluate("//div[@style='width:902px;margin:0 auto;margin-left:auto;margin-right:auto;background-color:#fff;']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        nbo_divToResize.snapshotItem(0).setAttribute('style',nbo_divToResize.snapshotItem(0).getAttribute('style').replace("width:902px;","width:"+pixels+"px;"));
        
        //Footer
        nbo_divToResize = document.evaluate("//div[@style='clear:both;background-color:#fff;border:1px solid #888;width:900px;margin-bottom:8px;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        nbo_divToResize.setAttribute('style',nbo_divToResize.getAttribute('style').replace("width:900px;","width:100%;"));
    }catch(e){}
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///////////////////////////Start of the Script//////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//Gets account type
var nbo_accountType = document.evaluate("//div[@class='mbxm sb']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
nbo_accountType = nbo_accountType.snapshotItem(nbo_accountType.snapshotLength-1).innerHTML.replace(/&nbsp;/gi,"");

//Set up account properties
var nbo_rrClick = 0;
var nbo_drClick = 0;
var nbo_membershipCost = 0;

switch(nbo_accountType)
{
    case "Standard":
        nbo_accountType = 1;
        nbo_rrClick = 0.005;
        nbo_drClick = 0.0005;
        nbo_membershipCost = 0;
    break;
    case "Pioneer":
        nbo_accountType = 2;
        nbo_rrClick = 0.005;
        nbo_drClick = 0.0005;
        nbo_membershipCost = 0;
    break;
    case "Golden":
        nbo_accountType = 3;
        nbo_rrClick = 0.01;
        nbo_drClick = 0.005;
        nbo_membershipCost = 90;
    break;
    case "Emerald":
        nbo_accountType = 4;
        nbo_rrClick = 0.01;
        nbo_drClick = 0.01;
        nbo_membershipCost = 380;
    break;
    case "Sapphire":
        nbo_accountType = 5;
        nbo_rrClick = 0.01;
        nbo_drClick = 0.01;
        nbo_membershipCost = 380;
    break;
    case "Platinum":
        nbo_accountType = 6;
        nbo_rrClick = 0.01;
        nbo_drClick = 0.01;
        nbo_membershipCost = 580;
    break;
    case "Diamond":
        nbo_accountType = 7;
        nbo_rrClick = 0.01;
        nbo_drClick = 0.01;
        nbo_membershipCost = 580;
    break;
    case "Ultimate":
        nbo_accountType = 8;
        nbo_rrClick = 0.01;
        nbo_drClick = 0.01;
        nbo_membershipCost = 980;
    break;
    default:
        nbo_accountType = 1;
        nbo_rrClick = 0.005;
        nbo_drClick = 0.0005;
        nbo_membershipCost = 0;
    break;
}

// Get the used language
var nbo_language = document.body.innerHTML.indexOf("c0 f-") + 5;
nbo_language = document.body.innerHTML.substring(nbo_language, nbo_language + 2);

//Language block used in rented and direct referrals page.
var nbo_isToday = null;
var nbo_isYesterday = null;
var nbo_noClick = null;
switch(nbo_language)
{
    case "us":
        nbo_isToday = "Today";
        nbo_isYesterday = "Yesterday";
        nbo_noClick = "No";
    break;
    case "es":
        nbo_isToday = "Hoy";
        nbo_isYesterday = "Ayer";
        nbo_noClick = "Sin";
    break;
    case "pt":
        nbo_isToday = "Hoje";
        nbo_isYesterday = "Ontem";
        nbo_noClick = "Sem";
    break;
    case "gr":
        nbo_isToday = "S?µe?a";
        nbo_isYesterday = "??e?";
        nbo_noClick = "?????";
    break;
    case "id":
        nbo_isToday = "Hari";
        nbo_isYesterday = "Kemarin";
        nbo_noClick = "Belum";
    break;
    case "fi":
        nbo_isToday = "Tänään";
        nbo_isYesterday = "Eilen";
        nbo_noClick = "Ei";
    break;
    case "se":
        nbo_isToday = "Idag";
        nbo_isYesterday = "Igår";
        nbo_noClick = "Inga";
    break;
    case "de":
        nbo_isToday = "Heute";
        nbo_isYesterday = "Gestern";
        nbo_noClick = "Keine";
    break;
    case "fr":
        nbo_isToday = "Aujourd";
        nbo_isYesterday = "Hier";
        nbo_noClick = "Pas";
    break;
    default: //us
        nbo_isToday = "Today";
        nbo_isYesterday = "Yesterday";
        nbo_noClick = "No";
    break;
}

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////////////Rented Referral Listing////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
if( location.href.indexOf("www.neobux.com/c/rl") != -1 && location.href.indexOf("ss3=2") != -1)
{    
    //Variables
    var nbo_today = new Date();
    var nbo_totalClicks = 0;
    var nbo_totalAvg = 0;
    var nbo_zeroClickers = 0;
    var nbo_clickedToday = 0;
    var nbo_clickedYesterday = 0;
    var nbo_clickedOtherDay = 0;
    var nbo_totalProfit = 0;
    
    //Resize entire page
	resizeEntirePage(1048);
	
    //Obtain number of rented referrals and renewing cost
    var nbo_referrals = document.evaluate("//span[@class='f_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
    var nbo_renewingCost = renewingCost(nbo_referrals,nbo_accountType);
    
    //Ask for how many days user renews and save it into the cookie "nbo_data".
    //Saves 15 by default or if data has incorrect format
    var nbo_renewingDays = checkCookie(nbo_referrals,-1);
    
    //Obtain from the cookie if showing or not the total profit
    var nbo_data = getCookie("nbo_data");
    var nbo_showTotalProfit = nbo_data.split('-')[3];
    
    //Membership cost per referral
    var nbo_membershipCostPerReferral = ( nbo_membershipCost / 365 ) / nbo_referrals;

    //Obtain referrals table
    nbo_rtabla = document.evaluate("//table[@style='border-top:1px solid #aaaaaa;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    //Reduce the widht of the columns
    for(var i=1;i<nbo_rtabla.rows[0].cells.length;i++)
    {
        nbo_rtabla.rows[0].cells[i].setAttribute('style',nbo_rtabla.rows[0].cells[i].getAttribute('style').replace(/width:\d+px;/gi,""));
    }
    
    //Add profit header
    var nbo_header_profit = document.createElement("td");
    nbo_header_profit.setAttribute("class", "bgt");
    nbo_header_profit.style.setProperty("font-family", "Arial,Helvetica,Verdana,sans-serif", "");
    nbo_header_profit.style.setProperty("white-space", "nowrap", null);
    nbo_header_profit.style.setProperty("text-align", "center", null);
    nbo_header_profit.innerHTML = "Ganancia";
    nbo_rtabla.rows[0].insertBefore(nbo_header_profit, nbo_rtabla.rows[0].childNodes[7]);
    
    //Loop referral table
    //starts from 2 because of the header and blue-green row
	
	for (var i=2; i<(nbo_rtabla.rows.length-2); i++)
	{
	    if(nbo_rtabla.rows[i].cells[0].getAttribute('colspan') != null) continue;//continue if intermediate row
		//Add number of days since referral is in the account
		var nbo_referralSince = nbo_rtabla.rows[i].cells[3];
		nbo_referralSince = referralSinceDays(nbo_referralSince.innerHTML,nbo_today);
		
		nbo_rtabla.rows[i].cells[3].innerHTML = (nbo_referralSince[3] != -1) ? nbo_rtabla.rows[i].cells[3].innerHTML 
		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
		    + '(' + nbo_referralSince[0] + 'd y ' + nbo_referralSince[1] +':' + nbo_referralSince[2] + ')'
		    + '</span>'
			:
		    nbo_rtabla.rows[i].cells[3].innerHTML;
			
		//Add number of days since last click
		var nbo_lastClick = nbo_rtabla.rows[i].cells[5];
		
		nbo_lastClick = lastClickDays(nbo_lastClick.innerHTML,nbo_today);
		//alert(nbo_lastClick);
		nbo_rtabla.rows[i].cells[5].innerHTML = (nbo_lastClick[1] != -1) ? nbo_rtabla.rows[i].cells[5].innerHTML 
		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
		    + '(' + nbo_lastClick[0] + 'd)'
		    + '</span'
		    :
		    nbo_rtabla.rows[i].cells[5].innerHTML;
		
		//Add new cell profit
		var nbo_referralClicks = nbo_rtabla.rows[i].cells[6].innerHTML.replace(/&nbsp;/gi,"");
		var nbo_referralProfit = profitGenerated(nbo_referralSince[0],nbo_referralClicks,nbo_rrClick,(Number(nbo_renewingCost)+Number(nbo_membershipCostPerReferral)));
		var nbo_cellProfit = nbo_rtabla.rows[i].insertCell(8);
		nbo_cellProfit.innerHTML = '$'+nbo_referralProfit.toFixed(3);
		nbo_cellProfit.setAttribute("id","nbo_profit_"+i);
		nbo_cellProfit.setAttribute("class","f_r l");
		if(nbo_referralProfit >= 0)
		{//green
		    nbo_cellProfit.setAttribute("style","color:#004400;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}else{//red
		    nbo_cellProfit.setAttribute("style","color:#990000;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}
		
		//Add profit tooltip
		if(nbo_showTotalProfit == 1)
		{
		    var nbo_remainingDays = nbo_rtabla.rows[i].cells[4].innerHTML.replace(/[^0-9]/g, '');
		    nbo_remainingDays = (Number(nbo_referralSince[0])+Number(nbo_remainingDays.substring(0,nbo_remainingDays.length-4))) * 24 * 60
		        + (Number(nbo_referralSince[1])+Number(nbo_remainingDays.substring(nbo_remainingDays.length-4,nbo_remainingDays.length-2))) * 60
		        + (Number(nbo_referralSince[2])+Number(nbo_remainingDays.substring(nbo_remainingDays.length-2)));
		    nbo_remainingDays = Math.floor(nbo_remainingDays/(60 * 24));
		    var nbo_referralHasToPay = renewingCost(nbo_referrals,nbo_accountType) * nbo_remainingDays / 30;
		    var nbo_referralTotalProfit = nbo_referralClicks * nbo_rrClick - nbo_referralHasToPay - (nbo_membershipCostPerReferral * nbo_remainingDays);
		    var nbo_script = document.createElement('script');
            var nbo_script_content = document.createTextNode("mk_tt('nbo_profit_"+i+"','bm','Ganancia global: $"+nbo_referralTotalProfit.toFixed(3)+"');");
            nbo_script.appendChild(nbo_script_content);
            nbo_rtabla.rows[i].appendChild(nbo_script);
        }
        
		
		//Obtain data to write in the last row
		nbo_totalProfit = Number(nbo_totalProfit) + Number(nbo_referralProfit);
		nbo_totalClicks = Number(nbo_totalClicks) + Number(nbo_referralClicks);
		nbo_totalAvg = Number(nbo_totalAvg) + Number(nbo_rtabla.rows[i].cells[7].innerHTML.replace(/&nbsp;/gi,""));
		switch(nbo_lastClick[0])
		{
		    case -1:
		        nbo_zeroClickers++;
		    break;
		    case 0:
		        nbo_clickedToday++;
		    break;
		    case 1:
		        nbo_clickedYesterday++;
		    break;
		    default:
		        nbo_clickedOtherDay++;
		    break;
		}
	}//End loop
	
	//Adds information to the last row
	var nbo_ultimaFila = nbo_rtabla.rows[nbo_rtabla.rows.length-1].cells[0];
	nbo_ultimaFila.setAttribute("style","font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:center;");
	nbo_ultimaFila.innerHTML = "Clics en total: "+nbo_totalClicks+"&nbsp;&nbsp;&nbsp;"
	    +"Media total: "+(nbo_totalAvg/nbo_referrals).toFixed(2)+"&nbsp;&nbsp;&nbsp;"
	    +"Refs. clic hoy: "+nbo_clickedToday+"&nbsp;&nbsp;&nbsp;"
	    +"Refs. clic ayer: "+nbo_clickedYesterday+"&nbsp;&nbsp;&nbsp;"
	    +"Otros refs: "+nbo_clickedOtherDay+"&nbsp;&nbsp;&nbsp;"
	    +"Refs. sin clic: "+nbo_zeroClickers+"&nbsp;&nbsp;&nbsp;"
	    +"Ganancia total: $"+nbo_totalProfit.toFixed(3);
	
	//Update width of some rows (colspan)
	var nbo_columnas = nbo_rtabla.rows[0].cells.length;
	nbo_rtabla.rows[1].cells[0].setAttribute("colspan",nbo_columnas+2);
	nbo_rtabla.rows[nbo_rtabla.rows.length-2].cells[0].setAttribute("colspan",nbo_columnas+2);
	nbo_rtabla.rows[nbo_rtabla.rows.length-1].cells[0].setAttribute("colspan",nbo_columnas+2);
	
	//Adds information about individual referrals under the table of rented referrals.
    var nbo_singleRefInfoTD = document.evaluate("//td[@style='font-size:12px;color:#707070']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    nbo_singleRefInfoTD.innerHTML += "<br /><strong>NeoBuxOx dice:</strong> Necesitas una media superior a "+( ( ( (100-discountObtained()) * renewingCost(nbo_referrals,nbo_accountType) / 100 ) + (nbo_membershipCost / 365 / nbo_referrals) ) / nbo_rrClick / 30 ).toFixed(3)+" para obtener ganancias.";
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////////////Direct Referral Listing////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
if( location.href.indexOf("www.neobux.com/c/rl") != -1 && location.href.indexOf("ss3=1") != -1)
{
    //Variables
    var nbo_today = new Date();
    var nbo_totalClicks = 0;
    var nbo_totalAvg = 0;
    var nbo_zeroClickers = 0;
    var nbo_clickedToday = 0;
    var nbo_clickedYesterday = 0;
    var nbo_clickedOtherDay = 0;
    var nbo_totalProfit = 0;
    
    //Resize entire page
	resizeEntirePage(1048);
    
    //Obtain number of direct referrals
    var nbo_referrals = document.evaluate("//span[@class='f_b']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
        
    //Ask for how many days user renews and save it into the cookie "nbo_data".
    //Saves 15 by default or if data has incorrect format
    var nbo_renewingDays = checkCookie(-1,nbo_referrals);
    
    //Obtain referrals table
    nbo_rtabla = document.evaluate("//table[@style='border-top:1px solid #aaaaaa;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    //Reduce the widht of the columns
    for(var i=1;i<nbo_rtabla.rows[0].cells.length;i++)
    {
        nbo_rtabla.rows[0].cells[i].setAttribute('style',nbo_rtabla.rows[0].cells[i].getAttribute('style').replace(/width:\d+px;/gi,""));
    }
    
    //Add profit header
    var nbo_header_profit = document.createElement("td");
    nbo_header_profit.setAttribute("class", "bgt");
    nbo_header_profit.style.setProperty("font-family", "Arial,Helvetica,Verdana,sans-serif", "");
    nbo_header_profit.style.setProperty("white-space", "nowrap", null);
    nbo_header_profit.style.setProperty("text-align", "center", null);
    nbo_header_profit.innerHTML = "Ganancia";
    nbo_rtabla.rows[0].insertBefore(nbo_header_profit, nbo_rtabla.rows[0].childNodes[7]);
    
    //Loop referral table
    //starts from 2 because of the header and blue-green row
    for (var i=2; i<(nbo_rtabla.rows.length-2); i++) {
        if(nbo_rtabla.rows[i].cells[0].getAttribute('colspan') != null) continue;//continue if intermediate row
        
		//Add number of days since referral is in the account
		var nbo_referralSince = nbo_rtabla.rows[i].cells[3];
		var nbo_referralSince = referralSinceDays(nbo_referralSince.innerHTML,nbo_today);
		nbo_rtabla.rows[i].cells[3].innerHTML = (nbo_referralSince[3] != -1) ? nbo_rtabla.rows[i].cells[3].innerHTML 
		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
		    + '(' + nbo_referralSince[0] + 'd y ' + nbo_referralSince[1] +':' + nbo_referralSince[2] + ')'
		    + '</span>'
			:
		    nbo_rtabla.rows[i].cells[3].innerHTML;
		
		//Add number of days since last click
		var nbo_lastClick = nbo_rtabla.rows[i].cells[4];
		var nbo_lastClick = lastClickDays(nbo_lastClick.innerHTML,nbo_today);
		nbo_rtabla.rows[i].cells[4].innerHTML = (nbo_lastClick[1] != -1) ? nbo_rtabla.rows[i].cells[4].innerHTML 
		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
		    + '(' + nbo_lastClick[0] + 'd)'
		    + '</span'
		    :
		    nbo_rtabla.rows[i].cells[4].innerHTML;
		
		//Add new cell profit
		var nbo_referralClicks = nbo_rtabla.rows[i].cells[5].innerHTML.replace(/&nbsp;/gi,"");
		var nbo_referralProfit = nbo_referralClicks * nbo_drClick;
		var nbo_cellProfit = nbo_rtabla.rows[i].insertCell(7);
		nbo_cellProfit.innerHTML = '$'+nbo_referralProfit.toFixed(3);
		nbo_cellProfit.setAttribute("class","f_r l");
		if(nbo_referralProfit >= 0)
		{
		    nbo_cellProfit.setAttribute("style","color:#004400;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}else{
		    nbo_cellProfit.setAttribute("style","color:#990000;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}
		
		//Obtain data to write in the last row
		nbo_totalProfit = Number(nbo_totalProfit) + Number(nbo_referralProfit);
		nbo_totalClicks = Number(nbo_totalClicks) + Number(nbo_referralClicks);
		nbo_totalAvg = Number(nbo_totalAvg) + Number(nbo_rtabla.rows[i].cells[6].innerHTML.replace(/&nbsp;/gi,""));
		switch(nbo_lastClick[0])
		{
		    case -1:
		        nbo_zeroClickers++;
		    break;
		    case 0:
		        nbo_clickedToday++;
		    break;
		    case 1:
		        nbo_clickedYesterday++;
		    break;
		    default:
		        nbo_clickedOtherDay++;
		    break;
		}
	}//End loop
	
	//Adds information to the last row
	var nbo_ultimaFila = nbo_rtabla.rows[nbo_rtabla.rows.length-1].cells[0];
	nbo_ultimaFila.setAttribute("style","font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:center;");
	nbo_ultimaFila.innerHTML = "Clics en total: "+nbo_totalClicks+"&nbsp;&nbsp;&nbsp;"
	    +"Media total: "+(nbo_totalAvg/nbo_referrals).toFixed(2)+"&nbsp;&nbsp;&nbsp;"
	    +"Refs. clic hoy: "+nbo_clickedToday+"&nbsp;&nbsp;&nbsp;"
	    +"Refs. clic ayer: "+nbo_clickedYesterday+"&nbsp;&nbsp;&nbsp;"
	    +"Otros refs: "+nbo_clickedOtherDay+"&nbsp;&nbsp;&nbsp;"
	    +"Refs. sin clic: "+nbo_zeroClickers+"&nbsp;&nbsp;&nbsp;"
	    +"Ganancia total: $"+nbo_totalProfit.toFixed(3);
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////Statistics page///////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
if( location.href.indexOf("www.neobux.com/c/rs") != -1 )
{
    var loggingLevel = [0];
    //Variables
    var nbo_rentedReferrals = 0;
    var nbo_directReferrals = 0;
    var nbo_renewingDays = 0;
    var nbo_chartValues = new Array();
    var nbo_dTodayClicks = 0;
    var nbo_dYesterdayClicks = 0;
    var nbo_dTotalClicks = 0;
    var nbo_rTodayClicks = 0;
    var nbo_rYesterdayClicks = 0;
    var nbo_rTotalClicks = 0;
    var nbo_recycledToday = 0;
    var nbo_recycledYesterday = 0;
    var nbo_recycledTotal = 0;
    var nbo_renewedToday = 0;
    var nbo_renewedYesterday = 0;
    var nbo_renewedTotal = 0;
    var nbo_autopayToday = 0;
    var nbo_autopayYesterday = 0;
    var nbo_autopayTotal = 0;
    
    //Resize entire page
    resizeEntirePage(1090);
    
    //Obtain renewingDays, direct and rented referrals from the cookie
    var nbo_data = getCookie("nbo_data");
    
    try
    {
        if(nbo_data == null || nbo_data == "" || nbo_data == "0") throw ("nocookie");
        nbo_data = nbo_data.split("-");
        nbo_renewingDays = nbo_data[0];
        nbo_rentedReferrals = nbo_data[1];
        nbo_directReferrals = nbo_data[2];
        nbo_tprofit = nbo_data[3];
        
        //Obtain number of referrals
        var nbo_referrals = document.evaluate("//span[@class='f_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;

        //Obtain statistics table
        var nbo_stable = document.evaluate("//table[@style='width:100%;height:100%;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        //Create a new column and set up properties
        var nbo_scolumn = document.createElement("td");
        nbo_scolumn.setAttribute("valign","top");
        nbo_scolumn.setAttribute("rowspan","2");
        nbo_scolumn.setAttribute("nowrap","nowrap");
        nbo_scolumn.setAttribute("class","mbx");
        nbo_scolumn.setAttribute("style","border:1px solid #999;background-color:#fff;font-family:Arial,Helvetica,Verdana,sans-serif;text-align:left;");
        
        //Obtain data to add to the column
        var nbo_scharts = document.evaluate("//script[contains(.,'eval(w(')]", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.split(" ");
        
        for(var i=0; i<nbo_scharts.length-1; i++)
        {
            nbo_chartValues = obtainChartValues(nbo_scharts[i].split("'")[1]);
            
            switch(nbo_chartValues[0])
            {
                case "ch_cdd": //Direct referrals chart
                    nbo_chartValues = nbo_chartValues.reverse();
                    nbo_dTodayClicks = nbo_chartValues[0];
                    nbo_dYesterdayClicks = nbo_chartValues[1];
                    for(var n=0;n<nbo_chartValues.length-1;n++)
                    {
                        nbo_dTotalClicks = Number(nbo_dTotalClicks) + Number(nbo_chartValues[n]);
                    }
                break;
                case "ch_cr": //Rented referrals chart
                    nbo_chartValues = nbo_chartValues.reverse();
                    nbo_rTodayClicks = nbo_chartValues[0];
                    nbo_rYesterdayClicks = nbo_chartValues[1];
                    for(var n=0;n<nbo_chartValues.length-1;n++)
                    {
                        nbo_rTotalClicks = Number(nbo_rTotalClicks) + Number(nbo_chartValues[n]);
                    }
                break;
                case "ch_recycle": //Recycling chart
                    nbo_chartValues = nbo_chartValues.reverse();
                    nbo_recycledToday = nbo_chartValues[0];
                    nbo_recycledYesterday = nbo_chartValues[1];
                    for(var n=0;n<10;n++)
                    {
                        nbo_recycledTotal = Number(nbo_recycledTotal) + Number(nbo_chartValues[n]);
                    }
                break;
                case "ch_extensions": //Extensions chart
                    nbo_chartValues = nbo_chartValues.reverse();
                    nbo_renewedToday = nbo_chartValues[0];
                    nbo_renewedYesterday = nbo_chartValues[1];
                    for(var n=0;n<10;n++)
                    {
                        nbo_renewedTotal = Number(nbo_renewedTotal) + Number(nbo_chartValues[n]);
                    }
                break;
                case "ch_autopay": //AutoPay chart
                    nbo_chartValues = nbo_chartValues.reverse();
                    nbo_autopayToday = nbo_chartValues[0];
                    nbo_autopayYesterday = nbo_chartValues[1];
                    for(var n=0;n<10;n++)
                    {
                        nbo_autopayTotal = Number(nbo_autopayTotal) + Number(nbo_chartValues[n]);
                    }
                break;
                default:
                break;
            }
        }
        
        //Obtain proyected avgs:
        var nbo_ProjectedAvgs = document.evaluate("//span[@style='font-size:22px;color:#00a0ee']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var nbo_dProjectedAvg = nbo_ProjectedAvgs.snapshotItem(0).innerHTML;
        var nbo_rProjectedAvg = nbo_ProjectedAvgs.snapshotItem(1).innerHTML;
        
        //Fix the amount of referrals (experimental)
        if(nbo_referrals > 0)
        {
            if(nbo_directReferrals == 0 && (nbo_dTodayClicks > 0 || nbo_dYesterdayClicks > 0) )
            {
                nbo_directReferrals = nbo_referrals - nbo_rentedReferrals;
            }
            if(nbo_rentedReferrals == 0 && (nbo_rTodayClicks > 0 || nbo_rYesterdayClicks > 0) )
            {
                nbo_rentedReferrals = nbo_referrals - nbo_directReferrals;
            }
        }
        
        //Calculate the membership and referrals cost per day
        var nbo_expensesPerDay = Number(nbo_membershipCost/365)+Number(((100-discountObtained()) * renewingCost(nbo_rentedReferrals,nbo_accountType) / 100 ) / 30) * nbo_rentedReferrals;
                  
        //Add data to the column
        var nbo_sdiv = document.createElement("div");
        nbo_sdiv.setAttribute("style","margin:5px;font-size:10px;");
        
        //Script data
        var nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","font-size:8px;color:#999;");
        nbo_sspan.innerHTML = "<div style=\"float:left;font-size:8px;\"><a style=\"color:#999;font-weight:normal;\" href=\"http://userscripts.org/scripts/show/108933\" target=\"_blank\">NeoBuxOx v"+nbo_version+"</a></div> <div style=\"float:right;font-size:8px;cursor:pointer;\" onClick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">(Opciones)</div><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //title
        nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","font-size:12px;text-align:center;color:#444;");
        nbo_sspan.innerHTML = "<strong>Estadísticas</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //direct and rented referrals
        nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","text-align:center;font-size:10px;");
        nbo_sspan.innerHTML = "Dir: "+nbo_directReferrals+" <a style=\"color:#999;font-weight:normal;text-decoration:underline !important;\" href=\"http://www.neobux.com/c/rl/?ss3=1\" title=\"Actualizar\" alt=\"Actualizar\">Act</a> | Alq: "+nbo_rentedReferrals+" <a style=\"color:#999;font-weight:normal;text-decoration:underline !important;\" href=\"http://www.neobux.com/c/rl/?ss3=2\" title=\"Actualizar\" alt=\"Actualizar\">Act</a><br /><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //Today
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Hoy</strong> - Real: $"+Number((nbo_rTodayClicks * nbo_rrClick)+(nbo_dTodayClicks * nbo_drClick)-nbo_recycledToday-nbo_renewedToday-nbo_autopayToday-nbo_expensesPerDay).toFixed(3)+"<hr />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Ganancias</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Alquilados: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rTodayClicks * nbo_rrClick).toFixed(3)+" ("+nbo_rTodayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Directos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dTodayClicks * nbo_drClick).toFixed(3)+" ("+nbo_dTodayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Ambos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTodayClicks * nbo_rrClick)+(nbo_dTodayClicks * nbo_drClick)).toFixed(3)+" ("+(Number(nbo_dTodayClicks)+Number(nbo_rTodayClicks))+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Neta: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTodayClicks * nbo_rrClick)+(nbo_dTodayClicks * nbo_drClick)-nbo_recycledToday-nbo_renewedToday-nbo_autopayToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Proyectado</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Alquilados: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rProjectedAvg * nbo_rentedReferrals * nbo_rrClick).toFixed(3)+" ("+Number(nbo_rProjectedAvg * nbo_rentedReferrals).toFixed(0)+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Directos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dProjectedAvg * nbo_directReferrals * nbo_drClick).toFixed(3)+" ("+Number(nbo_dProjectedAvg * nbo_directReferrals).toFixed(0)+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Ambos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_dProjectedAvg * nbo_directReferrals * nbo_drClick) + (nbo_rProjectedAvg * nbo_rentedReferrals * nbo_rrClick)).toFixed(3)+" ("+Number((nbo_dProjectedAvg * nbo_directReferrals)+(nbo_rProjectedAvg * nbo_rentedReferrals)).toFixed(0)+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Gastos</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Reciclaje: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Renovaciones: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_renewedToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;AutoPago: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_autopayToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Gasto total: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledToday+nbo_renewedToday+nbo_autopayToday).toFixed(3)+"<br /><br />";
        nbo_sdiv.appendChild(nbo_sspan);
                
        
        //Yesterday
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Ayer</strong> - Real: $"+Number((nbo_rYesterdayClicks * nbo_rrClick)+(nbo_dYesterdayClicks * nbo_drClick)-nbo_recycledYesterday-nbo_renewedYesterday-nbo_autopayYesterday-nbo_expensesPerDay).toFixed(3)+"<hr />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Ganancias</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Alquilados: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rYesterdayClicks * nbo_rrClick).toFixed(3)+" ("+nbo_rYesterdayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Directos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dYesterdayClicks * nbo_drClick).toFixed(3)+" ("+nbo_dYesterdayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Ambos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rYesterdayClicks * nbo_rrClick)+(nbo_dYesterdayClicks * nbo_drClick)).toFixed(3)+" ("+(Number(nbo_dYesterdayClicks)+Number(nbo_rYesterdayClicks))+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Neta: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rYesterdayClicks * nbo_rrClick)+(nbo_dYesterdayClicks * nbo_drClick)-nbo_recycledYesterday-nbo_renewedYesterday-nbo_autopayYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Medias</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Media alquilados: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = Number(nbo_rYesterdayClicks / nbo_rentedReferrals).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Media directos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = Number(nbo_dYesterdayClicks / nbo_directReferrals).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Media ambos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = (Number(Number(nbo_rYesterdayClicks)+Number(nbo_dYesterdayClicks)) / (Number(nbo_rentedReferrals)+Number(nbo_directReferrals))).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Gastos</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Reciclaje: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Renovaciones: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_renewedYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;AutoPago: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_autopayYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Gasto total: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledYesterday+nbo_renewedYesterday+nbo_autopayYesterday).toFixed(3)+"<br /><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        
        //Global
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>10 días</strong> - Real: $"+Number((nbo_rTotalClicks * nbo_rrClick)+(nbo_dTotalClicks * nbo_drClick)-nbo_recycledTotal-nbo_renewedTotal-nbo_autopayTotal-(nbo_expensesPerDay*10)).toFixed(3)+"<hr />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Ganancias</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Alquilados: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rTotalClicks * nbo_rrClick).toFixed(3)+" ("+nbo_rTotalClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Directos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dTotalClicks * nbo_drClick).toFixed(3)+" ("+nbo_dTotalClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Ambos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTotalClicks * nbo_rrClick)+(nbo_dTotalClicks * nbo_drClick)).toFixed(3)+" ("+(Number(nbo_dTotalClicks)+Number(nbo_rTotalClicks))+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Neta: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTotalClicks * nbo_rrClick)+(nbo_dTotalClicks * nbo_drClick)-nbo_recycledTotal-nbo_renewedTotal-nbo_autopayTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Medias</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Media alquilados: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = Number(Number(nbo_rTotalClicks / nbo_rentedReferrals)/10).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Media directos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = Number(Number(nbo_dTotalClicks / nbo_directReferrals)/10).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Media ambos: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = (Number(Number(Number(nbo_rTotalClicks)+Number(nbo_dTotalClicks)) / (Number(nbo_rentedReferrals)+Number(nbo_directReferrals)))/10).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>Gastos</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Reciclaje: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Renovaciones: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_renewedTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;AutoPago: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_autopayTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;Gasto total: ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledTotal+nbo_renewedTotal+nbo_autopayTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //Add the div to the column
        nbo_scolumn.appendChild(nbo_sdiv);
        
        //Add a column to separate columns because of NeoBux design
        var nbo_spacing_column = document.createElement("td");
        nbo_spacing_column.setAttribute("style","width:6px");
        nbo_spacing_column.setAttribute("rowspan","2");
        nbo_spacing_column.innerHTML = "&nbsp;";
        nbo_stable.rows[0].appendChild(nbo_spacing_column);
        
        //Add the new column to the table
        nbo_stable.rows[0].appendChild(nbo_scolumn);
        
        //Create options
        var nbo_today = new Date();
        nbo_today.setDate(nbo_today.getDate() + 365);
        
        var nbo_opts_container = document.createElement("div");
        nbo_opts_container.setAttribute("style","visibility: hidden;position: fixed;left: 0px;top: 0px;width:100%;height:100%;text-align:center;z-index: 1000;background-color:rgba(0,0,0,0.8);");
        nbo_opts_container.setAttribute("id","nbo_opts_container");
        
        var nbo_opts = document.createElement("div");
        nbo_opts.setAttribute("style","width:600px;margin: 100px auto;background-color: #fff;border:1px solid #000;padding:15px;text-align:left;");
        
        var nbo_close = document.createElement("div");
        nbo_close.setAttribute("style","float:right;");
        nbo_close.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">Cerrar</a>";
        nbo_opts.appendChild(nbo_close);
        
        var nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = 'Estoy renovando por: <input id="nbo_options_days" type="text" name="nbo_options_days" value="'+nbo_renewingDays+'" size="3" maxlength="3" /> días'
            +' <button type="button" onClick="document.cookie =\'nbo_data=\'+document.getElementById(\'nbo_options_days\').value+\'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-'+nbo_tprofit+';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML=\'Guardado correctamente: \'+document.getElementById(\'nbo_options_days\').value+\' días\';">Guardar</button><br /><span style="font-size:10px;color:#666;">Opciones disponibles: 1 (AutoPago), 15, 30, 60, 90, 150 o 240</span><br /></br>';
        nbo_opts.appendChild(nbo_opt_option);
        
        var nbo_opt_tprofit_checked = (nbo_tprofit==1)?"checked":"";
        nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = 'En la página de referidos alquilados, ¿mostrar la ganancia global?: <input id="nbo_options_tprofit" type="checkbox" name="nbo_options_tprofit" value="'+nbo_tprofit+'" '+nbo_opt_tprofit_checked+'/>'
            +' <button type="button" onClick="var nbo_opt_tprofit_checked = (document.getElementById(\'nbo_options_tprofit\').checked)?1:0;document.cookie =\'nbo_data='+nbo_renewingDays+'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-\'+nbo_opt_tprofit_checked+\';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML= (document.getElementById(\'nbo_options_tprofit\').checked)?\'Guardado correctamente: Sí, mostrar\':\'Guardado correctamente: No, no mostrar\';">Guardar</button><br /><span style="font-size:10px;color:#666;">Aparece en forma de tooltip en la columna de "Ganancia" y puede ralentizar un poco la carga del script.<br />Muestra lo generado por cada referido frente a los días totales que ha estado y estará en la cuenta.</span><br /></br>';
        nbo_opts.appendChild(nbo_opt_option);
        
        nbo_opt_option = document.createElement("div");
        nbo_opt_option.setAttribute("id","nbo_opt_result");
        nbo_opt_option.setAttribute("style","font-size:10px;color:#338800;text-align:center;");
        nbo_opts.appendChild(nbo_opt_option);
        
        nbo_opts_container.appendChild(nbo_opts);
        document.body.appendChild(nbo_opts_container);
    }catch(err)
    {
        //Obtain statistics table
        var nbo_stable = document.evaluate("//table[@style='width:100%;height:100%;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        //Create a new column and set up properties
        var nbo_scolumn = document.createElement("td");
        nbo_scolumn.setAttribute("class","mbx");
        nbo_scolumn.setAttribute("valign","top");
        nbo_scolumn.setAttribute("rowspan","2");
        nbo_scolumn.setAttribute("nowrap","nowrap");
        nbo_scolumn.setAttribute("style","border:1px solid #999;background-color:#fff;font-family:Arial,Helvetica,Verdana,sans-serif;text-align:left;");
        
        //Create a div to enter data
        var nbo_sdiv = document.createElement("div");
        nbo_sdiv.setAttribute("style","margin:5px;font-size:10px;");
        
        //Script data
        var nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","font-size:8px;color:#999;");
        nbo_sspan.innerHTML = "<div style=\"float:left;font-size:8px;\"><a style=\"color:#999;font-weight:normal;\" href=\"http://userscripts.org/scripts/show/108933\" target=\"_blank\">NeoBuxOx v"+nbo_version+"</a></div> <div style=\"float:right;font-size:8px;cursor:pointer;\" onClick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">(Opciones)</div><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //title
        nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","font-size:12px;text-align:center;color:#444;");
        nbo_sspan.innerHTML = "<strong>Estadísticas</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //Explanation
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "No se han encontrado los<br />"
                            +"datos necesarios. Por favor,<br />"
                            +"ve a la página de referidos<br />"
                            +"<a href=\"http://www.neobux.com/c/rl/?ss3=1\" title=\"Directos\" alt=\"Directos\">directos</a> o <a href=\"http://www.neobux.com/c/rl/?ss3=2\" title=\"Alquilados\" alt=\"Alquilados\">alquilados</a><br />"
                            +"para que NeoBuxOx pueda<br />"
                            +"obtener el número de<br />"
                            +"referidos que tienes.<br />"
                            +"Gracias";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //Add the div to the column
        nbo_scolumn.appendChild(nbo_sdiv);
        
        //Add a column to separate columns because of NeoBux design
        var nbo_spacing_column = document.createElement("td");
        nbo_spacing_column.setAttribute("style","width:6px");
        nbo_spacing_column.setAttribute("rowspan","2");
        nbo_spacing_column.innerHTML = "&nbsp;";

        nbo_stable.rows[0].appendChild(nbo_spacing_column);
        
        //Add the new column to the table
        nbo_stable.rows[0].appendChild(nbo_scolumn);
        
        //Create options
        var nbo_today = new Date();
        nbo_today.setDate(nbo_today.getDate() + 365);
        
        var nbo_opts_container = document.createElement("div");
        nbo_opts_container.setAttribute("style","visibility: hidden;position: fixed;left: 0px;top: 0px;width:100%;height:100%;text-align:center;z-index: 1000;background-color:rgba(0,0,0,0.8);");
        nbo_opts_container.setAttribute("id","nbo_opts_container");
        
        var nbo_opts = document.createElement("div");
        nbo_opts.setAttribute("style","width:600px;margin: 100px auto;background-color: #fff;border:1px solid #000;padding:15px;text-align:left;");
        
        var nbo_close = document.createElement("div");
        nbo_close.setAttribute("style","float:right;");
        nbo_close.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">Cerrar</a>";
        nbo_opts.appendChild(nbo_close);
        
        var nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = 'Estoy renovando por: <input id="nbo_options_days" type="text" name="nbo_options_days" value="'+nbo_renewingDays+'" size="3" maxlength="3" /> días'
            +' <button type="button" onClick="document.cookie =\'nbo_data=\'+document.getElementById(\'nbo_options_days\').value+\'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-'+nbo_tprofit+';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML=\'Guardado correctamente: \'+document.getElementById(\'nbo_options_days\').value+\' días\';">Guardar</button><br /><span style="font-size:10px;color:#666;">Opciones disponibles: 1 (AutoPago), 15, 30, 60, 90, 150 o 240</span><br /></br>';
        nbo_opts.appendChild(nbo_opt_option);
        
        var nbo_opt_tprofit_checked = (nbo_tprofit==1)?"checked":"";
        nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = 'En la página de referidos alquilados, ¿mostrar la ganancia global?: <input id="nbo_options_tprofit" type="checkbox" name="nbo_options_tprofit" value="'+nbo_tprofit+'" '+nbo_opt_tprofit_checked+'/>'
            +' <button type="button" onClick="var nbo_opt_tprofit_checked = (document.getElementById(\'nbo_options_tprofit\').checked)?1:0;document.cookie =\'nbo_data='+nbo_renewingDays+'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-\'+nbo_opt_tprofit_checked+\';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML= (document.getElementById(\'nbo_options_tprofit\').checked)?\'Guardado correctamente: Sí, mostrar\':\'Guardado correctamente: No, no mostrar\';">Guardar</button><br /><span style="font-size:10px;color:#666;">Aparece en forma de tooltip en la columna de "Ganancia" y puede ralentizar un poco la carga del script.<br />Muestra lo generado por cada referido frente a los días totales que ha estado y estará en la cuenta.</span><br /></br>';
        nbo_opts.appendChild(nbo_opt_option);
        
        nbo_opt_option = document.createElement("div");
        nbo_opt_option.setAttribute("id","nbo_opt_result");
        nbo_opt_option.setAttribute("style","font-size:10px;color:#338800;text-align:center;");
        nbo_opts.appendChild(nbo_opt_option);
        
        nbo_opts_container.appendChild(nbo_opts);
        document.body.appendChild(nbo_opts_container);
    }
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////////////////Account summary////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
if( location.href == "http://www.neobux.com/c/")
{
    //Current date
    var nbo_today = new Date();
    
    //Calculates the amount of days since the sign up
    var nbo_registered_date = document.evaluate("//span[@style='color:#000;']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    nbo_registered_days = lastClickDays(nbo_registered_date.innerHTML,nbo_today);
    
    //Puts a beauty format to the amount of time since the sign up
    var nbo_registered_years = Math.floor(nbo_registered_days / 365);
    var nbo_aux = nbo_registered_days % 365;
    var nbo_registered_months= Math.floor(nbo_aux / 30);
    nbo_aux = nbo_aux % 30;
    
    //Appends a tooltip to show the amout of time
    nbo_registered_date.setAttribute("id","nbo_registered_date");
    var nbo_script = document.createElement('script');
    var nbo_script_content = document.createTextNode("mk_tt('nbo_registered_date','rm','"+nbo_registered_years+" años, "+nbo_registered_months+" meses y "+nbo_aux+" días');");
    nbo_script.appendChild(nbo_script_content);
    nbo_registered_date.appendChild(nbo_script);
    
    //Retrieves the total of referrals
    var nbo_showed_directs = document.getElementById("t_rd");
    var nbo_container = null;
    if(nbo_showed_directs != null)
    {
        nbo_showed_directs = nbo_showed_directs.parentNode;
        nbo_container = nbo_showed_directs.parentNode.previousSibling;
        nbo_showed_directs = nbo_showed_directs.innerHTML;
        nbo_showed_directs = nbo_showed_directs.substring(0,nbo_showed_directs.indexOf("&"));
    }
    var nbo_showed_rented = document.getElementById("t_ra");
    if(nbo_showed_rented != null)
    {
        nbo_showed_rented = nbo_showed_rented.parentNode.innerHTML;
        nbo_showed_rented = nbo_showed_rented.substring(0,nbo_showed_rented.indexOf("&"));
    }
    //Shows the total of referrals if the user has rented and direct referrals
    if(nbo_showed_directs != null && nbo_showed_rented != null)
    {
        var nbo_container_directs = nbo_container.childNodes[0].childNodes[0];
        var nbo_span = document.createElement("span");
        nbo_span.setAttribute("style","float:right;font-size:11px;");
        nbo_span.innerHTML = "<span style=\"color:#707070\">Total:</span> " + (Number(nbo_showed_directs) + Number(nbo_showed_rented));
        nbo_container_directs.appendChild(nbo_span);
    }
    
    //Retrieves the total of advertisements
    if(nbo_container != null) {
        nbo_container = nbo_container.nextSibling.nextSibling.nextSibling.nextSibling;
    } else {
        nbo_container = document.evaluate("//img[@src='http://c.nbx.bz/imagens/n/gr/250.jpg']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        nbo_container = nbo_container.snapshotItem(2).parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling;
    }
    var nbo_viewed_user = nbo_container.nextSibling.childNodes[1].innerHTML;
    nbo_viewed_user = nbo_viewed_user.substring(0,nbo_viewed_user.indexOf("&"));
    var nbo_viewed_referrals = nbo_container.nextSibling.nextSibling.childNodes[1].innerHTML;
    nbo_viewed_referrals = nbo_viewed_referrals.substring(0,nbo_viewed_referrals.indexOf("&"));
    //Shows the total of advertisements
    var nbo_container_ads = nbo_container.childNodes[0].childNodes[0];
    nbo_span = document.createElement("span");
    nbo_span.setAttribute("style","float:right;font-size:11px;");
    nbo_span.innerHTML = "<span style=\"color:#707070\">Total:</span> " + (Number(nbo_viewed_user) + Number(nbo_viewed_referrals));
    nbo_container_ads.appendChild(nbo_span);
    //Ads the average of own clicks
    var nbo_container_tooltip = nbo_container.nextSibling.childNodes[1];
    nbo_container_tooltip.setAttribute("id","nbo_user_clicks_avg");
    
    nbo_script = document.createElement('script');
    nbo_script_content = document.createTextNode("mk_tt('nbo_user_clicks_avg','rm','Media diaria: "+(Number(nbo_viewed_user)/Number(nbo_registered_days)).toFixed(3)+" clics por día');");
    nbo_script.appendChild(nbo_script_content);
    nbo_container_tooltip.appendChild(nbo_script);
    
    //Shows the total of credited ads in the last 10 days
    var nbo_scharts = document.evaluate("//script[contains(.,'eval(w(')]", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.split(" ");

    var nbo_credited_clicks = 0;
    var nbo_credited_direct = 0;
    var nbo_credited_rented = 0;
        
    for(var i=0; i<nbo_scharts.length-1; i++)
    {
        var nbo_chartValues = obtainChartValues(nbo_scharts[i].split("'")[1]);
        switch(nbo_chartValues[0])
        {
            case "ch_cliques": //Credited clics
                nbo_chartValues = nbo_chartValues.reverse();
                for(var n=0;n<nbo_chartValues.length-1;n++)
                {
                    nbo_credited_clicks = Number(nbo_credited_clicks) + Number(nbo_chartValues[n]);
                }
            break;
            case "ch_cdd": //Credited direct
                nbo_chartValues = nbo_chartValues.reverse();
                for(var n=0;n<nbo_chartValues.length-1;n++)
                {
                    nbo_credited_direct = Number(nbo_credited_direct) + Number(nbo_chartValues[n]);
                }
            break;
            case "ch_cr": //Credited rented
                nbo_chartValues = nbo_chartValues.reverse();
                for(var n=0;n<nbo_chartValues.length-1;n++)
                {
                    nbo_credited_rented = Number(nbo_credited_rented) + Number(nbo_chartValues[n]);
                }
            break;
            
            default:
            break;
        }
    }
    
    nbo_container = nbo_container.nextSibling.nextSibling.nextSibling;
    
    // Own credited clicks
    var nbo_tr = document.createElement("tr");
    
    var nbo_td = document.createElement("td");
    nbo_td.setAttribute("align","left");
    nbo_td.setAttribute("class","f_r2 x");
    nbo_td.innerHTML = "Usted últimos 10 días:";
    nbo_tr.appendChild(nbo_td);
    
    nbo_td = document.createElement("td");
    nbo_td.setAttribute("id","nbo_credited_clicks");
    nbo_td.setAttribute("align","right");
    nbo_td.setAttribute("class","f_r2");
    nbo_td.innerHTML = nbo_credited_clicks + "&nbsp;<a class=\"cinza_bt_p\" style=\"font-size:12px;color:#ddd !important\">=</a>";
    nbo_tr.appendChild(nbo_td);
    
    nbo_script = document.createElement('script');
    nbo_script_content = document.createTextNode("mk_tt('nbo_credited_clicks','rm','Media diaria: "+(Number(nbo_credited_clicks)/10)+" clics por día');");
    nbo_script.appendChild(nbo_script_content);
    nbo_tr.appendChild(nbo_script);
    
    nbo_container.parentNode.insertBefore(nbo_tr,nbo_container);
    
    // Direct referrals credited clicks
    if(nbo_credited_direct > 0)
    {
        nbo_tr = document.createElement("tr");
        
        nbo_td = document.createElement("td");
        nbo_td.setAttribute("align","left");
        nbo_td.setAttribute("class","f_r2 x");
        nbo_td.innerHTML = "Directos últimos 10 días:";
        nbo_tr.appendChild(nbo_td);
        
        nbo_td = document.createElement("td");
        nbo_td.setAttribute("id","nbo_credited_directs");
        nbo_td.setAttribute("align","right");
        nbo_td.setAttribute("class","f_r2");
        nbo_td.innerHTML = nbo_credited_direct + "&nbsp;<a class=\"cinza_bt_p\" style=\"font-size:12px;color:#ddd !important\">=</a>";
        nbo_tr.appendChild(nbo_td);
        
        nbo_script = document.createElement('script');
        nbo_script_content = document.createTextNode("mk_tt('nbo_credited_directs','rm','Media diaria: "+(Number(nbo_credited_direct)/Number(nbo_showed_directs)/10).toFixed(3)+" clics por día');");
        nbo_script.appendChild(nbo_script_content);
        nbo_tr.appendChild(nbo_script);
        
        nbo_container.parentNode.insertBefore(nbo_tr,nbo_container);
    }
    
    // Rented referrals credited clicks
    if(nbo_credited_rented > 0)
    {
        nbo_tr = document.createElement("tr");
        
        nbo_td = document.createElement("td");
        nbo_td.setAttribute("align","left");
        nbo_td.setAttribute("class","f_r2 x");
        nbo_td.innerHTML = "Alquilados últimos 10 días:";
        nbo_tr.appendChild(nbo_td);
        
        nbo_td = document.createElement("td");
        nbo_td.setAttribute("id","nbo_credited_rented");
        nbo_td.setAttribute("align","right");
        nbo_td.setAttribute("class","f_r2");
        nbo_td.innerHTML = nbo_credited_rented + "&nbsp;<a class=\"cinza_bt_p\" style=\"font-size:12px;color:#ddd !important\">=</a>";
        nbo_tr.appendChild(nbo_td);
        
        nbo_script = document.createElement('script');
        nbo_script_content = document.createTextNode("mk_tt('nbo_credited_rented','rm','Media diaria: "+(Number(nbo_credited_rented)/Number(nbo_showed_rented)/10).toFixed(3)+" clics por día');");
        nbo_script.appendChild(nbo_script_content);
        nbo_tr.appendChild(nbo_script);
        
        nbo_container.parentNode.insertBefore(nbo_tr,nbo_container);
    }
}