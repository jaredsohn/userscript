// ==UserScript==
// @name           Monsterkill Scout v2
// @namespace      MonsterkillScout
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// ==/UserScript==

// Include Dojo from the AOL CDN
var script = document.createElement('script');
script.id = 'dojoElement';
script.src="http://o.aolcdn.com/dojo/1.3.0/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script);

// version number so that saved data can know what version of the parser
// was used. if data is saved with an old version, it will be overwritten
var parserVersion = 26;

// array and index
var currentPbpIndexToParse = -1;
var currentReplayIndexToParse = -1;
var pbpIdsToParse = [];



var gameId = -1;

// holds data from the saved configuration value
// also holds data from the current replay as it is
// parsed
var savedData = {};

function getGameIdFromLocation() {
    var gid = window.location.search;
    gid = gid.slice(gid.indexOf('game_id=')+'game_id='.length);
    if (gid.indexOf('&') > -1) {
        gid = gid.slice(0, gid.indexOf('&'));
    } else {
        gid = gid.slice(0);
    }
    return gid;
}

function resetReplayData() {
    savedData = {parserVersion: parserVersion};
    GM_setValue('replayData', dojo.toJson(savedData));
}

function saveReplayData() {
    // pull in any changes that might have been saved
    // while this page was parsing. ex if you open 2
    // replays in tabs and start both of them scouting
    // at the same time, the second one to finish would
    // erase the previous one
    var tmpGameData = savedData[gameId];
    tmpGameData.parserVersion = parserVersion;
    evalReplayData();
    savedData[gameId] = tmpGameData;
    GM_setValue('replayData', dojo.toJson(savedData));
}

/*
loads all data saved to the configuration value
*/
function evalReplayData() {
    if (GM_getValue('replayData')!=null) {
        eval("savedData="+GM_getValue('replayData')+";");
    }
}

/*
    load constraints from greasemonkey
    if this is the first time using the script, it'll create a default list of constraints
*/
var constraints;
function loadConstraints() {
    if (GM_getValue('constraints')) {
        eval("tempconstraints="+GM_getValue('constraints')+";");
        constraints = new Array();
        for (var key in tempconstraints) {
            constraints.push(tempconstraints[key]);
        }
    } else {
        constraints = [
            { n:"1st down", c:{d:{e:1}} },
            { n:"2nd down", c:{d:{e:2}} },
            { n:"3rd down", c:{d:{e:3}} },
            { n:"3rd down and 6+ yards", c:{d:{e:3},y:{g:6}} },
            { n:"3rd down and 10+ yards", c:{d:{e:3},y:{g:10}} },
            { n:"4th down", c:{d:{e:4}} },
            { n:"Pitch left", c:{r:{e:1}} },
            { n:"Handoff left", c:{r:{e:2}} },
            { n:"Handoff middle", c:{r:{e:3}} },
            { n:"Handoff right", c:{r:{e:4}} },
            { n:"Pitch right", c:{r:{e:5}} },
            { n:"Any Situation", c:{} }
        ];
        GM_setValue('constraints', dojo.toJson(constraints));
    }
}
function saveConstraints() {
    GM_setValue('constraints', dojo.toJson(constraints));
}

var teams = [];
function populateTeamsData() {
    var teamLinks = dojo.query("div.content_header div.big_head a");
    teams[0] = {};
    teams[0].id = teamLinks[0].href.slice(teamLinks[0].href.indexOf('team_id=')+8);
    teams[0].name = teamLinks[0].innerHTML;
    teams[1] = {};
    teams[1].id = teamLinks[1].href.slice(teamLinks[1].href.indexOf('team_id=')+8);
    teams[1].name = teamLinks[1].innerHTML;
}

var dojo;
var console;
window.addEventListener('load', function(event) {
    dojo = unsafeWindow.dojo;
    console = unsafeWindow.console;
    evalReplayData();
    // load constraints from greasemonkey
    loadConstraints();
    dojo.addOnLoad(function() {
        gameId = getGameIdFromLocation();
        /*
            button to show a form for adding constraints
        */
        /* 
            <div style="height: 20px; float: left; margin-right: 1px;">
                <a href="/game/game.pl?game_id=424615">Box Score</a>
            </div>
        */
        var editConstraintButton = document.createElement('div');
        dojo.style(editConstraintButton, 'height', '20px');
        dojo.style(editConstraintButton, 'float', 'left');
        dojo.style(editConstraintButton, 'margin-right', '1px');
        var editConstraintLink = document.createElement('a');
        editConstraintLink.innerHTML = "Edit Scouting Scenarios";
        editConstraintButton.appendChild(editConstraintLink);
        dojo.connect(editConstraintButton, 'onclick', showConstraints);
        dojo.query("div.content_header div.subhead_link_bar")[0].appendChild(editConstraintButton);

        populateTeamsData();
        /*
            only show the start button if this replay hasnt already been
            parsed and saved with the current version
        */
        if (savedData[gameId] != null &&
            savedData[gameId].parserVersion != null &&
            savedData[gameId].parserVersion == parserVersion) {
            startParsing();
        } else {
            var br = document.createElement('br');
            dojo.query("#pbp div.medium_head")[0].appendChild(br);
    
            var downloadButton = document.createElement('input');
            downloadButton.id = "downloadButton";
            downloadButton.type="button";
            downloadButton.value = "Start Scouting";
            dojo.query("#pbp div.medium_head")[0].appendChild(downloadButton);
    
            var statusText = document.createElement('div');
            statusText.id = "statusText";
            statusText.className = "medium_head";
            dojo.query("#pbp div.medium_head")[0].appendChild(statusText);
    
            dojo.connect(downloadButton, 'onclick', startParsing);
        }
    });
}, 'false');

var constraintsShown = false;
function showConstraints() {
    if (!constraintsShown) {
        constraintsShown = true;
        dojo.query("#scoreboard")[0].style.display='none';
        dojo.query("#pbp")[0].style.display='none';
        refreshConstraintsList();
    }
}

