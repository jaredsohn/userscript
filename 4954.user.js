//--------------- Last Modified  --------------------
// $Date: 2006-08-01 02:25:50 +0800 (Tue, 01 Aug 2006) $
//------------------- Changes -----------------------
// Aug 1, 2006 => v 1.2
// * unsafeWindow.top == unsafeWindow.self check added to exclude sub-frames and iframes
//
// May 6, 2003 => v 1.1
// * Mozilla developers (as of Moz v 1.3+ apparently) changed the 
// target property of the event object generated during mousedown, mouseup events 
// so that it no longer points to the text node within which the Mouse event was
// fired, but instead points to the nearest element node above that text node in
// in the DOM hierarchy, so I'm relying more upon Mozilla's nonstandard Selection
// objects (using the anchorNode and focusNode properties).
//---------------------------------------------------

// ==UserScript==
// @name Links Ahoy !
// @namespace http://projects.briandonovan.info/projects/greasemonkey-user-scripts/
// @description Alt+clicking and dragging across a text fragment will trigger Ahoy and furnish you with an Ahoy link to your selection.
// @include *
// ==/UserScript==

var objSelectedTextRange = null;
var objAhyAnchor = null;
var objAhyAnchorCreatedParentNode = null;

var intThisAhoyVersion = 1.2;

function numberSort(n1,n2) 
{
    if (n1<n2){
        retVal=-1;
    }else if(n1>n2){
        retVal=1;
    }else{
        retVal=0;
    }
    return retVal;
}

function ahy_ScrubQueryString(strScrubbingMode)
{
    //---------------------------------------------------
    // strScrubbingMode is an arg passed to this function to
    // tell it whether to return the query string with Ahoy
    // params removed or the string of Ahoy params itself.
    // Possible values : querystring and ahoyparams
    // Defaults to querystring
    //---------------------------------------------------
    if(arguments.length != 1){
        strScrubbingMode = "querystring";
    } else if((strScrubbingMode != "querystring") && (strScrubbingMode != "ahoyparams")){
        return false;
    }
    var strQueryString = window.location.search;
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // For our purposes, assume that whomever is using
    // this script hasn't monkeyed with the order or values
    // of the Ahoy parameters.  If they have, they had better
    // rewrite this method anyway.
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //---------------------------------------------------
    // Get the length of the entire query string and find
    // the index of the beginning of the Ahoy parameters
    // string within.
    //---------------------------------------------------
    var intQueryStringLength = strQueryString.length;
    var intIndexBeginAhoyParamsAtBeginning = strQueryString.indexOf("?ahyAnchor");
    var intIndexBeginAhoyParams = strQueryString.indexOf("&ahyAnchor");
    var arrBeginIndices = [intIndexBeginAhoyParamsAtBeginning, intIndexBeginAhoyParams];
    arrBeginIndices.sort(numberSort);
    if(arrBeginIndices[1] != -1){
        //---------------------------------------------------
        // The Ahoy parameters portion of the query string
        // begins with either "?ahyAnchor" or "&ahyAnchor".
        //---------------------------------------------------
        var intIndexAhoySelIndexParam = strQueryString.indexOf("ahySelectionLength", arrBeginIndices[1]);
        if(intIndexAhoySelIndexParam != -1){
            //---------------------------------------------------
            // The final Ahoy parameter, "ahySelectionLength",  
            // is found within the query string.  Below we find how
            // the Ahoy parameters portion of the overall query
            // string is ended.
            //---------------------------------------------------
            var intIndexAmpersand = strQueryString.indexOf("&", intIndexAhoySelIndexParam);
            var intEndAhoyParams = -1;
            if(intIndexAmpersand != -1){
                intEndAhoyParams = intIndexAmpersand;
            }else{
                intEndAhoyParams = intQueryStringLength;
            }
            //---------------------------------------------------
            // Now, we know where the Ahoy params begin and end 
            // within the query string.  Depending on the value of 
            // strScrubbingMode passed as an arg to this function,
            // we will either be returning the query string without the 
            // Ahoy params or just a substring containing them.
            //---------------------------------------------------
            var strQueryForReturn = '';
            if(strScrubbingMode == "querystring"){
                //---------------------------------------------------
                // We will be returning the query string with the Ahoy parameters removed.
                //---------------------------------------------------
                if(intIndexBeginAhoyParamsAtBeginning != -1){
                    if(intIndexAmpersand != -1){
                        //---------------------------------------------------
                        // Ahoy params substring begins with "?" and ends with "&"
                        //---------------------------------------------------
                        strQueryForReturn = strQueryString.substring(0, (intIndexBeginAhoyParamsAtBeginning + 1));
                    }else{
                        //---------------------------------------------------
                        // Ahoy params substring begins with "?" and ends without "&"
                        //---------------------------------------------------
                        strQueryForReturn = strQueryString.substring(0, intIndexBeginAhoyParamsAtBeginning);
                    }
                    strQueryStringBeforeAhoy = strQueryString.substring();
                }else{
                    if(intIndexAmpersand != -1){
                        //---------------------------------------------------
                        // Ahoy params substring begins with "&" and ends with "&"
                        //---------------------------------------------------
                        var strQueryStringBeforeAhoyParams = strQueryString.substring(0, intIndexBeginAhoyParams);
                        var strQueryStringAfterAhoyParams = strQueryString.substring(intIndexAmpersand, (intQueryStringLength + 1));
                        strQueryForReturn = strQueryStringBeforeAhoyParams + strQueryStringAfterAhoyParams;
                    }else{
                        //---------------------------------------------------
                        // Ahoy params substring begins with "&" and ends without "&"
                        //---------------------------------------------------
                        strQueryForReturn = strQueryString.substring(0, intIndexBeginAhoyParams);
                    }
                }
            }else{
                //---------------------------------------------------
                // We will be returning only the Ahoy parameters 
                // substring of the query string.
                //---------------------------------------------------
                var arrEndIndices = [intIndexAmpersand, intQueryStringLength];
                arrEndIndices.sort(numberSort);
                strQueryForReturn = strQueryString.substring(arrBeginIndices[1], arrEndIndices[1]);
            }
            return strQueryForReturn;
        }else{
            return false;
        }
    }else{
        if(strScrubbingMode == "querystring"){
            return strQueryString;
        }else{
            return false;
        }
    }
}


