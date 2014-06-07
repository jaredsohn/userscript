// ==UserScript==
// @name           Boktipset ForumNav
// @namespace      DScripts
// @include        http://www.boktipset.se/forum/forum.cgi?*thread=*
// ==/UserScript==

var navPosts = [];
var newIxs = [];
var posts = document.getElementsByClassName('forum_post');
var atPost = -1;
var forumnavVersion = "1.0.8";

var hitCount = -1;

Function.prototype.bind = function(context)
{
   var __method = this;
   var __args = new Array();

   for(it = 1; it < arguments.length; it++)
      __args.push(arguments[it]);

   return function() {
      for(ait = 0; ait < arguments.length; ait++)
         __args.push(arguments[ait]);

      __method.apply(context, __args)
   };
}

function toggleChildren(chd)
{
	var display = (this.innerHTML == '-') ? 'none' : 'block';
	var chdid;

	for(var i = 0; i < chd.length; i++)
	{
		var c = chd[i].wrappedJSObject || chd[i];

		if(!chdid)
			chdid = c.id;

		if(c.id == chdid)
			c.style.display = display;
	}

	this.innerHTML = (this.innerHTML == '-') ? '+' : '-';
}


for(var i = 0; i < posts.length; i++)
{
	var p = posts[i].wrappedJSObject || posts[i];

	if(p.style.display != 'none')
	{
		hitCount++;

		navPosts.push(p);
		var bod = p.getElementsByTagName('div')[0];
		bod.style.backgroundColor = getbg(false);;
		bod.style.border = getborder(false);
		bod.style.margin = '5px 0';
		bod.style.padding = '5px';
		bod.style.minWidth = '290px';
		corner(bod);

		var abusePost = bod.getElementsByClassName('abusePost')[0];
		abusePost = abusePost.wrappedJSObject || abusePost;
		abusePost.style.border = getborder(false);

		var children = p.getElementsByClassName('forum_children');
		if(children.length > 0)
		{
			p.style.position = 'relative';

			var toggleChd = document.createElement('a');
			toggleChd.href = 'javascript:void(0);';
			toggleChd.innerHTML = '-';
			toggleChd.style.position = 'absolute';
			toggleChd.style.left = '-20px';
			toggleChd.style.top = '0';
			toggleChd.style.width = '15px';
			toggleChd.style.height = '15px';
			toggleChd.style.textAlign = 'center';
			toggleChd.style.backgroundColor = '#8AA9BC';
			toggleChd.style.display = 'block';
			toggleChd.style.color = 'white';
			toggleChd.style.border = '1px solid #5F9BBF';
			toggleChd.style.fontWeight = 'bold';
			toggleChd.className = 'toggleLink';

			corner(toggleChd);
			
			p.appendChild(toggleChd);

			toggleChd.addEventListener('click', toggleChildren.bind(toggleChd, children), false);
		}

		var isNew = false;
		var spans = bod.getElementsByTagName('span');
		for(var x = 0; x < spans.length; x++)
		{
			var span = spans[x];
			span = span.wrappedJSObject || span;

			if(span.innerHTML.toLowerCase() == '(nytt inlägg)')
			{
				isNew = true;
				break;
			}
		}

		if(isNew)
		{
			bod.style.backgroundColor = getbg(true);
			bod.style.border = getborder(true);
			abusePost.style.border = getborder(true);
			newIxs.push(hitCount); 
		}
	}
}

unsafeWindow.document.styleSheets[0].insertRule('hr { display: none !important; }', unsafeWindow.document.styleSheets[0].cssRules.length);
unsafeWindow.document.styleSheets[0].insertRule('.userImageMiddle { padding: 0 !important; padding-right: 5px !important; }', unsafeWindow.document.styleSheets[0].cssRules.length);
unsafeWindow.document.styleSheets[0].insertRule('.abusePost { -moz-border-radius: 4px; padding: 6px 5px 2px 5px !important; background-color: white !important; }', unsafeWindow.document.styleSheets[0].cssRules.length);

function corner(o)
{
	o.style.MozBorderRadius = '4px';
}

