// ==UserScript==
// @name          Folders4Gmail Plus
// @namespace     http://www.CollectItStoreIt.com
// @description   Like F4G but with some LL4G.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

/*
 * Version 3.5.4  May 08, 2009
 * Written by Benjamin Paige III, Henrique G. Abreu
 * This script is Public Domain. You are welcome to use it in any way you like.
 * This script is derived from Arend v. Reinersdorff's Folders4Gmail.  See www.arend-von-reinersdorff.com.
 */

// Check for GreaseMonkey Api for compatibility with tools like GreaseMetal, etc - Ben Paige 2/2/09
var pilot_mode = false;
var searchBox = false;
var hideSpamCount = false;
if(typeof GM_registerMenuCommand == 'function')
{
	//*********SEARCHBOX*********
	GM_registerMenuCommand( 'LL4G > Alternate SearchBox', function() { setSearchBox() } );
	function setSearchBox() { GM_setValue( 'searchBox', !(false || GM_getValue('searchBox',false)) ); };
	searchBox = false || GM_getValue('searchBox',false);
	//*********-*********

	//*********PILOTMODE*********
	GM_registerMenuCommand( 'LL4G > Pilot Mode', function() { setPilotMode() } );
	function setPilotMode() { GM_setValue( 'pilot_mode', !(false || GM_getValue('pilot_mode',false)) ); };
	pilot_mode = false || GM_getValue('pilot_mode',false);
	//*********-*********

	//*********SPAM_COUNT*********
	GM_registerMenuCommand( 'LL4G > Hide Spam Count', function() { switchHideSpamCount() } );
	function switchHideSpamCount() { GM_setValue( 'spamCount', !(false || GM_getValue('spamCount',false)) ); };
	hideSpamCount = false || GM_getValue('spamCount',false);
	//*********-*********
}

