// ==UserScript==
// @name				Elementthegame statistic
// @author			ryojii
// @version			0.6
// @description		stat's helper is a simple set of button to help players keep their result in elementthegame at www.elementthegame.com
// @include			elementsthegame.net/*
// ==/UserScript==

//---------------------------------------------------------------------------------------------------
//    Copyright (C) 2010  jerome aiguillon
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    For a copy of the latest GNU General Public License, see <http://www.gnu.org/licenses/gpl.html>.

// If you distribute a modified version of "stat's helper", you are encouraged to use
// my name in the credits, and a copy of the license above.
//---------------------------------------------------------------------------------------------------



//set variable
var AI1 = new Array ();
var AI2 = new Array ();
var AI3 = new Array ();
var HB = new Array ();
var FG = new Array ( "Chaos Lord", "Dark Matter", "Decay", "Destiny", "Divine Glory", "Dream Catcher", "Elidnis", "Eternal Phoenix", 
					 "Ferox", "Fire Queen", "Gemini", "Graviton", "Hermes", "Incarnate", "Miracle", "Morte", "Neptune", "Obliterator",
					 "Octane", "Osiris", "Paradox", "Rainbow", "Scorpio", "Seism" );
var ai = new Array ( 'AI1', 'AI2', 'AI3', 'TOP50', 'HB', 'FG');
var result = new Array ();
var CurrentAi = null;
var CurrentAiName = null;
if ( typeof GM_getValue("win") == "undefined" ) {
	GM_setValue("win", 0 );
	GM_setValue("lost", 0 );
	GM_setValue("do", 0 );
	GM_setValue("em", 0 );
}

var HB_1 = new Array ( "Aeth", "Aqua", "Ari", "Chr", "Dis", "Lum", "Mas", "Mor", "Pyr", "Shad", "Ter", "Vit" );
var HB_2 = new Array ( "es", "ra", "ofuze", "rius", "iel", "ow", "cord", "sa", "onos", "eric", "al", "tis" );
HB_1.sort();
HB_2.sort();

for ( var i in HB_1 ) {
	for (var j in HB_2) {
		HB.push( HB_1[i] + HB_2[j]) ;
	}
}

//insert the div container.
var ins = document.createElement('DIV');
document.body.appendChild(ins);
ins.id='statWrapper';
ins.style.position="Absolute";
ins.style.top="95px";
ins.style.left="5px";
ins.style.color ='white';
ins.style.width = "200px";

//button for Win
var BWin = document.createElement('INPUT');
BWin.type='button';
BWin.value='Win';
BWin.id='InputWin';
BWin.addEventListener('click', function() { updateCpt("win") ; }, true);
ins.appendChild(BWin);

//button for Elemental mastery
var BWinEM = document.createElement('INPUT');
BWinEM.type='button';
BWinEM.value='Elemental Master';
BWinEM.id='InputWinEM';
BWinEM.addEventListener('click', function() { updateCpt("em") ; }, true);
ins.appendChild(BWinEM);

//button for Lose
var BLost = document.createElement('INPUT');
BLost.type='button';
BLost.value='Lost';
BLost.id='InputLost';
BLost.addEventListener('click', function() { updateCpt("lost") ; }, true);
ins.appendChild(BLost);

//button for Deck out
var BLostDO = document.createElement('INPUT');
BLostDO.type='button';
BLostDO.value='Deck out';
BLostDO.id='InputLostDO';
BLostDO.addEventListener('click', function() { updateCpt("do") ; }, true);
ins.appendChild(BLostDO);

//button View/close Stat
//view
var BView = document.createElement('INPUT');
var statResultString = "" ;
BView.type='button';
BView.value='view stat';
BView.id='View';
ins.appendChild(BView);
BView.addEventListener('click', function(event) {
		var stringStat = "";
		getStatResult() ;
		var winPercent = (( GM_getValue('win') + GM_getValue('lost') )== 0)? 0 : Math.round( (GM_getValue('win') * 100)/( GM_getValue('win') + GM_getValue('lost') ) );
		var winEmPercent = ( GM_getValue('win') == 0)? 0 : Math.round( (GM_getValue('em') * 100)/( GM_getValue('win') ) );
		stringStat  = 'win  : ' + GM_getValue('win') + ' (em :'+ GM_getValue('em') +') <br>\n';
		stringStat +='lost : ' + GM_getValue("lost") + '(do: '+GM_getValue('do')+') <br>\n' ;
		stringStat +='total : '+ ( GM_getValue('win') + GM_getValue('lost') ) +'\n<br>' ;
		stringStat +='win percent: '+ winPercent +'% (em : '+winEmPercent+'%)<br>';
		stringStat += statResultString; 
		//alert (stringStat);
		stat.innerHTML = stringStat ;
		stat.style.display = "inherit";
	}, true);
