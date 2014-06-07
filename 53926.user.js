// ==UserScript==
// @name           Ogame In-flight Resources
// @namespace      Oliver
// @description    Displays how many resources are in flight on the overview page
// @include        http://*.ogame.*/game/index.php?page=overview*
// ==/UserScript==

// The following "if" is not really necessary but with it this script will work for Opera too
if (document.location.href.indexOf ('/game/index.php?page=overview') != -1)
{
	function addDots (n)
	{
		n += '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test (n))
			n = n.replace (rgx, '$1' + '.' + '$2');
		return n;
	}
	function processFlightType (type, character, info)
	{
		var flights = document.getElementsByClassName (type);
		for (var i = 1; i < flights.length; i += 2)
		{
			if (flights [i].getElementsByTagName ('a').length < 5)
				continue;
			var title = flights [i].getElementsByTagName ('a') [5].title;
			var elements = title.split (": ");
			var type = character + flights [i].getElementsByTagName ('a') [4].innerHTML;
			var m = parseInt (elements [2].replace (/\./g, ''));
			var c = parseInt (elements [3].replace (/\./g, ''));
			var d = parseInt (elements [4].replace (/\./g, ''));
			any = true;
			if (! info [type])
				info [type] = new Array (m, c, d);
			else
			{
				info [type] [0] += m;
				info [type] [1] += c;
				info [type] [2] += d;
			}
		}
		return info;
	}
	function addRow (table, rowNum, contents)
	{
		rowNum++;
		var newTitle = table.insertRow (rowNum);
		newTitle.innerHTML = contents;
		return rowNum;
	}
	var mstring = document.getElementById ('resources').getElementsByTagName ('tr') [1].getElementsByTagName ('font') [0].innerHTML;
	var cstring = document.getElementById ('resources').getElementsByTagName ('tr') [1].getElementsByTagName ('font') [1].innerHTML;
	var dstring = document.getElementById ('resources').getElementsByTagName ('tr') [1].getElementsByTagName ('font') [2].innerHTML;
	var any = false;
	var info = new Object;
	info = processFlightType ('flight',  '>', info);
	info = processFlightType ('return',  '<', info);
	info = processFlightType ('holding', '=', info);
	if (any)
	{
		var table = document.getElementById ('content').getElementsByTagName ('table') [0];
		var width = Math.round ((table.width - table.rows [table.rows.length - 1].getElementsByTagName ('th') [0].offsetWidth) / 3) - 10;
		var rows = table.getElementsByTagName ('tr');
		var x = 0;
		for (var i = 0; i < rows.length; i++)
			if ((rows [i].getAttribute ('class') == 'flight') || (rows [i].getAttribute ('class') == 'return') || (rows [i].getAttribute ('class') == 'holding'))
				x = i;
		x = addRow (table, x, '    <td class="c" colspan="4">Resources in flight:</td>');
		x = addRow (table, x, '    <th></th><th colspan=3><div style="float: left; width: ' + width + 'px">' + mstring + '</div><div style="float: left; width: ' + width + 'px">' + cstring + '</div><div style="float: left; width: ' + width + 'px">' + dstring + '</div></th>');
		info ["Total"] = new Array (0, 0, 0);
		for (res in info)
		{
			if (res != "Total")
			{
				info ["Total"] [0] += info [res] [0];
				info ["Total"] [1] += info [res] [1];
				info ["Total"] [2] += info [res] [2];
			}
			x = addRow (table, x, '   <th>' + res + '</th><th colspan=3><div style="float: left; width: ' + width + 'px">' + addDots (info [res] [0]) + '</div><div style="float: left; width: ' + width + 'px">' + addDots (info [res] [1]) + '</div><div style="float: left; width: ' + width + 'px">' + addDots (info [res] [2]) + '</div></th>');
		}
	}
}