function closehelp()
{
	var shade = document.getElementById('helpshade');

	if(shade)
	{
		shade = shade.wrappedJSObject || shade;
		shade.style.display = 'none';
	}

	var hbox = document.getElementById('navHelpBox');
	if(hbox)
	{
		hbox = hbox.wrappedJSObject || hbox;
		hbox.style.display = 'none';
	}
}

function help()
{
	var helpbox = document.getElementById('navHelpBox');
	if(!helpbox)
	{
		helpbox = document.createElement('div');
		helpbox.id = 'navHelpBox';
		helpbox.style.backgroundColor = getbg(true);
		helpbox.style.border = getborder(true);
		helpbox.style.width = '250px';
		helpbox.style.height = '130px';
		helpbox.style.position = 'fixed';
		helpbox.style.padding = '10px';
		helpbox.style.left = (document.body.scrollWidth / 2 - 135) + 'px';
		helpbox.style.top = (document.documentElement.clientHeight / 2 - 75) + 'px';
		helpbox.style.zIndex = '2002';
		
		corner(helpbox);

		helpbox.innerHTML = '<b>Forumnavigering</b><br/><br/>Nedpil: Nästa inlägg<br/>Uppil: Föregående inlägg<br/>Mellanslag: Nästa olästa inlägg<br/>Vänsterpil: Dölj svar till aktivt inlägg<br/>Högerpil: Visa dolda till aktiv inlägg<br/><br/>';

		var closelink = document.createElement('a');
		closelink.innerHTML = 'Stäng';
		closelink.href = 'javascript:void(0);';

		helpbox.appendChild(closelink);

		closelink.addEventListener('click', closehelp, false);

		document.body.appendChild(helpbox);
	}

	helpbox.style.display = 'block';

	var shade = document.getElementById('helpshade');
	if(!shade)
	{
		shade = document.createElement('div');
		shade.id = 'helpshade';
		shade.style.backgroundColor = getbg(false);
		shade.style.opacity = '0.65';
		shade.style.zIndex = '2000';
		shade.style.position = 'fixed';
		shade.style.top = '0';
		shade.style.left = '0';
		shade.style.width = '100%';
		shade.style.height = '100%';
		document.body.appendChild(shade);
	}

	shade = shade.wrappedJSObject || shade;

	shade.style.display = 'block';

}

var navContainer = document.createElement('div');
navContainer.style.position = 'fixed';
navContainer.style.left = '20px';
navContainer.style.bottom = '20px';

var nav = document.createElement('div');
nav.style.padding = '5px';
nav.style.backgroundColor = getbg(newIxs.length > 0);
nav.style.textAlign = 'center';
nav.style.width = '53px';
nav.style.border = getborder(newIxs.length > 0);
corner(nav);

var aUp = document.createElement('a');
aUp.innerHTML = '^';
aUp.id = 'navUp';
aUp.href = 'javascript:Void(0);';
aUp.style.display = 'block';

nav.appendChild(aUp);
aUp.addEventListener('click', navup, false);

var stat = document.createElement('div');
stat.innerHTML = '0/' + navPosts.length;
stat.id = 'navStat';

nav.appendChild(stat);

if(newIxs.length > 0)
{
	var aNew = document.createElement('a');
	aNew.innerHTML = 'nästa nya';
	aNew.id = 'navNew';
	aNew.href = 'javascript:void(0);';
	aNew.style.display = 'block';

	nav.appendChild(aNew);
	aNew.addEventListener('click', nextnew, false);
}

var aDn = document.createElement('a');
aDn.innerHTML = 'v';
aDn.id = 'navDn';
aDn.href = 'javascript:Void(0);';
aDn.style.display = 'block';

nav.appendChild(aDn);
aDn.addEventListener('click', navdown, false);

navContainer.appendChild(nav);

var helpLink = document.createElement('a');
helpLink.innerHTML = 'Hjälp';
helpLink.href = 'javascript:void(0);';

navContainer.appendChild(helpLink);
helpLink.addEventListener('click', help, false);

document.body.appendChild(navContainer);

window.addEventListener('keypress', keypress, false);
window.addEventListener('keyup', keyup, false);

