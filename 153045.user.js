// ==UserScript==
// @name        MAW
// @namespace   maw
// @description Modified AnakinWeb
// @include     http://*.anakinweb.com/*
// @version     0.1
// @grant		None
// ==/UserScript==
// Define the bbCode tags
bbcode = new Array();
bbtags = new Array('[b]','[/b]','[i]','[/i]','[u]','[/u]','[quote]','[/quote]','[email]','[/email]','[list]','[/list]','[list=]','[/list]','[img]','[/img]','[url]','[/url]','[spoiler]','[/spoiler]','[youtube]','[/youtube]','[dailymotion]','[/dailymotion]','[vimeo]','[/vimeo]','[youtube16]','[/youtube16]','[dailymotion16]','[/dailymotion16]','[vimeo16]','[/vimeo16]');
imageTag = false;

// Replacement for arrayname.push(value) not implemented in IE until version 5.5
// Appends element to the array
function arraypush(thearray,value) {
	thearray[ getarraysize(thearray) ] = value;
}

// Replacement for arrayname.length property
function getarraysize(thearray) {
	for (i = 0; i < thearray.length; i++) {
		if ((thearray[i] == "undefined") || (thearray[i] == "") || (thearray[i] == null))
			return i;
		}
	return thearray.length;
}

function arraypop(thearray) {
	thearraysize = getarraysize(thearray);
	retval = thearray[thearraysize - 1];
	delete thearray[thearraysize - 1];
	return retval;
}

function emoticon(text) {
	if(document.wrappedJSObject.post){
		var txtarea = document.wrappedJSObject.post.getElementsByTagName("textarea")[0];
		if(txtarea){
			text = ' ' + text + ' ';
			insertTxt(txtarea,text);
		}
	}
}


function bbstyle(bbnumber) {
	if(document.post){
		var txtarea = document.post.message;
	}else{
		//greasemonkey running under linux dont allow direct access on properties
		var txtarea = document.wrappedJSObject.post.getElementsByTagName("textarea")[0];
	}
	
	if(txtarea == undefined){
		return;
	}
	
	txtarea.focus();
	donotinsert = false;
	theSelection = false;
	bblast = 0;

	if (bbnumber == -1) { // Close all open tags & default button names
		while (bbcode[0]) {
			butnumber = arraypop(bbcode) - 1;
			txtarea.value += bbtags[butnumber + 1];
			buttext = eval('document.post.addbbcode' + butnumber + '.value');
			eval('document.post.addbbcode' + butnumber + '.value ="' + buttext.substr(0,(buttext.length - 1)) + '"');
		}
		imageTag = false; // All tags are closed including image tags :D
		txtarea.focus();
		return;
	}

	if (document.createTextRange)
	{
		theSelection = document.selection.createRange().text; // Get text selection
		if (theSelection) {
			// Add tags around selection
			document.selection.createRange().text = bbtags[bbnumber] + theSelection + bbtags[bbnumber+1];
			txtarea.focus();
			theSelection = '';
			return;
		}
	}
	else if (txtarea.selectionEnd && (txtarea.selectionEnd - txtarea.selectionStart > 0))
	{
		mozWrap(txtarea, bbtags[bbnumber], bbtags[bbnumber+1]);
		return;
	}

	// Find last occurance of an open tag the same as the one just clicked
	for (i = 0; i < bbcode.length; i++) {
		if (bbcode[i] == bbnumber+1) {
			bblast = i;
			donotinsert = true;
		}
	}

	if (donotinsert) {		// Close all open tags up to the one just clicked & default button names
		while (bbcode[bblast]) {
			butnumber = arraypop(bbcode) - 1;
			insertTxt(txtarea,bbtags[butnumber + 1]);
			buttext = eval('document.post.addbbcode' + butnumber + '.value');
			eval('document.post.addbbcode' + butnumber + '.value ="' + buttext.substr(0,(buttext.length - 1)) + '"');
			imageTag = false;
		}
		txtarea.focus();
		return;
	} else { // Open tags

		if (imageTag && (bbnumber != 14)) {		// Close image tag before adding another
			txtarea.value += bbtags[15];
			lastValue = arraypop(bbcode) - 1;	// Remove the close image tag from the list
			document.post.addbbcode14.value = "Img";	// Return button back to normal state
			imageTag = false;
		}

		// Open tag
		insertTxt(txtarea,bbtags[bbnumber]);
		if ((bbnumber == 14) && (imageTag == false)) imageTag = 1; // Check to stop additional tags after an unclosed image tag
		arraypush(bbcode,bbnumber+1);
		eval('document.post.addbbcode'+bbnumber+'.value += "*"');
		txtarea.focus();
		return;
	}
	storeCaret(txtarea);
}

