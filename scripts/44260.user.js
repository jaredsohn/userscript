// ==UserScript==
// @name           RollbackCalculatorY2
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/maingame.php
// ==/UserScript==

rollbackcalculator();
function rollbackcalculator()
{
	var scoutingreport = document.evaluate(
		'//table',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	//var scoutingreport2 = scoutingreport.snapshotItem(2);
	var scoutingreport2 = document.getElementById('frmSeason');
	rollbackbutton = document.createElement('button');
	rollbackbutton.innerHTML = '<input type="button" id="rollbackbutton">Rollback Calculator</input>';
	scoutingreport2.parentNode.insertBefore(rollbackbutton, scoutingreport2.nextSibling);
	rollbackbutton.addEventListener('click', function()
	{
		rollbackbutton.parentNode.removeChild(rollbackbutton);
		
		var playerid = window.location.href;
		if(playerid.indexOf("&") == -1)
		{
			playerid = playerid.slice(playerid.indexOf("=") + 1);
		}
		else
		{
			playerid = playerid.slice(playerid.indexOf("=") + 1,playerid.indexOf("&"));
		}

		currentseason = document.getElementById("frmSeason").innerHTML.slice(document.getElementById("frmSeason").innerHTML.indexOf('"') + 1,document.getElementById("frmSeason").innerHTML.indexOf("selected") - 2) * 1;
		
		var cookie = GM_getValue(playerid,0);

		if(cookie == 0)
		{
			seasonsearch();
		}
		else if(cookie.slice(0,cookie.indexOf(" ")) == currentseason)
		{
			goforrollback();
		}
		else if(cookie.slice(cookie.indexOf(" ") + 1) == 6)
		{
			goforrollback();
		}
		else
		{
			seasonsearch();
		}

		var seasonsplayed = 0;

		function seasonsearch()
		{
			var reference;
			seasonsplayedretrieved = 0;
			var i;

			for(i = 1; i < (currentseason + 1); i++)
			{
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + playerid + '&s=' + i,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml',
					},
					onload: function(responseDetails) {
					
						reference = responseDetails.responseText;
						reference = reference.indexOf("Has not played in any games this season");

						if(reference == -1)
						{
							seasonsplayed += 1;
						}
					}
				});
			}
			timer();
		}			
			
		function timer()
		{
			window.setTimeout( function()
			{
				GM_setValue(playerid,currentseason + " " + seasonsplayed);
				goforrollback();
			}, 5000);
		}

		function goforrollback()
		{
			//*****************************************************************
			// Calculate rollback factor
			//*****************************************************************

			var seasonsplayed = GM_getValue(playerid,"0 1").slice(GM_getValue(playerid,"0 1").indexOf(" ") + 1);
			var rollbackfactor = (.25 + (.05 * (seasonsplayed - 1)))

			if(rollbackfactor > .5)
			{
				rollbackfactor = .5;
			}

			//*****************************************************************
			// Calculate perfect rollback value
			//*****************************************************************

			var perfectrollback;
			switch(rollbackfactor)
			{
				case .25:
					perfectrollback = 4;
					break;
				case .3:
					perfectrollback = 10;
					break;
				case .35:
					perfectrollback = 20;
					break;
				case .4:
					perfectrollback = 5;
					break;
				case .45:
					perfectrollback = 20;
					break;
				case .5:
					perfectrollback = 2;
					break;
			}

			//*****************************************************************
			// Get current attributes
			//*****************************************************************

			var scan4 = document.evaluate(
				'//html',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			var reference = scan4.snapshotItem(0).innerHTML;
			reference = reference.slice(reference.indexOf('Speed:') + 16);
			reference = reference.slice(0,reference.indexOf('</tr>'));
	
			if(reference.indexOf("(") == -1)
			{
				var currentspeed = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentendurance = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentballhandling = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentpassing = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentshooting = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentthreept = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentfreethrows = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentdunking = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentrebounding = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentblocking = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentdefense = reference.slice(0,reference.indexOf("<")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentleadership = reference.slice(0,reference.indexOf("<")) * 1;
			}
			else
			{
				var currentspeed = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentendurance = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentballhandling = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentpassing = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentshooting = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentthreept = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentfreethrows = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentdunking = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentrebounding = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentblocking = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentdefense = reference.slice(0,reference.indexOf(" ")) * 1;
				reference = reference.slice(reference.indexOf('</strong>') + 9);
				var currentleadership = reference.slice(0,reference.indexOf(" ")) * 1;
			}

			var currenttotal = currentspeed + currentendurance + currentballhandling + currentpassing + currentshooting + currentthreept + currentfreethrows + currentdunking + currentrebounding + currentblocking + currentdefense + currentleadership;


			//*****************************************************************
			// Get position
			//*****************************************************************

			var scan5 = document.evaluate(
				'//html',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			var reference = scan5.snapshotItem(0).innerHTML;
			reference = reference.slice(reference.indexOf('Height :'));
			reference = reference.slice(reference.indexOf("'") - 1);
			var position1 = reference.slice(0,reference.indexOf("<"));
			reference = reference.slice(reference.indexOf("Position :"));
			reference = reference.slice(reference.indexOf("<td") + 3);
			var position3 = reference.slice(reference.indexOf(">") + 1,reference.indexOf("<"));

			if(position3 == "F")
			{
				position3 = "Forward";
			}
			else
			{
				position3 = "Guard";
			}
			var position = position1 + ' | ' + position3;

			//*****************************************************************
			// Get base attributes
			//*****************************************************************

			switch(position)
			{
				case '5\'10" | Guard':
					var basespeed = 27;
					var baseballhandling = 25;
					var basepassing = 25;
					var baseshooting = 17;
					var basethreept = 17;
					var basefreethrows = 26;
					var basedunking = 9;
					var baserebounding = 9;
					var baseblocking = 5;
					var basedefense = 25;
					var baseleadership = 30;
					break;
				case '5\'11" | Guard':
					var basespeed = 24;
					var baseballhandling = 25;
					var basepassing = 23;
					var baseshooting = 18;
					var basethreept = 18;
					var basefreethrows = 23;
					var basedunking = 12;
					var baserebounding = 11;
					var baseblocking = 6;
					var basedefense = 27;
					var baseleadership = 28;
					break;
				case '6\'0" | Guard':
					var basespeed = 21;
					var baseballhandling = 28;
					var basepassing = 21;
					var baseshooting = 19;
					var basethreept = 20;
					var basefreethrows = 25;
					var basedunking = 13;
					var baserebounding = 13;
					var baseblocking = 7;
					var basedefense = 22;
					var baseleadership = 26;
					break;
				case '6\'1" | Guard':
					var basespeed = 21;
					var baseballhandling = 22;
					var basepassing = 21;
					var baseshooting = 20;
					var basethreept = 22;
					var basefreethrows = 23;
					var basedunking = 13;
					var baserebounding = 16;
					var baseblocking = 8;
					var basedefense = 25;
					var baseleadership = 24;
					break;
				case '6\'2" | Guard':
					var basespeed = 21;
					var baseballhandling = 24;
					var basepassing = 24;
					var baseshooting = 20;
					var basethreept = 20;
					var basefreethrows = 23;
					var basedunking = 15;
					var baserebounding = 17;
					var baseblocking = 9;
					var basedefense = 20;
					var baseleadership = 22;
					break;
				case '6\'3" | Guard':
					var basespeed = 20;
					var baseballhandling = 20;
					var basepassing = 20;
					var baseshooting = 27;
					var basethreept = 21;
					var basefreethrows = 22;
					var basedunking = 16;
					var baserebounding = 18;
					var baseblocking = 11;
					var basedefense = 20;
					var baseleadership = 20;
					break;
				case '6\'4" | Guard':
					var basespeed = 20;
					var baseballhandling = 20;
					var basepassing = 20;
					var baseshooting = 22;
					var basethreept = 23;
					var basefreethrows = 21;
					var basedunking = 18;
					var baserebounding = 19;
					var baseblocking = 13;
					var basedefense = 19;
					var baseleadership = 20;
					break;
				case '6\'5" | Guard':
					var basespeed = 20;
					var baseballhandling = 17;
					var basepassing = 18;
					var baseshooting = 23;
					var basethreept = 24;
					var basefreethrows = 23;
					var basedunking = 19;
					var baserebounding = 20;
					var baseblocking = 14;
					var basedefense = 17;
					var baseleadership = 20;
					break;
				case '6\'6" | Guard':
					var basespeed = 19;
					var baseballhandling = 18;
					var basepassing = 15;
					var baseshooting = 25;
					var basethreept = 25;
					var basefreethrows = 25;
					var basedunking = 20;
					var baserebounding = 20;
					var baseblocking = 15;
					var basedefense = 18;
					var baseleadership = 15;
					break;
				case '6\'6" | Forward':
					var basespeed = 24;
					var baseballhandling = 18;
					var basepassing = 20;
					var baseshooting = 21;
					var basethreept = 20;
					var basefreethrows = 18;
					var basedunking = 20;
					var baserebounding = 17;
					var baseblocking = 17;
					var basedefense = 20;
					var baseleadership = 20;
					break;
				case '6\'7" | Forward':
					var basespeed = 22;
					var baseballhandling = 17;
					var basepassing = 18;
					var baseshooting = 21;
					var basethreept = 17;
					var basefreethrows = 18;
					var basedunking = 22;
					var baserebounding = 20;
					var baseblocking = 18;
					var basedefense = 21;
					var baseleadership = 21;
					break;
				case '6\'8" | Forward':
					var basespeed = 20;
					var baseballhandling = 15;
					var basepassing = 16;
					var baseshooting = 22;
					var basethreept = 18;
					var basefreethrows = 17;
					var basedunking = 23;
					var baserebounding = 24;
					var baseblocking = 20;
					var basedefense = 20;
					var baseleadership = 20;
					break;
				case '6\'9" | Forward':
					var basespeed = 18;
					var baseballhandling = 13;
					var basepassing = 15;
					var baseshooting = 21;
					var basethreept = 15;
					var basefreethrows = 17;
					var basedunking = 24;
					var baserebounding = 27;
					var baseblocking = 24;
					var basedefense = 21;
					var baseleadership = 20;
					break;
				case '6\'10" | Forward':
					var basespeed = 16;
					var baseballhandling = 11;
					var basepassing = 12;
					var baseshooting = 21;
					var basethreept = 14;
					var basefreethrows = 16;
					var basedunking = 25;
					var baserebounding = 30;
					var baseblocking = 26;
					var basedefense = 24;
					var baseleadership = 20;
					break;
				case '6\'11" | Forward':
					var basespeed = 16;
					var baseballhandling = 10;
					var basepassing = 11;
					var baseshooting = 18;
					var basethreept = 13;
					var basefreethrows = 16;
					var basedunking = 26;
					var baserebounding = 28;
					var baseblocking = 27;
					var basedefense = 26;
					var baseleadership = 24;
					break;
				case '7\'0" | Forward':
					var basespeed = 14;
					var baseballhandling = 11;
					var basepassing = 10;
					var baseshooting = 19;
					var basethreept = 12;
					var basefreethrows = 18;
					var basedunking = 29;
					var baserebounding = 30;
					var baseblocking = 28;
					var basedefense = 22;
					var baseleadership = 22;
					break;
				case '7\'1" | Forward':
					var basespeed = 13;
					var baseballhandling = 11;
					var basepassing = 10;
					var baseshooting = 17;
					var basethreept = 11;
					var basefreethrows = 13;
					var basedunking = 28;
					var baserebounding = 29;
					var baseblocking = 32;
					var basedefense = 25;
					var baseleadership = 26;
					break;
				case '7\'2" | Forward':
					var basespeed = 11;
					var baseballhandling = 8;
					var basepassing = 10;
					var baseshooting = 16;
					var basethreept = 10;
					var basefreethrows = 10;
					var basedunking = 30;
					var baserebounding = 32;
					var baseblocking = 30;
					var basedefense = 30;
					var baseleadership = 28;
					break;
			}

			//*****************************************************************
			// Calculate rollback values
			//*****************************************************************

			var rollbackspeed = Math.round(rollbackfactor * currentspeed * 10) / 10 + basespeed;
			var rollbackendurance = 10;
			var rollbackballhandling = Math.round(rollbackfactor * currentballhandling * 10) / 10 + baseballhandling;
			var rollbackpassing = Math.round(rollbackfactor * currentpassing * 10) / 10 + basepassing;
			var rollbackshooting = Math.round(rollbackfactor * currentshooting * 10) / 10 + baseshooting;
			var rollbackthreept = Math.round(rollbackfactor * currentthreept * 10) / 10 + basethreept;
			var rollbackfreethrows = Math.round(rollbackfactor * currentfreethrows * 10) / 10 + basefreethrows;
			var rollbackdunking = Math.round(rollbackfactor * currentdunking * 10) / 10 + basedunking;
			var rollbackrebounding = Math.round(rollbackfactor * currentrebounding * 10) / 10 + baserebounding;
			var rollbackblocking = Math.round(rollbackfactor * currentblocking * 10) / 10 + baseblocking;
			var rollbackdefense = Math.round(rollbackfactor * currentdefense * 10) / 10 + basedefense;
			var rollbackleadership = Math.round(rollbackfactor * currentleadership * 10) / 10 + baseleadership;
			var rollbacktotal = Math.floor(rollbackspeed) + Math.floor(rollbackendurance) + Math.floor(rollbackballhandling) + Math.floor(rollbackpassing) + Math.floor(rollbackshooting) + Math.floor(rollbackthreept) + Math.floor(rollbackfreethrows) + Math.floor(rollbackdunking) + Math.floor(rollbackrebounding) + Math.floor(rollbackblocking) + Math.floor(rollbackdefense) + Math.floor(rollbackleadership);
			var overridetotal = "";

			//*****************************************************************
			// Insert table
			//*****************************************************************

			var scan6 = document.evaluate(
				'//html',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			var wholescript = scan6.snapshotItem(0).innerHTML;
			var playername = wholescript.slice(wholescript.indexOf("Name :"));
			playername = playername.slice(playername.indexOf("<td") + 3);
			playername = playername.slice(playername.indexOf(">") + 1,playername.indexOf("<"));

			if(wholescript.indexOf('<p align="center"><img src="/images/avatars/') == -1)
			{
				var scan5 = document.evaluate(
					'//table[@width="80%"]',
					document,
					null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
					null);

				var leftcolumn = scan5.snapshotItem(0);
			}
			else
			{
				var scan7 = document.evaluate(
					'//p',
					document,
					null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
					null);

				var leftcolumn = scan7.snapshotItem(3);
			}


			var rollbacktable;
			//trainingTable = document.getElementById('scoutingdiv');
			rollbacktable = document.createElement('div');
			rollbacktable.innerHTML = '<div><table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000" id="rollbacktable">' + 
				'<tr><td colspan="5" bgcolor="#660000" class="tableHeader2" align="center"><strong>Rollback Calculator for ' + playername + '</strong></td></tr>' +
				'<tr><td width="40%" bgcolor="#996633" class="tableHeader2"><strong>Attribute</strong></td>' +
					'<td width="14%" bgcolor="#996633" class="tableHeader2">Base</td>' +
					'<td width="14%" bgcolor="#996633" class="tableHeader2">Current</td>' +
					'<td width="14%" bgcolor="#996633" class="tableHeader2">Override</td>' +
					'<td width="14%" bgcolor="#996633" class="tableHeader2">Rollback</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/speed_icon.gif" width="18" height="18" align="absbottom">Speed</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + basespeed + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentspeed + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text1" size="8" style="font-size: 11px"></input></td>' +
					'<td width="14%" id="roll1" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackspeed + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/endurance_icon.gif" width="18" height="18" align="absbottom">Endurance</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">10</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentendurance + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text2" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll2" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackendurance + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/ballhandling_icon.gif" width="18" height="18" align="absbottom">Ball Handling</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + baseballhandling + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentballhandling + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text3" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll3" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackballhandling + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/passing_icon.gif" width="18" height="18" align="absbottom">Passing</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + basepassing + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentpassing + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text4" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll4" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackpassing + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/shooting_icon.gif" width="18" height="18" align="absbottom">Shooting</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + baseshooting + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentshooting + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text5" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll5" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackshooting + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/3pointshooting_icon.gif" width="18" height="18" align="absbottom">3 Point Shooting</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + basethreept + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentthreept + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text6" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll6" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackthreept + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/freethrows_icon.gif" width="18" height="18" align="absbottom">Free Throw Shooting</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + basefreethrows + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentfreethrows + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text7" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll7" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackfreethrows + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/dunking_icon.gif" width="18" height="18" align="absbottom">Dunking</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + basedunking + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentdunking + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text8" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll8" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackdunking + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/rebound_icon.gif" width="18" height="18" align="absbottom">Rebounding</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + baserebounding + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentrebounding + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text9" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll9" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackrebounding + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/blocking_icon.gif" width="18" height="18" align="absbottom">Blocking</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + baseblocking + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentblocking + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text10" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll10" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackblocking + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/defense_icon.gif" width="18" height="18" align="absbottom">Defense</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + basedefense + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentdefense + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text11" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll11" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackdefense + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#F1E7C5" class="tableHeader"><img src="images/leadership_icon.gif" width="18" height="18" align="absbottom">Leadership</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + baseleadership + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000">' + currentleadership + '</td>' +
					'<td width="14%" bgcolor="#F1E7C5" align="left"><font color="#000000"><input type="text" id="text12" size="8" style="font-size: 11px"></td>' +
					'<td width="14%" id="roll12" bgcolor="#F1E7C5" align="left"><font color="#000000">' + rollbackleadership + '</td></tr>' +
				'<tr><td width="40%" bgcolor="#C6C6A8" class="tableHeader" align="right">Total</td>' +
					'<td width="14%" bgcolor="#C6C6A8" class="tableHeader" align="left"><font color="#000000">225</td>' +
					'<td width="14%" bgcolor="#C6C6A8" class="tableHeader" align="left"><font color="#000000">' + currenttotal + '</td>' +
					'<td width="14%" id="overridetotal" bgcolor="#C6C6A8" class="tableHeader" align="left"><font color="#000000">' + overridetotal + '</td>' +
					'<td width="14%" id="roll13" bgcolor="#C6C6A8" class="tableHeader" align="left"><font color="#000000">' + rollbacktotal + '</td></tr></table></div>';

			leftcolumn.parentNode.insertBefore(rollbacktable, leftcolumn);
			

			//*****************************************************************
			// Insert perfect rollback indicator and spacing
			//*****************************************************************

			var createspace = document.createElement('text');
			createspace.innerHTML = '<p class="tableHeader">&nbsp;Current attributes should be divisible by ' + perfectrollback + ' for perfect rollback</p>';
			rollbacktable.parentNode.insertBefore(createspace, rollbacktable.nextSibling);

			var createspace = document.createElement('text');
			createspace.innerHTML = '<p>&nbsp;</p>';
			rollbacktable.parentNode.insertBefore(createspace, rollbacktable.nextSibling);

			var rollbackupdate = document.createElement("button");
			rollbackupdate.innerHTML = '<input type="button" id="rollbackupdate">Update</input>';
			rollbacktable.parentNode.insertBefore(rollbackupdate, rollbacktable.nextSibling);

			rollbackupdate.addEventListener('click', function()
			{		
				if(document.getElementById("text1").value != "")
				{
					document.getElementById("roll1").innerHTML = Math.round(rollbackfactor * document.getElementById("text1").value * 10) / 10 + basespeed;
					rollbackspeed2 = Math.round(rollbackfactor * document.getElementById("text1").value * 10) / 10 + basespeed;
					override1 = document.getElementById("text1").value * 1;
				}
				else
				{
					document.getElementById("roll1").innerHTML = rollbackspeed;
					rollbackspeed2 = rollbackspeed;
					override1 = currentspeed * 1;
				}
				if(document.getElementById("text2").value != "")
				{
					override2 = document.getElementById("text2").value * 1;
				}
				else
				{
					override2 = currentendurance * 1;
				}
				if(document.getElementById("text3").value != "")
				{
					document.getElementById("roll3").innerHTML = Math.round(rollbackfactor * document.getElementById("text3").value * 10) / 10 + baseballhandling;
					rollbackballhandling2 = Math.round(rollbackfactor * document.getElementById("text3").value * 10) / 10 + baseballhandling;
					override3 = document.getElementById("text3").value * 1;
				}
				else
				{
					document.getElementById("roll3").innerHTML = rollbackballhandling;
					rollbackballhandling2 = rollbackballhandling;
					override3 = currentballhandling * 1;
				}
				if(document.getElementById("text4").value != "")
				{
					document.getElementById("roll4").innerHTML = Math.round(rollbackfactor * document.getElementById("text4").value * 10) / 10 + basepassing;
					rollbackpassing2 = Math.round(rollbackfactor * document.getElementById("text4").value * 10) / 10 + basepassing;
					override4 = document.getElementById("text4").value * 1;
				}
				else
				{
					document.getElementById("roll4").innerHTML = rollbackpassing;
					rollbackpassing2 = rollbackpassing;
					override4 = currentpassing * 1;
				}
				if(document.getElementById("text5").value != "")
				{
					document.getElementById("roll5").innerHTML = Math.round(rollbackfactor * document.getElementById("text5").value * 10) / 10 + baseshooting;
					rollbackshooting2 = Math.round(rollbackfactor * document.getElementById("text5").value * 10) / 10 + baseshooting;
					override5 = document.getElementById("text5").value * 1;
				}
				else
				{
					document.getElementById("roll5").innerHTML = rollbackshooting;
					rollbackshooting2 = rollbackshooting;
					override5 = currentshooting * 1;
				}
				if(document.getElementById("text6").value != "")
				{
					document.getElementById("roll6").innerHTML = Math.round(rollbackfactor * document.getElementById("text6").value * 10) / 10 + basethreept;
					rollbackthreept2 = Math.round(rollbackfactor * document.getElementById("text6").value * 10) / 10 + basethreept;
					override6 = document.getElementById("text6").value * 1;
				}
				else
				{
					document.getElementById("roll6").innerHTML = rollbackthreept;
					rollbackthreept2 = rollbackthreept;
					override6 = currentthreept * 1;
				}
				if(document.getElementById("text7").value != "")
				{
					document.getElementById("roll7").innerHTML = Math.round(rollbackfactor * document.getElementById("text7").value * 10) / 10 + basefreethrows;
					rollbackfreethrows2 = Math.round(rollbackfactor * document.getElementById("text7").value * 10) / 10 + basefreethrows;
					override7 = document.getElementById("text7").value * 1;
				}
				else
				{
					document.getElementById("roll7").innerHTML = rollbackfreethrows;
					rollbackfreethrows2 = rollbackfreethrows;
					override7 = currentfreethrows * 1;
				}
				if(document.getElementById("text8").value != "")
				{
					document.getElementById("roll8").innerHTML = Math.round(rollbackfactor * document.getElementById("text8").value * 10) / 10 + basedunking;
					rollbackdunking2 = Math.round(rollbackfactor * document.getElementById("text8").value * 10) / 10 + basedunking;
					override8 = document.getElementById("text8").value * 1;
				}
				else
				{
					document.getElementById("roll8").innerHTML = rollbackdunking;
					rollbackdunking2 = rollbackdunking;
					override8 = currentdunking * 1;
				}
				if(document.getElementById("text9").value != "")
				{
					document.getElementById("roll9").innerHTML = Math.round(rollbackfactor * document.getElementById("text9").value * 10) / 10 + baserebounding;
					rollbackrebounding2 = Math.round(rollbackfactor * document.getElementById("text9").value * 10) / 10 + baserebounding;
					override9 = document.getElementById("text9").value * 1;
				}
				else
				{
					document.getElementById("roll9").innerHTML = rollbackrebounding;
					rollbackrebounding2 = rollbackrebounding;
					override9 = currentrebounding * 1;
				}
				if(document.getElementById("text10").value != "")
				{
					document.getElementById("roll10").innerHTML = Math.round(rollbackfactor * document.getElementById("text10").value * 10) / 10 + baseblocking;
					rollbackblocking2 = Math.round(rollbackfactor * document.getElementById("text10").value * 10) / 10 + baseblocking;
					override10 = document.getElementById("text10").value * 1;
				}
				else
				{
					document.getElementById("roll10").innerHTML = rollbackblocking;
					rollbackblocking2 = rollbackblocking;
					override10 = currentblocking * 1;
				}
				if(document.getElementById("text11").value != "")
				{
					document.getElementById("roll11").innerHTML = Math.round(rollbackfactor * document.getElementById("text11").value * 10) / 10 + basedefense;
					rollbackdefense2 = Math.round(rollbackfactor * document.getElementById("text11").value * 10) / 10 + basedefense;
					override11 = document.getElementById("text11").value * 1;
				}
				else
				{
					document.getElementById("roll11").innerHTML = rollbackdefense;
					rollbackdefense2 = rollbackdefense;
					override11 = currentdefense * 1;
				}
				if(document.getElementById("text12").value != "")
				{
					document.getElementById("roll12").innerHTML = Math.round(rollbackfactor * document.getElementById("text12").value * 10) / 10 + baseleadership;
					rollbackleadership2 = Math.round(rollbackfactor * document.getElementById("text12").value * 10) / 10 + baseleadership;
					override12 = document.getElementById("text12").value * 1;
				}
				else
				{
					document.getElementById("roll12").innerHTML = rollbackleadership;
					rollbackleadership2 = rollbackleadership;
					override12 = currentleadership * 1;
				}
				document.getElementById("roll13").innerHTML = Math.floor(rollbackspeed2) + 10 + Math.floor(rollbackballhandling2) + Math.floor(rollbackpassing2) + Math.floor(rollbackshooting2) + Math.floor(rollbackthreept2) + Math.floor(rollbackfreethrows2) + Math.floor(rollbackdunking2) + Math.floor(rollbackrebounding2) + Math.floor(rollbackblocking2) + Math.floor(rollbackdefense2) + Math.floor(rollbackleadership2);

				if(document.getElementById("text1").value == "" && document.getElementById("text2").value == "" && document.getElementById("text3").value == "" && document.getElementById("text4").value == "" && document.getElementById("text5").value == "" && document.getElementById("text6").value == "" && document.getElementById("text7").value == "" && document.getElementById("text8").value == "" && document.getElementById("text9").value == "" && document.getElementById("text10").value == "" && document.getElementById("text11").value == "" && document.getElementById("text12").value == "")
				{
					document.getElementById("overridetotal").innerHTML = "";
				}
				else
				{
					document.getElementById("overridetotal").innerHTML = override1 + override2 + override3 + override4 + override5 + override6 + override7 + override8 + override9 + override10 + override11 + override12;
				}
			}, false);
		}
	}, false);
}