// Last Updated: 22nd Oct 2010
// Lead Programmer: Waser Lave
//
// ==UserScript==
// @name          Neopets The Faerie's Ruin Wraith Notification
// @namespace     http://www.neocodex.us/*
// @description   Checks for new wraith challengers in BD
// @include       http://www.neopets.com/battledome/battledome.phtml?type=oneplayer&subtype=challenge
// ==/UserScript==

function saveCheck()
{
	var checkSpectreMinion = document.getElementsByName("checkspecmin")[0];
	var checkSpectreDest = document.getElementsByName("checkspecdest")[0];
	var checkSpectreBrute = document.getElementsByName("checkspecbrute")[0];
	var checkSpectreConq = document.getElementsByName("checkspecconq")[0];
	var checkSpectreFury = document.getElementsByName("checkspecfury")[0];
	var checkSpectreZealot = document.getElementsByName("checkspeczealot")[0];
	
	if(checkSpectreMinion.checked == true)
	{
		GM_setValue('checkspecmin', 'checked');	
	}else{
		GM_setValue('checkspecmin', 'unchecked');	
	}
	if(checkSpectreDest.checked == true)
	{
		GM_setValue('checkspecdest', 'checked');	
	}else{
		GM_setValue('checkspecdest', 'unchecked');	
	}
	if(checkSpectreBrute.checked == true)
	{
		GM_setValue('checkspecbrute', 'checked');	
	}else{
		GM_setValue('checkspecbrute', 'unchecked');	
	}
	if(checkSpectreConq.checked == true)
	{
		GM_setValue('checkspecconq', 'checked');	
	}else{
		GM_setValue('checkspecconq', 'unchecked');	
	}
	if(checkSpectreFury.checked == true)
	{
		GM_setValue('checkspecfury', 'checked');	
	}else{
		GM_setValue('checkspecfury', 'unchecked');	
	}
	if(checkSpectreZealot.checked == true)
	{
		GM_setValue('checkspeczealot', 'checked');	
	}else{
		GM_setValue('checkspeczealot', 'unchecked');	
	}
}

function refresh()
{
	location.reload(true);	
}

