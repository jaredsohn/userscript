// ==UserScript==
// @name           GLB PlayerCreator
// @namespace      monsterkill
// @description    description
// @include        http://goallineblitz.com/game/create_player.pl*
// ==/UserScript==

GM_addStyle(".container_12 {margin-left: auto; margin-right: auto; width: 960px; clear: both}");
GM_addStyle(".grid_1, .grid_2,.grid_3, .grid_4,.grid_5,.grid_6,.grid_7,.grid_8,.grid_9,.grid_10,.grid_11,.grid_12 {	display:inline;	float: left;position: relative;margin-left: 10px;margin-right: 10px;}");
GM_addStyle(".grid_1 {width:60px; }");
GM_addStyle(".grid_2 {width:140px; }");
GM_addStyle(".grid_3 {width:220px; }");
GM_addStyle(".grid_12 {width:940px; }");
GM_addStyle(".label {clear:both;}");
GM_addStyle(".hidden {display:none;}");

var scriptData = {
	h :'',
	w :'',
	position :'',
	firstAtt :'',
	secondAtt :'',
	sa :'',
	archetype :'',
	firstName :'',
	secondName :'',
	pwd :'',
	teamId :28,// deprecated only used for making an offer from a specific team
	desiredBreakThroughs :3,
	pollForTeamOffers :false,
	debugLoggingEnabled :false,
	canceled :false,
	highestBreakThroughs :0,
	boostTrainingThreeTimes :false,
	useFreePlayer :false
};

/**
 * These messages always get logged
 * 
 * @param msg
 * @return
 */
function log(msg) {
	GM_log(msg);
}

/**
 * These messages are only logged if debugLoggingEnabled is true
 * 
 * @param msg
 * @return
 */
function debug(msg) {
	if (scriptData.debugLoggingEnabled) {
		GM_log(msg);
	}
}
function alertUserScriptWasCanceled() {
	alert("Script canceled.");
}
/*
 * got tired of seeing red lines everywhere i have a GM_xmlhttpRequest function
 */
function request(args) {
	GM_xmlhttpRequest(args);
}
/**
 * @param playerId
 * @return
 */
function retirePlayer(playerId) {
	var params = [
			"keepname=", 0, "&password=", scriptData.pwd,
			"&action=Retire&player_id=", playerId
	];
	request( {
		method :"POST",
		url :"http://goallineblitz.com/game/retire_player.pl?player_id="
				+ playerId,
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			var pwdFailed = "The password you entered was invalid.";
			var index = response.responseText.indexOf(pwdFailed);
			if (index > -1) {
				alert(pwdFailed
						+ " Script canceled.\nYou'll need to manually retire the new player before running the script again.");
				return;
			}
			if (!scriptData.canceled) {
				debug("Retired. Trying again.");
				doCreatePlayer();
			} else {
				log("Retired. Script is done.");
				alertUserScriptWasCanceled();
			}
		}
	});
}
function updateHistory(latestBTcount) {
	var msg = '';
	var key = latestBTcount;
	if (scriptData.history == null) {
		scriptData.history = [];
	}
	if (scriptData.history[key] == null) {
		scriptData.history[key] = 0;
	}
	scriptData.history[key] = scriptData.history[key] + 1;
	for ( var k in scriptData.history) {
		msg += k + "&nbsp;:&nbsp;" + scriptData.history[k] + "<br />";
	}
	document.getElementById("historyContainer").innerHTML = msg;
}

function handleEndOfScript(playerId, breakThroughCount) {
	if (breakThroughCount > scriptData.highestBreakThroughs) {
		scriptData.highestBreakThroughs = breakThroughCount;
	}
	updateHistory(breakThroughCount);
	if (breakThroughCount < scriptData.desiredBreakThroughs) {
		if (breakThroughCount > 0) {
			debug("Not enough training break throughs (" + breakThroughCount
					+ "). Retiring.");
		}
		retirePlayer(playerId);
	} else {
		var msg = "Finally got enough break throughs (" + breakThroughCount
				+ "). Stopping now.";
		log(msg);
		alert(msg);
		document.getElementById('startBuilderButton').disabled = false;
	}
}

function cancelScript() {
	debug("canceling the script");
	scriptData.canceled = true;
	document.getElementById('startBuilderButton').disabled = false;
}

