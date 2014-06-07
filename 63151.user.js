// ==UserScript==
// @name 	Ikariam: Handling
// @author 	Phate
// @version	0.2
// @description    	Ikariam script to manage the movement of goods troops and fleets 
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

// Changelog:
//	v0.2	Eliminato il selettore citta' e inserito un elenco delle citta', questo permette una selezione piu' veloce.
//			La citta' selezionata nell'elenco e' in grassetto. 
//			Features: Inserita icona nella lista città per eliminare il giocatore dalla lista player.
//
//	v0.1 Stesura iniziale
// 			In tutte le pagine e possibile movimentare merce flotte ed esercito verso le proprie citta' o verso le citta' degli alleati.
//			Nella pagina del diplomatico e' possibile inserire i giocatori della propria alleanza nella lista delle movimentazioni.
//			Nell'intestazione tabella ci sono 2 pulsanti per inserire o cancellare tutti i Giocatori dell'alleanza.

//	Features:
//		Inserire in caso di selezione alleato anche le icone di difendi porto e difendi città.
//		Inserire calcolo viaggio e visualizzarlo nel 'select' oppure impostare due campi soglia per viaggio medio e viaggio lungo per poi
//			colorare le citta' in base a questa scala.
//		Quando si seleziona una città nella visuale isola, dare la possibilita' di inserire o eliminare il giocatore e la sua citta'.
//		Inserire nella lista movimentazione anche i giocatori con cui si hanno accordi.

var lversion = "0.2";
var updatesite = "http://ikariamscript.forumfree.net/?f=7657296";
var url=String(window.location).split('?')[0];
var urlId = (url.split('//')[1]).split('.')[0] + (url.split('.')[2]).split('/')[0]
var lang = getLanguage();

window.addEventListener('load',  function() 
{ 
try
{
	
	var page = document.getElementsByTagName('body')[0].id;
	
	if (page == 'options'){pageOption()}
	
	if (page == 'sendIKMessage')	// if you send message for leave alliance
	{
		var msgleaveally = document.getElementById('treaties').value
		if (msgleaveally == 94)	
		{
			var submitmsg = document.getElementById('notice').getElementsByTagName('form')[0]
			submitmsg.addEventListener('submit',function() {GM_setValue('Hand_member_'+ urlId,"");},true);	// delete list of member in select box
		}
	}
	
	check_for_update()
		
	if (document.getElementById('container2') == null){return;}	// exit if it is not exist
	if (page == 'diplomacyAdvisorAlly' && document.getElementById('memberList') != null) 
			{selectPlayer(document.getElementById('memberList'))}	// check ally's player
		
	var listplayer = GM_getValue('Hand_member_'+ urlId,"");	// list of the members name  
	var numCity = document.getElementById('citySelect').getElementsByTagName('option').length;
	if (numCity < 2 && listplayer == "") {return;} // exit if you haven't 2 cities and members in ally
		
	var showType = GM_getValue('handling_position',0);
				
	// style box
	if(showType==1)	// if you want show down botton
	{
		GM_addStyle('#handling {position: absolute; top:-65px; left:-2px; z-index:299}');
	}
	else
	{
		GM_addStyle('#handling {position: absolute; top:16px; left:717px; z-index:299}');
		GM_addStyle('#handling h3{display:none;}');
		
		// botton open Handling
		GM_addStyle('#open_handling {position:absolute; top:18px; left:964px; z-index:300}');
	}
	GM_addStyle('#handling div{display:none;}');	
		
	// style size font into action icons
	GM_addStyle('#handlingContent a {font-size:11px;}');
		
	var newHand = document.createElement('div');
	newHand.setAttribute('id','handling');
	newHand.setAttribute('class','dynamic');
		
	if(showType==1)
		{document.getElementById('container2').appendChild(newHand);}
	else
	{
		document.getElementById('container2').insertBefore(newHand,document.getElementById('container2').firstChild);
		//button for open handling box
		var buttonHand = document.createElement('div');
		buttonHand.setAttribute('id','open_handling');
		document.getElementById('container2').insertBefore(buttonHand,document.getElementById('container2').firstChild);
		document.getElementById('open_handling').innerHTML = "<img src='/skin/actions/transport.gif' alt='wood' width='30' height='25'>"
	}
		
	var html = 	
				"<h3 class='header' id='handling_head'>"+ myOriginTravel() +"</h3>"+
				"<div id='handlingContent' class='content'>"+
						"<div width='160px' id='Handling_menberList'></div>"+
						"<div style='padding-top:2px'>"+
						"<table><tbody id='hand_listcity'>"+
						"</tbody></table>"+
						"</div>"+
				"</div>"+
				"<div class='footer'></div>";
					
	newHand.innerHTML=html;
	myCity()
	updateLink()
	
		
	if(showType == 1)
	{	
		document.getElementById('handling').getElementsByTagName('h3')[0].addEventListener('mouseover',function(){GM_addStyle('#handling div{display:block;}');},true);
		document.getElementById('handling').getElementsByTagName('h3')[0].addEventListener('click',function(){GM_addStyle('#handling div{display:none;}');},true);
	}
	else
	{
		document.getElementById('open_handling').getElementsByTagName('img')[0].addEventListener('mouseover',function(){
																			GM_addStyle('#handling div{display:block;}');
																			GM_addStyle('#handling h3{display:block;}');},true);
		document.getElementById('handling').getElementsByTagName('h3')[0].addEventListener('click',function(){
																			GM_addStyle('#handling div{display:none;}');
																			GM_addStyle('#handling h3{display:none;}');},true);
		document.getElementById('open_handling').addEventListener('click',function(){
																			GM_addStyle('#handling div{display:none;}');
																			GM_addStyle('#handling h3{display:none;}');},true);
	}
		
	// Add 'select' witn name of yours ally's members
	if (listplayer == false) {return;}	// if you haven't players list
	
	//	icon delete player 
	var delply = "data:image/png;base64,R0lGODlhHQAUANUAAP////301f312vz36fnt0/PjwvfnydrBlvLbtcy0j9SzhsmzlMudZt6veOCzfuW4guK2geO6iefAj+nEl+K/k9/Gp+/Vtq5zMsmIPtaSRdabVr6KUdymaNysdM6jdOzKo+3PrPnu4rp5NbqDTMGbc9y6mMuQWMqihNmYacqEW7V1VdqkiduumcSIcNOUfsZtT86CaNKHb9uYhNZ8aNqKesxVRMpCM8YyI84jGMUbE7srJtQAAMsEA84LCsoQDe7mwiH5BAEAAD8ALAAAAAAdABQAAAb/wN+v4qoIj8jkr1Tj2ZS/lS4XUwquV+EKt3MSCoHBUeDy8WqlX5gAokwshgArt/PNECAE+GgolHc4LmwNHYSEW4AyIIsTHwR8EiB/PTUoHRwMDBwwdDgrjRIQEBOPPwgTkR8uXDs3KSMmJi89rSwRorgSexOioAo2XTgpCU08NyeEtw6XHB8CBZcaDZGoxTgvXDckIxgaHBwaGhkZEQIEJLHhHQ/ss4A2NSS34uP1HXFqCiP7GiYPqO58vPAWisM4DPfEIPmwb4S8DxNe2DDT48UGBwUxfAAAQAkBBQo8wJLwwokIVi8umOhnIkRHJQU8KIi1gYQPHy1EjKDDIyUGbAyloPzQ50GCghs9HWgQoYLiCw5BhRZoE6GJxW4iLpSsAyOA0DHPYgjsQGHDhQvfxNaZ8RXJAR02DmQ6AIaAV047cpxoK0TFjQHP6to90gLpDSNfWahYYFfAADFRo9C48aKtijR8j4BosQBJEAA7";
	GM_addStyle("a#hand_delplayer {display:none;}");
	
	var player = listplayer.split(',');
	var selectplayer = "<center><select id='destinationPlayer'>";
	for (var j=0; j < player.length; j++)
	{
		if (j==0){ var valueply = '@';}	// if the name of the player is yours
		else {valueply = player[j];}
		selectplayer +="<option value='"+ valueply +"'>"+ player[j] +"</option>";
	}
	selectplayer +="</select><a id='hand_delplayer' href=# title='"+ lang.memberrem +"'><img src="+ delply +"></a></center>";
	document.getElementById('Handling_menberList').innerHTML= selectplayer	// insert 'select' player HTML
	// add event
	document.getElementById('destinationPlayer').addEventListener('change',function(){newSelectCity(document.getElementById('destinationPlayer').value);},true);
}
catch(er) 				
	{infoError("function Main ",er)}
},true);