function run_check()
{
	allTDs = document.evaluate("id('content')/table/tbody/tr/td[1]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	checkSpectreMinion = GM_getValue('checkspecmin', 'unchecked');
	checkSpectreDest = GM_getValue('checkspecdest', 'unchecked');
	checkSpectreBrute = GM_getValue('checkspecbrute', 'unchecked');
	checkSpectreConq = GM_getValue('checkspecconq', 'unchecked');
	checkSpectreFury = GM_getValue('checkspecfury', 'unchecked');
	checkSpectreZealot = GM_getValue('checkspeczealot', 'unchecked');
		
	for (var i = 0; i < allTDs.snapshotLength; i++) 
	{
		thisTD = allTDs.snapshotItem(i);
		
		var newDIV = document.createElement("div");
		newDIV.setAttribute("class","sidebarModule");
		newDIV.innerHTML = "<table width=\"158\" cellpadding=\"2\" cellspacing=\"0\" border=\"0\" class=\"sidebarTable\"><tr><td valign=\"middle\" class=\"sidebarHeader medText\">Wraith Checker</td></tr><tr><td align='left' class=\"neofriend\" align=\"center\"><input name='checkspecmin' type='checkbox' "+checkSpectreMinion+"/>Spectre Minions<br /><input name='checkspecdest' type='checkbox' "+checkSpectreDest+"/>Spectre Destroyers<br /><input name='checkspecbrute' type='checkbox' "+checkSpectreBrute+"/>Spectre Brutes<br /><input name='checkspecconq' type='checkbox' "+checkSpectreConq+"/>Spectre Conquerors<br /><input name='checkspecfury' type='checkbox' "+checkSpectreFury+"/>Spectre Furys<br /><input name='checkspeczealot' type='checkbox' "+checkSpectreZealot+"/>Spectre Zealots<br /></td></tr></table>";
		thisTD.appendChild(newDIV);
		
		var checkSpectreMinion = document.getElementsByName("checkspecmin")[0];
		var checkSpectreDest = document.getElementsByName("checkspecdest")[0];
		var checkSpectreBrute = document.getElementsByName("checkspecbrute")[0];
		var checkSpectreConq = document.getElementsByName("checkspecconq")[0];
		var checkSpectreFury = document.getElementsByName("checkspecfury")[0];
		var checkSpectreZealot = document.getElementsByName("checkspeczealot")[0];
		
		checkSpectreMinion.addEventListener('click',function(){saveCheck();},false);
		checkSpectreDest.addEventListener('click',function(){saveCheck();},false);
		checkSpectreBrute.addEventListener('click',function(){saveCheck();},false);
		checkSpectreConq.addEventListener('click',function(){saveCheck();},false);
		checkSpectreFury.addEventListener('click',function(){saveCheck();},false);
		checkSpectreZealot.addEventListener('click',function(){saveCheck();},false);
	}	
	
	allWraiths = document.evaluate("id('content')/table/tbody/tr/td[2]/form/table/tbody/tr/td[1]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			
	checkSpectreMinion = GM_getValue('checkspecmin', 'unchecked');
	checkSpectreDest = GM_getValue('checkspecdest', 'unchecked');
	checkSpectreBrute = GM_getValue('checkspecbrute', 'unchecked');
	checkSpectreConq = GM_getValue('checkspecconq', 'unchecked');
	checkSpectreFury = GM_getValue('checkspecfury', 'unchecked');
	checkSpectreZealot = GM_getValue('checkspeczealot', 'unchecked');
	
	var showAlert = 0;
	
	for (var i = 1; i < allWraiths.snapshotLength-1; i++) 
	{
		thisWraith = allWraiths.snapshotItem(i);		
		
		if(checkSpectreMinion == 'checked')
		{
			if(thisWraith.innerHTML.indexOf("Shadow Spectre Minion") > -1)
			{
				if(thisWraith.innerHTML.indexOf("None left in Neopia") < 1)
				{
					showAlert = 1;	
				}	
			}
		}
		if(checkSpectreDest == 'checked')
		{
			if(thisWraith.innerHTML.indexOf("Shadow Spectre Destroyer") > -1)
			{
				if(thisWraith.innerHTML.indexOf("None left in Neopia") < 1)
				{
					showAlert = 1;	
				}	
			}
		}
		if(checkSpectreBrute == 'checked')
		{
			if(thisWraith.innerHTML.indexOf("Shadow Spectre Brute") > -1)
			{
				if(thisWraith.innerHTML.indexOf("None left in Neopia") < 1)
				{
					showAlert = 1;	
				}	
			}
		}
		if(checkSpectreConq == 'checked')
		{
			if(thisWraith.innerHTML.indexOf("Shadow Spectre Conqueror") > -1)
			{
				if(thisWraith.innerHTML.indexOf("None left in Neopia") < 1)
				{
					showAlert = 1;	
				}	
			}
		}
		if(checkSpectreFury == 'checked')
		{
			if(thisWraith.innerHTML.indexOf("Shadow Spectre Fury") > -1)
			{
				if(thisWraith.innerHTML.indexOf("None left in Neopia") < 1)
				{
					showAlert = 1;	
				}	
			}
		}
		if(checkSpectreZealot == 'checked')
		{
			if(thisWraith.innerHTML.indexOf("Shadow Spectre Zealot") > -1)
			{
				if(thisWraith.innerHTML.indexOf("None left in Neopia") < 1)
				{
					showAlert = 1;	
				}	
			}
		}
	}	

	
	if(showAlert == 1)
	{
		alert("Challenge Found!");	
	}else{
		setTimeout(refresh, Math.floor(Math.random() * 30000) + 45000);	
	}
}

run_check();