function deleteConstraint(e) {
    var index = Number(e.target.innerHTML.split('>', 2)[1]);
    if (confirm('Delete ['+constraints[index].n+']?')) {
        constraints.splice(index, 1);
        saveConstraints();
        refreshConstraintsList();
    }
}

function resetSavedData() {
    if (confirm('Keeping too many games saved can cause issues with the script so it\'s a good idea to clear out the saved data occasionally.\n\nClick OK to clear out old games.\n\nNote this will not erase your Scouting Scenarios, just the scouted game data')) {
        resetReplayData()
    }
}

var isConstraintsDisplayConstructed = false;
function refreshConstraintsList() {
    if (!isConstraintsDisplayConstructed) {
        var container = document.createElement('div');

        var resetButton = document.createElement('input');
        resetButton.type = "button";
        resetButton.value = "Clear Saved Data";
        dojo.connect(resetButton, 'onclick', resetSavedData);
        container.appendChild(resetButton);

        var dataTotals = document.createElement('span');
        var gameCount = 0;
        for (k in savedData) {
            gameCount++;
        }
        dataTotals.innerHTML = "<br\><b>"+(gameCount-1)+" saved games</b>";
        container.appendChild(dataTotals);

        var tbody = document.createElement('tbody');
        tbody.id = "constraintsTbody";

        // constraints list
        var table = document.createElement('table');
        table.style.align="left";
        table.style.width="50%";
        table.appendChild(tbody);
        container.appendChild(table);

        var newCon = document.createElement('input');
        newCon.type = "button";
        newCon.value = "Create a new scenario";
        dojo.connect(newCon, 'onclick', addNewConstraint);
        container.appendChild(newCon);

        // constraints form
        var editConstraintDiv = document.createElement('div');
        editConstraintDiv.id = "editConstraintDiv";
        container.appendChild(editConstraintDiv);

        container.appendChild(document.createElement('br'));
        
        var parent = dojo.query("#content")[0];
        parent.insertBefore(container, dojo.query("#scoreboard")[0]);

        isConstraintsDisplayConstructed = true;
    }

    // clear out the current list
    var tbody = dojo.byId('constraintsTbody');
    if (tbody.hasChildNodes()) {
        while (tbody.childNodes.length >= 1) {
            tbody.removeChild( tbody.firstChild );       
        }
    }
    // fill it back in with current data
    // header
    var tr = document.createElement('tr');
    tr.className = "nonalternating_color";
    addCellTextToRow(tr, "Scouting Scenarios");
    tbody.appendChild(tr);
    // list of scenarios
    for (key in constraints) {
        var tr = document.createElement('tr');
        tr.className = "alternating_color1";

        var b = document.createElement('input');
        b.type = "radio";
        b.name = "editConstraint";
        b.value = key;
        addCellElementToRow(tr, b);
        dojo.connect(b, 'onclick', editConstraint);
        
        addCellTextToRow(tr, constraints[key].n);

        var upB = document.createElement('input');
        upB.type = "button";
        upB.value = "Move Up";
        upB.innerHTML = key;
        addCellElementToRow(tr, upB);
        dojo.connect(upB, 'onclick', moveScenarioUp);

        var downB = document.createElement('input');
        downB.type = "button";
        downB.innerHTML = key;
        downB.value = "Move Down";
        addCellElementToRow(tr, downB);
        dojo.connect(downB, 'onclick', moveScenarioDown);

        var delB = document.createElement('input');
        delB.type = "button";
        delB.innerHTML = key;
        delB.value = "Delete";
        addCellElementToRow(tr, delB);
        dojo.connect(delB, 'onclick', deleteConstraint);

        tbody.appendChild(tr);
    }
    // reset the filter form
    clearConstraintDiv();
}

function moveScenarioUp(e) {
    var index = Number(e.target.innerHTML.split('>', 2)[1]);
    if (index > 0) {
        var tmp = constraints[index];
        constraints.splice(index, 1);
        constraints.splice(index-1, 0, tmp);
        saveConstraints();
        refreshConstraintsList();
    }
}

function moveScenarioDown(e) {
    var index = Number(e.target.innerHTML.split('>', 2)[1]);
    if (index < (constraints.length-1)) {
        var tmp = constraints[index];
        constraints.splice(index, 1);
        constraints.splice(index+1, 0, tmp);
        saveConstraints();
        refreshConstraintsList();
    }
}

function addNewConstraint() {
    var newname = prompt('Enter a name for the new scenario\n\nThe page will refresh when the new scenario is created.');
    if (newname!=null) {
        if (newname=='') {
            alert("Can't have a blank scenario name");
        } else {
            constraints.push({
                n: newname,
                c: {}
            });
            saveConstraints();
            refreshConstraintsList();
        }
    }
}

/*
    refactored adding options in the filter dropdown
*/
function addFilterOption(ddl, filter) {
    var op = document.createElement('option');
    op.value = filter;
    op.innerHTML = filterTypeToString(filter);
    ddl.appendChild(op);
}
function addOperatorOption(ddl, operator) {
    var op = document.createElement('option');
    op.value = operator;
    op.innerHTML = opToString(operator);
    ddl.appendChild(op);
}

