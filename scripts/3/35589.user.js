// ==UserScript==
// @name           Userscripts : Issues Report
// @namespace      http://gm.wesley.eti.br/userscripts
// @description    Displays all issues reported of your scripts
// @include        http://userscripts.org/scripts/*/*
// @include        http://userscripts.org/home/scripts*
// @require        http://www.wesley.eti.br/includes/js/php.js?v1
// @require        http://www.wesley.eti.br/includes/js/php2js.js?v1
// @require        http://gm.wesley.eti.br/gm_default.js?v1
// @language       en
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @version        1.1.4
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

checkForUpdate({
//	'file':'http://gm.wesley.eti.br/userscripts/IssuesReport/userscripts__issues_repo.user.js',
	'file':'http://userscripts.org/scripts/source/35589.user.js',
	'name':'Userscripts : Issues Report',
	'namespace':'http://gm.wesley.eti.br/userscripts',
	'version':'1.1.4'
});

(function()
{	// script scope

	var user = {
		'delay':GM_getValue('delay',	500),
		'access':GM_getValue('access',	60*60*1000)
	};

	var script = {
		'lastPage':GM_getValue('lastPage',0),
		'user':""+xpath("string(id('homeMenu')/li/a[contains(@href,'users')]/@href)").match(/\d+/)[0],
		'author':""+xpath("string(id('details')/span/a[contains(@href,'users')]/@href)").match(/\d+/),
		'issues':eval(GM_getValue('issues','({})')),
		'retrieve':GM_getValue('retrieve',-1),
		'lastAccess':parseInt(GM_getValue('lastAccess','0'))
	};

	var id = parseInt( ""+location.href.match(/\d+/), 10);
	if (/\/scripts\/\w+\//.test(location.href) && script.user == script.author)
	{
		var anchor = xpath("id('script-nav')/li[a[contains(text(),'hare')]]")[0];	// Share
		var retrieve = document.createElement('li');
		retrieve.innerHTML = '<a href="#issues">Issues <span>0%</span></a>';

		retrieve.childNodes[0].addEventListener( 'click', function(e)
		{
			var list = xpath("id('script-nav')/li");
			for ( var i = 0 , t = list.length ; i < t ; ++i )
			{
				if (!!~(""+list[i].getAttribute('class')).indexOf('current'))
				{
					list[i].removeAttribute('class');

					var link = document.createElement('a');

					link.innerHTML = list[i].innerHTML;
					link.setAttribute('href',location.href.replace(location.hash,''));

					list[i].innerHTML = '';
					list[i].appendChild(link);

					e.target.parentNode.setAttribute('class','current');
					e.target.parentNode.innerHTML = e.target.innerHTML;
					break;
				}
			}

			var next = list[0].parentNode.nextSibling;
			while (!!next)
			{
				var tmp = next.nextSibling;
				next.parentNode.removeChild(next);
				next = tmp;
			}

			var unm = xpath("string(id('homeBox')/a/text())");
			var content = list[0].parentNode.parentNode;

			function listReport(id)
			{
				var total = 0;
				for ( var prop in script.issues[id] )
				{
					++total;
					var i = script.issues[id][prop];

					var issue = document.createElement('div');
					issue.setAttribute('class','issue');

					var out = "<p>%TP% script: <a href='/scripts/show/%SID%'>%SNM%</a> written by <a href='/users/"+script.user+"'>"+unm+"</a></p><p style=\"clear: both\">Reporter: <a href='/users/%RID%'>%RNM%</a></p>";
					if (!!i[5].length)
						out += '<pre>%MSG%</pre>';
					issue.innerHTML = out.replace('%TP%',i[0]).replace('%SID%',i[1]).replace('%SNM%',i[2]).replace('%RID%',i[3]).replace('%RNM%',i[4]).replace('%MSG%',i[5]);

					content.appendChild(issue);
				}

				return total;
			}

			var total = 0;
			if (!!id)
				total = listReport(id);
			else
				for ( var prop in script.issues )
					total += listReport(prop);

			if (!total)
			{
				var msg = document.createElement('h2');
				msg.innerHTML = ( !!id ? "This script does not have any report." : "Your scripts does not have any report." );
				content.appendChild(msg);
			}

		}, false);

		anchor.parentNode.insertBefore(retrieve,anchor.nextSibling);

		if (/#issues$/.test(location.href))
		{
			var evt = document.createEvent('MouseEvents'); 
	 		evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
 			retrieve.childNodes[0].dispatchEvent(evt);
			retrieve = retrieve.childNodes[2];
		}
		else 
			retrieve = retrieve.childNodes[0].childNodes[1];

		var current = parseInt(new Date().valueOf(),10);
		if (script.lastAccess+user.access <= current)
		{
			GM_setValue('lastAccess', ""+current);
			GM_setValue('retrieve', 0);

			var er_issue = new RegExp("<div><p>(\\w+) script: <a href='\/scripts\/show\/(\\d+)'>(.{1,256})<\/a>written by <a href='\/users\/"+script.user+"'>.{3,50}<\/a><\/p>(?:<p>.+?<\/p>)?<p>Reporter: <a href='\/users\/(\\d+)'>(.{3,50})<\/a><\/p>(?:<pre>(.+?)<\/pre>)?<\/div>","gi");
			var gc = 0;	// global counter
			var lastPage = 0;

			resourceText("http://userscripts.org/issues",function(e)
			{
				lastPage = parseInt(e.responseText.match(/(\d+)<\/a> <a href="\/issues\?page=\d+" class="next_page"/)[1],10) - script.lastPage;
				checkIssue(e);

				for ( var i = 2 ; i <= lastPage ; ++i )
				{
					setTimeout(resourceText, user.delay*i, "http://userscripts.org/issues?page="+i, checkIssue);
				}
			});

			function checkIssue(e)
			{
				var result = e.responseText.replace(/\s{2,}|(?: \w+="[ \w:;%-]+")+/g,'');
				for ( var m ; m = er_issue.exec(result) ; )
				{
					var l = m.toString().length;
					m.shift();
					if (!(m[1] in script.issues))
						script.issues[m[1]] = {};

					script.issues[m[1]][m[3]+l] = m;
				}

				var r = Math.floor(100*++gc/Math.max(lastPage,1));
				if (r == 100)
				{
					r = -1;
					GM_setValue('lastPage', lastPage+script.lastPage);
					GM_setValue('issues', uneval(script.issues));
					var x = 0;
					for ( var prop in script.issues[id])
						++x;

					retrieve.innerHTML = x;
				}
				else
					retrieve.innerHTML = r+'%';

				GM_setValue('retrieve', r);
				GM_setValue('lastAccess', ""+parseInt(new Date().valueOf(),10));
			}
		}
		else
			(int = setInterval(function()
			{
				var r = GM_getValue('retrieve', -1);

				if (r == -1)
				{
					clearInterval(int);

					var x = 0;
					for ( var prop in eval(GM_getValue('issues','({})'))[id])
						++x;

					retrieve.innerHTML = x;
				}
				else
					retrieve.innerHTML = r+'%';

			}, user.delay));
	}
	else if (/\/home\/scripts/.test(location.href))
	{
		var lastUpdate = xpath('//tr/th[a[not(contains(@href,"?"))]]')[0];
		var issues = document.createElement('th');
		issues.innerHTML = '<a href="?sort=issues">Issues</a>';
		lastUpdate.parentNode.insertBefore(issues, lastUpdate);
		
		var scripts = xpath('//tr[td/a[contains(@href,"/show/")]]');

		function totalIssues(tr)
		{
			var sum = 0;
			for ( var prop in script.issues[tr.id.match(/\d+/)[0]] )
				++sum;

			return sum;
		}

		if (/[?&]sort=issues/.test(location.href))
		{
			scripts.sort(function(a, b)
			{
				var ta = totalIssues(a) , tb = totalIssues(b);

				if ( ta == tb ) return 0;
				else if ( ta < tb )
					b.parentNode.insertBefore(b, a);
				return ( ta < tb ? 1 : -1 );
			});
		}

		var position = scripts[0].cells.length-1;
		for ( var i = 0 , t = scripts.length ; i < t ; ++i )
		{
			var cell = document.createElement('td');
			cell.setAttribute('class', 'inv lp');
			cell.textContent = totalIssues(scripts[i]);
			scripts[i].insertBefore(cell, scripts[i].cells[position]);
		}
	}
})();