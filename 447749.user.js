// ==UserScript==
// @name           Planets.nu - Open Slot Filter Plugin
// @namespace      Planets.nu 
// @description    Adds race filters to the 'Game List' menu which allow to sort the list of new and open games by race. Additionally, for each race the player rank and tenacity is used to prune games for which the player is not eligible. 
// @include        http://planets.nu/*
// @include        http://play.planets.nu/*
// @include        http://test.planets.nu/*
// @updateURL      https://userscripts.org/scripts/source/447749.meta.js
// @downloadURL    http://userscripts.org/scripts/source/447749.user.js
// @author         kedalion
// @version        0.16
// ==/UserScript==

/* -----------------------------------------------------------------------
v0.16
 - fixed rank filters for cross race eligibility
v0.14
 - allows to sort filtered games, added more filters
v0.13
 - race selections can be cleared again. 
v0.1
 - initial alpha release
 ----------------------------------------------------------------------- */

function wrapper() { // wrapper for injection

    var plugin_version = 0.16;
   
    console.log("Open Slot Filter plugin version: v" + plugin_version );

    html["GamesFilter"] = " <div id=\"egames\"> <div id=\"etitlearea\">  <div id=\"emaintitle\"> {{t.publicgames}} - Game Slot Filter Plugin </div> {{t.gamesdescription}} <br> This page is augmented by the <a href=\"http://userscripts.org/scripts/show/447749\">\"Open Slot Filter Plugin\"</a> (<a href=\"http://planets.nu/discussion/utility-script-open-slot-filter-plugin\">Forum Thread</a>). The found open slots can filtered by race and are automatically filtered according to eligibility with respect to rank and to required tenacity. Games are organized in groups: Classic 11 player games, Mentor & Midshipman Games, Team Games, and Giant Melee Games.</div>        <div>     </div>    <ul id=\"etabs\">                <li id=\"echampionships\" data-tab=\"\">            {{t.championships}}        </li>                <li id=\"ejoining\" data-tab=\"/new\">            {{t.newgames}}        </li>                <li id=\"eopen\" data-tab=\"/open\">            {{t.open}}        </li>                <li id=\"eblitz\" data-tab=\"/blitz\">            {{t.blitz}}        </li>                <li id=\"efull\" data-tab=\"/full\">            {{t.full}}        </li>                <li id=\"efinished\" data-tab=\"/finished\">            {{t.finished}}        </li>        </ul> <div id=\"efiltertools\" class=\"etabcontent\" style=\"padding: 15px 0 15px 0;  margin: 0px auto; border-bottom: solid 1px #333; \" > </div><div id=\"etabcontent\" class=\"etabcontent\">    </div> </div>";	
	
    
    html["ExtendedGameList"] = "{{#title}}<div id=\"etitlearea\">  <div id=\"emaintitle\" style=\"font-size: 20px\"> {{title}} - {{count}} Game(s) </div> {{subtitle}} <br>    </div> {{/title}}   <div><div style=\"padding: 0 0 20px 0;text-align:center;\">{{#startblitz}}<div id=\"ecreategamemenu\" style=\"float: right;\">            <a id=\"estartblitz\" title=\"Start a new blitz game.\" style=\"float:right;\">{{t.startblitz}}</a>  </div>{{/startblitz}}{{#hostedby}} {{t.hostedby}} <span style=\"text-transform: capitalize;\">{{hostedby}}</span>.{{/hostedby}}</div><table class=\"estandardgamelist ecleantable\" style=\"width: 100%;\">    <tbody>        <tr>            <th>{{t.name}}</th>            <th>{{t.type}}</th>            <th>{{t.open}}</th>            <th>{{t.schedule}}</th>        </tr>        {{#games}}        <tr class=\"erendergamerow\" data-id=\"{{id}}\">            <td style=\"width:220px;\" class=\"egamedescription\">                {{#imgurl}}                <img src=\"{{imgurl}}\" style=\"width:60px;height:70px;float:left;margin:0 10px 0 0;\" />                {{/imgurl}}                {{^imgurl}}                <div style=\"background-image: url(http://play.planets.nu/img/nuplanets/planetimages30px.png);background-position: -{{picoffset}}px 0px;width:30px;height:30px;float:left;margin:0 10px 0 0;\"></div>                {{/imgurl}}                <a href=\"#/sector/{{id}}/players\">{{name}}</a>                <span>{{statusname}} - {{t.Turn}} {{turn}}</span>                          </td>            <td style=\"width:150px;\" class=\"egamedescription\">                {{shortdescription}}                <span>{{t.minrank}}: {{minlevelname}}</span>                 <span>{{t.maxrank}}: {{maxlevelname}}</span>                 <span>{{t.tenacity}}: {{mintenacity}}</span>             </td>            <td class=\"egamedescription\">                {{openslots}}/{{slots}} {{t.open}}                <span>{{openslotstext}}</span><div class=\"egamedescription\">Difficulty: {{difficulty}} </div>                 </td>            <td style=\"width:150px;\" class=\"egamedescription\">                {{hostdays}}                <span>{{schedule}}</span>            </td>        </tr>        {{/games}}    </tbody></table></div>";
    
    
    
    var openSlotFilterPlugin = 
	{
	   	/**
		 * processload: executed whenever a turn is loaded: either the current turn or
		 * an older turn through time machine 
		 */
		processload: function() {
		},	
		
		/**
		 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
		 */
		loaddashboard: function() {							
		},

		/**
		 * showdashboard: executed when switching from starmap to dashboard
		 */
		showdashboard: function() {
		},
		
		/**
		 * showsummary: executed when returning to the main screen of the dashboard
		 */
		showsummary: function() {
		},
		
		/**
		 * loadmap: executed after the first turn has been loaded to create the map
		 * as far as I can tell not executed again when using time machine
		 */
		loadmap: function() {
		},
		
		/**
		 * showmap: executed when switching from dashboard to starmap
		 */
		showmap: function() {
		},
		
		/**
		 * draw: executed on any click or drag on the starmap
		 */			
		draw: function() {
		},		
		
		/**
		 * loadplanet: executed a planet is selected on dashboard or starmap
		 */
		loadplanet: function() {
		},
		
		/**
		 * loadstarbase: executed a planet is selected on dashboard or starmap
		 */
		loadstarbase: function() {
		},
		
		/**
		 * loadship: executed a planet is selected on dashboard or starmap
		 */
		loadship: function() {
		},

	
        version: plugin_version,
					
		//other variables
		plugin_name: "OpenSlotFilterPlugin",
		enabled: true,
		oldViewGamesShow: null,
		
		minTurnsPerWeek: 0,
		maxTurnsPerWeek: 7,
		turnsPerWeek: [true, true, true, true, true, true, true, true],
		allowFastStart: true,
		
		openSlotsPerRace: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		raceSelection: 0,
		//winCondition: 1,
		filterForOwnRank: true,	
		filterForOwnTenacity: true,
		requireMinTenacity: false,
		
		sortGamesBy: 0,  //0 game turn, 1 id, 2 difficulty, 3 turns per week, 4 min rank
		sortGamesText: ["Game Turn", "Game ID", "Difficulty", "Turns/week", "Req. Rank"],
		sortReverse: false,
		
		
        sortGames: function(g_in) {

            switch (this.sortGamesBy) {
                case 1: g_in.sort(function(a,b) {return a.id - b.id;}); break;
                case 2: g_in.sort(function(a,b) {return a.difficulty - b.difficulty;}); break;                
                case 3: g_in.sort(function(a,b) {return a.turnsperweek - b.turnsperweek;}); break;
                case 4: g_in.sort(function(a,b) {return a.requiredlevelid - b.requiredlevelid;}); break;
                default: g_in.sort(function(a,b) {return a.turn - b.turn;}); break;
            }
            
            if (this.sortReverse) {
                g_in.reverse();
            }
            return g_in;
        },
        
        selectSortMethod: function(m) {
            if (m < 0 || m > 4) {
                return;
            }
            
            if (this.sortGamesBy == m) {
                this.sortReverse = !this.sortReverse;
            } else {
                this.sortGamesBy = m;
                this.sortReverse = false;            
            }
            //console.log("Sort games: " + this.sortGamesBy + " reversed: " + this.sortReverse + ".");
        }
        
        
    };
    
    vgap.registerPlugin(openSlotFilterPlugin, "openSlotFilterPlugin");
		
	
	vgap.plugins["openSlotFilterPlugin"].oldViewGamesShow = ViewGames.prototype.show;
	

    ViewGames.prototype.show = function () {

        if (!vgap.plugins["openSlotFilterPlugin"].enabled) {
            console.log("Plugin not enabled: execute original game listing code!");
            vgap.plugins["openSlotFilterPlugin"].oldViewGamesShow.apply(this,arguments);
            return;
        }
        
        var plugin = vgap.plugins["openSlotFilterPlugin"];

        //empty the content area
        nu.frame.content.empty();


        //load the screen
        var screen = html.get("GamesFilter", nu.data.games).appendTo(nu.frame.content);

        //tab navigation to subscreens
        screen.tabs.find("li").tclick(function () { window.location = "#/games" + $(this).data("tab"); });
        
        nu.view.screen = screen;
        
        var games;
        var startblitz = false;
        var filter_for_open_slots = true;
        plugin.openSlotsPerRace = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
        if (window.location.hash.indexOf("/open") >= 0) {

            screen.open.addClass("eselected");

            if (nu.data.opengames == null) {
                nu.api.listGames("2", "2,3,4", "opengames");
                return;
            }
            games = nu.data.opengames;
        }
        else if (window.location.hash.indexOf("/full") >= 0) {

            screen.full.addClass("eselected");
            filter_for_open_slots = false;

            if (nu.data.fullgames == null) {
                nu.api.listGames("2", "2,3,4", "fullgames");
                return;
            }
            games = nu.data.fullgames;
        }
        else if (window.location.hash.indexOf("/blitz") >= 0) {
            screen.blitz.addClass("eselected");
            filter_for_open_slots = false;

            if (nu.data.blitzgames == null) {
                nu.api.listGames("1", "5", "blitzgames");
                return;
            }
            if (nu.apikey)
                startblitz = true;
            games = nu.data.blitzgames;
        }
        else if (window.location.hash.indexOf("/finished") >= 0) {

            screen.finished.addClass("eselected");
            filter_for_open_slots = false;

            if (nu.data.finishedgames == null) {
                nu.api.listGames("3", "2,3,4", "finishedgames");
                return;
            }
            games = nu.data.finishedgames;
        }
        else if (window.location.hash.indexOf("/new") >= 0) {

            screen.joining.addClass("eselected");

            if (nu.data.newgames == null) {
                nu.api.listGames("1", "2,3,4", "newgames");
                return;
            }
            games = nu.data.newgames;
        }
        else 
        {
            screen.championships.addClass("eselected");
            filter_for_open_slots = false;

            if (nu.data.championships == null) {
                nu.api.listGames("1,2,3", "6", "championships");
                return;
            }
            games = nu.data.championships;
        }        
        

        
        var classic_games = [];
        var team_games = [];
        var melee_games = [];
        var mentor_games = [];
        
        if (filter_for_open_slots) {
        	        	       	
            //load officers
            if ((plugin.filterForOwnRank || plugin.filterForOwnTenacity) && !nu.data.account.officers) {
                nu.api.loadOfficers(nu.data.account);
                return;
            }
        
            //just go once over the games to fetch the game info
            for (var i = 0; i < games.length; i++) {
                
                //get game
                var g = games[i];                    
                
                //check if it contains open slots
                if (g.openslots == 0) {                    
                    continue;
                }
                
                if (g.gametype != 2) {
                	if (!nu.data.games["game" + g.id]) {
                        nu.api.loadGameInfo(g.id);
                        return;
                    }
                }
            }
            
            for (var i = 0; i < games.length; i++) {
             
            	//marker if game has already been added if slots for all races are considered
            	var game_added = false;
            	
                //get game
                var g = games[i];                    
                
                //check if it contains open slots
                if (g.openslots == 0) {
                    continue;
                }
     
                var isMentorGame = false;
                if (g.gametype == 3 && (g.requiredlevelid > g.maxlevelid)) {
                	isMentorGame = true;     
                	//console.log("Mentor game found.");
                }
                
                //check for open spots of each race
                for (var r=1; r<12; r++) {
                
	                //check if the player rank for that race is eligible for game
	                if (plugin.filterForOwnRank && !isMentorGame) {
	                    //get right own officer rank for race
	                    var own_rank = 0;
	                    var own_max_rank = 0;
	                    for (var j=0; j<nu.data.account.officers.length; j++) {
                            if (nu.data.account.officers[j].levelid > own_max_rank) {
                                own_max_rank = nu.data.account.officers[j].levelid;
                            }
	                        if (nu.data.account.officers[j].raceid == r) {
	                            own_rank = nu.data.account.officers[j].levelid;
	                            //console.log("Own rank: " + own_rank);	                                                            
	                        }                            
	                    }   
	                    
	                    if (own_max_rank - 2 > own_rank) {
	                       own_rank = own_max_rank - 2;
	                    }
                                        
	                    
	                    if (g.requiredlevelid > own_rank) {
	                      //  console.log("Game #" + g.id + ": Not eligible. Own rank in race (" + own_rank + ") is lower than required rank (" + g.requiredlevelid + ").");
	                        continue;
	                    }
	                    if (g.maxlevelid != 0 && g.maxlevelid < own_rank) {
	                      //  console.log("Game #" + g.id + ": Not eligible. Own rank in race (" + own_rank + ") is higher than the maximum rank (" + g.maxlevelid + ").");
	                        continue;
	                    }
	                }
	                
	                //check for tenacity eligibility 
	                if (plugin.filterForOwnTenacity && g.mintenacity != 0 && nu.data.account.tenacity < (g.mintenacity/100.0)) {
	                  //  console.log("Game #" + g.id + ": Not eligible. Tenacity of " + nu.data.account.tenacity + " is lower than the required " + g.mintenacity + ".");  
	                    continue;
	                }
	 
	                //different game types need to be handled differently
	                var slot_for_race_found = false;                    
	                if (g.gametype == 2) { //standard 11 player games with one of each race
	                    if (g.turnstatus[r-1] == 'o') {
	                        slot_for_race_found = true;  
	                    }             
	                } else {
	                                            
	                    if (!nu.data.games["game" + g.id]) {
	                        nu.api.loadGameInfo(g.id);
	                        return;
	                    }	                    
	                    
	                    for (var k=0; k<nu.data.games["game" + g.id].players.length; k++ ) {
	                        var p = nu.data.games["game" + g.id].players[k];
	                        if (p.status == 0) {
	                            if (p.raceid == 0) {
	                                slot_for_race_found = true;   
	                                if (r == plugin.raceSelection) {
	                                	g.openslotstext = nu.getRace(r).shortname + " (Free To Choose)";
	                                }
	                                break;
	                            }
	                            
	                            if (p.raceid == r) {
	                                slot_for_race_found = true;   
	                                if (r == plugin.raceSelection) {
	                                	g.openslotstext = nu.getRace(r).shortname;
	                                }
	                                break;
	                            }                          
	                        }
	                    }
	                }
	                if (!slot_for_race_found) {
	                    //console.log("Game #" + g.id + ": No slots for desired race available.");  
	                    continue;
	                }
	                vgap.plugins['openSlotFilterPlugin'].openSlotsPerRace[r] += 1;	                 	                
	                
	                //if game does not match the desired turns per week, don't display it
	                if (g.turnsperweek > 7 || g.turnsperweek < 1 || (g.turnsperweek < 5 && !vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[g.turnsperweek]) || (g.turnsperweek > 4 && !vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[4]) ){
	                   continue;
	                }
	                
	                //if min tenacity is desired
	                if (plugin.requireMinTenacity && g.mintenacity == 0) {
	                   continue;
	                }
	                
	                
	                
	                //list all open slots or just the ones for the selected race
	                if (r == plugin.raceSelection || plugin.raceSelection == 0) {
	                	
	                	//skip if slots for all races are considered and game has been added before for another race
	                	if ( plugin.raceSelection == 0 && game_added) {
	                		continue;
	                	}	                	
	                	game_added = true;
	                	
	                	if (g.gametype == 2) {
	                		classic_games.push(g);
	                	} else if (g.gametype == 3) {
	                		//check if it is a mentor game
	                		if (g.requiredlevelid > g.maxlevelid) {
	                			mentor_games.push(g);
	                		} else {	                		
	                			team_games.push(g);
	                		}	                		
	                	} else if (g.gametype == 4) { 
	                		melee_games.push(g);
	                	}
	                }            
	            }
            }
            
            //use filtered subset as list to display            
            games = classic_games;
    	}
        
       
       
        //generate HTML for sort buttons
        var html_sort_begin = "<div style=\"width: 100%; padding: 15px 0 0 0;\"><table class=\"ecleantable\" \"><tbody><tr>";
        
        var html_sort_buttons = "<td></td><td style=\"width: 170px; padding: 0 15px 0 15px; font-size: 16px;\">Sort found games by: </td>";
        
        for (var s=0; s<5; s++) {
            var cur_img_src = "http://planets.nu/_library/2014/4/sort" + s + "_";
            var over_img_src = cur_img_src;
                            
            if (s == plugin.sortGamesBy) {
                if (plugin.sortReverse) {
                    cur_img_src += "up_g.png";
                    over_img_src += "down_o.png";
                } else {
                    cur_img_src += "down_g.png";
                    over_img_src += "up_o.png";                    
                }                    
            } else {
                cur_img_src += "down.png";
                over_img_src += "down_o.png";                
            }
                        
            html_sort_buttons += "<td style=\"width: 120px; text-align: center;\" title=\"Sort filtered games by " + vgap.plugins['openSlotFilterPlugin'].sortGamesText[s] + ".\"><img src=\"" + cur_img_src + "\" height=\"25px\" onmouseover=\"this.src='" + over_img_src + "'\" onmouseout=\"this.src='" + cur_img_src + "'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].selectSortMethod(" + s + "); nu.views['games'].show(); \"  /></td>";           
        
        }        
        var html_sort_button_end = "</tr></tbody></table></div>";
   
       
       
       
       
       
        if (!filter_for_open_slots) {
        
            //insert sort menu
            html["GamesFilterTools"] = html_sort_begin + html_sort_buttons + html_sort_button_end; 
            
            //screen.filtertools = "<div> 12342423 </div>";
            var filtercontent = html.get("GamesFilterTools", { title: "Classic Games", subtitle: "", count: games.length, games: games }).appendTo(screen.filtertools);
        
        	//sort games
            games = vgap.plugins['openSlotFilterPlugin'].sortGames(games);
        	
        	
        	var tabcontent = html.get("ExtendedGameList", {  title: "", subtitle: "", startblitz: startblitz, count: games.length, games: games }).appendTo(screen.tabcontent);        	
        	$(".erendergamerow").tclick(function () { window.location = "#/sector/" + $(this).data("id") + "/players"; });
             
            if (startblitz) {
                tabcontent.startblitz.tclick(function () { nu.view.startBlitz(); });
            }
        } else {
        	
            //prepare html content for tool section
            var html_turn_buttons_begin = "<div style=\"width: 100%; padding: 0 0 15px 0; \"><table class=\"ecleantable\" style=\"width: 100%; \"><tbody><tr>";
            
            
            //turns per week selectors
            var html_turn_buttons = "<td style=\"width: 110px; padding: 0 15px 0 15px; font-size: 16px;\">Turns per week:</td><td style=\"text-align: center;\" width=\"50px\" title=\"Any number of turns per week\"><img src=\"http://planets.nu/_library/2014/4/tany.png\" height=\"25px\" onmouseover=\"this.src='http://planets.nu/_library/2014/4/tanyo.png'\" onmouseout=\"this.src='http://planets.nu/_library/2014/4/tany.png'\" onclick=\"for (var i=1; i<8; i++) {vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[i] = true; } nu.views['games'].show(); \"  /></td>";
            
            for (var t=1; t<5; t++) {
                if (vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[t]) {
            		html_turn_buttons += "<td style=\"text-align: center;\" width=\"20px\" title=\"" + t + " turns per week\"><img src=\"http://planets.nu/_library/2014/4/t" + t + "g.png\" height=\"25px\" onmouseover=\"this.src='http://planets.nu/_library/2014/4/t" + t + "o.png'\" onmouseout=\"this.src='http://planets.nu/_library/2014/4/t" + t + "g.png'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[" + t + "] = !vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[" + t + "]; nu.views['games'].show(); \"  /></td>";
            		
            	} else {
            	
                    html_turn_buttons += "<td style=\"text-align: center;\" width=\"20px\" title=\"" + t + " turns per week\"><img src=\"http://planets.nu/_library/2014/4/t" + t + ".png\" height=\"25px\" onmouseover=\"this.src='http://planets.nu/_library/2014/4/t" + t + "o.png'\" onmouseout=\"this.src='http://planets.nu/_library/2014/4/t" + t + ".png'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[" + t + "] = !vgap.plugins['openSlotFilterPlugin'].turnsPerWeek[" + t + "]; nu.views['games'].show(); \"  /></td>";
            	}
            }
            //end: turns per week selectors

            //html for filtering for rank and tenacity
            var html_filter_rank = "";
            
            var cur_img_src = "http://planets.nu/_library/2014/4/filter_";
            var over_img_src = cur_img_src;
                            
            if (plugin.filterForOwnRank) {
                cur_img_src += "rank_g.png";
                over_img_src += "rank_o.png";                                    
            } else {
                cur_img_src += "rank.png";
                over_img_src += "rank_o.png";                
            }
                        
            html_filter_rank += "<td style=\"width: 120px; text-align: center;\" title=\"Filter games according to rank eligibility.\"><img src=\"" + cur_img_src + "\" height=\"25px\" onmouseover=\"this.src='" + over_img_src + "'\" onmouseout=\"this.src='" + cur_img_src + "'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].filterForOwnRank = !vgap.plugins['openSlotFilterPlugin'].filterForOwnRank; nu.views['games'].show(); \"  /></td>";           
        
            cur_img_src = "http://planets.nu/_library/2014/4/filter_";
            over_img_src = cur_img_src;
                 
            if (plugin.filterForOwnTenacity) {
                cur_img_src += "tenacity_g.png";
                over_img_src += "tenacity_o.png";                                    
            } else {
                cur_img_src += "tenacity.png";
                over_img_src += "tenacity_o.png";                
            }
                        
            html_filter_rank += "<td style=\"width: 120px; text-align: center;\" title=\"Filter games according to tenacity eligibility.\"><img src=\"" + cur_img_src + "\" height=\"25px\" onmouseover=\"this.src='" + over_img_src + "'\" onmouseout=\"this.src='" + cur_img_src + "'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].filterForOwnTenacity = !vgap.plugins['openSlotFilterPlugin'].filterForOwnTenacity; nu.views['games'].show(); \"  /></td>";           
        
            cur_img_src = "http://planets.nu/_library/2014/4/filter_";
            over_img_src = cur_img_src;
                 
            if (plugin.requireMinTenacity) {
                cur_img_src += "req_tenacity_g.png";
                over_img_src += "req_tenacity_o.png";                                    
            } else {
                cur_img_src += "req_tenacity.png";
                over_img_src += "req_tenacity_o.png";                
            }
                        
            html_filter_rank += "<td style=\"width: 120px; text-align: center;\" title=\"Filter out games which do not require a minimum tenacity to join.\"><img src=\"" + cur_img_src + "\" height=\"25px\" onmouseover=\"this.src='" + over_img_src + "'\" onmouseout=\"this.src='" + cur_img_src + "'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].requireMinTenacity = !vgap.plugins['openSlotFilterPlugin'].requireMinTenacity; nu.views['games'].show(); \"  /></td>";       
            //end: html for filtering for rank and tenacity
            
            
            var html_filter_heading = "<td style=\"width: 110px; padding: 0 15px 0 15px; font-size: 16px;\">Filter games:</td>";            
            
            var html_buttons_begin = "<div style=\"width: 100%; padding: 0 0 15px 0; border-bottom: solid 1px #333;\"><table class=\"ecleantable\" style=\"width: 100%; \"><tbody><tr>";
            
            var html_buttons = "";
            
            for (var b=1; b<12; b++) {
            	if (b == vgap.plugins['openSlotFilterPlugin'].raceSelection) {
            		html_buttons += "<td style=\"text-align: center;\" title=\"" + vgap.plugins['openSlotFilterPlugin'].openSlotsPerRace[b] + " game(s) with open slot(s) for " + nu.getRace(b).shortname  +"\"><img src=\"http://planets.nu/_library/2014/4/" + b + "g.png\" width=\"50px\" onmouseover=\"this.src='http://planets.nu/_library/2014/4/" + b + "o.png'\" onmouseout=\"this.src='http://planets.nu/_library/2014/4/" + b + "g.png'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].raceSelection = 0; nu.views['games'].show(); \"  /><br>" + vgap.plugins['openSlotFilterPlugin'].openSlotsPerRace[b] + "</td>";
            		
            	} else {
            	
            		html_buttons += "<td style=\"text-align: center;\" title=\"" + vgap.plugins['openSlotFilterPlugin'].openSlotsPerRace[b] + " game(s) with open slot(s) for " + nu.getRace(b).shortname  +"\"><img src=\"http://play.planets.nu/img/races/" + b + ".png\" width=\"50px\" onmouseover=\"this.src='http://planets.nu/_library/2014/4/" + b + "o.png'\" onmouseout=\"this.src='http://play.planets.nu/img/races/" + b + ".png'\" onclick=\"vgap.plugins['openSlotFilterPlugin'].raceSelection = " + b + "; nu.views['games'].show(); \"  /><br>" + vgap.plugins['openSlotFilterPlugin'].openSlotsPerRace[b] + "</td>";
            	}
            }
            var html_button_end = "</tr></tbody></table></div>";
            
            html["GamesFilterTools"] = html_turn_buttons_begin + html_filter_heading + html_filter_rank + html_turn_buttons + "<td>&nbsp; </td>"+ html_button_end; 
            html["GamesFilterTools"] += html_buttons_begin + html_buttons + html_button_end; 
            
            
            //add sort menu to tools section
            html["GamesFilterTools"] += html_sort_begin + html_sort_buttons + html_sort_button_end; 
            
           var filtercontent = html.get("GamesFilterTools", { title: "Classic Games", subtitle: "", count: games.length, games: games }).appendTo(screen.filtertools);


            //sort games
            games = vgap.plugins['openSlotFilterPlugin'].sortGames(games); 
            team_games = vgap.plugins['openSlotFilterPlugin'].sortGames(team_games);
            mentor_games = vgap.plugins['openSlotFilterPlugin'].sortGames(mentor_games);
            melee_games = vgap.plugins['openSlotFilterPlugin'].sortGames(melee_games);


        	var tabcontent = null; 
        	
        	if (games.length > 0) {
	        	tabcontent = html.get("ExtendedGameList", {  title: "Classic Games", subtitle: "These are classic 11 player games. They maybe vary in their configuration: fully Classic, Stellar Cartography, and Campaign features.", startblitz: false, count: games.length, games: games }).appendTo(screen.tabcontent);	        	
	        	$(".erendergamerow").tclick(function () { window.location = "#/sector/" + $(this).data("id") + "/players"; });
        	}
        
        	if (mentor_games.length > 0) {
        		tabcontent = html.get("ExtendedGameList", { title: "Mentor Games", subtitle: "Team games with 6 teams with 2 players each: a seasoned mentor partners up with a beginner to show him the ropes.", startblitz: false, count: mentor_games.length, games: mentor_games }).appendTo(screen.tabcontent);
        		$(".erendergamerow").tclick(function () { window.location = "#/sector/" + $(this).data("id") + "/players"; });
        	}
        	
        	if (team_games.length > 0) {
        		tabcontent = html.get("ExtendedGameList", { title: "Team Games", subtitle: "Team games with 2, 3, or 4 players per team.", startblitz: false, count: team_games.length, games: team_games }).appendTo(screen.tabcontent);
        		$(".erendergamerow").tclick(function () { window.location = "#/sector/" + $(this).data("id") + "/players"; });
        	}
        	
        	if (melee_games.length > 0) {
        		tabcontent = html.get("ExtendedGameList", { title: "Giant Melee Games", subtitle: "Giant Melee battles ", startblitz: false, count: melee_games.length, games: melee_games }).appendTo(screen.tabcontent);
        		$(".erendergamerow").tclick(function () { window.location = "#/sector/" + $(this).data("id") + "/players"; });
        	}
        }
    };

   
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);
