// ==UserScript==
// @name          Folders4Gmail+Folders2Top
// @namespace     http://bert.wesarg.googlepages.com/
// @description   Folders4Gmail + Unread folders on top
// @version       1.41 2009-03-03
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

/*
 * Written by Arend v. Reinersdorff, arend-von-reinersdorff.com
 * This script is Public Domain. You are welcome to use it in any way you like.
 *
 * Folders2Top by bert.wesarg@googlemail.com
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
        if(!frames[3].document.getElementById("f4g_style")){
            appendStandardStyleTag(frames[3].document);
        }

        //label added, renamed, removed or labels recreated
        if(!frames[3].document.getElementById("f4g_labels")){
            initLabels(frames[3].document);
        }

        if(window.location.href.indexOf("#label/") != -1){
            var locationHash = window.location.href.replace(/^[^#]+(#.*)$/, "$1");
            locationHash = locationHash.replace("+", " ");
            locationHash = decodeURIComponent(locationHash);
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
        var tableNodes = doc.getElementsByTagName("table");
        for(var i = 0; i < tableNodes.length; i++){
            if(tableNodes[i].className == "cf pQ"
                && tableNodes[i].firstChild
                && tableNodes[i].firstChild.childNodes
            ){
                tableNodes[i].id = "f4g_labels";
                labelNodes = tableNodes[i].firstChild.childNodes;
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

    this.getFullName = function(labelNode){
        return labelNode.firstChild.title;
    }

    this.getTitleNode = function(labelNode){
        return labelNode.firstChild;
    }

    this.getTextNode = function(labelNode){
        return labelNode.firstChild;
    };


    this.hasUnreadMessages = function(labelNode){
        return labelNode.className.indexOf("qa") != -1;
    };


    this.addMissingParentNode = function(missingParentName, labelNode){
        var trNode    = labelNode.parentNode.parentNode.parentNode;
        var newTrNode = trNode.cloneNode(true);
            newTrNode.className += " f4g_fake";
            newTrNode.lastChild.style.visibility = "hidden";
        var domNode = newTrNode.firstChild.firstChild.firstChild;
            domNode.style.paddingBottom = "4px";

            //prevent action on click
            domNode.id = "";
            domNode.firstChild.removeAttribute("href");

            //ensure not bold, not found by gmail macros
            domNode.className = "";

            domNode.firstChild.title = missingParentName;
        trNode.parentNode.insertBefore(newTrNode, trNode);
    };


    this.setDisplay = function(label, displayString){
        label.domNode.parentNode.parentNode.parentNode.style.display = displayString;
    };

    this.restoreLabelOrder = function(){
        for (var i = labelNameList.length-1; i >= 0; i--){
            var label = labelMap[labelNameList[i]];
            var t = label.domNode.parentNode.parentNode.parentNode.parentNode;
            t.insertBefore(label.domNode.parentNode.parentNode.parentNode, t.firstChild);
        }
    };

    this.moveUnreadUp = function(label){
        /* only move-up non parentless and leaf labels */
        if (label.normalUnreadCount
            && label.parentLabel
            && !label.childLabels.length){
            var t = label.domNode.parentNode.parentNode.parentNode.parentNode;
            t.insertBefore(label.domNode.parentNode.parentNode.parentNode,
                           label.parentLabel.domNode.parentNode.parentNode.parentNode.nextSibling);
        }

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
            if(!doc.getElementById("f4g_style")){
                appendStandardStyleTag(doc);
                var styleRules = "div.k { background: #B5EDBC; }"
                    + " img.pq { width: 10px; height: 10px; }"
                    + " div.pv img.pq { background: url(images/2/5/c/icons4.png) -70px -30px; }"
                    + " div.pr img.pq { background: url(images/2/5/c/icons4.png) -60px -20px; }"
                    + " #nb_0 div.f4g_expander img.pq { display: block; }"; // Gmail super clean skin (ui=1) fix
                appendStyleTag(doc, styleRules, "f4g_style2");
            }

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

    this.getFullName = function(labelNode){
        return (labelNode.textContent) ? labelNode.textContent : labelNode.innerText;
    }

    this.getTitleNode = function(labelNode){
        return labelNode;
    }

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
            domNode.id = "f4g_" + missingParentName;
            domNode.className += " f4g_fake";

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

    this.restoreLabelOrder = function(){
        return;
    };

    this.moveUnreadUp = function(label){
        return;
    };
};


var lastActiveLabelName  = "";
var labelMap        = new Object();
var labelNameList   = new Array();

function appendStandardStyleTag(doc){
    var alignment = (top.document.documentElement.dir == "rtl") ? "right" : "left";
    var styleRules = "div.f4g_expander    { position: relative; width: 14px; height: 15px; float: " + alignment + "; }"
        + " div.f4g_expander.pr    { background: transparent; }" // for ui=1
        + " div.f4g_expander    { border: none; }" // terminal theme
        + " div.f4g_expander div.f4g_exp1 { position: absolute; top: 3px; " + alignment + ": 1px; width: 10px; height: 12px; }"
        + " div.f4g_expander div.f4g_exp2 { position: absolute; top: 4px; " + alignment + ": 0;   width: 12px; height: 10px; }"
        + " div.f4g_expander img.pq   { position: absolute; top: 4px; " + alignment + ": 1px; cursor: pointer; display: block; }"
        + " .f4g_fake a, div.f4g_fake { cursor: default; text-decoration: none; font-style: italic; }";
    appendStyleTag(doc, styleRules, "f4g_style");
}

