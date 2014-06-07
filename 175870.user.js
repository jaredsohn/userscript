// ==UserScript==
// @name        PPM Plus Hockey
// @namespace   http://www.spacebound.lv
// @description PPM Hockey tool
// @include     http://hockey.powerplaymanager.com/*
// @require 	http://code.jquery.com/jquery-1.9.1.min.js
// @version     0.6
// @grant       none
// ==/UserScript==

// define variable siteurl - gets the link of page user is visiting, needed for launching seperate function for each page

var siteurl = window.location.href;

// the main constructor for player

function player(goalie, defense, offensive, shooting, passing, technique, aggressive) {
	"use strict";

	this.goalie = parseInt(goalie);
	this.defense = parseInt(defense);
	this.offensive = parseInt(offensive);
	this.shooting = parseInt(shooting);
	this.passing = parseInt(passing);
	this.technique = parseInt(technique);
	this.aggressive = parseInt(aggressive);
	this.position = position(this.goalie, this.defense, this.offensive, this.shooting, this.passing, this.technique, this.aggressive);
	this.ability = ability(this.position, this.goalie, this.defense, this.offensive, this.shooting, this.passing, this.technique, this.aggressive);
	this.total_ability = total_ability;
	this.comparison = comparison;

	function position(gol, def, off, sho, pas, teh, agr) {
		var position = "Unknown";
		if (gol > def && gol > off) {
			position = "Goalkeeper";
		} else if (def > off) {
			position = "Defender";
		} else if (pas > agr || pas == agr) {
			position = "Center";
		} else if (agr > pas) {
			position = "Winger";
		}

		return position;
	} // end of position

	function ability(position, gol, def, off, sho, pas, teh, agr) {
		
		var ability;

		// this is where all math happen for ability, if you want to change ratios, it's done here!

		switch(position) {
        case "Goalkeeper":
            ability = Math.min(gol, pas * 2, teh * 2);
            break;
        case "Defender":
            ability = Math.min(def, pas * 2, agr * 2);
            break;
        case "Center":
            ability = Math.min(off, pas * 2, teh * 2);
            break;
        case "Winger":
            ability = Math.min(off, teh * 2, agr * 2);
            break;
        default:
            ability= "N/A";
            break;
    	}     
    	return ability;     
	} // end of ability
	
	function total_ability(ability, experience) {
		return Math.round(ability * (1 + experience/500));
	} // end of total ability

	function comparison() {
		// delcare variables for ability comparison
		var position_rating;
		var compared_rating;
		var stars;
		//var status;
		
    	switch(this.position) {
            case "Goalkeeper":
                position_rating = 1000;
                break;
            default:
                position_rating = 750;
                break;
        }
        
        compared_rating = (this.ability / position_rating).toFixed(2);
        
       // define variables for stars images
        var empty_star = '<img src="http://i40.tinypic.com/28ane61.jpg" />';
        var silver_half_star = '<img src="http://i41.tinypic.com/2nqfsc4.jpg" />';
        var silver_full_star = '<img src="http://i43.tinypic.com/2yukgie.jpg" />';
        var gold_half_star = '<img src="http://i42.tinypic.com/nn7eo8.jpg" />';
        var gold_full_star = '<img src="http://i39.tinypic.com/xm5uo1.jpg" />';

        if (compared_rating >= 1) {
            stars = gold_full_star + gold_full_star + gold_full_star + gold_full_star + gold_full_star;
        } else if (compared_rating >= 0.95) {
            stars = gold_full_star + gold_full_star + gold_full_star + gold_full_star + gold_half_star;
        } else if (compared_rating >= 0.90) {
            stars = gold_full_star + gold_full_star + gold_full_star + gold_full_star + empty_star;
        } else if (compared_rating >= 0.85) {
            stars = gold_full_star + gold_full_star + gold_full_star + gold_half_star + empty_star;
        } else if (compared_rating >= 0.80) {
            stars = gold_full_star + gold_full_star + gold_full_star + empty_star + empty_star;
        } else if (compared_rating >= 0.75) {
            stars = gold_full_star + gold_full_star + gold_half_star + empty_star + empty_star;
        } else if (compared_rating >= 0.70) {
            stars = gold_full_star + gold_full_star + empty_star + empty_star + empty_star;
        } else if (compared_rating >= 0.65) {
            stars = gold_full_star + gold_half_star + empty_star + empty_star + empty_star;
        } else if (compared_rating >= 0.60) {
            stars = gold_full_star + empty_star + empty_star + empty_star + empty_star;
        } else if (compared_rating >= 0.55) {
            stars = gold_half_star + empty_star + empty_star + empty_star + empty_star;
        } else if (compared_rating >= 0.50) {
            stars = silver_full_star + silver_full_star + silver_full_star + silver_full_star + silver_full_star;
        } else if (compared_rating >= 0.45) {
            stars = silver_full_star + silver_full_star + silver_full_star + silver_full_star + silver_half_star;
        } else if (compared_rating >= 0.40) {
            stars = silver_full_star + silver_full_star + silver_full_star + silver_full_star + empty_star;
        } else if (compared_rating >= 0.35) {
            stars = silver_full_star + silver_full_star + silver_full_star + silver_half_star + empty_star;
        } else if (compared_rating >= 0.30) {
            stars = silver_full_star + silver_full_star + silver_full_star + empty_star + empty_star;
        } else if (compared_rating >= 0.25) {
            stars = silver_full_star + silver_full_star + silver_half_star + empty_star + empty_star;
        } else if (compared_rating >= 0.20) {
            stars = silver_full_star + silver_full_star + empty_star + empty_star + empty_star;
        } else if (compared_rating >= 0.15) {
            stars = silver_full_star + silver_half_star + empty_star + empty_star + empty_star;
        } else if (compared_rating >= 0.10) {
            stars = silver_full_star + empty_star + empty_star + empty_star + empty_star;
        } else if (compared_rating >= 0.05) {
            stars = silver_half_star + empty_star + empty_star + empty_star + empty_star;
        } else {
            stars = empty_star + empty_star + empty_star + empty_star + empty_star;
        }
        return stars;
	} // end of comparison()

} // end of player