function addOption(ddl, value, text) {
    var op = document.createElement('option');
    op.value = value;
    op.innerHTML = text;
    ddl.appendChild(op);
}
/*
    redraw the list of filters for the selected constraint
*/
function refreshFilterList(constraintIndex) {
    clearConstraintDiv();
    // redraw
    var div = dojo.byId('editConstraintDiv');
    var tbody = document.createElement('tbody');
    tbody.id = 'constraintFilterList';
    var tr = document.createElement('tr');
    tr.className = "nonalternating_color";
    addCellTextToRow(tr, "Add filters to : "+constraints[currentEditConstraintIndex].n);
    tbody.appendChild(tr);
    var table = document.createElement('table');
    table.style.width="50%";
    table.appendChild(tbody);
    div.appendChild(table);

    div.appendChild(document.createElement('hr'));

    var newFilterDDL = document.createElement('select');
    newFilterDDL.id = "newFilterType";
    addFilterOption(newFilterDDL, "d");
    addFilterOption(newFilterDDL, "y");
    addFilterOption(newFilterDDL, "ye");
    addFilterOption(newFilterDDL, "q");
    addFilterOption(newFilterDDL, "t");
    addFilterOption(newFilterDDL, "r");
    addFilterOption(newFilterDDL, "p");
    addFilterOption(newFilterDDL, "pids");
    dojo.connect(newFilterDDL, 'onchange', filterTypeChanged);
    div.appendChild(newFilterDDL);

    newFilterDDL = document.createElement('select');
    newFilterDDL.id = "newFilterOperator";
    addOperatorOption(newFilterDDL, "e");
    addOperatorOption(newFilterDDL, "g");
    addOperatorOption(newFilterDDL, "l");
    addOperatorOption(newFilterDDL, "ge");
    addOperatorOption(newFilterDDL, "le");
    div.appendChild(newFilterDDL);

    var newFilterValueRunType = document.createElement('select');
    newFilterValueRunType.id = "newFilterValueRunType";
    addOption(newFilterValueRunType, 1, 'Pitch left');
    addOption(newFilterValueRunType, 2, 'Handoff left');
    addOption(newFilterValueRunType, 3, 'Up the middle');
    addOption(newFilterValueRunType, 4, 'Handoff right');
    addOption(newFilterValueRunType, 5, 'Pitch right');
    div.appendChild(newFilterValueRunType);

    var newFilterValuePassType = document.createElement('select');
    newFilterValuePassType.id = "newFilterValuePassType";
    addOption(newFilterValuePassType, 1, 'To the left');
    addOption(newFilterValuePassType, 2, 'To the middle');
    addOption(newFilterValuePassType, 3, 'To the right');
    div.appendChild(newFilterValuePassType);

    var newFilterValueInput = document.createElement('input');
    newFilterValueInput.id = "newFilterValue";
    newFilterValueInput.type = "text";
    div.appendChild(newFilterValueInput);

    var addFilterButton = document.createElement('input');
    addFilterButton.type = "button";
    addFilterButton.value = "Add Filter";
    dojo.connect(addFilterButton, 'onclick', addFilter);
    div.appendChild(addFilterButton);
    // start on text input
    showTextInput();

    for (filter in constraints[currentEditConstraintIndex].c) {
        for (operator in constraints[currentEditConstraintIndex].c[filter]) {
            addConstraintRow(filter, operator, constraints[currentEditConstraintIndex].c[filter][operator]);
        }
    }
}
var currentEditConstraintIndex = null;
/*
    radio button click handler
*/
function editConstraint() {
    currentEditConstraintIndex = this.value;
    refreshFilterList();
}

function filterTypeChanged() {
    switch (this.value) {
    case 'p':
        showPassTypes();
        break;
    case 'r':
        showRunTypes();
        break;
    case 'pids':
        showPlayerIdInput();
        break;
    default:
        showTextInput();
    }
}
function showPassTypes() {
    dojo.byId('newFilterValue').style.display = 'none';
    dojo.byId('newFilterValuePassType').style.display = '';
    dojo.byId('newFilterValueRunType').style.display = 'none';
    dojo.byId('newFilterOperator').style.display = 'none';
    dojo.byId('newFilterOperator').value = 'e';
}
function showRunTypes() {
    dojo.byId('newFilterValue').style.display = 'none';
    dojo.byId('newFilterValuePassType').style.display = 'none';
    dojo.byId('newFilterValueRunType').style.display = '';
    dojo.byId('newFilterOperator').style.display = 'none';
    dojo.byId('newFilterOperator').value = 'e';
}
function showPlayerIdInput() {
    dojo.byId('newFilterValue').style.display = '';
    dojo.byId('newFilterValuePassType').style.display = 'none';
    dojo.byId('newFilterValueRunType').style.display = 'none';
    dojo.byId('newFilterOperator').style.display = 'none';
    dojo.byId('newFilterOperator').value = 'e';
}
function showTextInput() {
    dojo.byId('newFilterOperator').style.display = '';
    dojo.byId('newFilterValue').style.display = '';
    dojo.byId('newFilterValuePassType').style.display = 'none';
    dojo.byId('newFilterValueRunType').style.display = 'none';
}

function addFilter() {
    var filterType = dojo.byId('newFilterType').value;
    var op = dojo.byId('newFilterOperator').value;
    if (filterType == 'p') {
        val = dojo.byId('newFilterValuePassType').value;
    } else if (filterType == 'r') {
        val = dojo.byId('newFilterValueRunType').value;
    } else if (filterType == 'pids') {
        val = dojo.byId('newFilterValue').value;
        op = "has";
    } else {
        val = dojo.byId('newFilterValue').value;
    }
    if (confirm("Add this filter to the scenario?") ) {
        if (currentEditConstraintIndex) {
            var con = {};
            if (constraints[currentEditConstraintIndex].c[filterType]) {
                con = constraints[currentEditConstraintIndex].c[filterType];
            }
            con[op] = val;
            constraints[currentEditConstraintIndex].c[filterType] = con;
            saveConstraints();
            //refreshConstraintsList();
            refreshFilterList();
        }
    }
}

