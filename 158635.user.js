// ==UserScript==
// @name        Authorities Import
// @namespace   gunderjtAI
// @description Imports MARC records from LOC into Koha authority records
// @include     http://hazcatadmin.colorado.edu/cgi-bin/koha/authorities/authorities.pl*
// @grant       none
// @version     2.1
// ==/UserScript==


function createE(elemente, attributes){
	var node = document.createElement(elemente);
	attributesSize = attributes.length;
	for(i=0; i< attributesSize; i+=2){
		node.setAttribute(attributes[i], attributes[i+1]);
	}	
	return node;
}

function blurAnd008(entry){
	//Get the child attribute for id 'subfield008@'
    var randTag = getRandomTagNum("008");
    var subFieldRandId = getSubFieldRandId("008", "00", randTag)
    var subFieldField = "subfield" + "008" + "00" + subFieldRandId;
	entry = entry.replace(/\s+/g, ' ');
	$('#' + subFieldField).children("input").val(entry.slice(4));

	var fSubs = ["000", "003", "005"];
	
	for(var i = 0; i < fSubs.length; i++){
		randTag = getRandomTagNum(fSubs[i]);
		subFieldRandId = getSubFieldRandId(fSubs[i], "00", randTag);
		var subFieldField = "subfield" + fSubs[i] + "00" + subFieldRandId;
		$('#' + subFieldField).children("input").trigger("focus");
	}
}

function handleEntry(){
	var str = document.getElementById("autText").value;
	var entries = str.split("\n");
	entries.sort(compareTag);
	while (entries[0] == ""){
		entries.splice(0,1);
	}
	entrySize = entries.length;
	
        for(var i = 0; i < entrySize; i++){
		if (entries[i].slice(0,3) == "008"){
			blurAnd008(entries[i]);
			entries.splice(i,1);
			entrySize--;
			break;
		}
	}

	var start = entries[0].slice(0,3);
	var sameTag = new Array();

	for(var i = 0; i < entrySize; i++){
		if(start[0] != "9"){
			if(start == (entries[i].slice(0,3))){
				sameTag.push(singleMarc(entries[i]));
				if((i+1) == entrySize){
					//last in the group; process this
					cloneEnter(sameTag, sameTag.length, sameTag[0].field);
				}
			}
			else{
				cloneEnter(sameTag, sameTag.length, sameTag[0].field);
				sameTag.length = 0;
				start = entries[i].slice(0,3);
				sameTag.push(singleMarc(entries[i]));
                                if((i+1) == entrySize){
					//last in the group; process this
					cloneEnter(sameTag, sameTag.length, sameTag[0].field);
				}
			}
		}
		else{
			start = entries[i].slice(0,3);
		}
	}	
}

function compareTag(a, b){
	
	var a1 = a.slice(0,3);
	var b1 = b.slice(0,3);
	
	if (a1 < b1) return -1;
  	if (a1 > b1) return 1;
  	return 0;
}

function compareSub(a, b){
	var a1 = a.slice(0,1);
	var b1 = b.slice(0,1);
	
	if (a1 < b1) return -1;
  	if (a1 > b1) return 1;
  	return 0;
}

function singleMarc(entry){
	var separate = entry.split("|");
	var tandb = separate[0];
	separate.splice(0,1);
	separate.sort(compareSub);
	var o = new Object();
	//get the three digit Marc Number and the box control fields
	tandb = tandb.replace(/\s+/g, '');
	o.field = tandb.slice(0,3);
	o.boxOne = tandb[3];
	o.boxTwo = tandb[4];
	
	// separate the subfields from their information and store the respective info in respective arrays
	o.subId = new Array();
	o.subInfo = new Array();
	o.subNum = new Object();
	o.subNum.sub = new Array();
	o.subNum.num = new Array();
	var numOfSub = 0;
	var start = separate[0][0];
	if(separate.length){
		for (var i = 0; i < separate.length; i++){
			separate[i] = separate[i].replace(/\s+/g, ' ');
			if((separate[i][0]) == start){
				o.subId.push(separate[i][0]);
				o.subInfo.push(separate[i].slice(2));
				numOfSub++;
			}
			else{
				o.subNum.sub.push(start);
				o.subNum.num.push(numOfSub);
				numOfSub = 0;
				start = separate[i][0];
				o.subId.push(separate[i][0]);
				o.subInfo.push(separate[i].slice(2));
				numOfSub++;
			}
		}
	}
	o.subNum.sub.push(start);
	o.subNum.num.push(numOfSub);
	return o;
}

