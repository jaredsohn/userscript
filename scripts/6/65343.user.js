// ==UserScript==
// @name           GLB Player Assistant
// @namespace      GLB
// @description    Set what you want training points, SP's, VP's to go into
// @include        http://goallineblitz.com/game/home.pl
// @include       http://goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==

// User Variables
var TRAIN_THRESHOLD = 98; // the % you feel comfertable having the training % go to when using the train 90%+ amount.
var DEBUG_SCRIPT = false; // set this to true to get debug information

/*************************************
Version
1.00
*************************************/


// get prototype
var script = document.createElement('script');
script.id = 'prototypeElement';
script.src="http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.3/prototype.js";
document.getElementsByTagName('head')[0].appendChild(script);


//Handler for the window load event
window.addEventListener('load', function(event) {
	//Get handles to the Prototype functions we're going to use
	$ = unsafeWindow['window'].$;
	$$ = unsafeWindow['window'].$$;
	Object = unsafeWindow['window'].Object;
	String = unsafeWindow['window'].String;
	Element = unsafeWindow['window'].Element;

	new PlayerHelper();
}, 'false');

/**
Jarett's script update checker - http://userscripts.org/scripts/show/20145
**/
if(!DEBUG_SCRIPT){
	var SUC_script_num = 65343;
	try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}

PlayerHelper = function(){
	// figure out if we are on a player page or home page
	if(window.location.href.indexOf('?player_id=') > 0){
		this.startPlayerPage();
	}else{
		this.startHomePage();
	}
};
PlayerHelper.prototype = {};

PlayerHelper.prototype.figureSpCost = function(val){
	return parseInt(Math.exp(0.0003 * Math.pow(val, 2)));
};

PlayerHelper.prototype.figureTrainPct = function(val){
	return Math.max(Math.floor(75 * Math.exp(-0.038 * (val - 1))),1);
};

PlayerHelper.prototype.startHomePage = function(){
	var that = this;
	this.mainBtn = document.createElement('INPUT');
	this.mainBtn.setAttribute('type','button');
	this.mainBtn.setAttribute('value','Run Player Assistant Script');
	this.mainBtn.addEventListener('click',function() { that.runMainScript.apply(that); },false);
	$$('DIV.tabs')[0].insert({before:this.mainBtn});
};

PlayerHelper.prototype.runMainScript = function(){
	this.mainBtn.disabled = true;
	this.mainBtn.setAttribute('value','Working...');

	this.getPlayersList();

	if(!this.scrollDiv){
		this.scrollDiv = document.createElement('DIV');
		Element.setStyle(this.scrollDiv,{width:'98%',border:'1px solid black',height:'200px',marginBottom:'20px',padding:'5px',overflowY:'auto'});
		Element.insert(this.mainBtn,{after:this.scrollDiv});
	}
	
	this.scrollDiv.innerHTML = '';
	var logBegin = document.createElement('DIV');
	Element.update(logBegin,'Player Assistant Log:');
	this.scrollDiv.appendChild(logBegin);
	
	this.startPlayerProcessing();
};

PlayerHelper.prototype.startPlayerProcessing = function(val){
	if((val && val < this.playersList.length) || !val){
		for(var i=val || 0;i<this.playersList.length;i++){
			var curPlayer = this.playersList[i];
			if(DEBUG_SCRIPT){
				console.log('debug info: startPlayerProcessing - player: ' + curPlayer.name + ' -- ' + (parseInt(i) + 1) + ' of ' + this.playersList.length);
			}
			var playerName = document.createElement('DIV');
			Element.update(playerName,curPlayer.name + ':');
			Element.setStyle(playerName,{marginTop:'10px'});
			this.scrollDiv.appendChild(playerName);
			
			var playerDetail = document.createElement('UL');
			Element.setStyle(playerDetail,{marginTop:'0px',marginBottom:'0px'});
			this.scrollDiv.appendChild(playerDetail);
			
			var playerObj = GM_getValue('PlayerHelper' + curPlayer.id,'{}');
			if(playerObj != '{}'){
				this.addListedItem(playerDetail,'Found Object for this player');
				this.holder = playerDetail;
				this.curPlayer = curPlayer;
				eval('playerObj = ' + playerObj);
				this.toReturnObj = playerObj.theInputs;
				this.playerObj = [];
				for(var theRow in playerObj.theInputs){
					var obj = playerObj.theInputs[theRow];
					obj.key = theRow;
					this.playerObj.push(obj);
				}
				this.continueID = i + 1;
				this.getPlayerInfo();
				break;
			}else{
				this.addListedItem(playerDetail,'Nothing found for this player');
			}
			
			if(i == this.playersList.length - 1){
				this.mainBtn.setAttribute('value','Run Player Assistant Script');
				this.mainBtn.disabled = false;
				var tosave = {};
				tosave.theInputs = this.toReturnObj;
				var jsonver = Object.toJSON(tosave);
				if(DEBUG_SCRIPT){
					console.log('saving: ' + jsonver);
				}
				GM_setValue('PlayerHelper' + this.curPlayer.id,jsonver);
			}
		}
	}else if(val == this.playersList.length){
		this.mainBtn.setAttribute('value','Run Player Assistant Script');
		this.mainBtn.disabled = false;
		var tosave = {};
		tosave.theInputs = this.toReturnObj;
		var jsonver = Object.toJSON(tosave);
		if(DEBUG_SCRIPT){
			console.log('saving: ' + jsonver);
		}
		GM_setValue('PlayerHelper' + this.curPlayer.id,jsonver);
	}else{
		this.addListedItem(this.holder,'there was a problem finishing off the startPlayerProcessing loop');
	}
};

PlayerHelper.prototype.getPlayerInfo = function(){
	var url = 'http://goallineblitz.com/game/player.pl?player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.processPlayerPage);
};

PlayerHelper.prototype.processPlayerPage = function(address,xmlhttp){
	var val = xmlhttp.responseText;
	var start = val.indexOf('<tr class="player_points_value">');
	var temp = val.substring(start,val.indexOf('</tr>',start));
	var vals = temp.split('<td>');
	this.curPlayer.level = vals[1].replace(/<\/td>/,'');
	this.curPlayer.sp = parseInt(vals[2].replace(/<\/td>/,''));
	this.curPlayer.tp = parseInt(vals[3].replace(/<\/td>/,''));
	this.curPlayer.bt = parseInt(vals[4].replace(/<\/td>/,''));
	this.curPlayer.st = parseInt(vals[5].replace(/<\/td>/,''));
	start = val.indexOf('<span>Vet Pts:</span>');
	var temp = val.substring(start,val.indexOf('</td>',start));
	var vals = temp.split('>');
	this.curPlayer.vp = parseInt(vals[3].replace(/<\/a/,''));
	this.runPlayerObj();
};

PlayerHelper.prototype.runPlayerObj = function(val){
	for(var i = val || 0;i<this.playerObj.length;i++){
		this.curInput = this.playerObj[i];
		if(DEBUG_SCRIPT){
			console.log('debug info: runPlayerObj input: type: ' + this.curInput.type + ' id: ' + (parseInt(i) + 1) + ' of ' + this.playerObj.length);
		}
		
		// try to do some easy eliminations
		if(this.curInput.type == 'sp' && this.curPlayer.sp == 0){
			this.addListedItem(this.holder,'Could not add skill points to ' + this.curInput.spAtt + ' because you do not have enough points');
			this.ignoreSp = true;
			continue;
		}
		if(this.curInput.type == 'vp' && this.curPlayer.vp == 0){
			this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because you do not have enough points');
			continue;
		}
		if(this.curInput.type == 'tp' && this.curInput.trainType == 'Intense' && this.curPlayer.tp < 5){
			this.addListedItem(this.holder,'Could not intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
				' because you do not have enough points');
			this.ignoreTp = true;
			continue;
		}
		if(this.curInput.type == 'tp' && this.curInput.trainType == 'Normal' && this.curPlayer.tp < 2){
			this.addListedItem(this.holder,'Could not normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
				' because you do not have enough points');
			this.ignoreTp = true;
			continue;
		}
		
		if(this.curInput.type == 'sp'){
			if(this.ignoreSp){
				this.addListedItem(this.holder,'Could not add skill points to ' + this.curInput.spAtt + ' because a previous input blocked it');
				continue;
			}
			this.playerObjID = i + 1;
			this.computeSpInput();
			return;
		}
		
		if(this.curInput.type == 'vp'){
			if(this.ignoreVp){
				this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because a previous input blocked it');
				continue;
			}
			this.playerObjID = i + 1;
			this.computeVpInput();
			return;
		}
		
		if(this.curInput.type == 'tp'){
			if(this.curInput.trainType == 'Normal'){
				if(this.ignoreTp){
					this.addListedItem(this.holder,'Could not normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
						' because a previous input blocked it');
					continue;
				}
				
				this.playerObjID = i + 1;
				this.computeNormTpInput();
				return;
			}else if(this.curInput.trainType == 'Intense'){
				if(this.ignoreTp){
					this.addListedItem(this.holder,'Could not intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
						' because a previous input blocked it');
					continue;
				}
				
				this.playerObjID = i + 1;
				this.computeIntenseTpInput();
				return;
			}else{
				this.addListedItem(this.holder,'Error figuring out the training point type');
				continue;
			}
		}
		if(DEBUG_SCRIPT){
			console.log('gone thru: ' + this.curInput);
			console.log('gone thru here: ' + this.toReturnObj[this.curInput.key]);
		}
	}
	this.resetPlayerVariables();	
	this.startPlayerProcessing(this.continueID);
};

PlayerHelper.prototype.resetPlayerVariables = function(){
	this.ignoreSp = false;
	this.ignoreVp = false;
	this.ignoreTp = false;
};

PlayerHelper.prototype.computeIntenseTpInput = function(){
	// first thing we need to do is see where the current values are at
	var url = 'http://goallineblitz.com/game/player.pl?player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.processIntenseTpInput);
};

