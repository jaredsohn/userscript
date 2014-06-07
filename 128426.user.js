// ==UserScript==
// @name           Bulk Player Management
// @namespace      glb.warriorgeneral.com
// @description    Lets you manage players in bulk.
// @include        http://glb.warriorgeneral.com/game/home.pl
// ==/UserScript==
// Written by awsalick

/* Change log:
v0.1 - initial premature release :/
v0.2
Removed the style overrides since it was freaking people out
Added a notification if user doesn't use list mode, which was most common reason for "it doesn't work"
Changed SP page loading to 'Pages', then added a ton of different page options
Overhauled the way players are found and referenced so it's hopefully more robust
Changed Level Limit variables to be triggered via Config option
Added players array
Added dynamic checking for page selection; changed initial checking to use that
EQ option will now purchase initial EQ if it doesn't already exist.  Hope you like the color Black.
Added progress bar and complete notification

v.021
Bug fix so BT/EQ auto check again

v.022
Bug fix for level limits = 0
v.023
Added buy_equipment page link

v0.3 TO DO LIST
Use unsafewindow and clear out all of Bort's code

*/

// User-defined level limits that determine when boxes are checked
var BTLevelLimit;
var PageLevelLimit;
var EQLevelLimit;

var players = new Array();
// Players array
// ----> .id
// ----> .level
// ----> .sps
// ----> .vps
// ----> .tps
// ----> .bts

// For progress bar
var totalTasks = 0;
var finishedTasks = 0;

window.setTimeout(main,10); //needed to start greasemonkey

/*GM_addStyle("#body_container {width: 1080px; !important}");
GM_addStyle("#body_container {position: absolute; !important}");
GM_addStyle("#content {width: 100%; !important}");
GM_addStyle("tr.alternating_color1 td {padding: 1px; !important}");
GM_addStyle("tr.alternating_color2 td {padding: 1px; !important}");*/

function main(){
	if(document.getElementById("playerTable")==undefined) { // if player is using grid mode instead of list mode
			location = document.getElementById("players");
			var div = document.createElement('div');
			div.innerHTML = "<font color='red'>The Bulk Player Management mod requires players to be in List mode, not Grid.  Please change your settings.</font>";
			location.parentNode.insertBefore(div,location);
	} else {
		init();
		addBoxes();
	}
}

