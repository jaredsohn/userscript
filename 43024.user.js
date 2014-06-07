// ==UserScript==
// @name           Filmtipset Google Calendar
// @namespace      DScript
// @description    Lägg till en film ifrån TV eller cinemateket-listan till google calendar
// @include        http://www.filmtipset.se/package_view.cgi?package=*
// @include        http://www.filmtipset.se/tv.html
// @include        http://www.filmtipset.se/film/*
// ==/UserScript==

// ==UserScript==
// @name           Filmtipset Google Calendar
// @namespace      DScript
// @description    Lägg till en film ifrån TV eller cinemateket-listan till google calendar
// @include        http://www.filmtipset.se/package_view.cgi?package=*
// ==/UserScript==

function togmt(d)
{
	d = new Date(d.substring(0, 4) + '/' + d.substr(4,2) + '/' + d.substr(6,2) + ' ' + d.substr(9,2) + ':' + d.substr(11,2));
	d.setHours(d.getHours()-parseInt(d.toString().substr(d.toString().indexOf('GMT')+3,3)));
	return d.getFullYear().toString() + ('0' + (d.getMonth()+1)).substr(('0' + (d.getMonth()+1)).length-2,2) + ('0' + d.getDate()).substr(('0' + d.getDate()).length-2,2) + 'T' + ('0' + d.getHours()).substr(('0' + d.getHours()).length-2,2) + ('0' + d.getMinutes()).substr(('0' + d.getMinutes()).length-2,2) + '00Z';
}

function getEndTime(d, addMin)
{
	d = new Date(d.substring(0, 4) + '/' + d.substr(4,2) + '/' + d.substr(6,2) + ' ' + d.substr(9,2) + ':' + d.substr(11,2));
	d.setMinutes(d.getMinutes()+addMin);
	return d.getFullYear().toString() + ('0' + (d.getMonth()+1)).substr(('0' + (d.getMonth()+1)).length-2,2) + ('0' + d.getDate()).substr(('0' + d.getDate()).length-2,2) + 'T' + ('0' + d.getHours()).substr(('0' + d.getHours()).length-2,2) + ('0' + d.getMinutes()).substr(('0' + d.getMinutes()).length-2,2) + '00Z';
}

function markupTV(n, container)
{
	var tvString = n.nodeValue.replace(/(^\s+|\s+$)/g, '');
	var dateText = tvString.substring(tvString.substring(0, tvString.lastIndexOf(' ')-1).lastIndexOf(' ')+1);
	
	var month = dateText.substring(dateText.indexOf('/')+1, dateText.indexOf(' '));
	var date = dateText.substring(0, dateText.indexOf('/'));

	var dateText = new Date().getFullYear().toString() + ('0' + month).substr(month.length-1) + ('0' + date).substr(date.length-1) + 'T' + dateText.substring(dateText.indexOf(' ')+1).replace(':','') + '00Z';

	var bheaders = document.getElementsByTagName('b');
	var duration = 120;

	for(bi = 0; bi < bheaders.length; bi++)
	{
		if(bheaders[bi].innerHTML == 'Längd:')
		{
			duration = parseInt(bheaders[bi].parentNode.parentNode.getElementsByClassName('list')[0].innerHTML.substring(1));
			break;
		}
	}

	var endDate = getEndTime(dateText, duration);
	var title = document.getElementsByClassName('movie_header')[0].innerHTML.replace(/(^\s+|\s+$)/g, '');
	var desc = 'TV - ' + title;

	var url = '/event?action=TEMPLATE&text='+encodeURI(title)+'&dates='+togmt(dateText)+'%2F'+togmt(endDate)+'&details='+encodeURI(desc)+'&location=&trp=false&sprop=http%3A%2F%2Fwww.filmtipset.se&sprop=name:Filmtipset'

	var img = document.createElement('img');
	img.src = 'http://calendar.google.com/googlecalendar/images/favicon.ico';
	img.title = 'Lägg till i Google Calendar';
	img.style.cursor = 'pointer';

	container.insertBefore(img, n.nextSibling);
	
	img.addEventListener('click', function() { openGCal(url); }, false);
}

function markupFilm(dateText, filmRow, itemtype)
{
	dateText = dateText + 'T' + filmRow.getElementsByClassName('row')[0].innerHTML.replace(':','') + '00Z';
	var duration = parseInt(filmRow.getElementsByClassName('movie_pop_info')[4].lastChild.nodeValue.substring(1));
	var endDate = getEndTime(dateText, duration);
	var title = filmRow.getElementsByClassName('title')[0].getElementsByTagName('a')[0].innerHTML;

	var desc;
	if(itemtype == 'list')
		desc = document.getElementsByClassName('big_canvas')[0].getElementsByTagName('h1')[0].innerHTML + ' - ' + title;
	else if(itemtype == 'tv')
		desc = 'TV - ' + title;

	var url = '/event?action=TEMPLATE&text='+encodeURI(title)+'&dates='+togmt(dateText)+'%2F'+togmt(endDate)+'&details='+encodeURI(desc)+'&location=&trp=false&sprop=http%3A%2F%2Fwww.filmtipset.se&sprop=name:Filmtipset'

	var r = filmRow.getElementsByClassName('row')[1];
	r.style.width = parseInt(r.style.width) - 20 + 'px';

	r = filmRow.getElementsByClassName('back_row')[0];
	r.style.marginLeft = parseInt(r.style.marginLeft) - 20 + 'px';

	r = filmRow.getElementsByClassName('price')[0];
	r.style.marginLeft = parseInt(r.style.marginLeft) - 20 + 'px';

	r = filmRow.getElementsByClassName('review')[0];
	r.style.marginLeft = parseInt(r.style.marginLeft) - 20 + 'px';

	var div = document.createElement('div');
	div.className = 'row';
	div.style.marginLeft = itemtype == 'list' ? '420px' : '340px';

	var img = document.createElement('img');
	//img.src = 'http://www.google.com/calendar/images/ext/gc_button1_sv.gif';
	img.src = 'http://calendar.google.com/googlecalendar/images/favicon.ico';
	img.title = 'Lägg till i Google Calendar';
	img.style.cursor = 'pointer';

	div.appendChild(img);

	filmRow.appendChild(div);

	img.addEventListener('click', function() { openGCal(url); }, false);
}

