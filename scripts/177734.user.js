// ==UserScript==
// @name        The West - Player Checker
// @author      neversleep1911
// @namespace   neversleep1911.namespace.org
// @include     http://*.the-west.*/game.php*
// @version     1.0
// @grant       none
// ==/UserScript==

(function (func) {
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.textContent = "(" + func.toString() + ")();";
	document.body.appendChild(script);
	document.body.removeChild(script);
}(function () {
	var TW_PlayerChecker = {
		gui : {
			mainWindow : null,
			menuButton : null,
			txtPlayers : null,
			txtLog : null
		},
		PlayerState : {
			Player_NotFound : -1,
			Player_Nomeless : -2
		},
		checking: false
	};

	TW_PlayerChecker.check = function () {
		if (TW_PlayerChecker.checking)
			return;
			
		var doCheck = function (players, callback) {
			var result = [],
			ranking = [],
			currentPlayer = 0,
			saloonCache = [],
			nextPlayer,
			checkPlayer,
			nextSaloon,
			checkSaloon;

			nextPlayer = function () {
				if (++currentPlayer < players.length)
					checkPlayer();
				else {
					currentPlayer = 0;
					checkSaloon();
				}
			}

			checkPlayer = function () {
				var player = players[currentPlayer].trim();
				Ajax.remoteCallMode('ranking', 'get_data', {
					rank : NaN,
					search : player,
					tab : 'experience'
				}, function (json) {
					var found = false;
					for (var j = 0; j < json.ranking.length; j++) {
						if (json.ranking[j].name.toLowerCase() == player.toLowerCase()) {
							ranking.push(json.ranking[j]);
							found = true;
							break;
						}
					}
					if (!found) {
						ranking.push(TW_PlayerChecker.PlayerState.Player_NotFound);
					}
					nextPlayer();
				});
			}

			nextSaloon = function () {
				if (++currentPlayer < ranking.length)
					checkSaloon();
				else
					callback(result);
			}

			checkSaloon = function () {
				var player = ranking[currentPlayer];
				if (player == TW_PlayerChecker.PlayerState.Player_NotFound) {
					result.push(TW_PlayerChecker.PlayerState.Player_NotFound);
					nextSaloon();
					return;
				}

				if (player.town_id == null) {
					result.push(TW_PlayerChecker.PlayerState.Player_Nomeless); // wanted?
					nextSaloon();
					return;
				}

				var findPlayer = function (saloon, id) {
					for (var i = 0; i < saloon.players.length; i++) {
						if (saloon.players[i].player_id == id)
							return saloon.players[i];
					}
					return null;
				}

				for (var i = 0; i < saloonCache.length; i++) {
					if (saloonCache[i].town_id == player.town_id) {
						player = findPlayer(saloonCache[i].saloon, player.player_id);
						if (player)
							result.push(player);

						nextSaloon();
						return;
					}
				}

				Ajax.remoteCallMode('building_saloon', 'get_data', {
					town_id : player.town_id,
				}, function (json) {
					saloonCache.push({
						town_id : player.town_id,
						saloon : json
					});

					player = findPlayer(json, player.player_id);
					if (player)
						result.push(player);

					nextSaloon();
				});
			}

			checkPlayer();
		}

		var text = TW_PlayerChecker.gui.txtPlayers.text().trim();
		if (text == "") {
			alert('Введите ники игроков с новой строки.');
			return;
		}
		
		TW_PlayerChecker.checking = true;
		TW_PlayerChecker.gui.txtLog.setText("Ждите...");

		doCheck(text.split('\n'), function (players) {
			var tmp = SaloonWindow.self;
			if (SaloonWindow.self && SaloonWindow.self.confAfterDeath === undefined)
				SaloonWindow.self.confAfterDeath = 48;

			text = "";

			for (var i = 0; i < players.length; i++) {
				var player = players[i];
				if (player == TW_PlayerChecker.PlayerState.Player_NotFound)
					text += "Игрок не найден\n";
				else if (player == TW_PlayerChecker.PlayerState.Player_Nomeless)
					text += "Игрок без города\n";
				else {
					text += SaloonWindow.playerStat(player).replace(/(<([^>]+)>)/ig, "");

					if (!(player.isSleeping || player.isSleepingFort))
						text += " | не спит";

					text += " | " + player.duel_level + " | " + Character.calcWayTo(player.x, player.y).formatDuration() + "\n";
				}
			}

			TW_PlayerChecker.gui.txtLog.setText(text);

			SaloonWindow.self = tmp;
			TW_PlayerChecker.checking = false;
		});
	}

	TW_PlayerChecker.showMainWindow = function () {
		TW_PlayerChecker.gui.mainWindow = wman.open("tw-TW_PlayerChecker-window", null, "noreload")
			.setTitle("Player Checker")
			.setMiniTitle("Player Checker")
			.addEventListener("WINDOW_DESTROY", function () {
				TW_PlayerChecker.gui.mainWindow = null;
			});

		var playersGroup = new TW_Widgets.Group("Игроки", TW_PlayerChecker.gui.mainWindow.getContentPane());
		playersGroup.setWidth(250);

		var statusGroup = new TW_Widgets.Group("Статус", TW_PlayerChecker.gui.mainWindow.getContentPane());
		statusGroup.setLeft(255).setWidth(440);

		var checkButton = new TW_Widgets.Button("Проверить", TW_PlayerChecker.gui.mainWindow.getContentPane(), TW_PlayerChecker.check);
		checkButton.setTop(340);

		TW_PlayerChecker.gui.txtPlayers = new TW_Widgets.TextArea();
		TW_PlayerChecker.gui.txtPlayers.setWidth(200).setHeight(260).setText("neversleep1911");
		playersGroup.scrollPane.appendContent(TW_PlayerChecker.gui.txtPlayers.obj.getMainDiv());

		TW_PlayerChecker.gui.txtLog = new TW_Widgets.TextArea();
		TW_PlayerChecker.gui.txtLog.setWidth(390).setHeight(260);
		statusGroup.scrollPane.appendContent(TW_PlayerChecker.gui.txtLog.obj.getMainDiv());
	}

	TW_PlayerChecker.init = function () {
		var tw_widgets = "http://pastebin.com/raw.php?i=css8u94Y";

		$.getScript(tw_widgets, function (data, textStatus, jqxhr) {
			TW_PlayerChecker.gui.menuButton = new TW_Widgets.MenuButton(
				"data:image/png;base64,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",
				"The West - Player Checker",
				TW_PlayerChecker.showMainWindow
			);
		});
	}

	$(document).ready(TW_PlayerChecker.init);
}));
