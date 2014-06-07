// ==UserScript==
// @name           omgpop
// @namespace      <OMGPOP>
// @include        http://forums.omgpop.com/*
// @include        http://www.omgpop.com/*
// ==/UserScript==

// license: CC-BY, see http://creativecommons.org/licenses/by/3.0/

const version = "0.4";
var currentConfigurationDialog; // not elegant but necessary for event handlers

var storeGeneral = new DataStore("general");
var storeFilter = new DataStore("filter");
var storeLayout = new DataStore("layout");
var storeAds = new DataStore("ads");
var filteredItems;

initialize();

//MAIN SITE:
if (window.location.hostname == "www.omgpop.com" ) {
	if(top.location.hash.substring(0, 15) == "#/i/drawmything") {
		removeTopAd();
	} else {
		if (isAdRemoved()) {
			moveTopAdBack();
		}
	}
}



//FORUMS:
if (window.location.hostname == "forums.omgpop.com" ) {
	// background:
	if (storeLayout.getData("doForumBackground")){
		modifyBackgroundColor();
	}

	// max width
	if (storeLayout.getData("doForumMaxWidth")) {
		modifyMaxWidth();
	}

	// do for search results only:
	if(window.location.pathname == "/search.php") {
		if (storeFilter.getData("doFilterSearch")){
		    modifySearchDisplay();
		}
		addFilterConfigLink();
		try {
			connectClickeventHandler(document.getElementById("userscriptLinkToggleFilter"), toggleFilter);
		} catch (e) {;}
		connectClickeventHandler(document.getElementById("userscriptLinkConfigureFilter"), showFilterPreferencesDialog);
	}

	// usercp addition:
	if(window.location.pathname == "/usercp.php") {
		appendScriptSettings();
		connectClickeventHandler(document.getElementById("userscriptLinkConfigureFilter"), showFilterPreferencesDialog);
		connectClickeventHandler(document.getElementById("userscriptLinkConfigureLayout"), showLayoutPreferencesDialog);
		connectClickeventHandler(document.getElementById("userscriptLinkConfigureAds"), showAdPreferencesDialog);
	}

	// remove fancy fonts:
	if (storeLayout.getData("doDisableFont")){
		disableFancyFonts();
	}
}

// -----------------------------------------------------------------------------
//  initialization function
// -----------------------------------------------------------------------------

function initialize() {
    /* check if the script does run the first time in this version,
       write default configuration if values dont exist.
     */
    var configurationCreated = storeGeneral.getData("configurationCreated");
    var scriptVersion = storeGeneral.getData("version");
    if  ((configurationCreated != "true") || (scriptVersion != version)) {
        storeGeneral.setData("configurationCreated", "true");
        storeGeneral.saveAll();
    }
    if (scriptVersion != version) {
        storeGeneral.setData("version", version);
        storeGeneral.saveData("version");
    }
    storeFilter.setAndSaveIfNotExisting("doFilterSearch", true);    
    storeFilter.setAndSaveIfNotExisting("displayMethod", "opacity");    
    storeFilter.setAndSaveIfNotExisting("forums", "Say Hello, Forum Games");    
    storeLayout.setAndSaveIfNotExisting("doDisableFont", true);
    storeLayout.setAndSaveIfNotExisting("doForumBackground", false);
    storeLayout.setAndSaveIfNotExisting("forumBackgroundColor", "pink");
    storeLayout.setAndSaveIfNotExisting("doForumMaxWidth", false);
    storeLayout.setAndSaveIfNotExisting("forumMaxWidth", "100%");
    storeAds.setAndSaveIfNotExisting("doRemoveAdsDMT", true);
}

// -----------------------------------------------------------------------------
//  General functions for access, creation and modification of the website
// -----------------------------------------------------------------------------

/**
 * returns all elements of a tag where attribute attr contains value
 */
