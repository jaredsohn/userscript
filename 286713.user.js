// ==UserScript==
// @name       WME Public Holiday Restrictor
// @namespace  wme-champs-it
// @version    0.5.3
// @description  Set restriction on the selected segments for all the Italian public holidays
// @updateURL  http://userscripts.org/scripts/source/286713.user.js
// @include    https://*.waze.com/editor/*
// @include    https://*.waze.com/*/editor/*
// @include    https://*.waze.com/map-editor/*
// @include    https://*.waze.com/beta_editor/*
// @include    https://editor-beta.waze.com/*
// @copyright  2014+, bedo2991
// ==/UserScript==

function phGlobals()
{
    week_days={"Su":0,"Mo":1,"Tu":2,"We":3,"Th":4,"Fr":5,"Sa":6};
    restrictedTypes=null;
    phVersion = "0.5.3";
    PHtime_restrict = false;
    PHstart_time='';
    PHend_time='';
    url = 'https://docs.google.com/forms/d/1mLXoj-Bh4m6mJQpb6sMnE_ZCD9LXrzsux-D5sYpPN2I/viewform';
    //Next year just change the year in the following line and the moving_holidays dates.
    year = 2014;
    mesi = { "January":1, "February":2, "March":3, "April":4, "May":5, "June":6,  "July":7,  "August":8, "September":9, "October":10, "November":11, "December":12 };
    fixed_holidays = [{name:"Capodanno", on:"01/01/"+year},
                      {name:"Epifania", on:"06/01/"+year},
                      {name:"25 Aprile", on: "25/04/"+year},
                      {name:"Primo Maggio", on: "01/05/"+year},
                      {name:"2 Giugno", on: "02/06/"+year},
                      {name:"Ferragosto", on: "15/08/"+year},
                      {name:"Ognissanti", on: "01/11/"+year},
                       {name:"Immacolata Concezione", on: "08/12/"+year},
                       {name:"Natale", on: "25/12/"+year},
                       {name:"Santo Stefano", on: "26/12/"+year}
    ];
    moving_holidays = [{name:"Pasqua", on:"20/04/"+year},
                      {name:"Pasquetta", on:"21/04/"+year}
                     ];
}

function bootstrapPH() {
	var bGreasemonkeyServiceDefined = false;
    
	try {
		bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
	}
	catch (err) { /* Ignore */
	}

	if (typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined) {
		unsafeWindow = (function() {
			var dummyElem = document.createElement('p');
			dummyElem.setAttribute('onclick', 'return window;');
			return dummyElem.onclick();
		})();
	}

	/* begin running the code! */
	initPH();
}

function phWazeBits() {
	Waze = unsafeWindow.Waze;
	wazeMap = unsafeWindow.wazeMap;
	wazeModel = unsafeWindow.wazeModel;
	loginManager = unsafeWindow.loginManager;
	selectionManager = unsafeWindow.selectionManager;
	jq = unsafeWindow.jQuery;
}

function pickDate(calendar, date)
{
    //alert('Picking date ' + date + ' on ' + calendar);
    var literalMonth = $(calendar+ ' thead th').not('.available')[0].textContent;
    //alert('LITERALMONTH: '+literalMonth);
    var splitresult= literalMonth.split(' ');
    var monthname = splitresult[0];
    var calendar_year = splitresult[1] * 1;
    //alert(monthname);
    var m = mesi[monthname];
	var datepieces = date.split("/");
    var day = datepieces[0] * 1;
    var month = datepieces[1] * 1;
    var year = datepieces[2] * 1;
    
    while(calendar_year !=  year)
    {
        //console.log('CALENDAR:'+calendar_year+' io cerco: '+year);
    	if(calendar_year > year)
        {
        	//Go back 12 months
            for(var i=0; i<12; i++)
            {
            	if($(calendar+ ' th.prev.available').length)
                    $(calendar+ ' th.prev.available')[0].click();
                else
                    return false;
            }
            calendar_year--;
        }
        else
        {
        	//Go forth 12 months
            for(var i=0; i<12; i++)
            {
            	if($(calendar+ ' th.next.available').length)
                    $(calendar+ ' th.next.available')[0].click();
                else
                    return false;
            }
            calendar_year++;
        }
    }
    //console.log('Looking for month: ' + month);
    while(month != m)
    {
        //console.log('Now is ' + m);
        if(month < m)
        {
         //Vai indietro
            if($(calendar+ ' th.prev.available').length > 0)
            {
                $(calendar+ ' th.prev.available')[0].click();
            }
            else
            {
            	console.log('Could not go back');
                return false;
            }
            m--;
        }
        else
        {
        //Vai avanti
            if($(calendar+ ' th.next.available').length)
            {
                $(calendar+ ' th.next.available')[0].click();
            	m++;
            }
            else
            {
                console.log('Could not go forward');
                return false;
            }
        }
    }
    //Click on the day
    var days = $(calendar+ ' tbody td').not('.off').not('.disabled');
    //console.dir(days);
    for(k=0; k<days.length; k++)
    {
        //console.log('GIORNO: ' + (days[k].textContent * 1) + ' VS: ' + day);
        if(days[k].textContent * 1 === day)
        {
            //console.log('Day found at position ' + k);
        	days[k].click();
            return true;
        }
    }
    console.log('Date ' + date + ' not found');
    return false;
}

