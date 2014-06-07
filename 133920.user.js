// ==UserScript==
// @name           GLB Player Value
// @namespace      GLB
// @description   Puts the real player value on the player page
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==

var _Caps = {
	'87.6':0,
	'85.58':0,
	'83.25':0,
	'80.53':0,
	'77.28':0,
	'73.24':0,
	'67.97':0,
	'60.51':0,
	'48.06':0,
	'10.00':0
};
var _PercentBonus = ['Break tackle chance','Fake chance','Hold block chance','Pass distance','Pass quality','Catch ball chance','Not fumble chance', //offensive
	'Break block chance','Make tackle chance','Force fumble chance','Avoid fake chance','Deflect ball chance','Interception chance']; //defensive
var _PlayerAtts = {
	'Strength':0,
	'Speed':0,
	'Agility':0,
	'Jumping':0,
	'Stamina':0,
	'Vision':0,
	'Confidence':0,
	'Blocking':0,
	'Tackling':0,
	'Throwing':0,
	'Catching':0,
	'Carrying':0,
	'Kicking':0,
	'Punting':0
};

var _saTableValue = {
	'0':  [0,0],
	'1':  [1,2],
	'2':  [2,4],
	'3':  [4,7],
	'4':  [6,10],
	'5':  [9,14],
	'6':  [12,18],
	'7':  [16,23],
	'8':  [20,28],
	'9':  [25,34],
	'10': [30,40]
};
var _vpValue = 0;
var _pctValue = 0;
var _saValue = 0;
var _statValue = 0;

/*
 percent points = (sum %'s) * 3
 vet points = # VA's / 10
 sa points = 	if SA > 10 then
					if SA last in tree then
						40 + (SA # - 10) * 6
					else
						30 + (SA # - 10) * 5
					end if
				else
					value of _saTableValue (if last in tree use idx 1 else 0)
				end if
	
 stat points = 
	(
		for each cap level (starting at the end):
		if value > cap then
			Math.floor(value - sum of previous cap values - the cap)
		else
			0
		end if
	)
	then sum each cap and multiply by the cap # (indexed at 1), then sum all of that

 total points = sum of above points
*/

function setAttStats(){
	var startArea;
	if($('#normalStats').length > 0){
		startArea = $('#normalStats');
	}else{
		startArea = $('DIV#player_stats TABLE.player_stats_table');
	}
	
	$('DIV.stat_head_tall',startArea).each(function(){
		var att = $(this).text().replace(/\:/gi,'');
		if(!_PlayerAtts[att] && _PlayerAtts[att] != 0){
			alert('cannot find attribute: ' + att);
		}
		var theVal = $(this).next().text();
		if(theVal.indexOf('(') > 0){
			theVal = theVal.substring(0,theVal.indexOf('(') - 1);
		}
		_PlayerAtts[att] = Number(theVal);
	});
	
	//console.log(_PlayerAtts);
	
	computeStatValue();
};

function computeStatValue(){
	for(var att in _PlayerAtts){
		for(var cap in _Caps){
			var toUse = (cap == '10.00' ? 0 : Number(cap));
			if(_PlayerAtts[att] > toUse){
				if(toUse == 0){
					var theVal = _PlayerAtts[att] - toUse;
				}else{
					var theVal = Math.floor(_PlayerAtts[att] - toUse);
				}
				_Caps[cap] += theVal;
				_PlayerAtts[att] -= theVal;
				// if(toUse == 80.53){
					// console.log(att + ' - ' + theVal);
				// }
			}
		}
	}
	//console.log(_Caps);
	var cnt = 10;
	for(var cap in _Caps){
		_statValue += (_Caps[cap] * cnt);
		cnt -= 1;
	}
	//console.log('stat value: ' + _statValue);
};

function countVPs(){
	var vpCount = 0;
	$('DIV#vet_skills_box DIV.skill_level').each(function(){
		vpCount += parseInt($(this).text(),10);
	});
	_vpValue = vpCount / 10;
	//console.log('vp value: ' + _vpValue);
};

function addPercents(){
	var pctCount = 0;
	$('DIV.medium_head:contains("Current Bonuses/Penalties")').next('TABLE').find('TR').each(function(){
		var item = $(this).find('TD:eq(0)').text();
		for(var i=0;i<_PercentBonus.length;i++){
			if(_PercentBonus[i] == item){
				var cnt = $(this).find('TD:eq(1)').text();
				pctCount += Number(cnt.replace(/\%/gi,''));
				break;
			}
		}
	});
	_pctValue = pctCount * 3;
	//console.log('percent value: ' + _pctValue);
};

function grabSAs(){
	var elms = $('DIV#skill_trees_content DIV.subhead');
	$('DIV#skill_trees_content DIV.subhead').each(function(){
		var cnt = 0;
		var elm = this;
		while($(elm).next().hasClass('skill_button')){
			elm = $(elm).next();
			cnt += 1;
			var num = parseInt($(elm).find('DIV.skill_level').text(),10);
			if(cnt == 5){
				if(num > 10){
					_saValue += (40 + (num - 10) * 6);
				}else{
					_saValue += _saTableValue[num + ''][1];
				}
			}else{
				if(num > 10){
					_saValue += (30 + (num - 10) * 5);
				}else{
					_saValue += _saTableValue[num + ''][0];
				}
			}
		}
	});
	//console.log('sa value: ' + _saValue);
};

function roundNumber(num){
	return Math.round(num * 100)/100;
};

function drawPlayerValues(){
	var tbl = $('#player_current_stats_table');
	
	// add header
	$(tbl).find('TR:eq(0) TD:eq(0)').after('<td class="current_stats_head">Calc PV</td>');

	// add data
	var theData = '<span onmouseover="set_tip(\'Attribute Value\',0,1,1,1);" onmouseout="unset_tip();">' + roundNumber(_statValue) + '</span>' +
		' / <span onmouseover="set_tip(\'SA Value\',0,1,1,1);" onmouseout="unset_tip();">' + roundNumber(_saValue) + '</span>' +
		' / <span onmouseover="set_tip(\'Vet Points Value\',0,1,1,1);" onmouseout="unset_tip();">' + roundNumber(_vpValue) + '</span>' +
		' / <span onmouseover="set_tip(\'Percents Value\',0,1,1,1);" onmouseout="unset_tip();">' + roundNumber(_pctValue) + '</span>' +
		'<br /><span onmouseover="set_tip(\'Total Player Value\',0,1,1,1);" onmouseout="unset_tip();" style="font-weight:bold;font-size:8pt;">' + roundNumber(_statValue + _saValue + _vpValue + _pctValue) + '</span>';
	$(tbl).find('TR:eq(1) TD:eq(0)').after('<td class="current_stats_value" style="font-size:7pt;padding-bottom:0px;">' + theData + '</td>');
	
	//expand fame cell
	var cell = $(tbl).find('TR:eq(2) TD:eq(1)');
	$(cell).attr('colSpan',$(cell).attr('colSpan') + 1);
};

setAttStats();
countVPs();
addPercents();
grabSAs();
drawPlayerValues();