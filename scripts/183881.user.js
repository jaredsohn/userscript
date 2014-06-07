// ==UserScript==
// @name NeoBuxOx By Grcodex
// @description This scripts adds helpful information in referral listings. Designed to be fast, clean and light.
// @namespace http://userscripts.org/users/539868
// @author Proxen
// @include http://www.neobux.com/c/rl/*
// @include http://www.neobux.com/c/rs/*
// @include http://www.neobux.com/c/
// @license GNU General Public License v3.0
// @version 3.3.4
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
//version 3.0 (stable) released on the 4th of April 2012
// - New design is now fully supported
// - Fixed the total average at the bottom of the rented and direct referral listing.
//version 3.1 (stable) released on the 29th of April 2012
// - Fixed the bottom row. Information didn't appear when the user had few referrals.
// - Fixed the bug caused when a different language than Spanish or English was selected.
// - Fixed the bug were the script had the renewing expenses into account to calculate the real profit.
// - Created a system to support translations.
// - Added English as a supported language.
//version 3.2 (stable) released on the 25th of September 2013
// - Fixed the account summary page.
//version 3.2.1 (stable) released on the 25th of September 2013
// - Fixed versioning error.
//version 3.2.2 (stable) released on the 26th of September 2013
// - Fixed NaN erros that appeared in the statistics page.
//version 3.3 (stable) released on the 26th of October 2013
// - Script adapted to the new layout of the statistics page.
//version 3.3.1 (stable) released on the 26th of October 2013
// - Fixes a bug with the renewing expenses.
//version 3.3.2 (stable) released on the 12th of November 2013
// - Fixes a bug in the needed average to obtain benefits from a single referral.
//version 3.3.3 (stable) released on the 12th of November 2013
// - Fixes a bug in the needed average to obtain benefits from a single referral.
//version 3.3.4 (stable) released on the 14th of November 2013
// - Adds the minimum average needed taking into consideration or not the cost of the membership.


