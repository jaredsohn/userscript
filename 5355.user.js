//
// User Stats Spy & Attack Logs - GreaseMonkey Script
// Author: Lukas Brueckner
//
// This script will display on the stats page of a user if he attacked/spied/sabbed you and if you did
//
// If you find any bugs, have any suggestions or comments
// please email me at coding@lukas-brueckner.de
//
// Thanks go to Lachlan Maxwell for his KoC Armory and Battlefield scripts


// ==UserScript==
// @name		KoC User
// @description		Display Logs on stats page
// @include		http://*kingsofchaos.com/stats.php*
// ==/UserScript==


(function(){


	function foreach(stuff, f){
		for(var i=0; i < stuff.length; i++)
		{
			var stop_iter = f(stuff[i]);
			if (stop_iter)
				return;
		}
	}

	function addCSS(){
		var head = document.getElementsByTagName("head")[0];
		if(!head) return; // D'oh!

		var style = document.createElement("style");
		style.type = "text/css";
		var s = "";
		foreach(arguments, function(style){s+=style+"\n";});
		style.innerHTML = s;
		head.appendChild(style);
	}
	
	function addJS(){
		var head = document.getElementsByTagName("head")[0];
		if(!head) return; // D'oh!

		var js= document.createElement("script");
		js.type = "text/javascript";
		var s = "";
		foreach(arguments, function(js){s+=js+"\n";});
		js.innerHTML = s;
		head.appendChild(js);
	}
	
	function HidePreferences(){
		var prefs = document.getElementById("_md_prefs");
		if(prefs) prefs.style.display="none";
	}
	function setPreferences(){

        var userprefs=document.getElementsByTagName('input');

        for (var j=0; j < userprefs.length; j++)
        {
			if (userprefs[j].name.match(/_userStats/) != null) {
				if(userprefs[j].checked == true)
					GM_setValue(userprefs[j].name, userprefs[j].value);
				else if(userprefs[j].type != 'radio')
					GM_setValue(userprefs[j].name, userprefs[j].value);
			}

        }

      }
	  
	function doTwo(event){
		setPreferences();
		HidePreferences();
		event.preventDefault();
	}

	function ShowPreferences(){
		var prefs = document.getElementById("_md_prefs");
		if(!prefs){
			addCSS(
				"#_md_prefs {position:fixed; left:0; right:0; bottom:0; top:auto; width:100%;  color:#ffffff; font: 11px Verdana; border-top:1px #888888 solid; background:#000000;}",
				"#_md_prefs div { text-align: left;padding:5px 0 0.4em 0; width:800px; margin: auto;}",
				"#_md_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
				"#_md_prefs input[disabled]{background: #CCC;}",
				"#_md_prefs input[type=text] { width: 50px; }"
			);

			var prefs = document.createElement("div")
			prefs.id = "_md_prefs";

			var s = "<div><b>Kings of Chaos :: User Stats Logs</b><br />";
			var checked = (GM_getValue('_userStatsToggle', '1') == '1') ? " checked='checked' " : "";
			var unchecked = checked == '' ? ' checked="checked" ' : "";
			var checkedFirst = (GM_getValue('_userStatsFirst', 'intel') == 'intel') ? " checked='checked' " : "";
			var uncheckedFirst = checkedFirst == '' ? ' checked="checked" ' : "";

			s += 'Fetch Logs automatically<br /><input type="radio" id="_userStatsToggle" name="_userStatsToggle" value="1"' + checked + '/><label for="_userStatsToggle">On</label>';
			s += '<input type="radio" id="_userStatsToggle1" name="_userStatsToggle" value="0"' + unchecked + ' /><label for="_userStatsToggle">Off</label>';
			s += '<br />Logs to display first: <input type="radio" id="_userStatsFirst" name="_userStatsFirst" value="intel"' + checkedFirst + '/><label for="_userStatsFirst">Intel Logs</label><input type="radio" id="_userStatsFirst1" name="_userStatsFirst" value="battle"' + uncheckedFirst + ' /><label for="_userStatsToggle">Battle Logs</label>';
			s += '<br /># of logpages to scan: <input type="text" name="_userStatsPages" value="'+(GM_getValue('_userStatsPages', '5'))+'" /><br /><input type="submit" id="_prefClose" value="Submit" /></div>';
			prefs.innerHTML = s;
			document.body.appendChild(prefs);

			document.getElementById("_prefClose").addEventListener('click', doTwo, true);
			}
		prefs.style.display="";
	}


GM_registerMenuCommand("KOC User Stats Prefs...", ShowPreferences);

if(GM_getValue('_userStatsToggle') == 1){
	var trRE = /\<tr\>/ig;
	var tableRE = /\<table/ig;
	var nameRE = /\<td\>\<b\>Name:\<\/b\>\<\/td\>/ig;
	var q = document.getElementsByTagName('tr');
	var userName;
	var logsFirst = GM_getValue('_userStatsFirst', 'intel');
	
	for(var i = 0; i < q.length; i++){
		if(q[i].innerHTML.match(trRE) == null && q[i].innerHTML.match(nameRE))
		{
			var temp = q[i].innerHTML.split('<td>');
			userName = temp[2].substring(0, temp[2].indexOf('<'));
		}
	}
	
	var interIntel = '<tr><th colspan="5" align="center">Intercepted Intel Logs</th></tr>';
	var intel = '<tr><th colspan="6" align="center">Intel Logs</th></tr>';
	var attacks = '<tr><th colspan="9" align="center">Attacks</th></tr>';
	var defenses = '<tr><th colspan="9" align="center">Defenses</th></tr>';
	var rMessages = '<tr><th colspan="7" align="center">Received Messages</th></tr>';
	var sMessages = '<tr><th colspan="7" align="center">Sent Messages</th></tr>';
	
	q = document.getElementsByTagName('table');
	
	addJS('function toggleOn(nr)',
		'{ ',
		'  for(var i = 0; i < nr.length; i++){  ',
		' 	var q = document.getElementById(\'_gmStats\' + nr[i]);',
		' 	q.style.visibility = \'visible\';',
		' 	q.style.display = \'table\'; ',
		'  } ',
		'}',
		'function toggleOff(nr)',
		'{ ',
		'  for(var i = 0; i < nr.length; i++){  ',
		' 	var q = document.getElementById(\'_gmStats\' + nr[i]);',
		' 	q.style.visibility = \'hidden\';',
		' 	q.style.display = \'none\'; ',
		'  } ',
		'}'
	);
	
	function doMove() {
		var a = document.getElementById('_loader');
		a.innerHTML = (a.innerHTML.indexOf('...') != -1) ? 'Please Wait' : a.innerHTML + '.';
		setTimeout(doMove,300); 
	}
	
	for(var i = 0; i < q.length; i++){
		if(q[i].innerHTML.match(tableRE) == null && q[i].innerHTML.indexOf('Officers') != -1){
			for(var j = 6; j > 0; j--){
				var userStats = document.createElement('table');
				userStats.className = 'table_lines';
				userStats.width = '100%';
				userStats.cellSpacing = '0';
				userStats.cellPadding = '6';
				userStats.border = '0';
				userStats.id = '_gmStats'+j;
				userStats.style.visibility = 'hidden';
				userStats.style.display = 'none';
				q[i].parentNode.insertBefore(userStats, q[i].nextSibling);
			}

			var changeStats = document.createElement('table');
			changeStats.className = 'table_lines';
			changeStats.width = '100%';
			changeStats.id = '_gmStatsWait';
			changeStats.cellSpacing = '0';
			changeStats.cellPadding = '6';
			changeStats.border = '0';
			changeStats.innerHTML = '<tr><th align="center">Loading Logs</th></tr><tr><td><span id=\'_loader\'>Please Wait</span></td></tr>';
			q[i].parentNode.insertBefore(changeStats, q[i].nextSibling);	
			
			changeStats = document.createElement('div');
			changeStats.width = '100%';
			changeStats.style.textAlign = 'center';
			changeStats.id = '_gmStatsChange';
			var s = '<br />Choose Logs: <a href="#" onclick="javascript:toggleOn([1, 2]); javascript:toggleOff([3, 4, 5, 6]);">Intel Logs</a> | \n';
			s += '<a href="#" onclick="javascript:toggleOn([3, 4]); javascript:toggleOff([1, 2, 5, 6]);">Attack Logs</a> | ';
			s += '<a href="#" onclick="javascript:toggleOn([5, 6]); javascript:toggleOff([3, 4, 1, 2]);">Messages</a> | ';
			s += '<a href="#" onclick="javascript:toggleOff([1, 2, 3, 4, 5, 6]);">Hide All</a>\n<br /><br />\n';
			changeStats.innerHTML = s;
			q[i].parentNode.insertBefore(changeStats, q[i].nextSibling);
			break;
		}
	}
	
	doMove();
	
	var offset = 0;
	var end = GM_getValue('_userStatsPages', '5') * 30 - 30;	
	q = document.getElementById('_gmStats2');
	q.innerHTML = intel;
	q = document.getElementById('_gmStats1');
	q.innerHTML = interIntel;
	var foundIntel = false;
	
	while(offset <= end){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.kingsofchaos.com/intel.php?b_start='+offset+'&o_start='+offset,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var bodyHtml = responseDetails.responseText.substr(responseDetails.responseText.indexOf('Intercepted Intelligence Operations')).split('<table');
				var interIntelTemp = bodyHtml[0].split('<tr>');
				var intelTemp = bodyHtml[1].split('<tr>');
				
				var userRE = new RegExp(userName,"i");
				
				var qT = document.getElementById('_gmStats1');
				if(logsFirst == 'battle'){
					qT.style.visibility = 'hidden';
					qT.style.display = 'none';
				}
				for(var j = 0; j < interIntelTemp.length; j++){
					if(interIntelTemp[j].indexOf(userName) != -1){
						var thisTemp = interIntelTemp[j].replace(/\<td align="left"\>\<a href="stats.php\?id=[a-zA-Z0-9]+"\>/ig, "").replace(userRE, "").replace(/\<\/a\>\<\/td\>/i, "");
						qT.innerHTML = (qT.innerHTML.indexOf('<td colspan="5">None</td>') != -1) ? interIntel + thisTemp : qT.innerHTML + thisTemp;
					}
				}
				
				qT = document.getElementById('_gmStats2');
				for(var j = 0; j < intelTemp.length; j++){
					if(intelTemp[j].indexOf(userName) != -1){
						var temp = intelTemp[j].substring(intelTemp[j].indexOf('r"><a href="') + 12, intelTemp[j].indexOf('">details'));
						foundIntel = true;
						
						if(logsFirst == 'intel'){
							qT.style.visibility = 'visible';
							qT.style.display = 'table';
						}
						
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://www.kingsofchaos.com/' + temp,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Accept': 'application/atom+xml,application/xml,text/xml',
							},
							onload: function(responseDetails) {
								var tempDetails = responseDetails.responseText.substring(responseDetails.responseText.indexOf('r">Intelligence on ' +  userName), responseDetails.responseText.indexOf('reports total | page'));
														
								tempDetails = tempDetails.replace(/r"\>Intelligence on/i, "").replace(userRE, "").replace(/\<\/th\>\<\/tr\>/i, "");
								tempDetails = tempDetails.replace(/\<td colspan="2"\>&nbsp;\<\/td\>/i, "").replace(/\<td colspan="3" align="center"\>[0-9]+/i, "");
								qT.innerHTML = (qT.innerHTML.indexOf('<td colspan="5">None</td>') != -1) ? intel + tempDetails : qT.innerHTML + tempDetails;
							},
							onreadystatechange: function(responseDetails){
								if(responseDetails.readyState == 4){
									hideWait();
								}
							}
						});
					}
				}
			},
			onreadystatechange: function(responseDetails){
				if(responseDetails.readyState == 4){
					if(responseDetails.responseText.indexOf('Next') == -1)
						hideWait();
				}
			}
		});
		offset += 30;
	}
				
	if(foundIntel == false){
		q = document.getElementById('_gmStats2');
		if(logsFirst == 'intel'){
			q.style.visibility = 'visible';
			q.style.display = 'table';
		}
		q.innerHTML = ((q.innerHTML == '<tbody>'+intel+'</tbody>') ? intel + '<tr><td colspan="5">None</td></tr>' : q.innerHTML);
	}
	
	q = document.getElementById('_gmStats1');
	if(logsFirst == 'intel'){
		q.style.visibility = 'visible';
		q.style.display = 'table';
	}
	q.innerHTML = ((q.innerHTML == '<tbody>'+interIntel+'</tbody>') ? interIntel + '<tr><td colspan="5">None</td></tr>' : q.innerHTML);
	
	
	q = document.getElementById('_gmStats3');
	q.innerHTML = defenses;
	q = document.getElementById('_gmStats4');
	q.innerHTML = attacks;
	
	offset = 0;
	while(offset <= end){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.kingsofchaos.com/attacklog.php?b_start='+offset+'&o_start='+offset,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var bodyHtml = responseDetails.responseText.substr(responseDetails.responseText.indexOf('Attacks on You')).split('<table');
				var defensesTemp = bodyHtml[0].split('<tr>');
				var attacksTemp = bodyHtml[1].split('<tr>');
				
				var userRE = new RegExp(userName,"i");
				
				var qT = document.getElementById('_gmStats3');
				
				for(var j = 0; j < defensesTemp.length; j++){
					if(defensesTemp[j].indexOf(userName) != -1){
						var thisTemp = defensesTemp[j].replace(/\<td align="left"\>\<a href="stats.php\?id=[a-zA-Z0-9]+"\>/ig, "").replace(userRE, "").replace(/\<\/a\>\<\/td\>/i, "");
						qT.innerHTML = (qT.innerHTML == '<tbody>'+defenses+'<tr><td colspan="9">None</td></tr></tbody>') ? defenses + thisTemp : qT.innerHTML + thisTemp;
					}
				}
				
				qT = document.getElementById('_gmStats4');
				
				for(var j = 0; j < attacksTemp.length; j++){
					if(attacksTemp[j].indexOf(userName) != -1){
						var thisTemp = attacksTemp[j].replace(/\<td align="left"\>\<a href="stats.php\?id=[a-zA-Z0-9]+"\>/ig, "").replace(userRE, "").replace(/\<\/a\>\<\/td\>/i, "");
						qT.innerHTML = (qT.innerHTML == '<tbody>'+attacks+'<tr><td colspan="9">None</td></tr></tbody>') ? attacks + thisTemp : qT.innerHTML + thisTemp;
					}
				}
				
			},
			onreadystatechange: function(responseDetails){
				if(responseDetails.readyState == 4){
					if(responseDetails.responseText.indexOf('details') == -1)
						hideWait();
				}
			}
		});
		offset += 30;
	}
	
	q = document.getElementById('_gmStats3');
	q.innerHTML = ((q.innerHTML == '<tbody>'+defenses+'</tbody>') ? defenses + '<tr><td colspan="9">None</td></tr>' : q.innerHTML);
	if(logsFirst == 'battle'){
		q.style.visibility = 'visible';
		q.style.display = 'table';
	}
	q = document.getElementById('_gmStats4');
	q.innerHTML = ((q.innerHTML == '<tbody>'+attacks+'</tbody>') ? attacks + '<tr><td colspan="9">None</td></tr>' : q.innerHTML);
	if(logsFirst == 'battle'){
		q.style.visibility = 'visible';
		q.style.display = 'table';
	}


	q = document.getElementById('_gmStats5');
	q.innerHTML = rMessages;
	q = document.getElementById('_gmStats6');
	q.innerHTML = sMessages;
	
	offset = 0;
	while(offset <= end){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.kingsofchaos.com/inbox.php?b_start='+offset+'&o_start='+offset,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var bodyHtml = responseDetails.responseText.substr(responseDetails.responseText.indexOf('Inbox')).split('<table width="100%" bgcolor="#000000"');
				var rMTemp = bodyHtml[1].split('<tr>');
				var sMTemp = bodyHtml[2].split('<tr>');
				
				var userRE = new RegExp(userName,"i");
				
				var qT = document.getElementById('_gmStats5');
				
				for(var j = 0; j < rMTemp.length; j++){
					if(rMTemp[j].indexOf(userName) != -1){
						var thisTemp = rMTemp[j].replace(/\<td align="left"\>\<a href="stats.php\?id=[a-zA-Z0-9]+"\>/ig, "").replace(userRE, "").replace(/\<\/a\>\<\/td\>/i, "");
						thisTemp += rMTemp[j + 1];
						thisTemp += rMTemp[j + 2];
						j += 2;
						qT.innerHTML = (qT.innerHTML == '<tbody>'+rMessages+'<tr><td colspan="7">None</td></tr></tbody>') ? rMessages + thisTemp : qT.innerHTML + thisTemp;
					}
				}
				
				qT = document.getElementById('_gmStats6');
				
				for(var j = 0; j < sMTemp.length; j++){
					if(sMTemp[j].indexOf(userName) != -1){
						var thisTemp = sMTemp[j].replace(/\<td align="left"\>\<a href="stats.php\?id=[a-zA-Z0-9]+"\>/ig, "").replace(userRE, "").replace(/\<\/a\>\<\/td\>/i, "");
						thisTemp += sMTemp[j + 1];
						thisTemp += sMTemp[j + 2];
						j += 2;
						qT.innerHTML = (qT.innerHTML == '<tbody>'+sMessages+'<tr><td colspan="7">None</td></tr></tbody>') ? sMessages + thisTemp : qT.innerHTML + thisTemp;
					}
				}
				
			},
			onreadystatechange: function(responseDetails){
				if(responseDetails.readyState == 4){
					if(responseDetails.responseText.indexOf('details') == -1)
						hideWait();
				}
			}
		});
		offset += 900;
	}
	
	q = document.getElementById('_gmStats5');
	q.innerHTML = ((q.innerHTML == '<tbody>'+rMessages+'</tbody>') ? rMessages + '<tr><td colspan="7">None</td></tr>' : q.innerHTML);
	if(logsFirst == 'msg'){
		q.style.visibility = 'visible';
		q.style.display = 'table';
	}
	q = document.getElementById('_gmStats6');
	q.innerHTML = ((q.innerHTML == '<tbody>'+sMessages+'</tbody>') ? sMessages + '<tr><td colspan="7">None</td></tr>' : q.innerHTML);
	if(logsFirst == 'msg'){
		q.style.visibility = 'visible';
		q.style.display = 'table';
	}

	var both = '';
	function hideWait(){
		both += '1';
		if(both == '1111'){
			document.getElementById('_gmStatsWait').style.visibility = 'hidden';
			document.getElementById('_gmStatsWait').style.display = 'none';
		}
	}
}


})();