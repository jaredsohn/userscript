// Copyright (C) 2008 Manuel F. <mf@find-the-flow.com>
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version. 
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of 
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// ==UserScript==
// @name           Universal Adblock and Website Modification Tool
// @description    Not only removes all web site elements you would like to get rid of, but also gives you the power to set unlimited styles on a website of your choice via XML! Will be expanded to your personal website skinning platform... What do you think of that?
// @include        *.*
// ==/UserScript==

/* global vars - change it if you want to take your own config file */
var serverURL="http://data.usability-online.com/adblock/";
var configFile="universaladblock.xml";

/* if you have no clue of DHTML - do not touch the rest!!! */
var adblock; 

(function () {
	function Adblock(){
		if(adblock==null){
			this.domains;
			this.styles;
			if(GM_getValue("domains")){
				this.domainCache=GM_getValue("domains").split("|");
				this.processCached();
			}
			this.toRemove=new Array();
			this.notToRemove=new Array();
			this.requestAdblockConfig();
			this.nameSpace=(navigator.userAgent.indexOf("Firefox/3")>-1?"adb:":"");
		}
	}
	Adblock.prototype.requestAdblockConfig=function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: serverURL+configFile,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails) {
				var adblockConfigStr=responseDetails.responseText;
				if(adblockConfigStr.length==0){
					e="XML file to be located at "+serverURL+configFile+" could not be loaded!";
					throw e;
				}else{
					var parser = new DOMParser();
					var adblockConfigXML = parser.parseFromString(adblockConfigStr, "text/xml");
					var roottag = adblockConfigXML.documentElement;
					if ((roottag.tagName == "parserError") ||
					    (roottag.namespaceURI == "http://www.mozilla.org/newlayout/xml/parsererror.xml")){
						e="XML document could not be parsed.\n"+adblockConfigStr;
						throw e;
					}
					var domains=adblockConfigXML.getElementsByTagName(adblock.nameSpace+"domain");
					if(domains.length==0){
						e="Domain definitions could not be found.\n"+adblockConfigStr;
						throw e;
					}else{
						adblock.processXML(domains);
					}
				}
			}
		});
	}
	Adblock.prototype.addStyles=function(style,DOMNode) {
		var cssStatements=style.getElementsByTagName(this.nameSpace+"css");
		var styleName=style.getAttributeNode("name").value;
		if(styleName=="inline"&&DOMNode){
			var cssStatement="";
			//addClass(DOMNode,"GM_inline");
			for(var i=0;i<cssStatements.length;i++){
				try{
					cssStatement+=cssStatements[i].getAttributeNode("rule").value+":"+cssStatements[i].getAttributeNode("value").value+";";
				}catch(ex){}
			}
			try{
				DOMNode.setAttribute("style",cssStatement);
			}catch(ex){}
		}else{
			for(var i=0;i<cssStatements.length;i++){
				try{
					GM_addStyle(styleName+" {"+cssStatements[i].getAttributeNode("rule").value+":"+cssStatements[i].getAttributeNode("value").value+";}");
				}catch(ex){}
			}
		}
	}
	Adblock.prototype.processAdblock=function() {
		for (var i = 0; i < this.toRemove.length; i++) {
			for (var j = 0; j < this.notToRemove.length; j++) {
				if(this.toRemove[i].isSameNode(this.notToRemove[j])){
					emptyNode=document.createElement("div");
					this.toRemove[i]=emptyNode;
				}
			}
			try{
				removeNode(this.toRemove[i]);	// hide it!
			}catch(err){}
		}
	}
	Adblock.prototype.processCached=function() {
		for(var i=0;i<this.domainCache.length;i++){
			var currDomainURL=this.domainCache[i].split(" ")[0];
			var currDomainName=this.domainCache[i].split(" ")[1];
			var currSiteURLRexp=new RegExp((currDomainURL.replace(/\*/g, "\\w*")));
			if(currSiteURLRexp.test(window.location)){
				if(GM_getValue(currDomainName)){
					this.removeCachedNodes(GM_getValue(currDomainName).split("|"));
				}
				if(GM_getValue(currDomainName+".style")){
					this.setCachedStyles(GM_getValue(currDomainName+".style").split("|"));
				}
			}
		}
	}
	Adblock.prototype.removeCachedNodes=function(nodeArray) {
		for(var i=0;i<nodeArray.length;i++){
			var nodeParams=nodeArray[i].split("&");
			var domNodes=getElements(document,nodeParams[0],(nodeParams[1]=="null"?null:nodeParams[1]),(nodeParams[2]=="null"?null:nodeParams[2]),
					(nodeParams[3]=="null"?null:nodeParams[3]),(nodeParams[4]=="null"?null:nodeParams[4]),(nodeParams[5]=="null"?null:nodeParams[5]));
			for(var j=0;j<domNodes.length;j++){
				removeNode(domNodes[j]);
			}
		}
	}
	Adblock.prototype.setCachedStyles=function(styleArray) {
		for(var i=0;i<styleArray.length;i++){
			var styleName=styleArray[i].split("//")[0];
			var styleDefinitions=styleArray[i].split("//")[1].split("/");
			var styleExpr=new String();
			for(var j=0;j<styleDefinitions.length;j++){
				styleExpr+=styleDefinitions[j]+";";
			}
			GM_addStyle(styleName+" {"+styleExpr+";}");
		}
	}
	Adblock.prototype.addElements=function(DOMElement){
		var scope=document;		// no influence of setting scope via XML!
		var nodeName=DOMElement.getAttributeNode("nodeName")?DOMElement.getAttributeNode("nodeName").value:null;
		var attType=DOMElement.getAttributeNode("attType")?DOMElement.getAttributeNode("attType").value:null;
		var attName=DOMElement.getAttributeNode("attName")?DOMElement.getAttributeNode("attName").value:null;
		var xPathExpr1=DOMElement.getAttributeNode("xPathExpr1")?DOMElement.getAttributeNode("xPathExpr1").value:null;
		var strToFind=DOMElement.getAttributeNode("strToFind")?DOMElement.getAttributeNode("strToFind").value:null;
		var xPathExprSuffix=DOMElement.getAttributeNode("xPathExprSuffix")?DOMElement.getAttributeNode("xPathExprSuffix").value:null;
		var nodes=getElements(scope,nodeName,attType,attName,xPathExpr1,strToFind,xPathExprSuffix);
		if(DOMElement.parentNode.parentNode.nodeName=="adb:include"){
			if(nodes[0]){
				for(var i=0;i<nodes.length;i++){
					try{
						if(nodes[i].nodeName){
							this.toRemove.push(nodes[i]);
						}
					}catch(ex){}
				}
			}
		}
		else if(DOMElement.parentNode.parentNode.nodeName=="adb:exclude"){
			if(nodes[0]){
				for(var j=0;j<nodes.length;j++){
					try{
						if(nodes[j].nodeName){
							this.notToRemove.push(nodes[j]);
						}
					}catch(ex){}
				}
			}
		}
		else if(DOMElement.parentNode.parentNode.nodeName=="adb:addstyle"){
			if(nodes[0]){
				for(var k=0;k<nodes.length;k++){
					try{
						if(nodes[k].nodeName){
							if(DOMElement.getElementsByTagName(this.nameSpace+"style")[0]){
								this.addStyles(DOMElement.getElementsByTagName(this.nameSpace+"style")[0],nodes[k]);
							}
						}
					}catch(ex){}
				}
			}
		}
	}

	Adblock.prototype.processXML=function(domains) {
		this.domains=domains;
		var domainnames=new String();
		for(var i=0;i<domains.length;i++){
			var domainpatterns=new String();
			var dstylepatterns=new String();
			var currSiteURL=this.domains[i].getAttributeNode("URL").value;
			var currSiteName=this.domains[i].getAttributeNode("name").value;
			var currSiteURLRexp=new RegExp((currSiteURL.replace(/\*/g, "\\w*")));
			if(currSiteURLRexp.test(window.location)){
				var DOMElements=domains[i].getElementsByTagName(this.nameSpace+"DOMElement");
				var styles=domains[i].getElementsByTagName(this.nameSpace+"style");
				for(var j=0;j<DOMElements.length;j++){
					this.addElements(DOMElements[j]);
					if(DOMElements[j].parentNode.parentNode.nodeName=="adb:include"&&currSiteName!="all"){
						var pattern=DOMElements[j].getAttributeNode("nodeName").value
							+(DOMElements[j].getAttributeNode("attType")?("&"+DOMElements[j].getAttributeNode("attType").value):"&null")
							+(DOMElements[j].getAttributeNode("attName")?("&"+DOMElements[j].getAttributeNode("attName").value):"&null")
							+(DOMElements[j].getAttributeNode("xPathExpr1")?("&"+DOMElements[j].getAttributeNode("xPathExpr1").value):"&null")
							+(DOMElements[j].getAttributeNode("strToFind")?("&"+DOMElements[j].getAttributeNode("strToFind").value):"&null")
							+(DOMElements[j].getAttributeNode("xPathExprSuffix")?("&"+DOMElements[j].getAttributeNode("xPathExprSuffix").value):"&null");
						if(domainpatterns.length>0){
							domainpatterns+=("|"+pattern);
						}else{
							domainpatterns+=pattern;
						}
					}
				}
				for(var k=0;k<styles.length;k++){
					var stylepattern=styles[k].getAttributeNode("name").value+"/";
					var stylerules=styles[k].getElementsByTagName(this.nameSpace+"css");
					if(stylepattern!="inline"&&stylerules){
						for(var l=0;l<stylerules.length;l++){
							stylepattern+=("/"+stylerules[l].getAttributeNode("rule").value+":"+stylerules[l].getAttributeNode("value").value);
						}
						if(dstylepatterns.length>0){
							dstylepatterns+=("|"+stylepattern);
						}else{
							dstylepatterns+=stylepattern;
						}
					}
					this.addStyles(styles[k]);
				}
				if(dstylepatterns.length>0){
					GM_setValue(currSiteName+".style",dstylepatterns);
				}
				if(domainpatterns.length>0){
					GM_setValue(currSiteName,domainpatterns);
				}
			}
			if(domains[i].parentNode.nodeName=="adb:include"&&domainnames.length>0&&currSiteName!="all"){
				domainnames+=("|"+currSiteURL+" "+currSiteName);
			}else if(domains[i].parentNode.nodeName=="adb:include"&&currSiteName!="all"){
				domainnames+=currSiteURL+" "+currSiteName;
			}
		}
		if(domainnames.length>0){
			GM_setValue("domains",domainnames);
		}
		this.processAdblock();
	}
	adblock=new Adblock();
	unsafeWindow.adblock=adblock;
})();

