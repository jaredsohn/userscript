// ==UserScript==
// @name           Planets.nu Extended History Graphs Addon
// @namespace      Planets.nu 
// @description    Adds graphs to plot histories for ships and bases to NEW planets.nu. Also adds new game speed display based on the turn of reaching the ship limit. Pie charts are also added back in, but not final.
// @include        http://planets.nu/*
// @include        http://play.planets.nu/*
// @include        http://test.planets.nu/*
// @updateURL      https://userscripts.org/scripts/source/131062.meta.js
// @downloadURL    http://userscripts.org/scripts/source/131062.user.js
// @author         kedalion
// @version        0.53
// ==/UserScript==

/* -----------------------------------------------------------------------
v0.53 
 - fixed path inclusion for panets.nu (without play or test)
v0.5
 - fixed compatibility issues planets.nu due to cross domain CSS sheet inclusion
v0.4
 - compatible with NEW version of planets.nu (also formerly play.planets.nu)
 - removed pbp graphs (can be easily readded if wanted--> feedback)
 - added a new graph showing history of total number of ships with comparison to typical games of same type
 - added pie charts back for new planets.nu UI. (preliminary)
v0.3
 - adjusted script to work with Game Data Alliance Addon
v0.2
 - added bases, ships, and pbps graphs
 ----------------------------------------------------------------------- */

function exec(fn) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = '(' + wrapper + ')(); (' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
};

