// ==UserScript==
// @name           Auto Train
// @namespace      CourtRivals
// @description    Auto Trains each Player at a specific value for a specific item
// @include        http://www.courtrivals.com/maingame.php
// ==/UserScript==
// 
// 

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
var trainingoptions = document.getElementById('frmMode');
var trainarr = new Array();
var traincost = new Array();
for (var trainloop = 0; trainloop < trainingoptions.length; trainloop++) {
	trainarr.push(trainingoptions.options[trainloop].text);
	traincost.push(trainingoptions.options[trainloop].value);
}
var doctables = document.getElementsByTagName('table');
var table1cells = doctables[1].innerHTML.split('<td');
var trainavail = parseInt(table1cells[9].substring(table1cells[9].indexOf('<b>') + 3,table1cells[9].indexOf('</b>')));
var table6cells = doctables[6].innerHTML.split('<span onmouseover=');
var trainitems = new Array();
for (var i=1; i < table6cells.length;i++) {
	trainitems.push(table6cells[i].substring(table6cells[i].indexOf('>',table6cells[i].indexOf('</span>') - 30) + 1, table6cells[i].indexOf('</span>')));
}
var curplayerid = table1cells[4].substring(table1cells[4].indexOf('<a href="showPlayerProfile.php?pid=') + 35,table1cells[4].indexOf('"><b>'));
/*
var playerlist = document.getElementById('frmPlayerId');
var curplayerid = parseInt(playerlist.options[playerlist.selectedIndex].value);
var playerarr = new Array();
if (playerlist.options[playerlist.selectedIndex + 1].value ==0) {
	var nextplayerid = playerlist.options[0].value;
}else{
	var nextplayerid = playerlist.options[playerlist.selectedIndex + 1].value;
};
*/
var cookieinfo = readCookie(curplayerid);
if(cookieinfo!=null) {
	var cookieitem = cookieinfo.split('-');
} else {
	var cookieitem = new Array();
}
var tableaddstring =''
tableaddstring = '<tr><td></td><td><table width="720" border="0" cellpadding="5" cellspacing="3" background="../images/wood-header-bg.jpg" bgcolor="#000000"><tr><td width="50" bgcolor="#FAF7EB"><div align="center"><span class="style1">'
if (cookieitem[0] == 1) {
    tableaddstring += '<INPUT TYPE=CHECKBOX NAME="autotrain" ID="autotrain" checked>Auto-train</span></div></td><td width="50" bgcolor="#FAF7EB"><div align="center"><span class="style1">Training Item: <select name="seltrainitem" id="seltrainitem">';
}else{
	tableaddstring += '<INPUT TYPE=CHECKBOX NAME="autotrain" ID="autotrain">Auto-train</span></div></td><td width="50" bgcolor="#FAF7EB"><div align="center"><span class="style1">Training Item: <select name="seltrainitem" id="seltrainitem">';
}
for (var f=0;f < trainitems.length;f++) {
	if (trainitems[f] == cookieitem[1]) {
		tableaddstring += '<option value="' + trainitems[f] + '" selected="selected">' + trainitems[f] + '</option>';
	}else{
		tableaddstring += '<option value="' + trainitems[f] + '">' + trainitems[f] + '</option>';
	}

}
tableaddstring += '</select></span></div></td><td width="50" bgcolor="#FAF7EB"><div align="center"><span class="style1">Intensity: <select name="seltrainrate" id="seltrainrate">'
for (var f=0;f<trainarr.length;f++) {
	if (traincost[f] == cookieitem[2]) {
		tableaddstring += '<option value="' + traincost[f] + '" selected="selected">' + trainarr[f] + '</option>';
	}else{
		tableaddstring += '<option value="' + traincost[f] + '">' + trainarr[f] + '</option>';
	}
}
tableaddstring += '</select></span></div></td></tr></table></td></tr>'; 
doctables[1].innerHTML += tableaddstring;
var checkauto = document.getElementById('autotrain');
var selectitem = document.getElementById('seltrainitem');
var selectrate = document.getElementById('seltrainrate');
checkauto.setAttribute("onchange", "var date = new Date();date.setTime(date.getTime()+(40*24*60*60*1000));var expires = '; expires='+date.toGMTString();if(document.getElementById('autotrain').checked){document.cookie = '" + curplayerid + "=1-'+document.getElementById('seltrainitem').value+'-'+document.getElementById('seltrainrate').value+expires+'; path=/';}else{document.cookie = '" + curplayerid + "=0-'+document.getElementById('seltrainitem').value+'-'+document.getElementById('seltrainrate').value+expires+'; path=/';};window.location.reload();");
selectitem.setAttribute("onchange", "var date = new Date();date.setTime(date.getTime()+(40*24*60*60*1000));var expires = '; expires='+date.toGMTString();if(document.getElementById('autotrain').checked){document.cookie = '" + curplayerid + "=1-'+document.getElementById('seltrainitem').value+'-'+document.getElementById('seltrainrate').value+expires+'; path=/';}else{document.cookie = '" + curplayerid + "=0-'+document.getElementById('seltrainitem').value+'-'+document.getElementById('seltrainrate').value+expires+'; path=/';};window.location.reload();");
selectrate.setAttribute("onchange", "var date = new Date();date.setTime(date.getTime()+(40*24*60*60*1000));var expires = '; expires='+date.toGMTString();if(document.getElementById('autotrain').checked){document.cookie = '" + curplayerid + "=1-'+document.getElementById('seltrainitem').value+'-'+document.getElementById('seltrainrate').value+expires+'; path=/';}else{document.cookie = '" + curplayerid + "=0-'+document.getElementById('seltrainitem').value+'-'+document.getElementById('seltrainrate').value+expires+'; path=/';};window.location.reload();");
window.setTimeout( function(){
	// var changeplayer=1;
	if(checkauto.checked) {
		if (trainavail > 0) {
			var usedrows = doctables[6].innerHTML.split('<tr>');
			if(usedrows.length < 5){
				if (selectrate.options[selectrate.selectedIndex].text.substring(selectrate.options[selectrate.selectedIndex].text.indexOf('(')+1,selectrate.options[selectrate.selectedIndex].text.indexOf('TC') - 1) <= trainavail){
					//changeplayer = 0;
					var trainlink ='';
					var trainswitch = selectitem.value.substring(1);
                    switch(trainswitch) {
					case 'Speed':
						trainlink = 'Speed';
						break;
					case 'Endurance':
						trainlink = 'Endurance';
						break;
					case 'Ball Handling':
						trainlink = 'BallHandling';
						break;
					case 'Passing':
						trainlink = 'Passing';
						break;
					case 'Shooting':
						trainlink = 'Shooting';
						break;
					case '3 Point Shooting':
						trainlink = '3PointShooting';
						break;
					case 'Free Throw Shooting':
						trainlink = 'FreeThrows';
						break;
					case 'Dunking':
						trainlink = 'Dunking';
						break;
					case 'Rebounding':
						trainlink = 'Rebounding';
						break;
					case 'Blocking':
						trainlink = 'Blocking';
						break;
					case 'Defense':
						trainlink = 'Defense';
						break;
					case 'Leadership':
						trainlink = 'Leadership';
						break;
					default:
						trainlink = 'Jason';
						break;
					};
					var linkstring = '';
					var ratestring = selectrate.value
					
					switch(ratestring) {
					case 'reg':
						linkstring = 'http://www.courtrivals.com/processing/train.php?s=' + trainlink;
						break;
					case 'half':
						linkstring = 'http://www.courtrivals.com/processing/train.php?m='+ratestring+'&s=' + trainlink;
						break;
					case 'quarter':
						linkstring = 'http://www.courtrivals.com/processing/train.php?m='+ratestring+'&s=' + trainlink;
						break;
					};
					if (ratestring == 'reg') {
						linkstring = 'http://www.courtrivals.com/processing/train.php?s=' + trainlink;
					};
					window.location=linkstring;
				} else if (selectrate.options[selectrate.selectedIndex - 1].text.substring(selectrate.options[selectrate.selectedIndex -1 ].text.indexOf('(')+1,selectrate.options[selectrate.selectedIndex -1].text.indexOf('TC') - 1) <= trainavail){
					//changeplayer = 0;
					var trainlink ='';
					var trainswitch = selectitem.value.substring(1);
                    switch(trainswitch) {
					case 'Speed':
						trainlink = 'Speed';
						break;
					case 'Endurance':
						trainlink = 'Endurance';
						break;
					case 'Ball Handling':
						trainlink = 'BallHandling';
						break;
					case 'Passing':
						trainlink = 'Passing';
						break;
					case 'Shooting':
						trainlink = 'Shooting';
						break;
					case '3 Point Shooting':
						trainlink = '3PointShooting';
						break;
					case 'Free Throw Shooting':
						trainlink = 'FreeThrows';
						break;
					case 'Dunking':
						trainlink = 'Dunking';
						break;
					case 'Rebounding':
						trainlink = 'Rebounding';
						break;
					case 'Blocking':
						trainlink = 'Blocking';
						break;
					case 'Defense':
						trainlink = 'Defense';
						break;
					case 'Leadership':
						trainlink = 'Leadership';
						break;
					default:
						trainlink = 'Jason';
						break;
					};
					var linkstring = '';
					var ratestring = selectrate.options[selectrate.selectedIndex - 1].value;
					switch(ratestring) {
					case 'reg':
						linkstring = 'http://www.courtrivals.com/processing/train.php?s=' + trainlink;
						break;
					case 'half':
						linkstring = 'http://www.courtrivals.com/processing/train.php?m='+ratestring+'&s=' + trainlink;
						break;
					case 'quarter':
						linkstring = 'http://www.courtrivals.com/processing/train.php?m='+ratestring+'&s=' + trainlink;
						break;
					};
					if (ratestring == 'reg') {
						linkstring = 'http://www.courtrivals.com/processing/train.php?s=' + trainlink;
					};
					window.location=linkstring;
				} else if (selectrate.options[selectrate.selectedIndex - 2].text.substring(selectrate.options[selectrate.selectedIndex - 2].text.indexOf('(')+1,selectrate.options[selectrate.selectedIndex - 2].text.indexOf('TC') - 1) <= trainavail){
					//changeplayer = 0;
					var trainlink ='';
					var trainswitch = selectitem.value.substring(1);
                    switch(trainswitch) {
					case 'Speed':
						trainlink = 'Speed';
						break;
					case 'Endurance':
						trainlink = 'Endurance';
						break;
					case 'Ball Handling':
						trainlink = 'BallHandling';
						break;
					case 'Passing':
						trainlink = 'Passing';
						break;
					case 'Shooting':
						trainlink = 'Shooting';
						break;
					case '3 Point Shooting':
						trainlink = '3PointShooting';
						break;
					case 'Free Throw Shooting':
						trainlink = 'FreeThrows';
						break;
					case 'Dunking':
						trainlink = 'Dunking';
						break;
					case 'Rebounding':
						trainlink = 'Rebounding';
						break;
					case 'Blocking':
						trainlink = 'Blocking';
						break;
					case 'Defense':
						trainlink = 'Defense';
						break;
					case 'Leadership':
						trainlink = 'Leadership';
						break;
					default:
						trainlink = 'Jason';
						break;
					};
					var linkstring = '';
					var ratestring = selectrate.options[selectrate.selectedIndex - 2].value;
					switch(ratestring) {
					case 'reg':
						linkstring = 'http://www.courtrivals.com/processing/train.php?s=' + trainlink;
						break;
					case 'half':
						linkstring = 'http://www.courtrivals.com/processing/train.php?m='+ratestring+'&s=' + trainlink;
						break;
					case 'quarter':
						linkstring = 'http://www.courtrivals.com/processing/train.php?m='+ratestring+'&s=' + trainlink;
						break;
					};
					if (ratestring == 'reg') {
						linkstring = 'http://www.courtrivals.com/processing/train.php?s=' + trainlink;
					};
					window.location=linkstring;
				};
			};
			
		};
	};
	/*
	if (changeplayer == 1) {
		//switch to next player
        window.location = 'http://www.courtrivals.com/processing/playerSwitch.php?pid=' + nextplayerid;
	};
	*/
},180000)