function nameCity(string,showCo)	// convert name from '[xx:yy]Name' to 'Name' or 'Nome[xx:yy]'
{ 
	var temp = string.split(']')
	if (temp.length>1 && showCo == true)	{return temp[temp.length-1] +" "+ temp[0] + ']';}
	else {return temp[temp.length-1];}
}

/** Function for Hanling windows **/

function myOriginTravel()	// search yuor cities where start travel
{ 
try
{
	var selcity = document.getElementById('citySelect');	
	var optioncity = selcity.getElementsByTagName('option');
		
	for (var j=0; j< optioncity.length ; j++) 
	{
		if (optioncity[j].value == selcity.value) {return nameCity(optioncity[j].textContent,false);}
	}
	return null
}
catch(er) 				
	{infoError("function myOriginTravel ",er)}
}

function myCity()	// search yuor cities in CitySelect
{ 
try
{
	var selcity = document.getElementById('citySelect');	
	var optioncity = selcity.getElementsByTagName('option');
	cities = new Array();
	idcities = new Array()
		
	for (var j=0; j< optioncity.length ; j++) 
	{
		if (optioncity[j].value != selcity.value) 
		{
			cities.push(nameCity(optioncity[j].textContent,true))
			idcities.push(optioncity[j].value)
		}
	}
	viewCity(cities,idcities);
}
catch(er) 				
	{infoError("function myCity ",er)}
}