function navto()
{
	navPosts[atPost].getElementsByTagName('div')[0].style.backgroundColor = '#FFF1BF';
	navPosts[atPost].getElementsByTagName('div')[0].style.border = '1px solid #FFE27F';

	var abusePost = navPosts[atPost].getElementsByTagName('div')[0].getElementsByClassName('abusePost')[0];
	abusePost = abusePost.wrappedJSObject || abusePost;
	abusePost.style.border = '1px solid #FFE27F';

	var top = unsafeWindow.$(navPosts[atPost]).cumulativeOffset()[1];
	var height = unsafeWindow.$(navPosts[atPost].getElementsByTagName('div')[0]).getHeight();
	var winH = document.documentElement.clientHeight;
	var sTop = document.documentElement.scrollTop;

	var isInView = (top>sTop && top+height < sTop+winH);

	if(!isInView)
	{
		if(top+height > sTop+winH && winH > height)
			window.scrollTo(0, top + height - winH + 30);
		else
			window.scrollTo(0, top - 30);
	}

	if(document.getElementById('navNew'))
		document.getElementById('navNew').style.color = (getnewix() >= 0) ? '#003366' : '#333333';

	document.getElementById('navStat').innerHTML = (atPost+1) + '/' + navPosts.length;
}

function getnewix()
{
	var toPost = -1;
	for(var i = 0; i < newIxs.length; i++)
	{
		if(newIxs[i] > atPost)
		{
			toPost = newIxs[i];
			break;
		}
	}

	return toPost;
}

function nextnew()
{
	var toPost = getnewix();
	if(toPost >= 0)
	{
		if(atPost >= 0)
		{
			navPosts[atPost].getElementsByTagName('div')[0].style.backgroundColor = getbg();
			navPosts[atPost].getElementsByTagName('div')[0].style.border = getborder();

			var abusePost = navPosts[atPost].getElementsByTagName('div')[0].getElementsByClassName('abusePost')[0];
			abusePost = abusePost.wrappedJSObject || abusePost;
			abusePost.style.border = getborder();
		}

		atPost = toPost;

		navto();
	}
	
}

function navdown()
{
	if(atPost >= 0)
	{
		navPosts[atPost].getElementsByTagName('div')[0].style.backgroundColor = getbg();
		navPosts[atPost].getElementsByTagName('div')[0].style.border = getborder();

		var abusePost = navPosts[atPost].getElementsByTagName('div')[0].getElementsByClassName('abusePost')[0];
		abusePost = abusePost.wrappedJSObject || abusePost;
		abusePost.style.border = getborder();
	}

	atPost = Math.min(navPosts.length-1, atPost+1);

	if(navPosts[atPost].parentNode.style.display == 'none')
	{
		if(atPost == navPosts.length-1)
		{
			navToLastVisible();
			return;
		}

		navdown();
		return;
	}


	navto();
}

function navToLastVisible()
{
	for(var i = navPosts.length-1; i >= 0; i--)
	{		
		if(navPosts[i].parentNode.style.display != 'none')
		{
			atPost = i;
			navto();
			return;
		}
	}
}

function navup()
{
	if(atPost >= 0)
	{
		navPosts[atPost].getElementsByTagName('div')[0].style.backgroundColor = getbg();
		navPosts[atPost].getElementsByTagName('div')[0].style.border = getborder();


		var abusePost = navPosts[atPost].getElementsByTagName('div')[0].getElementsByClassName('abusePost')[0];
		abusePost = abusePost.wrappedJSObject || abusePost;
		abusePost.style.border = getborder();
	}

	atPost = Math.max(0, atPost-1);

	if(navPosts[atPost].parentNode.style.display == 'none')
	{
		navup();
		return;
	}

	navto();
}

function keyup(e)
{
	if(!isactive)
		return;

	if(e.keyCode == 32)
	{
		nextnew();
		event.preventDefault();
		event.stopPropagation();
	}
}

