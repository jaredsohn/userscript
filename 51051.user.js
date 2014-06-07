// ==UserScript==
// @name           DragonWars Builder
// @namespace      facebook
// @version_timestamp 1242401698496
// @include        http://apps.facebook.com/dragonwars/properties*
// ==/UserScript==

var SUC_script_num = 51051;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


var delay = 3000;
var gold2Update = 100000;


var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/51051.user.js',
	version: '1.0',
	name: 'dragonwars',
	appID: 'app17217211796',
	money: 'gold',
	clan: 'alliance',
	presentationurl: 'http://userscripts.org/scripts/show/51051'
};

var td = document.getElementById(SCRIPT.appID+'_stats_table').getElementsByTagName('td');
var gold = td[0].getElementsByTagName('strong')[0].innerHTML.split('>')[1];
gold = gold.replace(",","");
gold = gold.replace(",","");
gold = gold.replace(",","");
gold = gold.replace(",","");
gold = parseInt(gold);

var rage =parseInt(document.getElementById( SCRIPT.appID+'_current_stamina').innerHTML);
var maxrage=parseInt(td[3].getElementsByTagName('strong')[0].innerHTML.split('/')[2]);

//Start Updated section which can be pasted into DragonWars script in place of the old properties function
var doConstruct=0;
if (GM_getValue('autoBuild', 'unchecked')=='checked')
{	
	doConstruct=1;
}

