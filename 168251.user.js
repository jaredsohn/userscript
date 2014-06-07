// ==UserScript==
// @name       ProE Core
// @namespace  seldar_proeconomica
// @version    1.2.1
// @description  Basic tool to help you during ProEconomica activities
// @copyright  2013+, Seldar
// @match        http://proeconomica.com/*
// @history	  		0.0.1 Initial Setup,adding hide for tips and top banner
// @grant			unsafeWindow
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_xmlhttpRequest
// @grant			GM_openInTab
// @grant			GM_log
// @grant			GM_listValues
// @grant			GM_addStyle
// @grant			GM_registerMenuCommand
// @require        	http://malsup.github.com/jquery.blockUI.js
// @require			http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require			http://proeco.lejer.ro/js/jquery.livequery.js
// @require			http://proeco.lejer.ro/js/userscripts/proe/ups.js
// @require 		http://creativecouple.github.com/jquery-timing/jquery-timing.min.js
// ==/UserScript==

// The script is wrapped in an anonymous function
(function() {
    var currversion = 1;
    var ytHost = window.location.protocol + "//" + window.location.host;
    var ytPath = window.location.pathname;
    var sheetdebug;
    
    ////////////////////////// START OF HELPER FUNCTIONS //////////////////////////
    
    // Shortcut to document.getElementById
    function $id(id) {
        return document.getElementById(id);
    }
    
    // Returns a node from its id or a reference to it
    function $ref(idRef) {
        return (typeof idRef === "string") ? $id(idRef) : idRef;
    }
    
    // Runs a particular XPath expression p against the context node context (or the document, if not provided)
    // If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
    // Returns the results as an array
    function $x(p, context, docObj) {
        if (!docObj) docObj = document;
        if (!context) context = docObj;
        var arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0, l = xpr.snapshotLength; i < l; i++) arr.push(xpr.snapshotItem(i));
        return arr;
    }
    
    // Returns only the first element of the array returned by $x (or null if the array was empty)
    function $x1(p, context, docObj) {
        var nodeArray = $x(p, context, docObj);
        return (nodeArray.length > 0) ? nodeArray[0] : null;
    }
    
    // Creates a new node with the given attributes, properties and event listeners
    function createNode(type, attributes, props, evls) {
        
        var node = document.createElement(type);
        
        if (attributes) {
            for (var attr in attributes) {
                if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
            }
        }
        
        if (props) {
            for (var prop in props) {
                if ((props.hasOwnProperty(prop)) && (prop in node)) node[prop] = props[prop];
            }
        }
        
        if (Array.isArray(evls)) {
            evls.forEach(function(evl) {
                if (Array.isArray(evl)) node.addEventListener.apply(node, evl);
            });
        }
        
        return node;
        
    }
    
    // Deletes a node from its id or a reference to it
    function delNode(targetNode) {
        var iNode = $ref(targetNode);
        if ((iNode) && (iNode.parentNode)) return iNode.parentNode.removeChild(iNode);
        return null;
    }
    
    // Deletes all the nodes in the passed array by calling delNode for each of them
    // If the passed parameter isn't an array, it does nothing
    function delNodeArray(nodeArray) {
        if (!Array.isArray(nodeArray)) return;
        nodeArray.forEach(function(iNode) {
            delNode(iNode);
        });
    }
    
    // Inserts the specified node as a sibling AFTER the reference node, returning the inserted node
    // If any of the passed nodes isn't found or the reference node doesn't have a parent, it does nothing and returns null
    function insertAfter(newNode, refNode) {
        return ((newNode) && (refNode) && (refNode.parentNode)) ? refNode.parentNode.insertBefore(newNode, refNode.nextSibling) : null;
    }
    
    // Returns an array of the CSS classes of the passed node or null if it isn't found
    // These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
    function getClassList(targetNode) {
        if (targetNode) return targetNode.className.trim().split(/\s+/);
        return null;
    }
    
    // Adds the passed CSS class as a class of the passed node, if it isn't already
    // If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
    // These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
    function addClass(targetNode, aClass) {
        if ((typeof aClass !== "string") || (aClass === "") || (/\s/.test(aClass))) return;
        var classList = getClassList(targetNode);
        if ((classList !== null) && (classList.indexOf(aClass) === -1)) {
            classList.push(aClass);
            targetNode.className = classList.join(" ");
        }
    }
    
    // Removes the passed CSS class as a class of the passed node, if it is
    // If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
    // These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
    function removeClass(targetNode, rClass) {
        if ((typeof rClass !== "string") || (rClass === "") || (/\s/.test(rClass))) return;
        var classList = getClassList(targetNode);
        if (classList !== null) {
            var classIndex = classList.indexOf(rClass);
            if (classIndex !== -1) {
                classList.splice(classIndex, 1);
                targetNode.className = classList.join(" ");
            }
        }
    }
    
    // Returns true if the passed CSS class is a class of the passed node, false otherwise
    // If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it returns null
    // These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
    function containsClass(targetNode, cClass) {
        if ((typeof cClass !== "string") || (cClass === "") || (/\s/.test(cClass))) return null;
        var classList = getClassList(targetNode);
        return (classList !== null) ? (classList.indexOf(cClass) !== -1) : null;
    }
    
    // Toggles the passed CSS as a class of the passed node (adds it if it isn't present, removes it if it is)
    // If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
    // These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
    function toggleClass(targetNode, tClass) {
        if ((typeof tClass !== "string") || (tClass === "") || (/\s/.test(tClass))) return;
        if (containsClass(targetNode, tClass)) {
            removeClass(targetNode, tClass);
        }
        else {
            addClass(targetNode, tClass);
        }
    }
    // Vertically scrolls the page to put the passed element top at the top of the page
    function scrollToNode(targetNode) {
        if (targetNode) window.scrollTo(window.scrollX, getAbsoluteRect(targetNode).top);
    }
    
    // Fires a click event on targetNode (an id of a node or a reference to it)
    // It uses the basic "Event" type instead of the "MouseEvent" type because the more detailed features of the latter aren't needed
    // Returns null if the node isn't found, otherwise it returns the return value of dispatchEvent
    function fireClickEvent(targetNode) {
        var iNode = $ref(targetNode);
        if (iNode) {
            var evtObj = document.createEvent("Event");
            evtObj.initEvent("click", true, true);
            return iNode.dispatchEvent(evtObj);
        }
        else {
            return null;
        }
    }
    
    // Adds !important to complete CSS rules (e.g. ".nd {display: none}")
    function makeCSSImportant(cssString) {
        var impCssString = cssString.replace(/([^;]\s*)}/, "$1;}"); // Adds a trailing semicolon to the last rule if it doesn't have one
        return impCssString.replace(/(?:\s*!\s*important\s*)?;/gi, " !important;"); // Adds !important to each rule if it doesn't have it already
    }
    
    // Returns a unique function name based on the passed base name, the current time and a random number
    function getUniqueFunctionName(baseName) {
        return baseName + (new Date()).getTime().toString() + Math.randomIntFromRange(0, 99).toString();
    }
    
    // Extends the String object with a trim funcion if it's not implemented natively in String.prototype (Javascript 1.8.1 addition)
    if (typeof String.prototype.trim !== "function") {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "");
        };
    }
    
    // Escapes characters with special meaning in a regular expression with a backslash so they can be used in a regular expression with their literal meaning
    String.prototype.escapeREChars = function() {
        return this.replace(/([.*+?|(){}[\]^$\\])/g, "\\$1");
    };
    
    // Capitalizes the first character of the string, leaving the case of the other characters unchanged
    String.prototype.capitalizeFirstChar = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    // Transforms a number into a valid CSS dimension (in pixels)
    Number.prototype.toCSS = function() {
        return Math.round(this).toString() + "px";
    };
    
    // Makes sure that the passed number (numberValue) is between a minumum value (minValue) and a maximum value (maxValue), clamping it if necessary
    Math.clamp = function(numberValue, minValue, maxValue) { // Static method of Math
        return Math.max(minValue, Math.min(maxValue, numberValue));
    };
    
    // Returns a random integer between a minumum value (minValue) and a maximum value (maxValue)
    Math.randomIntFromRange = function(minValue, maxValue) { // Static method of Math
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    };
    
    // Extends the Function object with a bind function if it's not implemented in Function.prototype (Javascript 1.8.5 addition)
    // Bind returns a new function that, when called, itself calls the original function in the context of the provided this value (fnThis), with a given sequence of arguments preceding any provided when the new function was called
    if (typeof Function.prototype.bind !== "function") {
        Function.prototype.bind = function(fnThis /*, fixed preceding arguments */) {
            var that = this, extraArgs = Array.slice(arguments, 1);
            return function() {return that.apply(fnThis, extraArgs.concat(arguments));};
        };
    }
    
    // Checks if the passed variable is an array. Provides an acceptable solution in most cases if Array.isArray isn't implemented (Javascript 1.8.5 addition)
    if (typeof Array.isArray !== "function") {
        Array.isArray = function(arrTest) { // Static method of Array
            return (Object.prototype.toString.call(arrTest) === "[object Array]");
        };
    }
    
    
    function AsocArray() {
        
        this.length = 0;
        this._membersHash = {};
        
        for (var i = 0; i < arguments.length; i += 2) {
            this.setItem(arguments[i], arguments[i + 1]);
        }
        
    }
    AsocArray.prototype.__defineGetter__("keys", function() {
        
        var itemKeysArray = [];
        
        this.forEach(function(itemValue, itemKey) {
            itemKeysArray.push(itemKey);
        });
        
        return itemKeysArray;
        
    });
    AsocArray.prototype.__defineGetter__("values", function() {
        
        var itemValuesArray = [];
        
        this.forEach(function(itemValue) {
            itemValuesArray.push(itemValue);
        });
        
        return itemValuesArray;
        
    });
    AsocArray.prototype.hasItem = function(itemKey) {
        return (this._membersHash.hasOwnProperty(itemKey));
    };
    AsocArray.prototype.getItem = function(itemKey) {
        return (this.hasItem(itemKey)) ? this._membersHash[itemKey] : undefined;
    };
    AsocArray.prototype.setItem = function(itemKey, itemValue) {
        
        var itemPrevValue;
        
        if (typeof itemValue !== "undefined") {
            
            if (this.hasItem(itemKey)) {
                itemPrevValue = this._membersHash[itemKey];
            }
            else {
                this.length++;
            }
            
            this._membersHash[itemKey] = itemValue;
            
        }
        
        return itemPrevValue;
        
    };
    AsocArray.prototype.removeItem = function(itemKey) {
        
        var itemPrevValue;
        
        if (this.hasItem(itemKey)) {
            this.length--;
            itemPrevValue = this._membersHash[itemKey];
            delete this._membersHash;
        }
        
        return itemPrevValue;
        
    };
    AsocArray.prototype.clear = function() {
        this.length = 0;
        this._membersHash = {};
    };
    AsocArray.prototype.forEach = function(cbFunc) {
        
        if (typeof cbFunc !== "function") return;
        
        for (var itemKey in this._membersHash) {
            if (this._membersHash.hasOwnProperty(itemKey)) cbFunc(this._membersHash[itemKey], itemKey, this);
        }
        
    };
    /*************************************************************************************************/
    
    
    ///////////////////////////// START OF CSS STYLES /////////////////////////////
    
    // Adds the CSS styles for the script to the page, making them important
    GM_addStyle([
        
        // Adds a class to hide elements and remove them from the document flow without really deleting them
        ".seldar-hidden {display: none}",
        "#seldar-headline {width: 593px;position: relative;border:2px solid black;margin-left: 200px;padding-top: 10px;height: 80px;}",
        "#seldar-headline {width: 593px;position: relative;border:2px solid black;margin-left: 200px;padding-top: 10px;height: 80px;padding-left:10px;}",
        "#spe-conf-title {font-size: 20px;font-style: italic;font-weight: bold;color: #3d3c38;text-transform: uppercase;line-height: 18px;}",
        "#spe-conf-tabbar {font-size: 12px;font-weight: bold;color: #000;display: none;}",
        "#spe-conf-content {font-size: 10px;font-weight: bold;color: #898886;display: block;line-height:11px}",
        "#spe-conf-content ul {list-style-type:none;}",
        "#spe-conf-buttons {}",
        "#spe-righttab {float:right;border:1px solid red;height:70px;width:100px;position relative;}",
        ".spe-conf-tab-active { display: block; }",
        "#spe-conf-content ul li {text-align: center;vertical-align: top;display: inline-block;zoom: 1;padding: 0 2px;margin: 0;}",
        "#spe-shortcuts {float:right;}",
        
    ].map(function(s) {return makeCSSImportant(s);}).join("\n"));
    
    
    
    // Hides or shows all the embeds of the document
    function setEmbedVisibility(embedVisible) {
        Array.forEach(document.getElementsByTagName("embed"), function(emb) {
            emb.style.visibility = (embedVisible) ? "" : "hidden";
        });
    }
    
    // Disables all input/select fields of the configuration dialog
    function lockDialogInputs() {
        var allInputs = $x(".//input|.//select", confDialog);
        allInputs.forEach(function(i) {i.disabled = true;});
    }
    
    // Exits the configuration by deleting the layers and showing the embeds
    // It is called by the Cancel button and the confMask event listeners
    function destroyDialog(evt) {
        delNodeArray([confMask, confDialog]);
        setEmbedVisibility(true);
    }
    
    // Gets the value of the checked radio input in the passed radio named group
    // Returns null if the name isn't found in the document
    function getRadioValue(radioName) {
        var rValue = null, rInputs = document.getElementsByName(String(radioName));
        for (var i = 0; i < rInputs.length; i++) {
            if (rInputs[i].checked) {
                rValue = rInputs[i].value;
                break;
            }
        }
        return rValue;
    }
    // Loads the script configuration settings. If a setting isn't set, the default value will be used
    var scriptConfig = {
        
        videoSize: GM_getValue("Enabled", "yes"),
        autoplayMode: parseInt(GM_getValue("autoplayMode", 0), 10),
        channelAutoplayMode: parseInt(GM_getValue("channelAutoplayMode", 0), 10),
        removeAds: GM_getValue("removeAds", true)
        
    };
    
    // autoplayMode and channelAutoplayMode should be integer numbers between 0 and 2 (both included)
    ["autoplayMode", "channelAutoplayMode"].forEach(function(setName) {
        scriptConfig[setName] = Math.round(scriptConfig[setName]);
        if ((isNaN(scriptConfig[setName])) || (scriptConfig[setName] < 0) || (scriptConfig[setName] > 2)) scriptConfig[setName] = 0;
    });
    
    
    function scriptConfiguration(evt) {
        // Gets the config mask and dialog
        var confMask = $id("ytf-conf-mask");
        var confDialog = $id("ytf-conf-dialog");
        // Creates the layers if they don't exist and sets focus on the config dialog
        if ((!confMask) || (!confDialog)) {
            createDialog();
        }
        confDialog.focus();
        
        return; // Exit function
    }
    function createDialog() {
        
        // Gets the numeric value of the video size (it can be NaN)
        
        // Creates the config mask and dialog, with their contents and event listeners
        confMask = createNode("div", {id: "ytf-conf-mask", title: "Click here to return to the page"}, null, [["click", destroyDialog, false]]);
        confDialog = createNode("div", {id: "ytf-conf-dialog"},
                                {innerHTML: "<div id='ytf-conf-title'>Seldar PROECO Configuration</div>"+
                                 "<div id='ytf-conf-tabbar'>" +
                                 "<input id='ytf-conf-tab-watch' type='button' value='Watch page' data-ytf-conf-tab-index='0'>" +
                                 "<input id='ytf-conf-tab-channel' type='button' value='Channel page' data-ytf-conf-tab-index='1'>" +
                                 "<input id='ytf-conf-tab-search' type='button' value='Search page' data-ytf-conf-tab-index='2'>" +
                                 "<input id='ytf-conf-tab-all' type='button' value='All pages' data-ytf-conf-tab-index='3'>" +
                                 "</div>" +
                                 "<div id='ytf-conf-content'>" +
                                 "<ul>" +
                                 "<li><span>Remove or disable:</span></li>" +
                                 "<input type='checkbox' id='ytf-conf-remove-ads'" + ((scriptConfig.removeAds) ? " checked='checked'" : "") + "><label for='ytf-conf-remove-ads'>Advertisements</label><br>" +
                                 "</li></ul>"+
                                 "</div>" +
                                 "<div id='ytf-conf-buttons'>" +
                                 "<input type='button' id='ytf-conf-buttons-ok' value='OK' title='Save the current configuration'>" +
                                 "<input type='button' id='ytf-conf-buttons-cancel' value='Cancel' title='Return to the page without saving'>" +
                                 "</div>"});
        
        // Appends the layers to the document
        document.body.appendChild(confMask);
        document.body.appendChild(confDialog);
        
        // Adds the necessary event listeners to the config dialog's buttons
        $id("ytf-conf-buttons-ok").addEventListener("click", saveConfiguration, false);
        $id("ytf-conf-buttons-cancel").addEventListener("click", destroyDialog, false);
        // Adds the necessary event listener to the config dialog's tab bar, so the dialog switches to the right tab when the corresponding button is pressed
        $id("ytf-conf-tabbar").addEventListener("click", function(evt) {
            if (evt.target.hasAttribute("data-ytf-conf-tab-index")) switchToTab(evt.target.getAttribute("data-ytf-conf-tab-index"));
        }, false);
        
        // Switches to the first tab
        switchToTab(0);
        
    }
    
    // Switches to the passed tab of the configuration dialog
    function switchToTab(tabIndex) {
        
        // Change the passed tab index into a string
        tabIndex = String(tabIndex);
        
        // Gets the tab bar and content div nodes of the configuration dialog
        var confTabBar = $id("ytf-conf-tabbar"), confContent = $id("ytf-conf-content");
        
        // Shows the tab bar button with the passed tabIndex as active and not the other ones
        $x("./input[@data-ytf-conf-tab-index]", confTabBar).forEach(function(but) {
            if (but.getAttribute("data-ytf-conf-tab-index") === tabIndex) {
                addClass(but, "ytf-conf-tab-active");
            }
            else {
                removeClass(but, "ytf-conf-tab-active");
            }
        });
        
        // Shows the tab div with the passed tabIndex and hides all others
        $x("./div[@data-ytf-conf-tab-index]", confContent).forEach(function(tab) {
            if (tab.getAttribute("data-ytf-conf-tab-index") === tabIndex) {
                removeClass(tab, "ytf-hidden");
            }
            else {
                addClass(tab, "ytf-hidden");
            }
        });
        
    }
    // Checks and saves the configuration to the configuration variables
    // It is called by the Ok button event listener
    function saveConfiguration() {
        
        // Sets videoSize depending on the value of the video size select (or the value of the custom video size input if a custom size is chosen)
        var vsSelect = $id("ytf-conf-video-size-sel"), vsCustomInput = $id("ytf-conf-size-custom");
        var vsValue = (vsSelect.value === "") ? vsCustomInput.value : vsSelect.value, vsValValue = VideoAdapter.valVideoSize(vsValue);
        if (vsValValue === null) { // Doesn't continue if the chosen video size is invalid
            window.alert("Invalid default video size");
            switchToTab(0);
            vsCustomInput.focus();
            return;
        }
        lockDialogInputs(); // Disables all input/select fields before saving
        GM_setValue("videoSize", vsValValue);
        
        // Sets autoplayMode depending on the state of the relevant radio inputs
        var apMode = parseInt(getRadioValue("ytf-conf-autoplay-choice"), 10);
        GM_setValue("autoplayMode", (isNaN(apMode)) ? 0 : apMode);
        
        // Sets channelAutoplayMode depending on the state of the relevant radio inputs
        var channelApMode = parseInt(getRadioValue("ytf-conf-autoplay-channel-choice"), 10);
        GM_setValue("channelAutoplayMode", (isNaN(channelApMode)) ? 0 : channelApMode);
        
        // Sets controlsAutohideMode depending on the value of the relevant select
        var ahMode = parseInt($id("ytf-conf-controls-autohide-mode-sel").value, 10);
        GM_setValue("controlsAutohideMode", (isNaN(ahMode)) ? -1 : ahMode);
        GM_setValue("flashWMode", $id("ytf-conf-flash-wmode-sel").value);
        GM_setValue("removeAds", $id("ytf-conf-remove-ads").checked);
        
        // Reloads page and script
        window.location.reload();
        
    }
    
    
    // Registers the configuration menu command
    //GM_registerMenuCommand("Seldar ProeConomica Configuration", scriptConfiguration, "Y");
    
    
    
    ///////////////////////////// START OF MAIN SCRIPT ////////////////////////////
    
    // Prevents the script from running in a frame/iframe
    if (window.self !== window.top) return;
    
    GM_addStyle("#jwslider {display: none !important;}");
    GM_addStyle("#antreprenoriat {display: none !important;}");
    GM_addStyle("img.tipTip { display: none !important; }");
    GM_addStyle(".pp_move {position: relative;z-index:0}");
    // Actions for each type of YouTube page
    {
        
        // Home page
        
        // Remove the ads and the Chrome promotion
        if (scriptConfig.removeAds) {
            delNodeArray($x("//*[starts-with(@id, 'ad_creative_')]"));
            
            delNode("jwslider");
        }
        
    }
    
    mainAppArea = createNode("div", {id: "seldar-headline"},
                             {innerHTML: "<div id='spe-righttab'>"+
                              "<input id='spe-conf-tab-watch' type='button' value='About' data-spe-conf-tab-index='0'>" +
                              "<input id='spe-conf-tab-channel' type='button' value='Config' data-spe-conf-tab-index='1'>" +
                              "<input id='spe-conf-tab-search' type='button' value='Suggestions' data-spe-conf-tab-index='2'>" +
                              "<input id='spe-conf-tab-all' type='button' value='All pages' data-spe-conf-tab-index='3'>" +
                              "</div>"+
                              "<div id='spe-conf-title'>Seldar PROECO Panel</div>"+
                              "<div id='spe-conf-tabbar'>" +
                              "<b>Features:</b>" +
                              "</div>" +
                              "<div id='spe-conf-content'>" +
                              "<div data-spe-conf-tab-index='0'>"+
                              "<ul>" +
                              "<li>Auto Upgrade virtuals</li>" +
                              "<li>Keyboard Use : enter and esc</li>" +
                              "<li>Removed Ads</li>" +
                              "</ul>"+
                              "</div>"+
                              "<div data-spe-conf-tab-index='1'>"+
                              "<ul>" +
                              "<li>Config panel : WIP</li>" +
                              "</ul>"+
                              "</div>"+
                              "<div data-spe-conf-tab-index='2'>"+
                              "<ul>" +
                              "<li>Just contact me, you know how</li>" +
                              "</ul>"+
                              "</div>"+
                              "<div data-spe-conf-tab-index='3'>"+
                              "<ul>" +
                              "<li>All Pages: Should you remember to play fair and support the game with your investments.</li>" +
                              "</ul>"+
                              "</div>"+
                              
                              "</div>" +
                              "<div id='spe-conf-buttons'>" +
                              
                              "</div>"});
    // Appends the layers to the document
    $(".slider-wrap").append(mainAppArea);
    delNode("jwslider");
    delNodeArray($("#sideRight .rightmenu").find("ins"));
    $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $('.active').click();
        }
    });
    $('#id_of_textbox').live("keyup", function(event) {
        if(event.keyCode == '13'){
            $('#id_of_button').click();
        }
    });
    
    $(".app_alert").livequery(function() {
        
    });
    
    // Auto accept things from operations
    $('.pp_alert').livequery(function() {
        if ($(".pp_title")!="Atenţie") {
            $("#press_ok").click();    
        }
        // $("#press_cancel").click();
    });
    $('.pp_buttons').livequery(function() {
        if ($(".pp_title")!="Atenţie") { 
            $(".active").click();    
            // $("#press_cancel").click();
        }
    });
    function getScript(url){
        var script=document.createElement('script');
        script.src=url;
        var head=document.getElementsByTagName('head')[0],
            done=false;
        // Attach handlers for all browsers
        script.onload=script.onreadystatechange = function(){
            if ( !done && (!this.readyState
                           || this.readyState == 'loaded'
                           || this.readyState == 'complete') ) {
                done=true;
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }
    $(document).ready(function() {
        
        getScript('http://proeco.lejer.ro/js/userscripts/proe/ups.js');
    });
    
    $('.popup .pp_980:visible').livequery(function() {
        console.log($(this).find(".pp_title").text());
        if ($(this).find(".pp_title").text()=="Piaţa") { 
            linksAre = createNode("td", {id: "spe-shortcuts"},
                                  {innerHTML: 
                                   "<div id='spe-conf-content'>" +
                                   "<ul>" +
                                   "<li><a href='javascript:spe_get_baumax(); return false;'>Baumax</a></li>" +
                                   "<li><a href='javascript:spe_get_alimentara(); return false;'>Alimentara</a></li>" +
                                   "<li><a href='javascript:spe_get_mall(); return false;'>Style</a></li>" +
                                   "<li><a href='javascript:spe_set_products(); return false;'>Tag Products</a></li>" +
                                   "</ul>"+
                                   "</div>" 
                                  });
            $(".market-typeof-person table tr").append(linksAre);
        }
    });
    
    $(".myTable .myTableRow1 .l_products:visible .rm_q .rm_quantity").livequery(function() {
        var _this=$(this);
        var 
        cct = $('input[name=csrf_test_token]').val() ? $('input[name=csrf_test_token]').val() : null,
            qty =_this.html(),
            cid = $(_this).closest("tr").attr("id").split("_")[1],
            stock = _this.parent().find("img").attr("title").split(":")[1],
            count= Math.floor(stock/qty);
        countLink="<a href='#' class='companyEdit' rel='"+cid+"'>"+count+"</a>";
        //cid=Company idx, pid=Product IDX, mode=company, csrf_test_token= cct target = market
        if (count>0 ){
            _this.html(qty+"<br><font color='red'>"+countLink+"</font>");
        }
        else
        {
            _this.html(qty+"<br><font color='black'>"+countLink+"</font>");
            _this.removeClass("green_bg");
            _this.addClass("red_bg");
        }
    });
    
    
    // Removes brand and promoted videos ads
    if (scriptConfig.removeAds) {
        delNode("watch-longform-ad");
        delNode("watch-channel-brand-div");
        delNode("ppv-container");
    }
    return;
    
})();
