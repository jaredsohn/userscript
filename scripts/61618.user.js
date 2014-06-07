// ==UserScript==
// @name		 TH HP_PP Status
// @namespace	TwilightHeroes
// @description	Graphical Status for HP and PP
// @include		*twilightheroes.com/nav.php*
// @include		*twilightheroes.com/index.php*
// @include		*twilightheroes.com/account.php*
// ==/UserScript==
function TH_PStat_AddGlobalStyle(css) 
{
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function deweet(){
var TH_PStat_HideHeadersName = 'TH_PStat_HideHeaders';
var TH_PStat_HideHeaders = GM_getValue(TH_PStat_HideHeadersName, true);
var strHP, strPP;
var TH_PStatPanelVisibleName = 'TH_PStat_PanelVisible';

if (String(self.location).toUpperCase().indexOf("NAV.PHP") > -1) //loads in nav page
{
	var TH_PStat_totWidth = 10;
	var strongs = document.getElementsByTagName('strong');
	var brHP, brPP;
	for (var i = 0; i < strongs.length; i++)
	{
		if (strongs[i].innerHTML == "HP:")
		{
			strHP = strongs[i];
			strHP.setAttribute('id','strHP');
			brHP = strHP.nextSibling.nextSibling;
		}
		if (strongs[i].innerHTML == "PP:")
		{
			strPP = strongs[i];
			strHP.setAttribute('id','strPP');
			brPP = strPP.nextSibling.nextSibling;
		}
	}
	//Get HP
	var HP = document.getElementById('hpstring').innerHTML;
	GM_log(HP);
	var HPs = HP.split("/");
	var curHP = HPs[0];
	var totHP = HPs[1];
	
	var tblHPTotal = document.createElement('table');
	tblHPTotal.setAttribute('id','tblHPTotal');
	tblHPTotal.setAttribute('class','tblHP');
	tblHPTotal.setAttribute('cellspacing','0');
	tblHPTotal.setAttribute('cellpadding','0');
	tblHPTotal.innerHTML = "<tr><td class='curHP'></td><td class='totHP'></td><td class='disHPP' id='hpstring'>" + HP + "</td></tr>";
	strHP.parentNode.removeChild(strHP.nextSibling);
	strHP.parentNode.insertBefore(tblHPTotal, strHP.nextSibling);
	if (TH_PStat_HideHeaders) {strHP.style.display = 'none';}
	
	var cssHP = ".spanHP" +
				"{" +
					"display: inline;" +
				"}" +
				".tblHP" +
				"{" +
					"width: " + TH_PStat_totWidth + "em;" +
					"border: solid 1px #000;" +
					"height:1.1em;" + 
				"}" +
				".curHP" +
				"{" +
					"width: " + (curHP/totHP*100) + "%;" +
					"background-color:rgb("+GM_getValue('TH_PStat_HPColor',"255,0,0")+")!important;" +
					"color:rgb("+GM_getValue('TH_PStat_HPColor',"255,0,0")+")!important;" +
				"}" +
				".totHP" +
				"{" +
					"width: " + ((1-(curHP/totHP))*100) + "%;" +
					"background-color: none!important;" +
				"}" +
				".disHPP" +
				"{" +
					"position:absolute!important;" +
					"background-color:transparent!important;"+
					"alignment:center"+
					"color: #000;" +
					"left: "+ ((TH_PStat_totWidth/2)-1) +"em;" + 
					"font-weight: bold;" +
				"}";
	TH_PStat_AddGlobalStyle(cssHP);
	
	//Get PP
	var PP = document.getElementById('ppstring').innerHTML;
	var xxx=document.getElementsByTagName('span');
	while(xxx.length)xxx[0].parentNode.removeChild(xxx[0]);
	var PPs = PP.split("/");
	var curPP = PPs[0];
	var totPP = PPs[1];

	var tblPPTotal = document.createElement('table');
	tblPPTotal.setAttribute('id','tblPPTotal');
	tblPPTotal.setAttribute('class','tblPP');
	tblPPTotal.setAttribute('cellspacing','0');
	tblPPTotal.setAttribute('cellpadding','0');
	tblPPTotal.innerHTML = "<tr><td id='curPP' class='curPP'></td><td class='totPP'></td><td class='dispPP' id='ppstring'>" + PP + "</td></tr>";
	strPP.parentNode.removeChild(strPP.nextSibling);
	strPP.parentNode.insertBefore(tblPPTotal, strPP.nextSibling);
	tblPPTotal.parentNode.removeChild(tblPPTotal.nextSibling);
	if (TH_PStat_HideHeaders) {strPP.style.display = 'none';}
	
	var cssPP = ".spanPP" +
				"{" +
					"display: inline;" +
				"}" +
				".tblPP" +
				"{" +
					"width: " + TH_PStat_totWidth + "em;" +
					"border: solid 1px #000;" +
					"height:1.1em;" + 
				"}" +
				".curPP" +
				"{" +
					"width: " + (curPP/totPP*100) + "%;" +
					"background-color:rgb("+GM_getValue('TH_PStat_PPColor',"0,0,255")+")!important;" +
					"color:rgb("+GM_getValue('TH_PStat_PPColor',"0,0,255")+")!important;" +
				"}" +
				".totPP" +
				"{" +
					"width: " + ((1-(curPP/totPP))*100) + "%;" +
					"background-color: none!important;" +
				"}" +
				".disPPP" +
				"{" +
					"width: 0;" + 
					"background-color:transparent!important;"+
					"position:absolute!important;" +
					"color: #000;" +
					"left: "+ ((TH_PStat_totWidth/2)-1) +"em;" + 
					"font-weight: bold;" +
				"}";
	TH_PStat_AddGlobalStyle(cssPP);
}
else
{
	if (String(self.location).toUpperCase().indexOf("INDEX.PHP") > -1) //loads in login page
	{
		TH_PStat_CheckForUpdates();
	}
	else
	{
		if (String(self.location).toUpperCase().indexOf("ACCOUNT.PHP") > -1) //loads in the account page
		{
			var strLoadingImage = 'data:image/gif;base64,R0lGODlhEAAQAMQAAP%2F%2F%2F%2B7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQARAAAAAP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGsCjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAKdgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAAAAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBCAoH4gl%2BFmXNEUEBVAYHToJAVZK%2FXWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAAAAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej%2BFogNhtHyfRQFmIol5owmEta%2FfcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAALAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB%2Bsi6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMggNZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkEBQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjFSAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5lUiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkEBQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjACYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEAIfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKODK7ZbHCoqqSjWGKI1d2kRp%2BRAWGyHg%2BDQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIhACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFMogo%2FJ0lgqEpHgoO2%2BGIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4ObwsidEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgYETCCcrB4OBWwQsGHEhQatVFhB%2FmNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZMAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRkIoYyBRk4BQlHo3FIOQmvAEGBMpYSop%2FIgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVMIgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw%2BELC85hCIAq3Am0U6JUKjkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE%2F5EqIHBjOgyRQELCBB7EAQHfySDhGYQdDWGQyUhADs%3D'
			
			//this requires a div to be created that to both check for updates, and turn on/off the header titles
			var divHPOptions = document.createElement('div');
			divHPOptions.setAttribute('id','divHPOptions');
			divHPOptions.setAttribute('class','divHPOptions');
			divHPOptions.innerHTML = "<h2 style='display:inline;'>HP/PP Status Options</h2> ";
			document.body.insertBefore(divHPOptions, null);
			
			var imgLoading = document.createElement('img');
			imgLoading.setAttribute('id','imgLoading');
			imgLoading.setAttribute('class','imgLoading');
			imgLoading.setAttribute('src',strLoadingImage);
			divHPOptions.insertBefore(imgLoading, null);
			
			var aHPUpdates = document.createElement('a');
			aHPUpdates.setAttribute('id','aHPUpdates');
			aHPUpdates.setAttribute('class','aHPUpdates');
			aHPUpdates.innerHTML = '[check for updates]';
			divHPOptions.insertBefore(aHPUpdates, null);
			aHPUpdates.addEventListener('click', function(event) {
					TH_PStat_CheckForUpdates(aHPUpdates, imgLoading);
				}, true)
			
			var divHideHeaders = document.createElement('div');
			divHideHeaders.setAttribute('id','divHideHeaders');
			divHideHeaders.setAttribute('class','divHideHeaders');
			divHideHeaders.innerHTML = 'Hide HP/PP Headers?';
			divHPOptions.insertBefore(divHideHeaders, null);
			
			var chkHideHeaders = document.createElement('input');
			chkHideHeaders.setAttribute('id','chkHideHeaders');
			chkHideHeaders.setAttribute('class','chkHideHeaders');
			chkHideHeaders.setAttribute('type','checkbox');
			chkHideHeaders.checked = TH_PStat_HideHeaders;
			divHideHeaders.insertBefore(chkHideHeaders, divHideHeaders.firstChild);
			chkHideHeaders.addEventListener('click', function(event) 
			{
				GM_setValue(TH_PStat_HideHeadersName, chkHideHeaders.checked);
				for (var i = 0; i<parent.frames.length; i++)
				{
					if(parent.frames[i].name == 'nav')
					{
						parent.frames[i].location.reload();
						break;
					}
				}
			}, true);
			
			var btnChangeHPColor = document.createElement('input');
			btnChangeHPColor.setAttribute('type','button');
			btnChangeHPColor.setAttribute('id','btnChangeHPColor');
			btnChangeHPColor.setAttribute('class','btnChangeHPColor');
			btnChangeHPColor.value = 'Change HP Color';
			divHPOptions.insertBefore(btnChangeHPColor, null);
			btnChangeHPColor.addEventListener('click', function(e) 
			{
				if(btnChangeHPColor.value == 'Close Form')
				{
					GM_setValue(TH_PStatPanelVisibleName, "none")
					document.getElementById('divColorHP').style.display = 'none';
					btnChangeHPColor.value = 'Change HP Color';
				}
				else
				{
					GM_setValue(TH_PStatPanelVisibleName, "block")
					createChangeColor("HP");
					btnChangeHPColor.value = 'Close Form';
				}
			}, true);
			
			divHPOptions.insertBefore(document.createElement('br'), null);
			
			var btnChangePPColor = document.createElement('input');
			btnChangePPColor.setAttribute('type','button');
			btnChangePPColor.setAttribute('id','btnChangePPColor');
			btnChangePPColor.setAttribute('class','btnChangePPColor');
			btnChangePPColor.value = 'Change PP Color';
			divHPOptions.insertBefore(btnChangePPColor, null);
			btnChangePPColor.addEventListener('click', function(e) 
			{
				if(btnChangePPColor.value == 'Close Form')
				{
					GM_setValue(TH_PStatPanelVisibleName, "none")
					document.getElementById('divColorPP').style.display = 'none';
					btnChangePPColor.value = 'Change PP Color';
				}
				else
				{
					GM_setValue(TH_PStatPanelVisibleName, "block")
					createChangeColor("PP");
					btnChangePPColor.value = 'Close Form';
				}
			}, true);
			
			
			divHPOptions.insertBefore(document.createElement('br'), null);
			divHPOptions.insertBefore(document.createElement('br'), null);
			divHPOptions.insertBefore(document.createElement('br'), null);
			
			var cssHPOptions = ".divHPOptions" +
						"{" +
							"" + 
						"}" +
						".imgLoading" +
						"{" +
							"display:none;" + 
						"}" +
						".aHPUpdates" +
						"{" +
							"text-decoration:underline;" + 
							"cursor:pointer;" + 
							"font-size:x-small;" + 
							"color:orange;" + 
						"}" +
						".divHideHeaders" +
						"{" +
						"}" +
						".selHideHeaders" +
						"{" +
						"}";
			TH_PStat_AddGlobalStyle(cssHPOptions);
		}
	}
}

function createChangeColor(control)
{
	if(!control){control = "";}
	var divColor = document.getElementById('divColor'+control)
	if(divColor)
	{
		divColor.style.display = 'block';
	}
	else
	{
		divColor = document.createElement('div');
		divColor.setAttribute('id','divColor'+control);
		divColor.setAttribute('class','divColor');
		divHPOptions.insertBefore(divColor, null);
		
		var divColorTitle = document.createElement('span');
		divColorTitle.setAttribute('id','divColorTitle');
		divColorTitle.setAttribute('class','divColorTitle');
		divColor.insertBefore(divColorTitle, divColor.firstChild);

		var spanColorTable = document.createElement('table');
		spanColorTable.setAttribute('id', 'spanColorTable');
		spanColorTable.setAttribute('class', 'spanColorTable');
		spanColorTable.innerHTML = "<tr><td>Change Color - " + control + "</td><td id='tdClose' align='right'></td></tr>";
		divColorTitle.insertBefore(spanColorTable, null);
		
		var divColorTest = document.createElement('div')
		divColorTest.setAttribute('id', 'divColorTest'+control);
		divColorTest.setAttribute('class', 'divColorTest'+control);
		divColorTest.innerHTML = '&nbsp;';
		divColor.insertBefore(divColorTest, null);
		
		var color = GM_getValue('TH_PStat_'+control+'Color',"0,0,0");
		var colors = color.split(",");
		
		var divR = document.createElement('div');
		divR.setAttribute('id', 'divR');
		divR.setAttribute('class', 'divR');
		divR.innerHTML = "All values from 0-255<br>Red Value:";
		divColor.insertBefore(divR, null);
		
		var txtR = document.createElement('input')
		txtR.setAttribute('id', 'txtR');
		txtR.setAttribute('class', 'txtR');
		txtR.setAttribute('type','text');
		txtR.value = colors[0];
		divR.insertBefore(txtR, null);
		txtR.addEventListener('blur',function(e){
			divColorTest.style.backgroundColor = "rgb(" + txtR.value + "," +txtG.value +","+txtB.value+")";
		}, true);
		
		var divG = document.createElement('div');
		divG.setAttribute('id', 'divG');
		divG.setAttribute('class', 'divG');
		divG.innerHTML = "Green Value:";
		divColor.insertBefore(divG, null);
		
		var txtG = document.createElement('input')
		txtG.setAttribute('id', 'txtG');
		txtG.setAttribute('class', 'txtG');
		txtG.setAttribute('type','text');
		txtG.value = colors[1];
		divG.insertBefore(txtG, null);
		txtG.addEventListener('blur',function(e){
			divColorTest.style.backgroundColor = "rgb(" + txtR.value + "," +txtG.value +","+txtB.value+")";
		}, true);
		
		var divB = document.createElement('div');
		divB.setAttribute('id', 'divB');
		divB.setAttribute('class', 'divB');
		divB.innerHTML = "Blue Value:";
		divColor.insertBefore(divB, null);
		
		var txtB = document.createElement('input')
		txtB.setAttribute('id', 'txtB');
		txtB.setAttribute('class', 'txtB');
		txtB.setAttribute('type','text');
		txtB.value = colors[2];
		divB.insertBefore(txtB, null);
		txtB.addEventListener('blur',function(e){
			divColorTest.style.backgroundColor = "rgb(" + txtR.value + "," +txtG.value +","+txtB.value+")";
		}, true);
		
		var divAccept = document.createElement('div')
		divAccept.setAttribute('id', 'divAccept');
		divAccept.setAttribute('class', 'divAccept');
		divColor.insertBefore(divAccept, null);
		
		var divError = document.createElement('div');
		divError.setAttribute('id', 'divError');
		divError.setAttribute('class', 'divError');
		divError.innerHTML = '';
		divAccept.insertBefore(divError, null);
		
		var btnAccept = document.createElement('input');
		btnAccept.setAttribute('type','button');
		btnAccept.value = 'Choose Color';
		divAccept.insertBefore(btnAccept, null);
		btnAccept.addEventListener('click',function(e){
			var errText = "";
			
			if(isNaN(txtR.value) || parseInt(txtR.value) < 0 || parseInt(txtR.value) > 255)
			{
				errText += (errText!=""?"<br>":"") + "Invalid Red Value.  Valid values are in the range 0 to 255";
			}
			if(isNaN(txtG.value) || parseInt(txtG.value) < 0 || parseInt(txtG.value) > 255)
			{
				errText += (errText!=""?"<br>":"") + "Invalid Green Value.  Valid values are in the range 0 to 255";
			}
			if(isNaN(txtB.value) || parseInt(txtB.value) < 0 || parseInt(txtB.value) > 255)
			{
				errText += (errText!=""?"<br>":"") + "Invalid Blue Value.  Valid values are in the range 0 to 255";
			}
			
			if(errText == "")
			{
				
				GM_setValue('TH_PStat_'+control+'Color',txtR.value + "," +txtG.value +","+txtB.value);
				for (var i = 0; i<parent.frames.length; i++)
				{
					if(parent.frames[i].name == 'nav')
					{
						parent.frames[i].location.reload();
						break;
					}
				}
				document.getElementById('divColor'+control).style.display = 'none';
				document.getElementById('btnChange'+control+'Color').value = 'Change ' + control + ' Color';
			}
			else
			{
				divError.innerHTML = errText;
			}
		},true)
	
		var cssColor = ".divColor" +
						"{" +
							"text-alignment: center;" +
							"border: 2px outset;" +
							"-moz-border-radius: 0.5em !important;" +
							"position: absolute;" +
							"top: " + (window.innerHeight/2)  + "px;" +
							"display: " + GM_getValue(TH_PStatPanelVisibleName, "none") + ";"+
							"left: " + ((window.innerWidth/2)-125)  + "px;" +
							"background-color: lightgrey;" +
							"width: 250px;" +
						"}" +
						".divColorTitle" +
						"{" +
							"top: 0px;"+
							"left: 0px;"+
							"position: relative;"+
							"width: 9999px;"+
							"background-color: silver;"+
						"}"+
						".spanColorTable" +
						"{" +
							"top: 0px;"+
							"left: 0px;"+
							"position: relative;"+
							"width: 100%;"+
							"background-color: silver;"+
						"}" +
						".txtR" + 
						"{" + 
							"width:60px;" + 
						"}" +
						".txtG" + 
						"{" + 
							"width:60px;" + 
						"}" +
						".txtB" + 
						"{" + 
							"width:60px;" + 
						"}" +
						".divError" + 
						"{" + 
							"color:red;" + 
						"}" +
						".divColorTest"+control + 
						"{" + 
							"position:absolute;" + 
							"top:25px;" +
							"left:175px;" + 
							"width:50px;" + 
							"height:50px;" + 
							"background-color:rgb("+GM_getValue('TH_PStat_'+control+'Color',"0,0,0")+");" +
							"border: solid 1px #000;" + 
						"}";
		TH_PStat_AddGlobalStyle(cssColor);
	}
}}

window.addEventListener('load', function(){setTimeout(deweet,500);GM_log('hi');},true);