exec(function() {

	//resize tabs in game detail page
    console.log("Creating space in game menu.");
    
    var css_success = nu.adjustCSS();
    
    
    console.log("Inserting new tabs in game menu.");
   
   
    
    if (css_success) {

        html_menu_section = "<ul id=\"etabs\">               <li id=\"eplayers\" data-tab=\"\">                    {{t.players}}                </li>                <li id=\"eactivity\" data-tab=\"/activity\">                    {{t.activity}}                </li>                <li id=\"eallies\"  data-tab=\"/allies\">                    {{t.allies}}                </li>                <li id=\"eplanets\"  data-tab=\"/planets\">                    {{t.planets}}                </li>                <li id=\"emilitary\"  data-tab=\"/military\">                    {{t.military}}                </li>                <li id=\"edata\"  data-tab=\"/data\">                    {{t.data}}                </li>                <li id=\"eevents\"  data-tab=\"/events\">                    {{t.events}}                </li>   <li id=\"eships\"  data-tab=\"/ships\">                    Ships               </li><li id=\"ebases\"  data-tab=\"/bases\">                    Bases               </li><li id=\"egamespeed\"  data-tab=\"/gamespeed\">                    Speed               </li><li id=\"epiemilitary\"  data-tab=\"/piemilitary\">                    M-Pie               </li><li id=\"epieplanets\"  data-tab=\"/pieplanets\">                    P-Pie               </li>            </ul>";
    
    } else {     
    
        html_menu_section = "<ul id=\"etabs\">               <li id=\"eplayers\" data-tab=\"\" style=\"width:60px\">                    {{t.players}}                </li>                <li id=\"eactivity\" data-tab=\"/activity\" style=\"width:60px\">                    {{t.activity}}                </li>                <li id=\"eallies\"  data-tab=\"/allies\" style=\"width:60px\">                    {{t.allies}}                </li>                <li id=\"eplanets\"  data-tab=\"/planets\" style=\"width:60px\">                    {{t.planets}}                </li>                <li id=\"emilitary\"  data-tab=\"/military\" style=\"width:60px\">                    {{t.military}}                </li>                <li id=\"edata\"  data-tab=\"/data\" style=\"width:60px\">                    {{t.data}}                </li>                <li id=\"eevents\"  data-tab=\"/events\" style=\"width:60px\">                    {{t.events}}                </li>   <li id=\"eships\"  data-tab=\"/ships\" style=\"width:60px\">                    Ships               </li><li id=\"ebases\"  data-tab=\"/bases\" style=\"width:60px\">                    Bases               </li><li id=\"egamespeed\"  data-tab=\"/gamespeed\" style=\"width:60px\">                    Speed               </li><li id=\"epiemilitary\"  data-tab=\"/piemilitary\" style=\"width:60px\">                    M-Pie               </li><li id=\"epieplanets\"  data-tab=\"/pieplanets\" style=\"width:60px\">                    P-Pie               </li>            </ul>";

    }






	html_start = "<div id=\"GameContent\">    <img id=\"egamelocmap\" src=\"http://play.planets.nu/img/maps/1000.png\" />    <div id=\"egameinfo\">        <div id=\"egamecircle\"></div>        <div class=\"GameInfoTurn\">{{t.turn}} <b>{{game.turn}}</b> - {{timetohost}}</div>        {{#ishost}}<div id=\"ehostcontrols\">{{t.host}}: <span id=\"eeditgame\">{{t.edit}}</span><span id=\"epausegame\">{{pausetext}}</span><span id=\"edeletegame\">{{t.del}}</span></div>{{/ishost}}        <div class=\"GameInfoTitle\">            {{fullname}} ( {{yearfrom}} - {{yearto}} )        </div>        <div class=\"SectorDescription\">{{game.description!}}            <div id=\"eresources\">                <table class=\"ecleantable\">                    <tr>                        <td>                            <div id=\"eneu\" class=\"evertbar\" title=\"Neutronium Level - {{settings.neutroniumlevel}}\"><span style=\"margin-top:{{mneu}}px;height:{{hneu}}px;\"></span></div>                        </td>                        <td>                            <div id=\"edur\" class=\"evertbar\" title=\"Duranium Level - {{settings.duraniumlevel}}\"><span style=\"margin-top:{{mdur}}px;height:{{hdur}}px;\"></span></div>                        </td>                        <td>                            <div id=\"etri\" class=\"evertbar\" title=\"Tritanium Level - {{settings.tritaniumlevel}}\"><span style=\"margin-top:{{mtri}}px;height:{{htri}}px;\"></span></div>                        </td>                        <td>                            <div id=\"emol\" class=\"evertbar\" title=\"Molybdenum Level - {{settings.molybdenumlevel}}\"><span style=\"margin-top:{{mmol}}px;height:{{hmol}}px;\"></span></div>                        </td>                                                                        <td>                            <div id=\"eden\" class=\"evertbar\" title=\"Average Mineral Density - {{settings.averagedensitypercent}}%\"><span style=\"margin-top:{{mden}}px;height:{{hden}}px;\"></span></div>                        </td>                    </tr>                    <tr>                        <td>                            Neu                        </td>                        <td>                            Dur                        </td>                        <td>                            Tri                        </td>                        <td>                            Mol                        </td>                        <td>                            D%                        </td>                    </tr>                </table>                            </div>            <ul style=\"margin:0;padding:0;width:200px;float:right;\">                <li>{{t.planets}}: {{settings.numplanets}}</li>                <li>{{t.starclusters}}: {{settings.stars}}</li>                <li>{{t.nebulas}}: {{settings.nebulas}}</li>                <li>{{t.debrisdisks}}: {{settings.ndebrisdiscs}}</li>                <li>{{t.maxionstorms}}: {{settings.maxions}}</li>            </ul>            <ul>                <li>{{t.battleid}}: {{game.id}}</li>                <li>{{t.created}}: {{game.datecreated}}</li>                {{#settings.campaignmode}}                <li>{{t.campaignmodeenabled}}</li>                <li>{{t.maxadvantage}}: {{settings.maxadvantage}}</li>                {{/settings.campaignmode}}                <li>{{t.hostdays}}: {{game.hostdays}} at {{game.hosttime}}</li>                <li>{{t.wincondition}}: {{wincondition}}</li>                <li>{{t.maxallies}}: {{settings.maxallies}}</li>                <li>{{t.minimumrank}}: {{game.requiredlevelname}}</li>                            <li>{{t.maximumrank}}: {{game.maxlevelname}}</li>                   {{#game.iscustom}}<li>{{t.hostedby}}: <a href=\"#/account/{{game.createdby}}/hosting\" style=\"text-transform: capitalize;\">{{game.createdby}}</a></li>{{/game.iscustom}}                       </ul>            <p>{{{game.description}}}</p>        </div>            <div id=\"egametabs\">       ";
    
    
    
    html_end = "             </div>        <div id=\"etabcontent\" class=\"etabcontent\">        </div>    </div></div>";

    html["GameOverview"] = html_start + html_menu_section + html_end;
	
	nu.view.show();

	console.log("Done.");


});

