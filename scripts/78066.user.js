// ==UserScript==
// @name             Fast&Furious ++
// @version          1.0.5fr
// @original author  danmana
// @edited by        Bugsissimo
// @namespace        http://userscripts.org/users/103443
// @description      Shows the parts with the lowest cost per performance point. Adds a repair/replace all button. Allows sorting of team members and users in streetmeets.
// @include          http://www.fastandfuriousfig.*/Pages/AutoParts.aspx*
// @include          http://www.fastandfuriousfig.*/Pages/Garage.aspx?tab=1*
// @include          http://www.fastandfuriousfig.*/Pages/Team.aspx?tab=2*
// @include          http://www.fastandfuriousfig.*/Pages/StreetMeet.aspx?*storeid=*
// ==/UserScript==


/********************************
********** VERSION INFO *********
*********************************
v1.0.5fr:
-FIX: Correction des bugs dûs à l'évolution du site et à la VF
-FIX: Traduction des informations en français
*********************************
*********************************
v1.0.4:
-NEW: show top 3 repairs
*********************************
*********************************
v1.0.3:
-NEW: on street meet page the people are ordered by respect (and colored red-orange-green depending on respect)
-NEW: team members can be sorted by respect, teamwork, name or online status
*********************************
v1.0.2:
-NEW: repair/replace all button on the repair page
*********************************
v1.0.1:
-FIX: parts above level 9 do not give performance
*********************************
v1.0.0:
-first version
********************************/
/**
 * An associative array holding patterns.
 * @type {Array}
 */
var PATTERN = new Array();
PATTERN['part'] = '//div[@class="storeGrid"]/ul/li';
PATTERN['part.name'] = 'div[@class="product"]/div[@class="info"]/h4/text()';
PATTERN['part.performance'] = 'div[@class="product"]/div[@class="info"]/div[@class="data"]/div[1]/strong/text()';
PATTERN['part.Apparence'] = 'div[@class="product"]/div[@class="info"]/div[@class="data"]/div[2]/strong/text()';
PATTERN['part.Maniabilité'] = 'div[@class="product"]/div[@class="info"]/div[@class="data"]/div[3]/strong/text()';
PATTERN['part.cost'] = 'div[@class="price"]/strong/text()';
PATTERN['part.buy'] = 'div[@class="price"]/div[@class="buttons"]/a[@class="button ok"]';
PATTERN['sidebar'] = '//div[@id="sidebar"]';
PATTERN['repair'] = '//div[@id="contentWrapper"]/table[@class="parts"]/tbody/tr';
PATTERN['repair.name'] = 'td[2]/strong/text()';
PATTERN['repair.performance'] = 'td[2]/ul/li[2]/strong/text()';
PATTERN['repair.damage'] = 'td[3]/strong/text()';
PATTERN['repair.remaining'] = 'td[3]/div[2]/img';
PATTERN['repair.cost'] = 'td[4]/div[1]/div/text()';
PATTERN['repair.button'] = 'td[4]/div[1]/a';
PATTERN['repairHolder'] = '//div[@id="contentWrapper"]/div[contains(@class,"repairParts")]/div/ul';
PATTERN['members'] = '//div[@id="contentWrapper"]/table[@class="userList"]/tbody';
PATTERN['members.row'] = 'tr';
PATTERN['members.online'] = 'td[2]/img/@alt';
PATTERN['members.name'] = 'td[3]/strong/a/text()';
PATTERN['members.work'] = 'td[4]/div/strong/text()';
PATTERN['members.respect'] = 'td[5]/div/strong/text()';
PATTERN['street'] = '//div[@id="streetMeet"]/div[@class="users"]/div';
PATTERN['street.row'] = 'ul/li';
PATTERN['street.border'] = 'div[@class="info"]/div[@class="property"]';
PATTERN['street.name'] = 'div[@class="info"]/div[@class="user"]/a/text()';
PATTERN['street.respect'] = 'div[@class="info"]/div[@class="property"]/strong/text()';
PATTERN['street.searchPlayer'] = '//div[@id="streetMeet"]/div[@class="users"]/div/ul/li/div[@class="info"]/div[@class="user"]/a';
PATTERN['request'] = '//div[@id="streetMeet"]/div[1]';
PATTERN['request.player'] = 'div[@class="raceRequest"]/div[@class="message"]';

