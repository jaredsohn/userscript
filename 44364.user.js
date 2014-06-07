// Copyright (c) 2009, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// v0.34 show all (old) milestones, absolutize the dropdown arrow
// v0.33 fix no milestone dropdown
// v0.32 fix no milestone or assigned to values
// v0.31 fix HTTPS support
// v0.3 fixed bugs broken from HTML changes, added HTTPS support
// v0.22 fixed a bug with authentication
// v0.21 added milestone inplaceeditor
// v0.2 make it generic, for any project
// v.01 intial prototype
//
// ==UserScript==
// @name           LightHouse - Ticket View InPlaceEditor
// @namespace   http://userscripts.org/users/44035
// @description   Adds InPlaceEditors to state, assigned to, and milestone values in ticket list view.
// @include         http://*.lighthouseapp.com/projects/*/tickets*
// @include         https://*.lighthouseapp.com/projects/*/tickets*
// @version	0.34
// ==/UserScript==

var gmScript_url = "http://userscripts.org/scripts/source/44364.user.js";
var gmScript_name = "LightHouse - Ticket View InPlaceEditor";
var gmScript_version = 0.34;

autoUpdateFromUserscriptsDotOrg(
	{
		name: gmScript_name,
		url: gmScript_url,
		version: gmScript_version,
	}
);

GM_addStyle(".editme {float:left;padding-top:5px;display:inline;} .editlink {position:absolute;}");
GM_registerMenuCommand("Clear project cache", clearCache);

var $ = unsafeWindow['window'].$;
var $$ = unsafeWindow['window'].$$;
var $F = unsafeWindow['window'].$F;
var Event = unsafeWindow.Event;
var Element = unsafeWindow.Element;
var Ajax = unsafeWindow.Ajax;
var Lighthouse = unsafeWindow.Lighthouse;
var myEvent = null;
var popupDelay = 50;

var accessToken = GM_getValue(getProjectId() + "_token", '');

