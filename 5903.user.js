// ==UserScript==
// @name			BTA evo++++
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
const scriptversionID = '[BTA]evo+ ' + scriptversion;
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

//

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

