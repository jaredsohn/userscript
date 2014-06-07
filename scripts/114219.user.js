// ==UserScript==
// @name           battlelogautojoin
// @version        2.0.3
// @namespace      http://userscripts.org/users/181830
// @description    Autojoin servers that are full once a spot opens up.
// @include        http://battlelog.battlefield.com/bf3/*
// ==/UserScript==

function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}

	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(function() {
	if ($('#serverguide-autojoin-button').length === 0) {
		$('.serverguide-joinnow-container-venice').append('<surf:container id="serverguide-autojoin-button"><button class="base-button-arrow-small gamemanager-launch-autojoin">Auto Join</button></surf:container>').parent().css('bottom', '75px')
	}
	var autoJoin = {
		running: false,
		servers: {},
		timers: [],
		persona: S.globalContext.session.currentPersona,
		start: function() {
			var that = autoJoin;
			gamemanager.isHidden = false;
			gamemanager.launcherState = {gameState: launcher.STATE.LOADING, gameStatePretty: 'Auto joining servers', name: gamemanager.states.LAUNCH_INFO};
			gamemanager.updateGameStateUIFromState(gamemanager.getCurrentStateObject());
			$.each(['servername', 'platoon', 'checkboxes'], function() {
				$('.gamemanager-launchstate-'+this).remove();
			})
			$('.gamemanager-launchstate-map').append('<div class=\"gamemanager-launchstate-gameready\">\n <div class=\"gamemanager-launchstate-gameready-button\">\n <input id=\"gamemanager-launchstate-autojoin\" type=\"button\" class=\"base-button-arrow-large\" value=\"Stop auto join\" />\n </div>\n </div>')
			$('#gamemanager-launchstate-autojoin').click(function() { that.stop() })
			var game = '2';
			var callback = function(reservation, check) {
				if (check) {
					that.stop(true);
					launcher._updateCurrentState(game, launcher.STATE.CONNECT_TO_GAMEID, launcher.STATE.READY, that.persona.personaId);
					launcher._claimReservation(reservation, {});
					gamemanager.reservation = reservation;
				}
			}
			var data = {"post-check-sum": S.globalContext.session.postChecksum, "groupPersonaIdList": ""};
			
			var startJoins = function() {
				$.each(that.servers, function(k, v) {
					if (that.running) {
						var gameId = v.gameId;
						var url = '/' + base.gameToSection('2') +'/launcher/reserveslotbygameid/' + that.persona.personaId + '/' + gameId;
						var opts = {
							url: url,
							dataType: 'json',
							type: 'POST',
							data: S.encodeJSON(data),
							contentType: "application/json;charset=utf-8",
							success: function(response) {
								var reservation = response.data;
								switch (reservation.joinState) {
									case launcher.JOIN_STATE.GROUP_PARTIALLY_JOINED:
										launcher._triggerEvent('warning.generic', [game, reservation.personaId, launcher.JOIN_STATE.GROUP_PARTIALLY_JOINED]);
										return callback(reservation, true);

									case launcher.JOIN_STATE.JOINED_GAME:
										return callback(reservation, true);

									case launcher.JOIN_STATE.IN_QUEUE:
										launcher._storeJoinOptions(game, reservation.personaId, reservation.gameId, options);
										launcher._updateCurrentState(game, launcher.STATE.IN_QUEUE, launcher.STATE.READY, reservation.personaId);
										return callback(reservation, false);

									default:
										launcher.debug("Join state not handled: " + reservation.joinState);
										launcher._triggerEvent('error.generic', [game, reservation.personaId, launcher.ALERT.ERR_GENERIC, launcher.ALERT.ERR_GENERIC_ERROR_CODE.MANGLED_RESPONSE]);
										break;

								}
							},
							error: function(jqXHR, textStatus, errorThrown) {
							       var errorResponse = S.parseJSON(jqXHR.responseText);
							       launcher.debug(errorResponse.data);

							       switch (errorResponse.message) {
								       case 'GAME_FULL':
								       case 'INVALID_GAME_STATE_ACTION':
									       break;

								       default:
									       delete that.servers[key];
									       $(that.el).removeAttr('checked').hide();
									       break;
							       }

						       }
						}
						launcher._ajaxHelper(game, opts); 
					}
				});
				that.timers.push(setTimeout(function() {
					startJoins();
				}, 2*1000));
			}
			startJoins();
		},
		stop: function(isJoining) {
		      this.running = false;
		      if (!isJoining) { 
			      gamemanager.isHidden = true;
			      $("#gamemanager-taskbar:first").removeClass('active');
		      }
		      gamemanager.launcherState = {};
		      gamemanager.updateGameStateUI();
		      $('.gamemanager-launch-autojoin').text('Auto Join');
		      $.each(this.timers, function() {
			      clearTimeout(this);
		      })
		      this.clearServers();
		},
		clearServers: function() {
			this.servers = {};
			$('[name=selected-game]:checked').removeAttr('checked').hide();
		}
	}

	$('.serverguide-cell-friend').live('mouseenter', function(e) {
		if ($(this).find('[name=selected-game]').length === 0) {
			$(this).append('<input type="checkbox" name="selected-game" style="url(http://battlelog-cdn.battlefield.com/public/serverguide/icon_checkbox.png?v=209) no-repeat"/>');
		} else {
			$(this).find('[name=selected-game]').show();
		}
	}).live('mouseleave', function(e) {
		$(this).find('[name=selected-game]').not(':checked').hide()
	})

	Surface.ajaxNavigation._afterCallback = Surface.ajaxNavigation.afterCallback;

	Surface.ajaxNavigation.afterCallback = function(url, data) {
		Surface.ajaxNavigation._afterCallback(url, data);
		if (url.indexOf('servers') !== -1) {
			$('.serverguide-joinnow-container-venice').append('<surf:container id="serverguide-autojoin-button"><button class="base-button-arrow-small gamemanager-launch-autojoin">Auto Join</button></surf:container>').parent().css('bottom', '75px')
		}
	}

	$('.gamemanager-launch-autojoin').live('click', function(e) {
		if (autoJoin.running === false) {
			autoJoin.start();
			autoJoin.running = true;
			$(this).text('Stop Joining');
		} else {
			autoJoin.stop();
			autoJoin.running = false;
			$(this).text('Auto Join');
		}
	})

	$('[name=selected-game]').live('change', function(e) { 
		var that = this;
		var serverGuid = $(this).parent().parent().attr('guid');
		if (autoJoin.servers[serverGuid]) {
			delete autoJoin.servers[serverGuid];
		} else {
			var url = '/bf3/servers/show/' + serverGuid; 
			$.ajax({ url: url + '?json=1&join=true', dataType: "json",
				complete: base.onComplete(
					function(success, response, xmlHttpRequest) {
						if (success) {
							autoJoin.servers[serverGuid] = response.data;
							autoJoin.servers[serverGuid].el = that;
						} else {
							S.debug('No server info returned: ' + response);
							if (xmlHttpRequest.status == 404) {
								return joinflow.showPopup("serveroffline", {});
							} else {
								return base.showReceipt("Could not to join server.", receiptTypes.ERROR);
							}
						}
					}, false)
			});
		}
	})
});