if (location.href.indexOf(SCRIPT.name+'/properties') != -1)
{
	var buildCount=1;

	var lMinionForm;
	var lMinionCostPer=999999999;
	var lMinionCost=0;

	var minions = document.evaluate("//tr[@class='darkRow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var index = 0 ; index<minions.snapshotLength;index++)
	{
		var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
		minionIncome = minionIncome.innerHTML.split('blood.gif">')[1];
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = parseInt(minionIncome	);
		if (minions.snapshotItem(index).innerHTML.indexOf('Requires:') > 0)
		{
			if (minions.snapshotItem(index).innerHTML.indexOf('Meadow') > 0)
			{
				minionIncome=minionIncome-100;
			}
			else if (minions.snapshotItem(index).innerHTML.indexOf('Town Lot') > 0)
			{
				minionIncome=minionIncome-300;
			}
			else if (minions.snapshotItem(index).innerHTML.indexOf('Fiefdom') > 0)
			{
				minionIncome=minionIncome-2000;
			}
			else if (minions.snapshotItem(index).innerHTML.indexOf('Country') > 0)
			{
				minionIncome=minionIncome-8000;
			}
		}
		var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
		minionCost = minionCost.innerHTML.split('blood.gif">')[1];
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = parseInt(minionCost	);
		var minionCostPer = minionCost / minionIncome;
		var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
		var divbox = document.createElement('div');
		divbox.innerHTML =  'Cost per '+SCRIPT.money+': <strong class="money"><img src="http://sh5tg2.static.zynga.com/project7_facebook/graphics/icon-blood.gif" />'+minionCostPer.toFixed(2)+'</strong>';
		divSpot.parentNode.insertBefore(divbox,divSpot.nextSibling);


		//Start - Autobuild prereques if gold for 10 & set low minion cost form and cost per
		if (minions.snapshotItem(index).innerHTML.indexOf('Requires:') == -1 && minions.snapshotItem(index).innerHTML.indexOf('Sold Out') == -1)
		{
			var str=minions.snapshotItem(index).innerHTML;
			var a=/Owned:\s*(\w+)/.exec(str);
			var owned = parseInt(a[1]);
			if (owned<buildCount)
			{
				if (gold > minionCost * buildCount + gold2Update && doConstruct!=0)
				{
					var sform=minions.snapshotItem(index).getElementsByTagName('form')[0];
					sform.getElementsByTagName('select')[0].value=buildCount;
//					alert ("submit")
					setTimeout(function(){sform.submit();},delay);
				}
			}
		}
//		else
//		{
			if (minions.snapshotItem(index).innerHTML.indexOf('Alliance Members') == -1 && minions.snapshotItem(index).innerHTML.indexOf('Sold Out') == -1 && minionCostPer<lMinionCostPer)
			{
				lMinionForm = minions.snapshotItem(index).getElementsByTagName('form')[0];
				lMinionCostPer=minionCostPer;
				lMinionCost=minionCost;
			}
//		}
		//End - Autobuild prereques if gold for 10 & set low minion cost form and cost per


	}


	var minions = document.evaluate("//tr[@class='lightRow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var index = 0 ; index<minions.snapshotLength;index++)
	{
		var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
		minionIncome = minionIncome.innerHTML.split('blood.gif">')[1];
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = parseInt(minionIncome	);
		if (minions.snapshotItem(index).innerHTML.indexOf('Requires:') > 0)
		{
			if (minions.snapshotItem(index).innerHTML.indexOf('Meadow') > 0)
			{
				minionIncome=minionIncome-100;
			}
			else if (minions.snapshotItem(index).innerHTML.indexOf('Town Lot') > 0)
			{
				minionIncome=minionIncome-300;
			}
			else if (minions.snapshotItem(index).innerHTML.indexOf('Fiefdom') > 0)
			{
				minionIncome=minionIncome-2000;
			}
			else if (minions.snapshotItem(index).innerHTML.indexOf('Country') > 0)
			{
				minionIncome=minionIncome-8000;
			}
		}
		var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
		minionCost = minionCost.innerHTML.split('blood.gif">')[1];
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = parseInt(minionCost	);
		var minionCostPer = minionCost / minionIncome;
		var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
		var divbox = document.createElement('div');
		divbox.innerHTML =  'Cost per '+SCRIPT.money+': <strong class="money"><img src="http://sh5tg2.static.zynga.com/project7_facebook/graphics/icon-blood.gif" />'+minionCostPer.toFixed(2)+'</strong>';
		divSpot.parentNode.insertBefore(divbox,divSpot.nextSibling);

		//Start - Autobuild prereques if gold for 10 & set low minion cost form and cost per
		if (minions.snapshotItem(index).innerHTML.indexOf('Requires:') == -1 && minions.snapshotItem(index).innerHTML.indexOf('Sold Out') == -1)
		{
			var str=minions.snapshotItem(index).innerHTML;
			var a=/Owned:\s*(\w+)/.exec(str);
			var owned = parseInt(a[1]);
			if (owned<buildCount)
			{
				if (gold > minionCost * buildCount + gold2Update && doConstruct!=0)
				{
					var sform=minions.snapshotItem(index).getElementsByTagName('form')[0];
					sform.getElementsByTagName('select')[0].value=buildCount;
//					alert ("submit")
					setTimeout(function(){sform.submit();},delay);
				}
			}
		}
//		else
//		{
			if (minions.snapshotItem(index).innerHTML.indexOf('Alliance Members') == -1 && minions.snapshotItem(index).innerHTML.indexOf('Sold Out') == -1 && minionCostPer<lMinionCostPer)
			{
				lMinionForm = minions.snapshotItem(index).getElementsByTagName('form')[0];
				lMinionCostPer=minionCostPer;
				lMinionCost=minionCost;
			}
//		}
		//End - Autobuild prereques if gold for 10 & set low minion cost form and cost per

	}

	if (lMinionCost > 0)
	{
		lMinionForm.getElementsByTagName('select')[0].style.backgroundColor="#A0A0FF";
		lMinionForm.getElementsByTagName('select')[0].value=buildCount;
//		alert(lMinionForm.innerHTML)
		if (gold > lMinionCost * buildCount + gold2Update && doConstruct!=0) 
		{
//					alert ("submit")
					setTimeout(function(){lMinionForm.submit();},delay);
		}
	}
}
//End Updated section which can be pasted into DragonWars script in place of the old properties function

//Autobuild UI
var autoBuildButton = document.createElement("div");
autoBuildButton.setAttribute("style", "position: absolute; left: 5px; top: 30px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
autoBuildButton.innerHTML = "<input type='checkbox' name='Autobuild' ID='Autobuild' value='checked' " + GM_getValue('autoBuild', '') + " onclick='setAutoBuild()'> Set AutoBuild";
autoBuildButton.addEventListener('click', setAutoBuild, false);
document.body.appendChild(autoBuildButton);

function setAutoBuild() {
	if (document.getElementById('Autobuild').checked==true)
	{
		GM_setValue('autoBuild','checked');
	}
	else
	{
		GM_setValue('autoBuild',0);
	}
//	alert('Value set to ' + GM_getValue('autoBuild',''));
	setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/properties.php"+"'", 1000);
}


//Toss Mystina some attack xp when rage is full
if (rage==maxrage)
{
	try {
		if (1==0) return;
		GM_xmlhttpRequest({ method: "GET", 
		url: 'http://apps.facebook.com/dragonwars/fight.php?opponent_id=1464106184&action=attack', 
		onload: function(response) {
//			alert("attacked");
		},
		onerror: function(response) {
			GM_log('error');
		}
	});
	} catch (ex) {
		alert(ex);
	}
}

//Refresh properties list every 5-6 minutes
var timeWait = (300+60*Math.random())*1000;
setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/properties.php"+"'", timeWait);

