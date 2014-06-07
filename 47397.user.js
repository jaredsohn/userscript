// ==UserScript==
// @name           Forum UserHighlight
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/forums/
// @include	   http://www.courtrivals.com/forums/index.php
// @description    Allows users to highlight their teammates and friends on the Index page of the CR Forum. Also automatically highlights the Moderators.
// ==/UserScript==

var modlist = new Array(), teammateslist = new Array(), friendslist = new Array(), modsdisplay = new Array(), teammatesdisplay = new Array(), friendsdisplay = new Array(), previousteammates, previousfriends, onlineusers = new Array(), onlineuserslink = new Array(), reference;

var dd = document.evaluate(
	'//dd',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null)

reference = document.getElementById('onlinelist').innerHTML

for(var i = 0; i < dd.snapshotLength; i++)
{
	if(reference.indexOf('<dd>') != -1)
	{
		reference = reference.slice(reference.indexOf('<dd>') + 5);
		onlineusers[i] = reference.slice(reference.indexOf('>') + 1,reference.indexOf('<')).toLowerCase();
		onlineuserslink[i] = '<' + reference.slice(0,reference.indexOf('</a>') + 4);
	}
	else
	{
		break;
	}
}

var spans = document.evaluate(
	'//span[@class="moderator"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null)

//var modlisttemp = spans.snapshotItem(0).innerHTML;
for(var i = 0; i > -1; i++)
{
	if(spans.snapshotItem(i).innerHTML.indexOf('<a href="profile.php?id=8"><span class="byuser">TheKaz</span></a>') != -1)
	{
		var modlisttemp = spans.snapshotItem(i).innerHTML;
		break;
	}
}
modlisttemp = modlisttemp.slice(modlisttemp.indexOf('<a href'),modlisttemp.indexOf(']'));
for(var i = 0; i > -1; i++)
{
	if(modlisttemp.indexOf('<span') != -1)
	{
		modlisttemp = modlisttemp.slice(modlisttemp.indexOf('<span'));
		modlist[i] = modlisttemp.slice(modlisttemp.indexOf('">') + 2,modlisttemp.indexOf('</span')).toLowerCase();
		modlisttemp = modlisttemp.slice(modlisttemp.indexOf(',') + 2);
	}
	else
	{
		break;
	}
}

var k = 0;
for(var i = 0; i < modlist.length; i++)
{
	for(var j = 0; j < onlineusers.length; j++)
	{
		if(modlist[i] == onlineusers[j])
		{
			modsdisplay[k] = ' ' + onlineuserslink[j];
			k++;
		}
	}
}

if(modsdisplay == "")
{
	modsdisplay = '<i>None</i>';
}

var teammatestemp = GM_getValue("teammates","");
if(teammatestemp != "")
{
	previousteammates = teammatestemp.slice(0,teammatestemp.length - 1);
}
for(var i = 0; i > -1; i++)
{
	if(teammatestemp.indexOf(',') != -1)
	{
		teammateslist[i] = teammatestemp.slice(0,teammatestemp.indexOf(',')).toLowerCase();
		teammatestemp = teammatestemp.slice(teammatestemp.indexOf(',') + 1);
	}
	else
	{
		break;
	}
}

var k = 0;
for(var i = 0; i < teammateslist.length; i++)
{
	for(var j = 0; j < onlineusers.length; j++)
	{
		if(teammateslist[i] == onlineusers[j])
		{
			teammatesdisplay[k] = ' ' + onlineuserslink[j];
			k++;
		}
	}
}

if(teammatesdisplay != "")
{
	teammatesdisplay = '<div><strong>Teammates:&nbsp;' + teammatesdisplay + '</strong></div>';
}

var friendstemp = GM_getValue("friends","");
if(friendstemp != "")
{
	previousfriends = friendstemp.slice(0,friendstemp.length - 1);
}
for(var i = 0; i > -1; i++)
{
	if(friendstemp.indexOf(',') != -1)
	{
		friendslist[i] = friendstemp.slice(0,friendstemp.indexOf(',')).toLowerCase();
		friendstemp = friendstemp.slice(friendstemp.indexOf(',') + 1);
	}
	else
	{
		break;
	}
}

var k = 0;
for(var i = 0; i < friendslist.length; i++)
{
	for(var j = 0; j < onlineusers.length; j++)
	{
		if(friendslist[i] == onlineusers[j])
		{
			friendsdisplay[k] = ' ' + onlineuserslink[j];
			k++;
		}
	}
}

if(friendsdisplay != "")
{
	friendsdisplay = '<div><strong>Friends:&nbsp;' + friendsdisplay + '</strong></div>';
}

var updatebutton = document.createElement('div');
updatebutton.innerHTML = '<div><input type="button" id="Update" value="Edit Highlighted User List"></input></div>';
document.getElementById('onlinelist').parentNode.insertBefore(updatebutton, document.getElementById('onlinelist').nextSibling);
updatebutton.addEventListener('click', function()
{
	updatebutton.parentNode.removeChild(updatebutton);
	var userform = document.createElement('div');
	userform.innerHTML = '<div><p>&nbsp;</p><center><strong><u>Hightlighted User List</u></strong><p>&nbsp;</p>' +
		'<strong>Teammates:&nbsp;</strong><input id="teammates" type="text" size="125" value="' + previousteammates + '"></input><p>&nbsp;</p>' +
		'<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Friends:&nbsp;</strong><input id="friends" type="text" size="125" value="' + previousfriends + '"></input><p>&nbsp;</p>' +
		'<i>Separate multiple user names by a comma with no spaces</i><br>' +
		'<input id="submitbutton" type="button" value="Submit"></input></center></div>';
	document.getElementById('onlinelist').parentNode.insertBefore(userform, document.getElementById('onlinelist').nextSibling);
	document.getElementById('submitbutton').addEventListener('click', function()
	{
		GM_setValue("teammates",document.getElementById('teammates').value + ',');
		GM_setValue("friends",document.getElementById('friends').value + ',');
		window.location.reload();
	}, false);
}, false);

var moderators = document.createElement('div');
moderators.innerHTML = '<div><strong>Moderators:&nbsp;' + modsdisplay + '</strong></div>';
document.getElementById('onlinelist').parentNode.insertBefore(moderators, document.getElementById('onlinelist'));

var teammates = document.createElement('div');
teammates.innerHTML = teammatesdisplay;
document.getElementById('onlinelist').parentNode.insertBefore(teammates, document.getElementById('onlinelist'));

var friends = document.createElement('div');
friends.innerHTML = friendsdisplay;
document.getElementById('onlinelist').parentNode.insertBefore(friends, document.getElementById('onlinelist'));