function maxNumSub(marcSame, length){
	//The Koha's set up is stupid.  So before we start cloning fields we have to clone the max number of subfields for that entry.
	//The return on this is an object with two arrays the subfield in one and the max number of cloned fields in the next.
	//marcSame is the array of individual mark record objects with the same tag
	//length is the number of indexes in marcSame
	
	var maxInfo = new Object();
	maxInfo.maxSubs = new Array();
	maxInfo.maxNum = new Array();
	var subInfoLength;
	var index;
	for (var i = 0; i < length; i++){
		subInfoLength = marcSame[i].subNum.sub.length;
		for(var j = 0; j < subInfoLength; j++){
			index = maxInfo.maxSubs.indexOf(marcSame[i].subNum.sub[j]);
			if(index < 0){
				maxInfo.maxSubs.push(marcSame[i].subNum.sub[j]);
				maxInfo.maxNum.push(marcSame[i].subNum.num[j])
			}
			else{
				if(maxInfo.maxNum[index] < marcSame[i].subNum.num[j]){
					maxInfo.maxNum[index] = marcSame[i].subNum.num[j];
				}
			}
		}
	}
	return maxInfo;
	
}

function cloneEnter(marcSame, length, tagNum){
	//marcSame is an array of individual mark record objects with the same tag
	//tagNum is a string with the 3 digit mark tag number
	//length is the number of entries in input
	
	//Because Koha authority enter is dumb beyond all reasoning: You have to clone the max number of subfields you will need before you clone the actual
	//fields.  Thanks, Koha!
	//Clones the subfields
	maxInfo = maxNumSub(marcSame, length);
	maxInfoSize = maxInfo.maxSubs.length;
	var i;
	var j;
	var k;
	var subFields = new Array(); 

	var randTag = getRandomTagNum(tagNum);  //tagNum must be a string
	if (randTag == null){
		alert("The tag \"" + tagNum + "\" is not in this form.  Please make sure you are on the correct authority form.");
		return 1;
	}
	var cloneCmd = "tag_" + tagNum + "_" + randTag;

	for(i = 0; i < maxInfoSize; i++){
		if (maxInfo.maxNum[i] > 1){
			for(j = 1; j < maxInfo.maxNum[i]; j++){
				//NEW FUNCTION GET RAND ID NUMBER
				//maxInfo.maxSubs[i] = subfieldId (ie "a" "8"); 
				subFieldRandId = getSubFieldRandId(tagNum, maxInfo.maxSubs[i], randTag);
				
				subCommand = "subfield" + tagNum + maxInfo.maxSubs[i] + subFieldRandId;
				
				unsafeWindow.CloneSubfield(subCommand);
				
			}
		}
	}
	//All subfields needed should be cloned.  
	//Time to clone the number of fields
	//Clone the number of fields

	for(i = 1; i < length; i++){
		unsafeWindow.CloneField(cloneCmd);	
	}
	if(length > 1){
		var clonedTags = getClonedTags(randTag, tagNum, length);
	}
	//At this time all relevant fields should be cloned, clonedTags has the cloned tags
	var expandCmd;
	for(i = 0; i < length; i++){
		if (i == 0){
			enterInfo(marcSame[i], randTag, "");
			if ($('#autExpand').is(':checked')){
				expandCmd = "tag_" + tagNum + "_" + randTag;
				unsafeWindow.ExpandField(expandCmd);
			}
		}
		else{
			enterInfo(marcSame[i], randTag, clonedTags[i-1]);
			if ($('#autExpand').is(':checked')){
				expandCmd = "tag_" + tagNum + "_" + randTag + clonedTags[i-1];
				unsafeWindow.ExpandField(expandCmd);
			}
		}
	}
	
}

function getSubFieldRandId(tagNum, subField, randTag){
	var patt_str = "id\\=\\\"subfield" + tagNum + subField + "(\\d{1,6})\\\"";
    var re = new RegExp(patt_str);
    var element_id = "tag_" + tagNum + "_" + randTag;
    var htmlText = document.getElementById(element_id).innerHTML;
    if(htmlText == null){
    	return null;
    }
    var matchTag = htmlText.match(re);
    if(matchTag == null){
    	return null;
    }
    return matchTag[1];
	
}