if(accessToken == '')
{
	getToken();
}
function getToken()
{
	if(confirm('You need a token with read and write access to this project in order to use the greasemonkey mod. Allow me to fetch or create one?'))
	{
		var userUrl = "https://" + window.location.hostname + "/users/" + Lighthouse.userId;

		xmlhttp=new XMLHttpRequest();
		xmlhttp.open('GET', userUrl, false);
		xmlhttp.send(null);
		var tokenInfo = new RegExp(/greasemonkey[\s\S]*?tokenkey">([a-zA-Z0-9]+)<\/span>/igm).exec(xmlhttp.responseText);
		if(tokenInfo)
		{
			accessToken = tokenInfo[1].toString();
			GM_setValue(getProjectId() + "_token", accessToken)
			return;
		}

		var params = "authenticity_token=" + Lighthouse.authenticityToken + "&token[account_id]=&token[note]=greasemonkey&token[read_only]=false&commit=Create";
		
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open('POST', "https://3dvia.lighthouseapp.com/tokens", false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-length", params.length);
		xmlhttp.setRequestHeader("Connection", "close");
		xmlhttp.send(params);
		
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open('GET', userUrl, false);
		xmlhttp.send(null);
		var tokenInfo = new RegExp(/greasemonkey[\s\S]*?tokenkey">([a-zA-Z0-9]+)<\/span>/igm).exec(xmlhttp.responseText);

		accessToken = tokenInfo[1].toString();
		GM_setValue(getProjectId() + "_token", accessToken)
	}
}

function clearCache()
{
	if(confirm('Clear all saved data for this project?'))
	{
		GM_setValue(getProjectId() + "_token", '');
		GM_setValue(getProjectId() + "_ticketStates", '');
		GM_setValue(getProjectId() + "_projectMembers", '');
		GM_setValue(getProjectId() + "_projectMilestones", '');
		alert('Cache cleared.');
	}
}

function getProjectId()
{
	var url = new RegExp(/.*\/projects\/([0-9]+)[\S\s]*\/tickets.*/).exec(window.location.href);
	return url[1].toString();
}

var ticketStates_string = GM_getValue(getProjectId() + "_ticketStates", '');
var ticketStates = ticketStates_string.split(',');
var projectMembers_string = GM_getValue(getProjectId() + "_projectMembers", '');
var projectMembers = projectMembers_string.split('||');
var projectMilestones_string = GM_getValue(getProjectId() + "_projectMilestones", '');
var projectMilestones = projectMilestones_string.split('||');

for(var i=0; i<projectMembers.length; i++)
{
	projectMembers[i] = projectMembers[i].split(',');
}

for(var i=0; i<projectMilestones.length; i++)
{
	projectMilestones[i] = projectMilestones[i].split(',');
}

if(accessToken != '')
{
	if(ticketStates.length<=1)
	{
		getTicketStates();
	}
	
	if(projectMembers.length<=1)
	{
		getProjectMembers();
	}
	
	if(projectMilestones.length<=1)
	{
		getProjectMilestones();
	}
	
	Event.observe(window, 'load', getcords);
	Event.observe(window, 'mousemove', getcords);
	Event.observe(window, 'click', clearSelectBoxes);

	$$('table.issues tbody tr td.ttstate span.tstate').invoke('observe', 'mouseover', mouseOverState);
	$$('table.issues tbody tr td.ttstate').invoke('observe', 'mouseout', mouseOutState);
	$$('table.issues tbody tr td.issue + td + td').each(function(s){
		if(!s.down('a'))
		{
			s.innerHTML = "<a href='/users/#' onclick='return false'>none</a>";
		}
		s.down('a[href^="/users/"]').observe('mouseover', mouseOverAssignedTo);
	});
	$$('table.issues tbody tr td.issue + td + td').invoke('observe', 'mouseout', mouseOutAssignedTo);
	$$('table.issues tbody tr td.issue + td').each(function(s){
		if(!s.down('a'))
		{
			s.innerHTML = "<a href='#' onclick='return false'>none</a>";
		}
		s.down('a').observe('mouseover', mouseOverMilestone);
	});
	$$('table.issues tbody tr td.issue + td').invoke('observe', 'mouseout', mouseOutMilestone);
}

function getProjectUrl()
{
	var url = new RegExp(/(.*\/projects\/[0-9]+)[\S\s]*\/tickets.*/).exec(window.location.href);
	return url[1].toString();
}

function getTicketStates()
{
	var projectUrl = getProjectUrl() + '.json?_token=' + accessToken;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('GET', projectUrl, false);
	xmlhttp.send(null);
	var json = eval('(' + xmlhttp.responseText + ')');
	ticketStates_string = json.project.open_states_list + ',' + json.project.closed_states_list;
	ticketStates = ticketStates_string.split(',');
	GM_setValue(getProjectId() + "_ticketStates", ticketStates_string);
}

function getProjectMembers()
{
	projectMembers = [
				['', '']
	];
	var membershipUrl = getProjectUrl() + '/memberships.json?_token=' + accessToken;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('GET', membershipUrl, false);
	xmlhttp.send(null);
	var json = eval('(' + xmlhttp.responseText + ')');
	projectMembers_string = ' , ';
	for(var i=0; i<json.memberships.length; i++)
	{
		var user_id = json.memberships[i].membership.user_id;
		var memberUrl = "https://" + window.location.hostname + "/users/" + user_id + ".json?_token=" + accessToken;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open('GET', memberUrl, false)
		xmlhttp.send(null);
		var member = eval('(' + xmlhttp.responseText + ')');
		projectMembers[projectMembers.length++] = [member.user.id, member.user.name];
		projectMembers_string += '||' + member.user.id + ',' + member.user.name;
	}
	GM_setValue(getProjectId() + "_projectMembers", projectMembers_string);
}

function getProjectMilestones()
{
	projectMilestones = [
				['', '']
	];
	var milestoneUrl = getProjectUrl() + '/milestones.json?_token=' + accessToken;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('GET', milestoneUrl, false);
	xmlhttp.send(null);
	var json = eval('(' + xmlhttp.responseText + ')');
	projectMilestones_string = ' , ';
	for(var i=json.milestones.length-1; i>=0; i--)
	{
		var milestone_title = json.milestones[i].milestone.title;
		var milestone_id = json.milestones[i].milestone.id;
		var due_on = json.milestones[i].milestone.due_on;
		//if(((new Date(convertAtomDateString(due_on)) - new Date()) > 0))
		projectMilestones[projectMilestones.length++] = [milestone_id, milestone_title];
		projectMilestones_string += '||' + milestone_id + ',' + milestone_title;
	}
	GM_setValue(getProjectId() + "_projectMilestones", projectMilestones_string);
}

function convertAtomDateString(str)
{
    //2008-08-27T04:59:19Z
    var year, month, date, hour, minute, second, offset;
    year = str.slice(0,4);
    month = str.slice(5,7)-1;        //00-11
    if(month<10)
        month = '0'+month;
    date = str.slice(8,10);        //01-31
    hour = str.slice(11,13);    //00-23
    minute = str.slice(14,16);    //00-59
    second = str.slice(17,19);    //00-59
    d = new Date();
    d.setUTCMonth(month,date);
    d.setUTCFullYear(year);
    d.setUTCHours(hour);
    d.setUTCMinutes(minute);
    d.setUTCSeconds(second);
    return d;
}

function hasPosition(element, x, y){
	element = $(element);
	this.topleft = Element.cumulativeOffset(element);
	this.bottomright = [
		this.topleft[0] + element.offsetWidth,
		this.topleft[1] + element.offsetHeight,
	];
	return (y >= this.topleft[1] &&
		y <  this.bottomright[1] &&
		x >= this.topleft[0] &&
		x <  this.bottomright[0]);
}

function getcords(e){
	myEvent = e;
}

function mouseOverState(event)
{
	var t = $(this);
	setTimeout(function(){
		var c = myEvent.target != null ? myEvent.target : myEvent.srcElement;
		if($(c) == t) insertEdit(t.up(), 'Edit State');
	}, popupDelay);
}

function mouseOutState(event, again)
{
	var t = $(this);
	setTimeout(function(){
		var c = myEvent.target != null ? myEvent.target : myEvent.srcElement;
		if(!$(c).descendantOf(t) && !hasPosition(t, Event.pointerX(myEvent), Event.pointerY(myEvent))) removeEdit(t.up());
	}, popupDelay);
}

function mouseOverAssignedTo()
{
	var t = $(this);
	setTimeout(function(){
		var c = myEvent.target != null ? myEvent.target : myEvent.srcElement;
		if($(c) == t) insertEdit(t.up(), 'Edit Assigned To');
	}, popupDelay);
}

function mouseOutAssignedTo(event)
{
	var t = $(this);
	setTimeout(function(){
		var c = myEvent.target != null ? myEvent.target : myEvent.srcElement;
		if(!$(c).descendantOf(t) && !hasPosition(t, Event.pointerX(myEvent), Event.pointerY(myEvent))) removeEdit(t.up());
	}, popupDelay);
}

function mouseOverMilestone()
{
	var t = $(this);
	setTimeout(function(){
		var c = myEvent.target != null ? myEvent.target : myEvent.srcElement;
		if($(c) == t) insertEdit(t.up(), 'Edit Milestone');
	}, popupDelay);
}

function mouseOutMilestone(event)
{
	var t = $(this);
	setTimeout(function(){
		var c = myEvent.target != null ? myEvent.target : myEvent.srcElement;
		if(!$(c).descendantOf(t) && !hasPosition(t, Event.pointerX(myEvent), Event.pointerY(myEvent))) removeEdit(t.up());
	}, popupDelay);
}

function insertEdit(obj, title)
{
	if(typeof(obj.down('.editme')) == 'undefined')
	{
		obj.down('*').setStyle({
			'float': 'left',
		});
		obj.insert('<div class="editme"><a class="editlink" href="#" title="' + title + '"><img src="http://i.friendfeed.com/649b8c502cf32186e8971137de4ec96e4f87b308" border="0"/></a></div>');
		$$('.editlink').invoke('observe', 'click', editme);
	}
}

function removeEdit(obj)
{
	try{obj.down('.editme a').up().remove()}catch(e){};
}

function editme(e)
{
	var t = $(this);
	var title = t.readAttribute("title");
	t.blur();
	if(title == "Edit State")
	{
		var currState = t.up('td.ttstate').down('span.tstate').innerHTML;
		var optionStates = getStates(currState);
		t.up('td').down('span').hide();
		t.replace('<form class="form_inplace_edit"><select class="ticket_state" name="state">' + optionStates + '</select></form>');
		$$(".ticket_state").invoke('observe', 'change', changeState);
	}
	else if(title == "Edit Assigned To")
	{
		var currUser = t.up('td').down('a').readAttribute('href').split('/users/')[1];
		t.up('td').down('a').hide();
		var optionUsers = getUsers(currUser);
		t.replace('<form class="form_inplace_edit"><select class="ticket_assigned" name="state">' + optionUsers + '</select></select></form>');
		$$(".ticket_assigned").invoke('observe', 'change', changeAssigned);
	}
	else if(title == "Edit Milestone")
	{
		var currMilestone = t.up('td').down('a').innerHTML;
		t.up('td').down('a').hide();
		var optionMilestones = getMilestones(currMilestone);
		t.replace('<form class="form_inplace_edit"><select class="ticket_milestone" name="milestone">' + optionMilestones + '</select></select></form>');
		$$(".ticket_milestone").invoke('observe', 'change', changeMilestone);
	}
	Event.stop(e);
}

function clearSelectBoxes(e)
{
	$$('.editme').each(function(s){
		if(!hasPosition(s.up('td'), Event.pointerX(e), Event.pointerY(e)))
		{
			s.up('td').childElements().invoke('show');
			s.remove();
		}
	});
}

function getStates(selectedState)
{
	var r = '';
	for(var i=0; i<ticketStates.length; i++)
	{
		var t = new String(ticketStates[i]);
		var temp = new String(selectedState);
		t = t.replace(/[^a-zA-Z0-9\-]+/g,'');
		selectedState = temp.replace(/[^a-zA-Z0-9\-]+/g,'');
		r += '<option value="' + t + '"' + (t == selectedState ? ' selected="selected" ': '') + '>' + t + '</option>'
	}
	return r;
}

function getUsers(selectedUser)
{
	var r = '';
	for(var i=0; i<projectMembers.length; i++)
	{
		var t = projectMembers[i];
		r += '<option value="' + t[0] + '"' + (t[0] == selectedUser ? ' selected="selected" ': '') + '>' + t[1] + '</option>'
	}
	return r;
}

function getMilestones(selectedMilestone)
{
	var r = '';
	for(var i=0; i<projectMilestones.length; i++)
	{
		var t = projectMilestones[i];
		r += '<option value="' + t[0] + '"' + (t[1] == selectedMilestone ? ' selected="selected" ': '') + '>' + t[1] + '</option>'
	}
	return r;
}

function changeState()
{
	var t = $(this);
	var v = $F(this);
	var a = t.up('tr').down('td.tnum').down('a').readAttribute('href').split('-')[0] + ".xml?_token=" + accessToken;
	
	var x = t.up('td.ttstate').down('span.tstate');
	x.innerHTML = v;
	x.show();
	t.up('.editme').remove();

	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('PUT', a, true)
	xmlhttp.send('<ticket><state>' + v + '</state></ticket>');
	
}

function changeAssigned()
{
	var t = $(this);
	var v = $F(this);
	var a = t.up('tr').down('td.tnum').down('a').readAttribute('href').split('-')[0] + ".xml?_token=" + accessToken;

	var x = t.up('td').down('a');
	x.innerHTML = t.options[t.selectedIndex].text;
	x.writeAttribute('href', '/users/' + v);
	x.show();
	t.up('.editme').remove();
	
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('PUT', a, true)
	xmlhttp.send('<ticket><assigned-user-id type="integer">' + v + '</assigned-user-id></ticket>');
}

function changeMilestone()
{
	var t = $(this);
	var v = $F(this);
	var a = t.up('tr').down('td.tnum').down('a').readAttribute('href').split('-')[0] + ".xml?_token=" + accessToken;

	var x = t.up('td').down('a');
	x.innerHTML = t.options[t.selectedIndex].text;
	x.writeAttribute('href', getProjectUrl() + '/milestones/' + v);
	x.show();
	t.up('.editme').remove();
	
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('PUT', a, true)
	xmlhttp.send('<ticket><milestone-id type="integer">' + v + '</milestone-id></ticket>');
}

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}