function filterTypeToString(filterType) {
    switch (filterType) {
    case 'd':
        return "Down";
    case 'y':
        return "Yards to first down";
    case 'ye':
        return "Yards to endzone";
    case 'q':
        return "Quarter";
    case 't':
        return "Time left in the quarter (seconds)";
    case 'r':
        return "Run play";
    case 'p':
        return "Pass play";
    case 'pids':
        return "Player ID is on the field : ";
    default:
        console.log('unknown filter: '+filterType);
    }
}
/*
    return a string version of the operator
*/
function opToString(operator) {
    switch (operator) {
    case 'e':
        return "equals";
    case 'ge':
        return "greater than or equal to";
    case 'le':
        return "less than or equal to";
    case 'g':
        return "greater than";
    case 'l':
        return "less than";
    case 'has':
        return "";
    default:
        console.log('unknown operator: '+operator);
    }
}
/*
    clears out the edit constraint section
*/
function clearConstraintDiv() {
    var div = dojo.byId('editConstraintDiv');
    if (div.hasChildNodes()) {
        while (div.childNodes.length >= 1) {
            div.removeChild( div.firstChild );       
        }
    }
}
/*
    add a row to the list of filters on the constraint being editted
*/
function addConstraintRow(filter, op, value) {
    var list = dojo.byId('constraintFilterList');
    tr = document.createElement('tr');
    tr.className = "alternating_color1";

    addCellTextToRow(tr, filterTypeToString(filter)+" "+opToString(op)+" "+value);
    list.appendChild(tr);
}

/*
savedData - object, keyed by game id 
    <game id> - list of replays, starting at 0
        replay - object
            i - index of the play on the play by play screen
                prefix with 'play_' to get the id of the div for that replay
            f - object, formation data
                offTeamId
                defTeamId
                teShift
                offForm
                defform
            oi - index of the offensive team, either 1 or 2 D
            di - index of the defensive team, either 1 or 2 D
            q - quarter D
            t - time left in the quarter D
            d - down D
            y - yards to first down, if it's inches, this will be 0
            ye - yards to endzone D
            oto - timeouts left for the offense D
            dto - timeouts left for the defense D
            os - offense's current score D
            ds - defense's current score D
            pbp - pbp id of a link to the replay D
            r - run type D
                0 = not a run
                1 = pitch to the left
                2 = run to the left
                3 = run up the middle
                4 = run to the right
                5 = pitch to the right
            p - pass type D
                0 = not a pass
                1 = pass left
                2 = pass middle
                3 = pass right
                4 = unidentified pass (sack)
*/
function startParsing() {
    currentReplayIndexToParse = 0;
    if (savedData[gameId] != null &&
        savedData[gameId].parserVersion != null &&
        savedData[gameId].parserVersion == parserVersion) {
        displayData(true, true, true);

        //for (p in savedData[gameId]) {
        //    console.log(p+' : ', savedData[gameId][p]);
        //}
    } else {
        /*
            reset saved data and parse what we can from this page
        */
        var team0 = {};
        var team1 = {};

        savedData[gameId]=[];
        var currentQuarter = 0;
        team0.to = 3;
        team0.score = 0;
        team1.to = 3;
        team1.score = 0;
        var currentOffense = -1;// 0 or 1
        var replayRows = dojo.query("tbody", "play_by_play_table");
        for (var i = 0; i < replayRows.length; i++) {
            var replayData = {};
            var row = replayRows[i];
            /*
                keep track of which team is the current offense
            */
            if (getFirstMatch("tr.pbp_team td", row)) {
                // change of possession happened
                if (getData("tr.pbp_team td", row).indexOf(teams[0].name) >= 0) {
                    currentOffense = 0;
                } else {
                    currentOffense = 1;
                }
            }
            replayData.i = row.id.slice(5);
            replayData.oi = currentOffense;
            replayData.di = (currentOffense+1)%2;
            /*
                current score
            */
            if (replayData.oi == 0) {
                replayData.os = team0.score;
                replayData.ds = team1.score;
            } else {
                replayData.os = team1.score;
                replayData.ds = team0.score;
            }
            /*
                check for a change in the quarter
            */
            if (getFirstMatch("tr.pbp_quarter", row)) {
                currentQuarter++;
                if (currentQuarter == 3) {
                    // reset the timeouts for the half
                    team0.to = 3;
                    team1.to = 3;
                }
            }
            replayData.q = currentQuarter;
            /*
                time remaining in the quarter, convert it to seconds
            */
            var timeText = getData("td.pbp_time_remaining", row);
            var separator = timeText.search(/:/);
            var minutes = timeText.slice(0, separator);
            var seconds = timeText.slice(separator+1);
            replayData.t = Number(minutes)*60 + Number(seconds);

            /* 
                the down, yards to first down, and field position 
                these will be null for kickoffs
            */
            var down = getData("td.pbp_down", row);
            var fieldPosition = getData("td.pbp_marker", row);
            if (down && fieldPosition) {
                // down
                replayData.d = Number(down.slice(0,1));
                // yards to endzone
                if (fieldPosition.indexOf("OPP ") >= 0) {
                    replayData.ye = Number(fieldPosition.slice("OPP ".length));
                } else {
                    replayData.ye = 100 - Number(fieldPosition.slice("OWN ".length));
                }
                // yards to first down
                replayData.y = Number(down.slice(down.indexOf("&amp; ") + "&amp; ".length));
                if (isNaN(replayData.y)) {
                    if (down.slice(down.indexOf("&amp; ") + "&amp; ".length) == 'G') {
                        replayData.y = replayData.ye;
                    } else {
                        replayData.y = 0;
                    }
                }
            }
            /*
                pbp id
            */
            var replayLink = getFirstMatch("td.pbp_replay a", row);
            if (replayLink) {
                var replayHref = replayLink.href;
                replayData.pbp = replayHref.slice(replayHref.indexOf("pbp_id=")+"pbp_id=".length);
            }
            /*
                play text description
            */
            var playDesc = getData("td.pbp_play", row);
            /*
                timeouts
            */
            if (replayData.oi == 0) {
                replayData.oto = team0.to;
                replayData.dto = team1.to;
            } else {
                replayData.oto = team1.to;
                replayData.dto = team0.to;
            }
            var tmpi = playDesc.indexOf(" calls timeout");
            if (tmpi >= 0) {
                var teamCallingTO = playDesc.slice(0, tmpi);
                if (teamCallingTO == teams[0].name) {
                    team0.to = team0.to-1;
                } else {
                    team1.to = team1.to-1;
                }
            } else if (playDesc.indexOf("[FG]")>=0) {
                if (currentOffense == 0) {
                    team0.score = team0.score+3;
                } else {
                    team1.score = team1.score+3;
                }
            } else if (playDesc.indexOf("[TD]")>=0) {
                var patPts = 0;
                if (playDesc.indexOf("PAT made by ")>=0) {
                    patPts++;
                }
                if (currentOffense == 0) {
                    team0.score = team0.score+6+patPts;
                } else {
                    team1.score = team1.score+6+patPts;
                }
            }
            /*
            play call 
            */
            replayData.p = 0;
            replayData.r = 0;
            if (playDesc.indexOf("forced fumble") >= 0 ||
                playDesc.indexOf("intercepted by") >= 0) {
                /*
                if there was a turn over, dont bother counting it 
                TODO come up with a way to determine who called the offense on a turnover 
                */
            } else {
                if (playDesc.indexOf(" pass to ") >= 0) {
                    if (playDesc.indexOf("the left side") >=0 ) {
                        replayData.p = 1;
                    } else if (playDesc.indexOf("the right side") >=0 ) {
                        replayData.p = 3;
                    } else if (playDesc.indexOf("over the middle") >=0 ) {
                        replayData.p = 2;
                    }
                } else if (playDesc.indexOf("rush") >=0) {
                    if (playDesc.indexOf("to the right ") >= 0) {
                        replayData.r = 4;
                    } else if (playDesc.indexOf("to the left ") >= 0) {
                        replayData.r = 2;
                    } else if (playDesc.indexOf("up the middle") >= 0) {
                        replayData.r = 3;
                    }
                } else if (playDesc.indexOf("pitch") >= 0) {
                    if (playDesc.indexOf("to the right ") >= 0) {
                        replayData.r = 5;
                    } else {
                        replayData.r = 1;
                    }
                } else if (playDesc.indexOf("sacked by") >= 0) {
                    replayData.p = 4;
                }
            }
            /*
                dont keep track of play data for
                kickoffs
                timeouts
            */
            if ((playDesc.indexOf(" calls timeout") == -1) &&
                (playDesc.indexOf("Kickoff by") == -1) &&
                (playDesc.indexOf("Encroachment penalty committed by") == -1) &&
                (playDesc.indexOf("False start penalty committed by") == -1) &&
                (playDesc.indexOf("forced fumble") == -1) ||
                (playDesc.indexOf("intercepted by") == -1)) {
                // save it
                savedData[gameId][savedData[gameId].length] = replayData;
            }
            
        }
        /*
            start requesting replays
        */
        parseNextReplay();
    }
}