function ahyObjSelectedTextRange(objExistingAnchorParentNode)
{
    //---------------------------------------------------
    // properties
    //---------------------------------------------------
    ahyObjSelectedTextRange.prototype.nodeExistingAnchorParentNode = objExistingAnchorParentNode;
    ahyObjSelectedTextRange.prototype.ahyMousedownContainer = null;
    ahyObjSelectedTextRange.prototype.ahyMouseupContainer = null;
    ahyObjSelectedTextRange.prototype.ahySelection = null;
    ahyObjSelectedTextRange.prototype.ahySelectionString = null;
    ahyObjSelectedTextRange.prototype.ahySelectionLength = null;
    ahyObjSelectedTextRange.prototype.ahySelectionStartOffset = null;
    ahyObjSelectedTextRange.prototype.ahyParentNodeForAnchor = null;
    ahyObjSelectedTextRange.prototype.ahyChildNodeOfParentNodeForAnchorToSeek = null;
    ahyObjSelectedTextRange.prototype.ahyParentNodeTagName = null;
    ahyObjSelectedTextRange.prototype.ahySelectionParentNodeElementID = null;
    ahyObjSelectedTextRange.prototype.ahyParentNodeIndex = null;
    ahyObjSelectedTextRange.prototype.ahySelectionThisNodeIndex = null;
    ahyObjSelectedTextRange.prototype.ahyQueryStringFragment = null;
    //---------------------------------------------------
    // assign methods to functions 
    //---------------------------------------------------
    ahyObjSelectedTextRange.prototype.ahy_EndSelect = ahy_EndSelect;
    ahyObjSelectedTextRange.prototype.ahy_ScrubQueryString = ahy_ScrubQueryString;

    //---------------------------------------------------
    // functions (ahy_ScrubQueryString used by both, shown above)
    //---------------------------------------------------

    function ahy_EndSelect(event)
    {
        if (event.altKey){
            //---------------------------------------------------
            // In Mozilla, getSelection returns a Selection object whose
            // properties are undocumented. See http://www.pbwizard.com/Articles/Moz_Range_Object_Article.htm
            // for more information.
            //---------------------------------------------------
            //=====================================
            // proprietary Moz dom stuff
            //=====================================
            this.ahySelection = window.getSelection();

            this.ahyMousedownContainer = this.ahySelection.anchorNode;
            this.ahyMouseupContainer = this.ahySelection.focusNode;

            this.ahySelectionString = this.ahySelection.toString();
            this.ahySelectionLength = this.ahySelectionString.length;
            var intSelectionAnchorOffset = this.ahySelection.anchorOffset;
            var intSelectionFocusOffset = this.ahySelection.focusOffset;
            //=====================================
            if(this.ahySelectionLength == 0){
                alert("Zero Characters Selected");
                return false;
            }
            strMouseupContainerNodeValue = this.ahyMouseupContainer.nodeValue;
            //---------------------------------------------------
            // If we are already on a page with an Ahoy-created
            // anchor, we have to check to make sure that the
            // user hasn't made a selection within a text node child
            // of the parent node containing the text node within
            // which the previous selection and anchor insertion was made.
            // Why?  because it may not be possible to pin down
            // the location correctly.
            //---------------------------------------------------
            if(this.ahyMouseupContainer.nodeType == 3){
                //---------------------------------------------------
                // The container node within which the selection begins
                // is the same as the ocontainer in which it ends.
                //---------------------------------------------------
                if (this.ahyMouseupContainer.parentNode.nodeType == 1){
                    //---------------------------------------------------
                    // If they're highlighting text, then the containing nodes of 
                    // selections will always be a text nodes.  The parent nodes 
                    //of the containers are likely to be some html element, like
                    // a P of H1,H2, etc.
                    //---------------------------------------------------
                    var objPreExistingAnchorSpan = document.getElementById("ahoypreanchorspan");
                    var objExistingAnchorSpan = document.getElementById("ahoyanchorid");
                    var objPostExistingAnchorSpan = document.getElementById("ahoypostanchorspan");
                    //---------------------------------------------------
                    //if(objExistingAnchorParentNode == this.ahyMouseupContainer.parentNode.parentNode){
                    if(((this.ahyMouseupContainer.parentNode == objPreExistingAnchorSpan)||
                        (this.ahyMouseupContainer.parentNode == objExistingAnchorSpan)||
                        (this.ahyMouseupContainer.parentNode == objPostExistingAnchorSpan)
                        )&&((this.ahyMousedownContainer.parentNode == objPreExistingAnchorSpan)||
                        (this.ahyMousedownContainer.parentNode == objExistingAnchorSpan)||
                        (this.ahyMousedownContainer.parentNode == objPostExistingAnchorSpan)
                        )){
                        //---------------------------------------------------
                        // There is an existing anchor and the grandparent node 
                        // of the mouseup container is not the parent of the 
                        // existing anchor node.
                        //---------------------------------------------------
                        this.ahyParentNodeForAnchor = this.ahyMouseupContainer.parentNode.parentNode;
                        //---------------------------------------------------
                        // Each of the ahoy-generated  elements has only one 
                        // text node as a child.  We know this because it's how 
                        // we created them.
                        //---------------------------------------------------
                        var strPreExistingAnchorSpanTextNodeVal = '';
                        var strExistingAnchorSpanTextNodeVal = '';
                        var strPostExistingAnchorSpanTextNodeVal = '';
                        //---------------------------------------------------
                        // Set the flags for the Mousedown and Mouseup Container locations
                        //---------------------------------------------------
                        var intMouseDownTextNodeParentFlag = 0;
                        var intMouseUpTextNodeParentFlag = 0;
                        if(objPreExistingAnchorSpan != null){
                            //---------------------------------------------------
                            // Get the text out of the single text node within this SPAN
                            //---------------------------------------------------
                            strPreExistingAnchorSpanTextNodeVal = objPreExistingAnchorSpan.childNodes[0].nodeValue;
                            //---------------------------------------------------
                            // Check for the mouseup and mousedown containers
                            //---------------------------------------------------
                            if(this.ahyMousedownContainer == objPreExistingAnchorSpan.childNodes[0]){
                                intMouseDownTextNodeParentFlag = 1;
                            }
                            if(this.ahyMouseupContainer  == objPreExistingAnchorSpan.childNodes[0]){
                                intMouseUpTextNodeParentFlag = 1;
                            }
                        }
                        if(objExistingAnchorSpan != null){
                            strExistingAnchorSpanTextNodeVal = objExistingAnchorSpan.childNodes[0].nodeValue;
                            //---------------------------------------------------
                            // Check for the mouseup and mousedown containers
                            //---------------------------------------------------
                            if(this.ahyMousedownContainer == objExistingAnchorSpan.childNodes[0]){
                                intMouseDownTextNodeParentFlag = 2;
                            }
                            if(this.ahyMouseupContainer  == objExistingAnchorSpan.childNodes[0]){
                                intMouseUpTextNodeParentFlag = 2;
                            }
                        }
                        if(objPostExistingAnchorSpan != null){
                            //---------------------------------------------------
                            // Get the text out of the single text node within this SPAN
                            //---------------------------------------------------
                            strPostExistingAnchorSpanTextNodeVal = objPostExistingAnchorSpan.childNodes[0].nodeValue;
                            //---------------------------------------------------
                            // Check for the mouseup and mousedown containers
                            //---------------------------------------------------
                            if(this.ahyMousedownContainer == objPostExistingAnchorSpan.childNodes[0]){
                                intMouseDownTextNodeParentFlag = 3;
                            }
                            if(this.ahyMouseupContainer  == objPostExistingAnchorSpan.childNodes[0]){
                                intMouseUpTextNodeParentFlag = 3;
                            }
                        }
                        if(intMouseDownTextNodeParentFlag == intMouseUpTextNodeParentFlag){
                            //---------------------------------------------------
                            // Accomodating left-right and right-left text selection.
                            //---------------------------------------------------
                            var arrSelectionOffsets = [intSelectionAnchorOffset, intSelectionFocusOffset]
                            arrSelectionOffsets.sort(numberSort);
                            this.ahySelectionStartOffset = arrSelectionOffsets[0];
                        }
                        if((intMouseDownTextNodeParentFlag == 1)&&(intMouseUpTextNodeParentFlag == 1)){
                            //---------------------------------------------------
                            // This section of code addresses the problems caused
                            // by returns or other whitespace preceeding a selection
                            // when that selection includes the opening of the text node.
                            //---------------------------------------------------
                            intNumCharBeginSelectionInNodeValue = strMouseupContainerNodeValue.indexOf(this.ahySelectionString);
                            if(intNumCharBeginSelectionInNodeValue > this.ahySelectionStartOffset){
                                this.ahySelectionStartOffset = intNumCharBeginSelectionInNodeValue;
                            }
                        }
                        if((intMouseDownTextNodeParentFlag == 2)&&(intMouseUpTextNodeParentFlag == 2)){
                            //---------------------------------------------------
                            // This section of code addresses the problems caused
                            // by returns or other whitespace preceeding a selection
                            // when that selection includes the opening of the text node.
                            //---------------------------------------------------
                            intNumCharBeginSelectionInNodeValue = strMouseupContainerNodeValue.indexOf(this.ahySelectionString);
                            if(intNumCharBeginSelectionInNodeValue > this.ahySelectionStartOffset){
                                this.ahySelectionStartOffset = intNumCharBeginSelectionInNodeValue;
                            }
                            this.ahySelectionStartOffset = this.ahySelectionStartOffset + strPreExistingAnchorSpanTextNodeVal.length;
                        }
                        if((intMouseDownTextNodeParentFlag == 3)&&(intMouseUpTextNodeParentFlag == 3)){
                            //---------------------------------------------------
                            // This section of code addresses the problems caused
                            // by returns or other whitespace preceeding a selection
                            // when that selection includes the opening of the text node.
                            //---------------------------------------------------
                            intNumCharBeginSelectionInNodeValue = strMouseupContainerNodeValue.indexOf(this.ahySelectionString);
                            if(intNumCharBeginSelectionInNodeValue > this.ahySelectionStartOffset){
                                this.ahySelectionStartOffset = intNumCharBeginSelectionInNodeValue;
                            }
                            this.ahySelectionStartOffset = this.ahySelectionStartOffset + strPreExistingAnchorSpanTextNodeVal.length + strExistingAnchorSpanTextNodeVal.length;
                        }
                        if((intMouseDownTextNodeParentFlag == 1) && ((intMouseUpTextNodeParentFlag == 2) || (intMouseUpTextNodeParentFlag == 3))){
                            this.ahySelectionStartOffset = intSelectionAnchorOffset;
                        }
                        if((intMouseDownTextNodeParentFlag == 2) && (intMouseUpTextNodeParentFlag == 3)){
                            this.ahySelectionStartOffset =  strPreExistingAnchorSpanTextNodeVal.length + intSelectionAnchorOffset;
                        }
                        if((intMouseDownTextNodeParentFlag == 2) && (intMouseUpTextNodeParentFlag == 1)){
                            this.ahySelectionStartOffset =  intSelectionFocusOffset;
                        }
                        if((intMouseDownTextNodeParentFlag == 3) && (intMouseUpTextNodeParentFlag == 2)){
                            this.ahySelectionStartOffset =  strPreExistingAnchorSpanTextNodeVal.length + intSelectionFocusOffset;
                        }
                        if((intMouseDownTextNodeParentFlag == 3) && (intMouseUpTextNodeParentFlag == 1)){
                            this.ahySelectionStartOffset =  intSelectionFocusOffset;
                        }
                        //---------------------------------------------------
                        if(objPreExistingAnchorSpan != null){
                            this.ahyChildNodeOfParentNodeForAnchorToSeek = objPreExistingAnchorSpan;
                        }else{
                            this.ahyChildNodeOfParentNodeForAnchorToSeek = objExistingAnchorSpan;
                        }
                        //---------------------------------------------------
                    }else if((this.ahyMousedownContainer == this.ahyMouseupContainer)&&
                                    (
                                        ((objExistingAnchorParentNode == this.ahyMouseupContainer.parentNode)) &&
                                        ((objExistingAnchorParentNode == this.ahyMousedownContainer.parentNode))
                                    )
                                ){
                        var intNumAhoyNodes = 0;
                        var intIndexMouseEventsNode=0;
                        for(var i=0; i<this.ahyMouseupContainer.parentNode.childNodes.length; i++){
                            if((this.ahyMouseupContainer.parentNode.childNodes[i] == objPreExistingAnchorSpan)||
                                (this.ahyMouseupContainer.parentNode.childNodes[i] == objExistingAnchorSpan)||
                                (this.ahyMouseupContainer.parentNode.childNodes[i] == objPostExistingAnchorSpan)){
                                intNumAhoyNodes++;
                             }else if(this.ahyMousedownContainer == this.ahyMouseupContainer.parentNode.childNodes[i]){
                                if(intNumAhoyNodes > 0){
                                    intIndexMouseEventsNode = i - (intNumAhoyNodes - 1);
                                }else{
                                    intIndexMouseEventsNode = i;
                                }
                                break;
                            }
                        }
                        //---------------------------------------------------
                        var arrSelectionOffsets = [intSelectionAnchorOffset, intSelectionFocusOffset]
                        arrSelectionOffsets.sort(numberSort);
                        this.ahySelectionStartOffset = arrSelectionOffsets[0];
                        //---------------------------------------------------
                        // There is no existing anchor and/or if one exists, the 
                        // grandparent node of the mouseup container is not
                        // the parent of the existing anchor node
                        //---------------------------------------------------
                        this.ahyParentNodeForAnchor = this.ahyMouseupContainer.parentNode;
                        //---------------------------------------------------
                        this.ahyChildNodeOfParentNodeForAnchorToSeek = this.ahyMouseupContainer;
                        //---------------------------------------------------
                    }else if(this.ahyMousedownContainer == this.ahyMouseupContainer){
                        //---------------------------------------------------
                        // There is no existing anchor and/or if one exists, the 
                        // grandparent node of the mouseup container is not
                        // the parent of the existing anchor node
                        //---------------------------------------------------
                        this.ahyParentNodeForAnchor = this.ahyMouseupContainer.parentNode;
                        var arrSelectionOffsets = [intSelectionAnchorOffset, intSelectionFocusOffset]
                        arrSelectionOffsets.sort(numberSort);
                        this.ahySelectionStartOffset = arrSelectionOffsets[0];
                        //---------------------------------------------------
                        // This section of code addresses the problems caused
                        // by returns or other whitespace preceeding a selection
                        // when that selection includes the opening of the text node.
                        //---------------------------------------------------
                        intNumCharBeginSelectionInNodeValue = strMouseupContainerNodeValue.indexOf(this.ahySelectionString);
                        if(intNumCharBeginSelectionInNodeValue > this.ahySelectionStartOffset){
                            this.ahySelectionStartOffset = intNumCharBeginSelectionInNodeValue;
                        }
                        this.ahyChildNodeOfParentNodeForAnchorToSeek = this.ahyMouseupContainer;
                        //---------------------------------------------------
                    }else{
                        alert("start and end in different nodes ! ");
                        return false;
                    }
                    //---------------------------------------------------
                    if(this.ahyParentNodeForAnchor.hasAttribute("ID")){
                        //---------------------------------------------------
                        // The parent node has an ID attribute
                        //---------------------------------------------------
                        this.ahySelectionParentNodeElementID = this.ahyParentNodeForAnchor.getAttribute("ID");
                    }else{
                        //---------------------------------------------------
                        // Element has no id attribute.  Use getElementsByTagName()
                        //---------------------------------------------------
                        this.ahyParentNodeTagName = this.ahyParentNodeForAnchor.nodeName;
                        var arrDocumentGetElementsByTagName = document.getElementsByTagName(this.ahyParentNodeTagName);
                        for(var i=0; i< arrDocumentGetElementsByTagName.length; i++){
                            if(arrDocumentGetElementsByTagName[i] == this.ahyParentNodeForAnchor){
                                this.ahyParentNodeIndex = i;
                                break;
                            }
                        }
                    }
                    for(var i=0; i < this.ahyParentNodeForAnchor.childNodes.length; i++){
                        if(this.ahyParentNodeForAnchor.childNodes[i] == this.ahyChildNodeOfParentNodeForAnchorToSeek){
                            if(intIndexMouseEventsNode > 0){
                                this.ahySelectionThisNodeIndex = intIndexMouseEventsNode;
                            } else{
                                this.ahySelectionThisNodeIndex = i;
                            }
                            break;
                        }
                    }
                    //---------------------------------------------------
                    // Prepare the query string.
                    //---------------------------------------------------
                    if( this.ahySelectionParentNodeElementID == null){
                        //---------------------------------------------------
                        // The parent element doesn't have an ID attribute, so
                        // we're using the tag name and node index instead.
                        //---------------------------------------------------
                        this.ahyQueryStringFragment = "ahyAnchor="+intThisAhoyVersion+"&ahyParentNodeTagName="+this.ahyParentNodeTagName+"&ahyParentNodeIndex="+this.ahyParentNodeIndex+"&ahyChildIndex="+this.ahySelectionThisNodeIndex+"&ahySelectionStart="+this.ahySelectionStartOffset+"&ahySelectionLength="+this.ahySelectionLength;
                    } else{
                        //---------------------------------------------------
                        // The parent element has an id attribute.
                        //---------------------------------------------------
                        this.ahyQueryStringFragment = "ahyAnchor="+intThisAhoyVersion+"&ahyParentNodeID="+this.ahySelectionParentNodeElementID+"&ahyChildIndex="+this.ahySelectionThisNodeIndex+"&ahySelectionStart="+this.ahySelectionStartOffset+"&ahySelectionLength="+this.ahySelectionLength;
                    }
                    var strNewHref = location.protocol+"//"+location.host+location.pathname;
                    if(location.search == ''){
                        location.href = strNewHref + "?"+this.ahyQueryStringFragment+"#ahoyanchor";
                    }else{
                        //---------------------------------------------------
                        // There is a query string, but some or all of the 
                        // parameters could be Ahoy params.  They must be 
                        // removed.
                        //---------------------------------------------------
                        var strScrubbedQueryString = ahy_ScrubQueryString();
                        if(strScrubbedQueryString != ''){
                            strNewHref  += strScrubbedQueryString + "&" + this.ahyQueryStringFragment+"#ahoyanchor";
                        }else{
                            strNewHref  += "?" + this.ahyQueryStringFragment+"#ahoyanchor";
                        }
                        //---------------------------------------------------
                        // Send the browser to the new location.
                        //---------------------------------------------------
                        location.href = strNewHref;
                    }
                }else{
                    alert("Parent node is not an element node \n nodeType : " + this.ahyMouseupContainer.parentNode.nodeType  + "\n nodeName : " + this.ahyMouseupContainer.parentNode.nodeName);
                    return false;
                }
            }else{
                alert("Not a text node ! ");
                return false;
            }
        }
    }

}

