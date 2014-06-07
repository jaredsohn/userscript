// ==UserScript==
// @name         BD Adoptions Filter
// @description  Adds a filtering dialog box to the toy adoptions page
// @namespace    http://userscripts.org/users/flynn
// @updateURL    https://userscripts.org/scripts/source/137778.meta.js
// @downloadURL  https://userscripts.org/scripts/source/137778.user.js
// @include      *bad-dragon.com/inventorytoys/showlist/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version      1.1.4
// @grant        none
// ==/UserScript==

(function() {

	var styles = "#filterBox {padding: 1em;background-color: #333;border: 4px solid #555;margin-bottom: 2em;}#filterBox .title {margin-bottom: 1em;font-weight: bold;}#filterBox a {display: block;margin-left: auto;margin-right: auto;width: 108px;}#filterContent {display: none;}#filters .title {}#filters .filterGroup {-moz-column-count: 5;margin-bottom: 1.5em;}#filterStatus {margin-top: 1.5em;text-align: center;}#filterOpts {margin-top: 1.5em;text-align: center;}#filterBox .checked {font-weight: bold;color: #FF4646;}";

	var toyBox = $("#inventorylist");
	var filterBox = $("<div id='filterBox'><a href='javascript:;'>Enable toy filter</a><div id='filterContent'><div id='filters'></div><div id='filterOpts'></div></div><div id='filterStatus'></div></div>");
	var filterLink = filterBox.find("a");

	var toys = $("tbody tr", toyBox);
	var toyList = $("tbody", toyBox);

	var filterGroups = [
		{
			name: "Size",
			column: 1,
			options: { },
			element: null,
		},
		{
			name: "Name",
			column: 2,
			options: { },
			element: null,
		},
		{
			name: "Firmness",
			column: 6,
			options: { },
			element: null,
		},
		{
			name: "Cum Tube",
			column: 7,
			options: { },
			element: null,
		},
		{
			name: "Suction Cup",
			column: 8,
			options: { },
			element: null,
		},	
	];


	$("head").append("<style type='text/css'>" + styles + "</style>");

	filterBox.find("#filterOpts").append("<a href='javascript:;'>Reset filter</a>").click(function() {
		filterBox.find("input[type=checkbox]").attr("checked", false);
		filterBox.find("div").removeClass("checked");
		updateFilter();
	});

	updateStatus();

	// hide/show link
	filterLink.click(function() { 
		$("#filterContent").toggle(250, function() {
			var f = $(this);
			
			if (f.is(":visible"))
			{
				filterLink.text("Disable toy filter");
			}
			else
			{
				filterLink.text("Enable toy filter");
				filterBox.find("input[type=checkbox]").attr("checked", false);
				filterBox.find("div").removeClass("checked");
				updateFilter();
			}
			
			updateStatus();
		});
	});


	// combine possible options for each filter group
	toys.each(function() {
		var e = $(this);
		
		$.each(filterGroups, function(index, item) {
			var value = $.trim(e.find("td").eq(item.column).text());
			item.options[value] = value;
		});
	});


	// add each filter group to the filter box
	$.each(filterGroups, function(index, group) {
		var box = filterBox.find("#filters");
		var groupBox = $("<div class='filterGroup' name='" + group.name + "'></div>");
		
		group.element = groupBox;
		
		var keys = [];
		
		$.each(group.options, function(index, group) {
			keys.push(index);
		});
		
		keys.sort();
		
		$.each(keys, function(index, filter) {
			var id = "b_" + filter + "_" + group.column;
			var text = filter.length > 0 ? filter : "(none)";
			
			var option = $("<div><input type='checkbox' id='" + id + "' col='" + group.column + "' pattern='" + filter + "' /> <label for='" + id + "'>" + text + "</label></div>");
			
			option.find("input").bind("change", function() {
				$(this).parent().toggleClass("checked");
				updateFilter();
			});
			
			groupBox.append(option);
		});
		
		box.append("<h3>" + group.name + "</h3>");
		box.append(groupBox);
	});


	// add filter box to page
	toyBox.prepend(filterBox);


	// updates the "x of y toys" 
	function updateStatus()
	{
		filterBox.find("#filterStatus").text("Showing " + toys.filter(":visible").length + " of " + toys.length + " toys");
	}


	// updates the filtered list of toys
	function updateFilter()
	{
		var activeCount = filterBox.find("input[type=checkbox]").filter(":checked").length;

		if (activeCount == 0)
		{
			toys.show();
			updateStatus();
			return;
		}
		
		toys.show();

		
		toys.each(function(index, toy) {
				toy = $(toy);
		
			$.each(filterGroups, function(index, group) {
				var active = group.element.find("input[type=checkbox]").filter(":checked");
				
				if (active.length == 0) {
					return;
				}
			
				var inFilter = false;
				
				active.each(function(index, filter) {
					filter = $(filter);
				
					var col = filter.attr("col");
					var pattern = filter.attr("pattern");
					
					if (toy.find("td").eq(col).text() == pattern)
					{
						inFilter = true;
						return false;
					}
				});
				
				if (!inFilter) {
					toy.hide();
				}
			});
		});
		
		updateStatus();
	}

})();