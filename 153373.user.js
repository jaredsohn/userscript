// ==UserScript==
// @name deviantART - Simple Text Formatting with Easy Selection of Emoticons
// @author Charandeep Singh
// @namespace http://itgeek.in
// @description This script provide an easy interface for formatting comments, journals, signature etc in deviantART. You can format your text with Bold, Italic, Underline, Sub and Sup. Along with that, it has a easy "one-click" drop-down selection from all 500 emoticons present in deviantART.
// @include http://*.deviantart.com/*
// @include http://*deviantart.com/*
// ==/UserScript==

window.addEventListener("load", function(e) 
{
	//alert(unsafeWindow.frames['orkutFrame']);
	var currentTextArea=document.getElementsByTagName('textarea')[0];
	var ta;
	var titre = getUrlVars()['merci'];
	var lien = getUrlVars()['lien'];
	var reg=new RegExp("(%20)", "g");
	for(i=0;i<document.getElementsByTagName('textarea').length;i++) {
		ta = document.getElementsByTagName('textarea')[i];
		appendToolBar(ta);
		if(titre != null && lien != null) {
		titre = titre.replace(reg," ");
		ta.innerHTML+=":iconehcsty1::iconehcsty2::iconehcsty3: > <b><a href = '"+lien+"' target = '_blank'>"+titre+"</a></b>"; }
	}
	
	// var parentDiv = ta.parentNode.parentNode.getElementsByTagName('div')[0];
	// parentDiv.style.width = "500px";

},true);

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function appendToolBar(ta)
{
	var boldButton = document.createElement('div');
	// boldButton.type='button';
	boldButton.innerHTML="B";

	var italicButton = document.createElement('div');
	// italicButton.type='button';
	italicButton.innerHTML="<i>I</i>";

	var underlineButton = document.createElement('div');
	// underlineButton.type='button';
	underlineButton.innerHTML="<u>U</u>";

	var subscriptButton = document.createElement('div');
	// subscriptButton.type='button';
	subscriptButton.innerHTML="<sub>Sub</sub>";

	var superscriptButton = document.createElement('div');
	// superscriptButton.type='button';
	superscriptButton.innerHTML="<sup>Sup</sup>";

	var blockquoteButton = document.createElement('div');
	// blockquoteButton.type='button';
	blockquoteButton.innerHTML="Quote";
	
var thanksButton = document.createElement('div');
	// thanksButton.type='button';
	thanksButton.innerHTML="Thx";
/* 
	//The text color select menu cration
	var colorlist = document.createElement('select');
	colorlist.id='colorselect';
	colorlist.innerHTML='Font color';
	colorarray= new Array("aqua","blue","fuchsia","gold","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","violet","yellow");  
	colorvals=new Array("aqua","blue","#f0c0a0","#ffd700","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","#ff00ff","yellow");

	var firstoption=new Option("Color");
	firstoption.selected=true;
	firstoption.disabled="disabled";
	colorlist.options.add(firstoption);

	for(var i=0;i<colorarray.length;i++)
	{
		var colorOption=new Option(colorarray[i]);
		colorOption.setAttribute("style", "padding-bottom:3px; font-weight:bold; color:"+colorvals[i]);
		colorlist.options.add(colorOption);
	} */

	/* 
	//The smiley select menu cration
	var smileySelectMenu=document.createElement('select');
	smileySelectMenu.id='smileySelect';
	smileySelectMenu.size=1;
	smileySelectMenu.innerHTML='Select Here';	
	 */
	// Suite des smileys
	var smileyButton=document.createElement('div');
	smileyButton.id='smileyWorm';
	// smileyButton.type='button';
	smileyButton.innerHTML='°u°';	
/* 
	var smileySelectLabel=new Option("SelectEmoticon");
	smileySelectLabel.selected=true;
	smileySelectLabel.disabled="disabled";
	smileySelectMenu.options.add(smileySelectLabel);
	
	for(i=0;i<smileyTags.length;i++)
	{
		var smileyOption=new Option(smileyTags[i]);
		smileyOption.setAttribute("style", "padding-bottom:3px; font-weight:bold; background-image:url("+smileyGifs[i]+");background-repeat:no-repeat; background-position:center left; padding-left:20px; text-align:center;");
		smileySelectMenu.options.add(smileyOption);
	} */
	
	// smileySelectMenu.addEventListener('change',function (){ appendSmileyCode(smileyTags[this.selectedIndex-1], ta);document.getElementById('smileySelect').selectedIndex=0;  },true );
	boldButton.addEventListener('click',function (){ appendFormatCode('b', ta); },true);
	italicButton.addEventListener('click',function (){ appendFormatCode('i', ta); },true);
	underlineButton.addEventListener('click',function (){ appendFormatCode('u', ta); },true);
	subscriptButton.addEventListener('click',function (){ appendFormatCode('sub', ta); },true);
	superscriptButton.addEventListener('click',function (){ appendFormatCode('sup', ta); },true);
	blockquoteButton.addEventListener('click',function (){ appendFormatCode('blockquote', ta); },true);
	thanksButton.addEventListener('click',function (){ appendNewTxt(':iconehcsty1::iconehcsty2::iconehcsty3: > <b>'+prompt("deviation")+'</b>', ta); },true);
	
	var formattingToolbarContainer=document.createElement('div');
	formattingToolbarContainer.setAttribute("style", "height: 25px; margin-bottom:3px;");
	formattingToolbarContainer.appendChild(boldButton);
	formattingToolbarContainer.appendChild(italicButton);
	formattingToolbarContainer.appendChild(underlineButton);
	formattingToolbarContainer.appendChild(subscriptButton);
	formattingToolbarContainer.appendChild(superscriptButton);
	formattingToolbarContainer.appendChild(blockquoteButton);
	formattingToolbarContainer.appendChild(thanksButton);
	// formattingToolbarContainer.appendChild(colorlist);
	// formattingToolbarContainer.appendChild(smileySelectMenu);
	formattingToolbarContainer.appendChild(smileyButton);
	smileyButton.addEventListener('click',function (){ 
		var ifr = document.createElement('iframe'); 
		ifr.src = "http://icon-listing.deviantart.com/journal/I-m-Happy-Worm-Collection-233242863#dev233242863"; 
		ifr.setAttribute("style", "position:absolute; height:300px; width:550px; margin-left: -417px;    margin-top: 25px;   z-index: 1000;");
		formattingToolbarContainer.appendChild(ifr);
		var xButton = document.createElement('div'); 
		xButton.id='x';
		xButton.innerHTML='x<b></b>';	
		xButton.setAttribute("class", "gmbutton2 reply");
		xButton.setAttribute("style", "font-weight:bold; display:inline-block; cursor:pointer; margin-left:6px; padding:0 0 0 5px;");
		xButton.addEventListener('click',function (){ 		ifr.setAttribute("style", "display:none;"); xButton.setAttribute("style", "display:none;"); },true);
		formattingToolbarContainer.appendChild(xButton);
		var i2Button = document.createElement('div'); 
		i2Button.id='i2';
		i2Button.innerHTML='2<b></b>';	
		i2Button.setAttribute("class", "gmbutton2 reply");
		i2Button.setAttribute("style", "font-weight:bold; display:inline-block; cursor:pointer; margin-left:6px; padding:0 0 0 5px;");
		i2Button.addEventListener('click',function (){ 		ifr.setAttribute("src", "http://helpplz.info/"); },true);
		formattingToolbarContainer.appendChild(i2Button);
	},true);

	//Identify the textbox of the page		
	ta.parentNode.insertBefore(formattingToolbarContainer, ta);
	 var toolbar = formattingToolbarContainer.getElementsByTagName('div');
	for(j=0;j< toolbar.length;j++) {
		dv = toolbar[j];
		 dv.setAttribute("class", "gmbutton2 reply");
		dv.setAttribute("style", "font-weight:bold; display:inline-block; cursor:pointer; margin-left:6px; padding:0 0 0 5px;");
		dv.innerHTML+="<b></b>";
	}
}



//Appends the given smiley to the current cursor position in the current text-area
function appendSmileyCode(smiley, tx)
{
	if(tx.value==tx.getAttribute("prompt"))
	{
		tx.focus();
	}

	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	tx.value = tx.value.substring(0, startPos)+smiley+tx.value.substring(endPos, tx.value.length);
}

//Appends the given newTxt to the current cursor position in the current text-area
function appendNewTxt(newTxt, tx)
{
	if(tx.value==tx.getAttribute("prompt"))
	{
		tx.focus();
	}

	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	tx.value = tx.value.substring(0, startPos)+newTxt+tx.value.substring(endPos, tx.value.length);
}

//Appends the given Format Tag into the selected text
function appendFormatCode(format, tx)
{
	if(tx.value==tx.getAttribute("prompt"))
	{
		tx.focus();
	}

	formatOpen="<"+format+">";
	formatClose="</"+format+">";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}