function newSelectCity(player)	// display cities when change player in 'select player'
{ 
try
{
	var selectcity = '';
	var list = GM_getValue('Handling_'+ urlId +"_"+ player,false);
	if (list == false)	// invalid data
	{
		document.getElementById('destinationPlayer').value = '@';
		player = '@';
	}	
		
	if (player == '@') 	// if name is yuors
	{
		myCity();
		//hide icon delete player
		GM_addStyle("a#hand_delplayer {display:none;}");
	}
	else
	{
		cities = new Array();
		idcities = new Array()
		var city = list.split('@')
		
		for (var j=0; j < city.length; j++)		// search cities of the player
		{
			cities.push(city[j].split(',')[0])
			idcities.push(city[j].split(',')[1])
		}
		viewCity(cities,idcities);
		
		//show icon delete player
		GM_addStyle("a#hand_delplayer {display:block;}");
		// add event for delete player
		document.getElementById('hand_delplayer').addEventListener('click',function()
			{
				removePlayer(document.getElementById('destinationPlayer').value);
				document.getElementById('destinationPlayer').value='@';
				
				// redraw select player
				var listplayer = GM_getValue('Hand_member_'+ urlId,"");	// list of the members name 
				if (listplayer == ""){GM_addStyle("div#Handling_menberList {display:none;}");}
				else
				{
					var player = listplayer.split(',');
					var selectplayer = "";
					for (var j=0; j < player.length; j++)
					{
						if (j==0){ var valueply = '@';}	// if the name of the player is yours
						else {valueply = player[j];}
						selectplayer +="<option value='"+ valueply +"'>"+ player[j] +"</option>";
					}
					document.getElementById('destinationPlayer').innerHTML= selectplayer	// insert 'select' player HTML
					GM_addStyle("a#hand_delplayer {display:none;}");
				}
				myCity();
			},true);
		
	}
}
catch(er) 				
	{infoError("function newSelectCity ",er)}
}

function viewCity(name,id)	// display list of the cities
{ 
try
{	
	var html ='';		
	for (var j=0; j< id.length ; j++) 
	{
			html += "<tr>"+
						"<td class='hand_namecity'>"+ name[j] +"</td>"+ 
						"<td><a href='"+ url +"?view=transport&destinationCityId="+ id[j] +"' class='hand_goods' title='"+ lang.titlegoods +"'><div></div></a></td>"+
						"<td><a href='"+ url +"?view=deployment&deploymentType=army&destinationCityId="+ id[j] +"' class='hand_army ' title='"+ lang.titlearmy +"'><div></div></a></td>"+
						"<td><a href='"+ url +"?view=deployment&deploymentType=fleet&destinationCityId="+ id[j] +"' class='hand_fleet' title='"+ lang.titlefleet +"'><div></div></a></td>"+
					"</tr>"
	}
	document.getElementById('hand_listcity').innerHTML = html
}
catch(er) 				
	{infoError("function viewCity",er)}
}

/** END Function for Hanling windows **/