//not all implementations of Array.sort are stable, so we add one that is
//note: this function sorts by default ascending
Array.prototype.stableSort = function(comparator){
	if (comparator == null)
		comparator = function(a,b){
			if (a<b) return -1;
			return (a>b)?1:0;
		}
	//gnome sort - simple but O(n^2)
	var pos = 0;
	var n = this.length;
    while (pos < n){
        if ((pos == 0) || (comparator(this[pos-1],this[pos])<=0))
            pos++;
        else{
			var aux = this[pos];
			this[pos]=this[pos-1];
			this[pos-1]=aux;
            pos--;
		}
	}
}
/**
 * Set this true if any errors are encountered.
 * @type {Boolean}
 */
var ERROR = false;
/**
 * Set this true to see more details about the errors encountered.
 * @type {Boolean}
 */
var DEBUG = true;

window.addEventListener('load', main, false);
var me = {money:0,respect:0};
var total = new Array();
total['performance'] = 0;
total['Apparence'] = 0;
total['Maniabilité'] = 0;
total['Global'] = 0;
var members;
var range = 1/3;
/**
 * The main function.
 */
function main(){
    ERROR = false;
	
	loadMe();
	
	if (/Pages\/AutoParts.aspx/.test(document.location.href)){
        show_bestbuy();
    } else if (/Pages\/Garage.aspx\?tab=1/.test(document.location.href)){
		show_repair();
	} else if (/Pages\/Team.aspx\?tab=2/.test(document.location.href)){
		members = null;
		show_teamMembers();
	} else if (/Pages\/StreetMeet.aspx\?.*storeid=/.test(document.location.href)){
		show_streetMeet();
		show_requestRespect();
	}

    if (ERROR) 
        alert('Errors encountered while running the script.' +
        ((typeof GM_log == 'function') ? '\nSee JavaScript Console for more messages.' : '') +
        (DEBUG ? '' : '\nSet DEBUG = true to view more more details.'));
}

function loadMe(){
	var temp;
	
	me.name = getPatternResult('//div[@id="username"]/strong/a/text()').snapshotItem(0).data;
	me.respect = parseInt(getPatternResult('//div[@id="userWallet"]/div[1]/strong/text()').snapshotItem(0).data);
	me.money = parseInt(getPatternResult('//div[@id="userWallet"]/div[2]/strong/text()').snapshotItem(0).data.substring(1).replace('\u00a0',''));
	me.credits = parseInt(getPatternResult('//div[@id="userWallet"]/div[3]/strong/text()').snapshotItem(0).data);
	temp = getPatternResult('//div[@id="sidebar"]/div[2]/div[2]/ul/div/li[1]/div[1]/strong/text()').snapshotItem(0).data;
	me.copheat = parseInt(temp.substring(0,temp.length-1));
	temp = getPatternResult('//div[@id="sidebar"]/div[2]/div[2]/ul/div/li[2]/div[1]/strong/text()').snapshotItem(0).data;
	me.damage = parseInt(temp.substring(0,temp.length-1));
	
	temp = getPatternResult('//div[@id="quarterMileTime"]/img/@src');
	me.quarterMileTime = '';
	for (var i=0;i<temp.snapshotLength;i++)
		me.quarterMileTime += /\/images2\/digits\/(.*)\.png/.exec(temp.snapshotItem(i).nodeValue)[1];
	me.quarterMileTime = parseFloat(me.quarterMileTime.replace('dot','.'));
	
	temp = getPatternResult('//div[@id="driftPointDisplay"]/img/@src');
	me.driftPoints = '';
	for (var i=0;i<temp.snapshotLength;i++)
		me.driftPoints += /\/images2\/digits\/(.*)\.png/.exec(temp.snapshotItem(i).nodeValue)[1];
	me.driftPoints = parseInt(me.driftPoints);
	
	me.performance = parseInt(getPatternResult('//div[@id="sidebar"]/div[3]/div[3]/ul/li[1]//div[@class="wrap"]/strong/text()').snapshotItem(0).data);
	me.Maniabilité = parseInt(getPatternResult('//div[@id="sidebar"]/div[3]/div[3]/ul/li[2]//div[@class="wrap"]/strong/text()').snapshotItem(0).data);
	me.Apparence = parseInt(getPatternResult('//div[@id="sidebar"]/div[3]/div[3]/ul/li[3]//div[@class="wrap"]/strong/text()').snapshotItem(0).data);
	me.driving = parseInt(getPatternResult('//div[@id="sidebar"]/div[3]/div[3]/ul/li[4]//div[@class="wrap"]/strong/text()').snapshotItem(0).data);

}