/**
 * 
 * @param playerId
 * @param stepsDone
 * @param breakThroughCount
 * @return
 */
function intenseTrain(playerId, stepsDone, breakThroughCount) {
	if (scriptData.canceled) {
		log("script canceled");
		retirePlayer(playerId);
		return;
	}
	if (stepsDone == 0 || stepsDone == 4
			|| (scriptData.boostTrainingThreeTimes && stepsDone == 14)) {
		boostTraining(playerId, stepsDone + 1, breakThroughCount);
	} else {
		var params = [
				"training_type=intense&training1=", scriptData.firstAtt,
				"&player_id=", playerId, "&action=Train"
		];
		request( {
			method :"POST",
			url :"http://goallineblitz.com/game/training.pl",
			data :params.join(""),
			headers : {
				"Content-Type" :"application/x-www-form-urlencoded"
			},
			onload : function(response) {
				handleTrainingResponse(response.responseText, playerId,
						stepsDone, breakThroughCount);
			}
		});
	}
}

function handleTrainingResponse(responseText, playerId, stepsDone,
		breakThroughCount) {
	var notEnoughTPText = "You do not have enough training points to complete the selected training.";
	var index = responseText.indexOf(notEnoughTPText);
	if (index > -1) {
		debug("Not enough TP to continue training.");
		handleEndOfScript(playerId, breakThroughCount);
	} else {
		var nonBTText = "bt_alert=0"
		if (responseText.indexOf(nonBTText) > -1) {
			debug("Intense Trained: ---");
		} else {
			debug("Intense Trained: Break Through!");
			breakThroughCount++;
		}
		intenseTrain(playerId, stepsDone + 1, breakThroughCount);
	}
}

/**
 * @param playerId
 * @param trainsTodo
 * @param breakThroughCount
 * @return
 */
function boostTraining(playerId, trainsTodo, breakThroughCount) {
	var params = [
			"mode=upgrade&player_id=", playerId, "&upgrade=enhanced_",
			scriptData.firstAtt
	];
	request( {
		method :"POST",
		url :"http://goallineblitz.com/game/bonus_tokens.pl",
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			var successText = "finishUpgrade";
			if (response.responseText.indexOf(successText) > -1) {
				debug("Boosted training: " + scriptData.firstAtt);
				intenseTrain(playerId, trainsTodo, breakThroughCount);
			} else {
				debug("Failed to boost training: " + scriptData.firstAtt);
				alert("Failed to boost training: " + scriptData.firstAtt);
				cancelScript();
			}
		}
	});
}

/**
 * @param playerId
 * @param scriptData
 * @return
 */
function makeOffer(playerId) {
	var params = [
			"team_id=",
			scriptData.teamId,
			"&daily_salary=%244375.00&no_trade=1&contract_type=seasony&duration_season=1&duration_day_to_day=10&player_id=",
			playerId,
			"&note=invite%20from%20reroller%20script&action=Send%20Offer"
	];
	debug(params.join(""));
	request( {
		method :"POST",
		url :"http://goallineblitz.com/game/make_offer.pl",
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			debug("Offer sent");
			retirePlayer(playerId);
		}
	});
}

/**
 * @param playerId
 * @param teamId
 * @param scriptData
 * @return
 */
function acceptOffer(playerId, teamId) {
	request( {
		method :"GET",
		url :"http://goallineblitz.com/game/offers.pl?player_id=" + playerId
				+ "&accept=" + teamId,
		onload : function(response) {
			debug("Accepted Offer to team id: " + teamId);
			startTraining(playerId);
		}
	});
}

function startTraining(playerId) {
	intenseTrain(playerId, 0, 0);
}

/**
 * TODO check that it is a cpu team
 * 
 * @param playerId
 * @return
 */
function pollForOffers(playerId) {
	request( {
		method :"GET",
		url :"http://goallineblitz.com/game/offers.pl?player_id=" + playerId,
		onload : function(response) {
			var regexp = /acceptOffer\('(\d+)'/ig;
			var result = regexp.exec(response.responseText);
			if (result != null && result.length > 1) {
				debug("Found an offer.");
				acceptOffer(playerId, result[1]);
			} else {
				debug("polling for offers every 20 seconds...");
				setTimeout( function() {
					pollForOffers(playerId);
				}, 20000);
			}
		}
	});

}
/**
 * TODO
 * 
 * @param playerId
 * @return
 */
function requestCPUOffers(playerId) {
	request( {
		method :"GET",
		url :"http://goallineblitz.com/game/offers.pl?player_id=" + playerId
				+ "&get_cpu=1",
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			debug("Requested cpu offers");
			pollForOffers(playerId);
		}
	});
}