/*
utility method for finding the first match of the 
query and returning that dom object
*/
function getFirstMatch(queryString, domToQuery) {
    var tmp = dojo.query(queryString, domToQuery);
    if (tmp && tmp.length > 0) {
        return tmp[0];
    }
    return null;
}

/*
refactored utility method for finding the first match of the 
query and returning the innerHTML of that first match
*/
function getData(queryString, domToQuery) {
    var tmp = getFirstMatch(queryString, domToQuery);
    if (tmp) {
        return tmp.innerHTML;
    }
    return null;
}

function parseNextReplay() {
    if (currentReplayIndexToParse < savedData[gameId].length) {
        dojo.byId('statusText').innerHTML = "# of replays left to parse: " + (savedData[gameId].length-currentReplayIndexToParse);
        if (savedData[gameId][currentReplayIndexToParse].pbp) {
            dojo.xhrGet({
                url: "http://goallineblitz.com/game/replay.pl", 
                content : {game_id: gameId, pbp_id: savedData[gameId][currentReplayIndexToParse].pbp},
                load: parseSingleReplay,
                error : function() {},
                handleAs: "text"
            });
        } else {
            currentReplayIndexToParse++;
            parseNextReplay();
        }
    } else {
        dojo.byId('statusText').innerHTML = "- Done Parsing -";
        setTimeout(saveReplayData, 1000);
        // insert all of the data on the page
        displayData(true, true, true);
    }
}
function displayData(formations, playType, statTables) {
    if (formations) {
        displayFormations();
    }
    if (playType) {
        displayOffensiveTable(0);
        displayOffensiveTable(1);
    }
    if (statTables) {
        populateStats();
        displayDefensiveTable(0);
        displayDefensiveTable(1);
    }
}

function displayFormations() {
    for (rindex in savedData[gameId]) {
        var replay = savedData[gameId][rindex];
        if (replay.f) {
            var offenseMessage = "Offense: <b>" + offenses[replay.f.offForm];
            if (replay.f.teShift == 1) {
                offenseMessage += " w/ TE shift";
            }
            offenseMessage += "</b>";
            addScoutRow(replay.i, offenseMessage);
        
            var defenseMessage = "Defense: <b>" + defenses[replay.f.defForm];
            defenseMessage += "</b>";
    
            addScoutRow(replay.i, defenseMessage);
        }
    }

}

var offenses = ['Pro Set','Strong I','Weak I','I','Ace','Shotgun','5WR','GL','Big Ace','Trips','Kick Return','Punt Return','Spread','Big I'];
var defenses = ['4-3','3-4','4-2-5 Nickel (3 CBs)','3-3-5 Nickel (3 CBs)','4-1-6 Dime (4 CBs)','3-2-6 Dime (4 CBs)','3-1-7 Quarter (5 CBs)','Goal Line', 'Kickoff', 'Punt','4-4'];
function getDefensiveIndex(formation) {
    for (var i in defenses) {
        if (defenses[i] == formation) {
            return i;
        }
    }
    return null;
}