function show_teamMembers(){
	var xMembers = getPatternResult(PATTERN['members']);
	if ((xMembers == null)||(xMembers.snapshotLength != 1))
		return;
	//first time we call this function
	//1. build the members array
	var xRows = getPatternResult(PATTERN['members.row'],xMembers.snapshotItem(0));
	if ((xRows == null)||(xRows.snapshotLength == 0))
		return;
	members = new Array();
	var n = xRows.snapshotLength;
	for (var i=0;i<n;i++){
		var member = new Object();
		var xRow = xRows.snapshotItem(i);
		var xName = getPatternResult(PATTERN['members.name'],xRow);
		var xOnline = getPatternResult(PATTERN['members.online'],xRow);
		var xWork = getPatternResult(PATTERN['members.work'],xRow);
		var xRespect = getPatternResult(PATTERN['members.respect'],xRow);
		
		member.row = xRow;
		member.name = xName.snapshotItem(0).data.toLowerCase();
		member.online = xOnline.snapshotItem(0).nodeValue.toLowerCase();
		member.work = parseInt(xWork.snapshotItem(0).data);
		member.respect = parseInt(xRespect.snapshotItem(0).data);
		member.toString = function(){
			return '['+this.name+','+this.online+','+this.work+','+this.respect+']\n';
		};
		
		members[members.length]=member;
	}
	//2. add the required css
	addCssStyle('team');
	
	//3. refresh the table
	refreshTeamMembers('work',true);
}

function refreshTeamMembers(sortField,descending){
	if (sortField == null){
		sortField = 'respect'
		descending = true;
	}
	if (isUndefined(descending))
		descending = false;
		
	var xMembers = getPatternResult(PATTERN['members']);
	if ((xMembers == null)||(xMembers.snapshotLength != 1))
		return;

	members.stableSort(function(a,b){
		var v1 = a[sortField];
		var v2 = b[sortField];
		if (v1<v2) return (descending?1:-1);
		return (v1>v2)?(descending?-1:1):0;
	});

	var table = xMembers.snapshotItem(0);
	while (table.hasChildNodes())
		table.removeChild(table.firstChild);
	
	//append the header
	table.appendChild(getTeamTableHeader(sortField,descending));
	
	for (var i=0;i<members.length;i++)
		table.appendChild(members[i].row);		
}

function getTeamTableHeader(f,d){
	var dir = d?'\u00a0\u2193':'\u00a0\u2191';
	var tr = document.createElement('tr');
	tr.appendChild(document.createElement('th'));
	
	var th;

	th = document.createElement('th');
	th.style.textAlign = 'left';
	tr.appendChild(th);
	var online = document.createElement('a');
	th.appendChild(online);
	online.appendChild(document.createTextNode('Online' + ((f=='online')?dir:'')));
	online.addEventListener('click',function(){
		refreshTeamMembers('online',((f=='online')?!d:true));
	},false);

	th = document.createElement('th');
	th.style.textAlign = 'left';
	tr.appendChild(th);
	var name = document.createElement('a');
	th.appendChild(name);
	name.appendChild(document.createTextNode('Nom' + ((f=='name')?dir:'')));
	name.addEventListener('click',function(){
		refreshTeamMembers('name',((f=='name')?!d:false));
	},false);

	th = document.createElement('th');
	th.style.textAlign = 'right';
	tr.appendChild(th);
	var work = document.createElement('a');
	th.appendChild(work);
	work.appendChild(document.createTextNode('Heures travaillées' + ((f=='work')?dir:'')));
	work.addEventListener('click',function(){
		refreshTeamMembers('work',((f=='work')?!d:true));
	},false);

	th = document.createElement('th');
	th.style.textAlign = 'right';
	tr.appendChild(th);
	var respect = document.createElement('a');
	th.appendChild(respect);
	respect.appendChild(document.createTextNode('Respect' + ((f=='respect')?dir:'')));
	respect.addEventListener('click',function(){
		refreshTeamMembers('respect',((f=='respect')?!d:true));
	},false);

	tr.appendChild(document.createElement('th'));
	return tr;
}