/**
 * get the minimum for the attribute, either 8 or 10
 * 
 * @param pageText
 * @param att
 * @return
 */
function getAttributeMin(pageText, att) {
	var regexp = new RegExp("\\[position\\]\\[\\'" + att
			+ "\\'\\].*?=.*?([-]*\\d+)", "gi");
	var result = regexp.exec(pageText);
	if (result != null && result.length > 1) {
		return (parseInt(result[1]) < 0 ? 8 : 10);
	} else {
		log("failed to parse attribute adjustment for " + att);
		return 0;
	}
}

/**
 * @param playerId
 * @param pageText
 * @return
 */
function setSPHeightAndWeight(playerId, pageText) {
	var allAtts = [
			"strength", "speed", "agility", "jumping", "stamina", "vision",
			"confidence", "blocking", "tackling", "throwing", "catching",
			"carrying", "kicking", "punting"
	];
	var currentPrimary = getAttributeMin(pageText, scriptData.firstAtt);
	var currentSecondary = getAttributeMin(pageText, scriptData.secondAtt);
	var spToSpend = 149;
	for ( var attIndex in allAtts) {
		spToSpend = spToSpend - getAttributeMin(pageText, allAtts[attIndex]);
	}
	var secondaryVal = spToSpend - (25 - currentPrimary) + currentSecondary;
	var params = [
			"action=Submit&player_id=", playerId, "&height=", scriptData.h,
			"&weight=", scriptData.w
	];
	for ( var i = allAtts.length - 1; i >= 0; i--) {
		var a = allAtts[i];
		params.push("&");
		params.push(a);
		params.push("=");
		if (a == scriptData.firstAtt) {
			params.push(25);
		} else if (a == scriptData.secondAtt) {
			params.push(secondaryVal);
		} else {
			params.push(getAttributeMin(pageText, a));
		}
	}
	var postData = params.join("");
	request( {
		method :"POST",
		url :"http://goallineblitz.com/game/reroll_player.pl",
		data :postData,
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded",
			"Content-Length" :postData.length
		},
		onload : function(response) {
			debug("Attributes, Height, and Weight set.");
			if (scriptData.pollForTeamOffers) {
				requestCPUOffers(playerId);
			} else {
				startTraining(playerId);
			}
		}
	});
}

function requestRerollPage(playerId) {
	request( {
		method :"GET",
		url :"http://goallineblitz.com/game/reroll_player.pl?player_id="
				+ playerId,
		onload : function(response) {
			debug("Loaded reroll page");
			setSPHeightAndWeight(playerId, response.responseText);
		}
	});
}
/**
 * @return true if the archetype page successfully passed
 */
function validatePickArchetype(responseText) {
	var regexp = /reroll_player.pl\?player_id=(\d+)/ig;
	var result = regexp.exec(responseText);
	return (result != null && result.length > 1);
}

/**
 * @param playerId
 * @return
 */
function sendPickArchetypeRequest(playerId) {
	request( {
		method :"POST",
		url :"http://goallineblitz.com/game/choose_archetype.pl?player_id="
				+ playerId,
		data :"archetype=" + scriptData.archetype + "&sa=" + scriptData.sa
				+ "&player_id=" + playerId + "&action=Submit",
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			if (validatePickArchetype(response.responseText)) {
				debug("Picked archetype");
				requestRerollPage(playerId);
			} else {
				debug("Failed to pick archetype: \n" + response.responseText);
			}
		}
	});
}

/**
 * @param txt
 * @return the parsed player id or null
 */