/*
times that the team ran a certain defense agaisnt the specific offense 
stats - list of
     team stats - object
        <defense formation id> - object
            <off. formation id> - object
                count - count of plays seen for this o and d pairing
        offCalls - object
*/
var stats = [];
function populateStats() {
    stats[0] = [];
    // initialize team 0
    for (d in defenses) {
        stats[0][d] = [];
        for (o in offenses) {
            stats[0][d][o] = {};
            stats[0][d][o].count = 0;
        }
    }
    // initialize team 1
    stats[1] = [];
    for (d in defenses) {
        stats[1][d] = [];
        for (o in offenses) {
            stats[1][d][o] = {};
            stats[1][d][o].count = 0;
        }
    }
    for (var replay in savedData[gameId]) {
        if (replay != "parserVersion" && savedData[gameId][replay].f) {
            var f = savedData[gameId][replay].f;
            var i = 0;
            if (f.defTeamId == teams[1].id) {
                i = 1;
            }
            stats[i][f.defForm][f.offForm].count++;
        }
    }   
}
function displayDefensiveTable(teamIndex) {
    var doc = unsafeWindow.document;
    var tbody = document.createElement('tbody');

    var tr = document.createElement('tr');
    tr.className = "nonalternating_color pbp_quarter";
    
    var td = document.createElement('td');
    if (teamIndex==0) {
        td.innerHTML = teams[0].name + " Def. vs";
    } else {
        td.innerHTML = teams[1].name + " Def. vs";
    }
    tr.appendChild(td);

    for (var o in offenses) {
        td = document.createElement('td');
        td.align = "center";
        td.innerHTML = offenses[o];
        tr.appendChild(td);
    }
    tbody.appendChild(tr);

    for (var d in stats[teamIndex]) {
        tr = document.createElement('tr');
        tr.className = "alternating_color" + ((d%2)+1) +" pbp_team";

        td = document.createElement('td');
        td.innerHTML = defenses[d];
        tr.appendChild(td);

        for (o in stats[teamIndex][d]) {
            td = document.createElement('td');
            td.align = "center";
            if (stats[teamIndex][d][o].count > 0) {
                td.innerHTML = stats[teamIndex][d][o].count;
            } else {
                td.innerHTML = ".";
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    var table = document.createElement('table');
    table.appendChild(tbody);

    var statsDiv = document.createElement('div');
    statsDiv.id = "statsDiv";
    statsDiv.className = "medium_head";
    statsDiv.appendChild(table);

    var parent = dojo.query("#pbp")[0];
    parent.insertBefore(statsDiv, parent.firstChild);
}

function parseSingleReplay(response, ioArgs) {
    var tmp = {};
    // pull out the offense team id
    response = response.slice(response.indexOf('team_id=') + 'team_id='.length);
    tmp.offTeamId = response.slice(0, response.indexOf('"'));

    // pull out the defense team id
    response = response.slice(response.indexOf('team_id=') + 'team_id='.length);
    tmp.defTeamId = response.slice(0, response.indexOf('"'));

    // pull out players data
    response = response.slice(response.indexOf('var players = '));
    var playersText = response.slice(0, response.indexOf('var play_data ='));
    if (!playersText) {
        playersText = "var players=[]";
    }
    eval(playersText);

    // pull out play_data
    response = response.slice(response.indexOf('var play_data = '));
    var playDataText = response.slice(0, response.indexOf(';')+1);
    if (!playDataText) {
        playDataText = "var play_data = {}";
    }
    eval(playDataText);
    if (play_data.length > 0) {
        var playerIds = getPlayerIdsByPosition(players);

        tmp.offForm = detectOffensiveFormation(playerIds, play_data);
        tmp.defForm = detectDefensiveFormation(playerIds, play_data);
        tmp.teShift = getTEShift(tmp.offForm, playerIds, play_data);
        
        if (savedData[gameId] == null) {
            savedData[gameId] = [];
        }
        savedData[gameId][currentReplayIndexToParse].f=tmp;
    } else {
        // it was a timeout
    }

    // keep a list of player ids
    var playerIdList = [];
    for (var pid in players) {
        playerIdList.push(pid);
    }
    savedData[gameId][currentReplayIndexToParse].pids=playerIdList;

    currentReplayIndexToParse++;
    parseNextReplay();
}

// add message under the row in the replay list
function addScoutRow(index, message) {
    var row = document.createElement('tr');
    var alternatingColor = ((Number(index)+1) % 2)+1;
    row.className = "alternating_color"+alternatingColor+" pbp_play_row";
    var col1 = document.createElement('td');
    col1.colSpan = 3;
    col1.className = "pbp_play";
    row.appendChild(col1);
    var col2 = document.createElement('td');
    col2.colSpan = 2;
    col2.className = "pbp_play";
    col2.innerHTML = message;
    row.appendChild(col2);
    dojo.query("#play_"+index)[0].appendChild(row);
}
/*
reorganize by position. so we can query 'what player id is at position X'. 
could be multiple people for a listed position so it's a map of lists
map 
    key : position
    value : list of playerIds
*/
function getPlayerIdsByPosition(players) {
    var newMap = {};
    for (x in players) {
        var p = players[x].position;
        if (newMap[p] != null) {
            newMap[p][newMap[p].length] = x;
        } else {
            var newList = [];
            newList[0] = x;
            newMap[p] = newList;
        }
    }
    return newMap;
}

// detect formation by positions on the field and placement of the positions
function detectOffensiveFormation(playerIdsByPosition, pd) {
    var hasWR5 = false;
    var hasWR4 = false;
    var hasBTE = false;
    var has3TE = false;
    var hasHB = false;
    var hasFB = false;
    var hasK = false;
    var hasP = false;
    var countTE = 0;

    if (playerIdsByPosition['WR5'] != null) {
        hasWR5 = true;
    }
    if (playerIdsByPosition['WR4'] != null) {
        hasWR4 = true;
    }
    if (playerIdsByPosition['BTE'] != null) {
        countTE = playerIdsByPosition['BTE'].length;
    }
    if (playerIdsByPosition['TE'] != null) {
        countTE = playerIdsByPosition ['TE'].length;
    }
    if (playerIdsByPosition['FB'] != null) {
        hasFB = true;
    }
    if (playerIdsByPosition['HB'] != null) {
        hasHB = true;
    }
    if (playerIdsByPosition['P'] != null) {
        hasP = true;
    }
    if (playerIdsByPosition['K'] != null) {
        hasK = true;
    }
    var formation = "Unknown";
    if (hasP) {
        formation = 11;
    } else if (hasK) {
        formation = 10;
    } else if (hasWR4) {
	formation = 12
    } else if (hasWR5) {
        formation = 6;
    } else if (countTE == 3) {
        formation = 7;
    } else if (countTE == 2) {
        formation = 8;
    } else if (hasHB && !hasFB) {
        // Shotgun or Singleback
        var qbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['QB'][0]);
        //season 10 change, ball now starts in the QB's hands for shotgun screen
        if (qbDelta.y > 7 || qbDelta.y < -7) {
            formation = 5;
        } else {
            formation = 4;
        }
    } else {
        // I / Weak I / Strong I / Pro Set
        var fbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FB'][0]);
    	if (fbDelta.y < 0) {
    		// offense heading north
    		if (fbDelta.y <= -10) {
	            formation = 0;
        	} else if (fbDelta.x <= -3) {
	            formation = 1;
        	} else if (fbDelta.x >= 3) {
	            formation = 2;
        	} else {
	            formation = 3;
    		}
    	} else {
    		// offense heading south
    		if (fbDelta.y >= 10) {
	            formation = 0;
        	} else if (fbDelta.x >= 3 ) {
	            formation = 1;
        	} else if (fbDelta.x <= -3) {
	            formation = 2;
        	} else {
	            formation = 3;
    		}
    	}
    }
    return formation;
}

/*
returns 1 if the te was shifted left
*/
function getTEShift(f, playerIdsByPosition, pd) {
    if (f >= 0 && f <= 5) {
        var teDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['TE'][0]);
        var cDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['C'][0]);
        if ((cDelta.y < 0 && teDelta.x < 0) || (cDelta.y > 0 && teDelta.x > 0)) {
            return 1;
        }
    }   
    return 0;
}

