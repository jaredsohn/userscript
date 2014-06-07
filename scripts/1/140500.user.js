// ==UserScript==
// @id             s3.parature.com-66bbdb80-45cc-40f7-b9f3-6b4422ca2481@scriptish
// @name           Parature Utilities
// @version        1.4.1
// @namespace      
// @author         Travis Bauscher
// @description    Adds some useful features to Parature's Service Desk software.
// @include        https://s3.parature.com/*
// @include        https://s3.parature.com/*
// @updateURL      https://userscripts.org/scripts/source/140500.user.js
// @run-at         document-end
// ==/UserScript==
var iterations = 20;
var current_i  = 0;
var ticket_hopper = 0;
var ticketID = 0;
var paratureUtilitiesMessages = '';

function ticketDetail_loadTicketData ()
{
	paratureUtilitiesMessages = document.createElement('div');
	paratureUtilitiesMessages.innerHTML = '<div style="font-weight:bold;position: absolute;bottom:5px;right:5px;background:#FFF;color:#000;padding:5px;border: 1px solid #000;-moz-box-shadow: 0 0 3px 3px #888; -webkit-box-shadow: 0 0 3px 3px #888; box-shadow: 0 0 3px 3px #888;" id="paratureUtilities"></div>';
	document.body.appendChild(paratureUtilitiesMessages);
	
    var mytable = document.getElementById('ticketLeftCol');
    var customer_table  = mytable.getElementsByTagName("td");
	for (var i = 0; i < customer_table.length; i++) {
        if (customer_table[i].innerHTML.indexOf("5541") !== -1 && customer_table[i].innerHTML.indexOf("<") === -1 )
            ticketID = customer_table[i].innerHTML.replace("&nbsp;","").replace("5541-","");
    }
	
	if (document.getElementById('winTab__title').getElementsByTagName('a')[0].href.indexOf('5582') !== -1)
	{
		paratureUtilitiesMessages.addEventListener ("click", function() {ticketDetail_addToDOT();}, false);
		ticket_hopper = 5582;
	}
	else
	{
		paratureUtilitiesMessages.addEventListener ("click", function() {alert('You can only add Development tickets');}, false);
		ticket_hopper = 5581;
	}
}

function ticketDetail_makeClickable ()  // Iterate through SPANs to see if the string starts with http and convert to link //
{
    if (unsafeWindow.accountDataLoading == true) // Still loading, wait 1 second //
    {
		document.getElementById('paratureUtilities').innerHTML="PU- Checking";
        
		if (current_i < iterations)
        {
            setTimeout(function(){ticketDetail_makeClickable()},1000);
            current_i = wcurrent_i+1;
        }
		else
		{
			document.getElementById('paratureUtilities').style.background="#F00";
			document.getElementById('paratureUtilities').style.color="#FFF";
			document.getElementById('paratureUtilities').innerHTML="PU- Timeout";
		}
    }
    else // It has loaded.  Time to link!
    {
		if (document.getElementById('accountInfoTD'))
		{
			var mytable = document.getElementById('accountInfoTD'); // Read the Account table.
			var customer_table  = mytable.getElementsByTagName("span"); // Select all SPANs
        
			for (var i = 0; i < customer_table.length; i++) { // Iterate through elements 
				content_string = customer_table[i].innerHTML; // Make the innerHTML a variable, for my sanity
				if (content_string.indexOf("http") !== -1 && content_string.indexOf("<a") === -1) // Check for existence of http and non-existence of a link
				{
					customer_table[i].innerHTML = '<a href="'+content_string+'" target="_blank">'+content_string+'</a>'; // Create the link, target _blank for new window
				}
			}
			if (ticket_hopper == 5582)
				document.getElementById('paratureUtilities').innerHTML="PU- Add To DOT";
			else
				document.getElementById('paratureUtilities').innerHTML="PU- Completed";
		}
		else
		{
			document.getElementById('paratureUtilities').innerHTML="PU- No Account";
		}
    }
}

function ticketDetail_Paratureautoclick ()
{
	document.getElementById('paratureUtilities').innerHTML="PU- Running";
    var mytable = document.getElementById('toolkitTable');
    
    var event           = '';
    var string_string   = '';
    
    var customer_table  = mytable.getElementsByTagName("tr");
    
    for (var i = 0; i < customer_table.length; i++) {
        if (customer_table[i].getAttribute('onclick') != undefined)
            eval('unsafeWindow.'+customer_table[i].getAttribute('onclick'));
    }
	document.getElementById('paratureUtilities').innerHTML="PU- Clicked";
    setTimeout(function(){ticketDetail_makeClickable()},1000);
}

