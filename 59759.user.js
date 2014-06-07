// ==UserScript==
// @match          http://urbandead.com/map.cgi*
// @match          http://www.urbandead.com/map.cgi*
// @include        http://*urbandead.com/map.cgi*
// @exclude        http://*urbandead.com/map.cgi?log*
// @name           UD Profile Expander
// @namespace      http://userscripts.org/users/72447
// @description    Shows users' profile information in-game
// ==/UserScript==

var trackSkills = [
	'Free Running',
	'Body Building',
	'Lab Experience',
	'Ransack',
	'Scent Trail',
	'Brain Rot'
];

/******************************************************************************/
function addJQ()
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function()
		{
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.textContent = "(" + main + ")(jQuery);";
			document.body.appendChild(script);
		},
		false);
	document.body.appendChild(script);
}

function main($)
{
	$('#UDProfileSniff').remove();
	gt = $('div.gt')[1];
	var glob_rgx = /<a[^>]+?href="profile\.cgi\?id=\d+"[^>]*?>(?!<b>).+?<\/a>/ig;
	var rgx = /<a[^>]+?href="profile\.cgi\?id=(\d+)"[^>]*?>(?!<b>)(.+?)<\/a>/i;
	var matches = gt.innerHTML.match(glob_rgx);
	var profilesTbl = '<table style="clear:both;"><tr><td id="udptbl"></td></tr></table>';
	gt.innerHTML = gt.innerHTML.replace(/Also here.*?\.<br><br>/, '');
	gt.innerHTML += profilesTbl;

	for(a = 0; a < matches.length; a++)
	{
		var submatches = rgx.exec(matches[a]);
		var udp = $('#udptbl')[0];
		udp.innerHTML += '<div style="float:left;margin:8px;padding:8px;">'
			+ matches[a] + '<br /><span style="font-size:8pt" id="udptbl_'
			+ submatches[1] + '"></span></div>';
		$.ajax({
			async: true,
			url: 'http://'
				+ (window.location.hostname.match(/^w/i) ? 'www.' : '')
				+ 'urbandead.com/profile.cgi?id=' + submatches[1],
			dataType: 'html',
			success: function(txt, stat)
			{
				var vals = txt.match(/<td[^>]+?class="slam">.+?<\/td>/ig);
				var id = /href="contacts\.cgi\?add=(\d+)"/i.exec(txt)[1];
				var pd = new Array();
				for(b = 0; b < vals.length; b++)
					pd[b] = /<td[^>]+?class="slam">(.+?)<\/td>/i
						.exec(vals[b])[1];
				var skills = /<td rowspan=10 class="slam">(?:.|\n)*?<\/td>/im
					.exec(txt)[0];
				var span = $('#udptbl_' + id)[0];
				span.innerHTML += '<b>' + pd[3] + '</b><br />';
				span.innerHTML += 'Level: ' + pd[1] + ', XP: ' + pd[2]
					+ '<br />';
				for(b = 0; b < trackSkills.length; b++)
					if(skills.indexOf('>' + trackSkills[b] + '<') >= 0)
						span.innerHTML += trackSkills[b] + '<br />';
			}
		});
	}
}

document.body.innerHTML = document.body.innerHTML.replace(
	/(<div class="gt">)You are (?!<)/,
	'$1<a style="cursor:pointer;font-size:8pt;" id="UDProfileSniff">Expand Profiles<br /></a>You are '
	);
document.getElementById('UDProfileSniff').addEventListener('click', addJQ, false);