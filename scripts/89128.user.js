// ==UserScript==
// @name		RollbackCalculatorX
// @namespace		http://www.courtrivals.com/
// @description		Integrates a rollback calculator into the gym page
// @include		http://www.courtrivals.com/maingame.php
// ==/UserScript==

rollbackcalculator();

function rollbackcalculator()
{
	var accountupgrades = document.getElementById("frmQuickJump");
	rollbackbutton = document.createElement('button');
	rollbackbutton.innerHTML = '<input type="button" id="rollbackbutton">Rollback Calculator</input>';
	accountupgrades.parentNode.insertBefore(rollbackbutton, accountupgrades.nextSibling);
	rollbackbutton.addEventListener('click', function()
	{
		rollbackbutton.parentNode.removeChild(rollbackbutton);

		var startseason = prompt("What season was this player created?");
	
		if(startseason != null)
		{

			//*****************************************************************
			// Find current season
			//*****************************************************************

			var currentseason = document.evaluate(
				'//td[@bgcolor="#000066"]',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			//currentseason = currentseason.snapshotItem(0).innerHTML.slice(currentseason.snapshotItem(0).innerHTML.indexOf("Season") + 7, currentseason.snapshotItem(0).innerHTML.indexOf("Statistics") - 1) * 1;
			// CJR 102910
			currentseason = currentseason.snapshotItem(4).innerHTML.slice(currentseason.snapshotItem(4).innerHTML.indexOf("Season") + 7, currentseason.snapshotItem(4).innerHTML.indexOf("Statistics") - 1) * 1;
			
			//alert(currentseason)
			//*****************************************************************
			// Calculate rollback factor
			//*****************************************************************

			var rollbackfactor = (.25 + (.05 * (currentseason - startseason)))

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

			var currentattributes = document.evaluate(
				'//td[@width="14%"]',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			var currentspeed = currentattributes.snapshotItem(1).innerHTML * 1;
			var currentendurance = currentattributes.snapshotItem(2).innerHTML * 1;
			var currentballhandling = currentattributes.snapshotItem(3).innerHTML * 1;
			var currentpassing = currentattributes.snapshotItem(4).innerHTML * 1;
			var currentshooting = currentattributes.snapshotItem(5).innerHTML * 1;
			var currentthreept = currentattributes.snapshotItem(6).innerHTML * 1;
			var currentfreethrows = currentattributes.snapshotItem(7).innerHTML * 1;
			var currentdunking = currentattributes.snapshotItem(8).innerHTML * 1;
			var currentrebounding = currentattributes.snapshotItem(9).innerHTML * 1;
			var currentblocking = currentattributes.snapshotItem(10).innerHTML * 1;
			var currentdefense = currentattributes.snapshotItem(11).innerHTML * 1;
			var currentleadership = currentattributes.snapshotItem(12).innerHTML * 1;
			var currenttotal = currentspeed + currentendurance + currentballhandling + currentpassing + currentshooting + currentthreept + currentfreethrows + currentdunking + currentrebounding + currentblocking + currentdefense + currentleadership;

			//*****************************************************************
			// Get position
			//*****************************************************************

			var position = document.evaluate(
				'//span',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			//position = position.snapshotItem(1).innerHTML; //.slice(0,position.snapshotItem(1).innerHTML.lastIndexOf("|") - 1);
			//CJR 102910
			position = position.snapshotItem(2).innerHTML; //.slice(0,position.snapshotItem(2).innerHTML.lastIndexOf("|") - 1);
			//alert(position)
			/*if(position.slice(position.indexOf("|") + 2) == 'G')
			{
				position = position.slice(0,position.indexOf("|") + 2) + 'Guard';
			}
			else
			{
				position = position.slice(0,position.indexOf("|") + 2) + 'Forward';
			}*/
			position = position.slice(0,1) + position.slice(position.indexOf("'") + 1,position.indexOf('"')) + position.slice(position.indexOf('|') + 3,position.indexOf('|') + 4);

			//*****************************************************************
			// Get playername
			//*****************************************************************

			var links = document.evaluate(
				'//a[@href]',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

			for(var i = 0; i < links.snapshotLength; i++)
			{
				var thislink = links.snapshotItem(i).href;
				thislink = thislink.slice(thislink.indexOf("show"),thislink.indexOf("Profile"));
				if(thislink == "showPlayer")
				{
					var playername = links.snapshotItem(i).innerHTML;
				}
			}

			//*****************************************************************
			// Get base attributes
			//*****************************************************************

			switch(position)
			{
				case '510G':
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
				case '511G':
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
				case '60G':
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
				case '61G':
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
				case '62G':
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
				case '63G':
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
				case '64G':
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
				case '65G':
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
				case '66G':
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
				case '66F':
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
				case '67F':
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
				case '68F':
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
				case '69F':
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
				case '610F':
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
				case '611F':
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
				case '70F':
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
				case '71F':
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
				case '72F':
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

			var rollbackspeed = Math.floor(rollbackfactor * currentspeed * 100 + 0.00001) / 100 + basespeed;
			var rollbackendurance = 10;
			var rollbackballhandling = Math.floor(rollbackfactor * currentballhandling * 100 + 0.00001) / 100 + baseballhandling;
			var rollbackpassing = Math.floor(rollbackfactor * currentpassing * 100 + 0.00001) / 100 + basepassing;
			var rollbackshooting = Math.floor(rollbackfactor * currentshooting * 100 + 0.00001) / 100 + baseshooting;
			var rollbackthreept = Math.floor(rollbackfactor * currentthreept * 100 + 0.00001) / 100 + basethreept;
			var rollbackfreethrows = Math.floor(rollbackfactor * currentfreethrows * 100 + 0.00001) / 100 + basefreethrows;
			var rollbackdunking = Math.floor(rollbackfactor * currentdunking * 100 + 0.00001) / 100 + basedunking;
			var rollbackrebounding = Math.floor(rollbackfactor * currentrebounding * 100 + 0.00001) / 100 + baserebounding;
			var rollbackblocking = Math.floor(rollbackfactor * currentblocking * 100 + 0.00001) / 100 + baseblocking;
			var rollbackdefense = Math.floor(rollbackfactor * currentdefense * 100 + 0.00001) / 100 + basedefense;
			var rollbackleadership = Math.floor(rollbackfactor * currentleadership * 100 + 0.00001) / 100 + baseleadership;
			var rollbacktotal = Math.floor(rollbackspeed) + Math.floor(rollbackendurance) + Math.floor(rollbackballhandling) + Math.floor(rollbackpassing) + Math.floor(rollbackshooting) + Math.floor(rollbackthreept) + Math.floor(rollbackfreethrows) + Math.floor(rollbackdunking) + Math.floor(rollbackrebounding) + Math.floor(rollbackblocking) + Math.floor(rollbackdefense) + Math.floor(rollbackleadership);
			var overridetotal = "";

			//*****************************************************************
			// Insert table
			//*****************************************************************

			var trainingTable, rollbacktable;
			trainingTable = document.getElementById('trainingTable');
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

			trainingTable.parentNode.insertBefore(rollbacktable, trainingTable);
			

			//*****************************************************************
			// Insert perfect rollback indicator and spacing
			//*****************************************************************

			var createspace = document.createElement('text');
			createspace.innerHTML = '<p class="tableHeader">&nbsp;Current attributes should be divisible by ' + perfectrollback + ' for perfect rollback</p>';
			trainingTable.parentNode.insertBefore(createspace, trainingTable);

			var createspace = document.createElement('text');
			createspace.innerHTML = '<p>&nbsp;</p>';
			trainingTable.parentNode.insertBefore(createspace, trainingTable);

			var rollbackupdate = document.createElement("button");
			rollbackupdate.innerHTML = '<input type="button" id="rollbackupdate">Update</input>';
			rollbacktable.parentNode.insertBefore(rollbackupdate, rollbacktable.nextSibling);

			rollbackupdate.addEventListener('click', function()
			{		
				if(document.getElementById("text1").value != "")
				{
					document.getElementById("roll1").innerHTML = Math.floor(rollbackfactor * document.getElementById("text1").value * 100 + 0.00001) / 100 + basespeed;
					rollbackspeed2 = Math.floor(rollbackfactor * document.getElementById("text1").value * 100 + 0.00001) / 100 + basespeed;
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
					document.getElementById("roll3").innerHTML = Math.floor(rollbackfactor * document.getElementById("text3").value * 100 + 0.00001) / 100 + baseballhandling;
					rollbackballhandling2 = Math.floor(rollbackfactor * document.getElementById("text3").value * 100 + 0.00001) / 100 + baseballhandling;
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
					document.getElementById("roll4").innerHTML = Math.floor(rollbackfactor * document.getElementById("text4").value * 100 + 0.00001) / 100 + basepassing;
					rollbackpassing2 = Math.floor(rollbackfactor * document.getElementById("text4").value * 100 + 0.00001) / 100 + basepassing;
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
					document.getElementById("roll5").innerHTML = Math.floor(rollbackfactor * document.getElementById("text5").value * 100 + 0.00001) / 100 + baseshooting;
					rollbackshooting2 = Math.floor(rollbackfactor * document.getElementById("text5").value * 100 + 0.00001) / 100 + baseshooting;
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
					document.getElementById("roll6").innerHTML = Math.floor(rollbackfactor * document.getElementById("text6").value * 100 + 0.00001) / 100 + basethreept;
					rollbackthreept2 = Math.floor(rollbackfactor * document.getElementById("text6").value * 100 + 0.00001) / 100 + basethreept;
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
					document.getElementById("roll7").innerHTML = Math.floor(rollbackfactor * document.getElementById("text7").value * 100 + 0.00001) / 100 + basefreethrows;
					rollbackfreethrows2 = Math.floor(rollbackfactor * document.getElementById("text7").value * 100 + 0.00001) / 100 + basefreethrows;
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
					document.getElementById("roll8").innerHTML = Math.floor(rollbackfactor * document.getElementById("text8").value * 100 + 0.00001) / 100 + basedunking;
					rollbackdunking2 = Math.floor(rollbackfactor * document.getElementById("text8").value * 100 + 0.00001) / 100 + basedunking;
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
					document.getElementById("roll9").innerHTML = Math.floor(rollbackfactor * document.getElementById("text9").value * 100 + 0.00001) / 100 + baserebounding;
					rollbackrebounding2 = Math.floor(rollbackfactor * document.getElementById("text9").value * 100 + 0.00001) / 100 + baserebounding;
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
					document.getElementById("roll10").innerHTML = Math.floor(rollbackfactor * document.getElementById("text10").value * 100 + 0.00001) / 100 + baseblocking;
					rollbackblocking2 = Math.floor(rollbackfactor * document.getElementById("text10").value * 100 + 0.00001) / 100 + baseblocking;
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
					document.getElementById("roll11").innerHTML = Math.floor(rollbackfactor * document.getElementById("text11").value * 100 + 0.00001) / 100 + basedefense;
					rollbackdefense2 = Math.floor(rollbackfactor * document.getElementById("text11").value * 100 + 0.00001) / 100 + basedefense;
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
					document.getElementById("roll12").innerHTML = Math.floor(rollbackfactor * document.getElementById("text12").value * 100 + 0.00001) / 100 + baseleadership;
					rollbackleadership2 = Math.floor(rollbackfactor * document.getElementById("text12").value * 100 + 0.00001) / 100 + baseleadership;
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