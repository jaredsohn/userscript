// ==UserScript==
// @name           GLB TackleReporter
// @namespace      monsterkill
// @include        http://goallineblitz.com/game/player_game_log.pl?player_id=*
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/league.pl?league_id=*&conference_id=*
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

GM_addStyle('#displayContainer { overflow: visible; font-size: 10pt; }');
GM_addStyle('#displayContainer table { width:100%; text-align: center; float:left; background-color:#FFFFFF; border-collapse:separate; border: 1px solid #333333; border-radius:5px }');
GM_addStyle('thead.sticky { background:url("/images/game/design/content_tabs_bg.gif") repeat-x scroll 0 0 transparent; font-size: 12pt; font-weight: bolder; text-shadow: #999999 2px 2px 1px; color:#EEEEEE; }');
GM_addStyle('thead.sticky tr { display: block; position: relative; }');
GM_addStyle('tbody.scrollable { display: block; overflow: auto;  height: 503px; }');
GM_addStyle('.row-data { background-color:#EEEEEE; color:#333333}');
GM_addStyle('.row-data-highlight { background-color:#BBBBBB; color:#333333}');
GM_addStyle('.row-data td {border-bottom: 1px solid #CCCCCC; border-right: 1px solid #CCCCCC}');
GM_addStyle('thead.sticky td {border-bottom: 1px solid #CCCCCC; border-right: 1px solid #CCCCCC}');
/*
 * now for the table sizing, since the header and body of the table are separate
 * blocks(for the static header), i can't rely on the browser to keep the
 * columns sync'd up between the header and body
 */
GM_addStyle('.row-header-1 td {width:241px; }');
GM_addStyle('.row-header-1 td+td {width:399px; }');
GM_addStyle('.row-header-1 td+td+td {width:318px; }');
GM_addStyle('.row-header-2 td {width:120px; }');
GM_addStyle('.row-header-2 td+td {width:120px; }');
GM_addStyle('.row-header-2 td+td+td {width:79px; }');
GM_addStyle('.row-data td {width:120px; }');
GM_addStyle('.row-data td+td {width:120px; }');
GM_addStyle('.row-data td+td+td{width:79px; }');

/**
 * GameSelector class
 * 
 * Encapsulates the reusable functionality for selecting games to analyze
 */
function GameSelector() {
	this.allGameIds = [];
	this.selectedGameIds = []; // assured no duplicates
}
/**
 * @param href
 * @return the parsed game id
 */
GameSelector.prototype.parseGameIdFromHref = function(href) {
	var pattern = /game\_id\=(\d+)/g;
	var result = pattern.exec(href);
	if (result == null || result.length < 2) {
		log('parseGameIdFromHref() failed to parse a game id from href=' + href);
	}
	return result[1];
};
/**
 * add a game to the list of games to be parsed
 * 
 * @param gameId
 * @return null
 */
GameSelector.prototype.gameSelected = function(gameHref) {
	var gid = this.parseGameIdFromHref(gameHref);
	// make sure no duplicates are added to the list
	for ( var i = this.selectedGameIds.length - 1; i >= 0; i--) {
		if (this.selectedGameIds[i] == gid) {
			return;
		}
	}
	this.selectedGameIds.push(gid);
};
/**
 * remove a game from the list of games to be parsed
 * 
 * @param gameHref
 * @return null
 */
GameSelector.prototype.gameUnselected = function(gameHref) {
	var gid = this.parseGameIdFromHref(gameHref);
	// find it and remove it from the list
	for ( var i = this.selectedGameIds.length - 1; i >= 0; i--) {
		if (this.selectedGameIds[i] == gid) {
			this.selectedGameIds.splice(i, 1);
			return;
		}
	}
};

/**
 * Adds checkboxes next to any game box score links.
 * 
 * Hooks up a listener to click events which will maintain a list of selected
 * games
 */