function addBoxes() {
	document.getElementById("playerTable").style.width="1080px";
	var div = document.createElement('div');
	div.id='bulkDiv';
	div.align="right";	
	div.appendChild(document.createElement('br'));
	
	
	var location = document.getElementById('playerTable');
	location.parentNode.insertBefore(div,location);
	
	buildUI();
	
	//add headings
	var tr = document.getElementById('playerTable').getElementsByTagName('tr');

	var th = document.createElement('th');	
	var a = document.createElement('a');
	a.innerHTML = 'BT?';
	a.setAttribute('style','cursor:pointer;cursor:hand;');
	a.addEventListener('click',function(){toggle('BTtoSP');},false);	
	th.appendChild(a);	
	tr[0].appendChild(th);
		
	th = document.createElement('th');
	a = document.createElement('a');
	a.innerHTML = 'EQ?';
	a.setAttribute('style','cursor:pointer;cursor:hand;');
	a.addEventListener('click',function(){toggle('UpgradeEQ');},false);	
	th.appendChild(a);	
	tr[0].appendChild(th);
	
	th = document.createElement('th');
	a = document.createElement('a');
	a.innerHTML = 'Pages';
	a.setAttribute('style','cursor:pointer;cursor:hand;');
	a.addEventListener('click',function(){toggle('OpenPage');},false);	
	th.appendChild(a);	
	tr[0].appendChild(th);
	
	//add checkboxes
	var ids = document.getElementById('playerTable').getElementsByClassName("list_name");
	 
	// this is tricky to reference because bort is an idiot - list_lv is also used for age
	// using nextElementSibling with list_team
	var lvls = document.getElementById('playerTable').getElementsByClassName('list_team');
	
	var sps = document.getElementById('playerTable').getElementsByClassName('list_sp');
	var vps = document.getElementById('playerTable').getElementsByClassName('list_vp');
	var tps = document.getElementById('playerTable').getElementsByClassName('list_tp');
	var bts = document.getElementById('playerTable').getElementsByClassName('list_bt');
	var freeplayer = 0;
	for(var i=1;i<tr.length;i++){
		if(tr[i].children.length <8) { // if free player slot is open, then we need to skip it
			freeplayer=1;
		} else {
			var player_element = new Object();
			player_element.id = ids[i-1-freeplayer].getElementsByTagName('a')[0].href.split('player_id=')[1];
			player_element.level = lvls[i-1-freeplayer].nextElementSibling.innerHTML;
			player_element.sps = 0;
			player_element.vps = 0;
			player_element.tps = 0;
			player_element.bts = 0;
			
			if(sps[i-1-freeplayer].getElementsByTagName('a').length>0) { // if no link, then = 0
				player_element.sps = sps[i-1-freeplayer].getElementsByTagName('a')[0].innerHTML;
			}
			if(vps[i-1-freeplayer].getElementsByTagName('a').length>0) { // if no link, then = 0
				player_element.vps = vps[i-1-freeplayer].getElementsByTagName('a')[0].innerHTML;
			}
			if(tps[i-1-freeplayer].getElementsByTagName('a').length>0) { // if no link, then = 0
				player_element.tps = tps[i-1-freeplayer].getElementsByTagName('a')[0].innerHTML;
			}		
			if(bts[i-1-freeplayer].getElementsByTagName('a').length>0) { // if no link, then = 0
				player_element.bts = bts[i-1-freeplayer].getElementsByTagName('a')[0].innerHTML;
			}
			players[i-1-freeplayer]=player_element;
			
			var td = document.createElement('td');	   
			var chk = document.createElement('input');
			chk.setAttribute('type','checkbox');
			chk.setAttribute('value',players[i-1-freeplayer].id);
			chk.setAttribute('class','BTtoSP');
			td.appendChild(chk);		
			tr[i].appendChild(td);
					
			td = document.createElement('td');		
			chk = document.createElement('input');
			chk.setAttribute('type','checkbox');
			chk.setAttribute('value',players[i-1-freeplayer].id);
			chk.setAttribute('class','UpgradeEQ');
			td.appendChild(chk);		
			tr[i].appendChild(td); 
			
			td = document.createElement('td');		
			chk = document.createElement('input');
			chk.setAttribute('type','checkbox');
			chk.setAttribute('value',players[i-1-freeplayer].id);
			chk.setAttribute('class','OpenPage');
			td.appendChild(chk);		
			tr[i].appendChild(td);  
		}
		
	}
	pageChange(); // marks initial checkboxes
}

function buildUI() {
	div = document.getElementById("bulkDiv");
	
	//add buttons
	var form_item = document.createElement('input');
	form_item.type='button';
	form_item.value='Execute Selected Actions';
	form_item.addEventListener('click',function(){runAll();},false); 	
	div.appendChild(form_item);
		
	var form_item = document.createElement('input');
	form_item.type='button';
	form_item.value='Config';
	form_item.addEventListener('click',function(){config();},false); 	
	div.appendChild(form_item);
	
	var form_item = document.createElement('input');
	form_item.type='button';
	form_item.value='Info';
	form_item.addEventListener('click',function(){info();},false); 	
	div.appendChild(form_item);
	
	// add page selection box
	var form_item = document.createElement('select');
	form_item.multiple = 'multiple';
	form_item.id = 'openPages';
	form_item.length = 0;
	form_item.add(new Option('Player Page', 'player', false, false));
	form_item.add(new Option('SP Page', 'skill_points', true, true));
	form_item.add(new Option('VA Page', 'vet_skills', false, false));
	form_item.add(new Option('Training Page', 'training', false, false));
	form_item.add(new Option('Equipment Page', 'equipment', false, false));
	form_item.add(new Option('Buy Equipment Page', 'buy_equipment', false, false));
	form_item.add(new Option('Tactics Page', 'player_tactics', false, false));
	form_item.add(new Option('BT Page', 'bonus_tokens', false, false));
	form_item.add(new Option('Contract Page', 'make_offer', false, false));
	if(window.location.hostname=="test.glb.warriorgeneral.com")  {
		form_item.add(new Option('Edit Page', 'edit_player', false, false));			
	}
	form_item.onchange=function(){pageChange();}
	div.appendChild(form_item);
	
	
}

