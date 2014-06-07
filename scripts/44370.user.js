// ==UserScript==
// @name                NukeSpyRepFilter
// @namespace           noes
// @description         Changes the color of all the spied provinces in the all provinces list. You MUST visit the last 48h of spy reports page first before it works.
// @include             http://*nukezone.nu/*
// ==/UserScript==

if (document.location.href.search('Action=SpyReports&Q=-2') != -1)
{
    storeSpyReps();
}
if (document.location.href.search('Action=Players') != -1)
{
	filter();
}

function storeSpyReps()
{
	var provinces;
	var index = 0;
	var links = document.getElementsByTagName('a');
    for ( var i = 0; i < links.length; i++) {
		var link = links[i];
		if (link.innerHTML.search('#') != -1)
		{
			provinces += link.innerHTML.slice(link.innerHTML.indexOf('#'), link.innerHTML.indexOf(')'));
			index++;
		}
	}
    GM_setValue("NZ_SpyFilter", provinces);
}

function filter()
{
	var provincelist = GM_getValue("NZ_SpyFilter");
	var targets = document.getElementsByTagName('a');
	for (var ii=0; ii < targets.length; ii++) {
		var target = targets[ii];
		if (target.innerHTML.search('#') != -1)
		{
			var targetid = target.innerHTML.slice(target.innerHTML.lastIndexOf('#'), target.innerHTML.indexOf(')')) + '#';


			if (provincelist.search(targetid) != -1)
			{
				var spans = target.getElementsByTagName('span');
				for (var j=0; j < spans.length; j++)
				{
					var span = spans[j];
					span.parentNode.removeChild(span);
					target.innerHTML += '*';
				}

				target.innerHTML = '<font color="#FF0000>' + target.innerHTML + '</font>';
			}
		}
	}
}