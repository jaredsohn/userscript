// ==UserScript==
// @name			BTA evo DATE TEST
// @version			1.0
// @namespace		http://site.com/BTA
// @description		Enchances evo game for the BTA :-)
// @include			http://ev5.neondragon.net/*
// @include			http://evo-dev.neondragon.net/*
// @author			Anubis(i only did some small edits, thank Pinky for the program)
// ==/UserScript==


// ***************************************************************************
// ** Global Variables
// ***************************************************************************

const scriptversion = '1.0';
const scriptversionID = '[BTA]evo+DATE TEST ' + scriptversion;
const scriptTag = 'Clear as Mudd';
GM_log(scriptversionID + " start");

// safegard
if(! unsafeWindow.evo_plus ) {
	alert("Improper installation. Please uninstall evo+ AND btaEvo+, then install:\n- evo+\n- btaEvo+\nIn that order.");
	return;
}

// page handlers
var pageHandlers = new Array();

var contents = null; // pointer to the 'content' node in the page

// imported vars
var units = unsafeWindow.evo_plus.units; // units :P
var pMetal = unsafeWindow.evo_plus.pMetal;
var pMineral = unsafeWindow.evo_plus.pMineral;
var pFood = unsafeWindow.evo_plus.pFood;
var pScore = unsafeWindow.evo_plus.pScore;
var eeb = Number(GM_getValue('eeb', 1)); // efficient breeding center ratio

// evo, devo?
var dEvo = /^http:\/\/evo-dev\./.test(document.location.href);

//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************

//
// BTA Alliance colour highlighting
//

regPageHandler(/^\/alliances\/(.*)\/members/i, evoAllianceMembers);
function evoAllianceMembers() {

	// Only on the BTA page
	var thisTag = unescape(window.location.href.match(/\/alliances\/(.*)\/members$/)[1]);
	
	if (thisTag == '{BTA}'){

// Define Scores here

	var yellow = 3500000;
	var orange = 5250000;
	var green = 1750000;
	var blue = 10000000
	var purple = 7500000;
	var red = 7000000;
	

	
	var memberTables = document.evaluate(".//div[@id='alliancememberlist']/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// if we have rank edit powers.. we need another snapshot
	if (memberTables.snapshotItem(0) == null){
		var memberTables = document.evaluate(".//div[@id='alliancememberlist']/form/div/table", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	var yel=0; var ora=0; var gre=0; var blu=0; var pur=0; var red2=0; var untagged=0;
	
	for (var i = 0; memberTable = memberTables.snapshotItem(i); i++) {
	
		for (var j = 1; j < memberTable.rows.length; j++){
		
		// If the person is not primary BTA, continue
		// green  = freshman
		// yellow = sophmore
		// orange = junior
		// senior = red
		var perTag = (memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/) != null) ? memberTable.rows[j].cells[0].textContent.match(/\[(.*)\]/)[1]: '';
		
			score = memberTable.rows[j].cells[2];		
			target = evoString2Number(score.textContent);
		
			if (perTag != thisTag ){ score.style.color = 'white'; untagged++; }
			else if( target < green ){score.style.color ='lightgreen'; gre++; }
			else if( target < yellow ){score.style.color = 'yellow'; yel++;}
			else if( target < orange ){score.style.color ='orange'; ora++; }
			else if( target < red ){score.style.color ='red'; red2++; }
			else if( target < purple ){score.style.color ='mediumpurple'; pur++; }
			else {score.style.color ='skyblue'; blu++; }
			memberTable.rows[j].cells[2].textContent = evoNumber2String(memberTable.rows[j].cells[2].textContent);
			
		}
		
	}

	// Show the info at the top
	// green  = freshman
	// yellow = sophmore
	// orange = junior
	// senior = red
	var div = document.evaluate(".//div[@id='alliancememberlist']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	var newstr = '<div class="separator title">You currently have <span style="color:lightgreen;">'+gre+'</span> Freshman,&nbsp;';
	newstr += '<span style="color:yellow;">'+yel+'</span> Sophmore,&nbsp;<span style="color:orange;">'+ora+'</span> Junior,&nbsp;';
	newstr += '</div><div class="separator title">';
	newstr += '<span style="color:red;">'+red2+'</span> Senior, <span style="color:mediumpurple;">'+pur+'</span> Students should be graduated,&nbsp;';
	newstr += 'and <span style="color:skyblue;">'+blu+'</span> Students need to leave BTA - Plus <span style="color:white;">'+untagged+'</span> Untagged Members</div>';
	div.innerHTML = newstr + '<br />' + div.innerHTML;
	// End If
	}

}



//
//
//
regPageHandler(null,  evoBTAGlobals);
function evoBTAGlobals() {

//
// Quick link to BTA Forums
//
var pan = document.getElementById('communicationContent');
pan.innerHTML=pan.innerHTML+'<ul><li><a href="http://154739.aceboard.net">Aux Forums</a></li></ul>';
var pan = document.getElementById('communicationContent');
pan.innerHTML=pan.innerHTML+'<ul><li><a href="http://bta.s2.bizhat.com/index.php?mforum=bta">NEW Aux Forums</a></li></ul>';	

}

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {
	var node;

	// Initialization
	// -----------------------------------------------------------------------
	// contents node
	contents = document.getElementById("content");

	// get out of the bloody forums message editor
	if( contents == null ) return;

	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
			pageHandlers[i].handler();
	}

	node = document.getElementById('evomagik');
	node.appendChild(document.createElement('br'));
	node.appendChild(document.createTextNode(scriptversionID));

	// fix a bug in evo with non existent adverts that prevent the use of the top panel 
	if(! (node = document.getElementById('advert')) ) {
		node = document.createElement('span');
		node.id = 'advert';
		contents.appendChild(node);
	}
}) ();

// ***************************************************************************
// ** Helper functions
// ***************************************************************************

function evoLayoutChanged() {
	alert('Oops.. Page layout was not recognized, Neon probably changed the page :(');
}

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;

	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	}
	else
		part1 = num;

	while( re.test(part1) )
		part1 = part1.replace(re, '$1,$2');

	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num) {
	return Number(num.replace(/,/g,''));
}

