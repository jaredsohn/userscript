// ==UserScript==
// @name		JustDice Martingale Bot
// @namespace   none
// @author      Gray
// @version     1.1
// @include     https://just-dice.com/*
// @grant       none
// ==/UserScript==
 
/* How would you go about using this?
 *
 * Install Greasemonkey plugin for Firefox
 * Install Firebug plugin for Firefox (It's better than the builtin console.)
 *
 * Make a new script with Greasemonkey
 * Type whatever you want into the form
 * Then paste this whole file into the editor
 *
 * Adjust to your needs.
 * Run.
 *
 * Other things you can do:
 *
 * That's it!
 *
 * Made a profit and feel like tipping people without seeing their genitals?
 *
 * Go ahead: 1Gray1ZsWo3kKBaCYdigiyPkD1pUnBqPxo
 *
 * Now go have fun with this... thing!
**/
 
// Heres the script

$('<script>').attr({
	src: 'http://d3js.org/d3.v3.min.js',
	charset: 'UTF-8'
}).appendTo(document.body);

$(function() {
	var markup = '<div class="bot-controls"><fieldset><div class="row"><p class="llabel">bet start</p><input id="gb_bet" value="0.001"><p class="rlabel">BTC</p></div><div class="row"><p class="llabel">chance</p><input id="gb_chance" value="50"><p class="rlabel">%</p></div></fieldset><fieldset><div class="row"><p class="llabel">bet multiplier</p><input id="gb_multiplier" value="2"><p class="rlabel" title="The bet gets multiplied by [mutiply factor] every [interval] steps.">x</p></div><div class="row"><p class="llabel">interval</p><input id="gb_interval" value="1"><p class="rlabel" title="The bet gets multiplied by [mutiply factor] every [interval] steps.">&nbsp;</p></div></fieldset><fieldset><div class="row"><p class="llabel">bet stop</p><input id="gb_betstop" value="0.01"><p class="rlabel">BTC</p></div><div class="row"><p class="llabel">profit stop</p><input id="gb_stopprofit" value="0.1"><p class="rlabel">BTC</p></div></fieldset><div class="clear"></div><div class="button_group"><button class="button_label action_toggle">start</button><div class="actions button_inner_group"><button id="gba_start">start</button><button id="gba_resume">resume</button><button id="gba_roll">roll</button></div></div><div class="button_group"><button class="button_label action_toggle">halt</button><div class="actions button_inner_group"><button id="gba_stop">stop</button><button id="gba_stoponwin">stop on win</button></div></div><div class="button_group"><button class="button_label action_toggle">roll</button><div class="actions button_inner_group"><button id="gba_rollhi">hi</button><button id="gba_rolllo">lo</button><button id="gba_rollrand" title="Grabs random bytes from random.org">random</button><button id="gba_rollswitch">switch on loss</button></div></div><div class="button_group"><button class="button_label action_toggle">chaos</button><div class="actions button_inner_group"><button id="gba_chaos">go</button></div></div><div class="clear"></div></div><div class="bot-stats"><div class="statspanel"><h2>Bot Stats</h2><div class="slabel">Status:</div><span id="gbs_status">Halted</span><span id="gbs_statusmessage"></span><div class="clear"></div><div class="slabel">Bets placed:</div><span id="gbs_bet">0</span><div class="clear"></div><div class="slabel">Bets won:</div><span id="gbs_betwin">0</span><div class="clear"></div><div class="slabel">Bets lost:</div><span id="gbs_betlost">0</span><div class="clear"></div><div class="slabel">Longest streak:</div><span id="gbs_streak">0</span><div class="clear"></div></div><div class="statspanel"><h2>More Stats</h2><div class="slabel">Rollmode:</div><span id="gbs_rollmode">random</span><span id="gbs_rollmodecurrent">lo</span><div class="clear"></div><div class="slabel">Wagered:</div><span id="gbs_wagered">0</span><div class="clear"></div><div class="slabel">Profit:</div><span id="gbs_myprofit">0</span><div class="clear"></div><div class="slabel">Stop at profit:</div><span id="gbs_stopprofit">none</span><div class="clear"></div></div></div><div class="clear"></div><div class="bot-graph">Visual feedback goes here. Soon?</div><div class="bot-foot">Made a nice profit? Tips are welcome! 1Gray1ZsWo3kKBaCYdigiyPkD1pUnBqPxo';
		$panelWrapper = $('<div>').attr('id','graysbot').css({display: 'none'}).insertAfter('#faq'),
		$panel = $('<div>').addClass('panel').append(markup).appendTo($panelWrapper),
		$bal = $("#pct_balance"),
		$in_bet = $('#gb_bet'),
		$in_chance = $('#gb_chance'),
		$in_multiplier = $('#gb_multiplier'),
		$in_interval = $('#gb_interval'),
		$in_betstop = $('#gb_betstop'),
		$in_stopprofit = $('#gb_stopprofit'),
		$a_start = $('#gba_start'),
		$a_resume = $('#gba_resume'),
		$a_roll = $('#gba_roll'),
		$a_stop = $('#gba_stop'),
		$a_stoponwin = $('#gba_stoponwin'),
		$a_rollhi = $('#gba_rollhi'),
		$a_rolllo = $('#gba_rolllo'),
		$a_rollrand = $('#gba_rollrand'),
		$a_rollswitch = $('#gba_rollswitch'),
		$a_chaos = $('#gba_chaos'),
		$s_status = $('#gbs_status'),
		$s_statusmessage = $('#gbs_statusmessage'),
		$s_bet = $('#gbs_bet'),
		$s_betwin = $('#gbs_betwin'),
		$s_betlost = $('#gbs_betlost'),
		$s_streak = $('#gbs_streak'),
		$s_rollmode = $('#gbs_rollmode'),
		$s_rollmodecurrent = $('#gbs_rollmodecurrent'),
		$s_wagered = $('#gbs_wagered'),
		$s_myprofit = $('#gbs_myprofit'),
		$s_stopprofit = $('#gbs_stopprofit');

	// Include d3.js

	/* System stuff */
	this.initialized = false;
	this.auto = false;
	this.manual = false;
	this.stoponwin = false;
	this.stoponprofit = false;
	this.bet = 0;
	this.streak = 0;
	this.statusmessage = "";
	this.lastbetOutcome = null;

	/* Stats */
	this.stats = {
		won: 0,
		lost: 0,
		maxStreak: 0,
		currentProfit: 0,
		wagered: 0
	}

	/* Parameters */
	this.initialBet = parseFloat(localStorage.getItem('gb_initialBet')) || 0.00001;
	this.maxBet = parseFloat(localStorage.getItem('gb_maxBet')) || 0.0001;

	this.initialBalance = 0;
	this.currentBalance = 0;
	this.profitStop = parseFloat(localStorage.getItem('gb_profitStop')) || 0;
	
	this.multiplyFactor = parseFloat(localStorage.getItem('gb_multiplyFactor')) || 2; // Current bet is multiplied by [multiplyFactor] every [interval] rolls
	this.interval = parseFloat(localStorage.getItem('gb_interval')) || 1;
	this.chance = parseFloat(localStorage.getItem('gb_chance')) || 49.5;

	this.hi_lo = "lo";
	this.rollRandom = true;
	this.rollSwitch = false;

	this.byteLock = false;
	this.byteCount = 0;
	this.byteOffset = 0;
	this.delay = 0; // Wanna go slower or faster? Set this. Milliseconds.

	this.init = function() {
		if(this.initialized) {
			return;
		}

		this.initialized = true;
		// Bind events
		/*socket.on("wins", this.isWin);
		socket.on("losses", this.isLoss);
		socket.on("jderror", this.isError); //*/

		socket.on("result", this.setBalance);
		socket.on("init", this.setBalance);

		$in_bet.val(tidy(this.initialBet));
		$in_chance.val(this.chance);
		$in_multiplier.val(this.multiplyFactor);
		$in_interval.val(this.interval);
		$in_betstop.val(tidy(this.maxBet));
		$in_stopprofit.val(tidy(this.profitStop));

		this.getNewRand();

		this.updateStats();
	}

	this.setBalance = function(data) {
		if(data.uid == uid && data.balance) {
			var bal = parseFloat(data.balance);
			this.currentBalance = bal;
			if(this.initialBalance===0) {
				this.initialBalance = bal;
			}
			if(data['win'] === true) {
				this.isWin(data);
			} else if(data['win'] === false) {
				this.isLoss(data);
			}
		}
	}
	this.setBalance = this.setBalance.bind(this);

	this.start = function() {
		this.auto = true;
		this.manual = false;
		this.statusmessage = "";
		this.bet = this.initialBet;
		this.stats.currentProfit = 0;
		this.roll();
	};
	this.stop = function(stoponwin) {
		if(stoponwin) {
				this.stoponwin = true;
		} else {
				this.auto = false;
		}
		this.updateStats();
	};
	this.resume = function() {
		this.auto = true;
		this.roll();
	};

	this.getNewRand = function() {
		this.byteLock = true;
		$.get("http://www.random.org/integers/?num=256&min=0&max=1024&col=2&base=2&format=plain&rnd=new", function(bytes) {
			bytes = bytes.replace(/[^01]/g,'');
			MG.bytes = bytes;
			MG.byteCount = bytes.length;
			MG.byteOffset = 0;
			MG.byteLock = false;
			MG.setHiLo();
		});
	}

	this.setHiLo = function() {
		if(this.rollRandom) {
			this.hi_lo = (this.bytes[this.byteOffset++] === '1') ? 'hi' : 'lo';
			if(this.byteOffset === this.byteCount) {
				this.getNewRand();
			}
		} else if(this.rollSwitch) {

		}
	}

	this.roll = function() {
		window.setTimeout(this.placeBet, this.delay);
	};

	this.placeBet = function() {
		if(this.auto || this.manual) {
			socket.emit("bet", csrf, {
				chance: "" + this.chance,
				bet: this.bet.toFixed(8),
				which: this.hi_lo
			});
			if(this.rollRandom && this.byteLock) {
				window.setTimeout(this.placeBet, this.delay);
				return;
			} else {
				this.setHiLo();
			}

		}
	};
	this.placeBet = this.placeBet.bind(this);

	this.isWin = function(data) {
		this.streak = 0;
		this.stats.won++;
		this.stats.wagered += this.bet;
		this.lastbetOutcome = true;

		this.bet = this.initialBet;
		if(this.stoponprofit && (this.currentBalance-this.initialBalance) > this.profitStop) {
			this.auto = false;
			this.stoponprofit = false;
			this.statusmessage = "profit limit";
		} else if(this.stoponwin) {
			this.auto = false;
			this.stoponwin = false;
			this.statusmessage = "stop on win";
		} else if(this.auto) {
			this.roll();
		}
		this.updateStats();
	};
	this.isWin = this.isWin.bind(this);

	this.isLoss = function(data) {
		this.streak++;
		this.stats.lost++;
		this.stats.wagered += this.bet;
		this.lastbetOutcome = false;

		if(this.streak % this.interval === 0) {
			this.bet *= this.multiplyFactor;
		}
		this.stats.maxStreak = Math.max(this.streak, this.stats.maxStreak);

		if(this.bet > this.maxBet) {
			this.statusmessage = "bet limit"
			this.stoponwin = false;
			this.auto = false;
		} else if(this.auto) {
			if(this.rollSwitch) {
				this.hi_lo = (this.hi_lo === 'hi') ? 'lo' : 'hi';
			}

			this.roll();
		}
		this.updateStats();
	};
	this.isLoss = this.isLoss.bind(this);

	this.isError = function(data) {
		this.auto = false;
		console.log('Error. Halting.');
		console.log(data);
	};
	this.isError = this.isError.bind(this);

	this.updateStats = function() {
		var status = this.auto ? "Running" : (this.manual ? "Manual" : "Halted"),
			rollmode, currentroll;

		if(this.stoponwin && this.stoponprofit) {
			status += '; SW|SP';
		} else if(this.stoponwin) {
			status += '; SW';
		} else if(this.stoponprofit) {
			status += '; SP';
		}

		if(this.rollRandom) {
			rollmode = 'random';
			$s_rollmodecurrent.text(this.hi_lo).css('display', '');
		} else if(this.rollSwitch) {
			rollmode = 'switch';
			$s_rollmodecurrent.text(this.hi_lo).css('display', '');
		} else {
			rollmode = this.hi_lo;
			$s_rollmodecurrent.text(currentroll).css('display', 'none');
		}

		$s_status.text(status);
		$s_bet.text(this.stats.won + this.stats.lost);
		$s_betwin.text(this.stats.won);
		$s_betlost.text(this.stats.lost);
		$s_streak.text(this.stats.maxStreak);
		$s_rollmode.text(rollmode);
		$s_wagered.text(commaify(this.stats.wagered.toFixed(8)));
		$s_myprofit.text(commaify((this.currentBalance-this.initialBalance).toFixed(8)));
		$s_stopprofit.text(this.profitStop ? commaify(this.profitStop.toFixed(8)) : 'none');

		if(this.statusmessage) {
			$s_statusmessage.text(this.statusmessage).css('display', '');
		} else {
			$s_statusmessage.text('').css('display', 'none');
		}
	}
 

	// Some styling // There are other ways for this. Bear with me. ;)
	$('<style>').append('\
	#graysbot .bot-stats,\
	#graysbot .button_group {\
		margin-top: 16px;\
	}\
	#graysbot .bot-stats .slabel {\
		width: 160px;\
	}\
	#graysbot #gba_chaos {\
		background-color: #FFCCCC;\
		border: 5px solid #CC9999;\
	}\
	#graysbot #gba_chaos:hover {\
		background-color: #DDAAAA;\
	}\
	').appendTo(document.head);

	$a_start.on({
		click: function() {
			MG.initialBet = parseFloat( $in_bet.val() );
			//MG.initialBalance = parseFloat( $bal.val() )
			MG.maxBet = parseFloat( $in_betstop.val() );
			MG.profitStop = parseFloat( $in_stopprofit.val() );
			MG.chance = parseFloat( $in_chance.val() );
			MG.interval = parseFloat( $in_interval.val() );
			MG.multiplyFactor = parseFloat( $in_multiplier.val() );
			MG.stoponprofit = !isNaN(MG.profitStop) && MG.profitStop > 0

			localStorage.setItem('gb_initialBet', MG.initialBet);
			localStorage.setItem('gb_maxBet', MG.maxBet);
			localStorage.setItem('gb_profitStop', MG.profitStop);
			localStorage.setItem('gb_multiplyFactor', MG.multiplyFactor);
			localStorage.setItem('gb_interval', MG.interval);
			localStorage.setItem('gb_chance', MG.chance);

			MG.chaos = false;
			MG.stoponwin = false;

			MG.updateStats();

			MG.start();
		}
	});
	$a_resume.on({
		click: function() {
			MG.resume();
		}
	});
	$a_roll.on({
		click: function() {
			MG.stop();
			MG.manual = true;
			MG.roll();
		}
	});
	$a_stop.on({
		click: function() {
			MG.stop();
		}
	});
	$a_stoponwin.on({
		click: function() {
			MG.stop(true)
		}
	});
	$a_rollhi.on({
		click: function() {
			MG.rollSwitch = false;
			MG.rollRandom = false;
			MG.hi_lo = 'hi';
			MG.updateStats();
		}
	});
	$a_rolllo.on({
		click: function() {
			MG.rollSwitch = false;
			MG.rollRandom = false;
			MG.hi_lo = 'lo';
			MG.updateStats();
		}
	});
	$a_rollrand.on({
		click: function() {
			MG.rollSwitch = false;
			MG.rollRandom = true;
			MG.updateStats();
		}
	});
	$a_rollswitch.on({
		click: function() {
			MG.rollSwitch = true;
			MG.rollRandom = false;
			MG.updateStats();
		}
	});
	$a_chaos.on({
		click: function() {
			msg("Chaosmode has yet to be implemented!");
		}
	})

	this.init();
	window.MG = this;
	
	// Lastly add the tab
	$('<li>').append($('<a>').text('Bot').attr('href','#graysbot')).appendTo('.tabs');
});