//close
var Bclose = document.createElement('INPUT');
Bclose.type='button';
Bclose.value='close stat';
Bclose.id='close';
Bclose.addEventListener('click', function(event) {
	stat.style.display = "none";
},true );
ins.appendChild(Bclose);
	
//button for resetting stat
var reset = document.createElement('INPUT');
reset.type='button';
reset.value='Reset Stat';
reset.addEventListener('click', resetStat, true);
ins.appendChild(reset);

//SelectBox for AI 
var BAI = document.createElement('Select');
BAI.id='Aichoice';
ins.appendChild(BAI);
var opt = document.createElement('option');
opt.text = "Selectlevel";
BAI.appendChild(opt);
for ( i in ai ) {
opt = document.createElement('option');
opt.value = ai[i];
opt.text = ai[i];
BAI.appendChild(opt);
}
BAI.addEventListener('change', function(event) { 
	CurrentAi = this.value ;
	CurrentAiName = this.value;
	}, true);

//SelectBox for HB and FG. Visible if chossen in AI select box
var HBSelect = document.createElement('Select');
HBSelect.id='Aichoice';
ins.appendChild(HBSelect);
opt = document.createElement('option');
opt.text = "Select Half-Blood name";
HBSelect.appendChild(opt);
for ( i in HB ) {
	opt = document.createElement('option');
	opt.value = HB[i];
	opt.text = HB[i];
	HBSelect.appendChild(opt);
}
HBSelect.addEventListener('change', function(event) { CurrentAiName = this.value ;}, true);

var FGSelect = document.createElement('Select');
FGSelect.id='Aichoice';
ins.appendChild(FGSelect);
opt = document.createElement('option');
opt.text = "select False God name";
FGSelect.appendChild(opt);
for ( i in FG ) {
	opt = document.createElement('option');
	opt.value = FG[i];
	opt.text = FG[i];
	FGSelect.appendChild(opt);
}
FGSelect.addEventListener('change', function(event) { CurrentAiName = this.value ;}, true);

//define the div for stat visualisation
// must be defined after all over element ( unless you want to manage node order :P )
var stat = document.createElement('DIV');
ins.appendChild(stat);
stat.id='statShow';
stat.style.display = "none";
stat.style.position="Relative";
stat.style.top="10px";
stat.style.padding="5px";
stat.style.color ='white';
stat.style.background ='black';
stat.style.width = "200px";
stat.innerHTML =" ";


// Function
function initResult ( name ) {
	var t = GM_getValue ( name + "_win" ) ;
	if (typeof t == "undefined" ) {
		GM_setValue ( name + "_win" , "0");
		GM_setValue ( name + "_lost" , "0");
		GM_setValue ( name + "_do" , "0");
		GM_setValue ( name + "_em" , "0");
	}
}

function resetStat () {
 if (confirm("are you sure you want to reset your stat ?")) {
		for each (var id in GM_listValues()) {
			GM_deleteValue(id);
		}
		GM_setValue("win", 0 );
		GM_setValue("lost", 0 );
		GM_setValue("do", 0 );
		GM_setValue("em", 0 );
	}
}

function updateCpt(target) { 
	GM_setValue(target, Number(GM_getValue(target)) + 1 );
	if ( typeof GM_getValue(CurrentAiName+"_" +target) == "undefined" ) {
		initResult(CurrentAiName);
	}
	GM_setValue ( CurrentAiName+"_" +target , ( Number(GM_getValue( CurrentAiName +"_" +target )) + 1 ) ) ;
	if (target == "do")
		updateCpt("lost");
	if (target == "em")
		updateCpt("win");
}

function getStatResult() {
	statResultString = "<TABLE style='color:white;border: 1px solid grey;'><tr><th>name</th><th>win</th><th>EM</th><th>lost</th><th>DO</th></tr>";
	for each (var HBName in HB.concat("AI1", "AI2", "AI3", "TOP50", FG) ) {
		if ( typeof GM_getValue(HBName+"_win") != "undefined" ) {
			statResultString += '<tr><td>' +  ( HBName +"</td><td> "+ GM_getValue(HBName+"_win") + "</td><td> "+ GM_getValue(HBName+"_em") +"</td><td> " +GM_getValue(HBName+"_lost") + "</td><td> " + GM_getValue(HBName+"_do") + "</td></tr>" );
		}
	}
}
	