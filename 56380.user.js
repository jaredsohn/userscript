// ==UserScript==
// @name           RR2
// @namespace      RR2
// @description    RR2 - modded by DDC for season 11+
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

function getElementsByType(typename, par)
{
	var a=[];   
	var re = new RegExp('\\b' + typename + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].type)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};


var stats = getElementsByClassName('stat_value_tall', document);

var plyrStats = document.createElement('div');

 plyrStats.innerHTML = '<div class="medium_head">Desired Roll</div>'  + 
	'<span class="stat_head">Strength: <input type=text value=0 size=2 id="txtStat1">&nbsp;' +
	'<span class="stat_head">Blocking: <input type=text value=0 size=2 id="txtStat2"><br>' +
	'<span class="stat_head">Speed: <input type=text value=0 size=2 id="txtStat3">&nbsp;' +
	'<span class="stat_head">Tackling: <input type=text value=0 size=2 id="txtStat4"><br>' +
	'<span class="stat_head">Agility: <input type=text value=0 size=2 id="txtStat5">&nbsp;' +
	'<span class="stat_head">Throwing: <input type=text value=0 size=2 id="txtStat6"><br>' +
	'<span class="stat_head">Jumping: <input type=text value=0 size=2 id="txtStat7">&nbsp;' +
	'<span class="stat_head">Catching: <input type=text value=0 size=2 id="txtStat8"><br>' +
	'<span class="stat_head">Stamina: <input type=text value=0 size=2 id="txtStat9">&nbsp;' +
	'<span class="stat_head">Carrying: <input type=text value=0 size=2 id="txtStat10"><br>' +
	'<span class="stat_head">Vision: <input type=text value=0 size=2 id="txtStat11">&nbsp;' +
	'<span class="stat_head">Kicking: <input type=text value=0 size=2 id="txtStat12"><br>' +
	'<span class="stat_head">Confidence: <input type=text value=0 size=2 id="txtStat13">&nbsp;' +
	'<span class="stat_head">Punting: <input type=text value=0 size=2 id="txtStat14"><br>'

      var reroll= document.createElement('div');
      reroll.innerHTML = "<span style='cursor:pointer;'><u>Roll Player to stats</u></span>";
      reroll.addEventListener('click',StartRolling, false);
      var clearroll= document.createElement('div');
      clearroll.innerHTML = "<span style='cursor:pointer;'><u>Clear Roll</u></span>";
      clearroll.addEventListener('click',ClearRollInfo, false);

 plyrStats.appendChild(reroll);
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
                //document.forms[0].elements[document.forms[0].elements.length-1].click();
                var buttons = getElementsByType('image', document);
                buttons[buttons.length-1].click();

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
    var buttons = getElementsByType('image', document);
    buttons[buttons.length-1].click();
	//document.forms[0].elements[document.forms[0].elements.length-1].click();
}

function ClearRollInfo(){
	for (var i=1; i<15; i++) {
		GM_setValue("RollStat" + i,"0");
	}
	GM_setValue("Rerolling","0");
	GM_setValue("RollCount","0");
}

},100);