/* Function removeNode():void
  * @param elem:DOM-Element (required) - that's the node you want to get rid off!
  */
function removeNode(elem){
	elem.parentNode.removeChild(elem);
}

String.prototype.contains = function(t) { return this.indexOf(t) >= 0 ? true : false }

/* Function getElements():ORDERED_NODE_SNAPSHOT
  * @param scope:DOM-Element (required) - that's the context Node (e.g. document, iFrame where you want to look for your specific node
  * @param nodeName:String (required) - the nodeName (e.g. "div", "span" etc.) of the node you want to take care of
  * @params attType:String, attName:String (optional) - attribute-type (e.g. "id", "class") and attribute-content
  * @param xPathExpr1:String, strToFind:String (optional) - xPathExpr1 is where you want to find strToFind
  * @param xPathExprSuffix:String (optional) - suffix expression...
  * @returns Array filled with DOM-nodes
  */
function getElements(scope,nodeName,attType,attName,xPathExpr1,strToFind,xPathExprSuffix){
	var xPathExpr="//";
	if(nodeName)xPathExpr+=nodeName;
	if(attType&&attName)
		xPathExpr+="[starts-with(@"+attType+",'"+attName+"')]";
	if(xPathExpr1&&strToFind)
		xPathExpr+="[contains("+xPathExpr1+",'"+strToFind+"')]";
	if(xPathExprSuffix)
		xPathExpr+=xPathExprSuffix;
	var xPathEval=document.evaluate(xPathExpr, scope, null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var result=new Array;
	for (var i = 0; i < xPathEval.snapshotLength; i++) {
		result.push(xPathEval.snapshotItem(i));	// push it!
	}
	return result;
}

function addClass(DOMNode, value) {
	if (!DOMNode.getAttributeNode("class")) {
		DOMNode.setAttribute("class",value);
	} else {
		var newClassName = DOMNode.getAttributeNode("class").value;
		newClassName += " ";
		newClassName += value;
		DOMNode.getAttributeNode("class").value = newClassName;
	}
}