function runAll(){
	BTtoSP();
	openPages();
	equipUp();
}

function pageChange() {
    var boxes = document.getElementsByClassName('OpenPage');
    var pages = document.getElementById('openPages');
    var page_SP = false;
    var page_VA = false;
    var page_TP = false;
    var page_BT = false;
    var page_EQ = false;
    var page_BUYEQ = false;
    var id;
    if(pages!=null) {
	    for(i in pages.options) {
	    		if(pages.options[i].selected) {
	    			switch(pages.options[i].value) {
	    				case 'skill_points':
	    					page_SP = true;
	    					break;
	    				case 'vet_skills':
	    					page_VA = true;
	    					break;
	    				case 'training':
	    					page_TP = true;
	    					break;
	    				case 'equipment':
	    					page_EQ = true;
	    					break;
	    				case 'buy_equipment':
	    					page_BUYEQ = true;
	    					break;
	    				case 'bonus_tokens':
	    					page_BT = true;
	    					break;
	    				default:
	    					break;
	    			}
	    		}
	    	}
	    	
	    	
	    	for(i=0;i<boxes.length;i++) {	 
	    		id = boxes[i].value;
	    		id2 = players[i].id;
	    		j=i;
	    		if(id2!=id) {// boxes[i] will match players[i] because it's one box per row, unless the user changes their sort, then it doesn't :(
	    			for(j in players) {
	    				if(id==players[j].id) {
	    					break; // use this value for j
	    				}	    				
	    			}		    			
	    		}
	    			
	    		if(page_SP && players[j].level<=PageLevelLimit && players[j].sps >0) {
	    			boxes[i].checked = true;
	    		}
	    		if(page_VA && players[j].level<=PageLevelLimit && players[j].vps >0) {
	    			boxes[i].checked = true;	
	    		}
	    		if(page_TP && players[j].level<=PageLevelLimit && players[j].tps >0) {
	    			boxes[i].checked = true;	
	    		}
	    		if(page_EQ && players[j].level<=PageLevelLimit && players[j].level%8==0) {
	    			boxes[i].checked = true;	
	    		}
	    		if(page_BUYEQ && players[j].level<=PageLevelLimit && players[j].bts >50) {
	    			boxes[i].checked = true;	
	    		}
	    		if(page_BT && players[j].level<=PageLevelLimit && players[j].bts >0) {
	    			boxes[i].checked = true;	
	    		}
	    	}
	}
	
    var BTboxes = document.getElementsByClassName('BTtoSP');
    var EQboxes = document.getElementsByClassName('UpgradeEQ');
    	for(i=0;i<BTboxes.length;i++) {
    		id = BTboxes[i].value;
    		id2 = players[i].id;
    		j=i;
    		if(id2!=id) {// BTboxes[i] will match players[i] because it's one box per row, unless the user changes their sort, then it doesn't :(
    			for(j in players) {
    				if(id==players[j].id) {
    					break; // use this value for j
    				}	    				
    			}		    			
    		}
	    	BTboxes[i].checked = false;
    		if(players[j].level<=BTLevelLimit && players[j].bts >=15) {
    			BTboxes[i].checked = true;	
    		}
	    	EQboxes[i].checked = false;
    		if(players[j].level<=EQLevelLimit && (players[j].level==1 || players[j].level%8==0)) {
    			EQboxes[i].checked = true;	
    		}
    	}
}

function init() {	
	BTLevelLimit=GM_getValue('BTLevelLimit');
	PageLevelLimit=GM_getValue('PageLevelLimit');
	EQLevelLimit=GM_getValue('EQLevelLimit');
	
	// Default values for bad or nonexistent values
	if(BTLevelLimit!=null && BTLevelLimit!="" || BTLevelLimit>=0 && BTLevelLimit<=999) {
	} else {
		BTLevelLimit = 16;
	}
	if(PageLevelLimit!=null && PageLevelLimit!="" || PageLevelLimit>=0 && PageLevelLimit<=999) {
	} else {
		PageLevelLimit = 99;
	}
	if(EQLevelLimit!=null && EQLevelLimit!="" || EQLevelLimit>=0 && EQLevelLimit<=999) {
	} else {
		EQLevelLimit = 16;
	}
}