function getClonedTags(randTag, tagNum, length){
	//<div id="tag_035_454546"
	var divId = "tag_" + tagNum + "_" + randTag;
	var dividlength = divId.length;
	var current = $('#' + divId);
	var ids = new Array();
	var indId;
	for(var i = 1; i < length; i++){
		current = current.next();
		indId = current.attr('id');
		indId = indId.slice(dividlength);
		ids.push(indId);
	}
	return ids;
}


function getRandomTagNum(num) {
    var patt_str = "id\\=\\\"tag_" + num + "_(\\d{1,6})\\\"";
    var re = new RegExp(patt_str);
    var element_id = "tab" + num[0] + "XX";
    var htmlText = document.getElementById(element_id).innerHTML;
    if(htmlText == null){
    	return null;
    }
    var matchTag = htmlText.match(re);
    if(matchTag == null){
    	return null;
    }
    return matchTag[1];
}

function enterInfo(marcEntry, randTag, clonedTag){
	//Now for the fun stuff
	//First, lets put in the indicator boxes
	var name;
	var i, j, k;
	var indicator2Null = ["100", "110", "111", "400", "410", "411"];
	if(marcEntry.boxOne != '_'){
		//ex: tag_035_indicator1_454546
		name = "tag_" + marcEntry.field + "_indicator1_" + randTag + clonedTag;
		var indArr = document.getElementsByName(name);
		indArr[0].value = marcEntry.boxOne;
	}
	if(marcEntry.boxTwo != '_'){
		var index = indicator2Null.indexOf(marcEntry.field);
		if(index < 0){
			name = "tag_" + marcEntry.field + "_indicator2_" + randTag + clonedTag;
			var indArr = document.getElementsByName(name);
			indArr[0].value = marcEntry.boxTwo;
		}
	}
	//First we have to do the original
	
	var inputField;
	for(j = 0, k = 0; j < marcEntry.subNum.num.length; j++){
		for(i = 0; i < marcEntry.subNum.num[j]; i++){
			inputField = returnInput(marcEntry.field, marcEntry.subNum.sub[j], clonedTag, i, randTag);
			inputField.val(marcEntry.subInfo[k]);
			k++;
		}
	}
}

function returnInput(tagNum, subfieldId, clonedFieldId, next, randTag){
	var subFieldRandId = getSubFieldRandId(tagNum, subfieldId, randTag);
	var divId = "subfield" + tagNum + subfieldId + subFieldRandId + clonedFieldId;
	var current = $('#' + divId);
	for(var i = 0; i < next; i++){
		current = current.next();		
	}
	current = current.children("input,textarea");
	return current;
}

var formId = "autForm";
var formAt = ["id", formId, "method", "post", "action", ""];
var nodule = createE("FORM", formAt);
nodule.style.position = 'fixed';
nodule.style.top = '70px';
document.body.appendChild(nodule);

var buttonId = "autButton";
var buttonAt = ["id", buttonId, "type", "button", "value", "Import"];
nodule = createE("INPUT", buttonAt);
document.getElementById(formId).appendChild(nodule);

var nodule = createE("BR", "");
document.getElementById(formId).appendChild(nodule);

var textId = "autText";
var textAt = ["id", textId, "cols", "50", "rows", "30"];
var nodule = createE("TEXTAREA", textAt);
document.getElementById(formId).appendChild(nodule);

var nodule = createE("BR", "");
document.getElementById(formId).appendChild(nodule);

var buttonId = "autButton1";
var buttonAt = ["id", buttonId, "type", "button", "value", "Import"];
nodule = createE("INPUT", buttonAt);
document.getElementById(formId).appendChild(nodule);

var checkId = "autExpand";
var checkAt = ["id", checkId, "type", "checkbox", "value", "ExpandFields", "checked", "true"];
nodule = createE("INPUT", checkAt);
document.getElementById(formId).appendChild(nodule);

$("#autButton").click(handleEntry);
$("#autButton1").click(handleEntry);

var radio = "pos";
var radioAt = ["type", "radio", "name", radio, "value", "fixed", "checked", "checked"];
nodule = createE("INPUT", radioAt);
document.getElementById(formId).appendChild(nodule);
radioAt = ["type", "radio", "name", radio, "value", "absolute"];
nodule = createE("INPUT", radioAt);
document.getElementById(formId).appendChild(nodule);

$("input[name='pos']").change(function(){
    if ($("input[name='pos']:checked").val() == 'fixed')
        $("#autForm").css({top: '70px', position: 'fixed'});
    else
       $("#autForm").css({top: '0px', position: 'absolute'});
});