function show_requestRespect(){
	var xRequest = getPatternResult(PATTERN['request']);
	var request = xRequest.snapshotItem(0);
	
	request.removeEventListener('DOMNodeInserted',show_requestRespect,false);
	
	var xRequestPlayer = getPatternResult(PATTERN['request.player'],request);
	if (xRequestPlayer.snapshotLength == 1){
		var requestPlayer = xRequestPlayer.snapshotItem(0);
		var text = getPatternResult('text()',requestPlayer).snapshotItem(0).data;
		//TODO extract name with regex
		var groups = /^\s*(.*)\s+(vous défie sur une course libre\.)\s*$/.exec(text);
		if ((groups!=null) && (groups.length==3)){
			var name = groups[1];
			var requestMessage = groups[2];
			var xPlayerInfo = getPatternResult(PATTERN['street.searchPlayer']+'[text()="'+name+'"]');

			if (xPlayerInfo.snapshotLength == 1){
			var playerDiv = xPlayerInfo.snapshotItem(0).parentNode.parentNode;
				var xRespect = getPatternResult('div[@class="property"]/strong/text()',playerDiv);
				var respect = parseInt(xRespect.snapshotItem(0).data);
				var strong = document.createElement('strong');
				strong.appendChild(document.createTextNode(' ('+respect+') '));
				strong.style.color = (respect > (1+range)*me.respect)?'#9E0B0F':((respect >= (1-range)*me.respect)?'#D6930A':'#8dc63f');
				requestPlayer.removeChild(requestPlayer.firstChild);
				requestPlayer.appendChild(document.createTextNode(name));
				requestPlayer.appendChild(strong);
				requestPlayer.appendChild(document.createTextNode(requestMessage));
			}
		}
	}	
	
	request.addEventListener('DOMNodeInserted',show_requestRespect,false);
}

function show_streetMeet(){
	var xStreet = getPatternResult(PATTERN['street']);
	var street = xStreet.snapshotItem(0);
	var xRows = getPatternResult(PATTERN['street.row'],street);
	if (xRows.snapshotLength > 0){
		var players = new Array();
		for (var i=0;i<xRows.snapshotLength;i++){
			var player = new Object();
			player.row = xRows.snapshotItem(i);
			player.name = getPatternResult(PATTERN['street.name'],player.row).snapshotItem(0).data;
			player.respect = parseInt(getPatternResult(PATTERN['street.respect'],player.row).snapshotItem(0).data);
			var style = getPatternResult(PATTERN['street.border'],player.row).snapshotItem(0).style;
			style.borderWidth = '1px';
			style.borderStyle = 'solid';
			style.MozBorderRadius = '4px';
			if (player.name == me.name){
					style.borderColor = '#0B0F9E';
					style.backgroundColor = '#112';
			} else if (player.respect > (1+range)*me.respect){
					style.borderColor = '#9E0B0F';
					style.backgroundColor = '#211';
			} else if (player.respect >= (1-range)*me.respect){
				style.borderColor = '#D6930A';
				style.backgroundColor = '#221';
			} else {
				style.borderColor = '#8dc63f';
				style.backgroundColor = '#121';
			}
			players[players.length] = player;
		}
		players.stableSort(function(a,b){
			return b.respect - a.respect;
		});

		//reorder the nodes
		//1. remove any active listeners
		street.removeEventListener('DOMNodeInserted',show_streetMeet,false);
		//2. remove old items
		var ul = getPatternResult('ul',street).snapshotItem(0);
		while (ul.hasChildNodes())
			ul.removeChild(ul.firstChild);
		//3. add the new items
		for (var i=0;i<players.length;i++)
			ul.appendChild(players[i].row);
		//4. add back all the listeners
		street.addEventListener('DOMNodeInserted',show_streetMeet,false);
	}
}

/**
 * Show the best buy menu on the AutoParts page.
 */