function f_player_overview() {
    "use strict";

    // define variables for table extensions
    var firstRow;
    var secondRow;
    var thirdRow;
    var forthRow;
    var position_row;
    var ability_row;
    var total_ability_row;
    var comparison_row;
    var table = document.getElementById("table-1");
    var a_skills = [];
    var players = [];

    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        firstRow=document.getElementById("table-1").rows[i];
        secondRow=document.getElementById("table-1").rows[i];
        thirdRow=document.getElementById("table-1").rows[i];
        forthRow=document.getElementById("table-1").rows[i];
        position_row=thirdRow.insertCell(-1);
        ability_row=firstRow.insertCell(-1);
        total_ability_row=secondRow.insertCell(-1);
        comparison_row=forthRow.insertCell(-1);
        
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
            if (i === 0) {
                null;
            }
            else {
                a_skills.push(col.innerHTML);
            }
        }
        if (i === 0) {
            position_row.innerHTML="Position";
            ability_row.innerHTML="Ability";
            total_ability_row.innerHTML="Total";
            comparison_row.innerHTML="Comparison";
        } else {
            players[i] = new player(a_skills[6], a_skills[7], a_skills[8], a_skills[9], a_skills[10], a_skills[11], a_skills[12]);
            position_row.innerHTML=players[i].position;
            ability_row.innerHTML=players[i].ability;
            total_ability_row.innerHTML=players[i].total_ability(players[i].ability, a_skills[13]);
            comparison_row.innerHTML=players[i].comparison();
            a_skills.length = 0;
            //a_ability.push(ability);
            
        }  
    }
} // end of f_player_overview()

function f_player_market() {
    "use strict";

    // define variables for table extensions
    var firstRow;
    var secondRow;
    var thirdRow;
    var forthRow;
    var position_row;
    var ability_row;
    var total_ability_row;
    var comparison_row;
    var table = document.getElementById("table-1");
    var a_skills = [];
    var players = [];

    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        firstRow=document.getElementById("table-1").rows[i];
        secondRow=document.getElementById("table-1").rows[i];
        thirdRow=document.getElementById("table-1").rows[i];
        forthRow=document.getElementById("table-1").rows[i];
        position_row=thirdRow.insertCell(-1);
        ability_row=firstRow.insertCell(-1);
        total_ability_row=secondRow.insertCell(-1);
        comparison_row=forthRow.insertCell(-1);
        
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
            if (i === 0) {
                null;
            }
            else {
                a_skills.push(col.innerHTML);
            }
        }
        if (i === 0) {
            position_row.innerHTML="Position";
            ability_row.innerHTML="Ability";
            total_ability_row.innerHTML="Total";
            comparison_row.innerHTML="Comparison";
        } else {
            players[i] = new player(a_skills[5], a_skills[6], a_skills[7], a_skills[8], a_skills[9], a_skills[10], a_skills[11]);
            position_row.innerHTML=players[i].position;
            ability_row.innerHTML=players[i].ability;
            total_ability_row.innerHTML=players[i].total_ability(players[i].ability, a_skills[12]);
            comparison_row.innerHTML=players[i].comparison();
            a_skills.length = 0;
            //a_ability.push(ability);
            
        }  
    }
} // end of f_player_market()

function f_player_info() {
	// parse data player data
    var age = parseFloat($("#age").html());
    var goalie = parseFloat($("#goalie").html());
    var defense = parseFloat($("#defense").html());
    var attack = parseFloat($("#attack").html());
    var shooting = parseFloat($("#shooting").html());
    var passing = parseFloat($("#passing").html());
    var technique = parseFloat($("#technique_attribute").html());
    var aggressive = parseFloat($("#aggressive").html());
    var experience = parseFloat($("#experience").html());
    var quality_goalie = parseFloat($("#kva_goalie").html());
    var quality_defense = parseFloat($("#kva_defense").html());
    var quality_attack = parseFloat($("#kva_attack").html());
    var quality_shooting = parseFloat($("#kva_shooting").html());
    var quality_passing = parseFloat($("#kva_passing").html());
    var quality_technique = parseFloat($("#technique_quality").html());
    var quality_aggressive = parseFloat($("#kva_aggressive").html());

    player_info = new player(goalie, defense,attack, shooting, passing, technique, aggressive);
    $('.profile_player_left').append(
            '<div class="gray_box_profile">Position: <b>'
            + player_info.position
            + '</b><br />Current Ability: <b>'
            + player_info.ability 
            + '</b><br / >Total Ability: <b>'
            + player_info.total_ability(player_info.ability, experience)
            + '</b><br />'
            + player_info.comparison()
            + '<br />'
            + ' '//f_potential(ability, age, position, quality_goalie, quality_defense, quality_attack, quality_shooting, quality_passing, quality_technique, quality_aggressive)
            + '</div>'
        ) 

} // end of player_info()
if (siteurl.match(/speletajs/i))
{
	f_player_info();
} else if (siteurl.match(/parskats/i))
{
    f_player_overview();    
} else if (siteurl.match(/tirgus/i)) {
    f_player_market();
}
