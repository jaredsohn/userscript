// ==UserScript==
// @name           Planets.nu - Sort Scoreboard
// @description    Allow sorting of the Scoreboard
// @include        http://planets.nu/home
// @include        http://play.planets.nu/*
// @include        http://planets.nu/*
// @include        http://planets.nu/games/*
// @include	   http://test.planets.nu/*
// @version 0.3

// ==/UserScript==
// 0.1 - Initial version: Enable sorting and add Slot number
// 0.2 - Change default sort column to planet count, not Race name
// 0.3 - Add small enhancement to Planets table: Mark planets building SB next turn with an "O"

function wrapper () { // wrapper for injection
  	
    /* Overload the default showPlanets method to show
     * a "O" where a Starbase will be build next turn
     */
    /***** BEGIN Unchanged code *****/
    vgapDashboard.prototype.showPlanets = function(g) {
        vgap.playSound("button");
        vgap.closeSecond();
        this.content.empty();
        var c = "";
        if (!g) {
            g = 0
        }
        var b = $("<ul class='FilterMenu'></ul>").appendTo(this.content);
        $("<li " + (g == 0 ? "class='SelectedFilter'" : "") + ">Colony View</li>").tclick(function() {
            vgap.dash.showPlanets(0)
        }).appendTo(b);
        $("<li " + (g == 1 ? "class='SelectedFilter'" : "") + ">Resource View</li>").tclick(function() {
            vgap.dash.showPlanets(1)
        }).appendTo(b);
        c = "<div class='DashPane' style='height:" + ($("#DashboardContent").height() - 70) + "px;'>";
        c += "<table id='PlanetTable' align='left' class='CleanTable' border='0' width='100%' style='cursor:pointer;'><thead>";
        c += "<th></th><th align='left'>Id</th><th align='left'>Name</th>";
        if (g == 1) {
            c += "<th title='Megacredits' align='left'>MC</th><th title='Supplies' align='left'>S</th><th title='Neutronium' align='left'>N</th><th title='Duranium' align='left'>D</th><th title='Tritanium' align='left'>T</th><th title='Molybdenum' align='left'>M</th><th title='Ground Neutronium (unmined)' align='left'>GN</th><th title='Ground Duranium (unmined)' align='left'>GD</th><th title='Ground Tritanium (unmined)' align='left'>GT</th><th title='Ground Molybdenum (unmined)' align='left'>GM</th><th title='Neutronium Density' align='left'>DN</th><th title='Duranium Density' align='left'>DD</th><th title='Tritanium Density' align='left'>DT</th><th title='Molybdenum Density' align='left'>DM</th>"
        }
        if (g == 0) {
            c += "<th title='Starbase' align='left'>SB</th><th align='left'>FC</th><th title='Temperature' align='left'>T</th><th title='Colonists' align='left'>Cols</th><th title='Colonist Tax Rate' align='left'>Tx</th><th title='Colonist Happiness' align='left'>Hp</th><th title='Colonist Happiness Change' align='left'>+/-</th><th title='Natives' align='left'>Natives</th><th title='Native Government' align='left'>Gov</th><th title='Native Population' align='left'>Pop</th><th title='Native Tax Rate' align='left'>Tx</th><th title='Native Happiness' align='left'>Hp</th><th title='Native Happiness Change' align='left'>+/-</th><th title='Ready Checkbox Status' align='left'>R</th>"
        }
        c += "</thead><tbody id='PlanetRows'></tbody></table></div>";
        this.pane = $(c).appendTo(this.content);
        for (var d = 0; d < vgap.myplanets.length; d++) {
            var e = vgap.myplanets[d];
            /***** END Unchanged code *****/
            var a = vgap.getStarbase(e.id) != null ? "X" : ( e.buildingstarbase ? "O" : "");
            // Original code:
            // var a = vgap.getStarbase(e.id) != null ? "X" : "";
            /***** BEGIN Unchanged code *****/
            c = "<tr class='RowSelect'><td><img class='TinyIcon' src='" + e.img + "'/></td><td>" + e.id + "</td><td>" + e.name + "</td>";
            if (g == 1) {
                c += "<td>" + e.megacredits + "</td><td>" + e.supplies + "</td><td>" + e.neutronium + "</td><td>" + e.duranium + "</td><td>" + e.tritanium + "</td><td>" + e.molybdenum + "</td><td>" + e.groundneutronium + "</td><td>" + e.groundduranium + "</td><td>" + e.groundtritanium + "</td><td>" + e.groundmolybdenum + "</td><td>" + e.densityneutronium + "</td><td>" + e.densityduranium + "</td><td>" + e.densitytritanium + "</td><td>" + e.densitymolybdenum + "</td></tr>"
            }
            if (g == 0) {
                c += "<td>" + a + "</td><td>" + e.friendlycode + "</td><td>" + e.temp + "</td><td>" + e.clans * 100 + "</td><td>" + e.colonisttaxrate + "</td><td>" + e.colonisthappypoints + "</td><td" + (e.colhappychange < 0 ? " class='WarnText' " : "") + ">" + e.colhappychange + "</td>";
                if (e.nativeclans > 0) {
                    c += "<td>" + e.nativeracename + "</td><td>" + e.nativegovernmentname + "</td><td>" + e.nativeclans * 100 + "</td><td>" + e.nativetaxrate + "</td><td>" + e.nativehappypoints + "</td><td" + (e.nativehappychange < 0 ? " class='WarnText' " : "") + ">" + e.nativehappychange + "</td>"
                } else {
                    c += "<td></td><td></td><td></td><td></td><td></td><td></td>"
                }
                c += "<td>" + (e.readystatus > 0 ? (e.readystatus == 1 ? "-" : "+") : "") + "</td></tr>"
            }
            var f = function(h) {
                return function() {
                    vgap.map.selectPlanet(h)
                }
            };
            $(c).click(f(e.id)).appendTo("#PlanetRows")
        }
        $("#PlanetTable").tablesorter();
        this.pane.jScrollPane();
        vgap.CurrentView = "showPlanets";
        vgap.showPlanetsViewed = 1
    }
  	/***** END Unchanged code *****/
  	
  	/* add custom data parser to overcome the issue of wrong text sorting
  	 * The normal text parser sorts e.g. 137 as lower than 95. And we can't
  	 * simply use numeric sorting because we want to see the diffs compared
  	 * to the turn before: 136 (+4)
  	 * which makes the table entry a String
  	 */
    $.tablesorter.addParser({
    	// set a unique id
    	id: 'data',
    	is: function(s) {
      		// return false so this parser is not auto detected
      		return false;
    	},
    	format: function(s, table, cell, cellIndex) {
      		var $cell = $(cell);

      		// return column specific data value
        	return parseInt($cell.attr('data-value'),10) || 0;
    	},
    	// set type to numeric
    	type: 'numeric'
  	});
    
    // Overload the default showScores method
    vgapDashboard.prototype.showScores = function (view) {
        vgap.playSound("button");
        vgap.closeSecond();
        this.content.empty();
        /* tbl_hd is the head row of the default Scoreboard
         * we add an additional column for the slot number here
         * can be used to figure out gs freindly code
         */
        var tbl_hd = "<table id='ScoreTable' width='100%' class='CleanTable' style='cursor:pointer;'><thead>";
        tbl_hd += "<tr><th title='Use for gs Friendly code'>Slot#</th><th>Race (player)</th><th>Planets</th><th>Starbases</th><th>War Ships</th><th>Freighters</th><th>Military</th><th>Score</th><th>Priority Points</th></tr></thead>";
        
        var sum_planets		= 0;
        var sum_sb				= 0;
        var sum_warships	= 0;
        var sum_freight 	= 0;
        
        // per player content rows
        var main_tbl = "<tbody>";
        for (var i = 0; i < vgap.scores.length; i++) {
            var scores = vgap.scores[i];
            var slot = "";
            sum_planets		+= scores.planets;
            sum_sb 				+= scores.starbases;
            sum_warships	+= scores.capitalships;
            sum_freight 	+= scores.freighters;
            main_tbl += "<tr>";
            if (scores.ownerid >= 10) {
            	slot = String.fromCharCode(scores.ownerid  + 55);
            } else {
            	slot = scores.ownerid + '';
            }
            main_tbl += "<td data-value='" + scores.ownerid + "'>" + slot + "</td>";
            if (vgap.game.gametype == 5 && vgap.game.turn <= 1 && scores.ownerid != vgap.player.id) {
                main_tbl += "<td>Unknown</td>";
            } else {
                main_tbl += "<td>" + vgap.raceName(scores.ownerid) + "</td>";
            }
            main_tbl += "<td data-value='" + scores.planets + "'>" + scores.planets + this.scoreChange(scores.planetchange) + "</td>";
            main_tbl += "<td data-value='" + scores.starbases + "'>" + scores.starbases + this.scoreChange(scores.starbasechange) + "</td>";
            main_tbl += "<td data-value='" + scores.capitalships + "'>" + scores.capitalships + this.scoreChange(scores.shipchange) + "</td>";
            main_tbl += "<td data-value='" + scores.freighters + "'>" + scores.freighters + this.scoreChange(scores.freighterchange) + "</td>";
            main_tbl += "<td data-value='" + scores.militaryscore + "'>" + scores.militaryscore + this.scoreChange(scores.militarychange) + "</td>";
            main_tbl += "<td data-value='" + scores.inventoryscore + "'>" + scores.inventoryscore + this.scoreChange(scores.inventorychange) + "</td>";
            main_tbl += "<td data-value='" + scores.prioritypoints + "'>" + scores.prioritypoints + this.scoreChange(scores.prioritypointchange) + "</td>";
            main_tbl += "</tr>";
        }
        // Add footer with sums
        tbl_hd += "<tfoot><tr><th></th><th>Totals:</th><th>" + sum_planets + "</th><th>" + sum_sb + "</th><th>" + sum_warships + "</th><th>" + sum_freight + "</th></tr></tfoot>";
        
        // Write out the whole pane now
        var a = "<div class='DashPane'><div id='MessageInbox'>";
        a += "<table id='TotalScoreTable' width='40%' class='CleanTable' style='cursor:pointer;'><tbody>";
        // I think it is helpful to see the Totals as a summary at the beginning
        a += "<tr><td>Total Ships:</td><td>" + (sum_warships + sum_freight) + "</td><td>Total Planets:</td><td>" + sum_planets + "</td></tr>";
        a += "</tbody></table>";
        a += tbl_hd + main_tbl + "</tbody></table>";
        a += "<br/>Win Condition: <a href='http://planets.nu/documentation/win-conditions' target='_blank'>";
        if (vgap.game.wincondition == 3) {
            a += "Military Score";
        } else {
            if (vgap.game.wincondition == 1) {
                a += "Diplomatic Planets";
            }
        }
        a += "</a><br/>";
        $("#DashboardLeft").hide();
        if (!vgap.ie8 && !vgap.ie7) {
            this.content.width($("#PlanetsDashboard").width() - 44);
        }
        this.pane = $(a).appendTo(this.content);
        $("<a class='MoreBack'>Back</a>").tclick(function() {
            vgap.dash.closeScoreboard();
            return false;
        }).appendTo(this.pane);
        
        vgap.CurrentView = "showScores";
        vgap.showScoreViewed = 1;
        // Add the tablesorter
        $("#ScoreTable").tablesorter({
            sortInitialOrder: 'desc',
            sortList: [[2,1]],
        	headers: {
      			0 : { sorter: 'data' },
      			2 : { sorter: 'data' },
      			3 : { sorter: 'data' },
      			4 : { sorter: 'data' },
      			5 : { sorter: 'data' },
      			6 : { sorter: 'data' },
      			7 : { sorter: 'data' },
      			8 : { sorter: 'data' }
    		}});
        this.pane.jScrollPane();    
    };
    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);