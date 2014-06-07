// ==UserScript==
// @name        Add505subfields
// @namespace   gunderjtAI
// @description Add the "Title" and "statement of responsibility" subfields and format them accordingly
// @include     http://hazcatadmin.colorado.edu/cgi-bin/koha/cataloguing/addbiblio.pl*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant       none
// @version     1.31
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


//Disables the backspace key for anything other than the text fields.  Used to prevent accidental navigation away from entry forms

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD')) 
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

function createE(elemente, attributes){
	var node = document.createElement(elemente);
	attributesSize = attributes.length;
	for(i=0; i< attributesSize; i+=2){
		node.setAttribute(attributes[i], attributes[i+1]);
	}	
	return node;
}


function handleEntry(){
	var entry = document.getElementById("fiveTextarea").value;
	if(entry != ''){
		insert505(entry);
		return;
	}

	var num = document.getElementById("fiveText").value;
	
	var tNum = getSubRandomTagNum("505", "t");
	var rNum = getSubRandomTagNum("505", "r");
	var tCmd = "subfield505t" + tNum;
	var rCmd = "subfield505r" + rNum;

	

	unsafeWindow.upSubfield(tCmd);
	unsafeWindow.upSubfield(tCmd);
	unsafeWindow.upSubfield(rCmd);

	//duplicate t and r subfields
	for(var i = 0; i < num -1; i++){
		unsafeWindow.CloneSubfield(tCmd);
		unsafeWindow.CloneSubfield(rCmd);
	}
	
	rClId = getSubids(rCmd, num);
	upNum = num - 1;
	for(var i = 0; i < num -1; i++){
		for(var j = 0; j < upNum; j++){
			unsafeWindow.upSubfield(rClId[i]);
		}
		upNum--;
	}
}

function getSubids(subId, num){
	
	var current = $('#' + subId);
	var ids = new Array();
	ids.push(subId);
	var indId;
	for(var i = 1; i < num; i++){
		current = current.next();
		indId = current.attr('id');
		ids.push(indId);
	}
	return ids;
}

function getSubRandomTagNum(num, subfield) {
    var patt_str = "id\\=\\\"subfield" + num + subfield + "(\\d{1,6})\\\"";
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

function get505position(rand){
	var id = "tag_505_" + rand;
	var position = $('#' + id).position();
	return position;
}

function getRandomTagNum(num) {
    var patt_str = "id\\=\\\"tag_" + num + "_(\\d{1,12})\\\"";
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

function insert505(str){
	entries = str.split("\n");
	
	eSize = entries.length;
	var obj = new Array();
	for(var i = 0; i < eSize; i++){
		obj.push(createObj(entries[i]));
	}
	
	var tNum = getSubRandomTagNum("505", "t");
	var rNum = getSubRandomTagNum("505", "r");
	var tCmd = "subfield505t" + tNum;
	var rCmd = "subfield505r" + rNum;

	unsafeWindow.upSubfield(tCmd);
	unsafeWindow.upSubfield(tCmd);
	unsafeWindow.upSubfield(rCmd);

	//duplicate t and r subfields
	for(var i = 0; i < eSize - 1; i++){
		unsafeWindow.CloneSubfield(tCmd);
		unsafeWindow.CloneSubfield(rCmd);
	}
	//Push r subfields into place
	rClId = getSubids(rCmd, eSize);
	upNum = eSize - 1;
	for(var i = 0; i < eSize -1; i++){
		for(var j = 0; j < upNum; j++){
			unsafeWindow.upSubfield(rClId[i]);
		}
		upNum--;
	}
	
	//Start inputing the fields
	var current = $('#' + tCmd);
	var inputNode;
	for(var i = 0; i < eSize; i++){
		inputNode = current.children("input,textarea");
		inputNode.val(obj[i].title);
		current = current.next();
		inputNode = current.children("input,textarea");
		inputNode.val(obj[i].author);
		current = current.next();
	}
	
}

function createObj(entry){
	var h = entry.split(' / ');
	var o = new Object();
	if (h.length == 1){
		o.title = h[0];
		o.author = '';
	}
	else if(h.length == 2){
		
		o.title = h[0] + ' /';
		o.author = h[1];
	}
	else{
		alert("Too many subjects in string: " + entry);
	}
	return o;
}


//Create UI
var rand = getRandomTagNum("505");
var divId = "fiveDiv";
var divAt = ["id", divId];
nodule = createE("DIV", divAt);
nodule.style.position = 'absolute';
nodule.style.left = '-50%';
document.getElementById("div_indicator_tag_505_" + rand).appendChild(nodule);

var textId = "fiveTextarea";
var textAt = ["id", textId, "cols", "50", "rows", "30"];
var nodule = createE("TEXTAREA", textAt);
document.getElementById(divId).appendChild(nodule);

nodule = createE("BR", "");
document.getElementById(divId).appendChild(nodule);

var newtext = document.createTextNode("OR");
document.getElementById(divId).appendChild(newtext);

nodule = createE("BR", "");
document.getElementById(divId).appendChild(nodule);

var buttonId = "fiveText";
var buttonAt = ["id", buttonId, "type", "text"];
nodule = createE("INPUT", buttonAt);
document.getElementById(divId).appendChild(nodule);


nodule = createE("BR", "");
document.getElementById(divId).appendChild(nodule);


var buttonId = "fiveButton";
var buttonAt = ["id", buttonId, "type", "button", "value", "Add Fields"];
nodule = createE("INPUT", buttonAt);
document.getElementById(divId).appendChild(nodule);

$("#fiveButton").click(handleEntry);