function ahyObjAnchor()
{
    //---------------------------------------------------
    // properties
    //---------------------------------------------------
    ahyObjAnchor.prototype.ahyQueryStringParamsString = null;
    ahyObjAnchor.prototype.ahyAnchorPropertiesArr = null;
    ahyObjAnchor.prototype.ahySelectionParentNode = null;
    ahyObjAnchor.prototype.ahySelectionChildNode = null;
    ahyObjAnchor.prototype.ahyRangeObj = null;
    ahyObjAnchor.prototype.ahyRangeContentsBeforeAnchor = null;
    ahyObjAnchor.prototype.ahyDocumentFragmentToInsert = null;
    ahyObjAnchor.prototype.ahyInsertedAnchorNode = null;
    //---------------------------------------------------
    // assign methods to functions 
    //---------------------------------------------------
    ahyObjAnchor.prototype.ahy_FetchAhyQueryParamsString = ahy_ScrubQueryString;
    ahyObjAnchor.prototype.ahy_ParseAhyQueryParamsString = ahy_ParseAhyQueryParamsString;
    ahyObjAnchor.prototype.ahy_ParseOneAhyParam = ahy_ParseOneAhyParam;
    ahyObjAnchor.prototype.ahy_CreateAnchor = ahy_CreateAnchor;

    //---------------------------------------------------
    //  functions (ahy_ScrubQueryString used by both, shown above)
    //---------------------------------------------------

    function ahy_ParseOneAhyParam(strAhyParamName)
    {
        var intIndexAhyParamValuePairStart = this.ahyQueryStringParamsString.indexOf(strAhyParamName);
        if(intIndexAhyParamValuePairStart!= -1){
            //---------------------------------------------------
            // The Ahoy parameter name was found in the query string.
            //---------------------------------------------------
            var intIndexAhyParamValuePairStop = this.ahyQueryStringParamsString.indexOf("&",intIndexAhyParamValuePairStart);
            if(intIndexAhyParamValuePairStop == -1){
                intIndexAhyParamValuePairStop = this.ahyQueryStringParamsString.length;
            }
            var strAhyParamValuePair = this.ahyQueryStringParamsString.substring(intIndexAhyParamValuePairStart, intIndexAhyParamValuePairStop);
            var arrAhyParamValuePair = strAhyParamValuePair.split("=");
            var intLengthArrAhyParamVauePair = arrAhyParamValuePair.length;
            if(intLengthArrAhyParamVauePair == 2){
                //---------------------------------------------------
                // The array produced by splitting the param value 
                // pair on "=" is 2 elements in length.  Return the value.
                //---------------------------------------------------
                return arrAhyParamValuePair[1];
            } else{
                return -1;
            }
        }else{
            return -1;
        }
    }

    function ahy_ParseAhyQueryParamsString()
    {
        this.ahyAnchorPropertiesArr = new Array();
        if(this.ahyQueryStringParamsString.indexOf("ahyParentNodeID") != -1){
            //---------------------------------------------------
            // "ahyParentNodeID" param can be used to identify
            // the parent node using document.getElementById()
            //---------------------------------------------------
            this.ahyAnchorPropertiesArr["parentnodeid"] = this.ahy_ParseOneAhyParam("ahyParentNodeID");
            this.ahyAnchorPropertiesArr["parentnodetagname"] = null;
            this.ahyAnchorPropertiesArr["parentnodeindex"] = null;
            if(this.ahyAnchorPropertiesArr["parentnodeid"] == -1){
                return false;
            }
        }else if((this.ahyQueryStringParamsString.indexOf("ahyParentNodeTagName") != -1)&&(this.ahyQueryStringParamsString.indexOf("ahyParentNodeIndex") != -1)){
            //---------------------------------------------------
            // "ahyParentNodeTagName" and "ahyParentNodeIndex" 
            // params can be used to identify the parent node using 
            // document.getElementsByTagName()
            //---------------------------------------------------
            this.ahyAnchorPropertiesArr["parentnodeid"] = null;
            this.ahyAnchorPropertiesArr["parentnodetagname"] = this.ahy_ParseOneAhyParam("ahyParentNodeTagName");
            this.ahyAnchorPropertiesArr["parentnodeindex"] = parseInt(this.ahy_ParseOneAhyParam("ahyParentNodeIndex"));
            if((this.ahyAnchorPropertiesArr["parentnodetagname"] == -1) || (this.ahyAnchorPropertiesArr["parentnodeindex"] == -1)){
                return false;
            }
        }else{
            //---------------------------------------------------
            // Parameters necessary for identification of the parent
            // node to the child node containing the selection have
            // not been provided.
            //---------------------------------------------------
            return false;
        }
        this.ahyAnchorPropertiesArr["childnodeindex"] = parseInt(this.ahy_ParseOneAhyParam("ahyChildIndex"));
        this.ahyAnchorPropertiesArr["selectionstart"] = parseInt(this.ahy_ParseOneAhyParam("ahySelectionStart"));
        this.ahyAnchorPropertiesArr["selectionlength"] = parseInt(this.ahy_ParseOneAhyParam("ahySelectionLength"));
        if((this.ahyAnchorPropertiesArr["childnodeindex"] == -1) || 
            (this.ahyAnchorPropertiesArr["selectionstart"] == -1) ||
            (this.ahyAnchorPropertiesArr["selectionlength"] == -1)){
            return false;
        }else{
            return true;
        }
    }

    function ahy_CreateAnchor()
    {
        //---------------------------------------------------
        // First, Get the parent node.  The method depends
        // on whether the Ahoy query string parameters
        // include a parent element id OR a parent element
        // tagname and index in getElementsByTagName array.
        //---------------------------------------------------
        if(this.ahyAnchorPropertiesArr["parentnodeid"] != null){
            this.ahySelectionParentNode = document.getElementById(this.ahyAnchorPropertiesArr["parentnodeid"]);
        }else if((this.ahyAnchorPropertiesArr["parentnodetagname"] != null)&&(this.ahyAnchorPropertiesArr["parentnodeindex"] != null)){
            var arrElementsWithSameTagNameAsParentNode = document.getElementsByTagName(this.ahyAnchorPropertiesArr["parentnodetagname"]);
            this.ahySelectionParentNode = arrElementsWithSameTagNameAsParentNode[this.ahyAnchorPropertiesArr["parentnodeindex"]];
        }else{
            alert("One or more Ahoy parameters necessary to resolve the location of the selection are missing.  Exiting.");
            return false;
        }
        //---------------------------------------------------
        // Next, get the Child Node of interest
        //---------------------------------------------------
        this.ahySelectionChildNode = this.ahySelectionParentNode.childNodes[this.ahyAnchorPropertiesArr["childnodeindex"]];
        //---------------------------------------------------
        // Create Range objects and set their starts and ends 
        // using data from the Ahoy parameters.
        //---------------------------------------------------
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // Create Range object before Selection
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        var objPreSelectionRange = document.createRange();
        objPreSelectionRange.setStart(this.ahySelectionChildNode, 0);
        objPreSelectionRange.setEnd(this.ahySelectionChildNode, this.ahyAnchorPropertiesArr["selectionstart"]);
        var objPreSelectionRangeContentsString = objPreSelectionRange.toString();
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // Create Range object for Selection itself
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        this.ahyRangeObj = document.createRange();
        this.ahyRangeObj.setStart(this.ahySelectionChildNode, this.ahyAnchorPropertiesArr["selectionstart"]);
        var intIndexSelectionEnd = this.ahyAnchorPropertiesArr["selectionstart"] + this.ahyAnchorPropertiesArr["selectionlength"];
        this.ahyRangeObj.setEnd(this.ahySelectionChildNode, intIndexSelectionEnd);
        var strRangeSelectionForAnchor = this.ahyRangeObj.toString();
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // Create Range object after Selection
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        var objPostSelectionRange = document.createRange();
        objPostSelectionRange.setStart(this.ahySelectionChildNode, intIndexSelectionEnd);
        objPostSelectionRange.setEnd(this.ahySelectionChildNode, this.ahySelectionChildNode.nodeValue.length);
        var objPostSelectionRangeContentsString = objPreSelectionRange.toString();
        //---------------------------------------------------
        // We will be creating a document fragment, appending 
        // nodes constructed from the ranges as children, and
        // then replacing the original node with out fragment.
        //---------------------------------------------------
        this.ahyDocumentFragmentToInsert  = document.createDocumentFragment();
        //---------------------------------------------------
        // Create some strings to contain the snips of the
        // original text node on either side of the selection.
        //---------------------------------------------------
        var strPreSelectionText = objPreSelectionRange.toString();
        var strPostSelectionText = objPostSelectionRange.toString();
        //---------------------------------------------------
        // Create our anchor element, give it a name and an id
        // and fill it with a text node containing the selected text.
        //---------------------------------------------------
        var nodeAnchorElement = document.createElement("A");
        var nodeAnchorElementContents = document.createTextNode(strRangeSelectionForAnchor);
        nodeAnchorElement.setAttribute("name", "ahoyanchor" );
        nodeAnchorElement.setAttribute("id", "ahoyanchorid" );
        nodeAnchorElement.appendChild(nodeAnchorElementContents);
        //---------------------------------------------------
        // Create span elements that will be placed adjacent to 
        // the anchor element to contain the text on either side 
        // of the selection in the original text node.
        //---------------------------------------------------
        //---------------------------------------------------
        // Append the child nodes to the document fragment in
        // consecutive order
        //---------------------------------------------------
        if(strPreSelectionText.length > 0){
            var nodePreAnchorSpanElement = document.createElement("SPAN");
            var nodePreSelectionTextNode = document.createTextNode(strPreSelectionText);
            nodePreAnchorSpanElement.setAttribute("id", "ahoypreanchorspan" );
            nodePreAnchorSpanElement.appendChild(nodePreSelectionTextNode);
            this.ahyDocumentFragmentToInsert .appendChild(nodePreAnchorSpanElement);
        }
        this.ahyDocumentFragmentToInsert .appendChild(nodeAnchorElement);
        if(strPostSelectionText.length > 0){
            var nodePostAnchorSpanElement = document.createElement("SPAN");
            var nodePostSelectionTextNode = document.createTextNode(strPostSelectionText);
            nodePostAnchorSpanElement.setAttribute("id", "ahoypostanchorspan" );
            nodePostAnchorSpanElement.appendChild(nodePostSelectionTextNode);
            this.ahyDocumentFragmentToInsert .appendChild(nodePostAnchorSpanElement);
        }
        //---------------------------------------------------
        // Replace the text node containing the selection with
        // the document fragment that we've prepared.
        //---------------------------------------------------
        this.ahySelectionParentNode.replaceChild(this.ahyDocumentFragmentToInsert, this.ahySelectionParentNode.childNodes[this.ahyAnchorPropertiesArr["childnodeindex"]]);
        //---------------------------------------------------
        // Get a handle on the ahyanchor A element so that we
        // can manipulate its style properties.
        //---------------------------------------------------
        this.ahyInsertedAnchorNode = document.getElementById("ahoyanchorid");
        this.ahyInsertedAnchorNode.style.backgroundColor="rgb(220,220,220)";
        return true;
    }

}