function config() {
	var newlevel = -1;
	while(newlevel!= null && newlevel<0) {
		var newlevel = prompt("Do not autocheck BTs for any players above this level:  (currently set to:" + BTLevelLimit + ")");
	}	
	if(newlevel!=null) {
		BTLevelLimit = parseInt(newlevel);
		GM_setValue("BTLevelLimit", BTLevelLimit);
	}
		
	newlevel = -1;
	while(newlevel!= null && newlevel<0) {
		var newlevel = prompt("Do not autocheck EQ for any players above this level:  (currently set to:" + EQLevelLimit + ")");
	}	
	if(newlevel!=null) {
		EQLevelLimit = parseInt(newlevel);
		GM_setValue("EQLevelLimit", EQLevelLimit);
	}
	
	newlevel = -1;
	while(newlevel!= null && newlevel<0) {
		var newlevel = prompt("Do not autocheck Pages for any players above this level:  (currently set to:" + PageLevelLimit + ")");
	}	
	if(newlevel!=null) {
		PageLevelLimit = parseInt(newlevel);
		GM_setValue("PageLevelLimit", PageLevelLimit);
	}
	pageChange();
}

function info() {
	var text = "Pee Wee Bulk Player Management v0.2\n"+
		"This script will execute any checked actions when you click the 'Execute Selected Actions' button.  You can click the headers to automatically select all/none of the boxes.  If you are triggering many players, please be patient.  It is communicating behind the scenes with GLB and takes time to load all of the pages.\n"+
		"Each category has a maximum level you can change via 'config'.  Useful for restricting the automation to pee wee players, for example.\n"+
		"\n"+
		"-BT will convert BTs to a SP.\n"+
		"-EQ will automatically upgrade equipment for that player or purchase initial equipment if it doesn't already exist.  The selected attribute goes to whichever attribute is highest for that player.  If you want to choose a different attribute than your highest value one, then don't use this for it.\n"+
		"-Pages will open up whichever pages you select in the selection box.  Hold down CTRL to select/unselect multiple pages.\n"+
		"\n"+
		"You use this at your own risk.  I can't guarantee it will work the way you want with every player.\n"+
		"If you have feature requests, PM me at 'awsalick'.";
	alert(text);
}
    
function BTtoSP() {
	var player = document.getElementsByClassName('BTtoSP');
	for(i=0;i<player.length;i++){
		if(player[i].checked){
			totalTasks = totalTasks+1;
			addToXMLqueue('/game/bonus_tokens.pl', 'skill_point', 'player_id=' + player[i].value);
			runXMLqueue();   
		}
	}
	
	
}
    
function openPages(){
    var boxes = document.getElementsByClassName('OpenPage');
    var pages = document.getElementById('openPages');
    var url;
    for(i in pages.options) {
    		if(pages.options[i].selected) {
    			
    			url = "http://" + window.location.hostname + "/game/" + pages.options[i].value + ".pl";
			for(j=0;j<boxes.length;j++){
			   if(boxes[j].checked){
			       params = '?player_id='+boxes[j].value;
			       window.open(url+params);
			   }
			}
		}
	}
}

function equipUp(){
	var player = document.getElementsByClassName('UpgradeEQ');
	var confirmed = 0;
	for(i=0;i<player.length;i++){
		if(player[i].checked){
			if(confirmed ==0) {      	
				if (confirm('This will purchase equipment upgrades to the highest attribute on each player. Continue?')) {
					confirmed = 1;
			 	} else {
			 		confirmed = -1;
			 	} 		
			}
			if(confirmed==1) {
				equipPage(player[i].value);  				
			}
		}
	}
}

