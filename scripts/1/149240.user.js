// ==UserScript==
// @name           Bulk Team Creator
// @description    Set up a list of players to create and automatically conduct early training.  Saves on page reload.
// @namespace      GLB
// @include        http://glb.warriorgeneral.com/game/create_player.pl*
// ==/UserScript==

// Server communication code written (I believe) by MonsterKill
// UI and action/player generation by awsalick
// v1.03 - fix to reset counter in case it's run multiple times without reload
// v1.1  - Added contract offers, and some bypass code for doing crazy things
// v2 - Fixed to work with new glb code.  Added checkboxes for partial execution. Fixed partial multi training

GM_addStyle(".container_12 {margin-left: auto; margin-right: auto; width: 960px; clear: both;}");
GM_addStyle(".grid_1, .grid_2,.grid_3, .grid_4,.grid_5,.grid_6,.grid_7,.grid_8,.grid_9,.grid_10,.grid_11,.grid_12 {	display:inline;	float: left;position: relative;margin-left: 10px;margin-right: 10px;}");
GM_addStyle(".grid_1 {width:60px; }");
GM_addStyle(".grid_2 {width:140px; }");
GM_addStyle(".grid_3 {width:220px; }");
GM_addStyle(".grid_12 {width:940px; }");
GM_addStyle(".label {clear:both;}");
GM_addStyle(".hidden {display:none;}");


var serverhost = window.location.hostname;
var actions = new Array();
if (GM_getValue('bulkplayermaker_actions')!=null && GM_getValue('bulkplayermaker_actions')!='') {
	actions = JSON.parse(GM_getValue('bulkplayermaker_actions'));
}

var players = new Array();
if (GM_getValue('bulkplayermaker_players')!=null && GM_getValue('bulkplayermaker_players')!='') {
	players = JSON.parse(GM_getValue('bulkplayermaker_players'));
}

var scriptData = {
	height :'',
	weight :'',
	position :'',
	sa :'',
	archetype :'',
	firstname :'',
	lastname :'',
	attribs : {},
	team :0,
	salary: 0,
	pollForTeamOffers :false,
	canceled :false,
	useFreePlayer :false,
	multi1unlocked : false,
	multi2unlocked : false,
	multi3unlocked : false
	
};
debugLoggingEnabled=false;
playerCounter=0;
firstPlayer=true;

// Bypasses player creation
// Can use this to create players during rollover, then conduct the script actions later (when rollover is over)
//  Requires manually adding playerids at doCreatePlayer, however.  playerids must match list exactly.
bypass_creation=false;

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
	if (debugLoggingEnabled) {
		console.log(msg);
	}
}
function alertUserScriptWasCanceled() {
	alert("Script canceled.");
}
/*
 * 
 */
function request(args) {
	GM_xmlhttpRequest(args);
}


function handleEndOfScript() {
	document.getElementById('startBuilderButton').disabled = false;
	document.getElementById('startBuilderButton').value = "Create All Players";
	alert("Done building!");
}

function cancelScript() {
	debug("canceling the script");
	alert("Script failed!");
	scriptData.canceled = true;
	document.getElementById('startBuilderButton').disabled = false;
}

/**
 * 
 * @param playerId
 * @param stepsDone
 * @return
 */
function train(playerId, stepsDone, trainType, trainattrib) {
	if (scriptData.canceled) {
		log("script canceled");
		return;
	}
	
	var params;
	if(trainType=="multi") {
		/*params = ["training_type=",trainType,"&training1=", trainattrib,
				"&training2=", scriptData.attribs["Multi1"],"&training3=", scriptData.attribs["Multi2"],"&training4=", scriptData.attribs["Multi3"],
				"&player_id=", playerId, "&action=Train"
		];*/
		params = ["training_type=",trainType,"&training1=", trainattrib];
		if(scriptData.attribs["Multi1"]!="none" && scriptData.multi1unlocked==true) {
			params.push("&training2=", scriptData.attribs["Multi1"]);
		}
		if(scriptData.attribs["Multi2"]!="none" && scriptData.multi2unlocked==true) {
			params.push("&training3=", scriptData.attribs["Multi2"]);
		}
		if(scriptData.attribs["Multi3"]!="none" && scriptData.multi3unlocked==true) {
			params.push("&training4=", scriptData.attribs["Multi3"]);
		}
		params.push("&player_id=", playerId, "&action=Train");
	} else {
		params = [
				"training_type=",trainType,"&training1=", trainattrib,
				"&player_id=", playerId, "&action=Train"
		];
	}
	request( {
		method :"POST",
		url :"http://" + serverhost + "/game/training.pl",
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			handleTrainingResponse(response.responseText, playerId, stepsDone);
		}
	});
}

function handleTrainingResponse(responseText, playerId, stepsDone) {
	var notEnoughTPText = "You do not have enough training points to complete the selected training.";
	var index = responseText.indexOf(notEnoughTPText);
	if (index > -1) {
		debug("Not enough TP to continue training.");
		handleEndOfScript();
	} else {
		pathway(playerId, stepsDone+1);		
	}
}

/**
 * @param playerId
 * @param trainsTodo
 * @return
 */
function boostTraining(playerId, stepsDone,attrib) {
	var params = [
			"mode=upgrade&player_id=", playerId, "&upgrade=enhanced_",attrib
	];
	request( {
		method :"POST",
		url :"http://" + serverhost + "/game/bonus_tokens.pl",
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			var successText = "finishUpgrade";
			if (response.responseText.indexOf(successText) > -1) {
				debug("Boosted training: " + attrib);
				pathway(playerId, stepsDone+1);
			} else {
				debug("Failed to boost training: " + attrib);
				alert("Failed to boost training: " + attrib);
				cancelScript();
			}
		}
	});
}

