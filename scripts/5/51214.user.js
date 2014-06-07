// ==UserScript==
// @name           RR2 fixed
// @namespace      RR2
// @description    RR2
// @include        http://goallineblitz.com/game/reroll_player.pl?player_id=*
// ==/UserScript==

window.setTimeout( function() 
{

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};



var stats = getElementsByClassName('stat_value_tall', document);

var plyrStats = document.createElement('table');

 plyrStats.innerHTML = '<tr class="nonalternating_color"><td style="width: 150px;" colspan="2">Desired Attributes</td>'  + 
	'<tr class="alternating_color1"><td><span class="stat_head">Strength: <td><input type=text value=0 size=2 id="txtStat1">&nbsp;</td>' +
	'<td><span class="stat_head">Blocking: <td><input type=text value=0 size=2 id="txtStat2"></td>' +
	'<tr class="alternating_color2"><td><span class="stat_head">Speed: <td><input type=text value=0 size=2 id="txtStat3">&nbsp;</td>' +
	'<td><span class="stat_head">Tackling: <td><input type=text value=0 size=2 id="txtStat4"></td>' +
	'<tr class="alternating_color1"><td><span class="stat_head">Agility: <td><input type=text value=0 size=2 id="txtStat5">&nbsp;</td>' +
	'<td><span class="stat_head">Throwing: <td><input type=text value=0 size=2 id="txtStat6"></td>' +
	'<tr class="alternating_color2"><td><span class="stat_head">Jumping: <td><input type=text value=0 size=2 id="txtStat7">&nbsp;</td>' +
	'<td><span class="stat_head">Catching: <td><input type=text value=0 size=2 id="txtStat8"></td>' +
	'<tr class="alternating_color1"><td><span class="stat_head">Stamina: <td><input type=text value=0 size=2 id="txtStat9">&nbsp;</td>' +
	'<td><span class="stat_head">Carrying: <td><input type=text value=0 size=2 id="txtStat10"></td>' +
	'<tr class="alternating_color2"><td><span class="stat_head">Vision: <td><input type=text value=0 size=2 id="txtStat11">&nbsp;</td>' +
	'<td><span class="stat_head">Kicking: <td><input type=text value=0 size=2 id="txtStat12"></td>' +
	'<tr class="alternating_color1"><td><span class="stat_head">Confidence: <td><input type=text value=0 size=2 id="txtStat13">&nbsp;</td>' +
	'<td><span class="stat_head">Punting: <td><input type=text value=0 size=2 id="txtStat14"></td>'

      var reroll= document.createElement('td');
      reroll.setAttribute('colspan', '2')
      reroll.setAttribute('width', '50%')
      reroll.innerHTML = "<a class='buttonSmall' style='text-align:left'><span>Roll Player to stats</span></a>";
      reroll.addEventListener('click',StartRolling, false);
      var clearroll= document.createElement('div');
      clearroll.innerHTML = "<span style='cursor:pointer;'><u>Clear Roll</u></span>";
      clearroll.addEventListener('click',ClearRollInfo, false);

 plyrStats.firstChild.firstChild.appendChild(reroll);
 //plyrStats.appendChild(clearroll);

var container=document.getElementById('player_stats')
container.parentNode.insertBefore( plyrStats, container.nextSibling);

loadStats();

function loadStats(){
	var rollAgain = false;
	var rolling = GM_getValue("Rerolling", null);
	var rollcount = parseInt(GM_getValue("RollCount", 0));
	//alert (rollcount);
	if (rolling == "1") {
		for (var i=1; i<15; i++) {
			var statbox = document.getElementById('txtStat' + i);
			statbox.value = GM_getValue("RollStat" + i,null);
			if (parseInt(statbox.value) < 0) {
				if (parseInt(stats[i-1].innerHTML) > Math.abs(parseInt(statbox.value))) {
					rollAgain = true;
				}
			} else {
				if (parseInt(stats[i-1].innerHTML) < parseInt(statbox.value)) {
					rollAgain = true;
				}
			}
		}

		GM_setValue("RollCount",rollcount +1);		
		
		if (rollcount > 99999) {
			alert ("100000 rolls, no match.");
			ClearRollInfo();
		} else {
			//alert ("rolling again?" + rollAgain);
			if (rollAgain) {
					var url = window.location.href.split('&action=', 2)[0]
					window.location = url + '&action=Re-Roll'
			} else {
				ClearRollInfo();
			}
		}
	}
}



function StartRolling(){
	for (var i=1; i<15; i++) {
		var statbox = document.getElementById('txtStat' + i);
		GM_setValue("RollStat" + i,statbox.value);
	}
	GM_setValue("Rerolling","1");
	GM_setValue("RollCount","1");
	var url = window.location.href.split('&action=', 2)[0]
	window.location = url + '&action=Re-Roll'
}

function ClearRollInfo(){
	for (var i=1; i<15; i++) {
		GM_setValue("RollStat" + i,"0");
	}
	GM_setValue("Rerolling","0");
	GM_setValue("RollCount","0");
}

},100);