//refresh is set only once, in the top frame
if(document.location == top.location){
(function(){
var prefix = window.parent.document.location.protocol + '//';

//*********FOLDER_VIEW AND APPS*********
var searchURL = prefix + 'mail.google.com' + top.location.pathname + '#search/';
var labelURL = prefix + 'mail.google.com' + top.location.pathname + '#label/';
var folderURL = prefix + 'mail.google.com' + top.location.pathname + '#';
//*********-*********
var metaClause = 'in%3A';

var systemLinks;
var systemLinksDiv;
//*********LINKS AND COLOR*********
var contactsLink;
var extraLinks;
var defaultColor;
//*********-*********

//select UI
var uiHandler = new uiHandler();

if(uiHandler){
    window.setInterval(uiHandler.refreshSublabels, 100);
    window.setInterval(uiHandler.reformatLabels, 100);
}

var refreshSublabelsDelay = 10;
var reformatLabelsDelay = 11;

var refreshSublabelsRun = true;
var reformatLabelsRun = true;
var loaded = false;

function GetParsedSystemLinkObj(systemLinkObj)
{
	return systemLinkObj.firstChild.firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
}

function GetSystemLink(labelName)
{
	switch(labelName)
	{
		case "Inbox":
			return GetParsedSystemLinkObj(systemLinks[0]);
			
		case "Starred":
			return GetParsedSystemLinkObj(systemLinks[1]);
			
		case "Chats":
			return GetParsedSystemLinkObj(systemLinks[2]);
			
		case "Sent":
			return GetParsedSystemLinkObj(systemLinks[3]);
			
		case "Drafts":
			return GetParsedSystemLinkObj(systemLinks[4]);
			
		case "All":
			return GetParsedSystemLinkObj(systemLinks[5]);
			
		case "Spam":
			return GetParsedSystemLinkObj(systemLinks[6]);
			
		case "Trash":
			return GetParsedSystemLinkObj(systemLinks[7]);
			
	}
}

function initSystemLinks(doc)
{	
	var divNodes = doc.getElementsByTagName("div");
	var i = 0;
	for(; i < divNodes.length; i++){
		if(/nH qj/.test(divNodes[i].className)){
			systemLinksDiv = divNodes[i];
			systemLinks = systemLinksDiv.firstChild.childNodes;
			break;
		}
	}
    //*********LINKS********* 
	if( contactsLink == null && doc.getElementById(':q7')) {
      contactsLink = doc.getElementById(':q7');
      contactsLink.style.paddingLeft='4px';
	    extraLinks = new Array();
    	extraLinks[0] = contactsLink;

        for(i++; i < divNodes.length; i++) {
            if(/qk/.test(divNodes[i].className) && divNodes[i].firstChild == contactsLink ) {//NIPHib - qk
                break;
            }
        }
        var j = 1;
        var k = false;
        for(i++; i < divNodes.length; i++) {
            if(/qk/.test(divNodes[i].className)) {//NIPHib - qk
                extraLinks[j] = divNodes[i].firstChild;
                j++;
            } else if(/py/.test(divNodes[i].className)) {//oggeve - py
                if( k ) {
                    break;
                } else {
                    k = true;
                }
            }
        }
    }
	//*********-*********
 	//*********COLOR*********
	divNodes = doc.getElementsByTagName("div");	
 	for(i = 0; i < divNodes.length; i++)
 	    if(/py/.test(divNodes[i].className) && (divNodes[i].childNodes[1].childNodes.length == 0) )//oggeve - py
    	    break;
 	for(i++; i < divNodes.length; i++)
 	    if(/p5 qa/.test(divNodes[i].className)) {//yyT6sf - p5 qa
    	    defaultColor = window.getComputedStyle(divNodes[i].firstChild,null).color;
    	    break;
    	}
    //*********-*********
}
//*********LINKS*********
function isSystemLink(labelName)
{
	return /(Inbox)|(Starred)|(Chats)|(Sent Mail)|(Drafts)|(All)|(Spam)|(Trash)/.test(labelName)
}
//*********-*********
function identifyLabelParentNode(doc) {

	var labelNodes = new Array(0);
	var tableNodes = doc.getElementsByTagName("table");
	for(var i = 0; i < tableNodes.length; i++){
		if(tableNodes[i].className == "cf pQ"
			&& tableNodes[i].firstChild
			&& tableNodes[i].firstChild.childNodes
		){
			tableNodes[i].id = "ll4g_labels";
			break;
		}//nb1Q2b - cf pQ
	}
}

function uiHandler(){

    //check if lables need to be updated
    this.refreshSublabels = function(){
		
		
		if(loaded)
		{
			if(refreshSublabelsRun)
			{
				if(refreshSublabelsDelay > 0)
				{
					refreshSublabelsDelay -= 1;
					return;
				}
				else
				{
					refreshSublabelsRun = false;
				}
			}
			else
			  return;
			}
		
      //label added, renamed, removed or labels recreated
      if(frames && frames[3] && !frames[3].document.getElementById("ll4g_labels")){
	  
				identifyLabelParentNode(frames[3].document);
	  
				if(frames[3].document.getElementById("ll4g_labels"))
				{
					initSystemLinks(frames[3].document);
					initLabels(frames[3].document);
					loaded = true;
				
					frames[3].document.addEventListener("click", function(){reformatLabelsRun = true; refreshSublabelsRun = true; reformatLabelsDelay = 11; refreshSublabelsDelay = 10} ,true);
				
					if(pilot_mode)
						systemLinksDiv.parentNode.style.display = "none";
				}
		}
		
		if(frames[3].document.getElementById("ll4g_labels"))
		{
	        //expand label and parent labels if user is in label view
	        var locationHash = window.location.hash;
	        //Firefox Bug, location.hash is decoded
	        if(location.href.indexOf(locationHash) >= -1){
	            locationHash = decodeURIComponent(locationHash);
	        }
	        if(locationHash.indexOf("#label/") != -1){
	            expandActiveLabel(locationHash.substring(7));
	        }else{
	            lastActiveLabelName = "";
	        }

	        //check for change in unread emails
	        for(var labelName in oldLabelMap){
	            if(oldLabelMap[labelName].className.indexOf("f4g_modified") == -1){
	                refreshUnreadCounts();
	                break;
	            }
	        }
		}
    };
	
this.reformatLabels = function()
{

	if(loaded)
	{
		if(reformatLabelsRun)
		{
			if(reformatLabelsDelay > 0)
			{
				reformatLabelsDelay -= 1;
				return;
			}
			else
			{
				reformatLabelsRun = false;
			}
		}
		else
		  return;
	}
	
	if(LL4G)
	{
		var divNodes = frames[3].document.getElementsByTagName("DIV");
		
		for(i = 0; i < divNodes.length; i++)
		{
			if("av" == divNodes[i].className)//krEW7c - av
			{
				divNodes[i].className += " ll4G_modified";
				var value = divNodes[i].innerHTML;
				
				if(isLL4g(value))
					divNodes[i].innerHTML = value.split(':')[0];
				else{
					var valueArr = value.replace("\\","/","g").split("/");
					divNodes[i].innerHTML = valueArr[valueArr.length-1];
				}
			}
		}
	}
};

    this.labelNodeIterator = function(doc){
	
		
		var labelNodes = frames[3].document.getElementById('ll4g_labels').firstChild.childNodes; 
				
        var iterator = function(nodes){
            this.labelNodes = nodes;
            this.index = 0;
            this.hasNext = function(){
                return (this.index < this.labelNodes.length);
            };
            this.next = function(){
                var labelNode = this.labelNodes[this.index].firstChild.firstChild.firstChild;
                this.index++;
                return labelNode;
            };
            this.revert = function(){
                this.index--;
            };
        };

        return new iterator(labelNodes);
    };

    this.getTitleNode = function(labelNode){
        return labelNode.firstChild;
    }

    this.getTextNode = function(labelNode){
        return labelNode;
    };


    this.hasUnreadMessages = function(labelNode){
        return labelNode.className.indexOf("qa") != -1;//PQmvpb - qa
    };

    this.addMissingParentNode = function(missingParentName, labelNode){
        var trNode    = labelNode.parentNode.parentNode.parentNode;
        var newTrNode = trNode.cloneNode(true);
            newTrNode.lastChild.removeAttribute("id");
            newTrNode.lastChild.style.visibility = "hidden";
        var domNode = newTrNode.firstChild.firstChild.firstChild;

            //prevent action on click
            domNode.id = "";


            domNode.firstChild.removeAttribute("href");

            //ensure not bold, not found by gmail macros
            domNode.className = "";
            domNode.style.paddingBottom = "4px";

            domNode.firstChild.firstChild.data = missingParentName;
            domNode.firstChild.style.cursor = "default";
            domNode.firstChild.style.textDecoration = "none";
        trNode.parentNode.insertBefore(newTrNode, trNode);
    };


    this.setDisplay = function(label, displayString){
        label.domNode.parentNode.parentNode.parentNode.parentNode.style.display = displayString;
    };
};


var highlightedLabelName = null;
var lastActiveLabelName  = "";
var labelMap        = new Object();
var oldLabelMap        = new Object();
var labelEditBoxMap = new Object();
var labelNameList   = new Array();
var fullLabelName;
var labelArr = new Array();
var dataURIs        = new Object();
var LL4G = false;
var labelLookup;
var divLookup;
    dataURIs[true]  = new Object();
    dataURIs[false] = new Object();
    //dataURIs[isExpanded][isHighlighted]
    //*********NEW IMAGES********
    dataURIs[true][true]   = "data:image/gif;base64,R0lGODlhDAAMAIABAISEhP///yH5BAEKAAEALAAAAAAMAAwAAAIUTICJdurtopwUsAstNrX7VzGTUQAAOw==";
    dataURIs[true][false]  = "data:image/gif;base64,R0lGODlhDAAMAIABAHt7e////yH5BAEKAAEALAAAAAAMAAwAAAIaTICJduwN3luS0XqiUjlvHWGdeFUaFnqbUQAAOw==";
    dataURIs[false][true]  = "data:image/gif;base64,R0lGODlhDAAMAIABAISEhP///yH5BAEKAAEALAAAAAAMAAwAAAIYTICJduqdjHtwAjmZrptZbF1VNo6UuQQFADs=";
	dataURIs[false][false] = "data:image/gif;base64,R0lGODlhDAAMAIABAHt7e////yH5BAEKAAEALAAAAAAMAAwAAAIdTICJduwN3GLT1BNptlEpjHndBmoSeaXNY2miUQAAOw==";
	
	powerSearchURI = new Object();
	powerSearchURI[true]  = "data:image/gif;base64,R0lGODlhDAAMAKECAJiYmMvLy////////yH5BAEKAAEALAAAAAAMAAwAAAIXjA+nCrncUJvU0Bux3vyG/lhR+DmkaRQAOw==";
	powerSearchURI[false] = "data:image/gif;base64,R0lGODlhDAAMAIABAJiYmP///yH5BAEKAAEALAAAAAAMAAwAAAIXRI4ZYJrc3IJyUgfvyxFxmVUa1mEVUgAAOw==";	
	
    //*********-*********

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function loadLabels(label, node, level)
{
	label.indentionLevel = level;
	level++;
	node.appendChild(label.getRowNode());
	
	label.displayEditBox();
	
	for(index in label.childLabels)
		loadLabels(label.childLabels[index], node, level);
		
	level--;
}

function clearLabels()
{
	for(index in labelArr)
	{
		var labelNode = labelArr[index].getRowNode();
		var parentNode = labelNode.parentNode;
		
		parentNode.removeChild(labelNode);
	}
}
	
function createLabels(labelName, relationMap, fullLabelMap, parentName)
{
	//create Label object and set properties
	var label =  new Label(labelName + parentName);
	
	label.fullLabelName = fullLabelMap[labelName];
	labelMap[label.id] = label;
	labelArr.push(label);
		
	var cloneNode = oldLabelMap[labelName].parentNode.parentNode.parentNode.cloneNode(true);
		
	label.setRowNode(cloneNode);
	
	var systemLink = GetSystemLink(labelName);
	
	if(systemLink)
		oldLabelMap[labelName] = systemLink;
	
	label.labelEditBox = labelEditBoxMap[labelName];
	label.labelFakeEditBox = label.labelEditBox.cloneNode(true);
	
	if(relationMap[labelName].length > 0)
	{
		var childLabels = relationMap[labelName].split(",");
		
		for(index in childLabels)
			label.addChild(createLabels(childLabels[index], relationMap, fullLabelMap, "~" + label.id));
	}
	return label;
}

function getTopLookupLabel(labelName)
{
	for(index in labelArr)
	{
		var label = labelArr[index];
	
		if(labelName == label.labelName)
		{
			return label;
		}
	}
}

var highlightedNode;

function highlightNode(node)
{
	unhighlightNode();
	
	if(node)
	{
		node.style.backgroundColor = '#EEEEEE';
		highlightedNode = node
	}
}

function unhighlightNode()
{
	if(highlightedNode)
	{
		highlightedNode.style.backgroundColor = '';
	}
}

function labelKeyPressed(e)
{
	if(e.keyCode == 13 && highlightedNode)
	{
		var label = getTopLookupLabel(highlightedNode.innerHTML);
		location.href = label.getHREF();
		labelLookup.value = '';
		divLookup.style.visibility = 'hidden';
		return;
	}
	
	if(e.keyCode == 40)
	{
		highlightNode(highlightedNode.nextSibling);
		return;
	}
	if(e.keyCode == 38)
	{
		highlightNode(highlightedNode.previousSibling);
		return;
	}
	divLookup.innerHTML = '';
	
	divLookup.style.visibility = '';

	var labelExp = new RegExp(labelLookup.value,"i");
	
	for(index in labelNameList)
	{
		var labelName = labelNameList[index];
		
		if(labelExp.test(labelName))
		{
			for(index2 in labelArr)
			{
				var label = labelArr[index2];
			
				if(labelName == label.labelName)
				{
					
					var anchor = document.createElement("a");
					anchor.href = label.getHREF();
					anchor.className = "LabelLookup";
					anchor.style.display = 'block';
					anchor.style.color = "#063";
					anchor.style.textDecoration = "none";
					anchor.style.height = "14px";
					anchor.innerHTML = label.labelName;
					divLookup.appendChild(anchor);
					break;
				}
			}
			
		}
	}
	
	highlightNode(divLookup.firstChild);
}

function createLabelLookup(labelBox)
{
	labelLookup = document.createElement("input");
    labelLookup.id = 'labelLookup';
	labelLookup.name = 'labelLookup';
	labelLookup.type = 'text';
	labelLookup.value = '';
	labelLookup.className = 'dI dG';//oPfZKb u4Qprd
	labelLookup.style.marginLeft = '2px';
	
	divLookup = document.createElement("div");
	divLookup.id = 'divLookup';
	divLookup.style.border = 'gray solid 1px';
	divLookup.style.position = 'absolute';
	divLookup.style.backgroundColor = 'white';
	divLookup.style.visibility = "hidden";
	divLookup.style.zIndex = "100";
	divLookup.style.minWidth = "100px";
	divLookup.style.maxHeight = "300px";
	divLookup.style.overflowY = "scroll";
	labelBox.firstChild.style.marginTop = '5px';
	labelBox.insertBefore(divLookup, labelBox.firstChild);
	labelBox.insertBefore(labelLookup, divLookup);
	
    labelLookup.addEventListener("keyup",   labelKeyPressed, false);
    divLookup.addEventListener("mouseout",   function(){divLookup.style.visibility='hidden'}, false);
    divLookup.addEventListener("mouseover",   function(){divLookup.style.visibility=''}, false);
    labelLookup.addEventListener("mouseout",   function(){this.nextSibling.style.visibility='hidden'}, false);
}

function isLL4g(labelName){
	if(/\/|\\/.test(labelName))
		return false;
	
	return true;
}

function getLL4gArray(labelName){
	if(!/^\?/.test(labelName))
	{
		fullLabelName = labelName;
		labelNameArr = labelName.split(":");
	}
	else
	{
		labelNameArr = labelName.split(":");
		fullLabelName = trim(labelNameArr[0].replace('?',''));
		if(labelNameArr[1])
			labelNameArr[1] = labelNameArr[1].replace('?','',"g");
	}
	
	return labelNameArr;
}

function getF4gArray(labelName){
	if(!/(\/|\\)?\?\w+$/.test(labelName))
	{
		fullLabelName = labelName;
		labelNameArr = labelName.replace('\\','/',"g").split("/");
	}
	else
	{
		labelNameArr = labelName.replace('\\','/',"g").split("/");
		var labelIndex = labelNameArr.length - 1;
		fullLabelName = trim(labelNameArr[labelIndex].replace('?',''));
		if(labelNameArr[labelIndex])
			labelNameArr[labelIndex] = '?' + labelNameArr[labelIndex];
	}
	return labelNameArr;
}

function initLL4g(labelName,labelNameArr,relationMap,displayMap)
{
	if(!relationMap[labelName])
		relationMap[labelName] = "";
		
	if(labelNameArr.length == 2)
	{
		var parents = labelNameArr[1].split(",");
		
		for(var i = 0; i < parents.length; i++)
		{
			var parentName = trim(parents[i]);
			if(!relationMap[parentName])
				relationMap[parentName] = labelName;
			else
				relationMap[parentName] += "," + labelName;
		}
	}
	
	if(labelNameArr.length == 1 || /\[top\]/i.test(labelNameArr[1]))
	{
		displayMap.push(labelName);
	}
}

function initF4g(labelName,labelNameArr,relationMap,displayMap)
{
	if(!relationMap[labelName])
		relationMap[labelName] = "";
		
	
	if(labelNameArr.length > 1)
	{
		for(var i = labelNameArr.length - 2; i >= 0; i--)
		{
			var parentName = trim(labelNameArr[i]);
			
			if(!relationMap[parentName])
				relationMap[parentName] = labelName;
			else
				if(relationMap[parentName].indexOf(labelName) == -1)
					relationMap[parentName] += "," + labelName;	

			labelName = parentName;	
		}
	}
	else
	{
		displayMap.push(labelName);
	}
}

//init labelMap and labelNameList, add expander and indention to nodes
function initLabels(doc){
	clearLabels();
    //set parentLabel and childLabels, create labelMap, labelNameList
    labelArr = new Array();
    labelNameList   = new Array();
	var relationMap = new Object();
	var displayMap = new Array();
	var fullLabelMap = new Object();
    var labelNodeIterator = uiHandler.labelNodeIterator(doc);
	var lastNode = null;
    while(labelNodeIterator.hasNext()){
        var labelNode = labelNodeIterator.next();
		var rowNode = labelNode.parentNode.parentNode.parentNode;
		
        var labelName = (labelNode.textContent) ? labelNode.textContent : labelNode.innerText;
		if(/LL4G/i.test(labelName))
		{
			LL4G = true;
			rowNode.style.display = "none";
							
			if(/pilot/i.test(labelName))
				pilot_mode = true;
				
			if(/search/i.test(labelName))
				searchBox = true;

			if(/spam/i.test(labelName))
				hideSpamCount = true;
				
			if(/circle/i.test(labelName)){	
				powerSearchURI[true]  = "data:image/gif,GIF89a%0C%00%0C%00%B3%00%00%FF%FF%FF%F9%F9%F9%F2%F2%F2%D9%D9%D9%B3%B3%B3%B2%B2%B2%AC%AC%AC%99%99%99%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%08%00%2C%00%00%00%00%0C%00%0C%00%00%041%10%C9a%CE1C%CAP%AD7%81%D4y%1F2%90%E8Ay%84%20%10%1F%19%00%40%90ZsM%8E%85%5B%7C%A7%9B%253B%194E%CBQc%EA%604%11%00%3B";
				powerSearchURI[false] = "data:image/gif,GIF89a%0C%00%0C%00%A2%00%00%FF%FF%FF%F9%F9%F9%DF%DF%DF%D9%D9%D9%AC%AC%AC%99%99%99%FF%FF%FF%00%00%00!%F9%04%05%14%00%06%00%2C%00%00%00%00%0C%00%0C%00%00%034h%3ATEC%A9%D0%9C%25A5%22%00%10%9B1%3C%81%E7Q%05St%A6'%3CN%DBZ%85l%3A%0D%DB%BE%10%D9%A2%91%0D%0B%F4%90Th%04%C9%A2%02%91%24%00%00%3B";
			}
				
			continue;
		}
		
        if(uiHandler.hasUnreadMessages(labelNode)){
            labelName = uiHandler.getTitleNode(labelNode).title;
		   labelName = stripLabelName(labelName);
        }
		
		//Hide all gmail labels
		rowNode.style.display = "none";
		
		var labelNameArr;
		var labelIndex = 0;
		var isF4g = false;
		
		if(isLL4g(labelName)){
			labelNameArr = getLL4gArray(labelName);
		}
		else{
			labelNameArr = getF4gArray(labelName);
			labelIndex = labelNameArr.length - 1
			isF4g = true;
		}
		
		labelName = trim(labelNameArr[labelIndex].replace('?',''));
		
		labelEditBoxMap[labelName] = rowNode.lastChild;
		rowNode.removeChild(labelEditBoxMap[labelName]);
		
		labelNameList.push(labelName);
		oldLabelMap[labelName] = labelNode;
		
		if(!isF4g)
			initLL4g(labelName,labelNameArr,relationMap,displayMap);
		else
			initF4g(labelName,labelNameArr,relationMap,displayMap);
		
		fullLabelMap[labelName] = fullLabelName;

		lastNode = labelNode;
    }
	if(!lastNode)
		return;
	
	for(index in displayMap)
	{
		var labelName = displayMap[index];
		
		createLabels(labelName, relationMap, fullLabelMap, "");
	}
		
	for(index in labelArr)
	{
		var label = labelArr[index];
		if(label.parentLabel == null)
		{
			loadLabels(label, labelNode.parentNode.parentNode.parentNode.parentNode, 1);
		}
	}
	
    //add expander and indention
    for(var i = labelArr.length-1; i >= 0; i--){
        var label = labelArr[i];
        var labelName = label.labelName;
        var indentionLevel = label.indentionLevel;
        
        if(label.childLabels.length > 0){
            var expanderNode = createExpandSign(doc, label.id);
            label.domNode.parentNode.insertBefore(expanderNode, label.domNode);

            //collapse labels
            label.isExpanded = !label.isExpanded;
            changeExpand({target : expanderNode});

            indentionLevel--;
        }

        var indentedNode = label.domNode;
        if(label.childLabels.length > 0){
            indentedNode = expanderNode;
        }
        indentedNode.style.marginLeft = "" + indentionLevel*14 + "px";
        label.domNode.style.width = "auto";
    }
	
	var labelBox = lastNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	// Move "Edit Labels" anchor to left
	labelBox.nextSibling.firstChild.style.cssFloat = "left";
	labelBox.nextSibling.firstChild.style.paddingLeft = '4px';
	
	//*********SEARCHBOX*********
	if( searchBox )
    	createLabelLookup(labelBox);
	//*********-*********
	
	var labelDiv = lastNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

	labelDiv.addEventListener("mouseout",   function(e){labelDiv.style.width = '';labelDiv.style.position = '';labelDiv.style.zIndex = '';}, false);
	labelDiv.addEventListener("mouseover",   function(e){if(labelDiv.clientHeight < 30) return; labelDiv.style.width = '350px';labelDiv.style.position = 'relative';labelDiv.style.zIndex = '100';}, false);

    //*********LINKS AND SPACING*********
  labelArr[0].labelFakeEditBox.parentNode.parentNode.parentNode.parentNode.style.paddingLeft = '0px';
	if(pilot_mode) {
		labelDiv.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild.firstChild.childNodes[2].innerHTML = 'Navigator';
		labelBox.parentNode.style.paddingBottom = '2px';
		var backColor = window.getComputedStyle(labelBox,null).backgroundColor;
		labelBox.nextSibling.style.backgroundColor = backColor;
		for( var i = extraLinks.length-1; i >= 0; i-- ) {
	      extraLinks[i].className = labelBox.nextSibling.className;
	      extraLinks[i].style.textDecoration = 'underline';
	      extraLinks[i].style.paddingTop = '0px';
	      extraLinks[i].style.backgroundColor = backColor;
		  labelBox.parentNode.insertBefore(extraLinks[i], labelBox.nextSibling);
		}
	}
    //*********-*********
}

function isDescendentElement(baseNode,node, levelMax)
{
	for(var i = 0; i < levelMax; i++)
	{
		if(baseNode == node || baseNode == node.parentNode)
			return true;
		else
			node = node.parentNode;
	}
	
	return false;
}

function gEncode(strValue) {
			return strValue.replace(/[ /\(\)]/g, "-").replace(/\\/g, "%5C");
} 

function getQueryLabel(label)
{
	return metaClause + gEncode(label.fullLabelName);
}

//Recursive function that builds a query string of all child labels
function AppendChildLabelClauses(parentLabel)
	{
		var queryString = "";
		
		for(index in parentLabel.childLabels)
		{
			var label = parentLabel.childLabels[index];
			
			queryString += "+OR+" + getQueryLabel(label) + AppendChildLabelClauses(label);
		}
		
		return queryString;
	}


//expand label in active view
function expandActiveLabel(labelName){
    var label = labelMap[labelName];
    if((labelName == lastActiveLabelName) || !label){
        return;
    }
    lastActiveLabelName = labelName;

    if(label.childLabels.length == 0){
        label = label.parentLabel;


    }
    while(label){
        if(!label.isExpanded){
            changeExpand({target : label.domNode.previousSibling});
        }
        label = label.parentLabel;
    }
}

function updateUnreadCount(label)
{	
		var textNode       = uiHandler.getTextNode(label.domNode);
		
		for(var j = 0; j < label.childLabels.length; j++){
			label.unreadCount += updateUnreadCount(label.childLabels[j]);
		}
	
		var unreadCount    = (label.unreadCount > 0) ? " ("+label.unreadCount +")" : "";
		textNode.innerHTML = label.labelName + unreadCount;
		textNode.title     = label.labelName + unreadCount;
		
		if(label.unreadCount > 0)
			textNode.style.fontWeight = "bold";
		else
			textNode.style.fontWeight = "normal";
		
		return label.unreadCount;
}

var runOnce = true;
//refreshes the label count in brackets for all labels
function refreshUnreadCounts(){
	
	
			for (var i = labelNameList.length-1; i >= 0; i--){
				for(index in labelArr)
				{
					var label = labelArr[index];
					
					//*********SPAM_COUNT*********
					if(label.labelName == labelNameList[i] && (label.labelName != "Spam" || !hideSpamCount ) )
					//*********-*********
					{
						var labelNode = oldLabelMap[labelNameList[i]];
						labelNode.className +=     " f4g_modified";
						var unreadCount = 0;
						
						if(runOnce && loaded && label.labelName == "Inbox")
						{
							runOnce = false;
						}
						
						if(uiHandler.hasUnreadMessages(labelNode)){
							var text = uiHandler.getTitleNode(labelNode).title;
							var regexResult = text.match(/\((\d+)\)$/);
							unreadCount = parseInt(regexResult[1]);
						}
						
						label.unreadCount = unreadCount;
					}
				}
			}
			
			for(index in labelArr)
			{
				var label = labelArr[index];
				
				if(label.parentLabel == null)
					updateUnreadCount(label);
			}
}


//label object
function Label(id){
    this.isExpanded = false;
	this.id = id;
	
    //set shortName
	this.fullLabelName = null;
	var labelNameArr = id.split("~");
    this.indentionLevel = 0;
	this.domNode = null;
	var rowNode = null;
	this.parentLabel = null;
	this.childLabels = new Array();
	
	this.unreadCount = 0;
	
	this.labelEditBox = null;
	this.labelFakeEditBox = null;
	
	var labelName = labelNameArr[0];
	this.labelName = labelName;
	
	if(labelNameArr.length > 0)
		this.parentLabel = labelNameArr[1];
	
	this.addChild = function(label)
	{
		this.childLabels.push(label);
	}
	
	this.setRowNode = function(node)
	{
		rowNode = node;
		
		rowNode.style.display = "";
	}
	
	this.getHREF = function()
	{
			return searchURL + getQueryLabel(this) + AppendChildLabelClauses(this);
	}
	
	this.labelURL = function()
	{
    	//********FOLDER_VIEW*********
		//return labelURL + getQueryLabel(this);
	    if( isSystemLink( this.fullLabelName ) )
	        return folderURL + this.fullLabelName.toLowerCase();
	    else
    		return labelURL + this.fullLabelName.replace('/','%2F','g');
		//*********-*********
	}


	this.getRowNode = function()
	{
		var node = rowNode.firstChild.firstChild.firstChild;
		//*********COLOR*********
				
        var styleColor = 'color:' + defaultColor;

		if(!defaultColor)
                   styleColor = '';

		var strLink = '<span style="cursor:pointer;'+styleColor +'">' + this.labelName + '</span>';

		//*********-*********

		node.innerHTML = strLink;
		
		if(this.childLabels.length > 0)
		{
		    //*********SEARCHBOX*********
		    node.innerHTML 	+= 	'<img style="margin-left:2px;vertical-align:middle;cursor:pointer"/>';
		}
		if( searchBox ) {
			node.innerHTML 	+= 	'<input type="text" class="dI dG" style="margin-left:10px; width:100px; height: 12px" onfocus="this.select()" value="" />';
		
	        var powerSearch = node.lastChild;	
	        var powerHREF = searchURL + "(" + getQueryLabel(this) + AppendChildLabelClauses(this) + ")";
	
	        powerSearch.addEventListener("keyup", function(e){if(e.keyCode == 13) location.href = powerHREF + "%20" + gEncode(powerSearch.value)}, false);
        }
        if( this.childLabels.length > 0 ) {
            if( searchBox )
    			addPowerListeners(node.lastChild.previousSibling, this.getHREF());
    		else
    		    addPowerListeners(node.lastChild, this.getHREF());
        }
	    //*********-*********
		
		node.firstChild.addEventListener("click",function(){partyStarter(oldLabelMap[stripLabelName(this.innerHTML)].firstChild)},true);
		
		this.domNode = node.firstChild;
		return rowNode;
	}
	
	this.displayEditBox = function()
	{
			
		if(!this.labelFakeEditBox.parentNode) {
			rowNode.insertBefore(this.labelFakeEditBox,rowNode.firstChild);
			
			//********SPACING*********
			this.labelFakeEditBox.style.paddingLeft = '0px';
			this.labelFakeEditBox.style.paddingRight = '3px';
			this.labelFakeEditBox.style.paddingTop = '2px';
			//*********-*********
		}
	}
}

//check for parent label
function isParentLabelOf(parentLabelName, labelName){
    parentLabelName = standardSeparator(parentLabelName).toLowerCase() + "/";
    labelName       = standardSeparator(labelName).toLowerCase();
    return (labelName.indexOf(parentLabelName) == 0);
}


//if the parent label is not the direct parent, create the next missing parent in the document
//for example ("a", a/b/c/d") -> create "a/b"
//the input must be a real parent label
function addMissingParent(parentLabelName, labelName, labelNode){
    labelNameEscaped       = standardSeparator(labelName);
    var parentNameLenth    = (parentLabelName) ? parentLabelName.length+1 : 0;
    var missingParentLimit = labelNameEscaped.indexOf("/", parentNameLenth);
    var missingParentName  = (missingParentLimit > 0) ? labelName.substring(0, missingParentLimit) : null;

    if(missingParentName){
        uiHandler.addMissingParentNode(missingParentName, labelNode);
    }

    return missingParentName;
}



//create a new expand sign
function createExpandSign(doc, labelName){
    var expNode = doc.createElement("img");
        expNode.style.cssFloat    = "left";
        expNode.style.styleFloat  = "left"; //float for Internet Explorer
        expNode.style.marginTop   = "2px";
        expNode.style.marginRight = "2px";
        expNode.style.marginLeft  = "0px";
        expNode.style.cursor      = "pointer";

        //fix Gmail Super Clean skin
        expNode.style.display     = "block";

    //set events

    if(expNode.addEventListener){
        expNode.addEventListener("click",     changeExpand,    false);
        expNode.addEventListener("mouseover", highlightAction, false);
        expNode.addEventListener("mouseout",  highlightAction, false);
    }
    //for Internet Explorer
    else if(expNode.attachEvent){
        expNode.attachEvent("onclick",     changeExpand);
        expNode.attachEvent("onmouseover", highlightAction);
        expNode.attachEvent("onmouseout",  highlightAction);
    }

    expNode.setAttribute("labelName", labelName);

    return expNode;
}


//event for a click on an expander
function changeExpand(evt){
    //srcElement for Internet Explorer
    var expanderNode  = (evt.target) ? evt.target : evt.srcElement;
    var labelName     = expanderNode.getAttribute("labelName");
    var label         = labelMap[labelName];
    var isHighlighted = (labelName == highlightedLabelName);
    label.isExpanded = !label.isExpanded;
    expanderNode.src = dataURIs[label.isExpanded][isHighlighted];
    var displayString = (label.isExpanded) ? "" : "none";

    //change display of child labels
    var changeDisplayed = new Array(label);
    while(changeDisplayed.length > 0){
        var changedLabel = changeDisplayed.pop();
        for(var i = 0; i < changedLabel.childLabels.length; i++){
            var childLabel = changedLabel.childLabels[i];
            if(childLabel.isExpanded)
                changeDisplayed.push(childLabel);
				
            uiHandler.setDisplay(childLabel, displayString);
        }
    }
}


//convert separators that don't make sense to spaces
function standardSeparator(labelName){
    //converts the legacy separator "\" to "/"
    labelName = labelName.replace(/\\/g, "/");

    //convert "//" to "/ "
    var regexp = new RegExp("(/+)/");
    while(regexp.test(labelName)){
        labelName = labelName.replace(regexp, "$1 ");
    }

    //convert leading and trailing "/" to " "
    labelName = labelName.replace(new RegExp("^/"), " ");
    labelName = labelName.replace(new RegExp("/$"), " ");

    return labelName;
}


//mouse hover event
function highlightAction(evt){
    //srcElement for Internet Explorer
    var expanderNode  = (evt.target) ? evt.target : evt.srcElement;
    var labelName     = expanderNode.getAttribute("labelName");
    var isExpanded    = labelMap[labelName].isExpanded;
    var isHighlighted = (highlightedLabelName == labelName);

    highlightedLabelName = (isHighlighted) ? "" : labelName;
    expanderNode.src   = dataURIs[isExpanded][!isHighlighted];
}

function addPowerListeners(powerNode, href)
{
	powerNode.src = powerSearchURI[false];
    if(powerNode.addEventListener){
        powerNode.addEventListener("click",     function(){location.href = href},    false);
        powerNode.addEventListener("mouseover", function(){powerNode.src = powerSearchURI[true]}, false);
        powerNode.addEventListener("mouseout",  function(){powerNode.src = powerSearchURI[false]}, false);
    }
}

})(); //end anonymous function
} //end if

 
function partyStarter(conan) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  conan.dispatchEvent(evt);
}

function stripLabelName(labelName) {
	if(/.+\(\d+\)/.test(labelName) ){
	   var limit = labelName.lastIndexOf(" ");
	   return labelName.substring(0, limit);
   }
   
   return labelName;
}