GameSelector.prototype.addCheckBoxesToPage = function(doc) {
	var anchor;
	var allGameLinks = doc.evaluate(
			"//a[contains(@href, '/game/game.pl?game_id=')]", doc, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var _this = this;
	for ( var i = allGameLinks.snapshotLength - 1; i >= 0; i--) {
		anchor = allGameLinks.snapshotItem(i);
		this.allGameIds.push(anchor.href);
		// add check box after it
		var cb = doc.createElement('input');
		cb.type = 'checkbox';
		cb
				.addEventListener(
						'click',
						function(event) {
							if (event.target.checked) {
								_this
										.gameSelected(event.target.nextSibling.nextSibling.href);
							} else {
								_this
										.gameUnselected(event.target.nextSibling.nextSibling.href);
							}
						}, true);
		anchor.parentNode.insertBefore(cb, anchor);
		anchor.parentNode.insertBefore(doc.createTextNode(' '), anchor);
	}
};
/**
 * @return a list of game ids which have been selected
 */
GameSelector.prototype.getSelectedGameIds = function() {
	return this.selectedGameIds;
}

/**
 * GameReporter class
 * 
 * 'subclass' the run() method to take over once the list of games have been
 * populated
 * 
 * @param title
 * @param gameSelector
 * @param headerLinkId
 */
function GameReporter(title, gameSelector, headerLinkId) {
	this.title = title;
	this.gameSelector = gameSelector;
	this.headerLinkId = headerLinkId;
};
/**
 * extend this method to run whatever reporter it is
 * 
 * this.gameIds will be populated with the games to be parsed
 */
GameReporter.prototype.run = function() {
	// no-op
};
GameReporter.prototype.addToPage = function(doc) {
	var div = doc.createElement('div');
	var a = doc.createElement('a');
	a.appendChild(doc.createTextNode(this.title));
	var _this = this; // get this instance inside the closure
	a.addEventListener('click', function() {
		_this.run();
		var container = document.getElementById('displayContainer');
		if (container.hasChildNodes()) {
			while (container.childNodes.length >= 1) {
				container.removeChild(container.firstChild);
			}
		}
	}, true);
	div.id = this.headerLinkId;
	div.className = 'tab_off';
	div.appendChild(a);

	var headerBars = doc.evaluate(
			"//div[contains(@class, 'subhead_link_bar')]", doc, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var i = headerBars.snapshotLength - 1; i >= 0; i--) {
		headerBars.snapshotItem(i).appendChild(div);
	}
	// init the display section
	var displayContainer = document.createElement('div');
	displayContainer.id = 'displayContainer';
	document.getElementById('content').appendChild(displayContainer);
};
/**
 * Sets the text on the header button which runs the report
 * 
 * @param newText
 */
GameReporter.prototype.setLinkText = function(newText) {
	var div = document.getElementById(this.headerLinkId);
	div.firstChild.innerHTML = newText;
}
/**
 * Class encapsulating data that has been parsed from a single play
 * 
 * @return
 */
function PlayData() {
	this.bc = null;
	this.missedTackles = [];
	this.missedDivingTackles = [];
	this.tackles = [];
	this.divingTackles = [];
}
PlayData.prototype.setBallCarrier = function(ballCarrierName) {
	this.bc = ballCarrierName;
};
PlayData.prototype.getBallCarrier = function() {
	return this.bc;
};
PlayData.prototype.hasTackleData = function() {
	return this.missedTackles.length > 0 || this.missedDivingTackles.length > 0
			|| this.tackles.length > 0 || this.divingTackles.length > 0;
}
/**
 * @param tacklerName
 * @param breakTackleSA
 * @return
 */
PlayData.prototype.addMissedDivingTackle = function(tacklerName, breakTackleSA) {
	this.missedDivingTackles.push( {
		n :tacklerName,
		sa :breakTackleSA
	});
};
/**
 * @param tacklerName
 * @param breakTackleSA
 * @return
 */
PlayData.prototype.addMissedTackle = function(tacklerName, breakTackleSA) {
	this.missedTackles.push( {
		n :tacklerName,
		sa :breakTackleSA
	});
};
/**
 * @param tacklerName
 * @param tackleSA
 * @return
 */
PlayData.prototype.addDivingTackle = function(tacklerName, tackleSA) {
	this.divingTackles.push( {
		n :tacklerName,
		sa :tackleSA
	});
};
/**
 * @param tacklerName
 * @param tackleSA
 * @return
 */
PlayData.prototype.addRegularTackle = function(tacklerName, tackleSA) {
	this.tackles.push( {
		n :tacklerName,
		sa :tackleSA
	});
};
/**
 * GameReporter subclass that tracks diving tackles in games
 * 
 * for each tackle attempt, it records who the ball carrier was and who was
 * attempting the tackle and any tackle or break tackle SAs
 */
TackleReporter.prototype = new GameReporter; // Define sub-class
TackleReporter.prototype.constructor = TackleReporter;
function TackleReporter(gameSelector) {
	// Call super-class constructor
	GameReporter.call(this, 'Tackle Report', gameSelector);
	this.plays = [];
	this.gameCount = 0;
}
/**
 * parse all missed tackler names and the ball carrier SAs to fire. adds the
 * data to this.playData
 * 
 * @param playText
 * @param playData
 *            has data added to it if anything can be parsed from the given play
 *            text
 */
TackleReporter.prototype.parseMissedDivingTackles = function(playText, playData) {
	var missedPattern = /\[missed diving tackle\:\s*(.*?)\s*(\(Spin\))*(\(Power Through\))*(\(Lower the Shoulder\))*(\(Stiff Arm\))*\]/g;
	var result = missedPattern.exec(playText);
	if (result != null) {
		var breakTackleSA = null;
		if (result[2] != null) {
			breakTackleSA = 'Spin';
		} else if (result[3] != null) {
			breakTackleSA = 'Power Through';
		} else if (result[4] != null) {
			breakTackleSA = 'Lower the Shoulder';
		} else if (result[5] != null) {
			breakTackleSA = 'Stiff Arm';
		}
		playData.addMissedDivingTackle(result[1], breakTackleSA);
	}
};
/**
 * parse all missed tackler names and the ball carrier SAs to fire
 * 
 * @param playText
 * @param playData
 *            has data added to it if anything can be parsed from the given play
 *            text
 */
TackleReporter.prototype.parseMissedRegularTackles = function(playText,
		playData) {
	var missedPattern = /\[missed tackle\:\s*(.*?)\s*(\(Spin\))*(\(Power Through\))*(\(Lower the Shoulder\))*(\(Stiff Arm\))*\]/g;
	var result = missedPattern.exec(playText);
	if (result != null) {
		var breakTackleSA = null;
		if (result[2] != null) {
			breakTackleSA = 'Spin';
		} else if (result[3] != null) {
			breakTackleSA = 'Power Through';
		} else if (result[4] != null) {
			breakTackleSA = 'Lower the Shoulder';
		} else if (result[5] != null) {
			breakTackleSA = 'Stiff Arm';
		}
		playData.addMissedTackle(result[1], breakTackleSA);
	}
};
/**
 * parse the successful diving tackler name and the tackler SA to fire
 * 
 * @param playText
 * @param playData
 *            has data added to it if anything can be parsed from the given play
 *            text
 */
TackleReporter.prototype.parseDivingTackles = function(playText, playData) {
	var divingTacklePattern = /\[(Diving Tackle)*(Monster Hit)*(Big Hit)*\s*diving tackle: (.*)\]/g;
	var dvTackles = divingTacklePattern.exec(playText);
	if (dvTackles != null) {
		var tackleSA = null;
		if (dvTackles[1] != null) {
			tackleSA = dvTackles[1];
		} else if (dvTackles[2] != null) {
			tackleSA = dvTackles[2];
		} else if (dvTackles[3] != null) {
			tackleSA = dvTackles[3];
		}
		playData.addDivingTackle(dvTackles[4], tackleSA);
	}
};
/**
 * parse the successful non-diving tackler name and the tackler SA to fire
 * 
 * @param playText
 * @param playData
 *            has data added to it if anything can be parsed from the given play
 *            text
 */
TackleReporter.prototype.parseRegularTackles = function(playText, playData) {
	var tacklePattern = /\[(Diving Tackle)*(Monster Hit)*(Big Hit)*\s*tackle: (.*)\]/g;
	var result = tacklePattern.exec(playText);
	if (result != null) {
		var tackleSA = null;
		if (result[1] != null) {
			tackleSA = result[1];
		} else if (result[2] != null) {
			tackleSA = result[2];
		} else if (result[3] != null) {
			tackleSA = result[3];
		}
		playData.addRegularTackle(result[4], tackleSA);
	}
};
/**
 * parse the ball carrier name
 * 
 * @param playText
 * @param playData
 *            has data added to it if anything can be parsed from the given play
 *            text
 */
TackleReporter.prototype.parseBallCarrier = function(playText, playData) {
	// sacks
	var carrierPattern = /\>(.*)(?:\s*)(?:(?: sacked by ))+/g;
	var result = carrierPattern.exec(playText);
	if (result != null) {
		playData.setBallCarrier(result[1]);
		return null;
	}
	// rushes
	carrierPattern = /\>(.*?)(?:\s*)rush(?:(?: up the middle )|(?: to the )|(?: \[missed )|(?: \[TD\])|(?:\[forced fumble)|(?:\[Monster Hit )|(?:\[Big Hit ))+/g;
	carrierPattern.compile(carrierPattern);
	result = carrierPattern.exec(playText);
	if (result != null) {
		playData.setBallCarrier(result[1]);
		return null;
	}
	// pitches
	carrierPattern = /\>.*? pitch to (.*?)(?:\s*)(?:(?:\[TD\])|(?:\[missed )|(?: to the right)|(?: to the left)|(?: up the middle)|(?:\[forced fumble)|(?:\[Monster Hit )|(?:\[Big Hit ))/g;
	carrierPattern.compile(carrierPattern);
	result = carrierPattern.exec(playText);
	if (result != null) {
		playData.setBallCarrier(result[1]);
		return null;
	}
	// ST returns
	carrierPattern = /\>.*?\, fielded by (.*?)(?:\s*)(?:(?:\[missed)|(?:\[forced fumble\:)|(?:\, out of bounds)|(?: \(\d+)|(?: \(fair catch)|(?:\[Monster Hit )|(?:\[Big Hit ))/g;
	carrierPattern.compile(carrierPattern);
	result = carrierPattern.exec(playText);
	if (result != null) {
		playData.setBallCarrier(result[1]);
		return null;
	}
	// passes and screens
	carrierPattern = /\>.*?(?:(?:bad)*) pass to (.*?)(?:\s*)(?:(?: up the left side)|(?: up the right side)|(?: over the middle)|(?: to the left side)|(?: to the right side)|(?:\, hurried by ))/g;
	carrierPattern.compile(carrierPattern);
	result = carrierPattern.exec(playText);
	if (result != null) {
		playData.setBallCarrier(result[1]);
		return null;
	}
	/*
	 * purely for debugging, these are the known cases which won't have a ball
	 * carrier, if something slips past this, i probably need to add to the
	 * patterns
	 */
	carrierPattern = /((\[SAFETY\])|(\>Punt by .*?\(downed\))|( spikes ball\<)|(Defensive Timeout Called\:)|(Offensive Timeout Called\:)|(field goal attempted by)|(\>Punt by .*?\(touchback\))|(\>Punt by .*?\(out of bounds\))|(\>False start penalty committed by )|(\>\[forced fumble\: )|(\>\[Big Sack )|(\>\[Monster Hit)|(\>\[Big Hit)|(\>Encroachment penalty committed by ))/g;
	carrierPattern.compile(carrierPattern);
	result = carrierPattern.exec(playText);
	if (result != null) {
		return null;
	}
	var msg = 'ERROR: something slipped through the filters. Couldnt parse a ball carrier from this play description: \n' + playText;
	alert(msg);
	return null;
};
/**
 * This gets called every time a game's plays have been parsed. It's mainly just
 * waiting for the last one to be parsed so it can compile and display the
 * results.
 * 
 * @return
 */
TackleReporter.prototype.onGameParsed = function() {
	this.numGamesToParse--;
	if (this.numGamesToParse == 0) {
		this.setLinkText('Tackle Report');
		// compile results
		var compiledByBC = {};
		var p; // current playData
		var bc; // current compiled data for a ball carrier
		var tackleData; // current tackler data
		var totalTackleData; // current data for all tacklers against the
		// same ball carrier
		var data;// the reg/diving tackle counts
		for ( var i = this.plays.length - 1; i >= 0; i--) {
			p = this.plays[i];
			if (p.hasTackleData()) {
				bc = getOrCreate(compiledByBC, p.getBallCarrier());
				totalTackleData = getOrCreate(bc, '-total-');
				/*
				 * for a ball carrier, get an object for the tackler
				 * 
				 * on the tackler object: add keys by the SA name or 'NoSA'
				 * 
				 * under those keys will be an array with the number of regular
				 * and diving tackles
				 * 
				 */
				// collect missed tackles
				var index;
				for (index = p.missedTackles.length - 1; index >= 0; index--) {
					var mt = p.missedTackles[index];
					// get object for that tackler
					tackleData = getOrCreate(bc, mt.n);

					data = getDataObject(tackleData, mt.sa);
					data.mr = (data.mr) + 1;

					data = getDataObject(totalTackleData, mt.sa);
					data.mr = (data.mr) + 1;
				}
				for (index = p.missedDivingTackles.length - 1; index >= 0; index--) {
					var mdt = p.missedDivingTackles[index];
					// get object for that tackler
					tackleData = getOrCreate(bc, mdt.n);

					data = getDataObject(tackleData, mdt.sa);
					data.md = (data.md) + 1;

					data = getDataObject(totalTackleData, mdt.sa);
					data.md = (data.md) + 1;
				}
				for (index = p.tackles.length - 1; index >= 0; index--) {
					var t = p.tackles[index];
					// get object for that tackler
					tackleData = getOrCreate(bc, t.n);

					data = getDataObject(tackleData, t.sa);
					data.r = (data.r) + 1;

					data = getDataObject(totalTackleData, t.sa);
					data.r = (data.r) + 1;
				}
				for (index = p.divingTackles.length - 1; index >= 0; index--) {
					var dt = p.divingTackles[index];
					// get object for that tackler
					tackleData = getOrCreate(bc, dt.n);

					data = getDataObject(tackleData, dt.sa);
					data.d = (data.d) + 1;

					data = getDataObject(totalTackleData, dt.sa);
					data.d = (data.d) + 1;
				}
			}
		}
		/*
		 * 
		 * columns will be the keys: SA names, no SA
		 * 
		 * in each cell it will have regular and diving tackles attempt counts
		 * for that key
		 */
		var display = document.getElementById('displayContainer');
		var table = document.createElement('table');
		// table.width = '100%';
		var thead = document.createElement('thead');
		thead.className = 'sticky';
		table.appendChild(thead);
		var tbody = document.createElement('tbody');
		tbody.className = 'scrollable';
		table.appendChild(tbody);
		addTackleHeaderRow(thead);
		addSAHeaderRow(thead);
		for ( var bcKey in compiledByBC) {
			// do the totals row first
			var bcData = compiledByBC[bcKey];
			addRow(tbody, 'row-data row-data-highlight', bcKey, 'All Tacklers',
					bcData['-total-']);
			// then go through the tacklers
			for ( var tacklerKey in bcData) {
				if (tacklerKey != '-total-') {
					addRow(tbody, 'row-data', ' ', tacklerKey,
							bcData[tacklerKey]);
				}
			}
		}
		display.appendChild(table);
	} else {
		// still have more to parse before compiling data
		var percentComplete = Math
				.round(((this.gameCount - this.numGamesToParse) / this.gameCount) * 100);
		this.setLinkText('Loading [ ' + percentComplete + '% ]');
	}
}
/**
 * 
 */
TackleReporter.prototype.run = function() {
	GameReporter.prototype.run.call(this);// super
	var gid;
	var gameIds = this.gameSelector.getSelectedGameIds();
	// use this count to determine when we're done waiting for games to parse
	this.numGamesToParse = gameIds.length;
	this.gameCount = this.numGamesToParse;
	// parse the games
	for ( var i = gameIds.length - 1; i >= 0; i--) {
		gid = gameIds[i];
		var _this = this;// keeping the instance for the onload closure
		GM_xmlhttpRequest( {
			method :"GET",
			url :"http://goallineblitz.com/game/game.pl?game_id=" + gid
					+ "&mode=pbp",
			onload : function(response) {
				var text = response.responseText;
				var playTextPattern = /(td class=\"pbp_play\"\>(.*)\<)+/g;
				var result = text.match(playTextPattern);
				for ( var ri = result.length - 1; ri >= 0; ri--) {
					/*
					 * ignore if there was a fumble or interception since that
					 * would be a mess trying to decide who was the ball carrier
					 * at the time of the tackle attempt
					 */
					if (result[ri].indexOf('intercepted by') < 0
							&& result[ri].indexOf('forced fumble:') < 0) {
						/*
						 * data for all tackle attempts in a single play
						 */
						var playData = new PlayData();

						var playText = result[ri];

						_this.parseBallCarrier(playText, playData);

						_this.parseMissedDivingTackles(playText, playData);

						_this.parseMissedRegularTackles(playText, playData);

						_this.parseDivingTackles(playText, playData);

						_this.parseRegularTackles(playText, playData);

						if (playData.hasTackleData()) {
							_this.plays.push(playData);
						}
					} else {
						log('skipping this play for an interception or fumble: ' + result[ri]);
					}
				}
				_this.onGameParsed();
			}
		});
	}
};

/**
 * Classes:<br>
 * GameSelector<br>
 * -adds check boxes next to game links on the page<br>
 * -listens for game checkboxes to be checked/unchecked<br>
 * -maintains a list of selected game ids
 * <p>
 * TackleReporter<br>
 * -adds a link in the page header for running a report of tackle data for all
 * games selected by the GameSelector
 * 
 * 
 */
function entryPoint() {
	gameSelector = new GameSelector();
	gameSelector.addCheckBoxesToPage(document);
	var tackleReporter = new TackleReporter(gameSelector);
	tackleReporter.addToPage(document);
}

entryPoint();

function log() {
	GM_log(arguments);
}

/**
 * Checks the object for a member with the given key. if it exists, that member
 * is returned. if it does not exist, a new member is created, added to the
 * object with the given key and returned from the function
 * 
 * @param object
 * @param key
 * @return
 */
function getOrCreate(object, key) {
	var tmp = object[key];
	if (tmp == null) {
		tmp = {};
		object[key] = tmp;
	}
	return tmp;
}

/**
 * Given the tackle data for a specific ball carrier and tackler pair, get the
 * correct data object to hold counts of:
 * 
 * missed regular tackles [mr], missed diving tackles [md], made diving tackles
 * [d], made regular tackles [r]
 * 
 * @param tackleData
 * @param sa
 * @return
 */
function getDataObject(tackleData, sa) {
	// check for an SA or no nSA for a key
	if (sa != null) {
		data = getOrCreate(tackleData, sa);
	} else {
		data = getOrCreate(tackleData, 'none');
	}
	if (data.md == null) {
		// this was the first instance of this type of tackle,
		// reset the counts to zero
		data.md = 0;
		data.mr = 0;
		data.d = 0;
		data.r = 0;
	}
	return data;
}

/**
 * @param table
 * @param className
 * @param firstCol
 * @param secondCol
 * @param data
 * @return
 */
function addRow(table, className, firstCol, secondCol, data) {
	var tr = document.createElement('tr');
	tr.className = className;
	addCol(tr, firstCol);
	addCol(tr, secondCol);
	addCol(tr, getBrkTckCellData(data['none']));
	addCol(tr, getBrkTckCellData(data['Lower the Shoulder']));
	addCol(tr, getBrkTckCellData(data['Stiff Arm']));
	addCol(tr, getBrkTckCellData(data['Power Through']));
	addCol(tr, getBrkTckCellData(data['Spin']));
	addCol(tr, getMkTckCellData(data['none']));
	addCol(tr, getMkTckCellData(data['Diving Tackle']));
	addCol(tr, getMkTckCellData(data['Big Hit']));
	addCol(tr, getMkTckCellData(data['Monster Hit']));
	table.appendChild(tr);
}
/**
 * @return string to go in each cell
 */
function getMkTckCellData(data) {
	if (data == null || (data.r == 0 && data.d == 0)) {
		return '';
	}
	return data.r + ':' + data.d;
}
/**
 * @return string to go in each cell
 */
function getBrkTckCellData(data) {
	if (data == null || (data.mr == 0 && data.md == 0)) {
		return '';
	}
	return data.mr + ':' + data.md;
}
function addTackleHeaderRow(table) {
	var tr = document.createElement('tr');
	tr.className = 'row-header-1'
	addHeaderCol(tr, '', 2);
	addHeaderCol(tr, 'Broken Tackles (normal:diving)', 5);
	addHeaderCol(tr, 'Successful Tackles (normal:diving)', 4);
	table.appendChild(tr);
}

function addSAHeaderRow(table) {
	var tr = document.createElement('tr');
	tr.className = 'row-header-2'
	addHeaderCol(tr, 'Ball Carrier');
	addHeaderCol(tr, 'Tackler');
	addHeaderCol(tr, 'No SA');
	addHeaderCol(tr, 'Lower the Shoulder');
	addHeaderCol(tr, 'Stiff Arm');
	addHeaderCol(tr, 'Power Through');
	addHeaderCol(tr, 'Spin');
	addHeaderCol(tr, 'No SA');
	addHeaderCol(tr, 'Diving Tackle SA');
	addHeaderCol(tr, 'Big Hit');
	addHeaderCol(tr, 'Monster Hit');
	table.appendChild(tr);
}
function addHeaderCol(row, cellData, colSpan) {
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(cellData));
	if (colSpan != null) {
		td.colSpan = colSpan;
	}
	row.appendChild(td);
}
function addCol(row, cellData, colSpan) {
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(cellData));
	if (colSpan != null) {
		td.colSpan = colSpan;
	}
	row.appendChild(td);
}
