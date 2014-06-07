// ==UserScript==
// @name           UDMapSlice
// @namespace      http://userscripts.org/users/72447
// @description    Cuts slices out of the Red Rum UD Map
// @include        http://redrum.soul-fantasy.net/map.php?splitsub=*
// @include        http://redrum.soul-fantasy.net/map.php?suburb=*
// ==/UserScript==

var udms_topLeft = '';
var udms_bottomRight = '';

function outerHTML(el)
{
	var p = document.createElement(el.parentNode.tagName);
	p.appendChild(el.cloneNode(true));
	var o = p.innerHTML;
	p = null;
	return o;
}

function udms_enable()
{
	document.body.innerHTML = document.body.innerHTML.replace(
		/<td.*?class="(.*?<br\/?>(\d+), (\d+)(?=<).*?<\/td>)/ig,
		'<td id="udms_cell_$2_$3" class="udms_cell $1').replace(
		/<a.+?>UDMapSlice<\/a><br\/?>/, '');
	var tmp = document.getElementsByTagName('td');
	var a;
	for(a = 0; a < tmp.length; a++)
		if(tmp[a].className.indexOf('udms_cell') >= 0)
			tmp[a].addEventListener('click', udms_click, true);
	alert('UDMapSlice initialized.');
}

function udms_click(ev)
{
	if(udms_topLeft == '')
	{
		udms_topLeft = ev.target.id;
		ev.target.style.opacity = '0.5';
		ev.target.style.fontWeight = 'bold';
	}
	else
	{
		if(udms_topLeft == ev.target.id)
		{
			udms_topLeft = '';
			ev.target.style.opacity = '';
			ev.target.style.fontWeight = '';
		}
		else
		{
			udms_bottomRight = ev.target.id;
			var matches = /udms_cell_(\d+)_(\d+)/.exec(udms_topLeft);
			var udms_top = Math.round(matches[2]);
			var udms_left = Math.round(matches[1]);
			matches = /udms_cell_(\d+)_(\d+)/.exec(udms_bottomRight);
			var udms_bottom = Math.round(matches[2]);
			var udms_right = Math.round(matches[1]);

			if(udms_bottom < udms_top || udms_right < udms_left)
			{
				alert('Maps must be drawn top-left to bottom-right!');
				udms_bottomRight = '';
				return false;
			}

			var el = document.getElementById(udms_topLeft);
			el.style.fontWeight = '';
			el.style.opacity = '';
			var udms_map = '';

			for(var row = udms_top; row <= udms_bottom; row++)
			{
				udms_map += '<tr>';

				for(var col = udms_left; col <= udms_right; col++)
				{
					el =
						document.getElementById('udms_cell_' + col + '_' + row);
					udms_map += outerHTML(el).replace(
						/height="10%" width="10%"/,
						'');
				}

				udms_map += '</tr>';
			}

			var d = new Date();
			var w = window.open('', 'udms_' + d);
			w.document.write('<html><head><title>UDMapSlice</title><style>.udms_cell { width: 100px; height: 100px; } body { background:#232; color:#bcb; font-family:trebuchet ms, verdana}   .key         { font-size: 8pt }   a { color:#f99; text-decoration:none}   a:visited { color:#c99; } 	 a.plink { color:#efe; text-decoration:none}   a:visited.plink { color:#aca; }   .header           { font-size: 24pt; text-decoration: underline; font-weight: bold }   .highlight   { color: #000000; background-color: #FFFF00; font-weight: bold; font-size: 8pt }   .armoury     { color: #000000; background-color: #888888; font-size:8pt }   .arms        { color: #000000; background-color: #887766; font-size:8pt }   .autoshop    { border:5px solid #666666;  color: #000000; background-color: #CCCCCC; font-size:8pt }   .bank        { color: #000000; background-color: #DDEEDD; font-size:8pt }   .building    { border:5px solid #666666;  color: #000000; background-color: #AAAADD; font-size:8pt }   .building1   { border:5px solid #666666;  color: #FF0000; background-color: #AAAADD; font-size:8pt }   .cathedral   { color: #000000; background-color: #FFFFFF; font-size:8pt }   .church      { color: #000000; background-color: #FFFFFF; font-size:8pt }   .cinema      { border:5px solid #666666;  color: #000000; background-color: #DDDDDD; font-size:8pt }   .club        { color: #000000; background-color: #CC99CC; font-size:8pt }   .factory     { color: #000000; background-color: #AAAAAA; font-size:8pt }   .fire        { border:5px solid #FF0000;  color: #000000; background-color: #FFDDDD; font-size:8pt }   .hospital    { color: #000000; background-color: #FF9999; font-size:8pt }   .hotel       { color: #000000; background-color: #CC9944; font-size:8pt }   .junkyard    { border:2px dotted #DDDDDD; color: #000000; background-color: #776655; font-size:8pt }   .library     { border:5px solid #99CC99;  color: #000000; background-color: #EEEEEE; font-size:8pt }   .mall        { color: #000000; background-color: #EEEEFF; font-size:8pt }   .mansion     { color: #000000; background-color: #EEEEEE; font-size:8pt }   .museum      { border:5px solid #99CC99;  color: #000000; background-color: #889988; font-size:8pt }   .police      { border:5px solid #0000FF;  color: #000000; background-color: #DDDDFF; font-size:8pt }   .power       { border:2px solid #666666;  color: #000000; background-color: #AAAAAA; font-size:8pt }   .railway     { color: #000000; background-color: #888888; font-size:8pt }   .school      { color: #000000; background-color: #889999; font-size:8pt }   .stadium     { border:5px solid #776655;  color: #000000; background-color: #99CC99; font-size:8pt }   .towers      { color: #000000; background-color: #EEEEEE; font-size:8pt }   .warehouse   { color: #000000; background-color: #998877; font-size:8pt }   .zoo1        { border:2px dotted #DDDDDD; color: #000000; background-color:#996655; font-size:8pt }   .wasteland   { color: #000000; background-color: #776655; font-size:8pt }   .carpark     { color: #000000; background-color: #666666; font-size:8pt }   .cemetary    { color: #000000; background-color: #99CC99; font-size:8pt }   .fort        { color: #000000; background-color: #998877; font-size:8pt }   .monument    { color: #000000; background-color: #666666; font-size:8pt }   .park        { color: #000000; border:5px solid #DDDDDD; background-color: #99CC99; font-size:8pt }   .street      { backgroundx: #fee; background-image:url(\'streets.gif\'); background-position:top left; font-size:8pt }   .zoo         { color: #000000; background-color: #996655; font-size:8pt }</style></head><body><table>');
			w.document.write(udms_map + '</table></body></html>');
			udms_topLeft = '';
			udms_bottomRight = '';
		}
	}
}

setTimeout(function()
{
	document.body.innerHTML = document.body.innerHTML.replace(
		/(<a href="[^"]+">City Map<\/a><br\/?>)/,
		'<a id="udms_enable" href="#">UDMapSlice</a><br />$1');
	document.getElementById('udms_enable').addEventListener('click', udms_enable,
		true);
}, 750);