function show_repair(){
	var xRepairs = getPatternResult(PATTERN['repair']);
	var repairs = new Array();
	
	//go through all the repairs
	if (xRepairs==null)
		error('No parts found');
	else {
		for (var i=0; i<xRepairs.snapshotLength; i++){
			var xRepair = xRepairs.snapshotItem(i);
			var xName = getPatternResult(PATTERN['repair.name'],xRepair);
			var xPerformance = getPatternResult(PATTERN['repair.performance'],xRepair);
			var xDamage = getPatternResult(PATTERN['repair.damage'],xRepair);
			var xRemaining = getPatternResult(PATTERN['repair.remaining'],xRepair);
			var xCost = getPatternResult(PATTERN['repair.cost'],xRepair);
			var xButton = getPatternResult(PATTERN['repair.button'],xRepair);
			
			var repair = new Object();
			repair.name = ((xName==null)||(xName.snapshotLength!=1))? null : xName.snapshotItem(0).data;
			repair.performance = ((xPerformance==null)||(xPerformance.snapshotLength!=1))? null : xPerformance.snapshotItem(0).data;
			repair.damage = ((xDamage==null)||(xDamage.snapshotLength!=1))? null : xDamage.snapshotItem(0).data;
			repair.remaining = (xRemaining==null)? 0 : xRemaining.snapshotLength;
			repair.cost = ((xCost==null)||(xCost.snapshotLength!=1))? null : xCost.snapshotItem(0).data;
			repair.button = ((xButton==null)||(xButton.snapshotLength!=1))? null : xButton.snapshotItem(0);
			
			if ((repair.name!=null)&&(repair.performance!=null)&&(repair.damage!=null)&&(repair.cost!=null)&&(repair.button!=null)){
				var groups = /^(\d+[.]\d+)[(](\d+)[)]/.exec(repair.performance.replace(',','.'));
				
				if ((groups==null) || (groups.length!=3))
					continue;
				repair.performance = (groups[1]);
				repair.performanceMax = (groups[2]);

				groups = /\w*:\s*(\d+)%/.exec(repair.damage);
				if ((groups==null) || (groups.length!=2))
					continue;
				repair.damage = parseInt(groups[1]);
				
				groups = /\w*:\s*\€(\d+)/.exec(repair.cost.replace('\u00a0',''));
				if ((groups==null) || (groups.length!=2))
					continue;
				repair.cost = parseInt(groups[1].replace('\u00a0',''));
				repairs[repairs.length] = repair;
				
			}
		}
		
		//add css styles
		addCssStyle('repair');
	}
	
	var xRepairHolder = getPatternResult(PATTERN['repairHolder']);
	if ((xRepairHolder==null)||(xRepairHolder.snapshotLength!=1))
		error('Repair holder not found ');
	else{
		var repairHolder = xRepairHolder.snapshotItem(0);
		var t = getRepairTotals(repairs);
		
		var li = document.createElement('li');
		li.style.width = '160px';
		li.innerHTML = '<strong>Réparer <span style="color:#D6930A">'+t.performanceDamage.toFixed(2)+
		'</span> points de performances pour <span style="color:'+((t.cost <= me.money)? '#8dc63f':'#9E0B0F')+'">'+t.cost+'€</span> '+
		'<span title="Price is computed from parts on this tab. The buttons repair all tabs." style="color:red">*BETA*</span></strong>'+
		'<br/><a id="ctl00_MainContentWrapper_PageContentPlaceHolder_repairBody_ctl00_btnReplaceAll" class="button ok" href="'+
		"javascript:__doPostBack('ctl00$MainContentWrapper$PageContentPlaceHolder$repairBody$ctl00$btnRepairAll','')"+'"><span>Réparer tout</span></a>'+
		'<a style="margin-left:13px;" id="ctl00_MainContentWrapper_PageContentPlaceHolder_repairBody_ctl00_btnReplaceAll" class="button ok" href="'+
		"javascript:__doPostBack('ctl00$MainContentWrapper$PageContentPlaceHolder$repairBody$ctl00$btnReplaceAll','')"+'"><span>Remplacer tout</span></a><br/>';
		repairHolder.appendChild(li);
		
		repairs.stableSort(function(a,b){
			var v1 = a['performanceMax']-a['performance'];
			var v2 = b['performanceMax']-b['performance'];
			return v2-v1;
		})
		
		li = document.createElement('li');
		li.style.width = '160px';
		
		var table = document.createElement('table');
		li.appendChild(table);
		table.className = 'bestRepair';
		
		var trh = document.createElement('tr');
		table.appendChild(trh);
		trh.innerHTML = '<th title="Le nom de la pièce">Pièce</th><th title="Réparations restantes"><img alt="Réparations restantes" src="/images2/repair/repair_icon.png"/></th><th title="Points de performances manquants">P</th><th title="Prix pour réparer">€</th>';
		
		var n = Math.min(3,repairs.length);
		for (var i =0; i<n;i++){
			var r = repairs[i];
			var button = r.button.cloneNode(true);
			button.firstChild.firstChild.textContent = '+';//change the text to something shorter
			button.style.margin = '0';
			
			var tr = document.createElement('tr');
			tr.style.lineHeight = '12px';
			
			var td = document.createElement('td');
			td.appendChild(document.createTextNode(r.name.split(' ')[0]));
			td.title = r.name;
			tr.appendChild(td);

			var td = document.createElement('td');
			td.appendChild(document.createTextNode(r.remaining));
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.appendChild(document.createTextNode((r.performanceMax - r.performance).toFixed(1)));
			tr.appendChild(td);

			td = document.createElement('td');
			var strong = document.createElement('strong');
			td.appendChild(strong);
			strong.appendChild(document.createTextNode(r.cost));
			strong.style.color = (r.cost <= me.money)? '#8dc63f':'#9E0B0F';
			tr.appendChild(td);

			td = document.createElement('td');
			td.appendChild(button);
			tr.appendChild(td);
			
			table.appendChild(tr);
		}
		repairHolder.appendChild(li);

	}	
}

