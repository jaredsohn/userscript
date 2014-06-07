// ==UserScript==
// @name			Inbox global ban
// @description		Ban them all!
// @namespace		http://leprosorium.ru/users/ViSoR
// @include			http://*leprosorium.ru/my/inbox/*
// @version			0.2.4
// ==/UserScript==

var wtf;
var inboxId;

AddBanThemAll();

function AddBanThemAll()
{
	if (!Init())
		return;

	var banElement = document.createElement("span");
	banElement.innerHTML = '[<a id="js_ban_all" onclick="return false;" title="Убить всех человеков!!1" href="#" >Забанить всех</a>]<br>';
	var unbanElement = document.createElement("span");
	unbanElement.innerHTML = '[<a id="js_unban_all" onclick="return false;" title="Ура, всеобщая амнистия!" href="#" >Разбанить всех</a>]<br><br>';

	var insertionNode = document.getElementsByClassName("js-inboxPeople")[0];
	insertionNode.parentNode.appendChild(banElement);
	insertionNode.parentNode.appendChild(unbanElement);

	var banLink = document.getElementById("js_ban_all");
	banLink.addEventListener("click", function(event) {ProcessUsers('ban'); return false; }, false);

	var unbanLink = document.getElementById("js_unban_all");
	unbanLink.addEventListener("click", function(event) {ProcessUsers('unban'); return false; }, false);
}

function Init()
{
	var bodyHtml = document.body.innerHTML;
	inboxId = Match(bodyHtml, /javascript:openpostmodwin\((\d+)\)/);
	wtf = Match(bodyHtml, /inboxHandler.wtf = '([0-9a-z]+)'/);

	return inboxId != null;
}

function ProcessUsers(what)
{
	var users = document.getElementsByClassName("js-inboxPerson");
	var i = 0;

	Runner();

	function Runner()
	{
		if (i < users.length)
		{
			var userId = GetUserId(users[i]);
			var link = GetBanLink(users[i]);
			ProcessUser(what, inboxId, userId, wtf, link);
			
			i++;
			window.setTimeout(Runner, 500);
		}
	}
}

function Match(text, pattern)
{
	var m = text.match(pattern);

	if (m == null) 
		return null;

	return m[1];
}

function GetUserId(userNode)
{
	var userHtml = userNode.innerHTML;
	return Match(userHtml, /'\d{1,10}', '(\d{1,10})'/);
}

function GetBanLink(userNode)
{
	var link = userNode.getElementsByClassName("js-inboxPerson-ban")[0];
	return link;
}

function HasClass(element, cls)
{
	return element.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
 
function AddClass(element, cls)
{
	if (!HasClass(element, cls))
		element.className += " "+cls;
}
 
function RemoveClass(element, cls)
{
	if (HasClass(element, cls))
	{
    	var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		element.className = element.className.replace(reg,' ');
	}
}

function GetAncestorByClassName( oCurrentElement, sClassName, sTagName ) {
	var oCurrent = oCurrentElement.parentNode;
	while ( oCurrent.parentNode )
	{
		if ( HasClass( oCurrent, sClassName ) && ( !sTagName || oCurrent.tagName.toLowerCase() == sTagName.toLowerCase() ) )
			return oCurrent;

		oCurrent = oCurrent.parentNode;
	}
}

function GetElement(parent, cls)
{
	var children = parent.getElementsByClassName(cls);
	if (children == null)
		return null;

	return children[0];
}

function GetFirst(parent)
{
	var children = parent.childNodes;
	if (children == null)
		return null;

	return children[0];
}

function ProcessUser(what, inbox_id, user_id, wtf, button) {
	var data = 'pid=' + inbox_id + '&wtf=' + wtf + '&' + what + '=' + user_id;
	if (HasClass(button, 'js-loading'))
		return false;

	AddClass(button, 'js-loading');

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function ()
	{
		if(xmlhttp.readyState == 4)
		{
			if(xmlhttp.status == 200)
			{
				var response = xmlhttp.responseText;
				if (response)
				{
					var personDiv = GetAncestorByClassName(button, 'js-inboxPerson', 'DIV');
					if (what == 'kick')
					{
						personDiv.destroy();
					}

					if (what == 'ban')
					{
						RemoveClass(GetElement(personDiv, 'js-inboxPerson-unban'), 'hidden');
						AddClass(GetElement(personDiv, 'js-inboxPerson-ban'), 'hidden');
						AddClass(GetFirst(GetElement(personDiv, 'js-inboxPerson-name')), 'irony');
					}

					if (what == 'unban')
					{
						AddClass(GetElement(personDiv, 'js-inboxPerson-unban'), 'hidden');
						RemoveClass(GetElement(personDiv, 'js-inboxPerson-ban'), 'hidden');
						RemoveClass(GetFirst(GetElement(personDiv, 'js-inboxPerson-name')), 'irony');
					}
				}
				RemoveClass(button, 'js-loading');
			}
		}
	}

	xmlhttp.open("POST", '/inboxctl', true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(data);
}