function evoFromatNumberZ(num, zeros) {
	var str = "0000" + Math.floor(Math.abs(num));
	return str.substr(-zeros);
}

// ***************************************************************************
// ** date
// ***************************************************************************

//
// Add some color to the scores on the universe pages
//
regPageHandler(/^\/(universe\/(home|search)|(\d+(,\d+)*))$/i,  evoUniverse);
function evoUniverse() {
	var smin = Math.ceil(pScore * 0.35);
	var tmax = Math.floor(pScore / 0.35);

	var table = document.getElementById('cont_list');
	if (table != null ) {
		
		var cell = table.rows[0].insertCell(2);
		cell.textContent = "Last On";

		cell = table.rows[1].insertCell(2);
		cell.textContent = "";
		
		for (var i=2; i < 5; i++) {
			table.rows[0].cells[i].style.textAlign = 'right';
		}
		
		// let's add some color and look for potential targets ;)
		for (var i=2; i < table.rows.length; i++) {
			if (table.rows[i].cells.length < 4) {
				continue;
			}
			
			var cell1 = table.rows[i].cells[1];
			var cell3 = table.rows[i].cells[3];
			var target = evoString2Number(cell3.innerHTML);
	
			var online = /Last Seen: (((\d+) days )?((\d+) hours )?)?(ago)?<br/.exec(cell1.innerHTML);
			var inAlliance = /\[(.*)]/.exec(cell1.innerHTML);
			
			cell = table.rows[i].insertCell(2);
			cell.textContent = "";
			cell.style.textAlign = 'right';
			
			if (online != null) {
				if (online[3] != null) {
					cell.textContent = online[3] + "d";
					cell.style.color = '#00FF00';
				}
				
				if (online[5] != null) {
					cell.textContent = cell.textContent + online[5] + "h";
				}
			} else {
				cell.textContent = "Now!";
				cell.style.color = '#CC4411';
			}

			if (target < smin) {
				cell3.style.color = '#CC4411';
			} else if (target > tmax) {
				cell3.style.color ='#0000FF';
			} else {
				cell3.style.color = '#00FF00';
			}

			if ((useSpotTargets > 0) && (!inAlliance) && ((target / 1000000) > useSpotTargets)) {
				table.rows[i].style.backgroundColor = '#AA00AA';
				cell3.style.color = '#FFFFFF';
			}
		}
		
		var git = document.evaluate(".//table[tbody/tr[1]/td[1][text() = 'Key']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if (git != null ) {
			var d = git.insertRow(4);
			d.className = "lightblue_bg_row2";
			d.innerHTML = '<td>Text colours:</td><td colspan="3" align="center"><font color="#FFFFFF">White</font> name of continent shows that this person is online<BR><font color="#C4C4C4">Gray</font> name of continent shows that this person is offline<BR><font color="#646464">Dark gray</font> name shows that person is offline from more than week</td>';
			var c = git.insertRow(5);
			c.className = "lightblue_bg_row1";
			c.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Player with that <font color="#CC4411">score</font> can attack you, but you can\'t<BR>Player with that <font color="#00FF00">score</font> can attack you, and you can also attack him<BR>Player with that <font color="#0000FF">score</font> can\'t attack you, but you can :D</td>';
		}
	}
}







// ***************************************************************************
// ** Objects
// ***************************************************************************

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

//
// ***************************************************************************
// ** MISC
// ***************************************************************************

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());
}

function evoGetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}




