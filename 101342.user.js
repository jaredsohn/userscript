// ==UserScript==
// @name           Tantrix Tournament Page Easy Submit
// @namespace      http://cbix.de/
// @description    With this script activated you only have to enter the names and the rest is automatically filled in.
// @include        http://www.tantrix.com/tournaments/index.php?page=sendresult*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

// Make jQuery selector case insensitive:
jQuery.expr[':'].Contains = function(a, i, m) { 
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
matchingGames = new Array(); // Array for possible recent games
currentData = null; // currently used game data object
var codeRegEx = /^[A-Z]*T[A-Z]*\!/;
var langStrings = {
	headline: ' - assisted by AutoFill Script<br />by <a href="http://cbix.de" target="_blank">flohuels</a> with jQuery ',
	fetch: 'Fetch results',
	notNeeded: 'not needed',
	notFetched: 'Please do result fetching first!',
	fullReset: 'Full Reset',
	prepare: 'Prepare for<br/>next game',
	notFound: 'No matching results found',
	matching: 'Matching results',
	swap: 'swap players',
    tp: 'Tournament points including time penalties',
    tp2: 'Tournament points without time penalties'
};
// tpShedule as of 2012/05:
var tpShedule = [10.0, 13.3, 13.9, 14.3, 14.7, 15.0, 15.3, 15.5, 15.8, 16.0, 16.2, 16.4, 16.6, 16.8, 17.0, 17.2, 17.3, 17.5, 17.7, 17.8, 18.0, 18.1, 18.3, 18.4, 18.5, 18.7, 18.8, 18.9, 19.1, 19.2, 19.3, 19.4, 19.5, 19.7, 19.8, 19.9, 20.0];

function ttmMarginToTP(diff) {
    var margin = Math.abs(diff);
    if(margin >= tpShedule.length) {
        margin = tpShedule.length - 1;
    }
    if(diff < 0) {
        return 20 - tpShedule[margin];
    } else {
        return tpShedule[margin];
    }
}

function gameDataFromTableRow(tr, player1) {
    if($(tr).size() == 0) return false;
    gameData = {};
    // get relevant data from tantrix.com table
    var name1 = $.trim($(tr).children('td:eq(1)').text());
    var time1 = parseInt($(tr).children('td:eq(3)').text(), 10);
    var score1 = parseInt($(tr).children('td:eq(2)').text(), 10);
    var color1 = ""+$(tr).children('td:eq(2)').children('img').attr('src')[7];
    var name2 = $.trim($(tr).children('td:eq(4)').text().substr(6));
    var time2 = parseInt($(tr).children('td:eq(6)').text(), 10);
    var score2 = parseInt($(tr).children('td:eq(5)').text(), 10);
    var color2 = ""+$(tr).children('td:eq(5)').children('img').attr('src')[7];
    gameData = {gameCode: $.trim($(tr).children('td').eq(-2).text())};
    if(name1.toUpperCase() == player1.toUpperCase() || player1 == '*') {
        // if player 1 in submit form equals player 1 in tantrix.com list
        gameData.name = [name1, name2];
        gameData.time = [time1, time2];
        gameData.score = [score1, score2];
        gameData.color = [color1, color2];
    } else if(name2.toUpperCase() == player1.toUpperCase()) {
        // if player 1 in submit form equals player 2 in tantrix.com list
        gameData.name = [name2, name1];
        gameData.time = [time2, time1];
        gameData.score = [score2, score1];
        gameData.color = [color2, color1];
    } else {
        // tr must be wrong now
        return false;
    }
    // calculate TP
    gameData.updateTP = function() {
        var rawTP1 = ttmMarginToTP(this.score[0] - this.score[1]);
        var tp1 = Math.min(Math.max(rawTP1 + (this.time[0] >= 15.0 ? 14.0 - this.time[0] : 0.0) - (this.time[1] >= 15.0 ? 14.0 - this.time[1] : 0.0), 0.0), 20.0);
        this.rawTP = [rawTP1, 20.0 - rawTP1];
        this.tp = [tp1, 20.0 - tp1];
    };
    gameData.swap = function() {
		this.name[1] = this.name.shift();
		this.time[1] = this.time.shift();
		this.score[1] = this.score.shift();
		this.color[1] = this.color.shift();
        this.tp[1] = this.tp.shift();
        this.rawTP[1] = this.rawTP.shift();
		return this;
	};
    gameData.updateTP();
    return gameData;
}

function fillFormByData(data) {
    if(!data) return;
    $('input[name=player1]').val(data.name[0]);
    $('input[name=player2]').css('color', '#000000').val(data.name[1]);
    $('select[name=colour1]').children('option[value='+data.color[0]+']').attr("selected", "selected");
    $('select[name=colour2]').children('option[value='+data.color[1]+']').attr("selected", "selected");
    if(!isNaN(data.score[0])) $('input[name=tiles1]').val(data.score[0]);
    if(!isNaN(data.score[1])) $('input[name=tiles2]').val(data.score[1]);
    if(!isNaN(data.time[0])) $('#time1').val(data.time[0]);
    if(!isNaN(data.time[1])) $('#time2').val(data.time[1]);
    $('input[name=gameid]').val(data.gameCode);
    $('#filledTPScore').text("" + data.tp[0].toFixed(1) + " : " + data.tp[1].toFixed(1));
    if(data.tp[0] == data.rawTP[0]) {
        $('#rawTPScore').text("");
    } else {
        $('#rawTPScore').text("(" + data.rawTP[0].toFixed(1) + " : " + data.rawTP[1].toFixed(1) + ")");
    }
}

$(document).ready(function(){
	// localizing strings:
	switch($('select[name=lang] > option:selected').val()) {
		default:
		case 'hu':  // please send french or hungarian translations to fh@cbix.de - thanks!!
		case 'fr':
			$.extend(langStrings, {
				headline: ' - assisted by AutoFill Script<br />by <a href="http://cbix.de" target="_blank">flohuels</a><br /><small>If you would like to translate the text of the script, please <a href="mailto:fh@cbix.de">write me</a>!</small> - jQuery '
			});
			break;
		case 'en': break;
		case 'de': 
			langStrings = {
				headline: ' - mit Unterstützung durch das<br />AutoFill-Script von <a href="http://cbix.de" target="_blank">flohuels</a> mit jQuery ',
				fetch: 'Ergebnisse abrufen',
				notNeeded: 'nicht erforderlich',
				notFetched: 'Bitte zuerst Ergebnisse abrufen!',
				fullReset: 'zurücksetzen',
				prepare: 'Für nächstes<br />Spiel vorbereiten',
				notFound: 'Keine passenden Ergebnisse gefunden',
				matching: 'Passende Ergebnisse',
				swap: 'Spieler tauschen',
                tp: 'Turnierpunkte mit Zeitstrafen',
                tp2: 'Turnierpunkte ohne Zeitstrafen'
			};
			break;
	}

    // add jQuery Version info to headline
    $('td.pagehead').html($('td.pagehead').text() + langStrings.headline + $().jquery);
    //show button to swap players
    $('input[name=player1]').after('&nbsp;<input type="button" id="swapButton" value="&harr;" disabled title="' + langStrings.swap + '">').parent('td').css('white-space', 'nowrap');
    //show button to fill the form
    $('input[name=player2]').val(langStrings.notNeeded).css('color', '#8E8E8E').after('<input type="button" id="fillButton" value="' + langStrings.fetch + '">').parent('td').parent('tr').after('<tr><td><b>' + langStrings.matching + ':</b></td><td colspan="2" style="text-align: left;"><select id="resultSelect"><option disabled selected>' + langStrings.notFetched + '</option></select></td></tr>');
    //show buttons to clear the form or to prepare it for next game (increment game number, keep names/tournament/...)
    $('input[name=submit]').after('&nbsp;&nbsp;<input type="button" id="resetButton" value="' + langStrings.fullReset + '"><br/><br/><button id="nextGameButton" value="nextGame"><span>' + langStrings.prepare + '</span></button>');
    //block for TP score
    $('<span id="filledTPScore" title="' + langStrings.tp + '"></span><span id="rawTPScore" title="' + langStrings.tp2 + '"></span>').css({'margin-left':'10px'}).insertAfter('input[name=tiles1]');
    //onclick handler
    $('#fillButton').click(function(){
        var player1 = $('input[name=player1]').val();
        $('#fillButton').val('...').attr('disabled', true);
        $.get(
            "/cgi-bin/gs_Rgame_results.csh",
            {n: 50},
            function(response) {
                var table = $(response).find('table[width=759]')[1];
                // entry is an array with all TD elements of this player's games among the last 50 games over all
                var entry;
                if(player1 != "") {
					entry = $(table).find('td:Contains('+player1+')').parent('tr:Contains(Vs.)');
				} else {
                    entry = $(table).find('td:Contains(Vs.)').parent('tr');
                    player1 = '*';
                }
                matchingGames = new Array();
                if($(entry).length > 0) $('#resultSelect').empty();
                $(entry).each(function(i, e) {
                    var data = gameDataFromTableRow($(this), player1);
                    if(!data) return;
                    matchingGames[i] = data;
                    $('<option value="'+i+'">'+data.gameCode+'</option>').css('font-weight', (codeRegEx.test(data.gameCode) ? 'bold' : 'normal')).appendTo('#resultSelect');
                });
                // finally fill in the form elements:
                if(matchingGames.length == 0) {
                    $('#resultSelect').empty().append('<option disabled selected>' + langStrings.notFound + '</option>');
                    currentData = null;
                    $('#swapButton').attr('disabled', true);
                } else {
					currentData = $.extend({}, matchingGames[0]);
                    fillFormByData(currentData);
                    $('#swapButton').attr('disabled', false);
                }
                $('#fillButton').val(langStrings.fetch).attr('disabled', false);
            },
            "html"
        );
    });
    $('#resultSelect').change(function() {
		currentData = $.extend({}, matchingGames[$('#resultSelect option:selected').val()]);
        fillFormByData(currentData);
    });
    $('#swapButton').click(function() {
		if(currentData != null) {
			fillFormByData(currentData.swap());
		}
	});
    $('#resetButton').click(function(){
        $('input[type=Text]').val('');
        $('select[name!=outof] option:first-child').attr('selected', 'selected');
        currentData = null;
        $('#filledTPScore,#rawTPScore').text('');
        $('#swapButton').attr('disabled', true);
    });
    $('#nextGameButton').click(function(){
        $('input[name^=tiles],input[name^=time],input[name=gameid]').val('');
        if($('select[name=game_num] option:selected').val() < $('select[name=outof] option:selected').val()) {
            // if not maximum game number
            $('select[name=game_num] option:selected').next('option').attr('selected', 'selected');
        } else {
            // it's likely that the match is over so we start a new one
            $('select[name=game_num] option:first').attr('selected', 'selected');
            $('input[name=player2]').val(langStrings.notNeeded).css('color', '#8E8E8E');
        }
        currentData = null;
        $('#filledTPScore,#rawTPScore').text('');
        $('#swapButton').attr('disabled', true);
    });
    $('input[name^=tiles],input[name^=time]').keyup(function() {
        if(currentData != null) {
			currentData.score = new Array(parseInt($('input[name=tiles1]').val()), parseInt($('input[name=tiles2]').val()));
            currentData.time = new Array(parseInt($('#time1').val()), parseInt($('#time2').val()));
            currentData.updateTP();
            fillFormByData(currentData);
		}
    });
});
