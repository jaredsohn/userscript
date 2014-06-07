// ==UserScript==
// @name          GLB Games Page Filter
// @namespace     GLB
// @description   Filters the my games page
// @include       http://goallineblitz.com/game/user_games.pl?*
// @include       http://goallineblitz.com/game/user_games.pl
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==
var numCheckboxes = [
	{id:'leagueGames',desc:'League Games',regex:'League game'},
	{id:'rankedScrim',desc:'Ranked Scrimmages',regex:'Ranked scrimmage game'},
	{id:'friendlyGame',desc:'Friendly Games',regex:'Friendly game'},
	{id:'tournamentGame',desc:'Tournament Games',regex:'Tournament game'},
	{id:'playoffGame',desc:'Playoff Games',regex:'Playoff game'},
	{id:'showPlayers',desc:'Show Players'}
];

function updateCheckboxSettings(){
	for(var i=0;i<numCheckboxes.length;i++){
		if(GM_getValue(numCheckboxes[i].id) == "true" || GM_getValue(numCheckboxes[i].id) == "false"){
			numCheckboxes[i].value = GM_getValue(numCheckboxes[i].id);
		}else{
			numCheckboxes[i].value = "true";
		}
	}
};

function insertCheckboxes(){
	for(var i=0;i<numCheckboxes.length;i++){
		$('DIV#content DIV.medium_head:eq(0)').append('<br /><input type="checkbox" name="' + numCheckboxes[i].id + '" id="' + i + '" ' + (numCheckboxes[i].value == "true" ? 'checked=true' : '') + '> ' + numCheckboxes[i].desc);
	}
	$('DIV#content DIV.medium_head:eq(0) INPUT[type="checkbox"]').click(function(){
		if($(this).prop('checked')){
			GM_setValue($(this).prop('name'),"true");
			numCheckboxes[parseInt($(this).prop('id'))].value = "true";
		}else{
			GM_setValue($(this).prop('name'),"false");
			numCheckboxes[parseInt($(this).prop('id'))].value = "false";
		}
		hideOrShow();
	});
};

function hideOrShow(){
	var show;
	$('DIV#content DIV.content_container DIV.scoreboard').each(function(){
		var gameText = $('DIV.matchup TABLE.scoreboard_table TR:eq(1) TD',this).text();
		for(var i=0;i<numCheckboxes.length - 1;i++){
			if(gameText.match(new RegExp('^' + numCheckboxes[i].regex))){
				show = numCheckboxes[i].value;
				break;
			}
		}
		
		if(show == 'true'){
			$(this).show();
		}else{
			$(this).hide();
		}
	});
	
	var playersBox = numCheckboxes[numCheckboxes.length - 1];
	if(playersBox.value == 'true'){
		$('DIV#content DIV.content_container DIV.scoreboard DIV.players').show();
	}else{
		$('DIV#content DIV.content_container DIV.scoreboard DIV.players').hide();
	}
};

updateCheckboxSettings();
insertCheckboxes();
hideOrShow();