function selectPlayer(list)
{ 
try
{	
	var listplayer = list.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	var outply = "data:image/png;base64,R0lGODlhCwANAKIAANqrnP333cqIcerOtcV7ZOK8o/TjydWgjCH5BAAAAAAALAAAAAALAA0AAAMsaLHcJaM5QqAMBQh6FMvAsRHFB5whZYGoRgFsWkWgSJVLNnbTfD24i+eySAAAOw=="
	var inply =  "data:image/png;base64,R0lGODlhCwANAKIAAG3GZvz33aHanJTUjM3mtbffo+XvyYHNeCH5BAAAAAAALAAAAAALAA0AAAMsGLpszAWUF8gBsg18xFQRNghehQEj6Qmnqk7EmZJfEKK0xpWPhdW9DGVhSAAAOw=="
	
	if (listplayer.length <= 2)	// exit if you haven't ally's member
	{
		GM_setValue('Hand_member_'+ urlId,""); // delete old list
		return
	}
	
	if (list.getElementsByTagName('tbody')[0].getElementsByTagName('ul').length < 2) {return;}	// exit if yuo don't see the other city of the players
	
	var myself= myName();
	var players = GM_getValue('Hand_member_'+ urlId,"");	// load list of saves player
		
	// format button
	GM_addStyle("a.addplayer {position:relative; top:-18px; left:28px; display:block; width:15px; height:17px; background: url('"+ inply +"') center center no-repeat; background-color: trasparent;}");
	GM_addStyle("a.removeplayer {position:relative; top:-18px; left:28px; display:block; width:15px; height:17px; background: url('"+ outply +"') center center no-repeat; background-color: trasparent}");
	GM_addStyle("a.addplayer:hover {background-color: green;}");
	GM_addStyle("a.removeplayer:hover {background-color: red}");
		
	// format div of class 'action' message
	GM_addStyle('a.addplayer {top:-18px; left:28px;}');
	GM_addStyle('a.removeplayer {top:-18px; left:28px;}');
	GM_addStyle('td.action div {position:relative; display:block; top:3px; left:0px; width:41px !important; height:17px; }');
	GM_addStyle('a.message {position:relative; display:block; top:0px; left:0px; width:15px; height:17px;}');
		
	// search colum of the action
	var numaction =0;
	while (listplayer[1].cells[numaction].getAttribute('class') != "action")
		{numaction++;}
	// search colum of the city
	var i=0;
	while (listplayer[1].cells[i].getAttribute('class') != "cityInfo") 
	{
		i++;
		if (i == listplayer[1].cells.length){return;}
	}
	
	// create button for all player of the alliance
	for ( var j=0; j < listplayer.length; j++)
	{
		var player = listplayer[j].cells[i-1].textContent	// player name
		if (myself != player) 
		{
			// create node HTML for handling list
			var buttonAdd = document.createElement('a');
			buttonAdd.setAttribute('href',window.location);
			buttonAdd.innerHTML =	"<input type='hidden' value='"+ player +"'>";
			listplayer[j].getElementsByTagName('td')[numaction].getElementsByTagName('div')[0].appendChild(buttonAdd);
				
			if (players.indexOf(player) < 0)	// search player in Handling list	
			{	
				buttonAdd.setAttribute('class','addplayer');
				buttonAdd.setAttribute('title',lang.memberadd);
				buttonAdd.addEventListener('click',function(){addPlayer(this.getElementsByTagName('input')[0].value);},true);
			}
			else
			{	
				buttonAdd.setAttribute('class','removeplayer');
				buttonAdd.setAttribute('title',lang.memberrem);
				buttonAdd.addEventListener('click',function(){removePlayer(this.getElementsByTagName('input')[0].value);},true);
				saveCities(player);	// updates the list of cities
			}
		}
	}
		
	// create button for remove or insert all member
	GM_addStyle('div#all_player {position: absolute; top:9px; right:6px; width:58px; height:17px; display:block; z-index:99}');
	GM_addStyle('.buttonAll {position: absolute; width:26px; height:17px; z-index:99}');
	GM_addStyle('.buttonAll div {position:relative; top:2px; left:2px;}');
	GM_addStyle('a#buttonAll_remove {right:0px;}');
	GM_addStyle('a#buttonAll_remove:hover {background-color: red;}');
	GM_addStyle('a#buttonAll_add:hover {background-color: green;}');
		
	var headplayer = list.parentNode.parentNode.getElementsByTagName('h3')[0];
	var buttonAll = document.createElement('div');
	buttonAll.setAttribute('id','all_player');
	list.parentNode.parentNode.insertBefore(buttonAll,headplayer);
	
	// Remove all player
	var buttonAll_remove =  document.createElement('a');
	buttonAll_remove.setAttribute('id','buttonAll_remove');
	buttonAll_remove.setAttribute('class','buttonAll');
	buttonAll_remove.setAttribute('href',window.location);
	buttonAll_remove.setAttribute('title',lang.allmemberrem);
	buttonAll_remove.innerHTML = 	"<div><img src='"+ outply +"'>"+
									"<img src='"+ outply +"'></div>";
	buttonAll.appendChild(buttonAll_remove);
	buttonAll_remove.addEventListener('click',function(){GM_setValue('Hand_member_'+ urlId,"");},true);
	
	// Add all player
	var buttonAll_add =  document.createElement('a');
	buttonAll_add.setAttribute('id','buttonAll_add');
	buttonAll_add.setAttribute('class','buttonAll');
	buttonAll_add.setAttribute('href',window.location);
	buttonAll_add.setAttribute('title',lang.allmemberadd);
	buttonAll_add.innerHTML = 	"<div><img src='"+ inply +"'>"+
								"<img src='"+ inply +"'></div>";
	buttonAll.appendChild(buttonAll_add);
	buttonAll_add.addEventListener('click',function(){	addAllPlayer();
														GM_addStyle('#buttonAll_add {display:none;}');},true);
		
	var checkplayer = GM_getValue('Hand_member_'+ urlId,"")	
	// hide 'remove player' if all player removed
	if (checkplayer == ""){GM_addStyle('#buttonAll_remove {display:none;}');}
	else(GM_addStyle('#buttonAll_remove {display:block;}'))
	// hide 'add player' if all player added
	if (listplayer.length == checkplayer.split(',').length){GM_addStyle('#buttonAll_add {display:none;}');}
	else(GM_addStyle('#buttonAll_add {display:block;}'))
}
catch(er) 				
	{infoError("function selectPlayer",er)}
}

function saveCities(player)	// save cities of the member alliance
{ 
try
{
	var listplayer = document.getElementById('memberList').getElementsByTagName('tbody')[0].getElementsByTagName('td');
	for (var j=0; j < listplayer.length; j++)
	{
		if (listplayer[j].getAttribute('class') == "cityInfo" && player == listplayer[j-1].textContent)
		{
			var listcities = "";
			city = listplayer[j].getElementsByTagName('a');
			for (var jj = 0; jj < city.length; jj++)
			{
				var nameCity = city[jj].textContent;
				var idCity = city[jj].href.split('selectCity=')[1]
				listcities += nameCity +','+ idCity;
				if (jj != city.length-1) {listcities += '@'}
			}
			
			GM_setValue('Handling_'+ urlId +"_"+ player,listcities);
			return;
		}
	}
}
catch(er) 				
	{infoError("function saveCities ",er)}
}

function addAllPlayer()	// modify 'select' of the destination city
{ 
try
{
	GM_setValue('Hand_member_'+ urlId,"")
	var listplayer = document.getElementById('memberList').getElementsByTagName('tbody')[0].getElementsByTagName('td');
	var myself = myName();
	for (var j=0; j < listplayer.length; j++)
	{
		if (listplayer[j].getAttribute('class') == "cityInfo")
			{if (myself != listplayer[j-1].textContent) {addPlayer(listplayer[j-1].textContent);}}
	}
}
catch(er) 				
	{infoError("function addAllPlayer ",er)}
}


function addPlayer(player)	// modify 'select' of the destination city
{ 
try
{
	var listplayer = GM_getValue('Hand_member_'+ urlId,""); // load list of the player
	if (listplayer == "") 
	{
		var myself = myName();
		memberlist = myself + ',' + player;
	}
	else	{memberlist = listplayer +','+ player;}
	
	GM_setValue('Hand_member_'+ urlId, memberlist);
	
	saveCities(player)	// save cities of the player
}
catch(er) 				
	{infoError("function addPlayer ",er)}
}

