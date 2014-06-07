// ==UserScript==
// @name           Equipment Fund Manager
// @namespace      cabrasher
// @description    Shows your total allowances and estimated ending balance.
// @include        http://goallineblitz.com/game/team_item_fund.pl?team_id=*
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function changeAllowances()
{
	var divAllow = document.getElementById('allowances');	
	var elem = divAllow.getElementsByTagName('input');
	var newAllowance = document.getElementById('amtAdded').value;

	for (i=0; i<=elem.length-1; i++) {
		if (elem[i].type == 'text') {
		elem[i].value = newAllowance
		elem[i].text = newAllowance
		}
	}

	lostFocusAllowance();	
}

function changeTypes()
{
    
	var selectArray1 = getElementsByClassName('alternating_color1', document.getElementById('allowances'));
	var selectArray2 = getElementsByClassName('alternating_color2', document.getElementById('allowances'));
	var createdSelect = document.getElementsByName('allowance_type_cloned');
	var indexForSelect = createdSelect[0].selectedIndex;

	for (i=0; i<=selectArray1.length-1; i++) {
		var selectOptions1 = selectArray1[i].getElementsByTagName('select');
		selectOptions1[0].selectedIndex = indexForSelect;
	}
	
	for (i=0; i<=selectArray2.length-1; i++) {
		var selectOptions2 = selectArray2[i].getElementsByTagName('select');
		selectOptions2[0].selectedIndex = indexForSelect;
	}
}


function lostFocusAllowance()
{
	
    var htmlBal1 = getElementsByClassName('points', document)[1].innerHTML;
    var tempStr1 =htmlBal1.split('$')[1];
    var beginBal1 = parseFloat(tempStr1.replace(/,/g,''));

	var allowBalHTML = getElementsByClassName('Set_Allowances', document)[0].innerHTML;
	var tempStr1=allowBalHTML.split('$')[1];
	var allowBal1 = parseFloat(tempStr1.replace(/,/g,''));	

	var endBalHTML = getElementsByClassName('Ending_Balance', document)[0].innerHTML;
	var tempStr1=endBalHTML.split('$')[1];
	var endBal1 = parseFloat(tempStr1.replace(/,/g,''));	

	
	var totalAllowances2=0;	
	var divAllow2 = document.getElementById('allowances');	
	var elem2 = divAllow2.getElementsByTagName('input');
	for (i=0; i<=elem2.length-1; i++) {
		if (elem2[i].type == 'text') {
			totalAllowances2 = totalAllowances2 + parseFloat(elem2[i].value);
		}
	}

	getElementsByClassName('Pending_Allowances', document)[0].getElementsByTagName('span')[0].innerHTML = '$' + addCommas(totalAllowances2-allowBal1);
	
	getElementsByClassName('Ending_Balance', document)[0].getElementsByTagName('span')[0].innerHTML = '$' + addCommas(beginBal1-totalAllowances2);
	
	//console.log(totalAllowances2 + ' ' + allowBal1);
}


