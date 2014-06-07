// ==UserScript==
// @name          Coress++
// @namespace     http://www.devillers.nl
// @description   Adds support for quick navigation and sheet management to Info Support Coress application
// @include       https://mobile.infosupport.com/coress/*
// @include       https://mobile.infosupport.com/Coress/*
// @match         https://mobile.infosupport.com/coress/*
// @match         https://mobile.infosupport.com/Coress/*
// ==/UserScript==

// Gonna need some jQuery magic to pull this one off..
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// Let's do this!
function main() {
    // dropdown menu for selecting a week
	var dropdownWeek = jQ('#selectorControl_ddlWeek');
	// option element of the current selected week
	var selectedWeek = dropdownWeek.children('option[selected]');
	// value associated with the previous week
	var previousWeekValue = selectedWeek.prev().val();
	// value associated with the next week
	var nextWeekValue = selectedWeek.next().val();

	// Previous button command
	var prev = function(e)
	{
		e.preventDefault();
		dropdownWeek.val(previousWeekValue).change();
	};
	
	// Next button command
	var	next =  function(e)
	{
		e.preventDefault();
		dropdownWeek.val(nextWeekValue).change();
	};	
	
	// Copy button command
	var copy = function(e)
	{
		e.preventDefault();
		
		var sheetData = $('tr.uren-row[data-section-id]').map(function(i, row) 
		{ 
			// Grab all hour rows and map to a { id, cells[] } structure
			return { 
				id : $(row).attr('id'), 
				
				cells : $(row).children('td[data-dayofweek]').map(function(j, cell) 
				{ 
					// grab all cells and map to a { day, hours } structure
					return { 
						day : $(cell).attr('data-dayofweek'), 
						hours : $(cell).children('input').val() 
					};
				}).toArray() 
			}; 
		}).toArray();
		
		// persist data as JSON in local storage
		var sheetDataJson = JSON.stringify(sheetData);
		localStorage.setItem('sheetData', sheetDataJson);
	};
	
	// Paste button command
	var paste = function(e)
	{
		e.preventDefault();
		
		// retrieve data as JSON from local storage
		var sheetData = JSON.parse(localStorage.getItem('sheetData'));
		
		// for each row..
		$(sheetData).each(function(i, row) 
		{ 
			// for each cell..
			$(row.cells).each(function(j, cell) 
			{ 
				if(row.id)
				{
					// set the value of the cell
					$("#"+row.id).children("td[data-dayofweek=" + cell.day + "]").children("input").val(cell.hours).change();
				}
			});
		});
	};
	
	// Setup the buttons
	jQ('<input type="button" class="command-button" value="Previous" style="width:108px" />').insertBefore(dropdownWeek).click(prev);
	jQ('<input type="button" class="command-button" value="Paste" style="width:108px" />').insertAfter(dropdownWeek).click(paste);
	jQ('<input type="button" class="command-button" value="Copy" style="width:108px" />').insertAfter(dropdownWeek).click(copy);	
	jQ('<input type="button" class="command-button" value="Next" style="width:108px" />').insertAfter(dropdownWeek).click(next);		
}

addJQuery(main);