function removePlayer(player)	// modify 'select' of the destination city
{ 
try
{
	var listplayer = GM_getValue('Hand_member_'+ urlId,""); // load list of the player
	
	var newmemberlist = listplayer.replace(','+ player,'');
		
	if(newmemberlist.split(',').length <= 1) {newmemberlist=''}
		
	GM_setValue('Hand_member_'+ urlId, newmemberlist);
}
catch(er) 				
	{infoError("function removePlayer ",er)}
}

function myName()	// search in member list my name
{ 
try
{	
	var listplayer = document.getElementById('memberList').getElementsByTagName('tbody')[0].getElementsByTagName('td');
	var mycity = document.getElementById('citySelect').value;
	
	for (var j=0; j < listplayer.length; j++)
	{
		if (listplayer[j].innerHTML.indexOf('selectCity='+ mycity) > 0) {return listplayer[j-1].textContent;}
	}
	return null;
}
catch(er) 				
	{infoError("function myName ",er)}
}

function updateLink()
{ 
try
{
	// General style
	GM_addStyle('tbody#hand_listcity tr td a div {width:26px; height:18px}');
	GM_addStyle('tbody#hand_listcity tr {height:22px; padding=1px;}');
	GM_addStyle('td {padding:1px}');
	GM_addStyle('td.hand_namecity {width:130px; padding:4px 1px}');
	GM_addStyle('tbody#hand_listcity tr:hover {font-weight: bold;}');
		
	if (parseInt(document.getElementById('globalResources').getElementsByTagName('li')[0].textContent.split(':')[1].split('(')[0]) < 1)	// If you haven't a sheep
	{
		// Picture disable
		var imgtransport_disable = 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASBAMAAAC3N9OQAAAAAXNSR0IArs4c6QAAADBQTFRFwbaHxbqLuq+A7eKzsaZ3+O2+6+CxsKV2+O/IzMGSwLWGr6R17OGy6t+wrqN0+e/EoSu2AwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxIHEF62H1IAAAC2SURBVAjXY5CciQBTGAQYGBi4VoEAwwI+BoH+/3AgxyAAJDv6Ozp+ALEcgxRQ7scTFxegYD+Q19HR/x/C+wFR2f/EvRyiT6o1FA6Acv2h4eXlAeXlrCAeUC7OBcpbxyBlYmznUm21e/di48tAnrWx9e7dYN7kdQwCJq9WgVzGtWqJMVCf7aMpL+cBoZ7kXaBK2zNn7pzJuQMiQXK5Z4Hgzp27Z88CeauUtLSUlIBISUmP4R0yAACoT3zQX/9avQAAAABJRU5ErkJggg=="
		var imgarmy_disable  = 		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASBAMAAAC3N9OQAAAAAXNSR0IArs4c6QAAADBQTFRFtKl649ip1suczsOUuq+A6+Cx+O/Ir6R1wLWGzMGSsaZ3sKV2+e/E6t+w7OGyrqN0Ud0YZwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxIHHFcAU3kAAACySURBVAjXY2g2RgADhg4k0M/QkXMGDoC8M8fS0oAoBwhBvDMvljzkWiiw4A1ILi1h1aoVXKtWrOIA8XK0d3Ssumm9qXMVWN/u3bs37t4tsHoPmMdotUNo96YJW8D6zvDd3v1k9ybt3WAb3tV5lzSUF7RXznsH5rHX9ZdPMq+D8Ozq/2v//8H+Xw7Me/ruHRi/A/PexYGZQBEQ7+3du0B0997du0Beh4uLh0sLGPoz/EcGAPkMkOYrwMLmAAAAAElFTkSuQmCC"
			
		// style immage into action icons
		GM_addStyle("a.hand_goods div {background: url('"+ imgtransport_disable +"');}");
		GM_addStyle("a.hand_army div {background: url('"+ imgarmy_disable +"');}");
	}
	else
	{
		// Picture normal
		var imgtransport = 	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAMAAAByxz6RAAAAAXNSR0IArs4c6QAAAGBQTFRF8sGFXCsA6Np0rog92Lda6uF64ctpfFAcyaBJv5BBlGsv6uR0yLVc7eeFqH44oXxZUSAAZzoRZ1A2ooJcSBsA6+Z36+V9p4E9q4M9on076+V6nnpY6+R7d19E9cSJQDUjWQYGpwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxENAcyvaXMAAACZSURBVBjTdcuNDoIgFIZhCRWoxU9hI4bj/u8yznektoavcgY8Ou3OuecvRw+q034WUb6N6pQpnnnjQGUrSCDa0QXoXsqLOqjt2mIqC9eJT6DlMgq0UvhjVTQVLkAzBZqZcAHSQmvtKR1oBk0xeWMMyDC145XJ+Bj+ah+DpPVCxaj6EjEoK5lSktKm9n5XmyD7HgV6jKtTPe0DgFMfzeNiG6EAAAAASUVORK5CYII="
		var imgarmy = 		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAMAAAByxz6RAAAAAXNSR0IArs4c6QAAAGBQTFRF5dRwroc98sGFjWYn6eF0ViQA07FWxJxHupBBfFIbaToMnHQx7eaEzKdPTB0A3sdnoXxZ2r1fZ1A2ooJc6+Z3p4E9q4M9on07sYU96+V66+R7Xi4AnnpYd19E9cSJQDUjgrWtcQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxELN1VPW2wAAAC2SURBVBjTdYvtDsMgCEVNHANp1LrPVtL0/d9yQLv1T3dMLniPhmUcx/vBaMdZw/IPU/Pj4PLjq2Zjy+/DTfXeWxKuyCJ4Zd202dVDOyXZ4GTbrnonvSStWowilDR2FYL/ESZLtC2E4KpWoEGA86DtM+rWaq2uWoMrAkBmjdeg0RRXOUMWADajAyDGnLMrRMFSysQaKcZSMCGiK6JE2pZoYb48icjVdMqmXmds6n2Gq9s5a1j/8gFusSTLRS8C+AAAAABJRU5ErkJggg=="
		// Picture over
		var imgtransport_over = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAMAAAByxz6RAAAAAXNSR0IArs4c6QAAAGBQTFRFzqhuZC4A58OHpX9T9tiZi2Eu+OOl/fm6hVQk9cqN4Lt/88+T8sGF/Pa2/fe5tZVd++2v18WL/PO17suLZTIAYisA7ciK78yM/fq5YCkA/fm3nnpYd19E9cSJ/fm7QDUjjAJzfgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxEVBUnZNTMAAACUSURBVBjTfdHbDoIwDIBhRrtDskSJ7sDYAu//ltIWNCL4D9qM75Ku1VrhU6XDLV27imicztpppGTyWl+hWQqctXaih2n+pu0mdJN2kttGj5OYBkpRg6ap+YOQWWMyQnQ3TCYgYqTQ0XRIMWH8pbuQV8odKt4L9SpAKQAlAG0XNfRZKPt8zAullJ7rSbzftb8/ZbnsBfcgJL5mW8vXAAAAAElFTkSuQmCC"
		var imgarmy_over = 		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAMAAAByxz6RAAAAAXNSR0IArs4c6QAAAGBQTFRFYy0Aq4pY+OOliWhJxKZt9deZontG7smMkWk0/fm72ryB9cmM8cCE8c+Tg1Qj9MKHckAP+uyv/PS27suL8MuO7ciK78yMYSkA/fq5/fm3ZTEAnnpYd19E9cSJZTIAQDUjcE56VgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxEUNXYbNN4AAAC9SURBVBjTfZHbDsIgDEDLpAgkJYA3xkz9/7+0dJsvTg9Qmh4aSIDTspjliBecnj8Yqs1HqAqttVlG031nVXMIlDhPNjPbmCULLWxdQWpCGlv2EnzYuoLt3Xsp0QjW+943VWtXspXzPbJktVZVpYB1csPNMEvGkKdSyq4wAoA8pYM1kk2CqgkB5QEpSRE4MTiHiKoQM0oxDuWM64AfReToIZgR/AiRiFRdFdL5Wde1637Ari63L87Pv5/y+skb04EkdvPdnngAAAAASUVORK5CYII="
		
		// style immage into action icons
		GM_addStyle("a.hand_goods div {background: url('"+ imgtransport +"');}");
		GM_addStyle("a.hand_army div {background: url('"+ imgarmy +"');}");
			
		// style immage in icons when mouse pass over
		GM_addStyle("a.hand_goods div:hover {background: url('"+ imgtransport_over +"');}");
		GM_addStyle("a.hand_army div:hover {background: url('"+ imgarmy_over  +"');}");
	}
		
	// Picture normal
	var imgfleet =		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAMAAAByxz6RAAAAAXNSR0IArs4c6QAAAGBQTFRFiWhJtpJE8sGFr4c9VyUA2LZZ6uF64ctp6Np0lWssb08rxJhFoXYy6uR0Sh0AzqZN7eaEvaZRaDwPgFUf2sBjyLZciV4l6+Z3p4E9on07Xi4A6+R7nnpYd19E9cSJQDUjViCmiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxEOGm3n81wAAACvSURBVBjTdc2LCsMgDEBRRem0amS69ZFs9P//cpq0bIz2KNh4kSr1urAp9b7QE6UzkuZEiWgmQrHOzf6KiAu5Z3NH7IMkvqZU5E2ZUKcjDb8QHdZ2cnJucM6Z40cYMbaZ002gZRqr7SOnhyiSJlt9HznlDrOxu5BzzZlTiAHaisBK4Clw0qDB1FolGYhtrZqTAahfFjx4Y4ykBUZou1hAbKdfOk78tf7jNJ7b1HbpA6EpIftWU+BKAAAAAElFTkSuQmCC"	
	// Picture over
	var imgfleet_over =		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAMAAAByxz6RAAAAAXNSR0IArs4c6QAAAGBQTFRF+eOkp3pGz6pwZC4AiFsp9diZ5ciL18GG/fq5i2lG9MqNtpVdooJc/PO18cCE/fe4r4hS+u2v9MKH8c+SYSkA7suL7ciKZTEAYCkAZTIA/fm3nnpYd19E9cSJ/fm7QDUjrOcHGwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLBxEVEsoKsPQAAAC0SURBVBjTfdF/D4IgEIBhgbvCrKWThFOH3/9bdj901Va9zMn5DP+haZfl+tGytzXt+iOhOH9LqcYYZ14xktXzfqe51hrlGc4SkUz2Q/1ejzME1M071ft7lO8E/DaqN67LVpd76nlWGizKQfIBgoxGjQZGjqCXUalBjtAbhXxCbBGV0DMEpiQBYuLZaExjmpxzKmlKXtaodCFyr6j44sfHxU49imNNEApAcQoHTd9a/17K9rMn5dYibw22MGoAAAAASUVORK5CYII="
		
	// style immage into action icons
	GM_addStyle("a.hand_fleet div {background: url('"+ imgfleet +"');}");
	// style immage in icons when mouse pass over
	GM_addStyle("a.hand_fleet div:hover {background: url('"+ imgfleet_over  +"');}");
}
catch(er) 				
	{infoError("function updateLink ",er)}
}

