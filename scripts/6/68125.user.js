// ==UserScript==
// @name           Sokker watchlist for non plus
// @author         Ascia
// @description    Version 1.0 - This script allows to add a player into a watchlist in your office page like the standard plus functionality
// @include        http://online.sokker.org/player.php*
// @include        http://online.sokker.org/office.php
// ==/UserScript==

function getElementByClass(tagName, theClass) {

	var allHTMLTags=document.getElementsByTagName(tagName);
	var returnTags = new Array();
	var j=0;
  for (i=0; i<allHTMLTags.length; i++) {
	  if (allHTMLTags[i].className==theClass) {
	 		returnTags[j] = allHTMLTags[i];
	 		j++;
    }
  }
  return returnTags;
}
    
function svuota(){
  GM_setValue('idis','');
}

function addPlayer(){
	var idisstring = GM_getValue('idis','');
	
	if(checkIdExists()){
		if(idisstring == '')
			GM_setValue('idis',playername+':'+playerid);
		else{
			idisstring = idisstring+';'+playername+':'+playerid;
			GM_setValue('idis',idisstring);
		}
		window.alert('aggiunto giocatore '+playerid+' in watchlist');
		newlitag.innerHTML = '';
	}
	
}

function checkIdExists(){
	var idisstring = GM_getValue('idis','');
	var idis = idisstring.split(';');
	var flag = true;
	for(i in idis){
		if(idis[i]==playername+':'+playerid){
			flag=false;
			break;
		}
	}
	return flag;
}

function removePlayer(playerToken){
	var idisstring = GM_getValue('idis','');
	var idis = idisstring.split(';');
	var returnIdis ='';
	for(i in idis){
		if(idis[i]!=playerToken){
			if(returnIdis==''){
				returnIdis = idis[i];
			}
			else{
				returnIdis = returnIdis+';'+idis[i];
			}
		}
	}

	if(returnIdis!=''){
		var playerid = playerToken.split(":")[1];
		document.getElementById(playerid).setAttribute("style","display:none;");
	}
	else{
		document.getElementById("watchlistcontainer").setAttribute("style","display:none;");
	}
	GM_setValue('idis',returnIdis);
	
}

function closeWatchlist(){
	document.getElementById("watchlistcontainer").setAttribute("style","display:none;");
}

var titletag = document.getElementsByTagName('h1').item(0);
if(titletag.innerHTML.match(/\[[0-9]{5,11}\]/)){
	var ultag = document.getElementsByTagName('ul').item(0);
	var playerid = /\[[0-9]{5,11}\]/.exec(titletag.innerHTML)[0].replace(']','').replace('[','');	
	var playername = titletag.innerHTML.replace(' ['+playerid+']','');
	var newlitag = document.createElement('li');
	
	if(checkIdExists()){
		newlitag.innerHTML = '<a href="#">Watchlist</a>';
		newlitag.addEventListener('click', function (e){addPlayer()}, false); 
	}
	
	ultag.insertBefore(newlitag, ultag.firstChild.nextSibling);
	
}
else{
	
	var idiss = GM_getValue('idis','');
	if(idiss != ''){
	
		var containerSpaceToTop = document.createElement('div');
		containerSpaceToTop.setAttribute("class", "container space2Top");
		containerSpaceToTop.setAttribute("id", "watchlistcontainer");
		var leftline = document.createElement('div');
		leftline.setAttribute("class", "leftLine");
		var rightline = document.createElement('div');
		rightline.setAttribute("class", "rightLine");
		var header = document.createElement('div');
		header.setAttribute("class", "header");
		var titleBlock1 = document.createElement('div');
		titleBlock1.setAttribute("class", "titleBlock1");
		titleBlock1.innerHTML ="Watchlist";
		var closeTitleBlock1 = document.createElement('a');
		closeTitleBlock1.setAttribute("class", "textColor7 linkStyle4");
		closeTitleBlock1.setAttribute("style", "float: right;");
		closeTitleBlock1.setAttribute("href", "#");
		closeTitleBlock1.innerHTML ="<b>X</b>";
		closeTitleBlock1.addEventListener('click', function (e){closeWatchlist()}, false);
		var insideContainerSpace2Top = document.createElement('div');
		insideContainerSpace2Top.setAttribute("class", "insideContainer space2Top");
		var content = document.createElement('div');
		content.setAttribute("class", "content");
		
		var watchListTL = document.createElement('div');
		watchListTL.setAttribute("class", "titleBlock2");
		watchListTL.innerHTML = "Watchlist";
		
		var tableTL = document.createElement('table');
		tableTL.setAttribute("class", "tableStyle2");
		tableTL.setAttribute("style", "width: 100%;");
		
		var tableBodyTL = document.createElement('tbody');
		
		/*
		var watchListNoTL = document.createElement('div');
		watchListNoTL.setAttribute("class", "titleBlock2");
		watchListNoTL.innerHTML("Watchlist others");
		
		var tableNoTL = document.createElement('table');
		tableNoTL.setAttribute("class", "tableStyle2");
		tableNoTL.setAttribute("style", "width: 100%;");
		
		var tableBodyNoTL = document.createElement('tbody');
		
		----
		*/
		
		var arridis = idiss.split(';');
		for(i in arridis){
			var parts = arridis[i].split(':');
			
			var tr = document.createElement('tr');
			tr.setAttribute("class", "bgColor2");
			tr.setAttribute("id",parts[1]);
			var td = document.createElement('td');
			
			var a = document.createElement('a');
			a.setAttribute("class", "linkStyle1");
			a.setAttribute("href", "player.php?PID="+parts[1]);
			a.innerHTML = parts[0];
			
			var tdd = document.createElement('td');
			tdd.setAttribute("style", "width: 20%; text-align:right;");
			var a2 = document.createElement('a');
			a2.setAttribute("class", "linkStyle1");
			a2.setAttribute("href", "#");
			
			a2.innerHTML = 'Rimuovi';
			a2.addEventListener('click', function (e){removePlayer(arridis[i])}, false); 
			
			td.appendChild(a);
			tdd.appendChild(a2);
			tr.appendChild(td);
			tr.appendChild(tdd);
			tableBodyTL.appendChild(tr);
			
			var tr2 = document.createElement('tr');
			var td2 = document.createElement('td');
			td2.setAttribute("style", "padding: 0pt;");
			td2.setAttribute("colspan", "2");
			var divseparator = document.createElement('div');
			divseparator.setAttribute("class", "separatorLine");
			divseparator.setAttribute("style", "width: 98%; margin-right: auto; margin-left: auto;");
			
			td2.appendChild(divseparator);
			tr2.appendChild(td2);
			tableBodyTL.appendChild(tr2);
			
		}

		tableTL.appendChild(tableBodyTL);
		
		content.appendChild(watchListTL);
		content.appendChild(tableTL);
		content.appendChild(document.createElement('br'));
		insideContainerSpace2Top.appendChild(content);
		header.appendChild(closeTitleBlock1);
		header.appendChild(titleBlock1);
		rightline.appendChild(header);
		rightline.appendChild(insideContainerSpace2Top);
		leftline.appendChild(rightline);
		containerSpaceToTop.appendChild(leftline);
		

		var containerz = document.getElementsByTagName('div');
		containerz.item(14).insertBefore(containerSpaceToTop,containerz.item(14).childNodes[4]);
		
	}
	
}


