// ==UserScript==
// @name          Folders4Gmail for Gmail Redesigned 2.0
// @namespace     http://www.arend-von-reinersdorff.com/folders4gmail/
// @description   Organize your labels in a folder-like hierarchy.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==


/*
 * Modified from 1.36 on 21 July 2008
 * Changes made by St. John Johnson
 *
 * Version 1.36, 17. April 2008
 * Written by Arend v. Reinersdorff, www.arend-von-reinersdorff.com
 * This script is Public Domain. You are welcome to use it in any way you like.
 */

//refresh is set only once, in the top frame
if(document.location == top.location){
(function(){

//select UI
var uiHandler;
if(document.getElementById("canvas_frame")){
    uiHandler = new ui2Handler();
}else if(1 == document.getElementsByTagName("frameset").length){
    uiHandler = new ui1Handler();
}

if(uiHandler){
    window.setInterval(uiHandler.refreshSublabels, 100);
}

function ui2Handler(){

    //check if lables need to be updated
    this.refreshSublabels = function(){
        //label added, renamed, removed or labels recreated
        if(!frames[3].document.getElementById("nb1Q2b")){
            initLabels(frames[3].document);
        }

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
        for(var labelName in labelMap){
            if(labelMap[labelName].domNode.className.indexOf("f4g_modified") == -1){
                refreshUnreadCounts();
                break;
            }
        }
    };

    this.labelNodeIterator = function(doc){
        var labelNodes = new Array(0);
        var divNodes = doc.getElementsByTagName("div");
        for(var i = 0; i < divNodes.length; i++){
            if(divNodes[i].className == "nb1Q2b"
                && divNodes[i].firstChild
                && divNodes[i].firstChild.firstChild
                && divNodes[i].firstChild.firstChild.firstChild
                && divNodes[i].firstChild.firstChild.firstChild.childNodes
            ){
                divNodes[i].id = "nb1Q2b";
                labelNodes = divNodes[i].firstChild.firstChild.firstChild.childNodes;
                break;
            }
        }

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


    this.getTextNode = function(labelNode){
        return labelNode.firstChild;
    };


    this.hasUnreadMessages = function(labelNode){
        return labelNode.className.indexOf("PQmvpb") != -1;
    };


    this.addMissingParentNode = function(missingParentName, labelNode){
        var trNode    = labelNode.parentNode.parentNode.parentNode;
        var newTrNode = trNode.cloneNode(true);
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
        label.domNode.parentNode.parentNode.parentNode.style.display = displayString;
    };
};


function ui1Handler(){

this.lastIframeId = "";
    //check if the sublabels need to be recreated after a reload
    this.refreshSublabels = function(){

        //find active iframe
        var doc;
        for (var i = 0; i <= 3; i++){
            if(!frames[0] || !frames[0].frames[i]){
                return;
            }

            var iframeNode = frames[0].document.getElementById("v" + (i+1));
            if(iframeNode.style.left.indexOf("0") == 0){
                doc = frames[0].frames[i].document;
                break;
            }
        }

        if(doc){
            var editNode = doc.getElementById("prf_l");
            if(editNode && (!editNode.title)){
                editNode.title = editNode.firstChild.data;
                initLabels(doc);
                refreshUnreadCounts();
            }

            //expand label and parent labels if user is in label view
            var noLabelFound = true;
            for(var labelName in labelMap){
                if(doc.getElementById("ac_rc_" + labelName)){
                    expandActiveLabel(labelName);
                    noLabelFound = false;
                    break;
                }
            }
            if(noLabelFound){
                lastActiveLabelName = "";
            }
        }
    };


    this.labelNodeIterator = function(doc){
        var labelNodes  = new Array(0);
        var editNode = doc.getElementById("prf_l");
        if(editNode){
            labelNodes = editNode.parentNode.childNodes;
        }

        var iterator = function(nodes){
            this.labelNodes = nodes;
            this.index = 0;
            this.hasNext = function(){
                return (this.index < this.labelNodes.length-1);
            };
            this.next = function(){
                var labelNode = this.labelNodes[this.index];
                this.index++;
                return labelNode;
            };
            this.revert = function(){
                this.index--;
            };
        };
        return new iterator(labelNodes);
    };


    this.getTextNode = function(labelNode){
        var textNode = labelNode;
        if(this.hasUnreadMessages(labelNode)){
            textNode = textNode.firstChild;
        }
        return textNode;
    };


    this.hasUnreadMessages = function(labelNode){
        return labelNode.firstChild.nodeName == "B";
    };


    this.addMissingParentNode = function(missingParentName, labelNode){
        var domNode = labelNode.cloneNode(true);
            domNode.id = "f4_" + missingParentName;
            domNode.style.cursor = "default";
            domNode.style.textDecoration = "none";

        var textNode = domNode.firstChild;

        //ensure not bold
        if(this.hasUnreadMessages(domNode)){
            var textNode = textNode.firstChild;
            domNode.removeChild(domNode.firstChild);
            domNode.appendChild(textNode);
        }

        textNode.data = missingParentName
        labelNode.parentNode.insertBefore(domNode, labelNode);
    };


    this.setDisplay = function(label, displayString){
        label.domNode.style.display = displayString;
        if(label.childLabels.length > 0){
            //fix Gmail Super Clean skin
            if(displayString == ""){
                displayString = "block";
            }

            label.domNode.previousSibling.style.display = displayString;
        }
    };
};


var highlightedLabelName = null;
var lastActiveLabelName  = "";
var labelMap        = new Object();
var labelNameList   = new Array();
var dataURIs        = new Object();
    dataURIs[true]  = new Object();
    dataURIs[false] = new Object();
    //dataURIs[isExpanded][isHighlighted]
    dataURIs[true][true]   = "data:image/gif;base64,R0lGODlhDAAQAKIAAPLiAPfTAPzEAP+6AERGSUNGSUJFSgAAACH5BAAHAP8ALAAAAAAMABAAAAMZaLrc/jDKKYe9w4m9CXFBWIwPUFBoqq5NAgA7";
    dataURIs[true][false]  = "data:image/gif;base64,R0lGODlhDAAQAIAAANGYAEJFSiH5BAAHAP8ALAAAAAAMABAAAAIRjI+py+3vgJxA0bpmhLz7rxQAOw==";
    dataURIs[false][true]  = "data:image/gif;base64,R0lGODlhDAAQAKIAAPLiAPfTAPzEAP+6AENGSUNFSkJFSgAAACH5BAAHAP8ALAAAAAAMABAAAAMZaLrc/jDCQeQQdYqQ3Q2AFkSXVUhoqq5NAgA7";
    dataURIs[false][false] = "data:image/gif;base64,R0lGODlhDAAQAIAAANGYAEJFSiH5BAAHAP8ALAAAAAAMABAAAAIUjI+py83gAoBt0mVvslUrH4XiGBUAOw==";


//init labelMap and labelNameList, add expander and indention to nodes
function initLabels(doc){

    //set parentLabel and childLabels, create labelMap, labelNameList
    var newLabelMap = new Object();
    var labelStack  = new Array();
    labelNameList   = new Array();
    var labelNodeIterator = uiHandler.labelNodeIterator(doc);
    while(labelNodeIterator.hasNext()){
        var labelNode = labelNodeIterator.next();
        var labelName = (labelNode.textContent) ? labelNode.textContent : labelNode.innerText;
        if(uiHandler.hasUnreadMessages(labelNode)){
            var limit = labelName.lastIndexOf(" ");
            labelName = labelName.substring(0, limit);
        }

        //look for a parent on the stack
        var parentLabelName = null;
        while(labelStack.length > 0){
            var stackLabelName = labelStack.pop();
            if(isParentLabelOf(stackLabelName, labelName)){
                labelStack.push(stackLabelName);
                parentLabelName = stackLabelName;
                break;
            }
        }

        //if a missing parent was inserted into the document,
        //start the loop again at the position of the inserted parent
        if(addMissingParent(parentLabelName, labelName, labelNode)){
            labelNodeIterator.revert();
            continue;
        }

        //create Label object and set properties
        var label = (labelMap[labelName]) ? labelMap[labelName] : new Label(labelName);
        label.reset(labelNode);
        if(parentLabelName){
            var parentLabel = newLabelMap[parentLabelName];
            parentLabel.childLabels.push(label);
            label.parentLabel = parentLabel;
        }

        //update collections
        newLabelMap[labelName] = label;
        labelStack.push(labelName);
        labelNameList.push(labelName);
    }
    labelMap = newLabelMap;

    //add expander and indention
    for(var i = labelNameList.length-1; i >= 0; i--){
        var labelName = labelNameList[i];
        var label = labelMap[labelName];
        var indentionLevel = label.indentionLevel;
        if(label.childLabels.length > 0){
            var expanderNode = createExpandSign(doc, labelName);
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


//refreshes the label count in brackets for all labels
function refreshUnreadCounts(){
    var labelsToUpdate = new Object();

    //from bottom to top
    for (var i = labelNameList.length-1; i >= 0; i--){
        var label = labelMap[labelNameList[i]];

        //if label is modified
        if(label.domNode.className.indexOf("f4g_modified") == -1){
           label.domNode.className +=     " f4g_modified";

            if(uiHandler.hasUnreadMessages(label.domNode)){
                var text = (label.domNode.textContent) ? label.domNode.textContent : label.domNode.innerText;
                var regexResult = text.match(/\((\d+)\)$/);
                label.normalUnreadCount = parseInt(regexResult[1]);
            }else{
                label.normalUnreadCount = 0;
            }

            labelsToUpdate[label] = true;
        }

        //if label must be updated
        if(labelsToUpdate[label]){
            labelsToUpdate[label.parentLabel] = true;

            label.summedUnreadCount = label.normalUnreadCount;
            for(var j = 0; j < label.childLabels.length; j++){
                label.summedUnreadCount += label.childLabels[j].summedUnreadCount;
            }

            var textNode       = uiHandler.getTextNode(label.domNode);
            var unreadCount    = (label.summedUnreadCount) ? " ("+label.summedUnreadCount +")" : "";
            textNode.innerHTML = label.htmlName + unreadCount;
            textNode.title     = labelNameList[i] + unreadCount;
        }
    }
}


//label object
function Label(fullLabelName){
    this.isExpanded = false;

    //set shortName
    labelName           = standardSeparator(fullLabelName);
    this.indentionLevel = labelName.split("/").length;
    var nameIndex       = labelName.lastIndexOf("/") + 1;
    labelName           = labelName.substring(nameIndex);
    labelName           = labelName.replace(/^ *([^ ].*)$/, "$1");
    labelName           = labelName.replace(/^(.*[^ ]).*$/, "$1");
    labelName           = labelName.replace(/^ +$/, "");

    //set htmlName, fixes Gmail Macros
    var nameStarts = fullLabelName.indexOf(labelName);
    //empty shortName
    if(labelName == ""){
        this.htmlName = "<span style=\"display:none\">" + fullLabelName + "</span>"
                      + "\u00A0";
    }else{
        this.htmlName = "";
        if(nameStarts > 0){
            this.htmlName += "<span style=\"display:none\">" + fullLabelName.substring(0, nameStarts) + "</span>"
        }

        this.htmlName += labelName;
        var postIndex = nameStarts + labelName.length < fullLabelName.length;
        if(postIndex){
            this.htmlName + "<span style=\"display:none\">" + fullLabelName.substring(postIndex) + "</span>";
        }
    }

    //for properties that change after label box redraw
    this.reset = function(domNode){
        this.domNode     = domNode;
        this.parentLabel = null;
        this.childLabels = new Array();
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
            if(childLabel.isExpanded){
                changeDisplayed.push(childLabel);
            }
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


})(); //end anonymous function
} //end if