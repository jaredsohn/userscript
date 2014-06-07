// ==UserScript==
// @name           Tribunal enchancement
// @namespace      Tribunal
// @include        http://*.leagueoflegends.com/tribunal/*
// ==/UserScript==

//create offender filter option
var chatHeader = document.getElementsByClassName('judger_header')[4];
chatHeader.innerHTML += '    <a href="javascript:tr.chat_log.children(\'div\').each(function() {if ($(this).hasClass(\'offender\')){$(this).show()}else {$(this).hide()}}); void 0">Offender</a>';

setTimeout(reportedGamesAmt, 1000);
function reportedGamesAmt() {
	//Get Amount of games
	var gameSelect = document.getElementsByTagName('select')[0];
	var gamesAmt = gameSelect.options.length;
	//Write Amount
	var moreGames = document.getElementById('judger_games');
	moreGames.innerHTML = moreGames.innerHTML.replace('More Games', gamesAmt + ' games');
}