PlayerHelper.prototype.processIntenseTpInput = function(url,xmlhttp){
	var toUse = xmlhttp.responseText.toUpperCase();
	var start = toUse.indexOf('<DIV CLASS="STAT_HEAD_TALL">' + this.curInput.firstAtt.toUpperCase() + ':</DIV>');
	var holder = toUse.substring(start,toUse.indexOf('</DIV>',start + 34 + this.curInput.firstAtt.length));
	var stat = holder.split('>')[3];
	if(stat.indexOf('(') >= 0){
		var equip = stat.substring(stat.indexOf('('));
		var num = new RegExp('[0-9]{1,2}');
		var theNum = num.exec(equip);
		stat = Number(stat.split('(')[0]) - Number(theNum);
	}
	stat = Number(stat);
	if(DEBUG_SCRIPT){
		console.log('stat1: ' + stat);
	}
	
	var start2 = toUse.indexOf('<DIV CLASS="STAT_HEAD_TALL">' + this.curInput.secondAtt.toUpperCase() + ':</DIV>');
	var holder2 = toUse.substring(start2,toUse.indexOf('</DIV>',start2 + 34 + this.curInput.secondAtt.length));
	var stat2 = holder2.split('>')[3];
	if(stat2.indexOf('(') >= 0){
		var equip = stat2.substring(stat2.indexOf('('));
		var num = new RegExp('[0-9]{1,2}');
		var theNum = num.exec(equip);
		stat2 = Number(stat2.split('(')[0]) - Number(theNum);
	}
	stat2 = Number(stat2);
	if(DEBUG_SCRIPT){
		console.log('stat2: ' + stat2);
	}
	
	var curVal,tostart;
	switch(this.curInput.trainAmt){
		case 'lower':
			curVal = stat < stat2 ? stat : stat2;
			tostart = stat < stat2 ? start : start2;
			break;
		case 'higher':
			curVal = stat > stat2 ? stat : stat2;
			tostart = stat > stat2 ? start : start2;
			break;
		case this.curInput.firstAtt:
			curVal = stat;
			tostart = start;
			break;
		case this.curInput.secondAtt:
			curVal = stat2;
			tostart = start2;
			break;
		default: // not sure why we got here, lets just do the higher stat
			if(DEBUG_SCRIPT){
				console.log('ERROR: got to case else in processIntenseTpInput');
			}
			curVal = stat > stat2 ? stat : stat2;
			tostart = stat > stat2 ? start : start2;
			break;
	}
	
	// figure out training %
	holder = toUse.substring(tostart-59,tostart);
	var myRegExp = new RegExp('[0-9]{1,2}');
	var trainPct = Number(myRegExp.exec(holder));
	
	if(this.curInput.train && trainPct >= 90 && curVal >= this.curInput.value){ // your attribute is already at 90+%
		this.addListedItem(this.holder,'Deleting intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' because you have already completed the task');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(this.curInput.train && this.checkTrainPct(trainPct,curVal) && curVal >= this.curInput.value){ // if you train it might go over 98% so not risking it
		this.addListedItem(this.holder,'Deleting intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' because you have already completed the task');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(curVal >= this.curInput.value && !this.curInput.train){
		this.addListedItem(this.holder,'Deleting intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' because you have already completed the task');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	this.count = 0;
	this.runIntenseTraining();
};

PlayerHelper.prototype.runIntenseTraining = function(){
	var url = 'http://goallineblitz.com/game/training.pl?player_id=' + this.curPlayer.id;
	var trainType = THE2ATTS[this.curInput.firstAtt];
	trainType = trainType[this.curInput.secondAtt];
	if(DEBUG_SCRIPT){
		console.log('DEBUG: saving intense training ' + trainType.saveName);
	}
	var body = 'training_type=intense&training_intense=' + trainType.saveName + '&action=Train&player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.checkIntenseTraining,body);
};

PlayerHelper.prototype.checkIntenseTraining = function(url,xmlhttp){
	var start = xmlhttp.responseText.indexOf('<div class="error under_tabs">');
	if(start >= 0){
		var msg = xmlhttp.responseText.substring(start + 30,xmlhttp.responseText.indexOf('</div>',start + 30));
		this.addListedItem(this.holder,'An error was returned while trying to intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' was able to train it ' + this.count + ' times. Error message returned: ' + msg);
		if(DEBUG_SCRIPT){
			console.log('Intense training response returned: ' + xmlhttp.responseText);
		}
		this.ignoreTp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	if(xmlhttp.responseText.indexOf('window.location.replace("/game/training.pl') < 0){
		this.addListedItem(this.holder,'An error was returned while trying to intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' was able to train it ' + this.count + ' times. Please refer to the error log for further details');
		if(DEBUG_SCRIPT){
			console.log('Intense training response returned: ' + xmlhttp.responseText);
		}
		this.ignoreTp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	this.count = this.count + 1;
	this.curPlayer.tp = this.curPlayer.tp - 5;
	
	if(this.curPlayer.tp < 5){
		this.addListedItem(this.holder,'Successfully intense trained ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' ' + this.count + ' times - no longer have enough training points  to continue');
		this.ignoreTp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	// now we need to see if we raised the skill above our minimum - if not, repeate process
	var url = 'http://goallineblitz.com/game/player.pl?player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.checkIntenseValue);
};

PlayerHelper.prototype.checkIntenseValue = function(url,xmlhttp){
	var toUse = xmlhttp.responseText.toUpperCase();
	var start = toUse.indexOf('<DIV CLASS="STAT_HEAD_TALL">' + this.curInput.firstAtt.toUpperCase() + ':</DIV>');
	var holder = toUse.substring(start,toUse.indexOf('</DIV>',start + 34 + this.curInput.firstAtt.length));
	var stat = holder.split('>')[3];
	if(stat.indexOf('(') >= 0){
		var equip = stat.substring(stat.indexOf('('));
		var num = new RegExp('[0-9]{1,2}');
		var theNum = num.exec(equip);
		stat = Number(stat.split('(')[0]) - Number(theNum);
	}
	stat = Number(stat);
	if(DEBUG_SCRIPT){
		console.log('stat1: ' + stat);
	}
	
	var start2 = toUse.indexOf('<DIV CLASS="STAT_HEAD_TALL">' + this.curInput.secondAtt.toUpperCase() + ':</DIV>');
	var holder2 = toUse.substring(start,toUse.indexOf('</DIV>',start2 + 34 + this.curInput.secondAtt.length));
	var stat2 = holder2.split('>')[3];
	if(stat2.indexOf('(') >= 0){
		var equip = stat2.substring(stat2.indexOf('('));
		var num = new RegExp('[0-9]{1,2}');
		var theNum = num.exec(equip);
		stat2 = Number(stat2.split('(')[0]) - Number(theNum);
	}
	stat2 = Number(stat2);
	if(DEBUG_SCRIPT){
		console.log('stat2: ' + stat2);
	}
	
	var curVal,tostart;
	switch(this.curInput.trainAmt){
		case 'lower':
			curVal = stat < stat2 ? stat : stat2;
			tostart = stat < stat2 ? start : start2;
			break;
		case 'higher':
			curVal = stat > stat2 ? stat : stat2;
			tostart = stat > stat2 ? start : start2;
			break;
		case this.curInput.firstAtt:
			curVal = stat;
			tostart = start;
			break;
		case this.curInput.secondAtt:
			curVal = stat2;
			tostart = start2;
			break;
		default: // not sure why we got here, lets just do the higher stat
			if(DEBUG_SCRIPT){
				console.log('ERROR: got to case else in processIntenseTpInput');
			}
			curVal = stat > stat2 ? stat : stat2;
			tostart = stat > stat2 ? start : start2;
			break;
	}
	
	// figure out training %
	holder = toUse.substring(tostart-59,tostart);
	var myRegExp = new RegExp('[0-9]{1,2}');
	var trainPct = Number(myRegExp.exec(holder));
	
	if(this.curInput.train && trainPct >= 90 && curVal >= this.curInput.value){ // your attribute is already at 90+%
		this.addListedItem(this.holder,'Deleting intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' because you have completed the task training ' + this.count + ' times');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(this.curInput.train && this.checkTrainPct(trainPct,curVal) && curVal >= this.curInput.value){ // if you train it might go over 98% so not risking it
		this.addListedItem(this.holder,'Deleting intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' because you have completed the task training ' + this.count + ' times');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(curVal >= this.curInput.value && !this.curInput.train){
		this.addListedItem(this.holder,'Deleting intense train ' + this.curInput.firstAtt + ' / ' + this.curInput.secondAtt + 
			' because you have completed the task training ' + this.count + ' times');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	this.runIntenseTraining();
};

PlayerHelper.prototype.computeNormTpInput = function(){
	// first thing we need to do is see where the current values are at
	var url = 'http://goallineblitz.com/game/player.pl?player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.processNormTpInput);
};

PlayerHelper.prototype.processNormTpInput = function(url,xmlhttp){
	var toUse = xmlhttp.responseText.toUpperCase();
	var start = toUse.indexOf('<DIV CLASS="STAT_HEAD_TALL">' + this.curInput.attribute.toUpperCase() + ':</DIV>');
	var holder = toUse.substring(start,toUse.indexOf('</DIV>',start + 34 + this.curInput.attribute.length));
	var stat = holder.split('>')[3];
	if(stat.indexOf('(') >= 0){
		var equip = stat.substring(stat.indexOf('('));
		var num = new RegExp('[0-9]{1,2}');
		var theNum = num.exec(equip);
		stat = Number(stat.split('(')[0]) - Number(theNum);
	}
	stat = Number(stat);
	
	// figure out training %
	holder = toUse.substring(start-59,start);
	var myRegExp = new RegExp('[0-9]{1,2}');
	var trainPct = Number(myRegExp.exec(holder));
	
	if(this.curInput.train && trainPct >= 90 && stat >= this.curInput.value){ // your attribute is already at 90+%
		this.addListedItem(this.holder,'Deleting normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' because you have already completed the task');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(this.curInput.train && this.checkTrainPct(trainPct,stat) && stat >= this.curInput.value){ // if you train it might go over 98% so not risking it
		this.addListedItem(this.holder,'Deleting normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' because you have already completed the task');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(stat >= this.curInput.value && !this.curInput.train){
		this.addListedItem(this.holder,'Deleting normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' because you have already completed the task');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	this.count = 0;
	this.runNormalTraining();
};

PlayerHelper.prototype.checkTrainPct = function(curPct,curStat){
	var trainPct = this.figureTrainPct(curStat);
	if(this.curInput.trainType == 'Intense'){
		var raiseAmt = 1.25 * trainPct;
		if(curPct + raiseAmt > TRAIN_THRESHOLD){
			return true;
		}else{
			return false;
		}
	}else{ // normal training
		if(this.curInput.activity == 'No Activity'){
			var raiseAmt = 1.075 * trainPct;
			if(curPct + raiseAmt > TRAIN_THRESHOLD){
				return true;
			}else{
				return false;
			}
		}else{
			if(curPct + trainPct > TRAIN_THRESHOLD){
				return true;
			}else{
				return false;
			}
		}
	}
	return true;
};

PlayerHelper.prototype.runNormalTraining = function(){
	var url = 'http://goallineblitz.com/game/training.pl?player_id=' + this.curPlayer.id;
	var trainType = THEATTS[this.curInput.attribute];
	if(DEBUG_SCRIPT){
		console.log('DEBUG: saving normal training ' + trainType.saveName);
	}
	var body = 'training_type=normal&training_normal=' + trainType.saveName + '&action=Train&player_id=' + this.curPlayer.id;

	if(this.curInput.activity == 'Shopping Token'){
		body = body + '&option2=Shopping';
	}else if(this.curInput.activity == 'Night Out On Town'){
		body = body + '&option2=Night+Out';
	}else if(this.curInput.activity == 'No Activity'){
		body = body + '&option2=';
	}else{
		this.addListedItem(this.holder,'Error normal training ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' could not figure out the activity');
		this.ignoreTp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	this.getAjaxRequest(url,this.checkNormalTraining,body);
};

PlayerHelper.prototype.checkNormalTraining = function(url,xmlhttp){
	var start = xmlhttp.responseText.indexOf('<div class="error under_tabs">');
	if(start >= 0){
		var msg = xmlhttp.responseText.substring(start + 30,xmlhttp.responseText.indexOf('</div>',start + 30));
		this.addListedItem(this.holder,'An error was returned while trying to normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' was able to train it ' + this.count + ' times. Error message returned: ' + msg);
		if(DEBUG_SCRIPT){
			console.log('Normal training response returned: ' + xmlhttp.responseText);
		}
		this.ignoreTp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	if(xmlhttp.responseText.indexOf('window.location.replace("/game/training.pl') < 0){
		this.addListedItem(this.holder,'An error was returned while trying to normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' was able to train it ' + this.count + ' times. Please refer to the error log for further details');
		if(DEBUG_SCRIPT){
			console.log('Normal training response returned: ' + xmlhttp.responseText);
		}
		this.ignoreTp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	this.count = this.count + 1;
	this.curPlayer.tp = this.curPlayer.tp - 2;
	
	if(this.curPlayer.tp < 2){
		this.addListedItem(this.holder,'Successfully normal trained ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' ' + this.count + ' times - no longer have enough training points  to continue');
		this.ignoreTp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	// now we need to see if we raised the skill above our minimum - if not, repeate process
	var url = 'http://goallineblitz.com/game/player.pl?player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.checkNormValue);
};

PlayerHelper.prototype.checkNormValue = function(url,xmlhttp){
	var toUse = xmlhttp.responseText.toUpperCase();
	var start = toUse.indexOf('<DIV CLASS="STAT_HEAD_TALL">' + this.curInput.attribute.toUpperCase() + ':</DIV>');
	var holder = toUse.substring(start,toUse.indexOf('</DIV>',start + 34 + this.curInput.attribute.length));
	var stat = holder.split('>')[3];
	if(stat.indexOf('(') >= 0){
		var equip = stat.substring(stat.indexOf('('));
		var num = new RegExp('[0-9]{1,2}');
		var theNum = num.exec(equip);
		stat = Number(stat.split('(')[0]) - Number(theNum);
	}
	stat = Number(stat);
	
	// figure out training %
	holder = toUse.substring(start-59,start);
	var myRegExp = new RegExp('[0-9]{1,2}');
	var trainPct = Number(myRegExp.exec(holder));
	
	if(DEBUG_SCRIPT){
		console.log('DEBUG: checkNormValue refreshed stat:' + stat + ' saved stat:' + this.curInput.value);
	}
	if(this.curInput.train && trainPct >= 90 && stat >= this.curInput.value){ // your attribute is already at 90+%
		this.addListedItem(this.holder,'Deleting normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' because you have completed the task training ' + this.count + ' times');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(this.curInput.train && this.checkTrainPct(trainPct,stat) && stat >= this.curInput.value){ // if you train it might go over 98% so not risking it
		this.addListedItem(this.holder,'Deleting normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' because you have completed the task training ' + this.count + ' times');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}else if(stat >= this.curInput.value && !this.curInput.train){
		this.addListedItem(this.holder,'Deleting normal train ' + this.curInput.attribute + ' / ' + this.curInput.activity + 
			' because you have completed the task training ' + this.count + ' times');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	this.runNormalTraining();
};

PlayerHelper.prototype.computeVpInput = function(){
	// first thing we need to do is get a list of the current VA's
	var url = 'http://goallineblitz.com/game/vet_skills.pl?player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.processVpInput);
};

PlayerHelper.prototype.processVpInput = function(address,xmlhttp){
	var theDiv = document.createElement('DIV');
	Element.setStyle(theDiv,{display:'none'});
	var start = xmlhttp.responseText.indexOf('<body');
	start = xmlhttp.responseText.indexOf('>',start) + 1;
	var end = xmlhttp.responseText.indexOf('</body>');
	theDiv.innerHTML = xmlhttp.responseText.substring(start,end);
	this.scrollDiv.appendChild(theDiv);
	this.list = $$('DIV.skill_list DIV.skill DIV.skill_button DIV.skill_level');
	
	if(this.list.length == 0){
		// some type of error, more then likely the player is currently playing in a game
		Element.remove(theDiv);
		this.ignoreVp = true;
		this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because there was an error trying to get the ' +
			'vet points list (usually means they were playing in a game)');
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	// go through the VA's array to find the one we want
	for(var va in THEVPS){
		var temp = THEVPS[va];
		if(temp.name == this.curInput.vpAtt){
			this.curInput.vpObj = temp;
			break;
		}
	}
	
	if(!this.curInput.vpObj){
		this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because there was an error trying to ' +
			'locate the vet object (unknown reason)');
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	//Element.remove(theDiv);
	theDiv.innerHTML = '';
	theDiv = null;
	
	if(this.curInput.vpObj.requrements){ // this va has requirements to it, lets make sure we pass them
		var url = 'http://goallineblitz.com/game/player.pl?player_id=' + this.curPlayer.id;
		this.getAjaxRequest(url,this.checkVpRequirements);
	}else{
		this.completeVpLogic();
	}
};

PlayerHelper.prototype.checkVpRequirements = function(url,xmlhttp){
	var response = xmlhttp.responseText;

	for(var theReq in this.curInput.vpObj.requrements){
		var obj = this.curInput.vpObj.requrements[theReq];

		if(obj.item == 'weight'){
			var start = response.indexOf('<td class="vital_head">Weight:</td>');
			var holder = response.substring(start,response.indexOf('</td>',start + 34));
			var stat = holder.split('>')[3];
			stat = Number(stat.substring(0,stat.length - 3));
			if(stat < obj.val){
				this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because you do not weigh enough');
				this.runPlayerObj(this.playerObjID);
				return;
			}
		}
		
		if(obj.item == 'fame'){
			var start = response.indexOf('<td class="current_stats_head">Fame</td>');
			var holder = response.substring(start,response.indexOf('</td>',start + 39));
			var stat = Number(holder.split('>')[3]);
			if(stat < obj.val){
				this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because you do not have enough fame (' + obj.val + ')');
				this.runPlayerObj(this.playerObjID);
				return;
			}
		}
		
		if(obj.item == 'level'){
			if(this.curPlayer.level < obj.val){
				this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because you are not high enough ' + 
					'of a level (' + obj.val + ')');
				this.runPlayerObj(this.playerObjID);
				return;
			}
		}
		
		// all that is left is attribute ones
		var toUse = response.toUpperCase();
		var start = toUse.indexOf('<DIV CLASS="STAT_HEAD_TALL">' + obj.item.toUpperCase() + ':</DIV>');
		var holder = toUse.substring(start,toUse.indexOf('</DIV>',start + 34 + obj.item.length));
		var stat = holder.split('>')[3];
		stat = Number(stat.split('(')[0]);
		if(stat < obj.val){
			this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because you do not have enough ' + 
				obj.item + ' (' + obj.val + ')');
			this.runPlayerObj(this.playerObjID);
			return;
		}
	}

	// if we are here that means we passed all requirements
	this.completeVpLogic();
};

PlayerHelper.prototype.completeVpLogic = function(){
	var wantedVa;
	// put into an array all the current values
	this.curvps = [];
	for(var i=0;i<this.list.length;i++){
		var curVp = {};
		curVp.name = this.list[i].id.replace(/level\_/,'');
		curVp.val = parseInt(this.list[i].innerHTML);
		this.curvps.push(curVp);
		if(this.curInput.vpObj.saveName == curVp.name){
			wantedVa = curVp;
			wantedVa.index = i;
		}
	}

	if(!wantedVa){
		this.ignoreVp = true;
		this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because I was unable to match it up with a current VP');
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	if(wantedVa.val >= this.curInput.vpVal){
		this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because it is already completed, deleting the input');
		delete this.toReturnObj[this.curInput.key];
		this.runPlayerObj(this.playerObjID);
		return;
	}

	// grab the max amount of va's for the player's level
	var max = this.getVpMax();
	if(wantedVa.val >= max && wantedVa.val < this.curInput.vpVal){
		this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' because it is already at its max for the level');
		this.runPlayerObj(this.playerObjID);
		return;
	}

	var changeAmt = 0;
	while(wantedVa.val < max && wantedVa.val < this.curInput.vpVal && this.curPlayer.vp > 0){
		this.curPlayer.vp = this.curPlayer.vp - 1;
		wantedVa.val = wantedVa.val + 1;
		this.list[wantedVa.index].val = wantedVa.val;
		changeAmt = changeAmt + 1;
	}

	if(changeAmt == 0){
		this.addListedItem(this.holder,'Could not add vet points to ' + this.curInput.vpAtt + ' for unknown reasons');
		this.runPlayerObj(this.playerObjID);
		return;
	}	
	
	var url = 'http://goallineblitz.com/game/vet_skills.pl?player_id=' + this.curPlayer.id;
	var body = 'action=Submit&player_id=' + this.curPlayer.id;
	
	for(var vpObj in this.curvps){
		body = body + '&' + this.curvps[vpObj].name + '=' + this.curvps[vpObj].val;
	}
	if(DEBUG_SCRIPT){
		console.log('DEBUG: Saving vps body: ' + body);
	}
	this.changeAmt = changeAmt;
	this.wantedVa = wantedVa;
	this.getAjaxRequest(url,this.checkVpSpending,body);
};

PlayerHelper.prototype.checkVpSpending = function(url,xmlhttp){
	if(xmlhttp.responseText.indexOf('window.location.replace("/game/vet_skills.pl?player_id=') < 0){
		this.addListedItem(this.holder,'An error was returned while trying to spend VPs on ' + this.curInput.vpAtt + '. Please refer to the error log for further details');
		if(DEBUG_SCRIPT){
			console.log('VP spending response returned: ' + xmlhttp.responseText);
		}
		this.ignoreSp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	if(this.wantedVa.val >= this.curInput.vpVal){
		this.addListedItem(this.holder,'Added ' + this.changeAmt + ' VPs to ' + this.curInput.vpAtt + '. Deleting the input as the requirement has been met.');
		delete this.toReturnObj[this.curInput.key];
	}else{
		this.addListedItem(this.holder,'Added ' + this.changeAmt + ' VPs to ' + this.curInput.vpAtt);
	}
	this.runPlayerObj(this.playerObjID);
};

PlayerHelper.prototype.getVpMax = function(){
	var level = this.curPlayer.level;
	if(level < 25){
		return 0;
	}else if(level >= 25 && level < 30){
		return 5;
	}else if(level >= 30 && level < 39){
		return 10;
	}else{
		return 15;
	}
};

PlayerHelper.prototype.computeSpInput = function(){
	var url = 'http://goallineblitz.com/game/skill_points.pl?player_id=' + this.curPlayer.id;
	this.getAjaxRequest(url,this.processSpInput);
};

PlayerHelper.prototype.processSpInput = function(address,xmlhttp){
	var result = xmlhttp.responseText.toUpperCase();
	var start = result.indexOf('<DIV CLASS="ATTRIBUTE_VALUE" ID="' + this.curInput.spAtt.toUpperCase() + '">');
	var theVal = Number(result.substring(start,result.indexOf('</DIV>',start + 33 + this.curInput.spAtt.length)).split('>')[1]);
	var changeAmt = 0;
	while(this.curPlayer.sp >= this.figureSpCost(theVal) && theVal < this.curInput.spVal){
		this.curPlayer.sp = this.curPlayer.sp - this.figureSpCost(theVal);
		theVal = theVal + 1;
		changeAmt = changeAmt + 1;
	}
	
	if(theVal < this.curInput.spVal){
		// this means we weren't able to fully finish off this attribute, because of this we don't want to spend  sp's on any other attribute until this one is done
		this.ignoreSp = true;
	}
	
	if(changeAmt == 0){
		this.addListedItem(this.holder,'Could not add skill points to ' + this.curInput.spAtt + ' because you do not have enough points');
		this.runPlayerObj(this.playerObjID);
	}else{
		var url = 'http://goallineblitz.com/game/skill_points.pl?player_id=' + this.curPlayer.id;
		var body = 'action=Submit&player_id=' + this.curPlayer.id + '&' + this.curInput.spAtt.toLowerCase() + '=' + changeAmt;
		if(DEBUG_SCRIPT){
			console.log('DEBUG: Saving sps body: ' + body);
		}
		this.changeAmt = changeAmt;
		this.spVal = theVal;
		this.getAjaxRequest(url,this.checkSpSpending,body);
	}
};

PlayerHelper.prototype.checkSpSpending = function(url,xmlhttp){
	if(xmlhttp.responseText.indexOf('window.location.replace("/game/skill_points.pl?player_id=') < 0){
		this.addListedItem(this.holder,'An error was returned while trying to spend SPs on ' + this.curInput.spAtt + '. Please refer to the error log for further details');
		if(DEBUG_SCRIPT){
			console.log('SP spending response returned: ' + xmlhttp.responseText);
		}
		this.ignoreSp = true;
		this.runPlayerObj(this.playerObjID);
		return;
	}
	
	if(this.spVal >= this.curInput.spVal){
		this.addListedItem(this.holder,'added ' + this.changeAmt + ' skill points to ' + this.curInput.spAtt + '. Deleting the input as the requirement has been met');
		delete this.toReturnObj[this.curInput.key];
	}else{
		this.addListedItem(this.holder,'added ' + this.changeAmt + ' skill points to ' + this.curInput.spAtt);
	}
	this.runPlayerObj(this.playerObjID);
};

PlayerHelper.prototype.getAjaxRequest = function(address,callback,body){
	var that = this;
	
	var xmlhttp = new XMLHttpRequest();
	
	if(body){
		xmlhttp.open('POST',address,true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-length", body.length);
		xmlhttp.setRequestHeader("Connection", "close");
	}else{
		xmlhttp.open('GET',address,true);
	}

	xmlhttp.onload = function(){
		if(this.status != 200){
			alert("Error loading a page: Error "+this.status+" loading "+address);
		}else{
			if(body){
				console.log('loaded POST: ' + address + ' body: ' + body);
			}else{
				console.log('loaded: ' + address);
			}
			if(callback){
				callback.apply(that,[address,this]);
			}
		}
	};

	if(body){
		xmlhttp.send(body);
	}else{
		xmlhttp.send(null);
	}
	return xmlhttp;
};

PlayerHelper.prototype.addListedItem = function(holder,text){
	var itm = document.createElement('LI');
	Element.update(itm,text);
	Element.setStyle(itm,{listStyleType:'circle',listStylePosition:'inside',marginLeft:'30px'});
	holder.appendChild(itm);
};

PlayerHelper.prototype.getPlayersList = function(){
	this.playersList = [];
	// first we need to figure out what style the home page is (list or grid)
	var dd = $$('DIV#players_teams DIV.view_style SELECT')[1];
	
	if(dd.selectedIndex == 0){
		var playerDivs = $$('DIV#players DIV.playerhead');
		if(DEBUG_SCRIPT){
			console.log('DEBUG: total playerDivs: ' + playerDivs.length);
		}
		for(var i=0;i<playerDivs.length;i++){
			var curPlayer = {};
			if(DEBUG_SCRIPT){
				console.log('DEBUG: counter: ' + i + ' innerArea: ' + playerDivs[i].innerHTML);
			}
			var link = playerDivs[i].children[1];
			curPlayer.name = link.innerHTML;
			curPlayer.id = link.href.split('=')[1];
			this.playersList.push(curPlayer);
		}
	}else if(dd.selectedIndex == 1){
		var playerTDs = $$('DIV#players TABLE TBODY TR TD.list_name A');
		for(var i=0;i<playerTDs.length;i++){
			var curPlayer = {};
			curPlayer.name = playerTDs[i].innerHTML;
			curPlayer.id = playerTDs[i].href.split('=')[1];
			this.playersList.push(curPlayer);
		}
	}else{
		alert('There was an error getting the player list format');
	}
};
		
PlayerHelper.prototype.startPlayerPage = function(){
	// see if it is our own player
	if($$('DIV#player_links_box').length == 0){
		return;
	}
	
	this.playerid = window.location.href.split('=')[1];
	this.playerLevel = parseInt($$('TABLE#player_current_stats_table TR TD.current_stats_value')[0].innerHTML);
	this.playerPosition = $$('DIV#player DIV.position')[0].innerHTML;
	if(DEBUG_SCRIPT){
		console.log(this.playerLevel + ' - ' + this.playerPosition);
	}
	this.playerObj = GM_getValue('PlayerHelper' + this.playerid,'{}');
	eval('this.playerObj = ' + this.playerObj);
	if(this.playerObj && DEBUG_SCRIPT){
		console.log('This players saved info: ' + Object.toJSON(this.playerObj));
	}
	this.appendMainDivs();
	this.startPlayerProcess();
};

PlayerHelper.prototype.startPlayerProcess = function(){
	var that = this;
	this.index = 0;
	
	var theSpan = document.createElement('SPAN');
	theSpan.innerHTML = '<u>Player Inputs:</u><br />';
	this.mainDiv.appendChild(theSpan);
	
	this.dataHolder = document.createElement('DIV');
	this.mainDiv.appendChild(this.dataHolder);
	
	if(this.playerObj){
		this.loadPlayersData();
	}
	
	var link = document.createElement('A');
	link.href = 'javascript:void(0);';
	link.addEventListener('click',function() { that.addNewInput.apply(that); },false);
	link.innerHTML = 'Add New Input';
	this.mainDiv.appendChild(link);
	
	link = document.createElement('A');
	link.href = 'javascript:void(0);';
	Element.setStyle(link,{marginLeft:'10px'});
	link.addEventListener('click',function() { that.saveInputs.apply(that); },false);
	link.innerHTML = 'Save Inputs';
	this.mainDiv.appendChild(link);
};

PlayerHelper.prototype.loadPlayersData = function(){
	for(var row in this.playerObj.theInputs){
		var theRow = this.playerObj.theInputs[row];
		switch(theRow.type){
			case 'sp':
				var dd = this.addNewInput(theRow);
				this.createSpField(dd,theRow);
				break;
			case 'vp':
				var dd = this.addNewInput(theRow);
				this.createVpField(dd,theRow);
				break;
			case 'tp':
				var dd = this.addNewInput(theRow);
				var returned = this.createTpField(dd,theRow);
				this.figureTrainingType(returned[0],returned[1],theRow);
				break;
		}
	}
};

PlayerHelper.prototype.saveInputs = function(){
	var errors = $$('SPAN.errorHolder');
	for(var i=0;i<errors.length;i++){
		Element.remove(errors[i]);
	}

	var rows = $$('DIV#PlayerAssistantHolder DIV.paInput');
	this.savedRows = [];
	
	for(var i=0;i<rows.length;i++){
		this.saveRow(rows[i]);
	}
	

	if(this.savedRows.length == 0){
		GM_setValue('PlayerHelper' + this.playerid,'{}');
		this.postCompletedMessage('Nothing to save - cleared out inputs');
		return;
	}
	
	var tosave = {};
	tosave.theInputs = this.savedRows;
	var jsonver = Object.toJSON(tosave);
	if(DEBUG_SCRIPT){
		console.log('saving: ' + jsonver);
	}
	GM_setValue('PlayerHelper' + this.playerid,jsonver);
	this.postCompletedMessage('Saved Successfully');
};

PlayerHelper.prototype.postCompletedMessage = function(msg){
	var thespan = document.createElement('SPAN');
	thespan.innerHTML = msg;
	
	this.holder.appendChild(thespan);
	
	window.setTimeout(function(){ Element.remove(thespan); },5000);
};

PlayerHelper.prototype.saveRow = function(row){
	this.rowInfo = {};
	var theSel = Element.down(row,'SELECT');
	var theSpan = Element.down(row,'SPAN.ddInfo');
	var val = theSel.options[theSel.selectedIndex].value;
	this.rowInfo.type = val;
	
	if(val == 'sp'){
		if(!this.saveSPRow(theSpan)){
			return;
		}
	}else if(val == 'vp'){
		if(!this.saveVPRow(theSpan)){
			return;
		}
	}else if(val == 'tp'){
		if(!this.saveTPRow(theSpan)){
			return;
		}
	}else{
		this.reportError(row,'Not saved - No type selected');
		return;
	}
	
	this.savedRows.push(this.rowInfo);
};

PlayerHelper.prototype.saveSPRow = function(holder){
	// validate dropdown and grab value
	var theSel = Element.down(holder,'SELECT');
	if(theSel.selectedIndex == 0){
		this.reportError(Element.up(holder,'DIV'),'Not saved - No attribute selected');
		return false;
	}
	this.rowInfo['spAtt'] = theSel.options[theSel.selectedIndex].innerHTML;
	
	// validate input and grab value
	var theVal = Element.down(holder,'INPUT').value;
	if(isNaN(theVal) || !theVal){
		if(isNaN(theVal)){
			this.reportError(Element.up(holder,'DIV'),'Not saved - The value is not a number');
		}else if(!theVal){
			this.reportError(Element.up(holder,'DIV'),'Not saved - No value entered');
		}
		return false;
	}else if(parseInt(theVal) < 1){
		this.reportError(Element.up(holder,'DIV'),'Not saved - You cannot enter a number below 1');
		return false;
	}
	this.rowInfo['spVal'] = parseInt(theVal);
	
	return true;
};

PlayerHelper.prototype.saveVPRow = function(holder){
	// validate dropdown and grab value
	var theSel = Element.down(holder,'SELECT');
	if(theSel.selectedIndex == 0){
		this.reportError(Element.up(holder,'DIV'),'Not saved - No ventran attribute selected');
		return false;
	}
	this.rowInfo['vpAtt'] = theSel.options[theSel.selectedIndex].innerHTML;
	
	// validate input and grab value
	var theVal = Element.down(holder,'INPUT').value;
	if(isNaN(theVal) || !theVal){
		if(isNaN(theVal)){
			this.reportError(Element.up(holder,'DIV'),'Not saved - The value is not a number');
		}else if(!theVal){
			this.reportError(Element.up(holder,'DIV'),'Not saved - No value entered');
		}
		return false;
	}else if(parseInt(theVal) > 15){
		this.reportError(Element.up(holder,'DIV'),'Not saved - You cannot enter more then 15 here');
		return false;
	}else if(parseInt(theVal) < 1){
		this.reportError(Element.up(holder,'DIV'),'Not saved - You cannot enter a number below 1');
		return false;
	}
	this.rowInfo['vpVal'] = parseInt(theVal);
	
	return true;
};

PlayerHelper.prototype.saveTPRow = function(holder){
	var dd = Element.down(holder,'SELECT');
	var theSpan = dd.nextSibling;
	
	if(dd.selectedIndex == 1){
		this.rowInfo['trainType'] = 'Normal';
		return this.saveNormalTraining(theSpan);
	}else if(dd.selectedIndex == 2){
		this.rowInfo['trainType'] = 'Intense';
		return this.saveIntenseTraining(theSpan);
	}else{
		this.reportError(Element.up(holder,'DIV'),'Not saved - No Training Type Selected');
		return false;
	}
};

PlayerHelper.prototype.saveNormalTraining = function(holder){
	var firstDD = Element.down(holder,'SELECT');
	var secondDD = firstDD.nextSibling;
	var theInput = Element.down(holder,'INPUT');
	var theVal = theInput.value;
	var chkBox = Element.next(theInput,'INPUT');
	
	if(firstDD.selectedIndex == 0){
		this.reportError(Element.up(holder,'DIV'),'Not saved - No activity selected');
		return false;
	}
	this.rowInfo['activity'] = firstDD.options[firstDD.selectedIndex].innerHTML;
	
	if(secondDD.selectedIndex == 0){
		this.reportError(Element.up(holder,'DIV'),'Not saved - No attribute selected');
		return false;
	}
	this.rowInfo['attribute'] = secondDD.options[secondDD.selectedIndex].innerHTML;
	
	// validate input and grab value
	if(isNaN(theVal) || !theVal){
		if(isNaN(theVal)){
			this.reportError(Element.up(holder,'DIV'),'Not saved - The value is not a number');
		}else if(!theVal){
			this.reportError(Element.up(holder,'DIV'),'Not saved - No value entered');
		}		return false;
	}
	this.rowInfo['value'] = parseInt(theVal);
	
	this.rowInfo['train'] = chkBox.checked;
	
	return true;
};

PlayerHelper.prototype.saveIntenseTraining = function(holder){
	var firstDD = Element.down(holder,'SELECT');
	var secondDD = firstDD.nextSibling;
	var thirdDD = secondDD.nextSibling.nextSibling;
	var theInput = Element.down(holder,'INPUT');
	var theVal = theInput.value;
	var chkBox = Element.next(theInput,'INPUT');
	
	if(firstDD.selectedIndex == 0){
		this.reportError(Element.up(holder,'DIV'),'Not saved - No first attribute selected');
		return false;
	}
	this.rowInfo['firstAtt'] = firstDD.options[firstDD.selectedIndex].innerHTML;
	
	if(secondDD.selectedIndex == 0){
		this.reportError(Element.up(holder,'DIV'),'Not saved - No second attribute selected');
		return false;
	}
	this.rowInfo['secondAtt'] = secondDD.options[secondDD.selectedIndex].innerHTML;
	
	if(thirdDD.selectedIndex == 0){
		this.reportError(Element.up(holder,'DIV'),'Not saved - No training amount selected');
		return false;
	}
	this.rowInfo['trainAmt'] = thirdDD.options[thirdDD.selectedIndex].value;
	
	// validate input and grab value
	if(isNaN(theVal) || !theVal){
		if(isNaN(theVal)){
			this.reportError(Element.up(holder,'DIV'),'Not saved - The value is not a number');
		}else if(!theVal){
			this.reportError(Element.up(holder,'DIV'),'Not saved - No value entered');
		}		return false;
	}
	this.rowInfo['value'] = parseInt(theVal);
	
	this.rowInfo['train'] = chkBox.checked;
	
	return true;
};

PlayerHelper.prototype.reportError = function(row,error){
	var theSpan = document.createElement('SPAN');
	theSpan.setAttribute('class','errorHolder');
	Element.setStyle(theSpan,{color:'red',fontWeight:'bold',marginLeft:'5px'});
	theSpan.innerHTML = error;
	row.appendChild(theSpan);
};

PlayerHelper.prototype.addNewInput = function(defaultRow){
	var that = this;
	var div = document.createElement('DIV');
	div.setAttribute('phIndex',this.index);
	this.index++;
	div.setAttribute('class','paInput');
	
	// remove link
	var a = document.createElement('A');
	a.href = 'javascript:void(0);';
	a.addEventListener('click',function() { that.removeRow.apply(that,[this]); },false);
	a.innerHTML = '(Remove)';
	Element.setStyle(a,{marginRight:'5px',fontSize:'7pt'});
	div.appendChild(a);
	
	// move up link
	a = document.createElement('A');
	a.href = 'javascript:void(0);';
	a.addEventListener('click',function() { that.swapRow.apply(that,[this,'up']); },false);
	a.innerHTML = '(Move Up)';
	Element.setStyle(a,{marginRight:'5px',fontSize:'7pt'});
	div.appendChild(a);
	
	// move dowm link
	a = document.createElement('A');
	a.href = 'javascript:void(0);';
	a.addEventListener('click',function() { that.swapRow.apply(that,[this,'down']); },false);
	a.innerHTML = '(Move Down)';
	Element.setStyle(a,{marginRight:'5px',fontSize:'7pt'});
	div.appendChild(a);
	
	var dropdown = document.createElement('SELECT');
	dropdown.addEventListener('change',function() { that.changeDropdownOutput.apply(that,[this]); },false);
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = "Skill Points";
	option.value = 'sp';
	if(defaultRow && defaultRow.type == 'sp'){
		option.selected = true;
	}
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = "Veteran Points";
	option.value = 'vp';
	if(defaultRow && defaultRow.type == 'vp'){
		option.selected = true;
	}
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = "Training Points";
	option.value = 'tp';
	if(defaultRow && defaultRow.type == 'tp'){
		option.selected = true;
	}
	dropdown.appendChild(option);
	
	this.dataHolder.appendChild(div);
	div.appendChild(dropdown);
	
	var ddInfo = document.createElement('SPAN');
	Element.setStyle(ddInfo,{marginLeft:'10px'});
	ddInfo.setAttribute('class','ddInfo');
	div.appendChild(ddInfo);
	
	return dropdown;
};

PlayerHelper.prototype.swapRow = function(link,direction){
	var row = link.parentNode;
	
	if(direction == 'up' && row.previousSibling){
		swapNodes(row,row.previousSibling);
	}else if(direction == 'down' && row.nextSibling){
		swapNodes(row,row.nextSibling);
	}
};

PlayerHelper.prototype.removeRow = function(link){
	var row = link.parentNode;
	Element.remove($(row));
};

PlayerHelper.prototype.changeDropdownOutput = function(dd){
	var val = dd.options[dd.selectedIndex].value;
	var desc = dd.options[dd.selectedIndex].innerHTML;
	//console.log(val);
	
	if(!val){
		dd.nextSibling.innerHTML = '';
		return;
	}else if(val == 'sp'){
		this.createSpField(dd);
		return;
	}else if(val == 'vp'){
		this.createVpField(dd);
		return;
	}else if(val == 'tp'){
		this.createTpField(dd);
		return;
	}else{
		dd.nextSibling.innerHTML = '';
		return;
	}
};

PlayerHelper.prototype.createTpField = function(dd,defaultRow){
	var that = this;
	var div = dd.nextSibling;
	div.innerHTML = '';
	
	var dropdown = document.createElement('SELECT');
	Element.setStyle(dropdown,{marginLeft:'5px',marginRight:'5px'});
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = 'Normal Training';
	option.value = 'normal';
	if(defaultRow && defaultRow.trainType == 'Normal'){	
		option.selected = true;
	}
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = 'Intense Training';
	option.value = 'intense';
	if(defaultRow && defaultRow.trainType == 'Intense'){	
		option.selected = true;
	}
	dropdown.appendChild(option);
	div.appendChild(dropdown);
	
	var tpSpan = document.createElement('SPAN');
	div.appendChild(tpSpan);
	
	dropdown.addEventListener('change',function() { that.figureTrainingType.apply(that,[tpSpan,dropdown]); },false);
	return [tpSpan,dropdown];
};

PlayerHelper.prototype.figureTrainingType = function(loc,dd,defaultRow){
	if(dd.selectedIndex == 1){
		this.showNormalOptions(loc,dd,defaultRow);
	}else if(dd.selectedIndex == 2){
		this.showIntenseOptions(loc,dd,defaultRow);
	}else{
		loc.innerHTML = '';
	}
};

PlayerHelper.prototype.showNormalOptions = function(loc,dd,defaultRow){
	loc.innerHTML = '';
	// no activity, shopping, night out
	var dropdown = document.createElement('SELECT');
	Element.setStyle(dropdown,{marginLeft:'5px',marginRight:'5px'});
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = 'No Activity';
	option.value = 'none';
	if(defaultRow && defaultRow.activity == 'No Activity'){
		option.selected = true;
	}
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = 'Shopping Token';
	option.value = 'shop';
	if(defaultRow && defaultRow.activity == 'Shopping Token'){
		option.selected = true;
	}
	dropdown.appendChild(option);
	
	option = document.createElement('OPTION');
	option.innerHTML = 'Night Out On Town';
	option.value = 'morale';
	if(defaultRow && defaultRow.activity == 'Night Out On Town'){
		option.selected = true;
	}
	dropdown.appendChild(option);
	loc.appendChild(dropdown);
	
	this.createSPDD(loc,defaultRow);
	
	var theText = document.createElement('textfield');
	theText.innerHTML = ' Run this until it reaches ';
	loc.appendChild(theText);
	
	var theInput = document.createElement('INPUT');
	theInput.setAttribute('type','text');
	theInput.setAttribute('size','1');
	if(defaultRow){
		theInput.value = defaultRow.value;
	}
	loc.appendChild(theInput);
	
	var theText = document.createElement('textfield');
	theText.innerHTML = ' Train to 90%+ ';
	loc.appendChild(theText);
	
	var theInput = document.createElement('INPUT');
	theInput.setAttribute('type','checkbox');
	if(defaultRow){
		theInput.checked = defaultRow.train;
	}
	loc.appendChild(theInput);
};

PlayerHelper.prototype.showIntenseOptions = function(loc,dd,defaultRow){
	var that = this;
	loc.innerHTML = ' ';
	var dd = this.createSPDD(loc,defaultRow);
	
	// create secondary skill dd
	var dropdown = document.createElement('SELECT');
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dropdown.appendChild(option);
	loc.appendChild(dropdown);
	
	var theText = document.createElement('textfield');
	theText.innerHTML = ' Run this until ';
	loc.appendChild(theText);
	
	// will let them select lower, higher, or pick one of the two attributes
	var dd3 = document.createElement('SELECT');
	option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dd3.appendChild(option);
	loc.appendChild(dd3);
	
	theText = document.createElement('textfield');
	theText.innerHTML = ' reaches ';
	loc.appendChild(theText);
	
	var theInput = document.createElement('INPUT');
	theInput.setAttribute('type','text');
	theInput.setAttribute('size','1');
	if(defaultRow){
		theInput.value = defaultRow.value;
	}
	loc.appendChild(theInput);
	
	var theText = document.createElement('textfield');
	theText.innerHTML = ' Train to 90%+ ';
	loc.appendChild(theText);
	
	var theInput = document.createElement('INPUT');
	theInput.setAttribute('type','checkbox');
	if(defaultRow){
		theInput.checked = defaultRow.train;
	}
	loc.appendChild(theInput);
	
	dd.addEventListener('change',function() { that.changeSecondaryDD.apply(that,[dd,dropdown,dd3]); },false);
	dropdown.addEventListener('change',function() { that.changeTrainLimitDD.apply(that,[dd,dropdown,dd3]); },false);
	if(defaultRow){
		this.changeSecondaryDD(dd,dropdown,dd3,defaultRow);
	}
};

PlayerHelper.prototype.changeSecondaryDD = function(dd,dd2,dd3,defaultRow){
	dd2.innerHTML = '';
	var atts = THE2ATTS[dd.options[dd.selectedIndex].value];
	
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dd2.appendChild(option);
	for(var theAtt in atts){
		var option = document.createElement('OPTION');
		option.innerHTML = atts[theAtt].att;
		option.value = atts[theAtt].att;
		if(defaultRow && defaultRow.secondAtt == atts[theAtt].att){
			option.selected = true;
		}
		dd2.appendChild(option);
	}
	
	this.changeTrainLimitDD(dd,dd2,dd3,defaultRow);
};

PlayerHelper.prototype.changeTrainLimitDD = function(dd,dd2,dd3,defaultRow){
	dd3.innerHTML = '';
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dd3.appendChild(option);
	
	// first DD att
	if(dd.options[dd.selectedIndex].value){
		option = document.createElement('OPTION');
		option.innerHTML = dd.options[dd.selectedIndex].value;
		option.value = dd.options[dd.selectedIndex].value;
		dd3.appendChild(option);
		if(defaultRow && defaultRow.trainAmt == option.value){
			option.selected = true;
		}
	}
	
	// second DD att
	if(dd2.options[dd2.selectedIndex].value){
		option = document.createElement('OPTION');
		option.innerHTML = dd2.options[dd2.selectedIndex].value;
		option.value = dd2.options[dd2.selectedIndex].value;
		dd3.appendChild(option);
		if(defaultRow && defaultRow.trainAmt == option.value){
			option.selected = true;
		}
	}
	
	// lower value
	option = document.createElement('OPTION');
	option.innerHTML = 'Lower Value';
	option.value = 'lower';
	dd3.appendChild(option);
	if(defaultRow && defaultRow.trainAmt == option.value){
		option.selected = true;
	}
	
	// upper value
	option = document.createElement('OPTION');
	option.innerHTML = 'Higher Value';
	option.value = 'higher';
	dd3.appendChild(option);
	if(defaultRow && defaultRow.trainAmt == option.value){
		option.selected = true;
	}
};

PlayerHelper.prototype.createVpField = function(dd,defaultRow){
	var div = dd.nextSibling;
	div.innerHTML = '';
	this.createVPDD(div,defaultRow);
	var text = document.createElement('TextNode');
	text.innerHTML = ' Raise vet points until it reaches';
	div.appendChild(text);
	var theInput = document.createElement('INPUT');
	theInput.setAttribute('type','text');
	theInput.setAttribute('size','1');
	if(defaultRow){
		theInput.value = defaultRow.vpVal;
	}
	Element.setStyle(theInput,{marginLeft:'5px'});
	div.appendChild(theInput);
};

PlayerHelper.prototype.createVPDD = function(div,defaultRow){
	var dropdown = document.createElement('SELECT');
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dropdown.appendChild(option);
	
	for(var vp in THEVPS){
		var temp = THEVPS[vp];
		option = document.createElement('OPTION');
		option.innerHTML = temp.name;
		option.value = temp.name;
		if(defaultRow && defaultRow.vpAtt == temp.name){
			option.selected = true;
		}
		dropdown.appendChild(option);
	}
	
	div.appendChild(dropdown);
};

PlayerHelper.prototype.createSpField = function(dd,defaultRow){
	var div = dd.nextSibling;
	div.innerHTML = '';
	this.createSPDD(div,defaultRow);
	var text = document.createElement('TextNode');
	text.innerHTML = ' Raise skill points until it reaches';
	div.appendChild(text);
	var theInput = document.createElement('INPUT');
	theInput.setAttribute('type','text');
	theInput.setAttribute('size','1');
	if(defaultRow){
		theInput.value = defaultRow.spVal;
	}
	Element.setStyle(theInput,{marginLeft:'5px'});
	div.appendChild(theInput);
};

PlayerHelper.prototype.createSPDD = function(div,defaultRow){
	var dropdown = document.createElement('SELECT');
	var option = document.createElement('OPTION');
	option.innerHTML = 'Pick One...';
	option.value = '';
	dropdown.appendChild(option);
	
	for(var att in THEATTS){
		option = document.createElement('OPTION');
		option.innerHTML = THEATTS[att].name;
		option.value = THEATTS[att].name;
		if(defaultRow && (defaultRow.spAtt == THEATTS[att].name || defaultRow.attribute == THEATTS[att].name || defaultRow.firstAtt == THEATTS[att].name)){
			option.selected = true;
		}
		dropdown.appendChild(option);
	}
	
	div.appendChild(dropdown);
	return dropdown;
};

PlayerHelper.prototype.appendMainDivs = function(){
	var that = this;
	
	this.holder = document.createElement('DIV');
	this.holder.id = 'PlayerAssistantHolder';
	Element.setStyle(this.holder,{border:'1px solid black',marginTop:'10px'});
	$('player').insert({after:this.holder});
	this.showHideInput = document.createElement('INPUT');
	this.showHideInput.setAttribute('type','button');
	this.showHideInput.value = 'Show Player Assistant Info';
	this.showHideInput.addEventListener('click',function() { that.showHideDiv.apply(that); },false);
	this.mainDiv = document.createElement('DIV');
	this.mainDiv.style.display = 'none';
	//this.mainDiv.style.border = '1px dotted black';
	Element.setStyle(this.mainDiv,{width:'98%',marginLeft:'auto',marginRight:'auto',marginTop:'10px',marginBottom:'5px'});
	
	this.holder.appendChild(this.showHideInput);
	this.holder.appendChild(this.mainDiv);
};

PlayerHelper.prototype.showHideDiv = function(){
	if(this.mainDiv.style.display == 'none'){
		this.mainDiv.style.display = 'block';
		this.showHideInput.value = 'Hide Player Assistant Info';
	}else{
		this.mainDiv.style.display = 'none';
		this.showHideInput.value = 'Show Player Assistant Info';
	}
};

var THEATTS = {
		'Agility'	:{name:'Agility',saveName:'Cone+Drills'},
		'Blocking'	:{name:'Blocking',saveName:'Blocking+Drills'},
		'Catching'	:{name:'Catching',saveName:'Catching+Drills'},
		'Carrying'	:{name:'Carrying',saveName:'Handoff+Drills'},
		'Confidence':{name:'Confidence',saveName:'Self+Affirmation'},
		'Jumping'	:{name:'Jumping',saveName:'Jump+Rope'},
		'Kicking'	:{name:'Kicking',saveName:'Light+Kicking+Drills'},
		'Punting'	:{name:'Punting',saveName:'Leg+Extensions'},
		'Speed'		:{name:'Speed',saveName:'Treadmill'},
		'Stamina'	:{name:'Stamina',saveName:'Exercise+Cycle'},
		'Strength'	:{name:'Strength',saveName:'Bench+Press'},
		'Tackling'	:{name:'Tackling',saveName:'Tackling+Drills'},
		'Throwing'	:{name:'Throwing',saveName:'Throwing+Drills'},
		'Vision'	:{name:'Vision',saveName:'Study+Playbook'}
	};
var THE2ATTS = {
		'Agility'	:{
				'Blocking'	:{att:'Blocking',saveName:'Pass+Blocking+Drills'},
				'Speed'		:{att:'Speed',saveName:'Wind+Sprints'},
				'Stamina'	:{att:'Stamina',saveName:'Up+Downs'},
				'Tackling'	:{att:'Tackling',saveName:'Quick+Tackling+Drills'},
				'Throwing'	:{att:'Throwing',saveName:'Pocket+Drills'},
				'Vision'	:{att:'Vision',saveName:'Return+Drills'}
			},
		'Blocking'	:{
				'Agility'	:{att:'Agility',saveName:'Pass+Blocking+Drills'},
				'Strength'	:{att:'Strength',saveName:'Sled+Drills'}
			},
		'Catching'	:{
				'Carrying'	:{att:'Carrying',saveName:'Precision+Catching+Drills'},
				'Jumping'	:{att:'Jumping',saveName:'Posession+Catching+Drills'},
				'Vision'	:{att:'Vision',saveName:'Football+Launcher+Drills'}
			},
		'Carrying'	:{
				'Catching'	:{att:'Catching',saveName:'Precision+Catching+Drills'},
				'Confidence':{att:'Confidence',saveName:'Carrying+Drills'},
				'Strength'	:{att:'Strength',saveName:'Power+Running+Drills'}
			},
		'Confidence':{
				'Carrying'	:{att:'Carrying',saveName:'Carrying+Drills'},
				'Stamina'	:{att:'Stamina',saveName:'Distance+Run'},
				'Vision'	:{att:'Vision',saveName:'Study+Game+Film'}
			},
		'Jumping'	:{
				'Catching'	:{att:'Catching',saveName:'Posession+Catching+Drills'},
				'Stamina'	:{att:'Stamina',saveName:'Hurdle+Drills'},
				'Strength'	:{att:'Strength',saveName:'Leg+Press'},
				'Tackling'	:{att:'Tackling',saveName:'Diving+Tackle+Drills'},
				'Vision'	:{att:'Vision',saveName:'Coverage+Drills'}
			},
		'Kicking'	:{
				'Strength'	:{att:'Strength',saveName:'Distance+Kicking+Drills'},
				'Vision'	:{att:'Vision',saveName:'Kicking+Drills'}
			},
		'Punting'	:{
				'Strength'	:{att:'Strength',saveName:'Deep+Punting+Drills'},
				'Vision'	:{att:'Vision',saveName:'Punting+Drills'}
			},
		'Speed'		:{
				'Agility'	:{att:'Agility',saveName:'Wind+Sprints'},
				'Stamina'	:{att:'Stamina',saveName:'Hill+Sprints'},
				'Tackling'	:{att:'Tackling',saveName:'Pursuit+Drills'}
			},
		'Stamina'	:{
				'Agility'	:{att:'Agility',saveName:'Up+Downs'},
				'Confidence':{att:'Confidence',saveName:'Distance+Run'},
				'Jumping'	:{att:'Jumping',saveName:'Hurdle+Drills'},
				'Speed'		:{att:'Speed',saveName:'Hill+Sprints'}
			},
		'Strength'	:{
				'Blocking'	:{att:'Blocking',saveName:'Sled+Drills'},
				'Carrying'	:{att:'Carrying',saveName:'Power+Running+Drills'},
				'Jumping'	:{att:'Jumping',saveName:'Leg+Press'},
				'Kicking'	:{att:'Kicking',saveName:'Distance+Kicking+Drills'},
				'Punting'	:{att:'Punting',saveName:'Deep+Punting+Drills'},
				'Tackling'	:{att:'Tackling',saveName:'Force+Fumble+Drills'},
				'Throwing'	:{att:'Throwing',saveName:'Distance+Throwing+Drills'}
			},
		'Tackling'	:{
				'Agility'	:{att:'Agility',saveName:'Quick+Tackling+Drills'},
				'Jumping'	:{att:'Jumping',saveName:'Diving+Tackle+Drills'},
				'Speed'		:{att:'Speed',saveName:'Pursuit+Drills'},
				'Strength'	:{att:'Strength',saveName:'Force+Fumble+Drills'}
			},
		'Throwing'	:{
				'Agility'	:{att:'Agility',saveName:'Pocket+Drills'},
				'Strength'	:{att:'Strength',saveName:'Distance+Throwing+Drills'},
				'Vision'	:{att:'Vision',saveName:'Precision+Throwing+Drills'}
			},
		'Vision'	:{
				'Agility'	:{att:'Agility',saveName:'Return+Drills'},
				'Catching'	:{att:'Catching',saveName:'Football+Launcher+Drills'},
				'Confidence':{att:'Confidence',saveName:'Study+Game+Film'},
				'Jumping'	:{att:'Jumping',saveName:'Coverage+Drills'},
				'Kicking'	:{att:'Kicking',saveName:'Kicking+Drills'},
				'Punting'	:{att:'Punting',saveName:'Punting+Drills'},
				'Throwing'	:{att:'Throwing',saveName:'Precision+Throwing+Drills'}
			}
	};
var THEVPS = {
		'Adrenaline Junkie':	{name:'Adrenaline Junkie',saveName:'skill_adrenaline_junkie'},
		'Awe Inspiring':		{name:'Awe Inspiring',saveName:'skill_awe_inspiring',requrements:[{item:'level',val:'30'},{item:'fame',val:'640'}]},
		'Ball Hawk':			{name:'Ball Hawk',saveName:'skill_ball_hawk',requrements:[{item:'jumping',val:'40'}]},
		'Big Heart':			{name:'Big Heart',saveName:'skill_big_heart',requrements:[{item:'confidence',val:'40'}]},
		'Blocking Back':		{name:'Blocking Back',saveName:'skill_blocking_back'},
		'Booming Kick':			{name:'Booming Kick',saveName:'skill_booming_kick',requrements:[{item:'strength',val:'40'}]},
		'Brick Wall':			{name:'Brick Wall',saveName:'skill_brick_wall',requrements:[{item:'strength',val:'50'}]},
		'Bruiser':				{name:'Bruiser',saveName:'skill_bruiser',requrements:[{item:'carrying',val:'50'},{item:'strength',val:'50'}]},
		'Bull Rush':			{name:'Bull Rush',saveName:'skill_bull_rush',requrements:[{item:'weight',val:'245'}]},
		'Clever Instincts':		{name:'Clever Instincts',saveName:'skill_clever_instincts'},
		'Clock Manager':		{name:'Clock Manager',saveName:'skill_clock_manager'},
		'Clutch':				{name:'Clutch',saveName:'skill_clutch'},
		'Comeback Kid':			{name:'Comeback Kid',saveName:'skill_comeback_kid'},
		'David vs Goliath':		{name:'David vs Goliath',saveName:'skill_david_vs_goliath',requrements:[{item:'tackling',val:'60'}]},
		'Death Grip':			{name:'Death Grip',saveName:'skill_death_grip',requrements:[{item:'tackling',val:'40'}]},
		'Distance Runner':		{name:'Distance Runner',saveName:'skill_distance_runner'},
		'Downfield Blocker':	{name:'Downfield Blocker',saveName:'skill_downfield_blocker'},
		'Fearsome':				{name:'Fearsome',saveName:'skill_fearsome',requrements:[{item:'fame',val:'600'},{item:'strength',val:'40'}]},
		'Football Genius':		{name:'Football Genius',saveName:'skill_bonus_vision',requrements:[{item:'vision',val:'25'}]},
		'Go To Guy':			{name:'Go To Guy',saveName:'skill_go_to_guy',requrements:[{item:'fame',val:'800'}]},
		'Goal Line Back':		{name:'Goal Line Back',saveName:'skill_goal_line_back'},
		'Goal Line Blocker':	{name:'Goal Line Blocker',saveName:'skill_goal_line_blocker'},
		'Goal Line Stand':		{name:'Goal Line Stand',saveName:'skill_goal_line_stand'},
		'Great Blocker':		{name:'Great Blocker',saveName:'skill_bonus_blocking',requrements:[{item:'blocking',val:'25'}]},
		'Hail Mary':			{name:'Hail Mary',saveName:'skill_hail_mary',requrements:[{item:'strength',val:'50'}]},
		'Hard Count':			{name:'Hard Count',saveName:'skill_hard_count'},
		'Heart Of A Champion':	{name:'Heart Of A Champion',saveName:'skill_heart_of_champion',requrements:[{item:'fame',val:'480'}]},
		'Heavyweight':			{name:'Heavyweight',saveName:'skill_heavyweight',requrements:[{item:'weight',val:'225'}]},
		'Helmet Crash':			{name:'Helmet Crash',saveName:'skill_helmet_crash',requrements:[{item:'strength',val:'60'}]},
		'High Jumper':			{name:'High Jumper',saveName:'skill_bonus_jumping',requrements:[{item:'jumping',val:'25'}]},
		'Hometown Hero':		{name:'Hometown Hero',saveName:'skill_hometown_hero',requrements:[{item:'fame',val:'160'}]},
		'Intimidating':			{name:'Intimidating',saveName:'skill_intimidating'},
		'Jackhammer':			{name:'Jackhammer',saveName:'skill_jackhammer',requrements:[{item:'strength',val:'50'}]},
		'Jump The Snap':		{name:'Jump The Snap',saveName:'skill_jump_the_snap'},
		'Laces Out':			{name:'Laces Out',saveName:'skill_laces_out',requrements:[{item:'kicking',val:'40'}]},
		'Laser Arm':			{name:'Laser Arm',saveName:'skill_bonus_throwing',requrements:[{item:'throwing',val:'25'}]},
		'Leg Of Steel':			{name:'Leg Of Steel',saveName:'skill_leg_of_steel',requrements:[{item:'strength',val:'40'}]},
		'Long Reach':			{name:'Long Reach',saveName:'skill_long_reach'},
		'Mentor':				{name:'Mentor',saveName:'skill_mentor',requrements:[{item:'level',val:'32'}]},
		'Motivational Speaker':	{name:'Motivational Speaker',saveName:'skill_motivator',requrements:[{item:'fame',val:'200'}]},
		'Mr First Down':		{name:'Mr First Down',saveName:'skill_mr_first_down',requrements:[{item:'vision',val:'40'}]},
		'Mr Reliable':			{name:'Mr Reliable',saveName:'skill_mr_reliable'},
		'Nail In Coffin':		{name:'Nail In Coffin',saveName:'skill_nail_in_coffin',requrements:[{item:'vision',val:'40'}]},
		'Natural Leader':		{name:'Natural Leader',saveName:'skill_natural_leader',requrements:[{item:'fame',val:'300'}]},
		'Nerves Of Steel':		{name:'Nerves Of Steel',saveName:'skill_nerves_of_steel',requrements:[{item:'strength',val:'40'}]},
		'Never Give Up':		{name:'Never Give Up',saveName:'skill_never_give_up',requrements:[{item:'fame',val:'300'}]},
		'On A Roll':			{name:'On A Roll',saveName:'skill_on_a_roll'},
		'Outside Blocker':		{name:'Outside Blocker',saveName:'skill_screen_blocker'},
		'Overtime Killer':		{name:'Overtime Killer',saveName:'skill_overtime_killer',requrements:[{item:'confidence',val:'40'}]},
		'Pass Blocker':			{name:'Pass Blocker',saveName:'skill_pass_blocker',requrements:[{item:'blocking',val:'50'}]},
		'Pass Rusher':			{name:'Pass Rusher',saveName:'skill_pass_rusher',requrements:[{item:'strength',val:'50'}]},
		'Pocket Crusher':		{name:'Pocket Crusher',saveName:'skill_pocket_crusher',requrements:[{item:'weight',val:'245'}]},
		'Possession Receiver':	{name:'Possession Receiver',saveName:'skill_possession_receiver'},
		'Power Tackler':		{name:'Power Tackler',saveName:'skill_power_tackler'},
		'Prime Time Player':	{name:'Prime Time Player',saveName:'skill_prime_time_player',requrements:[{item:'fame',val:'500'}]},
		'Pulling Lineman':		{name:'Pulling Lineman',saveName:'skill_pulling_guard'},
		'Punishing Runner':		{name:'Punishing Runner',saveName:'skill_punishing_runner',requrements:[{item:'strength',val:'50'}]},
		'Quick':				{name:'Quick',saveName:'skill_bonus_agility',requrements:[{item:'agility',val:'25'}]},
		'Quick Feet':			{name:'Quick Feet',saveName:'skill_quick_feet'},
		'Quick Release':		{name:'Quick Release',saveName:'skill_quick_release',requrements:[{item:'throwing',val:'50'}]},
		'Red Zone Freak':		{name:'Red Zone Freak',saveName:'skill_red_zone_freak'},
		'Return Man':			{name:'Return Man',saveName:'skill_return_man'},
		'Rip The Ball':			{name:'Rip The Ball',saveName:'skill_rip_the_ball',requrements:[{item:'vision',val:'50'}]},
		'Scat Back':			{name:'Scat Back',saveName:'skill_scat_back'},
		'Scrambler':			{name:'Scrambler',saveName:'skill_scrambler'},
		'Second Wind':			{name:'Second Wind',saveName:'skill_second_wind'},
		'Shed Weight':			{name:'Shed Weight',saveName:'skill_shed_weight',requrements:[{item:'strength',val:'50'}]},
		'Short Yardage Monster':{name:'Short Yardage Monster',saveName:'skill_short_yardage_monster',requrements:[{item:'vision',val:'40'}]},
		'Showboat':				{name:'Showboat',saveName:'skill_showboat',requrements:[{item:'fame',val:'320'}]},
		'Showboat Blocker':		{name:'Showboat Blocker',saveName:'skill_showboat_blocker'},
		'Slippery':				{name:'Slippery',saveName:'skill_slippery',requrements:[{item:'agility',val:'50'}]},
		'Slot Machine':			{name:'Slot Machine',saveName:'skill_slot_machine',requrements:[{item:'catching',val:'65'}]},
		'Slow Starter':			{name:'Slow Starter',saveName:'skill_slow_starter',requrements:[{item:'agility',val:'50'}]},
		'Soccer Star':			{name:'Soccer Star',saveName:'skill_bonus_kicking'},
		'Soft Hands':			{name:'Soft Hands',saveName:'skill_bonus_catching',requrements:[{item:'catching',val:'25'}]},
		'Special Teamer':		{name:'Special Teamer',saveName:'skill_special_teamer'},
		'Steady Grip':			{name:'Steady Grip',saveName:'skill_bonus_carrying',requrements:[{item:'carrying',val:'25'}]},
		'Stonewall':			{name:'Stonewall',saveName:'skill_stonewall',requrements:[{item:'weight',val:'225'},{item:'strength',val:'50'}]},
		'Streaky':				{name:'Streaky',saveName:'skill_streaky'},
		'Sure Hands':			{name:'Sure Hands',saveName:'skill_sure_hands',requrements:[{item:'catching',val:'50'}]},
		'Sure Tackler':			{name:'Sure Tackler',saveName:'skill_sure_tackler',requrements:[{item:'tackling',val:'40'}]},
		'Swagger':				{name:'Swagger',saveName:'skill_bonus_confidence',requrements:[{item:'confidence',val:'25'}]},
		'Technique Man':		{name:'Technique Man',saveName:'skill_technique_man',requrements:[{item:'agility',val:'50'}]},
		'Tenacious':			{name:'Tenacious',saveName:'skill_tenacious'},
		'Textbook Tackler':		{name:'Textbook Tackler',saveName:'skill_bonus_tackling',requrements:[{item:'tackling',val:'25'}]},
		'Thick Skin':			{name:'Thick Skin',saveName:'skill_thick_skin'},
		'Third Down Stopper':	{name:'Third Down Stopper',saveName:'skill_third_down_stopper'},
		'Towering Man':			{name:'Towering Man',saveName:'skill_towering_man',requrements:[{item:'jumping',val:'40'}]},
		'Track Star':			{name:'Track Star',saveName:'skill_bonus_speed',requrements:[{item:'speed',val:'25'}]},
		'Underdog':				{name:'Underdog',saveName:'skill_underdog'},
		'Workhorse':			{name:'Workhorse',saveName:'skill_bonus_stamina',requrements:[{item:'stamina',val:'25'}]},
		'Workout Warrior':		{name:'Workout Warrior',saveName:'skill_bonus_strength',requrements:[{item:'strength',val:'25'}]},
		'Yac Attack':			{name:'Yac Attack',saveName:'skill_yac_attack',requrements:[{item:'carrying',val:'40'}]},
		'Zone Specialist':		{name:'Zone Specialist',saveName:'skill_zone_specialist'}
	};

function swapNodes(item1,item2) {
	// We need a clone of the node we want to swap
	var itemtmp = item1.cloneNode(1);

	// We also need the parentNode of the items we are going to swap.
	var parent = item1.parentNode;

	// First replace the second node with the copy of the first node
	// which returns a the new node
	item2 = parent.replaceChild(itemtmp,item2);

	//Then we need to replace the first node with the new second node
	parent.replaceChild(item2,item1);

	// And finally replace the first item with it's copy so that we
	// still use the old nodes but in the new order. This is the reason
	// we don't need to update our Behaviours since we still have
	// the same nodes.
	parent.replaceChild(item1,itemtmp);

	// Free up some memory, we don't want unused nodes in our document.
	itemtmp = null;
};