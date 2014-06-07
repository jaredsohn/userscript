// ==UserScript==
// @name			Neopets - Food Club Automatic Food Adjustment Calculator
// @description		Automatically calculates food adjustments for pirates for the upcoming round of Food Club.
// @include			http://www.neopets.com/pirates/foodclub.phtml?type=current*
// @version			1.0.0
// @author			Grog
// ==/UserScript==

//Constants
var PIRATE_URL = new String("type=pirates&id=");
var FOOD_URL = new String("type=foods&id=");
var FOOD_CLUB_IMG_URL=new String("http://images.neopets.com/pirates/fc/");
var ELEM_ID_BANNER=new String("pushdown_banner");
var NUM_PIRATES=4;
var NUM_FOODS=10;

var FOOD_ATTRIBUTES=[	[0,'Salty Foods'],
						[1,'Meats'],
						[2,'Vegetables'],
						[3,'Gross Foods'],
						[4,'Neggs'],
						[5,'Breads (pastries, pancakes, etc.)'],
						[6,'Spicy Foods'],
						[7,'Fruits'],
						[8,'Candy'],
						[9,'Pizza'],
						[10,'Dairy'],
						[11,'Slushies'],
						[12,'Smoothies']
					];
var FOOD_IDS=[	[0,'Undefined',[]],
				[1,'Hotfish',[0,1]],
				[2,'Broccoli',[2]],
				[3,'Wiggling Grub',[3]],
				[4,'Joint of Ham',[1]],
				[5,'Rainbow Negg',[4]],
				[6,'Streaky Bacon',[1]],
				[7,'Ultimate Burger',[1]],
				[8,'Bacon Muffin',[1,5]],
				[9,'Hot Cakes',[5]],
				[10,'Spicy Wings',[1,6]],
				[11,'Apple Onion Rings',[3,7]],
				[12,'Sushi',[0,1]],
				[13,'Negg Stew',[4]],
				[14,'Ice Chocolate Cake',[8]],
				[15,'Strochal',[8]],
				[16,'Mallowicious Bar',[8]],
				[17,'Fungi Pizza',[3,9]],
				[18,'Broccoli and Cheese Pizza',[2,9,10]],
				[19,'Bubbling Blueberry Pizza',[7,9]],
				[20,'Grapity Slush',[11]],
				[21,'Rainborific Slushi',[11]],
				[22,'Tangy Tropic Slush',[11]],
				[23,'Blueberry Tomato Blend',[7,10,12]],
				[24,'Lemon Blitz',[7,10,12]],
				[25,'Fresh Seaweed Pie',[0,3]],
				[26,'Flaming Burnumup',[2,6]],
				[27,'Hot Tyrannian Pepper',[3,6]],
				[28,'Eye Candy',[3,8]],
				[29,'Cheese and Tomato Sub',[5,7,10]],
				[30,'Asparagus Pie',[2]],
				[31,'Wild Chocomato',[10,12]],
				[32,'Cinnamon Swirl',[5,8]],
				[33,'Anchovies',[0,1]],
				[34,'Flaming Fire Faerie Pizza',[2,6,9]],
				[35,'Orange Negg',[4]],
				[36,'Fish Negg',[4]],
				[37,'Super Lemon Grape Slush',[11]],
				[38,'Rasmelon',[10,11]],
				[39,'Mustard Ice Cream',[3,10]],
				[40,'Worm and Leech Pizza',[3,9]]
			];

var LEVEL_VERBOSITY_SILENT=0;				//Show no logging output
var LEVEL_VERBOSITY_INFO=1;					//Show minimal info about the round (food attributes, pirates and adjustments)
var LEVEL_VERBOSITY_WARNING=2;				//Show warnings (if no warning, this will be the same output as from LEVEL_VERBOSITY_INFO)
var LEVEL_VERBOSITY_DEBUG=4;				//Show debug output
var LEVEL_VERBOSITY_FULL=5;					//Show all output (there will be a lot)
			