function getRepairTotals(repairs){
	var total = {cost:0,performanceDamage:0};
	for (var i=0;i<repairs.length;i++){
		var repair = repairs[i];
		total.cost+=repair.cost
		total.performanceDamage+=repair.performanceMax - repair.performance;
	}
	return total;
}

/**
 * Show the best buy menu on the AutoParts page.
 */
function show_bestbuy(){
	var xParts = getPatternResult(PATTERN['part']);
	var parts = new Array();
	
	//go through all the parts and select the usefull ones
	if ((xParts==null)||(xParts.snapshotLength==0))
		error('No parts found');
	else{
		for (var i=0; i<xParts.snapshotLength; i++){
			var xPart = xParts.snapshotItem(i);
			var xName = getPatternResult(PATTERN['part.name'],xPart);
			var xPerformance = getPatternResult(PATTERN['part.performance'],xPart);
			var xApparence = getPatternResult(PATTERN['part.Apparence'],xPart);
			var xManiabilité = getPatternResult(PATTERN['part.Maniabilité'],xPart);
			var xCost = getPatternResult(PATTERN['part.cost'],xPart);
			var xBuy = getPatternResult(PATTERN['part.buy'],xPart);

			var part = new Object();
			part.name = ((xName==null)||(xName.snapshotLength!=1))? null : xName.snapshotItem(0).data;
			part.performance = ((xPerformance==null)||(xPerformance.snapshotLength!=1))? null : xPerformance.snapshotItem(0).data;
			part.Apparence = ((xApparence==null)||(xApparence.snapshotLength!=1))? null : xApparence.snapshotItem(0).data;
			part.Maniabilité = ((xManiabilité==null)||(xManiabilité.snapshotLength!=1))? null : xManiabilité.snapshotItem(0).data;
			part.cost = ((xCost==null)||(xCost.snapshotLength!=1))? null : xCost.snapshotItem(0).data;
			part.buy = ((xBuy==null)||(xBuy.snapshotLength!=1))? null : xBuy.snapshotItem(0).cloneNode(true);
			
			if ((part.name != null)&&(part.performance != null)&&(part.Apparence != null)&&(part.Maniabilité != null)&&(part.cost != null)&&(part.buy != null)){
				if ((part.performance.length>0)&&(part.performance.charAt(0)=='+'))
					part.performance = part.performance.substring(1)
				part.performance = parseInt(part.performance);

				//STUPID: parts above level 9 do not actually add the performance they say (they add 0) !!!!!!!
				//they should at least put the value in brackets or add a * or ! at the end, and inform about this in the help
				var words = part.name.split(' ');
				if (parseInt(words[words.length-1])>=9)
					part.performance = 0;


				if ((part.Apparence.length>0)&&(part.Apparence.charAt(0)=='+'))
					part.Apparence = part.Apparence.substring(1)
				part.Apparence = parseInt(part.Apparence);

				if ((part.Maniabilité.length>0)&&(part.Maniabilité.charAt(0)=='+'))
					part.Maniabilité = part.Maniabilité.substring(1)
				part.Maniabilité = parseInt(part.Maniabilité);
				

				if (part.cost.length>0)
					if (part.cost.charAt(0)!='$')
						continue;//credit part
					else
						part.cost = parseInt(part.cost.substring(1).replace('\u00a0',''));
						
				part.performanceRatio = (part.performance==0)? Number.MAX_VALUE :  (part.cost/part.performance);
				part.ApparenceRatio = (part.Apparence==0)? Number.MAX_VALUE :  (part.cost/part.Apparence);
				part.ManiabilitéRatio = (part.Maniabilité==0)? Number.MAX_VALUE :  (part.cost/part.Maniabilité);
				part.Global = part.performance + part.Maniabilité; //+part.Apparence
				part.GlobalRatio = (part.Global==0)? Number.MAX_VALUE :  (part.cost/part.Global);
				
				part.buy.firstChild.firstChild.textContent = '+';//change the text to something shorter
				part.buy.removeAttribute('id');
				
				
				total['performance']+=part.performance;
				total['Apparence']+=part.Apparence;
				total['Maniabilité']+=part.Maniabilité;
				total['Global']+=part.Global;
				
				parts[parts.length]=part;
			}
		}
		//alert('found '+parts.length+' buyable parts from '+xParts.snapshotLength);
	}
	
	var xSidebar = getPatternResult(PATTERN['sidebar']);
	if ((xSidebar==null)||(xSidebar.snapshotLength!=1))
		error('No sidebar found');
	else{
		sortParts(parts,'cost');

		//build the required elements
		var sidebar = xSidebar.snapshotItem(0);
		var section = document.createElement('div');
		section.className = 'section';
		section.id = 'bestbuy';
		
		var header = document.createElement('div');
		header.className = 'header';
		var headerStrong = document.createElement('strong');
		headerStrong.innerHTML = 'Meilleur Perf/€';

		var body = document.createElement('div');
		body.className = 'body';
		
		//add the elements to the page
		sidebar.appendChild(section);
		section.appendChild(header);
		header.appendChild(headerStrong);
		section.appendChild(body);
		var div;
		if ((total['performance']>0)&&(div=getInfoDiv(parts,'performance')))
			body.appendChild(div);
		if ((total['Apparence']>0)&&(div=getInfoDiv(parts,'Apparence')))
			body.appendChild(div);
		if ((total['Maniabilité']>0)&&(div=getInfoDiv(parts,'Maniabilité')))
			body.appendChild(div);
		if ((total['Global']>0)&&(div=getInfoDiv(parts,'Global')))
			body.appendChild(div);
		if ((total['performance']==0)&&(total['Maniabilité']==0)&&(total['Apparence']==0)&&(total['Global']==0)){
			body.appendChild(document.createTextNode('Nothing to buy.'));
		}
		
		//add css styles
		addCssStyle('bestbuy');
	}
}