function getPositionLocationRelativeToBall(playData, playerId) {
    var ballLoc = {};
    var posLoc = {};
    for (var i=0; i < playData[0].length; i++) {
        if (playData[0][i].id == 'ball') {
            ballLoc.x = playData[0][i].x;
            ballLoc.y = playData[0][i].y;
        } else if (playData[0][i].id == playerId) {
            posLoc.x = playData[0][i].x;
            posLoc.y = playData[0][i].y;
        }
    }
    if (posLoc.x == null) {
        console.log('didnt find position for playerId '+playerId);
    }
    return {x: ballLoc.x-posLoc.x, y: ballLoc.y-posLoc.y};
}

/*
takes in an array of players taken from the replay screen
*/
function detectDefensiveFormation(playerIdsByPosition, pd) {
    var isDT = false;
    var is5CB = false;
    var is4CB = false;
    var is3CB = false;
    var is1FS = false;
    var isKR = false;
    var isPR = false;
    var isLILB = false;
    if (playerIdsByPosition['LILB'] != null) {
        isLILB = true;
    }
    if (playerIdsByPosition['DT'] != null) {
        isDT = true;
    }
    if (playerIdsByPosition['CB5'] != null) {
        is5CB = true;
    }
    if (playerIdsByPosition['CB4'] != null) {
        is4CB = true;
    }
    if (playerIdsByPosition['CB3'] != null) {
        is3CB = true;
    }
    if (playerIdsByPosition['FS'] != null) {
        is1FS = true;
    }
    if (playerIdsByPosition['P'] != null) {
        isPR = true;
    }
    if (playerIdsByPosition['K'] != null) {
        isKR = true;
    }
    var formation = '';
    if (isKR) {
        formation = 8;
    } else if (isPR) {
        formation = 9;
    } else if (!is1FS) {
        formation = 7;
    } else if (is5CB) {
        formation = 6;
    } else if (isDT) {
        if (is4CB) {
            formation = 4;
        } else if (is3CB) {
            formation = 2;
        } else if (isLILB) {
            formation = 10;
        } else {
            formation = 0;
        }
    } else {
        if (is4CB) {
            formation = 5;
        } else if (is3CB) {
            formation = 3;
        } else {
            formation = 1;
        }
    }
    return formation;
}

function displayOffensiveTable(teamIndex) {
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    addCellTextToRow(tr, teams[teamIndex].name+" offensive plays calls (Run | Pass)", offenses.length-2+1);
    tbody.appendChild(tr);
    tr = document.createElement('tr');
    tr.className = "nonalternating_color pbp_quarter";
    addCellTextToRow(tr, "Scenario");
    // header row for offensive scenarios
    for (var o in offenses) {
        // dont bother with kickoffs
        if (o != 9 && o != 10) {
            addCellTextToRow(tr, offenses[o]);
        }
    }
    tbody.appendChild(tr);
    
    var toggle = 0;
    for (i in constraints) {
        addScenarioRow(tbody, (toggle++)%2, teamIndex, i);
    }

    var table = document.createElement('table');
    table.appendChild(tbody);

    var statsDiv = document.createElement('div');
    statsDiv.className = "medium_head";
    statsDiv.appendChild(document.createElement('br'));
    statsDiv.appendChild(table);

    var linkTable = document.createElement('table');
    linkTable.id = 'linkTable'+teamIndex;
    statsDiv.appendChild(linkTable);

    statsDiv.appendChild(document.createElement('br'));
    statsDiv.appendChild(document.createElement('hr'));
    statsDiv.appendChild(document.createElement('br'));

    var parent = dojo.query("#pbp")[0];
    parent.insertBefore(statsDiv, parent.firstChild);
}