//globals
var VERBOSITY_LEVEL=LEVEL_VERBOSITY_SILENT;
			
function writeout(message,level) {
	var newDiv=document.createElement('div');
	if(null===level || (isNaN(level))) {
		level=LEVEL_VERBOSITY_DEBUG;		//If no level given, assume it's DEBUG output
	}
	
	//Output all messages marked this level and lower
	if (VERBOSITY_LEVEL >=level) {
		newDiv.innerHTML=message + '\n';
		newDiv.style.textAlign='left';
		newDiv.style.backgroundColor='#FFFFFF';
		newDiv.style.fontcolor='#000000';
		newDiv.style.fontFamily='Monotype';
		var parent=document.getElementById(ELEM_ID_BANNER);
		 parent.insertBefore(newDiv,null);
	}
}
	
Array.prototype.find = function(searchStr) {
  var returnArray = [];
  var i;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) === 'function') {
      if (searchStr.test(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
}

Array.prototype.sortNum = function() {
   return this.sort( function (a,b) { return a-b; } );
}

function calculateFoodAdjustments() {

	writeout('Compiled!',LEVEL_VERBOSITY_DEBUG);

	var pirates=[];
	var foods=[];
	var foodAttribs=[];

	var bContinue=true;
	//parse anchors
	bContinue=parseAnchors(pirates,foods);
	
	if(true===bContinue){
		writeout('before generateFoodAttribs',LEVEL_VERBOSITY_FULL);
		bContinue=generateFoodAttribs(foods,foodAttribs);
		//writeout('Food Attributes: (' + foodAttribs + ')',LEVEL_VERBOSITY_INFO);
		writePrettyFoodAdjustments(foodAttribs);
		writeout('after generateFoodAttribs',LEVEL_VERBOSITY_FULL);
	}
	
	if(true===bContinue) {
		//if able to parse all ids, calculate food adjustments
		writeout('Calculating Pirate Food Adjustments...',LEVEL_VERBOSITY_INFO);
		var i;
		for(i=0;(i<pirates.length) && (true===bContinue);i++) {
			bContinue=calcAdjForPirate(pirates[i],foodAttribs);
		}
	
	}
	
	if(true===bContinue) {
		//if calculated successfully, add info to page
		writeout('before addToTable',LEVEL_VERBOSITY_FULL);
		addToTable(pirates,foods);
		writeout('after addToTable',LEVEL_VERBOSITY_FULL);
		//addDiv(pirates,foods);
	}
}

function calcAdjForPirate(pirate,foodAttribs) {
	var i;
	var bRet=true;
	var tempRay;
	writeout('<b>' + pirate.name + '</b>',LEVEL_VERBOSITY_INFO);
	
	writeout('starting pirate offset: <b>' + pirate.offset + '</b>');
	for(i=0;i<pirate.posAdjIDs.length;i++) {
		writeout('Increase offset for food type \'' + FOOD_ATTRIBUTES[pirate.posAdjIDs[i]][1] + '\'',LEVEL_VERBOSITY_FULL);
		tempRay = foodAttribs.find(parseInt(pirate.posAdjIDs[i], 10));
		writeout('&nbsp;&nbsp;' + tempRay,LEVEL_VERBOSITY_FULL);
		writeout('&nbsp;&nbsp;' + tempRay.length + ' match(es) for food type \'' + FOOD_ATTRIBUTES[pirate.posAdjIDs[i]][1] + '\'');
		pirate.offset += tempRay.length;
		writeout('current pirate offset: <b>' + pirate.offset + '</b>');
	}
	
	for(i=0;i<pirate.negAdjIDs.length;i++) {
		writeout('Decrease offset for food type \'' + FOOD_ATTRIBUTES[pirate.negAdjIDs[i]][1] + '\'',LEVEL_VERBOSITY_FULL);
		tempRay = foodAttribs.find(parseInt(pirate.negAdjIDs[i],10));
		writeout('&nbsp;&nbsp;' + tempRay,LEVEL_VERBOSITY_FULL);
		writeout('&nbsp;&nbsp;'+ tempRay.length + ' match(es) for food type \'' + FOOD_ATTRIBUTES[pirate.negAdjIDs[i]][1] + '\'');
		pirate.offset -= tempRay.length;
		writeout('current pirate offset: <b>' + pirate.offset + '</b>');
	}
	
	writeout('&nbsp;&nbsp;final pirate offset: <b>' + pirate.offset + '</b>',LEVEL_VERBOSITY_INFO);
	return bRet;
}

function generateFoodAttribs(foods,foodAttribs) {
	var i;
	var j;
	var tempFood;
	writeout('starting attribs: ' + foodAttribs,LEVEL_VERBOSITY_FULL);
	for(i=0;i<foods.length;i++) {
		tempFood=new Food(foods[i]);
		writeout('adding attribs from food \'' + tempFood.name +'\'');
		writeout('adding attribs to list: (' + tempFood.subIDs + ')',LEVEL_VERBOSITY_FULL);
		for(j=0;j<tempFood.subIDs.length;j++) {
			foodAttribs.push(tempFood.subIDs[j]);
		}
		writeout('added attribs. foodAttribs.length: ' + foodAttribs.length,LEVEL_VERBOSITY_FULL);
	}

	writeout('finished adding attribs. foodAttribs.length: ' + foodAttribs.length,LEVEL_VERBOSITY_FULL);
	
	for(i=0;i<foodAttribs.length;i++){
		foodAttribs[i]=parseInt(foodAttribs[i],10);
	}
	
	foodAttribs.sortNum();
	writeout('ending attribs: ' + foodAttribs,LEVEL_VERBOSITY_FULL);
	return true;
}

function getPirateInfo(pirateId) {
	var bFound=true;
	var pirateRet=null;
	var id=parseInt(pirateId,10);
	switch (id) {
	case 1:
		writeout('pirateID===1',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Scurvy Dan the Blade',87,[0,1],[8]);
		break;
	case 2:
		writeout('pirateID===2',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Young Sproggie',73,[1,4],[3]);
		break;
	case 3:
		writeout('pirateID===3',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Orvinn the First Mate',52,[8,9,11],[7]);
		break;
	case 4:
		writeout('pirateID===4',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Lucky McKyriggan',82,[3],[9]);
		break;
	case 5:
		writeout('pirateID===5',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Sir Edmund Ogletree',79,[10],[5]);
		break;
	case 6:
		writeout('pirateID===6',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Peg Leg Percival',73,[6],[12]);
		break;
	case 7:
		writeout('pirateID===7',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Bonnie Pip Culliford',76,[8,12],[6]);
		break;
	case 8:
		writeout('pirateID===8',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Puffo the Waister',68,[8,11,12],[1]);
		break;
	case 9:
		writeout('pirateID===9',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Stuff-A-Roo',59,[9],[4]);
		break;
	case 10:
		writeout('pirateID===10',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Squire Venable',61,[5],[7]);
		break;
	case 11:
		writeout('pirateID===11',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Captain Crossblades',66,[9,11],[0]);
		break;
	case 12:
		writeout('pirateID===12',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Ol\' Stripey',74,[1,11],[5]);
		break;
	case 13:
		writeout('pirateID===13',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Ned the Skipper',79,[1],[10]);
		break;
	case 14:
		writeout('pirateID===14',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Fairfax the Deckhand',71,[2,7],[0]);
		break;
	case 15:
		writeout('pirateID===15',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Gooblah the Grarrl',93,[1],[11]);
		break;
	case 16:
		writeout('pirateID===16',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Franchiso Corvallio',81,[1,6],[8]);
		break;
	case 17:
		writeout('pirateID===17',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Federismo Corvallio',81,[3,9],[12]);
		break;
	case 18:
		writeout('pirateID===18',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Admiral Blackbeard',76,[2,7],[10]);
		break;
	case 19:
		writeout('pirateID===19',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'Buck Cutlass',89,[8],[2]);
		break;
	case 20:
		writeout('pirateID===20',LEVEL_VERBOSITY_FULL);
		pirateRet=new Pirate(id,'The Tailhook Kid',81,[2],[4]);
		break;
	default:
		writeout('Unknown Pirate ID: \'' + id + '\'',LEVEL_VERBOSITY_WARNING);
		pirateRet=new Pirate(id);
		bFound=false;
		break;
	}
	
	if(true===bFound) {
		writeout('Pirate \''+ pirateRet.name + '\' created');
	}
	
	return pirateRet;
}

function addToTable(pirates,foods) {
	//find right table (find Food Club image and go to next sibling element)
	var imgs=document.getElementsByTagName('img');
	var bContinue=true;
	writeout('# images: ' + imgs.length,LEVEL_VERBOSITY_FULL);
	var i;
	for(i=0;(i<imgs.length) && (true===bContinue);i++) {
		var img=imgs[i];
		writeout('['+ i +']: ' + img.src,LEVEL_VERBOSITY_FULL);
		var src=img.src;
		
		if (-1 < src.lastIndexOf(FOOD_CLUB_IMG_URL)) {
			bContinue=false;
			var tbl=img.parentNode.nextSibling;
			if(typeof(tbl)==='undefined') {
				writeout('Main Table (Food Club Room) not found',LEVEL_VERBOSITY_WARNING);
			}
			var trPirates=tbl.firstChild.childNodes[2];
			if(typeof(trPirates)==='undefined') {
				writeout('Row with Pirates table not found',LEVEL_VERBOSITY_WARNING);
			}
			//get to table with pirate's names
			var tblPirates=trPirates.firstChild.firstChild.firstChild;
			if(typeof(tblPirates)==='undefined') {
				writeout('Pirates Table not found',LEVEL_VERBOSITY_WARNING);
			}
			
			//first pirate
			var tdPirate=tblPirates.childNodes[0].childNodes[0];
			tdPirate.innerHTML+='&nbsp;&nbsp;<span style="font-weight:bold;">('+ writePrettyPirateOffset(pirates[0]) +')</span>';
			
			//second pirate
			tdPirate=tblPirates.childNodes[0].childNodes[1];
			tdPirate.innerHTML+='&nbsp;&nbsp;<span style="font-weight:bold;">('+ writePrettyPirateOffset(pirates[1]) +')</span>';
			
			//third pirate
			tdPirate=tblPirates.childNodes[2].childNodes[0];
			tdPirate.innerHTML+='&nbsp;&nbsp;<span style="font-weight:bold;">('+ writePrettyPirateOffset(pirates[2]) +')</span>';
			
			//fourth pirate
			tdPirate=tblPirates.childNodes[2].childNodes[1];
			tdPirate.innerHTML+='&nbsp;&nbsp;<span style="font-weight:bold;">('+ writePrettyPirateOffset(pirates[3]) +')</span>';
			
			//Add notification stuff
			tdPirate=tblPirates.childNodes[4].childNodes[0];
			//tdPirate.innerHTML='<td colspan="2" style="border-style:solid;border-width:thin thick;border-color:#000000;font-style:italic;background-color: '+ getDropdownMenuBgColor('#FFFFFF') +';text-align:right;" width="500px">Food adjustments calculated automatically.<br />Isn\'t JavaScript great?</td>'
			tdPirate.innerHTML='<td colspan="2" width="500px"><p style="border-style:solid;border-width:thin thick;border-color:#000000;font-style:italic;background-color: '+ getDropdownMenuBgColor('#FFFFFF') +';text-align:right;">Food adjustments calculated automatically.<br />Isn\'t JavaScript great?</p></td>'
		}
	}
}

//Deprecated - use addToTable
//Left for reference purposes
function addDiv(pirates,foods) {
	var newDiv=document.createElement('div');
	var strHTML='';

	newDiv.className='DynamicDiv';
	var newBgColor = new String(getDropdownMenuBgColor('#FFFFFF'));
	newDiv.style.backgroundColor=newBgColor;
	newDiv.style.width='50%';
	newDiv.style.marginLeft='auto';
	newDiv.style.marginRight='auto';
	newDiv.style.borderStyle='solid';
	newDiv.style.borderWidth="thin thick";

	strHTML+='<table style="background-color: ' + newBgColor + ';width:100%;" border=0px>';
	var i;
	for(i=0;i<pirates.length;i++) {
		strHTML+=PirateWriteOut(pirates[i]);
	}
	strHTML+='<tr><td style="font-style:italic;text-align:right;background-color: '+ newBgColor +';" colspan=2>Food adjustments calculated automatically.<br />Isn\'t JavaScript great?</td></tr>';
	strHTML+='</table>';

	newDiv.innerHTML=strHTML;
	
	var parent=document.getElementById('main');
	var child=document.getElementById('content');
	parent.insertBefore(newDiv,child);
}


function getDropdownMenuBgColor(defaultBg) {
	writeout('enter getDropdownMenuBgColor',LEVEL_VERBOSITY_FULL);
	var bContinue=true;
	var bgColorRet=defaultBg;
	var dropdownMenus=document.getElementsByTagName('ul');
	var i;
	for (i=0; i<dropdownMenus.length && (true===bContinue);i++) {
		if ('dropdown'===dropdownMenus[i].className) {
			bgColorRet=new String(window.getComputedStyle(dropdownMenus[i], null).getPropertyValue('background-color'));
			bgColorRet='#' + colorToHex(bgColorRet);
			bContinue=false;
		}
	}
	return bgColorRet;
}

function colorToHex(color) {
	writeout('enter colorToHex',LEVEL_VERBOSITY_FULL);
    if (color.substr(0, 1) === '#') {
        return color;
    }
	
	color=color.replace(/ /g,'');
	color=color.replace(/,/g,';');
	var start=color.indexOf('(');
	var end=color.lastIndexOf(')');
	start+=1;
	writeout(color.substring(start,end),LEVEL_VERBOSITY_FULL);
	var colors=color.substring(start,end).split(';');
	var ret='';
	var i;
	for (i=0;i<colors.length;i++) {
		writeout(colors[i] + ', ' + parseInt(colors[i],10).toString(16),LEVEL_VERBOSITY_FULL);
		ret+=parseInt(colors[i],10).toString(16);
	}
	writeout(ret,LEVEL_VERBOSITY_FULL);
	return ret.toUpperCase();
}

function Pirate(id,name,strength,posAdjIDs,negAdjIDs) {
	writeout('enter Pirate constructor',LEVEL_VERBOSITY_FULL);
	this.offset=0;
	
	if(null !== id) {
		this.id=id;
	}
	else {
		this.id=-1;
	}
	
	if(null !== name) {
		this.name=name;
	}
	else {
		this.name='';
	}
	
	if (null !== strength) {
		this.strength=strength;
	}
	else {
		this.strength=-1;
	}
	
	if (typeof posAdjIDs !== 'undefined') {
		//todo: test for array
		this.posAdjIDs=posAdjIDs.slice(0);
	}
	else {
		this.posAdjIDs=[];
	}
	
	if (typeof negAdjIDs !== 'undefined') {
		//todo: test for array
		this.negAdjIDs=negAdjIDs.slice(0);
	}
	else {
		this.negAdjIDs=[];
	}
}

function Food(id) {
	if (null !== id) {
		writeout('enter Food constructor; id=' + id,LEVEL_VERBOSITY_FULL);
		this.id=id;
		this.name=FOOD_IDS[id][1];
		this.subIDs=FOOD_IDS[id][2];
	}
	else {
		writeout('enter Food constructor; id=NULL',LEVEL_VERBOSITY_FULL);
		this.id=-1;
		this.name='';
		this.subIDs=[];
	}

}

function writePrettyFoodAdjustments(attribs) {
	var i;
	var j=1;
	var last=attribs[0];
	var strOut='';
	writeout('# Food Attributes: ' + attribs.length,LEVEL_VERBOSITY_INFO);
	for(i=1;i<attribs.length;i++) {
		if (last!==attribs[i]) {
			//print out multiplier
			strOut='&nbsp;&nbsp;' + FOOD_ATTRIBUTES[last][1] + ' x'+ j;
			writeout(strOut,LEVEL_VERBOSITY_INFO);
			
			//reset for next attrib
			j=1;
			last=attribs[i];
		}
		else {
			j+=1;
		}
	}
	
	if (last!==attribs[i]) {
			//print out multiplier
			strOut='&nbsp;&nbsp;' + FOOD_ATTRIBUTES[last][1] + ' x'+ j;
			writeout(strOut,LEVEL_VERBOSITY_INFO);
	}
	else {
		//print out multiplier (only x1 though)
		strOut='&nbsp;&nbsp;' + FOOD_ATTRIBUTES[last][1] + ' x1';
		writeout(strOut,LEVEL_VERBOSITY_INFO);
	}
}

//Add a plus sign for positive adjustments (negative adjustments already have a minus sign prefixed)
function writePrettyPirateOffset(p) {
	var strRet='';
	if (null !== p) {
		if (0 < p.offset) {
			strRet+='+';
		}
		strRet+=p.offset;
	}
	return strRet;
}

function PirateWriteOut(p) {
	var strRet='';
	if (null !== p)
	{
		strRet='<tr><td>' + p.name + '</td><td style="text-align:right;font-weight:bold;">';
		strRet+=writePrettyPirateOffset(p);
		strRet+= '</td></tr>';
	}
	return strRet;
}

function parseAnchors(pirates,foods) {
	writeout('enter parseAnchors',LEVEL_VERBOSITY_FULL);
	var anchors=document.getElementsByTagName('a');
	writeout('# anchors: ' + anchors.length,LEVEL_VERBOSITY_FULL);
	var i;
	for(i=0;i<anchors.length;i++) {
		var a=anchors[i];
		var href=a.href;
		writeout('anchor[i].href: ' + href,LEVEL_VERBOSITY_FULL);

		var pOffset = href.indexOf(PIRATE_URL);
		var fOffset = href.indexOf(FOOD_URL);

		var id='';
		if(-1 < pOffset) {
			pOffset=pOffset + PIRATE_URL.length;
			writeout('Pirate ID detected');
			writeout('pOffset=' + pOffset,LEVEL_VERBOSITY_FULL);
			id=href.substring(pOffset);
			if (isNaN(id)) {
				writeout('Unable to parse Pirate id \'' + id + '\'',LEVEL_VERBOSITY_WARNING);
			}
			else {
				writeout('Pirate Found! Pirate ID: ' + id,LEVEL_VERBOSITY_FULL);
				var tempPirate=getPirateInfo(id);
				pirates.push(tempPirate);
			}
		}
		else if(-1 < fOffset) {
			fOffset=fOffset + FOOD_URL.length;
			writeout('Food ID detected');
			writeout('fOffset=' + fOffset,LEVEL_VERBOSITY_FULL);
			id=href.substring(fOffset);
			if (isNaN(id)) {
				writeout('Unable to parse id \'' + id + '\'',LEVEL_VERBOSITY_WARNING);
			}
			else {
				writeout('Food Found \'' + FOOD_IDS[id][1] + '\'');
				foods.push(id);
			}
		}

	}
	
	return ((NUM_PIRATES === pirates.length) && (NUM_FOODS === foods.length));
}

calculateFoodAdjustments();