var nbo_version = "3.3.4 By Grcodex";
var debug = false;
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
function referralSinceDays(data, today) {
    if(data.indexOf(nbo_exact_since) == -1) {
        //User is using RELATIVE dates
        data2 = data.split(" ");
        
        //Obtain date
        if((data2[0].indexOf(nbo_isToday) != -1) || (data2[0].indexOf(nbo_isYesterday) != -1)) //Is today or yesterday?
        {
            totalDays = 0;
        }
        else //It's another day. split date
        {
            totalDays = data2[0];
        }
        
        //Obtain time
        data = data.substring(data.lastIndexOf(' '));
        data = data.split(":");
        totalHours = data[0];
        totalMinutes = data[1].replace("&nbsp;","");
        
        return new Array(totalDays,totalHours,totalMinutes);
    }else{
        //User is using EXACT dates
        //Split Date and time
        data = data.split(" ");

        var referralSince = new Date();
        
        //Obtain date
        if(data[0].indexOf(nbo_isToday) != -1) //Is today?
        {
            referralSince.setFullYear(today.getFullYear(),today.getMonth(),today.getDate());
        }
        else if(data[0].indexOf(nbo_isYesterday) != -1) //Is yesterday?
        {
            referralSince.setFullYear(today.getFullYear(),today.getMonth(),(today.getDate()-1));
        }
        else //It's another day. split date
        {
            data_temp = data[0].split("/");
            referralSince.setFullYear(data_temp[0],(data_temp[1]-1),data_temp[2]);
        }
        
        //Obtain time
        //TODO: Hardcoded! Prevent exception when there are more than two white spaces
        if(data[2].indexOf(":") != -1) {
            data = data[2].split(":");
        }else{
            data = data[3].split(":");
        }
        referralSince.setHours(data[0]);
        referralSince.setMinutes(data[1].replace("&nbsp;",""));
        
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

        return new Array(totalDays,totalHours,totalMinutes);
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
    //If no clicks stop processing and return -1
    if(data.indexOf(nbo_noClick) != -1) return -1; 
    
    var lastClick = new Date();
    
    //Obtain date
    if(data.indexOf(nbo_isToday) != -1) //Is today?
    {
        return 0;
    }
    else if(data.indexOf(nbo_isYesterday) != -1) //Is yesterday?
    {
        return 1;
    }
    else //It's another day. Split date
    {
        //Check if user is using relative dates.
        //If yes, return the number of days directly.
        if(data.indexOf('/') == -1) {
            data = data.split(' ');
            return data[0];
        }

        data = data.split("/");
        lastClick.setFullYear(data[0],(data[1]-1),data[2].replace("&nbsp;",""));
    }
    
    //Set hours and minutes to zero
    lastClick.setHours(0);
    lastClick.setMinutes(0);

    diferencia = today.getTime() - lastClick.getTime();

    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
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
    data = prompt(nbo_lang.trans.askForDays+"\n"+nbo_lang.trans.validValues+":\n"+nbo_lang.trans.validValuesExpl+"\n15, 30, 60, 90, 150 "+nbo_lang.trans.or+" 240","");
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
// Extensions chart id: ch_extensions_all
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
    
    if(chartId == "ch_cr" || chartId == "ch_recycle" || chartId == "ch_extensions_all" || chartId == "ch_autopay" || chartId == "ch_cliques" || chartId == "ch_cdd")
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

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

function numberBeautify(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function translate(language) {
    switch(language) {
        case "us":
            nbo_lang.trans = {
                //Referrals page
                profit: "Profit",
                globalProfit: "Global profit",
                clicksInTotal: "Συνολικά κλ'ικ",
                avgInTotal: "Σύνολο Avg.",
                refsClickedToday: "Refs. Κλίκ σήμερα",
                refsClickedYesterday: "Refs. Χθεσινά κλίκ",
                otherRefs: "Άλλα refs.",
                refsWithoutClicks: "Refs. Χωρίς κλίκ",
                totalProfit: "Συνολικό κέρδος",
                neobuxoxSays: "NeoBuxOx λέει",
                minAvgNeeded: "Χρειάζεται κατά μέσο όρο μεγαλύτερο από {0} να έχει κέρδος ή {1} συμπεριλαμβανομένου του κόστους των μελών.",
                askForDays: "For how many days do you usually renew?",
                validValues: "Valid values",
                validValuesExpl: "1 if you have AutoPay enabled",
                or: "or",
                //Account Summary page
                registeredSince: "{0} years, {1} months y {2} days",
                total: "Total",
                viewedAdsLastTenDaysUser: "You in the last 10 days",
                viewedAdsLastTenDaysDirect: "Direct refs. in the last 10 days",
                viewedAdsLastTenDaysRented: "Rented refs. in the last 10 days",
                dailyAvg: "Daily avg.: {0} clicks per day",
                //Statistics page
                options: "Επιλογές",
                statisticsTitle: "Στατιστικά",
                abbreviationOfDirect: "Dir",
                abbreviationOfRented: "Rent",
                abbreviationOfUpdate: "Upd",
                update: "Ενημέρωση",
                today: "Σήμερα",
                real: "Πραγματικός",
                earnings: "Αποδοχές", //Plural
                rented: "Ενοικιαζόμενων",
                direct: "Άμεσων",
                both: "και οι δύο",
                net: "Net",
                projected: "Projected",
                expenses: "Έξοδα",
                recycling: "Ανακύκλωση",
                renewing: "Ανανέωση",
                autoPay: "AutoPay",
                totalExpenses: "Σύνολο εξόδων",
                yesterday: "Εχθές",
                avg: "Μέσος όρος",
                avgRented: "Avg. των ενοικιαζόμενων",
                avgDirect: "Avg. των άμεσων",
                avgBoth: "Avg. και των δύο",
                days: "ημέρες",
                //Stript options
                renewingFor: "Κάνω ανανέωση για",
                save: "Σώζω",
                availableOptions: "Διαθέσιμες επιλογές",
                showGlobalProfit: "In the rented referrals listing, show global profit?",
                showGlobalProfitExp1: "Φαίνεται ως μια συμβουλή εργαλείου στη στήλη \"Κέρδη \" και μπορεί να το κάνει αλλά είναι λίγο αργο.",
                showGlobalProfitExp2: "Δείχνει το κέρδος που προκύπτει από την παραπομπή μετρώντας τις μέρες που ήταν και θα είναι στο λογαριασμό σας.",
                close: "Τέλος",
                savedOK: "Αποθηκεύεται σωστά",
                showYes: "Αποθηκεύεται σωστά: Ναι, το δείχνουν",
                showNo: "Saved correctlyΑποθηκεύεται σωστά: Όχι, δεν το δείχνουν",
                cookieNotFound: "NeoBuxOx couldn't find the<br />"
                            +"required data. Please,<br />"
                            +"go to your {0} o {1}<br />"
                            +"page in order to NeoBuxOx<br />"
                            +"can get the number of<br />"
                            +"referrals you have.<br />"
                            +"Thank you."
            };
        break;
        case "es":
            nbo_lang.trans = {
                //Referrals page
                profit: "Ganancia",
                globalProfit: "Ganancia global",
                clicksInTotal: "Clics en total",
                avgInTotal: "Media total",
                refsClickedToday: "Refs. clic hoy",
                refsClickedYesterday: "Refs. clic ayer",
                otherRefs: "Otros refs",
                refsWithoutClicks: "Refs. sin clic",
                totalProfit: "Ganancia total",
                neobuxoxSays: "NeoBuxOx dice",
                minAvgNeeded: "Para obtener ganancias, necesitas una media superior a {0} ó {1} si incluyes el coste de la cuenta.",
                askForDays: "¿Por cuantos días renuevas generalmente?",
                validValues: "Valores válidos",
                validValuesExpl: "1 si tienes activado el AutoPago",
                or: "ó",
                //Account Summary page
                registeredSince: "{0} años, {1} meses y {2} días",
                total: "Total",
                viewedAdsLastTenDaysUser: "Usted últimos 10 días",
                viewedAdsLastTenDaysDirect: "Directos últimos 10 días",
                viewedAdsLastTenDaysRented: "Alquilados últimos 10 días",
                dailyAvg: "Media diaria: {0} clics por día",
                //Statistics page
                options: "Opciones",
                statisticsTitle: "Estadísticas",
                abbreviationOfDirect: "Dir",
                abbreviationOfRented: "Alq",
                abbreviationOfUpdate: "Act",
                update: "Actualizar",
                today: "Hoy",
                real: "Real",
                earnings: "Ganancias", //Plural
                rented: "Alquilados",
                direct: "Directos",
                both: "Ambos",
                net: "Neta",
                projected: "Proyectado",
                expenses: "Gastos",
                recycling: "Reciclaje",
                renewing: "Renovaciones",
                autoPay: "AutoPago",
                totalExpenses: "Gasto total",
                yesterday: "Ayer",
                avg: "Medias",
                avgRented: "Media alquilados",
                avgDirect: "Media directos",
                avgBoth: "Media ambos",
                days: "días",
                //Stript options
                renewingFor: "Estoy renovando por",
                save: "Guardar",
                availableOptions: "Opciones disponibles",
                showGlobalProfit: "En la página de referidos alquilados, ¿mostrar la ganancia global?",
                showGlobalProfitExp1: "Aparece en forma de tooltip en la columna de \"Ganancia\" y puede ralentizar un poco la carga del script.",
                showGlobalProfitExp2: "Muestra lo generado por cada referido frente a los días totales que ha estado y estará en la cuenta.",
                close: "Cerrar",
                savedOK: "Guardado correctamente",
                showYes: "Guardado correctamente: Sí, mostrar",
                showNo: "Guardado correctamente: No, no mostrar",
                cookieNotFound: "No se han encontrado los<br />"
                            +"datos necesarios. Por favor,<br />"
                            +"ve a la página de referidos<br />"
                            +"{0} o {1}<br />"
                            +"para que NeoBuxOx pueda<br />"
                            +"obtener el número de<br />"
                            +"referidos que tienes.<br />"
                            +"Gracias."
            };
        break;
        default:
            translate("us");
    }
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

//if(debug)) { console.log("Account type: " + nbo_accountType); }
//if(debug)) { console.log("RRClick: " + nbo_rrClick); }
//if(debug)) { console.log("DRClick: " + nbo_drClick); }
//if(debug)) { console.log("MembershipCost: " + nbo_membershipCost); }

// Get the used language
var nbo_language = document.body.innerHTML.indexOf("c0 f-") + 5;
nbo_language = document.body.innerHTML.substring(nbo_language, nbo_language + 2);

//if(debug)) { console.log("Language: " + nbo_language); }

//Language block used in rented and direct referrals page.
var nbo_lang = {};
var nbo_isToday = null;
var nbo_isYesterday = null;
var nbo_noClick = null;
translate(nbo_language);
switch(nbo_language)
{
    case "us":
        nbo_isToday = "Today";
        nbo_isYesterday = "Yesterday";
        nbo_noClick = "No";
        nbo_exact_since = "at";
    break;
    case "es":
        nbo_isToday = "Hoy";
        nbo_isYesterday = "Ayer";
        nbo_noClick = "Sin";
        nbo_exact_since = "a las";
    break;
    case "pt":
        nbo_isToday = "Hoje";
        nbo_isYesterday = "Ontem";
        nbo_noClick = "Sem";
        nbo_exact_since = "às";
    break;
    case "gr":
        nbo_isToday = "Σήμερα";
        nbo_isYesterday = "Χθες";
        nbo_noClick = "Χωρίς";
        nbo_exact_since = "στις";
    break;
    case "id":
        nbo_isToday = "Hari";
        nbo_isYesterday = "Kemarin";
        nbo_noClick = "Belum";
        nbo_exact_since = "pada";
    break;
    case "fi":
        nbo_isToday = "Tänään";
        nbo_isYesterday = "Eilen";
        nbo_noClick = "Ei";
        nbo_exact_since = "klo";
    break;
    case "se":
        nbo_isToday = "Idag";
        nbo_isYesterday = "Igår";
        nbo_noClick = "Inga";
        nbo_exact_since = "kl.";
    break;
    case "de":
        nbo_isToday = "Heute";
        nbo_isYesterday = "Gestern";
        nbo_noClick = "Keine";
        nbo_exact_since = "um";
    break;
    case "fr":
        nbo_isToday = "Aujourd";
        nbo_isYesterday = "Hier";
        nbo_noClick = "Pas";
        nbo_exact_since = "à";
    break;
    default: //us
        nbo_isToday = "Today";
        nbo_isYesterday = "Yesterday";
        nbo_noClick = "No";
        nbo_exact_since = "at";
    break;
}

//if(debug)) { console.log("IsToday: " + nbo_isToday); }
//if(debug)) { console.log("IsYesterday: " + nbo_isYesterday); }
//if(debug)) { console.log("NoClick: " + nbo_noClick); }

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
    //if(debug)) { console.log("Page resized."); }

    //Obtain number of rented referrals and renewing cost
    var nbo_referrals = document.evaluate("//span[@class='f_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
    var nbo_renewingCost = renewingCost(nbo_referrals,nbo_accountType);

    //if(debug)) { console.log("RentedReferrals: " + nbo_referrals); }
    //if(debug)) { console.log("RenewingCost: " + nbo_renewingCost); }
    
    //Ask for how many days user renews and save it into the cookie "nbo_data".
    //Saves 15 by default or if data has incorrect format
    var nbo_renewingDays = checkCookie(nbo_referrals,-1);

    //if(debug)) { console.log("RenewingDays: " + nbo_renewingDays); }
    
    //Obtain from the cookie if showing or not the total profit
    var nbo_data = getCookie("nbo_data");
    var nbo_showTotalProfit = nbo_data.split('-')[3];

    //if(debug)) { console.log("ShowTotalProfit: " + nbo_showTotalProfit); }
    
    //Membership cost per referral
    var nbo_membershipCostPerReferral = ( nbo_membershipCost / 365 ) / nbo_referrals;

    //if(debug)) { console.log("MembershipCostPerReferral: " + nbo_membershipCostPerReferral); }

    //Obtain referrals table
    nbo_rtabla = document.evaluate("//table[@style='border-top:1px solid #aaaaaa;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    //Reduce the widht of the columns
    for(var i=1;i<nbo_rtabla.rows[0].cells.length;i++)
    {
        nbo_rtabla.rows[0].cells[i].setAttribute('style',nbo_rtabla.rows[0].cells[i].getAttribute('style').replace(/width:\d+px;/gi,""));
    }

    //if(debug)) { console.log("Width of columns reduced"); }
    //Add profit header
    var nbo_header_profit = document.createElement("td");
    nbo_header_profit.setAttribute("class", "bgt");
    nbo_header_profit.style.setProperty("font-family", "Arial,Helvetica,Verdana,sans-serif", "");
    nbo_header_profit.style.setProperty("white-space", "nowrap", null);
    nbo_header_profit.style.setProperty("text-align", "center", null);
    nbo_header_profit.innerHTML = nbo_lang.trans.profit;
    nbo_rtabla.rows[0].insertBefore(nbo_header_profit, nbo_rtabla.rows[0].childNodes[7]);

    //if(debug)) { console.log("Extra columnd added to the header"); }

    //Exact dates in last click?
    nbo_exactDatesLastClick = document.body.innerHTML.indexOf("shrd_lc=0'");
    //Exact dates in Expires in?
    nbo_exactDatesExpiresIn = document.body.innerHTML.indexOf("shrd_np=0'");
    //Exact dates in referralSince?
    nbo_exactDatesReferralSince = document.body.innerHTML.indexOf("shrd_rs=0'");
    
    //Loop referral table
    //starts from 2 because of the header and blue-green row
	for (var i=2; i<(nbo_rtabla.rows.length-2); i++)
	{
	    if(nbo_rtabla.rows[i].cells[0].getAttribute('colspan') != null) continue;//continue if intermediate row
	    
		//Add number of days since referral is in the account
        //It's painted only if user is showing exact dates
		var nbo_referralSince = nbo_rtabla.rows[i].cells[3];
		nbo_referralSince = referralSinceDays(nbo_referralSince.innerHTML,nbo_today);
        if(nbo_exactDatesReferralSince == -1) {
    		nbo_rtabla.rows[i].cells[3].innerHTML = nbo_rtabla.rows[i].cells[3].innerHTML 
    		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
    		    + '(' + nbo_referralSince[0] + 'Μέρες y ' + nbo_referralSince[1] +':' + nbo_referralSince[2] + ')'
    		    + '</span>';

            //if(debug)) { console.log("Added number of days since referral is in the account."); }
        }
		
		//Add number of days since last click
        //It's painted only if user is showing exact dates
		var nbo_lastClick = nbo_rtabla.rows[i].cells[5];
		nbo_lastClick = lastClickDays(nbo_lastClick.innerHTML,nbo_today);
        if(nbo_exactDatesLastClick == -1) { //If using exact dates, paint everything
    		nbo_rtabla.rows[i].cells[5].innerHTML = (nbo_lastClick != -1) ? nbo_rtabla.rows[i].cells[5].innerHTML 
    		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
    		    + '(' + nbo_lastClick + 'Μέρες)'
    		    + '</span'
    		    :
    		    nbo_rtabla.rows[i].cells[5].innerHTML;
        }
        //if(debug)) { console.log("Added number of days since last click."); }
		
		//Add new cell profit
		var nbo_referralClicks = nbo_rtabla.rows[i].cells[6].innerHTML.replace(/&nbsp;/gi,"");
		var nbo_referralProfit = profitGenerated(nbo_referralSince[0],nbo_referralClicks,nbo_rrClick,(Number(nbo_renewingCost)+Number(nbo_membershipCostPerReferral)));
		var nbo_cellProfit = nbo_rtabla.rows[i].insertCell(8);
		nbo_cellProfit.innerHTML = '$'+nbo_referralProfit.toFixed(3);
		nbo_cellProfit.setAttribute("id","nbo_profit_"+i);
		nbo_cellProfit.setAttribute("class","f_r cl");
		if(nbo_referralProfit >= 0)
		{//green
		    nbo_cellProfit.setAttribute("style","color:#004400;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}else{//red
		    nbo_cellProfit.setAttribute("style","color:#990000;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}
        //if(debug)) { console.log("Added new cell: profit."); }
		
		//Add profit tooltip
		if(nbo_showTotalProfit == 1)
		{
		    var nbo_remainingDays = nbo_rtabla.rows[i].cells[4].innerHTML.replace(/[^0-9]/g, '');
            
            //Hardcoded fix. Fix error if user is showing exact dates
            if(nbo_exactDatesExpiresIn == -1) {
                var nbo_referralExpires = new Date();
                nbo_referralExpires.setFullYear(nbo_remainingDays.substring(0,4),nbo_remainingDays.substring(4,6)-1,nbo_remainingDays.substring(6,8));
                nbo_referralExpires.setHours(nbo_remainingDays.substring(8,10));
                nbo_referralExpires.setMinutes(nbo_remainingDays.substring(10,12));

                //Substracting full dates
                diferencia = nbo_referralExpires.getTime() - nbo_today.getTime();
                
                if(diferencia < 0) diferencia = 0;
                
                totalDays = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                diferencia = diferencia % (1000 * 60 * 60 * 24);
                totalHours = Math.floor(diferencia / (1000 * 60 * 60));
                diferencia = diferencia % (1000 * 60 * 60);
                totalMinutes = Math.floor(diferencia / (1000 * 60));

                //Leading zeros
                if(totalHours < 10) totalHours = "0" + totalHours;
                if(totalMinutes < 10) totalMinutes = "0" + totalMinutes;

                nbo_remainingDays = String(totalDays) + String(totalHours) + String(totalMinutes);

                //Add number of days referral will expire
                //It's painted only if user is showing exact dates
                nbo_rtabla.rows[i].cells[4].innerHTML = nbo_rtabla.rows[i].cells[4].innerHTML 
                        + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
                        + '(' + totalDays + 'd y ' + totalHours +':' + totalMinutes + ')'
                        + '</span>';
                    //if(debug)) { console.log("Added number of days since referral is in the account."); }
            }
            
		    nbo_remainingDays = (Number(nbo_referralSince[0]) + Number(nbo_remainingDays.substring(0,nbo_remainingDays.length-4))) * 24 * 60
		        + (Number(nbo_referralSince[1])+Number(nbo_remainingDays.substring(nbo_remainingDays.length-4,nbo_remainingDays.length-2))) * 60
		        + (Number(nbo_referralSince[2])+Number(nbo_remainingDays.substring(nbo_remainingDays.length-2)));
		    nbo_remainingDays = Math.floor(nbo_remainingDays/(60 * 24));
		    var nbo_referralHasToPay = renewingCost(nbo_referrals,nbo_accountType) * nbo_remainingDays / 30;
		    var nbo_referralTotalProfit = nbo_referralClicks * nbo_rrClick - nbo_referralHasToPay - (nbo_membershipCostPerReferral * nbo_remainingDays);
		    var nbo_script = document.createElement('script');
            var nbo_script_content = document.createTextNode("mk_tt('nbo_profit_"+i+"','bm','"+nbo_lang.trans.globalProfit+": $"+nbo_referralTotalProfit.toFixed(3)+"');");
            nbo_script.appendChild(nbo_script_content);
            nbo_rtabla.rows[i].appendChild(nbo_script);

            //if(debug)) { console.log("Added profit tooltip."); }
        }
        
		
		//Obtain data to write in the last row
		nbo_totalProfit = Number(nbo_totalProfit) + Number(nbo_referralProfit);
		nbo_totalClicks = Number(nbo_totalClicks) + Number(nbo_referralClicks);
        nbo_tempAvg = nbo_rtabla.rows[i].cells[7].innerHTML.replace(/&nbsp;/gi,"");
        if(isNaN(nbo_tempAvg)) {
            nbo_tempAvg = 0;
        }
		nbo_totalAvg = Number(nbo_totalAvg) + Number(nbo_tempAvg);
		switch(nbo_lastClick)
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
        //if(debug)) { console.log("Data to write in the last row obtained."); }
	}//End loop
	
	//Adds information to the last row
	var nbo_ultimaFila = nbo_rtabla.rows[nbo_rtabla.rows.length-1].cells[0];
    if(document.getElementById('rlpp') != null && Number(document.getElementById('rlpp').value) < nbo_referrals) {
        nbo_totalAvg = (nbo_totalAvg/document.getElementById('rlpp').value).toFixed(2);
    }else{
        nbo_totalAvg = (nbo_totalAvg/nbo_referrals).toFixed(2);
    }
	nbo_ultimaFila.setAttribute("style","font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:center;");
	nbo_ultimaFila.innerHTML = nbo_lang.trans.clicksInTotal+": "+nbo_totalClicks+"&nbsp;&nbsp;&nbsp;"
        +nbo_lang.trans.avgInTotal+": "+nbo_totalAvg+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.refsClickedToday+": "+nbo_clickedToday+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.refsClickedYesterday+": "+nbo_clickedYesterday+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.otherRefs+": "+nbo_clickedOtherDay+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.refsWithoutClicks+": "+nbo_zeroClickers+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.totalProfit+": $"+nbo_totalProfit.toFixed(3);
    //if(debug)) { console.log("Added information in the last row."); }
	
	//Update width of some rows (colspan)
	var nbo_columnas = nbo_rtabla.rows[0].cells.length;
	nbo_rtabla.rows[1].cells[0].setAttribute("colspan",nbo_columnas+2);
	nbo_rtabla.rows[nbo_rtabla.rows.length-2].cells[0].setAttribute("colspan",nbo_columnas+2);
	nbo_rtabla.rows[nbo_rtabla.rows.length-1].cells[0].setAttribute("colspan",nbo_columnas+2);
    //if(debug)) { console.log("Width of some columns updated."); }
	
	//Adds information about individual referrals under the table of rented referrals.
    var nbo_singleRefInfoTD = document.evaluate("//td[@style='font-size:12px;color:#707070']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    nbo_singleRefInfoTD.innerHTML += "<br /><strong>"+nbo_lang.trans.neobuxoxSays+":</strong>";
    var nbo_minAvgNeeded = ( ( ( (100-discountObtained()) * renewingCost(nbo_referrals,nbo_accountType) / 100 )  ) / nbo_rrClick / 30 );
    var nbo_minAvgNeededWithMembership = nbo_minAvgNeeded + (nbo_membershipCost / 365 / nbo_referrals / nbo_rrClick);
    nbo_singleRefInfoTD.innerHTML += " " + nbo_lang.trans.minAvgNeeded.format(
        "<strong>"+nbo_minAvgNeeded.toFixed(3)+"</strong>",
        "<strong>"+nbo_minAvgNeededWithMembership.toFixed(3)+"</strong>"
    );
    //if(debug)) { console.log("Added extra information under the table."); }
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
    nbo_header_profit.innerHTML = nbo_lang.trans.profit;
    nbo_rtabla.rows[0].insertBefore(nbo_header_profit, nbo_rtabla.rows[0].childNodes[7]);

    //Exact dates in last click?
    nbo_exactDatesLastClick = document.body.innerHTML.indexOf("shrd_lc=0'");
    //Exact dates in referralSince?
    nbo_exactDatesReferralSince = document.body.innerHTML.indexOf("shrd_rs=0'");
    
    //Loop referral table
    //starts from 2 because of the header and blue-green row
    for (var i=2; i<(nbo_rtabla.rows.length-2); i++) {
        if(nbo_rtabla.rows[i].cells[0].getAttribute('colspan') != null) continue;//continue if intermediate row
        
		//Add number of days since referral is in the account
        //It's painted only if user is showing exact dates
		var nbo_referralSince = nbo_rtabla.rows[i].cells[3];
		var nbo_referralSince = referralSinceDays(nbo_referralSince.innerHTML,nbo_today);
		if(nbo_exactDatesReferralSince == -1) {
            nbo_rtabla.rows[i].cells[3].innerHTML = nbo_rtabla.rows[i].cells[3].innerHTML 
    		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
    		    + '(' + nbo_referralSince[0] + 'd y ' + nbo_referralSince[1] +':' + nbo_referralSince[2] + ')'
    		    + '</span>';
        }
		
		//Add number of days since last click
        //It's painted only if user is showing exact dates
		var nbo_lastClick = nbo_rtabla.rows[i].cells[4];
		var nbo_lastClick = lastClickDays(nbo_lastClick.innerHTML,nbo_today);
        if(nbo_exactDatesLastClick == -1) { //If using exact dates, paint everything
    		nbo_rtabla.rows[i].cells[4].innerHTML = (nbo_lastClick != -1) ? nbo_rtabla.rows[i].cells[4].innerHTML 
    		    + '<span style="color:#666;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;font-style:italic">'
    		    + '(' + nbo_lastClick + 'd)'
    		    + '</span'
    		    :
    		    nbo_rtabla.rows[i].cells[4].innerHTML;
        }
		
		//Add new cell profit
		var nbo_referralClicks = nbo_rtabla.rows[i].cells[5].innerHTML.replace(/&nbsp;/gi,"");
		var nbo_referralProfit = nbo_referralClicks * nbo_drClick;
		var nbo_cellProfit = nbo_rtabla.rows[i].insertCell(7);
		nbo_cellProfit.innerHTML = '$'+nbo_referralProfit.toFixed(3);
		nbo_cellProfit.setAttribute("class","f_r cl");
		if(nbo_referralProfit >= 0)
		{
		    nbo_cellProfit.setAttribute("style","color:#004400;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}else{
		    nbo_cellProfit.setAttribute("style","color:#990000;font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:right;");
		}
		
		//Obtain data to write in the last row
		nbo_totalProfit = Number(nbo_totalProfit) + Number(nbo_referralProfit);
		nbo_totalClicks = Number(nbo_totalClicks) + Number(nbo_referralClicks);
		nbo_tempAvg = nbo_rtabla.rows[i].cells[6].innerHTML.replace(/&nbsp;/gi,"");
        if(isNaN(nbo_tempAvg)) {
            nbo_tempAvg = 0;
        }
        nbo_totalAvg = Number(nbo_totalAvg) + Number(nbo_tempAvg);
		switch(nbo_lastClick)
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
    if(document.getElementById('rlpp') != null && Number(document.getElementById('rlpp').value) < nbo_referrals) {
        nbo_totalAvg = (nbo_totalAvg/document.getElementById('rlpp').value).toFixed(2);
    }else{
        nbo_totalAvg = (nbo_totalAvg/nbo_referrals).toFixed(2);
    }
	nbo_ultimaFila.setAttribute("style","font-family:Arial,Helvetica,Verdana,sans-serif;font-size:12px;text-align:center;");
    nbo_ultimaFila.innerHTML = nbo_lang.trans.clicksInTotal+": "+nbo_totalClicks+"&nbsp;&nbsp;&nbsp;"
        +nbo_lang.trans.avgInTotal+": "+nbo_totalAvg+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.refsClickedToday+": "+nbo_clickedToday+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.refsClickedYesterday+": "+nbo_clickedYesterday+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.otherRefs+": "+nbo_clickedOtherDay+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.refsWithoutClicks+": "+nbo_zeroClickers+"&nbsp;&nbsp;&nbsp;"
	    +nbo_lang.trans.totalProfit+": $"+nbo_totalProfit.toFixed(3);
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////Statistics page///////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
if( location.href.indexOf("www.neobux.com/c/rs") != -1 )
{
    //if(debug)) { console.log("Statistics page!"); }
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

    //if(debug)) { console.log("Page resized."); }
    
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
        var nbo_stable = document.evaluate("//table[@width='100%' and @style='width:100%;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
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
                case "ch_extensions_all": //Extensions chart
                    nbo_chartValues = nbo_chartValues.reverse();
                    if(nbo_chartValues[0] == '') {
                        nbo_renewedToday = nbo_chartValues[1];
                        nbo_renewedYesterday = nbo_chartValues[2];
                    }else{
                        nbo_renewedToday = nbo_chartValues[0];
                        nbo_renewedYesterday = nbo_chartValues[1];
                    }
                    var tempLength = 10; //Needed because sometimes there is an empty extra value.
                    for(var n=0;n<tempLength;n++)
                    {
                        if(nbo_chartValues[n] != '') {
                            nbo_renewedTotal = Number(nbo_renewedTotal) + Number(nbo_chartValues[n]);
                        }else{
                            tempLength++;
                        }
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

        //if(debug)) { console.log("Dir. Clicks: " + nbo_dTotalClicks + " | Ren. Clicks: " + nbo_rTotalClicks + " | Recycle: " + nbo_recycledTotal + " | Renew: " + nbo_renewedTotal + " | AutoPay: " + nbo_autopayTotal); }
        
        //Obtain proyected avgs:
        var nbo_ProjectedAvgs = document.evaluate("//span[@style='font-size:22px;color:#00a0ee']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var nbo_dProjectedAvg = nbo_ProjectedAvgs.snapshotItem(1).innerHTML;
        var nbo_rProjectedAvg = nbo_ProjectedAvgs.snapshotItem(2).innerHTML;

        //if(debug)) { console.log("Projected Direct: " + nbo_dProjectedAvg + " | Projected Rented: " + nbo_rProjectedAvg); }
        
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
        
        //if(debug)) { console.log("Expenses per day: " + nbo_expensesPerDay); }

        //if(debug)) { console.log("Start adding data to column."); }

        //Add data to the column
        var nbo_sdiv = document.createElement("div");
        nbo_sdiv.setAttribute("style","margin:5px;font-size:10px;");
        
        //Script data
        var nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","font-size:8px;color:#999;");
        nbo_sspan.innerHTML = "<div style=\"float:left;font-size:8px;\"><a style=\"color:#999;font-weight:normal;\" href=\"http://userscripts.org/scripts/show/108933\" target=\"_blank\">NeoBuxOx v"+nbo_version+"</a></div> <div style=\"float:right;font-size:8px;cursor:pointer;\" onClick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">("+nbo_lang.trans.options+")</div><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //title
        nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","font-size:12px;text-align:center;color:#444;");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.statisticsTitle+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //direct and rented referrals
        nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","text-align:center;font-size:10px;");
        nbo_sspan.innerHTML = nbo_lang.trans.abbreviationOfDirect+": "+nbo_directReferrals
            +" <a style=\"color:#999;font-weight:normal;text-decoration:underline !important;\" href=\"http://www.neobux.com/c/rl/?ss3=1\" title=\""
            +nbo_lang.trans.update+"\" alt=\""+nbo_lang.trans.update+"\">"+nbo_lang.trans.abbreviationOfUpdate+"</a> | "
            +nbo_lang.trans.abbreviationOfRented+": "+nbo_rentedReferrals
            +" <a style=\"color:#999;font-weight:normal;text-decoration:underline !important;\" href=\"http://www.neobux.com/c/rl/?ss3=2\" title=\""
            +nbo_lang.trans.update+"\" alt=\""+nbo_lang.trans.update+"\">"+nbo_lang.trans.abbreviationOfUpdate+"</a><br /><br />";
        nbo_sdiv.appendChild(nbo_sspan);

        //if(debug)) { console.log("Start adding today data to column."); }
        
        //Today
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.today+"</strong> - "+nbo_lang.trans.real+": $"+Number((nbo_rTodayClicks * nbo_rrClick)+(nbo_dTodayClicks * nbo_drClick)-nbo_recycledToday-nbo_expensesPerDay).toFixed(3)+"<hr />";//-nbo_renewedToday-nbo_autopayToday
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.earnings+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.rented+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rTodayClicks * nbo_rrClick).toFixed(3)+" ("+nbo_rTodayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.direct+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dTodayClicks * nbo_drClick).toFixed(3)+" ("+nbo_dTodayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.both+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTodayClicks * nbo_rrClick)+(nbo_dTodayClicks * nbo_drClick)).toFixed(3)+" ("+(Number(nbo_dTodayClicks)+Number(nbo_rTodayClicks))+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.net+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTodayClicks * nbo_rrClick)+(nbo_dTodayClicks * nbo_drClick)-nbo_recycledToday-nbo_renewedToday-nbo_autopayToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.projected+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.rented+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rProjectedAvg * nbo_rentedReferrals * nbo_rrClick).toFixed(3)+" ("+Number(nbo_rProjectedAvg * nbo_rentedReferrals).toFixed(0)+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.direct+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dProjectedAvg * nbo_directReferrals * nbo_drClick).toFixed(3)+" ("+Number(nbo_dProjectedAvg * nbo_directReferrals).toFixed(0)+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.both+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_dProjectedAvg * nbo_directReferrals * nbo_drClick) + (nbo_rProjectedAvg * nbo_rentedReferrals * nbo_rrClick)).toFixed(3)+" ("+Number((nbo_dProjectedAvg * nbo_directReferrals)+(nbo_rProjectedAvg * nbo_rentedReferrals)).toFixed(0)+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.expenses+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.recycling+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.renewing+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_renewedToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.autoPay+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_autopayToday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.totalExpenses+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledToday+nbo_renewedToday+nbo_autopayToday).toFixed(3)+"<br /><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //if(debug)) { console.log("Start adding yesterday data to column."); }
        
        //Yesterday
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.yesterday+"</strong> - Real: $"+Number((nbo_rYesterdayClicks * nbo_rrClick)+(nbo_dYesterdayClicks * nbo_drClick)-nbo_recycledYesterday-nbo_expensesPerDay).toFixed(3)+"<hr />";//-nbo_renewedYesterday-nbo_autopayYesterday
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.earnings+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.rented+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rYesterdayClicks * nbo_rrClick).toFixed(3)+" ("+nbo_rYesterdayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);

        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.direct+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dYesterdayClicks * nbo_drClick).toFixed(3)+" ("+nbo_dYesterdayClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.both+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rYesterdayClicks * nbo_rrClick)+(nbo_dYesterdayClicks * nbo_drClick)).toFixed(3)+" ("+(Number(nbo_dYesterdayClicks)+Number(nbo_rYesterdayClicks))+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.net+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rYesterdayClicks * nbo_rrClick)+(nbo_dYesterdayClicks * nbo_drClick)-nbo_recycledYesterday-nbo_renewedYesterday-nbo_autopayYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);

        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.avg+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.avgRented+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        if(nbo_rentedReferrals == 0) {
            nbo_sspan.innerHTML = Number(0).toFixed(3) + "<br />";
        }else{
            nbo_sspan.innerHTML = Number(nbo_rYesterdayClicks / nbo_rentedReferrals).toFixed(3)+"<br />";
        }
        nbo_sdiv.appendChild(nbo_sspan);

        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.avgDirect+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        if(nbo_directReferrals == 0) {
            nbo_sspan.innerHTML = Number(0).toFixed(3)+"<br />";
        }else{
            nbo_sspan.innerHTML = Number(nbo_dYesterdayClicks / nbo_directReferrals).toFixed(3)+"<br />";
        }
        nbo_sdiv.appendChild(nbo_sspan);

        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.avgBoth+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        if(nbo_directReferrals == 0 && nbo_rentedReferrals == 0) {
            nbo_sspan.innerHTML = Number(0).toFixed(3)+"<br />";
        }else{
            nbo_sspan.innerHTML = (Number(Number(nbo_rYesterdayClicks)+Number(nbo_dYesterdayClicks)) / (Number(nbo_rentedReferrals)+Number(nbo_directReferrals))).toFixed(3)+"<br />";
        }
        nbo_sdiv.appendChild(nbo_sspan);

        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.expenses+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.recycling+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.renewing+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_renewedYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.autoPay+": ";
        nbo_sdiv.appendChild(nbo_sspan);

        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_autopayYesterday).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.totalExpenses+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledYesterday + nbo_renewedYesterday + nbo_autopayYesterday).toFixed(3)+"<br /><br />";
        nbo_sdiv.appendChild(nbo_sspan);

        //if(debug)) { console.log("Start adding global data to column."); }
        
        //Global
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>10 "+nbo_lang.trans.days+"</strong> - "+nbo_lang.trans.real+": $"+Number((nbo_rTotalClicks * nbo_rrClick)+(nbo_dTotalClicks * nbo_drClick)-nbo_recycledTotal-(nbo_expensesPerDay*10)).toFixed(3)+"<hr />";//-nbo_renewedTotal-nbo_autopayTotal
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.earnings+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.rented+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_rTotalClicks * nbo_rrClick).toFixed(3)+" ("+nbo_rTotalClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.direct+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_dTotalClicks * nbo_drClick).toFixed(3)+" ("+nbo_dTotalClicks+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.both+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTotalClicks * nbo_rrClick)+(nbo_dTotalClicks * nbo_drClick)).toFixed(3)+" ("+(Number(nbo_dTotalClicks)+Number(nbo_rTotalClicks))+")<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.net+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number((nbo_rTotalClicks * nbo_rrClick)+(nbo_dTotalClicks * nbo_drClick)-nbo_recycledTotal-nbo_renewedTotal-nbo_autopayTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.avg+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.avgRented+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        if(nbo_rentedReferrals == 0) {
            nbo_sspan.innerHTML = Number(0).toFixed(3)+"<br />";
        }else{
            nbo_sspan.innerHTML = Number(Number(nbo_rTotalClicks / nbo_rentedReferrals)/10).toFixed(3)+"<br />";
        }
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.avgDirect+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        if(nbo_directReferrals == 0) {
            nbo_sspan.innerHTML = Number(0).toFixed(3)+"<br />";
        }else{
            nbo_sspan.innerHTML = Number(Number(nbo_dTotalClicks / nbo_directReferrals)/10).toFixed(3)+"<br />";
        }
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.avgBoth+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        if(nbo_rentedReferrals == 0 && nbo_directReferrals) {
            nbo_sspan.innerHTML = Number(0).toFixed(3)+"<br />";
        }else{
            nbo_sspan.innerHTML = (Number(Number(Number(nbo_rTotalClicks)+Number(nbo_dTotalClicks)) / (Number(nbo_rentedReferrals)+Number(nbo_directReferrals)))/10).toFixed(3)+"<br />";
        }
        nbo_sdiv.appendChild(nbo_sspan);

        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.expenses+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.recycling+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_recycledTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.renewing+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_renewedTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.autoPay+": ";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.setAttribute("style","color:#444");
        nbo_sspan.innerHTML = "$"+Number(nbo_autopayTotal).toFixed(3)+"<br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = "&nbsp;&nbsp;"+nbo_lang.trans.totalExpenses+": ";
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

        //if(debug)) { console.log("Added separating column."); }
        
        //Add the new column to the table
        nbo_stable.rows[0].appendChild(nbo_scolumn);

        //if(debug)) { console.log("Column appended."); }
        
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
        nbo_close.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">"+nbo_lang.trans.close+"</a>";
        nbo_opts.appendChild(nbo_close);
        
        var nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = nbo_lang.trans.renewingFor+': <input id="nbo_options_days" type="text" name="nbo_options_days" value="'+nbo_renewingDays+'" size="3" maxlength="3" /> '+nbo_lang.trans.days
            +' <button type="button" onClick="document.cookie =\'nbo_data=\'+document.getElementById(\'nbo_options_days\').value+\'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-'+nbo_tprofit+';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML=\''+nbo_lang.trans.savedOK+': \'+document.getElementById(\'nbo_options_days\').value+\' '+nbo_lang.trans.days+'\';">'+nbo_lang.trans.save+'</button><br /><span style="font-size:10px;color:#666;">'+nbo_lang.trans.availableOptions+': 1 ('+nbo_lang.trans.autoPay+'), 15, 30, 60, 90, 150 o 240</span><br /></br>';
        nbo_opts.appendChild(nbo_opt_option);
        
        var nbo_opt_tprofit_checked = (nbo_tprofit==1)?"checked":"";
        nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = nbo_lang.trans.showGlobalProfit+': <input id="nbo_options_tprofit" type="checkbox" name="nbo_options_tprofit" value="'+nbo_tprofit+'" '+nbo_opt_tprofit_checked+'/>'
            +' <button type="button" onClick="var nbo_opt_tprofit_checked = (document.getElementById(\'nbo_options_tprofit\').checked)?1:0;document.cookie =\'nbo_data='+nbo_renewingDays+'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-\'+nbo_opt_tprofit_checked+\';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML= (document.getElementById(\'nbo_options_tprofit\').checked)?\''+nbo_lang.trans.showYes+'\':\''+nbo_lang.trans.showNo+'\';">'+nbo_lang.trans.save+'</button><br /><span style="font-size:10px;color:#666;">'
            +nbo_lang.trans.showGlobalProfitExp1+'<br />'
            +nbo_lang.trans.showGlobalProfitExp2+'</span><br /></br>';
        nbo_opts.appendChild(nbo_opt_option);
        
        nbo_opt_option = document.createElement("div");
        nbo_opt_option.setAttribute("id","nbo_opt_result");
        nbo_opt_option.setAttribute("style","font-size:10px;color:#338800;text-align:center;");
        nbo_opts.appendChild(nbo_opt_option);
        
        nbo_opts_container.appendChild(nbo_opts);
        document.body.appendChild(nbo_opts_container);
        //if(debug)) { console.log("Statistics page end!"); }
    }catch(err) {
        //if(debug)) { console.log("Error!"); }
        //Obtain statistics table
        var nbo_stable = document.evaluate("//table[@width='100%' and @style='width:100%;']", document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

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
        nbo_sspan.innerHTML = "<div style=\"float:left;font-size:8px;\"><a style=\"color:#999;font-weight:normal;\" href=\"http://userscripts.org/scripts/show/108933\" target=\"_blank\">NeoBuxOx v"+nbo_version+"</a></div> <div style=\"float:right;font-size:8px;cursor:pointer;\" onClick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">("+nbo_lang.trans.options+")</div><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //title
        nbo_sspan = document.createElement("div");
        nbo_sspan.setAttribute("style","font-size:12px;text-align:center;color:#444;");
        nbo_sspan.innerHTML = "<strong>"+nbo_lang.trans.statisticsTitle+"</strong><br />";
        nbo_sdiv.appendChild(nbo_sspan);
        
        //Explanation
        nbo_sspan = document.createElement("span");
        nbo_sspan.innerHTML = nbo_lang.trans.cookieNotFound.format("<a href=\"http://www.neobux.com/c/rl/?ss3=1\" title=\""+nbo_lang.trans.direct+"\" alt=\""+nbo_lang.trans.direct+"\">"+nbo_lang.trans.direct+"</a>", "<a href=\"http://www.neobux.com/c/rl/?ss3=2\" title=\""+nbo_lang.trans.rented+"\" alt=\""+nbo_lang.trans.rented+"\">"+nbo_lang.trans.rented+"</a>");
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
        nbo_close.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"nbo_opts_container=document.getElementById('nbo_opts_container');nbo_opts_container.style.visibility = (nbo_opts_container.style.visibility == 'visible') ? 'hidden' : 'visible';\">"+nbo_lang.trans.close+"</a>";
        nbo_opts.appendChild(nbo_close);
        
        var nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = nbo_lang.trans.renewingFor+': <input id="nbo_options_days" type="text" name="nbo_options_days" value="'+nbo_renewingDays+'" size="3" maxlength="3" /> '+nbo_lang.trans.days
            +' <button type="button" onClick="document.cookie =\'nbo_data=\'+document.getElementById(\'nbo_options_days\').value+\'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-'+nbo_tprofit+';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML=\''+nbo_lang.trans.savedOK+': \'+document.getElementById(\'nbo_options_days\').value+\' '+nbo_lang.trans.days+'\';">"'+nbo_lang.trans.save+'"</button><br /><span style="font-size:10px;color:#666;">'+nbo_lang.trans.availableOptions+': 1 ('+nbo_lang.trans.autoPay+'), 15, 30, 60, 90, 150 o 240</span><br /></br>';
        nbo_opts.appendChild(nbo_opt_option);
        
        var nbo_opt_tprofit_checked = (nbo_tprofit==1)?"checked":"";
        nbo_opt_option = document.createElement("div");
        nbo_opt_option.innerHTML = nbo_lang.trans.showGlobalProfit+': <input id="nbo_options_tprofit" type="checkbox" name="nbo_options_tprofit" value="'+nbo_tprofit+'" '+nbo_opt_tprofit_checked+'/>'
            +' <button type="button" onClick="var nbo_opt_tprofit_checked = (document.getElementById(\'nbo_options_tprofit\').checked)?1:0;document.cookie =\'nbo_data='+nbo_renewingDays+'-'+nbo_rentedReferrals+'-'+nbo_directReferrals+'-\'+nbo_opt_tprofit_checked+\';expires='+nbo_today.toUTCString()+';path=/;\';document.getElementById(\'nbo_opt_result\').innerHTML= (document.getElementById(\'nbo_options_tprofit\').checked)?\''+nbo_lang.trans.showYes+'\':\''+nbo_lang.trans.showNo+'\';">'+nbo_lang.trans.save+'</button><br /><span style="font-size:10px;color:#666;">'
            +nbo_lang.trans.showGlobalProfitExp1+'<br />'
            +nbo_lang.trans.showGlobalProfitExp2+'.</span><br /></br>';
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
if(location.href == "http://www.neobux.com/c/" || (location.href.indexOf("http://www.neobux.com/c/?vl=") != -1 && location.href.indexOf("&") == -1))
{
    //Current date
    var nbo_today = new Date();
    
    //Calculates the amount of days since the sign up
    var nbo_registered_date = document.evaluate("//span[@style='color:#000;']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    nbo_registered_days = lastClickDays(nbo_registered_date.innerHTML,nbo_today);
    
    //Puts a beautull format to the amount of time since the sign up
    var nbo_registered_years = Math.floor(nbo_registered_days / 365);
    var nbo_aux = nbo_registered_days % 365;
    var nbo_registered_months= Math.floor(nbo_aux / 30);
    nbo_aux = nbo_aux % 30;

    //Appends a tooltip to show the amout of time
    nbo_registered_date.setAttribute("id","nbo_registered_date");
    var nbo_script = document.createElement('script');
    var nbo_script_content = document.createTextNode("mk_tt('nbo_registered_date','rm','"
        +nbo_lang.trans.registeredSince.format(nbo_registered_years,nbo_registered_months,nbo_aux)+"');");
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
        nbo_span.innerHTML = "<span style=\"color:#707070\">"+nbo_lang.trans.total+":</span> " + numberBeautify(Number(nbo_showed_directs) + Number(nbo_showed_rented));
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
    nbo_span.innerHTML = "<span style=\"color:#707070\">"+nbo_lang.trans.total+":</span> " + numberBeautify(Number(nbo_viewed_user.replace(/,/g, '')) + Number(nbo_viewed_referrals.replace(/,/g, '')));
    nbo_container_ads.appendChild(nbo_span);
    //Ads the average of own clicks
    var nbo_container_tooltip = nbo_container.nextSibling.childNodes[1];
    nbo_container_tooltip.setAttribute("id","nbo_user_clicks_avg");
    
    nbo_script = document.createElement('script');
    nbo_script_content = document.createTextNode("mk_tt('nbo_user_clicks_avg','rm','"+
        nbo_lang.trans.dailyAvg.format((Number(nbo_viewed_user.replace(/,/g, ''))/Number(nbo_registered_days)).toFixed(3))+"');");
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
    nbo_td.innerHTML = nbo_lang.trans.viewedAdsLastTenDaysUser+":";
    nbo_tr.appendChild(nbo_td);
    
    nbo_td = document.createElement("td");
    nbo_td.setAttribute("id","nbo_credited_clicks");
    nbo_td.setAttribute("align","right");
    nbo_td.setAttribute("class","f_r2");
    nbo_td.innerHTML = numberBeautify(nbo_credited_clicks) + "&nbsp;<a class=\"cinza_bt_p\" style=\"font-size:12px;color:#ddd !important\">=</a>";
    nbo_tr.appendChild(nbo_td);
    
    nbo_script = document.createElement('script');
    nbo_script_content = document.createTextNode("mk_tt('nbo_credited_clicks','rm','"+nbo_lang.trans.dailyAvg.format((Number(nbo_credited_clicks)/10))+"');");
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
        nbo_td.innerHTML = nbo_lang.trans.viewedAdsLastTenDaysDirect+":";
        nbo_tr.appendChild(nbo_td);
        
        nbo_td = document.createElement("td");
        nbo_td.setAttribute("id","nbo_credited_directs");
        nbo_td.setAttribute("align","right");
        nbo_td.setAttribute("class","f_r2");
        nbo_td.innerHTML = numberBeautify(nbo_credited_direct) + "&nbsp;<a class=\"cinza_bt_p\" style=\"font-size:12px;color:#ddd !important\">=</a>";
        nbo_tr.appendChild(nbo_td);
        
        nbo_script = document.createElement('script');
        nbo_script_content = document.createTextNode("mk_tt('nbo_credited_directs','rm','"+nbo_lang.trans.dailyAvg.format((Number(nbo_credited_direct)/Number(nbo_showed_directs)/10).toFixed(3))+"');");
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
        nbo_td.innerHTML = nbo_lang.trans.viewedAdsLastTenDaysRented+":";
        nbo_tr.appendChild(nbo_td);
        
        nbo_td = document.createElement("td");
        nbo_td.setAttribute("id","nbo_credited_rented");
        nbo_td.setAttribute("align","right");
        nbo_td.setAttribute("class","f_r2");
        nbo_td.innerHTML = numberBeautify(nbo_credited_rented) + "&nbsp;<a class=\"cinza_bt_p\" style=\"font-size:12px;color:#ddd !important\">=</a>";
        nbo_tr.appendChild(nbo_td);
        
        nbo_script = document.createElement('script');
        nbo_script_content = document.createTextNode("mk_tt('nbo_credited_rented','rm','"+nbo_lang.trans.dailyAvg.format((Number(nbo_credited_rented)/Number(nbo_showed_rented)/10).toFixed(3))+"');");
        nbo_script.appendChild(nbo_script_content);
        nbo_tr.appendChild(nbo_script);
        
        nbo_container.parentNode.insertBefore(nbo_tr,nbo_container);
    }
}