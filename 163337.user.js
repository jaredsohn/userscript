// ==UserScript==
// @name           Mission Queue
// @namespace      http://unidomcorp.com
// @description    Put "Mission Commands" in the fleet notes.
// @include        http://*.war-facts.com/fleet_navigation.php*
// ==/UserScript==
/*


To create a mission, start with the MISSION tags in the fleet notes.
<MISSION step=1>
</MISSION>

They must both be on seperate lines. The mission tags are there to
a) let you have other notes, and b) give a place for the script
to save the current "step".

The step=# is the current "step" of the mission queue.
There are two ways to manually set the step. The first, obviously,
is to edit the <MISSION> tag and press the "Take note!" button.
The second, is to enter step:# into the current mission text box
and press the button.

There are two mission types. They are "mission" and "trade".
Basic syntax:

mission:[[restart]transfer|explore|colonize|jump];[planet|system|global|local]:[planetid|systemid|globalcoords|localcoords]
trade:[buy|sell|buyall|sellall|refuel];outpost:outpostid;ship:shipid[;resource:amount[;resource:amount]etc]

trade:buyall, trade:sellall and trade:refuel do not require the resource:amount.
outpost and ship are always require for resource trades, however only outpost is
required for the refuel command. The resource:all syntax is also supported.

ex: trade:sell;outpost:123;ship:122456;oil:all;iron:50000;gold:all

Please pay extra attention to the syntax. Each command is made up of several
field:value pairs. Each part of the pair is seperated by a colon. Each pair is
seperated by a semi-colon.

Here are some examples:

Basic trade mission:
<MISSION step=1>
mission:transfer;planet:12234
trade:buyall;outpost:123;ship:293458
mission:transfer;planet:12322
trade:sellall;outpost:123;ship:293458
mission:restart
</MISSION>

Colonize mission passing through a wormhole, refueling at a warpnet, and colonizing a planet:
<MISSION step=1>
mission:transfer;planet:12345
mission:transfer;planet:12346
mission:transfer;planet:12347
mission:jump;local:85,-20,6
mission:transfer;global:12234,-32468,560
trade:refuel;outpost:123
mission:colonize;planet:12348
</MISSION>


*/
/* Greasemonkey 20080112 workaround */
function wrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}
/* End of workaround */