function getPlayerId(txt) {
	var regexp = /choose_archetype.pl\?player_id=(\d+)/img;
	var result = regexp.exec(txt);
	if (result != null && result.length > 1) {
		return result[1];
	} else {
		return null;
	}
}
function initScriptData() {
	scriptData.canceled = false;
	scriptData.history = null;
	var firstname = document.getElementById("first_name_field");
	scriptData.firstName = firstname.value;
	var lastname = document.getElementById("last_name_field");
	scriptData.secondName = lastname.value;
	scriptData.position = document.getElementById('positionSelect').value;
	scriptData.firstAtt = document.getElementById('primarySelect').value;
	scriptData.secondAtt = document.getElementById('secondarySelect').value;
	scriptData.h = document.getElementById('heightSelect').value;
	scriptData.w = document.getElementById('weightSelect').value;
	scriptData.archetype = document.getElementById('archSelect').value;
	scriptData.sa = document.getElementById('saSelect').value;
	scriptData.desiredBreakThroughs = Number(document
			.getElementById('breakThroughsInput').value);
	scriptData.boostTrainingThreeTimes = document
			.getElementById('thirdBoostSelect').value == "true";
	scriptData.useFreePlayer = document.getElementById('useFreePlayerSelect').value == "true";
	if (isNaN(scriptData.desiredBreakThroughs)) {
		alert('Need to enter a number for target break throughs');
		cancelScript();
		return;
	}
	if (scriptData.firstAtt == scriptData.secondAtt) {
		alert('Can not have the same attribute for primary and secondary');
		cancelScript();
		return;
	}
	scriptData.pwd = prompt(
			"Enter your glb password so the reroller script can retire players that don't pick up enough training breakthroughs.",
			"");
	if (scriptData.pwd == null || "" == scriptData.pwd) {
		alert('Need a password to continue');
		cancelScript();
	} else {
		document.getElementById('startBuilderButton').disabled = true;
	}
}
/**
 * Create the player
 * 
 * @return
 */
function doCreatePlayer() {
	var params = [
			"first_name=", scriptData.firstName, "&last_name=",
			scriptData.secondName, "&position=", scriptData.position,
			"&use_rp=0&action=Submit"
	];
	if (scriptData.useFreePlayer) {
		params.push("&free_player=1")
	}
	request( {
		method :"POST",
		url :"http://goallineblitz.com/game/create_player.pl",
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			var pid = getPlayerId(response.responseText);
			if (pid != null) {
				debug("Created player");
				sendPickArchetypeRequest(pid);
			} else {
				alert("Initial player creation failed. Is there already a player with that name? Do you have enough flex points?");
				cancelScript();
			}
		}
	});
}

function startScript() {
	initScriptData();
	if (!scriptData.canceled) {
		doCreatePlayer();
	}
}
/**
 * UI Stuff
 */

/*
 * populate the given dropdown with an option for each attribute
 * 
 */
function fillDropdown(selectElement, options) {
	selectElement.innerHTML = "";
	for ( var a = 0; a < options.length; a++) {
		var id = options[a];
		addElement('option', id, selectElement, {
			value :options[a],
			innerHTML :options[a]
		});
	}
}
function fillDropdownRange(selectElement, max) {
	selectElement.innerHTML = "";
	for ( var a = max * -1; a <= max; a++) {
		addElement('option', null, selectElement, {
			value :a,
			innerHTML :a
		});
	}
}
var positions = [
		'QB', 'HB', 'FB', 'OT', 'G', 'C', 'TE', 'WR', 'DT', 'DE', 'LB', 'SS',
		'FS', 'CB', 'P', 'K'
];
var attributes = [
		'strength', 'speed', 'agility', 'jumping', 'stamina', 'vision',
		'confidence', 'blocking', 'throwing', 'catching', 'carrying',
		'tackling', 'kicking', 'punting'
];