function getElementsByAttribute(tag, attr, value) {
	return document.evaluate('//'+tag+'[contains(@'+attr+',"'+value+'")]', document, null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

/**
 * connect a handler function to the click-event of an object
 * @param element the object to add the event handler to
 * @param handler the event handler function
 */
function connectClickeventHandler(element, handler) {
    connectEventHandler(element, "click", handler)
}

/**
 * connect a handler function to an event of an object
 * @param element the object to add the event handler to
 * @param event type of the event (string)
 * @param handler the event handler function
 */
function connectEventHandler(element, event, handler) {
    if (window.attachEvent) { // Opera
    	element.attachEvent(event, handler, true);
    } else  {                 // Firefox
    	element.addEventListener(event, handler, true);
    } 
}

/**
    add an attribute to an object of the dom
    @param element object of the dom
    @param attribute attribute name (string)
    @param value attribute value (string)
*/
function addAttribute(element, attribute, value) {
    var attr = document.createAttribute(attribute);
	attr.nodeValue = value;
    element.setAttributeNode(attr);
}

// -----------------------------------------------------------------------------
//  Specific functions for access, creation and modification of the website
// -----------------------------------------------------------------------------

/**
 * creates a blank div that can be used to display content
 * attaches it to body and removes original content
 */
function createContentAreaDiv() {
	var myDiv = document.createElement("div");
    var myDivClass = document.createAttribute("class");
    var myDivStyle = document.createAttribute("style");
	myDivClass.nodeValue = "body_wrapper";
	myDivStyle.nodeValue = "z-index:8;";
	myDiv.setAttributeNode(myDivClass);
	myDiv.setAttributeNode(myDivStyle);

	var oldDiv = getElementsByAttribute("div", "class", "body_wrapper").snapshotItem(0);
	oldDiv.style.display = "none";

	document.body.insertBefore(myDiv, oldDiv);
    return myDiv;
}

function addPrefHeader(node) {
    var versionLabel = document.createElement("p");
    versionLabel.innerHTML = "script version " + version;
    versionLabel.innerHTML += " - back to <a href='usercp.php'>settings</a>";
    node.appendChild(versionLabel);
}

function createFilterPreferencesDialog() {
    var prefDiv = createContentAreaDiv();
    var configDialog = new ConfigurationDialog(storeFilter);
    configDialog.setTitle("Filter Preferences for Search");
	addPrefHeader(prefDiv);

    var wFilter = new WidgetCheckbox();
    configDialog.addConfig("doFilterSearch", "filter search results", wFilter, "activate to exclude certain forums from searches");

	var wDisplay = new WidgetDropdown();
    wDisplay.addOption("opacity");
    wDisplay.addOption("hide");
    configDialog.addConfig("displayMethod", "display", wDisplay, "display of filtered entries");

	var wForums = new WidgetTextfield();
    configDialog.addConfig("forums", "forum list", wForums, "comma separated list of forum names to filter");


    prefDiv.appendChild(configDialog.getDOMObject());
}

function createLayoutPreferencesDialog() {
	var prefDiv = createContentAreaDiv();
    var configDialog = new ConfigurationDialog(storeLayout);
    configDialog.setTitle("Additional Layout Preferences");
	addPrefHeader(prefDiv);

	var wFont = new WidgetCheckbox();
    configDialog.addConfig("doDisableFont", "disable fancy fonts", wFont, "remove color, sizes, align and faces");

	var wDoBG = new WidgetCheckbox();
    configDialog.addConfig("doForumBackground", "change background color", wDoBG, "overwrite the forum background with custom color");

	var wBackground = new WidgetColorChooser("widgetForumBackgroundColor");
    configDialog.addConfig("forumBackgroundColor", "background color", wBackground, "custom background color (e. g. '#ffffff', 'rbg(0, 255, 0)' or 'red')");

	var wDoMaxWidth = new WidgetCheckbox();
    configDialog.addConfig("doForumMaxWidth", "change max width", wDoMaxWidth, "change the max. width of the forum");

	var wMaxWidth = new WidgetTextfield();
    configDialog.addConfig("forumMaxWidth", "max width", wMaxWidth, "value for the max. widht, e. g. '100%' or '1024px'");

    prefDiv.appendChild(configDialog.getDOMObject());
}

function createAdPreferencesDialog() {
	var prefDiv = createContentAreaDiv();
    var configDialog = new ConfigurationDialog(storeAds);
    configDialog.setTitle("Advertisment Control");
	addPrefHeader(prefDiv);

	var wDMT = new WidgetCheckbox();
    configDialog.addConfig("doRemoveAdsDMT", "remove ads for Draw My Thing", wDMT, "remove the ad on top");

    prefDiv.appendChild(configDialog.getDOMObject());
}

function modifySearchDisplay() {
	var item;
	var forumPredicate = "";
	var forums = storeFilter.getData("forums").split(",");
	for (var i = 0; i < forums.length; i++) {
		forumPredicate += 'starts-with(@href,"' + forums[i].trim().toLowerCase().replace(/ /g,"-") + '/")';
		if (i < forums.length -1) {
			forumPredicate += ' or ';
		}
	}
	
	var items = document.evaluate('//ol[contains(@id,"searchbits")]/li/div/div/p/a[' 
			+ forumPredicate 
			+ ']/ancestor::p/ancestor::div/ancestor::div/ancestor::li'
			+'| //ol[contains(@id,"searchbits")]/li/div/h3[starts-with(@class,"posttitle")]/a[' 
			+ forumPredicate 
			+ ']/ancestor::h3/ancestor::div/ancestor::li'

, document, null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	filteredItems = items;
toggleFilterOnSearchDisplay();

	document.getElementById("postpagestats").innerHTML += " / " + items.snapshotLength+ " results filtered - <a id='userscriptLinkToggleFilter' href='javascript:;'>show/hide filtered</a>"; 

}

function toggleFilterOnSearchDisplay() {
	for (var i = 0; i < filteredItems.snapshotLength; i++) {
		item = filteredItems.snapshotItem(i);
		if (storeFilter.getData("displayMethod") == "opacity") {
			if (item.style.opacity != 0.2 ) {
				item.style.opacity = 0.2;
			} else {
				item.style.opacity = 1.0;
			}
		} else if (storeFilter.getData("displayMethod") == "hide") {
			if (item.style.display != "none") {
				item.style.display = "none";
			} else {
				item.style.display = "block";
			}
		}
	}
}

function addFilterConfigLink() {
	document.getElementById("postpagestats").innerHTML += " - <a id='userscriptLinkConfigureFilter' href='javascript:;'>configure filter</a>";
}

function disableFancyFonts() {
	var head = document.getElementsByTagName("head")[0];         
	var css = document.createElement("style");
	addAttribute(css,"type", "text/css");
	rule = "font { color: inherit !important; "
				  + "text-align: inherit !important; "
				  + "font-family: inherit !important; "
				  + "font-size: inherit !important; "
				  + "}";
	css.innerHTML = rule;
	head.appendChild(css);
}

function modifyBackgroundColor() {
	var head = document.getElementsByTagName("head")[0];         
	var css = document.createElement("style");
	addAttribute(css,"type", "text/css");
	var rule = "html { background-color: "
		 + storeLayout.getData("forumBackgroundColor")
		 + " !important; }";
	css.innerHTML = rule;
	head.appendChild(css);
}

function modifyMaxWidth() {
	document.body.style.maxWidth = storeLayout.getData("forumMaxWidth");
}

function removeTopAd() {
	var banner = parent.document.getElementById("flash-banner-top");
	var content = parent.document.getElementById("flashcontent-wrapper");
	content.style.borderTop="0px";
	content.style.top="0px";
	banner.style.height="0px";
	content.style.height = content.style.height.split("px")[0]*1+100 + "px";
}

function moveTopAdBack() {
	var banner = parent.document.getElementById("flash-banner-top");
	var content = parent.document.getElementById("flashcontent-wrapper");
	content.style.borderTop="5px solid white";
	content.style.top="5px";
	banner.style.height="90px";
	content.style.height = content.style.height.split("px")[0]*1-100 + "px";
}

function isAdRemoved() {
	var content = parent.document.getElementById("flashcontent-wrapper");
	return (content.style.top=="0px");
}

function appendScriptSettings() {
	var block = document.createElement("div");
	addAttribute(block, "class", "block");
	block.innerHTML = ''
		+ '<h2 class="blockhead">Additional Settings</h2>' + '\n'
		+ '    <div class="blockbody">' + '\n'
		+ '        <ul class="blockrow">' + '\n'
		+ '            <li class="inactive"><a id="userscriptLinkConfigureFilter" href="javascript:;">Search Filter</a></li>' + '\n'
		+ '            <li class="inactive"><a id="userscriptLinkConfigureLayout" href="javascript:;">Layout</a></li>' + '\n'
		+ '            <li class="inactive"><a id="userscriptLinkConfigureAds" href="javascript:;">Ad Control</a></li>' + '\n'
		+ '        </ul>' + '\n'
        + '    </div>' + '\n';
	document.getElementById("usercp_nav").appendChild(block);
}

// -----------------------------------------------------------------------------
//  class ConfigurationDialog
// -----------------------------------------------------------------------------

/**
    The constructor
    There should always only be one active configuration dialog, because
    the event handler functions work on currentConfigurationDialog
    @param dataStoreObject reference to an existing dataStore
*/
function ConfigurationDialog(dataStoreObject) {
    this.dataStore = dataStoreObject;
    this.title = this.dataStore.getId();
    this.labels = new Object();
    this.widgets = new Object();
    this.descriptions = new Object();
    this.addConfig = ConfigurationDialog_addConfig;
    this.getDOMObject = ConfigurationDialog_getDOMObject;
    this.reset = ConfigurationDialog_reset;
    this.save = ConfigurationDialog_save;
    this.setTitle = ConfigurationDialog_setTitle;
    this.getTitle = ConfigurationDialog_getTitle;
}

/** 
    Add a rule for creating a user interface
    @param key key of corresponding data entry (string)
    @param label the label that names the entry (string)
    @param widget widget that will do the configuration.
                  the widget needs to implement an interface consisting of:
                    * setData(data) accepting data of the corresponding type
                                    to change the value
                    * getData() returning the selected value in the
                                corresponding data type
                    * getDOMObject() returning a DOM-Object to append into the 
                                     DOM-tree.
    @param description (string)
*/
function ConfigurationDialog_addConfig(key, label, widget, description) {
    this.labels[key] = label;
    this.widgets[key] = widget;
    this.descriptions[key] = description;
}

function ConfigurationDialog_getDOMObject() {
    var container = document.createElement("form");
    addAttribute(container, "class", "ConfigurationDialog_Container");

    var title = document.createElement("h2");
	title.style.fontSize= "200%";
    title.innerHTML = this.title;
    container.appendChild(title);
    for (key in this.labels) {
        if (this.dataStore.exists(key)) {
  
            var label = document.createElement("h3");
            label.style.marginTop = "20px";
			label.style.fontSize= "130%";
            label.innerHTML = this.labels[key];
            container.appendChild(label);        

            this.widgets[key].setData(this.dataStore.getData(key));
            var widget = this.widgets[key].getDOMObject();
            widget.style.marginLeft = "20px";
            container.appendChild(widget);

            var desc = document.createElement("p");
            desc.style.marginLeft = "20px";
            desc.innerHTML = this.descriptions[key];
            container.appendChild(desc);
        }
    }

    currentConfigurationDialog = this;
    
    var btnReset = document.createElement("input");
    addAttribute(btnReset, "type", "button");
    addAttribute(btnReset, "value", "reset");
    connectClickeventHandler(btnReset, this.reset);
    container.appendChild(btnReset);


    var btnSave = document.createElement("input");
    addAttribute(btnSave, "type", "button");
    addAttribute(btnSave, "value", "save");
    connectClickeventHandler(btnSave, this.save)
    container.appendChild(btnSave);

    return container;
}

function ConfigurationDialog_reset() {
    currentConfigurationDialog.dataStore.loadAll();
    for (key in currentConfigurationDialog.labels) {
        if (currentConfigurationDialog.dataStore.exists(key)) {
            currentConfigurationDialog.widgets[key].setData(currentConfigurationDialog.dataStore.getData(key));
        }
    }
}

function ConfigurationDialog_save() {
    for (key in currentConfigurationDialog.labels) {
        if (currentConfigurationDialog.dataStore.exists(key)) {
            currentConfigurationDialog.dataStore.setData(key, currentConfigurationDialog.widgets[key].getData());
        }
    }
    currentConfigurationDialog.dataStore.saveAll();
}

function ConfigurationDialog_setTitle(title) {
    this.title = title;
}

function ConfigurationDialog_getTitle() {
    return this.title;
}

// -----------------------------------------------------------------------------
//  widget classes
// -----------------------------------------------------------------------------


// Textfield
function WidgetTextfield() {
    this.field = document.createElement("input");
    addAttribute(this.field, "type", "text");
    this.field.value = "";
    this.setData =Textfield_setData;
    this.getData = Textfield_getData;
    this.getDOMObject = Textfield_getDOMObject;
}

function Textfield_setData(dataValue) {
    this.field.value = dataValue;
}

function Textfield_getData() {
    return this.field.value;
}

function Textfield_getDOMObject() {
    return this.field;
}

// Checkbox
function WidgetCheckbox() {
    this.field = document.createElement("input");
    addAttribute(this.field, "type", "checkbox");
    this.field.checked = false;
    this.setData = WidgetCheckbox_setData;
    this.getData = WidgetCheckbox_getData;
    this.getDOMObject = WidgetCheckbox_getDOMObject;
}

function WidgetCheckbox_setData(dataValue) {
    this.field.checked = dataValue;
}

function WidgetCheckbox_getData() {
    return this.field.checked;
}

function WidgetCheckbox_getDOMObject() {
    return this.field;
}

// Dropdown
function WidgetDropdown() {
    this.field = document.createElement("select");
    addAttribute(this.field, "size", "1");
    this.field.value = "";
    this.addOption = WidgetDropdown_addOption;
    this.setData = WidgetDropdown_setData;
    this.getData = WidgetDropdown_getData;
    this.getDOMObject = WidgetDropdown_getDOMObject;
}

function WidgetDropdown_addOption(option) {
    var opt = document.createElement("option");
    opt.innerHTML = option;
    this.field.appendChild(opt);
}

function WidgetDropdown_setData(dataValue) {
    this.field.value = dataValue;
}

function WidgetDropdown_getData() {
    return this.field.value;
}

function WidgetDropdown_getDOMObject() {
    return this.field;
}

// ColorChooser
function WidgetColorChooser(id) {
    this.id = id;
    this.container = document.createElement("span");
    this.preview = document.createElement("span");
    addAttribute(this.preview, "id", id + "_preview");
    this.preview.style.border = "solid #000000 1px";
    this.preview.style.marginLeft = "10px";
    this.preview.innerHTML = " ";
    this.preview.style.paddingLeft = "30px";
    this.previewLabel = document.createElement("span");
    this.previewLabel.innerHTML = "(preview)";
    this.previewLabel.style.marginLeft = "10px";
    this.field = document.createElement("input");
    addAttribute(this.field, "id", id + "_input");
    addAttribute(this.field, "type", "text");
    this.field.value = "#ffffff";
    this.container.appendChild(this.field);
    this.container.appendChild(this.preview);
    this.container.appendChild(this.previewLabel);

    changeHandler = new Function("var prev = document.getElementById('" + id + "_preview" + "');" + 
                                 "var input = document.getElementById('" + id + "_input" + "');" +
                                 "prev.style.backgroundColor = input.value;");
    
    connectEventHandler(this.field, "change", changeHandler);

    this.setData = WidgetColorChooser_setData;
    this.getData = WidgetColorChooser_getData;
    this.updatePreview = WidgetColorChooser_updatePreview;
    this.getDOMObject = WidgetColorChooser_getDOMObject;
}

function WidgetColorChooser_updatePreview() {
    this.preview.style.backgroundColor = this.field.value;
}

function WidgetColorChooser_setData(dataValue) {
    this.field.value = dataValue;
    this.updatePreview();
}

function WidgetColorChooser_getData() {
    return this.field.value;
}

function WidgetColorChooser_getDOMObject() {
    return this.container;
}

// -----------------------------------------------------------------------------
//  class DataStore
// -----------------------------------------------------------------------------

/**
    @brief The DataStore class provides a very easy to use interface for 
           handling persistent data of various types in a script.
    
    Each time a DataStore instance is associated with an id not necessarily 
    identifying that instance (but be careful with multiple instances working on
    the same id, you can shoot yourself in the foot when changing data types)
    but identifying the set of data to work on.
    When a DataStore is created it loads automatically former data belonging 
    to its id.
    Persistence is currently set to 30 days.
    Data in a DataStore has a key (has to be a string) identifying it and a type 
    (currently supported types: string, number, boolean).
    It can be set by calling setData, made persistent by calling saveData
    (for ease of use there is a combined method setAndSave).
    Read access is provided by the method getData, that reads from the local
    copy of the data.
    The type of data is automatically detected so a user of this class doesn't 
    need to care about it: just use setData with a variable of a supported type 
    and getData will return you a value of that type later.

    The interface is independent from the the technical aspects of saving and
    loading the data.
    The current implementation uses cookies as storage but it is possible to 
    change the saving method easily or implement browser-specific methods.
    Additionally there is the possibility to change the implementation so that
    all the data of a DataStore instance goes into one cookie (if there occurs
    the wish to reduce the number of cookies in the future).
 */
function DataStore(id) {
    // properties:
    this.properties = new Object();
    this.id = id;
    this.seperator = "_";
    this.cookiePrefix = "dataStore" + this.seperator + this.id + this.seperator;
    this.cookieDays = 1000;

    // methods:
    this.getData = DataStore_getData;
    this.setData = DataStore_setData;
    this.saveData = DataStore_saveData;
    this.saveAll = DataStore_saveAll;
    this.loadData = DataStore_loadData;
    this.loadAll = DataStore_loadAll;
    this.exists = DataStore_exists;
    this.getId = DataStore_getId;
    this.initialize = DataStore_initialize;
    this.convertStringToType = DataStore_convertStringToType;
    this.setAndSave = DataStore_setAndSave;
    this.setAndSaveIfNotExisting = DataStore_setAndSaveIfNotExisting;

    // do initialization: load former data
    this.initialize();
}

function DataStore_getId() {
    return this.id;
}

function DataStore_getData(key) {
    if (key in this.properties) {
        return this.properties[key];
    } else {
        return null;
    }
}

function DataStore_setData(key, data) {
    this.properties[key] = data;
}

function DataStore_saveData(key) {
    // the "" + is for conversion of the data into string type.
    createCookie(this.cookiePrefix + (typeof this.properties[key]) + this.seperator + key, escape("" + this.properties[key]), this.cookieDays);
}

function DataStore_saveAll() {
    // could be modified to save only changed data
    for (var key in this.properties) {
        this.saveData(key);
    }
}

function DataStore_loadData(key) {
    try {
        var type = (typeof this.properties[key]);
        var data = unescape(readCookie(this.cookiePrefix + type + this.seperator + key));
        this.properties[key] = this.convertStringToType(data, type);
    } catch (e) {
        // Probably the key does not exist yet in the DataStore instance...
    }
}

function DataStore_loadAll() {
    for (var key in this.properties) {
        this.loadData(key);
    }
}

function DataStore_exists(key) {
    if (this.getData(key) == null) {
        return false;
    } else {
        return true;
    }
}

function DataStore_initialize() {
    var names = getCookieNamesBeginningWith(this.cookiePrefix);
    var typeAndKey;
    var key;
    var type;
    for (var i = 0; i < names.length; i++) {
        typeAndKey = names[i].substring(this.cookiePrefix.length);
        // seperate key string and type string:
        key = typeAndKey.substring(typeAndKey.indexOf(this.seperator) + 1);
        type = typeAndKey.substring(0, typeAndKey.indexOf(this.seperator));
        /* it is important to convert the initial dummy data that will be
           overwritten by the following call of loadAll to the right type,
           because the loadData-method gets its knowledge about the type 
           expected from the type of the value set here.
         */
        this.setData(key, this.convertStringToType("", type));
    }
    this.loadAll();
} 

function DataStore_convertStringToType(string, type) {
    if (type == "string") {
        return string;
    }
    if (type == "boolean") {
        return ((string == "true") ? true : false);
    }
    if (type == "number") {
        return Number(string);
    }
}

function DataStore_setAndSave(key, data) {
    this.setData(key, data);
    this.saveData(key);
}

function DataStore_setAndSaveIfNotExisting(key, defaultValue) {
    if (!this.exists(key)) {
        this.setData(key, defaultValue);
        this.saveData(key);
    }
}

// -----------------------------------------------------------------------------
//  cookie functions:
// -----------------------------------------------------------------------------

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function getCookieNamesBeginningWith(begin) {
    var names = new Array();
    var cookie;
	var cookieArray = document.cookie.split(';');    
	for(var i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
   		while (cookie.charAt(0) == ' ') { // remove heading spaces
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.substring(0, begin.length) == begin) { // if cookie starts with begin
            names.push(cookie.split('=')[0]);
        }
    }
    return names;
}

// -----------------------------------------------------------------------------
//  action handlers
// -----------------------------------------------------------------------------


function showFilterPreferencesDialog() {
    createFilterPreferencesDialog();
}

function showLayoutPreferencesDialog() {
    createLayoutPreferencesDialog();
}

function showAdPreferencesDialog() {
    createAdPreferencesDialog();
}

function toggleFilter() {
	toggleFilterOnSearchDisplay();
}
