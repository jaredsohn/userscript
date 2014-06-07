// ==UserScript==
// @name       "Mining" for primedice
// @namespace  http://www.primedice.com
// @version    0.1
// @description  Auto bets in primedice.
// @match      https://primedice.com/*
// @copyright  2012+, You
// ==/UserScript==
var lastmessage = 0,
        autobet_speed = 0,
        normalbet_speed = 0,
        id = 0,
        timedCount, timer, lastYourBet = 0,
        lastAllBet = 0,
        lastBigBet = 0,
        autobet_halt, first_load = true,
        autobet_index = false,
        prev_balance = 0,
        bet_ids = [];
function bet(bet, odds, type, callback) {
        $.ajax({
            url: '/api/bet.php',
            type: 'post',
            data: {
                'bet': bet,
                'game': odds,
                'type': type == 0 ? 1 : 0,
            },
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    autobet_halt = true;
                    return;
                }
            },
            error: function (jqXHR) {
                autobet_halt = true;
            },
            complete: function (jqXHR) {
                var data;
                try {
                    data = $.parseJSON(jqXHR.responseText);
                } catch (e) {
                    data = false;
                }
                if (typeof callback === 'function') {
                    callback(data);
                }
            }
        });
    }
function auto_bet(params) {
        setTimeout(function () {
			var current_balance = parseFloat($('#balance-value').text());
			if (current_balance === 0)
			{
				autobet_index = false;
				return;
			}
			else if(params.current_bet > current_balance)
				params.current_bet = current_balance;
            bet(params.current_bet, params.odds, params.type, function (data) {
                var i, a, j, curbet;
                if (data) {
                    params.current_run++;
                    autobet_index = params.current_run;
                    if (data.result == 0) {
                        if (params.on_loss_return) {
                            params.current_bet = params.bet;
                        } else {
                            params.current_bet *= params.on_loss_multiply;
                        }
                    } else {
                        if (params.on_win_return) {
                            params.current_bet = params.bet;
                        } else {
                            params.current_bet *= params.on_win_multiply;
                        }
                    }
                    curbet = params.current_bet.toString();
                    if (curbet.indexOf('e') > -1) {
                        i = parseInt(curbet.substr(0, curbet.indexOf('e')).replace('.', ''));
                        a = parseInt(curbet.substr(curbet.indexOf('e') + 2));
                        curbet = i.toString();
                        for (j = 1; j < a; j++) {
                            curbet = '0' + curbet;
                        }
                        params.current_bet = '0.' + curbet;
                    }
                    params.current_bet = +('' + params.current_bet).substr(0, ('' + params.current_bet).indexOf('.') + 9);
                    if (data.balance < data.current_bet) {
						return;
                    }
                }
                if (params.current_run < params.total_runs) {
					if(params.current_bet < params.bet)
						params.current_bet = params.bet;
                    auto_bet(params);
                } else {
					params.current_bet = params.bet;
					autobet_index = false;
                    auto_bet(params);
					return;
                }
            })
        }, autobet_speed);
    }
params = {
                odds: 20.81,
                type: 0,
                bet: 0.00000002,
                total_runs: 2147483647,
                on_loss_return: false,
                on_loss_multiply: false,
                on_win_return: false,
                on_win_multiply: false,
                current_run: 0,
                current_bet: 0,
            };
params.current_bet = params.bet;
autobet_halt = false;
autobet_index = 0;
auto_bet(params);