function keypress(e)
{
	if(!isactive)
		return;

	if(e.keyCode == 37 || e.keyCode == 39)
	{
		var tLink = navPosts[atPost].getElementsByClassName('toggleLink');
		if(tLink.length > 0)
		{
			tLink = tLink[tLink.length-1].wrappedJSObject || tLink[tLink.length-1];
			var children = navPosts[atPost].getElementsByClassName('forum_children');

			if(
				(tLink.innerHTML == '-' && e.keyCode == 37) ||
				(tLink.innerHTML == '+' && e.keyCode == 39)
			)
			{
				toggleChildren.bind(tLink, children)();
				return;
			}
		}

		if(e.keyCode == 37)
		{
			var tLink = navPosts[atPost].parentNode.parentNode.getElementsByClassName('toggleLink');
			tLink = tLink[tLink.length-1].wrappedJSObject || tLink[tLink.length-1];
			var children = navPosts[atPost].parentNode.parentNode.getElementsByClassName('forum_children');

			toggleChildren.bind(tLink, children)();
			navup();
		}
	}
	if(e.keyCode == 40)
	{
		navdown();

		e.preventDefault();
		e.stopPropagation();
	}
	else if(e.keyCode == 38)
	{
		navup();

		e.preventDefault();
		e.stopPropagation();
	}
}

function getbg()
{
	if(arguments.length == 1)
	{
		return arguments[0] ? '#CFDCE5' : '#eeeeee';
	}

	for(var i = 0; i < newIxs.length; i++)
	{
		if(newIxs[i] == atPost)
			return '#CFDCE5';
	}

	return '#eeeeee';
}

function getborder()
{
	if(arguments.length == 1)
	{
		return arguments[0] ? '1px solid #A7C8DF' : '1px solid #CFCFCF';
	}

	for(var i = 0; i < newIxs.length; i++)
	{
		if(newIxs[i] == atPost)
			return '1px solid #A7C8DF';
	}

	return '1px solid #CFCFCF';
}

var isactive = true;

checkfocus(document.getElementsByTagName('textarea'));
checkfocus(document.getElementsByTagName('input'));

function checkfocus(el)
{
	for(var i = 0; i < el.length; i++)
	{
		var e = el[i];
		e = e.wrappedJSObject || e;

		e.addEventListener('focus', function() { isactive = false; }, false);
		e.addEventListener('blur', function() { isactive = true; }, false);
	}
}

// version check
var lastCheck = GM_getValue('lastversioncheck', new Date(1970, 1, 1));

if(lastCheck < new Date().setHours(new Date().getHours()-1))
{
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.org/scripts/review/47327',
	onload: function(res) {
		var versionCheck = res.responseText.indexOf('var forumnavVersion = &quot;' + forumnavVersion + '&quot;');
		if(versionCheck == -1)
		{
			var helpbox = document.createElement('div');
			helpbox = document.createElement('div');
			helpbox.id = 'versionBox';
			helpbox.style.backgroundColor = getbg(true);
			helpbox.style.border = getborder(true);
			helpbox.style.width = '250px';
			helpbox.style.height = '130px';
			helpbox.style.position = 'fixed';
			helpbox.style.zIndex = '2002';
			helpbox.style.padding = '10px';
			helpbox.style.left = (document.body.scrollWidth / 2 - 135) + 'px';
			helpbox.style.top = (document.documentElement.clientHeight / 2 - 75) + 'px';
		
			corner(helpbox);

			var shade = document.createElement('div');
			shade.id = 'helpshade';
			shade.style.backgroundColor = getbg(false);
			shade.style.opacity = '0.65';
			shade.style.zIndex = '2000';
			shade.style.position = 'fixed';
			shade.style.top = '0';
			shade.style.left = '0';
			shade.style.width = '100%';
			shade.style.height = '100%';
			shade.style.display = 'block';

			document.body.appendChild(shade);

			helpbox.innerHTML = '<b>Forumnavigering</b><br/><br/>En nyare version av det här scriptet finns att hämta:<br/><br/><a href="http://userscripts.org/scripts/show/47327">http://userscripts.org/scripts/show/47327</a><br/><br/>';

			var closelink = document.createElement('a');
			closelink.innerHTML = 'Stäng';
			closelink.href = 'javascript:void(0);';

			helpbox.appendChild(closelink);
			closelink.addEventListener('click', function() { document.getElementById('helpshade').style.display = 'none'; document.getElementById('versionBox').style.display = 'none'; }, false);
			document.body.appendChild(helpbox);
		}
	} });

	GM_setValue('lastversioncheck', new Date());
}