/**
 * @param playerId
 * @return
 */
function unlock(playerId, stepsDone, attrib) {
	var params = [
			"mode=upgrade&player_id=", playerId, "&upgrade=secondary_",attrib
	];
	request( {
		method :"POST",
		url :"http://" + serverhost + "/game/bonus_tokens.pl",
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			var successText = "finishUpgrade";
			if (response.responseText.indexOf(successText) > -1) {
				debug("Boosted training: " + attrib);
				pathway(playerId,stepsDone+1);
			} else {
				console.log("Failed to unlock training: " + attrib);
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
	if(scriptData.team>0 && scriptData.salary>0) {
		var params = [
				"team_id=",
				scriptData.team,
				"&daily_salary=%24",scriptData.salary,"&no_trade=1&contract_type=season&duration_season=3&player_id=",
				playerId,
				"&note=invite%20from%20reroller%20script&action=Send%20Offer"
		];
		debug(params.join(""));
		request( {
			method :"POST",
			url :"http://" + serverhost + "/game/make_offer.pl",
			data :params.join(""),
			headers : {
				"Content-Type" :"application/x-www-form-urlencoded"
			},
			onload : function(response) {
				debug("Offer sent");
				pathway(playerId, 0);
			}
		});
	} else {
		pathway(playerId, 0);		
	}
}

/**
 * @param playerId
 * @param team
 * @param scriptData
 * @return
 */
function acceptOffer(playerId, team) {
	request( {
		method :"GET",
		url :"http://" + serverhost + "/game/offers.pl?player_id=" + playerId
				+ "&accept=" + team,
		onload : function(response) {
			debug("Accepted Offer to team id: " + team);
			pathway(playerId,0);
		}
	});
}

function pathway(playerId,stepsDone) {
	if(stepsDone<actions.length) {
		switch(actions[stepsDone].action) {
			case "Light Train":
				train(playerId, stepsDone, "light", scriptData.attribs[actions[stepsDone].attrib1]);
				break;
			case "Light (Smart)":
				lightTrainto90(playerId,stepsDone,scriptData.attribs[actions[stepsDone].attrib1],scriptData.attribs[actions[stepsDone].attrib2]);
				break;
			case "Normal Train":
				train(playerId, stepsDone, "normal", scriptData.attribs[actions[stepsDone].attrib1]);
				break;
			case "Intense Train":
				train(playerId, stepsDone, "intense", scriptData.attribs[actions[stepsDone].attrib1]);
				break;
			case "Multi Train":
				train(playerId, stepsDone, "multi", scriptData.attribs[actions[stepsDone].attrib1]);
				break;
			case "Unlock Multi":
				switch(actions[stepsDone].attrib1) {
					case 'Multi1':
						scriptData.multi1unlocked=true;
						break;
					case 'Multi2':
						scriptData.multi2unlocked=true;
						break;
					case 'Multi3':
						scriptData.multi3unlocked=true;
						break;
					default:
						break;
				}	
				unlock(playerId, stepsDone, scriptData.attribs[actions[stepsDone].attrib1]);
				break;
			case "Enhance":
				boostTraining(playerId, stepsDone,scriptData.attribs[actions[stepsDone].attrib1]);
				break;
			default:
				break;
		}
	} else {
        players[playerCounter].run = 0;
        updatePlayerList();
		playerCounter++;
		startScript(playerCounter);
	}
}

function lightTrainto90(playerId,stepsDone, attrib1, attrib2) {
	var trainattrib = attrib2;
	//short+agility/stam or tall+jump/vis or light+speed/stam or heavy+str/tack/block
	if((scriptData.height==1 && (attrib1=='agility' || attrib1=='stamina')) || (scriptData.height==positionData[players[i].position]['arch'][players[i].archetype].heightOptions && (attrib1=='jumping' || attrib1=='vision')) || (scriptData.weight==1 && (attrib1=='speed' || attrib1=='stamina')) || (scriptData.weight==positionData[players[i].position]['arch'][players[i].archetype].weightOptions && (attrib1=='strength' || attrib1=='blocking' || attrib1=='tackling'))) {
		if(stepsDone==0) {
			trainattrib = attrib1;	
		}
	}
	//tall+agility/stam or short+jump/vis or heavy+speed/stam or light+str/tack/block
	if((scriptData.height==positionData[players[i].position]['arch'][players[i].archetype].heightOptions && (attrib1=='agility' || attrib1=='stamina')) || (scriptData.height==1 && (attrib1=='jumping' || attrib1=='vision')) || (scriptData.weight==positionData[players[i].position]['arch'][players[i].archetype].weightOptions && (attrib1=='speed' || attrib1=='stamina')) || (scriptData.weight==1 && (attrib1=='strength' || attrib1=='blocking' || attrib1=='tackling'))) {
		if(stepsDone<=2) {
			trainattrib = attrib1;	
		}
	}
	
	train(playerId, stepsDone, "light", trainattrib);
}


/**
 * Accepts a received offer - no longer used
 * TODO check that it is a cpu team
 * 
 * @param playerId
 * @return
 */
function pollForOffers(playerId) {
	request( {
		method :"GET",
		url :"http://" + serverhost + "/game/offers.pl?player_id=" + playerId,
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
 * Request offers from teams - no longer used
 * 
 * @param playerId
 * @return
 */
function requestCPUOffers(playerId) {
	request( {
		method :"GET",
		url :"http://" + serverhost + "/game/offers.pl?player_id=" + playerId
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
	var currentPrimary = getAttributeMin(pageText, scriptData.attribs["Primary"]);
	var currentSecondary = getAttributeMin(pageText, scriptData.attribs["Secondary"]);
	var spToSpend = 149;
	for ( var attIndex in allAtts) {
		spToSpend = spToSpend - getAttributeMin(pageText, allAtts[attIndex]);
	}
	var secondaryVal = spToSpend - (25 - currentPrimary) + currentSecondary;
    
	var regexp = new RegExp("var minHeight = ([0-9]+)");
	var result = regexp.exec(pageText);
	if (result != null && result.length > 1) {
		var minHeight=parseInt(result[1]);
	}
	var regexp = new RegExp("var maxHeight = ([0-9]+)");
	var result = regexp.exec(pageText);
	if (result != null && result.length > 1) {
		var maxHeight=parseInt(result[1]);
	}
	var regexp = new RegExp("var minWeight = ([0-9]+)");
	var result = regexp.exec(pageText);
	if (result != null && result.length > 1) {
		var minWeight=parseInt(result[1]);
	}
	var regexp = new RegExp("var maxWeight = ([0-9]+)");
	var result = regexp.exec(pageText);
	if (result != null && result.length > 1) {
		var maxWeight=parseInt(result[1]);
	}

    height=minHeight-1+parseInt(scriptData.height);
    if(height>maxHeight) {
        height=maxHeight;
    }
    
    weight=minWeight-1+parseInt(scriptData.weight);
    if(weight>maxWeight) {
        weight=maxWeight;
    }

	var params = [
			"action=Submit&player_id=", playerId, "&height=", height,
			"&weight=", weight
	];
	for ( var i = allAtts.length - 1; i >= 0; i--) {
		var a = allAtts[i];
		params.push("&");
		params.push(a);
		params.push("=");
		if (a == scriptData.attribs["Primary"]) {
			params.push(25);
		} else if (a == scriptData.attribs["Secondary"]) {
			params.push(secondaryVal);
		} else {
			params.push(getAttributeMin(pageText, a));
		}
	}
    params.push("&equipment_attribute=");
    params.push(scriptData.attribs["Primary"]);
    params.push("&equipment_color=1");
	var postData = params.join("");
	request( {
		method :"POST",
		url :"http://" + serverhost + "/game/reroll_player.pl",
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
				if(scriptData.team>0 && scriptData.salary>0) {
					makeOffer(playerId);
				} else {
					pathway(playerId,0);
				}
			}
		}
	});
}

function requestRerollPage(playerId) {
	request( {
		method :"GET",
		url :"http://" + serverhost + "/game/reroll_player.pl?player_id="
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
		url :"http://" + serverhost + "/game/choose_archetype.pl?player_id="
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
function initScriptData(playerObject) {
	scriptData=playerObject;
	scriptData.multi1unlocked=false;
	scriptData.multi2unlocked=false;
	scriptData.multi3unlocked=false;
	scriptData.canceled = false;
	scriptData.history = null;
	document.getElementById('startBuilderButton').disabled = true;
}
/**
 * Create the player
 * 
 * @return
 */
function doCreatePlayer(i) {
	if(bypass_creation) {
        // if you want to do the actions only, without creating, you can fill in the player IDs here
			player_id_list=[];
        if(player_id_list[i]!=null) {
		    //makeOffer(player_id_list[i]);
		    pathway(player_id_list[i],0);
        }
	} else {	
		var params = [
				"first_name=", scriptData.firstname, "&last_name=",
				scriptData.lastname, "&position=", scriptData.position,
				"&use_rp=0&go=Submit&action=Submit"
		];
		if (scriptData.useFreePlayer) {
			params.push("&free_player=1")
		} else {
            params.push("&free_player=0")
        }
		request( {
			method :"POST",
			url :"http://" + serverhost + "/game/create_player.pl",
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
}

function startScript(i) {
	if(i<players.length) {
        if(players[i].run==1) {
			document.getElementById('startBuilderButton').value = Math.round(i/players.length*100)+"% Done";
		    if(!firstPlayer && !bypass_creation) {
			    setTimeout(function(){
				    initScriptData(players[i]);
				    if (!scriptData.canceled) {
					    doCreatePlayer(i);
				    }
			    },30000);
		    } else {
                firstPlayer=false;
			    initScriptData(players[i]);
			    if (!scriptData.canceled) {
				    doCreatePlayer(i);
			    }
		    }
        } else {
            // if run==0            
		    playerCounter++;
		    startScript(playerCounter);
        }
	} else {
		handleEndOfScript();
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
    var fillval;
    var a;
	for (a = 0, fillval=2; a < options.length; a++, fillval=Math.round(100*(-2+a*4/(options.length-1)))/100) {
		var id = options[a];
        fill = options[a];

		if(selectElement.id == "heightSelect") {
		    switch(a) {
                case options.length-1:
				    fill = 'jum/vis+2,-agi/sta:';
                    break;
                case 0:
				    fill = 'agi/sta+2,-jum/vis';
                    break;
                default:
                    fill = fillval;
            }
        }
		if(selectElement.id == "weightSelect") {
		    switch(a) {
                case options.length-1:
				fill = 'str/blo/tac+,-spd,sta';
                    break;
                case 0:
            	fill = 'spd/sta+,-str/blo/tac';
                    break;
                default:
                    fill = fillval;
            }
        }
		addElement('option', id, selectElement, {
			value :options[a],
			innerHTML :fill
		});
	}
}
function fillDropdownRange(selectElement, max) {
	selectElement.innerHTML = "";
	for ( var a = max * -1; a <= max; a++) {
		fill = a;
		
		addElement('option', null, selectElement, {
			value :a,
			innerHTML :fill
		});
	}
}
var positions = [
		'QB', 'HB', 'FB', 'OT', 'G', 'C', 'TE', 'WR', 'DT', 'DE', 'LB', 'SS',
		'FS', 'CB', 'P', 'K'
];
var attributes = [
		'none','strength', 'speed', 'agility', 'jumping', 'stamina', 'vision',
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
		sas : [
				'cover_up', 'dive', 'first_step', 'head_fake', 'juke',
				'lower_the_shoulder', 'power_through', 'spin', 'spot_blitz',
				'balance', 'hurdle', 'open_field_fake', 'quick_read', 'surge',
				'look_off'
		],
		arch : {
		    'Pocket Passer':{
		        weightOptions : 61,
		        heightOptions: 7},
		    'Deep Passer':{
		        weightOptions : 61,
		        heightOptions: 7},
		    'Scrambler':{
		        weightOptions : 41,
		        heightOptions: 5}
		}
    },
	HB : {
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
	        arch : {
	            'Power Back':{
	                weightOptions : 51,
	                heightOptions: 6},
	            'Elusive Back':{
	                weightOptions : 41,
	                heightOptions: 9},
	            'Scat Back':{
	                weightOptions : 41,
	                heightOptions: 9},
	            'Combo Back':{
	                weightOptions : 31,
	                heightOptions: 6},
	            'Returner':{
	                weightOptions : 41,
	                heightOptions: 7},
	            'Special Teamer':{
	                weightOptions : 51,
	                heightOptions: 9}
	        }
	},
	FB : {
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
	        arch : {
	            'Rusher':{
	                weightOptions : 21,
	                heightOptions: 7},
	            'Blocker':{
	                weightOptions : 41,
	                heightOptions: 7},
	            'Combo Back':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Scat Back':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Special Teamer':{
	                weightOptions : 31,
	                heightOptions: 7}
	        }
	},
	WR : {
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
		arch : {
	            'Speedster':{
	                weightOptions : 41,
	                heightOptions: 7},
	            'Possession Receiver':{
	                weightOptions : 41,
	                heightOptions: 7},
	            'Power Receiver':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Returner':{
	                weightOptions : 41,
	                heightOptions: 7},
	            'Special Teamer':{
	                weightOptions : 51,
	                heightOptions: 11}
	        }
	},
	TE : {
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
	        arch : {
	            'Blocker':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Power Receiver':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Receiver':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Dual Threat':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Special Teamer':{
	                weightOptions : 41,
	                heightOptions: 7}
	        }
	},
	C : {
		sas : [
				'absorb_pain', 'aura_of_intimidation', 'big_hit',
				'break_through', 'cut', 'diving_tackle', 'first_step',
				'lead_block', 'monster_hit', 'shed_block', 'snarl',
				'spot_blitz', 'strong_base', 'superior_vision',
				'wrap_up_tackle', 'balance', 'gang_tackle', 'headhunter',
				'pummel'
		],
	        arch : {
	            'Pass Blocker':{
	                weightOptions : 71,
	                heightOptions: 5},
	            'Run Blocker':{
	                weightOptions : 51,
	                heightOptions: 5},
	            'Special Teamer':{
	                weightOptions : 61,
	                heightOptions: 7}
	        }
	},
	G : {
		sas : [
				'aura_of_intimidation', 'big_hit', 'break_through', 'cut',
				'diving_tackle', 'first_step', 'lead_block', 'monster_hit',
				'shed_block', 'snarl', 'spot_blitz', 'strong_base',
				'superior_vision', 'wrap_up_tackle', 'balance', 'gang_tackle',
				'headhunter', 'pummel'
		],
	        arch : {
	            'Pass Blocker':{
	                weightOptions : 36,
	                heightOptions: 4},
	            'Run Blocker':{
	                weightOptions : 51,
	                heightOptions: 6},
	            'Special Teamer':{
	                weightOptions : 41,
	                heightOptions: 6}
	        }
	},
	OT : {
		sas : [
				'big_hit', 'aura_of_intimidation', 'break_through', 'cut',
				'diving_tackle', 'first_step', 'lead_block', 'monster_hit',
				'shed_block', 'snarl', 'spot_blitz', 'strong_arm',
				'strong_base', 'superior_vision', 'wrap_up_tackle', 'balance',
				'gang_tackle', 'headhunter', 'pummel'
		],
	        arch : {
	            'Pass Blocker':{
	                weightOptions : 41,
	                heightOptions: 5},
	            'Run Blocker':{
	                weightOptions : 51,
	                heightOptions: 6},
	            'Special Teamer':{
	                weightOptions : 41,
	                heightOptions: 8}
	        }
	},
	DT : {
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
	        arch : {
	            'Run Stuffer':{
	                weightOptions : 61,
	                heightOptions: 9},
	            'Pass Rusher':{
	                weightOptions : 51,
	                heightOptions: 6},
	            'Combo Tackle':{
	                weightOptions : 51,
	                heightOptions: 9},
	            'Special Teamer':{
	                weightOptions : 51,
	                heightOptions: 9}
	        }
	},
	DE : {
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
	        arch : {
	            'Run Stuffer':{
	                weightOptions : 56,
	                heightOptions: 7},
	            'Pass Rusher':{
	                weightOptions : 41,
	                heightOptions: 6},
	            'Combo End':{
	                weightOptions : 41,
	                heightOptions: 7},
	            'Special Teamer':{
	                weightOptions : 51,
	                heightOptions: 10}
	        }
	},
	LB : {
		sas : [
				'jumping_catch', 'big_hit', 'blitz', 'break_through',
				'closing_speed', 'cut', 'first_step', 'get_low', 'pancake',
				'run_block', 'shutdown_coverage', 'smooth_operator',
				'sticky_hands', 'strong_base', 'superior_vision',
				'tunnel_vision', 'wall', 'wrap_up_tackle', 'balance',
				'disguise_blitz', 'fire_up', 'gang_tackle', 'headhunter',
				'head_of_steam', 'jackhammer', 'relentless', 'zone_focus'
		],
	        arch : {
	            'Coverage Linebacker':{
	                weightOptions : 31,
	                heightOptions: 7},
	            'Blitzer':{
	                weightOptions : 31,
	                heightOptions: 9},
	            'Hard Hitter':{
	                weightOptions : 31,
	                heightOptions: 9},
	            'Combo Linebacker':{
	                weightOptions : 31,
	                heightOptions: 9},
	            'Special Teamer':{
	                weightOptions : 31,
	                heightOptions: 9}
	        }
	},
	CB : {
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
	        arch : {
	            'Man Specialist':{
	                weightOptions : 41,
	                heightOptions: 8},
	            'Zone Specialist':{
	                weightOptions : 41,
	                heightOptions: 8},
	            'Hard Hitter':{
	                weightOptions : 21,
	                heightOptions: 6},
	            'Combo Corner':{
	                weightOptions : 41,
	                heightOptions: 8},
	            'Returner':{
	                weightOptions : 41,
	                heightOptions: 7},
	            'Special Teamer':{
	                weightOptions : 41,
	                heightOptions: 7}
	        }
	},
	SS : {
		sas : [
				'jumping_catch', 'aura_of_intimidation', 'big_sack', 'blitz',
				'break_through', 'first_step', 'get_low', 'glare', 'pancake',
				'run_block', 'shed_block', 'shutdown_coverage',
				'smooth_operator', 'strong_base', 'trash_talk',
				'tunnel_vision', 'wall', 'balance', 'disguise_blitz',
				'fire_up', 'gang_tackle', 'headhunter', 'head_of_steam',
				'jackhammer', 'relentless', 'zone_focus'
		],
	        arch : {
	            'Man Specialist':{
	                weightOptions : 36,
	                heightOptions: 9},
	            'Zone Specialist':{
	                weightOptions : 36,
	                heightOptions: 9},
	            'Hard Hitter':{
	                weightOptions : 26,
	                heightOptions: 7},
	            'Combo Corner':{
	                weightOptions : 36,
	                heightOptions: 9},
	            'Special Teamer':{
	                weightOptions : 41,
	                heightOptions: 7}
	        }
	},
	FS : {
		sas : [
				'jumping_catch', 'aura_of_intimidation', 'big_sack', 'blitz',
				'break_through', 'get_low', 'glare', 'monster_hit', 'pancake',
				'run_block', 'shed_block', 'smooth_operator', 'sticky_hands',
				'strong_base', 'trash_talk', 'tunnel_vision', 'wall',
				'balance', 'disguise_blitz', 'fire_up', 'gang_tackle',
				'headhunter', 'head_of_steam', 'jackhammer', 'relentless',
				'zone_focus'
		],
	        arch : {
	            'Man Specialist':{
	                weightOptions : 36,
	                heightOptions: 9},
	            'Zone Specialist':{
	                weightOptions : 36,
	                heightOptions: 9},
	            'Hard Hitter':{
	                weightOptions : 26,
	                heightOptions: 7},
	            'Combo Corner':{
	                weightOptions : 36,
	                heightOptions: 9},
	            'Special Teamer':{
	                weightOptions : 41,
	                heightOptions: 7}
	        }
	},
	K : {
		sas : [
				'aura_of_intimidation', 'big_hit', 'break_through',
				'closing_speed', 'cut', 'diving_tackle', 'first_step',
				'hang_time', 'monster_hit', 'shed_block', 'snarl',
				'strong_base', 'superior_vision', 'wall', 'wrap_up_tackle',
				'balance', 'gang_tackle', 'headhunter'
		],
	        arch : {
	            'Boomer':{
	                weightOptions : 51,
	                heightOptions: 10},
	            'Technician':{
	                weightOptions : 51,
	                heightOptions: 10}
	        }
	},
	P : {
		sas : [
				'aura_of_intimidation', 'automatic', 'big_hit',
				'break_through', 'closing_speed', 'cut', 'diving_tackle',
				'first_step', 'monster_hit', 'shed_block', 'snarl',
				'strong_base', 'superior_vision', 'wall', 'wrap_up_tackle',
				'balance', 'gang_tackle', 'headhunter'
		],
	        arch : {
	            'Boomer':{
	                weightOptions : 71,
	                heightOptions: 7},
	            'Technician':{
	                weightOptions : 71,
	                heightOptions: 7}
	        }
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
    var archs = [];
    for(var k in positionData[pos]['arch']) archs.push(k); 
    for(posData in positionData[pos]['arch']) break;   // get first element for default height/weight options
    posData = positionData[pos]['arch'][posData];
    var fillArray = new Array();
    for(var i=1;i<=posData.heightOptions;i++) {
        fillArray.push(i);
    }
	fillDropdown(document.getElementById('heightSelect'), fillArray);
    
	var fillArray = new Array();
    for(var i=1;i<=posData.weightOptions;i++) {
        fillArray.push(i);
    }
	fillDropdown(document.getElementById('weightSelect'), fillArray);
	fillDropdown(document.getElementById('archSelect'),archs);
	fillDropdown(document.getElementById('saSelect'), positionData[pos].sas);
}

function onArchChange() {
	var pos = document.getElementById('positionSelect').value;
    var archs = document.getElementById('archSelect').value;
    posData = positionData[pos]['arch'][archs];
    var fillArray = new Array();
    for(var i=1;i<=posData.heightOptions;i++) {
        fillArray.push(i);
    }
	fillDropdown(document.getElementById('heightSelect'), fillArray);
    
	var fillArray = new Array();
    for(var i=1;i<=posData.weightOptions;i++) {
        fillArray.push(i);
    }
	fillDropdown(document.getElementById('weightSelect'), fillArray);
}

function onLogClicked() {
	if (debugLoggingEnabled) {
		debugLoggingEnabled = false;
		document.getElementById('loggingButton').value = 'Enable Logging';
		alert("Logging disabled.");
	} else {
		debugLoggingEnabled = true;
		document.getElementById('loggingButton').value = 'Disable Logging';
		alert("Logging enabled. CTRL-SHIFT-J to bring up the console.");
	}
}

function addUI() {
	
	// positions
	document.getElementById("position").innerHTML="<table><tbody></tbody></table>";
	var containerDiv = addElement('div', null, document.getElementById("position").firstChild, {
		className :'container_12'
	});
	
	var f = addField(containerDiv, 'Position', 'grid_1');
	var positionSelect = addElement('select', 'positionSelect', f, null);
	fillDropdown(positionSelect, positions);
	positionSelect.addEventListener("change", onPositionChange, true);
	// archetypes
	f = addField(containerDiv, 'Archetype');
	var sel = addElement('select', 'archSelect', f, null);    
	sel.addEventListener("change", onArchChange, true);
	// SAs
	f = addField(containerDiv, 'Special Ability');
	sel = addElement('select', 'saSelect', f, null);
	// primary att
	f = addField(containerDiv, 'Primary Attribute');
	sel = addElement('select', 'primarySelect', f, null);
	fillDropdown(sel, attributes);
	// secondary att
	f = addField(containerDiv, 'Secondary Attribute');
	sel = addElement('select', 'secondarySelect', f, null);
	fillDropdown(sel, attributes);
	// height
	f = addField(containerDiv, 'Height', 'grid_3');
	sel = addElement('select', 'heightSelect', f, null);
	// weight
	f = addField(containerDiv, 'Weight', 'grid_3');
	sel = addElement('select', 'weightSelect', f, null);
	// enable free player use
	f = addField(containerDiv, 'Use Free Player');
	sel = addElement('select', 'useFreePlayerSelect', f, null);
	fillDropdown(sel, [
			false, true
	]);

	// multi-trained unlocks
	f = addField(containerDiv, 'Multi Train Unlock 1', 'grid_5');
	sel = addElement('select', 'multi1', f, null);
	fillDropdown(sel, attributes);
	f = addField(containerDiv, 'Multi Train Unlock 2', 'grid_5');
	sel = addElement('select', 'multi2', f, null);
	fillDropdown(sel, attributes);
	f = addField(containerDiv, 'Multi Train Unlock 3', 'grid_5');
	sel = addElement('select', 'multi3', f, null);
	fillDropdown(sel, attributes);
	
	
	// contract info
	f = addField(containerDiv, 'Contract Team', 'grid_5');
	sel = addElement('input', 'team', f, null);
	f = addField(containerDiv, 'Daily Salary', 'grid_5');
	sel = addElement('input', 'salary', f, null);
	
	f = addField(containerDiv, 'List Position');
	sel = addElement('select', 'playerPos', f, null);
	
	playerPosArray = new Array();
	playerPosArray[0] = "End";
	for(var i=0;i<players.length;i++) {
		playerPosArray[i+1]=i+1;
	}	
	fillDropdown(sel, playerPosArray);
	
	var startButton = addElement('input', 'playerListButton', containerDiv, {
		type :"button",
		value :"Add Player to List",
		className :'grid_3'
	});
	startButton.addEventListener("click", addPlayer, true);
	
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

	var startButton = addElement('input', 'startBuilderButton', containerDiv, {
		type :"button",
		value :"Create All Players",
		className :'grid_3'
	});
	startButton.addEventListener("click", function() {playerCounter=0;startScript(0);}, true);

	
	f = addField(
			containerDiv,
			'-----------------------------------------------<br />Add Action:',
			'grid_12');
	addElement('div', containerDiv, f, null);
	
	// primary att
	f = addField(containerDiv, 'List Position');
	sel = addElement('select', 'actionPos', f, null);
	
	actionPosArray = new Array();
	actionPosArray[0] = "End";
	for(var i=0;i<actions.length;i++) {
		actionPosArray[i+1]=i+1;
	}	
	fillDropdown(sel, actionPosArray);
	
	f = addField(containerDiv, 'Action');
	sel = addElement('select', 'actionSelect', f, null);
	fillDropdown(sel, ["Light Train","Light (Smart)","Normal Train","Intense Train","Multi Train","Unlock Multi","Enhance"]);
	f = addField(containerDiv, 'Action Attrib 1');
	sel = addElement('select', 'actionAttrib1', f, null);
	fillDropdown(sel, ["Primary","Secondary","Multi1","Multi2","Multi3"]);
	f = addField(containerDiv, 'Action Attrib 2');
	sel = addElement('select', 'actionAttrib2', f, null);
	fillDropdown(sel, ["Primary","Secondary","Multi1","Multi2","Multi3"]);
	
	var startButton = addElement('input', 'addAction', containerDiv, {
		type :"button",
		value :"Add Action",
		className :'grid_3'
	});
	startButton.addEventListener("click", addAction, true);
	
	f = addField(
			containerDiv,
			'Existing Actions:',
			'grid_12');
	addElement('div', containerDiv, f, {
		id :'actionlist'
	});
	
	f = addField(
			containerDiv,
			'-----------------------------------------------<br />Existing Players: (Checkbox denotes player will be created)',
			'grid_12');
	addElement('div', containerDiv, f, {
		id :'playerlist'
	});
    
	var toggleBox = addElement('input', null, document.getElementById('playerlist'), {
		type :"button",
		value :"Toggle all boxes",
	});
	toggleBox.addEventListener("click", toggleCheckBoxes, true);
	
    onPositionChange();
	updateActionList();
	playerUpdater();
	updatePlayerList();
}

function addAction() {
	i = document.getElementById('actionPos').value;
	if(i=="End") {
		i = actions.length;
	} else {
		i=i-1;
	}	
	newaction = new Object();
	newaction.action = document.getElementById('actionSelect').value;
	newaction.attrib1 = document.getElementById('actionAttrib1').value;
	newaction.attrib2 = document.getElementById('actionAttrib2').value;	
	actions.splice(i,0,newaction);
	
	updateActionList();
}

function removeAction(position) {
	position=position.substring(6);
	actions.splice(position,1);
	updateActionList();
}
	
	
function updateActionList() {
	actionlisttext = document.getElementById('actionlist');
	var fill =  "<table>";
	for(var i=0;i<actions.length;i++) {
		row = "<tr><td>"+(i+1)+"</td><td>"+actions[i].action+"</td><td>"+actions[i].attrib1+"</td>";
		if(actions[i].action=="Light (Smart)") {
			row+="<td>"+actions[i].attrib2+"</td>";
		} else {
			row+="<td></td>";
		}
		row+="<td id='remove"+i+"'></td>";
		
		row+="</tr>";
		fill+=row;
	}
	fill+="</table>";
	actionlisttext.innerHTML=fill;
	
	for(var i=0;i<actions.length;i++) {
		var startButton = addElement('input', 'remove'+i, document.getElementById('remove'+i), {
			type :"button",
			value :"Remove",
		});
		startButton.addEventListener("click", function(event){ removeAction(event.target.id);}, true);
	}
	actionPosArray = new Array();
	actionPosArray[0] = "End";
	for(var i=0;i<actions.length;i++) {
		actionPosArray[i+1]=i+1;
	}
	fillDropdown(document.getElementById('actionPos'), actionPosArray);
	
	GM_setValue("bulkplayermaker_actions",JSON.stringify((actions)));
}


function addPlayer() {
	i = document.getElementById('playerPos').value;
	if(i=="End") {
		i = players.length;
	} else {
		i=i-1;
	}	
	newplayer = new Object();
	newplayer.firstname = document.getElementById('first_name_field').value;
	newplayer.lastname = document.getElementById('last_name_field').value;
	newplayer.position = document.getElementById('positionSelect').value;
	newplayer.archetype = document.getElementById('archSelect').value;
	newplayer.sa = document.getElementById('saSelect').value;
	newplayer.height = document.getElementById('heightSelect').value;
	newplayer.weight = document.getElementById('weightSelect').value;
	newplayer.useFreePlayer = document.getElementById('useFreePlayerSelect').value;
	newplayer.attribs = {};
	newplayer.attribs["Primary"] = document.getElementById('primarySelect').value;
	newplayer.attribs["Secondary"] = document.getElementById('secondarySelect').value;
	newplayer.attribs["Multi1"] = document.getElementById('multi1').value;
	newplayer.attribs["Multi2"] = document.getElementById('multi2').value;
	newplayer.attribs["Multi3"] = document.getElementById('multi3').value;
	newplayer.team =  document.getElementById('team').value;
	newplayer.salary =  document.getElementById('salary').value;
	newplayer.run =  1;
	
	if(newplayer.attribs["Multi1"]=="none") {
		if(newplayer.attribs["Multi2"]!="none") {
			newplayer.attribs["Multi1"]=newplayer.attribs["Multi2"];			
			newplayer.attribs["Multi2"]="none";
		} else {
			if(newplayer.attribs["Multi3"]!="none") {
				newplayer.attribs["Multi1"]=newplayer.attribs["Multi3"];			
				newplayer.attribs["Multi3"]="none";				
			}
		}
	}
	if(newplayer.attribs["Multi2"]=="none" && newplayer.attribs["Multi3"]!="none") {
		newplayer.attribs["Multi2"]=newplayer.attribs["Multi3"];			
		newplayer.attribs["Multi3"]="none";
	}
	
	valid=1;	
	if (newplayer.attribs["Primary"] == newplayer.attribs["Secondary"] || newplayer.attribs["Primary"]=='none' || newplayer.attribs["Secondary"] == 'none') {
		alert('Invalid primary/secondary');
		valid=0;	
	}
	if ((newplayer.attribs["Multi1"] == newplayer.attribs["Multi2"] && newplayer.attribs["Multi1"] != "none") || (newplayer.attribs["Multi1"] == newplayer.attribs["Multi3"] && newplayer.attribs["Multi1"] != "none") || (newplayer.attribs["Multi2"] == newplayer.attribs["Multi3"] && newplayer.attribs["Multi2"] != "none")) {
		alert('Can not have the same multi attribs');
		valid=0;
	}	
	if(newplayer.firstname=="" || newplayer.lastname=="") {
		valid=0;
		alert("Player needs a name!");
	}
	
	if(valid==1) {		
		players.splice(i,0,newplayer);
	}
	
	updatePlayerList();
}

function removePlayer(position) {
	position=position.substring(7);
	players.splice(position,1);
	updatePlayerList();
}

function runToggle(checkBox) {
	position=checkBox.id.substring(6);
    if(checkBox.checked) {
    	players[position].run=1;
    } else {
    	players[position].run=0;
    }
    updatePlayerList();
}
	
function toggleCheckBoxes() {
    boxes = document.getElementsByClassName('runflag');
    toggle=null; 
	for ( var i in boxes) {
        if(toggle===null) {
            toggle=!boxes[i].checked;
        }
        boxes[i].checked=toggle;
    }
	for ( var i in players) {
        if(toggle) { //turn on
            players[i].run=1;
        } else {
            players[i].run=0;
        }
    }
    updatePlayerList();
}
	
function updatePlayerList() {
	var table = document.getElementById('playerTable');
    fill='';
    if(table===null) {
	    playerlisttext = document.getElementById('playerlist');
	    table = addElement('table', 'playerTable', document.getElementById('playerlist'), {
	    });
    }
	for(var i=0;i<players.length;i++) {
		row = "<tr><td>"+(i+1)+"</td><td>"+players[i].position+","+players[i].archetype;
		if(players[i].useFreePlayer == "true") {
			row+=" - Free";	
		}
		row+="</td><td>"+players[i].firstname+" "+players[i].lastname+"</td><td>"+players[i].attribs["Primary"]+"</td><td>"+players[i].attribs["Secondary"]+"</td><td>";
		if(players[i].attribs["Multi1"]!="none" || players[i].attribs["Multi2"]!="none" || players[i].attribs["Multi3"]!="none") {
			row+="Multis:"+players[i].attribs["Multi1"]+","+players[i].attribs["Multi2"]+","+players[i].attribs["Multi3"];			
		}
		row+="</td><td>";
		if(players[i].height==1) {
			row+="Short";
        } else {
            if(players[i].height==positionData[players[i].position]['arch'][players[i].archetype].heightOptions) {
                row+="Tall";
            } else {
				row+=players[i].height;
            }
        }
		row+="/";
		if(players[i].weight==1) {
			row+="Light";
        } else {
            if(players[i].weight==positionData[players[i].position]['arch'][players[i].archetype].weightOptions) {
                row+="Heavy";
            } else {
				row+=players[i].weight;
            }
        }
		row+="</td><td>"+players[i].team +":"+ players[i].salary + "</td><td id='checkp"+i+"'></td><td id='removep"+i+"'></td>";
		row+="</tr>";
		
		fill+=row;
	}
	table.innerHTML=fill;
	
	for(var i=0;i<players.length;i++) {
		var checkBox = addElement('input', 'checkp'+i, document.getElementById('checkp'+i), {
			type :"checkbox",  
            className:"runflag",
			value :"Remove",         
		});
        if(players[i].run==1) {
            checkBox.checked=true;
        }
		checkBox.addEventListener("click", function(event){ runToggle(this);}, true);

		var startButton = addElement('input', 'removep'+i, document.getElementById('removep'+i), {
			type :"button",
			value :"Remove",
		});
		startButton.addEventListener("click", function(event){ removePlayer(event.target.id);}, true);
	}
	playerPosArray = new Array();
	playerPosArray[0] = "End";
	for(var i=0;i<players.length;i++) {
		playerPosArray[i+1]=i+1;
	}
	fillDropdown(document.getElementById('playerPos'), playerPosArray);
	
	GM_setValue("bulkplayermaker_players",JSON.stringify(players));
}

// Can use this to manually hardcode stuff/make huge revisions that way
function playerUpdater() {
	for(var i=0;i<players.length;i++) {
		switch(players[i].position) {
			case "QB":
				break;
			case "HB":
				break;
			case "FB":
				if(players[i].archetype=="Special Teamer") {
				} else {
				}
				break;
			case "C":
				break;
			case "G":
				break;
			case "OT":
				break;
			case "TE":
				break;
			case "WR":
				break;
			case "DT":
				//players[i].attribs["Multi3"]='tackling';				
				break;
			case "DE":
				break;
			case "LB":
				if(players[i].archetype=="Blitzer") {
				} else {
				}
				break;
			case "CB":
				break;
			case "SS":
				break;
			case "FS":
				break;
			case "K":
				break;
			case "P":
				//players[i].attribs["Multi3"]='confidence';	
				break;
			default:
				break;
		}
	}
}


addUI();

