// ==UserScript==
// @name           Cryostasis
// @namespace      fryeville.com
// @description    This script enables one to more easily load population into a "storage" fleet at colonies. This script is for Warring Factions only.
// @include        http://*.war-facts.com/overview.php*
// @require        http://fryeville.com/files/wf/GM/jslib/php-GM.js
// @require        http://fryeville.com/files/wf/GM/jslib/jquery-GM-1.4.2.js
// ==/UserScript==

// Global Variables
var fleets, nonColoFleets, colonies = {}, fleetData = [];
nonColoFleets = GM_getValue(window.location.hostname+'.nonColoFleets','');
nonColoFleets = (nonColoFleets!='') ? nonColoFleets.split(',') : [];
selColoFleets = GM_getValue(window.location.hostname+'.selColoFleets','');
selColoFleets = (selColoFleets!='') ? selColoFleets.split(',') : [];

$(document).ready(function(){
	// Setup a new Command Overview option for Cryostasis
		$('#view').append(
			$('<option></option>').val('cryo').html('-= Cryostasis =-')
		);
	
	// Setup event handler for fleet checkboxes
	$('input[name=fleetsel]').live('change', function(){
		selColoFleets = [];
		$('input[name=fleetsel]:checked').each(function(){
			selColoFleets.push($(this).val());
		});
		GM_setValue(window.location.hostname+'.selColoFleets', selColoFleets.join(','));
	});
	
	// Setup event handler for the load text boxes
	// Stupid hacks
	$('input[name=load]').live('change', function(){loadValues($(this))});

	// Get rid of the "native" onChange event
		$('#view').attr('onChange','');
	// Define our own
        $('#view').change(function(){
			if (this.value != 'cryo') this.form.submit();
			else displayForm();
        });
});

window.buildFleetData = function(){
	// Get Fleet IDs
		var fleets = $.ajax({
					url: 'http://'+window.location.hostname+'/external/playerdata.php', 
					data: { 'func':'1' }, 
					async: false
					}).responseText;
		
	// Get more details about each fleet
		fleets = fleets.split(',');
		for (var i = 0, len = fleets.length; i < len; i++)
		{
			if ( getFleet(fleets[i]) )
			{			
				// Add content to 'cryobody' (Table <tbody> element)
				redrawFleet(fleets[i]);
			}
		}
}

window.redrawFleet = function(ID, reacquire){
	// Do we Reacquire data first?
	if (reacquire === true)
	{
		var temp = getFleet(ID);
		temp.COLONY = getColo(temp.x);
		fleetData[ID] = temp;
	}
	
	// HTML for this row
	// Expand this later with the **FEATURES**
	var row = $("<tr class='strong' id='"+fleetData[ID].ID+"'></tr>");//.html("<td><input type='checkbox' name='fleetsel' value='"+fleetData[ID].ID+"'></td><td>"+fleetData[ID].name+"</td><td>"+fleetData[ID].COLONY.name+"</td><td>"+fleetData[ID].colonists+"</td><td>"+fleetData[ID].colonistscap+"</td>");
	var td = $('<td></td>').html("<td><input type='checkbox' name='fleetsel' value='"+fleetData[ID].ID+"'>");
	row.append(td);
	var td = $('<td></td>').html("<a href='/fleet_management.php?fleet="+fleetData[ID].ID+"&colony="+fleetData[ID].COLONY.ID+"'>"+fleetData[ID].name+"</a>");
	row.append(td);
	var td = $('<td></td>').html("<a href='/view_colony.php?colony="+fleetData[ID].COLONY.ID+"'>"+fleetData[ID].COLONY.name+"</a>");
	row.append(td);
	var td = $('<td></td>').html(number_format(fleetData[ID].COLONY.population));
	row.append(td);
	var td = $('<td></td>').html(number_format(fleetData[ID].COLONY.population/fleetData[ID].COLONY.size,2));
	row.append(td);
	var td = $('<td></td>').html(fleetData[ID].colonists);
	row.append(td);
	var td = $('<td></td>').html(fleetData[ID].colonistscap);
	row.append(td);
	var td = $('<td></td>').html("<input type='text' name='load' size='5' fleet='"+fleetData[ID].ID+"' colony='"+fleetData[ID].COLONY.ID+"'>");
	row.append(td);
	
	
	// Fleet Selected?
	$(row).find('input[name=fleetsel]').attr('checked', (selColoFleets.indexOf(ID) != -1) )
	
	if ($('#'+ID).length > 0)
	// Replace
		$('#'+ID).replaceWith(row);
	else
	// Append New
		$('#cryobody').append(row);
}

