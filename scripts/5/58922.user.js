// ReadAndFindOut.com HTML Editor
// Created by: mapthis
// Version: 1.1
// November 2, 2009
//
// Based entirely on:
//
// Flickr Rich Edit
// version 0.4 BETA!
// 2007-05-02
// Copyright (c) 2007, Todd Moon (toddmoon.com) & jrhyley ( http://www.flickr.com/people/jrhyley/ )
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// and
// Gawker Comments HTML Helper
// http://lifehacker.com/397655/the-html-helper-marks-up-your-comments
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           ReadAndFindOut.com HTML Editor
// @namespace      ReadAndFindOut
// @description    Adds HTML markup editor to www.ReadAndFindOut.com
// @include        http://www.readandfindout.com/*
// @include        http://readandfindout.com/*
// @include        http://97.107.130.237/*

// ==/UserScript==

// == CONSTANTS == //

// if below value is marked "true", then the "Send notification emails?" checkbox will be checked automatically on all messageboards when the page loads.
var autoCheckEmailBox = "true";

// == LIFECYCLE == //

if (autoCheckEmailBox=="true"){
	checkBoxes = document.evaluate("//input",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i=0;i<checkBoxes.snapshotLength;i++){
		var checkBox = checkBoxes.snapshotItem(i);
		if(checkBox.id == "id_post-notification_emails"){
			checkBox.checked = "true";
		}
	}
}

//Find existing text areas to add rich controls to.
textAreas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

//Add the rich editor to the existing text areas.
for(var i=0;i<textAreas.snapshotLength;i++){
	var textArea = textAreas.snapshotItem(i);
	if(textArea.id!="id_noteboard_form-all_recipients"&&textArea.id!="id_edit_form-other_information"){
		var controlBar = new ControlBarNew();
		controlBar.inject(textArea);
	}
}

// == CLASSES == //

function ControlBarNew()
{
	this.inject = function(targetTextArea){
		var linebreak = document.createElement("br");
		targetTextArea.parentNode.insertBefore( linebreak, targetTextArea );
		var spaces = "      ";
		var titleBar = document.createElement("label");
		titleBar.innerHTML = "HTML Editor Tools:";
		targetTextArea.parentNode.insertBefore( titleBar, targetTextArea );
		
		var controlBar = document.createElement("div");
		controlBar.setAttribute('style','');
		controlBar.style.marginBottom = "2px";
		controlBar.style.fontSize = "12px";	
		controlBar.innerHTML = "<b>Text Tags</b>: ";
		
		var item = new ControlBarItem( "<i>italic</i>", "italic", targetTextArea );
		controlBar.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar.appendChild(spacer);
		var item = new ControlBarItem( "<b>bold</b>", "bold", targetTextArea );
		controlBar.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar.appendChild(spacer);
		var item = new ControlBarItem( "underline", "underline", targetTextArea );
		controlBar.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar.appendChild(spacer);
		var item = new ControlBarItem( "<s>strikethrough</s>", "strikethrough", targetTextArea );
		controlBar.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar.appendChild(spacer);
		var item = new ControlBarItem( "center", "center", targetTextArea );
		controlBar.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>UL>", "unordered list", targetTextArea );
		controlBar.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>OL>", "ordered list", targetTextArea );
		controlBar.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>LI>", "list item", targetTextArea );
		controlBar.appendChild( item.create() );
		targetTextArea.parentNode.insertBefore( controlBar, targetTextArea );
		
		var controlBar2 = document.createElement("div");
		controlBar2.setAttribute('style','');
		controlBar2.style.marginBottom = "2px";
		controlBar2.style.fontSize = "12px";
		controlBar2.innerHTML = "<b>Fonts</b>: ";

		var item = new ControlBarItem( "<<i></i>Arial>", "arial", targetTextArea );
		controlBar2.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar2.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>Garamond>", "garamond", targetTextArea );
		controlBar2.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar2.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>Georgia>", "georgia", targetTextArea );
		controlBar2.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar2.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>Tahoma>", "tahoma", targetTextArea );
		controlBar2.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar2.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>Times New Roman>", "times new roman", targetTextArea );
		controlBar2.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar2.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>Verdana>", "verdana", targetTextArea );
		controlBar2.appendChild( item.create() );
		targetTextArea.parentNode.insertBefore( controlBar2, targetTextArea );
		
		var controlBar4 = document.createElement("div");
		controlBar4.setAttribute('style','');
		controlBar4.style.marginBottom = "2px";
		controlBar4.style.fontSize = "12px";
		controlBar4.innerHTML = "<b>Quotes</b>: ";
		
		var item = new ControlBarItem( "<<i></i>Full Quote Tags>", "full quotes", targetTextArea );
		controlBar4.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar4.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>Open Quote Tag>", "open quote", targetTextArea );
		controlBar4.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar4.appendChild(spacer);
		var item = new ControlBarItem( "<<i></i>Close Quote Tag>", "close quote", targetTextArea );
		controlBar4.appendChild( item.create() );
		targetTextArea.parentNode.insertBefore( controlBar4, targetTextArea );
		
		var controlBar3 = document.createElement("div");
		controlBar3.setAttribute('style','background-color:black; width:326px');
		controlBar3.style.marginBottom = "2px";
		controlBar3.style.fontSize = "12px";
		controlBar3.innerHTML = "<b><font color='white'>Text Colors:</font></b> ";

		var item = new ControlBarItem( "<font color='red'>Red</font>", "red", targetTextArea );
		controlBar3.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar3.appendChild(spacer);
		var item = new ControlBarItem( "<font color='blue'><b>Blue</b></font>", "blue", targetTextArea );
		controlBar3.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar3.appendChild(spacer);
		var item = new ControlBarItem( "<font color='green'>Green</font>", "green", targetTextArea );
		controlBar3.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar3.appendChild(spacer);
		var item = new ControlBarItem( "<font color='yellow'>Yellow</font>", "yellow", targetTextArea );
		controlBar3.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar3.appendChild(spacer);
		var item = new ControlBarItem( "<font color='orange'>Orange</font>", "orange", targetTextArea );
		controlBar3.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar3.appendChild(spacer);
		var item = new ControlBarItem( "<font color='purple'>Purple</font>", "purple", targetTextArea );
		controlBar3.appendChild( item.create() );
		var spacer = document.createTextNode(spaces);
		controlBar3.appendChild(spacer);
		var item = new ControlBarItem( "<font color='white'>White</font>", "white", targetTextArea );
		controlBar3.appendChild( item.create() );
		targetTextArea.parentNode.insertBefore( controlBar3, targetTextArea );
	}
}