function pageOption()
{ 
try
{
	var newElement = document.createElement("div");
	newElement.setAttribute('id','optionHandling');
	newElement.innerHTML = 
		"<div class='contentBox01h'>" +
			"<h3 class='header'>"+
				"<span class='textLabel'>Handling v"+ lversion +" <a href='http://ikariamscript.forumfree.net/' target='_blank'>(by Phate)</a></span> "+
			"</h3>"+
			"<div class='content'>" +
				"<table cellpadding='0' cellspacing='0'>"+
					"<tbody>"+
						"<tr>" +
							"<th id='handlingPos'>"+ lang.position +"</th>" +
							"<td><input type='radio' id='radio0' name='handlingPos'><span id='handlingTxtUpPos'>"+ lang.optionUptxt +"</span></td>"+
							"<td><input type='radio' id='radio1' name='handlingPos'><span id='handlingTxtDwPos'>"+ lang.optionDwtxt +"</span></td>"+
						"</tr>" +
						"<tr>" +
							"<th>Debug</th>" +
							"<td><input type='checkbox' id='handling_debug'></td>"+
						"</tr>" +
					"</tbody>"+
				"</table>" +
			"</div>" +
			"<div class='centerButton'>"+	
				"<span class='button' id='handlinglanguage'>"+ lang.optiontxt +"</span>"+	
			"</div>"+
               "<div class='footer'></div>" +
        "</div>";
			
	document.getElementById("mainview").insertBefore(newElement, document.getElementById("vacationMode"));
	document.getElementById('radio0').addEventListener('click',function(){GM_setValue('handling_position',0);},true);
	document.getElementById('radio1').addEventListener('click',function(){GM_setValue('handling_position',1);},true);
	document.getElementById('handling_debug').addEventListener('change',function(){GM_setValue('handling_debug', document.getElementById('handling_debug').checked);},true);
	document.getElementById('handlinglanguage').addEventListener('click',function(){changeLanguage();},true);
			
		// controll state of chekbox
		var savevalue = GM_getValue('handling_debug',true);
		if (savevalue == false) document.getElementById('handling_debug').checked = false;
		else document.getElementById('handling_debug').checked = true;
		// controll state of radio
		savevalue = GM_getValue('handling_position',0);
		document.getElementsByName('handlingPos')[savevalue].checked = true;
}
catch(er) 				
	{infoError("function pageOption ",er)}
}