function appendStyleTag(doc, styleRules, styleId){
    var styleNode = doc.createElement("style");
    styleNode.type = "text/css";
    styleNode.id = styleId;

    if(styleNode.styleSheet){ //IE
        styleNode.styleSheet.cssText = styleRules;
    }else{
        styleNode.appendChild(document.createTextNode(styleRules));
    }
    doc.getElementsByTagName("head")[0].appendChild(styleNode);
}
//init labelMap and labelNameList, add expander and indention to nodes
function initLabels(doc){
    //set parentLabel and childLabels, create labelMap, labelNameList
    var newLabelMap = new Object();
    var labelStack  = new Array();
    labelNameList   = new Array();
    var labelNodeIterator = uiHandler.labelNodeIterator(doc);
    while(labelNodeIterator.hasNext()){
        var labelNode = labelNodeIterator.next();
        var labelName = uiHandler.getFullName(labelNode);
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
            var expanderNode = createExpandSign(doc, label);
            label.expanderNode = expanderNode;
            label.domNode.parentNode.insertBefore(expanderNode, label.domNode);

            //collapse labels
            label.isExpanded = !label.isExpanded;
            changeExpand(label);

            indentionLevel--;
        }

        var indentedNode = label.domNode;
        if(label.childLabels.length > 0){
            indentedNode = expanderNode;
        }

        var indentionString = "" + indentionLevel*14 + "px";
        if(top.document.documentElement.dir == "rtl"){
            indentedNode.style.marginRight = indentionString;
        }else{
            indentedNode.style.marginLeft = indentionString;
        }
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
            changeExpand(label);
        }
        label = label.parentLabel;
    }
}

//refreshes the label count in brackets for all labels
function refreshUnreadCounts(){
    var labelsToUpdate = new Object();

    uiHandler.restoreLabelOrder();

    //from bottom to top
    for (var i = labelNameList.length-1; i >= 0; i--){
        var label = labelMap[labelNameList[i]];

        //if label is modified
        if(label.domNode.className.indexOf("f4g_modified") == -1){
           label.domNode.className +=     " f4g_modified";

            label.normalUnreadCount = 0;
            if(uiHandler.hasUnreadMessages(label.domNode)){
                var text = uiHandler.getFullName(label.domNode);
                var regexResult = text.match(/\((\d+)\)\u200f?$/);
                label.normalUnreadCount = parseInt(regexResult[1]);
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

            var rlmChar        = (top.document.documentElement.dir == "rtl") ? "\u200f" : "";
            var unreadCount    = (label.summedUnreadCount) ? " " + rlmChar + "("+label.summedUnreadCount +")" + rlmChar : "";
            uiHandler.getTextNode (label.domNode).innerHTML = label.htmlName + unreadCount;
            uiHandler.getTitleNode(label.domNode).title     = labelNameList[i] + unreadCount;
        }

        uiHandler.moveUnreadUp(label);
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
    labelName           = labelName.replace(/^(.*[^ ]) *$/, "$1");

    //empty label name, doesn't work with Gmail Macros
    if(/^ *$/.test(labelName)){
        this.htmlName = "\u00A0";

    //fix for Gmail Macros
    }else{
        var nameStarts = fullLabelName.indexOf(labelName);
        var prefix = fullLabelName.substring(0, nameStarts);
        if(nameStarts > 0){
            prefix = '<span style="display:none;">' + prefix + '</span>';
        }

        var suffix = fullLabelName.substring(nameStarts + labelName.length);
        if(suffix != ""){
            suffix = '<span style="display:none;">' + suffix + '</span>';
        }

        this.htmlName = prefix + labelName + suffix;
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
function createExpandSign(doc, label){
    var expNode = doc.createElement("div");
        expNode.innerHTML = '<div class="k f4g_exp1"></div>'
            + '<div class="k f4g_exp2"></div>'
            + '<img class="pq" src="images/cleardot.gif">';

    var onclickFunction = function(){
        changeExpand(label);
    };

    if(expNode.addEventListener){
        expNode.lastChild.addEventListener("click", onclickFunction, false);
    }
    else if(expNode.attachEvent){ //IE
        expNode.lastChild.attachEvent("onclick", onclickFunction);
    }

    return expNode;
}


//event for a click on an expander
function changeExpand(label){
    label.isExpanded = !label.isExpanded;
    label.expanderNode.className = (label.isExpanded) ? "f4g_expander r pv" : "f4g_expander r pr";
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

    //convert end slashes to spaces
    var endRegexp = new RegExp("/(/+)$");
    while(endRegexp.test(labelName)){
            labelName = labelName.replace(endRegexp, " $1");
    }
    labelName = labelName.replace(new RegExp("/$"), " ");


    //convert "//" to "/ "
    var regexp = new RegExp("(/+)/");
    while(regexp.test(labelName)){
        labelName = labelName.replace(regexp, "$1 ");
    }
    labelName = labelName.replace(new RegExp("^/"), " ");

    return labelName;
}


})();
}