function ticketDetail_addToDOT ()
{
	document.getElementById('paratureUtilities').innerHTML="PU- Sending to DOT";
    
    var event           = '';
    var string_string   = '';
    
    var mytable = document.getElementById('ticketLeftCol');
    var customer_table  = mytable.getElementsByTagName("td");
    
    for (var i = 0; i < customer_table.length; i++) {
        if (customer_table[i].innerHTML.indexOf("5541") !== -1 && customer_table[i].innerHTML.indexOf("<") === -1 )
            var ticketID = customer_table[i].innerHTML.replace("&nbsp;","").replace("5541-","");
    }
	if (ticketID != undefined)
	{
		document.getElementById('paratureUtilities').innerHTML="PU- Sending "+ticketID+" to DOT";
		
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://tickets.eegrasstudios.com/addTicket.php?ticket="+ticketID+"&json",
			onload: function(response) {
				ticketDetail_displayResult(response.responseText);
			}
			});
	}
	//document.getElementById('paratureUtilities').innerHTML="PU- Complete";
}
function ticketDetail_displayResult (response)
{
	var response_object = JSON.parse(response);
	if (response_object.ticket.code == '404') // There was an error.  Display.
	{
			document.getElementById('paratureUtilities').style.background="#F00";
			document.getElementById('paratureUtilities').innerHTML=response_object.ticket.error;
	}
	else
		alert(response);
}

function ticketDetail_checkTicketData ()
{
	var TicketDataTable = document.getElementById('ticketLeftCol').getElementsByTagName('table')[2].getElementsByTagName('td');
	var lastFieldName = ''
	var blankValueAlertText = '';
	for (var i = 0; i < TicketDataTable.length; i++) {
		if ( TicketDataTable[i].parentNode.getAttribute('style')!='display:none')
			{
			if ( TicketDataTable[i].getAttribute('class')=="webCaption" )
			{
				lastFieldName = TicketDataTable[i].innerHTML;
			}
			else
			{
				if ((lastFieldName.indexOf("Request Type") !== -1 && lastFieldName.indexOf("IT Service") === -1 ) ||
					lastFieldName.indexOf("Which Affiniscape product is your message regarding?") !== -1 || 
					lastFieldName.indexOf("Question") !== -1 )
				{
					if (lastFieldName.indexOf("Which Affiniscape product is your message regarding?") !== -1)
						TicketDataTable[(i-1)].innerHTML="Product:&nbsp;";
					
					if (TicketDataTable[i].innerHTML == '&nbsp;' || TicketDataTable[i].innerHTML == '')
					{
						TicketDataTable[i].style.background='#FCC';
						blankValueAlertText = blankValueAlertText+lastFieldName.replace("&nbsp;","").replace(":","")+"\n";
					}
					else
					{
						TicketDataTable[i].style.background='#FAE6B2';
					}
				}
				else
				{
					if  (TicketDataTable[i].innerHTML == '&nbsp;' || TicketDataTable[i].innerHTML == '' || TicketDataTable[i].innerHTML == 'No')
					{
						TicketDataTable[i].style.display='none';
						TicketDataTable[(i-1)].style.display='none';
					}
				}
			}
		}
    }
	if (blankValueAlertText != '')
	{
		alert('Ticket '+ticketID+"\n\n"+blankValueAlertText+"Are Blank!");
	}
}

function ticketBucket_checkPriorities ()
{
	var TicketDataTable = document.getElementById('tableContent').getElementsByTagName('tr');
	var TicketDataCells = '';
	for (var i = 0; i < TicketDataTable.length; i++) {
		TicketDataCells = TicketDataTable[i].getElementsByTagName('td');
		for (var a = 0; a < TicketDataCells.length; a++) {
			if (TicketDataCells[a].innerHTML.indexOf("2-Urgent") !== -1)
			{
				TicketDataTable[i].style.background="#FCC";
			}
			if (TicketDataCells[a].innerHTML.indexOf("1-Emergency") !== -1)
			{
				TicketDataTable[i].style.background="#F00";
			}
		}
	}
}

function init_ParatureUtilities()
{
	var sheet = document.createElement('style')
	sheet.innerHTML = "* { -moz-hyphens: none !important; } #action_row { width: 50%; }";
	document.body.appendChild(sheet);
	if (location.href.indexOf("ticketDetail.asp") !== -1)
	{
		ticketDetail_loadTicketData();
		ticketDetail_checkTicketData();
		ticketDetail_Paratureautoclick();
	}
	if (location.href.indexOf("ticketlist.asp") !== -1)
	{
		ticketBucket_checkPriorities();
	}
}

init_ParatureUtilities()