/*
    returns true if all constraints pass 
     
    the constraints object is a collection of single value constraints 
    a single value constraint is an object with one member, the key is the operator 
    for the boolean expression of the constraint, the value of that member to be 
    compared in the expression 
*/
function checkConstraints(replay, constraints) {
    for (param in replay) {
        if (constraints[param]) {
            for (operator in constraints[param]) {
                switch (operator) {
                case 'has':
                    // return true if the constraint's value exists in the list
                    var found = false;
                    for (var item in replay[param]) {
                        if (replay[param][item] == constraints[param].has) {
                            found = true;
                        }
                    }
                    if (!found) {
                        return false;
                    }
                    break;
                case 'e':
                    if (replay[param] != constraints[param].e) {
                        return false;
                    }
                    break;
                case 'l':
                    if (replay[param] >= constraints[param].l) {
                        return false;
                    }
                    break;
                case 'g':
                    if (replay[param] <= constraints[param].g) {
                        return false;
                    }
                    break;
                case 'ge':
                    if (replay[param] < constraints[param].ge) {
                        return false;
                    }
                    break;
                case 'le':
                    if (replay[param] > constraints[param].le) {
                        return false;
                    }
                    break;
                default :
                    console.log('bad constraint',constraints[param]);
                }
            }
        }
    }
    return true;
}

/*
    pass in a function that uses the replay data to determine if the 
    given replay matches the desired scenario
 
    tbody: tbody element where the row will be appended
    color: 0 or 1
    constraints: constraints object
*/
function addScenarioRow(tbody, color, teamIndex, constraintIndex) {
    var scenarioLabel = constraints[i].n;
    var rowConstraints = constraints[i].c;

    var breakdown = {};
    for (var o in offenses) {
        breakdown[o] = {};
        breakdown[o].run = 0;
        breakdown[o].pass = 0;
    }
    for (replayIndex in savedData[gameId]) {
        var tmp = savedData[gameId][replayIndex];
        if (tmp.f && (tmp.f.offForm >= 0) && tmp.oi == teamIndex && checkConstraints(tmp, rowConstraints)) {
            if (tmp.r > 0) {
                breakdown[tmp.f.offForm].run = breakdown[tmp.f.offForm].run + 1;
            } else if (tmp.p > 0) {
                breakdown[tmp.f.offForm].pass = breakdown[tmp.f.offForm].pass + 1;
            } else {
                // not counted, probably a turn over or a punt return by the offense
            }
        }
    }
    var tr = makeTableRow(color);
    addCellTextToRow(tr, scenarioLabel);
    for (var o in offenses) {
        // ignore kick returns
        if (o != 9 && o!= 10) {
            if ((breakdown[o].run + breakdown[o].pass) > 0) {
                var contents = document.createElement('div');
                // add run button
                run = dojo.doc.createElement('input');
                run.name = "replayDisplay"+teamIndex;
                run.type = "radio";
                if (breakdown[o].run == 0) {
                    run.disabled = true;
                }
                //have to do it this way because of FF 3.5 :(
                run.value = teamIndex + ":1:" + o + ":" + constraintIndex;
                contents.appendChild(run);

                // add the run and pass totals
                var divider = document.createElement('span');
                divider.innerHTML = "&nbsp;"+breakdown[o].run+" | "+breakdown[o].pass+"&nbsp;";
                contents.appendChild(divider);

                // add pass button
                var pass = document.createElement('input');
                pass.name="replayDisplay"+teamIndex;
                pass.type="radio";
                if (breakdown[o].pass == 0) {
                    pass.disabled = true;
                }
                pass.value = teamIndex + ":0:" + o + ":" + constraintIndex;
                contents.appendChild(pass);

                addCellElementToRow(tr, contents);

                pass.addEventListener("click", displayScenarioLinks, true);
                run.addEventListener("click", displayScenarioLinks, true);
            } else {
                addCellTextToRow(tr, ".");
            }
        }
    }
    tbody.appendChild(tr);
}

/*
    display links of the selected scenario/formation
*/
function displayScenarioLinks() {
    var args = this.value.split(':');
    var ti = Number(args[0]);
    var ir = (args[1]=="1") ? true : false;
    var o = Number(args[2]);
    var constraint = Number(args[3]);
    var sl = constraints[constraint].n;

    var table = dojo.query("#linkTable"+ti)[0];

    //clear out the table
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    var tbody = document.createElement('tbody');

    tr = document.createElement('tr');
    tr.className = "nonalternating_color pbp_quarter";
    addCellTextToRow(tr, teams[ti].name+" replays "+sl+" | "+offenses[o]+" | "+((ir)?"Run plays":"Pass plays"));
    tbody.appendChild(tr);

    for (replayIndex in savedData[gameId]) {
        var tmp = savedData[gameId][replayIndex];
        if (tmp.f && (tmp.f.offForm>=0) && tmp.oi == ti && tmp.f.offForm==o && checkConstraints(tmp, constraints[constraint].c)) {
            if ((tmp.r > 0 && ir) || (tmp.p > 0 && !ir)) {
                // TODO add the quarter, score, TOs
                // just copy the row from the page for now
                var result = dojo.query("#play_"+tmp.i+" tr.pbp_play_row_scoring");
                if (result.length == 0) {
                    // not a TD, check if it was a turnover class
                    result = dojo.query("#play_"+tmp.i+" tr.pbp_play_row_turnover");
                    if (result.length == 0) {
                        // not a TD or turnover, search on the regular style
                        result = dojo.query("#play_"+tmp.i+" tr.pbp_play_row");
                    }
                }
                tbody.appendChild(result[0].cloneNode(true));
            }
        }
    }
    table.appendChild(tbody);
}

function makeTableRow(alternateColor) {
    var tr = document.createElement('tr');
    if (alternateColor == 0) {
        tr.className = "alternating_color1 pbp_team";
    } else {
        tr.className = "alternating_color2 pbp_team";
    }
    return tr;
}

function addCellTextToRow(row, cellText, colSpan) {
    var td = document.createElement('td');
    td.innerHTML = cellText;
    td.align = "center";
    td.colSpan = colSpan;
    row.appendChild(td);
}

function addCellElementToRow(row, cellElement, colSpan) {
    var td = document.createElement('td');
    td.appendChild(cellElement);
    td.align = "center";
    td.colSpan = colSpan;
    row.appendChild(td);
}