if (document.evaluate("//b[text()='In Transit']", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) return;

var fleetid, notes, note_submit, mission_notes, t, b, s, p, form2, mnum, gets=0;
var restypes = new Array('iron','copper','silver','titanium','gold','uranium','platinum','diamonds','oil','water','food');

fleetid = window.location.href.match(/fleet=(\d+)/);
if (fleetid) fleetid = fleetid[1]; else return;
notes = document.getElementsByName('note')[0];
note_submit = notes.parentNode.getElementsByTagName('input')[2];
mission_notes = notes.value.match(/<MISSION step=(\d+)>\n([\s\S]+?)\n<\/MISSION>/);

if (mission_notes)
{
	t = document.createElement('input');
	b = document.createElement('input');
	s = document.createElement('input');
	t.setAttribute('class','text');
	t.setAttribute('type','text');
	t.setAttribute('id','missionbox');
	t.setAttribute('size','50');
	b.setAttribute('class','warn');
	b.setAttribute('type','button');
	b.setAttribute('id','missiondo');
	b.setAttribute('onclick','missionDo(document.getElementById("missionbox").value)');
	s.setAttribute('class','text');
	s.setAttribute('type','text');
	s.setAttribute('id','statusbox');
	s.setAttribute('size','60');
	s.disabled = true;
	form2 = document.getElementsByName('form2')[0];
	p = document.createElement('p');
	p.appendChild(t);
	p.appendChild(b);
	p.appendChild(document.createElement('br'));
	p.appendChild(s);
	form2.insertBefore(p,form2.childNodes[0]);
	updateMission();
}

function updateMission() {
	var missions = mission_notes[2].split("\n");
	mnum = mnum != undefined ? mnum : mission_notes[1]-1;
	mnum = (missions[mnum] && missions[mnum].indexOf('restart') == 8) ? 0 : mnum;
	var current_mission = missions[mnum] ? missions[mnum] : 'done';

	if (current_mission.indexOf('done') == 0) b.value = "Restart";
	else if (current_mission.indexOf('mission') == 0) b.value = "Launch";
	else if (current_mission.indexOf('trade') == 0) b.value = "Trade";

	t.value = current_mission;
}

unsafeWindow.missionDo = function(mission) {
	// Do Mission stuff
	var url = 'http://'+window.location.hostname+'/';
	var type, subtype;
	var marray = mission.split(';');

	for (var i = 0, len = marray.length; i < len; i++)
	{
		var m = marray[i].split(':');

		// Step
		if (m[0] == 'step') { mnum = m[1]-1; saveMission(mnum); updateMission(); return; }
		// Done
		if (m[0] == 'done') { mnum = 0; updateMission(); return;}

		// Mission
		if (type == 'mission')
		{
			switch (m[0])
			{
				case 'planet': url += '&tworld2='+m[1]; break;
				case 'system': url += '&tsystem='+m[1]; break;
				case 'colony': url += '&tcolony2='+m[1]; break;
				case 'global': url += '&tpos=global&rawcoords='+encodeURIComponent(m[1]); break;
				case 'local': url += '&tpos=local&rawcoords='+encodeURIComponent(m[1]); break;
				default: break;
			}

		}
		if (m[0] == 'mission')
		{
			url += 'fleet_navigation.php?fleet='+fleetid;

			switch (m[1])
			{
				case 'transfer':
				case 'explore':
				case 'transport':
				case 'colonize':
				case 'jump': break;
				default: m[1] = 'transfer';
			}
			url += '&verify=1&mtype='+m[1];
			type = 'mission';
		}

		// Trade
		if (m[0] == 'trade')
		{
			var outpost, colony, ship;

			switch (m[1])
			{
				case 'refuel': type = 'refuel';
				case 'buy':
				case 'buyall':
				case 'sell':
				case 'sellall': break;
				default: s.value = "Syntax Error!"; return;
			}
			subtype = m[1];
		}

		if ( (outpost && ship) || colony ) type = 'trade';

		if (type != 'trade')
		{
			switch (m[0])
			{
				case 'outpost':
					outpost = m[1];url += 'outposttrade.php?fleet='+fleetid+'&outpost='+m[1]; outpost=1;
					if (type == 'refuel') { execMission('trade',url+'&refuel=1'); return; }
					break;
				case 'ship':
					ship = m[1];/*url += '&shipselect='+m[1]; ship=1;*/ break;
				case 'colony':
					colony = m[1]; break;
			}
		}

		if ( ( (outpost && ship) || colony ) && subtype && subtype != 'load' && subtype != 'unload' )
		{
			if (outpost) url += 'outposttrade.php?fleet='+fleetid+'&outpost='+outpost+'&shipselect='+ship;
			else if (colony) url += 'cargo_fleet.php?posted=1&fleet='+fleetid+'&colony='+colony;

			if (mission.indexOf('all') != -1 || mission.indexOf('%') != -1) { getResources(subtype,url,mission); return; }

			switch (subtype)
			{
				case 'refuel': break;
				case 'sell': subtype = 'unload'; break;
				case 'buy': subtype = 'load'; break;
				//case 'sellall': getResources('sell',url,mission);return;
				//case 'buyall': getResources('buy',url,mission);return;
				default: s.value = 'Syntax Error!'; return;
			}
		}

		if (type == 'trade')
		{
			if (subtype == 'load' || subtype == 'unload')
			{
				switch (m[0])
				{
					case 'iron':
					case 'copper':
					case 'silver':
					case 'titanium':
					case 'gold':
					case 'uranium':
					case 'platinum':
					case 'diamonds':
					case 'oil':
					case 'water':
					case 'food': break;
					default: s.value = 'Syntax Error!'; return;
				}

				// Grab trade URL in the background.
				if (outpost) execMission(type,url+'&cargo_type='+m[0]+'&lu'+m[0]+'='+subtype+'&'+m[0]+'='+m[1]);
				else if (colony) url += '&lu'+m[0]+'='+subtype+'&'+m[0]+'='+m[1];
			}
		}
	}
	// Mission Stuff

	// Go to mission URL
	execMission(type,url);
}

window.saveMission = wrap(function(mnum) {
	mnum++;
	s.value += 'Saving Mission... ';
	var new_notes = notes.value.replace(/step=\d+/,'step='+mnum);
	var url = 'http://'+window.location.hostname+'/notemanager.php';
	var pars = 'type=fleet&id='+fleetid+'&note='+encodeURIComponent(new_notes);
	GM_xmlhttpRequest({
				method: 'POST',
				url: url,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
					'Content-Type': 'application/x-www-form-urlencoded'
					},
				data: pars,
				onload: function(){s.value+='Done.';notes.value=new_notes}
			});
});