window.getFleet = function(ID){
	// Skip nonColoFleets
	if (nonColoFleets.indexOf(ID) != -1) return false;
	
	var moar = $.ajax({
			url: 'http://'+window.location.hostname+'/external/playerdata.php', 
			data: { 'func':'7', 'ID2': ID }, 
			async: false
			}).responseText;
	
	var temp = {};
	moar = moar.split(',');
	for (var j = 0, jlen = moar.length; j < jlen; j++)
	{
		var f = moar[j].split(':');
		var v = f[1], f = f[0];
		temp[f] = v;
	}
	
	// We're only interested in fleets with colonists capacity stationed at colonies
	if (temp.position == 'colony' && temp.colonistscap > 0)
	{	
		// Get colony details
		if (colonies[temp.x] == undefined)
			temp.COLONY = getColo(temp.x);
		else
			temp.COLONY = colonies[temp.x];
		
		// This is almost definitely because the colony is not our own
		if (temp.COLONY.ID == undefined)
			return false;
		
		fleetData[ID] = temp;
	}
	else
	{
		nonColoFleets.push(fleets[i]);
		GM_setValue(window.location.hostname+'.nonColoFleets',nonColoFleets.join(','));
		return false;
	}
	
	return temp;
}

window.getColo = function(ID){
	var moar = $.ajax({
			url: 'http://'+window.location.hostname+'/external/playerdata.php', 
			data: { 'func':'5', 'ID2': ID }, 
			async: false
			}).responseText;
	
	var temp = {};
	moar = moar.split(',');
	for (var j = 0, jlen = moar.length; j < jlen; j++)
	{
		var f = moar[j].split(':');
		var v = f[1], f = f[0];
		temp[f] = v;
	}
	
	// Cache
	colonies[ID] = temp;
	
	return temp;
}

window.filterFleets = function(){
	// Get rid of the existing fleets
	$('#cryobody').html('');
	
	// Get filter
	var filter = $('#filter').val();
	// Filter the fleets
	for (var i in fleetData)
		if (fleetData[i].name.indexOf(filter) != -1 || filter == '')
			redrawFleet(fleetData[i].ID);
}

window.loadValues = function(f){
	// Get colony ID, first
	var cid = $(f).attr('colony');
	
	// Target a specific density
	if ($(f).val().indexOf('.') != -1)
	{
		var density = parseFloat($(f).val());
		$(f).val(max(0,round(colonies[cid].population-(colonies[cid].size*density))));
	}
	// Target a percentage of the colonies population
	else if ($(f).val().indexOf('%') != -1)
	{
		var per = parseInt($(f).val())/100;
		$(f).val(round(colonies[cid].population*per))
	}
}

window.loadFleets = function(){
	$('input[name=fleetsel]:checked').each(function(){
		var row = $(this).parentsUntil('tbody');
		var colonists = parseInt($(row).find('input[name=load]').val());
		var colony = $(row).find('input[name=load]').attr('colony');
		var fleet = $(row).find('input[name=load]').attr('fleet');
		
		if (!isNaN(colonists))
		{
			// Load the fleet!
			//GM_log(colony+" "+fleet+" "+colonists);
			$.ajax({
					url: 'http://'+window.location.hostname+'/cargo_fleet.php', 
					data: { 'fleet':fleet, 'colony':colony, 'lucolonists':'load', 'colonists':colonists}, 
					async: false
					});
			
			redrawFleet(fleet, true);
		}
	});
}

window.displayForm = function(){
	// Remove any tables that are in our way
	$('.centerbox table').remove()
	
	// Header
	$('.centerbox p strong:first').html("<span style='letter-spacing: .5em;'>CRYOSTASIS</span>");
	
	// New Table
	$('.centerbox form[name=form1]').after("<div style='text-align: center;'><span style='margin-right: 2em;'><input type='text' id='filter' size='10'><input type='button' value='Filter By Name' id='filterbutton' class='warn'></span><span style='margin-right: 2em;'><input type='text' id='loadval' size='10'><input type='button' value='Load Values' class='warn' id='loadvalbutton'></span><span style='margin-right: 2em;'><input type='button' id='getdata' value='Reacquire Data' class='warn'></span><span><input type='button' value='Load Fleets' id='doload' class='warn'></div><table align='center' style='margin-top: 2em;'><thead class='head'><th colspan='2'>Fleet Name</th><th>Colony Name</th><th>Population</th><th>Density</th><th>Colonists</th><th>Capacity</th><th>Load</th></thead><tbody id='cryobody'></tbody></table>");
	
	// Setup "Load Value" event handler
	$('#loadvalbutton').bind('click', function(){
		$('#cryobody input[name=load]').each(function(){
			$(this).val($('#loadval').val());
			loadValues($(this));
		});
	});
	
	$('#filterbutton').bind('click', filterFleets);
	
	$('#getdata').bind('click', buildFleetData);
	
	$('#doload').bind('click', loadFleets);
	
	// Get fleet data
	buildFleetData();	
}