function annulla(){
	$('button.btn.btn-default.cancel')[0].click();
    console.log('Insert cancelled');
}

function restrictDate(date, name)
{
	$('div.add-restriction.btn.btn-default')[0].click();
   	var radio_buttons =$('div.col-xs-4.labels label');
    //console.dir(radio_buttons);
    //0 All day, 1 From, 2 Every Week, 3 Range
    if(PHtime_restrict)
    { //Set time of the restriction
    	radio_buttons[1].click();
        $('input.form-control.from-time.time-selector').val(PHstart_time);
        $('input.form-control.time-selector.to-time').val(PHend_time);
    }
    radio_buttons[3].click();
    $('button.btn.btn-default.daterange-selector')[0].click();    

        if(!pickDate('div.calendar.right', date))
        {
            console.log('Could not pick date ' + date +' on the right calendar.');    
            annulla();
            return false;
        }
            if(!pickDate('div.calendar.left', date))
    {
    	console.log('Could not pick date ' + date +' on the left calendar.');
        annulla();
        return false;
    }
        //Apply dates
    	$('button.btn.btn-small.btn-success.applyBtn').click();
    
    //Add description
    $('textarea.description.form-control').text(name + ' inserted by WME Public Holiday Restrictor v. '+phVersion);
    //Apply restriction
    $('div.controls.well button.btn.btn-primary')[0].click();
    // alert('Restrizione applicata');
    return true;
}

function restrictSundays()
{
	$('div.add-restriction.btn.btn-default')[0].click();
    //Uncheck all
    var checkboxes = $('div.days.section input');
    for(var k=0; k<checkboxes.length; k++)
    {
        checkboxes[k].checked = false;
    }
    
    //Check Sunday:
    checkboxes[0].checked = true;
    
    if(PHtime_restrict)
    { //Set time of the restriction
        var radio_buttons =$('div.col-xs-4.labels label');
    	radio_buttons[1].click();
        $('input.form-control.from-time.time-selector').val(PHstart_time);
        $('input.form-control.time-selector.to-time').val(PHend_time);
    }
    //Apply restriction
    $('textarea.description.form-control').text("Public holiday added by WME Public Holiday restrictor v." + phVersion+", year " + year);
    $('div.controls.well button.btn.btn-primary')[0].click();
}

function PHrestrict(startingDate, endingDate, startingTime, endingTime, daysOfWeek)
{
    console.log(startingTime+ ' ' +endingTime);
$('div.add-restriction.btn.btn-default')[0].click();
if(restrictedTypes!=null)
{
//Restriction applies only to some categories
     var chTypes= $('input.vehicle_type[type=checkbox]');
                if(chTypes != null)
                {
                    //Deselect all categories
                	$('a.select-none')[1].click();
                    for(var q=0; q<restrictedTypes.length; q++)
                    {
                    	if(restrictedTypes[q] == '1')
                        {
                        	chTypes[q].click();
                        }
                    }
                }
                else
                {
                    alert("ERROR: Cannot set restriction veichles type");
                    return;
                }   
}
    if(daysOfWeek != null)
    {
        //Deselect all the days
    	$('a.select-none')[0].click();
        //Mo,Th 16:00-17:00
       	var checkboxesDay = $("input[type='checkbox'][name='days']");
        for(var i=0; i<daysOfWeek.length; i++)
        {
            checkboxesDay[daysOfWeek[i]].click();
        }
    }
   	var radio_buttons =$('div.col-xs-4.labels label');
    //console.dir(radio_buttons);
    //0 All day, 1 From, 2 Every Week, 3 Range
    if(startingTime != null)
    { //Set time of the restriction
    	radio_buttons[1].click();
        $('input.form-control.from-time.time-selector').val(startingTime);
        $('input.form-control.time-selector.to-time').val(endingTime);
    }
    if(startingDate != null)
    {
        radio_buttons[3].click();
        $('button.btn.btn-default.daterange-selector').click();    
    
            if(!pickDate('div.calendar.right', endingDate))
            {
                console.log('Could not pick date ' + endingDate +' on the right calendar.');    
                annulla();
                return false;
            }
                if(!pickDate('div.calendar.left', startingDate))
        {
            console.log('Could not pick date ' + startingDate +' on the left calendar.');
            annulla();
            return false;
        }
                //Apply dates
    	$('button.btn.btn-small.btn-success.applyBtn')[0].click();
    }
    
    //Add description
    $('textarea.description.form-control').text('Inserted with WME Public Holiday Restrictor v. '+phVersion);
    //Apply restriction
   $('div.controls.well button.btn.btn-primary')[0].click();
     return true;
}