function mozWrap(txtarea, open, close)
{
	var scroll_position = txtarea.scrollTop;
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	if (selEnd == 1 || selEnd == 2)
		selEnd = selLength;

	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selEnd)
	var s3 = (txtarea.value).substring(selEnd, selLength);
	txtarea.value = s1 + open + s2 + close + s3;
	 /* Ajustement de la position du curseur */
	var caret=0;
	if (s2.length == 0) {
  		caret = selStart + open.length;
	} else {
  		caret = selStart + open.length + s2.length + close.length;
	}
	txtarea.selectionStart = caret;
	txtarea.selectionEnd = caret;
	txtarea.scrollTop = scroll_position;
	return;
}

function insertTxt(txtarea,text){
	if (txtarea.createTextRange && txtarea.caretPos) {
		var caretPos = txtarea.caretPos;
		caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? caretPos.text + text + ' ' : caretPos.text + text;
		txtarea.focus();
	} else {
		mozIns(txtarea,text);
	}
}

function mozIns(txtarea,text){
	var scroll_position = txtarea.scrollTop;
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var s1 = (txtarea.value).substring(0,selStart);
	var s2 = (txtarea.value).substring(selStart, selLength);
	txtarea.value = s1 + text + s2;
	 /* Ajustement de la position du curseur */
	txtarea.selectionEnd = txtarea.selectionStart = selStart+text.length;
	txtarea.scrollTop = scroll_position;
	txtarea.focus();
}

/**
Si l'on est sur une page d'édition d'un post cette fonction nettoie la fin du message
et redéfinit les fonctions javascript de formatage.
*/
function editMode(){
	if(document.wrappedJSObject.post){
		var txtarea = document.wrappedJSObject.post.getElementsByTagName("textarea")[0];
		if(txtarea !== undefined){
			/*Recherche de la position du premier <br /> en fin de post*/
			var brpos = txtarea.innerHTML.indexOf("&lt;br");
			if(brpos >= 0){
				/*On soustrait le contenu du message du début jusqu'au premier br*/
				txtarea.innerHTML = txtarea.innerHTML.substr(0,brpos);
			}
			/*Redéfinition des fonctions de formatage avec les correctifs*/
			window.wrappedJSObject.mozWrap = this.mozWrap;
			window.wrappedJSObject.bbstyle = this.bbstyle;
			window.wrappedJSObject.emoticon = this.emoticon;
		}
	}
}

function gotoLastPage(){
	var divmiddle = document.getElementById("aw8containermiddle");3
	if(divmiddle !== undefined){
		var divchilds = divmiddle.getElementsByTagName("div");
		var divlinks;
		if(divchilds[4].getElementsByTagName("strong")[0]){
			divlinks = divchilds[4];
		}else if(divchilds[2].getElementsByTagName("strong")[0]){
			divlinks = divchilds[2];
		}
		
		if(divlinks != undefined){
			var current_page = parseInt(divlinks.getElementsByTagName("strong")[0].innerHTML);
			var links = divlinks.getElementsByTagName("a");
			if(links.length > 0){
				var last_page = parseInt(links[links.length-1].innerHTML);
				if(last_page > current_page){
					window.location = links[links.length-1].href;
				}
			}
		}
	}
}