window.execMission = wrap(function(type,url) {
	if (type == 'mission') { mnum++;saveMission(mnum); /*updateMission();*/ s.value = 'Launching...'; window.location=url; }
	else if (type == 'trade')
	{
		pars = url.split('?')[1];
		url = url.split('?')[0];
		gets++;
		s.value = 'Background Processes: '+gets;

		GM_xmlhttpRequest({
				method: 'POST',
				url: url,
				data: pars,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
					'Content-Type': 'application/x-www-form-urlencoded'
					},
				onload: function(responseDetails){
							gets--;
							s.value = 'Background Processes: '+gets;
							if (gets == 0) { mnum++;s.value='';updateMission();saveMission(mnum); }
				}
			});
	}
});

window.getResources = wrap(function(buysell,url,mission) {
	s.value='Obtaining Data...';

	mission = mission.replace('buyall','buy').replace('sellall','sell');

	var resources = new Array();

	var marray = mission.split(';');
	var new_mission = new Array();
	for (var i = 0, len = marray.length; i < len; i++)
	{
		var res = marray[i].split(':');
		if (restypes.indexOf(res[0]) != -1)
		{
			if (res[1].indexOf('%') != -1) res[1] = res[1].replace('%','') / 100;
			resources[res[0]] = res[1];
		}
		else
			new_mission.push(res[0]+':'+res[1]);
	}

	mission = new_mission.join(';');

	if (buysell == 'buyall' || buysell == 'sellall')
	{
		for (i in restypes)
		{
			resources[i] = 'all';
		}
	}

	GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
					'Content-Type': 'application/x-www-form-urlencoded'
					},
				onload: function(responseDetails){
							var text = responseDetails.responseText;
							//GM_log(text);
							var station = text.match(/document\.getElementById\('lo\w+'\)\.checked = true; document\.getElementById\('\w+'\)\.value = \d+/g);
							var cargo = text.match(/document\.getElementById\('ul\w+'\)\.checked = true; document\.getElementById\('\w+'\)\.value = \d+/g);

							var res = (buysell.indexOf('buy') != -1) ? station : cargo;

							if (res)
							{
								//var resources = new Array();
								for (var i = 0, len = res.length; i < len; i++)
								{
									var thisres = res[i].match(/document\.getElementById\('(\w+)'\)\.value = (\d+)/);
									if ( buysell == 'buyall' || buysell == 'sellall' || resources[thisres[1]] == 'all' ) resources[thisres[1]] = thisres[2];
									if (resources[thisres[1]] < 1 && resources[thisres[1]] > 0) resources[thisres[1]] = Math.round(resources[thisres[1]]*thisres[2]);
								}

								res = new Array();
								for (i in resources)
								{
									if (resources[i] > 0) res.push(i+':'+resources[i]);
								}

								if (res == '') { s.value='The station seems to be empty!   ';mnum++;updateMission();saveMission(mnum);return }

								mission += ';'+res.join(';');

								// Finally recall missionDo()
								unsafeWindow.missionDo(mission);
							}
							else
							{
								s.value = 'Your cargo holds are empty!   ';mnum++;updateMission();saveMission(mnum);return
							}
				}
			});
});