var defensiveSAs = [
		"balance", "big_hit", "blitz", "break_through", "closing_speed", "cut",
		"disguise_blitz", "fire_up", "first_step", "gang_tackle", "get_low",
		"head_of_steam", "headhunter", "jackhammer", "jumping_catch",
		"pancake", "relentless", "run_block", "shutdown_coverage",
		"smooth_operator", "sticky_hands", "strong_base", "superior_vision",
		"tunnel_vision", "wall", "wrap_up_tackle", "zone_focus"
];
var offensiveSAs = [
		'absorb_pain', 'aura_of_intimidation', 'balance', 'gang_tackle',
		'get_low', 'hands', 'headhunter', 'hurdle', 'lead_block',
		'lower_the_shoulder', 'monster_hit', 'open_field_fake', 'pancake',
		'pass_block', 'power_through', 'pummel', 'return_specialist',
		'run_block', 'scat_back', 'shed_block', 'snarl', 'stiff_arm',
		'superior_vision', 'surge', 'wall'
];
var kickerSAs = [
		'aura_of_intimidation', 'balance', 'big_hit', 'break_through',
		'closing_speed', 'diving_tackle', 'first_step', 'gang_tackle',
		'hang_time', 'headhunter', 'monster_hit', 'shed_block', 'snarl',
		'strong_base', 'superior_vision', 'wall', 'wrap_up_tackle'
];
var positionData = {
	QB : {
		arch : [
				'Pocket Passer', 'Deep Passer', 'Scrambler'
		],
		sas : [
				'cover_up', 'dive', 'first_step', 'head_fake', 'juke',
				'lower_the_shoulder', 'power_through', 'spin', 'spot_blitz',
				'balance', 'hurdle', 'open_field_fake', 'quick_read', 'surge',
				'look_off'
		],
		weightOptions :18,
		heightOptions :3
	},
	HB : {
		arch : [
				'Power Back', 'Elusive Back', 'Scat Back', 'Combo Back',
				'Returner', 'Special Teamer'
		],
		sas : [
				'absorb_pain', 'aura_of_intimidation', 'big_hit',
				'break_through', 'cut_block', 'diving_catch', 'diving_tackle',
				'foundation', 'get_low', 'hands', 'jumping_catch',
				'lead_block', 'monster_hit', 'one_handed_catch', 'pancake',
				'pass_block', 'return_specialist', 'route_running',
				'run_block', 'shed_block', 'shock_block', 'snarl',
				'spot_blitz', 'sticky_hands', 'strong_arm', 'superior_vision',
				'wall', 'balance', 'brace_for_impact', 'catch_in_stride',
				'gang_tackle', 'headhunter', 'hurdle', 'open_field_fake',
				'pummel', 'surge', 'scat_back', 'catch_fake'
		],
		weightOptions :22,
		heightOptions :2
	},
	FB : {
		arch : [
				'Rusher', 'Blocker', 'Combo Back', 'Scat Back',
				'Special Teamer'
		],
		sas : [
				'absorb_pain', 'aura_of_intimidation', 'big_hit',
				'break_through', 'cut_block', 'diving_catch', 'diving_tackle',
				'first_step', 'foundation', 'get_low', 'head_fake', 'juke',
				'jumping_catch', 'lower_the_shoulder', 'monster_hit',
				'one_handed_catch', 'pass_block', 'return_specialist',
				'route_running', 'run_block', 'shed_block', 'shock_block',
				'snarl', 'spin', 'stiff_arm', 'superior_vision', 'wall',
				'balance', 'brace_for_impact', 'catch_in_stride',
				'gang_tackle', 'headhunter', 'hurdle', 'open_field_fake',
				'pummel', 'surge', 'scat_back', 'catch_fake'
		],
		weightOptions :22,
		heightOptions :2
	},
	WR : {
		arch : [
				'Speedster', 'Possession Receiver', 'Power Receiver',
				'Returner', 'Special Teamer'
		],
		sas : [
				'absorb_pain', 'aura_of_intimidation', 'big_hit',
				'break_through', 'cover_up', 'cut_block', 'dive',
				'diving_tackle', 'get_low', 'hands', 'lead_block',
				'lower_the_shoulder', 'monster_hit', 'pancake', 'pass_block',
				'power_through', 'return_specialist', 'run_block',
				'shed_block', 'snarl', 'stiff_arm', 'superior_vision', 'wall',
				'balance', 'brace_for_impact', 'catch_in_stride',
				'gang_tackle', 'headhunter', 'hurdle', 'open_field_fake',
				'pummel', 'surge', 'scat_back', 'catch_fake'
		],
		weightOptions :9,
		heightOptions :3
	},
	TE : {
		arch : [
				'Blocker', 'Power Receiver', 'Receiver', 'Dual Threat',
				'Special Teamer'
		],
		sas : [
				'absorb_pain', 'aura_of_intimidation', 'big_hit',
				'break_through', 'cut_block', 'dive', 'diving_catch',
				'diving_tackle', 'first_step', 'foundation', 'head_fake',
				'juke', 'jumping_catch', 'lead_block', 'monster_hit',
				'one_handed_catch', 'power_through', 'return_specialist',
				'shed_block', 'shock_block', 'snarl', 'spin', 'spot_blitz',
				'stiff_arm', 'strong_arm', 'superior_vision', 'wall',
				'balance', 'brace_for_impact', 'catch_in_stride',
				'gang_tackle', 'headhunter', 'hurdle', 'open_field_fake',
				'pummel', 'surge', 'scat_back', 'catch_fake'
		],
		weightOptions :9,
		heightOptions :3
	},
	C : {
		arch : [
				'Pass Blocker', 'Run Blocker', 'Special Teamer'
		],
		sas : [
				'absorb_pain', 'aura_of_intimidation', 'big_hit',
				'break_through', 'cut', 'diving_tackle', 'first_step',
				'lead_block', 'monster_hit', 'shed_block', 'snarl',
				'spot_blitz', 'strong_base', 'superior_vision',
				'wrap_up_tackle', 'balance', 'gang_tackle', 'headhunter',
				'pummel'
		],
		weightOptions :9,
		heightOptions :3
	},
	G : {
		arch : [
				'Pass Blocker', 'Run Blocker', 'Special Teamer'
		],
		sas : [
				'aura_of_intimidation', 'big_hit', 'break_through', 'cut',
				'diving_tackle', 'first_step', 'lead_block', 'monster_hit',
				'shed_block', 'snarl', 'spot_blitz', 'strong_base',
				'superior_vision', 'wrap_up_tackle', 'balance', 'gang_tackle',
				'headhunter', 'pummel'
		],
		weightOptions :9,
		heightOptions :3
	},
	OT : {
		arch : [
				'Pass Blocker', 'Run Blocker', 'Special Teamer'
		],
		sas : [
				'big_hit', 'aura_of_intimidation', 'break_through', 'cut',
				'diving_tackle', 'first_step', 'lead_block', 'monster_hit',
				'shed_block', 'snarl', 'spot_blitz', 'strong_arm',
				'strong_base', 'superior_vision', 'wrap_up_tackle', 'balance',
				'gang_tackle', 'headhunter', 'pummel'
		],
		weightOptions :9,
		heightOptions :3
	},
	DT : {
		arch : [
				'Run Stuffer', 'Pass Rusher', 'Combo Tackle', 'Special Teamer'
		],
		sas : [
				'jumping_catch', 'aura_of_intimidation', 'blitz',
				'closing_speed', 'cut', 'defense_general', 'diving_catch',
				'diving_tackle', 'first_step', 'get_low', 'jumping_catch',
				'monster_hit', 'one_handed_catch', 'pancake', 'run_block',
				'shutdown_coverage', 'smooth_operator', 'sticky_hands',
				'superior_vision', 'trash_talk', 'tunnel_vision',
				'wrap_up_tackle', 'balance', 'disguise_blitz', 'fire_up',
				'gang_tackle', 'headhunter', 'head_of_steam', 'jackhammer',
				'relentless', 'zone_focus'
		],
		weightOptions :18,
		heightOptions :3
	},
	DE : {
		arch : [
				'Run Stuffer', 'Pass Rusher', 'Combo End', 'Special Teamer'
		],
		sas : [
				'jumping_catch', 'aura_of_intimidation', 'big_hit', 'blitz',
				'break_through', 'closing_speed', 'defense_general',
				'diving_catch', 'd_line_general', 'get_low', 'glare',
				'jumping_catch', 'one_handed_catch', 'pancake', 'run_block',
				'shutdown_coverage', 'smooth_operator', 'snarl',
				'sticky_hands', 'superior_vision', 'trash_talk',
				'wrap_up_tackle', 'balance', 'disguise_blitz', 'fire_up',
				'gang_tackle', 'headhunter', 'head_of_steam', 'jackhammer',
				'relentless', 'zone_focus'
		],
		weightOptions :18,
		heightOptions :3
	},
	CB : {
		arch : [
				'Man Specialist', 'Zone Specialist', 'Hard Hitter',
				'Combo Corner', 'Returner', 'Special Teamer'
		],
		sas : [
				'jumping_catch', 'aura_of_intimidation', 'big_hit', 'big_sack',
				'break_through', 'cover_up', 'dive', 'diving_tackle',
				'get_low', 'glare', 'head_fake', 'juke', 'lower_the_shoulder',
				'monster_hit', 'pancake', 'power_through', 'run_block',
				'shed_block', 'snarl', 'spin', 'stiff_arm', 'strong_base',
				'trash_talk', 'tunnel_vision', 'wall', 'wrap_up_tackle',
				'balance', 'disguise_blitz', 'fire_up', 'gang_tackle',
				'headhunter', 'head_of_steam', 'hurdle', 'jackhammer',
				'open_field_fake', 'relentless', 'zone_focus'
		],
		weightOptions :18,
		heightOptions :3
	},
	SS : {
		arch : [
				'Man Specialist', 'Zone Specialist', 'Hard Hitter',
				'Combo Safety', 'Special Teamer'
		],
		sas : [
				'jumping_catch', 'aura_of_intimidation', 'big_sack', 'blitz',
				'break_through', 'first_step', 'get_low', 'glare', 'pancake',
				'run_block', 'shed_block', 'shutdown_coverage',
				'smooth_operator', 'strong_base', 'trash_talk',
				'tunnel_vision', 'wall', 'balance', 'disguise_blitz',
				'fire_up', 'gang_tackle', 'headhunter', 'head_of_steam',
				'jackhammer', 'relentless', 'zone_focus'
		],
		weightOptions :18,
		heightOptions :3
	},
	FS : {
		arch : [
				'Man Specialist', 'Zone Specialist', 'Hard Hitter',
				'Combo Safety', 'Special Teamer'
		],
		sas : [
				'jumping_catch', 'aura_of_intimidation', 'big_sack', 'blitz',
				'break_through', 'get_low', 'glare', 'monster_hit', 'pancake',
				'run_block', 'shed_block', 'smooth_operator', 'sticky_hands',
				'strong_base', 'trash_talk', 'tunnel_vision', 'wall',
				'balance', 'disguise_blitz', 'fire_up', 'gang_tackle',
				'headhunter', 'head_of_steam', 'jackhammer', 'relentless',
				'zone_focus'
		],
		weightOptions :18,
		heightOptions :3
	},
	LB : {
		arch : [
				'Coverage Linebacker', 'Blitzer', 'Hard Hitter',
				'Combo Linebacker', 'Special Teamer'
		],
		sas : [
				'jumping_catch', 'big_hit', 'blitz', 'break_through',
				'closing_speed', 'cut', 'first_step', 'get_low', 'pancake',
				'run_block', 'shutdown_coverage', 'smooth_operator',
				'sticky_hands', 'strong_base', 'superior_vision',
				'tunnel_vision', 'wall', 'wrap_up_tackle', 'balance',
				'disguise_blitz', 'fire_up', 'gang_tackle', 'headhunter',
				'head_of_steam', 'jackhammer', 'relentless', 'zone_focus'
		],
		weightOptions :18,
		heightOptions :3
	},
	K : {
		arch : [
				'Boomer', 'Technician'
		],
		sas : [
				'aura_of_intimidation', 'big_hit', 'break_through',
				'closing_speed', 'cut', 'diving_tackle', 'first_step',
				'hang_time', 'monster_hit', 'shed_block', 'snarl',
				'strong_base', 'superior_vision', 'wall', 'wrap_up_tackle',
				'balance', 'gang_tackle', 'headhunter'
		],
		weightOptions :18,
		heightOptions :3
	},
	P : {
		arch : [
				'Boomer', 'Technician'
		],
		sas : [
				'aura_of_intimidation', 'automatic', 'big_hit',
				'break_through', 'closing_speed', 'cut', 'diving_tackle',
				'first_step', 'monster_hit', 'shed_block', 'snarl',
				'strong_base', 'superior_vision', 'wall', 'wrap_up_tackle',
				'balance', 'gang_tackle', 'headhunter'
		],
		weightOptions :18,
		heightOptions :3
	}
};
/*
 * type, id, parentNode, attributes, innerHTML
 */