function wrapper() { // wrapper for injection

    Nuniverse.prototype.adjustCSS = function() {
    
        var tab_width = "60px";
            
        try {
            var old_rule = nu.getCSSRule("#egametabs #etabs li", false);
            old_rule.style.width = tab_width;
            
            //potentially also needed, but width seems overwritten by above rule
            //old_rule = nu.getCSSRule("#etabs li", false);
            //old_rule.style.width = tab_width;
                
            console.log("CSS manipulation succeeded.");
            return true;
        } catch (err) {
            console.log("CSS manipulation failed due to cross domain CSS sheet. Manual correction will be applied.");
            return false;
        }
    };

    
	Nuniverse.prototype.getCSSRule = function(ruleName, deleteFlag) {               // Return requested style obejct
		//css manipulation code from: http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
		
		//console.log("Invoked with :" + ruleName);
		
	   //ruleName=ruleName.toLowerCase();                       // Convert test string to lower case.
	   if (document.styleSheets) {                            // If browser can play with stylesheets
	      for (var i=0; i<document.styleSheets.length; i++) { // For each stylesheet
	    	 console.log(i);
	         var styleSheet=document.styleSheets[i];          // Get the current Stylesheet
	         var ii=0;                                        // Initialize subCounter.
	         var cssRule=false;                               // Initialize cssRule. 
	                  
	         var num_rules;
	         if (styleSheet.cssRules) {                    // Browser uses cssRules?
	        	 num_rules = styleSheet.cssRules.length;         // Yes --Mozilla Style
        	 } else {                                      // Browser usses rules?
        		 num_rules = styleSheet.rules.length;            // Yes IE style. 
        	 }
	         
	         for (var ii=0; ii<num_rules; ii++) {
	        	 if (styleSheet.cssRules) {                    // Browser uses cssRules?
	        		 cssRule = styleSheet.cssRules[ii];         // Yes --Mozilla Style
	        	 } else {                                      // Browser usses rules?
	        		 cssRule = styleSheet.rules[ii];            // Yes IE style. 
	        	 }	
	        	 //console.log(i + ", " + ii + ":" + cssRule.selectorText);
	        	 
	        	 if (cssRule.selectorText==ruleName) { //  match ruleName?
	        		 if (deleteFlag=='delete') {             // Yes.  Are we deleteing?
	        			 if (styleSheet.cssRules) {           // Yes, deleting...
	        				 styleSheet.deleteRule(ii);        // Delete rule, Moz Style
	        			 } else {                             // Still deleting.
	        				 styleSheet.removeRule(ii);        // Delete rule IE style.
	        			 }                                    // End IE check.
	        			 return true;                         // return true, class deleted.
	        		 } else {                                // found and not deleting.
	        			 return cssRule;                      // return the style object.
	        		 }                                      // End delete Check
	        	 }   

	         }
	         /*
	         do {                                             // For each rule in stylesheet
	            if (styleSheet.cssRules) {                    // Browser uses cssRules?
	               cssRule = styleSheet.cssRules[ii];         // Yes --Mozilla Style
	            } else {                                      // Browser usses rules?
	               cssRule = styleSheet.rules[ii];            // Yes IE style. 
	            }                                             // End IE check.
	            if (cssRule)  {                               // If we found a rule...
	               if (cssRule.selectorText==ruleName) { //  match ruleName?
	                  if (deleteFlag=='delete') {             // Yes.  Are we deleteing?
	                     if (styleSheet.cssRules) {           // Yes, deleting...
	                        styleSheet.deleteRule(ii);        // Delete rule, Moz Style
	                     } else {                             // Still deleting.
	                        styleSheet.removeRule(ii);        // Delete rule IE style.
	                     }                                    // End IE check.
	                     return true;                         // return true, class deleted.
	                  } else {                                // found and not deleting.
	                     return cssRule;                      // return the style object.
	                  }                                      // End delete Check
	               }                                          // End found rule name
	            }                                             // end found cssRule
	            ii++;                                         // Increment sub-counter
	         } while (cssRule)     */                           // end While loop
	      }                                                   // end For loop
	   }                                                      // end styleSheet ability check
	   return false;                                          // we found NOTHING!
	};                                                         // end getCSSRule 

	Nuniverse.prototype.killCSSRule = function(ruleName) {                          // Delete a CSS rule   
	   return getCSSRule(ruleName,'delete');                  // just call getCSSRule w/delete flag.
	};                                                         // end killCSSRule

	Nuniverse.prototype.addCSSRule = function(ruleName) {                           // Create a new css rule
	   if (document.styleSheets) {                            // Can browser do styleSheets?
	      if (!getCSSRule(ruleName)) {                        // if rule doesn't exist...
	         if (document.styleSheets[0].addRule) {           // Browser is IE?
	            document.styleSheets[0].addRule(ruleName, null,0);      // Yes, add IE style
	         } else {                                         // Browser is IE?
	            document.styleSheets[0].insertRule(ruleName+' { }', 0); // Yes, add Moz style.
	         }                                                // End browser check
	      }                                                   // End already exist check.
	   }                                                      // End browser ability check.
	   return getCSSRule(ruleName);                           // return rule we just created.
	}; 


    

    ViewGame.prototype.show = function() {

    //show this screen
       
        //empty the content area
        nu.frame.content.empty();

        var gameid = nu.view.parseGameId();        

        if (!nu.data.games["game" + gameid]) {
            nu.api.loadGameInfo(gameid);
            return;
        }

        var data = nu.data.games["game" + gameid];
        nu.view.massageGameData(data);

        //load the screen
        var screen = html.get("GameOverview", data).appendTo(nu.frame.content);
        screen.tabs.find("li").tclick(function () { window.location = "#/sector/" + gameid + $(this).data("tab"); });

        if (data.ishost) {
            screen.deletegame.tclick(function () {
                nu.confirm("Are you sure you want to delete this game?", function () {
                    nu.confirm("<b style='color:#ff6600;'>This is a live running game. Are you sure?</b>", function () {
                        nu.api.deleteGame(data.game.id, function () {
                            window.location = nu.getPlayerPath(nu.data.account.username) + "/hosting";
                        });
                    });
                });
            });
            screen.pausegame.tclick(function () { nu.api.pauseGame(data.game.id); });
            screen.editgame.tclick(function () {

                data.game.days = [{ day: "Sunday" }, { day: "Monday" }, { day: "Tuesday" }, { day: "Wednesday" }, { day: "Thursday" }, { day: "Friday" }, { day: "Saturday" }];
                for (var i = 0; i < data.game.hostdays.length; i++) {
                    var ch = data.game.hostdays[i];
                    if (ch != "_")
                        data.game.days[i].selected = true;
                    data.game.days[i].index = i + 1;
                }
                var win = html.get("EditGame", data.game);
                nu.modal(win, "Edit Game", "800px");
                win.cancel.tclick(nu.closemodal);
                win.save.tclick(function () {

                    var settings = {};
                    settings.name = win.gamename.val();
                    settings.description = win.gamedescription.val();
                    settings.hosttime = win.hosttime.val();
                    settings.password = win.gamepassword.val();
                    settings.nexthost = win.nexthost.val();
                    settings.isprivate = !win.ispublic.is(":checked");

                    var days = ["", "S", "M", "T", "W", "T", "F", "S"];
                    var hostdays = "";
                    for (var i = 1; i <= 7; i++) {
                        if ($("#HostDay" + i).is(':checked'))
                            hostdays += days[i];
                        else
                            hostdays += "_";
                    }
                    settings.hostdays = hostdays;

                    nu.api.updateGame(gameid, settings);
                    nu.closemodal();
                });
            });
        }

        nu.view.positionMap(screen, data);

        //direct load subscreens
        if (window.location.hash.indexOf("/activity") > 0) {
            screen.activity.addClass("eselected");
            nu.view.showActivity(screen, data, gameid);
            return;
        }
        else if (window.location.hash.indexOf("/allies") > 0) {
            screen.allies.addClass("eselected");
            nu.view.showAllies(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/planets") > 0) {
            screen.planets.addClass("eselected");
            nu.view.showPlanets(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/military") > 0) {
            screen.military.addClass("eselected");
            nu.view.showMilitary(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/data") > 0) {
            screen.data.addClass("eselected");
            nu.view.showData(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/events") > 0) {
            screen.events.addClass("eselected");
            nu.view.showEvents(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/ships") > 0) {
            screen.ships.addClass("eselected");
            nu.view.showShips(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/bases") > 0) {
            screen.bases.addClass("eselected");
            nu.view.showBases(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/gamespeed") > 0) {
            screen.gamespeed.addClass("eselected");
            nu.view.showGamespeed(screen, data);
            return;
        }
        else if (window.location.hash.indexOf("/piemilitary") > 0) {
            screen.piemilitary.addClass("eselected");
            nu.view.showMilitaryPie(screen, data);
            console.log("Here");
            return;
        }
        else if (window.location.hash.indexOf("/pieplanets") > 0) {
            screen.pieplanets.addClass("eselected");
            nu.view.showPlanetsPie(screen, data);
            return;
        }



        screen.players.addClass("eselected");
        nu.view.showPlayers(screen, data);


    };

    ViewGame.prototype.scoresToScoreData = function (data) {
        var bases = new Array();
        var ships = new Array();
        
        var labels = new Array(); 
    
        var slots = data.game.slots;
        var turns = data.game.turn;
        labels.push("Turn");
        
        //get player names and entries
        for (var i=0; i<slots; i++) {
            labels.push(data.scores[i].name);    
        }
        bases.push(labels);
        ships.push(labels);
        
        //start reading in all the scores
        for (var t=1; t<=turns; t++) {
            var ship_turn = new Array();
            ship_turn.push(t);
            
            var base_turn = new Array();
            base_turn.push(t); 
        
            for (var s=1; s<=slots; s++) {
                var index = (t-1) * slots + (s - 1);
                
                base_turn.push(data.scores[index].starbases); 
                ship_turn.push(data.scores[index].capitalships + data.scores[index].freighters);                    
            }            
            bases.push(base_turn);
            ships.push(ship_turn);
        }
        
        data.game.scoredata.bases = bases;
        data.game.scoredata.ships = ships;
        
        
        //console.log("Test");
    }

    
    ViewGame.prototype.showBases = function (screen, data) {

        if (data.game.turn <= 1) {
            $("<div style='padding:30px;'>Game has not started yet.</div>").appendTo(screen.tabcontent);
            return;
        }

        if (!data.game.scoredata) {
            nu.api.loadScoreData(data.game);
            return;
        }
        
        if (!data.scores) {
            nu.api.loadGameScores(data.game.id);
            return;
        }
        
        if (!data.game.scoredata.bases) {
            nu.view.scoresToScoreData(data);        
        }

        $("<div id='echartdisplay'></div>").appendTo(screen.tabcontent);


        var data = google.visualization.arrayToDataTable(data.game.scoredata.bases);        

        // Create and draw the visualization.
        new google.visualization.LineChart(document.getElementById("echartdisplay")).draw(data,
            {
                chartArea:{left:30,top:20,width:"75%",height:"90%"},
                legend: { position: "right", textStyle: { color: '#fff', fontSize: 11 } },
                lineWidth: 4,
                pointSize: 2,
                width: 1000,
                height: 600,
                backgroundColor: "transparent",
                hAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } },
                vAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } }
            }
        );
    };
	
    ViewGame.prototype.showShips = function (screen, data) {

        if (data.game.turn <= 1) {
            $("<div style='padding:30px;'>Game has not started yet.</div>").appendTo(screen.tabcontent);
            return;
        }

        if (!data.game.scoredata) {
            nu.api.loadScoreData(data.game);
            return;
        }
        
        if (!data.scores) {
            nu.api.loadGameScores(data.game.id);
            return;
        }
        
        if (!data.game.scoredata.ships) {
            nu.view.scoresToScoreData(data);        
        }

        $("<div id='echartdisplay'></div>").appendTo(screen.tabcontent);


        var data = google.visualization.arrayToDataTable(data.game.scoredata.ships);        

        // Create and draw the visualization.
        new google.visualization.LineChart(document.getElementById("echartdisplay")).draw(data,
            {
                chartArea:{left:30,top:20,width:"75%",height:"90%"},
                legend: { position: "right", textStyle: { color: '#fff', fontSize: 11 } },
                lineWidth: 4,
                pointSize: 2,
                width: 1000,
                height: 600,
                backgroundColor: "transparent",
                hAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } },
                vAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } }
            }
        );
    };
  
    ViewGame.prototype.loadSpeedData = function(data) {
        
        //console.log("Calculating speed data");
    
        var speedDataGames = [[38553, 1001, 55866], [43890, 42421, 53007], [33817, 43835, 43387]];
        var type_index = data.game.gametype - 2;
        
        //treat championship games as standard games here
        if (data.game.gametype == 6)
            type_index = 0;
        
        
        var requested = false;
        for (var i=0; i<3; i++) {
            var game_name = "game" + speedDataGames[type_index][i];
            //console.log("Iter: " + i + " name: " + game_name + ".");
        
            if (!nu.data.games[game_name]) {
                nu.api.loadGameInfo(speedDataGames[type_index][i]);
                requested = true;
            }
           // console.log("y");
        }
        if (requested)
            return;
        
        for (var i=0; i<3; i++) {
            var game_name = "game" + speedDataGames[type_index][i];
            //console.log("Iter2: " + i + " name: " + game_name + ".");
            if (!nu.data.games[game_name].scores) {
                nu.api.loadGameScores(speedDataGames[type_index][i]);
               // console.log("X");
                requested = true;            
            }    
            //console.log("x");
        }  
        if (requested)
            return;
            
        //now build the arrays of ship counts
        var ships = new Array();
        var labels = new Array(); 
    
           
        
        labels.push("Turn");        
        labels.push("Fastest game: " + nu.data.games["game" + speedDataGames[type_index][0]].game.name + " (" + nu.data.games["game" + speedDataGames[type_index][0]].game.id + ")");
        labels.push("Median speed game: " + nu.data.games["game" + speedDataGames[type_index][1]].game.name + " (" + nu.data.games["game" + speedDataGames[type_index][1]].game.id + ")");
        labels.push("Slowest game: " + nu.data.games["game" + speedDataGames[type_index][2]].game.name + " (" + nu.data.games["game" + speedDataGames[type_index][2]].game.id + ")");
        labels.push("Current game: " + data.game.name);
        labels.push("Ship limit 500");
        
        ships.push(labels);
        
        //var slots = data.game.slots;
        var turns = data.game.turn;
        
        var games = new Array();
        games.push(speedDataGames[type_index][0]);
        games.push(speedDataGames[type_index][1]);
        games.push(speedDataGames[type_index][2]);
        games.push(data.game.id);
                
        //start reading in all the scores for game and references
        for (var t=1; t<=turns; t++) {
                 
            var ship_turn = new Array();
            ship_turn.push(t);
            
            //loop over games in array
            for (var g=0; g<games.length; g++) {
                var slots = nu.data.games["game"+games[g]].game.slots;
                
                var ships_sum = 0;
                
                if (t > nu.data.games["game"+games[g]].game.turn) {
                    ship_turn.push(500);
                }
                else {
                    for (var s=1; s<=slots; s++) {
                        var index = (t-1) * slots + (s - 1);
                        ships_sum += nu.data.games["game"+games[g]].scores[index].capitalships + nu.data.games["game"+games[g]].scores[index].freighters;                 
                    }
                    ship_turn.push(ships_sum);               
                }
            }
            ship_turn.push(500);
               
            ships.push(ship_turn);
        }
        
        
        data.speeddata = ships;   
        
        //console.log("Done creating speeddata");
    }
    
    

    ViewGame.prototype.showGamespeed = function (screen, data) {

        if (data.game.turn <= 1) {
            $("<div style='padding:30px;'>Game has not started yet.</div>").appendTo(screen.tabcontent);
            return;
        }
        
        if (data.game.gametype < 2 || (data.game.gametype > 4 && data.game.gametype != 6)) { //championship games like standard
            $("<div style='padding:30px;'>Gametype not supported yet.</div>").appendTo(screen.tabcontent);
            return;
        }
              
        if (!data.scores) {
            nu.api.loadGameScores(data.game.id);
            return;
        }      
        
        //console.log("Check for speed data");
        if (!data.speeddata) {
            nu.view.loadSpeedData(data);
            return;            
        }
        
        //console.log("there should be a graph soon...");
              
//        if (!nu.data.speeddata) {
//            nu.view.scoresToSpeedData(data);
//        }

        if (!data.speeddata)
            console.log("I see the data.");


        $("<div id='echartdisplay'></div>").appendTo(screen.tabcontent);


        var data = google.visualization.arrayToDataTable(data.speeddata);        

        // Create and draw the visualization.
        new google.visualization.LineChart(document.getElementById("echartdisplay")).draw(data,
            {
                chartArea:{left:30,top:20,width:"75%",height:"90%"},
                legend: { position: "right", textStyle: { color: '#fff', fontSize: 11 } },
                lineWidth: 4,
                pointSize: 2,
                width: 1000,
                height: 600,
                backgroundColor: "transparent",
                hAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } },
                vAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } }
            }
        );
        
        //console.log("Done: there should be a graph now...");
    };


    ViewGame.prototype.showMilitaryPie = function (screen, data) {

        if (data.game.turn <= 1) {
            $("<div style='padding:30px;'>Game has not started yet.</div>").appendTo(screen.tabcontent);
            return;
        }
       
        if (!data.scores) {
            nu.api.loadGameScores(data.game.id);
            return;
        }
        
          
        var military_pie_data = new Array();
        var row = new Array();
        row.push("Player");
        row.push("Military Percentage");
               
        military_pie_data.push(row);
       
        for (var s=1; s<=data.game.slots; s++) {
            row = new Array();
            
            var index = (data.game.turn-1) * data.game.slots + (s - 1);
            
            row.push(data.scores[index].name);
            row.push(data.scores[index].percent);
            
            military_pie_data.push(row);
        }
        
        $("<div id='echartdisplay'></div>").appendTo(screen.tabcontent);

        var data = google.visualization.arrayToDataTable(military_pie_data);        

        // Create and draw the visualization.
        new google.visualization.PieChart(document.getElementById("echartdisplay")).draw(data,
            {
                chartArea:{left:330,top:20,width:"75%",height:"90%"},
                legend: { position: "right", textStyle: { color: '#fff', fontSize: 11 } },
                lineWidth: 4,
                pointSize: 2,
                width: 1000,
                height: 600,
                backgroundColor: "transparent",
                hAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } },
                vAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } }
            }
        );
    };
    
    ViewGame.prototype.showPlanetsPie = function (screen, data) {

        if (data.game.turn <= 1) {
            $("<div style='padding:30px;'>Game has not started yet.</div>").appendTo(screen.tabcontent);
            return;
        }
       
        if (!data.scores) {
            nu.api.loadGameScores(data.game.id);
            return;
        }
        
          
        var military_pie_data = new Array();
        var row = new Array();
        row.push("Player");
        row.push("Planets Owned Percentage");
               
        military_pie_data.push(row);
       
        for (var s=1; s<=data.game.slots; s++) {
            row = new Array();
            
            var index = (data.game.turn-1) * data.game.slots + (s - 1);
            
            row.push(data.scores[index].name);
            row.push(data.scores[index].planets);
            
            military_pie_data.push(row);
        }
        
        $("<div id='echartdisplay'></div>").appendTo(screen.tabcontent);

        var data = google.visualization.arrayToDataTable(military_pie_data);        

        // Create and draw the visualization.
        new google.visualization.PieChart(document.getElementById("echartdisplay")).draw(data,
            {
                chartArea:{left:330,top:20,width:"75%",height:"90%"},
                legend: { position: "right", textStyle: { color: '#fff', fontSize: 11 } },
                lineWidth: 4,
                pointSize: 2,
                //pieSliceText: "label",
                width: 1000,
                height: 600,
                backgroundColor: "transparent",
                hAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } },
                vAxis: { textStyle: { color: '#fff', fontSize: 13 }, gridlines: { color: '#444', count: 4 } }
            }
        );
    };
} //wrapper for injection
