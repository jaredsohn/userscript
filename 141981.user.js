// ==UserScript==
// @name          Klavogonki: daily scores
// @namespace     klavogonki
// @version       2.2
// @description   displays the gained daily scores on the user panel
// @include       http://klavogonki.ru/*
// @author        Lexin
// @updateURL     https://userscripts.org/scripts/source/141981.meta.js
// @downloadURL   https://userscripts.org/scripts/source/141981.user.js
// ==/UserScript==

function main(){

    var daily_scores = 0;
    var daily_scores_deducted = 0;
    var race_scores = 0;
    var daily_scores_start_rating = 0;
    var daily_scores_last_level = 0;
    var daily_scores_last_levels_rating = 0;
    var daily_scores_start_level_rating = 0;
    var daily_scores_rating = 0;
    var daily_scores_last_rating_gmid = 0;
    
    function shiftTime(date){
        date.setUTCHours(date.getUTCHours() - 1);
        date.setUTCMinutes(date.getUTCMinutes() - 30);
        return date;
    }
    
    function isToday() {
        if (!localStorage['last_race_date']) {
        	return false;
        }
        
        var lastRaceDate = new Date();
        lastRaceDate.setTime(localStorage['last_race_date']);
        lastRaceDate = shiftTime(lastRaceDate); 
        
        var now = shiftTime(new Date());
        return lastRaceDate.getUTCFullYear() === now.getUTCFullYear() 
        	&& lastRaceDate.getUTCMonth() === now.getUTCMonth() 
            && lastRaceDate.getUTCDate() === now.getUTCDate();
    }
    
    function getCurrentRating() {
        var s = $('userpanel-level');
        s = s.hasAttribute('original-title') ? s.getAttribute('original-title') : s.getAttribute('title');
        var re = /\d+/g; 
        var value = re.exec(s); 

        return parseInt(value, 10);
    }
    
    function getCurrentLevelRating() {
        var s = $('userpanel-level');
        s = s.hasAttribute('original-title') ? s.getAttribute('original-title') : s.getAttribute('title');
        var re = /\d+/g; 
        var value = re.exec(s); 
        value = re.exec(s); 

        return parseInt(value, 10);
    }
    
    function getCurrentLevel() {
        s = $('userpanel-level-value').innerHTML;
        return parseInt(s, 10);
    }
    
    function getDailyRating() {
        var currentLevel = getCurrentLevel();

        if (currentLevel > daily_scores_last_level) {
            daily_scores_last_levels_rating += getCurrentLevelRating();
            daily_scores_last_level = currentLevel;
        }    
        return daily_scores_last_levels_rating - getCurrentLevelRating() - daily_scores_start_rating + getCurrentRating();
    }
    
    function getFormattedNumber(value) {
        return ((value > 0) ? '+' : '') + value;
    }
    
    function updatePanel() {
        nodeCaption.innerHTML = '<span id="daily-scores-caption" style="padding-left:5px;">За день:</span>';
        nodeDailyScoresValue.id = 'daily-scores';
        nodeDailyScoresValue.setAttribute('style','color:#B7FFB3; font-weight:bold; font-size:14px;');
        nodeDailyScoresValue.innerHTML = (daily_scores ? '+' : '') + daily_scores;
        
        nodeDailyScoresDeductedValue.id = 'daily-scores-deducted';
        nodeDailyScoresDeductedValue.setAttribute('style','color:#B7FFB3; font-weight:bold; font-size:14px;');
        if (daily_scores_deducted) {
            nodeDailyScoresDeductedValue.innerHTML = '-' + daily_scores_deducted;
        }
    
        nodeRatingCaption.innerHTML = '<span id="daily-rating-caption" style="padding-left:5px;">Рейтинг:</span>';
        nodeDailyRating.id = 'daily-rating';
        nodeDailyRating.setAttribute('style', 'text-align: left;');
        nodeDailyRatingValue.setAttribute('style','color:#F9DD80; font-weight:bold; font-size:14px;');
        
        nodeDailyRatingValue.innerHTML = getFormattedNumber(getDailyRating());
            
        nodeDailyScores.appendChild(nodeDailyScoresValue);
        nodeDailyScoresDeducted.appendChild(nodeDailyScoresDeductedValue);
        scores.parentNode.appendChild(nodeCaption);
        scores.parentNode.appendChild(nodeDailyScores);
        scores.parentNode.appendChild(nodeDailyScoresDeducted);

        nodeDailyRating.appendChild(nodeDailyRatingValue);
        bonus.parentNode.appendChild(nodeRatingCaption);
        bonus.parentNode.appendChild(nodeDailyRating);
    }
    
    var scores = $('userpanel-scores-container');
    var bonus = $('userpanel-bonuses');

    if (!scores)
        return;
    
    var nodeCaption = document.createElement('td');
    var nodeDailyScores = document.createElement('td');
    var nodeDailyScoresValue = document.createElement('span');
    var nodeDailyScoresDeducted = document.createElement('td');
    var nodeDailyScoresDeductedValue = document.createElement('span');
    var nodeRatingCaption = document.createElement('td');
    var nodeDailyRating = document.createElement('td');
    var nodeDailyRatingValue = document.createElement('span');
        
    if (isToday()) {
	    if (localStorage['daily_scores']) {    
            daily_scores = parseInt(localStorage['daily_scores'], 10);
        }
        if (localStorage['daily_scores_deducted']) {
            daily_scores_deducted = parseInt(localStorage['daily_scores_deducted'], 10);
        }
        if (localStorage['daily_scores_start_rating']) {
        	daily_scores_start_rating = parseInt(localStorage['daily_scores_start_rating'], 10);
        }
        if (localStorage['daily_scores_last_level']) {
        	daily_scores_last_level = parseInt(localStorage['daily_scores_last_level'], 10);
        }
        if (localStorage['daily_scores_last_levels_rating']) {
        	daily_scores_last_levels_rating = parseInt(localStorage['daily_scores_last_levels_rating'], 10);
        }
        if (localStorage['daily_scores_start_level_rating']) {
        	daily_scores_start_level_rating = parseInt(localStorage['daily_scores_start_level_rating'], 10);
        }
    }

    if (localStorage['daily_scores_last_rating_gmid']) {
        daily_scores_last_rating_gmid = parseInt(localStorage['daily_scores_last_rating_gmid'], 10);
    }

    if (!daily_scores) {
        localStorage['daily_scores'] = daily_scores;
    }    
    if (!daily_scores_deducted) {
        localStorage['daily_scores_deducted'] = daily_scores_deducted;
    }
    if (!daily_scores_start_rating) {
        daily_scores_start_rating = getCurrentRating();
        localStorage['daily_scores_start_rating'] = daily_scores_start_rating;
    }
    if (!daily_scores_last_level) {
        daily_scores_last_level = getCurrentLevel();
        localStorage['daily_scores_last_level'] = daily_scores_last_level;
    }
    if (!daily_scores_last_levels_rating) {
        daily_scores_last_levels_rating = getCurrentLevelRating();
        localStorage['daily_scores_last_levels_rating'] = daily_scores_last_levels_rating;
    }
    if (!daily_scores_start_level_rating) {
        daily_scores_start_level_rating = getCurrentLevelRating();
        localStorage['daily_scores_start_level_rating'] = daily_scores_start_level_rating;
    }
    
    var d = new Date();
    localStorage['last_race_date'] = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    
    updatePanel();

    var MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver ||
                           window.MozMutationObserver;
    
    function scoresChangeHandler() {
        if (game.type == "normal") {
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].you) {
                    race_scores = Math.round(game.players[i].info.record.scores_gained);
                    break;
                }
            }
            
            if (game.params.competition) {
    			var player = $$('.player.you');
                if (player) {
                	player = player[0];
                    
                    var currentRating = getDailyRating();
                    var ratingObserver = new MutationObserver(
                        function(mutations) {
                            mutations.forEach(function(mutation) {
                                if (mutation.addedNodes) {
                                    for (var i = 0; i < mutation.addedNodes.length; i++){
                                        if (mutation.addedNodes[i].hasClassName('rating_gained')) {
                                            currentRating += parseInt(mutation.addedNodes[i].innerHTML, 10);
                                            nodeDailyRatingValue.innerHTML = getFormattedNumber(currentRating);
                                            ratingObserver.disconnect();
                                        }
                                    }
                                }
                            });
                    });
                    
                    ratingObserver.observe(player, {
                        characterData: false,
                        subtree: true,
                        childList: true
                    });
                }
            }
            
            daily_scores += race_scores;
            nodeDailyScoresValue.innerHTML = '+' + daily_scores;
            if (race_scores != 0) {
                nodeDailyScores.innerHTML += '<span id="race-scores" style="color:#B7FFB3; padding-left:5px; font-size:9px; font-weight:bold; position:relative; top:-1px;">(' + race_scores + ')</span>';
            }
            localStorage['daily_scores'] = daily_scores;
        }
    };
    
    var observer = new MutationObserver(
        function(mutations) {
            observer.disconnect();
            scoresChangeHandler();
    });
    
    observer.observe(scores, {
        characterData: true,
        subtree: true,
        childList: true
    });
    
    if (/http:\/\/klavogonki.ru\/g\/\?gmid=/.test(location.href)){
        var timer;
        function handler(){
            if (!(game && game.params)) return;
            clearInterval(timer);
            
            if (game.params.competition && game.id !== daily_scores_last_rating_gmid) {
                daily_scores_last_rating_gmid = game.id;
                daily_scores_deducted += 150;
                nodeDailyScoresDeductedValue.innerHTML = '-' + daily_scores_deducted;
            	localStorage['daily_scores_deducted'] = daily_scores_deducted;
                localStorage['daily_scores_last_rating_gmid'] = daily_scores_last_rating_gmid;
            }
        };
        timer = setInterval(handler, 1000);
    }
}
function contentEval(source) {
    if (typeof source == 'function') {
        source = '(' + source + ')();';
    }
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = source;
    document.body.appendChild(script);
}
contentEval(main);