function addRestrictions()
{
       if (confirm('Press "Ok" if the restriction applies for the entire day, cancel to specify a time.')) {
    // Entire day
            PHtime_restrict=false;
	} else {
    // time
    PHtime_restrict = true; 
    PHstart_time = prompt('Insert the starting time in the 24 hour format, using 5 characters (e.g. 06:30)');
    if(PHstart_time != null)
        PHend_time = prompt('Insert the ending time in the 24 hour format, using 5 characters (e.g. 19:30)');
    else
        return;
        
    if(PHstart_time.indexOf(':') !== 2)
	{
        alert("Starting time has a wrong format, correct examples: 05:00 or 16:30.");
        return
	}
        if(PHend_time.indexOf(':') !== 2)
	{
        alert("Ending time has a wrong format, correct examples: 05:00 or 16:30.");
        return
	}
}
    
     patrono_date = prompt('Insert the date of one extra local holiday (celebrations, bank holidays, patron saint\'s festival,...) in the format dd/mm/'+year+' or cancel if there is none. For example:', '15/08/'+year); 
    
    if(patrono_date != null)
    {
        var data = patrono_date.split('/');
        if(data.length != 3 || (data[0]<1 || data[0]>31) || (data[1]<1 || data[1]>12) || data[2] != year)
        {
            alert('Date is invalid, accepted format: dd/mm/'+year);
            return;
        }
        restrictDate(patrono_date, 'City Holiday');
    }
    else
        console.log('Extra date not provided, skipping it.');
    
    please_wait = $('<div id="please_wait_div" style="border-radius:20px; height:30%; text-align:center; width:90%; position:absolute; top:40%; font-size:xx-large; left:5%; background-color:red; color:yellow; border:2px solid orange; z-index:2147483647">PLEASE WAIT...</div>');
    $('div.modal-header').append(please_wait);
    setTimeout(function(){
        //Restrict sundays
        PHrestrict(null,null,PHstart_time,PHend_time,[0]);
    //restrictSundays();
    
    //Per tutte le feste fisse
    for(var i=0; i < fixed_holidays.length; i=i+1)
    {
        //PHrestrict(fixed_holidays[i].on,fixed_holidays[i].on,PHstart_time,PHend_time,null);
   		restrictDate(fixed_holidays[i].on, fixed_holidays[i].name);
    }
    
    for(var i=0; i < moving_holidays.length; i=i+1)
    {
   		restrictDate(moving_holidays[i].on, moving_holidays[i].name);
    }
    please_wait.css('display','none');
    
    prompt('Remember to fill in the form as a remainder. Copy the URL from here:', url);
    //console.dir(div_date);
    }, 100);
}

function addRestrictionsFromString()
{
    var timestring = prompt('Paste the time string, for example:', 'CAT 1 0 0 1 1 1 1 1 1 1 1;Su 10:00-11:59;Mo-Th 12:00-12:59;Fr,Sa 00:00-23:59');
    if(timestring != null)
    {
    	//Parsing the string
        var restrizioni = timestring.split(';');
        console.dir(restrizioni);//TODO REMOVE
        for(var i=0; i<restrizioni.length; i++)
        {
            if(restrizioni[i]=="")
                continue;
        	var spacefree = restrizioni[i].split(' ');
            console.dir(spacefree);//TODO REMOVE
            if(spacefree[0] == 'CAT')
            {
                restrictedTypes = new Array();
                for(var k=1; k<spacefree.length; k++)
                {
                 restrictedTypes[k-1] = spacefree[k];   
                }
                continue;
            }
            if(spacefree[0] == 'PH')
            {
                    //Restrict all the public holidays
                    consoleLog('PH');
                	restrictPH(spacefree[1]);
                    continue;
            }
            if(spacefree[0].indexOf('-') !== -1)
            {
                    consoleLog('Interval');
                	//It is an interval
                    var dashfree = spacefree[0].split('-');
                    var startingwn = week_days[dashfree[0]];
                    var endingwn = week_days[dashfree[1]];
                    if(startingwn == null || endingwn == null)
                        {
                            alert('Interval: invalid day ' + dashfree[0] + ' or ' + dashfree[1]);
                            return;
                        }
                        else
                        {
                        	//Check the time and restrict that weekday
                            var days= new Array();
                            var l=0;
                           for(var p=startingwn; p<=endingwn; p++)
                           {
                               days[l]=p;
                               l++;
                           }
                            console.dir(days);
                            var commafree = spacefree[1].split(',');
                            for(var r=0; r<commafree.length; r++)
                            {
                            	var time = commafree[r].split('-');
								PHrestrict(null, null, time[0], time[1], days);
                            }
                        }
                    
            }
            else if(spacefree[0].indexOf(',') !== -1)
            {
                //It is a series of days
                consoleLog('Series');
                var commafree = spacefree[0].split(',');
                var days = new Array();
                for(var r=0; r<commafree.length; r++)
                {
                    if(week_days[commafree[r]] == null)
                    {
                        alert('Series: invalid day ' + commafree[r]);
                        return;
                    }
                    days[r] = week_days[commafree[r]];
                }
                
                            var commafree = spacefree[1].split(',');
                            for(var r=0; r<commafree.length; r++)
                            {
                            	var time = commafree[r].split('-');
								PHrestrict(null, null, time[0], time[1], days);
                            }
            }
                else
            {
                //It is a single day or an invalid value
                consoleLog('Single');
                var weeknumber = week_days[spacefree[0]];
                if(weeknumber == null)
                {
                    alert('Single: invalid day ' + spacefree[0]);
                    return;
                }
                else
                {
                    //Check the time and restrict that weekday
                    days = new Array();
                    days[0]=weeknumber;
                    var commafree = spacefree[1].split(',');
                    for(var r=0; r<commafree.length; r++)
                    	{
                        	var time = commafree[r].split('-');
							PHrestrict(null, null, time[0], time[1], days);
                        }
                }
                
            }
        }
        
    }
}

