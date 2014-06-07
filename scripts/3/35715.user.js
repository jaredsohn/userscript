// ==UserScript==
// @name           RunABot Custom Replies Styler
// @namespace      http://anythinggaming.com/
// @description    Makes the RunABot Custom Replies table nicer
// @include        http://runabot.com/cgi-bin/webcom/bot/replyorg*
// @include        http://runabot.com/cgi-bin/webcom/bot/renamemod*
// ==/UserScript==

//inject new stylesheet
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("link");
	node.rel = "stylesheet";
	node.type = "text/css";
	node.href = "http://filesmelt.com/Filehosting2/downloader.php?file=RunABotStyles.css";
	heads[0].appendChild(node);
}
function ConfirmDelete(linkobj) {
	alert(linkobj);
	if (confirm('Are you sure you want to delete this item?')) {
		//window.location = linkobj.href;
	}
}

//Functions
function linkToImage(linkobj,imgurl) {
	var newlinkobj = document.createElement("a");
	newlinkobj.setAttribute('title',linkobj.text);
	newlinkobj.setAttribute('alt',linkobj.text);
	newlinkobj.setAttribute('href',linkobj.href);

	var imgobj = document.createElement("img");
	imgobj.style.border='0';
	imgobj.src = imgurl;

	newlinkobj.appendChild(imgobj);
	return newlinkobj;
}

function updateCustomReplyTable() {
	var index = inputtextSelectBox.options[inputtextSelectBox.selectedIndex].value;
	custom_replyTable_tr1_td1.replaceChild(linkToImage(modifylinkArray[index],'http://runabot.com/icons/quill.gif'),custom_replyTable_tr1_td1.firstChild)
	custom_replyTable_tr1_td2.replaceChild(linkToImage(deletelinkArray[index],'http://runabot.com/icons/burst.gif'),custom_replyTable_tr1_td2.firstChild)
	stringColorCode('inputcell',inputtextArray[index]);
	stringColorCode('outputcell',outputtextArray[index]);
}

function stringColorCode(objid,str) {
	var optionals = str.split('|');
	var object = document.getElementById(objid);

	var outputHTML = '';
	if (optionals.length > 1) {
		if (objid == 'outputcell') {
			outputHTML += '<span class="delimiter"><</span><span class="tagopen">random</span><span class="delimiter">></span><br>';
		}
		for (i=0;i<optionals.length;i++) {
			outputHTML += '<table><tr><td style="vertical-align:top;padding:0px 0px 0px 0px;"><img src="http://runabot.com/icons/ball.red.gif"></td><td class="'+objid+'">'+optionals[i].colorCode()+'</td></tr></table>';
		}
		if (objid == 'outputcell') {
			outputHTML += '<span class="delimiter">&LT;/</span><span class="tagclose">random</span><span class="delimiter">></span>';
		}
	}
	if (outputHTML == '') {
		outputHTML = str.colorCode();
	}
	if (objid == 'inputcell') {
		outputHTML = outputHTML.toLowerCase();
	}
	object.innerHTML = outputHTML;
}

//returns an html object with the given name/id
function $(data) {
	if (typeof data == "string") {		// Assume this is an id of an object
		var object = document.getElementById(data);
		if (object == null) // If null then this must be a name
		{
			object = $(document.getElementsByName(data)[data]);
		}
		return $(object);
	} else if (data.nodeType == 1) {
		return data;
	}
	alert("Error: " +data+ " is not a valid ID or Name");
	return null;
}

//<string>.count(): return the number of occurrences of character in the given string
String.prototype.count = function (character) {
	return this.split(character).length-1;
}

//<string>.shortenTo(): keeps a string with a max length and adds "..." if it is too long
String.prototype.shortenTo = function (maxlength) {
	//alert('length: '+this.length+' > maxlength: '+maxlength);
	if (this.length > +maxlength) {
		return this.substring(0,+maxlength-3)+'...';
	}
	return this;
}

//<string>.searchUntil(): returns the string between startindex and stopstring
//use the extra argument to include more or less of the original string
//if stopstring is not found the original string is returned
String.prototype.searchUntil = function (startindex,stopstring,extra) {
	if (!extra) extra = 0;
	var str = this.substr(startindex+1);

	if(str.indexOf(stopstring) == -1) {
		return this;
	} else {
		return str.substring(0,str.indexOf(stopstring)+extra);
	}
}