function main() {

    getLevels();
    
    var totalAllowances=0;
    var divAllow = document.getElementById('allowances');
    var elem = divAllow.getElementsByTagName('input');
    for (i=0; i<=elem.length-1; i++) {
        if (elem[i].type == 'text') {
            totalAllowances = totalAllowances + parseFloat(elem[i].value);
        }
    }
    
	var frmAdjust = document.getElementsByTagName('form')[0];
	
    var elemBalance = getElementsByClassName('points', document)[1];
    var elemHTML = getElementsByClassName('points', document)[0];
    
    var htmlBal = elemBalance.innerHTML;
    var tempStr=htmlBal.split('$')[1];
    var beginBal = parseFloat(tempStr.replace(/,/g,''));
    
    var htmlBal1 = elemHTML.innerHTML;
    var tempStr1=htmlBal1.split('$')[1];
    var bankBal = parseFloat(tempStr1.replace(/,/g,''));
    
	var elemCashBoxes = document.createElement('div');
    elemCashBoxes.setAttribute('id', 'cashbox_container');
	elemCashBoxes.setAttribute('style', 'width: 100%; float: left;');
	
    var elemDeposit = document.createElement('div');
    elemDeposit.setAttribute('id', 'cash_box');
	elemDeposit.innerHTML = '<br><b>Amount Allowed to Add:</b>$' + addCommas(Math.floor((beginBal+bankBal)/2-beginBal)) + '<br/></br><br/>';
	elemDeposit.innerHTML = '<span class="points">$' + addCommas(Math.floor((beginBal+bankBal)/2-beginBal)) + '</span><br/><span class="label">Amount Allowed to Add</span><img src="/images/game/design/cash_box_right.jpg">'
    
    
    var elemAllowances = document.createElement('div');
    elemAllowances.setAttribute('id', 'cash_box');
    elemAllowances.setAttribute('class', 'Set_Allowances');
    elemAllowances.innerHTML = '<b>Currently Set Allowances:</b>$' + addCommas(totalAllowances);
	elemAllowances.innerHTML = '<span class="points">$' + addCommas(totalAllowances) + '</span><br/><span class="label">Currently Set Allowances</span><img src="/images/game/design/cash_box_right.jpg">'
    
    var elemPending = document.createElement('div');
    elemPending.setAttribute('class', 'Pending_Allowances');
    elemPending.setAttribute('id', 'cash_box');
    elemPending.innerHTML = '<b>Pending Unset Allowances:</b>$0';
	elemPending.innerHTML = '<span class="points">$0</span><br/><span class="label">Pending Unset Allowances</span><img src="/images/game/design/cash_box_right.jpg">'
    
    var elemEndBal = document.createElement('div');
    elemEndBal.setAttribute('id', 'cash_box');
    elemEndBal.setAttribute('class', 'Ending_Balance');
    elemEndBal.innerHTML = '<b>Estimated Ending Balance:</b>$' + addCommas(beginBal-totalAllowances);
	elemEndBal.innerHTML = '<span class="points">$' + addCommas(beginBal-totalAllowances) + '</span><br/><span class="label">Estimated Ending Balance</span><img src="/images/game/design/cash_box_right.jpg">'
    
	elemCashBoxes.appendChild(elemDeposit);
	elemCashBoxes.appendChild(elemAllowances);
	elemCashBoxes.appendChild(elemPending);
	elemCashBoxes.appendChild(elemEndBal);
	
	document.getElementById('content').insertBefore(elemCashBoxes, document.getElementById('cash_box').nextSibling.nextSibling.nextSibling);
    
	var divChanges = document.createElement('div');
	divChanges.setAttribute('style', 'width: 100%; float: left;');
	
    var divAllowances = document.createElement('div');
    var frmAllowances = document.createElement('form');
    var btnAllowances = document.createElement('input');
    btnAllowances.setAttribute('type', 'button');
    btnAllowances.setAttribute('value', 'Change All Allowances');
    btnAllowances.addEventListener('click', changeAllowances, false);;
    frmAllowances.innerHTML = '<br/><b>Change All Allowances (you must still click update button to save changes):</b><br/>$<input 	type="text" size="12" id="amtAdded"/>';
    frmAllowances.appendChild(btnAllowances);
	divAllowances.appendChild(frmAllowances);
    //document.getElementById('content').insertBefore(divAllowances, elemCashBoxes.nextSibling);
    
    var divSelect = document.createElement('div');
    var frmSelect = document.createElement('form');
    var btnSelect = document.createElement('input');
    btnSelect.setAttribute('type', 'button');
    btnSelect.setAttribute('value', 'Change All Types');
    btnSelect.addEventListener('click', changeTypes, false);
    frmSelect.innerHTML = '<br/><b>Change All Types (you must still click update button to save changes):</b><br/>';
    var selectArray1 = getElementsByClassName('alternating_color1', document.getElementById('allowances'));
    var selectArray2 = getElementsByClassName('alternating_color2', document.getElementById('allowances'));
    var selectOptions = selectArray1[0].getElementsByTagName('select');
    var clonedSelect = selectOptions[0].cloneNode(true);
    clonedSelect.name='allowance_type_cloned';
    frmSelect.appendChild(clonedSelect);
    frmSelect.appendChild(btnSelect);
	divSelect.appendChild(frmSelect);
    //document.getElementById('content').insertBefore(divSelect, divAllowances.nextSibling);
    
	var divEquip = document.createElement('div');
    var frmEquip = document.createElement('form');
    var btnEquip = document.createElement('input');
    btnEquip.setAttribute('type', 'button');
    btnEquip.setAttribute('value', 'Adjust Allowances Based on Levels for Checked Players');
    btnEquip.addEventListener('click', equipAllowancesChange, false);
    frmEquip.innerHTML = '<br/>';
    frmEquip.appendChild(btnEquip);
	divEquip.appendChild(frmEquip);
    //document.getElementById('content').insertBefore(divEquip, divSelect.nextSibling);
    
	divChanges.appendChild(divAllowances);
	divChanges.appendChild(divSelect);
	divChanges.appendChild(divEquip);
	divChanges.appendChild(frmAdjust);
	document.getElementById('content').insertBefore(divChanges, elemCashBoxes.nextSibling);
	
    document.getElementsByName('amount')[0].value = Math.floor((beginBal+bankBal)/2-beginBal);
    
    
    var textAllowance = selectArray1[0].getElementsByTagName('input');
    textAllowance[0].addEventListener('blur', lostFocusAllowance, false);
    
}