function equipPage(playerID) {	
	var lookupURL = "http://" + window.location.hostname + "/game/equipment.pl?player_id="+playerID; 
	var params = ["player_id=", playerID]; // *** this may not be necessary
	GM_xmlhttpRequest( {
		method :"POST",
		url : lookupURL,
		data :params.join(""),
		headers : {
			"Content-Type" :"application/x-www-form-urlencoded"
		},
		onload : function(response) {
			var dt = document.implementation.createDocumentType("html","-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
			doc = document.implementation.createDocument('', '', dt),
			html = doc.createElement('html');
	
			html.innerHTML = response.responseText;
			doc.appendChild(html);	
			
			// determine highest attribute
			highest=0;
			highestval = 0;
			location = doc.getElementById("player_stats_long").getElementsByClassName("stat_head"); // need to use this instead of stat_value b/c bonus stats have different classname
			
			for(i=0;i<location.length;i++) { 
				value = parseFloat(location[i].nextElementSibling.textContent);
				if(value > highestval) {
					highestval = value;
					highest = i;				
				}
			}
			
						
			attributeUp = "";
			var attributes = ['strength', 'speed', 'agility', 'jumping', 'stamina', 'vision', 'confidence', 'blocking', 'tackling', 'throwing', 'catching', 'carrying', 'kicking', 'punting'];
			attributeUp = attributes[highest];
			
			location = doc.getElementsByClassName("equipment_container");
			if(location.length==0) { // then equipment doesn't exist yet
				var itemIDs=[1,12,23,34];
				for(i in itemIDs) {
					addToXMLqueue('/game/buy_equipment.pl', 'POST', 'player_id=' + playerID + '&item_id=' + itemIDs[i] + '&' + attributeUp + '=1');
				}
				totalTasks = totalTasks+1;
				runXMLqueue();
			} else {
				for(i=0;i<location.length;i++) {
					equipment_container = location[i];
					equipment_container=equipment_container.getElementsByClassName("equipment_content")[0].parentNode;
					equip_class=equipment_container.className;
					if(equip_class.indexOf("endorsement")==-1 && equipment_container.getElementsByClassName("equipment_description_custom").length==0) { // not an endorsement or custom
						equip_id=equipment_container.id;
						equip_id = equip_id.substring(5); // removes 'item_' from the start of id	
						equip_button = equipment_container.getElementsByClassName("equipment_equip");
						if(equip_button.length==1) {
							if(equip_button[0].firstChild.href.indexOf("equip=")>=0) { // if item can be equipped
								GM_xmlhttpRequest( {
									method :"GET",
									url : "/game/equipment.pl?player_id=" + playerID + "&equip=" + equip_id,
									headers : {
										"Content-Type" :"application/x-www-form-urlencoded"
									},
									onload : function(response) {
									}
								});	
							}					
						}	
						if(equipment_container.getElementsByClassName("equipment_upgrade").length==1) { // if there is an upgrade button	
							addToXMLqueue('/game/equipment.pl', 'upgrade', 'player_id=' + playerID + '&item_id=' + equip_id + '&' + attributeUp + '=1');
							
							totalTasks = totalTasks+1;
							runXMLqueue();
						}
					}
				}
			}        
		}
	});
	
			
}

function toggle(className){
	var chk = document.getElementsByClassName(className);
	var firstval = -1;
	for(var i=0;i<chk.length;i++){
		if(firstval == -1) {
			if(chk[i].checked){
			    firstval = 1;	            
			}else{
			    firstval = 0;
			}
		}
		if(firstval == 1) {
	    		chk[i].checked = false;
	    	} else {
	    		chk[i].checked = true;
	    	}
	}
}


function progUpdate(){
	working = document.getElementById('bulkDiv');
	percent = Math.floor(finishedTasks/totalTasks*10);
	switch(percent){
		case 0: working.innerHTML = '|..........|'; break;
		case 1: working.innerHTML = '|-.........|'; break;
		case 2: working.innerHTML = '|--........|'; break;
		case 3: working.innerHTML = '|---.......|'; break;
		case 4: working.innerHTML = '|----......|'; break;
		case 5: working.innerHTML = '|-----.....|'; break;
		case 6: working.innerHTML = '|------....|'; break;
		case 7: working.innerHTML = '|-------...|'; break;
		case 8: working.innerHTML = '|--------..|'; break;
		case 9: working.innerHTML = '|---------.|'; break;
		case 10: 
			working.innerHTML = 'Complete!'; 
			buildUI();
			totalTasks = 0;
			finishedTasks = 0;
			break;
		default:
			break;		
	}
}

function get(url){
    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open('GET',url,false);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(null);
    return xmlhttp.responseText;
}

//~~~~~~~~~~~~~~~~~~~~~~~~ GLB code from here on~~~~~~~~~~~~~~~~
var _xmlHttp;
var _xmlHttpQueue = Array();
var _xmlSending = 0;
var _xmlTimeoutTimer;

function getXMLHTTP() {
	var A = null;
	try {
		A = new ActiveXObject("Msxml2.XMLHTTP")
	} catch(e) {
	try {
		A = new ActiveXObject("Microsoft.XMLHTTP")
		} catch(oc) {
			A = null;
		}
	}
	if(!A && typeof XMLHttpRequest != "undefined") {
		A = new XMLHttpRequest();
	}

	return A;
}

function addToXMLqueue(path, mode, flags, timeout, timeout_callback, method) {
	var newObj = new Object();
	newObj.path = path;
	newObj.mode = mode;
	newObj.flags = flags;
	newObj.timeout = timeout;
	newObj.timeoutCallback = timeout_callback;
	
	if (!method) {
		method = 'POST';
	}
	
	newObj.method = method;

	_xmlHttpQueue.push(newObj);
}

function runXMLqueue() {
	if (_xmlSending == 0) {
		if (_xmlHttpQueue.length > 0) {
			var queueObj = _xmlHttpQueue.shift();
			getData(queueObj.path, queueObj.mode, queueObj.flags, queueObj.timeout, queueObj.timeoutCallback, queueObj.method);
		}
	}
}

function getData(path, mode, flags, timeout, callback, method) {
	_xmlHttp = getXMLHTTP();
	if(_xmlHttp){
		_xmlSending = 1;
		//_xmlHttp.open("GET", path + '?mode=' + mode + '&' + flags, true);
		_xmlHttp.open(method, path, true);
		if (timeout) {
			if (_xmlTimeoutTimer) {clearTimeout(_xmlTimeoutTimer);}
			_xmlTimeoutTimer = setTimeout('handleXMLtimeout();' + callback, timeout);
		}
		_xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		_xmlHttp.onreadystatechange=function() {
			if (_xmlHttp.readyState==4) {
				if (_xmlHttp.responseText) {
					//eval(_xmlHttp.responseText);  - disabled this so equipment purchasing would continue - otherwise would error after 1st purchase
					finishedTasks = finishedTasks+1;   // *** new				
					progUpdate();
				}
				if (_xmlTimeoutTimer) {clearTimeout(_xmlTimeoutTimer);}
				_xmlSending = 0;
				runXMLqueue();
			}
		}
	}

	_xmlHttp.send('mode=' + mode + '&' + flags)
}

function generalHTTPSend(path) {
	_xmlHttp = getXMLHTTP();
	if(_xmlHttp){
		_xmlSending = 1;
		_xmlHttp.open("GET", path, true);
		_xmlHttp.onreadystatechange=function() {
			if (_xmlHttp.readyState==4&&_xmlHttp.responseText) {
				eval(_xmlHttp.responseText);
			}
			_xmlSending = 0;
		}
	}

	_xmlHttp.send(null)
}

function handleXMLtimeout() {
	clearTimeout(_xmlTimeoutTimer);
	
	if (_xmlSending && _xmlHttp) {
		_xmlHttp.abort();
		_xmlSending = 0;		
		runXMLqueue();
	}
}

function clearXMLqueue() {
	clearTimeout(_xmlTimeoutTimer);
	_xmlHttp.abort();
	_xmlSending = 0;
	_xmlHttpQueue = Array();
}

function upgradeFailed(upgrade) {
}

function finishSkillPoint() {
}

function finishUpgrade() {
}

function failUpgrade() {
}
