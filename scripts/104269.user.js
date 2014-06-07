// ==UserScript==
// @name           JIRA Colouriser
// @namespace      http://your.jirainstance.com/secure
// @include        http://your.jirainstance.com/secure/IssueNavigator.jspa*
// @include        http://your.jirainstance.com/secure/QuickSearch.jspa*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Colour tickets in JIRA. Written by Matt Collinge.
// ==/UserScript==

var colouredTickets = utilGetCookie('colouredTickets');

// Your favourite colours :)

var colourA = '000000'; // Clear selection
var colourB = 'FFAAAA';
var colourC = 'FBFFAA';
var colourD = 'B6FEAB';
var colourE = 'ABF5FE';

addGlobalStyle('.colouriserA { background:#'+colourA+';width:8px;height:8px;padding:0;margin-top:3;border:1px solid #aaaaaa;margin-right:2px;display:block;float:left }');
addGlobalStyle('.colouriserB { background:#'+colourB+';width:8px;height:8px;padding:0;margin-top:3;border:1px solid #aaaaaa;margin-right:2px;display:block;float:left }');
addGlobalStyle('.colouriserC { background:#'+colourC+';width:8px;height:8px;padding:0;margin-top:3;border:1px solid #aaaaaa;margin-right:2px;display:block;float:left }');
addGlobalStyle('.colouriserD { background:#'+colourD+';width:8px;height:8px;padding:0;margin-top:3;border:1px solid #aaaaaa;margin-right:2px;display:block;float:left }');
addGlobalStyle('.colouriserE { background:#'+colourE+';width:8px;height:8px;padding:0;margin-top:3;border:1px solid #aaaaaa;margin-right:2px;display:block;float:left }');

// Find all the rows..
$('tr:visible[id*=issuerow]').each(function() {

	// Find the internal ticket ID
	var cur_id = $(this).attr('id');
	var jiraID = cur_id.substr(8);
	
	if (colouredTickets != null && colouredTickets != '') { 
		var ticketLocationInCookie = colouredTickets.indexOf(jiraID+'=');
		
		if (ticketLocationInCookie > -1) {
			var ticketColourEndComma = colouredTickets.indexOf(',', ticketLocationInCookie);
			var ticketColourEquals = colouredTickets.indexOf('=', ticketLocationInCookie);
			var ticketColour = colouredTickets.substring(ticketColourEquals+1, ticketColourEndComma);
			$(this).attr('style', 'background:#'+ticketColour);
		}
	}
	
	var keyNode = $(this).find('[class=nav issuekey]');
	keyNode.html(keyNode.html() + '<br><span class="colouriserA" id="colTicket'+jiraID+'A"></span> <span class="colouriserB" id="colTicket'+jiraID+'B"></span> <span class="colouriserC" id="colTicket'+jiraID+'C"> </span><span class="colouriserD" id="colTicket'+jiraID+'D"></span> <span class="colouriserE" id="colTicket'+jiraID+'E"></span>');
	
	$('#colTicket'+jiraID+'A').bind("click", {jiraID:jiraID, colour:colourA}, saveColour);
	$('#colTicket'+jiraID+'B').bind("click", {jiraID:jiraID, colour:colourB}, saveColour);
	$('#colTicket'+jiraID+'C').bind("click", {jiraID:jiraID, colour:colourC}, saveColour);
	$('#colTicket'+jiraID+'D').bind("click", {jiraID:jiraID, colour:colourD}, saveColour);
	$('#colTicket'+jiraID+'E').bind("click", {jiraID:jiraID, colour:colourE}, saveColour);

});


function saveColour(event) {

	var colouredTickets = utilGetCookie('colouredTickets');

	if (colouredTickets == null || colouredTickets == '') {
		utilSetCookie('colouredTickets', event.data.jiraID + '=' + event.data.colour + ',', 2000);
	} else {
		if (colouredTickets.indexOf(event.data.jiraID + '=') > -1) {
			var ticketAndColourArray = colouredTickets.split(',');
			var ticketAndColourArrayNew = [];
			
			for (var i=0; i<ticketAndColourArray.length; i++) {
				if (ticketAndColourArray[i].indexOf(event.data.jiraID + '=') > -1) {
					if (event.data.colour != '000000') {
						ticketAndColourArrayNew.push(event.data.jiraID + '=' + event.data.colour);
					} 
				} else {
					if (ticketAndColourArray[i] != '') {
						ticketAndColourArrayNew.push(ticketAndColourArray[i]);
					}
				}
			}
			var ticketAndColourString = ticketAndColourArrayNew.join(',') + ',';
			utilSetCookie('colouredTickets', ticketAndColourString, 2000);
		} else {
			utilSetCookie('colouredTickets', colouredTickets + event.data.jiraID + '=' + event.data.colour + ',', 2000);
		}
	}

	if (event.data.colour != '000000') {
		$('tr:visible[id*=issuerow'+event.data.jiraID+']').each(function() {
			$(this).attr('style', 'background:#'+event.data.colour);
		});
	} else {
		$('tr:visible[id*=issuerow'+event.data.jiraID+']').each(function() {
			$(this).attr('style', '');
		});
	}

}

function utilSetCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function utilGetCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length ;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}