//should be a stable sorting algorithm !!!
function sortParts(a,field,desc){
	a.stableSort(function(a,b){
		var v1 = a[field];
		var v2 = b[field];
		if (v1<v2) return (desc?1:-1);
		return (v1>v2)?(desc?-1:1):0;
	});
}

function getInfoDiv(parts,field)
{
	var ratioField = field + 'Ratio';
	var title = field.charAt(0).toUpperCase()+field.substring(1);
	var partsClone = parts.slice();
	sortParts(partsClone,ratioField);
	
	var div = document.createElement('div');
	
	var head = document.createElement('h4');
	div.appendChild(head);
	head.className = field;
	head.appendChild(document.createTextNode(title));
	var strong = document.createElement('strong');
	strong.appendChild(document.createTextNode('+'+total[field]))
	head.appendChild(strong);
	
	var table = document.createElement('table');
	div.appendChild(table);
	
	var trh = document.createElement('tr');
	table.appendChild(trh);
	trh.innerHTML = '<th title="Prix par point">€&nbsp;/&nbsp;P</th><th title="Nom pièce">Part</th><th title="Points">P</th><th title="Prix pièce">€</th>';
	
	var n = Math.min(3,partsClone.length);
	var rows = 0;
	for (var i=0;i<n;i++){
		var part = partsClone[i];
		if (part[ratioField]==Number.MAX_VALUE) continue;
		var tr = document.createElement('tr');
		table.appendChild(tr);
		var td;
		
		td = document.createElement('td');
		td.appendChild(document.createTextNode(Math.round(part[ratioField])));
		tr.appendChild(td);

		td = document.createElement('td');
		td.appendChild(document.createTextNode(part.name));
		tr.appendChild(td);

		td = document.createElement('td');
		td.appendChild(document.createTextNode(part[field]));
		tr.appendChild(td);

		td = document.createElement('td');
		td.appendChild(document.createTextNode((part.cost/1000).toFixed(1)+'K'));
		td.style.color = (part.cost <= me.money)? '#8dc63f':'#9E0B0F';
		tr.appendChild(td);

		td = document.createElement('td');
		td.appendChild(part.buy.cloneNode(true));//a part may be added multiple times on the page
		tr.appendChild(td);
		rows++;
	}
	return (rows==0)?null:div;
}

