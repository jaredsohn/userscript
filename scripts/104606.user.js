// ==UserScript==
// @name           MyFitnessPal Percentages
// @version 1.0.4
// @namespace      http://userscripts.org/users/345453
// @description    Adds display of Carb/Protein/Fat percentages to any daily food diary page. Also adds "Real Calories" calcalation based off 4/4/9 algorithm.
// @include        http://www.myfitnesspal.com/food/diary/*
// ==/UserScript==

/* side note - 50/30/20 Carbs/Protein/Fat is a good ratio for fat loss */

if (window.top !== window.self) {
	return; /* do not run in frames */
}

if (typeof unsafeWindow != 'undefined')
{
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = my_src;
    document.body.appendChild(script);
  })();

  return;
}

function startRun() {
  var script = document.createElement("script");
  script.setAttribute("src", "http://www.google.com/jsapi");
  script.addEventListener('load', function() {
      loadscripts_1();
  }, false);
  document.body.appendChild(script);
}

function main()
{
	var calories_i = 0;
	var carbs_i = 0;
	var protein_i = 0;
	var fat_i = 0;

        var daily_total_carbs = 0;
        var daily_total_protein = 0;
        var daily_total_fat = 0;

	var header_tr_element = jQuery('.container tr.meal_header:first');
	var elem_i = 0;
	header_tr_element.find('td').each(function()
	{
		var myval = jQuery(this).text().toLowerCase();
		if (myval == 'calories') { calories_i = elem_i; }
		if (myval == 'carbs') { carbs_i = elem_i; }
		if (myval == 'fat') { fat_i = elem_i; }
		if (myval == 'protein') { protein_i = elem_i; }
		
		elem_i += 1;
	});

	var bottom_tr_elements = jQuery('.container tr.bottom, .container tr.total');
	bottom_tr_elements.each(function(){
	
		if ( jQuery(this).hasClass('remaining') ) {
			return false; /* continue */
		}
		
		var cals = 0;
		var real_cals = 0;
		var carbs = 0;
		var protein = 0;
		var fat = 0;

		var tds = jQuery(this).find('td');
		var cals = tds.eq(calories_i).text();
		var carbs = tds.eq(carbs_i).text();
		var protein = tds.eq(protein_i).text();
		var fat = tds.eq(fat_i).text();
		
		cals = parseInt(cals);
		carbs = parseInt(carbs);
		protein = parseInt(protein);
		fat = parseInt(fat);
		
		/* do nothing if cannot calculate for the row */
		if (isNaN(cals) || isNaN(carbs) || isNaN(protein) || isNaN(fat) || cals == 0) { return true; }
		
		var carb_cals = (carbs * 4); 
		var protein_cals = (protein * 4);
		var fat_cals = (fat * 9);

		if (jQuery(this).hasClass('total') && daily_total_carbs == 0)
		{
		  daily_total_carbs = carb_cals;
		  daily_total_protein = protein_cals;
		  daily_total_fat = fat_cals;
		}
		
		real_cals = carb_cals + protein_cals + fat_cals;
			
		var carb_pct = (carb_cals / real_cals).toFixed(2) * 100;
		var fat_pct = (fat_cals / real_cals).toFixed(2) * 100;
		var protein_pct = (protein_cals / real_cals).toFixed(2) * 100;
		
		carb_pct = Math.round(carb_pct);
		fat_pct = Math.round(fat_pct);
		protein_pct = Math.round(protein_pct);
		
		tds.each(function(){ jQuery(this).append('<div class="myfp_us" style="color:#0a0;font-size:9px;text-align:center;">&nbsp;</div>'); });
		
		tds.eq(0).find('div.myfp_us').html("");
		/*tds.eq(calories_i).find('div.myfp_us').html(real_cals);*/
		tds.eq(carbs_i).find('div.myfp_us').html(carb_pct+"%");
		tds.eq(fat_i).find('div.myfp_us').html(fat_pct+"%");
		tds.eq(protein_i).find('div.myfp_us').html(protein_pct+"%");
	});

	jQuery('.container').append('<div id="google_graph_1"></div>');
	
	var data1 = new google.visualization.DataTable();
	data1.addColumn('string', 'Type');
	data1.addColumn('number', 'Cals');
	data1.addRows([
	   ['Carbs', daily_total_carbs],
	   ['Protein', daily_total_protein],
	   ['Fat', daily_total_fat]
	]);

	var chart = new google.visualization.PieChart(document.getElementById('google_graph_1'));
	chart.draw(data1, {width: 400, height: 300, title: 'Daily Totals by Calories'});
}

function loadscripts_1()
{
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	script.addEventListener('load', function() {
		loadscripts_2();
	}, false);
	document.body.appendChild(script);
}

function loadscripts_2()
{
     jQuery.noConflict();

     /* fix for old prototype conflict with google viz api */
     /* retrieves the Array reduce native function using cleverness */
     var ifr = document.createElement('iframe');
     document.body.appendChild(ifr);
     Array.prototype.reduce = ifr.contentWindow.Array.prototype.reduce;
     document.body.removeChild(ifr);

     google.load( "visualization", "1", {packages:["corechart"],"callback":main} );
}

startRun();