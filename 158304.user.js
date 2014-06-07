// ==UserScript==
// @name           Dragon call
// @namespace      user106
// @include        http://*.dc.gamedp.com/*
// ==/UserScript==

//DOM utilities
function $(selector,doc){return (doc||document).querySelector(selector);}
function $a(selector,doc){return (doc||document).querySelectorAll(selector);}
function $i(id,doc){return (doc||document).getElementById(id);}
function $x(path,method,element){return (element?element.ownerDocument||element:document).evaluate(path,element||document,null,method||0,null);}
function $x1(path,element){return $x(path,9,element).singleNodeValue;}

//log functions
function log(){logText(Array.map(arguments,formatLogObject).join(", "),arguments.callee.caller?arguments.callee.caller.name?arguments.callee.caller.name:"":"");} //arguments.callee.caller.toSource()
function logText(text,source){GM_log(text); if (_logger) _logger.Log(text,source);}
function formatLogObject(obj){return obj==null?"<null>":typeof(obj)=="object" && typeof(obj.toSource)=="function"?obj.toSource():typeof(obj)=="function"?obj.name?"<"+obj.name+">":obj.toSource():obj;}

/********************************************************************/
/*                         Start Init functions                     */
/********************************************************************/
setTimeout(start);
function start()
{
	var key=getLocationKey();
	if (key=="kongregate") 
	{
		var el=$x1("//a[contains(text(),'Breeze Vale')]");
		if (el) clickElement(el);
	}
	else if (key=="main") setTimeout(init);
	else
	{
		var main=window.parent;
		while((text=getLocationKey(main))!="main" && main!=top) main=main.parent;
		if (text=="main") main.postMessage(key,"*");
	}
}

function init()
{
	log("init");
	loadOptions();
	if (_options.autoTopFrame && top!=self) top.location=location;
	else
	{
		unsafeWindow.document.addEventListener("DOMNodeInserted",mainNodeInserted,false);
		unsafeWindow.addEventListener("message",mainReceiveMessage,false);
		
		addHelper();
		createTopBar();
		startScheduler();
		changeTownButton();
		createOptionsPanel();
		unsafeWindow.document.onkeydown=null;

		//XPCNativeWrapper.unwrap(unsafeWindow).onerror=function(message,source,line){log(message,line+" "+source);}
	}
}

/********************************************************************/
/*                         Top bar and configuration panel          */
/********************************************************************/
function createTopBar()
{
	var el=$("#topBar");
	removeElement(el);
	
	var text="<style>#topBar a {color:black;}</style>";
	text+="<div style='white-space:nowrap;'><a href='javascript:void(0)' id='showOptions' title='show options'>*</a>";
	text+="<span id='escapeLinkSpan' "+(_options.escapeLink?"":"style='display:none'")+"> | <a href='#' target='_top' title='Escape link to make the frame top frame'>&uarr;</a></span>";
	text+="<span id='navigationDropdownSpan' "+(_options.navigationDropdown?"":"style='display:none'")+"> | <select id='goto' noreplace='true' title='choose a location to travel to'></select></span>";
	text+="<span id='schedulerSpan' "+(_options.schedulerCheckbox?"":"style='display:none'")+"> | <input type='checkbox' id='scheduler' title='Scheduler on/off' "+(_options.schedulerEnabled?"checked='checked'":"")+"'></span>";
	text+="<span id='fieldTextboxSpan' "+(_options.fieldTextbox?"":"style='display:none'")+"> | <input type='text' id='fightCount' size='2' maxlength='3' value='0' title='0-1 fight only one, >0 fight until reach zero, <0 or empty continue fighting'/></span>";
	text+="<span id='questsButtonSpan' "+(_options.questsButton?"":"style='display:none'")+"> | <input type='button' id='autoQuests' value='Q' title='Start Auto Quests'/></span>";
	text+="<span id='dailyQuestsTextBoxSpan' "+(_options.dailyQuestTextBox?"":"style='display:none'")+"> | <input type='text' id='dailyQuestAP' size='2' maxlength='3' value='30' title='AP for the daily quests'/><input type='button' id='dailyQuests' value='Q' title='Daily Quests'/></span>";
	text+="<span id='equipmentButtonSpan' "+(_options.equipmentButton?"":"style='display:none'")+"> | <input type='button' id='switchequipment' value='E' title='Switch Equipment'/></span>";
	text+="<span id='shopButtonSpan' "+(_options.shopButton?"":"style='display:none'")+"> | <input type='button' id='refreshShop' value='R' title='Refresh Shop'/></span>";
	//text+=" | <a href='javascript:void(0);' id='test1'>T1</a>"; 
	//text+=" <a href='javascript:void(0);' id='test2'>T2</a>"; 
	//text+=" <a href='javascript:void(0);' id='test3'>T3</a>";
	//text+=" <a href='javascript:void(0);' id='test4'>T4</a>";   
	//text+=" <a href='javascript:void(0);' id='test5'>T5</a>";
	text+="</div><div id='shopInfo'></div><div id='mercenaryHelper'></div><div id='raidHelper'></div><div id='quizHelper'></div><div id='fightInfo'></div><div id='arenaInfo'></div><div id='guildInfo'></div>";
	asb({tag:"div",atts:{id:"topBar",style:"position:fixed; left:0px; top:0px; z-index:100000; background-color:white; color:black; border:solid 1px black; padding:1px;"},html:text});
	
	//$("#test1").addEventListener("click",function(){getPackage(66);},false);
	//$("#test2").addEventListener("click",function(){schedulerRunTask({c:"autoGuildQuestScheduler",s:1});},false);	
	//$("#test3").addEventListener("click",function(){clearTeamState("guildState");},false);
	//$("#test4").addEventListener("click",function(){schedulerRunTask({c:"autoGuildWelfareScheduler",s:1});},false);
	//$("#test5").addEventListener("click",function(){schedulerRunTask({c:"autoQuizScheduler",s:1});},false);
	
	var select1=$("#goto");
	for(var location in _mapSystem) 
	{
		//log(location);
		select1.add(new Option(location,location));
	}
	select1.addEventListener("change",function(e){navigateTo(getSelectedValue(this));},false);
	
	$("#showOptions").addEventListener("click",function(e){loadOptions(); showOptionsPanel();},false);
	$("#scheduler").addEventListener("click",function(e){_options.enableScheduler=this.checked;applyOptions();},false);
	$("#autoQuests").addEventListener("click",autoQuests,false);
	$("#dailyQuests").addEventListener("click",function(){getDailyQuests(parseInt($("#dailyQuestAP").value));},false);
	$("#switchequipment").addEventListener("click",switchEquipment,false);
	$("#refreshShop").addEventListener("click",shopWatch,false);
}

function applyOptions()
{
	$("#escapeLinkSpan").style.display=_options.escapeLink?"":"none";
	$("#navigationDropdownSpan").style.display=_options.navigationDropdown?"":"none";
	$("#schedulerSpan").style.display=_options.schedulerCheckbox?"":"none";
	$("#fieldTextboxSpan").style.display=_options.fieldTextbox?"":"none";
	$("#dailyQuestsTextBoxSpan").style.display=_options.dailyQuestTextBox?"":"none";
	$("#questsButtonSpan").style.display=_options.questsButton?"":"none";
	$("#equipmentButtonSpan").style.display=_options.equipmentButton?"":"none";
	$("#shopButtonSpan").style.display=_options.shopButton?"":"none";
	
	$("#scheduler").checked=$("#enableScheduler").checked=_options.enableScheduler;
	saveOptions();
	var arr=getDailyQuestsFiltered();
	$("#dailyQuestsCount").textContent=arr.length;
	var num1=0;
	arr.forEach(function(q){num1+=q.quantity;});
	$("#dailyQuestsAP").textContent=num1;
	
	$("#playergm").style.display=_options.removeGameModerator?"none":"";
	$(".a7.thickbox").style.display=_options.removeCrystal?"none":"";
	$("#gamblingIco").style.display=_options.removeCrystal?"none":"";
	if (_options.removeCrystal) setTimeout(unsafeWindow.eval,0,"clearInterval(g_checkGamblingHandle);");
	if (_options.changeServerClock) changeServerClock();
	
	setTimeout(shopWatch,0);
	setTimeout(changeChat,0);
	setTimeout(changeImageless,0);
	setTimeout(schedulerTick,0);
	
	//updateAlwaysArena();
}

function createOptionsPanel()
{
	if (!$("#optionsPanel"))
	{
		asb({tag:"div",atts:{id:"optionsPanel",style:"display:none; position:fixed; left:0px; top:0px; z-index:1000000; width:100%; height:100%;"},html:"<div id='optionsPanelBackground' style='width:100%; height:100%; background-color:black; opacity:0.5;'></div><div id='optionsPanelContent' style='position:relative; top:-100%; margin:auto; margin-top:50px; width:80%; height:80%; background-color:white; color:black; border: solid 1px blue;'></div>"});
		
		$("#optionsPanelBackground").addEventListener("click",hideOptionsPanel,false);
		
		var text="<ul>";
		text+="<li><h3>Top Bar</h3><ul><li><input type='checkbox' id='escapeLink'/> <label for='escapeLink'>Link to top the game frame</label></li><li><input type='checkbox' id='navigationDropdown' checked='checked'/> <label for='navigationDropdown'>Navigation drop down</label></li><li><input type='checkbox' id='schedulerCheckbox' checked='checked'/> <label for='schedulerCheckbox'>Scheduler checkbox</label></li><li><input type='checkbox' id='fieldTextbox' checked='checked'/> <label for='fieldTextbox'>Field auto fight quantity textbox</label></li><li><input type='checkbox' id='dailyQuestTextBox' checked='checked'/> <label for='dailyQuestTextBox'>Daily quest text box</label></li><li><input type='checkbox' id='questsButton' checked='checked'/> <label for='questsButton'>Auto quests start button</label></li><li><input type='checkbox' id='equipmentButton'/> <label for='equipmentButton'>Switch equipment button</label></li><li><input type='checkbox' id='shopButton'/> <label for='shopButton'>Refresh shop watch button</label></li></ul></li>";
		text+="<li><h3>General</h3><ul><li><input type='checkbox' id='autoTopFrame' checked='checked'/> <label for='autoTopFrame'>Auto top game frame</label></li><li><input type='checkbox' id='removeGameModerator' checked='checked'/> <label for='removeGameModerator'>Remove game moderator icon</label></li><li><input type='checkbox' id='removeCrystal' checked='checked'/> <label for='removeCrystal'>Remove Crystal Icon</label></li><li><input type='checkbox' id='noFightAnimation' checked='checked'/> <label for='noFightAnimation'>Disable fight animation</label></li><li><input type='checkbox' id='noChat' /> <label for='noChat'>Disable chat</label></li><li><input type='checkbox' id='noChatButtons' /> <label for='noChatButtons'>Disable also chat button</label></li><li><input type='checkbox' id='changeServerClock' checked='checked'/> <label for='changeServerClock'>Change server clock</label>: <input type='radio' id='serverTimeEST' name='serverTime'/><label for='serverTimeEST' checked='checked'>EST</label> <input type='radio' id='serverTimeHKT' name='serverTime'/><label for='serverTimeHKT'>HKT</label> <input type='radio' id='serverTimeCustom' name='serverTime'/><label for='serverTimeCustom'>Difference in minutes:</label> <input type='text' size='5' id='serverTimeMinutes' value='-360'/></li><li><input type='checkbox' id='guildHelper' checked='checked'/> <label for='guildHelper'>Enable guild helper, server </label> <select id='server' noreplace='true'><option value='2'>1-2</option><option value='4'>3-4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select></li><li><input type='checkbox' id='autoWork'/> <label for='autoWork'>Auto work in</label> <select id='workIn' noreplace='true'><option value='arena' checked='checked'>Arena</option><option value='guild'>Guild</option><option value='weapon'>Weapon</option><option value='armor'>Armor</option><option value='jew'>Trinket</option><option value='market'>Market</option><option value='tavern'>Tavern</option><option value='auction'>Auction</option></select> for <select id='workFor' noreplace='true'><option value='1'>1 h</option><option value='2'>2 h</option><option value='3'>3 h</option><option value='4'>4 h</option><option value='6'>6 h</option><option value='8'>8 h</option><option value='10'>10 h</option><option value='12'>12 h</option></select></li><li><input type='checkbox' id='enhanceBank'/> <label for='enhanceBank'>Enhance bank with deposit max and withdraw all</label></li><li><input type='checkbox' id='autoRefill' checked='checked'/> <label for='autoRefill'>Auto refill</label>, refill <select id='hpquantity' noreplace='true'><option value='1' selected='selected'>3'000</option><option value='2'>15'000</option><option value='3'>30'000</option><option value='4'>150'000</option><option value='5'>600'000</option><option value='6'>3'000'000</option></select> hp when hp pack fall below your hp<br/><span style='margin-left:16px;'>Hint: in instance the hp are the sum of the party hp</span></li><li><input type='button' id='clearLogs' value='Clear Logs'/></li></ul></li>";
		text+="<li><h3>Scheduler</h3><ul><li><input type='checkbox' id='enableScheduler' /> <label for='enableScheduler'>Enable Scheduler</label> <input type='button' id='runningTask' value='Current Running Task'/> <input type='button' id='stopTask' value='Stop Current Task'/></li><li><input type='checkbox' id='schedulerWork' checked='checked'/> <label for='schedulerWork'>Enable Auto Work</label> <input type='button' id='startSchedulerWork' value='Start'/></li><li><input type='checkbox' id='schedulerBuyAP' checked='checked'/> <label for='schedulerBuyAP'>Enable Auto Buy Action Point</label> <input type='button' id='startSchedulerBuyAP' value='Start'/></li><li><input type='checkbox' id='schedulerQuiz' checked='checked'/> <label for='schedulerQuiz'>Enable Auto Quiz</label> (requires quiz helper) <input type='button' id='startSchedulerQuiz' value='Start'/></li><li><input type='checkbox' id='schedulerRaid' checked='checked'/> <label for='schedulerRaid'>Enable Auto Instance</label> (requires auto instance) <input type='button' id='startSchedulerRaid' value='Start'/> <input type='button' id='clearSchedulerRaid' value='Clear State'/></li><li><input type='checkbox' id='schedulerQuest' checked='checked'/> <label for='schedulerQuest'>Enable Auto Quest</label> (requires auto quest) <input type='button' id='startSchedulerQuest' value='Start'/></li><li><input type='checkbox' id='schedulerArena' checked='checked'/> <label for='schedulerArena'>Enable Auto Arena</label> (requires auto arena) <input type='button' id='startSchedulerArena' value='Start'/></li><li><input type='checkbox' id='schedulerGuildQuest' checked='checked'/> <label for='schedulerGuildQuest'>Enable Auto Guild Quest</label> (requires guild helper) <input type='button' id='startSchedulerGuildQuest' value='Start'/> <input type='button' id='clearSchedulerGuildQuest' value='Clear State'/></li><li><input type='checkbox' id='schedulerGuildWelfare' checked='checked'/> <label for='schedulerGuildWelfare'>Enable Auto Guild Welfare</label> <input type='button' id='startSchedulerGuildWelfare' value='Start'/></li><li><input type='checkbox' id='schedulerWage' checked='checked'/> <label for='schedulerWage'>Enable Auto Wage System</label> <input type='button' id='startSchedulerWage' value='Start'/></li><li><input type='checkbox' id='schedulerTournament' checked='checked'/> <label for='schedulerTournamnet'>Enable Auto Tournament</label> <input type='button' id='startSchedulerTournament' value='Start'/></li><li><input type='checkbox' id='schedulerReward' checked='checked'/> <label for='schedulerReward'>Enable Auto Tournament Reward</label> <input type='button' id='startSchedulerTournamentReward' value='Start'/></li><li><input type='checkbox' id='schedulerMailBox' checked='checked'/> <label for='schedulerMailBox'>Enable Auto Clear Mail Box</label> <input type='button' id='startSchedulerMailBox' value='Start'/></li><li><input type='checkbox' id='schedulerInventory' checked='checked'/> <label for='schedulerInventory'>Enable Auto Clear Inventory</label> <input type='button' id='startSchedulerInventory' value='Start'/></li><li><input type='button' id='resetScheduler' value='Reset Scheduler'/> <input type='button' id='logScheduler' value='Log Scheduler'/></li></ul></li>";
		text+="<li><h3>Field</h3><ul><li><input type='checkbox' id='autoField' checked='checked'/> <label for='autoField'>Auto fighting</label>, 0 or 1 fight only one, &gt;0 fight until reach 0, &lt;0 or empty continue fighting</span></li><li><input type='checkbox' id='detectQuantity' checked='checked'/> <label for='detectQuantity'>Detect quantity to fight from quests</label></li></ul></li>";
		text+="<li><h3>Quests</h3><ul><li><input type='checkbox' id='autoQuestDaily' checked='checked'/> <label for='autoQuestDaily'>Auto quests daily</label></li><li><input type='checkbox' id='autoQuestKill' checked='checked'/> <label for='autoQuestKill'>Auto quests kill enemies</label></li><li><input type='checkbox' id='autoQuestOther' /> <label for='autoQuestOther'>Auto quests other tasks</label></li><li>Daily quests level modifier: <input type='text' size='3' id='dailyQuetsLevel' value='10'/> --> <span id='dailyQuestsCount'></span>/"+_dailyQuests.length+" quests (<span id='dailyQuestsAP'></span> AP).</li></ul></li>";
		text+="<li><h3>Mercenary</h3><ul><li><input type='checkbox' id='selectRaid' checked='checked'/> <label for='selectRaid'>Auto select instance and free instance</label></li><li>Default commission <input type='text' id='mercenaryCommission' value='0' maxlength='8' size='8'/></li><li>Default password <input type='text' id='mercenaryPassword' value='8e6K1p' maxlength='6' size='6' /></li><li><input type='checkbox' id='emptyTeam' checked='checked'> <label for='emptyTeam'>Prevent empty team</label>: <input type='radio' name='emptyteam' id='emptyTeamAlert'/> <label for='emptyTeamAlert'>Alert</label> <input type='radio' name='emptyteam' id='emptyTeamConfirm' checked='checked'/><label for='emptyTeamConfirm'>Confirm</label></li><li>Hack passwords:<br/><textarea id='hackPasswords' style='margin-left:30px;' rows='3' cols='110'>"+_hackPasswords.toSource()+"</textarea></li></ul></li>";
		text+="<li><h3>Instance</h3><ul><li><input type='checkbox' id='autoRaid' checked='checked'/> <label for='autoRaid'>Auto instance</label>, sub boss <select id='raidSubBoss' noreplace='true'><option value='Easy'>Easy</option><option value='Normal'>Normal</option><option value='Hard' selected='selected'>Hard</option></select>, boss <select id='raidBoss' noreplace='true'><option value='Easy'>Easy</option><option value='Normal'>Normal</option><option value='Hard' selected='selected'>Hard</option></select></li><li>Instance level modifier: <input type='text' size='3' id='instanceLevel' value='0'/></li><li>Daily instance modifier: <input type='text' size='3' id='dailyInstance' value='0'/></li><li>Scheduler: <ul><li><input type='checkbox' id='extraThursdayInstance'/> <label for='extraThursdayInstance'>Extra instance on thursday</label></li><li><input type='checkbox' id='raidMaximizeExp'/> <label for='raidMaximizeExp'>Maximize exp</label></li></ul></li></ul></li>";
		text+="<li><h3>Mailbox</h3><ul><li>Clear mail from: <input type='checkbox' id='mailboxPlayer'/> <label for='mailboxPlayer'>Player</label> <input type='checkbox' id='mailboxCombat' checked='checked'/> <label for='mailboxCombat'>Combat</label> <input type='checkbox' id='mailboxMarket' checked='checked'/> <label for='mailboxMarket'>Market</label> <input type='checkbox' id='mailboxWork' checked='checked'/> <label for='mailboxWork'>Work</label> <input type='checkbox' id='mailboxQuest' checked='checked'/> <label for='mailboxQuest'>Quest</label> <input type='checkbox' id='mailboxSystem' checked='checked'/> <label for='mailboxSystem'>System</label></li></ul></li>";
		text+="<li><h3>Market</h3><ul><li><input type='checkbox' id='marketHelper' checked='checked'/> <label for='marketHelper'>Market price helper</label></li><li>Market prices:<br/><textarea id='marketPrices' style='margin-left:30px;' rows='3' cols='110' eval='true'>"+_marketPrices.toSource()+"</textarea></li></ul></li>";
		text+="<li><h3>Arena</h3><ul><li><input type='checkbox' id='autoArena' checked='checked'/> <label for='autoArena'>Auto arena</label>, function selectTarget(me, targets){<br/><textarea style='margin-left:30px;' id='arenaTargetFunction' rows='5' cols='110'>//log(me,targets);\n//sorting targets list per rank and level\ntargets.sort(function(p1,p2){return Math.min(me.rank,p1.rank,p2.rank)==me.rank || Math.max(me.rank,p1.rank,p2.rank)==me.rank?p1.level-p2.level:p1.rank-p2.rank ;});\n//return a random target between the first five targets\nreturn targets[Math.floor(Math.random()*Math.min(5,targets.length))];</textarea>}<br/><span style='margin-left:16px;'>Hint: use the log function to see the structure of the me or arena objects in the error console</span></li></ul></li>";
		text+="<li><h3>Shop</h3><ul><li><input type='checkbox' id='shopLookForItem'/> <label for='shopLookFor'>Shop look for item</label><br/>function lookForItem(stat,shop,item){<br/><textarea style='margin-left:30px;' id='shopLookForItemFunction' rows='3' cols='110'>//log(stat,shop,item);\n//interested only in red items\nreturn item.item_quality>5;</textarea>}<br/><span style='margin-left:16px;'>Hint: use the log function to see the structure of the item object in the error console</span></li><li><input type='checkbox' id='shopAutoBuyItem'/> <label for='shopAutoBuyItem'>Shop auto buy item</label><br/>function autoBuyItem(stat,shop,item){<br/><textarea style='margin-left:30px;' id='shopAutoBuyItemFunction' rows='3' cols='110'>//log(stat,shop,item);\n//interested only in red items\nreturn item.item_quality>5;</textarea>}<br/><span style='margin-left:16px;'>Hint: use the log function to see the structure of the item object in the error console</span></li></ul></li>";
		text+="<li><h3>Inventory</h3><li><input type='checkbox' id='clearInventory' checked='checked'/> <label for='clearInventory'>Clear inventory</label>, function clearItem(me, item){<br/><textarea style='margin-left:30px;' id='clearItemFunction' rows='3' cols='110'>//log(me,item);\n//0: leave in inventory, 1 sell item, 2 sell to market, 3 decompose, 4 move to warehouse\nvar i=0;\nif (item.item_type==1004) i=item.item_name.indexOf('True*')!=-1?4:1;\nif (item.item_type==1006) i=4;\nif (item.item_type==1007) i=item.item_name.indexOf('Strike')!=-1?4:1;\nif (item.item_quality<6 && item.item_lvl>1) i=3;\nreturn i;</textarea>}<br/><span style='margin-left:16px;'>Hint: use the log function to see the structure of the item object in the error console</span></li></ul></li>";
		text+="<li><h3>Quiz</h3><ul><li><input type='checkbox' id='quizHelperEnabled' checked='checked'/> <label for='quizHelperEnabled'>Quiz helper</label></li><li>Quiz questions:<br/><textarea id='quizQuestions' style='margin-left:30px;' rows='3' cols='110' eval='true'>"+_quizQuestions.toSource()+"</textarea><br/><input type='button' id='resetQuizQuestions' value='Reset' style='margin-left:30px;'/></li></ul></li>";
		text+="<li><h3>Imageless</h3><ul><li><input type='checkbox' id='imageless' checked='checked'/> <label for='imageless'>Enable imageless support</label></li><li>Imageless style:<br/><textarea id='imagelessStyle' style='margin-left:30px;' rows='3' cols='110'>"+_imagelessStyle+"</textarea><br/><input type='button' id='resetImagelessStyle' value='Reset' style='margin-left:30px;'/></ul></li>";
		text+="</ul>";
		
		$("#optionsPanelContent").innerHTML="<div style='border:solid 1px black; height:85%; margin:20px; padding:10px 0px 10px 10px;'><div style='height:100%; overflow:auto'>"+text+"</div></div><div style='position:absolute; bottom:10px; right:20px;'><input id='cancelButton' type='button' value='Cancel'/> <input id='applyButton' type='button' value='Apply'/> <input id='okButton' type='button' value='OK'/></div>";
		
		setOptions();
		saveOptions();
		applyOptions();

		$("#clearLogs").addEventListener("click",clearLogs,false);
		$("#runningTask").addEventListener("click",function(e){alert(_runningTask?_runningTask.toSource():"No task is running");},false);
		$("#stopTask").addEventListener("click",function(e){if (_runningTask) {_runningTask.s=2; schedulerRunTask(_runningTask);}},false);
		$("#startSchedulerWork").addEventListener("click",function(){schedulerRunTask({c:"autoWorkScheduler",s:1});},false);
		$("#startSchedulerBuyAP").addEventListener("click",function(){schedulerRunTask({c:"autoBuyActionPointScheduler",s:1});},false);
		$("#startSchedulerQuiz").addEventListener("click",function(){schedulerRunTask({c:"autoQuizScheduler",s:1});},false);
		$("#startSchedulerRaid").addEventListener("click",function(){schedulerRunTask({c:"autoRaidsScheduler",s:1,o:{f:true,n:true,d:true}});},false);
		$("#clearSchedulerRaid").addEventListener("click",function(){clearTeamState(_raidState);},false);
		$("#startSchedulerQuest").addEventListener("click",function(){schedulerRunTask({c:"autoQuestsScheduler",s:1,o:{r:true}});},false);
		$("#startSchedulerArena").addEventListener("click",function(){schedulerRunTask({c:"autoArenaScheduler",s:1});},false);
		$("#startSchedulerGuildQuest").addEventListener("click",function(){schedulerRunTask({c:"autoGuildQuestScheduler",s:1});},false);
		$("#clearSchedulerGuildQuest").addEventListener("click",function(){clearTeamState(_guildQuestState);},false);
		$("#startSchedulerGuildWelfare").addEventListener("click",function(){schedulerRunTask({c:"autoGuildWelfareScheduler",s:1});},false);
		$("#startSchedulerWage").addEventListener("click",function(){schedulerRunTask({c:"autoWageSystemScheduler",s:1});},false);
		$("#startSchedulerTournament").addEventListener("click",function(){schedulerRunTask({c:"autoTournamentScheduler",s:1});},false);
		$("#startSchedulerTournamentReward").addEventListener("click",function(){schedulerRunTask({c:"autoTournamentRewardScheduler",s:1});},false);
		$("#startSchedulerMailBox").addEventListener("click",function(){schedulerRunTask({c:"autoClearMailBoxScheduler",s:1});},false);
		$("#startSchedulerInventory").addEventListener("click",function(){schedulerRunTask({c:"autoClearInventoryScheduler",s:1});},false);
		$("#resetScheduler").addEventListener("click",function(e){_scheduler.needReset=true; schedulerTick();},false);
		$("#logScheduler").addEventListener("click",function(e){log(_scheduler);},false);
		
		$("#resetQuizQuestions").addEventListener("click",function(e){$("#quizQuestions").value= _quizQuestions.toSource();},false);
		$("#resetImagelessStyle").addEventListener("click",function(e){$("#imagelessStyle").value= _imagelessStyle;},false);
		
		$("#cancelButton").addEventListener("click",function(e){setOptions();hideOptionsPanel();},false);
		$("#applyButton").addEventListener("click",function(e){saveOptions();applyOptions();},false);
		$("#okButton").addEventListener("click",function(e){saveOptions();applyOptions();hideOptionsPanel();},false);
	}
}

function setOptions()
{
	if (_options)
	{
		for(var name in _options)
		{
			var el=$("#"+name);
			if (el) 
			{
				el[el.type=="radio"||el.type=="checkbox"?"checked":"value"]=el.getAttribute("eval")?_options[name].toSource():_options[name];
			}
		}
	}
}

function showOptionsPanel()
{
	var el=$("#optionsPanel");
	if (!el) 
	{
		createOptionsPanel();
		el=$("#optionsPanel");
	}
	el.style.display="";
}

function hideOptionsPanel()
{
	$("#optionsPanel").style.display="none";
}

var _options={};
function loadOptions()
{
	_options=getDataKey("options",{});
	//log(obj);
}

function saveOptions()
{
	var obj={};
	var arr=$a("#optionsPanelContent input, #optionsPanelContent select, #optionsPanelContent textarea");
	//log(arr.length);
	for(var num1=0;num1<arr.length;num1++) 
	{
		var el=arr[num1];
		obj[el.id]=el.type=="radio"||el.type=="checkbox"?el.checked:el.getAttribute("eval")?eval(el.value):el.value;
	}
	//log(obj);
	
	obj.serverTimeDelta=0;
	try
	{
		var num1=new Date().getTimezoneOffset();
		if (obj.serverTimeEST) num1+=-4*60;
		if (obj.serverTimeHKT) num1+=8*60;
		if (obj.serverTimeCustom) num1=parseInt(obj.serverTimeMinutes);
		obj.serverTimeDelta=num1*60*1000;
	}
	catch(ex){}
	
	setDataKey("options",obj);
	_options=obj;
}
/********************************************************************/
/*                         Ajax functions                           */
/********************************************************************/
function sendAjaxRequest(request)
{
	unsafeWindow.$.ajax({
		type:request.type,
		async:request.async,
		dataType:"html",
		url:request.url,
		data:request.data,
		error:function(xhr,msg){log(msg);},
		success:function(msg)
		{
			if (msg=="user_concurrent_failed") sendAjaxRequest(request);
			else
			{
				if (request.dataType=="json") msg=JSON.parse(msg);
				if (request.success) request.success(msg);
			}
		}});
}

/********************************************************************/
/*                         Action Point functions                   */
/********************************************************************/
function getActionPointState()
{
	// response=GM_xmlhttpRequest({
		// method: "GET",
		// synchronous: true,
		// url: "/scene/shop/buyacp.php?keepThis=true"});
	//log(response.responseText);
	var response=null;
	sendAjaxRequest({
		type:"GET",
		async:false,
		dataType:"html",
		url:"/scene/shop/buyacp.php?keepThis=true",
		error:function(xhr,msg){log(msg);},
		success:function(msg){response=msg}});
	//log(response);
	var text=/<div class="bag_con">\s*([\s\S]*?)\s*<\/div>/.exec(response)[1];
	var el=toHTML(text);
	//log(el);
	var arr=new Array();
	for(var num1=0;num1<el.rows.length;num1++)
	{
		var row=el.rows[num1];
		//log(row.innerHTML);
		var ap=/\d+/.exec(row.cells[1].textContent);
		if (ap) ap=parseInt(ap);
		var g=/(\d+)\s*Gold/.exec(row.cells[2].textContent);
		if (g) g=parseInt(g[1]);
		var dg=/(\d+)\s*Dragon Gold/.exec(row.cells[2].textContent);
		if (dg) dg=parseInt(dg[1]);
		var t=row.cells[3].textContent.trim();
		//log(t);
		t={"No Times":0,"Once only":1,"Twice only":2}[t];
		var id=row.cells[3].firstChild.getAttribute("onclick");
		//log(id);
		if (id) id=parseInt(/\d+/.exec(id));
		arr.push({id:id,ap:ap,g:g,dg:dg,t:t});
	}
	//log(arr);
	return arr;
}

function buyActionPoint(type)
{
	//http://kgs4.dc.gamedp.com/scene/shop/buyacp.php?keepThis=true&
	//http://kgs4.dc.gamedp.com/ajax/shop/buyAcp.ajax.php    t=1&usedragon=dragon
	//talert('Purchase successful!',1);showRealTimeMoney('-110000');showRealTimeAction('-5');
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"html",
		url:"/ajax/shop/buyAcp.ajax.php",
		data:"usedragon=dragon&t="+type,
		error:function(xhr,msg){log(msg);},
		success:function(msg)
		{
			msg=msg.trim();
			log(msg);
			setTimeout(unsafeWindow.eval,0,replaceSystemMessage(msg));
		}});
}

/********************************************************************/
/*                         Arenas functions                         */
/********************************************************************/
function setArenaInfo(text,time,callback)
{
	//log(text);
	$("#arenaInfo").innerHTML="<a href='javascript:void(0)' id='closeArenaInfo' title='close'>[X]</a> | Arena: <span id='arenaTimer'></span> "+text;
	$("#closeArenaInfo").addEventListener("click",closeArenaInfo,false);
	updateTimer(new Date().getTime(),time,"#arenaTimer",function(){closeArenaInfo(); if (callback) callback();});
}

function closeArenaInfo()
{
	$("#arenaInfo").innerHTML="";
}

function arenasEnter2(fr,d)
{
	fixShowTimeDownFunction(fr);
	var num=fr.lefttime;
	if (num>0) setArenaInfo("cool down",num);
	if (_options.autoArena) autoArena();
}

function playersEnter2(fr,d)
{
	removeElement($("#showPlayerIcoFlash",d));
	removeElement($("#showPlayerIcoFlash_2",d));
}

function arenaspkEnter2(fr,d)
{
	if (!$("#action_content",d))
	{
		if (_options.noFightAnimation) eliminateFightAnimation(fr,d);
		var num=fr.g_fightTime/4;
		var flag=$x1(".//a[contains(text(),'All-server Announcement')]",d)==null;
		var text="("+formatTime(num)+") ["+(flag?"D":"W")+"]";
		var el=$x1(".//span[@class='clears']",d);
		//log(el);
		//log(el.textContent);
		var text1=el.textContent.replace(/\s+/g," ");
		log(text1);
		var text1=text1.split(/\[.*?\]/)[1];
		//log(text1);
		var m=null;
		var num1=0;
		var r=/(\d+)(?: extra)? Honor Points/g
		while (m=r.exec(text1))
		{
			log(m);
			num1+=parseInt(m[1]);
		}
		text+=", Honor Points: "+num1;
		log(text);
		setArenaInfo(text,num);
		showSystemMessageBold((flag?"Defeated":"Victory")+", Honor Points: "+num1);
	}
}

function tradeHonorPoints(action,id)
{
	//action=acp, tradeid=1: lvl*15-->10 AP, 2: lvl*30-->20 AP
	//action=exp, tradeid=1: 200-->1000, 2: 1000-->5000, 3: 2000-->10000, 4: 4000-->20000
	//action=money, tradeid=1: 200-->1000, 2: 1000-->5000, 3: 4000-->20000, 4: 20000-->100000
	//action=magicdes, tradeid=1: 400-->50, 2: 800-->100, 3: 1600-->200, 4: 4000-->500
	//c=1: Lightless, 2: Splinter of LG, 3: Lesser LG, 4: LG, 5: Greater LG, 6: Regal LG, 7: Iridiscent LG, 8: Lustrous LG
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"html",
		url:"/ajax/shop/honorTrade.ajax.php",
		data:"action="+action+"&tradeid="+id,
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			//$('#honorpointid').html('524259'); $('#honoracp1').html('0'); showRealTimeAction('-10'); showSystemMsg('Congratulations, you have succeeded in exchanging [1350] Honor Points for [10] Action Points!');
			log(msg);
			setTimeout(getLastLoadedFrame().eval,0,replaceSystemMessage(msg));
		}});
}

function exchangeHonor(fr,d)
{
	var el=$x1(".//td[contains(div/text(),'Honor')]/following-sibling::td/span",d);
	var num1=parseInt(el.textContent);
	if (num1>=200)
	{
		var text="Exchange honor points: "+num1;
		log(text);
		showSystemMessageBold(text);
		var num2=getPlayerStatistics().player_lvl;
		if (num1>=num2*30) { tradeHonorPoints("acp",2); num1-=num2*30;}
		if (num1>=num2*15) { tradeHonorPoints("acp",1); num1-=num2*15;}
		// showSystemMessageBold("Convert "+(Math.floor(num1/200)*200)+" honor points into "+(Math.floor(num1/200)*1000)+" exp points");
		// while(num1>=4000) { tradeHonorPoints("exp",4); num1-=4000;}
		// while(num1>=2000) { tradeHonorPoints("exp",3); num1-=2000;}
		// while(num1>=1000) { tradeHonorPoints("exp",2); num1-=1000;}
		// while(num1>=200) { tradeHonorPoints("exp",1); num1-=200;}
		showSystemMessageBold("Convert "+(Math.floor(num1/400)*400)+" honor points into "+(Math.floor(num1/400)*50)+" magic debries");
		while(num1>=4000) { tradeHonorPoints("magicdes",4); num1-=4000;}
		while(num1>=1600) { tradeHonorPoints("magicdes",3); num1-=1600;}
		while(num1>=800) { tradeHonorPoints("magicdes",2); num1-=800;}
		while(num1>=400) { tradeHonorPoints("magicdes",1); num1-=400;}
	}
}

var _autoArenaTimeout=-1;
function autoArena()
{
	//log("auto arena");
	var num1=3;
	clearTimeout(_autoArenaTimeout);
	try{num1=autoArenaCore();}
	catch(ex){log(ex.message,ex.stack);}
	if (num1>-1) _autoArenaTimeout=setTimeout(autoArena,num1*1000);
}

function autoArenaCore()
{
	var num1=1;
	var fr=null;
	if (fr=getFrame("arenaspk"))
	{
		var d=fr.document;
		var el=$("#action_content",d);
		if (el)
		{
			//You are working in [XXX]... 
			//The target needs to wait more time before beginning another fight in the arena.
			//You have fought with this opponent for 5 times today, please take a rest and continue tomorrow!
			var text=el.textContent.trim();
			log(text);
			if (text.indexOf("You are working in")!=-1 || text.indexOf("In instance!")!=-1) num1=60;
			else fr.history.back();
		}
		else if (fr.g_fightTime)
		{
			//log("Setting to click the back button");
			num1=fr.g_fightTime/4;
			setTimeout(function(){
				var el=$x1(".//a[contains(text(),'Return to the Arena')]",d);
				//log(el);
				clickElement(el);},num1*1000);
		}
	}
	else if (fr=getFrame("arenas"))
	{
		var d=fr.document;
		var box=$("#TB_ajaxContent",d);
		if (box!=null)
		{
			var button=$x1(".//input[@value='Confirm']",box);
			if (button) clickElement(button);
		}
		else
		{
			var el=$x1(".//td[contains(div/text(),'Times Left')]/following-sibling::td/span",d);
			if (el)
			{
				var times=parseInt(el.textContent);
				log("Arena left times :"+times);
				if (times==0) num1=-2
				else
				{
					num1=Math.max(fr.lefttime,0);
					if (isNaN(num1)) num1=0;
					log("Cool down time: "+num1);
					if (num1==0)
					{
						num1=1;
						var row;
						var me=null;
						var rows=$x(".//tbody[contains(tr/th/text(),'Player')]//tr[position()>1]",5,d);
						var arr=new Array();
						while((row=rows.iterateNext())!=null)
						{
							var cells=row.getElementsByTagName("td");
							var pl=new Object();
							pl.rank=parseInt(cells[0].textContent.trim());
							pl.name=cells[1].textContent.trim();
							pl.level=parseInt(cells[2].textContent.trim());
							pl.class=cells[3].textContent.trim();
							pl.guild=cells[4].textContent.trim();
							pl.points=parseInt(cells[5].textContent.trim());
							pl.title=cells[6].textContent.trim();
							pl.challenge=cells[7];
							if (row.className=="hover") me=pl;
							else arr.push(pl);
							
							//log(pl.toSource());
						}
						//log(me,arr);
						//log(_options.arenaTargetFunction);
						var func=eval("(function(me,targets){"+_options.arenaTargetFunction+"})");
						//log(typeof(func),func.toSource());
						var target=func(me,arr);
						//log(target);
						if (target!=null) 
						{
							var text="Challenging: "+target.name+" "+target.level+" "+target.class;
							log(text);
							showSystemMessageBold(text,fr);
							setTimeout(clickElement,0,target.challenge.getElementsByTagName("a")[0]);
							//clickElement(target.challenge.getElementsByTagName("a")[0]);
							num1=3;
						}
					}
				}
			}
		}
	}
	return num1;
}

/********************************************************************/
/*                         Bank functions                           */
/********************************************************************/
function bankEnter2(fr,d)
{
	addSwitchInventoryOnDrag(fr,d);
	if (_options.enhanceBank)
	{
		var el=$("#bank_money_id",d);
		if (el!=null)
		{
			if (!$("#depositMax",d))
			{
				var money=getNumber("#player_money_attr");
				var num1=getNumber("#showbankmoney",d);
				var num2=getNumber("#bank_max",d);
				
				//log(num1,num2);
				
				var el1=$("#bankEquips",d).nextSibling.nextSibling;
				as(el1,{tag:"a",atts:{"class":"m_btn_black","onclick":"$('#bank_money_id')[0].value="+(Math.min(money,num2-num1))+";putBankMoney(1);"},html:"<span class='inm_btn_black'>Deposit max</span>"});
				as(el1,{tag:"a",atts:{"class":"m_btn_black","onclick":"$('#bank_money_id')[0].value="+num1+";putBankMoney(2);"},html:"<span class='inm_btn_black'>Withdraw all</span>"});
			}
		}
	}
}

function addSwitchInventoryOnDrag(fr,d)
{
	d.addEventListener("mousemove",function(e){switchInventoryOnDrag(e,fr,d);},false);
}

function switchInventoryOnDrag(e,fr,d)
{
	if (fr.g_iMouseDown==1)
	{
		var arr=["#ubag1","#ubag2","#ubag3","#userbank1","#userbank2","#userbank3"];
		for(var num1=0;num1<arr.length;num1++)
		{
			var el=$(arr[num1],d);
			if (el)
			{
				var flag=isInside(el,e.clientX,e.clientY);
				//log(flag);
				if (flag && el.className!="on") 
				{
					log("switching tab");
					clickElement(el.firstChild);
				}
			}
		}
	}
}

/********************************************************************/
/*                         Clear Inventory functions                */
/********************************************************************/
function addClearInventorButton(fr,d)
{
	$("#money",d).setAttribute("style","width:auto");
	Array.forEach($a(".batchbtn",d),function(el){el.setAttribute("style","margin:3px 0px");});
	var el=as($(".user_bags",d),{tag:"input",atts:{id:"clearInventor",type:"button",value:"Clear",class:"batchbtn",style:"margin:3px 0px;width:50px;"}});
	el.addEventListener("click",function(e){if (confirm("Clear inventory?")) clearInventory(e,fr,d);},false);
}

function clearInventory(e,fr,d)
{
	var func=function(index,item){return 0;};
	//log(_options.clearItemFunction);
	try{func=eval("(function(me,item){"+_options.clearItemFunction+"})");}
	catch(ex){log(ex.message,ex.stack);}
	//log(func);
	
	var data=fr.data;
	//log(data);
	if (!data)
	{
		data=new Array();
		for(var num1=0;num1<60;num1++)
		{
			var el=$("#DragContainer"+num1,d);
			//log(el);
			if (el)
			{
				var obj="";
				var el=el.children[0];
				//log(el);
				if (el) obj=el.id;
				data.push(obj);
			}
		}
		//log(data);
		
		var xdata=fr.xdata;
		for each(var obj in xdata)
		{
			//log(obj);
			if (obj.item_id)
			{
				var num1=data.indexOf(obj.item_id);
				if (num1!=-1) data[num1]=obj;
			}
		}
		//log(data);
	}
	data=convertStringToNumbers(data);
	
	//log(data);
	var arr=[[],[],[],[],[]];
	var stat=getPlayerStatistics();
	for(var num1=0;num1<data.length;num1++)
	{
		var obj=data[num1];
		//log(num1,obj);
		if (obj!="")
		{
			obj.index=num1+1;
			try
			{
				var num2=func(stat,obj);
				log(num2,obj);
				arr[num2].push(obj);
			}
			catch(ex){log(ex.message,ex.stack);}
		}
	}
	
	sellItems(arr[1]);
	log("Selling to market",arr[2]);
	decomposeItems(arr[3]);
	moveItemsToWarehouse(arr[4]);
	leaveInInventory(arr[0]);
	
	//log(fr.location.href);
	fr.location.reload();
}

function leaveInInventory(arr)
{
	log(arr);
	for(var num1=0;num1<arr.length;num1++)
	{
		var obj=arr[num1];
		if (obj.index!=num1+1) storeItem(obj.item_id,obj.index,num1+1);
	}
}

function sellItems(arr)
{
	//ii=9c18fc54d13d60c526e1553587e15aba|3ffec270d49c60aac6daf7859f378597|
	//http://kgs4.dc.gamedp.com/ajax/shop/batchSell.ajax.php
	log(arr);
	if (arr.length!=0)
	{
		var text=arr.map(function(i){return i.item_id}).join("|");
		log(text);
		sendAjaxRequest({
				type:"POST",
				async:false,
				dataType:"json",
				url:"/ajax/shop/batchSell.ajax.php",
				data:"ii="+text,
				error:function(xhr,msg){log(msg);},
				success:function(msg){
					//{"state":1,"reMsg":"showSystemMsg('Items sold successfully, and you obtained 0 gold');showRealTimeMoney('+0', '1');","reMsgSc":""}
					log(msg)
					setTimeout(getLastLoadedFrame().eval,0,msg.reMsg);
				}});
	}
}

function decomposeItems(arr)
{
	log(arr);
	for(var num1=0;num1<arr.length;num1++)
	{
		var obj=arr[num1];
		storeItem(obj.item_id,obj.index,400);
		sendAjaxRequest({
			type:"POST",
			async:false,
			dataType:"json",
			url:"/ajax/item/upgrade.ajax.php",
			data:"magicderisnum=0&magicstonenum=0&method=decom&usedragon=dragon&willcomproper=hp",
			error:function(xhr,msg){log(msg);},
			success:function(msg){
				//{"state":1,"reMsg":"showSystemMsg('Congratulations, you\\'ve removed the item successfully! You spent [16000] Gold and gained [8] magic debrises which can raise success rates of refining or be exchanged for items from mystic merchants');showRealTimeMoney('-16000', 1);showMagicDebrisNum('8', '1');"}
				log(msg)
				setTimeout(getLastLoadedFrame().eval,0,msg.reMsg);
			}});
	}
}

function moveItemsToWarehouse(arr)
{
	//ii=99357208c49d51e2d68da890e2fe19e2|6866509e50c954bd21a68212ef81f348|
	//http://kgs4.dc.gamedp.com/ajax/item/batchStroeBank.ajax.php
	log(arr);
	if (arr.length!=0)
	{
		var text=arr.map(function(i){return i.item_id}).join("|");
		log(text);
		sendAjaxRequest({
				type:"POST",
				async:false,
				dataType:"json",
				url:"/ajax/item/batchStroeBank.ajax.php",
				data:"ii="+text,
				error:function(xhr,msg){log(msg);},
				success:function(msg){
					//log(msg)
					//setTimeout(unsafeWindow.eval,0,msg.reMsg);
				}});
	}
}

/********************************************************************/
/*                         Chat functions                           */
/********************************************************************/
function chatEnter2(fr,d) 
{ 
	var text=fr.sendMsg.toSource().replace(/myFlasher\("flashchat"\)/gm,"g_flash_obj");
	//log(text);
	setTimeout(fr.eval,0,text);
	changeChat();
}

function changeChat()
{
	var fr=getFrame("chat");
	if (fr)
	{
		var d=fr.document;
		var el=$("#flashbox",d);
		var flag=!(el.disabled);
		log(_options.noChat+" "+flag);
		if (_options.noChat && flag) 
		{
			log("Disabling chat");
			el.disabled=true;
			el.innerHTML="";
			setTimeout(fr.eval,0,"g_flash_obj={flashSocketClose:function(){}, flashGetConnect:function(){}, flashSendMsg:function(){}};");
		}
		else if (!_options.noChat && !flag) 
		{
			log("Enabling chat");
			el.disabled=false;
			setTimeout(fr.eval,0,"new SWFObject(g_domainUrl+'js/flashsocket.swf', 'flashchat', '1', '1', '10').write('flashbox');g_flash_obj=null;setTimeout(flashReady,1000);");
		}
		Array.forEach($("#msg",d).parentNode.parentNode.getElementsByTagName("input"),function(i){i.disabled=_options.noChatButtons && _options.noChat});
	}
}
/********************************************************************/
/*                         City functions                           */
/********************************************************************/
var _lastCity=null;
function cityEnter2(fr,d) 
{ 
	_lastCity=parseInt(/c=(\d+)/.exec(fr.location.search)[1]); 
	addMissingServices(_lastCity,fr,d);
	setCurrentPosition(mappingCity(_lastCity));
	//setTimeout(updateAlwaysArena);
	if (_worldpath!=null) continueNavigate();
}

function addMissingServices(id,fr,d)
{
	var arr=["Weapon Store", "Armor Store", "Alchemy Store", "Trinket Store", "Gem Store", "Tavern", "Auction House", "Job Center", "Arena", "Market","Training Field"];
	var arr1=$a(".map_ico_c",d);
	//log(arr1);
	var arr2=Array.map(arr1,function(l){return l.textContent;});
	//log(arr2);
	var arr3=arr.filter(function(s){return arr2.indexOf(s)==-1;});
	//log(arr3);
	var el=$("#map_main",d);
	var num=170;
	for(var num1=0;num1<arr3.length;num1++)
	{
		var text=arr3[num1];
		//log(text);
		as(el,{tag:"div",atts:{class:"map_ico",style:"top:10px; left:"+num+"px"},childs:[{tag:"a",text:text,atts:{onclick:"g_topWindow.guideStepEnd();window.parent.tb_show('"+text+"','/scene/"+mapServiceUrl(text)+"c="+id+"&amp;keepThis=true&amp;TB_iframe=true&amp;modal=false&amp;height=579&amp;width=710&amp;modal=false&amp;TB_top_iframe=true','thickbox')", href:"javascript:void(0)", title:text, class:"map_ico_c"}},{tag:"span",atts:{class:"map_ico_r"}}]});
		num+=40+text.length*6;
	}
	
	var arr4=Array.filter(arr1,function(l){return l.textContent=="Market";});
	if (arr4.length!=0) arr4[0].setAttribute("onclick",arr4[0].getAttribute("onclick").replace("market.php","markets.php"));
}

function mappingCity(num)
{
	return {1:"Willshire Town", 2:"Parpamu Town", 3:"Glancer Town", 4:"Thunderclap Town", 5:"Cold Wind Manor", 6:"Starry Sentry", 7:"Wader Grotto", 8:"Glazed Isle", 9:"Final Battle Camp", 10:"Yaseen"}[num];
}

function mapServiceUrl(service)
{
	return {"Weapon Store":"shop/shop.php?s=weapon&amp;", "Armor Store":"shop/shop.php?s=armor&amp;", "Alchemy Store":"shop/shop.php?s=potion&amp;", "Trinket Store":"shop/shop.php?s=jewelry&amp;", "Gem Store":"shop/shop.php?s=gem&amp;", "Tavern":"city/tavern.php?", "Auction House":"market/auction.php?", "Job Center":"city/work.php?", "Arena":"city/arenas.php?", "Market":"market/markets.php?", "Training Field":"city/training.php?"}[service];
}

/********************************************************************/
/*                         Cultivation functions                    */
/********************************************************************/
function addCultivationControls(fr,d)
{
	var el=$("div.need",d);
	var text="";
	var arr=["Sta","Str","Agi","Int"];
	for(var num1=0;num1<4;num1++)
	{
		text+="<input type='checkbox' id='cult"+arr[num1]+"'/> <label for='cult"+arr[num1]+"'>"+arr[num1]+"</label> ";
	}
	text+="<br/>Times:<input type='text' id='cultTimes' size='3' value='5'/> <input type='button' id='startCultivation' value='Go'/>";
	as(el,{tag:"div",html:text});
	$("#startCultivation",d).addEventListener("click",function(e){var d=e.target.ownerDocument; setTimeout(startCultivation,0,d.defaultView,d);},false);
}

function startCultivation(fr,d)
{
	if (_autoCultivationTimeout!=-1) 
	{
		log("cultivation stopped");
		endCultivation(fr,d);
	}
	else
	{
		var times=parseInt($("#cultTimes",d).value);
		var atts=[$("#cultSta",d).checked,$("#cultStr",d).checked,$("#cultAgi",d).checked,$("#cultInt",d).checked];
		log(times,atts);
		if (times>0 && (atts[0] || atts[1] || atts[2] || atts[3])) 
		{
			$("#startCultivation",d).value="Stop";
			_autoCultivationTimeout=setTimeout(autoCultivation,0,times,atts);
		}
		else alert("Zero times or no attribute selected");
	}
}

var _autoCultivationTimeout=-1;
function autoCultivation(times,atts)
{
	clearTimeout(_autoCultivationTimeout);
	if (_autoCultivationTimeout!=-1)
	{
		var fr=getFrame("equip");
		if (fr)
		{
			d=fr.document;
			cultivation("reset",fr);
			var arr=getCultivationValues();
			//log(arr);
			var flag=true;
			for(var num2=0;num2<4;num2++)
			{
				if (arr[num2]<0 && atts[num2]) { flag=false; break; }
			}
			cultivation(flag?"replace":"remain",fr);
			if (flag)
			{
				arr=getCultivationValues();
				$("#new_property_sta",d).textContent=-arr[0];
				$("#new_property_str",d).textContent=-arr[1];
				$("#new_property_agi",d).textContent=-arr[2];
				$("#new_property_int",d).textContent=-arr[3];
			}
			times--;
			$("#cultTimes",d).value=times;
			if (times>0) _autoCultivationTimeout=setTimeout(autoCultivation,0,times,atts);
			else endCultivation(fr,d);
		}
	}
}

function endCultivation(fr,d)
{
	clearTimeout(_autoCultivationTimeout);
	_autoCultivationTimeout=-1;
	var el=$("#cultTimes",d);
	if (el.value=="0") el.value=5;
	$("#startCultivation",d).value="Go";
}

function cultivation(method,fr)
{
	//method=reset,replace,remain
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"json",
		url:"/ajax/player/washProperty.ajax.php",
		data:"method="+method,
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			log(msg);
			setTimeout(fr.eval,0,msg.reMsg);
		}});
}

function getCultivationValues()
{
	var stat=getPlayerStatistics();
	var arr=[stat.player_washstatmp_res,stat.player_washstrtmp_res,stat.player_washagitmp_res,stat.player_washinttmp_res,stat.all_wash_tmp];
	log(arr);
	return arr;
}

/********************************************************************/
/*                         Divine Daily functions                   */
/********************************************************************/
function getDivineDaily()
{
	var num=0;
	sendAjaxRequest({
		type:"GET",
		async:false,
		dataType:"html",
		url:"/scene/increase/draw.php",
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			//You have used up your divining chances, please come back tomorrow!
			//<div class="times"> Today's Divining Times:<strong>1</strong>.
			if (/Today's Divining Times:<strong>(\d+)<\/strong>/.test(msg)) 
			{
				num=parseInt(RegExp.$1);
				log(RegExp.lastMatch);
			}
			else if (/You have used up your divining chances, please come back tomorrow\!/.test(msg)) log(RegExp.lastMatch);
		}});
	if (num!=0)
	{
		sendAjaxRequest({
			type:"POST",
			async:false,
			dataType:"json",
			url:"/ajax/increase/draw.ajax.php",
			data:"name=cj",
			error:function(xhr,msg){log(msg);},
			success:function(msg){
				//{"state":1,"cm":6,"rm":6,"reMsg":"Congratulations, you have gained 2 hours' Exp Blessing","reMsgSc":"showRealTimeWishes('addition', '7200', '0');"}
				log(msg.reMsg)
				showSystemMessageBold(msg.reMsg);
				setTimeout(unsafeWindow.eval,0,msg.reMsgSc);
			}});
	}
}

/********************************************************************/
/*                         Daily Quests functions                   */
/********************************************************************/
function getDailyQuestsFiltered()
{
	var stat=getPlayerStatistics();
	var num1=10;
	try{num1=Math.max(0,parseInt(_options.dailyQuetsLevel));}
	catch(ex){log(ex.message,ex.stack);}
	return _dailyQuests.filter(function(q){return stat.player_lvl>=q.level && q.level>=stat.player_lvl-num1;});
}

function getDailyQuests(ap)
{
	var flag=false;
	var arr=getDailyQuestsFiltered();
	//log(arr);
	arr.sort(function(q1,q2){return (q2.exp/q2.quantity)-(q1.exp/q1.quantity)});
	log(arr);
	for(var num1=0;num1<arr.length;num1++)
	{
		log(ap);
		var q=arr[num1];
		log(q.name+" "+q.exp+" "+q.quantity+" "+(q.exp/q.quantity));
		if (ap>=q.quantity && questHandler(q.id).state==1)
		{
			flag=true;
			ap-=q.quantity;
			//if (ap<10) break;
		}
	}
	log(ap);
	return flag;
}

/********************************************************************/
/*                         Equip functions                          */
/********************************************************************/
function equipEnter2(fr,d)
{
	addClearInventorButton(fr,d);
	addCultivationControls(fr,d);
	addSwitchInventoryOnDrag(fr,d);
	removeElement($("#showPlayerIcoFlash",d));
	removeElement($("#showPlayerIcoFlash_2",d));
}

/********************************************************************/
/*                         Field Fight functions                    */
/********************************************************************/
var _fightId=0;
var _isFighting=false;
function setFightInfo(text,time,callback)
{
	_fightId++;
	_isFighting=true;
	$("#fightInfo").innerHTML="<a href='javascript:void(0)' id='closeFightInfo' title='close'>[X]</a> | Fight: <span id='fightTimer'></span> "+text;
	$("#closeFightInfo").addEventListener("click",closeFightInfo,false);
	updateTimer(new Date().getTime(),time,"#fightTimer",function(){_isFighting=false; closeFightInfo(); if (callback) callback();});
}

function closeFightInfo()
{
	$("#fightInfo").innerHTML="";
}

function fieldfightEnter2(fr,d)
{
	var el=null;
	var data=new Object();
	if (el=$("#action_content",d))
	{
		//http://kgs4.dc.gamedp.com/scene/fight/fieldfight.php?nohpbagfight=1&mons=101
		var text=el.textContent.trim();
		log(text);
		if (text.indexOf("have enough HP in your HP Pack")!=-1)
		{
			log("Refill hp pack");
			refillHpPack(0);
			el=$("input[value='Return']",d);
			if (el) clickElement(el);
		}
		else if (text.indexOf("No matching monsters are found in the area")!=-1)
		{
			log("Clicking on the same spot");
			closeFrame();
			clickMapOnPlayerPosition();
		}
	}
	
	if (fr.lefttime) 
	{	
		//log("no fighting animation");
		data.fightTime=fr.lefttime;
		data.defeatd=null;
		data.quests=null;
		el=$x1(".//div[@id='action_content' and contains(text(),'Fighting against')]",d);
		if (el) data.mobName=/\[(.*)\]/.exec(el.textContent)[1];
	}
	else if (fr.g_fightTime)
	{
		//log("fighting animation");
		if (_options.noFightAnimation) eliminateFightAnimation(fr,d);
		data.fightTime=fr.g_fightTime/4;
		data.defeated=$x1(".//a[contains(text(),'You are defeated!')]",d)!=null;
		var xp=$x(".//div[@class='quests']//text()",7,d);
		//log(xp.snapshotLength);
		if (xp.snapshotLength>1) 
		{
			data.quests=new Object();
			for(var num1=0;num1<xp.snapshotLength;num1+=2)
			{
				var text=xp.snapshotItem(num1).textContent.replace(" - ","");
				var arr=xp.snapshotItem(num1+1).textContent.split("|");
				var mobs=new Object();
				for each(var mob in arr)
				{
					//add log here!
					log(mob);
					var m=/([^:]*?):(\d+\/\s*\d+)/.exec(mob);
					if (m) mobs[m[1]]=m[2];
					else log("Pattern for mob not found!");
				}
				data.quests[text]=mobs;
			}
			//Array.map(quests,function(e){return e.textContent;});
		}
		el=$x1(".//a[contains(text(),'Continue searching')]",d);
		if (el) data.mobName=/\[(.*)\]/.exec(el.textContent)[1];
		el=$x1(".//div[@class='bloods' and last()]",d);
		
		 //,parseInt(/remaining HP:\s*(\d+)/.exec(el.textContent)[1])
		if (el!=null) setTimeout(refillHpPack,0,0);
		
		var num1=parseInt($("#fightCount").value);
		if (isFinite(num1) && num1!=0) 
		{
			$("#fightCount").value=(--num1);
		}
	}
	
	if (data.fightTime)
	{
		var text="("+formatTime(data.fightTime)+") ["+(data.defeated==null?"?":data.defeated?"D":"W")+"]";
		//log(text);
		if (data.quests) 
		{
			var num1=0;
			var arr=new Array();
			//log(data);
			for(var q in data.quests)
			{
				var quest=data.quests[q];
				//log(quest);
				var text1=quest[data.mobName];
				//log(text1);
				if (!text1)
				{
					//log("mob name different between quest and world");
					for(var mob in quest)
					{
						//log(mob);
						if (!text1) text1=quest[mob];
						else
						{
							//log("More than one mob in this quest");
							//can't get the first one
							//it could trigger an endlos loop
							text1="0/0";
							break;
						}
					}
					//log(text1);
				}
				//arr.push(q+":"+text1);
				arr.push("<span title='"+q+"'>"+text1+"</span>");
				var num2=Math.abs(eval(text1.replace("/","-")));
				if (num2>num1) num1=num2;
			}
			text+=" Q: "+arr.join(", ");
			if (_options.detectQuantity) $("#fightCount").value=num1;
		}

		log(text);
		setFightInfo(text,data.fightTime,function(){
			if (_options.autoField)
			{
				var num1=parseInt($("#fightCount").value);
				var flag=isNaN(num1) || num1!=0;
				var fr=getFrame("fieldfight");
				if (flag && fr)
				{
					_isFighting=true;
					if (el=$x1(".//a[contains(text(),'Continue searching')]",fr.document)) clickElement(el);
					else fr.location.reload();
				}
			}
		});
	}
}

function clickMapOnPlayerPosition()
{
	var f=getFrame("map");
	var d=f.document;
	var el1=$("#map_city",d);
	var el2=$("#pico",d);
	var offset=findPos(el2);
	log("width: "+el2.offsetWidth+", height: "+el2.offsetHeight+", map offset: "+offset[0]+", "+offset[1]);
	var x=offset[0]+20;
	var y=offset[1]+el2.offsetHeight-10;
	log("generating click event on player coordinate "+x+" "+y);
	clickElement(el1,x,y);
}

/********************************************************************/
/*                         Fight functions                          */
/********************************************************************/
function eliminateFightAnimation(fr,d)
{
	var x=$x(".//div[contains(@id,'fight')]",7,d);
	for(var num1=0;num1<x.snapshotLength;num1++) x.snapshotItem(num1).removeAttribute("style");
	fr.g_startTime=fr.g_fightTime;
	fr.g_monsterLine="";
	var el=$("#fightReportOut",d);
	if (el) el.scrollTop=el.scrollHeight;
	var s=fr.g_exportAll;
	for(var t in s) fr.showEveryOneStatus(t);
}

/********************************************************************/
/*                         Frames functions                         */
/********************************************************************/
var _frames=new Object();
var _sequence=new Array();
function getFrame(name)
{
	var f=_frames[name];
	if (f && !f.parent)
	{
		log("frame "+name+" has been removed");
		removeFrame(name);
		f=null;
	}
	//log("get frame "+name+": "+(f!=null));
	return f;
}

function setFrame(name,fr)
{
	_frames[name]=fr;
	_sequence.unshift(name);
	for(var key in _frames)
	{
		if (name!=key && _frames[key]==fr)
		{
			log("frame changed location from "+key+" to "+name);
			removeFrame(key);
		}
	}
}

function removeFrame(name)
{
	_frames[name]=null;
	_sequence.splice(_sequence.indexOf(name),1);
	delete _frames[name];
}

function getLastLoadedFrame()
{
	var fr=null;
	for(var num1=0;num1<_sequence.length;num1++)
	{
		var name=_sequence[num1];
		fr=_frames[name];
		if (fr) break;
		else
		{
			removeFrame(name);
			num1--;
		}
	}
	return fr||unsafeWindow;
}


function getOpenFrame(name)
{
	//log(unsafeWindow.frames.length);
	for(var num1=0;num1<unsafeWindow.frames.length;num1++)
	{
		var frame=unsafeWindow.frames[num1];
		//log(frame.document.location);
		//log(getLocationKey(frame)+" "+name)
		if (getLocationKey(frame)==name) return frame;
	}
	return null;
}

function getFrameState(name)
{
	var frame=getOpenFrame(name);
	//log(frame);
	return frame==null?0:frame.document.readyState!="complete"?1:2;
}

/********************************************************************/
/*                         Game Helper functions                    */
/********************************************************************/
function gamepartnerEnter2(fr,d)
{
	var el=$x1("//object",d);
	removeElement(el);
}

/********************************************************************/
/*                         Guild functions                          */
/********************************************************************/
function setGuildInfo(text,time,callback)
{
	//log(text);
	$("#guildInfo").innerHTML="<a href='javascript:void(0)' id='closeGuildInfo' title='close'>[X]</a> | Guild: <span id='guildTimer'></span> "+text;
	$("#closeGuildInfo").addEventListener("click",closeGuildInfo,false);
	if ($("#postNumen")) $("#postNumen").addEventListener("click",autoPostNumen,false);
	if (time) updateTimer(new Date().getTime(),time,"#guildTimer",function(){if (callback) callback();});
}

function closeGuildInfo()
{
	$("#guildInfo").innerHTML="";
}

function guildqlognpcEnter2(fr,d)
{
	as($(".g_topbtns",d),{tag:"a",atts:{class:"m_btn_confirm",href:"guildqlognpc.php",onclick:"location.reload();"},childs:[{tag:"span",text:"Refresh",atts:{class:"inm_btn_confirm m_w70"}}]});
	setGuildInfo("<a href='"+getNumenUrlAuto()+"' target='_blank'>Numens</a>: <span id='numenInfos'>Loading ...<span>");
	fr.addEventListener("unload",closeGuildInfo,false);
	setTimeout(function(){
		var nums=getNumens();
		$("#numenInfos").textContent=(nums.length!=0?nums.length-2:0);
		$("#numenInfos").setAttribute("title",nums.toSource());
	},0);
}

function guildqlognpcNodeInserted2(e,fr,d)
{
	var el=e.target;
	//log(el.parentNode.id);
	//log(e.target.parentNode.id+" "+e.target.innerHTML);
	if (el.parentNode.id=="TB_ajaxContent")
	{
		var text=el.textContent;
		//log(text);
		if (text.indexOf("Your cooldown hasn't been finished")!=-1)
		{
			if (el.getElementsByClassName)
			{
				var el1=el.getElementsByClassName("winxalert")[0];
				as(el1,{tag:"span",text:" "});
				var el2=as(el1,{tag:"a",atts:{href:"#",class:"m_btn_cancel"},html:"<span class='inm_btn_cancel m_w70'>Stop current action</span>"});
				el2.addEventListener("click",function(e){
					sendAjaxRequest({
						type:"GET",
						async:false,
						url:"/ajax/city/stopWork.ajax.php",
						error:function(xhr,msg){log(msg);},
						success:function(msg){
							setTimeout(log,0,msg);
							setTimeout(getLastLoadedFrame().eval,0,msg.reMsg);
							fr.location.reload();
					}});
				},false);
			}
		}
	}
	else if (el.parentNode.id=="TB_ajaxnpc")
	{
		var text=el.textContent;
		//log(text);
		if (/Exp \+(\d+)/.exec(text)) 
		{
			log("Earned experience: "+RegExp.$1);
			unsafeWindow.setTimeout(unsafeWindow.eval,0,"showRealTimeLvl('"+RegExp.$1+"', '1')");
		}
	}
}

var _numens=null;
var _questLevel=0;
function guildqfightEnter2(fr,d)
{
	log(d.referrer);
	if (d.referrer.indexOf("guildqfight")==-1)
	{
		_numens=getNumens();
		_questLevel=1;
		log("numen: ",_numens);
	}
	eliminateFightAnimation(fr,d);
	var num=fr.g_fightTime/4;
	var flag=$x1(".//strong[contains(text(),'Please select your numen')]",d)==null;
	var text="("+formatTime(num)+") ["+(flag?"D":"W")+"]";
	if (_options.guildHelper)
	{
		var numen=null;
		var el=$x1(".//div[@class='skillOut' and contains(text(),'Damage')]",d);
		if (el) 
		{
			numen=/(\w+) Damage/.exec(el.textContent)[1];
			log("This stage nummen: "+numen);
		}
		var text1=null;
		if ($x1(".//strong[contains(text(),'Please select your numen')]",d))
		{
			_questLevel=parseInt(/\d+/.exec($(".c_ffe40c",d).textContent)[0]);
			log("Current stage: "+_questLevel);
			if (numen) _numens[_questLevel]=numen;
			text1=_numens[_questLevel+1];
			log("Next stage numen is: "+text1);
			
			if (text1)
			{
				//shs1 fire, shs2 sea, shs3 storm, shs4 earth
				$({Fire:".shs1",Water:".shs2",Wind:".shs3",Earth:".shs4"}[text1],d).parentNode.setAttribute("style","background-color:red;");
			}
		}
		else 
		{
			_questLevel++;
			log("Current stage: "+_questLevel);
			_numens[_questLevel]=numen;
			autoPostNumen();
		}
		
		showSystemMessageBold((flag?"Defeated":"Victory")+", this stage ("+_questLevel+") numen was "+numen+" next stage numen is "+text1);
		
		text+=" <a href='"+_numensUrl+"' target='_blank'>Numens: </a> <span id='numenInfos' title='"+_numens.toSource()+"'>"+(_numens.length!=0?_numens.length-2:0)+"</span>";
		if (text1) text+=", Next stage numen is: "+text1;
		text+=", <a href='javascript:void(0)' id='postNumen'>Submit numens</a>";
	}
	log(text);
	setGuildInfo(text,num,function(){
		var el=$x1(".//a[contains(text(),'Return to the Arena')]",d);
		clickElement(el);});
}

function aidPlayer(pid,name)
{
	log("Aid player "+name+" ("+pid+")");
	sendAjaxRequest({
		type:"POST",
		async:false,
		url:"/ajax/guild/helpFire.ajax.php",
		data:"pid="+pid,
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			//{"state":1,"reMsg":"","reMsgSc":""}
			//{"state":0,"reMsg":"The player has been aided by someone else, please wait for next round!","reMsgSc":""}
			log(msg);
			var text=msg.state==1?"Player "+name+" ("+pid+") aided":msg.reMsg;
			log(text);
			showSystemMessage(text);
	}});
}


var _numensUrl=null;
function getNumenUrl(serverBacket)
{
	_numensUrl="http://www.dcallhelper.in/tools/dcallhelper/index.php?"+serverBacket;
	log(_numensUrl);
	return _numensUrl; 
}

//Numen refresh at 11 am
function getNumenUrlAuto()
{
	return getNumenUrl(getServerBracket());
}

function getServerBracket()
{
	return "server="+_options.server+"&bracket="+getBracket(getPlayerStatistics().player_lvl);
}

function getBracket(level)
{  
	var num=Math.floor(level/10)*10;
	return num+"-"+(num+9);
}

function getNumens()
{
	var result=new Array();
	try
	{
		response=GM_xmlhttpRequest({
			method: "GET",
			timeout: 10000,
			synchronous: true,
			url: getNumenUrlAuto()
		});
		//log(response.responseText);
		var match=/<form[\s\S]+?<\/form>/im.exec(response.responseText);
		
		if (match)
		{	
			var text=match[0];
			//log(text)
			var el=toHTML(text);
			//log(el);
			var arr=el.getElementsByClassName("MaxVotes");
			//log(arr);
			//log(arr.length);
		
			Array.forEach(arr,function(el1){
				var m=/Stage_(\w+)_(\d+)/i.exec(el1.id);
				//log(m);
				result[parseInt(m[2])]=m[1];});
		}
	}
	catch(ex){log(ex.message,ex.stack);}
	log(result);
	return result;
}

function autoPostNumen()
{
	postNumen(_numens,getPlayerStatistics().player_nickname);
}

function postNumen(numen,name)
{
	try
	{
		var text=getServerBracket()+"&btnSave=Submit+Votes&txtYourName="+encodeURIComponent(name);
		for(var num1=2;num1<11;num1++) text+="&ddlStage_"+num1+"="+(numen[num1]||"");
		log(text);
		var response=GM_xmlhttpRequest({
			method: "POST",
			synchronous: true,
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			url: "http://www.dcallhelper.in/tools/dcallhelper/index.php",
			data: text});
		//log(response.responseText);
	}
	catch(ex){log(ex.message,ex.stack);}
}

/********************************************************************/
/*                         Helper functions                         */
/********************************************************************/
function addHelper()
{
	var text1=$(".i_roleinfo_name").textContent.trim();
	//log(text1);
	asb({tag:"script",atts:{src:"http://localhost/SilverlightError.js",type:"text/javascript"}});
	asb({tag:"script",atts:{type:"text/javascript"},text:"var _onload;\nfunction onSilverlightLoad(s,e){if (_onload) _onload(s,e);}"});
	asb({tag:"object",atts:{id:"helper",data:"data:application/x-silverlight-2,",type:"application/x-silverlight-2",width:"1px",height:"1px",style:"position:absolute;right:0px;top:0px;visibility:hidden"},childs:[{tag:"param",atts:{name:"source",value:"http://localhost/Helper.xap"}},{tag:"param",atts:{name:"background",value:"white"}},{tag:"param",atts:{name:"minRuntimeVersion",value:"5.0.61118.0"}},{tag:"param",atts:{name:"initParams",value:"LogFilePathFormat={0:yyyy_MM}/{0:yyyy_MM_dd}_"+text1+".txt,ReceiverName="+text1}},{tag:"param",atts:{name:"enableHtmlAccess",value:"true"}},{tag:"param",atts:{name:"onLoad",value:"onSilverlightLoad"}},{tag:"param",atts:{name:"onError",value:"onSilverlightError"}}]});
	unsafeWindow._onload=initHelper;
}

var _comm;
var _logger;
function initHelper()
{
	var cont=XPCNativeWrapper.unwrap(document.getElementById("helper")).Content;
	//log("Content", cont);
	if (!cont) setTimeout(initHelper,100);
	else
	{
		//log("init Helper");
		_logger=cont.Logger;
		log("Logger is active: "+_logger.IsActive);
		_comm=cont.Communicator;
		log("Communicator is active: "+_comm.IsActive);
		log("Communicator is master: "+_comm.IsMaster);
		log("Communicator receiver name: "+_comm.ReceiverName);
		log("Communicator sender names: "+_comm.SenderNames);
		//_comm.MessageReceived=messageReceived;
		//_comm.SendCompleted=sendCompleted;
		_comm.ScriptablePropertyChanged=propertyChanged;
		unsafeWindow._onload=null;
		if (!_comm.IsActive) setTimeout(changeCommName,0);
	}
}

function clearLogs()
{
	if (_logger) _logger.ClearLogs();
}

function changeCommName()
{
	if (!_comm.IsActive)
	{
		var m=/(\w+)(\d*)/.exec(_comm.ReceiverName);
		log(m);
		var num1=m[2]?parseInt(m[2])+1:1;
		_comm.ReceiverName=m[1]+num1;
		setTimeout(changeCommName,100);
	}
}

function propertyChanged(sender, e)
{
	var val="";
	try{ val=e.Value; }
	catch(ex){ val="["+ex.message+"]"; }
	log("propertyChanged: _comm."+e.PropertyName+"="+val);
}

function sendCommMessage(message)
{
	if (_comm) _comm.Send(message);
}

// var _messageReceivedListeners=new Array();
// function messageReceived(s,e)
// {
	// for(var num1=0;num1<_messageReceivedListeners.length;num1++) _messageReceivedListeners[num1](s,e);
// }

// var _sendCompletedListeners=new Array();
// function sendCompleted(s,e)
// {
	// for(var num1=0;num1<_sendCompletedListeners.length;num1++) _sendCompletedListeners[num1](s,e);
// }

/********************************************************************/
/*                         Hp Pack functions                        */
/********************************************************************/
function refillHpPack(hp)
{
	var stat=getPlayerStatistics();
	if (!hp) hp=stat.maxhp;
	//var text=_options.hppacklevel.replace(/hp/g,hpPack);
	//log(text);
	var num1=stat.player_curhpbag-parseInt(hp);
	log("actual hp in bag "+stat.player_curhpbag+" - required hp in bag "+hp+" = "+num1);
	if (num1<0)
	{
		var num2=mapHpPack(_options.hpquantity);
		var num3=getNumber("#player_money_attr");
		var num4=Math.min(Math.ceil(-num1/num2),Math.floor(num3/(num2/2)))
		//log(num2,num3,num4);
		for (var num5=0;num5<num4;num5++)
		{
			/*$('#playerhpbag').html( '30344' );showRealTimeMoney('-1500');showSystemMsg('Congratulations, You\'ve spent 1500 Gold to buy 3000 HP Pack!');*/
			sendAjaxRequest({
				type:"POST",
				async:true,
				url:"/ajax/player/hpBag.ajax.php",
				data:"action=buyformoney&state="+_options.hpquantity,
				error:function(xhr,msg){log(msg);},
				success:function(msg){
					setTimeout(log,0,msg);
					var text=replaceSystemMessage(msg,true);
					setTimeout(unsafeWindow.eval,0,text);
			}});
		}	
	}
}

function mapHpPack(index)
{
	//id     hp    gold
	//1    3000    1500
	//2   15000    7500
	//3   30000   15000
	//4  150000   75000
	//5  600000  300000
	//6 3000000 1500000
	return {1:3000,2:15000,3:30000,4:150000,5:600000,6:3000000}[index];
}

/********************************************************************/
/*                         Imageless functions                      */
/********************************************************************/
function changeImageless()
{
	imagelessStyle(unsafeWindow);
	for(var key in _frames)
	{
		var fr=getFrame(key);
		if (fr) imagelessStyle(fr);
	}
}

function imagelessStyle(fr)
{
	//log("Adding imageless style to "+fr.document.location);
	var doc=fr.document;
	var el=doc.getElementById("imglss");
	removeElement(el);
	if (_options.imageless) as(doc.getElementsByTagName("head")[0],{tag:"style",atts:{id:"imglss"},text:_options.imagelessStyle});
}

/********************************************************************/
/*                         Mails functions                          */
/********************************************************************/
function mailsEnter2(fr,d)
{
	addClearInventorButton(fr,d);
	addSwitchInventoryOnDrag(fr,d);
}

function mailsNodeInserted2(e,fr,d)
{
	//log(e.target.parentNode.id);
	if (e.target.parentNode.id=="DragContainer900")
	{
		var obj1=fr.data.filter(function(i){return i!="" && i.item_id==e.target.id;})[0];
		//log(obj1);
		$("#mail_charge",d).value=obj1.item_price>0?1:0;
	}
}

function mailNodeInserted2(e,fr,d)
{
	//log(e.target.parentNode.id);
	if (e.target.className=="mail_bj")
	{
		//log(e.target.lastChild);
		el=as(e.target.lastChild,{tag:"a",atts:{class:"m_btn_confirm_s"},childs:[{tag:"span",text:"Clear",atts:{class:"inm_btn_confirm_s"}}]},true);
		el.addEventListener("click",autoClearMailBox,false);
		$("#chkAll",d).setAttribute("onclick","var arr=document.querySelectorAll(\"input[type='checkbox']\"); for(var num1=0;num1<arr.length;num1++) arr[num1].checked=this.checked");
	}
}

function autoClearMailBox()
{
	var state=clearMailBox();
	if (state<0) setTimeout(autoClearMailBox,-state*1000)
}

function clearMailBox()
{
	var state=-1
	var fr=getFrame("mail");
	var d=fr.document;
	var el=$(".on",d);
	var text=el.textContent.trim();
	var num1=parseInt(/Total (\d+) Mail/.exec($(".mail_bj",d).textContent)[1]);
	log("Emails in mailbox "+text+": "+num1);
	if (!_options["mailbox"+text] || num1==0) 
	{
		el=$x1(".//li[@class='on']/following-sibling::li/a",d);
		if (el) clickElement(el);
		else state=2;
	}
	else
	{
		if (el=$x1(".//a[not(@style) and span[contains(text(),'Receive All')]]",d)) 
		{
			var el1=el.parentNode.parentNode.previousSibling.getElementsByTagName("p")[0];
			if (!el1) el1=el.parentNode.parentNode.previousSibling.getElementsByTagName("span")[0];
			if (el1) log(el1.textContent);
		}
		else if (el=$x1(".//a[not(@style) and span[contains(text(),'Claim Item')]]",d)) 
		{
			var text=getStyleValue(el.parentNode.parentNode.previousSibling.getElementsByClassName("DragBox")[0],"background-image");
			if (text!="none") 
			{
				var arr=text.split("/");
				log("Claim: "+/(.+)\./.exec(arr[arr.length-1])[1]);
			}
		}
		else if (el=$x1(".//a[not(@style) and span[contains(text(),'Return Letter')]]",d)) log("Return Letter");
		else if (el=$x1(".//div[@id='TB_ajaxContent']//input[@value='Confirm']",d)) log("Confirm");
		else if (el=$x1(".//div[@class='mail_bj']/img[contains(@src,'checkUnCheck')]",d)) log("Check all emails");
		else if (el=$x1(".//a[span[contains(text(),'Delete after selling')]]",d))
		{
			var snap=$x(".//table[@class='mail_bd_tb']//tr",7,d);
			for(var num2=0;num2<snap.snapshotLength;num2++)
			{
				var el1=snap.snapshotItem(num2);
				var text1=el1.getElementsByClassName("mail_td3")[0].children[0].textContent.trim();
				var text2=el1.getElementsByClassName("mail_td3")[0].children[1].textContent.trim();
				var text3=el1.getElementsByClassName("mail_title_con")[0].textContent.trim();
				log("Deleting mail of "+text2+" from "+text1+": "+text3);
			}
		}
		if (el) 
		{
			//log("Click "+el.textContent);
			clickElement(el);
		}
	}
	return state;
}

/********************************************************************/
/*                         Main functions                           */
/********************************************************************/
var _mainNodeInserted=true;
function mainNodeInserted(e)
{
	if (_mainNodeInserted)
	{
		_mainNodeInserted=false;
		var el=e.target;
		if (el.className=="selectbtn")
		{
			var sel=el.previousSibling;
			if (sel.getAttribute("noreplace")!=null)
			{
				sel.removeAttribute("style");
				removeElement(el);
			}
		}
		if (el.textContent=="Town" && el.tagName!="A") changeTownButton(el)
		_mainNodeInserted=true;
	}
}

function changeTownButton(el)
{
	el=el||$("#map_menu_link2");
	el.title="Go to town";
	el.innerHTML="<a href=\"javascript:void(0);\" id=\"goToTown\">Town</a>";
	$("#goToTown").addEventListener("click",function(){navigateToTown()},false);
}

function mainReceiveMessage(e)
{
	log("Enter "+e.data);
	var key=e.data;
	var fr=XPCNativeWrapper.unwrap(e.source);
	var d=fr.document;
	imagelessStyle(fr);
	as(d.getElementsByTagName("head")[0],{tag:"style",text:_fixMainStyle});
	//override style with important doesn't work must remove class
	var arr=$a(".unselect",d);
	//log("unselct elements "+arr.length);
	for(var num1=0;num1<arr.length;num1++) arr[num1].className=arr[num1].className.replace("unselect","");
	
	setFrame(key,fr);
	fr.addEventListener("unload",function(e){
		//log("reload/exit "+key);
		//log("closing frame "+data.source+": "+(e.source.parent==null));
		setTimeout(function(name,fr)
		{
			//log("Parent frame of "+name+" is null: "+(frame.parent==null));
			var flag=fr.parent==null;
			log((flag?"Exit":"Reload")+" "+name);
			if (flag) removeFrame(name);
		},100,key,fr);
	},false);
	
	var func=getFunction(key+"Enter2");
	if (func) 
	{
		try{func(fr,d);}
		catch(ex){log(ex.message,ex.stack);}
	}
	var func=getFunction(key+"NodeInserted2");
	if (func) fr.document.addEventListener("DOMNodeInserted",function(e){try{func(e,fr,d);}catch(ex){log(ex.message,ex.stack);}},false);
}

function closeFrame()
{
	var el=null;
	while(el=$("#TB_closeWindowButton")) clickElement(el);
	while(el=$(".menu_close3")) clickElement(el);
}

var _timers={};
function updateTimer(start,time,selector,callback)
{
	var id=_timers[selector];
	if (id) clearTimeout(id);
	var num1=Math.max(0,Math.round(time-(new Date().getTime()-start)/1000));
	var el=$(selector);
	if (el) el.textContent=formatTime(num1);
	if (num1>0) _timers[selector]=setTimeout(updateTimer,250,start,time,selector,callback);
	else if (callback) callback();
}

function mappingLand(num)
{
	return {1:"Willshire", 3:"Glancer", 5:"Breeze Vale", 6:"Pandar Prairie", 7:"Parpamu", 8:"Thunderclap", 9:"Orcmu", 10:"Orclar", 11:"Unliving Desert", 12:"Crystal Coast", 13:"Orcter", 14:"Disarn",15:"Dusk Plain"}[num];
}

/********************************************************************/
/*                         Map functions                            */
/********************************************************************/
function mapEnter2(fr,d) 
{ 
	var map=fr.document.title;
	map=map.substring(0,map.length-11);
	setCurrentPosition(mappingMap(map));
	if (_worldpath!=null) continueNavigate();
	enhanceMap(fr,d);
}

function enhanceMap(fr,d)
{
	var el1=$("#map_timetips",d);
	//log("enhanceMap: "+el1);
	var el2=as(el1.nextSibling,{tag:"a",atts:{class:"m_btn1"},html:"<span class='inm_btn1'> Gold </span>"},true);
	el2.addEventListener("click",getMapPlayerMoney,false);
	var el3=el1.parentNode.getElementsByTagName("h3")[0];
	el3.textContent="Players";
	el3.style.width="80px";
}

function mapNodeInserted2(e,fr,d)
{
	if (e.target.parentNode.id=="ext_mst")
	{
		//log(e.target.innerHTML);
	}
}

function getMapPlayerMoney()
{
	var fr=null;
	if (fr=getFrame("map"))
	{
		var d=fr.document;
		var list=$("#ext_player",d).getElementsByTagName("span");
		//log(list.length);
		for(var num1=0;num1<list.length;num1++)
		{
			var span=list[num1];
			var name=/(.+?)\(/.exec(span.textContent)[1];
			//log(name);
			var handler=function(span,name){return function(msg)
			{
				var data=new RegExp(name.replace(/[\[\]]/g,"\\$&")+"</a></td><td>(.*?)</td><td>(.*?)</td>").exec(msg);
				//setTimeout(log,0,name);
				//setTimeout(log,0,data!=null?data:msg);
				if (data!=null) as(span,{tag:"span",text:"("+data[2]+")"});
				//else log(name+"\n"+msg);
			};}(span,name);
			setTimeout(sendRequest,0,{type:"POST",async:true,url: "/scene/player/rank.php?o=m&scr=1&inner=true&smoo=true&postdata=search%3D"+name,data:"search="+name,success:handler});
		}
	}
}

function mappingMap(map)
{
	var text={"Parpamu Suburb Map":"Parpamu", "Breeze vale":"Breeze Vale"}[map];
	return typeof(text)!="undefined"?text:map;
}

/********************************************************************/
/*                         Mapuserlist functions                    */
/********************************************************************/
function mapuserlistEnter2(fr,d)
{
	as($("#formid",d),{tag:"input",atts:{id:"getAllData",type:"button",value:"Get all data"}});
	as($("#formid",d),{tag:"span",atts:{id:"getAllDataPage"}});
	$("#getAllData",d).addEventListener("click",function(e){_allPlayerData=new Array(); getAllPlayerData(1);},false);
}

var _allPlayerData=new Array();
function getAllPlayerData(page)
{
	$("#getAllDataPage").textContent=page;
	sendAjaxRequest({
		type:"POST",
		async:true,
		dataType:"json",
		url: "/ajax/map/showMapUserList.ajax.php",
		data:"page="+page,
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			var el=toHTML("<table>"+msg.reMsg.mapUserZone+"</table>");
			for(var num1=1;num1<el.rows.length;num1++)
			{
				var row=el.rows[num1];
				var obj=new Object();
				obj.job=row.cells[0].textContent;
				obj.id=parseInt(/p=(\d+)/.exec(row.cells[1].children[0].href)[1]);
				obj.name=row.cells[1].textContent;
				obj.level=parseInt(row.cells[2].textContent);
				obj.online=row.cells[3].children[0].src.indexOf("map_online_2.gif")!=-1;
				obj.intown=row.cells[3].textContent.indexOf("town")!=-1;
				obj.guild=row.cells[4].textContent;
				_allPlayerData.push(obj);
			}
			if (page<10) getAllPlayerData(++page);
			else log(_allPlayerData);
		}});
}

/********************************************************************/
/*                         Markets functions                        */
/********************************************************************/
function marketsEnter2(fr,d)
{
	addClearInventorButton(fr,d);
	if (_options.marketHelper) enhanceMarkets(fr,d);
}

function marketsNodeInserted2(e,fr,d)
{
	if (_options.marketHelper)
	{
		//log(e.target.parentNode.id);
		if (e.target.parentNode.id=="DragContainer900")
		{
			var obj1=fr.data.filter(function(i){return i!="" && i.item_id==e.target.id;})[0];
			//log(obj1);
			var arr=_options.marketPrices[obj1.item_name];
			//log(arr);
			if (typeof(arr)!="undefined") setTimeout(setMarketPrices,0,arr[0],arr[1]);
		}
	}
}

function enhanceMarkets(fr,d)
{
	var el=$("#ac_sprice",d);
	//log(el);
	if (el!=null)
	{
		var sel=$("#minPrice1",d);
		if (sel==null)
		{
			sel=as(el.parentNode,{tag:"select",atts:{id:"minPrice1"}});
			sel.add(new Option("1.0"));
			sel.add(new Option("1.5"));
			sel.add(new Option("2.0"));
			sel.add(new Option("2.5"));
			sel.add(new Option("3.0"));
			sel.add(new Option("3.5"));
			sel.add(new Option("4.0"));
			sel.add(new Option("4.5"));
			sel.add(new Option("5.0"));

			el.parentNode.appendChild(document.createTextNode("x"));
			
			sel=as(el.parentNode,{tag:"select",atts:{id:"minPrice2"}});
			sel.add(new Option("100","100"));
			sel.add(new Option("1'000","1000"));
			sel.add(new Option("10'000","10000"));
			sel.add(new Option("100'000","100000"));
			sel.add(new Option("1'000'000","1000000"));
			sel.add(new Option("10'000'000","10000000"));
			
			sel=as($("#ac_price",d).parentNode,{tag:"select",atts:{id:"maxPrice"}});
			sel.add(new Option("x1","1"));
			sel.add(new Option("x1.5","1.5"));
			sel.add(new Option("x2","2"));
			sel.add(new Option("x2.5","2.5"));
			sel.add(new Option("x3","3"));
			sel.add(new Option("x3.5","3.5"));
			sel.add(new Option("x4","4"));
			sel.add(new Option("x4.5","4.5"));
			sel.add(new Option("x5","5"));
			sel.selectedIndex=sel.options.length-1;
			
			watchSelect({selector:"#minPrice1",doc:d,index:-1,callback:setPrices});
			watchSelect({selector:"#minPrice2",doc:d,index:-1,callback:setPrices});
			watchSelect({selector:"#maxPrice",doc:d,index:-1,callback:setPrices});
		}
	}
}

function setPrices()
{
	var fr=getFrame("markets");
	if (fr)
	{
		var d=fr.document;
		var min=getSelectedValue("#minPrice1",d)*getSelectedValue("#minPrice2",d);
		var mul=getSelectedValue("#maxPrice",d);
		//log(min+", "+mul);
		setMarketPrices(min,min*mul);
	}
}

function setMarketPrices(min,max)
{
	var fr=getFrame("markets");
	if (fr)
	{
		var d=fr.document;
		$("#ac_sprice",d).value=min;
		$("#ac_price",d).value=max;
		setTimeout(fr.eval,0,"getSellCost()");
	}
}

/********************************************************************/
/*                         Mercenary functions                      */
/********************************************************************/
function addRaidQuests(name)
{	
	var arr=_raidInfos.filter(function(r){return r.name==name;});
	//log(arr);
	if (arr.length==0) closeMercenaryHelper();
	else
	{
		//var quests=arr[0].quests;
		$("#mercenaryHelper").innerHTML="<a href='javascript:void(0)' id='closeMercenaryHelper' title='close'>[X]</a> | <a href='javascript:void(0)' id='startQuest' title='start'>S&rarr;</a><select id='quest'><option value='-1'>All "+name+" Quests</option></select><a href='javascript:void(0)' id='finishQuest' title='finish'>&rarr;F</a>";
		var el=$("#quest");
		var quests=_raidDailyQuests.filter(function(q){return q.raid==arr[0].id;});
		//log(quests.toSource());
		arr=new Array();
		for(var num1=0;num1<quests.length;num1++)
		{	
			var q=quests[num1];
			arr.push(q.id);
			el.add(new Option(q.name,"["+q.id+"]"));
		}
		el.options[0].value=arr.toSource();
		$("#closeMercenaryHelper").addEventListener("click",function(e){closeMercenaryHelper();},false);
		$("#startQuest").addEventListener("click",function(e){questsHandler(JSON.parse(getSelectedValue("#quest")));},false);
		$("#finishQuest").addEventListener("click",function(e){questsHandler(JSON.parse(getSelectedValue("#quest")),true);},false);
	}
}

function closeMercenaryHelper()
{
	$("#mercenaryHelper").innerHTML="";
}

function mercenaryEnter2(fr,d) 
{ 
	watchSelect({selector:"#raidid",doc:d,index:-1,callback:raidIndexChanged}); 
	fr.addEventListener("unload",closeMercenaryHelper,false);
}

function raidshopEnter2(fr,d)
{
	addClearInventorButton(fr,d);
	watchSelect({selector:"#worktime",doc:d,index:-1,callback:raidIndexChanged});
	var msg=getRaidState();
	var text=/<p[\s\S]*?<\/p>/.exec(msg.reMsg);
	as($(".raidshop_npc",d),{tag:"div",html:text});
	fr.addEventListener("unload",closeMercenaryHelper,false);
}

function mercenaryplayersEnter2(fr,d)
{
	removeElement($("#showPlayerIcoFlash",d));
	removeElement($("#showPlayerIcoFlash_2",d));
}

var _raidTimesData={instances:0,freeInstances:0};
function mercenaryNodeInserted2(e,fr,d)
{
	var el=e.target;
	
	//log(el.id,el.parentNode.id,el.innerHTML);
	//log(el.tagName);
	
	//Todo: add and options to remove flash animations
	if (el.tagName=="OBJECT") 
	{
		removeElement(el);
		return;
	}
	
	switch(el.parentNode.id)
	{
		case "mmarketButtonArea":
			//log(el.textContent);
			if (el.textContent.indexOf("Today your remaining times")!=-1)
			{
				//log(el.textContent);
				var arr=el.getElementsByTagName("strong");
				_raidTimesData.instances=arr.length>0?parseInt(arr[0].textContent):0;
				_raidTimesData.freeInstances=arr.length>1?parseInt(arr[1].textContent):0;
				//log(arr.length);
				log(_raidTimesData.instances+", "+_raidTimesData.freeInstances);
			}
			if (el.textContent=="Enter Instance" && _options.emptyTeam)
			{
				var text=el.getAttribute("onclick");
				if (text)
				{
					text="if (document.querySelectorAll('.m_table.raid_table tr').length==4 || "+(_options.emptyTeamAlert?"alert":"confirm")+"('The team is not complete!')) "+text;
					el.setAttribute("onclick",text);
				}
			}
			var arr=el.getElementsByClassName("raid_fb");
			if (arr.length!=0)
			{
				var arr=arr[0].getElementsByClassName("m_fcyellow");
				if (arr.length!=0) 
				{
					var text=arr[0].textContent.trim();
					addRaidQuests(text);
				}
			}
			break;
		case "mmarket_block_area":
			//log("mercenaries found");
			var paths=$x(".//a[contains(em/text(),'Hire')]",7,el);
			for(var num1=0;num1<paths.snapshotLength;num1++)
			{
				var el1=paths.snapshotItem(num1);
				//log(el1);
				var id=/'(\d+)'/.exec(el1.getAttribute("onclick"))[1];
				//log(id);
				el1=as(el1.parentNode,{tag:"a",atts:{href:"javascript:void(0)",class:"m_btn_cancel_s"},html:"<em class='inm_btn_cancel_s'> Hack </em>"});
				el1.addEventListener("click",function(id){return function(e){hackPassword(id);}}(id),false);
				var arr=el1.parentNode.getElementsByTagName("a");
				for (var num1=0;num1<arr.length;num1++)
				{
					arr[num1].setAttribute("style","vertical-align:top; margin:0px;");
				}
			}
			break;
		case "TB_ajaxContent":
			//log("TB_ajaxContent");
			//log(_mercenaryData);
			var el1=$("#m_money",d);
			if (el1!=null) 
			{
				//log("money found");
				el1.value=_options.mercenaryCommission;
				
				el1=$("input[value='Confirm']",d);
				if (el1) el1.value="Submit";
			}
			el1=$("#mmarket_password",d);
			if (el1!=null) 
			{
				//log("password found");
				el1.value=_options.mercenaryPassword;
			}
			if (_options.selectRaid)
			{
				//Doing first the free instance
				var num1=fr.g_playerLvl;
				var num2=0
				if (_raidTimesData.freeInstances!=0) num2=20;
				else
				{
					try{num2=Math.max(0,parseInt(_options.instanceLevel));}
					catch(ex){}
				}
				//log("Player level "+num1+", level modifier "+num2);
				num1-=num2;
				var arr=_raidInfos.filter(function(r){return r.level<=num1;});
				//log(arr);
				arr.sort(function(r1,r2){return r2.level-r1.level;});
				var obj=arr.length!=0?arr[0]:null;
				//log(obj);
				el1=$("#m_raid",d);
				if (el1!=null)
				{
					//log("raid select found");
					watchSelect({selector:"#m_raid",doc:d,index:-1,callback:raidIndexChanged});
					if (obj!=null) setSelectedOption(el1,obj.name);
				}
				el1=$("#team_raid",d);
				if (el1!=null)
				{
					//log("raid select found");
					watchSelect({selector:"#team_raid",doc:d,index:-1,callback:raidIndexChanged});
					if (obj!=null) setSelectedOption(el1,obj.name);
				}
			}
			break;
		// default:
			// log(el.parentNode.id+"->"+el.id+"\n"+el.innerHTML);
			// break;
	}
}

function raidIndexChanged(el)
{
	var op=getSelectedOption(el);
	//log(op.value,op.text);
	addRaidQuests(op.text);
	var arr=_raidInfos.filter(function(r){return r.name==op.text;});
	if (arr.length!=0)
	{
		var doc=el.ownerDocument;
		var obj=arr[0];
		var player=getPlayerStatistics();
		var flag=obj.level+20<=player.player_lvl && _raidTimesData.freeInstances!=0;
		var el=null;
		if (el=$("#m_fotnum",doc)) setSelectedOption(el,flag?"Use Free":"1time(s)");
		else if ((el=$("#team_fotnum",doc))!=null) setSelectedOption(el,flag?"Use":"Don’t use");
	}
}

function hackPassword(mid,pw)
{
	var pws=eval(_options.hackPasswords).slice();
	if (_options.mercenaryPassword) pws.unshift(_options.mercenaryPassword);
	
	//log(pws);
	if (!pw && pws.length!=0) pw=pws[0];
	//log(pw);
	var pw1=null;
	var num1=pws.indexOf(pw)+1;
	if (num1!=0 && num1<pws.length) pw1=pws[num1];
	
	sendAjaxRequest({
		type:"POST",
		async:true,
		dataType:"json",
		url: "/ajax/team/hireMercenary.ajax.php",
		data:{"mid":mid, "mpwdvalue":pw},
		success:function(id,npw){
					return function(msg){
						log(msg);
						var fr=getFrame("mercenary");
						if (fr)
						{
							var text=replaceSystemMessage(msg.reMsg);
							setTimeout(fr.eval,0,text);
							//log(id+" "+npw+" "+msg.reMsg);
							if (msg.reMsg.indexOf("Please enter the correct password!")!=-1) 
							{
								if (npw==null) fr.setTimeout("alert('Password not found')");
								else hackPassword(id,npw);
							}
							else if (msg.reMsg.indexOf("The level gap between")!=-1) fr.setTimeout(msg.reMsg);
							else if (msg.reMsg.indexOf("Successfully hired")!=-1) 
							{
								fr.setTimeout(msg.reMsg);
								var text="Password was "+pw;
								log(text);
								showSystemMessageBold(text);
							}
						}
					}
				}(mid,pw1)
		});
}


/********************************************************************/
/*                         Navigation functions                     */
/********************************************************************/
var _position="";
function setCurrentPosition(pos)
{
	_position=pos;
	var select=$("#goto");
	for(var num1=0;num1<select.options.length;num1++)
	{
		var o=select.options[num1];
		//log(o.value);
		if (o.value==pos)
		{
			select.selectedIndex=num1;
			//log(select.selectedIndex);
			break;
		}
	}
}

var _worldpath=null;
function navigateTo(target)
{
	if (target==_position) return;
	_worldpath=findWorldPath(_position,target);
	//log(path);
	if (_worldpath!=null) continueNavigate();
}

function navigateToTown()
{
	var text=getCityNameInLand(_position);
	log(_position+" "+text);
	if (typeof(text)!="undefined") navigateTo(text);
}

var _navigateTimeout=-1;
function continueNavigate()
{
	clearTimeout(_navigateTimeout);
	//log("continueNavigate: "+_position);
	try
	{
		if (_position)
		{
			var flag=false;
			for each(var step in _worldpath)
			{
				//log(step);
				if (step[0]==_position) 
				{
					flag=true;
					var fr=null;
					//log(getFrame("map"));
					//log(getFrame("city"));
					if (!!(fr=getFrame("map"))) navigateToIcon(step[1],fr,fr.document);
					if (!!(fr=getFrame("city"))) navigateToIcon(step[1],fr,fr.document);
					flag=true;
					break;
				}
			}
			//log(flag);
			if (!flag) _worldpath=null;
		}
	}catch(ex){log(ex.message,ex.stack);}
	if (_worldpath) _navigateTimeout=setTimeout(continueNavigate,1000);
}

function navigateToIcon(icon,fr,d)
{
	var divs=$a(".map_ico_c",d);
	//log("divs: "+divs);
	if (divs)
	{
		var el=Array.filter(divs,function(e){return e.textContent==icon;});
		//log("el: "+el.length);
		if (el.length==0) log("Can't find location "+icon);
		else
		{
			el=el[0];
			var xy=findPos(el);
			clickElement(el,xy[0],xy[1]);
		}
	}
}

function findWorldPath(start,end)
{
	var arr1=[];
	var arr2=[[start]];
	var solution=null;
	//log(start,end);
	while(solution==null && arr2.length!=0)
	{
		var arr3=[];
		for each(var arr4 in arr2)
		{
			//log("arr4 "+arr4.toSource());
			var loc=_mapSystem[arr4[arr4.length-1]];
			//log("loc "+loc);
			for(var exit in loc)
			{
				//log("exit "+exit);
				if (arr1.indexOf(exit)==-1)
				{
					arr1.push(exit);
					var arr5=arr4.slice(0);
					arr5.push(exit);
					//log("arr5 "+arr5.toSource());
					if (exit==end) { solution=arr5; break;}
					arr3.push(arr5);
				}
			}
			if (solution!=null) break;
		}
		arr2=arr3;
		//log(arr2);
	}
	
	arr2=[];
	if (solution==null) log("No path found");
	else
	{
		for(var num1=1;num1<solution.length;num1++)
		{
			var temp1=solution[num1-1];
			var temp2=solution[num1];
			arr2.push([temp1,_mapSystem[temp1][temp2]]);
		}
	}
	return arr2;
}

function getCityNameInLand(land)
{
	return {"Willshire":"Willshire Town", "Parpamu":"Parpamu Town", "Glancer":"Glancer Town", "Breeze Vale":"Glancer Town", "Thunderclap":"Thunderclap Town", "Pandar Prairie":"Thunderclap Town", "Orcmu":"Cold Wind Manor", "Orclar":"Starry Sentry", "Unliving Desert":"Wader Grotto", "Crystal Coast":"Glazed Isle", "Orcter":"Final Battle Camp", "Disarn":"Yaseen","Dusk Plain":"Yaseen"}[land];
}

/********************************************************************/
/*                         Player functions                         */
/********************************************************************/
function getPlayerStatistics()
{
	var obj1=null;
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"json",
		url: "/ajax/player/statAttr.ajax.php",
		data:"",
		error:function(xhr,msg){log(msg);},
		success:function(msg){ obj1=convertStringToNumbers(msg);}});
	//log(obj1);
	return obj1;
}

function getPlayerAttributes()
{
	var obj1=null;
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"json",
		url: "/ajax/player/getUserNewAttr.ajax.php",
		data:"randId="+Math.random(),
		error:function(xhr,msg){log(msg);},
		success:function(msg){ obj1=convertStringToNumbers(msg);  /*obj1=eval("("+msg.toSource().replace(/"(\d+)"/g,"$1")+")"); log(obj1);*/ }});
	return obj1;
}

function getRaidState()
{
	var obj1=null;
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"json",
		url: "/ajax/team/showButtonArea.ajax.php",
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			//{"state":1,"reMsg":"<p class=\"pd10\">Today your remaining times to challenge instances: <strong class=\"m_fcyellow\"> 3 <\/strong>  normal instance time(s)and <strong class=\"m_fcyellow\"> 1 <\/strong>  free instance time(s) <a href='javascript:void(0);' class='m_btn_confirm_s' onclick='buyAllowNum();'><span class='inm_btn_confirm_s m_w55'> Purchase Times <\/span><\/a><\/p><p class=\"pd10\">You need to create or join a team before entering an instance.<\/p><div class=\"raid_bbtns\"><a href=\"javascript:void(0);\" class=\"raid_btn_create\" onclick=\"createRaidTeam();\" >Create Team<\/a><a href=\"javascript:void(0);\" class=\"raid_btn_bemercenary\" onclick=\"goEmOption();\" >To be a Mercenary<\/a><\/div>","reMsgSc":{"raidid":0,"nexttime":75350}}
			obj1=msg;
			obj1.raids=[0,0];
			var el=toHTML(msg.reMsg,true);
			var arr=el.getElementsByClassName("m_fcyellow");
			for(var num1=0;num1<arr.length;num1++) obj1.raids[num1]=parseInt(arr[num1].textContent);
		}});
	return obj1;
}

function getDoneLeftRaids(level)
{
	var obj={};
	//get raid state
	var arr1=getRaidState();
	//checking in the wage system how many raid it has already done
	var arr2=getWageSystemInfos();
	obj.freeLeft=arr1.raids[1];
	obj.freeDone=(level>49?1:0)-obj.freeLeft;
	obj.normalLeft=Math.max(3-arr2[0].done+obj.freeDone,0);
	obj.normalDone=3-obj.normalLeft;
	obj.extraDone=arr2[0].done-obj.normalDone-obj.freeDone;
	obj.extraLeft=-obj.extraDone;
	if (_options.extraThursdayInstance && getServerDate().getDay()==4) obj.extraLeft++;
	try{obj.extraLeft+=parseInt(_options.dailyInstance);}
	catch(ex){log(ex.message,ex.stack);}
	obj.totalLeft=obj.freeLeft+obj.normalLeft+obj.extraLeft;
	obj.totalDone=obj.freeDone+obj.normalDone+obj.extraDone;
	//num1++; //correcting to do one more per day
	log("from wage already done raids: "+arr2[0].done+", today done and left raids: ",obj);
	return obj;
}

/********************************************************************/
/*                         Quest functions                          */
/********************************************************************/
function questEnter2(f,d)
{
	var el=$(".m_txt_right",d);
	as(el,{tag:"a",atts:{id:"clearAll",class:"m_btn_cancel_s"},childs:[{tag:"span",text:"Cancel All",atts:{class:"inm_btn_cancel_s"}}]},false).addEventListener("click",function(e){if (confirm("Are you sure?")) cancelAllQuests(e);},false);
	as(el,{tag:"a",atts:{id:"completeAll",class:"m_btn_confirm_s"},childs:[{tag:"span",text:"Finish All",atts:{class:"inm_btn_confirm_s"}}]},false).addEventListener("click",function(e){finishAllQuests(e);},false);
}

function questNodeInserted2(e,f,d)
{
	//log(e.target.parentNode.id,e.target.tagName);
	if (e.target.tagName=="DIV") addStartButtonToQuests(e.target,f);
}

function addStartButtonToQuests(el,f)
{
	//log(el.innerHTML);
	var arr=el.getElementsByTagName("tr");
	//log(arr.length);
	for(var num1=0;num1<arr.length;num1++)
	{
		var el2=arr[num1];
		//log(el2.textContent);
		if (el2.cells.length>1)
		{
			var m1=/Lv\.(\d+)/.exec(el2.cells[0].textContent);
			//log(el2.innerHTML);
			var m2=/(.*?)\s*\((Instance)?\s*Daily\s*(Instance)?\)/.exec(el2.cells[1].textContent);
			//log(m1,m2);
			if (m1 && m2)
			{
				var text=m2[1].replace(/\s+/," ");
				var arr1=(m2[2]!=null||m2[3]!=null?_raidDailyQuests:_dailyQuests).filter(function(q){return q.level==m1[1] && q.name==text;})
				if (arr1.length!=0)
				{
					//log(arr1[0].toSource());
					var el3=as(el2.cells[3],{tag:"a",html:"<span class='inm_btn_cancel_s'>Start</span>",atts:{id:"id"+arr1[0].id,href:"javascript:void(0);",class:"m_btn_cancel_s"}});
					//log(el3);
					var handler=function(id){return function(e){questHandler([id]);f.location.reload();}}(arr1[0].id);
					el3.addEventListener("click",handler,false);
				}
			}
		}
	}
}

function cancelAllQuests(e)
{
	var arr=getPlayerQuests();
	log(arr);
	for(var num1=0;num1<arr.length;num1++) 
	{
		var obj1=arr[num1];
		log(obj1);
		if (obj1.state=="In Progress") cancelQuest(obj1.m,obj1.l,1);
	}
	var f=getFrame("quest");
	if (f) f.location.reload();
}

function finishAllQuests(e)
{
	var arr=getPlayerQuests();
	log(arr);
	for(var num1=0;num1<arr.length;num1++) 
	{
		var obj1=arr[num1];
		log(obj1);
		if (obj1.state=="Completed") questHandler(obj1.m,true);
	}
	var f=getFrame("quest");
	if (f) f.location.reload();
}

function getPlayerQuests()
{
	var arr=new Array();
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"html",
		url: "/scene/quest/quest.php",
		data:"",
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			//log(msg);
			var m=null;
			var reg=/<li id="quest(\d+)"[\s\S]*?\[(.*?)\][\s\S]*?showFullQInfo\('\1', '(\d+)'\)"> (.*?) <\/a>/gm;
			while((m=reg.exec(msg))) 
			{
				//log(m);
				arr.push({m:parseInt(m[1]),l:parseInt(m[3]),name:m[4],state:m[2],daily:m[4].toLowerCase().indexOf("daily")!=-1,instance:m[4].toLowerCase().indexOf("instance")!=-1});
			}
		}});
	//log(data);
	return arr;
}

function getQuestDetails(quest)
{
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"html",
		url: "/ajax/quest/getFullQInfo.ajax.php",
		data:"m="+quest.m+"&l="+quest.l,
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			//log(msg);
			quest.allowed=true;
			quest.tasks=new Array();
			var arr1=toHTML(msg,true).getElementsByTagName("table")[0].getElementsByTagName("tr");
			for(var num1=0;num1<arr1.length;num1++)
			{
				var obj=new Object();
				//log(arr1[num1].innerHTML);
				var arr2=arr1[num1].getElementsByTagName("td");
				obj.type=arr2[0].childNodes[0].textContent.trim();
				obj.quantity=parseInt(arr2[0].children[0].children[0].textContent);
				obj.monster=arr2[0].children[0].childNodes[1].textContent.trim();
				obj.progress=arr2[1].textContent.trim();
				obj.progress2=obj.progress=="Completed"?1:eval(obj.progress);
				obj.allowed=(quest.daily && _options.autoQuestDaily) || (obj.type=="Kill" && _options.autoQuestKill) || (obj.type!="Kill" && _options.autoQuestOther);
				var text1=arr2[2].children[0].getAttribute("onclick");
				var m1=/questGoToPos\('((\d+)_(\d+)_(\d+)_monster_(\d+))'\)/gm.exec(text1);
				if (m1)
				{
					obj.monsterid=m1[1];
					obj.monsterdata={n1:parseInt(m1[2]),n2:parseInt(m1[3]),n3:parseInt(m1[4]),id:parseInt(m1[5])};
				}
				quest.tasks.push(obj);
				quest.allowed&=obj.allowed;
			}
			quest.quantity=0;
			quest.tasks.forEach(function(t){quest.quantity+=Math.round(t.quantity*(1-t.progress2));});
		}});
	return quest;
	//log(quest);
}

function cancelQuest(quest,lid,type)
{
	log("Canceling quest "+quest+" id "+lid);
	//http://kgs4.dc.gamedp.com/ajax/quest/celQuest.ajax.php
	var result=null;
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"html",
		url: "/ajax/quest/celQuest.ajax.php",
		data:"q="+quest+"&lid="+lid+"&type="+type,
		error:function(xhr,msg){log(msg);},
		success:function(msg){}});
	return result;
}

function questHandler(quest,getReward)
{
	//http://kgs4.dc.gamedp.com/ajax/quest/getQuest.ajax.php
	//http://kgs4.dc.gamedp.com/ajax/quest/getQuestReward.ajax.php
	var result=null;
	sendAjaxRequest({
		type:"POST",
		async:false,
		dataType:"html",
		url: "/ajax/quest/getQuest"+(getReward?"Reward":"")+".ajax.php",
		data:"q="+quest,
		error:function(xhr,msg){log(msg);},
		success:function(msg){
			//({state:1, reMsg:"showSystemMsg('[Doomsday of the Gory Guardians (Daily)]The quest has been completed and the rewards have been given!');reQuestGuild();showRealTimeMoney('104705', '1');showRealTimeLvl('21922', '1');showRealTimeGold('gift', -0);showRealTimeQuest('806', '8127');getRewardSuccess('<span style=\\'color:#ffd100\\'>Gold  104705</span> <span style=\\'color:#0099ff\\'>Exp  21922</span>');", reMsgSc:[]})
			log(msg);
			if (msg=="user_concurrent_failed") result=questHandler(quest,getReward);
			else
			{
				result=JSON.parse(msg);
				//var text=replaceSystemMessage(result.reMsg).replace("getRewardSuccess","void");
				var text=replaceSystemMessage(result.reMsg).replace(/getRewardSuccess\('.*?(Gold\s+\d+).*?(Exp\s+\d+).*?'\);/,"showSystemMsg('Reward: [$1] [$2]');");
				log(text);
				//log(getLastLoadedFrame().document.location.href);
				setTimeout(getLastLoadedFrame().eval,0,text);
			}
		}});
	return result;
}

function questsHandler(quests,getReward)
{
	var arr=new Array();
	for(var num1=0;num1<quests.length;num1++) 
	{
		var num2=quests[num1];
		log("getting quest "+num2);
		var obj=questHandler(num2,getReward);
		obj.id=num2;
		arr.push(obj);
	}
	return arr;
}

var _startPosition=null;
function autoQuests()
{
	var state=0;
	if (!_startPosition) _startPosition=_position;
	try{state=executeQuests();}
	catch(ex){log(ex.message,ex.stack);}
	if (state<0) setTimeout(autoQuests,-state*1000);
	else
	{
		log("autoquest ended go back to "+_startPosition);
		navigateTo(_startPosition);
		_startPosition=null;
	}
}

var _currentQuest=null;
var _executeQuestsAntiStick=0;
var _executeQuestsState=0;
function executeQuests()
{
	var state=-1;
	switch(_executeQuestsState)
	{
		//Get next quest
		case 0:
			var stat=getPlayerStatistics();
			var arr=getPlayerQuests();
			log(arr);
			for(var num1=arr.length-1;num1>-1;num1--)
			{
				var obj1=arr[num1];
				if (obj1.state=="Completed") 
				{
					var flag=obj1.instance || (obj1.daily && _options.autoQuestDaily) || getQuestDetails(obj1).allowed;
					log("Quest completed is instance or allowed type: "+flag);
					if (flag) questHandler(obj1.m,true);
				}
				else if (obj1.state=="In Progress" && !obj1.instance) 
				{
					try
					{
						getQuestDetails(obj1);
						log(obj1);
						var flag1=obj1.allowed;
						var flag2=stat.acpoints>=obj1.quantity;
						log("can do type: "+flag1+", enough ap: "+flag2);
						if (flag1 && flag2)
						{
							_currentQuest=obj1;
							_lastAP=stat.acpoints;
							break;
						}
					}catch(ex){log(ex.message,ex.stack);}
				}
			}
			//no more quest finish it;
			if (!_currentQuest) state=2;
			else _executeQuestsState=1;
			break;
		//finding mob and starting fight
		case 1:
			var el=null;
			var flag=false;
			//for item collecting quest the details aren't updated during the quest, the whole quest list must be reloaded
			if (_currentQuest.type!="Kill") getPlayerQuests();
			getQuestDetails(_currentQuest);
			for(var num2=0;num2<_currentQuest.tasks.length;num2++)
			{
				var obj1=_currentQuest.tasks[num2];
				log("task "+(num2+1)+"/"+_currentQuest.tasks.length+": ",obj1);
				if (obj1.progress2<1) 
				{
					flag=true;
					var text=mappingLand(obj1.monsterdata.n1);
					//log(obj1.monsterdata.n1,text);
					if (text!=_position) 
					{
						navigateTo(text);
						state=-3;
					}
					else
					{
						var fr=null;
						if (fr=getFrame("map"))
						{
							var d=fr.document;
							el=$x1(".//a[contains(@onclick,'mons="+obj1.monsterdata.id+"')]",d);
							log("is fighting "+_isFighting);
							log("monster fighting icon "+(el!=null));
							if (!el) 
							{
								var el1=$("#map_city",d);
								var el2=$("#map_img_bgr",d);
								var x=obj1.monsterdata.n2*58;
								var y=obj1.monsterdata.n3*50;
								log("monster position "+x+" "+y);
								var offset=findPos(el2);
								log("map offset "+offset[0]+" "+offset[1]);
								x+=offset[0];
								y+=offset[1];
								log("generating click event on coordinate "+x+" "+y);
								clickElement(el1,x,y);
							}
							else
							{
								log("click fighting icon");
								clickElement(el);
								_executeQuestsState=2;
							}
						}
					}
					break;
				}
			}
			if (!flag)
			{
				_currentQuest=null;
				closeFrame();
				_executeQuestsState=0;
			}
			_executeQuestsAntiStick=0;
			break;
		//wait for fight to start
		case 2:
			if (_isFighting) _executeQuestsState=3;
			else if (++_executeQuestsAntiStick%10==0)
			{
				log("Fight is taking too long to start, reseting it");
				_executeQuestsAntiStick=0;
				_executeQuestsState=1;
			}
			break;
		//wait for fight to end
		case 3:
			if (!_isFighting) _executeQuestsState=1;
			else if (++_executeQuestsAntiStick%60==0)
			{
				log("Fight is taking too long to finish ... going on");
				_executeQuestsAntiStick=0;
				_executeQuestsState=1;
			}
			break;
		default:
			_executeQuestsState=0;
			break;
	}
	return state;
}
/********************************************************************/
/*                         Quiz functions                           */
/********************************************************************/		
function initQuizHelper()
{
	var el=$("#quizHelper");
	el.innerHTML="Q in DB: "+_options.quizQuestions.length+" | <a href='http://www.google.com/search?q=' target='_blank' id='googleQuizQuestion'>Google it</a> | <span id='quizAnswers'></span>";
}

function closeQuizHelper()
{
	var el=$("#quizHelper");
	el.innerHTML="";
}

function updateQuizHelper(question)
{
	$("#quizAnswers").textContent=question.A.join(", ");
	$("#googleQuizQuestion").href="http://www.google.com/search?q="+encodeURIComponent("\""+question.Q+"\"");
}
				
function quizEnter2(fr,d)
{
	initQuizHelper();
	_options.quizQuestions.sort(function(q1,q2){return q1.Q>q2.Q?1:q1.Q<q2.Q?-1:0;});
	fr.addEventListener("unload",function()
	{
		closeQuizHelper();
		$("#quizQuestions").value=_options.quizQuestions.toSource();
		saveOptions();
	},false);
}

function showSystemMessageBold(message,fr)
{
	showSystemMessage("["+(message.replace(/\[/gm,"{").replace(/\]/gm,"}"))+"]",fr)
}

function showSystemMessage(message,fr)
{
	//log(message);
	var arr=[fr,getLastLoadedFrame(),unsafeWindow];
	for(var num1=0;num1<arr.length;num1++)
	{
		var f=arr[num1];
		// if (f) 
		// {
			// log(f.document.location);
			// log(f.showSystemMsg);
		// }
		if (f && f.showSystemMsg) 
		{
			//log("function found");
			setTimeout(f.showSystemMsg,0,message);
			break;
		}
	}
}

var _question;
function quizNodeInserted2(e,fr,d)
{
	//log(e.target.parentNode.id,e.target.textContent);
	//log(e.target.innerHTML);
	switch(e.target.parentNode.id)
	{
		case "seriesokBox":
			var text=getQuizState(fr,d);
			log(text);
			showSystemMessageBold(text,fr);
			break;
		case "quizBox":
			//log("quizBox "+e.target.tagName);
			switch(e.target.tagName)
			{
				case "DT":
					var text1=e.target.textContent.trim();
					var num1=parseInt(/\d+/.exec(text1));
					text1=text1.substring(text1.indexOf(".")+1).trim();
					log(num1+" "+text1);
					var arr=_options.quizQuestions.filter(function(q){return q.Q==text1;});
					if (arr.length!=0) _question=arr[0];
					else
					{
						_question={Q:text1,A:[]};
						_options.quizQuestions.push(_question);
					}
					log(_question);
					updateQuizHelper(_question);
					break;
				case "DD":
					try
					{
						var text=getAnswerText(e.target);
						//log(_question.A.indexOf(text)+" "+text);
						if (_question.A.indexOf(text)!=-1) 
						{
							e.target.setAttribute("style","background-color:blue");
							var i=e.target.getElementsByTagName("input");
							if (i.length!=0) 
							{
								i[0].checked=true;
								setTimeout(function(el){el.click();},100,i[0]);
							}
						}
					}
					catch(ex){log(ex.message,ex.stack);}
			}
			break;
		case "judge":
			//log(text3);
			var box=$("#quizBox",e.target.ownerDocument);
			if (!box) 
			{
				log("Box not found?!?");
				log(e.target.innerHTML);
			}
			if (box)
			{
				//log(box);
				var text3=$x1(".//param[@name='movie']/@value",e.target).value;
				var flag1=text3.indexOf("right.swf")!=-1;
				var flag2=text3.indexOf("wrong.swf")!=-1;
				if (flag1 || flag2)
				{
					log("Answer was correct: "+flag1);
					var check=flag1?
								function(el){return el.getElementsByTagName("input")[0].checked;}:
								function(el){return getStyleValue(el,"color")!="";};
					setTimeout(function(){
							var arr=box.getElementsByTagName("dd");
							//log(arr.length);
							for(var num1=0;num1<arr.length;num1++)
							{
								var el=arr[num1];
								var flag1=check(el);
								var text1=getAnswerText(el);
								var num2=_question.A.indexOf(text1);
								var flag2=num2!=-1;
								log(num1+" "+flag1+" "+flag2+" "+text1);
								if (flag1 && !flag2) 
								{
									log("Correct answer missing, adding it");
									_question.A.push(text1);
								}
								else if (!flag1 && flag2) 
								{
									log("Wrong answer contained, removing it");
									_question.A.splice(num2,1);
								}
							}
							_question=null;},100);
				}
				break;
			}
	}
}

function getQuizState(fr,d)
{
	var text1=$("#rankBox",d).textContent;
	var text2=$("#pointBox",d).textContent;
	var text3=$("#rightCountBox",d).textContent;
	var text4=$("#seriesokBox",d).textContent;
	var text5=$("#remainTimer",d).textContent;
	return "rank: "+text1+", point: "+text2+", right: "+text3+", combo: "+text4+", timer:"+text5;
}

function getAnswerText(el)
{
	var text=el.getElementsByTagName("label")[0].textContent;
	text=text.substring(text.indexOf(". ")+1).trim();
	//log(text);
	return text;
}

/********************************************************************/
/*                         Raid functions                           */
/********************************************************************/
function setRaidMessage(message)
{
	if (message==null) closeRaidHelper();
	else
	{
		$("#raidHelper").innerHTML="<a href='javascript:void(0)' id='closeRaidHelper' title='close'>[X]</a> | Raid: "+message;
		$("#closeRaidHelper").addEventListener("click",function(e){closeRaidHelper();},false);
	}
}

function closeRaidHelper()
{
	$("#raidHelper").innerHTML="";
}

function viewraidfightEnter2(fr,d)
{
	if (_options.noFightAnimation) eliminateFightAnimation(fr,d);
	
	//var fr2=getFrame("raid");
	//if (fr2) setTimeout(refillHpPack,0,getTeamHp(fr2,fr2.document).tothp);

	// var el=$x1(".//div[@class='bloods' and last()]",d);
	// if (el!=null) setTimeout(refillHpPack,0,parseInt(/remaining HP:\s*(\d+)/.exec(el.textContent)[1]));

	var num=fr.g_fightTime/4;
	var flag=$x1(".//a[contains(text(),'Challenged successfully')]",d)!=null;
	var text="("+formatTime(num)+") ["+(flag?"W":"D")+"]";
	setFightInfo(text,num*0.85,function(){
		if (_options.autoRaid)
		{
			var fr=getFrame("viewraidfight");
			if (fr) 
			{
				var el=$x1(".//a[contains(text(),'ack to Instance!')]",fr.document);
				log("back to instance link "+el);
				clickElement(el);
			}
		}
	});
}

function getTeamHp(fr,d)
{
	var num=0;
	var flag=true;
	var arr=new Array();
	var x=$x(".//li[contains(@id,'playerhp')]/div",7,d);
	//log(x.snapshotLength);
	for(var num1=0;num1<x.snapshotLength;num1++)
	{
		var el=x.snapshotItem(num1);
		var m=/(\d+)\/(\d+)/.exec(el.textContent);
		var obj1={p:eval(m[0]),c:parseInt(m[1]),t:parseInt(m[2])};
		arr.push(obj1);
		num+=obj1.t;
		flag&=(obj1.p==1);
	}
	var obj1={tothp:num,full:flag,party:arr};
	log(obj1);
	return obj1;
}

function raidEnter2(fr,d) 
{
	//raidPathToString(getDataKey("raidPath"));
	//log(getDataKey("raidPath"));
	//setTimeout(refillHpPack,0,getTeamHp(fr,fr.document).tothp);
	_autoraidTimeout=setTimeout(autoRaid,0);
}

var _autoraidTimeout=-1;
function autoRaid()
{
	clearTimeout(_autoraidTimeout);
	var fr=getFrame("raid");
	if (fr)
	{
		var num=250;
		try
		{
			var d=fr.document;
			raidInfos(fr,d);
			if (_options.autoRaid)
			{
				if (!handleRaidMessages(fr,d)) navigateRaid(fr,d);
				else num=1000;
				//else log("can't go on ... something is blocking");
			}
		}
		catch(ex){log(ex.message,ex.stack);}
		//log("reloading after: "+num);
		_autoraidTimeout=setTimeout(autoRaid,num);
	}
}

function raidInfos(fr,d)
{
	var events=fr.g_spaceEventArr;
	//log(events);
	if (events && events.length!=0)
	{
		for(var key in events)
		{
			var el=$("#space"+key,d);
			//log(el);
			if (el!=null) 
			{ 
				el=el.getElementsByTagName("img");
				//log(el.length);
				if (el.length!=0)
				{
					el[0].title=events[key];
				}
			}
		}
	}
}

function showRaidGain(player)
{
	var obj=getPlayerStatistics();
	var num1=obj.exp-player.exp;
	var num2=obj.money-player.money;
	var text="Raid Gained: Gold "+num2+" Exp "+num1; 
	log(text);
	showSystemMessageBold(text);
}

var _lastMessage=null;
var _lastMessageCounter=0;
function handleRaidMessages(fr,d)
{
	var flag=false;
	var box=$("#TB_ajaxContent",d);
	//log(box);
	if (box)
	{
		flag=true;
		var text=box.textContent.trim();
		log(text);
		if (_lastMessage!=text) 
		{
			_lastMessage=text;
			_lastMessageCounter=0;
		}
		else if (++_lastMessageCounter%100==0)
		{
			log("message repeated too many times, reloading page");
			fr.location.reload();
		}
		if (text.indexOf("Please select a difficulty level")!=-1)
		{
			var text=getRaidMap()[_nextPos].type=="S"?_options.raidSubBoss:_options.raidBoss;
			//log(text);
			button=$x1(".//input[@value='"+text+"']",box);
			log("chosing dificult button: "+button.value);
			if (button) clickElement(button);
		}
		else if (text.indexOf("Are you sure you want to challenge")!=-1) 
		{
			//log($x1("//input[@value='Hard']",box));
			var button=$x1(".//input[@value='Confirm' and not(@ael)]",box);
			if (button) 
			{
				//log("Adding event to the click button");
				button.setAttribute("ael","true");
				button.addEventListener("click",function(e){
					//log("Enter raid, clear data"); 
					clearRaid();},false);
			}
		}
		else if (text.indexOf("You don't have enough HP in your HP Pack")!=-1)
		{
			//http://kgs4.dc.gamedp.com/ajax/raid/raidMonsterMethod.ajax.php
			//spaceid=2_3_2&selectdifficult=0&nohpbagfight=0
			//spaceid=2_3_2&selectdifficult=0&nohpbagfight=1
			//log("canceling and continuining");
			log("Refill hp pack");
			refillHpPack(getTeamHp(fr,d).tothp);
			var button=$x1(".//input[@value='Cancel']",box);
			//log(button);
			clickElement(button);
		}
		else if (text.indexOf("ure to leave the instance?")!=-1)
		{
			//Are you sure to leave the instance
			//Sure to leave the instance?
			log("leaving instance dialog");
			var button=$x1(".//input[@value='Confirm' and not(@ael)]",box);
			if (button) 
			{
				//log("Adding event to the click button");
				button.setAttribute("ael","true");
				button.addEventListener("click",function(e){
					//log("Exit raid, clear data");
					showRaidGain(getRaidMap().player);
					clearRaid();},false);
			}
		}
		else if (text.indexOf("is too weak now and thus needs to be healed to continue fighting")!=-1)
		{
			log("heling party");
			healParty(fr,d);
			fr.location.reload();
		}
		else if (text.indexOf("Please go forward step by step!")!=-1)
		{
			var button=$x1(".//input[@value='Confirm']",box);
			clickElement(button);
			fr.location.reload();
		}
		else if (text.indexOf("Fighting against")!=-1)
		{
			//log("Dismissing fighting against ...");
			var button=$x1(".//input[@value='Confirm']",box);
			clickElement(button);
		}
		else if (box.getElementsByClassName("showEventMsg").length!=0)
		{
			log("Dismissing event message ...");
			var button=$x1(".//input[@value='Confirm']",box);
			clickElement(button);
		}
		else flag=false;
	}
	//log("any message handled? "+flag);
	return flag;
}

function healParty(fr,d)
{
	//log("healParty");
	refillHpPack(getTeamHp(fr,d).tothp);
	var arr=$a(".add_blood",d);
	for(var num=0;num<arr.length;num++)
	{
		var m=/reTeamPlayerHp\('(\d+)', '(.+?)'\);/.exec(arr[num].getAttribute("onclick"));
		log(m);
		//fr.$.ajax({
		sendAjaxRequest({
			type:"POST",
			async:false,
			dataType:"html",
			url: "/ajax/raid/raidTeam.ajax.php",
			data:"method=reteamplayerhp&pid="+m[1],
			error:function(xhr,msg){log(msg);},
			success:function(msg)
			{
				setTimeout(log,0,msg);
				var text=replaceSystemMessage(msg);
				log(text);
			}});
	}
}

var _raidIsDone=false;
function clearRaid()
{
	//log("Clearing raid map and path");
	deleteDataKey("raidMap");
	deleteDataKey("raidPath");
	_raidIsDone=false;
}

var _lastPos;
var _nextPos;
function navigateRaid(fr,d)
{
	var pos=fr.g_teamPosition;
	//log(pos);
	if (pos!=null && pos!="")
	{
		var map=getRaidMap(fr,d);
		//log(pos+" "+_lastPos);
		if (pos!=_lastPos) 
		{
			_lastPos=pos;
			updateMap(fr,d,map,pos);
		}
		
		//log(_raidData.auto+" "+_raidData.isFighting);
		if (_options.autoRaid && !_isFighting)
		{
			//log("Contine raid");
			var cell=map[pos];
			//log(cell);
			var raidPath=getDataKey("raidPath",{steps:[]});
			//log(raidPath);
			var num=raidPath.steps.indexOf(pos)+1;
			//log(num);
			_nextPos=num!=0 && num<raidPath.steps.length?raidPath.steps[num]:null;
			//log(_nextPos);
			var el=_nextPos?$("#space"+cell.exits[_nextPos],d):null;
			//log(el);
			// var next=raidPath.steps.filter(function(c){return c[0]==pos;});
			// //log(next);
			
			//var el=next.length==0?null:$("#space"+next[0][1]);
			//log(el);
			
			if (el!=null) 
			{
				//log("clicking "+el.id);
				var cell1=map[_nextPos];
				if (!cell1.visited && ["N","S","B"].indexOf(cell1.type)!=-1)
				{
					log("Checking party hp and hp pack before fight");
					var obj=getTeamHp(fr,d);
					if (!obj.full) healParty(fr,d);
					refillHpPack(obj.tothp);
				}
				clickElement(el);
			}
			else
			{
				//log("Next target");
				raidPath=null;
				
				//log(map);
				var arr=new Array();
				for each(var c in map)
				{
					//log(c);
					if (!c.visited && c.level!=-1 && c.level<11) arr.push(c);
				}
				//if (arr.length==0) log("No targets");
				//log("unsorted targets",arr);
				arr.sort(function(c1,c2){ return c1.level-c2.level; });
				//log("sorted targets",arr);
	
				//log(arr.length);
				if (arr.length==0) 
				{
					//log("Raid array is empty");
					closeRaidHelper();
					_raidIsDone=true;
				}
	
				var num0=0;
				while(arr.length!=0 && num0++<20)
				{
					var arr1=[];
					var num1=arr[0].level;
					//log("Getting next group level "+num1);
					while(arr.length!=0 && arr[0].level==num1) arr1.push(arr.shift());
					//log("targets group",arr1);
					//log("remaining targets",arr);
				
					var arr2=findRaidPath(pos,arr1.map(function(c){return c.key;}));
					if (arr2) 
					{
						var end=arr2[arr2.length-1];
						raidPath=new Object();
						raidPath.start=pos;
						raidPath.end=end;
						raidPath.details=map[end].details;
						raidPath.steps=arr2;
						break;
					}
				}
				
				if (raidPath) 
				{
					var text=raidPathToString(raidPath);
					log(text);
					setRaidMessage(text);
				}
				setDataKey("raidPath",raidPath);
			}
		}
	}
}

function setCellDist(cell,map)
{
	var num1=cell.dist+1;
	var arr1=[];
	for(var exit in cell.exits)
	{
		var cell1=map[exit];
		if (cell1.dist>num1) 
		{
			cell1.dist=num1;
			if (cell1.visited) arr1.push(cell1);
		}
	}
	for each(var cell1 in arr1) setCellDist(cell1,map);
}

function updateMap(fr,d,map,pos)
{
	var events=fr.g_spaceEventArr;
	//log(events);
	if (events.length!=0)
	{
		//log("setting events");
		for(var key in events)
		{
			//log("Event "+key+" "+events[key]);
			var c=map[key];
			if (c==null) log("Missing map piece "+key);
			else
			{
				c.type="E";
				c.details=events[key];
				var level=0;
				switch(c.details)
				{
					case "mtkAdd":
					case "criAdd":
					case "attAdd":
					case "hpMaxAdd":
					case "mpMaxAdd":
					case "moneyAdd":
					case "hpToFull":
						level=0;
						break;
					case "hpToHelf":
					case "hpToNeap":
						level=6;
						break;
					case "mtkCut":
					case "criCut":
					case "attCut":
					case "hpMaxCut":
					case "mpMaxCut":
						level=10;
						break;
					case "moneyCut":
						level=11;
						break;
				}
				c.level=level;
				//log(c);
			}
		}
	}
	
	var monsters=fr.g_spaceMonsterArr;
	//log(monsters);
	if (monsters.length!=0)
	{
		//log("setting monsters");
		for(var key in monsters)
		{
			//log("Monster "+key+" "+monsters[key]);
			var c=map[key];
			if (c==null) log("Missing map piece "+key);
			else
			{
				//log(key+" "+c);
				c.details=monsters[key];
				var text=c.details[0].monster_raid_type;
				c.type=text=="normal"?"N":text=="smallBoss"?"S":"B";
				c.level=text=="normal"?c.details.length:text=="smallBoss"?8:9;
				//log(c);
			}
		}
	}
	
	var cell=map[pos];
	if (cell==null) log("Missing map piece "+pos);
	else
	{
		cell.visited=true;
		
		for each(var key in cell.exits)
		{
			//log("Check exits "+key);
			var c=map[key];
			if (c==null) log("Missing map piece "+key);
			else
			{
				//log(key+" "+c);
				if (c.level==-1)
				{
					c.type="V";
					c.level=0;
				}
				//log(c);
				//log(c);
			}
		}
	}
	
	//fixing hpToFull
	for each(var c in map)
	{
		if (c.details=="hpToFull" && !c.visited)
		{
			c.level=7;
			break;
		}
	}
	
	//checking exits if visited:
	for(var exit in cell.exits)
	{
		var loc=cell.exits[exit];
		var el1=$("#space"+loc,d);
		//log("Didn't find cell "+loc+", current pos is "+pos);
		if (el1) 
		{
			var text=el1.getAttribute("style");
			//log(exit+" "+text);
			if (text.indexOf("/boss")==-1 && text.indexOf("/transport")==-1)
			{
				var flag=text.indexOf("/front")!=-1;
				//log(loc+" is visited: "+flag);
				if (map[loc].visited!=flag)
				{
					log("This seems to be wrong, cell style "+text);
					//map[loc].visited==flag
				}
			}
		}
	}
	
	//log(cell);
	setDataKey("raidMap",map);
}

function raidPathToString(raidPath)
{
	var text=null;
	if (raidPath!=null) 
	{
		text="from "+raidPath.start+" to "+raidPath.end;
		if (raidPath.details!=null) 
		{
			var obj1=raidPath.details;
			text+=" ("+(typeof(obj1)=="string"?obj1:obj1.map(function(m){return "<span title='"+m.monster_name+"'>"+m.monster_lvl+"</span>";}).join(", "))+")";
		}
	}
	return text;
}

function getRaidMap(fr,d)
{
	var raidMap=getDataKey("raidMap");
	if (raidMap==null) 
	{
		raidMap=new Object();
		raidMap.player=getPlayerStatistics();
		var floors=fr.g_raidFloor;
		var wmax=fr.g_raidWmax;
		var hmax=fr.g_raidHmax;
		for(var num1=1;num1<=floors;num1++)
		{
			for(var num2=1;num2<=wmax;num2++)
			{
				for(var num3=1;num3<=hmax;num3++)
				{
					var cell={key:num1+"_"+num2+"_"+num3,layer:num1,x:num2,y:num3,exits:{},visited:false,type:null,level:-1,details:null};
					if (num2>1) 
					{
						//North exit
						var text1=num1+"_"+(num2-1)+"_"+num3;
						cell.exits[(num1>1 && num2==2 && num3==1?(num1-1)+"_"+wmax+"_"+hmax:text1)]=text1;
					}
					if (num2<wmax) 
					{
						//South exit
						var text1=num1+"_"+(num2+1)+"_"+num3;
						cell.exits[(num1<floors && num2==wmax-1 && num3==hmax?(num1+1)+"_1_1":text1)]=text1;
					}
					if (num3>1) 
					{
						//West exit
						var text1=num1+"_"+num2+"_"+(num3-1);
						cell.exits[(num1>1 && num2==1 && num3==2?(num1-1)+"_"+wmax+"_"+hmax:text1)]=text1;
					}
					if (num3<hmax) 
					{
						//East exit
						var text1=num1+"_"+num2+"_"+(num3+1);
						cell.exits[(num1<floors && num2==wmax && num3==hmax-1?(num1+1)+"_1_1":text1)]=text1;
					}
					if (num2==wmax && num3==hmax)
					{
						if (num1<floors) 
						{
							cell.level=4;
							cell.type="T";
							cell.visited=true;
							//cell.exits.push((num1+1)+"_1_1");
						}
						else 
						{
							cell.level=9;
							cell.type="B";
						}
					}
					if (num2==1 && num3==1)
					{
						if (num1>1)
						{
							cell.level=4;
							cell.type="T";
							//cell.exits.push((num1-1)+"_"+wmax+"_"+hmax);
						}
						else 
						{
							cell.level=0;
							cell.type="N";
						}
					}
					raidMap[num1+"_"+num2+"_"+num3]=cell;
				}
			}
		}
		
	}
	//log(raidMap);
	return raidMap;
}

function findRaidPath(start,ends)
{
	var map=getRaidMap();
	//log(map);
	var depth=0;
	var arr1=[];
	var arr2=[[start]];
	
	var solution=null;
	while(solution==null && arr2.length!=0)
	{
		if (depth++==50)
		{
			log("Path exceeded length from "+start+" to "+end);
			//log(arr2.toSource());
			break;
		}
		var arr3=[];
		for each(var arr4 in arr2)
		{
			//log("arr4 "+arr4.toSource());
			var loc=map[arr4[arr4.length-1]];
			//log("loc "+loc);
			for(var exit in loc.exits)
			{
				//log("exit "+exit);
				if (arr1.indexOf(exit)==-1)
				{
					arr1.push(exit);
					var arr5=arr4.slice(0);
					arr5.push(exit);
					//log("arr5 "+arr5.toSource());
					if (ends.indexOf(exit)!=-1) { solution=arr5; break;}
					else if (map[exit].visited) arr3.push(arr5);
				}
			}
			if (solution!=null) break;
		}
		arr2=arr3;
		//log(arr2);
	}
	
	return solution;
}

/********************************************************************/
/*                     Server Time functions                        */
/********************************************************************/
//this should be in configuration;
//EST = UTC - 5 hours
function getServerDateTime()
{
	return new Date().getTime()+_options.serverTimeDelta;
}
function getServerDate()
{
	return new Date(getServerDateTime());
}

function changeServerClock()
{
	//Fixing bad coded watch in the top left corner
	setTimeout(unsafeWindow.eval,0,"var _sst=-1; showSystemTime=function(){clearTimeout(_sst); var d=new Date(new Date().getTime()+("+_options.serverTimeDelta+")); document.getElementById(\"system_time\").textContent=d.toTimeString().substring(0,8); _sst=setTimeout(showSystemTime,1000-d.getMilliseconds());}; showSystemTime();");
}

/********************************************************************/
/*                     Shop functions                               */
/********************************************************************/
function setShopInfo(message)
{
	$("#shopInfo").innerHTML="<a href='javascript:void(0)' id='closeShopInfo' title='close'>[X]</a> | "+message;
	$("#closeShopInfo").addEventListener("click",function(e){closeShopInfo();},false);
}

function closeShopInfo()
{
	$("#shopInfo").innerHTML="";
}

function shopEnter2(fr,d)
{
	addClearInventorButton(fr,d);
}

var shopTimeout=0;
function shopWatch()
{
	var num0=20*60;
	clearTimeout(shopTimeout);
	try
	{
		if (_options.shopLookForItem || _options.shopAutoBuyItem)
		{		
			var func1=function(stat,shop,item){return false;};
			if (_options.shopLookForItem)
			{
				try {func1=eval("(function(stat,shop,item){"+_options.shopLookForItemFunction+"})");}
				catch(ex){setShopInfo("error in warn item function: "+ex.message); return;}
			}
			
			var func2=function(stat,shop,item){return false;};
			if (_options.shopAutoBuyItem)
			{
				try {func2=eval("(function(stat,shop,item){"+_options.shopAutoBuyItemFunction+"})");}
				catch(ex){setShopInfo("error in buy item function: "+ex.message); return;}
			}
			
			closeShopInfo();
			var shopItems=new Array();
			var stat=getPlayerStatistics();
			
			
			var shopNames=["weapon","armor","jewelry","potion"]; //,"gem"
			var text="s={0}&c=1&potiontype=1&potionlvl="+stat.player_lvl+"&refreshcheck=0&usedragon=0";
			for(var num1=0;num1<shopNames.length;num1++) 
			{
				var shop=shopNames[num1];
				log("Checking shop "+shop);
				sendAjaxRequest({
					type:"POST",
					async:false,
					dataType:"html",
					url: "/ajax/shop/showshop.ajax.php",
					data:text.replace("{0}",shop),
					success:function(msg){
						//log(msg);
						var data=convertStringToNumbers(msg);
						//var data=eval("("+msg.replace(/"(\d+)"/g,"$1")+")");
						//log(data);
						//log(data.state);
						if (data.state==1)
						{
							//log(data.reMsg.leftTime);
							if (data.reMsg.leftTime<num0) num0=data.reMsg.leftTime;
							
							var arr1=new Array();
							var arr2=new Array();
							var num2=data.reMsg.xLength%20;
							//log(data.reMsg.xLength,num2);
							for(var num3=1;num3<=num2;num3++) arr1.push(data.reMsg.xdata[num3]);
							for(var num3=num2+1;num3<=data.reMsg.xLength;num3++) arr2.push(data.reMsg.xdata[num3]);
							//log(arr1,arr2);
							for(var num1=0;num1<arr1.length;num1++)
							{
								var item=arr1[num1];
								//log(item);
								if (item!="")
								{
									var resp=false;
									try
									{
										resp=func2(stat,shop,item);
										//log(resp);
										if (resp) 
										{
											log("buying item: ",item);
											for(var num2=0;num2<arr2.length;num2++)
											{
												if (arr2[num2]=="")
												{
													arr2[num2]=item;
													log("free space in inventory "+(num2+1));
													sendAjaxRequest({
														type:"POST",
														async:false,
														dataType:"json",
														url: "/ajax/shop/buy.ajax.php",
														data:"iid="+item.item_id+"&tra=DragContainer"+(num2+1),
														success:function(msg){				
															log(msg);
															setTimeout(unsafeWindow.eval,0,msg.reMsg);}});
													break;
												}
											}
										}
									}
									catch(ex){log(ex.message,ex.stack);}
									if (!resp)
									{
										try
										{
											var resp=func1(stat,shop,item);
											//log(resp);
											if (resp) 
											{
												//log(item);
												shopItems.push(item);
											}
										}
										catch(ex){log(ex.message,ex.stack);}
									}
								}
							}
						}
				}});
			}
			if (shopItems.length!=0) setShopInfo("Shop: "+shopItems.map(function(i){return i.item_name+"("+i.item_quality+","+i.item_req_lvl+")";}).join(", "));
		}
	}
	catch(ex){log(ex.message,ex.stack);}

	shopTimeout=setTimeout(shopWatch,num0*1000);
}

/********************************************************************/
/*                     Switch Equipment functions                   */
/********************************************************************/
function switchEquipment()
{
	// GM_xmlhttpRequest({
		// method: "GET",
		// url: "/scene/city/bank.php?",
		// onload: switchEquipmentCallback});
	var response=null;
	sendAjaxRequest({
		type:"GET",
		async:true,
		dataType:"html",
		url:"/scene/city/bank.php",
		error:function(xhr,msg){log(msg);},
		success:switchEquipmentCallback});
}

function switchEquipmentCallback(response)
{
	//log(response);
	var m=/var bdata  = (\[.*?\]);/g.exec(response);
	//log(m[1]);
	var arr1=eval(m[1]);
	//log(arr1);
	m=/var data   = (\[.*?\]);/g.exec(response);
	//log(m[1]);
	var arr2=eval(m[1]);
	//log(arr2);
	var num0=arr2.indexOf("")+1;
	//log(num0);
	arr2=new Array();
	var obj=null;
	for(var num1=0;num1<10;num1++)
	{
		var obj1=arr1[num1];
		if (obj1!="")
		{
			var arr3=mapItemToEquipment(obj1.item_type,obj1.item_subtype);
			for each(var text1 in arr3)
			{
				//log(obj1.item_type+","+obj1.item_subtype+"-->"+text1+"?");
				if (arr2.indexOf(text1)==-1)
				{
					//log("changing "+obj1.item_type+","+obj1.item_subtype+"-->"+text1);
					arr2.push(text1);
					if (obj==null) obj=obj1;
					storeItem(obj1.item_id,600+num1,text1);
					break;
				}
			}
		}
	}
	//statAttr(); doesn't work, need to equip an item from the inventory
	if (num0!=0)
	{
		//removing and reequiping an item from inventory
		storeItem(obj.item_id,arr2[0],num0);
		storeItem(obj.item_id,num0,arr2[0]);
	}
}

function storeItem(itemId,fromId,toId)
{
	log("Moving object "+itemId+" from "+fromId+" to "+toId);
	unsafeWindow.storeItem(itemId,"DragContainer"+fromId,"DragContainer"+toId);
}

function mapItemToEquipment(type,subtype)
{
	//type subtype: 2001 Sword, 2002 Dagger, 2003 Helmet, 2004 Ring, 2005 Armguard, 2006 Leggings, 2007 Staff, 2008 Off-Hand, 2009 Shield, 2010 Breastplate, 2011 Shoes, 2012 Necklace
	//containers: 200 helm, 201 necklace, 202 right hand, 203 breastplate, 204 left hand, 205 armguard, 206 leggings, 207 right ring, 208 shoes, 209 left ring
	var text={"Helmet":["200"],"Necklace":["201"],"Breastplate":["203"],"Dagger":["202","204"],"Staff":["202"],"Sword":["202","204"],"Ring":["207","209"],"Armguard":["205"],"Leggings":["206"],"Shoes":["208"],"Off-Hand":["204"],"Shield":["204"]}[subtype];
	return typeof(text)=="undefined"?[]:text;
}

/********************************************************************/
/*                     Team functions                               */
/********************************************************************/
var _teamState=null;
var _teamStateKey=null;
var _teamInitFunction=null;

function loadTeamState(key,initFunction)
{
	log("load team state: "+key)
	_teamStateKey=key;
	_teamState=getDataKey(_teamStateKey);
	if (_teamState==null || typeof(_teamState)!="object")
	{
		_teamState={state:"Init",team:[],receiver:_comm.ReceiverName,teamStates:{}};
		_teamState.playerStats=getPlayerStatistics();
		_teamState.player=_teamState.playerStats.player_nickname;
		_teamState.playerId=_teamState.playerStats.id;
		initFunction(_teamState);
		saveTeamState();
	}
	
	log("Setting event listeners");
	_comm.MessageReceived=teamMessageReceived;
	_comm.SendCompleted=teamSendCompleted;
}

function isTeamReady()
{
	var flag=_comm.SenderCount==3;
	if (!flag) _comm.ReSynchronize();
	return flag;
}

function clearTeamState(stateKey)
{
	log("clear team state");
	_comm.MessageReceived=null;
	_comm.SendCompleted=null;
	_teamState=null;
	deleteDataKey(stateKey || _teamStateKey);
	_teamStateKey=null;
}

function saveTeamState()
{
	if (_teamState!=null)
	{
		_teamState.lastSave=new Date().getTime();
		setDataKey(_teamStateKey,_teamState);
	}
}


function nextTeamState(nextState)
{
	_teamState.state=nextState;
	delete _teamState.teamStates[nextState];
	saveTeamState();
}

function checkTeamProgress(state,nextState,data)
{
	var flag=checkTeamState(state);
	if (flag) nextTeamState(nextState);
	else sendTeamMessage(state,data);
	return flag;
}

function checkTeamState(state)
{
	var num1=0;
	var num2=0;
	var states=_teamState.teamStates[state];
	log(state,states);
	for(var name in states)
	{
		num1++;
		if (states[name]==null) num2++;
	}
	return num1==3 && (num2==0 || num2==3);
}

function setPlayerState(player,state,data)
{
	if (_teamState==null || typeof(player)=="undefined" || player==null) return null;
	var states=_teamState.teamStates[state];
	if (typeof(states)=="undefined") _teamState.teamStates[state]=states=new Array();
	states[getPlayerIndex(player)]=data?data:null;
}

function getPlayerState(player,state)
{
	if (_teamState==null || typeof(player)=="undefined" || player==null) return null;
	var states=_teamState.teamStates[state];
	if (typeof(states)=="undefined") _teamState.teamStates[state]=states=new Array();
	return states[getPlayerIndex(player)];
}

function getTeamState(state)
{
	if (_teamState==null) return null;
	var states=_teamState.teamStates[state];
	if (typeof(states)=="undefined") _teamState.teamStates[state]=states=new Array();
	return states;
}

function getPlayerIndex(player)
{
	var num=_teamState.team.indexOf(player);
	if (num==-1) num=_teamState.team.push(player)-1;
	return num;
}

function sendTeamMessage(state,data)
{
	if (typeof(data)=="undefined") data=null;
	sendCommMessage(encodeMessage(state,data));
	setPlayerState(_teamState.player,state,data);
}

function teamSendCompleted(s,e)
{
	log(e.Sender+"->"+e.Receiver+":"+e.Message+"->"+e.Response);
	if (e.Response)
	{
		var arr=decodeMessage(e.Response);
		//log("Reponse",arr);
		setPlayerState(e.Receiver,arr[0],arr[1]);
	}
}

function teamMessageReceived(s,e)
{
	var arr=decodeMessage(e.Message);
	//log(arr);
	if (_teamState && _teamState.state!="Completed")
	{
		setPlayerState(e.Sender,arr[0],arr[1]);
		var obj=getPlayerState(_teamState.player,arr[0]);
		//log(obj);
		if (typeof(obj)!="undefined") e.Response=encodeMessage(arr[0],obj);
	}
	log(e.Sender+"->"+e.Receiver+":"+e.Message+"->"+e.Response);
}

function encodeMessage(state,data)
{
	var ret=null;
	try{ ret=state+"|"+JSON.stringify(data); }
	catch(ex){log(ex.message,ex.stack);}
	return ret;
}

function decodeMessage(message)
{
	var arr=[];
	try
	{
		var num1=message.indexOf("|");
		arr[0]=message.substring(0,num1);
		arr[1]=JSON.parse(message.substring(num1+1));
	}
	catch(ex){log(ex.message,ex.stack);}
	return arr;
}

/********************************************************************/
/*                     Tournament functions                         */
/********************************************************************/
function viewtourneyfightEnter2(fr,d)
{
	if (_options.noFightAnimation) eliminateFightAnimation(fr,d);
}

/********************************************************************/
/*                     Work functions                               */
/********************************************************************/

function workEnter2(fr,d)
{
	fixShowTimeDownFunction(fr);
	if (_options.autoWork) autoWork();
}

var _autoWorkTimeout=-1;
function autoWork()
{
	var num1=3;
	clearTimeout(_autoWorkTimeout);
	try{num1=autoWorkCore();}
	catch(ex){log(ex.message,ex.stack);}
	if (num1>-1) _autoWorkTimeout=setTimeout(autoWork,num1*1000);
}

function autoWorkCore()
{
	var num1=3;
	var fr=getFrame("work");
	if (!fr) num1=-1;
	else
	{
		var d=fr.document;
		var el=$("#action_content",d);
		if (el && el.textContent.indexOf("You are working in")!=-1)
		{
			num1=Math.max(fr.lefttime,1);
			if (num1>1) log("Already working, wait to finish "+formatTime2(num1));
		}
		else if (el=$("#TB_ajaxContent",d)) clickElement($("#tconfirm_confirm_btn",d));
		else if (el=$x1("//a[contains(@onclick,'"+_options.workIn+"')]",d)) 
		{
			setSelectedOption($("#worktime",d),_options.workFor);
			clickElement(el);
		}
		else if (d.title.indexOf("502")!=-1) 
		{
			num1=60;
			log("Maintenance time, wating "+num1+" seconds and reload page");
			setTimeout(fr.location.reload,num1*1000);
		}
		else 
		{
			log("Reloading work page");
			fr.location.reload();
		}
	}
	return num1;
}

/********************************************************************/
/*                         Upgrade functions                        */
/********************************************************************/
function upgradeEnter2(fr,d)
{
	addClearInventorButton(fr,d);
	addSwitchInventoryOnDrag(fr,d);
}

/********************************************************************/
/*                         Wage System functions                    */
/********************************************************************/
function getWageSystemInfos()
{
	var arr=new Array();
	sendAjaxRequest({
		type:"GET",
		async:false,
		dataType:"html",
		url: "/scene/wage/wage.php",
		error:function(xhr,msg){log(msg);},
		success:function(msg)
		{
			//log(msg);
			var t=/<table[\s\S]*?<\/table>/.exec(msg);
			//log(t);
			var el=toHTML(t[0]);
			//log(el.tagName);
			for(var num1=1;num1<el.rows.length;num1++)
			{
				var row=el.rows[num1];
				var obj=new Object();
				obj.name=row.cells[0].textContent.trim();
				obj.state=row.cells[1].textContent.trim();
				obj.value=parseInt(row.cells[2].textContent.trim());
				var m=/(\d+)\/(\d+)/.exec(obj.state);
				obj.done=parseInt(m[1]);
				obj.todo=parseInt(m[2]);
				obj.progress=eval(obj.state);
				//log(obj);
				arr.push(obj);
			}
		}
	});
	//log(arr);
	return arr;
}

/********************************************************************/
/*                     Scheduler functions                          */
/********************************************************************/
var _scheduler=null;
function startScheduler()
{
	deleteDataKey("scheduler");
	_scheduler=getDataKey("scheduler",{needReset:false,serverDate:getServerDate(),timeout:-1,tasks:_schedulerTasks});
	setTimeout(schedulerTick,10000);
}

function resetScheduler()
{
	log("Scheduler is reseting");
	log(_scheduler);
	for (var num1=0;num1<_scheduler.tasks.length;num1++) 
	{
		var task=_scheduler.tasks[num1];
		if (task.s==2 || isNaN(task.s)) 
		{
			task.s=0;
			task.m="Scheduler Reset";
		}
	}
	log(_scheduler);
	_scheduler.needReset=false;
	log("Scheduler is reseted");
}

function schedulerTick()
{
	clearTimeout(_scheduler.timeout);
	try
	{
		var serverDate=getServerDate();
		var time=serverDate.getTime();
		var t=serverDate.getHours()+serverDate.getMinutes()/100;
		var d=serverDate.getDay();
		if (_scheduler.serverDate.getDay()!=d) _scheduler.needReset=true;
		if (_scheduler.needReset) resetScheduler();
		_scheduler.serverDate=serverDate;
		
		if (!_options.enableScheduler)
		{
			var arr=_scheduler.tasks.filter(function(t){return t.s==1;});
			for(var num1=0;num1<arr.length;num1++)
			{
				var task=arr[num1];
				task.m="Forced stop, scheduler disabled";
				log(task.n+"->"+task.m);
				schedulerEndTask(task,0);
			}
		}
		else
		{
			var task1=null;
			var task2=null;
			var arr=_scheduler.tasks.filter(function(t){return t.a && (!t.k || _options[t.k]);});
			for(var num1=0;num1<arr.length;num1++)
			{
				var task=arr[num1];
				if (task.s==1)
				{
					//log("time elapesed for task "+task.n,time-task.ts);
					if (!task.a || (t.k && !_options[task.k]))
					{
						//task has been disabled
						task.m="Task has been disabled, reseting it";
						log(task.n+"->"+task.m);
						schedulerEndTask(task,0);
					}
					else if (task.f>t || task.t<t || (!!task.d && task.d.indexOf(d)==-1))
					{
						//task out of time or day
						task.m="Forced stop, task out of time or day";
						log(task.n+"->"+task.m);
						schedulerEndTask(task,2);
					}
					else if (task.ts && time-task.tt>2*60*1000)
					{
						//task is not running any more
						task.m="Task is dead, reseting it";
						log(task.n+"->"+task.m);
						schedulerEndTask(task,0);
					}
					else if (task2) 
					{
						//only one task should run at the same time
						task.m="More than one task is running at the same time, reseting it";
						log(task.n+"->"+task.m);
						schedulerEndTask(task,0);
					}
					else task2=task;
				}
				if (task.s==0)
				{
					if (t>=task.f && t<=task.t && (!task.d || task.d.indexOf(d)!=-1)) 
					{
						if (!task1 || task1.p<task.p) task1=task;
					}
				}
			}
			//checking for unique tasks
			//log(task1,task2);
			if (task1)
			{
				if (task2 && task2.p<task1.p)
				{
					//Task 2 is running but task 1 has an higher priority
					task2.m="Forced stop, task "+task1.n+" has higher priority";
					log(task2.n+"->"+task2.m);
					schedulerEndTask(task2,0);
					task2=null;
				}
				if (!task2)
				{
					//Starting task 1
					schedulerStartTask(task1);
				}
			}
		}
	}
	catch(ex){log(ex.message,ex.stack);}
	var num=60; //tick intervall
	_scheduler.timeout=setTimeout(schedulerTick,(num-(new Date()).getSeconds()%num)*1000);
	setDataKey("scheduler",_scheduler);
}

function schedulerStartTask(task)
{
	task.e=0;
	task.s=1;
	task.m="Task is running";
	task.tt=task.ts=getServerDateTime();
	//schedulerRunTask(task);
	task.i=setTimeout(schedulerRunTask,0,task);
	log(task);
}

var _runningTask=null;
function schedulerRunTask(task)
{
	_runningTask=task;
	clearTimeout(task.i);
	
	var state=-5;
	task.tt=getServerDateTime();
	if (task.s==1)
	{
		try{state=getFunction(task.c)(task);}
		catch(ex)
		{
			log(ex.message,ex.stack);
			if (++task.e>20) 
			{
				//log("To many errors, reloading page");
				//location.reload();
				log("Too many errors, stopping task "+task.n);
				state=0;
			}
		}
	}
	
	if (task.s==1 && state<0) task.i=setTimeout(schedulerRunTask,-state*1000,task);
	else
	{
		setTimeout(schedulerEndTask,0,task,state,state==0?"Task reseted":state==2?"Task ended":"Unknown state");
		_runningTask=null;
	}
}

function schedulerEndTask(task,state,message)
{
	clearTimeout(task.i);
	task.s=state;
	task.tf=getServerDateTime();
	task.td=task.tf-task.ts;
	if (message) task.m=message;
	setDataKey("scheduler",_scheduler);
	closeFrame();
	setTimeout(schedulerTick);
	log(task,state);
}


function autoResetScheduler(task)
{
	//Things to be reseted every day
	var state=2;
	clearTeamState(_raidState);
	clearTeamState(_guildQuestState);
	return state;
}

function autoBuyActionPointScheduler(task)
{
	var state=-1;
	var arr=getActionPointState();
	log(arr);
	for(var num1=0;num1<arr.length;num1++)
	{
		var obj=arr[num1];
		log(obj);
		if (!obj.dg)
		{
			for(var num2=0;num2<obj.t;num2++) 
			{
				buyActionPoint(obj.id);
			}
		}
	}
	state=2;
	return state;
}

function autoWorkScheduler(task)
{
	var state=-3;
	var fr=null;
	if (fr=getFrame("work")) 
	{
		state=fr.lefttime>0?fr.lefttime:autoWorkCore();
		state=-(Math.max(1,Math.min(60,state)));
	}
	else if (fr=getFrame("city")) 
	{
		log("Entering job center");
		var d=fr.document;
		navigateToIcon("Job Center",fr,d);
		state=-5;
	}
	else
	{
		log("Entering city");
		clickElement($x1(".//a[contains(text(),'Town')]"));
		state=-5;
	}
	return state;
}

function autoTournamentScheduler(task)
{
	var state=-3;
	var el=null;
	var fr=null;
	if (fr=getFrame("mytourney")) 
	{
		var d=fr.document;
		log("Going to single tournament");
		clickElement($x1(".//a[contains(span/text(),'Challenge Tournament')]",d));
	}
	else if (fr=getFrame("tourneyone")) 
	{
		var d=fr.document;
		if (el=$x1(".//div[@id='TB_ajaxContent']//input[@value='Confirm']",d)) log("Confirm");
		else if ((el=$x1(".//a[contains(span/text(),'I Want to Join') and @onclick!='']",d)) && isVisible(el)) log("Joinning single tournament");
		else if (el=$x1(".//a[contains(text(),'Pair')]",d)) log("Switching to pair tournament");
		clickElement(el);
	}
	else if (fr=getFrame("tourneydouble")) 
	{
		var d=fr.document;
		if (el=$x1(".//div[@id='TB_ajaxContent']//input[@value='Confirm']",d)) log("Confirm");
		else if ((el=$x1(".//a[contains(span/text(),'I Want to Join') and @onclick!='']",d)) && isVisible(el)) log("Joinning pair tournament");
		else if (el=$x1(".//a[contains(text(),'Trio')]",d)) log("Switching to trio tournament");
		clickElement(el);
	}
	else if (fr=getFrame("tourneyteam")) 
	{
		var d=fr.document;
		if (el=$x1(".//div[@id='TB_ajaxContent']//input[@value='Confirm']",d)) log("Confirm");
		else if ((el=$x1(".//a[contains(span/text(),'I Want to Join') and @onclick!='']",d)) && isVisible(el)) log("Joinning trio tournament");
		else 
		{ 
			log("Done"); 
			state=2; 
		}
		clickElement(el);
	}
	else 
	{
		log("entering tournament");
		clickElement($x1(".//a[contains(text(),'Tournament')]"));
		state=-5;
	}
	return state;
}

function autoTournamentRewardScheduler(task)
{
	var state=-3;
	var el=null;
	var fr=null;
	if (fr=getFrame("mytourney")) 
	{
		var d=fr.document;
		log("Going to reward section");
		clickElement($x1(".//a[contains(span/text(),'Score Exchange')]",d));
	}
	else if (fr=getFrame("tourneyreward")) 
	{
		var d=fr.document;
		if (el=$x1(".//div[@id='TB_ajaxContent']//input[@value='Confirm']",d)) log("Confirm");
		else if (el=firstVisible($x(".//a[contains(span/text(),'Claim')]",7,d))) log(el.parentNode.previousSibling.previousSibling.textContent);
		else 
		{
			log("Nothing more to claim");
			state=2;
		}
		clickElement(el);
	}
	else 
	{
		log("entering tournament");
		clickElement($x1(".//a[contains(text(),'Tournament')]"));
		state=-5;
	}
	return state;
}

function getPackage(id)
{
	log("Claiming package id "+id);
	sendAjaxRequest({
		type:"POST",
		async:true,
		dataType:"json",
		url: "/ajax/increase/card.ajax.php",
		data:"action=getreward&cardtype_id="+id,
		error:function(xhr,msg){log(msg);},
		success:function(msg){log(msg);showSystemMessageBold(msg.reMsg);}});
}

function autoQuestsScheduler(task)
{
	var state=-1;
	if (_startPosition==null)
	{
		var obj=getPlayerStatistics();
		log("AP left: "+obj.acpoints);
		var flag=obj.acpoints>0;
		if (task.o.r)
		{
			var num1=getDoneLeftRaids(obj.player_lvl).totalLeft;
			log("Total raids left: "+num1);
			flag&=num1==0;
		}
		log("Can do quests: "+flag);
		if (!flag) state=2;
		else _startPosition=_position;
	}
	else
	{
		if ((state=executeQuests())==2)
		{
			//getPackage(67);
			var obj=getPlayerStatistics();
			if (getDailyQuests(obj.acpoints)) state=-1
			else
			{
				log("auto quest ended go back to: "+_startPosition);
				navigateTo(_startPosition);
				_startPosition=null;
			}
		}
		else if (fr=getFrame("fieldfight"))
		{
			var el=null;
			var d=fr.document;
			if (el=$("#action_content",d))
			{
				var text=el.textContent.trim();
				log(text);
				if (text.indexOf("You are working")!=-1)
				{
					//stop working
					log("Stopping work");
					el=$(".m_btn_cancel",d);
					//log("cancel button: "+el);
					clickElement(el);
					state=-5;
				}
				else if (text.indexOf("No matching monsters are found in the area")!=-1)
				{
					 log("Navigating to town");
					 closeFrame();
					 navigateToTown();
				}
			}
		}
	}
	return state;
}

function autoGuildWelfareScheduler(task)
{
	var state=-1;
	
	if (fr=getFrame("myguild")) 
	{
		var d=fr.document;
		var el=$x1(".//ul[@id='guild_menu']/li[@class='on']",d);
		if (el && el.textContent.trim()!="Welfare") 
		{
			log("Swiching to Welfare");
			clickElement($x1(".//a[span[contains(text(),'Welfare')]]",d));
		}
		else
		{
			el=$("#TB_ajaxContent",d);
			if (el)
			{
				log($(".winxalert_out",d).textContent.replace(/\s+/," "));
				clickElement($x1(".//input[@value='Confirm']",d));
			}
			else
			{
				el=$x1(".//a[span[contains(text(),'Claim')]]",d);
				log(el);
				if (el && isVisible(el)) 
				{
					log("Claiming dragon stones: "+$("#getWelfareDragonGift_id",d).value)
					clickElement(el);
				}
				else 
				{
					log("Nothing more to claim");
					state=2;
				}
			}
		}
	}
	else
	{
		log("Entering Guild");
		clickElement($x1(".//a[contains(text(),'Guild')]"));
		state=-5;
	}
	return state;
}

var _guildQuestState="guildState"
function autoGuildQuestScheduler(task)
{
	var state=-1;
	if (!_teamState) 
	{
		loadTeamState(_guildQuestState,function(state){state.currentTurn=0;});
	}
	if (new Date().getTime()-_teamState.lastSave>300000)
	{
		log("Team state is too old, over 5 minutes, deleting it");
		clearTeamState(_guildQuestState);
		return state;
	}
	var fr=null;
	if (fr=getFrame("guildqfight"))
	{
		log("Guild quest fight");
		var d=fr.document;
		log(_teamState.state);
		switch(_teamState.state)
		{
			case "Fight":
				if ($x1(".//div[contains(text(),'Your guild quest has completed')]",d))
				{
					log("Guild quest completed");
					clickElement($x1(".//input[@value='Return']",d));
				}
				if ($x1(".//strong[contains(text(),'Please select your numen')]",d))
				{
					log("Stage won");
					checkTeamProgress("Fight","Heal","Heal");
				}
				else
				{
					log("Stage lost");
					clickElement($x1(".//a[contains(text(),'Exit combat')]",d));
				}
				break;
			case "Heal":
				if (checkTeamProgress("Heal","Fight","Fight"))
				{
					if (!_numens[_questLevel+1])
					{
						var arr=getPlayerState(_teamState.player,"Next");
						if (arr && arr[_questLevel+1]) _numens=arr;
					}
					var text=_numens[_questLevel+1] || "Fire";
					text={Fire:".shs1",Water:".shs2",Wind:".shs3",Earth:".shs4"}[text];
					log("Chosing link "+text);
					clickElement($(text,d));
					state=-3;
				}
				break;
		}
	}
	else if (fr=getFrame("guildqlognpc")) 
	{
		//log("Guid quest");
		var d=fr.document;
		var el=$("#TB_ajaxContent",d);
		if (el!=null)
		{
			log(el.textContent);
			if (el.textContent.indexOf("Your cooldown hasn't been finished.")!=-1)
			{
				//stop working
				clickElement($x1(".//a[span[contains(text(),'Stop current action')]]",d));
			}
			else if (el.textContent.indexOf("You have finished today’s guild quests.")!=-1)
			{
				if (checkTeamProgress("Fight","Next","Next"))
				{
					clickElement($x1(".//input[contains(@value,'Confirm')]",d));
				}
			}
		}
		else
		{
			log("Guild quest state: "+_teamState.state);
			switch(_teamState.state)
			{
				case "Init":
					if (isTeamReady()) checkTeamProgress("Init","LvlExp",[_teamState.playerId,_teamState.player]);
					break;
				case "LvlExp":
					if (checkTeamProgress("LvlExp","Fight",[_teamState.playerStats.player_lvl,_teamState.playerStats.exp]))
					{
						var states=_teamState.teamStates["LvlExp"].slice();
						for(var num1=0;num1<states.length;num1++) 
						{ 
							states[num1][2]=num1; 
							states[num1][3]=_teamState.team[num1]; 
						}
						states.sort(function(s1,s2){return s1[0]==s2[0]?s2[1]-s1[1]:s2[0]-s1[0];});
						log(states);
						for(var num1=0;num1<states.length;num1++)
						{
							if (states[num1][3]==_teamState.player) _teamState.myTurn=num1;
						}
						_teamState.sequence=states;
						saveTeamState();
						log("My turn is :"+_teamState.myTurn);
					}
					break;
				case "Fight":
					if (_teamState.currentTurn==_teamState.myTurn)
					{
						log("It's my turn");
						_teamState.currentStage=1;
						
						if ((el=$(".npctalk2",d)) && /Quest Reward:([\s\S]*)/.exec(el.textContent))  
						{
							//Reward: Exp +376501, Contribution Points +10, Popularity Points + 5
							var text="Reward: "+RegExp.$1.trim();
							log(text);
							showSystemMessageBold(text);
						}
						
						if (el=$x1(".//a[contains(text(),'Come on!')]",d)) clickElement(el);
						else if (el=$x1(".//input[contains(@value,'Complete')]",d)) clickElement(el);
						else if (el=$x1(".//a[contains(text(),'Guild Defense War')]",d)) clickElement(el);
						
						state=-3;
					}
					else
					{
						var text1=_teamState.sequence[_teamState.currentTurn][3];
						log("Player on the quest "+text1);
						var text2=getPlayerState(text1,"Fight");
						log("Player state "+text2);
						if (text2) checkTeamProgress("Fight",text2,text2);
					}
					break;
				case "Heal":
					if ((_teamState.currentTurn+1)%3==_teamState.myTurn)
					{
						var text1=_teamState.sequence[_teamState.currentTurn][3];
						log("Player on the quest "+text1);
						var pid=getPlayerState(text1,"Init")[0];
						log("Aid player id: "+pid);
						aidPlayer(pid,text1);
					}
					checkTeamProgress("Heal","Fight","Fight");
					break;
				case "Next":
					log(_teamState.currentTurn);
					if (_teamState.currentTurn<2)
					{
						var arr=null;
						if (_teamState.currentTurn==_teamState.myTurn) arr=_numens||[];
						else
						{
							var text1=_teamState.sequence[_teamState.currentTurn][3];
							log("Player on the quest "+text1);
							var arr=getPlayerState(text1,"Next");
							log("Player numens ",arr);
						}
						if (arr && checkTeamProgress("Next","Fight",arr))
						{
							_teamState.currentTurn++;
						}
					}
					else
					{
						if (checkTeamProgress("Next","Completed"))
						{
							clearTeamState(_guildQuestState);
							state=2;
						}
					}
					break;
			}
		}
	}
	else if (fr=getFrame("myguild")) 
	{
		log("Entering guid quest");
		var d=fr.document;
		clickElement($x1(".//a[contains(text(),'Guild Quest')]",d));
		state=-5;
	}
	else
	{
		log("Entering Guild");
		clickElement($x1(".//a[contains(text(),'Guild')]"));
		state=-5;
	}
	return state;
}

var _raidState="raidState";
var _autoRaidAntiStick=0;
function autoRaidsScheduler(task)
{
	var state=-1;
	if (!_teamState) 
	{
		_raidIsDone=false;
		loadTeamState(_raidState,function(state){
			state.leader=false;
			state.raidIsDone=false;
			obj=getDoneLeftRaids(_teamState.playerStats.player_lvl);
			state.canRaid=(obj.freeLeft!=0 && task.o.f) || (obj.totalLeft!=0 && task.o.n && state.playerStats.acpoints>30);
			log("instance left to do "+_teamState.raidLeft+" and "+_teamState.playerStats.acpoints+" AP left");
		});
	}
	if (!_teamState.canRaid) 
	{
		clearTeamState(_raidState);
		state=2;
	}
	else
	{
		var fr=null;
		if (fr=getFrame("mercenary"))
		{
			//log("mercenary",_teamState.state);
			var d=fr.document;
			
			var el=$("#action_content",d);
			if (el && el.textContent.indexOf("You are working")!=-1) 
			{
				if (_teamState.canRaid)
				{
					//stop working
					log("Stopping work");
					el=$(".m_btn_cancel",d);
					clickElement(el);
					state=-5;
				}
			}
			else
			{
				switch(_teamState.state)
				{
					//initialization
					case "Init":
						if (isTeamReady())
						{
							if (!_teamState.times)
							{
								var arr=$a("#mmarketButtonArea strong",d);
								//log(arr);
								if (arr.length!=0)
								{
									_teamState.times=Array.map(arr,function(n){return parseInt(n.textContent);});
									if (_teamState.times.length==1) _teamState.times.push(0);
									log("Remaining times: "+_teamState.times);
									_teamState.canRaid&=_teamState.times.some(function(n){return n!=0;});
								}
							}
							if (_teamState.times && _teamState.canRaid)
							{
								if (el=$("a[onclick*='showButtonArea']",d)) clickElement(el);
								else checkTeamProgress("Init","LvlExp",[_teamState.playerId,_teamState.player]);
							}
						}
						break;
					//Communicating exp to choose leader
					case "LvlExp":
						if (checkTeamProgress("LvlExp","Raid",[_teamState.playerStats.player_lvl,_teamState.playerStats.exp]))
						{
							var num1=0;
							var states=_teamState.teamStates["LvlExp"];
							for(var num2=0;num2<states.length;num2++)
							{
								var arr1=states[num1];
								var arr2=states[num2];
								if (arr2[0]<arr1[0] || (arr2[0]==arr1[0] && arr2[1]<arr1[1])) num1=num2;
							}
							var text=_teamState.team[num1];
							log("Leader is :"+text);
							_teamState.leaderName=text;
							_teamState.isLeader=text==_teamState.player;
							log("Am I the raid leader: "+_teamState.isLeader);
						}
						break;
					//Choosing raid
					case "Raid":
						var text=getPlayerState(_teamState.leaderName,"Raid");
						if (!text && _teamState.isLeader)
						{
							var num1=_teamState.playerStats.player_lvl;
							var num2=0
							if (_teamState.times[1]!=0) num2=20;
							else
							{
								try{num2=Math.max(0,parseInt(_options.instanceLevel));}
								catch(ex){}
							}
							log("Player level "+num1+", level modifier "+num2);
							num1-=num2;
							var arr=_raidInfos.filter(function(r){return r.level<=num1;});
							arr.sort(function(r1,r2){return r2.level-r1.level;});
							text=arr[0].name;
							if (_options.raidMaximizeExp)
							{
								arr.sort(function(r1,r2){return r2.exp/r2.ap-r1.exp/r1.ap;});
								for(var num1=0;num1<arr.length;num1++)
								{
									var arr1=_raidDailyQuests.filter(function(q){return q.raid==arr[num1].id;});
									if (questHandler(arr1[0].id).state==1)
									{
										var arr2=getPlayerQuests();
										var quest=arr2.filter(function(q){return q.m==arr1[0].id;})[0];
										cancelQuest(quest.m,quest.l,1);
										text=arr[num1].name;
										break;
									}
								}
							}
						}
						log("Raid: "+text);
						if (text) checkTeamProgress("Raid","Mercenary",text);
						break;
					//Entering mercenary market or creating team;
					case "Mercenary":
						var el=$("div.m_wrap.raid_team",d);
						log("in mercenary market: "+el);
						if (el) checkTeamProgress("Mercenary","Hire");
						else
						{
							//http://kgs4.dc.gamedp.com/ajax/raid/raidTeam.ajax.php
							//raidid=7&method=createteam&mfotnum=0&usedragon=dragon
							//showSystemMsg('Congrats, the team has been successfully created!');
							//http://kgs4.dc.gamedp.com/ajax/team/beMercenary.ajax.php
							//m=0&r=7&mPwd=n3c5j7&mFotNum=0&usedragon=dragon
							var text=getPlayerState(_teamState.player,"Raid");
							var raid=_raidInfos.filter(function(r){return r.name==text;})[0];
							var num=raid.level<=_teamState.playerStats.player_lvl-20 && _teamState.times[1]!=0?0:1;
							var url="/ajax/team/beMercenary.ajax.php";
							var data="m=0&r="+raid.id+"&mPwd="+_options.mercenaryPassword+"&mFotNum="+num;
							if (_teamState.isLeader)
							{
								url="/ajax/raid/raidTeam.ajax.php";
								data="raidid="+raid.id+"&method=createteam&mfotnum="+num;
							}
							//fr.$.ajax({
							sendAjaxRequest({
								type:"POST",
								async:false,
								dataType:"html",
								url:url,
								data:data,
								error:function(xhr,msg){log(msg);},
								success:function(msg)
								{
									log(msg);
									if (typeof(msg.reMsg)=="undefiend") setTimeout(fr.eval,0,replaceSystemMessage(msg));
									fr.location.reload();
									state=-3;
								}});
						}
						break;
					//Hire mercenaries
					case "Hire":
						var el=$a("table.m_table.raid_table tr",d);
						log("team table rows:"+el.length);
						if (el.length==4) checkTeamProgress("Hire","Formation");
						else
						{
							//log(_teamState.isLeader);
							// if (!_teamState.isLeader)
							// {
								
								//fr.location.reload();
								el=$("a[onclick*='showButtonArea']",d);
								// //log("refresh button :"+el);
								if (el) clickElement(el);
								state=-3;
							//}
							if (_teamState.isLeader)
							{
								var arr=getTeamState("Init");
								for(var num=0;num<arr.length;num++)
								{
									var player=arr[num][1];
									log("getting player in team table: "+player);
									el=Array.filter($a("table.m_table.raid_table td",d),function(el1){return el1.textContent.indexOf(player)!=-1;});
									if (el.length!=0) continue;
									log("getting player in market: "+player);
									el=$("a[onclick*=\"'"+player+"'\"]",d);
									//log(el);
									if (el)
									{
										log("hire player: "+player);
										var mid=parseInt(/'(\d+)'/.exec(el.getAttribute("onclick"))[1]);
										log("mercenary id: "+mid);
										sendAjaxRequest({
											type:"POST",
											async:false,
											dataType:"json",
											url: "/ajax/team/hireMercenary.ajax.php",
											data:{"mid":mid, "mpwdvalue":_options.mercenaryPassword},
											error:function(xhr,msg){log(msg);},
											success:function(msg)
											{
												setTimeout(log,0,msg); 
												var text=replaceSystemMessage(msg.reMsg);
												setTimeout(fr.eval,0,text);
												
												//fr.location.reload();
												el=$("a[onclick*='showButtonArea']",d);
												// //log("refresh button :"+el);
												if (el) clickElement(el);
												state=-3;
											}});
									}
									else
									{
										$("#mmarket_playernickname",d).value=player;
										clickElement($("input[name='mmarket_submit']",d));
										state=-3;
										break;
									}
								}
							}
						}
						break;
					//Changing formation
					case "Formation":
						var el=$x1(".//table[@class='m_table raid_table']//tr[td/div/a[contains(text(),'"+_teamState.player+"')]]/td[3]",d);
						log("team table row: "+(el?el.textContent:"<no row>"));
						//log(el.textContent);
						if (el.textContent=="Main Attacker") checkTeamProgress("Formation","Quests");
						else 
						{
							var arr=_teamState.teamStates["Init"];
							log(arr);
							//fr.$.ajax({
							sendAjaxRequest({
								type:"POST",
								async:false,
								dataType:"html",
								url: "/ajax/team/savePosition.ajax.php",
								data:"position=dps%40dps%40dps%40&pid="+arr[0][0]+"%40"+arr[1][0]+"%40"+arr[2][0]+"%40",
								error:function(xhr,msg){log(msg);},
								success:function(msg)
								{
									log(msg);
									//fr.location.reload();
									el=$("a[onclick*='showButtonArea']",d);
									// log("refresh button :"+el);
									if (el) clickElement(el);
									state=-3;
								}});
						}
						break;
					//Quests
					case "Quests":
						if (!_teamState.quests)
						{
							var text=getPlayerState(_teamState.player,"Raid");
							var obj=_raidInfos.filter(function(r){return r.name==text;})[0];
							var quests=_raidDailyQuests.filter(function(q){return q.raid==obj.id;});
							var arr=quests.map(function(q){return q.id;});
							arr=questsHandler(arr);
							_teamState.quests=new Array();
							for(var num1=0;num1<arr.length;num1++)
							{
								if (arr[num1].state==1) _teamState.quests.push(arr[num1].id);
							}
							if (task.o.d) getDivineDaily();
						}
						checkTeamProgress("Quests","Raiding");
						break;
					//Enter
					case "Raiding":
						//log(getPlayerState(_teamState.leaderName,"Raiding"));
						//log(_teamState.isLeader, _teamState.raidIsDone);
						if (_teamState.isLeader && !_teamState.raidIsDone) 
						{
							clickElement($(".raid_btn_enter",d));
							state=-5;
						}
						else if (!_teamState.isLeader && !getPlayerState(_teamState.leaderName,"Raiding"))
						{
							//waiting
						}
						else if (checkTeamProgress("Raiding","Done","Done"))
						{
							_teamState.raidIsDone=true;
							//Calculating gained gold and exp
							showRaidGain(_teamState.playerStats);
							questsHandler(_teamState.quests,true);
						};
						break;
					case "Done":
						if (checkTeamProgress("Done","Completed"))
						{
							clearTeamState(_raidState);
							closeFrame();
						}
						break;
				}
			}
		}
		else if (fr=getFrame("raidshop"))
		{
			var d=fr.document;
			var el=$x1(".//a[contains(text(),'Instance')]",d);
			log(el);
			clickElement(el);
			state=-5;
		}
		else if (fr=getFrame("raidteambag"))
		{
			var d=fr.document;
			var arr1=fr.data;
			var arr2=fr.g_teamArr.map(function(p)
			{
				var text=p.team_pjob;
				switch(text)
				{
					case "Shield Knight":
					case "Berserk Warlord":
						text="Warrior";
						break;
					case "Flame Overlord":
					case "Storm Envoy":
						text="Mage";
						break;
					case "Shadow Master":
					case "Toxic King":
						text="Assassin";
						break;
				}
				p.team_pjob=text;
				return p;
			});
			log(arr2);
			for each(var obj in arr1)
			{
				log(obj);
				var text=unsafeWindow.g_itemdes[obj.item_classid];
				log(text);
				var text=/Class:\s*(\w+)/.test(text)?RegExp.$1:obj.item_req_job;
				switch(text)
				{
					case "101":
						text="Warrior";
						break;
					case "201":
						text="Mage";
						break;
					case "301":
						text="Assassin";
						break;
				}
				log(text);
				
				var pl=arr2.filter(function(p){return p.team_pjob==text;});
				//log(pl);
				//http://kgs4.dc.gamedp.com/ajax/raid/raidTeamBag.ajax.php
				/*
				itemid	94300c1d24b6eaa47d967ee287e9636e
				method	pushitemtoplayer
				pid	89084
				*/
				var num1=pl.length!=0?pl[0].team_pid:arr2[0].team_pid;
				//fr.$.ajax({
				sendAjaxRequest({
					type:"POST",
					async:false,
					dataType:"html",
					url: "/ajax/raid/raidTeamBag.ajax.php",
					data:"itemid="+obj.item_id+"&method=pushitemtoplayer&pid="+num1,
					error:function(xhr,msg){log(msg);},
					success:function(msg)
					{
						setTimeout(log,0,msg);
						var text=replaceSystemMessage(msg);
						log(text);
					}});
			}
			closeFrame();
			getFrame("raid").location.reload();
		}
		else if (fr=getFrame("raid"))
		{
			var d=fr.document;
			el=$("input[value='Confirm']",d);
			//log("confirm button in raid: "+d);
			if (el) clickElement(el);

			//log(_raidIsDone);
			if (_raidIsDone)
			{
				var el=$x1(".//a[contains(text(),'Team Inventory')]",d);
				//log(el);
				if (el) clickElement(el);
				else 
				{
					_teamState.raidIsDone=true;
					fr.exitRaid();
				}
			}
			state=-5;
		}
		else if (fr=getFrame("city"))
		{
			log("Entering mercenary");
			clickElement($x1("//a[contains(text(),'Instance')]"));
			state=-5;
		}
		else if (fr=getFrame("map"))
		{
			log("Entering city");
			clickElement($x1(".//a[contains(text(),'Town')]"));
			state=-5;
		}
		else if (++_autoRaidAntiStick%50==0)
		{
			log("Anti stick closing frame");
			closeFrame();
		}
	}
	return state;
}

var _autoArenaAntiStick=0;
function autoArenaScheduler(task)
{
	var state=-1;
	
	var fr=null;
	if (fr=getFrame("arenaspk"))
	{
		//fighting in arena
		var b=fr.document.body;
		var el=$("#action_content",b);
		if (el && el.textContent.indexOf("You are working")!=-1) 
		{
			//stop working
			log("Stopping work");
			el=$(".m_btn_cancel",b);
			clickElement(el);
		}
		else state=-autoArenaCore();
		if (++_autoArenaAntiStick%50==0)
		{
			log("Anti stick closing frame");
			closeFrame();
		}
	}
	else if (fr=getFrame("arenas")) 
	{
		//in arena
		_autoArenaAntiStick=0;

		state=-autoArenaCore();
		if (state>0)
		{
			exchangeHonor(fr,fr.document);
			state=2;
		}
	}
	else if (fr=getFrame("honorsell"))
	{
		var el=$(".bw_honor_tb",fr.document);
		var arr=new Array();
		for(var num1=1;num1<el.rows.length;num1++)
		{
			var row=el.rows[num1];
			arr.push({n:row.cells[0].textContent.replace(/\s+/m," "),v:row.cells[1].textContent,l:row.cells[2].textContent,m:row.cells[3].children[0].getAttribute("onclick")});
		}
		log(arr);
		for(var num1=0;num1<arr.length;num1++)
		{
			var obj=arr[num1];
			if (obj.n.indexOf("Action Point"))
			{
				log(obj)
				if (obj.l>0)
				{
					log("trading "+obj.n);
					//tradeHonorPoints("acp",num1);
				}
			}
		}
	}
	else if (fr=getFrame("city")) 
	{
		log("Entering arena");
		navigateToIcon("Arena",fr,fr.document);
		state=-5;
	}
	else
	{
		log("Entering city");
		clickElement($x1(".//a[contains(text(),'Town')]"));
		state=-5;
	}
	return state;
}

var _askedForHelp=false;
var _lastQuestion=null;
var _autoQuizAntiStick=0;
function autoQuizScheduler(task)
{
	var state=-0.5;
	if (!!getFrame("quiz"))
	{
		//Quiz main
		var d=getFrame("quiz").document;
		
		if (++_autoQuizAntiStick%50==0)
		{
			log(d.innerHTML);
			log("Anti stick closing frame");
			closeFrame();
		}
		
		var el=$("#noStartMsg",d);
		if (el && isVisible(el))
		{
			_lastQuestion=null;
			_autoQuizAntiStick=0;
			var text=el.textContent.trim();
			log(text);
			
			//Not quiz show time
			if (text.indexOf("Not quiz show time")!=-1)
			{
				log("Not quiz show time");
				state=2;
			}
			
			//You have finished the quiz today, please come tomorrow!
			if (text.indexOf("You have finished the quiz today")!=-1)
			{
				log("You have finished the quiz today");
				state=2;
			}
			
			//Sorry, you have used up your quiz time today!
			if (text.indexOf("Sorry, you have used up your quiz time today!")!=-1)
			{
				log("You have used up your quiz time today");
				state=2;
			}
			
			el=$("#startBtn",d);
			//log("start button",el);
			if (el)
			{
				log("Starting quiz, press start button");
				clickElement(el);
			}
		}
		
		//el=$("#remainTimer",d);
		//log("remaintimer",el);
		//if (el && /(\d+) Min (\d+) Sec/.test(el.textContent))
		if (el=$("#TB_ajaxContent",d))
		{
			_autoQuizAntiStick=0;
			log("Asking for a confirm about: ",el.textContent.trim());
			clickElement($("#TB_ajaxContent input[value='Confirm']",d));
		}
		
		if (_question && _question!=_lastQuestion)
		{
			_autoQuizAntiStick=0;
			//var num2=parseInt(RegExp.$2);
			//log("down timer is running: "+num2);
			
			el=$("#helper1",d);
			//log("helper1",el);
			if (el && isVisible(el))
			{
				log("double score");
				clickElement(el);
				//log("score doubled, state: "+state);
			}
			if ($("#quizBox input:checked",d))
			{
				log("one answer is checked, click submit");
				setTimeout(clickElement,0,$("#submitAnswer",d));
				_askedForHelp=false;
				_lastQuestion=_question;
			}
			else //if (num2<30)
			{
				el=null;
				log("Uhm no answer is checked, it isn't in the db");
				log("Check if already one has been marked as correct");
				var arr=$a("#quizBox dd",d);
				for(var num3=0;num3<arr.length;num3++)
				{
					el1=arr[num3];
					log("answer",el1);
					if (el1 && getStyleValue(el1,"color")) { el=el1; break; }
				}
				log("found answer",el);
				log("asked for help", _askedForHelp);
				if (el)
				{
					log("click the red answer, the marked as correct");
					clickElement(el.getElementsByTagName("input")[0]);
				}
				else if (!_askedForHelp)
				{
					el=null;
					_askedForHelp=true;
					log("no answer marked as correct, ansking for help");
					var arr1=["#helper3","#helper5","#helper6","#helper2"];
					for(var num3=0;num3<arr1.length;num3++)
					{
						var el1=$(arr1[num3],d);
						log("helper",el1);
						if (el1 && isVisible(el1)) {el=el1; break;}
					}
					if (el)
					{
						log("using help "+el.id);
						clickElement(el);
						//state=-3;
					}
				}
				else
				{
					log("No more helps, choose the first one visible");
					for(var num3=0;num3<arr.length;num3++)
					{
						el1=arr[num3];
						log(el1);
						if (el1 && isVisible(el1)) { el=el1; break; }
					}
					log("choosing answer",el);
					clickElement(el);
					clickElement(el.getElementsByTagName("input")[0]);
					clickElement(el.getElementsByTagName("image")[0]);
					clickElement(el.getElementsByTagName("label")[0]);
				}
			}
		}
		// $("#helper1"); //double score
		// $("#helper2"); //remove 1 wrong --> confirm dialog TB_ajaxContent --> confirm
		// $("#helper3"); //get right answer --> confirm dialog TB_ajaxContent --> confirm
		// $("#helper4"); //30 seconds more
		// $("#helper5"); //pay for right answer --> confirm dialog TB_ajaxContent --> confirm
		// $("#helper6"); //pay for right answer --> confirm dialog TB_ajaxContent --> confirm
	}
	else 
	{
		_autoQuizAntiStick=0;
		clickElement($x1("//a[contains(text(),'Quiz Show')]"));
		state=-5;
	}
	return state;
}

function autoClearMailBoxScheduler(task)
{
	var state=-3;
	
	if (!getFrame("mail")) 
	{
		clickElement($x1("//a[contains(text(),'Mail')]"));
		state=-5;
	}
	else
	{
		state=clearMailBox();
	}
	return state;
}

function autoClearInventoryScheduler(task)
{
	var state=-3;
	var fr=getFrame("upgrade");
	if (!fr) 
	{
		clickElement($x1("//a[contains(text(),'Upgrade')]"));
		state=-5;
	}
	else
	{
		clearInventory(null,fr,fr.document);
		state=2;
	}
	return state;
}

function autoWageSystemScheduler(task)
{
	var state=-1;
	
	if (!!getFrame("wage"))
	{
		//Wage main
		var flag=false;
		var b=getFrame("wage").document.body;
		var el=$("#w_day_r_1_1",b);
		if (!flag && el && isVisible(el)) 
		{
			log("Getting the 80 credits achievement");
			clickElement(el); 
			flag=true; 
		}
		el=$("#w_day_r_1_2",b);
		if (!flag && el && isVisible(el)) 
		{ 
			log("Getting the 130 credits achievement");
			clickElement(el); 
			flag=true; 
		}
		el=$("#w_day_r_1_3",b);
		if (!flag && el && isVisible(el)) 
		{ 
			log("Getting the 180 credits achievement");
			clickElement(el); 
			flag=true; 
		}
		el=$("#w_week_r_1",b);
		if (!flag && el && isVisible(el)) 
		{ 
			log("Getting week reward");
			clickElement(el); 
			flag=true; 
		}
		if (!flag) 
		{
			log("No more achivement");
			state=2;
		}
	}
	else 
	{
		clickElement($x1("//a[contains(text(),'Wage System')]"));
		state=-5;
	}
	return state;
}

/********************************************************************/
/*                     Generic help functions                       */
/********************************************************************/
//replaceTimeout();
function replaceTimeout()
{
	unsafeWindow.setTimeout2=unsafeWindow.setTimeout;
	unsafeWindow.setTimeout=function(){
		setTimeout(log,0,"timeout: "+arguments.toSource());
		//ments[1]<60000) arguments[1]=60000;
		unsafeWindow.setTimeout2.apply(this,arguments);
	};
}

//replaceInterval();
function replaceInterval()
{
	unsafeWindow.setInterval2=unsafeWindow.setInterval;
	unsafeWindow.setInterval=function(){
		setTimeout(log,0,"interval: "+arguments.toSource());
		//if (arguments[1]<60000) arguments[1]=60000;
		unsafeWindow.setInterval2.apply(this,arguments);
	};
}

function replaceSystemMessage(msg,noSystemMsg)
{
	var text=msg.replace(/showSystemMsg\('(.*?)'(?:,\d+)?\)/,"showSystemMsg('$1',5,null)").replace(/talert\('(.*?)'(?:,\d+)?\)/,"showSystemMsg('$1',5,null)");
	if (noSystemMsg) text=text.replace(/showSystemMsg/,"void");
	return text;
}

function convertStringToNumbers(data)
{
	if (typeof(data)=="object") data=JSON.stringify(data)
	return JSON.parse(data.replace(/:"(\d+)"/g,":$1"));
}
function toHTML(html,wrap)
{
	var el=$("#hiddenDiv");
	if (el==null)
	{
		el=asb({tag:"div",atts:{id:"hiddenDiv",style:"display:none;visibility:hidden;position:absolute;top:-1000px;left:-1000px;width:0px;height:0px;"}});
	}
	if (wrap) html="<div>"+html+"</div>";
	el.innerHTML=html;
	var el1=XPCNativeWrapper.unwrap(el.firstChild);
	el.innerHTML="";
	return el1;
}

function removeElement(el)
{
	if (el && el.parentNode) el.parentNode.removeChild(el);
}

function firstVisible(snap)
{
	var el=null;
	for(var num1=0;num1<snap.snapshotLength;num1++)
	{
		var el1=snap.snapshotItem(num1);
		if (isVisible(el1)) 
		{
			el=el1;
			break;
		}
	}
	return el;
}

function asb(element) {return as(document.body,element);}

function as(parent,element,before)
{
	var el=parent.ownerDocument.createElement(element.tag);
	if (before==true) parent.parentNode.insertBefore(el,parent);
	else parent.appendChild(el);
	if (element.text) el.textContent=element.text;
	if (element.html) el.innerHTML=element.html;
	if (element.events) for(var event in elements.events) el.addEventListener(event,element.events[event],false);
	if (element.atts) for(var att in element.atts) el.setAttribute(att,element.atts[att]);
	if (element.childs) for(var num1=0;num1<element.childs.length;num1++) as(el,element.childs[num1]);
	return el;
}

function getLocationKey(win)
{
	var key=null;
	if (!win) win=window;
	try
	{
		var href=win.location.toString();
		//log(href);
		var m=/\/(\w+)\.php/.exec(href);
		if (m!=null) key=href.indexOf("magicalmachine")==-1?m[1]:"magicalmachine";
		else if (href.indexOf("kongregate")!=-1) key="kongregate";
	}
	catch(ex){}
	//log(key);
	return key;
}

function getFunction(name)
{
	var func=null;
	try { func=eval(name); /*log("Found function "+name);*/ }
	catch(ex) { /*log("Doesn't exist function "+name);*/ }
	return func;
}

function getStyle(element)
{
	//if image load is disabled and it is checked for a background image doesn't work
	//return element.ownerDocument.defaultView.getComputedStyle(element,null);
	return element.style;
}

function getStyleValue(element,property)
{
	var style=getStyle(element);
	var value=style.getPropertyValue(property);
	log(property+": "+value);
	return value;
}

function isVisible(element)
{
	if (element.tagName=="HTML") return true;
	var style=getStyle(element);
	if (style.getPropertyValue("display")=="none" || style.getPropertyValue("vibility")=="hidden") return false;
	return isVisible(element.parentNode);
}

function fixShowTimeDownFunction(fr)
{
	//fixing bad coded count down function: arena, work, ...
	if (fr.show_time_down)
	{
		var text="var endTime=new Date().getTime()+lefttime*1000; function show_time_down(){var num=endTime-new Date().getTime(); lefttime=Math.round(num/1000); if (lefttime<=0) location.reload(); else {document.getElementById(objname).textContent=document.title=/\\d+:\\d+:\\d+/.exec(new Date(num).toUTCString()); setTimeout(show_time_down,1000-new Date().getMilliseconds());}}";
		setTimeout(fr.eval,0,text);
	}
}

function addToArray(array,value)
{
	if (array.indexOf(value)==-1) array.push(value);
}

function removeFromArray(array,value)
{
	var num=array.indexOf(value);
	array.splice(num,1);
}

function getSelectedValue(sel,doc)
{
	return getSelectedOption(sel,"value",doc);
}

function getSelectedText(sel,doc)
{
	return getSelectedOption(sel,"text",doc);
}

function getSelectedOption(sel,property,doc)
{
	var ret=null;
	if (typeof(sel)=="string") sel=$(sel,doc);
	if (sel) ret=sel.options[sel.selectedIndex];
	if (property)
	{
		ret=ret[property];
		if (/^[-+]?[0-9]*\.?[0-9]*.$/.test(ret)) ret=parseFloat(ret);	
	}
	//log("returning "+ret);
	return ret;
}

function setSelectedOption(sel,text)
{
	for(var num1=0;num1<sel.options.length;num1++)
	{
		//log(sel.options[num1].text);
		var obj=sel.options[num1];
		if (obj.text==text || obj.value==text) 
		{
			sel.selectedIndex=num1;
			break;
		}
	}
}

function getNumber(selector,doc)
{
	var num1=parseInt($(selector,doc).textContent.replace(/,/g,""));
	//log(num1);
	return num1;
}

function formatTime(time)
{
	var num1=Math.round(time%60);
	return Math.floor(time/60)+":"+(num1<10?"0":"")+num1;
}

function formatTime2(time)
{
	var num1=Math.round(time%3600);
	var num2=Math.floor(num1/60);
	var num3=Math.round(num1%60);
	return Math.floor(time/3600)+":"+(num2<10?"0":"")+num2+":"+(num3<10?"0":"")+num3;
}

function formatNumber(number)
{
	return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");
}

function watchSelect(data)
{
	var el=$(data.selector,data.doc);
	//log(data.selector,el);
	if (el!=null)
	{
		//log(el.selectedIndex);
		if (el.selectedIndex!=data.index) 
		{
			data.index=el.selectedIndex;
			data.callback(el);
		}
		//log("setting timeout");
		setTimeout(watchSelect,500,data);
	}
}

function promptDebug(code)
{
	var result=null;
	while(code)
	{
		code=prompt(result,code);
		try{result=eval(code);}
		catch(ex){result=ex.message;}
	}
}

function clickElement(element,posx,posy)
{
	if (element)
	{
		if (!posx && !posy && element.click) 
		{
			//log("using click method");
			element.click();
		}
		else
		{
			var doc=element.ownerDocument;
			var win=doc.defaultView;
			for each(var event in ["mousedown","mouseup","click"]) 
			{
				fireMouseEvent(element,doc,win,event,posx,posy);
			}
		}
	}
	return element;
}

function fireMouseEvent(element,doc,win,event,posx,posy)
{
	var evt = doc.createEvent("MouseEvents");
	evt.initMouseEvent(event,true,true,win,0,0,0,posx,posy,false,false,false,false,0,null);
	element.dispatchEvent(evt);
}

function findPos(obj) 
{
	var left=obj.offsetLeft; 
	var top=obj.offsetTop;
	while ((obj=obj.offsetParent)!=null) 
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
	}
	return [left,top];
}

function getBounds(obj)
{
	var arr=findPos(obj);
	arr[2]=arr[0]+obj.offsetWidth;
	arr[3]=arr[1]+obj.offsetHeight;
	return arr;
}

function isInside(obj,x,y)
{
	var arr=getBounds(obj);
	//log(arr,x,y);
	return x>=arr[0] && x<=arr[2] && y>=arr[1] && y<=arr[3];
}

function setDataKey(key,value)
{
	if (value==null) deleteDataKey(key);
	else GM_setValue(key,value.toSource());
}	
function getDataKey(key,newValue)
{
	return eval(GM_getValue(key,newValue));
}
function deleteDataKey(key)
{
	GM_deleteValue(key);
}

/********************************************************************/
/*                     Data                                         */
/********************************************************************/
var _fixMainStyle=".unselect{-moz-user-select:all!important;}\n.DragBox{-moz-user-select:none;}";

var _imagelessStyle="input[type='checkbox'],input[type='radio']{display:inline !important;}\n";
_imagelessStyle+="input[type='text'],textarea{background-color:white !important;color:black !important;}\n";
_imagelessStyle+="#TB_iframeContent{background-color:black;}\n";
_imagelessStyle+="#TB_closeWindowButton:after{content:'[X]';}\n";
_imagelessStyle+="#exp_state_border{background-color:gray!important}\n";
_imagelessStyle+=".menu_close3:after{content:'[X]';}\n";
_imagelessStyle+=".btn_overraid_en:after{content:'Exit Raid';}\n";
_imagelessStyle+=".item_leader:after{content:'L';color:white;line-height:30px;}\n";
_imagelessStyle+=".itempep_del a[onclick^='kickToTeam']:after{content:'X';color:white;}\n";
_imagelessStyle+=".add_blood:after{content:'+';color:white;}\n";
_imagelessStyle+=".winbox,.g_gwrapcon{background-color:black;}\n";
_imagelessStyle+=".leaderico{background-color:violet; width:80px; height:100px;}\n";
_imagelessStyle+=".name_blood1_b{background:gray!important;}\n";
_imagelessStyle+="img[src*='/raid/event']{background-color:yellow; width:20px; height:20px;}\n";
_imagelessStyle+="img[src*='/raid/monster']{background-color:red; width:20px; height:20px; }\n";
_imagelessStyle+="div[style*='/ui//transport']{background-color:green !important;}\n";
_imagelessStyle+="div[style*='/ui//front']{background-color:gray !important;}\n";
_imagelessStyle+="div[style*='/ui//back']{background-color:blue !important;}\n";
_imagelessStyle+="div[style*='/ui//boss']{background-color:red !important;}\n";
_imagelessStyle+="div[style*='ui//smallboss']{background-color:red !important;}\n";
_imagelessStyle+=".raid_btn_create_unable,.raid_btn_create,.raid_btn_bemercenary_unable, .raid_btn_bemercenary, .raid_btn_enter_unable,.raid_btn_enter,.m_add,.m_re{font-size:12px !important; line-height:18px !important;}\n";
_imagelessStyle+=".finishqico:after{content:'?';color:red;}\n";
_imagelessStyle+=".innerico:after{content:'!';color:red;}\n";
_imagelessStyle+="img[src*='qico_1.gif']:after{content:'?';color:red;}\n";
_imagelessStyle+="img[src*='qico_0.gif']:after{content:'!'}\n";
_imagelessStyle+="img[src*='qico_5.gif']:after{content:'!';color:red;}\n";
_imagelessStyle+="img[src*='vip.gif']:after{content:'v';color:gold}\n";
_imagelessStyle+="div[style*='/ico/armor/']{background-color:green;}\n";
_imagelessStyle+="div[style*='/ico/gem/']{background-color:violet;}\n";
_imagelessStyle+="div[style*='/ico/jewelry/']{background-color:yellow;}\n";
_imagelessStyle+="div[style*='/ico/potion/']{background-color:lightblue;}\n";
_imagelessStyle+="div[style*='/ico/raid/'],div[style*='/ico//raid/']{background-color:purple;}\n";
_imagelessStyle+="div[style*='/ico/rune/']{background-color:gray;}\n";
_imagelessStyle+="div[style*='/ico/weapon/']{background-color:red;}\n";
_imagelessStyle+="div[style*='/ico/quest/']{background-color:white;}\n";
_imagelessStyle+="div[style*='/ico/activities/']{background-color:orange;}\n";
_imagelessStyle+="div[style*='/ico/magicmachine/']{background-color:gold;}\n";
_imagelessStyle+=".shop_menu_1{background-color:red;}\n";
_imagelessStyle+=".shop_menu_2{background-color:green;}\n";
_imagelessStyle+=".shop_menu_3{background-color:yellow;}\n";
_imagelessStyle+=".shop_menu_4{background-color:violet;}\n";
_imagelessStyle+=".shop_menu_5{background-color:lightblue;}\n";
_imagelessStyle+=".DragContainer{background-color:blue;}\n";
_imagelessStyle+=".i_menubar li {width:101px;}\n";
_imagelessStyle+=".i_menubar li a {float:none !important;}\n";
_imagelessStyle+=".i_rolepanel li {width:72px;height:30px;text-align:center;}\n";
_imagelessStyle+=".i_rolepanel li a {display:inline !important;}\n";
_imagelessStyle+=".fight:after{content:'Att';}\n";
_imagelessStyle+=".nfight:after{content:'A.F.';}\n";
_imagelessStyle+=".fightico2:after{content:'A';}\n";
_imagelessStyle+=".seeico:after{content:'V'}\n";
_imagelessStyle+=".map_mail:after{content:'M'}\n";
_imagelessStyle+=".map_friend:after{content:'F'}\n";
_imagelessStyle+=".u_btns li a{text-indent:0px !important;}\n";
_imagelessStyle+=".shs1,.shs2,.shs3,.shs4{text-indent:0px !important;}\n";
_imagelessStyle+="#startBtn:after{content:'Start'; color:white;}\n";
_imagelessStyle+="#helper1:after{content:'D'}\n#helper2:after{content:'W'}\n";
_imagelessStyle+="#helper3:after{content:'R'}\n#helper4:after{content:'T'}\n";
_imagelessStyle+="#helper5:after{content:'B'}\n#helper6:after{content:'B'}\n";
_imagelessStyle+="#fightReportHelper{background-color:#555;}\n";
_imagelessStyle+=".m_add:after{content:'+'}\n";
_imagelessStyle+=".m_re:after{content:'-'}\n";
_imagelessStyle+="#system_time{background:black!important;}\n";
_imagelessStyle+=".i_roleshop_s li a{text-indent:0px !important;}\n";
_imagelessStyle+="a[title='Mall']:after{content:'Mall';}\n";
_imagelessStyle+=".a2n:after{content:'Payment';}\n";
_imagelessStyle+="#get_card_reward_btn:after{content:'Gift';}\n";
_imagelessStyle+="#quizIco:after{content:'Quiz Show'}\n";
_imagelessStyle+=".h_add{text-indent:0px!important;}\n";
_imagelessStyle+=".h_add:after{content:'+'}\n";
//http://i.dc.gamedp.com/ico/tpl/main/chat_ico3.gif
_imagelessStyle+=".ico_clear,.ico_notalk,.ico_smilies,.ico_down,.ico_up,.ico_lock,.ico_lock:hover,.ico_lock_on{background-image:url(data:image/gif;base64,R0lGODlhHgDwAOZtAAAcKAkHEREsN9bV2xU2Rd3a4evr8nSjrv///xoaGiQkJExMTG2apuLi4ZnDyv/VRCU/Tf//tJWZvc7G0v/qaP/YMf7/OJ+gn7t6Gv/MRf/senCeqd30+mCRnWBgX9XV1f/QLf/1WJ+y4+jn6v/6fe2nGfbx8Y69xv/IL+vs7O+zF/S/Pv7/Uv+WEP7/Yv/fZlyTo+28S5ydnf/kS//cUsG6vYo/AP/+pq1iAOPl7/3MO//mVcuRAP6lHLm6uk6DkO3p58Ti6p5aAP/7kvncu6ampv/IFlyLlUl3hP+4D7avt9fX14iVxu/x9PTu619jXo+PkHJxbu7w7bKyr77Bvo2Nieni3dXc23BvZ/329eLf37CvrNnj9Hl2d4Kfzn+DfsTExdfg6/Du84CCf2ZlYq2wrcrMyd3a3d7h3lVVUmxwaYSGgwAAACAhHwAAHgcEDQsJFAAAGwEBAQAABQ0oM2NjY12Pm8bGxG2dqCcoKk5NTiU/Sh4dHQgtNmSSnZ6eniH5BAEAAG0ALAAAAAAeAPAAAAf/gG1ybISFhnJtiYqLjImDPjVgHyYmH2A1PmyIjZyOg4agcpudpKWmnJ+ghaOnimwyej56W0WxejJsrYxsRXlWeWZleU55Rbm6rhcKCApoPssKF8fIbWw+fAh8KR/YfJnUiWx/0A0f0H/T1GwLCAtXZuwL6ep1CHVZTvV18+pkdWlp6pDhRy3VKnAIEypcyLChw4cQI0qcSLEhoUVvAixk86TLMTZRBiacs6BIgTVw2FRBM8YDwVIctxQYUWDdCDFL1qjRiIyNh5k1o3wQc6eJljQ8e46piQWMASkmGlR5aSplFKdZDICRp9BnCgNgzURhk1TdGgMpGhj4MLAAFKqd/950WWLgjgEqWNgUaFDgC9xGAdR0+WDgjLwCiLe4BMeGzGBccNYUmKJnTkI2atR8bPm3VICyFyuKHk26tOnTqFOrjqiKYQI2Q0KAABFiCJsECV+zQHGj9w0ULG4jZGPhRQQNO3ZoiPDCQuddbHZEUCGECBEhKiLsGEQtjoUINHjgiBEDBw8aESy46Z7kxg4aO2a/l54kDvsIM1ZQoEGDwooZEdTXHQtDgGBDCcmVYAMIQ7BgX09sPDBEBUJggIEQFQzxQGg9saADCUbwwIMRJOgQHEKvudCDBixq0IMLwqHIRgY0tNACDRnE2BUoq/Xo449ABinkkER2ogqHw90xAP8HDQzQ5B3PNcJGCkoMkAMXXIQxwAQDRLkIG0EA0WUhA2zRJTiDGJBDOtaEoYk6AkgggipeMIHkKWzscYIDezrg558CeFmNAAcc4ccGG+DBAB4b2AGBoGwAsIEABFRqKQF2BAonDEhswAABAjDAABI/AAApHQfQIcCqrNJxhKY99XGAHUd04AetdviRKqQAALCHAL8CIAAdffRhakFHhlLkssw26+yz0EZrSrIbKcmkkwNAeRmVYxKy5ZmMhckmIay0kuaaD7ER55zJQqonn3/GC6su6hZ6aKKLNvqoOpJSemmlmUIqAKeegioqqcf2hKqqrK7q6rytsCErrbbiqiv1Hbz6CqwAwhJrrKAGJVuutCSXbPLJKKNG6g8st9xyQkicIPPMJ8AAwwlIIISEzTz3jDNCEAQt9A9B2PxzQ0gUfXPOSCt9NENJG8001E5PvVDUSytEABJcY41z1wSAQ0AQP/RsM9EQJASB0jz/wEHYCkHAQc9BpM3Q2jZzYHdDcusdEQRwpyz44ISnzHVESHDAgdVXz+3F4kjPfUDejFOTuNkwQK7z3JhnXrkpl3r9g6V7g+P156ZX7dDpq6vetNQ6u/wD66bTPDPspndu9A9AEyD074AXLvzwxBdv/PHIJ6/88sw37/zz0Ecv/fTUV2/99dibHAgAOw%3D%3D)!important;}\n";
//http://i.dc.gamedp.com/ico/newindex/enchase/ico_new2.gif
_imagelessStyle+=".minusbtn,.addbtn{background-image:url(data:image/gif;base64,R0lGODlhlgDcAOZpABsTDphWGyIXEh4dGyYmIxYOCxgYFSMiH0lHRhISDywrKAgHB0suE////2ZmZldVVplmMzIsKzMyMTs5OTIyLQAAAJn//zMzMzg3NMxmM+TDTczM/5mZmcz//2YzAEpOEcyZM3l6fTs5NWaZmZnMzJmZ/zNmZmb//zMzAGaZAAEJGTNmADP//8zMzFKXAStOXv//M1Xg8mYz/wcuPycYTjMAAGYzzABmmZnMAJlm/2ZmmQD//9TW3zMzmTVXD2ZmMwwoB5mZzF5KnJlmZv/MZszMmQDM/zPM/5nMZgoaL2ZmzGaZzAAzAGbM/4hu3WYzmQAzZpmZMzPMZpkzZpmZZi0EPWY3RDNmmZlmzDOZzBsPGmZmAMz/zABmZv//ZjMzZpmZAADMMzOZAAAAM5lmmQCZzJnM////mT88Of///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGkALAAAAACWANwAAAf/gGmCg2k0OhyEiYqLjI2Oj5CRkpOUlD1KGw0PlZydnp+goYQ9TpkbXwOiqqusrY89NiWZDSU0Bq64ubqcTzY5G8ANQTQJu8bHyGlKMr/AmbULydLTojQ2Ms+mGw8V1N7fkxcyJQ0bsuUNIcXg7O2JHzolsqa/HAru+O4OTjY6DeXMONzKR/AbGRtY/pWQIeRDtIIQpYUQEiSIkCcPCBCIyDHZgwdjBmh82LGkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIdxm40EBFUogJVCR5MWLEiw4jnua7QaJDgw4dLIQN0WCdVm9QLHy1ECOGBbEW/2ZYeHHWm4qvYS2QUNuhiYUKZi7UpfbvhNq3/zqwsGAi6+Bp/96G9drAAouqJh5Lm3FiLeV/LE5g1pzMwb/Kp/+1nUFCMOljHW6wOE35hJEyKjqQfK0LShYWO05b2GH4xgULvI9V2HvkyA61NxYwJpE5+a4rM0awNTLbtAoTf63v8pegi98THWY0eDFX/K7lDThcuOAgRJINI5Z0c68LfgMSS5BAQlP78WfMCyaEIN89Bjbo4IMQRijhhBRWaOGFGGao4YYcdujhhyAitVuIkixg4okjkpiIAQkYQMAPGWRAAIsJDJCKiokkUGMAGsAAgwYayEgjjjkm8IOPP4IAQv+QQxI5CIs9ghCjkgFk8IGOTg5iIwgBKKlkBgGEyWKWggxgQJVcxhgmmAYMlKWZVYYpp5wtkpkGAQPEGSOYYX5gpp14/iDnnmDi6aaTBCigwAdrqqlAm4cSqaiijMppqI12ijTpjDoaYCOmZCaq6AUEdFqjSBvZqeqqrLbq6quwxirrrLTWauutuOaq66689kpTi5AGC6lZTgrAwLHIJosssTgyAMGz0Eb7bAApksjAnNjOWW2I184JgQYeYLstiN3K+W242pJZLrTgiquunEBq4AURQMo57oflZqAkER70a++72LabbpblwovuvwRnKzDCThacLcNEOvwwtWQaq+z/xQwwi6OOHHfcsa8ghyzyyCSXbPLJKKes8sost+zyyzDHLPPMNNcMigA456xzzhM84MDPDjwwAc4HADAAAEgnrfTSTC+NM9I5M72zAABMHTXUO6tkdc4+B/3R1x/9PEQEHABQAdRoS61z0lu37fbbOatUwNxLTxA0AnjnrTcCBGgRAgIALKB0AQDMbbjhSSNeeNNIE74445A7jbTWU/+cNwYzLlBBBQu4SAEKQxDwMwGBD+545KhLTnXVa7P+NNtZp1T5A3hHYICJNA6QgIkfrJACAQj4rEDpTsNt/PHGU56zA3hPMADnB7SpO4ttuoBDAQNMgLcDpAueOvLgH6+S/9K0o3EBizMqQAAFIjhEQARWROFnixeggYADEdjfNdD8979//wD0WgADSDvGjQ9pFxDa+W6XAAJIQAQToAAOUICCFRRgCgf41FJ6hgAFSEB7ewsh3tBgv72VsIQj1BsK8UY7FtYnBA6QwNLkNjehYUB3CjBTBAhwABT0bgULCMMJCkAADDxqAQPAQM8iEAEJ2I+EUIyiFKdIxSpaMYp/Oxzl8CYBAlQgAQqgAAZc5IIZFSAFNQCCFHzgJzQYwH0SCN77JnDFOtrxjlD02QPiJjsBPEBRLEJiE1t0gAUQAAWEQ2MNNLeAD7jATIp6wAE8SEc8WvKSJNweGnB2wD8SwP+QipoABjKYAAT4AI1AcEEBPpCCFODABQfYXaI8GUZM2hKPwXPA5GSnADTgaQEJOMD6IvAoMQIgBWLgAAeoEIUBHMAHKKBALEWChgkIkwC3zOYVEYAGB2xSa2iQQPQMEL1ESXMAaFBADVZggvj8w3afA2KbDhBHVGnznlNMoQC0xrcBANNMIsCTMCOwADAsoAU8KAIHcDgAIBDzkyJBgDOxic+KVrJnDEIJAB5gowrYSJgtcuYKtuACFRShBRygwA6nGb0EeHQAD/BULyuKTyWiQQQPoMD4JPq8WCaAiTw0ABIiwIT4cEAEFKCAmSjQRU+9FAEypSk+HzgB7UVgpxn/BKYBFBUBDFCglAvAQQMc0IIIqNSZO/zk7ZwJ1QHMVKrZlIAEMKDEjJ6kABfI4e7atL71DSACFeCCUZk6RiZmsJA1UoDzJglXbco1qZg74AUySM42yVUEHFhAURFAAQKIYJSxVB85a3SAC0Rgoo2Nq0rNeiONAsCXhewcnh7AgypU4AwNUJ8CDltIkGpOmGg4LEVTi8mkMnF4NOzgEUuVAA44oAJISAf1DCBGBZx2kp1TVFudSVxbdvZ9BCjAASWQVy+ijwOcS0cLwpi/z9JVATqqQKLm4yln6lZ9GhEVfvU7KUXll6vidCueBJyoax7gmqLKb+EOCIAJyNWfbkVD/wUQyoEW+LOI7MMAIT0lV+c588Aa2W9+NQJi/vp3xJsSyacQbGAejlgjRwMAg7OHAQmwaHgLMCoaKGAABDgRTxqxrBJn9NEDC9PIJUbyi0lc4COLJINPLnKRXcxDYcZYxilR2gWqauPn/SOmwgTkOCPQog9OYIErdvGnPnxgNiNZyTYi8YrX3OYPV9nIBmiceLOsZTqOkiwHpm6nYkkBzSWxmpOVXpHbDGVnrpjRTjYwglfsqQGvWcWfUhyWXas0JyKALLfT6o11lN0RXmB60kt1fYUFKRsp2kyXhrWZgjVrYZkpAQbk89IUqwC8kep2m5PtBfI2Ads1Ts+HO9yJHOB3uMKdjml0i9zWlEbDZxdgqysUITclMIC5VSDZ4DbcssNN7mZrmtxL06Kum+ZADGSbmzXunp6/Xe5y6xnZzs73vVPXNAYrbXVJI2eCo4e0sxHubPiu976P/e+mvQ5rAEedzSZO8Ypb/OIYz7jGN87xjnv848Bi9bDsZDGMJUtj1pKWyiFAsYRNbGANeznMIyZziDXLXCq3uYrKFa+e69xacuqX0P0Vpnt5SGIPM3qHkJ4tpXOI6e5yec2dviGozxxHJTf5sVBOIo95HUsfD7vYx072spv97GhPu9rXrqtAAAA7)!important;}\n";
//http://i.dc.gamedp.com/ico/tpl/en/i_welcomebox_btns.gif
_imagelessStyle+=".chat_submit_en{background-image:url(data:image/gif;base64,R0lGODlhRwAmAfeaAGdKJz0iHnlcNzISA6UQEAwHA8SmcB4SCCwqJ1lSTx0OAI5zTyorK7GRYRUNBoEDA9r6/5AJCCILCBwcHGZmZpkAAImBejMzM0Q/PQUDAwsICAYtIw0cJhAPDyI4NAMDAUdJRx0bGbWMRylLQ2YzM/8zM3h6eFdYWzkgHEloYk9aY08OCGYzAB0QBJmZmS48Q8yZZjlKUiEVC3VFDVB5a1hqciQYDDJZTJlmMyooJnMPEYG1qThkVhwcGtjGhp2dns20e4maqysTEDEgEdra2jg4OIGBgZNuaczFxMnJybWhn0RVXaurqy4fEC8vLyMjIzRDSSEgH519eGExMY2NjZubmyYjHaiPiyUdGLu7u8G0signJIuOlNXU1EE8OjxQWxoVEBg/NB8vOD4pFevilmpqaZCpr+PWjykSD0gxIKGnsDAaESJFPSMUBjoaGDomExtEOCg2PyQzPUw0Ii4uLoWFgF4vLzMAAGYAAD86OJ+zsjQcGYKZlW2BeiRMQSw8RaGhrKy1u9DP0SwdD5kzAG10eRQ5MEM/PZlmABIyKhkiKEcwIB0sNGZmAEYwH0AsHRspMiAxPDg0MjQiEk41I0MsFsocGyYZDbcMDMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJoALAAAAABHACYBAAj/ADUJHEiwoMGDCBMqXMjQYImHECNKnCjREoEVDTMypMixI0dLmDSKJOixpKUSllKqXMlypEaWMGPKnKkSo0uDl3IeuHSAAM2fQGsWKHDToIOjDg6sCMp05ooBlxwULXig6oEBPptqTYmpaqVJLKYSTJp0wNazKw44qMQirFiBSdXqOKtVx6SrM/K+FXh1AFa6TAlM8jsp74y9mvxeBczUb6UBhWe4fWt1LuOfOi75hSy5EuK4ES7TJLB5MFgWnvfGxQSTtWhLdiex5Yz68+KVmHLrVum6adeyA5KiHoB46FKuupPvZt37Z4ShQx0UcLAZ8YcPEZRr397cKfS40Ynu//1QwCf387lB0hwAfbr06eLfFjiAvn53mNfz54defIX9/zE9d918301XnA7bEaDggvbFpEMB5PXV1wAHFJedcgtmqGB9MK0wXVWbhfgZARhqqCGHK1k1IYgUIkZfcibGeJ56KRGg4oSKVbjXi7nF6COJ3Kmkw1FqsUihX4gNoNuPPwaZ0pBVaUbhTtXtpSQmTDLpJFR+aaZZX4Mh5h+WWTapHUhQ8XRjTkju5V+ZWW73XHvtaaDBUWLCGadylnhI55/xibWCnnsmxx5S7kmnAX9W/hjBo48W2mOB7/2Zp4mQZpqpjMmltVNVcUnnwJ1SNaqhpo/qsEJUB+jgo26TXP8ySaxWHVWABmqV+lYlp2qqA1SxQueqiblFQAkllXwVa6ysqokYJQuiGoEOas3qwIAFDHsiCcdWwlNOsjHL6rMRKChtcLIeACF0HzyAKbLJNjvrss7uNYmr0qYlK08QfrDoUOVmmOzAOcl6V1Kz5mTdoJk+MG2UPEmH7XWDLriqbN4WbO10Ouko3wCoPrCqmouSRx58DixIbcEd13pnrcUV0PADD0T8qX4nD+VqZvPSWmSuceVqXbaP0iwyUmT1a/JQH+gQW8/xLgrqfDbHvELRNAd3q8QmX6fBgLJ+NXAlx1JyCdXvgfpBcUdFYHTNOYnK7gfXztezbMcCoDcAyB7/QOrLQyFG6gpGj0wr0yf7e8nAGJed995mI0732nu9PMADOog871dn0w1h2MqS/fjepANQybp1f+ZAToRrjvG8nS8+Ntl6j1663pWoRfckbBfsNNSzxmtw47bffntUk1BiW8ErPP16svAOTEntxlcvgAC1f8byJCtsjmzy3cJbfPXGXw8AYuhrlF/6ArXF/kE4U45YW/QnlMn9+Oev//5YVkBABRVwW1oQowP6ua8g+0ugAheYiSXZZCpsoV8ljgIZHTDwggzUzgPEQphZFelyGMxgAxNYLMy5i4MsMI2yHvCf//BPZJABy2Gmkpe21JAFLXRh/jDxtErkRVc3McwM/xAhGSDlED36iwBk2JKXAhCHhpIxDA6PWB/9dY8tjZjBAViACLHU0DCEoCIS8ycYJmqRizMsimQkeCExbieJspHMAdiSLLEkC2O8ciN3dqgDH+aObLKZzE0GhppK6PGN+YuAH7eIGhZIxo7JauQhtbPDFcwgd4604SOnEqJWTTI5+iMAC4JDx0LWcSoSOkAbP6m/Ic0HaETy2E3oZERW4g8Td8hZeIgklvbwyJa3BNTS5DdLpo3pk5gIpYq4tp9evgdByMxN/h4QokpBR5YuUdEqgZmJp2wmV1VxYmqKAqJjIrOSg/nmYMT5RHL6xZznvB8mNqMmqBRAVm0qymZYGP9N3TSQAF4CEavSic2R7PM8tdTh/ZRYz+AcIJ35vEkMt7kkBVWgR0vaI/5+BSx0KSthYpnXRS26IACa1H//2xBGQSlPb65zcT27Cge5R6aT2vSmKqVkSyHDnjkShkI8EctRVnDTohr1f8q55R0o9KFakQWILjHOSf9n1Kqex1aAEhVUR3IUHVT1qzj1ZwMLtEukOdNdRUUVWC+azAZWIDpYJWugXNK2k0pLrREwqjQxEQEiRUVu/TLQVJJi17veNazJxMQDdqITrJpsdSGtRACl5bC3OUxTATxpcuwCL1pFZV0HUN5UZDPZmVnWspg16WaD971YVWoS55vKJa5m2tP/2vZRk1VtbgzX2rOt6xKiLYoDaIs12xr3spACoG5GJjoPtgeyqMRDcY9L3UyxFRP6St4d30MePA1WB9OlGR6oe9rksrV7OWGcur6zVZE4oLKFI9hV7nCH8ZJXtysQ3sGuha32auS9bnsAHgYwu0lo1QF3aJ1xlYtd0eUusPuZ60jaJUDtSo9varKVUhasXBaQjhJ1i7CERSIzkc1ueqSb4Hveo+C3mVQHx9tPd3tp4m7R7naUUEt7PnAA+xrNpIQw3ukmFtIHRA/F5QPAX8mDsRYD2XylowS7CioSSvQReuT7sFfIpqzM0QyAQS6d+Shh4NCK5chZ1hv2IFc22nkZ/4ARAMD15kxn05HtzChes5zFXGc9I1nOM/hynM0HZTpjTyxqJvSc5dznOid60QB4gP8YbehCC+B9mM60pjfN6U57+tOgDrWoR03qUpv61KhOtapXzepWu/rVsI61rGdN61rb+ta4zrWud83rXvcaBsAOtrCHHewGDLsByDY2sYNtAAMQ29jNbkCzp03talNbIMtOtgiSze1tc/vb4A63uMfNbWtjG9jIFsECKs3udrv73fA29AKQPW1sN0AE6j5WAvbN7377+98AD7jAB56A6S2g3ppINw4oQQEXWODhEI+4xCdO8Ypb/OIWcAEFKHFwA5xbBACggAX0nOaSm/zke/8TgAUoAIBmYxvflXAB9mw8u7GN4Q04x/kYas7znvt8bHkTgAsqIW2B3HsBlHAB3+54t54NoQ0KiHrU29CEplv96ljfHO2GXnRN4HvhSv8ey8Z+CRkogAxoR7sCWiCDtrvdBjZwuwzgTve624DsY8cbALjeAIF8PeZ8Exfey66AM5wh6oZfu9Sj3oIWLJ7tjl975Ftw98Gnd3pch4HfRYADwHPO8oT3gQ+iLnrSi770Cjj96B2P+tJX3vLJ2zvR++51zgOezKAnPBCAEPXd9973vw++AoDv+9cPfuuz33znlf55y5u92lJv9toPoABrK57aazc+3mPPd+XfPmHOVwD/vqXeAuqP/wBmHz/5zY9vEShABrmXFeaT73UcCMDzgsd7+t2P/riL3/1t939RN34y4HjjR3nxx32VsG1+hwPLF3i5t3/vlxMSOHcG2H7ZV4Hxtzjzd3ANeH9hlzGWZwOTV3kkyHh3d4Lkl4IlmIAK6IGa4IAP2FpZNwRN0ARD4HQ3mIOzYoODMAg4OC82GIRZ5z2y13UOCIIz93NM2IRO2HMo1n0x6ICTIHO14zhYmIVauIVc2IWOozcLYAGUgGwCIYOUkAAusG7xtoZs2IYCsAAusG9kOIX2RzYih3F4mId6KHEbBwDJVoYyiD0fVYRNxzhQ84ROSAlv6G2A2G6U/9ZoblhpOKCG9kdnC3CJmJiJmIhvtBeJ7VaJdGZ/oiiDpKiJlziJppiKC8CAmmBtrviKsBiLsjiL5taKtHiLsEhv1aaLuFhtAuGK0kZuwjiMxDhuvmiL09YAC4ByzNiM1TNv0uZyyNgAAnCGFHCN2JiN2riN3NiN3viNFFBw8yaN07aMD6eK6JiO6riOpqhxHEeOBtAAAGAB63aFXniP+JiParYALNd10ZZ0S8iEN6dzY1CQO4eIBnmQTDg9Qkd0HmeLSBeCRfh0UtcGUKcAbcCDhEiRGKmRWEc2DemPBhCRS5d/Y2d2aRd1ajd3cmd3dCcD1Kd2B6B9eYd88/aLI/+ZdBAIemZneIdXeId3AJHHeAXIeJMHlCgIegroj8qok7jHk6l3elEpdaqneK03eqo3ejS5PfPHlCSJe4ylf8O3e7xHfLw3lopHlmeJltmnlB34kPH4lSZ5ktVnAHUpfXc5bQoglHU5fX05k7n3grQXl045lywjge3nfgK4fhfol+e3lVx5hIPZlGFnmAUjgf+nmOp3gJnpfo3ZlrDXgZMpl98yeJiJgRfImZvpmZmpAJAJLqL5i5RZkqCngo1HfkWJm5M3ebkJmtsnmLL5lYN4dUM4BEOIg8bZBD+InMXZnMfpkVZnkwtgdJQZkIh4ndgJdHI2dJdInQ1ACfQ4c/n/OJ7kuYVyFoYcR3vJBgBoGJ6e+J5uGIYuYHDqiWzLWAkJcId7uJ/8GXHhCFuY6J2XaJ3ZWaBPyJCZ6HdHx47rxqAOqonXw6C+NqELQRgBcKEYmqEauqEc2qEe+qHplBADgAEEV6ImeqIBRwEYECYFMaIJEAIwGqMyOqM0WqM2eqM4GqMOcAEU0E4DMQkvigAYMKREWqRGeqRImqRKuqREGgIYQAk+qgmUgAEhcAFWOqQXgAFWeqVHuqVciqVfSqRb6gVkaqVlmqVYCqZEigAhkABROqVVuqVDeggX4AR26gR5QKaHoKVeOqZniqZgegFPMAETkAODWqheIKd8qqgX/9Cmb0qlcmqmOUColIqodNqnVjqpE/AEX+qlE0AERECooDoBToCpiqqljloQcOqlQ+oEnwqqsIqoVnqnpZoHrzoBdHABZJoHeVCqgkqoW3CrpUqrrJqljeqmqgqpfeqqXdAFlNqshZoHh0qoTxCs0Lqp07qpTnCo1uqsdJCtnIqpqUoQq2qlCIAAdToBSZAEE4AAg7qum6qu68qu8jqvhDqv7Pqu9AqvUVCv7Gqq4zoQ5XoB55quWZAFuEoHE3CwhMqwC4uwD0ut0+qwFAuxDrupfTqkASsQA4uu6coETJCwEwCyhAqyJhuyIxuy7pqyJluyKEuyLEutp0qlyEquyv9KsOjqqlVQBRMgCcG6s4QKtJTar0CLABMgtEjLs0fLs/26tDx7qsf6qHF6rjk7AVRABZR6tfGqtVaLtV2btV7LtWKLtdOqtTlAsGjKpjUrsJBKteg6qUYQt3K7qVvQr3JrBBMQBXYbt4R6t3g7AXwLuH97t3mbAwVrrhsrpVRKteaaA01bqVGQA5L7uIXruENLuXnbtHpLqJs7tIZ7uASbuHDKuFQruVtwulsguaWbA6erughgupJruq0bu7RLu7PrtluqtlLrtrzbu777u8AbvMIruhjgAMJ7vMibvMGbuANAAQ4QAsobvdK7vE8apS4aAnaSvdq7vdzbvd77veD/m71VigFRKhADYI3gmL7qu77cSL4iGiLwG7/yO7/0W7/2S6H4m7/6ixAW+qH++78A3KEhyr8kiqIGfMACp6IsShDXG5alOXgQUzAQE8EPzDIUrCYdUzA72qMGMQkUcAABcCwkwC0kPMImfMIojMJlM8IrnMImjIUsjIWXUL3JClwhfCwBwC0i7MIxzC03TAkk8MM3PMJTUMRGXMRl88NB7DgBQLyXgKFBnMNTgAJpgAJ2YAdFfKEnnMPcggJGzMUhPMRuIAES4AZjXMZTQAkYCsRBHMNNvLYciwFPrMUhjAJnTMZkvAZTMMIXqsZSLARk7AZ73MdhPAcSAKpkjMgo/+DHXNzGSezEUDzCaXDIsIrIboACc4ACVKzJVEzJEmAHnFzFmDwHa0DGaODJmKzJWLzHS4zDkJyhJGAHEtCseEzLQoACgIzHQnDKtCwBQpDLZHzLuTzGtLwHwOzLGqrGr5yhsowESCABe3DKziwB0uzMzywB1jzN2GzNElDK2jzN1TzNKJChx7LMGIoCEqAFWiABi4DO6kzG75zO6yzPwXzK8DzP8ZzP8+zL4xzG5QzHigtcjBwAk6wESsDOjiABBk3GBt3QB63QB70HpezQD73QEM3QFi0Ec6DGjuPEfozDk3wFVyABj3DKIk3GJ43HpXzSeyABKf3SI+3SI13KMv890nPQx64M0FM6x2s8yVIgBXj809QsAUJN1EBt1EF91EW91EBtz0jdzzf8xo/K0xg6yUdw1VjNz6WM1Ufgy4Cc1RLA1V0d1mN91WTM1fy8xsqs03K8oShA03ic1rgc17c818F8zF4dzDT9y3QN1RlqzufMyYId2IMdAIJ92Iid2IW9ocQLwgH82Bs6CZAd2Y09Kxq6LJZ9ofPioZt92Rja2QKc2QEwCczrvMPz2cPTM6d92Xfz2Xez2hna2qN9ADTMwCSKveGb27q929y7o+5rEOebn+w73MTtjb99EPab3Mq93Pe7v8793NAd3dI93dS9FxmQAQyQ3dq93drdA2D/YAU9EN7eLd5g8N3g3QPcnd49cN2IkQHo/QPwHd/wDQiAwAUmAAL4nd/6rd9FwAAnEAjyLd/0DQJWwN5vgd5cYN8msOAMzuAncAINvuCFEOF1UAYgEOEYzgWCcAIMkAF7YQX3zQD7rd8PXuImfuIofuL4fQIg0AGFsOEe/hYgcAJgwAVBcOM4juNmsONmcOM7nuM+vuOBYAZqUORF3uM+XggdwAVlEONigd8MUAMx8AUxUOVfoAJYnuVavuVc3uUqsARfUANB0AF1AAJOPhVQLuUxAAVT/gVL8OVY/uZyDudyPud2PudVLuZLbuZ70d9RvuZVHgkcMOgc8Ac1cOiI/57oir7ofzDof0Dlen7fZ14UVpDdNcDmMSAGHAABnA4BHKACNQDqoh7qpE7qow7qm+7pKhDmY+7fk34TM84AKjDlL5DqhB4HWB4Ht57rhD7ouK4Cuj7onM4Bl67nZWACr+4S2j3rMVDrw84BcoDlcpDqnh7t1D7scqDrnT7sSwAFeg4CRZDsI0Hgsu4BVc4I1A7tS2Dr3J7uz/7unt7tem4FJyDuIkHuS8AAbP4CkCDsnt7o2+7pNWDrBA/vHCDvrc7nbyHiDLAEHsAAD+8BUDDtBj/o1l7xBv8FUKACfNABFm7vGlEEHP4FEO8BitDrFc8BjBADBe/p7D7sJP8FY/9+4SCfET3QAQwQA9p97Z4uBpq+7RzA8gb/80AfAx4g8x0g8jXfEOCe8xyQ3Sff62JQ5ZpO6FNf9T4/6Fff6xwgBi/AAF/ABS4e7n1eBFYABU+f3R7gAS/Q9m7/9nAf93Lf9mDf8WW+9AyB31ZQ64Oe3n7/94Cv9vo+5pK+F/gNBlAA95gO6Iy/5lCw+FXe+JCf+C+wBDXg8U2+FyLeARyw9p7v+W//+aLP9i+w9m9P+W3v+dfN4ni/EB1gBUXQAdc9+7RP+x1w+xmA+7eP+7Xf+9ed9EXQA4jBADjv538f3lZQ6dud/JVe6Tcf+NlN4LK/F2BA/Lt//dfv+9r/+9j/3/033/oLcd3Qn93ejQXiPd7hXd5YYP7oHfjrDf4K4d4MEODxXeT2PeL43/T/Tf/wDRBq1IDAkiGDJoQJFS5kmLAHAy5cTEykWPHEiYoT+2SsUwZERpBcBJ1gcLDhyZNYTIBgAMLly5cXZc6kWZOmyxMgOvQZaRLlz4QgToDhssPoUaRJlSYNtEPP06dJ+3TgUsYn0J8uGdC4wePGVx4pxI4lW9bsWbE8aOzoUAfEVawntXK9MaIrj7Apwu7Vq5fv37578aa4sZbq27hAizDYWvcrnA2RN/ihUdnyZcyZ/USmXJjtSriJF2JhTMPujTAbIKyGsCEFjdexK8umDZuG/+rWeg0zOBFadFCShHmMwC2ZjVg2xpFLjnw8RfLIq12PMFzGhO/fmhgzIFy3+AY2YSGz3gCHB27ycJKzlp6COlsQRbD/Jsjdw1dD6Mufly6df//WvvPvvQ6w6C27hurjwQO7RsivuM3Ya+2/6AKUrjjTdkMMwYVaYmBBD0JkcDwLA9xPwBIrnC4FPjrwaD7RiiAJRA8SYe7CCzcwhDgcUyTvBg94gO86DhfqoQMGgAwRPenCSI29DW5AcYMnoQRSyA5khDGx+JLcIEQbmQvjq9QkG7NMJyM7kzkqr+RiJ/mKVKiIIrAgTsQQR9BzTz779PNPPYNs0a0t43LJTsnwVIt0UUYbxXOEzzaUUxOXwPizrgYdy1RTTjM9DVO1XLRqUoRa6uBLRvl0lMER8gRURINyKhSrAovowCBcc821A14z6JXXXnUV1qAsi+iB1FKRXGw7ZhnroQcsSGM2WtJIO7JZbFvC4lZkwWAAWHDDHXZcYsM198hZkVV3XXbbdfddeOOVd15667UXqIAAADs%3D)!important;}\n";
//http://i.dc.gamedp.com/ico/tpl/main/index_sp_normal.gif
_imagelessStyle+="#vipicon_1,#vipicon_2,#vipicon_3,#vipicon_4,.i_radar,.zz01,.zz02,.zz03{background-image:url(data:image/gif;base64,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)!important;}\n";

//EST Key Reset Time:
//Action Points: 08:00
//Arena Challenge Times: 0:00
//Instance Challenge Times: 0:00
//Guild Quest: 0:00
//Daily Quests: 7:00 and 19:00
//Quiz Time: all the day on every Monday, Wednesday and Friday
//Maintenance: 03:30 - 04:30
//Arena Reward: 21:00
//Numen Reset (guild quest): 23:00
//n: name, k:option key, a: active, p: priority, s: state, f: from time, t: to time, d: days, c: calling function, i: process id, o: options
//m: message, e: error count, ts: time start, tf: time finish, tt: time tick, td: time delta 
var _schedulerTasks=[
	({n:"Reset",k:null,a:true,p:10,s:0,f:0.00,t:0.01,d:null,c:"autoResetScheduler",i:-1,o:null}),
	({n:"Work",k:"schedulerWork",a:true,p:0,s:0,f:0.00,t:24.00,d:null,c:"autoWorkScheduler",i:-1,o:null}),
	//({n:"Package",k:"schedulerPackage",a:true,p:10,s:0,f:6.10,t:6.15,d:null,c:"autoPackageScheduler",i:-1,o:null}),
	({n:"AP 1",k:"schedulerBuyAP",a:true,p:9,s:0,f:0.10,t:0.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"AP 2",k:"schedulerBuyAP",a:true,p:9,s:0,f:1.10,t:1.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"AP 3",k:"schedulerBuyAP",a:true,p:9,s:0,f:2.10,t:2.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"AP 4",k:"schedulerBuyAP",a:true,p:9,s:0,f:3.10,t:3.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"AP 5",k:"schedulerBuyAP",a:true,p:9,s:0,f:4.10,t:4.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"AP 6",k:"schedulerBuyAP",a:true,p:9,s:0,f:5.10,t:5.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"AP 7",k:"schedulerBuyAP",a:true,p:9,s:0,f:6.10,t:6.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"AP 8",k:"schedulerBuyAP",a:true,p:9,s:0,f:7.10,t:7.15,d:null,c:"autoBuyActionPointScheduler",i:-1,o:null}),
	({n:"Quiz 1",k:"schedulerQuiz",a:true,p:10,s:0,f:0.02,t:1.00,d:[1,3,5],c:"autoQuizScheduler",i:-1,o:null}),
	({n:"Quiz 2",k:"schedulerQuiz",a:true,p:10,s:0,f:4.00,t:5.00,d:[1,3,5],c:"autoQuizScheduler",i:-1,o:null}),
	({n:"Quiz 3",k:"schedulerQuiz",a:true,p:10,s:0,f:8.00,t:9.00,d:[1,3,5],c:"autoQuizScheduler",i:-1,o:null}),
	({n:"Quiz 4",k:"schedulerQuiz",a:true,p:10,s:0,f:12.05,t:13.00,d:[1,3,5],c:"autoQuizScheduler",i:-1,o:null}),
	({n:"Quiz 5",k:"schedulerQuiz",a:true,p:10,s:0,f:16.05,t:17.00,d:[1,3,5],c:"autoQuizScheduler",i:-1,o:null}),
	({n:"Quiz 6",k:"schedulerQuiz",a:true,p:10,s:0,f:20.05,t:21.00,d:[1,3,5],c:"autoQuizScheduler",i:-1,o:null}),
	({n:"Quiz 7",k:"schedulerQuiz",a:true,p:10,s:0,f:23.55,t:24.00,d:[1,3,5],c:"autoQuizScheduler",i:-1,o:null}),
	({n:"Raid 1",k:"schedulerRaid",a:true,p:8,s:0,f:6.00,t:7.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:false,d:false}}),
	({n:"Raid 2",k:"schedulerRaid",a:true,p:8,s:0,f:8.02,t:10.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Raid 3",k:"schedulerRaid",a:true,p:8,s:0,f:10.00,t:12.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Raid 4",k:"schedulerRaid",a:true,p:8,s:0,f:12.00,t:14.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Raid 5",k:"schedulerRaid",a:true,p:8,s:0,f:14.00,t:16.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Raid 6",k:"schedulerRaid",a:true,p:8,s:0,f:16.00,t:18.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Raid 7",k:"schedulerRaid",a:true,p:8,s:0,f:18.00,t:20.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Raid 8",k:"schedulerRaid",a:true,p:8,s:0,f:20.00,t:22.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Raid 9",k:"schedulerRaid",a:true,p:8,s:0,f:22.00,t:24.00,d:null,c:"autoRaidsScheduler",i:-1,o:{f:true,n:true,d:true}}),
	({n:"Quest 1",k:"schedulerQuest",a:true,p:7,s:0,f:6.00,t:7.00,d:null,c:"autoQuestsScheduler",i:-1,o:{r:false}}),
	({n:"Quest 2",k:"schedulerQuest",a:true,p:7,s:0,f:8.02,t:10.00,d:null,c:"autoQuestsScheduler",i:-1,o:{r:true}}),
	({n:"Quest 3",k:"schedulerQuest",a:true,p:7,s:0,f:10.00,t:12.00,d:null,c:"autoQuestsScheduler",i:-1,o:{r:true}}),
	({n:"Quest 4",k:"schedulerQuest",a:true,p:7,s:0,f:12.00,t:14.00,d:null,c:"autoQuestsScheduler",i:-1,o:{r:true}}),
	({n:"Quest 5",k:"schedulerQuest",a:true,p:7,s:0,f:14.00,t:16.00,d:null,c:"autoQuestsScheduler",i:-1,o:{r:true}}),
	({n:"Quest 6",k:"schedulerQuest",a:true,p:7,s:0,f:16.00,t:18.00,d:null,c:"autoQuestsScheduler",i:-1,o:{r:true}}),
	({n:"Arena 1",k:"schedulerArena",a:true,p:3,s:0,f:0.10,t:1.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 2",k:"schedulerArena",a:true,p:3,s:0,f:1.00,t:2.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 3",k:"schedulerArena",a:true,p:3,s:0,f:2.00,t:3.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 4",k:"schedulerArena",a:true,p:3,s:0,f:3.00,t:4.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 5",k:"schedulerArena",a:true,p:3,s:0,f:4.00,t:5.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 6",k:"schedulerArena",a:true,p:3,s:0,f:5.10,t:6.10,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 7",k:"schedulerArena",a:true,p:3,s:0,f:12.00,t:13.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 8",k:"schedulerArena",a:true,p:3,s:0,f:13.00,t:14.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 9",k:"schedulerArena",a:true,p:3,s:0,f:14.00,t:15.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 10",k:"schedulerArena",a:true,p:3,s:0,f:15.00,t:16.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 11",k:"schedulerArena",a:true,p:3,s:0,f:16.00,t:17.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	({n:"Arena 12",k:"schedulerArena",a:true,p:3,s:0,f:17.00,t:18.00,d:null,c:"autoArenaScheduler",i:-1,o:null}),
	//({n:"Guild 1",k:"schedulerGuildQuest",a:true,p:6,s:0,f:5.45,t:6.00,d:null,c:"autoGuildQuestScheduler",i:-1,o:null}),
	({n:"Guild 2",k:"schedulerGuildQuest",a:true,p:6,s:0,f:6.30,t:7.30,d:null,c:"autoGuildQuestScheduler",i:-1,o:null}),
	({n:"Guild 3",k:"schedulerGuildQuest",a:true,p:6,s:0,f:7.45,t:8.00,d:null,c:"autoGuildQuestScheduler",i:-1,o:null}),
	({n:"Guild 4",k:"schedulerGuildQuest",a:true,p:6,s:0,f:8.45,t:9.00,d:null,c:"autoGuildQuestScheduler",i:-1,o:null}),
	({n:"Guild 5",k:"schedulerGuildQuest",a:true,p:6,s:0,f:9.45,t:10.00,d:null,c:"autoGuildQuestScheduler",i:-1,o:null}),
	({n:"Guild 6",k:"schedulerGuildQuest",a:true,p:6,s:0,f:10.45,t:11.00,d:null,c:"autoGuildQuestScheduler",i:-1,o:null}),
	({n:"Guild Welfare 1",k:"schedulerGuildWelfare",a:true,p:5,s:0,f:18.55,t:19.00,d:[6],c:"autoGuildWelfareScheduler",i:-1,o:null}),
	({n:"Guild Welfare 2",k:"schedulerGuildWelfare",a:true,p:5,s:0,f:19.55,t:20.00,d:[6],c:"autoGuildWelfareScheduler",i:-1,o:null}),
	({n:"Guild Welfare 3",k:"schedulerGuildWelfare",a:true,p:5,s:0,f:20.55,t:21.00,d:[6],c:"autoGuildWelfareScheduler",i:-1,o:null}),
	({n:"Guild Welfare 4",k:"schedulerGuildWelfare",a:true,p:5,s:0,f:21.55,t:22.00,d:[6],c:"autoGuildWelfareScheduler",i:-1,o:null}),
	({n:"Guild Welfare 5",k:"schedulerGuildWelfare",a:true,p:5,s:0,f:22.55,t:23.00,d:[6],c:"autoGuildWelfareScheduler",i:-1,o:null}),
	({n:"Guild Welfare 6",k:"schedulerGuildWelfare",a:true,p:5,s:0,f:23.55,t:24.00,d:[6],c:"autoGuildWelfareScheduler",i:-1,o:null}),
	({n:"Wage System 1",k:"schedulerWage",a:true,p:10,s:0,f:9.59,t:10.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Wage System 2",k:"schedulerWage",a:true,p:10,s:0,f:11.59,t:12.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Wage System 3",k:"schedulerWage",a:true,p:10,s:0,f:13.59,t:14.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Wage System 4",k:"schedulerWage",a:true,p:10,s:0,f:15.59,t:16.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Wage System 5",k:"schedulerWage",a:true,p:10,s:0,f:17.59,t:18.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Wage System 6",k:"schedulerWage",a:true,p:10,s:0,f:19.59,t:20.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Wage System 7",k:"schedulerWage",a:true,p:10,s:0,f:21.59,t:22.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Wage System 8",k:"schedulerWage",a:true,p:10,s:0,f:23.59,t:24.00,d:null,c:"autoWageSystemScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 1",k:"schedulerMailBox",a:true,p:1,s:0,f:0.00,t:0.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 2",k:"schedulerMailBox",a:true,p:1,s:0,f:2.00,t:2.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 3",k:"schedulerMailBox",a:true,p:1,s:0,f:4.00,t:4.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 4",k:"schedulerMailBox",a:true,p:1,s:0,f:6.00,t:6.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 5",k:"schedulerMailBox",a:true,p:1,s:0,f:8.00,t:8.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 6",k:"schedulerMailBox",a:true,p:1,s:0,f:10.00,t:10.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 7",k:"schedulerMailBox",a:true,p:1,s:0,f:12.00,t:12.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 8",k:"schedulerMailBox",a:true,p:1,s:0,f:14.00,t:14.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 9",k:"schedulerMailBox",a:true,p:1,s:0,f:16.00,t:16.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 10",k:"schedulerMailBox",a:true,p:1,s:0,f:18.00,t:18.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 11",k:"schedulerMailBox",a:true,p:1,s:0,f:20.00,t:20.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Mail Box 12",k:"schedulerMailBox",a:true,p:1,s:0,f:22.00,t:22.05,d:null,c:"autoClearMailBoxScheduler",i:-1,o:null}),
	({n:"Clear Inventory 1",k:"schedulerInventory",a:true,p:1,s:0,f:10.30,t:10.35,d:null,c:"autoClearInventoryScheduler",i:-1,o:null}),
	({n:"Clear Inventory 2",k:"schedulerInventory",a:true,p:1,s:0,f:12.30,t:12.35,d:null,c:"autoClearInventoryScheduler",i:-1,o:null}),
	({n:"Clear Inventory 3",k:"schedulerInventory",a:true,p:1,s:0,f:14.30,t:14.35,d:null,c:"autoClearInventoryScheduler",i:-1,o:null}),
	({n:"Clear Inventory 4",k:"schedulerInventory",a:true,p:1,s:0,f:16.30,t:16.35,d:null,c:"autoClearInventoryScheduler",i:-1,o:null}),
	({n:"Clear Inventory 5",k:"schedulerInventory",a:true,p:1,s:0,f:18.30,t:18.35,d:null,c:"autoClearInventoryScheduler",i:-1,o:null}),
	({n:"Clear Inventory 6",k:"schedulerInventory",a:true,p:1,s:0,f:20.30,t:20.35,d:null,c:"autoClearInventoryScheduler",i:-1,o:null}),
	({n:"Clear Inventory 7",k:"schedulerInventory",a:true,p:1,s:0,f:22.30,t:22.35,d:null,c:"autoClearInventoryScheduler",i:-1,o:null}),
	({n:"Tournament 1",k:"schedulerTournament",a:true,p:8,s:0,f:15.30,t:15.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 2",k:"schedulerTournament",a:true,p:8,s:0,f:16.30,t:16.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 3",k:"schedulerTournament",a:true,p:8,s:0,f:17.30,t:17.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 4",k:"schedulerTournament",a:true,p:8,s:0,f:18.30,t:18.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 5",k:"schedulerTournament",a:true,p:8,s:0,f:19.30,t:19.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 6",k:"schedulerTournament",a:true,p:8,s:0,f:20.30,t:20.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 7",k:"schedulerTournament",a:true,p:8,s:0,f:21.30,t:21.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 8",k:"schedulerTournament",a:true,p:8,s:0,f:22.30,t:22.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament 9",k:"schedulerTournament",a:true,p:8,s:0,f:23.30,t:23.35,d:null,c:"autoTournamentScheduler",i:-1,o:null}),
	({n:"Tournament Reward 1",k:"schedulerReward",a:true,p:8,s:0,f:15.35,t:15.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 2",k:"schedulerReward",a:true,p:8,s:0,f:16.35,t:16.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 3",k:"schedulerReward",a:true,p:8,s:0,f:17.35,t:17.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 4",k:"schedulerReward",a:true,p:8,s:0,f:18.35,t:18.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 5",k:"schedulerReward",a:true,p:8,s:0,f:19.35,t:19.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 6",k:"schedulerReward",a:true,p:8,s:0,f:20.35,t:20.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 7",k:"schedulerReward",a:true,p:8,s:0,f:21.35,t:21.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 8",k:"schedulerReward",a:true,p:8,s:0,f:22.35,t:22.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
	({n:"Tournament Reward 9",k:"schedulerReward",a:true,p:8,s:0,f:23.35,t:23.40,d:null,c:"autoTournamentRewardScheduler",i:-1,o:null}),
];

var _mapSystem={
	"Dusk Plain":{"Disarn":"To Disarn"},
	"Yaseen":{"Disarn":"Leave Town"},
	"Disarn":{"Yaseen":"Yaseen","Breeze Vale":"To Breeze vale","Dusk Plain":"To Dusk Plain"},
	"Final Battle Camp":{"Orcter":"Leave Town"},
	"Orcter":{"Final Battle Camp":"Final Battle Camp","Crystal Coast":"To Crystal Coast"},
	"Glazed Isle":{"Crystal Coast":"Leave Town"},
	"Crystal Coast":{"Glazed Isle":"Glazed Isle","Unliving Desert":"To Unliving Desert","Orcter":"To Orcter"},
	"Wader Grotto":{"Unliving Desert":"Leave Town"},
	"Unliving Desert":{"Wader Grotto":"Wader grotto","Orcmu":"To Orcmu","Orclar":"To Orclar","Crystal Coast":"To Crystal Coast"},
	"Starry Sentry":{"Orclar":"Leave Town"},
	"Orclar":{"Starry Sentry":"Starry sentry","Orcmu":"To Orcmu","Unliving Desert":"To Unliving desert"},
	"Cold Wind Manor":{"Orcmu":"Leave Town"},
	"Orcmu":{"Cold Wind Manor":"Cold Wind Manor","Breeze Vale":"To Breeze vale","Glancer":"To Glancer","Orclar":"To Orclar","Unliving Desert":"To Unliving desert"},
	"Pandar Prairie":{"Thunderclap":"To Thunderclap"},
	"Thunderclap Town":{"Thunderclap":"Leave Town"},
	"Thunderclap":{"Thunderclap Town":"Thunderclap","Breeze Vale":"To Breeze vale","Pandar Prairie":"To Pandar Prairie"},
	"Breeze Vale":{"Glancer":"To Glancer","Orcmu":"To Orcmu","Disarn":"To Disarn","Thunderclap":"To Thunderclap"},
	"Glancer Town":{"Glancer":"Leave Town"},
	"Glancer":{"Glancer Town":"Glancer","Parpamu":"To Parpamu","Breeze Vale":"To Breeze vale","Orcmu":"To Orcmu"},
	"Parpamu Town":{"Parpamu":"Leave Town"},
	"Parpamu":{"Parpamu Town":"Parpamu","Willshire":"To Willshire","Glancer":"To Glancer"},
	"Willshire Town":{"Willshire":"Leave Town"},
	"Willshire":{"Willshire Town":"Willshire","Parpamu":"To Parpamu"},
};

var _dailyQuests=[
	{id:3907,level:32,quantity:10,gold:1150,exp:1150,name:"Tigerling, you cross the line",monsters:[{n:"Tiger",q:10,l:33}]},
	{id:3908,level:34,quantity:10,gold:1200,exp:1200,name:"Continue to Weaken Orcs",monsters:[{n:"Chaotic Orc Soldier",q:10,l:35}]},
	{id:3909,level:36,quantity:10,gold:1100,exp:1250,name:"May You Rest in Peace, Bandits",monsters:[{n:"Pandar Hawk Warrior",q:10,l:37}]},
	{id:3910,level:38,quantity:10,gold:1300,exp:1300,name:"Dragonet, you cross the line.",monsters:[{n:"Red Dragon Pup",q:10,l:39}]},
	{id:4901,level:39,quantity:10,gold:1300,exp:1300,name:"Teach Lions a Lesson",monsters:[{n:"Lion",q:10,l:41}]},
	{id:4902,level:40,quantity:10,gold:1400,exp:1400,name:"Cobra Problem",monsters:[{n:"Cobra",q:10,l:42}]},
	{id:4903,level:41,quantity:10,gold:1450,exp:1450,name:"Bat Killer",monsters:[{n:"Vampire Bat",q:10,l:43}]},
	{id:4904,level:42,quantity:10,gold:1500,exp:1500,name:"Sighs in the Breeze",monsters:[{n:"Lesser Wind Element",q:10,l:44}]},
	{id:4905,level:43,quantity:10,gold:1550,exp:1550,name:"Black Evils in the Pine Forest",monsters:[{n:"Black Tiger",q:10,l:45}]},
	{id:4906,level:44,quantity:10,gold:1600,exp:1600,name:"Get Rid of Zombies",monsters:[{n:"Zombie",q:10,l:46}]},
	{id:4907,level:45,quantity:10,gold:1650,exp:1650,name:"Disgusting Orcs",monsters:[{n:"Chaotic Orc Centurion",q:10,l:47}]},
	{id:4908,level:46,quantity:10,gold:1700,exp:1700,name:"Give Visitors from Pandar Prairie a Lesson",monsters:[{n:"Pandar Hawk Sorceress",q:10,l:48}]},
	{id:4909,level:47,quantity:10,gold:1750,exp:1750,name:"Endless Rage",monsters:[{n:"Skeleton Archer",q:10,l:49}]},
	{id:4910,level:48,quantity:10,gold:1800,exp:1800,name:"Put Out the Flames",monsters:[{n:"Lesser Fire Element",q:10,l:50}]},
	{id:4911,level:49,quantity:10,gold:1850,exp:1850,name:"White Panther Terminator",monsters:[{n:"White Panther",q:10,l:51}]},
	{id:4912,level:50,quantity:10,gold:1900,exp:1900,name:"Continue to Weaken Orcs",monsters:[{n:"Chaotic Orc Shaman",q:10,l:52}]},
	{id:4913,level:51,quantity:10,gold:1950,exp:1950,name:"Supply Route",monsters:[{n:"Black Bear",q:10,l:53}]},
	{id:4914,level:52,quantity:10,gold:2000,exp:2000,name:"Take Down Raiders",monsters:[{n:"Pandar Hawk Raider",q:10,l:54}]},
	{id:4915,level:53,quantity:10,gold:2100,exp:2100,name:"Dare to Challenge the Rhinos?",monsters:[{n:"Rhino",q:10,l:55}]},
	{id:4916,level:54,quantity:10,gold:2150,exp:2150,name:"Hunt Black Lion",monsters:[{n:"Black Lion",q:10,l:56}]},
	{id:4917,level:55,quantity:10,gold:2200,exp:2200,name:"Kill Ghosts",monsters:[{n:"Icywind Ghost",q:10,l:57}]},
	{id:4918,level:56,quantity:10,gold:2250,exp:2250,name:"Teach Centaurs a Lesson",monsters:[{n:"Tus Combatant",q:10,l:58}]},
	{id:4919,level:59,quantity:10,gold:2300,exp:2300,name:"Orcs' Pets",monsters:[{n:"Chaotic Orc Bloodlust Wolf",q:10,l:59}]},
	{id:4920,level:58,quantity:10,gold:2350,exp:2350,name:"Flying Nightmare",monsters:[{n:"Giant Vampire Bat",q:10,l:60}]},
	{id:4921,level:59,quantity:10,gold:2400,exp:2400,name:"Centaur Archer",monsters:[{n:"Tus Hunter",q:10,l:61}]},
	{id:4922,level:60,quantity:10,gold:2450,exp:2450,name:"Colossus Hunter",monsters:[{n:"Revived Colossus",q:10,l:62}]},
	{id:4923,level:61,quantity:10,gold:2500,exp:2500,name:"Orc Berserks",monsters:[{n:"Chaotic Orc Berserker",q:10,l:63}]},
	{id:4924,level:62,quantity:10,gold:2550,exp:2550,name:"Icy Wind Singing",monsters:[{n:"Icywind Mage",q:10,l:64}]},
	{id:4925,level:63,quantity:10,gold:2600,exp:2600,name:"Dangers in the Rain Forest",monsters:[{n:"Uran",q:10,l:65}]},
	{id:4926,level:64,quantity:10,gold:2650,exp:2650,name:"Megalith Chanter",monsters:[{n:"Magic Stone Skull",q:10,l:66}]},
	{id:4927,level:65,quantity:10,gold:2700,exp:2700,name:"Wind Howl",monsters:[{n:"Wind Element",q:10,l:67}]},
	{id:4928,level:66,quantity:10,gold:2750,exp:2750,name:"Reap Robbers",monsters:[{n:"Pandar Hawk Reaper",q:10,l:68}]},
	{id:4929,level:67,quantity:10,gold:2800,exp:2800,name:"Attack from Draconian",monsters:[{n:"Lacus Defender",q:10,l:69}]},
	{id:4930,level:68,quantity:10,gold:2850,exp:2850,name:"Hunt Pythons",monsters:[{n:"Python",q:10,l:70}]},
	{id:4931,level:71,quantity:10,gold:2900,exp:2900,name:"Chaotic Orc Sentinels",monsters:[{n:"Chaotic Orc Guard",q:10,l:71}]},
	{id:4932,level:71,quantity:10,gold:2950,exp:2950,name:"Kill Draconian Guards",monsters:[{n:"Lacus Soldier",q:10,l:72}]},
	{id:4933,level:72,quantity:10,gold:3000,exp:3000,name:"Purify the Armory: Spirits of Swords",monsters:[{n:"Spirit Of Sword",q:10,l:73}]},
	{id:4934,level:74,quantity:10,gold:3050,exp:3050,name:"Dark Green Crisis",monsters:[{n:"Lacus Patrol",q:10,l:74}]},
	{id:4935,level:73,quantity:10,gold:3100,exp:3100,name:"Purify the Armory: Spirits of Daggers",monsters:[{n:"Spirit Of Dagger",q:10,l:75}]},
	{id:4936,level:74,quantity:10,gold:3150,exp:3150,name:"Eliminate Warlords",monsters:[{n:"Chaotic Orc Warlord",q:10,l:76}]},
	{id:4937,level:75,quantity:10,gold:3200,exp:3200,name:"Purify the Armory: Spirit Of Staffs",monsters:[{n:"Spirit Of Staff",q:10,l:77}]},
	{id:4938,level:76,quantity:10,gold:3250,exp:3250,name:"The Call from the Wilderness",monsters:[{n:"Tyrannosaurus",q:10,l:78}]},
	{id:4939,level:77,quantity:10,gold:3300,exp:3300,name:"Smash Spiritual Source",monsters:[{n:"Chaotic Orc Senior Shaman",q:10,l:79}]},
	{id:4940,level:78,quantity:10,gold:3350,exp:3350,name:"Break down the Defensive Line",monsters:[{n:"Chaotic Orc General",q:10,l:80}]},
	{id:4941,level:55,quantity:10,gold:2200,exp:2200,name:"Dogfight",monsters:[{n:"Boa",q:10,l:57}]},
	{id:4942,level:55,quantity:10,gold:2200,exp:2200,name:"Tiger Paws in the Snow",monsters:[{n:"White Tiger",q:10,l:57}]},
	{id:4943,level:56,quantity:10,gold:2250,exp:2250,name:"Shaking Earth",monsters:[{n:"Earth Element",q:10,l:58}]},
	{id:4944,level:57,quantity:10,gold:2300,exp:2300,name:"Scrambler in the Rain Forest",monsters:[{n:"Lizard",q:10,l:59}]},
	{id:4945,level:59,quantity:10,gold:2400,exp:2400,name:"Explore the Snowfield",monsters:[{n:"White Lion",q:10,l:61}]},
	{id:4946,level:60,quantity:10,gold:2450,exp:2450,name:"Icy and Flaming Altar",monsters:[{n:"Water Element",q:10,l:62}]},
	{id:4947,level:62,quantity:10,gold:2550,exp:2550,name:"Rage Claws in the Snowfield",monsters:[{n:"White Bear",q:10,l:64}]},
	{id:4948,level:63,quantity:10,gold:2600,exp:2600,name:"Centaur Priests",monsters:[{n:"Tus Diviner",q:10,l:65}]},
	{id:4949,level:64,quantity:15,gold:2650,exp:2650,name:"Banish Ghost Dogs",monsters:[{n:"Ghost Dog",q:15,l:66}]},
	{id:4950,level:65,quantity:10,gold:2700,exp:2700,name:"Eliminate Pterosaurs",monsters:[{n:"Pterosaur",q:10,l:67}]},
	{id:4951,level:68,quantity:10,gold:2750,exp:2750,name:"Orc killer",monsters:[{n:"Orc Demoniacal",q:10,l:68}]},
	{id:4952,level:67,quantity:15,gold:2800,exp:2800,name:"Get Rid of Zombies",monsters:[{n:"Cadaver",q:15,l:69}]},
	{id:4953,level:68,quantity:10,gold:2850,exp:2850,name:"Purify the Path",monsters:[{n:"Ghost Mastiff",q:10,l:70}]},
	{id:4954,level:69,quantity:10,gold:2900,exp:2900,name:"Quench the Flame",monsters:[{n:"Fire Element",q:10,l:71}]},
	{id:4955,level:71,quantity:10,gold:2950,exp:2950,name:"Eliminate Headhunters",monsters:[{n:"Pandar Hawk Headhunter",q:10,l:72}]},
	{id:4956,level:71,quantity:10,gold:3000,exp:3000,name:"Clear out the Stegosauruses",monsters:[{n:"Stegosaurus",q:10,l:73}]},
	{id:4957,level:72,quantity:10,gold:3050,exp:3050,name:"Hunt the Ghost Tigers",monsters:[{n:"Ghost Tiger",q:10,l:74}]},
	{id:4958,level:73,quantity:10,gold:3100,exp:3100,name:"Weaken the Bandits",monsters:[{n:"Pandar Hawk Housecarl",q:10,l:75}]},
	{id:4959,level:74,quantity:10,gold:3150,exp:3150,name:"Blockade the Draconian",monsters:[{n:"Lacus Caster",q:10,l:76}]},
	{id:4960,level:77,quantity:15,gold:3250,exp:3250,name:"Tidy up the Manor",monsters:[{n:"Skeleton Swordsman",q:15,l:78}]},
	{id:6089,level:84,quantity:20,gold:31740,exp:6650,name:"Investigation",monsters:[{n:"Chaotic Orc Elite Assassin",q:20,l:84}]},
	{id:6090,level:87,quantity:10,gold:34684,exp:6900,name:"Eliminate Orcs",monsters:[{n:"Orc Elite Housecarl",q:10,l:87}]},
	{id:6091,level:81,quantity:20,gold:28968,exp:9630,name:"Missing seller",monsters:[{n:"Splitpaw Miner",q:20,l:81}]},
	{id:6092,level:83,quantity:20,gold:30799,exp:9855,name:"Revenge",monsters:[{n:"Splitpaw Supervisor",q:20,l:83}]},
	{id:6093,level:85,quantity:20,gold:32704,exp:10095,name:"The Augur's Staff",monsters:[{n:"Splitpaw Augur",q:20,l:85}]},
	{id:6094,level:86,quantity:10,gold:33684,exp:6810,name:"Ancient Guardian",monsters:[{n:"Ancient Guardian",q:10,l:86}]},
	{id:6095,level:87,quantity:20,gold:34684,exp:10350,name:"Sphinx",monsters:[{n:"Androsphinx",q:10,l:87},{n:"Gynosphinx",q:10,l:89}]},
	{id:6096,level:82,quantity:10,gold:29874,exp:6490,name:"Get Lost",monsters:[{n:"Windsong Dryad",q:10,l:82}]},
	{id:6097,level:88,quantity:10,gold:35703,exp:6980,name:"Forbidden Area",monsters:[{n:"Windsong Guardian",q:10,l:88}]},
	{id:6098,level:90,quantity:10,gold:37800,exp:7160,name:"Store Owner",monsters:[{n:"Frost Blue Wyrm",q:10,l:90}]},
	{id:7098,level:91,quantity:20,gold:58320,exp:21712,name:"Worm-removing Activity",monsters:[{n:"Lesser Sandworm",q:20,l:91}]},
	{id:7099,level:92,quantity:20,gold:59985,exp:21962,name:"Dog-hunting Activity",monsters:[{n:"Hotwind Howler",q:20,l:92}]},
	{id:7100,level:93,quantity:20,gold:61500,exp:22214,name:"Giant-worm-removing Activity",monsters:[{n:"Giant Sandworm",q:20,l:93}]},
	{id:7101,level:93,quantity:20,gold:61500,exp:22214,name:"March into the Oasis",monsters:[{n:"Oasis Ghoul",q:20,l:93}]},
	{id:7102,level:94,quantity:20,gold:63330,exp:22472,name:"The Quiet Screamer",monsters:[{n:"Hotwind Screamer",q:20,l:94}]},
	{id:7103,level:95,quantity:20,gold:64995,exp:22736,name:"Attack the Den",monsters:[{n:"Sanded Large Basilisk",q:20,l:95}]},
	{id:7104,level:96,quantity:20,gold:66855,exp:23000,name:"Attack Sandwalker Warriors",monsters:[{n:"Sandstalker Warrior",q:20,l:96}]},
	{id:7105,level:96,quantity:20,gold:66855,exp:23000,name:"Haunting Spirits",monsters:[{n:"Oasis Haunting Spirit",q:20,l:96}]},
	{id:7106,level:97,quantity:20,gold:68655,exp:23272,name:"Eliminate Pythons",monsters:[{n:"Sanded Python",q:20,l:97}]},
	{id:7107,level:98,quantity:20,gold:70485,exp:23456,name:"Genuine Illusion",monsters:[{n:"Sandstalker Wizard",q:20,l:98}]},
	{id:7108,level:99,quantity:20,gold:72345,exp:23822,name:"Remove the Evils",monsters:[{n:"Desert Cutthroat",q:20,l:99}]},
	{id:7109,level:99,quantity:20,gold:72345,exp:22822,name:"The Threat in the Desert",monsters:[{n:"Desert Chanter",q:20,l:99}]},
	{id:7110,level:99,quantity:10,gold:49000,exp:18900,name:"Confront Hotwind Red Dragons",monsters:[{n:"Hotwind Red Dragon",q:10,l:100}]},
	{id:8114,level:100,quantity:10,gold:85800,exp:20087,name:"Doomsday of the Diggers",monsters:[{n:"Windnest Digger",q:10,l:101}]},
	{id:8115,level:101,quantity:10,gold:85800,exp:20087,name:"Doomsday of the Augurs",monsters:[{n:"Windnest Augur",q:10,l:101}]},
	{id:8116,level:101,quantity:10,gold:88029,exp:20306,name:"Doomsday of the Warders and the Scramblers",monsters:[{n:"Gory Warder",q:5,l:102},{n:"Gory Scrambler",q:5,l:102}]},
	{id:8117,level:102,quantity:5,gold:90295,exp:20526,name:"Doomsday of the Inverted-tooth Sharks",monsters:[{n:"Glazed Inverted-tooth Shark",q:5,l:103}]},
	{id:8118,level:103,quantity:10,gold:92600,exp:20752,name:"Doomsday of the Pioneers",monsters:[{n:"Gory Pioneer",q:10,l:104}]},
	{id:8119,level:103,quantity:10,gold:92600,exp:20752,name:"Doomsday of the Crocodiles",monsters:[{n:"Mutant Crocodile",q:10,l:104}]},
	{id:8120,level:104,quantity:10,gold:94943,exp:20979,name:"Doomsday of the Deralok Guards",monsters:[{n:"Deralok Guard",q:10,l:105}]},
	{id:8121,level:104,quantity:10,gold:94943,exp:20979,name:"Doomsday of the Deralok Hunters",monsters:[{n:"Deralok Hunter",q:10,l:105}]},
	{id:8122,level:105,quantity:10,gold:97325,exp:21212,name:"Doomsday of the Horrorscale Warriors",monsters:[{n:"Horrorscale Warrior",q:10,l:106}]},
	{id:8123,level:105,quantity:10,gold:97325,exp:21212,name:"Doomsday of the Priests",monsters:[{n:"Horrorscale Priest",q:10,l:106}]},
	{id:8124,level:106,quantity:10,gold:99745,exp:21446,name:"Doomsday of the Giant Crocodiles",monsters:[{n:"Crystal Crocodile",q:10,l:107}]},
	{id:8125,level:107,quantity:10,gold:102205,exp:21683,name:"Doomsday of the Tidewalkers",monsters:[{n:"Glazed Tidewalker",q:10,l:108}]},
	{id:8126,level:107,quantity:10,gold:102205,exp:21683,name:"Doomsday of the Sentinels",monsters:[{n:"Twilight Sentinel",q:10,l:108}]},
	{id:8127,level:108,quantity:10,gold:104705,exp:21922,name:"Doomsday of the Gory Guardians",monsters:[{n:"Twilight Gory Guardian",q:10,l:109}]},
	{id:8128,level:109,quantity:10,gold:104705,exp:21922,name:"Doomsday of the Horrorscale Green Dragons",monsters:[{n:"Horrorscale GreenDragon",q:10,l:110}]},
	{id:8129,level:109,quantity:10,gold:107244,exp:22165,name:"Doomsday of the Weavers",monsters:[{n:"Nightmare Weaver",q:10,l:110}]},
	{id:9121,level:110,quantity:10,gold:109824,exp:22410,name:"Stalkers",monsters:[{n:"Deralok Stalker",q:5,l:111}]},
	{id:9122,level:110,quantity:10,gold:109824,exp:22410,name:"Vanguards",monsters:[{n:"Chaotic Orc Vanguard",q:5,l:111}]},
	{id:9123,level:111,quantity:10,gold:112444,exp:22642,name:"Dreadmasters",monsters:[{n:"Deralok Dreadmaster",q:5,l:112}]},
	{id:9124,level:111,quantity:10,gold:112444,exp:22642,name:"Red Ants",monsters:[{n:"Ember Red Ant",q:5,l:112}]},
	{id:9125,level:112,quantity:10,gold:115106,exp:22874,name:"Rippers",monsters:[{n:"Deralok Rippers",q:5,l:113}]},
	{id:9126,level:112,quantity:10,gold:115106,exp:22874,name:"Human?",monsters:[{n:"Human Warrior",q:5,l:113}]},
	{id:9127,level:113,quantity:10,gold:117808,exp:23111,name:"Fighters",monsters:[{n:"Chaotic Orc Fighter",q:5,l:114}]},
	{id:9128,level:113,quantity:10,gold:117808,exp:23111,name:"Rats",monsters:[{n:"Flame Rat",q:5,l:114}]},
	{id:9129,level:114,quantity:10,gold:120552,exp:23350,name:"Chiliarches",monsters:[{n:"Chaotic Orc Chiliarch",q:5,l:115}]},
	{id:9130,level:114,quantity:10,gold:120552,exp:23350,name:"Torturers",monsters:[{n:"Despair Cage Torturer",q:5,l:115}]},
	{id:9131,level:115,quantity:10,gold:123338,exp:23593,name:"Forgetful Mermaids",monsters:[{n:"Forgetful Mermaid",q:5,l:115}]},
	{id:9132,level:115,quantity:10,gold:123338,exp:23593,name:"Lieutenant Generals",monsters:[{n:"Chaotic Orc Lieutenant General",q:5,l:116}]},
	{id:9133,level:116,quantity:10,gold:126165,exp:23838,name:"Wizards",monsters:[{n:"Chaotic Wizard",q:5,l:116}]},
	{id:9134,level:116,quantity:10,gold:126165,exp:23838,name:"Striders",monsters:[{n:"Lava Strider",q:5,l:116}]},
	{id:9135,level:117,quantity:10,gold:129036,exp:24085,name:"Wardens",monsters:[{n:"Despair Cage Warden",q:5,l:117}]},
	{id:9136,level:117,quantity:10,gold:129036,exp:24085,name:"Guardians",monsters:[{n:"Elemental Guardian",q:5,l:117}]},
	{id:9137,level:118,quantity:10,gold:131949,exp:24335,name:"Theurgists",monsters:[{n:"Chaotic Orc Theurgist",q:5,l:118}]},
	{id:9138,level:118,quantity:10,gold:131949,exp:24335,name:"Guards",monsters:[{n:"Armored Royal Guard",q:5,l:118}]},
	{id:9139,level:119,quantity:10,gold:134905,exp:24587,name:"Commanders",monsters:[{n:"Chaotic Orc Commander",q:5,l:119}]},
	{id:9140,level:119,quantity:10,gold:134905,exp:24587,name:"Escort Captains",monsters:[{n:"Chaotic Orc Escort Captain",q:5,l:119}]},
	{id:9141,level:119,quantity:10,gold:134905,exp:24587,name:"Envoys",monsters:[{n:"Forgetful Envoy",q:5,l:119}]},
	{id:9142,level:120,quantity:10,gold:137904,exp:24826,name:"Senior Generals",monsters:[{n:"Chaotic Orc Senior General",q:5,l:120}]},
	{id:9143,level:120,quantity:10,gold:137904,exp:24826,name:"Dark Dragon Pups",monsters:[{n:"Dark Dragon Pup",q:5,l:120}]},
	{id:10108,level:121,quantity:10,gold:140947,exp:25066,name:"Predator Hunter",monsters:[{n:"Hungry Predator",q:10,l:121}]},
	{id:10109,level:121,quantity:10,gold:140947,exp:25066,name:"Marksman Hunter",monsters:[{n:"Gray Elf Marksman",q:10,l:121}]},
	{id:10110,level:122,quantity:10,gold:144034,exp:25310,name:"Bear Hunter",monsters:[{n:"Yaso Bear",q:10,l:122}]},
	{id:10111,level:122,quantity:10,gold:144034,exp:25310,name:"Python Hunter",monsters:[{n:"Yaso Python",q:10,l:122}]},
	{id:10112,level:122,quantity:10,gold:144034,exp:25310,name:"Elementalist Hunter",monsters:[{n:"Gray Elf Elementalist",q:10,l:122}]},
	{id:10113,level:123,quantity:10,gold:147166,exp:25556,name:"Fighter Hunter",monsters:[{n:"Darkcliff Dwarf Hammer Fighter",q:10,l:123}]},
	{id:10114,level:123,quantity:10,gold:147166,exp:25556,name:"Vulture Hunter",monsters:[{n:"Scavenging Vulture",q:10,l:123}]},
	{id:10115,level:124,quantity:10,gold:150342,exp:25805,name:"Guardian Hunter",monsters:[{n:"Gray Elf Guardian",q:10,l:124}]},
	{id:10116,level:124,quantity:10,gold:150342,exp:25805,name:"Warhorse Hunter",monsters:[{n:"Undead Warhorse",q:10,l:124}]},
	{id:10117,level:125,quantity:10,gold:153563,exp:26056,name:"Dragon Whelp Hunter",monsters:[{n:"Dark Dragon Whelp",q:10,l:125}]},
	{id:10118,level:125,quantity:10,gold:153563,exp:26056,name:"Knight Hunter",monsters:[{n:"Wandering Knight's Soul",q:10,l:125}]},
	{id:10119,level:126,quantity:10,gold:156829,exp:26309,name:"Ballista Destroyer",monsters:[{n:"Giant Ballista",q:10,l:126}]},
	{id:10120,level:126,quantity:10,gold:156829,exp:26309,name:"Waylayer Hunter",monsters:[{n:"Darkcliff Dwarf Waylayer",q:10,l:126}]},
	{id:10121,level:127,quantity:10,gold:160140,exp:26566,name:"Catapult Destroyer",monsters:[{n:"Giant Catapult",q:10,l:127}]},
	{id:10122,level:127,quantity:10,gold:160140,exp:26566,name:"Night Raider Hunter",monsters:[{n:"Dark Dragon Night Raider",q:10,l:127}]},
	{id:10123,level:128,quantity:10,gold:163498,exp:26825,name:"Turret Destroyer",monsters:[{n:"Turret",q:10,l:128}]},
	{id:10124,level:128,quantity:10,gold:163498,exp:26825,name:"Engineer Hunter",monsters:[{n:"Darkcliff Dwarf Engineer",q:10,l:128}]},
	{id:10125,level:129,quantity:10,gold:166902,exp:27087,name:"Purify the Fallen",monsters:[{n:"Fallen Knight's Soul",q:10,l:129}]},
	{id:10126,level:129,quantity:10,gold:166902,exp:27087,name:"Gobbler Hunter",monsters:[{n:"Dark Dragon Gobbler",q:10,l:129}]},
	{id:10127,level:130,quantity:10,gold:170352,exp:27351,name:"The End of Casters",monsters:[{n:"Dark Dragon Caster",q:10,l:130}]},
	{id:10128,level:130,quantity:10,gold:170352,exp:27351,name:"Purify Corrupters",monsters:[{n:"Dark Dragon Corrupter",q:10,l:130}]},
	{id:12079,level:131,quantity:10,gold:173849,exp:27600,name:"Attack of the Soldiers",monsters:[{n:"Incontrollable Alliance Soldier",q:10,l:131}]},
	{id:12080,level:131,quantity:10,gold:173849,exp:27600,name:"Legend of Ranger",monsters:[{n:"Grey Elf Ranger",q:10,l:131}]},
	{id:12081,level:132,quantity:10,gold:177393,exp:27850,name:"The End of Axer",monsters:[{n:"Darkcliff Axer",q:10,l:132}]},
	{id:12082,level:132,quantity:10,gold:177393,exp:27850,name:"Shame on the Traitors",monsters:[{n:"Disarn Traitors",q:10,l:132}]},
	{id:12083,level:132,quantity:10,gold:177393,exp:27850,name:"Secret of the Altar",monsters:[{n:"Wandering Earth Essence",q:10,l:132}]},
	{id:12084,level:133,quantity:10,gold:180985,exp:28100,name:"Love of the Grey Elf Sailor",monsters:[{n:"Grey Elf Sailor",q:10,l:133}]},
	{id:12085,level:133,quantity:10,gold:180985,exp:28100,name:"Mages's Anger",monsters:[{n:"Insurgent Final Battle Mage",q:10,l:133}]},
	{id:12086,level:134,quantity:10,gold:184624,exp:28350,name:"Guard",monsters:[{n:"Darkcliff Dwarf Guard",q:10,l:134}]},
	{id:12087,level:134,quantity:10,gold:184624,exp:28350,name:"Prier",monsters:[{n:"Prier",q:10,l:134}]},
	{id:12088,level:135,quantity:10,gold:188312,exp:28600,name:"Chanter",monsters:[{n:"Grey Elf Chanter",q:10,l:135}]},
	{id:12089,level:135,quantity:10,gold:188312,exp:28600,name:"Pureblooded Dragon Guard",monsters:[{n:"Dragon Guard",q:10,l:135}]},
	{id:12090,level:136,quantity:10,gold:192047,exp:28850,name:"Controller",monsters:[{n:"Dark Dragon Controller",q:10,l:136}]},
	{id:12091,level:137,quantity:10,gold:195832,exp:29100,name:"End of the Watcher",monsters:[{n:"Dark Dragon Watcher",q:10,l:137}]},
	{id:12092,level:137,quantity:10,gold:195832,exp:29100,name:"Heavy-armed",monsters:[{n:"Darkcliff Expeller",q:10,l:138}]},
	{id:12093,level:138,quantity:10,gold:199665,exp:29350,name:"Angry Element",monsters:[{n:"Irritable Earth Spirit",q:10,l:139}]},
	{id:12094,level:139,quantity:10,gold:203548,exp:29600,name:"Cruel Beast",monsters:[{n:"Dark Dragon Heart Ripper",q:10,l:139}]},
	{id:12095,level:139,quantity:10,gold:203548,exp:29600,name:"Heart Flayer",monsters:[{n:"Dark Dragon Heart Flayer",q:10,l:140}]},
	{id:12084,level:140,quantity:1,gold:180985,exp:28100,name:"Bugged quest gives exp without killing",monsters:[{n:"Grey Elf Sailor",q:0,l:133}]},
];

var _raidInfos=[
	{id:1,level:27,ap:20,f:2,x:5,y:5,quests:3,quantity:18,gold:11205,exp:10920,name:"Claymose Altar"},
	{id:2,level:33,ap:25,f:3,x:5,y:5,quests:3,quantity:15,gold:16965,exp:12945,name:"BloodAxe Camping Ground"},
	{id:3,level:43,ap:30,f:4,x:5,y:5,quests:5,quantity:24,gold:52950,exp:27765,name:"Nether Wind Fort"},
	{id:4,level:52,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:63315,exp:26070,name:"Silent Hill"},
	{id:5,level:57,ap:25,f:3,x:5,y:5,quests:3,quantity:18,gold:64918,exp:22080,name:"Tus Camping Ground"},
	{id:6,level:63,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:99060,exp:31020,name:"Ancient Stone Statue Group"},
	{id:7,level:67,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:130906,exp:34620,name:"Cold Wind Grave"},
	{id:8,level:73,ap:30,f:4,x:5,y:5,quests:5,quantity:20,gold:187075,exp:45808,name:"Orcmu"},
	{id:9,level:77,ap:25,f:3,x:5,y:5,quests:3,quantity:18,gold:114840,exp:27486,name:"Splitpaw Mine"},
	{id:10,level:83,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:211200,exp:55509,name:"Ancient Arena"},
	{id:11,level:87,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:216400,exp:44967,name:"Sandwalker's Den"},
	{id:12,level:93,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:284916,exp:74048,name:"Flaming Dragonnest"},
	{id:13,level:97,ap:25,f:3,x:5,y:5,quests:3,quantity:18,gold:238011,exp:58182,name:"RotTrace Mire"},
	{id:14,level:103,ap:25,f:3,x:5,y:5,quests:3,quantity:18,gold:277800,exp:62256,name:"Mutas Shrine"},
	{id:15,level:107,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:428976,exp:88660,name:"Death Cape"},
	{id:16,level:113,ap:30,f:4,x:5,y:5,quests:5,quantity:23,gold:589040,exp:115555,name:"Orcter"},
	{id:17,level:117,ap:25,f:3,x:5,y:5,quests:4,quantity:18,gold:516144,exp:96340,name:"Despair Plain"},
	{id:18,level:123,ap:25,f:3,x:5,y:5,quests:3,quantity:33,gold:652890,exp:91300,name:"Yaso Peak"},
];

var _raidDailyQuests=[
	{id:3911,raid:1,level:27,quantity:6,gold:3450,exp:3525,name:"Fast Money",monsters:[{n:"Claymos Water Fairy",q:5,l:30},{n:"Foster",q:1,l:32}]},
	{id:3912,raid:1,level:27,quantity:6,gold:3735,exp:3645,name:"Disturbance in Claymose Lake",monsters:[{n:"Younger Claymosfish",q:5,l:29},{n:"Slitus",q:1,l:32}]},
	{id:3913,raid:1,level:27,quantity:6,gold:4020,exp:3750,name:"The Revived Tide Caller",monsters:[{n:"Tide Caller Attendant",q:5,l:31},{n:"Ramo The Tide Caller",q:1,l:33}]},
	{id:3914,raid:2,level:33,quantity:10,gold:5295,exp:4200,name:"Great Challenge",monsters:[{n:"Bloodaxe Trainee",q:5,l:35},{n:"Bloodaxe Torturer",q:5,l:37}],},
	{id:3915,raid:2,level:33,quantity:2,gold:5655,exp:4320,name:"Evil Conspiracy",monsters:[{n:"Osker The Instructor",q:1,l:39},{n:"Toure The Inquisitor",q:1,l:39}]},
	{id:3916,raid:2,level:33,quantity:3,gold:6015,exp:4425,name:"The Sanction of Justice",monsters:[{n:"Bloodaxe Housecarl",q:2,l:38},{n:"Lacker The Bloodaxe",q:1,l:40}]},
	{id:4961,raid:3,level:43,quantity:15,gold:9525,exp:5325,name:"Bloodlust Killer",monsters:[{n:"Netherwind Fort Deadly Bat",q:5,l:45},{n:"Netherwind Fort Caster",q:5,l:46},{n:"Netherwind Fort Patrol",q:5,l:47}]},
	{id:4962,raid:3,level:43,quantity:1,gold:10050,exp:5445,name:"Contamination",monsters:[{n:"Ice Zombie",q:1,l:48}]},
	{id:4963,raid:3,level:43,quantity:1,gold:10575,exp:5550,name:"Captain of Skeleton Archer",monsters:[{n:"Dekerke",q:1,l:49}]},
	{id:4964,raid:3,level:43,quantity:1,gold:11115,exp:5670,name:"Eliminate Lahm the Chamberlain",monsters:[{n:"Chamberlain Lahm",q:1,l:49}]},
	{id:4965,raid:3,level:43,quantity:6,gold:11685,exp:5775,name:"Uphold Justice",monsters:[{n:"Guardian Of Kermit",q:5,l:48},{n:"Comte De Kermit",q:1,l:50}]},
	{id:4966,raid:4,level:52,quantity:5,gold:14790,exp:6345,name:"Stop the Corruption",monsters:[{n:"Pandar Alchemist",q:5,l:55}]},
	{id:4967,raid:4,level:52,quantity:6,gold:15465,exp:6465,name:"Contain the Rampant Disease",monsters:[{n:"Diseaseful Skirmisher",q:5,l:53},{n:"Corpse Controller Jessila",q:1,l:54}]},
	{id:4968,raid:4,level:52,quantity:1,gold:16170,exp:6570,name:"Goodbye, the Evil Alchemy",monsters:[{n:"Madman Talos",q:1,l:56}]},
	{id:4969,raid:4,level:52,quantity:6,gold:16890,exp:6690,name:"The End of Maniacs",monsters:[{n:"Crazy Guardian",q:5,l:57},{n:"Revenger Waynegill",q:1,l:58}]},
	{id:4970,raid:5,level:57,quantity:6,gold:20790,exp:7245,name:"Abnormity",monsters:[{n:"Guard Of Totem",q:5,l:60},{n:"Large-Shield Nicaise",q:1,l:62}]},
	{id:4971,raid:5,level:57,quantity:6,gold:21630,exp:7365,name:"Revenge",monsters:[{n:"Sharp-Teeth Druid",q:5,l:61},{n:"Gath",q:1,l:62}]},
	{id:4972,raid:5,level:57,quantity:6,gold:22498,exp:7470,name:"Temptation of Power",monsters:[{n:"Blind Prophet",q:5,l:63},{n:"Almoss Pontiff",q:1,l:64}]},
	{id:4973,raid:6,level:63,quantity:5,gold:23385,exp:7590,name:"Be quiet!",monsters:[{n:"Large-Rock Soldier",q:5,l:65}]},
	{id:4974,raid:6,level:63,quantity:10,gold:24285,exp:7695,name:"Invasion",monsters:[{n:"X-81 Restorer",q:5,l:67},{n:"G769 Machine-Made Guard",q:5,l:69}]},
	{id:4975,raid:6,level:63,quantity:1,gold:25215,exp:7815,name:"Horrible Dwarfs",monsters:[{n:"R593 Crusher",q:1,l:70}]},
	{id:4976,raid:6,level:63,quantity:2,gold:26175,exp:7920,name:"The Source of Noise",monsters:[{n:"Quarrier Augustine",q:1,l:66},{n:"Black-Iron Gak",q:1,l:68}]},
	{id:4977,raid:7,level:67,quantity:5,gold:30315,exp:8486,name:"Insatiable Greed",monsters:[{n:"Ghoul",q:5,l:71}]},
	{id:4978,raid:7,level:67,quantity:1,gold:32400,exp:8599,name:"Survivor from Abnormality",monsters:[{n:"Black Death Kati",q:1,l:73}]},
	{id:4979,raid:7,level:67,quantity:6,gold:33525,exp:8711,name:"Warrior's Tomb",monsters:[{n:"Pestilential Zombie",q:5,l:72},{n:"Solanum",q:1,l:73}]},
	{id:4980,raid:7,level:67,quantity:6,gold:34666,exp:8824,name:"Purification",monsters:[{n:"Cold Wind Lich",q:5,l:74},{n:"Cremator Murray",q:1,l:75}]},
	{id:4981,raid:8,level:73,quantity:10,gold:35800,exp:8936,name:"Hateful Combination",monsters:[{n:"Cheater",q:5,l:76},{n:"Skinner",q:5,l:76}]},
	{id:4982,raid:8,level:73,quantity:1,gold:36912,exp:9049,name:"Potential Danger",monsters:[{n:"Trap Expert Bayra",q:1,l:78}]},
	{id:4983,raid:8,level:73,quantity:1,gold:37000,exp:9162,name:"Brutal?",monsters:[{n:"Ruthless Ailifen",q:1,l:78}]},
	{id:4984,raid:8,level:73,quantity:6,gold:38123,exp:9274,name:"Nasty Ogre",monsters:[{n:"Cave-Ogre",q:5,l:77},{n:"Weird-Power Batik",q:1,l:78}]},
	{id:4985,raid:8,level:73,quantity:2,gold:39240,exp:9387,name:"Catch the King",monsters:[{n:"Antiquity Shaman",q:1,l:79},{n:"Storm-Summoner Saruka",q:1,l:80}]},
	{id:6102,raid:9,level:77,quantity:6,gold:38280,exp:9162,name:"Beasts' Nature and Research",monsters:[{n:"Atrocious Ravager",q:5,l:81},{n:"Beast-tamer Bassnuer",q:1,l:84}]},
	{id:6103,raid:9,level:77,quantity:6,gold:38280,exp:9162,name:"Gnolls' Sorcery",monsters:[{n:"Splitpaw Devour-moon Priestess",q:5,l:82},{n:"Yeenoghuanna",q:1,l:84}]},
	{id:6104,raid:9,level:77,quantity:6,gold:38280,exp:9162,name:"Teach You How to Be Utterly Isolated",monsters:[{n:"Splitpaw Grayback Fighter",q:5,l:83},{n:"Splitpaw Commander Noah",q:1,l:85}]},
	{id:6109,raid:10,level:83,quantity:15,gold:50520,exp:13623,name:"Powerful Ally",monsters:[{n:"Sphinx Ripper",q:5,l:86},{n:"Sphinx Reaper",q:5,l:86},{n:"Sphinx Crusher",q:5,l:87}]},
	{id:6110,raid:10,level:83,quantity:1,gold:52020,exp:13790,name:"Eidolon Crisis",monsters:[{n:"Sphinx's Eidolon",q:1,l:88}]},
	{id:6111,raid:10,level:83,quantity:1,gold:53550,exp:13962,name:"Colossus Crisis",monsters:[{n:"Sphinx's Colossus",q:1,l:89}]},
	{id:6112,raid:10,level:83,quantity:1,gold:55110,exp:14134,name:"Sphinx and You",monsters:[{n:"Sphinx",q:1,l:90}]},
	{id:7119,raid:11,level:87,quantity:5,gold:52600,exp:10856,name:"Bother from Clan Fighters",monsters:[{n:"Clan Fighter",q:5,l:94}]},
	{id:7120,raid:11,level:87,quantity:6,gold:53800,exp:11107,name:"Strange Theurgy",monsters:[{n:"Clan Theurgist",q:5,l:93},{n:"Theurgy Master Poltan",q:1,l:94}]},
	{id:7121,raid:11,level:87,quantity:6,gold:54800,exp:11368,name:"Philanthropic Merchant",monsters:[{n:"Clan Lurker",q:5,l:92},{n:"Thug Carls",q:1,l:93}]},
	{id:7122,raid:11,level:87,quantity:1,gold:55200,exp:11636,name:"Captain Capus is Calling You",monsters:[{n:"Shaikh Caren",q:1,l:95}]},
	{id:7132,raid:12,level:93,quantity:5,gold:71229,exp:18512,name:"Dragon Extinction",monsters:[{n:"Flame Red Dragon",q:5,l:96}]},
	{id:7133,raid:12,level:93,quantity:5,gold:71229,exp:18512,name:"Prevent Mutation",monsters:[{n:"Mutated Red Dragon",q:5,l:97}]},
	{id:7134,raid:12,level:93,quantity:2,gold:71229,exp:18512,name:"Attack from Prince",monsters:[{n:"Lieutenant Vigna",q:1,l:98},{n:"Hotwind Prince Kha'thalis",q:1,l:99}]},
	{id:7135,raid:12,level:93,quantity:6,gold:71229,exp:18512,name:"Repeated Threat",monsters:[{n:"Hotwind Red Dragon Guardian",q:5,l:96},{n:"Hotwind Dragon King Kha'yelis",q:1,l:100}]},
	{id:8137,raid:13,level:97,quantity:6,gold:79337,exp:19394,name:"A Greedy Merchant",monsters:[{n:"Horrorscale Wizard",q:5,l:102},{n:"Messenger Sardooya",q:1,l:104}]},
	{id:8138,raid:13,level:97,quantity:6,gold:79337,exp:19394,name:"The Nature of Merchants",monsters:[{n:"Horrorscale Rot Devourer",q:5,l:101},{n:"Lord Sardoolan",q:1,l:104}]},
	{id:8139,raid:13,level:97,quantity:6,gold:79337,exp:19394,name:"Alertness",monsters:[{n:"Green Dragon Idol",q:5,l:103},{n:"Geanes the Dreadful Overlord",q:1,l:105}]},
	{id:8148,raid:14,level:103,quantity:6,gold:92600,exp:20752,name:"The Death of Oro",monsters:[{n:"Mutas Judge",q:5,l:105},{n:"Immortal Oro",q:1,l:110}]},
	{id:8149,raid:14,level:103,quantity:6,gold:92600,exp:20752,name:"The Death of Pontiff",monsters:[{n:"Mutas Boa",q:5,l:107},{n:"Pontiff Agade",q:1,l:108}]},
	{id:8150,raid:14,level:103,quantity:6,gold:92600,exp:20752,name:"Guilty Clark",monsters:[{n:"Mutas Fanatic",q:5,l:106},{n:"Bishop Vidasue",q:1,l:109}]},
	{id:9208,raid:15,level:107,quantity:10,gold:107244,exp:22165,name:"Residual Force",monsters:[{n:"Forgetful Singer",q:5,l:112},{n:"Forgetful Performer",q:5,l:113}]},
	{id:9209,raid:15,level:107,quantity:1,gold:107244,exp:22165,name:"Siren Queen",monsters:[{n:"Siren Queen Arkalo",q:1,l:115}]},
	{id:9210,raid:15,level:107,quantity:6,gold:107244,exp:22165,name:"Siren Lord",monsters:[{n:"Forgetful Servant",q:5,l:111},{n:"Lord Woodlino",q:1,l:114}]},
	{id:9211,raid:15,level:107,quantity:1,gold:107244,exp:22165,name:"Evil Draconian",monsters:[{n:"Dark Draconian Envoy",q:1,l:114}]},
	{id:9223,raid:16,level:113,quantity:1,gold:117808,exp:23111,name:"Weight of Soul",monsters:[{n:"Psychic Warlock Breillat",q:1,l:118}]},
	{id:9224,raid:16,level:113,quantity:6,gold:117808,exp:23111,name:"Braveness Again",monsters:[{n:"Glutton",q:5,l:115},{n:"WarGod Debaron",q:1,l:119}]},
	{id:9225,raid:16,level:113,quantity:5,gold:117808,exp:23111,name:"The Simulated",monsters:[{n:"Brutal Wolf Rider",q:5,l:116}]},
	{id:9226,raid:16,level:113,quantity:5,gold:117808,exp:23111,name:"Ancestor’s Soul",monsters:[{n:"Primitive Shaman",q:5,l:117}]},
	{id:9227,raid:16,level:113,quantity:6,gold:117808,exp:23111,name:"Eradicate Remnants",monsters:[{n:"Murderer",q:5,l:114},{n:"Sik the Red Neck",q:1,l:120}]},
	{id:12008,raid:17,level:117,quantity:10,gold:129036,exp:24085,name:"Ongoing Research",monsters:[{n:"Filthy Worm",q:5,l:121},{n:"Filthy Parasite",q:5,l:122}]},
	{id:12009,raid:17,level:117,quantity:6,gold:129036,exp:24085,name:"Knight Elegy",monsters:[{n:"Painful Shadow Knight",q:5,l:123},{n:"Shadow Knight Wallace",q:1,l:124}]},
	{id:12010,raid:17,level:117,quantity:1,gold:129036,exp:24085,name:"Filthy Lord",monsters:[{n:"Filthy Lord",q:1,l:123}]},
	{id:12011,raid:17,level:117,quantity:1,gold:129036,exp:24085,name:"Depraved Envoy",monsters:[{n:"Depraved Mubarth",q:1,l:125}]},
	{id:12118,raid:18,level:123,quantity:11,gold:217393,exp:29850,name:"Lost Bartender",monsters:[{n:"Peaked Deity Figure",q:10,l:126},{n:"Colossus Statue",q:1,l:129}]},
	{id:12119,raid:18,level:123,quantity:11,gold:215832,exp:30100,name:"Target Zorita",monsters:[{n:"Dark Green Dragon",q:10,l:125},{n:"Polluter Zorita",q:1,l:128}]},
	{id:12121,raid:18,level:123,quantity:11,gold:219665,exp:31350,name:"Guardian",monsters:[{n:"Yaso Barbarian Guard",q:10,l:127},{n:"Chieftain Ulothar",q:1,l:130}]},
];

var _hackPasswords=["0","1","2","3","4","5","6","7","8","9","11","12","13","21","22","23","31","32","33","111","222","333","123","132","213","231","312","321","1111","2222","3333","4444","1234","4321","11111","22222","33333","44444","55555","12345","54321","111111","222222","333333","444444","555555","666666","123456","654321","123123","321321"];

var _marketPrices=({"Soul Stone":[0,0], "Lightless Dragonshard":[1000,5000], "Brilliant Dragonshard":[50000,250000], "Prismatic Dragonshard":[2000000,10000000], "Splinter Of Lucky Gem":[100000,200000], "Lesser Lucky Gem":[500000,1000000], "Lucky Gem":[1500000,3000000], "Greater Lucky Gem":[3000000,6000000], "Regal Lucky Gem":[5000000,10000000], "Iridescent Lucky Gem":[0,0], "Lustrous Lucky Gem":[0,0]});

var _quizQuestions=[
	{Q:"A candle burns out in sixty minutes, how many minutes will it take five candles burning together?", A:["60 minutes"]},
	{Q:"A newborn kangaroo is about the size of a __", A:["Lima bean"]},
	{Q:"A teenage girl risks everything when she falls in love with a vampire. Which movie does this plot belong to?", A:["Twilight"]},
	{Q:"According to Japanese legend, a sick person will recover if they fold 1,000 of what type of origami?", A:["Crane"]},
	{Q:"According to eyewitness accounts, what gunslinger could hit a dime nine out of ten times when tossed in the air?", A:["Wild Bill Hickok"]},
	{Q:"According to legend, what three-headed monster was said to guard the entrance to Hades?", A:["Cerberus"]},
	{Q:"According to local legends, what large, nocturnal, red-haired monster roams the Amazon jungle of Brazil?", A:["Mapinguari"]},
	{Q:"After what year did the NHL assume control of Stanley Cup competition?", A:["1926"]},
	{Q:"Against what opposing team did Babe Ruth hit his first career home run?", A:["Boston Red Sox"]},
	{Q:"All cats are born with what color eyes?", A:["Blue"]},
	{Q:"Although Michelangelo never married, he had a special relationship with what woman?", A:["Vittoria Colonna"]},
	{Q:"An earthquake that measures 8 on the Richter Scale would be how many times stronger than an earthquake that measures 4 on the same scale?", A:["10,000 times stronger"]},
	{Q:"Ankara is the capital of which country?", A:["Turkey"]},
	{Q:"Around the time of the solar eclipse of July 11, 1991, what city experienced a wave of UFO sightings?", A:["Mexico City"]},
	{Q:"As of 2004, what was the most commonly sighted bird in the UK?", A:["Wood pigeon"]},
	{Q:"At the age of 13, Michelangelo was apprenticed to what respected painter?", A:["Ghirlandajo"]},
	{Q:"Athens is the capital of which country?", A:["Greece"]},
	{Q:"Berlin is the capital of which country?", A:["Germany"]},
	{Q:"Between 1980 and 1990, the New York Islanders and Edmonton Oilers won a combined total of how many Stanley Cups?", A:["Nine"]},
	{Q:"Buckingham Palace is in which country?", A:["England"]},
	{Q:"By what name is the University of Texas Longhorn mascot known?", A:["Bevo"]},
	{Q:"Canberra is the capital of which country?", A:["Austrailia"]},
	{Q:"Celebration of the Jewish New Year is known as what?", A:["Rosh Hashanah"]},
	{Q:"Cologne Cathedral is located in which country?", A:["Germany"]},
	{Q:"D.J. Spinderella was or is a member of which band?", A:["Salt-n-Pepa"]},
	{Q:"Death Valley is located in what U.S. state?", A:["California"]},
	{Q:"Dexter Holland was or is a member of which band?", A:["The Offspring"]},
	{Q:"Disneyland is in which city?", A:["Anaheim"]},
	{Q:"Dolores ORiordan was or is a member of which band?", A:["Cranberries"]},
	{Q:"During World War II, U.S. pilots began reporting odd balls of light or shiny metallic spheres that could fly circles around their planes. What were these UFOs called?", A:["Foo Fighters"]},
	{Q:"During what ancient festival did masters temporarily serve their slaves?", A:["Saturnalia"]},
	{Q:"For what may a relay team be disqualified?", A:["Losing the baton"]},
	{Q:"Fuji is the highest point in what Asian country?", A:["Japan"]},
	{Q:"Germany is divided into how many states?", A:["16"]},
	{Q:"Henry McCarty was better known by what nickname?", A:["Billy the Kid"]},
	{Q:"Historically, which pathogen or disease has killed the most people?", A:["Malaria"]},
	{Q:"How far is the free throw line from the basket in basketball?", A:["15 feets"]},
	{Q:"How long is an Olympic basketball game?", A:["40 minutes"]},
	{Q:"How long is an international soccer game?", A:["90"]},
	{Q:"How long is one round in professional boxing?", A:["3 mins"]},
	{Q:"How long was the longest singles match in recorded tennis history?", A:["6 hours, 33 minutes"]},
	{Q:"How many Academy Awards did The Lord of the Rings trilogy win?", A:["Seventeen"]},
	{Q:"How many Academy Awards did the first Godfather movie win?", A:["Three"]},
	{Q:"How many NBA teams make the playoffs?", A:["16"]},
	{Q:"How many athletes participated in the 2008 Beijing Olympics?", A:["10,500"]},
	{Q:"How many balls did it take to walk a batter before 1880?", A:["Nine"]},
	{Q:"How many basketball players are on the court per team?", A:["5"]},
	{Q:"How many brains did a Stegosaurus have?", A:["One"]},
	{Q:"How many breeds of dog are there worldwide?", A:["400"]},
	{Q:"How many breeds of domestic cat are there worldwide?", A:["70"]},
	{Q:"How many chipmunks are there in the movie?", A:["Three"]},
	{Q:"How many continents are there on the Earth?", A:["7"]},
	{Q:"How many countries border the Holy Sea?", A:["One"]},
	{Q:"How many countries participated in the Athens Olympics?", A:["201"]},
	{Q:"How many different varieties of goldfish are there?", A:["100"]},
	{Q:"How many events were there at the first Modern Olympic Games in 1896?", A:["43"]},
	{Q:"How many games made up the NFL regular season schedule in 1982?", A:["9 games"]},
	{Q:"How many gold medals did China win at the Atlanta Olympic games?", A:["16"]},
	{Q:"How many gold medals has Michael Phelps won in his career?", A:["14"]},
	{Q:"How many gold medals has US athlete Carl Lewis won?", A:["8"]},
	{Q:"How many gold medals were awarded at the 2008 Beijing Olympics?", A:["302"]},
	{Q:"How many golds did Michael Phelps win during the Beijing Olympics 2008?", A:["8"]},
	{Q:"How many judges are involved in triple jump events?", A:["5"]},
	{Q:"How many lanes are there in an Olympic size swimming pool?", A:["8"]},
	{Q:"How many legs do butterflies have?", A:["Six"]},
	{Q:"How many levels are Olympic judo competitions for men and women divided into, according to their weight?", A:["8"]},
	{Q:"How many lines of code did the Windows 98 operating system contain?", A:["18 million"]},
	{Q:"How many major sports are Summer Paralympic Games competition divided into?", A:["28"]},
	{Q:"How many major sports are the Summer Olympic Games divided into?", A:["28"]},
	{Q:"How many medals did China win in the 2008 Beijing Olympic games?", A:["100"]},
	{Q:"How many members are there in a NASCAR pit crew?", A:["Seven"]},
	{Q:"How many members did the International Olympic Committee initially consist of?", A:["14"]},
	{Q:"How many oceans are there on the Earth?", A:["4"]},
	{Q:"How many of Joe DiMaggios brothers played Major League baseball?", A:["Two"]},
	{Q:"How many people can be in the pool in water polo?", A:["14"]},
	{Q:"How many players are on the field per baseball team?", A:["9"]},
	{Q:"How many players on each team in an ice hockey match?", A:["6"]},
	{Q:"How many points do you get for a free-throw in basketball game?", A:["1"]},
	{Q:"How many presidents has the International Olympic Committee had up until today?", A:["8"]},
	{Q:"How many runs did St. Louis score in the 2004 World Series?", A:["12"]},
	{Q:"How many schools are Karate divided into?", A:["4"]},
	{Q:"How many sessions of the Olympic Games have Chinese athletes participated in?", A:["7"]},
	{Q:"How many species of butterflies are there?", A:["28"]},
	{Q:"How many teams are there in the Football World Cup?", A:["32"]},
	{Q:"How many teams moved to the NBA from the original BBA?", A:["3"]},
	{Q:"How many times can a hummingbird flap its wings per second?", A:["80"]},
	{Q:"How many times did Bjorn Borg win the mens singles finals at Wimbledon?", A:["5"]},
	{Q:"How many times did Tom Tykwer win the Bavarian Film Award?", A:["Three"]},
	{Q:"How many times did the Chinese athletes participate the Olympic Games before 1949?", A:["4"]},
	{Q:"How many times has England won the Football World Cup?", A:["1"]},
	{Q:"How many times have the Winter Olympic Games been held?", A:["18"]},
	{Q:"How many times was Muhammad Ali awarded as the World Heavyweight Champion?", A:["3"]},
	{Q:"How many vollyball teams are there in the Olympic Games?", A:["12"]},
	{Q:"How many volunteers did the Beijing Olympic games have?", A:["100,000"]},
	{Q:"How many weeks did the regular NFL season last in 1992?", A:["18 weeks"]},
	{Q:"How many wings do butterflies have?", A:["Four"]},
	{Q:"How much horse power did the first Porsche 911 have?", A:["130 hp"]},
	{Q:"How often are the Modern Olympic Games held?", A:["4 years"]},
	{Q:"How often are the Olympic games held?", A:["4"]},
	{Q:"How old was Rembrandt at the time of his death?", A:["63"]},
	{Q:"How wide is a regulation NHL rink?", A:["85 ft"]},
	{Q:"If a male cat is both orange and black, he is probably ___.", A:["Sterile"]},
	{Q:"If its body temperature drops below 86 degrees Fahrenheit, a butterfly ___.", A:["Cannot fly"]},
	{Q:"If you are described as brazen, either you are shameless, or you are made of what material?", A:["Brass"]},
	{Q:"If you can swim in the Tiber River, Lake Trasimeno, and Lake Bolsena, what country are you in?", A:["Italy"]},
	{Q:"If you sailed down the Volga River, what sea would you sail into?", A:["Caspian Sea"]},
	{Q:"If you throw a stone into the Red Sea, what will it becomes?", A:["Wet"]},
	{Q:"If you travel directly east from New York City, which continental country will you reach first?", A:["Portugal"]},
	{Q:"If you were visiting the classic sites of Troy and Ephesus, what country would you be in?", A:["Turkey"]},
	{Q:"In 1832, what monster did U.K. representative B.H. Hodson claim to have seen in Nepal?", A:["Abominable Snowman"]},
	{Q:"In 1985, John Howard broke a speed record riding his bike how fast?", A:["152 mph"]},
	{Q:"In 1993, what NFL team made off-season trades for Joe Montana and Marcus Allen?", A:["Oakland Raiders"]},
	{Q:"In 1997, who married Soon-Yi Previn in Venice?", A:["Woody Allen"]},
	{Q:"In 1998, a warehouse worker in the UK was sentenced to five years in prison for stealing more than 300 tons of what candy bar?", A:["Mars Bar"]},
	{Q:"In 2004, who became the oldest golfer to win PGA Tour Rookie of the Year?", A:["Todd Hamilton"]},
	{Q:"In Episode VI: Return of the Jedi, the growls and sounds of the Rancor in Jabbas Palace were actually made by what animal?", A:["Dachsund"]},
	{Q:"In Greek mythology, the story of Lycaon serves as one of the earliest examples of what kind of monster?", A:["Werewolf"]},
	{Q:"In The Godfather, Part II, what country is Michael Corleone considering expanding his gambling operations into?", A:["Cuba"]},
	{Q:"In The Godfather, Part II, what does Vito Corleone receive as payment from his neighbor for hiding a bundle of handguns?", A:["Canoli"]},
	{Q:"In The Return of the King, who kills the Witch King?", A:["Eowyn"]},
	{Q:"In The Simpsons, what is the famous motto for the Springfield Penitentiary?", A:["If you committed murder, youd be home by now!"]},
	{Q:"In The Two Towers, who is Sarumans spy in Rohan?", A:["Grima"]},
	{Q:"In golf, what is another name for a bunker?", A:["Trap"]},
	{Q:"In poker, what is known as the Dead Mans Hand?", A:["Aces and Eights"]},
	{Q:"In the NBA, how many fouls are you allowed per game?", A:["6"]},
	{Q:"In the Netherlands, what is the name of Santa Clauss helper who judges which children were bad during the year?", A:["Black Peter"]},
	{Q:"In the Sistine Chapel, within the ring of prophets and sybils are nine panels on biblical history. Three are devoted to the Creation, three to the story of Adam and Eve, and three to what other biblical event?", A:["The Great Flood"]},
	{Q:"In the early 80s what Dallas Cowboy quarterback was also the punter?", A:["Danny White"]},
	{Q:"In the opening scenes of The Godfather, who is celebrating their wedding?", A:["Connie Corleone"]},
	{Q:"In what city is the Statue of Liberty?", A:["New York"]},
	{Q:"In what country did Picasso die?", A:["France"]},
	{Q:"In what country is The Eiffel Tower?", A:["France"]},
	{Q:"In what horror movie does the protagonist write a book that contains only the line All work and no play makes Jack a dull boy repeated over and over again?", A:["The Shining"]},
	{Q:"In what type of matter are atoms most tightly packed?", A:["Solids"]},
	{Q:"In what year was Fathers Day first celebrated?", A:["1910"]},
	{Q:"In what year was game 3 of the World Series postponed due to an earthquake?", A:["1989"]},
	{Q:"In what year were Japan and Germany not invited to participate in the Olympics?", A:["1948"]},
	{Q:"In which Olympic Games did women first participate?", A:["1900"]},
	{Q:"In which city was the equestrian competition of the Beijing Olympic Games held?", A:["HongKong"]},
	{Q:"In which country is the maple leaf recognized as a national symbol?", A:["Canada"]},
	{Q:"In which mountain range would you find its highest peak called Tirich Mir?", A:["Hindu Kush"]},
	{Q:"In which year did China first win a gold medal?", A:["1984"]},
	{Q:"In which year was the Olympic Academy established?", A:["1961"]},
	{Q:"Iran is slightly larger than what U.S. state?", A:["Alaska"]},
	{Q:"Korea is separated from Japan by what strait?", A:["Tsushima"]},
	{Q:"Lake Okeechobee is located in what U.S. state?", A:["Florida"]},
	{Q:"Liberia borders which country?", A:["Guinea"]},
	{Q:"Located in Tajikistan, it is now called the Ismail Samani Peak. What was it called originally?", A:["Communism Peak"]},
	{Q:"Madrid is the capital of which country?", A:["Spain"]},
	{Q:"Matter that does not enter chemical reactions is described as what?", A:["Inert"]},
	{Q:"Michael Phelps won 8 gold medals in what sport?", A:["Swimming"]},
	{Q:"Moscow is the capital of which country?", A:["Russia"]},
	{Q:"Mt. Fuji is located in which country?", A:["Japan"]},
	{Q:"Name the country in Africa which gets its name after a big lake which is located within its geographical boundaries?", A:["Chad"]},
	{Q:"New Delhi is the capital of which country?", A:["India"]},
	{Q:"No you dont fool me, for the hurt doesnt show, but the pain still grows. Its no stranger to you and me.-Is from what song?", A:["In The Air Tonight"]},
	{Q:"On September 3, 1989, what country abandoned the Football World Cup match in the 2nd half vs. Brazil, and were then banned from participating in the next World Cup?", A:["Chile"]},
	{Q:"On what day did South Park debut?", A:["August 13, 1997"]},
	{Q:"One ostrich egg is equivalent to the weight of how many Chicken eggs?", A:["24"]},
	{Q:"Pablo Picasso was born Pablo _____?", A:["Ruiz"]},
	{Q:"Picasso once said, Art is not the application of a canon of beauty, but what the instinct and the brain can conceive beyond any canon. When we love a woman we dont start measuring her _____?", A:["Limbs"]},
	{Q:"Picasso underwent surgery for what condition in 1965?", A:["Prostate condition"]},
	{Q:"Pierre is the capital of what U.S. state?", A:["South Dakota"]},
	{Q:"Pinto Colvig is better known as the original ____?", A:["Bozo the Clown"]},
	{Q:"Poland is situated on the southern end of what sea?", A:["Baltic Sea"]},
	{Q:"Rembrandt moved to what city in 1631?", A:["Amsterdam"]},
	{Q:"Rembrandt was the chief painter of what school?", A:["Dutch School"]},
	{Q:"Riyadh is the capital of what Middle-Eastern country?", A:["Saudi Arabia"]},
	{Q:"Seoul is the capital of which country?", A:["South Korea"]},
	{Q:"Since when has Juan Antonio Samaranch been the president of the International Olympic Committee?", A:["1980"]},
	{Q:"Sofia is the capital of which country?", A:["Bulgaria"]},
	{Q:"South Park is an animated American television comedy series. Who created it?", A:["Trey Parker and Matt Stone"]},
	{Q:"South Park revolves around the adventures of four boys and their friends living in the small town of South Park. Where is South Park?", A:["Colorado"]},
	{Q:"Sunderban delta is the largest in the world , which two countries share it?", A:["India and Bangladesh"]},
	{Q:"The 2008 Olympic Games were held in which country?", A:["China"]},
	{Q:"The Arc de Triomphe is in which country?", A:["France"]},
	{Q:"The Danube river is located in which area?", A:["Europe"]},
	{Q:"The Dracula legend is believed to be based on what historical figure?", A:["Vlad Tepes"]},
	{Q:"The Godfather movies are based on a novel by what author?", A:["Mario Puzo"]},
	{Q:"The Great Wall is located in which country?", A:["China"]},
	{Q:"The Gulf of Bothnia is surrounded by what two countries?", A:["Sweden and Finland"]},
	{Q:"The James Bond movies are based on a series of novels by what British author?", A:["Ian Fleming"]},
	{Q:"The Kama River is in:", A:["Europe"]},
	{Q:"The Lord of the Rings movies are based on a novel by what author?", A:["J.R.R. Tolkien"]},
	{Q:"The Notre Dame de Paris is the symbol of which country?", A:["France"]},
	{Q:"The Pyramids are the symbol of which country?", A:["Egypt"]},
	{Q:"The Sahara Desert is in which area?", A:["Africa"]},
	{Q:"The Star Wars Holiday Special marked the first appearance of what Star Wars character?", A:["Boba Fett"]},
	{Q:"The Statue of Liberty is in which city?", A:["New York"]},
	{Q:"The Suez Canal is located in which country?", A:["Egypt"]},
	{Q:"The Volga River empties into the:", A:["Caspian Sea"]},
	{Q:"The Zagros mountains are found in what country?", A:["Iran"]},
	{Q:"The abbreviation PDA usually means?", A:["Personal Digital Assistant"]},
	{Q:"The animators who brought the AT-AT Imperial Walkers to life in Episode V: The Empire Strikes Back based their movements on what kind of animal?", A:["Elephant"]},
	{Q:"The character Beatrice from a play by Shakespeare forms a couple with which of these characters?", A:["Benedick"]},
	{Q:"The character Cymbeline from a play by Shakespeare forms a couple with which of these characters?", A:["Posthumus"]},
	{Q:"The character Julia from a play by Shakespeare forms a couple with which of these characters?", A:["Proteus"]},
	{Q:"The character Miranda from a play by Shakespeare forms a couple with which of these characters?", A:["Ferdinand"]},
	{Q:"The character Octavia from a play by Shakespeare forms a couple with which of these characters?", A:["Mark Antony"]},
	{Q:"The character Olivia from a play by Shakespeare forms a couple with which of these characters?", A:["Sebastian"]},
	{Q:"The character Ophelia from a play by Shakespeare forms a couple with which of these characters?", A:["Hamlet"]},
	{Q:"The character Portia from a play by Shakespeare forms a couple with which of these characters?", A:["Brute"]},
	{Q:"The character Regan from a play by Shakespeare forms a couple with which of these characters?", A:["Duke of Cornwall"]},
	{Q:"The character Titania from a play by Shakespeare forms a couple with which of these characters?", A:["Nick Bottom"]},
	{Q:"The closest point to Antarctica is in which country?", A:["Chile"]},
	{Q:"The colors of the five Olympic rings are black, green, red, yellow, and what?", A:["Blue"]},
	{Q:"The computer abbreviation ASP usually means?", A:["Active Server Pages"]},
	{Q:"The computer abbreviation CDI usually means?", A:["Compact Disc Interactive"]},
	{Q:"The computer abbreviation Codec usually means?", A:["Coder/Decoder"]},
	{Q:"The computer abbreviation DEL usually means?", A:["Delete"]},
	{Q:"The computer abbreviation DTD usually means?", A:["Document Type Definition"]},
	{Q:"The computer abbreviation DTP usually means?", A:["DeskTop Publishing"]},
	{Q:"The computer abbreviation EPS usually means?", A:["Encapsulated PostScript"]},
	{Q:"The computer abbreviation FAQ usually means?", A:["Frequently Asked Questions"]},
	{Q:"The computer abbreviation HTML usually means?", A:["Hypertext Markup Language"]},
	{Q:"The computer abbreviation KB usually means?", A:["KiloByte"]},
	{Q:"The computer abbreviation KHz usually means?", A:["KiloHertz"]},
	{Q:"The computer abbreviation OS usually means?", A:["Operating System"]},
	{Q:"The computer abbreviation RAM usually means?", A:["Random Access Memory"]},
	{Q:"The computer abbreviation SQL usually means?", A:["Structured Query Language"]},
	{Q:"The computer abbreviation WWW usually means?", A:["World Wide Web"]},
	{Q:"The first NHL All-Star game was held as a benefit for what injured star?", A:["Ace Bailey"]},
	{Q:"The highest peak in North America is named after a U.S President. Name the president on whos honor the peak is named?", A:["McKinley"]},
	{Q:"The longest river in the world is the Nile. What is the second longest river?", A:["Amazon"]},
	{Q:"The only way to destroy the Ring of Power is to throw it into the fires of ____?", A:["Mount Doom"]},
	{Q:"The real St. Nicholas was born in what modern-day country?", A:["Turkey"]},
	{Q:"The saltiest sea in the world is actually a lake, and is about five times as salty as ocean water. What is the name of this lake?", A:["Dead Sea"]},
	{Q:"The strait off the northwest coast of Denmark is called?", A:["Skagerrak"]},
	{Q:"The temperature at which a gas becomes a liquid is its ___?", A:["Condensation Point"]},
	{Q:"The three main parts of a comet are the nucleus, the tail, and the _____?", A:["Coma"]},
	{Q:"The worlds highest battlefield, the Siachen Glacier, is disputed by which two countries?", A:["Pakistan and India"]},
	{Q:"The yellow-bellied sapsucker is a type of ___.", A:["Woodpecker"]},
	{Q:"There are three men on a train. Mr A speaks English and Chinese. Mr B speaks French and English. Mr C can only talk with Mr A. What language does Mr C speak?", A:["Chinese"]},
	{Q:"There are two Colorado rivers. One runs though Arizona, the other runs through:", A:["Texas"]},
	{Q:"Unlike most other fish, sharks have no ______?", A:["True bones", "True Bones"]},
	{Q:"What 1990 championship sporting event attracted a TV audience of one billion people?", A:["The World Cup"]},
	{Q:"What African ethnic group is known as the people of the veil because the men wear veils that conceal all but their eyes?", A:["Tuareg"]},
	{Q:"What American League pitcher threw a perfect game in game 5 of the 1956 World Series?", A:["Don Larsen"]},
	{Q:"What Baltimore Orioles manager was ejected from a record 91 games?", A:["Earl Weaver"]},
	{Q:"What British holiday is named after a man who tried to blow up a government building?", A:["Guy Fawkes Day"]},
	{Q:"What Chicago Bears runningback was known as The Galloping Ghost?", A:["Harold Grange"]},
	{Q:"What Chinese city is situated at the mouth of the Chang Jiang (Yangtze) River?", A:["Shanghai"]},
	{Q:"What Dallas Cowboy had his helmet stolen at the 1994 Super Bowl?", A:["Emmitt Smith"]},
	{Q:"What Dodger pitcher broke a 62 year old record when he struck out 29 batters in the 1965 World Series?", A:["Don Drysdale"]},
	{Q:"What English chemist and physicist discovered hydrogen?", A:["Henry Cavendish"]},
	{Q:"What European country consists of a boot-shaped peninsula surrounded by four seas?", A:["Italy"]},
	{Q:"What European country is bordered by Slovakia, Ukraine, Romania, Serbia, Croatia, Slovenia, and Austria?", A:["Hungary"]},
	{Q:"What James Bond film features Christopher Walken as billionaire industrialist Max Zorin?", A:["A View to a Kill"]},
	{Q:"What Japanese city is the site of the Peace Memorial Park and the eternal Peace Flame which is never to be extinguished until all nuclear weapons are dismantled?", A:["Hiroshima"]},
	{Q:"What Major League Baseball pitcher holds the all-time career record for earned run average?", A:["Ed Walsh"]},
	{Q:"What Major League Baseball player holds the all-time World Series record for runs batted in?", A:["Mickey Mantle"]},
	{Q:"What Monday Night Football announcer was known as The Mouth?", A:["Howard Cosell"]},
	{Q:"What NBA player besides Michael Jordan won the MVP of the regular season, Championship Series, and All-Star Game in the same season?", A:["Willis Reed"]},
	{Q:"What NBA player has played more playoff minutes than any other?", A:["Wilt Chamberlain"]},
	{Q:"What NBA player holds the record for all-time career points?", A:["Kareem Abdul-Jabbar"]},
	{Q:"What NBA player holds the record for most teams played on in a career?", A:["Moses Malone"]},
	{Q:"What NBA player played the most games without being fouled out?", A:["Wilt Chamberlain"]},
	{Q:"What NBA player retired unexpectedly on November 7, 1991?", A:["Michael Jordan"]},
	{Q:"What NBA player scored 100 points on March 2, 1962?", A:["Wilt Chamberlain"]},
	{Q:"What NBA player was known as the Admiral?", A:["David Robinson"]},
	{Q:"What NBA player was named both MVP and Rookie of the Year in 1960?", A:["Wilt Chamberlain"]},
	{Q:"What NBA player was named the Best Defensive Player of the Year in 1995, 1997, and 1998?", A:["Dikembe Mutombo"]},
	{Q:"What NBA team has the most regular season wins?", A:["Chicago Bulls"]},
	{Q:"What NBA team scored a record 10,371 points in the 1981-82 season for an average of 126.5 points per game?", A:["Denver Nuggets"]},
	{Q:"What NBA team was known as the Original bad boys?", A:["Detroit"]},
	{Q:"What NFL player holds the all-time career record for touchdowns?", A:["Jerry Rice"]},
	{Q:"What NHL team has reached the Stanley Cup Finals 21 times, and won 13 Stanley Cup Championships?", A:["Toronto Maple Leafs"]},
	{Q:"What National League team refused to play the Boston Americans in 1904, causing the World Series to be canceled?", A:["New York Giants"]},
	{Q:"What Norwegian city hosted the 1994 Winter Olympic Games?", A:["Lillehammer"]},
	{Q:"What Olympiad is the 2004 Athens Olympic Games?", A:["26"]},
	{Q:"What Tampa Bay Lightning player scored the Stanley Cup-winning goal in 2004?", A:["Ruslan Fedotenko"]},
	{Q:"What U.S. President once reported seeing a UFO?", A:["Jimmy Carter"]},
	{Q:"What U.S. state boasts the following rivers: the Guadalupe, Trinity, Rio Grande, Brazos, and Colorado?", A:["Texas"]},
	{Q:"What Wimbledon tennis champ was nicknamed Superbrat?", A:["John McEnroe"]},
	{Q:"What actor made his first appearance as James Bond in GoldenEye?", A:["Pierce Brosnan"]},
	{Q:"What actor pulled out of Episode III: Revenge of the Sith when he discovered that non-union actors were being used in the film?", A:["Gary Oldman"]},
	{Q:"What actor was originally cast as Aragorn?", A:["Stuart Townsend"]},
	{Q:"What actor won an Academy Award for his performance in The Godfather?", A:["Marlon Brando"]},
	{Q:"What ancient Roman holiday was held to exorcise vampire-like ghosts of the dead?", A:["Lemuria"]},
	{Q:"What animal can jump as high as a tree?", A:["All animals"]},
	{Q:"What animal has the highest blood pressure?", A:["Giraffe"]},
	{Q:"What animal has the longest lifespan?", A:["Giant tortoise"]},
	{Q:"What animal undertakes the worlds longest migration each year?", A:["Arctic Tern"]},
	{Q:"What are microscopic spheres of 60 atoms of pure carbon in a spherelike structure that resembles a geodesic dome?", A:["Buckyballs"]},
	{Q:"What are people who study or collect butterflies called?", A:["Lepidopterists"]},
	{Q:"What are substances that control the rates of chemical reactions?", A:["Catalysts"]},
	{Q:"What are the two middle distance Olympic track events?", A:["800 and 1500 meters"]},
	{Q:"What art movement was Yoko Ono associated with during the 1960s?", A:["Fluxus"]},
	{Q:"What artist was struck in the face with a mallet by an envious rival, disfiguring him for life?", A:["Michelangelo"]},
	{Q:"What baseball player was nicknamed Charlie Hustle?", A:["Pete Rose"]},
	{Q:"What bird has such a long tail that, when taking flight from a branch, it must launch itself backwards in order to avoid ripping the tail to shreds?", A:["Quetzal"]},
	{Q:"What bird has the largest wingspan?", A:["Wandering albatross"]},
	{Q:"What bird has the longest lifespan?", A:["Parrot"]},
	{Q:"What bird inflates a bright red balloon on its neck to attract a mate?", A:["Magnificent frigate bird"]},
	{Q:"What boxer holds the record for youngest professional debut?", A:["Teddy Baldock"]},
	{Q:"What breed of cat has a reputation for being cross-eyed?", A:["Siamese"]},
	{Q:"What breed of cat has no tail?", A:["Manx"]},
	{Q:"What breed of dog has the longest ears?", A:["Basset Hound"]},
	{Q:"What breed of dog was originated in Germany by a tax collector who needed a guard dog for protection?", A:["Dobermann"]},
	{Q:"What breed of dog was originated in the late 1800s by Captain Max von Stephanitz who hoped to develop an all-purpose working dog?", A:["German Shepherd"]},
	{Q:"What breed of domestic cat has the longest fur?", A:["Persian"]},
	{Q:"What candy bar claims to be named after one of U.S. President Grover Clevelands children?", A:["Baby Ruth"]},
	{Q:"What candy bar consists of a coconut center topped with an almond and coated with milk chocolate?", A:["Almond Joy"]},
	{Q:"What candy bar was called a Raider bar in France and Germany until 1991?", A:["Twix"]},
	{Q:"What candy bar was included in U.S. solders rations during World War II?", A:["Heath Bar"]},
	{Q:"What candy bar was invented by the Curtiss Candy Company of Chicago in 1923?", A:["Butterfinger"]},
	{Q:"What candy bar was originally introduced in the UK?as Rowntrees Chocolate Crisp?", A:["Kit Kat"]},
	{Q:"What candy bar was originally packaged to include three separate pieces of candy flavored vanilla, chocolate, and strawberry?", A:["3 Musketeers"]},
	{Q:"What car sold more than one million units in 1965, setting a record that still stands today?", A:["Chevrolet Impala"]},
	{Q:"What character did George Lucas once consider making a midget?", A:["Luke Skywalker"]},
	{Q:"What character in The Godfather is known as The Turk?", A:["Virgil Sollozzo"]},
	{Q:"What child actress was originally offered the role of Regan MacNeill in The Exorcist?", A:["Dana Plato"]},
	{Q:"What city is nicknamed the City of Brotherly Love?", A:["Philadelphia"]},
	{Q:"What city is nicknamed the Film Capital of the World?", A:["Hollywood"]},
	{Q:"What city is nicknamed the Fun City?", A:["New York"]},
	{Q:"What city is nicknamed the Golden Gate?", A:["San Francisco"]},
	{Q:"What city is nicknamed the Hub of the Universe?", A:["Boston"]},
	{Q:"What city is nicknamed the Windy City?", A:["Chicago"]},
	{Q:"What city is the capital of Australia?", A:["Canberra"]},
	{Q:"What classic horror movie features a serial killer in a William Shatner mask?", A:["Halloween"]},
	{Q:"What classic horror movie was originally titled The Babysitter Murders?", A:["Halloween"]},
	{Q:"What college basketball team has won the most NCAA titles?", A:["UCLA"]},
	{Q:"What college did Magic Johnson play for?", A:["Michigan State"]},
	{Q:"What color are the American robins eggs?", A:["Blue"]},
	{Q:"What color is Mace Windus lightsaber in Episode II: Attack of the Clones?", A:["Purple"]},
	{Q:"What color strip across the rear of a racecar signifies a rookie driver?", A:["Yellow"]},
	{Q:"What computer device did Douglas Engelbart invent in 1963?", A:["Mouse"]},
	{Q:"What country borders Latvia to the north?", A:["Estonia"]},
	{Q:"What country borders Switzerland to the west?", A:["France"]},
	{Q:"What country did modern soccer originate in?", A:["England"]},
	{Q:"What country does not share a border with Saudi Arabia?", A:["Bahrein"]},
	{Q:"What country has participated in every olympic games?", A:["New Zealand"]},
	{Q:"What country has the regions which are popularly known as the Fish-Hook and Parrots Beak?", A:["Cambodia"]},
	{Q:"What country has won the most Olympic medals?", A:["USA"]},
	{Q:"What country has won the most gold medals in the Winter Olympics?", A:["Norway"]},
	{Q:"What country is directly east of Alaska?", A:["Canada"]},
	{Q:"What country is geographically separated from continental Europe by the Pyrenees mountains?", A:["Spain"]},
	{Q:"What country is home to Kangaroo Island?", A:["Australia"]},
	{Q:"What country is south of Egypt?", A:["Sudan"]},
	{Q:"What country is the largest country in the world?", A:["Russia"]},
	{Q:"What country, known as Druk Yul (Land of the Thunder Dragon), is sandwiched between China and India?", A:["Bhutan"]},
	{Q:"What does Don Corleone have in his mouth when he dies?", A:["Orange"]},
	{Q:"What does everybody do at the same time?", A:["Grow old"]},
	{Q:"What dog is known for its bluish-black tongue?", A:["Chow Chow"]},
	{Q:"What driver holds the record for most consecutive NASCAR championships?", A:["Cale Yarborough"]},
	{Q:"What driver won the most Nextel Cup Series Championships during the 1990s?", A:["Dale Earnhardt"]},
	{Q:"What explanation was offered to explain a UFO sighting near Kyoto, Japan, in 1235?", A:["Wind blowing the stars about"]},
	{Q:"What famous Old West figure was arrested for horse theft in Van Buren, Arkansas on May 8, 1871?", A:["Wyatt Earp"]},
	{Q:"What famous monster did Mary Shelley create in the summer of 1816, while visiting the poet Lord Byron at his villa in Switzerland?", A:["Frankenstein"]},
	{Q:"What famous monster has an NHL team named after it?", A:["Jersey Devil"]},
	{Q:"What famous tennis player died of AIDS on February 6, 1993?", A:["Arthur Ashe"]},
	{Q:"What golfer coined the term caddy?", A:["Mary Queen of Scots"]},
	{Q:"What golfer has won the most Major Championship titles?", A:["Jack Nichlaus"]},
	{Q:"What golfer invented the modern sand wedge?", A:["Gene Sarazen"]},
	{Q:"What golfer replaced Tiger Woods at the top of the Official World Golf Rankings in 2004?", A:["Vijay Singh"]},
	{Q:"What golfer set a PGA Tour record in 1945 by winning 18 tournaments?", A:["Byron Nelson"]},
	{Q:"What golfer was known as The Golden Bear?", A:["Jack Nicklaus"]},
	{Q:"What happens at the beginning of a basketball game?", A:["Jump Ball"]},
	{Q:"What holiday celebrates the end of slavery in the United States?", A:["Juneteenth Day"]},
	{Q:"What holiday takes place the day after Halloween?", A:["All Saints Day"]},
	{Q:"What holiday was created by a vote of the United Nations General Assembly in 1981?", A:["International Peace Day"]},
	{Q:"What holiday was established in California in 1966 by scholar/activist Dr. Maulana Karenga?", A:["Kwanzaa"]},
	{Q:"What horror film caused some theatres to suggest that patrons prone to motion sickness sit in the aisle seats?", A:["The Blair Witch Project"]},
	{Q:"What horror film is the first movie to show a woman in just a bra and slip?", A:["Psycho"]},
	{Q:"What horror movie features a serial killer wearing a mask inspired by an Edvard Munch painting?", A:["Scream"]},
	{Q:"What human organ cleans fifty gallons of blood every day?", A:["Kidneys"]},
	{Q:"What illness accounted for 40 percent of U.S. military casualties during World War I?", A:["Influenza"]},
	{Q:"What instrument is used to measure wind speed?", A:["Anemometer"]},
	{Q:"What is Europes longest river?", A:["Volga"]},
	{Q:"What is a group of owls called?", A:["Parliament"]},
	{Q:"What is a soccer ball made of?", A:["Leather"]},
	{Q:"What is an evergreen tree?", A:["A tree that stays green forever"]},
	{Q:"What is another golf term for an overlapping grip?", A:["Varden grip"]},
	{Q:"What is composer Bizets first name(s)?", A:["Georges"]},
	{Q:"What is composer Haydns first name(s)?", A:["Joseph"]},
	{Q:"What is generally considered to be the first pony car?", A:["Ford Mustang"]},
	{Q:"What is significant about the serpent from the story of the Fall of Man as Michelangelo depicted it in the Sistine Chapel?", A:["It is female"]},
	{Q:"What is the Mother river of Chinese people?", A:["Huanghe River"]},
	{Q:"What is the Worlds largest Rainforest?", A:["The Amazon Rainforest"]},
	{Q:"What is the capital of Afghanistan?", A:["Kabul"]},
	{Q:"What is the capital of China?", A:["Beijing"]},
	{Q:"What is the capital of France?", A:["Paris"]},
	{Q:"What is the capital of Germany?", A:["Berlin"]},
	{Q:"What is the capital of Lithuania?", A:["Vilnius"]},
	{Q:"What is the capital of Maine?", A:["Augusta"]},
	{Q:"What is the capital of Peru?", A:["Lima"]},
	{Q:"What is the capital of Portugal?", A:["Lisbon"]},
	{Q:"What is the capital of Saudi Arabia?", A:["Riyadh"]},
	{Q:"What is the capital of Texas?", A:["Austin"]},
	{Q:"What is the capital of Vietnam?", A:["Hanoi"]},
	{Q:"What is the common term for an electrochemical cell in which terminals are connected to electrodes immersed in a solution of electrolytes?", A:["Battery"]},
	{Q:"What is the currency of Saudi Arabia?", A:["Riyal"]},
	{Q:"What is the deepest lake in the world?", A:["Lake Baikal"]},
	{Q:"What is the fastest breed of dog?", A:["Greyhound"]},
	{Q:"What is the fastest flying bird in the world?", A:["Peregrine falcon"]},
	{Q:"What is the first Asian country to qualify for the football World Cup?", A:["Korea"]},
	{Q:"What is the first Star Wars film in which Yoda is completely computer-generated?", A:["Attack of the Clones"]},
	{Q:"What is the first voice we hear in The Fellowship of the Ring?", A:["Bilbo"]},
	{Q:"What is the gestation period of a Hippopotamus?", A:["8 months"]},
	{Q:"What is the gestation period of a blue whale?", A:["10-12 months"]},
	{Q:"What is the highest inhabited country in Europe?", A:["Andorra"]},
	{Q:"What is the highest mountain in the UK?", A:["Ben Nevis"]},
	{Q:"What is the largest breed of dog?", A:["Irish Wolfhound"]},
	{Q:"What is the largest breed of domestic cat?", A:["Ragdoll"]},
	{Q:"What is the largest continent?", A:["Asia"]},
	{Q:"What is the largest country in South America?", A:["Brazil"]},
	{Q:"What is the largest ocean in the world?", A:["Pacific Ocean"]},
	{Q:"What is the largest of the great apes?", A:["Mountain gorilla"]},
	{Q:"What is the largest sea?", A:["South China Sea"]},
	{Q:"What is the largest species of butterfly?", A:["Queen Alexandras Birdwing"]},
	{Q:"What is the largest stadium in the NFL?", A:["Pontiac Silverdome"]},
	{Q:"What is the longest river in Europe?", A:["Volga"]},
	{Q:"What is the longest river in the United States?", A:["Mississippi River"]},
	{Q:"What is the longest river in the world?", A:["Nile"]},
	{Q:"What is the most common element in the human body?", A:["Hydrogen"]},
	{Q:"What is the most popular dog in the United States?", A:["Labrador Retriever"]},
	{Q:"What is the name for the left side of the tennis court for each player?", A:["Ad court"]},
	{Q:"What is the name of Plutos moon?", A:["Charon"]},
	{Q:"What is the name of the Ent who carries Pippin and Merry through Fangorn Forest?", A:["Quickbeam"]},
	{Q:"What is the name of the actor who played as Van Helsing?", A:["Hugh Jackman"]},
	{Q:"What is the name of the capital city of Wales?", A:["Cardiff"]},
	{Q:"What is the name of the county that is called the garden of England?", A:["Kent"]},
	{Q:"What is the name of the forest where Robin Hood used to live?", A:["Sherwood forest"]},
	{Q:"What is the name of the hidden base near Area 51 where Robert Lazar claims to have worked for the U.S. government reverse engineering an alien spacecraft?", A:["S-4"]},
	{Q:"What is the name of the horse whose severed head finds its way into Hollywood producer Jack Woltzs bed when Mr. Woltz refuses to cast Johnny Fontane in his new war film?", A:["Khartoum"]},
	{Q:"What is the name of the pool which was created specifically for the 2008 Olympic Games?", A:["Water cube"]},
	{Q:"What is the name of the rancher who many ufologists believe discovered the wreckage of a UFO in July, 1947, on his land in Roswell, New Mexico?", A:["Jesse Marcel"]},
	{Q:"What is the name of the worlds tallest waterfall, located in Venezuela?", A:["Angel Falls"]},
	{Q:"What is the nearest star to the Earth(other than the Sun?", A:["Proxima Centauri"]},
	{Q:"What is the normal body temperature of a cat?", A:["102 degrees Fahrenheit"]},
	{Q:"What is the only Central American country without an Atlantic coast?", A:["El Salvador"]},
	{Q:"What is the only country in the world that completely surrounds two other countries?", A:["Italy"]},
	{Q:"What is the only dog that cannot bark?", A:["Basenji"]},
	{Q:"What is the only mammal capable of true flight?", A:["Bat"]},
	{Q:"What is the scientific term for an apparent throwback characteristic of an organism that reveals a trait of an earlier ancestor?", A:["Atavism"]},
	{Q:"What is the scientific term for the production of light by living organisms?", A:["Bioluminescence"]},
	{Q:"What is the smallest U.S. state?", A:["Rhode Island"]},
	{Q:"What is the smallest continent?", A:["Australia"]},
	{Q:"What is the smallest mammal in the world?", A:["Bumblebee bat"]},
	{Q:"What is the smallest species of butterfly?", A:["Western Pygmy Blue"]},
	{Q:"What is the smallest unit of a substance that retains the properties of that substance?", A:["Molecule"]},
	{Q:"What is the tallest mountain in Asia?", A:["Mount Everest"]},
	{Q:"What is the tallest mountain in Europe?", A:["Mount Elbrus"]},
	{Q:"What is the tallest mountain in the United States?", A:["Mount McKinley"]},
	{Q:"What is the tallest mountain in the world?", A:["Mount Everest", "Mauna Kea"]},
	{Q:"What is the term for a zero score in tennis?", A:["Love"]},
	{Q:"What is the term for the condition when three celestial bodies are arranged in a straight line?", A:["Syzygy"]},
	{Q:"What is the unit of currency in Russia?", A:["Ruble"]},
	{Q:"What is the worlds most poisonous spider?", A:["Brazilian wandering spider"]},
	{Q:"What is western Asias longest river?", A:["Euphrates"]},
	{Q:"What kind of car did Starsky and Hutch drive in the classic television series?", A:["Ford Gran Torino"]},
	{Q:"What kind of car does James Bond drive in Moonraker?", A:["None"]},
	{Q:"What kind of feathers are used on a competition badminton?", A:["Goose"]},
	{Q:"What kind of weapon is used in the Olympic pentathlon?", A:["Air Pistol"]},
	{Q:"What landmark work came about from a friends request for a self-portrait of Rene Magritte?", A:["The Son of Man"]},
	{Q:"What language do they speak in the Congo Basin?", A:["French"]},
	{Q:"What law describes the fact that, on average, computers have doubled in capacity every 18 to 24 months since 1900?", A:["Moores Law"]},
	{Q:"What law states that the amount of heat needed to change one substance to another depends on the substances and not on the reactions involved?", A:["Boyles Law"]},
	{Q:"What league would you play in if you won the Grey Cup?", A:["CFL"]},
	{Q:"What legendary figure of the Old West eventually became sports editor for the New York Morning Telegraph?", A:["Bat Masterson"]},
	{Q:"What letter is a question?", A:["Y"]},
	{Q:"What letter is an animal?", A:["B"]},
	{Q:"What living animal has the heaviest brain?", A:["Sperm Whale"]},
	{Q:"What manned U.S. space program eventually put 12 men on the Moon?", A:["Apollo"]},
	{Q:"What material are arrows made from in the sport of archery?", A:["Aluminum alloy"]},
	{Q:"What meteorological phenomenon causes a warm current of water to appear every three to seven years in the eastern Pacific Ocean, causing unusual weather conditions all over the world?", A:["El Nino"]},
	{Q:"What mountain range runs along the northern border of India?", A:["Himalayan Mountains"]},
	{Q:"What mythological creature was once a beautiful maiden until she was changed into a snakelike monster with six heads by the sorceress Circe?", A:["Scylla"]},
	{Q:"What mythological monster was said to be produced when a chicken egg was hatched under a toad or a serpent?", A:["Basilisk"]},
	{Q:"What nationality was Isaac Newton?", A:["British"]},
	{Q:"What new kind of shot did Joe Fulks score a record 63 points with in one game in 1949?", A:["Jump shot"]},
	{Q:"What new product did Apple Computer launch with a $1.5 million commercial during the 1984 Super Bowl?", A:["Macintosh"]},
	{Q:"What new safety measure did NASCAR introduce in 1994?", A:["Roof flaps"]},
	{Q:"What organization was founded on May 31, 1969, to investigate UFO phenomena?", A:["MUFON"]},
	{Q:"What outlaw once wrote his own press release for one of his robberies?", A:["Jesse James"]},
	{Q:"What outlaw wore socks over his boots so that he couldnt be tracked?", A:["Black Bart"]},
	{Q:"What painter did Rembrandt study under?", A:["Swanenburgh"]},
	{Q:"What painter was married to Mexican artist Diego Rivera?", A:["Frida Kahlo"]},
	{Q:"What part of the body do butterflies taste with?", A:["Feet"]},
	{Q:"What percentage of a cats bones are in its tail?", A:["10 percent"]},
	{Q:"What performer had a now infamous costume malfunction during the halftime show of Super Bowl XXXVIII?", A:["Janet Jackson"]},
	{Q:"What physicist discovered that a waves frequency changes when the source and the observer are in motion relative to one another?", A:["Christian Doppler"]},
	{Q:"What player executed an unassisted triple play in the 1920 World Series?", A:["Bill Wambsganss"]},
	{Q:"What player had his name misspelled on the Stanley Cup and later corrected?", A:["Adam Deadmarsh"]},
	{Q:"What player hit 70 home runs in 1998?", A:["Mark McGwire"]},
	{Q:"What player holds the career record for stealing home plate?", A:["Ty Cobb"]},
	{Q:"What player holds the record for most World Series home runs?", A:["Mickey Mantle"]},
	{Q:"What player holds the record for most career fumbles in a Super Bowl?", A:["Terry Bradshaw"]},
	{Q:"What player holds the record for most career goals in the Stanley Cup Finals?", A:["Wayne Gretzky"]},
	{Q:"What player holds the record for most consecutive completions in a Super Bowl?", A:["Tom Brady"]},
	{Q:"What player holds the record for most rushing yards in a single Super Bowl?", A:["Timmy Smith"]},
	{Q:"What player led the NFL with 27 rushing touchdowns in 2003?", A:["Priest Holmes"]},
	{Q:"What player set a record by pitching in seven games of the 1973 World Series?", A:["Darold Knowles"]},
	{Q:"What player set an NHL record in 1976, with 10 points in one game?", A:["Darryl Sittler"]},
	{Q:"What player tied his own record by stealing 7 bases in the 1968 World Series?", A:["Lou Brock"]},
	{Q:"What player won All-Star Game MVP, NBA MVP, and NBA Finals MVP awards in 2000?", A:["Shaquille ONeal"]},
	{Q:"What political movement was Picasso associated with?", A:["Communism"]},
	{Q:"What professional sports leagues MVP trophy is called the Podoloff Cup?", A:["The NBAs"]},
	{Q:"What quarterback threw 70 passes in a single game?", A:["Drew Bledsoe"]},
	{Q:"What religious leader is credited with inventing nine-pin bowling?", A:["Martin Luther"]},
	{Q:"What retired basketball player tried out for the Chicago White Sox in 1994?", A:["Michael Jordan"]},
	{Q:"What river begins in the Black Forest region of Germany, flows across central Europe and the countries of Austria, Hungary, Croatia, and Yugoslavia, and empties into the Black Sea?", A:["Danube"]},
	{Q:"What room has no walls, no doors, no windows, and no one to live in?", A:["Mushroom"]},
	{Q:"What school of art grew out of the poetry of Romanian-born Tristan Tzara?", A:["Dada"]},
	{Q:"What sculpture did Michelangelo make for the tomb of Pope Julius II?", A:["Moses"]},
	{Q:"What secret service agency does 007 work for?", A:["MI6"]},
	{Q:"What soccer goal keeper has scored the most goals?", A:["Jose Luis Chilaver"]},
	{Q:"What soccer team defeated Holland to capture the Football World Cup in 1978?", A:["Argentina"]},
	{Q:"What species of butterfly has the longest lifespan?", A:["Brimstone Butterfly"]},
	{Q:"What sport has a beach start and a dock-start?", A:["Water-Skiing"]},
	{Q:"What sport has a hooker in a scrum?", A:["Rugby"]},
	{Q:"What sport is Liu Xiang most famous for?", A:["Hurdler"]},
	{Q:"What sport is the most common cause of eye injuries in the U.S.?", A:["Baseball"]},
	{Q:"What sport played by Harvard teams starting in 1871 was commonly referred to as the Boston game?", A:["Football"]},
	{Q:"What sports balls does William Shakespeare refer to in Henry V?", A:["Tennis"]},
	{Q:"What state has earned the nickname NASCAR Valley?", A:["North Carolina"]},
	{Q:"What state is bordered by Nebraska, Kansas, Oklahoma, New Mexico, Utah, and Wyoming?", A:["Colorado"]},
	{Q:"What state is nicknamed the Mother of Presidents?", A:["Virginia State"]},
	{Q:"What team advanced to the Stanley Cup finals in 1968, 1969, and 1970, but lost all three series?", A:["St. Louis Blues"]},
	{Q:"What team did Larry Bird play for?", A:["Boston"]},
	{Q:"What team did Wilt Chamberlain finish his NBA career with?", A:["Los Angeles Lakers"]},
	{Q:"What team has been to the most World Series?", A:["New York Yankees"]},
	{Q:"What team has won the most NCAA hockey championships?", A:["Michigan"]},
	{Q:"What team originally drafted Kobe Bryant?", A:["Hornets"]},
	{Q:"What team was Wilt Chamberlin playing for when he scored 100 points?", A:["Philadelphia"]},
	{Q:"What team was originally named the New York Titans?", A:["New York Jets"]},
	{Q:"What team won 3 Super Bowls in the 1990s?", A:["Dallas Cowboys"]},
	{Q:"What team won the 2006 Football World Cup?", A:["Italy"]},
	{Q:"What team won the first indoor game in World Series history?", A:["New York Yankees"]},
	{Q:"What team won the first night football game ever played?", A:["Philadelphia Athletics"]},
	{Q:"What team won the very first NBA game?", A:["New York Knicks"]},
	{Q:"What test was introduced in the 1968 Olympics in Mexico City?", A:["Sex Test"]},
	{Q:"What type of golf clubs are used for long shots from the tee or fairway?", A:["Woods"]},
	{Q:"What type of vegetarian excludes all types of meat from their diet but eats eggs and dairy products?", A:["Lacto-ovo Vegetarian"]},
	{Q:"What university was Rembrandt educated at?", A:["Leiden"]},
	{Q:"What video game features Lara Croft?", A:["Tomb Raider"]},
	{Q:"What was Picassos first period?", A:["Blue Period"]},
	{Q:"What was Usain Bolts record in the 100 meter dash?", A:["9.69 seconds"]},
	{Q:"What was changed about the Mr. Goodbar formula in 1992?", A:["More peanuts"]},
	{Q:"What was on the ceiling of the Sistine Chapel before Michelangelo began painting?", A:["Fresco of starry sky"]},
	{Q:"What was the Best Picture winner of the 71st Academy Awards?", A:["Shakespeare in Love"]},
	{Q:"What was the Best Picture winner of the 72nd Academy Awards?", A:["American Beauty"]},
	{Q:"What was the Best Picture winner of the 73rd Academy Awards?", A:["Gladiator"]},
	{Q:"What was the Best Picture winner of the 74th Academy Awards?", A:["Beautiful Mind"]},
	{Q:"What was the Best Picture winner of the 75th Academy Awards?", A:["Chicago"]},
	{Q:"What was the Best Picture winner of the 76th Academy Awards?", A:["The Lord of The Rings3"]},
	{Q:"What was the Best Picture winner of the 77th Academy Awards?", A:["Milloin Dollar Baby"]},
	{Q:"What was the Best Picture winner of the 78th Academy Awards?", A:["Crash"]},
	{Q:"What was the Best Picture winner of the 79th Academy Awards?", A:["The Departed"]},
	{Q:"What was the Best Picture winner of the 80th Academy Awards?", A:["No Country for Old Men"]},
	{Q:"What was the US release date for the movie Perfume: The Story of a Murderer?", A:["5 January 2007"]},
	{Q:"What was the US release date of The Lake House?", A:["16 June 2006"]},
	{Q:"What was the US release date of The Transporter 2?", A:["2 September 2005"]},
	{Q:"What was the closest finish in NASCAR history?", A:["0.002 seconds"]},
	{Q:"What was the first Asian country to host the Olympics?", A:["Japan"]},
	{Q:"What was the first Bond film NOT based on a book?", A:["The Living Daylights"]},
	{Q:"What was the first James Bond movie?", A:["Dr. No"]},
	{Q:"What was the first Japanese car to be produced in the United States?", A:["Honda Accord"]},
	{Q:"What was the first Major League team to wear plastic batting helmets?", A:["Brooklyn Dodgers"]},
	{Q:"What was the first NASCAR race to be nationally televised from start to finish?", A:["Daytona 500"]},
	{Q:"What was the first NHL team to win back-to-back Stanley Cup titles?", A:["Ottawa Senators"]},
	{Q:"What was the first Super Bowl in which the winning points came on the final play?", A:["Super Bowl XXXVI"]},
	{Q:"What was the first car to be mass-produced?", A:["Model T"]},
	{Q:"What was the first commercially available hybrid gasoline-electric car in the United States?", A:["Honda Insight"]},
	{Q:"What was the first commercially successful vector processor?", A:["Cray I"]},
	{Q:"What was the first computer to defeat a world champion chess player?", A:["Deep Blue"]},
	{Q:"What was the first genetically engineered organism?", A:["Tobacco"]},
	{Q:"What was the first non U.S. country to win the Little League baseball world series?", A:["Mexico"]},
	{Q:"What was the first portable computer?", A:["Osborne I"]},
	{Q:"What was the first sport televised in the U.S.?", A:["Baseball"]},
	{Q:"What was the first team Dr. J played for in the ABA?", A:["Virginia Squires"]},
	{Q:"What was the first team to win five Super Bowls?", A:["San Francisco 49ers"]},
	{Q:"What was the first wild-card team to win a Super Bowl?", A:["Oakland Raiders"]},
	{Q:"What was the name of Rembrandts first wife?", A:["Saskia"]},
	{Q:"What was the name of Rembrandts only surviving child?", A:["Titus"]},
	{Q:"What was the name of the U.S. Air Forces 22-year investigation into the existence of UFOs?", A:["Project Blue Book"]},
	{Q:"What was the name of the young rival who struck Michelangelo in the face with a mallet?", A:["Torregiano"]},
	{Q:"What was the original title of Licence to Kill?", A:["Licence Revoked"]},
	{Q:"What was the original title of The Blob?", A:["The Glob"]},
	{Q:"What was the release date of Insomnia?", A:["24 May, 2002"]},
	{Q:"What was the slogan of the Beijing Olympic games?", A:["New Beijing, New Olympic"]},
	{Q:"What was the very first personal computer?", A:["Kenbak-1"]},
	{Q:"What weapon has become known as the gun that won the west?", A:["Colt Peacemaker"]},
	{Q:"What were the pyramids used for in ancient times?", A:["Tomb"]},
	{Q:"What yachting race was called the Hundred-Guinea Cup until a team from the U.S. won the race in 1851?", A:["The Americas Cup"]},
	{Q:"What year did Michael Jordan join the NBA?", A:["1984"]},
	{Q:"What year did Michelangelo die?", A:["1564"]},
	{Q:"What year did the Stanley Cup have no winner?", A:["1919"]},
	{Q:"What year was Michelangelo born?", A:["1475"]},
	{Q:"What year was NASCAR founded?", A:["1948"]},
	{Q:"What year was Rembrandt born?", A:["1606"]},
	{Q:"What year was tennis originally introduced as an Olympic sport?", A:["1896"]},
	{Q:"What year was the Corvette first introduced?", A:["1953"]},
	{Q:"What year was the PGA of America founded?", A:["1916"]},
	{Q:"What year was the Stanley Cup first awarded?", A:["1893"]},
	{Q:"What year was the first World Series played?", A:["1903"]},
	{Q:"What year was the first major cat show held in the United States?", A:["1895"]},
	{Q:"What year was the offsides rule introduced by the NHL?", A:["1930"]},
	{Q:"What year was the sudden-death overtime period adopted by the NFL?", A:["1974"]},
	{Q:"What year was the word computer first used to describe a mechanical calculating device?", A:["1897"]},
	{Q:"Whats the language broadly used in the Middle East?", A:["Arabic"]},
	{Q:"Whats the largest archipelago in the world?", A:["Malaysia", "Malay Archipelago"]},
	{Q:"Whats the name of the first man who flew into space?", A:["Yuri Gagarin"]},
	{Q:"When did England win their first Football World Cup?", A:["1966"]},
	{Q:"When did Yao Ming join the NBA?", A:["2002"]},
	{Q:"When did human beings send the first satellite into space?", A:["1957"]},
	{Q:"When did soccer first become and Olympic event?", A:["1900"]},
	{Q:"When did the Beijing Olympics start?", A:["August 8"]},
	{Q:"When did the Olympic Torch Relay begin?", A:["1936"]},
	{Q:"When did the Olympic torch arrive in Beijing in 2008?", A:["Aug. 6th"]},
	{Q:"When did the US claim independency?", A:["1774"]},
	{Q:"When did the Wright brothers make the first successful flight?", A:["1903"]},
	{Q:"When did the civil war happened in the United States of America?", A:["1861"]},
	{Q:"When did the first Asian country qualify for the football World Cup?", A:["1954"]},
	{Q:"When had China participated in the Olympic Games for the first time?", A:["1984"]},
	{Q:"When is Olympic Day?", A:["June 23rd"]},
	{Q:"When is the Olympic day?", A:["June 23rd"]},
	{Q:"When was Table Tennis accepted as one of the events of the Olympic Games?", A:["1988"]},
	{Q:"When was archery accepted as one of the events of the Olympic Games?", A:["1900"]},
	{Q:"When was baseball accepted as one of the events of the Olympic Games?", A:["1992"]},
	{Q:"When was basketball accepted as an official event of the Olympic Games?", A:["1936"]},
	{Q:"When was basketball accepted as one of the events of the Olympic Games?", A:["1936"]},
	{Q:"When was basketball invented?", A:["1891"]},
	{Q:"When was boxing accepted as one of the events of the Olympic Games?", A:["1904"]},
	{Q:"When was fencing accepted as one of the events of the Olympic Games?", A:["1896"]},
	{Q:"When was gymnastics accepted as one of the events of the Olympic Games?", A:["1896"]},
	{Q:"When was rowing accepted as one of the events of the Olympic Games?", A:["1896"]},
	{Q:"When was synchronized swimming as one of the events of the Olympic Games?", A:["1984"]},
	{Q:"When was television invented?", A:["1920"]},
	{Q:"When was the Alvin and the Chipmunks movie released in the US?", A:["14 December 2007"]},
	{Q:"When was the International Olympic Committee founded?", A:["June 23 1894"]},
	{Q:"When was the NBA created?", A:["1949"]},
	{Q:"When was the National Basketball Association set up?", A:["1949"]},
	{Q:"When was the New Continent found by Columbus?", A:["1492"]},
	{Q:"When was the Olympic Flag first hoisted?", A:["1920"]},
	{Q:"When was the computer inventeded?", A:["1945"]},
	{Q:"When was the earliest known UFO sighting?", A:["100 B.C."]},
	{Q:"When was the equestrian accepted as one of the events of the Olympic Games?", A:["1900"]},
	{Q:"When was the first Olympic Torch Relay?", A:["1936"]},
	{Q:"When was the first Olympic Winter Games held?", A:["1924"]},
	{Q:"When was the first Paralympics held?", A:["1960"]},
	{Q:"When was the first Winter Olympics held?", A:["1924"]},
	{Q:"When was the idea of the atom first introduced?", A:["450 B.C."]},
	{Q:"When was the opening ceremony of the Beijing Olympic games?", A:["Aug. 8"]},
	{Q:"When was the womens marathon introduced into the Olympic Games?", A:["1984"]},
	{Q:"When was weightlifting accepted as one of the events of the Olympic Games?", A:["1896"]},
	{Q:"When was women\u2019s judo accepted by the Olympic Games?", A:["1992"]},
	{Q:"When was wrestling accepted as one of the events of the Olympic Games?", A:["1896"]},
	{Q:"When were the Modern Olympic Games first held on the Asian continent?", A:["1964"]},
	{Q:"When were the ancient Olympic Games abolished?", A:["393AD"]},
	{Q:"When were the first Asian games held?", A:["1951"]},
	{Q:"When were the first Olympic Games held?", A:["776 BC"]},
	{Q:"When were the gold, silver, and bronze medals first awarded?", A:["1904"]},
	{Q:"Where are rainforests mainly found?", A:["Tropics"]},
	{Q:"Where can we find 1600 Pennsylvania Avenue?", A:["Washington D.C."]},
	{Q:"Where can we find Euro Disney?", A:["Paris"]},
	{Q:"Where can we find Notre Dame?", A:["Paris"]},
	{Q:"Where can we find Saint Marks Square?", A:["Venice"]},
	{Q:"Where can we find the Brandenburg Gate?", A:["Berlin"]},
	{Q:"Where can we find the Eiffel Tower?", A:["Paris"]},
	{Q:"Where can we find the Forbidden City?", A:["Beijing"]},
	{Q:"Where can we find the Golden Gate Bridge?", A:["San Francisco"]},
	{Q:"Where can we find the Great Pyramid?", A:["Giza"]},
	{Q:"Where can we find the Tower Bridge?", A:["London"]},
	{Q:"Where did Ping-Pong(Table Tennis) originate?", A:["England"]},
	{Q:"Where did golf originate?", A:["Scotland"]},
	{Q:"Where did polo start?", A:["England"]},
	{Q:"Where does Louis Leterrier come from?", A:["France"]},
	{Q:"Where does badminton originate?", A:["Britain"]},
	{Q:"Where does ice hockey originate?", A:["Canada"]},
	{Q:"Where does judo originate?", A:["Japan"]},
	{Q:"Where does the sport Sailing originate?", A:["Netherlands"]},
	{Q:"Where in the world have no rainforest?", A:["Europe"]},
	{Q:"Where is Area 51 located?", A:["Nevada"]},
	{Q:"Where is China located in the world?", A:["East Asia"]},
	{Q:"Where is Kalimatan?", A:["Australia"]},
	{Q:"Where is the Daintree Rainforest Located?", A:["Australia"]},
	{Q:"Where is the Great Wall located?", A:["China"]},
	{Q:"Where is the Pavlof volcano?", A:["United States"]},
	{Q:"Where is the Picasso Museum located?", A:["Barcelona"]},
	{Q:"Where is the biggest rainforest?", A:["Brazil"]},
	{Q:"Where is the birth place of the Olympic games?", A:["Athens"]},
	{Q:"Where was Olympic Council of Asia founded?", A:["India"]},
	{Q:"Where was Tom Tykwer born?", A:["Germany"]},
	{Q:"Where was the 15th session of the Football World Cup held?", A:["USA"]},
	{Q:"Where was the 3rd session of the Football World Cup held?", A:["France"]},
	{Q:"Where was the athlete who broke the first 1000m world record of running from?", A:["France"]},
	{Q:"Where was the first NASCAR race held?", A:["Charlotte Speedway"]},
	{Q:"Where was the first session of the Football World Cup held?", A:["Uruguay"]},
	{Q:"Where were the Olympic Games held on April 5, 1896?", A:["Athens"]},
	{Q:"Where will the 2010 Fifa World Cup be held?", A:["South Africa"]},
	{Q:"Where will the next Olympic game be held?", A:["London"]},
	{Q:"Which African country was known as the Gold Coast?", A:["Ghana"]},
	{Q:"Which Asian city held the first Summer Olympic games?", A:["Tokyo"]},
	{Q:"Which European country has the most borders?", A:["Germany"]},
	{Q:"Which Godfather movie won the most Oscars?", A:["The Godfather, Part II"]},
	{Q:"Which Olympic Games did China first bid to host?", A:["2000 Olympic Games"]},
	{Q:"Which Olympic Games were the first to boast the presence of national delegations?", A:["1912"]},
	{Q:"Which Pope compelled Michelangelo to undertake the fresco decoration of the Sistine Chapel?", A:["Julius II"]},
	{Q:"Which Star Wars movie was filmed entirely in the studio?", A:["Revenge of the Sith"]},
	{Q:"Which award did The Lake House win?", A:["Teen Choice Award"]},
	{Q:"Which award was not given to Perfume: The Story of a Murderer?", A:["BMI Film Music Award"]},
	{Q:"Which award wasnt given to Tom Tykwer?", A:["Golden Berlin Bear"]},
	{Q:"Which awards were not given to Alvin and the Chipmunks?", A:["Oscar"]},
	{Q:"Which capital city is farthest west?", A:["Washington, D.C."]},
	{Q:"Which celebrities have lent their voices to some characters in South Park?", A:["Jennifer Aniston"]},
	{Q:"Which character is not from USA?", A:["Monkey King"]},
	{Q:"Which city held the 2008 NBA All Star game?", A:["New Orleans"]},
	{Q:"Which city is the capital of Afghanistan?", A:["Kabul"]},
	{Q:"Which city joined London and Paris as the only two-time hosts in 1984 after hosting its first Olympic Games?", A:["Los Angeles"]},
	{Q:"Which city will hold the Olympic Games in 2012?", A:["London"]},
	{Q:"Which continent does Egypt belong to?", A:["Africa"]},
	{Q:"Which continent does the green ring of the Olympic rings represent?", A:["Australia"]},
	{Q:"Which continent has the highest altitude?", A:["Antartic"]},
	{Q:"Which continent has the lowest altitude?", A:["Europe"]},
	{Q:"Which countries border Paraguay?", A:["Brazil, Argentina and Bolivia"]},
	{Q:"Which country did the former president of the IOC, Juan Antonio Samaranch, come from?", A:["Spain"]},
	{Q:"Which country does not border Russia?", A:["Uzbekistan"]},
	{Q:"Which country does not border the Gulf of Aqaba?", A:["Syria"]},
	{Q:"Which country had the most athletes at the 2008 Olympics?", A:["China"]},
	{Q:"Which country has the highest population density in the world?", A:["Monaco"]},
	{Q:"Which country has the longest coastline?", A:["Canada"]},
	{Q:"Which country has the most Football World Cup appearances?", A:["Brazil"]},
	{Q:"Which country has the worlds only public diamond mine?", A:["America"]},
	{Q:"Which country has won the most Football World Cups?", A:["Brazil"]},
	{Q:"Which country held the 2002 Football World Cup?", A:["JapanandKorea"]},
	{Q:"Which country held the 2006 Football World Cup?", A:["Germany"]},
	{Q:"Which country held the 29th Olympic games?", A:["China"]},
	{Q:"Which country held the first Olympic games?", A:["Greece"]},
	{Q:"Which country held the second Olympic games?", A:["France"]},
	{Q:"Which country invented the kite?", A:["China"]},
	{Q:"Which country is Angkor Wat in?", A:["Cambodia"]},
	{Q:"Which country is The Taj Mahal in?", A:["India"]},
	{Q:"Which country is due West of Afghanistan?", A:["Iran"]},
	{Q:"Which country is south of Canada?", A:["The United States"]},
	{Q:"Which country is south of Thailand?", A:["Malaysia"]},
	{Q:"Which country is the Merlion in?", A:["Singapore"]},
	{Q:"Which country sent the first satellite into space?", A:["Soviet Union"]},
	{Q:"Which country won the Womens Volleyball in the Beijing Olympics?", A:["USA"]},
	{Q:"Which country won the largest number of gold medals in 1992, the Barcelona Olympic Games?", A:["Soviet Union"]},
	{Q:"Which country won the most Olympic gold medals at the Beijing 2008 Olympics?", A:["China"]},
	{Q:"Which country won the most gold medals at the first Modern Olympic Games?", A:["USA"]},
	{Q:"Which country won the most gold medals in the first modern Olympic games?", A:["US"]},
	{Q:"Which distance is not run in the Olympics?", A:["50m"]},
	{Q:"Which has the highest peak in the world?", A:["Mt. Everest"]},
	{Q:"Which is NOT one of the Great Lakes?", A:["Mead"]},
	{Q:"Which is the biggest fresh water lake in the world?", A:["Lake Superior"]},
	{Q:"Which is the longest river on Earth?", A:["The Nile River"]},
	{Q:"Which is the lowest point on earth?", A:["Dead Sea"]},
	{Q:"Which is the smallest country in the world?", A:["Vatican"]},
	{Q:"Which is the worlds deepest fresh water lake?", A:["Baikal"]},
	{Q:"Which is the worlds largest fresh water lake?", A:["Superior"]},
	{Q:"Which is the worlds largest river system?", A:["Amazon"]},
	{Q:"Which is the worlds longest river?", A:["Nile"]},
	{Q:"Which is the worlds smallest ocean?", A:["Arctic"]},
	{Q:"Which isnt the name of the chipmunks in movie Alvin and the Chipmunks?", A:["Bar"]},
	{Q:"Which month has 28 days?", A:["Every Month"]},
	{Q:"Which movie is not a Alejandro Agresti producton?", A:["Next"]},
	{Q:"Which movie was not directed by Christopher Nolan?", A:["Perfect strangers"]},
	{Q:"Which movie was not directed by Michael Bay?", A:["Twilight"]},
	{Q:"Which movie wasnt directed by Tim Hill?", A:["The Coffin"]},
	{Q:"Which of Picassos paintings sold for a then-record USD $104 Million in 2004?", A:["Garcon"]},
	{Q:"Which of Rembrandts paintings was commissioned for the new hall of Kloveniersdoelen, musketeer branch of the civic militia?", A:["The Night Watch"]},
	{Q:"Which of the Great Lakes is located entirely within the U.S. border?", A:["Lake Michigan"]},
	{Q:"Which of the following countries has more than one neighbor?", A:["Swaziland"]},
	{Q:"Which of the following has more bones?", A:["Baby"]},
	{Q:"Which of the following has the longest recorded life span?", A:["Freshwater Oyster"]},
	{Q:"Which of the following is NOT one of the four stages in the lifecycle of a butterfly?", A:["Nymph"]},
	{Q:"Which of the following is not included as a Pentathlon event?", A:["Javelin"]},
	{Q:"Which of the following is not included in Mens gymnastics?", A:["Uneven bars"]},
	{Q:"Which of the following is not included in the Triathlon?", A:["High jump"]},
	{Q:"Which of the following is not one of the events of Olympic Games water sports?", A:["Rowing"]},
	{Q:"Which of the following is not one of the swords used in Olympic fencing?", A:["Longsword"]},
	{Q:"Which of the following means rain when added to a clouds name?", A:["Nimbus"]},
	{Q:"Which of the following mountains is located in Japan?", A:["Mount Fuji"]},
	{Q:"Which of the following sites is located in Africa?", A:["Suez Canal"]},
	{Q:"Which of the following sites is not in America?", A:["Pyramids of Giza"]},
	{Q:"Which of the following sites is not in Asia?", A:["The Hawaii Volcanoes", "The Sydney Opera House"]},
	{Q:"Which of the following sites is not in Australia?", A:["Mount Cook"]},
	{Q:"Which of the following sites is not in Egypt?", A:["Cape of Good Hope"]},
	{Q:"Which of the following sites is not in England?", A:["Leaning Tower"]},
	{Q:"Which of the following sites is not in Europe?", A:["The Pyramids", "Mount Fuji"]},
	{Q:"Which of the following sites is not in France?", A:["Angel Falls"]},
	{Q:"Which of the following sites is not in the USA?", A:["Red Square", "Hyde Park"]},
	{Q:"Which of the following states does NOT border the Great Lakes?", A:["Iowa"]},
	{Q:"Which of the following universities are located in England?", A:["Oxford University"]},
	{Q:"Which of the following was discovered in 2002?", A:["Quaoar"]},
	{Q:"Which of the following was one of Rembrandts students?", A:["Fabritius"]},
	{Q:"Which of the following was the highest legal document on the Olympic movement?", A:["Olympic Charter"]},
	{Q:"Which of the following was the only event from the 1st to 13th sessions of the ancient Olympic Games?", A:["Sprint"]},
	{Q:"Which of the three main heroes (Luke, Leia, and Han Solo) in the first Star Wars trilogy refused to sign a three picture deal?", A:["Harrison Ford"]},
	{Q:"Which of these African nations is NOT landlocked?", A:["Congo"]},
	{Q:"Which of these match with The Range?", A:["Bruce Hornsby"]},
	{Q:"Which of these match with The Wailers?", A:["Bob Marley"]},
	{Q:"Which of these rivers are located in America?", A:["The Mississippi river"]},
	{Q:"Which of these sites is in England?", A:["Westminster Abbey"]},
	{Q:"Which one isnt a character in South Park?", A:["Jay Leno"]},
	{Q:"Which place is least populated, with approximately 48 inhabitants?", A:["Pitcairn Islands"]},
	{Q:"Which plain is the largest plain on Earth?", A:["Amazon plain"]},
	{Q:"Which president of the US was named the Father of American constitution?", A:["James Madison"]},
	{Q:"Which river flows through Oxford?", A:["Thames"]},
	{Q:"Which river is not a tributary to the Mississippi River?", A:["Canadian River"]},
	{Q:"Which river is the largest river in the world?", A:["Amazon River"]},
	{Q:"Which species is the most numerous in the Amazon Rainforest?", A:["Ants"]},
	{Q:"Which team does David Beckham play for?", A:["Los Angles Galaxy"]},
	{Q:"Which team does Yao Ming play for?", A:["Houston Rockets"]},
	{Q:"Which team has won the most NBA chapionships?", A:["Celtics"]},
	{Q:"Which team hold the best record ever for an NBA team in a regular 82 game season?", A:["Bulls"]},
	{Q:"Which team won the NBA Finals in 2007?", A:["Spurs"]},
	{Q:"Which two countries border Andorra?", A:["France and Spain"]},
	{Q:"Which type of matter has a definite volume but no definite shape?", A:["Liquids"]},
	{Q:"Which university did Michael Bay graduate from?", A:["Wesleyan University"]},
	{Q:"Which was not awarded to the movie Next?", A:["Oscar"]},
	{Q:"Which was the first city in Asia to hold the Olympic games?", A:["Tokyo"]},
	{Q:"Which was the last continent to be discovered by Europeans?", A:["Antarctica"]},
	{Q:"While traveling through the mines of Moria, which member of the Fellowship of the Ring is killed by the Balrog?", A:["Gandalf"]},
	{Q:"Who are the main characters in the movie Next?", A:["Cage and Moore"]},
	{Q:"Who are the writers of the movie Perfume: The Story of a Murderer?", A:["Andrew Birkin and Bernd Eichinger"]},
	{Q:"Who beat out Ted Williams for the American Leagues Most Valuable Player award in 1941, when Williams hit for a .406 average?", A:["Joe DiMaggio"]},
	{Q:"Who can stop a car with one hand only?", A:["Police"]},
	{Q:"Who composed the classical masterpiece, Alle Menschen Werden Bruder (Ode To Joy)?", A:["Ludwig van Beethoven"]},
	{Q:"Who composed the classical masterpiece, Bolero?", A:["Mauriche Ravel"]},
	{Q:"Who composed the classical masterpiece, Fur Elise?", A:["Ludwig van Beethoven"]},
	{Q:"Who composed the classical masterpiece, Morgenstimmung?", A:["Edvard Grieg"]},
	{Q:"Who composed the classical masterpiece, Rondo A La Turca?", A:["Wolfgang Amadeus Mozart"]},
	{Q:"Who composed the classical masterpiece, The Passion Of St. Matthew?", A:["Johann Sebastian Bach"]},
	{Q:"Who composed the classical music Gianni Schicchi?", A:["Giacomo Puccini"]},
	{Q:"Who composed the classical music LItaliana In Algeri?", A:["Gioacchino Rossini"]},
	{Q:"Who composed the classical music Poet And Peasant?", A:["Franz Von Suppe"]},
	{Q:"Who composed the classical music Tosca?", A:["Giacomo Puccini"]},
	{Q:"Who composed the classical music called Trumpet Voluntary?", A:["Jeremiah Clarke"]},
	{Q:"Who composed the classical song Spartacus?", A:["Aram Ilich Khachaturian"]},
	{Q:"Who defeated tennis player Bobby Riggs in the famous Battle of the Sexes?", A:["Billie Jean King"]},
	{Q:"Who did John McEnroe defeat in the final to win his first Wimbledon singles title?", A:["Bjorn Borg"]},
	{Q:"Who directed the movie The Simpsons?", A:["David Silverman"]},
	{Q:"Who directed the movie The Transfomers?", A:["Michael Bay"]},
	{Q:"Who does Sam Gamgee marry at the end of The Return of the King?", A:["Rosie Cotton"]},
	{Q:"Who had a hit with the song Janies Got A Gun?", A:["Aerosmith"]},
	{Q:"Who had a hit with the song Lady DArbanville?", A:["Cat Stevens"]},
	{Q:"Who had a hit with the song Runaround Sue?", A:["Racey"]},
	{Q:"Who had a hit with the song Under Pressure?", A:["David Bowie and Queen"]},
	{Q:"Who had a hit with the song When Youre Gone?", A:["Bryan Adams and Sting and Rod Stewart"]},
	{Q:"Who had a hit with the song Youre The One That I Want?", A:["Olivia Newton John and John Travolta"]},
	{Q:"Who has made more Super Bowl appearances than any other team?", A:["Dallas Cowboys"]},
	{Q:"Who has won the most Super Bowls?", A:["The Pittsburgh Steelers"]},
	{Q:"Who hit his 700th home run on September 17, 2004?", A:["Barry Bonds"]},
	{Q:"Who hit the Homer in the Gloamin on September 28, 1938?", A:["Gabby Hartnett"]},
	{Q:"Who hit the ball that rolled between Bill Buckners legs in the 1986 World Series?", A:["Mookie Wilson"]},
	{Q:"Who is credited as the designer of the many statues which decorated the Parthenon?", A:["Phidias"]},
	{Q:"Who is not in the cast of Van Helsing?", A:["Shia Lebouf"]},
	{Q:"Who is the all time money leader on a Senior PGA Tour?", A:["Jim Colbert"]},
	{Q:"Who is the author of the book A Clockwork Orange?", A:["Anthony Burgess"]},
	{Q:"Who is the author of the book Baal?", A:["Bertolt Brecht"]},
	{Q:"Who is the author of the book For Whom The Bell Tolls?", A:["Ernest Hemingway"]},
	{Q:"Who is the author of the book Herzog?", A:["Saul Bellow"]},
	{Q:"Who is the author of the book Howards End?", A:["E.M. Forster"]},
	{Q:"Who is the author of the book Journey To The Center Of The Earth?", A:["Jules Verne"]},
	{Q:"Who is the author of the book Little Women?", A:["Louisa May Alcott"]},
	{Q:"Who is the author of the book The Sound And The Fury?", A:["William Faulkner"]},
	{Q:"Who is the author of the book To The Lighthouse?", A:["Virginia Woolf"]},
	{Q:"Who is the coach of Inter Milan now?", A:["Benitez"]},
	{Q:"Who is the director of Alvin and the Chipmunks?", A:["Tim Hill"]},
	{Q:"Who is the director of The Prestige?", A:["Christopher Nolan"]},
	{Q:"Who is the director of Van Helsing?", A:["Stephen Sommers"]},
	{Q:"Who is the director of the movie 1Perfume: The Story of a Murderer1?", A:["Tom Tykwer"]},
	{Q:"Who is the director of the movie Next?", A:["Lee Tamahori"]},
	{Q:"Who is the director of the movie The Lake House?", A:["Alejandro Agresti"]},
	{Q:"Who is the father of the famous Theory of Relativity?", A:["Albert Einstein"]},
	{Q:"Who is the father of the modern Olympic games?", A:["Pierre de Couberti"]},
	{Q:"Who is the oldest golfer to win the US Open?", A:["Hale Irwin"]},
	{Q:"Who is the only NBA player to win four consecutive NBA championships?", A:["Steve Kerr"]},
	{Q:"Who is the only goaltender to have his name appear on the Stanley Cup as the captain of a Cup-winning team?", A:["Charlie Gardiner"]},
	{Q:"Who is the only non Jedi in the original Star Wars trilogy to use a lightsaber?", A:["Han Solo"]},
	{Q:"Who is the only player in NFL history to score over 2,000 points in a career?", A:["George Blanda"]},
	{Q:"Who is the only woman known to have robbed a stagecoach?", A:["Pearl Hart"]},
	{Q:"Who is the president of the IOC now?", A:["Jacques Rogge"]},
	{Q:"Who is the president of the US when the Second World War happened?", A:["Franklin Delano Roosevelt"]},
	{Q:"Who is the writer of Van Helsing?", A:["Stephen Sommers"]},
	{Q:"Who made the first airplane in human history?", A:["Wright brothers"]},
	{Q:"Who painted Sunday Afternoon on the Island of La Grande Jatte ?", A:["Georges Seurat"]},
	{Q:"Who painted The Scream?", A:["Edvard Munch"]},
	{Q:"Who performed the theme song for Live and Let Die?", A:["Paul McCartney and the Wings"]},
	{Q:"Who played the most NHL games of all time?", A:["Gordie Howe"]},
	{Q:"Who played the role of Forrest Gump?", A:["Tom Hanks"]},
	{Q:"Who roared to NHL stardom as The Golden Jet?", A:["Bobby Hull"]},
	{Q:"Who sang the National Anthem at Super Bowl XVIII?", A:["Barry Manilow"]},
	{Q:"Who sang the song 7 days?", A:["Craig David"]},
	{Q:"Who sang the song My heart will go on?", A:["Celine Dion"]},
	{Q:"Who sank a 60-foot shot on April 29, 1970?", A:["Jerry West"]},
	{Q:"Who scored the first three-point basket in NBA history?", A:["Chris Ford"]},
	{Q:"Who took the most shots in a basketball game?", A:["Wilt Chamberlain"]},
	{Q:"Who was Picassos first wife?", A:["Olga Koklova"]},
	{Q:"Who was Picassos partner in the creation of the Cubist style of painting?", A:["Georges Braque"]},
	{Q:"Who was hailed as the father of the modern Olympic Games?", A:["Pierre de Coubertin"]},
	{Q:"Who was named Golfer of the Century by Sports Illustrated?", A:["Jack Nicklaus"]},
	{Q:"Who was named PGA Tour Rookie of the Year in 1996?", A:["Tiger Woods"]},
	{Q:"Who was the 2004 NHL Rookie of the Year?", A:["Andrew Raycroft"]},
	{Q:"Who was the MVP of the first Super Bowl?", A:["Bart Starr"]},
	{Q:"Who was the court sculptor of Alexander the Great?", A:["Lysippus"]},
	{Q:"Who was the fastest player in NHL history to reach 1,000 career points?", A:["Wayne Gretzky"]},
	{Q:"Who was the first American League pitcher to throw a perfect game?", A:["Cy Young"]},
	{Q:"Who was the first American League player to hit a home run in his first at bat?", A:["Luke Stuart"]},
	{Q:"Who was the first Chinese player to play in an NBA game?", A:["Wang Zhizhi"]},
	{Q:"Who was the first Major League player to have his number retired?", A:["Lou Gehrig"]},
	{Q:"Who was the first Major League player to hit four home runs in a single game?", A:["Bobby Lowe"]},
	{Q:"Who was the first Major League player to pitch a ball over 100 mph?", A:["Nolan Ryan"]},
	{Q:"Who was the first NHL commissioner?", A:["Gary Bettman"]},
	{Q:"Who was the first NHL player to score 50 goals in a season?", A:["Maurice Richard"]},
	{Q:"Who was the first explorer to reach the North Pole?", A:["Robert E. Perry"]},
	{Q:"Who was the first gold medal winner in the first session of the modern Olympic Games?", A:["James Connolly"]},
	{Q:"Who was the first golfer to win more than $1 million in official earnings in a single year?", A:["Arnold Palmer"]},
	{Q:"Who was the first hockey player to win Sportsman of the Year honors from Sports Illustrated?", A:["Bobby Orr"]},
	{Q:"Who was the first human to land on the moon?", A:["Neil Armstong"]},
	{Q:"Who was the first player drafted in the first NFL draft in 1936?", A:["Jay Berwanger"]},
	{Q:"Who was the first player in hockey history to win an Olympic Gold Medal and a Stanley Cup in the same year?", A:["Ken Morrow"]},
	{Q:"Who was the first player to rush for 1000 yards in a season?", A:["Beattie Feathers"]},
	{Q:"Who was the first unseeded player to win Wimbledon?", A:["Boris Becker"]},
	{Q:"Who was the first winner of the U.S. Womens Open?", A:["Patty Berg"]},
	{Q:"Who was the only college football player to win the Heisman Trophy twice?", A:["Archie Griffin"]},
	{Q:"Who was the second actor to portray James Bond in a feature film?", A:["George Lazenby"]},
	{Q:"Who was the youngest world heavyweight boxing champion?", A:["Mike Tyson"]},
	{Q:"Who won Athlete of the Decade honors for the 1960s?", A:["Arnold Palmer"]},
	{Q:"Who won the NBA playoff championship in 2008?", A:["Boston"]},
	{Q:"Who won the NFL championship in 2008?", A:["Pittsburgh Steelers"]},
	{Q:"Who won the Nestle Crunch Slam Dunk Contest on February 6, 1988?", A:["Michael Jordan"]},
	{Q:"Who won the Wimbledon Open male championship this year?", A:["Rafael Nadal"]},
	{Q:"Who won the first Nobel Prize for Medicine?", A:["Emil von Behring"]},
	{Q:"Who won the most NBA MVP awards?", A:["Kareem Abdul-jabbar"]},
	{Q:"Who works only one day in a year but never gets fired?", A:["Santa Claus"]},
	{Q:"Who wrote the Alvin and the Chipmunks movie?", A:["Kenneth Chisholm"]},
	{Q:"Who, together with Tom Tykwer, founded the Production Company X-Filme Creative Pool?", A:["Stefan Arndt"]},
	{Q:"Why do lions eat raw meat?", A:["They dont know how to cook"]},
	{Q:"Why were most of Colin Clives scenes in Bride of Frankenstein shot with him sitting?", A:["He had a broken leg."]},
	{Q:"With the river Volta flowing through this African country, it was called Upper Volta during colonial times? What is it now called?", A:["Burkina Faso"]},
	{Q:"With which hand do you write?", A:["Neither"]},
 ];