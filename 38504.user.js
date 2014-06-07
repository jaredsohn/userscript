// ==UserScript==
// @name           Filmtipset Avatars
// @namespace      DScript
// @include        http://www.filmtipset.se/forum.cgi*
// @include        http://www.filmtipset.se/yourpage.cgi*
// ==/UserScript==

var avatars = [];

function setAvatars()
{
	var avts = GM_getValue('avatars');
	avts = avts ? eval(avts) : [];

	for(i = 0; i < avts.length; i++)
	{
		avatars[avts[i].username.toLowerCase()] = avts[i].url;
	}
}

function start(first)
{
	if(first)
		setAvatars();

	if(document.location.href.indexOf('yourpage.cgi') >= 0)
		startUser();
	else if(document.location.href.indexOf('forum.cgi') >= 0)
		startForum(first);
}

function startUser()
{
	var username = document.getElementsByClassName('movie_header')[0];
	username = username.innerHTML.substring(0, username.innerHTML.length-2);

	var txt = document.getElementsByClassName('growingbox')[0];

	insertAvt(txt, username);	
}

function startForum(first)
{
	markup(document.getElementsByClassName('headold'), first);
	markup(document.getElementsByClassName('headnew'), first);
}

function markup(arr, bind)
{
	for(i = 0; i < arr.length; i++)
	{
		var link = arr[i].getElementsByClassName('member')[0];

		var msg = document.getElementById('mess' + arr[i].id.substring(4));
		insertAvt(msg, link.innerHTML);

		if(bind)
		{
			var spans = arr[i].getElementsByTagName('span');
			var span = spans[spans.length-1];
			span.addEventListener('click', promptAvt, false);
			span.style.cursor = 'pointer';
		}
	}
}

function insertAvt(obj, username)
{
	obj = obj.wrappedJSObject || obj;

	var url = avatars[username.toLowerCase()];

	if(obj)
	{
		if(url)
		{
			var current = obj.getElementsByClassName('customAvatar');
			if(current[0])
			{
				current[0].src = url;
				current[0].title = username;
				current[0].style.display = 'block';
			}
			else
			{
				obj.innerHTML = "<img title=\"" + username + "\" class=\"customAvatar\" src=\"" + url + "\" style=\"float: left; padding: 1px;\" />" + obj.innerHTML + "<div style=\"clear:both;\"></div>";
				current = obj.getElementsByClassName('customAvatar')[0];
				current.addEventListener('click', promptAvt, false);
				current.style.cursor = 'pointer';
			}
		}
		else
		{
			var current = obj.getElementsByClassName('customAvatar');
			if(current[0])
				current[0].style.display = 'none';
		}
	}
}

function promptAvt(event)
{
	var target = event.target.wrappedJSObject || event.target;
	var username = '';

	if(target.tagName == 'IMG')
		username = target.title;
	else
	{
		var link = target.parentNode.getElementsByClassName('member')[0];
		username = link.innerHTML;
	}

	var current = avatars[username.toLowerCase()] || '';
	
	var av = prompt('Ange url till en bild för ' + username + ':', current);
	if(av || av === '')
	{
		saveAvatar(username, av);
		start(false);
	}
}

function saveAvatar(user, avatar)
{
	if(user)
	{
		var avts = GM_getValue('avatars');
		avts = avts ? eval(avts) : [];

		if(avatars[user.toLowerCase()])
		{
			for(x = 0; x < avts.length; x++)
			{
				if(avts[x].username.toLowerCase() == user.toLowerCase())
				{
					avts[x].url = avatar;
					break;
				}
			}
		}
		else
		{
			avts.push({username:user, url:avatar});
		}

		GM_setValue('avatars', avts.toSource());

		avatars[user.toLowerCase()] = avatar;
	}
}

window.addEventListener('load', function() { start(true) }, false);