function openGCal(url)
{
	var prevWin = document.getElementById('gcalwin');
	if(prevWin) prevWin.parentNode.removeChild(prevWin);

	appDomain = GM_getValue('gcal_appdomain');
	var appInfix = appDomain ? '/hosted/'+appDomain : '';

	if(document.getElementById('gcalcanvas'))
		document.getElementById('gcalcanvas').style.display = 'block';
	else
	{
		var canvas = document.createElement('div');
		canvas.id = 'gcalcanvas';
		canvas.style.height = '100%';
		canvas.style.width = '100%';
		canvas.style.left = '0';
		canvas.style.top = '0';
		canvas.style.position = 'fixed';
		canvas.style.zIndex = '11';
		canvas.style.backgroundColor = 'white';
		canvas.style.opacity = '0.8';

		document.body.appendChild(canvas);
	}

	var win = document.createElement('div');
	win.id = 'gcalwin';
	win.style.position = 'fixed';
	win.style.left = (document.body.scrollWidth / 2) - 405 + 'px';
	win.style.top = (document.documentElement.clientHeight / 2) - 270 + 'px';
	win.style.padding = '5px';
	win.style.backgroundColor = 'white';
	win.style.border = '1px solid black';
	win.style.zIndex = 12;

	var iframe = document.createElement('iframe');
	iframe.name = 'gcal_iframe';
	iframe.id = iframe.name;
	iframe.type = 'content';
	iframe.style.height = '530px';
	iframe.style.width = '800px';
	iframe.style.border = '0';
	iframe.style.paddingBottom = '2px';
	iframe.style.borderBottom = '1px solid black';
	iframe.src = 'http://www.google.com/calendar' + appInfix + url;

	var div = document.createElement('div');

	var a = document.createElement('a');
	a.href = 'javascript:void(0);';
	a.innerHTML = 'Stäng';

	var apps = document.createElement('a');
	apps.href = 'javascript:void(0);';
	apps.innerHTML = 'Använd Google Apps';
	apps.style.marginLeft = '14px';

	div.appendChild(a);
	div.appendChild(apps);

	win.appendChild(iframe);
	win.appendChild(div);
	document.body.appendChild(win);

	a.addEventListener('click', function() { document.getElementById('gcalcanvas').style.display = 'none'; document.getElementById('gcalwin').parentNode.removeChild(document.getElementById('gcalwin')); }, false);
	apps.addEventListener('click', function() { googleApps(url); }, false);
}

function googleApps(url)
{
	var appDomain = prompt('Ifall du vill använda ett google app-konto istället för\nett vanligt google-konto, ange domän nedan.\n\nAnge endast domännamn utan "www" eller liknande.', GM_getValue('gcal_appdomain'));
	if(appDomain != undefined)
	{
		GM_setValue('gcal_appdomain', appDomain);
		openGCal(url);
	}
}

function tryListMarkup(h2s, itemtype)
{
	for(i = 0; i < h2s.length; i++)
	{
		var dateText = h2s[i].innerHTML;

		if(/.*dag \d{4}-\d\d-\d\d$/.test(dateText))
	 	{
			dateText = dateText.substring(dateText.indexOf(' ')+1).replace(/-/g,'');

			if(itemtype == 'list')
			{
				var n = h2s[i].nextSibling;
	
				while(n && n.className != 'h2')
				{
					if(n.nodeType == 1)
					{
						markupFilm(dateText, n, itemtype);
					}
		
					n = n.nextSibling;
				}
			}
			else if(itemtype == 'tv')
			{
				var n = h2s[i].parentNode.nextSibling;

				while(n)
				{
					if(n.nodeType == 1 && n.tagName == 'TR')
					{
						var rows = n.getElementsByClassName('outer_row');
						if(rows.length > 0)
						{
							for(xi = 0; xi < rows.length; xi++)
							{
								markupFilm(dateText, rows[xi], itemtype);
							}
							break;
						}
					}

					n = n.nextSibling;
				}
			}
		}
	}
}

if(document.location.href.indexOf('package_view') >= 0)
	tryListMarkup(document.getElementsByClassName('h2'), 'list')

if(document.location.href.indexOf('tv.html') >= 0)
	tryListMarkup(document.getElementsByClassName('article_header'), 'tv')

if(document.location.href.indexOf('/film/') >= 0)
{
	var bs = document.getElementsByTagName('b');
	for(i = 0; i < bs.length; i++)
	{
		if(bs[i].innerHTML.indexOf('På TV:') >= 0)
		{
			var n = bs[i].nextSibling;

			while(n)
			{
				if(n.nodeType == 3)
				{
					if(/.*\d{1,2}\/\d{1,2}\s\d{2}:\d{2}.*/g.test(n.nodeValue))
					{
						markupTV(n, bs[i].parentNode);
						break;
					}
				}

				n = n.nextSibling;
			}
			break;
		}
	}
}