function addCssStyle(page){
	var style = document.createElement('style');
	getPatternResult('//head').snapshotItem(0).appendChild(style);
	
	style.setAttribute('type','text/css');
	if (page == 'bestbuy'){
		style.appendChild(document.createTextNode(''+
		'#bestbuy h4{\n'+
		'background-color: #343434;\n'+
		'line-height: 18px;\n'+
		'padding-left: 25px;\n'+
		'margin:0;\n'+
		'-moz-border-radius: 4px;\n'+
		'}\n'+
		'#bestbuy h4 strong{\n'+
		'float:right;\n'+
		'margin-right:12px;\n'+
		'}\n'+
		'#bestbuy h4.performance{\n'+
		'background: #343434 url(/images2/small_icons.png) no-repeat scroll 5px -98px;\n'+
		'}\n'+
		'#bestbuy h4.Apparence{\n'+
		'background: #343434 url(/images2/small_icons.png) no-repeat scroll 2px -49px;\n'+
		'}\n'+
		'#bestbuy h4.Maniabilité{\n'+
		'background: #343434 url(/images2/small_icons.png) no-repeat scroll 5px 2px;\n'+
		'}\n'+
		'#bestbuy h4.Global{\n'+
		'background: #343434 url(/images2/repair/repair_icon.png) no-repeat scroll 5px 0px\n'+
		'}\n'+
		'#bestbuy .body {\n'+
		'background-repeat: repeat-y;\n'+
		'}\n'+
		'#bestbuy .body > div{\n'+
		'background-color: #111;\n'+
		'padding:2px;\n'+
		'}\n'+
		'#bestbuy table{\n'+
		'width: 180px;\n'+
		'margin: 4px;\n'+
		'}\n'+
		'#bestbuy th,td{\n'+
		'background: none;\n'+
		'line-height: 12px;\n'+
		'padding: 1px 3px;\n'+
		'border:1px solid #333;\n'+
		'}\n'+
		'#bestbuy th{\n'+
		'cursor:pointer;\n'+
		'color:white;\n'+
		'background-color:#222;\n'+
		'text-align:center\n'+
		'}\n'+
		'#bestbuy th:hover{\n'+
		'}'
		));
	} else if (page == 'team'){
		style.appendChild(document.createTextNode('\n'+
		'table.userList th a{\n'+
		'color:#f9ab0f;\n'+
		'}\n'+
		'table.userList th a:hover{\n'+
		'cursor:pointer;\n'+
		'text-shadow:0 0 24px black,0 0 16px black,0 0 8px black;\n'+
		'}\n'+
		''));
	} else if (page == 'repair'){
	style.appendChild(document.createTextNode('\n'+
		'table.bestRepair {\n'+
		'width: 150px;\n'+
		'}\n'+
		'table.bestRepair th,td{\n'+
		'background: none;\n'+
		'line-height: 12px;\n'+
		'padding: 1px 3px;\n'+
		'border:1px solid #333;\n'+
		'}\n'+
		'table.bestRepair th{\n'+
		'cursor:pointer;\n'+
		'color:white;\n'+
		'background-color:#222;\n'+
		'text-align:center\n'+
		'}\n'+
		'table.bestRepair th:hover{\n'+
		'}'+
		''));
	}
}


/**
 * @param {String} pattern The pattern to search for.
 * @param {Node} context The context in which to evaluate the XPath expression.
 * @return {XPathResult} The result of the search.
 */
function getPatternResult(pattern, context){
    if (isUndefined(context)) 
        context = document;
    return document.evaluate(pattern, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

/**
 * Displays the error message if DEBUG is set to true.
 * Uses GM_log where available or alerts otherwise.
 * @param {String} message The error message to display.
 * @see DEBUG
 * @see ERROR
 */
function error(message){
    if (DEBUG) 
        if (typeof GM_log == 'function') 
            GM_log(message);//greasemonkey specific function
        else 
            alert(message);
    ERROR = true;
}

/**
 * @param {Object} x
 * @return {Boolean} true if the parameter is undefined.
 */
function isUndefined(x){
    return x == null && x !== null;
}
