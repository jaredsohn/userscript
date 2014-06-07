// ==UserScript==
// @name        KadaKado Highscores
// @description See how good a clan is at each game
// @author      Rulesy - rjdown@gmail.com
// @namespace   rulesy-kadokado
// @include     http://www.kadokado.com/clan/*
// @version     1
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {

	var domain = 'http://kadokado.gamerz.org.uk';

	var currentUrl = document.location.href;

	if (currentUrl.match(/clan\/[0-9]+(\/members|\/status|\/missions)?/)) {

		var currentClan = currentUrl.match(/clan\/([0-9]+)/)[1];

		$("<style type='text/css'>div#tabulation ul li a { width: 130px; }</style>").appendTo('head');
		$('div#tabulation ul').append('<li><a id="highscoresTab">High Scores</a></li>');

		$('#highscoresTab').live('click', function() {
			$('#tabulation a.active').removeClass('active');
			$('#highscoresTab').addClass('active');

			var newBody = $('<div class="clanBody"/>');
			newBody.append($('.clanBody h1:first'))
			newBody.append('<p id="updateHighscores"><a href="#">Update high scores</a></p>');
			newBody.append('<p id="lastUpdated">Last updated: <span /></p>');
			newBody.append($('<table id="highScores"><thead><tr><th>Game</th><th>Record</th><th>Player</th></tr></thead><tbody><tr><td colspan="3">Loading scores...</td></tr></tbody></table>'));
			$('.clanBody').replaceWith(newBody);

			populateHighscoreTable(currentClan);

		})

		$('#updateHighscores').live('click', function() {

			$('#updateHighscores').replaceWith('<p id="updatingHighscores">Retrieving information... please wait. (<span>0</span>%)</p>');

			var users = new Array();
			var gamesArray = new Array();

			var clan = new Object();
			clan.id = currentClan;
			clan.name = '';
			$('.clanBody h1 .txt2img img').each(function() {
				clan.name += $(this).attr('alt');
			})

			var membersUrl = 'http://www.kadokado.com/clan/' + clan.id + '/members';

			$.ajax({
				url: membersUrl,
				async: false,
				success: function(data) {

					var membersCount = $('.tid_user', data).length;

					$('.tid_user', data).each(function(index) {

						var percent = parseInt(100 / membersCount * index);

						$('#updatingHighscores span').text(percent)
						var user = new Object();

						user.id = $(this).attr('href').match(/\/user\/([0-9]+)/)[1];
						user.name = $(this).text();

						var records = new Array();
						var starCompletionUrl = 'http://www.kadokado.com/user/' + user.id + '/starCompletion';

						$.ajax({
							url: starCompletionUrl,
							async: false,
							success: function(data) {

								$('#contentBox > .whiteBorder > table tbody tr', data).each(function() {

									var gameId =  $('td:eq(1) a', this).attr('href').match(/\/game\/([0-9]+)\/play/)[1];
									var gameName =  $('td:eq(1) a', this).text();
									gamesArray[gameId] = gameName;

									var record = '';
									$('td:eq(2) .num2img img', this).each(function() {
										var number = $(this).attr('alt');
										if (number.match(/^[0-9]$/)) {
											record += number;
										}
									})
									if (record == '') {
										record = 0;
									}

									records.push(gameId + ':' + record);

								})
							}
						})
						user.records = records.join(',');
						users.push(user);
					})
				}
			})

			var games = new Array();
			for (var i in gamesArray) {
				var game = new Object();
				game.id = i;
				game.name = gamesArray[i];
				games.push(game);
			}

			var userJson = JSON.stringify(users)
			var gameJson = JSON.stringify(games);
			var clanJson = JSON.stringify(clan);

			$.ajax({
				url: domain + '/update_scores.php',
				async: false,
				type: 'POST',
				data: {
					games: gameJson,
					clan: clanJson,
					users: userJson
				},
				complete: function() {
					$('#updatingHighscores').text('Scores have been updated.');
					populateHighscoreTable(currentClan);
				}
			})


		})
	}

	function populateHighscoreTable(clan_id) {
		$.ajax({
			url: domain + '/get_scores.php',
			type: 'GET',
			data: {
				clan: clan_id
			},
			dataType: 'jsonp',
			success: function(data) {
				var newTbody = $('<tbody />')

				if (data.last_updated) {
					$('#lastUpdated span').html(data.last_updated);
				}

				if (data.error) {
					newTbody.append('<tr><td colspan="3">' + data.error + '</td></tr>');
					$('#highScores tbody').replaceWith(newTbody);
					return;
				}

				for (var i = 0; i < data.scores.length; i++) {

					var dataRow = data.scores[i];

					var row = $('<tr />');

					row.append('<td><a href="/game/' + dataRow.game_id + '/play">' + dataRow.game_name + '</a></td>');

					var scoreChars = dataRow.score.split('');
					var score = '';
					for (var j = 0; j < scoreChars.length; j++) {
						score += '<img src="http://dat.kadokado.com/gfx/typo/sblue/' + scoreChars[j] + '.gif" alt="' + scoreChars[j] + '">';
						if (j < scoreChars.length - 1 && (scoreChars.length - j - 1) % 3 == 0) {
							score += '<img src="http://dat.kadokado.com/gfx/typo/sblue/dot.gif" alt=".">';
						}
					}

					row.append('<td>' + score + '</td>');

					if (dataRow.score == 0) {
						row.append('<td />');
					} else {
						row.append('<td><a href="/user/' + dataRow.user_id + '">' + dataRow.user_name + '</a></td>');
					}
					newTbody.append(row);
				}
				$('#highScores tbody').replaceWith(newTbody);

			}
		})
	}
}

addJQuery(main);