/**
*	Check if you have new version!
*/
function check_for_update()
{ 
try
{
	var request = GM_getValue('Update_Handling');
	var day = (new Date()).getDate()	// day of today
	
	if (request == day) {return;}	// exit if in this day you have check update

	GM_xmlhttpRequest(
	{
		method:"GET",
		url:updatesite,
		headers:
		{
			"User-Agent":"script_Handling",
			"Accept":"text/monkey,text/xml",
		},
		onload:function(details) 
		{
			if (details.readyState == 4) 
			{
				var update_version = details.responseText.split('content="Handling v')[1];
				update_version = update_version.split('"')[0];
				update_version = update_version.split(',')[0];
					
				var newversion = false;
				for (var j=0; j < lversion.split('.').length; j++)
				{
					var aa = parseInt(update_version.split('.')[j]);
					if (isNaN(aa)){aa=0}
					var bb = parseInt(lversion.split('.')[j]);
					if (aa > bb) {newversion = true; break;}
				}
					
				if (newversion)
				{
					var update = confirm('Script HANDLING '+lang.update + update_version);
					if (update==true) {window.open(updatesite);}
				}
			}
		}
	});
	// save day
	GM_setValue('Update_Handling',day);
}
catch(er) 				
	{infoError("function check_for_update ",er)}
}

function infoError(name,er)	//with error open forum page
{ 
try
{
	var debug = GM_getValue('handling_debug',true);
	if (debug != true ) return; // exit if you don't want debug script
		
	if(confirm(lang.errortxt + name + " " +  er + lang.errortxt1))
	{
		window.open("http://ikariamscript.forumfree.net/?f=7657298");
	}
}
catch(er1) 				
	{confirm(er1);}
}

