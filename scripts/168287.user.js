// ==UserScript==
// @name           e-Sim Damage Calculator Mini
// @version        0.1.3.6
// @namespace      localhost
// @author         Heff
// @description    A small tool to calculate potential damage of a player when viewing their profile.
// @match          http://*.e-sim.org/profile.html?id=*
// ==/UserScript==


function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

 

// the guts of this userscript
function main() {
	{ //design
	var des = ' \
<div id="dmgCalc" class="testDivwhite" style="height: 100px; width: 480px; margin-top:10px; float:left"> \
	<div style="position:relative; top:0px; left:0px; width:65px; height:45px"> \
		<b>Weapons:</b> \
		<br> \
		<select id="weaponQ"> \
			<option value="0.5">None</option> \
			<option value="1.2">Q1</option> \
			<option value="1.4">Q2</option> \
			<option value="1.6">Q3</option> \
			<option value="1.8">Q4</option> \
			<option value="2.0">Q5</option> \
		</select> \
	</div> \
	<div style="position:relative; top:-45px; left:83px; width:120px; height:45px"> \
		<b style="float:center">Region Building:</b> \
		<br> \
		<select id="buildingType" style="float:left"> \
			<option value="1">None</option> \
			<option value="2">DS</option> \
			<option value="3">Hosp.</option> \
		</select> \
		<select id="buildingQ" style="float:left"> \
			<option value="0">  </option> \
			<option value="1">Q1</option> \
			<option value="2">Q2</option> \
			<option value="3">Q3</option> \
			<option value="4">Q4</option> \
			<option value="5">Q5</option> \
		</select> \
	</div> \
	<div style="position:relative; top:-92px; left:220px; width:50px; height:45px"> \
		<b style="float:center">Food:</b> \
		<br> \
		<input type="number" min="0" id="foodNum" value="15" style="max-width : 30px"> \
	</div> \
	<div style="position:relative; top:-134px; left:277px; width:50px; height:45px"> \
		<b style="float:center">Gift:</b> \
		<br> \
		<input type="number" min="0" id="giftNum" value="15" style="max-width : 30px"> \
	</div> \
	<div style="position:relative; top:-179px; left:334px; width:60px; height:45px"> \
		<b style="float:center">Health:</b> \
		<br> \
		<input type="number" min="0" max="100" step="0.5" id="healthNum" value="50" style="max-width : 40px"> \
	</div> \
	<div style="position:relative; top:-224px; left:395px; width:85px; height:45px"> \
		<b>Est. Berserk:</b> \
		<br> \
		<div class="help equipmentBlueBox" style="position:relative; width:81px"> \
			<b id="estBerserk">9001</b> \
		</div> \
	</div> \
	<div style="position:relative; top:-224px; left:395px; width:85px; height:45px"> \
		<b>Est. Damage:</b> \
		<br> \
		<div class="help equipmentBlueBox" style="position:relative; width:81px"> \
			<b id="estTotal">9001</b> \
		</div> \
	</div> \
	<div style="position:relative; top:-268px; left:0px; width:390px; height:24px"> \
		<div class="statsLabel smallStatsLabel greenLabel" style="float:right"> \
			<b>Region:</b> \
			<input type="checkbox" id="regionBonus" value="1.2"> \
		</div> \
		<div class="statsLabel smallStatsLabel greenLabel" style="float:right"> \
			<b>MU:</b> \
			<input type="checkbox" id="muBonus" value="1"> \
		</div> \
		<div class="statsLabel smallStatsLabel greenLabel" style="float:right"> \
			<b>Sewer/Bunker:</b> \
			<input type="checkbox" id="swrbunkBonus" value="1.25"> \
		</div> \
		<div class="statsLabel smallStatsLabel greenLabel" style="float:right"> \
			<b>Tank:</b> \
			<input type="checkbox" id="tankBonus" value="1.2"> \
		</div> \
		<div class="statsLabel smallStatsLabel greenLabel" style="float:right"> \
			<b>Steroids:</b> \
			<input type="checkbox" id="steroidBonus" value="1.2"> \
		</div> \
	</div> \
	<div style="position:relative; top:-268px; left:0px; width:390px; height:24px"> \
		<div class="statsLabel smallStatsLabel redLabel" style="float:right; width:125px"> \
			<b style="float:left; padding-top:3px">Surrounded:</b> \
			<input type="checkbox" id="surroundDebuff" value="0.8" style="float:right"> \
		</div> \
		<div class="statsLabel smallStatsLabel redLabel" style="float:right"> \
			<b>Sewer/Bunker:</b> \
			<input type="checkbox" id="swrbunkDebuff" value="0.8"> \
		</div> \
		<div class="statsLabel smallStatsLabel redLabel" style="float:right"> \
			<b>Tank:</b> \
			<input type="checkbox" id="tankDebuff" value="1"> \
		</div> \
		<div class="statsLabel smallStatsLabel redLabel" style="float:right"> \
			<b>Steroids:</b> \
			<input type="checkbox" id="steroidDebuff" value="0.8"> \
		</div> \
	</div> \
</div> \
'; 

	}

	$.fn.exists = function () {
		return this.length !== 0;
	}
	
	$( "#profileEquipment" ).parent().css({ "height" : "340px" });
	$( "#profileEquipment" ).parent().append(des);
	
	var minDmg = parseInt($('#hitHelp b').first().text().replace(',',''));
	var maxDmg = parseInt($('#hitHelp b').last().text().replace(',',''));
	var avgHit = (minDmg + maxDmg) / 2;
	
	var crit = $('#criticalHelp .equipmentStats').first().text();
	crit = parseFloat(crit.replace('%','')) / 100.0;
	
	var miss = $('#missHelp .equipmentStats').first().text();
	miss = parseFloat(miss.replace('%','')) / 100.0;
	
	var avoid = $('#avoidHelp .equipmentStats').first().text();
	avoid = parseFloat(avoid.replace('%','')) / 100.0;
	
	var muValue = 1.0;
	if($('a[href^="militaryUnit.html?id="]').exists())
	{
		var muID = $('a[href^="militaryUnit.html?id="]').first().attr('href').replace('militaryUnit.html?id=', '');
		var query = 'apiMilitaryUnitById.html?';
		var json = $.getJSON(query, "id="+muID).done(function (data) {
			switch(data.militaryUnitType) {
				case "Novice":
					muValue = 1.05;
				break;
				case "Regular":
					muValue = 1.1;
				break;
				case "Veteran":
					muValue = 1.15;
				break;
				case "Elite":
					muValue = 1.2;
				break;
			}
		});
	}

	function calcMissAvoid( numHits, depth )
	{
		depth++;
		var numHits = numHits * (1 - miss);
		var newHits = numHits * avoid;
		if( depth == 10 ) {
			return numHits;
		} else {
			return numHits + arguments.callee( newHits, depth );
		}			
	}
	
	function calc() {
		var hit = avgHit * parseFloat($("#weaponQ").val());
		
		if($("#buildingType").val() == 2) { 
			hit = hit * (1 + parseInt($("#buildingQ").val()) * 0.05);
		}
		
		if($("#steroidBonus").is(":checked")) { hit = hit * 1.2; }
		else if($("#steroidDebuff").is(":checked")) { hit = hit * 0.8; }
		
		if($("#tankBonus").is(":checked")) { hit = hit * 1.2; }

		if($("#swrbunkBonus").is(":checked")) { hit = hit * 1.25; }
		else if($("#swrbunkDebuff").is(":checked")) { hit = hit * 0.8; }
		
		if($("#muBonus").is(":checked")) { hit = hit * muValue; } //FIX!
		
		if($("#regionBonus").is(":checked")) { hit = hit * 1.2; }
		
		if($("#surroundDebuff").is(":checked")) { hit = hit * 0.8; }
		
		hit = hit * (1 + crit);
		$("#estBerserk").html(Math.round(hit*5));
		
		var totalHealth = parseFloat($("#healthNum").val());
		totalHealth += parseInt($("#foodNum").val()) * 50;
		totalHealth += parseInt($("#giftNum").val()) * 50;
		
		var healthPerHit = 10;
		if($("#buildingType").val() == 3) { 
			healthPerHit -= (parseInt($("#buildingQ").val()) * 0.5);
		}
		
		var totalHits = Math.floor(totalHealth / healthPerHit);
		totalHits = calcMissAvoid( totalHits, 0 );
		
		var totalDamage = totalHits * hit;
		
		$("#estTotal").html(Math.round(totalDamage));
	}
	
	function cssSetDisabled(item)
	{
		$( item ).parent().css( "background-color", "rgb(219, 219, 219)" );
		$( item ).parent().css( "border", "1px solid rgba(0, 0, 0, 0.7)" );
		$( item ).parent().css( "box-shadow", "0 0 5px rgba(0, 0, 0, 0.5), 0 -12px 12px rgba(144, 169, 1156, 0.2) inset" );
		$( item ).parent().css( "webkit-box-shadow", "0 0 5px rgba(0, 0, 0, 0.5), 0 -12px 12px rgba(144, 169, 1156, 0.2) inset" );
	}
	
	function cssSetEnabled(item)
	{
		$( item ).parent().removeAttr("style");
		$( item ).parent().attr("style", "float:right");
		if (item == "#surroundDebuff")
			$( item ).parent().attr("style", "float:right; width:125px");
	}
	
	cssSetDisabled("#tankBonus");
	$("#tankBonus").prop("disabled", true);
	$("#buildingQ").prop("disabled", true);
	calc();
	
	$("#weaponQ").change( function(){ 
		if($("#weaponQ").val() != 2.0)
		{
			cssSetDisabled("#tankBonus");
			$("#tankBonus").prop("disabled", true);
			if($("#tankBonus").is(":checked"))
			{
				$("#tankBonus").attr('checked', false);
				cssSetEnabled("#tankDebuff");
				$("#tankDebuff").prop("disabled", false);
			}
		} else {
			cssSetEnabled("#tankBonus");
			$("#tankBonus").prop("disabled", false);
		}
		calc(); 
	});
	$("#buildingType").change( function(){ 
		if($("#buildingType").val() == 1)
		{
			$("#buildingQ").prop("disabled", true);
			$("#buildingQ").val("0");
		} else {
			$("#buildingQ").prop("disabled", false);
		}
		calc(); 
	});
	$("#buildingQ").change( function(){ calc(); });
	$("#foodNum").change( function(){ 
		if(parseInt($("#foodNum").val()) < 0)
		{
			$("#foodNum").val("0");
		}
		calc(); 
	});
	$("#giftNum").change( function(){ 
		if(parseInt($("#giftNum").val()) < 0)
		{
			$("#giftNum").val("0");
		}
		calc(); 
	});
	$("#healthNum").change( function(){ 
		if(parseFloat($("#healthNum").val()) < 0)
		{
			$("#healthNum").val("0.0");
		} else if (parseFloat($("#healthNum").val()) > 100.0) 
		{
			$("#healthNum").val("100.0");
		}
		calc(); 
	});
	$("#regionBonus").change( function(){ calc(); });
	$("#muBonus").change( function(){ calc(); });
	$("#swrbunkBonus").change( function(){ 
		if($("#swrbunkBonus").is(":checked"))
		{
			cssSetDisabled("#swrbunkDebuff");
			$("#swrbunkDebuff").prop("disabled", true);
			cssSetDisabled("#surroundDebuff");
			$("#surroundDebuff").prop("disabled", true);
		} else {
			cssSetEnabled("#swrbunkDebuff");
			$("#swrbunkDebuff").prop("disabled", false);
			cssSetEnabled("#surroundDebuff");
			$("#surroundDebuff").prop("disabled", false);
		}
		calc(); 
	});
	$("#tankBonus").change( function(){ 
		if($("#tankBonus").is(":checked"))
		{
			cssSetDisabled("#tankDebuff");
			$("#tankDebuff").prop("disabled", true);
		} else {
			cssSetEnabled("#tankDebuff");
			$("#tankDebuff").prop("disabled", false);
		}
		calc(); 
	});
	$("#steroidBonus").change( function(){ 
		if($("#steroidBonus").is(":checked"))
		{
			cssSetDisabled("#steroidDebuff");
			$("#steroidDebuff").prop("disabled", true);
		} else {
			cssSetEnabled("#steroidDebuff");
			$("#steroidDebuff").prop("disabled", false);
		}
		calc(); 
	});
	$("#surroundDebuff").change( function(){ 
		if($("#surroundDebuff").is(":checked"))
		{
			cssSetDisabled("#swrbunkBonus");
			$("#swrbunkBonus").prop("disabled", true);
		} else {
			if(!$("#swrbunkDebuff").is(":checked"))
			{
				cssSetEnabled("#swrbunkBonus");
				$("#swrbunkBonus").prop("disabled", false);
			}
		}
		calc(); 
	});
	$("#swrbunkDebuff").change( function(){ 
		if($("#swrbunkDebuff").is(":checked"))
		{
			cssSetDisabled("#swrbunkBonus");
			$("#swrbunkBonus").prop("disabled", true);
		} else {
			if(!$("#surroundDebuff").is(":checked"))
			{
				cssSetEnabled("#swrbunkBonus");
				$("#swrbunkBonus").prop("disabled", false);
			}
		}
		calc(); 
	});
	$("#tankDebuff").change( function(){ 
		if($("#tankDebuff").is(":checked"))
		{
			cssSetDisabled("#tankBonus");
			$("#weaponQ").prop("disabled", true);
			$("#tankBonus").prop("disabled", true);
			$("#weaponQ").val("0.5");
		} else {
			$("#weaponQ").prop("disabled", false);
		}
		calc(); 
	});
	$("#steroidDebuff").change( function(){ 
		if($("#steroidDebuff").is(":checked"))
		{
			cssSetDisabled("#steroidBonus");
			$("#steroidBonus").prop("disabled", true);
		} else {
			cssSetEnabled("#steroidBonus");
			$("#steroidBonus").prop("disabled", false);
		}
		calc(); 
	});
}

addJQuery(main);