function ControlBarItem(label,editCommand,targetTextArea){
	this.label = label;
	this.editCommand = editCommand;
	this.targetTextArea = targetTextArea;
	this.create = function(){
		var link = document.createElement("a");
		link.innerHTML = label;
		link.href = "javascript:;";
		link.style.marginRight = "8px;";
		link.editCommand = this.editCommand;
		link.targetTextArea = this.targetTextArea;
		link.execute = this.execute;
		link.tagSelection = this.tagSelection;
		addEvent(link,"click","execute");
		return link;	
	}
	
	this.execute = function(){
		switch(this.editCommand){
			case "italic":
				this.tagSelection("<i>","</i>");
				break;
			case "bold":
				this.tagSelection("<b>","</b>");
				break;
			case "underline":
				this.tagSelection("<u>","</u>");
				break;
			case "strikethrough":
				this.tagSelection("<s>","</s>");
				break;
			case "center":
				this.tagSelection("<center>","</center>");
				break;
			case "unordered list":
				this.tagSelection("<ul>","</ul>");
				break;
			case "ordered list":
				this.tagSelection("<ol>","</ol>");
				break;
			case "list item":
				this.tagSelection("<li>","</li>");
				break;
			case "arial":
				this.tagSelection("<font face='arial'>","</font>");
				break;
			case "garamond":
				this.tagSelection("<font face='garamond'>","</font>");
				break;
			case "georgia":
				this.tagSelection("<font face='georgia'>","</font>");
				break;
			case "tahoma":
				this.tagSelection("<font face='tahoma'>","</font>");
				break;
			case "times new roman":
				this.tagSelection("<font face='timesnewroman'>","</font>");
				break;
			case "verdana":
				this.tagSelection("<font face='verdana'>","</font>");
				break;
			case "red":
				this.tagSelection("<font color='red'>","</font>");
				break;
			case "blue":
				this.tagSelection("<font color='blue'>","</font>");
				break;
			case "green":
				this.tagSelection("<font color='green'>","</font>");
				break;
			case "yellow":
				this.tagSelection("<font color='yellow'>","</font>");
				break;
			case "orange":
				this.tagSelection("<font color='orange'>","</font>");
				break;
			case "purple":
				this.tagSelection("<font color='purple'>","</font>");
				break;
			case "white":
				this.tagSelection("<font color='white'>","</font>");
				break;
			case "full quotes":
				this.tagSelection("<quote>","</quote>");
				break;
			case "open quote":
				this.tagSelection("<quote>","");
				break;
			case "close quote":
				this.tagSelection("","</quote>");
				break;
			default:
				throw "Unknown command encountered";
		}
	}
	
	this.tagSelection = function(tagOpen,tagClose){	
		if (this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0){	
			//record scroll top to restore it later.
			var scrollTop = this.targetTextArea.scrollTop;
			// work around Mozilla Bug #190382
			if (this.targetTextArea.selectionEnd > this.targetTextArea.value.length){
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;
			this.targetTextArea.value = 
				this.targetTextArea.value.substring(0,selectionStart) + //text leading up to the selection start
				tagOpen + 
				this.targetTextArea.value.substring(selectionStart,selectionEnd) + //selected text
				tagClose + 
				this.targetTextArea.value.substring(selectionEnd); //text after the selection end
			this.targetTextArea.selectionStart = selectionStart + tagOpen.length;
			this.targetTextArea.selectionEnd = selectionEnd + tagOpen.length;
			this.targetTextArea.scrollTop = scrollTop;
		}	
	}
}

// == FUNCTIONS == //

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent(target,eventName,handlerName){
	target.addEventListener(eventName,function(e){target[handlerName](e);},false);
}