function generateCatString()
{
    var cat = 'CAT ';
    var chTypes= $('input.vehicle_type[type=checkbox]');
                if(chTypes != null)
                {
                    for(var q=0; q<chTypes.length; q++)
                    {
                    	if(chTypes[q].checked)
                        {
                        	cat += '1';
                        }
                        else
                        {
                            cat+='0';
                        }
                        if(q<chTypes.length-1)
                            cat+=' ';
                    }
                    cat +=';';
                }
                else
                {
                    alert("ERROR: Cannot get restriction veichles type");
                    return;
                }   
 	prompt('Copy this string', cat );   
}

function insertGetCat()
{
	var link = $('<a id="get_cat">Get CAT string</a>');
    link.click(generateCatString);
    console.log('qui');
    $('div.types').append(link);
    console.log('2');
}

function restrictPH(time)
{

}

function addClickOnEdit()
{
        console.log('qui');
    $('a.toggle-vehicles')[0].addEventListener('click', function() { setTimeout(insertGetCat, 1); }, false);
    console.log('qui');
}

function phInsertButton() {
    var button = $('<button id="public_holidays_button" title="WME Public Holiday restrictor v. '+phVersion+'" class="btn btn-default">Add Public Holidays '+year+'</button>');
    button.click(addRestrictions);
    var button2 = $('<button id="public_holidays_button_2" title="WME Public Holiday restrictor v. '+phVersion+'" class="btn btn-default">Add from string</button>');
    button2.click(addRestrictionsFromString);
    $('.actions, .well').append(button);  
    $('.actions, .well').append(button2);
    $('div.add-restriction.btn.btn-default')[0].addEventListener('click', function() { setTimeout(addClickOnEdit, 1); }, false);
}

function consoleLog(obj)
{
	// se non specificato nella stringa %s per stringa o %o per object
	// visualizza il contenuto della variabile alla fine.
	console.log('PH v. ' + phVersion + '-> ', obj);
}

function addFunctionOnArrowClock()
{
    if(Waze.selectionManager.selectedItems.length>0)
    {
        if(Waze.selectionManager.selectedItems[0].type=="segment")
        {
            $('button.btn.btn-default.edit-restrictions')[0].addEventListener('click', function() { setTimeout(phInsertButton, 1); }, false);
            var temp_div = $('div.restrictions');
            for(var i=0; i<temp_div.length; i++)
            {
                temp_div[i].addEventListener('click', function() { setTimeout(phInsertButton, 1); }, false);
            }
        }
    }
}

function initPH() {
	phGlobals();
	phWazeBits();
    console.dir(Waze.accelerators);
    
    Waze.selectionManager.events.register("selectionchanged", null, addFunctionOnArrowClock);
    Waze.accelerators.events.register("editRestrictions", null, phInsertButton);
   
	console.log("PH v. %s initialised", phVersion);

//	console.log('PH v. ' + phVersion + '-> ', wazeModel.segments);
//
//	for (var propertyName in wazeModel.actionManager) {
//		console.log('PH v. ' + phVersion + '-> ' + propertyName + ': ', wazeModel.actionManager[propertyName]);
//	}
}

setTimeout(bootstrapPH, 1000);