function changeLanguage()
{	
	var savelang = GM_getValue('HandlingLang')
	var inputLang = prompt(lang.optiontxt +"?            da, it, es, en,vn",savelang);
	if (inputLang == null){return;}
	
	inputLang = inputLang.toLowerCase();

	if (inputLang != "it" && inputLang !="es" && inputLang !="en" && inputLang !="da" && inputLang !="vn") 
	{
		alert("The Language "+ inputLang +" is not supported")
		inputLang = "en";
	}
	GM_setValue('HandlingLang',inputLang);
	lang = getLanguage();
	document.getElementById('handlinglanguage').textContent = lang.optiontxt
	document.getElementById('handlingPos').textContent = lang.position
	document.getElementById('handlingTxtUpPos').textContent = lang.optionUptxt;
	document.getElementById('handlingTxtDwPos').textContent = lang.optionDwtxt;
	document.getElementById('Handlinglanguage').textContent = lang.optiontxt;
}

function getLanguage()
{
	var lang = GM_getValue('HandlingLang');	// check storage
	if (lang == null)		// check browser language
	{
		lang = navigator.language;
		GM_setValue('HandlingLang',lang);
	}
	if (lang != "it" && lang !="es" && lang !="da" && lang !="vn") {lang = "en";}
	
	var langs = 
	{ 
		da:
		{ // Danish translation by LoppeLoppesen
			errortxt: "Handling har genereret en fejl. Kontakt mig venligst på http://ikariamscript.forumfree.net/ for at løse problemet. Phate72 \n\n",
			update: "Ny version udgivet ",
			position: "Position på skærmen :",
			optionUptxt: " Top",
			optionDwtxt: " Bund",
			optiontxt: "Vælg sprog",
			titlegoods:'Transporter varer',
			goods:'Varer',
			titlearmy:'Indsæt tropper',
			army:'Tropper',
			titlefleet:'Stationer flåde',
			fleet:'Flåde',
			memberadd: 'Føj spiller til handlingslisten',
			memberrem: 'Fjern spiller til handlingslisten',
			allmemberadd: 'Føj alle spillere til handlingslisten',
			allmemberrem: 'Fjern alle spillere til handlingslisten',
		},
		
		it:
		{ // Italian texts by myself:
			errortxt: "Handling ha generato un errore. Per favore contattatemi su http://ikariamscript.forumfree.net/ per risolvere il problema. Phate \n\n",
			update: "nuova versione ",
			position: "Posizione sullo schermo:",
			optionUptxt: " In alto",
			optionDwtxt: " In basso",
			optiontxt: "Seleziona la lingua",
			titlegoods:'Trasporto merci',
			goods:'Merci',
			titlearmy:'Schiera esercito',
			army:'Truppe',
			titlefleet:'Schiera flotta',
			fleet:'Flotte',
			memberadd: 'Aggiunge il giocatore alla lista movimenti',
			memberrem: 'Rimuove il giocatore dalla lista movimenti',
			allmemberadd: 'Aggiunge tutti i giocatori nella lista Movimenti',
			allmemberrem: 'Rimuove tutti i giocatori dalla lista Movimenti',
		},
		
		es:
		{ // Spanish translation by Rohcodom
			errortxt: "Handling ha generado un error. Por favor visita http://ikariamscript.forumfree.net para informarme. Phate72 \n\n",
            update: "Ha salido una nueva versión ",
            position: "Posición en la pantalla :",
            optionUptxt: " arriba",
            optionDwtxt: " abajo",
            optiontxt: "Seleciona el idioma",
            titlegoods:'Transportar bienes',
            goods:'Bienes',
            titlearmy:'Apostar tropas',
            army:'Tropas',
            titlefleet:'Apostar flotas',
            fleet:'Flotas',
            memberadd: 'Agregar jugador a la lista de gestión',
            memberrem: 'Eliminar jugador de la lista de gestión',
            allmemberadd: 'Agregar todos los jugadores a la lista de gestión',
            allmemberrem: 'Eliminar todos los jugadores de la lista de gestión',
		},

		vn:
		{ // Vietnamese translation by Unloseking
            errortxt: "Có lỗi. Vui lòng truy cập http://ikariamscript.forumfree.net/ để sửa lỗi. Phate72 \n\n",
            update: "Phiên bản mới được phát hành ",
            position: "Vị trí trên màn hình :",
            optionUptxt: " Đầu trang",
            optionDwtxt: " Cuối trang",
            optiontxt: "Chọn ngôn ngữ",
            titlegoods:'Vận chuyển hàng hóa',
            goods:'Hàng hóa',
            titlearmy:'Triển khai quân đội',
            army:'Quân đội',
            titlefleet:'Triển khai chiến hạm',
            fleet:'Chiến hạm',
            memberadd: 'Thêm người chơi vào danh sách',
            memberrem: 'Xóa người chơi vào danh sách',
            allmemberadd: 'Thêm tất cả người chơi vào danh sách',
            allmemberrem: 'Xóa tất cả người chơi vào danh sách',
		},

		en:
		{ // English translation by Paul93
            errortxt: "Handling has generated an error. Please get through to me in http://ikariamscript.forumfree.net/ to solve the problem. Phate72 \n\n",
            update: "New version released ",
            position: "Position on the screen :",
            optionUptxt: " Top",
            optionDwtxt: " Bottom",
            optiontxt: "Select language",
            titlegoods:'Transport goods',
            goods:'Goods',
            titlearmy:'Deploy troops',
            army:'Troops',
            titlefleet:'Station fleets',
            fleet:'Fleets',
            memberadd: 'Add player at Handling list',
            memberrem: 'Remove player from Handling list',
            allmemberadd: 'Add all players at Handling list',
            allmemberrem: 'Remove all players from Handling list',
		},
	}
	return langs[lang]
}