//Begin pabst's script
function getLevels() {
	var tbl = document.getElementById("allowances");
	var rows = tbl.getElementsByTagName("tr");

	for (var i=0; i<rows.length; i++) {
		var c = rows[i].cells[1];
		var lvl = rows[i].insertCell(1);
		lvl.innerHTML = "LVL";
	}
	
	//Not pabst's
	for (var i=0; i<rows.length; i++) {
		var c = rows[i].cells[2];
		var firstCell = rows[i].insertCell(2);
		var chkEquip = document.createElement('input');
		chkEquip.type='checkbox';
		if (i==0) {
            chkEquip.name='equipment_check_all';
            chkEquip.addEventListener('click', checkTheBoxes, false);
        }
        else {
            chkEquip.name='equipment_check';
        }
		firstCell.appendChild(chkEquip);
	}
	
    //Begin pabst's again
	var options = document.getElementsByTagName("option");
	for (var i=0; i<options.length; i++) {
		if (options[i].value == "player_first") {
			options[i].text = "Player first"
		}
		else if (options[i].value == "team_first") {
			options[i].text = "EQFund first"
		}
		else if (options[i].value == "team_emergency") {
			options[i].text = "EQFund only if short"
		}
	}

	var id = window.location.toString().slice(window.location.toString().indexOf("team_id=")+"team_id=".length);
	var addr = "http://goallineblitz.com/game/roster.pl?team_id="+id;
	getInetPage(addr, parsePlayerFromRoster,null);
}

function parsePlayerFromRoster(address, page) {
    //console.log("parsePlayerFromRoster("+address+")");
	var s = document.getElementById("storage:"+address);
	if (s == null) {
		var footer = document.getElementById("footer");
		var div = document.createElement("div");
		div.setAttribute("id","storage:"+address);
		div.setAttribute("style","visibility: hidden; display:none;");
		div.innerHTML = page.responseText;
		footer.appendChild(div);
	}

	
	var playerLinks = [];
	var s = document.getElementById("storage:"+address);
	var l = s.getElementsByClassName("player_name_short");
	//console.log("player_name's found="+l.length);
	for (var pidx=0; pidx<l.length; pidx++) {
		//console.log("pidx="+pidx);
		var p = l[pidx];
		if (p.parentNode == null) continue;
		
		var name = p.firstChild.innerHTML;
		var pos = p.parentNode.getElementsByClassName("player_position")[0].firstChild.innerHTML;
		var lvl = p.parentNode.getElementsByClassName("player_level")[0].innerHTML;
		//console.log("npl='"+name+"' | '"+pos+"' | '"+lvl);
		
		while (pos.length < 4) { pos += "&nbsp;"; }
		var html = "<span class=\"cpu\">"+pos+"</span>"+name;
		playerLinks.push([html,lvl]);
		
	}
	//console.log("loop end");
	addPositionsToTables(playerLinks);
}