String.prototype.colorCode = function() {
	var newstr = this;

    // Turn < and > into &LT; and &GT;
    // (case matters)
    newstr = newstr.replace(/\<([^!])/g, '&LT;$1');
    newstr = newstr.replace(/([^-])\>/g, '$1&GT;');

	newstr = newstr.replace(/\&LT\;nextreply\&GT\;/g, '&LT;nextreply&GT;<br>');

    // // Now code code attributes of the form
    // attrName="foo" - make the attribute red and the value blue
    //newstr = newstr.replace(/([a-zA-Z0-9:]+\=)([^\&GT\;]*)\&GT\;/g, '<span class="attribute">$1</span>' + '<span class="attrvalue">$2</span>&GT;');
	newstr = newstr.replace(/(\s*)(\w+)=(.+?)\&GT\;/g, '$1<span class="attribute">$2</span><span class="delimiter">=</span>' + '<span class="attrvalue">$3</span>&GT;');

    // Now make the element opener and closer tags brown
    newstr = newstr.replace(/\&LT\;(\w+)/g, '&LT;<span class="tagopen">$1</span>');
    newstr = newstr.replace(/\&LT\;\/(\w+)/g, '&LT;/<span class="tagclose">$1</span>');

    // Comments are green
    newstr = newstr.replace(/\<\!--/g, '<span class="comment">&lt;!--');
    newstr = newstr.replace(/--\>/g, '--&gt;</span>');

    // The < and > characters are blue
    newstr = newstr.replace(/\&LT\;\//g, '<span class="delimiter">&lt;/</span>');
    newstr = newstr.replace(/\&LT\;/g, '<span class="delimiter">&lt;</span>');
    newstr = newstr.replace(/\/\&GT\;/g, '<span class="delimiter">/&gt;</span>');
    newstr = newstr.replace(/\&GT\;/g, '<span class="delimiter">&gt;</span>');

    return newstr;
}

//OBJECT: Creates a DOM html object. Also allows for custom functions.
//idname and classname are optional
function DOM(tagname,idname,classname) {
	this.Node = document.createElement(tagname);
	if (idname && this.Node) this.Node.setAttribute('id',idname);
	if (classname && this.Node) this.Node.setAttribute('class',classname);

	this.Node.insertAfter = function(Node) {
		Node.parentNode.insertBefore(this, Node.nextSibling);
	}
	return this.Node;
}



//Get information and build new display
var inputtextArray = new Array();
var outputtextArray = new Array();
var modifylinkArray = new Array();
var deletelinkArray = new Array();
var replyTable = '';

var documenttables = document.getElementsByTagName('table');
for (i=0;i<documenttables.length;i++) {
	var	curtable = documenttables[i];
	if (curtable.getAttribute('border') == '1' && curtable.getAttribute('bordercolor') == 'black') {
		replyTable = curtable;
		for (row=1;row<curtable.rows.length;row++) {
			var currow = curtable.rows[row];
			var index = +row-1;
			inputtextArray[index] = currow.cells[0].textContent;
			outputtextArray[index] = currow.cells[1].textContent;
			modifylinkArray[index] = currow.cells[2].firstChild;
			deletelinkArray[index] = currow.cells[3].firstChild;
		}
	}
}

if (replyTable.rows.length > 1) {
	var parentPara = replyTable.parentNode;
	var inputtextSelectBox = document.createElement("select");
	for (i=0;i<inputtextArray.length;i++) {
		var inputtextOption = document.createElement("option");
		inputtextOption.value = i;
		inputtextOption.text = inputtextArray[i].toLowerCase().shortenTo(100);
		inputtextSelectBox.appendChild(inputtextOption);
	}
	inputtextSelectBox.selectedIndex = 0;
	inputtextSelectBox.setAttribute('id','inputtextSelectBox')
	inputtextSelectBox.addEventListener('change', updateCustomReplyTable, false);
	parentPara.insertBefore(inputtextSelectBox,parentPara.childNodes[6]);

	//create the elements
	var custom_replyTable = document.createElement("table");
	var custom_replyTable_tr1 = document.createElement("tr");
	var custom_replyTable_tr1_td1 = document.createElement("td");
	var custom_replyTable_tr1_td2 = document.createElement("td");
	var custom_replyTable_tr1_td3 = document.createElement("td");
	var custom_replyTable_tr2 = document.createElement("tr");
	var custom_replyTable_tr2_td1 = document.createElement("td");

	//setup styling and initial data
	custom_replyTable.setAttribute('border','1');
	custom_replyTable.setAttribute('class','replytable');
	custom_replyTable.setAttribute('id','replytable');

	custom_replyTable_tr1_td1.width='20'
	custom_replyTable_tr1_td1.setAttribute('id','modifycell');
	custom_replyTable_tr1_td1.setAttribute('class','modifycell');
	custom_replyTable_tr1_td1.appendChild(linkToImage(modifylinkArray[0],'http://runabot.com/icons/quill.gif'))

	custom_replyTable_tr1_td2.width='20'
	custom_replyTable_tr1_td2.setAttribute('id','deletecell');
	custom_replyTable_tr1_td2.setAttribute('class','deletecell');
	custom_replyTable_tr1_td2.appendChild(linkToImage(deletelinkArray[0],'http://runabot.com/icons/burst.gif'))

	custom_replyTable_tr1_td3.setAttribute('id','inputcell');
	custom_replyTable_tr1_td3.setAttribute('class','inputcell');

	custom_replyTable_tr2_td1.setAttribute('colspan','3');
	custom_replyTable_tr2_td1.setAttribute('id','outputcell');
	custom_replyTable_tr2_td1.setAttribute('class','outputcell');

	custom_replyTable.appendChild(custom_replyTable_tr1);
		custom_replyTable_tr1.appendChild(custom_replyTable_tr1_td1);
		custom_replyTable_tr1.appendChild(custom_replyTable_tr1_td2);
		custom_replyTable_tr1.appendChild(custom_replyTable_tr1_td3);
	custom_replyTable.appendChild(custom_replyTable_tr2);
		custom_replyTable_tr2.appendChild(custom_replyTable_tr2_td1);
	parentPara.insertBefore(custom_replyTable,parentPara.childNodes[7]);

	stringColorCode('inputcell',inputtextArray[0]);
	stringColorCode('outputcell',outputtextArray[0]);

	parentPara.removeChild(replyTable);

/*
var TestElement = new DOM('select','selectbox1');
//alert(TestElement);
TestElement.insertAfter(custom_replyTable);
alert('ID: '+$('selectbox1').getAttribute('id'));
alert('Class: '+$('selectbox1').getAttribute('class'));
*/
}