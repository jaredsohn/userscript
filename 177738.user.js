// ==UserScript==
// @name       showFullScores_ffl_scoreboard
// @namespace  ffl
// @version    0.1
// @description  Shows the full score totals (to two decimal places) in the Boxscore & Scoreboard pages of ESPN Fantasy Football league
// @match      *://games.espn.go.com/ffl/boxscore*
// @match      *://games.espn.go.com/ffl/scoreboard*
// @copyright  2013, greaTS!
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var fantasyFix = fantasyFix || {};

fantasyFix.isGameTime = function(){
	var d = new Date(),
        utcDay = d.getUTCDay(),
        hour = (d.getUTCHours() - 4)%24,
        minute = d.getUTCMinutes(),
        estTime = (hour < 0 ) ? hour + 24 : hour,
        dayOfWeek = (hour < 0 ) ? utcDay - 1 : utcDay;
    return (dayOfWeek === 0 && estTime >= 13)
        || (dayOfWeek === 1 && estTime <= 1)          
        || (dayOfWeek === 1 && ((estTime === 20 && minute >= 25) || (estTime > 20) ))
        || (dayOfWeek === 2 && estTime <= 1)
        || (dayOfWeek === 4 && ((estTime === 20 && minute >= 25) || (estTime > 20) ))
        || (dayOfWeek === 5 && estTime <= 1);
        
};

fantasyFix.curUrl = window.location.href;
fantasyFix.isBoxscore = function(){ 
    return fantasyFix.curUrl.indexOf('boxscore') != -1;
};
fantasyFix.classSelector = fantasyFix.isBoxscore() ? '.totalScore' : '.score';

fantasyFix.getAllScoreItems = function(){
    return $(fantasyFix.classSelector);
};

fantasyFix.getLatestScore = function(isBox){
    $.ajax({
        url: fantasyFix.curUrl,
        type: 'GET'
    }).done(function(data){
		var initialScoreItems = fantasyFix.getAllScoreItems(); 
        var docReturned = $(data);
        var newScores = $(fantasyFix.classSelector, docReturned);

        $.each(newScores, function(index, item) {
            var score = $(item).prop('title');
            $(initialScoreItems[index]).text(score);
        });
    });
};

fantasyFix.updateLive = function(){
    if (fantasyFix.isGameTime()){      
        fantasyFix.getLatestScore(fantasyFix.isBoxscore());
        setTimeout(function(){
            fantasyFix.updateLive();
        }, 300);
    } else {
        fantasyFix.getLatestScore(fantasyFix.isBoxscore());
    }
};
$(document).ready(function(){
    fantasyFix.updateLive();
});