function addPositionsToTables(players) {
	var selects = document.getElementsByTagName("select");
	var ptext = new Array();
	for (var i=0; i<players.length; i++) {
		ptext.push(players[i]);
	}
	
	//0 is team name
	for (var i=1; i<selects.length; i++) {
		var par = selects[i].parentNode.parentNode;
		
		var str = par.childNodes[1].innerHTML;
		if (str == null) continue;
		var idx1 = str.indexOf("/game/player.pl?player_id=");
		if (idx1 == -1) continue;
		str = str.slice(idx1);
		
		var idx2 = str.indexOf("\">");
		if (idx2 == -1) continue;
		str = str.slice(0,idx2);
		
		for (var p=0; p<ptext.length; p++) {
			if (ptext[p][0].indexOf(str) != -1) {
				par.childNodes[1].innerHTML = ptext[p][0];				
				par.childNodes[3].innerHTML = ptext[p][1];
				ptext.splice(p,1);
				break;
			}
		}
	}
	//console.log("loop end");
}

function getInetPage(address, func, target) {
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address,this);
		}
	};
	
	req.send(null); 
	return req;
}

function checkTheBoxes() {
    var elemCheckAll = document.getElementsByName('equipment_check_all');
    var trueCheck = elemCheckAll[0].checked;
    var elemCheckBoxes = document.getElementsByName('equipment_check');
    
    for (var i=0; i<elemCheckBoxes.length; i++) {
        elemCheckBoxes[i].checked=trueCheck;
    }
}

function equipAllowancesChange() {
    var tbl = document.getElementById("allowances");
	var rows = tbl.getElementsByTagName("tr");

	for (var i=1; i<rows.length; i++) {
		var b = rows[i].cells[1];
		var c = rows[i].cells[2];
		var d = rows[i].cells[3];
		var chkBoxEquip = c.getElementsByTagName('input')[0];
		var lvlPlayer = parseInt(b.innerHTML);
		var allowTxt = d.getElementsByTagName('input')[0];
		var modifier = 0;
		
      if (chkBoxEquip.checked) {	
		if (lvlPlayer < 7-modifier) {
            allowTxt.value = 500 * 4;
        }
        else if (lvlPlayer < 16-modifier) {
            allowTxt.value = 2500 * 4;
        }
        else if (lvlPlayer < 24-modifier) {
            allowTxt.value = 12500 * 4;
        }
        else if (lvlPlayer < 32-modifier) {
            allowTxt.value = 50000 *4;
        }
        else if (lvlPlayer < 40-modifier) {
            allowTxt.value = 200000 *4;
        }
        else if (lvlPlayer < 48-modifier) {
            allowTxt.value = 400000 *4;
        }
        else if (lvlPlayer < 56-modifier) {
            allowTxt.value = 600000 *4;
        }
	else if (lvlPlayer < 64-modifier) {
            allowTxt.value = 800000 *4;
        }
        else if (lvlPlayer < 70-modifier) {
            allowTxt.value = 1000000 *4;
        }
        else if (lvlPlayer < 76-modifier) {
            allowTxt.value = 1200000 *4;
        }
        else {
            allowTxt.value = 0;
        }
      }
	}
	
	lostFocusAllowance();
}