function addElement(type, id, parentNode, attributes, innerHTML) {
	var e = document.createElement(type);
	if (id != null) {
		e.id = id;
	}
	parentNode.appendChild(e);
	if (attributes != null) {
		for ( var attName in attributes) {
			e[attName] = attributes[attName];
		}
	}
	if (innerHTML != null) {
		e.innerHTML = innerHTML;
	}
	return e;
}
function addField(parent, label, width) {
	var w = width;
	if (w == null) {
		w = "grid_2";
	}
	var f = addElement('div', null, parent, {
		className :w
	});
	var l = addElement('div', null, f, {
		className :'label'
	}, label);

	return f;
}
function onPositionChange() {
	// update the archetypes
	var pos = document.getElementById('positionSelect').value;
	var posData = positionData[pos];
	fillDropdownRange(document.getElementById('heightSelect'), 100);
	fillDropdownRange(document.getElementById('weightSelect'), 100);
	fillDropdown(document.getElementById('archSelect'), posData.arch);
	fillDropdown(document.getElementById('saSelect'), posData.sas);
}
function onLogClicked() {
	if (scriptData.debugLoggingEnabled) {
		scriptData.debugLoggingEnabled = false;
		document.getElementById('loggingButton').value = 'Enable Logging';
		alert("Logging disabled.");
	} else {
		scriptData.debugLoggingEnabled = true;
		document.getElementById('loggingButton').value = 'Disable Logging';
		alert("Logging enabled. CTRL-SHIFT-J to bring up the console.");
	}
}
function addUI() {
	var submit = document.getElementById("submit");
	var containerDiv = addElement('div', null, submit.parentNode, {
		className :'container_12'
	});
	// positions
	var f = addField(containerDiv, 'Position', 'grid_1');
	var positionSelect = addElement('select', 'positionSelect', f, null);
	fillDropdown(positionSelect, positions);
	positionSelect.addEventListener("change", onPositionChange, true);
	// archetypes
	f = addField(containerDiv, 'Archetype');
	var sel = addElement('select', 'archSelect', f, null);
	fillDropdown(sel,
			positionData[document.getElementById('positionSelect').value].arch);
	// SAs
	f = addField(containerDiv, 'Special Ability');
	sel = addElement('select', 'saSelect', f, null);
	fillDropdown(sel,
			positionData[document.getElementById('positionSelect').value].sas);
	// primary att
	f = addField(containerDiv, 'Primary Attribute');
	sel = addElement('select', 'primarySelect', f, null);
	fillDropdown(sel, attributes);
	// secondary att
	f = addField(containerDiv, 'Secondary Attribute');
	sel = addElement('select', 'secondarySelect', f, null);
	fillDropdown(sel, attributes);
	// height
	f = addField(containerDiv, 'Height', 'grid_1');
	sel = addElement('select', 'heightSelect', f, null);
	fillDropdownRange(sel, 100);
	// weight
	f = addField(containerDiv, 'Weight', 'grid_1');
	sel = addElement('select', 'weightSelect', f, null);
	fillDropdownRange(sel, 100);
	// desired breakthroughs
	f = addField(containerDiv, 'Target BreakThroughs', 'grid_3');
	var input = addElement('input', 'breakThroughsInput', f, null);
	input.value = 3;
	// enable third training boost
	f = addField(containerDiv, 'Enable 3rd Training Boost', 'grid_3');
	sel = addElement('select', 'thirdBoostSelect', f, null);
	fillDropdown(sel, [
			false, true
	]);
	// enable free player use
	f = addField(containerDiv, 'Use Free Player');
	sel = addElement('select', 'useFreePlayerSelect', f, null);
	fillDropdown(sel, [
			false, true
	]);

	var startButton = addElement('input', 'startBuilderButton', containerDiv, {
		type :"button",
		value :"Start Rolling for Breakthroughs",
		className :'grid_3'
	});
	startButton.addEventListener("click", startScript, true);
	var cancelButton = addElement('input', 'cancelButton', containerDiv, {
		type :"button",
		value :"Cancel Script",
		className :'grid_2'
	});
	cancelButton.addEventListener("click", cancelScript, true);
	var loggingButton = addElement('input', 'loggingButton', containerDiv, {
		type :"button",
		value :"Enable Logging",
		className :'grid_2'
	});
	loggingButton.addEventListener("click", onLogClicked, true);

	f = addField(
			containerDiv,
			'Training History (# of breakthroughs : # of players that had that many breakthroughs)',
			'grid_12');
	addElement('div', 'historyContainer', f, null);

}
addUI();