/**
Prepare les liens de l'accordeons (ceux de Forums, Jeux de rôles et Actualité)
afin que le script sache ultérieurement que l'URL provient d'un clique sur l'un
de ces liens.
La fonction rajouter la chaine "#accordion" à chaque lien.
*/
function prepareLinks(){
	var accordion = document.getElementById("vertical_container");
	var divchilds = accordion.getElementsByTagName("div");
	/*Le div vertical_container contient un certain nombre de div correspond chacun à un element de l'accordéon.*/
	var  categories = [divchilds[2],divchilds[3],divchilds[6]];
	for(i=0;i<categories.length;i++){
		var links = categories[i].getElementsByTagName("a");
		for(j=0;j<links.length;j++){
			links[j].href = links[j].href + "#accordion";
		}
	}
}

function changeBackground(event,bgurl){
	if(bgurl==undefined){
		bgurl = this.options[this.selectedIndex].getAttribute("value");
	}
	document.body.style.backgroundImage="url(' "+bgurl+" ')";
}

function chooseBackground(){
	console.log("Choose your background on AW !");
	var backgrounds = {
		"Georges&Mickey" : "http://img.anakinweb.com/common/v8-4/main.jpg",
		"AnakinVader" : "http://img.anakinweb.com/common/v8-3/main.jpg",
		"Tatooine" : "http://img.anakinweb.com/common/v8-2/main.jpg",
		"TCW" : "http://img.anakinweb.com/common/v8-1/main.jpg"
	};
	
	var select = document.createElement("select");
	select.setAttribute("id","choosebg");
	for(bg in backgrounds){
		var option = document.createElement("option");
		option.setAttribute("name",bg);
		option.setAttribute("value",backgrounds[bg]);
		option.text=bg;
		select.appendChild(option);
	}
	select.addEventListener("change",changeBackground);
	var aw8menu = document.getElementById("aw8menu");
	var cell = aw8menu.getElementsByTagName("table")[0].rows[0].insertCell(-1);
	cell.appendChild(select);
}

function changeCSS(event,cssurl){
	if(cssurl==undefined){
		cssurl = this.options[this.selectedIndex].getAttribute("value");
	}
	document.getElementsByTagName("link")[3].setAttribute("href",cssurl);
}

function chooseCSS(){
	console.log("Choose your CSS on AW !");

	var backgrounds = {
		"Georges&Mickey" : "http://lib.anakinweb.com/css/aw8-4.css",
		"AnakinVader" : "http://lib.anakinweb.com/css/aw8-3.css",
		"Tatooine" : "http://lib.anakinweb.com/css/aw8-2.css",
		"TCW" : "http://lib.anakinweb.com/css/aw8-1.css"
	};
	
	var select = document.createElement("select");
	select.setAttribute("id","choosebg");
	for(bg in backgrounds){
		var option = document.createElement("option");
		option.setAttribute("name",bg);
		option.setAttribute("value",backgrounds[bg]);
		option.text=bg;
		select.appendChild(option);
	}
	select.addEventListener("change",changeCSS);
	var aw8menu = document.getElementById("aw8menu");
	var cell = aw8menu.getElementsByTagName("table")[0].rows[0].insertCell(-1);
	cell.appendChild(select);
	changeCSS(null,"http://lib.anakinweb.com/css/aw8-3.css");
}

var mawify = function(){
	console.log("mawify");
	editMode();
	prepareLinks();
	var from_accordion = document.URL.indexOf("#accordion");
	/*Si l'url provient d'un lien de l'accordéon => on va a la dernière page du topic*/
	if(from_accordion != -1){
		gotoLastPage();
	}
	chooseCSS();
}
mawify();