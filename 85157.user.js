// ==UserScript==
// @name           Pigskin Empire: College History Totals
// @namespace      Tyante
// @description    Adds the college team's totals to their history page.
// @include        http://beta.pigskinempire.com/team.asp?id=*&v=H*
// @copyright      2010, Tyante
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.01.10
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var table = document.getElementsByTagName("table")[3];
	var total_rows = table.rows.length;

	var total_wins = 0;
	var total_losses = 0;
	var total_games;
	var playoffs = 0;
	var c_titles = 0;
	var n_titles = 0;

	var total_points = 0;
	var total_points_against = 0;
	var total_p_yds = 0;
	var total_p_yds_against = 0;
	var total_r_yds = 0;
	var total_r_yds_against = 0;

	var record_array = new Array();
	var wins;
	var losses;
	var games;
	var yards;

	for (var i=1; i < total_rows; i++) {

// Store the team's complete record.
		var record = table.rows[i].cells[2].innerHTML;
		record_array = record.split("-");
		wins = parseInt(record_array[0]);
		total_wins += wins;
		losses = parseInt(record_array[1]);
		total_losses += losses;
		games = wins + losses;

// Count the team's playoff appearnces.
		var p_check = table.rows[i].cells[4].innerHTML;
		var check = p_check.indexOf("<img");
		if ( check > 0 ) {
			playoffs += 1;
		}

// Count the team's conference titles.
		var c_check = table.rows[i].cells[5].innerHTML;
		check = c_check.indexOf("<img");
		if ( check > 0 ) {
			c_titles += 1;
		}

// Count the team's national titles.
		var n_check = table.rows[i].cells[6].innerHTML;
		check = n_check.indexOf("<img");
		if ( check > 0 ) {
			n_titles += 1;
		}
// Calculate the team's season points.
		var a_points = table.rows[i].cells[7].innerHTML;
		total_points += parseInt( (a_points * games) + 0.5 );

// Calculate the team's season points against.
		a_points = table.rows[i].cells[8].innerHTML;
		total_points_against += parseInt( (a_points * games) + 0.5 );

// Calculate the team's passing yards.
		var a_yards = table.rows[i].cells[9].innerHTML;
		total_p_yds += parseInt( (a_yards * games) + 0.5 );

// Calculate the team's passing yards against.
		a_yards = table.rows[i].cells[10].innerHTML;
		total_p_yds_against += parseInt( (a_yards * games) + 0.5 );

// Calculate the team's rushing yards.
		a_yards = table.rows[i].cells[11].innerHTML;
		total_r_yds += parseInt( (a_yards * games) + 0.5 );

// Calculate the team's rushing yards against.
		a_yards = table.rows[i].cells[12].innerHTML;
		total_r_yds_against += parseInt( (a_yards * games) + 0.5 );
	}

	total_games = total_wins + total_losses;

// Add table row and cells.
	var new_row = table.insertRow(total_rows);
	new_row.setAttribute("bgcolor","#c0c0c0");
	var new_cell = new_row.insertCell(0);
	new_cell.innerHTML = "Total";


	new_cell = new_row.insertCell(1);
	new_cell.innterHTML = "&nbsp;"

	new_cell = new_row.insertCell(2);
	new_cell.innerHTML = total_wins + "-" + total_losses;

	new_cell = new_row.insertCell(3);
	new_cell.innterHTML = "&nbsp;"

	new_cell = new_row.insertCell(4);
	new_cell.innerHTML = playoffs;

	new_cell = new_row.insertCell(5);
	new_cell.innerHTML = c_titles;

	new_cell = new_row.insertCell(6);
	new_cell.innerHTML = n_titles;

	new_cell = new_row.insertCell(7);
	var avg_points = total_points / total_games;
	new_cell.innerHTML = avg_points.toFixed(2);

	new_cell = new_row.insertCell(8);
	avg_points = total_points_against / total_games;
	new_cell.innerHTML = avg_points.toFixed(2);

	new_cell = new_row.insertCell(9);
	var avg_yards = total_p_yds / total_games;
	new_cell.innerHTML = avg_yards.toFixed(2);

	new_cell = new_row.insertCell(10);
	avg_yards = total_p_yds_against / total_games;
	new_cell.innerHTML = avg_yards.toFixed(2);

	new_cell = new_row.insertCell(11);
	avg_yards = total_r_yds / total_games;
	new_cell.innerHTML = avg_yards.toFixed(2);

	new_cell = new_row.insertCell(12);
	avg_yards = total_r_yds_against / total_games;
	new_cell.innerHTML = avg_yards.toFixed(2);
}