function ahy_DoOnLoad()
{
    //---------------------------------------------------
    // Test to see if the browser claims to have implemented
    // the W3C DOM Range API 
    //---------------------------------------------------
    if(window.getSelection && document.implementation.hasFeature){
        var blnRangeImplemented = document.implementation.hasFeature("Range", "2.0");
        if(blnRangeImplemented){
            if(location.search.indexOf("ahyAnchor") != -1){
                //---------------------------------------------------
                // There's an "ahyAnchor" parameter in the query string,
                // so we may need to create an anchor.  Instantiate an
                // Ahoy Anchor object, parse the query string, and create
                // the anchor.
                //---------------------------------------------------
                objAhyAnchor = new ahyObjAnchor();
                var blnORstrExtractAhoyParamsSubstring = objAhyAnchor.ahy_FetchAhyQueryParamsString("ahoyparams");
                if(blnORstrExtractAhoyParamsSubstring){
                    objAhyAnchor.ahyQueryStringParamsString = blnORstrExtractAhoyParamsSubstring;
                }else{
                    alert("Problems were encountered while obtaining the set of Ahoy parameters from the query string.  Cannot create anchor.");
                    return false;
                }
                var blnparseAhoyParams = objAhyAnchor.ahy_ParseAhyQueryParamsString();
                if(blnparseAhoyParams){
                    var blnAhyAnchorCreated = objAhyAnchor.ahy_CreateAnchor();
                    if(blnAhyAnchorCreated){
                        objAhyAnchorCreatedParentNode = objAhyAnchor.ahySelectionParentNode;
                    }
                    //---------------------------------------------------
                    // We add a delay before jumping to the anchor that's
                    // been created.  Without the delay, Mozilla seems to
                    // slightly undershoot or overshoot the scroll to the anchor.
                    //---------------------------------------------------
                    setTimeout("location.href = '#ahoyanchor'", 100);
                }else{
                    alert("Problems were encountered while parsing the Ahoy parameters in query string.  Cannot create anchor.");
                    return false;
                }
            }
            //---------------------------------------------------
            // Instantiate an Ahoy Selected Text Range object and
            // attach ahyObjSelectedTextRange methods as handlers
            // for the mousedown and mouseup events.
            //---------------------------------------------------
            objSelectedTextRange = new ahyObjSelectedTextRange(objAhyAnchorCreatedParentNode);
            document.addEventListener("mouseup", objSelectedTextRange.ahy_EndSelect, false);
        }
    }
}

if (unsafeWindow.top == unsafeWindow.self) {
    if(window.addEventListener){
        window.addEventListener("load", ahy_DoOnLoad, false);
    }else{
        if(location.search.indexOf("ahyAnchor") != -1){
            alert("You've attempted to access an AHOY bookmark within this page, but your browser doesn't support the addEventListener method of the W3C DOM Level 2 Events API for the window object.  You're being redirected to the url of the page sans the AHOY query string parameters ...");
           //---------------------------------------------------
            // There is a query string, but some or all of the 
            // parameters could be Ahoy params.  They must be 
            // removed.
            //---------------------------------------------------
            var strLocationSansQueryString = location.protocol+"//"+location.host+location.pathname;
            var strScrubbedQueryString = ahy_ScrubQueryString();
            if(strScrubbedQueryString != ''){
                location.replace(strLocationSansQueryString+strScrubbedQueryString);
            }else{
                location.replace(strLocationSansQueryString);
            }
        }
    }
}
